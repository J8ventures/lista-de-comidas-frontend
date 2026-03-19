import React from 'react';
import { MealPlan } from '../../types';
import { MealPlanCard } from './MealPlanCard';
import { Spinner } from '../ui/Spinner';

interface MealPlanListProps {
  plans: MealPlan[];
  loading?: boolean;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export const MealPlanList: React.FC<MealPlanListProps> = ({ plans, loading, onView, onDelete }) => {
  if (loading) return <Spinner />;
  if (!plans.length) return <p className="text-center text-gray-500 py-8">No meal plans found.</p>;
  return (
    <div className="flex flex-col gap-3">
      {plans.map(p => <MealPlanCard key={p.id} plan={p} onView={onView} onDelete={onDelete} />)}
    </div>
  );
};
