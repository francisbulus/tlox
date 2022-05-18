import { BinaryExpression, ExpressionVisitor, GroupingExpression, LiteralExpression, UnaryExpression, Expression } from './expression';
export default class AstPrinter implements ExpressionVisitor<string> {
    visitBinaryExpression(expression: BinaryExpression): string;
    visitGroupingExpression(expression: GroupingExpression): string;
    visitLiteralExpression(expression: LiteralExpression): string;
    visitUnaryExpression(expression: UnaryExpression): string;
    parenthesize(name: string, ...expressions: Expression[]): string;
    print(expression: Expression): string;
}
