import { Expense } from "@/App";
import { Category } from "@/components/Categories";
import dayjs from "dayjs";
import React, { useEffect } from "react";

interface Store {
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  date: dayjs.Dayjs;
  setDate: (date: dayjs.Dayjs) => void;
}

export const StoreContext = React.createContext<Store>({
  expenses: [],
  setExpenses: () => {},
  categories: [],
  setCategories: () => {},
  date: dayjs(),
  setDate: () => {},
});

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [expenses, setExpenses] = React.useState<Expense[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [date, setDate] = React.useState(dayjs());

  useEffect(() => {
    const storedExpenses = localStorage.getItem(date.format("YYYY-MM")) ?? "[]";
    const storedCategories = localStorage.getItem("categories") ?? "[]";

    setExpenses(
      JSON.parse(storedExpenses).filter(
        (expense: Expense) =>
          dayjs(expense.dueDate).format("YYYY-MM") === date.format("YYYY-MM")
      )
    );

    setCategories(JSON.parse(storedCategories));
  }, [date]);

  return (
    <StoreContext.Provider
      value={{
        expenses,
        setExpenses,
        categories,
        setCategories,
        date,
        setDate,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
