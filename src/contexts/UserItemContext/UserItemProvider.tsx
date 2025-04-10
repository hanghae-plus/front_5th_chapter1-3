import { useState } from "react";
import { useMemo, useCallback } from "../../@lib";
import { UserItemContext } from "./index";
import { generateItems } from "../../utils";

export const UserItemProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, [setItems]);

  const userItemContextValue = useMemo(
    () => ({ items, addItems }),
    [items, addItems],
  );

  return (
    <UserItemContext.Provider value={userItemContextValue}>
      {children}
    </UserItemContext.Provider>
  );
};
