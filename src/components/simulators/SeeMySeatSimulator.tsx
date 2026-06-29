import React, { useState, useCallback, useEffect } from "react";
import { 
  Eye, 
  MapPin, 
  Users, 
  Star, 
  Wifi, 
  Coffee, 
  Zap, 
  Shield, 
  Clock, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Play, 
  Phone, 
  Mail, 
  Smartphone, 
  CreditCard, 
  ChevronRight,
  Maximize2,
  Minimize2,
  X,
  Compass,
  Sparkles,
  RefreshCw,
  ArrowLeft,
  Accessibility,
  Info,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  QrCode,
  Ticket,
  LayoutGrid
} from "lucide-react";

// ==================== TYPES & CONSTANTS ====================

interface BusRoute {
  id: string;
  from: string;
  to: string;
  price: number;
  duration: string;
  departure: string;
  arrival: string;
  availableSeats: number;
}

const BUS_ROUTES: BusRoute[] = [
  { id: "mumbai-pune", from: "Mumbai (Borivali)", to: "Pune (Shivajinagar)", price: 450, duration: "3h 15m", departure: "08:30 AM", arrival: "11:45 AM", availableSeats: 18 },
  { id: "delhi-jaipur", from: "Delhi (ISBT Kashmiri Gate)", to: "Jaipur (Sindhi Camp)", price: 650, duration: "5h 30m", departure: "06:15 AM", arrival: "11:45 AM", availableSeats: 22 },
  { id: "blr-mysore", from: "Bangalore (Majestic)", to: "Mysore (Palace Road)", price: 320, duration: "2h 45m", departure: "10:00 AM", arrival: "12:45 PM", availableSeats: 14 },
  { id: "chennai-blr", from: "Chennai (Koyambedu)", to: "Bangalore (Majestic)", price: 750, duration: "6h 00m", departure: "11:30 PM", arrival: "05:30 AM", availableSeats: 31 },
  { id: "hyderabad-blr", from: "Hyderabad (MGBS)", to: "Bangalore (Majestic)", price: 950, duration: "8h 30m", departure: "09:45 PM", arrival: "06:15 AM", availableSeats: 25 }
];

interface Seat {
  id: string;
  number: string;
  type: "standard" | "premium" | "sleeper";
  status: "available" | "occupied" | "reserved" | "disabled";
  row: number;
  col: number;
  priceMultiplier: number;
}

// Low deck layout (Rows 1-4)
const LOWER_DECK_SEATS: Seat[] = [
  { id: "1A", number: "1A", type: "premium", status: "available", row: 1, col: 1, priceMultiplier: 1.25 },
  { id: "1B", number: "1B", type: "premium", status: "occupied", row: 1, col: 2, priceMultiplier: 1.25 },
  { id: "1C", number: "1C", type: "standard", status: "available", row: 1, col: 4, priceMultiplier: 1.0 },
  { id: "1D", number: "1D", type: "standard", status: "available", row: 1, col: 5, priceMultiplier: 1.0 },

  { id: "2A", number: "2A", type: "premium", status: "available", row: 2, col: 1, priceMultiplier: 1.25 },
  { id: "2B", number: "2B", type: "premium", status: "reserved", row: 2, col: 2, priceMultiplier: 1.25 },
  { id: "2C", number: "2C", type: "standard", status: "occupied", row: 2, col: 4, priceMultiplier: 1.0 },
  { id: "2D", number: "2D", type: "standard", status: "available", row: 2, col: 5, priceMultiplier: 1.0 },

  { id: "3A", number: "3A", type: "standard", status: "available", row: 3, col: 1, priceMultiplier: 1.0 },
  { id: "3B", number: "3B", type: "standard", status: "available", row: 3, col: 2, priceMultiplier: 1.0 },
  { id: "3C", number: "3C", type: "standard", status: "available", row: 3, col: 4, priceMultiplier: 1.0 },
  { id: "3D", number: "3D", type: "standard", status: "occupied", row: 3, col: 5, priceMultiplier: 1.0 },

  { id: "4A", number: "4A", type: "standard", status: "available", row: 4, col: 1, priceMultiplier: 1.0 },
  { id: "4B", number: "4B", type: "standard", status: "available", row: 4, col: 2, priceMultiplier: 1.0 },
  { id: "4C", number: "4C", type: "standard", status: "available", row: 4, col: 4, priceMultiplier: 1.0 },
  { id: "4D", number: "4D", type: "standard", status: "available", row: 4, col: 5, priceMultiplier: 1.0 }
];

