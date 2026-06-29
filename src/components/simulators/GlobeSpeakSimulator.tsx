import { useState } from "react";
import { 
  Languages, 
  HelpCircle, 
  CheckCircle, 
  Search, 
  AlertCircle, 
  RefreshCw, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  ChevronRight,
  FileText,
  Zap,
  LayoutGrid,
  ArrowLeft,
  Settings,
  Activity,
  Globe
} from "lucide-react";

// ==================== TYPES & CONSTANTS ====================

interface Dictionary {
  welcome: string;
  bookNow: string;
  searchPlaceholder: string;
  statusActive: string;
  passengerCount: string;
  carbonSaved: string;
  backHome: string;
  farePrice: string;
  checkoutTitle: string;
}

const LOCALES: Record<string, { name: string; dir: "ltr" | "rtl"; code: string; flag: string; data: Dictionary }> = {
  en: {
    name: "English (US)",
    dir: "ltr",
    code: "en-US",
    flag: "🇺🇸",
    data: {
      welcome: "Welcome back, adventurer!",
      bookNow: "Secure Seat Reservation",
      searchPlaceholder: "Search routes, cities, or transit codes...",
      statusActive: "Transit Operator Online",
      passengerCount: "Co-Passenger Count",
      carbonSaved: "Calculated Carbon Saved",
      backHome: "Return to Main Dashboard",
      farePrice: "Total fare calculated:",
      checkoutTitle: "Unified Checkout Summary"
    }
  },
  hi: {
    name: "हिन्दी (India)",
    dir: "ltr",
    code: "hi-IN",
    flag: "🇮🇳",
    data: {
      welcome: "वापसी पर आपका स्वागत है, यात्री!",
      bookNow: "सीट आरक्षण सुरक्षित करें",
      searchPlaceholder: "मार्ग, शहर या पारगमन कोड खोजें...",
      statusActive: "पारगमन संचालक सक्रिय",
      passengerCount: "सह-यात्री संख्या",
      carbonSaved: "परिकलित कार्बन बचत",
      backHome: "मुख्य डैशबोर्ड पर लौटें",
      farePrice: "कुल परिकलित किराया:",
      checkoutTitle: "एकीकृत चेकआउट सारांश"
    }
  },
  ar: {
    name: "العربية (RTL - Arabic)",
    dir: "rtl",
    code: "ar-AE",
    flag: "🇦🇪",
    data: {
      welcome: "مرحباً بعودتك، أيها المغامر!",
      bookNow: "تأمين حجز المقعد",
      searchPlaceholder: "ابحث عن المسارات، المدن، أو الرموز...",
      statusActive: "مشغل النقل متصل الآن",
      passengerCount: "عدد الركاب المرافقين",
      carbonSaved: "الكربون الذي تم توفيره",
      backHome: "العودة إلى لوحة القيادة",
      farePrice: "إجمالي الأجرة المحتسبة:",
      checkoutTitle: "ملخص الدفع الموحد"
    }
  },
  fr: {
    name: "Français (France)",
    dir: "ltr",
    code: "fr-FR",
    flag: "🇫🇷",
    data: {
      welcome: "Bon retour, aventurier!",
      bookNow: "Sécuriser la Réservation",
      searchPlaceholder: "Rechercher des trajets, villes...",
      statusActive: "Opérateur de transport actif",
      passengerCount: "Nombre de passagers",
      carbonSaved: "Émissions de CO₂ Évitées",
      backHome: "Retour au tableau de bord",
      farePrice: "Tarif total calculé:",
      checkoutTitle: "Résumé des paiements unifié"
    }
  },
  es: {
    name: "Español (Spain)",
    dir: "ltr",
    code: "es-ES",
    flag: "🇪🇸",
    data: {
      welcome: "¡Bienvenido de nuevo, viajero!",
      bookNow: "Asegurar Reserva de Asiento",
      searchPlaceholder: "Buscar rutas, ciudades o códigos...",
      statusActive: "Operador de tránsito activo",
      passengerCount: "Cantidad de pasajeros",
      carbonSaved: "Carbono Ahorrado Estimado",
      backHome: "Volver al panel principal",
      farePrice: "Tarifa total calculada:",
      checkoutTitle: "Resumen de pago unificado"
    }
  }
};

const DIAGNOSTICS_KEYS = [
  { key: "dashboard.welcome", en: "✅ translated", hi: "✅ translated", ar: "✅ translated", status: "Healthy" },
  { key: "booking.seater_premium", en: "✅ translated", hi: "✅ translated", ar: "⚠️ fallback to EN", status: "Missing Translation" },
  { key: "tracker.co2_formula", en: "✅ translated", hi: "⚠️ missing key", ar: "⚠️ fallback to EN", status: "Missing Translation" },
  { key: "notification.sms_sent", en: "✅ translated", hi: "✅ translated", ar: "✅ translated", status: "Healthy" },
  { key: "lumos.kelvin_warmth", en: "✅ translated", hi: "⚠️ missing key", ar: "⚠️ missing key", status: "Critical Action Required" }
];

