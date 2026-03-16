import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'bash-pipes',
  title: '12. Pipes',
  explanation: `## Pipes in Bash\n\nPipes connect the stdout of one command to the stdin of the next.\n\n### Basic Pipe\n\n\`\`\`bash\ncat file.txt | grep "error"       # filter lines\nls -la | sort -k5 -n             # sort by size\nps aux | grep nginx | wc -l      # count nginx processes\n\`\`\`\n\n### xargs\n\nConverts stdin lines into command arguments:\n\n\`\`\`bash\nfind . -name "*.log" | xargs rm       # delete all .log files\necho "a b c" | xargs -I{} echo "val: {}"\ncat urls.txt | xargs -P4 curl -s      # parallel execution\n\`\`\`\n\n### Pipeline Exit Codes\n\nBy default, a pipeline's exit code is the last command's exit code:\n\n\`\`\`bash\ncat file | grep pattern\necho \$?    # exit code of grep, not cat\n\`\`\`\n\n### pipefail\n\nWith \`set -o pipefail\`, the pipeline fails if ANY command fails:\n\n\`\`\`bash\nset -o pipefail\ncat missing_file | grep "x"     # exits non-zero because cat failed\n\`\`\`\n\n### Pipeline Debugging\n\n\`\`\`bash\npipeline_check() {\n    local cmd="\$*"\n    eval "\$cmd"\n    echo "Exit: \$?" >&2\n}\n# Or use tee to inspect mid-pipeline:\ncmd1 | tee /tmp/mid.txt | cmd2\n\`\`\`\n\n### PIPESTATUS\n\n\`\`\`bash\ncmd1 | cmd2 | cmd3\necho "\${PIPESTATUS[@]}"    # exit codes of each stage\n\`\`\``,
  exercises: [
    {
      id: 'bash-pipes-1',
      title: 'Basic Pipeline',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Chain commands with pipes to filter and count.',
      skeleton: `#!/bin/bash
# Count lines containing "error" in syslog
cat /var/log/syslog ___ grep "error" ___ wc -l`,
      solution: `#!/bin/bash
cat /var/log/syslog | grep "error" | wc -l`,
      hints: ['| passes stdout of left to stdin of right.', 'cat | grep | wc chains three commands.', '|'],
      concepts: ['pipes', 'pipeline'],
    },
    {
      id: 'bash-pipes-2',
      title: 'Sort Pipeline',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Sort the output of a command and take the top 3 lines.',
      skeleton: `#!/bin/bash
cat /etc/passwd | cut -d: -f1 | ___ | ___ 3`,
      solution: `#!/bin/bash
cat /etc/passwd | cut -d: -f1 | sort | head 3`,
      hints: ['sort sorts lines alphabetically.', 'head N prints the first N lines.', 'sort | head 3'],
      concepts: ['sort', 'head', 'pipeline'],
    },
    {
      id: 'bash-pipes-3',
      title: 'xargs Basics',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Use xargs to echo each word from a list.',
      skeleton: `#!/bin/bash
echo "apple banana cherry" | tr ' ' '\\n' | ___ echo`,
      solution: `#!/bin/bash
echo "apple banana cherry" | tr ' ' '\n' | xargs echo`,
      hints: ['xargs converts lines to arguments.', 'xargs echo passes each line as an argument to echo.', 'xargs'],
      concepts: ['xargs', 'pipeline'],
    },
    {
      id: 'bash-pipes-4',
      title: 'xargs with Placeholder',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Use xargs -I{} to insert each input item into a specific position in the command.',
      skeleton: `#!/bin/bash
echo -e "alice\\nbob\\ncarol" | xargs -I___ echo "User: ___"`,
      solution: `#!/bin/bash
echo -e "alice\nbob\ncarol" | xargs -I{} echo "User: {}"`,
      hints: ['-I{} sets a placeholder for the input item.', 'Each input line replaces {} in the command.', '-I{}'],
      concepts: ['xargs', '-I', 'placeholder'],
    },
    {
      id: 'bash-pipes-5',
      title: 'Enable pipefail',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Enable pipefail so the script exits if any pipe stage fails.',
      skeleton: `#!/bin/bash
set -o ___
cat /nonexistent | grep "x" | wc -l
echo "Exit: \$?"`,
      solution: `#!/bin/bash
set -o pipefail
cat /nonexistent | grep "x" | wc -l
echo "Exit: \$?"`,
      hints: ['pipefail makes the pipeline fail if any command fails.', 'set -o pipefail enables it.', 'pipefail'],
      concepts: ['pipefail', 'error-handling'],
    },
    {
      id: 'bash-pipes-6',
      title: 'Read PIPESTATUS',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Access the exit codes of each stage of a pipeline.',
      skeleton: `#!/bin/bash
cat /nonexistent | grep "x" | wc -l
echo "Stages: \${___[@]}"`,
      solution: `#!/bin/bash
cat /nonexistent | grep "x" | wc -l
echo "Stages: \${PIPESTATUS[@]}"`,
      hints: ['PIPESTATUS is an array of exit codes for each pipeline stage.', '${PIPESTATUS[@]} expands all exit codes.', 'PIPESTATUS'],
      concepts: ['PIPESTATUS', 'exit-codes', 'pipeline'],
    },
    {
      id: 'bash-pipes-7',
      title: 'Write a Log Filter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function filter_errors that reads a log file ($1) and prints unique error lines sorted alphabetically.',
      skeleton: `#!/bin/bash
# Write filter_errors function`,
      solution: `#!/bin/bash
filter_errors() {
  local file="\$1"
  grep -i "error" "\$file" | sort | uniq
}
filter_errors /var/log/syslog`,
      hints: ['grep -i "error" matches case-insensitively.', 'sort | uniq removes duplicate lines.', 'Chain: grep | sort | uniq'],
      concepts: ['grep', 'sort', 'uniq', 'pipeline'],
    },
    {
      id: 'bash-pipes-8',
      title: 'Write a Word Counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function top_words that prints the 5 most frequent words from stdin.',
      skeleton: `#!/bin/bash
# Write top_words function`,
      solution: `#!/bin/bash
top_words() {
  tr '[:upper:]' '[:lower:]' |
  tr -cs 'a-z' '\\n' |
  sort |
  uniq -c |
  sort -rn |
  head 5
}
echo "the cat sat on the mat the cat" | top_words`,
      hints: ['Lowercase with tr, split to one word per line, sort, count with uniq -c, sort by count.', 'uniq -c prefixes each line with its count.', 'sort -rn sorts numerically in reverse (highest first).'],
      concepts: ['tr', 'sort', 'uniq', 'head', 'pipeline'],
    },
    {
      id: 'bash-pipes-9',
      title: 'Write a Safe Pipeline',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a script with pipefail enabled that processes a file and exits with non-zero if any step fails.',
      skeleton: `#!/bin/bash
# Write with pipefail enabled, process $1`,
      solution: `#!/bin/bash
set -o pipefail
process_file() {
  local file="\$1"
  cat "\$file" | grep -v "^#" | sort | uniq > /tmp/processed.txt
  echo "Processed \$(wc -l < /tmp/processed.txt) lines"
}
process_file "\$1"`,
      hints: ['set -o pipefail at the top.', 'If cat fails (missing file), the whole pipeline fails.', 'Use wc -l < file for line count.'],
      concepts: ['pipefail', 'error-handling', 'pipeline'],
    },
    {
      id: 'bash-pipes-10',
      title: 'Predict Pipeline Exit Code',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict the exit code without pipefail.',
      skeleton: `#!/bin/bash
cat /nonexistent 2>/dev/null | echo "ok"
echo \$?`,
      solution: `ok\n0`,
      hints: ['Without pipefail, $? is the exit code of the LAST command.', 'echo "ok" always succeeds (exit 0).', 'Output: ok then 0.'],
      concepts: ['pipeline-exit-code', 'PIPESTATUS'],
    },
    {
      id: 'bash-pipes-11',
      title: 'Predict PIPESTATUS Array',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Predict what PIPESTATUS contains after this pipeline.',
      skeleton: `#!/bin/bash
true | false | true
echo "\${PIPESTATUS[@]}"`,
      solution: `0 1 0`,
      hints: ['true exits 0, false exits 1.', 'PIPESTATUS captures each stage independently.', '0 1 0 for true | false | true.'],
      concepts: ['PIPESTATUS', 'exit-codes'],
    },
    {
      id: 'bash-pipes-12',
      title: 'Fix Useless Use of cat',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Fix the pipeline that unnecessarily uses cat to feed a file to grep.',
      skeleton: `#!/bin/bash
cat /etc/hosts | grep "localhost"`,
      solution: `#!/bin/bash
grep "localhost" /etc/hosts`,
      hints: ['grep can read files directly -- no cat needed.', 'cat file | grep is a UUOC (Useless Use of Cat).', 'grep "pattern" file'],
      concepts: ['useless-cat', 'grep', 'efficiency'],
    },
    {
      id: 'bash-pipes-13',
      title: 'Fix xargs Quote Issue',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Fix xargs so filenames with spaces are handled correctly.',
      skeleton: `#!/bin/bash
# BUG: filenames with spaces will be split
find /tmp -name "*.txt" | xargs rm`,
      solution: `#!/bin/bash
find /tmp -name "*.txt" -print0 | xargs -0 rm`,
      hints: ['-print0 uses null bytes instead of newlines as separators.', 'xargs -0 reads null-delimited input.', 'find -print0 | xargs -0'],
      concepts: ['xargs', 'null-delimiter', 'filenames-with-spaces'],
    },
    {
      id: 'bash-pipes-14',
      title: 'Refactor Multiple Greps to One Pipeline',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Refactor sequential grep calls reading the same file into a single pipeline.',
      skeleton: `#!/bin/bash
grep "ERROR" app.log > /tmp/errors.txt
grep "WARN" app.log >> /tmp/errors.txt
grep "FATAL" app.log >> /tmp/errors.txt
sort /tmp/errors.txt`,
      solution: `#!/bin/bash
grep -E "ERROR|WARN|FATAL" app.log | sort`,
      hints: ['grep -E supports alternation with |.', 'One grep with -E "ERROR|WARN|FATAL" replaces three greps.', 'Pipe directly to sort.'],
      concepts: ['grep', 'regex-alternation', 'pipeline-refactoring'],
    },
    {
      id: 'bash-pipes-15',
      title: 'Write a Process Monitor',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function find_heavy that prints processes using more than $1 MB of memory.',
      skeleton: `#!/bin/bash
# Write find_heavy function`,
      solution: `#!/bin/bash
find_heavy() {
  local threshold="\$1"
  ps aux | awk -v t="\$threshold" 'NR>1 && \$6/1024 > t {print \$0}'
}
find_heavy 100`,
      hints: ['ps aux column 6 (RSS) is memory in KB.', 'Divide by 1024 to get MB.', 'awk -v t="$threshold" checks each process.'],
      concepts: ['ps', 'awk', 'pipeline', 'process-monitoring'],
    },
    {
      id: 'bash-pipes-16',
      title: 'Predict Pipeline with tr',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Predict the output of this pipeline.',
      skeleton: `#!/bin/bash
echo "Hello World" | tr 'a-z' 'A-Z' | rev`,
      solution: `DLROW OLLEH`,
      hints: ['tr converts lowercase to uppercase: HELLO WORLD.', 'rev reverses the string: DLROW OLLEH.', 'DLROW OLLEH'],
      concepts: ['tr', 'rev', 'pipeline'],
    },
    {
      id: 'bash-pipes-17',
      title: 'Write a Disk Usage Sorter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a one-liner pipeline that shows the top 5 largest directories in /var.',
      skeleton: `#!/bin/bash
# Show top 5 largest directories in /var`,
      solution: `#!/bin/bash
du -sh /var/* 2>/dev/null | sort -rh | head 5`,
      hints: ['du -sh gives human-readable sizes.', 'sort -rh sorts by human-readable size in reverse.', 'head 5 shows the top 5.'],
      concepts: ['du', 'sort', 'head', 'pipeline'],
    },
    {
      id: 'bash-pipes-18',
      title: 'Fix pipefail Not Set',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Fix the script so it detects when cat fails in the pipeline.',
      skeleton: `#!/bin/bash
set -e
cat /nonexistent | grep "pattern" | wc -l
echo "done"`,
      solution: `#!/bin/bash
set -e
set -o pipefail
cat /nonexistent | grep "pattern" | wc -l
echo "done"`,
      hints: ['set -e alone does not catch failures in the middle of a pipeline.', 'set -o pipefail makes the pipeline fail if any stage fails.', 'Add set -o pipefail.'],
      concepts: ['pipefail', 'set-e', 'error-handling'],
    },
    {
      id: 'bash-pipes-19',
      title: 'Write a Unique IP Counter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a pipeline that counts unique IP addresses from an nginx access log ($1).',
      skeleton: `#!/bin/bash
# Count unique IPs in access log`,
      solution: `#!/bin/bash
awk '{print \$1}' "\$1" | sort | uniq -c | sort -rn | head 10`,
      hints: ['awk prints the first field (IP address).', 'sort | uniq -c counts occurrences.', 'sort -rn shows highest first; head 10 shows top 10.'],
      concepts: ['awk', 'sort', 'uniq', 'pipeline'],
    },
    {
      id: 'bash-pipes-20',
      title: 'Refactor to xargs Parallel',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Refactor the sequential curl loop to use xargs for parallel execution.',
      skeleton: `#!/bin/bash
for url in https://a.com https://b.com https://c.com; do
  curl -s -o /dev/null -w "%{http_code} \$url\\n" "\$url"
done`,
      solution: `#!/bin/bash
echo -e "https://a.com\\nhttps://b.com\\nhttps://c.com" |
  xargs -P3 -I{} curl -s -o /dev/null -w "%{http_code} {}\\n" {}`,
      hints: ['-P3 runs 3 parallel curl processes.', '-I{} substitutes the URL into the command.', 'xargs -P enables parallel execution.'],
      concepts: ['xargs', 'parallel', 'refactoring'],
    },
  ],
};
