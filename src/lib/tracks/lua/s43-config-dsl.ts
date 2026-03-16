import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-config',
  title: '43. Config DSL',
  explanation: `## Config DSL in Lua

Lua's syntax and \`load()\` function make it a natural configuration language:

\`\`\`lua
-- Config as Lua code (loaded with sandboxed environment)
-- config.lua:
-- title = "My App"
-- width = 800
-- height = 600
-- colors = { bg = "#000", fg = "#fff" }

function loadConfig(filename)
  local env = {}
  local fn = loadfile(filename, "t", env)
  if fn then fn() end
  return env
end

-- Declarative DSL using function calls
-- build.lua:
-- project "myapp"
-- version "1.0"
-- depends { "lua >= 5.3", "lpeg" }

local config = {}
local env = {
  project = function(name) config.name = name end,
  version = function(v) config.version = v end,
  depends = function(deps) config.deps = deps end,
}
setmetatable(env, { __index = _G })

-- Table-as-config pattern
local defaults = {
  width = 800, height = 600,
  fullscreen = false, vsync = true,
}
function loadWithDefaults(overrides)
  local config = {}
  for k, v in pairs(defaults) do config[k] = v end
  for k, v in pairs(overrides) do config[k] = v end
  return config
end
\`\`\``,
  exercises: [
    {
      id: 'lua-config-1',
      title: 'Load Config String',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Load a Lua config string into a table using load().',
      skeleton: `local configStr = 'name = "MyApp"; version = 2'
local env = {}
local fn = ___(configStr, "config", "t", env)
if fn then fn() end
print(env.name)     -- "MyApp"
print(env.version)  -- 2`,
      solution: `local configStr = 'name = "MyApp"; version = 2'
local env = {}
local fn = load(configStr, "config", "t", env)
if fn then fn() end
print(env.name)     -- "MyApp"
print(env.version)  -- 2`,
      hints: [
        'load() compiles a string into a function.',
        'The 4th argument sets the environment for the loaded code.',
        'Variables assigned in the config become keys in env.',
      ],
      concepts: ['config-dsl', 'load', 'environment'],
    },
    {
      id: 'lua-config-2',
      title: 'Sandbox Config Loading',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Load config code in a sandbox with no access to globals.',
      skeleton: `local code = 'x = 10; y = 20; z = x + y'
local env = {}
setmetatable(env, { __index = ___ })  -- no global access
local fn = load(code, "sandbox", "t", env)
if fn then fn() end
print(env.z)  -- 30`,
      solution: `local code = 'x = 10; y = 20; z = x + y'
local env = {}
setmetatable(env, { __index = {} })  -- no global access
local fn = load(code, "sandbox", "t", env)
if fn then fn() end
print(env.z)  -- 30`,
      hints: [
        'An empty __index means no fallback to globals.',
        'The config code can only access what is in env.',
        'This prevents config files from calling dangerous functions.',
      ],
      concepts: ['config-dsl', 'sandbox', 'security'],
    },
    {
      id: 'lua-config-3',
      title: 'Predict Config Loading',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict what config values are loaded.',
      skeleton: `local env = {}
local fn = load('a=1; b=2; c=a+b', "cfg", "t", env)
fn()
print(env.a, env.b, env.c)`,
      solution: `1	2	3`,
      hints: [
        'a=1 and b=2 are assigned in the environment.',
        'c=a+b uses the values just assigned.',
        'All three are accessible via env.',
      ],
      concepts: ['config-dsl', 'loading'],
    },
    {
      id: 'lua-config-4',
      title: 'Write Default Config Merger',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that merges user config over defaults.',
      skeleton: `-- Write applyDefaults(defaults, overrides) that returns
-- a new table with all defaults, overridden by any keys in overrides.
-- Neither input is modified.

-- YOUR CODE HERE`,
      solution: `function applyDefaults(defaults, overrides)
  local config = {}
  for k, v in pairs(defaults) do
    config[k] = v
  end
  for k, v in pairs(overrides) do
    config[k] = v
  end
  return config
end`,
      hints: [
        'Copy all defaults first.',
        'Then apply overrides on top.',
        'Return a new table to avoid mutating inputs.',
      ],
      concepts: ['config-dsl', 'defaults', 'merge'],
    },
    {
      id: 'lua-config-5',
      title: 'Write Config Validator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that validates config values against a schema.',
      skeleton: `-- Write validate(config, schema) where schema maps keys to type names.
-- schema = { name = "string", width = "number", debug = "boolean" }
-- Return true if all keys match types, or nil + error message.
-- Missing keys are OK (optional).

-- YOUR CODE HERE`,
      solution: `function validate(config, schema)
  for key, expectedType in pairs(schema) do
    if config[key] ~= nil and type(config[key]) ~= expectedType then
      return nil, key .. " should be " .. expectedType .. ", got " .. type(config[key])
    end
  end
  return true
end`,
      hints: [
        'For each schema key, check the type of the config value.',
        'Skip nil values (optional keys).',
        'Return nil and an error message for type mismatches.',
      ],
      concepts: ['config-dsl', 'validation', 'types'],
    },
    {
      id: 'lua-config-6',
      title: 'Write DSL Builder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a declarative DSL using function calls.',
      skeleton: `-- Write createDSL() that returns an environment table and
-- a getConfig() function. The DSL supports:
-- name("value"), version("value"), author("value")
-- Each sets the corresponding config key.

-- YOUR CODE HERE`,
      solution: `function createDSL()
  local config = {}
  local env = {
    name = function(v) config.name = v end,
    version = function(v) config.version = v end,
    author = function(v) config.author = v end,
  }
  local function getConfig() return config end
  return env, getConfig
end`,
      hints: [
        'Each DSL function sets a key in the config table.',
        'The environment table holds these functions.',
        'getConfig returns the accumulated config.',
      ],
      concepts: ['config-dsl', 'builder-pattern'],
    },
    {
      id: 'lua-config-7',
      title: 'Fix Unsafe Config Loading',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the config loader that allows arbitrary code execution.',
      skeleton: `function loadConfig(code)
  local fn = load(code)  -- BUG: no sandbox, can call os.execute!
  if fn then fn() end
  return true
end

-- This could run dangerous code:
-- loadConfig('os.execute("rm -rf /")')`,
      solution: `function loadConfig(code)
  local env = {}  -- FIXED: sandboxed environment
  local fn, err = load(code, "config", "t", env)
  if not fn then return nil, err end
  local ok, runErr = pcall(fn)
  if not ok then return nil, runErr end
  return env
end`,
      hints: [
        'Always provide a restricted environment to load().',
        'An empty env table prevents access to all globals.',
        'Use pcall to catch runtime errors in the config.',
      ],
      concepts: ['config-dsl', 'sandbox', 'security'],
    },
    {
      id: 'lua-config-8',
      title: 'Write Nested Config',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Create a nested config loader that supports dot-notation access.',
      skeleton: `-- Write flattenConfig(t, prefix) that flattens a nested table
-- into dot-separated keys.
-- { a = { b = 1, c = { d = 2 } } } -> { "a.b" = 1, "a.c.d" = 2 }

-- YOUR CODE HERE`,
      solution: `function flattenConfig(t, prefix)
  prefix = prefix or ""
  local result = {}
  for k, v in pairs(t) do
    local key = prefix == "" and k or (prefix .. "." .. k)
    if type(v) == "table" then
      local sub = flattenConfig(v, key)
      for sk, sv in pairs(sub) do
        result[sk] = sv
      end
    else
      result[key] = v
    end
  end
  return result
end`,
      hints: [
        'Build key paths by concatenating with dots.',
        'Recurse into nested tables.',
        'Leaf values (non-tables) are stored directly.',
      ],
      concepts: ['config-dsl', 'nested', 'flattening'],
    },
    {
      id: 'lua-config-9',
      title: 'Predict Sandboxed Load',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict what happens when sandboxed code tries to use globals.',
      skeleton: `local env = {}
local fn = load('result = type("hello")', "test", "t", env)
local ok, err = pcall(fn)
print(ok)
print(env.result)`,
      solution: `false
nil`,
      hints: [
        'The sandboxed environment has no access to type().',
        'Calling type() in the sandbox causes an error.',
        'pcall catches it, returning false.',
      ],
      concepts: ['config-dsl', 'sandbox', 'errors'],
    },
    {
      id: 'lua-config-10',
      title: 'Write Config with Type Coercion',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a config parser that coerces string values to proper types.',
      skeleton: `-- Write parseConfigLine(line) that parses "key = value" and returns key, value.
-- Coerce "true"/"false" to boolean, numeric strings to numbers.
-- Everything else stays as string. Trim whitespace from both.

-- YOUR CODE HERE`,
      solution: `function parseConfigLine(line)
  local key, value = line:match("^%s*(.-)%s*=%s*(.-)%s*$")
  if not key then return nil end
  if value == "true" then value = true
  elseif value == "false" then value = false
  elseif tonumber(value) then value = tonumber(value)
  end
  return key, value
end`,
      hints: [
        'Use string.match to extract key and value.',
        'Check for "true"/"false" before trying tonumber.',
        'tonumber returns nil for non-numeric strings.',
      ],
      concepts: ['config-dsl', 'parsing', 'coercion'],
    },
    {
      id: 'lua-config-11',
      title: 'Write Safe Environment',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Create a safe environment for config loading with whitelisted functions.',
      skeleton: `-- Write createSafeEnv() that returns an environment table
-- with only safe functions: type, tostring, tonumber, pairs, ipairs,
-- math (full library), string (full library).
-- No io, os, debug, load, etc.

-- YOUR CODE HERE`,
      solution: `function createSafeEnv()
  local env = {
    type = type,
    tostring = tostring,
    tonumber = tonumber,
    pairs = pairs,
    ipairs = ipairs,
    math = math,
    string = string,
    table = table,
  }
  return env
end`,
      hints: [
        'Explicitly whitelist only safe functions.',
        'Include full library tables for math and string.',
        'Do NOT include io, os, debug, load, or loadfile.',
      ],
      concepts: ['config-dsl', 'sandbox', 'whitelist'],
    },
    {
      id: 'lua-config-12',
      title: 'Fix Config Override Order',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the config merger that applies defaults after overrides.',
      skeleton: `function loadWithDefaults(defaults, overrides)
  local config = {}
  for k, v in pairs(overrides) do config[k] = v end
  for k, v in pairs(defaults) do config[k] = v end  -- BUG: overwrites user values
  return config
end

local cfg = loadWithDefaults(
  {width=800, height=600},
  {width=1920}
)
print(cfg.width)  -- should be 1920, not 800`,
      solution: `function loadWithDefaults(defaults, overrides)
  local config = {}
  for k, v in pairs(defaults) do config[k] = v end  -- FIXED: defaults first
  for k, v in pairs(overrides) do config[k] = v end  -- overrides second
  return config
end

local cfg = loadWithDefaults(
  {width=800, height=600},
  {width=1920}
)
print(cfg.width)  -- 1920`,
      hints: [
        'Defaults must be applied first.',
        'Overrides are applied second to take precedence.',
        'The last write wins for duplicate keys.',
      ],
      concepts: ['config-dsl', 'merge-order', 'debugging'],
    },
    {
      id: 'lua-config-13',
      title: 'Write Environment Chain',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a config system with environment-based overrides (dev/prod).',
      skeleton: `-- Write createConfigChain(base, ...) where base is the default config
-- and ... are overlay tables applied in order.
-- Return a read-only proxy that looks up keys through the chain.
-- Later overlays take priority.

-- YOUR CODE HERE`,
      solution: `function createConfigChain(base, ...)
  local layers = {base, ...}
  local proxy = {}
  setmetatable(proxy, {
    __index = function(self, key)
      for i = #layers, 1, -1 do
        if layers[i][key] ~= nil then
          return layers[i][key]
        end
      end
      return nil
    end,
    __newindex = function()
      error("config is read-only")
    end,
  })
  return proxy
end`,
      hints: [
        'Store all layers in order.',
        'On __index, search from last to first (latest wins).',
        'Use __newindex to prevent modifications.',
      ],
      concepts: ['config-dsl', 'chain', 'proxy'],
    },
    {
      id: 'lua-config-14',
      title: 'Write Declarative Table Config',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Load a Lua table as configuration.',
      skeleton: `local configStr = [[
  return {
    title = "My Game",
    resolution = {width = 1920, height = 1080},
    fullscreen = true,
  }
]]
local fn = load(configStr, "config", "t", {})
local config = ___()
print(config.title)  -- "My Game"`,
      solution: `local configStr = [[
  return {
    title = "My Game",
    resolution = {width = 1920, height = 1080},
    fullscreen = true,
  }
]]
local fn = load(configStr, "config", "t", {})
local config = fn()
print(config.title)  -- "My Game"`,
      hints: [
        'The loaded code returns a table.',
        'Call fn() to execute and get the return value.',
        'The table is the config object.',
      ],
      concepts: ['config-dsl', 'table-config'],
    },
    {
      id: 'lua-config-15',
      title: 'Predict Config Merge',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the result of config merge with defaults.',
      skeleton: `local defaults = {a=1, b=2, c=3}
local user = {b=20, d=40}
local config = {}
for k,v in pairs(defaults) do config[k]=v end
for k,v in pairs(user) do config[k]=v end
print(config.a, config.b, config.c, config.d)`,
      solution: `1	20	3	40`,
      hints: [
        'a comes from defaults (1), not overridden.',
        'b is overridden by user (20).',
        'c from defaults (3), d added by user (40).',
      ],
      concepts: ['config-dsl', 'merge'],
    },
    {
      id: 'lua-config-16',
      title: 'Write Config File Watcher',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a config loader that can detect and reload changes.',
      skeleton: `-- Write createConfigLoader(loadFn) where loadFn() returns a config table.
-- :load() - call loadFn and cache the result
-- :get(key) - return cached config value
-- :reload() - re-call loadFn and update cache
-- :hasChanged() - return true if reload would produce different values

-- YOUR CODE HERE`,
      solution: `function createConfigLoader(loadFn)
  local cache = loadFn()
  local loader = {}
  local mt = {
    __index = {
      load = function(self)
        cache = loadFn()
        return cache
      end,
      get = function(self, key)
        return cache[key]
      end,
      reload = function(self)
        cache = loadFn()
        return cache
      end,
      hasChanged = function(self)
        local fresh = loadFn()
        for k, v in pairs(fresh) do
          if cache[k] ~= v then return true end
        end
        for k in pairs(cache) do
          if fresh[k] == nil then return true end
        end
        return false
      end,
    },
  }
  return setmetatable(loader, mt)
end`,
      hints: [
        'Cache the loaded config for fast get() access.',
        'reload() replaces the cache with fresh data.',
        'hasChanged() compares fresh load with cache.',
      ],
      concepts: ['config-dsl', 'reload', 'caching'],
    },
    {
      id: 'lua-config-17',
      title: 'Refactor Hardcoded Values to Config',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Extract hardcoded values into a config table.',
      skeleton: `function createGame()
  local game = {
    width = 800,
    height = 600,
    title = "My Game",
    fps = 60,
  }
  function game:update()
    local dt = 1 / 60  -- hardcoded FPS
    -- update logic
  end
  function game:getTitle()
    return "My Game"  -- hardcoded
  end
  return game
end`,
      solution: `local config = {
  width = 800,
  height = 600,
  title = "My Game",
  fps = 60,
}

function createGame(cfg)
  cfg = cfg or config
  local game = {
    width = cfg.width,
    height = cfg.height,
    title = cfg.title,
    fps = cfg.fps,
  }
  function game:update()
    local dt = 1 / self.fps
    -- update logic
  end
  function game:getTitle()
    return self.title
  end
  return game
end`,
      hints: [
        'Move magic numbers and strings to a config table.',
        'Reference config values instead of hardcoding.',
        'Accept config as a parameter for flexibility.',
      ],
      concepts: ['config-dsl', 'refactoring', 'configuration'],
    },
    {
      id: 'lua-config-18',
      title: 'Refactor Global Config to Module',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor global config variables into a proper config module.',
      skeleton: `-- Scattered global config
APP_NAME = "MyApp"
APP_VERSION = "1.0"
APP_DEBUG = true
DB_HOST = "localhost"
DB_PORT = 5432

print(APP_NAME .. " v" .. APP_VERSION)
if APP_DEBUG then print("debug mode") end`,
      solution: `local Config = {
  app = {
    name = "MyApp",
    version = "1.0",
    debug = true,
  },
  db = {
    host = "localhost",
    port = 5432,
  },
}

print(Config.app.name .. " v" .. Config.app.version)
if Config.app.debug then print("debug mode") end`,
      hints: [
        'Group related settings under nested tables.',
        'Use a single Config table instead of many globals.',
        'Nested structure makes relationships clear.',
      ],
      concepts: ['config-dsl', 'refactoring', 'organization'],
    },
    {
      id: 'lua-config-19',
      title: 'Write Schema-Based Config',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a config loader that validates and applies defaults from a schema.',
      skeleton: `-- Write loadConfigWithSchema(data, schema) where schema is:
-- { key = { type = "string", default = "val", required = true }, ... }
-- Apply defaults for missing keys, validate types, error on missing required keys.
-- Return config table or nil + error.

-- YOUR CODE HERE`,
      solution: `function loadConfigWithSchema(data, schema)
  local config = {}
  for key, spec in pairs(schema) do
    local val = data[key]
    if val == nil then
      if spec.required and spec.default == nil then
        return nil, "missing required key: " .. key
      end
      val = spec.default
    end
    if val ~= nil and type(val) ~= spec.type then
      return nil, key .. ": expected " .. spec.type .. ", got " .. type(val)
    end
    config[key] = val
  end
  return config
end`,
      hints: [
        'Check each schema key against the data.',
        'Apply defaults for missing non-required keys.',
        'Validate types for present values.',
      ],
      concepts: ['config-dsl', 'schema', 'validation'],
    },
    {
      id: 'lua-config-20',
      title: 'Write Config DSL with Method Chaining',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a fluent config DSL using method chaining.',
      skeleton: `-- Write ConfigBuilder:new() with chainable methods:
-- :set(key, value) - set a config value
-- :section(name) - start a new section (nested table)
-- :endSection() - return to parent
-- :build() - return the final config table

-- YOUR CODE HERE`,
      solution: `local ConfigBuilder = {}
ConfigBuilder.__index = ConfigBuilder

function ConfigBuilder:new()
  return setmetatable({
    _config = {},
    _current = nil,
    _stack = {},
  }, ConfigBuilder)
end

function ConfigBuilder:set(key, value)
  local target = self._current or self._config
  target[key] = value
  return self
end

function ConfigBuilder:section(name)
  local target = self._current or self._config
  target[name] = target[name] or {}
  self._stack[#self._stack + 1] = self._current
  self._current = target[name]
  return self
end

function ConfigBuilder:endSection()
  self._current = table.remove(self._stack)
  return self
end

function ConfigBuilder:build()
  return self._config
end`,
      hints: [
        'Return self from each method for chaining.',
        'Track current section with a stack for nesting.',
        'build() returns the accumulated config table.',
      ],
      concepts: ['config-dsl', 'builder', 'method-chaining'],
    },
  ],
};
