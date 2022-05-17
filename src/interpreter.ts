import {
  Binary,
  ExpressionVisitor,
  Grouping,
  Literal,
  Unary,
} from './expression';
import {LiteralType} from './types';

export class Interpreter implements ExpressionVisitor<LiteralType> {
  visitBinary(expression: Binary) {
    throw new Error('Method not implemented.');
  }
  visitGrouping(expression: Grouping): LiteralType {
    return this.evaluate(expression);
  }
  evaluate(expression: Grouping) {
    throw new Error('Method not implemented.');
  }
  visitUnary(expression: Unary) {
    throw new Error('Method not implemented.');
  }
  visitLiteral(expression: Literal): LiteralType {
    return expression.value;
  }
}
