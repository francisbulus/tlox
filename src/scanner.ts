import fs = require('fs');
import path = require('path');
import repl = require('node:repl');

class Interpreter {
  constructor(private args: string[]) {
    this.args = args;
  }

  public initialize(): void {
    console.log(this.args);
    if (this.args.length > 3) {
      console.log('Usage: tlox [script]');
    } else if (this.args.length === 3) {
      const fullPath: string = path.join('data/', this.args[2]);
      this.runFile(fullPath);
    } else {
      this.runPrompt();
    }
  }

  public runFile(path: string): void {
    let data = '';
    const readableStream = fs.createReadStream(path, 'utf8');
    readableStream.on('data', function (chunk: string | Buffer): void {
      data += chunk;
    });
    readableStream.on('error', function (err: Error): void {
      console.error(`File read error: ${err.message}`);
      return;
    });
    readableStream.on('end', function (): string {
      return data;
    });
  }

  public runPrompt(): void {
    repl.start();
  }
}

const Lox = new Interpreter(process.argv);
Lox.initialize();
