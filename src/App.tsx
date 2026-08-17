import { useEffect, useMemo } from "react";
import BudgetForm from "./components/BudgetForm";
import { useBudget } from "./hooks/useBudget";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import ExpensesList from "./components/ExpensesList";
import FilterByCategory from "./components/FilterByCategory";

function App() {
  const { state } = useBudget();
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

  useEffect(() => {
    localStorage.setItem("budget", state.budget.toString());
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
  }, [state.budget, state.expenses])

  return (
    <>
      <header className="bg-linear-to-r from-pink-600 via-rose-500 to-pink-500 pt-12 pb-28 px-4 shadow-md">
        <div className="max-w-4xl mx-auto text-center space-y-2">
          <h1 className="uppercase tracking-widest font-black text-3xl md:text-5xl text-white drop-shadow-sm">
            Planificador de gastos
          </h1>
          <p className="text-pink-100 font-medium text-sm md:text-base opacity-90">
            Toma el control total de tus finanzas personales
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 -mt-16 pb-16">
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 border border-slate-100 transition-all">
          {isValidBudget ? <BudgetTracker /> : <BudgetForm />}

        </div>
      </div>

      <main className="max-w-4xl mx-auto p-10">
        {isValidBudget && (
          <>
            <FilterByCategory/>
            <ExpensesList />
            <ExpenseModal />
          </>
        )}
      </main>

    </>
  )
}

export default App;