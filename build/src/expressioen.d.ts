import Token from './token';
declare abstract class Expression {
    constructor();
    abstract accept<R>(visitor: ExpressionVisitor<R>): R;
}
export declare class Binary extends Expression {
    readonly left: Expression;
    readonly operator: Token;
    readonly right: Expression;
    accept<T>(visitor: ExpressionVisitor<T>): T;
    constructor(left: Expression, operator: Token, right: Expression);
}
export declare class Grouping extends Expression {
    readonly expression: Expression;
    constructor(expression: Expression);
}
export declare class Literal extends Expression {
    readonly value: any;
    constructor(value: any);
}
export declare class Unary extends Expression {
    readonly operator: Token;
    readonly right: Expression;
    constructor(operator: Token, right: Expression);
}
export interface ExpressionVisitor<T> {
    visitUnary(expression: Unary): T;
}
export {};
