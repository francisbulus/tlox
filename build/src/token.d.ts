import { TokenType } from './types';
export default class Token {
    protected type: TokenType;
    lexeme: string;
    protected literal: object | null | string | number;
    protected line: number;
    constructor(type: TokenType, lexeme: string, literal: object | null | string | number, line: number);
    toString(): string;
}
