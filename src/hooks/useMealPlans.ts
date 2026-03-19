import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mealPlansService } from '../services/meal-plans.service';
import { PlanComidaCrear, EntradaPlanCrear } from '../types';

export const useMealPlans = () => {
  return useQuery({
    queryKey: ['planes-comida'],
    queryFn: () => mealPlansService.list(),
  });
};

export const useMealPlan = (id: string) => {
  return useQuery({
    queryKey: ['planes-comida', id],
    queryFn: () => mealPlansService.get(id),
    enabled: !!id,
  });
};

export const useCreateMealPlan = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: PlanComidaCrear) => mealPlansService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['planes-comida'] }),
  });
};

export const useUpdateMealPlan = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PlanComidaCrear> }) =>
      mealPlansService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['planes-comida'] }),
  });
};

export const useDeleteMealPlan = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => mealPlansService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['planes-comida'] }),
  });
};

export const useAddMealPlanEntry = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ idPlan, entrada }: { idPlan: string; entrada: EntradaPlanCrear }) =>
      mealPlansService.addEntry(idPlan, entrada),
    onSuccess: (_data, { idPlan }) => qc.invalidateQueries({ queryKey: ['planes-comida', idPlan] }),
  });
};

export const useMealList = (id: string) => {
  return useQuery({
    queryKey: ['planes-comida', id, 'lista-comidas'],
    queryFn: () => mealPlansService.getMealList(id),
    enabled: !!id,
  });
};

export const useGroceryList = (id: string) => {
  return useQuery({
    queryKey: ['planes-comida', id, 'lista-compras'],
    queryFn: () => mealPlansService.getGroceryList(id),
    enabled: !!id,
  });
};
