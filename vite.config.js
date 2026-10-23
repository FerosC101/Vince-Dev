import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";

const reactVersion = JSON.parse(readFileSync(new URL("./node_modules/react/package.json", import.meta.url))).version;

export default defineConfig({
  plugins: [react()],
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    __REACT_VERSION__: JSON.stringify(reactVersion),
  },
});
