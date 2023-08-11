import * as path from 'path';
import { TSDocParser, TSDocConfiguration, ParserMessage } from '@microsoft/tsdoc';
import { TSDocConfigFile } from '@microsoft/tsdoc-config';
import { readFileSync } from 'fs';
import ts from 'typescript';
import * as tsconfig from 'tsconfig';

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

/**
 * 
 * @param node - TS AST 节点
 * @param text - 
 * @returns 
 */
function getDocComment(node: ts.Node, text: string): ts.CommentRange[] {
  const ans: ts.CommentRange[] = [];
  // 列出声明
  switch (node.kind) {
    case ts.SyntaxKind.Parameter:
    case ts.SyntaxKind.TypeParameter:
    case ts.SyntaxKind.FunctionExpression:
    case ts.SyntaxKind.ArrowFunction:
    case ts.SyntaxKind.ParenthesizedExpression:
      ans.push(...(ts.getTrailingCommentRanges(text, node.pos) || []));
      break;
  }
  ans.push(...(ts.getLeadingCommentRanges(text, node.pos) ?? []));
  // 筛选合法的 JSDoc
  return ans.filter(
    (comment) => // 排除 `/**/`
      text.charCodeAt(comment.pos + 1) === 0x2a /* ts.CharacterCodes.asterisk */ &&
      text.charCodeAt(comment.pos + 2) === 0x2a /* ts.CharacterCodes.asterisk */ &&
      text.charCodeAt(comment.pos + 3) !== 0x2f /* ts.CharacterCodes.slash */
  );
}

function parse(file: string) {
  const { config } = tsconfig.loadSync(path.dirname(file));
  const program = ts.createProgram([file], config);
  const parser = load(file);
  const ctx = parser.parseString(readFileSync(file).toString('utf-8'));
  if (ctx.log.messages.length > 0) throw new ParseFailedError(ctx.log.messages);
  console.log(ctx.docComment);
}

parse(path.resolve(__dirname, '../src/typings/user.ts'));
