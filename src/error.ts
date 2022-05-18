import Token from './token';

export default class RuntimeError extends Error {
  constructor(public token: Token, public message: string) {
    super(message);
    this.token = token;
  }
}
