import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-flow',
  title: '07. Control Flow',
  explanation: `## Control Flow in Lua

Lua provides several control flow structures.

### If / Elseif / Else
\`\`\`lua
if x > 0 then
  print("positive")
elseif x < 0 then
  print("negative")
else
  print("zero")
end
\`\`\`

### While Loop
\`\`\`lua
local i = 1
while i <= 5 do
  print(i)
  i = i + 1
end
\`\`\`

### Repeat..Until (do-while equivalent)
\`\`\`lua
local i = 1
repeat
  print(i)
  i = i + 1
until i > 5
\`\`\`

### Numeric For
\`\`\`lua
for i = 1, 10 do print(i) end        -- 1 to 10
for i = 1, 10, 2 do print(i) end     -- 1,3,5,7,9
for i = 10, 1, -1 do print(i) end    -- countdown
\`\`\`

### Generic For
\`\`\`lua
for i, v in ipairs(arr) do print(i, v) end
for k, v in pairs(tbl) do print(k, v) end
\`\`\`

### Break
\`\`\`lua
for i = 1, 100 do
  if i > 5 then break end
  print(i)
end
\`\`\`

**Note:** Lua has no \`continue\` statement. Use \`goto\` in 5.2+ as a workaround.`,
  exercises: [
    {
      id: 'lua-flow-1',
      title: 'Basic If Statement',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Complete the if statement to check if x is positive.',
      skeleton: `local x = 10
___ x > 0 ___
  print("positive")
___`,
      solution: `local x = 10
if x > 0 then
  print("positive")
end`,
      hints: ['if statements use "if ... then ... end".', 'The condition goes between if and then.', 'Fill in if, then, and end.'],
      concepts: ['if-statement'],
    },
    {
      id: 'lua-flow-2',
      title: 'Elseif Branch',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Add an elseif branch for negative numbers.',
      skeleton: `local x = -5
if x > 0 then
  print("positive")
___ x < 0 then
  print("negative")
else
  print("zero")
end`,
      solution: `local x = -5
if x > 0 then
  print("positive")
elseif x < 0 then
  print("negative")
else
  print("zero")
end`,
      hints: ['Lua uses elseif (one word) for additional conditions.', 'elseif x < 0 then checks negative.', 'Replace the blank with elseif.'],
      concepts: ['elseif'],
    },
    {
      id: 'lua-flow-3',
      title: 'Numeric For Loop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a for loop that counts from 1 to 5.',
      skeleton: `___ i = 1, ___ do
  print(i)
end`,
      solution: `for i = 1, 5 do
  print(i)
end`,
      hints: ['Numeric for uses: for var = start, stop do.', 'Count from 1 to 5.', 'Fill in "for" and "5".'],
      concepts: ['numeric-for'],
    },
    {
      id: 'lua-flow-4',
      title: 'For Loop with Step',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Count from 0 to 10 by 2s.',
      skeleton: `for i = 0, 10, ___ do
  print(i)
end`,
      solution: `for i = 0, 10, 2 do
  print(i)
end`,
      hints: ['The third value in a for loop is the step.', 'Step of 2 skips every other number.', 'Replace the blank with 2.'],
      concepts: ['numeric-for', 'step'],
    },
    {
      id: 'lua-flow-5',
      title: 'While Loop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Complete the while loop condition.',
      skeleton: `local count = 0
___ count < 3 ___
  print(count)
  count = count + 1
end`,
      solution: `local count = 0
while count < 3 do
  print(count)
  count = count + 1
end`,
      hints: ['while loops use "while condition do ... end".', 'Fill in while and do.', 'The loop continues while count < 3.'],
      concepts: ['while-loop'],
    },
    {
      id: 'lua-flow-6',
      title: 'Repeat Until',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Complete the repeat..until loop.',
      skeleton: `local n = 1
___
  print(n)
  n = n + 1
___ n > 5`,
      solution: `local n = 1
repeat
  print(n)
  n = n + 1
until n > 5`,
      hints: ['repeat..until loops run at least once.', 'The condition is checked after each iteration.', 'Fill in repeat and until.'],
      concepts: ['repeat-until'],
    },
    {
      id: 'lua-flow-7',
      title: 'Write a FizzBuzz',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write FizzBuzz for numbers 1-20: print "Fizz" for multiples of 3, "Buzz" for 5, "FizzBuzz" for both, otherwise the number.',
      skeleton: `-- Write FizzBuzz for 1 to 20`,
      solution: `for i = 1, 20 do
  if i % 15 == 0 then
    print("FizzBuzz")
  elseif i % 3 == 0 then
    print("Fizz")
  elseif i % 5 == 0 then
    print("Buzz")
  else
    print(i)
  end
end`,
      hints: ['Check divisible by 15 first (both 3 and 5).', 'Use the modulo operator %.', 'Use if/elseif/else for the conditions.'],
      concepts: ['control-flow', 'modulo'],
    },
    {
      id: 'lua-flow-8',
      title: 'Write a Countdown',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a for loop that counts down from 10 to 1, then prints "Go!".',
      skeleton: `-- Count down from 10 to 1, then print "Go!"`,
      solution: `for i = 10, 1, -1 do
  print(i)
end
print("Go!")`,
      hints: ['Use a negative step: for i = 10, 1, -1.', 'The loop decrements by 1 each time.', 'Print "Go!" after the loop.'],
      concepts: ['numeric-for', 'countdown'],
    },
    {
      id: 'lua-flow-9',
      title: 'Write a Sum Until Limit',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write code that adds numbers 1, 2, 3, ... until the sum exceeds 100, then prints the sum and how many numbers were added.',
      skeleton: `-- Sum 1+2+3+... until sum > 100`,
      solution: `local sum = 0
local count = 0
repeat
  count = count + 1
  sum = sum + count
until sum > 100
print(sum, count)`,
      hints: ['Use a repeat..until loop.', 'Add the next number each iteration.', 'Stop when sum exceeds 100.'],
      concepts: ['repeat-until', 'accumulator'],
    },
    {
      id: 'lua-flow-10',
      title: 'Write a Number Classifier',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function classify(n) that returns "small" (1-10), "medium" (11-100), "large" (101+), or "invalid" (0 or negative).',
      skeleton: `-- Write function classify(n)`,
      solution: `local function classify(n)
  if n <= 0 then
    return "invalid"
  elseif n <= 10 then
    return "small"
  elseif n <= 100 then
    return "medium"
  else
    return "large"
  end
end

print(classify(5))   -- small
print(classify(50))  -- medium
print(classify(500)) -- large`,
      hints: ['Use if/elseif/else for ranges.', 'Check conditions from smallest to largest.', 'Return the appropriate string.'],
      concepts: ['if-elseif', 'functions'],
    },
    {
      id: 'lua-flow-11',
      title: 'Write a Break Search',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write code that finds the first multiple of 7 greater than 50 using a while loop and break.',
      skeleton: `-- Find first multiple of 7 > 50`,
      solution: `local i = 51
while true do
  if i % 7 == 0 then
    print(i)
    break
  end
  i = i + 1
end`,
      hints: ['Start from 51 and increment.', 'Check if i % 7 == 0.', 'Break when found.'],
      concepts: ['while-loop', 'break'],
    },
    {
      id: 'lua-flow-12',
      title: 'Write Nested Loop Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write nested for loops to print a multiplication table from 1x1 to 5x5.',
      skeleton: `-- Print multiplication table 1-5`,
      solution: `for i = 1, 5 do
  local row = ""
  for j = 1, 5 do
    row = row .. string.format("%4d", i * j)
  end
  print(row)
end`,
      hints: ['Use two nested for loops.', 'Outer loop for rows, inner for columns.', 'Use string.format for alignment.'],
      concepts: ['nested-loops', 'numeric-for'],
    },
    {
      id: 'lua-flow-13',
      title: 'Fix Missing End Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the missing end keyword.',
      skeleton: `local x = 10
if x > 5 then
  print("big")
else
  print("small")`,
      solution: `local x = 10
if x > 5 then
  print("big")
else
  print("small")
end`,
      hints: ['Every if block needs a closing end.', 'Add end after the else block.', 'if...then...else...end is the full structure.'],
      concepts: ['if-statement', 'syntax'],
    },
    {
      id: 'lua-flow-14',
      title: 'Fix Infinite Loop Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the infinite while loop.',
      skeleton: `local i = 1
while i <= 5 do
  print(i)
end`,
      solution: `local i = 1
while i <= 5 do
  print(i)
  i = i + 1
end`,
      hints: ['The loop never terminates because i never changes.', 'Increment i inside the loop.', 'Add i = i + 1 before end.'],
      concepts: ['while-loop', 'infinite-loop'],
    },
    {
      id: 'lua-flow-15',
      title: 'Fix Off-By-One Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the loop to print 1 through 5 (currently prints 1 through 4).',
      skeleton: `for i = 1, 5 - 1 do
  print(i)
end
-- should print 1, 2, 3, 4, 5`,
      solution: `for i = 1, 5 do
  print(i)
end
-- should print 1, 2, 3, 4, 5`,
      hints: ['The upper bound is inclusive in Lua for loops.', 'for i = 1, 5 goes from 1 to 5.', 'Remove the "- 1".'],
      concepts: ['numeric-for', 'off-by-one'],
    },
    {
      id: 'lua-flow-16',
      title: 'Predict For Loop Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `for i = 1, 3 do
  for j = 1, 2 do
    print(i, j)
  end
end`,
      solution: `1\t1
1\t2
2\t1
2\t2
3\t1
3\t2`,
      hints: ['Outer loop runs 3 times, inner runs 2 times each.', 'Total of 6 lines of output.', 'Inner loop completes fully before outer increments.'],
      concepts: ['nested-loops'],
    },
    {
      id: 'lua-flow-17',
      title: 'Predict Break Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `for i = 1, 10 do
  if i == 4 then break end
  print(i)
end`,
      solution: `1
2
3`,
      hints: ['break exits the loop immediately.', 'When i is 4, break runs before print.', 'Only 1, 2, 3 are printed.'],
      concepts: ['break'],
    },
    {
      id: 'lua-flow-18',
      title: 'Predict Repeat Until Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local x = 10
repeat
  print(x)
  x = x - 3
until x <= 0`,
      solution: `10
7
4
1`,
      hints: ['repeat runs at least once.', 'x starts at 10, decreases by 3 each time.', '10, 7, 4, 1 -- then x becomes -2 and loop stops.'],
      concepts: ['repeat-until'],
    },
    {
      id: 'lua-flow-19',
      title: 'Refactor Nested Ifs to Elseif',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Refactor nested if statements into a flat if/elseif chain.',
      skeleton: `local grade = 85
if grade >= 90 then
  print("A")
else
  if grade >= 80 then
    print("B")
  else
    if grade >= 70 then
      print("C")
    else
      print("F")
    end
  end
end`,
      solution: `local grade = 85
if grade >= 90 then
  print("A")
elseif grade >= 80 then
  print("B")
elseif grade >= 70 then
  print("C")
else
  print("F")
end`,
      hints: ['Use elseif instead of else + nested if.', 'Flatten the structure.', 'Only one end is needed.'],
      concepts: ['refactoring', 'elseif'],
    },
    {
      id: 'lua-flow-20',
      title: 'Refactor While to For',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Refactor the while loop into a numeric for loop.',
      skeleton: `local sum = 0
local i = 1
while i <= 10 do
  sum = sum + i
  i = i + 1
end
print(sum)`,
      solution: `local sum = 0
for i = 1, 10 do
  sum = sum + i
end
print(sum)`,
      hints: ['A counting while loop can be a for loop.', 'for i = 1, 10 replaces the manual counter.', 'The for loop handles incrementing.'],
      concepts: ['refactoring', 'numeric-for'],
    },
  ],
};
