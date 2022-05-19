import {Expression} from './expression';
import Token from './token';

export abstract class Stmt {
  constructor() {}
  abstract accept<R>(visitor: StmtVisitor<R>): R;
}

export class BlockStmt extends Stmt {
  accept<T>(visitor: StmtVisitor<T>): T {
    return visitor.visitBlockStmt(this);
  }
  constructor(readonly statements: Stmt[]) {
    super();
    this.statements = statements;
  }
}
export class ExpressionStmt extends Stmt {
  accept<T>(visitor: StmtVisitor<T>): T {
    return visitor.visitExpressionStmt(this);
  }
  constructor(readonly expression: Expression) {
    super();
    this.expression = expression;
  }
}
export class PrintStmt extends Stmt {
  accept<T>(visitor: StmtVisitor<T>): T {
    return visitor.visitPrintStmt(this);
  }
  constructor(readonly expression: Expression) {
    super();
    this.expression = expression;
  }
}
export class VarStmt extends Stmt {
  accept<T>(visitor: StmtVisitor<T>): T {
    return visitor.visitVarStmt(this);
  }
  constructor(readonly name: Token, readonly initializer: Expression) {
    super();
    this.name = name;
    this.initializer = initializer;
  }
}
export interface StmtVisitor<T> {
  visitBlockStmt(expression: BlockStmt): T;
  visitExpressionStmt(expression: ExpressionStmt): T;
  visitPrintStmt(expression: PrintStmt): T;
  visitVarStmt(expression: VarStmt): T;
}
