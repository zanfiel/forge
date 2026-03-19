import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-pathlib',
  title: '35. Pathlib & OS',
  explanation: `## Pathlib & OS

Python provides \\\`pathlib\\\` for object-oriented path manipulation and \\\`os\\\`/\\\`shutil\\\` for system operations.

### Path Creation
\\\`\\\`\\\`python
from pathlib import Path
p = Path("src") / "main.py"     # Cross-platform path joining
p = Path.home() / ".config"     # User home directory
p = Path.cwd()                  # Current working directory
\\\`\\\`\\\`

### Path Components
- \\\`p.parts\\\` -- tuple of path components
- \\\`p.parent\\\` -- parent directory
- \\\`p.name\\\` -- filename with extension
- \\\`p.stem\\\` -- filename without extension
- \\\`p.suffix\\\` -- file extension

### File Operations
- \\\`p.read_text()\\\` / \\\`p.write_text()\\\` -- read/write text files
- \\\`p.read_bytes()\\\` / \\\`p.write_bytes()\\\` -- read/write binary files
- \\\`p.exists()\\\`, \\\`p.is_file()\\\`, \\\`p.is_dir()\\\` -- existence checks

### Directory Operations
- \\\`p.iterdir()\\\` -- iterate over directory contents
- \\\`p.glob(pattern)\\\` / \\\`p.rglob(pattern)\\\` -- find files matching patterns
- \\\`p.mkdir(parents=True, exist_ok=True)\\\` -- create directories

### os & shutil
- \\\`os.environ\\\` -- environment variables
- \\\`os.walk()\\\` -- recursive directory traversal
- \\\`shutil.copy()\\\`, \\\`shutil.move()\\\`, \\\`shutil.rmtree()\\\` -- file/directory operations
- \\\`tempfile.NamedTemporaryFile()\\\` -- temporary files
`,
  exercises: [
    {
      id: 'py-pth-1',
      title: 'Path joining',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use the / operator to join path components.',
      skeleton: `from pathlib import Path

base = Path("project")
config = base __BLANK__ "config" __BLANK__ "settings.json"
print(config)`,
      solution: `from pathlib import Path

base = Path("project")
config = base / "config" / "settings.json"
print(config)`,
      hints: [
        'Path uses the / operator for joining path components.',
        'This works cross-platform, unlike string concatenation.',
        'The answer is: / on both blanks',
      ],
      concepts: ['Path', '/ operator', 'path joining'],
    },
    {
      id: 'py-pth-2',
      title: 'Path components',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Extract the stem (filename without extension) from a path.',
      skeleton: `from pathlib import Path

p = Path("/home/user/document.txt")
print(p.__BLANK__)   # "document"
print(p.__BLANK__)   # ".txt"`,
      solution: `from pathlib import Path

p = Path("/home/user/document.txt")
print(p.stem)     # "document"
print(p.suffix)   # ".txt"`,
      hints: [
        '.stem gives the filename without extension.',
        '.suffix gives the file extension including the dot.',
        'The answers are: stem and suffix',
      ],
      concepts: ['.stem', '.suffix', 'path components'],
    },
    {
      id: 'py-pth-3',
      title: 'Check existence',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Check if a path exists and whether it is a file or directory.',
      skeleton: `from pathlib import Path

p = Path(".")
print(p.__BLANK__())    # True (current dir exists)
print(p.__BLANK__())    # True (it is a directory)
print(p.is_file())      # False`,
      solution: `from pathlib import Path

p = Path(".")
print(p.exists())      # True (current dir exists)
print(p.is_dir())      # True (it is a directory)
print(p.is_file())     # False`,
      hints: [
        '.exists() checks if the path points to something that exists.',
        '.is_dir() checks specifically for directories.',
        'The answers are: exists and is_dir',
      ],
      concepts: ['.exists()', '.is_dir()', '.is_file()'],
    },
    {
      id: 'py-pth-4',
      title: 'Glob for files',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use glob to find all Python files in a directory.',
      skeleton: `from pathlib import Path

src = Path(".")
py_files = list(src.__BLANK__("*.py"))
print(len(py_files))`,
      solution: `from pathlib import Path

src = Path(".")
py_files = list(src.glob("*.py"))
print(len(py_files))`,
      hints: [
        '.glob(pattern) finds files matching a pattern.',
        'Use *.py to match all Python files.',
        'The answer is: glob',
      ],
      concepts: ['.glob()', 'file patterns'],
    },
    {
      id: 'py-pth-5',
      title: 'Read and write text',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use Path methods to write and read text from a file.',
      skeleton: `from pathlib import Path
import tempfile

p = Path(tempfile.mktemp(suffix=".txt"))
p.__BLANK__("Hello, World!")
content = p.__BLANK__()
print(content)
p.unlink()`,
      solution: `from pathlib import Path
import tempfile

p = Path(tempfile.mktemp(suffix=".txt"))
p.write_text("Hello, World!")
content = p.read_text()
print(content)
p.unlink()`,
      hints: [
        '.write_text() writes a string to a file.',
        '.read_text() reads the entire file as a string.',
        'The answers are: write_text and read_text',
      ],
      concepts: ['.write_text()', '.read_text()'],
    },
    {
      id: 'py-pth-6',
      title: 'Environment variables',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Access an environment variable using os.environ.',
      skeleton: `import os

path_var = os.__BLANK__.get("PATH", "not found")
print(type(path_var))`,
      solution: `import os

path_var = os.environ.get("PATH", "not found")
print(type(path_var))`,
      hints: [
        'os.environ is a dict-like object of environment variables.',
        'Use .get() for safe access with a default.',
        'The answer is: environ',
      ],
      concepts: ['os.environ', 'environment variables'],
    },
    {
      id: 'py-pth-7',
      title: 'Predict Path parts',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'What does Path.parts return?',
      skeleton: `from pathlib import Path

p = Path("/home/user/docs/file.txt")
print(p.parent.name)
print(p.name)`,
      solution: `docs
file.txt`,
      hints: [
        '.parent gives the parent directory as a Path.',
        '.name gives the final component.',
        'p.parent is /home/user/docs, so .name is "docs".',
      ],
      concepts: ['.parent', '.name', 'path components'],
    },
    {
      id: 'py-pth-8',
      title: 'Predict with_suffix',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does with_suffix return?',
      skeleton: `from pathlib import Path

p = Path("report.txt")
print(p.with_suffix(".md"))
print(p.with_stem("notes"))`,
      solution: `report.md
notes.txt`,
      hints: [
        '.with_suffix() changes the extension.',
        '.with_stem() changes the filename keeping the extension.',
        'with_suffix(".md") changes .txt to .md.',
      ],
      concepts: ['.with_suffix()', '.with_stem()'],
    },
    {
      id: 'py-pth-9',
      title: 'Predict resolve',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does Path resolve do with relative paths?',
      skeleton: `from pathlib import Path

p = Path("foo/bar/../baz")
print(p.as_posix())
r = Path("foo/bar/../baz").resolve()
print(r.name)`,
      solution: `foo/bar/../baz
baz`,
      hints: [
        'as_posix() shows the path with forward slashes.',
        '.resolve() makes the path absolute and resolves .. references.',
        'After resolving, bar/.. cancels out, leaving foo/baz.',
      ],
      concepts: ['.resolve()', '.as_posix()', 'path normalization'],
    },
    {
      id: 'py-pth-10',
      title: 'Fix path string concatenation',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Fix the code that uses string concatenation instead of Path operators.',
      skeleton: `from pathlib import Path

# Bug: string concatenation does not handle path separators
base = Path("/home/user")
full = str(base) + "documents" + "file.txt"
print(full)  # Wrong: /home/userdocumentsfile.txt`,
      solution: `from pathlib import Path

# Fixed: use / operator for proper path joining
base = Path("/home/user")
full = base / "documents" / "file.txt"
print(full)`,
      hints: [
        'String concatenation misses path separators.',
        'Use the / operator with Path for correct joining.',
        'Replace + with / for path components.',
      ],
      concepts: ['Path joining', '/ operator', 'common mistake'],
    },
    {
      id: 'py-pth-11',
      title: 'Fix mkdir without parents',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the mkdir call that fails when parent directories do not exist.',
      skeleton: `from pathlib import Path
import tempfile

base = Path(tempfile.mkdtemp())
# Bug: intermediate directories do not exist
target = base / "a" / "b" / "c"
target.mkdir()`,
      solution: `from pathlib import Path
import tempfile

base = Path(tempfile.mkdtemp())
# Fixed: parents=True creates intermediate directories
target = base / "a" / "b" / "c"
target.mkdir(parents=True, exist_ok=True)`,
      hints: [
        'mkdir() fails if parent directories do not exist.',
        'Use parents=True to create the full directory tree.',
        'Add exist_ok=True to avoid errors if it already exists.',
      ],
      concepts: ['.mkdir()', 'parents=True', 'exist_ok'],
    },
    {
      id: 'py-pth-12',
      title: 'Fix rglob pattern',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code that uses glob instead of rglob for recursive search.',
      skeleton: `from pathlib import Path

project = Path(".")
# Bug: glob only searches the current directory, not subdirectories
all_py = list(project.glob("*.py"))
# This misses files in subdirectories like src/main.py`,
      solution: `from pathlib import Path

project = Path(".")
# Fixed: rglob searches recursively through all subdirectories
all_py = list(project.rglob("*.py"))`,
      hints: [
        'glob() only searches in the immediate directory.',
        'rglob() searches recursively through all subdirectories.',
        'Change .glob to .rglob for recursive search.',
      ],
      concepts: ['.rglob()', 'recursive search'],
    },
    {
      id: 'py-pth-13',
      title: 'Write a file finder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function that finds all files with a given extension in a directory tree.',
      skeleton: `from pathlib import Path

def find_files(directory, extension):
    # Return list of all files with the given extension, recursively
    pass

# Example: find_files(".", ".py") returns all Python files`,
      solution: `from pathlib import Path

def find_files(directory, extension):
    root = Path(directory)
    if not extension.startswith("."):
        extension = f".{extension}"
    return list(root.rglob(f"*{extension}"))

# Example: find_files(".", ".py") returns all Python files`,
      hints: [
        'Use Path.rglob() for recursive file search.',
        'Ensure the extension has a leading dot.',
        'rglob(f"*{extension}") matches files with that extension.',
      ],
      concepts: ['rglob', 'file search', 'Path'],
    },
    {
      id: 'py-pth-14',
      title: 'Write a directory size calculator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function that calculates the total size of all files in a directory.',
      skeleton: `from pathlib import Path

def dir_size(directory):
    # Return total size in bytes of all files in directory (recursive)
    pass

print(dir_size("."))`,
      solution: `from pathlib import Path

def dir_size(directory):
    root = Path(directory)
    return sum(f.stat().st_size for f in root.rglob("*") if f.is_file())

print(dir_size("."))`,
      hints: [
        'Use rglob("*") to find all files recursively.',
        'f.stat().st_size gives the file size in bytes.',
        'Filter with is_file() to skip directories.',
      ],
      concepts: ['.stat()', '.st_size', 'rglob'],
    },
    {
      id: 'py-pth-15',
      title: 'Write a safe file writer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function that safely writes to a file, creating parent directories if needed.',
      skeleton: `from pathlib import Path

def safe_write(filepath, content):
    # Create parent directories if they don't exist, then write
    pass

safe_write("/tmp/test_safe/sub/dir/file.txt", "Hello!")`,
      solution: `from pathlib import Path

def safe_write(filepath, content):
    p = Path(filepath)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content)

safe_write("/tmp/test_safe/sub/dir/file.txt", "Hello!")`,
      hints: [
        'Use p.parent.mkdir(parents=True, exist_ok=True) first.',
        'Then use p.write_text(content) to write the file.',
        'This ensures the directory structure exists before writing.',
      ],
      concepts: ['mkdir parents', 'write_text', 'safe writing'],
    },
    {
      id: 'py-pth-16',
      title: 'Write a temp file context',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function that creates a temporary file, writes data, processes it, and cleans up.',
      skeleton: `import tempfile
from pathlib import Path

def process_with_temp(data):
    # Write data to a temp file, read it back, clean up, return content
    pass

result = process_with_temp("Hello from temp!")
print(result)`,
      solution: `import tempfile
from pathlib import Path

def process_with_temp(data):
    with tempfile.NamedTemporaryFile(mode="w", suffix=".txt", delete=False) as f:
        f.write(data)
        temp_path = Path(f.name)
    content = temp_path.read_text()
    temp_path.unlink()
    return content

result = process_with_temp("Hello from temp!")
print(result)`,
      hints: [
        'NamedTemporaryFile with delete=False keeps the file after closing.',
        'Get the path with f.name, read after closing, then clean up.',
        'Use Path(f.name).unlink() to delete the temp file.',
      ],
      concepts: ['tempfile', 'NamedTemporaryFile', 'cleanup'],
    },
    {
      id: 'py-pth-17',
      title: 'Write a shutil copier',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function that copies a directory tree to a new location, excluding certain patterns.',
      skeleton: `import shutil
from pathlib import Path

def copy_filtered(src, dst, exclude_patterns):
    # Copy directory tree but skip files matching exclude patterns
    pass`,
      solution: `import shutil
from pathlib import Path

def copy_filtered(src, dst, exclude_patterns):
    src_path = Path(src)
    dst_path = Path(dst)

    def ignore(directory, files):
        ignored = set()
        for pattern in exclude_patterns:
            for f in Path(directory).glob(pattern):
                ignored.add(f.name)
        return ignored

    shutil.copytree(str(src_path), str(dst_path), ignore=ignore)`,
      hints: [
        'shutil.copytree has an ignore parameter for filtering.',
        'The ignore function receives (directory, files) and returns files to skip.',
        'Use Path.glob to match patterns against files.',
      ],
      concepts: ['shutil.copytree', 'ignore function', 'filtered copy'],
    },
    {
      id: 'py-pth-18',
      title: 'Write an os.walk directory lister',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function that uses os.walk to list all files with their relative paths.',
      skeleton: `import os
from pathlib import Path

def list_all_files(directory):
    # Return list of relative file paths using os.walk
    pass`,
      solution: `import os
from pathlib import Path

def list_all_files(directory):
    root = Path(directory)
    result = []
    for dirpath, dirnames, filenames in os.walk(root):
        for filename in filenames:
            full = Path(dirpath) / filename
            result.append(str(full.relative_to(root)))
    return result`,
      hints: [
        'os.walk yields (dirpath, dirnames, filenames) for each directory.',
        'Join dirpath and filename to get the full path.',
        'Use .relative_to(root) for relative paths.',
      ],
      concepts: ['os.walk', 'relative_to', 'directory traversal'],
    },
    {
      id: 'py-pth-19',
      title: 'Refactor os.path to pathlib',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Refactor the os.path calls to use pathlib equivalents.',
      skeleton: `import os

filepath = "/home/user/docs/report.txt"
directory = os.path.dirname(filepath)
filename = os.path.basename(filepath)
name, ext = os.path.splitext(filename)
exists = os.path.exists(filepath)
full = os.path.join(directory, "new_file.txt")

print(directory, filename, name, ext)`,
      solution: `from pathlib import Path

filepath = Path("/home/user/docs/report.txt")
directory = filepath.parent
filename = filepath.name
name = filepath.stem
ext = filepath.suffix
exists = filepath.exists()
full = filepath.parent / "new_file.txt"

print(directory, filename, name, ext)`,
      hints: [
        'os.path.dirname -> Path.parent',
        'os.path.basename -> Path.name',
        'os.path.splitext -> Path.stem and Path.suffix',
      ],
      concepts: ['pathlib migration', 'os.path equivalents'],
    },
    {
      id: 'py-pth-20',
      title: 'Refactor string paths to Path objects',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the code that uses string manipulation for paths.',
      skeleton: `import os

def process_files(base_dir):
    results = []
    for root, dirs, files in os.walk(base_dir):
        for f in files:
            if f.endswith(".py"):
                full_path = os.path.join(root, f)
                with open(full_path, "r") as fh:
                    line_count = len(fh.readlines())
                results.append((f, line_count))
    return results`,
      solution: `from pathlib import Path

def process_files(base_dir):
    results = []
    for py_file in Path(base_dir).rglob("*.py"):
        line_count = len(py_file.read_text().splitlines())
        results.append((py_file.name, line_count))
    return results`,
      hints: [
        'Path.rglob("*.py") replaces os.walk + endswith check.',
        'Path.read_text() replaces open/read/close.',
        'Path.name replaces the filename variable.',
      ],
      concepts: ['pathlib', 'rglob', 'read_text'],
    },
  ],
};
