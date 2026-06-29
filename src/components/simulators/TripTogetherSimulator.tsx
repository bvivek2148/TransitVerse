import { useState } from "react";
import { 
  Users, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  MapPin, 
  Bus, 
  CheckCircle2, 
  ArrowRight, 
  DollarSign, 
  Clock, 
  Sparkles,
  Info,
  ChevronRight,
  UserPlus,
  Compass,
  FileText,
  ArrowLeft,
  Wifi,
  Coffee,
  Zap,
  CheckCircle,
  QrCode,
  HeartHandshake
} from "lucide-react";

// ==================== TYPES & CONSTANTS ====================

interface VehicleOption {
  type: string;
  capacity: number;
  basePrice: number; // ₹ base per km
  fixedCost: number; // ₹ flat booking cost
  icon: string;
  description: string;
}

const VEHICLES: VehicleOption[] = [
  { type: "Tempo Traveller (AC)", capacity: 12, basePrice: 18, fixedCost: 2500, icon: "🚐", description: "Perfect for family weekend getaways and office teams." },
  { type: "Mini Coach Bus (Standard)", capacity: 25, basePrice: 28, fixedCost: 4500, icon: "🚌", description: "Ideal for weddings, pilgrimage groups, or corporate trips." },
  { type: "Luxury Multi-Axle Volvo Coach", capacity: 45, basePrice: 42, fixedCost: 7500, icon: "🚛", description: "Premium executive seating, superb suspension, maximum comfort." }
];

interface Amenity {
  id: string;
  name: string;
  cost: number;
  description: string;
}

const AMENITIES: Amenity[] = [
  { id: "wifi", name: "High-Speed Bus WiFi", cost: 1500, description: "Shared 4G WiFi during transit" },
  { id: "restroom", name: "In-Bus Eco Restroom", cost: 3500, description: "Available for Luxury Coach models only" },
  { id: "charger", name: "USB Charge Ports (Every Seat)", cost: 800, description: "Individual seat-mounted charging plugs" },
  { id: "refreshment", name: "Snacks & Cold Beverages Pack", cost: 2500, description: "Sealed water bottles & light chips box" }
];

