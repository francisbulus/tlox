"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unary = exports.Literal = exports.Grouping = exports.Binary = void 0;
class Expression {
    constructor() { }
}
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
        return visitor.visitUnary(this);
    }
}
exports.Binary = Binary;
class Grouping extends Expression {
    constructor(expression) {
        super();
        this.expression = expression;
        this.expression = expression;
    }
}
exports.Grouping = Grouping;
class Literal extends Expression {
    constructor(value) {
        super();
        this.value = value;
        this.value = value;
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
}
exports.Unary = Unary;
//# sourceMappingURL=expressioen.js.map