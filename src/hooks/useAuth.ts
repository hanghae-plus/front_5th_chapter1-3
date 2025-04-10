import { AuthContext } from "../context";
import { customHookMaker } from "./customHookMaker";

export const useAuth = customHookMaker(AuthContext);
