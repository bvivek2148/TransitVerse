import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI client if API key is present
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;

  if (apiKey) {
    try {
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      console.log("Gemini AI client successfully initialized.");
    } catch (err) {
      console.error("Failed to initialize Gemini AI:", err);
    }
  } else {
    console.warn("GEMINI_API_KEY is not defined in environment variables. TravelMate AI will use rich simulated responses.");
  }

  // API route for travel AI recommendations
  app.post("/api/gemini/chat", async (req, res) => {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!ai) {
      // Graceful fallback with structured mock responses if no key is provided
      console.log("No Gemini API client initialized. Returning offline smart recommendation.");
      const mockResponses = [
        `✈️ **TravelMate AI Local Recommendation** (Offline Mode):\n\nFor your trip, here is a custom itinerary for Bangalore:\n1. **Day 1**: Explore Lalbagh Botanical Garden & Bangalore Palace. Grab traditional Filter Coffee at Mavalli Tiffin Room (MTR).\n2. **Day 2**: Take the **Namma Metro** to Cubbon Park & the Visvesvaraya Industrial and Technological Museum.\n3. **Day 3**: Plan a day trip to Nandi Hills for sunrise. Hire a rental cab to reduce group cost!\n\n🍀 *Eco tip: Choose the Metro over individual autos to save about 1.8kg of CO₂!*`,
        `🚌 **TravelMate AI Local Recommendation** (Offline Mode):\n\nPlanning a trip to Coorg from Bangalore?\n- **Best Route**: Route via Mysore road (NH 275) is very scenic. Around 250 km.\n- **Transport Suggestion**: KSRTC Airavat Club Class (AC Sleeper) buses are comfortable and depart daily from Majestic.\n- **Sightseeing**: Visit Abbey Falls, Golden Temple (Bylakuppe), and Raja's Seat.\n\n🍃 *Carbon Footprint: Travel via bus emits ~6.2kg CO₂ per passenger, whereas a private car emits ~48kg! choosing the bus saves 87% emissions.*`,
        `🚂 **TravelMate AI Local Recommendation** (Offline Mode):\n\nTraveling to Delhi/Mumbai soon?\n- **Delhi**: Explore Red Fort, India Gate, and Chandni Chowk. Use the Delhi Metro (super carbon-efficient!).\n- **Mumbai**: Gateway of India, Marine Drive, and Elephanta Caves. Local trains or BEST buses are highly recommended.\n\n💡 *Did you know? Indian railways and metros are among the world's most sustainable heavy transits!*`
      ];
      // Select a response based on keywords or random
      let responseText = mockResponses[0];
      if (message.toLowerCase().includes("coorg") || message.toLowerCase().includes("bus") || message.toLowerCase().includes("mysore")) {
        responseText = mockResponses[1];
      } else if (message.toLowerCase().includes("delhi") || message.toLowerCase().includes("mumbai") || message.toLowerCase().includes("metro")) {
        responseText = mockResponses[2];
      }
      return res.json({ text: responseText, isMock: true });
    }

    try {
      const prompt = `You are TravelMate AI, a friendly and smart Indian travel companion assistant built as part of the NullClass Advanced Web Development Portfolio.
The user is asking: "${message}".

Help the user plan routes, recommend bus sizes, calculate carbon emissions, or provide local tips for Indian destinations (especially Bangalore, Mysore, Coorg, Ooty, Delhi, Mumbai, Goa, etc.).
Keep answers highly structured, beautifully styled with Markdown, scannable with bullet points, and positive. Highlight carbon footprint comparisons and eco-friendly tips where applicable to tie into EcoRoute!`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [prompt],
      });

      res.json({ text: response.text || "I couldn't process that response. Please try again." });
    } catch (error: any) {
      console.error("Gemini API error:", error);
      res.status(500).json({ error: error?.message || "An error occurred with Gemini API" });
    }
  });

  // API route for standard health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Vite middleware for development or Static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Serving static production files from dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
