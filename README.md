## WIP

Working on this at the moment so may not be entirely clear.

# Design Notes

## Chapter 4 - Scanning

- If you’re designing a new language, you almost surely should avoid an explicit statement terminator. Programmers are creatures of fashion like other humans, and semicolons are as passé as ALL CAPS KEYWORDS. Just make sure you pick a set of rules that make sense for your language’s particular grammar and idioms. And don’t do what JavaScript did.

## Chapter 5 - Parsing Expressions

- Parsers are basically about mapping tokens to terminals in a grammar
- Without well-defined precedence and associativity, an expression that uses multiple operators is ambiguous—it can be parsed into different syntax trees

- Some parsing techniques:

  - [LL(k)](https://en.wikipedia.org/wiki/LL_parser)
  - [LR(1)](https://en.wikipedia.org/wiki/LR_parser)
  - [LALR](https://en.wikipedia.org/wiki/LALR_parser)
  - [Earley Parser](https://en.wikipedia.org/wiki/Earley_parser)
  - [Packrat Parsing](https://en.wikipedia.org/wiki/Parsing_expression_grammar)
  - **Recursive Descent Parsing**
    - Recursive descent is considered a top-down parser
    - GCC, V8 (the JavaScript VM in Chrome), Roslyn (the C# compiler written in C#) and many other heavyweight production language implementations use recursive descent.
