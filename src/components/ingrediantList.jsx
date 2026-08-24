export default function ingrediantList(props){
    let size = props.list.length
    
    return(
        <section className="ingrediant-list">
            <h2>Ingrediants in hand :</h2>
                <ul className="ingrediants-list" aria-live="polite">
                    {props.list}
                </ul>
                {size > 3 && <div className="get-recipe-container">
                    <div ref={props.ref}>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from the list of your ingrediants</p>
                    </div>
                    <button onClick={props.getRecipe}>Get a recipe</button>
                </div>}
            </section>
    )
}