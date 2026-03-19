import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-var',
  title: '01. Variables',
  explanation: `## Variables in Lua

Lua has two kinds of variables: **local** and **global**. By default, variables are global unless declared with the \`local\` keyword.

### Local Variables
\`\`\`lua
local x = 10
local name = "Alice"
\`\`\`

### Global Variables
\`\`\`lua
y = 20  -- global (no local keyword)
\`\`\`

### Multiple Assignment
Lua supports assigning multiple variables at once:
\`\`\`lua
local a, b, c = 1, 2, 3
local x, y = 10, 20
\`\`\`

Extra values on the right are discarded; extra variables on the left get \`nil\`.

### Swapping
\`\`\`lua
a, b = b, a  -- swap values
\`\`\`

Always prefer \`local\` variables. They are faster and avoid polluting the global namespace.`,
  exercises: [
    {
      id: 'lua-var-1',
      title: 'Declare a Local Variable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Declare a local variable named x with value 42.',
      skeleton: `___ x = 42
print(x)`,
      solution: `local x = 42
print(x)`,
      hints: ['Use the local keyword to declare a local variable.', 'The syntax is: local name = value', 'Replace the blank with "local".'],
      concepts: ['local-variables'],
    },
    {
      id: 'lua-var-2',
      title: 'Multiple Assignment',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Assign 10 to a and 20 to b using multiple assignment.',
      skeleton: `local a, b = ___, ___
print(a, b)`,
      solution: `local a, b = 10, 20
print(a, b)`,
      hints: ['Multiple assignment separates values with commas.', 'The first value goes to the first variable.', 'Put 10 and 20 in the blanks.'],
      concepts: ['multiple-assignment'],
    },
    {
      id: 'lua-var-3',
      title: 'Swap Two Variables',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Swap the values of a and b using multiple assignment.',
      skeleton: `local a, b = 1, 2
a, b = ___, ___
print(a, b) -- should print 2  1`,
      solution: `local a, b = 1, 2
a, b = b, a
print(a, b) -- should print 2  1`,
      hints: ['Lua evaluates the right side before assigning.', 'You can swap with: a, b = b, a', 'No temporary variable needed.'],
      concepts: ['multiple-assignment', 'swap'],
    },
    {
      id: 'lua-var-4',
      title: 'Reassign a Variable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Reassign the variable count to be count + 1.',
      skeleton: `local count = 0
count = ___
print(count) -- should print 1`,
      solution: `local count = 0
count = count + 1
print(count) -- should print 1`,
      hints: ['Add 1 to the current value of count.', 'Use count + 1 on the right side.', 'Lua does not have ++ or += operators.'],
      concepts: ['reassignment'],
    },
    {
      id: 'lua-var-5',
      title: 'Uninitialized Variable Value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Declare a local variable with no value and print its default.',
      skeleton: `local result
print(___) -- should print nil`,
      solution: `local result
print(result) -- should print nil`,
      hints: ['An uninitialized local variable has the value nil.', 'Print the variable name directly.', 'The answer is just the variable name: result.'],
      concepts: ['nil', 'local-variables'],
    },
    {
      id: 'lua-var-6',
      title: 'Multiple Return Discard',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Assign only two variables from three values; the third is discarded.',
      skeleton: `local x, y = 10, 20, ___
print(x, y) -- should print 10  20`,
      solution: `local x, y = 10, 20, 30
print(x, y) -- should print 10  20`,
      hints: ['Extra values on the right side are discarded.', 'Only x and y receive values.', 'Any number works for the third value since it is discarded.'],
      concepts: ['multiple-assignment'],
    },
    {
      id: 'lua-var-7',
      title: 'Write a Variable Counter',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write code that declares a local variable sum, adds 10, 20, and 30 to it, then prints the result.',
      skeleton: `-- Declare sum as 0, add 10, 20, and 30, then print sum`,
      solution: `local sum = 0
sum = sum + 10
sum = sum + 20
sum = sum + 30
print(sum)`,
      hints: ['Start with local sum = 0.', 'Add each value: sum = sum + value.', 'The final result should be 60.'],
      concepts: ['local-variables', 'reassignment'],
    },
    {
      id: 'lua-var-8',
      title: 'Write Multiple Assignment Unpacking',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Declare three local variables first, second, third with values "a", "b", "c" in one line, then print them.',
      skeleton: `-- Declare first, second, third as "a", "b", "c" in one statement`,
      solution: `local first, second, third = "a", "b", "c"
print(first, second, third)`,
      hints: ['Use comma-separated names on the left side.', 'Use comma-separated values on the right side.', 'local first, second, third = "a", "b", "c"'],
      concepts: ['multiple-assignment'],
    },
    {
      id: 'lua-var-9',
      title: 'Write a Triple Swap',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Given a=1, b=2, c=3, rotate them so a=2, b=3, c=1 using one multiple assignment.',
      skeleton: `local a, b, c = 1, 2, 3
-- Rotate: a gets b's value, b gets c's, c gets a's
`,
      solution: `local a, b, c = 1, 2, 3
a, b, c = b, c, a
print(a, b, c)`,
      hints: ['Use a single multiple assignment statement.', 'a, b, c = b, c, a rotates the values.', 'Lua evaluates all right-side values before assignment.'],
      concepts: ['multiple-assignment', 'swap'],
    },
    {
      id: 'lua-var-10',
      title: 'Write Variable Shadowing',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Demonstrate variable shadowing by declaring an outer x=10, then a do..end block with local x=20 printed inside, and print x again outside.',
      skeleton: `-- Show that an inner local x does not affect outer x`,
      solution: `local x = 10
do
  local x = 20
  print(x) -- prints 20
end
print(x) -- prints 10`,
      hints: ['Use a do..end block to create a new scope.', 'Declare a new local x inside the block.', 'The outer x remains unchanged after the block.'],
      concepts: ['local-variables', 'scope', 'shadowing'],
    },
    {
      id: 'lua-var-11',
      title: 'Write Nil Assignment',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Declare a local variable data with value "hello", then set it to nil and print it.',
      skeleton: `-- Declare data, then set to nil`,
      solution: `local data = "hello"
data = nil
print(data)`,
      hints: ['Assign nil to clear a variable.', 'data = nil makes data nil.', 'print(data) will output nil.'],
      concepts: ['nil', 'reassignment'],
    },
    {
      id: 'lua-var-12',
      title: 'Global vs Local Naming',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Create a global variable gVar=100 and a local variable lVar=200, then print both.',
      skeleton: `-- Create global gVar and local lVar`,
      solution: `gVar = 100
local lVar = 200
print(gVar, lVar)`,
      hints: ['Global variables have no keyword prefix.', 'Local variables use the local keyword.', 'gVar = 100 is global; local lVar = 200 is local.'],
      concepts: ['global-variables', 'local-variables'],
    },
    {
      id: 'lua-var-13',
      title: 'Fix the Scope Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the code so that result is accessible outside the if block.',
      skeleton: `local x = 10
if x > 5 then
  local result = x * 2
end
print(result) -- should print 20`,
      solution: `local x = 10
local result
if x > 5 then
  result = x * 2
end
print(result) -- should print 20`,
      hints: ['Local variables declared inside blocks are not visible outside.', 'Declare result before the if block.', 'Only assign to result inside the block.'],
      concepts: ['scope', 'local-variables'],
    },
    {
      id: 'lua-var-14',
      title: 'Fix the Missing Local',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the code to use local variables instead of globals.',
      skeleton: `name = "Alice"
age = 30
print(name, age)`,
      solution: `local name = "Alice"
local age = 30
print(name, age)`,
      hints: ['Add the local keyword before each variable.', 'Global variables pollute the namespace.', 'local name = "Alice" makes it local.'],
      concepts: ['local-variables', 'global-variables'],
    },
    {
      id: 'lua-var-15',
      title: 'Fix Extra Values Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the code so all three values are captured.',
      skeleton: `local a, b = 10, 20, 30
print(a, b) -- should print all three values`,
      solution: `local a, b, c = 10, 20, 30
print(a, b, c) -- should print all three values`,
      hints: ['You need three variables for three values.', 'Add a third variable c.', 'local a, b, c = 10, 20, 30'],
      concepts: ['multiple-assignment'],
    },
    {
      id: 'lua-var-16',
      title: 'Predict Nil Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output of this code.',
      skeleton: `local a, b, c = 1, 2
print(a, b, c)`,
      solution: `1\t2\tnil`,
      hints: ['c has no corresponding value.', 'Unmatched variables receive nil.', 'print separates values with tabs.'],
      concepts: ['multiple-assignment', 'nil'],
    },
    {
      id: 'lua-var-17',
      title: 'Predict Reassignment Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output of this code.',
      skeleton: `local x = 5
local x = 10
print(x)`,
      solution: `10`,
      hints: ['The second local x shadows the first.', 'The most recent declaration wins.', 'x is 10.'],
      concepts: ['shadowing', 'local-variables'],
    },
    {
      id: 'lua-var-18',
      title: 'Predict Swap Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output of this code.',
      skeleton: `local a, b = 5, 10
a, b = b, a + b
print(a, b)`,
      solution: `10\t15`,
      hints: ['Right side is evaluated first: b=10, a+b=15.', 'Then a gets 10, b gets 15.', 'print outputs 10 and 15.'],
      concepts: ['multiple-assignment'],
    },
    {
      id: 'lua-var-19',
      title: 'Refactor Global to Local',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Refactor all global variables to local variables.',
      skeleton: `width = 10
height = 20
area = width * height
print(area)`,
      solution: `local width = 10
local height = 20
local area = width * height
print(area)`,
      hints: ['Add local before each variable declaration.', 'Local variables are faster and safer.', 'Change all three assignments.'],
      concepts: ['local-variables', 'refactoring'],
    },
    {
      id: 'lua-var-20',
      title: 'Refactor Repeated Assignment',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Refactor three separate assignments into one multiple assignment.',
      skeleton: `local x = 1
local y = 2
local z = 3
print(x, y, z)`,
      solution: `local x, y, z = 1, 2, 3
print(x, y, z)`,
      hints: ['Multiple variables can be declared on one line.', 'Use commas to separate names and values.', 'local x, y, z = 1, 2, 3'],
      concepts: ['multiple-assignment', 'refactoring'],
    },
  ],
};
