import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-strings',
  title: '4. Strings',
  explanation: `## Strings

Strings in Java are objects of the \`String\` class and are **immutable**.

### String Creation
\`\`\`java
String s1 = "Hello";                // string pool
String s2 = new String("Hello");    // heap object
\`\`\`

### Key Properties
- **Immutable**: once created, cannot be changed
- **String Pool**: literal strings are interned for reuse
- **equals() vs ==**: use \`.equals()\` for value comparison

### Common Methods
- \`length()\`, \`charAt(int)\`, \`substring(int, int)\`
- \`indexOf(String)\`, \`lastIndexOf(String)\`
- \`toUpperCase()\`, \`toLowerCase()\`, \`trim()\`, \`strip()\`
- \`contains()\`, \`startsWith()\`, \`endsWith()\`
- \`replace()\`, \`replaceAll()\`, \`split()\`

### String.format and Formatted Strings
\`\`\`java
String msg = String.format("Hello, %s! You are %d.", name, age);
String msg2 = "Hello, %s!".formatted(name);
\`\`\`

### StringBuilder
For mutable string operations (especially in loops):
\`\`\`java
StringBuilder sb = new StringBuilder();
sb.append("Hello").append(" ").append("World");
String result = sb.toString();
\`\`\`

### Text Blocks (Java 13+)
\`\`\`java
String json = \"\"\"
    {
        "name": "Java"
    }
    \"\"\";
\`\`\`
`,
  exercises: [
    {
      id: 'java-str-1',
      title: 'String equality',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Compare two strings by value, not reference.',
      skeleton: `String a = new String("hello");
String b = new String("hello");
boolean same = a.__BLANK__(b);`,
      solution: `String a = new String("hello");
String b = new String("hello");
boolean same = a.equals(b);`,
      hints: [
        '== compares references, not string content.',
        'Java strings have a method for value comparison.',
        'Use `.equals()`.',
      ],
      concepts: ['equals', 'string comparison', 'reference vs value'],
    },
    {
      id: 'java-str-2',
      title: 'Get string length',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Get the number of characters in a string.',
      skeleton: `String name = "Java";
int len = name.__BLANK__();`,
      solution: `String name = "Java";
int len = name.length();`,
      hints: [
        'Strings have a method that returns the character count.',
        'It takes no parameters.',
        'The method is `length()`.',
      ],
      concepts: ['length', 'string methods'],
    },
    {
      id: 'java-str-3',
      title: 'Extract substring',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Extract "World" from the string using substring.',
      skeleton: `String text = "Hello World";
String word = text.__BLANK__(6);`,
      solution: `String text = "Hello World";
String word = text.substring(6);`,
      hints: [
        'substring(beginIndex) returns from that index to the end.',
        '"World" starts at index 6.',
        'Use `substring(6)`.',
      ],
      concepts: ['substring', 'string slicing', 'indexing'],
    },
    {
      id: 'java-str-4',
      title: 'String format',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Use String.format to create a formatted message.',
      skeleton: `String name = "Zan";
int age = 30;
String msg = String.__BLANK__("Name: %s, Age: %d", name, age);`,
      solution: `String name = "Zan";
int age = 30;
String msg = String.format("Name: %s, Age: %d", name, age);`,
      hints: [
        '%s is for strings, %d is for integers.',
        'The static method takes a format string and arguments.',
        'Use `format`.',
      ],
      concepts: ['String.format', 'format specifiers', 'string interpolation'],
    },
    {
      id: 'java-str-5',
      title: 'StringBuilder append',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Use StringBuilder to efficiently build a string.',
      skeleton: `var sb = new __BLANK__();
sb.append("Hello");
sb.append(" World");
String result = sb.toString();`,
      solution: `var sb = new StringBuilder();
sb.append("Hello");
sb.append(" World");
String result = sb.toString();`,
      hints: [
        'For mutable string building, Java provides a special class.',
        'It is more efficient than repeated string concatenation.',
        'Use `StringBuilder`.',
      ],
      concepts: ['StringBuilder', 'mutable strings', 'performance'],
    },
    {
      id: 'java-str-6',
      title: 'String join',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Join multiple strings with a comma delimiter.',
      skeleton: `String result = String.__BLANK__(", ", "a", "b", "c");`,
      solution: `String result = String.join(", ", "a", "b", "c");`,
      hints: [
        'String has a static method for joining with a delimiter.',
        'The first argument is the delimiter.',
        'Use `join`.',
      ],
      concepts: ['String.join', 'delimiter', 'varargs'],
    },
    {
      id: 'java-str-7',
      title: 'Reverse a string',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method reverse(String s) that returns the reversed string.',
      skeleton: '',
      solution: `public static String reverse(String s) {
    return new StringBuilder(s).reverse().toString();
}`,
      hints: [
        'StringBuilder has a built-in reverse() method.',
        'Create a StringBuilder from the input string.',
        'Call reverse() then toString().',
      ],
      concepts: ['StringBuilder', 'reverse', 'string manipulation'],
    },
    {
      id: 'java-str-8',
      title: 'Count occurrences',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method countChar(String s, char c) that counts how many times c appears in s.',
      skeleton: '',
      solution: `public static int countChar(String s, char c) {
    int count = 0;
    for (int i = 0; i < s.length(); i++) {
        if (s.charAt(i) == c) {
            count++;
        }
    }
    return count;
}`,
      hints: [
        'Loop through each character using charAt(i).',
        'Compare each character with the target.',
        'Increment a counter for each match.',
      ],
      concepts: ['charAt', 'string iteration', 'counting'],
    },
    {
      id: 'java-str-9',
      title: 'Check palindrome',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method isPalindrome(String s) that checks if a string reads the same forwards and backwards (case-insensitive).',
      skeleton: '',
      solution: `public static boolean isPalindrome(String s) {
    String lower = s.toLowerCase();
    String reversed = new StringBuilder(lower).reverse().toString();
    return lower.equals(reversed);
}`,
      hints: [
        'Convert to lowercase first for case-insensitive comparison.',
        'Reverse the string and compare with the original.',
        'Use StringBuilder for reversal.',
      ],
      concepts: ['palindrome', 'toLowerCase', 'StringBuilder', 'equals'],
    },
    {
      id: 'java-str-10',
      title: 'Capitalize words',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method capitalizeWords(String s) that capitalizes the first letter of each word.',
      skeleton: '',
      solution: `public static String capitalizeWords(String s) {
    String[] words = s.split(" ");
    StringBuilder result = new StringBuilder();
    for (int i = 0; i < words.length; i++) {
        if (i > 0) result.append(" ");
        if (!words[i].isEmpty()) {
            result.append(Character.toUpperCase(words[i].charAt(0)));
            result.append(words[i].substring(1));
        }
    }
    return result.toString();
}`,
      hints: [
        'Split the string by spaces.',
        'For each word, uppercase the first character.',
        'Append the rest of the word unchanged.',
      ],
      concepts: ['split', 'Character.toUpperCase', 'StringBuilder', 'string manipulation'],
    },
    {
      id: 'java-str-11',
      title: 'String repeat and strip',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method that takes a string, strips whitespace, and repeats it n times.',
      skeleton: '',
      solution: `public static String stripAndRepeat(String s, int n) {
    return s.strip().repeat(n);
}`,
      hints: [
        'strip() removes leading and trailing whitespace (Java 11+).',
        'repeat(n) repeats the string n times (Java 11+).',
        'Chain the two calls together.',
      ],
      concepts: ['strip', 'repeat', 'method chaining'],
    },
    {
      id: 'java-str-12',
      title: 'String character stream',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method countVowels(String s) that uses chars() stream to count vowels.',
      skeleton: '',
      solution: `public static long countVowels(String s) {
    return s.toLowerCase().chars()
        .filter(c -> "aeiou".indexOf(c) >= 0)
        .count();
}`,
      hints: [
        'String.chars() returns an IntStream of character values.',
        'Filter for characters that are vowels.',
        'Use count() to get the total.',
      ],
      concepts: ['chars', 'IntStream', 'filter', 'count', 'functional'],
    },
    {
      id: 'java-str-13',
      title: 'String concatenation in loop',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the performance issue of string concatenation in a loop.',
      skeleton: `public static String joinNumbers(int n) {
    String result = "";
    for (int i = 0; i < n; i++) {
        result = result + i + ",";
    }
    return result;
}`,
      solution: `public static String joinNumbers(int n) {
    StringBuilder result = new StringBuilder();
    for (int i = 0; i < n; i++) {
        result.append(i).append(",");
    }
    return result.toString();
}`,
      hints: [
        'String concatenation in a loop creates many intermediate objects.',
        'Use StringBuilder for efficient string building.',
        'Append each piece to the StringBuilder.',
      ],
      concepts: ['StringBuilder', 'performance', 'string concatenation'],
    },
    {
      id: 'java-str-14',
      title: 'Null string comparison',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the NullPointerException when comparing a potentially null string.',
      skeleton: `public static boolean isHello(String s) {
    return s.equals("hello");
}`,
      solution: `public static boolean isHello(String s) {
    return "hello".equals(s);
}`,
      hints: [
        'If s is null, calling s.equals() throws NullPointerException.',
        'Put the known non-null string on the left side.',
        '"hello".equals(s) safely handles null.',
      ],
      concepts: ['null safety', 'equals', 'defensive programming'],
    },
    {
      id: 'java-str-15',
      title: 'Wrong string comparison',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the string comparison that uses == instead of equals.',
      skeleton: `public static boolean checkPassword(String input) {
    String password = new String("secret");
    return input == password;
}`,
      solution: `public static boolean checkPassword(String input) {
    String password = new String("secret");
    return input.equals(password);
}`,
      hints: [
        '== compares object references, not string content.',
        'new String() creates a different object even with same content.',
        'Use .equals() for content comparison.',
      ],
      concepts: ['equals vs ==', 'string pool', 'reference comparison'],
    },
    {
      id: 'java-str-16',
      title: 'Predict string pool',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output of string pool comparison.',
      skeleton: `String a = "hello";
String b = "hello";
System.out.println(a == b);`,
      solution: `true`,
      hints: [
        'String literals are interned in the string pool.',
        'Both a and b point to the same pooled object.',
        '== returns true because the references are the same.',
      ],
      concepts: ['string pool', 'interning', 'reference equality'],
    },
    {
      id: 'java-str-17',
      title: 'Predict concat result',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the result of mixed string and number concatenation.',
      skeleton: `System.out.println("Result: " + 1 + 2);`,
      solution: `Result: 12`,
      hints: [
        'String concatenation is left-to-right.',
        '"Result: " + 1 produces "Result: 1".',
        'Then "Result: 1" + 2 produces "Result: 12".',
      ],
      concepts: ['string concatenation', 'operator precedence', 'type coercion'],
    },
    {
      id: 'java-str-18',
      title: 'Predict immutability',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the output demonstrating string immutability.',
      skeleton: `String s = "hello";
s.toUpperCase();
System.out.println(s);`,
      solution: `hello`,
      hints: [
        'Strings are immutable in Java.',
        'toUpperCase() returns a NEW string.',
        'The original string s is unchanged.',
      ],
      concepts: ['immutability', 'toUpperCase', 'return value'],
    },
    {
      id: 'java-str-19',
      title: 'Refactor to String.format',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor the messy concatenation to use String.format.',
      skeleton: `public static String buildMessage(String name, int score, double avg) {
    return "Player " + name + " scored " + score + " points with average " + avg + ".";
}`,
      solution: `public static String buildMessage(String name, int score, double avg) {
    return String.format("Player %s scored %d points with average %.1f.", name, score, avg);
}`,
      hints: [
        'String.format is cleaner for complex string building.',
        'Use %s for strings, %d for ints, %.1f for doubles with 1 decimal.',
        'The format string makes the template clear.',
      ],
      concepts: ['String.format', 'format specifiers', 'code readability'],
    },
    {
      id: 'java-str-20',
      title: 'Refactor to text block',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor the escaped string to use a text block.',
      skeleton: `public static String getJson() {
    return "{\\n  \\"name\\": \\"Java\\",\\n  \\"version\\": 21\\n}";
}`,
      solution: `public static String getJson() {
    return """
           {
             "name": "Java",
             "version": 21
           }""";
}`,
      hints: [
        'Text blocks use triple quotes and preserve formatting.',
        'No need to escape double quotes inside text blocks.',
        'Indentation is automatically stripped based on closing quotes.',
      ],
      concepts: ['text blocks', 'multiline strings', 'escape sequences'],
    },
  ],
};
