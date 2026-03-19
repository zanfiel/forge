import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-ctrl',
  title: '5. Control Flow',
  explanation: `## Control Flow

C# provides standard control flow constructs plus modern switch expressions.

\`\`\`csharp
// if / else if / else
if (x > 0) { }
else if (x == 0) { }
else { }

// switch statement
switch (day)
{
    case "Mon": Console.WriteLine("Monday"); break;
    case "Tue": Console.WriteLine("Tuesday"); break;
    default: Console.WriteLine("Other"); break;
}

// switch expression (C# 8+)
string result = day switch
{
    "Mon" => "Monday",
    "Tue" => "Tuesday",
    _ => "Other"
};

// Loops
for (int i = 0; i < 10; i++) { }
while (condition) { }
do { } while (condition);
foreach (var item in collection) { }

// break exits the loop; continue skips to the next iteration
// goto (rarely used) jumps to a labeled statement
\`\`\`

Switch expressions are preferred over switch statements when returning a value. They are exhaustive and concise.`,
  exercises: [
    {
      id: 'cs-ctrl-1',
      title: 'If-Else Basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fill in the keyword to complete the else-if chain.',
      skeleton: `int score = 85;
string grade;
if (score >= 90)
    grade = "A";
__BLANK__ (score >= 80)
    grade = "B";
else
    grade = "C";`,
      solution: `int score = 85;
string grade;
if (score >= 90)
    grade = "A";
else if (score >= 80)
    grade = "B";
else
    grade = "C";`,
      hints: [
        'The keyword between if blocks that chains conditions.',
        'It combines else with another if check.',
        'The answer is: else if',
      ],
      concepts: ['if', 'else if', 'conditional branching'],
    },
    {
      id: 'cs-ctrl-2',
      title: 'Switch Expression',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Complete the switch expression to return the day name.',
      skeleton: `int day = 1;
string name = day __BLANK__
{
    1 => "Monday",
    2 => "Tuesday",
    3 => "Wednesday",
    _ => "Other"
};`,
      solution: `int day = 1;
string name = day switch
{
    1 => "Monday",
    2 => "Tuesday",
    3 => "Wednesday",
    _ => "Other"
};`,
      hints: [
        'Switch expressions use the switch keyword after the value.',
        'Each arm uses => instead of case/break.',
        'The answer is: switch',
      ],
      concepts: ['switch expression', 'pattern matching', 'C# 8'],
    },
    {
      id: 'cs-ctrl-3',
      title: 'Foreach Loop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Complete the foreach loop to iterate over the array.',
      skeleton: `int[] nums = { 1, 2, 3, 4, 5 };
int sum = 0;
__BLANK__ (var n in nums)
{
    sum += n;
}`,
      solution: `int[] nums = { 1, 2, 3, 4, 5 };
int sum = 0;
foreach (var n in nums)
{
    sum += n;
}`,
      hints: [
        'This loop type iterates over each element in a collection.',
        'It does not use an index variable.',
        'The answer is: foreach',
      ],
      concepts: ['foreach', 'iteration', 'collection'],
    },
    {
      id: 'cs-ctrl-4',
      title: 'Do-While Loop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Complete the do-while loop that runs at least once.',
      skeleton: `int count = 0;
__BLANK__
{
    count++;
} while (count < 3);`,
      solution: `int count = 0;
do
{
    count++;
} while (count < 3);`,
      hints: [
        'This loop executes the body before checking the condition.',
        'It guarantees at least one execution.',
        'The answer is: do',
      ],
      concepts: ['do-while', 'loop', 'post-condition'],
    },
    {
      id: 'cs-ctrl-5',
      title: 'Break Statement',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Use break to exit the loop when the target is found.',
      skeleton: `int[] data = { 3, 7, 2, 9, 4 };
int target = 9;
bool found = false;
foreach (var n in data)
{
    if (n == target)
    {
        found = true;
        __BLANK__;
    }
}`,
      solution: `int[] data = { 3, 7, 2, 9, 4 };
int target = 9;
bool found = false;
foreach (var n in data)
{
    if (n == target)
    {
        found = true;
        break;
    }
}`,
      hints: [
        'This statement immediately exits the enclosing loop.',
        'No more iterations will execute after this statement.',
        'The answer is: break',
      ],
      concepts: ['break', 'early exit', 'loop control'],
    },
    {
      id: 'cs-ctrl-6',
      title: 'Continue Statement',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Use continue to skip even numbers.',
      skeleton: `for (int i = 1; i <= 10; i++)
{
    if (i % 2 == 0) __BLANK__;
    Console.Write(i + " ");
}
// prints: 1 3 5 7 9`,
      solution: `for (int i = 1; i <= 10; i++)
{
    if (i % 2 == 0) continue;
    Console.Write(i + " ");
}
// prints: 1 3 5 7 9`,
      hints: [
        'This statement skips the rest of the current iteration.',
        'It jumps to the next iteration of the loop.',
        'The answer is: continue',
      ],
      concepts: ['continue', 'skip iteration', 'loop control'],
    },
    {
      id: 'cs-ctrl-7',
      title: 'FizzBuzz',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a method FizzBuzz that takes an int n and returns "FizzBuzz" if divisible by 15, "Fizz" if by 3, "Buzz" if by 5, or the number as a string.',
      skeleton: ``,
      solution: `static string FizzBuzz(int n)
{
    if (n % 15 == 0) return "FizzBuzz";
    if (n % 3 == 0) return "Fizz";
    if (n % 5 == 0) return "Buzz";
    return n.ToString();
}`,
      hints: [
        'Check divisible by 15 first (both 3 and 5).',
        'Use the modulus operator % to check divisibility.',
        'Convert the number to string with .ToString().',
      ],
      concepts: ['modulus', 'if/else', 'FizzBuzz', 'string conversion'],
    },
    {
      id: 'cs-ctrl-8',
      title: 'Sum with While',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a method SumDigits that takes an int and returns the sum of its digits using a while loop.',
      skeleton: ``,
      solution: `static int SumDigits(int n)
{
    n = Math.Abs(n);
    int sum = 0;
    while (n > 0)
    {
        sum += n % 10;
        n /= 10;
    }
    return sum;
}`,
      hints: [
        'Use n % 10 to get the last digit.',
        'Use n /= 10 to remove the last digit.',
        'Loop while n > 0.',
      ],
      concepts: ['while loop', 'modulus', 'digit extraction'],
    },
    {
      id: 'cs-ctrl-9',
      title: 'Switch Expression with Guards',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method Categorize that takes an int and returns "negative", "zero", "small" (1-10), "medium" (11-100), or "large" (>100) using a switch expression with when guards.',
      skeleton: ``,
      solution: `static string Categorize(int n)
{
    return n switch
    {
        < 0 => "negative",
        0 => "zero",
        <= 10 => "small",
        <= 100 => "medium",
        _ => "large"
    };
}`,
      hints: [
        'Switch expressions support relational patterns like < 0, <= 10.',
        'Arms are evaluated top to bottom; first match wins.',
        'Use _ as the default/catch-all pattern.',
      ],
      concepts: ['switch expression', 'relational pattern', 'when guard'],
    },
    {
      id: 'cs-ctrl-10',
      title: 'Nested Loop Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method PrintTriangle that takes an int n and returns a string of a right triangle of asterisks (e.g., n=3: "*\\n**\\n***\\n").',
      skeleton: ``,
      solution: `static string PrintTriangle(int n)
{
    var sb = new System.Text.StringBuilder();
    for (int i = 1; i <= n; i++)
    {
        for (int j = 0; j < i; j++)
        {
            sb.Append('*');
        }
        sb.AppendLine();
    }
    return sb.ToString();
}`,
      hints: [
        'Use nested loops: outer for rows, inner for columns.',
        'Row i has i asterisks.',
        'Use StringBuilder for efficient string building.',
      ],
      concepts: ['nested loops', 'StringBuilder', 'pattern printing'],
    },
    {
      id: 'cs-ctrl-11',
      title: 'Binary Search',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method BinarySearch that takes a sorted int[] and target, returns the index or -1.',
      skeleton: ``,
      solution: `static int BinarySearch(int[] sorted, int target)
{
    int lo = 0, hi = sorted.Length - 1;
    while (lo <= hi)
    {
        int mid = lo + (hi - lo) / 2;
        if (sorted[mid] == target) return mid;
        if (sorted[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}`,
      hints: [
        'Use two pointers: lo and hi.',
        'Calculate mid to avoid overflow: lo + (hi - lo) / 2.',
        'Narrow the search by adjusting lo or hi based on comparison.',
      ],
      concepts: ['binary search', 'while loop', 'sorted array', 'algorithm'],
    },
    {
      id: 'cs-ctrl-12',
      title: 'Collect Until Sentinel',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method CollectUntilZero that takes an int[] and returns a list of elements up to (but not including) the first zero.',
      skeleton: ``,
      solution: `static List<int> CollectUntilZero(int[] data)
{
    var result = new List<int>();
    foreach (var n in data)
    {
        if (n == 0) break;
        result.Add(n);
    }
    return result;
}`,
      hints: [
        'Use foreach to iterate and break when encountering zero.',
        'Add each non-zero element to a result list.',
        'break exits the loop immediately.',
      ],
      concepts: ['foreach', 'break', 'sentinel value', 'List<T>'],
    },
    {
      id: 'cs-ctrl-13',
      title: 'Missing Break Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the switch statement. In C#, fall-through without break is a compilation error.',
      skeleton: `static string DayType(int day)
{
    string type;
    switch (day)
    {
        case 6:
        case 7:
            type = "Weekend";
        default:
            type = "Weekday";
    }
    return type;
}`,
      solution: `static string DayType(int day)
{
    string type;
    switch (day)
    {
        case 6:
        case 7:
            type = "Weekend";
            break;
        default:
            type = "Weekday";
            break;
    }
    return type;
}`,
      hints: [
        'C# requires explicit break (or return/throw/goto) to end a case.',
        'Empty cases (case 6:) can fall through, but cases with code cannot.',
        'Add break; after each case body.',
      ],
      concepts: ['switch statement', 'break', 'fall-through error'],
    },
    {
      id: 'cs-ctrl-14',
      title: 'Off-by-One Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the off-by-one error in the loop that causes an IndexOutOfRangeException.',
      skeleton: `static int Sum(int[] arr)
{
    int sum = 0;
    for (int i = 0; i <= arr.Length; i++) // bug!
    {
        sum += arr[i];
    }
    return sum;
}`,
      solution: `static int Sum(int[] arr)
{
    int sum = 0;
    for (int i = 0; i < arr.Length; i++)
    {
        sum += arr[i];
    }
    return sum;
}`,
      hints: [
        'Array indices go from 0 to Length - 1.',
        'Using <= arr.Length accesses one element past the end.',
        'Change <= to < to fix the bounds.',
      ],
      concepts: ['off-by-one', 'array bounds', 'IndexOutOfRangeException'],
    },
    {
      id: 'cs-ctrl-15',
      title: 'Infinite Loop Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the infinite loop. The loop variable is never modified.',
      skeleton: `static int CountDown(int n)
{
    int steps = 0;
    while (n > 0)
    {
        steps++;
        // forgot to decrement n!
    }
    return steps;
}`,
      solution: `static int CountDown(int n)
{
    int steps = 0;
    while (n > 0)
    {
        steps++;
        n--;
    }
    return steps;
}`,
      hints: [
        'The while condition n > 0 never becomes false.',
        'You need to modify n inside the loop to make progress.',
        'Add n-- to decrement n each iteration.',
      ],
      concepts: ['infinite loop', 'loop invariant', 'decrement'],
    },
    {
      id: 'cs-ctrl-16',
      title: 'Predict For Loop',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `for (int i = 0; i < 5; i++)
{
    if (i == 3) continue;
    Console.Write(i + " ");
}`,
      solution: `0 1 2 4 `,
      hints: [
        'continue skips the rest of the loop body for that iteration.',
        'When i is 3, Console.Write is skipped.',
        'Output: 0 1 2 4 (3 is skipped).',
      ],
      concepts: ['for loop', 'continue', 'loop control'],
    },
    {
      id: 'cs-ctrl-17',
      title: 'Predict Switch Expression',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `int x = 15;
string result = x switch
{
    > 20 => "high",
    > 10 => "medium",
    > 0 => "low",
    _ => "none"
};
Console.WriteLine(result);`,
      solution: `medium`,
      hints: [
        'Switch expression arms are evaluated top to bottom.',
        '15 is not > 20, but 15 is > 10.',
        'The first matching arm "medium" is selected.',
      ],
      concepts: ['switch expression', 'relational pattern', 'first match'],
    },
    {
      id: 'cs-ctrl-18',
      title: 'Predict Nested Break',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `int count = 0;
for (int i = 0; i < 3; i++)
{
    for (int j = 0; j < 3; j++)
    {
        if (j == 1) break;
        count++;
    }
}
Console.WriteLine(count);`,
      solution: `3`,
      hints: [
        'break only exits the innermost loop.',
        'The inner loop runs j=0 then breaks at j=1 each time.',
        'The outer loop runs 3 times, inner does 1 iteration each = 3.',
      ],
      concepts: ['nested loops', 'break scope', 'loop counting'],
    },
    {
      id: 'cs-ctrl-19',
      title: 'Refactor If-Chain to Switch',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor the if-else chain into a switch expression.',
      skeleton: `static string GetSeason(int month)
{
    if (month >= 3 && month <= 5) return "Spring";
    else if (month >= 6 && month <= 8) return "Summer";
    else if (month >= 9 && month <= 11) return "Fall";
    else return "Winter";
}`,
      solution: `static string GetSeason(int month)
{
    return month switch
    {
        >= 3 and <= 5 => "Spring",
        >= 6 and <= 8 => "Summer",
        >= 9 and <= 11 => "Fall",
        _ => "Winter"
    };
}`,
      hints: [
        'Switch expressions support relational and logical patterns.',
        'Use >= 3 and <= 5 for range checks.',
        '_ is the discard pattern for the default case.',
      ],
      concepts: ['switch expression', 'relational pattern', 'and pattern', 'refactoring'],
    },
    {
      id: 'cs-ctrl-20',
      title: 'State Machine with Switch',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a method RunStateMachine that processes a string of commands ("F"=forward, "L"=left, "R"=right) starting at (0,0) facing North, and returns the final (x,y) as a tuple. North=+y, East=+x.',
      skeleton: ``,
      solution: `static (int x, int y) RunStateMachine(string commands)
{
    int x = 0, y = 0;
    int dir = 0; // 0=N, 1=E, 2=S, 3=W
    foreach (char c in commands)
    {
        switch (c)
        {
            case 'F':
                switch (dir)
                {
                    case 0: y++; break;
                    case 1: x++; break;
                    case 2: y--; break;
                    case 3: x--; break;
                }
                break;
            case 'R': dir = (dir + 1) % 4; break;
            case 'L': dir = (dir + 3) % 4; break;
        }
    }
    return (x, y);
}`,
      hints: [
        'Represent direction as 0-3 (N/E/S/W). Right = +1 mod 4, Left = +3 mod 4.',
        'Use nested switch: outer for command type, inner for direction when moving.',
        'Return a ValueTuple (x, y) with the final position.',
      ],
      concepts: ['state machine', 'switch', 'modular arithmetic', 'tuple return'],
    },
  ],
};