// Upper deck layout (Sleeper berths, Rows 5-8)
const UPPER_DECK_SEATS: Seat[] = [
  { id: "U5A", number: "U5A", type: "sleeper", status: "available", row: 5, col: 1, priceMultiplier: 1.5 },
  { id: "U5B", number: "U5B", type: "sleeper", status: "available", row: 5, col: 2, priceMultiplier: 1.5 },
  { id: "U5C", number: "U5C", type: "sleeper", status: "occupied", row: 5, col: 4, priceMultiplier: 1.5 },

  { id: "U6A", number: "U6A", type: "sleeper", status: "available", row: 6, col: 1, priceMultiplier: 1.5 },
  { id: "U6B", number: "U6B", type: "sleeper", status: "occupied", row: 6, col: 2, priceMultiplier: 1.5 },
  { id: "U6C", number: "U6C", type: "sleeper", status: "available", row: 6, col: 4, priceMultiplier: 1.5 },

  { id: "U7A", number: "U7A", type: "sleeper", status: "available", row: 7, col: 1, priceMultiplier: 1.5 },
  { id: "U7B", number: "U7B", type: "sleeper", status: "available", row: 7, col: 2, priceMultiplier: 1.5 },
  { id: "U7C", number: "U7C", type: "sleeper", status: "reserved", row: 7, col: 4, priceMultiplier: 1.5 },

  { id: "U8A", number: "U8A", type: "sleeper", status: "available", row: 8, col: 1, priceMultiplier: 1.5 },
  { id: "U8B", number: "U8B", type: "sleeper", status: "available", row: 8, col: 2, priceMultiplier: 1.5 },
  { id: "U8C", number: "U8C", type: "sleeper", status: "available", row: 8, col: 4, priceMultiplier: 1.5 }
];

interface Viewpoint {
  id: string;
  name: string;
  desc: string;
  seats: string[];
}

const VIEWPOINTS: Viewpoint[] = [
  { id: "driver", name: "Driver Cabin Perspective", desc: "Front windshield view overlooking luxury Volvo dashboard", seats: ["1A", "1B"] },
  { id: "lower-deck", name: "Lower Deck Seating View", desc: "Premium multi-angle cabin layout with standard and premium seating", seats: ["2A", "2B", "3A", "3B", "4A", "4B"] },
  { id: "upper-deck", name: "Upper Deck Sleeper Cab", desc: "Futuristic view of comfortable individual sleeping berths", seats: ["U5A", "U5B", "U6A", "U6B", "U7A", "U7B"] }
];

