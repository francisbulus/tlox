import fs = require('fs');
import path = require('path');
import repl = require('node:repl');
import Scanner from './scanner';
import Token from './token';
import GenerateAst from './generator';
import {Binary, Expression, Grouping, Literal, Unary} from './expression';
import {TokenType} from './types';
import AstPrinter from './printer';

class Interpreter {
  private hadError: boolean;

  constructor(private args: string[]) {
    this.args = args;
    this.hadError = false;
  }

  public init(): void {
    if (this.args.length > 3) {
      console.log('Usage: tlox [script]');
    } else if (this.args.length === 3) {
      if (this.args[2] === 'gen') {
        const ast = new GenerateAst();
        ast.generate();
        return;
      }
      const fullPath: string = path.join('data/', this.args[2]);
      this.runFile(fullPath);
    } else {
      this.runPrompt(); //This is not implemented yet
    }
  }

  private runFile(path: string): void {
    let data = '';
    const readableStream = fs.createReadStream(path, 'utf8');
    readableStream.on('data', (chunk: string | Buffer): void => {
      data += chunk;
    });
    readableStream.on('error', (err: Error): void => {
      console.error(`File read error: ${err.message}`);
      return;
    });
    readableStream.on('end', (): void => {
      this.run(data);
      if (this.hadError)
        throw Error("Looks like we've run into an error reading the file.");
    });
  }

  private runPrompt(): void {
    repl.start();
  }

  private run(source: string): void {
    const scanner = new Scanner(source);
    const tokens = scanner.scanTokens();
    tokens.forEach((token: Token) => console.log(token));
  }

  public error(
    ...args:
      | [observable: number, message: string]
      | [observable: Token, message: string]
  ): void {
    const [observable, message] = args;
    if (observable instanceof Token) {
      if (observable.type === TokenType.EOF) {
        this.report(observable.line, ' at end', message);
      } else {
        this.report(
          observable.line,
          " at '" + observable.lexeme + "'",
          message
        );
      }
    } else if (typeof observable == 'number') {
      this.report(observable, '', message);
    }
  }

  private report(line: number, where: string, msg: string): void {
    console.error('[line ' + line + '] Error' + where + ': ' + msg);
    this.hadError = true;
  }
}

const Lox = new Interpreter(process.argv);
export {Lox};
Lox.init();
