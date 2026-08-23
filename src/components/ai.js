
import { InferenceClient } from '@huggingface/inference'


const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make 
with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. 
The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. 
Format your response in markdown to make it easier to render to a web page`



const hf = new InferenceClient(import.meta.env.VITE_HF_API_KEY)

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "deepseek-ai/DeepSeek-R1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        const cleanedResponse = response.choices[0].message.content.replace(/<think>[\s\S]*?<\/think>/g,"").trim()
        return cleanedResponse
    } catch (err) {
        console.error(err.message)
    }
}
