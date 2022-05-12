"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lox = void 0;
const fs = require("fs");
const path = require("path");
const repl = require("node:repl");
const scanner_1 = require("./scanner");
const token_1 = require("./token");
const generator_1 = require("./generator");
const expression_1 = require("./expression");
const types_1 = require("./types");
const printer_1 = require("./printer");
class Interpreter {
    constructor(args) {
        this.args = args;
        this.args = args;
        this.hadError = false;
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
            if (this.hadError)
                throw Error("Looks like we've run into an error reading the file.");
        });
    }
    runPrompt() {
        repl.start();
    }
    run(source) {
        const scanner = new scanner_1.default(source);
        const tokens = scanner.scanTokens();
        tokens.forEach((token) => console.log(token));
    }
    error(line, msg) {
        this.report(line, '', msg);
    }
    report(line, where, msg) {
        console.error('[line ' + line + '] Error' + where + ': ' + msg);
        this.hadError = true;
    }
}
const test = () => {
    const expression = new expression_1.Binary(new expression_1.Unary(new token_1.default(types_1.TokenType.MINUS, '-', null, 1), new expression_1.Literal(123)), new token_1.default(types_1.TokenType.STAR, '*', null, 1), new expression_1.Grouping(new expression_1.Literal(45.67)));
    const str = new printer_1.default().print(expression);
    console.log(str);
};
const Lox = new Interpreter(process.argv);
exports.Lox = Lox;
// Lox.init();
test();
//# sourceMappingURL=lox.js.map