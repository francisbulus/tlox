import { Binary, ExpressionVisitor, Grouping, Literal, Unary } from './expression';
import { LiteralType } from './types';
export declare class Interpreter implements ExpressionVisitor<LiteralType> {
    visitBinary(expression: Binary): void;
    visitGrouping(expression: Grouping): LiteralType;
    evaluate(expression: Grouping): void;
    visitUnary(expression: Unary): void;
    visitLiteral(expression: Literal): LiteralType;
}
