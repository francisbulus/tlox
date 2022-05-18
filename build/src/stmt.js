"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintStmt = exports.ExpressionStmt = void 0;
class Stmt {
    constructor() { }
}
class ExpressionStmt extends Stmt {
    constructor(expression) {
        super();
        this.expression = expression;
        this.expression = expression;
    }
    accept(visitor) {
        return visitor.visitExpressionStmt(this);
    }
}
exports.ExpressionStmt = ExpressionStmt;
class PrintStmt extends Stmt {
    constructor(expression) {
        super();
        this.expression = expression;
        this.expression = expression;
    }
    accept(visitor) {
        return visitor.visitPrintStmt(this);
    }
}
exports.PrintStmt = PrintStmt;
//# sourceMappingURL=stmt.js.map