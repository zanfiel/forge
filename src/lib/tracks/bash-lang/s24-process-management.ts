import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'bash-proc',
  title: '24. Process Management',
  explanation: `## Process Management\n\nBash provides tools to inspect, signal, and manage running processes.\n\n### Listing Processes\n\n\`\`\`bash\nps aux                    # all processes\nps aux | grep nginx       # find nginx\npgrep nginx               # get PIDs of nginx\npgrep -l nginx            # PIDs with names\n\`\`\`\n\n### Sending Signals\n\n\`\`\`bash\nkill PID                  # SIGTERM (15) - graceful stop\nkill -9 PID               # SIGKILL - force kill\nkill -HUP PID             # SIGHUP - reload config\npkill nginx               # kill by name\npkill -9 -f "pattern"     # kill matching command\n\`\`\`\n\n### Signal Numbers\n\n| Signal | Number | Meaning |\n|--------|--------|----------|\n| SIGTERM | 15 | Graceful termination |\n| SIGKILL | 9 | Forced kill (uncatchable) |\n| SIGHUP | 1 | Hangup / reload |\n| SIGINT | 2 | Ctrl+C interrupt |\n| SIGUSR1 | 10 | User-defined |\n\n### /proc Filesystem\n\n\`\`\`bash\ncat /proc/PID/status       # process info\ncat /proc/PID/cmdline      # command line\nls /proc/PID/fd/           # open file descriptors\n\`\`\`\n\n### Background Processes\n\n\`\`\`bash\nsleep 100 &               # run in background\necho "PID: \$!"           # get last background PID\nwait \$!                  # wait for it to finish\n\`\`\``,
  exercises: [
    {
      id: 'bash-proc-1',
      title: 'Find Process by Name',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Use pgrep to find the PID(s) of a running process.',
      skeleton: `#!/bin/bash
# Find all sshd process IDs
___ sshd`,
      solution: `#!/bin/bash
pgrep sshd`,
      hints: ['pgrep finds processes by name and returns their PIDs.', 'pgrep sshd prints one PID per line.', 'pgrep'],
      concepts: ['pgrep', 'process-lookup'],
    },
    {
      id: 'bash-proc-2',
      title: 'Kill a Process by Name',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Use pkill to send SIGTERM to all processes with a given name.',
      skeleton: `#!/bin/bash
# Gracefully stop all sleep processes
___ sleep`,
      solution: `#!/bin/bash
pkill sleep`,
      hints: ['pkill sends signals to processes by name.', 'Default signal is SIGTERM (graceful stop).', 'pkill'],
      concepts: ['pkill', 'SIGTERM'],
    },
    {
      id: 'bash-proc-3',
      title: 'Get Background PID',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Start a background process and capture its PID.',
      skeleton: `#!/bin/bash
sleep 30 &
bg_pid=___
echo "Started: \$bg_pid"`,
      solution: `#!/bin/bash
sleep 30 &
bg_pid=\$!
echo "Started: \$bg_pid"`,
      hints: ['$! holds the PID of the last background process.', 'Use & to run in background.', '$!'],
      concepts: ['background-process', '$!'],
    },
    {
      id: 'bash-proc-4',
      title: 'Force Kill with SIGKILL',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Force kill a process using signal 9.',
      skeleton: `#!/bin/bash
pid=\$(pgrep frozen_app)
kill ___ "\$pid"`,
      solution: `#!/bin/bash
pid=\$(pgrep frozen_app)
kill -9 "\$pid"`,
      hints: ['-9 sends SIGKILL which cannot be caught or ignored.', 'Use -9 only as last resort after SIGTERM fails.', '-9'],
      concepts: ['SIGKILL', 'kill', 'force-kill'],
    },
    {
      id: 'bash-proc-5',
      title: 'Read /proc for Process Info',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Read the process state from /proc for a given PID.',
      skeleton: `#!/bin/bash
pid=\$\$  # current process PID
grep "^State:" /proc/___/status`,
      solution: `#!/bin/bash
pid=\$\$
grep "^State:" /proc/\$pid/status`,
      hints: ['/proc/$pid/status contains process state and resource info.', '$$ is the current shell PID.', '/proc/$pid/status'],
      concepts: ['/proc', 'process-status'],
    },
    {
      id: 'bash-proc-6',
      title: 'Wait for Background Process',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Start a background job, wait for it, and check its exit code.',
      skeleton: `#!/bin/bash
sleep 1 &
job_pid=\$!
___ \$job_pid
echo "Job exited: \$?"`,
      solution: `#!/bin/bash
sleep 1 &
job_pid=\$!
wait \$job_pid
echo "Job exited: \$?"`,
      hints: ['wait PID blocks until the process exits.', 'After wait, $? holds the exit code of the waited process.', 'wait'],
      concepts: ['wait', 'background-process', 'exit-code'],
    },
    {
      id: 'bash-proc-7',
      title: 'Write a Process Monitor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function is_running that returns 0 if a process name is running, 1 if not.',
      skeleton: `#!/bin/bash
# Write is_running function`,
      solution: `#!/bin/bash
is_running() {
  pgrep -x "\$1" > /dev/null 2>&1
}
if is_running sshd; then
  echo "sshd is running"
else
  echo "sshd is not running"
fi`,
      hints: ['pgrep -x matches the exact process name.', 'Redirect output to /dev/null -- we only care about exit code.', 'Return 0 on success, 1 on failure (pgrep handles this).'],
      concepts: ['pgrep', 'process-check', 'functions'],
    },
    {
      id: 'bash-proc-8',
      title: 'Write a Safe Killer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function safe_kill that sends SIGTERM, waits 5 seconds, then SIGKILL if still running.',
      skeleton: `#!/bin/bash
# Write safe_kill PID function`,
      solution: `#!/bin/bash
safe_kill() {
  local pid="\$1"
  kill -TERM "\$pid" 2>/dev/null
  local i=0
  while kill -0 "\$pid" 2>/dev/null && [ \$i -lt 5 ]; do
    sleep 1
    i=\$((i + 1))
  done
  if kill -0 "\$pid" 2>/dev/null; then
    kill -KILL "\$pid"
    echo "Force killed \$pid"
  else
    echo "Process \$pid stopped gracefully"
  fi
}`,
      hints: ['kill -0 PID tests if process exists without sending a signal.', 'Wait in a loop, then escalate to SIGKILL.', 'kill -TERM for graceful, kill -KILL for force.'],
      concepts: ['SIGTERM', 'SIGKILL', 'graceful-shutdown'],
    },
    {
      id: 'bash-proc-9',
      title: 'Write a Memory Usage Reporter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function mem_usage that prints the top 5 processes by memory usage.',
      skeleton: `#!/bin/bash
# Write mem_usage function`,
      solution: `#!/bin/bash
mem_usage() {
  ps aux --sort=-%mem | awk 'NR==1 || NR<=6 {printf "%-10s %-6s %s\\n", \$1, \$4, \$11}' | head 6
}
mem_usage`,
      hints: ['ps aux --sort=-%mem sorts by memory descending.', 'awk prints user, %mem, and command name.', 'NR==1 includes the header line; NR<=6 gets top 5 plus header.'],
      concepts: ['ps', 'awk', 'memory-usage'],
    },
    {
      id: 'bash-proc-10',
      title: 'Predict ps Output Fields',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Predict what $$ prints in a script.',
      skeleton: `#!/bin/bash
echo "Script PID: \$\$"
echo "Parent PID: \$PPID"`,
      solution: `Script PID: <current-pid>\nParent PID: <parent-pid>`,
      hints: ['$$ is the PID of the current shell process.', '$PPID is the parent process PID.', 'Both are numbers, different for each run.'],
      concepts: ['$$', '$PPID', 'PID'],
    },
    {
      id: 'bash-proc-11',
      title: 'Predict kill -0 Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict what kill -0 does and what the exit codes mean.',
      skeleton: `#!/bin/bash
sleep 60 &
pid=\$!
kill -0 \$pid 2>/dev/null && echo "alive" || echo "dead"
kill \$pid
wait \$pid 2>/dev/null
kill -0 \$pid 2>/dev/null && echo "alive" || echo "dead"`,
      solution: `alive\ndead`,
      hints: ['kill -0 tests process existence without sending a signal.', 'Before kill: process is alive. After kill+wait: process is dead.', 'alive then dead.'],
      concepts: ['kill-0', 'process-existence', 'SIGTERM'],
    },
    {
      id: 'bash-proc-12',
      title: 'Fix Missing Wait',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Fix the script that checks a background job\'s exit code before it finishes.',
      skeleton: `#!/bin/bash
false &
pid=\$!
# BUG: checking $? before the job finishes
echo "Exit: \$?"`,
      solution: `#!/bin/bash
false &
pid=\$!
wait \$pid
echo "Exit: \$?"`,
      hints: ['$? after & gives the exit code of the & operator, not the job.', 'Use wait $pid to block and get the job\'s exit code.', 'Add wait $pid before echo.'],
      concepts: ['wait', 'background-process', 'exit-code'],
    },
    {
      id: 'bash-proc-13',
      title: 'Fix pkill Typo in Pattern',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Fix the pkill command to use -f for matching the full command line.',
      skeleton: `#!/bin/bash
# BUG: want to kill by full command line pattern
pkill "python manage.py runserver"`,
      solution: `#!/bin/bash
pkill -f "python manage.py runserver"`,
      hints: ['pkill without -f matches only the process name, not arguments.', '-f matches the full command line.', 'pkill -f "pattern"'],
      concepts: ['pkill', '-f', 'command-line-pattern'],
    },
    {
      id: 'bash-proc-14',
      title: 'Refactor to pgrep',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Refactor the ps | grep | awk chain to a simpler pgrep command.',
      skeleton: `#!/bin/bash
pid=\$(ps aux | grep "[n]ginx" | awk '{print \$2}' | head -1)
echo "\$pid"`,
      solution: `#!/bin/bash
pid=\$(pgrep -x nginx | head -1)
echo "\$pid"`,
      hints: ['pgrep returns PIDs directly.', '-x matches the exact process name.', 'No ps | grep | awk chain needed.'],
      concepts: ['pgrep', 'refactoring'],
    },
    {
      id: 'bash-proc-15',
      title: 'Write a Watchdog',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function watchdog that restarts a command if it exits, up to 3 times.',
      skeleton: `#!/bin/bash
# Write watchdog function`,
      solution: `#!/bin/bash
watchdog() {
  local cmd="\$@"
  local tries=0
  while [ \$tries -lt 3 ]; do
    \$cmd
    local rc=\$?
    tries=\$((tries + 1))
    if [ \$rc -eq 0 ]; then
      echo "Completed successfully"
      return 0
    fi
    echo "Failed (attempt \$tries), restarting..."
  done
  echo "Gave up after 3 attempts"
  return 1
}
watchdog false`,
      hints: ['Run the command, capture exit code with $?.', 'Loop until success or max tries reached.', 'Increment tries on each failure.'],
      concepts: ['watchdog', 'restart-on-failure', 'exit-codes'],
    },
    {
      id: 'bash-proc-16',
      title: 'Predict pgrep Return Value',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict the exit code of pgrep when a process is and is not found.',
      skeleton: `#!/bin/bash
pgrep init > /dev/null 2>&1; echo "init: \$?"
pgrep no_such_process_xyz > /dev/null 2>&1; echo "xyz: \$?"`,
      solution: `init: 0\nxyz: 1`,
      hints: ['pgrep returns 0 when processes are found.', 'pgrep returns 1 when no processes match.', 'init: 0, xyz: 1.'],
      concepts: ['pgrep', 'exit-codes'],
    },
    {
      id: 'bash-proc-17',
      title: 'Write a PID File Manager',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write functions write_pid and check_pid that manage a PID file for a daemon.',
      skeleton: `#!/bin/bash
PIDFILE="/tmp/myapp.pid"
# Write write_pid and check_pid functions`,
      solution: `#!/bin/bash
PIDFILE="/tmp/myapp.pid"

write_pid() {
  echo \$\$ > "\$PIDFILE"
}

check_pid() {
  if [ -f "\$PIDFILE" ]; then
    local pid=\$(cat "\$PIDFILE")
    if kill -0 "\$pid" 2>/dev/null; then
      echo "Running (PID \$pid)"
      return 0
    else
      echo "Stale PID file"
      rm -f "\$PIDFILE"
    fi
  fi
  echo "Not running"
  return 1
}`,
      hints: ['write_pid writes $$ to the PID file.', 'check_pid reads the file and uses kill -0 to test if process is alive.', 'Remove stale PID files when the process is gone.'],
      concepts: ['pid-file', 'daemon', 'process-management'],
    },
    {
      id: 'bash-proc-18',
      title: 'Refactor kill to pkill',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Refactor the verbose PID-lookup-then-kill to use pkill.',
      skeleton: `#!/bin/bash
pid=\$(pgrep nginx)
if [ -n "\$pid" ]; then
  kill -HUP "\$pid"
fi`,
      solution: `#!/bin/bash
pkill -HUP nginx`,
      hints: ['pkill can send specific signals with -SIGNAL.', 'pkill -HUP nginx sends SIGHUP to all nginx processes.', 'No need to look up PIDs first.'],
      concepts: ['pkill', 'SIGHUP', 'refactoring'],
    },
    {
      id: 'bash-proc-19',
      title: 'Write a Process CPU Tracker',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function cpu_hogs that prints processes using more than $1% CPU.',
      skeleton: `#!/bin/bash
# Write cpu_hogs threshold function`,
      solution: `#!/bin/bash
cpu_hogs() {
  local threshold="\$1"
  ps aux | awk -v t="\$threshold" 'NR>1 && \$3+0 > t {print \$2, \$3"%", \$11}'
}
cpu_hogs 1.0`,
      hints: ['ps aux column 3 is %CPU.', 'awk -v t="$threshold" compares $3 to threshold.', 'Print PID, CPU%, and command name.'],
      concepts: ['ps', 'awk', 'cpu-usage'],
    },
    {
      id: 'bash-proc-20',
      title: 'Write a Cleanup Trap',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a script that starts a background process and uses trap to clean it up on exit.',
      skeleton: `#!/bin/bash
# Start background process and clean up on exit`,
      solution: `#!/bin/bash
sleep 999 &
bg_pid=\$!

cleanup() {
  echo "Cleaning up PID \$bg_pid"
  kill "\$bg_pid" 2>/dev/null
  wait "\$bg_pid" 2>/dev/null
}

trap cleanup EXIT INT TERM

echo "Running (bg: \$bg_pid). Press Ctrl+C..."
wait \$bg_pid`,
      hints: ['trap cleanup EXIT INT TERM calls cleanup on exit or signal.', 'Store $! in a variable before running other commands.', 'wait ensures the background process is reaped.'],
      concepts: ['trap', 'cleanup', 'background-process', 'SIGINT'],
    },
  ],
};
