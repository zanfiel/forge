import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-io-streams',
  title: '31. I/O & Streams',
  explanation: `## I/O & Streams

The \`Stream\` class is the abstract base for all byte-oriented I/O in .NET. Specialized readers and writers add text and binary support on top.

\`\`\`csharp
// Reading text from a file
using var reader = new StreamReader("data.txt", Encoding.UTF8);
string content = await reader.ReadToEndAsync();

// Writing text to a file
using var writer = new StreamWriter("output.txt");
await writer.WriteLineAsync("Hello, streams!");
\`\`\`

### MemoryStream

\`\`\`csharp
using var ms = new MemoryStream();
using var sw = new StreamWriter(ms, leaveOpen: true);
sw.Write("in-memory");
sw.Flush();
byte[] bytes = ms.ToArray();
\`\`\`

### Binary I/O

\`\`\`csharp
using var fs = new FileStream("data.bin", FileMode.Create);
using var bw = new BinaryWriter(fs);
bw.Write(42);
bw.Write(3.14);
bw.Write("hello");
\`\`\`

### Async Copy

\`\`\`csharp
using var source = File.OpenRead("big.dat");
using var dest = File.Create("copy.dat");
await source.CopyToAsync(dest);
\`\`\`

Always dispose streams to release file handles. Use \`using\` or \`await using\` for automatic cleanup.`,
  exercises: [
    {
      id: 'cs-ios-1',
      title: 'StreamReader ReadToEnd',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Read all text from a stream reader.',
      skeleton: `using var reader = new StreamReader("file.txt");
string content = reader.__BLANK__();`,
      solution: `using var reader = new StreamReader("file.txt");
string content = reader.ReadToEnd();`,
      hints: ['This method reads the entire stream as a string.', 'It reads from the current position to the end.', 'The answer is: ReadToEnd'],
      concepts: ['StreamReader', 'ReadToEnd'],
    },
    {
      id: 'cs-ios-2',
      title: 'StreamWriter WriteLine',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a line of text to a file.',
      skeleton: `using var writer = new __BLANK__("output.txt");
writer.WriteLine("Hello, world!");`,
      solution: `using var writer = new StreamWriter("output.txt");
writer.WriteLine("Hello, world!");`,
      hints: ['This class wraps a stream for text output.', 'It inherits from TextWriter.', 'The answer is: StreamWriter'],
      concepts: ['StreamWriter', 'text output'],
    },
    {
      id: 'cs-ios-3',
      title: 'MemoryStream ToArray',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Get the bytes from a MemoryStream.',
      skeleton: `using var ms = new MemoryStream();
ms.Write(new byte[] { 1, 2, 3 });
byte[] data = ms.__BLANK__();`,
      solution: `using var ms = new MemoryStream();
ms.Write(new byte[] { 1, 2, 3 });
byte[] data = ms.ToArray();`,
      hints: ['This method returns the stream contents as a byte array.', 'It returns all written bytes regardless of position.', 'The answer is: ToArray'],
      concepts: ['MemoryStream', 'ToArray', 'byte array'],
    },
    {
      id: 'cs-ios-4',
      title: 'BinaryWriter Write',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write binary data to a stream.',
      skeleton: `using var fs = new FileStream("data.bin", FileMode.Create);
using var bw = new __BLANK__(fs);
bw.Write(42);
bw.Write(true);`,
      solution: `using var fs = new FileStream("data.bin", FileMode.Create);
using var bw = new BinaryWriter(fs);
bw.Write(42);
bw.Write(true);`,
      hints: ['This class writes primitive types as binary.', 'It wraps any Stream for binary output.', 'The answer is: BinaryWriter'],
      concepts: ['BinaryWriter', 'binary I/O'],
    },
    {
      id: 'cs-ios-5',
      title: 'Async CopyTo',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Copy one stream to another asynchronously.',
      skeleton: `using var source = File.OpenRead("input.dat");
using var dest = File.Create("output.dat");
await source.__BLANK__(dest);`,
      solution: `using var source = File.OpenRead("input.dat");
using var dest = File.Create("output.dat");
await source.CopyToAsync(dest);`,
      hints: ['This async method copies all bytes from one stream to another.', 'It takes the destination stream as a parameter.', 'The answer is: CopyToAsync'],
      concepts: ['CopyToAsync', 'async I/O', 'stream copy'],
    },
    {
      id: 'cs-ios-6',
      title: 'Encoding Specification',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Specify UTF-8 encoding for a StreamReader.',
      skeleton: `using var reader = new StreamReader("file.txt", Encoding.__BLANK__);`,
      solution: `using var reader = new StreamReader("file.txt", Encoding.UTF8);`,
      hints: ['The Encoding class provides static properties for common encodings.', 'UTF-8 is the most common encoding for text files.', 'The answer is: UTF8'],
      concepts: ['Encoding', 'UTF8', 'StreamReader encoding'],
    },
    {
      id: 'cs-ios-7',
      title: 'Read Lines from Stream',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Read all lines from a StreamReader into a list.',
      skeleton: `List<string> ReadAllLines(StreamReader reader)
{
    // Read line by line until null, return list of lines
}`,
      solution: `List<string> ReadAllLines(StreamReader reader)
{
    var lines = new List<string>();
    string? line;
    while ((line = reader.ReadLine()) != null)
        lines.Add(line);
    return lines;
}`,
      hints: ['ReadLine() returns null at end of stream.', 'Loop with while, checking for null.', 'Add each non-null line to the list.'],
      concepts: ['ReadLine', 'line-by-line reading', 'null check'],
    },
    {
      id: 'cs-ios-8',
      title: 'Write Bytes to MemoryStream',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a string to a MemoryStream and return the bytes.',
      skeleton: `byte[] StringToBytes(string text)
{
    // Write text to a MemoryStream using StreamWriter, return bytes
}`,
      solution: `byte[] StringToBytes(string text)
{
    using var ms = new MemoryStream();
    using var sw = new StreamWriter(ms, leaveOpen: true);
    sw.Write(text);
    sw.Flush();
    return ms.ToArray();
}`,
      hints: ['Create a MemoryStream and wrap it with StreamWriter.', 'Use leaveOpen: true so disposing the writer does not close the stream.', 'Flush the writer before calling ToArray.'],
      concepts: ['MemoryStream', 'StreamWriter', 'leaveOpen', 'Flush'],
    },
    {
      id: 'cs-ios-9',
      title: 'BinaryReader Round-Trip',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write and read an int and a string using binary streams.',
      skeleton: `(int, string) RoundTrip(int number, string text)
{
    // Write to MemoryStream with BinaryWriter, rewind, read back with BinaryReader
}`,
      solution: `(int, string) RoundTrip(int number, string text)
{
    using var ms = new MemoryStream();
    using var bw = new BinaryWriter(ms, Encoding.UTF8, leaveOpen: true);
    bw.Write(number);
    bw.Write(text);
    bw.Flush();

    ms.Position = 0;
    using var br = new BinaryReader(ms, Encoding.UTF8);
    return (br.ReadInt32(), br.ReadString());
}`,
      hints: ['BinaryWriter.Write handles int and string overloads.', 'Reset Position to 0 before reading.', 'BinaryReader.ReadInt32() and ReadString() read in the same order.'],
      concepts: ['BinaryWriter', 'BinaryReader', 'stream position', 'round-trip'],
    },
    {
      id: 'cs-ios-10',
      title: 'BufferedStream Wrapper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Wrap a FileStream in a BufferedStream for efficient reading.',
      skeleton: `async Task<byte[]> ReadBuffered(string path, int bufferSize)
{
    // Open file, wrap in BufferedStream, read all bytes into a MemoryStream
}`,
      solution: `async Task<byte[]> ReadBuffered(string path, int bufferSize)
{
    using var fs = new FileStream(path, FileMode.Open, FileAccess.Read);
    using var bs = new BufferedStream(fs, bufferSize);
    using var ms = new MemoryStream();
    await bs.CopyToAsync(ms);
    return ms.ToArray();
}`,
      hints: ['BufferedStream wraps another stream with a buffer.', 'Pass the buffer size to the constructor.', 'CopyToAsync transfers all data to the MemoryStream.'],
      concepts: ['BufferedStream', 'buffer size', 'CopyToAsync'],
    },
    {
      id: 'cs-ios-11',
      title: 'Async ReadToEnd',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Read all text from a stream asynchronously.',
      skeleton: `async Task<string> ReadAllTextAsync(Stream stream)
{
    // Wrap stream in StreamReader and read asynchronously
}`,
      solution: `async Task<string> ReadAllTextAsync(Stream stream)
{
    using var reader = new StreamReader(stream, leaveOpen: true);
    return await reader.ReadToEndAsync();
}`,
      hints: ['Wrap the stream in a StreamReader.', 'Use ReadToEndAsync for async reading.', 'Use leaveOpen: true to avoid disposing the underlying stream.'],
      concepts: ['ReadToEndAsync', 'async I/O', 'leaveOpen'],
    },
    {
      id: 'cs-ios-12',
      title: 'Seekable Stream Position',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write data, seek to a position, and overwrite specific bytes.',
      skeleton: `byte[] WriteAndPatch(byte original, byte patch, int patchOffset, int totalSize)
{
    // Fill MemoryStream with 'original' byte, seek to patchOffset, write 'patch'
}`,
      solution: `byte[] WriteAndPatch(byte original, byte patch, int patchOffset, int totalSize)
{
    using var ms = new MemoryStream();
    for (int i = 0; i < totalSize; i++)
        ms.WriteByte(original);
    ms.Seek(patchOffset, SeekOrigin.Begin);
    ms.WriteByte(patch);
    return ms.ToArray();
}`,
      hints: ['Use WriteByte in a loop to fill the stream.', 'Seek sets the position using SeekOrigin.Begin.', 'Writing at a position overwrites the existing byte.'],
      concepts: ['Seek', 'SeekOrigin', 'WriteByte', 'stream position'],
    },
    {
      id: 'cs-ios-13',
      title: 'Missing Flush Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the code that produces an empty byte array.',
      skeleton: `byte[] GetBytes()
{
    var ms = new MemoryStream();
    var sw = new StreamWriter(ms, leaveOpen: true);
    sw.Write("hello");
    // Bug: ToArray returns empty because StreamWriter buffer not flushed
    return ms.ToArray();
}`,
      solution: `byte[] GetBytes()
{
    var ms = new MemoryStream();
    var sw = new StreamWriter(ms, leaveOpen: true);
    sw.Write("hello");
    sw.Flush();
    return ms.ToArray();
}`,
      hints: ['StreamWriter buffers data internally.', 'Call Flush() to write buffered data to the underlying stream.', 'Without Flush, the MemoryStream has no data.'],
      concepts: ['Flush', 'StreamWriter buffering', 'MemoryStream'],
    },
    {
      id: 'cs-ios-14',
      title: 'Disposed Stream Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the code that throws ObjectDisposedException.',
      skeleton: `byte[] Convert(string text)
{
    var ms = new MemoryStream();
    using (var sw = new StreamWriter(ms))
    {
        sw.Write(text);
    }
    // Bug: StreamWriter disposed ms too!
    return ms.ToArray();
}`,
      solution: `byte[] Convert(string text)
{
    var ms = new MemoryStream();
    using (var sw = new StreamWriter(ms, Encoding.UTF8, -1, leaveOpen: true))
    {
        sw.Write(text);
    }
    return ms.ToArray();
}`,
      hints: ['By default, disposing StreamWriter also disposes the underlying stream.', 'Use the leaveOpen parameter to keep the stream alive.', 'The constructor overload with leaveOpen: true prevents this.'],
      concepts: ['leaveOpen', 'ObjectDisposedException', 'stream ownership'],
    },
    {
      id: 'cs-ios-15',
      title: 'Position Not Reset Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the code that reads zero bytes from the MemoryStream.',
      skeleton: `string ReadBack(string text)
{
    var ms = new MemoryStream();
    var bytes = Encoding.UTF8.GetBytes(text);
    ms.Write(bytes, 0, bytes.Length);
    // Bug: position is at end, reader reads nothing
    using var reader = new StreamReader(ms);
    return reader.ReadToEnd();
}`,
      solution: `string ReadBack(string text)
{
    var ms = new MemoryStream();
    var bytes = Encoding.UTF8.GetBytes(text);
    ms.Write(bytes, 0, bytes.Length);
    ms.Position = 0;
    using var reader = new StreamReader(ms);
    return reader.ReadToEnd();
}`,
      hints: ['After writing, the stream position is at the end.', 'Set Position = 0 to read from the beginning.', 'StreamReader reads from the current position.'],
      concepts: ['stream position', 'MemoryStream', 'Position reset'],
    },
    {
      id: 'cs-ios-16',
      title: 'Predict MemoryStream Length',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the length of a MemoryStream after writes.',
      skeleton: `var ms = new MemoryStream();
ms.WriteByte(0xFF);
ms.WriteByte(0xAB);
ms.WriteByte(0x00);
Console.WriteLine(ms.Length);
Console.WriteLine(ms.Position);`,
      solution: `3
3`,
      hints: ['Each WriteByte adds one byte.', 'Length and Position both advance by 1 per write.', 'After 3 writes: Length = 3, Position = 3.'],
      concepts: ['MemoryStream.Length', 'Position', 'WriteByte'],
    },
    {
      id: 'cs-ios-17',
      title: 'Predict Seek Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict what happens when reading after seek.',
      skeleton: `var ms = new MemoryStream(new byte[] { 10, 20, 30, 40, 50 });
ms.Seek(2, SeekOrigin.Begin);
Console.WriteLine(ms.ReadByte());
Console.WriteLine(ms.Position);`,
      solution: `30
3`,
      hints: ['Seek(2, Begin) moves to index 2.', 'ReadByte reads byte at index 2, which is 30.', 'After reading, position advances to 3.'],
      concepts: ['Seek', 'ReadByte', 'stream position'],
    },
    {
      id: 'cs-ios-18',
      title: 'Predict BinaryWriter Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the number of bytes written by BinaryWriter.',
      skeleton: `var ms = new MemoryStream();
var bw = new BinaryWriter(ms);
bw.Write(42);       // int = 4 bytes
bw.Write(true);     // bool = 1 byte
bw.Write((short)7); // short = 2 bytes
bw.Flush();
Console.WriteLine(ms.Length);`,
      solution: `7`,
      hints: ['int is 4 bytes, bool is 1 byte, short is 2 bytes.', '4 + 1 + 2 = 7.', 'BinaryWriter writes the raw binary representation.'],
      concepts: ['BinaryWriter', 'type sizes', 'binary representation'],
    },
    {
      id: 'cs-ios-19',
      title: 'Refactor to Using Declaration',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Refactor nested using blocks to using declarations.',
      skeleton: `string ReadFile(string path)
{
    using (var fs = new FileStream(path, FileMode.Open))
    {
        using (var reader = new StreamReader(fs))
        {
            return reader.ReadToEnd();
        }
    }
}`,
      solution: `string ReadFile(string path)
{
    using var fs = new FileStream(path, FileMode.Open);
    using var reader = new StreamReader(fs);
    return reader.ReadToEnd();
}`,
      hints: ['C# 8 using declarations eliminate nested braces.', 'The variable is disposed at the end of the enclosing scope.', 'Remove the braces and keep the using keyword.'],
      concepts: ['using declaration', 'C# 8', 'stream disposal'],
    },
    {
      id: 'cs-ios-20',
      title: 'Refactor to Async Streams',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Refactor synchronous line reading to an async enumerable.',
      skeleton: `List<string> ReadLines(string path)
{
    var lines = new List<string>();
    using var reader = new StreamReader(path);
    string? line;
    while ((line = reader.ReadLine()) != null)
        lines.Add(line);
    return lines;
}`,
      solution: `async IAsyncEnumerable<string> ReadLines(string path)
{
    using var reader = new StreamReader(path);
    string? line;
    while ((line = await reader.ReadLineAsync()) != null)
        yield return line;
}`,
      hints: ['IAsyncEnumerable allows streaming results with yield return.', 'Use ReadLineAsync instead of ReadLine.', 'The caller can use await foreach to consume lines.'],
      concepts: ['IAsyncEnumerable', 'yield return', 'ReadLineAsync', 'async streams'],
    },
  ],
};
