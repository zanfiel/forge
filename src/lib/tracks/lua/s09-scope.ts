import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-scope',
  title: '09. Scope',
  explanation: `## Scope in Lua

Lua uses lexical scoping. Variables are visible in the block where they are declared and all nested blocks.

### Local vs Global
\`\`\`lua
x = 10             -- global (stored in _ENV)
local y = 20       -- local to this chunk

local function test()
  local z = 30     -- local to function
  print(x, y, z)   -- can see all three
end
test()
print(z)           -- nil (z is not visible here)
\`\`\`

### Block Scope with do..end
\`\`\`lua
do
  local temp = 42
  print(temp) -- 42
end
print(temp)   -- nil
\`\`\`

### Variable Shadowing
\`\`\`lua
local x = 10
do
  local x = 20    -- shadows outer x
  print(x)        -- 20
end
print(x)          -- 10 (outer x unchanged)
\`\`\`

### For Loop Variable Scope
\`\`\`lua
for i = 1, 3 do
  print(i) -- i is local to the loop
end
print(i) -- nil (i is not visible here)
\`\`\`

**Best practice:** Always use \`local\`. Globals are slow and error-prone.`,
  exercises: [
    {
      id: 'lua-scope-1',
      title: 'Local Variable Scope',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Declare a local variable inside a do..end block.',
      skeleton: `___
  local secret = 42
  print(secret) -- 42
___
print(secret) -- nil`,
      solution: `do
  local secret = 42
  print(secret) -- 42
end
print(secret) -- nil`,
      hints: ['do..end creates a new scope.', 'local variables inside are not visible outside.', 'Fill in "do" and "end".'],
      concepts: ['block-scope'],
    },
    {
      id: 'lua-scope-2',
      title: 'Shadowing a Variable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Shadow the outer variable x inside the do block.',
      skeleton: `local x = "outer"
do
  ___ x = "inner"
  print(x) -- should print "inner"
end
print(x) -- should print "outer"`,
      solution: `local x = "outer"
do
  local x = "inner"
  print(x) -- should print "inner"
end
print(x) -- should print "outer"`,
      hints: ['Declaring a new local with the same name shadows the outer one.', 'The outer variable is unchanged.', 'Fill in "local".'],
      concepts: ['shadowing'],
    },
    {
      id: 'lua-scope-3',
      title: 'Global Variable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Identify that a variable without local is global.',
      skeleton: `local function setGlobal()
  answer = ___
end
setGlobal()
print(answer) -- should print 42`,
      solution: `local function setGlobal()
  answer = 42
end
setGlobal()
print(answer) -- should print 42`,
      hints: ['Variables without local are global.', 'answer is accessible everywhere.', 'Fill in 42.'],
      concepts: ['global-variables'],
    },
    {
      id: 'lua-scope-4',
      title: 'Function Parameter Scope',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Understand that function parameters are local to the function.',
      skeleton: `local function test(x)
  print(x) -- prints the parameter
end
test(99)
print(___) -- what is x here?`,
      solution: `local function test(x)
  print(x) -- prints the parameter
end
test(99)
print(x) -- what is x here?`,
      hints: ['Function parameters are local to the function.', 'x is not defined outside test.', 'x is nil outside the function.'],
      concepts: ['parameter-scope'],
    },
    {
      id: 'lua-scope-5',
      title: 'For Loop Scope',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Show that for loop variables are local to the loop.',
      skeleton: `for i = 1, 3 do end
print(type(___)) -- should print "nil"`,
      solution: `for i = 1, 3 do end
print(type(i)) -- should print "nil"`,
      hints: ['The loop variable i is local to the for loop.', 'After the loop, i is not accessible.', 'type(i) returns "nil" since i is a global that was never set.'],
      concepts: ['loop-scope'],
    },
    {
      id: 'lua-scope-6',
      title: 'Upvalue Access',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Access an outer variable from an inner function.',
      skeleton: `local count = 0
local function increment()
  count = ___ + 1
end
increment()
increment()
print(count) -- should print 2`,
      solution: `local count = 0
local function increment()
  count = count + 1
end
increment()
increment()
print(count) -- should print 2`,
      hints: ['Inner functions can access outer local variables.', 'These are called upvalues.', 'count refers to the outer count.'],
      concepts: ['upvalues'],
    },
    {
      id: 'lua-scope-7',
      title: 'Write Scope Demonstration',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write code demonstrating three levels of scope: outer, middle (do..end), and inner (function), each with a local x.',
      skeleton: `-- Demonstrate three levels of scope`,
      solution: `local x = "outer"
do
  local x = "middle"
  local function inner()
    local x = "inner"
    print(x) -- "inner"
  end
  inner()
  print(x) -- "middle"
end
print(x) -- "outer"`,
      hints: ['Each scope can have its own local x.', 'Inner scopes shadow outer ones.', 'Each level prints its own x.'],
      concepts: ['scope-levels', 'shadowing'],
    },
    {
      id: 'lua-scope-8',
      title: 'Write a Counter with Scope',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a do..end block that creates a local counter and an increment/get function pair exposed as globals.',
      skeleton: `-- Create a scoped counter with increment() and getCount() functions`,
      solution: `do
  local count = 0
  function increment()
    count = count + 1
  end
  function getCount()
    return count
  end
end

increment()
increment()
increment()
print(getCount()) -- 3`,
      hints: ['Use do..end to hide the count variable.', 'Define global functions inside to expose access.', 'The functions are closures over count.'],
      concepts: ['block-scope', 'closures', 'encapsulation'],
    },
    {
      id: 'lua-scope-9',
      title: 'Write Scope Quiz',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write code where a for loop creates closures that each capture a different value of the loop variable.',
      skeleton: `-- Create an array of 3 functions that return 1, 2, 3 respectively`,
      solution: `local fns = {}
for i = 1, 3 do
  fns[i] = function() return i end
end
print(fns[1]()) -- 1
print(fns[2]()) -- 2
print(fns[3]()) -- 3`,
      hints: ['Each iteration of a for loop creates a new scope.', 'The closure captures each unique i value.', 'This works correctly in Lua (unlike some other languages).'],
      concepts: ['closures', 'loop-scope'],
    },
    {
      id: 'lua-scope-10',
      title: 'Write a Private Module',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a do..end block that creates a "module" with private state and public interface.',
      skeleton: `-- Create a Stack module with push, pop, and size`,
      solution: `local Stack = {}
do
  local data = {}
  function Stack.push(val)
    data[#data + 1] = val
  end
  function Stack.pop()
    return table.remove(data)
  end
  function Stack.size()
    return #data
  end
end

Stack.push(10)
Stack.push(20)
print(Stack.size()) -- 2
print(Stack.pop())  -- 20`,
      hints: ['Use do..end to hide the internal data table.', 'Attach public functions to an outer table.', 'Private variables are local inside the do block.'],
      concepts: ['encapsulation', 'module-pattern'],
    },
    {
      id: 'lua-scope-11',
      title: 'Write a Variable Lifetime Demo',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write code showing that a local variable in a loop is re-created each iteration.',
      skeleton: `-- Show that local in a loop resets each iteration`,
      solution: `for i = 1, 3 do
  local x = 0
  x = x + i
  print(x) -- prints 1, 2, 3 (not accumulating)
end`,
      hints: ['local inside a loop creates a fresh variable each time.', 'It does not persist between iterations.', 'x starts at 0 each loop.'],
      concepts: ['variable-lifetime', 'loop-scope'],
    },
    {
      id: 'lua-scope-12',
      title: 'Write Upvalue Mutation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write two functions that share an upvalue and demonstrate that changes by one are visible to the other.',
      skeleton: `-- Two functions sharing the same upvalue`,
      solution: `local shared = 0

local function add(n)
  shared = shared + n
end

local function get()
  return shared
end

add(10)
add(5)
print(get()) -- 15`,
      hints: ['Declare a local variable before both functions.', 'Both functions close over the same variable.', 'Mutations by one are visible to the other.'],
      concepts: ['upvalues', 'closures'],
    },
    {
      id: 'lua-scope-13',
      title: 'Fix Scope Leak Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the accidental global variable.',
      skeleton: `local function process()
  result = 42  -- oops
  return result
end
process()
print(result) -- should be nil (not leak to global)`,
      solution: `local function process()
  local result = 42
  return result
end
process()
print(result) -- nil`,
      hints: ['result without local creates a global.', 'Add local before result.', 'Always use local inside functions.'],
      concepts: ['global-leak'],
    },
    {
      id: 'lua-scope-14',
      title: 'Fix Closure Over Loop Variable',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the closures that all capture the same variable.',
      skeleton: `local fns = {}
local i = 1
while i <= 3 do
  fns[i] = function() return i end
  i = i + 1
end
print(fns[1]()) -- should print 1, not 4
print(fns[2]()) -- should print 2
print(fns[3]()) -- should print 3`,
      solution: `local fns = {}
local i = 1
while i <= 3 do
  local val = i
  fns[i] = function() return val end
  i = i + 1
end
print(fns[1]()) -- 1
print(fns[2]()) -- 2
print(fns[3]()) -- 3`,
      hints: ['All closures share the same i variable.', 'Create a local copy inside the loop.', 'Each closure captures its own copy.'],
      concepts: ['closures', 'loop-variable-capture'],
    },
    {
      id: 'lua-scope-15',
      title: 'Fix Block Scope Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the variable that is not accessible after the block.',
      skeleton: `do
  local data = {1, 2, 3}
end
print(#data) -- should print 3`,
      solution: `local data
do
  data = {1, 2, 3}
end
print(#data) -- prints 3`,
      hints: ['local data inside do..end is not visible outside.', 'Declare data before the block.', 'Assign inside the block without local.'],
      concepts: ['block-scope'],
    },
    {
      id: 'lua-scope-16',
      title: 'Predict Shadowing Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local x = 1
do
  local x = 2
  do
    local x = 3
    print(x)
  end
  print(x)
end
print(x)`,
      solution: `3
2
1`,
      hints: ['Each scope has its own x.', 'The innermost scope prints first.', 'Each x is independent.'],
      concepts: ['shadowing'],
    },
    {
      id: 'lua-scope-17',
      title: 'Predict Upvalue Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local x = 10
local function f()
  print(x)
end
x = 20
f()`,
      solution: `20`,
      hints: ['The function captures the variable, not its value.', 'x is changed to 20 before f is called.', 'f sees the current value of x.'],
      concepts: ['upvalues', 'closures'],
    },
    {
      id: 'lua-scope-18',
      title: 'Predict For Scope Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local x = "outside"
for x = 1, 2 do
  print(x)
end
print(x)`,
      solution: `1
2
outside`,
      hints: ['The for loop variable x shadows the outer x.', 'Inside the loop, x is 1 then 2.', 'After the loop, the outer x is restored.'],
      concepts: ['loop-scope', 'shadowing'],
    },
    {
      id: 'lua-scope-19',
      title: 'Refactor Globals to Locals',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Refactor global variables to proper local scope.',
      skeleton: `function calculate(a, b)
  result = a + b
  temp = result * 2
  return temp
end
print(calculate(3, 4))
-- result and temp should not leak`,
      solution: `local function calculate(a, b)
  local result = a + b
  local temp = result * 2
  return temp
end
print(calculate(3, 4))`,
      hints: ['Add local to the function declaration.', 'Add local to result and temp.', 'This prevents global pollution.'],
      concepts: ['local-variables', 'refactoring'],
    },
    {
      id: 'lua-scope-20',
      title: 'Refactor to Encapsulated Module',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor exposed internal variables into a do..end block.',
      skeleton: `local _data = {}
local _count = 0

local function add(item)
  _count = _count + 1
  _data[_count] = item
end

local function getAll()
  return _data
end

local function count()
  return _count
end

add("a"); add("b")
print(count())
-- _data and _count are still accessible outside`,
      solution: `local mod = {}
do
  local data = {}
  local n = 0
  function mod.add(item)
    n = n + 1
    data[n] = item
  end
  function mod.getAll()
    return data
  end
  function mod.count()
    return n
  end
end

mod.add("a"); mod.add("b")
print(mod.count())`,
      hints: ['Wrap internal state in a do..end block.', 'Expose functions through a table.', 'Internal variables become truly private.'],
      concepts: ['encapsulation', 'module-pattern', 'refactoring'],
    },
  ],
};
