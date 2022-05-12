import {
  Binary,
  ExpressionVisitor,
  Grouping,
  Literal,
  Unary,
  Expression,
} from './expression';

export default class AstPrinter implements ExpressionVisitor<string> {
  visitBinary(expression: Binary): string {
    return this.parenthesize(
      expression.operator.lexeme,
      expression.left,
      expression.right
    );
  }
  visitGrouping(expression: Grouping): string {
    return this.parenthesize('group', expression.expression);
  }
  visitLiteral(expression: Literal): string {
    if (expression.value == null) return 'nil';
    return expression.value.toString();
  }
  visitUnary(expression: Unary): string {
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
