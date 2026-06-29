import { GoogleGenAI } from "@google/genai";

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
    console.log("Gemini AI client successfully initialized in serverless function.");
  } catch (err) {
    console.error("Failed to initialize Gemini AI:", err);
  }
} else {
  console.warn("GEMINI_API_KEY is not defined in Netlify environment variables. TravelMate AI will use rich simulated responses.");
}

export async function handler(event: any, context: any) {
  const path = event.path || "";
  const method = event.httpMethod || "GET";
  
  const headers = {
    "Content-Type": "application/json",
    // CORS headers just in case, though same-origin proxy is configured
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  // Handle CORS preflight options request
  if (method === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Preflight OK" }),
    };
  }

  // Route: /api/health
  if (path.includes("health")) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ status: "ok", time: new Date().toISOString() }),
    };
  }

  // Route: /api/gemini/chat
  if (path.includes("gemini/chat")) {
    if (method !== "POST") {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: "Method Not Allowed" }),
      };
    }

    try {
      if (!event.body) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "Body is required" }),
        };
      }

      const { message } = JSON.parse(event.body);
      if (!message) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "Message is required" }),
        };
      }

      if (!ai) {
        console.log("No Gemini API client initialized. Returning offline smart recommendation.");
        const mockResponses = [
          `✈️ **TravelMate AI Local Recommendation** (Offline Mode):\n\nFor your trip, here is a custom itinerary for Bangalore:\n1. **Day 1**: Explore Lalbagh Botanical Garden & Bangalore Palace. Grab traditional Filter Coffee at Mavalli Tiffin Room (MTR).\n2. **Day 2**: Take the **Namma Metro** to Cubbon Park & the Visvesvaraya Industrial and Technological Museum.\n3. **Day 3**: Plan a day trip to Nandi Hills for sunrise. Hire a rental cab to reduce group cost!\n\n🍀 *Eco tip: Choose the Metro over individual autos to save about 1.8kg of CO₂!*`,
          `🚌 **TravelMate AI Local Recommendation** (Offline Mode):\n\nPlanning a trip to Coorg from Bangalore?\n- **Best Route**: Route via Mysore road (NH 275) is very scenic. Around 250 km.\n- **Transport Suggestion**: KSRTC Airavat Club Class (AC Sleeper) buses are comfortable and depart daily from Majestic.\n- **Sightseeing**: Visit Abbey Falls, Golden Temple (Bylakuppe), and Raja's Seat.\n\n🍃 *Carbon Footprint: Travel via bus emits ~6.2kg CO₂ per passenger, whereas a private car emits ~48kg! choosing the bus saves 87% emissions.*`,
          `🚂 **TravelMate AI Local Recommendation** (Offline Mode):\n\nTraveling to Delhi/Mumbai soon?\n- **Delhi**: Explore Red Fort, India Gate, and Chandni Chowk. Use the Delhi Metro (super carbon-efficient!).\n- **Mumbai**: Gateway of India, Marine Drive, and Elephanta Caves. Local trains or BEST buses are highly recommended.\n\n💡 *Did you know? Indian railways and metros are among the world's most sustainable heavy transits!*`
        ];

        let responseText = mockResponses[0];
        if (message.toLowerCase().includes("coorg") || message.toLowerCase().includes("bus") || message.toLowerCase().includes("mysore")) {
          responseText = mockResponses[1];
        } else if (message.toLowerCase().includes("delhi") || message.toLowerCase().includes("mumbai") || message.toLowerCase().includes("metro")) {
          responseText = mockResponses[2];
        }
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ text: responseText, isMock: true }),
        };
      }

      const prompt = `You are TravelMate AI, a friendly and smart Indian travel companion assistant built as part of the NullClass Advanced Web Development Portfolio.
The user is asking: "${message}".

Help the user plan routes, recommend bus sizes, calculate carbon emissions, or provide local tips for Indian destinations (especially Bangalore, Mysore, Coorg, Ooty, Delhi, Mumbai, Goa, etc.).
Keep answers highly structured, beautifully styled with Markdown, scannable with bullet points, and positive. Highlight carbon footprint comparisons and eco-friendly tips where applicable to tie into EcoRoute!`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [prompt],
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ text: response.text || "I couldn't process that response. Please try again." }),
      };
    } catch (error: any) {
      console.error("Gemini API error:", error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: error?.message || "An error occurred with Gemini API" }),
      };
    }
  }

  return {
    statusCode: 404,
    headers,
    body: JSON.stringify({ error: `Route not found: ${path}` }),
  };
}
