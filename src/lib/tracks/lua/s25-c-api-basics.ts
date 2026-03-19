import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-capi',
  title: '25. C API Basics',
  explanation: `## C API Basics in Lua

Lua is designed to be embedded in C programs. The C API uses a **virtual stack** for communication between C and Lua.

### The Lua State
\`\`\`c
lua_State *L = luaL_newstate();
luaL_openlibs(L);  // open standard libraries
// ... use Lua ...
lua_close(L);
\`\`\`

### The Virtual Stack
All communication between C and Lua happens through a stack:
\`\`\`
Index:  1    2    3    4  (positive from bottom)
       -4   -3   -2   -1 (negative from top)
Stack: [10] ["hi"] [true] [{table}]
\`\`\`

### Push Operations (C -> Stack)
\`\`\`c
lua_pushnil(L);
lua_pushboolean(L, 1);
lua_pushnumber(L, 3.14);
lua_pushstring(L, "hello");
lua_newtable(L);
\`\`\`

### Read Operations (Stack -> C)
\`\`\`c
int b = lua_toboolean(L, 1);
double n = lua_tonumber(L, 2);
const char *s = lua_tostring(L, 3);
\`\`\`

### Registering C Functions
\`\`\`c
static int l_add(lua_State *L) {
    double a = luaL_checknumber(L, 1);
    double b = luaL_checknumber(L, 2);
    lua_pushnumber(L, a + b);
    return 1;  // number of return values
}
lua_register(L, "add", l_add);
\`\`\`

**Note:** These exercises teach C API concepts using Lua pseudocode - actual implementation requires a C compiler.`,
  exercises: [
    {
      id: 'lua-capi-1',
      title: 'Stack Index Basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Identify the positive and negative stack indices.',
      skeleton: `-- Stack: [10] ["hello"] [true]
-- Positive indices: 1=10, 2="hello", ___=true
-- Negative indices: -1=true, -2="hello", ___=10`,
      solution: `-- Stack: [10] ["hello"] [true]
-- Positive indices: 1=10, 2="hello", 3=true
-- Negative indices: -1=true, -2="hello", -3=10`,
      hints: ['Positive indices count from the bottom (1).', 'Negative indices count from the top (-1).', '3 elements: indices 1-3 or -3 to -1.'],
      concepts: ['stack-indices'],
    },
    {
      id: 'lua-capi-2',
      title: 'Push Operations',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Identify the correct push function for each type.',
      skeleton: `-- To push 42 onto the stack:    lua_push___(L, 42)
-- To push "hi" onto the stack:  lua_push___(L, "hi")
-- To push nil onto the stack:   lua_push___(L)`,
      solution: `-- To push 42 onto the stack:    lua_pushnumber(L, 42)
-- To push "hi" onto the stack:  lua_pushstring(L, "hi")
-- To push nil onto the stack:   lua_pushnil(L)`,
      hints: ['Numbers use lua_pushnumber.', 'Strings use lua_pushstring.', 'Nil uses lua_pushnil.'],
      concepts: ['push-operations'],
    },
    {
      id: 'lua-capi-3',
      title: 'Return Values',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Understand that C functions return the count of values pushed.',
      skeleton: `-- A C function that returns two values:
-- lua_pushnumber(L, 10);
-- lua_pushnumber(L, 20);
-- return ___;  // number of return values`,
      solution: `-- A C function that returns two values:
-- lua_pushnumber(L, 10);
-- lua_pushnumber(L, 20);
-- return 2;  // number of return values`,
      hints: ['The C function return value tells Lua how many stack items are results.', 'Two push calls = two return values.', 'Fill in "2".'],
      concepts: ['return-count'],
    },
    {
      id: 'lua-capi-4',
      title: 'Type Checking',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Identify the type-checking function.',
      skeleton: `-- To check if stack position 1 is a number:
-- luaL_check___(L, 1)`,
      solution: `-- To check if stack position 1 is a number:
-- luaL_checknumber(L, 1)`,
      hints: ['luaL_check* functions validate and return values.', 'luaL_checknumber errors if not a number.', 'Fill in "number".'],
      concepts: ['type-checking'],
    },
    {
      id: 'lua-capi-5',
      title: 'Stack Top',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Get the number of elements on the stack.',
      skeleton: `-- After pushing 3 values:
-- lua_pushstring(L, "a");
-- lua_pushnumber(L, 42);
-- lua_pushboolean(L, 1);
-- int n = lua_gettop(L);  // n = ___`,
      solution: `-- After pushing 3 values:
-- lua_pushstring(L, "a");
-- lua_pushnumber(L, 42);
-- lua_pushboolean(L, 1);
-- int n = lua_gettop(L);  // n = 3`,
      hints: ['lua_gettop returns the stack size.', 'Three push operations = 3 elements.', 'Fill in "3".'],
      concepts: ['stack-operations'],
    },
    {
      id: 'lua-capi-6',
      title: 'Negative Index',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Use negative index to access the top of the stack.',
      skeleton: `-- Stack: ["first"] ["second"] ["third"]
-- lua_tostring(L, ___) returns "third" (the top)`,
      solution: `-- Stack: ["first"] ["second"] ["third"]
-- lua_tostring(L, -1) returns "third" (the top)`,
      hints: ['-1 always refers to the top of the stack.', 'Negative indices count from the top.', 'Fill in "-1".'],
      concepts: ['negative-indices'],
    },
    {
      id: 'lua-capi-7',
      title: 'Write a C Function Simulation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Simulate a C function that adds two numbers, using Lua to represent the stack operations.',
      skeleton: `-- Simulate the C API add function in Lua`,
      solution: `-- Simulating C API with Lua tables as stack
local function simulateAdd(stack)
  -- luaL_checknumber(L, 1) -- get first arg
  local a = stack[1]
  -- luaL_checknumber(L, 2) -- get second arg
  local b = stack[2]
  -- lua_pushnumber(L, a + b) -- push result
  stack[3] = a + b
  -- return 1 -- one return value
  return 1, stack
end

local stack = {10, 20}
local nresults, result = simulateAdd(stack)
print("Result:", result[3]) -- 30
print("Returns:", nresults)  -- 1`,
      hints: ['Read arguments from fixed stack positions.', 'Push result onto the stack.', 'Return the count of values pushed.'],
      concepts: ['c-function-pattern'],
    },
    {
      id: 'lua-capi-8',
      title: 'Write Stack Manipulation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Simulate stack push, pop, and top operations using a Lua table.',
      skeleton: `-- Write a stack simulator`,
      solution: `local function createStack()
  local data = {}
  local top = 0
  return {
    push = function(val)
      top = top + 1
      data[top] = val
    end,
    pop = function(n)
      n = n or 1
      top = math.max(0, top - n)
    end,
    get = function(idx)
      if idx < 0 then idx = top + idx + 1 end
      return data[idx]
    end,
    gettop = function()
      return top
    end,
    settop = function(n)
      top = n
    end,
  }
end

local s = createStack()
s.push(10); s.push("hello"); s.push(true)
print(s.gettop())   -- 3
print(s.get(-1))     -- true
print(s.get(1))      -- 10
s.pop(1)
print(s.gettop())   -- 2`,
      hints: ['Track the top index manually.', 'Positive indices count from bottom.', 'Negative indices count from top.'],
      concepts: ['stack-simulation'],
    },
    {
      id: 'lua-capi-9',
      title: 'Write a Table Access Simulation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Simulate the C API pattern for getting a field from a Lua table on the stack.',
      skeleton: `-- Simulate lua_getfield pattern`,
      solution: `-- In C API, to get t.name where t is at stack index 1:
-- lua_getfield(L, 1, "name")  -- pushes t.name onto stack

local function simulateGetField(stack, tableIdx, fieldName)
  local t = stack[tableIdx]
  if type(t) ~= "table" then error("not a table at index " .. tableIdx) end
  local value = t[fieldName]
  stack[#stack + 1] = value  -- push onto stack
  return stack
end

local stack = {{name = "Alice", age = 30}}
simulateGetField(stack, 1, "name")
print(stack[2]) -- "Alice" (was pushed onto stack)`,
      hints: ['lua_getfield reads a table field and pushes the value.', 'The table stays on the stack.', 'The value is added on top.'],
      concepts: ['table-access-api'],
    },
    {
      id: 'lua-capi-10',
      title: 'Write a Function Registration Simulation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Simulate lua_register by creating a global function in a Lua environment table.',
      skeleton: `-- Simulate lua_register`,
      solution: `local function luaRegister(env, name, cfunc)
  -- In C: lua_register(L, "name", cfunc)
  -- This sets a global function
  env[name] = function(...)
    -- Simulate pushing args to stack
    local args = {...}
    -- Call the C function
    return cfunc(args)
  end
end

local env = {}
luaRegister(env, "square", function(args)
  return args[1] * args[1]
end)

print(env.square(5)) -- 25`,
      hints: ['lua_register sets a global function name.', 'The function wraps a C function.', 'Arguments are passed via the stack.'],
      concepts: ['function-registration'],
    },
    {
      id: 'lua-capi-11',
      title: 'Write Error Handling API Simulation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Simulate luaL_error which pushes an error message and triggers a long jump.',
      skeleton: `-- Simulate luaL_error pattern`,
      solution: `local function luaL_error(msg, ...)
  -- In C: luaL_error(L, "format string", args...)
  -- This formats the message and throws a Lua error
  error(string.format(msg, ...), 2)
end

local function safeDivide(a, b)
  if b == 0 then
    luaL_error("division by zero: %d / %d", a, b)
  end
  return a / b
end

local ok, err = pcall(safeDivide, 10, 0)
print(err)`,
      hints: ['luaL_error is like error() with formatting.', 'It never returns (throws an error).', 'Use string.format for the message.'],
      concepts: ['error-api'],
    },
    {
      id: 'lua-capi-12',
      title: 'Write a Registry Simulation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Simulate the Lua registry (LUA_REGISTRYINDEX) for storing C-side references.',
      skeleton: `-- Simulate the Lua registry`,
      solution: `local function createRegistry()
  local registry = {}
  local nextRef = 1

  return {
    ref = function(value)
      local r = nextRef
      registry[r] = value
      nextRef = nextRef + 1
      return r
    end,
    unref = function(r)
      registry[r] = nil
    end,
    getref = function(r)
      return registry[r]
    end,
  }
end

local reg = createRegistry()
local ref1 = reg.ref({data = "important"})
local ref2 = reg.ref(function() print("callback") end)
print(reg.getref(ref1).data) -- "important"
reg.getref(ref2)()           -- "callback"
reg.unref(ref1)
print(reg.getref(ref1))      -- nil`,
      hints: ['The registry stores values by integer reference.', 'luaL_ref creates a reference, luaL_unref releases it.', 'This prevents GC of values needed by C code.'],
      concepts: ['registry', 'references'],
    },
    {
      id: 'lua-capi-13',
      title: 'Fix Stack Imbalance',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the simulated C function that leaves extra values on the stack.',
      skeleton: `-- Simulated C function: should return only the result
local function cFunc(stack)
  local a = stack[1]
  local b = stack[2]
  stack[3] = a + b  -- push sum
  stack[4] = a - b  -- push diff (accidentally)
  return 1  -- says 1 return value, but pushed 2!
end`,
      solution: `-- Simulated C function: should return only the result
local function cFunc(stack)
  local a = stack[1]
  local b = stack[2]
  stack[3] = a + b  -- push only the sum
  return 1  -- correctly says 1 return value
end`,
      hints: ['Only push the values you intend to return.', 'The return count must match pushed values.', 'Remove the extra push.'],
      concepts: ['stack-balance'],
    },
    {
      id: 'lua-capi-14',
      title: 'Fix Missing Error Check',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the simulated C function that does not validate argument types.',
      skeleton: `-- Simulated C function: should check argument types
local function l_concat(args)
  return args[1] .. args[2]  -- crashes if not strings!
end

local ok = pcall(function() print(l_concat({42, true})) end)
print(ok) -- false`,
      solution: `local function l_concat(args)
  if type(args[1]) ~= "string" then
    error("bad argument #1 (string expected, got " .. type(args[1]) .. ")")
  end
  if type(args[2]) ~= "string" then
    error("bad argument #2 (string expected, got " .. type(args[2]) .. ")")
  end
  return args[1] .. args[2]
end

print(l_concat({"hello", " world"})) -- "hello world"`,
      hints: ['Always validate argument types in C functions.', 'In real C API, use luaL_checkstring.', 'Provide helpful error messages.'],
      concepts: ['type-checking', 'argument-validation'],
    },
    {
      id: 'lua-capi-15',
      title: 'Fix Upvalue Access Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the simulated C closure that does not access its upvalue correctly.',
      skeleton: `-- Simulating a C closure with upvalue
local function createClosure(upval)
  -- In C: lua_pushcclosure(L, func, 1)
  return function(args)
    -- Bug: upval is captured but never used
    return args[1] + args[1]  -- should add upval, not double
  end
end

local addTen = createClosure(10)
print(addTen({5})) -- should print 15, not 10`,
      solution: `local function createClosure(upval)
  return function(args)
    return args[1] + upval
  end
end

local addTen = createClosure(10)
print(addTen({5})) -- 15`,
      hints: ['The closure should use the upvalue.', 'args[1] + upval gives the correct result.', 'Replace args[1] with upval in the addition.'],
      concepts: ['closures', 'upvalues'],
    },
    {
      id: 'lua-capi-16',
      title: 'Predict Stack State',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the stack state after operations.',
      skeleton: `-- Simulate stack operations
local stack = {}
stack[1] = 10         -- lua_pushnumber(L, 10)
stack[2] = "hello"    -- lua_pushstring(L, "hello")
stack[3] = true       -- lua_pushboolean(L, 1)
-- lua_remove(L, 2)   -- remove index 2
table.remove(stack, 2)
print(stack[1], stack[2])`,
      solution: `10\ttrue`,
      hints: ['Remove at index 2 shifts elements down.', '"hello" is removed.', 'true moves from index 3 to index 2.'],
      concepts: ['stack-operations'],
    },
    {
      id: 'lua-capi-17',
      title: 'Predict Return Values',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict how many values Lua sees from a C function.',
      skeleton: `-- Simulated C function pushes 3 values but returns 2
local function cFunc()
  -- lua_pushnumber(L, 1)
  -- lua_pushnumber(L, 2)
  -- lua_pushnumber(L, 3)
  -- return 2  -- only last 2 are returned
  return 2, 3  -- Lua only sees these
end
local a, b = cFunc()
print(a, b)`,
      solution: `2\t3`,
      hints: ['The return count determines visible values.', 'In C, return 2 means last 2 pushed values.', 'Lua sees 2 and 3.'],
      concepts: ['return-count'],
    },
    {
      id: 'lua-capi-18',
      title: 'Predict Type Check',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict what lua_type returns for different values.',
      skeleton: `-- lua_type constants:
-- LUA_TNIL=0 LUA_TBOOLEAN=1 LUA_TNUMBER=3 LUA_TSTRING=4 LUA_TTABLE=5
-- Simulating:
local types = {
  [0]="nil", [1]="boolean", [3]="number", [4]="string", [5]="table"
}
local stack = {42, "hi", {}}
for _, v in ipairs(stack) do
  print(type(v))
end`,
      solution: `number
string
table`,
      hints: ['42 is a number.', '"hi" is a string.', '{} is a table.'],
      concepts: ['lua-types', 'type-checking'],
    },
    {
      id: 'lua-capi-19',
      title: 'Refactor to API Style',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor a direct Lua function into a C API-style function with argument checking.',
      skeleton: `local function greet(name)
  return "Hello, " .. name .. "!"
end
print(greet("Alice"))`,
      solution: `-- C API style: validate args, clear errors
local function l_greet(...)
  local args = {...}
  -- luaL_checkstring equivalent
  if type(args[1]) ~= "string" then
    error("bad argument #1 to 'greet' (string expected, got " .. type(args[1]) .. ")", 2)
  end
  local name = args[1]
  -- lua_pushstring equivalent
  return "Hello, " .. name .. "!"
  -- return 1 (one value pushed)
end

print(l_greet("Alice"))  -- "Hello, Alice!"
-- l_greet(42) would error with clear message`,
      hints: ['Add explicit type checking for all arguments.', 'Use descriptive error messages.', 'This mimics how C API functions validate input.'],
      concepts: ['argument-validation', 'c-api-style'],
    },
    {
      id: 'lua-capi-20',
      title: 'Refactor to Module Registration',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor standalone functions into a C API-style module registration pattern.',
      skeleton: `-- Standalone functions
local function add(a, b) return a + b end
local function sub(a, b) return a - b end
local function mul(a, b) return a * b end
print(add(2, 3))`,
      solution: `-- C API-style module registration (luaL_Reg equivalent)
local function createModule()
  -- luaL_Reg array equivalent
  local funcs = {
    add = function(a, b)
      assert(type(a) == "number", "arg #1 must be number")
      assert(type(b) == "number", "arg #2 must be number")
      return a + b
    end,
    sub = function(a, b)
      assert(type(a) == "number", "arg #1 must be number")
      assert(type(b) == "number", "arg #2 must be number")
      return a - b
    end,
    mul = function(a, b)
      assert(type(a) == "number", "arg #1 must be number")
      assert(type(b) == "number", "arg #2 must be number")
      return a * b
    end,
  }
  -- luaL_newlib equivalent
  return funcs
end

local mymath = createModule()
print(mymath.add(2, 3)) -- 5`,
      hints: ['Group functions into a registration table.', 'Add type checking to each function.', 'Return the module table (like luaL_newlib).'],
      concepts: ['module-registration', 'c-api-pattern'],
    },
  ],
};
