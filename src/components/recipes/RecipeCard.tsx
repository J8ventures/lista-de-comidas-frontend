import React from 'react';
import { Receta } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface RecipeCardProps {
  receta: Receta;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ receta, onView, onDelete }) => (
  <Card onClick={() => onView(receta.id)}>
    <div className="p-4 flex items-center justify-between">
      <div>
        <p className="font-medium text-gray-900">{receta.nombre}</p>
        {receta.descripcion && (
          <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{receta.descripcion}</p>
        )}
        <div className="flex gap-3 text-xs text-gray-400 mt-1">
          <span>Porciones: {receta.porciones}</span>
          <span>Prep: {receta.tiempo_preparacion}m</span>
          <span>Cocción: {receta.tiempo_coccion}m</span>
        </div>
      </div>
      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
        <Button size="sm" variant="secondary" onClick={() => onView(receta.id)}>
          Ver
        </Button>
        <Button size="sm" variant="danger" onClick={() => onDelete(receta.id)}>
          Eliminar
        </Button>
      </div>
    </div>
  </Card>
);
