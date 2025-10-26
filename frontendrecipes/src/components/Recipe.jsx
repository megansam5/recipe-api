import React from "react";
import "../styles/Recipe.css";
import { useState } from "react";

function Recipe({ recipe, onDelete, onChange }) {
  const [updating, setUpdating] = useState(false);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [difficulty, setDifficulty] = useState(recipe.difficulty);
  const formattedDate = new Date(recipe.date_published).toLocaleDateString(
    "en-GB"
  );

  return (
    <div className="recipe-container">
      <p className="recipe-title">{recipe.title}</p>
      {updating ? (
        <textarea
          id="ingredients"
          name="ingredients"
          required
          onChange={(e) => setIngredients(e.target.value)}
          value={ingredients}
        ></textarea>
      ) : (
        <p className="recipe-ingredients">{recipe.ingredients}</p>
      )}
      {updating && <br />}
      {updating ? (
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
      ) : (
        <p className="recipe-difficulty">{recipe.difficulty}</p>
      )}
      <p className="recipe-date">{formattedDate}</p>
      <button className="delete-button" onClick={() => onDelete(recipe.id)}>
        Delete Recipe
      </button>
      {updating ? (
        <button
          className="update-button"
          onClick={() => {
            onChange(recipe.id, difficulty, ingredients);
            setUpdating(false);
          }}
        >
          Submit update
        </button>
      ) : (
        <button className="update-button" onClick={() => setUpdating(true)}>
          Update Recipe
        </button>
      )}
    </div>
  );
}
export default Recipe;
