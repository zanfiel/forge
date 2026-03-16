import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-patterns',
  title: '19. String Patterns',
  explanation: `## String Patterns in Lua

Lua has its own pattern matching system (not full regex, but powerful).

### Character Classes
| Class | Matches |
|-------|---------|
| \`.\` | Any character |
| \`%a\` | Letters |
| \`%d\` | Digits |
| \`%w\` | Alphanumeric |
| \`%s\` | Whitespace |
| \`%p\` | Punctuation |
| \`%l\` / \`%u\` | Lower / Upper |
| Uppercase versions (\`%A\`, \`%D\`, etc.) match the complement |

### Quantifiers
| Symbol | Meaning |
|--------|---------|
| \`*\` | 0 or more (greedy) |
| \`+\` | 1 or more (greedy) |
| \`-\` | 0 or more (lazy) |
| \`?\` | 0 or 1 |

### Pattern Functions
\`\`\`lua
string.find(s, pattern)     -- returns start, end positions
string.match(s, pattern)    -- returns captured groups
string.gmatch(s, pattern)   -- iterator over all matches
string.gsub(s, pattern, repl) -- replace all matches
\`\`\`

### Captures
\`\`\`lua
local y, m, d = string.match("2024-03-15", "(%d+)-(%d+)-(%d+)")
\`\`\``,
  exercises: [
    {
      id: 'lua-patterns-1',
      title: 'Match Digits',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Match all digits in a string.',
      skeleton: `local nums = string.match("abc123def", "(%___+)")
print(nums) -- should print "123"`,
      solution: `local nums = string.match("abc123def", "(%d+)")
print(nums) -- should print "123"`,
      hints: ['%d matches a single digit.', '%d+ matches one or more digits.', 'Fill in "d" after the %.'],
      concepts: ['character-classes', 'quantifiers'],
    },
    {
      id: 'lua-patterns-2',
      title: 'Find a Pattern',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Find the position of "world" in the string.',
      skeleton: `local s = "hello world"
local start, stop = string.___(s, "world")
print(start, stop) -- 7  11`,
      solution: `local s = "hello world"
local start, stop = string.find(s, "world")
print(start, stop) -- 7  11`,
      hints: ['string.find returns start and end positions.', 'It searches for the pattern in the string.', 'Fill in "find".'],
      concepts: ['string-find'],
    },
    {
      id: 'lua-patterns-3',
      title: 'Match with Capture',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Capture the year, month, and day from a date string.',
      skeleton: `local date = "2024-03-15"
local y, m, d = string.match(date, "(%d+)___(%d+)___(%d+)")
print(y, m, d)`,
      solution: `local date = "2024-03-15"
local y, m, d = string.match(date, "(%d+)-(%d+)-(%d+)")
print(y, m, d)`,
      hints: ['Parentheses create captures.', 'The dash - matches literally here.', 'Fill in "-" for the separators.'],
      concepts: ['captures', 'string-match'],
    },
    {
      id: 'lua-patterns-4',
      title: 'Global Match',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Iterate over all words in a string.',
      skeleton: `local s = "hello world foo"
for word in string.___(s, "%a+") do
  print(word)
end`,
      solution: `local s = "hello world foo"
for word in string.gmatch(s, "%a+") do
  print(word)
end`,
      hints: ['string.gmatch returns an iterator.', 'It finds all matches of the pattern.', 'Fill in "gmatch".'],
      concepts: ['string-gmatch'],
    },
    {
      id: 'lua-patterns-5',
      title: 'Substitute Pattern',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Replace all digits with "#".',
      skeleton: `local s = "phone: 555-1234"
local result = string.___(s, "%d", "#")
print(result) -- "phone: ###-####"`,
      solution: `local s = "phone: 555-1234"
local result = string.gsub(s, "%d", "#")
print(result) -- "phone: ###-####"`,
      hints: ['string.gsub replaces all matches.', '%d matches each digit individually.', 'Fill in "gsub".'],
      concepts: ['string-gsub'],
    },
    {
      id: 'lua-patterns-6',
      title: 'Anchor Pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Check if a string starts with a digit.',
      skeleton: `local s = "42abc"
if string.match(s, "____%d") then
  print("starts with digit")
end`,
      solution: `local s = "42abc"
if string.match(s, "^%d") then
  print("starts with digit")
end`,
      hints: ['^ anchors the match to the start.', '$ anchors to the end.', 'Fill in "^".'],
      concepts: ['anchors'],
    },
    {
      id: 'lua-patterns-7',
      title: 'Write an Email Validator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function isEmail(s) that checks if a string looks like an email (basic check).',
      skeleton: `-- Write function isEmail(s)`,
      solution: `local function isEmail(s)
  return string.match(s, "^[%w%.%-]+@[%w%.%-]+%.%a+$") ~= nil
end

print(isEmail("user@example.com"))  -- true
print(isEmail("not-an-email"))      -- false
print(isEmail("a@b.c"))             -- true`,
      hints: ['Match word chars, @, domain, dot, extension.', 'Use ^ and $ to anchor the whole string.', 'Use character sets [%w%.%-] for allowed chars.'],
      concepts: ['patterns', 'validation'],
    },
    {
      id: 'lua-patterns-8',
      title: 'Write a Word Extractor',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write a function getWords(s) that returns an array of all words.',
      skeleton: `-- Write function getWords(s)`,
      solution: `local function getWords(s)
  local words = {}
  for word in s:gmatch("%a+") do
    words[#words + 1] = word
  end
  return words
end

local w = getWords("Hello, World! How are you?")
for _, word in ipairs(w) do print(word) end`,
      hints: ['Use gmatch with %a+ pattern.', 'Collect each word into a table.', '%a matches letters only.'],
      concepts: ['string-gmatch', 'patterns'],
    },
    {
      id: 'lua-patterns-9',
      title: 'Write a Template Engine',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function interpolate(template, vars) that replaces {key} placeholders with values from vars table.',
      skeleton: `-- Write function interpolate(template, vars)`,
      solution: `local function interpolate(template, vars)
  return template:gsub("{(%w+)}", function(key)
    return vars[key] or "{" .. key .. "}"
  end)
end

local result = interpolate("Hello {name}, you are {age}!", {name = "Alice", age = "30"})
print(result) -- "Hello Alice, you are 30!"`,
      hints: ['Use gsub with a capture for the key name.', 'The replacement can be a function.', 'Look up the key in the vars table.'],
      concepts: ['string-gsub', 'captures'],
    },
    {
      id: 'lua-patterns-10',
      title: 'Write a URL Parser',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a function parseURL(url) that extracts protocol, host, and path.',
      skeleton: `-- Write function parseURL(url)`,
      solution: `local function parseURL(url)
  local protocol, host, path = url:match("^(%a+)://([^/]+)(.*)")
  return {
    protocol = protocol,
    host = host,
    path = path ~= "" and path or "/",
  }
end

local u = parseURL("https://example.com/api/data")
print(u.protocol, u.host, u.path)`,
      hints: ['Use captures to extract parts.', '%a+ matches the protocol.', '[^/]+ matches the host (no slashes).'],
      concepts: ['string-match', 'captures'],
    },
    {
      id: 'lua-patterns-11',
      title: 'Write a Slug Generator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function slug(s) that converts "Hello World!" to "hello-world".',
      skeleton: `-- Write function slug(s)`,
      solution: `local function slug(s)
  s = s:lower()
  s = s:gsub("[^%w%s-]", "")
  s = s:gsub("%s+", "-")
  s = s:gsub("^-+", ""):gsub("-+$", "")
  return s
end

print(slug("Hello, World!"))     -- "hello-world"
print(slug("  Foo   Bar  "))     -- "foo-bar"`,
      hints: ['Convert to lowercase first.', 'Remove non-alphanumeric characters.', 'Replace spaces with hyphens.'],
      concepts: ['string-gsub', 'patterns'],
    },
    {
      id: 'lua-patterns-12',
      title: 'Write a Number Extractor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function extractNumbers(s) that returns an array of all numbers (including decimals) in a string.',
      skeleton: `-- Write function extractNumbers(s)`,
      solution: `local function extractNumbers(s)
  local nums = {}
  for num in s:gmatch("%-?%d+%.?%d*") do
    nums[#nums + 1] = tonumber(num)
  end
  return nums
end

local n = extractNumbers("temp: -3.5, pressure: 101.3, count: 42")
for _, v in ipairs(n) do print(v) end`,
      hints: ['Match optional minus, digits, optional decimal.', '%-? for optional minus.', '%.?%d* for optional decimal part.'],
      concepts: ['string-gmatch', 'patterns'],
    },
    {
      id: 'lua-patterns-13',
      title: 'Fix Unescaped Pattern Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the pattern that does not match a literal dot.',
      skeleton: `local s = "file.txt"
local name, ext = s:match("(.+).(.+)")
print(name, ext) -- should print "file" and "txt"`,
      solution: `local s = "file.txt"
local name, ext = s:match("(.+)%.(.+)")
print(name, ext) -- prints "file" and "txt"`,
      hints: ['In Lua patterns, . matches any character.', 'Use %  . to match a literal dot.', 'Replace the bare . with %  .'],
      concepts: ['pattern-escaping'],
    },
    {
      id: 'lua-patterns-14',
      title: 'Fix Greedy Match Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the greedy match that captures too much.',
      skeleton: `local s = "<b>hello</b> <b>world</b>"
local first = s:match("<b>(.*)</b>")
print(first) -- should print "hello", not "hello</b> <b>world"`,
      solution: `local s = "<b>hello</b> <b>world</b>"
local first = s:match("<b>(.-)</b>")
print(first) -- "hello"`,
      hints: ['.* is greedy and matches as much as possible.', '.- is lazy and matches as little as possible.', 'Replace * with - for lazy matching.'],
      concepts: ['greedy-vs-lazy'],
    },
    {
      id: 'lua-patterns-15',
      title: 'Fix Character Set Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the pattern that does not match uppercase letters.',
      skeleton: `local s = "Hello World"
local words = {}
for w in s:gmatch("%l+") do
  words[#words + 1] = w
end
-- words should contain "Hello" and "World"`,
      solution: `local s = "Hello World"
local words = {}
for w in s:gmatch("%a+") do
  words[#words + 1] = w
end
-- words contains "Hello" and "World"`,
      hints: ['%l matches only lowercase letters.', '%a matches both upper and lowercase.', 'Change %l to %a.'],
      concepts: ['character-classes'],
    },
    {
      id: 'lua-patterns-16',
      title: 'Predict match Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `print(string.match("hello123", "(%a+)(%d+)"))`,
      solution: `hello\t123`,
      hints: ['Two captures: letters then digits.', '%a+ captures "hello".', '%d+ captures "123".'],
      concepts: ['captures'],
    },
    {
      id: 'lua-patterns-17',
      title: 'Predict gsub Count',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `local result, count = string.gsub("aaa bbb aaa", "aaa", "x")
print(result, count)`,
      solution: `x bbb x\t2`,
      hints: ['gsub replaces all occurrences.', '"aaa" appears twice.', 'Returns the new string and count of replacements.'],
      concepts: ['string-gsub'],
    },
    {
      id: 'lua-patterns-18',
      title: 'Predict Anchor Match',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output.',
      skeleton: `print(string.match("hello world", "^%a+"))
print(string.match("hello world", "%a+$"))`,
      solution: `hello
world`,
      hints: ['^%a+ matches letters at the start.', '%a+$ matches letters at the end.', 'Anchors restrict where the pattern matches.'],
      concepts: ['anchors'],
    },
    {
      id: 'lua-patterns-19',
      title: 'Refactor Manual Parsing',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor the manual string parsing into a pattern match.',
      skeleton: `local s = "name=Alice&age=30&city=NYC"
local parts = {}
local current = ""
local key = nil
for i = 1, #s do
  local c = s:sub(i, i)
  if c == "=" then
    key = current
    current = ""
  elseif c == "&" then
    parts[key] = current
    current = ""
  else
    current = current .. c
  end
end
parts[key] = current
print(parts.name, parts.age)`,
      solution: `local s = "name=Alice&age=30&city=NYC"
local parts = {}
for key, val in s:gmatch("(%w+)=(%w+)") do
  parts[key] = val
end
print(parts.name, parts.age)`,
      hints: ['Use gmatch with key=value pattern.', '(%w+)=(%w+) captures both parts.', 'Much cleaner than manual character-by-character parsing.'],
      concepts: ['string-gmatch', 'refactoring'],
    },
    {
      id: 'lua-patterns-20',
      title: 'Refactor Multiple gsub Calls',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor multiple gsub calls into a single pass using a table of replacements.',
      skeleton: `local s = "The cat sat on the mat"
s = string.gsub(s, "cat", "dog")
s = string.gsub(s, "sat", "stood")
s = string.gsub(s, "mat", "rug")
print(s)`,
      solution: `local replacements = {cat = "dog", sat = "stood", mat = "rug"}
local s = "The cat sat on the mat"
s = s:gsub("%a+", function(word)
  return replacements[word] or word
end)
print(s)`,
      hints: ['gsub can take a function as replacement.', 'Look up each word in a replacements table.', 'Return the original word if no replacement found.'],
      concepts: ['string-gsub', 'refactoring'],
    },
  ],
};
