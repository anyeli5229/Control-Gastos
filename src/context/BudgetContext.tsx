import { createContext, useReducer, type Dispatch, type ReactNode } from "react";
import { BudgetReducer, intialState, type BudgetActions, type BudgetState } from "../reducers/budget-reducer";

type BudgetContextProps = {
    state: BudgetState,
    dispatch: Dispatch<BudgetActions>
}

export const BudgetContext = createContext<BudgetContextProps>(null!);



type BudgetProviderProps = {
    children : ReactNode
}
export function BudgetProvider({children} : BudgetProviderProps ) {

    const [state, dispatch] = useReducer(BudgetReducer, intialState);

    return (
        <BudgetContext.Provider
            value={{state, dispatch}}
        >
            {children}
        </BudgetContext.Provider>
    )
}