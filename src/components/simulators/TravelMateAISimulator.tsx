import { useState, useRef, useEffect, ReactNode } from "react";
import { 
  Cpu, 
  Send, 
  Sparkles, 
  MessageCircle, 
  Info, 
  RefreshCw,
  User,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Settings,
  Flame,
  Zap,
  Terminal,
  Activity,
  ArrowLeft,
  Compass,
  MessageSquare
} from "lucide-react";

// ==================== TYPES & CONSTANTS ====================

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  "🌿 Plan a 3-day eco-itinerary for Coorg",
  "🚗 How much CO₂ is saved taking BMTC Volvo?",
  "🚐 Hire coach for 18 passengers with AC",
  "🍲 Highway food stops on Bangalore to Mysore"
];

export default function TravelMateAISimulator() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "ai",
      text: "👋 Namaste! I am **TravelMate AI**, your smart South-Indian travel companion. I can help you plan custom itineraries, calculate carbon emission comparisons, select luxury bus coach capacities, and share optimal road tips for South Indian transits.\n\n*What destination or route can I assist you with today?*",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessageToAPI = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMsg("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend })
      });

      if (!res.ok) {
        throw new Error("Failed to communicate with AI Server");
      }

      const data = await res.json();
      
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: data.text || "I apologize, but I received an empty response. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: any) {
      console.error(err);
      // Fallback response with offline helpful suggestions
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        sender: "ai",
        text: "⚠️ **Offline Simulation Mode Active**:\n\nUnable to connect to the live server route `/api/gemini/chat`. Please verify that the server is up and `GEMINI_API_KEY` is fully configured in **Settings**.\n\n*Here is a simulated response based on your query:*\n\n1. **Route Feasibility**: The Bangalore to Coorg NH48 highway spans ~250 km. Highly recommended to stop at **Swathi Delicacy** near Yediyur for hot filter coffee.\n2. **Eco footprint savings**: Opting for BMTC/KSRTC premium AC Volvo liners reduces your carbon footprint by over **78%** compared to driving an SUV alone!\n3. **Ideal Vehicle Group Class**: For 18 passengers, select the **25-Seater Mini Coach Bus Class** on the TripTogether Hub to guarantee comfort and safety.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    sendMessageToAPI(inputMsg);
  };

  const handleReset = () => {
    setMessages([
      {
        id: "init",
        sender: "ai",
        text: "👋 Namaste! I am **TravelMate AI**, your smart South-Indian travel companion. I can help you plan custom itineraries, calculate carbon emission comparisons, select luxury bus coach capacities, and share optimal road tips for South Indian transits.\n\n*What destination or route can I assist you with today?*",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handlePromptClick = (promptText: string) => {
    sendMessageToAPI(promptText);
  };

  const formatBubbleText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      let content: ReactNode = line;
      
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const raw = line.replace(/^[-*]\s+/, "");
        content = <li className="ml-4 list-disc pl-1 font-medium">{parseBold(raw)}</li>;
      } else if (line.trim().match(/^\d+\.\s+/)) {
        const raw = line.replace(/^\d+\.\s+/, "");
        content = <li className="ml-4 list-decimal pl-1 font-medium">{parseBold(raw)}</li>;
      } else {
        content = <p className="mb-1 leading-relaxed font-medium">{parseBold(line)}</p>;
      }

      return <div key={idx}>{content}</div>;
    });
  };

  const parseBold = (text: string) => {
    const parts = text.split(/\*\*([^*]+)\*\*/g);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} className="font-extrabold text-zinc-950 underline decoration-indigo-200 decoration-2">{part}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-xl flex flex-col font-sans" id="travelmate-browser">
      
      {/* ==================== BROWSER CHROME HEADER ==================== */}
      <div className="bg-zinc-100 px-4 py-3 border-b border-zinc-200 flex items-center gap-3 select-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-rose-400 block border border-rose-500/20"></span>
          <span className="w-3 h-3 rounded-full bg-amber-400 block border border-amber-500/20"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-400 block border border-emerald-500/20"></span>
        </div>
        <div className="flex-1 bg-white rounded-lg px-3 py-1 text-[11px] font-medium text-zinc-400 flex items-center gap-1.5 border border-zinc-200 font-mono">
          <span className="text-zinc-300">https://</span>
          <span className="text-zinc-600 font-bold">www.travelmate.ai</span>
        </div>
        <span className="text-[10px] font-bold text-indigo-600 px-2 uppercase tracking-wide shrink-0 bg-indigo-50 border border-indigo-200/50 rounded py-0.5">Gemini-powered</span>
      </div>

      {/* ==================== WEBSITE VIEWPORT ==================== */}
      <div className="bg-zinc-50 overflow-auto max-h-[85vh] relative text-zinc-800 text-xs font-semibold">
        
        {/* Navigation Bar */}
        <header className="bg-white border-b border-zinc-200/80 px-6 py-4 sticky top-0 z-40 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <Sparkles className="text-white h-5 w-5 animate-pulse" />
            </div>
            <div>
              <span className="font-extrabold text-zinc-950 tracking-tight text-base font-sans">TravelMate AI</span>
              <span className="text-[9px] bg-indigo-50 text-indigo-700 font-bold px-1.5 py-0.5 rounded ml-1.5 uppercase tracking-wider">Assistant</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-zinc-500">
            <span className="text-zinc-800 font-black border-b-2 border-indigo-600 pb-1">AI Chat Room</span>
            <span className="hover:text-indigo-600 cursor-pointer" onClick={handleReset}>Reset Chat</span>
          </div>
        </header>

        {/* Workspace Arena */}
        <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Panel: Prompt Starters & Model Controls */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Prompt starters badges */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-4 space-y-3 shadow-sm">
              <h3 className="font-extrabold text-zinc-950 border-b border-zinc-100 pb-1.5 flex items-center gap-1.5 text-xs">
                <Compass className="h-4 w-4 text-indigo-600" /> Suggested Prompts
              </h3>
              
              <div className="grid grid-cols-1 gap-2 select-none">
                {QUICK_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handlePromptClick(prompt)}
                    className="p-2.5 rounded-xl border border-zinc-150 bg-zinc-50/50 hover:bg-white text-left font-bold text-[10px] text-zinc-600 hover:border-indigo-500 hover:text-indigo-900 transition-all leading-relaxed"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Model specifications dials */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-4 space-y-3 shadow-sm text-[10px] font-bold text-zinc-400">
              <h3 className="font-extrabold text-zinc-950 border-b border-zinc-100 pb-1.5 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <Cpu className="h-4 w-4 text-indigo-600" /> Engine Parameters
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>MODEL STATUS</span>
                  <span className="text-emerald-600">ONLINE</span>
                </div>
                <div className="flex justify-between">
                  <span>ACTIVE LLM</span>
                  <span className="text-zinc-800 font-mono">gemini-2.5-flash</span>
                </div>
                <div className="flex justify-between">
                  <span>TEMPERATURE</span>
                  <span className="text-zinc-800 font-mono">0.7</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Chat Screen Panel */}
          <div className="lg:col-span-8 bg-white border border-zinc-200 rounded-3xl shadow-sm flex flex-col overflow-hidden h-[460px]">
            
            {/* Header channel details */}
            <div className="bg-zinc-50 px-5 py-3 border-b border-zinc-150 flex justify-between items-center select-none shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse block" />
                <div>
                  <span className="font-extrabold text-zinc-900 block text-xs">Direct API Stream Link</span>
                  <span className="text-[9px] text-zinc-400 font-bold block uppercase mt-0.5">SSL Secured TLS 1.3</span>
                </div>
              </div>
              <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 font-black px-2 py-0.5 rounded text-[8px] uppercase tracking-wider">Session Active</span>
            </div>

            {/* Scrolling Chat Logs viewport */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-zinc-50/30">
              {messages.map(msg => {
                const isAI = msg.sender === "ai";
                return (
                  <div 
                    key={msg.id} 
                    className={`flex gap-3 max-w-[85%] ${isAI ? "mr-auto" : "ml-auto flex-row-reverse"}`}
                  >
                    {/* Avatar circle */}
                    <div className={`w-8 h-8 rounded-full border shrink-0 flex items-center justify-center text-xs font-black select-none ${
                      isAI 
                        ? "bg-indigo-50 border-indigo-100 text-indigo-600" 
                        : "bg-zinc-950 border-zinc-900 text-white"
                    }`}>
                      {isAI ? <Sparkles className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </div>

                    <div className="space-y-1">
                      <div className={`p-3.5 rounded-3xl text-[11px] leading-relaxed shadow-sm font-sans ${
                        isAI 
                          ? "bg-white border border-zinc-150 rounded-tl-sm text-zinc-850" 
                          : "bg-indigo-600 text-white rounded-tr-sm"
                      }`}>
                        {formatBubbleText(msg.text)}
                      </div>
                      <span className="text-[8px] text-zinc-400 font-bold font-mono block px-2 text-right">{msg.timestamp}</span>
                    </div>
                  </div>
                );
              })}

              {/* Loader Typing Indicator bubble */}
              {isLoading && (
                <div className="flex gap-3 mr-auto max-w-[80%] animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  </div>
                  <div className="p-3.5 bg-white border border-zinc-150 rounded-3xl rounded-tl-sm text-[10px] font-bold text-zinc-400">
                    TravelMate AI is compiling response...
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Form Input message bar */}
            <div className="p-3.5 border-t border-zinc-150 bg-white flex gap-2 shrink-0">
              <input 
                type="text" 
                placeholder="Ask about Mysore, filter coffee, route fuel load..." 
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={isLoading}
                className="flex-1 bg-zinc-50 border border-zinc-200 rounded-2xl px-4 py-2.5 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white font-bold" 
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !inputMsg.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-2xl cursor-pointer disabled:opacity-40 transition-all flex items-center justify-center"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
