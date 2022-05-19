import fs = require('fs');
import {exec} from 'child_process';
import {promisify} from 'util';
const executeAsPromise = promisify(exec);

export default class GenerateAst {
  private path!: string;
  public generate(): void {
    this.defineAst('Expression', [
      'Assign > name: Token, value: Expression',
      'Binary   > left: Expression, operator: Token, right: Expression',
      'Grouping > expression: Expression',
      'Literal  > value: any',
      'Unary    > operator: Token, right: Expression',
      'Variable > name: Token',
    ]);

    this.defineAst('Stmt', [
      'Block      > statements: Stmt[]',
      'Expression   > expression: Expression',
      'Print > expression: Expression',
      'Var > name: Token, initializer: Expression',
    ]);
  }

  private async lint(): Promise<void> {
    const {stdout, stderr} = await executeAsPromise('yarn run lint');
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  }

  private writer(content: string, path: string): void {
    fs.appendFileSync(path, content);
    // this.lint();
  }

  private defineAst(baseName: string, types: string[]): void {
    this.path = `src/${baseName.toLowerCase()}.ts`;
    types.forEach((type, index) => {
      const className = type.split('>')[0].trim();
      const fields = type.split('>')[1].trim();
      const baseClassContent = `
      ${
        baseName !== 'Stmt'
          ? `import Token from './token'
          `
          : `import {Expression} from './expression';
          import Token from './token'
          
          `
      }
      export abstract class ${baseName}{ 
        constructor() {}
        abstract accept<R>(visitor: ${baseName}Visitor<R>): R;
    }
        `;
      if (index === 0) this.writer(baseClassContent, this.path);
      this.defineType(baseName, className, fields);
    });
    this.defineVisitor(baseName, types);
  }

  private defineVisitor(baseName: string, types: string[]): void {
    const content = `
    export interface ${baseName}Visitor<T> {
      ${(function (): string {
        let visits = '';
        for (const type of types) {
          const className = type.split('>')[0].trim();
          visits += `visit${className}${baseName}(expression: ${className}${baseName}): T;
          `;
        }
        return visits;
      })()}
    }
    `;
    this.writer(content, this.path);
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
    export class ${className}${baseName} extends ${baseName} {
      accept<T>(visitor: ${baseName}Visitor<T>): T {
        return visitor.visit${className}${baseName}(this);
      }
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
