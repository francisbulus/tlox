import Token from './token';
export declare abstract class Expression {
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
    accept<T>(visitor: ExpressionVisitor<T>): T;
    constructor(expression: Expression);
}
export declare class Literal extends Expression {
    readonly value: any;
    accept<T>(visitor: ExpressionVisitor<T>): T;
    constructor(value: any);
}
export declare class Unary extends Expression {
    readonly operator: Token;
    readonly right: Expression;
    accept<T>(visitor: ExpressionVisitor<T>): T;
    constructor(operator: Token, right: Expression);
}
export interface ExpressionVisitor<T> {
    visitBinary(expression: Binary): T;
    visitGrouping(expression: Grouping): T;
    visitLiteral(expression: Literal): T;
    visitUnary(expression: Unary): T;
}
