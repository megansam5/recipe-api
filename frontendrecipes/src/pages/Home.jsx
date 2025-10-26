import { useState, useEffect } from "react";
import api from "../api";
import Recipe from "../components/Recipe";
import "../styles/Home.css";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState(1);

  const [ingredientsList, setIngredientsList] = useState([]);
  const [newIngredientName, setNewIngredientName] = useState("");
  const [newIngredientCategory, setNewIngredientCategory] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    getRecipes();
    getIngredientsList();
  }, []);

  const getRecipes = () => {
    api
      .get("/recipes/")
      .then((res) => res.data)
      .then((data) => {
        setRecipes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const getIngredientsList = () => {
    api
      .get("/ingredients/")
      .then((res) => res.data)
      .then((data) => {
        setIngredientsList(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteRecipe = (id) => {
    api
      .delete(`/recipes/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Recipe deleted!");
        else alert("Failed to delete recipe.");
        getRecipes();
      })
      .catch((error) => alert(error));
  };

  const updateRecipe = (id, difficulty, ingredients, instructions) => {
    api
      .patch(`/recipes/${id}/`, {
        difficulty,
        ingredients_ids: ingredients,
        instructions,
      })
      .then((res) => {
        if (res.status === 200) alert("Recipe Updated!");
        else alert("Failed to update recipe!");
        getRecipes();
      })
      .catch((error) => alert(error));
  };

  const createRecipe = (e) => {
    e.preventDefault();
    api
      .post("/recipes/", {
        title,
        difficulty,
        ingredients_ids: selectedIngredients,
        instructions,
      })
      .then((res) => {
        if (res.status === 201) alert("Recipe created!");
        else alert("Failed to make recipe!");
        setTitle("");
        setDifficulty(1);
        setSelectedIngredients([]);
        setInstructions("");
        getRecipes();
      })
      .catch((error) => alert(error));
  };

  const createIngredient = (e) => {
    e.preventDefault();
    api
      .post("/ingredients/", {
        name: newIngredientName,
        category: newIngredientCategory,
      })
      .then((res) => {
        if (res.status === 201) alert("Ingredient added!");
        else alert("Failed to add ingredient!");
        setNewIngredientName("");
        setNewIngredientCategory("");
        getIngredientsList();
      })
      .catch((error) => alert(error));
  };

  const toggleIngredientSelection = (id) => {
    setSelectedIngredients((prev) =>
      prev.includes(id) ? prev.filter((ingId) => ingId !== id) : [...prev, id]
    );
  };

  const ingredientCategories = [
    "Dairy",
    "Fruit",
    "Veg",
    "Cupboard",
    "Meat",
    "Herbs",
    "Carbs",
    "Other",
  ];

  return (
    <div>
      <div>
        <h2>Recipes</h2>
        {recipes.map((recipe) => (
          <Recipe
            recipe={recipe}
            onDelete={deleteRecipe}
            onChange={updateRecipe}
            key={recipe.id}
            ingredientsList={ingredientsList}
          />
        ))}
      </div>
      <h2>Create a Recipe</h2>
      <form onSubmit={createRecipe}>
        <label htmlFor="title">Name:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br />
        <label htmlFor="instructions">Instructions:</label>
        <br />
        <textarea
          id="instructions"
          name="instructions"
          required
          onChange={(e) => setInstructions(e.target.value)}
          value={instructions}
        ></textarea>
        <br />
        <h4>Select Ingredients:</h4>
        <div className="ingredients-checkboxes">
          {ingredientsList.map((ingredient) => (
            <label key={ingredient.id} className="ingredient-checkbox">
              <input
                type="checkbox"
                value={ingredient.id}
                checked={selectedIngredients.includes(ingredient.id)}
                onChange={() => toggleIngredientSelection(ingredient.id)}
              />
              {ingredient.name} ({ingredient.category})
            </label>
          ))}
        </div>
        <br />
        <label htmlFor="difficulty">Difficulty (out of 10):</label>
        <br />
        <input
          type="number"
          id="diffifulty"
          name="difficulty"
          min="1"
          max="10"
          step="1"
          required
          onChange={(e) => setDifficulty(e.target.value)}
          value={difficulty}
        ></input>
        <br />
        <input type="submit" value="Submit"></input>
      </form>

      <div className="ingredient-list">
        <h2>Your Ingredients</h2>
        <ul>
          {ingredientsList.map((ing) => (
            <li key={ing.id}>
              {ing.name} ({ing.category})
            </li>
          ))}
        </ul>
      </div>
      <h2>Add Ingredient</h2>
      <form onSubmit={createIngredient}>
        <label>Name:</label>
        <br />
        <input
          type="text"
          value={newIngredientName}
          onChange={(e) => setNewIngredientName(e.target.value)}
          required
        />
        <br />
        <label>Category:</label>
        <br />
        <select
          value={newIngredientCategory}
          onChange={(e) => setNewIngredientCategory(e.target.value)}
          required
        >
          <option value="">-- Select a category --</option>
          {ingredientCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <br />
        <input type="submit" value="Add Ingredient" />
      </form>
    </div>
  );
}

export default Home;
