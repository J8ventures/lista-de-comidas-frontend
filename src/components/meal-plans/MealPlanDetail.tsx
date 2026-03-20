import React from 'react';
import { PlanComida, EntradaPlanComida, ListaCompras } from '../../types';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

interface MealPlanDetailProps {
  plan: PlanComida;
  mealList?: EntradaPlanComida[];
  groceryList?: ListaCompras;
}

export const MealPlanDetail: React.FC<MealPlanDetailProps> = ({
  plan,
  mealList = [],
  groceryList,
}) => (
  <div className="flex flex-col gap-6">
    <Card>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">{plan.nombre}</h1>
        <div className="flex gap-3 mt-2">
          <Badge label={plan.tipo} />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {plan.fecha_inicio} &rarr; {plan.fecha_fin}
        </p>
      </div>
    </Card>

    {mealList.length > 0 && (
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Horario de comidas</h2>
          <div className="flex flex-col gap-2">
            {mealList.map((entrada) => (
              <div key={entrada.id} className="flex items-center gap-3 py-2 border-b last:border-0">
                <Badge label={entrada.tipo_comida} />
                <div>
                  <p className="text-sm font-medium">{entrada.fecha}</p>
                  <p className="text-xs text-gray-500">
                    {entrada.receta?.nombre ?? entrada.id_receta}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    )}

    {groceryList && (
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Lista de compras</h2>
          {groceryList.requeridos.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Requeridos</p>
              <ul className="flex flex-col gap-1">
                {groceryList.requeridos.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex gap-2">
                    <span className="text-green-600">&#10003;</span>
                    {item.ingrediente.nombre} -- {item.cantidad} {item.unidad}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {groceryList.opcionales.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Opcionales</p>
              <ul className="flex flex-col gap-1">
                {groceryList.opcionales.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-500 flex gap-2">
                    <span>&#9675;</span>
                    {item.ingrediente.nombre} -- {item.cantidad} {item.unidad}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
    )}
  </div>
);
