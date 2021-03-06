import {TokenType} from './types';

export default class Token {
  constructor(
    public type: TokenType,
    public lexeme: string,
    public literal: object | null | string | number,
    public line: number
  ) {
    this.type = type;
    this.lexeme = lexeme;
    this.literal = literal;
    this.line = line;
  }

  public toString(): string {
    return `${this.line} | ${this.type} ${this.lexeme} ${this.literal}`;
  }
}
