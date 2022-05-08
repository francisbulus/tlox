import fs = require('fs');
import path = require('path');
// import {Generator} from './types';

export default class GenerateAst {
  private path: string;
  constructor(private outputDir: string) {
    this.outputDir = outputDir;
    this.path = path.join(`src/`, `${this.outputDir}.ts`);
    console.log(this.path);
  }
  public generate(): void {
    this.defineAst('Expr', [
      'Binary   > private left: Expr, private operator: Token, private right: Expr',
      'Grouping > private expression: Expr',
      'Literal  > private value: Literal',
      'Unary    > private operator: Token, private right: Expr',
    ]);
  }

  private writer(content: string, path: string): void {
    fs.appendFile(path, content, err => {
      if (err) throw Error(err?.message);
      console.log(`${content.substring(0, 30)}... was added`);
    });
  }

  private defineAst(baseName: string, types: string[]): void {
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
            ${((): void => {
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
