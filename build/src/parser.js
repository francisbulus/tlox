"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const expression_1 = require("./expression");
const lox_1 = require("./lox");
const types_1 = require("./types");
class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.tokens = tokens;
        this.current = 0;
    }
    parse() {
        try {
            return this.expression();
        }
        catch (err) {
            return null;
        }
    }
    expression() {
        return this.equality();
    }
    equality() {
        let expr = this.comparison();
        while (this.match(types_1.TokenType.BANG_EQUAL, types_1.TokenType.EQUAL_EQUAL)) {
            let operator = this.previous();
            let right = this.comparison();
            expr = new expression_1.BinaryExpression(expr, operator, right);
        }
        return expr;
    }
    match(...types) {
        for (const type of types) {
            if (this.check(type)) {
                this.advance();
                return true;
            }
        }
        return false;
    }
    consume(type, message) {
        if (this.check(type))
            return this.advance();
        throw this.error(this.peek(), message);
    }
    check(type) {
        if (this.isAtEnd())
            return false;
        return this.peek().type == type;
    }
    advance() {
        if (!this.isAtEnd())
            this.current++;
        return this.previous();
    }
    isAtEnd() {
        return this.peek().type === types_1.TokenType.EOF;
    }
    peek() {
        return this.tokens[this.current];
    }
    previous() {
        return this.tokens[this.current - 1];
    }
    error(token, message) {
        lox_1.default.error(token, message);
        return new ParseError();
    }
    synchronize() {
        this.advance();
        while (!this.isAtEnd()) {
            if (this.previous().type == types_1.TokenType.SEMICOLON)
                return;
            switch (this.peek().type) {
                case types_1.TokenType.CLASS:
                case types_1.TokenType.FUN:
                case types_1.TokenType.VAR:
                case types_1.TokenType.FOR:
                case types_1.TokenType.IF:
                case types_1.TokenType.WHILE:
                case types_1.TokenType.PRINT:
                case types_1.TokenType.RETURN:
                    return;
            }
            this.advance();
        }
    }
    comparison() {
        let expr = this.term();
        while (this.match(types_1.TokenType.GREATER, types_1.TokenType.GREATER_EQUAL, types_1.TokenType.LESS, types_1.TokenType.LESS_EQUAL)) {
            const operator = this.previous();
            const right = this.term();
            expr = new expression_1.BinaryExpression(expr, operator, right);
        }
        return expr;
    }
    term() {
        let expr = this.factor();
        while (this.match(types_1.TokenType.MINUS, types_1.TokenType.PLUS)) {
            const operator = this.previous();
            const right = this.factor();
            expr = new expression_1.BinaryExpression(expr, operator, right);
        }
        return expr;
    }
    factor() {
        let expr = this.unary();
        while (this.match(types_1.TokenType.SLASH, types_1.TokenType.STAR)) {
            const operator = this.previous();
            const right = this.unary();
            expr = new expression_1.BinaryExpression(expr, operator, right);
        }
        return expr;
    }
    unary() {
        if (this.match(types_1.TokenType.BANG, types_1.TokenType.MINUS)) {
            const operator = this.previous();
            const right = this.unary();
            return new expression_1.UnaryExpression(operator, right);
        }
        return this.primary();
    }
    primary() {
        if (this.match(types_1.TokenType.FALSE))
            return new expression_1.LiteralExpression(false);
        else if (this.match(types_1.TokenType.TRUE))
            return new expression_1.LiteralExpression(true);
        else if (this.match(types_1.TokenType.NIL))
            return new expression_1.LiteralExpression(null);
        else if (this.match(types_1.TokenType.NUMBER, types_1.TokenType.STRING)) {
            return new expression_1.LiteralExpression(this.previous().literal);
        }
        else if (this.match(types_1.TokenType.LEFT_PAREN)) {
            const expr = this.expression();
            this.consume(types_1.TokenType.RIGHT_PAREN, "Expect ')' after expression.");
            return new expression_1.GroupingExpression(expr);
        }
        else {
            throw this.error(this.peek(), 'Expect expression.');
        }
    }
}
exports.Parser = Parser;
class ParseError extends Error {
}
//# sourceMappingURL=parser.js.map