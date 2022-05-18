abstract class Stmt {
  constructor() {}
  abstract accept<R>(visitor: StmtVisitor<R>): R;
}

export class Expression extends Stmt {
  accept<T>(visitor: StmtVisitor<T>): T {
    return visitor.visitExpression(this);
  }
  constructor(readonly expression: Expression) {
    super();
    this.expression = expression;
  }
}
export class Print extends Stmt {
  accept<T>(visitor: StmtVisitor<T>): T {
    return visitor.visitPrint(this);
  }
  constructor(readonly expression: Expression) {
    super();
    this.expression = expression;
  }
}
export interface StmtVisitor<T> {
  visitExpression(expression: Expression): T;
  visitPrint(expression: Print): T;
}
