import React from "react";
import "../styles/Recipe.css";
import { useState } from "react";

function Recipe({ recipe, onDelete, onChange, ingredientsList }) {
  const [updating, setUpdating] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState(
    recipe.ingredients
  );
  const [instructions, setInstructions] = useState(recipe.instructions);
  const [difficulty, setDifficulty] = useState(recipe.difficulty);
  const formattedDate = new Date(recipe.date_published).toLocaleDateString(
    "en-GB"
  );
  const toggleIngredientSelection = (id) => {
    setSelectedIngredients((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleUpdate = () => {
    const ingredientIds = selectedIngredients.filter(
      (ing) => typeof ing === "number"
    );
    onChange(recipe.id, difficulty, ingredientIds, instructions);
    setUpdating(false);
  };

  return (
    <div className="recipe-container">
      <p className="recipe-title">{recipe.title}</p>
      {updating ? (
        <textarea
          id="instructions"
          name="instructions"
          required
          onChange={(e) => setInstructions(e.target.value)}
          value={instructions}
        ></textarea>
      ) : (
        <p className="recipe-ingredients">{recipe.instructions}</p>
      )}
      {updating ? (
        <div className="ingredients-checkboxes">
          {ingredientsList.map((ing) => (
            <label key={ing.id} className="ingredient-checkbox">
              <input
                type="checkbox"
                value={ing.id}
                checked={selectedIngredients.includes(ing.id)}
                onChange={() => toggleIngredientSelection(ing.id)}
              />
              {ing.name} ({ing.category})
            </label>
          ))}
        </div>
      ) : (
        <p className="recipe-ingredients">
          {recipe.ingredients.map((ing) => ing.name).join(", ")}
        </p>
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
        <button className="update-button" onClick={handleUpdate}>
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
