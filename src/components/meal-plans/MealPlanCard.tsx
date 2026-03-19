import React from 'react';
import { MealPlan } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface MealPlanCardProps {
  plan: MealPlan;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export const MealPlanCard: React.FC<MealPlanCardProps> = ({ plan, onView, onDelete }) => (
  <Card onClick={() => onView(plan.id)}>
    <div className="p-4 flex items-center justify-between">
      <div>
        <p className="font-medium text-gray-900">{plan.name}</p>
        <div className="flex gap-2 mt-1">
          <Badge label={plan.type} />
        </div>
        <p className="text-xs text-gray-400 mt-1">{plan.start_date} &rarr; {plan.end_date}</p>
      </div>
      <div className="flex gap-2" onClick={e => e.stopPropagation()}>
        <Button size="sm" variant="secondary" onClick={() => onView(plan.id)}>View</Button>
        <Button size="sm" variant="danger" onClick={() => onDelete(plan.id)}>Delete</Button>
      </div>
    </div>
  </Card>
);
