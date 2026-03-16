import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-fileio',
  title: '25. File I/O',
  explanation: `## File I/O

Python provides built-in functions and the \\\`pathlib\\\` module for working with files and directories.

### Opening Files
\\\`\\\`\\\`python
with open("file.txt", "r") as f:
    content = f.read()
\\\`\\\`\\\`

### Modes
| Mode | Description |
|------|-------------|
| \\\`"r"\\\`  | Read (default) |
| \\\`"w"\\\`  | Write (truncates) |
| \\\`"a"\\\`  | Append |
| \\\`"x"\\\`  | Exclusive create (fails if exists) |
| \\\`"b"\\\`  | Binary mode (combine: \\\`"rb"\\\`, \\\`"wb"\\\`) |
| \\\`"t"\\\`  | Text mode (default) |

### Reading Methods
- \\\`f.read()\\\` -- entire file as string
- \\\`f.readline()\\\` -- one line
- \\\`f.readlines()\\\` -- list of lines
- Iterating: \\\`for line in f:\\\`

### pathlib.Path
\\\`\\\`\\\`python
from pathlib import Path

p = Path("data") / "file.txt"
p.read_text()
p.write_text("hello")
p.exists()
p.mkdir(parents=True, exist_ok=True)
\\\`\\\`\\\`

### Encoding
Always specify encoding for text files: \\\`open("f.txt", encoding="utf-8")\\\`.
`,
  exercises: [
    {
      id: 'py-fileio-1',
      title: 'Open and Read a File',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Open a file and read its contents using with.',
      skeleton: `__BLANK__ open("data.txt", "r") as f:
    content = f.read()
print(content)`,
      solution: `with open("data.txt", "r") as f:
    content = f.read()
print(content)`,
      hints: [
        'The with statement manages file closing automatically.',
        'Use with to open files safely.',
        'The answer is: with',
      ],
      concepts: ['with', 'open()', 'read()'],
    },
    {
      id: 'py-fileio-2',
      title: 'Write to a File',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Open a file in write mode.',
      skeleton: `with open("output.txt", __BLANK__) as f:
    f.write("Hello, World!")`,
      solution: `with open("output.txt", "w") as f:
    f.write("Hello, World!")`,
      hints: [
        '"w" mode opens for writing (truncates existing content).',
        '"a" mode would append instead.',
        'The answer is: "w"',
      ],
      concepts: ['write mode', 'open()'],
    },
    {
      id: 'py-fileio-3',
      title: 'Read Lines',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Read all lines into a list.',
      skeleton: `with open("data.txt") as f:
    lines = f.__BLANK__()
print(len(lines))`,
      solution: `with open("data.txt") as f:
    lines = f.readlines()
print(len(lines))`,
      hints: [
        'readlines() returns a list of all lines.',
        'Each line includes the trailing newline.',
        'The answer is: readlines',
      ],
      concepts: ['readlines()'],
    },
    {
      id: 'py-fileio-4',
      title: 'pathlib.Path Creation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a Path object using the / operator.',
      skeleton: `from pathlib import Path

p = Path("data") __BLANK__ "subdir" / "file.txt"
print(p)  # data/subdir/file.txt`,
      solution: `from pathlib import Path

p = Path("data") / "subdir" / "file.txt"
print(p)  # data/subdir/file.txt`,
      hints: [
        'Path uses the / operator to join path segments.',
        'It is cleaner than os.path.join.',
        'The answer is: /',
      ],
      concepts: ['pathlib.Path', '/ operator'],
    },
    {
      id: 'py-fileio-5',
      title: 'Check File Existence',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Check if a file exists using pathlib.',
      skeleton: `from pathlib import Path

p = Path("config.json")
if p.__BLANK__():
    print("File found")
else:
    print("File not found")`,
      solution: `from pathlib import Path

p = Path("config.json")
if p.exists():
    print("File found")
else:
    print("File not found")`,
      hints: [
        'Path objects have an exists() method.',
        'It returns True if the path exists.',
        'The answer is: exists',
      ],
      concepts: ['Path.exists()'],
    },
    {
      id: 'py-fileio-6',
      title: 'Specify Encoding',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Open a file with explicit UTF-8 encoding.',
      skeleton: `with open("data.txt", "r", __BLANK__="utf-8") as f:
    content = f.read()`,
      solution: `with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()`,
      hints: [
        'Always specify the encoding for text files.',
        'The parameter name is encoding.',
        'The answer is: encoding',
      ],
      concepts: ['encoding', 'utf-8'],
    },
    {
      id: 'py-fileio-7',
      title: 'Write a File Copier',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write copy_file(src, dst) that reads src and writes its content to dst.',
      skeleton: `def copy_file(src, dst):
    # Copy file contents from src to dst
    pass`,
      solution: `def copy_file(src, dst):
    with open(src, "r", encoding="utf-8") as f_in:
        content = f_in.read()
    with open(dst, "w", encoding="utf-8") as f_out:
        f_out.write(content)`,
      hints: [
        'Open src for reading, dst for writing.',
        'Read all content, then write it.',
        'Use separate with blocks or nested ones.',
      ],
      concepts: ['read', 'write', 'file copy'],
    },
    {
      id: 'py-fileio-8',
      title: 'Write Line-by-Line Processor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write count_lines(filepath) that returns the number of non-empty lines in a file.',
      skeleton: `def count_lines(filepath):
    # Count non-empty lines
    pass`,
      solution: `def count_lines(filepath):
    count = 0
    with open(filepath, "r", encoding="utf-8") as f:
        for line in f:
            if line.strip():
                count += 1
    return count`,
      hints: [
        'Iterate over the file object directly (line by line).',
        'Use line.strip() to check if a line is non-empty.',
        'This is memory-efficient for large files.',
      ],
      concepts: ['line iteration', 'strip()', 'file processing'],
    },
    {
      id: 'py-fileio-9',
      title: 'Write JSON File Handler',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write save_json(data, filepath) and load_json(filepath) functions.',
      skeleton: `import json

def save_json(data, filepath):
    pass

def load_json(filepath):
    pass`,
      solution: `import json

def save_json(data, filepath):
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

def load_json(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)`,
      hints: [
        'json.dump() writes to a file object.',
        'json.load() reads from a file object.',
        'Use indent=2 for readable output.',
      ],
      concepts: ['json.dump', 'json.load', 'serialization'],
    },
    {
      id: 'py-fileio-10',
      title: 'Predict: File Mode Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `import io

# Simulating file behavior with StringIO
f = io.StringIO()
f.write("hello")
f.write(" world")
f.seek(0)
print(f.read())`,
      solution: `hello world`,
      hints: [
        'StringIO behaves like a file in memory.',
        'write() appends to the current position.',
        'seek(0) moves back to the start before reading.',
      ],
      concepts: ['StringIO', 'seek()', 'write()'],
    },
    {
      id: 'py-fileio-11',
      title: 'Predict: Path Operations',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `from pathlib import PurePosixPath as Path

p = Path("/home/user/docs/report.tar.gz")
print(p.name)
print(p.stem)
print(p.suffix)
print(p.parent)`,
      solution: `report.tar.gz
report.tar
.gz
/home/user/docs`,
      hints: [
        '.name is the final component: "report.tar.gz".',
        '.stem removes the last suffix: "report.tar".',
        '.suffix is the last extension: ".gz".',
      ],
      concepts: ['Path.name', 'Path.stem', 'Path.suffix', 'Path.parent'],
    },
    {
      id: 'py-fileio-12',
      title: 'Write a CSV Reader',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write read_csv(filepath) that returns a list of dicts (one per row) using csv.DictReader.',
      skeleton: `import csv

def read_csv(filepath):
    # Return list of dicts from CSV file
    pass`,
      solution: `import csv

def read_csv(filepath):
    with open(filepath, "r", encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        return list(reader)`,
      hints: [
        'csv.DictReader uses the header row as dict keys.',
        'Pass newline="" to open() for CSV files.',
        'list(reader) consumes all rows.',
      ],
      concepts: ['csv.DictReader', 'newline', 'file processing'],
    },
    {
      id: 'py-fileio-13',
      title: 'Fix: File Not Closed',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code to properly close the file.',
      skeleton: `f = open("data.txt", "r")
content = f.read()
print(content)
# File is never closed! Resource leak.`,
      solution: `with open("data.txt", "r") as f:
    content = f.read()
print(content)
# File is automatically closed when with block exits`,
      hints: [
        'Always use the with statement to open files.',
        'It ensures the file is closed even if an exception occurs.',
        'Replace the bare open() with a with block.',
      ],
      concepts: ['with statement', 'resource leak'],
    },
    {
      id: 'py-fileio-14',
      title: 'Fix: Write Mode Truncating',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code so it appends to the log file instead of overwriting it.',
      skeleton: `def add_log_entry(message):
    with open("app.log", "w") as f:
        f.write(f"{message}\\n")

add_log_entry("First entry")
add_log_entry("Second entry")
# Only "Second entry" remains in the file!`,
      solution: `def add_log_entry(message):
    with open("app.log", "a") as f:
        f.write(f"{message}\\n")

add_log_entry("First entry")
add_log_entry("Second entry")
# Both entries are in the file`,
      hints: [
        '"w" mode truncates the file on each open.',
        'Use "a" mode to append instead.',
        'Append mode adds to the end of the file.',
      ],
      concepts: ['append mode', 'write vs append'],
    },
    {
      id: 'py-fileio-15',
      title: 'Write a Binary File Hasher',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write file_hash(filepath) that returns the SHA-256 hex digest of a file, reading in 8KB chunks.',
      skeleton: `import hashlib

def file_hash(filepath):
    # Read in chunks, return SHA-256 hex digest
    pass`,
      solution: `import hashlib

def file_hash(filepath):
    h = hashlib.sha256()
    with open(filepath, "rb") as f:
        while True:
            chunk = f.read(8192)
            if not chunk:
                break
            h.update(chunk)
    return h.hexdigest()`,
      hints: [
        'Open in binary mode "rb" for hashing.',
        'Read in chunks to handle large files.',
        'Use hashlib.sha256() and update() with each chunk.',
      ],
      concepts: ['hashlib', 'binary mode', 'chunked reading'],
    },
    {
      id: 'py-fileio-16',
      title: 'Predict: pathlib Glob',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `from pathlib import PurePosixPath

paths = [
    PurePosixPath("src/main.py"),
    PurePosixPath("src/utils.py"),
    PurePosixPath("src/tests/test_main.py"),
    PurePosixPath("README.md"),
]

py_files = [p for p in paths if p.suffix == ".py"]
print(len(py_files))
print(py_files[0].stem)`,
      solution: `3
main`,
      hints: [
        '.suffix == ".py" matches 3 files.',
        'README.md has suffix ".md" so it is excluded.',
        'py_files[0].stem is "main" (from main.py).',
      ],
      concepts: ['Path.suffix', 'Path.stem', 'filtering'],
    },
    {
      id: 'py-fileio-17',
      title: 'Fix: Encoding Error',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the code to handle files with unknown encoding.',
      skeleton: `def read_file(filepath):
    with open(filepath, "r") as f:
        return f.read()
    # Crashes on files with non-ASCII characters on some platforms`,
      solution: `def read_file(filepath):
    with open(filepath, "r", encoding="utf-8", errors="replace") as f:
        return f.read()`,
      hints: [
        'Specify encoding="utf-8" explicitly.',
        'Use errors="replace" to handle undecodable bytes.',
        'This replaces bad characters with a replacement character.',
      ],
      concepts: ['encoding', 'errors parameter', 'utf-8'],
    },
    {
      id: 'py-fileio-18',
      title: 'Write an Atomic File Writer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write atomic_write(filepath, content) that writes to a temp file first, then renames it to avoid partial writes.',
      skeleton: `import os
import tempfile
from pathlib import Path

def atomic_write(filepath, content):
    # Write to temp file, then rename
    pass`,
      solution: `import os
import tempfile
from pathlib import Path

def atomic_write(filepath, content):
    filepath = Path(filepath)
    fd, tmp_path = tempfile.mkstemp(dir=filepath.parent, suffix=".tmp")
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            f.write(content)
        os.replace(tmp_path, filepath)
    except Exception:
        os.unlink(tmp_path)
        raise`,
      hints: [
        'Write to a temporary file in the same directory.',
        'Use os.replace() to atomically rename.',
        'Clean up the temp file if writing fails.',
      ],
      concepts: ['atomic write', 'tempfile', 'os.replace'],
    },
    {
      id: 'py-fileio-19',
      title: 'Refactor: os.path to pathlib',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the os.path code to use pathlib.Path.',
      skeleton: `import os

base = "/home/user/projects"
project = os.path.join(base, "myapp")
config = os.path.join(project, "config.json")

if os.path.exists(config):
    with open(config) as f:
        print(f.read())

name = os.path.basename(config)
ext = os.path.splitext(config)[1]
parent = os.path.dirname(config)`,
      solution: `from pathlib import Path

base = Path("/home/user/projects")
project = base / "myapp"
config = project / "config.json"

if config.exists():
    print(config.read_text())

name = config.name
ext = config.suffix
parent = config.parent`,
      hints: [
        'Replace os.path.join with the / operator.',
        'Use Path methods: .exists(), .read_text().',
        'Use .name, .suffix, .parent instead of os.path functions.',
      ],
      concepts: ['pathlib', 'refactoring', 'os.path migration'],
    },
    {
      id: 'py-fileio-20',
      title: 'Refactor: Manual Line Processing to Generator',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the file processing to use a generator for lazy line filtering.',
      skeleton: `def get_error_lines(filepath):
    results = []
    with open(filepath, "r", encoding="utf-8") as f:
        for line in f:
            if "ERROR" in line:
                results.append(line.strip())
    return results

errors = get_error_lines("app.log")
for e in errors:
    print(e)`,
      solution: `def get_error_lines(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        for line in f:
            if "ERROR" in line:
                yield line.strip()

for e in get_error_lines("app.log"):
    print(e)`,
      hints: [
        'Replace the list with yield for lazy evaluation.',
        'This processes one line at a time, saving memory.',
        'The caller iterates directly over the generator.',
      ],
      concepts: ['generator', 'lazy processing', 'memory efficiency'],
    },
  ],
};
