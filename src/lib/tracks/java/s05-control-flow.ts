import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-control-flow',
  title: '5. Control Flow',
  explanation: `## Control Flow

Java provides standard control flow statements for branching and looping.

### If/Else
\`\`\`java
if (x > 0) {
    // positive
} else if (x < 0) {
    // negative
} else {
    // zero
}
\`\`\`

### Switch (Classic)
\`\`\`java
switch (day) {
    case "MON": case "TUE": System.out.println("Early week"); break;
    default: System.out.println("Other");
}
\`\`\`

### Switch Expression (Java 14+)
\`\`\`java
String result = switch (day) {
    case "MON", "TUE" -> "Early week";
    case "WED" -> "Midweek";
    default -> "Other";
};
\`\`\`

### Loops
- **for**: \`for (int i = 0; i < n; i++)\`
- **enhanced for**: \`for (String s : list)\`
- **while**: \`while (condition) { }\`
- **do-while**: \`do { } while (condition);\`

### Break and Continue
- \`break\`: exits the loop
- \`continue\`: skips to next iteration
- **Labeled break**: exits an outer loop
\`\`\`java
outer:
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
        if (condition) break outer;
    }
}
\`\`\`
`,
  exercises: [
    {
      id: 'java-ctrl-1',
      title: 'If-else basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Complete the if-else to classify a number as positive, negative, or zero.',
      skeleton: `if (x > 0) {
    result = "positive";
} __BLANK__ (x < 0) {
    result = "negative";
} else {
    result = "zero";
}`,
      solution: `if (x > 0) {
    result = "positive";
} else if (x < 0) {
    result = "negative";
} else {
    result = "zero";
}`,
      hints: [
        'You need a keyword combination for an additional condition.',
        'It chains another condition after the first if.',
        'Use `else if`.',
      ],
      concepts: ['if-else', 'conditional branching', 'else if'],
    },
    {
      id: 'java-ctrl-2',
      title: 'Switch expression',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Complete the switch expression using arrow syntax.',
      skeleton: `String name = switch (dayNum) {
    case 1 __BLANK__ "Monday";
    case 2 __BLANK__ "Tuesday";
    default __BLANK__ "Other";
};`,
      solution: `String name = switch (dayNum) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    default -> "Other";
};`,
      hints: [
        'Switch expressions use arrow syntax instead of colon+break.',
        'The arrow produces the value for each case.',
        'Use `->` after each case.',
      ],
      concepts: ['switch expression', 'arrow syntax', 'Java 14+'],
    },
    {
      id: 'java-ctrl-3',
      title: 'Enhanced for loop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Complete the enhanced for loop to iterate over an array.',
      skeleton: `int[] nums = {1, 2, 3};
__BLANK__ (int n __BLANK__ nums) {
    System.out.println(n);
}`,
      solution: `int[] nums = {1, 2, 3};
for (int n : nums) {
    System.out.println(n);
}`,
      hints: [
        'The enhanced for loop uses a colon to separate variable from collection.',
        'It starts with the `for` keyword.',
        'Use `for` and `:` in the blanks.',
      ],
      concepts: ['enhanced for', 'for-each', 'array iteration'],
    },
    {
      id: 'java-ctrl-4',
      title: 'Do-while loop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Complete the do-while loop structure.',
      skeleton: `int i = 0;
__BLANK__ {
    System.out.println(i);
    i++;
} __BLANK__ (i < 3);`,
      solution: `int i = 0;
do {
    System.out.println(i);
    i++;
} while (i < 3);`,
      hints: [
        'This loop always executes at least once.',
        'It starts with `do` and ends with `while`.',
        'The condition is checked after each iteration.',
      ],
      concepts: ['do-while', 'loop', 'post-condition'],
    },
    {
      id: 'java-ctrl-5',
      title: 'Labeled break',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Use a labeled break to exit both nested loops.',
      skeleton: `__BLANK__:
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
        if (i * j > 6) break __BLANK__;
    }
}`,
      solution: `outer:
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
        if (i * j > 6) break outer;
    }
}`,
      hints: [
        'Labels are identifiers followed by a colon before a loop.',
        'break with a label exits the labeled loop.',
        'Use `outer` as the label name.',
      ],
      concepts: ['labeled break', 'nested loops', 'loop control'],
    },
    {
      id: 'java-ctrl-6',
      title: 'Continue keyword',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Use continue to skip even numbers in the loop.',
      skeleton: `for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) __BLANK__;
    System.out.println(i);
}`,
      solution: `for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) continue;
    System.out.println(i);
}`,
      hints: [
        'You want to skip the rest of the loop body for even numbers.',
        'This keyword jumps to the next iteration.',
        'Use `continue`.',
      ],
      concepts: ['continue', 'loop control', 'skip iteration'],
    },
    {
      id: 'java-ctrl-7',
      title: 'FizzBuzz',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method fizzBuzz(int n) that returns "FizzBuzz" if divisible by both 3 and 5, "Fizz" if by 3, "Buzz" if by 5, or the number as string.',
      skeleton: '',
      solution: `public static String fizzBuzz(int n) {
    if (n % 15 == 0) return "FizzBuzz";
    if (n % 3 == 0) return "Fizz";
    if (n % 5 == 0) return "Buzz";
    return String.valueOf(n);
}`,
      hints: [
        'Check divisible by both (15) first.',
        'Then check 3, then 5.',
        'Convert number to string with String.valueOf().',
      ],
      concepts: ['if-else', 'modulo', 'FizzBuzz', 'conditional logic'],
    },
    {
      id: 'java-ctrl-8',
      title: 'Sum digits',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method sumDigits(int n) that returns the sum of all digits using a while loop.',
      skeleton: '',
      solution: `public static int sumDigits(int n) {
    n = Math.abs(n);
    int sum = 0;
    while (n > 0) {
        sum += n % 10;
        n /= 10;
    }
    return sum;
}`,
      hints: [
        'Use n % 10 to get the last digit.',
        'Use n / 10 to remove the last digit.',
        'Loop while n > 0.',
      ],
      concepts: ['while loop', 'modulo', 'digit extraction'],
    },
    {
      id: 'java-ctrl-9',
      title: 'Find first duplicate',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method firstDuplicate(int[] arr) that returns the first value that appears twice, or -1 if none.',
      skeleton: '',
      solution: `public static int firstDuplicate(int[] arr) {
    java.util.Set<Integer> seen = new java.util.HashSet<>();
    for (int n : arr) {
        if (!seen.add(n)) {
            return n;
        }
    }
    return -1;
}`,
      hints: [
        'Use a HashSet to track seen values.',
        'Set.add() returns false if the element already exists.',
        'Return the element when add returns false.',
      ],
      concepts: ['enhanced for', 'HashSet', 'duplicate detection'],
    },
    {
      id: 'java-ctrl-10',
      title: 'Day name with switch expression',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method dayName(int day) using a switch expression that returns the day name (1=Monday...7=Sunday) or "Invalid".',
      skeleton: '',
      solution: `public static String dayName(int day) {
    return switch (day) {
        case 1 -> "Monday";
        case 2 -> "Tuesday";
        case 3 -> "Wednesday";
        case 4 -> "Thursday";
        case 5 -> "Friday";
        case 6 -> "Saturday";
        case 7 -> "Sunday";
        default -> "Invalid";
    };
}`,
      hints: [
        'Switch expressions return a value.',
        'Use arrow syntax -> for each case.',
        'The default handles invalid inputs.',
      ],
      concepts: ['switch expression', 'arrow syntax', 'exhaustive cases'],
    },
    {
      id: 'java-ctrl-11',
      title: 'Binary search',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method binarySearch(int[] sorted, int target) that returns the index of target or -1.',
      skeleton: '',
      solution: `public static int binarySearch(int[] sorted, int target) {
    int low = 0;
    int high = sorted.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (sorted[mid] == target) return mid;
        if (sorted[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
      hints: [
        'Maintain low and high pointers.',
        'Calculate mid avoiding overflow: low + (high - low) / 2.',
        'Narrow the range based on comparison.',
      ],
      concepts: ['while loop', 'binary search', 'algorithm'],
    },
    {
      id: 'java-ctrl-12',
      title: 'Matrix search with labeled break',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method findInMatrix(int[][] matrix, int target) that returns true if found, using a labeled break.',
      skeleton: '',
      solution: `public static boolean findInMatrix(int[][] matrix, int target) {
    boolean found = false;
    search:
    for (int[] row : matrix) {
        for (int val : row) {
            if (val == target) {
                found = true;
                break search;
            }
        }
    }
    return found;
}`,
      hints: [
        'Use a label before the outer loop.',
        'break with the label exits both loops.',
        'Set a flag before breaking.',
      ],
      concepts: ['labeled break', 'nested loops', '2D array', 'search'],
    },
    {
      id: 'java-ctrl-13',
      title: 'Missing break in switch',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the fall-through bug in the classic switch statement.',
      skeleton: `public static String getColor(int code) {
    String color;
    switch (code) {
        case 1:
            color = "Red";
        case 2:
            color = "Green";
        case 3:
            color = "Blue";
        default:
            color = "Unknown";
    }
    return color;
}`,
      solution: `public static String getColor(int code) {
    String color;
    switch (code) {
        case 1:
            color = "Red";
            break;
        case 2:
            color = "Green";
            break;
        case 3:
            color = "Blue";
            break;
        default:
            color = "Unknown";
    }
    return color;
}`,
      hints: [
        'Classic switch falls through to the next case without break.',
        'Each case needs a break statement to prevent fall-through.',
        'Add break after each case body.',
      ],
      concepts: ['switch fall-through', 'break', 'classic switch'],
    },
    {
      id: 'java-ctrl-14',
      title: 'Off-by-one loop',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the off-by-one error that causes ArrayIndexOutOfBoundsException.',
      skeleton: `public static int sum(int[] arr) {
    int total = 0;
    for (int i = 0; i <= arr.length; i++) {
        total += arr[i];
    }
    return total;
}`,
      solution: `public static int sum(int[] arr) {
    int total = 0;
    for (int i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    return total;
}`,
      hints: [
        'Array indices go from 0 to length-1.',
        'Using <= causes access at index length which is out of bounds.',
        'Change <= to <.',
      ],
      concepts: ['off-by-one', 'array bounds', 'for loop'],
    },
    {
      id: 'java-ctrl-15',
      title: 'Infinite while loop',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the infinite loop caused by forgetting to update the loop variable.',
      skeleton: `public static int countDown(int n) {
    int steps = 0;
    while (n > 0) {
        steps++;
    }
    return steps;
}`,
      solution: `public static int countDown(int n) {
    int steps = 0;
    while (n > 0) {
        n--;
        steps++;
    }
    return steps;
}`,
      hints: [
        'The loop variable n never changes inside the loop.',
        'The condition n > 0 will always be true.',
        'Add n-- to decrement the counter.',
      ],
      concepts: ['infinite loop', 'while loop', 'loop variable update'],
    },
    {
      id: 'java-ctrl-16',
      title: 'Predict for loop output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the output of this for loop.',
      skeleton: `for (int i = 0; i < 5; i++) {
    if (i == 3) continue;
    System.out.print(i + " ");
}`,
      solution: `0 1 2 4 `,
      hints: [
        'continue skips the rest of the loop body.',
        'When i is 3, the print is skipped.',
        'Output: 0 1 2 4 (3 is skipped).',
      ],
      concepts: ['for loop', 'continue', 'skip iteration'],
    },
    {
      id: 'java-ctrl-17',
      title: 'Predict switch expression',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output of this switch expression.',
      skeleton: `int x = 2;
String result = switch (x) {
    case 1, 2 -> "low";
    case 3, 4 -> "mid";
    default -> "high";
};
System.out.println(result);`,
      solution: `low`,
      hints: [
        'x is 2, which matches case 1, 2.',
        'Multiple values per case are separated by commas.',
        'The result is "low".',
      ],
      concepts: ['switch expression', 'multiple case values', 'arrow syntax'],
    },
    {
      id: 'java-ctrl-18',
      title: 'Predict do-while',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the output of this do-while with a false condition.',
      skeleton: `int i = 10;
do {
    System.out.println(i);
    i++;
} while (i < 5);`,
      solution: `10`,
      hints: [
        'do-while always executes the body at least once.',
        'The condition is checked after the first iteration.',
        'i starts at 10, which is already >= 5, so it runs once.',
      ],
      concepts: ['do-while', 'minimum one execution', 'loop condition'],
    },
    {
      id: 'java-ctrl-19',
      title: 'Refactor if-chain to switch expression',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor the if-else chain to a switch expression.',
      skeleton: `public static int getDays(String month) {
    if (month.equals("Feb")) {
        return 28;
    } else if (month.equals("Apr") || month.equals("Jun") || month.equals("Sep") || month.equals("Nov")) {
        return 30;
    } else {
        return 31;
    }
}`,
      solution: `public static int getDays(String month) {
    return switch (month) {
        case "Feb" -> 28;
        case "Apr", "Jun", "Sep", "Nov" -> 30;
        default -> 31;
    };
}`,
      hints: [
        'Switch expressions support String matching.',
        'Multiple case values can be comma-separated.',
        'Arrow syntax avoids break statements.',
      ],
      concepts: ['switch expression', 'refactoring', 'pattern matching'],
    },
    {
      id: 'java-ctrl-20',
      title: 'Refactor indexed loop to enhanced for',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Refactor the index-based for loop to an enhanced for loop.',
      skeleton: `public static int sum(int[] arr) {
    int total = 0;
    for (int i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    return total;
}`,
      solution: `public static int sum(int[] arr) {
    int total = 0;
    for (int n : arr) {
        total += n;
    }
    return total;
}`,
      hints: [
        'When you do not need the index, enhanced for is cleaner.',
        'Replace the index variable with a direct element variable.',
        'Use for (int n : arr) syntax.',
      ],
      concepts: ['enhanced for', 'for-each', 'refactoring'],
    },
  ],
};
