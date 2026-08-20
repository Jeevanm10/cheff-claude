import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit"; // 1. Added import
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 2. Restrict CORS to only your frontend domains
const allowedOrigins = [
  "http://localhost:5173", // Local development (Vite)
  "http://localhost:3000", // Local development (Create React App)
  "https://your-chef-claude-frontend.vercel.app", // Your deployed frontend URL
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman) or matched origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Blocked by CORS policy"));
      }
    },
  })
);

app.use(express.json());

// 3. Set up Rate Limiter (Max 20 requests per 15 mins per IP)
const recipeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many recipe requests from this IP, please try again in 15 minutes.",
  },
});

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional basic pantry staples (like salt, pepper, oil, water, flour). Format your response in clear, clean Markdown for easy rendering on the web.
`;

// 4. Apply the rate limiter directly to this route
app.post("/api/recipe", recipeLimiter, async (req, res) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: "Please provide a valid ingredients list." });
    }

    const ingredientsString = ingredients.join(", ");
    const userPrompt = `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });

    res.json({ recipe: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to generate recipe from AI." });
  }
});

// Start server
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Chef Claude backend listening on http://localhost:${PORT}`);
  });
}

export default app;