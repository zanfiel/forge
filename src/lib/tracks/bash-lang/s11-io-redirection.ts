import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'bash-io',
  title: '11. I/O Redirection',
  explanation: `## I/O Redirection\n\nBash has three standard file descriptors: stdin (0), stdout (1), stderr (2). You can redirect them to files or other descriptors.\n\n### Output Redirection\n\n\`\`\`bash\necho "hello" > file.txt      # overwrite stdout to file\necho "world" >> file.txt     # append stdout to file\n\`\`\`\n\n### Input Redirection\n\n\`\`\`bash\nwc -l < file.txt             # read stdin from file\nwhile read line; do\n  echo "\$line"\ndone < file.txt\n\`\`\`\n\n### Stderr Redirection\n\n\`\`\`bash\ncommand 2> errors.log        # redirect stderr to file\ncommand 2>> errors.log       # append stderr\ncommand 2>&1                 # redirect stderr to stdout\ncommand > out.txt 2>&1       # both to same file\n\`\`\`\n\n### /dev/null\n\n\`\`\`bash\ncommand > /dev/null          # discard stdout\ncommand > /dev/null 2>&1     # discard both stdout and stderr\n\`\`\`\n\n### tee\n\n\`\`\`bash\ncommand | tee file.txt       # stdout goes to file AND terminal\ncommand | tee -a file.txt    # append mode\n\`\`\`\n\n### File Descriptors\n\n\`\`\`bash\nexec 3> output.txt           # open fd 3 for writing\necho "data" >&3              # write to fd 3\nexec 3>&-                    # close fd 3\n\`\`\``,
  exercises: [
    {
      id: 'bash-io-1',
      title: 'Redirect stdout to File',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Redirect echo output to a file, then append another line.',
      skeleton: `#!/bin/bash
echo "line 1" ___ output.txt
echo "line 2" ___ output.txt
cat output.txt`,
      solution: `#!/bin/bash
echo "line 1" > output.txt
echo "line 2" >> output.txt
cat output.txt`,
      hints: ['> overwrites the file.', '>> appends to the file.', '> and >>'],
      concepts: ['output-redirection', 'append'],
    },
    {
      id: 'bash-io-2',
      title: 'Redirect stdin from File',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Read stdin from a file using input redirection.',
      skeleton: `#!/bin/bash
# Count lines in file.txt using input redirection
wc -l ___ file.txt`,
      solution: `#!/bin/bash
wc -l < file.txt`,
      hints: ['< redirects a file to stdin.', 'wc -l < file.txt reads file.txt as stdin.', '<'],
      concepts: ['input-redirection'],
    },
    {
      id: 'bash-io-3',
      title: 'Redirect stderr',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Redirect stderr to a log file.',
      skeleton: `#!/bin/bash
ls /nonexistent ___ errors.log
echo "Exit: \$?"`,
      solution: `#!/bin/bash
ls /nonexistent 2> errors.log
echo "Exit: \$?"`,
      hints: ['2> redirects file descriptor 2 (stderr).', 'ls errors go to stderr, not stdout.', '2>'],
      concepts: ['stderr-redirection', 'file-descriptors'],
    },
    {
      id: 'bash-io-4',
      title: 'Merge stderr into stdout',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Redirect both stdout and stderr to the same file.',
      skeleton: `#!/bin/bash
./myprogram > all_output.txt ___`,
      solution: `#!/bin/bash
./myprogram > all_output.txt 2>&1`,
      hints: ['2>&1 means "send fd 2 to wherever fd 1 is going".', 'The > must come before 2>&1.', '2>&1'],
      concepts: ['stderr-redirect', '2>&1', 'file-descriptors'],
    },
    {
      id: 'bash-io-5',
      title: 'Discard Output with /dev/null',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Run a command silently by discarding all output.',
      skeleton: `#!/bin/bash
apt-get update > ___ 2>&1
echo "Done (exit \$?)"`,
      solution: `#!/bin/bash
apt-get update > /dev/null 2>&1
echo "Done (exit \$?)"`,
      hints: ['/dev/null discards all data written to it.', '> /dev/null sends stdout to the void.', '/dev/null'],
      concepts: ['/dev/null', 'discard-output'],
    },
    {
      id: 'bash-io-6',
      title: 'tee to File and Terminal',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Use tee to write output to both a file and stdout simultaneously.',
      skeleton: `#!/bin/bash
echo "important output" | ___ result.txt`,
      solution: `#!/bin/bash
echo "important output" | tee result.txt`,
      hints: ['tee reads stdin and writes to both stdout and a file.', 'command | tee file.txt', 'tee'],
      concepts: ['tee', 'duplicate-output'],
    },
    {
      id: 'bash-io-7',
      title: 'Write a Logging Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function log_msg that prints a message to both stdout and appends to /tmp/app.log.',
      skeleton: `#!/bin/bash
# Write log_msg function`,
      solution: `#!/bin/bash
log_msg() {
  local msg="\$1"
  echo "\$msg" | tee -a /tmp/app.log
}
log_msg "Starting app"
log_msg "Processing..."`,
      hints: ['Use tee -a to append to the log file.', 'tee -a appends instead of overwriting.', 'echo "$msg" | tee -a /tmp/app.log'],
      concepts: ['tee', 'logging', 'append'],
    },
    {
      id: 'bash-io-8',
      title: 'Write a Safe Command Runner',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function run_silent that executes a command, discards all output, and returns the exit code.',
      skeleton: `#!/bin/bash
# Write run_silent function`,
      solution: `#!/bin/bash
run_silent() {
  "\$@" > /dev/null 2>&1
  return \$?
}
run_silent ls /tmp && echo "success" || echo "failed"
run_silent ls /nonexistent && echo "success" || echo "failed"`,
      hints: ['Use "$@" to forward all arguments as the command.', '> /dev/null 2>&1 discards both stdout and stderr.', 'Return $? to propagate the exit code.'],
      concepts: ['/dev/null', 'exit-codes', 'functions'],
    },
    {
      id: 'bash-io-9',
      title: 'Write a File Processor',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a script that reads lines from a file passed as $1 and prints each line with a line number.',
      skeleton: `#!/bin/bash
# Read file and print numbered lines`,
      solution: `#!/bin/bash
n=1
while IFS= read -r line; do
  echo "\$n: \$line"
  n=\$((n + 1))
done < "\$1"`,
      hints: ['Use while read loop with < "$1" for input redirection.', 'IFS= prevents stripping leading/trailing whitespace.', '-r prevents backslash interpretation.'],
      concepts: ['input-redirection', 'while-read', 'IFS'],
    },
    {
      id: 'bash-io-10',
      title: 'Predict Redirection Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict what goes to the file vs what goes to terminal.',
      skeleton: `#!/bin/bash
{ echo "stdout line"; echo "stderr line" >&2; } > /tmp/out.txt
cat /tmp/out.txt`,
      solution: `stdout line`,
      hints: ['> /tmp/out.txt only captures stdout.', 'stderr goes to the terminal, not the file.', 'Only "stdout line" ends up in the file.'],
      concepts: ['stdout', 'stderr', 'redirection-scope'],
    },
    {
      id: 'bash-io-11',
      title: 'Predict tee Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict what tee produces on stdout vs in the file.',
      skeleton: `#!/bin/bash
echo "hello" | tee /tmp/t.txt | tr 'a-z' 'A-Z'`,
      solution: `HELLO`,
      hints: ['tee writes "hello" to /tmp/t.txt AND passes it downstream.', 'tr converts lowercase to uppercase.', 'Terminal shows HELLO; file contains hello.'],
      concepts: ['tee', 'pipeline', 'tr'],
    },
    {
      id: 'bash-io-12',
      title: 'Fix Redirection Order',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Fix the redirection that captures stderr but not into the same file as stdout.',
      skeleton: `#!/bin/bash
# BUG: stderr not going to the same place as stdout
command 2>&1 > combined.log`,
      solution: `#!/bin/bash
command > combined.log 2>&1`,
      hints: ['Order matters: > combined.log must come before 2>&1.', '2>&1 first means "send stderr to current stdout (terminal)", then > redirects stdout.', 'Correct order: > file.txt 2>&1'],
      concepts: ['redirection-order', '2>&1'],
    },
    {
      id: 'bash-io-13',
      title: 'Fix Missing Input Redirection',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Fix the while loop that should read from a file, not stdin.',
      skeleton: `#!/bin/bash
# BUG: reads from stdin instead of data.txt
while IFS= read -r line; do
  echo "Got: \$line"
done`,
      solution: `#!/bin/bash
while IFS= read -r line; do
  echo "Got: \$line"
done < data.txt`,
      hints: ['Add < data.txt after the done keyword.', 'The entire while loop reads from the redirected file.', '< data.txt after done'],
      concepts: ['input-redirection', 'while-read'],
    },
    {
      id: 'bash-io-14',
      title: 'Refactor to Use tee',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Refactor the script to print to terminal AND save to file using tee instead of two echo calls.',
      skeleton: `#!/bin/bash
msg="Build complete"
echo "\$msg"
echo "\$msg" >> build.log`,
      solution: `#!/bin/bash
msg="Build complete"
echo "\$msg" | tee -a build.log`,
      hints: ['tee -a appends to the file and also prints to stdout.', 'Replaces both the echo and the >> redirection.', 'echo "$msg" | tee -a build.log'],
      concepts: ['tee', 'refactoring'],
    },
    {
      id: 'bash-io-15',
      title: 'Open and Use Custom File Descriptor',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a script that opens fd 3 for writing, writes two lines to it, then closes it.',
      skeleton: `#!/bin/bash
# Write to fd 3`,
      solution: `#!/bin/bash
exec 3> /tmp/fd3.txt
echo "first line" >&3
echo "second line" >&3
exec 3>&-
cat /tmp/fd3.txt`,
      hints: ['exec 3> file opens fd 3 for writing.', '>&3 redirects output to fd 3.', 'exec 3>&- closes fd 3.'],
      concepts: ['file-descriptors', 'exec', 'custom-fd'],
    },
    {
      id: 'bash-io-16',
      title: 'Predict /dev/null Behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Predict how many lines of output appear in the terminal.',
      skeleton: `#!/bin/bash
echo "visible"
echo "hidden" > /dev/null
echo "also visible"
ls /no_such_dir 2> /dev/null
echo "done"`,
      solution: `visible\nalso visible\ndone`,
      hints: ['"hidden" goes to /dev/null so nothing appears.', 'ls error goes to /dev/null.', 'Three visible lines: visible, also visible, done.'],
      concepts: ['/dev/null', 'stdout', 'stderr'],
    },
    {
      id: 'bash-io-17',
      title: 'Write an Error Separator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function run_split that runs a command, saving stdout to out.txt and stderr to err.txt separately.',
      skeleton: `#!/bin/bash
# Write run_split function`,
      solution: `#!/bin/bash
run_split() {
  "\$@" > /tmp/out.txt 2> /tmp/err.txt
}
run_split ls /tmp /nonexistent
echo "stdout:"; cat /tmp/out.txt
echo "stderr:"; cat /tmp/err.txt`,
      hints: ['Use > for stdout and 2> for stderr to different files.', '"$@" forwards all arguments as the command.', '> /tmp/out.txt 2> /tmp/err.txt'],
      concepts: ['stdout', 'stderr', 'separate-redirection'],
    },
    {
      id: 'bash-io-18',
      title: 'Refactor Append Redirections',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Refactor the script to capture both stdout and stderr together in a single log file.',
      skeleton: `#!/bin/bash
./build.sh > build.log
./test.sh > build.log
./deploy.sh > build.log`,
      solution: `#!/bin/bash
./build.sh >> build.log 2>&1
./test.sh >> build.log 2>&1
./deploy.sh >> build.log 2>&1`,
      hints: ['Use >> to append (not overwrite) each step.', 'Add 2>&1 to capture stderr too.', 'Each line needs >> and 2>&1.'],
      concepts: ['append', '2>&1', 'logging'],
    },
    {
      id: 'bash-io-19',
      title: 'Write a Here-Document',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a script that uses a here-document to write a multi-line config file.',
      skeleton: `#!/bin/bash
# Write config.txt using a heredoc`,
      solution: `#!/bin/bash
cat > /tmp/config.txt << 'EOF'
host=localhost
port=8080
debug=true
EOF
cat /tmp/config.txt`,
      hints: ["Use cat > file << 'EOF' to start a heredoc.", "Quoting 'EOF' prevents variable expansion inside.", 'End with EOF on its own line.'],
      concepts: ['heredoc', 'output-redirection'],
    },
    {
      id: 'bash-io-20',
      title: 'Refactor Separate Captures to Combined',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Refactor the verbose separate capture pattern to capture both streams at once.',
      skeleton: `#!/bin/bash
./app > /tmp/stdout.txt
./app 2> /tmp/stderr.txt
cat /tmp/stdout.txt
cat /tmp/stderr.txt`,
      solution: `#!/bin/bash
./app > /tmp/all_output.txt 2>&1
cat /tmp/all_output.txt`,
      hints: ['Combining > file and 2>&1 captures both in one command.', 'No need for separate files when both streams go together.', '> /tmp/all_output.txt 2>&1'],
      concepts: ['2>&1', 'refactoring', 'combined-output'],
    },
  ],
};
