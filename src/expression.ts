import Token from './token';

abstract class Expression {
  constructor() {}
  abstract accept<R>(visitor: ExpressionVisitor<R>): R;
}

export class Binary extends Expression {
  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitBinary(this);
  }
  constructor(
    readonly left: Expression,
    readonly operator: Token,
    readonly right: Expression
  ) {
    super();
    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}
export class Grouping extends Expression {
  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitGrouping(this);
  }
  constructor(readonly expression: Expression) {
    super();
    this.expression = expression;
  }
}
export class Literal extends Expression {
  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitLiteral(this);
  }
  constructor(readonly value: any) {
    super();
    this.value = value;
  }
}
export class Unary extends Expression {
  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitUnary(this);
  }
  constructor(readonly operator: Token, readonly right: Expression) {
    super();
    this.operator = operator;
    this.right = right;
  }
}
export interface ExpressionVisitor<T> {
  visitBinary(expression: Binary): T;
  visitGrouping(expression: Grouping): T;
  visitLiteral(expression: Literal): T;
  visitUnary(expression: Unary): T;
}
