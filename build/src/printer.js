"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AstPrinter {
    visitBinary(expression) {
        return this.parenthesize(expression.operator.lexeme, expression.left, expression.right);
    }
    visitGrouping(expression) {
        return this.parenthesize('group', expression.expression);
    }
    visitLiteral(expression) {
        if (expression.value === null)
            return 'nil';
        return expression.value.toString();
    }
    visitUnary(expression) {
        return this.parenthesize(expression.operator.lexeme, expression.right);
    }
    parenthesize(name, ...expressions) {
        let result = `(${name}`;
        for (const expression of expressions) {
            result += ` ${expression.accept(this)}`;
        }
        result += ')';
        return result;
    }
    print(expression) {
        return expression.accept(this);
    }
}
exports.default = AstPrinter;
//# sourceMappingURL=printer.js.map