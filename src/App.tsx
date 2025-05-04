import { Popover } from "antd";
import dayjs from "dayjs";
import { FaChevronLeft, FaChevronRight, FaCog } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { ExpenseModal } from "./components/Expenses/ExpenseModal";
import { ExpensesTable } from "./components/Expenses/ExpensesTable";
import { Graphs } from "./components/Graphs";
import { useStore } from "./hooks/useStore";
import { useState } from "react";
import { ExpensesCard } from "./components/Expenses/ExpensesCard";

export interface Expense {
  id: string;
  name: string;
  value: number;
  categoryId: string;
  dueDate: string;
}

function App() {
  const { expenses, setExpenses, date, setDate } = useStore();
  const [layout, setLayout] = useState(
    localStorage.getItem("layout") || "card"
  );

  function changeLayout(layout: string) {
    setLayout(layout);
    localStorage.setItem("layout", layout);
  }

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
    localStorage.setItem(
      date.format("YYYY-MM"),
      JSON.stringify(joinedExpenses)
    );
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

        <Popover
          title="Layout"
          content={
            <div className="flex flex-col gap-2">
              <p
                onClick={() => changeLayout("card")}
                className={
                  layout === "card" ? "bg-slate-200 rounded-sm p-2" : " p-2"
                }
              >
                Card
              </p>
              <p
                onClick={() => changeLayout("table")}
                className={
                  layout === "table" ? "bg-slate-200 rounded-sm p-2" : " p-2"
                }
              >
                Tabela
              </p>
            </div>
          }
        >
          <FaCog />
        </Popover>

        <Graphs />
      </div>
      <div className="w-full h-[35px] bg-white flex items-center justify-between px-2">
        <FaChevronLeft onClick={() => setDate(date.subtract(1, "month"))} />
        <span>{date.format("DD/MM/YYYY")}</span>
        <FaChevronRight onClick={() => setDate(date.add(1, "month"))} />
      </div>

      {layout === "table" ? (
        <ExpensesTable expenses={expenses} removeExpense={removeExpense} />
      ) : (
        <ExpensesCard expenses={expenses} removeExpense={removeExpense} />
      )}
    </div>
  );
}

export default App;
