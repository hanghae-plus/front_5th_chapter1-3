import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";
import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default ({ mode }: UserConfig) =>
  mergeConfig(
    defineConfig({
      plugins: [react()],
      base: mode === "production" ? "/front_5th_chapter1-3/" : "/",
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
