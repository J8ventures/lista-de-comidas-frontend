import React from 'react';
import { Recipe } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface RecipeCardProps {
  recipe: Recipe;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onView, onDelete }) => (
  <Card onClick={() => onView(recipe.id)}>
    <div className="p-4 flex items-center justify-between">
      <div>
        <p className="font-medium text-gray-900">{recipe.name}</p>
        {recipe.description && <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{recipe.description}</p>}
        <div className="flex gap-3 text-xs text-gray-400 mt-1">
          <span>Servings: {recipe.servings}</span>
          <span>Prep: {recipe.prep_time}m</span>
          <span>Cook: {recipe.cook_time}m</span>
        </div>
      </div>
      <div className="flex gap-2" onClick={e => e.stopPropagation()}>
        <Button size="sm" variant="secondary" onClick={() => onView(recipe.id)}>View</Button>
        <Button size="sm" variant="danger" onClick={() => onDelete(recipe.id)}>Delete</Button>
      </div>
    </div>
  </Card>
);
