"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lox = void 0;
const fs = require("fs");
const path = require("path");
const repl = require("node:repl");
const scanner_1 = require("./scanner");
const generator_1 = require("./generator");
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
const Lox = new Interpreter(process.argv);
exports.Lox = Lox;
Lox.init();
//# sourceMappingURL=lox.js.map