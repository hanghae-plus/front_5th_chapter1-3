import React from "react";

interface ContextProps<T> {
  children: React.ReactNode;
  contextValue?: T | null | undefined;
}

const createContext = <T extends object | null | undefined>(
  name: string,
  defaultValue?: T | null | undefined,
) => {
  const context = React.createContext(defaultValue);

  const Provider = ({ children, contextValue }: ContextProps<T>) => {
    return <context.Provider value={contextValue}>{children}</context.Provider>;
  };

  const useContext = () => {
    const _context = React.useContext(context);
    if (_context === undefined) {
      throw new Error(`${name}Context 가 없습니다.`);
    }
    return _context;
  };

  return [Provider, useContext] as const;
};

export default createContext;
