import Token from './token';
export default class Scanner {
    private source;
    private tokens;
    private start;
    private current;
    private line;
    constructor(source: string);
    scanTokens(): Token[];
    private scanToken;
    private identifier;
    private number;
    private string;
    private isAtEnd;
    private match;
    private peek;
    private peekNext;
    private isAlpha;
    private isAlphaNumeric;
    private isDigit;
    private advance;
    private addToken;
}
