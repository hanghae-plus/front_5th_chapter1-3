import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const base = mode === "production" ? "/front_5th_chapter1-3/" : "/";

  return mergeConfig(
    defineConfig({
      base,
      plugins: [react()],
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
    }),
  );
});
