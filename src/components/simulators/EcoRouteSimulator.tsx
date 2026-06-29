import { useState } from "react";
import { 
  Leaf, 
  Award, 
  MapPin, 
  Calculator, 
  Info, 
  ChevronRight, 
  TrendingDown, 
  Calendar, 
  Target, 
  User, 
  CheckCircle2, 
  HelpCircle,
  AlertTriangle,
  Flame,
  Zap,
  Navigation,
  RefreshCw,
  TrendingUp,
  Download,
  Share2,
  Bookmark
} from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  AreaChart, 
  Area,
  PieChart,
  Pie
} from "recharts";

// ==================== TYPES & CONSTANTS ====================

interface TransitMode {
  id: string;
  name: string;
  factor: number; // kg CO2 per km
  type: "public" | "private" | "eco";
  avgCost: number; // ₹ per km
  co2SavedPerKm: number; // compared to Large SUV
  feasibilityBase: number; // out of 100
}

const TRANSPORTATION_MODES: TransitMode[] = [
  { id: "walking", name: "Walking", factor: 0.0, type: "eco", avgCost: 0, co2SavedPerKm: 0.24, feasibilityBase: 95 },
  { id: "cycling", name: "Bicycle / Cycling", factor: 0.0, type: "eco", avgCost: 0, co2SavedPerKm: 0.24, feasibilityBase: 85 },
  { id: "escooter", name: "Electric Scooter / Bike", factor: 0.015, type: "eco", avgCost: 1.5, co2SavedPerKm: 0.225, feasibilityBase: 90 },
  { id: "metro", name: "Namma Metro (Electric)", factor: 0.012, type: "eco", avgCost: 2.0, co2SavedPerKm: 0.228, feasibilityBase: 92 },
  { id: "bus_ordinary", name: "BMTC Ordinary Bus", factor: 0.045, type: "public", avgCost: 1.2, co2SavedPerKm: 0.195, feasibilityBase: 88 },
  { id: "bus_volvo", name: "BMTC AC Volvo Bus", factor: 0.032, type: "public", avgCost: 2.5, co2SavedPerKm: 0.208, feasibilityBase: 85 },
  { id: "train", name: "Suburban Rail Link", factor: 0.018, type: "public", avgCost: 1.0, co2SavedPerKm: 0.222, feasibilityBase: 80 },
  { id: "ev_car", name: "Electric Hatchback (EV)", factor: 0.040, type: "eco", avgCost: 1.8, co2SavedPerKm: 0.200, feasibilityBase: 78 },
  { id: "hybrid_car", name: "Hybrid Sedan", factor: 0.085, type: "private", avgCost: 5.5, co2SavedPerKm: 0.155, feasibilityBase: 75 },
  { id: "auto_rickshaw", name: "Auto Rickshaw (LPG)", factor: 0.095, type: "private", avgCost: 15.0, co2SavedPerKm: 0.145, feasibilityBase: 70 },
  { id: "petrol_car", name: "Petrol Sedan", factor: 0.165, type: "private", avgCost: 8.0, co2SavedPerKm: 0.075, feasibilityBase: 65 },
  { id: "diesel_suv", name: "Diesel SUV (Large)", factor: 0.240, type: "private", avgCost: 12.0, co2SavedPerKm: 0.000, feasibilityBase: 55 }
];

const BANGALORE_ROUTES = [
  { id: "majestic-ecity", from: "Majestic Bus Terminus", to: "Electronic City Phase 1", distance: 24, label: "Tech Corridor Route" },
  { id: "majestic-whitefield", from: "Majestic Bus Terminus", to: "ITPL Whitefield", distance: 22, label: "ITPL Commute" },
  { id: "electronic-whitefield", from: "Electronic City", to: "Whitefield ORR", distance: 28, label: "Outer Ring Road Route" },
  { id: "indiranagar-koramangala", from: "Indiranagar 100ft Rd", to: "Koramangala 5th Block", distance: 6, label: "Inner City Commute" },
  { id: "yeshwanthpur-hebbal", from: "Yeshwanthpur Metro", to: "Hebbal Flyover", distance: 9, label: "North Bangalore Link" }
];

