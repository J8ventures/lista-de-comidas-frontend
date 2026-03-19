import React from 'react';

const colorMap: Record<string, string> = {
  PROTEINS: 'bg-red-100 text-red-700',
  CARBOHYDRATES: 'bg-yellow-100 text-yellow-700',
  VEGETABLES: 'bg-green-100 text-green-700',
  FRUITS: 'bg-orange-100 text-orange-700',
  DAIRY: 'bg-blue-100 text-blue-700',
  FATS: 'bg-purple-100 text-purple-700',
  LEGUMES: 'bg-amber-100 text-amber-700',
  GRAINS: 'bg-lime-100 text-lime-700',
  OTHER: 'bg-gray-100 text-gray-600',
  required: 'bg-green-100 text-green-700',
  replaceable: 'bg-yellow-100 text-yellow-700',
  optional: 'bg-gray-100 text-gray-600',
  breakfast: 'bg-orange-100 text-orange-700',
  lunch: 'bg-blue-100 text-blue-700',
  dinner: 'bg-indigo-100 text-indigo-700',
  snack: 'bg-pink-100 text-pink-700',
};

interface BadgeProps {
  label: string;
  colorKey?: string;
}

export const Badge: React.FC<BadgeProps> = ({ label, colorKey }) => {
  const key = colorKey ?? label;
  const color = colorMap[key] ?? 'bg-gray-100 text-gray-600';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  );
};
