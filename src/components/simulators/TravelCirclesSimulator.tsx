import { useState } from "react";
import { 
  Languages, 
  QrCode, 
  ThumbsUp, 
  Send, 
  Smartphone, 
  FileText, 
  User, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Coffee, 
  Compass, 
  Award,
  BookOpen,
  ArrowLeft,
  Settings,
  Activity,
  MessageSquare,
  Sparkles,
  Search,
  CheckCircle
} from "lucide-react";

// ==================== TYPES & CONSTANTS ====================

interface Post {
  id: number;
  author: string;
  avatar: string;
  titleEn: string;
  titleHi: string;
  contentEn: string;
  contentHi: string;
  likes: number;
  commentsCount: number;
  route: string;
  category: "tips" | "food" | "delays" | "scenic";
  date: string;
}

const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    author: "Aravind Nair",
    avatar: "👨🏽‍💻",
    category: "food",
    date: "Yesterday",
    titleEn: "Top Pitstops on Bangalore to Coorg NH48 highway!",
    titleHi: "बैंगलोर से कूर्ग NH48 हाईवे पर सबसे अच्छे पिटस्टॉप!",
    contentEn: "Make sure to stop at Swathi Delicacy near Yediyur for the best authentic idli-vada and piping hot filter coffee. Clean washrooms are a major plus!",
    contentHi: "सर्वोत्तम प्रामाणिक इडली-वड़ा और गरमागरम फिल्टर कॉफी के लिए येदियुर के पास स्वाति डेलिकेसी पर अवश्य रुकें। स्वच्छ शौचालय एक प्रमुख लाभ है!",
    likes: 42,
    commentsCount: 15,
    route: "Bangalore to Coorg"
  },
  {
    id: 2,
    author: "Pooja Sharma",
    avatar: "👩🏻‍💼",
    category: "tips",
    date: "2 days ago",
    titleEn: "Namma Metro is a lifesaver during rainy evenings",
    titleHi: "बारिश की शामों में नम्मा मेट्रो एक जीवन रक्षक है",
    contentEn: "Traveled from Indiranagar to Majestic yesterday during heavy peak hours. Road traffic was fully jammed, but Namma Metro took me there in just 18 minutes! Absolute godsend.",
    contentHi: "कल भारी पीक आवर्स के दौरान इंदिरानगर से मैजेस्टिक तक यात्रा की। सड़क यातायात पूरी तरह से जाम था, लेकिन नम्मा मेट्रो मुझे केवल 18 मिनट में वहां ले गई! बिल्कुल वरदान।",
    likes: 89,
    commentsCount: 22,
    route: "Indiranagar to Majestic"
  },
  {
    id: 3,
    author: "Karan Johar",
    avatar: "🤵",
    category: "scenic",
    date: "Last week",
    titleEn: "Stunning Western Ghats view on Mangalore route",
    titleHi: "मंगलौर मार्ग पर पश्चिमी घाट के आश्चर्यजनक दृश्य",
    contentEn: "If you take the early morning bus through Shiradi Ghat, the misty morning valleys are absolutely breathtaking. Sit on the left side of the upper deck for the best views!",
    contentHi: "यदि आप शिराडी घाट से होते हुए सुबह की बस लेते हैं, तो धुंधली सुबह की घाटियां बिल्कुल लुभावनी लगती हैं। बेहतरीन दृश्यों के लिए ऊपरी डेक के बाईं ओर बैठें!",
    likes: 124,
    commentsCount: 45,
    route: "Bangalore to Mangalore"
  }
];

