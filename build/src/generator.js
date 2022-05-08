"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
// import {Generator} from './types';
class GenerateAst {
    constructor(outputDir) {
        this.outputDir = outputDir;
        this.outputDir = outputDir;
        this.path = path.join(`src/`, `${this.outputDir}.ts`);
        console.log(this.path);
    }
    generate() {
        this.defineAst('Expr', [
            'Binary   > private left: Expr, private operator: Token, private right: Expr',
            'Grouping > private expression: Expr',
            'Literal  > private value: Literal',
            'Unary    > private operator: Token, private right: Expr',
        ]);
    }
    writer(content, path) {
        fs.appendFile(path, content, err => {
            if (err)
                throw Error(err === null || err === void 0 ? void 0 : err.message);
            console.log(`${content.substring(0, 30)}... was added`);
        });
    }
    defineAst(baseName, types) {
        const content = `class ${baseName}{ 
        `;
        this.writer(content, this.path);
        types.forEach(type => {
            const className = type.split('>')[0].trim();
            const fields = type.split('>')[1].trim();
            this.defineType(baseName, className, fields);
        });
        this.writer(`}`, this.path);
    }
    defineType(baseName, className, fieldList) {
        const fields = fieldList.split(', ');
        const content = `
    ${className} extends ${baseName} {
        constructor(${fieldList}) {
            ${(() => {
            fields.forEach(field => {
                const name = field.split(' ')[1].slice(0, -1);
                return `this.${name} = ${name}
                `;
            });
        })()}
        }
    }`;
        this.writer(content, this.path);
    }
}
exports.default = GenerateAst;
//# sourceMappingURL=generator.js.map