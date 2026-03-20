import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipe } from '../hooks/useRecipes';
import { RecipeDetail } from '../components/recipes/RecipeDetail';
import { Spinner } from '../components/ui/Spinner';
import { Button } from '../components/ui/Button';

export const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: receta, isLoading } = useRecipe(id!);

  if (isLoading) return <Spinner />;
  if (!receta) return <p className="text-center text-gray-500 py-8">Receta no encontrada.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => navigate('/recetas')}>
          &larr; Volver
        </Button>
        <h1 className="text-xl font-bold text-gray-900">{receta.nombre}</h1>
      </div>
      <RecipeDetail receta={receta} />
    </div>
  );
};
