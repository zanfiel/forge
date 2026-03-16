import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-error',
  title: '20. Error Handling',
  explanation: `## Error Handling in Lua

Lua uses \`error()\` to raise errors and \`pcall()\` / \`xpcall()\` to catch them.

### Raising Errors
\`\`\`lua
error("something went wrong")         -- string message
error("bad input", 2)                  -- level 2 = caller
error({code = 404, msg = "not found"}) -- table as error
\`\`\`

### assert
\`\`\`lua
assert(x > 0, "x must be positive")  -- errors if condition is false
local f = assert(io.open("file.txt")) -- errors if open fails
\`\`\`

### pcall - Protected Call
\`\`\`lua
local ok, err = pcall(function()
  error("boom")
end)
print(ok)  -- false
print(err) -- "...:2: boom"
\`\`\`

### xpcall - With Error Handler
\`\`\`lua
local ok, err = xpcall(function()
  error("boom")
end, function(e)
  return "caught: " .. e
end)
print(err) -- "caught: ...:2: boom"
\`\`\`

### Error Messages
Lua prepends file and line info to string errors. Use \`error(msg, 0)\` to suppress this.`,
  exercises: [
    {
      id: 'lua-error-1',
      title: 'Raise an Error',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Raise an error with a message.',
      skeleton: `local function divide(a, b)
  if b == 0 then
    ___("division by zero")
  end
  return a / b
end`,
      solution: `local function divide(a, b)
  if b == 0 then
    error("division by zero")
  end
  return a / b
end`,
      hints: ['error() raises an error.', 'Pass a string message.', 'Fill in "error".'],
      concepts: ['error-function'],
    },
    {
      id: 'lua-error-2',
      title: 'Use assert',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Use assert to validate input.',
      skeleton: `local function sqrt(n)
  ___(n >= 0, "cannot take sqrt of negative")
  return math.sqrt(n)
end`,
      solution: `local function sqrt(n)
  assert(n >= 0, "cannot take sqrt of negative")
  return math.sqrt(n)
end`,
      hints: ['assert errors if the condition is false/nil.', 'The second argument is the error message.', 'Fill in "assert".'],
      concepts: ['assert'],
    },
    {
      id: 'lua-error-3',
      title: 'Use pcall',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Catch an error with pcall.',
      skeleton: `local ok, err = ___(function()
  error("oops")
end)
print(ok, err)`,
      solution: `local ok, err = pcall(function()
  error("oops")
end)
print(ok, err)`,
      hints: ['pcall calls a function in protected mode.', 'Returns false + error if the function errors.', 'Fill in "pcall".'],
      concepts: ['pcall'],
    },
    {
      id: 'lua-error-4',
      title: 'Error Level',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Set error level to blame the caller.',
      skeleton: `local function validate(x)
  if type(x) ~= "number" then
    error("expected number", ___)
  end
end`,
      solution: `local function validate(x)
  if type(x) ~= "number" then
    error("expected number", 2)
  end
end`,
      hints: ['Level 1 is the current function (default).', 'Level 2 points the error at the caller.', 'Fill in "2".'],
      concepts: ['error-levels'],
    },
    {
      id: 'lua-error-5',
      title: 'Use xpcall',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Use xpcall with a custom error handler.',
      skeleton: `local ok, msg = ___(
  function() error("fail") end,
  function(err) return "handled: " .. err end
)
print(msg)`,
      solution: `local ok, msg = xpcall(
  function() error("fail") end,
  function(err) return "handled: " .. err end
)
print(msg)`,
      hints: ['xpcall takes a function and an error handler.', 'The handler transforms the error.', 'Fill in "xpcall".'],
      concepts: ['xpcall'],
    },
    {
      id: 'lua-error-6',
      title: 'Table Error Object',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Raise an error with a table as the error object.',
      skeleton: `local ok, err = pcall(function()
  error({code = 404, message = "not found"})
end)
if not ok then
  print(err.___, err.___)
end`,
      solution: `local ok, err = pcall(function()
  error({code = 404, message = "not found"})
end)
if not ok then
  print(err.code, err.message)
end`,
      hints: ['Error objects can be any type, including tables.', 'Access the table fields after catching.', 'Fill in "code" and "message".'],
      concepts: ['error-objects'],
    },
    {
      id: 'lua-error-7',
      title: 'Write a Safe Division',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a function safeDivide(a, b) that returns the result or nil + error message.',
      skeleton: `-- Write function safeDivide(a, b)`,
      solution: `local function safeDivide(a, b)
  if b == 0 then
    return nil, "division by zero"
  end
  return a / b
end

local result, err = safeDivide(10, 0)
if result then
  print(result)
else
  print("Error: " .. err)
end`,
      hints: ['Return nil and an error message on failure.', 'Return the result on success.', 'The caller checks for nil.'],
      concepts: ['error-returning'],
    },
    {
      id: 'lua-error-8',
      title: 'Write a Try-Catch Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function try(fn, catch) that calls fn and passes errors to catch.',
      skeleton: `-- Write function try(fn, catch)`,
      solution: `local function try(fn, catch)
  local ok, err = pcall(fn)
  if not ok then
    catch(err)
  end
end

try(function()
  error("something broke")
end, function(err)
  print("Caught: " .. tostring(err))
end)`,
      hints: ['Use pcall to call fn.', 'If it fails, call catch with the error.', 'Simple wrapper around pcall.'],
      concepts: ['pcall', 'error-handling-pattern'],
    },
    {
      id: 'lua-error-9',
      title: 'Write an Assert With Type',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function assertType(val, expected, name) that errors if type(val) does not match expected.',
      skeleton: `-- Write function assertType(val, expected, name)`,
      solution: `local function assertType(val, expected, name)
  if type(val) ~= expected then
    error(string.format("%s: expected %s, got %s", name or "value", expected, type(val)), 2)
  end
  return val
end

assertType("hello", "string", "name")
-- assertType(42, "string", "name") -- would error`,
      hints: ['Compare type(val) with expected.', 'Use error with level 2 to blame the caller.', 'Include a helpful error message.'],
      concepts: ['type-checking', 'assert'],
    },
    {
      id: 'lua-error-10',
      title: 'Write a Retry Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function retry(fn, maxAttempts) that retries fn up to maxAttempts times on error.',
      skeleton: `-- Write function retry(fn, maxAttempts)`,
      solution: `local function retry(fn, maxAttempts)
  local lastErr
  for i = 1, maxAttempts do
    local ok, result = pcall(fn)
    if ok then
      return result
    end
    lastErr = result
  end
  error("failed after " .. maxAttempts .. " attempts: " .. tostring(lastErr))
end

-- Usage:
-- local result = retry(function() return riskyOperation() end, 3)`,
      hints: ['Loop up to maxAttempts.', 'Use pcall to catch errors.', 'Return on success, error after all attempts fail.'],
      concepts: ['pcall', 'retry-pattern'],
    },
    {
      id: 'lua-error-11',
      title: 'Write Error Chain',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function that wraps errors with context information.',
      skeleton: `-- Write function wrapError(fn, context)`,
      solution: `local function wrapError(fn, context)
  local ok, err = pcall(fn)
  if not ok then
    error(context .. ": " .. tostring(err), 0)
  end
end

local ok, err = pcall(function()
  wrapError(function()
    error("connection refused")
  end, "database init")
end)
print(err) -- "database init: connection refused"`,
      hints: ['Catch the inner error with pcall.', 'Prepend context to the error message.', 'Re-raise with the combined message.'],
      concepts: ['error-wrapping'],
    },
    {
      id: 'lua-error-12',
      title: 'Write a Result Type',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write Ok(val) and Err(msg) constructors for a Result type with unwrap, isOk, and map methods.',
      skeleton: `-- Write Ok and Err result constructors`,
      solution: `local Result = {}
Result.__index = Result

local function Ok(val)
  return setmetatable({ok = true, val = val}, Result)
end

local function Err(msg)
  return setmetatable({ok = false, err = msg}, Result)
end

function Result:isOk() return self.ok end

function Result:unwrap()
  if self.ok then return self.val end
  error("unwrap on Err: " .. tostring(self.err))
end

function Result:map(fn)
  if self.ok then return Ok(fn(self.val)) end
  return self
end

local r = Ok(42):map(function(x) return x * 2 end)
print(r:unwrap()) -- 84

local e = Err("failed")
print(e:isOk()) -- false`,
      hints: ['Ok wraps a success value.', 'Err wraps an error message.', 'unwrap returns the value or errors.'],
      concepts: ['result-type', 'error-handling'],
    },
    {
      id: 'lua-error-13',
      title: 'Fix Missing pcall Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the code that crashes instead of handling the error.',
      skeleton: `local data = require("nonexistent_module")
print(data.value)`,
      solution: `local ok, data = pcall(require, "nonexistent_module")
if ok then
  print(data.value)
else
  print("Module not found: " .. data)
end`,
      hints: ['require errors if the module is not found.', 'Wrap it in pcall to catch the error.', 'pcall(require, name) passes name as argument.'],
      concepts: ['pcall', 'require'],
    },
    {
      id: 'lua-error-14',
      title: 'Fix Assert With False Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the code where assert fails on a valid false return.',
      skeleton: `local function isAdmin(user)
  return user.role == "admin" -- returns false for non-admins
end

local user = {name = "Bob", role = "user"}
local result = assert(isAdmin(user)) -- errors! But false is a valid return`,
      solution: `local function isAdmin(user)
  return user.role == "admin"
end

local user = {name = "Bob", role = "user"}
local result = isAdmin(user)
if result then
  print("is admin")
else
  print("not admin")
end`,
      hints: ['assert treats false as failure.', 'Do not use assert for boolean checks.', 'Use a regular if statement instead.'],
      concepts: ['assert', 'false-vs-nil'],
    },
    {
      id: 'lua-error-15',
      title: 'Fix Error Object String Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the error handler that crashes on non-string errors.',
      skeleton: `local ok, err = pcall(function()
  error({code = 500})
end)
if not ok then
  print("Error: " .. err) -- crashes: attempt to concat table
end`,
      solution: `local ok, err = pcall(function()
  error({code = 500})
end)
if not ok then
  if type(err) == "table" then
    print("Error code: " .. (err.code or "unknown"))
  else
    print("Error: " .. tostring(err))
  end
end`,
      hints: ['Error objects can be any type.', 'Check the type before concatenating.', 'Use tostring for non-table errors.'],
      concepts: ['error-objects', 'type-checking'],
    },
    {
      id: 'lua-error-16',
      title: 'Predict pcall Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local ok, val = pcall(function()
  return 42
end)
print(ok, val)`,
      solution: `true\t42`,
      hints: ['pcall returns true on success.', 'The return value of the function follows.', 'ok=true, val=42.'],
      concepts: ['pcall'],
    },
    {
      id: 'lua-error-17',
      title: 'Predict Nested pcall',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local ok1, result = pcall(function()
  local ok2, err = pcall(function()
    error("inner")
  end)
  return ok2
end)
print(ok1, result)`,
      solution: `true\tfalse`,
      hints: ['Inner pcall catches "inner" error.', 'ok2 is false.', 'Outer function returns ok2 (false) successfully.'],
      concepts: ['pcall', 'nested-errors'],
    },
    {
      id: 'lua-error-18',
      title: 'Predict error Level',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict what error(msg, 0) returns.',
      skeleton: `local ok, err = pcall(function()
  error("raw message", 0)
end)
print(err)`,
      solution: `raw message`,
      hints: ['Level 0 suppresses file/line information.', 'The error message is returned as-is.', 'No "filename:line:" prefix.'],
      concepts: ['error-levels'],
    },
    {
      id: 'lua-error-19',
      title: 'Refactor Error Returns to Exceptions',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor the error-return pattern to use error/pcall.',
      skeleton: `local function parse(s)
  local n = tonumber(s)
  if not n then
    return nil, "invalid number: " .. s
  end
  return n
end

local val, err = parse("abc")
if not val then
  print(err)
end`,
      solution: `local function parse(s)
  local n = tonumber(s)
  if not n then
    error("invalid number: " .. s, 2)
  end
  return n
end

local ok, result = pcall(parse, "abc")
if ok then
  print(result)
else
  print(result)
end`,
      hints: ['Replace nil returns with error().', 'Callers use pcall instead of checking nil.', 'error level 2 blames the caller.'],
      concepts: ['error-handling', 'refactoring'],
    },
    {
      id: 'lua-error-20',
      title: 'Refactor to Error Handler',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor scattered error handling into a centralized handler using xpcall.',
      skeleton: `local function step1()
  -- might error
  return "data"
end
local function step2(data)
  -- might error
  return data:upper()
end

local ok1, data = pcall(step1)
if not ok1 then print("step1 failed: " .. data); return end
local ok2, result = pcall(step2, data)
if not ok2 then print("step2 failed: " .. result); return end
print(result)`,
      solution: `local function errorHandler(err)
  return "Pipeline failed: " .. tostring(err)
end

local function step1()
  return "data"
end

local function step2(data)
  return data:upper()
end

local ok, result = xpcall(function()
  local data = step1()
  return step2(data)
end, errorHandler)

if ok then
  print(result)
else
  print(result)
end`,
      hints: ['Use xpcall with a single error handler.', 'Chain all steps inside one protected call.', 'The handler formats any error.'],
      concepts: ['xpcall', 'refactoring'],
    },
  ],
};
