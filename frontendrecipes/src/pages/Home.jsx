import { useState, useEffect } from "react";
import api from "../api";
import Recipe from "../components/Recipe";
import "../styles/Home.css";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState("");
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState(1);

  useEffect(() => {
    getRecipes();
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

  const updateRecipe = (id, difficulty, ingredients) => {
    api
      .patch(`/recipes/${id}/`, { difficulty, ingredients })
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
      .post("/recipes/", { title, difficulty, ingredients })
      .then((res) => {
        if (res.status === 201) alert("Recipe created!");
        else alert("Failed to make recipe!");
        getRecipes();
      })
      .catch((error) => alert(error));
  };

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
        <label htmlFor="ingredients">Ingredients:</label>
        <br />
        <textarea
          id="ingredients"
          name="ingredients"
          required
          onChange={(e) => setIngredients(e.target.value)}
          value={ingredients}
        ></textarea>
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
    </div>
  );
}

export default Home;
