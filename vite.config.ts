import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/front_5th_chapter1-3/" : "/";

console.log("path");

export default mergeConfig(
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
