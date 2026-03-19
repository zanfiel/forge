import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'bash-procsub',
  title: '13. Process Substitution',
  explanation: `## Process Substitution\n\nProcess substitution lets you use the output of a command as if it were a file. Bash creates a temporary file descriptor.\n\n### Input Form: <(command)\n\n\`\`\`bash\ndiff <(sort file1.txt) <(sort file2.txt)    # diff sorted versions\ncomm <(sort list1) <(sort list2)             # common/unique lines\n\`\`\`\n\nThe shell replaces \`<(cmd)\` with a path like \`/dev/fd/63\`, which cmd writes to.\n\n### Output Form: >(command)\n\n\`\`\`bash\ntee >(grep "ERROR" > errors.log) < input.txt\n# Splits stream: full input passes through, errors go to errors.log\n\`\`\`\n\n### Comparison with Pipes\n\n| Feature | Pipe | Process Substitution |\n|---------|------|----------------------|\n| Subshell | Yes | Yes |\n| Can use as filename | No | Yes |\n| Multiple inputs | No | Yes |\n| Random access | No | No |\n\n### while read with Process Substitution\n\n\`\`\`bash\n# Variables persist outside loop (unlike piped while read)\nwhile IFS= read -r line; do\n    count=\$((count + 1))\ndone < <(find . -name "*.sh")\necho "\$count"\n\`\`\`\n\nCritical difference: \`cmd | while read\` runs while in a subshell (variables lost). \`while read < <(cmd)\` runs in current shell.`,
  exercises: [
    {
      id: 'bash-procsub-1',
      title: 'diff with Process Substitution',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Use process substitution to diff two sorted files without creating temp files.',
      skeleton: `#!/bin/bash
diff ___(sort file1.txt) ___(sort file2.txt)`,
      solution: `#!/bin/bash
diff <(sort file1.txt) <(sort file2.txt)`,
      hints: ['<(cmd) provides the command output as a file descriptor.', 'diff can take two process substitutions.', '<(sort file1.txt) <(sort file2.txt)'],
      concepts: ['process-substitution', 'diff'],
    },
    {
      id: 'bash-procsub-2',
      title: 'while read with Process Sub',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Use process substitution with while read so variables persist after the loop.',
      skeleton: `#!/bin/bash
count=0
while IFS= read -r line; do
  count=\$((count + 1))
done ___ ___(find /etc -name "*.conf" 2>/dev/null)
echo "Found: \$count"`,
      solution: `#!/bin/bash
count=0
while IFS= read -r line; do
  count=\$((count + 1))
done < <(find /etc -name "*.conf" 2>/dev/null)
echo "Found: \$count"`,
      hints: ['< <(cmd) feeds process substitution to the while loop.', 'Variables modified in the loop are visible after it.', '< <(find ...)'],
      concepts: ['process-substitution', 'while-read', 'subshell'],
    },
    {
      id: 'bash-procsub-3',
      title: 'comm with Sorted Inputs',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Use process substitution to find lines unique to list1 (not in list2).',
      skeleton: `#!/bin/bash
# -23 shows lines only in file1
comm -23 ___(sort list1.txt) ___(sort list2.txt)`,
      solution: `#!/bin/bash
comm -23 <(sort list1.txt) <(sort list2.txt)`,
      hints: ['comm requires sorted inputs.', '<(sort ...) sorts inline without temp files.', '-23 suppresses columns 2 and 3 (shared and list2-only).'],
      concepts: ['comm', 'process-substitution', 'set-operations'],
    },
    {
      id: 'bash-procsub-4',
      title: 'tee with Output Process Substitution',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Use tee with >(cmd) to split output: full log goes to all.log, errors to err.log.',
      skeleton: `#!/bin/bash
./app 2>&1 | tee ___(grep "ERROR" > err.log) > all.log`,
      solution: `#!/bin/bash
./app 2>&1 | tee >(grep "ERROR" > err.log) > all.log`,
      hints: ['>(cmd) receives the tee output as stdin of cmd.', 'tee outputs to both stdout and the process substitution.', '>(grep "ERROR" > err.log)'],
      concepts: ['process-substitution-output', 'tee', 'stream-splitting'],
    },
    {
      id: 'bash-procsub-5',
      title: 'Write a Diff Wrapper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function sorted_diff that takes two files and diffs their sorted content.',
      skeleton: `#!/bin/bash
# Write sorted_diff function`,
      solution: `#!/bin/bash
sorted_diff() {
  diff <(sort "\$1") <(sort "\$2")
}
sorted_diff /etc/hosts /etc/hostname`,
      hints: ['Use diff <(sort "$1") <(sort "$2").', 'Process substitutions are created fresh each call.', '"$1" and "$2" are the two file arguments.'],
      concepts: ['process-substitution', 'diff', 'functions'],
    },
    {
      id: 'bash-procsub-6',
      title: 'Write a Line Counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function count_matches that counts files matching a pattern in a directory ($1) using while read with process substitution.',
      skeleton: `#!/bin/bash
# Write count_matches dir pattern`,
      solution: `#!/bin/bash
count_matches() {
  local dir="\$1"
  local pattern="\$2"
  local count=0
  while IFS= read -r file; do
    count=\$((count + 1))
  done < <(find "\$dir" -name "\$pattern" 2>/dev/null)
  echo "\$count"
}
count_matches /etc "*.conf"`,
      hints: ['Use < <(find ...) so $count is accessible after the loop.', 'Piping to while read would lose $count (subshell).', 'done < <(find "$dir" -name "$pattern")'],
      concepts: ['process-substitution', 'while-read', 'find'],
    },
    {
      id: 'bash-procsub-7',
      title: 'Predict Variable Scope Difference',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Predict which version retains the count variable after the loop.',
      skeleton: `#!/bin/bash
count=0
echo -e "a\\nb\\nc" | while read line; do
  count=\$((count + 1))
done
echo "pipe: \$count"

count=0
while read line; do
  count=\$((count + 1))
done < <(echo -e "a\\nb\\nc")
echo "procsub: \$count"`,
      solution: `pipe: 0\nprocsub: 3`,
      hints: ['Piped while runs in a subshell; count changes are lost.', 'Process substitution while runs in current shell.', 'pipe: 0, procsub: 3'],
      concepts: ['subshell', 'variable-scope', 'process-substitution'],
    },
    {
      id: 'bash-procsub-8',
      title: 'Predict Process Substitution Path',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict what type of path is passed to cat when using process substitution.',
      skeleton: `#!/bin/bash
file=<(echo "hello")
echo "\$file" | grep -o "/dev/fd/[0-9]*" || echo "/proc/self/fd path"`,
      solution: `/dev/fd path`,
      hints: ['Process substitution provides a /dev/fd/N or /proc/self/fd/N path.', 'The exact path varies by OS.', 'A file descriptor path is substituted.'],
      concepts: ['process-substitution', 'file-descriptors'],
    },
    {
      id: 'bash-procsub-9',
      title: 'Fix Piped while Variable Loss',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Fix the script where $total is 0 after the loop due to subshell variable loss.',
      skeleton: `#!/bin/bash
total=0
find /tmp -name "*.log" | while IFS= read -r f; do
  size=\$(wc -c < "\$f")
  total=\$((total + size))
done
echo "Total bytes: \$total"   # BUG: always 0`,
      solution: `#!/bin/bash
total=0
while IFS= read -r f; do
  size=\$(wc -c < "\$f")
  total=\$((total + size))
done < <(find /tmp -name "*.log")
echo "Total bytes: \$total"`,
      hints: ['Piped while runs in a subshell -- $total changes are lost.', 'Use while ... done < <(find ...) instead.', 'Move find into process substitution on the right.'],
      concepts: ['process-substitution', 'subshell-bug', 'variable-scope'],
    },
    {
      id: 'bash-procsub-10',
      title: 'Write a Set Intersection',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function intersect that prints lines common to both files using comm and process substitution.',
      skeleton: `#!/bin/bash
# Write intersect function`,
      solution: `#!/bin/bash
intersect() {
  comm -12 <(sort "\$1") <(sort "\$2")
}
echo -e "apple\\nbanana\\ncherry" > /tmp/a.txt
echo -e "banana\\ncherry\\ndate" > /tmp/b.txt
intersect /tmp/a.txt /tmp/b.txt`,
      hints: ['comm -12 shows only lines in both files.', 'Both inputs must be sorted -- use <(sort ...).', 'comm -12 <(sort "$1") <(sort "$2")'],
      concepts: ['comm', 'process-substitution', 'set-intersection'],
    },
    {
      id: 'bash-procsub-11',
      title: 'Write a Parallel Validator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a script that uses tee with multiple process substitutions to validate data in different ways simultaneously.',
      skeleton: `#!/bin/bash
# Validate: check non-empty and check for numbers-only lines`,
      solution: `#!/bin/bash
echo -e "123\\nabc\\n456\\n\\n789" |
  tee >(grep -c "^$" | xargs -I{} echo "Empty lines: {}") \
      >(grep -c "^[0-9]*$" | xargs -I{} echo "Number lines: {}") \
  > /dev/null`,
      hints: ['tee >(cmd1) >(cmd2) sends stdin to both processes.', '> /dev/null discards the main tee output.', 'Each process substitution processes the stream independently.'],
      concepts: ['tee', 'process-substitution-output', 'parallel-processing'],
    },
    {
      id: 'bash-procsub-12',
      title: 'Refactor Temp File to Process Substitution',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Refactor the script to remove the temp file by using process substitution.',
      skeleton: `#!/bin/bash
sort file1.txt > /tmp/sorted1.txt
sort file2.txt > /tmp/sorted2.txt
diff /tmp/sorted1.txt /tmp/sorted2.txt
rm /tmp/sorted1.txt /tmp/sorted2.txt`,
      solution: `#!/bin/bash
diff <(sort file1.txt) <(sort file2.txt)`,
      hints: ['<(sort file.txt) replaces sort-to-temp-file pattern.', 'diff <(sort f1) <(sort f2) does the same in one line.', 'No temp files, no cleanup needed.'],
      concepts: ['process-substitution', 'refactoring', 'temp-file-elimination'],
    },
    {
      id: 'bash-procsub-13',
      title: 'Predict comm Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict the output of this comm command with process substitution.',
      skeleton: `#!/bin/bash
comm -12 <(echo -e "apple\\nbanana\\ncherry") <(echo -e "banana\\ncherry\\ndate")`,
      solution: `banana\ncherry`,
      hints: ['comm -12 shows lines common to both.', 'Both lists must be sorted -- they already are here.', 'banana and cherry appear in both.'],
      concepts: ['comm', 'process-substitution', 'set-intersection'],
    },
    {
      id: 'bash-procsub-14',
      title: 'Write a Config Merger',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function merge_configs that merges two config files (KEY=VALUE format) with the second file overriding the first.',
      skeleton: `#!/bin/bash
# Write merge_configs file1 file2`,
      solution: `#!/bin/bash
merge_configs() {
  local f1="\$1"
  local f2="\$2"
  comm -23 <(sort "\$f1") <(sort "\$f2" | cut -d= -f1 | sort) < <(sort "\$f1") | cat - "\$f2" | sort -u -t= -k1,1
}`,
      hints: ['This is complex -- use sort and comm to find unique keys from f1.', 'Keys from f2 take priority.', 'sort -u -t= -k1,1 deduplicates by key.'],
      concepts: ['process-substitution', 'sort', 'comm', 'config-management'],
    },
    {
      id: 'bash-procsub-15',
      title: 'Fix Missing Space in < <()',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Fix the process substitution syntax error (missing space between < and <).',
      skeleton: `#!/bin/bash
count=0
while IFS= read -r line; do
  count=\$((count + 1))
done <<(echo -e "a\\nb\\nc")
echo "\$count"`,
      solution: `#!/bin/bash
count=0
while IFS= read -r line; do
  count=\$((count + 1))
done < <(echo -e "a\nb\nc")
echo "\$count"`,
      hints: ['< <(cmd) needs a space between < and <(.', '<<(cmd) is a heredoc syntax, not process substitution.', 'done < <(echo ...)'],
      concepts: ['process-substitution', 'syntax'],
    },
    {
      id: 'bash-procsub-16',
      title: 'Predict tee with Process Sub',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Predict how many lines end up in each destination.',
      skeleton: `#!/bin/bash
echo -e "INFO: ok\\nERROR: bad\\nINFO: fine" |
  tee >(grep "ERROR" > /tmp/err.txt) > /tmp/all.txt
wc -l < /tmp/all.txt
wc -l < /tmp/err.txt`,
      solution: `3\n1`,
      hints: ['All 3 lines go to /tmp/all.txt via stdout.', 'Only the ERROR line goes to /tmp/err.txt.', '3 then 1.'],
      concepts: ['tee', 'process-substitution-output', 'stream-splitting'],
    },
    {
      id: 'bash-procsub-17',
      title: 'Write a Unique-in-First Finder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function only_in_first that prints lines in file $1 that are not in file $2.',
      skeleton: `#!/bin/bash
# Write only_in_first function`,
      solution: `#!/bin/bash
only_in_first() {
  comm -23 <(sort "\$1") <(sort "\$2")
}
echo -e "apple\\nbanana\\ncherry" > /tmp/f1.txt
echo -e "banana\\ndate" > /tmp/f2.txt
only_in_first /tmp/f1.txt /tmp/f2.txt`,
      hints: ['comm -23 shows only lines unique to the first file.', '<(sort "$1") sorts inline.', 'comm -23 <(sort "$1") <(sort "$2")'],
      concepts: ['comm', 'process-substitution', 'set-difference'],
    },
    {
      id: 'bash-procsub-18',
      title: 'Refactor Loop to Process Sub',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Refactor the piped while loop so the counter variable is accessible after the loop.',
      skeleton: `#!/bin/bash
counter=0
ls /etc/*.conf 2>/dev/null | while read f; do
  counter=\$((counter + 1))
done
echo "Count: \$counter"  # Bug: always 0`,
      solution: `#!/bin/bash
counter=0
while read f; do
  counter=\$((counter + 1))
done < <(ls /etc/*.conf 2>/dev/null)
echo "Count: \$counter"`,
      hints: ['Move the command generating output into < <(...).', 'This runs while in the current shell, not a subshell.', 'done < <(ls /etc/*.conf 2>/dev/null)'],
      concepts: ['process-substitution', 'variable-scope', 'refactoring'],
    },
    {
      id: 'bash-procsub-19',
      title: 'Write a Side-by-Side Differ',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function sdiff_sorted that shows a side-by-side diff of two sorted files.',
      skeleton: `#!/bin/bash
# Write sdiff_sorted function`,
      solution: `#!/bin/bash
sdiff_sorted() {
  sdiff <(sort "\$1") <(sort "\$2")
}
echo -e "apple\\ncherry" > /tmp/left.txt
echo -e "banana\\ncherry" > /tmp/right.txt
sdiff_sorted /tmp/left.txt /tmp/right.txt`,
      hints: ['sdiff shows a side-by-side diff.', 'Use <(sort ...) to sort inputs inline.', 'sdiff <(sort "$1") <(sort "$2")'],
      concepts: ['sdiff', 'process-substitution'],
    },
    {
      id: 'bash-procsub-20',
      title: 'Write a Multi-Source Aggregator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a script that aggregates output from multiple commands using cat with process substitutions.',
      skeleton: `#!/bin/bash
# Combine output from three commands into one sorted unique list`,
      solution: `#!/bin/bash
aggregate() {
  cat <(echo "from-a"; seq 1 5) \
      <(echo "from-b"; seq 3 7) \
      <(echo "from-c"; seq 5 9) | sort | uniq
}
aggregate`,
      hints: ['cat accepts multiple process substitutions.', 'cat <(cmd1) <(cmd2) <(cmd3) merges all outputs.', 'Pipe to sort | uniq for deduplication.'],
      concepts: ['process-substitution', 'cat', 'aggregation'],
    },
  ],
};
