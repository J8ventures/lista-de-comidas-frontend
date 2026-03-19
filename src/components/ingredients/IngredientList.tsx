import React from 'react';
import { Ingredient } from '../../types';
import { IngredientCard } from './IngredientCard';
import { Spinner } from '../ui/Spinner';

interface IngredientListProps {
  ingredients: Ingredient[];
  loading?: boolean;
  onEdit: (ingredient: Ingredient) => void;
  onDelete: (id: string) => void;
}

export const IngredientList: React.FC<IngredientListProps> = ({ ingredients, loading, onEdit, onDelete }) => {
  if (loading) return <Spinner />;
  if (!ingredients.length) return <p className="text-center text-gray-500 py-8">No ingredients found.</p>;
  return (
    <div className="flex flex-col gap-3">
      {ingredients.map(ing => (
        <IngredientCard key={ing.id} ingredient={ing} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};
