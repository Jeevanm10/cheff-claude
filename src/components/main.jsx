import React from "react";
import IngrediantList from "./ingrediantList";
import ClaudeRecipe from "./claudeRecipe"
import { getRecipeFromMistral } from"./ai"
import { Behavior } from "@google/genai";


export default function main() {
    const [ingrediants,setItem] = React.useState([])
    const [recipe,setRecipe] = React.useState("")
    const recipeSection = React.useRef(null)
    
    React.useEffect(()=>{
        if (recipe != "" && recipeSection.current != null) {
            recipeSection.current.scrollIntoView({behavior : "smooth"})
        }
    },[recipe])
    
    const listItems = ingrediants.map(item =>(
        <li key ={item}>{item}</li>
    ))

    function handleSubmit(formData){
        const newFormData = formData.get("ingrediants")
        setItem(prev => [...prev,newFormData])
    }

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingrediants)
        setRecipe(recipeMarkdown)
    }

    return(
        <main>
            <form className="add-ingrediant" action={handleSubmit}>
                <input placeholder="e.g Carrot" type = "text" aria-label="Add ingrediant" name="ingrediants"/>
                <button>+ Add ingrediant</button>
            </form>
            <p className="imp-note">Note : wait a minute after clicking the "Get a recipe" button</p>
            {ingrediants.length > 0 && <IngrediantList list = {listItems} getRecipe ={getRecipe} ref = {recipeSection} />}
            {recipe && <ClaudeRecipe recipe={recipe}/>}  
        </main>
    )
}