interface Achievement {
  id: string;
  name: string;
  description: string;
  category: "bronze" | "silver" | "gold" | "platinum" | "diamond";
  threshold: number;
  progress: number;
  unlocked: boolean;
  icon: string;
}

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: "first_steps", name: "First Steps", description: "Log your first carbon-saving travel route", category: "bronze", threshold: 1, progress: 1, unlocked: true, icon: "🚶" },
  { id: "eco_warrior", name: "Eco Warrior Bronze", description: "Save a cumulative total of 10kg of CO₂", category: "bronze", threshold: 10, progress: 10, unlocked: true, icon: "🌱" },
  { id: "walker_bronze", name: "Walker Bronze", description: "Walk or ride bicycle for a combined 20 km", category: "bronze", threshold: 20, progress: 12, unlocked: false, icon: "🚲" },
  { id: "metro_fan", name: "Namma Metro Enthusiast", description: "Log 5 trips utilizing Namma Electric Metro", category: "silver", threshold: 5, progress: 3, unlocked: false, icon: "🚇" },
  { id: "carbon_silver", name: "Carbon Saver Silver", description: "Save a cumulative total of 50kg of CO₂", category: "silver", threshold: 50, progress: 28, unlocked: false, icon: "🌿" },
  { id: "green_champion", name: "Green Champion Gold", description: "Reach a continuous green commute streak of 10 days", category: "gold", threshold: 10, progress: 6, unlocked: false, icon: "🏆" },
  { id: "climate_diamond", name: "Climate Defender Diamond", description: "Save a cumulative total of 500kg of CO₂ emissions", category: "diamond", threshold: 500, progress: 28, unlocked: false, icon: "💎" }
];

