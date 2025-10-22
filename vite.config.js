import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: You MUST replace 'your-repo-name' with the name of your GitHub repository
  // For example, if your repository URL is https://github.com/user/my-app,
  // the base should be '/my-app/'
  base: '/your-repo-name/',
  define: {
    // This handles the process.env check in the original code, though we no longer rely on it.
    'process.env.API_KEY': '""'
  }
});
