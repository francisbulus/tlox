## WIP

Working on this at the moment so may not be entirely clear.

# Design Notes

## Chapter 4 - Scanning

- If you’re designing a new language, you almost surely should avoid an explicit statement terminator. Programmers are creatures of fashion like other humans, and semicolons are as passé as ALL CAPS KEYWORDS. Just make sure you pick a set of rules that make sense for your language’s particular grammar and idioms. And don’t do what JavaScript did.

## Chapter 5 - Parsing Expressions

- Parsers are basically about mapping tokens to terminals in a grammar
- 6/3-1 is a valid string at this stage but it could be evaluated in different ways - this could lead to problems down the line with inconsistencies across AST outputs so associativity and precedence are the ways in which we've been able to enforce rules over the years

  - **Precedence** determines which operator is evaluated first in an expression containing a mixture of different operators. Precedence rules tell us that we evaluate the / before the - in the above example

  - **Associativity** determines which operator is evaluated first in a series of the same operator

    - Note that some operators are non-associative. That means it’s an error to use that operator more than once in a sequence. For example, Perl’s range operator isn’t associative, so a .. b is OK, but a .. b .. c is an error

    - **Left-associative** means operators on the left evaluate before those on the right e.g. `5 - 3 - 1` is equivalent to `(5-3)-1`

    - Assignment, on the other hand, is **right-associative**. `a = b = c` is equivalent to: `a = (b = c)`

    <br />

- C precedence rules, going from lowest to highest:

  | Name       | 0perators | Associates |
  | ---------- | --------- | ---------- |
  | Equality   | == ! =    | Left       |
  | Comparison | > >= < <= | Left       |
  | Term       | - +       | Left       |
  | Factor     | / \*      | Left       |
  | Unary      | ! -       | Right      |

  - Each rule here only matches expressions at its precedence level or higher

  - A production rule like `factor → factor ( "/" | "*" ) unary` is left-recursive because the first symbol in the rule is the same as the head

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
