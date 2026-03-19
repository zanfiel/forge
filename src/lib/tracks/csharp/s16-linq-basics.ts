import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-linq-basics',
  title: '16. LINQ Basics',
  explanation: `## LINQ Basics

Language Integrated Query (LINQ) provides a declarative syntax for querying collections, databases, XML, and more.

\`\`\`csharp
int[] numbers = { 5, 3, 8, 1, 9, 2 };

// Method syntax (fluent)
var evens = numbers.Where(n => n % 2 == 0).OrderBy(n => n);

// Query syntax
var query = from n in numbers
            where n % 2 == 0
            orderby n
            select n;

// Common operators
var first = numbers.First();           // 5
var any   = numbers.Any(n => n > 7);   // true
var sum   = numbers.Sum();             // 28
var grouped = numbers.GroupBy(n => n % 2 == 0 ? "even" : "odd");
\`\`\`

LINQ is **lazy** -- queries are not executed until you enumerate (foreach, ToList, ToArray). This allows chaining without intermediate allocations.`,
  exercises: [
    {
      id: 'cs-linq-1',
      title: 'Where Filter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Filter a collection to only include positive numbers.',
      skeleton: `int[] nums = { -2, 5, -1, 8, 0, 3 };
var positives = nums.__BLANK__(n => n > 0);`,
      solution: `int[] nums = { -2, 5, -1, 8, 0, 3 };
var positives = nums.Where(n => n > 0);`,
      hints: ['Where filters elements by a predicate.', 'The lambda receives each element and returns bool.', 'The answer is: Where'],
      concepts: ['Where', 'filtering', 'lambda predicate'],
    },
    {
      id: 'cs-linq-2',
      title: 'Select Projection',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Project each string to its length.',
      skeleton: `string[] words = { "hello", "world", "hi" };
var lengths = words.__BLANK__(w => w.Length);`,
      solution: `string[] words = { "hello", "world", "hi" };
var lengths = words.Select(w => w.Length);`,
      hints: ['Select transforms each element.', 'It is the LINQ equivalent of map in other languages.', 'The answer is: Select'],
      concepts: ['Select', 'projection', 'transformation'],
    },
    {
      id: 'cs-linq-3',
      title: 'OrderBy',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Sort names alphabetically.',
      skeleton: `string[] names = { "Charlie", "Alice", "Bob" };
var sorted = names.__BLANK__(n => n);`,
      solution: `string[] names = { "Charlie", "Alice", "Bob" };
var sorted = names.OrderBy(n => n);`,
      hints: ['OrderBy sorts in ascending order by the key selector.', 'For descending use OrderByDescending.', 'The answer is: OrderBy'],
      concepts: ['OrderBy', 'sorting', 'key selector'],
    },
    {
      id: 'cs-linq-4',
      title: 'First and FirstOrDefault',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Get the first even number, or a default if none exists.',
      skeleton: `int[] nums = { 1, 3, 5 };
int result = nums.__BLANK__(n => n % 2 == 0);  // returns 0`,
      solution: `int[] nums = { 1, 3, 5 };
int result = nums.FirstOrDefault(n => n % 2 == 0);  // returns 0`,
      hints: ['First throws if no match; FirstOrDefault returns default.', 'default(int) is 0.', 'The answer is: FirstOrDefault'],
      concepts: ['FirstOrDefault', 'safe querying', 'default value'],
    },
    {
      id: 'cs-linq-5',
      title: 'Any and All',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Check if all numbers are positive.',
      skeleton: `int[] nums = { 1, 2, 3, 4, 5 };
bool allPositive = nums.__BLANK__(n => n > 0);`,
      solution: `int[] nums = { 1, 2, 3, 4, 5 };
bool allPositive = nums.All(n => n > 0);`,
      hints: ['All returns true if every element matches the predicate.', 'Any returns true if at least one matches.', 'The answer is: All'],
      concepts: ['All', 'Any', 'quantifier operators'],
    },
    {
      id: 'cs-linq-6',
      title: 'GroupBy',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Group words by their first letter.',
      skeleton: `string[] words = { "apple", "avocado", "banana", "blueberry" };
var groups = words.__BLANK__(w => w[0]);`,
      solution: `string[] words = { "apple", "avocado", "banana", "blueberry" };
var groups = words.GroupBy(w => w[0]);`,
      hints: ['GroupBy creates groups based on a key selector.', 'Each group has a Key and contains matching elements.', 'The answer is: GroupBy'],
      concepts: ['GroupBy', 'grouping', 'key selector'],
    },
    {
      id: 'cs-linq-7',
      title: 'Sum, Average, Min, Max',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a method that returns a summary tuple of a number collection.',
      skeleton: `// Write (int Sum, double Avg, int Min, int Max) Summarize(IEnumerable<int> numbers)`,
      solution: `(int Sum, double Avg, int Min, int Max) Summarize(IEnumerable<int> numbers)
{
    return (numbers.Sum(), numbers.Average(), numbers.Min(), numbers.Max());
}`,
      hints: ['LINQ provides Sum(), Average(), Min(), Max().', 'Return a named tuple with all four values.', 'Average returns double even for int sequences.'],
      concepts: ['aggregate operators', 'Sum', 'Average', 'Min', 'Max'],
    },
    {
      id: 'cs-linq-8',
      title: 'Distinct and Count',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a method that counts distinct elements in a sequence.',
      skeleton: `// Write int CountDistinct<T>(IEnumerable<T> items)`,
      solution: `int CountDistinct<T>(IEnumerable<T> items)
    => items.Distinct().Count();`,
      hints: ['Distinct removes duplicates.', 'Count returns the number of elements.', 'Chain them: Distinct().Count().'],
      concepts: ['Distinct', 'Count', 'chaining'],
    },
    {
      id: 'cs-linq-9',
      title: 'Query Syntax',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Rewrite a method syntax query using LINQ query syntax.',
      skeleton: `// Rewrite using query syntax (from ... where ... select):
// numbers.Where(n => n > 10).Select(n => n * 2).OrderBy(n => n)`,
      solution: `IEnumerable<int> Query(int[] numbers)
{
    return from n in numbers
           where n > 10
           orderby n
           select n * 2;
}`,
      hints: ['Query syntax starts with from x in source.', 'where replaces .Where(), orderby replaces .OrderBy().', 'select replaces .Select() and must be last.'],
      concepts: ['query syntax', 'from', 'where', 'select'],
    },
    {
      id: 'cs-linq-10',
      title: 'Take and Skip',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a pagination method using Skip and Take.',
      skeleton: `// Write IEnumerable<T> GetPage<T>(IEnumerable<T> source, int page, int pageSize)
// page is 0-based`,
      solution: `IEnumerable<T> GetPage<T>(IEnumerable<T> source, int page, int pageSize)
    => source.Skip(page * pageSize).Take(pageSize);`,
      hints: ['Skip bypasses a number of elements.', 'Take returns a specified number of elements.', 'For page N, skip N * pageSize elements.'],
      concepts: ['Skip', 'Take', 'pagination'],
    },
    {
      id: 'cs-linq-11',
      title: 'Chained Query',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method that finds the top 3 longest unique words.',
      skeleton: `// Write string[] TopLongestWords(string[] words, int n)
// Distinct, ordered by length descending, take n`,
      solution: `string[] TopLongestWords(string[] words, int n)
    => words.Distinct()
            .OrderByDescending(w => w.Length)
            .Take(n)
            .ToArray();`,
      hints: ['Chain Distinct, OrderByDescending, Take, ToArray.', 'OrderByDescending sorts from longest to shortest.', 'ToArray materializes the lazy query.'],
      concepts: ['chaining', 'OrderByDescending', 'ToArray'],
    },
    {
      id: 'cs-linq-12',
      title: 'ToDictionary',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Convert a list of objects to a dictionary keyed by a property.',
      skeleton: `// Given record Person(string Name, int Age)
// Write Dictionary<string, int> ToDictByName(Person[] people)`,
      solution: `Dictionary<string, int> ToDictByName(Person[] people)
    => people.ToDictionary(p => p.Name, p => p.Age);`,
      hints: ['ToDictionary takes a key selector and a value selector.', 'First lambda selects the key, second selects the value.', 'Throws on duplicate keys.'],
      concepts: ['ToDictionary', 'key selector', 'value selector'],
    },
    {
      id: 'cs-linq-13',
      title: 'Bug: Deferred Execution Trap',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the bug caused by deferred execution.',
      skeleton: `var list = new List<int> { 1, 2, 3 };
var query = list.Where(n => n > 1);
list.Add(4);
// Developer expects [2, 3] but gets [2, 3, 4]
Console.WriteLine(string.Join(", ", query));`,
      solution: `var list = new List<int> { 1, 2, 3 };
var query = list.Where(n => n > 1).ToList();  // materialize immediately
list.Add(4);
// Now correctly [2, 3]
Console.WriteLine(string.Join(", ", query));`,
      hints: ['LINQ queries are lazy -- they execute when enumerated.', 'Adding to the list before enumeration changes the result.', 'Use ToList() or ToArray() to materialize the query immediately.'],
      concepts: ['deferred execution', 'materialization', 'ToList'],
    },
    {
      id: 'cs-linq-14',
      title: 'Bug: Single on Multiple Results',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the InvalidOperationException from Single.',
      skeleton: `int[] nums = { 1, 2, 2, 3 };
int result = nums.Single(n => n > 1);  // throws: more than one match`,
      solution: `int[] nums = { 1, 2, 2, 3 };
int result = nums.First(n => n > 1);  // returns 2`,
      hints: ['Single throws if there is not exactly one match.', 'Use First when you want the first match regardless of count.', 'First returns 2 (the first element > 1).'],
      concepts: ['Single vs First', 'InvalidOperationException'],
    },
    {
      id: 'cs-linq-15',
      title: 'Bug: OrderBy After Select',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the query that sorts by the wrong thing after projection.',
      skeleton: `// Intent: get names sorted by name length
string[] names = { "Alice", "Bob", "Charlie" };
var result = names.Select(n => n.Length).OrderBy(n => n);
// Bug: returns sorted lengths [3, 5, 7], not sorted names`,
      solution: `string[] names = { "Alice", "Bob", "Charlie" };
var result = names.OrderBy(n => n.Length).Select(n => n);
// Returns: ["Bob", "Alice", "Charlie"]`,
      hints: ['Order of operations matters in LINQ chains.', 'OrderBy should come before Select when you need the original elements.', 'Sort first, then project.'],
      concepts: ['LINQ ordering', 'operator sequence', 'projection'],
    },
    {
      id: 'cs-linq-16',
      title: 'Predict Where Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the filtered output.',
      skeleton: `int[] nums = { 1, 2, 3, 4, 5, 6 };
var result = nums.Where(n => n % 2 == 0);
Console.WriteLine(string.Join(", ", result));`,
      solution: `2, 4, 6`,
      hints: ['Where keeps elements where the predicate returns true.', 'n % 2 == 0 selects even numbers.', 'Even numbers in the array: 2, 4, 6.'],
      concepts: ['Where', 'even number filter'],
    },
    {
      id: 'cs-linq-17',
      title: 'Predict Aggregate Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the result of Aggregate.',
      skeleton: `int[] nums = { 1, 2, 3, 4 };
int result = nums.Aggregate((a, b) => a * b);
Console.WriteLine(result);`,
      solution: `24`,
      hints: ['Aggregate folds left: ((1*2)*3)*4.', '1*2=2, 2*3=6, 6*4=24.', 'The result is the product of all elements.'],
      concepts: ['Aggregate', 'fold', 'accumulator'],
    },
    {
      id: 'cs-linq-18',
      title: 'Predict Chained Query',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the output of a chained LINQ query.',
      skeleton: `string[] words = { "cat", "elephant", "dog", "ant", "bear" };
var result = words.Where(w => w.Length <= 3)
                  .OrderBy(w => w)
                  .Select(w => w.ToUpper());
Console.WriteLine(string.Join(", ", result));`,
      solution: `ANT, CAT, DOG`,
      hints: ['Length <= 3: "cat", "dog", "ant".', 'OrderBy alphabetically: "ant", "cat", "dog".', 'ToUpper: "ANT", "CAT", "DOG".'],
      concepts: ['chained LINQ', 'Where', 'OrderBy', 'Select'],
    },
    {
      id: 'cs-linq-19',
      title: 'Refactor Loop to LINQ',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Replace the imperative loop with a LINQ expression.',
      skeleton: `var result = new List<string>();
foreach (var name in names)
{
    if (name.Length > 3)
    {
        result.Add(name.ToUpper());
    }
}
result.Sort();`,
      solution: `var result = names.Where(n => n.Length > 3)
                  .Select(n => n.ToUpper())
                  .OrderBy(n => n)
                  .ToList();`,
      hints: ['Where replaces the if condition.', 'Select replaces the transformation.', 'OrderBy replaces Sort.'],
      concepts: ['imperative to declarative', 'LINQ refactoring'],
    },
    {
      id: 'cs-linq-20',
      title: 'Refactor Nested Loops to LINQ',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Replace nested loops with a LINQ expression.',
      skeleton: `var pairs = new List<(int, int)>();
for (int i = 0; i < nums1.Length; i++)
{
    for (int j = 0; j < nums2.Length; j++)
    {
        if (nums1[i] + nums2[j] == target)
        {
            pairs.Add((nums1[i], nums2[j]));
        }
    }
}`,
      solution: `var pairs = (from a in nums1
             from b in nums2
             where a + b == target
             select (a, b)).ToList();`,
      hints: ['Double from clauses create a cross-join.', 'where filters the combinations.', 'select produces the result tuples.'],
      concepts: ['cross-join', 'nested from', 'query syntax'],
    },
  ],
};
