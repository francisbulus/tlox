import { BinaryExpression, Expression, ExpressionVisitor, GroupingExpression, LiteralExpression, UnaryExpression } from './expression';
import { LiteralType } from './types';
export declare class Interpreter implements ExpressionVisitor<LiteralType> {
    interpret(expression: Expression): void;
    visitGroupingExpression(expression: GroupingExpression): LiteralType;
    private evaluate;
    visitBinaryExpression(expression: BinaryExpression): string | number | boolean | null;
    visitLiteralExpression(expression: LiteralExpression): any;
    visitUnaryExpression(expression: UnaryExpression): number | boolean | null;
    private checkNumberOperand;
    private checkNumberOperands;
    private isTruthy;
    private isEqual;
    private stringify;
}
