import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { recipesService } from '../services/recipes.service';
import { RecipeCreate } from '../types';

export const useRecipes = (params?: { ingredient_id?: string; nutritional_group?: string }) => {
  return useQuery({
    queryKey: ['recipes', params],
    queryFn: () => recipesService.list(params),
  });
};

export const useRecipe = (id: string) => {
  return useQuery({
    queryKey: ['recipes', id],
    queryFn: () => recipesService.get(id),
    enabled: !!id,
  });
};

export const useCreateRecipe = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: RecipeCreate) => recipesService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['recipes'] }),
  });
};

export const useUpdateRecipe = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<RecipeCreate> }) =>
      recipesService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['recipes'] }),
  });
};

export const useDeleteRecipe = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => recipesService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['recipes'] }),
  });
};
