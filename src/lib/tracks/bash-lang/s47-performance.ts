import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'bash-perf',
  title: '47. Performance',
  explanation: `## Performance in Bash\n\nBash is slower than compiled languages, but many common slowdowns are avoidable.\n\n### Measuring with time\n\n\`\`\`bash\ntime ./script.sh\ntime { for i in {1..1000}; do echo "\$i"; done; }\n\`\`\`\n\n### Avoiding Forks\n\nEvery external command forks a new process. This is expensive:\n\n\`\`\`bash\n# Slow: forks a new process\nlen=\$(echo -n "\$str" | wc -c)\n\n# Fast: built-in string expansion\nlen=\${#str}\n\`\`\`\n\n### Built-in vs External\n\n\`\`\`bash\n# Use built-ins when possible\n[[ ]] not [ ]           # [[ is a built-in keyword\necho vs printf           # echo is built-in\n\${var/old/new}          # vs sed (external)\n\${var^^}                # vs tr (external)\n\`\`\`\n\n### Arrays vs Loops\n\n\`\`\`bash\n# Slow: individual assignments\nfor i in {1..100}; do items[\$i]=\$i; done\n\n# Fast: single command\nitems=(\$(seq 1 100))\n\`\`\`\n\n### Subshell Costs\n\n\`\`\`bash\n# Every \$() creates a subshell\n# Cache expensive results\nif [[ "\$PATH" == *"/usr/local/bin"* ]]; then  # built-in, no subshell\n    echo "Found"\nfi\n\`\`\`\n\n### Profiling\n\n\`\`\`bash\n# Enable timing trace\nPS4='+ \$(date "+%s.%N") '\nbash -x script.sh 2>&1 | grep '+ [0-9]'\n\`\`\``,
  exercises: [
    {
      id: 'bash-perf-1',
      title: 'Measure with time',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Use time to measure how long a loop takes.',
      skeleton: `#!/bin/bash
___ { for i in {1..1000}; do echo "\$i" > /dev/null; done; }`,
      solution: `#!/bin/bash
time { for i in {1..1000}; do echo "\$i" > /dev/null; done; }`,
      hints: ['time measures real, user, and sys time.', 'time { ... } times a block of commands.', 'time'],
      concepts: ['time', 'benchmarking'],
    },
    {
      id: 'bash-perf-2',
      title: 'Built-in String Length',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Use the built-in string length expansion instead of wc.',
      skeleton: `#!/bin/bash
str="Hello, World!"
# Fast built-in way:
len=___
echo "\$len"`,
      solution: `#!/bin/bash
str="Hello, World!"
len=\${#str}
echo "\$len"`,
      hints: ['${#var} gives the string length without forking.', 'Much faster than $(echo "$str" | wc -c).', '\${#str}'],
      concepts: ['string-length', 'built-in', 'no-fork'],
    },
    {
      id: 'bash-perf-3',
      title: 'Built-in String Replace',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Replace all spaces in a string using built-in expansion instead of sed.',
      skeleton: `#!/bin/bash
str="hello world foo bar"
# Replace spaces with underscores (built-in, no fork)
result=\${str___' '___'_'}
echo "\$result"`,
      solution: `#!/bin/bash
str="hello world foo bar"
result=\${str// /_}
echo "\$result"`,
      hints: ['${var//pattern/replacement} replaces all occurrences.', 'No fork needed -- it is a built-in expansion.', '\${str// /_}'],
      concepts: ['string-replace', 'parameter-expansion', 'no-fork'],
    },
    {
      id: 'bash-perf-4',
      title: 'Built-in Uppercase',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Convert a string to uppercase using built-in expansion instead of tr.',
      skeleton: `#!/bin/bash
str="hello world"
# Built-in uppercase (bash 4+):
upper=\${str___}
echo "\$upper"`,
      solution: `#!/bin/bash
str="hello world"
upper=\${str^^}
echo "\$upper"`,
      hints: ['${var^^} converts to uppercase in bash 4+.', 'Much faster than echo "$str" | tr a-z A-Z.', '\${str^^}'],
      concepts: ['uppercase', 'parameter-expansion', 'built-in'],
    },
    {
      id: 'bash-perf-5',
      title: 'Avoid Subshell in Condition',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Check if a string contains a substring without a subshell.',
      skeleton: `#!/bin/bash
path="/usr/local/bin:/usr/bin:/bin"
# Built-in check, no fork:
if [[ "\$path" ___ *"/usr/local"* ]]; then
    echo "found"
fi`,
      solution: `#!/bin/bash
path="/usr/local/bin:/usr/bin:/bin"
if [[ "\$path" == *"/usr/local"* ]]; then
    echo "found"
fi`,
      hints: ['[[ ]] supports glob patterns on the right side.', 'No subshell needed -- [[ is a built-in keyword.', '== *pattern*'],
      concepts: ['[[-builtin', 'glob-match', 'no-subshell'],
    },
    {
      id: 'bash-perf-6',
      title: 'Write a Benchmarker',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function bench that runs a command N times and reports average time.',
      skeleton: `#!/bin/bash
# Write bench N command function`,
      solution: `#!/bin/bash
bench() {
  local n="\$1"
  shift
  local start=\$(date +%s%N)
  for ((i=0; i<n; i++)); do
    "\$@" > /dev/null 2>&1
  done
  local end=\$(date +%s%N)
  local total_ms=\$(( (end - start) / 1000000 ))
  local avg_ms=\$(( total_ms / n ))
  echo "Ran \$n times. Total: \${total_ms}ms, Avg: \${avg_ms}ms"
}
bench 100 echo "test"`,
      hints: ['date +%s%N gives nanoseconds.', 'Run in a loop N times and measure total.', 'Divide by N for average.'],
      concepts: ['benchmarking', 'time', 'loops'],
    },
    {
      id: 'bash-perf-7',
      title: 'Write a No-Fork Word Count',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function count_words that counts words in a string using only built-ins (no wc).',
      skeleton: `#!/bin/bash
# Write count_words string function`,
      solution: `#!/bin/bash
count_words() {
  local str="\$1"
  local arr=(\$str)
  echo "\${#arr[@]}"
}
count_words "hello world foo bar"`,
      hints: ['Assign to an array with arr=($str) -- word-splits by whitespace.', '${#arr[@]} gives the element count.', 'No external commands needed.'],
      concepts: ['word-count', 'arrays', 'no-fork'],
    },
    {
      id: 'bash-perf-8',
      title: 'Write a Cached Result Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function get_hostname that caches the hostname so the expensive command only runs once.',
      skeleton: `#!/bin/bash
# Write get_hostname with caching`,
      solution: `#!/bin/bash
_cached_hostname=""

get_hostname() {
  if [ -z "\$_cached_hostname" ]; then
    _cached_hostname=\$(hostname -f)
  fi
  echo "\$_cached_hostname"
}

echo "\$(get_hostname)"
echo "\$(get_hostname)"   # returns cached value`,
      hints: ['Store result in a global variable on first call.', 'Check if cache is empty with [ -z "$cache" ].', 'Subsequent calls return cached value without forking.'],
      concepts: ['caching', 'memoization', 'performance'],
    },
    {
      id: 'bash-perf-9',
      title: 'Predict Fork Cost',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Which approach is faster: built-in or external command?',
      skeleton: `#!/bin/bash
# A: built-in
str="hello"
len=\${#str}

# B: external
len2=\$(echo -n "\$str" | wc -c)

# Which is faster?`,
      solution: 'A is faster. ${#str} is a built-in with no fork. $(echo | wc -c) creates two subprocesses.',
      hints: ['Built-in operations happen in the current shell.', 'Each external command requires fork() + exec().', '${#str} avoids all subprocess overhead.'],
      concepts: ['fork-cost', 'built-in', 'performance'],
    },
    {
      id: 'bash-perf-10',
      title: 'Predict Subshell Count',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Count how many subshells/forks this code creates.',
      skeleton: `#!/bin/bash
result=\$(echo "hello" | tr 'a-z' 'A-Z' | sed 's/O/0/g')
echo "\$result"`,
      solution: `HELL0`,
      hints: ['echo | tr | sed creates 3 subprocesses plus the pipeline subshell.', 'But the output is HELLO -> with O replaced by 0 -> HELL0.', 'HELL0'],
      concepts: ['pipeline', 'subshell', 'tr', 'sed'],
    },
    {
      id: 'bash-perf-11',
      title: 'Fix Slow Loop with External Commands',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Refactor the slow loop that calls external commands to use built-ins.',
      skeleton: `#!/bin/bash
for word in one two three four five; do
  upper=\$(echo "\$word" | tr 'a-z' 'A-Z')
  len=\$(echo -n "\$word" | wc -c)
  echo "\$upper (\$len)"
done`,
      solution: `#!/bin/bash
for word in one two three four five; do
  upper=\${word^^}
  len=\${#word}
  echo "\$upper (\$len)"
done`,
      hints: ['${word^^} converts to uppercase without a fork.', '${#word} gives length without forking.', 'Both are built-in parameter expansions.'],
      concepts: ['built-in', 'parameter-expansion', 'performance'],
    },
    {
      id: 'bash-perf-12',
      title: 'Fix Repeated Expensive Call',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Fix the function that calls hostname repeatedly when it only needs to call it once.',
      skeleton: `#!/bin/bash
log() {
  echo "[$(hostname -f)] \$1"
}
log "Starting"
log "Processing"
log "Done"`,
      solution: `#!/bin/bash
_hostname=\$(hostname -f)
log() {
  echo "[\$_hostname] \$1"
}
log "Starting"
log "Processing"
log "Done"`,
      hints: ['Cache hostname in a variable outside the function.', 'Each $(hostname -f) spawns a subprocess.', 'Call it once, store the result.'],
      concepts: ['caching', 'performance', 'subshell'],
    },
    {
      id: 'bash-perf-13',
      title: 'Write a String Contains Built-in',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function contains that checks if a string contains a substring using only built-ins.',
      skeleton: `#!/bin/bash
# Write contains haystack needle function`,
      solution: `#!/bin/bash
contains() {
  [[ "\$1" == *"\$2"* ]]
}
contains "hello world" "world" && echo "found"
contains "hello world" "xyz" || echo "not found"`,
      hints: ['[[ $str == *needle* ]] is a glob pattern match.', 'No grep, no subshell needed.', '[[ "$1" == *"$2"* ]]'],
      concepts: ['string-contains', 'glob-match', 'built-in'],
    },
    {
      id: 'bash-perf-14',
      title: 'Refactor External to Built-in Operations',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Refactor these external command calls to use built-in parameter expansions.',
      skeleton: `#!/bin/bash
filename="/path/to/file.txt"
basename=\$(basename "\$filename")
dirname=\$(dirname "\$filename")
extension=\$(echo "\$basename" | sed 's/.*\\.//')
echo "\$basename \$dirname \$extension"`,
      solution: `#!/bin/bash
filename="/path/to/file.txt"
basename=\${filename##*/}
dirname=\${filename%/*}
extension=\${filename##*.}
echo "\$basename \$dirname \$extension"`,
      hints: ['${var##*/} strips path, giving basename.', '${var%/*} strips filename, giving dirname.', '${var##*.} gives the extension.'],
      concepts: ['parameter-expansion', 'basename', 'dirname', 'no-fork'],
    },
    {
      id: 'bash-perf-15',
      title: 'Write a Profiled Script',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a script that uses PS4 and bash -x timestamps to profile which lines are slow.',
      skeleton: `#!/bin/bash
# Write a profiling wrapper`,
      solution: `#!/bin/bash
profile() {
  local script="\$1"
  PS4='+ \$(date "+%s.%3N") ' bash -x "\$script" 2>&1 | head -50
}
# Demo: create a test script and profile it
cat > /tmp/test_profile.sh << 'EOF'
hostname
echo "hello"
sleep 0.1
echo "done"
EOF
chmod +x /tmp/test_profile.sh
profile /tmp/test_profile.sh`,
      hints: ['PS4 is the trace prefix for set -x.', 'date "+%s.%3N" gives seconds.milliseconds.', 'bash -x runs the script with tracing enabled.'],
      concepts: ['profiling', 'PS4', 'bash-x', 'trace'],
    },
    {
      id: 'bash-perf-16',
      title: 'Predict Built-in vs External Speed',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict which expression runs faster and why.',
      skeleton: `#!/bin/bash
str="Hello World"
# A:
if [[ "\$str" == *"World"* ]]; then echo "A"; fi
# B:
if echo "\$str" | grep -q "World"; then echo "B"; fi`,
      solution: `A\nB`,
      hints: ['Both print their letter, but A is much faster.', 'A uses no forks; B creates echo + grep subprocesses.', 'Both produce the same output but A has better performance.'],
      concepts: ['built-in', 'grep', 'performance-comparison'],
    },
    {
      id: 'bash-perf-17',
      title: 'Write a Batch File Processor',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function batch_rename that renames files using only built-in operations, avoiding external commands in the loop.',
      skeleton: `#!/bin/bash
# Rename *.TXT to *.txt using built-ins`,
      solution: `#!/bin/bash
batch_rename() {
  local dir="\${1:-.}"
  for f in "\$dir"/*.TXT; do
    [ -f "\$f" ] || continue
    local base="\${f%.TXT}"
    mv "\$f" "\${base}.txt"
  done
}
batch_rename /tmp`,
      hints: ['${f%.TXT} strips the .TXT suffix.', 'No external tr or sed needed.', 'Just built-in parameter expansion + mv.'],
      concepts: ['parameter-expansion', 'rename', 'batch-processing'],
    },
    {
      id: 'bash-perf-18',
      title: 'Fix Slow Array Builder',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Fix the slow array builder that appends one element at a time with a fork.',
      skeleton: `#!/bin/bash
# Slow: forks a process for each element
arr=()
for i in {1..100}; do
  arr+=(\$(echo "\$i"))
done
echo "\${#arr[@]}"`,
      solution: `#!/bin/bash
arr=(\$(seq 1 100))
echo "\${#arr[@]}"`,
      hints: ['Build the array in one shot with arr=($(...)).', 'seq 1 100 generates 1 to 100 in one fork.', 'Avoids 100 echo forks.'],
      concepts: ['arrays', 'performance', 'seq'],
    },
    {
      id: 'bash-perf-19',
      title: 'Refactor Repeated grep to Single Pass',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Refactor multiple grep passes over the same file to a single awk pass.',
      skeleton: `#!/bin/bash
errors=\$(grep "ERROR" app.log | wc -l)
warnings=\$(grep "WARN" app.log | wc -l)
infos=\$(grep "INFO" app.log | wc -l)
echo "E:\$errors W:\$warnings I:\$infos"`,
      solution: `#!/bin/bash
read errors warnings infos < <(
  awk '/ERROR/{e++} /WARN/{w++} /INFO/{i++} END{print e+0, w+0, i+0}' app.log
)
echo "E:\$errors W:\$warnings I:\$infos"`,
      hints: ['One awk pass counts all patterns simultaneously.', 'Use read ... < <(awk ...) to capture multiple values.', 'Three grep passes = 3 file reads; awk does one.'],
      concepts: ['awk', 'single-pass', 'performance', 'refactoring'],
    },
    {
      id: 'bash-perf-20',
      title: 'Write a Memoized Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function memoize that wraps any function and caches its result based on arguments.',
      skeleton: `#!/bin/bash
# Write memoize wrapper`,
      solution: `#!/bin/bash
declare -A _memo_cache

memoize() {
  local fn="\$1"
  shift
  local key="\${fn}:\$*"
  if [ -z "\${_memo_cache[\$key]+set}" ]; then
    _memo_cache["\$key"]=\$("\$fn" "\$@")
  fi
  echo "\${_memo_cache[\$key]}"
}

slow_double() {
  sleep 0.5
  echo \$((\$1 * 2))
}

echo "\$(memoize slow_double 5)"  # computed
echo "\$(memoize slow_double 5)"  # cached
echo "\$(memoize slow_double 3)"  # computed`,
      hints: ['Use an associative array for the cache.', 'Build the cache key from function name + args.', '${cache[$key]+set} checks if the key exists.'],
      concepts: ['memoization', 'caching', 'associative-arrays'],
    },
  ],
};
