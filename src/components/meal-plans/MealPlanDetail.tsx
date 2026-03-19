import React from 'react';
import { MealPlan, MealPlanEntry } from '../../types';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

interface MealPlanDetailProps {
  plan: MealPlan;
  mealList?: MealPlanEntry[];
  groceryList?: { required: unknown[]; optional: unknown[] };
}

export const MealPlanDetail: React.FC<MealPlanDetailProps> = ({ plan, mealList = [], groceryList }) => (
  <div className="flex flex-col gap-6">
    <Card>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">{plan.name}</h1>
        <div className="flex gap-3 mt-2">
          <Badge label={plan.type} />
        </div>
        <p className="text-sm text-gray-500 mt-2">{plan.start_date} &rarr; {plan.end_date}</p>
      </div>
    </Card>

    {mealList.length > 0 && (
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Meal Schedule</h2>
          <div className="flex flex-col gap-2">
            {mealList.map(entry => (
              <div key={entry.id} className="flex items-center gap-3 py-2 border-b last:border-0">
                <Badge label={entry.meal_type} />
                <div>
                  <p className="text-sm font-medium">{entry.date}</p>
                  <p className="text-xs text-gray-500">{entry.recipe?.name ?? entry.recipe_id}</p>
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
          <h2 className="text-lg font-semibold mb-4">Grocery List</h2>
          {groceryList.required.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Required</p>
              <ul className="flex flex-col gap-1">
                {(groceryList.required as Array<{ingredient: {name: string}; quantity: number; unit: string}>).map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex gap-2">
                    <span className="text-green-600">&#10003;</span>
                    {item.ingredient.name} -- {item.quantity} {item.unit}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {groceryList.optional.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Optional</p>
              <ul className="flex flex-col gap-1">
                {(groceryList.optional as Array<{ingredient: {name: string}; quantity: number; unit: string}>).map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-500 flex gap-2">
                    <span>&#9675;</span>
                    {item.ingredient.name} -- {item.quantity} {item.unit}
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
