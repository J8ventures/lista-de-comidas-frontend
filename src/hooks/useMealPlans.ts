import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mealPlansService } from '../services/meal-plans.service';
import { MealPlanCreate, MealPlanEntryCreate } from '../types';

export const useMealPlans = () => {
  return useQuery({
    queryKey: ['meal-plans'],
    queryFn: () => mealPlansService.list(),
  });
};

export const useMealPlan = (id: string) => {
  return useQuery({
    queryKey: ['meal-plans', id],
    queryFn: () => mealPlansService.get(id),
    enabled: !!id,
  });
};

export const useCreateMealPlan = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: MealPlanCreate) => mealPlansService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['meal-plans'] }),
  });
};

export const useUpdateMealPlan = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<MealPlanCreate> }) =>
      mealPlansService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['meal-plans'] }),
  });
};

export const useDeleteMealPlan = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => mealPlansService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['meal-plans'] }),
  });
};

export const useAddMealPlanEntry = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ planId, entry }: { planId: string; entry: MealPlanEntryCreate }) =>
      mealPlansService.addEntry(planId, entry),
    onSuccess: (_data, { planId }) => qc.invalidateQueries({ queryKey: ['meal-plans', planId] }),
  });
};

export const useMealList = (id: string) => {
  return useQuery({
    queryKey: ['meal-plans', id, 'meal-list'],
    queryFn: () => mealPlansService.getMealList(id),
    enabled: !!id,
  });
};

export const useGroceryList = (id: string) => {
  return useQuery({
    queryKey: ['meal-plans', id, 'grocery-list'],
    queryFn: () => mealPlansService.getGroceryList(id),
    enabled: !!id,
  });
};
