import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-str',
  title: '4. Strings',
  explanation: `## Strings

Strings in C# are immutable reference types. Every modification creates a new string. For heavy concatenation, use \`StringBuilder\`.

\`\`\`csharp
// String interpolation (preferred)
string name = "Alice";
string msg = $"Hello, {name}!";

// Verbatim strings -- no escape processing
string path = @"C:\\Users\\file.txt"; // backslashes are literal

// Raw string literals (C# 11)
string json = \"\"\"""
    { "key": "value" }
    \"\"\";

// Common methods
"hello".ToUpper()          // "HELLO"
"  hi  ".Trim()            // "hi"
"a,b,c".Split(',')         // ["a","b","c"]
string.Join("-", arr)      // "a-b-c"
"hello".Contains("ell")    // true
"hello".Substring(1, 3)    // "ell"
"hello".Replace("l", "L")  // "heLLo"

// StringBuilder for efficient concatenation
var sb = new StringBuilder();
sb.Append("Hello");
sb.Append(", World!");
string result = sb.ToString();

// String comparison
string.Equals(a, b, StringComparison.OrdinalIgnoreCase)
\`\`\`

Strings are compared by value with \`==\` in C# (unlike Java). Use \`StringComparison\` for culture-aware or case-insensitive comparisons.`,
  exercises: [
    {
      id: 'cs-str-1',
      title: 'String Interpolation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Use string interpolation to create a greeting message.',
      skeleton: `string name = "World";
int year = 2026;
string msg = __BLANK__;
Console.WriteLine(msg); // "Hello, World! Year: 2026"`,
      solution: `string name = "World";
int year = 2026;
string msg = $"Hello, {name}! Year: {year}";
Console.WriteLine(msg); // "Hello, World! Year: 2026"`,
      hints: [
        'String interpolation uses $ before the opening quote.',
        'Embed expressions inside curly braces {expression}.',
        'The answer is: $"Hello, {name}! Year: {year}"',
      ],
      concepts: ['string interpolation', '$', 'embedded expressions'],
    },
    {
      id: 'cs-str-2',
      title: 'Verbatim String',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Use a verbatim string to represent a Windows file path without double backslashes.',
      skeleton: `string path = __BLANK__;
Console.WriteLine(path); // C:\\Users\\Zan\\file.txt`,
      solution: `string path = @"C:\\Users\\Zan\\file.txt";
Console.WriteLine(path); // C:\\Users\\Zan\\file.txt`,
      hints: [
        'Verbatim strings are prefixed with @.',
        'In verbatim strings, backslashes are treated literally.',
        'The answer is: @"C:\\Users\\Zan\\file.txt"',
      ],
      concepts: ['verbatim string', '@ prefix', 'escape characters'],
    },
    {
      id: 'cs-str-3',
      title: 'String Split',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Split a CSV string into an array of strings.',
      skeleton: `string csv = "apple,banana,cherry";
string[] fruits = csv.__BLANK__;
Console.WriteLine(fruits.Length); // 3`,
      solution: `string csv = "apple,banana,cherry";
string[] fruits = csv.Split(',');
Console.WriteLine(fruits.Length); // 3`,
      hints: [
        'The Split method divides a string by a delimiter.',
        'Pass the delimiter character to Split.',
        'The answer is: Split(\',\')',
      ],
      concepts: ['Split', 'string to array', 'delimiter'],
    },
    {
      id: 'cs-str-4',
      title: 'String Join',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Join an array of strings with a dash separator.',
      skeleton: `string[] words = { "one", "two", "three" };
string result = __BLANK__;
Console.WriteLine(result); // "one-two-three"`,
      solution: `string[] words = { "one", "two", "three" };
string result = string.Join("-", words);
Console.WriteLine(result); // "one-two-three"`,
      hints: [
        'string.Join is a static method on the string class.',
        'First argument is the separator, second is the collection.',
        'The answer is: string.Join("-", words)',
      ],
      concepts: ['string.Join', 'array to string', 'separator'],
    },
    {
      id: 'cs-str-5',
      title: 'Case-Insensitive Compare',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Compare two strings ignoring case using StringComparison.',
      skeleton: `string a = "Hello";
string b = "hello";
bool same = string.Equals(a, b, __BLANK__);
Console.WriteLine(same); // True`,
      solution: `string a = "Hello";
string b = "hello";
bool same = string.Equals(a, b, StringComparison.OrdinalIgnoreCase);
Console.WriteLine(same); // True`,
      hints: [
        'StringComparison is an enum with various comparison modes.',
        'OrdinalIgnoreCase does a byte-level comparison ignoring case.',
        'The answer is: StringComparison.OrdinalIgnoreCase',
      ],
      concepts: ['StringComparison', 'OrdinalIgnoreCase', 'case-insensitive'],
    },
    {
      id: 'cs-str-6',
      title: 'String Format Specifier',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Format a decimal as currency with 2 decimal places using interpolation.',
      skeleton: `decimal price = 42.5m;
string formatted = $"Price: __BLANK__";
Console.WriteLine(formatted); // "Price: 42.50"`,
      solution: `decimal price = 42.5m;
string formatted = $"Price: {price:F2}";
Console.WriteLine(formatted); // "Price: 42.50"`,
      hints: [
        'Inside interpolation braces, add :format after the expression.',
        'F2 means fixed-point with 2 decimal places.',
        'The answer is: {price:F2}',
      ],
      concepts: ['format specifier', 'F2', 'decimal formatting', 'interpolation'],
    },
    {
      id: 'cs-str-7',
      title: 'Reverse a String',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a method ReverseString that reverses a string.',
      skeleton: ``,
      solution: `static string ReverseString(string input)
{
    char[] chars = input.ToCharArray();
    Array.Reverse(chars);
    return new string(chars);
}`,
      hints: [
        'Convert the string to a char array first.',
        'Use Array.Reverse to reverse the array in place.',
        'Create a new string from the reversed char array.',
      ],
      concepts: ['ToCharArray', 'Array.Reverse', 'string from char[]'],
    },
    {
      id: 'cs-str-8',
      title: 'Count Occurrences',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method CountChar that counts how many times a character appears in a string.',
      skeleton: ``,
      solution: `static int CountChar(string text, char target)
{
    int count = 0;
    foreach (char c in text)
    {
        if (c == target) count++;
    }
    return count;
}`,
      hints: [
        'Iterate through each character with foreach.',
        'Compare each character to the target and increment a counter.',
        'Alternatively, text.Count(c => c == target) using LINQ.',
      ],
      concepts: ['foreach', 'character comparison', 'counting', 'iteration'],
    },
    {
      id: 'cs-str-9',
      title: 'StringBuilder Efficiency',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method RepeatString that repeats a string n times using StringBuilder.',
      skeleton: ``,
      solution: `static string RepeatString(string text, int n)
{
    var sb = new StringBuilder(text.Length * n);
    for (int i = 0; i < n; i++)
    {
        sb.Append(text);
    }
    return sb.ToString();
}`,
      hints: [
        'StringBuilder avoids creating intermediate string objects.',
        'Pre-size the StringBuilder with the expected capacity.',
        'Append in a loop, then call ToString().',
      ],
      concepts: ['StringBuilder', 'Append', 'capacity', 'performance'],
    },
    {
      id: 'cs-str-10',
      title: 'Title Case Converter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method ToTitleCase that capitalizes the first letter of each word in a string.',
      skeleton: ``,
      solution: `static string ToTitleCase(string input)
{
    var words = input.Split(' ');
    for (int i = 0; i < words.Length; i++)
    {
        if (words[i].Length > 0)
        {
            words[i] = char.ToUpper(words[i][0]) + words[i].Substring(1).ToLower();
        }
    }
    return string.Join(" ", words);
}`,
      hints: [
        'Split the string into words, capitalize the first letter of each.',
        'Use char.ToUpper for the first character.',
        'Rejoin with string.Join(" ", words).',
      ],
      concepts: ['Split', 'char.ToUpper', 'Substring', 'string.Join'],
    },
    {
      id: 'cs-str-11',
      title: 'Palindrome Checker',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method IsPalindrome that returns true if a string reads the same forwards and backwards (case-insensitive).',
      skeleton: ``,
      solution: `static bool IsPalindrome(string input)
{
    string lower = input.ToLower();
    int left = 0, right = lower.Length - 1;
    while (left < right)
    {
        if (lower[left] != lower[right]) return false;
        left++;
        right--;
    }
    return true;
}`,
      hints: [
        'Convert to lowercase first for case-insensitive comparison.',
        'Use two pointers from the start and end moving inward.',
        'If any pair of characters does not match, return false.',
      ],
      concepts: ['two pointers', 'ToLower', 'palindrome', 'string indexing'],
    },
    {
      id: 'cs-str-12',
      title: 'Span Parsing',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a method ParseFirstInt that uses ReadOnlySpan<char> to parse the first integer from a string like "abc123def" without allocating substrings.',
      skeleton: ``,
      solution: `static int ParseFirstInt(string input)
{
    ReadOnlySpan<char> span = input.AsSpan();
    int start = -1, end = -1;
    for (int i = 0; i < span.Length; i++)
    {
        if (char.IsDigit(span[i]))
        {
            if (start == -1) start = i;
            end = i + 1;
        }
        else if (start != -1) break;
    }
    if (start == -1) return 0;
    return int.Parse(span[start..end]);
}`,
      hints: [
        'AsSpan() creates a ReadOnlySpan<char> without allocation.',
        'Find the first sequence of digits using char.IsDigit.',
        'int.Parse accepts ReadOnlySpan<char> for zero-allocation parsing.',
      ],
      concepts: ['ReadOnlySpan<char>', 'AsSpan', 'zero-allocation', 'int.Parse span'],
    },
    {
      id: 'cs-str-13',
      title: 'String Immutability Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the code. The developer expects ToUpper to modify the string in place.',
      skeleton: `static string Shout(string input)
{
    input.ToUpper(); // does not modify input!
    return input;
}`,
      solution: `static string Shout(string input)
{
    return input.ToUpper();
}`,
      hints: [
        'Strings in C# are immutable -- methods return new strings.',
        'ToUpper() returns a new string; it does not modify the original.',
        'Assign or return the result of ToUpper().',
      ],
      concepts: ['string immutability', 'ToUpper', 'return value'],
    },
    {
      id: 'cs-str-14',
      title: 'Concatenation in Loop Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the performance bug. String concatenation in a loop creates many intermediate strings.',
      skeleton: `static string BuildList(string[] items)
{
    string result = "";
    for (int i = 0; i < items.Length; i++)
    {
        result += items[i] + "\\n"; // O(n^2) allocations
    }
    return result;
}`,
      solution: `static string BuildList(string[] items)
{
    var sb = new StringBuilder();
    for (int i = 0; i < items.Length; i++)
    {
        sb.AppendLine(items[i]);
    }
    return sb.ToString();
}`,
      hints: [
        'String concatenation in a loop is O(n^2) because strings are immutable.',
        'Use StringBuilder for efficient repeated concatenation.',
        'sb.AppendLine adds the text plus a newline.',
      ],
      concepts: ['StringBuilder', 'performance', 'string concatenation', 'O(n^2)'],
    },
    {
      id: 'cs-str-15',
      title: 'Null String Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the NullReferenceException when input is null.',
      skeleton: `static int SafeLength(string? input)
{
    return input.Length; // throws if null
}`,
      solution: `static int SafeLength(string? input)
{
    return input?.Length ?? 0;
}`,
      hints: [
        'input could be null, causing NullReferenceException on .Length.',
        'Use null-conditional ?. to safely access Length.',
        'Use ?? 0 to return 0 when input is null.',
      ],
      concepts: ['null-conditional', 'NullReferenceException', 'null safety'],
    },
    {
      id: 'cs-str-16',
      title: 'Predict String Equality',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `string a = "hello";
string b = "hel" + "lo";
Console.WriteLine(a == b);
Console.WriteLine(ReferenceEquals(a, b));`,
      solution: `True
True`,
      hints: [
        '== on strings compares values in C#.',
        'The compiler interns constant string concatenation at compile time.',
        '"hel" + "lo" is folded to "hello" at compile time, same interned reference.',
      ],
      concepts: ['string equality', 'string interning', 'ReferenceEquals'],
    },
    {
      id: 'cs-str-17',
      title: 'Predict Substring',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `string s = "Hello, World!";
Console.WriteLine(s.Substring(7, 5));
Console.WriteLine(s[^6..^1]);`,
      solution: `World
World`,
      hints: [
        'Substring(7, 5) starts at index 7 and takes 5 characters.',
        '^6 means 6 from the end, ^1 means 1 from the end.',
        'Both extract "World" from the string.',
      ],
      concepts: ['Substring', 'Range', 'Index from end', '^'],
    },
    {
      id: 'cs-str-18',
      title: 'Predict Contains vs IndexOf',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `string text = "C# is great";
Console.WriteLine(text.Contains("great"));
Console.WriteLine(text.IndexOf("is"));
Console.WriteLine(text.IndexOf("bad"));`,
      solution: `True
3
-1`,
      hints: [
        'Contains returns true if the substring is found.',
        'IndexOf returns the zero-based position, or -1 if not found.',
        '"is" starts at index 3 in "C# is great".',
      ],
      concepts: ['Contains', 'IndexOf', 'string searching'],
    },
    {
      id: 'cs-str-19',
      title: 'Refactor Format to Interpolation',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Refactor string.Format calls to string interpolation.',
      skeleton: `string name = "Alice";
int age = 30;
string msg1 = string.Format("Name: {0}, Age: {1}", name, age);
string msg2 = string.Format("In 10 years: {0}", age + 10);`,
      solution: `string name = "Alice";
int age = 30;
string msg1 = $"Name: {name}, Age: {age}";
string msg2 = $"In 10 years: {age + 10}";`,
      hints: [
        'String interpolation with $ replaces {0}, {1} placeholders.',
        'Embed the actual variable names in the braces.',
        'Expressions like age + 10 work directly inside braces.',
      ],
      concepts: ['string interpolation', 'string.Format', 'refactoring'],
    },
    {
      id: 'cs-str-20',
      title: 'CSV Parser',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a method ParseCsvRow that splits a CSV row handling quoted fields. E.g., \'a,"b,c",d\' should return ["a", "b,c", "d"].',
      skeleton: ``,
      solution: `static List<string> ParseCsvRow(string row)
{
    var fields = new List<string>();
    var current = new StringBuilder();
    bool inQuotes = false;
    for (int i = 0; i < row.Length; i++)
    {
        char c = row[i];
        if (c == '"')
        {
            inQuotes = !inQuotes;
        }
        else if (c == ',' && !inQuotes)
        {
            fields.Add(current.ToString());
            current.Clear();
        }
        else
        {
            current.Append(c);
        }
    }
    fields.Add(current.ToString());
    return fields;
}`,
      hints: [
        'Track whether you are inside quoted text with a boolean flag.',
        'Only split on commas when not inside quotes.',
        'Toggle the inQuotes flag when encountering a double-quote character.',
      ],
      concepts: ['CSV parsing', 'state machine', 'StringBuilder', 'quoting'],
    },
  ],
};
