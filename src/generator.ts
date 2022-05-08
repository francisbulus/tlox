import fs = require('fs');
import path = require('path');
// import {Generator} from './types';

export default class GenerateAst {
  private path!: string;
  //   constructor() {
  //     this.path = '';
  //     this.generate();
  //   }
  public generate(): void {
    this.defineAst('Expression', [
      'Binary   > private left: Expr, private operator: Token, private right: Expr',
      'Grouping > private expression: Expr',
      'Literal  > private value: Literal',
      'Unary    > private operator: Token, private right: Expr',
    ]);
  }

  private writer(content: string, path: string): void {
    fs.appendFileSync(path, content);
  }

  private defineAst(baseName: string, types: string[]): void {
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

  private defineType(
    baseName: string,
    className: string,
    fieldList: string
  ): void {
    const fields: string[] = fieldList.split(', ');
    const content = `
    ${className} extends ${baseName} {
        constructor(${fieldList}) {
            ${((): string => {
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
