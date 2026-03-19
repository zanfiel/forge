import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-io-streams',
  title: '22. I/O Streams',
  explanation: `## I/O Streams

Java I/O uses streams for reading and writing data.

### Byte Streams
\`\`\`java
InputStream  -> FileInputStream, BufferedInputStream, ByteArrayInputStream
OutputStream -> FileOutputStream, BufferedOutputStream, ByteArrayOutputStream
\`\`\`

### Character Streams
\`\`\`java
Reader -> FileReader, BufferedReader, InputStreamReader
Writer -> FileWriter, BufferedWriter, OutputStreamWriter
\`\`\`

### Buffered I/O
Always wrap streams in buffered wrappers for performance:
\`\`\`java
try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        process(line);
    }
}
\`\`\`

### PrintWriter
Convenient text output with print/println/printf:
\`\`\`java
try (PrintWriter pw = new PrintWriter(new FileWriter("out.txt"))) {
    pw.println("Hello");
    pw.printf("Value: %d%n", 42);
}
\`\`\`

### Scanner
Easy text input parsing:
\`\`\`java
Scanner sc = new Scanner(System.in);
int num = sc.nextInt();
\`\`\`
`,
  exercises: [
    {
      id: 'java-io-1',
      title: 'Create a BufferedReader',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Create a BufferedReader wrapping a FileReader.',
      skeleton: `BufferedReader br = new BufferedReader(new __BLANK__("data.txt"));`,
      solution: `BufferedReader br = new BufferedReader(new FileReader("data.txt"));`,
      hints: ['BufferedReader wraps another Reader.', 'For files, use the file-based Reader.', 'Use `FileReader`.'],
      concepts: ['BufferedReader', 'FileReader', 'decorator pattern'],
    },
    {
      id: 'java-io-2',
      title: 'Read a line',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Read a single line from a BufferedReader.',
      skeleton: `String line = br.__BLANK__();`,
      solution: `String line = br.readLine();`,
      hints: ['BufferedReader has a line-reading method.', 'Returns null at end of stream.', 'Use `readLine`.'],
      concepts: ['readLine', 'BufferedReader', 'text input'],
    },
    {
      id: 'java-io-3',
      title: 'Write with PrintWriter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a line of text using PrintWriter.',
      skeleton: `PrintWriter pw = new PrintWriter("output.txt");
pw.__BLANK__("Hello, World!");
pw.close();`,
      solution: `PrintWriter pw = new PrintWriter("output.txt");
pw.println("Hello, World!");
pw.close();`,
      hints: ['PrintWriter has print and println methods.', 'println adds a newline.', 'Use `println`.'],
      concepts: ['PrintWriter', 'println', 'text output'],
    },
    {
      id: 'java-io-4',
      title: 'Read bytes from InputStream',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Read all bytes from an InputStream.',
      skeleton: `byte[] data = inputStream.__BLANK__();`,
      solution: `byte[] data = inputStream.readAllBytes();`,
      hints: ['Java 9 added a convenient method to read all bytes.', 'It returns a byte array.', 'Use `readAllBytes`.'],
      concepts: ['readAllBytes', 'InputStream', 'byte array'],
    },
    {
      id: 'java-io-5',
      title: 'Transfer stream data',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Transfer all bytes from an InputStream to an OutputStream.',
      skeleton: `inputStream.__BLANK__(outputStream);`,
      solution: `inputStream.transferTo(outputStream);`,
      hints: ['Java 9 added a method to pipe one stream to another.', 'It copies all remaining bytes.', 'Use `transferTo`.'],
      concepts: ['transferTo', 'InputStream', 'OutputStream'],
    },
    {
      id: 'java-io-6',
      title: 'Scanner nextInt',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Read an integer from a Scanner.',
      skeleton: `Scanner sc = new Scanner(System.in);
int num = sc.__BLANK__();`,
      solution: `Scanner sc = new Scanner(System.in);
int num = sc.nextInt();`,
      hints: ['Scanner has typed read methods.', 'For integers, use the int-specific method.', 'Use `nextInt`.'],
      concepts: ['Scanner', 'nextInt', 'input parsing'],
    },
    {
      id: 'java-io-7',
      title: 'Read file to string',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method that reads an entire file into a String using BufferedReader.',
      skeleton: '',
      solution: `static String readFileToString(String path) throws IOException {
    StringBuilder sb = new StringBuilder();
    try (BufferedReader br = new BufferedReader(new FileReader(path))) {
        String line;
        while ((line = br.readLine()) != null) {
            sb.append(line).append(System.lineSeparator());
        }
    }
    return sb.toString();
}`,
      hints: ['Use try-with-resources to auto-close the reader.', 'Loop with readLine() until null.', 'Append each line and a line separator.'],
      concepts: ['BufferedReader', 'StringBuilder', 'file reading'],
    },
    {
      id: 'java-io-8',
      title: 'Write lines to file',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method that writes a List<String> to a file, one line per element.',
      skeleton: '',
      solution: `static void writeLines(String path, List<String> lines) throws IOException {
    try (PrintWriter pw = new PrintWriter(new FileWriter(path))) {
        for (String line : lines) {
            pw.println(line);
        }
    }
}`,
      hints: ['Use PrintWriter wrapped around FileWriter.', 'Use try-with-resources for auto-close.', 'Call println for each line.'],
      concepts: ['PrintWriter', 'FileWriter', 'file writing'],
    },
    {
      id: 'java-io-9',
      title: 'Copy file using streams',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that copies a file using buffered byte streams.',
      skeleton: '',
      solution: `static void copyFile(String src, String dest) throws IOException {
    try (InputStream in = new BufferedInputStream(new FileInputStream(src));
         OutputStream out = new BufferedOutputStream(new FileOutputStream(dest))) {
        in.transferTo(out);
    }
}`,
      hints: ['Use FileInputStream and FileOutputStream for byte copying.', 'Wrap in Buffered versions for performance.', 'Use transferTo for efficient copying.'],
      concepts: ['BufferedInputStream', 'BufferedOutputStream', 'file copy'],
    },
    {
      id: 'java-io-10',
      title: 'Read CSV and parse',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that reads a CSV file and returns a List of String arrays (one per row).',
      skeleton: '',
      solution: `static List<String[]> readCsv(String path) throws IOException {
    List<String[]> rows = new ArrayList<>();
    try (BufferedReader br = new BufferedReader(new FileReader(path))) {
        String line;
        while ((line = br.readLine()) != null) {
            rows.add(line.split(","));
        }
    }
    return rows;
}`,
      hints: ['Read line by line with BufferedReader.', 'Split each line on comma.', 'Add the resulting array to the list.'],
      concepts: ['CSV parsing', 'split', 'BufferedReader'],
    },
    {
      id: 'java-io-11',
      title: 'ByteArrayOutputStream usage',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that captures InputStream content into a byte array using ByteArrayOutputStream.',
      skeleton: '',
      solution: `static byte[] toByteArray(InputStream input) throws IOException {
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    byte[] buffer = new byte[8192];
    int bytesRead;
    while ((bytesRead = input.read(buffer)) != -1) {
        baos.write(buffer, 0, bytesRead);
    }
    return baos.toByteArray();
}`,
      hints: ['Use a buffer for efficient reading.', 'read() returns -1 at end of stream.', 'Write the buffer contents to ByteArrayOutputStream.'],
      concepts: ['ByteArrayOutputStream', 'buffer', 'stream reading'],
    },
    {
      id: 'java-io-12',
      title: 'String to InputStream',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method that converts a String to an InputStream.',
      skeleton: '',
      solution: `static InputStream stringToStream(String text) {
    return new ByteArrayInputStream(text.getBytes(java.nio.charset.StandardCharsets.UTF_8));
}`,
      hints: ['Convert the string to bytes first.', 'Use a specific charset like UTF-8.', 'ByteArrayInputStream wraps a byte array.'],
      concepts: ['ByteArrayInputStream', 'charset', 'conversion'],
    },
    {
      id: 'java-io-13',
      title: 'Unclosed stream resource leak',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the resource leak where the stream is never closed on exception.',
      skeleton: `String readFirst(String path) throws IOException {
    BufferedReader br = new BufferedReader(new FileReader(path));
    String line = br.readLine();
    br.close();
    return line;
}`,
      solution: `String readFirst(String path) throws IOException {
    try (BufferedReader br = new BufferedReader(new FileReader(path))) {
        return br.readLine();
    }
}`,
      hints: ['If readLine throws, close is never called.', 'Use try-with-resources for guaranteed closing.', 'Move the reader declaration into try parentheses.'],
      concepts: ['resource leak', 'try-with-resources', 'BufferedReader'],
    },
    {
      id: 'java-io-14',
      title: 'Wrong charset encoding',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the code that reads a UTF-8 file with the wrong charset.',
      skeleton: `BufferedReader br = new BufferedReader(new FileReader("data.txt"));
// FileReader uses platform default charset, not UTF-8`,
      solution: `BufferedReader br = new BufferedReader(
    new InputStreamReader(new FileInputStream("data.txt"), java.nio.charset.StandardCharsets.UTF_8)
);`,
      hints: ['FileReader uses the platform default charset.', 'Use InputStreamReader to specify the charset.', 'StandardCharsets.UTF_8 ensures correct encoding.'],
      concepts: ['charset', 'InputStreamReader', 'UTF-8'],
    },
    {
      id: 'java-io-15',
      title: 'Scanner not consuming newline',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the Scanner bug where nextLine() reads an empty string after nextInt().',
      skeleton: `Scanner sc = new Scanner(System.in);
int num = sc.nextInt();
String name = sc.nextLine(); // Bug: reads leftover newline, returns ""`,
      solution: `Scanner sc = new Scanner(System.in);
int num = sc.nextInt();
sc.nextLine(); // consume the leftover newline
String name = sc.nextLine();`,
      hints: ['nextInt() does not consume the trailing newline.', 'The next nextLine() reads an empty string.', 'Add an extra nextLine() call to consume the leftover newline.'],
      concepts: ['Scanner', 'newline consumption', 'nextInt bug'],
    },
    {
      id: 'java-io-16',
      title: 'Predict readLine loop',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict how many times the loop body executes for a 3-line file.',
      skeleton: `// File contents: "A\\nB\\nC"
BufferedReader br = new BufferedReader(new StringReader("A\\nB\\nC"));
int count = 0;
while (br.readLine() != null) count++;
System.out.println(count);`,
      solution: `3`,
      hints: ['readLine returns one line per call.', 'It returns null after the last line.', 'Three lines means three iterations.'],
      concepts: ['readLine', 'loop count', 'null termination'],
    },
    {
      id: 'java-io-17',
      title: 'Predict PrintWriter autoflush',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict whether output appears before close().',
      skeleton: `StringWriter sw = new StringWriter();
PrintWriter pw = new PrintWriter(sw);
pw.print("hello");
System.out.println(sw.toString().length());
pw.close();
System.out.println(sw.toString().length());`,
      solution: `5
5`,
      hints: ['PrintWriter to StringWriter buffers in the StringWriter.', 'StringWriter captures all written text immediately.', 'Both calls show length 5.'],
      concepts: ['PrintWriter', 'StringWriter', 'buffering'],
    },
    {
      id: 'java-io-18',
      title: 'Predict System.in scanner',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the output given Scanner input "42 hello".',
      skeleton: `// Input: "42 hello"
Scanner sc = new Scanner(new StringReader("42 hello"));
int n = sc.nextInt();
String s = sc.next();
System.out.println(n + " " + s);`,
      solution: `42 hello`,
      hints: ['nextInt reads the integer 42.', 'next() reads the next token "hello".', 'They are separated by a space in the output.'],
      concepts: ['Scanner', 'nextInt', 'next'],
    },
    {
      id: 'java-io-19',
      title: 'Refactor to try-with-resources chain',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this nested stream creation to use try-with-resources properly.',
      skeleton: `FileInputStream fis = null;
BufferedInputStream bis = null;
try {
    fis = new FileInputStream("data.bin");
    bis = new BufferedInputStream(fis);
    process(bis);
} finally {
    if (bis != null) bis.close();
    else if (fis != null) fis.close();
}`,
      solution: `try (FileInputStream fis = new FileInputStream("data.bin");
     BufferedInputStream bis = new BufferedInputStream(fis)) {
    process(bis);
}`,
      hints: ['Try-with-resources supports multiple resources.', 'Separate them with semicolons.', 'Resources are closed in reverse order.'],
      concepts: ['try-with-resources', 'multiple resources', 'refactoring'],
    },
    {
      id: 'java-io-20',
      title: 'Refactor to Files utility',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this manual file reading to use the modern Files utility.',
      skeleton: `StringBuilder content = new StringBuilder();
try (BufferedReader br = new BufferedReader(new FileReader("data.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        content.append(line).append("\\n");
    }
}
String text = content.toString();`,
      solution: `String text = java.nio.file.Files.readString(java.nio.file.Path.of("data.txt"));`,
      hints: ['Java 11 added Files.readString for simple file reading.', 'It takes a Path and returns the entire contents.', 'Path.of converts a string to a Path.'],
      concepts: ['Files.readString', 'Path', 'modern I/O'],
    },
  ],
};
