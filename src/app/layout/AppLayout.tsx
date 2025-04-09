import { cva } from "class-variance-authority";

import { useTheme } from "@app/model";
import { Header } from "@widgets/header";
import { AuthProvider } from "@features/auth/model/AuthProvider";

const appLayoutVariants = cva("min-h-screen", {
  variants: {
    theme: {
      light: "bg-gray-100",
      dark: "bg-gray-900 text-white",
    },
  },
});

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { theme } = useTheme();

  return (
    <main className={appLayoutVariants({ theme })}>
      <AuthProvider>
        <Header />
      </AuthProvider>
      {children}
    </main>
  );
}
