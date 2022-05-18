"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = exports.Expression = void 0;
class Stmt {
    constructor() { }
}
class Expression extends Stmt {
    constructor(expression) {
        super();
        this.expression = expression;
        this.expression = expression;
    }
    accept(visitor) {
        return visitor.visitExpression(this);
    }
}
exports.Expression = Expression;
class Print extends Stmt {
    constructor(expression) {
        super();
        this.expression = expression;
        this.expression = expression;
    }
    accept(visitor) {
        return visitor.visitPrint(this);
    }
}
exports.Print = Print;
//# sourceMappingURL=stmt.js.map