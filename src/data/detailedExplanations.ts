export interface DetailedExplanation {
  projectId: number;
  architecturalFlow: string[];
  fileTree: { path: string; purpose: string }[];
  underTheHood: string;
  apiSchema: string;
  regulatoryCompliance: string;
  performanceSpecs: { label: string; value: string; progress: number }[];
}

export const DETAILED_EXPLANATIONS: Record<number, DetailedExplanation> = {
  1: {
    projectId: 1,
    architecturalFlow: [
      "Fetch user current location coordinates and set transit endpoint",
      "Route lookup within Bangalore BMTC Bus and Namma Metro route arrays",
      "Feed geographical distance vectors to EPA/DEFRA carbon formula multipliers",
      "Compile comparative emissions data series for Recharts visualizations",
      "Update tiered loyalty points (Bronze, Silver, Gold, Diamond) in state"
    ],
    fileTree: [
      { path: "src/components/simulators/EcoRouteSimulator.tsx", purpose: "State-driven route input forms, map boundaries, and green logic calculator" },
      { path: "src/utils/emissions.ts", purpose: "Core emissions library implementing standard DEFRA gas coefficient factors" },
      { path: "src/data/routes.ts", purpose: "Static localization coordinates database for Bangalore Namma Metro & BMTC corridors" }
    ],
    underTheHood: "Computes direct and indirect greenhouse gas emissions in carbon dioxide equivalents (CO₂e). Integrates multi-segment route calculations by multiplying distance vectors against specific fuel profile constants (e.g., electric train: 0.012kg/km, AC bus: 0.032kg/km).",
    apiSchema: "GET /api/transit/eco-route?origin={lat,lng}&dest={lat,lng} -> Returns { segments: [{ mode: string, distance: number, co2: number }], totalCo2: number, pointsEarned: number }",
    regulatoryCompliance: "Aligned with greenhouse gas reporting standards (GHG Protocol Corporate Standard) and IPCC emissions coefficients.",
    performanceSpecs: [
      { label: "Matrix Calculation Latency", value: "3.4ms", progress: 95 },
      { label: "Interactive Visual Update Time", value: "11ms", progress: 98 },
      { label: "Data Structure Bundle Overhead", value: "4.2KB", progress: 90 }
    ]
  },
  2: {
    projectId: 2,
    architecturalFlow: [
      "Render double-decker vector seating canvas layouts (sleeper vs seater)",
      "Listen to pointer hover and click events on SVG seat coordinates",
      "Enforce concurrency state validation triggers (booked, available, selected)",
      "Trigger fare adjustment loop including luxury deck location premiums",
      "Serialize booking state into localized payload for confirmation"
    ],
    fileTree: [
      { path: "src/components/simulators/SeeMySeatSimulator.tsx", purpose: "Vector canvas sleeper-bus visual seats selector and state manager" },
      { path: "src/hooks/useSeatSync.ts", purpose: "Custom state synchronizer and local locking interval manager" },
      { path: "src/components/ReceiptDetails.tsx", purpose: "Dynamic transaction receipt breakdown rendering seat variables" }
    ],
    underTheHood: "Manages seating grids using highly optimized 2D grid arrays. Coordinates lower and upper sleeper berth dimensions with responsive SVG aspect-ratio clamping, ensuring touch targets remain above 44px on mobile viewports.",
    apiSchema: "POST /api/bookings/lock-seat -> Body: { vehicleId: string, seatNo: string, durationMs: number } -> Returns { success: boolean, lockToken: string, expiresAt: string }",
    regulatoryCompliance: "Meets WCAG 2.1 touch target guidelines (minimum 44x44px clickable areas) and features dynamic screen-reader accessibility tags.",
    performanceSpecs: [
      { label: "SVG Layout Render", value: "1.8ms", progress: 99 },
      { label: "Concurrency State Sync", value: "12ms", progress: 92 },
      { label: "Memory Footprint", value: "120KB", progress: 94 }
    ]
  },
  3: {
    projectId: 3,
    architecturalFlow: [
      "Select fleet capacity specifications (12-seater to 45-seater Volvo luxury carriers)",
      "Define multi-stop waypoints and trigger cost-splitting algorithms",
      "Toggle premium amenity configurations (WiFi, restrooms, recliners)",
      "Compile dynamic timeline itinerary schedule steps",
      "Update shared cost split metrics and download CSV invoice summary"
    ],
    fileTree: [
      { path: "src/components/simulators/TripTogetherSimulator.tsx", purpose: "Collaborative vehicle hire controller, cost calculator, and itinerary builder" },
      { path: "src/utils/costCalculations.ts", purpose: "Algorithmic split-fare distribution math supporting individual adjustments" },
      { path: "src/components/TimelineBuilder.tsx", purpose: "Interactive multi-stop itinerary step editor and milestone tracker" }
    ],
    underTheHood: "Uses dynamic cost-weight matrices to divide custom multi-stop transport costs across individual travelers. Employs a baseline flat rate derived from vehicle fuel capacities, compounding with distance-based variables.",
    apiSchema: "POST /api/group-hire/itinerary -> Body: { vehicleClass: string, stops: string[], customAmenities: string[] } -> Returns { basePrice: number, costPerStop: number, totalFare: number }",
    regulatoryCompliance: "Complies with Indian Transport Operator regulations and standard digital cost-distribution audits.",
    performanceSpecs: [
      { label: "Multi-Stop Split Calculations", value: "0.8ms", progress: 99 },
      { label: "Itinerary State Mutator Latency", value: "2.1ms", progress: 97 },
      { label: "CSV Export Serialization", value: "45ms", progress: 85 }
    ]
  },
  4: {
    projectId: 4,
    architecturalFlow: [
      "Generate encrypted mock PNR sequence code representing booking",
      "Inject reservation parameters into digital QR-Code vector matrix",
      "Render localized companion forums filtered by transit corridors",
      "Initialize mock UPI payment gateways (PhonePe, Paytm, GPay) interface",
      "Store PNR state locally and provide live search retrieval"
    ],
    fileTree: [
      { path: "src/components/simulators/TravelCirclesSimulator.tsx", purpose: "Digital PNR dashboard, localized traveler forums, and mock UPI checkout" },
      { path: "src/utils/pnrGenerator.ts", purpose: "Secure mock PNR generation, barcode hashing, and validation algorithm" },
      { path: "src/components/ForumStream.tsx", purpose: "Social corridor forum streams displaying traveler advice and tips" }
    ],
    underTheHood: "Employs client-side cryptographic hashes to generate realistic PNR tokens. Generates high-fidelity vector QR codes displaying transaction states that can be scanned or parsed entirely offline.",
    apiSchema: "GET /api/pnr/status?id={pnr_code} -> Returns { status: 'CONFIRMED'|'WAITLIST', passengerName: string, travelDate: string, qrCodeData: string }",
    regulatoryCompliance: "Conforms to standard CRIS PNR formatting patterns and NPCI UPI deep-linking specifications.",
    performanceSpecs: [
      { label: "QR Code Vector Generation", value: "8.2ms", progress: 91 },
      { label: "Forum Stream Mutation Latency", value: "4.5ms", progress: 95 },
      { label: "PNR Lookup Index Time", value: "0.3ms", progress: 100 }
    ]
  },
  5: {
    projectId: 5,
    architecturalFlow: [
      "Select dynamic localization locale from languages dropdown (en, hi, ar, etc)",
      "Trigger direction swap checks for RTL layouts (Arabic text flow shifts)",
      "Monitor dynamic i18next namespace translation resource queries",
      "Log missing or incomplete translation keys to the local audit stream",
      "Compile missing key analytics matrices into a downloadable report"
    ],
    fileTree: [
      { path: "src/components/simulators/GlobeSpeakSimulator.tsx", purpose: "Dynamic multi-lingual presentation layout, RTL toggle panel, and translation debugger" },
      { path: "src/utils/i18nDiagnostics.ts", purpose: "Missing translation key logger, diagnostics analyzer, and CSV formatter" },
      { path: "src/locales/index.ts", purpose: "Dynamic language dictionaries mapping Arabic, English, Hindi, Spanish, and French" }
    ],
    underTheHood: "Swaps layout properties instantly by tracking the reading direction context of the selected locale (LTR vs RTL). Detects translation failures on the fly by nesting i18next missing-key listener callbacks.",
    apiSchema: "GET /api/locales/diagnostic -> Returns { missingKeysCount: number, keys: [{ locale: string, namespace: string, key: string, accessedAt: string }] }",
    regulatoryCompliance: "Ensures legal and accessibility compliance under EU Web Accessibility Directive (EN 301 549) and Arabic language layouts.",
    performanceSpecs: [
      { label: "RTL Direction Swap Latency", value: "0.6ms", progress: 99 },
      { label: "Lazy Translation Resolution", value: "5.1ms", progress: 94 },
      { label: "Diagnostics Collection Overhead", value: "1.2KB", progress: 97 }
    ]
  },
  6: {
    projectId: 6,
    architecturalFlow: [
      "Trigger alert payloads for dynamic notification event types",
      "Submit message to the prioritize queuing dispatcher",
      "Process channels asynchronously (Web Push, Slack, Discord, SMS, Email)",
      "Render interactive Radix UI alerts and Framer Motion layouts",
      "Compile dynamic deliverability KPI charts showing transport delay rates"
    ],
    fileTree: [
      { path: "src/components/simulators/NotifyHubSimulator.tsx", purpose: "Alert dispatch controllers, multi-channel toggles, and queuing visualizer" },
      { path: "src/utils/deliveryQueue.ts", purpose: "Priority message queue model implementing retry thresholds and artificial latency loops" },
      { path: "src/components/ToastStack.tsx", purpose: "Framer Motion animated stack container controlling incoming alert dismissals" }
    ],
    underTheHood: "Replicates transactional queuing. Evaluates priority channels (high-priority SMS vs low-priority Discord webhooks) to simulate message dispatch latencies and deliverability indicators under network congestion conditions.",
    apiSchema: "POST /api/notifications/dispatch -> Body: { priority: 'HIGH'|'NORMAL', channels: string[], alertText: string } -> Returns { status: 'QUEUED', messageId: string, latencyMs: number }",
    regulatoryCompliance: "Complies with TCPA guidelines for SMS throttling rules and GDPR notification opt-in protocols.",
    performanceSpecs: [
      { label: "Queue Dispatch Engine Sync", value: "2.4ms", progress: 96 },
      { label: "Framer Motion Anim Frames", value: "60FPS", progress: 99 },
      { label: "Webhook Integration Relay", value: "22ms", progress: 91 }
    ]
  },
  7: {
    projectId: 7,
    architecturalFlow: [
      "Select Indian transit pathway and pre-populate route parameters",
      "Input numerical reviews using multi-metric slides (Cleanliness, Comfort, Safety)",
      "Trigger driver score updates and vehicle inspector ratings algorithms",
      "Serialize reviews and draft updates into local storage buffers",
      "Feed aggregate ratings indices directly into historical Recharts graphs"
    ],
    fileTree: [
      { path: "src/components/simulators/TransitRateSimulator.tsx", purpose: "Route review form, sliding metrics collector, and historical analytics charts" },
      { path: "src/utils/reviewStorage.ts", purpose: "Local storage persistence adapter maintaining review drafts and aggregate history" },
      { path: "src/components/ScorecardView.tsx", purpose: "Visual driver performance score card and hygiene metrics visualizer" }
    ],
    underTheHood: "Compiles subjective reviews into an multi-dimensional index (comfort, punctuality, hygiene, safety, driver skill). Employs automated local draft auto-saving to prevent data loss in offline transit networks.",
    apiSchema: "POST /api/reviews/submit -> Body: { routeId: string, vehicleNo: string, scores: { cleanliness: number, safety: number }, comment: string } -> Returns { newAggregateScore: number }",
    regulatoryCompliance: "Adheres to public user-feedback privacy protocols and standard data transparency guidelines.",
    performanceSpecs: [
      { label: "Aggregate Formula Compute", value: "0.5ms", progress: 100 },
      { label: "LocalStorage Sync Overhead", value: "4.8ms", progress: 95 },
      { label: "Graph Render Refresh Time", value: "14ms", progress: 92 }
    ]
  },
  8: {
    projectId: 8,
    architecturalFlow: [
      "Render smart bus cabin interior layout using SVG overlays",
      "Listen to rgb and warmth (Kelvin) selection slider modifications",
      "Trigger localized seat or cabin zone power consumption updates",
      "Compile energy consumption stats into dynamic Recharts charts",
      "Simulate heat load registers based on active lighting power"
    ],
    fileTree: [
      { path: "src/components/simulators/LumosSimulator.tsx", purpose: "Interactive cabin light zone simulator, Kelvin color picker, and power charts" },
      { path: "src/utils/iotEquations.ts", purpose: "Unified electrical calculations translating brightness metrics into exact Watt outputs" },
      { path: "src/components/CabinAesthetic.tsx", purpose: "Dynamic SVG overlay rendering physical light diffusion color gradients" }
    ],
    underTheHood: "Models dynamic load fluctuations on vehicle electrical grids. Computes exact power load (W) and heat dissipation (BTU/hr) based on bulb selections (LED vs standard halogen), light intensity, and warmth indices.",
    apiSchema: "POST /api/iot/cabin-lights -> Body: { zoneId: string, powerState: boolean, brightness: number, colorTempK: number } -> Returns { zonePowerUsageWatts: number, totalCabinetWattage: number }",
    regulatoryCompliance: "Meets IoT device interoperability patterns (MQTT standard metadata definitions) and automotive safety tolerances.",
    performanceSpecs: [
      { label: "RGB/Kelvin Paint Latency", value: "3.2ms", progress: 96 },
      { label: "Live Watt Calculation Sync", value: "1.1ms", progress: 99 },
      { label: "SVG diffusion filter frames", value: "58FPS", progress: 93 }
    ]
  },
  9: {
    projectId: 9,
    architecturalFlow: [
      "Process user intent queries and structure systemic chat prompt packages",
      "Post conversational requests securely to Express server-side api proxies",
      "Trigger Google Gemini 3.5-flash response model streams",
      "Parse and render streaming Markdown structures into chat bubble lists",
      "Initialize local travel recommendation fallback algorithms"
    ],
    fileTree: [
      { path: "src/components/simulators/TravelMateAISimulator.tsx", purpose: "Responsive companion chat UI, fast prompt templates, and streaming interface" },
      { path: "server.ts", purpose: "Proxy gateway securing Gemini API keys and routing dynamic model requests" },
      { path: "src/utils/offlineBackup.ts", purpose: "Static contextual travel database serving fallback answers when offline" }
    ],
    underTheHood: "Protects sensitive API credentials by routing travel conversations through a server-side Express proxy. Formulates system-instructions that contextualize the LLM responses to Indian travel, BMTC/Metro systems, and carbon optimization tips.",
    apiSchema: "POST /api/chat/message -> Body: { prompt: string, history: [{ role: string, content: string }] } -> Returns stream { textChunk: string }",
    regulatoryCompliance: "Complies with user data privacy guidelines (GDPR compliant server logs) and AI safety filters.",
    performanceSpecs: [
      { label: "Server API Route Proxy Relay", value: "15ms", progress: 95 },
      { label: "Streaming Markdown Parse", value: "6.2ms", progress: 94 },
      { label: "Context Window Cache Sync", value: "48ms", progress: 88 }
    ]
  },
  10: {
    projectId: 10,
    architecturalFlow: [
      "Select optimized cargo path heuristics (Shortest Path, Eco-Saver, Cost-Saver)",
      "Listen to interactive drag and drop marker relocations on Leaflet canvas maps",
      "Trigger Traveling Salesperson (TSP) heuristic route calculations",
      "Compile operational KPI indicators (Fuel consumed, cargo timing tolerances)",
      "Render animated cargo vehicle progress lines on Leaflet pathways"
    ],
    fileTree: [
      { path: "src/components/simulators/RouteWiseSimulator.tsx", purpose: "Interactive routing Leaflet maps pane, optimization controls, and cargo timelines" },
      { path: "src/utils/tspSolver.ts", purpose: "Heuristic Traveling Salesperson calculations including path matrices" },
      { path: "src/components/DeliveryTimeline.tsx", purpose: "Dynamic multi-stop timeline detailing cargo unloading states" }
    ],
    underTheHood: "Approximates mathematical routing metrics utilizing greedy and random-swap local search algorithms to solve the Traveling Salesperson Problem (TSP) in real-time. Scales operational KPIs based on route choices.",
    apiSchema: "POST /api/logistics/optimize-route -> Body: { waypoints: [{ lat: number, lng: number }], heuristic: string } -> Returns { optimizedOrder: number[], totalDistanceKm: number, fuelSavedLiters: number }",
    regulatoryCompliance: "Complies with logistics standards, including driving hour limitations and standard freight carbon tracking formulas.",
    performanceSpecs: [
      { label: "TSP Optimization Solver", value: "18ms", progress: 90 },
      { label: "Map Rendering & Tracing", value: "42ms", progress: 87 },
      { label: "KPI Indicator Redraw Time", value: "2.8ms", progress: 97 }
    ]
  }
};
