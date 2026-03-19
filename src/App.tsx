import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IngredientsPage } from './pages/IngredientsPage';
import { RecipesPage } from './pages/RecipesPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { MealPlansPage } from './pages/MealPlansPage';
import { MealPlanDetailPage } from './pages/MealPlanDetailPage';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 2 } },
});

const navItems = [
  { to: '/ingredientes', label: 'Ingredientes' },
  { to: '/recetas', label: 'Recetas' },
  { to: '/planes-comida', label: 'Planes de comida' },
];

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white border-b shadow-sm sticky top-0 z-40">
            <div className="max-w-3xl mx-auto px-4 flex items-center gap-8 h-14">
              <span className="font-bold text-green-600 text-lg">Gestor de recetas</span>
              {navItems.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${isActive ? 'text-green-600' : 'text-gray-600 hover:text-gray-900'}`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </nav>
          <main>
            <Routes>
              <Route path="/" element={<IngredientsPage />} />
              <Route path="/ingredientes" element={<IngredientsPage />} />
              <Route path="/recetas" element={<RecipesPage />} />
              <Route path="/recetas/:id" element={<RecipeDetailPage />} />
              <Route path="/planes-comida" element={<MealPlansPage />} />
              <Route path="/planes-comida/:id" element={<MealPlanDetailPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
