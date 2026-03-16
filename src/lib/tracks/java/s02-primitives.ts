import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-primitives',
  title: '2. Primitive Types',
  explanation: `## Primitive Types

Java has 8 primitive types grouped into four categories:

### Integer Types
| Type | Size | Range |
|------|------|-------|
| \`byte\` | 8-bit | -128 to 127 |
| \`short\` | 16-bit | -32,768 to 32,767 |
| \`int\` | 32-bit | -2^31 to 2^31-1 |
| \`long\` | 64-bit | -2^63 to 2^63-1 |

### Floating-Point Types
| Type | Size | Precision |
|------|------|-----------|
| \`float\` | 32-bit | ~7 decimal digits |
| \`double\` | 64-bit | ~15 decimal digits |

### Other Primitives
- \`char\`: 16-bit Unicode character
- \`boolean\`: true or false

### Wrapper Classes
Each primitive has a corresponding wrapper: \`Integer\`, \`Long\`, \`Double\`, \`Boolean\`, etc.

### Autoboxing/Unboxing
Java automatically converts between primitives and wrappers:
\`\`\`java
Integer boxed = 42;      // autoboxing
int unboxed = boxed;     // unboxing
\`\`\`

### Type Casting
- Widening (implicit): \`int\` -> \`long\` -> \`float\` -> \`double\`
- Narrowing (explicit): \`double\` -> \`int\` requires a cast
`,
  exercises: [
    {
      id: 'java-prim-1',
      title: 'Long literal suffix',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Declare a long variable with a value that exceeds int range.',
      skeleton: `long bigNumber = 3000000000__BLANK__;
System.out.println(bigNumber);`,
      solution: `long bigNumber = 3000000000L;
System.out.println(bigNumber);`,
      hints: [
        'Integer literals default to int type.',
        'For values exceeding int range, you need a suffix.',
        'Append `L` to make it a long literal.',
      ],
      concepts: ['long', 'literal suffix', 'integer overflow'],
    },
    {
      id: 'java-prim-2',
      title: 'Float literal suffix',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Declare a float variable properly.',
      skeleton: `float pi = 3.14__BLANK__;
System.out.println(pi);`,
      solution: `float pi = 3.14f;
System.out.println(pi);`,
      hints: [
        'Decimal literals default to double in Java.',
        'To store in a float, you need a suffix.',
        'Append `f` to the literal.',
      ],
      concepts: ['float', 'literal suffix', 'floating point'],
    },
    {
      id: 'java-prim-3',
      title: 'Char declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Declare a char variable holding the letter A.',
      skeleton: `__BLANK__ letter = 'A';
System.out.println(letter);`,
      solution: `char letter = 'A';
System.out.println(letter);`,
      hints: [
        'Java has a 16-bit type for single characters.',
        'Characters use single quotes.',
        'The type is `char`.',
      ],
      concepts: ['char', 'character literals', 'Unicode'],
    },
    {
      id: 'java-prim-4',
      title: 'Explicit cast',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Narrow a double to an int using an explicit cast.',
      skeleton: `double d = 9.99;
int n = __BLANK__ d;
System.out.println(n);`,
      solution: `double d = 9.99;
int n = (int) d;
System.out.println(n);`,
      hints: [
        'Narrowing conversions require an explicit cast in Java.',
        'The cast syntax places the target type in parentheses.',
        'Use `(int)` before the value.',
      ],
      concepts: ['narrowing cast', 'type conversion', 'truncation'],
    },
    {
      id: 'java-prim-5',
      title: 'Wrapper class parse',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Parse a String to an int using the wrapper class.',
      skeleton: `String s = "42";
int value = __BLANK__.parseInt(s);
System.out.println(value);`,
      solution: `String s = "42";
int value = Integer.parseInt(s);
System.out.println(value);`,
      hints: [
        'The Integer wrapper class has parsing methods.',
        'parseInt converts a String to an int.',
        'Use `Integer`.',
      ],
      concepts: ['Integer', 'wrapper classes', 'parsing'],
    },
    {
      id: 'java-prim-6',
      title: 'Byte range check',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Print the maximum value a byte can hold using the wrapper class constant.',
      skeleton: `System.out.println(__BLANK__.MAX_VALUE);`,
      solution: `System.out.println(Byte.MAX_VALUE);`,
      hints: [
        'Each wrapper class has MIN_VALUE and MAX_VALUE constants.',
        'For byte, the wrapper class is Byte.',
        'Use `Byte`.',
      ],
      concepts: ['Byte', 'wrapper classes', 'range constants'],
    },
    {
      id: 'java-prim-7',
      title: 'Check if number fits in byte',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method fitsInByte(int n) that returns true if n is within byte range (-128 to 127).',
      skeleton: '',
      solution: `public static boolean fitsInByte(int n) {
    return n >= Byte.MIN_VALUE && n <= Byte.MAX_VALUE;
}`,
      hints: [
        'Use Byte.MIN_VALUE and Byte.MAX_VALUE for the range.',
        'Return a boolean expression.',
        'Check both lower and upper bounds.',
      ],
      concepts: ['byte range', 'Byte wrapper', 'range validation'],
    },
    {
      id: 'java-prim-8',
      title: 'Safe int to short conversion',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method toShortSafe(int value) that returns the value as short if it fits, or throws IllegalArgumentException.',
      skeleton: '',
      solution: `public static short toShortSafe(int value) {
    if (value < Short.MIN_VALUE || value > Short.MAX_VALUE) {
        throw new IllegalArgumentException("Value out of short range: " + value);
    }
    return (short) value;
}`,
      hints: [
        'Check if the value is within Short.MIN_VALUE and Short.MAX_VALUE.',
        'Throw IllegalArgumentException if out of range.',
        'Cast with (short) if valid.',
      ],
      concepts: ['narrowing cast', 'range check', 'Short wrapper', 'exception'],
    },
    {
      id: 'java-prim-9',
      title: 'Count set bits',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method countBits(int n) that returns the number of 1-bits in the binary representation.',
      skeleton: '',
      solution: `public static int countBits(int n) {
    return Integer.bitCount(n);
}`,
      hints: [
        'The Integer wrapper class has a utility method for this.',
        'Integer.bitCount() counts the number of one-bits.',
        'You can also do it manually with bit shifting.',
      ],
      concepts: ['Integer', 'bitCount', 'binary representation'],
    },
    {
      id: 'java-prim-10',
      title: 'Autobox and compare',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method compareBoxed(int a, int b) that boxes both values and compares using .equals(), returning the boolean result.',
      skeleton: '',
      solution: `public static boolean compareBoxed(int a, int b) {
    Integer boxedA = a;
    Integer boxedB = b;
    return boxedA.equals(boxedB);
}`,
      hints: [
        'Assign int values to Integer variables for autoboxing.',
        'Never use == to compare Integer objects for value equality.',
        'Use .equals() for correct value comparison.',
      ],
      concepts: ['autoboxing', 'Integer', 'equals vs =='],
    },
    {
      id: 'java-prim-11',
      title: 'Convert char to numeric value',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method charToDigit(char c) that converts a digit character (0-9) to its int value, or returns -1 if not a digit.',
      skeleton: '',
      solution: `public static int charToDigit(char c) {
    if (c >= '0' && c <= '9') {
        return c - '0';
    }
    return -1;
}`,
      hints: [
        'Character digits are contiguous in Unicode.',
        'Subtracting the char \'0\' gives the numeric value.',
        'Check bounds first to ensure it is a digit.',
      ],
      concepts: ['char arithmetic', 'Unicode values', 'type promotion'],
    },
    {
      id: 'java-prim-12',
      title: 'Double to float precision',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method hasFloatPrecisionLoss(double d) that returns true if casting d to float and back changes the value.',
      skeleton: '',
      solution: `public static boolean hasFloatPrecisionLoss(double d) {
    float f = (float) d;
    return (double) f != d;
}`,
      hints: [
        'Cast the double to float, then back to double.',
        'Compare the round-tripped value with the original.',
        'If they differ, precision was lost.',
      ],
      concepts: ['float', 'double', 'precision loss', 'narrowing cast'],
    },
    {
      id: 'java-prim-13',
      title: 'Integer overflow bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the integer overflow when multiplying two large ints.',
      skeleton: `public static long multiply(int a, int b) {
    long result = a * b;
    return result;
}`,
      solution: `public static long multiply(int a, int b) {
    long result = (long) a * b;
    return result;
}`,
      hints: [
        'The multiplication a * b is done as int before assignment to long.',
        'This means it can overflow before being widened.',
        'Cast one operand to long before multiplying.',
      ],
      concepts: ['integer overflow', 'widening cast', 'type promotion'],
    },
    {
      id: 'java-prim-14',
      title: 'Autoboxing NPE',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the NullPointerException caused by unboxing a null Integer.',
      skeleton: `public static int safeUnbox(Integer value) {
    int result = value;
    return result;
}`,
      solution: `public static int safeUnbox(Integer value) {
    int result = (value != null) ? value : 0;
    return result;
}`,
      hints: [
        'Unboxing a null Integer causes a NullPointerException.',
        'Check for null before unboxing.',
        'Use a ternary to provide a default value.',
      ],
      concepts: ['autoboxing', 'NullPointerException', 'null safety'],
    },
    {
      id: 'java-prim-15',
      title: 'Wrong comparison operator',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the comparison that uses == on Integer objects beyond the cached range.',
      skeleton: `public static boolean areSame(int a, int b) {
    Integer x = Integer.valueOf(a);
    Integer y = Integer.valueOf(b);
    return x == y;
}`,
      solution: `public static boolean areSame(int a, int b) {
    Integer x = Integer.valueOf(a);
    Integer y = Integer.valueOf(b);
    return x.equals(y);
}`,
      hints: [
        '== compares object references, not values.',
        'Integer caching only covers -128 to 127.',
        'Use .equals() for value comparison.',
      ],
      concepts: ['Integer cache', 'equals vs ==', 'reference comparison'],
    },
    {
      id: 'java-prim-16',
      title: 'Predict widening result',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the output when adding an int and a double.',
      skeleton: `int a = 5;
double b = 2.5;
System.out.println(a + b);`,
      solution: `7.5`,
      hints: [
        'When int and double are combined, int is promoted to double.',
        '5 becomes 5.0, then 5.0 + 2.5 = 7.5.',
        'The result is a double.',
      ],
      concepts: ['type promotion', 'widening conversion', 'arithmetic'],
    },
    {
      id: 'java-prim-17',
      title: 'Predict char arithmetic',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output of character arithmetic.',
      skeleton: `char c = 'A';
System.out.println(c + 1);`,
      solution: `66`,
      hints: [
        'char is promoted to int in arithmetic operations.',
        'The value of \'A\' is 65 in Unicode/ASCII.',
        '65 + 1 = 66, printed as an int.',
      ],
      concepts: ['char promotion', 'Unicode values', 'type promotion'],
    },
    {
      id: 'java-prim-18',
      title: 'Predict integer division',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the output of integer division.',
      skeleton: `int a = 7;
int b = 2;
System.out.println(a / b);`,
      solution: `3`,
      hints: [
        'Both operands are int, so integer division is performed.',
        'Integer division truncates the decimal part.',
        '7 / 2 = 3 (not 3.5).',
      ],
      concepts: ['integer division', 'truncation', 'arithmetic'],
    },
    {
      id: 'java-prim-19',
      title: 'Refactor primitive to wrapper',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor the code to use wrapper types and null-safe operations for optional numeric values.',
      skeleton: `public static int findMax(int a, int b, boolean hasB) {
    if (hasB) {
        return Math.max(a, b);
    }
    return a;
}`,
      solution: `public static int findMax(int a, Integer b) {
    if (b != null) {
        return Math.max(a, b);
    }
    return a;
}`,
      hints: [
        'Use Integer (nullable) instead of a separate boolean flag.',
        'null naturally represents the absence of a value.',
        'Check for null instead of a boolean parameter.',
      ],
      concepts: ['wrapper classes', 'null semantics', 'refactoring'],
    },
    {
      id: 'java-prim-20',
      title: 'Refactor to use constants',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor the code to use wrapper class constants instead of hard-coded values.',
      skeleton: `public static boolean isValidByte(int value) {
    return value >= -128 && value <= 127;
}

public static boolean isPositiveShort(int value) {
    return value > 0 && value <= 32767;
}`,
      solution: `public static boolean isValidByte(int value) {
    return value >= Byte.MIN_VALUE && value <= Byte.MAX_VALUE;
}

public static boolean isPositiveShort(int value) {
    return value > 0 && value <= Short.MAX_VALUE;
}`,
      hints: [
        'Replace magic numbers with wrapper class constants.',
        'Byte.MIN_VALUE = -128, Byte.MAX_VALUE = 127.',
        'Short.MAX_VALUE = 32767.',
      ],
      concepts: ['wrapper constants', 'magic numbers', 'Byte', 'Short'],
    },
  ],
};
