import { Binary, ExpressionVisitor, Grouping, Literal, Unary } from './expression';
import { LiteralType } from './types';
export declare class Interpreter implements ExpressionVisitor<LiteralType> {
    visitBinary(expression: Binary): string | number | null;
    visitGrouping(expression: Grouping): LiteralType;
    visitLiteral(expression: Literal): LiteralType;
    visitUnary(expression: Unary): number | boolean | null;
    private isTruthy;
    private evaluate;
}
