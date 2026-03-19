import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { recipesService } from '../services/recipes.service';
import { RecetaCrear } from '../types';

export const useRecipes = (params?: { id_ingrediente?: string; grupo_nutricional?: string }) => {
  return useQuery({
    queryKey: ['recetas', params],
    queryFn: () => recipesService.list(params),
  });
};

export const useRecipe = (id: string) => {
  return useQuery({
    queryKey: ['recetas', id],
    queryFn: () => recipesService.get(id),
    enabled: !!id,
  });
};

export const useCreateRecipe = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: RecetaCrear) => recipesService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['recetas'] }),
  });
};

export const useUpdateRecipe = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<RecetaCrear> }) =>
      recipesService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['recetas'] }),
  });
};

export const useDeleteRecipe = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => recipesService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['recetas'] }),
  });
};
