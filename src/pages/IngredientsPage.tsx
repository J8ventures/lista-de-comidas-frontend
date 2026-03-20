import React, { useState } from 'react';
import { Ingrediente, IngredienteCrear } from '../types';
import {
  useIngredients,
  useCreateIngredient,
  useUpdateIngredient,
  useDeleteIngredient,
} from '../hooks/useIngredients';
import { IngredientList } from '../components/ingredients/IngredientList';
import { IngredientForm } from '../components/ingredients/IngredientForm';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';

export const IngredientsPage: React.FC = () => {
  const { data: ingredientes = [], isLoading } = useIngredients();
  const createMutation = useCreateIngredient();
  const updateMutation = useUpdateIngredient();
  const deleteMutation = useDeleteIngredient();

  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState<Ingrediente | null>(null);

  const handleCreate = async (data: IngredienteCrear) => {
    await createMutation.mutateAsync(data);
    setShowCreate(false);
  };

  const handleUpdate = async (data: IngredienteCrear) => {
    if (!editing) return;
    await updateMutation.mutateAsync({ id: editing.id, data });
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar este ingrediente?')) await deleteMutation.mutateAsync(id);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Ingredientes</h1>
        <Button onClick={() => setShowCreate(true)}>+ Nuevo ingrediente</Button>
      </div>

      <IngredientList
        ingredientes={ingredientes}
        loading={isLoading}
        onEdit={setEditing}
        onDelete={handleDelete}
      />

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Nuevo ingrediente">
        <IngredientForm
          onSubmit={handleCreate}
          onCancel={() => setShowCreate(false)}
          loading={createMutation.isPending}
        />
      </Modal>

      <Modal open={!!editing} onClose={() => setEditing(null)} title="Editar ingrediente">
        <IngredientForm
          initial={editing ?? undefined}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(null)}
          loading={updateMutation.isPending}
        />
      </Modal>
    </div>
  );
};
