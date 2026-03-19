import React from 'react';
import { PlanComida } from '../../types';
import { MealPlanCard } from './MealPlanCard';
import { Spinner } from '../ui/Spinner';

interface MealPlanListProps {
  planes: PlanComida[];
  loading?: boolean;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export const MealPlanList: React.FC<MealPlanListProps> = ({ planes, loading, onView, onDelete }) => {
  if (loading) return <Spinner />;
  if (!planes.length) return <p className="text-center text-gray-500 py-8">No se encontraron planes de comida.</p>;
  return (
    <div className="flex flex-col gap-3">
      {planes.map(p => <MealPlanCard key={p.id} plan={p} onView={onView} onDelete={onDelete} />)}
    </div>
  );
};
