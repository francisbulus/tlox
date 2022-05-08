import fs = require('fs');
import path = require('path');
// import {Generator} from './types';

export default class GenerateAst {
  private path!: string;
  public generate(): void {
    this.defineAst('Expression', [
      'Binary   > left: Expression, operator: Token, right: Expression',
      'Grouping > expression: Expression',
      'Literal  > value: any',
      'Unary    > operator: Token, right: Expression',
    ]);
  }

  private writer(content: string, path: string): void {
    fs.appendFileSync(path, content);
  }

  private defineAst(baseName: string, types: string[]): void {
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
      if (index === 0) this.writer(baseClassContent, this.path);
      this.defineType(baseName, className, fields);
    });
  }

  private setFieldMetadata(fields: string): string {
    let str = '';
    fields.split(', ').forEach(field => {
      str += `readonly ${field}, `;
    });
    return str;
  }

  private defineType(
    baseName: string,
    className: string,
    fields: string
  ): void {
    const content = `
    export class ${className} extends ${baseName} {
        constructor(${this.setFieldMetadata(fields)}) {
            super()
            ${this.generateClassTemplate(fields)}
        }
    }`;
    this.writer(content, this.path);
  }

  private generateClassTemplate(fields: string): string {
    const list: string[] = fields.split(', ');
    let str = '';
    list.forEach(field => {
      const name = field.split(' ')[0].slice(0, -1);
      str += `this.${name} = ${name}
          `;
    });
    return str;
  }
}
