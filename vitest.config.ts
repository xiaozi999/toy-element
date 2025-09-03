// vitest.config.ts
/// <reference types="vitest" />
import { defineConfig } from "vite";
import {resolve} from 'path'
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()] as any,
  define:{
    PROD:JSON.stringify(false),
    DEV:JSON.stringify(false),
    TEST:JSON.stringify(true),
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles:[resolve(__dirname, './vitest.setup.ts')]
  },
});

// "test": "vitest --coverage"