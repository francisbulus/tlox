"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
// import {Generator} from './types';
class GenerateAst {
    generate() {
        this.defineAst('Expression', [
            'Binary   > left: Expression, operator: Token, right: Expression',
            'Grouping > expression: Expression',
            'Literal  > value: Literal',
            'Unary    > operator: Token, right: Expression',
        ]);
    }
    writer(content, path) {
        fs.appendFileSync(path, content);
    }
    defineAst(baseName, types) {
        this.path = `src/${baseName.toLowerCase()}.ts`;
        types.forEach((type, index) => {
            const className = type.split('>')[0].trim();
            const fields = type.split('>')[1].trim();
            const baseClassContent = `
      import Token from './token'
      
      class ${baseName}{ 
        constructor() {}
    }
        `;
            if (index === 0)
                this.writer(baseClassContent, this.path);
            this.defineType(baseName, className, fields);
        });
    }
    setFieldMetadata(fields) {
        let str = '';
        fields.split(', ').forEach(field => {
            str += `readonly ${field}, `;
        });
        return str;
    }
    defineType(baseName, className, fields) {
        const content = `
    export class ${className} extends ${baseName} {
        constructor(${this.setFieldMetadata(fields)}) {
            super()
            ${this.generateClassTemplate(fields)}
        }
    }`;
        this.writer(content, this.path);
    }
    generateClassTemplate(fields) {
        const list = fields.split(', ');
        let str = '';
        list.forEach(field => {
            const name = field.split(' ')[0].slice(0, -1);
            str += `this.${name} = ${name}
          `;
        });
        return str;
    }
}
exports.default = GenerateAst;
//# sourceMappingURL=generator.js.map