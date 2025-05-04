import { Expense } from "@/App";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dayjs from "dayjs";
import { FaTrash } from "react-icons/fa";
import { Category } from "../Categories";

export function ExpensesCard({
  expenses,
  removeExpense,
}: {
  expenses: Expense[];
  removeExpense: (id: string) => void;
}) {
  const categories: Category[] = JSON.parse(
    localStorage.getItem("categories") || "[]"
  );

  return (
    <Card className="m-2 h-[75vh] overflow-y-auto">
      <CardHeader>
        <CardTitle>Despesas</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {expenses.map((expense) => (
          <Card key={expense.id}>
            <CardContent>
              <div className="flex justify-between">
                <CardTitle>{expense.name}</CardTitle>
                <FaTrash onClick={() => removeExpense(expense.id)} />
              </div>
              <small>
                {
                  categories.find(
                    (category) => category.id === expense.categoryId
                  )?.name
                }
              </small>
              <div className="flex justify-between">
                <div>{dayjs(expense.dueDate).format("DD/MM/YYYY")}</div>
                <div>
                  {expense.value?.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
