import { resolve } from 'node:path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@app': resolve(process.cwd(), 'src/app'),
      '@entities': resolve(process.cwd(), 'src/entities'),
      '@features': resolve(process.cwd(), 'src/features'),
      '@pages': resolve(process.cwd(), 'src/pages'),
      '@shared': resolve(process.cwd(), 'src/shared'),
      '@widgets': resolve(process.cwd(), 'src/widgets'),
    },
  },
})
