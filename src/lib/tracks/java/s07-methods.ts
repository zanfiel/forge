import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-methods',
  title: '7. Methods',
  explanation: `## Methods

Methods are blocks of code that perform a specific task and can be called by name.

### Method Declaration
\`\`\`java
accessModifier returnType methodName(parameterList) {
    // body
    return value;
}
\`\`\`

### Return Types
- \`void\`: no return value
- Any type: \`int\`, \`String\`, \`boolean\`, objects, etc.

### Method Overloading
Multiple methods with the same name but different parameters:
\`\`\`java
public int add(int a, int b) { return a + b; }
public double add(double a, double b) { return a + b; }
\`\`\`

### Varargs
Variable-length arguments (\`int...\`) must be the last parameter.

### Pass by Value
Java always passes by value:
- Primitives: the value is copied
- Objects: the reference is copied (not the object)

### Static Methods
Belong to the class, not an instance. Called via \`ClassName.method()\`.

### The main Method
\`\`\`java
public static void main(String[] args) { }
\`\`\`
Entry point of a Java application.
`,
  exercises: [
    {
      id: 'java-meth-1',
      title: 'Void method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Declare a method that returns nothing.',
      skeleton: `public static __BLANK__ greet(String name) {
    System.out.println("Hello, " + name);
}`,
      solution: `public static void greet(String name) {
    System.out.println("Hello, " + name);
}`,
      hints: [
        'A method that returns nothing uses a special return type.',
        'It means "no value".',
        'Use `void`.',
      ],
      concepts: ['void', 'return type', 'method declaration'],
    },
    {
      id: 'java-meth-2',
      title: 'Return statement',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Complete the method to return the square of a number.',
      skeleton: `public static int square(int n) {
    __BLANK__ n * n;
}`,
      solution: `public static int square(int n) {
    return n * n;
}`,
      hints: [
        'Methods with a return type must send a value back.',
        'The keyword sends the value back to the caller.',
        'Use `return`.',
      ],
      concepts: ['return', 'method return', 'expression'],
    },
    {
      id: 'java-meth-3',
      title: 'Static method call',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Call a static method from the Math class.',
      skeleton: `double result = __BLANK__.max(10, 20);`,
      solution: `double result = Math.max(10, 20);`,
      hints: [
        'Static methods are called on the class name.',
        'The Math class has many utility methods.',
        'Use `Math`.',
      ],
      concepts: ['static method', 'Math class', 'class method call'],
    },
    {
      id: 'java-meth-4',
      title: 'Main method signature',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Complete the main method signature.',
      skeleton: `public static void main(__BLANK__[] args) {
    System.out.println("Hello!");
}`,
      solution: `public static void main(String[] args) {
    System.out.println("Hello!");
}`,
      hints: [
        'The main method takes an array of command-line arguments.',
        'Arguments are text values.',
        'Use `String`.',
      ],
      concepts: ['main method', 'String array', 'entry point'],
    },
    {
      id: 'java-meth-5',
      title: 'Overloaded method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Complete the overloaded method that accepts doubles.',
      skeleton: `public static int add(int a, int b) { return a + b; }
public static __BLANK__ add(__BLANK__ a, __BLANK__ b) { return a + b; }`,
      solution: `public static int add(int a, int b) { return a + b; }
public static double add(double a, double b) { return a + b; }`,
      hints: [
        'Method overloading uses different parameter types.',
        'The return type should match the parameter types.',
        'Use `double` for all three blanks.',
      ],
      concepts: ['method overloading', 'double', 'polymorphism'],
    },
    {
      id: 'java-meth-6',
      title: 'Varargs method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Complete the varargs method to accept any number of strings.',
      skeleton: `public static String join(String delimiter, String__BLANK__ parts) {
    return String.join(delimiter, parts);
}`,
      solution: `public static String join(String delimiter, String... parts) {
    return String.join(delimiter, parts);
}`,
      hints: [
        'Varargs uses three dots after the type.',
        'It must be the last parameter.',
        'Use `...`.',
      ],
      concepts: ['varargs', 'variable arguments', 'String.join'],
    },
    {
      id: 'java-meth-7',
      title: 'Factorial method',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a recursive method factorial(int n) that returns n!.',
      skeleton: '',
      solution: `public static long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}`,
      hints: [
        'Base case: factorial of 0 or 1 is 1.',
        'Recursive case: n * factorial(n-1).',
        'Use long to avoid overflow for larger values.',
      ],
      concepts: ['recursion', 'factorial', 'base case'],
    },
    {
      id: 'java-meth-8',
      title: 'Fibonacci method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write an iterative method fibonacci(int n) that returns the nth Fibonacci number.',
      skeleton: '',
      solution: `public static long fibonacci(int n) {
    if (n <= 1) return n;
    long a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        long temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}`,
      hints: [
        'Use two variables to track the previous two values.',
        'Iterate from 2 to n, updating both.',
        'Return the last computed value.',
      ],
      concepts: ['iteration', 'Fibonacci', 'loop'],
    },
    {
      id: 'java-meth-9',
      title: 'GCD method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method gcd(int a, int b) that returns the greatest common divisor using Euclid\'s algorithm.',
      skeleton: '',
      solution: `public static int gcd(int a, int b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}`,
      hints: [
        'Euclid\'s algorithm: gcd(a,b) = gcd(b, a%b).',
        'Continue until b becomes 0.',
        'Handle negative numbers with Math.abs.',
      ],
      concepts: ['GCD', 'Euclid algorithm', 'while loop'],
    },
    {
      id: 'java-meth-10',
      title: 'Method with multiple returns',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method classify(double temp) that returns "cold" (<10), "warm" (10-25), or "hot" (>25).',
      skeleton: '',
      solution: `public static String classify(double temp) {
    if (temp < 10) return "cold";
    if (temp <= 25) return "warm";
    return "hot";
}`,
      hints: [
        'Use early returns for each condition.',
        'No need for else when using return.',
        'Three ranges: <10, 10-25, >25.',
      ],
      concepts: ['early return', 'method return', 'conditional logic'],
    },
    {
      id: 'java-meth-11',
      title: 'Array statistics',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method stats(int... nums) that returns a double array [min, max, average] using varargs.',
      skeleton: '',
      solution: `public static double[] stats(int... nums) {
    int min = nums[0], max = nums[0];
    long sum = 0;
    for (int n : nums) {
        if (n < min) min = n;
        if (n > max) max = n;
        sum += n;
    }
    return new double[]{min, max, (double) sum / nums.length};
}`,
      hints: [
        'Track min, max, and sum in a single pass.',
        'Average is sum / length, cast to double for precision.',
        'Return the three values as a double array.',
      ],
      concepts: ['varargs', 'statistics', 'single-pass algorithm'],
    },
    {
      id: 'java-meth-12',
      title: 'Higher-order style with Predicate',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method countMatching(int[] arr, java.util.function.IntPredicate pred) that counts elements matching the predicate.',
      skeleton: '',
      solution: `public static int countMatching(int[] arr, java.util.function.IntPredicate pred) {
    int count = 0;
    for (int n : arr) {
        if (pred.test(n)) count++;
    }
    return count;
}`,
      hints: [
        'IntPredicate has a test(int) method that returns boolean.',
        'Loop through the array and test each element.',
        'Increment the counter for matching elements.',
      ],
      concepts: ['IntPredicate', 'functional interface', 'higher-order'],
    },
    {
      id: 'java-meth-13',
      title: 'Return type mismatch',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the method that does not return a value on all paths.',
      skeleton: `public static String getSign(int n) {
    if (n > 0) {
        return "positive";
    } else if (n < 0) {
        return "negative";
    }
}`,
      solution: `public static String getSign(int n) {
    if (n > 0) {
        return "positive";
    } else if (n < 0) {
        return "negative";
    }
    return "zero";
}`,
      hints: [
        'The compiler requires a return statement on every possible path.',
        'What if n is 0? There is no return for that case.',
        'Add a return statement for the zero case.',
      ],
      concepts: ['return path', 'compiler error', 'exhaustive return'],
    },
    {
      id: 'java-meth-14',
      title: 'Pass by value confusion',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the method that tries to swap two int parameters (which does not work).',
      skeleton: `public static void swap(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}
// Called with: swap(x, y); // x and y unchanged`,
      solution: `public static void swap(int[] arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}`,
      hints: [
        'Java passes primitives by value; changes inside do not affect the caller.',
        'To swap, you need to work with an array or object.',
        'Accept an array and two indices instead.',
      ],
      concepts: ['pass by value', 'swap', 'array mutation'],
    },
    {
      id: 'java-meth-15',
      title: 'Varargs not last parameter',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the method where varargs is not the last parameter.',
      skeleton: `public static String format(String... parts, String delimiter) {
    return String.join(delimiter, parts);
}`,
      solution: `public static String format(String delimiter, String... parts) {
    return String.join(delimiter, parts);
}`,
      hints: [
        'Varargs must be the last parameter in the list.',
        'Move the regular parameter before the varargs.',
        'Swap the parameter order.',
      ],
      concepts: ['varargs', 'parameter order', 'compilation error'],
    },
    {
      id: 'java-meth-16',
      title: 'Predict overload resolution',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict which overloaded method is called.',
      skeleton: `static void print(int x) { System.out.println("int: " + x); }
static void print(long x) { System.out.println("long: " + x); }
static void print(double x) { System.out.println("double: " + x); }

print(42);`,
      solution: `int: 42`,
      hints: [
        'Java picks the most specific matching overload.',
        '42 is an int literal.',
        'The int overload is the most specific match.',
      ],
      concepts: ['method overloading', 'overload resolution', 'type matching'],
    },
    {
      id: 'java-meth-17',
      title: 'Predict pass by value',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output after a method call that tries to modify a primitive.',
      skeleton: `static void increment(int x) { x = x + 1; }

int n = 5;
increment(n);
System.out.println(n);`,
      solution: `5`,
      hints: [
        'Java passes primitives by value.',
        'The method gets a copy of n.',
        'Modifying x inside the method has no effect on n.',
      ],
      concepts: ['pass by value', 'primitives', 'method parameters'],
    },
    {
      id: 'java-meth-18',
      title: 'Predict recursive result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output of this recursive method.',
      skeleton: `static int mystery(int n) {
    if (n <= 0) return 0;
    return n + mystery(n - 2);
}
System.out.println(mystery(5));`,
      solution: `9`,
      hints: [
        'mystery(5) = 5 + mystery(3) = 5 + 3 + mystery(1) = 5 + 3 + 1 + mystery(-1).',
        'mystery(-1) = 0.',
        '5 + 3 + 1 + 0 = 9.',
      ],
      concepts: ['recursion', 'trace', 'base case'],
    },
    {
      id: 'java-meth-19',
      title: 'Refactor to method extraction',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Extract the repeated logic into a helper method.',
      skeleton: `public static void processUsers(String[] names) {
    for (String name : names) {
        String cleaned = name.trim().toLowerCase();
        if (!cleaned.isEmpty() && cleaned.length() >= 2) {
            System.out.println("Valid: " + cleaned);
        }
    }
}

public static void processEmails(String[] emails) {
    for (String email : emails) {
        String cleaned = email.trim().toLowerCase();
        if (!cleaned.isEmpty() && cleaned.length() >= 2) {
            System.out.println("Valid: " + cleaned);
        }
    }
}`,
      solution: `private static boolean isValid(String input) {
    String cleaned = input.trim().toLowerCase();
    return !cleaned.isEmpty() && cleaned.length() >= 2;
}

private static String clean(String input) {
    return input.trim().toLowerCase();
}

public static void processUsers(String[] names) {
    for (String name : names) {
        if (isValid(name)) {
            System.out.println("Valid: " + clean(name));
        }
    }
}

public static void processEmails(String[] emails) {
    for (String email : emails) {
        if (isValid(email)) {
            System.out.println("Valid: " + clean(email));
        }
    }
}`,
      hints: [
        'The trim/toLowerCase/validation logic is duplicated.',
        'Extract it into helper methods.',
        'isValid and clean can be reused by both methods.',
      ],
      concepts: ['method extraction', 'DRY', 'refactoring', 'helper methods'],
    },
    {
      id: 'java-meth-20',
      title: 'Refactor to varargs',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor the overloaded methods to a single varargs method.',
      skeleton: `public static int max(int a, int b) {
    return Math.max(a, b);
}
public static int max(int a, int b, int c) {
    return Math.max(a, Math.max(b, c));
}
public static int max(int a, int b, int c, int d) {
    return Math.max(Math.max(a, b), Math.max(c, d));
}`,
      solution: `public static int max(int... values) {
    int result = values[0];
    for (int i = 1; i < values.length; i++) {
        result = Math.max(result, values[i]);
    }
    return result;
}`,
      hints: [
        'Varargs can replace multiple overloads with different arities.',
        'A single method with int... handles any number of arguments.',
        'Loop through and track the maximum.',
      ],
      concepts: ['varargs', 'method overloading', 'refactoring'],
    },
  ],
};
