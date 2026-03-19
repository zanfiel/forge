import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'bash-config',
  title: '36. Configuration',
  explanation: `## Configuration in Bash\n\nScripts should read configuration from files rather than having values hardcoded.\n\n### .env Files\n\n\`\`\`bash\n# .env file format:\nDB_HOST=localhost\nDB_PORT=5432\nDB_NAME=myapp\n\n# Load it:\nsource .env\n# or:\n. .env\n\`\`\`\n\n### Default Values\n\n\`\`\`bash\n# Use :- for default if unset or empty\nHOST=\${DB_HOST:-localhost}\nPORT=\${DB_PORT:-5432}\n\n# Use :- inline\nmkdir -p \${LOG_DIR:-/tmp/logs}\n\`\`\`\n\n### Config Parsing\n\n\`\`\`bash\n# Parse KEY=VALUE config files safely\nwhile IFS='=' read -r key value; do\n    [[ "\$key" =~ ^# ]] && continue    # skip comments\n    [[ -z "\$key" ]] && continue       # skip empty lines\n    export "\$key"="\$value"\ndone < config.cfg\n\`\`\`\n\n### Config Validation\n\n\`\`\`bash\nrequire_var() {\n    [ -z "\${!1}" ] && { echo "Error: \$1 not set"; exit 1; }\n}\nrequire_var DB_HOST\nrequire_var API_KEY\n\`\`\`\n\n### Environment Overrides\n\nAllow environment variables to override file config:\n\n\`\`\`bash\n[ -f .env ] && source .env\nDB_HOST=\${DB_HOST:-localhost}   # env var > .env > default\n\`\`\``,
  exercises: [
    {
      id: 'bash-config-1',
      title: 'Source a Config File',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Load variables from a config file using source.',
      skeleton: `#!/bin/bash
___ /etc/myapp/config.env
echo "\$DB_HOST:\$DB_PORT"`,
      solution: `#!/bin/bash
source /etc/myapp/config.env
echo "\$DB_HOST:\$DB_PORT"`,
      hints: ['source reads and executes a file in the current shell.', '. is an alias for source.', 'source /etc/myapp/config.env'],
      concepts: ['source', 'config-file'],
    },
    {
      id: 'bash-config-2',
      title: 'Default Value with :-',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Use parameter expansion to provide a default value when a variable is unset.',
      skeleton: `#!/bin/bash
# Use default "localhost" if DB_HOST is unset
host=\${DB_HOST___localhost}
port=\${DB_PORT___5432}
echo "\$host:\$port"`,
      solution: `#!/bin/bash
host=\${DB_HOST:-localhost}
port=\${DB_PORT:-5432}
echo "\$host:\$port"`,
      hints: ['${VAR:-default} returns default if VAR is unset or empty.', 'The :- operator provides fallback values.', ':-'],
      concepts: ['default-values', 'parameter-expansion'],
    },
    {
      id: 'bash-config-3',
      title: 'Require a Variable',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Exit with an error if a required variable is not set.',
      skeleton: `#!/bin/bash
# Exit if API_KEY is not set
: \${API_KEY___"Error: API_KEY is required" exit 1}
echo "Key: \${API_KEY:0:4}..."`,
      solution: `#!/bin/bash
: \${API_KEY:?"Error: API_KEY is required"}
echo "Key: \${API_KEY:0:4}..."`,
      hints: ['${VAR:?message} exits with the message if VAR is unset.', 'The : command does nothing -- used for side effects.', ':?'],
      concepts: ['required-variable', ':?', 'parameter-expansion'],
    },
    {
      id: 'bash-config-4',
      title: 'Parse Config File',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Parse a KEY=VALUE config file, skipping comments and blank lines.',
      skeleton: `#!/bin/bash
while IFS='=' read -r key value; do
    [[ "\$key" =~ ^#]] && ___
    [[ -z "\$key" ]] && ___
    export "\$key"="\$value"
done < config.cfg`,
      solution: `#!/bin/bash
while IFS='=' read -r key value; do
    [[ "\$key" =~ ^# ]] && continue
    [[ -z "\$key" ]] && continue
    export "\$key"="\$value"
done < config.cfg`,
      hints: ['continue skips to the next loop iteration.', 'Check for # prefix to skip comments.', 'continue'],
      concepts: ['config-parsing', 'IFS', 'while-read'],
    },
    {
      id: 'bash-config-5',
      title: 'Source Only if Exists',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Source a config file only if it exists.',
      skeleton: `#!/bin/bash
___ -f .env ___ source .env
echo "\${APP_ENV:-development}"`,
      solution: `#!/bin/bash
[ -f .env ] && source .env
echo "\${APP_ENV:-development}"`,
      hints: ['[ -f file ] tests if the file exists.', '&& source .env runs only if the file exists.', '[ -f .env ] && source .env'],
      concepts: ['file-test', 'source', 'conditional'],
    },
    {
      id: 'bash-config-6',
      title: 'Write a Config Loader',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function load_config that loads a .env file and exports all KEY=VALUE pairs, skipping comments.',
      skeleton: `#!/bin/bash
# Write load_config function`,
      solution: `#!/bin/bash
load_config() {
  local file="\${1:-.env}"
  [ -f "\$file" ] || { echo "Config not found: \$file"; return 1; }
  while IFS='=' read -r key value; do
    [[ "\$key" =~ ^[[:space:]]*# ]] && continue
    [[ -z "\$key" ]] && continue
    key="\${key// /}"
    export "\$key"="\$value"
  done < "\$file"
}
load_config .env`,
      hints: ['Default file to .env with ${1:-.env}.', 'Check file exists with [ -f "$file" ].', 'IFS="=" splits on equals sign.'],
      concepts: ['source', 'config-loading', 'functions'],
    },
    {
      id: 'bash-config-7',
      title: 'Write a Config Validator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function require_vars that takes variable names and exits with error for any that are unset.',
      skeleton: `#!/bin/bash
# Write require_vars function`,
      solution: `#!/bin/bash
require_vars() {
  local missing=0
  for var in "\$@"; do
    if [ -z "\${!var}" ]; then
      echo "Error: \$var is required but not set" >&2
      missing=\$((missing + 1))
    fi
  done
  [ \$missing -gt 0 ] && exit 1
}
require_vars DB_HOST DB_PORT API_KEY`,
      hints: ['${!var} expands the variable named by $var (indirect reference).', 'Check each variable with [ -z "${!var}" ].', 'Collect errors and exit once at the end.'],
      concepts: ['indirect-expansion', 'validation', 'functions'],
    },
    {
      id: 'bash-config-8',
      title: 'Write an Env Override Loader',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function load_with_overrides that loads defaults from a base file, then overrides with an environment-specific file.',
      skeleton: `#!/bin/bash
# Write load_with_overrides env_name function`,
      solution: `#!/bin/bash
load_with_overrides() {
  local env="\${1:-development}"
  [ -f "config/base.env" ] && source "config/base.env"
  [ -f "config/\${env}.env" ] && source "config/\${env}.env"
  echo "Loaded config for: \$env"
}
load_with_overrides production`,
      hints: ['Source base.env first, then the env-specific file.', 'The second source overrides values from the first.', 'Use ${1:-development} for default environment.'],
      concepts: ['config-layering', 'source', 'environment-overrides'],
    },
    {
      id: 'bash-config-9',
      title: 'Predict Config Loading Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict the final value of DB_HOST after loading with overrides.',
      skeleton: `#!/bin/bash
# base.env: DB_HOST=localhost
# prod.env: DB_HOST=db.prod.example.com
source base.env
source prod.env
echo "\$DB_HOST"`,
      solution: `db.prod.example.com`,
      hints: ['The second source overrides the first.', 'prod.env value wins.', 'db.prod.example.com'],
      concepts: ['source', 'override', 'config-precedence'],
    },
    {
      id: 'bash-config-10',
      title: 'Predict Default Values',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Predict the output when variables are and are not set.',
      skeleton: `#!/bin/bash
unset HOST
PORT=9090
echo "\${HOST:-localhost}:\${PORT:-8080}"`,
      solution: `localhost:9090`,
      hints: ['HOST is unset, so :-localhost gives "localhost".', 'PORT is set to 9090, so the default 8080 is not used.', 'localhost:9090'],
      concepts: ['default-values', 'parameter-expansion'],
    },
    {
      id: 'bash-config-11',
      title: 'Fix Sourcing Without File Check',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Fix the script that crashes if the config file does not exist.',
      skeleton: `#!/bin/bash
# BUG: crashes if .env doesn't exist
source .env
echo "Starting..."`,
      solution: `#!/bin/bash
[ -f .env ] && source .env
echo "Starting..."`,
      hints: ['Check with [ -f .env ] before sourcing.', '&& source .env only runs if file exists.', '[ -f .env ] && source .env'],
      concepts: ['file-test', 'source', 'defensive-coding'],
    },
    {
      id: 'bash-config-12',
      title: 'Fix Export in Config Parser',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Fix the config parser that fails to export variables to child processes.',
      skeleton: `#!/bin/bash
while IFS='=' read -r key value; do
    [[ "\$key" =~ ^# ]] && continue
    [[ -z "\$key" ]] && continue
    "\$key"="\$value"  # BUG: not exported
done < config.cfg
./child_process.sh`,
      solution: `#!/bin/bash
while IFS='=' read -r key value; do
    [[ "\$key" =~ ^# ]] && continue
    [[ -z "\$key" ]] && continue
    export "\$key"="\$value"
done < config.cfg
./child_process.sh`,
      hints: ['Variables must be exported to be visible in child processes.', 'Use export "key"="value".', 'export "$key"="$value"'],
      concepts: ['export', 'environment', 'child-process'],
    },
    {
      id: 'bash-config-13',
      title: 'Write a Config Writer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function write_config that takes KEY VALUE pairs and writes them to a .env file.',
      skeleton: `#!/bin/bash
# Write write_config key value [key value ...]`,
      solution: `#!/bin/bash
write_config() {
  local file="\${1:-.env}"
  shift
  while [ \$# -ge 2 ]; do
    local key="\$1"
    local value="\$2"
    shift 2
    if grep -q "^\${key}=" "\$file" 2>/dev/null; then
      sed -i "s|^\${key}=.*|\${key}=\${value}|" "\$file"
    else
      echo "\${key}=\${value}" >> "\$file"
    fi
  done
}
write_config .env DB_HOST localhost DB_PORT 5432`,
      hints: ['Check if the key exists with grep -q.', 'Use sed -i to update existing values.', 'Append new keys with >> if not found.'],
      concepts: ['config-writing', 'sed', 'grep'],
    },
    {
      id: 'bash-config-14',
      title: 'Refactor Hardcoded Values to Config',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Refactor the script to load its configuration from a .env file instead of hardcoded values.',
      skeleton: `#!/bin/bash
host="db.example.com"
port="5432"
dbname="production"
user="admin"
psql -h "\$host" -p "\$port" -d "\$dbname" -U "\$user"`,
      solution: `#!/bin/bash
[ -f .env ] && source .env
DB_HOST=\${DB_HOST:-db.example.com}
DB_PORT=\${DB_PORT:-5432}
DB_NAME=\${DB_NAME:-production}
DB_USER=\${DB_USER:-admin}
psql -h "\$DB_HOST" -p "\$DB_PORT" -d "\$DB_NAME" -U "\$DB_USER"`,
      hints: ['Source .env if it exists.', 'Use ${VAR:-default} to provide fallbacks.', 'ENV vars take precedence over defaults.'],
      concepts: ['config-file', 'refactoring', 'default-values'],
    },
    {
      id: 'bash-config-15',
      title: 'Write a Config Merge',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function merge_env that merges two .env files, with the second taking priority for duplicate keys.',
      skeleton: `#!/bin/bash
# Write merge_env base_file override_file output_file`,
      solution: `#!/bin/bash
merge_env() {
  local base="\$1"
  local override="\$2"
  local output="\${3:-merged.env}"

  # Start with base
  cp "\$base" "\$output"

  # Apply overrides
  while IFS='=' read -r key value; do
    [[ "\$key" =~ ^# ]] && continue
    [[ -z "\$key" ]] && continue
    if grep -q "^\${key}=" "\$output"; then
      sed -i "s|^\${key}=.*|\${key}=\${value}|" "\$output"
    else
      echo "\${key}=\${value}" >> "\$output"
    fi
  done < "\$override"
  echo "Merged to: \$output"
}`,
      hints: ['Copy base file to output first.', 'Then apply each key from the override file.', 'Update existing keys with sed -i, append new ones.'],
      concepts: ['config-merging', 'sed', 'grep', 'functions'],
    },
    {
      id: 'bash-config-16',
      title: 'Predict :? vs :- Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict which line causes an error and which uses a default.',
      skeleton: `#!/bin/bash
unset MYVAR
echo "\${MYVAR:-fallback}"
echo "still running"`,
      solution: `fallback\nstill running`,
      hints: [':-fallback uses the default without exiting.', ':? would exit with an error.', ':-only provides a default, no error.'],
      concepts: [':-', ':?', 'parameter-expansion'],
    },
    {
      id: 'bash-config-17',
      title: 'Write an Indirect Variable Checker',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function check_env that checks a list of variable names and reports which are set vs unset.',
      skeleton: `#!/bin/bash
# Write check_env var1 var2 ...`,
      solution: `#!/bin/bash
check_env() {
  for var in "\$@"; do
    if [ -n "\${!var}" ]; then
      echo "\$var=\${!var:0:20}..."
    else
      echo "\$var=(unset)"
    fi
  done
}
export DB_HOST=localhost
export DB_PORT=5432
check_env DB_HOST DB_PORT API_KEY`,
      hints: ['${!var} performs indirect expansion (value of the variable named by $var).', '[ -n "${!var}" ] checks if non-empty.', 'Print partial value with ${!var:0:20} for safety.'],
      concepts: ['indirect-expansion', 'variable-inspection'],
    },
    {
      id: 'bash-config-18',
      title: 'Fix Spaces Around = in Config',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Fix the config file parser that fails because values have spaces around the equals sign.',
      skeleton: `#!/bin/bash
# Config file has: DB_HOST = localhost (spaces around =)
while IFS='=' read -r key value; do
    key="\$key"    # BUG: key has trailing space
    export "\$key"="\$value"
done < config.cfg`,
      solution: `#!/bin/bash
while IFS='=' read -r key value; do
    key="\${key// /}"      # remove all spaces
    value="\${value# }"    # strip leading space from value
    [[ -z "\$key" ]] && continue
    export "\$key"="\$value"
done < config.cfg`,
      hints: ['Strip spaces from key with ${key// /}.', 'Strip leading space from value with ${value# }.', 'Bash does not auto-trim whitespace from IFS reads.'],
      concepts: ['string-manipulation', 'config-parsing', 'IFS'],
    },
    {
      id: 'bash-config-19',
      title: 'Write a Config Summary',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function show_config that prints all currently exported variables starting with APP_.',
      skeleton: `#!/bin/bash
# Write show_config function`,
      solution: `#!/bin/bash
show_config() {
  echo "=== App Configuration ==="
  env | grep "^APP_" | sort
}
export APP_ENV=production
export APP_PORT=8080
export APP_DEBUG=false
show_config`,
      hints: ['env lists all exported variables.', 'grep "^APP_" filters to APP_ prefix.', 'sort for readable output.'],
      concepts: ['env', 'grep', 'configuration-display'],
    },
    {
      id: 'bash-config-20',
      title: 'Refactor to Layered Config',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Refactor the flat config loader to support layered config (defaults -> base -> environment-specific).',
      skeleton: `#!/bin/bash
source config.env
echo "\$DB_HOST"`,
      solution: `#!/bin/bash
# Layer 1: script defaults
DB_HOST=\${DB_HOST:-localhost}
DB_PORT=\${DB_PORT:-5432}

# Layer 2: base config
[ -f config/base.env ] && source config/base.env

# Layer 3: environment override
APP_ENV=\${APP_ENV:-development}
[ -f "config/\${APP_ENV}.env" ] && source "config/\${APP_ENV}.env"

echo "\$DB_HOST:\$DB_PORT"`,
      hints: ['Set script defaults first with :-.', 'Source base.env to override defaults.', 'Source env-specific file last for final overrides.'],
      concepts: ['layered-config', 'source', 'refactoring'],
    },
  ],
};
