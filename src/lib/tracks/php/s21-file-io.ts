import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-fileio',
  title: '21. File I/O',
  explanation: `## File I/O in PHP

PHP offers comprehensive file handling -- from low-level file pointers to convenient one-liner functions for reading and writing entire files.

### fopen / fread / fwrite / fclose
\`\`\`php
<?php
\$fp = fopen('data.txt', 'r');
\$content = fread(\$fp, filesize('data.txt'));
fclose(\$fp);

\$fp = fopen('output.txt', 'w');
fwrite(\$fp, 'Hello, World!');
fclose(\$fp);
\`\`\`

### file_get_contents / file_put_contents
\`\`\`php
<?php
\$content = file_get_contents('data.txt');
file_put_contents('output.txt', 'Hello!');
file_put_contents('log.txt', 'entry\\n', FILE_APPEND);
\`\`\`

### Reading Line by Line
\`\`\`php
<?php
\$fp = fopen('data.txt', 'r');
while ((\$line = fgets(\$fp)) !== false) {
    echo trim(\$line) . '\\n';
}
fclose(\$fp);
\`\`\`

### CSV Handling
\`\`\`php
<?php
// Reading CSV
\$fp = fopen('data.csv', 'r');
while ((\$row = fgetcsv(\$fp)) !== false) {
    echo implode(' | ', \$row) . '\\n';
}
fclose(\$fp);

// Writing CSV
\$fp = fopen('output.csv', 'w');
fputcsv(\$fp, ['Name', 'Age', 'City']);
fputcsv(\$fp, ['Alice', 30, 'NYC']);
fclose(\$fp);
\`\`\`

### Directory Operations
\`\`\`php
<?php
mkdir('new_dir', 0755, true);  // recursive
\$files = scandir('.');
is_dir('path') && is_file('file.txt');
unlink('old_file.txt');  // delete file
rmdir('empty_dir');       // delete empty directory
\`\`\``,
  exercises: [
    {
      id: 'php-fileio-1',
      title: 'Read File Contents',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to read the entire contents of a file.',
      skeleton: `<?php
\$content = ___('data.txt');
echo \$content;`,
      solution: `<?php
\$content = file_get_contents('data.txt');
echo \$content;`,
      hints: [
        'file_get_contents() reads an entire file into a string.',
        'It takes the filename as its argument.',
        'This is the simplest way to read a file in PHP.',
      ],
      concepts: ['file_get_contents', 'read-file', 'string-return'],
    },
    {
      id: 'php-fileio-2',
      title: 'Write File Contents',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to write a string to a file.',
      skeleton: `<?php
___('output.txt', 'Hello, World!');`,
      solution: `<?php
file_put_contents('output.txt', 'Hello, World!');`,
      hints: [
        'file_put_contents() writes a string to a file.',
        'It takes the filename and content as arguments.',
        'By default, it overwrites existing content.',
      ],
      concepts: ['file_put_contents', 'write-file', 'overwrite'],
    },
    {
      id: 'php-fileio-3',
      title: 'Append to File',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to append text to a file instead of overwriting.',
      skeleton: `<?php
file_put_contents('log.txt', 'new entry\\n', ___);`,
      solution: `<?php
file_put_contents('log.txt', 'new entry\\n', FILE_APPEND);`,
      hints: [
        'Pass FILE_APPEND as the third argument.',
        'Without this flag, the file is overwritten.',
        'FILE_APPEND is a predefined PHP constant.',
      ],
      concepts: ['FILE_APPEND', 'append', 'flags'],
    },
    {
      id: 'php-fileio-4',
      title: 'Open and Close File Handle',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blanks to open a file for reading and close it.',
      skeleton: `<?php
\$fp = ___('data.txt', 'r');
\$line = fgets(\$fp);
___(\$fp);
echo \$line;`,
      solution: `<?php
\$fp = fopen('data.txt', 'r');
\$line = fgets(\$fp);
fclose(\$fp);
echo \$line;`,
      hints: [
        'fopen() opens a file and returns a handle.',
        'The second argument is the mode: "r" for read.',
        'fclose() closes an open file handle.',
      ],
      concepts: ['fopen', 'fclose', 'file-handle'],
    },
    {
      id: 'php-fileio-5',
      title: 'Create Directory Recursively',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blanks to create nested directories.',
      skeleton: `<?php
___('path/to/deep/dir', 0755, ___);`,
      solution: `<?php
mkdir('path/to/deep/dir', 0755, true);`,
      hints: [
        'mkdir() creates directories.',
        'The second argument is the permission mode.',
        'Pass true as the third argument for recursive creation.',
      ],
      concepts: ['mkdir', 'recursive', 'permissions'],
    },
    {
      id: 'php-fileio-6',
      title: 'CSV Read with fgetcsv',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to read one row from a CSV file.',
      skeleton: `<?php
\$fp = fopen('data.csv', 'r');
\$row = ___(\$fp);
fclose(\$fp);
echo implode(', ', \$row);`,
      solution: `<?php
\$fp = fopen('data.csv', 'r');
\$row = fgetcsv(\$fp);
fclose(\$fp);
echo implode(', ', \$row);`,
      hints: [
        'fgetcsv() reads one line and parses it as CSV.',
        'It returns an array of fields.',
        'It takes the file handle as its argument.',
      ],
      concepts: ['fgetcsv', 'CSV', 'parsing'],
    },
    {
      id: 'php-fileio-7',
      title: 'Write a File Copier',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Write a function copyFile(string $src, string $dst): bool that copies a file using file_get_contents and file_put_contents. Return true on success.',
      skeleton: `<?php
// Write the copyFile function`,
      solution: `<?php
function copyFile(string \$src, string \$dst): bool {
    \$content = file_get_contents(\$src);
    if (\$content === false) {
        return false;
    }
    return file_put_contents(\$dst, \$content) !== false;
}`,
      hints: [
        'Read the source file with file_get_contents().',
        'Write to the destination with file_put_contents().',
        'Check for false returns to detect failures.',
      ],
      concepts: ['file-copy', 'error-handling', 'return-value'],
    },
    {
      id: 'php-fileio-8',
      title: 'Write a Line Counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function countLines(string $filename): int that counts the number of lines in a file.',
      skeleton: `<?php
// Write the countLines function`,
      solution: `<?php
function countLines(string \$filename): int {
    \$content = file(\$filename, FILE_IGNORE_NEW_LINES);
    return count(\$content);
}`,
      hints: [
        'The file() function reads a file into an array of lines.',
        'FILE_IGNORE_NEW_LINES strips trailing newlines.',
        'count() the array to get the line count.',
      ],
      concepts: ['file-function', 'line-count', 'FILE_IGNORE_NEW_LINES'],
    },
    {
      id: 'php-fileio-9',
      title: 'Write a CSV Parser',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function parseCsv(string $filename): array that reads a CSV file and returns an array of associative arrays using the first row as headers.',
      skeleton: `<?php
// Write the parseCsv function`,
      solution: `<?php
function parseCsv(string \$filename): array {
    \$fp = fopen(\$filename, 'r');
    \$headers = fgetcsv(\$fp);
    \$rows = [];
    while ((\$row = fgetcsv(\$fp)) !== false) {
        \$rows[] = array_combine(\$headers, \$row);
    }
    fclose(\$fp);
    return \$rows;
}`,
      hints: [
        'Read the first row as headers with fgetcsv().',
        'Loop through remaining rows with a while loop.',
        'Use array_combine() to pair headers with values.',
      ],
      concepts: ['CSV-parsing', 'array_combine', 'headers'],
    },
    {
      id: 'php-fileio-10',
      title: 'Write a Safe File Writer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function safeWrite(string $path, string $content): bool that writes to a temp file first, then renames it to the target path for atomic writes.',
      skeleton: `<?php
// Write the safeWrite function`,
      solution: `<?php
function safeWrite(string \$path, string \$content): bool {
    \$tmp = \$path . '.tmp';
    if (file_put_contents(\$tmp, \$content) === false) {
        return false;
    }
    return rename(\$tmp, \$path);
}`,
      hints: [
        'Write to a temporary file first.',
        'Use rename() to atomically move the temp file.',
        'This prevents partial writes from corrupting the file.',
      ],
      concepts: ['atomic-write', 'rename', 'temp-file'],
    },
    {
      id: 'php-fileio-11',
      title: 'Write a Directory Lister',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function listFiles(string $dir): array that returns an array of filenames (not directories) in the given directory, excluding . and ..',
      skeleton: `<?php
// Write the listFiles function`,
      solution: `<?php
function listFiles(string \$dir): array {
    \$items = scandir(\$dir);
    \$files = [];
    foreach (\$items as \$item) {
        if (\$item === '.' || \$item === '..') continue;
        if (is_file(\$dir . DIRECTORY_SEPARATOR . \$item)) {
            \$files[] = \$item;
        }
    }
    return \$files;
}`,
      hints: [
        'Use scandir() to get all entries in the directory.',
        'Skip . and .. entries.',
        'Use is_file() to filter out subdirectories.',
      ],
      concepts: ['scandir', 'is_file', 'DIRECTORY_SEPARATOR'],
    },
    {
      id: 'php-fileio-12',
      title: 'Write a JSON File Reader',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function readJson(string $path): array that reads a JSON file and returns the decoded data. Throw RuntimeException if the file does not exist or JSON is invalid.',
      skeleton: `<?php
// Write the readJson function`,
      solution: `<?php
function readJson(string \$path): array {
    if (!file_exists(\$path)) {
        throw new RuntimeException("File not found: \$path");
    }
    \$content = file_get_contents(\$path);
    \$data = json_decode(\$content, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new RuntimeException('Invalid JSON: ' . json_last_error_msg());
    }
    return \$data;
}`,
      hints: [
        'Check file_exists() before reading.',
        'Use json_decode with true for associative arrays.',
        'Check json_last_error() after decoding.',
      ],
      concepts: ['json-file', 'error-handling', 'RuntimeException'],
    },
    {
      id: 'php-fileio-13',
      title: 'Fix Missing fclose',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the resource leak where the file handle is never closed.',
      skeleton: `<?php
function readFirst(string \$file): string {
    \$fp = fopen(\$file, 'r');
    \$line = fgets(\$fp);
    return trim(\$line);
}`,
      solution: `<?php
function readFirst(string \$file): string {
    \$fp = fopen(\$file, 'r');
    \$line = fgets(\$fp);
    fclose(\$fp);
    return trim(\$line);
}`,
      hints: [
        'The file handle $fp is never closed.',
        'Add fclose($fp) before the return.',
        'Not closing files causes resource leaks.',
      ],
      concepts: ['resource-leak', 'fclose', 'cleanup'],
    },
    {
      id: 'php-fileio-14',
      title: 'Fix Wrong File Mode',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the fopen mode so the function can actually write to the file.',
      skeleton: `<?php
function writeLog(string \$file, string \$msg): void {
    \$fp = fopen(\$file, 'r');
    fwrite(\$fp, \$msg . "\\n");
    fclose(\$fp);
}`,
      solution: `<?php
function writeLog(string \$file, string \$msg): void {
    \$fp = fopen(\$file, 'a');
    fwrite(\$fp, \$msg . "\\n");
    fclose(\$fp);
}`,
      hints: [
        'Mode "r" opens the file for reading only.',
        'To append, use mode "a".',
        'To overwrite, use mode "w".',
      ],
      concepts: ['file-modes', 'fopen', 'append-mode'],
    },
    {
      id: 'php-fileio-15',
      title: 'Fix CSV Write Missing Headers',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the CSV writer that writes data but forgets the header row.',
      skeleton: `<?php
function writeCsv(string \$file, array \$headers, array \$rows): void {
    \$fp = fopen(\$file, 'w');
    foreach (\$rows as \$row) {
        fputcsv(\$fp, \$row);
    }
    fclose(\$fp);
}`,
      solution: `<?php
function writeCsv(string \$file, array \$headers, array \$rows): void {
    \$fp = fopen(\$file, 'w');
    fputcsv(\$fp, \$headers);
    foreach (\$rows as \$row) {
        fputcsv(\$fp, \$row);
    }
    fclose(\$fp);
}`,
      hints: [
        'The header row is never written to the file.',
        'Add fputcsv($fp, $headers) before the data loop.',
        'Headers should be the first row in a CSV file.',
      ],
      concepts: ['CSV-headers', 'fputcsv', 'missing-step'],
    },
    {
      id: 'php-fileio-16',
      title: 'Predict file_exists Behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict the output of file existence checks.',
      skeleton: `<?php
file_put_contents('test.txt', 'hello');
echo file_exists('test.txt') ? 'yes' : 'no';
echo ' ';
unlink('test.txt');
echo file_exists('test.txt') ? 'yes' : 'no';`,
      solution: `yes no`,
      hints: [
        'file_put_contents creates the file if it does not exist.',
        'After unlink, the file is deleted.',
        'file_exists returns false for deleted files.',
      ],
      concepts: ['file_exists', 'unlink', 'lifecycle'],
    },
    {
      id: 'php-fileio-17',
      title: 'Predict file() Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict how many elements file() returns.',
      skeleton: `<?php
file_put_contents('test.txt', "line1\\nline2\\nline3");
\$lines = file('test.txt', FILE_IGNORE_NEW_LINES);
echo count(\$lines) . ' ' . \$lines[1];
unlink('test.txt');`,
      solution: `3 line2`,
      hints: [
        'The file has 3 lines separated by newlines.',
        'file() returns an array with one element per line.',
        '$lines[1] is the second element (zero-indexed).',
      ],
      concepts: ['file-function', 'array', 'indexing'],
    },
    {
      id: 'php-fileio-18',
      title: 'Predict Append Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the file content after multiple writes.',
      skeleton: `<?php
file_put_contents('test.txt', 'A');
file_put_contents('test.txt', 'B');
file_put_contents('test.txt', 'C', FILE_APPEND);
echo file_get_contents('test.txt');
unlink('test.txt');`,
      solution: `BC`,
      hints: [
        'First write puts "A". Second write overwrites with "B".',
        'Third write appends "C" to "B".',
        'Without FILE_APPEND, the file is overwritten.',
      ],
      concepts: ['overwrite-vs-append', 'FILE_APPEND', 'sequence'],
    },
    {
      id: 'php-fileio-19',
      title: 'Refactor fopen Loop to file()',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the verbose fopen/fgets loop into a simpler file() call.',
      skeleton: `<?php
\$fp = fopen('data.txt', 'r');
\$lines = [];
while ((\$line = fgets(\$fp)) !== false) {
    \$lines[] = trim(\$line);
}
fclose(\$fp);`,
      solution: `<?php
\$lines = file('data.txt', FILE_IGNORE_NEW_LINES);`,
      hints: [
        'file() reads the entire file into an array of lines.',
        'FILE_IGNORE_NEW_LINES strips trailing newlines (like trim).',
        'One line replaces the entire loop.',
      ],
      concepts: ['file-function', 'simplification', 'FILE_IGNORE_NEW_LINES'],
    },
    {
      id: 'php-fileio-20',
      title: 'Refactor Repeated Writes to Buffered Write',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the code that opens and closes the file repeatedly into a single open/write/close cycle.',
      skeleton: `<?php
\$items = ['apple', 'banana', 'cherry'];
foreach (\$items as \$item) {
    file_put_contents('fruits.txt', \$item . "\\n", FILE_APPEND);
}`,
      solution: `<?php
\$items = ['apple', 'banana', 'cherry'];
\$fp = fopen('fruits.txt', 'w');
foreach (\$items as \$item) {
    fwrite(\$fp, \$item . "\\n");
}
fclose(\$fp);`,
      hints: [
        'Opening and closing a file in each iteration is inefficient.',
        'Open the file once before the loop.',
        'Use fwrite() inside the loop and fclose() after.',
      ],
      concepts: ['buffered-write', 'performance', 'file-handle'],
    },
  ],
};
