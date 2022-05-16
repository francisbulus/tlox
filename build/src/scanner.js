"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("./token");
const types_1 = require("./types");
const lox_1 = require("./lox");
const constants_1 = require("./constants");
class Scanner {
    constructor(source) {
        this.source = source;
        this.source = source;
        this.tokens = [];
        this.start = 0;
        this.current = 0;
        this.line = 1;
    }
    scanTokens() {
        while (!this.isAtEnd()) {
            this.start = this.current;
            this.scanToken();
        }
        this.tokens.push(new token_1.default(types_1.TokenType.EOF, '', null, this.line));
        return this.tokens;
    }
    scanToken() {
        const c = this.advance();
        switch (c) {
            case '(':
                this.addToken(types_1.TokenType.LEFT_PAREN);
                break;
            case ')':
                this.addToken(types_1.TokenType.RIGHT_PAREN);
                break;
            case '{':
                this.addToken(types_1.TokenType.LEFT_BRACE);
                break;
            case '}':
                this.addToken(types_1.TokenType.RIGHT_BRACE);
                break;
            case ',':
                this.addToken(types_1.TokenType.COMMA);
                break;
            case '.':
                this.addToken(types_1.TokenType.DOT);
                break;
            case '-':
                this.addToken(types_1.TokenType.MINUS);
                break;
            case '+':
                this.addToken(types_1.TokenType.PLUS);
                break;
            case ';':
                this.addToken(types_1.TokenType.SEMICOLON);
                break;
            case '*':
                this.addToken(types_1.TokenType.STAR);
                break;
            case '!':
                this.addToken(this.match('=') ? types_1.TokenType.BANG_EQUAL : types_1.TokenType.BANG);
                break;
            case '=':
                this.addToken(this.match('=') ? types_1.TokenType.EQUAL_EQUAL : types_1.TokenType.EQUAL);
                break;
            case '<':
                this.addToken(this.match('=') ? types_1.TokenType.LESS_EQUAL : types_1.TokenType.LESS);
                break;
            case '>':
                this.addToken(this.match('=') ? types_1.TokenType.GREATER_EQUAL : types_1.TokenType.GREATER);
                break;
            case '/':
                if (this.match('/')) {
                    while (this.peek() !== '\n' && !this.isAtEnd())
                        this.advance();
                }
                else {
                    this.addToken(types_1.TokenType.SLASH);
                }
                break;
            case ' ':
            case '\r':
            case '\t':
                break;
            case '\n':
                this.line++;
                break;
            case '"':
                this.string();
                break;
            default:
                if (this.isDigit(c)) {
                    this.number();
                }
                else if (this.isAlpha(c)) {
                    this.identifier();
                }
                else {
                    lox_1.Lox.error(this.line, 'Unexpected character.');
                }
                break;
        }
    }
    identifier() {
        while (this.isAlphaNumeric(this.peek()))
            this.advance();
        const text = this.source.substring(this.start, this.current);
        let type = constants_1.KEYWORDS[text];
        if (type === undefined)
            type = types_1.TokenType.IDENTIFIER;
        this.addToken(type);
    }
    number() {
        while (this.isDigit(this.peek()))
            this.advance();
        if (this.peek() === '.' && this.isDigit(this.peekNext())) {
            this.advance();
            while (this.isDigit(this.peek()))
                this.advance();
        }
        this.addToken(types_1.TokenType.NUMBER, parseFloat(this.source.substring(this.start, this.current)));
    }
    string() {
        while (this.peek() !== '"' && !this.isAtEnd()) {
            if (this.peek() === '\n')
                this.line++;
            this.advance();
        }
        if (this.isAtEnd()) {
            lox_1.Lox.error(this.line, 'Unterminated string.');
            return;
        }
        this.advance();
        const value = this.source.substring(this.start + 1, this.current - 1);
        this.addToken(types_1.TokenType.STRING, value);
    }
    isAtEnd() {
        return this.current >= this.source.length;
    }
    match(expected) {
        if (this.isAtEnd())
            return false;
        if (this.source.charAt(this.current) !== expected)
            return false;
        this.current++;
        return true;
    }
    peek() {
        if (this.isAtEnd())
            return '\0';
        return this.source.charAt(this.current);
    }
    peekNext() {
        if (this.current + 1 >= this.source.length)
            return '\0';
        return this.source.charAt(this.current + 1);
    }
    isAlpha(c) {
        return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_';
    }
    isAlphaNumeric(c) {
        return this.isAlpha(c) || this.isDigit(c);
    }
    isDigit(c) {
        return c >= '0' && c <= '9';
    }
    advance() {
        return this.source.charAt(this.current++);
    }
    addToken(...args) {
        const [type, literal] = args;
        if (typeof literal === 'undefined') {
            this.addToken(type, null);
        }
        else {
            const text = this.source.substring(this.start, this.current);
            this.tokens.push(new token_1.default(type, text, literal, this.line));
        }
    }
}
exports.default = Scanner;
//# sourceMappingURL=scanner.js.map