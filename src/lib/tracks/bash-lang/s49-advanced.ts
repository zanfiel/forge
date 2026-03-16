import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'bash-adv',
  title: '49. Advanced Techniques',
  explanation: `## Advanced Bash Techniques\n\nAdvanced bash features for dynamic, flexible scripting.\n\n### Nameref (bash 4.3+)\n\n\`\`\`bash\ndeclare -n ref=varname    # ref is an alias for varname\nref="new value"            # modifies varname\n\`\`\`\n\n### Indirect Expansion\n\n\`\`\`bash\nvarname="greeting"\ngreeting="Hello!"\necho \${!varname}          # Hello! (dynamic variable name)\n\`\`\`\n\n### eval (Safe Usage)\n\n\`\`\`bash\n# eval is dangerous with user input, but safe for controlled strings\nfor color in red green blue; do\n    eval "\${color}_count=0"\ndone\n# Now $red_count, $green_count, $blue_count exist\n\`\`\`\n\n### Dynamic Variable Names\n\n\`\`\`bash\n# Using indirect expansion (safer than eval)\ndeclare "\${prefix}_value"=42\nvarname="\${prefix}_value"\necho "\${!varname}"         # 42\n\`\`\`\n\n### Co-Processes\n\n\`\`\`bash\ncoproc mycat { cat; }\necho "hello" >&\${mycat[1]}    # write to coproc stdin\nread -r line <&\${mycat[0]}    # read from coproc stdout\necho "\$line"\n\`\`\`\n\n### Function References\n\n\`\`\`bash\nrun_fn() {\n    local fn="\$1"\n    shift\n    "\$fn" "\$@"\n}\nrun_fn echo "hello"     # calls echo dynamically\n\`\`\``,
  exercises: [
    {
      id: 'bash-adv-1',
      title: 'Indirect Expansion',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Use indirect expansion to read a variable whose name is stored in another variable.',
      skeleton: `#!/bin/bash
color="blue"
blue="sky"
# Access $blue via $color
echo \${___color}`,
      solution: `#!/bin/bash
color="blue"
blue="sky"
echo \${!color}`,
      hints: ['${!varname} dereferences the variable named by $varname.', 'This is indirect expansion.', '${!color}'],
      concepts: ['indirect-expansion', 'dynamic-variables'],
    },
    {
      id: 'bash-adv-2',
      title: 'Nameref Declaration',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Declare a nameref variable that acts as an alias for another variable.',
      skeleton: `#!/bin/bash
data="original"
declare ___ ref=data
ref="modified"
echo "\$data"   # modified`,
      solution: `#!/bin/bash
data="original"
declare -n ref=data
ref="modified"
echo "\$data"`,
      hints: ['-n declares a nameref (name reference).', 'ref becomes an alias for data.', 'declare -n'],
      concepts: ['nameref', 'declare', 'alias'],
    },
    {
      id: 'bash-adv-3',
      title: 'Nameref in Functions',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Use a nameref to modify a caller variable by name.',
      skeleton: `#!/bin/bash
set_value() {
    declare -n _target="\$1"
    _target="\$2"
}
myvar="before"
set_value ___ "after"
echo "\$myvar"`,
      solution: `#!/bin/bash
set_value() {
    declare -n _target="\$1"
    _target="\$2"
}
myvar="before"
set_value myvar "after"
echo "\$myvar"`,
      hints: ['Pass the variable NAME (not value) to the function.', 'declare -n inside the function creates an alias.', 'set_value myvar "after"'],
      concepts: ['nameref', 'pass-by-reference', 'functions'],
    },
    {
      id: 'bash-adv-4',
      title: 'Dynamic Variable Assignment',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Use declare to set a variable whose name is computed at runtime.',
      skeleton: `#!/bin/bash
prefix="config"
___ "\${prefix}_host"="localhost"
___ "\${prefix}_port"="8080"
echo "\$config_host:\$config_port"`,
      solution: `#!/bin/bash
prefix="config"
declare "\${prefix}_host"="localhost"
declare "\${prefix}_port"="8080"
echo "\$config_host:\$config_port"`,
      hints: ['declare "varname"=value sets a variable dynamically.', 'The variable name is computed from the string.', 'declare "${prefix}_host"=...'],
      concepts: ['dynamic-variables', 'declare'],
    },
    {
      id: 'bash-adv-5',
      title: 'eval for Dynamic Variable Creation',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Use eval to create multiple variables from a list of names (controlled input only).',
      skeleton: `#!/bin/bash
for env in dev staging prod; do
    ___ "\${env}_url"="https://\${env}.example.com"
done
echo "\$dev_url"
echo "\$prod_url"`,
      solution: `#!/bin/bash
for env in dev staging prod; do
    eval "\${env}_url"="https://\${env}.example.com"
done
echo "\$dev_url"
echo "\$prod_url"`,
      hints: ['eval can create variable names computed at runtime.', 'Only use eval with controlled (non-user) strings.', 'eval "${env}_url"=...'],
      concepts: ['eval', 'dynamic-variables'],
    },
    {
      id: 'bash-adv-6',
      title: 'Write a Generic Setter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function set_var that sets a variable by name using nameref.',
      skeleton: `#!/bin/bash
# Write set_var varname value function`,
      solution: `#!/bin/bash
set_var() {
    declare -n _var="\$1"
    _var="\$2"
}
set_var greeting "Hello, World!"
echo "\$greeting"`,
      hints: ['declare -n creates a reference to the named variable.', 'Assigning to the nameref modifies the original variable.', 'declare -n _var="$1"'],
      concepts: ['nameref', 'pass-by-reference', 'functions'],
    },
    {
      id: 'bash-adv-7',
      title: 'Write a Dynamic Dispatcher',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function dispatch that calls a function whose name is built from a prefix and an action.',
      skeleton: `#!/bin/bash
# Write dispatch prefix action [args...]`,
      solution: `#!/bin/bash
dispatch() {
    local prefix="\$1"
    local action="\$2"
    shift 2
    local fn="\${prefix}_\${action}"
    if declare -f "\$fn" > /dev/null; then
        "\$fn" "\$@"
    else
        echo "Error: no function '\$fn'" >&2
        return 1
    fi
}

service_start() { echo "Starting service"; }
service_stop()  { echo "Stopping service"; }

dispatch service start
dispatch service stop
dispatch service restart || true`,
      hints: ['Build the function name with ${prefix}_${action}.', 'declare -f fn checks if a function exists.', 'Call it with "$fn" "$@".'],
      concepts: ['dynamic-dispatch', 'function-reference', 'declare-f'],
    },
    {
      id: 'bash-adv-8',
      title: 'Write a Co-process Client',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a script that uses a co-process to maintain a persistent bc session for repeated calculations.',
      skeleton: `#!/bin/bash
# Write bc co-process calculator`,
      solution: `#!/bin/bash
coproc BC { bc -l; }

calc() {
    echo "\$1" >&\${BC[1]}
    read -r result <&\${BC[0]}
    echo "\$result"
}

calc "2 + 3"
calc "sqrt(2)"
calc "10 / 3"

kill \$BC_PID 2>/dev/null`,
      hints: ['coproc BC { bc -l; } starts bc as a co-process.', '${BC[1]} is the write end, ${BC[0]} is the read end.', 'echo expression >&${BC[1]} sends to bc.'],
      concepts: ['coproc', 'co-process', 'persistent-subprocess'],
    },
    {
      id: 'bash-adv-9',
      title: 'Predict Nameref Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict the output after using a nameref to modify a variable.',
      skeleton: `#!/bin/bash
x=10
declare -n alias_x=x
alias_x=99
echo "\$x \$alias_x"`,
      solution: `99 99`,
      hints: ['alias_x is an alias for x.', 'Setting alias_x=99 also changes x.', 'Both print 99.'],
      concepts: ['nameref', 'alias', 'variable-reference'],
    },
    {
      id: 'bash-adv-10',
      title: 'Predict Indirect Expansion',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict what indirect expansion produces.',
      skeleton: `#!/bin/bash
fruit="banana"
banana="yellow"
echo "\${!fruit}"`,
      solution: `yellow`,
      hints: ['${!fruit} expands to the value of $banana (the variable named by $fruit).', 'fruit="banana", so ${!fruit} = $banana = "yellow".', 'yellow'],
      concepts: ['indirect-expansion'],
    },
    {
      id: 'bash-adv-11',
      title: 'Predict eval Variable',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict the output after eval creates a dynamic variable.',
      skeleton: `#!/bin/bash
name="counter"
eval "\$name=42"
echo "\$counter"`,
      solution: `42`,
      hints: ['eval "$name=42" expands to eval "counter=42".', 'eval counter=42 creates the variable $counter.', '$counter is 42.'],
      concepts: ['eval', 'dynamic-variables'],
    },
    {
      id: 'bash-adv-12',
      title: 'Fix Nameref Collision',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Fix the nameref that collides with the function parameter name.',
      skeleton: `#!/bin/bash
# BUG: nameref 'value' collides with parameter
set_upper() {
    declare -n value="\$1"  # BUG: $1 might be "value"
    value="\${value^^}"
}
value="hello"
set_upper value
echo "\$value"`,
      solution: `#!/bin/bash
set_upper() {
    declare -n _su_ref="\$1"   # use unique name to avoid collision
    _su_ref="\${_su_ref^^}"
}
value="hello"
set_upper value
echo "\$value"`,
      hints: ['If the nameref name matches the variable name, bash gets confused.', 'Use a unique internal name for the nameref (e.g., _su_ref).', 'Prefixing with the function name helps avoid collisions.'],
      concepts: ['nameref', 'collision', 'naming'],
    },
    {
      id: 'bash-adv-13',
      title: 'Fix Unsafe eval',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Replace the unsafe eval with indirect expansion.',
      skeleton: `#!/bin/bash
# BUG: unsafe -- $1 is user input
get_config() {
    eval "echo \$\$1"
}
get_config HOME`,
      solution: `#!/bin/bash
get_config() {
    local varname="\$1"
    echo "\${!varname}"
}
get_config HOME`,
      hints: ['${!varname} safely performs indirect expansion.', 'No eval needed -- no injection risk.', '${!varname} reads the variable named by $varname.'],
      concepts: ['indirect-expansion', 'eval-alternative', 'security'],
    },
    {
      id: 'bash-adv-14',
      title: 'Write a Variable Inspector',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function inspect_vars that takes a list of variable names and prints each with its value.',
      skeleton: `#!/bin/bash
# Write inspect_vars var1 var2 ...`,
      solution: `#!/bin/bash
inspect_vars() {
    for varname in "\$@"; do
        if declare -p "\$varname" &>/dev/null; then
            echo "\$varname=\${!varname}"
        else
            echo "\$varname=(undefined)"
        fi
    done
}
HOST="localhost"
PORT=8080
inspect_vars HOST PORT UNDEFINED_VAR`,
      hints: ['${!varname} gets the value via indirect expansion.', 'declare -p varname checks if variable is defined.', 'Loop through the argument list.'],
      concepts: ['indirect-expansion', 'variable-inspection', 'declare-p'],
    },
    {
      id: 'bash-adv-15',
      title: 'Write a Function Mixin',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function apply_mixin that copies functions from one prefix to another by renaming them.',
      skeleton: `#!/bin/bash
# Write apply_mixin source_prefix target_prefix`,
      solution: `#!/bin/bash
apply_mixin() {
    local src="\$1"
    local tgt="\$2"
    while IFS= read -r line; do
        local fname="\${line% ()}"
        if [[ "\$fname" == "\${src}_"* ]]; then
            local newname="\${tgt}_\${fname#\${src}_}"
            local body=\$(declare -f "\$fname" | tail -n +2)
            eval "\$newname () \$body"
        fi
    done < <(declare -F | awk '{print \$3}')
}

base_hello() { echo "Hello from base"; }
base_bye()   { echo "Bye from base"; }

apply_mixin base child
child_hello
child_bye`,
      hints: ['declare -F lists all function names.', 'declare -f fname prints the function definition.', 'eval creates the renamed function.'],
      concepts: ['function-copying', 'dynamic-functions', 'eval', 'declare-f'],
    },
    {
      id: 'bash-adv-16',
      title: 'Predict declare -p Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict what declare -p shows for a regular variable vs an array.',
      skeleton: `#!/bin/bash
name="Alice"
colors=(red green blue)
declare -p name
declare -p colors`,
      solution: `declare -- name="Alice"\ndeclare -a colors=([0]="red" [1]="green" [2]="blue")`,
      hints: ['declare -p shows the type and value of a variable.', '-- for regular string, -a for indexed array.', 'The format includes array indices.'],
      concepts: ['declare-p', 'variable-inspection'],
    },
    {
      id: 'bash-adv-17',
      title: 'Write a Template Engine',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function render_template that replaces {{VAR}} placeholders with variable values.',
      skeleton: `#!/bin/bash
# Write render_template template_string`,
      solution: `#!/bin/bash
render_template() {
    local template="\$1"
    local result="\$template"
    # Find all {{VAR}} placeholders
    while [[ "\$result" =~ \{\{([A-Z_]+)\}\} ]]; do
        local varname="\${BASH_REMATCH[1]}"
        local value="\${!varname}"
        result="\${result/\{\{"\$varname"\}\}/\$value}"
    done
    echo "\$result"
}
NAME="Alice"
ENV="production"
render_template "Hello {{NAME}}, running in {{ENV}}"`,
      hints: ['Use =~ to find {{VAR}} patterns.', 'BASH_REMATCH[1] captures the variable name.', '${!varname} gets the value via indirect expansion.'],
      concepts: ['template-engine', 'regex', 'indirect-expansion', 'BASH_REMATCH'],
    },
    {
      id: 'bash-adv-18',
      title: 'Refactor eval to declare',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Refactor dynamic variable creation from eval to the safer declare.',
      skeleton: `#!/bin/bash
for i in 1 2 3; do
    eval "item_\${i}=value_\${i}"
done
echo "\$item_1 \$item_2 \$item_3"`,
      solution: `#!/bin/bash
for i in 1 2 3; do
    declare "item_\${i}"="value_\${i}"
done
echo "\$item_1 \$item_2 \$item_3"`,
      hints: ['declare "varname"=value is safer than eval for variable creation.', 'The variable name is still dynamically computed.', 'No eval, no injection risk.'],
      concepts: ['declare', 'eval-alternative', 'refactoring'],
    },
    {
      id: 'bash-adv-19',
      title: 'Write a Plugin Loader',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function load_plugins that sources all *.plugin.sh files from a directory and registers each plugin by calling its init function.',
      skeleton: `#!/bin/bash
# Write load_plugins directory function`,
      solution: `#!/bin/bash
load_plugins() {
    local dir="\${1:-./plugins}"
    local loaded=0
    for plugin in "\$dir"/*.plugin.sh; do
        [ -f "\$plugin" ] || continue
        local name=\$(basename "\$plugin" .plugin.sh)
        source "\$plugin"
        local init_fn="\${name}_init"
        if declare -f "\$init_fn" > /dev/null; then
            "\$init_fn"
            echo "Loaded plugin: \$name"
            loaded=\$((loaded + 1))
        fi
    done
    echo "Total plugins loaded: \$loaded"
}`,
      hints: ['source each plugin file to define its functions.', 'Build the init function name with ${name}_init.', 'declare -f checks if the function was defined.'],
      concepts: ['plugin-system', 'source', 'dynamic-functions', 'declare-f'],
    },
    {
      id: 'bash-adv-20',
      title: 'Write a Co-process Pipeline',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a script using a co-process to keep a python interpreter running for repeated eval calls.',
      skeleton: `#!/bin/bash
# Write python co-process evaluator`,
      solution: `#!/bin/bash
coproc PY { python3 -c "
import sys
for line in sys.stdin:
    try:
        result = eval(line.strip())
        print(result, flush=True)
    except Exception as e:
        print(f'error: {e}', flush=True)
"; }

py_eval() {
    echo "\$1" >&\${PY[1]}
    read -r result <&\${PY[0]}
    echo "\$result"
}

py_eval "2 ** 10"
py_eval "sum(range(10))"
py_eval "len('hello world'.split())"

kill \$PY_PID 2>/dev/null`,
      hints: ['coproc PY { python3 ...; } starts a persistent python process.', 'Write expressions to ${PY[1]}, read results from ${PY[0]}.', 'The python script loops reading stdin.'],
      concepts: ['coproc', 'python-interop', 'persistent-process'],
    },
  ],
};
