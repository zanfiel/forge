import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-arr',
  title: '6. Arrays',
  explanation: `## Arrays

Arrays in C# are fixed-size, zero-indexed collections. C# supports single-dimensional, multi-dimensional, and jagged arrays.

\`\`\`csharp
// Single-dimensional
int[] nums = { 1, 2, 3, 4, 5 };
int[] empty = new int[10]; // default-initialized to 0

// Multi-dimensional (rectangular)
int[,] matrix = { { 1, 2 }, { 3, 4 } };
int val = matrix[1, 0]; // 3

// Jagged (array of arrays)
int[][] jagged = new int[3][];
jagged[0] = new int[] { 1, 2 };
jagged[1] = new int[] { 3, 4, 5 };

// Array class methods
Array.Sort(nums);
Array.Reverse(nums);
int idx = Array.IndexOf(nums, 3);

// Span<T> -- stack-allocated view over contiguous memory
Span<int> span = nums.AsSpan();
Span<int> slice = span[1..3]; // elements at index 1, 2

// Range and Index (C# 8)
int last = nums[^1];        // last element
int[] sub = nums[1..4];     // elements 1, 2, 3

// stackalloc -- allocate on the stack (no GC)
Span<int> stack = stackalloc int[10];
\`\`\`

Use arrays for fixed-size data. Use \`List<T>\` when the size changes dynamically.`,
  exercises: [
    {
      id: 'cs-arr-1',
      title: 'Array Initialization',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Initialize an array with values 10, 20, 30.',
      skeleton: `int[] nums = __BLANK__;
Console.WriteLine(nums.Length); // 3`,
      solution: `int[] nums = { 10, 20, 30 };
Console.WriteLine(nums.Length); // 3`,
      hints: [
        'Use curly braces for array initializer syntax.',
        'Separate elements with commas.',
        'The answer is: { 10, 20, 30 }',
      ],
      concepts: ['array initializer', 'curly braces', 'Length'],
    },
    {
      id: 'cs-arr-2',
      title: 'Index from End',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Access the last element of the array using the index-from-end operator.',
      skeleton: `int[] data = { 5, 10, 15, 20 };
int last = data[__BLANK__];
Console.WriteLine(last); // 20`,
      solution: `int[] data = { 5, 10, 15, 20 };
int last = data[^1];
Console.WriteLine(last); // 20`,
      hints: [
        'The ^ operator indexes from the end of the array.',
        '^1 means 1 from the end (the last element).',
        'The answer is: ^1',
      ],
      concepts: ['Index', '^', 'index from end'],
    },
    {
      id: 'cs-arr-3',
      title: 'Range Slice',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Slice elements at indices 1, 2, 3 from the array.',
      skeleton: `int[] data = { 0, 10, 20, 30, 40 };
int[] slice = data[__BLANK__];
// slice is { 10, 20, 30 }`,
      solution: `int[] data = { 0, 10, 20, 30, 40 };
int[] slice = data[1..4];
// slice is { 10, 20, 30 }`,
      hints: [
        'Range syntax is start..end where end is exclusive.',
        'To get indices 1, 2, 3 use 1..4.',
        'The answer is: 1..4',
      ],
      concepts: ['Range', 'slice', 'exclusive end'],
    },
    {
      id: 'cs-arr-4',
      title: 'Multi-dimensional Access',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Access the element at row 1, column 2 of a 2D array.',
      skeleton: `int[,] grid = { { 1, 2, 3 }, { 4, 5, 6 } };
int val = grid[__BLANK__];
Console.WriteLine(val); // 6`,
      solution: `int[,] grid = { { 1, 2, 3 }, { 4, 5, 6 } };
int val = grid[1, 2];
Console.WriteLine(val); // 6`,
      hints: [
        'Multi-dimensional arrays use comma-separated indices.',
        'Row 1 is the second row, column 2 is the third column.',
        'The answer is: 1, 2',
      ],
      concepts: ['multi-dimensional array', '2D indexing'],
    },
    {
      id: 'cs-arr-5',
      title: 'Array.Sort',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Sort the array in ascending order.',
      skeleton: `int[] nums = { 5, 2, 8, 1, 9 };
__BLANK__;
// nums is now { 1, 2, 5, 8, 9 }`,
      solution: `int[] nums = { 5, 2, 8, 1, 9 };
Array.Sort(nums);
// nums is now { 1, 2, 5, 8, 9 }`,
      hints: [
        'The Array class has a static Sort method.',
        'Sort modifies the array in place.',
        'The answer is: Array.Sort(nums)',
      ],
      concepts: ['Array.Sort', 'in-place sorting', 'ascending order'],
    },
    {
      id: 'cs-arr-6',
      title: 'Jagged Array',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Create a jagged array with rows of different lengths.',
      skeleton: `__BLANK__ jagged = new int[2][];
jagged[0] = new int[] { 1, 2, 3 };
jagged[1] = new int[] { 4, 5 };`,
      solution: `int[][] jagged = new int[2][];
jagged[0] = new int[] { 1, 2, 3 };
jagged[1] = new int[] { 4, 5 };`,
      hints: [
        'A jagged array is an array of arrays.',
        'The type uses double brackets: type[][].',
        'The answer is: int[][]',
      ],
      concepts: ['jagged array', 'int[][]', 'variable-length rows'],
    },
    {
      id: 'cs-arr-7',
      title: 'Find Maximum',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a method FindMax that takes an int[] and returns the maximum value.',
      skeleton: ``,
      solution: `static int FindMax(int[] arr)
{
    int max = arr[0];
    for (int i = 1; i < arr.Length; i++)
    {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}`,
      hints: [
        'Start with the first element as the current max.',
        'Loop through the rest, updating max when a larger value is found.',
        'Return the final max value.',
      ],
      concepts: ['array traversal', 'max finding', 'for loop'],
    },
    {
      id: 'cs-arr-8',
      title: 'Remove Duplicates',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method RemoveDuplicates that takes an int[] and returns a new array with unique values preserving order.',
      skeleton: ``,
      solution: `static int[] RemoveDuplicates(int[] arr)
{
    var seen = new HashSet<int>();
    var result = new List<int>();
    foreach (int n in arr)
    {
        if (seen.Add(n))
        {
            result.Add(n);
        }
    }
    return result.ToArray();
}`,
      hints: [
        'Use a HashSet to track seen values efficiently.',
        'HashSet.Add returns false if the element already exists.',
        'Collect unique values in a List and convert to array.',
      ],
      concepts: ['HashSet', 'deduplication', 'List.ToArray', 'order preservation'],
    },
    {
      id: 'cs-arr-9',
      title: 'Rotate Array',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method RotateLeft that rotates an int[] left by k positions. E.g., [1,2,3,4,5] rotated left by 2 becomes [3,4,5,1,2].',
      skeleton: ``,
      solution: `static int[] RotateLeft(int[] arr, int k)
{
    int n = arr.Length;
    k = k % n;
    int[] result = new int[n];
    for (int i = 0; i < n; i++)
    {
        result[i] = arr[(i + k) % n];
    }
    return result;
}`,
      hints: [
        'Use modular arithmetic to wrap indices.',
        'Element at position i in the result comes from (i + k) % n.',
        'Handle k larger than array length with k % n.',
      ],
      concepts: ['array rotation', 'modular arithmetic', 'index wrapping'],
    },
    {
      id: 'cs-arr-10',
      title: 'Matrix Transpose',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a method Transpose that takes a 2D int[,] array and returns its transpose.',
      skeleton: ``,
      solution: `static int[,] Transpose(int[,] matrix)
{
    int rows = matrix.GetLength(0);
    int cols = matrix.GetLength(1);
    int[,] result = new int[cols, rows];
    for (int i = 0; i < rows; i++)
    {
        for (int j = 0; j < cols; j++)
        {
            result[j, i] = matrix[i, j];
        }
    }
    return result;
}`,
      hints: [
        'GetLength(0) returns rows, GetLength(1) returns columns.',
        'The transpose swaps rows and columns: result[j,i] = matrix[i,j].',
        'The result dimensions are swapped: cols x rows.',
      ],
      concepts: ['2D array', 'transpose', 'GetLength', 'nested loops'],
    },
    {
      id: 'cs-arr-11',
      title: 'Span Slice Sum',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a method SliceSum that takes an int[] and two indices, and uses Span<T> to sum the slice without allocating a new array.',
      skeleton: ``,
      solution: `static int SliceSum(int[] arr, int start, int end)
{
    Span<int> span = arr.AsSpan()[start..end];
    int sum = 0;
    foreach (int n in span)
    {
        sum += n;
    }
    return sum;
}`,
      hints: [
        'AsSpan() creates a Span<T> over the array without copying.',
        'Slicing a Span with [start..end] creates a view, not a copy.',
        'Iterate the span with foreach to compute the sum.',
      ],
      concepts: ['Span<T>', 'AsSpan', 'zero-allocation slice', 'Range'],
    },
    {
      id: 'cs-arr-12',
      title: 'Array Pattern Matching',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a method Describe that takes an int[] and returns "empty", "single: X", "pair: X, Y", or "many: first=X, last=Y" using list patterns (C# 11).',
      skeleton: ``,
      solution: `static string Describe(int[] arr)
{
    return arr switch
    {
        [] => "empty",
        [var x] => $"single: {x}",
        [var x, var y] => $"pair: {x}, {y}",
        [var first, .., var last] => $"many: first={first}, last={last}"
    };
}`,
      hints: [
        'List patterns match against array structure: [], [x], [x, y].',
        'Use .. to match any number of elements in between.',
        '[var first, .., var last] captures the first and last elements.',
      ],
      concepts: ['list pattern', 'C# 11', 'pattern matching', 'switch expression'],
    },
    {
      id: 'cs-arr-13',
      title: 'Array Bounds Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the IndexOutOfRangeException when accessing the array.',
      skeleton: `static int GetMiddle(int[] arr)
{
    int mid = arr.Length / 2;
    return arr[mid + 1]; // throws when arr has odd length
}`,
      solution: `static int GetMiddle(int[] arr)
{
    int mid = arr.Length / 2;
    return arr[mid];
}`,
      hints: [
        'For an array of length 5, Length/2 = 2, which is already the middle index.',
        'Adding 1 can go out of bounds for small arrays.',
        'Remove the + 1 to access the correct middle element.',
      ],
      concepts: ['IndexOutOfRangeException', 'array bounds', 'middle index'],
    },
    {
      id: 'cs-arr-14',
      title: 'Reference Semantics Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the code that accidentally modifies the original array when it should make an independent copy.',
      skeleton: `static int[] SortedCopy(int[] original)
{
    int[] copy = original; // not a real copy!
    Array.Sort(copy);      // modifies original too
    return copy;
}`,
      solution: `static int[] SortedCopy(int[] original)
{
    int[] copy = (int[])original.Clone();
    Array.Sort(copy);
    return copy;
}`,
      hints: [
        'Arrays are reference types; assigning just copies the reference.',
        'Use Clone() or Array.Copy to create an independent copy.',
        'Cast Clone() result to int[] since it returns object.',
      ],
      concepts: ['reference semantics', 'Clone', 'array copy', 'shallow copy'],
    },
    {
      id: 'cs-arr-15',
      title: 'Empty Array Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the method that crashes on empty arrays. Use Array.Empty<int>() for best practice.',
      skeleton: `static int First(int[] arr)
{
    return arr[0]; // crashes on empty array
}`,
      solution: `static int First(int[] arr)
{
    if (arr.Length == 0) return 0;
    return arr[0];
}`,
      hints: [
        'Accessing arr[0] on an empty array throws IndexOutOfRangeException.',
        'Check arr.Length before accessing elements.',
        'Return a default value (0) for empty arrays.',
      ],
      concepts: ['empty array', 'bounds checking', 'guard clause'],
    },
    {
      id: 'cs-arr-16',
      title: 'Predict Array Behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `int[] a = { 1, 2, 3 };
int[] b = a;
b[0] = 99;
Console.WriteLine(a[0]);`,
      solution: `99`,
      hints: [
        'Arrays are reference types in C#.',
        'b = a makes both variables point to the same array.',
        'Modifying b[0] also changes a[0] since they share the same data.',
      ],
      concepts: ['reference type', 'shared reference', 'array aliasing'],
    },
    {
      id: 'cs-arr-17',
      title: 'Predict Range Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `int[] nums = { 0, 1, 2, 3, 4, 5 };
int[] slice = nums[^3..];
Console.WriteLine(string.Join(", ", slice));`,
      solution: `3, 4, 5`,
      hints: [
        '^3 means 3 from the end, which is index 3.',
        '.. without an end means to the end of the array.',
        'nums[^3..] gets elements at indices 3, 4, 5.',
      ],
      concepts: ['Range', 'Index from end', 'array slicing'],
    },
    {
      id: 'cs-arr-18',
      title: 'Predict Jagged vs 2D',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'What does this code print?',
      skeleton: `int[][] jagged = { new[] { 1, 2 }, new[] { 3, 4, 5 } };
Console.WriteLine(jagged.Length);
Console.WriteLine(jagged[0].Length);
Console.WriteLine(jagged[1].Length);`,
      solution: `2
2
3`,
      hints: [
        'jagged.Length is the number of inner arrays (2).',
        'jagged[0].Length is the length of the first inner array (2).',
        'jagged[1].Length is the length of the second inner array (3).',
      ],
      concepts: ['jagged array', 'Length', 'variable row length'],
    },
    {
      id: 'cs-arr-19',
      title: 'Refactor to LINQ',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor the manual loop to use LINQ methods.',
      skeleton: `static int[] GetEvenNumbers(int[] arr)
{
    var result = new List<int>();
    for (int i = 0; i < arr.Length; i++)
    {
        if (arr[i] % 2 == 0)
        {
            result.Add(arr[i]);
        }
    }
    return result.ToArray();
}`,
      solution: `static int[] GetEvenNumbers(int[] arr)
{
    return arr.Where(n => n % 2 == 0).ToArray();
}`,
      hints: [
        'LINQ Where filters elements based on a predicate.',
        'Replace the loop with arr.Where(n => n % 2 == 0).',
        'Call .ToArray() to convert the result back to an array.',
      ],
      concepts: ['LINQ', 'Where', 'lambda', 'refactoring'],
    },
    {
      id: 'cs-arr-20',
      title: 'Merge Sorted Arrays',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a method MergeSorted that takes two sorted int arrays and returns a single sorted merged array.',
      skeleton: ``,
      solution: `static int[] MergeSorted(int[] a, int[] b)
{
    int[] result = new int[a.Length + b.Length];
    int i = 0, j = 0, k = 0;
    while (i < a.Length && j < b.Length)
    {
        if (a[i] <= b[j])
            result[k++] = a[i++];
        else
            result[k++] = b[j++];
    }
    while (i < a.Length) result[k++] = a[i++];
    while (j < b.Length) result[k++] = b[j++];
    return result;
}`,
      hints: [
        'Use two pointers, one for each input array.',
        'Compare elements and take the smaller one each time.',
        'After one array is exhausted, copy the remaining elements from the other.',
      ],
      concepts: ['merge sort', 'two pointers', 'sorted merge', 'algorithm'],
    },
  ],
};