export default function EcoRouteSimulator() {
  const [activeTab, setActiveTab] = useState<"calculator" | "dashboard" | "achievements" | "profile">("calculator");
  
  // Calculator States
  const [selectedRoute, setSelectedRoute] = useState(BANGALORE_ROUTES[0]);
  const [fromInput, setFromInput] = useState(BANGALORE_ROUTES[0].from);
  const [toInput, setToInput] = useState(BANGALORE_ROUTES[0].to);
  const [distanceInput, setDistanceInput] = useState<number>(BANGALORE_ROUTES[0].distance);
  const [selectedModeId, setSelectedModeId] = useState<string>("petrol_car");
  const [occupancy, setOccupancy] = useState<number>(1);
  const [selectedPeriod, setSelectedPeriod] = useState<"daily" | "weekly" | "monthly">("monthly");
  const [isCustomRoute, setIsCustomRoute] = useState(false);

  // Profile & Gamification State
  const [ecoPoints, setEcoPoints] = useState<number>(1450);
  const [streak, setStreak] = useState<number>(6);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // History State
  const [history, setHistory] = useState([
    { id: 1, from: "Indiranagar 100ft Rd", to: "Koramangala 5th Block", distance: 6, mode: "Namma Metro (Electric)", co2: 0.07, saved: 1.37, date: "Yesterday" },
    { id: 2, from: "Majestic Bus Terminus", to: "Electronic City Phase 1", distance: 24, mode: "BMTC AC Volvo Bus", co2: 0.77, saved: 4.99, date: "3 days ago" },
    { id: 3, from: "Yeshwanthpur Metro", to: "Hebbal Flyover", distance: 9, mode: "Bicycle / Cycling", co2: 0.00, saved: 2.16, date: "Last week" }
  ]);

  const handleRouteChange = (routeId: string) => {
    if (routeId === "custom") {
      setIsCustomRoute(true);
      setFromInput("");
      setToInput("");
      setDistanceInput(10);
    } else {
      setIsCustomRoute(false);
      const route = BANGALORE_ROUTES.find((r) => r.id === routeId);
      if (route) {
        setSelectedRoute(route);
        setFromInput(route.from);
        setToInput(route.to);
        setDistanceInput(route.distance);
      }
    }
  };

  const currentModeObj = TRANSPORTATION_MODES.find((m) => m.id === selectedModeId) || TRANSPORTATION_MODES[10];

  // Calculations
  const currentEmissions = parseFloat(((distanceInput * currentModeObj.factor) / (currentModeObj.type === "public" ? 1 : occupancy)).toFixed(2));
  const worstModeObj = TRANSPORTATION_MODES.find((m) => m.id === "diesel_suv")!;
  const worstEmissions = parseFloat((distanceInput * worstModeObj.factor).toFixed(2));
  const savedEmissions = parseFloat(Math.max(0, worstEmissions - currentEmissions).toFixed(2));
  const costTotal = Math.round(distanceInput * currentModeObj.avgCost);
  const treesEquivalent = parseFloat((savedEmissions * 0.045).toFixed(2)); // EPA rule of thumb

  // Generate comparisons data
  const comparisonsData = TRANSPORTATION_MODES.map((mode) => {
    const value = parseFloat(((distanceInput * mode.factor) / (mode.type === "public" ? 1 : (mode.id === selectedModeId ? occupancy : 1))).toFixed(2));
    return {
      name: mode.name,
      Emissions: value,
      isCurrent: mode.id === selectedModeId,
      type: mode.type
    };
  }).sort((a, b) => a.Emissions - b.Emissions);

  // Log commute handler
  const handleLogCommute = () => {
    let earnedPoints = 10;
    if (currentModeObj.type === "eco") earnedPoints = 50;
    else if (currentModeObj.type === "public") earnedPoints = 30;

    setEcoPoints((p) => p + earnedPoints);
    setStreak((s) => s + 1);

    const newLog = {
      id: history.length + 1,
      from: fromInput || "Custom Point A",
      to: toInput || "Custom Point B",
      distance: distanceInput,
      mode: currentModeObj.name,
      co2: currentEmissions,
      saved: savedEmissions,
      date: "Just logged"
    };

    setHistory([newLog, ...history]);

    // Check achievements progress
    setAchievements((prev) => 
      prev.map((ach) => {
        if (ach.unlocked) return ach;
        let prog = ach.progress;
        if (ach.id === "walker_bronze" && (selectedModeId === "walking" || selectedModeId === "cycling")) {
          prog = Math.min(ach.threshold, ach.progress + distanceInput);
        } else if (ach.id === "metro_fan" && selectedModeId === "metro") {
          prog = Math.min(ach.threshold, ach.progress + 1);
        } else if (ach.id === "carbon_silver" || ach.id === "climate_diamond") {
          prog = Math.min(ach.threshold, parseFloat((ach.progress + savedEmissions).toFixed(1)));
        }
        return {
          ...ach,
          progress: prog,
          unlocked: prog >= ach.threshold
        };
      })
    );

    alert(`Commute logged successfully! Earned +${earnedPoints} Green Points.`);
  };

  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-xl flex flex-col font-sans" id="ecoroute-browser">
      
      {/* ==================== BROWSER CHROME HEADER ==================== */}
      <div className="bg-zinc-100 px-4 py-3 border-b border-zinc-200 flex items-center gap-3 select-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-rose-400 block border border-rose-500/20"></span>
          <span className="w-3 h-3 rounded-full bg-amber-400 block border border-amber-500/20"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-400 block border border-emerald-500/20"></span>
        </div>
        <div className="flex-1 bg-white rounded-lg px-3 py-1 text-[11px] font-medium text-zinc-400 flex items-center gap-1.5 border border-zinc-200 font-mono">
          <span className="text-zinc-300">https://</span>
          <span className="text-zinc-600 font-bold">ecoroute.bmtc.gov.in</span>
        </div>
        <span className="text-[10px] font-bold text-emerald-600 px-2 uppercase tracking-wide shrink-0 bg-emerald-50 border border-emerald-200/50 rounded py-0.5">EcoRoute BLR v2.0</span>
      </div>

      {/* ==================== WEBSITE VIEWPORT ==================== */}
      <div className="bg-zinc-50 overflow-auto max-h-[85vh] relative text-zinc-800">
        
        {/* Navigation Bar */}
        <header className="bg-emerald-950 text-white px-6 py-4 sticky top-0 z-40 flex justify-between items-center shadow-md">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab("calculator")}>
            <div className="h-9 w-9 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Leaf className="text-white h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-white tracking-tight text-base">EcoRoute</span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.5 rounded ml-1.5 uppercase tracking-wider">DEFRA Cert</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-emerald-100">
            <button 
              onClick={() => setActiveTab("calculator")}
              className={`hover:text-white px-2 py-1 rounded transition-colors ${activeTab === "calculator" ? "text-white bg-emerald-900" : ""}`}
            >
              Planner
            </button>
            <button 
              onClick={() => setActiveTab("dashboard")}
              className={`hover:text-white px-2 py-1 rounded transition-colors ${activeTab === "dashboard" ? "text-white bg-emerald-900" : ""}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab("achievements")}
              className={`hover:text-white px-2 py-1 rounded transition-colors ${activeTab === "achievements" ? "text-white bg-emerald-900" : ""}`}
            >
              Badges
            </button>
            <button 
              onClick={() => setActiveTab("profile")}
              className={`hover:text-white px-2 py-1 rounded transition-colors ${activeTab === "profile" ? "text-white bg-emerald-900" : ""}`}
            >
              My ESG Pass
            </button>
          </div>

          <div className="flex items-center gap-2 bg-emerald-900 px-3 py-1.5 rounded-lg text-xs font-extrabold text-emerald-300 border border-emerald-800/40">
            <Flame className="h-4 w-4 text-orange-400" />
            <span>{streak} Day Streak</span>
          </div>
        </header>

        {/* ==================== PLANNER TAB ==================== */}
        {activeTab === "calculator" && (
          <div className="animate-fade-in p-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Form Column */}
            <div className="lg:col-span-5 bg-white border border-zinc-200 rounded-2xl p-5 space-y-4 shadow-sm text-xs font-semibold">
              <div className="border-b border-zinc-100 pb-2">
                <h2 className="text-sm font-black text-zinc-950">Green Journey Planner</h2>
                <p className="text-[10px] text-zinc-400 font-bold uppercase mt-0.5">Bangalore Localized Transit Hub</p>
              </div>

              {/* Route Presets Selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase">Preloaded BMTC Routes</label>
                <select 
                  onChange={(e) => handleRouteChange(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-emerald-600 font-bold"
                >
                  {BANGALORE_ROUTES.map(route => (
                    <option key={route.id} value={route.id}>{route.label} ({route.distance} km)</option>
                  ))}
                  <option value="custom">-- Configure Custom Journey --</option>
                </select>
              </div>

              {/* Custom Point inputs */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-zinc-400 uppercase">Starting From</label>
                  <input 
                    type="text" 
                    value={fromInput}
                    disabled={!isCustomRoute}
                    onChange={(e) => setFromInput(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600 disabled:opacity-50 font-bold" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-zinc-400 uppercase">Destination</label>
                  <input 
                    type="text" 
                    value={toInput}
                    disabled={!isCustomRoute}
                    onChange={(e) => setToInput(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2 text-xs focus:outline-none focus:border-emerald-600 disabled:opacity-50 font-bold" 
                  />
                </div>
              </div>

              {/* Distance Slider */}
              <div className="space-y-1 bg-zinc-50/50 border border-zinc-100 rounded-xl p-3">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-zinc-400 uppercase">Commute Distance</span>
                  <span className="font-black text-emerald-600 text-sm font-mono">{distanceInput} KM</span>
                </div>
                <input 
                  type="range" 
                  min={1} 
                  max={100} 
                  value={distanceInput}
                  disabled={!isCustomRoute}
                  onChange={(e) => setDistanceInput(parseInt(e.target.value))}
                  className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" 
                />
              </div>

              {/* Commuter Mode Selection */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase">Transportation Mode</label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {TRANSPORTATION_MODES.map(mode => (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedModeId(mode.id)}
                      className={`p-2 rounded-xl border text-left flex items-center justify-between transition-all ${
                        selectedModeId === mode.id
                          ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                          : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                      }`}
                    >
                      <div className="truncate">
                        <div className="font-bold text-[10px] truncate">{mode.name}</div>
                        <div className="text-[8px] text-zinc-400 mt-0.5">{mode.factor} kg CO2/km</div>
                      </div>
                      <span className={`w-2 h-2 rounded-full shrink-0 ${
                        mode.type === "eco" ? "bg-emerald-500" : mode.type === "public" ? "bg-blue-500" : "bg-orange-500"
                      }`}></span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Private vehicle occupancy */}
              {currentModeObj.type === "private" && (
                <div className="space-y-1.5 bg-zinc-50 border border-zinc-100 rounded-xl p-3">
                  <div className="flex justify-between text-[10px]">
                    <span className="font-bold text-zinc-400 uppercase">Vehicle Occupancy</span>
                    <span className="font-black text-indigo-600 font-mono">{occupancy} {occupancy === 1 ? "Person" : "People"}</span>
                  </div>
                  <input 
                    type="range" 
                    min={1} 
                    max={5} 
                    value={occupancy}
                    onChange={(e) => setOccupancy(parseInt(e.target.value))}
                    className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
                  />
                </div>
              )}

              <button
                onClick={handleLogCommute}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all tracking-wide shadow-lg shadow-emerald-600/15 flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Log Commute to Profile</span>
              </button>
            </div>

            {/* Live Comparative Gauges Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Core offset metrics */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { title: "Net Emissions", value: `${currentEmissions} kg`, sub: "CO₂ produced", color: "text-zinc-900" },
                  { title: "Green Savings", value: `${savedEmissions} kg`, sub: "CO₂ saved vs SUV", color: "text-emerald-600" },
                  { title: "Offset Equivalent", value: `${treesEquivalent} Trees`, sub: "Monthly offsets", color: "text-emerald-700" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm">
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">{stat.title}</span>
                    <div className={`text-base font-black font-mono mt-1 ${stat.color}`}>{stat.value}</div>
                    <span className="text-[9px] text-zinc-400 block mt-0.5">{stat.sub}</span>
                  </div>
                ))}
              </div>

              {/* Comparative Recharts bar chart */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm space-y-4">
                <div>
                  <h3 className="font-extrabold text-zinc-900 text-xs">Transportation CO₂ Emission Rates (kg CO₂)</h3>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase mt-0.5">Low-Emission modes comparison</p>
                </div>

                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonsData.slice(0, 7)} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                      <XAxis dataKey="name" tick={{ fontSize: 8 }} stroke="#888888" tickLine={false} />
                      <YAxis tick={{ fontSize: 8 }} stroke="#888888" tickLine={false} />
                      <Tooltip contentStyle={{ fontSize: 10 }} />
                      <Bar dataKey="Emissions" radius={[4, 4, 0, 0]}>
                        {comparisonsData.slice(0, 7).map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.isCurrent ? "#10b981" : entry.type === "eco" ? "#34d399" : entry.type === "public" ? "#3b82f6" : "#f97316"} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex justify-center gap-4 text-[9px] font-bold text-zinc-400 pt-2 border-t border-zinc-100">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500"></span> Current Selection</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-300"></span> Eco Mode</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-blue-500"></span> Public Transit</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ==================== DASHBOARD TAB ==================== */}
        {activeTab === "dashboard" && (
          <div className="animate-fade-in p-6 max-w-5xl mx-auto space-y-6">
            
            {/* Net Savings area chart */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h3 className="font-extrabold text-zinc-900 text-xs">Monthly CO₂ Savings Trend (kg CO₂)</h3>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase mt-0.5">Green Transit offsets</p>
                </div>
                <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-xs font-bold border border-emerald-100 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  <span>+18.5% Carbon Reduction</span>
                </div>
              </div>

              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[
                    { name: "Week 1", Saved: 12 },
                    { name: "Week 2", Saved: 24 },
                    { name: "Week 3", Saved: 18 },
                    { name: "Week 4", Saved: 35 },
                    { name: "Week 5", Saved: 42 }
                  ]} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke="#888888" tickLine={false} />
                    <YAxis tick={{ fontSize: 9 }} stroke="#888888" tickLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="Saved" stroke="#059669" fill="#10b981" fillOpacity={0.1} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Commute History list */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm space-y-3">
              <div className="border-b border-zinc-100 pb-2">
                <h3 className="font-extrabold text-zinc-950 text-xs">Logged Journey History</h3>
                <p className="text-[10px] text-zinc-400 font-bold uppercase mt-0.5">Scope 3 Audit Logs</p>
              </div>

              <div className="space-y-3 text-xs">
                {history.map(item => (
                  <div key={item.id} className="flex justify-between items-center p-3 border border-zinc-150 rounded-xl bg-zinc-50/50 hover:border-zinc-300 transition-all">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-extrabold text-zinc-900">{item.from} → {item.to}</span>
                        <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold px-1.5 py-0.5 rounded text-[8px] uppercase">{item.mode}</span>
                      </div>
                      <div className="text-[10px] text-zinc-400 font-medium">Distance: {item.distance} KM • Date: {item.date}</div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-emerald-600 font-bold block">-{item.saved} kg CO₂</span>
                      <span className="text-[9px] text-zinc-400 block font-mono">Emitted: {item.co2} kg</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ==================== ACHIEVEMENTS TAB ==================== */}
        {activeTab === "achievements" && (
          <div className="animate-fade-in p-6 max-w-5xl mx-auto space-y-6">
            
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider border border-amber-200">Gamification Portal</span>
              <h2 className="text-xl font-extrabold text-zinc-950 tracking-tight">Tiered Green Achievement Badges</h2>
              <p className="text-xs text-zinc-500 font-medium">Accumulate points by taking sustainable transport and unlock real loyalty rewards.</p>
            </div>

            {/* Category filter buttons */}
            <div className="flex justify-center gap-2 select-none">
              {["all", "bronze", "silver", "gold", "diamond"].map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all uppercase ${
                    selectedCategory === category
                      ? "bg-emerald-900 text-white"
                      : "bg-white border border-zinc-200 text-zinc-500 hover:bg-zinc-50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Achievements Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              {achievements
                .filter(ach => selectedCategory === "all" || ach.category === selectedCategory)
                .map(ach => (
                  <div 
                    key={ach.id} 
                    className={`bg-white border rounded-2xl p-4 flex gap-4 transition-all ${
                      ach.unlocked ? "border-emerald-200 shadow-sm" : "border-zinc-200 opacity-70"
                    }`}
                  >
                    <span className="text-3xl bg-zinc-50 rounded-xl p-2 h-fit border border-zinc-100">{ach.icon}</span>
                    <div className="flex-1 space-y-1.5 text-xs">
                      <div className="flex justify-between items-center">
                        <h3 className="font-extrabold text-zinc-950">{ach.name}</h3>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                          ach.category === "diamond" ? "bg-cyan-50 text-cyan-700 border border-cyan-100" :
                          ach.category === "gold" ? "bg-amber-50 text-amber-700 border border-amber-100" :
                          "bg-zinc-50 text-zinc-600 border border-zinc-100"
                        }`}>{ach.category}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 font-medium leading-normal">{ach.description}</p>
                      
                      {/* Progress bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] font-mono font-bold text-zinc-400">
                          <span>Progress: {ach.progress} / {ach.threshold}</span>
                          <span className={ach.unlocked ? "text-emerald-600" : "text-zinc-400"}>
                            {ach.unlocked ? "UNLOCKED" : `${Math.round((ach.progress/ach.threshold)*100)}%`}
                          </span>
                        </div>
                        <div className="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${ach.unlocked ? "bg-emerald-500" : "bg-zinc-300"}`}
                            style={{ width: `${Math.min(100, (ach.progress / ach.threshold) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

          </div>
        )}

        {/* ==================== PROFILE / ESG PASS TAB ==================== */}
        {activeTab === "profile" && (
          <div className="animate-fade-in p-6 max-w-xl mx-auto space-y-6 text-zinc-800">
            
            {/* Boarding Card design */}
            <div className="border border-zinc-200 rounded-3xl overflow-hidden bg-white shadow-xl">
              <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white p-6 relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl"></div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-600 rounded-full border-2 border-emerald-400 flex items-center justify-center font-black text-white text-lg">KA</div>
                  <div>
                    <h3 className="font-extrabold text-base">Kiran Acharya</h3>
                    <div className="text-[9px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.5 rounded w-fit uppercase tracking-widest mt-0.5">Corporate Member - Bangalore</div>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6 text-xs font-semibold">
                
                {/* Points tally list */}
                <div className="grid grid-cols-2 gap-4 border-b border-zinc-100 pb-4">
                  <div>
                    <span className="text-[9px] text-zinc-400 uppercase font-bold">Total Green Points</span>
                    <div className="text-xl font-black text-zinc-950 font-mono mt-0.5">{ecoPoints} PTS</div>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-400 uppercase font-bold">Scope 3 Audit Status</span>
                    <div className="text-emerald-600 font-extrabold mt-0.5 flex items-center gap-1">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span> Compliant (Diamond)
                    </div>
                  </div>
                </div>

                {/* Scope 3 detailed description */}
                <div className="space-y-1.5 bg-zinc-50 border border-zinc-100 rounded-2xl p-4">
                  <h4 className="text-[10px] font-bold text-zinc-400 uppercase">ESG Compliance Checklist</h4>
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">Your aggregate commute carbon footprint meets the strict Net-Zero targets established under India's ESG corporate guidelines. Carbon intensity has dropped by 34% compared to standard fuel averages.</p>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => alert("Certificate downloaded successfully!")}
                    className="flex-1 bg-zinc-900 hover:bg-zinc-850 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Green Certificate</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
