import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'bash-interact',
  title: '38. Interactive Scripts',
  explanation: `## Interactive Scripts\n\nBash provides tools for reading user input, showing menus, and creating interactive prompts.\n\n### read\n\n\`\`\`bash\nread name                    # read into $name\nread -p "Enter: " name      # with prompt\nread -s password            # silent (no echo)\nread -t 10 answer           # timeout 10 seconds\nread -n 1 key               # read exactly 1 char\nread -a array               # read into array\n\`\`\`\n\n### select Menu\n\n\`\`\`bash\nPS3="Choose: "              # select prompt\nselect option in "Start" "Stop" "Quit"; do\n    case \$option in\n        "Start") start_service ;;\n        "Quit") break ;;\n    esac\ndone\n\`\`\`\n\n### Confirmation Dialogs\n\n\`\`\`bash\nconfirm() {\n    read -p "\$1 [y/N] " -n 1 -r\n    echo\n    [[ \$REPLY =~ ^[Yy]$ ]]\n}\nif confirm "Delete all files?"; then\n    rm -rf ...\nfi\n\`\`\`\n\n### readline Features\n\n\`\`\`bash\nread -e -i "default" answer  # readline editing, with initial value\nread -e name                 # readline (tab completion, history)\n\`\`\`\n\n### Progress Feedback\n\n\`\`\`bash\necho -n "Processing..."     # no newline\nfor i in {1..5}; do\n    sleep 0.2\n    echo -n "."\ndone\necho " done!"\n\`\`\``,
  exercises: [
    {
      id: 'bash-interact-1',
      title: 'Basic read with Prompt',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Read a name from the user with a prompt and greet them.',
      skeleton: `#!/bin/bash
___ -p "Enter your name: " name
echo "Hello, \$name!"`,
      solution: `#!/bin/bash
read -p "Enter your name: " name
echo "Hello, \$name!"`,
      hints: ['read -p "prompt" variable reads with a prompt.', 'The value is stored in the named variable.', 'read -p'],
      concepts: ['read', 'prompt'],
    },
    {
      id: 'bash-interact-2',
      title: 'Silent Password Read',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Read a password without echoing characters to the terminal.',
      skeleton: `#!/bin/bash
___ -s -p "Password: " password
echo
echo "Length: \${#password}"`,
      solution: `#!/bin/bash
read -s -p "Password: " password
echo
echo "Length: \${#password}"`,
      hints: ['-s suppresses echo for the read.', 'echo after the read adds a newline since -s suppresses it.', 'read -s'],
      concepts: ['read', '-s', 'password'],
    },
    {
      id: 'bash-interact-3',
      title: 'Read with Timeout',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Read input with a 5-second timeout, using a default if no input is provided.',
      skeleton: `#!/bin/bash
if ___ -t 5 -p "Answer (5s): " answer; then
    echo "You said: \$answer"
else
    echo "Timeout! Using default."
fi`,
      solution: `#!/bin/bash
if read -t 5 -p "Answer (5s): " answer; then
    echo "You said: \$answer"
else
    echo "Timeout! Using default."
fi`,
      hints: ['-t seconds sets a timeout.', 'read returns non-zero on timeout.', 'read -t 5'],
      concepts: ['read', '-t', 'timeout'],
    },
    {
      id: 'bash-interact-4',
      title: 'select Menu',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Create a numbered menu using select.',
      skeleton: `#!/bin/bash
PS3="Choose an option: "
___ item in "Start" "Stop" "Status" "Quit"; do
    case "\$item" in
        "Quit") break ;;
        *) echo "You chose: \$item" ;;
    esac
done`,
      solution: `#!/bin/bash
PS3="Choose an option: "
select item in "Start" "Stop" "Status" "Quit"; do
    case "\$item" in
        "Quit") break ;;
        *) echo "You chose: \$item" ;;
    esac
done`,
      hints: ['select creates a numbered menu from the list.', 'PS3 is the select prompt.', 'select'],
      concepts: ['select', 'PS3', 'menu'],
    },
    {
      id: 'bash-interact-5',
      title: 'Single Character Read',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Read exactly one character without requiring Enter.',
      skeleton: `#!/bin/bash
read -p "Press any key: " ___ 1 key
echo "You pressed: \$key"`,
      solution: `#!/bin/bash
read -p "Press any key: " -n 1 key
echo "You pressed: \$key"`,
      hints: ['-n 1 reads exactly 1 character.', 'No Enter needed after the character.', '-n 1'],
      concepts: ['read', '-n', 'single-char'],
    },
    {
      id: 'bash-interact-6',
      title: 'Write a Confirmation Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function confirm that asks a yes/no question and returns 0 for yes, 1 for no.',
      skeleton: `#!/bin/bash
# Write confirm function`,
      solution: `#!/bin/bash
confirm() {
    local prompt="\${1:-Are you sure?}"
    read -p "\$prompt [y/N] " -n 1 -r
    echo
    [[ "\$REPLY" =~ ^[Yy]$ ]]
}
if confirm "Delete the file?"; then
    echo "Deleting..."
else
    echo "Cancelled"
fi`,
      hints: ['read -n 1 -r reads one char without modifying backslashes.', '$REPLY is the variable used when no name is given to read.', '[[ $REPLY =~ ^[Yy]$ ]] matches y or Y.'],
      concepts: ['confirm-dialog', 'REPLY', 'regex-match'],
    },
    {
      id: 'bash-interact-7',
      title: 'Write a Simple Menu',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function show_menu that displays numbered options and returns the choice.',
      skeleton: `#!/bin/bash
# Write show_menu function`,
      solution: `#!/bin/bash
show_menu() {
    echo "=== Menu ==="
    echo "1) Start service"
    echo "2) Stop service"
    echo "3) Check status"
    echo "0) Exit"
    read -p "Choose [0-3]: " -n 1 choice
    echo
    echo "\$choice"
}
choice=\$(show_menu)
echo "Selected: \$choice"`,
      hints: ['Print numbered options with echo.', 'read -n 1 for single character selection.', 'Return the choice by echoing it (or via $choice).'],
      concepts: ['menu', 'read', 'user-input'],
    },
    {
      id: 'bash-interact-8',
      title: 'Write an Interactive Installer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a script that interactively asks for hostname, port, and password, with defaults and confirmation.',
      skeleton: `#!/bin/bash
# Write interactive installer`,
      solution: `#!/bin/bash
echo "=== Setup Wizard ==="
read -e -i "localhost" -p "Hostname: " host
read -e -i "8080" -p "Port: " port
read -s -p "Password: " password
echo
read -p "Proceed with \$host:\$port? [y/N] " -n 1 -r
echo
if [[ "\$REPLY" =~ ^[Yy]$ ]]; then
    echo "Installing with host=\$host port=\$port"
else
    echo "Cancelled"
fi`,
      hints: ['read -e -i "default" provides readline editing with a default value.', 'read -s hides password input.', 'Confirm before proceeding with a final y/N question.'],
      concepts: ['read', '-e', '-i', 'interactive-wizard'],
    },
    {
      id: 'bash-interact-9',
      title: 'Predict read -a Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict what read -a stores when given space-separated input.',
      skeleton: `#!/bin/bash
echo "apple banana cherry" | while read -ra parts; do
    echo "\${#parts[@]}"
    echo "\${parts[1]}"
done`,
      solution: `3\nbanana`,
      hints: ['read -a reads into an array.', '${#parts[@]} is the count: 3.', '${parts[1]} is banana.'],
      concepts: ['read', '-a', 'array'],
    },
    {
      id: 'bash-interact-10',
      title: 'Predict select REPLY',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict what $REPLY and $item contain when the user enters "2".',
      skeleton: `#!/bin/bash
# User inputs: 2
PS3="> "
select item in alpha beta gamma; do
    echo "REPLY=\$REPLY item=\$item"
    break
done`,
      solution: `REPLY=2 item=beta`,
      hints: ['$REPLY holds the raw input (2).', '$item holds the selected option (beta).', 'REPLY=2 item=beta'],
      concepts: ['select', 'REPLY', 'menu'],
    },
    {
      id: 'bash-interact-11',
      title: 'Fix read Without -r',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Fix the read command that incorrectly processes backslashes in user input.',
      skeleton: `#!/bin/bash
# BUG: backslashes in input are interpreted
read -p "Enter path: " path
echo "\$path"`,
      solution: `#!/bin/bash
read -r -p "Enter path: " path
echo "\$path"`,
      hints: ['-r prevents backslash interpretation.', 'Without -r, \\n in input becomes a newline.', 'Always use -r unless you specifically need backslash processing.'],
      concepts: ['read', '-r', 'backslash'],
    },
    {
      id: 'bash-interact-12',
      title: 'Fix select Without Break',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Fix the select menu that never exits.',
      skeleton: `#!/bin/bash
PS3="Choose: "
select opt in "do work" "quit"; do
    case "\$opt" in
        "do work") echo "Working!" ;;
        "quit") echo "Bye" ;;   # BUG: never exits
    esac
done`,
      solution: `#!/bin/bash
PS3="Choose: "
select opt in "do work" "quit"; do
    case "\$opt" in
        "do work") echo "Working!" ;;
        "quit") echo "Bye"; break ;;
    esac
done`,
      hints: ['select loops forever unless you break out.', 'Add break after handling the quit option.', 'break exits the select loop.'],
      concepts: ['select', 'break', 'loop-exit'],
    },
    {
      id: 'bash-interact-13',
      title: 'Write a Progress Bar',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function progress that shows a visual progress bar for a given percentage.',
      skeleton: `#!/bin/bash
# Write progress function`,
      solution: `#!/bin/bash
progress() {
    local pct="\$1"
    local width=40
    local filled=\$(( width * pct / 100 ))
    local empty=\$(( width - filled ))
    printf "\\r["
    printf "%\${filled}s" "" | tr ' ' '#'
    printf "%\${empty}s" "" | tr ' ' '.'
    printf "] %3d%%" "\$pct"
}
for i in 0 25 50 75 100; do
    progress \$i
    sleep 0.3
done
echo`,
      hints: ['Use printf with \\r to overwrite the line.', 'Calculate filled and empty portions from percentage.', 'tr converts spaces to # or .'],
      concepts: ['progress-bar', 'printf', 'terminal-control'],
    },
    {
      id: 'bash-interact-14',
      title: 'Write a Multi-Step Wizard',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function setup_wizard that collects app name, environment, and debug mode through prompts with validation.',
      skeleton: `#!/bin/bash
# Write setup_wizard function`,
      solution: `#!/bin/bash
setup_wizard() {
    echo "=== App Setup ==="

    while true; do
        read -p "App name (a-z, no spaces): " app_name
        [[ "\$app_name" =~ ^[a-z][a-z0-9-]*$ ]] && break
        echo "Invalid name. Use lowercase letters, numbers, and hyphens."
    done

    PS3="Select environment: "
    select env in development staging production; do
        [ -n "\$env" ] && break
    done

    read -p "Enable debug mode? [y/N] " -n 1 -r debug_reply
    echo
    [[ "\$debug_reply" =~ ^[Yy]$ ]] && debug=true || debug=false

    echo "name=\$app_name env=\$env debug=\$debug"
}
setup_wizard`,
      hints: ['Validate app name with a regex loop.', 'Use select for environment choice.', 'Use confirm pattern for debug mode.'],
      concepts: ['wizard', 'validation', 'select', 'read'],
    },
    {
      id: 'bash-interact-15',
      title: 'Predict read -t Return Code',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict what happens when read times out.',
      skeleton: `#!/bin/bash
if read -t 0.1 -p "" answer < /dev/null; then
    echo "got: \$answer"
else
    echo "timed out"
fi`,
      solution: `timed out`,
      hints: ['Reading from /dev/null gives immediate EOF.', 'read returns non-zero on EOF or timeout.', 'timed out'],
      concepts: ['read', '-t', 'timeout', 'return-code'],
    },
    {
      id: 'bash-interact-16',
      title: 'Write a Retry Prompt',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function ask_until_valid that keeps asking until the user provides a non-empty answer.',
      skeleton: `#!/bin/bash
# Write ask_until_valid prompt function`,
      solution: `#!/bin/bash
ask_until_valid() {
    local prompt="\$1"
    local answer=""
    while [ -z "\$answer" ]; do
        read -r -p "\$prompt " answer
        [ -z "\$answer" ] && echo "Please enter a value."
    done
    echo "\$answer"
}
result=\$(ask_until_valid "Enter your name:")
echo "Name: \$result"`,
      hints: ['Loop while the answer is empty.', '[ -z "$answer" ] checks for empty string.', 'Use echo "$answer" to return the value.'],
      concepts: ['input-validation', 'retry', 'while-loop'],
    },
    {
      id: 'bash-interact-17',
      title: 'Fix Echo Newline After Silent Read',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Fix the script that shows the cursor on the same line as "Password:" after reading a password.',
      skeleton: `#!/bin/bash
read -s -p "Password: " pw
echo "Authenticated"`,
      solution: `#!/bin/bash
read -s -p "Password: " pw
echo
echo "Authenticated"`,
      hints: ['read -s suppresses the newline after input.', 'Add a plain echo to move to the next line.', 'echo (no args) prints just a newline.'],
      concepts: ['read', '-s', 'newline'],
    },
    {
      id: 'bash-interact-18',
      title: 'Write a Number Input Validator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function read_number that prompts for a number and repeats until a valid integer is given.',
      skeleton: `#!/bin/bash
# Write read_number prompt min max`,
      solution: `#!/bin/bash
read_number() {
    local prompt="\$1"
    local min="\${2:-0}"
    local max="\${3:-100}"
    local n
    while true; do
        read -r -p "\$prompt [\$min-\$max]: " n
        if [[ "\$n" =~ ^[0-9]+$ ]] && [ "\$n" -ge "\$min" ] && [ "\$n" -le "\$max" ]; then
            echo "\$n"
            return 0
        fi
        echo "Please enter a number between \$min and \$max."
    done
}
result=\$(read_number "Enter age" 1 120)
echo "Age: \$result"`,
      hints: ['[[ "$n" =~ ^[0-9]+$ ]] checks for integer.', 'Check range with -ge and -le.', 'Loop until valid input is given.'],
      concepts: ['read', 'validation', 'regex', 'range-check'],
    },
    {
      id: 'bash-interact-19',
      title: 'Refactor to select Menu',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Refactor the manual numbered menu to use the select built-in.',
      skeleton: `#!/bin/bash
echo "1) Install"
echo "2) Remove"
echo "3) Upgrade"
read -p "Enter choice: " choice
case "\$choice" in
    1) echo "Installing" ;;
    2) echo "Removing" ;;
    3) echo "Upgrading" ;;
    *) echo "Invalid" ;;
esac`,
      solution: `#!/bin/bash
PS3="Enter choice: "
select action in "Install" "Remove" "Upgrade"; do
    case "\$action" in
        "Install")  echo "Installing";  break ;;
        "Remove")   echo "Removing";    break ;;
        "Upgrade")  echo "Upgrading";   break ;;
        *) echo "Invalid selection" ;;
    esac
done`,
      hints: ['select creates the numbered list automatically.', 'Use the string values instead of numbers in case.', 'Add break after each action to exit the menu.'],
      concepts: ['select', 'refactoring', 'menu'],
    },
    {
      id: 'bash-interact-20',
      title: 'Write a Spinny Wait Indicator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function spin_while that shows an animated spinner while a background command runs.',
      skeleton: `#!/bin/bash
# Write spin_while function`,
      solution: `#!/bin/bash
spin_while() {
    local msg="\$1"
    shift
    "\$@" &
    local pid=\$!
    local spin='|/-\\'
    local i=0
    while kill -0 "\$pid" 2>/dev/null; do
        printf "\\r%s %s" "\$msg" "\${spin:\$i:1}"
        i=\$(( (i+1) % 4 ))
        sleep 0.1
    done
    wait "\$pid"
    printf "\\r%s done\\n" "\$msg"
    return \$?
}
spin_while "Processing..." sleep 2`,
      hints: ['Run the command in background with &.', 'Loop while kill -0 $pid succeeds.', 'Use printf \\r to overwrite the spinner character.'],
      concepts: ['spinner', 'background', 'terminal-control', 'animation'],
    },
  ],
};
