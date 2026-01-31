import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Declaring __dirname Manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  // base: "./",
  resolve: {
    alias: {
      "@root": resolve(__dirname, "src"),
      "@common": resolve(__dirname, "src/common"),
      "@components": resolve(__dirname, "src/components"),
      "@pages": resolve(__dirname, "src/pages"),
      "@utils": resolve(__dirname, "src/utils"),
      "@context": resolve(__dirname, "src/context"),
      "@themes": resolve(__dirname, "src/themes"),
      "@hooks": resolve(__dirname, "src/hooks"),
      "@styles": resolve(__dirname, "src/styles"),
      "@layouts": resolve(__dirname, "src/layouts"),
      "@constants": resolve(__dirname, "src/constants"),
    },
  },
});
