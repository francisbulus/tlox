import { BinaryExpression, ExpressionVisitor, GroupingExpression, LiteralExpression, UnaryExpression } from './expression';
import { ExpressionStmt, PrintStmt, Stmt, StmtVisitor } from './stmt';
import { LiteralType } from './types';
export declare class Interpreter implements ExpressionVisitor<LiteralType>, StmtVisitor<void> {
    interpret(statements: Stmt[]): void;
    visitGroupingExpression(expression: GroupingExpression): LiteralType;
    private evaluate;
    private execute;
    visitExpressionStmt(statement: ExpressionStmt): void;
    visitPrintStmt(statement: PrintStmt): void;
    visitBinaryExpression(expression: BinaryExpression): string | number | boolean | null;
    visitLiteralExpression(expression: LiteralExpression): any;
    visitUnaryExpression(expression: UnaryExpression): number | boolean | null;
    private checkNumberOperand;
    private checkNumberOperands;
    private isTruthy;
    private isEqual;
    private stringify;
}
