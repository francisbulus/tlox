import { Binary, ExpressionVisitor, Grouping, Literal, Unary } from './expression';
import { LiteralType } from './types';
export declare class Interpreter implements ExpressionVisitor<LiteralType> {
    visitGrouping(expression: Grouping): LiteralType;
    private evaluate;
    visitBinary(expression: Binary): string | number | boolean | null;
    visitLiteral(expression: Literal): any;
    visitUnary(expression: Unary): number | boolean | null;
    private isTruthy;
    private isEqual;
}
