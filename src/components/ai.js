
export async function getRecipeFromChefClaude(ingredientsArr) {
  try {
    const response = await fetch("http://localhost:5000/api/recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: ingredientsArr }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.recipe;
  } catch (err) {
    console.error("Fetch recipe error:", err);
    throw err;
  }
}