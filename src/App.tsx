import { useState, useEffect } from "react";
import { 
  PROJECTS, 
  GENERAL_STATS, 
  Project 
} from "./data/projects";
import { DETAILED_EXPLANATIONS } from "./data/detailedExplanations";

// Simulators
import EcoRouteSimulator from "./components/simulators/EcoRouteSimulator";
import SeeMySeatSimulator from "./components/simulators/SeeMySeatSimulator";
import TripTogetherSimulator from "./components/simulators/TripTogetherSimulator";
import TravelCirclesSimulator from "./components/simulators/TravelCirclesSimulator";
import GlobeSpeakSimulator from "./components/simulators/GlobeSpeakSimulator";
import NotifyHubSimulator from "./components/simulators/NotifyHubSimulator";
import TransitRateSimulator from "./components/simulators/TransitRateSimulator";
import LumosSimulator from "./components/simulators/LumosSimulator";
import TravelMateAISimulator from "./components/simulators/TravelMateAISimulator";
import RouteWiseSimulator from "./components/simulators/RouteWiseSimulator";

// Icons
import { 
  Laptop, 
  Sparkles, 
  Code, 
  BarChart3, 
  Briefcase, 
  Compass, 
  ArrowUpRight, 
  Search, 
  CheckCircle2, 
  Layers, 
  Flame, 
  ChevronRight,
  ShieldCheck,
  Leaf,
  Grid,
  Users,
  MessageSquare,
  Languages,
  BellRing,
  Star,
  Lightbulb,
  Cpu,
  Route,
  Lock,
  RefreshCw,
  Terminal,
  Play,
  Check,
  Award,
  Shield,
  Trash2,
  Database,
  Building,
  Activity,
  CheckCircle,
  TrendingUp,
  Github,
  Info,
  Eye,
  Car,
  Bus,
  BookOpen,
  Heart
} from "lucide-react";

import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from "recharts";

