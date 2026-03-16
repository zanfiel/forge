import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-fileio',
  title: '19. File I/O',
  explanation: `## File I/O in C

C provides buffered I/O through the \`<stdio.h>\` FILE interface.

\`\`\`c
FILE *f = fopen("data.txt", "r");
if (!f) { perror("fopen"); return 1; }
char line[256];
while (fgets(line, sizeof(line), f)) {
    printf("%s", line);
}
fclose(f);
\`\`\`

### Key Functions
- \`fopen / fclose\`: open and close files
- \`fgets / fputs\`: line-oriented text I/O
- \`fprintf / fscanf\`: formatted I/O
- \`fread / fwrite\`: binary I/O
- \`fseek / ftell / rewind\`: random access
- \`perror / strerror\`: error reporting
`,
  exercises: [
    {
      id: 'c-fileio-1',
      title: 'Open and close file',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Open a file for reading and close it properly.',
      skeleton: `#include <stdio.h>

int main(void) {
    FILE *f = __BLANK__("data.txt", "r");
    if (__BLANK__) {
        perror("Cannot open file");
        return 1;
    }
    printf("File opened successfully\\n");
    __BLANK__(f);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    FILE *f = fopen("data.txt", "r");
    if (!f) {
        perror("Cannot open file");
        return 1;
    }
    printf("File opened successfully\\n");
    fclose(f);
    return 0;
}`,
      hints: [
        'fopen returns a FILE pointer or NULL on failure.',
        'Always check if fopen returns NULL.',
        'fclose releases the file resource.',
      ],
      concepts: ['fopen', 'fclose', 'error checking'],
    },
    {
      id: 'c-fileio-2',
      title: 'Read lines with fgets',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Read a file line by line using fgets.',
      skeleton: `#include <stdio.h>

int main(void) {
    FILE *f = fopen("input.txt", "r");
    if (!f) return 1;

    char line[256];
    int count = 0;
    while (__BLANK__(line, __BLANK__, f) != NULL) {
        count++;
        printf("Line %d: %s", count, line);
    }

    fclose(f);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    FILE *f = fopen("input.txt", "r");
    if (!f) return 1;

    char line[256];
    int count = 0;
    while (fgets(line, sizeof(line), f) != NULL) {
        count++;
        printf("Line %d: %s", count, line);
    }

    fclose(f);
    return 0;
}`,
      hints: [
        'fgets reads up to size-1 characters or until newline.',
        'sizeof(line) gives the buffer size (256).',
        'fgets returns NULL on EOF or error.',
      ],
      concepts: ['fgets', 'line reading', 'buffer size'],
    },
    {
      id: 'c-fileio-3',
      title: 'Write to file',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write formatted text to a file.',
      skeleton: `// Write a program that:
// 1. Opens "output.txt" for writing
// 2. Writes 10 lines: "Line N: value = N*N"
// 3. Closes the file
// 4. Reads and prints the file to verify`,
      solution: `#include <stdio.h>

int main(void) {
    FILE *f = fopen("output.txt", "w");
    if (!f) { perror("fopen"); return 1; }

    for (int i = 1; i <= 10; i++) {
        fprintf(f, "Line %d: value = %d\\n", i, i * i);
    }
    fclose(f);

    f = fopen("output.txt", "r");
    if (!f) { perror("fopen"); return 1; }

    char line[128];
    while (fgets(line, sizeof(line), f)) {
        printf("%s", line);
    }
    fclose(f);
    return 0;
}`,
      hints: [
        '"w" mode creates or truncates the file.',
        'fprintf works like printf but writes to a file.',
        'Close and reopen for reading to verify.',
      ],
      concepts: ['fopen write mode', 'fprintf', 'file verification'],
    },
    {
      id: 'c-fileio-4',
      title: 'Predict file mode behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict what happens with different file open modes.',
      skeleton: `// Conceptual question about file modes:
// "r"  - read only, file must exist
// "w"  - write only, creates/truncates
// "a"  - append only, creates if needed
// "r+" - read/write, file must exist
// "w+" - read/write, creates/truncates
// "a+" - read/append, creates if needed

// What happens:
// 1. fopen("new.txt", "r") on non-existent file -> NULL
// 2. fopen("exist.txt", "w") -> truncates to 0 bytes
// 3. fopen("exist.txt", "a"), write "hello" -> appended

#include <stdio.h>
int main(void) {
    FILE *f = fopen("nonexistent_file_xyz.txt", "r");
    printf("%d\\n", f == NULL);
    return 0;
}`,
      solution: `1`,
      hints: [
        '"r" mode fails (NULL) if the file does not exist.',
        '"w" mode always truncates existing content to zero.',
        '"a" mode always appends to the end.',
      ],
      concepts: ['file modes', 'open behavior', 'truncate vs append'],
    },
    {
      id: 'c-fileio-5',
      title: 'Binary file I/O',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Read and write binary data with fread and fwrite.',
      skeleton: `// Write a program that:
// 1. Creates an array of 5 doubles
// 2. Writes them to a binary file
// 3. Reads them back and prints them`,
      solution: `#include <stdio.h>

int main(void) {
    double values[] = {1.1, 2.2, 3.3, 4.4, 5.5};
    int count = 5;

    FILE *f = fopen("data.bin", "wb");
    if (!f) { perror("write"); return 1; }
    fwrite(values, sizeof(double), count, f);
    fclose(f);

    double loaded[5];
    f = fopen("data.bin", "rb");
    if (!f) { perror("read"); return 1; }
    size_t read = fread(loaded, sizeof(double), count, f);
    fclose(f);

    printf("Read %zu values:\\n", read);
    for (int i = 0; i < (int)read; i++) {
        printf("%.1f ", loaded[i]);
    }
    printf("\\n");
    return 0;
}`,
      hints: [
        'Use "wb" and "rb" for binary mode.',
        'fwrite(data, element_size, count, file) writes raw bytes.',
        'fread returns the number of elements actually read.',
      ],
      concepts: ['fread', 'fwrite', 'binary mode'],
    },
    {
      id: 'c-fileio-6',
      title: 'Fix file leak',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the file handle leak in error paths.',
      skeleton: `#include <stdio.h>
#include <string.h>

int process_file(const char *path) {
    FILE *f = fopen(path, "r");
    if (!f) return -1;

    char line[256];
    if (!fgets(line, sizeof(line), f)) {
        return -2;  // Bug: file not closed!
    }

    if (strlen(line) > 100) {
        return -3;  // Bug: file not closed!
    }

    printf("First line: %s", line);
    fclose(f);
    return 0;
}

int main(void) {
    process_file("test.txt");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

int process_file(const char *path) {
    FILE *f = fopen(path, "r");
    if (!f) return -1;

    char line[256];
    if (!fgets(line, sizeof(line), f)) {
        fclose(f);
        return -2;
    }

    if (strlen(line) > 100) {
        fclose(f);
        return -3;
    }

    printf("First line: %s", line);
    fclose(f);
    return 0;
}

int main(void) {
    process_file("test.txt");
    return 0;
}`,
      hints: [
        'Every fopen must have a matching fclose on ALL code paths.',
        'Early returns often forget to close files.',
        'Add fclose(f) before every return after a successful fopen.',
      ],
      concepts: ['resource leak', 'file handle', 'cleanup on error'],
    },
    {
      id: 'c-fileio-7',
      title: 'File seek and tell',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use fseek and ftell for random access in files.',
      skeleton: `#include <stdio.h>

int main(void) {
    FILE *f = fopen("data.bin", "rb");
    if (!f) return 1;

    // Get file size
    __BLANK__(f, 0, SEEK_END);
    long size = __BLANK__(f);
    __BLANK__(f);  // Back to start

    printf("File size: %ld bytes\\n", size);

    // Read 3rd double (index 2)
    fseek(f, 2 * sizeof(double), __BLANK__);
    double val;
    fread(&val, sizeof(double), 1, f);
    printf("3rd value: %.1f\\n", val);

    fclose(f);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    FILE *f = fopen("data.bin", "rb");
    if (!f) return 1;

    // Get file size
    fseek(f, 0, SEEK_END);
    long size = ftell(f);
    rewind(f);

    printf("File size: %ld bytes\\n", size);

    // Read 3rd double (index 2)
    fseek(f, 2 * sizeof(double), SEEK_SET);
    double val;
    fread(&val, sizeof(double), 1, f);
    printf("3rd value: %.1f\\n", val);

    fclose(f);
    return 0;
}`,
      hints: [
        'fseek(f, 0, SEEK_END) moves to end of file.',
        'ftell returns the current position in bytes.',
        'rewind(f) is equivalent to fseek(f, 0, SEEK_SET).',
      ],
      concepts: ['fseek', 'ftell', 'rewind', 'random access'],
    },
    {
      id: 'c-fileio-8',
      title: 'Predict fgets behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict how fgets handles newlines and buffer limits.',
      skeleton: `#include <stdio.h>
#include <string.h>

int main(void) {
    // Simulating fgets behavior:
    char buf[10];

    // If file contains "Hello World\\n":
    // fgets reads at most 9 chars + null
    // "Hello Wor" + '\\0' (line truncated, no newline)
    
    // If file contains "Hi\\n":
    // fgets reads "Hi\\n" + '\\0' (includes newline)
    
    char line[] = "Hi\\n";
    printf("%zu\\n", strlen(line));  // includes \\n
    printf("%d\\n", line[2] == '\\n');
    return 0;
}`,
      solution: `3
1`,
      hints: [
        'fgets includes the newline in the buffer if there is room.',
        '"Hi\\n" has 3 characters: H, i, \\n.',
        'line[2] is the newline character.',
      ],
      concepts: ['fgets newline', 'buffer behavior', 'string length'],
    },
    {
      id: 'c-fileio-9',
      title: 'Copy file',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that copies a file byte by byte.',
      skeleton: `// Write int copy_file(const char *src, const char *dst)
// that copies a file using a buffer.
// Return 0 on success, -1 on error.`,
      solution: `#include <stdio.h>

int copy_file(const char *src, const char *dst) {
    FILE *in = fopen(src, "rb");
    if (!in) return -1;

    FILE *out = fopen(dst, "wb");
    if (!out) { fclose(in); return -1; }

    char buf[4096];
    size_t n;
    while ((n = fread(buf, 1, sizeof(buf), in)) > 0) {
        if (fwrite(buf, 1, n, out) != n) {
            fclose(in);
            fclose(out);
            return -1;
        }
    }

    fclose(in);
    fclose(out);
    return 0;
}

int main(void) {
    if (copy_file("input.txt", "output.txt") == 0) {
        printf("File copied successfully\\n");
    } else {
        printf("Copy failed\\n");
    }
    return 0;
}`,
      hints: [
        'Use binary mode ("rb"/"wb") for exact byte copying.',
        'Read into a buffer, write the same number of bytes.',
        'Check fwrite return value to detect write errors.',
      ],
      concepts: ['file copy', 'buffered I/O', 'error handling'],
    },
    {
      id: 'c-fileio-10',
      title: 'Fix append mode',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the bug where a log file gets truncated instead of appended.',
      skeleton: `#include <stdio.h>
#include <time.h>

void log_message(const char *msg) {
    FILE *f = fopen("app.log", "w");  // Bug: "w" truncates!
    if (!f) return;
    time_t now = time(NULL);
    fprintf(f, "[%ld] %s\\n", now, msg);
    fclose(f);
}

int main(void) {
    log_message("Server started");
    log_message("Client connected");
    log_message("Processing request");
    // Only the last message survives!
    return 0;
}`,
      solution: `#include <stdio.h>
#include <time.h>

void log_message(const char *msg) {
    FILE *f = fopen("app.log", "a");
    if (!f) return;
    time_t now = time(NULL);
    fprintf(f, "[%ld] %s\\n", now, msg);
    fclose(f);
}

int main(void) {
    log_message("Server started");
    log_message("Client connected");
    log_message("Processing request");
    return 0;
}`,
      hints: [
        '"w" mode truncates the file to zero bytes each time.',
        '"a" mode appends to the end of the file.',
        'For log files, always use append mode.',
      ],
      concepts: ['append mode', 'write vs append', 'log files'],
    },
    {
      id: 'c-fileio-11',
      title: 'Read entire file into memory',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that reads an entire file into a dynamically allocated string.',
      skeleton: `// Write char *read_file(const char *path, long *out_size)
// that reads the entire file into a malloc'd buffer.
// Sets *out_size to the file size. Returns NULL on error.`,
      solution: `#include <stdio.h>
#include <stdlib.h>

char *read_file(const char *path, long *out_size) {
    FILE *f = fopen(path, "rb");
    if (!f) return NULL;

    fseek(f, 0, SEEK_END);
    long size = ftell(f);
    rewind(f);

    char *buf = malloc(size + 1);
    if (!buf) { fclose(f); return NULL; }

    size_t read = fread(buf, 1, size, f);
    fclose(f);

    buf[read] = '\\0';
    if (out_size) *out_size = (long)read;
    return buf;
}

int main(void) {
    long size;
    char *content = read_file("test.txt", &size);
    if (content) {
        printf("Size: %ld bytes\\n%s\\n", size, content);
        free(content);
    }
    return 0;
}`,
      hints: [
        'Use fseek/ftell to get the file size first.',
        'Allocate size + 1 for the null terminator.',
        'Caller must free the returned buffer.',
      ],
      concepts: ['read entire file', 'dynamic buffer', 'size detection'],
    },
    {
      id: 'c-fileio-12',
      title: 'Fill-blank fscanf parsing',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Parse structured data from a file using fscanf.',
      skeleton: `#include <stdio.h>

int main(void) {
    FILE *f = fopen("scores.txt", "r");
    if (!f) return 1;

    char name[50];
    int score;
    while (__BLANK__(f, "%49s %d", name, __BLANK__) == 2) {
        printf("%s: %d\\n", name, score);
    }

    __BLANK__(f);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    FILE *f = fopen("scores.txt", "r");
    if (!f) return 1;

    char name[50];
    int score;
    while (fscanf(f, "%49s %d", name, &score) == 2) {
        printf("%s: %d\\n", name, score);
    }

    fclose(f);
    return 0;
}`,
      hints: [
        'fscanf reads formatted input from a file.',
        '&score passes the address for fscanf to write into.',
        'fscanf returns the number of items successfully read.',
      ],
      concepts: ['fscanf', 'formatted input', 'return value check'],
    },
    {
      id: 'c-fileio-13',
      title: 'Predict feof behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Understand why feof is checked after a read, not before.',
      skeleton: `#include <stdio.h>

int main(void) {
    // Common misconception: feof is NOT predictive
    // It only returns true AFTER a read has failed

    // Correct pattern:
    // while (fgets(line, size, f)) { process; }
    
    // Wrong pattern:
    // while (!feof(f)) { fgets(line, size, f); process; }
    // This processes the last line TWICE!

    printf("%d\\n", 1);  // feof pitfall understood
    return 0;
}`,
      solution: `1`,
      hints: [
        'feof returns true only AFTER a failed read attempt.',
        'while (!feof(f)) reads one extra time.',
        'Always check the read function return value instead.',
      ],
      concepts: ['feof pitfall', 'read-then-check', 'common mistake'],
    },
    {
      id: 'c-fileio-14',
      title: 'Write CSV parser',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a simple CSV file parser.',
      skeleton: `// Write a program that reads a CSV file with format:
// name,age,score
// and prints each record as formatted output.`,
      solution: `#include <stdio.h>
#include <string.h>

typedef struct {
    char name[50];
    int age;
    float score;
} Record;

int parse_line(const char *line, Record *r) {
    return sscanf(line, "%49[^,],%d,%f", r->name, &r->age, &r->score) == 3;
}

int main(void) {
    FILE *f = fopen("data.csv", "r");
    if (!f) { perror("fopen"); return 1; }

    char line[256];
    fgets(line, sizeof(line), f);  // Skip header

    Record r;
    int count = 0;
    while (fgets(line, sizeof(line), f)) {
        line[strcspn(line, "\\n")] = '\\0';
        if (parse_line(line, &r)) {
            printf("%-20s Age: %3d  Score: %5.1f\\n",
                   r.name, r.age, r.score);
            count++;
        }
    }
    printf("Total records: %d\\n", count);
    fclose(f);
    return 0;
}`,
      hints: [
        '%[^,] reads until a comma in scanf format.',
        'strcspn finds the position of the newline to strip it.',
        'sscanf parses a string like scanf parses stdin.',
      ],
      concepts: ['CSV parsing', 'sscanf', 'string processing'],
    },
    {
      id: 'c-fileio-15',
      title: 'Refactor printf to fprintf',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Refactor stdout output to support writing to any file.',
      skeleton: `#include <stdio.h>

void print_table(int rows) {
    printf("%-10s %-10s %-10s\\n", "N", "N^2", "N^3");
    printf("%-10s %-10s %-10s\\n", "---", "---", "---");
    for (int i = 1; i <= rows; i++) {
        printf("%-10d %-10d %-10d\\n", i, i*i, i*i*i);
    }
}

int main(void) {
    print_table(5);
    return 0;
}`,
      solution: `#include <stdio.h>

void print_table(FILE *out, int rows) {
    fprintf(out, "%-10s %-10s %-10s\\n", "N", "N^2", "N^3");
    fprintf(out, "%-10s %-10s %-10s\\n", "---", "---", "---");
    for (int i = 1; i <= rows; i++) {
        fprintf(out, "%-10d %-10d %-10d\\n", i, i*i, i*i*i);
    }
}

int main(void) {
    print_table(stdout, 5);

    FILE *f = fopen("table.txt", "w");
    if (f) {
        print_table(f, 5);
        fclose(f);
    }
    return 0;
}`,
      hints: [
        'Replace printf with fprintf and add a FILE * parameter.',
        'Pass stdout for console output, a file for file output.',
        'This makes the function reusable for any output destination.',
      ],
      concepts: ['fprintf', 'output abstraction', 'FILE pointer parameter'],
    },
    {
      id: 'c-fileio-16',
      title: 'Fix buffer overflow in fscanf',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the potential buffer overflow when reading strings.',
      skeleton: `#include <stdio.h>

int main(void) {
    FILE *f = fopen("names.txt", "r");
    if (!f) return 1;

    char name[20];
    while (fscanf(f, "%s", name) == 1) {  // Bug: no size limit
        printf("Name: %s\\n", name);
    }
    fclose(f);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    FILE *f = fopen("names.txt", "r");
    if (!f) return 1;

    char name[20];
    while (fscanf(f, "%19s", name) == 1) {
        printf("Name: %s\\n", name);
    }
    fclose(f);
    return 0;
}`,
      hints: [
        '%s with no width limit can overflow the buffer.',
        '%19s limits reading to 19 chars + null terminator.',
        'Width should be buffer size - 1.',
      ],
      concepts: ['buffer overflow', 'fscanf width', 'input safety'],
    },
    {
      id: 'c-fileio-17',
      title: 'Predict fwrite binary output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the size of binary file output.',
      skeleton: `#include <stdio.h>

int main(void) {
    int data[] = {1, 2, 3, 4, 5};
    FILE *f = fopen("nums.bin", "wb");
    size_t written = fwrite(data, sizeof(int), 5, f);
    fclose(f);

    printf("%zu\\n", written);
    printf("%zu\\n", written * sizeof(int));
    return 0;
}`,
      solution: `5
20`,
      hints: [
        'fwrite returns the number of elements written (5).',
        '5 ints * 4 bytes each = 20 bytes total.',
        'The file will be exactly 20 bytes.',
      ],
      concepts: ['fwrite return', 'binary file size', 'element count'],
    },
    {
      id: 'c-fileio-18',
      title: 'Refactor to use tmpfile',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor temporary file handling to use tmpfile.',
      skeleton: `#include <stdio.h>
#include <string.h>

int main(void) {
    // Problem: hardcoded temp file, not cleaned up
    FILE *tmp = fopen("/tmp/myapp_temp.txt", "w+");
    if (!tmp) return 1;

    fprintf(tmp, "intermediate data\\n");
    fprintf(tmp, "more data\\n");

    rewind(tmp);
    char line[100];
    while (fgets(line, sizeof(line), tmp)) {
        printf("%s", line);
    }
    fclose(tmp);
    // Bug: temp file left on disk!
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

int main(void) {
    FILE *tmp = tmpfile();
    if (!tmp) { perror("tmpfile"); return 1; }

    fprintf(tmp, "intermediate data\\n");
    fprintf(tmp, "more data\\n");

    rewind(tmp);
    char line[100];
    while (fgets(line, sizeof(line), tmp)) {
        printf("%s", line);
    }
    fclose(tmp);  // File automatically deleted
    return 0;
}`,
      hints: [
        'tmpfile() creates an anonymous temporary file.',
        'The file is automatically deleted when closed.',
        'No need to manage temp file names or cleanup.',
      ],
      concepts: ['tmpfile', 'temporary files', 'automatic cleanup'],
    },
    {
      id: 'c-fileio-19',
      title: 'Write struct to binary file',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Serialize and deserialize an array of structs to a binary file.',
      skeleton: `// Define struct Record { int id; char name[32]; double value; };
// Write void save_records(const char *path, Record *recs, int count)
// Write int load_records(const char *path, Record *recs, int max)`,
      solution: `#include <stdio.h>
#include <string.h>

typedef struct {
    int id;
    char name[32];
    double value;
} Record;

void save_records(const char *path, Record *recs, int count) {
    FILE *f = fopen(path, "wb");
    if (!f) { perror("save"); return; }
    fwrite(&count, sizeof(int), 1, f);
    fwrite(recs, sizeof(Record), count, f);
    fclose(f);
}

int load_records(const char *path, Record *recs, int max) {
    FILE *f = fopen(path, "rb");
    if (!f) return 0;
    int count;
    fread(&count, sizeof(int), 1, f);
    if (count > max) count = max;
    int read = fread(recs, sizeof(Record), count, f);
    fclose(f);
    return read;
}

int main(void) {
    Record data[] = {
        {1, "Alice", 95.5},
        {2, "Bob", 87.3},
        {3, "Charlie", 92.1}
    };
    save_records("records.bin", data, 3);

    Record loaded[10];
    int n = load_records("records.bin", loaded, 10);
    for (int i = 0; i < n; i++) {
        printf("%d: %s (%.1f)\\n", loaded[i].id, loaded[i].name, loaded[i].value);
    }
    return 0;
}`,
      hints: [
        'Write the count first, then the array of structs.',
        'Read the count, then read that many structs.',
        'Binary struct I/O is not portable across architectures.',
      ],
      concepts: ['struct serialization', 'binary format', 'record I/O'],
    },
    {
      id: 'c-fileio-20',
      title: 'Fix missing error check',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Add proper error checking to file I/O operations.',
      skeleton: `#include <stdio.h>

int main(void) {
    FILE *f = fopen("important.dat", "wb");
    // Bug: no check if fopen succeeded

    int data[] = {1, 2, 3, 4, 5};
    fwrite(data, sizeof(int), 5, f);
    // Bug: no check if fwrite succeeded

    fclose(f);
    // Bug: no check if fclose succeeded (fclose can fail on flush)

    printf("Data saved\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    FILE *f = fopen("important.dat", "wb");
    if (!f) {
        perror("fopen");
        return 1;
    }

    int data[] = {1, 2, 3, 4, 5};
    size_t written = fwrite(data, sizeof(int), 5, f);
    if (written != 5) {
        perror("fwrite");
        fclose(f);
        return 1;
    }

    if (fclose(f) != 0) {
        perror("fclose");
        return 1;
    }

    printf("Data saved\\n");
    return 0;
}`,
      hints: [
        'fopen returns NULL on failure.',
        'fwrite returns the count of elements written.',
        'fclose returns non-zero on error (buffered data may fail to flush).',
      ],
      concepts: ['error checking', 'fclose errors', 'robust file I/O'],
    },
  ],
};
