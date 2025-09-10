import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LoanCalculator',
      fileName: (format) => `loan-calculator.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      // Bundle everything for UMD to make it standalone
      external: [],
      output: {
        globals: {}
      }
    }
  }
});
