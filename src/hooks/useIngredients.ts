import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ingredientsService } from '../services/ingredients.service';
import { IngredienteCrear, GrupoNutricional } from '../types';

export const useIngredients = (grupo_nutricional?: GrupoNutricional) => {
  return useQuery({
    queryKey: ['ingredientes', grupo_nutricional],
    queryFn: () => ingredientsService.list(grupo_nutricional),
  });
};

export const useIngredient = (id: string) => {
  return useQuery({
    queryKey: ['ingredientes', id],
    queryFn: () => ingredientsService.get(id),
    enabled: !!id,
  });
};

export const useCreateIngredient = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: IngredienteCrear) => ingredientsService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['ingredientes'] }),
  });
};

export const useUpdateIngredient = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<IngredienteCrear> }) =>
      ingredientsService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['ingredientes'] }),
  });
};

export const useDeleteIngredient = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ingredientsService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['ingredientes'] }),
  });
};
