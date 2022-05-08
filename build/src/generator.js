"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
// import {Generator} from './types';
class GenerateAst {
    //   constructor() {
    //     this.path = '';
    //     this.generate();
    //   }
    generate() {
        this.defineAst('Expr', [
            'Binary   > private left: Expr, private operator: Token, private right: Expr',
            'Grouping > private expression: Expr',
            'Literal  > private value: Literal',
            'Unary    > private operator: Token, private right: Expr',
        ]);
    }
    writer(content, path) {
        fs.appendFileSync(path, content);
    }
    defineAst(baseName, types) {
        this.path = `src/${baseName.toLowerCase()}.ts`;
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
            let str = '';
            fields.forEach(field => {
                const name = field.split(' ')[1].slice(0, -1);
                str += `this.${name} = ${name}

                `;
            });
            return str;
        })()}
        }
    }`;
        this.writer(content, this.path);
    }
}
exports.default = GenerateAst;
//# sourceMappingURL=generator.js.map