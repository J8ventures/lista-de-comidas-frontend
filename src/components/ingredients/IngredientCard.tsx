import React from 'react';
import { Ingrediente } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface IngredientCardProps {
  ingrediente: Ingrediente;
  onEdit: (ingrediente: Ingrediente) => void;
  onDelete: (id: string) => void;
}

export const IngredientCard: React.FC<IngredientCardProps> = ({ ingrediente, onEdit, onDelete }) => (
  <Card>
    <div className="p-4 flex items-center justify-between">
      <div>
        <p className="font-medium text-gray-900">{ingrediente.nombre}</p>
        <p className="text-sm text-gray-500 mt-0.5">Unidad: {ingrediente.unidad}</p>
        <Badge label={ingrediente.grupo_nutricional} className="mt-1" />
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" onClick={() => onEdit(ingrediente)}>Editar</Button>
        <Button size="sm" variant="danger" onClick={() => onDelete(ingrediente.id)}>Eliminar</Button>
      </div>
    </div>
  </Card>
);
