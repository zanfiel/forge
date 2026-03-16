import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-regex',
  title: '19. Regular Expressions',
  explanation: `## Regular Expressions in Ruby

Ruby has first-class regex support with the \`Regexp\` class and literal syntax \`/pattern/\`.

\`\`\`ruby
# Matching
"hello world" =~ /world/    # => 6 (index of match)
"hello world".match?(/world/)  # => true

# Match data
m = "John Doe".match(/(?<first>\\w+) (?<last>\\w+)/)
m[:first]   # => "John"
m[:last]    # => "Doe"

# scan - find all matches
"cat bat hat".scan(/[cbh]at/)  # => ["cat", "bat", "hat"]

# gsub - global substitution
"hello world".gsub(/o/, "0")   # => "hell0 w0rld"
"foo bar".gsub(/\\w+/) { |m| m.capitalize }  # => "Foo Bar"

# Named captures with =~
if /(?<year>\\d{4})-(?<month>\\d{2})/ =~ "2024-03"
  puts year   # => "2024"
  puts month  # => "03"
end

# Lookahead / Lookbehind
"100px 200em".scan(/\\d+(?=px)/)     # => ["100"] (lookahead)
"$100 200".scan(/(?<=\\$)\\d+/)       # => ["100"] (lookbehind)
\`\`\`

### Key Concepts

- **\`=~\`** returns the index of first match or nil
- **\`match\`** returns a MatchData object
- **\`match?\`** returns true/false (no MatchData allocation)
- **\`scan\`** returns all matches as an array
- **\`gsub\`** replaces all matches; \`sub\`replaces first match
- **Named captures** use \`(?<name>...)\` syntax
- **Lookahead** \`(?=...)\` and **lookbehind** \`(?<=...)\` are zero-width`,
  exercises: [
    {
      id: 'rb-regex-1',
      title: 'Basic Pattern Match',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to check if the string contains "ruby" (case-insensitive).',
      skeleton: `text = "I love Ruby programming"
puts text.___(/ruby/i)`,
      solution: `text = "I love Ruby programming"
puts text.match?(/ruby/i)`,
      hints: [
        '`match?` returns true or false.',
        'The `i` flag makes the match case-insensitive.',
        'No MatchData object is created with match?.',
      ],
      concepts: ['match?', 'case-insensitive', 'regex-flags'],
    },
    {
      id: 'rb-regex-2',
      title: 'Using =~ Operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to find the index of the first digit in the string.',
      skeleton: `text = "abc123"
index = text ___ /\\d/
puts index`,
      solution: `text = "abc123"
index = text =~ /\\d/
puts index`,
      hints: [
        '`=~` returns the index of the first match.',
        '`\\d` matches any digit.',
        'Returns nil if no match is found.',
      ],
      concepts: ['=~', 'digit-matching', 'index'],
    },
    {
      id: 'rb-regex-3',
      title: 'Scan for All Matches',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to find all words starting with a capital letter.',
      skeleton: `text = "Alice met Bob at the Park"
names = text.___(/[A-Z]\\w*/)`,
      solution: `text = "Alice met Bob at the Park"
names = text.scan(/[A-Z]\\w*/)`,
      hints: [
        '`scan` returns an array of all matches.',
        '`[A-Z]` matches an uppercase letter.',
        '`\\w*` matches zero or more word characters.',
      ],
      concepts: ['scan', 'character-class', 'word-matching'],
    },
    {
      id: 'rb-regex-4',
      title: 'gsub Replacement',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to replace all whitespace with hyphens.',
      skeleton: `title = "hello beautiful world"
slug = title.___(___,  "-")`,
      solution: `title = "hello beautiful world"
slug = title.gsub(/\\s+/,  "-")`,
      hints: [
        '`gsub` replaces all matches globally.',
        '`\\s+` matches one or more whitespace characters.',
        'Replace with a hyphen to create a URL slug.',
      ],
      concepts: ['gsub', 'whitespace', 'substitution'],
    },
    {
      id: 'rb-regex-5',
      title: 'Named Captures',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to extract year, month, and day using named captures.',
      skeleton: `date = "2024-03-15"
m = date.match(/(?<___>\\d{4})-(?<___>\\d{2})-(?<___>\\d{2})/)
puts m[:year]`,
      solution: `date = "2024-03-15"
m = date.match(/(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/)
puts m[:year]`,
      hints: [
        'Named captures use the `(?<name>...)` syntax.',
        'Access captured groups with `m[:name]`.',
        'Each group captures a specific part of the date.',
      ],
      concepts: ['named-captures', 'match', 'MatchData'],
    },
    {
      id: 'rb-regex-6',
      title: 'Lookahead Pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to match numbers that are followed by "px".',
      skeleton: `css = "width: 100px; height: 200em; margin: 50px"
pixels = css.scan(/\\d+(?=___)/)`,
      solution: `css = "width: 100px; height: 200em; margin: 50px"
pixels = css.scan(/\\d+(?=px)/)`,
      hints: [
        '`(?=px)` is a positive lookahead.',
        'It matches digits only if followed by "px".',
        'The "px" itself is not included in the match.',
      ],
      concepts: ['lookahead', 'zero-width-assertion', 'scan'],
    },
    {
      id: 'rb-regex-7',
      title: 'Write an Email Validator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method valid_email?(str) that returns true if the string matches a basic email pattern: word characters, @, word characters, dot, 2-4 letters.',
      skeleton: `# Write your valid_email? method`,
      solution: `def valid_email?(str)
  str.match?(/\\A[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,4}\\z/)
end`,
      hints: [
        'Use \\A and \\z for start and end of string.',
        '[\\w.+-]+ matches the local part.',
        '[a-zA-Z]{2,4} matches the TLD.',
      ],
      concepts: ['regex-validation', 'anchors', 'character-classes'],
    },
    {
      id: 'rb-regex-8',
      title: 'Write a Word Frequency Counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method word_frequencies(text) that uses scan to find all words (sequences of word characters), downcases them, and returns a hash of word => count.',
      skeleton: `# Write your word_frequencies method`,
      solution: `def word_frequencies(text)
  text.scan(/\\w+/).map(&:downcase).tally
end`,
      hints: [
        'scan(/\\w+/) extracts all words.',
        'map(&:downcase) lowercases each word.',
        'tally counts occurrences.',
      ],
      concepts: ['scan', 'tally', 'downcase'],
    },
    {
      id: 'rb-regex-9',
      title: 'Write a Template Replacer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method render_template(template, vars) that replaces {{key}} patterns with values from a hash. Example: render_template("Hello {{name}}", {name: "Alice"}) => "Hello Alice".',
      skeleton: `# Write your render_template method`,
      solution: `def render_template(template, vars)
  template.gsub(/\\{\\{(\\w+)\\}\\}/) do
    vars[$1.to_sym] || vars[$1] || ""
  end
end`,
      hints: [
        'Use gsub with a regex to find {{key}} patterns.',
        '$1 captures the key name inside the braces.',
        'Look up the key in the vars hash.',
      ],
      concepts: ['gsub', 'capture-groups', 'template-rendering'],
    },
    {
      id: 'rb-regex-10',
      title: 'Write a URL Parser',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method parse_url(url) that extracts protocol, host, and path from a URL string using named captures. Return a hash.',
      skeleton: `# Write your parse_url method`,
      solution: `def parse_url(url)
  m = url.match(/(?<protocol>https?):\\/\\/(?<host>[^\\/]+)(?<path>\\/.*)?/)
  return nil unless m
  {
    protocol: m[:protocol],
    host: m[:host],
    path: m[:path] || "/"
  }
end`,
      hints: [
        'Use named captures for protocol, host, and path.',
        'Protocol is http or https.',
        'Host is everything before the first slash after ://.',
      ],
      concepts: ['named-captures', 'URL-parsing', 'match'],
    },
    {
      id: 'rb-regex-11',
      title: 'Write a Lookbehind Extractor',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a method extract_prices(text) that extracts numeric values preceded by a $ sign using lookbehind. Return an array of floats.',
      skeleton: `# Write your extract_prices method`,
      solution: `def extract_prices(text)
  text.scan(/(?<=\\$)\\d+\\.?\\d*/).map(&:to_f)
end`,
      hints: [
        'Use `(?<=\\$)` for a positive lookbehind.',
        'Match digits with optional decimal point.',
        'Convert matched strings to floats with map(&:to_f).',
      ],
      concepts: ['lookbehind', 'scan', 'to_f'],
    },
    {
      id: 'rb-regex-12',
      title: 'Write a gsub with Block',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method censor(text, words) that replaces each occurrence of banned words with asterisks of the same length. Case-insensitive.',
      skeleton: `# Write your censor method`,
      solution: `def censor(text, words)
  pattern = Regexp.new(words.join("|"), Regexp::IGNORECASE)
  text.gsub(pattern) { |match| "*" * match.length }
end`,
      hints: [
        'Build a regex pattern from the words array using join("|").',
        'Use Regexp::IGNORECASE for case-insensitive matching.',
        'The gsub block receives each match.',
      ],
      concepts: ['Regexp.new', 'gsub-block', 'dynamic-regex'],
    },
    {
      id: 'rb-regex-13',
      title: 'Fix Greedy Match Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the regex so it matches individual HTML tags, not the entire string between first < and last >.',
      skeleton: `html = "<b>bold</b> and <i>italic</i>"
tags = html.scan(/<.+>/)
puts tags.inspect`,
      solution: `html = "<b>bold</b> and <i>italic</i>"
tags = html.scan(/<.+?>/)
puts tags.inspect`,
      hints: [
        '`.+` is greedy and matches as much as possible.',
        'Add `?` after `+` to make it non-greedy (lazy).',
        '`.+?` matches the minimum possible characters.',
      ],
      concepts: ['greedy-vs-lazy', 'non-greedy', 'quantifiers'],
    },
    {
      id: 'rb-regex-14',
      title: 'Fix Escaped Character Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the regex to match a literal dot in the filename extension.',
      skeleton: `files = ["app.rb", "test.js", "app_rb", "style.css"]
ruby_files = files.select { |f| f.match?(/\\.rb/) }
puts ruby_files.inspect`,
      solution: `files = ["app.rb", "test.js", "app_rb", "style.css"]
ruby_files = files.select { |f| f.match?(/\\.rb\\z/) }
puts ruby_files.inspect`,
      hints: [
        'Without \\z anchor, ".rb" could match anywhere in the string.',
        '\\z anchors to the end of the string.',
        'The \\. already correctly matches a literal dot.',
      ],
      concepts: ['anchors', 'literal-dot', 'end-of-string'],
    },
    {
      id: 'rb-regex-15',
      title: 'Fix Capture Group Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code so it correctly extracts the domain from email addresses.',
      skeleton: `emails = ["alice@gmail.com", "bob@yahoo.com"]
domains = emails.map { |e| e.scan(/@(.+)/) }
puts domains.inspect`,
      solution: `emails = ["alice@gmail.com", "bob@yahoo.com"]
domains = emails.map { |e| e[/@(.+)/, 1] }
puts domains.inspect`,
      hints: [
        'scan with capture groups returns nested arrays.',
        'Use String#[] with regex and capture index instead.',
        'Or use match and access the capture group.',
      ],
      concepts: ['capture-groups', 'String#[]', 'regex-extraction'],
    },
    {
      id: 'rb-regex-16',
      title: 'Predict =~ Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `puts "hello123" =~ /\\d+/
puts "hello" =~ /\\d+/`,
      solution: `5
`,
      hints: [
        '=~ returns the index of the first match.',
        'First digit in "hello123" is at index 5.',
        'No match returns nil, which prints as empty line.',
      ],
      concepts: ['=~', 'match-index', 'nil'],
    },
    {
      id: 'rb-regex-17',
      title: 'Predict scan Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `result = "a1b2c3d4".scan(/[a-z](\\d)/)
puts result.inspect`,
      solution: `[["1"], ["2"], ["3"], ["4"]]`,
      hints: [
        'When scan has capture groups, it returns the captures.',
        'Each match produces an array of captured groups.',
        'The letter is matched but not captured.',
      ],
      concepts: ['scan', 'capture-groups', 'nested-arrays'],
    },
    {
      id: 'rb-regex-18',
      title: 'Predict gsub Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `result = "John Smith".gsub(/(\\w+) (\\w+)/, '\\2, \\1')
puts result`,
      solution: `Smith, John`,
      hints: [
        'Capture groups are referenced with \\1, \\2 in the replacement.',
        '\\1 is "John", \\2 is "Smith".',
        'The replacement pattern reverses and adds a comma.',
      ],
      concepts: ['gsub', 'backreferences', 'capture-groups'],
    },
    {
      id: 'rb-regex-19',
      title: 'Refactor Multiple gsub to Single Regex',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the multiple gsub calls into a single gsub with a character class.',
      skeleton: `def clean_phone(phone)
  phone
    .gsub("(", "")
    .gsub(")", "")
    .gsub("-", "")
    .gsub(" ", "")
end`,
      solution: `def clean_phone(phone)
  phone.gsub(/[()\\-\\s]/, "")
end`,
      hints: [
        'Use a character class [...] to match multiple characters.',
        'Escape the hyphen with \\\\ inside character class.',
        'One gsub call replaces all four.',
      ],
      concepts: ['character-class', 'gsub', 'refactoring'],
    },
    {
      id: 'rb-regex-20',
      title: 'Refactor to Named Captures',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the positional capture groups to use named captures for readability.',
      skeleton: `def parse_time(str)
  m = str.match(/(\\d{2}):(\\d{2}):(\\d{2})/)
  return nil unless m
  {
    hours: m[1].to_i,
    minutes: m[2].to_i,
    seconds: m[3].to_i
  }
end`,
      solution: `def parse_time(str)
  m = str.match(/(?<hours>\\d{2}):(?<minutes>\\d{2}):(?<seconds>\\d{2})/)
  return nil unless m
  {
    hours: m[:hours].to_i,
    minutes: m[:minutes].to_i,
    seconds: m[:seconds].to_i
  }
end`,
      hints: [
        'Replace (\\d{2}) with (?<name>\\d{2}).',
        'Access captures by name: m[:hours] instead of m[1].',
        'Named captures make the code self-documenting.',
      ],
      concepts: ['named-captures', 'readability', 'refactoring'],
    },
  ],
};
