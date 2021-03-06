import {Environment} from './environment';
import RuntimeError from './error';
import {
  AssignExpression,
  BinaryExpression,
  Expression,
  ExpressionVisitor,
  GroupingExpression,
  LiteralExpression,
  UnaryExpression,
  VariableExpression,
} from './expression';
import Lox from './lox';
import {
  BlockStmt,
  ExpressionStmt,
  PrintStmt,
  Stmt,
  StmtVisitor,
  VarStmt,
} from './stmt';
import Token from './token';
import {LiteralType, TokenType} from './types';

export class Interpreter
  implements ExpressionVisitor<LiteralType>, StmtVisitor<void>
{
  private environment = new Environment();

  interpret(statements: Stmt[]): void {
    try {
      for (const statement of statements) {
        this.execute(statement);
      }
    } catch (error) {
      Lox.runtimeError(error as RuntimeError);
    }
  }

  visitGroupingExpression(expression: GroupingExpression): LiteralType {
    return this.evaluate(expression);
  }

  private evaluate(expression: Expression) {
    return expression.accept(this);
  }

  private execute(statement: Stmt): void {
    statement.accept(this);
  }

  visitBlockStmt(statement: BlockStmt): void {
    this.executeBlock(statement.statements, new Environment(this.environment));
  }

  executeBlock(statements: Stmt[], environment: Environment) {
    const previous = this.environment;
    try {
      this.environment = environment;
      for (const statement of statements) {
        this.execute(statement);
      }
    } finally {
      this.environment = previous;
    }
  }

  visitExpressionStmt(statement: ExpressionStmt): void {
    this.evaluate(statement.expression);
  }

  visitPrintStmt(statement: PrintStmt): void {
    const value = this.evaluate(statement.expression);
    console.log(this.stringify(value));
  }

  visitVarStmt(statement: VarStmt): void {
    let value = null;
    if (statement.initializer !== null) {
      value = this.evaluate(statement.initializer);
    }
    this.environment.define(statement.name.lexeme, value);
  }

  visitAssignExpression(expression: AssignExpression): any {
    const value = this.evaluate(expression.value);
    this.environment.assign(expression.name, value);
    return value;
  }

  visitBinaryExpression(expression: BinaryExpression) {
    const left: any = this.evaluate(expression.left);
    const right: any = this.evaluate(expression.right);
    switch (expression.operator.type) {
      case TokenType.GREATER:
        this.checkNumberOperands(expression.operator, left, right);
        return parseFloat(left) > parseFloat(right);
      case TokenType.GREATER_EQUAL:
        this.checkNumberOperands(expression.operator, left, right);
        return parseFloat(left) >= parseFloat(right);
      case TokenType.LESS:
        this.checkNumberOperands(expression.operator, left, right);
        return parseFloat(left) < parseFloat(right);
      case TokenType.LESS_EQUAL:
        this.checkNumberOperands(expression.operator, left, right);
        return parseFloat(left) <= parseFloat(right);
      case TokenType.MINUS:
        this.checkNumberOperands(expression.operator, left, right);
        return parseFloat(left) - parseFloat(right);
      case TokenType.PLUS:
        if (typeof left === 'string' && typeof right === 'string')
          return String(left) + String(right);
        if (typeof left === 'number' && typeof right === 'number')
          return left + right;
        throw new RuntimeError(
          expression.operator,
          'Operands must be two numbers or two strings.'
        );
      case TokenType.SLASH:
        this.checkNumberOperands(expression.operator, left, right);
        return parseFloat(left) / parseFloat(right);
      case TokenType.STAR:
        this.checkNumberOperands(expression.operator, left, right);
        return parseFloat(left) * parseFloat(right);
      case TokenType.BANG_EQUAL:
        return !this.isEqual(left, right);
      case TokenType.EQUAL_EQUAL:
        return this.isEqual(left, right);
    }
    return null;
  }
  visitLiteralExpression(expression: LiteralExpression): any {
    return expression.value;
  }

  visitUnaryExpression(expression: UnaryExpression) {
    const right: string = this.evaluate(expression.right);
    switch (expression.operator.type) {
      case TokenType.BANG:
        return !this.isTruthy(right);
      case TokenType.MINUS:
        this.checkNumberOperand(expression.operator, right);
        return -parseFloat(right);
    }
    return null;
  }

  visitVariableExpression(expression: VariableExpression) {
    return this.environment.get(expression.name);
  }

  private checkNumberOperand(operator: Token, operand: any): void {
    if (typeof operand === 'number') return;
    throw new RuntimeError(operator, 'Operand must be a number.');
  }

  private checkNumberOperands(operator: Token, left: any, right: any): void {
    if (typeof left === 'number' && typeof right === 'number') return;
    throw new RuntimeError(operator, 'Operand must be a number.');
  }

  private isTruthy(object: any): boolean {
    if (object === null) return false;
    if (typeof object === 'boolean') return Boolean(object);
    return true;
  }

  private isEqual(a: any, b: any): boolean {
    if (a === null && b === null) return true;
    if (a === null) return false;
    return a === b;
  }

  private stringify(object: any) {
    if (object === null) return 'nil';

    if (typeof object === 'number') {
      let text = object.toString();
      if (text.endsWith('.0')) {
        text = text.substring(0, text.length - 2);
      }
      return text;
    }

    return object.toString();
  }
}
