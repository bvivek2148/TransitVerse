import { useState } from "react";
import { 
  Star, 
  MessageSquare, 
  AlertTriangle, 
  User, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Info,
  Award,
  ChevronRight,
  ShieldAlert,
  Sliders,
  Calendar,
  ThumbsUp,
  ArrowLeft,
  Settings,
  Activity,
  Heart
} from "lucide-react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  Legend
} from "recharts";

// ==================== TYPES & CONSTANTS ====================

interface TransitRoute {
  id: string;
  name: string;
  operator: string;
  avgRating: number;
  safetyScore: number; // out of 100
  onTimeRatio: number; // %
}

const ROUTES_LIST: TransitRoute[] = [
  { id: "del-jai", name: "Delhi to Jaipur Express", operator: "RSRTC Gold Line Volvo", avgRating: 4.2, safetyScore: 92, onTimeRatio: 88 },
  { id: "blr-mys", name: "Bangalore to Mysore Link", operator: "KSRTC Airavat Club Class", avgRating: 4.7, safetyScore: 98, onTimeRatio: 96 },
  { id: "mum-pun", name: "Mumbai to Pune Shuttles", operator: "MSRTC Shivneri Volvo", avgRating: 4.4, safetyScore: 95, onTimeRatio: 91 },
  { id: "che-oot", name: "Chennai to Ooty Sleeper", operator: "National Travels AC Sleeper", avgRating: 3.8, safetyScore: 84, onTimeRatio: 80 }
];

interface Review {
  id: number;
  routeId: string;
  author: string;
  comfort: number;
  punctuality: number;
  cleanliness: number;
  safety: number;
  text: string;
  avg: number;
  date: string;
  isVerified: boolean;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    routeId: "blr-mys",
    author: "Kiran Kumar",
    comfort: 5,
    punctuality: 5,
    cleanliness: 4,
    safety: 5,
    text: "Extremely smooth ride on the new Mysore expressway. Departed exactly at 07:00 AM and reached Mysore inside 2 hours. Driver was very disciplined.",
    avg: 4.8,
    date: "Yesterday",
    isVerified: true
  },
  {
    id: 2,
    routeId: "del-jai",
    author: "Shreya Gupta",
    comfort: 4,
    punctuality: 3,
    cleanliness: 4,
    safety: 4,
    text: "Comfort was fine, but bus got delayed by 40 minutes at the Gurgaon toll booth due to traffic congestion. Staff was polite.",
    avg: 3.8,
    date: "3 days ago",
    isVerified: true
  },
  {
    id: 3,
    routeId: "che-oot",
    author: "Madhavan Swamy",
    comfort: 3,
    punctuality: 4,
    cleanliness: 3,
    safety: 3,
    text: "Bus was quite old. The seat recline mechanism was slightly jammed, and there was some trash near the back rows. Speed was normal though.",
    avg: 3.3,
    date: "Last week",
    isVerified: false
  }
];

