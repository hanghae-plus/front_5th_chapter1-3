/* eslint-disable prettier/prettier */
import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";
import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react-swc";

export default mergeConfig(
  defineConfig({
    plugins: [react()],
    base:
      process.env.NODE_ENV === "production" ? "/front_5th_chapter1-3/" : "/",
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          notFound: resolve(__dirname, "404.html"),
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
