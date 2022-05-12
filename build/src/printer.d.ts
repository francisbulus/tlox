import { Binary, ExpressionVisitor, Grouping, Literal, Unary, Expression } from './expression';
export default class AstPrinter implements ExpressionVisitor<string> {
    visitBinary(expression: Binary): string;
    visitGrouping(expression: Grouping): string;
    visitLiteral(expression: Literal): string;
    visitUnary(expression: Unary): string;
    parenthesize(name: string, ...expressions: Expression[]): string;
    print(expression: Expression): string;
}
