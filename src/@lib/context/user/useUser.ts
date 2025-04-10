import { useValidContext } from "../../hooks";
import { UserContext } from "./UserContext";

export const useUser = () => useValidContext(UserContext);