export default function SeeMySeatSimulator() {
  const [currentStep, setCurrentStep] = useState<"landing" | "booking" | "checkout" | "ticket">("landing");
  
  // Selection states
  const [selectedRoute, setSelectedRoute] = useState<BusRoute>(BUS_ROUTES[0]);
  const [activeDeck, setActiveDeck] = useState<"lower" | "upper">("lower");
  const [activeTab, setActiveTab] = useState<"tour" | "seats">("tour");
  const [currentViewpoint, setCurrentViewpoint] = useState<Viewpoint>(VIEWPOINTS[1]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [checkoutMethod, setCheckoutMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [pnrNumber, setPnrNumber] = useState("");

  // 3D Tour Interactions state
  const [zoom, setZoom] = useState(1.0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Seats data
  const [lowerSeats, setLowerSeats] = useState<Seat[]>(LOWER_DECK_SEATS);
  const [upperSeats, setUpperSeats] = useState<Seat[]>(UPPER_DECK_SEATS);

  // Real-time occupant simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const updateSeats = (seats: Seat[]) => 
        seats.map(seat => {
          if (seat.status === "available" && Math.random() < 0.08 && !selectedSeats.includes(seat.id)) {
            return { ...seat, status: "occupied" as const };
          }
          return seat;
        });

      setLowerSeats(prev => updateSeats(prev));
      setUpperSeats(prev => updateSeats(prev));
    }, 12000);

    return () => clearInterval(interval);
  }, [selectedSeats]);

  const handleSeatClick = (seatId: string) => {
    const allSeats = [...lowerSeats, ...upperSeats];
    const seat = allSeats.find(s => s.id === seatId);
    if (!seat || seat.status !== "available") return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(id => id !== seatId));
    } else {
      if (selectedSeats.length >= 4) {
        alert("You can select a maximum of 4 seats per booking.");
        return;
      }
      setSelectedSeats(prev => [...prev, seatId]);
    }
  };

  const calculateTotalPrice = () => {
    const allSeats = [...lowerSeats, ...upperSeats];
    return selectedSeats.reduce((sum, seatId) => {
      const seat = allSeats.find(s => s.id === seatId);
      const multiplier = seat ? seat.priceMultiplier : 1.0;
      return sum + Math.round(selectedRoute.price * multiplier);
    }, 0);
  };

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setRotation(prev => ({
      x: Math.max(-15, Math.min(15, prev.x - deltaY * 0.2)),
      y: prev.y + deltaX * 0.2
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleBookingStart = (route: BusRoute) => {
    setSelectedRoute(route);
    setSelectedSeats([]);
    setCurrentStep("booking");
  };

  const handleProceedToCheckout = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat to proceed.");
      return;
    }
    setCurrentStep("checkout");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      const randPNR = "SMS" + Math.floor(100000 + Math.random() * 900000);
      setPnrNumber(randPNR);
      setCurrentStep("ticket");
    }, 2000);
  };

  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-xl flex flex-col font-sans" id="seemyseat-browser">
      
      {/* ==================== BROWSER CHROME HEADER ==================== */}
      <div className="bg-zinc-100 px-4 py-3 border-b border-zinc-200 flex items-center gap-3 select-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-rose-400 block border border-rose-500/20"></span>
          <span className="w-3 h-3 rounded-full bg-amber-400 block border border-amber-500/20"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-400 block border border-emerald-500/20"></span>
        </div>
        <div className="flex-1 bg-white rounded-lg px-3 py-1 text-[11px] font-medium text-zinc-400 flex items-center gap-1.5 border border-zinc-200 font-mono">
          <span className="text-zinc-300">https://</span>
          <span className="text-zinc-600 font-bold">www.seemyseat.in</span>
        </div>
        <span className="text-[10px] font-bold text-indigo-600 px-2 uppercase tracking-wide shrink-0 bg-indigo-50 border border-indigo-200/50 rounded py-0.5">SeeMySeat v1.2</span>
      </div>

      {/* ==================== WEBSITE VIEWPORT ==================== */}
      <div className="bg-zinc-50 overflow-auto max-h-[85vh] relative text-zinc-800">
        
        {/* Navigation Bar */}
        <header className="bg-slate-950 border-b border-indigo-950/40 px-6 py-4 sticky top-0 z-40 flex justify-between items-center text-white">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentStep("landing")}>
            <div className="h-9 w-9 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-black text-sm">S</span>
            </div>
            <div>
              <span className="font-extrabold text-white tracking-tight text-lg">SeeMySeat</span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.5 rounded ml-1.5 uppercase tracking-wider border border-emerald-500/30">3D Live</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-400">
            <span className="hover:text-indigo-400 cursor-pointer transition-colors" onClick={() => setCurrentStep("landing")}>Search Routes</span>
            <span className="hover:text-indigo-400 cursor-pointer transition-colors">3D Bus Fleet</span>
            <span className="hover:text-indigo-400 cursor-pointer transition-colors">Seat Visuals</span>
            <span className="hover:text-indigo-400 cursor-pointer transition-colors">Support</span>
          </div>
          <div>
            <button 
              onClick={() => handleBookingStart(BUS_ROUTES[0])}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md shadow-indigo-600/10 cursor-pointer"
            >
              Start 3D Tour
            </button>
          </div>
        </header>

        {/* ==================== LANDING STEP ==================== */}
        {currentStep === "landing" && (
          <div className="animate-fade-in pb-12">
            {/* Hero Banner */}
            <div className="bg-gradient-to-br from-zinc-900 via-indigo-950 to-slate-950 text-white py-16 px-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>

              <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
                <span className="bg-indigo-500/20 text-indigo-300 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border border-indigo-400/20">
                  ⚡ Next-Gen Passenger Seating
                </span>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                  Don't Just Book a Seat. <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">See Your Virtual View First.</span>
                </h1>
                <p className="text-sm md:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
                  The industry's first immersive 3D seat preview. Rotate 360° inside luxury Volvo coach cabins, compare legroom spacing, check window alignment, and secure your exact favorite seat.
                </p>

                {/* Quick stats badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 text-left">
                  {[
                    { label: "Fleet Coaches", val: "50+ Active", desc: "Multi-axle Scania & Volvo" },
                    { label: "Virtual Accuracy", val: "100% 3D Render", desc: "Exact physical specs" },
                    { label: "Bookings Handled", val: "12,000+", desc: "Verified seat conversions" },
                    { label: "Customer Rating", val: "4.9 ★ Stars", desc: "Loved by Indian travelers" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                      <div className="text-xs text-zinc-400 font-medium">{stat.label}</div>
                      <div className="text-base font-bold text-white mt-0.5">{stat.val}</div>
                      <div className="text-[10px] text-zinc-500 mt-1">{stat.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Popular Routes Selector */}
            <div className="max-w-5xl mx-auto px-6 pt-12 space-y-6">
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-extrabold text-zinc-950 tracking-tight">Select a Route to Begin Booking</h2>
                <p className="text-xs text-zinc-500 font-medium">Click on any route below to open the virtual 3D bus deck and select your seats</p>
              </div>

              <div className="grid gap-4 md:grid-cols-1">
                {BUS_ROUTES.map((route) => (
                  <div 
                    key={route.id}
                    className="bg-white border border-zinc-200/80 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/5 transition-all"
                  >
                    <div className="flex flex-col md:flex-row gap-6 md:items-center flex-1">
                      {/* From - To */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-emerald-100 block shrink-0"></span>
                          <span className="font-extrabold text-zinc-900 text-sm">{route.from}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 border-2 border-indigo-100 block shrink-0"></span>
                          <span className="font-extrabold text-zinc-900 text-sm">{route.to}</span>
                        </div>
                      </div>

                      {/* Details Strip */}
                      <div className="grid grid-cols-3 gap-6 text-xs text-zinc-500 border-t md:border-t-0 md:border-l border-zinc-100 pt-3 md:pt-0 md:pl-6">
                        <div>
                          <div className="font-medium text-zinc-400">Departure</div>
                          <div className="font-bold text-zinc-800 mt-0.5">{route.departure}</div>
                        </div>
                        <div>
                          <div className="font-medium text-zinc-400">Duration</div>
                          <div className="font-bold text-zinc-800 mt-0.5">{route.duration}</div>
                        </div>
                        <div>
                          <div className="font-medium text-zinc-400">Coach Capacity</div>
                          <div className="font-bold text-zinc-800 mt-0.5">{route.availableSeats} Left</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-zinc-100 pt-4 md:pt-0">
                      <div>
                        <span className="text-[10px] text-zinc-400 font-bold block uppercase tracking-wider">Starting From</span>
                        <span className="text-xl font-black text-zinc-950 font-mono">₹{route.price}</span>
                      </div>
                      <button 
                        onClick={() => handleBookingStart(route)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md shadow-indigo-600/10 cursor-pointer"
                      >
                        View Seats & Book
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Immersive Feature Blocks */}
            <div className="max-w-5xl mx-auto px-6 pt-12 grid gap-6 md:grid-cols-3">
              {[
                { title: "3D Virtual Panorama", text: "Walk through the aisle virtually. Experience real viewport heights, window spacing, and exit paths before checking out.", icon: Eye, color: "text-indigo-600 bg-indigo-50" },
                { title: "Integrated Sleeper Berths", text: "Indian bus layouts often combine standard seating and sleeper berths. Contrast pricing and luxury upgrades immediately.", icon: Award, color: "text-emerald-600 bg-emerald-50" },
                { title: "Dual Deck Toggles", text: "Easily switch from the lower deck seating map to the upper deck sleeper berths with dedicated visual blueprints.", icon: LayoutGrid, color: "text-purple-600 bg-purple-50" }
              ].map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <div key={i} className="bg-white border border-zinc-200/80 rounded-2xl p-5 space-y-3">
                    <span className={`p-2.5 rounded-xl block w-fit ${feat.color}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-bold text-zinc-900 text-sm">{feat.title}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed font-medium">{feat.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== BOOKING & PLAYGROUND STEP ==================== */}
        {currentStep === "booking" && (
          <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 max-w-6xl mx-auto">
            
            {/* Playgrounds Workspace Column */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Route Summary Badge */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-4 flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setCurrentStep("landing")}
                    className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-500 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <div>
                    <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Active Journey Selection</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-extrabold text-zinc-950 text-sm">{selectedRoute.from}</span>
                      <span className="text-zinc-300">→</span>
                      <span className="font-extrabold text-zinc-950 text-sm">{selectedRoute.to}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 text-xs font-semibold text-zinc-500 border-l border-zinc-100 pl-4">
                  <div>
                    <span className="text-zinc-400 block text-[9px] uppercase">Departure</span>
                    <span className="text-zinc-800">{selectedRoute.departure}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[9px] uppercase">Duration</span>
                    <span className="text-zinc-800">{selectedRoute.duration}</span>
                  </div>
                </div>
              </div>

              {/* Viewport Sandbox Box */}
              <div className="bg-zinc-950 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl relative flex flex-col min-h-[500px]">
                
                {/* Control Tab Switcher */}
                <div className="bg-zinc-900 px-6 py-4 border-b border-zinc-800/60 flex justify-between items-center flex-wrap gap-4">
                  <div className="flex bg-zinc-950 border border-zinc-800 p-1 rounded-xl">
                    <button 
                      onClick={() => setActiveTab("tour")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === "tour" ? "bg-indigo-600 text-white shadow" : "text-zinc-400 hover:text-white"}`}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>360° Viewpoint Tour</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab("seats")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === "seats" ? "bg-indigo-600 text-white shadow" : "text-zinc-400 hover:text-white"}`}
                    >
                      <LayoutGrid className="h-3.5 w-3.5" />
                      <span>2D Seating Layout</span>
                    </button>
                  </div>

                  <div className="text-xs font-bold text-zinc-400 flex items-center gap-3">
                    <span className="flex items-center gap-1"><Wifi className="h-3.5 w-3.5 text-indigo-400" /> Free WiFi</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Coffee className="h-3.5 w-3.5 text-indigo-400" /> AC Coach</span>
                  </div>
                </div>

                {/* ============= TAB 1: 3D PANORAMA VIEWPORT ============= */}
                {activeTab === "tour" && (
                  <div className="relative flex-1 flex flex-col justify-between p-6">
                    {/* Floating viewpoint info */}
                    <div className="absolute top-6 left-6 z-10 space-y-1 bg-zinc-900/90 border border-zinc-800 p-3 rounded-2xl backdrop-blur-md max-w-xs text-white">
                      <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="h-3 w-3 animate-pulse" /> Active Panorama View
                      </div>
                      <h4 className="font-extrabold text-sm">{currentViewpoint.name}</h4>
                      <p className="text-[10px] text-zinc-400 leading-normal">{currentViewpoint.desc}</p>
                    </div>

                    {/* Floating lens controls */}
                    <div className="absolute top-6 right-6 z-10 flex gap-2">
                      <button 
                        onClick={() => setZoom(prev => Math.min(1.4, prev + 0.1))}
                        className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white rounded-xl transition-all hover:scale-105"
                        title="Zoom In"
                      >
                        <ZoomIn className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => setZoom(prev => Math.max(0.7, prev - 0.1))}
                        className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white rounded-xl transition-all hover:scale-105"
                        title="Zoom Out"
                      >
                        <ZoomOut className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => { setRotation({ x: 0, y: 0 }); setZoom(1.0); }}
                        className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white rounded-xl transition-all hover:scale-105"
                        title="Reset Lens"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Main Interactive Visual Stage */}
                    <div 
                      className="flex-1 w-full flex items-center justify-center relative overflow-hidden select-none cursor-grab active:cursor-grabbing my-4 rounded-2xl border border-zinc-800/50 bg-gradient-to-b from-indigo-950/20 to-zinc-950"
                      onMouseDown={handleDragStart}
                      onMouseMove={handleDragMove}
                      onMouseUp={handleDragEnd}
                      onMouseLeave={handleDragEnd}
                    >
                      {/* Coach visual blueprint base */}
                      <div 
                        className="w-full max-w-md transition-transform duration-100 ease-out flex flex-col items-center gap-6"
                        style={{
                          transform: `scale(${zoom}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                          transformStyle: "preserve-3d"
                        }}
                      >
                        {/* Dynamic viewpoint custom illustrations */}
                        {currentViewpoint.id === "driver" && (
                          <div className="w-full bg-zinc-900/60 rounded-3xl p-6 border border-zinc-800 text-center space-y-4">
                            <div className="relative h-28 bg-gradient-to-t from-zinc-950 to-indigo-950/40 rounded-2xl flex items-center justify-center overflow-hidden border border-indigo-500/10">
                              {/* Windshield road simulation */}
                              <div className="absolute inset-x-0 bottom-0 h-10 bg-zinc-900 flex justify-center">
                                <span className="w-1.5 h-10 bg-yellow-400 border-dashed border-r border-transparent"></span>
                              </div>
                              <span className="text-xs font-mono font-bold text-zinc-500 animate-pulse uppercase tracking-widest z-10">Driver Cabin Roadway</span>
                            </div>
                            <div className="flex justify-center gap-6">
                              {["1A", "1B"].map(id => {
                                const isSelected = selectedSeats.includes(id);
                                const isOccupied = [...lowerSeats, ...upperSeats].find(s => s.id === id)?.status === "occupied";

                                return (
                                  <button
                                    key={id}
                                    onClick={() => handleSeatClick(id)}
                                    className={`px-5 py-4 rounded-2xl border flex flex-col items-center gap-1.5 transition-all w-24 ${
                                      isSelected
                                        ? "bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/20"
                                        : isOccupied
                                        ? "bg-zinc-800 border-zinc-700 text-zinc-500 cursor-not-allowed opacity-40"
                                        : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-indigo-500"
                                    }`}
                                  >
                                    <span className="text-[10px] font-bold uppercase tracking-wider block">Seat {id}</span>
                                    <span className="text-xs font-bold font-mono">Premium</span>
                                    <span className="text-[9px] text-indigo-400 block">₹{Math.round(selectedRoute.price * 1.25)}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {currentViewpoint.id === "lower-deck" && (
                          <div className="w-full bg-zinc-900/60 rounded-3xl p-6 border border-zinc-800 text-center space-y-4">
                            <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Volvo Cabin Mid Row View (Standard & Premium)</div>
                            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                              {["2A", "2B", "3A", "3B"].map(id => {
                                const seat = lowerSeats.find(s => s.id === id);
                                const isSelected = selectedSeats.includes(id);
                                const isOccupied = seat?.status === "occupied" || seat?.status === "reserved";

                                return (
                                  <button
                                    key={id}
                                    onClick={() => handleSeatClick(id)}
                                    className={`p-3.5 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                                      isSelected
                                        ? "bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/20"
                                        : isOccupied
                                        ? "bg-zinc-800 border-zinc-700 text-zinc-500 cursor-not-allowed opacity-40"
                                        : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-indigo-500"
                                    }`}
                                  >
                                    <span className="text-[10px] font-bold block">Seat {id}</span>
                                    <span className="text-[10px] font-medium text-zinc-400">{seat?.type}</span>
                                    <span className="text-[9px] text-indigo-400 block">₹{Math.round(selectedRoute.price * (seat?.priceMultiplier || 1.0))}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {currentViewpoint.id === "upper-deck" && (
                          <div className="w-full bg-zinc-900/60 rounded-3xl p-6 border border-zinc-800 text-center space-y-4">
                            <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Upper Level Sleeper Berth Modules</div>
                            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                              {["U5A", "U5B", "U6A", "U6B"].map(id => {
                                const seat = upperSeats.find(s => s.id === id);
                                const isSelected = selectedSeats.includes(id);
                                const isOccupied = seat?.status === "occupied" || seat?.status === "reserved";

                                return (
                                  <button
                                    key={id}
                                    onClick={() => handleSeatClick(id)}
                                    className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all relative ${
                                      isSelected
                                        ? "bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/20"
                                        : isOccupied
                                        ? "bg-zinc-800 border-zinc-700 text-zinc-500 cursor-not-allowed opacity-40"
                                        : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-indigo-500"
                                    }`}
                                  >
                                    <div className="absolute top-1.5 right-1.5 flex gap-1">
                                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" title="Reading spotlight active"></span>
                                    </div>
                                    <span className="text-[10px] font-bold block">Berth {id}</span>
                                    <span className="text-[10px] font-bold text-indigo-400">Sleeper</span>
                                    <span className="text-[9px] text-zinc-400 block">₹{Math.round(selectedRoute.price * 1.5)}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Viewpoint toggles list */}
                    <div className="grid grid-cols-3 gap-2 border-t border-zinc-800/80 pt-4">
                      {VIEWPOINTS.map(v => {
                        const isCurrent = currentViewpoint.id === v.id;
                        return (
                          <button
                            key={v.id}
                            onClick={() => { setCurrentViewpoint(v); setRotation({ x: 0, y: 0 }); }}
                            className={`p-2.5 rounded-xl text-[10px] font-extrabold text-left border transition-all ${
                              isCurrent
                                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg"
                                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                            }`}
                          >
                            <div>{v.name}</div>
                            <div className="text-[8px] opacity-70 font-normal mt-0.5">{v.seats.length} interactive seats</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ============= TAB 2: 2D SEATING LAYOUT MAP ============= */}
                {activeTab === "seats" && (
                  <div className="flex-1 flex flex-col p-6 space-y-4">
                    {/* Deck toggle selector */}
                    <div className="flex justify-center">
                      <div className="bg-slate-100 border border-slate-200 p-1 rounded-xl flex shadow-sm">
                        <button 
                          onClick={() => setActiveDeck("lower")}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeDeck === "lower" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-indigo-600"}`}
                        >
                          Lower Deck (Seating)
                        </button>
                        <button 
                          onClick={() => setActiveDeck("upper")}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeDeck === "upper" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-indigo-600"}`}
                        >
                          Upper Deck (Sleeper)
                        </button>
                      </div>
                    </div>

                    {/* Interactive Seating Map Container */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md flex flex-col items-center w-full max-w-md mx-auto">
                      {/* Driver Front indicator */}
                      <div className="text-slate-500 font-mono text-[9px] uppercase tracking-wider mb-6 pb-2 border-b border-slate-100 w-full text-center flex justify-center items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Driver Cabin & Entrance <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                      </div>

                      {/* Seating layout grid */}
                      <div className="space-y-3">
                        {activeDeck === "lower" ? (
                          // Lower deck rows
                          [1, 2, 3, 4].map(rowNum => {
                            const rowSeats = lowerSeats.filter(s => s.row === rowNum);
                            return (
                              <div key={rowNum} className="flex items-center gap-3">
                                <span className="w-6 font-mono text-[10px] text-slate-400 font-bold">R{rowNum}</span>
                                
                                {/* Left seats (col 1 & 2) */}
                                <div className="flex gap-2">
                                  {rowSeats.filter(s => s.col <= 2).map(seat => {
                                    const isSelected = selectedSeats.includes(seat.id);
                                    const isOccupied = seat.status === "occupied" || seat.status === "reserved";
                                    return (
                                      <button
                                        key={seat.id}
                                        onClick={() => handleSeatClick(seat.id)}
                                        className={`w-9 h-9 rounded-lg border text-[10px] font-extrabold flex items-center justify-center transition-all shadow-xs ${
                                          isSelected
                                            ? "bg-emerald-500 border-emerald-600 text-white"
                                            : isOccupied
                                            ? "bg-rose-50 border-rose-100 text-rose-300 cursor-not-allowed opacity-75"
                                            : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-400"
                                        }`}
                                      >
                                        {seat.id}
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* Aisle space */}
                                <div className="w-6 h-9 flex items-center justify-center font-mono text-[8px] text-slate-400 font-bold border-x border-slate-100">AISLE</div>

                                {/* Right seats (col 4 & 5) */}
                                <div className="flex gap-2">
                                  {rowSeats.filter(s => s.col >= 4).map(seat => {
                                    const isSelected = selectedSeats.includes(seat.id);
                                    const isOccupied = seat.status === "occupied" || seat.status === "reserved";
                                    return (
                                      <button
                                        key={seat.id}
                                        onClick={() => handleSeatClick(seat.id)}
                                        className={`w-9 h-9 rounded-lg border text-[10px] font-extrabold flex items-center justify-center transition-all shadow-xs ${
                                          isSelected
                                            ? "bg-emerald-500 border-emerald-600 text-white"
                                            : isOccupied
                                            ? "bg-rose-50 border-rose-100 text-rose-300 cursor-not-allowed opacity-75"
                                            : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-400"
                                        }`}
                                      >
                                        {seat.id}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          // Upper deck rows
                          [5, 6, 7, 8].map(rowNum => {
                            const rowSeats = upperSeats.filter(s => s.row === rowNum);
                            return (
                              <div key={rowNum} className="flex items-center gap-3">
                                <span className="w-6 font-mono text-[10px] text-slate-400 font-bold">R{rowNum}</span>
                                
                                {/* Left berths (col 1 & 2) */}
                                <div className="flex gap-2">
                                  {rowSeats.filter(s => s.col <= 2).map(seat => {
                                    const isSelected = selectedSeats.includes(seat.id);
                                    const isOccupied = seat.status === "occupied" || seat.status === "reserved";
                                    return (
                                      <button
                                        key={seat.id}
                                        onClick={() => handleSeatClick(seat.id)}
                                        className={`w-14 h-9 rounded-lg border text-[10px] font-extrabold flex items-center justify-center transition-all shadow-xs ${
                                          isSelected
                                            ? "bg-emerald-500 border-emerald-600 text-white"
                                            : isOccupied
                                            ? "bg-rose-50 border-rose-100 text-rose-300 cursor-not-allowed opacity-75"
                                            : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-400"
                                        }`}
                                      >
                                        {seat.id}
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* Aisle space */}
                                <div className="w-6 h-9 flex items-center justify-center font-mono text-[8px] text-slate-400 font-bold">AISLE</div>

                                {/* Right berths (col 4) */}
                                <div className="flex gap-2">
                                  {rowSeats.filter(s => s.col === 4).map(seat => {
                                    const isSelected = selectedSeats.includes(seat.id);
                                    const isOccupied = seat.status === "occupied" || seat.status === "reserved";
                                    return (
                                      <button
                                        key={seat.id}
                                        onClick={() => handleSeatClick(seat.id)}
                                        className={`w-14 h-9 rounded-lg border text-[10px] font-extrabold flex items-center justify-center transition-all shadow-xs ${
                                          isSelected
                                            ? "bg-emerald-500 border-emerald-600 text-white"
                                            : isOccupied
                                            ? "bg-rose-50 border-rose-100 text-rose-300 cursor-not-allowed opacity-75"
                                            : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-400"
                                        }`}
                                      >
                                        {seat.id}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>

                      {/* Map Legends */}
                      <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-slate-100 justify-center w-full">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                          <span className="w-3.5 h-3.5 rounded border border-blue-200 bg-blue-50 block shadow-xs"></span> Available
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                          <span className="w-3.5 h-3.5 rounded border border-emerald-600 bg-emerald-500 block shadow-xs"></span> Selected
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                          <span className="w-3.5 h-3.5 rounded border border-rose-100 bg-rose-50 block shadow-xs"></span> Occupied
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                          <Accessibility className="h-3.5 w-3.5 text-indigo-500" /> Wheelchair
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Selected Seats Booking Sidebar */}
            <div className="lg:col-span-4 rounded-2xl border border-zinc-200 bg-white p-5 h-fit space-y-5 shadow-sm">
              <div className="border-b border-zinc-100 pb-3">
                <h3 className="font-extrabold text-zinc-900 text-sm">Booking Summary</h3>
                <span className="text-[10px] bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded block mt-1 w-fit">Volvo Multi-Axle Premium</span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-zinc-500">
                  <span className="font-medium">Selected Seats</span>
                  <span className="font-bold text-zinc-800 font-mono">
                    {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None selected"}
                  </span>
                </div>

                <div className="border-t border-zinc-100 pt-3 space-y-1.5">
                  <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Pricing Breakdown</div>
                  {selectedSeats.length > 0 ? (
                    <div className="space-y-1 text-xs">
                      {selectedSeats.map(seatId => {
                        const seat = [...lowerSeats, ...upperSeats].find(s => s.id === seatId);
                        const basePrice = selectedRoute.price;
                        const finalPrice = Math.round(basePrice * (seat?.priceMultiplier || 1.0));
                        return (
                          <div key={seatId} className="flex justify-between text-zinc-600">
                            <span>Seat {seatId} ({seat?.type})</span>
                            <span className="font-semibold text-zinc-800 font-mono">₹{finalPrice}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-xs text-zinc-400 leading-normal">Choose seats from the 3D visual view or layout map to generate pricing.</div>
                  )}
                </div>

                <div className="border-t border-zinc-100 pt-3 flex justify-between items-center">
                  <span className="text-xs font-bold text-zinc-950">Grand Total</span>
                  <span className="text-lg font-black text-indigo-600 font-mono">₹{calculateTotalPrice()}</span>
                </div>

                <button 
                  onClick={handleProceedToCheckout}
                  disabled={selectedSeats.length === 0}
                  className="w-full bg-zinc-900 hover:bg-zinc-850 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all tracking-wide shadow-md disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed cursor-pointer text-center block"
                >
                  Confirm Booking & Pay
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ==================== CHECKOUT STEP ==================== */}
        {currentStep === "checkout" && (
          <div className="animate-fade-in p-6 max-w-xl mx-auto">
            <div className="bg-white border border-zinc-200 rounded-3xl p-6 space-y-6 shadow-lg">
              <div className="flex items-center gap-3 border-b border-zinc-100 pb-4">
                <button 
                  onClick={() => setCurrentStep("booking")}
                  className="p-1.5 hover:bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-500 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <div>
                  <h2 className="text-base font-extrabold text-zinc-950">Secure Payment Sandbox</h2>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">SMS-Gateways Integration</p>
                </div>
              </div>

              {/* Checkout pricing details */}
              <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500 font-medium">Route:</span>
                  <span className="font-bold text-zinc-800">{selectedRoute.from} → {selectedRoute.to}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500 font-medium">Seats Selected:</span>
                  <span className="font-bold text-zinc-800 font-mono">{selectedSeats.join(", ")}</span>
                </div>
                <div className="flex justify-between text-xs border-t border-zinc-200/60 pt-2 font-bold">
                  <span className="text-zinc-900">Total Payable:</span>
                  <span className="text-indigo-600 font-mono">₹{calculateTotalPrice()}</span>
                </div>
              </div>

              <form onSubmit={handlePaymentSubmit} className="space-y-4 text-xs font-semibold">
                
                {/* Method selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Select Payment Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "upi", label: "UPI / QR", desc: "PhonePe/Paytm" },
                      { id: "card", label: "Credit/Debit", desc: "Visa, Mastercard" },
                      { id: "netbanking", label: "NetBanking", desc: "Indian Banks" }
                    ].map(method => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setCheckoutMethod(method.id as any)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          checkoutMethod === method.id
                            ? "border-indigo-600 bg-indigo-50/50 text-indigo-700"
                            : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                        }`}
                      >
                        <div className="font-bold text-[11px]">{method.label}</div>
                        <div className="text-[8px] text-zinc-400 font-medium mt-0.5">{method.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {checkoutMethod === "upi" && (
                  <div className="space-y-3 bg-zinc-50/50 rounded-2xl p-4 border border-zinc-100">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-zinc-400 uppercase">Enter UPI ID</label>
                      <input 
                        type="text" 
                        placeholder="username@okaxis" 
                        required
                        className="w-full bg-white border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-indigo-500" 
                      />
                    </div>
                    <span className="text-[10px] text-zinc-400 font-normal leading-normal block">Or complete transaction by scanning a localized dynamic QR code on the next screen.</span>
                  </div>
                )}

                {checkoutMethod === "card" && (
                  <div className="space-y-3 bg-zinc-50/50 rounded-2xl p-4 border border-zinc-100">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-zinc-400 uppercase">Cardholder Name</label>
                      <input type="text" placeholder="Rahul Sharma" required className="w-full bg-white border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-indigo-500" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-zinc-400 uppercase">Card Number</label>
                      <input type="text" placeholder="4321 •••• •••• 9876" required className="w-full bg-white border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-indigo-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-zinc-400 uppercase">Expiry Date</label>
                        <input type="text" placeholder="MM/YY" required className="w-full bg-white border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-indigo-500" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-zinc-400 uppercase">CVV</label>
                        <input type="password" placeholder="•••" required maxLength={3} className="w-full bg-white border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-indigo-500" />
                      </div>
                    </div>
                  </div>
                )}

                {checkoutMethod === "netbanking" && (
                  <div className="space-y-3 bg-zinc-50/50 rounded-2xl p-4 border border-zinc-100">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-zinc-400 uppercase">Select Bank</label>
                      <select required className="w-full bg-white border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-indigo-500 font-semibold">
                        <option value="">-- Choose Indian Bank --</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                      </select>
                    </div>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isProcessingPayment}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isProcessingPayment ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Securing Transaction...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4" />
                      <span>Authorize Payment - ₹{calculateTotalPrice()}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ==================== TICKET VOUCHER STEP ==================== */}
        {currentStep === "ticket" && (
          <div className="animate-fade-in p-6 max-w-xl mx-auto text-zinc-800">
            <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-2xl">
              
              {/* Receipt Header banner */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mx-auto">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-lg font-black leading-tight">Booking Confirmed Successfully!</h2>
                <p className="text-[10px] text-emerald-100 font-medium">Your e-ticket voucher has been sent to your registered mobile and email</p>
              </div>

              {/* Physical ticket visual details */}
              <div className="p-6 space-y-6">
                
                {/* Boarding Pass Frame */}
                <div className="border border-zinc-200 rounded-2xl overflow-hidden bg-zinc-50 relative">
                  
                  {/* PNR Strip */}
                  <div className="bg-zinc-950 text-white px-4 py-2.5 flex justify-between items-center text-xs">
                    <span className="font-bold flex items-center gap-1.5"><Ticket className="h-4 w-4 text-emerald-400" /> BOARDING PASS</span>
                    <span className="font-mono text-zinc-300 font-bold">PNR: <span className="text-white font-black">{pnrNumber}</span></span>
                  </div>

                  <div className="p-4 space-y-4 text-xs font-semibold">
                    {/* Cities journey details */}
                    <div className="flex justify-between items-center border-b border-zinc-200 pb-3">
                      <div>
                        <div className="text-[9px] text-zinc-400 uppercase font-bold">Departure Port</div>
                        <div className="text-sm font-black text-zinc-900 mt-0.5">{selectedRoute.from}</div>
                        <div className="text-[10px] text-zinc-500 font-normal mt-0.5">{selectedRoute.departure}</div>
                      </div>
                      <div className="text-center font-mono">
                        <div className="text-[10px] text-indigo-600 font-bold">{selectedRoute.duration}</div>
                        <div className="text-[8px] text-zinc-400 mt-0.5">DIRECT COACH</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] text-zinc-400 uppercase font-bold">Arrival Destination</div>
                        <div className="text-sm font-black text-zinc-900 mt-0.5">{selectedRoute.to}</div>
                        <div className="text-[10px] text-zinc-500 font-normal mt-0.5">{selectedRoute.arrival}</div>
                      </div>
                    </div>

                    {/* Passenger specs layout */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[9px] text-zinc-400 uppercase font-bold">Coach Model</span>
                        <div className="text-zinc-900 font-extrabold mt-0.5">Volvo Multi-Axle Premium</div>
                      </div>
                      <div>
                        <span className="text-[9px] text-zinc-400 uppercase font-bold">Allocated Seat(s)</span>
                        <div className="text-indigo-600 font-black font-mono mt-0.5">{selectedSeats.join(", ")}</div>
                      </div>
                    </div>

                    {/* QR Code section */}
                    <div className="border-t border-dashed border-zinc-200 pt-4 flex flex-col sm:flex-row items-center gap-4 justify-between bg-white -mx-4 -mb-4 p-4">
                      <div className="space-y-1 text-center sm:text-left">
                        <span className="text-[9px] text-zinc-400 uppercase font-bold">Contactless Check-In QR</span>
                        <p className="text-[10px] text-zinc-500 font-normal max-w-[240px]">Scan this QR code at the physical boarding terminal to obtain your printed layout pass.</p>
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
                    Return to Routes
                  </button>
                  <button 
                    onClick={() => window.print()}
                    className="px-4 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-700 font-bold rounded-xl text-xs transition-all cursor-pointer"
                  >
                    Print Voucher
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
