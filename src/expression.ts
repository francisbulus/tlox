import Token from './token';

export abstract class Expression {
  constructor() {}
  abstract accept<R>(visitor: ExpressionVisitor<R>): R;
}

export class BinaryExpression extends Expression {
  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitBinaryExpression(this);
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
export class GroupingExpression extends Expression {
  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitGroupingExpression(this);
  }
  constructor(readonly expression: Expression) {
    super();
    this.expression = expression;
  }
}
export class LiteralExpression extends Expression {
  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitLiteralExpression(this);
  }
  constructor(readonly value: any) {
    super();
    this.value = value;
  }
}
export class UnaryExpression extends Expression {
  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitUnaryExpression(this);
  }
  constructor(readonly operator: Token, readonly right: Expression) {
    super();
    this.operator = operator;
    this.right = right;
  }
}
export interface ExpressionVisitor<T> {
  visitBinaryExpression(expression: BinaryExpression): T;
  visitGroupingExpression(expression: GroupingExpression): T;
  visitLiteralExpression(expression: LiteralExpression): T;
  visitUnaryExpression(expression: UnaryExpression): T;
}
