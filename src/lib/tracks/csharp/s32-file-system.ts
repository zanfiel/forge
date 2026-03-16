import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-file-system',
  title: '32. File System',
  explanation: `## File System

.NET provides static helpers (\`File\`, \`Directory\`, \`Path\`) and instance-based wrappers (\`FileInfo\`, \`DirectoryInfo\`) for file system operations.

\`\`\`csharp
// Quick read/write
string text = File.ReadAllText("data.txt");
File.WriteAllText("out.txt", "hello");
string[] lines = File.ReadAllLines("log.txt");
\`\`\`

### Path Manipulation

\`\`\`csharp
string full = Path.Combine("dir", "sub", "file.txt");
string ext = Path.GetExtension("photo.jpg");       // ".jpg"
string name = Path.GetFileNameWithoutExtension("photo.jpg"); // "photo"
\`\`\`

### Directory Operations

\`\`\`csharp
Directory.CreateDirectory("output/logs");
foreach (string file in Directory.EnumerateFiles(".", "*.cs", SearchOption.AllDirectories))
    Console.WriteLine(file);
\`\`\`

### FileInfo / DirectoryInfo

\`\`\`csharp
var fi = new FileInfo("data.bin");
Console.WriteLine(fi.Length);        // bytes
Console.WriteLine(fi.LastWriteTime);
fi.CopyTo("backup.bin", overwrite: true);
\`\`\`

Use \`Path.Combine\` instead of string concatenation. Prefer \`Enumerate*\` over \`Get*\` methods for lazy evaluation on large directories.`,
  exercises: [
    {
      id: 'cs-fs-1',
      title: 'File.ReadAllText',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Read the entire contents of a text file.',
      skeleton: `string content = File.__BLANK__("readme.txt");`,
      solution: `string content = File.ReadAllText("readme.txt");`,
      hints: ['This static method reads the whole file into a string.', 'It is in the System.IO.File class.', 'The answer is: ReadAllText'],
      concepts: ['File.ReadAllText', 'static file helpers'],
    },
    {
      id: 'cs-fs-2',
      title: 'Path.Combine',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Combine directory and file name into a full path.',
      skeleton: `string path = Path.__BLANK__("Users", "zan", "docs", "notes.txt");`,
      solution: `string path = Path.Combine("Users", "zan", "docs", "notes.txt");`,
      hints: ['This method handles path separators automatically.', 'It accepts multiple string arguments.', 'The answer is: Combine'],
      concepts: ['Path.Combine', 'path construction'],
    },
    {
      id: 'cs-fs-3',
      title: 'Directory.CreateDirectory',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Create a directory and all missing parent directories.',
      skeleton: `Directory.__BLANK__("output/logs/2024");`,
      solution: `Directory.CreateDirectory("output/logs/2024");`,
      hints: ['This creates the full directory path recursively.', 'It does not throw if the directory already exists.', 'The answer is: CreateDirectory'],
      concepts: ['Directory.CreateDirectory', 'recursive directory creation'],
    },
    {
      id: 'cs-fs-4',
      title: 'Path.GetExtension',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Extract the file extension from a path.',
      skeleton: `string ext = Path.__BLANK__("photo.jpg"); // ".jpg"`,
      solution: `string ext = Path.GetExtension("photo.jpg"); // ".jpg"`,
      hints: ['This returns the extension including the dot.', 'Returns empty string if no extension.', 'The answer is: GetExtension'],
      concepts: ['Path.GetExtension', 'file extension'],
    },
    {
      id: 'cs-fs-5',
      title: 'File.Exists Check',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Check if a file exists before reading.',
      skeleton: `if (File.__BLANK__("config.json"))
    string config = File.ReadAllText("config.json");`,
      solution: `if (File.Exists("config.json"))
    string config = File.ReadAllText("config.json");`,
      hints: ['This returns a bool indicating file presence.', 'It does not throw on missing files.', 'The answer is: Exists'],
      concepts: ['File.Exists', 'file existence check'],
    },
    {
      id: 'cs-fs-6',
      title: 'EnumerateFiles with Pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Find all C# files recursively in a directory.',
      skeleton: `var files = Directory.EnumerateFiles("src", "*.cs", SearchOption.__BLANK__);`,
      solution: `var files = Directory.EnumerateFiles("src", "*.cs", SearchOption.AllDirectories);`,
      hints: ['SearchOption controls whether to search subdirectories.', 'AllDirectories searches the entire tree.', 'The answer is: AllDirectories'],
      concepts: ['EnumerateFiles', 'SearchOption', 'recursive search'],
    },
    {
      id: 'cs-fs-7',
      title: 'Write All Lines',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a list of strings to a file, one per line.',
      skeleton: `void SaveLog(string path, List<string> entries)
{
    // Write all entries to the file, one per line
}`,
      solution: `void SaveLog(string path, List<string> entries)
{
    File.WriteAllLines(path, entries);
}`,
      hints: ['File has a static method for writing collections as lines.', 'Each element becomes one line in the file.', 'File.WriteAllLines handles the newlines.'],
      concepts: ['File.WriteAllLines', 'list to file'],
    },
    {
      id: 'cs-fs-8',
      title: 'Copy Directory Recursively',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Copy all files from a source directory to a destination, preserving structure.',
      skeleton: `void CopyDirectory(string source, string dest)
{
    // Recursively copy all files and subdirectories
}`,
      solution: `void CopyDirectory(string source, string dest)
{
    Directory.CreateDirectory(dest);
    foreach (string file in Directory.GetFiles(source))
    {
        string destFile = Path.Combine(dest, Path.GetFileName(file));
        File.Copy(file, destFile, overwrite: true);
    }
    foreach (string dir in Directory.GetDirectories(source))
    {
        string destDir = Path.Combine(dest, Path.GetFileName(dir));
        CopyDirectory(dir, destDir);
    }
}`,
      hints: ['Create the destination directory first.', 'Copy each file using File.Copy with the new path.', 'Recursively call for each subdirectory.'],
      concepts: ['recursive copy', 'File.Copy', 'Directory.GetDirectories'],
    },
    {
      id: 'cs-fs-9',
      title: 'Find Large Files',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Find all files larger than a threshold in a directory tree.',
      skeleton: `IEnumerable<string> FindLargeFiles(string root, long minBytes)
{
    // Return paths of files larger than minBytes
}`,
      solution: `IEnumerable<string> FindLargeFiles(string root, long minBytes)
{
    foreach (var file in Directory.EnumerateFiles(root, "*", SearchOption.AllDirectories))
    {
        var info = new FileInfo(file);
        if (info.Length >= minBytes)
            yield return file;
    }
}`,
      hints: ['Use EnumerateFiles with AllDirectories.', 'FileInfo.Length gives the size in bytes.', 'Use yield return for lazy evaluation.'],
      concepts: ['FileInfo', 'Length', 'yield return', 'EnumerateFiles'],
    },
    {
      id: 'cs-fs-10',
      title: 'Get Unique Extensions',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Return all unique file extensions in a directory.',
      skeleton: `HashSet<string> GetExtensions(string directory)
{
    // Return set of unique extensions (e.g. ".cs", ".json")
}`,
      solution: `HashSet<string> GetExtensions(string directory)
{
    var extensions = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
    foreach (var file in Directory.EnumerateFiles(directory))
    {
        var ext = Path.GetExtension(file);
        if (!string.IsNullOrEmpty(ext))
            extensions.Add(ext);
    }
    return extensions;
}`,
      hints: ['Use Path.GetExtension on each file.', 'Use a HashSet for uniqueness.', 'OrdinalIgnoreCase handles case-insensitive comparison.'],
      concepts: ['HashSet', 'Path.GetExtension', 'StringComparer'],
    },
    {
      id: 'cs-fs-11',
      title: 'Temp File Round Trip',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write data to a temp file and read it back.',
      skeleton: `string TempRoundTrip(string data)
{
    // Write to a temp file, read it back, delete the temp file
}`,
      solution: `string TempRoundTrip(string data)
{
    string tempPath = Path.GetTempFileName();
    try
    {
        File.WriteAllText(tempPath, data);
        return File.ReadAllText(tempPath);
    }
    finally
    {
        File.Delete(tempPath);
    }
}`,
      hints: ['Path.GetTempFileName creates a unique temp file.', 'Use try/finally to ensure cleanup.', 'File.Delete removes the temp file.'],
      concepts: ['Path.GetTempFileName', 'temp files', 'cleanup'],
    },
    {
      id: 'cs-fs-12',
      title: 'Async File Read',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Read all text from a file asynchronously.',
      skeleton: `async Task<string> ReadFileAsync(string path)
{
    // Read file contents asynchronously
}`,
      solution: `async Task<string> ReadFileAsync(string path)
{
    return await File.ReadAllTextAsync(path);
}`,
      hints: ['File has async versions of its static methods.', 'ReadAllTextAsync returns Task<string>.', 'Await the result and return it.'],
      concepts: ['ReadAllTextAsync', 'async file I/O'],
    },
    {
      id: 'cs-fs-13',
      title: 'Wrong Path Separator Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the path construction that fails on Linux.',
      skeleton: `string GetConfigPath(string user)
{
    // Bug: hardcoded backslash fails on Linux
    return "home\\\\" + user + "\\\\config\\\\settings.json";
}`,
      solution: `string GetConfigPath(string user)
{
    return Path.Combine("home", user, "config", "settings.json");
}`,
      hints: ['Hardcoded path separators are not cross-platform.', 'Path.Combine uses the correct separator for the OS.', 'Always use Path.Combine for path construction.'],
      concepts: ['Path.Combine', 'cross-platform paths'],
    },
    {
      id: 'cs-fs-14',
      title: 'Missing Directory Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the code that throws DirectoryNotFoundException.',
      skeleton: `void SaveReport(string content)
{
    // Bug: directory may not exist
    string path = Path.Combine("reports", "2024", "q1", "report.txt");
    File.WriteAllText(path, content);
}`,
      solution: `void SaveReport(string content)
{
    string path = Path.Combine("reports", "2024", "q1", "report.txt");
    string? dir = Path.GetDirectoryName(path);
    if (dir != null) Directory.CreateDirectory(dir);
    File.WriteAllText(path, content);
}`,
      hints: ['File.WriteAllText does not create parent directories.', 'Use Directory.CreateDirectory before writing.', 'GetDirectoryName extracts the directory portion of the path.'],
      concepts: ['Directory.CreateDirectory', 'Path.GetDirectoryName', 'file write prerequisites'],
    },
    {
      id: 'cs-fs-15',
      title: 'FileSystemWatcher Leak Bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix the FileSystemWatcher that is not disposed.',
      skeleton: `void WatchFolder(string path, Action<string> onChange)
{
    // Bug: watcher is never disposed
    var watcher = new FileSystemWatcher(path, "*.txt");
    watcher.Changed += (s, e) => onChange(e.FullPath);
    watcher.EnableRaisingEvents = true;
}`,
      solution: `IDisposable WatchFolder(string path, Action<string> onChange)
{
    var watcher = new FileSystemWatcher(path, "*.txt");
    watcher.Changed += (s, e) => onChange(e.FullPath);
    watcher.EnableRaisingEvents = true;
    return watcher;
}`,
      hints: ['FileSystemWatcher implements IDisposable and holds OS resources.', 'Return the watcher so the caller can dispose it.', 'Alternatively, make the method return IDisposable.'],
      concepts: ['FileSystemWatcher', 'IDisposable', 'resource management'],
    },
    {
      id: 'cs-fs-16',
      title: 'Predict Path.Combine',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the result of Path.Combine with rooted path.',
      skeleton: `Console.WriteLine(Path.Combine("dir", "/absolute", "file.txt"));`,
      solution: `/absolute/file.txt`,
      hints: ['If any argument is an absolute/rooted path, it resets.', 'The /absolute part is treated as a root.', 'Previous segments are discarded.'],
      concepts: ['Path.Combine', 'rooted paths', 'path reset'],
    },
    {
      id: 'cs-fs-17',
      title: 'Predict GetFileName',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict what Path methods return.',
      skeleton: `string p = "/home/user/docs/report.pdf";
Console.WriteLine(Path.GetFileName(p));
Console.WriteLine(Path.GetFileNameWithoutExtension(p));
Console.WriteLine(Path.GetExtension(p));`,
      solution: `report.pdf
report
.pdf`,
      hints: ['GetFileName returns the last segment.', 'GetFileNameWithoutExtension strips the extension.', 'GetExtension includes the dot.'],
      concepts: ['Path.GetFileName', 'GetFileNameWithoutExtension', 'GetExtension'],
    },
    {
      id: 'cs-fs-18',
      title: 'Predict Directory.Exists',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the output of existence checks.',
      skeleton: `// Assume /tmp exists, /tmp/nonexistent does not
Console.WriteLine(Directory.Exists("/tmp"));
Console.WriteLine(Directory.Exists("/tmp/nonexistent"));
Console.WriteLine(File.Exists("/tmp"));`,
      solution: `True
False
False`,
      hints: ['Directory.Exists returns true for existing directories.', 'It returns false for non-existent paths.', 'File.Exists returns false for directories.'],
      concepts: ['Directory.Exists', 'File.Exists', 'path type checking'],
    },
    {
      id: 'cs-fs-19',
      title: 'Refactor Repeated Path Logic',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor duplicated path building into a helper method.',
      skeleton: `void Process()
{
    string logsDir = "app" + Path.DirectorySeparatorChar + "data" + Path.DirectorySeparatorChar + "logs";
    string cacheDir = "app" + Path.DirectorySeparatorChar + "data" + Path.DirectorySeparatorChar + "cache";
    string configDir = "app" + Path.DirectorySeparatorChar + "data" + Path.DirectorySeparatorChar + "config";
    Directory.CreateDirectory(logsDir);
    Directory.CreateDirectory(cacheDir);
    Directory.CreateDirectory(configDir);
}`,
      solution: `void Process()
{
    string[] subdirs = { "logs", "cache", "config" };
    foreach (var sub in subdirs)
    {
        string dir = Path.Combine("app", "data", sub);
        Directory.CreateDirectory(dir);
    }
}`,
      hints: ['The path base "app/data" is repeated three times.', 'Use Path.Combine instead of manual separator concatenation.', 'Loop over the subdirectory names.'],
      concepts: ['Path.Combine', 'DRY principle', 'loop refactoring'],
    },
    {
      id: 'cs-fs-20',
      title: 'Refactor to FileInfo',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Refactor repeated File static calls on the same path to use FileInfo.',
      skeleton: `void ReportFile(string path)
{
    if (File.Exists(path))
    {
        Console.WriteLine("Size: " + new FileInfo(path).Length);
        Console.WriteLine("Created: " + File.GetCreationTime(path));
        Console.WriteLine("Modified: " + File.GetLastWriteTime(path));
        Console.WriteLine("ReadOnly: " + new FileInfo(path).IsReadOnly);
    }
}`,
      solution: `void ReportFile(string path)
{
    var fi = new FileInfo(path);
    if (fi.Exists)
    {
        Console.WriteLine("Size: " + fi.Length);
        Console.WriteLine("Created: " + fi.CreationTime);
        Console.WriteLine("Modified: " + fi.LastWriteTime);
        Console.WriteLine("ReadOnly: " + fi.IsReadOnly);
    }
}`,
      hints: ['FileInfo caches metadata about a single file.', 'Create one FileInfo instance and reuse its properties.', 'FileInfo.Exists replaces File.Exists.'],
      concepts: ['FileInfo', 'instance-based API', 'metadata caching'],
    },
  ],
};
