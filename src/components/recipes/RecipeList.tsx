import React from 'react';
import { Recipe } from '../../types';
import { RecipeCard } from './RecipeCard';
import { Spinner } from '../ui/Spinner';

interface RecipeListProps {
  recipes: Recipe[];
  loading?: boolean;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export const RecipeList: React.FC<RecipeListProps> = ({ recipes, loading, onView, onDelete }) => {
  if (loading) return <Spinner />;
  if (!recipes.length) return <p className="text-center text-gray-500 py-8">No recipes found.</p>;
  return (
    <div className="flex flex-col gap-3">
      {recipes.map(r => <RecipeCard key={r.id} recipe={r} onView={onView} onDelete={onDelete} />)}
    </div>
  );
};
