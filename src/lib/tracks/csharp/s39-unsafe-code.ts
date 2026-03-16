import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-unsafe-code',
  title: '39. Unsafe Code & Pointers',
  explanation: `## Unsafe Code & Pointers

C# supports direct memory manipulation via the \`unsafe\` keyword. This bypasses the GC and type safety for performance-critical scenarios.

\`\`\`csharp
unsafe
{
    int x = 42;
    int* p = &x;          // pointer to x
    Console.WriteLine(*p); // dereference: 42
    *p = 100;              // modify via pointer
}
\`\`\`

### Fixed Statement

\`\`\`csharp
unsafe
{
    int[] arr = { 1, 2, 3 };
    fixed (int* p = arr)
    {
        // p points to arr[0]; array is pinned
        Console.WriteLine(*(p + 1)); // 2
    }
}
\`\`\`

### Stackalloc in Unsafe

\`\`\`csharp
unsafe
{
    int* buffer = stackalloc int[10];
    for (int i = 0; i < 10; i++)
        buffer[i] = i * i;
}
\`\`\`

### Function Pointers (C# 9+)

\`\`\`csharp
unsafe
{
    delegate*<int, int, int> add = &Calculator.Add;
    int result = add(2, 3); // 5
}
\`\`\`

Unsafe code requires the \`<AllowUnsafeBlocks>true</AllowUnsafeBlocks>\` project setting. Use it sparingly and only when performance demands it.`,
  exercises: [
    {
      id: 'cs-unsafe-1',
      title: 'Unsafe Block',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare an unsafe block to use pointers.',
      skeleton: `__BLANK__
{
    int x = 10;
    int* ptr = &x;
    Console.WriteLine(*ptr);
}`,
      solution: `unsafe
{
    int x = 10;
    int* ptr = &x;
    Console.WriteLine(*ptr);
}`,
      hints: ['This keyword enables pointer operations.', 'It can be applied to blocks, methods, or classes.', 'The answer is: unsafe'],
      concepts: ['unsafe', 'pointer basics'],
    },
    {
      id: 'cs-unsafe-2',
      title: 'Address-Of Operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Get the address of a variable.',
      skeleton: `unsafe
{
    int value = 42;
    int* ptr = __BLANK__value;
}`,
      solution: `unsafe
{
    int value = 42;
    int* ptr = &value;
}`,
      hints: ['This operator returns the memory address.', 'It is the same as in C/C++.', 'The answer is: &'],
      concepts: ['address-of operator', 'pointer initialization'],
    },
    {
      id: 'cs-unsafe-3',
      title: 'Dereference Pointer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Read the value at a pointer address.',
      skeleton: `unsafe
{
    int x = 99;
    int* p = &x;
    int value = __BLANK__p; // 99
}`,
      solution: `unsafe
{
    int x = 99;
    int* p = &x;
    int value = *p; // 99
}`,
      hints: ['The dereference operator reads the value at the pointer.', 'It is the inverse of the address-of operator.', 'The answer is: *'],
      concepts: ['dereference', 'pointer indirection'],
    },
    {
      id: 'cs-unsafe-4',
      title: 'Fixed Array Pinning',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Pin an array so the GC does not move it.',
      skeleton: `unsafe
{
    byte[] data = { 0x01, 0x02, 0x03 };
    __BLANK__ (byte* ptr = data)
    {
        Console.WriteLine(*ptr); // 1
    }
}`,
      solution: `unsafe
{
    byte[] data = { 0x01, 0x02, 0x03 };
    fixed (byte* ptr = data)
    {
        Console.WriteLine(*ptr); // 1
    }
}`,
      hints: ['This statement pins a managed object in memory.', 'Without it, the GC could move the array.', 'The answer is: fixed'],
      concepts: ['fixed', 'pinning', 'GC interaction'],
    },
    {
      id: 'cs-unsafe-5',
      title: 'Pointer Arithmetic',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Access array elements via pointer arithmetic.',
      skeleton: `unsafe
{
    int[] arr = { 10, 20, 30 };
    fixed (int* p = arr)
    {
        int third = *(p __BLANK__ 2); // 30
    }
}`,
      solution: `unsafe
{
    int[] arr = { 10, 20, 30 };
    fixed (int* p = arr)
    {
        int third = *(p + 2); // 30
    }
}`,
      hints: ['Pointer + n advances by n elements (not bytes).', 'int* + 2 moves by 2 * sizeof(int) bytes.', 'The answer is: +'],
      concepts: ['pointer arithmetic', 'element offset'],
    },
    {
      id: 'cs-unsafe-6',
      title: 'sizeof Operator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Get the size of a type in bytes.',
      skeleton: `unsafe
{
    int size = __BLANK__(double); // 8
    Console.WriteLine(size);
}`,
      solution: `unsafe
{
    int size = sizeof(double); // 8
    Console.WriteLine(size);
}`,
      hints: ['This operator returns the size of a value type in bytes.', 'It works on primitive and struct types.', 'The answer is: sizeof'],
      concepts: ['sizeof', 'type size'],
    },
    {
      id: 'cs-unsafe-7',
      title: 'Swap via Pointers',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Swap two integers using pointers.',
      skeleton: `unsafe void Swap(int* a, int* b)
{
    // Swap the values at addresses a and b
}`,
      solution: `unsafe void Swap(int* a, int* b)
{
    int temp = *a;
    *a = *b;
    *b = temp;
}`,
      hints: ['Dereference to read values.', 'Use a temp variable to hold one value.', 'Write through the pointers to swap.'],
      concepts: ['pointer swap', 'dereference', 'temp variable'],
    },
    {
      id: 'cs-unsafe-8',
      title: 'Memory Copy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Copy bytes between two buffers using pointers.',
      skeleton: `unsafe void MemCopy(byte* dest, byte* src, int count)
{
    // Copy count bytes from src to dest
}`,
      solution: `unsafe void MemCopy(byte* dest, byte* src, int count)
{
    for (int i = 0; i < count; i++)
        dest[i] = src[i];
}`,
      hints: ['Pointers support indexer syntax: ptr[i].', 'Loop from 0 to count and copy each byte.', 'This is similar to C memcpy.'],
      concepts: ['pointer indexing', 'memory copy', 'byte-level access'],
    },
    {
      id: 'cs-unsafe-9',
      title: 'Struct to Bytes',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Convert a struct to a byte array using pointers.',
      skeleton: `unsafe byte[] StructToBytes<T>(T value) where T : unmanaged
{
    // Convert any unmanaged struct to its raw byte representation
}`,
      solution: `unsafe byte[] StructToBytes<T>(T value) where T : unmanaged
{
    byte[] bytes = new byte[sizeof(T)];
    fixed (byte* ptr = bytes)
    {
        *(T*)ptr = value;
    }
    return bytes;
}`,
      hints: ['sizeof(T) gives the struct size with the unmanaged constraint.', 'Cast byte* to T* and write the value.', 'The fixed statement pins the byte array.'],
      concepts: ['unmanaged constraint', 'type punning', 'struct serialization'],
    },
    {
      id: 'cs-unsafe-10',
      title: 'Reinterpret Cast',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Reinterpret the bytes of a float as an int.',
      skeleton: `unsafe int FloatToIntBits(float f)
{
    // Return the raw bit pattern of the float as an int
}`,
      solution: `unsafe int FloatToIntBits(float f)
{
    return *(int*)&f;
}`,
      hints: ['Take the address of the float.', 'Cast the float* to int*.', 'Dereference to read the raw bits.'],
      concepts: ['type punning', 'reinterpret cast', 'bit pattern'],
    },
    {
      id: 'cs-unsafe-11',
      title: 'Stackalloc Search',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Use stackalloc to create a lookup table and search it.',
      skeleton: `unsafe int FindInStackBuffer(int target)
{
    // Allocate 10 ints on the stack, fill with squares (0,1,4,9,...,81)
    // Return the index of target, or -1
}`,
      solution: `unsafe int FindInStackBuffer(int target)
{
    int* buf = stackalloc int[10];
    for (int i = 0; i < 10; i++)
        buf[i] = i * i;
    for (int i = 0; i < 10; i++)
        if (buf[i] == target) return i;
    return -1;
}`,
      hints: ['stackalloc int[10] creates 10 ints on the stack.', 'Fill with i*i for squares.', 'Linear search for the target value.'],
      concepts: ['stackalloc', 'stack buffer', 'linear search'],
    },
    {
      id: 'cs-unsafe-12',
      title: 'Function Pointer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Use a function pointer to call a static method.',
      skeleton: `static int Square(int x) => x * x;

unsafe int CallViaPointer(int value)
{
    // Create a function pointer to Square and call it
}`,
      solution: `static int Square(int x) => x * x;

unsafe int CallViaPointer(int value)
{
    delegate*<int, int> fn = &Square;
    return fn(value);
}`,
      hints: ['C# 9 introduced function pointers with delegate* syntax.', 'Use & to get the address of a static method.', 'Call the function pointer like a regular function.'],
      concepts: ['function pointers', 'delegate*', 'C# 9'],
    },
    {
      id: 'cs-unsafe-13',
      title: 'Missing Fixed Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the code that takes address of a movable variable.',
      skeleton: `unsafe void Process(int[] data)
{
    // Bug: cannot take address of a managed array element without fixed
    int* ptr = &data[0]; // compile error!
    *ptr = 999;
}`,
      solution: `unsafe void Process(int[] data)
{
    fixed (int* ptr = data)
    {
        *ptr = 999;
    }
}`,
      hints: ['Managed arrays can be moved by the GC.', 'The fixed statement pins the array in memory.', 'Use fixed (int* ptr = data) to get a stable pointer.'],
      concepts: ['fixed', 'pinning', 'managed array'],
    },
    {
      id: 'cs-unsafe-14',
      title: 'Buffer Overflow Bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix the unsafe code that writes past the buffer.',
      skeleton: `unsafe void FillBuffer()
{
    int* buf = stackalloc int[5];
    // Bug: writes 6 elements into a 5-element buffer
    for (int i = 0; i <= 5; i++)
        buf[i] = i;
}`,
      solution: `unsafe void FillBuffer()
{
    int* buf = stackalloc int[5];
    for (int i = 0; i < 5; i++)
        buf[i] = i;
}`,
      hints: ['The buffer has 5 elements (indices 0-4).', 'i <= 5 writes at index 5, which is out of bounds.', 'Change to i < 5.'],
      concepts: ['buffer overflow', 'bounds checking', 'off-by-one'],
    },
    {
      id: 'cs-unsafe-15',
      title: 'Using Pointer After Fixed Bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix the use of a pointer after the fixed block ends.',
      skeleton: `unsafe int ReadFirst(int[] arr)
{
    int* ptr;
    fixed (int* p = arr)
    {
        ptr = p;
    }
    // Bug: ptr is invalid after fixed block ends
    return *ptr;
}`,
      solution: `unsafe int ReadFirst(int[] arr)
{
    fixed (int* ptr = arr)
    {
        return *ptr;
    }
}`,
      hints: ['The pointer is only valid inside the fixed block.', 'After fixed ends, the GC can move the array.', 'Read the value inside the fixed block.'],
      concepts: ['fixed scope', 'dangling pointer', 'pointer lifetime'],
    },
    {
      id: 'cs-unsafe-16',
      title: 'Predict Pointer Value',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the output of pointer operations.',
      skeleton: `unsafe
{
    int x = 10;
    int* p = &x;
    *p += 5;
    Console.WriteLine(x);
}`,
      solution: `15`,
      hints: ['p points to x.', '*p += 5 adds 5 to the value at p, which is x.', 'x becomes 10 + 5 = 15.'],
      concepts: ['pointer modification', 'dereference write'],
    },
    {
      id: 'cs-unsafe-17',
      title: 'Predict Pointer Arithmetic',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the output of pointer indexing.',
      skeleton: `unsafe
{
    int[] arr = { 100, 200, 300 };
    fixed (int* p = arr)
    {
        Console.WriteLine(*(p + 1));
        Console.WriteLine(p[2]);
    }
}`,
      solution: `200
300`,
      hints: ['p + 1 points to arr[1] which is 200.', 'p[2] is equivalent to *(p + 2) which is arr[2].', 'Pointer arithmetic advances by element size.'],
      concepts: ['pointer arithmetic', 'pointer indexing'],
    },
    {
      id: 'cs-unsafe-18',
      title: 'Predict sizeof Values',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the sizes of various types.',
      skeleton: `unsafe
{
    Console.WriteLine(sizeof(byte));
    Console.WriteLine(sizeof(int));
    Console.WriteLine(sizeof(long));
    Console.WriteLine(sizeof(double));
}`,
      solution: `1
4
8
8`,
      hints: ['byte is 1 byte, int is 4 bytes.', 'long is 8 bytes, double is 8 bytes.', 'These are guaranteed by the CLI specification.'],
      concepts: ['sizeof', 'type sizes', 'CLR type layout'],
    },
    {
      id: 'cs-unsafe-19',
      title: 'Refactor Unsafe to Span',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor unsafe pointer code to safe Span-based code.',
      skeleton: `unsafe int SumArray(int[] arr)
{
    int sum = 0;
    fixed (int* p = arr)
    {
        for (int i = 0; i < arr.Length; i++)
            sum += p[i];
    }
    return sum;
}`,
      solution: `int SumArray(int[] arr)
{
    int sum = 0;
    ReadOnlySpan<int> span = arr;
    foreach (var v in span)
        sum += v;
    return sum;
}`,
      hints: ['Span provides safe pointer-like performance.', 'Replace fixed + pointer indexing with Span foreach.', 'No unsafe keyword needed.'],
      concepts: ['Span replacement', 'safe code', 'performance'],
    },
    {
      id: 'cs-unsafe-20',
      title: 'Refactor to Unsafe.As',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Refactor raw pointer type punning to use Unsafe.As.',
      skeleton: `unsafe int FloatBits(float f)
{
    return *(int*)&f;
}`,
      solution: `int FloatBits(float f)
{
    return Unsafe.As<float, int>(ref f);
}`,
      hints: ['System.Runtime.CompilerServices.Unsafe provides safe reinterpretation.', 'Unsafe.As reinterprets the reference without actual unsafe code.', 'The method does not require an unsafe context.'],
      concepts: ['Unsafe.As', 'type reinterpretation', 'safe alternative'],
    },
  ],
};
