import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'bash-cap',
  title: '50. Capstone',
  explanation: `## Bash Capstone\n\nThe capstone section combines all major Bash concepts into realistic, multi-faceted exercises. Each exercise requires knowledge from multiple sections.\n\n### Skills Combined\n\n- **Pipes + Arrays + Functions**: Data processing pipelines with reusable components\n- **Error Handling + Argument Parsing**: Robust scripts with proper validation\n- **Process Management + Job Control**: Concurrent operations with cleanup\n- **Security + Config Loading**: Safe configuration and input handling\n- **Performance + Advanced**: Efficient scripts using built-ins and dynamic techniques\n\n### Real-World Pattern\n\n\`\`\`bash\n#!/bin/bash\nset -euo pipefail\n\nusage() { echo "Usage: \$0 [-v] [-c config] <action>"; exit 1; }\n\n# Load config with defaults\n[ -f "\${CONFIG_FILE:-.env}" ] && source "\$CONFIG_FILE"\nDB_HOST=\${DB_HOST:-localhost}\n\n# Parse arguments\nwhile getopts "vc:" opt; do\n    case \$opt in\n        v) verbose=1 ;;\n        c) source "\$OPTARG" ;;\n        ?) usage ;;\n    esac\ndone\nshift \$((OPTIND - 1))\n[ \$# -lt 1 ] && usage\n\n# Main logic with error handling\ntrap 'cleanup' EXIT\ncleanup() { rm -f "\$tmpfile"; }\ntmpfile=\$(mktemp)\n\n# Process with pipeline\nprocess_data() {\n    local input="\$1"\n    grep -v "^#" "\$input" | sort | uniq > "\$tmpfile"\n    wc -l < "\$tmpfile"\n}\n\`\`\``,
  exercises: [
    {
      id: 'bash-cap-1',
      title: 'Write a System Health Check',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a complete health check script that checks disk, memory, and load, reports status, and exits non-zero if any check fails.',
      skeleton: `#!/bin/bash
# Write a system health check script`,
      solution: `#!/bin/bash
set -euo pipefail
DISK_THRESHOLD=\${DISK_THRESHOLD:-85}
MEM_THRESHOLD=\${MEM_THRESHOLD:-90}
LOAD_MULTIPLIER=\${LOAD_MULTIPLIER:-2}
failed=0

check_disk() {
    local pct=\$(df / --output=pcent | tail -1 | tr -d ' %')
    if [ "\$pct" -gt "\$DISK_THRESHOLD" ]; then
        echo "FAIL disk: \${pct}% (threshold: \${DISK_THRESHOLD}%)" >&2
        return 1
    fi
    echo "OK   disk: \${pct}%"
}

check_mem() {
    local pct=\$(free | awk '/Mem:/{printf "%d", \$3/\$2*100}')
    if [ "\$pct" -gt "\$MEM_THRESHOLD" ]; then
        echo "FAIL mem: \${pct}% (threshold: \${MEM_THRESHOLD}%)" >&2
        return 1
    fi
    echo "OK   mem: \${pct}%"
}

check_load() {
    local load=\$(awk '{print \$1}' /proc/loadavg)
    local cores=\$(nproc)
    local high=\$(echo "\$load \$cores \$LOAD_MULTIPLIER" | awk '{print (\$1 > \$2 * \$3) ? 1 : 0}')
    if [ "\$high" -eq 1 ]; then
        echo "FAIL load: \$load (cores: \$cores)" >&2
        return 1
    fi
    echo "OK   load: \$load"
}

check_disk || failed=\$((failed + 1))
check_mem || failed=\$((failed + 1))
check_load || failed=\$((failed + 1))
[ \$failed -eq 0 ] && echo "All checks passed" || echo "\$failed check(s) failed"
exit \$failed`,
      hints: ['Set thresholds from environment variables with defaults.', 'Each check function returns 0 for pass, 1 for fail.', 'Count failures and exit with the count.'],
      concepts: ['functions', 'arithmetic', 'pipes', 'error-handling', 'environment'],
    },
    {
      id: 'bash-cap-2',
      title: 'Write a Log Analyzer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a log analyzer that takes a log file, counts errors by type, and shows the top 5 most frequent.',
      skeleton: `#!/bin/bash
# Write a log analyzer: log_analyze logfile`,
      solution: `#!/bin/bash
log_analyze() {
    local logfile="\$1"
    [ -f "\$logfile" ] || { echo "Error: file not found: \$logfile" >&2; return 1; }

    echo "=== Log Analysis: \$logfile ==="
    echo "Total lines: \$(wc -l < "\$logfile")"
    echo
    echo "Top error types:"
    grep -oE '(ERROR|WARN|INFO|DEBUG|FATAL)[^]]*' "\$logfile" |
        awk '{print \$1}' |
        sort |
        uniq -c |
        sort -rn |
        head 5 |
        awk '{printf "  %5d  %s\\n", \$1, \$2}'
    echo
    echo "Most recent errors:"
    grep "ERROR\|FATAL" "\$logfile" | tail 5
}
log_analyze "\${1:-/var/log/syslog}"`,
      hints: ['Use wc -l < file for line count.', 'grep | awk | sort | uniq -c | sort -rn | head 5 for top N.', 'grep | tail 5 for recent errors.'],
      concepts: ['pipeline', 'awk', 'sort', 'uniq', 'grep'],
    },
    {
      id: 'bash-cap-3',
      title: 'Write a Deployment Script',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a deployment script with argument parsing, config loading, backup, deploy, and rollback on failure.',
      skeleton: `#!/bin/bash
# Write a deployment script`,
      solution: `#!/bin/bash
set -euo pipefail
APP_DIR=\${APP_DIR:-/opt/myapp}
BACKUP_DIR=\${BACKUP_DIR:-/opt/backups}
DEPLOY_USER=\${DEPLOY_USER:-deploy}
verbose=0

usage() {
    echo "Usage: \$0 [-v] [-c config] <version>"
    exit 1
}

while getopts "vc:" opt; do
    case \$opt in
        v) verbose=1 ;;
        c) source "\$OPTARG" ;;
        ?) usage ;;
    esac
done
shift \$((OPTIND - 1))
[ \$# -lt 1 ] && usage
VERSION="\$1"

log() { [ "\$verbose" -eq 1 ] && echo "[INFO] \$*"; }

backup() {
    local ts=\$(date +%Y%m%d_%H%M%S)
    mkdir -p "\$BACKUP_DIR"
    tar czf "\$BACKUP_DIR/app_\${ts}.tar.gz" -C "\$APP_DIR" . 2>/dev/null || true
    log "Backup created"
}

rollback() {
    local latest=\$(ls -t "\$BACKUP_DIR"/*.tar.gz 2>/dev/null | head 1)
    [ -n "\$latest" ] && tar xzf "\$latest" -C "\$APP_DIR"
    echo "Rolled back from: \$latest"
}

deploy() {
    log "Deploying version \$VERSION"
    # Deploy logic here
    echo "Deployed \$VERSION"
}

backup
deploy || { rollback; exit 1; }
echo "Deployment complete: \$VERSION"`,
      hints: ['Parse args with getopts, load config optionally.', 'backup() before deploy() for safety.', 'Rollback on failure with deploy || { rollback; exit 1; }.'],
      concepts: ['getopts', 'config-loading', 'error-handling', 'backup', 'rollback'],
    },
    {
      id: 'bash-cap-4',
      title: 'Write a Parallel File Processor',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a script that processes files in parallel (max 4 jobs), counts lines in each, and reports results sorted by count.',
      skeleton: `#!/bin/bash
# Write parallel file processor`,
      solution: `#!/bin/bash
set -euo pipefail
MAX_JOBS=4
tmpdir=\$(mktemp -d)
trap 'rm -rf "\$tmpdir"' EXIT

process_file() {
    local f="\$1"
    local count=\$(wc -l < "\$f")
    echo "\$count \$f" > "\$tmpdir/\$(basename "\$f").result"
}

running=0
for f in "\${@:-.}"; do
    [ -f "\$f" ] || continue
    process_file "\$f" &
    running=\$((running + 1))
    if [ \$running -ge \$MAX_JOBS ]; then
        wait -n 2>/dev/null || wait
        running=\$((running - 1))
    fi
done
wait

cat "\$tmpdir"/*.result 2>/dev/null | sort -rn | head 20`,
      hints: ['Run process_file in background with &.', 'Limit concurrent jobs with a counter and wait -n.', 'Write results to temp files, then sort at the end.'],
      concepts: ['parallel', 'job-control', 'wait', 'tmpfiles', 'sort'],
    },
    {
      id: 'bash-cap-5',
      title: 'Write a Config-Driven Service Manager',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a service manager that reads service definitions from a config file and supports start/stop/status subcommands.',
      skeleton: `#!/bin/bash
# Write a service manager`,
      solution: `#!/bin/bash
set -euo pipefail
CONFIG="\${SERVICE_CONFIG:-/etc/services.conf}"
PIDDIR="\${PID_DIR:-/tmp/services}"
mkdir -p "\$PIDDIR"

load_services() {
    declare -gA SERVICES
    while IFS='=' read -r name cmd; do
        [[ "\$name" =~ ^# ]] && continue
        [[ -z "\$name" ]] && continue
        SERVICES["\$name"]="\$cmd"
    done < "\$CONFIG"
}

svc_start() {
    local name="\$1"
    local cmd="\${SERVICES[\$name]:-}"
    [ -z "\$cmd" ] && { echo "Unknown service: \$name"; return 1; }
    nohup bash -c "\$cmd" > "\$PIDDIR/\${name}.log" 2>&1 &
    echo \$! > "\$PIDDIR/\${name}.pid"
    echo "Started \$name (PID \$(cat "\$PIDDIR/\${name}.pid"))"
}

svc_stop() {
    local name="\$1"
    local pidfile="\$PIDDIR/\${name}.pid"
    [ -f "\$pidfile" ] || { echo "Not running: \$name"; return 1; }
    kill "\$(cat "\$pidfile")" 2>/dev/null
    rm -f "\$pidfile"
    echo "Stopped \$name"
}

svc_status() {
    local name="\$1"
    local pidfile="\$PIDDIR/\${name}.pid"
    if [ -f "\$pidfile" ] && kill -0 "\$(cat "\$pidfile")" 2>/dev/null; then
        echo "\$name: running (PID \$(cat "\$pidfile"))"
    else
        echo "\$name: stopped"
    fi
}

load_services
subcmd="\${1:-status}"; shift || true
for svc in "\$@"; do
    "svc_\${subcmd}" "\$svc"
done`,
      hints: ['Use declare -gA for a global associative array.', 'Build function names with "svc_${subcmd}" for dispatch.', 'nohup + pidfile for process management.'],
      concepts: ['associative-arrays', 'dynamic-dispatch', 'process-management', 'config-loading'],
    },
    {
      id: 'bash-cap-6',
      title: 'Write a Monitoring Dashboard',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a monitoring script that runs in a loop, clears the terminal, and shows live system stats every 5 seconds.',
      skeleton: `#!/bin/bash
# Write a monitoring dashboard`,
      solution: `#!/bin/bash
interval=\${INTERVAL:-5}
trap 'tput cnorm; echo; exit 0' INT TERM EXIT
tput civis  # hide cursor

show_dashboard() {
    tput cup 0 0  # move cursor to top
    echo "=== System Dashboard [\$(date '+%H:%M:%S')] ==="
    echo
    echo "CPU Load: \$(awk '{print \$1, \$2, \$3}' /proc/loadavg)"
    echo "Memory:   \$(free -h | awk '/Mem:/{print \$3"/"$2}')"
    echo "Disk /:   \$(df -h / | awk 'NR==2{print \$3"/"$2" ("\$5")"}')"
    echo
    echo "Top processes:"
    ps aux --sort=-%cpu | awk 'NR>1 && NR<=6 {printf "  %-20s %5s%%\\n", \$11, \$3}'
    echo
    echo "Network connections: \$(ss -tn | tail -n +2 | wc -l)"
    echo
    echo "Press Ctrl+C to exit"
}

clear
while true; do
    show_dashboard
    sleep "\$interval"
done`,
      hints: ['tput cup 0 0 redraws in place without flashing.', 'trap restores cursor on exit.', 'Combine ps, df, free, awk in pipeline for each metric.'],
      concepts: ['terminal-control', 'pipeline', 'ps', 'df', 'free', 'trap'],
    },
    {
      id: 'bash-cap-7',
      title: 'Write a Database Backup Script',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a database backup script with config loading, validation, safe temp files, compression, and retention policy.',
      skeleton: `#!/bin/bash
# Write a database backup script`,
      solution: `#!/bin/bash
set -euo pipefail
[ -f .env ] && source .env
DB_HOST=\${DB_HOST:-localhost}
DB_PORT=\${DB_PORT:-5432}
DB_USER=\${DB_USER:-postgres}
DB_NAME=\${DB_NAME:?"DB_NAME is required"}
BACKUP_DIR=\${BACKUP_DIR:-/tmp/backups}
RETENTION_DAYS=\${RETENTION_DAYS:-7}

require_tool() { command -v "\$1" >/dev/null || { echo "Missing: \$1"; exit 1; }; }
require_tool pg_dump
require_tool gzip

mkdir -p "\$BACKUP_DIR"
umask 077

tmpfile=\$(mktemp "\$BACKUP_DIR/backup.XXXXXX.sql")
trap 'rm -f "\$tmpfile"' EXIT

timestamp=\$(date +%Y%m%d_%H%M%S)
outfile="\$BACKUP_DIR/\${DB_NAME}_\${timestamp}.sql.gz"

echo "Backing up \$DB_NAME..."
PGPASSWORD=\${DB_PASS:-} pg_dump -h "\$DB_HOST" -p "\$DB_PORT" -U "\$DB_USER" "\$DB_NAME" > "\$tmpfile"
gzip -c "\$tmpfile" > "\$outfile"
echo "Backup: \$outfile (\$(du -sh "\$outfile" | cut -f1))"

# Retention cleanup
find "\$BACKUP_DIR" -name "\${DB_NAME}_*.sql.gz" -mtime +"\$RETENTION_DAYS" -delete
echo "Cleaned backups older than \$RETENTION_DAYS days"`,
      hints: ['Source .env for config; use :? for required variables.', 'umask 077 protects backup files.', 'mktemp + trap for safe temp file handling.'],
      concepts: ['config-loading', 'validation', 'mktemp', 'trap', 'umask', 'pipeline'],
    },
    {
      id: 'bash-cap-8',
      title: 'Write a CLI Framework',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a reusable CLI framework with automatic subcommand discovery, help generation, and colored output.',
      skeleton: `#!/bin/bash
# Write a CLI framework`,
      solution: `#!/bin/bash
set -euo pipefail
SCRIPT_NAME=\$(basename "\$0")
RED='\\033[0;31m'; GREEN='\\033[0;32m'; YELLOW='\\033[1;33m'; NC='\\033[0m'

err()  { echo -e "\${RED}ERROR:\${NC} \$*" >&2; }
ok()   { echo -e "\${GREEN}OK:\${NC} \$*"; }
warn() { echo -e "\${YELLOW}WARN:\${NC} \$*"; }

cmd_help() {
    echo "Usage: \$SCRIPT_NAME <command> [args]"
    echo
    echo "Commands:"
    declare -F | awk '{print \$3}' | grep '^cmd_' | sed 's/^cmd_/  /' | sort
}

cmd_version() { echo "\$SCRIPT_NAME v1.0.0"; }
cmd_ping()    { echo "pong"; }
cmd_env()     { env | grep "^APP_" | sort; }

main() {
    local subcmd="\${1:-help}"
    shift || true
    local fn="cmd_\${subcmd}"
    if declare -f "\$fn" > /dev/null; then
        "\$fn" "\$@"
    else
        err "Unknown command: \$subcmd"
        cmd_help
        exit 1
    fi
}
main "\$@"`,
      hints: ['declare -F lists all defined functions.', 'grep ^cmd_ finds all command functions.', 'Dynamic dispatch: "$fn" "$@"'],
      concepts: ['cli-framework', 'dynamic-dispatch', 'declare-F', 'colors', 'help-generation'],
    },
    {
      id: 'bash-cap-9',
      title: 'Write a Data Pipeline',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a data pipeline that reads CSV, filters rows, transforms data, and outputs a sorted report.',
      skeleton: `#!/bin/bash
# CSV pipeline: filter, transform, report`,
      solution: `#!/bin/bash
set -euo pipefail

# Input CSV: name,score,grade
# Filter scores > 60, uppercase names, sort by score desc

process_csv() {
    local file="\$1"
    local min_score="\${2:-60}"

    [ -f "\$file" ] || { echo "File not found: \$file" >&2; return 1; }

    echo "Name,Score,Grade,Status"
    tail -n +2 "\$file" |
        awk -F, -v min="\$min_score" '\$2 > min {print \$0}' |
        awk -F, '{
            name = toupper(\$1)
            score = \$2
            grade = \$3
            status = (score >= 90) ? "PASS" : (score >= 70) ? "OK" : "WARN"
            printf "%s,%s,%s,%s\\n", name, score, grade, status
        }' |
        sort -t, -k2 -rn
}

report() {
    local data="\$1"
    local total=\$(wc -l < "\$data")
    local passed=\$(grep ",PASS" "\$data" | wc -l)
    echo "=== Report ==="
    cat "\$data"
    echo
    echo "Total: \$total, Passed: \$passed"
}

tmpfile=\$(mktemp)
trap 'rm -f "\$tmpfile"' EXIT
process_csv "\${1:-data.csv}" > "\$tmpfile"
report "\$tmpfile"`,
      hints: ['tail -n +2 skips the header line.', 'awk -F, splits on comma.', 'Chain awk stages for filter, then transform.'],
      concepts: ['awk', 'pipeline', 'CSV', 'sort', 'tmpfiles'],
    },
    {
      id: 'bash-cap-10',
      title: 'Write a Network Scanner',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a network scanner that pings a CIDR /24 range in parallel, collects results, and shows alive hosts.',
      skeleton: `#!/bin/bash
# Write a network scanner for /24 ranges`,
      solution: `#!/bin/bash
set -euo pipefail
MAX_JOBS=\${MAX_JOBS:-50}
TIMEOUT=\${TIMEOUT:-1}

scan_host() {
    local host="\$1"
    if ping -c1 -W"\$TIMEOUT" "\$host" &>/dev/null; then
        echo "\$host"
    fi
}

scan_range() {
    local base="\$1"    # e.g., 192.168.1
    local tmpdir=\$(mktemp -d)
    trap "rm -rf '\$tmpdir'" RETURN
    local running=0
    local pids=()

    echo "Scanning \${base}.0/24..."
    for i in \$(seq 1 254); do
        scan_host "\${base}.\${i}" > "\$tmpdir/\$i" &
        pids+=(\$!)
        running=\$((running + 1))
        if [ \$running -ge \$MAX_JOBS ]; then
            wait "\${pids[0]}"
            pids=("\${pids[@]:1}")
            running=\$((running - 1))
        fi
    done
    wait

    echo "=== Alive Hosts ==="
    cat "\$tmpdir"/* 2>/dev/null | grep -v "^$" | sort -t. -k4 -n
    echo "Scan complete."
}

scan_range "\${1:-192.168.1}"`,
      hints: ['Ping each host in background with &.', 'Limit concurrency with a counter and wait on oldest PID.', 'Collect results in tmpdir, cat and sort at the end.'],
      concepts: ['parallel', 'ping', 'arrays', 'sort', 'job-control', 'tmpfiles'],
    },
    {
      id: 'bash-cap-11',
      title: 'Write a Secrets Manager',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a secrets manager that stores key-value pairs in an encrypted file using openssl, with get/set/list commands.',
      skeleton: `#!/bin/bash
# Write a secrets manager`,
      solution: `#!/bin/bash
set -euo pipefail
SECRETS_FILE="\${SECRETS_FILE:-\$HOME/.secrets.enc}"
CIPHER="aes-256-cbc"

secrets_get_password() {
    read -r -s -p "Master password: " SECRETS_PASS; echo >&2
}

secrets_decrypt() {
    openssl enc -d -"\$CIPHER" -pbkdf2 -pass "pass:\$SECRETS_PASS" -in "\$SECRETS_FILE" 2>/dev/null
}

secrets_encrypt() {
    openssl enc -"\$CIPHER" -pbkdf2 -pass "pass:\$SECRETS_PASS" -out "\$SECRETS_FILE"
}

cmd_set() {
    local key="\$1" value="\$2"
    secrets_get_password
    local current=""
    [ -f "\$SECRETS_FILE" ] && current=\$(secrets_decrypt | grep -v "^\${key}=")
    printf "%s\\n%s=%s\\n" "\$current" "\$key" "\$value" | grep -v "^$" | secrets_encrypt
    echo "Set \$key"
}

cmd_get() {
    local key="\$1"
    secrets_get_password
    secrets_decrypt | grep "^\${key}=" | cut -d= -f2-
}

cmd_list() {
    secrets_get_password
    secrets_decrypt | cut -d= -f1 | sort
}

case "\${1:-list}" in
    set)  cmd_set "\$2" "\$3" ;;
    get)  cmd_get "\$2" ;;
    list) cmd_list ;;
esac`,
      hints: ['openssl enc encrypts/decrypts with a password.', '-pbkdf2 uses secure key derivation.', 'Decrypt, modify, re-encrypt for set operations.'],
      concepts: ['security', 'openssl', 'subcommands', 'config', 'encryption'],
    },
    {
      id: 'bash-cap-12',
      title: 'Write an Auto-Retry Script',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function retry that retries a command with exponential backoff up to N times.',
      skeleton: `#!/bin/bash
# Write retry max_attempts command [args...]`,
      solution: `#!/bin/bash
retry() {
    local max="\$1"
    shift
    local attempt=1
    local delay=1

    while [ \$attempt -le \$max ]; do
        echo "Attempt \$attempt/\$max: \$*" >&2
        if "\$@"; then
            return 0
        fi
        if [ \$attempt -lt \$max ]; then
            echo "Failed. Retrying in \${delay}s..." >&2
            sleep "\$delay"
            delay=\$((delay * 2))
        fi
        attempt=\$((attempt + 1))
    done
    echo "All \$max attempts failed." >&2
    return 1
}

# Demo: fail 2 times then succeed
attempt_count=0
flaky() {
    attempt_count=\$((attempt_count + 1))
    [ \$attempt_count -ge 3 ] && { echo "Success!"; return 0; }
    return 1
}
retry 5 flaky`,
      hints: ['Start with delay=1 and double it each attempt.', 'Call "$@" to execute the command.', 'Return 0 on success, 1 after all attempts fail.'],
      concepts: ['retry', 'exponential-backoff', 'error-handling'],
    },
    {
      id: 'bash-cap-13',
      title: 'Write a File Watcher',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a file watcher that monitors a file for changes and runs a command when it changes.',
      skeleton: `#!/bin/bash
# Write watch_file file command [args...]`,
      solution: `#!/bin/bash
watch_file() {
    local file="\$1"
    shift
    local cmd=("\$@")
    local last_hash=""

    echo "Watching \$file for changes..."
    trap 'echo "Stopped."; exit 0' INT TERM

    while true; do
        if [ -f "\$file" ]; then
            local current_hash=\$(md5sum "\$file" 2>/dev/null | cut -d' ' -f1)
            if [ "\$current_hash" != "\$last_hash" ]; then
                last_hash="\$current_hash"
                [ -n "\$last_hash" ] && {
                    echo "[\$(date '+%H:%M:%S')] Changed: \$file"
                    "\${cmd[@]}"
                }
            fi
        fi
        sleep 1
    done
}

watch_file /tmp/watched.txt echo "File changed!"`,
      hints: ['Store md5sum hash of the file.', 'Compare current hash to last hash each second.', 'Run the command when hash changes.'],
      concepts: ['file-watching', 'md5sum', 'trap', 'infinite-loop'],
    },
    {
      id: 'bash-cap-14',
      title: 'Write a Multi-Server Command Runner',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a script that runs an SSH command on multiple servers in parallel and collects results with status.',
      skeleton: `#!/bin/bash
# Run command on multiple servers in parallel`,
      solution: `#!/bin/bash
set -euo pipefail
SSH_KEY="\${SSH_KEY:-\$HOME/.ssh/id_rsa}"
SSH_OPTS="-o ConnectTimeout=5 -o StrictHostKeyChecking=no -i \$SSH_KEY"

run_on_server() {
    local host="\$1"
    shift
    local output
    if output=\$(ssh \$SSH_OPTS "\$host" "\$@" 2>&1); then
        echo "OK  \$host: \$output"
    else
        echo "ERR \$host: \$output" >&2
    fi
}

run_parallel() {
    local cmd=("\$@")
    local servers_file="\${SERVERS_FILE:-servers.txt}"
    local pids=()
    local tmpdir=\$(mktemp -d)
    trap "rm -rf '\$tmpdir'" RETURN

    while IFS= read -r host; do
        [[ "\$host" =~ ^# ]] && continue
        [ -z "\$host" ] && continue
        run_on_server "\$host" "\${cmd[@]}" > "\$tmpdir/\$host" 2>&1 &
        pids+=(\$!)
    done < "\$servers_file"

    for pid in "\${pids[@]}"; do wait "\$pid" || true; done
    cat "\$tmpdir"/*
}

run_parallel "\${@:-uptime}"`,
      hints: ['Read servers from a file, skip comments.', 'Run SSH in background for each server.', 'Collect per-server output in tmpdir files.'],
      concepts: ['ssh', 'parallel', 'job-control', 'tmpfiles', 'while-read'],
    },
    {
      id: 'bash-cap-15',
      title: 'Write a Complete REST Client',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a bash REST client with functions for GET, POST, PUT, DELETE that handle auth, errors, and JSON parsing.',
      skeleton: `#!/bin/bash
# Write a REST client`,
      solution: `#!/bin/bash
set -euo pipefail
BASE_URL="\${API_BASE_URL:-https://jsonplaceholder.typicode.com}"
API_KEY="\${API_KEY:-}"
CURL_OPTS="-s -f --max-time 10"

_request() {
    local method="\$1"
    local path="\$2"
    shift 2
    local url="\${BASE_URL}\${path}"
    local headers=(-H "Content-Type: application/json")
    [ -n "\$API_KEY" ] && headers+=(-H "Authorization: Bearer \$API_KEY")

    local response
    if response=\$(curl \$CURL_OPTS -X "\$method" "\${headers[@]}" "\$@" "\$url"); then
        echo "\$response"
    else
        echo "HTTP request failed: \$method \$url" >&2
        return 1
    fi
}

api_get()    { _request GET "\$1"; }
api_post()   { _request POST "\$1" -d "\$2"; }
api_put()    { _request PUT "\$1" -d "\$2"; }
api_delete() { _request DELETE "\$1"; }

echo "GET /posts/1:"
api_get "/posts/1" | python3 -m json.tool 2>/dev/null || api_get "/posts/1"`,
      hints: ['_request is the base function; others wrap it.', 'curl -f fails on HTTP errors.', 'Add Authorization header when API_KEY is set.'],
      concepts: ['curl', 'REST', 'api-client', 'functions', 'config'],
    },
    {
      id: 'bash-cap-16',
      title: 'Write a Self-Updating Script',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a script that checks for a newer version of itself from a URL, downloads it, verifies a checksum, and updates itself atomically.',
      skeleton: `#!/bin/bash
# Write a self-updating script`,
      solution: `#!/bin/bash
SELF="\$0"
VERSION="1.0.0"
UPDATE_URL="\${UPDATE_URL:-https://example.com/script}"
CHECKSUM_URL="\${UPDATE_URL}.sha256"

check_update() {
    local tmpfile=\$(mktemp)
    local tmpcheck=\$(mktemp)
    trap "rm -f '\$tmpfile' '\$tmpcheck'" RETURN

    echo "Checking for updates..."
    if ! curl -sf --max-time 10 "\$UPDATE_URL" -o "\$tmpfile"; then
        echo "Update check failed" >&2; return 1
    fi

    if curl -sf --max-time 5 "\$CHECKSUM_URL" -o "\$tmpcheck" 2>/dev/null; then
        local expected=\$(awk '{print \$1}' "\$tmpcheck")
        local actual=\$(sha256sum "\$tmpfile" | awk '{print \$1}')
        if [ "\$expected" != "\$actual" ]; then
            echo "Checksum mismatch!" >&2; return 1
        fi
        echo "Checksum verified"
    fi

    chmod +x "\$tmpfile"
    mv "\$tmpfile" "\$SELF"
    echo "Updated to latest version. Please restart."
}

case "\${1:-}" in
    --update) check_update ;;
    --version) echo "\$VERSION" ;;
    *) echo "Running v\$VERSION... use --update to update" ;;
esac`,
      hints: ['Download to temp file first, verify checksum, then mv atomically.', 'mv is atomic on the same filesystem.', 'chmod +x before mv.'],
      concepts: ['self-update', 'curl', 'checksum', 'atomic-update', 'mktemp'],
    },
    {
      id: 'bash-cap-17',
      title: 'Write a Task Queue',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a file-based task queue where workers pick up tasks atomically using file locking.',
      skeleton: `#!/bin/bash
# Write a task queue with atomic dequeue`,
      solution: `#!/bin/bash
set -euo pipefail
QUEUE_DIR="\${QUEUE_DIR:-/tmp/task_queue}"
mkdir -p "\$QUEUE_DIR/pending" "\$QUEUE_DIR/done" "\$QUEUE_DIR/failed"

enqueue() {
    local task="\$1"
    local id="\$(date +%s%N)_\$\$"
    echo "\$task" > "\$QUEUE_DIR/pending/\$id"
    echo "Queued: \$id"
}

dequeue() {
    local task_file
    for task_file in "\$QUEUE_DIR"/pending/*; do
        [ -f "\$task_file" ] || continue
        # Atomic move to claim the task
        local working="\$QUEUE_DIR/working/\$(basename "\$task_file")"
        mkdir -p "\$QUEUE_DIR/working"
        if mv "\$task_file" "\$working" 2>/dev/null; then
            echo "\$working"
            return 0
        fi
    done
    return 1
}

worker() {
    while true; do
        local task_file
        if task_file=\$(dequeue); then
            local task=\$(cat "\$task_file")
            echo "Processing: \$task"
            if bash -c "\$task"; then
                mv "\$task_file" "\$QUEUE_DIR/done/"
            else
                mv "\$task_file" "\$QUEUE_DIR/failed/"
            fi
        else
            sleep 0.5
        fi
    done
}

case "\${1:-help}" in
    enqueue) enqueue "\$2" ;;
    worker)  worker ;;
    status)  echo "Pending: \$(ls "\$QUEUE_DIR/pending" 2>/dev/null | wc -l) Done: \$(ls "\$QUEUE_DIR/done" 2>/dev/null | wc -l)" ;;
esac`,
      hints: ['mv is atomic on same filesystem -- use it to claim tasks.', 'Loop in worker trying to dequeue.', 'Move to done/ or failed/ based on exit code.'],
      concepts: ['file-locking', 'task-queue', 'atomic-operations', 'worker'],
    },
    {
      id: 'bash-cap-18',
      title: 'Write a Log Rotation Script',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a log rotation script that compresses logs older than 1 day, removes logs older than 7 days, and sends a summary.',
      skeleton: `#!/bin/bash
# Write a log rotation script`,
      solution: `#!/bin/bash
set -euo pipefail
LOG_DIR="\${LOG_DIR:-/var/log/myapp}"
COMPRESS_AGE=1
REMOVE_AGE=7
compressed=0
removed=0

[ -d "\$LOG_DIR" ] || { echo "Log dir not found: \$LOG_DIR" >&2; exit 1; }

# Compress old logs
while IFS= read -r f; do
    gzip -f "\$f" && compressed=\$((compressed + 1))
done < <(find "\$LOG_DIR" -name "*.log" -mtime +"\$COMPRESS_AGE" -not -name "*.gz")

# Remove very old compressed logs
while IFS= read -r f; do
    rm -f "\$f" && removed=\$((removed + 1))
done < <(find "\$LOG_DIR" -name "*.gz" -mtime +"\$REMOVE_AGE")

echo "Log rotation complete: compressed=\$compressed removed=\$removed"
echo "Current log dir size: \$(du -sh "\$LOG_DIR" | cut -f1)"`,
      hints: ['Use < <(find ...) so counter variables persist.', 'find -mtime +N finds files older than N days.', 'gzip -f compresses in place.'],
      concepts: ['log-rotation', 'find', 'gzip', 'process-substitution'],
    },
    {
      id: 'bash-cap-19',
      title: 'Write a Config Diff Tool',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a tool that compares two .env config files and reports added, removed, and changed keys.',
      skeleton: `#!/bin/bash
# Write config diff tool`,
      solution: `#!/bin/bash
config_diff() {
    local old="\$1"
    local new="\$2"

    [ -f "\$old" ] || { echo "Not found: \$old" >&2; return 1; }
    [ -f "\$new" ] || { echo "Not found: \$new" >&2; return 1; }

    local old_keys=\$(grep -v "^#" "\$old" | grep "=" | cut -d= -f1 | sort)
    local new_keys=\$(grep -v "^#" "\$new" | grep "=" | cut -d= -f1 | sort)

    echo "=== Added ==="
    comm -13 <(echo "\$old_keys") <(echo "\$new_keys")

    echo "=== Removed ==="
    comm -23 <(echo "\$old_keys") <(echo "\$new_keys")

    echo "=== Changed ==="
    comm -12 <(echo "\$old_keys") <(echo "\$new_keys") | while read key; do
        local oval=\$(grep "^\${key}=" "\$old" | cut -d= -f2-)
        local nval=\$(grep "^\${key}=" "\$new" | cut -d= -f2-)
        [ "\$oval" != "\$nval" ] && echo "  \$key: '\$oval' -> '\$nval'"
    done
}
config_diff base.env production.env`,
      hints: ['Use comm -13 for keys only in new, comm -23 for only in old.', 'comm requires sorted input -- use <(echo "$keys").', 'Compare values of shared keys with string comparison.'],
      concepts: ['comm', 'process-substitution', 'config-comparison', 'diff'],
    },
    {
      id: 'bash-cap-20',
      title: 'Write a Complete CI/CD Pipeline',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a CI/CD pipeline script with stages (lint, test, build, deploy), timing, error reporting, and rollback support.',
      skeleton: `#!/bin/bash
# Write a CI/CD pipeline`,
      solution: `#!/bin/bash
set -euo pipefail
STAGE_RESULTS=()
TOTAL_TIME=0
DRY_RUN=\${DRY_RUN:-0}

run_stage() {
    local name="\$1"
    shift
    local start=\$(date +%s)
    echo "--- Stage: \$name ---"
    local status="PASS"
    if [ "\$DRY_RUN" -eq 1 ]; then
        echo "(dry run: \$*)"
    elif "\$@"; then
        :
    else
        status="FAIL"
    fi
    local end=\$(date +%s)
    local elapsed=\$((end - start))
    TOTAL_TIME=\$((TOTAL_TIME + elapsed))
    STAGE_RESULTS+=("\$name:\$status:\${elapsed}s")
    echo "\$name: \$status (\${elapsed}s)"
    [ "\$status" = "PASS" ]
}

stage_lint()   { echo "Linting...";   return 0; }
stage_test()   { echo "Testing...";   return 0; }
stage_build()  { echo "Building...";  return 0; }
stage_deploy() { echo "Deploying..."; return 0; }

rollback() { echo "ROLLBACK triggered"; stage_deploy --rollback 2>/dev/null || true; }
trap 'rollback' ERR

run_stage lint   stage_lint
run_stage test   stage_test
run_stage build  stage_build
run_stage deploy stage_deploy

echo
echo "=== Pipeline Summary ==="
for result in "\${STAGE_RESULTS[@]}"; do
    echo "  \$result"
done
echo "Total time: \${TOTAL_TIME}s"`,
      hints: ['run_stage captures timing and status in arrays.', 'trap ... ERR calls rollback on failure.', 'STAGE_RESULTS array accumulates results for the summary.'],
      concepts: ['CI-CD', 'stages', 'timing', 'trap', 'arrays', 'rollback'],
    },
  ],
};
