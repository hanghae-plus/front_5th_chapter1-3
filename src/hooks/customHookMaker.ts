import { useContext } from "react";

export const customHookMaker = <T>(SomeContext: React.Context<T>) => {
  return () => {
    const context = useContext(SomeContext);
    if (context === undefined) {
      throw new Error("Hook must be userd within an Provider!");
    }
    return context;
  };
};
