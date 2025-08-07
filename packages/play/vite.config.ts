/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
          exclude: ['@xiaozi-element/utils', '@xiaozi-element/components', '@xiaozi-element/hooks', '@xiaozi-element/theme']
  },
  resolve: {
          alias: {
        '@xiaozi-element/utils': resolve(__dirname, '../utils'),
        '@xiaozi-element/components': resolve(__dirname, '../components'),
        '@xiaozi-element/hooks': resolve(__dirname, '../hooks'),
        '@xiaozi-element/theme': resolve(__dirname, '../theme')
      }
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: 'playwright',
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    }]
  }
});