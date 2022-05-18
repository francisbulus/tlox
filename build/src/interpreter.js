"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = void 0;
const types_1 = require("./types");
class Interpreter {
    visitBinary(expression) {
        const left = this.evaluate(expression.left);
        const right = this.evaluate(expression.right);
        switch (expression.operator.type) {
            case types_1.TokenType.MINUS:
                return parseFloat(left) - parseFloat(right);
            case types_1.TokenType.PLUS:
                if (typeof left === 'string' && typeof right === 'string')
                    return String(left) + String(right);
                if (typeof left === 'number' && typeof right === 'number')
                    return left + right;
                break;
            case types_1.TokenType.SLASH:
                return parseFloat(left) / parseFloat(right);
            case types_1.TokenType.STAR:
                return parseFloat(left) * parseFloat(right);
        }
        return null;
    }
    visitGrouping(expression) {
        return this.evaluate(expression);
    }
    visitLiteral(expression) {
        return expression.value;
    }
    visitUnary(expression) {
        const right = this.evaluate(expression.right);
        switch (expression.operator.type) {
            case types_1.TokenType.BANG:
                return !this.isTruthy(right);
            case types_1.TokenType.MINUS:
                return -parseFloat(right);
        }
        return null;
    }
    isTruthy(object) {
        if (object === null)
            return false;
        if (typeof object === 'boolean')
            return Boolean(object);
        return true;
    }
    evaluate(expression) {
        return expression.accept(this);
    }
}
exports.Interpreter = Interpreter;
//# sourceMappingURL=interpreter.js.map