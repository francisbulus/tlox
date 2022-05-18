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
  visitGrouping(expression: Grouping): LiteralType {
    return this.evaluate(expression);
  }

  private evaluate(expression: Expression) {
    return expression.accept(this);
  }

  visitBinary(expression: Binary) {
    const left: any = this.evaluate(expression.left);
    const right: any = this.evaluate(expression.right);
    switch (expression.operator.type) {
      case TokenType.GREATER:
        return parseFloat(left) > parseFloat(right);
      case TokenType.GREATER_EQUAL:
        return parseFloat(left) >= parseFloat(right);
      case TokenType.LESS:
        return parseFloat(left) < parseFloat(right);
      case TokenType.LESS_EQUAL:
        return parseFloat(left) <= parseFloat(right);
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
      case TokenType.BANG_EQUAL:
        return !this.isEqual(left, right);
      case TokenType.EQUAL_EQUAL:
        return this.isEqual(left, right);
    }
    return null;
  }
  visitLiteral(expression: Literal): any {
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

  private isTruthy(object: any): boolean {
    if (object === null) return false;
    if (typeof object === 'boolean') return Boolean(object);
    return true;
  }

  private isEqual(a: any, b: any): boolean {
    if (a == null && b == null) return true;
    if (a == null) return false;
    return a === b;
  }
}
