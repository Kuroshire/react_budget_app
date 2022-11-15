import React, { useContext } from "react"
import {v4 as uuidV4} from 'uuid'
import useLocalStorage from "../Hooks/useLocalStorage";

const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets(){
    return useContext(BudgetsContext)
}

/*
Budget form:
{
    id:
    name:
    max:
}

Expense form:
{
    id:
    budgetId:
    amount:
    description:
}

*/

export const BudgetsProvider = ({children}) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])

    //budgetId refers to which budget we want the expenses from (ex : Entertainement Budget)
    //this function return the list of all the expenses made for a specific budget.
    function getBudgetExpenses(budgetId){
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    function addExpense({ description, amount, budgetId }){
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }] 
        })
    }

    function addBudget({ name, max }){
        setBudgets(prevBudgets => {
            //case : there is already another budget with that name
            if(prevBudgets.find(budget => budget.name === name)){
                return prevBudgets
            }
            return [...prevBudgets, { id: uuidV4(), name, max }] //this line keeps all the elements of the array and add a new one witha new id and the name and max given in entry
        })
    }

    function deleteBudget({ id }){
        //TODO : deal with expenses (move them to uncategorized)

        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }

    function deleteExpense({ id }){
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
        
    }



    return (
    <BudgetsContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense
    }}>
        {children}
    </BudgetsContext.Provider>
    )
}