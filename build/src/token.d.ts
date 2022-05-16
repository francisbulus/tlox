import { TokenType } from './types';
export default class Token {
    type: TokenType;
    lexeme: string;
    literal: object | null | string | number;
    line: number;
    constructor(type: TokenType, lexeme: string, literal: object | null | string | number, line: number);
    toString(): string;
}
