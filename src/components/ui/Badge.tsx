import React from 'react';

const colorMap: Record<string, string> = {
  PROTEINAS: 'bg-red-100 text-red-700',
  CARBOHIDRATOS: 'bg-yellow-100 text-yellow-700',
  VERDURAS: 'bg-green-100 text-green-700',
  FRUTAS: 'bg-orange-100 text-orange-700',
  LACTEOS: 'bg-blue-100 text-blue-700',
  GRASAS: 'bg-purple-100 text-purple-700',
  LEGUMBRES: 'bg-amber-100 text-amber-700',
  CEREALES: 'bg-lime-100 text-lime-700',
  OTRO: 'bg-gray-100 text-gray-600',
  requerido: 'bg-green-100 text-green-700',
  reemplazable: 'bg-yellow-100 text-yellow-700',
  opcional: 'bg-gray-100 text-gray-600',
  desayuno: 'bg-orange-100 text-orange-700',
  almuerzo: 'bg-blue-100 text-blue-700',
  cena: 'bg-indigo-100 text-indigo-700',
  merienda: 'bg-pink-100 text-pink-700',
  semanal: 'bg-teal-100 text-teal-700',
  quincenal: 'bg-cyan-100 text-cyan-700',
};

interface BadgeProps {
  label: string;
  colorKey?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ label, colorKey, className }) => {
  const key = colorKey ?? label;
  const color = colorMap[key] ?? 'bg-gray-100 text-gray-600';
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${color}${className ? ` ${className}` : ''}`}
    >
      {label}
    </span>
  );
};
