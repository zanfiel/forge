import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'bash-jobs',
  title: '25. Job Control',
  explanation: `## Job Control\n\nJob control lets you manage multiple processes within a shell session.\n\n### Background and Foreground\n\n\`\`\`bash\nsleep 100 &          # start in background\nfg                   # bring last job to foreground\nfg %2                # bring job 2 to foreground\nbg                   # resume stopped job in background\n\`\`\`\n\n### Suspending and Listing\n\n\`\`\`bash\n# Press Ctrl+Z to suspend the foreground job\njobs                 # list all jobs\njobs -l              # include PIDs\njobs -p              # print PIDs only\n\`\`\`\n\n### Job Specifications\n\n\`\`\`bash\n%1        # job number 1\n%+        # current job (most recent)\n%-        # previous job\n%sleep    # job whose name starts with 'sleep'\n\`\`\`\n\n### wait\n\n\`\`\`bash\nwait        # wait for all background jobs\nwait \$pid  # wait for specific PID\nwait %1    # wait for job 1\n\`\`\`\n\n### disown\n\n\`\`\`bash\nsleep 999 &\ndisown          # remove from job table (survives shell exit)\ndisown %1       # disown specific job\ndisown -h %1    # keep in table but ignore HUP\n\`\`\`\n\n### nohup\n\n\`\`\`bash\nnohup ./long_task.sh &   # immune to hangup, output to nohup.out\nnohup ./task.sh > task.log 2>&1 &\n\`\`\``,
  exercises: [
    {
      id: 'bash-jobs-1',
      title: 'Start Background Job',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Start a process in the background and capture its job ID.',
      skeleton: `#!/bin/bash
sleep 60 ___
echo "Job started"
jobs`,
      solution: `#!/bin/bash
sleep 60 &
echo "Job started"
jobs`,
      hints: ['& at the end of a command runs it in the background.', 'jobs lists all background jobs.', '&'],
      concepts: ['background', 'jobs'],
    },
    {
      id: 'bash-jobs-2',
      title: 'wait for All Jobs',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Start two background jobs and wait for both to finish.',
      skeleton: `#!/bin/bash
sleep 1 &
sleep 2 &
echo "Waiting..."
___
echo "All done"`,
      solution: `#!/bin/bash
sleep 1 &
sleep 2 &
echo "Waiting..."
wait
echo "All done"`,
      hints: ['wait with no arguments waits for all background jobs.', 'After wait, all background jobs have finished.', 'wait'],
      concepts: ['wait', 'background-jobs'],
    },
    {
      id: 'bash-jobs-3',
      title: 'nohup for Persistent Jobs',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Run a script so it survives terminal close and logs to a file.',
      skeleton: `#!/bin/bash
___ ./long_task.sh > task.log 2>&1 ___`,
      solution: `#!/bin/bash
nohup ./long_task.sh > task.log 2>&1 &`,
      hints: ['nohup makes the process immune to SIGHUP (terminal close).', '> task.log 2>&1 redirects all output to a log file.', '& puts it in the background.'],
      concepts: ['nohup', 'background', 'SIGHUP'],
    },
    {
      id: 'bash-jobs-4',
      title: 'disown a Job',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Start a background job and disown it so it survives shell exit.',
      skeleton: `#!/bin/bash
sleep 999 &
echo "PID: \$!"
___`,
      solution: `#!/bin/bash
sleep 999 &
echo "PID: \$!"
disown`,
      hints: ['disown removes the job from the shell\'s job table.', 'The process keeps running after shell exits.', 'disown'],
      concepts: ['disown', 'job-control'],
    },
    {
      id: 'bash-jobs-5',
      title: 'Wait for Specific Job',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Wait for a specific background job by PID and check its exit code.',
      skeleton: `#!/bin/bash
false &
pid=\$!
___ \$pid
echo "Exit code: \$?"`,
      solution: `#!/bin/bash
false &
pid=\$!
wait \$pid
echo "Exit code: \$?"`,
      hints: ['wait $pid waits for that specific process.', '$? after wait gives the exit code of the waited process.', 'wait $pid'],
      concepts: ['wait', 'specific-pid', 'exit-code'],
    },
    {
      id: 'bash-jobs-6',
      title: 'Write a Parallel Runner',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function run_parallel that takes a list of commands as arguments, runs them all in background, and waits for all to finish.',
      skeleton: `#!/bin/bash
# Write run_parallel function`,
      solution: `#!/bin/bash
run_parallel() {
  local pids=()
  for cmd in "\$@"; do
    bash -c "\$cmd" &
    pids+=(\$!)
  done
  local failed=0
  for pid in "\${pids[@]}"; do
    wait "\$pid" || failed=\$((failed + 1))
  done
  return \$failed
}
run_parallel "sleep 1" "sleep 2" "sleep 1"
echo "Done, failures: \$?"`,
      hints: ['Use bash -c "$cmd" & to run each command in background.', 'Collect PIDs in an array with pids+=($!).', 'Loop through PIDs with wait to collect exit codes.'],
      concepts: ['parallel', 'wait', 'arrays', 'background'],
    },
    {
      id: 'bash-jobs-7',
      title: 'Write a Job Limiter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function throttled_run that processes a list of items with at most $1 parallel jobs.',
      skeleton: `#!/bin/bash
# throttled_run max_jobs item1 item2 ...`,
      solution: `#!/bin/bash
throttled_run() {
  local max="\$1"
  shift
  local running=0
  local pids=()
  for item in "\$@"; do
    while [ \$running -ge \$max ]; do
      wait -n 2>/dev/null || true
      running=\$((running - 1))
    done
    echo "Processing: \$item" &
    pids+=(\$!)
    running=\$((running + 1))
  done
  wait
}
throttled_run 2 a b c d e`,
      hints: ['Track running count and wait when at max.', 'wait -n waits for any single job to finish (bash 4.3+).', 'Decrement running when a job finishes.'],
      concepts: ['job-limiting', 'parallel', 'throttle'],
    },
    {
      id: 'bash-jobs-8',
      title: 'Write a nohup Launcher',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function launch that starts a command with nohup, logs to /tmp/CMDNAME.log, and prints the PID.',
      skeleton: `#!/bin/bash
# Write launch function`,
      solution: `#!/bin/bash
launch() {
  local cmd="\$1"
  shift
  local logfile="/tmp/\${cmd##*/}.log"
  nohup "\$cmd" "\$@" > "\$logfile" 2>&1 &
  local pid=\$!
  echo "Launched \$cmd as PID \$pid, log: \$logfile"
}
launch sleep 60`,
      hints: ['${cmd##*/} strips the directory part to get the basename.', 'nohup cmd > logfile 2>&1 & is the pattern.', 'Capture $! right after the & for the PID.'],
      concepts: ['nohup', 'background', 'logging', 'functions'],
    },
    {
      id: 'bash-jobs-9',
      title: 'Predict jobs Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Predict how many jobs are listed after starting two background processes.',
      skeleton: `#!/bin/bash
sleep 100 &
sleep 200 &
jobs | wc -l`,
      solution: `2`,
      hints: ['Each & starts a separate background job.', 'jobs lists each job on its own line.', '2 jobs = 2 lines.'],
      concepts: ['jobs', 'background'],
    },
    {
      id: 'bash-jobs-10',
      title: 'Predict wait Exit Code',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict the exit code after waiting for a failing background job.',
      skeleton: `#!/bin/bash
(exit 42) &
wait \$!
echo "\$?"`,
      solution: `42`,
      hints: ['(exit 42) creates a subshell that exits with 42.', 'wait $! captures that exit code.', '$? is 42.'],
      concepts: ['wait', 'exit-code', 'subshell'],
    },
    {
      id: 'bash-jobs-11',
      title: 'Predict disown Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict how many jobs are listed after disowning one.',
      skeleton: `#!/bin/bash
sleep 100 &
sleep 200 &
disown %1
jobs | wc -l`,
      solution: `1`,
      hints: ['disown %1 removes job 1 from the job table.', 'Only job 2 (sleep 200) remains.', '1 job remaining.'],
      concepts: ['disown', 'jobs'],
    },
    {
      id: 'bash-jobs-12',
      title: 'Fix Missing & for Background',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Fix the script that blocks waiting for sleep instead of running it in background.',
      skeleton: `#!/bin/bash
# BUG: this blocks the script for 60 seconds
sleep 60
echo "Background started"
do_other_work`,
      solution: `#!/bin/bash
sleep 60 &
echo "Background started"
do_other_work`,
      hints: ['Add & after the command to run it in background.', 'Without &, the shell waits for sleep to finish.', 'sleep 60 &'],
      concepts: ['background', 'job-control'],
    },
    {
      id: 'bash-jobs-13',
      title: 'Fix Missing nohup',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Fix the long-running task that dies when the SSH session closes.',
      skeleton: `#!/bin/bash
# BUG: dies when terminal closes
./data_processing.sh > processing.log 2>&1 &`,
      solution: `#!/bin/bash
nohup ./data_processing.sh > processing.log 2>&1 &`,
      hints: ['Without nohup, SIGHUP kills the process when terminal closes.', 'nohup makes the process immune to SIGHUP.', 'nohup ./script.sh &'],
      concepts: ['nohup', 'SIGHUP', 'terminal-close'],
    },
    {
      id: 'bash-jobs-14',
      title: 'Refactor Sequential to Parallel',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Refactor these sequential downloads to run in parallel, then wait for all.',
      skeleton: `#!/bin/bash
curl -s -o /tmp/a.txt https://example.com/a
curl -s -o /tmp/b.txt https://example.com/b
curl -s -o /tmp/c.txt https://example.com/c
echo "All downloaded"`,
      solution: `#!/bin/bash
curl -s -o /tmp/a.txt https://example.com/a &
curl -s -o /tmp/b.txt https://example.com/b &
curl -s -o /tmp/c.txt https://example.com/c &
wait
echo "All downloaded"`,
      hints: ['Add & after each curl to run in parallel.', 'Use wait to block until all finish.', 'Three & then wait.'],
      concepts: ['parallel', 'wait', 'refactoring'],
    },
    {
      id: 'bash-jobs-15',
      title: 'Write a Timeout Runner',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function run_timeout that runs a command with a timeout and kills it if it exceeds the limit.',
      skeleton: `#!/bin/bash
# Write run_timeout seconds command [args...]`,
      solution: `#!/bin/bash
run_timeout() {
  local timeout="\$1"
  shift
  "\$@" &
  local pid=\$!
  (
    sleep "\$timeout"
    kill "\$pid" 2>/dev/null
  ) &
  local watchdog=\$!
  wait "\$pid"
  local rc=\$?
  kill "\$watchdog" 2>/dev/null
  wait "\$watchdog" 2>/dev/null
  return \$rc
}
run_timeout 2 sleep 10 && echo "done" || echo "timed out"`,
      hints: ['Run command in background, then run a timeout killer in background.', 'wait for the command; kill the watchdog when done.', 'If the command finishes first, kill the watchdog.'],
      concepts: ['timeout', 'watchdog', 'background', 'job-control'],
    },
    {
      id: 'bash-jobs-16',
      title: 'Predict Parallel Timing',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict whether parallel or sequential runs faster.',
      skeleton: `#!/bin/bash
# Sequential
time { sleep 1; sleep 1; sleep 1; }
# Parallel
time { sleep 1 & sleep 1 & sleep 1 & wait; }`,
      solution: `Sequential: ~3 seconds\nParallel: ~1 second`,
      hints: ['Sequential sleeps add up: 3 seconds total.', 'Parallel sleeps run concurrently: ~1 second total.', 'Parallel is ~3x faster here.'],
      concepts: ['parallel', 'timing', 'background'],
    },
    {
      id: 'bash-jobs-17',
      title: 'Write an Async Queue',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function process_queue that reads lines from stdin and processes each in background, limiting to 3 concurrent jobs.',
      skeleton: `#!/bin/bash
# Write process_queue function`,
      solution: `#!/bin/bash
process_queue() {
  local max=3
  local running=0
  while IFS= read -r item; do
    while [ \$running -ge \$max ]; do
      wait -n 2>/dev/null
      running=\$((running - 1))
    done
    (echo "Processing: \$item"; sleep 0.5) &
    running=\$((running + 1))
  done
  wait
}
printf "item%d\\n" {1..10} | process_queue`,
      hints: ['Use wait -n to wait for any single background job (bash 4.3+).', 'Decrement running count when a job finishes.', 'Final wait ensures all jobs complete.'],
      concepts: ['job-limiting', 'parallel', 'while-read'],
    },
    {
      id: 'bash-jobs-18',
      title: 'Refactor to disown',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Refactor the script to use disown so the background job survives shell exit without nohup.',
      skeleton: `#!/bin/bash
nohup ./server.sh > server.log 2>&1 &
echo "Server started"`,
      solution: `#!/bin/bash
./server.sh > server.log 2>&1 &
disown \$!
echo "Server started"`,
      hints: ['disown $! removes the last background job from the job table.', 'The process survives shell exit after disown.', 'disown is an alternative to nohup.'],
      concepts: ['disown', 'background', 'nohup-alternative'],
    },
    {
      id: 'bash-jobs-19',
      title: 'Write a Background Collector',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function collect_results that runs multiple functions in background and collects their outputs.',
      skeleton: `#!/bin/bash
# Write collect_results function that takes function names`,
      solution: `#!/bin/bash
get_uptime() { uptime | awk '{print \$1}'; }
get_load() { awk '{print \$1}' /proc/loadavg; }
get_mem() { free -m | awk '/Mem:/{print \$3"MB"}'; }

collect_results() {
  local tmpdir=\$(mktemp -d)
  local pids=()
  for fn in "\$@"; do
    \$fn > "\$tmpdir/\$fn" &
    pids+=(\$!)
  done
  for pid in "\${pids[@]}"; do
    wait "\$pid"
  done
  for fn in "\$@"; do
    echo "\$fn: \$(cat "\$tmpdir/\$fn")"
  done
  rm -rf "\$tmpdir"
}
collect_results get_uptime get_load get_mem`,
      hints: ['Write each background result to a temp file.', 'Wait for all PIDs, then read the temp files.', 'Use mktemp -d for a temp directory.'],
      concepts: ['background', 'parallel', 'output-collection'],
    },
    {
      id: 'bash-jobs-20',
      title: 'Refactor Sequential Pings to Parallel',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Refactor sequential host availability checks to run in parallel.',
      skeleton: `#!/bin/bash
hosts=(192.168.1.1 192.168.1.2 192.168.1.3)
for host in "\${hosts[@]}"; do
  if ping -c1 -W1 "\$host" &>/dev/null; then
    echo "\$host: up"
  else
    echo "\$host: down"
  fi
done`,
      solution: `#!/bin/bash
hosts=(192.168.1.1 192.168.1.2 192.168.1.3)
check_host() {
  if ping -c1 -W1 "\$1" &>/dev/null; then
    echo "\$1: up"
  else
    echo "\$1: down"
  fi
}
for host in "\${hosts[@]}"; do
  check_host "\$host" &
done
wait`,
      hints: ['Run check_host in background with &.', 'wait at the end collects all results.', 'Define check_host as a function for clarity.'],
      concepts: ['parallel', 'background', 'wait', 'refactoring'],
    },
  ],
};
