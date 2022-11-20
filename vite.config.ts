import { resolve } from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import manifest from './vite/Manifest';
import properHtml from './vite/ProperHtml';

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      solidPlugin(),
      properHtml([{ from: 'src/popup/index.html', to: 'popup.html' }]),
      manifest(mode === 'firefox' ? 'v2' : undefined),
    ],
    publicDir: 'public',
    build: {
      target: 'es6',
      outDir: getBuildDir(mode),
      sourcemap: mode === 'dev',
      rollupOptions: {
        input: {
          popup: resolve('src/popup/index.html'),
          content: resolve('src/content/content.ts'),
          opinionator: resolve('src/webres/opinionator.ts'),
        },
        output: {
          entryFileNames: '[name].js',
          assetFileNames: `[name].[ext]`,
          chunkFileNames: '[name].js',
        },
      },
    },
  };
});

function getBuildDir(mode: string): string {
  switch (mode) {
    case 'chrome':
      return 'build-chrome';
    case 'firefox':
      return 'build-firefox';
    default:
      return 'build';
  }
}
