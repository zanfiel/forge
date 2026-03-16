/**
 * bash.ts - Complete Bash learning track
 *
 * 5 sections, 14 exercises. Progresses from variables through process management.
 * Exercises use real-world examples: server automation, log parsing, config management.
 * All patterns are shellcheck-clean and follow modern bash idioms.
 */

import type { Track } from '../../stores/app.svelte.ts';

export const track: Track = {
  id: 'bash',
  name: 'Bash',
  language: 'bash',
  monacoLang: 'shell',
  icon: '\u{1F5A5}\uFE0F',
  description: 'The shell that powers Linux. Automation, scripting, and system administration.',
  sections: [
    {
      id: 'sh-variables',
      title: '1. Variables & Quoting',
      explanation: `## Variables & Quoting

Variables in bash have **no spaces** around the \`=\` sign and are referenced with \`$\`:

\`\`\`bash
name="rocky"
port=4200
echo "Server: $name on port $port"
\`\`\`

**Quoting rules -- the #1 source of bash bugs:**
\`\`\`bash
# Double quotes: variables expand, spaces preserved
echo "$name"         # rocky

# Single quotes: everything is literal, no expansion
echo '$name'         # $name (literally)

# No quotes: word splitting happens -- DANGEROUS
file="my file.txt"
rm $file             # tries to remove "my" and "file.txt" -- BAD
rm "$file"           # removes "my file.txt" -- CORRECT
\`\`\`

**Always double-quote your variables.** This is the single most important bash habit.

**Parameter expansion:**
\`\`\`bash
name="pangolin"
echo "\${name^^}"        # PANGOLIN (uppercase)
echo "\${name:0:4}"      # pang (substring)
echo "\${name/lin/LIN}"  # pangoLIN (substitution)

path="/opt/engram/config.json"
echo "\${path##*/}"      # config.json (basename)
echo "\${path%/*}"       # /opt/engram (dirname)
\`\`\`

**Command substitution:**
\`\`\`bash
today=$(date +%Y-%m-%d)
file_count=$(ls -1 | wc -l)
echo "Today is $today, $file_count files here"
\`\`\``,
      exercises: [
        {
          id: 'sh-var-1',
          title: 'Variable Basics',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'bash',
          goal: 'Declare variables and use double quotes to safely expand them in echo statements.',
          skeleton: `#!/bin/bash

# Assign variables (no spaces around =)
server_name=__BLANK__
ip_address=__BLANK__
port=__BLANK__

# Print using double-quoted expansion
echo __BLANK__"$server_name is at $ip_address on port $port"__BLANK__

# Command substitution: capture today's date
today=$(__BLANK__)

echo "Deploy date: $today"`,
          solution: `#!/bin/bash

# Assign variables (no spaces around =)
server_name="rocky"
ip_address="192.168.8.133"
port=22

# Print using double-quoted expansion
echo "$server_name is at $ip_address on port $port"

# Command substitution: capture today's date
today=$(date +%Y-%m-%d)

echo "Deploy date: $today"`,
          hints: [
            'String values need quotes: `server_name="rocky"`. Numbers can be bare: `port=22`. Never put spaces around `=`.',
            'Double quotes preserve variable expansion: `echo "$var"` is always safer than `echo $var`.',
            'Command substitution uses `$(command)`: `today=$(date +%Y-%m-%d)` runs `date` and captures its output.',
          ],
          concepts: ['variable assignment', 'double quoting', 'command substitution', 'echo'],
        },
        {
          id: 'sh-var-2',
          title: 'Quoting Rules',
          type: 'predict-output',
          difficulty: 'beginner',
          language: 'bash',
          goal: 'Predict what each echo statement prints. Pay close attention to single vs double quotes and unquoted variables.',
          skeleton: `#!/bin/bash

name="pangolin"
count=3

# What does each line print?
echo "Server: $name"
echo 'Server: $name'
echo "There are $count servers"
echo "Path: \${name^^}"
echo "Short: \${name:0:4}"`,
          solution: `#!/bin/bash

# Line-by-line output:
# echo "Server: $name"       -> Server: pangolin
# echo 'Server: $name'       -> Server: $name
# echo "There are $count servers"  -> There are 3 servers
# echo "Path: \${name^^}"    -> Path: PANGOLIN
# echo "Short: \${name:0:4}" -> Short: pang`,
          hints: [
            'Double quotes expand variables (`$name` becomes `pangolin`). Single quotes do NOT -- everything is literal.',
            '`${name^^}` converts to uppercase. `${name:0:4}` extracts a substring starting at index 0, length 4.',
            'Output in order: `Server: pangolin`, `Server: $name`, `There are 3 servers`, `Path: PANGOLIN`, `Short: pang`.',
          ],
          concepts: ['single vs double quotes', 'parameter expansion', 'uppercase', 'substring'],
        },
        {
          id: 'sh-var-3',
          title: 'Parameter Expansion',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'bash',
          goal: 'Use parameter expansion to manipulate strings: extract filename, extension, provide defaults, and do substitution.',
          skeleton: `#!/bin/bash

filepath="/opt/engram/logs/access.log"

# Extract just the filename (access.log) using ##*/
filename="__BLANK__"

# Extract the directory (/opt/engram/logs) using %/*
dirpath="__BLANK__"

# Extract extension (log) using ##*.
ext="__BLANK__"

# Provide a default value if a variable is unset
# If $DEPLOY_ENV is unset, default to "production"
env="__BLANK__"

# Replace "engram" with "synapse" in filepath
swapped="__BLANK__"

echo "File: $filename"
echo "Dir: $dirpath"
echo "Ext: $ext"
echo "Env: $env"
echo "Swapped: $swapped"`,
          solution: `#!/bin/bash

filepath="/opt/engram/logs/access.log"

# Extract just the filename (access.log) using ##*/
filename="\${filepath##*/}"

# Extract the directory (/opt/engram/logs) using %/*
dirpath="\${filepath%/*}"

# Extract extension (log) using ##*.
ext="\${filepath##*.}"

# Provide a default value if a variable is unset
# If $DEPLOY_ENV is unset, default to "production"
env="\${DEPLOY_ENV:-production}"

# Replace "engram" with "synapse" in filepath
swapped="\${filepath/engram/synapse}"

echo "File: $filename"
echo "Dir: $dirpath"
echo "Ext: $ext"
echo "Env: $env"
echo "Swapped: $swapped"`,
          hints: [
            '`${var##*/}` strips everything up to the last `/` (greedy from left). `${var%/*}` strips from the last `/` onward (from right).',
            '`${var:-default}` returns `default` if `var` is unset or empty. Great for environment variable fallbacks.',
            '`${var/pattern/replacement}` replaces the first match. `${var##*.}` strips everything up to the last `.` to get the extension.',
          ],
          concepts: ['parameter expansion', 'string stripping', 'default values', 'string substitution', 'basename', 'dirname'],
        },
      ],
    },
    {
      id: 'sh-control',
      title: '2. Control Flow',
      explanation: `## Control Flow

Bash uses \`[[ ]]\` for conditionals (prefer over \`[ ]\` -- it handles spaces better and supports regex):

\`\`\`bash
if [[ "$status" == "running" ]]; then
    echo "Service is up"
elif [[ "$status" == "stopped" ]]; then
    echo "Service is down"
else
    echo "Unknown status: $status"
fi
\`\`\`

**Numeric comparisons use \`-eq\`, \`-lt\`, \`-gt\`, \`-le\`, \`-ge\`, \`-ne\`:**
\`\`\`bash
if [[ "$count" -gt 10 ]]; then
    echo "Too many"
fi
\`\`\`

**For loops:**
\`\`\`bash
# Iterate over a list
for server in rocky pangolin ovh-vps; do
    echo "Checking $server..."
done

# C-style numeric loop
for ((i = 0; i < 5; i++)); do
    echo "Attempt $i"
done

# Loop over files
for f in /var/log/*.log; do
    echo "Log file: $f"
done
\`\`\`

**While loops:**
\`\`\`bash
count=0
while [[ "$count" -lt 5 ]]; do
    echo "Retry $count"
    ((count++))
done
\`\`\`

**Case statements** (bash's pattern-matching switch):
\`\`\`bash
case "$action" in
    start)   systemctl start "$service" ;;
    stop)    systemctl stop "$service" ;;
    restart) systemctl restart "$service" ;;
    *)       echo "Unknown action: $action" ;;
esac
\`\`\``,
      exercises: [
        {
          id: 'sh-ctrl-1',
          title: 'If/Elif/Else',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'bash',
          goal: 'Complete a script that checks disk usage percentage and prints a status message based on thresholds.',
          skeleton: `#!/bin/bash

usage=85

__BLANK__ [[ "$usage" __BLANK__ 90 ]]; __BLANK__
    echo "CRITICAL: Disk usage at $usage%"
__BLANK__ [[ "$usage" __BLANK__ 70 ]]; then
    echo "WARNING: Disk usage at $usage%"
__BLANK__
    echo "OK: Disk usage at $usage%"
__BLANK__`,
          solution: `#!/bin/bash

usage=85

if [[ "$usage" -ge 90 ]]; then
    echo "CRITICAL: Disk usage at $usage%"
elif [[ "$usage" -ge 70 ]]; then
    echo "WARNING: Disk usage at $usage%"
else
    echo "OK: Disk usage at $usage%"
fi`,
          hints: [
            'Bash `if` syntax: `if [[ condition ]]; then` ... `elif [[ condition ]]; then` ... `else` ... `fi`.',
            'Numeric comparisons: `-ge` (greater or equal), `-gt` (greater than), `-lt` (less than), `-eq` (equal).',
            'The blanks are: `if`, `-ge`, `then`, `elif`, `-ge`, `else`, `fi`. Check highest threshold first.',
          ],
          concepts: ['if/elif/else', 'numeric comparison', '[[ ]]', '-ge', 'fi'],
        },
        {
          id: 'sh-ctrl-2',
          title: 'For Loops',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'bash',
          goal: 'Write a script that iterates over a list of servers, pings each one once (simulated with echo), and counts how many are in a "critical" list. Use a for loop and an if statement with [[ ]].',
          skeleton: `#!/bin/bash

servers=("rocky" "pangolin" "ovh-vps" "bav-apps" "forge-box")
critical=("ovh-vps" "pangolin")
critical_count=0

# Loop through servers, check if each is in the critical list
# For each server, echo "Checking <name>..."
# If the server is in the critical array, echo "  -> CRITICAL" and increment critical_count
# Hint: to check if an array contains a value, convert to string and use [[ ]]


echo "Total critical servers: $critical_count"`,
          solution: `#!/bin/bash

servers=("rocky" "pangolin" "ovh-vps" "bav-apps" "forge-box")
critical=("ovh-vps" "pangolin")
critical_count=0

for server in "\${servers[@]}"; do
    echo "Checking $server..."
    for c in "\${critical[@]}"; do
        if [[ "$server" == "$c" ]]; then
            echo "  -> CRITICAL"
            ((critical_count++))
            break
        fi
    done
done

echo "Total critical servers: $critical_count"`,
          hints: [
            'Loop over arrays with `for item in "${array[@]}"; do ... done`. The `[@]` expands all elements.',
            'To check if a server is critical, use a nested loop or convert the array to a string: `[[ " ${critical[*]} " == *" $server "* ]]`.',
            'Increment a counter with `((critical_count++))`. Use `break` to stop the inner loop once a match is found.',
          ],
          concepts: ['for loop', 'array iteration', '${array[@]}', 'nested loops', 'arithmetic', 'break'],
        },
        {
          id: 'sh-ctrl-3',
          title: 'Case Statement',
          type: 'fix-bug',
          difficulty: 'intermediate',
          language: 'bash',
          goal: 'Fix the bugs in this service management script. There are 3 bugs: wrong syntax for case patterns, missing semicolons, and a logic error.',
          skeleton: `#!/bin/bash

service="$1"
action="$2"

case $action
    start:
        echo "Starting $service..."
        echo "$service started"
        ;;
    stop:
        echo "Stopping $service..."
        echo "$service stopped"
        ;;
    restart:
        echo "Restarting $service..."
        echo "$service restarted"
        ;;
    status:
        echo "$service is running"
        ;;
    *)
        echo "Usage: $0 <service> <start|stop|restart|status>"
        exit 1
        ;;
esac`,
          solution: `#!/bin/bash

service="$1"
action="$2"

case "$action" in
    start)
        echo "Starting $service..."
        echo "$service started"
        ;;
    stop)
        echo "Stopping $service..."
        echo "$service stopped"
        ;;
    restart)
        echo "Restarting $service..."
        echo "$service restarted"
        ;;
    status)
        echo "$service is running"
        ;;
    *)
        echo "Usage: $0 <service> <start|stop|restart|status>"
        exit 1
        ;;
esac`,
          hints: [
            'The `case` statement syntax is `case "$var" in` -- it needs `in` at the end, not just the variable.',
            'Case patterns use `)` not `:`. It is `start)` not `start:`. This is not a switch statement from C.',
            'Always quote `"$action"` in the case statement. The three fixes: add `in`, change `:` to `)`, and quote the variable.',
          ],
          concepts: ['case/esac', 'pattern matching', 'case syntax', 'quoting', '$1 $2 positional args'],
        },
      ],
    },
    {
      id: 'sh-functions',
      title: '3. Functions & Arguments',
      explanation: `## Functions & Arguments

Bash functions are defined with \`function_name() { ... }\` or \`function function_name { ... }\`:

\`\`\`bash
greet() {
    local name="$1"
    echo "Hello, $name!"
}

greet "Zan"  # Hello, Zan!
\`\`\`

**Key concepts:**
- Arguments are accessed via \`$1\`, \`$2\`, \`$3\`, etc.
- \`$#\` is the number of arguments
- \`$@\` is all arguments (use \`"$@"\` to preserve quoting)
- \`local\` keeps variables scoped to the function (critical -- bash variables are global by default!)

**Return values:**
\`\`\`bash
# Bash functions return exit codes (0 = success, non-zero = failure)
is_running() {
    local service="$1"
    systemctl is-active --quiet "$service"
    return $?   # return the exit code of the last command
}

if is_running "nginx"; then
    echo "nginx is up"
fi

# To "return" data, use stdout (echo/printf)
get_ip() {
    local host="$1"
    echo "192.168.8.133"  # caller captures with $()
}

ip=$(get_ip "rocky")
\`\`\`

**Default values for arguments:**
\`\`\`bash
deploy() {
    local env="\${1:-production}"
    local branch="\${2:-main}"
    echo "Deploying $branch to $env"
}

deploy              # Deploying main to production
deploy staging dev  # Deploying dev to staging
\`\`\``,
      exercises: [
        {
          id: 'sh-func-1',
          title: 'Basic Function',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'bash',
          goal: 'Complete a function that builds an SSH command string from arguments. Use `local` variables, positional parameters, and default values.',
          skeleton: `#!/bin/bash

ssh_cmd() {
    __BLANK__ host="$1"
    __BLANK__ user="\${2:-zan}"
    __BLANK__ port="\${__BLANK__:-22}"

    if [[ "$port" -ne 22 ]]; then
        echo "ssh -i ~/.ssh/ZanSSH -p $port $user@$host"
    else
        echo "ssh -i ~/.ssh/ZanSSH $user@$host"
    fi
}

# Tests
ssh_cmd "192.168.8.133"
ssh_cmd "40.160.252.134" "zan" "4822"
ssh_cmd "94.156.152.50" "zanfiel"`,
          solution: `#!/bin/bash

ssh_cmd() {
    local host="$1"
    local user="\${2:-zan}"
    local port="\${3:-22}"

    if [[ "$port" -ne 22 ]]; then
        echo "ssh -i ~/.ssh/ZanSSH -p $port $user@$host"
    else
        echo "ssh -i ~/.ssh/ZanSSH $user@$host"
    fi
}

# Tests
ssh_cmd "192.168.8.133"
ssh_cmd "40.160.252.134" "zan" "4822"
ssh_cmd "94.156.152.50" "zanfiel"`,
          hints: [
            'Use `local` to scope variables inside the function. Without it, variables leak into global scope.',
            'Positional parameters: `$1` is the first argument, `$2` is the second, `$3` is the third.',
            'Default values: `${2:-zan}` means "use $2 if set, otherwise use zan". The port is `$3` with default `22`.',
          ],
          concepts: ['function definition', 'local variables', 'positional parameters', 'default values', '$1 $2 $3'],
        },
        {
          id: 'sh-func-2',
          title: 'Return Values & $?',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'bash',
          goal: 'Write two functions: `is_port_valid` that returns 0 (success) if a port number is between 1 and 65535, or 1 (failure) otherwise. Then write `validate_server` that takes a name and port, uses `is_port_valid`, and echoes a status message.',
          skeleton: `#!/bin/bash

# Write is_port_valid: takes a port number, returns 0 if valid, 1 if not


# Write validate_server: takes name and port, checks port validity, prints status


# Tests
validate_server "engram" 4200     # engram: port 4200 is valid
validate_server "broken" 99999    # broken: port 99999 is invalid
validate_server "edge" 0          # edge: port 0 is invalid`,
          solution: `#!/bin/bash

is_port_valid() {
    local port="$1"
    if [[ "$port" -ge 1 ]] && [[ "$port" -le 65535 ]]; then
        return 0
    fi
    return 1
}

validate_server() {
    local name="$1"
    local port="$2"
    if is_port_valid "$port"; then
        echo "$name: port $port is valid"
    else
        echo "$name: port $port is invalid"
    fi
}

# Tests
validate_server "engram" 4200
validate_server "broken" 99999
validate_server "edge" 0`,
          hints: [
            'Bash functions return exit codes: `return 0` for success, `return 1` for failure. This is the opposite of most languages.',
            'You can use a function directly in an `if` statement: `if is_port_valid "$port"; then`. It checks the exit code.',
            'Use `&&` to combine conditions: `[[ "$port" -ge 1 ]] && [[ "$port" -le 65535 ]]`. Or use `-a` inside a single `[[ ]]`.',
          ],
          concepts: ['return codes', 'exit status', '$?', 'function as condition', 'if with function', '&&'],
        },
        {
          id: 'sh-func-3',
          title: 'Processing All Arguments',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'bash',
          goal: 'Write a function `log_msg` that takes a log level as the first argument and all remaining arguments as the message. It should prefix the message with a timestamp and level. Use `"$@"` correctly to handle multi-word messages.',
          skeleton: `#!/bin/bash

# Write log_msg: first arg is level (INFO/WARN/ERROR), rest is the message
# Output format: [YYYY-MM-DD HH:MM:SS] [LEVEL] message text here
# Use $(date +"%Y-%m-%d %H:%M:%S") for the timestamp


# Tests
log_msg "INFO" "Server started on port 4200"
log_msg "WARN" "High memory usage detected"
log_msg "ERROR" "Connection to database failed" "retrying in 5s"`,
          solution: `#!/bin/bash

log_msg() {
    local level="$1"
    shift
    local timestamp
    timestamp=$(date +"%Y-%m-%d %H:%M:%S")
    echo "[$timestamp] [$level] $*"
}

# Tests
log_msg "INFO" "Server started on port 4200"
log_msg "WARN" "High memory usage detected"
log_msg "ERROR" "Connection to database failed" "retrying in 5s"`,
          hints: [
            '`shift` removes `$1` from the argument list, so `$@` becomes everything after the level.',
            'Use `$*` (inside double quotes: `"$*"`) to join all remaining args into a single string separated by spaces.',
            'Capture the timestamp into a local variable with `local timestamp; timestamp=$(date +"%Y-%m-%d %H:%M:%S")`.',
          ],
          concepts: ['shift', '$@', '$*', 'local', 'date formatting', 'multi-argument functions'],
        },
      ],
    },
    {
      id: 'sh-text',
      title: '4. Text Processing',
      explanation: `## Text Processing

Bash's superpower is piping text between commands. The pipe \`|\` sends one command's output as input to the next:

\`\`\`bash
# Count .log files in /var/log
ls /var/log/*.log | wc -l

# Find errors in a log file
grep "ERROR" /var/log/app.log

# Get the 5 most recently modified files
ls -lt | head -5
\`\`\`

**grep** -- search for patterns:
\`\`\`bash
grep "ERROR" app.log              # lines containing ERROR
grep -i "error" app.log           # case-insensitive
grep -c "ERROR" app.log           # count matching lines
grep -v "DEBUG" app.log           # lines NOT containing DEBUG
grep -E "ERROR|WARN" app.log     # extended regex (OR)
\`\`\`

**awk** -- column-based text processing:
\`\`\`bash
# Print the 2nd column (space-separated)
echo "rocky 192.168.8.133 22" | awk '{print $2}'
# 192.168.8.133

# Custom delimiter
echo "root:x:0:0" | awk -F: '{print $1, $3}'
# root 0

# Sum a column
awk '{sum += $2} END {print sum}' data.txt
\`\`\`

**sed** -- stream editor (find and replace):
\`\`\`bash
# Replace first occurrence per line
echo "hello world" | sed 's/hello/goodbye/'

# Replace ALL occurrences (g flag)
echo "aaa" | sed 's/a/b/g'   # bbb

# In-place file editing
sed -i 's/old/new/g' config.txt
\`\`\`

**cut** -- extract columns by delimiter:
\`\`\`bash
echo "root:x:0:0:root:/root:/bin/bash" | cut -d: -f1
# root

echo "2024-01-15 12:30:45 ERROR disk full" | cut -d' ' -f3
# ERROR
\`\`\`

**Combining them:**
\`\`\`bash
# Find top 5 IP addresses hitting a web server
cat access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head -5
\`\`\``,
      exercises: [
        {
          id: 'sh-text-1',
          title: 'Pipes & Grep',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'bash',
          goal: 'Complete a script that processes a log file (simulated with a heredoc). Use grep to filter lines, wc to count them, and pipes to chain commands.',
          skeleton: `#!/bin/bash

log_data="INFO: server started
WARN: high memory
ERROR: disk full
INFO: request from 10.0.0.1
ERROR: connection timeout
INFO: request from 10.0.0.2
WARN: slow query
INFO: request from 10.0.0.3"

# Count total lines
total=$(echo "$log_data" | __BLANK__ -l)

# Count ERROR lines only
errors=$(echo "$log_data" | __BLANK__ "ERROR" | __BLANK__ -l)

# Get all WARN messages, case-insensitive
warns=$(echo "$log_data" | grep __BLANK__ "warn")

# Get lines that are NOT INFO
non_info=$(echo "$log_data" | grep __BLANK__ "INFO")

echo "Total: $total"
echo "Errors: $errors"
echo "Warnings:"
echo "$warns"
echo "Non-info:"
echo "$non_info"`,
          solution: `#!/bin/bash

log_data="INFO: server started
WARN: high memory
ERROR: disk full
INFO: request from 10.0.0.1
ERROR: connection timeout
INFO: request from 10.0.0.2
WARN: slow query
INFO: request from 10.0.0.3"

# Count total lines
total=$(echo "$log_data" | wc -l)

# Count ERROR lines only
errors=$(echo "$log_data" | grep "ERROR" | wc -l)

# Get all WARN messages, case-insensitive
warns=$(echo "$log_data" | grep -i "warn")

# Get lines that are NOT INFO
non_info=$(echo "$log_data" | grep -v "INFO")

echo "Total: $total"
echo "Errors: $errors"
echo "Warnings:"
echo "$warns"
echo "Non-info:"
echo "$non_info"`,
          hints: [
            '`wc -l` counts lines. Pipe `echo "$log_data"` into `wc -l` to count them.',
            '`grep "ERROR"` filters to lines containing ERROR. Pipe that into `wc -l` to count only error lines.',
            '`grep -i` is case-insensitive. `grep -v` inverts the match (lines NOT matching the pattern).',
          ],
          concepts: ['pipes', 'grep', 'grep -i', 'grep -v', 'wc -l', 'command substitution'],
        },
        {
          id: 'sh-text-2',
          title: 'Awk Column Extraction',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'bash',
          goal: 'Use awk and cut to extract specific columns from structured text data. Process a passwd-style file and a space-separated process list.',
          skeleton: `#!/bin/bash

# Extract username (field 1) and home dir (field 6) from passwd-style data
passwd_line="zan:x:1000:1000:Zan:/home/zan:/bin/bash"

username=$(echo "$passwd_line" | awk -F__BLANK__ '{print __BLANK__}')
homedir=$(echo "$passwd_line" | cut -d__BLANK__ -f__BLANK__)

echo "User: $username"
echo "Home: $homedir"

# Process list: extract names of processes using more than 10% CPU
ps_data="nginx 2.3 128
node 45.1 512
postgres 12.8 256
redis 5.1 64
python3 23.5 384"

echo "High CPU processes:"
echo "$ps_data" | awk '__BLANK__ > 10 {print __BLANK__}'`,
          solution: `#!/bin/bash

# Extract username (field 1) and home dir (field 6) from passwd-style data
passwd_line="zan:x:1000:1000:Zan:/home/zan:/bin/bash"

username=$(echo "$passwd_line" | awk -F: '{print $1}')
homedir=$(echo "$passwd_line" | cut -d: -f6)

echo "User: $username"
echo "Home: $homedir"

# Process list: extract names of processes using more than 10% CPU
ps_data="nginx 2.3 128
node 45.1 512
postgres 12.8 256
redis 5.1 64
python3 23.5 384"

echo "High CPU processes:"
echo "$ps_data" | awk '$2 > 10 {print $1}'`,
          hints: [
            'For colon-separated data, use `awk -F:` or `cut -d:`. Fields in awk are `$1`, `$2`, etc. Fields in cut use `-fN`.',
            'The home directory is field 6 in a passwd line: `cut -d: -f6` extracts it.',
            'In awk, `$2 > 10` is a condition on the second column. `{print $1}` prints the first column. No `if` needed -- awk uses `pattern {action}`.',
          ],
          concepts: ['awk -F', 'awk columns', 'cut -d -f', 'awk conditions', 'column extraction'],
        },
        {
          id: 'sh-text-3',
          title: 'Sed & Pipelines',
          type: 'write-function',
          difficulty: 'advanced',
          language: 'bash',
          goal: 'Write a function `analyze_access_log` that takes a multi-line access log string (each line: "IP METHOD PATH STATUS"). It should: 1) Count total requests, 2) Count 5xx errors, 3) Find the most common IP using sort/uniq/head.',
          skeleton: `#!/bin/bash

# Write analyze_access_log here
# Input: multi-line string of "IP METHOD PATH STATUS"
# Output: Print total requests, error count, and most common IP


# Test
access_log="10.0.0.1 GET /api/search 200
10.0.0.2 POST /api/store 201
10.0.0.1 GET /api/list 200
10.0.0.3 GET /api/search 500
10.0.0.1 GET /api/context 200
10.0.0.2 GET /api/search 502
10.0.0.1 POST /api/store 201
10.0.0.3 GET /static/index.html 200"

analyze_access_log "$access_log"
# Expected:
# Total requests: 8
# 5xx errors: 2
# Most common IP: 10.0.0.1 (4 requests)`,
          solution: `#!/bin/bash

analyze_access_log() {
    local log="$1"

    local total
    total=$(echo "$log" | wc -l)

    local errors
    errors=$(echo "$log" | awk '$4 >= 500' | wc -l)

    local top_ip
    top_ip=$(echo "$log" | awk '{print $1}' | sort | uniq -c | sort -rn | head -1)

    local ip_count ip_addr
    ip_count=$(echo "$top_ip" | awk '{print $1}')
    ip_addr=$(echo "$top_ip" | awk '{print $2}')

    echo "Total requests: $total"
    echo "5xx errors: $errors"
    echo "Most common IP: $ip_addr ($ip_count requests)"
}

# Test
access_log="10.0.0.1 GET /api/search 200
10.0.0.2 POST /api/store 201
10.0.0.1 GET /api/list 200
10.0.0.3 GET /api/search 500
10.0.0.1 GET /api/context 200
10.0.0.2 GET /api/search 502
10.0.0.1 POST /api/store 201
10.0.0.3 GET /static/index.html 200"

analyze_access_log "$access_log"`,
          hints: [
            'Status code is field 4 (`$4` in awk). Filter 5xx errors with `awk \'$4 >= 500\'`.',
            'The "most common IP" pipeline: `awk \'{print $1}\' | sort | uniq -c | sort -rn | head -1`. This prints count + IP.',
            'After getting the top line from uniq, split it again with awk: `awk \'{print $1}\'` for count, `awk \'{print $2}\'` for the IP address.',
          ],
          concepts: ['awk conditions', 'sort', 'uniq -c', 'sort -rn', 'head', 'pipeline composition', 'wc -l'],
        },
      ],
    },
    {
      id: 'sh-files',
      title: '5. Files & Process Management',
      explanation: `## Files & Process Management

**File test operators** (use inside \`[[ ]]\`):
\`\`\`bash
[[ -f "$path" ]]    # true if file exists and is a regular file
[[ -d "$path" ]]    # true if directory exists
[[ -e "$path" ]]    # true if anything exists at path
[[ -r "$path" ]]    # true if readable
[[ -w "$path" ]]    # true if writable
[[ -x "$path" ]]    # true if executable
[[ -s "$path" ]]    # true if file exists and is not empty
\`\`\`

**Redirection:**
\`\`\`bash
# stdout to file (overwrite)
echo "hello" > output.txt

# stdout to file (append)
echo "world" >> output.txt

# stderr to file
command 2> errors.log

# Both stdout and stderr to same file
command > all.log 2>&1

# Discard all output
command > /dev/null 2>&1

# Read stdin from file
while read -r line; do
    echo "Line: $line"
done < input.txt
\`\`\`

**Process management:**
\`\`\`bash
# Run in background
long_task &

# Get PID of last background process
pid=$!

# Wait for a background process
wait "$pid"

# Check if a process is running
if kill -0 "$pid" 2>/dev/null; then
    echo "Process $pid is running"
fi

# Trap signals for cleanup
cleanup() {
    echo "Cleaning up..."
    rm -f /tmp/lockfile
}
trap cleanup EXIT    # runs cleanup on script exit
trap cleanup SIGINT  # runs cleanup on Ctrl+C
\`\`\`

**Here documents (heredoc):**
\`\`\`bash
cat <<EOF > config.json
{
    "server": "$hostname",
    "port": $port
}
EOF
\`\`\``,
      exercises: [
        {
          id: 'sh-file-1',
          title: 'File Tests & Redirection',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'bash',
          goal: 'Complete a script that checks for config files, creates them with defaults if missing, and logs actions to a file using redirection.',
          skeleton: `#!/bin/bash

config_dir="/tmp/myapp"
config_file="$config_dir/config.json"
log_file="$config_dir/setup.log"

# Create directory if it doesn't exist
if [[ ! __BLANK__ "$config_dir" ]]; then
    mkdir -p "$config_dir"
    echo "Created $config_dir" __BLANK__ "$log_file"
fi

# Create config file if it doesn't exist
if [[ ! __BLANK__ "$config_file" ]]; then
    cat __BLANK__ "$config_file"
{
    "port": 4200,
    "host": "0.0.0.0",
    "debug": false
}
EOF
    echo "Created default config" __BLANK__ "$log_file"
else
    echo "Config already exists" __BLANK__ "$log_file"
fi

# Check if config is readable
if [[ __BLANK__ "$config_file" ]]; then
    echo "Config is readable"
else
    echo "ERROR: Config is not readable" __BLANK__ "$log_file"
fi`,
          solution: `#!/bin/bash

config_dir="/tmp/myapp"
config_file="$config_dir/config.json"
log_file="$config_dir/setup.log"

# Create directory if it doesn't exist
if [[ ! -d "$config_dir" ]]; then
    mkdir -p "$config_dir"
    echo "Created $config_dir" > "$log_file"
fi

# Create config file if it doesn't exist
if [[ ! -f "$config_file" ]]; then
    cat <<EOF > "$config_file"
{
    "port": 4200,
    "host": "0.0.0.0",
    "debug": false
}
EOF
    echo "Created default config" >> "$log_file"
else
    echo "Config already exists" >> "$log_file"
fi

# Check if config is readable
if [[ -r "$config_file" ]]; then
    echo "Config is readable"
else
    echo "ERROR: Config is not readable" >> "$log_file"
fi`,
          hints: [
            '`-d` tests for directory, `-f` tests for regular file, `-r` tests for readable. The `!` negates the test.',
            'Use `>` to write (overwrite) to the log file the first time, then `>>` to append for subsequent writes.',
            'Heredoc syntax: `cat <<EOF > file` writes everything until the `EOF` marker into the file. `<<EOF` starts it, `EOF` on its own line ends it.',
          ],
          concepts: ['file tests', '-d', '-f', '-r', 'redirection >', '>>', 'heredoc', 'mkdir -p'],
        },
        {
          id: 'sh-file-2',
          title: 'Background Processes & Traps',
          type: 'fix-bug',
          difficulty: 'advanced',
          language: 'bash',
          goal: 'Fix the bugs in this script that runs a background task, waits for it, and uses a trap for cleanup. There are 3 bugs: incorrect PID capture, missing cleanup on exit, and a broken wait call.',
          skeleton: `#!/bin/bash

lockfile="/tmp/deploy.lock"

cleanup() {
    echo "Cleaning up..."
    rm -f "$lockfile"
    echo "Removed lockfile"
}

# Bug 1: trap should fire on EXIT and SIGINT
trap cleanup

# Create lockfile
echo $$ > "$lockfile"

# Simulate a deploy task running in background
echo "Starting deploy..."
sleep 2 && echo "Deploy complete" &

# Bug 2: capture the PID of the background process
bg_pid=$?

echo "Background PID: $bg_pid"

# Bug 3: wait for the correct variable
wait $bg_id

echo "All done"`,
          solution: `#!/bin/bash

lockfile="/tmp/deploy.lock"

cleanup() {
    echo "Cleaning up..."
    rm -f "$lockfile"
    echo "Removed lockfile"
}

# Fix 1: trap needs signal names
trap cleanup EXIT SIGINT

# Create lockfile
echo $$ > "$lockfile"

# Simulate a deploy task running in background
echo "Starting deploy..."
sleep 2 && echo "Deploy complete" &

# Fix 2: $! captures PID of last background process, not $?
bg_pid=$!

echo "Background PID: $bg_pid"

# Fix 3: variable name was wrong (bg_id vs bg_pid)
wait "$bg_pid"

echo "All done"`,
          hints: [
            '`trap cleanup` needs signal names: `trap cleanup EXIT SIGINT`. Without signals, the trap does nothing useful.',
            '`$?` is the exit code of the last command. `$!` is the PID of the last background process. They are very different.',
            'The `wait` command references `$bg_id` but the variable is named `$bg_pid`. Also, always quote: `wait "$bg_pid"`.',
          ],
          concepts: ['trap', 'EXIT signal', 'SIGINT', '$!', '$?', '$$', 'wait', 'background processes', 'lockfiles'],
        },
      ],
    },
  ],
};
