"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Token {
    constructor(type, lexeme, literal, line) {
        this.type = type;
        this.lexeme = lexeme;
        this.literal = literal;
        this.line = line;
        this.type = type;
        this.lexeme = lexeme;
        this.literal = literal;
        this.line = line;
    }
    toString() {
        return (this.line + ' | ' + this.type + ' ' + this.lexeme + ' ' + this.literal);
    }
}
exports.default = Token;
//# sourceMappingURL=token.js.map