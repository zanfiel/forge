import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-iolib',
  title: '31. IO Library',
  explanation: `## IO Library in Lua

The \`io\` library provides file input/output operations:

\`\`\`lua
-- Opening files
local f = io.open("file.txt", "r")  -- read mode
local f = io.open("file.txt", "w")  -- write mode (truncate)
local f = io.open("file.txt", "a")  -- append mode

-- Reading
f:read("l")    -- read one line (default, no newline)
f:read("L")    -- read one line (with newline)
f:read("n")    -- read a number
f:read("a")    -- read entire file
f:read(10)     -- read 10 bytes

-- Writing
f:write("hello")
f:write("line1\\n", "line2\\n")

-- Simple model (stdin/stdout)
io.input("file.txt")     -- set default input
io.output("out.txt")     -- set default output
io.read()                -- read from default input
io.write("text")         -- write to default output

-- Iterating lines
for line in io.lines("file.txt") do
  print(line)
end

-- File type checking
io.type(f)        -- "file", "closed file", or nil
io.tmpfile()      -- temporary file handle

-- Always close files
f:close()
\`\`\``,
  exercises: [
    {
      id: 'lua-iolib-1',
      title: 'Open and Write File',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Open a file for writing and write text to it.',
      skeleton: `local f = io.open("test.txt", "___")
f:write("Hello, Lua!")
f:close()
os.remove("test.txt")
print("done")`,
      solution: `local f = io.open("test.txt", "w")
f:write("Hello, Lua!")
f:close()
os.remove("test.txt")
print("done")`,
      hints: [
        'The mode "w" opens a file for writing (truncates existing content).',
        'Use "a" for append mode, "r" for read mode.',
        '"w" creates the file if it does not exist.',
      ],
      concepts: ['io-library', 'open', 'write'],
    },
    {
      id: 'lua-iolib-2',
      title: 'Read Entire File',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Read the entire contents of a file.',
      skeleton: `local f = io.open("test.txt", "w")
f:write("Hello")
f:close()
local f = io.open("test.txt", "r")
local content = f:read("___")
f:close()
print(content)  -- "Hello"
os.remove("test.txt")`,
      solution: `local f = io.open("test.txt", "w")
f:write("Hello")
f:close()
local f = io.open("test.txt", "r")
local content = f:read("a")
f:close()
print(content)  -- "Hello"
os.remove("test.txt")`,
      hints: [
        'The format "a" reads the entire file contents.',
        'In Lua 5.2, the equivalent was "*a" (still works in 5.3+).',
        'The result is a single string with all file contents.',
      ],
      concepts: ['io-library', 'read', 'formats'],
    },
    {
      id: 'lua-iolib-3',
      title: 'Check File Type',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Use io.type to check the state of a file handle.',
      skeleton: `local f = io.open("test.txt", "w")
print(io.___(f))     -- "file"
f:close()
print(io.___(f))     -- "closed file"
print(io.___(42))    -- nil
os.remove("test.txt")`,
      solution: `local f = io.open("test.txt", "w")
print(io.type(f))     -- "file"
f:close()
print(io.type(f))     -- "closed file"
print(io.type(42))    -- nil
os.remove("test.txt")`,
      hints: [
        'io.type checks whether a value is a file handle.',
        'Returns "file" for open handles, "closed file" for closed ones.',
        'Returns nil for values that are not file handles.',
      ],
      concepts: ['io-library', 'type-checking'],
    },
    {
      id: 'lua-iolib-4',
      title: 'Predict Read Line',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict what f:read("l") returns.',
      skeleton: `local f = io.open("test.txt", "w")
f:write("line1\\nline2\\nline3")
f:close()
f = io.open("test.txt", "r")
print(f:read("l"))
print(f:read("l"))
f:close()
os.remove("test.txt")`,
      solution: `line1
line2`,
      hints: [
        'f:read("l") reads one line without the trailing newline.',
        'Each call advances to the next line.',
        'The first call returns "line1", the second returns "line2".',
      ],
      concepts: ['io-library', 'read', 'lines'],
    },
    {
      id: 'lua-iolib-5',
      title: 'Write Lines to File',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a function that saves a table of strings as lines in a file.',
      skeleton: `-- Write saveLines(filename, lines) that writes each
-- string in the lines table as a separate line in the file.

-- YOUR CODE HERE`,
      solution: `function saveLines(filename, lines)
  local f = io.open(filename, "w")
  for _, line in ipairs(lines) do
    f:write(line, "\n")
  end
  f:close()
end`,
      hints: [
        'Open the file in write mode ("w").',
        'Write each line followed by a newline character.',
        'Always close the file when done.',
      ],
      concepts: ['io-library', 'write', 'lines'],
    },
    {
      id: 'lua-iolib-6',
      title: 'Read Lines into Table',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that reads all lines from a file into a table.',
      skeleton: `-- Write readLines(filename) that returns a table
-- of all lines in the file. Return empty table if
-- the file cannot be opened.

-- YOUR CODE HERE`,
      solution: `function readLines(filename)
  local lines = {}
  local f = io.open(filename, "r")
  if not f then return lines end
  for line in f:lines() do
    lines[#lines + 1] = line
  end
  f:close()
  return lines
end`,
      hints: [
        'Use io.open to try opening the file.',
        'Check if f is nil (file not found).',
        'Use f:lines() iterator to read each line.',
      ],
      concepts: ['io-library', 'lines', 'error-handling'],
    },
    {
      id: 'lua-iolib-7',
      title: 'Fix Missing Error Check',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the code that crashes when a file does not exist.',
      skeleton: `function readFile(path)
  local f = io.open(path, "r")
  local content = f:read("a")  -- BUG: crashes if f is nil
  f:close()
  return content
end
print(readFile("nonexistent.txt"))`,
      solution: `function readFile(path)
  local f, err = io.open(path, "r")
  if not f then
    return nil, err
  end
  local content = f:read("a")
  f:close()
  return content
end
local content, err = readFile("nonexistent.txt")
print(content or err)`,
      hints: [
        'io.open returns nil and an error message on failure.',
        'Always check if f is not nil before using it.',
        'Return nil and the error to the caller.',
      ],
      concepts: ['io-library', 'error-handling', 'debugging'],
    },
    {
      id: 'lua-iolib-8',
      title: 'Write File Copy Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that copies one file to another.',
      skeleton: `-- Write copyFile(src, dst) that copies the contents
-- of src file to dst file. Return true on success,
-- or nil and error message on failure.

-- YOUR CODE HERE`,
      solution: `function copyFile(src, dst)
  local fin, err = io.open(src, "r")
  if not fin then return nil, err end
  local content = fin:read("a")
  fin:close()
  local fout, err2 = io.open(dst, "w")
  if not fout then return nil, err2 end
  fout:write(content)
  fout:close()
  return true
end`,
      hints: [
        'Open source for reading, destination for writing.',
        'Read entire contents with "a" format.',
        'Handle errors for both open calls.',
      ],
      concepts: ['io-library', 'read', 'write'],
    },
    {
      id: 'lua-iolib-9',
      title: 'Predict io.lines Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict how io.lines processes a file.',
      skeleton: `local f = io.open("test.txt", "w")
f:write("a\\nb\\nc")
f:close()
local count = 0
for line in io.lines("test.txt") do
  count = count + 1
end
print(count)
os.remove("test.txt")`,
      solution: `3`,
      hints: [
        'io.lines iterates over each line in the file.',
        'The file has 3 lines: "a", "b", "c".',
        'Even the last line without a trailing newline is counted.',
      ],
      concepts: ['io-library', 'lines', 'iteration'],
    },
    {
      id: 'lua-iolib-10',
      title: 'Append to File',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Open a file in append mode to add content without overwriting.',
      skeleton: `local f = io.open("log.txt", "w")
f:write("entry1\\n")
f:close()
f = io.open("log.txt", "___")
f:write("entry2\\n")
f:close()
f = io.open("log.txt", "r")
local content = f:read("a")
f:close()
print(content)  -- "entry1\\nentry2\\n"
os.remove("log.txt")`,
      solution: `local f = io.open("log.txt", "w")
f:write("entry1\\n")
f:close()
f = io.open("log.txt", "a")
f:write("entry2\\n")
f:close()
f = io.open("log.txt", "r")
local content = f:read("a")
f:close()
print(content)  -- "entry1\\nentry2\\n"
os.remove("log.txt")`,
      hints: [
        'The "a" mode opens a file for appending.',
        'Writes are added to the end of existing content.',
        'Use "a" instead of "w" to avoid truncating.',
      ],
      concepts: ['io-library', 'append', 'modes'],
    },
    {
      id: 'lua-iolib-11',
      title: 'Fix Double Close',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the code that errors by closing a file twice.',
      skeleton: `function processFile(path)
  local f = io.open(path, "w")
  f:write("data")
  f:close()
  f:close()  -- BUG: closing already closed file
  return true
end
local f = io.open("test.txt", "w")
f:write("x")
f:close()
processFile("test.txt")
os.remove("test.txt")`,
      solution: `function processFile(path)
  local f = io.open(path, "w")
  f:write("data")
  f:close()
  return true
end
local f = io.open("test.txt", "w")
f:write("x")
f:close()
processFile("test.txt")
os.remove("test.txt")`,
      hints: [
        'Calling close on an already closed file raises an error.',
        'Remove the duplicate f:close() call.',
        'Track whether a file has been closed if needed.',
      ],
      concepts: ['io-library', 'close', 'debugging'],
    },
    {
      id: 'lua-iolib-12',
      title: 'Write CSV Reader',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that reads a simple CSV file into a table of tables.',
      skeleton: `-- Write readCSV(filename, sep) that reads a CSV file.
-- sep defaults to ",". Returns a table of rows,
-- where each row is a table of field strings.
-- Return empty table if file cannot be opened.

-- YOUR CODE HERE`,
      solution: `function readCSV(filename, sep)
  sep = sep or ","
  local rows = {}
  local f = io.open(filename, "r")
  if not f then return rows end
  for line in f:lines() do
    local row = {}
    for field in (line .. sep):gmatch("(.-)%" .. sep) do
      row[#row + 1] = field
    end
    rows[#rows + 1] = row
  end
  f:close()
  return rows
end`,
      hints: [
        'Read each line with f:lines().',
        'Split each line by the separator using string.gmatch.',
        'A pattern like "(.-)" with the separator captures fields.',
      ],
      concepts: ['io-library', 'lines', 'string-patterns'],
    },
    {
      id: 'lua-iolib-13',
      title: 'Write Safe File Writer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function that safely writes to a file using a temporary file.',
      skeleton: `-- Write safeWrite(filename, content) that:
-- 1. Writes to a temp file (filename .. ".tmp")
-- 2. Closes the temp file
-- 3. Removes the original
-- 4. Renames temp to the original filename
-- Return true on success, nil + error on failure.

-- YOUR CODE HERE`,
      solution: `function safeWrite(filename, content)
  local tmpName = filename .. ".tmp"
  local f, err = io.open(tmpName, "w")
  if not f then return nil, err end
  f:write(content)
  f:close()
  os.remove(filename)
  local ok, renameErr = os.rename(tmpName, filename)
  if not ok then return nil, renameErr end
  return true
end`,
      hints: [
        'Write to a temporary file first to avoid corruption.',
        'Remove the original before renaming.',
        'os.rename moves the temp file to the final name.',
      ],
      concepts: ['io-library', 'write', 'safety'],
    },
    {
      id: 'lua-iolib-14',
      title: 'Read Number from File',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Use the "n" format to read a number from a file.',
      skeleton: `local f = io.open("num.txt", "w")
f:write("42.5")
f:close()
f = io.open("num.txt", "r")
local n = f:read("___")
f:close()
print(type(n))  -- "number"
print(n)        -- 42.5
os.remove("num.txt")`,
      solution: `local f = io.open("num.txt", "w")
f:write("42.5")
f:close()
f = io.open("num.txt", "r")
local n = f:read("n")
f:close()
print(type(n))  -- "number"
print(n)        -- 42.5
os.remove("num.txt")`,
      hints: [
        'The "n" format reads a number from the file.',
        'It skips whitespace and reads a numeric value.',
        'The result is a Lua number, not a string.',
      ],
      concepts: ['io-library', 'read', 'formats'],
    },
    {
      id: 'lua-iolib-15',
      title: 'Predict Multiple Reads',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the behavior of multiple read formats in one call.',
      skeleton: `local f = io.open("data.txt", "w")
f:write("42 hello\\nworld")
f:close()
f = io.open("data.txt", "r")
local n, rest = f:read("n", "l")
print(n)
print(rest)
f:close()
os.remove("data.txt")`,
      solution: `42
 hello`,
      hints: [
        'Multiple format arguments read sequentially.',
        '"n" reads the number 42.',
        '"l" reads the rest of the line: " hello" (with leading space).',
      ],
      concepts: ['io-library', 'read', 'formats'],
    },
    {
      id: 'lua-iolib-16',
      title: 'Write File Logger',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a logger that appends timestamped messages to a log file.',
      skeleton: `-- Write createLogger(filename) that returns an object with:
-- :log(msg) - appends "[timestamp] msg\\n" to the file
-- :close() - closes the file handle
-- The timestamp should use os.date("%Y-%m-%d %H:%M:%S").

-- YOUR CODE HERE`,
      solution: `function createLogger(filename)
  local f = io.open(filename, "a")
  local logger = {}
  local mt = {
    __index = {
      log = function(self, msg)
        local ts = os.date("%Y-%m-%d %H:%M:%S")
        f:write("[" .. ts .. "] " .. msg .. "\n")
        f:flush()
      end,
      close = function(self)
        if f then
          f:close()
          f = nil
        end
      end,
    },
  }
  return setmetatable(logger, mt)
end`,
      hints: [
        'Open the file in append mode ("a").',
        'Use os.date for the timestamp format.',
        'Call f:flush() to ensure data is written immediately.',
      ],
      concepts: ['io-library', 'append', 'logging'],
    },
    {
      id: 'lua-iolib-17',
      title: 'Refactor to io.lines',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor manual file reading to use io.lines.',
      skeleton: `local f = io.open("test.txt", "w")
f:write("a\\nb\\nc")
f:close()

f = io.open("test.txt", "r")
local lines = {}
while true do
  local line = f:read("l")
  if not line then break end
  lines[#lines + 1] = line
end
f:close()
print(#lines)
os.remove("test.txt")`,
      solution: `local f = io.open("test.txt", "w")
f:write("a\\nb\\nc")
f:close()

local lines = {}
for line in io.lines("test.txt") do
  lines[#lines + 1] = line
end
print(#lines)
os.remove("test.txt")`,
      hints: [
        'io.lines(filename) opens, iterates, and closes automatically.',
        'It replaces the manual open/read/close pattern.',
        'Each iteration yields one line.',
      ],
      concepts: ['io-library', 'lines', 'refactoring'],
    },
    {
      id: 'lua-iolib-18',
      title: 'Refactor Multiple Write Calls',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor multiple write calls into fewer calls.',
      skeleton: `local f = io.open("out.txt", "w")
f:write("Name: ")
f:write("Lua")
f:write("\\n")
f:write("Version: ")
f:write("5.4")
f:write("\\n")
f:close()
local content = io.open("out.txt", "r"):read("a")
print(content)
os.remove("out.txt")`,
      solution: `local f = io.open("out.txt", "w")
f:write("Name: Lua\\n", "Version: 5.4\\n")
f:close()
local content = io.open("out.txt", "r"):read("a")
print(content)
os.remove("out.txt")`,
      hints: [
        'f:write() accepts multiple string arguments.',
        'All arguments are written sequentially in one call.',
        'This is more efficient than multiple write calls.',
      ],
      concepts: ['io-library', 'write', 'refactoring'],
    },
    {
      id: 'lua-iolib-19',
      title: 'Write Byte Reader',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function that reads a file byte by byte and returns a table of byte values.',
      skeleton: `-- Write readBytes(filename, count) that reads up to
-- count bytes from a file and returns a table of
-- their numeric byte values. Use f:read(1) and string.byte.

-- YOUR CODE HERE`,
      solution: `function readBytes(filename, count)
  local f = io.open(filename, "rb")
  if not f then return {} end
  local bytes = {}
  for i = 1, count do
    local ch = f:read(1)
    if not ch then break end
    bytes[#bytes + 1] = string.byte(ch)
  end
  f:close()
  return bytes
end`,
      hints: [
        'Open in binary mode "rb" for raw byte reading.',
        'f:read(1) reads exactly one byte as a string.',
        'string.byte converts a character to its numeric value.',
      ],
      concepts: ['io-library', 'binary', 'bytes'],
    },
    {
      id: 'lua-iolib-20',
      title: 'Write File Watcher Stub',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function that detects if a file has been modified by checking its size.',
      skeleton: `-- Write createWatcher(filename) that returns an object with:
-- :check() - returns true if the file size changed since last check
-- Use io.open and f:seek("end") to get file size.
-- The first check always returns false (initial state).

-- YOUR CODE HERE`,
      solution: `function createWatcher(filename)
  local lastSize = nil
  local watcher = {}
  local mt = {
    __index = {
      check = function(self)
        local f = io.open(filename, "r")
        if not f then return false end
        local size = f:seek("end")
        f:close()
        if lastSize == nil then
          lastSize = size
          return false
        end
        local changed = size ~= lastSize
        lastSize = size
        return changed
      end,
    },
  }
  return setmetatable(watcher, mt)
end`,
      hints: [
        'f:seek("end") moves to end of file and returns the position (size).',
        'Store the last known size in a closure variable.',
        'Compare current size with last size to detect changes.',
      ],
      concepts: ['io-library', 'seek', 'file-monitoring'],
    },
  ],
};
