import {Expression} from './expression';

abstract class Stmt {
  constructor() {}
  abstract accept<R>(visitor: StmtVisitor<R>): R;
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
export interface StmtVisitor<T> {
  visitExpressionStmt(expression: ExpressionStmt): T;
  visitPrintStmt(expression: PrintStmt): T;
}
