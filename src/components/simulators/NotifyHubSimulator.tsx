import { useState } from "react";
import { 
  BellRing, 
  Check, 
  Send, 
  AlertTriangle, 
  MessageSquare, 
  Mail, 
  AlertCircle, 
  Sparkles,
  Smartphone,
  Globe,
  Clock,
  CheckCircle2,
  Cpu,
  RefreshCw,
  Info,
  ChevronRight,
  Database,
  ArrowLeft,
  Settings,
  Terminal,
  Activity
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

interface ChannelConfig {
  id: string;
  name: string;
  color: string;
  latency: number; // ms
  successRate: number; // %
  icon: any;
  endpoint: string;
}

const CHANNELS: ChannelConfig[] = [
  { id: "email", name: "SMTP Mail Server", color: "#3b82f6", latency: 120, successRate: 99.8, icon: Mail, endpoint: "smtp://mail.notifyhub.org:587" },
  { id: "sms", name: "Twilio SMS Gateway", color: "#10b981", latency: 85, successRate: 98.6, icon: MessageSquare, endpoint: "https://api.twilio.com/2010-04-01" },
  { id: "push", name: "Web Push API Engine", color: "#8b5cf6", latency: 15, successRate: 95.2, icon: BellRing, endpoint: "https://fcm.googleapis.com/fcm/send" },
  { id: "slack", name: "Slack Webhook Core", color: "#e11d48", latency: 45, successRate: 100, icon: Sparkles, endpoint: "https://hooks.slack.com/services/T00" }
];

interface EventPreset {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "promo";
  subject: string;
}

const PRESETS: EventPreset[] = [
  { id: "booking", title: "Booking Confirmation", subject: "Reservation Confirmed PNR #4892", message: "Ticket confirmed! Seat L-3A reserved on Majestic → Mysore luxury sleeper departing at 21:00 PM.", type: "success" },
  { id: "delay", title: "Route Delay Warning", subject: "CRITICAL: Service Delay Notice", message: "Alert: Volvo Bus is delayed by 25 minutes near Hebbal Flyover due to local rain waterlogging.", type: "warning" },
  { id: "discount", title: "Festive Flash Sale", subject: "EXCLUSIVE: Dussehra 50% Off", message: "Dussehra Special! Use code FEST50 to get flat 50% discount on all South India bus bookings today.", type: "promo" }
];

export default function NotifyHubSimulator() {
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["email", "sms"]);
  const [activePreset, setActivePreset] = useState<string>("booking");
  const [customMsg, setCustomMsg] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchedLogs, setDispatchedLogs] = useState<Array<{ id: number; subject: string; msg: string; type: string; channels: string[]; time: string; status: "Queued" | "Delivered" | "In-Flight" }>>([
    { id: 1, subject: "Reservation Confirmed PNR #4892", msg: "Ticket confirmed! Seat L-3A reserved successfully.", type: "success", channels: ["email", "sms"], time: "10:14 AM", status: "Delivered" }
  ]);
  
  // Phone and terminal mock popups
  const [liveSmsAlert, setLiveSmsAlert] = useState<string | null>(null);
  const [livePushAlert, setLivePushAlert] = useState<string | null>(null);
  const [liveEmailSubject, setLiveEmailSubject] = useState<string | null>(null);

  const activePresetObj = PRESETS.find((p) => p.id === activePreset) || PRESETS[0];
  const finalMessage = customMsg.trim() || activePresetObj.message;
  const finalSubject = customSubject.trim() || activePresetObj.subject;

  const handleDispatch = () => {
    if (selectedChannels.length === 0) {
      alert("Please select at least one delivery channel!");
      return;
    }

    setIsDispatching(true);
    setLiveSmsAlert(null);
    setLivePushAlert(null);
    setLiveEmailSubject(null);

    const logId = Date.now();
    const newLog = {
      id: logId,
      subject: finalSubject,
      msg: finalMessage,
      type: activePresetObj.type,
      channels: [...selectedChannels],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      status: "In-Flight" as const
    };

    setDispatchedLogs((prev) => [newLog, ...prev]);

    // Simulate multi-channel pipeline processing
    setTimeout(() => {
      setIsDispatching(false);

      setDispatchedLogs((prev) => 
        prev.map((l) => l.id === logId ? { ...l, status: "Delivered" as const } : l)
      );

      if (selectedChannels.includes("sms")) {
        setLiveSmsAlert(finalMessage);
      }
      if (selectedChannels.includes("push")) {
        setLivePushAlert(finalMessage);
      }
      if (selectedChannels.includes("email")) {
        setLiveEmailSubject(finalSubject);
      }

      // Auto clear live alerts after 5 seconds
      setTimeout(() => {
        setLiveSmsAlert(null);
        setLivePushAlert(null);
        setLiveEmailSubject(null);
      }, 5000);

    }, 1500);
  };

  const chartData = CHANNELS.map((ch) => ({
    name: ch.name.split(" ")[0],
    "Success Rate (%)": ch.successRate,
    "Latency (ms)": ch.latency,
    isSelected: selectedChannels.includes(ch.id)
  }));

  const toggleChannel = (channelId: string) => {
    if (selectedChannels.includes(channelId)) {
      setSelectedChannels(prev => prev.filter(id => id !== channelId));
    } else {
      setSelectedChannels(prev => [...prev, channelId]);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-xl flex flex-col font-sans" id="notifyhub-browser">
      
      {/* ==================== BROWSER CHROME HEADER ==================== */}
      <div className="bg-zinc-100 px-4 py-3 border-b border-zinc-200 flex items-center gap-3 select-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-rose-400 block border border-rose-500/20"></span>
          <span className="w-3 h-3 rounded-full bg-amber-400 block border border-amber-500/20"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-400 block border border-emerald-500/20"></span>
        </div>
        <div className="flex-1 bg-white rounded-lg px-3 py-1 text-[11px] font-medium text-zinc-400 flex items-center gap-1.5 border border-zinc-200 font-mono">
          <span className="text-zinc-300">https://</span>
          <span className="text-zinc-600 font-bold">console.notifyhub.cloud</span>
        </div>
        <span className="text-[10px] font-bold text-violet-600 px-2 uppercase tracking-wide shrink-0 bg-violet-50 border border-violet-200/50 rounded py-0.5">NotifyHub Router</span>
      </div>

      {/* ==================== WEBSITE VIEWPORT ==================== */}
      <div className="bg-zinc-50 overflow-auto max-h-[85vh] relative text-zinc-800">
        
        {/* Navigation Bar */}
        <header className="bg-white border-b border-zinc-200/80 px-6 py-4 sticky top-0 z-40 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <BellRing className="text-white h-5 w-5 animate-pulse" />
            </div>
            <div>
              <span className="font-extrabold text-zinc-950 tracking-tight text-base">NotifyHub</span>
              <span className="text-[9px] bg-violet-50 text-violet-700 font-bold px-1.5 py-0.5 rounded ml-1.5 uppercase tracking-wider">Broker</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-zinc-500">
            <span className="text-zinc-800 font-black border-b-2 border-violet-600 pb-1">Pipeline Console</span>
            <span className="hover:text-violet-600 cursor-pointer">Gateway Health</span>
            <span className="hover:text-violet-600 cursor-pointer">Logs Database</span>
          </div>
        </header>

        {/* Workspace Grid */}
        <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Panel: Delivery Channel Toggles */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white border border-zinc-200 rounded-3xl p-4 space-y-3 shadow-sm text-xs font-semibold">
              <h3 className="font-extrabold text-zinc-950 border-b border-zinc-100 pb-1.5 flex items-center gap-1.5">
                <Settings className="h-4 w-4 text-violet-600" /> Gateway Channels
              </h3>
              
              <div className="space-y-2">
                {CHANNELS.map(ch => {
                  const isSelected = selectedChannels.includes(ch.id);
                  const Icon = ch.icon;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => toggleChannel(ch.id)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected 
                          ? "border-violet-600 bg-violet-50/50 text-violet-800" 
                          : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 shrink-0" style={{ color: isSelected ? ch.color : "#9ca3af" }} />
                        <span className="font-bold text-[11px] truncate">{ch.name.split(" ")[0]}</span>
                      </div>
                      <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-emerald-500" : "bg-zinc-300"}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Center Column: Message Composer & Live Logs */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Event trigger composer */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 space-y-4 shadow-sm text-xs font-semibold">
              <div>
                <h3 className="font-extrabold text-zinc-950 text-xs">Broadcast Event Dispatcher</h3>
                <p className="text-[10px] text-zinc-400 font-bold uppercase mt-0.5">Trigger real-time alert templates</p>
              </div>

              {/* Presets Row */}
              <div className="flex bg-zinc-100 p-1 rounded-xl gap-1">
                {PRESETS.map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => { setActivePreset(preset.id); setCustomMsg(""); setCustomSubject(""); }}
                    className={`flex-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${activePreset === preset.id ? "bg-violet-600 text-white shadow" : "text-zinc-500 hover:text-zinc-800"}`}
                  >
                    {preset.title.split(" ")[0]}
                  </button>
                ))}
              </div>

              {/* Subject box */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-zinc-400 uppercase">Alert Subject Line</label>
                <input 
                  type="text" 
                  value={customSubject || activePresetObj.subject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-xs font-bold focus:outline-none focus:border-violet-600" 
                />
              </div>

              {/* Message textbox */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-zinc-400 uppercase">Alert Payload Message</label>
                <textarea 
                  rows={3}
                  value={customMsg || activePresetObj.message}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-xs font-bold focus:outline-none focus:border-violet-600 resize-none" 
                />
              </div>

              <button
                onClick={handleDispatch}
                disabled={isDispatching}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-violet-600/10 flex items-center justify-center gap-2 cursor-pointer disabled:bg-violet-350"
              >
                {isDispatching ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Broadcasting Alert...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Dispatch Payload</span>
                  </>
                )}
              </button>
            </div>

            {/* Pipeline logs table */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm space-y-3 text-xs font-semibold">
              <div className="border-b border-zinc-100 pb-1.5">
                <h3 className="font-extrabold text-zinc-950 text-xs">Gateway Delivery Audits</h3>
                <p className="text-[10px] text-zinc-400 font-bold uppercase mt-0.5">Live broker queue</p>
              </div>

              <div className="max-h-44 overflow-y-auto space-y-2 pr-1">
                {dispatchedLogs.map(log => (
                  <div key={log.id} className="p-2.5 border border-zinc-150 rounded-xl bg-zinc-50/50 flex justify-between items-center text-[11px]">
                    <div className="space-y-1 truncate max-w-[200px]">
                      <div className="font-bold text-zinc-900 truncate">{log.subject}</div>
                      <div className="text-[9px] text-zinc-400">Time: {log.time} • Channels: {log.channels.join(", ")}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                      log.status === "Delivered" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-amber-50 text-amber-700 border border-amber-100 animate-pulse"
                    }`}>{log.status}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Physical Smartphone Preview Mock */}
          <div className="lg:col-span-4 flex flex-col items-center">
            
            {/* Phone Outer casing */}
            <div className="w-64 h-[440px] rounded-[36px] bg-zinc-950 border-8 border-zinc-900 shadow-2xl relative flex flex-col overflow-hidden text-zinc-950">
              
              {/* Camera Notch notch */}
              <div className="absolute top-2 inset-x-0 mx-auto w-24 h-4 bg-zinc-900 rounded-full z-30 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-zinc-950"></span>
              </div>

              {/* Lock screen/home screen wallpaper */}
              <div className="flex-1 bg-gradient-to-b from-indigo-900 to-indigo-950 p-4 pt-10 flex flex-col justify-start relative">
                
                {/* Time header */}
                <div className="text-center text-white/90 font-mono text-2xl font-black mb-6">
                  10:15 <span className="text-xs font-bold block mt-1 tracking-wider">MONDAY, JUNE 29</span>
                </div>

                {/* SMS Notification card (Twilio) */}
                {liveSmsAlert && (
                  <div className="bg-white/95 border border-white/20 p-3 rounded-2xl shadow-xl backdrop-blur-md animate-fade-in space-y-1 z-20">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[10px] text-zinc-500 uppercase flex items-center gap-1">
                        <MessageSquare className="h-3 w-3 text-emerald-500" /> TWILIO MESSAGE
                      </span>
                      <span className="text-[8px] text-zinc-400">now</span>
                    </div>
                    <p className="text-[10px] font-bold text-zinc-800 leading-normal">{liveSmsAlert}</p>
                  </div>
                )}

                {/* Web Push Notification card (Firebase FCM) */}
                {livePushAlert && (
                  <div className="bg-zinc-950/90 border border-zinc-800 p-3 rounded-2xl shadow-xl backdrop-blur-md animate-fade-in space-y-1 z-20 mt-2 text-white">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[10px] text-indigo-400 uppercase flex items-center gap-1">
                        <BellRing className="h-3 w-3 text-indigo-400 animate-bounce" /> PUSH ALERT
                      </span>
                      <span className="text-[8px] text-zinc-500">now</span>
                    </div>
                    <p className="text-[10px] font-bold text-zinc-200 leading-normal">{livePushAlert}</p>
                  </div>
                )}

                {/* No notifications empty state */}
                {!liveSmsAlert && !livePushAlert && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-white/30 space-y-2 select-none">
                    <BellRing className="h-10 w-10 text-white/10" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">No Alerts Pending</span>
                    <span className="text-[8px] text-white/20 max-w-[140px] leading-normal font-medium">Trigger a dispatch from the composer console to light up the terminal.</span>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
