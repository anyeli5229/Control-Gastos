import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetails from "./ExpenseDetails";

export default function ExpensesList() {

    const { state } = useBudget();
    const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses;
    const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses]);

    return (
        <div>
            {isEmpty ?
                <p className="text-slate-600 font-bold text-2xl text-center mb-10">No hay gastos registrados aún.</p> :

                <>
                    <p className="text-slate-600 font-bold text-2xl text-center mb-10">Listado de gastos.</p>

                    {filteredExpenses.map(expense => (
                        <ExpenseDetails
                            key={expense.id}
                            expense={expense}
                        />
                    ))}
                </>
            }
        </div>
    )
}
