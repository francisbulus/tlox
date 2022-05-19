import RuntimeError from './error';
import Token from './token';

export class Environment {
  private values = new Map<string, any>();

  get(name: Token) {
    if (this.values.has(name.lexeme)) return this.values.get(name.lexeme);
    throw new RuntimeError(name, `Undefined variable ${name.lexeme}.`);
  }

  define(name: string, value: any) {
    this.values.set(name, value);
  }
}
