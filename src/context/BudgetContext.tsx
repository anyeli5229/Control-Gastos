import { createContext, useMemo, useReducer, type Dispatch, type ReactNode } from "react";
import { BudgetReducer, intialState, type BudgetActions, type BudgetState } from "../reducers/budget-reducer";

type BudgetContextProps = {
    state: BudgetState,
    dispatch: Dispatch<BudgetActions>,
    totalExpense: number,
    remainingBudget: number
}

export const BudgetContext = createContext<BudgetContextProps>(null!);



type BudgetProviderProps = {
    children: ReactNode
}
export function BudgetProvider({ children }: BudgetProviderProps) {

    const [state, dispatch] = useReducer(BudgetReducer, intialState);

    const totalExpense = useMemo(() => state.expenses.reduce((total, expense) => +expense.amount + total, 0), [state.expenses]);
    const remainingBudget = state.budget - totalExpense;

    return (
        <BudgetContext.Provider
            value={{ state, dispatch, totalExpense, remainingBudget }}
        >
            {children}
        </BudgetContext.Provider>
    )
}