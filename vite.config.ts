import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default ({ mode }: { mode: string }) => {
  const base = mode === "production" ? "/front_5th_chapter1-3/" : "/";

  return mergeConfig(
    defineConfig({
      plugins: [react()],
      base,
      build: {
        rollupOptions: {
          input: {
            main: "./index.html",
            notFound: "./404.html",
          },
        },
      },
    }),

    defineTestConfig({
      test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/setupTests.ts",
        coverage: {
          reportsDirectory: "./.coverage",
          reporter: ["lcov", "json", "json-summary"],
        },
      },
    })
  );
};
