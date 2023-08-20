import * as typedoc from 'typedoc';
import * as path from 'path';
import { rmSync } from 'fs';

const OUT_DIR = path.resolve(__dirname, '../docs/api');

(async () => {
  const app = new typedoc.Application();
  app.options.addReader(new typedoc.TSConfigReader());
  await app.bootstrapWithPlugins({
    entryPoints: ['src/index.ts'],
    cleanOutputDir: false,
    plugin: ['typedoc-plugin-markdown'],
    // @ts-expect-error
    hideInPageTOC: true,
    hideBreadcrumbs: true,
  });
  const project = app.convert();
  if (!project) throw new Error('生成失败');
  await app.generateDocs(project, OUT_DIR);
  rmSync(path.resolve(OUT_DIR, 'README.md')); // `/api/README.md` 无用，并且存在 dead link
})();
