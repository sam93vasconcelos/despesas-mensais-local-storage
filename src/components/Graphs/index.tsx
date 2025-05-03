import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import ExpensesByCategory from "./ExpensesByCategory";
import ExpensesByDay from "./ExpensesByDay";

export function Graphs() {
  const [graph, setGraph] = useState<string | undefined>();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <FaBars />
      </SheetTrigger>
      <SheetContent className="w-[95vw]">
        <SheetHeader>
          <SheetTitle>Gráficos</SheetTitle>
          <SheetDescription>
            Escolha um gráfico para visualizar
          </SheetDescription>
        </SheetHeader>

        <div className="mx-2">
          <Select value={graph} onValueChange={setGraph}>
            <SelectTrigger className="w-[100%]">
              <SelectValue placeholder="Selecione um gráfico" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Gráficos</SelectLabel>
                <SelectItem value="category">Despesas por categoria</SelectItem>
                <SelectItem value="day">Despesas por dia</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="w-[95vw]">
          {graph === "category" && <ExpensesByCategory />}
          {graph === "day" && <ExpensesByDay />}
        </div>
      </SheetContent>
    </Sheet>
  );
}
