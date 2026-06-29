import { useState } from "react";
import { 
  Route, 
  Map, 
  TrendingUp, 
  Compass, 
  Play, 
  RefreshCw,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Truck,
  Clock,
  DollarSign,
  Fuel,
  Activity,
  ArrowLeft,
  Sliders,
  Settings,
  ShieldCheck
} from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip,
  Cell
} from "recharts";

// ==================== TYPES & CONSTANTS ====================

interface Waypoint {
  id: string;
  name: string;
  x: number; // canvas percent
  y: number; // canvas percent
  isStop: boolean;
  window: string;
  cargoLoad: string; // Tons
}

const ALL_HUBS: Waypoint[] = [
  { id: "hub-1", name: "Majestic Central Depot", x: 20, y: 35, isStop: true, window: "08:00 - 10:00", cargoLoad: "4.5T" },
  { id: "hub-2", name: "Hebbal Northern Portal", x: 50, y: 15, isStop: true, window: "10:30 - 12:00", cargoLoad: "2.1T" },
  { id: "hub-3", name: "Whitefield Cargo Terminal", x: 80, y: 40, isStop: true, window: "13:00 - 15:30", cargoLoad: "8.0T" },
  { id: "hub-4", name: "Electronic City Gate 2", x: 65, y: 75, isStop: true, window: "16:00 - 18:00", cargoLoad: "5.2T" },
  { id: "hub-5", name: "Koramangala Transit Hub", x: 40, y: 58, isStop: true, window: "18:30 - 20:00", cargoLoad: "3.0T" }
];

