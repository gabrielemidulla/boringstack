import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite-plus';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});
