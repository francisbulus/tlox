import exp = require('constants');
import {
  Binary,
  Expression,
  ExpressionVisitor,
  Grouping,
  Literal,
  Unary,
} from './expression';
import {LiteralType, TokenType} from './types';

export class Interpreter implements ExpressionVisitor<LiteralType> {
  visitBinary(expression: Binary) {
    const left: any = this.evaluate(expression.left);
    const right: any = this.evaluate(expression.right);
    switch (expression.operator.type) {
      case TokenType.MINUS:
        return parseFloat(left) - parseFloat(right);
      case TokenType.PLUS:
        if (typeof left === 'string' && typeof right === 'string')
          return String(left) + String(right);
        if (typeof left === 'number' && typeof right === 'number')
          return left + right;
        break;
      case TokenType.SLASH:
        return parseFloat(left) / parseFloat(right);
      case TokenType.STAR:
        return parseFloat(left) * parseFloat(right);
    }
    return null;
  }
  visitGrouping(expression: Grouping): LiteralType {
    return this.evaluate(expression);
  }
  visitLiteral(expression: Literal): LiteralType {
    return expression.value;
  }

  visitUnary(expression: Unary) {
    const right: string = this.evaluate(expression.right);
    switch (expression.operator.type) {
      case TokenType.BANG:
        return !this.isTruthy(right);
      case TokenType.MINUS:
        return -parseFloat(right);
    }
    return null;
  }

  private isTruthy(object: Object) {
    if (object === null) return false;
    if (typeof object === 'boolean') return Boolean(object);
    return true;
  }

  private evaluate(expression: Expression) {
    return expression.accept(this);
  }
}
