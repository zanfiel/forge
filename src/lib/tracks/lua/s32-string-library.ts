import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-strlib',
  title: '32. String Library',
  explanation: `## String Library in Lua

The \`string\` library provides powerful string manipulation functions:

\`\`\`lua
-- Byte/character conversion
string.byte("A")          -- 65
string.byte("ABC", 1, 3)  -- 65, 66, 67
string.char(65, 66, 67)   -- "ABC"

-- Formatting
string.format("%d + %d = %d", 1, 2, 3)  -- "1 + 2 = 3"
string.format("%05.2f", 3.14)           -- "03.14"
string.format("%q", 'say "hi"')         -- '"say \\"hi\\""'

-- Repetition and reversal
string.rep("ab", 3)       -- "ababab"
string.rep("ab", 3, "-")  -- "ab-ab-ab"
string.reverse("hello")   -- "olleh"

-- Substrings
string.sub("hello", 2, 4)  -- "ell"
string.sub("hello", -3)    -- "llo"

-- Case conversion
string.upper("hello")  -- "HELLO"
string.lower("HELLO")  -- "hello"

-- Length
string.len("hello")   -- 5 (bytes, not characters)
#"hello"               -- 5

-- UTF-8 support (Lua 5.3+)
utf8.len("cafe\\u{0301}")   -- character count
utf8.offset("hello", 3)    -- byte offset of 3rd character
\`\`\``,
  exercises: [
    {
      id: 'lua-strlib-1',
      title: 'String Byte Conversion',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Convert a character to its byte value using string.byte.',
      skeleton: `local b = string.___(  "A")
print(b)  -- 65`,
      solution: `local b = string.byte("A")
print(b)  -- 65`,
      hints: [
        'string.byte converts a character to its numeric byte value.',
        '"A" has ASCII value 65.',
        'string.byte can take optional start and end positions.',
      ],
      concepts: ['string-library', 'byte'],
    },
    {
      id: 'lua-strlib-2',
      title: 'Character from Byte',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Convert byte values back to characters using string.char.',
      skeleton: `local s = string.___(72, 101, 108, 108, 111)
print(s)  -- "Hello"`,
      solution: `local s = string.char(72, 101, 108, 108, 111)
print(s)  -- "Hello"`,
      hints: [
        'string.char takes one or more byte values and returns a string.',
        '72=H, 101=e, 108=l, 111=o.',
        'It is the inverse of string.byte.',
      ],
      concepts: ['string-library', 'char'],
    },
    {
      id: 'lua-strlib-3',
      title: 'String Format',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Use string.format to create a formatted string.',
      skeleton: `local msg = string.format("Hello, %s! You are %d years old.", "Lua", 30)
print(msg)
local pi = string.___("%%.2f = %.2f", math.pi)
print(pi)  -- "%.2f = 3.14"`,
      solution: `local msg = string.format("Hello, %s! You are %d years old.", "Lua", 30)
print(msg)
local pi = string.format("%%.2f = %.2f", math.pi)
print(pi)  -- "%.2f = 3.14"`,
      hints: [
        'string.format works like C printf.',
        '%s for strings, %d for integers, %.2f for 2 decimal floats.',
        '%% is a literal percent sign in the format string.',
      ],
      concepts: ['string-library', 'format'],
    },
    {
      id: 'lua-strlib-4',
      title: 'Repeat String',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Use string.rep to repeat a string with a separator.',
      skeleton: `local dashes = string.rep("-", 10)
print(#dashes)  -- 10
local csv = string.rep("?", 3, ",")
print(csv)  -- "___"`,
      solution: `local dashes = string.rep("-", 10)
print(#dashes)  -- 10
local csv = string.rep("?", 3, ",")
print(csv)  -- "?,?,?"`,
      hints: [
        'string.rep(s, n) repeats s n times.',
        'string.rep(s, n, sep) inserts sep between repetitions.',
        '3 repetitions of "?" with "," gives "?,?,?".',
      ],
      concepts: ['string-library', 'rep'],
    },
    {
      id: 'lua-strlib-5',
      title: 'Predict Substring',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the result of string.sub with various indices.',
      skeleton: `local s = "Hello, World!"
print(string.sub(s, 1, 5))
print(string.sub(s, -6))
print(string.sub(s, 8, 12))`,
      solution: `Hello
orld!
World`,
      hints: [
        'string.sub(s, i, j) extracts characters from position i to j.',
        'Negative indices count from the end: -1 is the last character.',
        'string.sub(s, -6) gets the last 6 characters.',
      ],
      concepts: ['string-library', 'sub'],
    },
    {
      id: 'lua-strlib-6',
      title: 'Reverse String',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Reverse a string using string.reverse.',
      skeleton: `local s = "Lua"
local r = string.___(s)
print(r)  -- "auL"`,
      solution: `local s = "Lua"
local r = string.reverse(s)
print(r)  -- "auL"`,
      hints: [
        'string.reverse returns a new string with characters in reverse order.',
        'The original string is not modified.',
        'This works on bytes, not UTF-8 characters.',
      ],
      concepts: ['string-library', 'reverse'],
    },
    {
      id: 'lua-strlib-7',
      title: 'Write Palindrome Checker',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that checks if a string is a palindrome using string library functions.',
      skeleton: `-- Write isPalindrome(s) that returns true if the string
-- reads the same forwards and backwards (case-insensitive).
-- Use string.lower and string.reverse.

-- YOUR CODE HERE`,
      solution: `function isPalindrome(s)
  local lower = string.lower(s)
  return lower == string.reverse(lower)
end`,
      hints: [
        'Convert to lowercase first for case-insensitive comparison.',
        'Then compare the string with its reverse.',
        'string.reverse returns the reversed string.',
      ],
      concepts: ['string-library', 'reverse', 'lower'],
    },
    {
      id: 'lua-strlib-8',
      title: 'Write Caesar Cipher',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a Caesar cipher using string.byte and string.char.',
      skeleton: `-- Write caesarEncrypt(text, shift) that shifts each
-- lowercase letter by shift positions (wrapping a-z).
-- Non-lowercase characters stay unchanged.
-- Example: caesarEncrypt("abc", 1) -> "bcd"

-- YOUR CODE HERE`,
      solution: `function caesarEncrypt(text, shift)
  local result = {}
  for i = 1, #text do
    local b = string.byte(text, i)
    if b >= 97 and b <= 122 then
      b = ((b - 97 + shift) % 26) + 97
    end
    result[i] = string.char(b)
  end
  return table.concat(result)
end`,
      hints: [
        'Lowercase a-z are bytes 97-122.',
        'Subtract 97, add shift, modulo 26, add 97 back.',
        'Build result as a table and concat for efficiency.',
      ],
      concepts: ['string-library', 'byte', 'char', 'algorithms'],
    },
    {
      id: 'lua-strlib-9',
      title: 'Fix Format Specifier',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the string.format call with wrong specifiers.',
      skeleton: `local name = "Lua"
local version = 5.4
local msg = string.format("Language: %d, Version: %s", name, version)
print(msg)  -- should print "Language: Lua, Version: 5.4"`,
      solution: `local name = "Lua"
local version = 5.4
local msg = string.format("Language: %s, Version: %.1f", name, version)
print(msg)  -- should print "Language: Lua, Version: 5.4"`,
      hints: [
        '%d is for integers, %s is for strings.',
        'name is a string, so use %s for it.',
        'version is a float, so use %f or %.1f.',
      ],
      concepts: ['string-library', 'format', 'debugging'],
    },
    {
      id: 'lua-strlib-10',
      title: 'Predict string.byte Range',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict multiple byte values from string.byte.',
      skeleton: `local a, b, c = string.byte("Lua", 1, 3)
print(a)
print(b)
print(c)`,
      solution: `76
117
97`,
      hints: [
        'string.byte(s, i, j) returns bytes from position i to j.',
        'L=76, u=117, a=97 in ASCII.',
        'Each byte value is returned as a separate value.',
      ],
      concepts: ['string-library', 'byte', 'ascii'],
    },
    {
      id: 'lua-strlib-11',
      title: 'Write Hex Encoder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that converts a string to its hex representation.',
      skeleton: `-- Write toHex(s) that returns the hexadecimal representation
-- of each byte in the string, separated by spaces.
-- Example: toHex("Hi") -> "48 69"
-- Use string.format with %02x.

-- YOUR CODE HERE`,
      solution: `function toHex(s)
  local parts = {}
  for i = 1, #s do
    parts[i] = string.format("%02x", string.byte(s, i))
  end
  return table.concat(parts, " ")
end`,
      hints: [
        'Use string.byte to get each byte value.',
        'string.format("%02x", n) formats as 2-digit hex.',
        'Collect parts in a table and join with spaces.',
      ],
      concepts: ['string-library', 'format', 'byte'],
    },
    {
      id: 'lua-strlib-12',
      title: 'Fix string.sub Off-by-One',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the off-by-one error in string.sub indexing.',
      skeleton: `function getExtension(filename)
  local dot = filename:find("%.")
  if dot then
    return string.sub(filename, dot)  -- BUG: includes the dot
  end
  return ""
end
print(getExtension("file.txt"))  -- should print "txt" not ".txt"`,
      solution: `function getExtension(filename)
  local dot = filename:find("%.")
  if dot then
    return string.sub(filename, dot + 1)  -- FIXED: skip the dot
  end
  return ""
end
print(getExtension("file.txt"))  -- should print "txt" not ".txt"`,
      hints: [
        'find returns the position of the dot character.',
        'sub(s, dot) includes the dot in the result.',
        'Use dot + 1 to start after the dot.',
      ],
      concepts: ['string-library', 'sub', 'debugging'],
    },
    {
      id: 'lua-strlib-13',
      title: 'Write String Padding',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write left and right pad functions using string.rep.',
      skeleton: `-- Write padLeft(s, width, char) and padRight(s, width, char)
-- that pad s to the given width with char (default " ").
-- If s is already wider than width, return s unchanged.

-- YOUR CODE HERE`,
      solution: `function padLeft(s, width, char)
  char = char or " "
  local padding = width - #s
  if padding <= 0 then return s end
  return string.rep(char, padding) .. s
end

function padRight(s, width, char)
  char = char or " "
  local padding = width - #s
  if padding <= 0 then return s end
  return s .. string.rep(char, padding)
end`,
      hints: [
        'Calculate padding needed: width - #s.',
        'Use string.rep to create the padding string.',
        'Handle the case where no padding is needed.',
      ],
      concepts: ['string-library', 'rep', 'algorithms'],
    },
    {
      id: 'lua-strlib-14',
      title: 'Predict Reverse',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict string.reverse output.',
      skeleton: `print(string.reverse("12345"))
print(string.reverse(""))
print(string.reverse("a"))`,
      solution: `54321

a`,
      hints: [
        'string.reverse reverses the byte order.',
        'An empty string reversed is still empty.',
        'A single character reversed is the same character.',
      ],
      concepts: ['string-library', 'reverse'],
    },
    {
      id: 'lua-strlib-15',
      title: 'Write String Truncate',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that truncates a string and adds ellipsis if too long.',
      skeleton: `-- Write truncate(s, maxLen) that returns s if #s <= maxLen.
-- Otherwise returns the first (maxLen - 3) characters + "...".
-- If maxLen < 4, just return string.sub(s, 1, maxLen).

-- YOUR CODE HERE`,
      solution: `function truncate(s, maxLen)
  if #s <= maxLen then return s end
  if maxLen < 4 then return string.sub(s, 1, maxLen) end
  return string.sub(s, 1, maxLen - 3) .. "..."
end`,
      hints: [
        'Check if truncation is needed first.',
        'Reserve 3 characters for the ellipsis.',
        'Handle edge case where maxLen is too small for ellipsis.',
      ],
      concepts: ['string-library', 'sub', 'algorithms'],
    },
    {
      id: 'lua-strlib-16',
      title: 'Refactor Concatenation to Format',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor string concatenation to use string.format.',
      skeleton: `local name = "Alice"
local age = 30
local score = 95.5

local msg = "Player " .. name .. " (age " .. tostring(age) .. ") scored " .. tostring(score) .. " points."
print(msg)`,
      solution: `local name = "Alice"
local age = 30
local score = 95.5

local msg = string.format("Player %s (age %d) scored %.1f points.", name, age, score)
print(msg)`,
      hints: [
        'string.format is cleaner than multiple concatenations.',
        'Use %s for strings, %d for integers, %.1f for floats.',
        'No need for tostring with format specifiers.',
      ],
      concepts: ['string-library', 'format', 'refactoring'],
    },
    {
      id: 'lua-strlib-17',
      title: 'Refactor Byte Loop to Method Style',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor library-style calls to method-style calls.',
      skeleton: `local s = "Hello World"
local upper = string.upper(s)
local sub = string.sub(upper, 1, 5)
local reversed = string.reverse(sub)
local len = string.len(reversed)
print(reversed, len)`,
      solution: `local s = "Hello World"
local result = s:upper():sub(1, 5):reverse()
print(result, #result)`,
      hints: [
        'Lua strings have methods via their metatable.',
        's:upper() is equivalent to string.upper(s).',
        'Method calls can be chained.',
      ],
      concepts: ['string-library', 'methods', 'refactoring'],
    },
    {
      id: 'lua-strlib-18',
      title: 'Write Quoted String',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Use string.format %q to create a safely quoted string.',
      skeleton: `local s = 'He said "hello"'
local quoted = string.format("___", s)
print(quoted)  -- prints a safely escaped and quoted version`,
      solution: `local s = 'He said "hello"'
local quoted = string.format("%q", s)
print(quoted)  -- prints a safely escaped and quoted version`,
      hints: [
        '%q produces a string in a form suitable for the Lua parser.',
        'It adds quotes and escapes special characters.',
        'Useful for generating Lua code or debug output.',
      ],
      concepts: ['string-library', 'format', 'quoting'],
    },
    {
      id: 'lua-strlib-19',
      title: 'Write UTF-8 Safe Length',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function that returns both byte length and character count.',
      skeleton: `-- Write stringInfo(s) that returns two values:
-- 1. The byte length (#s)
-- 2. The UTF-8 character count (using utf8.len)
-- If utf8.len fails, return byte length for both.

-- YOUR CODE HERE`,
      solution: `function stringInfo(s)
  local byteLen = #s
  local charLen = utf8.len(s)
  if not charLen then
    return byteLen, byteLen
  end
  return byteLen, charLen
end`,
      hints: [
        '#s gives byte length, utf8.len gives character count.',
        'utf8.len returns nil for invalid UTF-8.',
        'Fall back to byte length if UTF-8 parsing fails.',
      ],
      concepts: ['string-library', 'utf8', 'encoding'],
    },
    {
      id: 'lua-strlib-20',
      title: 'Write Format Table Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function that formats a table of records as aligned columns.',
      skeleton: `-- Write formatTable(headers, rows) where headers is a table
-- of column names and rows is a table of tables.
-- Return a string with aligned columns using string.format.
-- Each column should be left-aligned with width = max(header, data).

-- YOUR CODE HERE`,
      solution: `function formatTable(headers, rows)
  local widths = {}
  for i, h in ipairs(headers) do
    widths[i] = #h
  end
  for _, row in ipairs(rows) do
    for i, cell in ipairs(row) do
      local len = #tostring(cell)
      if len > (widths[i] or 0) then
        widths[i] = len
      end
    end
  end
  local fmtParts = {}
  for i, w in ipairs(widths) do
    fmtParts[i] = "%-" .. w .. "s"
  end
  local fmt = table.concat(fmtParts, "  ")
  local lines = {}
  lines[1] = string.format(fmt, table.unpack(headers))
  for _, row in ipairs(rows) do
    local strs = {}
    for i, v in ipairs(row) do strs[i] = tostring(v) end
    lines[#lines + 1] = string.format(fmt, table.unpack(strs))
  end
  return table.concat(lines, "\n")
end`,
      hints: [
        'First pass: compute max width for each column.',
        'Build a format string with %-Ws for left-aligned columns.',
        'Format headers and each row using string.format.',
      ],
      concepts: ['string-library', 'format', 'algorithms'],
    },
  ],
};
