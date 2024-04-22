import { resolve } from 'node:path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': resolve(process.cwd(), 'src/app'),
      '@pages': resolve(process.cwd(), 'src/pages'),
      '@shared': resolve(process.cwd(), 'src/shared'),
    },
  },
})
