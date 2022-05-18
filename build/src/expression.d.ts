import Token from './token';
export declare abstract class Expression {
    constructor();
    abstract accept<R>(visitor: ExpressionVisitor<R>): R;
}
export declare class BinaryExpression extends Expression {
    readonly left: Expression;
    readonly operator: Token;
    readonly right: Expression;
    accept<T>(visitor: ExpressionVisitor<T>): T;
    constructor(left: Expression, operator: Token, right: Expression);
}
export declare class GroupingExpression extends Expression {
    readonly expression: Expression;
    accept<T>(visitor: ExpressionVisitor<T>): T;
    constructor(expression: Expression);
}
export declare class LiteralExpression extends Expression {
    readonly value: any;
    accept<T>(visitor: ExpressionVisitor<T>): T;
    constructor(value: any);
}
export declare class UnaryExpression extends Expression {
    readonly operator: Token;
    readonly right: Expression;
    accept<T>(visitor: ExpressionVisitor<T>): T;
    constructor(operator: Token, right: Expression);
}
export interface ExpressionVisitor<T> {
    visitBinaryExpression(expression: BinaryExpression): T;
    visitGroupingExpression(expression: GroupingExpression): T;
    visitLiteralExpression(expression: LiteralExpression): T;
    visitUnaryExpression(expression: UnaryExpression): T;
}
