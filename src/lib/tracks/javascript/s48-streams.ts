import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-streams',
  title: '48. Streams',
  explanation: `## Streams

The Web Streams API provides a standard way to handle streaming data in JavaScript -- reading, writing, and transforming data incrementally without loading everything into memory.

\`\`\`javascript
// ReadableStream -- a source of data
const readable = new ReadableStream({
  start(controller) {
    controller.enqueue('chunk 1');
    controller.enqueue('chunk 2');
    controller.close();
  },
});

// WritableStream -- a sink for data
const writable = new WritableStream({
  write(chunk) { console.log('Received:', chunk); },
  close() { console.log('Done'); },
});

// TransformStream -- transforms data passing through
const upper = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk.toUpperCase());
  },
});

// Piping: readable -> transform -> writable
readable.pipeThrough(upper).pipeTo(writable);

// Reading manually
const reader = readable.getReader();
const { value, done } = await reader.read();

// Fetch streaming
const response = await fetch(url);
const reader = response.body.getReader();
\`\`\`

Streams enable processing large datasets, real-time data, and network responses without buffering everything in memory.`,
  exercises: [
    {
      id: 'js-streams-1',
      title: 'ReadableStream Basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to create and read from a ReadableStream.',
      skeleton: `const stream = new __BLANK__({
  start(controller) {
    controller.__BLANK__('Hello');
    controller.__BLANK__('World');
    controller.__BLANK__();
  },
});

const reader = stream.__BLANK__();
const chunk1 = await reader.__BLANK__(); // { value: 'Hello', done: false }
const chunk2 = await reader.read();      // { value: 'World', done: false }
const end = await reader.read();         // { value: undefined, done: true }`,
      solution: `const stream = new ReadableStream({
  start(controller) {
    controller.enqueue('Hello');
    controller.enqueue('World');
    controller.close();
  },
});

const reader = stream.getReader();
const chunk1 = await reader.read(); // { value: 'Hello', done: false }
const chunk2 = await reader.read(); // { value: 'World', done: false }
const end = await reader.read();    // { value: undefined, done: true }`,
      hints: [
        'ReadableStream is the constructor for readable streams.',
        'controller.enqueue() pushes data, controller.close() signals the end.',
        'getReader() returns a reader; read() returns { value, done } promises.',
      ],
      concepts: ['ReadableStream', 'enqueue', 'close', 'getReader', 'read'],
    },
    {
      id: 'js-streams-2',
      title: 'WritableStream Basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to create and write to a WritableStream.',
      skeleton: `const chunks = [];

const stream = new __BLANK__({
  __BLANK__(chunk) {
    chunks.push(chunk);
  },
  __BLANK__() {
    console.log('All done, got', chunks.length, 'chunks');
  },
});

const writer = stream.__BLANK__();
await writer.__BLANK__('Hello');
await writer.write('World');
await writer.__BLANK__();
// chunks: ['Hello', 'World']`,
      solution: `const chunks = [];

const stream = new WritableStream({
  write(chunk) {
    chunks.push(chunk);
  },
  close() {
    console.log('All done, got', chunks.length, 'chunks');
  },
});

const writer = stream.getWriter();
await writer.write('Hello');
await writer.write('World');
await writer.close();
// chunks: ['Hello', 'World']`,
      hints: [
        'WritableStream accepts an object with write() and close() methods.',
        'getWriter() returns a writer that can write chunks and close the stream.',
        'Each write() call triggers the write handler with the chunk.',
      ],
      concepts: ['WritableStream', 'write', 'close', 'getWriter'],
    },
    {
      id: 'js-streams-3',
      title: 'TransformStream',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Create a TransformStream that converts all text chunks to uppercase.',
      skeleton: `function createUpperCaseTransform() {
  // Return a TransformStream that uppercases each string chunk



}

// Usage:
// const transform = createUpperCaseTransform();
// readable.pipeThrough(transform).pipeTo(writable);`,
      solution: `function createUpperCaseTransform() {
  return new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(chunk.toUpperCase());
    },
  });
}

// Usage:
// const transform = createUpperCaseTransform();
// readable.pipeThrough(transform).pipeTo(writable);`,
      hints: [
        'TransformStream takes an object with a transform(chunk, controller) method.',
        'Call controller.enqueue() to pass the transformed chunk downstream.',
        'The stream automatically handles backpressure.',
      ],
      concepts: ['TransformStream', 'transform', 'enqueue', 'text processing'],
    },
    {
      id: 'js-streams-4',
      title: 'Read Loop',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function that reads all chunks from a ReadableStream and returns them as an array.',
      skeleton: `async function readAll(stream) {
  // Read all chunks from the stream into an array
  // Return the array when the stream is done



}

// Usage:
// const chunks = await readAll(someReadableStream);`,
      solution: `async function readAll(stream) {
  const reader = stream.getReader();
  const chunks = [];

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  reader.releaseLock();
  return chunks;
}

// Usage:
// const chunks = await readAll(someReadableStream);`,
      hints: [
        'Get a reader with stream.getReader().',
        'Loop with while(true), reading until done is true.',
        'Always call reader.releaseLock() after you are done reading.',
      ],
      concepts: ['read loop', 'getReader', 'releaseLock', 'async iteration'],
    },
    {
      id: 'js-streams-5',
      title: 'pipeThrough and pipeTo',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Create a pipeline that reads a stream, transforms chunks through multiple transforms, and writes to a destination.',
      skeleton: `function createPipeline(source, transforms, destination) {
  // Pipe source through all transforms, then to destination
  // transforms is an array of TransformStream instances
  // Return the pipeTo promise



}

// Usage:
// const upper = new TransformStream({ transform(c, ctrl) { ctrl.enqueue(c.toUpperCase()); } });
// const prefix = new TransformStream({ transform(c, ctrl) { ctrl.enqueue('>> ' + c); } });
// await createPipeline(readable, [upper, prefix], writable);`,
      solution: `function createPipeline(source, transforms, destination) {
  let stream = source;
  for (const transform of transforms) {
    stream = stream.pipeThrough(transform);
  }
  return stream.pipeTo(destination);
}

// Usage:
// const upper = new TransformStream({ transform(c, ctrl) { ctrl.enqueue(c.toUpperCase()); } });
// const prefix = new TransformStream({ transform(c, ctrl) { ctrl.enqueue('>> ' + c); } });
// await createPipeline(readable, [upper, prefix], writable);`,
      hints: [
        'pipeThrough returns a new ReadableStream -- chain them in a loop.',
        'pipeTo sends the final stream to the writable destination.',
        'The pipeline propagates backpressure automatically.',
      ],
      concepts: ['pipeThrough', 'pipeTo', 'stream pipeline', 'composition'],
    },
    {
      id: 'js-streams-6',
      title: 'tee() -- Split a Stream',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Use tee() to split a stream into two and process each branch differently.',
      skeleton: `async function processAndLog(source) {
  // Split the source stream into two branches:
  // 1. First branch: collect all chunks into an array
  // 2. Second branch: count the chunks
  // Return: { data: chunk[], count: number }



}

// Usage:
// const { data, count } = await processAndLog(readableStream);`,
      solution: `async function processAndLog(source) {
  const [branch1, branch2] = source.tee();

  const dataPromise = (async () => {
    const reader = branch1.getReader();
    const chunks = [];
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    return chunks;
  })();

  const countPromise = (async () => {
    const reader = branch2.getReader();
    let count = 0;
    while (true) {
      const { done } = await reader.read();
      if (done) break;
      count++;
    }
    return count;
  })();

  const [data, count] = await Promise.all([dataPromise, countPromise]);
  return { data, count };
}

// Usage:
// const { data, count } = await processAndLog(readableStream);`,
      hints: [
        'tee() returns an array of two ReadableStreams that both receive the same data.',
        'Process both branches concurrently using Promise.all.',
        'Each branch has its own reader and can be consumed independently.',
      ],
      concepts: ['tee', 'stream splitting', 'concurrent processing'],
    },
    {
      id: 'js-streams-7',
      title: 'Fetch Streaming',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that streams a fetch response and reports download progress.',
      skeleton: `async function fetchWithProgress(url, onProgress) {
  // Fetch the URL and stream the response body
  // Call onProgress({ loaded, total, percent }) as chunks arrive
  // total comes from Content-Length header (may be null)
  // Return the complete response as a Uint8Array



}

// Usage:
// const data = await fetchWithProgress('https://example.com/file', ({ percent }) => {
//   console.log(percent + '% done');
// });`,
      solution: `async function fetchWithProgress(url, onProgress) {
  const response = await fetch(url);
  const total = Number(response.headers.get('Content-Length')) || null;
  const reader = response.body.getReader();
  const chunks = [];
  let loaded = 0;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    chunks.push(value);
    loaded += value.byteLength;
    const percent = total ? Math.round((loaded / total) * 100) : null;
    onProgress({ loaded, total, percent });
  }

  const result = new Uint8Array(loaded);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return result;
}

// Usage:
// const data = await fetchWithProgress('https://example.com/file', ({ percent }) => {
//   console.log(percent + '% done');
// });`,
      hints: [
        'response.body is a ReadableStream of Uint8Array chunks.',
        'Get total size from Content-Length header if available.',
        'Concatenate chunks into a single Uint8Array at the end.',
      ],
      concepts: ['fetch streaming', 'download progress', 'Content-Length', 'Uint8Array'],
    },
    {
      id: 'js-streams-8',
      title: 'Async Generator to Stream',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that converts an async generator into a ReadableStream.',
      skeleton: `function fromAsyncGenerator(gen) {
  // Convert an async generator (or its output) into a ReadableStream
  // The stream should enqueue each yielded value and close when done



}

// Usage:
// async function* numbers() {
//   for (let i = 0; i < 5; i++) {
//     await new Promise(r => setTimeout(r, 100));
//     yield i;
//   }
// }
// const stream = fromAsyncGenerator(numbers());`,
      solution: `function fromAsyncGenerator(gen) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await gen.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

// Usage:
// async function* numbers() {
//   for (let i = 0; i < 5; i++) {
//     await new Promise(r => setTimeout(r, 100));
//     yield i;
//   }
// }
// const stream = fromAsyncGenerator(numbers());`,
      hints: [
        'Use the pull() strategy -- the stream calls pull() when it needs more data.',
        'Call gen.next() to get the next value from the generator.',
        'When done is true, call controller.close() to end the stream.',
      ],
      concepts: ['async generator', 'ReadableStream', 'pull strategy', 'conversion'],
    },
    {
      id: 'js-streams-9',
      title: 'TextEncoderStream / TextDecoderStream',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the blanks to encode and decode text using stream transforms.',
      skeleton: `// Encode strings to UTF-8 bytes
const encoder = new __BLANK__();

// Decode UTF-8 bytes to strings
const decoder = new __BLANK__();

// Pipeline: string stream -> encode to bytes -> decode back to strings
const source = new ReadableStream({
  start(c) {
    c.enqueue('Hello ');
    c.enqueue('Stream!');
    c.close();
  },
});

const result = [];
await source
  .__BLANK__(encoder)   // strings -> Uint8Array
  .__BLANK__(decoder)   // Uint8Array -> strings
  .pipeTo(new WritableStream({
    write(chunk) { result.push(chunk); },
  }));`,
      solution: `// Encode strings to UTF-8 bytes
const encoder = new TextEncoderStream();

// Decode UTF-8 bytes to strings
const decoder = new TextDecoderStream();

// Pipeline: string stream -> encode to bytes -> decode back to strings
const source = new ReadableStream({
  start(c) {
    c.enqueue('Hello ');
    c.enqueue('Stream!');
    c.close();
  },
});

const result = [];
await source
  .pipeThrough(encoder)   // strings -> Uint8Array
  .pipeThrough(decoder)   // Uint8Array -> strings
  .pipeTo(new WritableStream({
    write(chunk) { result.push(chunk); },
  }));`,
      hints: [
        'TextEncoderStream converts strings to UTF-8 Uint8Array chunks.',
        'TextDecoderStream converts Uint8Array chunks back to strings.',
        'Use pipeThrough() to pass through a TransformStream.',
      ],
      concepts: ['TextEncoderStream', 'TextDecoderStream', 'pipeThrough', 'encoding'],
    },
    {
      id: 'js-streams-10',
      title: 'CompressionStream',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that compresses data using CompressionStream and decompresses it back.',
      skeleton: `async function compressText(text) {
  // Convert text to bytes, compress with gzip, return compressed Uint8Array



}

async function decompressToText(compressed) {
  // Decompress gzip bytes and convert back to text string



}

// Usage:
// const compressed = await compressText('Hello, World!');
// const original = await decompressToText(compressed); // 'Hello, World!'`,
      solution: `async function compressText(text) {
  const blob = new Blob([text]);
  const stream = blob.stream().pipeThrough(new CompressionStream('gzip'));
  const reader = stream.getReader();
  const chunks = [];
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  const totalLength = chunks.reduce((sum, c) => sum + c.byteLength, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return result;
}

async function decompressToText(compressed) {
  const blob = new Blob([compressed]);
  const stream = blob.stream().pipeThrough(new DecompressionStream('gzip'));
  const reader = stream.pipeThrough(new TextDecoderStream()).getReader();
  let text = '';
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    text += value;
  }
  return text;
}

// Usage:
// const compressed = await compressText('Hello, World!');
// const original = await decompressToText(compressed); // 'Hello, World!'`,
      hints: [
        'Create a Blob from the text, get its stream, and pipe through CompressionStream("gzip").',
        'For decompression, pipe through DecompressionStream("gzip").',
        'Chain a TextDecoderStream to convert bytes back to strings.',
      ],
      concepts: ['CompressionStream', 'DecompressionStream', 'gzip', 'Blob'],
    },
    {
      id: 'js-streams-11',
      title: 'Custom Transform: Line Splitter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a TransformStream that splits incoming text chunks on newlines, emitting complete lines.',
      skeleton: `function createLineSplitter() {
  // Create a TransformStream that:
  // 1. Buffers incoming text chunks
  // 2. Splits on '\\n'
  // 3. Enqueues complete lines
  // 4. Flushes remaining buffer on close



}

// Usage:
// Input chunks: 'Hello\\nWor', 'ld\\nBye'
// Output: 'Hello', 'World', 'Bye'`,
      solution: `function createLineSplitter() {
  let buffer = '';

  return new TransformStream({
    transform(chunk, controller) {
      buffer += chunk;
      const lines = buffer.split('\\n');
      buffer = lines.pop();
      for (const line of lines) {
        controller.enqueue(line);
      }
    },
    flush(controller) {
      if (buffer.length > 0) {
        controller.enqueue(buffer);
      }
    },
  });
}

// Usage:
// Input chunks: 'Hello\\nWor', 'ld\\nBye'
// Output: 'Hello', 'World', 'Bye'`,
      hints: [
        'Accumulate chunks in a buffer string.',
        'Split on newlines; the last element may be incomplete, so keep it in the buffer.',
        'flush() is called when the stream closes -- emit any remaining buffered data.',
      ],
      concepts: ['TransformStream', 'line splitting', 'buffering', 'flush'],
    },
    {
      id: 'js-streams-12',
      title: 'Backpressure',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Predict how backpressure affects the behavior of this stream pipeline.',
      skeleton: `let producerCalls = 0;
let consumerCalls = 0;

const source = new ReadableStream({
  pull(controller) {
    producerCalls++;
    controller.enqueue('chunk-' + producerCalls);
    console.log('Produced:', producerCalls);
  },
}, { highWaterMark: 2 });

const sink = new WritableStream({
  async write(chunk) {
    consumerCalls++;
    await new Promise(r => setTimeout(r, 100)); // slow consumer
    console.log('Consumed:', chunk);
  },
}, { highWaterMark: 1 });

// What happens when we pipe?
// How many chunks does the producer generate before the consumer catches up?
await source.pipeTo(sink);`,
      solution: `let producerCalls = 0;
let consumerCalls = 0;

const source = new ReadableStream({
  pull(controller) {
    producerCalls++;
    controller.enqueue('chunk-' + producerCalls);
    console.log('Produced:', producerCalls);
  },
}, { highWaterMark: 2 });

const sink = new WritableStream({
  async write(chunk) {
    consumerCalls++;
    await new Promise(r => setTimeout(r, 100));
    console.log('Consumed:', chunk);
  },
}, { highWaterMark: 1 });

// The producer fills up to the highWaterMark (2 chunks in the readable queue).
// Then backpressure pauses pull() until the consumer drains items.
// Pattern: Produced 1, Produced 2, Consumed chunk-1, Produced 3, Consumed chunk-2, ...
// The producer stays ~2 chunks ahead of the consumer -- never runs away.`,
      hints: [
        'highWaterMark controls how many chunks can queue before backpressure kicks in.',
        'pull() is only called when the internal queue has room.',
        'The slow consumer causes the producer to pause after filling the buffer.',
      ],
      concepts: ['backpressure', 'highWaterMark', 'flow control', 'pull strategy'],
    },
    {
      id: 'js-streams-13',
      title: 'Error Handling in Streams',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that reads from a stream with proper error handling and cleanup.',
      skeleton: `async function safeRead(stream, process) {
  // Read from stream, calling process(chunk) for each chunk
  // Handle errors gracefully:
  //   - If process throws, cancel the stream and rethrow
  //   - If the stream errors, catch and return the error
  // Always release the reader lock
  // Return: { ok: true, count } or { ok: false, error, count }



}

// Usage:
// const result = await safeRead(stream, (chunk) => {
//   if (chunk === 'bad') throw new Error('Bad data');
//   console.log(chunk);
// });`,
      solution: `async function safeRead(stream, process) {
  const reader = stream.getReader();
  let count = 0;

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      process(value);
      count++;
    }
    return { ok: true, count };
  } catch (error) {
    await reader.cancel(error.message);
    return { ok: false, error: error.message, count };
  } finally {
    reader.releaseLock();
  }
}

// Usage:
// const result = await safeRead(stream, (chunk) => {
//   if (chunk === 'bad') throw new Error('Bad data');
//   console.log(chunk);
// });`,
      hints: [
        'Use try/catch/finally for comprehensive error handling.',
        'reader.cancel() signals the source that we are done and cleans up.',
        'Always call reader.releaseLock() in finally to free the reader.',
      ],
      concepts: ['error handling', 'cancel', 'releaseLock', 'stream cleanup'],
    },
    {
      id: 'js-streams-14',
      title: 'Node Streams vs Web Streams',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the blanks comparing Node.js streams and Web Streams.',
      skeleton: `// Node.js streams (node:stream)
// - __BLANK__: Readable, Writable, Transform, Duplex
// - Event-based: 'data', 'end', 'error' events
// - Pipe: readable.__BLANK__(writable)

// Web Streams (global)
// - __BLANK__: ReadableStream, WritableStream, TransformStream
// - Promise-based: reader.__BLANK__() returns Promise
// - Pipe: readable.__BLANK__(transform).__BLANK__(writable)

// Converting between them (Node 18+)
import { Readable, Writable } from 'node:stream';
const webStream = Readable.__BLANK__(nodeReadable);
const nodeStream = Readable.__BLANK__(webReadable);`,
      solution: `// Node.js streams (node:stream)
// - Classes: Readable, Writable, Transform, Duplex
// - Event-based: 'data', 'end', 'error' events
// - Pipe: readable.pipe(writable)

// Web Streams (global)
// - Classes: ReadableStream, WritableStream, TransformStream
// - Promise-based: reader.read() returns Promise
// - Pipe: readable.pipeThrough(transform).pipeTo(writable)

// Converting between them (Node 18+)
import { Readable, Writable } from 'node:stream';
const webStream = Readable.toWeb(nodeReadable);
const nodeStream = Readable.fromWeb(webReadable);`,
      hints: [
        'Node streams are class-based (Readable, Writable, etc.); Web streams use global constructors.',
        'Node uses .pipe(); Web uses .pipeThrough() for transforms and .pipeTo() for final destination.',
        'Readable.toWeb() and Readable.fromWeb() convert between the two APIs.',
      ],
      concepts: ['Node streams', 'Web Streams', 'pipe', 'pipeThrough', 'toWeb', 'fromWeb'],
    },
    {
      id: 'js-streams-15',
      title: 'Stream Composition',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function that composes multiple TransformStreams into a single TransformStream.',
      skeleton: `function composeTransforms(...transforms) {
  // Return a single TransformStream that is equivalent to
  // piping through all transforms in order
  // Uses the readable/writable pair of the first and last transforms



}

// Usage:
// const combined = composeTransforms(
//   new TransformStream({ transform(c, ctrl) { ctrl.enqueue(c.trim()); } }),
//   new TransformStream({ transform(c, ctrl) { ctrl.enqueue(c.toUpperCase()); } }),
//   new TransformStream({ transform(c, ctrl) { ctrl.enqueue('>> ' + c); } }),
// );
// readable.pipeThrough(combined).pipeTo(writable);`,
      solution: `function composeTransforms(...transforms) {
  if (transforms.length === 0) {
    return new TransformStream();
  }
  if (transforms.length === 1) {
    return transforms[0];
  }

  const first = transforms[0];
  const last = transforms[transforms.length - 1];

  // Chain the internal readable/writable pairs
  let readable = first.readable;
  for (let i = 1; i < transforms.length; i++) {
    readable = readable.pipeThrough(transforms[i]);
  }

  // Return a TransformStream-like object with writable from first, readable from last
  return { writable: first.writable, readable };
}

// Usage:
// const combined = composeTransforms(
//   new TransformStream({ transform(c, ctrl) { ctrl.enqueue(c.trim()); } }),
//   new TransformStream({ transform(c, ctrl) { ctrl.enqueue(c.toUpperCase()); } }),
//   new TransformStream({ transform(c, ctrl) { ctrl.enqueue('>> ' + c); } }),
// );
// readable.pipeThrough(combined).pipeTo(writable);`,
      hints: [
        'A TransformStream has .readable and .writable sides.',
        'Chain by piping each readable through the next transform.',
        'The composed result uses the first writable and the last readable.',
      ],
      concepts: ['stream composition', 'TransformStream', 'readable/writable pair'],
    },
    {
      id: 'js-streams-16',
      title: 'Cancellation with AbortSignal',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that reads from a stream with cancellation support via AbortSignal.',
      skeleton: `async function readWithAbort(stream, signal) {
  // Read from stream until done or signal is aborted
  // Return collected chunks
  // Throw AbortError if cancelled



}

// Usage:
// const ac = new AbortController();
// setTimeout(() => ac.abort(), 1000);
// const chunks = await readWithAbort(stream, ac.signal);`,
      solution: `async function readWithAbort(stream, signal) {
  const reader = stream.getReader();
  const chunks = [];

  try {
    while (true) {
      if (signal?.aborted) {
        await reader.cancel('Aborted');
        throw new DOMException('Aborted', 'AbortError');
      }

      const { value, done } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    return chunks;
  } catch (error) {
    await reader.cancel(error.message).catch(() => {});
    throw error;
  } finally {
    reader.releaseLock();
  }
}

// Usage:
// const ac = new AbortController();
// setTimeout(() => ac.abort(), 1000);
// const chunks = await readWithAbort(stream, ac.signal);`,
      hints: [
        'Check signal.aborted before each read to support cancellation.',
        'Cancel the reader and throw an AbortError when aborted.',
        'Always releaseLock in finally.',
      ],
      concepts: ['AbortSignal', 'cancellation', 'stream reading', 'AbortError'],
    },
    {
      id: 'js-streams-17',
      title: 'JSON Lines Stream',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a TransformStream that parses JSON Lines (newline-delimited JSON) from a text stream.',
      skeleton: `function createJsonLinesParser() {
  // Create a TransformStream that:
  // 1. Accumulates text chunks into a buffer
  // 2. Splits on newlines
  // 3. Parses each complete line as JSON
  // 4. Enqueues parsed objects
  // 5. Handles incomplete lines at chunk boundaries



}

// Usage: textStream.pipeThrough(createJsonLinesParser())
// Input: '{"a":1}\\n{"b":2}\\n'
// Output: { a: 1 }, { b: 2 }`,
      solution: `function createJsonLinesParser() {
  let buffer = '';

  return new TransformStream({
    transform(chunk, controller) {
      buffer += chunk;
      const lines = buffer.split('\\n');
      buffer = lines.pop();

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.length > 0) {
          try {
            controller.enqueue(JSON.parse(trimmed));
          } catch (e) {
            controller.error(new Error('Invalid JSON: ' + trimmed));
          }
        }
      }
    },
    flush(controller) {
      const trimmed = buffer.trim();
      if (trimmed.length > 0) {
        try {
          controller.enqueue(JSON.parse(trimmed));
        } catch (e) {
          controller.error(new Error('Invalid JSON: ' + trimmed));
        }
      }
    },
  });
}

// Usage: textStream.pipeThrough(createJsonLinesParser())
// Input: '{"a":1}\\n{"b":2}\\n'
// Output: { a: 1 }, { b: 2 }`,
      hints: [
        'Buffer incoming chunks and split on newlines, keeping the last partial line.',
        'Parse each complete line as JSON and enqueue the result.',
        'In flush(), handle any remaining buffered data.',
      ],
      concepts: ['JSON Lines', 'NDJSON', 'TransformStream', 'parsing', 'buffering'],
    },
    {
      id: 'js-streams-18',
      title: 'Throttled Stream',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a TransformStream that throttles throughput, adding a delay between each chunk.',
      skeleton: `function createThrottledTransform(delayMs) {
  // Create a TransformStream that adds a delay between each chunk
  // Useful for rate limiting or simulating slow connections



}

// Usage:
// readable.pipeThrough(createThrottledTransform(100)).pipeTo(writable);
// Each chunk is delayed by 100ms`,
      solution: `function createThrottledTransform(delayMs) {
  return new TransformStream({
    async transform(chunk, controller) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
      controller.enqueue(chunk);
    },
  });
}

// Usage:
// readable.pipeThrough(createThrottledTransform(100)).pipeTo(writable);
// Each chunk is delayed by 100ms`,
      hints: [
        'The transform method can be async -- await a timeout before enqueuing.',
        'The stream automatically handles backpressure with the async delay.',
        'This is useful for testing, rate limiting, or simulating network conditions.',
      ],
      concepts: ['throttling', 'async transform', 'rate limiting', 'delay'],
    },
    {
      id: 'js-streams-19',
      title: 'Fix: Stream Memory Leak',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Fix the stream processing code that leaks memory by never releasing resources.',
      skeleton: `// BUG: Multiple resource leaks
async function processStream(url) {
  const response = await fetch(url);
  const reader = response.body.getReader();

  const results = [];
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const decoded = new TextDecoder().decode(value);
    results.push(decoded);
  }
  // BUG: reader lock never released
  // BUG: new TextDecoder created for every chunk (wasteful)
  // BUG: no error handling -- stream left open on error

  return results.join('');
}`,
      solution: `// FIX: Proper resource management
async function processStream(url) {
  const response = await fetch(url);
  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  const results = [];
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      results.push(decoder.decode(value, { stream: true }));
    }
    results.push(decoder.decode());
    return results.join('');
  } catch (error) {
    await reader.cancel(error.message);
    throw error;
  } finally {
    reader.releaseLock();
  }
}`,
      hints: [
        'Create TextDecoder once outside the loop, not per chunk.',
        'Use { stream: true } option for multi-byte character handling across chunks.',
        'Always releaseLock() in finally and cancel on error.',
      ],
      concepts: ['resource leak', 'releaseLock', 'TextDecoder stream mode', 'error handling'],
    },
    {
      id: 'js-streams-20',
      title: 'Practical: Stream Pipeline',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Build a complete streaming data pipeline that fetches CSV data, parses it, transforms records, and collects results.',
      skeleton: `function createCsvParser() {
  // TransformStream: text chunks -> parsed row objects
  // First line is the header


}

function createFilter(predicate) {
  // TransformStream: only passes rows matching predicate


}

function createMapper(fn) {
  // TransformStream: applies fn to each row


}

async function processRemoteCsv(url, predicate, mapper) {
  // 1. Fetch the URL
  // 2. Decode the response body as text
  // 3. Parse CSV rows
  // 4. Filter rows
  // 5. Map/transform rows
  // 6. Collect and return results array



}

// Usage:
// const results = await processRemoteCsv(
//   'https://example.com/data.csv',
//   (row) => row.age > 18,
//   (row) => ({ ...row, name: row.name.toUpperCase() })
// );`,
      solution: `function createCsvParser() {
  let headers = null;
  let buffer = '';

  return new TransformStream({
    transform(chunk, controller) {
      buffer += chunk;
      const lines = buffer.split('\\n');
      buffer = lines.pop();

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        const values = trimmed.split(',').map(v => v.trim());
        if (!headers) {
          headers = values;
        } else {
          const row = {};
          headers.forEach((h, i) => {
            const v = values[i] ?? '';
            row[h] = isNaN(v) || v === '' ? v : Number(v);
          });
          controller.enqueue(row);
        }
      }
    },
    flush(controller) {
      if (buffer.trim() && headers) {
        const values = buffer.trim().split(',').map(v => v.trim());
        const row = {};
        headers.forEach((h, i) => {
          const v = values[i] ?? '';
          row[h] = isNaN(v) || v === '' ? v : Number(v);
        });
        controller.enqueue(row);
      }
    },
  });
}

function createFilter(predicate) {
  return new TransformStream({
    transform(row, controller) {
      if (predicate(row)) {
        controller.enqueue(row);
      }
    },
  });
}

function createMapper(fn) {
  return new TransformStream({
    transform(row, controller) {
      controller.enqueue(fn(row));
    },
  });
}

async function processRemoteCsv(url, predicate, mapper) {
  const response = await fetch(url);
  const results = [];

  await response.body
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(createCsvParser())
    .pipeThrough(createFilter(predicate))
    .pipeThrough(createMapper(mapper))
    .pipeTo(new WritableStream({
      write(row) { results.push(row); },
    }));

  return results;
}

// Usage:
// const results = await processRemoteCsv(
//   'https://example.com/data.csv',
//   (row) => row.age > 18,
//   (row) => ({ ...row, name: row.name.toUpperCase() })
// );`,
      hints: [
        'The CSV parser buffers text, splits lines, uses the first line as headers.',
        'createFilter and createMapper are simple TransformStreams that conditionally pass/transform rows.',
        'Chain everything: fetch -> decode -> parse CSV -> filter -> map -> collect.',
      ],
      concepts: ['stream pipeline', 'CSV parsing', 'TransformStream', 'data processing'],
    },
  ],
};
