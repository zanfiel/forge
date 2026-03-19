import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-variables',
  title: '1. Variables & Declarations',
  explanation: `## Variables & Declarations

Java is a statically-typed language where every variable must have a declared type.

### Variable Declaration
\`\`\`java
int age = 25;
String name = "Zan";
\`\`\`

### var (Local Variable Type Inference - Java 10+)
The \`var\` keyword lets the compiler infer the type from the initializer:
\`\`\`java
var count = 10;       // inferred as int
var list = new ArrayList<String>(); // inferred as ArrayList<String>
\`\`\`
- Only works for local variables with initializers
- Cannot be used for fields, parameters, or return types

### final
The \`final\` keyword prevents reassignment:
\`\`\`java
final int MAX = 100;
MAX = 200; // Compile error
\`\`\`

### Naming Conventions
- camelCase for variables and methods
- PascalCase for classes
- UPPER_SNAKE_CASE for constants
- Must start with letter, \`_\`, or \`$\`

### Scope
- Local variables: within the block \`{}\`
- Instance variables: within the object
- Class variables (\`static\`): shared across all instances

### Default Values
- Instance/class fields get defaults (0, false, null)
- Local variables have NO default and MUST be initialized before use
`,
  exercises: [
    {
      id: 'java-var-1',
      title: 'Declare an integer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Declare an integer variable with value 42.',
      skeleton: `__BLANK__ answer = 42;
System.out.println(answer);`,
      solution: `int answer = 42;
System.out.println(answer);`,
      hints: [
        'You need the primitive type for whole numbers.',
        'Java uses int for 32-bit integers.',
        'The keyword is `int`.',
      ],
      concepts: ['int', 'variable declaration', 'primitive types'],
    },
    {
      id: 'java-var-2',
      title: 'Declare with var',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Use type inference to declare a String variable.',
      skeleton: `__BLANK__ greeting = "Hello, Java!";
System.out.println(greeting);`,
      solution: `var greeting = "Hello, Java!";
System.out.println(greeting);`,
      hints: [
        'Java 10+ supports local variable type inference.',
        'The compiler can figure out the type from the right side.',
        'Use the `var` keyword.',
      ],
      concepts: ['var', 'type inference', 'local variables'],
    },
    {
      id: 'java-var-3',
      title: 'Declare a constant',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Declare a constant that cannot be reassigned.',
      skeleton: `__BLANK__ double PI = 3.14159;
System.out.println(PI);`,
      solution: `final double PI = 3.14159;
System.out.println(PI);`,
      hints: [
        'You need a keyword that prevents reassignment.',
        'It is similar to const in other languages.',
        'The keyword is `final`.',
      ],
      concepts: ['final', 'constants', 'immutability'],
    },
    {
      id: 'java-var-4',
      title: 'String variable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Declare a String variable with the value "Java".',
      skeleton: `__BLANK__ lang = "Java";
System.out.println(lang);`,
      solution: `String lang = "Java";
System.out.println(lang);`,
      hints: [
        'Strings in Java use a reference type, not a primitive.',
        'The type starts with a capital letter.',
        'Use `String`.',
      ],
      concepts: ['String', 'reference types', 'variable declaration'],
    },
    {
      id: 'java-var-5',
      title: 'Boolean declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Declare a boolean variable set to true.',
      skeleton: `__BLANK__ isActive = true;
System.out.println(isActive);`,
      solution: `boolean isActive = true;
System.out.println(isActive);`,
      hints: [
        'Java has a primitive type for true/false values.',
        'It is not capitalized like in some other languages.',
        'The keyword is `boolean`.',
      ],
      concepts: ['boolean', 'primitive types', 'variable declaration'],
    },
    {
      id: 'java-var-6',
      title: 'Final with var',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Combine final and var to declare an immutable inferred-type variable.',
      skeleton: `__BLANK__ name = "Immutable";
System.out.println(name);`,
      solution: `final var name = "Immutable";
System.out.println(name);`,
      hints: [
        'You can combine two keywords: one for immutability and one for type inference.',
        'final prevents reassignment, var infers the type.',
        'Use `final var`.',
      ],
      concepts: ['final', 'var', 'type inference', 'immutability'],
    },
    {
      id: 'java-var-7',
      title: 'Swap two variables',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method that takes an int array of size 2 and swaps the elements in place.',
      skeleton: '',
      solution: `public static void swap(int[] arr) {
    int temp = arr[0];
    arr[0] = arr[1];
    arr[1] = temp;
}`,
      hints: [
        'You need a temporary variable to hold one value during the swap.',
        'Store arr[0] in temp, then assign arr[1] to arr[0].',
        'Finally assign temp to arr[1].',
      ],
      concepts: ['temporary variables', 'swap', 'array mutation'],
    },
    {
      id: 'java-var-8',
      title: 'Multiple declarations',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method that declares three int variables (x=1, y=2, z=3) and returns their sum.',
      skeleton: '',
      solution: `public static int sumThree() {
    int x = 1;
    int y = 2;
    int z = 3;
    return x + y + z;
}`,
      hints: [
        'Declare each variable with its own int keyword and value.',
        'Add all three together.',
        'Return the result with the return keyword.',
      ],
      concepts: ['variable declaration', 'int', 'return statement'],
    },
    {
      id: 'java-var-9',
      title: 'Variable shadowing',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that demonstrates variable shadowing: declare int x = 10, then inside an if-block declare int x = 20, return the outer x.',
      skeleton: '',
      solution: `public static int shadowDemo() {
    int x = 10;
    if (true) {
        int x2 = 20; // Note: Java doesn't allow shadowing local vars in nested blocks
    }
    return x;
}`,
      hints: [
        'Java does not allow a local variable to shadow another local variable in a nested block.',
        'You can demonstrate the concept with a different variable name inside the block.',
        'The outer x remains 10.',
      ],
      concepts: ['variable shadowing', 'block scope', 'local variables'],
    },
    {
      id: 'java-var-10',
      title: 'Naming conventions checker',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method isValidJavaIdentifier(String name) that returns true if the string starts with a letter, underscore, or dollar sign.',
      skeleton: '',
      solution: `public static boolean isValidJavaIdentifier(String name) {
    if (name == null || name.isEmpty()) {
        return false;
    }
    char first = name.charAt(0);
    return Character.isLetter(first) || first == '_' || first == '$';
}`,
      hints: [
        'Check the first character of the string.',
        'Use Character.isLetter() to test if it is a letter.',
        'Also allow underscore and dollar sign.',
      ],
      concepts: ['naming conventions', 'Character class', 'string inspection'],
    },
    {
      id: 'java-var-11',
      title: 'Type inference with collections',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that uses var to create an ArrayList of Strings, adds "Hello" and "World", and returns the list.',
      skeleton: '',
      solution: `public static java.util.ArrayList<String> createList() {
    var list = new java.util.ArrayList<String>();
    list.add("Hello");
    list.add("World");
    return list;
}`,
      hints: [
        'Use var to let the compiler infer the ArrayList type.',
        'Call list.add() to insert elements.',
        'Return type must still be explicit in the method signature.',
      ],
      concepts: ['var', 'type inference', 'ArrayList', 'generics'],
    },
    {
      id: 'java-var-12',
      title: 'Final array mutation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that declares a final int array, modifies an element, and returns the array to demonstrate that final does not mean immutable contents.',
      skeleton: '',
      solution: `public static int[] finalArrayDemo() {
    final int[] nums = {1, 2, 3};
    nums[0] = 99;
    return nums;
}`,
      hints: [
        'final prevents reassigning the reference, not modifying contents.',
        'You can still change array elements.',
        'nums = new int[]{...} would fail, but nums[0] = 99 is fine.',
      ],
      concepts: ['final', 'array mutation', 'reference vs value'],
    },
    {
      id: 'java-var-13',
      title: 'Uninitialized local variable',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the compilation error caused by using an uninitialized local variable.',
      skeleton: `public static int getNumber() {
    int result;
    return result;
}`,
      solution: `public static int getNumber() {
    int result = 0;
    return result;
}`,
      hints: [
        'Local variables in Java must be initialized before use.',
        'Unlike instance fields, they do not get default values.',
        'Assign a value like 0 when declaring.',
      ],
      concepts: ['local variables', 'initialization', 'compilation error'],
    },
    {
      id: 'java-var-14',
      title: 'Final reassignment',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the error where a final variable is being reassigned.',
      skeleton: `public static int fixFinal() {
    final int x = 10;
    x = 20;
    return x;
}`,
      solution: `public static int fixFinal() {
    int x = 10;
    x = 20;
    return x;
}`,
      hints: [
        'A final variable cannot be reassigned after initialization.',
        'Either remove the final keyword or remove the reassignment.',
        'Remove `final` to allow reassignment.',
      ],
      concepts: ['final', 'reassignment', 'compilation error'],
    },
    {
      id: 'java-var-15',
      title: 'var without initializer',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the code that incorrectly uses var without an initializer.',
      skeleton: `public static void demo() {
    var x;
    x = 42;
    System.out.println(x);
}`,
      solution: `public static void demo() {
    var x = 42;
    System.out.println(x);
}`,
      hints: [
        'var requires an initializer so the compiler can infer the type.',
        'Move the assignment to the declaration line.',
        'Combine into: var x = 42;',
      ],
      concepts: ['var', 'type inference', 'initializer required'],
    },
    {
      id: 'java-var-16',
      title: 'Predict default values',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict what this program prints about instance field defaults.',
      skeleton: `class Defaults {
    int num;
    boolean flag;
    String text;
    public void print() {
        System.out.println(num + " " + flag + " " + text);
    }
}
// new Defaults().print();`,
      solution: `0 false null`,
      hints: [
        'Instance fields get default values in Java.',
        'int defaults to 0, boolean to false.',
        'Reference types like String default to null.',
      ],
      concepts: ['default values', 'instance fields', 'primitives vs references'],
    },
    {
      id: 'java-var-17',
      title: 'Predict var type',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the inferred type when using var with an integer literal.',
      skeleton: `var x = 10;
System.out.println(((Object) x).getClass().getSimpleName());`,
      solution: `Integer`,
      hints: [
        'The literal 10 is an int primitive.',
        'When cast to Object, autoboxing converts it to Integer.',
        'getSimpleName() returns "Integer".',
      ],
      concepts: ['var', 'type inference', 'autoboxing', 'reflection'],
    },
    {
      id: 'java-var-18',
      title: 'Predict scope behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output of this code that tests variable scope.',
      skeleton: `int a = 5;
{
    int b = 10;
    System.out.println(a + b);
}
System.out.println(a);`,
      solution: `15
5`,
      hints: [
        'The inner block can access the outer variable a.',
        'a + b = 5 + 10 = 15.',
        'After the block, only a is still in scope with value 5.',
      ],
      concepts: ['block scope', 'variable accessibility', 'nested blocks'],
    },
    {
      id: 'java-var-19',
      title: 'Refactor explicit types to var',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor the code to use var for local variable type inference where appropriate.',
      skeleton: `public static void process() {
    String message = "Hello";
    ArrayList<String> items = new ArrayList<String>();
    int count = items.size();
    HashMap<String, Integer> scores = new HashMap<String, Integer>();
    System.out.println(message + " " + count);
}`,
      solution: `public static void process() {
    var message = "Hello";
    var items = new ArrayList<String>();
    var count = items.size();
    var scores = new HashMap<String, Integer>();
    System.out.println(message + " " + count);
}`,
      hints: [
        'Replace explicit types with var when the type is obvious from the right side.',
        'var works for all local variables with initializers.',
        'The compiler infers String, ArrayList<String>, int, HashMap<String, Integer>.',
      ],
      concepts: ['var', 'type inference', 'refactoring', 'code readability'],
    },
    {
      id: 'java-var-20',
      title: 'Refactor magic numbers to constants',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor the code to extract magic numbers into named final constants.',
      skeleton: `public static double calculateArea(double radius) {
    return 3.14159 * radius * radius;
}

public static double calculateCircumference(double radius) {
    return 2 * 3.14159 * radius;
}`,
      solution: `public static final double PI = 3.14159;

public static double calculateArea(double radius) {
    return PI * radius * radius;
}

public static double calculateCircumference(double radius) {
    return 2 * PI * radius;
}`,
      hints: [
        'The value 3.14159 appears twice and should be a named constant.',
        'Use static final to declare a class-level constant.',
        'Name it PI following UPPER_SNAKE_CASE convention.',
      ],
      concepts: ['final', 'constants', 'magic numbers', 'naming conventions'],
    },
  ],
};
