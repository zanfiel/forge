import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-env',
  title: '22. Environments',
  explanation: `## Environments in Lua

In Lua 5.2+, **_ENV** is the environment table for the current chunk. Global variables are actually fields of _ENV.

### _ENV Basics
\`\`\`lua
-- These are equivalent:
x = 10
_ENV.x = 10
_ENV["x"] = 10
\`\`\`

### _G - The Global Table
\`\`\`lua
print(_G == _ENV) -- true (in main chunk)
\`\`\`

### Custom Environments
\`\`\`lua
local myEnv = setmetatable({}, {__index = _G})
local fn = load("return x + 1", nil, nil, myEnv)
myEnv.x = 41
print(fn()) -- 42
\`\`\`

### Sandboxing
\`\`\`lua
local sandbox = {
  print = print,
  tostring = tostring,
  type = type,
  -- only expose safe functions
}
local code = load(userCode, nil, nil, sandbox)
code() -- runs with limited access
\`\`\`

### Changing _ENV
\`\`\`lua
local _ENV = {print = print}
-- now only print is available as a "global"
print("hello") -- works
-- os.time() -- would error
\`\`\``,
  exercises: [
    {
      id: 'lua-env-1',
      title: '_ENV Basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Access a global variable through _ENV.',
      skeleton: `x = 42
print(___["x"]) -- should print 42`,
      solution: `x = 42
print(_ENV["x"]) -- should print 42`,
      hints: ['Global variables live in _ENV.', '_ENV["x"] is the same as the global x.', 'Fill in "_ENV".'],
      concepts: ['_ENV'],
    },
    {
      id: 'lua-env-2',
      title: '_G Reference',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Check that _G equals _ENV.',
      skeleton: `print(___ == _ENV) -- true in main chunk`,
      solution: `print(_G == _ENV) -- true in main chunk`,
      hints: ['_G is a reference to the global environment.', 'In the main chunk, _G == _ENV.', 'Fill in "_G".'],
      concepts: ['_G'],
    },
    {
      id: 'lua-env-3',
      title: 'Load with Custom Env',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Load code with a custom environment.',
      skeleton: `local env = {x = 10, y = 20}
local fn = load("return x + y", nil, nil, ___)
print(fn()) -- should print 30`,
      solution: `local env = {x = 10, y = 20}
local fn = load("return x + y", nil, nil, env)
print(fn()) -- should print 30`,
      hints: ['The 4th argument to load is the environment.', 'The loaded code sees env as its _ENV.', 'Fill in "env".'],
      concepts: ['load', 'environments'],
    },
    {
      id: 'lua-env-4',
      title: 'Override _ENV',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Create a restricted environment by overriding _ENV locally.',
      skeleton: `local safeprint = print
do
  local _ENV = {print = safeprint}
  ___("hello from restricted env")
end`,
      solution: `local safeprint = print
do
  local _ENV = {print = safeprint}
  print("hello from restricted env")
end`,
      hints: ['Overriding _ENV changes what globals are available.', 'Only print is available in the restricted env.', 'Fill in "print".'],
      concepts: ['_ENV-override'],
    },
    {
      id: 'lua-env-5',
      title: 'List All Globals',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Iterate over all global variables.',
      skeleton: `for name, val in ___(___) do
  if type(val) == "function" then
    print(name)
  end
end`,
      solution: `for name, val in pairs(_G) do
  if type(val) == "function" then
    print(name)
  end
end`,
      hints: ['_G contains all globals.', 'Use pairs to iterate over it.', 'Fill in "pairs" and "_G".'],
      concepts: ['_G', 'pairs'],
    },
    {
      id: 'lua-env-6',
      title: 'Set Global via _G',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Set a global variable using _G.',
      skeleton: `___["myGlobal"] = 42
print(myGlobal) -- 42`,
      solution: `_G["myGlobal"] = 42
print(myGlobal) -- 42`,
      hints: ['_G is the global table.', '_G["name"] = val sets a global.', 'Fill in "_G".'],
      concepts: ['_G'],
    },
    {
      id: 'lua-env-7',
      title: 'Write a Sandbox',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function sandbox(code) that executes Lua code with only safe functions available.',
      skeleton: `-- Write function sandbox(code)`,
      solution: `local function sandbox(code)
  local safeEnv = {
    print = print,
    tostring = tostring,
    tonumber = tonumber,
    type = type,
    pairs = pairs,
    ipairs = ipairs,
    math = math,
    string = string,
    table = table,
  }
  local fn, err = load(code, "sandbox", "t", safeEnv)
  if not fn then
    return false, err
  end
  return pcall(fn)
end

sandbox('print("safe: " .. tostring(2 + 2))')`,
      hints: ['Create an environment with only safe functions.', 'Use load with the safe environment.', 'Execute the loaded function with pcall.'],
      concepts: ['sandboxing', 'load'],
    },
    {
      id: 'lua-env-8',
      title: 'Write a Scoped Eval',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function eval(code, vars) that evaluates code with access to vars.',
      skeleton: `-- Write function eval(code, vars)`,
      solution: `local function eval(code, vars)
  local env = setmetatable(vars or {}, {__index = _G})
  local fn, err = load("return " .. code, "eval", "t", env)
  if not fn then
    return nil, err
  end
  return pcall(fn)
end

local ok, result = eval("x * 2 + y", {x = 5, y = 3})
print(result) -- 13`,
      hints: ['Create an environment with vars + _G fallback.', 'Prepend "return " to evaluate expressions.', 'Use load with the custom environment.'],
      concepts: ['eval', 'environments'],
    },
    {
      id: 'lua-env-9',
      title: 'Write a Module Environment',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that creates a module using a custom _ENV.',
      skeleton: `-- Write a module using _ENV technique`,
      solution: `local function createModule()
  local M = {}
  local _ENV = setmetatable(M, {__index = _G})

  function greet(name)
    return "Hello, " .. name
  end

  function farewell(name)
    return "Goodbye, " .. name
  end

  return M
end

local mod = createModule()
print(mod.greet("Alice"))
print(mod.farewell("Bob"))`,
      hints: ['Set _ENV to a table that collects definitions.', 'Functions defined become fields of M.', 'Use setmetatable with __index = _G for builtins.'],
      concepts: ['_ENV', 'module-pattern'],
    },
    {
      id: 'lua-env-10',
      title: 'Write an Environment Snapshot',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function snapshot() that returns a copy of all global variables.',
      skeleton: `-- Write function snapshot()`,
      solution: `local function snapshot()
  local copy = {}
  for k, v in pairs(_G) do
    copy[k] = v
  end
  return copy
end

local before = snapshot()
newGlobal = 42
local after = snapshot()
print(before.newGlobal, after.newGlobal) -- nil  42`,
      hints: ['Copy all key-value pairs from _G.', 'Use pairs to iterate.', 'Returns a shallow copy of the global state.'],
      concepts: ['_G', 'snapshot'],
    },
    {
      id: 'lua-env-11',
      title: 'Write a Read-Only Env',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write code that creates a read-only environment where setting globals errors.',
      skeleton: `-- Create a read-only global environment`,
      solution: `local readOnlyEnv = setmetatable({}, {
  __index = _G,
  __newindex = function(_, key, val)
    error("cannot set global: " .. tostring(key), 2)
  end,
})

local fn = load([[
  print("reading works")
  x = 10  -- this will error
]], "test", "t", readOnlyEnv)

local ok, err = pcall(fn)
print(ok, err)`,
      hints: ['Use __index to allow reads from _G.', 'Use __newindex to block writes.', 'This prevents accidental global creation.'],
      concepts: ['read-only-env', '__newindex'],
    },
    {
      id: 'lua-env-12',
      title: 'Write Config File Loader',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function loadConfig(code) that executes a Lua config string and returns the defined variables as a table.',
      skeleton: `-- Write function loadConfig(code)`,
      solution: `local function loadConfig(code)
  local config = {}
  local env = setmetatable(config, {__index = _G})
  local fn, err = load(code, "config", "t", env)
  if not fn then return nil, err end
  local ok, runErr = pcall(fn)
  if not ok then return nil, runErr end
  setmetatable(config, nil)
  return config
end

local cfg = loadConfig([[
  host = "localhost"
  port = 8080
  debug = true
]])
print(cfg.host, cfg.port, cfg.debug)`,
      hints: ['The config code sets "globals" that land in the env table.', 'Remove the metatable before returning.', 'Use load with the config environment.'],
      concepts: ['config-loading', 'environments'],
    },
    {
      id: 'lua-env-13',
      title: 'Fix Sandbox Escape Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the sandbox that allows access to os.execute.',
      skeleton: `local function sandbox(code)
  local env = setmetatable({print = print}, {__index = _G}) -- bug!
  local fn = load(code, "sandbox", "t", env)
  pcall(fn)
end
-- User could run: os.execute("rm -rf /")`,
      solution: `local function sandbox(code)
  local env = {
    print = print,
    tostring = tostring,
    type = type,
    math = {abs = math.abs, max = math.max, min = math.min},
  }
  local fn = load(code, "sandbox", "t", env)
  if fn then pcall(fn) end
end`,
      hints: ['__index = _G exposes everything.', 'Remove the _G fallback.', 'Explicitly list only safe functions.'],
      concepts: ['sandboxing', 'security'],
    },
    {
      id: 'lua-env-14',
      title: 'Fix _ENV Scope Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the code where _ENV override leaks outside the block.',
      skeleton: `local _ENV = {print = print, type = type}
print(type("hello")) -- works
-- But now we can't use anything else in the entire file!
-- math.sqrt(16) -- error`,
      solution: `do
  local _ENV = {print = print, type = type}
  print(type("hello")) -- works
end
-- math.sqrt still works here
print(math.sqrt(16))`,
      hints: ['Wrap the _ENV override in a do..end block.', 'The override is local to the block.', 'Outside the block, normal _ENV is restored.'],
      concepts: ['_ENV', 'scope'],
    },
    {
      id: 'lua-env-15',
      title: 'Fix Load Text Mode Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the load call that is vulnerable to binary bytecode injection.',
      skeleton: `local function runUserCode(code)
  local fn = load(code, "user", nil, {print = print})
  if fn then fn() end
end
-- Attacker could pass precompiled bytecode`,
      solution: `local function runUserCode(code)
  local fn = load(code, "user", "t", {print = print})
  if fn then fn() end
end
-- "t" mode only allows text, blocks bytecode`,
      hints: ['The third argument to load specifies the mode.', '"t" means text only (no bytecode).', '"b" means binary only, "bt" means both.'],
      concepts: ['load', 'security'],
    },
    {
      id: 'lua-env-16',
      title: 'Predict _ENV Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local x = 10
do
  local _ENV = {print = print, x = 99}
  print(x)
end`,
      solution: `99`,
      hints: ['Inside the block, _ENV is the custom table.', 'x resolves to _ENV.x which is 99.', 'The outer local x is shadowed by _ENV.x.'],
      concepts: ['_ENV'],
    },
    {
      id: 'lua-env-17',
      title: 'Predict load Env Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local env = {x = 5}
local fn = load("x = x * 2; return x", nil, nil, env)
fn()
print(env.x)`,
      solution: `10`,
      hints: ['The loaded code runs in env.', 'x starts as 5, becomes 5*2=10.', 'The change is visible in env.x.'],
      concepts: ['load', 'environments'],
    },
    {
      id: 'lua-env-18',
      title: 'Predict _G Modification',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `_G.myVar = "hello"
print(myVar)`,
      solution: `hello`,
      hints: ['_G.myVar creates a global variable.', 'myVar is the same as _G.myVar.', 'print(myVar) outputs "hello".'],
      concepts: ['_G'],
    },
    {
      id: 'lua-env-19',
      title: 'Refactor Globals to Env',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor code that uses globals into a clean _ENV-based module.',
      skeleton: `-- Bad: uses globals
function add(a, b) return a + b end
function mul(a, b) return a * b end
function sub(a, b) return a - b end
-- These pollute _G`,
      solution: `local M = {}
do
  local _ENV = setmetatable(M, {__index = _G})
  function add(a, b) return a + b end
  function mul(a, b) return a * b end
  function sub(a, b) return a - b end
end
setmetatable(M, nil)
-- M.add, M.mul, M.sub are clean exports
print(M.add(1, 2))`,
      hints: ['Use _ENV to capture definitions in a table.', 'Wrap in do..end to limit scope.', 'Remove the metatable after definitions.'],
      concepts: ['_ENV', 'module-pattern', 'refactoring'],
    },
    {
      id: 'lua-env-20',
      title: 'Refactor to Safe Loader',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Refactor the unsafe dofile into a safe config loader.',
      skeleton: `-- Unsafe: runs arbitrary code with full access
local config = dofile("config.lua")
-- config.lua could do anything: delete files, network, etc.`,
      solution: `local function safeLoadConfig(path)
  local f = io.open(path, "r")
  if not f then return nil, "cannot open " .. path end
  local code = f:read("*a")
  f:close()

  local config = {}
  local safeEnv = setmetatable(config, {
    __index = {
      true_ = true,
      false_ = false,
      tonumber = tonumber,
      tostring = tostring,
    },
  })

  local fn, err = load(code, path, "t", safeEnv)
  if not fn then return nil, err end
  local ok, runErr = pcall(fn)
  if not ok then return nil, runErr end
  setmetatable(config, nil)
  return config
end

local cfg = safeLoadConfig("config.lua")`,
      hints: ['Read the file manually instead of dofile.', 'Use load with a restricted environment.', 'Only expose safe functions.'],
      concepts: ['sandboxing', 'refactoring'],
    },
  ],
};
