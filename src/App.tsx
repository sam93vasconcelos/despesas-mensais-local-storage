import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaCog } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { ExpenseModal } from "./components/Expenses/ExpenseModal";
import { ExpensesTable } from "./components/Expenses/ExpensesTable";
import { Graphs } from "./components/Graphs";
import { Categories } from "./components/ui/Categories";

export interface Expense {
  id: string;
  name: string;
  value: number;
  categoryId: string;
  dueDate: string;
}

function App() {
  const [date, setDate] = useState(dayjs());
  const [expenses, setExpenses] = useState<Expense[]>([]);

  function getExpenses() {
    return JSON.parse(localStorage.getItem("expenses") || "[]").filter(
      (expense: Expense) =>
        dayjs(expense.dueDate).format("YYYY-MM") === date.format("YYYY-MM")
    );
  }

  useEffect(() => {
    setExpenses(getExpenses());
  }, [date]);

  function addExpense(
    name: string,
    value: number,
    categoryId: string,
    dueDate: string
  ) {
    const newExpense = {
      id: uuidv4(),
      name,
      value,
      categoryId,
      dueDate: date.set("date", Number(dueDate)).format("YYYY-MM-DD"),
    };

    const joinedExpenses = [...expenses, newExpense].sort(
      (a, b) => dayjs(a.dueDate).unix() - dayjs(b.dueDate).unix()
    );

    setExpenses(joinedExpenses);
    localStorage.setItem("expenses", JSON.stringify(joinedExpenses));
  }

  function removeExpense(id: string) {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(newExpenses);
    localStorage.setItem("expenses", JSON.stringify(newExpenses));
  }

  return (
    <div className="w-full h-screen bg-slate-200">
      <div className="w-full h-15 bg-slate-900 text-white shadow-sm flex items-center justify-center">
        <h1 className="text-2xl font-bold uppercase">Despesas mensais</h1>
      </div>
      <div className="w-full h-10 bg-slate-300 shadow-sm flex items-center justify-around">
        <ExpenseModal addExpense={addExpense} />

        <Popover>
          <PopoverTrigger asChild>
            <FaCog />
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <Categories />
          </PopoverContent>
        </Popover>

        <Graphs />
      </div>
      <div className="w-full h-[35px] bg-white flex items-center justify-between px-2">
        <FaChevronLeft onClick={() => setDate(date.subtract(1, "month"))} />
        <span>{date.format("DD/MM/YYYY")}</span>
        <FaChevronRight onClick={() => setDate(date.add(1, "month"))} />
      </div>

      <ExpensesTable expenses={expenses} removeExpense={removeExpense} />
    </div>
  );
}

export default App;
