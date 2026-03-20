import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useMealPlan,
  useAddMealPlanEntry,
  useMealList,
  useGroceryList,
} from '../hooks/useMealPlans';
import { useRecipes } from '../hooks/useRecipes';
import { MealPlanDetail } from '../components/meal-plans/MealPlanDetail';
import { MealPlanEntryEditor } from '../components/meal-plans/MealPlanEntryEditor';
import { Spinner } from '../components/ui/Spinner';
import { Button } from '../components/ui/Button';
import { EntradaPlanCrear } from '../types';

export const MealPlanDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: plan, isLoading } = useMealPlan(id!);
  const { data: mealList } = useMealList(id!);
  const { data: groceryList } = useGroceryList(id!);
  const { data: recetas = [] } = useRecipes();
  const addEntryMutation = useAddMealPlanEntry();

  if (isLoading) return <Spinner />;
  if (!plan) return <p className="text-center text-gray-500 py-8">Plan de comida no encontrado.</p>;

  const handleAddEntry = async (entrada: EntradaPlanCrear) => {
    await addEntryMutation.mutateAsync({ idPlan: id!, entrada });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => navigate('/planes-comida')}>
          &larr; Volver
        </Button>
      </div>
      <MealPlanDetail plan={plan} mealList={mealList} groceryList={groceryList} />
      {recetas.length > 0 && (
        <div className="mt-6">
          <MealPlanEntryEditor recetas={recetas} onAdd={handleAddEntry} planId={id!} />
        </div>
      )}
    </div>
  );
};
