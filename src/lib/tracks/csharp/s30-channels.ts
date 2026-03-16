import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-channels',
  title: '30. Channels & Producer-Consumer',
  explanation: `## Channels & Producer-Consumer

\`System.Threading.Channels\` provides a modern, high-performance async producer-consumer API.

\`\`\`csharp
// Unbounded channel -- grows as needed
var channel = Channel.CreateUnbounded<string>();

// Bounded channel -- backpressure when full
var bounded = Channel.CreateBounded<int>(new BoundedChannelOptions(100)
{
    FullMode = BoundedChannelFullMode.Wait
});
\`\`\`

### Writing and Reading

\`\`\`csharp
ChannelWriter<int> writer = channel.Writer;
ChannelReader<int> reader = channel.Reader;

await writer.WriteAsync(42);
writer.Complete();                // signal no more items

await foreach (var item in reader.ReadAllAsync())
    Console.WriteLine(item);
\`\`\`

### Multi-Stage Pipeline

\`\`\`csharp
async Task Produce(ChannelWriter<int> writer)
{
    for (int i = 0; i < 100; i++)
        await writer.WriteAsync(i);
    writer.Complete();
}

async Task Consume(ChannelReader<int> reader)
{
    await foreach (var item in reader.ReadAllAsync())
        Console.WriteLine(item);
}
\`\`\`

Channels excel at decoupling producers from consumers, with optional backpressure, multiple consumers, and cancellation support.`,
  exercises: [
    {
      id: 'cs-chan-1',
      title: 'Create Unbounded Channel',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Create an unbounded channel of strings.',
      skeleton: `var channel = Channel.__BLANK__<string>();`,
      solution: `var channel = Channel.CreateUnbounded<string>();`,
      hints: ['Unbounded channels have no capacity limit.', 'The factory method is on the Channel static class.', 'The answer is: CreateUnbounded'],
      concepts: ['Channel.CreateUnbounded', 'System.Threading.Channels'],
    },
    {
      id: 'cs-chan-2',
      title: 'Create Bounded Channel',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Create a bounded channel with capacity 50.',
      skeleton: `var channel = Channel.__BLANK__<int>(50);`,
      solution: `var channel = Channel.CreateBounded<int>(50);`,
      hints: ['Bounded channels limit the number of buffered items.', 'Pass the capacity as an integer argument.', 'The answer is: CreateBounded'],
      concepts: ['Channel.CreateBounded', 'bounded channel', 'backpressure'],
    },
    {
      id: 'cs-chan-3',
      title: 'Write to Channel',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write an item to a channel asynchronously.',
      skeleton: `ChannelWriter<int> writer = channel.Writer;
await writer.__BLANK__(42);`,
      solution: `ChannelWriter<int> writer = channel.Writer;
await writer.WriteAsync(42);`,
      hints: ['The async write method takes the item as a parameter.', 'It returns a ValueTask.', 'The answer is: WriteAsync'],
      concepts: ['ChannelWriter', 'WriteAsync'],
    },
    {
      id: 'cs-chan-4',
      title: 'Read All Items',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Consume all items from a channel using await foreach.',
      skeleton: `await foreach (var item in reader.__BLANK__())
{
    Console.WriteLine(item);
}`,
      solution: `await foreach (var item in reader.ReadAllAsync())
{
    Console.WriteLine(item);
}`,
      hints: ['This method returns an IAsyncEnumerable<T>.', 'It reads until the channel is completed.', 'The answer is: ReadAllAsync'],
      concepts: ['ReadAllAsync', 'IAsyncEnumerable', 'await foreach'],
    },
    {
      id: 'cs-chan-5',
      title: 'Complete the Writer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Signal that no more items will be written.',
      skeleton: `await writer.WriteAsync(1);
await writer.WriteAsync(2);
writer.__BLANK__();`,
      solution: `await writer.WriteAsync(1);
await writer.WriteAsync(2);
writer.Complete();`,
      hints: ['This signals consumers that the channel is done.', 'After this call, further writes throw.', 'The answer is: Complete'],
      concepts: ['ChannelWriter.Complete', 'channel completion'],
    },
    {
      id: 'cs-chan-6',
      title: 'BoundedChannelFullMode',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Configure a bounded channel to drop the oldest item when full.',
      skeleton: `var channel = Channel.CreateBounded<int>(new BoundedChannelOptions(10)
{
    FullMode = BoundedChannelFullMode.__BLANK__
});`,
      solution: `var channel = Channel.CreateBounded<int>(new BoundedChannelOptions(10)
{
    FullMode = BoundedChannelFullMode.DropOldest
});`,
      hints: ['When the channel is full, it can wait, drop newest, drop oldest, or drop the write.', 'DropOldest removes the oldest buffered item.', 'The answer is: DropOldest'],
      concepts: ['BoundedChannelFullMode', 'DropOldest', 'backpressure'],
    },
    {
      id: 'cs-chan-7',
      title: 'Simple Producer',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a producer that writes numbers 1 through count to a channel, then completes it.',
      skeleton: `async Task ProduceNumbers(ChannelWriter<int> writer, int count)
{
    // Write numbers 1..count then complete the writer
}`,
      solution: `async Task ProduceNumbers(ChannelWriter<int> writer, int count)
{
    for (int i = 1; i <= count; i++)
        await writer.WriteAsync(i);
    writer.Complete();
}`,
      hints: ['Loop from 1 to count inclusive.', 'Use WriteAsync for each number.', 'Call Complete() after the loop.'],
      concepts: ['ChannelWriter', 'WriteAsync', 'Complete', 'producer pattern'],
    },
    {
      id: 'cs-chan-8',
      title: 'Simple Consumer',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a consumer that reads all items and returns their sum.',
      skeleton: `async Task<int> ConsumeAndSum(ChannelReader<int> reader)
{
    // Read all items and return the sum
}`,
      solution: `async Task<int> ConsumeAndSum(ChannelReader<int> reader)
{
    int sum = 0;
    await foreach (var item in reader.ReadAllAsync())
        sum += item;
    return sum;
}`,
      hints: ['Use await foreach with ReadAllAsync().', 'Accumulate each item into a sum variable.', 'Return the accumulated sum.'],
      concepts: ['ChannelReader', 'ReadAllAsync', 'consumer pattern'],
    },
    {
      id: 'cs-chan-9',
      title: 'TryWrite',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write items to a bounded channel, counting how many were accepted.',
      skeleton: `int WriteAsManyAsPossible(ChannelWriter<int> writer, int[] items)
{
    // Try to write each item synchronously, return count of accepted items
}`,
      solution: `int WriteAsManyAsPossible(ChannelWriter<int> writer, int[] items)
{
    int accepted = 0;
    foreach (var item in items)
    {
        if (writer.TryWrite(item))
            accepted++;
    }
    return accepted;
}`,
      hints: ['TryWrite returns true if the item was accepted.', 'It does not block or await.', 'Count successes and return the total.'],
      concepts: ['TryWrite', 'bounded channel', 'synchronous write'],
    },
    {
      id: 'cs-chan-10',
      title: 'Pipeline Stage',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a pipeline stage that reads ints, doubles them, and writes to an output channel.',
      skeleton: `async Task DoubleStage(ChannelReader<int> input, ChannelWriter<int> output)
{
    // Read from input, write doubled value to output, then complete output
}`,
      solution: `async Task DoubleStage(ChannelReader<int> input, ChannelWriter<int> output)
{
    await foreach (var item in input.ReadAllAsync())
        await output.WriteAsync(item * 2);
    output.Complete();
}`,
      hints: ['Use await foreach on input.ReadAllAsync().', 'Write item * 2 to the output writer.', 'Complete the output writer after the loop.'],
      concepts: ['pipeline pattern', 'channel chaining', 'ReadAllAsync', 'WriteAsync'],
    },
    {
      id: 'cs-chan-11',
      title: 'Multiple Consumers',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Launch N consumer tasks that each read from the same channel and collect results into a ConcurrentBag.',
      skeleton: `async Task<ConcurrentBag<int>> MultiConsume(ChannelReader<int> reader, int consumerCount)
{
    // Launch consumerCount tasks, each reading and collecting items
}`,
      solution: `async Task<ConcurrentBag<int>> MultiConsume(ChannelReader<int> reader, int consumerCount)
{
    var bag = new ConcurrentBag<int>();
    var tasks = Enumerable.Range(0, consumerCount).Select(async _ =>
    {
        await foreach (var item in reader.ReadAllAsync())
            bag.Add(item);
    });
    await Task.WhenAll(tasks);
    return bag;
}`,
      hints: ['Multiple consumers can read from a single ChannelReader concurrently.', 'Use ConcurrentBag for thread-safe collection.', 'Launch tasks with LINQ Select and await Task.WhenAll.'],
      concepts: ['multiple consumers', 'ConcurrentBag', 'Task.WhenAll', 'concurrent reads'],
    },
    {
      id: 'cs-chan-12',
      title: 'WaitToReadAsync',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Read items one at a time using WaitToReadAsync and TryRead.',
      skeleton: `async Task<List<int>> ReadManually(ChannelReader<int> reader)
{
    // Use WaitToReadAsync + TryRead loop to collect all items
}`,
      solution: `async Task<List<int>> ReadManually(ChannelReader<int> reader)
{
    var results = new List<int>();
    while (await reader.WaitToReadAsync())
    {
        while (reader.TryRead(out var item))
            results.Add(item);
    }
    return results;
}`,
      hints: ['WaitToReadAsync returns true when items are available or may become available.', 'TryRead attempts to read synchronously.', 'The outer while uses WaitToReadAsync, the inner uses TryRead.'],
      concepts: ['WaitToReadAsync', 'TryRead', 'manual read loop'],
    },
    {
      id: 'cs-chan-13',
      title: 'Missing Complete Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the producer that causes the consumer to hang forever.',
      skeleton: `async Task Produce(ChannelWriter<string> writer)
{
    await writer.WriteAsync("hello");
    await writer.WriteAsync("world");
    // Bug: consumer hangs because channel is never completed
}

async Task Consume(ChannelReader<string> reader)
{
    await foreach (var msg in reader.ReadAllAsync())
        Console.WriteLine(msg);
}`,
      solution: `async Task Produce(ChannelWriter<string> writer)
{
    await writer.WriteAsync("hello");
    await writer.WriteAsync("world");
    writer.Complete();
}

async Task Consume(ChannelReader<string> reader)
{
    await foreach (var msg in reader.ReadAllAsync())
        Console.WriteLine(msg);
}`,
      hints: ['ReadAllAsync only finishes when the writer is completed.', 'Without Complete(), the consumer waits forever.', 'Add writer.Complete() after the last write.'],
      concepts: ['ChannelWriter.Complete', 'deadlock', 'channel completion'],
    },
    {
      id: 'cs-chan-14',
      title: 'Writing After Complete',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the code that throws ChannelClosedException.',
      skeleton: `var channel = Channel.CreateUnbounded<int>();
channel.Writer.Complete();
await channel.Writer.WriteAsync(1);  // throws!`,
      solution: `var channel = Channel.CreateUnbounded<int>();
await channel.Writer.WriteAsync(1);
channel.Writer.Complete();`,
      hints: ['You cannot write after calling Complete().', 'Move Complete() to after the write.', 'Always write all items before completing.'],
      concepts: ['ChannelClosedException', 'Complete', 'write ordering'],
    },
    {
      id: 'cs-chan-15',
      title: 'SingleWriter Violation',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix the channel options that allow multiple producers to write safely.',
      skeleton: `var channel = Channel.CreateBounded<int>(new BoundedChannelOptions(100)
{
    SingleWriter = true  // Bug: we have multiple producers!
});

// Two producers writing concurrently
Task.Run(() => ProduceRange(channel.Writer, 1, 50));
Task.Run(() => ProduceRange(channel.Writer, 51, 100));`,
      solution: `var channel = Channel.CreateBounded<int>(new BoundedChannelOptions(100)
{
    SingleWriter = false
});

// Two producers writing concurrently
Task.Run(() => ProduceRange(channel.Writer, 1, 50));
Task.Run(() => ProduceRange(channel.Writer, 51, 100));`,
      hints: ['SingleWriter = true is an optimization hint for single-producer scenarios.', 'With multiple producers, this can cause data corruption.', 'Set SingleWriter = false when using concurrent writers.'],
      concepts: ['SingleWriter', 'thread safety', 'BoundedChannelOptions'],
    },
    {
      id: 'cs-chan-16',
      title: 'Predict Unbounded Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the output of this channel producer-consumer.',
      skeleton: `var ch = Channel.CreateUnbounded<int>();
await ch.Writer.WriteAsync(10);
await ch.Writer.WriteAsync(20);
ch.Writer.Complete();

await foreach (var item in ch.Reader.ReadAllAsync())
    Console.Write(item + " ");`,
      solution: `10 20 `,
      hints: ['Items are read in FIFO order.', 'The channel is completed after writing 10 and 20.', 'Console.Write outputs each item followed by a space.'],
      concepts: ['FIFO ordering', 'ReadAllAsync', 'channel output'],
    },
    {
      id: 'cs-chan-17',
      title: 'Predict TryWrite on Full Channel',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the result of TryWrite on a full bounded channel.',
      skeleton: `var ch = Channel.CreateBounded<int>(new BoundedChannelOptions(2)
{
    FullMode = BoundedChannelFullMode.DropWrite
});
Console.WriteLine(ch.Writer.TryWrite(1));
Console.WriteLine(ch.Writer.TryWrite(2));
Console.WriteLine(ch.Writer.TryWrite(3));`,
      solution: `True
True
True`,
      hints: ['DropWrite mode drops the incoming item when the channel is full.', 'TryWrite still returns true in DropWrite mode because it does not fail.', 'All three TryWrite calls return true.'],
      concepts: ['TryWrite', 'DropWrite', 'BoundedChannelFullMode'],
    },
    {
      id: 'cs-chan-18',
      title: 'Predict Count After DropOldest',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Predict how many items remain after writes to a DropOldest channel.',
      skeleton: `var ch = Channel.CreateBounded<int>(new BoundedChannelOptions(2)
{
    FullMode = BoundedChannelFullMode.DropOldest
});
ch.Writer.TryWrite(1);
ch.Writer.TryWrite(2);
ch.Writer.TryWrite(3);
ch.Writer.Complete();

var items = new List<int>();
await foreach (var i in ch.Reader.ReadAllAsync())
    items.Add(i);
Console.WriteLine(string.Join(",", items));`,
      solution: `2,3`,
      hints: ['Capacity is 2. After writing 1 and 2, the buffer is full.', 'Writing 3 with DropOldest drops 1 (the oldest).', 'The remaining items are 2 and 3.'],
      concepts: ['DropOldest', 'bounded capacity', 'buffer overflow'],
    },
    {
      id: 'cs-chan-19',
      title: 'Refactor to Channel Pipeline',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Refactor a synchronous list-based pipeline to use channels.',
      skeleton: `List<int> Process(List<int> input)
{
    // Stage 1: filter evens
    var evens = new List<int>();
    foreach (var n in input)
        if (n % 2 == 0) evens.Add(n);
    // Stage 2: double them
    var doubled = new List<int>();
    foreach (var n in evens)
        doubled.Add(n * 2);
    return doubled;
}`,
      solution: `async Task<List<int>> Process(List<int> input)
{
    var filterChannel = Channel.CreateUnbounded<int>();
    var doubleChannel = Channel.CreateUnbounded<int>();

    var producer = Task.Run(async () =>
    {
        foreach (var n in input)
            await filterChannel.Writer.WriteAsync(n);
        filterChannel.Writer.Complete();
    });

    var filter = Task.Run(async () =>
    {
        await foreach (var n in filterChannel.Reader.ReadAllAsync())
            if (n % 2 == 0) await doubleChannel.Writer.WriteAsync(n);
        doubleChannel.Writer.Complete();
    });

    var results = new List<int>();
    await foreach (var n in doubleChannel.Reader.ReadAllAsync())
        results.Add(n * 2);

    await Task.WhenAll(producer, filter);
    return results;
}`,
      hints: ['Create a channel between each pipeline stage.', 'Each stage reads from one channel and writes to the next.', 'Complete each writer when the stage is done.'],
      concepts: ['pipeline pattern', 'channel chaining', 'async pipeline'],
    },
    {
      id: 'cs-chan-20',
      title: 'Refactor Polling to Channel',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor a polling loop into a channel-based push model.',
      skeleton: `// Polling approach
async Task<string?> PollForMessage(Queue<string> queue)
{
    while (true)
    {
        if (queue.Count > 0)
            return queue.Dequeue();
        await Task.Delay(100);  // wasteful polling
    }
}`,
      solution: `// Channel-based push approach
async Task<string> WaitForMessage(ChannelReader<string> reader)
{
    return await reader.ReadAsync();
}`,
      hints: ['Channels eliminate the need for polling loops.', 'ReadAsync waits efficiently until an item is available.', 'Replace the Queue with a ChannelReader.'],
      concepts: ['polling vs push', 'ReadAsync', 'efficient waiting'],
    },
  ],
};
