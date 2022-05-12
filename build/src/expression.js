"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unary = exports.Literal = exports.Grouping = exports.Binary = exports.Expression = void 0;
class Expression {
    constructor() { }
}
exports.Expression = Expression;
class Binary extends Expression {
    constructor(left, operator, right) {
        super();
        this.left = left;
        this.operator = operator;
        this.right = right;
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
    accept(visitor) {
        return visitor.visitBinary(this);
    }
}
exports.Binary = Binary;
class Grouping extends Expression {
    constructor(expression) {
        super();
        this.expression = expression;
        this.expression = expression;
    }
    accept(visitor) {
        return visitor.visitGrouping(this);
    }
}
exports.Grouping = Grouping;
class Literal extends Expression {
    constructor(value) {
        super();
        this.value = value;
        this.value = value;
    }
    accept(visitor) {
        return visitor.visitLiteral(this);
    }
}
exports.Literal = Literal;
class Unary extends Expression {
    constructor(operator, right) {
        super();
        this.operator = operator;
        this.right = right;
        this.operator = operator;
        this.right = right;
    }
    accept(visitor) {
        return visitor.visitUnary(this);
    }
}
exports.Unary = Unary;
//# sourceMappingURL=expression.js.map