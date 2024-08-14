import { Category } from "@/lib/types/Category";
import { atom } from "recoil";

export const categoriesState = atom<Category[]>({
  key: "categoriesState",
  default: [],
});
