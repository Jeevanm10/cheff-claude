import React from "react";
import IngrediantList from "./ingrediantList";
import ClaudeRecipe from "./claudeRecipe"


export default function main() {
    const [ingrediants,setItem] = React.useState([])
    const [recipeShown,setRecipeShown] = React.useState(false)
    
    const listItems = ingrediants.map(item =>(
        <li key ={item}>{item}</li>
    ))

    function handleSubmit(formData){
        const newFormData = formData.get("ingrediants")
        setItem(prev => [...prev,newFormData])
    }

    function showRecipe() {
        setRecipeShown(prev => !prev)
    }

    return(
        <main>
            <form className="add-ingrediant" action={handleSubmit}>
                <input placeholder="e.g Carrot" type = "text" aria-label="Add ingrediant" name="ingrediants"/>
                <button>+ Add ingrediant</button>
            </form>
            {ingrediants.length > 0 && <IngrediantList list = {listItems} showRecipe ={showRecipe}/>}
            {recipeShown && <ClaudeRecipe canShow = {recipeShown}/>}  
        </main>
    )
}