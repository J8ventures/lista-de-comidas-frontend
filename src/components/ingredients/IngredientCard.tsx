import React from 'react';
import { Ingredient } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface IngredientCardProps {
  ingredient: Ingredient;
  onEdit: (ingredient: Ingredient) => void;
  onDelete: (id: string) => void;
}

export const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient, onEdit, onDelete }) => (
  <Card>
    <div className="p-4 flex items-center justify-between">
      <div>
        <p className="font-medium text-gray-900">{ingredient.name}</p>
        <p className="text-sm text-gray-500 mt-0.5">Unit: {ingredient.unit}</p>
        <Badge label={ingredient.nutritional_group} className="mt-1" />
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" onClick={() => onEdit(ingredient)}>Edit</Button>
        <Button size="sm" variant="danger" onClick={() => onDelete(ingredient.id)}>Delete</Button>
      </div>
    </div>
  </Card>
);
