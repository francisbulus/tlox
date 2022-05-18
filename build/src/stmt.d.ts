import { Expression } from './expression';
declare abstract class Stmt {
    constructor();
    abstract accept<R>(visitor: StmtVisitor<R>): R;
}
export declare class ExpressionStmt extends Stmt {
    readonly expression: Expression;
    accept<T>(visitor: StmtVisitor<T>): T;
    constructor(expression: Expression);
}
export declare class PrintStmt extends Stmt {
    readonly expression: Expression;
    accept<T>(visitor: StmtVisitor<T>): T;
    constructor(expression: Expression);
}
export interface StmtVisitor<T> {
    visitExpressionStmt(expression: ExpressionStmt): T;
    visitPrintStmt(expression: PrintStmt): T;
}
export {};
