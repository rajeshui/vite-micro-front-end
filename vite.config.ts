
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host-app',
      remotes: {
        // These point to the remoteEntry.js files of your micro-frontends
        remoteAlpha: 'http://localhost:5001/assets/remoteEntry.js',
        remoteBeta: 'http://localhost:5002/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'], // Prevent duplicate React instances
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
