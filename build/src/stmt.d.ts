declare abstract class Stmt {
    constructor();
    abstract accept<R>(visitor: StmtVisitor<R>): R;
}
export declare class Expression extends Stmt {
    readonly expression: Expression;
    accept<T>(visitor: StmtVisitor<T>): T;
    constructor(expression: Expression);
}
export declare class Print extends Stmt {
    readonly expression: Expression;
    accept<T>(visitor: StmtVisitor<T>): T;
    constructor(expression: Expression);
}
export interface StmtVisitor<T> {
    visitExpression(expression: Expression): T;
    visitPrint(expression: Print): T;
}
export {};
