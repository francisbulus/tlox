import {TokenType} from './types';

export default class Token {
  constructor(
    protected type: TokenType,
    public lexeme: string,
    protected literal: object | null | string | number,
    protected line: number
  ) {
    this.type = type;
    this.lexeme = lexeme;
    this.literal = literal;
    this.line = line;
  }

  public toString(): string {
    return (
      this.line + ' | ' + this.type + ' ' + this.lexeme + ' ' + this.literal
    );
  }
}
