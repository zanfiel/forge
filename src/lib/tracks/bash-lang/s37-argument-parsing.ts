import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'bash-args',
  title: '37. Argument Parsing',
  explanation: `## Argument Parsing\n\nBash provides several ways to handle script arguments from positional parameters to full option parsing.\n\n### Positional Parameters\n\n\`\`\`bash\n\$0    # script name\n\$1    # first argument\n\$2    # second argument\n\$@    # all arguments as separate words\n\$*    # all arguments as one word\n\$#    # argument count\n\`\`\`\n\n### shift\n\n\`\`\`bash\nwhile [ \$# -gt 0 ]; do\n    echo "Arg: \$1"\n    shift        # shift all args left by 1\ndone\n\`\`\`\n\n### getopts (built-in)\n\n\`\`\`bash\nwhile getopts "hv:o:" opt; do\n    case \$opt in\n        h) show_help; exit 0 ;;\n        v) verbose="\$OPTARG" ;;\n        o) output="\$OPTARG" ;;\n        ?) echo "Unknown option"; exit 1 ;;\n    esac\ndone\nshift \$((OPTIND - 1))   # remove processed options\n\`\`\`\n\n### getopt (external, GNU)\n\n\`\`\`bash\nOPTS=\$(getopt -o hv:o: --long help,verbose:,output: -n "\$0" -- "\$@")\neval set -- "\$OPTS"\nwhile true; do\n    case "\$1" in\n        -h|--help) show_help; shift ;;\n        -v|--verbose) verbose="\$2"; shift 2 ;;\n        --) shift; break ;;\n    esac\ndone\n\`\`\`\n\n### Usage Functions\n\n\`\`\`bash\nusage() {\n    echo "Usage: \$0 [-h] [-v level] [-o file] <input>"\n    echo "  -h  Show help"\n    echo "  -v  Verbosity (1-3)"\n    echo "  -o  Output file"\n    exit 1\n}\n\`\`\``,
  exercises: [
    {
      id: 'bash-args-1',
      title: 'Access Positional Parameters',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Print the first and second arguments and the total count.',
      skeleton: `#!/bin/bash
echo "First: ___"
echo "Second: ___"
echo "Count: ___"`,
      solution: `#!/bin/bash
echo "First: \$1"
echo "Second: \$2"
echo "Count: \$#"`,
      hints: ['$1 is the first argument.', '$2 is the second.', '$# is the argument count.'],
      concepts: ['positional-parameters', '$1', '$#'],
    },
    {
      id: 'bash-args-2',
      title: 'Iterate Arguments with $@',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Loop over all arguments and print each.',
      skeleton: `#!/bin/bash
for arg in "___"; do
    echo "Arg: \$arg"
done`,
      solution: `#!/bin/bash
for arg in "\$@"; do
    echo "Arg: \$arg"
done`,
      hints: ['"$@" expands each argument as a separate word.', 'Quoting "$@" preserves arguments with spaces.', '"$@"'],
      concepts: ['$@', 'argument-iteration'],
    },
    {
      id: 'bash-args-3',
      title: 'Use shift to Consume Arguments',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Use shift to process arguments one at a time in a while loop.',
      skeleton: `#!/bin/bash
while [ \$# -gt 0 ]; do
    echo "Processing: \$1"
    ___
done`,
      solution: `#!/bin/bash
while [ \$# -gt 0 ]; do
    echo "Processing: \$1"
    shift
done`,
      hints: ['shift removes $1 and shifts all remaining args left.', 'After shift, old $2 becomes new $1.', 'shift'],
      concepts: ['shift', 'argument-processing'],
    },
    {
      id: 'bash-args-4',
      title: 'getopts Basic Options',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Parse -h (flag) and -n name (with argument) using getopts.',
      skeleton: `#!/bin/bash
while getopts "hn:" opt; do
    case \$opt in
        h) echo "Help"; exit 0 ;;
        n) name="___ " ;;
        ?) echo "Unknown"; exit 1 ;;
    esac
done
echo "Name: \$name"`,
      solution: `#!/bin/bash
while getopts "hn:" opt; do
    case \$opt in
        h) echo "Help"; exit 0 ;;
        n) name="\$OPTARG" ;;
        ?) echo "Unknown"; exit 1 ;;
    esac
done
echo "Name: \$name"`,
      hints: ['OPTARG holds the argument for options that take one.', 'A colon after the option letter means it takes an argument.', '$OPTARG'],
      concepts: ['getopts', 'OPTARG'],
    },
    {
      id: 'bash-args-5',
      title: 'shift After getopts',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'After getopts, shift processed options to access remaining positional args.',
      skeleton: `#!/bin/bash
while getopts "v" opt; do
    case \$opt in v) verbose=1 ;; esac
done
___ \$((OPTIND - 1))
echo "Remaining: \$@"`,
      solution: `#!/bin/bash
while getopts "v" opt; do
    case \$opt in v) verbose=1 ;; esac
done
shift \$((OPTIND - 1))
echo "Remaining: \$@"`,
      hints: ['OPTIND is the index of the next argument to process.', 'shift $((OPTIND - 1)) removes all processed options.', 'shift $((OPTIND - 1))'],
      concepts: ['getopts', 'OPTIND', 'shift'],
    },
    {
      id: 'bash-args-6',
      title: 'Write a Usage Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Write a usage function and call it when -h is passed or no arguments are given.',
      skeleton: `#!/bin/bash
# Write usage function and argument check`,
      solution: `#!/bin/bash
usage() {
    echo "Usage: \$0 [-h] [-v] <filename>"
    echo "  -h  Show this help"
    echo "  -v  Verbose mode"
    exit 0
}
[ \$# -eq 0 ] && usage
while getopts "hv" opt; do
    case \$opt in
        h) usage ;;
        v) verbose=1 ;;
    esac
done`,
      hints: ['Check $# -eq 0 for missing arguments.', 'usage() prints help and exits.', 'Call usage in the -h case and when $# is 0.'],
      concepts: ['usage-function', 'getopts', 'help'],
    },
    {
      id: 'bash-args-7',
      title: 'Write a Full Argument Parser',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a script with getopts that handles -v (verbose), -o output_file, and -c count with defaults and validation.',
      skeleton: `#!/bin/bash
# Write full argument parser`,
      solution: `#!/bin/bash
verbose=0
output="/tmp/default.out"
count=1

usage() {
    echo "Usage: \$0 [-v] [-o file] [-c count] <input>"
    exit 1
}

while getopts "vo:c:" opt; do
    case \$opt in
        v) verbose=1 ;;
        o) output="\$OPTARG" ;;
        c) count="\$OPTARG" ;;
        ?) usage ;;
    esac
done
shift \$((OPTIND - 1))
[ \$# -lt 1 ] && usage

echo "Input: \$1, Output: \$output, Count: \$count, Verbose: \$verbose"`,
      hints: ['Set defaults before the getopts loop.', 'Each option with : takes an argument via $OPTARG.', 'shift $((OPTIND - 1)) exposes remaining positional args.'],
      concepts: ['getopts', 'defaults', 'validation'],
    },
    {
      id: 'bash-args-8',
      title: 'Write a Long Option Parser',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a script using a while/case loop to handle --help, --output=FILE, and --verbose long options.',
      skeleton: `#!/bin/bash
# Write long option parser`,
      solution: `#!/bin/bash
verbose=0
output=""

while [ \$# -gt 0 ]; do
    case "\$1" in
        --help) echo "Usage: \$0 [--verbose] [--output=FILE]"; exit 0 ;;
        --verbose) verbose=1; shift ;;
        --output=*) output="\${1#--output=}"; shift ;;
        --output) output="\$2"; shift 2 ;;
        --) shift; break ;;
        -*) echo "Unknown: \$1"; exit 1 ;;
        *) break ;;
    esac
done
echo "verbose=\$verbose output=\$output remaining: \$@"`,
      hints: ['Use case "$1" in to match each option.', '--output=* handles --output=value syntax.', '--output) shift 2 handles --output value syntax.'],
      concepts: ['long-options', 'case', 'shift'],
    },
    {
      id: 'bash-args-9',
      title: 'Predict $@ vs $* Difference',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict the difference between "$@" and "$*" with an argument containing a space.',
      skeleton: `#!/bin/bash
show_args() {
    echo "Count: \$#"
}
show_args "\$@"   # called with: "hello world" foo`,
      solution: `Count: 2`,
      hints: ['"$@" preserves each argument as separate words.', '"hello world" is one arg, foo is another.', 'Count: 2'],
      concepts: ['$@', 'argument-splitting', 'quoting'],
    },
    {
      id: 'bash-args-10',
      title: 'Predict getopts OPTARG',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict what $name contains after parsing -n Alice.',
      skeleton: `#!/bin/bash
while getopts "n:" opt; do
    case \$opt in n) name="\$OPTARG" ;; esac
done
echo "\$name"
# Script called as: script.sh -n Alice`,
      solution: `Alice`,
      hints: ['OPTARG holds the value of the argument passed with -n.', '-n Alice sets OPTARG to "Alice".', 'Alice'],
      concepts: ['getopts', 'OPTARG'],
    },
    {
      id: 'bash-args-11',
      title: 'Predict shift Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict the output after shifting arguments.',
      skeleton: `#!/bin/bash
set -- a b c d e
echo "\$1"
shift 2
echo "\$1"
echo "\$#"`,
      solution: `a\nc\n3`,
      hints: ['shift 2 removes the first 2 arguments.', 'After shift 2, $1 is c.', '$# is 3 (c d e remaining).'],
      concepts: ['shift', 'positional-parameters'],
    },
    {
      id: 'bash-args-12',
      title: 'Fix Missing Argument Check',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Fix the script that crashes with an error when called without arguments.',
      skeleton: `#!/bin/bash
# BUG: no argument count check
file="\$1"
wc -l "\$file"`,
      solution: `#!/bin/bash
if [ \$# -lt 1 ]; then
    echo "Usage: \$0 <file>" >&2
    exit 1
fi
file="\$1"
wc -l "\$file"`,
      hints: ['Check $# -lt 1 before using $1.', 'Print usage to stderr with >&2.', 'Exit with non-zero on error.'],
      concepts: ['argument-validation', '$#', 'usage'],
    },
    {
      id: 'bash-args-13',
      title: 'Fix getopts Option String',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Fix the getopts option string so -o takes a required argument.',
      skeleton: `#!/bin/bash
# BUG: -o should require an argument
while getopts "ho" opt; do
    case \$opt in
        h) echo "Help"; exit 0 ;;
        o) output="\$OPTARG" ;;
    esac
done`,
      solution: `#!/bin/bash
while getopts "ho:" opt; do
    case \$opt in
        h) echo "Help"; exit 0 ;;
        o) output="\$OPTARG" ;;
    esac
done`,
      hints: ['A colon after the letter means it takes an argument.', '"ho:" declares h as flag and o as requiring an argument.', 'Add : after o in the option string.'],
      concepts: ['getopts', 'option-string', 'OPTARG'],
    },
    {
      id: 'bash-args-14',
      title: 'Refactor Positional to getopts',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Refactor positional parameter parsing to use getopts.',
      skeleton: `#!/bin/bash
verbose="\$1"
output="\$2"
input="\$3"
echo "Processing \$input -> \$output (verbose=\$verbose)"`,
      solution: `#!/bin/bash
verbose=0
output="out.txt"
while getopts "vo:" opt; do
    case \$opt in
        v) verbose=1 ;;
        o) output="\$OPTARG" ;;
    esac
done
shift \$((OPTIND - 1))
input="\$1"
echo "Processing \$input -> \$output (verbose=\$verbose)"`,
      hints: ['Use getopts for -v and -o flags.', 'shift $((OPTIND - 1)) exposes positional args after options.', '$1 after shift is the input file.'],
      concepts: ['getopts', 'refactoring', 'shift'],
    },
    {
      id: 'bash-args-15',
      title: 'Write a Subcommand Dispatcher',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a script that dispatches subcommands: start, stop, status, each with their own logic.',
      skeleton: `#!/bin/bash
# Write subcommand dispatcher`,
      solution: `#!/bin/bash
cmd_start() { echo "Starting service..."; }
cmd_stop() { echo "Stopping service..."; }
cmd_status() { echo "Service status: running"; }

usage() {
    echo "Usage: \$0 <start|stop|status>"
    exit 1
}

[ \$# -lt 1 ] && usage
subcmd="\$1"
shift

case "\$subcmd" in
    start)  cmd_start "\$@" ;;
    stop)   cmd_stop "\$@" ;;
    status) cmd_status "\$@" ;;
    *)      echo "Unknown: \$subcmd"; usage ;;
esac`,
      hints: ['Extract $1 as the subcommand, then shift.', 'Dispatch to cmd_$subcmd functions or use case.', 'Pass remaining "$@" to the subcommand.'],
      concepts: ['subcommands', 'dispatch', 'case'],
    },
    {
      id: 'bash-args-16',
      title: 'Predict $@ Quoting',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict how many arguments are passed when using "$@" vs $*.',
      skeleton: `#!/bin/bash
count_args() { echo \$#; }
set -- "hello world" foo bar
count_args "\$@"
count_args \$*`,
      solution: `3\n4`,
      hints: ['"$@" passes 3 args: "hello world", foo, bar.', '$* (unquoted) splits "hello world" into two.', '3 then 4.'],
      concepts: ['$@', '$*', 'quoting', 'word-splitting'],
    },
    {
      id: 'bash-args-17',
      title: 'Write a Validate-and-Run Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a script that validates required args before running, showing specific error messages.',
      skeleton: `#!/bin/bash
# Requires: --host HOST --port PORT [--user USER]`,
      solution: `#!/bin/bash
host=""
port=""
user="admin"

while [ \$# -gt 0 ]; do
    case "\$1" in
        --host) host="\$2"; shift 2 ;;
        --port) port="\$2"; shift 2 ;;
        --user) user="\$2"; shift 2 ;;
        *) echo "Unknown: \$1"; exit 1 ;;
    esac
done

[ -z "\$host" ] && { echo "Error: --host required" >&2; exit 1; }
[ -z "\$port" ] && { echo "Error: --port required" >&2; exit 1; }

echo "Connecting to \$user@\$host:\$port"`,
      hints: ['Parse with a while/case loop.', 'Validate after parsing: check -z for each required var.', 'Print specific error messages to stderr.'],
      concepts: ['validation', 'long-options', 'required-args'],
    },
    {
      id: 'bash-args-18',
      title: 'Fix Off-by-One in shift After getopts',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Fix the shift amount after getopts that skips the first positional argument.',
      skeleton: `#!/bin/bash
while getopts "v" opt; do
    case \$opt in v) verbose=1 ;; esac
done
shift \$OPTIND   # BUG: off by one
echo "First positional: \$1"`,
      solution: `#!/bin/bash
while getopts "v" opt; do
    case \$opt in v) verbose=1 ;; esac
done
shift \$((OPTIND - 1))
echo "First positional: \$1"`,
      hints: ['OPTIND points to the NEXT unprocessed argument.', 'We need to shift OPTIND - 1 (not OPTIND) arguments.', 'shift $((OPTIND - 1))'],
      concepts: ['OPTIND', 'shift', 'off-by-one'],
    },
    {
      id: 'bash-args-19',
      title: 'Write a Flags-Only Parser',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a script that parses --dry-run, --force, --quiet boolean flags.',
      skeleton: `#!/bin/bash
# Parse --dry-run --force --quiet flags`,
      solution: `#!/bin/bash
dry_run=0
force=0
quiet=0

while [ \$# -gt 0 ]; do
    case "\$1" in
        --dry-run) dry_run=1; shift ;;
        --force)   force=1;   shift ;;
        --quiet)   quiet=0;   shift ;;
        --) shift; break ;;
        -*) echo "Unknown flag: \$1"; exit 1 ;;
        *)  break ;;
    esac
done

echo "dry_run=\$dry_run force=\$force quiet=\$quiet"
echo "Remaining: \$@"`,
      hints: ['Each flag just sets a variable to 1.', 'shift moves past each flag after processing.', '-- signals end of options.'],
      concepts: ['flag-parsing', 'long-options', 'boolean-flags'],
    },
    {
      id: 'bash-args-20',
      title: 'Refactor to getopts with Validation',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Refactor the manual argument parsing to use getopts with proper validation and a usage function.',
      skeleton: `#!/bin/bash
if [ "\$1" = "-h" ]; then
    echo "Help"; exit 0
fi
output="\$1"
count="\$2"
[ -z "\$output" ] && exit 1
[ -z "\$count" ] && exit 1`,
      solution: `#!/bin/bash
usage() {
    echo "Usage: \$0 [-h] -o output -c count"
    exit 1
}
output=""
count=""
while getopts "ho:c:" opt; do
    case \$opt in
        h) usage ;;
        o) output="\$OPTARG" ;;
        c) count="\$OPTARG" ;;
        ?) usage ;;
    esac
done
shift \$((OPTIND - 1))
[ -z "\$output" ] && { echo "Error: -o required" >&2; usage; }
[ -z "\$count" ] && { echo "Error: -c required" >&2; usage; }
echo "Output: \$output, Count: \$count"`,
      hints: ['Replace manual -h check with getopts.', 'Use -o and -c as named options instead of positional.', 'Validate after parsing and call usage on error.'],
      concepts: ['getopts', 'validation', 'usage-function', 'refactoring'],
    },
  ],
};
