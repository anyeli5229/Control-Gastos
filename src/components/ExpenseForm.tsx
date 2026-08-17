import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import type { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";


export default function ExpenseForm() {

    const initialValues = {
        amount: "",
        expenseName: "",
        category: "",
        date: new Date()
    }

    const [expense, setExpense] = useState<DraftExpense> (initialValues);

    const [error, setError] = useState("");

    const { dispatch } = useBudget();

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        const isAmountField = ["amount"].includes(name);
        setExpense({
            ...expense,
            [name]: isAmountField ? (value === "" ? "" : +value) : value//Eliminar el cero del form
        })
    }

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(Object.values(expense).includes("")) {//Si almenos algún campo de expense contiene un string vacío
            setError("Todos los campos son obligatorios");
            return;
        }

        dispatch({type: "add-expense", payload: {expense}});

        setExpense(initialValues);
        
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-pink-600">
                Nuevo gasto
            </legend>

            {error && (
                <ErrorMessage>{error}</ErrorMessage>
            )}

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className="text-xl font-semibold"
                >
                    Nombre:
                </label>

                <input
                    type="text"
                    id="expenseName"
                    placeholder="Añade el nombre de tu gasto"
                    className="bg-slate-100 p-2"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl font-semibold"
                >
                    Cantidad:
                </label>

                <input
                    type="number"
                    id="amount"
                    placeholder="Añade la cantidad de tu gasto, ej. 300"
                    className="bg-slate-100 p-2"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="category"
                    className="text-xl font-semibold"
                >
                    Categoria:
                </label>

                <select
                    id="category"
                    className="bg-slate-100 p-2"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value="">--- Seleccione ---</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="date"
                    className="text-xl font-semibold"
                >
                    Fecha:
                </label>

                <DatePicker onChange={handleChangeDate} value={expense.date} />
            </div>

            <input
                type="submit"
                value={`Registrar gasto`}
                className="bg-pink-600 hover:bg-pink-700 cursor-pointer w-full text-white font-bold uppercase transition-all p-2 disabled:opacity-40"

            />
        </form>
    )
}
