import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-interop',
  title: '40. Interop & P/Invoke',
  explanation: `## Interop & P/Invoke

P/Invoke (Platform Invocation Services) lets C# call unmanaged native functions in DLLs.

\`\`\`csharp
// Traditional P/Invoke
[DllImport("user32.dll", CharSet = CharSet.Unicode)]
static extern int MessageBox(IntPtr hWnd, string text, string caption, uint type);

MessageBox(IntPtr.Zero, "Hello!", "Title", 0);
\`\`\`

### LibraryImport (.NET 7+ Source Generator)

\`\`\`csharp
[LibraryImport("kernel32", StringMarshalling = StringMarshalling.Utf16)]
private static partial int GetCurrentProcessId();
\`\`\`

### Marshalling

\`\`\`csharp
[DllImport("native.dll")]
static extern void GetData(
    [MarshalAs(UnmanagedType.LPStr)] string input,
    [Out] byte[] buffer,
    int bufferSize);
\`\`\`

### COM Interop

\`\`\`csharp
[ComImport, Guid("00000000-0000-0000-C000-000000000046")]
[InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
interface IUnknown
{
    void QueryInterface(ref Guid riid, out IntPtr ppvObject);
}
\`\`\`

P/Invoke bridges managed and unmanaged worlds. Use \`LibraryImport\` in modern .NET for source-generated, AOT-compatible interop.`,
  exercises: [
    {
      id: 'cs-interop-1',
      title: 'DllImport Basic',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare an external function from a native DLL.',
      skeleton: `[__BLANK__("kernel32.dll")]
static extern uint GetCurrentProcessId();`,
      solution: `[DllImport("kernel32.dll")]
static extern uint GetCurrentProcessId();`,
      hints: ['This attribute specifies the DLL containing the function.', 'The method must be static extern.', 'The answer is: DllImport'],
      concepts: ['DllImport', 'P/Invoke basics'],
    },
    {
      id: 'cs-interop-2',
      title: 'CharSet Unicode',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Specify Unicode character set for string marshalling.',
      skeleton: `[DllImport("user32.dll", CharSet = CharSet.__BLANK__)]
static extern int MessageBox(IntPtr hWnd, string text, string caption, uint type);`,
      solution: `[DllImport("user32.dll", CharSet = CharSet.Unicode)]
static extern int MessageBox(IntPtr hWnd, string text, string caption, uint type);`,
      hints: ['Windows uses UTF-16 strings internally.', 'Unicode ensures proper string handling.', 'The answer is: Unicode'],
      concepts: ['CharSet', 'Unicode marshalling'],
    },
    {
      id: 'cs-interop-3',
      title: 'MarshalAs String',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Marshal a string as a null-terminated ANSI string.',
      skeleton: `[DllImport("native.dll")]
static extern void SetName([MarshalAs(UnmanagedType.__BLANK__)] string name);`,
      solution: `[DllImport("native.dll")]
static extern void SetName([MarshalAs(UnmanagedType.LPStr)] string name);`,
      hints: ['LPStr marshals as a null-terminated ANSI char*.', 'LPWStr marshals as a null-terminated wchar_t*.', 'The answer is: LPStr'],
      concepts: ['MarshalAs', 'UnmanagedType.LPStr', 'string marshalling'],
    },
    {
      id: 'cs-interop-4',
      title: 'LibraryImport Modern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Use the modern source-generated interop attribute.',
      skeleton: `[__BLANK__("native", StringMarshalling = StringMarshalling.Utf16)]
private static partial int GetVersion();`,
      solution: `[LibraryImport("native", StringMarshalling = StringMarshalling.Utf16)]
private static partial int GetVersion();`,
      hints: ['This .NET 7+ attribute generates marshalling code at compile time.', 'It replaces DllImport with source-generated code.', 'The answer is: LibraryImport'],
      concepts: ['LibraryImport', 'source-generated interop', '.NET 7'],
    },
    {
      id: 'cs-interop-5',
      title: 'IntPtr Handle',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Use IntPtr to represent a native handle.',
      skeleton: `[DllImport("kernel32.dll")]
static extern __BLANK__ GetCurrentProcess();`,
      solution: `[DllImport("kernel32.dll")]
static extern IntPtr GetCurrentProcess();`,
      hints: ['Native handles are pointer-sized integers.', 'IntPtr is the .NET representation.', 'The answer is: IntPtr'],
      concepts: ['IntPtr', 'native handles'],
    },
    {
      id: 'cs-interop-6',
      title: 'StructLayout Sequential',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Define a struct layout compatible with native code.',
      skeleton: `[StructLayout(LayoutKind.__BLANK__)]
struct Point
{
    public int X;
    public int Y;
}`,
      solution: `[StructLayout(LayoutKind.Sequential)]
struct Point
{
    public int X;
    public int Y;
}`,
      hints: ['Sequential layout matches C struct ordering.', 'Fields are placed in declaration order.', 'The answer is: Sequential'],
      concepts: ['StructLayout', 'LayoutKind.Sequential', 'interop struct'],
    },
    {
      id: 'cs-interop-7',
      title: 'P/Invoke Error Check',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Call a native function and check for errors using Marshal.GetLastWin32Error.',
      skeleton: `[DllImport("kernel32.dll", SetLastError = true)]
static extern IntPtr CreateFile(string path, uint access, uint share,
    IntPtr security, uint creation, uint flags, IntPtr template);

IntPtr OpenFileChecked(string path)
{
    // Call CreateFile, check for INVALID_HANDLE_VALUE (-1), throw on error
}`,
      solution: `IntPtr OpenFileChecked(string path)
{
    IntPtr handle = CreateFile(path, 0x80000000, 1,
        IntPtr.Zero, 3, 0, IntPtr.Zero);
    if (handle == new IntPtr(-1))
    {
        int error = Marshal.GetLastWin32Error();
        throw new System.ComponentModel.Win32Exception(error);
    }
    return handle;
}`,
      hints: ['SetLastError = true preserves the native error code.', 'Marshal.GetLastWin32Error() retrieves it.', 'Win32Exception formats the error message.'],
      concepts: ['SetLastError', 'GetLastWin32Error', 'Win32Exception'],
    },
    {
      id: 'cs-interop-8',
      title: 'Marshal.AllocHGlobal',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Allocate unmanaged memory and write a struct to it.',
      skeleton: `IntPtr AllocatePoint(int x, int y)
{
    // Allocate unmanaged memory for a Point struct and write values
}

[StructLayout(LayoutKind.Sequential)]
struct Point { public int X; public int Y; }`,
      solution: `IntPtr AllocatePoint(int x, int y)
{
    var point = new Point { X = x, Y = y };
    int size = Marshal.SizeOf<Point>();
    IntPtr ptr = Marshal.AllocHGlobal(size);
    Marshal.StructureToPtr(point, ptr, false);
    return ptr;
}`,
      hints: ['AllocHGlobal allocates from the process heap.', 'StructureToPtr copies a struct to unmanaged memory.', 'Remember to call FreeHGlobal when done.'],
      concepts: ['AllocHGlobal', 'StructureToPtr', 'unmanaged memory'],
    },
    {
      id: 'cs-interop-9',
      title: 'Callback Function Pointer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Pass a managed callback to a native function.',
      skeleton: `// Native function that calls a callback for each item
[DllImport("native.dll")]
static extern void EnumItems(EnumCallback callback);

delegate bool EnumCallback(int id, IntPtr name);

void ListItems()
{
    // Create a callback that prints each item, then pass it to EnumItems
}`,
      solution: `void ListItems()
{
    EnumCallback cb = (id, namePtr) =>
    {
        string? name = Marshal.PtrToStringUTF8(namePtr);
        Console.WriteLine($"{id}: {name}");
        return true; // continue enumeration
    };
    EnumItems(cb);
    GC.KeepAlive(cb); // prevent collection during native call
}`,
      hints: ['Delegates can be marshalled as function pointers.', 'PtrToStringUTF8 converts a native string pointer.', 'GC.KeepAlive prevents the delegate from being collected.'],
      concepts: ['callback delegates', 'PtrToStringUTF8', 'GC.KeepAlive'],
    },
    {
      id: 'cs-interop-10',
      title: 'SafeHandle Wrapper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Create a SafeHandle subclass for a native resource.',
      skeleton: `class NativeFileHandle : SafeHandleZeroOrMinusOneIsInvalid
{
    // Implement constructor and ReleaseHandle
}

[DllImport("kernel32.dll")]
static extern bool CloseHandle(IntPtr handle);`,
      solution: `class NativeFileHandle : SafeHandleZeroOrMinusOneIsInvalid
{
    public NativeFileHandle() : base(ownsHandle: true) { }

    protected override bool ReleaseHandle()
    {
        return CloseHandle(handle);
    }
}`,
      hints: ['SafeHandle ensures native resources are freed.', 'Override ReleaseHandle to call the native close/free function.', 'The base class tracks validity via IsInvalid.'],
      concepts: ['SafeHandle', 'ReleaseHandle', 'deterministic cleanup'],
    },
    {
      id: 'cs-interop-11',
      title: 'Marshal Array',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Copy native memory into a managed byte array.',
      skeleton: `byte[] CopyFromNative(IntPtr source, int length)
{
    // Copy length bytes from unmanaged memory to a managed array
}`,
      solution: `byte[] CopyFromNative(IntPtr source, int length)
{
    byte[] dest = new byte[length];
    Marshal.Copy(source, dest, 0, length);
    return dest;
}`,
      hints: ['Marshal.Copy transfers between managed and unmanaged.', 'It has overloads for byte[], int[], float[], etc.', 'Parameters: source pointer, destination array, start index, length.'],
      concepts: ['Marshal.Copy', 'managed/unmanaged transfer'],
    },
    {
      id: 'cs-interop-12',
      title: 'NativeMemory Allocation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Use NativeMemory.Alloc and Free (.NET 6+).',
      skeleton: `unsafe void UseNativeMemory()
{
    // Allocate 100 bytes, fill with zeros, then free
}`,
      solution: `unsafe void UseNativeMemory()
{
    void* ptr = NativeMemory.AllocZeroed(100);
    try
    {
        Span<byte> span = new Span<byte>(ptr, 100);
        // Use span...
    }
    finally
    {
        NativeMemory.Free(ptr);
    }
}`,
      hints: ['NativeMemory.AllocZeroed allocates and zeros memory.', 'Create a Span from the pointer for safe access.', 'Always Free in a finally block.'],
      concepts: ['NativeMemory', 'AllocZeroed', 'Free', '.NET 6'],
    },
    {
      id: 'cs-interop-13',
      title: 'Missing SetLastError Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix P/Invoke that loses the native error code.',
      skeleton: `// Bug: SetLastError not specified, Marshal.GetLastWin32Error returns stale value
[DllImport("kernel32.dll")]
static extern IntPtr CreateFile(string path, uint access, uint share,
    IntPtr security, uint creation, uint flags, IntPtr template);

void Open(string path)
{
    var handle = CreateFile(path, 0x80000000, 1, IntPtr.Zero, 3, 0, IntPtr.Zero);
    int err = Marshal.GetLastWin32Error(); // unreliable!
}`,
      solution: `[DllImport("kernel32.dll", SetLastError = true)]
static extern IntPtr CreateFile(string path, uint access, uint share,
    IntPtr security, uint creation, uint flags, IntPtr template);

void Open(string path)
{
    var handle = CreateFile(path, 0x80000000, 1, IntPtr.Zero, 3, 0, IntPtr.Zero);
    int err = Marshal.GetLastWin32Error();
}`,
      hints: ['Without SetLastError = true, the runtime may overwrite the error.', 'The CLR makes other system calls between the P/Invoke and your check.', 'Add SetLastError = true to the DllImport attribute.'],
      concepts: ['SetLastError', 'error preservation', 'P/Invoke reliability'],
    },
    {
      id: 'cs-interop-14',
      title: 'Memory Leak in Interop Bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix the unmanaged memory leak.',
      skeleton: `void Process()
{
    IntPtr ptr = Marshal.AllocHGlobal(1024);
    // Bug: memory is never freed if DoWork throws
    DoWork(ptr);
    Marshal.FreeHGlobal(ptr);
}`,
      solution: `void Process()
{
    IntPtr ptr = Marshal.AllocHGlobal(1024);
    try
    {
        DoWork(ptr);
    }
    finally
    {
        Marshal.FreeHGlobal(ptr);
    }
}`,
      hints: ['If DoWork throws, FreeHGlobal is never called.', 'Use try/finally to guarantee cleanup.', 'Unmanaged memory is not collected by the GC.'],
      concepts: ['memory leak', 'try/finally', 'FreeHGlobal'],
    },
    {
      id: 'cs-interop-15',
      title: 'Wrong Calling Convention Bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix the calling convention mismatch.',
      skeleton: `// Bug: C function uses cdecl, but DllImport defaults to StdCall on Windows
[DllImport("mathlib.so")]
static extern double calculate(double x, double y);`,
      solution: `[DllImport("mathlib.so", CallingConvention = CallingConvention.Cdecl)]
static extern double calculate(double x, double y);`,
      hints: ['C functions typically use the Cdecl calling convention.', 'DllImport defaults to StdCall on Windows.', 'Specify CallingConvention.Cdecl for C libraries.'],
      concepts: ['CallingConvention', 'Cdecl', 'StdCall'],
    },
    {
      id: 'cs-interop-16',
      title: 'Predict Marshal.SizeOf',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the marshalled size of a struct.',
      skeleton: `[StructLayout(LayoutKind.Sequential)]
struct Data
{
    public int A;     // 4 bytes
    public byte B;    // 1 byte
    public int C;     // 4 bytes
}

Console.WriteLine(Marshal.SizeOf<Data>());`,
      solution: `12`,
      hints: ['Sequential layout uses padding for alignment.', 'byte B is followed by 3 bytes of padding before int C.', '4 + 1 + 3(padding) + 4 = 12.'],
      concepts: ['struct padding', 'alignment', 'Marshal.SizeOf'],
    },
    {
      id: 'cs-interop-17',
      title: 'Predict IntPtr Size',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict IntPtr size on a 64-bit system.',
      skeleton: `// Running on 64-bit .NET
Console.WriteLine(IntPtr.Size);
Console.WriteLine(Marshal.SizeOf<IntPtr>());`,
      solution: `8
8`,
      hints: ['IntPtr is pointer-sized.', 'On 64-bit systems, pointers are 8 bytes.', 'On 32-bit systems, it would be 4.'],
      concepts: ['IntPtr.Size', 'platform-dependent size'],
    },
    {
      id: 'cs-interop-18',
      title: 'Predict String Marshalling',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict what happens with string marshalling direction.',
      skeleton: `// Given a native function:
// void fill_buffer(char* buf, int size);
// What is the correct C# signature?
// A) static extern void fill_buffer(string buf, int size);
// B) static extern void fill_buffer(StringBuilder buf, int size);
// C) static extern void fill_buffer([Out] string buf, int size);`,
      solution: `B) static extern void fill_buffer(StringBuilder buf, int size);`,
      hints: ['string is immutable in C# and marshalled as input only.', 'StringBuilder is mutable and supports output marshalling.', 'Use StringBuilder when the native function writes to the buffer.'],
      concepts: ['StringBuilder marshalling', 'output parameters', 'mutable buffers'],
    },
    {
      id: 'cs-interop-19',
      title: 'Refactor DllImport to LibraryImport',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Migrate from DllImport to LibraryImport (.NET 7+).',
      skeleton: `[DllImport("native.dll", CharSet = CharSet.Unicode, SetLastError = true)]
static extern bool SetWindowText(IntPtr hWnd, string text);

[DllImport("native.dll")]
static extern int GetVersion();`,
      solution: `[LibraryImport("native", StringMarshalling = StringMarshalling.Utf16, SetLastError = true)]
private static partial bool SetWindowText(IntPtr hWnd, string text);

[LibraryImport("native")]
private static partial int GetVersion();`,
      hints: ['LibraryImport uses source generators for AOT compatibility.', 'CharSet.Unicode becomes StringMarshalling.Utf16.', 'Methods must be static partial (not extern).'],
      concepts: ['LibraryImport migration', 'source-generated P/Invoke'],
    },
    {
      id: 'cs-interop-20',
      title: 'Refactor to SafeHandle',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Refactor raw IntPtr handle management to use SafeHandle.',
      skeleton: `class NativeResource
{
    private IntPtr _handle;

    public NativeResource()
    {
        _handle = NativeLib.Create();
    }

    public void Use() => NativeLib.Process(_handle);

    public void Close()
    {
        if (_handle != IntPtr.Zero)
        {
            NativeLib.Destroy(_handle);
            _handle = IntPtr.Zero;
        }
    }
}`,
      solution: `class NativeResourceHandle : SafeHandleZeroOrMinusOneIsInvalid
{
    public NativeResourceHandle() : base(ownsHandle: true) { }
    protected override bool ReleaseHandle()
    {
        NativeLib.Destroy(handle);
        return true;
    }
}

class NativeResource : IDisposable
{
    private readonly NativeResourceHandle _handle;

    public NativeResource()
    {
        _handle = new NativeResourceHandle();
        _handle.SetHandle(NativeLib.Create());
    }

    public void Use() => NativeLib.Process(_handle.DangerousGetHandle());

    public void Dispose() => _handle.Dispose();
}`,
      hints: ['SafeHandle provides guaranteed cleanup even during exceptions.', 'It tracks handle validity automatically.', 'Implement IDisposable on the wrapper class.'],
      concepts: ['SafeHandle', 'deterministic cleanup', 'IDisposable'],
    },
  ],
};
