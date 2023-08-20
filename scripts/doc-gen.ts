import * as typedoc from 'typedoc';
import * as path from 'path';

const OUT_DIR = path.resolve(__dirname, '../docs/api');

(async () => {
  const app = new typedoc.Application();
  app.options.addReader(new typedoc.TSConfigReader());
  await app.bootstrapWithPlugins({
    entryPoints: ['src/index.ts'],
    plugin: ['typedoc-plugin-markdown'],
    // @ts-expect-error
    entryDocument: 'index.md',
    hideInPageTOC: true,
    hideBreadcrumbs: true,
  });
  const project = app.convert();
  if (!project) throw new Error('生成失败');
  await app.generateDocs(project, OUT_DIR);
})();
