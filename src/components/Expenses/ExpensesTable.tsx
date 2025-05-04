import { Expense } from "@/App";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { Category } from "../Categories";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";

export function ExpensesTable({
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
      <CardContent>
        <Table>
          <TableHeader>
            <TableHead className="w-[100px]">Venc.</TableHead>
            <TableHead className="w-[100px]">Despesa</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead className="w-[100px]">Categoria</TableHead>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{dayjs(expense.dueDate).format("DD/MM")}</TableCell>
                <TableCell>{expense.name}</TableCell>
                <TableCell className="text-right">R$ {expense.value}</TableCell>
                <TableCell>
                  {
                    categories.find(
                      (category) => category.id === expense.categoryId
                    )?.name
                  }
                </TableCell>
                <TableCell>
                  <Button
                    variant="secondary"
                    onClick={() => removeExpense(expense.id)}
                  >
                    <FaTrash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={1} className="text-right">
                Total: R${" "}
                {expenses.reduce((total, expense) => total + expense.value, 0)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
