import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-operators',
  title: '3. Operators',
  explanation: `## Operators

Java provides a rich set of operators for performing calculations, comparisons, and logical operations.

### Arithmetic Operators
\`+\`, \`-\`, \`*\`, \`/\`, \`%\` (modulo), \`++\`, \`--\`

### Comparison Operators
\`==\`, \`!=\`, \`<\`, \`>\`, \`<=\`, \`>=\`

### Logical Operators
\`&&\` (short-circuit AND), \`||\` (short-circuit OR), \`!\` (NOT)

### Bitwise Operators
\`&\`, \`|\`, \`^\` (XOR), \`~\` (complement), \`<<\`, \`>>\`, \`>>>\` (unsigned shift)

### Assignment Operators
\`=\`, \`+=\`, \`-=\`, \`*=\`, \`/=\`, \`%=\`, \`&=\`, \`|=\`, \`^=\`, \`<<=\`, \`>>=\`

### Ternary Operator
\`condition ? valueIfTrue : valueIfFalse\`

### instanceof
Tests if an object is an instance of a class:
\`\`\`java
if (obj instanceof String s) {
    System.out.println(s.length());
}
\`\`\`

### Operator Precedence
Postfix > Unary > Multiplicative > Additive > Shift > Relational > Equality > Bitwise > Logical > Ternary > Assignment
`,
  exercises: [
    {
      id: 'java-ops-1',
      title: 'Modulo operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Use the modulo operator to check if a number is even.',
      skeleton: `boolean isEven = (number __BLANK__ 2) == 0;`,
      solution: `boolean isEven = (number % 2) == 0;`,
      hints: [
        'Modulo gives the remainder of division.',
        'An even number divided by 2 has remainder 0.',
        'The operator is `%`.',
      ],
      concepts: ['modulo', 'remainder', 'even/odd check'],
    },
    {
      id: 'java-ops-2',
      title: 'Ternary operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Use the ternary operator to assign "positive" or "negative".',
      skeleton: `int x = -5;
String sign = x >= 0 __BLANK__ "positive" __BLANK__ "negative";`,
      solution: `int x = -5;
String sign = x >= 0 ? "positive" : "negative";`,
      hints: [
        'The ternary operator has the form: condition ? value1 : value2.',
        'The first blank is the ternary question mark.',
        'The second blank is the colon separator.',
      ],
      concepts: ['ternary operator', 'conditional expression'],
    },
    {
      id: 'java-ops-3',
      title: 'Bitwise AND',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Use bitwise AND to check if the lowest bit is set (odd number check).',
      skeleton: `boolean isOdd = (n __BLANK__ 1) == 1;`,
      solution: `boolean isOdd = (n & 1) == 1;`,
      hints: [
        'Bitwise AND compares each bit of two numbers.',
        'The lowest bit of an odd number is always 1.',
        'The operator is `&`.',
      ],
      concepts: ['bitwise AND', 'bit manipulation', 'odd check'],
    },
    {
      id: 'java-ops-4',
      title: 'Left shift multiply',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Use left shift to multiply a number by 8.',
      skeleton: `int result = n __BLANK__ 3; // multiply by 8`,
      solution: `int result = n << 3; // multiply by 8`,
      hints: [
        'Left shifting by 1 multiplies by 2.',
        'Shifting by 3 positions multiplies by 2^3 = 8.',
        'The operator is `<<`.',
      ],
      concepts: ['left shift', 'bit manipulation', 'power of 2'],
    },
    {
      id: 'java-ops-5',
      title: 'instanceof check',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Use instanceof to check if an object is a String.',
      skeleton: `Object obj = "hello";
if (obj __BLANK__ String s) {
    System.out.println(s.toUpperCase());
}`,
      solution: `Object obj = "hello";
if (obj instanceof String s) {
    System.out.println(s.toUpperCase());
}`,
      hints: [
        'Java has a keyword to test type at runtime.',
        'Pattern matching instanceof also binds the cast variable.',
        'The keyword is `instanceof`.',
      ],
      concepts: ['instanceof', 'pattern matching', 'type checking'],
    },
    {
      id: 'java-ops-6',
      title: 'Compound assignment',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Use a compound assignment operator to add 10 to x.',
      skeleton: `int x = 5;
x __BLANK__ 10;
System.out.println(x); // 15`,
      solution: `int x = 5;
x += 10;
System.out.println(x); // 15`,
      hints: [
        'Compound assignment combines an operation with assignment.',
        'x = x + 10 can be shortened.',
        'The operator is `+=`.',
      ],
      concepts: ['compound assignment', 'addition', 'shorthand'],
    },
    {
      id: 'java-ops-7',
      title: 'Absolute value without Math.abs',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method abs(int n) that returns the absolute value using the ternary operator.',
      skeleton: '',
      solution: `public static int abs(int n) {
    return n >= 0 ? n : -n;
}`,
      hints: [
        'If the number is non-negative, return it as-is.',
        'If negative, negate it.',
        'Use the ternary operator for a concise expression.',
      ],
      concepts: ['ternary operator', 'absolute value', 'negation'],
    },
    {
      id: 'java-ops-8',
      title: 'Power of two check',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method isPowerOfTwo(int n) that uses bitwise AND to check if n is a power of 2.',
      skeleton: '',
      solution: `public static boolean isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}`,
      hints: [
        'A power of 2 has exactly one bit set in binary.',
        'n & (n-1) clears the lowest set bit.',
        'If the result is 0 and n > 0, it is a power of 2.',
      ],
      concepts: ['bitwise AND', 'power of two', 'bit manipulation'],
    },
    {
      id: 'java-ops-9',
      title: 'Clamp a value',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method clamp(int value, int min, int max) that constrains value within [min, max].',
      skeleton: '',
      solution: `public static int clamp(int value, int min, int max) {
    return Math.max(min, Math.min(value, max));
}`,
      hints: [
        'If value < min, return min. If value > max, return max.',
        'Math.min and Math.max can be nested for this.',
        'Or use two ternary operators.',
      ],
      concepts: ['Math.min', 'Math.max', 'value clamping'],
    },
    {
      id: 'java-ops-10',
      title: 'XOR swap',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method xorSwap(int[] arr) that swaps arr[0] and arr[1] using only XOR operations.',
      skeleton: '',
      solution: `public static void xorSwap(int[] arr) {
    arr[0] = arr[0] ^ arr[1];
    arr[1] = arr[0] ^ arr[1];
    arr[0] = arr[0] ^ arr[1];
}`,
      hints: [
        'XOR can be used to swap without a temporary variable.',
        'a ^= b; b ^= a; a ^= b; swaps a and b.',
        'Apply this pattern to arr[0] and arr[1].',
      ],
      concepts: ['XOR', 'bit manipulation', 'swap algorithm'],
    },
    {
      id: 'java-ops-11',
      title: 'Bitwise flag operations',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write methods setFlag(int flags, int flag), clearFlag(int flags, int flag), and hasFlag(int flags, int flag) using bitwise operators.',
      skeleton: '',
      solution: `public static int setFlag(int flags, int flag) {
    return flags | flag;
}

public static int clearFlag(int flags, int flag) {
    return flags & ~flag;
}

public static boolean hasFlag(int flags, int flag) {
    return (flags & flag) == flag;
}`,
      hints: [
        'OR (|) sets a bit, AND with complement (~) clears it.',
        'AND (&) checks if a bit is set.',
        'Compare the AND result with the flag itself.',
      ],
      concepts: ['bitwise OR', 'bitwise AND', 'bitwise NOT', 'flags'],
    },
    {
      id: 'java-ops-12',
      title: 'Safe division',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method safeDivide(int a, int b) that returns a/b or 0 if b is zero.',
      skeleton: '',
      solution: `public static int safeDivide(int a, int b) {
    return b != 0 ? a / b : 0;
}`,
      hints: [
        'Check if the divisor is zero before dividing.',
        'Use a ternary to return 0 as a default.',
        'Division by zero throws ArithmeticException in Java.',
      ],
      concepts: ['ternary operator', 'division by zero', 'defensive programming'],
    },
    {
      id: 'java-ops-13',
      title: 'Short-circuit side effect',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the NullPointerException by leveraging short-circuit evaluation.',
      skeleton: `public static int getLength(String s) {
    if (s.length() > 0 && s != null) {
        return s.length();
    }
    return 0;
}`,
      solution: `public static int getLength(String s) {
    if (s != null && s.length() > 0) {
        return s.length();
    }
    return 0;
}`,
      hints: [
        'The null check must come BEFORE accessing .length().',
        '&& short-circuits: if left is false, right is not evaluated.',
        'Swap the conditions so null check is first.',
      ],
      concepts: ['short-circuit evaluation', 'null check', 'operator order'],
    },
    {
      id: 'java-ops-14',
      title: 'Precedence bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the operator precedence issue that gives the wrong result.',
      skeleton: `public static boolean isInRange(int x) {
    return 0 < x & x < 100;  // intended: both conditions must be true
}`,
      solution: `public static boolean isInRange(int x) {
    return 0 < x && x < 100;
}`,
      hints: [
        '& is bitwise AND which does not short-circuit.',
        '&& is logical AND with short-circuit evaluation.',
        'Use && for boolean logic.',
      ],
      concepts: ['bitwise vs logical AND', 'operator precedence', 'short-circuit'],
    },
    {
      id: 'java-ops-15',
      title: 'Post-increment in expression',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the code that expects pre-increment behavior but uses post-increment.',
      skeleton: `public static int incrementAndReturn(int x) {
    return x++; // expects to return x+1
}`,
      solution: `public static int incrementAndReturn(int x) {
    return ++x;
}`,
      hints: [
        'x++ returns the value BEFORE incrementing.',
        '++x returns the value AFTER incrementing.',
        'Use pre-increment to return the incremented value.',
      ],
      concepts: ['pre-increment', 'post-increment', 'return value'],
    },
    {
      id: 'java-ops-16',
      title: 'Predict precedence',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the result considering operator precedence.',
      skeleton: `int result = 2 + 3 * 4;
System.out.println(result);`,
      solution: `14`,
      hints: [
        'Multiplication has higher precedence than addition.',
        '3 * 4 = 12, then 2 + 12 = 14.',
        'Not (2 + 3) * 4 = 20.',
      ],
      concepts: ['operator precedence', 'multiplication', 'addition'],
    },
    {
      id: 'java-ops-17',
      title: 'Predict short-circuit',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output considering short-circuit evaluation.',
      skeleton: `int x = 0;
boolean result = (x != 0) && (10 / x > 1);
System.out.println(result);`,
      solution: `false`,
      hints: [
        '&& short-circuits: if left is false, right is not evaluated.',
        'x is 0, so (x != 0) is false.',
        'The division 10/x is never executed, avoiding ArithmeticException.',
      ],
      concepts: ['short-circuit evaluation', 'logical AND', 'division by zero'],
    },
    {
      id: 'java-ops-18',
      title: 'Predict unsigned right shift',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Predict the output of unsigned right shift on a negative number.',
      skeleton: `int x = -1;
int result = x >>> 28;
System.out.println(result);`,
      solution: `15`,
      hints: [
        '-1 in binary is all 1s (32 bits).',
        '>>> shifts right and fills with zeros.',
        'Shifting 32 ones right by 28 leaves 4 ones = 15.',
      ],
      concepts: ['unsigned right shift', 'binary representation', 'negative numbers'],
    },
    {
      id: 'java-ops-19',
      title: 'Refactor nested ternaries',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor nested ternary operators into a cleaner if-else structure.',
      skeleton: `public static String classify(int score) {
    return score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : score >= 60 ? "D" : "F";
}`,
      solution: `public static String classify(int score) {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
}`,
      hints: [
        'Nested ternaries are hard to read.',
        'Sequential if-returns are cleaner for multiple conditions.',
        'Each condition can return directly.',
      ],
      concepts: ['ternary operator', 'if-else', 'code readability'],
    },
    {
      id: 'java-ops-20',
      title: 'Refactor verbose boolean logic',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Simplify the verbose boolean comparison.',
      skeleton: `public static boolean isAdult(int age) {
    if (age >= 18 == true) {
        return true;
    } else {
        return false;
    }
}`,
      solution: `public static boolean isAdult(int age) {
    return age >= 18;
}`,
      hints: [
        'Comparing a boolean to true is redundant.',
        'Returning true in if and false in else can be simplified.',
        'Just return the boolean expression directly.',
      ],
      concepts: ['boolean simplification', 'redundant comparison', 'refactoring'],
    },
  ],
};
