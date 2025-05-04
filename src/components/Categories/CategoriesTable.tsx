import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "../ui/button";
import { Category } from ".";

export function CategoriesTable({
  categories,
  removeCategory,
}: {
  categories: Category[];
  removeCategory: (id: string) => void;
}) {
  return (
    <div className="h-[50vh] overflow-y-auto px-2">
      {categories.length === 0 ? (
        <p className="text-center">Nenhuma categoria cadastrada</p>
      ) : (
        <Table>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="flex gap-1 w-[50px]">
                  <Button variant="secondary">
                    <FaEdit />
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => removeCategory(category.id)}
                  >
                    <FaTrash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
