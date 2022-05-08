import Token from './token';
declare class Expression {
    protected left: Expression;
    protected operator: Token;
    protected right: Expression;
    constructor(left: Expression, operator: Token, right: Expression);
}
export declare class Binary extends Expression {
    readonly left: Expression;
    readonly operator: Token;
    readonly right: Expression;
    constructor(left: Expression, operator: Token, right: Expression);
}
export {};
