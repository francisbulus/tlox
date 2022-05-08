import Token from './token';

class Expression {
  constructor(
    protected left: Expression,
    protected operator: Token,
    protected right: Expression
  ) {
    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}

export class Binary extends Expression {
  constructor(
    readonly left: Expression,
    readonly operator: Token,
    readonly right: Expression
  ) {
    super(left, operator, right);
    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}
