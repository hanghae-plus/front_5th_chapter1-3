import { PropsWithChildren } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { ThemeProvider } from "../provider/ThemeProvider";
import { useContextValue } from "../context/useContextValue";

export default function AppContainer({ children }: PropsWithChildren) {
  const { theme } = useContextValue(ThemeContext);

  return (
    <ThemeProvider>
      <div
        className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}>
        {children}
      </div>
    </ThemeProvider>
  );
}
