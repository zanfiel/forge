import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'bash-arith',
  title: '10. Arithmetic',
  explanation: `## Arithmetic in Bash\n\nBash has multiple ways to do arithmetic. Integer arithmetic is built-in; floating point requires external tools.\n\n### $(( )) - Arithmetic Expansion\n\n\`\`\`bash\nresult=\$((3 + 4))        # 7\necho \$((10 % 3))         # 1 (modulo)\necho \$((2 ** 8))         # 256 (exponentiation)\nx=5; echo \$((x * 2))    # 10\n\`\`\`\n\n### let\n\n\`\`\`bash\nlet result=5+3\nlet "x = 10 * 2"\nlet x++          # increment\n\`\`\`\n\n### expr (legacy)\n\n\`\`\`bash\nresult=\$(expr 5 + 3)    # spaces required around operators\nexpr 10 \\* 3            # escape * to avoid glob\n\`\`\`\n\n### bc - Floating Point\n\n\`\`\`bash\necho "3.14 * 2" | bc -l          # 6.28\necho "scale=2; 10 / 3" | bc      # 3.33\nresult=\$(echo "sqrt(2)" | bc -l) # 1.41421...\n\`\`\`\n\n### Modulo and Integer Division\n\n\`\`\`bash\necho \$((17 % 5))    # 2\necho \$((17 / 5))    # 3 (integer division, truncates)\n\`\`\``,
  exercises: [
    {
      id: 'bash-arith-1',
      title: 'Basic Arithmetic Expansion',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Use $(( )) to compute a sum and product.',
      skeleton: `#!/bin/bash
a=8
b=3
sum=\$((___))
product=\$((___))
echo "\$sum \$product"`,
      solution: `#!/bin/bash
a=8
b=3
sum=\$((a + b))
product=\$((a * b))
echo "\$sum \$product"`,
      hints: ['$(( )) performs integer arithmetic.', 'Variables inside $(( )) do not need the $ prefix.', 'a + b and a * b'],
      concepts: ['arithmetic-expansion'],
    },
    {
      id: 'bash-arith-2',
      title: 'Modulo Operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Use modulo to check if a number is even or odd.',
      skeleton: `#!/bin/bash
n=17
remainder=\$((n ___ 2))
echo "\$remainder"   # 1 (odd)`,
      solution: `#!/bin/bash
n=17
remainder=\$((n % 2))
echo "\$remainder"`,
      hints: ['The modulo operator is %.', '$((n % 2)) gives 0 for even, 1 for odd.', '%'],
      concepts: ['modulo'],
    },
    {
      id: 'bash-arith-3',
      title: 'Increment with let',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Use let to increment a counter.',
      skeleton: `#!/bin/bash
count=0
___ count++
___ count++
___ count++
echo "\$count"   # 3`,
      solution: `#!/bin/bash
count=0
let count++
let count++
let count++
echo "\$count"`,
      hints: ['let performs arithmetic on variables.', 'let count++ increments count by 1.', 'let'],
      concepts: ['let', 'increment'],
    },
    {
      id: 'bash-arith-4',
      title: 'Integer Division',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Compute integer division and the remainder separately.',
      skeleton: `#!/bin/bash
total=17
divisor=5
quotient=\$((total ___ divisor))
remainder=\$((total ___ divisor))
echo "\$quotient r\$remainder"  # 3 r2`,
      solution: `#!/bin/bash
total=17
divisor=5
quotient=\$((total / divisor))
remainder=\$((total % divisor))
echo "\$quotient r\$remainder"`,
      hints: ['/ is integer division (truncates).', '% is modulo (remainder).', '/ and %'],
      concepts: ['integer-division', 'modulo'],
    },
    {
      id: 'bash-arith-5',
      title: 'Exponentiation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Compute 2 to the power of 10 using $(( )).',
      skeleton: `#!/bin/bash
base=2
exp=10
result=\$((base ___ exp))
echo "\$result"  # 1024`,
      solution: `#!/bin/bash
base=2
exp=10
result=\$((base ** exp))
echo "\$result"`,
      hints: ['** is the exponentiation operator in bash arithmetic.', '$((base ** exp)) computes base to the power of exp.', '**'],
      concepts: ['exponentiation'],
    },
    {
      id: 'bash-arith-6',
      title: 'Floating Point with bc',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Use bc to compute a floating point division.',
      skeleton: `#!/bin/bash
result=\$(echo "___ ; 10 / 3" | bc)
echo "\$result"  # 3.33`,
      solution: `#!/bin/bash
result=\$(echo "scale=2 ; 10 / 3" | bc)
echo "\$result"`,
      hints: ['bc does floating point math.', 'scale=2 sets two decimal places.', 'scale=2'],
      concepts: ['bc', 'floating-point', 'scale'],
    },
    {
      id: 'bash-arith-7',
      title: 'Write a Calculator Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function calc that takes two integers and an operator (+, -, *, %) and prints the result.',
      skeleton: `#!/bin/bash
# Write calc function`,
      solution: `#!/bin/bash
calc() {
  local a="\$1"
  local op="\$2"
  local b="\$3"
  case "\$op" in
    '+') echo \$((a + b)) ;;
    '-') echo \$((a - b)) ;;
    '*') echo \$((a * b)) ;;
    '%') echo \$((a % b)) ;;
    *) echo "unknown op" ;;
  esac
}
calc 10 + 3
calc 10 % 3`,
      hints: ['Use a case statement for the operator.', 'Each branch uses $(( )) for the arithmetic.', 'Quote the operator argument to avoid glob issues.'],
      concepts: ['functions', 'arithmetic', 'case'],
    },
    {
      id: 'bash-arith-8',
      title: 'Write a Sum Loop',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a script that sums all integers from 1 to N (given as $1).',
      skeleton: `#!/bin/bash
# Sum 1..N where N=$1`,
      solution: `#!/bin/bash
n="\$1"
total=0
for ((i=1; i<=n; i++)); do
  total=\$((total + i))
done
echo "\$total"`,
      hints: ['Use a C-style for loop: for ((i=1; i<=n; i++)).', 'Accumulate with total=$((total + i)).', 'Print $total after the loop.'],
      concepts: ['c-style-for', 'arithmetic', 'accumulator'],
    },
    {
      id: 'bash-arith-9',
      title: 'Write a Float Average',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a script that takes numbers as arguments and prints their average to 2 decimal places using bc.',
      skeleton: `#!/bin/bash
# Compute average of all arguments`,
      solution: `#!/bin/bash
count=\$#
total=0
for num in "\$@"; do
  total=\$((total + num))
done
echo "scale=2; \$total / \$count" | bc`,
      hints: ['$# gives the argument count.', 'Loop over "$@" to sum all arguments.', 'Pipe "scale=2; $total / $count" to bc for floating point.'],
      concepts: ['bc', 'floating-point', 'arguments'],
    },
    {
      id: 'bash-arith-10',
      title: 'Predict Arithmetic Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Predict the output of these arithmetic operations.',
      skeleton: `#!/bin/bash
echo \$((10 / 3))
echo \$((10 % 3))
echo \$((2 ** 4))`,
      solution: `3\n1\n16`,
      hints: ['Integer division truncates: 10/3=3.', '10 % 3 = 1 (remainder).', '2 ** 4 = 16.'],
      concepts: ['integer-division', 'modulo', 'exponentiation'],
    },
    {
      id: 'bash-arith-11',
      title: 'Predict let Counter',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Predict the value of x after these let operations.',
      skeleton: `#!/bin/bash
x=5
let x+=3
let x*=2
let x-=1
echo "\$x"`,
      solution: `15`,
      hints: ['x starts at 5.', 'x+=3 makes x=8, x*=2 makes x=16, x-=1 makes x=15.', '15'],
      concepts: ['let', 'compound-assignment'],
    },
    {
      id: 'bash-arith-12',
      title: 'Fix expr Missing Spaces',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Fix the expr command that is missing spaces around operators.',
      skeleton: `#!/bin/bash
result=\$(expr 5+3)
echo "\$result"`,
      solution: `#!/bin/bash
result=\$(expr 5 + 3)
echo "\$result"`,
      hints: ['expr requires spaces around operators.', 'expr 5+3 treats it as one string argument.', 'expr 5 + 3'],
      concepts: ['expr', 'operator-spacing'],
    },
    {
      id: 'bash-arith-13',
      title: 'Fix Floating Point in $(( ))',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Fix the script that tries to use floating point in $(( )) -- use bc instead.',
      skeleton: `#!/bin/bash
# BUG: $(( )) does not support floats
result=\$((3.14 * 2))
echo "\$result"`,
      solution: `#!/bin/bash
result=\$(echo "scale=4; 3.14 * 2" | bc)
echo "\$result"`,
      hints: ['$(( )) only supports integers.', 'Pipe the expression to bc for floating point.', 'echo "scale=4; 3.14 * 2" | bc'],
      concepts: ['bc', 'floating-point', 'arithmetic-expansion-limits'],
    },
    {
      id: 'bash-arith-14',
      title: 'Refactor expr to $(( ))',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'bash',
      goal: 'Refactor legacy expr calls to modern $(( )) arithmetic expansion.',
      skeleton: `#!/bin/bash
a=10
b=4
sum=\$(expr \$a + \$b)
diff=\$(expr \$a - \$b)
prod=\$(expr \$a \\* \$b)
echo "\$sum \$diff \$prod"`,
      solution: `#!/bin/bash
a=10
b=4
sum=\$((a + b))
diff=\$((a - b))
prod=\$((a * b))
echo "\$sum \$diff \$prod"`,
      hints: ['$(( )) is faster and more readable than expr.', 'No $ prefix needed for variables inside $(( )).', 'No need to escape * inside $(( )).'],
      concepts: ['arithmetic-expansion', 'refactoring'],
    },
    {
      id: 'bash-arith-15',
      title: 'Write a Celsius to Fahrenheit Converter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function c2f that converts Celsius to Fahrenheit using bc for floating point.',
      skeleton: `#!/bin/bash
# Write c2f function that takes a Celsius value as $1`,
      solution: `#!/bin/bash
c2f() {
  local c="\$1"
  echo "scale=1; \$c * 9 / 5 + 32" | bc
}
c2f 0
c2f 100
c2f 37`,
      hints: ['Formula: F = C * 9 / 5 + 32', 'Use bc for floating point: echo "scale=1; ..." | bc', 'scale=1 gives one decimal place.'],
      concepts: ['bc', 'floating-point', 'functions'],
    },
    {
      id: 'bash-arith-16',
      title: 'Predict Integer Division Truncation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Predict the output of these division operations.',
      skeleton: `#!/bin/bash
echo \$((7 / 2))
echo \$((-7 / 2))
echo \$((7 % 2))`,
      solution: `3\n-3\n1`,
      hints: ['7/2 = 3 (truncates toward zero).', '-7/2 = -3 (truncates toward zero in bash).', '7 % 2 = 1.'],
      concepts: ['integer-division', 'truncation', 'negative-arithmetic'],
    },
    {
      id: 'bash-arith-17',
      title: 'Write a Power Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Write a function power that takes a base and exponent and prints the result using $(( )).',
      skeleton: `#!/bin/bash
# Write power function`,
      solution: `#!/bin/bash
power() {
  local base="\$1"
  local exp="\$2"
  echo \$((base ** exp))
}
power 2 10
power 3 4`,
      hints: ['** is the exponentiation operator in bash.', '$((base ** exp)) computes the power.', 'Store the arguments in local variables.'],
      concepts: ['exponentiation', 'functions'],
    },
    {
      id: 'bash-arith-18',
      title: 'Fix Unquoted Variable in let',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Fix the let expression that fails when the variable contains spaces.',
      skeleton: `#!/bin/bash
expr="10 + 5"
let result=\$expr
echo "\$result"`,
      solution: `#!/bin/bash
expr="10 + 5"
let "result=\$expr"
echo "\$result"`,
      hints: ['let splits on spaces -- quote expressions with spaces.', 'let "result=$expr" treats the whole thing as one expression.', 'Double-quote the let argument.'],
      concepts: ['let', 'quoting'],
    },
    {
      id: 'bash-arith-19',
      title: 'Write a Percentage Calculator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'bash',
      goal: 'Write a function percent that takes a value and total and prints the percentage to 1 decimal place.',
      skeleton: `#!/bin/bash
# percent value total`,
      solution: `#!/bin/bash
percent() {
  local value="\$1"
  local total="\$2"
  echo "scale=1; \$value * 100 / \$total" | bc
}
percent 3 4
percent 1 3`,
      hints: ['Multiply by 100 before dividing to preserve precision.', 'Use bc with scale=1 for one decimal place.', 'echo "scale=1; $value * 100 / $total" | bc'],
      concepts: ['bc', 'percentage', 'floating-point'],
    },
    {
      id: 'bash-arith-20',
      title: 'Refactor to Arithmetic Expansion',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'bash',
      goal: 'Refactor this script to use $(( )) instead of external commands for all integer math.',
      skeleton: `#!/bin/bash
width=\$(expr 1920 / 2)
height=\$(expr 1080 / 2)
pixels=\$(expr \$width \\* \$height)
echo "\${width}x\${height} = \${pixels} pixels"`,
      solution: `#!/bin/bash
width=\$((1920 / 2))
height=\$((1080 / 2))
pixels=\$((width * height))
echo "\${width}x\${height} = \${pixels} pixels"`,
      hints: ['Replace $(expr ...) with $(( )).', 'No need to escape * inside $(( )).', 'Variables inside $(( )) do not need $.'],
      concepts: ['arithmetic-expansion', 'refactoring'],
    },
  ],
};
