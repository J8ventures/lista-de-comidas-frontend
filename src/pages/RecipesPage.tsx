import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecipeCreate } from '../types';
import { useRecipes, useCreateRecipe, useDeleteRecipe } from '../hooks/useRecipes';
import { RecipeList } from '../components/recipes/RecipeList';
import { RecipeForm } from '../components/recipes/RecipeForm';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';

export const RecipesPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: recipes = [], isLoading } = useRecipes();
  const createMutation = useCreateRecipe();
  const deleteMutation = useDeleteRecipe();
  const [showCreate, setShowCreate] = useState(false);

  const handleCreate = async (data: RecipeCreate) => {
    const recipe = await createMutation.mutateAsync(data);
    setShowCreate(false);
    navigate(`/recipes/${recipe.id}`);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this recipe?')) await deleteMutation.mutateAsync(id);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Recipes</h1>
        <Button onClick={() => setShowCreate(true)}>+ New recipe</Button>
      </div>

      <RecipeList recipes={recipes} loading={isLoading} onView={id => navigate(`/recipes/${id}`)} onDelete={handleDelete} />

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="New recipe" size="lg">
        <RecipeForm onSubmit={handleCreate} onCancel={() => setShowCreate(false)} loading={createMutation.isPending} />
      </Modal>
    </div>
  );
};
