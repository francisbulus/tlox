"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const repl = require("node:repl");
const scanner_1 = require("./scanner");
const token_1 = require("./token");
const generator_1 = require("./generator");
const types_1 = require("./types");
const interpreter_1 = require("./interpreter");
const parser_1 = require("./parser");
class Lox {
    constructor(args) {
        this.args = args;
        this.args = args;
    }
    init() {
        if (this.args.length > 3) {
            console.log('Usage: tlox [script]');
        }
        else if (this.args.length === 3) {
            if (this.args[2] === 'gen') {
                const ast = new generator_1.default();
                ast.generate();
                return;
            }
            const fullPath = path.join('data/', this.args[2]);
            this.runFile(fullPath);
        }
        else {
            this.runPrompt(); //This is not implemented yet
        }
    }
    runFile(path) {
        let data = '';
        const readableStream = fs.createReadStream(path, 'utf8');
        readableStream.on('data', (chunk) => {
            data += chunk;
        });
        readableStream.on('error', (err) => {
            console.error(`File read error: ${err.message}`);
            return;
        });
        readableStream.on('end', () => {
            this.run(data);
            if (Lox.hadError)
                process.exit(65);
            if (Lox.hadRuntimeError)
                process.exit(70);
        });
    }
    runPrompt() {
        repl.start();
    }
    run(source) {
        const scanner = new scanner_1.default(source);
        const tokens = scanner.scanTokens();
        const parser = new parser_1.Parser(tokens);
        const statements = parser.parse();
        if (Lox.hadError)
            return;
        Lox.interpreter.interpret(statements);
    }
    error(...args) {
        const [observable, msg] = args;
        if (observable instanceof token_1.default) {
            if (observable.type === types_1.TokenType.EOF) {
                this.report(observable.line, ' at end', msg);
            }
            else {
                this.report(observable.line, " at '" + observable.lexeme + "'", msg);
            }
        }
        else if (typeof observable === 'number') {
            this.report(observable, '', msg);
        }
    }
    runtimeError(error) {
        console.log(error.message + '\n[line ' + error.token.line + ']');
        Lox.hadRuntimeError = true;
    }
    report(line, where, msg) {
        console.error('[line ' + line + '] Error' + where + ': ' + msg);
        Lox.hadError = true;
    }
}
Lox.hadError = false;
Lox.hadRuntimeError = false;
Lox.interpreter = new interpreter_1.Interpreter();
const TLOX = new Lox(process.argv);
exports.default = TLOX;
TLOX.init();
//# sourceMappingURL=lox.js.map