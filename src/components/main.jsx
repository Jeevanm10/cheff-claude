import React from "react";
import IngrediantList from "./ingrediantList";
import ClaudeRecipe from "./claudeRecipe"
import { getRecipeFromGemini } from"./ai"


export default function main() {
    const [ingrediants,setItem] = React.useState([])
    const [recipe,setRecipe] = React.useState("")
    
    const listItems = ingrediants.map(item =>(
        <li key ={item}>{item}</li>
    ))

    function handleSubmit(formData){
        const newFormData = formData.get("ingrediants")
        setItem(prev => [...prev,newFormData])
    }

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromGemini(ingrediants)
        console.log(recipeMarkdown)
        setRecipe(recipeMarkdown)
    }

    return(
        <main>
            <form className="add-ingrediant" action={handleSubmit}>
                <input placeholder="e.g Carrot" type = "text" aria-label="Add ingrediant" name="ingrediants"/>
                <button>+ Add ingrediant</button>
            </form>
            {ingrediants.length > 0 && <IngrediantList list = {listItems} getRecipe ={getRecipe}/>}
            {recipe && <ClaudeRecipe recipe={recipe}/>}  
        </main>
    )
}