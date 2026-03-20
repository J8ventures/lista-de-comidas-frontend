import React from 'react';
import { PlanComida } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface MealPlanCardProps {
  plan: PlanComida;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export const MealPlanCard: React.FC<MealPlanCardProps> = ({ plan, onView, onDelete }) => (
  <Card onClick={() => onView(plan.id)}>
    <div className="p-4 flex items-center justify-between">
      <div>
        <p className="font-medium text-gray-900">{plan.nombre}</p>
        <div className="flex gap-2 mt-1">
          <Badge label={plan.tipo} />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          {plan.fecha_inicio} &rarr; {plan.fecha_fin}
        </p>
      </div>
      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
        <Button size="sm" variant="secondary" onClick={() => onView(plan.id)}>
          Ver
        </Button>
        <Button size="sm" variant="danger" onClick={() => onDelete(plan.id)}>
          Eliminar
        </Button>
      </div>
    </div>
  </Card>
);