export default function GlobeSpeakSimulator() {
  const [currentLocale, setCurrentLocale] = useState<string>("en");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  
  // Interactive Live input translation check
  const [customWord, setCustomWord] = useState("Search flights");
  const [customWordTranslated, setCustomWordTranslated] = useState("");

  const activeLocale = LOCALES[currentLocale] || LOCALES.en;
  const dict = activeLocale.data;
  const dir = activeLocale.dir;

  const triggerDiagnosticScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult("i18n Code Audit completed: 3 translation namespace keys are missing. Fallback routing automatically resolved.");
    }, 1200);
  };

  const handleTranslateOnTheFly = () => {
    if (!customWord.trim()) return;
    const word = customWord.toLowerCase().trim();
    if (currentLocale === "hi") {
      if (word.includes("search")) setCustomWordTranslated("खोजें");
      else if (word.includes("flight") || word.includes("bus")) setCustomWordTranslated("यात्रा");
      else setCustomWordTranslated("अनुवादित पाठ");
    } else if (currentLocale === "ar") {
      if (word.includes("search")) setCustomWordTranslated("ابحث");
      else if (word.includes("flight") || word.includes("bus")) setCustomWordTranslated("رحلات");
      else setCustomWordTranslated("النص المترجم");
    } else if (currentLocale === "fr") {
      if (word.includes("search")) setCustomWordTranslated("Rechercher");
      else if (word.includes("flight") || word.includes("bus")) setCustomWordTranslated("Voyage");
      else setCustomWordTranslated("Texte traduit");
    } else if (currentLocale === "es") {
      if (word.includes("search")) setCustomWordTranslated("Buscar");
      else if (word.includes("flight") || word.includes("bus")) setCustomWordTranslated("Vuelo");
      else setCustomWordTranslated("Texto traducido");
    } else {
      setCustomWordTranslated(customWord);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-xl flex flex-col font-sans" id="globespeak-browser">
      
      {/* ==================== BROWSER CHROME HEADER ==================== */}
      <div className="bg-zinc-100 px-4 py-3 border-b border-zinc-200 flex items-center gap-3 select-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-rose-400 block border border-rose-500/20"></span>
          <span className="w-3 h-3 rounded-full bg-amber-400 block border border-amber-500/20"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-400 block border border-emerald-500/20"></span>
        </div>
        <div className="flex-1 bg-white rounded-lg px-3 py-1 text-[11px] font-medium text-zinc-400 flex items-center gap-1.5 border border-zinc-200 font-mono">
          <span className="text-zinc-300">https://</span>
          <span className="text-zinc-600 font-bold">globespeak.transit-tech.com</span>
        </div>
        <span className="text-[10px] font-bold text-teal-600 px-2 uppercase tracking-wide shrink-0 bg-teal-50 border border-teal-200/50 rounded py-0.5">GlobeSpeak Engine</span>
      </div>

      {/* ==================== WEBSITE VIEWPORT ==================== */}
      <div className="bg-zinc-50 overflow-auto max-h-[85vh] relative text-zinc-800">
        
        {/* Navigation Bar */}
        <header className="bg-white border-b border-zinc-200/80 px-6 py-4 sticky top-0 z-40 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
              <Languages className="text-white h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-zinc-950 tracking-tight text-base font-sans">GlobeSpeak</span>
              <span className="text-[9px] bg-teal-50 text-teal-700 font-bold px-1.5 py-0.5 rounded ml-1.5 uppercase tracking-wider">i18n Gateway</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-zinc-500">
            <span className="text-zinc-800 font-black border-b-2 border-teal-600 pb-1">Translation Matrix</span>
            <span className="hover:text-teal-600 cursor-pointer">Localization Auditing</span>
          </div>
        </header>

        {/* Workspace Arena */}
        <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Panel: Locales Selector */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white border border-zinc-200 rounded-3xl p-4 space-y-3 shadow-sm text-xs font-semibold">
              <h3 className="font-extrabold text-zinc-950 border-b border-zinc-100 pb-1.5 flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-teal-600" /> Active i18n Locales
              </h3>
              
              <div className="grid grid-cols-1 gap-2 select-none">
                {Object.keys(LOCALES).map(key => {
                  const loc = LOCALES[key];
                  const isSelected = currentLocale === key;
                  return (
                    <button
                      key={key}
                      onClick={() => { setCurrentLocale(key); setCustomWordTranslated(""); }}
                      className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected 
                          ? "border-teal-600 bg-teal-50/50 text-teal-850" 
                          : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl shrink-0">{loc.flag}</span>
                        <span className="font-bold text-[11px] truncate">{loc.name}</span>
                      </div>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono ${isSelected ? "bg-teal-600 text-white" : "bg-zinc-100 text-zinc-400"}`}>{loc.code}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Center Column: Interactive Dynamic UI Preview Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Interactive boarding card in current language */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 space-y-4 shadow-sm text-xs font-semibold relative">
              <span className="absolute top-4 right-4 rounded-xl bg-zinc-900 px-3 py-1.5 text-[8px] font-bold text-white font-mono tracking-widest border border-zinc-850">
                DYNAMIC UI PREVIEW
              </span>
              
              <div>
                <h3 className="font-extrabold text-zinc-950 text-xs">Simulated App Form</h3>
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Reflects locale text & orientation</p>
              </div>

              {/* Dynamic LTR / RTL orientation card */}
              <div 
                className="bg-zinc-50 rounded-2xl p-4 border border-zinc-150 space-y-4"
                dir={dir}
              >
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <h4 className="font-black text-zinc-900 text-sm">{dict.welcome}</h4>
                  <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-bold">{dict.statusActive}</span>
                </div>

                {/* Input Search box placeholder localization */}
                <div className="relative">
                  <Search className={`absolute top-2.5 h-4 w-4 text-zinc-400 ${dir === "rtl" ? "right-3" : "left-3"}`} />
                  <input 
                    type="text" 
                    placeholder={dict.searchPlaceholder}
                    disabled
                    className={`w-full bg-white border border-zinc-200 rounded-lg py-2 text-xs focus:outline-none disabled:opacity-80 font-bold ${dir === "rtl" ? "pr-9 pl-3 text-right" : "pl-9 pr-3 text-left"}`} 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-[10px] font-bold text-zinc-500 border-t border-zinc-200/60 pt-3">
                  <div>
                    <span className="text-zinc-400 block text-[8px] uppercase">{dict.passengerCount}</span>
                    <span className="text-zinc-800">4 companions</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[8px] uppercase">{dict.carbonSaved}</span>
                    <span className="text-emerald-600 font-mono">-14.2 kg CO₂</span>
                  </div>
                </div>

                <button className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-xl text-[10px] tracking-wide shadow text-center block">
                  {dict.bookNow}
                </button>
              </div>
            </div>

            {/* Live sandbox Translate check */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm space-y-4 text-xs font-semibold">
              <div>
                <h3 className="font-extrabold text-zinc-950 text-xs">On-The-Fly Localizer Sandbox</h3>
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Test real-time word overrides</p>
              </div>

              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={customWord}
                  onChange={(e) => setCustomWord(e.target.value)}
                  className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-teal-600 font-bold" 
                />
                <button 
                  onClick={handleTranslateOnTheFly}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-3 py-2 rounded-lg cursor-pointer"
                >
                  Localise
                </button>
              </div>

              {customWordTranslated && (
                <div className="bg-teal-50 border border-teal-100 text-teal-800 rounded-xl p-3 text-[11px] font-bold">
                  <span>Localized Output: </span>
                  <span className="text-zinc-950 font-black font-mono ml-1">{customWordTranslated}</span>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: i18n Diagnostics */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm space-y-4 text-xs font-semibold">
              <div className="border-b border-zinc-100 pb-2">
                <h3 className="font-extrabold text-zinc-950 text-xs">i18n Code Audit Diagnostics</h3>
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Automated key checklist scan</p>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-[11px]">
                {DIAGNOSTICS_KEYS.map((item, idx) => (
                  <div key={idx} className="p-2 border border-zinc-100 rounded-xl bg-zinc-50/50 space-y-1">
                    <div className="flex justify-between font-bold">
                      <span className="font-mono text-zinc-600 text-[10px] truncate max-w-[140px]">{item.key}</span>
                      <span className={`text-[8px] px-1.5 py-0.5 rounded uppercase ${
                        item.status === "Healthy" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700 border border-rose-100"
                      }`}>{item.status}</span>
                    </div>
                    <div className="flex justify-between text-[9px] text-zinc-400 font-medium">
                      <span>en: {item.en}</span>
                      <span>hi: {item.hi}</span>
                    </div>
                  </div>
                ))}
              </div>

              {scanResult && (
                <div className="p-3 bg-amber-50 border border-amber-100 text-amber-800 rounded-xl text-[10px] leading-normal font-bold">
                  {scanResult}
                </div>
              )}

              <button
                onClick={triggerDiagnosticScan}
                disabled={isScanning}
                className="w-full bg-zinc-900 hover:bg-zinc-850 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Scanning Code namespaces...</span>
                  </>
                ) : (
                  <>
                    <Settings className="h-4 w-4" />
                    <span>Run i18n Code Audit</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
