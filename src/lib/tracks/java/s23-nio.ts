import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-nio',
  title: '23. NIO.2 File API',
  explanation: `## NIO.2 File API

Java NIO.2 (java.nio.file) provides modern, powerful file operations.

### Path
\`\`\`java
Path p = Path.of("src", "main", "App.java");
Path abs = p.toAbsolutePath();
Path parent = p.getParent();
Path name = p.getFileName();
\`\`\`

### Files Utility
\`\`\`java
String text = Files.readString(path);
List<String> lines = Files.readAllLines(path);
Files.writeString(path, "content");
Files.write(path, lines);
\`\`\`

### Directory Operations
\`\`\`java
Files.createDirectories(path);
try (Stream<Path> walk = Files.walk(dir)) { ... }
try (Stream<Path> list = Files.list(dir)) { ... }
try (DirectoryStream<Path> ds = Files.newDirectoryStream(dir, "*.txt")) { ... }
\`\`\`

### File Attributes
\`\`\`java
Files.exists(path), Files.isRegularFile(path), Files.isDirectory(path)
Files.size(path), Files.getLastModifiedTime(path)
\`\`\`

### Copy, Move, Delete
\`\`\`java
Files.copy(src, dest, StandardCopyOption.REPLACE_EXISTING);
Files.move(src, dest, StandardCopyOption.ATOMIC_MOVE);
Files.delete(path); // throws if not found
Files.deleteIfExists(path);
\`\`\`
`,
  exercises: [
    {
      id: 'java-nio-1',
      title: 'Create a Path',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Create a Path from a string.',
      skeleton: `Path p = Path.__BLANK__("src/main/App.java");`,
      solution: `Path p = Path.of("src/main/App.java");`,
      hints: ['Path has a factory method for creation.', 'It accepts one or more strings.', 'Use `of`.'],
      concepts: ['Path.of', 'path creation', 'NIO'],
    },
    {
      id: 'java-nio-2',
      title: 'Read file to string',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Read an entire file into a String.',
      skeleton: `String content = Files.__BLANK__(Path.of("data.txt"));`,
      solution: `String content = Files.readString(Path.of("data.txt"));`,
      hints: ['Files has a method that returns file content as a String.', 'Added in Java 11.', 'Use `readString`.'],
      concepts: ['Files.readString', 'file reading', 'NIO'],
    },
    {
      id: 'java-nio-3',
      title: 'Write string to file',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a string to a file.',
      skeleton: `Files.__BLANK__(Path.of("output.txt"), "Hello NIO");`,
      solution: `Files.writeString(Path.of("output.txt"), "Hello NIO");`,
      hints: ['Files has a method for writing strings.', 'Counterpart to readString.', 'Use `writeString`.'],
      concepts: ['Files.writeString', 'file writing', 'NIO'],
    },
    {
      id: 'java-nio-4',
      title: 'Check file exists',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Check if a file exists.',
      skeleton: `boolean exists = Files.__BLANK__(Path.of("config.yml"));`,
      solution: `boolean exists = Files.exists(Path.of("config.yml"));`,
      hints: ['Files has boolean check methods.', 'Returns true if the path exists.', 'Use `exists`.'],
      concepts: ['Files.exists', 'file check', 'NIO'],
    },
    {
      id: 'java-nio-5',
      title: 'Create directories',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Create a directory including all parent directories.',
      skeleton: `Files.__BLANK__(Path.of("a/b/c"));`,
      solution: `Files.createDirectories(Path.of("a/b/c"));`,
      hints: ['This method creates the entire directory tree.', 'It does not throw if directories already exist.', 'Use `createDirectories`.'],
      concepts: ['createDirectories', 'directory creation', 'NIO'],
    },
    {
      id: 'java-nio-6',
      title: 'Copy file with replace',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Copy a file, replacing the destination if it exists.',
      skeleton: `Files.copy(src, dest, StandardCopyOption.__BLANK__);`,
      solution: `Files.copy(src, dest, StandardCopyOption.REPLACE_EXISTING);`,
      hints: ['StandardCopyOption has an option for overwriting.', 'Without it, FileAlreadyExistsException is thrown.', 'Use `REPLACE_EXISTING`.'],
      concepts: ['Files.copy', 'StandardCopyOption', 'overwrite'],
    },
    {
      id: 'java-nio-7',
      title: 'List directory contents',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that lists all files (not directories) in a given directory.',
      skeleton: '',
      solution: `static List<Path> listFiles(Path dir) throws IOException {
    try (Stream<Path> stream = Files.list(dir)) {
        return stream.filter(Files::isRegularFile).toList();
    }
}`,
      hints: ['Files.list returns a Stream<Path>.', 'Filter with Files::isRegularFile.', 'Must close the stream (use try-with-resources).'],
      concepts: ['Files.list', 'Stream', 'directory listing'],
    },
    {
      id: 'java-nio-8',
      title: 'Find files by extension',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that recursively finds all .java files under a directory.',
      skeleton: '',
      solution: `static List<Path> findJavaFiles(Path dir) throws IOException {
    try (Stream<Path> walk = Files.walk(dir)) {
        return walk
            .filter(p -> p.toString().endsWith(".java"))
            .toList();
    }
}`,
      hints: ['Files.walk recursively traverses directories.', 'Filter paths that end with .java.', 'Close the stream with try-with-resources.'],
      concepts: ['Files.walk', 'recursive search', 'file extension'],
    },
    {
      id: 'java-nio-9',
      title: 'Read all lines',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method that reads all lines from a file and returns only non-empty lines.',
      skeleton: '',
      solution: `static List<String> readNonEmptyLines(Path path) throws IOException {
    return Files.readAllLines(path).stream()
        .filter(line -> !line.isBlank())
        .toList();
}`,
      hints: ['Files.readAllLines returns a List<String>.', 'Use stream and filter to remove blank lines.', 'String.isBlank checks for whitespace-only strings.'],
      concepts: ['Files.readAllLines', 'stream filter', 'isBlank'],
    },
    {
      id: 'java-nio-10',
      title: 'Atomic file write',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method that atomically writes content to a file by writing to a temp file first, then moving.',
      skeleton: '',
      solution: `static void atomicWrite(Path target, String content) throws IOException {
    Path temp = Files.createTempFile(target.getParent(), "tmp", ".tmp");
    try {
        Files.writeString(temp, content);
        Files.move(temp, target, StandardCopyOption.REPLACE_EXISTING, StandardCopyOption.ATOMIC_MOVE);
    } catch (Exception e) {
        Files.deleteIfExists(temp);
        throw e;
    }
}`,
      hints: ['Write to a temporary file first.', 'Use Files.move with ATOMIC_MOVE for atomicity.', 'Clean up the temp file on failure.'],
      concepts: ['atomic write', 'temp file', 'ATOMIC_MOVE'],
    },
    {
      id: 'java-nio-11',
      title: 'Directory size calculation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that calculates the total size of all files in a directory recursively.',
      skeleton: '',
      solution: `static long directorySize(Path dir) throws IOException {
    try (Stream<Path> walk = Files.walk(dir)) {
        return walk
            .filter(Files::isRegularFile)
            .mapToLong(p -> {
                try { return Files.size(p); }
                catch (IOException e) { return 0L; }
            })
            .sum();
    }
}`,
      hints: ['Use Files.walk to traverse recursively.', 'Filter for regular files only.', 'Map each file to its size and sum.'],
      concepts: ['Files.walk', 'Files.size', 'directory traversal'],
    },
    {
      id: 'java-nio-12',
      title: 'Watch directory for changes',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method that watches a directory for new file creation events and prints the filename.',
      skeleton: '',
      solution: `static void watchDirectory(Path dir) throws IOException, InterruptedException {
    WatchService watcher = FileSystems.getDefault().newWatchService();
    dir.register(watcher, StandardWatchEventKinds.ENTRY_CREATE);
    System.out.println("Watching " + dir);
    while (true) {
        WatchKey key = watcher.take();
        for (WatchEvent<?> event : key.pollEvents()) {
            System.out.println("Created: " + event.context());
        }
        if (!key.reset()) break;
    }
}`,
      hints: ['Use WatchService from FileSystems.getDefault().', 'Register the directory with ENTRY_CREATE.', 'Loop with take() and pollEvents().'],
      concepts: ['WatchService', 'file watching', 'event-driven I/O'],
    },
    {
      id: 'java-nio-13',
      title: 'Path resolution error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the path that does not resolve correctly.',
      skeleton: `Path base = Path.of("/home/user");
Path file = Path.of("/data/file.txt");
Path resolved = base.resolve(file); // Expected: /home/user/data/file.txt`,
      solution: `Path base = Path.of("/home/user");
Path file = Path.of("data/file.txt");
Path resolved = base.resolve(file);`,
      hints: ['resolve with an absolute path returns the absolute path unchanged.', 'The second path must be relative for resolve to work.', 'Remove the leading / from the file path.'],
      concepts: ['Path.resolve', 'absolute vs relative', 'path resolution'],
    },
    {
      id: 'java-nio-14',
      title: 'NoSuchFileException not handled',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the code that crashes when the file does not exist.',
      skeleton: `String content = Files.readString(Path.of("maybe-missing.txt"));
// Crashes with NoSuchFileException if file is absent`,
      solution: `Path path = Path.of("maybe-missing.txt");
String content = Files.exists(path) ? Files.readString(path) : "";`,
      hints: ['Check if the file exists before reading.', 'Use Files.exists to verify.', 'Provide a default value if missing.'],
      concepts: ['Files.exists', 'NoSuchFileException', 'defensive check'],
    },
    {
      id: 'java-nio-15',
      title: 'Stream not closed',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the resource leak from an unclosed Files.walk stream.',
      skeleton: `List<Path> files = Files.walk(Path.of("."))
    .filter(Files::isRegularFile)
    .toList(); // Stream never closed!`,
      solution: `List<Path> files;
try (Stream<Path> walk = Files.walk(Path.of("."))) {
    files = walk.filter(Files::isRegularFile).toList();
}`,
      hints: ['Files.walk returns a Stream that holds OS resources.', 'It must be closed after use.', 'Use try-with-resources.'],
      concepts: ['Stream resource', 'try-with-resources', 'Files.walk'],
    },
    {
      id: 'java-nio-16',
      title: 'Predict Path methods',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the output of Path methods.',
      skeleton: `Path p = Path.of("/home/user/docs/file.txt");
System.out.println(p.getFileName());
System.out.println(p.getParent());
System.out.println(p.getNameCount());`,
      solution: `file.txt
/home/user/docs
4`,
      hints: ['getFileName returns the last component.', 'getParent returns everything except the last component.', 'getNameCount counts path elements (excluding root).'],
      concepts: ['getFileName', 'getParent', 'getNameCount'],
    },
    {
      id: 'java-nio-17',
      title: 'Predict Path.resolve',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the result of resolve and relativize.',
      skeleton: `Path base = Path.of("/home/user");
Path full = base.resolve("docs/readme.md");
System.out.println(full);`,
      solution: `/home/user/docs/readme.md`,
      hints: ['resolve appends a relative path to the base.', 'The result combines both paths.', 'Forward slashes separate components.'],
      concepts: ['Path.resolve', 'path concatenation', 'relative path'],
    },
    {
      id: 'java-nio-18',
      title: 'Predict Path.normalize',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the result of normalizing a path with . and .. components.',
      skeleton: `Path p = Path.of("/home/user/../user/./docs/file.txt");
System.out.println(p.normalize());`,
      solution: `/home/user/docs/file.txt`,
      hints: ['normalize removes . and resolves .. components.', '../user goes up then back to user, canceling out.', './docs is just docs.'],
      concepts: ['Path.normalize', 'dot components', 'path simplification'],
    },
    {
      id: 'java-nio-19',
      title: 'Refactor File to Path',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this legacy java.io.File code to use NIO.2 Path and Files.',
      skeleton: `File file = new File("data.txt");
if (file.exists() && file.isFile()) {
    long size = file.length();
    System.out.println("Size: " + size);
}`,
      solution: `Path path = Path.of("data.txt");
if (Files.exists(path) && Files.isRegularFile(path)) {
    long size = Files.size(path);
    System.out.println("Size: " + size);
}`,
      hints: ['Replace File with Path.of.', 'Replace file methods with Files static methods.', 'isFile becomes isRegularFile, length becomes size.'],
      concepts: ['File to Path migration', 'NIO.2', 'refactoring'],
    },
    {
      id: 'java-nio-20',
      title: 'Refactor manual walk to Files.walk',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor this recursive file listing to use Files.walk.',
      skeleton: `void listAllFiles(File dir, List<File> result) {
    File[] children = dir.listFiles();
    if (children != null) {
        for (File child : children) {
            if (child.isFile()) result.add(child);
            else if (child.isDirectory()) listAllFiles(child, result);
        }
    }
}`,
      solution: `List<Path> listAllFiles(Path dir) throws IOException {
    try (Stream<Path> walk = Files.walk(dir)) {
        return walk.filter(Files::isRegularFile).toList();
    }
}`,
      hints: ['Files.walk handles recursion automatically.', 'Filter for regular files with Files::isRegularFile.', 'Use try-with-resources to close the stream.'],
      concepts: ['Files.walk', 'recursive traversal', 'refactoring'],
    },
  ],
};
