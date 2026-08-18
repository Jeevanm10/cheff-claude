import React from "react";


export default function main() {
    let [ingrediants,setItem] = React.useState([])
    let listItems = ingrediants.map(item =>(
        <li key ={item}>{item}</li>
    ))
    console.log(listItems)

    function handleSubmit(formData){
        const newFormData = formData.get("ingrediants")
        setItem(prev => [...prev,newFormData])
    }


    return(
        <main>
            <form className="add-ingrediant" action={handleSubmit}>
                <input placeholder="e.g Carrot" type = "text" aria-label="Add ingrediant" name="ingrediants"/>
                <button>+ Add ingrediant</button>
            </form>
                <ul>
                    {listItems}
                </ul>
        </main>
    )
}