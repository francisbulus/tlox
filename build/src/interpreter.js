"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = void 0;
const error_1 = require("./error");
const lox_1 = require("./lox");
const types_1 = require("./types");
class Interpreter {
    interpret(expression) {
        try {
            const value = this.evaluate(expression);
            console.log(this.stringify(value));
        }
        catch (error) {
            lox_1.default.runtimeError(error);
        }
    }
    visitGroupingExpression(expression) {
        return this.evaluate(expression);
    }
    evaluate(expression) {
        return expression.accept(this);
    }
    visitBinaryExpression(expression) {
        const left = this.evaluate(expression.left);
        const right = this.evaluate(expression.right);
        switch (expression.operator.type) {
            case types_1.TokenType.GREATER:
                this.checkNumberOperands(expression.operator, left, right);
                return parseFloat(left) > parseFloat(right);
            case types_1.TokenType.GREATER_EQUAL:
                this.checkNumberOperands(expression.operator, left, right);
                return parseFloat(left) >= parseFloat(right);
            case types_1.TokenType.LESS:
                this.checkNumberOperands(expression.operator, left, right);
                return parseFloat(left) < parseFloat(right);
            case types_1.TokenType.LESS_EQUAL:
                this.checkNumberOperands(expression.operator, left, right);
                return parseFloat(left) <= parseFloat(right);
            case types_1.TokenType.MINUS:
                this.checkNumberOperands(expression.operator, left, right);
                return parseFloat(left) - parseFloat(right);
            case types_1.TokenType.PLUS:
                if (typeof left === 'string' && typeof right === 'string')
                    return String(left) + String(right);
                if (typeof left === 'number' && typeof right === 'number')
                    return left + right;
                throw new error_1.default(expression.operator, 'Operands must be two numbers or two strings.');
            case types_1.TokenType.SLASH:
                this.checkNumberOperands(expression.operator, left, right);
                return parseFloat(left) / parseFloat(right);
            case types_1.TokenType.STAR:
                this.checkNumberOperands(expression.operator, left, right);
                return parseFloat(left) * parseFloat(right);
            case types_1.TokenType.BANG_EQUAL:
                return !this.isEqual(left, right);
            case types_1.TokenType.EQUAL_EQUAL:
                return this.isEqual(left, right);
        }
        return null;
    }
    visitLiteralExpression(expression) {
        return expression.value;
    }
    visitUnaryExpression(expression) {
        const right = this.evaluate(expression.right);
        switch (expression.operator.type) {
            case types_1.TokenType.BANG:
                return !this.isTruthy(right);
            case types_1.TokenType.MINUS:
                this.checkNumberOperand(expression.operator, right);
                return -parseFloat(right);
        }
        return null;
    }
    checkNumberOperand(operator, operand) {
        if (typeof operand === 'number')
            return;
        throw new error_1.default(operator, 'Operand must be a number.');
    }
    checkNumberOperands(operator, left, right) {
        if (typeof left === 'number' && typeof right === 'number')
            return;
        throw new error_1.default(operator, 'Operand must be a number.');
    }
    isTruthy(object) {
        if (object === null)
            return false;
        if (typeof object === 'boolean')
            return Boolean(object);
        return true;
    }
    isEqual(a, b) {
        if (a === null && b === null)
            return true;
        if (a === null)
            return false;
        return a === b;
    }
    stringify(object) {
        if (object === null)
            return 'nil';
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
exports.Interpreter = Interpreter;
//# sourceMappingURL=interpreter.js.map