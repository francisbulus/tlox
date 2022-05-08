import {TokenType} from './types';

export default class Token {
  constructor(
    private type: TokenType,
    private lexeme: string,
    private literal: object | null | string | number,
    private line: number
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
