import React from "react";

let ingrediants = []

export default function main() {
    let listItems = ingrediants.map(ingrediant =>(
        <li key ="ingrediant">{ingrediant}</li>
    ))

    function submit(event) {
        event.preventDefault()
        const formdata = new FormData(event.currentTarget)
        const newIngrediant = formdata.get("ingrediants")
        ingrediants.push(newIngrediant)
    }

    return(
        <main>
            <form className="add-ingrediant" onSubmit={submit}>
                <input placeholder="e.g Origano" type = "text" aria-label="Add ingrediant" name="ingrediants"/>
                <button type="submit">+ Add ingrediant</button>
            </form>
                <ul>
                    {listItems}
                </ul>
        </main>
    )
}