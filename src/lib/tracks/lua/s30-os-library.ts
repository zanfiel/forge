import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-os',
  title: '30. OS Library',
  explanation: `## OS Library in Lua

The \`os\` library provides operating system facilities:

\`\`\`lua
-- Time functions
os.time()                  -- current time as integer (epoch seconds)
os.time({year=2024, month=1, day=15, hour=12})  -- specific time

os.date("%Y-%m-%d")        -- formatted date string
os.date("*t")              -- date as table
os.date("!%H:%M:%S")      -- UTC time

os.difftime(t2, t1)        -- difference in seconds

os.clock()                 -- CPU time used (for benchmarking)

-- System functions
os.execute("ls")           -- run shell command, returns success, exit type, code
os.rename("old.txt", "new.txt")  -- rename/move file
os.remove("file.txt")      -- delete file
os.tmpname()               -- temporary file name

-- Environment
os.getenv("HOME")          -- read environment variable
os.exit(0)                 -- exit program
\`\`\`

**Important**: \`os.clock()\` returns CPU time (not wall time) and is ideal for benchmarking. \`os.time()\` returns wall-clock time in seconds since the epoch.`,
  exercises: [
    {
      id: 'lua-os-1',
      title: 'Get Current Time',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Get the current time as an epoch timestamp.',
      skeleton: `local now = os.___()
print(type(now))  -- "number"
print(now > 0)    -- true`,
      solution: `local now = os.time()
print(type(now))  -- "number"
print(now > 0)    -- true`,
      hints: [
        'os.time() returns the current time as seconds since epoch.',
        'It returns a number (integer).',
        'Called without arguments, it returns the current time.',
      ],
      concepts: ['os-library', 'time'],
    },
    {
      id: 'lua-os-2',
      title: 'Format Date String',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Format the current date as YYYY-MM-DD.',
      skeleton: `local dateStr = os.date("___")
print(#dateStr)       -- 10 (e.g., "2024-01-15")
print(type(dateStr))  -- "string"`,
      solution: `local dateStr = os.date("%Y-%m-%d")
print(#dateStr)       -- 10 (e.g., "2024-01-15")
print(type(dateStr))  -- "string"`,
      hints: [
        '%Y is 4-digit year, %m is 2-digit month, %d is 2-digit day.',
        'os.date takes a format string similar to C strftime.',
        'The result is always a 10-character string for this format.',
      ],
      concepts: ['os-library', 'date-formatting'],
    },
    {
      id: 'lua-os-3',
      title: 'Date as Table',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Get the current date as a table using os.date.',
      skeleton: `local t = os.date("___")
print(type(t))         -- "table"
print(type(t.year))    -- "number"
print(type(t.month))   -- "number"`,
      solution: `local t = os.date("*t")
print(type(t))         -- "table"
print(type(t.year))    -- "number"
print(type(t.month))   -- "number"`,
      hints: [
        'The format "*t" tells os.date to return a table.',
        'The table contains year, month, day, hour, min, sec fields.',
        'It also includes wday (weekday) and yday (day of year).',
      ],
      concepts: ['os-library', 'date-table'],
    },
    {
      id: 'lua-os-4',
      title: 'Predict difftime',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the result of os.difftime.',
      skeleton: `local t1 = os.time({year=2024, month=1, day=1, hour=0, min=0, sec=0})
local t2 = os.time({year=2024, month=1, day=1, hour=1, min=0, sec=0})
print(os.difftime(t2, t1))`,
      solution: `3600`,
      hints: [
        'os.difftime returns the difference in seconds.',
        'From hour 0 to hour 1 is 3600 seconds.',
        '1 hour = 60 minutes * 60 seconds.',
      ],
      concepts: ['os-library', 'difftime'],
    },
    {
      id: 'lua-os-5',
      title: 'Benchmark with os.clock',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Use os.clock to measure CPU time of an operation.',
      skeleton: `local start = os.___()
local sum = 0
for i = 1, 100000 do sum = sum + i end
local elapsed = os.___() - start
print(type(elapsed))  -- "number"
print(elapsed >= 0)   -- true`,
      solution: `local start = os.clock()
local sum = 0
for i = 1, 100000 do sum = sum + i end
local elapsed = os.clock() - start
print(type(elapsed))  -- "number"
print(elapsed >= 0)   -- true`,
      hints: [
        'os.clock() returns CPU time in seconds as a float.',
        'Take the difference of two os.clock() calls for elapsed time.',
        'This measures CPU time, not wall-clock time.',
      ],
      concepts: ['os-library', 'clock', 'benchmarking'],
    },
    {
      id: 'lua-os-6',
      title: 'Environment Variable',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Read an environment variable using os.getenv.',
      skeleton: `local path = os.___(  "PATH")
print(type(path))  -- "string" (or "nil" if not set)
print(path ~= nil)  -- usually true`,
      solution: `local path = os.getenv("PATH")
print(type(path))  -- "string" (or "nil" if not set)
print(path ~= nil)  -- usually true`,
      hints: [
        'os.getenv reads environment variables.',
        'It returns the value as a string, or nil if not set.',
        'PATH is a standard environment variable on most systems.',
      ],
      concepts: ['os-library', 'environment'],
    },
    {
      id: 'lua-os-7',
      title: 'Write Timestamp Formatter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that converts an epoch timestamp to a human-readable string.',
      skeleton: `-- Write formatTimestamp(epoch) that returns a string
-- in the format "YYYY-MM-DD HH:MM:SS".
-- Use os.date with a format string.

-- YOUR CODE HERE`,
      solution: `function formatTimestamp(epoch)
  return os.date("%Y-%m-%d %H:%M:%S", epoch)
end`,
      hints: [
        'os.date(format, time) formats a specific time.',
        '%H is hours, %M is minutes, %S is seconds.',
        'Pass the epoch as the second argument.',
      ],
      concepts: ['os-library', 'date-formatting'],
    },
    {
      id: 'lua-os-8',
      title: 'Write Timer Utility',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a timer that measures how long a function takes to run.',
      skeleton: `-- Write timeIt(fn, ...) that runs fn(...) and returns
-- the elapsed CPU time in seconds, followed by fn's return values.

-- YOUR CODE HERE`,
      solution: `function timeIt(fn, ...)
  local start = os.clock()
  local results = table.pack(fn(...))
  local elapsed = os.clock() - start
  return elapsed, table.unpack(results, 1, results.n)
end`,
      hints: [
        'Use os.clock() before and after calling fn.',
        'table.pack captures all return values including nil.',
        'Return elapsed time first, then the function results.',
      ],
      concepts: ['os-library', 'clock', 'benchmarking'],
    },
    {
      id: 'lua-os-9',
      title: 'Fix os.execute Return Check',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the incorrect handling of os.execute return values.',
      skeleton: `function runCommand(cmd)
  local result = os.execute(cmd)
  if result == 0 then  -- BUG: wrong check for Lua 5.3+
    return true
  else
    return false
  end
end
print(type(runCommand("echo hello")))`,
      solution: `function runCommand(cmd)
  local ok, exitType, code = os.execute(cmd)
  if ok then  -- FIXED: check the boolean first return value
    return true
  else
    return false
  end
end
print(type(runCommand("echo hello")))`,
      hints: [
        'In Lua 5.3+, os.execute returns: success/nil, exit_type, code.',
        'The first return is true on success, nil on failure.',
        'Check the first return value as a boolean, not compare to 0.',
      ],
      concepts: ['os-library', 'execute', 'debugging'],
    },
    {
      id: 'lua-os-10',
      title: 'Write Days Between Dates',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that calculates the number of days between two dates.',
      skeleton: `-- Write daysBetween(y1, m1, d1, y2, m2, d2) that returns
-- the number of days between two dates.
-- Use os.time and os.difftime.

-- YOUR CODE HERE`,
      solution: `function daysBetween(y1, m1, d1, y2, m2, d2)
  local t1 = os.time({year = y1, month = m1, day = d1, hour = 0})
  local t2 = os.time({year = y2, month = m2, day = d2, hour = 0})
  local diff = os.difftime(t2, t1)
  return math.abs(math.floor(diff / 86400))
end`,
      hints: [
        'Convert both dates to epoch seconds with os.time.',
        'Use os.difftime to get the difference in seconds.',
        'Divide by 86400 (seconds per day) and take absolute value.',
      ],
      concepts: ['os-library', 'time', 'difftime'],
    },
    {
      id: 'lua-os-11',
      title: 'Predict os.date Fields',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the table fields from os.date.',
      skeleton: `local t = os.date("*t", os.time({year=2024, month=6, day=15, hour=10, min=30, sec=0}))
print(t.year)
print(t.month)
print(t.hour)`,
      solution: `2024
6
10`,
      hints: [
        'os.date("*t", time) returns a table for the given time.',
        'The table has year, month, day, hour, min, sec fields.',
        'The values match what was passed to os.time.',
      ],
      concepts: ['os-library', 'date-table'],
    },
    {
      id: 'lua-os-12',
      title: 'Fix File Rename Error Handling',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the missing error handling for os.rename.',
      skeleton: `function safeRename(oldName, newName)
  os.rename(oldName, newName)  -- BUG: ignores errors
  return true
end

-- If file doesn't exist, this silently fails
print(safeRename("nonexistent.txt", "new.txt"))`,
      solution: `function safeRename(oldName, newName)
  local ok, err = os.rename(oldName, newName)
  if not ok then
    return false, err
  end
  return true
end

local ok, err = safeRename("nonexistent.txt", "new.txt")
if not ok then
  print("Rename failed: " .. (err or "unknown error"))
end`,
      hints: [
        'os.rename returns nil and an error message on failure.',
        'Always capture and check the return values.',
        'Return the error to the caller for proper handling.',
      ],
      concepts: ['os-library', 'rename', 'error-handling'],
    },
    {
      id: 'lua-os-13',
      title: 'Write Age Calculator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that calculates age in years from a birth date.',
      skeleton: `-- Write calcAge(birthYear, birthMonth, birthDay) that returns
-- the current age in complete years.
-- Use os.date("*t") for the current date.

-- YOUR CODE HERE`,
      solution: `function calcAge(birthYear, birthMonth, birthDay)
  local now = os.date("*t")
  local age = now.year - birthYear
  if now.month < birthMonth or
     (now.month == birthMonth and now.day < birthDay) then
    age = age - 1
  end
  return age
end`,
      hints: [
        'Get current date with os.date("*t").',
        'Subtract birth year from current year.',
        'If the birthday has not occurred yet this year, subtract 1.',
      ],
      concepts: ['os-library', 'date-table', 'algorithms'],
    },
    {
      id: 'lua-os-14',
      title: 'Write Stopwatch Object',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a stopwatch with start, stop, and elapsed methods.',
      skeleton: `-- Write createStopwatch() that returns an object with:
-- :start() - record start time
-- :stop() - record stop time
-- :elapsed() - return elapsed seconds (stop - start)
-- Use os.clock for precision timing.

-- YOUR CODE HERE`,
      solution: `function createStopwatch()
  local sw = { startTime = 0, stopTime = 0 }
  local mt = {
    __index = {
      start = function(self)
        self.startTime = os.clock()
        self.stopTime = 0
      end,
      stop = function(self)
        self.stopTime = os.clock()
      end,
      elapsed = function(self)
        if self.stopTime > 0 then
          return self.stopTime - self.startTime
        end
        return os.clock() - self.startTime
      end,
    },
  }
  return setmetatable(sw, mt)
end`,
      hints: [
        'Store startTime and stopTime as fields.',
        'Use os.clock() for CPU-time precision.',
        'If not stopped, elapsed returns time since start.',
      ],
      concepts: ['os-library', 'clock', 'oop'],
    },
    {
      id: 'lua-os-15',
      title: 'Predict os.clock Type',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the type of os.clock() return value.',
      skeleton: `local c = os.clock()
print(type(c))
print(c >= 0)
print(math.type(c))`,
      solution: `number
true
float`,
      hints: [
        'os.clock returns a floating-point number.',
        'It represents CPU seconds used.',
        'math.type returns "float" for floating-point numbers.',
      ],
      concepts: ['os-library', 'clock', 'types'],
    },
    {
      id: 'lua-os-16',
      title: 'Write Date Validator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function that validates whether a date is real using os.time normalization.',
      skeleton: `-- Write isValidDate(year, month, day) that returns true
-- if the date is valid. Use os.time to normalize and compare.
-- os.time({year=2024, month=2, day=30}) normalizes to March 1.

-- YOUR CODE HERE`,
      solution: `function isValidDate(year, month, day)
  local t = os.time({year = year, month = month, day = day, hour = 12})
  local normalized = os.date("*t", t)
  return normalized.year == year
    and normalized.month == month
    and normalized.day == day
end`,
      hints: [
        'os.time normalizes invalid dates (e.g., Jan 32 becomes Feb 1).',
        'Convert back with os.date("*t") and compare fields.',
        'If they match, the date was valid; if not, it was normalized.',
      ],
      concepts: ['os-library', 'time', 'validation'],
    },
    {
      id: 'lua-os-17',
      title: 'Refactor Time Formatting',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor manual date string building to use os.date format strings.',
      skeleton: `local t = os.date("*t")
local dateStr = tostring(t.year) .. "-"
if t.month < 10 then dateStr = dateStr .. "0" end
dateStr = dateStr .. tostring(t.month) .. "-"
if t.day < 10 then dateStr = dateStr .. "0" end
dateStr = dateStr .. tostring(t.day)
print(dateStr)`,
      solution: `local dateStr = os.date("%Y-%m-%d")
print(dateStr)`,
      hints: [
        'os.date with format strings handles zero-padding automatically.',
        '%Y, %m, %d produce zero-padded year, month, day.',
        'One line replaces the entire manual building.',
      ],
      concepts: ['os-library', 'date-formatting', 'refactoring'],
    },
    {
      id: 'lua-os-18',
      title: 'Refactor Benchmark Code',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Refactor inline benchmark code into a reusable utility.',
      skeleton: `-- Test 1
local s1 = os.clock()
local sum1 = 0
for i = 1, 100000 do sum1 = sum1 + i end
local e1 = os.clock() - s1
print("sum: " .. e1 .. "s")

-- Test 2
local s2 = os.clock()
local prod = 1
for i = 1, 20 do prod = prod * i end
local e2 = os.clock() - s2
print("factorial: " .. e2 .. "s")`,
      solution: `local function benchmark(name, fn)
  local start = os.clock()
  local result = fn()
  local elapsed = os.clock() - start
  print(name .. ": " .. elapsed .. "s")
  return result
end

local sum1 = benchmark("sum", function()
  local s = 0
  for i = 1, 100000 do s = s + i end
  return s
end)

local prod = benchmark("factorial", function()
  local p = 1
  for i = 1, 20 do p = p * i end
  return p
end)`,
      hints: [
        'Extract the timing pattern into a benchmark function.',
        'Pass the operation as a function to the benchmark.',
        'Return the result so it can still be used.',
      ],
      concepts: ['os-library', 'clock', 'refactoring'],
    },
    {
      id: 'lua-os-19',
      title: 'Fix os.remove Error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix code that crashes when trying to remove a non-existent file.',
      skeleton: `function cleanupFile(path)
  assert(os.remove(path))  -- BUG: crashes if file doesn't exist
  print("cleaned up")
end

cleanupFile("definitely_not_a_real_file.tmp")`,
      solution: `function cleanupFile(path)
  local ok, err = os.remove(path)
  if not ok then
    print("warning: " .. (err or "could not remove file"))
  else
    print("cleaned up")
  end
end

cleanupFile("definitely_not_a_real_file.tmp")`,
      hints: [
        'os.remove returns nil and an error message on failure.',
        'assert will throw an error if remove fails.',
        'Handle the error gracefully instead of asserting.',
      ],
      concepts: ['os-library', 'remove', 'error-handling'],
    },
    {
      id: 'lua-os-20',
      title: 'Write Cron-like Scheduler',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function that checks if the current time matches a schedule.',
      skeleton: `-- Write matchesSchedule(schedule) where schedule is a table
-- with optional fields: hour, min, wday (1=Sun, 7=Sat).
-- Returns true if the current time matches all specified fields.
-- Unspecified fields match any value.

-- YOUR CODE HERE`,
      solution: `function matchesSchedule(schedule)
  local now = os.date("*t")
  if schedule.hour and now.hour ~= schedule.hour then
    return false
  end
  if schedule.min and now.min ~= schedule.min then
    return false
  end
  if schedule.wday and now.wday ~= schedule.wday then
    return false
  end
  return true
end`,
      hints: [
        'Use os.date("*t") to get the current time as a table.',
        'Check each schedule field only if it is specified (not nil).',
        'Return true only if all specified fields match.',
      ],
      concepts: ['os-library', 'date-table', 'scheduling'],
    },
  ],
};
