import { normalize } from 'path';
import { PluginOption } from 'vite';

interface RenameData {
  from: string;
  to: string;
}

export default function properHtml(data: RenameData[]): PluginOption {
  return {
    name: 'proper-html',
    enforce: 'post',
    generateBundle(_, bundle) {
      for (const singulardata of data) {
        const normalizedFrom = normalize(singulardata.from);
        const normalizedTo = normalize(singulardata.to);
        bundle[normalizedFrom].fileName = normalizedTo;
      }
    },
  };
}
