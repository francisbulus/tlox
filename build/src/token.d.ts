import { TokenType } from './types';
export default class Token {
    private type;
    private lexeme;
    private literal;
    private line;
    constructor(type: TokenType, lexeme: string, literal: object | null | string | number, line: number);
    toString(): string;
}
