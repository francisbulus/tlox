import fs = require('fs');
import path = require('path');
// import repl = require('node:repl');
import Scanner from './scanner';
import Token from './token';
import GenerateAst from './generator';
import {TokenType} from './types';
import RuntimeError from './error';
import {Interpreter} from './interpreter';
import {Parser} from './parser';
import {Stmt} from './stmt';
import * as readline from 'node:readline';
import {stdin as input, stdout as output} from 'node:process';

const rl = readline.createInterface({
  input,
  output,
});

class Lox {
  static hadError: boolean = false;
  static hadRuntimeError: boolean = false;
  static interpreter = new Interpreter();

  constructor(private args: string[]) {
    this.args = args;
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
      this.runPrompt();
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
      if (Lox.hadError) process.exit(65);
      if (Lox.hadRuntimeError) process.exit(70);
    });
  }

  private runPrompt(): void {
    rl.question('> ', answer => {
      if (!answer) process.exit(1);
      this.run(answer);
      Lox.hadError = false;
      this.runPrompt();
    });
  }

  private run(source: string): void {
    const scanner = new Scanner(source);
    const tokens = scanner.scanTokens();
    const parser: Parser = new Parser(tokens);
    const statements: Stmt[] = parser.parse();
    if (Lox.hadError) return;
    return Lox.interpreter.interpret(statements);
  }

  public error(
    ...args:
      | [observable: number, msg: string]
      | [observable: Token, msg: string]
  ): void {
    const [observable, msg] = args;
    if (observable instanceof Token) {
      if (observable.type === TokenType.EOF) {
        this.report(observable.line, ' at end', msg);
      } else {
        this.report(observable.line, " at '" + observable.lexeme + "'", msg);
      }
    } else if (typeof observable === 'number') {
      this.report(observable, '', msg);
    }
  }

  runtimeError(error: RuntimeError): void {
    console.log(error.message + '\n[line ' + error.token.line + ']');
    Lox.hadRuntimeError = true;
  }

  private report(line: number, where: string, msg: string): void {
    console.log(`[line ${line}] Error${where}: ${msg}`);
    Lox.hadError = true;
  }
}

const Tlox = new Lox(process.argv);
export default Tlox;
Tlox.init();
