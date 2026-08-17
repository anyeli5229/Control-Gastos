import { useMemo } from "react"
import { formatDate } from "../helpers"
import type { Expense } from "../types"
import { categories } from "../data/categories"
import { formatCurrency } from "../helpers"

type ExpenseDetailsProps = {
    expense: Expense;
}

export default function ExpenseDetails({ expense }: ExpenseDetailsProps) {
    
    const categoryInfo = useMemo(() => categories.find(cat => cat.id === expense.category),[expense]);

    return (
        <div className="bg-white shadow-sm hover:shadow-md border border-slate-100 p-5 rounded-2xl w-full flex items-center justify-between gap-4 transition-all my-3">
            <div className="flex items-center gap-4">
                <div className="p-3">
                    <img 
                        src={`/icono_${categoryInfo?.icon}.svg`} 
                        alt={`Icono de ${categoryInfo?.name}`} 
                        className="size-12" 
                    />
                </div>

                <div className="space-y-0.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wide">
                        {categoryInfo?.name}
                    </span>
                    <p className="text-lg font-bold text-slate-800">
                        {expense.expenseName}
                    </p>
                    <p className="text-xs font-medium text-slate-400">
                        {formatDate(expense.date!.toString())}
                    </p>
                </div>
            </div>

            <div className="text-right">
                <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                    {formatCurrency(+expense.amount)}
                </span>
            </div>
        </div>
    )
}