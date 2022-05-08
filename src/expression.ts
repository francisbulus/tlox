import Token from './token';

class Expression {
  constructor() {}
}

export class Binary extends Expression {
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
  constructor(readonly expression: Expression) {
    super();
    this.expression = expression;
  }
}
export class Literal extends Expression {
  constructor(readonly value: any) {
    super();
    this.value = value;
  }
}
export class Unary extends Expression {
  constructor(readonly operator: Token, readonly right: Expression) {
    super();
    this.operator = operator;
    this.right = right;
  }
}
