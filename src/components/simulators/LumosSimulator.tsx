import { useState } from "react";
import { 
  Lightbulb, 
  Info, 
  Sun, 
  Zap, 
  ShieldAlert, 
  Sparkles,
  Power,
  RotateCcw,
  Gauge,
  CheckCircle2,
  Cpu,
  RefreshCw,
  Sliders,
  Radio,
  Eye
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip,
  CartesianGrid
} from "recharts";

// ==================== TYPES & CONSTANTS ====================

interface LightingZone {
  id: string;
  name: string;
  isOn: boolean;
  brightness: number; // 0 - 100
  color: string;
  warmth: number; // Kelvin (2000K to 6500K)
}

const INITIAL_ZONES: LightingZone[] = [
  { id: "overhead", name: "Cabin Overhead Ambient", isOn: true, brightness: 80, color: "#fef08a", warmth: 3500 },
  { id: "reading", name: "Individual Reading Spotlights", isOn: true, brightness: 50, color: "#ffffff", warmth: 4500 },
  { id: "floor", name: "Floor Guidance LED Rails", isOn: true, brightness: 30, color: "#3b82f6", warmth: 2500 }
];

export default function LumosSimulator() {
  const [zones, setZones] = useState<LightingZone[]>(INITIAL_ZONES);
  const [activePreset, setActivePreset] = useState<"reading" | "sleeping" | "boarding" | "eco">("reading");

  const handleZoneToggle = (zoneId: string) => {
    setZones((prev) =>
      prev.map((z) => (z.id === zoneId ? { ...z, isOn: !z.isOn } : z))
    );
  };

  const handleSliderChange = (zoneId: string, param: "brightness" | "warmth", value: number) => {
    setZones((prev) =>
      prev.map((z) => (z.id === zoneId ? { ...z, [param]: value } : z))
    );
  };

  const handleColorChange = (zoneId: string, hexColor: string) => {
    setZones((prev) =>
      prev.map((z) => (z.id === zoneId ? { ...z, color: hexColor } : z))
    );
  };

  const applyPreset = (preset: "reading" | "sleeping" | "boarding" | "eco") => {
    setActivePreset(preset);
    setZones((prev) => {
      switch (preset) {
        case "reading":
          return prev.map((z) =>
            z.id === "reading"
              ? { ...z, isOn: true, brightness: 70, warmth: 4500, color: "#ffffff" }
              : z.id === "overhead"
              ? { ...z, isOn: true, brightness: 40, warmth: 3000, color: "#fef08a" }
              : { ...z, isOn: false }
          );
        case "sleeping":
          return prev.map((z) =>
            z.id === "floor"
              ? { ...z, isOn: true, brightness: 15, color: "#3b82f6" }
              : { ...z, isOn: false, brightness: 0 }
          );
        case "boarding":
          return prev.map((z) => ({
            ...z,
            isOn: true,
            brightness: 100,
            warmth: 5500,
            color: "#ffffff"
          }));
        case "eco":
          return prev.map((z) =>
            z.id === "floor"
              ? { ...z, isOn: true, brightness: 12, color: "#10b981" }
              : { ...z, isOn: false }
          );
        default:
          return prev;
      }
    });
  };

  // Calculate live power: sum of (brightness * wattage factors)
  const currentPower = zones.reduce((sum, z) => {
    if (!z.isOn) return sum;
    const baseWattage = z.id === "overhead" ? 18 : z.id === "reading" ? 12 : 8;
    return sum + (z.brightness / 100) * baseWattage;
  }, 0);

  const baselinePower = 38.0; // Max normal draw
  const savingsPercent = parseFloat((((baselinePower - currentPower) / baselinePower) * 100).toFixed(0));

  const liveChartData = [
    { time: "18:00", Draw: 35 },
    { time: "19:00", Draw: 28 },
    { time: "20:00", Draw: currentPower + 6 },
    { time: "21:00", Draw: parseFloat(currentPower.toFixed(1)) }
  ];

  return (
    <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl flex flex-col font-sans" id="lumos-browser">
      
      {/* ==================== BROWSER CHROME HEADER ==================== */}
      <div className="bg-zinc-900 px-4 py-3 border-b border-zinc-800 flex items-center gap-3 select-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-rose-500 block"></span>
          <span className="w-3 h-3 rounded-full bg-amber-500 block"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-500 block"></span>
        </div>
        <div className="flex-1 bg-zinc-950 rounded-lg px-3 py-1 text-[11px] font-medium text-zinc-600 flex items-center gap-1.5 border border-zinc-800 font-mono">
          <span className="text-zinc-700">https://</span>
          <span className="text-zinc-400 font-bold">console.lumos-lighting.net</span>
        </div>
        <span className="text-[10px] font-bold text-yellow-500 px-2 uppercase tracking-wide shrink-0 bg-yellow-500/10 border border-yellow-500/20 rounded py-0.5">Lumos Smart IoT Console</span>
      </div>

      {/* ==================== WEBSITE VIEWPORT ==================== */}
      <div className="bg-zinc-900 text-zinc-100 overflow-auto max-h-[85vh] relative">
        
        {/* Navigation Bar */}
        <header className="bg-zinc-950 border-b border-zinc-800 px-6 py-4 sticky top-0 z-40 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
              <Lightbulb className="text-zinc-950 h-5 w-5 fill-zinc-950" />
            </div>
            <div>
              <span className="font-extrabold text-white tracking-tight text-base">Lumos Central</span>
              <span className="text-[9px] bg-yellow-500/10 text-yellow-500 font-bold px-1.5 py-0.5 rounded ml-1.5 uppercase tracking-wider border border-yellow-500/20">Active IoT</span>
            </div>
          </div>

          {/* Quick Stats header */}
          <div className="flex gap-4 text-xs font-semibold text-zinc-400 border-l border-zinc-800 pl-4">
            <div>
              <span className="text-zinc-500 block text-[9px] uppercase">Power Draw</span>
              <span className="text-white font-mono">{currentPower.toFixed(1)}W</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[9px] uppercase">Efficiency Saved</span>
              <span className="text-emerald-400 font-mono">+{savingsPercent}%</span>
            </div>
          </div>
        </header>

        {/* Workspace Arena */}
        <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Interactive Glowing Cab Layout */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-center shadow-inner relative overflow-hidden min-h-[420px]">
            {/* Ambient lighting reflections on container */}
            <div 
              className="absolute inset-0 opacity-15 transition-all duration-700 blur-3xl pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${zones.find(z => z.id === 'overhead')?.color || '#ffffff'} 0%, transparent 70%)`
              }}
            ></div>

            <div className="relative z-10 space-y-4 w-full">
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1.5 justify-center">
                <Radio className="h-3.5 w-3.5 text-yellow-500 animate-pulse" /> Live Coach Cabinet Simulation
              </div>

              {/* Graphical representation of the glowing bus cabin seats */}
              <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 flex flex-col gap-4 max-w-xs mx-auto">
                <div className="text-[9px] text-zinc-500 font-bold uppercase border-b border-zinc-800 pb-2">Coach Ceiling Perspective</div>
                
                {/* Visual lights */}
                <div className="flex justify-between px-4">
                  {[1, 2, 3].map(i => {
                    const overhead = zones.find(z => z.id === "overhead");
                    return (
                      <div 
                        key={i} 
                        className="w-4 h-4 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: overhead?.isOn ? overhead.color : "#27272a",
                          boxShadow: overhead?.isOn ? `0 0 16px ${overhead.color}, 0 0 4px ${overhead.color}` : "none"
                        }}
                      />
                    );
                  })}
                </div>

                {/* Grid rows */}
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(idx => {
                    const reading = zones.find(z => z.id === "reading");
                    const floor = zones.find(z => z.id === "floor");
                    return (
                      <div 
                        key={idx} 
                        className="bg-zinc-950 rounded-xl p-3 border transition-all duration-300"
                        style={{
                          borderColor: floor?.isOn ? floor.color : "#27272a",
                          boxShadow: floor?.isOn ? `0 0 8px ${floor.color}15` : "none"
                        }}
                      >
                        <div className="text-[8px] text-zinc-600 font-bold font-mono">Seat {idx}A</div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: reading?.isOn ? reading.color : "#27272a" }} />
                          <span className="text-[7px] text-zinc-500">Lux Ready</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="text-[8px] text-zinc-500 leading-normal">Floor Guidance LED Rails glow dynamically along the aisle paths.</div>
              </div>
            </div>
          </div>

          {/* Right Column: sliders, controls, presets, power graphs */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Presets and Central sliders */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5 space-y-5 shadow-sm text-xs font-semibold">
              <div className="border-b border-zinc-800 pb-3 flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h3 className="font-extrabold text-white text-sm">Zone Calibration Hub</h3>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">Hardware calibration controls</p>
                </div>

                {/* Preset switcher tabs */}
                <div className="flex bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
                  {[
                    { id: "reading", label: "Reading" },
                    { id: "sleeping", label: "Sleep" },
                    { id: "boarding", label: "Board" },
                    { id: "eco", label: "Eco" }
                  ].map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => applyPreset(preset.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activePreset === preset.id ? "bg-yellow-500 text-zinc-950 shadow" : "text-zinc-400 hover:text-white"}`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Zones sliders */}
              <div className="space-y-4">
                {zones.map(zone => (
                  <div key={zone.id} className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleZoneToggle(zone.id)}
                          className={`p-1.5 rounded-lg border transition-all ${
                            zone.isOn 
                              ? "bg-yellow-500 border-yellow-400 text-zinc-950" 
                              : "bg-zinc-950 border-zinc-850 text-zinc-500"
                          }`}
                        >
                          <Power className="h-4 w-4" />
                        </button>
                        <div>
                          <span className="font-extrabold text-white block">{zone.name}</span>
                          <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider">Interface ID: {zone.id}</span>
                        </div>
                      </div>

                      {/* Color circles */}
                      {zone.isOn && (
                        <div className="flex gap-1.5">
                          {["#ffffff", "#fef08a", "#3b82f6", "#10b981", "#f43f5e"].map(color => (
                            <button
                              key={color}
                              onClick={() => handleColorChange(zone.id, color)}
                              className="w-4 h-4 rounded-full border border-zinc-800 transition-transform active:scale-95"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {zone.isOn && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-zinc-850">
                        {/* Brightness slider */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px] text-zinc-500 font-bold uppercase">
                            <span>Brightness</span>
                            <span className="font-mono text-zinc-300">{zone.brightness}%</span>
                          </div>
                          <input 
                            type="range" 
                            min={0} 
                            max={100} 
                            value={zone.brightness}
                            onChange={(e) => handleSliderChange(zone.id, "brightness", parseInt(e.target.value))}
                            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-yellow-500" 
                          />
                        </div>

                        {/* Kelvin warmth slider */}
                        {zone.id !== "floor" && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-[9px] text-zinc-500 font-bold uppercase">
                              <span>Color Temp (Kelvin)</span>
                              <span className="font-mono text-zinc-300">{zone.warmth}K</span>
                            </div>
                            <input 
                              type="range" 
                              min={2000} 
                              max={6500} 
                              step={500}
                              value={zone.warmth}
                              onChange={(e) => handleSliderChange(zone.id, "warmth", parseInt(e.target.value))}
                              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-yellow-500" 
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Power usage & load monitors charts */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5 shadow-sm space-y-4 text-xs">
              <div>
                <h3 className="font-extrabold text-white text-sm">Central Wattage Draw Metrics</h3>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">Load metrics (Watts)</p>
              </div>

              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={liveChartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis dataKey="time" tick={{ fontSize: 9 }} stroke="#52525b" tickLine={false} />
                    <YAxis tick={{ fontSize: 9 }} stroke="#52525b" tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", fontSize: 10 }} />
                    <Area type="monotone" dataKey="Draw" stroke="#eab308" fill="#eab308" fillOpacity={0.08} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
