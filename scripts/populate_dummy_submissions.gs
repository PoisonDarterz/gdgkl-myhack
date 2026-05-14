/**
 * Google Apps Script: Populate 100 dummy hackathon submission rows
 * Paste this into Tools > Apps Script in your Google Sheet, then run populateDummyData()
 */

function populateDummyData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  var teamPrefixes = [
    "Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta",
    "Iota", "Kappa", "Lambda", "Mu", "Nu", "Xi", "Omicron", "Pi",
    "Rho", "Sigma", "Tau", "Upsilon", "Phi", "Chi", "Psi", "Omega",
    "Nova", "Apex", "Nexus", "Zenith", "Vertex", "Prism", "Synapse", "Fusion",
    "Quantum", "Flux", "Orbit", "Surge", "Pulse", "Echo", "Vortex", "Helix",
    "Cipher", "Axiom", "Catalyst", "Meridian", "Solaris", "Aurora", "Vector", "Cobalt",
    "Phantom", "Nimbus"
  ];

  var projectThemes = [
    { name: "AgriCoordinate", pitch: "Connecting smallholder farmers with buyers and agronomists using AI-powered crop demand forecasting and real-time market coordination.", ecosystem: "agricultural supply chain", problem: "Farmers lack visibility into market demand, leading to overproduction waste and price volatility.", tech: "Vertex AI, Google Maps Platform, Firestore, Cloud Run" },
    { name: "EduBridge", pitch: "AI-driven platform that matches tutors with students across underserved communities, automating scheduling and personalised learning path generation.", ecosystem: "education marketplace", problem: "Students in rural areas struggle to find qualified tutors; tutors lack tools to coordinate across multiple students.", tech: "Gemini API, Google Classroom API, Firebase, BigQuery" },
    { name: "HealthSync", pitch: "Unified patient-clinic coordination system that uses AI to triage appointment urgency, reduce no-shows, and share records securely.", ecosystem: "healthcare network", problem: "Fragmented clinic systems cause duplicate tests, missed follow-ups, and overburdened emergency rooms.", tech: "Healthcare Data Engine, Vertex AI, Cloud Healthcare API, Identity Platform" },
    { name: "SupplyFlow", pitch: "End-to-end supply chain visibility platform that predicts disruptions and autonomously reallocates inventory across warehouses.", ecosystem: "logistics and retail", problem: "Retailers face stockouts and overstocking due to siloed supplier data and manual reorder processes.", tech: "Vertex AI, Google Maps Platform, Cloud Spanner, Pub/Sub" },
    { name: "SmartCity Hub", pitch: "Centralised city services coordination platform powered by AI that routes citizen requests, manages field crews, and predicts infrastructure failures.", ecosystem: "municipal services", problem: "City departments operate in silos, resulting in duplicated work orders and slow resolution of public complaints.", tech: "Google Maps Platform, Vertex AI, Apigee, Cloud IoT Core" },
    { name: "GreenTrack", pitch: "Environmental monitoring network that aggregates sensor data and uses AI to detect pollution events and coordinate emergency response.", ecosystem: "environmental governance", problem: "Pollution events are detected too late because sensor data is fragmented across agencies.", tech: "Google Earth Engine, Vertex AI, Pub/Sub, BigQuery" },
    { name: "TalentBridge", pitch: "AI recruiter that matches job seekers to SME vacancies based on skills, culture fit, and career trajectory predictions.", ecosystem: "SME employment market", problem: "SMEs lack HR resources to screen candidates; qualified applicants miss opportunities due to lack of visibility.", tech: "Gemini API, Cloud Talent Solution, Firestore, Cloud Functions" },
    { name: "LocalMart", pitch: "Hyperlocal marketplace connecting neighbourhood merchants with buyers, using AI demand forecasting to reduce food waste.", ecosystem: "local retail ecosystem", problem: "Local merchants cannot predict daily demand, leading to spoilage and lost revenue.", tech: "Vertex AI, Google Maps Platform, Firebase, Merchant Center API" },
    { name: "TrafficFlow", pitch: "Real-time traffic coordination system that adjusts signal timing dynamically using computer vision and crowd-sourced incident reports.", ecosystem: "urban transportation", problem: "Static signal timing causes unnecessary congestion; incident response is reactive rather than predictive.", tech: "Video Intelligence API, Google Maps Platform, Vertex AI, Cloud Run" },
    { name: "WasteWise", pitch: "Smart waste collection routing platform that uses AI fill-level predictions to dispatch trucks only when bins are nearly full.", ecosystem: "municipal waste management", problem: "Fixed collection schedules lead to overflowing bins or unnecessary trips, wasting fuel and labour.", tech: "Vertex AI, Google Maps Platform, IoT Core, Cloud Functions" },
    { name: "MediConnect", pitch: "Decentralised telehealth coordination layer connecting rural clinics, specialists, and pharmacies for seamless patient journeys.", ecosystem: "telemedicine network", problem: "Rural patients cannot access specialists; referrals are lost in email chains with no follow-through tracking.", tech: "Gemini API, Cloud Healthcare API, Firebase, Meet API" },
    { name: "FoodTrace", pitch: "Blockchain-anchored food provenance system using AI to flag traceability gaps and automate supplier compliance audits.", ecosystem: "food supply chain", problem: "Consumers and retailers cannot verify origin claims; recalls take weeks due to manual traceability.", tech: "Vertex AI, BigQuery, Cloud Spanner, Document AI" },
    { name: "LegalAid", pitch: "AI legal assistant that drafts contracts, identifies clause risks, and coordinates review workflows across legal teams.", ecosystem: "legal services", problem: "SMEs cannot afford lawyers for routine contracts; review cycles are slow and error-prone.", tech: "Gemini API, Document AI, Firestore, Cloud Run" },
    { name: "EnergyGrid", pitch: "Peer-to-peer renewable energy trading platform that uses AI to balance local grid supply and demand in real time.", ecosystem: "distributed energy", problem: "Rooftop solar owners cannot sell surplus energy efficiently; grid operators lack local demand visibility.", tech: "Vertex AI, Pub/Sub, BigQuery, Cloud Functions" },
    { name: "SafeRoute", pitch: "AI safety routing app for women and vulnerable groups that learns from incident reports and crowdsourced hazard data.", ecosystem: "personal safety network", problem: "Existing navigation apps ignore safety context; incident data is not shared across communities.", tech: "Google Maps Platform, Gemini API, Firebase, Cloud Functions" },
    { name: "SkillSwap", pitch: "Community skill exchange platform where AI matches members for mutual learning and tracks reputation through peer assessments.", ecosystem: "community learning", problem: "Knowledge silos prevent communities from leveraging the skills already present among members.", tech: "Gemini API, Firestore, Firebase Auth, Cloud Run" },
    { name: "CropInsure", pitch: "Parametric crop insurance platform that uses satellite imagery and weather AI to auto-trigger payouts when thresholds are breached.", ecosystem: "agricultural finance", problem: "Traditional crop insurance is slow to verify losses; smallholders lack access to affordable coverage.", tech: "Google Earth Engine, Vertex AI, BigQuery, Cloud Functions" },
    { name: "TourismSync", pitch: "Destination management platform that coordinates tour operators, hotels, and guides using AI demand forecasting and dynamic pricing.", ecosystem: "tourism ecosystem", problem: "Fragmented booking systems cause double bookings, underutilised capacity, and poor visitor experiences.", tech: "Vertex AI, Google Maps Platform, Firebase, Travel Partner API" },
    { name: "MentorMatch", pitch: "AI mentoring platform that pairs startup founders with seasoned mentors based on stage, industry, and specific challenge alignment.", ecosystem: "startup ecosystem", problem: "Founders waste months finding the right mentor; mentors lack tools to manage multiple mentees effectively.", tech: "Gemini API, Firestore, Firebase Auth, Cloud Scheduler" },
    { name: "CivicPulse", pitch: "Participatory democracy platform that aggregates citizen feedback, uses AI to detect consensus, and routes issues to the right officials.", ecosystem: "civic governance", problem: "Government consultations gather low engagement; feedback is rarely acted upon or tracked to resolution.", tech: "Gemini API, Natural Language API, Firebase, BigQuery" }
  ];

  var firstNames = ["Ahmad", "Nurul", "Wei", "Priya", "Siti", "Raj", "Mei", "Amir", "Lina", "Chen",
    "Fadzli", "Yasmin", "Kang", "Divya", "Hafiz", "Zara", "Jun", "Nadia", "Ravi", "Aisyah",
    "Bryan", "Farah", "Xin", "Kavya", "Haris", "Alicia", "Zhen", "Sharmila", "Dani", "Rina"];
  var lastNames = ["Abdullah", "Tan", "Krishnan", "Ismail", "Lee", "Patel", "Wong", "Hassan", "Lim", "Nair",
    "Ibrahim", "Chong", "Menon", "Razak", "Ooi", "Sharma", "Yap", "Ramachandran", "Aziz", "Chan"];

  var googleTechPools = [
    "Gemini API, Vertex AI, Firebase, Cloud Run",
    "Vertex AI, Google Maps Platform, BigQuery, Cloud Functions",
    "Gemini API, Document AI, Firestore, Cloud Storage",
    "Google Earth Engine, Vertex AI, Pub/Sub, BigQuery",
    "Gemini API, Natural Language API, Firebase Auth, Cloud Run",
    "Vertex AI, Vision AI, Google Maps Platform, Firestore",
    "Gemini API, Vertex AI, Cloud Spanner, Apigee",
    "Video Intelligence API, Vertex AI, Cloud Run, BigQuery"
  ];

  var aiModels = [
    "Gemini 2.0 Flash for low-latency inference; Gemini 1.5 Pro for complex reasoning tasks. Chosen for native multimodal support and competitive pricing.",
    "Gemini 1.5 Pro for document understanding. Chosen for its 1M context window which handles lengthy contracts without chunking.",
    "Vertex AI AutoML for tabular prediction; Gemini Flash for user-facing chat. AutoML handles structured data; Gemini handles natural language.",
    "Gemini 2.0 Flash Thinking for step-by-step reasoning. Chosen because transparency in reasoning is critical for regulatory compliance.",
    "Gemini 1.5 Flash for real-time processing; Gemini 1.5 Pro for batch analysis. Tiered approach balances cost and accuracy."
  ];

  var ethicsAnswers = [
    "Bias auditing on training data to ensure fair outcomes across demographic groups. User consent forms for data collection. Opt-out mechanisms for AI-driven decisions.",
    "Differential privacy for sensitive user data. Regular fairness evaluations using Vertex AI Model Evaluation. Transparent AI decision logs accessible to users.",
    "Human-in-the-loop review for high-stakes decisions. Data minimisation principles applied at collection. Regular red-team exercises to identify failure modes.",
    "Clear disclosure to users when AI is making recommendations. Equitable dataset sampling to avoid regional bias. Independent ethics review conducted before launch.",
    "Anonymisation of personal data before model training. Bias detection using Responsible AI toolkit. Appeals mechanism for users to contest AI decisions."
  ];

  var evalMethods = [
    "A/B testing with control groups; precision and recall tracked weekly in BigQuery dashboards. User satisfaction surveys correlated with model confidence scores.",
    "Offline evaluation against a labelled holdout set; online metrics via Cloud Monitoring. Drift detection alerts trigger retraining pipelines.",
    "Human evaluator scoring on a 500-sample benchmark; automated regression tests on every model update. BLEU and ROUGE scores for text outputs.",
    "Shadow mode deployment comparing AI recommendations to expert decisions for 30 days before go-live. Feedback loops feed retraining cycles.",
    "Confusion matrix analysis on weekly prediction batches; business KPIs (e.g. reduction in manual hours) tracked as proxy for model effectiveness."
  ];

  var techStacks = [
    "Frontend: Next.js on Cloud Run. Backend: Python FastAPI on Cloud Run. Database: Firestore + BigQuery. Auth: Firebase Auth. CI/CD: Cloud Build.",
    "Frontend: React hosted on Firebase Hosting. Backend: Node.js Cloud Functions. Database: Cloud Spanner. ML: Vertex AI endpoints. Infra: Terraform.",
    "Mobile: Flutter. Backend: Go on Cloud Run. Database: Firestore. ML: Vertex AI. Queue: Pub/Sub. Monitoring: Cloud Operations Suite.",
    "Frontend: Vue.js on Firebase Hosting. Backend: Python Flask on Cloud Run. Database: PostgreSQL on Cloud SQL. AI: Gemini API. DevOps: GitHub Actions.",
    "Full-stack Next.js deployed on Cloud Run. Supabase for auth and database. Vertex AI for ML inference. Pub/Sub for async event processing."
  ];

  var businessModels = [
    "B2B SaaS with tiered subscription plans. Freemium tier for solo users; Pro and Enterprise tiers with advanced analytics and API access. Target 500 SME customers by Year 2.",
    "Transaction fee model: 1.5% per coordinated transaction. Revenue sharing with ecosystem partners. Marketplace listing fees for premium visibility.",
    "Freemium consumer app with premium subscription at RM 19/month for advanced features. Enterprise licensing for institutions at RM 500/month.",
    "Government contract model: annual licensing to municipalities. Secondary revenue from anonymised aggregate data insights sold to urban planners.",
    "API-as-a-service: pay-per-call pricing for third-party integrations. Platform subscription for end users. White-label licensing for enterprise partners."
  ];

  var scaleAnswers = [
    "Horizontal scaling via Cloud Run auto-scaling. Database sharding on Cloud Spanner for global distribution. CDN via Cloud CDN for static assets. Load testing with Locust before each major release.",
    "Microservices architecture allows independent scaling of bottleneck services. Pub/Sub decouples producers and consumers. Multi-region Firestore replication for low-latency global access.",
    "Container-based deployment on GKE with Horizontal Pod Autoscaler. Read replicas for database read traffic. Caching layer with Memorystore to reduce DB load at peak.",
    "Serverless Cloud Functions scale to zero when idle, reducing cost. BigQuery handles analytics at any scale without infrastructure management. Gradual rollout with feature flags to manage load.",
    "Event-driven architecture with Pub/Sub absorbs traffic spikes. Vertex AI batch prediction for non-real-time workloads reduces inference cost by 60%. Multi-zone deployment for resilience."
  ];

  var prodPaths = [
    "Current: MVP on Cloud Run with 50 beta users. To production: security audit, PDPA compliance certification, integration with government APIs, Series A fundraising for GTM team.",
    "Current: functional prototype with synthetic data. Needs: pilot with 3 real enterprise customers, SOC 2 Type II audit, dedicated SRE for on-call, formal SLAs.",
    "Current: single-region deployment on Firebase. Needs: multi-region failover, penetration testing, ISO 27001 certification, partnerships with 2 anchor customers for credibility.",
    "Current: working demo with test dataset. Needs: real data ingestion pipelines, regulatory approval from relevant ministry, seed funding of RM 500k for engineering team.",
    "Current: proof of concept validated with 20 users. Needs: performance hardening, PDPA data processing agreement, payment gateway integration, legal entity setup."
  ];

  var sdgLinks = [
    "https://docs.google.com/presentation/d/DUMMY_DECK_001/edit",
    "https://docs.google.com/presentation/d/DUMMY_DECK_002/edit",
    "https://docs.google.com/presentation/d/DUMMY_DECK_003/edit",
    "https://docs.google.com/presentation/d/DUMMY_DECK_004/edit",
    "https://docs.google.com/presentation/d/DUMMY_DECK_005/edit"
  ];

  var videoLinks = [
    "https://youtu.be/DUMMY_VIDEO_001",
    "https://youtu.be/DUMMY_VIDEO_002",
    "https://youtu.be/DUMMY_VIDEO_003",
    "https://youtu.be/DUMMY_VIDEO_004",
    "https://youtu.be/DUMMY_VIDEO_005"
  ];

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateUniqueCode(i) {
    return "MH2025-" + String(i + 1).padStart(4, "0");
  }

  function generateTimestamp(i) {
    // Spread submissions over ~3 days
    var base = new Date("2025-08-01T09:00:00");
    base.setMinutes(base.getMinutes() + i * 43 + randomInt(0, 30));
    return Utilities.formatDate(base, "Asia/Kuala_Lumpur", "M/d/yyyy HH:mm:ss");
  }

  function generateGitHub(teamName) {
    var slug = teamName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    var owners = ["gdgkl-hackathon", "myhack2025", "buildwithai-kl", "gdg-malaysia"];
    return "https://github.com/" + pick(owners) + "/" + slug;
  }

  var rows = [];

  for (var i = 0; i < 100; i++) {
    var prefixIdx = i % teamPrefixes.length;
    var themeIdx = i % projectThemes.length;
    var theme = projectThemes[themeIdx];
    var teamName = teamPrefixes[prefixIdx] + " " + theme.name;
    var leaderName = pick(firstNames) + " " + pick(lastNames);

    var whyGoogle = "We chose " + theme.tech.split(",")[0].trim() + " because it integrates natively with the rest of the Google ecosystem, reducing operational overhead. The managed infrastructure lets us focus on product innovation rather than DevOps.";
    var automate = "Our platform replaces manual email-based coordination with an AI orchestration layer that triages, routes, and tracks every interaction in real time, reducing coordination overhead by an estimated 70%.";
    var measurable = "Key metrics: 40% reduction in coordination latency, 25% increase in successful match rate, 15% cost saving for participating organisations within the first 6 months of deployment.";
    var whyAI = "The core problem—matching and routing across a dynamic, heterogeneous ecosystem—cannot be solved by static rules. AI learns from historical patterns and adapts to new signals, making manual approaches obsolete at scale.";
    var coreFeatures = "1) AI-powered matching engine, 2) Real-time dashboard with analytics, 3) Automated notification and escalation workflows, 4) API for third-party integrations, 5) Role-based access control.";
    var stakeholders = "Primary: " + theme.ecosystem + " participants. Secondary: regulatory bodies, technology partners, and end consumers who benefit from improved coordination outcomes.";

    var row = [
      generateTimestamp(i),                          // A: Timestamp
      generateUniqueCode(i),                          // B: Unique Code
      teamName,                                       // C: Team Name
      leaderName,                                     // D: Team Leader's Full Name
      generateGitHub(teamName),                       // E: GitHub Repository Link
      theme.pitch,                                    // F: Elevator pitch
      theme.tech,                                     // G: Google Developer technologies
      whyGoogle,                                      // H: Why these Google technologies
      "Ecosystem: " + theme.ecosystem + ". Problem: " + theme.problem,  // I: Ecosystem and coordination problem
      automate,                                       // J: How solution automates relationships
      measurable,                                     // K: Measurable improvements
      whyAI,                                          // L: Why AI essential
      pick(aiModels),                                 // M: AI Models used
      pick(ethicsAnswers),                            // N: AI ethical considerations
      pick(evalMethods),                              // O: How evaluate AI accuracy
      pick(techStacks),                               // P: Tech stack and deployment
      coreFeatures,                                   // Q: Core features in prototype
      stakeholders,                                   // R: Stakeholders and beneficiaries
      pick(businessModels),                           // S: Business model
      pick(scaleAnswers),                             // T: Scale technically and operationally
      pick(prodPaths),                                // U: Prototype to production
      pick(sdgLinks),                                 // V: Pitching slide deck link
      pick(videoLinks)                                // W: Pitching video link
    ];

    rows.push(row);
  }

  // Find the first empty row after the header
  var lastRow = sheet.getLastRow();
  var startRow = lastRow + 1;

  // Write all 100 rows in one batch call for performance
  sheet.getRange(startRow, 1, rows.length, rows[0].length).setValues(rows);

  SpreadsheetApp.getUi().alert("Done! 100 dummy rows inserted starting from row " + startRow + ".");
}
