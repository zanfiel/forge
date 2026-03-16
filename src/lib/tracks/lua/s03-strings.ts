import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-str',
  title: '03. Strings',
  explanation: `## Strings in Lua

Strings in Lua are immutable sequences of bytes. They can be delimited by single quotes, double quotes, or long brackets.

### String Literals
\`\`\`lua
local s1 = "hello"
local s2 = 'world'
local s3 = [[
  multi-line
  long string
]]
\`\`\`

### Concatenation
Use the \`.. \` operator to join strings:
\`\`\`lua
local greeting = "Hello" .. " " .. "World"
\`\`\`

### String Library
\`\`\`lua
string.len("hello")          -- 5
string.upper("hello")        -- "HELLO"
string.lower("HELLO")        -- "hello"
string.rep("ab", 3)          -- "ababab"
string.sub("hello", 2, 4)    -- "ell"
string.reverse("hello")      -- "olleh"
string.format("x=%d", 10)    -- "x=10"
string.gsub("hello", "l", "L") -- "heLLo"
\`\`\`

### The # Length Operator
\`\`\`lua
print(#"hello")  -- 5
\`\`\``,
  exercises: [
    {
      id: 'lua-str-1',
      title: 'Concatenate Strings',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Concatenate "Hello" and "World" with a space between them.',
      skeleton: `local greeting = "Hello" ___ " " ___ "World"
print(greeting)`,
      solution: `local greeting = "Hello" .. " " .. "World"
print(greeting)`,
      hints: ['Lua uses .. for string concatenation.', 'Place .. between each string.', '"Hello" .. " " .. "World"'],
      concepts: ['string-concatenation'],
    },
    {
      id: 'lua-str-2',
      title: 'String Length',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Get the length of the string "Lua" using the # operator.',
      skeleton: `local len = ___"Lua"
print(len) -- should print 3`,
      solution: `local len = #"Lua"
print(len) -- should print 3`,
      hints: ['The # operator returns string length.', 'Place # before the string.', '#"Lua" returns 3.'],
      concepts: ['string-length'],
    },
    {
      id: 'lua-str-3',
      title: 'String Upper',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Convert "hello" to uppercase using string.upper.',
      skeleton: `local result = string.___(  "hello")
print(result) -- should print "HELLO"`,
      solution: `local result = string.upper("hello")
print(result) -- should print "HELLO"`,
      hints: ['The string library has an upper function.', 'string.upper() converts to uppercase.', 'Fill in "upper".'],
      concepts: ['string-library'],
    },
    {
      id: 'lua-str-4',
      title: 'String Substring',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Extract "ell" from "hello" using string.sub.',
      skeleton: `local result = string.sub("hello", ___, ___)
print(result) -- should print "ell"`,
      solution: `local result = string.sub("hello", 2, 4)
print(result) -- should print "ell"`,
      hints: ['string.sub takes a start and end index.', 'Lua strings are 1-indexed.', '"ell" starts at index 2 and ends at index 4.'],
      concepts: ['string-sub'],
    },
    {
      id: 'lua-str-5',
      title: 'String Format',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Use string.format to create "Score: 100".',
      skeleton: `local result = string.format("Score: ___", 100)
print(result)`,
      solution: `local result = string.format("Score: %d", 100)
print(result)`,
      hints: ['%d is the format specifier for integers.', 'string.format works like C printf.', 'Replace the blank with %d.'],
      concepts: ['string-format'],
    },
    {
      id: 'lua-str-6',
      title: 'Long String',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Create a multi-line string using long brackets.',
      skeleton: `local text = ___
Line one
Line two
___
print(text)`,
      solution: `local text = [[
Line one
Line two
]]
print(text)`,
      hints: ['Long strings use [[ to open and ]] to close.', 'No escape sequences are processed inside.', 'Replace blanks with [[ and ]].'],
      concepts: ['long-strings'],
    },
    {
      id: 'lua-str-7',
      title: 'Write String Repeat',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write code that prints "ha" repeated 3 times using string.rep.',
      skeleton: `-- Print "hahaha" using string.rep`,
      solution: `print(string.rep("ha", 3))`,
      hints: ['string.rep(s, n) repeats s n times.', 'string.rep("ha", 3) produces "hahaha".', 'Wrap it in print().'],
      concepts: ['string-rep'],
    },
    {
      id: 'lua-str-8',
      title: 'Write a Greeting Formatter',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a function greet(name) that returns "Hello, NAME!" where NAME is uppercase.',
      skeleton: `-- Write function greet(name)`,
      solution: `local function greet(name)
  return "Hello, " .. string.upper(name) .. "!"
end

print(greet("alice"))`,
      hints: ['Use string.upper to convert name.', 'Concatenate with .. operator.', 'Return the formatted string.'],
      concepts: ['string-upper', 'string-concatenation', 'functions'],
    },
    {
      id: 'lua-str-9',
      title: 'Write String Reverse Checker',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function isPalindrome(s) that returns true if s reads the same forwards and backwards.',
      skeleton: `-- Write function isPalindrome(s)`,
      solution: `local function isPalindrome(s)
  return s == string.reverse(s)
end

print(isPalindrome("racecar")) -- true
print(isPalindrome("hello"))   -- false`,
      hints: ['Use string.reverse to get the reversed string.', 'Compare the original with the reversed version.', 'Return the boolean comparison result.'],
      concepts: ['string-reverse', 'string-comparison'],
    },
    {
      id: 'lua-str-10',
      title: 'Write a gsub Censor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function censor(text, word) that replaces all occurrences of word with "***".',
      skeleton: `-- Write function censor(text, word)`,
      solution: `local function censor(text, word)
  return string.gsub(text, word, "***")
end

print(censor("the bad word is bad", "bad"))`,
      hints: ['string.gsub replaces pattern matches.', 'gsub(text, pattern, replacement) does global substitution.', 'Use "***" as the replacement string.'],
      concepts: ['string-gsub'],
    },
    {
      id: 'lua-str-11',
      title: 'Write a Padded Number Formatter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function padNum(n) that returns the number zero-padded to 5 digits, e.g., padNum(42) returns "00042".',
      skeleton: `-- Write function padNum(n)`,
      solution: `local function padNum(n)
  return string.format("%05d", n)
end

print(padNum(42))   -- "00042"
print(padNum(1234)) -- "01234"`,
      hints: ['string.format can zero-pad numbers.', 'Use %05d for 5-digit zero-padded integer.', '0 means pad with zeros, 5 is the width.'],
      concepts: ['string-format'],
    },
    {
      id: 'lua-str-12',
      title: 'Write a Word Counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function countWords(s) that counts words (space-separated) in a string.',
      skeleton: `-- Write function countWords(s)`,
      solution: `local function countWords(s)
  local count = 0
  for word in string.gmatch(s, "%S+") do
    count = count + 1
  end
  return count
end

print(countWords("hello world foo")) -- 3`,
      hints: ['Use string.gmatch to iterate over matches.', '%S+ matches one or more non-space characters.', 'Count each match in a loop.'],
      concepts: ['string-gmatch', 'patterns'],
    },
    {
      id: 'lua-str-13',
      title: 'Fix Concatenation Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the string concatenation operator.',
      skeleton: `local name = "World"
local greeting = "Hello, " + name + "!"
print(greeting)`,
      solution: `local name = "World"
local greeting = "Hello, " .. name .. "!"
print(greeting)`,
      hints: ['Lua uses .. for concatenation, not +.', '+ is only for arithmetic.', 'Replace + with .. throughout.'],
      concepts: ['string-concatenation'],
    },
    {
      id: 'lua-str-14',
      title: 'Fix String Index Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Fix the code to get the first character of the string.',
      skeleton: `local s = "hello"
local first = s[1]
print(first) -- should print "h"`,
      solution: `local s = "hello"
local first = string.sub(s, 1, 1)
print(first) -- should print "h"`,
      hints: ['Strings in Lua cannot be indexed with [].', 'Use string.sub(s, 1, 1) to get the first character.', 'string.sub extracts a substring.'],
      concepts: ['string-sub', 'string-indexing'],
    },
    {
      id: 'lua-str-15',
      title: 'Fix gsub Return Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the code that does not capture the gsub result properly.',
      skeleton: `local text = "hello world"
string.gsub(text, "world", "Lua")
print(text) -- should print "hello Lua"`,
      solution: `local text = "hello world"
text = string.gsub(text, "world", "Lua")
print(text) -- should print "hello Lua"`,
      hints: ['Strings are immutable in Lua.', 'gsub returns a new string.', 'Assign the result back to text.'],
      concepts: ['string-immutability', 'string-gsub'],
    },
    {
      id: 'lua-str-16',
      title: 'Predict Concatenation Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `print(10 .. 20)`,
      solution: `1020`,
      hints: ['.. converts numbers to strings for concatenation.', '10 becomes "10" and 20 becomes "20".', 'They are joined into "1020".'],
      concepts: ['string-concatenation', 'type-coercion'],
    },
    {
      id: 'lua-str-17',
      title: 'Predict String Length',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `print(#"" .. "abc")`,
      solution: `0abc`,
      hints: ['# has higher precedence than .. in Lua.', '#"" is 0, then 0 .. "abc" produces "0abc".', 'The result is the string "0abc".'],
      concepts: ['string-length', 'operator-precedence'],
    },
    {
      id: 'lua-str-18',
      title: 'Predict gsub Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local result, count = string.gsub("banana", "a", "o")
print(result, count)`,
      solution: `bonono\t3`,
      hints: ['gsub replaces all occurrences by default.', 'It returns the new string and the count of replacements.', '"banana" has 3 "a" characters.'],
      concepts: ['string-gsub'],
    },
    {
      id: 'lua-str-19',
      title: 'Refactor Concatenation to Format',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor the concatenation chain to use string.format.',
      skeleton: `local name = "Alice"
local age = 30
local msg = "Name: " .. name .. ", Age: " .. age
print(msg)`,
      solution: `local name = "Alice"
local age = 30
local msg = string.format("Name: %s, Age: %d", name, age)
print(msg)`,
      hints: ['string.format is cleaner for complex strings.', '%s for strings, %d for integers.', 'Put placeholders in the format string.'],
      concepts: ['string-format', 'refactoring'],
    },
    {
      id: 'lua-str-20',
      title: 'Refactor Repeated Substring',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor the manual character extraction into a loop.',
      skeleton: `local s = "hello"
local c1 = string.sub(s, 1, 1)
local c2 = string.sub(s, 2, 2)
local c3 = string.sub(s, 3, 3)
local c4 = string.sub(s, 4, 4)
local c5 = string.sub(s, 5, 5)
print(c1, c2, c3, c4, c5)`,
      solution: `local s = "hello"
local chars = {}
for i = 1, #s do
  chars[i] = string.sub(s, i, i)
end
print(table.unpack(chars))`,
      hints: ['Use a for loop from 1 to #s.', 'Collect characters into a table.', 'Use table.unpack to pass them all to print.'],
      concepts: ['string-sub', 'refactoring', 'loops'],
    },
  ],
};
