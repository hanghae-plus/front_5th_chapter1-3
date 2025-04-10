import { useContext } from "react";
import { NotiContext } from "./NotiContext";

export const useNotiContext = () => {
  const context = useContext(NotiContext);
  if (context === undefined) {
    throw new Error("useNotiContext must be used within a NotiProvider");
  }
  return context;
};
