import React, { useState } from 'react';
import { Recipe, MealPlanEntryCreate, MealType } from '../../types';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ReplaceableIngredientSelector } from './ReplaceableIngredientSelector';

const MEAL_TYPES: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

interface MealPlanEntryEditorProps {
  recipes: Recipe[];
  onAdd: (entry: MealPlanEntryCreate) => Promise<void>;
  planId: string;
}

export const MealPlanEntryEditor: React.FC<MealPlanEntryEditorProps> = ({ recipes, onAdd }) => {
  const [date, setDate] = useState('');
  const [mealType, setMealType] = useState<MealType>('lunch');
  const [recipeId, setRecipeId] = useState(recipes[0]?.id ?? '');
  const [showSelector, setShowSelector] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedRecipe = recipes.find(r => r.id === recipeId);
  const replaceableIngredients = selectedRecipe?.ingredients?.filter(ri => ri.role === 'replaceable') ?? [];

  const handleAdd = async (selectedIngredients: Record<string, string> = {}) => {
    if (!date || !recipeId) return;
    setLoading(true);
    try {
      await onAdd({ date, meal_type: mealType, recipe_id: recipeId, selected_ingredients: selectedIngredients });
      setDate('');
    } finally {
      setLoading(false);
      setShowSelector(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replaceableIngredients.length > 0) {
      setShowSelector(true);
    } else {
      handleAdd({});
    }
  };

  const recipeOptions = recipes.map(r => ({ value: r.id, label: r.name }));
  const mealTypeOptions = MEAL_TYPES.map(m => ({ value: m, label: m }));

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 border rounded-lg p-4 bg-gray-50">
        <p className="text-sm font-medium text-gray-700">Add meal</p>
        <div className="grid grid-cols-2 gap-3">
          <Input label="Date" type="date" value={date} onChange={e => setDate(e.target.value)} required />
          <Select label="Meal type" value={mealType} onChange={e => setMealType(e.target.value as MealType)} options={mealTypeOptions} />
        </div>
        <Select label="Recipe" value={recipeId} onChange={e => setRecipeId(e.target.value)} options={recipeOptions} />
        <Button type="submit" loading={loading}>Add to plan</Button>
      </form>

      {showSelector && (
        <ReplaceableIngredientSelector
          open={showSelector}
          replaceableIngredients={replaceableIngredients}
          onConfirm={handleAdd}
          onCancel={() => setShowSelector(false)}
        />
      )}
    </>
  );
};
