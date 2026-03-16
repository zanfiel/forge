import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-io',
  title: '18. I/O & Files',
  explanation: `## I/O & Files in Ruby

Ruby provides rich file and I/O handling through \`File\`, \`IO\`, \`Dir\`, \`FileUtils\`, and \`Pathname\`.

\`\`\`ruby
# Reading a file
content = File.read("data.txt")
lines = File.readlines("data.txt", chomp: true)

# Writing a file
File.write("output.txt", "Hello, World!")

# Block form (auto-closes)
File.open("data.txt", "r") do |f|
  f.each_line { |line| puts line }
end

# IO.foreach - memory efficient line-by-line
IO.foreach("data.txt") { |line| puts line.chomp }

# Directory operations
Dir.entries(".")           # => [".", "..", "file1.rb", ...]
Dir.glob("*.rb")           # => ["app.rb", "test.rb"]
Dir.mkdir("new_dir")

# FileUtils
require 'fileutils'
FileUtils.cp("src.txt", "dest.txt")
FileUtils.rm_rf("old_dir")

# Pathname (OOP path manipulation)
require 'pathname'
path = Pathname.new("/home/user/file.txt")
path.basename    # => #<Pathname:file.txt>
path.extname     # => ".txt"
path.dirname     # => #<Pathname:/home/user>

# Tempfile
require 'tempfile'
Tempfile.create("prefix") do |f|
  f.write("temporary data")
end
\`\`\``,
  exercises: [
    {
      id: 'rb-io-1',
      title: 'Read a File',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to read the entire contents of a file.',
      skeleton: `content = File.___("data.txt")
puts content`,
      solution: `content = File.read("data.txt")
puts content`,
      hints: [
        '`File.read` reads the entire file as a string.',
        'It opens, reads, and closes the file automatically.',
        'For large files, consider reading line by line instead.',
      ],
      concepts: ['File.read', 'file-input', 'string'],
    },
    {
      id: 'rb-io-2',
      title: 'Write to a File',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to write text to a file.',
      skeleton: `File.___("output.txt", "Hello, Ruby!")`,
      solution: `File.write("output.txt", "Hello, Ruby!")`,
      hints: [
        '`File.write` writes a string to a file.',
        'It creates the file if it doesn\'t exist.',
        'It overwrites existing content by default.',
      ],
      concepts: ['File.write', 'file-output', 'overwrite'],
    },
    {
      id: 'rb-io-3',
      title: 'File.open with Block',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to open a file with a block that auto-closes.',
      skeleton: `File.___(\"log.txt\", \"r\") do |f|
  puts f.read
end`,
      solution: `File.open(\"log.txt\", \"r\") do |f|
  puts f.read
end`,
      hints: [
        '`File.open` with a block auto-closes the file.',
        '"r" is the read mode.',
        'The file object is passed to the block.',
      ],
      concepts: ['File.open', 'block', 'auto-close'],
    },
    {
      id: 'rb-io-4',
      title: 'Read Lines into Array',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to read all lines into an array without newlines.',
      skeleton: `lines = File.___("data.txt", ___: true)`,
      solution: `lines = File.readlines("data.txt", chomp: true)`,
      hints: [
        '`File.readlines` returns an array of lines.',
        '`chomp: true` removes trailing newline characters.',
        'Each element is one line of the file.',
      ],
      concepts: ['File.readlines', 'chomp', 'array'],
    },
    {
      id: 'rb-io-5',
      title: 'Check if File Exists',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the blank to check if a file exists before reading.',
      skeleton: `if File.___("config.yml")
  puts File.read("config.yml")
else
  puts "File not found"
end`,
      solution: `if File.exist?("config.yml")
  puts File.read("config.yml")
else
  puts "File not found"
end`,
      hints: [
        '`File.exist?` returns true if the file exists.',
        'Also available as `File.exists?` (deprecated).',
        'Always check before reading to avoid errors.',
      ],
      concepts: ['File.exist?', 'guard-clause', 'file-check'],
    },
    {
      id: 'rb-io-6',
      title: 'Dir.glob Pattern',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fill in the blank to find all Ruby files in the current directory and subdirectories.',
      skeleton: `ruby_files = Dir.___(\"**/*.rb\")`,
      solution: `ruby_files = Dir.glob(\"**/*.rb\")`,
      hints: [
        '`Dir.glob` finds files matching a pattern.',
        '`**` matches any directory depth.',
        '`*.rb` matches any file ending in .rb.',
      ],
      concepts: ['Dir.glob', 'glob-patterns', 'file-search'],
    },
    {
      id: 'rb-io-7',
      title: 'Write a File Copier',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Write a method copy_file(source, dest) that reads source and writes content to dest. Return the number of bytes written.',
      skeleton: `# Write your copy_file method`,
      solution: `def copy_file(source, dest)
  content = File.read(source)
  File.write(dest, content)
end`,
      hints: [
        'Read the source file with File.read.',
        'Write the content with File.write.',
        'File.write returns the number of bytes written.',
      ],
      concepts: ['File.read', 'File.write', 'file-copy'],
    },
    {
      id: 'rb-io-8',
      title: 'Write a Line Counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method count_lines(filename) that returns the number of non-empty lines in a file using IO.foreach.',
      skeleton: `# Write your count_lines method`,
      solution: `def count_lines(filename)
  count = 0
  IO.foreach(filename) do |line|
    count += 1 unless line.strip.empty?
  end
  count
end`,
      hints: [
        'IO.foreach reads line by line without loading the entire file.',
        'Use strip.empty? to check for blank lines.',
        'Increment count only for non-empty lines.',
      ],
      concepts: ['IO.foreach', 'line-counting', 'strip'],
    },
    {
      id: 'rb-io-9',
      title: 'Write a CSV Parser',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method parse_csv(filename) that reads a CSV file and returns an array of hashes. The first line contains headers.',
      skeleton: `# Write your parse_csv method`,
      solution: `def parse_csv(filename)
  lines = File.readlines(filename, chomp: true)
  headers = lines[0].split(",")
  lines[1..].map do |line|
    values = line.split(",")
    headers.zip(values).to_h
  end
end`,
      hints: [
        'Read all lines and chomp newlines.',
        'First line contains headers, remaining lines are data.',
        'Use zip to pair headers with values, then to_h to make a hash.',
      ],
      concepts: ['File.readlines', 'zip', 'to_h', 'parsing'],
    },
    {
      id: 'rb-io-10',
      title: 'Write a Directory Lister',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method list_files(dir, extension) that returns all files in dir (recursively) matching the given extension, sorted by name.',
      skeleton: `# Write your list_files method`,
      solution: `def list_files(dir, extension)
  Dir.glob(File.join(dir, "**", "*.\#{extension}")).sort
end`,
      hints: [
        'Use Dir.glob with a recursive pattern.',
        'File.join safely combines path components.',
        'Sort the result alphabetically.',
      ],
      concepts: ['Dir.glob', 'File.join', 'recursive-search'],
    },
    {
      id: 'rb-io-11',
      title: 'Write a Pathname Explorer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method file_info(path_str) that uses Pathname and returns a hash with :basename, :extension, :directory, and :absolute keys.',
      skeleton: `require 'pathname'

# Write your file_info method`,
      solution: `require 'pathname'

def file_info(path_str)
  path = Pathname.new(path_str)
  {
    basename: path.basename.to_s,
    extension: path.extname,
    directory: path.dirname.to_s,
    absolute: path.absolute?
  }
end`,
      hints: [
        'Create a Pathname object from the string.',
        'Use basename, extname, dirname, and absolute? methods.',
        'Convert Pathname objects to strings with .to_s.',
      ],
      concepts: ['Pathname', 'path-manipulation', 'hash'],
    },
    {
      id: 'rb-io-12',
      title: 'Write a Tempfile Logger',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method log_to_temp(messages) that writes an array of messages to a tempfile (one per line) and returns the tempfile path.',
      skeleton: `require 'tempfile'

# Write your log_to_temp method`,
      solution: `require 'tempfile'

def log_to_temp(messages)
  file = Tempfile.new("log")
  messages.each { |msg| file.puts(msg) }
  file.close
  file.path
end`,
      hints: [
        'Tempfile.new creates a temporary file.',
        'Use puts to write each message on a new line.',
        'Close the file and return its path.',
      ],
      concepts: ['Tempfile', 'file-writing', 'temporary-files'],
    },
    {
      id: 'rb-io-13',
      title: 'Fix File Mode Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the code so it appends to the file instead of overwriting it.',
      skeleton: `File.open("log.txt", "w") do |f|
  f.puts "New log entry"
end`,
      solution: `File.open("log.txt", "a") do |f|
  f.puts "New log entry"
end`,
      hints: [
        '"w" mode overwrites the entire file.',
        '"a" mode appends to the end of the file.',
        'Change the mode from "w" to "a".',
      ],
      concepts: ['file-modes', 'append', 'overwrite'],
    },
    {
      id: 'rb-io-14',
      title: 'Fix Missing File Close',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code to properly close the file handle.',
      skeleton: `f = File.open("data.txt", "r")
content = f.read
puts content`,
      solution: `File.open("data.txt", "r") do |f|
  content = f.read
  puts content
end`,
      hints: [
        'Without a block, File.open does not auto-close.',
        'Use the block form to ensure auto-closing.',
        'Alternatively, call f.close explicitly.',
      ],
      concepts: ['file-handle-leak', 'block-form', 'auto-close'],
    },
    {
      id: 'rb-io-15',
      title: 'Fix Path Joining Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the code to safely join path components.',
      skeleton: `dir = "/home/user"
filename = "data.txt"
path = dir + "/" + filename
puts path`,
      solution: `dir = "/home/user"
filename = "data.txt"
path = File.join(dir, filename)
puts path`,
      hints: [
        'String concatenation with "/" is fragile.',
        'File.join handles path separators correctly.',
        'It works across different operating systems.',
      ],
      concepts: ['File.join', 'path-safety', 'cross-platform'],
    },
    {
      id: 'rb-io-16',
      title: 'Predict File.readlines Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'What does this code print? Assume data.txt contains "hello\\nworld\\n".',
      skeleton: `# data.txt contains: hello\\nworld\\n
lines = File.readlines("data.txt")
puts lines.length
puts lines[0].chomp`,
      solution: `2
hello`,
      hints: [
        'readlines returns one element per line.',
        'With two lines, length is 2.',
        'chomp removes the trailing newline.',
      ],
      concepts: ['File.readlines', 'chomp', 'line-counting'],
    },
    {
      id: 'rb-io-17',
      title: 'Predict Dir.glob Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What type does Dir.glob return?',
      skeleton: `result = Dir.glob("*.rb")
puts result.class`,
      solution: `Array`,
      hints: [
        'Dir.glob returns an Array of matching file paths.',
        'Each element is a String.',
        'If no files match, it returns an empty array.',
      ],
      concepts: ['Dir.glob', 'return-type', 'Array'],
    },
    {
      id: 'rb-io-18',
      title: 'Predict Pathname Methods',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'What does this code print?',
      skeleton: `require 'pathname'
p = Pathname.new("/home/user/docs/report.pdf")
puts p.extname
puts p.basename(".*")`,
      solution: `.pdf
report`,
      hints: [
        'extname returns the file extension including the dot.',
        'basename(".*") removes the extension.',
        'Pathname provides OOP path manipulation.',
      ],
      concepts: ['Pathname', 'extname', 'basename'],
    },
    {
      id: 'rb-io-19',
      title: 'Refactor to Block Form',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Refactor this code to use the block form of File.open for safety.',
      skeleton: `file = File.open("output.txt", "w")
file.puts "Line 1"
file.puts "Line 2"
file.puts "Line 3"
file.close`,
      solution: `File.open("output.txt", "w") do |file|
  file.puts "Line 1"
  file.puts "Line 2"
  file.puts "Line 3"
end`,
      hints: [
        'The block form of File.open auto-closes the file.',
        'This is safer because close happens even if an error occurs.',
        'Move all file operations inside the block.',
      ],
      concepts: ['block-form', 'auto-close', 'refactoring'],
    },
    {
      id: 'rb-io-20',
      title: 'Refactor to Pathname',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the string-based path manipulation to use Pathname.',
      skeleton: `require 'pathname'

path = "/home/user/projects/app/config.yml"
dir = path.split("/")[0..-2].join("/")
ext = path.split(".").last
base = path.split("/").last.split(".").first

puts dir
puts ext
puts base`,
      solution: `require 'pathname'

path = Pathname.new("/home/user/projects/app/config.yml")
dir = path.dirname
ext = path.extname
base = path.basename(".*")

puts dir
puts ext
puts base`,
      hints: [
        'Pathname provides dirname, extname, and basename methods.',
        'No need for manual string splitting.',
        'basename(".*") strips the extension.',
      ],
      concepts: ['Pathname', 'refactoring', 'OOP-paths'],
    },
  ],
};
