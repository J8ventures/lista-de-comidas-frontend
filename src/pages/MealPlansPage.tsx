import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MealPlanCreate } from '../types';
import { useMealPlans, useCreateMealPlan, useDeleteMealPlan } from '../hooks/useMealPlans';
import { MealPlanList } from '../components/meal-plans/MealPlanList';
import { MealPlanForm } from '../components/meal-plans/MealPlanForm';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';

export const MealPlansPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: plans = [], isLoading } = useMealPlans();
  const createMutation = useCreateMealPlan();
  const deleteMutation = useDeleteMealPlan();
  const [showCreate, setShowCreate] = useState(false);

  const handleCreate = async (data: MealPlanCreate) => {
    const plan = await createMutation.mutateAsync(data);
    setShowCreate(false);
    navigate(`/meal-plans/${plan.id}`);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this meal plan?')) await deleteMutation.mutateAsync(id);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Meal Plans</h1>
        <Button onClick={() => setShowCreate(true)}>+ New plan</Button>
      </div>

      <MealPlanList plans={plans} loading={isLoading} onView={id => navigate(`/meal-plans/${id}`)} onDelete={handleDelete} />

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="New meal plan">
        <MealPlanForm onSubmit={handleCreate} onCancel={() => setShowCreate(false)} loading={createMutation.isPending} />
      </Modal>
    </div>
  );
};
