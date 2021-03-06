import Token from './token';

export abstract class Expression {
  constructor() {}
  abstract accept<R>(visitor: ExpressionVisitor<R>): R;
}

export class AssignExpression extends Expression {
  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitAssignExpression(this);
  }
  constructor(readonly name: Token, readonly value: Expression) {
    super();
    this.name = name;
    this.value = value;
  }
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
export class VariableExpression extends Expression {
  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitVariableExpression(this);
  }
  constructor(readonly name: Token) {
    super();
    this.name = name;
  }
}
export interface ExpressionVisitor<T> {
  visitAssignExpression(expression: AssignExpression): T;
  visitBinaryExpression(expression: BinaryExpression): T;
  visitGroupingExpression(expression: GroupingExpression): T;
  visitLiteralExpression(expression: LiteralExpression): T;
  visitUnaryExpression(expression: UnaryExpression): T;
  visitVariableExpression(expression: VariableExpression): T;
}
