import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-collections',
  title: '15. Collections',
  explanation: `## Collections

.NET provides generic collections in \`System.Collections.Generic\` and immutable variants in \`System.Collections.Immutable\`.

\`\`\`csharp
// List<T> -- dynamic array
var names = new List<string> { "Alice", "Bob" };
names.Add("Charlie");

// Dictionary<TKey, TValue>
var ages = new Dictionary<string, int>
{
    ["Alice"] = 30,
    ["Bob"] = 25
};

// HashSet<T> -- unique elements
var unique = new HashSet<int> { 1, 2, 3 };
unique.Add(2); // no effect

// Queue<T> and Stack<T>
var queue = new Queue<int>();
queue.Enqueue(1);
int first = queue.Dequeue();

// ImmutableList (System.Collections.Immutable)
var immutable = ImmutableList.Create(1, 2, 3);
var updated = immutable.Add(4); // returns new list
\`\`\`

Choose **List<T>** for indexed access, **Dictionary** for key-value lookups, **HashSet** for uniqueness, **Queue/Stack** for FIFO/LIFO, and **Immutable** variants when thread safety or snapshot semantics matter.`,
  exercises: [
    {
      id: 'cs-coll-1',
      title: 'Create a List',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Initialize a List<int> with collection initializer syntax.',
      skeleton: `var numbers = new __BLANK__ { 1, 2, 3, 4, 5 };`,
      solution: `var numbers = new List<int> { 1, 2, 3, 4, 5 };`,
      hints: ['Use the generic List type with int.', 'The syntax is List<int>.', 'The answer is: List<int>'],
      concepts: ['List<T>', 'collection initializer'],
    },
    {
      id: 'cs-coll-2',
      title: 'Dictionary Indexer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Access a dictionary value by key.',
      skeleton: `var dict = new Dictionary<string, int> { ["apples"] = 5 };
int count = dict__BLANK__;`,
      solution: `var dict = new Dictionary<string, int> { ["apples"] = 5 };
int count = dict["apples"];`,
      hints: ['Use square bracket indexer with the key.', 'The key is a string "apples".', 'The answer is: ["apples"]'],
      concepts: ['Dictionary<TKey,TValue>', 'indexer'],
    },
    {
      id: 'cs-coll-3',
      title: 'HashSet Add',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Add an element to a HashSet.',
      skeleton: `var set = new HashSet<string>();
bool added = set.__BLANK__("hello");`,
      solution: `var set = new HashSet<string>();
bool added = set.Add("hello");`,
      hints: ['HashSet uses Add which returns a bool.', 'Returns true if the element was new.', 'The answer is: Add'],
      concepts: ['HashSet<T>', 'Add method'],
    },
    {
      id: 'cs-coll-4',
      title: 'TryGetValue Pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Safely look up a dictionary value.',
      skeleton: `var scores = new Dictionary<string, int> { ["Alice"] = 95 };
if (scores.__BLANK__("Alice", out int score))
{
    Console.WriteLine(score);
}`,
      solution: `var scores = new Dictionary<string, int> { ["Alice"] = 95 };
if (scores.TryGetValue("Alice", out int score))
{
    Console.WriteLine(score);
}`,
      hints: ['TryGetValue avoids KeyNotFoundException.', 'It returns bool and outputs the value via out.', 'The answer is: TryGetValue'],
      concepts: ['TryGetValue', 'out parameter', 'safe lookup'],
    },
    {
      id: 'cs-coll-5',
      title: 'Queue Enqueue and Dequeue',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Use Queue for FIFO operations.',
      skeleton: `var queue = new Queue<string>();
queue.Enqueue("first");
queue.Enqueue("second");
string item = queue.__BLANK__;`,
      solution: `var queue = new Queue<string>();
queue.Enqueue("first");
queue.Enqueue("second");
string item = queue.Dequeue();`,
      hints: ['Dequeue removes and returns the front element.', 'Queue is FIFO: first in, first out.', 'The answer is: Dequeue()'],
      concepts: ['Queue<T>', 'FIFO', 'Dequeue'],
    },
    {
      id: 'cs-coll-6',
      title: 'Stack Peek',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Look at the top element without removing it.',
      skeleton: `var stack = new Stack<int>();
stack.Push(10);
stack.Push(20);
int top = stack.__BLANK__;  // 20, not removed`,
      solution: `var stack = new Stack<int>();
stack.Push(10);
stack.Push(20);
int top = stack.Peek();  // 20, not removed`,
      hints: ['Peek returns the top element without removing it.', 'Pop would remove it; Peek just looks.', 'The answer is: Peek()'],
      concepts: ['Stack<T>', 'Peek', 'LIFO'],
    },
    {
      id: 'cs-coll-7',
      title: 'Build a Frequency Counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method that counts the frequency of each element in a list.',
      skeleton: `// Write Dictionary<T, int> Frequency<T>(IEnumerable<T> items) where T : notnull`,
      solution: `Dictionary<T, int> Frequency<T>(IEnumerable<T> items) where T : notnull
{
    var freq = new Dictionary<T, int>();
    foreach (var item in items)
    {
        if (freq.ContainsKey(item))
            freq[item]++;
        else
            freq[item] = 1;
    }
    return freq;
}`,
      hints: ['Use a Dictionary<T, int> to store counts.', 'Check ContainsKey or use TryGetValue before incrementing.', 'Initialize missing keys to 1.'],
      concepts: ['Dictionary', 'frequency counting', 'generic method'],
    },
    {
      id: 'cs-coll-8',
      title: 'LRU Cache with LinkedList',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a simple LRU cache using Dictionary and LinkedList.',
      skeleton: `// Write class LruCache<TKey, TValue> with:
// - Constructor taking int capacity
// - TValue Get(TKey key) -- throws if missing, moves to front
// - void Put(TKey key, TValue value) -- evicts oldest if at capacity`,
      solution: `class LruCache<TKey, TValue> where TKey : notnull
{
    private readonly int _capacity;
    private readonly Dictionary<TKey, LinkedListNode<(TKey Key, TValue Value)>> _map = new();
    private readonly LinkedList<(TKey Key, TValue Value)> _list = new();

    public LruCache(int capacity) => _capacity = capacity;

    public TValue Get(TKey key)
    {
        if (!_map.TryGetValue(key, out var node))
            throw new KeyNotFoundException();
        _list.Remove(node);
        _list.AddFirst(node);
        return node.Value.Value;
    }

    public void Put(TKey key, TValue value)
    {
        if (_map.TryGetValue(key, out var existing))
        {
            _list.Remove(existing);
            _map.Remove(key);
        }
        else if (_map.Count >= _capacity)
        {
            var last = _list.Last!;
            _map.Remove(last.Value.Key);
            _list.RemoveLast();
        }
        var node = _list.AddFirst((key, value));
        _map[key] = node;
    }
}`,
      hints: ['Use a LinkedList for ordering and Dictionary for O(1) lookup.', 'Move accessed items to the front of the linked list.', 'When at capacity, remove the last item in the linked list.'],
      concepts: ['LRU cache', 'LinkedList', 'Dictionary', 'eviction'],
    },
    {
      id: 'cs-coll-9',
      title: 'Set Operations',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method that returns the intersection of two collections.',
      skeleton: `// Write HashSet<T> Intersect<T>(IEnumerable<T> a, IEnumerable<T> b)`,
      solution: `HashSet<T> Intersect<T>(IEnumerable<T> a, IEnumerable<T> b)
{
    var setA = new HashSet<T>(a);
    setA.IntersectWith(b);
    return setA;
}`,
      hints: ['HashSet has IntersectWith which modifies in place.', 'Create a HashSet from one collection, intersect with the other.', 'IntersectWith keeps only elements present in both.'],
      concepts: ['HashSet', 'set intersection', 'IntersectWith'],
    },
    {
      id: 'cs-coll-10',
      title: 'SortedDictionary',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method that returns the top N entries from a SortedDictionary by key.',
      skeleton: `// Write List<KeyValuePair<string, int>> TopN(SortedDictionary<string, int> dict, int n)`,
      solution: `List<KeyValuePair<string, int>> TopN(SortedDictionary<string, int> dict, int n)
{
    var result = new List<KeyValuePair<string, int>>();
    int count = 0;
    foreach (var kvp in dict)
    {
        if (count >= n) break;
        result.Add(kvp);
        count++;
    }
    return result;
}`,
      hints: ['SortedDictionary iterates in key order.', 'Take the first n elements during iteration.', 'Use a counter and break when you reach n.'],
      concepts: ['SortedDictionary', 'ordered iteration', 'KeyValuePair'],
    },
    {
      id: 'cs-coll-11',
      title: 'Immutable List Builder',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a method that builds an ImmutableList efficiently using a builder.',
      skeleton: `// Write ImmutableList<int> BuildRange(int start, int count)
// Use ImmutableList.CreateBuilder for efficiency`,
      solution: `ImmutableList<int> BuildRange(int start, int count)
{
    var builder = ImmutableList.CreateBuilder<int>();
    for (int i = start; i < start + count; i++)
    {
        builder.Add(i);
    }
    return builder.ToImmutable();
}`,
      hints: ['CreateBuilder<T>() returns a mutable builder.', 'Add items to the builder, then call ToImmutable().', 'Builders avoid repeated immutable copies during construction.'],
      concepts: ['ImmutableList', 'builder pattern', 'efficient construction'],
    },
    {
      id: 'cs-coll-12',
      title: 'Priority Queue',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Use PriorityQueue to process items in priority order.',
      skeleton: `// Write List<string> ProcessByPriority(
//   (string task, int priority)[] items)
// Lower priority number = higher priority`,
      solution: `List<string> ProcessByPriority((string task, int priority)[] items)
{
    var pq = new PriorityQueue<string, int>();
    foreach (var (task, priority) in items)
        pq.Enqueue(task, priority);

    var result = new List<string>();
    while (pq.Count > 0)
        result.Add(pq.Dequeue());

    return result;
}`,
      hints: ['PriorityQueue<TElement, TPriority> is built into .NET 6+.', 'Enqueue takes (element, priority).', 'Dequeue returns the element with the lowest priority value.'],
      concepts: ['PriorityQueue', 'priority ordering', 'Enqueue/Dequeue'],
    },
    {
      id: 'cs-coll-13',
      title: 'Bug: Modifying During Iteration',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the InvalidOperationException caused by modifying a collection during iteration.',
      skeleton: `var names = new List<string> { "Alice", "Bob", "Charlie" };
foreach (var name in names)
{
    if (name.StartsWith("B"))
        names.Remove(name);  // throws!
}`,
      solution: `var names = new List<string> { "Alice", "Bob", "Charlie" };
names.RemoveAll(name => name.StartsWith("B"));`,
      hints: ['You cannot modify a list while iterating over it with foreach.', 'Use RemoveAll with a predicate instead.', 'Alternatively, iterate over a copy or use a reverse for loop.'],
      concepts: ['collection modification', 'InvalidOperationException', 'RemoveAll'],
    },
    {
      id: 'cs-coll-14',
      title: 'Bug: KeyNotFoundException',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the code that throws when a key is missing.',
      skeleton: `var config = new Dictionary<string, string>
{
    ["host"] = "localhost"
};

string port = config["port"];  // throws KeyNotFoundException`,
      solution: `var config = new Dictionary<string, string>
{
    ["host"] = "localhost"
};

string port = config.GetValueOrDefault("port", "8080");`,
      hints: ['Accessing a missing key with the indexer throws.', 'Use TryGetValue or GetValueOrDefault for safe access.', 'GetValueOrDefault returns a fallback when the key is missing.'],
      concepts: ['KeyNotFoundException', 'GetValueOrDefault', 'safe access'],
    },
    {
      id: 'cs-coll-15',
      title: 'Bug: HashSet Equality',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix the HashSet that does not deduplicate custom objects.',
      skeleton: `class Point
{
    public int X { get; set; }
    public int Y { get; set; }
}

var set = new HashSet<Point>();
set.Add(new Point { X = 1, Y = 2 });
set.Add(new Point { X = 1, Y = 2 });
Console.WriteLine(set.Count);  // prints 2, expected 1`,
      solution: `class Point : IEquatable<Point>
{
    public int X { get; set; }
    public int Y { get; set; }

    public bool Equals(Point? other)
        => other is not null && X == other.X && Y == other.Y;

    public override bool Equals(object? obj) => Equals(obj as Point);

    public override int GetHashCode() => HashCode.Combine(X, Y);
}

var set = new HashSet<Point>();
set.Add(new Point { X = 1, Y = 2 });
set.Add(new Point { X = 1, Y = 2 });
Console.WriteLine(set.Count);  // prints 1`,
      hints: ['HashSet uses GetHashCode and Equals to determine uniqueness.', 'Override both GetHashCode and Equals on your class.', 'Implement IEquatable<Point> for type-safe equality.'],
      concepts: ['HashSet equality', 'GetHashCode', 'IEquatable'],
    },
    {
      id: 'cs-coll-16',
      title: 'Predict List Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the output of List operations.',
      skeleton: `var list = new List<int> { 10, 20, 30 };
list.Insert(1, 15);
list.RemoveAt(3);
Console.WriteLine(string.Join(", ", list));`,
      solution: `10, 15, 20`,
      hints: ['Insert(1, 15) puts 15 at index 1: {10, 15, 20, 30}.', 'RemoveAt(3) removes the element at index 3, which is 30.', 'Result: {10, 15, 20}.'],
      concepts: ['List Insert', 'RemoveAt', 'index operations'],
    },
    {
      id: 'cs-coll-17',
      title: 'Predict HashSet Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the count after adding duplicates to a HashSet.',
      skeleton: `var set = new HashSet<int> { 1, 2, 3 };
set.Add(2);
set.Add(4);
set.Add(3);
Console.WriteLine(set.Count);`,
      solution: `4`,
      hints: ['HashSet ignores duplicate values.', 'Starting: {1, 2, 3}. Add(2) no-op, Add(4) adds, Add(3) no-op.', 'Final: {1, 2, 3, 4} -- count is 4.'],
      concepts: ['HashSet', 'uniqueness', 'Count'],
    },
    {
      id: 'cs-coll-18',
      title: 'Predict Queue Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the dequeue order of a Queue.',
      skeleton: `var q = new Queue<char>();
q.Enqueue('A');
q.Enqueue('B');
q.Enqueue('C');
q.Dequeue();
q.Enqueue('D');
while (q.Count > 0)
    Console.Write(q.Dequeue());`,
      solution: `BCD`,
      hints: ['Queue is FIFO: first in, first out.', 'After Enqueue A,B,C and Dequeue: front is B.', 'Enqueue D, then Dequeue all: B, C, D.'],
      concepts: ['Queue', 'FIFO order', 'Enqueue/Dequeue'],
    },
    {
      id: 'cs-coll-19',
      title: 'Refactor Array to List',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Refactor fixed-size array usage to use a dynamic List.',
      skeleton: `string[] names = new string[3];
names[0] = "Alice";
names[1] = "Bob";
names[2] = "Charlie";
// Cannot add more -- array is fixed size`,
      solution: `var names = new List<string>();
names.Add("Alice");
names.Add("Bob");
names.Add("Charlie");
// Can continue adding more items`,
      hints: ['List<T> grows dynamically as items are added.', 'Use Add() instead of indexer assignment.', 'var names = new List<string>() initializes an empty list.'],
      concepts: ['List vs array', 'dynamic sizing', 'Add method'],
    },
    {
      id: 'cs-coll-20',
      title: 'Refactor Nested Ifs to Dictionary',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Replace a chain of if/else with a Dictionary lookup.',
      skeleton: `string GetColor(string fruit)
{
    if (fruit == "apple") return "red";
    else if (fruit == "banana") return "yellow";
    else if (fruit == "grape") return "purple";
    else if (fruit == "orange") return "orange";
    else return "unknown";
}`,
      solution: `string GetColor(string fruit)
{
    var colors = new Dictionary<string, string>
    {
        ["apple"] = "red",
        ["banana"] = "yellow",
        ["grape"] = "purple",
        ["orange"] = "orange"
    };
    return colors.GetValueOrDefault(fruit, "unknown");
}`,
      hints: ['A Dictionary maps keys to values in O(1) time.', 'GetValueOrDefault handles the "else" case.', 'This is cleaner and more extensible than if/else chains.'],
      concepts: ['Dictionary lookup', 'refactoring conditionals', 'GetValueOrDefault'],
    },
  ],
};
