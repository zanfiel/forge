import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-linq-adv',
  title: '17. LINQ Advanced',
  explanation: `## Advanced LINQ

Beyond basic filtering and projection, LINQ offers powerful operators for joining, flattening, aggregating, and composing complex queries.

\`\`\`csharp
// Join -- SQL-like inner join
var joined = orders.Join(customers,
    o => o.CustomerId, c => c.Id,
    (o, c) => new { c.Name, o.Total });

// SelectMany -- flatten nested collections
var allTags = posts.SelectMany(p => p.Tags);

// GroupJoin -- left outer join
var grouped = customers.GroupJoin(orders,
    c => c.Id, o => o.CustomerId,
    (c, ords) => new { c.Name, Orders = ords });

// Aggregate with seed
var csv = names.Aggregate("", (acc, n) => acc + (acc == "" ? "" : ",") + n);

// Zip -- combine two sequences element-wise
var pairs = names.Zip(scores, (n, s) => $"{n}: {s}");
\`\`\`

These operators compose freely, enabling complex data transformations in a single expression.`,
  exercises: [
    {
      id: 'cs-linqa-1',
      title: 'SelectMany',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Flatten a collection of string arrays into a single sequence.',
      skeleton: `string[][] nested = { new[]{"a","b"}, new[]{"c","d"} };
var flat = nested.__BLANK__(arr => arr);`,
      solution: `string[][] nested = { new[]{"a","b"}, new[]{"c","d"} };
var flat = nested.SelectMany(arr => arr);`,
      hints: ['SelectMany flattens one level of nesting.', 'The lambda returns the inner collection to flatten.', 'The answer is: SelectMany'],
      concepts: ['SelectMany', 'flattening', 'nested collections'],
    },
    {
      id: 'cs-linqa-2',
      title: 'Join Syntax',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Complete an inner join between orders and customers.',
      skeleton: `var result = orders.__BLANK__(customers,
    o => o.CustomerId,
    c => c.Id,
    (o, c) => new { c.Name, o.Total });`,
      solution: `var result = orders.Join(customers,
    o => o.CustomerId,
    c => c.Id,
    (o, c) => new { c.Name, o.Total });`,
      hints: ['Join performs an inner join on two sequences.', 'It takes outer key, inner key, and result selectors.', 'The answer is: Join'],
      concepts: ['Join', 'inner join', 'key selectors'],
    },
    {
      id: 'cs-linqa-3',
      title: 'Zip Two Sequences',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Combine two sequences element-wise.',
      skeleton: `string[] names = { "Alice", "Bob" };
int[] scores = { 90, 85 };
var pairs = names.__BLANK__(scores, (n, s) => $"{n}: {s}");`,
      solution: `string[] names = { "Alice", "Bob" };
int[] scores = { 90, 85 };
var pairs = names.Zip(scores, (n, s) => $"{n}: {s}");`,
      hints: ['Zip pairs elements from two sequences.', 'It stops at the shorter sequence length.', 'The answer is: Zip'],
      concepts: ['Zip', 'element-wise combination'],
    },
    {
      id: 'cs-linqa-4',
      title: 'Aggregate with Seed',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Use Aggregate with a seed to build a comma-separated string.',
      skeleton: `string[] words = { "hello", "world" };
string csv = words.__BLANK__("", (acc, w) => acc == "" ? w : acc + "," + w);`,
      solution: `string[] words = { "hello", "world" };
string csv = words.Aggregate("", (acc, w) => acc == "" ? w : acc + "," + w);`,
      hints: ['Aggregate with a seed takes an initial value.', 'The accumulator function combines the running result with each element.', 'The answer is: Aggregate'],
      concepts: ['Aggregate', 'seed value', 'accumulator'],
    },
    {
      id: 'cs-linqa-5',
      title: 'Chunk',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Split a sequence into chunks of a given size.',
      skeleton: `int[] nums = { 1, 2, 3, 4, 5, 6, 7 };
var chunks = nums.__BLANK__(3);
// [[1,2,3], [4,5,6], [7]]`,
      solution: `int[] nums = { 1, 2, 3, 4, 5, 6, 7 };
var chunks = nums.Chunk(3);
// [[1,2,3], [4,5,6], [7]]`,
      hints: ['Chunk was introduced in .NET 6.', 'It splits a sequence into arrays of the given size.', 'The answer is: Chunk'],
      concepts: ['Chunk', 'batching', '.NET 6'],
    },
    {
      id: 'cs-linqa-6',
      title: 'DistinctBy',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Get distinct elements by a key selector.',
      skeleton: `var people = new[] {
    new { Name = "Alice", Dept = "Eng" },
    new { Name = "Bob", Dept = "Eng" },
    new { Name = "Charlie", Dept = "Sales" }
};
var uniqueDepts = people.__BLANK__(p => p.Dept);`,
      solution: `var people = new[] {
    new { Name = "Alice", Dept = "Eng" },
    new { Name = "Bob", Dept = "Eng" },
    new { Name = "Charlie", Dept = "Sales" }
};
var uniqueDepts = people.DistinctBy(p => p.Dept);`,
      hints: ['DistinctBy was introduced in .NET 6.', 'It keeps the first element for each unique key.', 'The answer is: DistinctBy'],
      concepts: ['DistinctBy', '.NET 6', 'key selector'],
    },
    {
      id: 'cs-linqa-7',
      title: 'GroupJoin',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a left outer join using GroupJoin and SelectMany.',
      skeleton: `// Given: record Customer(int Id, string Name)
//        record Order(int CustomerId, decimal Total)
// Write: IEnumerable<(string Name, decimal Total)> LeftJoin(
//   Customer[] customers, Order[] orders)
// Customers with no orders should appear with Total = 0`,
      solution: `IEnumerable<(string Name, decimal Total)> LeftJoin(
    Customer[] customers, Order[] orders)
{
    return customers.GroupJoin(orders,
        c => c.Id, o => o.CustomerId,
        (c, ords) => new { c.Name, Orders = ords })
        .SelectMany(
            x => x.Orders.DefaultIfEmpty(),
            (x, o) => (x.Name, o?.Total ?? 0m));
}`,
      hints: ['GroupJoin groups matching orders per customer.', 'DefaultIfEmpty ensures customers with no orders still appear.', 'SelectMany flattens the grouped results.'],
      concepts: ['GroupJoin', 'left outer join', 'DefaultIfEmpty'],
    },
    {
      id: 'cs-linqa-8',
      title: 'Custom LINQ Extension',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a custom LINQ extension method that returns every Nth element.',
      skeleton: `// Write static IEnumerable<T> EveryNth<T>(this IEnumerable<T> source, int n)`,
      solution: `static IEnumerable<T> EveryNth<T>(this IEnumerable<T> source, int n)
{
    int index = 0;
    foreach (var item in source)
    {
        if (index % n == 0)
            yield return item;
        index++;
    }
}`,
      hints: ['Extension methods use this on the first parameter.', 'yield return produces elements lazily.', 'Check index % n == 0 to pick every Nth item.'],
      concepts: ['extension method', 'yield return', 'custom LINQ'],
    },
    {
      id: 'cs-linqa-9',
      title: 'Lookup Table',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Create an ILookup that groups items by category.',
      skeleton: `// Given: record Product(string Name, string Category, decimal Price)
// Write: ILookup<string, string> ProductsByCategory(Product[] products)
// Key = Category, Values = Names`,
      solution: `ILookup<string, string> ProductsByCategory(Product[] products)
    => products.ToLookup(p => p.Category, p => p.Name);`,
      hints: ['ToLookup creates an immutable one-to-many mapping.', 'First lambda selects the key, second selects the value.', 'Unlike GroupBy, ToLookup is evaluated immediately.'],
      concepts: ['ToLookup', 'ILookup', 'one-to-many'],
    },
    {
      id: 'cs-linqa-10',
      title: 'SelectMany with Index',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Flatten and number items from nested collections.',
      skeleton: `// Given string[][] groups, return IEnumerable<string>
// where each item is prefixed with its global index:
// "0: item", "1: item", ...`,
      solution: `IEnumerable<string> FlattenNumbered(string[][] groups)
    => groups.SelectMany(g => g)
             .Select((item, idx) => $"{idx}: {item}");`,
      hints: ['SelectMany flattens the nested arrays.', 'Select has an overload with an index parameter.', 'Chain SelectMany then Select with index.'],
      concepts: ['SelectMany', 'Select with index', 'flattening'],
    },
    {
      id: 'cs-linqa-11',
      title: 'Window/Pairwise',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a method that returns consecutive pairs from a sequence.',
      skeleton: `// Write IEnumerable<(T, T)> Pairwise<T>(IEnumerable<T> source)
// [1,2,3,4] => [(1,2), (2,3), (3,4)]`,
      solution: `IEnumerable<(T, T)> Pairwise<T>(IEnumerable<T> source)
    => source.Zip(source.Skip(1), (a, b) => (a, b));`,
      hints: ['Zip the sequence with itself shifted by one.', 'source.Skip(1) starts from the second element.', 'Zip stops at the shorter sequence.'],
      concepts: ['Zip', 'Skip', 'sliding window'],
    },
    {
      id: 'cs-linqa-12',
      title: 'Aggregate Running Total',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method that computes a running total (scan/prefix sum).',
      skeleton: `// Write IEnumerable<int> RunningTotal(IEnumerable<int> numbers)
// [1, 2, 3, 4] => [1, 3, 6, 10]`,
      solution: `IEnumerable<int> RunningTotal(IEnumerable<int> numbers)
{
    int sum = 0;
    foreach (var n in numbers)
    {
        sum += n;
        yield return sum;
    }
}`,
      hints: ['Maintain a running sum as you iterate.', 'yield return produces each partial sum.', 'This is sometimes called a scan or prefix sum.'],
      concepts: ['running total', 'yield return', 'scan'],
    },
    {
      id: 'cs-linqa-13',
      title: 'Bug: Multiple Enumeration',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the performance bug caused by enumerating an expensive query multiple times.',
      skeleton: `IEnumerable<int> GetExpensiveData()
{
    // Simulates expensive database call
    Console.WriteLine("Querying...");
    return Enumerable.Range(1, 1000);
}

var data = GetExpensiveData().Where(n => n % 2 == 0);
Console.WriteLine(data.Count());    // Querying...
Console.WriteLine(data.Sum());      // Querying... again!
Console.WriteLine(data.First());    // Querying... third time!`,
      solution: `IEnumerable<int> GetExpensiveData()
{
    Console.WriteLine("Querying...");
    return Enumerable.Range(1, 1000);
}

var data = GetExpensiveData().Where(n => n % 2 == 0).ToList();  // materialize once
Console.WriteLine(data.Count);     // no re-query
Console.WriteLine(data.Sum());     // no re-query
Console.WriteLine(data.First());   // no re-query`,
      hints: ['Each enumeration of a lazy query re-executes the source.', 'Materialize with ToList() to cache the results.', 'Use .Count property (not method) on the materialized list.'],
      concepts: ['multiple enumeration', 'materialization', 'performance'],
    },
    {
      id: 'cs-linqa-14',
      title: 'Bug: Captured Variable in Closure',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix the closure bug where all lambdas capture the same variable.',
      skeleton: `var funcs = new List<Func<int>>();
for (int i = 0; i < 5; i++)
{
    funcs.Add(() => i);
}
// All print 5 instead of 0,1,2,3,4
foreach (var f in funcs) Console.Write(f() + " ");`,
      solution: `var funcs = new List<Func<int>>();
for (int i = 0; i < 5; i++)
{
    int captured = i;  // capture a copy
    funcs.Add(() => captured);
}
// Now prints 0 1 2 3 4
foreach (var f in funcs) Console.Write(f() + " ");`,
      hints: ['Closures capture the variable, not the value.', 'All lambdas share the same i, which ends at 5.', 'Create a local copy inside the loop to capture the current value.'],
      concepts: ['closure', 'captured variable', 'loop variable capture'],
    },
    {
      id: 'cs-linqa-15',
      title: 'Bug: OrderBy Stability',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the secondary sort that replaces instead of extending the primary sort.',
      skeleton: `var people = new[]
{
    new { Name = "Charlie", Age = 30 },
    new { Name = "Alice", Age = 30 },
    new { Name = "Bob", Age = 25 }
};
// Bug: second OrderBy replaces the first
var sorted = people.OrderBy(p => p.Age).OrderBy(p => p.Name);`,
      solution: `var people = new[]
{
    new { Name = "Charlie", Age = 30 },
    new { Name = "Alice", Age = 30 },
    new { Name = "Bob", Age = 25 }
};
// Fix: use ThenBy for secondary sort
var sorted = people.OrderBy(p => p.Age).ThenBy(p => p.Name);`,
      hints: ['A second OrderBy replaces the first sort entirely.', 'ThenBy adds a secondary sort while preserving the primary.', 'OrderBy then ThenBy: sort by Age, break ties by Name.'],
      concepts: ['ThenBy', 'secondary sort', 'OrderBy vs ThenBy'],
    },
    {
      id: 'cs-linqa-16',
      title: 'Predict SelectMany Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the output of SelectMany.',
      skeleton: `var data = new[] { new[]{1,2}, new[]{3}, new[]{4,5,6} };
var flat = data.SelectMany(x => x);
Console.WriteLine(string.Join(", ", flat));`,
      solution: `1, 2, 3, 4, 5, 6`,
      hints: ['SelectMany flattens nested arrays.', 'Each inner array is unwrapped into the outer sequence.', 'Result is all elements in order.'],
      concepts: ['SelectMany', 'flattening'],
    },
    {
      id: 'cs-linqa-17',
      title: 'Predict Zip Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the output of Zip.',
      skeleton: `var a = new[] { 1, 2, 3, 4 };
var b = new[] { "x", "y", "z" };
var zipped = a.Zip(b, (n, s) => $"{n}{s}");
Console.WriteLine(string.Join(", ", zipped));`,
      solution: `1x, 2y, 3z`,
      hints: ['Zip pairs elements from two sequences.', 'It stops at the shorter sequence (3 elements).', 'Result: "1x", "2y", "3z".'],
      concepts: ['Zip', 'truncation', 'element pairing'],
    },
    {
      id: 'cs-linqa-18',
      title: 'Predict GroupBy Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the output of a GroupBy query.',
      skeleton: `int[] nums = { 1, 2, 3, 4, 5, 6 };
var groups = nums.GroupBy(n => n % 3);
foreach (var g in groups)
    Console.WriteLine($"{g.Key}: {string.Join(",", g)}");`,
      solution: `1: 1,4
2: 2,5
0: 3,6`,
      hints: ['GroupBy groups by n % 3: remainders 0, 1, 2.', 'Groups appear in the order their keys are first seen.', '1%3=1, 2%3=2, 3%3=0, 4%3=1, 5%3=2, 6%3=0.'],
      concepts: ['GroupBy', 'grouping key', 'iteration order'],
    },
    {
      id: 'cs-linqa-19',
      title: 'Refactor Imperative Grouping',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Replace manual grouping with LINQ GroupBy.',
      skeleton: `var groups = new Dictionary<char, List<string>>();
foreach (var word in words)
{
    char key = word[0];
    if (!groups.ContainsKey(key))
        groups[key] = new List<string>();
    groups[key].Add(word);
}`,
      solution: `var groups = words.GroupBy(w => w[0])
                  .ToDictionary(g => g.Key, g => g.ToList());`,
      hints: ['GroupBy groups by the first character.', 'ToDictionary converts groups to a Dictionary.', 'The key is g.Key, value is g.ToList().'],
      concepts: ['GroupBy', 'ToDictionary', 'declarative grouping'],
    },
    {
      id: 'cs-linqa-20',
      title: 'Refactor Join with Lookup',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Replace manual nested loop join with LINQ Join.',
      skeleton: `var result = new List<string>();
foreach (var order in orders)
{
    foreach (var customer in customers)
    {
        if (order.CustomerId == customer.Id)
        {
            result.Add($"{customer.Name}: {order.Total:C}");
            break;
        }
    }
}`,
      solution: `var result = orders.Join(customers,
    o => o.CustomerId,
    c => c.Id,
    (o, c) => $"{c.Name}: {o.Total:C}")
    .ToList();`,
      hints: ['Join replaces nested loop lookups.', 'First two lambdas select the matching keys.', 'Last lambda produces the result for each match.'],
      concepts: ['Join', 'replacing nested loops', 'key matching'],
    },
  ],
};
