import * as path from 'path';
import { TSDocParser, TSDocConfiguration, ParserMessage } from '@microsoft/tsdoc';
import { TSDocConfigFile } from '@microsoft/tsdoc-config';
import { readFileSync } from 'fs';

class BadConfigError extends Error {
  constructor (summary: string) {
    console.error(summary);
    super('配置错误');
  }
}
class ParseFailedError extends Error {
  constructor (messages: readonly ParserMessage[]) {
    for (const msg of messages) console.error(msg.toString());
    super('TSDoc Parser 执行失败');
  }
}

function load(file: string) {
  const configFile = TSDocConfigFile.loadForFolder(path.dirname(file));
  if (configFile.hasErrors) throw new BadConfigError(configFile.getErrorSummary());
  const config = new TSDocConfiguration();
  configFile.configureParser(config);
  return new TSDocParser(config);
}

function parse(file: string) {
  const parser = load(file);
  const ctx = parser.parseString(readFileSync(file).toString('utf-8'));
  if (ctx.log.messages.length > 0) throw new ParseFailedError(ctx.log.messages);
  console.log(ctx.docComment);
}

parse(path.resolve(__dirname, '../src/typings/user.ts'));
