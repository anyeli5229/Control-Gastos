import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetails from "./ExpenseDetails";

export default function ExpensesList() {

    const { state } = useBudget();
    const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses]);

    return (
        <div>
            {isEmpty ?
                <p className="text-slate-600 font-bold text-2xl text-center mb-10">No hay gastos registrados aún.</p> :

                <>
                    <p className="text-slate-600 font-bold text-2xl text-center mb-10">Listado de gastos.</p>

                    {state.expenses.map(expense => (
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
