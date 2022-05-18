import { Binary, Expression, ExpressionVisitor, Grouping, Literal, Unary } from './expression';
import { LiteralType } from './types';
export declare class Interpreter implements ExpressionVisitor<LiteralType> {
    interpret(expression: Expression): void;
    visitGrouping(expression: Grouping): LiteralType;
    private evaluate;
    visitBinary(expression: Binary): string | number | boolean | null;
    visitLiteral(expression: Literal): any;
    visitUnary(expression: Unary): number | boolean | null;
    private checkNumberOperand;
    private checkNumberOperands;
    private isTruthy;
    private isEqual;
    private stringify;
}
