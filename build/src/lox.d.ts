declare class Interpreter {
    private args;
    private hadError;
    constructor(args: string[]);
    init(): void;
    private runFile;
    private runPrompt;
    private run;
    error(line: number, msg: string): void;
    private report;
}
declare const Lox: Interpreter;
export { Lox };
