import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-str',
  title: '03. Strings',
  explanation: `## Strings in Ruby

Ruby provides powerful string handling with multiple quoting styles and rich methods.

### Single vs Double Quotes

\`\`\`ruby
# Single quotes: literal strings, no interpolation
name = 'Alice'
greeting = 'Hello, world!'  # No escape sequences except \\\\ and \\'

# Double quotes: interpolation and escape sequences
greeting = "Hello, \#{name}!"   # => "Hello, Alice!"
multiline = "Line 1\\nLine 2"   # \\n is a newline
\`\`\`

### Heredoc

\`\`\`ruby
text = <<~HEREDOC
  This is a heredoc.
  It preserves line breaks.
  Indentation is stripped with ~.
HEREDOC
\`\`\`

### Common String Methods

\`\`\`ruby
str = "Hello, World!"
str.length       # => 13
str.upcase       # => "HELLO, WORLD!"
str.downcase     # => "hello, world!"
str.reverse      # => "!dlroW ,olleH"
str.include?("World")  # => true
str.gsub("World", "Ruby")  # => "Hello, Ruby!"
str.split(", ")  # => ["Hello", "World!"]
str.strip        # removes leading/trailing whitespace
str.chars        # => ["H", "e", "l", "l", "o", ...]
str.freeze       # makes the string immutable
\`\`\`

### Bang Methods

Methods ending in \`!\` modify the string in place:

\`\`\`ruby
str = "hello"
str.upcase!   # str is now "HELLO"
\`\`\``,
  exercises: [
    {
      id: 'rb-str-1',
      title: 'String Interpolation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use string interpolation to insert the variable name into the greeting.',
      skeleton: `name = "Ruby"
greeting = "Hello, ___!"`,
      solution: `name = "Ruby"
greeting = "Hello, \#{name}!"`,
      hints: [
        'Ruby uses #{} for string interpolation inside double quotes.',
        'Place the variable name inside #{}.',
        'Write #{name} inside the string.',
      ],
      concepts: ['string-interpolation', 'double-quotes'],
    },
    {
      id: 'rb-str-2',
      title: 'Get String Length',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Get the length of the string.',
      skeleton: `str = "Hello"
len = str.___`,
      solution: `str = "Hello"
len = str.length`,
      hints: [
        'Ruby strings have a .length method.',
        'You can also use .size as an alias.',
        'Write str.length.',
      ],
      concepts: ['string-length', 'string-methods'],
    },
    {
      id: 'rb-str-3',
      title: 'Convert to Uppercase',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Convert the string to all uppercase letters.',
      skeleton: `result = "hello world".___`,
      solution: `result = "hello world".upcase`,
      hints: [
        'The method name describes what it does: upper case.',
        'It returns a new string with all characters uppercased.',
        'Write .upcase.',
      ],
      concepts: ['upcase', 'string-methods'],
    },
    {
      id: 'rb-str-4',
      title: 'Split a String',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Split the string "a,b,c" by commas into an array.',
      skeleton: `parts = "a,b,c".___(___)`,
      solution: `parts = "a,b,c".split(",")`,
      hints: [
        'The .split method divides a string by a delimiter.',
        'Pass the delimiter as a string argument.',
        'Write .split(",").',
      ],
      concepts: ['split', 'string-to-array'],
    },
    {
      id: 'rb-str-5',
      title: 'Replace Substring with gsub',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Replace all occurrences of "cat" with "dog" in the string.',
      skeleton: `result = "the cat sat on the cat mat".___("cat", "dog")`,
      solution: `result = "the cat sat on the cat mat".gsub("cat", "dog")`,
      hints: [
        'gsub stands for global substitution.',
        'It replaces ALL occurrences of the pattern.',
        'Write .gsub("cat", "dog").',
      ],
      concepts: ['gsub', 'string-replacement'],
    },
    {
      id: 'rb-str-6',
      title: 'Freeze a String',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Freeze the string to make it immutable.',
      skeleton: `str = "immutable".___`,
      solution: `str = "immutable".freeze`,
      hints: [
        'The .freeze method prevents further modification.',
        'Once frozen, any attempt to modify raises a FrozenError.',
        'Write .freeze.',
      ],
      concepts: ['freeze', 'immutability'],
    },
    {
      id: 'rb-str-7',
      title: 'Write a String Reverser',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Write a method called reverse_words that takes a string and returns it with the order of words reversed. For example, "hello world" becomes "world hello".',
      skeleton: `def reverse_words(str)
  # Reverse the order of words
end`,
      solution: `def reverse_words(str)
  str.split.reverse.join(" ")
end`,
      hints: [
        'Split the string into words with .split.',
        'Reverse the array with .reverse.',
        'Join them back with .join(" ").',
      ],
      concepts: ['split', 'reverse', 'join', 'method-chaining'],
    },
    {
      id: 'rb-str-8',
      title: 'Write a Palindrome Checker',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called palindrome? that returns true if a string reads the same forwards and backwards (case-insensitive, ignoring spaces).',
      skeleton: `def palindrome?(str)
  # Check if str is a palindrome
end`,
      solution: `def palindrome?(str)
  cleaned = str.downcase.gsub(" ", "")
  cleaned == cleaned.reverse
end`,
      hints: [
        'Normalize the string: downcase and remove spaces.',
        'Compare the cleaned string to its reverse.',
        'Use .gsub(" ", "") to remove spaces.',
      ],
      concepts: ['downcase', 'gsub', 'reverse', 'comparison'],
    },
    {
      id: 'rb-str-9',
      title: 'Write a Title Case Converter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called titlecase that capitalizes the first letter of each word. For example, "hello world" becomes "Hello World".',
      skeleton: `def titlecase(str)
  # Capitalize each word
end`,
      solution: `def titlecase(str)
  str.split.map(&:capitalize).join(" ")
end`,
      hints: [
        'Split into words, capitalize each, join back.',
        'The .capitalize method uppercases the first letter.',
        'Use .map(&:capitalize) to apply to each word.',
      ],
      concepts: ['split', 'map', 'capitalize', 'join'],
    },
    {
      id: 'rb-str-10',
      title: 'Write a Character Counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called char_count that takes a string and returns a hash where keys are characters and values are their counts. For example, "aab" returns {"a"=>2, "b"=>1}.',
      skeleton: `def char_count(str)
  # Return hash of character counts
end`,
      solution: `def char_count(str)
  str.chars.tally
end`,
      hints: [
        '.chars splits a string into an array of characters.',
        '.tally counts occurrences of each element in an array.',
        'You can also use .each_with_object or .group_by.',
      ],
      concepts: ['chars', 'tally', 'hashes'],
    },
    {
      id: 'rb-str-11',
      title: 'Write a String Truncator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called truncate that takes a string and a max length. If the string is longer than max, truncate it and append "...". Otherwise return it unchanged. For example, truncate("Hello World", 8) returns "Hello...".',
      skeleton: `def truncate(str, max)
  # Truncate with "..." if too long
end`,
      solution: `def truncate(str, max)
  if str.length > max
    str[0, max - 3] + "..."
  else
    str
  end
end`,
      hints: [
        'Use str[0, n] to get the first n characters.',
        'Account for the 3 characters of "..." in your slice.',
        'Only truncate if str.length > max.',
      ],
      concepts: ['string-slicing', 'conditional', 'concatenation'],
    },
    {
      id: 'rb-str-12',
      title: 'Fix the Interpolation Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the string so interpolation works. Currently it prints the literal #{name} text.',
      skeleton: `name = "Alice"
greeting = 'Hello, \#{name}!'
puts greeting`,
      solution: `name = "Alice"
greeting = "Hello, \#{name}!"
puts greeting`,
      hints: [
        'Single-quoted strings do not support interpolation.',
        'Switch to double quotes for interpolation to work.',
        'Change the single quotes to double quotes.',
      ],
      concepts: ['string-interpolation', 'single-vs-double-quotes'],
    },
    {
      id: 'rb-str-13',
      title: 'Fix the Frozen String Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the error that occurs when trying to modify a frozen string.',
      skeleton: `str = "hello".freeze
str.upcase!
puts str`,
      solution: `str = "hello".freeze
str = str.upcase
puts str`,
      hints: [
        'Bang methods (!) modify the string in place, which fails on frozen strings.',
        'Use the non-bang version which returns a new string.',
        'Replace .upcase! with .upcase and reassign.',
      ],
      concepts: ['freeze', 'bang-methods', 'immutability'],
    },
    {
      id: 'rb-str-14',
      title: 'Fix the Heredoc Indentation Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the heredoc so that extra indentation is stripped properly.',
      skeleton: `text = <<-HEREDOC
    Line one
    Line two
    Line three
  HEREDOC
puts text`,
      solution: `text = <<~HEREDOC
    Line one
    Line two
    Line three
  HEREDOC
puts text`,
      hints: [
        '<<- only allows the closing delimiter to be indented.',
        '<<~ (squiggly heredoc) strips common leading whitespace.',
        'Change <<- to <<~ to strip the indentation.',
      ],
      concepts: ['heredoc', 'squiggly-heredoc', 'indentation'],
    },
    {
      id: 'rb-str-15',
      title: 'Predict String Multiplication Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Predict the output of string multiplication.',
      skeleton: `puts "ha" * 3
puts "-" * 10`,
      solution: `hahaha
----------`,
      hints: [
        'Multiplying a string by n repeats it n times.',
        '"ha" * 3 produces "hahaha".',
        '"-" * 10 produces ten dashes.',
      ],
      concepts: ['string-multiplication', 'operators'],
    },
    {
      id: 'rb-str-16',
      title: 'Predict gsub Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output of this gsub chain.',
      skeleton: `str = "Hello, World!"
result = str.gsub("o", "0").gsub("l", "1")
puts result`,
      solution: `He110, W0r1d!`,
      hints: [
        'First gsub replaces all "o" with "0".',
        'Second gsub replaces all "l" with "1".',
        'Method chaining applies left to right.',
      ],
      concepts: ['gsub', 'method-chaining'],
    },
    {
      id: 'rb-str-17',
      title: 'Predict String Comparison Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output of string comparison.',
      skeleton: `puts "apple" <=> "banana"
puts "cat" <=> "cat"
puts "dog" <=> "cat"`,
      solution: `-1
0
1`,
      hints: [
        'The spaceship operator <=> returns -1, 0, or 1.',
        '-1 means left is less, 0 means equal, 1 means left is greater.',
        'String comparison is lexicographic (alphabetical).',
      ],
      concepts: ['spaceship-operator', 'string-comparison'],
    },
    {
      id: 'rb-str-18',
      title: 'Refactor String Concatenation to Interpolation',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Refactor the string concatenation to use interpolation instead.',
      skeleton: `first = "John"
last = "Doe"
age = 30
bio = first + " " + last + " is " + age.to_s + " years old."`,
      solution: `first = "John"
last = "Doe"
age = 30
bio = "\#{first} \#{last} is \#{age} years old."`,
      hints: [
        'String interpolation is cleaner than concatenation with +.',
        'Interpolation auto-calls .to_s, so no explicit conversion needed.',
        'Use #{variable} inside double-quoted strings.',
      ],
      concepts: ['string-interpolation', 'refactoring'],
    },
    {
      id: 'rb-str-19',
      title: 'Refactor to Method Chaining',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the multi-step string processing into a single method chain.',
      skeleton: `input = "  Hello, World!  "
step1 = input.strip
step2 = step1.downcase
step3 = step2.gsub(" ", "_")
result = step3`,
      solution: `input = "  Hello, World!  "
result = input.strip.downcase.gsub(" ", "_")`,
      hints: [
        'Each method returns a new string, so you can chain them.',
        'Remove the intermediate variables.',
        'Chain .strip.downcase.gsub(" ", "_") directly.',
      ],
      concepts: ['method-chaining', 'refactoring', 'string-methods'],
    },
    {
      id: 'rb-str-20',
      title: 'Write a Slug Generator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a method called slugify that converts a title into a URL slug. It should downcase, replace spaces with hyphens, and remove any characters that are not alphanumeric or hyphens. For example, "Hello, World! 123" becomes "hello-world-123".',
      skeleton: `def slugify(title)
  # Convert title to URL slug
end`,
      solution: `def slugify(title)
  title.downcase.strip.gsub(/\s+/, "-").gsub(/[^a-z0-9\-]/, "")
end`,
      hints: [
        'Downcase first, then replace whitespace with hyphens.',
        'Use a regex with gsub to remove unwanted characters.',
        '/[^a-z0-9\\-]/ matches anything that is not alphanumeric or a hyphen.',
      ],
      concepts: ['downcase', 'gsub', 'regex', 'string-processing'],
    },
  ],
};
