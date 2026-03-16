import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'bash-sec',
  title: '48. Security',
  explanation: `## Security in Bash\n\nBash scripts can be vulnerable to injection, file race conditions, and permission issues.\n\n### Quote Everything\n\n\`\`\`bash\n# UNSAFE:\nrm \$user_file\n\n# SAFE:\nrm "\$user_file"\n# Prevents word-splitting and glob expansion on user input\n\`\`\`\n\n### Injection Prevention\n\n\`\`\`bash\n# NEVER do this:\neval "ls \$user_input"\n\n# Safe alternative:\nls -- "\$user_input"\n\`\`\`\n\n### Safe Temp Files\n\n\`\`\`bash\n# UNSAFE - race condition (TOCTOU):\ntmpfile=/tmp/myapp.tmp\nrm -f \$tmpfile\n\n# SAFE:\ntmpfile=\$(mktemp /tmp/myapp.XXXXXX)\ntrap 'rm -f "\$tmpfile"' EXIT\n\`\`\`\n\n### Permissions\n\n\`\`\`bash\numask 077          # new files: owner-only permissions\nchmod 600 secret   # restrict to owner r/w only\nchmod 700 script   # executable by owner only\n\`\`\`\n\n### Validate Input\n\n\`\`\`bash\n# Check input matches expected pattern\nif [[ "\$user_input" =~ ^[a-zA-Z0-9_-]+$ ]]; then\n    safe_to_use "\$user_input"\nfi\n\`\`\`\n\n### Principle of Least Privilege\n\n- Use \`sudo\` only for specific commands\n- Drop privileges when not needed\n- Never run entire scripts as root`,
  exercises: [
    {
      id: 'bash-sec-1',
      title: 'Quote Untrusted Input',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Quote user input to prevent word splitting and glob expansion.',
      skeleton: `#!/bin/bash
user_file="\$1"
# UNSAFE: rm \$user_file
# SAFE:
rm ___`,
      solution: `#!/bin/bash
user_file="\$1"
rm "\$user_file"`,
      hints: ['Always quote variables that may contain user input.', 'Without quotes, spaces in filename split into multiple arguments.', '"$user_file"'],
      concepts: ['quoting', 'injection-prevention'],
    },
    {
      id: 'bash-sec-2',
      title: 'Safe Temp File with mktemp',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Create a temp file safely using mktemp and clean it up with trap.',
      skeleton: `#!/bin/bash
tmpfile=\$(___ /tmp/myapp.XXXXXX)
___ 'rm -f "\$tmpfile"' EXIT
echo "data" > "\$tmpfile"`,
      solution: `#!/bin/bash
tmpfile=\$(mktemp /tmp/myapp.XXXXXX)
trap 'rm -f "$tmpfile"' EXIT
echo "data" > "\$tmpfile"`,
      hints: ['mktemp creates a unique temp file atomically.', 'trap cleanup EXIT removes it on script exit.', 'mktemp and trap'],
      concepts: ['mktemp', 'trap', 'temp-files'],
    },
    {
      id: 'bash-sec-3',
      title: 'Validate Input with Regex',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Validate that user input contains only safe alphanumeric characters.',
      skeleton: `#!/bin/bash
username="\$1"
if [[ "\$username" ___ ^[a-zA-Z0-9_-]+$ ]]; then
    echo "Valid: \$username"
else
    echo "Invalid username" >&2; exit 1
fi`,
      solution: `#!/bin/bash
username="\$1"
if [[ "\$username" =~ ^[a-zA-Z0-9_-]+$ ]]; then
    echo "Valid: \$username"
else
    echo "Invalid username" >&2; exit 1
fi`,
      hints: ['=~ performs regex matching in [[ ]].', '^[a-zA-Z0-9_-]+$ matches safe usernames.', '=~'],
      concepts: ['input-validation', 'regex', 'security'],
    },
    {
      id: 'bash-sec-4',
      title: 'Restrict File Permissions',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Set restrictive permissions on a config file containing secrets.',
      skeleton: `#!/bin/bash
cat > /etc/myapp/secrets.conf << 'EOF'
API_KEY=secret123
EOF
___ 600 /etc/myapp/secrets.conf`,
      solution: `#!/bin/bash
cat > /etc/myapp/secrets.conf << 'EOF'
API_KEY=secret123
EOF
chmod 600 /etc/myapp/secrets.conf`,
      hints: ['chmod 600 allows read/write by owner only.', 'Other users cannot read secrets.conf.', 'chmod 600'],
      concepts: ['chmod', 'file-permissions', 'secrets'],
    },
    {
      id: 'bash-sec-5',
      title: 'umask for New Files',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Set umask so all new files created by this script are owner-only.',
      skeleton: `#!/bin/bash
___ 077
# Now all new files will be 600 (rw-------) and dirs 700
echo "secrets" > /tmp/safe_file.txt`,
      solution: `#!/bin/bash
umask 077
echo "secrets" > /tmp/safe_file.txt`,
      hints: ['umask 077 removes group and other permissions from new files.', 'Default umask 022 allows group/other read.', 'umask 077'],
      concepts: ['umask', 'permissions', 'new-files'],
    },
    {
      id: 'bash-sec-6',
      title: 'Write an Input Sanitizer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function sanitize that strips all characters except alphanumeric, dash, and underscore from input.',
      skeleton: `#!/bin/bash
# Write sanitize function`,
      solution: `#!/bin/bash
sanitize() {
  echo "\$1" | tr -cd 'a-zA-Z0-9_-'
}
sanitize "hello; rm -rf /"
sanitize "valid-user_123"`,
      hints: ['tr -cd keeps only the specified characters (-c inverts, -d deletes).', "'a-zA-Z0-9_-' is the safe character set.", 'Anything not matching is silently deleted.'],
      concepts: ['tr', 'sanitization', 'input-validation'],
    },
    {
      id: 'bash-sec-7',
      title: 'Write a Safe eval Alternative',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function safe_execute that runs a command from a whitelist, rejecting anything else.',
      skeleton: `#!/bin/bash
# Write safe_execute command function`,
      solution: `#!/bin/bash
safe_execute() {
  local cmd="\$1"
  shift
  local -A allowed=(["ls"]=1 ["echo"]=1 ["date"]=1 ["whoami"]=1)
  if [ -z "\${allowed[\$cmd]+set}" ]; then
    echo "Error: '\$cmd' not allowed" >&2
    return 1
  fi
  "\$cmd" "\$@"
}
safe_execute echo "hello"
safe_execute rm "/etc/passwd" || echo "blocked"`,
      hints: ['Use an associative array as a whitelist.', 'Check ${allowed[$cmd]+set} to test if key exists.', 'Execute the command safely with "$cmd" "$@".'],
      concepts: ['whitelist', 'eval-alternative', 'security'],
    },
    {
      id: 'bash-sec-8',
      title: 'Write a Secure Config Reader',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function read_secret that reads a variable from a config file that only the owner can read.',
      skeleton: `#!/bin/bash
# Write read_secret keyname filepath function`,
      solution: `#!/bin/bash
read_secret() {
  local key="\$1"
  local file="\${2:-\$HOME/.secrets}"
  if [ ! -f "\$file" ]; then
    echo "Error: \$file not found" >&2; return 1
  fi
  local perms
  perms=\$(stat -c "%a" "\$file" 2>/dev/null)
  if [ "\$perms" != "600" ] && [ "\$perms" != "400" ]; then
    echo "Error: \$file must be 600 or 400 (is \$perms)" >&2; return 1
  fi
  grep "^\${key}=" "\$file" | cut -d= -f2-
}`,
      hints: ['Check file permissions with stat -c "%a".', 'Reject files that are world or group readable.', 'grep "^KEY=" | cut -d= -f2- extracts the value.'],
      concepts: ['permissions-check', 'stat', 'secure-config'],
    },
    {
      id: 'bash-sec-9',
      title: 'Predict Injection Vulnerability',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Predict what happens when malicious input is passed to an unsafe command.',
      skeleton: `#!/bin/bash
user_input="file.txt; echo INJECTED"
# UNSAFE: eval ls \$user_input
# What would happen?`,
      solution: `ls file.txt runs, then echo INJECTED runs, printing "INJECTED". The semicolon splits the commands.`,
      hints: ['eval processes the string as shell code.', 'Unquoted $user_input allows command injection.', 'Semicolons in input become command separators.'],
      concepts: ['injection', 'eval', 'command-injection'],
    },
    {
      id: 'bash-sec-10',
      title: 'Predict mktemp Safety',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict why mktemp is safer than /tmp/myapp.tmp.',
      skeleton: `#!/bin/bash
# A: Predictable path
tmpfile=/tmp/myapp.tmp

# B: Random path
tmpfile=\$(mktemp /tmp/myapp.XXXXXX)
echo "\$tmpfile"`,
      solution: `mktemp is safer because the random suffix prevents symlink attacks and race conditions. Example: /tmp/myapp.a3fK9p`,
      hints: ['Predictable paths allow attackers to pre-create symlinks.', 'mktemp creates the file atomically with a random suffix.', 'XXXXXX is replaced with random characters.'],
      concepts: ['mktemp', 'TOCTOU', 'symlink-attack'],
    },
    {
      id: 'bash-sec-11',
      title: 'Fix Unquoted Variable',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Fix the unquoted variable that allows word splitting on user input.',
      skeleton: `#!/bin/bash
user_dir="\$1"
# BUG: unquoted - word splits if path has spaces
ls -la \$user_dir`,
      solution: `#!/bin/bash
user_dir="\$1"
ls -la "\$user_dir"`,
      hints: ['Always quote variables containing user input.', 'Paths with spaces split into multiple arguments without quotes.', '"$user_dir"'],
      concepts: ['quoting', 'word-splitting', 'security'],
    },
    {
      id: 'bash-sec-12',
      title: 'Fix eval Injection',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Fix the script that uses eval with user input, creating an injection vulnerability.',
      skeleton: `#!/bin/bash
# BUG: user can inject commands
user_cmd="\$1"
eval "ls \$user_cmd"`,
      solution: `#!/bin/bash
# Safe: pass as argument, not through eval
ls -- "\$1"`,
      hints: ['Never eval user input.', 'Pass user input as arguments instead.', '-- prevents $1 from being interpreted as an option.'],
      concepts: ['eval', 'injection', 'argument-passing'],
    },
    {
      id: 'bash-sec-13',
      title: 'Fix Predictable Temp File',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Fix the predictable temp file that is vulnerable to symlink attacks.',
      skeleton: `#!/bin/bash
# BUG: predictable temp file path
tmpfile=/tmp/myapp_\$\$.tmp
echo "data" > "\$tmpfile"
# process tmpfile
rm "\$tmpfile"`,
      solution: `#!/bin/bash
tmpfile=\$(mktemp /tmp/myapp.XXXXXX)
trap 'rm -f "\$tmpfile"' EXIT
echo "data" > "\$tmpfile"
# process tmpfile`,
      hints: ['$$ (PID) is guessable -- an attacker can pre-create a symlink.', 'mktemp creates files atomically with random names.', 'trap ensures cleanup even on error.'],
      concepts: ['mktemp', 'TOCTOU', 'trap'],
    },
    {
      id: 'bash-sec-14',
      title: 'Refactor to Validate Before Use',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Refactor to validate and sanitize $1 before using it as a filename.',
      skeleton: `#!/bin/bash
cat "\$1"`,
      solution: `#!/bin/bash
input="\$1"
if [ -z "\$input" ]; then
    echo "Error: filename required" >&2; exit 1
fi
if [[ "\$input" =~ [^a-zA-Z0-9._/-] ]]; then
    echo "Error: invalid filename characters" >&2; exit 1
fi
if [ ! -f "\$input" ]; then
    echo "Error: file not found" >&2; exit 1
fi
cat "\$input"`,
      hints: ['Check if input is provided with [ -z ].', 'Validate characters with a regex.', 'Check if file exists before reading.'],
      concepts: ['input-validation', 'file-safety', 'security'],
    },
    {
      id: 'bash-sec-15',
      title: 'Write a Safe Directory Cleaner',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function safe_clean that deletes files in a directory older than N days, with path validation.',
      skeleton: `#!/bin/bash
# Write safe_clean dir days function`,
      solution: `#!/bin/bash
safe_clean() {
  local dir="\$1"
  local days="\${2:-7}"

  # Validate directory
  if [ -z "\$dir" ] || [ ! -d "\$dir" ]; then
    echo "Error: invalid directory: \$dir" >&2; return 1
  fi

  # Prevent dangerous paths
  if [[ "\$dir" == "/" ]] || [[ "\$dir" == "/etc" ]] || [[ "\$dir" == "/usr" ]]; then
    echo "Error: refusing to clean system directory" >&2; return 1
  fi

  find "\$dir" -maxdepth 1 -type f -mtime +"\$days" -delete
  echo "Cleaned files older than \$days days from \$dir"
}
safe_clean /tmp/cache 30`,
      hints: ['Validate the directory exists with [ -d "$dir" ].', 'Block dangerous paths explicitly.', 'Use find -delete for atomic delete without subshell.'],
      concepts: ['validation', 'path-safety', 'find', 'security'],
    },
    {
      id: 'bash-sec-16',
      title: 'Predict chmod vs umask',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict the permissions of a new file when umask is 077.',
      skeleton: `#!/bin/bash
umask 077
touch /tmp/test_perms.txt
stat -c "%a" /tmp/test_perms.txt`,
      solution: `600`,
      hints: ['Default new file permissions are 666 (rw-rw-rw-).', 'umask 077 removes group and other bits: 666 AND NOT 077 = 600.', '600 = rw-------'],
      concepts: ['umask', 'permissions', 'file-creation'],
    },
    {
      id: 'bash-sec-17',
      title: 'Write a Path Traversal Checker',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function safe_path that checks a user-provided path stays within a base directory.',
      skeleton: `#!/bin/bash
# Write safe_path base_dir user_path function`,
      solution: `#!/bin/bash
safe_path() {
  local base="\$(realpath "\$1")"
  local user="\$(realpath "\${base}/\${2}" 2>/dev/null)"
  if [ -z "\$user" ]; then
    echo "Error: invalid path" >&2; return 1
  fi
  if [[ "\$user" != "\$base/"* ]] && [[ "\$user" != "\$base" ]]; then
    echo "Error: path traversal detected" >&2; return 1
  fi
  echo "\$user"
}
safe_path /var/www "uploads/photo.jpg"
safe_path /var/www "../../etc/passwd" || echo "blocked"`,
      hints: ['Use realpath to resolve symlinks and ..',  'Check if resolved path starts with the base directory.', '[[ "$user" != "$base/"* ]] detects traversal.'],
      concepts: ['path-traversal', 'realpath', 'security'],
    },
    {
      id: 'bash-sec-18',
      title: 'Fix World-Readable Secret File',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Fix the script that writes a secret but leaves it world-readable.',
      skeleton: `#!/bin/bash
echo "API_KEY=secret123" > /tmp/credentials.env
# BUG: file is 644 by default (world-readable)
cat /tmp/credentials.env`,
      solution: `#!/bin/bash
umask 077
echo "API_KEY=secret123" > /tmp/credentials.env
cat /tmp/credentials.env`,
      hints: ['Set umask 077 before creating the file.', 'Or use chmod 600 after creation.', 'umask 077 makes all new files owner-only.'],
      concepts: ['umask', 'chmod', 'secrets', 'file-permissions'],
    },
    {
      id: 'bash-sec-19',
      title: 'Write a Privilege Checker',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function require_root and a function refuse_root that enforce privilege requirements.',
      skeleton: `#!/bin/bash
# Write require_root and refuse_root functions`,
      solution: `#!/bin/bash
require_root() {
  if [ "\$EUID" -ne 0 ]; then
    echo "Error: This script must be run as root" >&2
    exit 1
  fi
}

refuse_root() {
  if [ "\$EUID" -eq 0 ]; then
    echo "Error: This script must NOT be run as root" >&2
    exit 1
  fi
}`,
      hints: ['$EUID is the effective user ID (0 for root).', '[ "$EUID" -ne 0 ] is true for non-root users.', '[ "$EUID" -eq 0 ] is true for root.'],
      concepts: ['EUID', 'privilege', 'root-check'],
    },
    {
      id: 'bash-sec-20',
      title: 'Refactor to Least Privilege',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Refactor a script to drop root privileges after the part that needs them.',
      skeleton: `#!/bin/bash
# Runs entirely as root -- bad practice
mkdir -p /var/myapp
cp config.conf /etc/myapp/
chown -R myuser:mygroup /var/myapp
./start_service.sh   # doesn't need root`,
      solution: `#!/bin/bash
# Only root ops first
mkdir -p /var/myapp
cp config.conf /etc/myapp/
chown -R myuser:mygroup /var/myapp
# Drop privileges for the rest
exec sudo -u myuser ./start_service.sh`,
      hints: ['Use sudo -u user to switch to a less-privileged user.', 'exec replaces the shell process -- no going back.', 'Do all privileged operations first, then drop.'],
      concepts: ['least-privilege', 'sudo', 'privilege-dropping'],
    },
  ],
};
