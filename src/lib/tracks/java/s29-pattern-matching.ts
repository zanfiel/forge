import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-pattern-matching',
  title: '29. Pattern Matching',
  explanation: `## Pattern Matching

Java's pattern matching features reduce boilerplate and improve type safety.

### instanceof Pattern (Java 16)
\`\`\`java
if (obj instanceof String s) {
    System.out.println(s.length()); // s is already typed
}
\`\`\`

### Switch Pattern Matching (Java 21)
\`\`\`java
String format(Object obj) {
    return switch (obj) {
        case Integer i -> "int: " + i;
        case String s -> "str: " + s;
        case null -> "null";
        default -> "other";
    };
}
\`\`\`

### Guarded Patterns
\`\`\`java
switch (shape) {
    case Circle c when c.radius() > 10 -> "large circle";
    case Circle c -> "small circle";
    case Rect r -> "rectangle";
}
\`\`\`

### Record Patterns (Java 21)
\`\`\`java
if (obj instanceof Point(int x, int y)) {
    System.out.println(x + ", " + y);
}
\`\`\`

### Nested Patterns
\`\`\`java
switch (pair) {
    case Pair(Point(var x1, var y1), Point(var x2, var y2)) ->
        Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
}
\`\`\`
`,
  exercises: [
    {
      id: 'java-pat-1',
      title: 'instanceof pattern',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Use instanceof pattern matching to check and bind.',
      skeleton: `if (obj __BLANK__ String s) {
    System.out.println(s.length());
}`,
      solution: `if (obj instanceof String s) {
    System.out.println(s.length());
}`,
      hints: ['Pattern matching combines type check and cast.', 'The variable is available in the true branch.', 'Use `instanceof`.'],
      concepts: ['instanceof pattern', 'type binding', 'pattern variable'],
    },
    {
      id: 'java-pat-2',
      title: 'Switch pattern matching',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Match on type patterns in a switch expression.',
      skeleton: `String describe(Object obj) {
    return switch (obj) {
        __BLANK__ Integer i -> "Integer: " + i;
        case String s -> "String: " + s;
        default -> "Other";
    };
}`,
      solution: `String describe(Object obj) {
    return switch (obj) {
        case Integer i -> "Integer: " + i;
        case String s -> "String: " + s;
        default -> "Other";
    };
}`,
      hints: ['Each branch uses a pattern label.', 'The keyword is the same as regular switch.', 'Use `case`.'],
      concepts: ['switch pattern', 'type pattern', 'switch expression'],
    },
    {
      id: 'java-pat-3',
      title: 'Guarded pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Add a guard condition to a pattern case.',
      skeleton: `return switch (shape) {
    case Circle c __BLANK__ c.radius() > 100 -> "huge circle";
    case Circle c -> "circle";
    default -> "other";
};`,
      solution: `return switch (shape) {
    case Circle c when c.radius() > 100 -> "huge circle";
    case Circle c -> "circle";
    default -> "other";
};`,
      hints: ['Guarded patterns use a keyword after the pattern.', 'It adds a boolean condition.', 'Use `when`.'],
      concepts: ['guarded pattern', 'when clause', 'conditional matching'],
    },
    {
      id: 'java-pat-4',
      title: 'Record pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Destructure a record in an instanceof check.',
      skeleton: `if (obj instanceof Point__BLANK__) {
    System.out.println(x + ", " + y);
}`,
      solution: `if (obj instanceof Point(int x, int y)) {
    System.out.println(x + ", " + y);
}`,
      hints: ['Record patterns destructure components.', 'List the component types and names in parentheses.', 'Use `(int x, int y)`.'],
      concepts: ['record pattern', 'destructuring', 'pattern matching'],
    },
    {
      id: 'java-pat-5',
      title: 'Null case in switch',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Handle null in a pattern matching switch.',
      skeleton: `return switch (obj) {
    case String s -> s.length();
    case __BLANK__ -> -1;
    default -> 0;
};`,
      solution: `return switch (obj) {
    case String s -> s.length();
    case null -> -1;
    default -> 0;
};`,
      hints: ['Java 21 allows matching null in switch.', 'It is a literal pattern.', 'Use `null`.'],
      concepts: ['null pattern', 'switch', 'null handling'],
    },
    {
      id: 'java-pat-6',
      title: 'Nested record pattern',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Use a nested record pattern to destructure a Line(Point, Point).',
      skeleton: `// record Point(int x, int y) {}
// record Line(Point start, Point end) {}
if (shape instanceof Line(Point(var x1, __BLANK__), Point(var x2, var y2))) {
    System.out.println("dy = " + (y2 - y1));
}`,
      solution: `if (shape instanceof Line(Point(var x1, var y1), Point(var x2, var y2))) {
    System.out.println("dy = " + (y2 - y1));
}`,
      hints: ['Nested patterns destructure inner records.', 'Use var for type inference.', 'Use `var y1`.'],
      concepts: ['nested pattern', 'destructuring', 'var'],
    },
    {
      id: 'java-pat-7',
      title: 'Shape area with patterns',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that calculates area using pattern matching switch on sealed Shape types (Circle, Rect records).',
      skeleton: '',
      solution: `static double area(Shape shape) {
    return switch (shape) {
        case Circle(double r) -> Math.PI * r * r;
        case Rect(double w, double h) -> w * h;
    };
}`,
      hints: ['Use record patterns to destructure components.', 'Sealed types make the switch exhaustive.', 'No default needed.'],
      concepts: ['record pattern', 'exhaustive switch', 'sealed types'],
    },
    {
      id: 'java-pat-8',
      title: 'Type-safe formatter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that formats various types (Integer, Double, String, List, null) using pattern matching switch.',
      skeleton: '',
      solution: `static String format(Object obj) {
    return switch (obj) {
        case null -> "null";
        case Integer i -> String.format("%,d", i);
        case Double d -> String.format("%.2f", d);
        case String s -> "\\"" + s + "\\"";
        case List<?> list -> "[" + list.size() + " items]";
        default -> obj.toString();
    };
}`,
      hints: ['Order matters: more specific types first.', 'null must be before default.', 'Use String.format for number formatting.'],
      concepts: ['type pattern', 'switch ordering', 'formatting'],
    },
    {
      id: 'java-pat-9',
      title: 'Expression evaluator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write an evaluator for a sealed Expr hierarchy (Num, Add, Mul) using nested record patterns.',
      skeleton: '',
      solution: `sealed interface Expr permits Num, Add, Mul {}
record Num(int value) implements Expr {}
record Add(Expr left, Expr right) implements Expr {}
record Mul(Expr left, Expr right) implements Expr {}

static int eval(Expr expr) {
    return switch (expr) {
        case Num(int v) -> v;
        case Add(var l, var r) -> eval(l) + eval(r);
        case Mul(var l, var r) -> eval(l) * eval(r);
    };
}`,
      hints: ['Use record patterns to destructure.', 'Recursively evaluate sub-expressions.', 'var infers the type.'],
      concepts: ['recursive evaluation', 'record patterns', 'expression tree'],
    },
    {
      id: 'java-pat-10',
      title: 'Guarded pattern matching',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that classifies numbers using guarded patterns: negative, zero, small (1-10), large (>10).',
      skeleton: '',
      solution: `static String classify(Object obj) {
    return switch (obj) {
        case Integer i when i < 0 -> "negative";
        case Integer i when i == 0 -> "zero";
        case Integer i when i <= 10 -> "small";
        case Integer i -> "large";
        default -> "not a number";
    };
}`,
      hints: ['Use when clauses for guard conditions.', 'Order guards from most specific to least.', 'The unguarded Integer case catches remaining.'],
      concepts: ['guarded patterns', 'when clause', 'classification'],
    },
    {
      id: 'java-pat-11',
      title: 'Optional pattern matching',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that processes Optional values using instanceof pattern matching.',
      skeleton: '',
      solution: `static String describeOptional(Optional<String> opt) {
    if (opt.isPresent() && opt.get() instanceof String s && !s.isBlank()) {
        return "Value: " + s.trim();
    }
    return "Empty or blank";
}`,
      hints: ['Combine isPresent check with instanceof.', 'Use && for pattern conditions.', 'The pattern variable is available in the rest of the expression.'],
      concepts: ['pattern matching', 'Optional', 'boolean patterns'],
    },
    {
      id: 'java-pat-12',
      title: 'Unwrap nested structure',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method that extracts a deeply nested value using nested record patterns.',
      skeleton: '',
      solution: `record Address(String city, String zip) {}
record Person(String name, Address address) {}
record Company(String name, Person ceo) {}

static String getCeoCity(Object obj) {
    if (obj instanceof Company(var name, Person(var ceoName, Address(var city, var zip)))) {
        return city;
    }
    return "Unknown";
}`,
      hints: ['Nested record patterns can destructure multiple levels.', 'Use var for type inference at each level.', 'The pattern fails gracefully if the type does not match.'],
      concepts: ['nested record pattern', 'deep destructuring', 'var'],
    },
    {
      id: 'java-pat-13',
      title: 'Pattern dominance error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the switch with pattern dominance error.',
      skeleton: `return switch (obj) {
    case Object o -> "object";     // dominates all patterns below
    case String s -> "string";     // unreachable
    case Integer i -> "integer";   // unreachable
};`,
      solution: `return switch (obj) {
    case String s -> "string";
    case Integer i -> "integer";
    default -> "object";
};`,
      hints: ['More specific patterns must come before general ones.', 'Object matches everything, making others unreachable.', 'Put specific types first, use default for catch-all.'],
      concepts: ['pattern dominance', 'switch ordering', 'unreachable code'],
    },
    {
      id: 'java-pat-14',
      title: 'Missing null case NPE',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the pattern matching switch that throws NPE on null input.',
      skeleton: `String describe(Object obj) {
    return switch (obj) {
        case String s -> "string";
        case Integer i -> "integer";
        default -> "other";
    };
}
// describe(null) throws NullPointerException`,
      solution: `String describe(Object obj) {
    return switch (obj) {
        case null -> "null value";
        case String s -> "string";
        case Integer i -> "integer";
        default -> "other";
    };
}`,
      hints: ['Pattern matching switch throws NPE on null by default.', 'Add an explicit null case.', 'Put null case before other patterns.'],
      concepts: ['null case', 'NullPointerException', 'pattern matching'],
    },
    {
      id: 'java-pat-15',
      title: 'Guard condition on wrong case',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the guard that uses if instead of when.',
      skeleton: `return switch (n) {
    case Integer i if i > 0 -> "positive"; // Wrong syntax
    case Integer i -> "non-positive";
};`,
      solution: `return switch (n) {
    case Integer i when i > 0 -> "positive";
    case Integer i -> "non-positive";
};`,
      hints: ['Guards in pattern matching use when, not if.', 'when follows the pattern variable.', 'Replace if with when.'],
      concepts: ['when clause', 'guard syntax', 'pattern matching'],
    },
    {
      id: 'java-pat-16',
      title: 'Predict instanceof pattern scope',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict whether the pattern variable is in scope.',
      skeleton: `Object obj = "hello";
if (obj instanceof String s && s.length() > 3) {
    System.out.println(s.toUpperCase());
}`,
      solution: `HELLO`,
      hints: ['Pattern variable s is in scope for the rest of the condition.', 'The && ensures s is bound before length check.', 'Both conditions are true, so it prints HELLO.'],
      concepts: ['pattern scope', 'flow scoping', '&& with patterns'],
    },
    {
      id: 'java-pat-17',
      title: 'Predict switch pattern order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict which case matches for different inputs.',
      skeleton: `static String test(Object obj) {
    return switch (obj) {
        case String s when s.length() > 5 -> "long string";
        case String s -> "short string";
        case Integer i when i > 100 -> "big number";
        case Integer i -> "small number";
        default -> "other";
    };
}
System.out.println(test("hi"));
System.out.println(test("wonderful"));
System.out.println(test(42));`,
      solution: `short string
long string
small number`,
      hints: ['"hi" has length 2, so second String case.', '"wonderful" has length 9, so first String case.', '42 is not > 100, so second Integer case.'],
      concepts: ['pattern matching', 'guard evaluation', 'case ordering'],
    },
    {
      id: 'java-pat-18',
      title: 'Predict record pattern destructuring',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output of record pattern destructuring.',
      skeleton: `record Pair(Object a, Object b) {}
Object obj = new Pair("hello", 42);
if (obj instanceof Pair(String s, Integer i)) {
    System.out.println(s + " " + i);
} else {
    System.out.println("no match");
}`,
      solution: `hello 42`,
      hints: ['Record pattern matches if components match the types.', '"hello" is a String and 42 is an Integer.', 'Both components match, so destructuring succeeds.'],
      concepts: ['record pattern', 'component matching', 'type checking'],
    },
    {
      id: 'java-pat-19',
      title: 'Refactor instanceof chain to switch',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this instanceof chain to a pattern matching switch.',
      skeleton: `String format(Object value) {
    if (value instanceof Integer i) {
        return "int: " + i;
    } else if (value instanceof Double d) {
        return "double: " + String.format("%.2f", d);
    } else if (value instanceof String s) {
        return "string: \\"" + s + "\\"";
    } else if (value == null) {
        return "null";
    } else {
        return value.toString();
    }
}`,
      solution: `String format(Object value) {
    return switch (value) {
        case null -> "null";
        case Integer i -> "int: " + i;
        case Double d -> "double: " + String.format("%.2f", d);
        case String s -> "string: \\"" + s + "\\"";
        default -> value.toString();
    };
}`,
      hints: ['Pattern matching switch replaces instanceof chains.', 'Put null case first.', 'Use arrow syntax for conciseness.'],
      concepts: ['pattern matching switch', 'instanceof chain', 'refactoring'],
    },
    {
      id: 'java-pat-20',
      title: 'Refactor to record patterns',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor this manual destructuring to use record patterns.',
      skeleton: `// record Point(int x, int y) {}
double distance(Object obj) {
    if (obj instanceof Point) {
        Point p = (Point) obj;
        int x = p.x();
        int y = p.y();
        return Math.sqrt(x * x + y * y);
    }
    return 0;
}`,
      solution: `double distance(Object obj) {
    if (obj instanceof Point(int x, int y)) {
        return Math.sqrt(x * x + y * y);
    }
    return 0;
}`,
      hints: ['Record patterns destructure in one step.', 'No need for explicit cast or accessor calls.', 'Components are directly available as variables.'],
      concepts: ['record pattern', 'destructuring', 'refactoring'],
    },
  ],
};
