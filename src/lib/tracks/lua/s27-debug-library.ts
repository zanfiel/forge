import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-debug',
  title: '27. Debug Library',
  explanation: `## Debug Library in Lua

The \`debug\` library provides introspection and debugging facilities:

\`\`\`lua
-- debug.getinfo: get information about a function
function greet(name)
  local info = debug.getinfo(1, "nSl")
  print(info.currentline)  -- current line number
  print(info.source)       -- source file
  return "Hello, " .. name
end

-- debug.traceback: get a stack traceback string
local tb = debug.traceback("error here", 2)

-- debug.sethook: set a hook function
debug.sethook(function(event, line)
  print(event, line)
end, "l")  -- call on every line

-- debug.getlocal/setlocal: inspect local variables
function example()
  local x = 42
  local name, value = debug.getlocal(1, 1)
  print(name, value)  -- "x", 42
end

-- debug.getupvalue/setupvalue: inspect upvalues
function outer()
  local secret = 99
  return function() return secret end
end
local fn = outer()
print(debug.getupvalue(fn, 1))  -- "secret", 99
\`\`\`

**Warning**: The debug library is powerful but slow. Never use it in production-critical paths. It can break encapsulation and should only be used for development and debugging.`,
  exercises: [
    {
      id: 'lua-debug-1',
      title: 'Get Function Info',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Use debug.getinfo to get the source info of the current function.',
      skeleton: `function test()
  local info = debug.___(1, "S")
  return info.what
end
print(test())  -- "Lua"`,
      solution: `function test()
  local info = debug.getinfo(1, "S")
  return info.what
end
print(test())  -- "Lua"`,
      hints: [
        'debug.getinfo retrieves info about a function on the call stack.',
        'Level 1 refers to the current function.',
        'The "S" flag requests source information.',
      ],
      concepts: ['debug-library', 'getinfo'],
    },
    {
      id: 'lua-debug-2',
      title: 'Get Current Line',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Retrieve the current line number using debug.getinfo.',
      skeleton: `function whereAmI()
  local info = debug.getinfo(1, "___")
  return info.currentline
end
local line = whereAmI()
print(type(line))  -- "number"`,
      solution: `function whereAmI()
  local info = debug.getinfo(1, "l")
  return info.currentline
end
local line = whereAmI()
print(type(line))  -- "number"`,
      hints: [
        'The "l" flag requests line information.',
        'info.currentline gives the current line number.',
        'The flag is a lowercase L, not the number 1.',
      ],
      concepts: ['debug-library', 'getinfo'],
    },
    {
      id: 'lua-debug-3',
      title: 'Traceback String',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Generate a traceback string using debug.traceback.',
      skeleton: `function inner()
  return debug.___(  "error here", 1)
end
function outer()
  return inner()
end
local tb = outer()
print(type(tb))  -- "string"`,
      solution: `function inner()
  return debug.traceback("error here", 1)
end
function outer()
  return inner()
end
local tb = outer()
print(type(tb))  -- "string"`,
      hints: [
        'debug.traceback returns a string with the call stack.',
        'The first argument is a message to prepend.',
        'The second argument is the stack level to start from.',
      ],
      concepts: ['debug-library', 'traceback'],
    },
    {
      id: 'lua-debug-4',
      title: 'Get Local Variable',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output of debug.getlocal.',
      skeleton: `function test()
  local alpha = 10
  local beta = 20
  local name1, val1 = debug.getlocal(1, 1)
  local name2, val2 = debug.getlocal(1, 2)
  print(name1, val1)
  print(name2, val2)
end
test()`,
      solution: `alpha	10
beta	20`,
      hints: [
        'debug.getlocal(1, n) gets the nth local of the current function.',
        'Locals are numbered in the order they are defined.',
        'It returns both the name and the value.',
      ],
      concepts: ['debug-library', 'getlocal'],
    },
    {
      id: 'lua-debug-5',
      title: 'Get Upvalue',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Use debug.getupvalue to inspect a closure upvalue.',
      skeleton: `function make()
  local secret = 42
  return function() return secret end
end
local fn = make()
local name, value = debug.___(fn, 1)
print(name, value)  -- "secret", 42`,
      solution: `function make()
  local secret = 42
  return function() return secret end
end
local fn = make()
local name, value = debug.getupvalue(fn, 1)
print(name, value)  -- "secret", 42`,
      hints: [
        'debug.getupvalue retrieves upvalues from closures.',
        'The first argument is the function, the second is the upvalue index.',
        'It returns the name and value of the upvalue.',
      ],
      concepts: ['debug-library', 'getupvalue', 'closures'],
    },
    {
      id: 'lua-debug-6',
      title: 'Write a Stack Depth Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that returns the current call stack depth using debug.getinfo.',
      skeleton: `-- Write stackDepth() that returns how many levels
-- are in the current call stack (not counting itself).
-- Use debug.getinfo to probe stack levels.

-- YOUR CODE HERE`,
      solution: `function stackDepth()
  local depth = 0
  local level = 2
  while debug.getinfo(level, "") do
    depth = depth + 1
    level = level + 1
  end
  return depth
end`,
      hints: [
        'Start from level 2 to skip stackDepth itself.',
        'debug.getinfo returns nil when the level does not exist.',
        'Loop until getinfo returns nil.',
      ],
      concepts: ['debug-library', 'getinfo', 'call-stack'],
    },
    {
      id: 'lua-debug-7',
      title: 'Write Local Variable Dumper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that returns a table of all local variable names and values at the calling level.',
      skeleton: `-- Write dumpLocals() that returns a table where keys
-- are local variable names and values are their values.
-- It should capture locals from the calling function (level 2).

-- YOUR CODE HERE`,
      solution: `function dumpLocals()
  local locals = {}
  local i = 1
  while true do
    local name, value = debug.getlocal(2, i)
    if not name then break end
    locals[name] = value
    i = i + 1
  end
  return locals
end`,
      hints: [
        'Use debug.getlocal(2, i) to get locals from the caller.',
        'Increment i until getlocal returns nil.',
        'Store each name-value pair in a result table.',
      ],
      concepts: ['debug-library', 'getlocal', 'introspection'],
    },
    {
      id: 'lua-debug-8',
      title: 'Fix Hook Setup',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the debug.sethook call that does not fire on function calls.',
      skeleton: `local calls = {}
debug.sethook(function(event)
  if event == "call" then
    local info = debug.getinfo(2, "n")
    if info.name then
      calls[#calls + 1] = info.name
    end
  end
end, "l")  -- BUG: wrong mask

function foo() end
function bar() foo() end
bar()
debug.sethook()
print(#calls > 0)  -- should print true`,
      solution: `local calls = {}
debug.sethook(function(event)
  if event == "call" then
    local info = debug.getinfo(2, "n")
    if info.name then
      calls[#calls + 1] = info.name
    end
  end
end, "c")  -- FIXED: "c" for call events

function foo() end
function bar() foo() end
bar()
debug.sethook()
print(#calls > 0)  -- should print true`,
      hints: [
        'The hook mask "l" is for line events, not call events.',
        'Use "c" for call events, "r" for return events.',
        'The mask can combine flags: "cr" for both call and return.',
      ],
      concepts: ['debug-library', 'sethook', 'hooks'],
    },
    {
      id: 'lua-debug-9',
      title: 'Set Upvalue',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Use debug.setupvalue to modify a closure upvalue.',
      skeleton: `function make()
  local count = 0
  return function() count = count + 1; return count end
end
local fn = make()
print(fn())  -- 1
debug.___(fn, 1, 100)
print(fn())  -- 101`,
      solution: `function make()
  local count = 0
  return function() count = count + 1; return count end
end
local fn = make()
print(fn())  -- 1
debug.setupvalue(fn, 1, 100)
print(fn())  -- 101`,
      hints: [
        'debug.setupvalue modifies the value of an upvalue.',
        'Arguments: function, upvalue index, new value.',
        'After setting count to 100, fn() increments to 101.',
      ],
      concepts: ['debug-library', 'setupvalue', 'closures'],
    },
    {
      id: 'lua-debug-10',
      title: 'Predict getinfo What Field',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the what field for different function types.',
      skeleton: `local function luaFn() end
local info1 = debug.getinfo(luaFn, "S")
local info2 = debug.getinfo(print, "S")
print(info1.what)
print(info2.what)`,
      solution: `Lua
C`,
      hints: [
        'Lua functions have what = "Lua".',
        'C functions (like print) have what = "C".',
        'The "S" flag requests source info including the what field.',
      ],
      concepts: ['debug-library', 'getinfo', 'function-types'],
    },
    {
      id: 'lua-debug-11',
      title: 'Write Function Spy',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a spy wrapper that logs calls using debug facilities.',
      skeleton: `-- Write spy(fn) that returns a wrapped function.
-- The wrapper records each call in a .calls table.
-- Each entry is { args = {...}, result = {...} }.
-- Also add .callCount field.

-- YOUR CODE HERE`,
      solution: `function spy(fn)
  local wrapper = {
    calls = {},
    callCount = 0,
  }
  setmetatable(wrapper, {
    __call = function(self, ...)
      local args = table.pack(...)
      local results = table.pack(fn(...))
      self.callCount = self.callCount + 1
      self.calls[self.callCount] = {
        args = args,
        result = results,
      }
      return table.unpack(results, 1, results.n)
    end,
  })
  return wrapper
end`,
      hints: [
        'Use __call metamethod to make the table callable.',
        'table.pack captures all arguments including nil.',
        'Store args and results in the calls log.',
      ],
      concepts: ['debug-library', 'spy-pattern', 'metatables'],
    },
    {
      id: 'lua-debug-12',
      title: 'Write Enhanced Error with Locals',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function that creates an error message including local variable info.',
      skeleton: `-- Write errorWithLocals(msg) that returns a string containing:
-- The message, then "Locals:" on a new line, then each local
-- from the calling function as "  name = tostring(value)" per line.
-- Use debug.getlocal with level 2.

-- YOUR CODE HERE`,
      solution: `function errorWithLocals(msg)
  local parts = { msg, "Locals:" }
  local i = 1
  while true do
    local name, value = debug.getlocal(2, i)
    if not name then break end
    if name:sub(1, 1) ~= "(" then
      parts[#parts + 1] = "  " .. name .. " = " .. tostring(value)
    end
    i = i + 1
  end
  return table.concat(parts, "\n")
end`,
      hints: [
        'Use debug.getlocal(2, i) to get caller locals.',
        'Skip internal variables whose names start with "(".',
        'Use table.concat with newline separator.',
      ],
      concepts: ['debug-library', 'getlocal', 'error-handling'],
    },
    {
      id: 'lua-debug-13',
      title: 'Fix Traceback Level',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the traceback that shows the wrong starting level.',
      skeleton: `function myError(msg)
  return debug.traceback(msg, 0)  -- BUG: wrong level
end

function riskyOperation()
  return myError("something failed")
end

local tb = riskyOperation()
-- traceback should start from riskyOperation, not myError
print(type(tb))  -- "string"`,
      solution: `function myError(msg)
  return debug.traceback(msg, 2)  -- FIXED: start from caller
end

function riskyOperation()
  return myError("something failed")
end

local tb = riskyOperation()
-- traceback should start from riskyOperation, not myError
print(type(tb))  -- "string"`,
      hints: [
        'Level 0 starts from the traceback call itself.',
        'Level 1 is the current function (myError).',
        'Level 2 starts from the caller (riskyOperation).',
      ],
      concepts: ['debug-library', 'traceback', 'stack-levels'],
    },
    {
      id: 'lua-debug-14',
      title: 'Predict getlocal for Parameters',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict what getlocal returns for function parameters.',
      skeleton: `function test(a, b, c)
  local name, val = debug.getlocal(1, 2)
  print(name, val)
end
test(10, 20, 30)`,
      solution: `b	20`,
      hints: [
        'Function parameters are treated as locals.',
        'They are numbered starting from 1 in parameter order.',
        'The second local (index 2) is the second parameter b.',
      ],
      concepts: ['debug-library', 'getlocal', 'parameters'],
    },
    {
      id: 'lua-debug-15',
      title: 'Write Line Counter Hook',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function that counts how many lines a given function executes.',
      skeleton: `-- Write countLines(fn, ...) that runs fn(...) with a
-- debug hook counting line events, then returns the
-- line count followed by fn's return values.

-- YOUR CODE HERE`,
      solution: `function countLines(fn, ...)
  local count = 0
  debug.sethook(function(event)
    count = count + 1
  end, "l")
  local results = table.pack(fn(...))
  debug.sethook()
  return count, table.unpack(results, 1, results.n)
end`,
      hints: [
        'Use debug.sethook with "l" mask for line events.',
        'Increment a counter in the hook function.',
        'Remove the hook after fn completes with debug.sethook().',
      ],
      concepts: ['debug-library', 'sethook', 'profiling'],
    },
    {
      id: 'lua-debug-16',
      title: 'Refactor Verbose Debug to Clean API',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor repeated debug.getinfo calls into a clean helper.',
      skeleton: `function logCall1()
  local info = debug.getinfo(2, "nSl")
  print("[" .. (info.name or "?") .. ":" .. info.currentline .. "]")
end

function logCall2()
  local info = debug.getinfo(2, "nSl")
  print("[" .. (info.name or "?") .. ":" .. info.currentline .. "]")
end

function logCall3()
  local info = debug.getinfo(2, "nSl")
  print("[" .. (info.name or "?") .. ":" .. info.currentline .. "]")
end

function doWork()
  logCall1()
  logCall2()
  logCall3()
end
doWork()`,
      solution: `function logCall(level)
  level = (level or 2) + 1
  local info = debug.getinfo(level, "nSl")
  print("[" .. (info.name or "?") .. ":" .. info.currentline .. "]")
end

function doWork()
  logCall()
  logCall()
  logCall()
end
doWork()`,
      hints: [
        'Extract the repeated pattern into a single logCall function.',
        'Add a level parameter to adjust the stack level.',
        'Default the level and add 1 to account for the helper itself.',
      ],
      concepts: ['debug-library', 'refactoring', 'getinfo'],
    },
    {
      id: 'lua-debug-17',
      title: 'Write setlocal Example',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Use debug.setlocal to modify a local variable in a running function.',
      skeleton: `function test()
  local x = 10
  debug.___(1, 1, 99)
  return x
end
print(test())  -- 99`,
      solution: `function test()
  local x = 10
  debug.setlocal(1, 1, 99)
  return x
end
print(test())  -- 99`,
      hints: [
        'debug.setlocal modifies a local variable at a given stack level.',
        'Arguments: level, local index, new value.',
        'Level 1 is the current function, index 1 is the first local.',
      ],
      concepts: ['debug-library', 'setlocal'],
    },
    {
      id: 'lua-debug-18',
      title: 'Write Upvalue Counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that counts how many upvalues a function has.',
      skeleton: `-- Write countUpvalues(fn) that returns the number
-- of upvalues the function fn has.
-- Use debug.getupvalue in a loop.

-- YOUR CODE HERE`,
      solution: `function countUpvalues(fn)
  local count = 0
  local i = 1
  while debug.getupvalue(fn, i) do
    count = count + 1
    i = i + 1
  end
  return count
end`,
      hints: [
        'debug.getupvalue returns nil when the index is out of range.',
        'Loop from index 1 upward until it returns nil.',
        'Count each successful call.',
      ],
      concepts: ['debug-library', 'getupvalue', 'closures'],
    },
    {
      id: 'lua-debug-19',
      title: 'Refactor Inline Debug Prints',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Refactor inline debug prints into a togglable debug system.',
      skeleton: `function processData(items)
  print("DEBUG: entering processData, items=" .. #items)
  local result = {}
  for i, v in ipairs(items) do
    print("DEBUG: processing item " .. i .. "=" .. tostring(v))
    result[i] = v * 2
  end
  print("DEBUG: leaving processData, result=" .. #result)
  return result
end

local r = processData({1, 2, 3})
print(#r)`,
      solution: `local DEBUG = false

local function dbg(msg)
  if DEBUG then
    local info = debug.getinfo(2, "nl")
    local prefix = (info.name or "?") .. ":" .. info.currentline
    print("[" .. prefix .. "] " .. msg)
  end
end

function processData(items)
  dbg("entering, items=" .. #items)
  local result = {}
  for i, v in ipairs(items) do
    dbg("processing item " .. i .. "=" .. tostring(v))
    result[i] = v * 2
  end
  dbg("leaving, result=" .. #result)
  return result
end

local r = processData({1, 2, 3})
print(#r)`,
      hints: [
        'Create a DEBUG flag to toggle debug output.',
        'Write a dbg() helper that only prints when DEBUG is true.',
        'Use debug.getinfo to automatically include function name and line.',
      ],
      concepts: ['debug-library', 'refactoring', 'logging'],
    },
    {
      id: 'lua-debug-20',
      title: 'Write Call Profiler',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a simple profiler that tracks function call counts using debug hooks.',
      skeleton: `-- Write profile(fn, ...) that runs fn(...) with a hook
-- that counts calls to each named function.
-- Return a table mapping function names to call counts,
-- followed by fn's return values.

-- YOUR CODE HERE`,
      solution: `function profile(fn, ...)
  local counts = {}
  debug.sethook(function(event)
    if event == "call" then
      local info = debug.getinfo(2, "n")
      local name = info.name or "(anonymous)"
      counts[name] = (counts[name] or 0) + 1
    end
  end, "c")
  local results = table.pack(fn(...))
  debug.sethook()
  return counts, table.unpack(results, 1, results.n)
end`,
      hints: [
        'Use debug.sethook with "c" mask for call events.',
        'In the hook, use debug.getinfo(2, "n") to get the called function name.',
        'Store counts in a table keyed by function name.',
      ],
      concepts: ['debug-library', 'sethook', 'profiling'],
    },
  ],
};
