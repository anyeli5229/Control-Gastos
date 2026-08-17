import { useMemo, useState, type ChangeEvent, type SubmitEvent } from "react";
import { useBudget } from "../hooks/useBudget";

export default function BudgetForm() {
    const [budget, setBudget] = useState("");
    const { dispatch } = useBudget();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.value);
    };

    const isValid = useMemo(() => {
        return isNaN(+budget) || +budget <= 0;
    }, [budget]);

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({type: "add-budget", payload: {budget: +budget}})
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-5 flex flex-col">
                <label htmlFor="budget" className="text-2xl text-pink-600 font-bold text-center">
                    Definir presupuesto
                </label>

                <input
                    id="budget"
                    type="number"
                    className="w-full bg-white border border-gray-200 p-2"
                    placeholder="Define tu presupuesto"
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                value="Definir presupuesto"
                className="bg-pink-600 hover:bg-pink-700 cursor-pointer w-full text-white font-bold uppercase transition-all p-2 disabled:opacity-40"
                disabled={isValid}
                />
        </form>
    )
}
