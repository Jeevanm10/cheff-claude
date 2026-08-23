import ReactMarkdown from "react-markdown"

export default function recipe(props){
    return(
         <section className="suggested-recipe-container" aria-label="polite">
                <h2>Chef Claude Recomends :</h2>
                <ReactMarkdown>{props.recipe}</ReactMarkdown>
            </section>
    )
}