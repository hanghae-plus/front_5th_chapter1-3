import { ItemContext } from "../context";
import { customHookMaker } from "./customHookMaker";

export const useItems = customHookMaker(ItemContext);
