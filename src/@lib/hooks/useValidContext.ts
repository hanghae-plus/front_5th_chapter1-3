import { useContext } from "react";

export const useValidContext = <T>(context: React.Context<T>) => {
  const contextValue = useContext(context);

  if (contextValue === undefined) {
    throw new Error("context must be used within a provider");
  }

  return contextValue;
};
