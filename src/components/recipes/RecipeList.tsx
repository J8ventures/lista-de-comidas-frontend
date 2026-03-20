import React from 'react';
import { Receta } from '../../types';
import { RecipeCard } from './RecipeCard';
import { Spinner } from '../ui/Spinner';

interface RecipeListProps {
  recetas: Receta[];
  loading?: boolean;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export const RecipeList: React.FC<RecipeListProps> = ({ recetas, loading, onView, onDelete }) => {
  if (loading) return <Spinner />;
  if (!recetas.length)
    return <p className="text-center text-gray-500 py-8">No se encontraron recetas.</p>;
  return (
    <div className="flex flex-col gap-3">
      {recetas.map((r) => (
        <RecipeCard key={r.id} receta={r} onView={onView} onDelete={onDelete} />
      ))}
    </div>
  );
};