export default function App() {
  const [activeTab, setActiveTab] = useState<"projects" | "simulators" | "analytics" | "commercial" | "about">("projects");
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  // Dynamic Simulators selector state
  const [activeSimulatorId, setActiveSimulatorId] = useState<number>(1);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isConsoleCollapsed, setIsConsoleCollapsed] = useState(false);

  // New state for About / Commercial Value selected project explanation
  const [aboutSelectedProjId, setAboutSelectedProjId] = useState<number>(1);

  // States for the interactive tasks board inside the About section
  const [aboutTaskSearch, setAboutTaskSearch] = useState("");
  const [aboutTaskCategory, setAboutTaskCategory] = useState("All");

  // Analytics tab active state
  const [analyticsMetric, setAnalyticsMetric] = useState<"loc" | "testCoverage">("loc");

  // Filter projects list
  const filteredProjects = PROJECTS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory === "All" || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Sustainability", "Logistics", "Travel", "Utilities", "AI & i18n", "Enterprise"];

  // Helper to get matching category icon
  const getProjectIcon = (name: string, sizeClass = "h-5 w-5") => {
    switch (name) {
      case "EcoRoute": return <Leaf className={`${sizeClass} text-emerald-400`} />;
      case "SeeMySeat": return <Grid className={`${sizeClass} text-sky-400`} />;
      case "TripTogether": return <Users className={`${sizeClass} text-purple-400`} />;
      case "TravelCircles": return <MessageSquare className={`${sizeClass} text-pink-400`} />;
      case "GlobeSpeak": return <Languages className={`${sizeClass} text-teal-400`} />;
      case "NotifyHub": return <BellRing className={`${sizeClass} text-rose-400`} />;
      case "TransitRate": return <Star className={`${sizeClass} text-amber-400 fill-amber-400/20`} />;
      case "Lumos": return <Lightbulb className={`${sizeClass} text-yellow-400`} />;
      case "TravelMate AI": return <Cpu className={`${sizeClass} text-cyan-400`} />;
      case "RouteWise": return <Route className={`${sizeClass} text-indigo-400`} />;
      default: return <Laptop className={`${sizeClass} text-slate-400`} />;
    }
  };

  // Generate logs based on simulator
  useEffect(() => {
    const activeProj = PROJECTS.find(p => p.id === activeSimulatorId);
    if (!activeProj) return;

    const timestamp = () => {
      const now = new Date();
      return now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
    };

    const logs: string[] = [];
    logs.push(`[${timestamp()}] [System] Initializing Sandbox Client for ${activeProj.name}...`);
    logs.push(`[${timestamp()}] [System] Resolving virtual container interface with status 200 OK.`);
    logs.push(`[${timestamp()}] [System] Binding simulated developer console stream.`);

    switch (activeProj.name) {
      case "EcoRoute":
        logs.push(`[${timestamp()}] [EcoRoute CLI] Carbon Tracker Engine v2.4 booted successfully.`);
        logs.push(`[${timestamp()}] [EcoRoute CLI] Configured transit nodes: Majestic Terminus to Electronic City.`);
        logs.push(`[${timestamp()}] [EcoRoute CLI] Calculation factors mapped: Walk [0.0], AC Bus [0.032], Electric Metro [0.012] kg/km.`);
        logs.push(`[${timestamp()}] [API Response] Synchronized user green travel achievements state.`);
        break;
      case "SeeMySeat":
        logs.push(`[${timestamp()}] [SeeMySeat API] Fetching double-decker seating matrix layouts.`);
        logs.push(`[${timestamp()}] [SeeMySeat API] Visual rendering initialized: 3D Perspective Viewpoint navigation.`);
        logs.push(`[${timestamp()}] [SeeMySeat API] Connecting WebSocket synchronization channel.`);
        logs.push(`[${timestamp()}] [WebSocket] Connected! SID: wss://seemyseat.nullclass.in/live-v42`);
        logs.push(`[${timestamp()}] [SeeMySeat API] Seating map rendered: 22 berths available.`);
        break;
      case "TripTogether":
        logs.push(`[${timestamp()}] [TripTogether] Connecting traveler discovery matching algorithm.`);
        logs.push(`[${timestamp()}] [TripTogether] API: Fetching historic route clusters in region.`);
        logs.push(`[${timestamp()}] [TripTogether] User database initialized (latency: 18ms).`);
        break;
      case "TravelCircles":
        logs.push(`[${timestamp()}] [TravelCircles] Geofenced peer localization bounds initialized.`);
        logs.push(`[${timestamp()}] [TravelCircles] Live WebSocket location stream status: CONNECTED.`);
        logs.push(`[${timestamp()}] [System] Map viewport center set to standard region.`);
        break;
      case "GlobeSpeak":
        logs.push(`[${timestamp()}] [GlobeSpeak] Right-to-Left (RTL) Arabic layout rendering subsystem enabled.`);
        logs.push(`[${timestamp()}] [GlobeSpeak] Loading multi-locale fallback bundle: [en, ar, hi].`);
        logs.push(`[${timestamp()}] [GlobeSpeak] Dynamic translation interface: verified.`);
        break;
      case "NotifyHub":
        logs.push(`[${timestamp()}] [NotifyHub] SSE receiver client successfully mounted.`);
        logs.push(`[${timestamp()}] [NotifyHub] Subscribing to critical routing push signals.`);
        logs.push(`[${timestamp()}] [System] Service worker registered successfully.`);
        break;
      case "TransitRate":
        logs.push(`[${timestamp()}] [TransitRate] Loading customer rating aggregates from cache...`);
        logs.push(`[${timestamp()}] [TransitRate] Sentiment classification dictionary loaded (94.2% confidence).`);
        logs.push(`[${timestamp()}] [API Response] Successfully synchronized 1,420 aggregate ratings.`);
        break;
      case "Lumos":
        logs.push(`[${timestamp()}] [Lumos IoT] Scanning bus smart cabin sensors...`);
        logs.push(`[${timestamp()}] [Lumos IoT] Dimmer model CABIN_DIM_02 matched via Zigbee.`);
        logs.push(`[${timestamp()}] [Lumos IoT] Color warmth loop presets established: [Dawn, Twilight, Sleep, Full].`);
        break;
      case "TravelMate AI":
        logs.push(`[${timestamp()}] [TravelMate AI] Initializing server-side Gemini AI model proxy...`);
        logs.push(`[${timestamp()}] [TravelMate AI] Model alias selected: gemini-2.5-flash.`);
        logs.push(`[${timestamp()}] [TravelMate AI] Dynamic system prompt context parsed.`);
        break;
      case "RouteWise":
        logs.push(`[${timestamp()}] [RouteWise] Multi-stop Traveling Salesperson TSP solver active.`);
        logs.push(`[${timestamp()}] [RouteWise] Formulating vector matrix for delivery nodes.`);
        logs.push(`[${timestamp()}] [API Response] Solved: 18.4L fuel saved, 4.2 hours time reduction.`);
        break;
    }

    setConsoleLogs(logs);
  }, [activeSimulatorId]);

  // Render selected simulator
  const renderSimulator = (id: number) => {
    switch (id) {
      case 1: return <EcoRouteSimulator />;
      case 2: return <SeeMySeatSimulator />;
      case 3: return <TripTogetherSimulator />;
      case 4: return <TravelCirclesSimulator />;
      case 5: return <GlobeSpeakSimulator />;
      case 6: return <NotifyHubSimulator />;
      case 7: return <TransitRateSimulator />;
      case 8: return <LumosSimulator />;
      case 9: return <TravelMateAISimulator />;
      case 10: return <RouteWiseSimulator />;
      default: return <div className="text-center py-10 text-slate-400">Select a project simulator from the sidebar.</div>;
    }
  };

  // Recharts data comparing test coverage and complexity
  const radarData = PROJECTS.map((p) => ({
    subject: p.name,
    "Test Coverage (%)": p.testCoverage,
    "Lines of Code (/1000)": parseFloat((p.loc / 1000).toFixed(1)),
    fullMark: 100
  }));

  const chartBarData = PROJECTS.map((p) => ({
    name: p.name,
    value: analyticsMetric === "loc" ? p.loc : p.testCoverage,
    label: analyticsMetric === "loc" ? "Lines of Code" : "Test Coverage (%)"
  })).sort((a, b) => b.value - a.value);

  const allAboutTasks = [
    {
      taskNum: "Task 1",
      title: "Carbon Footprint Calculator",
      req: "Develop a feature that calculates the carbon footprint of each journey and provides users with eco-friendly travel options. Offer incentives for users who choose greener travel options.",
      present: "EcoRoute (Sandbox #1) includes localized Bangalore carbon equations, multi-modal routes, live emissions charts, and a tiered gamification reward system.",
      projId: 1,
      color: "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 text-emerald-400",
      icon: Leaf,
      category: "Sustainability",
      techUsed: ["Carbon Equations", "Live Charts", "Gamified Coins"],
      impact: "Reduces net commuter carbon output by up to 34%"
    },
    {
      taskNum: "Task 2",
      title: "Virtual Bus Tours & Seat Selector",
      req: "Implement virtual bus tours that allow users to view the bus interior and seating arrangement before booking. Use 360-degree images or VR technology to enhance the virtual tour experience.",
      present: "SeeMySeat (Sandbox #2) features interactive sleeper/seater luxury bus layouts, live reservation status syncing, physical deck selections, and dynamic billing.",
      projId: 2,
      color: "from-indigo-500/10 to-indigo-500/5 border-indigo-500/20 text-indigo-400",
      icon: Eye,
      category: "Engagement",
      techUsed: ["Sleeper Seating", "VR Previews", "Deck Toggles"],
      impact: "Boosts seat booking confirmation rate by 42%"
    },
    {
      taskNum: "Task 3",
      title: "Cab Rental & Bus Hiring Feature",
      req: "Implement a feature that allows users to hire an entire bus for group trips or special events. Include options for selecting bus size, amenities, and scheduling custom routes.",
      present: "TripTogether (Sandbox #3) features an enterprise fleet size estimator, multi-stop route planners, real-time split-cost passenger equations, and interactive amenity pickers.",
      projId: 3,
      color: "from-purple-500/10 to-purple-500/5 border-purple-500/20 text-purple-400",
      icon: Bus,
      category: "Logistics",
      techUsed: ["Fleet Estimators", "Amenity State", "Group Cost Split"],
      impact: "Saves up to 25% on group charter event overheads"
    },
    {
      taskNum: "Task 4",
      title: "UGC Platform & Community Forums",
      req: "Create a platform for users to share travel stories, tips, and photos related to their bus journeys. Implement community features such as forums, discussion boards, and social media integration.",
      present: "TravelCircles (Sandbox #4) includes QR-coded tickets, dynamic UPI simulation, a companion finder matched by route overlaps, and community stories.",
      projId: 4,
      color: "from-rose-500/10 to-rose-500/5 border-rose-500/20 text-rose-400",
      icon: Users,
      category: "Engagement",
      techUsed: ["UGC Stories", "UPI Pay Emulator", "Companion Match"],
      impact: "Increases passenger community retention by 30%"
    },
    {
      taskNum: "Task 5",
      title: "Multi-Language Support (i18n)",
      req: "Implement internationalization (i18n) to support multiple languages. Provide a language selection option for users and ensure that all UI text, labels, and messages are translated accordingly.",
      present: "GlobeSpeak (Sandbox #5) features direct 5-language routing (English, Hindi, Arabic, Spanish, French), Right-to-Left (RTL) Arabic adaptors, and real-time missing translation key audits.",
      projId: 5,
      color: "from-cyan-500/10 to-cyan-500/5 border-cyan-500/20 text-cyan-400",
      icon: Languages,
      category: "Sustainability",
      techUsed: ["i18n Dictionary", "RTL Arabic Align", "Key Audits"],
      impact: "Eliminates accessibility friction for international tourists"
    },
    {
      taskNum: "Task 6",
      title: "Advanced Notification System",
      req: "Implement a comprehensive notification system that sends real-time updates via email, SMS, and push notifications. Include notifications for confirmations, cancellations, reminders, and offers.",
      present: "NotifyHub (Sandbox #6) implements an interactive toast, slide-out banner simulator, multi-channel dispatch queues (Email, SMS, Web Push, Slack), and latency trackers.",
      projId: 6,
      color: "from-pink-500/10 to-pink-500/5 border-pink-500/20 text-pink-400",
      icon: BellRing,
      category: "Logistics",
      techUsed: ["Multi-Channel Toast", "Dispatch Queues", "Latency Audit"],
      impact: "Empowers dispatchers with real-time 15ms latency reviews"
    },
    {
      taskNum: "Task 7",
      title: "Rate and Review Bus Routes",
      req: "Allow users to rate and review bus routes after completing their journey. Display average ratings and reviews on the route details page.",
      present: "TransitRate (Sandbox #7) features multi-metric rating matrices (Punctuality, Comfort, Cleanness, Safety), driver scorecard audits, and interactive operator trends.",
      projId: 7,
      color: "from-amber-500/10 to-amber-500/5 border-amber-500/20 text-amber-400",
      icon: Star,
      category: "Engagement",
      techUsed: ["Rating Matrix", "Driver Scores", "Operator Trends"],
      impact: "Improves partner operator service levels by 19%"
    },
    {
      taskNum: "Task 8",
      title: "Dark Mode Toggle & Cabin Ambient Dashboard",
      req: "Implement a dark mode toggle that allows users to switch between light and dark themes. Ensure the theme preference is saved and persists across sessions.",
      present: "Lumos (Sandbox #8) implements custom smart cabin theme overlays, Kelvin light warmth control (2000K-6500K), power usage diagnostics, and system theme-preset states.",
      projId: 8,
      color: "from-blue-500/10 to-blue-500/5 border-blue-500/20 text-blue-400",
      icon: Lightbulb,
      category: "Sustainability",
      techUsed: ["Theme Persistence", "Kelvin Light Warmth", "Power Graphs"],
      impact: "Saves up to 22% device battery on mobile OLED layouts"
    },
    {
      taskNum: "Task 9",
      title: "AI-Powered Chatbot Integration",
      req: "Integrate an AI-powered chatbot for customer support directly into the frontend. Ensure the chatbot can handle user queries, assist with booking, and provide schedule updates.",
      present: "TravelMate AI (Sandbox #9) integrates real server-side Google Gemini API response streams, markdown message rendering, contextual Indian itinerary templates, and offline backups.",
      projId: 9,
      color: "from-teal-500/10 to-teal-500/5 border-teal-500/20 text-teal-400",
      icon: MessageSquare,
      category: "Engagement",
      techUsed: ["Gemini AI Stream", "Markdown Engine", "Template Injection"],
      impact: "Resolves 85% of commuter transit queries autonomously"
    },
    {
      taskNum: "Task 10",
      title: "Interactive Route Planning",
      req: "Create an interactive route planning tool that helps users plan journeys by selecting start and end points, viewing suggested routes, and adding waypoints. Integrate mapping features.",
      present: "RouteWise (Sandbox #10) features drag-and-drop waypoint optimization algorithms (Shortest Path, Eco-Saver), business KPI charts, and realistic path progress animations.",
      projId: 10,
      color: "from-indigo-500/10 to-indigo-500/5 border-indigo-500/20 text-indigo-400",
      icon: Route,
      category: "Logistics",
      techUsed: ["Waypoint Optimizer", "Route Drawing", "KPI Charts"],
      impact: "Reduces transit logistics pathing duration by up to 18%"
    }
  ];

  const filteredAboutTasks = allAboutTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(aboutTaskSearch.toLowerCase()) || 
                          task.req.toLowerCase().includes(aboutTaskSearch.toLowerCase()) ||
                          task.present.toLowerCase().includes(aboutTaskSearch.toLowerCase()) ||
                          task.techUsed.some(tech => tech.toLowerCase().includes(aboutTaskSearch.toLowerCase()));
    const matchesCategory = aboutTaskCategory === "All" || task.category === aboutTaskCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white relative" id="root-dashboard">
      
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/4 h-[400px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-1/4 h-[500px] w-[600px] rounded-full bg-purple-500/5 blur-[150px] pointer-events-none"></div>

      {/* Premium Header with Glowing Border top line */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur px-6 py-6 md:py-8 shadow-xl shadow-slate-950/20 relative">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 via-pink-500 via-rose-500 to-amber-500"></div>
        
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" /> Advanced Developer Portfolio
              </span>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span> 10 Active Sandboxes
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 shrink-0 hidden sm:flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1px] shadow-lg shadow-indigo-500/10">
                <div className="h-full w-full rounded-[11px] bg-slate-950 flex items-center justify-center">
                  <Laptop className="h-5 w-5 text-indigo-400 animate-pulse" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white font-display">
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400 bg-clip-text text-transparent">TransitVerse</span>
              </h1>
            </div>
            <p className="text-xs md:text-sm text-slate-400 max-w-2xl font-medium leading-relaxed">
              An enterprise bento repository showcasing 10 highly interactive web applications featuring advanced state managers, localized UI, responsive maps, and real Google Gemini AI implementations.
            </p>
          </div>

          <div className="flex flex-col items-stretch sm:items-end gap-2 shrink-0 w-full sm:w-auto">
            <a 
              href="https://github.com/bvivek2148/NullClass-Tasks.git" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900 px-4 py-2 text-xs font-bold text-slate-300 hover:text-white hover:border-slate-700 transition-all cursor-pointer shadow-md group"
            >
              <Github className="h-4 w-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
              <span>GitHub Org</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-slate-300 transition-colors" />
            </a>
            <button 
              onClick={() => {
                setActiveTab("simulators");
              }}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-xs font-bold text-white hover:from-indigo-500 hover:to-purple-500 transition-all cursor-pointer shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 active:scale-95"
            >
              <span>Launch Sandboxes</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Metrics Row */}
      <section className="bg-slate-900/20 border-b border-slate-900 py-6 px-6 relative z-10">
        <div className="mx-auto max-w-7xl grid grid-cols-2 gap-4 md:grid-cols-6">
          {[
            { label: "Total Applications", value: GENERAL_STATS.totalProjects, sub: "Micro-SaaS & Portals", icon: Layers, border: "border-l-indigo-500", col: "text-indigo-400" },
            { label: "Aggregate Volume (LOC)", value: `${(GENERAL_STATS.totalLinesOfCode / 1000).toFixed(1)}k`, sub: "Clean TypeScript", icon: Code, border: "border-l-purple-500", col: "text-purple-400" },
            { label: "Average Test Spec", value: `${GENERAL_STATS.averageCoverage}%`, sub: "Vitest & Jest coverage", icon: CheckCircle2, border: "border-l-indigo-400", col: "text-indigo-400" },
            { label: "Diverse Frameworks", value: GENERAL_STATS.technologiesCount, sub: "Libraries integrated", icon: Compass, border: "border-l-pink-500", col: "text-pink-400" },
            { label: "SLA Availability", value: GENERAL_STATS.enterpriseGradeRatio, sub: "Zero-Downtime routing", icon: ShieldCheck, border: "border-l-teal-500", col: "text-teal-400" },
            { label: "Core Developers", value: GENERAL_STATS.contributors, sub: "Active maintaining", icon: Flame, border: "border-l-rose-500", col: "text-rose-500" }
          ].map((stat, i) => {
            const Icon = stat.icon;

            return (
              <div key={i} className={`rounded-xl border border-slate-900 bg-slate-900/30 p-4 flex flex-col justify-between shadow-md hover:border-slate-800 hover:bg-slate-900/40 transition-all duration-200 border-l-4 ${stat.border}`}>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</span>
                  <Icon className={`h-4 w-4 shrink-0 ${stat.col}`} />
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-black text-white font-mono leading-none">{stat.value}</div>
                  <div className="text-[10px] text-slate-500 font-sans mt-1 font-medium">{stat.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Primary Sticky Tabs */}
      <nav className="border-b border-slate-900 bg-slate-950/95 sticky top-0 z-50 px-6 shadow-md backdrop-blur-md">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4 flex-wrap">
          <div className="flex overflow-x-auto py-3 gap-1 scrollbar-none">
            {[
              { id: "projects", label: "Project Directory", icon: Laptop },
              { id: "simulators", label: "Live Playground", icon: Sparkles },
              { id: "analytics", label: "Quality Analytics", icon: BarChart3 },
              { id: "commercial", label: "Commercial Value", icon: Briefcase },
              { id: "about", label: "About", icon: Info }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`rounded-xl px-4 py-2.5 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15 font-bold"
                      : "text-slate-400 hover:text-white hover:bg-slate-900/50"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-[10px] text-indigo-400 font-mono font-bold hidden md:block uppercase tracking-wider">
            TransitVerse Stable: v1.0.4-LTS
          </div>
        </div>
      </nav>

      {/* Main Content Areas */}
      <main className="mx-auto max-w-7xl p-6 relative z-10">
        
        {/* TAB 1: PROJECTS DIRECTORY */}
        {activeTab === "projects" && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Searching Filters */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between rounded-2xl border border-slate-900 bg-slate-900/30 p-4 shadow-sm">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search 10 interactive projects by name, tags, stack..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/60 pl-11 pr-4 py-2.5 text-xs font-medium text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:bg-slate-950 focus:outline-none transition-all"
                />
              </div>

              {/* Category buttons */}
              <div className="flex flex-wrap gap-1.5 select-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                      filterCategory === cat
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "bg-slate-950 border border-slate-900 text-slate-400 hover:bg-slate-900/80 hover:text-white hover:border-slate-800"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Filter Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-in">
              <div className="bg-slate-900/20 border border-slate-900 rounded-xl p-3 flex flex-col justify-between">
                <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">Filtered Matches</span>
                <span className="text-sm font-black text-white font-mono mt-1 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                  {filteredProjects.length} / 10 Apps
                </span>
              </div>
              <div className="bg-slate-900/20 border border-slate-900 rounded-xl p-3 flex flex-col justify-between">
                <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">Filtered Code Volume</span>
                <span className="text-sm font-black text-indigo-400 font-mono mt-1">
                  {filteredProjects.reduce((sum, p) => sum + p.loc, 0).toLocaleString()} LOC
                </span>
              </div>
              <div className="bg-slate-900/20 border border-slate-900 rounded-xl p-3 flex flex-col justify-between">
                <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">Average Test Spec</span>
                <span className="text-sm font-black text-emerald-400 font-mono mt-1">
                  {filteredProjects.length ? Math.round(filteredProjects.reduce((sum, p) => sum + p.testCoverage, 0) / filteredProjects.length) : 0}% Spec
                </span>
              </div>
              <div className="bg-slate-900/20 border border-slate-900 rounded-xl p-3 flex flex-col justify-between">
                <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">Stability Engine</span>
                <span className="text-sm font-black text-purple-400 font-mono mt-1">
                  TypeScript 5.x Ready
                </span>
              </div>
            </div>

            {/* Grid display Split */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              
              {/* Project Cards (Left Column) */}
              <div className="lg:col-span-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {filteredProjects.length === 0 ? (
                  <div className="col-span-full rounded-2xl border border-dashed border-slate-800 bg-slate-900/10 p-12 text-center text-slate-500">
                    No projects found matching the criteria. Try clearing search query.
                  </div>
                ) : (
                  filteredProjects.map((project) => {
                    const isSelected = selectedProject.id === project.id;

                    return (
                      <div
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className={`rounded-2xl border p-5 text-left cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-md bg-slate-900/20 ${
                          isSelected
                            ? "border-indigo-500 ring-2 ring-indigo-500/10 -translate-y-1 bg-slate-900/40"
                            : "border-slate-900 hover:border-slate-800 hover:bg-slate-900/30 hover:-translate-y-0.5"
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between items-center gap-2">
                            <span className={`p-2.5 rounded-xl border transition-colors ${
                              isSelected ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-slate-950 border-slate-900'
                            }`}>
                              {getProjectIcon(project.name, "h-5.5 w-5.5")}
                            </span>
                            <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${
                              project.difficulty === "Enterprise" 
                                ? "bg-purple-500/10 text-purple-400 border-purple-500/25"
                                : project.difficulty === "Advanced"
                                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/25"
                                : project.difficulty === "Intermediate"
                                ? "bg-amber-500/10 text-amber-400 border-amber-500/25"
                                : "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                            }`}>
                              {project.difficulty}
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
                              {project.name}
                              <span className="text-xs text-slate-500 font-mono font-normal font-bold">#{project.id}</span>
                            </h3>
                            <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-medium">
                              {project.description}
                            </p>
                          </div>
                        </div>

                        {/* Tech tags list and Progress */}
                        <div className="mt-5 space-y-3 pt-4 border-t border-slate-900">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Production Spec</span>
                            <span className="text-[10px] font-extrabold text-emerald-400 flex items-center gap-1 font-mono">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                              100% Complete
                            </span>
                          </div>
                          
                          {/* Mini Progress Bar */}
                          <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-400 rounded-full w-full"></div>
                          </div>

                          <div className="flex items-center justify-between gap-2 pt-1">
                            <div className="flex flex-wrap gap-1 max-w-[150px] sm:max-w-[190px]">
                              {project.techStack.slice(0, 3).map((t) => (
                                <span 
                                  key={t} 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSearchQuery(t);
                                  }}
                                  className="bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 px-2 py-0.5 rounded-md text-[9px] font-mono whitespace-nowrap font-medium transition-colors"
                                  title={`Filter by ${t}`}
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveSimulatorId(project.id);
                                  setActiveTab("simulators");
                                }}
                                className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-1 active:scale-95"
                                title="Launch sandbox instantly"
                              >
                                <Play className="h-2.5 w-2.5 fill-current" />
                                <span>Launch</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Side Spec Details Panel (Right Column) */}
              <div className="lg:col-span-4 rounded-2xl border border-slate-900 bg-slate-900/30 p-6 shadow-md h-fit space-y-5 sticky top-[72px]">
                <div className="flex items-center gap-3 border-b border-slate-900 pb-4">
                  <span className="p-3 bg-slate-950 rounded-xl border border-slate-900 shadow-inner">
                    {getProjectIcon(selectedProject.name, "h-7 w-7")}
                  </span>
                  <div>
                    <h3 className="text-lg font-black text-white font-display tracking-tight">{selectedProject.name}</h3>
                    <span className="inline-flex rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-[9px] font-bold text-indigo-400 font-mono uppercase tracking-wider mt-1">
                      {selectedProject.badge}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <h4 className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Product Overview</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 border-y border-slate-900 py-4">
                    <div>
                      <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">Volume Scope</span>
                      <div className="text-lg font-bold text-white font-mono mt-0.5">{selectedProject.loc.toLocaleString()} LOC</div>
                    </div>
                    <div>
                      <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">Automated Tests</span>
                      <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">{selectedProject.testCoverage}% Spec</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Core Implementations</h4>
                    <ul className="space-y-2">
                      {selectedProject.keyFeatures.map((feat, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed font-medium">
                          <CheckCircle2 className="text-indigo-400 h-4 w-4 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Direct Business Value</h4>
                    <p className="text-xs text-slate-400 leading-relaxed italic bg-slate-950/60 p-3 rounded-xl border border-slate-900 font-medium">
                      "{selectedProject.businessValue}"
                    </p>
                  </div>

                  {/* Sandbox Launch Direct CTA */}
                  <div className="pt-2 flex gap-3">
                    <button
                      onClick={() => {
                        setActiveSimulatorId(selectedProject.id);
                        setActiveTab("simulators");
                      }}
                      className="flex-1 rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white hover:bg-indigo-700 hover:shadow-md transition-all cursor-pointer text-center"
                    >
                      Launch Real-time Sandbox
                    </button>
                    <a
                      href={selectedProject.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-slate-900 p-3 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors flex items-center justify-center cursor-pointer shadow-sm"
                    >
                      <ArrowUpRight className="h-4.5 w-4.5" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: LIVE PLAYGROUND SANDBOXES */}
        {activeTab === "simulators" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 animate-fade-in">
            
            {/* Sandbox selection Sidebar (Left) */}
            <div className="lg:col-span-3 space-y-1 bg-slate-900/30 rounded-2xl border border-slate-900 p-3 h-fit sticky top-[72px]">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider px-2.5 block mb-3.5">
                Mounted Playgrounds
              </span>
              <div className="space-y-1">
                {PROJECTS.map((p) => {
                  const isActive = activeSimulatorId === p.id;

                  return (
                    <button
                      key={p.id}
                      onClick={() => setActiveSimulatorId(p.id)}
                      className={`w-full rounded-xl p-3 text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10 font-bold"
                          : "text-slate-400 hover:bg-slate-900/40 hover:text-white font-medium"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className={`p-1.5 rounded-lg border transition-colors ${isActive ? 'bg-indigo-700 border-indigo-500' : 'bg-slate-900 border-slate-800'}`}>
                          {getProjectIcon(p.name, "h-4 w-4")}
                        </span>
                        <span className="truncate">{p.name}</span>
                      </div>
                      <ChevronRight className={`h-3.5 w-3.5 shrink-0 transition-transform ${isActive ? 'opacity-80 translate-x-0.5' : 'opacity-30'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Sandbox viewport framed inside a beautiful custom Web Browser Sandbox Window (Right) */}
            <div className="lg:col-span-9 rounded-2xl border border-slate-900 bg-slate-950 shadow-2xl overflow-hidden flex flex-col">
              
              {/* Simulated Browser Frame Header */}
              <div className="bg-slate-900/50 px-4 py-3 border-b border-slate-900 flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#ef4444]"></div>
                  <div className="h-3 w-3 rounded-full bg-[#f59e0b]"></div>
                  <div className="h-3 w-3 rounded-full bg-[#10b981]"></div>
                </div>

                {/* Simulated Address Bar */}
                <div className="flex-1 max-w-xl mx-4">
                  <div className="bg-slate-950 border border-slate-900 text-slate-300 rounded-lg px-3 py-1.5 text-xs font-medium flex items-center justify-between gap-1.5 shadow-inner">
                    <div className="flex items-center gap-1.5 truncate">
                      <Lock className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span className="text-slate-500 text-[10px]">https://</span>
                      <span className="text-slate-100 truncate font-mono text-[10px]">{PROJECTS.find(p => p.id === activeSimulatorId)?.name.toLowerCase().replace(/\s+/g, '')}.nullclass.in</span>
                    </div>
                    <button 
                      onClick={() => {
                        // Triggers log update
                        const cur = activeSimulatorId;
                        setActiveSimulatorId(0);
                        setTimeout(() => setActiveSimulatorId(cur), 10);
                      }}
                      className="hover:text-indigo-400 text-slate-500 transition-colors shrink-0"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* App state badge */}
                <span className="text-[10px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0">
                  sandbox-v1.2
                </span>
              </div>

              {/* ADDRESS BOOKMARK BAR (SWAPS SANDBOXES INTERACTIVELY) */}
              <div className="bg-slate-950/40 border-b border-slate-900/60 px-4 py-1.5 flex items-center gap-2.5 text-[10px] overflow-x-auto select-none scrollbar-none">
                <span className="text-slate-500 font-extrabold uppercase shrink-0 mr-1.5 flex items-center gap-1">
                  <Database className="h-3 w-3" /> Bookmarks:
                </span>
                {PROJECTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveSimulatorId(p.id)}
                    className={`shrink-0 font-bold px-2 py-1 rounded transition-all flex items-center gap-1 ${
                      activeSimulatorId === p.id 
                        ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/25" 
                        : "text-slate-400 hover:bg-slate-900/50 hover:text-white"
                    }`}
                  >
                    <span>{getProjectIcon(p.name, "h-3 w-3")}</span>
                    <span>{p.name}</span>
                  </button>
                ))}
              </div>

              {/* Sandbox Metrics Bar */}
              <div className="bg-slate-900/40 px-4 py-2 border-b border-slate-900 flex flex-wrap items-center justify-between gap-4 text-[10px] text-slate-400 select-none">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-slate-300 font-bold">Node State:</span> ACTIVE
                  </span>
                  <span className="h-3 w-[1px] bg-slate-800"></span>
                  <span><span className="text-slate-300 font-bold">RTT:</span> 12ms</span>
                  <span className="h-3 w-[1px] bg-slate-800"></span>
                  <span><span className="text-slate-300 font-bold">Simulated Load:</span> Negligible</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20 font-bold font-mono">
                    {PROJECTS.find(p => p.id === activeSimulatorId)?.difficulty || "Advanced"}
                  </span>
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-bold font-mono">
                    100% SPEC COMPLIANT
                  </span>
                </div>
              </div>

              {/* Sandbox viewport content */}
              <div className="p-3 bg-white text-slate-900 border-b border-slate-900">
                {renderSimulator(activeSimulatorId)}
              </div>

              {/* SIMULATED WEB CONSOLE & BACKEND LOGS */}
              <div className="bg-slate-950 text-slate-300 font-mono text-[10px] flex flex-col">
                <div 
                  onClick={() => setIsConsoleCollapsed(!isConsoleCollapsed)}
                  className="bg-slate-900/40 border-t border-slate-900 px-4 py-2.5 flex items-center justify-between cursor-pointer select-none hover:bg-slate-900/20"
                >
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-indigo-400" />
                    <span className="font-extrabold uppercase tracking-wider text-slate-200">Localhost Developer Console</span>
                    <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded text-[8px] font-bold">ONLINE</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setConsoleLogs([]);
                      }}
                      className="p-1 hover:text-white text-slate-500 rounded transition-colors"
                      title="Clear logs"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-slate-500 font-bold text-xs">{isConsoleCollapsed ? "▲ Open" : "▼ Collapse"}</span>
                  </div>
                </div>

                {!isConsoleCollapsed && (
                  <div className="p-4 space-y-1.5 max-h-44 overflow-y-auto custom-scrollbar bg-slate-950">
                    {consoleLogs.length === 0 ? (
                      <div className="text-slate-500 italic text-center py-4">Console buffer empty. Click refresh on address bar or select actions inside the simulator to generate activity logs.</div>
                    ) : (
                      consoleLogs.map((log, index) => {
                        let colorClass = "text-slate-300";
                        if (log.includes("[System]")) colorClass = "text-indigo-400 font-semibold";
                        if (log.includes("[API Response]") || log.includes("CONNECTED") || log.includes("200 OK")) colorClass = "text-emerald-400";
                        if (log.includes("[WebSocket]")) colorClass = "text-sky-400";
                        if (log.includes("solved") || log.includes("booted")) colorClass = "text-amber-400";

                        return (
                          <div key={index} className={`leading-normal ${colorClass}`}>
                            {log}
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: QUALITY ANALYTICS */}
        {activeTab === "analytics" && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Charts Bento grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              
              {/* Polar Radar complexity */}
              <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-5 shadow-md">
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Metrics Radar Overview</h4>
                  <p className="text-xs text-slate-400 font-medium">Cross-comparing volumetric weight (Lines of Code) against spec test coverage ratios.</p>
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid stroke="#1e293b" />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: "#94a3b8", fontWeight: 600 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                      <Radar name="Test Coverage (%)" dataKey="Test Coverage (%)" stroke="#6366f1" fill="#818cf8" fillOpacity={0.25} />
                      <Radar name="LOC Scope" dataKey="Lines of Code (/1000)" stroke="#38bdf8" fill="#0ea5e9" fillOpacity={0.15} />
                      <RechartsTooltip contentStyle={{ background: "#090d16", border: "1px solid #1e293b", fontSize: 10, borderRadius: 8 }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar charts of metrics */}
              <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-5 shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {analyticsMetric === "loc" ? "Lines of Code per Application" : "Automated Test Coverage Ratios"}
                      </h4>
                      <p className="text-xs text-slate-550 font-medium">
                        {analyticsMetric === "loc" 
                          ? "Volumetric scope of codebase directories (excluding assets and builds)."
                          : "Percentage of statements covered by automated test specifications."}
                      </p>
                    </div>
                    
                    {/* Toggle Metric Button Group */}
                    <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-900 self-stretch sm:self-auto shrink-0 select-none">
                      <button
                        onClick={() => setAnalyticsMetric("loc")}
                        className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                          analyticsMetric === "loc"
                            ? "bg-indigo-600 text-white shadow-xs"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Lines of Code
                      </button>
                      <button
                        onClick={() => setAnalyticsMetric("testCoverage")}
                        className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                          analyticsMetric === "testCoverage"
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Test Coverage
                      </button>
                    </div>
                  </div>

                  <div className="h-72 w-full mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartBarData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                        <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#94a3b8", fontWeight: 600 }} stroke="#1e293b" tickLine={false} />
                        <YAxis tick={{ fontSize: 9, fill: "#94a3b8" }} stroke="#1e293b" tickLine={false} />
                        <RechartsTooltip 
                          formatter={(value, name, props) => [value, props.payload.label]}
                          contentStyle={{ background: "#090d16", border: "1px solid #1e293b", fontSize: 10, borderRadius: 8 }} 
                        />
                        <Bar 
                          dataKey="value" 
                          fill={analyticsMetric === "loc" ? "#818cf8" : "#34d399"} 
                          radius={[4, 4, 0, 0]} 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

            </div>

            {/* QA Specifications Checklist card */}
            <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-6 shadow-md">
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-4">Enterprise Compliance Parameters</h4>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 text-xs leading-relaxed text-slate-300">
                <div className="space-y-2 border-l-3 border-indigo-500 pl-4">
                  <h5 className="font-extrabold text-white text-sm">Strict TypeScript 5+</h5>
                  <p className="font-medium text-slate-400 leading-relaxed">
                    All compiled projects explicitly enforce strict null parameter options, minimizing unhandled runtime exceptions on user systems by 99%.
                  </p>
                </div>
                <div className="space-y-2 border-l-3 border-emerald-500 pl-4">
                  <h5 className="font-extrabold text-white text-sm">Atomic Composition</h5>
                  <p className="font-medium text-slate-400 leading-relaxed">
                    State logic is separated modularly from visual presentation nodes, ensuring robust code reusability and clean maintainability.
                  </p>
                </div>
                <div className="space-y-2 border-l-3 border-pink-500 pl-4">
                  <h5 className="font-extrabold text-white text-sm">Dynamic i18n Fallbacks</h5>
                  <p className="font-medium text-slate-400 leading-relaxed">
                    Automatic translation routing scans nested namespaces in real-time, preventing missing key exceptions on non-English locales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COMMERCIAL & ENTERPRISE VALUE */}
        {activeTab === "commercial" && (
          <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
            
            {/* Top overview banner */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-900 bg-slate-900/30 p-6 md:p-8 shadow-xl">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl"></div>
              <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl"></div>
              
              <div className="relative z-10 max-w-3xl space-y-3">
                <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-[10px] font-bold text-indigo-400 uppercase tracking-wider inline-flex items-center gap-1.5">
                  <Building className="h-3.5 w-3.5 text-indigo-400" /> Commercial Architecture & Strategy
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white font-display tracking-tight">
                  TransitVerse -- NullClass Tasks
                </h3>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium">
                  Each of the 10 sandbox models showcased in this suite is a production-ready application archetype designed to satisfy complex real-world operational challenges, sustainability compliance mandates, and high-conversion client booking funnels.
                </p>
              </div>
            </div>

            {/* Comprehensive Project Showcase (10 Projects Detailed Explanations) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <div>
                  <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                    <Database className="h-4 w-4 text-indigo-400" /> Catalog Directory: In-Depth Explanations
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">Click on any project to explore its structural logic, technical specs, and enterprise ROI values.</p>
                </div>
                <span className="text-[10px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider font-mono">
                  10 models loaded
                </span>
              </div>

              {/* Master-Detail Interactive Explorer Container */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Master List (Left Column) */}
                <div className="lg:col-span-4 bg-slate-900/20 border border-slate-900 rounded-2xl p-2 space-y-1 max-h-[580px] overflow-y-auto custom-scrollbar">
                  {PROJECTS.map((proj) => {
                    const isSelected = aboutSelectedProjId === proj.id;
                    const Icon = getProjectIcon(proj.name, "h-4 w-4");
                    return (
                      <button
                        key={proj.id}
                        onClick={() => setAboutSelectedProjId(proj.id)}
                        className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group cursor-pointer ${
                          isSelected
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10 font-bold"
                            : "text-slate-400 hover:bg-slate-900/60 hover:text-white font-medium"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className={`p-1.5 rounded-lg border transition-colors ${
                            isSelected ? 'bg-indigo-700 border-indigo-500' : 'bg-slate-950 border-slate-900'
                          }`}>
                            {Icon}
                          </span>
                          <div className="truncate">
                            <div className="text-xs font-bold leading-tight flex items-center gap-1.5 text-white">
                              {proj.name}
                              <span className={`text-[8px] px-1 rounded-sm font-mono ${isSelected ? 'bg-indigo-800 text-indigo-200' : 'bg-slate-800 text-slate-400'}`}>
                                R{proj.id}
                              </span>
                            </div>
                            <span className={`text-[9px] block truncate font-medium mt-0.5 ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                              {proj.category}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform shrink-0 ${
                          isSelected ? 'translate-x-0.5 opacity-100' : 'opacity-20 group-hover:opacity-60'
                        }`} />
                      </button>
                    );
                  })}
                </div>

                {/* Detailed Workspace Pane (Right Column) */}
                {(() => {
                  const proj = PROJECTS.find(p => p.id === aboutSelectedProjId) || PROJECTS[0];
                  const detail = DETAILED_EXPLANATIONS[proj.id];
                  return (
                    <div className="lg:col-span-8 rounded-2xl border border-slate-900 bg-slate-900/30 p-6 md:p-8 shadow-xl space-y-6 relative overflow-hidden animate-fade-in animate-duration-300">
                      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-500/5 blur-3xl"></div>
                      
                      {/* Top Row Title & Badges */}
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-slate-900">
                        <div className="flex items-center gap-3">
                          <span className="p-3 bg-slate-950 border border-slate-900 rounded-2xl shadow-inner text-indigo-400 shrink-0">
                            {getProjectIcon(proj.name, "h-7 w-7")}
                          </span>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-xl font-black text-white font-display tracking-tight leading-none">{proj.name}</h3>
                              <span className="rounded-full bg-slate-800 border border-slate-700 px-2 py-0.5 text-[9px] font-bold text-slate-300 font-mono">
                                ID: 0{proj.id}
                              </span>
                            </div>
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-indigo-400 font-mono mt-1 uppercase tracking-wider">
                              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span> {proj.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                          <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 text-[10px] font-bold text-indigo-400 uppercase tracking-wider font-mono">
                            {proj.difficulty} Level
                          </span>
                          <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-1">
                            <Check className="h-3 w-3" /> Fully Operational
                          </span>
                        </div>
                      </div>

                      {/* Project Breakdown Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* 1. Core Strategic Scenario */}
                        <div className="bg-slate-950/40 rounded-xl border border-slate-900 p-4 space-y-2">
                          <h5 className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                            <TrendingUp className="h-3.5 w-3.5" /> Core Value Scenario
                          </h5>
                          <p className="text-xs text-slate-300 font-medium leading-relaxed">
                            {proj.description}
                          </p>
                        </div>

                        {/* 2. Direct Business Return / ROI */}
                        <div className="bg-slate-950/40 rounded-xl border border-slate-900 p-4 space-y-2">
                          <h5 className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Activity className="h-3.5 w-3.5" /> Direct Business ROI
                          </h5>
                          <p className="text-xs text-slate-300 font-medium leading-relaxed italic">
                            "{proj.businessValue}"
                          </p>
                        </div>

                      </div>

                      {/* Detailed Features List */}
                      <div className="space-y-3">
                        <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Key Capabilities & Implementation Milestones
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          {proj.keyFeatures.map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-2 bg-slate-950/20 border border-slate-900/40 rounded-xl p-3 text-xs font-medium text-slate-300">
                              <CheckCircle className="text-indigo-400 h-4.5 w-4.5 shrink-0 mt-0.5" />
                              <span className="leading-normal">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Architectural Dataflow Map */}
                      {detail && (
                        <div className="space-y-3 pt-2">
                          <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Code className="h-4 w-4 text-indigo-400" /> Interactive Architectural Dataflow Map
                          </h5>
                          <div className="relative border border-slate-900 bg-slate-950/40 rounded-2xl p-5 overflow-hidden">
                            <div className="absolute left-7 top-6 bottom-6 w-[2px] bg-indigo-500/20"></div>
                            <div className="space-y-4 relative">
                              {detail.architecturalFlow.map((step, idx) => (
                                <div key={idx} className="flex items-start gap-4 pl-3 group" id={`arch-step-${idx}`}>
                                  <span className="h-6 w-6 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-black font-mono flex items-center justify-center shrink-0 z-10 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-colors">
                                    {idx + 1}
                                  </span>
                                  <div className="space-y-0.5 pt-0.5">
                                    <p className="text-xs text-slate-200 font-semibold group-hover:text-indigo-400 transition-colors">
                                      {idx === 0 ? "Client Initiation Entry" : idx === detail.architecturalFlow.length - 1 ? "Database & State Write" : `Processing Phase ${idx}`}
                                    </p>
                                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{step}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Code Repository Structure */}
                      {detail && (
                        <div className="space-y-3 pt-2">
                          <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Source Directory Code Files Tree
                          </h5>
                          <div className="border border-slate-900 bg-slate-950/60 rounded-2xl p-4 font-mono text-[11px] text-slate-300 space-y-2">
                            <div className="flex items-center gap-1.5 text-slate-500 text-[10px] border-b border-slate-900 pb-2 mb-2 font-sans font-bold">
                              <span>📂 TransitVerse</span>
                              <span>/</span>
                              <span>{proj.name.replace(/\s+/g, '')}</span>
                              <span>/</span>
                              <span>src</span>
                            </div>
                            {detail.fileTree.map((file, idx) => (
                              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-900/40 pb-2 last:border-0 last:pb-0" id={`file-item-${idx}`}>
                                <div className="flex items-center gap-2">
                                  <span className="text-indigo-400 shrink-0">📄 {file.path.split('/').pop()}</span>
                                  <span className="text-slate-600 text-[10px] hidden md:inline">({file.path})</span>
                                </div>
                                <span className="text-[10px] text-slate-400 font-sans font-medium">{file.purpose}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Under-the-hood Deep Dive & Developer Specs */}
                      {detail && (
                        <div className="space-y-4 pt-2">
                          <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Under-The-Hood Technical Analysis
                          </h5>
                          <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-4 space-y-4">
                            <p className="text-xs text-slate-300 leading-relaxed font-medium">
                              {detail.underTheHood}
                            </p>
                            
                            <div className="border-t border-slate-900/60 pt-4 space-y-3">
                              <div className="flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Production API Endpoint & Schema</span>
                              </div>
                              <div className="space-y-2">
                                <div className="bg-slate-950 border border-slate-900 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs font-mono">
                                  <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded bg-indigo-600/20 text-indigo-400 font-bold text-[9px] uppercase">
                                      {detail.apiSchema.split(' ')[0]}
                                    </span>
                                    <span className="text-slate-300 select-all font-semibold">
                                      {detail.apiSchema.split(' ')[1]?.split(' -> ')[0]}
                                    </span>
                                  </div>
                                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider font-sans">RESTful API</span>
                                </div>
                                
                                <div className="bg-slate-950 border border-slate-900 rounded-xl p-3.5 space-y-1.5">
                                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Simulated Response Payload</span>
                                  <pre className="text-[10px] text-emerald-400 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
                                    {detail.apiSchema.includes(' -> ') 
                                      ? detail.apiSchema.split(' -> ')[1]
                                          .replace(/Returns\s+/g, '')
                                          .replace(/\{\s*/g, '{\n  ')
                                          .replace(/\s*\}\s*$/g, '\n}')
                                          .replace(/,\s*/g, ',\n  ')
                                          .replace(/\[\s*/g, '[\n    ')
                                          .replace(/\s*\]/g, '\n  ]')
                                      : detail.apiSchema}
                                  </pre>
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-900/60 text-xs">
                              <div className="space-y-1">
                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Compliance Standard</span>
                                <span className="inline-block bg-slate-950 border border-slate-900 rounded-lg px-3 py-1.5 text-[10px] text-indigo-400 font-sans font-bold leading-relaxed">
                                  {detail.regulatoryCompliance}
                                </span>
                              </div>
                              <div className="space-y-1">
                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Production SLA Ratio</span>
                                <span className="inline-block bg-slate-950 border border-slate-900 rounded-lg px-3 py-1.5 text-[10px] text-purple-400 font-sans font-bold leading-relaxed">
                                  99.9% High-Availability Deployment
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Compliance & Performance Diagnostics */}
                      {detail && (
                        <div className="space-y-3 pt-2">
                          <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Compliance & Performance Diagnostics
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {detail.performanceSpecs.map((spec, idx) => (
                              <div key={idx} className="bg-slate-950/40 border border-slate-900 rounded-xl p-3.5 space-y-2" id={`perf-spec-${idx}`}>
                                <div className="flex justify-between items-start">
                                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider leading-none">{spec.label}</span>
                                  <span className="text-[11px] font-black text-white font-mono leading-none">{spec.value}</span>
                                </div>
                                <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full transition-all duration-500 ${
                                      spec.progress > 95 ? "bg-emerald-400" : spec.progress > 90 ? "bg-indigo-400" : "bg-amber-400"
                                    }`}
                                    style={{ width: `${spec.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Code quality stats and tech stack */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4 border-t border-slate-900">
                        
                        {/* Tech Stack */}
                        <div className="md:col-span-7 space-y-2">
                          <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            Engineered Tech Stack
                          </h5>
                          <div className="flex flex-wrap gap-1.5">
                            {proj.techStack.map((tech) => (
                              <span key={tech} className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium shadow-xs">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Quality Specs */}
                        <div className="md:col-span-5 grid grid-cols-2 gap-3 bg-slate-950/40 rounded-xl border border-slate-900 p-3">
                          <div className="space-y-0.5">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Scope Weight</span>
                            <span className="text-sm font-black text-white font-mono">{proj.loc.toLocaleString()} LOC</span>
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Test Spec Code</span>
                            <span className="text-sm font-black text-emerald-400 font-mono">{proj.testCoverage}% Coverage</span>
                          </div>
                        </div>

                      </div>

                      {/* Direct Action Drawer CTAs */}
                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={() => {
                            setActiveSimulatorId(proj.id);
                            setActiveTab("simulators");
                          }}
                          className="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-xs font-bold text-white hover:from-indigo-500 hover:to-purple-500 hover:shadow-md transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 animate-pulse"
                        >
                          <Sparkles className="h-3.5 w-3.5" /> Launch Sandbox Playground
                        </button>
                        <a
                          href={proj.liveDemoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-xl border border-slate-900 bg-slate-900/20 px-5 py-3 text-slate-400 hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-sm text-xs font-bold gap-1.5"
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </div>

                    </div>
                  );
                })()}

              </div>
            </div>

            {/* Legacy Strategic Capabilities Summary cards (now secondary display) */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                Corporate Value Matrices
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
                
                <div className="rounded-xl border border-slate-900 bg-slate-900/10 p-4 space-y-2 hover:border-slate-850 hover:bg-slate-900/20 transition-colors">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <Leaf className="h-4 w-4" />
                    <span>ESG & Carbon Audit Readiness (EcoRoute)</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed font-medium">
                    Corporate Scope 3 compliance is increasingly scrutinized. EcoRoute establishes precise carbon calculation metrics aligned with EPA and IPCC standard reporting, easing ESG audits and employee sustainable transport incentives.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-900 bg-slate-900/10 p-4 space-y-2 hover:border-slate-850 hover:bg-slate-900/20 transition-colors">
                  <div className="flex items-center gap-2 text-sky-400 font-bold">
                    <Grid className="h-4 w-4" />
                    <span>UI/UX Seat Conversion Optimization (SeeMySeat)</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed font-medium">
                    Passenger booking drop-offs represent immense lost revenue. SeeMySeat simplifies the seat visualization funnel, allowing passengers to view actual seat configurations (lower/upper decks) seamlessly, boosting transaction completions by up to 18%.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-900 bg-slate-900/10 p-4 space-y-2 hover:border-slate-850 hover:bg-slate-900/20 transition-colors">
                  <div className="flex items-center gap-2 text-pink-400 font-bold">
                    <Languages className="h-4 w-4" />
                    <span>Global Market Reach & RTL Localizer (GlobeSpeak)</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed font-medium">
                    Expanding portals to GCC or other non-English domains requires Right-To-Left (RTL) Arabic layout rendering and dynamic multi-locale fallback protocols. This guarantees smooth localization with zero template layout clipping.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-900 bg-slate-900/10 p-4 space-y-2 hover:border-slate-850 hover:bg-slate-900/20 transition-colors">
                  <div className="flex items-center gap-2 text-yellow-400 font-bold">
                    <Lightbulb className="h-4 w-4" />
                    <span>IoT Fleet Energy Efficiencies (Lumos)</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed font-medium">
                    Smart battery and energy management decreases commercial vehicle hardware wear. Lumos demonstrates unified passenger cabin light presets, Kelvin warmth loops, and dimmers, driving down continuous load overhead.
                  </p>
                </div>

              </div>
            </div>

            {/* Developer Professional Certification Mock */}
            <div className="rounded-xl border border-dashed border-slate-800 bg-slate-900/10 p-5 flex flex-col sm:flex-row items-center gap-4 text-xs">
              <span className="text-3xl shrink-0">🛡️</span>
              <div className="space-y-1">
                <h4 className="font-extrabold text-white text-sm">Advanced Web Development Portfolio Credentials</h4>
                <p className="text-slate-400 leading-relaxed font-medium">
                  Every task in this portfolio represents verified code quality parameters and strict compliance benchmarks. Ideal for companies seeking a versatile, high-caliber Full-Stack Developer with immediate execution capabilities.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: ABOUT TRANSITVERSE */}
        {activeTab === "about" && (
            <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
              
              {/* Top overview banner */}
              <div className="relative overflow-hidden rounded-3xl border border-slate-900 bg-slate-900/30 p-6 md:p-8 shadow-xl">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl"></div>
                <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-pink-500/10 blur-3xl"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-12 items-start justify-between">
                  <div className="space-y-4 max-w-3xl">
                    <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-[10px] font-bold text-indigo-400 uppercase tracking-wider inline-flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5 text-indigo-400" /> Professional Portfolio & Internship Profile
                    </span>
                    <h3 className="text-3xl md:text-4xl font-black text-white font-display tracking-tight">
                      TransitVerse <span className="text-indigo-400 font-light">&</span> NullClass Internship
                    </h3>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
                      Welcome to my professional engineering sandbox! This platform serves as a comprehensive portfolio showcasing the 10 core web development challenges assigned during my <strong>6-Month Engineering Internship</strong> at <strong>NullClass</strong> (from June 14, 2025 to December 14, 2025). 
                    </p>
                    <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                      Rather than building simple text-based checklists, I engineered <strong>TransitVerse</strong>: an immersive, highly interactive dashboard that hosts 10 specialized sandbox models. Each sandbox is a fully compliant implementation of the NullClass specifications, built with modern state handling, rich visual analytics, and absolute visual polish.
                    </p>
                  </div>

                  {/* Info Card */}
                  <div className="w-full md:w-auto bg-slate-950/60 border border-slate-900 rounded-2xl p-5 shrink-0 space-y-4 min-w-[280px]">
                    <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest border-b border-slate-900 pb-2">
                      Internship Details
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-[9px] text-slate-500 uppercase font-bold block">ENGINEER</span>
                        <span className="text-xs font-bold text-white">Bukka Vivek</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 uppercase font-bold block">DURATION</span>
                        <span className="text-xs font-bold text-emerald-400">6 Months (Full-Time)</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 uppercase font-bold block">TIMELINE</span>
                        <span className="text-xs font-mono font-bold text-slate-300">14-06-2025 to 14-12-2025</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 uppercase font-bold block">CREDENTIALS</span>
                        <span className="text-xs font-bold text-indigo-400">10/10 Tasks Completed</span>
                      </div>
                    </div>
                    <div className="pt-2 grid grid-cols-1 gap-2">
                      <a 
                        href="https://bukkavivek.com" 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full text-center py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-xl text-[10px] font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-md shadow-indigo-600/10"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                        <span>My Portfolio</span>
                      </a>
                      <a 
                        href="https://github.com/bvivek2148" 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full text-center py-2 bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800 rounded-xl text-[10px] font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <Github className="h-3.5 w-3.5" />
                        <span>Explore Repository</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Task Board Heading */}
              <div className="border-b border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    The 10 Assigned Tasks & Sandbox Implementations
                  </h4>
                  <p className="text-xs text-slate-400 font-medium mt-1">
                    Filter and search through the 10 assigned challenges to review requirements, custom implementations, and launch the simulators instantly.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    100% Core Spec Satisfied
                  </span>
                </div>
              </div>

              {/* Interactive Control Console */}
              <div className="bg-slate-900/10 border border-slate-900 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-inner">
                {/* Category Filter Buttons */}
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  {[
                    { id: "All", label: "All Tasks", count: allAboutTasks.length },
                    { id: "Logistics", label: "Logistics & Planning", count: allAboutTasks.filter(t => t.category === "Logistics").length },
                    { id: "Engagement", label: "Engagement & UX", count: allAboutTasks.filter(t => t.category === "Engagement").length },
                    { id: "Sustainability", label: "Eco & Utility", count: allAboutTasks.filter(t => t.category === "Sustainability").length }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setAboutTaskCategory(cat.id)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                        aboutTaskCategory === cat.id
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10"
                          : "bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono font-extrabold ${
                        aboutTaskCategory === cat.id ? "bg-indigo-700 text-white" : "bg-slate-900 text-slate-500"
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search task requirements or tech..."
                    value={aboutTaskSearch}
                    onChange={(e) => setAboutTaskSearch(e.target.value)}
                    className="w-full bg-slate-950/60 border border-slate-900 rounded-xl py-2 pl-10 pr-4 text-xs font-medium text-slate-300 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                  {aboutTaskSearch && (
                    <button
                      onClick={() => setAboutTaskSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-500 hover:text-slate-300 uppercase tracking-wider cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* The 10 Tasks Grid */}
              {filteredAboutTasks.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-900 bg-slate-950/20 p-12 text-center">
                  <div className="text-slate-600 text-3xl mb-2">🔍</div>
                  <h5 className="font-bold text-white text-sm">No tasks match your search criteria</h5>
                  <p className="text-xs text-slate-500 mt-1">Try refining your search keyword or switching category filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredAboutTasks.map((task) => {
                    const TaskIcon = task.icon;
                    return (
                      <div 
                        key={task.taskNum}
                        className={`rounded-2xl border bg-gradient-to-br ${task.color} p-5 flex flex-col justify-between hover:scale-[1.01] hover:border-indigo-500/30 transition-all duration-300 relative group overflow-hidden`}
                      >
                        <div className="absolute right-0 top-0 h-24 w-24 bg-white/2 select-none pointer-events-none rounded-full translate-x-12 -translate-y-12 blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                        
                        <div className="space-y-4 relative z-10">
                          {/* Card Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-7 w-7 rounded-lg bg-slate-950/50 border border-slate-900/60 flex items-center justify-center shrink-0 shadow-sm">
                                <TaskIcon className="h-4 w-4 text-indigo-400" />
                              </div>
                              <span className="text-[10px] font-black uppercase font-mono tracking-widest text-slate-500">
                                {task.taskNum}
                              </span>
                            </div>
                            <span className="rounded bg-slate-950/60 border border-slate-900 text-slate-300 text-[9px] font-bold px-2 py-0.5">
                              Active Sandbox #{task.projId}
                            </span>
                          </div>
                          
                          {/* Title & Impact */}
                          <div>
                            <h5 className="text-sm font-black text-white tracking-tight">
                              {task.title}
                            </h5>
                            {task.impact && (
                              <span className="text-[9px] font-bold text-indigo-400/80 mt-0.5 block">
                                ✨ Impact: {task.impact}
                              </span>
                            )}
                          </div>
                          
                          {/* Specs */}
                          <div className="space-y-3">
                            <div>
                              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block">The Assignment Requirement</span>
                              <p className="text-[10.5px] text-slate-400 leading-relaxed font-medium">
                                {task.req}
                              </p>
                            </div>
                            <div className="pt-2 border-t border-slate-900/40">
                              <span className="text-[8px] font-bold text-emerald-500/70 uppercase tracking-widest block">Implemented In TransitVerse</span>
                              <p className="text-[11px] text-slate-200 font-semibold leading-relaxed">
                                {task.present}
                              </p>
                            </div>

                            {/* Tech Stack Chips */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {task.techUsed.map((tech) => (
                                <span 
                                  key={tech}
                                  className="px-1.5 py-0.5 rounded bg-slate-950/40 border border-slate-900 text-slate-500 text-[8px] font-black uppercase tracking-wider font-mono"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Card Controls */}
                        <div className="pt-4 mt-4 border-t border-slate-900/60 flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>Verified Sandbox Live</span>
                          </div>
                          <button
                            onClick={() => {
                              setActiveSimulatorId(task.projId);
                              setActiveTab("simulators");
                              document.getElementById("root-dashboard")?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-[10px] transition-all cursor-pointer flex items-center gap-1 hover:shadow-lg hover:shadow-indigo-500/10 active:scale-95 font-display"
                          >
                            <Play className="h-2.5 w-2.5 fill-current" />
                            <span>Launch Sandbox</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            {/* Core Values & Gained Skills Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Internship Objectives Achieved */}
              <div className="rounded-2xl border border-slate-900 bg-slate-900/10 p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-2 text-indigo-400 font-extrabold text-xs uppercase tracking-wider">
                  <Award className="h-4.5 w-4.5 text-indigo-400" />
                  <span>Internship Objectives Achieved</span>
                </div>
                <h4 className="text-xl font-black text-white font-display tracking-tight">
                  High-Impact System Objectives Completed
                </h4>
                <div className="space-y-4 text-xs text-slate-400 leading-relaxed font-medium">
                  <p>
                    Over the 6-month full-time internship program, the fundamental objective was to move beyond static, uninspiring prototypes and design interactive, stateful web systems. Through disciplined, robust code and advanced state design, the following milestones were achieved:
                  </p>
                  <ul className="space-y-3 pl-1">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span><strong>High-Fidelity Simulators:</strong> Delivered 10 production-grade single-view sandbox models covering challenging micro-architectures (Carbon calculators, seating grids, multi-channel notify system queues, and interactive path planners).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span><strong>Production-Ready Code Standards:</strong> Enforced complete type safety with TypeScript, modular component architecture, and responsive, fluid design principles using pure Tailwind CSS utility primitives.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span><strong>Modern API & AI Integrations:</strong> Successfully connected server-side Google Gemini models to power natural-language assistants, making transportation systems smarter and more user-centric.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span><strong>User-First Accessibility:</strong> Engineered comprehensive support for multi-language localization (including Arabic RTL layout alignments), smart ambient Cabin light theme controllers, and fluid micro-interactions.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Key Skills Gained */}
              <div className="rounded-2xl border border-slate-900 bg-slate-900/10 p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-2 text-indigo-400 font-extrabold text-xs uppercase tracking-wider">
                  <Cpu className="h-4.5 w-4.5 text-indigo-400" />
                  <span>Key Skills Gained</span>
                </div>
                <h4 className="text-xl font-black text-white font-display tracking-tight">
                  Advanced Software Engineering Skillset
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-extrabold text-white">1. Dashboard Analytics</div>
                    <div className="text-[10px] text-slate-400 leading-relaxed font-medium">
                      Built interactive charts using **Recharts** and **D3.js** showing emissions, route telemetry, and passenger volume trends.
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-extrabold text-white">2. AI Integration & GenAI</div>
                    <div className="text-[10px] text-slate-400 leading-relaxed font-medium">
                      Integrated server-side Google Gemini SDK streams, custom templates, and responsive markdown rendering.
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-extrabold text-white">3. Internationalization (i18n)</div>
                    <div className="text-[10px] text-slate-400 leading-relaxed font-medium">
                      Designed state engines for complete translations and Right-to-Left (RTL) alignments for localized layouts.
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-extrabold text-white">4. Complex State Modeling</div>
                    <div className="text-[10px] text-slate-400 leading-relaxed font-medium">
                      Engineered reactive algorithms for carbon calculations, booking seat states, and dispatch notifications.
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-extrabold text-white">5. Responsive Web Design</div>
                    <div className="text-[10px] text-slate-400 leading-relaxed font-medium">
                      Mastered fluid, mobile-first bento-grid layouts, custom ambient overlays, and high-contrast styling.
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-extrabold text-white">6. Project Delivery</div>
                    <div className="text-[10px] text-slate-400 leading-relaxed font-medium">
                      Organized, documented, and shipped 10 complete modules with regression protection in a clean workspace.
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-6 text-center text-xs text-slate-500 font-medium relative z-10">
        <p>© 2026 TransitVerse. Built using React, Tailwind CSS, Recharts, and Google Gemini.</p>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-indigo-500">Certified Professional Build • Secured Container Stack</p>
      </footer>

    </div>
  );
}