export default function TravelCirclesSimulator() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "tips" | "food" | "delays" | "scenic">("all");
  const [activeTab, setActiveTab] = useState<"forum" | "ticket">("forum");
  const [postCategory, setPostCategory] = useState<"tips" | "food" | "delays" | "scenic">("tips");

  // Ticket Generator states
  const [source, setSource] = useState("Bangalore (Majestic)");
  const [destination, setDestination] = useState("Mysore (Palace Road)");
  const [travelerName, setTravelerName] = useState("John Doe");
  const [travelDate, setTravelDate] = useState("2026-07-05");
  const [seatNum, setSeatNum] = useState("12B");
  const [pnr, setPnr] = useState("");
  const [showTicket, setShowTicket] = useState(false);
  const [paymentProvider, setPaymentProvider] = useState<"gpay" | "phonepe" | "paytm">("gpay");

  const handleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleCreatePost = () => {
    if (!newTitle.trim() || !newContent.trim()) {
      alert("Please enter title and content!");
      return;
    }
    const newPost: Post = {
      id: Date.now(),
      author: travelerName || "Global Traveler",
      avatar: "🎒",
      category: postCategory,
      date: "Just now",
      titleEn: newTitle,
      titleHi: `हिन्दी अनुवाद: ${newTitle}`,
      contentEn: newContent,
      contentHi: `हिन्दी अनुवाद: ${newContent}`,
      likes: 1,
      commentsCount: 0,
      route: `${source} → ${destination}`
    };
    setPosts((prev) => [newPost, ...prev]);
    setNewTitle("");
    setNewContent("");
    alert("Post published successfully!");
  };

  const handleGenerateTicket = () => {
    if (!travelerName.trim()) {
      alert("Please enter traveler name!");
      return;
    }
    const generatedPnr = `TT${Math.floor(100000 + Math.random() * 900000)}`;
    setPnr(generatedPnr);
    setShowTicket(true);
  };

  const filteredPosts = selectedCategory === "all"
    ? posts
    : posts.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-xl flex flex-col font-sans" id="travelcircles-browser">
      
      {/* ==================== BROWSER CHROME HEADER ==================== */}
      <div className="bg-zinc-100 px-4 py-3 border-b border-zinc-200 flex items-center gap-3 select-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-rose-400 block border border-rose-500/20"></span>
          <span className="w-3 h-3 rounded-full bg-amber-400 block border border-amber-500/20"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-400 block border border-emerald-500/20"></span>
        </div>
        <div className="flex-1 bg-white rounded-lg px-3 py-1 text-[11px] font-medium text-zinc-400 flex items-center gap-1.5 border border-zinc-200 font-mono">
          <span className="text-zinc-300">https://</span>
          <span className="text-zinc-600 font-bold">www.travelcircles.in</span>
        </div>
        <span className="text-[10px] font-bold text-pink-600 px-2 uppercase tracking-wide shrink-0 bg-pink-50 border border-pink-200/50 rounded py-0.5">Circles social</span>
      </div>

      {/* ==================== WEBSITE VIEWPORT ==================== */}
      <div className="bg-zinc-50 overflow-auto max-h-[85vh] relative text-zinc-800 text-xs font-semibold">
        
        {/* Navigation Bar */}
        <header className="bg-white border-b border-zinc-200/80 px-6 py-4 sticky top-0 z-40 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-md">
              <Compass className="text-white h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-zinc-950 tracking-tight text-base font-sans">TravelCircles</span>
              <span className="text-[9px] bg-pink-50 text-pink-700 font-bold px-1.5 py-0.5 rounded ml-1.5 uppercase tracking-wider">Social Hub</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab("forum")}
              className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer border ${
                activeTab === "forum" 
                  ? "bg-pink-600 border-pink-600 text-white shadow-md shadow-pink-600/10" 
                  : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              Circles Forum
            </button>
            <button 
              onClick={() => setActiveTab("ticket")}
              className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer border ${
                activeTab === "ticket" 
                  ? "bg-pink-600 border-pink-600 text-white shadow-md shadow-pink-600/10" 
                  : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              Ticket Generator
            </button>
          </div>
        </header>

        {/* ==================== SOCIAL FORUM TAB ==================== */}
        {activeTab === "forum" && (
          <div className="animate-fade-in p-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Create Post Form */}
            <div className="lg:col-span-4 bg-white border border-zinc-200 rounded-3xl p-5 space-y-4 shadow-sm">
              <div className="border-b border-zinc-100 pb-2 flex justify-between items-center flex-wrap gap-2">
                <div>
                  <h3 className="font-extrabold text-zinc-950 text-xs">Share Travel Tip</h3>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Post to the public feed</p>
                </div>

                {/* English/Hindi Language toggles */}
                <div className="flex bg-zinc-100 p-0.5 rounded-lg border border-zinc-200">
                  <button 
                    onClick={() => setLang("en")}
                    className={`px-2 py-1 rounded text-[9px] font-bold ${lang === "en" ? "bg-white shadow text-zinc-900" : "text-zinc-400"}`}
                  >
                    EN
                  </button>
                  <button 
                    onClick={() => setLang("hi")}
                    className={`px-2 py-1 rounded text-[9px] font-bold ${lang === "hi" ? "bg-white shadow text-zinc-900" : "text-zinc-400"}`}
                  >
                    हिं
                  </button>
                </div>
              </div>

              {/* Title input */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-zinc-400 uppercase">Advice Title</label>
                <input 
                  type="text" 
                  placeholder={lang === "en" ? "Best highway breakfast spots..." : "हाईवे पर नाश्ते के सबसे अच्छे स्थान..."}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-xs font-bold focus:outline-none focus:border-pink-500" 
                />
              </div>

              {/* Category selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase">Board Category</label>
                <select 
                  value={postCategory}
                  onChange={(e) => setPostCategory(e.target.value as any)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-pink-500 font-bold"
                >
                  <option value="tips">💡 General Travel Tips</option>
                  <option value="food">🍱 Highway Food Pitstops</option>
                  <option value="delays">⚠️ Delay Warnings</option>
                  <option value="scenic">🏔️ Scenic Vantage Points</option>
                </select>
              </div>

              {/* Body message */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-zinc-400 uppercase">Your Experience</label>
                <textarea 
                  rows={4}
                  placeholder={lang === "en" ? "Describe highway lanes, clean restrooms, food recommendations..." : "हाईवे लेन, साफ शौचालय, भोजन की सिफारिशों का वर्णन करें..."}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-xs font-bold focus:outline-none focus:border-pink-500 resize-none font-sans" 
                />
              </div>

              <button
                onClick={handleCreatePost}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-pink-600/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span>Publish advice</span>
              </button>
            </div>

            {/* Right Column: Interactive feed list */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Category filter board tags */}
              <div className="flex gap-2 select-none overflow-x-auto pb-1">
                {[
                  { id: "all", label: "All Topics" },
                  { id: "tips", label: "💡 Travel Tips" },
                  { id: "food", label: "🍱 Food Stops" },
                  { id: "delays", label: "⚠️ Delays" },
                  { id: "scenic", label: "🏔️ Scenic Spots" }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as any)}
                    className={`rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase border transition-all whitespace-nowrap ${
                      selectedCategory === cat.id
                        ? "bg-pink-600 border-pink-500 text-white shadow-md shadow-pink-500/15"
                        : "bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-50"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Feed posts list */}
              <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
                {filteredPosts.map(post => (
                  <div key={post.id} className="bg-white border border-zinc-200 rounded-3xl p-5 space-y-3 shadow-sm hover:border-zinc-300 transition-all">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl bg-zinc-50 rounded-xl p-1.5 border border-zinc-100">{post.avatar}</span>
                        <div>
                          <span className="font-extrabold text-zinc-900 block">{post.author}</span>
                          <span className="text-[9px] text-zinc-400 font-medium">Route: {post.route} • {post.date}</span>
                        </div>
                      </div>
                      <span className="bg-pink-50 border border-pink-100 text-pink-700 px-2.5 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wider">{post.category}</span>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="font-extrabold text-zinc-950 text-sm">{lang === "en" ? post.titleEn : post.titleHi}</h4>
                      <p className="text-zinc-600 leading-relaxed font-medium text-[11px] font-sans">{lang === "en" ? post.contentEn : post.contentHi}</p>
                    </div>

                    <div className="flex gap-4 border-t border-zinc-100 pt-3 select-none">
                      <button 
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 hover:text-pink-600 transition-colors"
                      >
                        <ThumbsUp className="h-4 w-4" /> {post.likes} Likes
                      </button>
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400">
                        <MessageSquare className="h-4 w-4" /> {post.commentsCount} comments
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        )}

        {/* ==================== TICKET GENERATOR TAB ==================== */}
        {activeTab === "ticket" && (
          <div className="animate-fade-in p-6 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left input Form */}
            <div className="lg:col-span-5 bg-white border border-zinc-200 rounded-3xl p-5 space-y-4 shadow-sm text-xs font-semibold">
              <div className="border-b border-zinc-100 pb-2">
                <h3 className="font-extrabold text-zinc-950 text-xs">Print Boarding Ticket</h3>
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Generate customized pass</p>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-zinc-400 uppercase">Passenger Name</label>
                <input 
                  type="text" 
                  value={travelerName}
                  onChange={(e) => setTravelerName(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-xs font-bold focus:outline-none focus:border-pink-500" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-zinc-400 uppercase">Departure Port</label>
                  <input type="text" value={source} onChange={(e) => setSource(e.target.value)} className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2 text-xs focus:outline-none focus:border-pink-500 font-bold" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-zinc-400 uppercase">Destination</label>
                  <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2 text-xs focus:outline-none focus:border-pink-500 font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-zinc-400 uppercase">Date of Travel</label>
                  <input type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2 text-xs focus:outline-none focus:border-pink-500 font-bold font-mono" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-zinc-400 uppercase">Seat Code</label>
                  <input type="text" value={seatNum} onChange={(e) => setSeatNum(e.target.value)} className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2 text-xs focus:outline-none focus:border-pink-500 font-bold font-mono" />
                </div>
              </div>

              <button
                onClick={handleGenerateTicket}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-pink-600/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                <QrCode className="h-4 w-4" />
                <span>Compile boarding Pass</span>
              </button>
            </div>

            {/* Right Printable Boarding Pass layout */}
            <div className="lg:col-span-7 flex flex-col justify-center items-center">
              {showTicket ? (
                <div className="w-full max-w-sm bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-2xl animate-fade-in text-zinc-800">
                  <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white p-5 text-center">
                    <CheckCircle className="h-6 w-6 text-white mx-auto mb-1.5" />
                    <h4 className="font-extrabold text-sm">Boarding Ticket Issued</h4>
                    <span className="text-[9px] font-mono text-pink-100">PNR Code: {pnr}</span>
                  </div>

                  <div className="p-5 space-y-4">
                    <div className="flex justify-between items-center border-b border-zinc-150 pb-3 text-xs">
                      <div>
                        <span className="text-[9px] text-zinc-400 uppercase font-bold">Passenger</span>
                        <div className="text-zinc-950 font-black">{travelerName}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-zinc-400 uppercase font-bold">Seat Code</span>
                        <div className="text-pink-600 font-black font-mono">{seatNum}</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <div>
                        <span className="text-[9px] text-zinc-400 uppercase font-bold">From</span>
                        <div className="text-zinc-900 font-black">{source}</div>
                      </div>
                      <span className="text-zinc-300">→</span>
                      <div className="text-right">
                        <span className="text-[9px] text-zinc-400 uppercase font-bold">To</span>
                        <div className="text-zinc-900 font-black">{destination}</div>
                      </div>
                    </div>

                    <div className="border-t border-zinc-150 pt-3">
                      <span className="text-[9px] text-zinc-400 uppercase font-bold block">Travel Date</span>
                      <span className="text-zinc-900 font-extrabold font-mono text-xs">{travelDate}</span>
                    </div>

                    <div className="border-t border-dashed border-zinc-200 pt-4 flex justify-between items-center bg-zinc-50 -mx-5 -mb-5 p-5">
                      <span className="text-[9px] text-zinc-400 uppercase font-bold leading-normal block max-w-[160px]">Contactless gate boarding barcode</span>
                      <QrCode className="h-14 w-14 text-zinc-900" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-zinc-400 text-center space-y-2 select-none">
                  <FileText className="h-10 w-10 text-zinc-200 mx-auto" />
                  <span className="text-[10px] font-bold uppercase tracking-wider block">No Boarding Pass Issued</span>
                  <p className="text-[9px] text-zinc-400 max-w-xs leading-normal">Fill the form inputs on the left side and click compile to print your high-fidelity travel ticket voucher.</p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
