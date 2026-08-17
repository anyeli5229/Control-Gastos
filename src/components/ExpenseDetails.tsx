import { useMemo } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { formatDate, formatCurrency } from "../helpers"
import type { Expense } from "../types"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"

type ExpenseDetailsProps = {
    expense: Expense;
}

export default function ExpenseDetails({ expense }: ExpenseDetailsProps) {
    const { dispatch } = useBudget();
    const categoryInfo = useMemo(() => categories.find(cat => cat.id === expense.category), [expense]);

    const x = useMotionValue(0);

    const editOpacity = useTransform(x, [0, 80], [0, 1]);
    const deleteOpacity = useTransform(x, [-80, 0], [1, 0]);

    const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
        // Deslizar a la derecha (> 100px) -> Editar gasto
        if (info.offset.x > 100) {
            dispatch({ type: "get-expense-by-id", payload: { id: expense.id } });
        } 
        // Deslizar a la izquierda (< -100px) -> Eliminar gasto
        else if (info.offset.x < -100) {
            dispatch({ type: "remove-expense", payload: { id: expense.id } });
        }
    };

    return (
        <div className="relative overflow-hidden my-3 rounded-2xl select-none shadow-sm">
            {/* Fondo Acción Izquierda (Editar / Actualizar) */}
            <motion.div 
                style={{ opacity: editOpacity }}
                className="absolute inset-y-0 left-0 w-1/2 bg-blue-500 text-white font-bold flex items-center justify-start pl-6 rounded-l-2xl"
            >
                Actualizar
            </motion.div>

            {/* Fondo Acción Derecha (Eliminar) */}
            <motion.div 
                style={{ opacity: deleteOpacity }}
                className="absolute inset-y-0 right-0 w-1/2 bg-rose-600 text-white font-bold flex items-center justify-end pr-6 rounded-r-2xl"
            >
                Eliminar
            </motion.div>

            {/* Tarjeta Deslizable */}
            <motion.div
                style={{ x }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={handleDragEnd}
                className="relative bg-white border border-slate-100 p-5 rounded-2xl w-full flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing z-10"
            >
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
                        <p className="text-lg font-bold text-slate-800 leading-tight">
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
            </motion.div>
        </div>
    )
}