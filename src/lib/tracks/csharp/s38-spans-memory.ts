import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-spans-memory',
  title: '38. Spans & Memory',
  explanation: `## Spans & Memory

\`Span<T>\` and \`Memory<T>\` provide safe, efficient views over contiguous memory without allocations.

\`\`\`csharp
// Span from array
int[] arr = { 1, 2, 3, 4, 5 };
Span<int> span = arr.AsSpan(1, 3); // [2, 3, 4]

// Span from stackalloc
Span<byte> buffer = stackalloc byte[256];
buffer.Fill(0xFF);
\`\`\`

### ReadOnlySpan for Strings

\`\`\`csharp
ReadOnlySpan<char> hello = "Hello, World!".AsSpan(0, 5);
// No allocation -- just a view into the original string
\`\`\`

### Memory<T> for Async

\`\`\`csharp
// Memory<T> can be stored on the heap (spans cannot)
Memory<byte> mem = new byte[1024];
await stream.ReadAsync(mem);
\`\`\`

### ArrayPool

\`\`\`csharp
var pool = ArrayPool<byte>.Shared;
byte[] rented = pool.Rent(4096);
try { /* use rented */ }
finally { pool.Return(rented); }
\`\`\`

Spans are stack-only (ref struct). Use \`Memory<T>\` when you need to store the reference or pass to async methods.`,
  exercises: [
    {
      id: 'cs-span-1',
      title: 'Create Span from Array',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Create a Span from an existing array.',
      skeleton: `int[] arr = { 10, 20, 30, 40, 50 };
Span<int> span = arr.__BLANK__();`,
      solution: `int[] arr = { 10, 20, 30, 40, 50 };
Span<int> span = arr.AsSpan();`,
      hints: ['Arrays have an extension method that creates a Span.', 'No data is copied -- it is a view.', 'The answer is: AsSpan'],
      concepts: ['AsSpan', 'Span from array'],
    },
    {
      id: 'cs-span-2',
      title: 'Span Slice',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Slice a span to get a sub-range.',
      skeleton: `Span<int> data = new int[] { 1, 2, 3, 4, 5 };
Span<int> middle = data.__BLANK__(1, 3); // [2, 3, 4]`,
      solution: `Span<int> data = new int[] { 1, 2, 3, 4, 5 };
Span<int> middle = data.Slice(1, 3); // [2, 3, 4]`,
      hints: ['Slice takes a start index and length.', 'It returns a new Span over the same memory.', 'The answer is: Slice'],
      concepts: ['Span.Slice', 'sub-range'],
    },
    {
      id: 'cs-span-3',
      title: 'Stackalloc Buffer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Allocate a buffer on the stack.',
      skeleton: `Span<byte> buffer = __BLANK__ byte[128];
buffer.Fill(0);`,
      solution: `Span<byte> buffer = stackalloc byte[128];
buffer.Fill(0);`,
      hints: ['This keyword allocates on the stack instead of the heap.', 'The memory is freed when the method returns.', 'The answer is: stackalloc'],
      concepts: ['stackalloc', 'stack allocation'],
    },
    {
      id: 'cs-span-4',
      title: 'ReadOnlySpan from String',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Create a ReadOnlySpan from a string without allocation.',
      skeleton: `string text = "Hello, World!";
ReadOnlySpan<char> hello = text.__BLANK__(0, 5);`,
      solution: `string text = "Hello, World!";
ReadOnlySpan<char> hello = text.AsSpan(0, 5);`,
      hints: ['Strings can be viewed as ReadOnlySpan<char>.', 'AsSpan with start and length creates a substring view.', 'The answer is: AsSpan'],
      concepts: ['ReadOnlySpan', 'string span', 'zero-allocation substring'],
    },
    {
      id: 'cs-span-5',
      title: 'ArrayPool Rent',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Rent a buffer from the shared array pool.',
      skeleton: `byte[] buffer = ArrayPool<byte>.Shared.__BLANK__(4096);
try { /* use buffer */ }
finally { ArrayPool<byte>.Shared.Return(buffer); }`,
      solution: `byte[] buffer = ArrayPool<byte>.Shared.Rent(4096);
try { /* use buffer */ }
finally { ArrayPool<byte>.Shared.Return(buffer); }`,
      hints: ['Rent borrows an array of at least the requested size.', 'Always return rented arrays in a finally block.', 'The answer is: Rent'],
      concepts: ['ArrayPool', 'Rent', 'buffer pooling'],
    },
    {
      id: 'cs-span-6',
      title: 'Memory from Array',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Create Memory<T> from an array for async use.',
      skeleton: `byte[] data = new byte[1024];
Memory<byte> mem = data.__BLANK__();
await stream.ReadAsync(mem);`,
      solution: `byte[] data = new byte[1024];
Memory<byte> mem = data.AsMemory();
await stream.ReadAsync(mem);`,
      hints: ['Memory<T> is the heap-safe counterpart to Span<T>.', 'It can be used with async methods.', 'The answer is: AsMemory'],
      concepts: ['AsMemory', 'Memory<T>', 'async I/O'],
    },
    {
      id: 'cs-span-7',
      title: 'Sum with Span',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Sum all elements in a ReadOnlySpan.',
      skeleton: `int Sum(ReadOnlySpan<int> values)
{
    // Sum all elements without allocating
}`,
      solution: `int Sum(ReadOnlySpan<int> values)
{
    int total = 0;
    foreach (var v in values)
        total += v;
    return total;
}`,
      hints: ['Span supports foreach iteration.', 'No LINQ -- Span is a ref struct.', 'Use a simple accumulator loop.'],
      concepts: ['ReadOnlySpan', 'foreach', 'zero-allocation'],
    },
    {
      id: 'cs-span-8',
      title: 'Parse Integers from CSV',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Parse comma-separated integers using span-based splitting.',
      skeleton: `int[] ParseCsv(ReadOnlySpan<char> csv)
{
    // Split by comma using spans, parse each int
    // No string allocations!
}`,
      solution: `int[] ParseCsv(ReadOnlySpan<char> csv)
{
    var results = new List<int>();
    while (!csv.IsEmpty)
    {
        int comma = csv.IndexOf(',');
        ReadOnlySpan<char> token = comma >= 0 ? csv[..comma] : csv;
        results.Add(int.Parse(token));
        csv = comma >= 0 ? csv[(comma + 1)..] : ReadOnlySpan<char>.Empty;
    }
    return results.ToArray();
}`,
      hints: ['Use IndexOf to find commas.', 'Slice with range syntax csv[..comma].', 'int.Parse accepts ReadOnlySpan<char>.'],
      concepts: ['span parsing', 'IndexOf', 'int.Parse span overload'],
    },
    {
      id: 'cs-span-9',
      title: 'Fill and Copy Span',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fill a span with a pattern and copy it to a destination.',
      skeleton: `void FillPattern(Span<byte> dest, byte[] pattern)
{
    // Repeat the pattern to fill the entire destination span
}`,
      solution: `void FillPattern(Span<byte> dest, byte[] pattern)
{
    ReadOnlySpan<byte> src = pattern;
    int offset = 0;
    while (offset < dest.Length)
    {
        int copyLen = Math.Min(src.Length, dest.Length - offset);
        src[..copyLen].CopyTo(dest[offset..]);
        offset += copyLen;
    }
}`,
      hints: ['Use CopyTo to copy span data.', 'Calculate remaining length to avoid overflow.', 'Slice both source and destination with ranges.'],
      concepts: ['CopyTo', 'Span slicing', 'pattern fill'],
    },
    {
      id: 'cs-span-10',
      title: 'Pooled Buffer Helper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Create a disposable wrapper for ArrayPool rentals.',
      skeleton: `struct PooledBuffer<T> : IDisposable
{
    // Rent from ArrayPool, expose as Span, return on dispose
}`,
      solution: `struct PooledBuffer<T> : IDisposable
{
    private T[]? _array;
    public int Length { get; }

    public PooledBuffer(int size)
    {
        _array = ArrayPool<T>.Shared.Rent(size);
        Length = size;
    }

    public Span<T> Span => _array.AsSpan(0, Length);

    public void Dispose()
    {
        if (_array != null)
        {
            ArrayPool<T>.Shared.Return(_array);
            _array = null;
        }
    }
}`,
      hints: ['Rent in constructor, Return in Dispose.', 'Expose a Span property limited to the requested length.', 'Set array to null after returning to prevent double-return.'],
      concepts: ['ArrayPool wrapper', 'IDisposable', 'Span property'],
    },
    {
      id: 'cs-span-11',
      title: 'Memory Slice for Async',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Read a file in chunks using Memory<T>.',
      skeleton: `async Task<int> ReadInChunks(Stream stream, Memory<byte> buffer, int chunkSize)
{
    // Read stream in chunks of chunkSize, return total bytes read
}`,
      solution: `async Task<int> ReadInChunks(Stream stream, Memory<byte> buffer, int chunkSize)
{
    int totalRead = 0;
    while (totalRead < buffer.Length)
    {
        int remaining = Math.Min(chunkSize, buffer.Length - totalRead);
        int bytesRead = await stream.ReadAsync(buffer.Slice(totalRead, remaining));
        if (bytesRead == 0) break;
        totalRead += bytesRead;
    }
    return totalRead;
}`,
      hints: ['Memory<T>.Slice creates a sub-region for each read.', 'ReadAsync accepts Memory<byte>.', 'A return of 0 means end of stream.'],
      concepts: ['Memory.Slice', 'ReadAsync', 'chunked reading'],
    },
    {
      id: 'cs-span-12',
      title: 'Span Contains Check',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Check if a ReadOnlySpan contains a subsequence without allocation.',
      skeleton: `bool ContainsSubsequence(ReadOnlySpan<byte> haystack, ReadOnlySpan<byte> needle)
{
    // Return true if needle is found in haystack
}`,
      solution: `bool ContainsSubsequence(ReadOnlySpan<byte> haystack, ReadOnlySpan<byte> needle)
{
    return haystack.IndexOf(needle) >= 0;
}`,
      hints: ['Span has an IndexOf overload that accepts another span.', 'Returns -1 if not found.', 'This is a zero-allocation search.'],
      concepts: ['IndexOf span', 'subsequence search', 'zero allocation'],
    },
    {
      id: 'cs-span-13',
      title: 'Span in Async Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the code that tries to use Span across an await boundary.',
      skeleton: `async Task ProcessAsync(byte[] data)
{
    // Bug: Span is a ref struct, cannot be used across await
    Span<byte> span = data.AsSpan();
    await Task.Delay(100);
    span[0] = 0xFF; // Compile error!
}`,
      solution: `async Task ProcessAsync(byte[] data)
{
    Memory<byte> mem = data.AsMemory();
    await Task.Delay(100);
    mem.Span[0] = 0xFF;
}`,
      hints: ['Span<T> is a ref struct and cannot live across await.', 'Use Memory<T> instead -- it can be stored on the heap.', 'Access .Span after the await point.'],
      concepts: ['ref struct limitation', 'Memory vs Span', 'async boundaries'],
    },
    {
      id: 'cs-span-14',
      title: 'ArrayPool Not Returned Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the pool leak where rented arrays are never returned.',
      skeleton: `byte[] ProcessData(int size)
{
    byte[] buffer = ArrayPool<byte>.Shared.Rent(size);
    // Bug: no return -- pool leak!
    FillBuffer(buffer);
    return buffer; // caller uses the rented array directly
}`,
      solution: `byte[] ProcessData(int size)
{
    byte[] rented = ArrayPool<byte>.Shared.Rent(size);
    try
    {
        FillBuffer(rented);
        byte[] result = new byte[size];
        Array.Copy(rented, result, size);
        return result;
    }
    finally
    {
        ArrayPool<byte>.Shared.Return(rented);
    }
}`,
      hints: ['Rented arrays must be returned to the pool.', 'Copy the needed data to a new array before returning.', 'Use try/finally to ensure Return is called.'],
      concepts: ['ArrayPool.Return', 'pool leak', 'try/finally'],
    },
    {
      id: 'cs-span-15',
      title: 'Wrong Slice Length Bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix the out-of-range slice on a span.',
      skeleton: `void Process(ReadOnlySpan<int> data)
{
    // Bug: Slice(2, 10) throws when data has fewer than 12 elements
    var chunk = data.Slice(2, 10);
    foreach (var item in chunk)
        Console.Write(item + " ");
}`,
      solution: `void Process(ReadOnlySpan<int> data)
{
    int start = Math.Min(2, data.Length);
    int length = Math.Min(10, data.Length - start);
    var chunk = data.Slice(start, length);
    foreach (var item in chunk)
        Console.Write(item + " ");
}`,
      hints: ['Slice throws if start + length exceeds the span length.', 'Clamp both start and length to the available data.', 'Use Math.Min to stay in bounds.'],
      concepts: ['bounds checking', 'Slice safety', 'Math.Min'],
    },
    {
      id: 'cs-span-16',
      title: 'Predict Span Modification',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict whether modifying a span modifies the original array.',
      skeleton: `int[] arr = { 1, 2, 3 };
Span<int> span = arr;
span[0] = 99;
Console.WriteLine(arr[0]);`,
      solution: `99`,
      hints: ['Span is a view over the original memory.', 'Modifying the span modifies the underlying array.', 'No copy is made.'],
      concepts: ['Span mutation', 'shared memory', 'no-copy view'],
    },
    {
      id: 'cs-span-17',
      title: 'Predict Stackalloc Scope',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the output of stackalloc span operations.',
      skeleton: `Span<int> s = stackalloc int[3];
s[0] = 10;
s[1] = 20;
s[2] = 30;
int sum = 0;
foreach (var v in s) sum += v;
Console.WriteLine(sum);`,
      solution: `60`,
      hints: ['stackalloc creates [10, 20, 30] on the stack.', 'The foreach sums all three values.', '10 + 20 + 30 = 60.'],
      concepts: ['stackalloc', 'foreach on Span'],
    },
    {
      id: 'cs-span-18',
      title: 'Predict ArrayPool Rent Size',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the actual size of a rented array.',
      skeleton: `byte[] buf = ArrayPool<byte>.Shared.Rent(100);
Console.WriteLine(buf.Length >= 100);
Console.WriteLine(buf.Length == 100);`,
      solution: `True
False`,
      hints: ['Rent returns an array of AT LEAST the requested size.', 'The actual size is typically rounded up to a power of 2.', 'buf.Length >= 100 is guaranteed, but buf.Length == 100 is not.'],
      concepts: ['ArrayPool sizing', 'minimum size guarantee', 'power-of-2 rounding'],
    },
    {
      id: 'cs-span-19',
      title: 'Refactor String Substring to Span',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor string.Substring calls to use span-based parsing.',
      skeleton: `(string key, string value) ParseHeader(string header)
{
    int colon = header.IndexOf(':');
    string key = header.Substring(0, colon).Trim();
    string value = header.Substring(colon + 1).Trim();
    return (key, value);
}`,
      solution: `(string key, string value) ParseHeader(ReadOnlySpan<char> header)
{
    int colon = header.IndexOf(':');
    var key = header[..colon].Trim();
    var value = header[(colon + 1)..].Trim();
    return (key.ToString(), value.ToString());
}`,
      hints: ['ReadOnlySpan<char> avoids allocating intermediate strings.', 'Use range syntax [..colon] instead of Substring.', 'Only call ToString at the end when you need a string.'],
      concepts: ['span-based parsing', 'zero-allocation', 'Trim on span'],
    },
    {
      id: 'cs-span-20',
      title: 'Refactor to ArrayPool',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Refactor frequent byte array allocations to use ArrayPool.',
      skeleton: `byte[] Transform(byte[] input)
{
    byte[] buffer = new byte[input.Length * 2]; // allocated every call!
    for (int i = 0; i < input.Length; i++)
    {
        buffer[i * 2] = input[i];
        buffer[i * 2 + 1] = (byte)(input[i] ^ 0xFF);
    }
    return buffer;
}`,
      solution: `byte[] Transform(byte[] input)
{
    int size = input.Length * 2;
    byte[] rented = ArrayPool<byte>.Shared.Rent(size);
    try
    {
        for (int i = 0; i < input.Length; i++)
        {
            rented[i * 2] = input[i];
            rented[i * 2 + 1] = (byte)(input[i] ^ 0xFF);
        }
        byte[] result = new byte[size];
        Array.Copy(rented, result, size);
        return result;
    }
    finally
    {
        ArrayPool<byte>.Shared.Return(rented);
    }
}`,
      hints: ['Rent a buffer instead of allocating.', 'Copy the used portion to a right-sized result.', 'Always return the rented buffer in a finally block.'],
      concepts: ['ArrayPool', 'Rent/Return', 'reduced allocations'],
    },
  ],
};
