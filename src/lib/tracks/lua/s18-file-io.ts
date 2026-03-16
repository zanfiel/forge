import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-fileio',
  title: '18. File I/O',
  explanation: `## File I/O in Lua

Lua provides two I/O models: implicit (using io default files) and explicit (using file handles).

### Opening Files
\`\`\`lua
local f = io.open("file.txt", "r")  -- read mode
local f = io.open("file.txt", "w")  -- write (overwrite)
local f = io.open("file.txt", "a")  -- append
\`\`\`

### Reading
\`\`\`lua
local f = io.open("file.txt", "r")
local content = f:read("*a")   -- read all
local line = f:read("*l")      -- read one line
local number = f:read("*n")    -- read a number
f:close()
\`\`\`

### Writing
\`\`\`lua
local f = io.open("out.txt", "w")
f:write("Hello\\n")
f:write("World\\n")
f:close()
\`\`\`

### Lines Iterator
\`\`\`lua
for line in io.lines("file.txt") do
  print(line)
end
\`\`\`

### Always Close Files
\`\`\`lua
local f = io.open("file.txt", "r")
if f then
  local data = f:read("*a")
  f:close()
end
\`\`\``,
  exercises: [
    {
      id: 'lua-fileio-1',
      title: 'Open a File',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Open a file for reading.',
      skeleton: `local f = io.___(  "data.txt", "r")
if f then
  print("file opened")
  f:close()
end`,
      solution: `local f = io.open("data.txt", "r")
if f then
  print("file opened")
  f:close()
end`,
      hints: ['io.open opens a file with a given mode.', '"r" is read mode.', 'Fill in "open".'],
      concepts: ['io-open'],
    },
    {
      id: 'lua-fileio-2',
      title: 'Read Entire File',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Read the entire contents of a file.',
      skeleton: `local f = io.open("data.txt", "r")
local content = f:read("___")
f:close()
print(content)`,
      solution: `local f = io.open("data.txt", "r")
local content = f:read("*a")
f:close()
print(content)`,
      hints: ['"*a" reads the entire file.', '"*l" reads one line, "*n" reads a number.', 'Fill in "*a".'],
      concepts: ['file-read'],
    },
    {
      id: 'lua-fileio-3',
      title: 'Write to a File',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a string to a file.',
      skeleton: `local f = io.open("output.txt", "___")
f:write("Hello, World!\\n")
f:close()`,
      solution: `local f = io.open("output.txt", "w")
f:write("Hello, World!\\n")
f:close()`,
      hints: ['"w" mode opens for writing (overwrites).', '"a" mode appends.', 'Fill in "w".'],
      concepts: ['file-write'],
    },
    {
      id: 'lua-fileio-4',
      title: 'Read Lines',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Iterate over lines in a file.',
      skeleton: `for line in io.___(  "data.txt") do
  print(line)
end`,
      solution: `for line in io.lines("data.txt") do
  print(line)
end`,
      hints: ['io.lines returns an iterator over file lines.', 'It automatically closes the file when done.', 'Fill in "lines".'],
      concepts: ['io-lines'],
    },
    {
      id: 'lua-fileio-5',
      title: 'Append to a File',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Open a file in append mode.',
      skeleton: `local f = io.open("log.txt", "___")
f:write("New log entry\\n")
f:close()`,
      solution: `local f = io.open("log.txt", "a")
f:write("New log entry\\n")
f:close()`,
      hints: ['"a" mode appends to the end of the file.', 'Does not overwrite existing content.', 'Fill in "a".'],
      concepts: ['file-append'],
    },
    {
      id: 'lua-fileio-6',
      title: 'File Seek',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Seek to the beginning of a file.',
      skeleton: `local f = io.open("data.txt", "r")
f:read("*a") -- read everything
f:___(  "set", 0) -- go back to start
local again = f:read("*a")
f:close()`,
      solution: `local f = io.open("data.txt", "r")
f:read("*a") -- read everything
f:seek("set", 0) -- go back to start
local again = f:read("*a")
f:close()`,
      hints: ['f:seek sets the file position.', '"set" positions from the beginning.', 'Fill in "seek".'],
      concepts: ['file-seek'],
    },
    {
      id: 'lua-fileio-7',
      title: 'Write a File Reader',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a function readFile(path) that returns the file contents or nil and an error message.',
      skeleton: `-- Write function readFile(path)`,
      solution: `local function readFile(path)
  local f, err = io.open(path, "r")
  if not f then
    return nil, err
  end
  local content = f:read("*a")
  f:close()
  return content
end

local data, err = readFile("test.txt")
if data then
  print(data)
else
  print("Error: " .. err)
end`,
      hints: ['io.open returns nil and error on failure.', 'Always check if the file opened successfully.', 'Return the content and close the file.'],
      concepts: ['file-read', 'error-handling'],
    },
    {
      id: 'lua-fileio-8',
      title: 'Write a File Writer',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a function writeFile(path, content) that writes content to a file.',
      skeleton: `-- Write function writeFile(path, content)`,
      solution: `local function writeFile(path, content)
  local f, err = io.open(path, "w")
  if not f then
    return false, err
  end
  f:write(content)
  f:close()
  return true
end

local ok, err = writeFile("out.txt", "Hello!")
if not ok then print("Error: " .. err) end`,
      hints: ['Open in "w" mode.', 'Check for open errors.', 'Return success/failure.'],
      concepts: ['file-write'],
    },
    {
      id: 'lua-fileio-9',
      title: 'Write a Line Counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function countLines(path) that returns the number of lines in a file.',
      skeleton: `-- Write function countLines(path)`,
      solution: `local function countLines(path)
  local count = 0
  for _ in io.lines(path) do
    count = count + 1
  end
  return count
end

print(countLines("data.txt"))`,
      hints: ['Use io.lines to iterate.', 'Count each iteration.', 'Use _ for the unused line variable.'],
      concepts: ['io-lines', 'counting'],
    },
    {
      id: 'lua-fileio-10',
      title: 'Write a CSV Parser',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function parseCSV(path) that reads a CSV file and returns a table of rows (each row is an array of fields).',
      skeleton: `-- Write function parseCSV(path)`,
      solution: `local function parseCSV(path)
  local rows = {}
  for line in io.lines(path) do
    local row = {}
    for field in line:gmatch("[^,]+") do
      row[#row + 1] = field
    end
    rows[#rows + 1] = row
  end
  return rows
end

-- Usage:
-- local data = parseCSV("data.csv")
-- for _, row in ipairs(data) do print(row[1], row[2]) end`,
      hints: ['Split each line by commas.', 'Use gmatch to extract fields.', 'Collect rows into an array.'],
      concepts: ['file-parsing', 'string-patterns'],
    },
    {
      id: 'lua-fileio-11',
      title: 'Write a File Copy Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function copyFile(src, dst) that copies a file.',
      skeleton: `-- Write function copyFile(src, dst)`,
      solution: `local function copyFile(src, dst)
  local srcFile, err = io.open(src, "rb")
  if not srcFile then return false, err end
  local content = srcFile:read("*a")
  srcFile:close()

  local dstFile, err2 = io.open(dst, "wb")
  if not dstFile then return false, err2 end
  dstFile:write(content)
  dstFile:close()

  return true
end

copyFile("input.bin", "output.bin")`,
      hints: ['Use "rb" and "wb" for binary-safe copy.', 'Read all from source, write all to destination.', 'Check for errors on both opens.'],
      concepts: ['file-copy', 'binary-mode'],
    },
    {
      id: 'lua-fileio-12',
      title: 'Write a Log Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function log(path, message) that appends a timestamped message to a log file.',
      skeleton: `-- Write function log(path, message)`,
      solution: `local function log(path, message)
  local f = io.open(path, "a")
  if f then
    f:write(os.date("[%Y-%m-%d %H:%M:%S] ") .. message .. "\\n")
    f:close()
  end
end

log("app.log", "Application started")
log("app.log", "Processing data")`,
      hints: ['Open in "a" (append) mode.', 'Use os.date for timestamps.', 'Always close the file.'],
      concepts: ['file-append', 'logging'],
    },
    {
      id: 'lua-fileio-13',
      title: 'Fix Unclosed File Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the code that does not close the file.',
      skeleton: `local function getData(path)
  local f = io.open(path, "r")
  if not f then return nil end
  local data = f:read("*a")
  return data
end`,
      solution: `local function getData(path)
  local f = io.open(path, "r")
  if not f then return nil end
  local data = f:read("*a")
  f:close()
  return data
end`,
      hints: ['Files must be closed to free resources.', 'Add f:close() before returning.', 'Unclosed files leak file handles.'],
      concepts: ['file-close'],
    },
    {
      id: 'lua-fileio-14',
      title: 'Fix Missing Error Check',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the code that crashes when the file does not exist.',
      skeleton: `local f = io.open("missing.txt", "r")
local content = f:read("*a") -- crashes if file missing!
f:close()
print(content)`,
      solution: `local f = io.open("missing.txt", "r")
if f then
  local content = f:read("*a")
  f:close()
  print(content)
else
  print("File not found")
end`,
      hints: ['io.open returns nil if the file cannot be opened.', 'Check f before using it.', 'Add an if check.'],
      concepts: ['error-handling', 'nil-check'],
    },
    {
      id: 'lua-fileio-15',
      title: 'Fix Write Mode Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the code that overwrites the file instead of appending.',
      skeleton: `local function addEntry(path, entry)
  local f = io.open(path, "w") -- overwrites!
  f:write(entry .. "\\n")
  f:close()
end
addEntry("log.txt", "entry 1")
addEntry("log.txt", "entry 2") -- only entry 2 remains!`,
      solution: `local function addEntry(path, entry)
  local f = io.open(path, "a")
  f:write(entry .. "\\n")
  f:close()
end
addEntry("log.txt", "entry 1")
addEntry("log.txt", "entry 2") -- both entries present`,
      hints: ['"w" mode overwrites the entire file.', '"a" mode appends to the end.', 'Change "w" to "a".'],
      concepts: ['file-modes'],
    },
    {
      id: 'lua-fileio-16',
      title: 'Predict io.open Return',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict what io.open returns for a missing file.',
      skeleton: `local f, err = io.open("nonexistent.txt", "r")
print(type(f))`,
      solution: `nil`,
      hints: ['io.open returns nil when the file cannot be opened.', 'The second return value contains the error message.', 'type(nil) is "nil".'],
      concepts: ['io-open', 'error-handling'],
    },
    {
      id: 'lua-fileio-17',
      title: 'Predict Read After Close',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict what happens when reading a closed file.',
      skeleton: `local f = io.open("test.txt", "w")
f:write("hello")
f:close()
local ok, err = pcall(function() f:read("*a") end)
print(ok)`,
      solution: `false`,
      hints: ['Reading from a closed file is an error.', 'pcall catches the error.', 'ok is false because of the error.'],
      concepts: ['file-close', 'pcall'],
    },
    {
      id: 'lua-fileio-18',
      title: 'Predict Write Return',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the return type of f:write.',
      skeleton: `local f = io.open("test.txt", "w")
local result = f:write("hello")
print(result == f)
f:close()`,
      solution: `true`,
      hints: ['f:write returns the file handle on success.', 'This enables chaining: f:write("a"):write("b").', 'result is the same as f.'],
      concepts: ['file-write', 'chaining'],
    },
    {
      id: 'lua-fileio-19',
      title: 'Refactor Repeated Open/Close',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor repeated open/close into a withFile helper.',
      skeleton: `-- Reading
local f1 = io.open("data.txt", "r")
local data = f1:read("*a")
f1:close()

-- Processing
local f2 = io.open("out.txt", "w")
f2:write(data:upper())
f2:close()`,
      solution: `local function withFile(path, mode, fn)
  local f, err = io.open(path, mode)
  if not f then return nil, err end
  local result = fn(f)
  f:close()
  return result
end

local data = withFile("data.txt", "r", function(f)
  return f:read("*a")
end)

withFile("out.txt", "w", function(f)
  f:write(data:upper())
end)`,
      hints: ['Create a helper that handles open/close.', 'Pass a callback function to do the work.', 'This ensures the file is always closed.'],
      concepts: ['refactoring', 'resource-management'],
    },
    {
      id: 'lua-fileio-20',
      title: 'Refactor to Buffered Writer',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor multiple small writes into a buffered approach.',
      skeleton: `local function writeReport(path, items)
  for _, item in ipairs(items) do
    local f = io.open(path, "a")
    f:write(item .. "\\n")
    f:close()
  end
end
writeReport("report.txt", {"item1", "item2", "item3"})`,
      solution: `local function writeReport(path, items)
  local f = io.open(path, "w")
  if not f then return end
  for _, item in ipairs(items) do
    f:write(item .. "\\n")
  end
  f:close()
end
writeReport("report.txt", {"item1", "item2", "item3"})`,
      hints: ['Opening/closing for each write is inefficient.', 'Open once, write all items, close once.', 'This is much faster for many writes.'],
      concepts: ['refactoring', 'performance'],
    },
  ],
};
