
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey : import.meta.env.VITE_GEMINI_API_KEY,
});

const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make 
with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. 
The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. 
Format your response in markdown to make it easier to render to a web page`



export async function getRecipeFromGemini(ingrediantsArr){
    const ingrediantString = ingrediantsArr.join(",")
    const fullPrompt = `
        ${SYSTEM_PROMPT}
        Available Ingredients: ${ingrediantString}

        Please generate:
        1. Recipe Name
        2. Prep & Cook Time
        3. Additional common pantry staples needed (salt, pepper, water, etc.)
        4. Step-by-step cooking instructions
        `;
    try{
        const response = await ai.models.generateContent({
        model : 'gemini-3.6-flash',
        contents : fullPrompt
    });
    return response.text;
    }catch(error){
        console.error("Error in generating recipe:",error)
    }
}