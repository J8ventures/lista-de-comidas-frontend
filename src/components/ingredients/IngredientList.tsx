import React from 'react';
import { Ingrediente } from '../../types';
import { IngredientCard } from './IngredientCard';
import { Spinner } from '../ui/Spinner';

interface IngredientListProps {
  ingredientes: Ingrediente[];
  loading?: boolean;
  onEdit: (ingrediente: Ingrediente) => void;
  onDelete: (id: string) => void;
}

export const IngredientList: React.FC<IngredientListProps> = ({ ingredientes, loading, onEdit, onDelete }) => {
  if (loading) return <Spinner />;
  if (!ingredientes.length) return <p className="text-center text-gray-500 py-8">No se encontraron ingredientes.</p>;
  return (
    <div className="flex flex-col gap-3">
      {ingredientes.map(ing => (
        <IngredientCard key={ing.id} ingrediente={ing} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};