export default function RouteWiseSimulator() {
  const [selectedHubs, setSelectedHubs] = useState<string[]>(["hub-1", "hub-3", "hub-4"]);
  const [solverType, setSolverType] = useState<"shortest" | "eco" | "cost">("shortest");
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggleHub = (id: string) => {
    setSelectedHubs((prev) =>
      prev.includes(id)
        ? prev.filter((hId) => hId !== id)
        : [...prev, id]
    );
  };

  const handleRunOptimizer = () => {
    if (selectedHubs.length < 2) {
      alert("Please select at least 2 active logistics waypoints to solve!");
      return;
    }
    setAnimating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnimating(false);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  // Metrics based on Solver Heuristics & Active Hubs
  const countMultiplier = selectedHubs.length;
  let drivingHours = parseFloat((countMultiplier * 1.4).toFixed(1));
  let fuelBurn = countMultiplier * 7.5;
  let tollsPaid = countMultiplier * 80;

  if (solverType === "eco") {
    drivingHours = parseFloat((drivingHours * 1.15).toFixed(1)); // slightly slower eco speeds
    fuelBurn = parseFloat((fuelBurn * 0.72).toFixed(1)); // 28% carbon savings
  } else if (solverType === "cost") {
    drivingHours = parseFloat((drivingHours * 1.35).toFixed(1)); // highway bypass delays
    tollsPaid = 0; // bypassed toll gates completely
  }

  const barData = [
    { name: "Time (Hrs)", Value: drivingHours, color: "#3b82f6" },
    { name: "Fuel (Ltrs)", Value: fuelBurn, color: "#10b981" },
    { name: "Tolls (₹/100)", Value: tollsPaid / 100, color: "#f59e0b" }
  ];

  const orderedHubs = ALL_HUBS.filter((h) => selectedHubs.includes(h.id));

  // Determine colors based on solver heuristic
  const pathColor = 
    solverType === "eco" ? "#10b981" : 
    solverType === "cost" ? "#f59e0b" : 
    "#6366f1";

  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-xl flex flex-col font-sans" id="routewise-browser">
      
      {/* ==================== BROWSER CHROME HEADER ==================== */}
      <div className="bg-zinc-100 px-4 py-3 border-b border-zinc-200 flex items-center gap-3 select-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-rose-400 block border border-rose-500/20"></span>
          <span className="w-3 h-3 rounded-full bg-amber-400 block border border-amber-500/20"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-400 block border border-emerald-500/20"></span>
        </div>
        <div className="flex-1 bg-white rounded-lg px-3 py-1 text-[11px] font-medium text-zinc-400 flex items-center gap-1.5 border border-zinc-200 font-mono">
          <span className="text-zinc-300">https://</span>
          <span className="text-zinc-600 font-bold">routewise.logistics.com</span>
        </div>
        <span className="text-[10px] font-bold text-indigo-600 px-2 uppercase tracking-wide shrink-0 bg-indigo-50 border border-indigo-200/50 rounded py-0.5">RouteWise Fleet OS</span>
      </div>

      {/* ==================== WEBSITE VIEWPORT ==================== */}
      <div className="bg-zinc-50 overflow-auto max-h-[85vh] relative text-zinc-800">
        
        {/* Navigation Bar */}
        <header className="bg-white border-b border-zinc-200/80 px-6 py-4 sticky top-0 z-40 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl flex items-center justify-center shadow-md">
              <Route className="text-white h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-zinc-950 tracking-tight text-base font-sans">RouteWise</span>
              <span className="text-[9px] bg-indigo-50 text-indigo-700 font-bold px-1.5 py-0.5 rounded ml-1.5 uppercase tracking-wider">Solver OS</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-zinc-500">
            <span className="text-zinc-800 font-black border-b-2 border-indigo-600 pb-1">Optimization Center</span>
            <span className="hover:text-indigo-600 cursor-pointer">Fleet Logs</span>
          </div>
        </header>

        {/* Workspace Arena */}
        <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Coordinates Mapping Canvas */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Map wrapper canvas */}
            <div className="rounded-3xl border border-zinc-200 bg-zinc-950 p-4 relative h-80 overflow-hidden select-none shadow-xl">
              {/* Grid backdrop details */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
              
              <div className="absolute top-4 right-4 rounded-xl bg-zinc-900 px-3 py-1.5 text-[8px] font-bold text-zinc-400 font-mono tracking-widest z-10 border border-zinc-800/80">
                ACTIVE GEOGRAPHIC CANVASES
              </div>

              {/* SVG Roads connect overlay */}
              <svg className="absolute inset-0 h-full w-full pointer-events-none z-10">
                {orderedHubs.length >= 2 && (
                  <polyline
                    points={orderedHubs.map((h) => `${h.x}%,${h.y}%`).join(" ")}
                    fill="none"
                    stroke={pathColor}
                    strokeWidth="3"
                    strokeDasharray="6, 5"
                  />
                )}
              </svg>

              {/* Hub coordinates pins */}
              {ALL_HUBS.map((hub) => {
                const isActive = selectedHubs.includes(hub.id);
                return (
                  <button
                    key={hub.id}
                    onClick={() => toggleHub(hub.id)}
                    style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group transition-all"
                  >
                    <div className="relative">
                      {/* Outer pulse when active */}
                      {isActive && (
                        <span className="absolute -inset-1.5 rounded-full bg-indigo-500/30 animate-ping" />
                      )}
                      
                      <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shadow-md ${
                        isActive 
                          ? "bg-indigo-600 border-white text-white scale-110" 
                          : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500"
                      }`}>
                        <MapPin className="h-3 w-3" />
                      </span>

                      {/* Tooltip on hover */}
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-7 bg-zinc-900 border border-zinc-800 text-[9px] font-extrabold text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
                        {hub.name} ({hub.cargoLoad})
                      </span>
                    </div>
                  </button>
                );
              })}

              {/* Floating solver animation truck indicator */}
              {animating && orderedHubs.length >= 2 && (
                <div 
                  className="absolute z-30 bg-indigo-500 border border-white text-white p-1 rounded-full shadow-lg"
                  style={{
                    left: `${orderedHubs[0].x + (orderedHubs[orderedHubs.length-1].x - orderedHubs[0].x) * (progress / 100)}%`,
                    top: `${orderedHubs[0].y + (orderedHubs[orderedHubs.length-1].y - orderedHubs[0].y) * (progress / 100)}%`,
                    transition: "all 0.1s linear"
                  }}
                >
                  <Truck className="h-4.5 w-4.5 animate-bounce" />
                </div>
              )}
            </div>

            {/* Selected checkpoints timeline */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 space-y-3 shadow-sm text-xs font-semibold">
              <div className="border-b border-zinc-100 pb-1.5">
                <h4 className="font-extrabold text-zinc-950 text-xs">Route Checkpoint Registry</h4>
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Timeline of optimized stops</p>
              </div>

              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {orderedHubs.length > 0 ? (
                  orderedHubs.map((hub, idx) => (
                    <div key={hub.id} className="p-2.5 border border-zinc-100 rounded-xl bg-zinc-50/50 flex justify-between items-center text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 font-black flex items-center justify-center text-[9px]">{idx+1}</span>
                        <div>
                          <div className="font-bold text-zinc-900">{hub.name}</div>
                          <div className="text-[9px] text-zinc-400">Cargo Allocation: {hub.cargoLoad}</div>
                        </div>
                      </div>
                      <span className="bg-zinc-100 border border-zinc-200 text-zinc-600 px-2 py-0.5 rounded text-[8px] font-mono">{hub.window}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-zinc-400 text-center py-4">No active stops. Click map nodes to schedule.</div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: solvers, configurations, statistics */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Heuristics Solver parameters */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 space-y-4 shadow-sm text-xs font-semibold">
              <div>
                <h3 className="font-extrabold text-zinc-950 text-xs font-sans">Solver Dispatch Heuristics</h3>
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Configure route calculation priority</p>
              </div>

              {/* Tabs */}
              <div className="flex bg-zinc-100 p-1 rounded-xl gap-1">
                {[
                  { id: "shortest", label: "Shortest" },
                  { id: "eco", label: "Green" },
                  { id: "cost", label: "Toll Save" }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSolverType(tab.id as any)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${solverType === tab.id ? "bg-indigo-600 text-white shadow" : "text-zinc-500 hover:text-zinc-800"}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Live solver trigger progress */}
              {animating && (
                <div className="space-y-1.5 bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4">
                  <div className="flex justify-between text-[10px] text-indigo-700 font-bold">
                    <span>SOLVER EXECUTING...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-zinc-200 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              <button
                onClick={handleRunOptimizer}
                disabled={animating}
                className="w-full bg-zinc-900 hover:bg-zinc-850 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className={`h-4 w-4 ${animating ? "animate-spin" : ""}`} />
                <span>Run Routing Solver</span>
              </button>
            </div>

            {/* Comparative Recharts stats */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm space-y-4 text-xs font-semibold">
              <div>
                <h3 className="font-extrabold text-zinc-950 text-xs">Estimated Trip Cost Metrics</h3>
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Calculated parameters</p>
              </div>

              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke="#888888" tickLine={false} />
                    <YAxis tick={{ fontSize: 9 }} stroke="#888888" tickLine={false} />
                    <Tooltip contentStyle={{ fontSize: 10 }} />
                    <Bar dataKey="Value" radius={[4, 4, 0, 0]}>
                      {barData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
