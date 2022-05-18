import {
  BinaryExpression,
  ExpressionVisitor,
  GroupingExpression,
  LiteralExpression,
  UnaryExpression,
  Expression,
} from './expression';

export default class AstPrinter implements ExpressionVisitor<string> {
  visitBinaryExpression(expression: BinaryExpression): string {
    return this.parenthesize(
      expression.operator.lexeme,
      expression.left,
      expression.right
    );
  }
  visitGroupingExpression(expression: GroupingExpression): string {
    return this.parenthesize('group', expression.expression);
  }
  visitLiteralExpression(expression: LiteralExpression): string {
    if (expression.value === null) return 'nil';
    return expression.value.toString();
  }
  visitUnaryExpression(expression: UnaryExpression): string {
    return this.parenthesize(expression.operator.lexeme, expression.right);
  }
  parenthesize(name: string, ...expressions: Expression[]): string {
    let result = `(${name}`;
    for (const expression of expressions) {
      result += ` ${expression.accept(this)}`;
    }
    result += ')';
    return result;
  }

  print(expression: Expression) {
    return expression.accept(this);
  }
}
