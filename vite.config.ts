import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return mergeConfig(
    defineConfig({
      plugins: [react()],
      base: env.VITE_BASE_URL,
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
};
