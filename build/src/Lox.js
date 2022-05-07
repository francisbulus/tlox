"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
class Interpreter {
    constructor(args) {
        this.args = args;
        this.args = args;
    }
    initialize() {
        console.log(this.args);
        if (this.args.length > 3) {
            console.log('Usage: jlox [script]');
        }
        else if (this.args.length === 3) {
            const fullPath = path.join('src/', this.args[2]);
            console.log(fullPath);
            this.runFile(fullPath);
        }
        else {
            this.runPrompt();
        }
    }
    runFile(path) {
        let data = '';
        const readableStream = fs.createReadStream(path, 'utf8');
        readableStream.on('data', function (chunk) {
            data += chunk;
        });
        readableStream.on('error', function (err) {
            console.error(`File read error: ${err.message}`);
            return;
        });
        readableStream.on('end', function () {
            console.log(data);
            return data;
        });
    }
    runPrompt() { }
}
const Lox = new Interpreter(process.argv);
Lox.initialize();
//# sourceMappingURL=Lox.js.map