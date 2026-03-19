import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ingredientsService } from '../services/ingredients.service';
import { IngredientCreate, NutritionalGroup } from '../types';

export const useIngredients = (nutritional_group?: NutritionalGroup) => {
  return useQuery({
    queryKey: ['ingredients', nutritional_group],
    queryFn: () => ingredientsService.list(nutritional_group),
  });
};

export const useIngredient = (id: string) => {
  return useQuery({
    queryKey: ['ingredients', id],
    queryFn: () => ingredientsService.get(id),
    enabled: !!id,
  });
};

export const useCreateIngredient = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: IngredientCreate) => ingredientsService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['ingredients'] }),
  });
};

export const useUpdateIngredient = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<IngredientCreate> }) =>
      ingredientsService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['ingredients'] }),
  });
};

export const useDeleteIngredient = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ingredientsService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['ingredients'] }),
  });
};