export default function TransitRateSimulator() {
  const [selectedRouteId, setSelectedRouteId] = useState("blr-mys");
  const [comfort, setComfort] = useState(4);
  const [punctuality, setPunctuality] = useState(4);
  const [cleanliness, setCleanliness] = useState(4);
  const [safety, setSafety] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  const activeRoute = ROUTES_LIST.find((r) => r.id === selectedRouteId) || ROUTES_LIST[1];

  const handleSubmitReview = () => {
    if (!reviewText.trim()) {
      alert("Please enter a short review message!");
      return;
    }

    const calculatedAvg = parseFloat(((comfort + punctuality + cleanliness + safety) / 4).toFixed(1));
    const newReview: Review = {
      id: Date.now(),
      routeId: selectedRouteId,
      author: authorName.trim() || "Verified Passenger",
      comfort,
      punctuality,
      cleanliness,
      safety,
      text: reviewText.trim(),
      avg: calculatedAvg,
      date: "Just now",
      isVerified: true
    };

    setReviews((prev) => [newReview, ...prev]);
    setReviewText("");
    setAuthorName("");
    alert("Feedback logged successfully! Thank you for rating your commute.");
  };

  const filteredReviews = reviews.filter((r) => r.routeId === selectedRouteId);
  const overallAvg = filteredReviews.length > 0 
    ? parseFloat((filteredReviews.reduce((sum, r) => sum + r.avg, 0) / filteredReviews.length).toFixed(1))
    : activeRoute.avgRating;

  // Rating trends over months
  const trendData = [
    { month: "Jan", "Delhi Express": 4.0, "Bangalore Link": 4.5, "Mumbai Shuttles": 4.2 },
    { month: "Feb", "Delhi Express": 4.1, "Bangalore Link": 4.6, "Mumbai Shuttles": 4.3 },
    { month: "Mar", "Delhi Express": 3.9, "Bangalore Link": 4.7, "Mumbai Shuttles": 4.5 },
    { month: "Apr", "Delhi Express": 4.2, "Bangalore Link": 4.6, "Mumbai Shuttles": 4.4 },
    { month: "May", "Delhi Express": overallAvg, "Bangalore Link": selectedRouteId === "blr-mys" ? overallAvg : 4.7, "Mumbai Shuttles": selectedRouteId === "mum-pun" ? overallAvg : 4.4 }
  ];

  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-xl flex flex-col font-sans" id="transitrate-browser">
      
      {/* ==================== BROWSER CHROME HEADER ==================== */}
      <div className="bg-zinc-100 px-4 py-3 border-b border-zinc-200 flex items-center gap-3 select-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-rose-400 block border border-rose-500/20"></span>
          <span className="w-3 h-3 rounded-full bg-amber-400 block border border-amber-500/20"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-400 block border border-emerald-500/20"></span>
        </div>
        <div className="flex-1 bg-white rounded-lg px-3 py-1 text-[11px] font-medium text-zinc-400 flex items-center gap-1.5 border border-zinc-200 font-mono">
          <span className="text-zinc-300">https://</span>
          <span className="text-zinc-600 font-bold">www.transitrate.in</span>
        </div>
        <span className="text-[10px] font-bold text-amber-600 px-2 uppercase tracking-wide shrink-0 bg-amber-50 border border-amber-200/50 rounded py-0.5">TransitRate Portal</span>
      </div>

      {/* ==================== WEBSITE VIEWPORT ==================== */}
      <div className="bg-zinc-50 overflow-auto max-h-[85vh] relative text-zinc-800 text-xs font-semibold">
        
        {/* Navigation Bar */}
        <header className="bg-white border-b border-zinc-200/80 px-6 py-4 sticky top-0 z-40 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
              <Star className="text-white h-5 w-5 fill-white" />
            </div>
            <div>
              <span className="font-extrabold text-zinc-950 tracking-tight text-base font-sans">TransitRate</span>
              <span className="text-[9px] bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 rounded ml-1.5 uppercase tracking-wider">Passenger Auditing</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-zinc-500">
            <span className="text-zinc-800 font-black border-b-2 border-amber-500 pb-1">Feedback Console</span>
            <span className="hover:text-amber-500 cursor-pointer">Safety Rankings</span>
          </div>
        </header>

        {/* Workspace Arena */}
        <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Form submission review */}
          <div className="lg:col-span-5 bg-white border border-zinc-200 rounded-3xl p-5 space-y-4 shadow-sm">
            <div className="border-b border-zinc-100 pb-2">
              <h2 className="text-sm font-black text-zinc-950">Submit Journey Rating</h2>
              <p className="text-[10px] text-zinc-400 font-bold uppercase mt-0.5">Verified Passenger Submission</p>
            </div>

            {/* Route selector dropdown */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-400 uppercase">Commuted Route</label>
              <select 
                value={selectedRouteId}
                onChange={(e) => setSelectedRouteId(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-500 font-bold"
              >
                {ROUTES_LIST.map(route => (
                  <option key={route.id} value={route.id}>{route.name}</option>
                ))}
              </select>
            </div>

            {/* Author box */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-zinc-400 uppercase">Your Name</label>
              <input 
                type="text" 
                placeholder="Rahul Dravid" 
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-xs font-bold focus:outline-none focus:border-amber-500" 
              />
            </div>

            {/* Parameter sliders */}
            <div className="space-y-3 bg-zinc-50/50 border border-zinc-100 rounded-2xl p-4">
              <h4 className="text-[9px] font-bold text-zinc-400 uppercase border-b border-zinc-150 pb-1.5">Audit Parameters</h4>
              
              {[
                { label: "Comfort & Seating", val: comfort, set: setComfort },
                { label: "Driver Punctuality", val: punctuality, set: setPunctuality },
                { label: "Cabin Cleanliness", val: cleanliness, set: setCleanliness },
                { label: "Speed Safety Ratio", val: safety, set: setSafety }
              ].map((param, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-[9px] text-zinc-500 font-bold uppercase">
                    <span>{param.label}</span>
                    <span className="font-mono text-amber-600">{param.val} ★</span>
                  </div>
                  <input 
                    type="range" 
                    min={1} 
                    max={5} 
                    value={param.val}
                    onChange={(e) => param.set(parseInt(e.target.value))}
                    className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-amber-500" 
                  />
                </div>
              ))}
            </div>

            {/* Feedback message */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-zinc-400 uppercase">Review Feedback</label>
              <textarea 
                rows={3}
                placeholder="How was the suspension, AC, and overall experience?" 
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-xs font-bold focus:outline-none focus:border-amber-500 resize-none" 
              />
            </div>

            <button
              onClick={handleSubmitReview}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ThumbsUp className="h-4 w-4" />
              <span>Submit Verified Feedback</span>
            </button>
          </div>

          {/* Right Column: Route stats, trends line charts, review feed */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live active stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { title: "Average Rating", value: `${overallAvg} ★`, sub: "Passenger consensus", color: "text-amber-500" },
                { title: "On-Time Ratio", value: `${activeRoute.onTimeRatio}%`, sub: "Operational delays", color: "text-zinc-900" },
                { title: "Safety Rating", value: `${activeRoute.safetyScore}%`, sub: "Verified safe speed", color: "text-emerald-600" }
              ].map((stat, i) => (
                <div key={i} className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm">
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">{stat.title}</span>
                  <div className={`text-base font-black font-mono mt-1 ${stat.color}`}>{stat.value}</div>
                  <span className="text-[9px] text-zinc-400 block mt-0.5">{stat.sub}</span>
                </div>
              ))}
            </div>

            {/* Line Trend Chart Recharts */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm space-y-4">
              <div>
                <h3 className="font-extrabold text-zinc-950 text-xs font-sans">Monthly Commuter Rating Benchmark</h3>
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5 font-sans">Consolidated route comparisons</p>
              </div>

              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                    <XAxis dataKey="month" tick={{ fontSize: 9 }} stroke="#a1a1aa" tickLine={false} />
                    <YAxis tick={{ fontSize: 9 }} stroke="#a1a1aa" tickLine={false} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 8 }} />
                    <Line type="monotone" dataKey="Delhi Express" stroke="#3b82f6" strokeWidth={2} dot={{ r: 2 }} />
                    <Line type="monotone" dataKey="Bangalore Link" stroke="#10b981" strokeWidth={2} dot={{ r: 2 }} />
                    <Line type="monotone" dataKey="Mumbai Shuttles" stroke="#f59e0b" strokeWidth={2} dot={{ r: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Live review stream list */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm space-y-3">
              <div className="border-b border-zinc-100 pb-1.5">
                <h3 className="font-extrabold text-zinc-950 text-xs">Live Passenger Review Stream</h3>
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Route reviews for {activeRoute.name}</p>
              </div>

              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {filteredReviews.length > 0 ? (
                  filteredReviews.map(rev => (
                    <div key={rev.id} className="p-3 border border-zinc-150 rounded-2xl bg-zinc-50/50 space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 font-black flex items-center justify-center text-[9px]">{rev.author[0]}</div>
                          <div>
                            <span className="font-bold text-zinc-900">{rev.author}</span>
                            {rev.isVerified && <span className="text-[8px] text-emerald-600 bg-emerald-50 px-1 rounded ml-1.5 font-bold uppercase tracking-wide">Verified Ticket</span>}
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400">{rev.date}</span>
                      </div>
                      <p className="text-zinc-600 leading-normal font-medium text-[11px]">{rev.text}</p>
                      <div className="flex gap-4 text-[9px] text-zinc-400 border-t border-zinc-200/40 pt-1.5 font-mono">
                        <span>Comfort: {rev.comfort}★</span>
                        <span>Punctuality: {rev.punctuality}★</span>
                        <span>Safety: {rev.safety}★</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-zinc-400 text-center py-6">No passenger reviews logged. Be the first to write a review.</div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