export default function TripTogetherSimulator() {
  const [currentStep, setCurrentStep] = useState<"landing" | "planner" | "reserved">("landing");

  // Selection states
  const [selectedVehicle, setSelectedVehicle] = useState(VEHICLES[0]);
  const [waypoints, setWaypoints] = useState<string[]>([
    "Majestic Bus Terminus, Bangalore",
    "Mysore Palace Road, Mysore",
    "Madikeri Town Center, Coorg"
  ]);
  const [newWaypoint, setNewWaypoint] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(["charger"]);
  const [members, setMembers] = useState<string[]>([
    "Ananya Sharma", "Rahul Dravid", "Sneha Patil", "Karthik Raja", "Priya Nair"
  ]);
  const [newMemberName, setNewMemberName] = useState("");
  const [pnrNumber, setPnrNumber] = useState("");

  // Distance estimation based on stops
  const estimatedDistance = Math.max(50, waypoints.length * 115);

  const handleAddWaypoint = () => {
    if (!newWaypoint.trim()) return;
    setWaypoints(prev => [...prev, newWaypoint.trim()]);
    setNewWaypoint("");
  };

  const handleRemoveWaypoint = (index: number) => {
    if (waypoints.length <= 2) {
      alert("At least a Start and End waypoint are required!");
      return;
    }
    setWaypoints(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleAddMember = () => {
    if (!newMemberName.trim()) return;
    if (members.length >= selectedVehicle.capacity) {
      alert(`The selected vehicle only fits up to ${selectedVehicle.capacity} passengers! Upgrade your Coach Class to add more.`);
      return;
    }
    setMembers(prev => [...prev, newMemberName.trim()]);
    setNewMemberName("");
  };

  const handleRemoveMember = (index: number) => {
    setMembers(prev => prev.filter((_, idx) => idx !== index));
  };

  const toggleAmenity = (amenityId: string) => {
    if (amenityId === "restroom" && selectedVehicle.capacity < 45) {
      alert("In-Bus Restrooms are only supported on 45-seater Luxury Volvo Coaches!");
      return;
    }
    if (selectedAmenities.includes(amenityId)) {
      setSelectedAmenities(prev => prev.filter(id => id !== amenityId));
    } else {
      setSelectedAmenities(prev => [...prev, amenityId]);
    }
  };

  const handleVehicleChange = (vehicle: VehicleOption) => {
    setSelectedVehicle(vehicle);
    if (vehicle.capacity < 45) {
      setSelectedAmenities(prev => prev.filter(id => id !== "restroom"));
    }
  };

  // Cost calculations
  const distanceCost = estimatedDistance * selectedVehicle.basePrice;
  const amenitiesCost = selectedAmenities.reduce((sum, id) => {
    const am = AMENITIES.find(a => a.id === id);
    return sum + (am ? am.cost : 0);
  }, 0);
  
  const totalRentalCost = distanceCost + selectedVehicle.fixedCost + amenitiesCost;
  const numMembers = Math.max(1, members.length);
  const costPerPerson = Math.round(totalRentalCost / numMembers);

  const handleConfirmReservation = () => {
    const randPNR = "TT" + Math.floor(200000 + Math.random() * 700000);
    setPnrNumber(randPNR);
    setCurrentStep("reserved");
  };

  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-xl flex flex-col font-sans" id="triptogether-browser">
      
      {/* ==================== BROWSER CHROME HEADER ==================== */}
      <div className="bg-zinc-100 px-4 py-3 border-b border-zinc-200 flex items-center gap-3 select-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-rose-400 block border border-rose-500/20"></span>
          <span className="w-3 h-3 rounded-full bg-amber-400 block border border-amber-500/20"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-400 block border border-emerald-500/20"></span>
        </div>
        <div className="flex-1 bg-white rounded-lg px-3 py-1 text-[11px] font-medium text-zinc-400 flex items-center gap-1.5 border border-zinc-200 font-mono">
          <span className="text-zinc-300">https://</span>
          <span className="text-zinc-600 font-bold">www.triptogether.co.in</span>
        </div>
        <span className="text-[10px] font-bold text-purple-600 px-2 uppercase tracking-wide shrink-0 bg-purple-50 border border-purple-200/50 rounded py-0.5">TripTogether v1.1</span>
      </div>

      {/* ==================== WEBSITE VIEWPORT ==================== */}
      <div className="bg-zinc-50 overflow-auto max-h-[85vh] relative text-zinc-800">
        
        {/* Navigation Bar */}
        <header className="bg-white border-b border-zinc-200/80 px-6 py-4 sticky top-0 z-40 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentStep("landing")}>
            <div className="h-9 w-9 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <Users className="text-white h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-zinc-950 tracking-tight text-base">TripTogether</span>
              <span className="text-[9px] bg-purple-50 text-purple-700 font-bold px-1.5 py-0.5 rounded ml-1.5 uppercase tracking-wider">Charter</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-500">
            <span className="hover:text-purple-600 cursor-pointer transition-colors" onClick={() => setCurrentStep("landing")}>Charter Vehicles</span>
            <span className="hover:text-purple-600 cursor-pointer transition-colors">Split Calculator</span>
            <span className="hover:text-purple-600 cursor-pointer transition-colors">Route Planner</span>
            <span className="hover:text-purple-600 cursor-pointer transition-colors">About Us</span>
          </div>
          <div>
            <button 
              onClick={() => { setSelectedVehicle(VEHICLES[2]); setCurrentStep("planner"); }}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md shadow-purple-600/10 cursor-pointer"
            >
              Start Planner
            </button>
          </div>
        </header>

        {/* ==================== LANDING STEP ==================== */}
        {currentStep === "landing" && (
          <div className="animate-fade-in pb-12">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-indigo-900 via-purple-950 to-slate-950 text-white py-16 px-8 text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>

              <span className="bg-purple-500/20 text-purple-300 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border border-purple-400/20">
                ⭐ Group Travel Solved
              </span>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                Plan Trips. Hire Coaches. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400">Split Costs. Perfectly.</span>
              </h1>
              <p className="text-sm md:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
                The ultimate planner for group travel. Reserve customizable high-end vehicles, plot multi-stop itineraries, invite friends, and divide costs transparently.
              </p>
            </div>

            {/* Fleet Cards Section */}
            <div className="max-w-5xl mx-auto px-6 pt-12 space-y-6">
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-extrabold text-zinc-950 tracking-tight">Explore Our Charter Fleet</h2>
                <p className="text-xs text-zinc-500 font-medium">Select a premium vehicle capacity to begin scheduling your collaborative itinerary</p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {VEHICLES.map((v) => (
                  <div key={v.type} className="bg-white border border-zinc-200 rounded-3xl p-5 flex flex-col justify-between hover:border-purple-400 hover:shadow-lg transition-all space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-3xl bg-zinc-50 rounded-xl p-2 border border-zinc-100">{v.icon}</span>
                        <span className="bg-purple-50 text-purple-700 font-extrabold px-2.5 py-0.5 rounded text-[9px] uppercase tracking-wide">Fits {v.capacity} Pax</span>
                      </div>
                      <div>
                        <h3 className="font-extrabold text-zinc-900 text-sm">{v.type}</h3>
                        <p className="text-xs text-zinc-500 leading-normal font-medium mt-1">{v.description}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-zinc-400 uppercase font-bold block">Base Rate</span>
                        <span className="text-base font-black text-zinc-950 font-mono">₹{v.basePrice}/KM</span>
                      </div>
                      <button 
                        onClick={() => { handleVehicleChange(v); setCurrentStep("planner"); }}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-purple-600/10 cursor-pointer"
                      >
                        Charter Vehicle
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== PLANNER WORKSPACE STEP ==================== */}
        {currentStep === "planner" && (
          <div className="animate-fade-in p-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Hand: Route Plan & Group Roster */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Route Waypoints Card */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-5 space-y-4 shadow-sm text-xs font-semibold">
                <div className="border-b border-zinc-100 pb-2 flex justify-between items-center">
                  <div>
                    <h3 className="font-extrabold text-zinc-950 text-sm">Itinerary Schedule</h3>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Multi-stop route plot</p>
                  </div>
                  <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-bold">{estimatedDistance} KM total</span>
                </div>

                <div className="space-y-3">
                  <div className="relative border-l-2 border-dashed border-zinc-200 pl-4 space-y-4">
                    {waypoints.map((point, index) => (
                      <div key={index} className="relative flex items-center justify-between gap-2">
                        <span className="absolute -left-[21px] w-2.5 h-2.5 rounded-full bg-purple-600 border-2 border-purple-100 block shrink-0"></span>
                        <span className="font-bold text-zinc-800 truncate">{point}</span>
                        <button 
                          onClick={() => handleRemoveWaypoint(index)}
                          className="p-1 hover:bg-rose-50 text-rose-500 rounded transition-colors shrink-0 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-zinc-100">
                    <input 
                      type="text" 
                      placeholder="Add destination stop..." 
                      value={newWaypoint}
                      onChange={(e) => setNewWaypoint(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddWaypoint()}
                      className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-purple-600" 
                    />
                    <button 
                      onClick={handleAddWaypoint}
                      className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Group Passenger roster card */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-5 space-y-4 shadow-sm text-xs font-semibold">
                <div className="border-b border-zinc-100 pb-2 flex justify-between items-center">
                  <div>
                    <h3 className="font-extrabold text-zinc-950 text-sm">Group Co-Travelers</h3>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Split ledger roster</p>
                  </div>
                  <span className="bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded font-bold">{members.length} / {selectedVehicle.capacity} Pax</span>
                </div>

                <div className="space-y-2">
                  <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                    {members.map((member, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border border-zinc-100 rounded-lg bg-zinc-50/50 hover:bg-zinc-100 transition-colors">
                        <span className="font-bold text-zinc-700">{member}</span>
                        <button 
                          onClick={() => handleRemoveMember(index)}
                          className="p-1 text-zinc-400 hover:text-rose-500 rounded cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-zinc-100">
                    <input 
                      type="text" 
                      placeholder="Add companion name..." 
                      value={newMemberName}
                      onChange={(e) => setNewMemberName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddMember()}
                      className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-purple-600" 
                    />
                    <button 
                      onClick={handleAddMember}
                      className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg cursor-pointer"
                    >
                      <UserPlus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Hand: Configs, Pricing, Cost Share Graph */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Vehicle & Amenity config row */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-5 space-y-4 shadow-sm text-xs font-semibold">
                <div>
                  <h3 className="font-extrabold text-zinc-950 text-sm">Vehicle & Amenities Config</h3>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Customize charter luxury specs</p>
                </div>

                {/* Class selector */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase block">Vehicle Class Model</label>
                  <div className="grid grid-cols-3 gap-2">
                    {VEHICLES.map(v => (
                      <button
                        key={v.type}
                        onClick={() => handleVehicleChange(v)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          selectedVehicle.type === v.type
                            ? "border-purple-600 bg-purple-50 text-purple-700"
                            : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                        }`}
                      >
                        <span className="text-xl block">{v.icon}</span>
                        <span className="font-bold text-[10px] block mt-1 truncate">{v.type.split(" ")[0]}</span>
                        <span className="text-[8px] text-zinc-400 font-medium block mt-0.5">Fits {v.capacity} Pax</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities checklist */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase block">In-Transit Luxury Amenities</label>
                  <div className="grid grid-cols-2 gap-2">
                    {AMENITIES.map(amenity => {
                      const isSelected = selectedAmenities.includes(amenity.id);
                      return (
                        <button
                          key={amenity.id}
                          onClick={() => toggleAmenity(amenity.id)}
                          className={`p-2.5 rounded-xl border text-left flex justify-between items-center transition-all ${
                            isSelected
                              ? "border-purple-600 bg-purple-50 text-purple-700"
                              : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                          }`}
                        >
                          <div>
                            <div className="font-bold text-[10px]">{amenity.name}</div>
                            <div className="text-[8px] text-zinc-400 mt-0.5">{amenity.description}</div>
                          </div>
                          <span className="font-bold text-[9px] text-purple-600 font-mono">₹{amenity.cost}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Share splits bento and billing */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-5 space-y-4 shadow-sm text-xs font-semibold">
                <div className="border-b border-zinc-100 pb-2 flex justify-between items-center">
                  <div>
                    <h3 className="font-extrabold text-zinc-950 text-sm">Cost split summary</h3>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Transparent individual splits</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-zinc-400 uppercase block">Share Per Person</span>
                    <span className="text-base font-black text-purple-600 font-mono">₹{costPerPerson}</span>
                  </div>
                </div>

                {/* Visual split chart */}
                <div className="space-y-2 bg-zinc-50 border border-zinc-100 rounded-2xl p-4">
                  <div className="text-[10px] text-zinc-400 font-bold uppercase flex items-center gap-1.5">
                    <HeartHandshake className="h-4 w-4 text-purple-600" /> Co-Travelers splitting share
                  </div>
                  <div className="space-y-2 pt-2">
                    {members.slice(0, 4).map((member, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-[9px] font-bold text-zinc-500">
                          <span>{member}</span>
                          <span className="font-mono">₹{costPerPerson}</span>
                        </div>
                        <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
                          <div className="h-full rounded-full bg-purple-500" style={{ width: `${100 / Math.max(1, members.length)}%` }}></div>
                        </div>
                      </div>
                    ))}
                    {members.length > 4 && (
                      <div className="text-[9px] text-zinc-400 text-center font-bold font-mono">And {members.length - 4} other companion splits...</div>
                    )}
                  </div>
                </div>

                {/* Sub totals */}
                <div className="space-y-2 border-t border-zinc-100 pt-3">
                  <div className="flex justify-between text-zinc-500 font-medium">
                    <span>Distance Rate ({estimatedDistance} KM)</span>
                    <span className="font-mono text-zinc-800">₹{distanceCost}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500 font-medium">
                    <span>Base Fleet Fixed Cost</span>
                    <span className="font-mono text-zinc-800">₹{selectedVehicle.fixedCost}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500 font-medium">
                    <span>Selected Amenities</span>
                    <span className="font-mono text-zinc-800">₹{amenitiesCost}</span>
                  </div>
                  <div className="flex justify-between text-zinc-900 font-black border-t border-zinc-200/60 pt-2 text-sm">
                    <span>Total Charter Rental Cost</span>
                    <span className="font-mono text-purple-600">₹{totalRentalCost}</span>
                  </div>
                </div>

                <button
                  onClick={handleConfirmReservation}
                  className="w-full bg-zinc-900 hover:bg-zinc-850 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md cursor-pointer text-center block"
                >
                  Reserve Coach & Initialize Splits
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ==================== RESERVED VOUCHER STEP ==================== */}
        {currentStep === "reserved" && (
          <div className="animate-fade-in p-6 max-w-xl mx-auto text-zinc-800">
            <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-2xl">
              
              {/* Confirmed Banner */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mx-auto">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-lg font-black leading-tight font-sans">Group Charter Reserved!</h2>
                <p className="text-[10px] text-purple-100 font-medium">We have generated cost-split links and notified all group companions</p>
              </div>

              {/* Physical pass */}
              <div className="p-6 space-y-6">
                
                <div className="border border-zinc-200 rounded-2xl overflow-hidden bg-zinc-50">
                  <div className="bg-zinc-950 text-white px-4 py-2.5 flex justify-between items-center text-xs">
                    <span className="font-bold flex items-center gap-1.5"><FileText className="h-4 w-4 text-purple-400" /> GROUP RESERVATION PASS</span>
                    <span className="font-mono text-zinc-300 font-bold">PNR: <span className="text-white font-black">{pnrNumber}</span></span>
                  </div>

                  <div className="p-4 space-y-4 text-xs font-semibold">
                    {/* Stops List summary */}
                    <div className="border-b border-zinc-200 pb-3 space-y-1.5">
                      <span className="text-[9px] text-zinc-400 uppercase font-bold">Charter Route stops</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {waypoints.map((point, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <span className="bg-purple-50 text-purple-800 border border-purple-100 font-extrabold rounded px-2 py-0.5 text-[9px]">{point.split(",")[0]}</span>
                            {index < waypoints.length - 1 && <span className="text-zinc-400">→</span>}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-b border-zinc-200 pb-3">
                      <div>
                        <span className="text-[9px] text-zinc-400 uppercase font-bold">Allocated Fleet</span>
                        <div className="text-zinc-900 font-extrabold mt-0.5">{selectedVehicle.type}</div>
                      </div>
                      <div>
                        <span className="text-[9px] text-zinc-400 uppercase font-bold">Passengers Roster</span>
                        <div className="text-zinc-900 font-extrabold mt-0.5">{members.length} Friends Splitting</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[9px] text-zinc-400 uppercase font-bold">Split Cost Per Person</span>
                        <div className="text-purple-600 font-black text-sm font-mono mt-0.5">₹{costPerPerson}</div>
                      </div>
                      <div>
                        <span className="text-[9px] text-zinc-400 uppercase font-bold">Aggregate Charter cost</span>
                        <div className="text-zinc-900 font-extrabold font-mono mt-0.5">₹{totalRentalCost}</div>
                      </div>
                    </div>

                    {/* QR Code split links */}
                    <div className="border-t border-dashed border-zinc-200 pt-4 flex flex-col sm:flex-row items-center gap-4 justify-between bg-white -mx-4 -mb-4 p-4">
                      <div className="space-y-1 text-center sm:text-left">
                        <span className="text-[9px] text-zinc-400 uppercase font-bold">Split Request UPI QR</span>
                        <p className="text-[10px] text-zinc-500 font-normal max-w-[240px]">Have your group scan this QR to authorize their direct split contribution via Google Pay or PhonePe.</p>
                      </div>
                      <div className="p-2 border border-zinc-100 rounded-xl bg-zinc-50">
                        <QrCode className="h-16 w-16 text-zinc-900" />
                      </div>
                    </div>

                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setCurrentStep("landing")}
                    className="flex-1 bg-zinc-900 hover:bg-zinc-850 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all text-center block cursor-pointer"
                  >
                    Return to Fleet Directory
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
