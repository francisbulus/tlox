export default class GenerateAst {
    private outputDir;
    private path;
    constructor(outputDir: string);
    generate(): void;
    private writer;
    private defineAst;
    private defineType;
}
