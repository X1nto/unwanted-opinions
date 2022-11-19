import { copyFile, copyFileSync } from 'fs';
import { resolve } from 'path';
import { PluginOption } from 'vite';

export default function manifest(version?: string): PluginOption {
  return {
    name: 'manifest',
    writeBundle(options) {
      const manifestPath = resolve(
        __dirname,
        '..',
        'manifest',
        `manifest${version !== undefined ? '.' + version : ''}.json`
      );
      const outManifestPath = resolve(options.dir!, 'manifest.json');
      copyFileSync(manifestPath, outManifestPath);
    },
  };
}
