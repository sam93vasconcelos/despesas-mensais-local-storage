import { useContext } from "react";
import { StoreContext } from "@/contexts/Store";

export function useStore() {
  return useContext(StoreContext);
}
