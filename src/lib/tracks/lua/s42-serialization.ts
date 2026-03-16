import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-serial',
  title: '42. Serialization',
  explanation: `## Serialization in Lua

Serialization converts Lua data structures to strings for storage or transmission:

\`\`\`lua
-- Simple table serializer
function serialize(val, indent)
  indent = indent or ""
  local t = type(val)
  if t == "number" or t == "boolean" then
    return tostring(val)
  elseif t == "string" then
    return string.format("%q", val)
  elseif t == "table" then
    local parts = {}
    local nextIndent = indent .. "  "
    for k, v in pairs(val) do
      local key
      if type(k) == "string" then key = k .. " = "
      else key = "[" .. serialize(k) .. "] = " end
      parts[#parts + 1] = nextIndent .. key .. serialize(v, nextIndent)
    end
    return "{\\n" .. table.concat(parts, ",\\n") .. "\\n" .. indent .. "}"
  end
  return "nil"
end

-- JSON-like encoding (simplified)
function toJSON(val)
  if type(val) == "table" then
    if #val > 0 then  -- array
      local items = {}
      for i, v in ipairs(val) do items[i] = toJSON(v) end
      return "[" .. table.concat(items, ",") .. "]"
    else  -- object
      local items = {}
      for k, v in pairs(val) do
        items[#items + 1] = '"' .. k .. '":' .. toJSON(v)
      end
      return "{" .. table.concat(items, ",") .. "}"
    end
  elseif type(val) == "string" then
    return '"' .. val .. '"'
  end
  return tostring(val)
end
\`\`\``,
  exercises: [
    {
      id: 'lua-serial-1',
      title: 'Serialize Number',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Convert a number to its string representation.',
      skeleton: `function serializeValue(val)
  if type(val) == "number" then
    return ___(val)
  end
  return "nil"
end
print(serializeValue(42))    -- "42"
print(serializeValue(3.14))  -- "3.14"`,
      solution: `function serializeValue(val)
  if type(val) == "number" then
    return tostring(val)
  end
  return "nil"
end
print(serializeValue(42))    -- "42"
print(serializeValue(3.14))  -- "3.14"`,
      hints: [
        'tostring converts any value to its string representation.',
        'Numbers are converted to their decimal string form.',
        'This is the simplest form of serialization.',
      ],
      concepts: ['serialization', 'tostring'],
    },
    {
      id: 'lua-serial-2',
      title: 'Serialize String Safely',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Use string.format %q for safe string serialization.',
      skeleton: `function serializeString(s)
  return string.format("___", s)
end
local result = serializeString('say "hi"')
print(result)  -- safely escaped string`,
      solution: `function serializeString(s)
  return string.format("%q", s)
end
local result = serializeString('say "hi"')
print(result)  -- safely escaped string`,
      hints: [
        '%q produces a string suitable for the Lua parser.',
        'It escapes quotes, newlines, and special characters.',
        'The result can be safely pasted back into Lua code.',
      ],
      concepts: ['serialization', 'string-escaping'],
    },
    {
      id: 'lua-serial-3',
      title: 'Predict Serialized Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the tostring output for various types.',
      skeleton: `print(tostring(true))
print(tostring(nil))
print(tostring(42))`,
      solution: `true
nil
42`,
      hints: [
        'tostring converts booleans to "true" or "false".',
        'tostring converts nil to "nil".',
        'tostring converts numbers to their decimal form.',
      ],
      concepts: ['serialization', 'tostring'],
    },
    {
      id: 'lua-serial-4',
      title: 'Write JSON String Encoder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that encodes a Lua string as JSON.',
      skeleton: `-- Write jsonString(s) that returns a JSON-encoded string.
-- Escape: \\\\ for backslash, \\" for quotes, \\n for newline, \\t for tab.

-- YOUR CODE HERE`,
      solution: `function jsonString(s)
  s = s:gsub("\\\\", "\\\\\\\\")
  s = s:gsub('"', '\\\\"')
  s = s:gsub("\n", "\\\\n")
  s = s:gsub("\t", "\\\\t")
  return '"' .. s .. '"'
end`,
      hints: [
        'Escape backslashes first to avoid double-escaping.',
        'Then escape quotes, newlines, and tabs.',
        'Wrap the result in double quotes.',
      ],
      concepts: ['serialization', 'json', 'escaping'],
    },
    {
      id: 'lua-serial-5',
      title: 'Write Simple JSON Encoder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a basic JSON encoder for simple Lua values.',
      skeleton: `-- Write toJSON(val) that handles: numbers, strings, booleans,
-- nil (as "null"), and tables (as arrays if sequence, objects otherwise).
-- Strings should be quoted. No need for deep nesting.

-- YOUR CODE HERE`,
      solution: `function toJSON(val)
  local t = type(val)
  if val == nil then return "null" end
  if t == "boolean" or t == "number" then return tostring(val) end
  if t == "string" then return '"' .. val:gsub('"', '\\\\"') .. '"' end
  if t == "table" then
    if #val > 0 then
      local items = {}
      for i, v in ipairs(val) do items[i] = toJSON(v) end
      return "[" .. table.concat(items, ",") .. "]"
    else
      local items = {}
      for k, v in pairs(val) do
        items[#items + 1] = '"' .. tostring(k) .. '":' .. toJSON(v)
      end
      return "{" .. table.concat(items, ",") .. "}"
    end
  end
  return "null"
end`,
      hints: [
        'Check type for each value and encode accordingly.',
        'Arrays have sequential integer keys (#val > 0).',
        'Objects use string keys with quoted names.',
      ],
      concepts: ['serialization', 'json', 'encoding'],
    },
    {
      id: 'lua-serial-6',
      title: 'Fix Circular Reference Crash',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the serializer that crashes on circular references.',
      skeleton: `function serialize(val)
  if type(val) ~= "table" then return tostring(val) end
  local parts = {}
  for k, v in pairs(val) do
    parts[#parts + 1] = tostring(k) .. "=" .. serialize(v)  -- BUG: infinite recursion
  end
  return "{" .. table.concat(parts, ",") .. "}"
end

local t = {a = 1}
t.self = t  -- circular reference
print(serialize(t))  -- stack overflow!`,
      solution: `function serialize(val, seen)
  seen = seen or {}
  if type(val) ~= "table" then return tostring(val) end
  if seen[val] then return '"<circular>"' end  -- FIXED: detect cycles
  seen[val] = true
  local parts = {}
  for k, v in pairs(val) do
    parts[#parts + 1] = tostring(k) .. "=" .. serialize(v, seen)
  end
  return "{" .. table.concat(parts, ",") .. "}"
end

local t = {a = 1}
t.self = t
print(serialize(t))`,
      hints: [
        'Track visited tables in a "seen" set.',
        'Before recursing, check if the table was already visited.',
        'Output a placeholder for circular references.',
      ],
      concepts: ['serialization', 'circular-references', 'debugging'],
    },
    {
      id: 'lua-serial-7',
      title: 'Write Lua Table Serializer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a serializer that outputs valid Lua table syntax.',
      skeleton: `-- Write luaSerialize(val) that returns a string of valid Lua code.
-- Handle: nil, boolean, number, string, and flat tables.
-- Strings use %q. Table keys can be string or number.

-- YOUR CODE HERE`,
      solution: `function luaSerialize(val)
  local t = type(val)
  if t == "nil" then return "nil" end
  if t == "boolean" then return tostring(val) end
  if t == "number" then return tostring(val) end
  if t == "string" then return string.format("%q", val) end
  if t == "table" then
    local parts = {}
    for k, v in pairs(val) do
      local key
      if type(k) == "number" then
        key = "[" .. k .. "]"
      else
        key = "[" .. string.format("%q", k) .. "]"
      end
      parts[#parts + 1] = key .. " = " .. luaSerialize(v)
    end
    return "{" .. table.concat(parts, ", ") .. "}"
  end
  return "nil"
end`,
      hints: [
        'Use string.format("%q", s) for safe string encoding.',
        'Number keys use [n] syntax, string keys use ["s"] syntax.',
        'The output should be loadable Lua code.',
      ],
      concepts: ['serialization', 'lua-syntax', 'encoding'],
    },
    {
      id: 'lua-serial-8',
      title: 'Write Deserializer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that deserializes a Lua table string back to a table.',
      skeleton: `-- Write luaDeserialize(str) that takes a string of Lua table
-- code and returns the table. Use load() in a sandbox.
-- Return nil, error on failure.

-- YOUR CODE HERE`,
      solution: `function luaDeserialize(str)
  local fn, err = load("return " .. str, "data", "t", {})
  if not fn then return nil, err end
  local ok, result = pcall(fn)
  if not ok then return nil, result end
  return result
end`,
      hints: [
        'load() compiles a string into a function.',
        'Prepend "return " to make it an expression.',
        'Use an empty environment {} for sandboxing.',
      ],
      concepts: ['serialization', 'deserialization', 'sandbox'],
    },
    {
      id: 'lua-serial-9',
      title: 'Predict JSON Array',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the JSON encoding of a Lua array.',
      skeleton: `local t = {10, 20, 30}
local parts = {}
for _, v in ipairs(t) do parts[#parts+1] = tostring(v) end
print("[" .. table.concat(parts, ",") .. "]")`,
      solution: `[10,20,30]`,
      hints: [
        'Arrays are encoded as JSON arrays with brackets.',
        'Each number is converted to a string.',
        'Elements are separated by commas.',
      ],
      concepts: ['serialization', 'json', 'arrays'],
    },
    {
      id: 'lua-serial-10',
      title: 'Write Key-Value Serializer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Serialize a flat table as key=value lines.',
      skeleton: `function serializeKV(t)
  local lines = {}
  for k, v in ___(t) do
    lines[#lines + 1] = tostring(k) .. "=" .. tostring(v)
  end
  table.sort(lines)
  return table.concat(lines, "\\n")
end
local s = serializeKV({name="lua", version=5})
print(type(s))  -- "string"`,
      solution: `function serializeKV(t)
  local lines = {}
  for k, v in pairs(t) do
    lines[#lines + 1] = tostring(k) .. "=" .. tostring(v)
  end
  table.sort(lines)
  return table.concat(lines, "\\n")
end
local s = serializeKV({name="lua", version=5})
print(type(s))  -- "string"`,
      hints: [
        'Use pairs to iterate all key-value pairs.',
        'Convert both key and value to strings.',
        'Sort for deterministic output.',
      ],
      concepts: ['serialization', 'key-value'],
    },
    {
      id: 'lua-serial-11',
      title: 'Fix Missing String Quotes',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the serializer that does not quote strings.',
      skeleton: `function serialize(val)
  if type(val) == "number" then return tostring(val) end
  if type(val) == "string" then return val end  -- BUG: no quotes
  if type(val) == "boolean" then return tostring(val) end
  return "nil"
end
local s = serialize("hello world")
-- Deserializing this would fail because it's not quoted
print(s)`,
      solution: `function serialize(val)
  if type(val) == "number" then return tostring(val) end
  if type(val) == "string" then return string.format("%q", val) end  -- FIXED
  if type(val) == "boolean" then return tostring(val) end
  return "nil"
end
local s = serialize("hello world")
print(s)`,
      hints: [
        'Strings must be quoted for valid serialization.',
        'string.format("%q", s) adds quotes and escapes.',
        'Without quotes, the string cannot be deserialized.',
      ],
      concepts: ['serialization', 'strings', 'debugging'],
    },
    {
      id: 'lua-serial-12',
      title: 'Write CSV Serializer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that serializes a table of records to CSV format.',
      skeleton: `-- Write toCSV(headers, rows) where headers is a list of column names
-- and rows is a list of tables with those keys.
-- Return a CSV string with header row and data rows.

-- YOUR CODE HERE`,
      solution: `function toCSV(headers, rows)
  local lines = {}
  lines[1] = table.concat(headers, ",")
  for _, row in ipairs(rows) do
    local fields = {}
    for i, h in ipairs(headers) do
      local val = tostring(row[h] or "")
      if val:find(",") or val:find('"') then
        val = '"' .. val:gsub('"', '""') .. '"'
      end
      fields[i] = val
    end
    lines[#lines + 1] = table.concat(fields, ",")
  end
  return table.concat(lines, "\n")
end`,
      hints: [
        'First line is headers joined by commas.',
        'Each row extracts values in header order.',
        'Quote fields containing commas or quotes.',
      ],
      concepts: ['serialization', 'csv', 'encoding'],
    },
    {
      id: 'lua-serial-13',
      title: 'Write Binary Packer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a simple binary packer for integers using string.pack.',
      skeleton: `-- Write packIntegers(...) that packs variable number of integers
-- into a binary string using string.pack with "i4" format (4-byte int).
-- Write unpackIntegers(s) that returns all integers from the string.

-- YOUR CODE HERE`,
      solution: `function packIntegers(...)
  local parts = {}
  for i = 1, select("#", ...) do
    parts[i] = string.pack("i4", select(i, ...))
  end
  return table.concat(parts)
end

function unpackIntegers(s)
  local result = {}
  local pos = 1
  while pos <= #s do
    local val
    val, pos = string.unpack("i4", s, pos)
    result[#result + 1] = val
  end
  return table.unpack(result)
end`,
      hints: [
        'string.pack("i4", n) packs a 4-byte integer.',
        'string.unpack("i4", s, pos) reads at position pos.',
        'unpack returns the value and the next position.',
      ],
      concepts: ['serialization', 'binary', 'string-pack'],
    },
    {
      id: 'lua-serial-14',
      title: 'Predict string.format %q',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict the output of %q formatting.',
      skeleton: `print(string.format("%q", "hello"))
print(string.format("%q", 'say "hi"'))`,
      solution: `"hello"
"say \"hi\""`,
      hints: [
        '%q wraps the string in double quotes.',
        'Internal double quotes are escaped with backslash.',
        'The output is valid Lua string syntax.',
      ],
      concepts: ['serialization', 'string-format', 'quoting'],
    },
    {
      id: 'lua-serial-15',
      title: 'Write Pretty Printer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a pretty printer that formats tables with indentation.',
      skeleton: `-- Write prettyPrint(val, indent) that returns a formatted string.
-- Tables are indented with 2 spaces per level.
-- indent defaults to "".

-- YOUR CODE HERE`,
      solution: `function prettyPrint(val, indent)
  indent = indent or ""
  local t = type(val)
  if t == "string" then return string.format("%q", val) end
  if t ~= "table" then return tostring(val) end
  local parts = {}
  local nextIndent = indent .. "  "
  for k, v in pairs(val) do
    local key
    if type(k) == "string" then
      key = k .. " = "
    else
      key = "[" .. tostring(k) .. "] = "
    end
    parts[#parts + 1] = nextIndent .. key .. prettyPrint(v, nextIndent)
  end
  if #parts == 0 then return "{}" end
  return "{\n" .. table.concat(parts, ",\n") .. "\n" .. indent .. "}"
end`,
      hints: [
        'Increase indentation for each nesting level.',
        'Recursively format nested tables.',
        'Handle empty tables as "{}".',
      ],
      concepts: ['serialization', 'pretty-printing', 'recursion'],
    },
    {
      id: 'lua-serial-16',
      title: 'Write Config Serializer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a serializer for a simple config format (INI-like).',
      skeleton: `-- Write serializeConfig(config) where config is:
-- { section1 = { key1 = val1, ... }, section2 = { ... } }
-- Output format: [section]\\nkey=value\\n\\n
-- Values are simple types (string, number, boolean).

-- YOUR CODE HERE`,
      solution: `function serializeConfig(config)
  local parts = {}
  for section, entries in pairs(config) do
    parts[#parts + 1] = "[" .. section .. "]"
    local keys = {}
    for k in pairs(entries) do keys[#keys + 1] = k end
    table.sort(keys)
    for _, k in ipairs(keys) do
      parts[#parts + 1] = k .. "=" .. tostring(entries[k])
    end
    parts[#parts + 1] = ""
  end
  return table.concat(parts, "\n")
end`,
      hints: [
        'Iterate sections with pairs.',
        'Format section headers as [name].',
        'Sort keys within each section for consistency.',
      ],
      concepts: ['serialization', 'config', 'ini-format'],
    },
    {
      id: 'lua-serial-17',
      title: 'Refactor Print Debugging to Serialize',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor ad-hoc print debugging into a proper dump function.',
      skeleton: `local player = {name="hero", hp=100, pos={x=10, y=20}}

-- Ad-hoc debugging
print("name=" .. player.name)
print("hp=" .. player.hp)
print("x=" .. player.pos.x)
print("y=" .. player.pos.y)`,
      solution: `local function dump(val, indent)
  indent = indent or ""
  if type(val) ~= "table" then
    return tostring(val)
  end
  local parts = {}
  for k, v in pairs(val) do
    parts[#parts + 1] = indent .. tostring(k) .. " = " .. dump(v, indent .. "  ")
  end
  return "{\n" .. table.concat(parts, "\n") .. "\n" .. indent .. "}"
end

local player = {name="hero", hp=100, pos={x=10, y=20}}
print(dump(player))`,
      hints: [
        'Write a recursive dump function.',
        'Handle nested tables with indentation.',
        'One call replaces all the manual prints.',
      ],
      concepts: ['serialization', 'debugging', 'refactoring'],
    },
    {
      id: 'lua-serial-18',
      title: 'Refactor String Building to Table Concat',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor repeated string concatenation to use table.concat.',
      skeleton: `function serialize(t)
  local result = "{"
  local first = true
  for k, v in pairs(t) do
    if not first then result = result .. "," end
    result = result .. tostring(k) .. "=" .. tostring(v)
    first = false
  end
  result = result .. "}"
  return result
end
print(serialize({a=1, b=2}))`,
      solution: `function serialize(t)
  local parts = {}
  for k, v in pairs(t) do
    parts[#parts + 1] = tostring(k) .. "=" .. tostring(v)
  end
  return "{" .. table.concat(parts, ",") .. "}"
end
print(serialize({a=1, b=2}))`,
      hints: [
        'Collect parts in a table, then concat once.',
        'table.concat with separator handles commas.',
        'This is much more efficient for large tables.',
      ],
      concepts: ['serialization', 'performance', 'refactoring'],
    },
    {
      id: 'lua-serial-19',
      title: 'Write Message Protocol',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a simple length-prefixed message protocol encoder/decoder.',
      skeleton: `-- Write encodeMessage(msgType, payload) that returns a string:
-- First 4 chars: message length as zero-padded decimal
-- Next 2 chars: message type
-- Rest: payload string
-- Write decodeMessage(data) that returns msgType, payload.

-- YOUR CODE HERE`,
      solution: `function encodeMessage(msgType, payload)
  local content = msgType .. payload
  local length = string.format("%04d", #content)
  return length .. content
end

function decodeMessage(data)
  local length = tonumber(data:sub(1, 4))
  local msgType = data:sub(5, 6)
  local payload = data:sub(7, 4 + length)
  return msgType, payload
end`,
      hints: [
        'Use string.format("%04d", n) for zero-padded length.',
        'The length includes msgType and payload.',
        'Decode by extracting fixed-width fields.',
      ],
      concepts: ['serialization', 'protocol', 'binary'],
    },
    {
      id: 'lua-serial-20',
      title: 'Write Diff-Based Serializer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a serializer that only outputs changes from a base table.',
      skeleton: `-- Write serializeDiff(base, current) that returns a table
-- containing only keys where current[k] ~= base[k].
-- Include keys in current not in base (added).
-- Include keys in base not in current as {key = "DELETED"}.

-- YOUR CODE HERE`,
      solution: `function serializeDiff(base, current)
  local diff = {}
  for k, v in pairs(current) do
    if base[k] ~= v then
      diff[k] = v
    end
  end
  for k in pairs(base) do
    if current[k] == nil then
      diff[k] = "DELETED"
    end
  end
  return diff
end`,
      hints: [
        'Compare each key in current against base.',
        'Include changed and added keys.',
        'Mark deleted keys with a sentinel value.',
      ],
      concepts: ['serialization', 'diff', 'compression'],
    },
  ],
};
