import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Category } from "../ui/Categories";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ExpenseModal({
  addExpense,
}: {
  addExpense: (
    name: string,
    value: number,
    categoryId: string,
    dueDate: string
  ) => void;
}) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [open, setOpen] = useState(false);

  const [categories, setCategories] = useState<Category[]>(
    JSON.parse(localStorage.getItem("categories") || "[]")
  );

  useEffect(() => {
    setCategories(JSON.parse(localStorage.getItem("categories") || "[]"));
  }, []);

  function cleanForm() {
    setName("");
    setValue("");
    setCategoryId("");
    setDueDate("");
  }

  function handleSubmit() {
    addExpense(name, Number(value), categoryId, dueDate);
    cleanForm();
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        cleanForm();
      }}
    >
      <DialogTrigger asChild>
        <FaPlus />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar despesa</DialogTitle>
          <DialogDescription>
            Adicione uma nova despesa para organizar suas despesas.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Label htmlFor="name" className="text-right">
            Nome
          </Label>
          <Input
            id="name"
            className="col-span-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid gap-4 grid-cols-2">
          <div>
            <Label htmlFor="dueDate" className="text-right">
              Vencimento (dia)
            </Label>
            <Input
              className="mt-2"
              id="dueDate"
              type="number"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="value" className="text-right">
              Valor
            </Label>
            <Input
              className="mt-2"
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="number"
            />
          </div>
        </div>
        <div className="grid gap-4">
          <Label htmlFor="categoryId" className="text-right">
            Categoria
          </Label>
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger className="w-[100%]">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent className="z-[99999999999]">
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
