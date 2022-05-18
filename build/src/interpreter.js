"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = void 0;
const types_1 = require("./types");
class Interpreter {
    visitGrouping(expression) {
        return this.evaluate(expression);
    }
    evaluate(expression) {
        return expression.accept(this);
    }
    visitBinary(expression) {
        const left = this.evaluate(expression.left);
        const right = this.evaluate(expression.right);
        switch (expression.operator.type) {
            case types_1.TokenType.GREATER:
                return parseFloat(left) > parseFloat(right);
            case types_1.TokenType.GREATER_EQUAL:
                return parseFloat(left) >= parseFloat(right);
            case types_1.TokenType.LESS:
                return parseFloat(left) < parseFloat(right);
            case types_1.TokenType.LESS_EQUAL:
                return parseFloat(left) <= parseFloat(right);
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
            case types_1.TokenType.BANG_EQUAL:
                return !this.isEqual(left, right);
            case types_1.TokenType.EQUAL_EQUAL:
                return this.isEqual(left, right);
        }
        return null;
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
    isEqual(a, b) {
        if (a == null && b == null)
            return true;
        if (a == null)
            return false;
        return a === b;
    }
}
exports.Interpreter = Interpreter;
//# sourceMappingURL=interpreter.js.map