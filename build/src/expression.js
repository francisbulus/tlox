"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnaryExpression = exports.LiteralExpression = exports.GroupingExpression = exports.BinaryExpression = exports.Expression = void 0;
class Expression {
    constructor() { }
}
exports.Expression = Expression;
class BinaryExpression extends Expression {
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
        return visitor.visitBinaryExpression(this);
    }
}
exports.BinaryExpression = BinaryExpression;
class GroupingExpression extends Expression {
    constructor(expression) {
        super();
        this.expression = expression;
        this.expression = expression;
    }
    accept(visitor) {
        return visitor.visitGroupingExpression(this);
    }
}
exports.GroupingExpression = GroupingExpression;
class LiteralExpression extends Expression {
    constructor(value) {
        super();
        this.value = value;
        this.value = value;
    }
    accept(visitor) {
        return visitor.visitLiteralExpression(this);
    }
}
exports.LiteralExpression = LiteralExpression;
class UnaryExpression extends Expression {
    constructor(operator, right) {
        super();
        this.operator = operator;
        this.right = right;
        this.operator = operator;
        this.right = right;
    }
    accept(visitor) {
        return visitor.visitUnaryExpression(this);
    }
}
exports.UnaryExpression = UnaryExpression;
//# sourceMappingURL=expression.js.map