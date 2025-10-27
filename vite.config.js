import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // The 'base' property is removed for deployment on platforms like Vercel
  // which serve the app from the root of the domain.
});