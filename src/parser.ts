import {
  AssignExpression,
  BinaryExpression,
  Expression,
  GroupingExpression,
  LiteralExpression,
  UnaryExpression,
  VariableExpression,
} from './expression';
import Lox from './lox';
import {ExpressionStmt, PrintStmt, Stmt, VarStmt} from './stmt';
import Token from './token';
import {TokenType} from './types';

export class Parser {
  private current: number;

  constructor(readonly tokens: Token[]) {
    this.tokens = tokens;
    this.current = 0;
  }

  parse(): Stmt[] {
    let statements = [];
    while (!this.isAtEnd()) {
      statements.push(this.declaration());
    }
    return statements;
  }

  private statement(): Stmt {
    if (this.match(TokenType.PRINT)) return this.printStatement();
    return this.expressionStatement();
  }

  private printStatement(): Stmt {
    const value = this.expression();
    this.consume(TokenType.SEMICOLON, "Expect ';' after value.");
    return new PrintStmt(value);
  }

  private varDeclaration(): Stmt {
    const name = this.consume(TokenType.IDENTIFIER, 'Expect variable name.');
    let initializer: any = null;
    if (this.match(TokenType.EQUAL)) {
      initializer = this.expression();
    }
    this.consume(TokenType.SEMICOLON, "Expect ';' after variable declaration.");
    return new VarStmt(name, initializer);
  }

  private expressionStatement(): Stmt {
    const expr = this.expression();
    this.consume(TokenType.SEMICOLON, "Expect ';' after expression.");
    return new ExpressionStmt(expr);
  }

  private assignment(): Expression {
    const expression = this.equality();
    if (this.match(TokenType.EQUAL)) {
      const equals = this.previous();
      const value = this.assignment();
      if (expression instanceof VariableExpression) {
        const name = expression.name;
        return new AssignExpression(name, value);
      }
      this.error(equals, 'Invalid assignment target.');
    }
    return expression;
  }

  private expression(): Expression {
    return this.assignment();
  }

  private declaration(): Stmt {
    try {
      if (this.match(TokenType.VAR)) return this.varDeclaration();
      return this.statement();
    } catch (error) {
      this.synchronize();
      return null as never;
    }
  }

  private equality(): Expression {
    let expr: Expression = this.comparison();
    while (this.match(TokenType.BANG_EQUAL, TokenType.EQUAL_EQUAL)) {
      let operator = this.previous();
      let right = this.comparison();
      expr = new BinaryExpression(expr, operator, right);
    }
    return expr;
  }

  private match(...types: TokenType[]): boolean {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  private consume(type: TokenType, message: string): Token {
    if (this.check(type)) return this.advance();
    throw this.error(this.peek(), message);
  }

  private check(type: TokenType) {
    if (this.isAtEnd()) return false;
    return this.peek().type == type;
  }

  private advance(): Token {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  private isAtEnd(): boolean {
    return this.peek().type === TokenType.EOF;
  }

  private peek(): Token {
    return this.tokens[this.current];
  }

  private previous(): Token {
    return this.tokens[this.current - 1];
  }

  private error(token: Token, message: string): ParseError {
    Lox.error(token, message);
    return new ParseError(message);
  }

  private synchronize(): void {
    this.advance();
    while (!this.isAtEnd()) {
      if (this.previous().type == TokenType.SEMICOLON) return;
      switch (this.peek().type) {
        case TokenType.CLASS:
        case TokenType.FUN:
        case TokenType.VAR:
        case TokenType.FOR:
        case TokenType.IF:
        case TokenType.WHILE:
        case TokenType.PRINT:
        case TokenType.RETURN:
          return;
      }

      this.advance();
    }
  }

  private comparison(): Expression {
    let expr = this.term();

    while (
      this.match(
        TokenType.GREATER,
        TokenType.GREATER_EQUAL,
        TokenType.LESS,
        TokenType.LESS_EQUAL
      )
    ) {
      const operator = this.previous();
      const right = this.term();
      expr = new BinaryExpression(expr, operator, right);
    }
    return expr;
  }

  private term(): Expression {
    let expr = this.factor();
    while (this.match(TokenType.MINUS, TokenType.PLUS)) {
      const operator = this.previous();
      const right = this.factor();
      expr = new BinaryExpression(expr, operator, right);
    }
    return expr;
  }

  private factor(): Expression {
    let expr = this.unary();

    while (this.match(TokenType.SLASH, TokenType.STAR)) {
      const operator = this.previous();
      const right = this.unary();
      expr = new BinaryExpression(expr, operator, right);
    }

    return expr;
  }

  private unary(): Expression {
    if (this.match(TokenType.BANG, TokenType.MINUS)) {
      const operator = this.previous();
      const right = this.unary();
      return new UnaryExpression(operator, right);
    }

    return this.primary();
  }

  private primary(): Expression {
    if (this.match(TokenType.FALSE)) return new LiteralExpression(false);
    if (this.match(TokenType.TRUE)) return new LiteralExpression(true);
    if (this.match(TokenType.NIL)) return new LiteralExpression(null);
    if (this.match(TokenType.NUMBER, TokenType.STRING)) {
      return new LiteralExpression(this.previous().literal);
    }
    if (this.match(TokenType.IDENTIFIER)) {
      return new VariableExpression(this.previous());
    }

    if (this.match(TokenType.LEFT_PAREN)) {
      const expr = this.expression();
      this.consume(TokenType.RIGHT_PAREN, "Expect ')' after expression.");
      return new GroupingExpression(expr);
    }
    throw this.error(this.peek(), 'Expect expression.');
  }
}

class ParseError extends Error {
  constructor(message: string) {
    super(message);
  }
}
