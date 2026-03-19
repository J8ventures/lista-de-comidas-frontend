import React, { useState } from 'react';
import { Ingredient, IngredientCreate } from '../types';
import { useIngredients, useCreateIngredient, useUpdateIngredient, useDeleteIngredient } from '../hooks/useIngredients';
import { IngredientList } from '../components/ingredients/IngredientList';
import { IngredientForm } from '../components/ingredients/IngredientForm';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';

export const IngredientsPage: React.FC = () => {
  const { data: ingredients = [], isLoading } = useIngredients();
  const createMutation = useCreateIngredient();
  const updateMutation = useUpdateIngredient();
  const deleteMutation = useDeleteIngredient();

  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState<Ingredient | null>(null);

  const handleCreate = async (data: IngredientCreate) => {
    await createMutation.mutateAsync(data);
    setShowCreate(false);
  };

  const handleUpdate = async (data: IngredientCreate) => {
    if (!editing) return;
    await updateMutation.mutateAsync({ id: editing.id, data });
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this ingredient?')) await deleteMutation.mutateAsync(id);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Ingredients</h1>
        <Button onClick={() => setShowCreate(true)}>+ New ingredient</Button>
      </div>

      <IngredientList ingredients={ingredients} loading={isLoading} onEdit={setEditing} onDelete={handleDelete} />

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="New ingredient">
        <IngredientForm onSubmit={handleCreate} onCancel={() => setShowCreate(false)} loading={createMutation.isPending} />
      </Modal>

      <Modal open={!!editing} onClose={() => setEditing(null)} title="Edit ingredient">
        <IngredientForm initial={editing ?? undefined} onSubmit={handleUpdate} onCancel={() => setEditing(null)} loading={updateMutation.isPending} />
      </Modal>
    </div>
  );
};
