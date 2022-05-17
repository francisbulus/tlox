"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = void 0;
class Interpreter {
    visitBinary(expression) {
        throw new Error('Method not implemented.');
    }
    visitGrouping(expression) {
        return this.evaluate(expression);
    }
    evaluate(expression) {
        throw new Error('Method not implemented.');
    }
    visitUnary(expression) {
        throw new Error('Method not implemented.');
    }
    visitLiteral(expression) {
        return expression.value;
    }
}
exports.Interpreter = Interpreter;
//# sourceMappingURL=interpreter.js.map