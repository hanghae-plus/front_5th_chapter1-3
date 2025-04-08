import { useContext } from 'react'

export const useContextValue = <T>(context: React.Context<T>) => {
  const contextValue = useContext(context);
  if (!contextValue) {
    const contextName = context.displayName || 'context'
    throw new Error(`${contextName} must be used within an ${contextName}Provider`);
  }
  return contextValue;
};