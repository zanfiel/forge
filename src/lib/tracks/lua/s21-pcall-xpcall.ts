import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-pcall',
  title: '21. Protected Calls',
  explanation: `## Protected Calls in Lua

Building on error handling, protected calls are essential for robust Lua code.

### pcall Patterns
\`\`\`lua
-- Basic pcall
local ok, result = pcall(someFunction, arg1, arg2)

-- pcall with anonymous function
local ok, err = pcall(function()
  -- dangerous code
end)

-- Multiple returns
local ok, a, b = pcall(function() return 1, 2 end)
\`\`\`

### xpcall with Traceback
\`\`\`lua
local ok, err = xpcall(function()
  error("boom")
end, debug.traceback)
-- err now contains full stack trace
\`\`\`

### assert Pattern
\`\`\`lua
-- Assert with pcall return
local data = assert(loadFile("config.lua"))

-- Custom assertion
local function assertPositive(n)
  return assert(n > 0 and n, "must be positive")
end
\`\`\`

### Error Propagation
\`\`\`lua
local function inner() error("fail") end
local function middle() inner() end  -- propagates
local function outer()
  local ok, err = pcall(middle)      -- catches
end
\`\`\``,
  exercises: [
    {
      id: 'lua-pcall-1',
      title: 'pcall with Arguments',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Pass arguments to pcall.',
      skeleton: `local function add(a, b) return a + b end
local ok, result = pcall(add, ___, ___)
print(result) -- should print 15`,
      solution: `local function add(a, b) return a + b end
local ok, result = pcall(add, 5, 10)
print(result) -- should print 15`,
      hints: ['pcall passes extra arguments to the function.', 'pcall(fn, arg1, arg2) calls fn(arg1, arg2).', 'Fill in numbers that sum to 15.'],
      concepts: ['pcall-arguments'],
    },
    {
      id: 'lua-pcall-2',
      title: 'xpcall with Traceback',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Use xpcall with debug.traceback as the error handler.',
      skeleton: `local ok, err = xpcall(function()
  error("oops")
end, ___.___)
print(err) -- includes stack trace`,
      solution: `local ok, err = xpcall(function()
  error("oops")
end, debug.traceback)
print(err) -- includes stack trace`,
      hints: ['debug.traceback generates a stack trace.', 'Pass it as the error handler.', 'Fill in "debug" and "traceback".'],
      concepts: ['xpcall', 'debug-traceback'],
    },
    {
      id: 'lua-pcall-3',
      title: 'Assert with io.open',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Use assert to check if a file opened successfully.',
      skeleton: `local f = ___(io.open("important.txt", "r"))
local data = f:read("*a")
f:close()`,
      solution: `local f = assert(io.open("important.txt", "r"))
local data = f:read("*a")
f:close()`,
      hints: ['assert errors if its first argument is nil/false.', 'io.open returns nil + error on failure.', 'Fill in "assert".'],
      concepts: ['assert', 'io-open'],
    },
    {
      id: 'lua-pcall-4',
      title: 'pcall Multiple Returns',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Capture multiple return values from a protected call.',
      skeleton: `local function multi() return "a", "b", "c" end
local ok, x, y, z = ___(multi)
print(x, y, z) -- a  b  c`,
      solution: `local function multi() return "a", "b", "c" end
local ok, x, y, z = pcall(multi)
print(x, y, z) -- a  b  c`,
      hints: ['pcall passes through all return values after ok.', 'On success: ok, ret1, ret2, ...', 'Fill in "pcall".'],
      concepts: ['pcall', 'multiple-returns'],
    },
    {
      id: 'lua-pcall-5',
      title: 'Error Propagation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Catch an error that propagates through multiple function calls.',
      skeleton: `local function deep() error("deep error") end
local function mid() deep() end
local function top() mid() end

local ok, err = ___(top)
print(ok, type(err))`,
      solution: `local function deep() error("deep error") end
local function mid() deep() end
local function top() mid() end

local ok, err = pcall(top)
print(ok, type(err))`,
      hints: ['Errors propagate up the call stack.', 'pcall at any level catches the error.', 'Fill in "pcall".'],
      concepts: ['error-propagation'],
    },
    {
      id: 'lua-pcall-6',
      title: 'Custom Error Handler',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a custom error handler for xpcall that adds timestamp.',
      skeleton: `local ok, err = xpcall(function()
  error("timeout")
end, function(e)
  return os.date("[%H:%M:%S] ") .. ___
end)
print(err)`,
      solution: `local ok, err = xpcall(function()
  error("timeout")
end, function(e)
  return os.date("[%H:%M:%S] ") .. e
end)
print(err)`,
      hints: ['The handler receives the error value.', 'Prepend a timestamp to it.', 'Fill in "e" to include the error.'],
      concepts: ['xpcall', 'error-handler'],
    },
    {
      id: 'lua-pcall-7',
      title: 'Write a Safe Require',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a function safeRequire(name) that returns the module or nil + error.',
      skeleton: `-- Write function safeRequire(name)`,
      solution: `local function safeRequire(name)
  local ok, mod = pcall(require, name)
  if ok then
    return mod
  else
    return nil, mod
  end
end

local json = safeRequire("json")
if not json then
  print("json module not available")
end`,
      hints: ['Wrap require in pcall.', 'Return the module on success.', 'Return nil + error on failure.'],
      concepts: ['pcall', 'require'],
    },
    {
      id: 'lua-pcall-8',
      title: 'Write a Protected Iterator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function safeIter(t, fn) that calls fn for each element and collects errors instead of stopping.',
      skeleton: `-- Write function safeIter(t, fn)`,
      solution: `local function safeIter(t, fn)
  local errors = {}
  local results = {}
  for i, v in ipairs(t) do
    local ok, result = pcall(fn, v)
    if ok then
      results[#results + 1] = result
    else
      errors[#errors + 1] = {index = i, error = result}
    end
  end
  return results, errors
end

local results, errors = safeIter({"1", "abc", "3"}, function(s)
  return assert(tonumber(s), "not a number: " .. s)
end)
print(#results, #errors) -- 2, 1`,
      hints: ['Wrap each fn call in pcall.', 'Collect successes and errors separately.', 'Continue processing even on errors.'],
      concepts: ['pcall', 'error-collection'],
    },
    {
      id: 'lua-pcall-9',
      title: 'Write a Finally Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function tryFinally(tryFn, finallyFn) that always runs finallyFn, even if tryFn errors.',
      skeleton: `-- Write function tryFinally(tryFn, finallyFn)`,
      solution: `local function tryFinally(tryFn, finallyFn)
  local ok, result = pcall(tryFn)
  finallyFn()
  if not ok then
    error(result, 0)
  end
  return result
end

tryFinally(function()
  print("doing work")
end, function()
  print("cleanup always runs")
end)`,
      hints: ['Use pcall for tryFn.', 'Call finallyFn regardless of success/failure.', 'Re-raise the error if tryFn failed.'],
      concepts: ['finally-pattern', 'pcall'],
    },
    {
      id: 'lua-pcall-10',
      title: 'Write a Timeout Simulator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function withTimeout(fn, maxIter) that calls fn in a coroutine and yields/resumes up to maxIter times before erroring.',
      skeleton: `-- Write function withTimeout(fn, maxIter)`,
      solution: `local function withTimeout(fn, maxIter)
  local co = coroutine.create(fn)
  for i = 1, maxIter do
    local ok, val = coroutine.resume(co)
    if not ok then
      error("error in task: " .. tostring(val))
    end
    if coroutine.status(co) == "dead" then
      return val
    end
  end
  error("timeout after " .. maxIter .. " iterations")
end

local result = withTimeout(function()
  for i = 1, 3 do
    coroutine.yield()
  end
  return "done"
end, 10)
print(result) -- "done"`,
      hints: ['Resume the coroutine in a loop.', 'Check if it is dead (finished).', 'Error if the limit is exceeded.'],
      concepts: ['coroutines', 'timeout'],
    },
    {
      id: 'lua-pcall-11',
      title: 'Write Assert Chain',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function validate(data) that chains multiple assertions.',
      skeleton: `-- Write function validate(data) with chained assertions`,
      solution: `local function validate(data)
  assert(type(data) == "table", "data must be a table")
  assert(data.name, "name is required")
  assert(type(data.name) == "string", "name must be a string")
  assert(#data.name > 0, "name cannot be empty")
  assert(data.age, "age is required")
  assert(type(data.age) == "number", "age must be a number")
  assert(data.age > 0, "age must be positive")
  return true
end

local ok, err = pcall(validate, {name = "Alice", age = 30})
print(ok) -- true

local ok2, err2 = pcall(validate, {name = ""})
print(ok2, err2)`,
      hints: ['Chain assert calls for each validation.', 'Each assert checks one condition.', 'The first failing assert stops execution.'],
      concepts: ['assert', 'validation'],
    },
    {
      id: 'lua-pcall-12',
      title: 'Write Error Boundary',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function errorBoundary(fn, fallback) that returns fn result or fallback value on error.',
      skeleton: `-- Write function errorBoundary(fn, fallback)`,
      solution: `local function errorBoundary(fn, fallback)
  local ok, result = pcall(fn)
  if ok then
    return result
  else
    if type(fallback) == "function" then
      return fallback(result)
    end
    return fallback
  end
end

local val = errorBoundary(function()
  return tonumber("abc") or error("not a number")
end, 0)
print(val) -- 0

local val2 = errorBoundary(function()
  return 42
end, 0)
print(val2) -- 42`,
      hints: ['Use pcall to protect fn.', 'Return result on success, fallback on error.', 'If fallback is a function, call it with the error.'],
      concepts: ['error-boundary', 'pcall'],
    },
    {
      id: 'lua-pcall-13',
      title: 'Fix pcall Argument Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the pcall that does not pass arguments correctly.',
      skeleton: `local function greet(name)
  return "Hello, " .. name
end
local ok, result = pcall(greet("World"))
print(result)`,
      solution: `local function greet(name)
  return "Hello, " .. name
end
local ok, result = pcall(greet, "World")
print(result)`,
      hints: ['pcall expects a function, not a function call.', 'greet("World") calls the function immediately.', 'Pass greet and "World" separately.'],
      concepts: ['pcall-arguments'],
    },
    {
      id: 'lua-pcall-14',
      title: 'Fix Swallowed Error Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the code that silently swallows errors.',
      skeleton: `local function process(data)
  pcall(function()
    -- might error
    return data:upper()
  end)
  return "done"
end
print(process(nil)) -- prints "done" but error was hidden`,
      solution: `local function process(data)
  local ok, result = pcall(function()
    return data:upper()
  end)
  if not ok then
    return nil, result
  end
  return result
end
local result, err = process(nil)
print(result, err)`,
      hints: ['The pcall result is ignored.', 'Always check the ok status.', 'Handle or propagate the error.'],
      concepts: ['error-swallowing'],
    },
    {
      id: 'lua-pcall-15',
      title: 'Fix Re-raise Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the code that loses the original error when re-raising.',
      skeleton: `local ok, err = pcall(function()
  error({code = 500, msg = "server error"})
end)
if not ok then
  error("something went wrong") -- loses the original error!
end`,
      solution: `local ok, err = pcall(function()
  error({code = 500, msg = "server error"})
end)
if not ok then
  error(err, 0) -- re-raise original error
end`,
      hints: ['Re-raise the original error object.', 'error(err, 0) preserves the error as-is.', 'Level 0 suppresses additional location info.'],
      concepts: ['error-reraise'],
    },
    {
      id: 'lua-pcall-16',
      title: 'Predict pcall Chain',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local ok, val = pcall(function()
  local ok2, val2 = pcall(error, "inner")
  return ok2, val2
end)
print(ok, val)`,
      solution: `true\tfalse`,
      hints: ['Inner pcall catches "inner" error.', 'ok2=false, val2=error message.', 'Outer function returns ok2 (false) as first return, but only one is captured.'],
      concepts: ['pcall', 'nested'],
    },
    {
      id: 'lua-pcall-17',
      title: 'Predict assert Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local ok, err = pcall(function()
  assert(nil, "custom message")
end)
print(ok)`,
      solution: `false`,
      hints: ['assert(nil) always errors.', 'The error message is "custom message".', 'pcall catches it, ok=false.'],
      concepts: ['assert', 'pcall'],
    },
    {
      id: 'lua-pcall-18',
      title: 'Predict xpcall Handler',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local ok, err = xpcall(function()
  error(42)
end, function(e)
  return e * 2
end)
print(err)`,
      solution: `84`,
      hints: ['error(42) raises 42 as the error.', 'The handler receives 42 and returns 42*2=84.', 'xpcall returns false, 84.'],
      concepts: ['xpcall', 'error-handler'],
    },
    {
      id: 'lua-pcall-19',
      title: 'Refactor Manual Error Checks',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor multiple error-return checks into pcall + assert.',
      skeleton: `local function pipeline(input)
  local step1, err1 = parse(input)
  if not step1 then return nil, "parse: " .. err1 end
  local step2, err2 = validate(step1)
  if not step2 then return nil, "validate: " .. err2 end
  local step3, err3 = transform(step2)
  if not step3 then return nil, "transform: " .. err3 end
  return step3
end`,
      solution: `local function pipeline(input)
  local ok, result = pcall(function()
    local step1 = assert(parse(input))
    local step2 = assert(validate(step1))
    return assert(transform(step2))
  end)
  if ok then
    return result
  else
    return nil, result
  end
end`,
      hints: ['Use assert to convert nil returns to errors.', 'Wrap in pcall to catch all errors.', 'Much cleaner than checking each step.'],
      concepts: ['pcall', 'assert', 'refactoring'],
    },
    {
      id: 'lua-pcall-20',
      title: 'Refactor to Structured Errors',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Refactor string errors into structured error objects.',
      skeleton: `local function fetchUser(id)
  if not id then error("missing id") end
  if type(id) ~= "number" then error("id must be number") end
  if id <= 0 then error("id must be positive") end
  return {id = id, name = "User" .. id}
end

local ok, err = pcall(fetchUser, -1)
if not ok then
  print(err) -- just a string, hard to handle programmatically
end`,
      solution: `local function AppError(code, msg, details)
  return {code = code, message = msg, details = details}
end

local function fetchUser(id)
  if not id then error(AppError("MISSING_PARAM", "missing id")) end
  if type(id) ~= "number" then error(AppError("TYPE_ERROR", "id must be number", {got = type(id)})) end
  if id <= 0 then error(AppError("VALIDATION", "id must be positive", {value = id})) end
  return {id = id, name = "User" .. id}
end

local ok, err = pcall(fetchUser, -1)
if not ok then
  if type(err) == "table" then
    print(err.code .. ": " .. err.message)
  else
    print(tostring(err))
  end
end`,
      hints: ['Create an error constructor that returns a table.', 'Include code, message, and details.', 'Check error type before accessing fields.'],
      concepts: ['structured-errors', 'refactoring'],
    },
  ],
};
