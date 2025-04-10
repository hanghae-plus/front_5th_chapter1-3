import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";
  const BASE_PATH = isProd ? "/front_5th_chapter1-3/" : "/";

  return mergeConfig(
    defineConfig({
      plugins: [react()],
      base: BASE_PATH,
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
