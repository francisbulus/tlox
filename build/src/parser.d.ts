import { Expression } from './expression';
import Token from './token';
export declare class Parser {
    readonly tokens: Token[];
    private current;
    constructor(tokens: Token[]);
    parse(): Expression;
    private expression;
    private equality;
    private match;
    private consume;
    private check;
    private advance;
    private isAtEnd;
    private peek;
    private previous;
    private error;
    private synchronize;
    private comparison;
    private term;
    private factor;
    private unary;
    private primary;
}
