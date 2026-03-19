import React from 'react';
import { Recipe } from '../../types';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

interface RecipeDetailProps {
  recipe: Recipe;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe }) => (
  <div className="flex flex-col gap-6">
    <Card>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">{recipe.name}</h1>
        {recipe.description && <p className="text-gray-600 mt-2">{recipe.description}</p>}
        <div className="flex gap-6 mt-4 text-sm text-gray-500">
          <span><strong>Servings:</strong> {recipe.servings}</span>
          <span><strong>Prep:</strong> {recipe.prep_time} min</span>
          <span><strong>Cook:</strong> {recipe.cook_time} min</span>
        </div>
      </div>
    </Card>

    {recipe.ingredients && recipe.ingredients.length > 0 && (
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Ingredients</h2>
          <div className="flex flex-col gap-3">
            {recipe.ingredients.map((ri, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Badge label={ri.role} />
                <div>
                  <p className="text-sm font-medium">{ri.ingredient?.name ?? ri.ingredient_id}</p>
                  <p className="text-xs text-gray-500">{ri.quantity} {ri.unit}</p>
                  {ri.role === 'replaceable' && ri.alternatives.length > 0 && (
                    <div className="mt-1">
                      <p className="text-xs text-gray-400">Alternatives:</p>
                      {ri.alternatives.map((alt, ai) => (
                        <p key={ai} className="text-xs text-gray-500 ml-2">
                          - {alt.ingredient?.name ?? alt.ingredient_id} -- {alt.quantity} {alt.unit}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    )}
  </div>
);
