"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const child_process_1 = require("child_process");
const util_1 = require("util");
const executeAsPromise = (0, util_1.promisify)(child_process_1.exec);
class GenerateAst {
    generate() {
        this.defineAst('Expression', [
            'Binary   > left: Expression, operator: Token, right: Expression',
            'Grouping > expression: Expression',
            'Literal  > value: any',
            'Unary    > operator: Token, right: Expression',
        ]);
    }
    async lint() {
        const { stdout, stderr } = await executeAsPromise('yarn run lint');
        console.log('stdout:', stdout);
        console.log('stderr:', stderr);
    }
    writer(content, path) {
        fs.appendFileSync(path, content);
        // this.lint();
    }
    defineAst(baseName, types) {
        this.path = `src/${baseName.toLowerCase()}.ts`;
        types.forEach((type, index) => {
            const className = type.split('>')[0].trim();
            const fields = type.split('>')[1].trim();
            const baseClassContent = `
      import Token from './token'
      
      abstract class ${baseName}{ 
        constructor() {}
        abstract accept<R>(visitor: ${baseName}Visitor<R>): R;
    }
        `;
            if (index === 0)
                this.writer(baseClassContent, this.path);
            this.defineType(baseName, className, fields);
        });
        this.defineVisitor(baseName, types);
    }
    defineVisitor(baseName, types) {
        const content = `
    export interface ${baseName}Visitor<T> {
      ${(function () {
            let visits = '';
            for (const type of types) {
                const className = type.split('>')[0].trim();
                visits += `visit${className}(expression: ${className}): T;
          `;
            }
            return visits;
        })()}
    }
    `;
        this.writer(content, this.path);
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
      accept<T>(visitor: ${baseName}Visitor<T>): T {
        return visitor.visit${className}(this);
      }
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