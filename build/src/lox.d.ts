import Token from './token';
import RuntimeError from './error';
import { Interpreter } from './interpreter';
declare class Lox {
    private args;
    static hadError: boolean;
    static hadRuntimeError: boolean;
    static interpreter: Interpreter;
    constructor(args: string[]);
    init(): void;
    private runFile;
    private runPrompt;
    private run;
    error(...args: [observable: number, msg: string] | [observable: Token, msg: string]): void;
    runtimeError(error: RuntimeError): void;
    private report;
}
declare const TLOX: Lox;
export default TLOX;
