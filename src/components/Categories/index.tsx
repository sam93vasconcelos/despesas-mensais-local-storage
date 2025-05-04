import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { v4 as uuidv4 } from "uuid";
import { CategoriesTable } from "./CategoriesTable";
import { CategoryModal } from "./CategoryModal";
import { FaCog } from "react-icons/fa";
import { useStore } from "@/hooks/useStore";

export type Category = {
  id: string;
  name: string;
};

export function Categories() {
  const { categories, setCategories } = useStore();

  function addCategory(name: string) {
    const newCategory = {
      id: uuidv4(),
      name: name,
    };

    const joinedCategories = [...categories, newCategory].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setCategories(joinedCategories);
    localStorage.setItem("categories", JSON.stringify(joinedCategories));
  }

  function removeCategory(id: string) {
    const newCategories = categories.filter((category) => category.id !== id);
    setCategories(newCategories);
    localStorage.setItem("categories", JSON.stringify(newCategories));
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <FaCog />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80%]">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Gerenciar categorias</DrawerTitle>
            <DrawerDescription>Gerencie suas categorias.</DrawerDescription>
          </DrawerHeader>

          <CategoriesTable
            categories={categories}
            removeCategory={removeCategory}
          />

          <DrawerFooter className="absolute bottom-0 w-full">
            <DrawerClose asChild>
              <Button variant="outline">Fechar</Button>
            </DrawerClose>
            <CategoryModal addCategory={addCategory} />
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
