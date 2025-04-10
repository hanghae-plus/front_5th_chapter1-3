import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const viteConfig = defineConfig({
    base: env.VITE_HOSTNAME || "/",

    plugins: [react()],
  });

  const testConfig = defineTestConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
      coverage: {
        reportsDirectory: "./.coverage",
        reporter: ["lcov", "json", "json-summary"],
      },
    },
  });

  return mergeConfig(viteConfig, testConfig);
};
