import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-conditionals',
  title: '5. Conditionals',
  explanation: `## Conditionals

Control flow in JavaScript determines which code runs based on conditions.

### if / else if / else
The fundamental branching construct. Conditions are coerced to boolean.

### switch / case
Matches a value against multiple cases using **strict equality** (\`===\`). Use \`break\` to prevent fall-through (or omit it intentionally).

### Ternary Operator
\`condition ? valueIfTrue : valueIfFalse\` -- an expression, not a statement.

### Nullish Coalescing (\`??\`)
Returns the right operand when the left is \`null\` or \`undefined\` (not falsy).
\`\`\`js
const name = input ?? 'Anonymous';
\`\`\`

### Optional Chaining (\`?.\`)
Short-circuits to \`undefined\` if any link in the chain is null/undefined.
\`\`\`js
const city = user?.address?.city;
\`\`\`

### Short-Circuit Patterns
- \`a || b\` -- returns \`a\` if truthy, else \`b\` (logical OR default)
- \`a && b\` -- returns \`b\` if \`a\` is truthy, else \`a\` (logical AND guard)

### Guard Clauses & Early Return
Return early to avoid deep nesting. Check error conditions first.
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'js-cond-1',
      title: 'Ternary operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Use a ternary to assign "adult" or "minor" based on age.',
      skeleton: `const age = 20;
const label = age >= 18 __BLANK__ 'adult' __BLANK__ 'minor';
console.log(label); // "adult"`,
      solution: `const age = 20;
const label = age >= 18 ? 'adult' : 'minor';
console.log(label); // "adult"`,
      hints: [
        'The ternary operator has the form: condition ? trueVal : falseVal.',
        'The first blank is the question mark, the second is the colon.',
        'Use `?` and `:`.',
      ],
      concepts: ['ternary operator', 'conditional expression'],
    },
    {
      id: 'js-cond-2',
      title: 'Nullish coalescing',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Use nullish coalescing to provide a default value.',
      skeleton: `const input = null;
const name = input __BLANK__ 'Anonymous';
console.log(name); // "Anonymous"`,
      solution: `const input = null;
const name = input ?? 'Anonymous';
console.log(name); // "Anonymous"`,
      hints: [
        'You need an operator that checks for null or undefined only.',
        'It is different from || which checks all falsy values.',
        'The operator is `??`.',
      ],
      concepts: ['nullish coalescing', '??', 'null', 'undefined'],
    },
    {
      id: 'js-cond-3',
      title: 'Optional chaining',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Safely access a nested property that might not exist.',
      skeleton: `const user = { name: 'Zan' };
const city = user__BLANK__address__BLANK__city;
console.log(city); // undefined (no error)`,
      solution: `const user = { name: 'Zan' };
const city = user?.address?.city;
console.log(city); // undefined (no error)`,
      hints: [
        'You need an operator that short-circuits if a property is null/undefined.',
        'It uses a question mark and a dot.',
        'The operator is `?.`.',
      ],
      concepts: ['optional chaining', '?.', 'null safety'],
    },
    {
      id: 'js-cond-4',
      title: 'Switch with break',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the keyword that prevents fall-through in a switch.',
      skeleton: `switch (color) {
  case 'red':
    result = '#ff0000';
    __BLANK__;
  case 'blue':
    result = '#0000ff';
    __BLANK__;
  default:
    result = '#000000';
}`,
      solution: `switch (color) {
  case 'red':
    result = '#ff0000';
    break;
  case 'blue':
    result = '#0000ff';
    break;
  default:
    result = '#000000';
}`,
      hints: [
        'Without this keyword, execution falls through to the next case.',
        'It exits the switch statement.',
        'The keyword is `break`.',
      ],
      concepts: ['switch', 'break', 'fall-through'],
    },
    {
      id: 'js-cond-5',
      title: 'Logical AND guard',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Use logical AND to conditionally call a function.',
      skeleton: `const user = { name: 'Zan', isAdmin: true };
user.isAdmin __BLANK__ console.log('Admin access granted');`,
      solution: `const user = { name: 'Zan', isAdmin: true };
user.isAdmin && console.log('Admin access granted');`,
      hints: [
        'The && operator short-circuits: if the left is falsy, it skips the right.',
        'If the left is truthy, the right side executes.',
        'Use `&&`.',
      ],
      concepts: ['logical AND', 'short-circuit', 'guard pattern'],
    },
    {
      id: 'js-cond-6',
      title: '?? vs ||',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Fill in the correct operator: we want 0 to be a valid value, not replaced by the default.',
      skeleton: `const count = 0;
const display = count __BLANK__ 'no data';
console.log(display); // 0 (not "no data")`,
      solution: `const count = 0;
const display = count ?? 'no data';
console.log(display); // 0 (not "no data")`,
      hints: [
        '|| would treat 0 as falsy and return the default.',
        'You need an operator that only triggers on null/undefined.',
        'Use `??`.',
      ],
      concepts: ['??', '||', 'falsy', 'nullish coalescing'],
    },
    // ---- write-function (6) ----
    {
      id: 'js-cond-7',
      title: 'Grade classifier',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function `getGrade(score)` that returns "A" (>=90), "B" (>=80), "C" (>=70), "D" (>=60), or "F" (below 60).',
      skeleton: `function getGrade(score) {
  // Return the letter grade
}
`,
      solution: `function getGrade(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}`,
      hints: [
        'Use if/else if or early returns.',
        'Check from highest to lowest.',
        'Use guard clauses with early return.',
      ],
      concepts: ['if/else', 'early return', 'guard clauses'],
    },
    {
      id: 'js-cond-8',
      title: 'FizzBuzz',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function `fizzBuzz(n)` that returns "FizzBuzz" if n is divisible by both 3 and 5, "Fizz" if by 3, "Buzz" if by 5, or the number as a string otherwise.',
      skeleton: `function fizzBuzz(n) {
  // Return "Fizz", "Buzz", "FizzBuzz", or the number
}
`,
      solution: `function fizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) return 'FizzBuzz';
  if (n % 3 === 0) return 'Fizz';
  if (n % 5 === 0) return 'Buzz';
  return String(n);
}`,
      hints: [
        'Check the combined condition first (divisible by both).',
        'Then check individual divisibility.',
        'Return the number as a string for the default case.',
      ],
      concepts: ['modulo', 'if/else', 'FizzBuzz'],
    },
    {
      id: 'js-cond-9',
      title: 'Safe property access',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `getNestedValue(obj, path, defaultVal)` where path is a dot-separated string. Return the value or defaultVal if any part is null/undefined.',
      skeleton: `function getNestedValue(obj, path, defaultVal) {
  // Navigate the object using path like "a.b.c"
}
`,
      solution: `function getNestedValue(obj, path, defaultVal) {
  const result = path.split('.').reduce((acc, key) => acc?.[key], obj);
  return result ?? defaultVal;
}`,
      hints: [
        'Split the path by "." to get an array of keys.',
        'Use reduce to walk the object, using optional chaining.',
        'Return the default if the result is null/undefined.',
      ],
      concepts: ['optional chaining', 'reduce', 'nullish coalescing', 'dynamic property access'],
    },
    {
      id: 'js-cond-10',
      title: 'Switch with return',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `dayType(day)` using a switch that returns "weekday" or "weekend" based on the day name.',
      skeleton: `function dayType(day) {
  // Use switch to classify the day
}
`,
      solution: `function dayType(day) {
  switch (day.toLowerCase()) {
    case 'saturday':
    case 'sunday':
      return 'weekend';
    case 'monday':
    case 'tuesday':
    case 'wednesday':
    case 'thursday':
    case 'friday':
      return 'weekday';
    default:
      return 'unknown';
  }
}`,
      hints: [
        'Use fall-through for Saturday and Sunday.',
        'Use fall-through for the weekdays too.',
        'return from each case eliminates the need for break.',
      ],
      concepts: ['switch', 'fall-through', 'return'],
    },
    {
      id: 'js-cond-11',
      title: 'Guard clause refactor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `processOrder(order)` that returns early with error strings for: no order, no items, or empty items array. Otherwise return "processed".',
      skeleton: `function processOrder(order) {
  // Use guard clauses to validate, then return "processed"
}
`,
      solution: `function processOrder(order) {
  if (!order) return 'error: no order';
  if (!order.items) return 'error: no items';
  if (order.items.length === 0) return 'error: empty items';
  return 'processed';
}`,
      hints: [
        'Check error conditions first and return early.',
        'This avoids deeply nested if/else.',
        'Each guard checks one condition and returns an error.',
      ],
      concepts: ['guard clauses', 'early return', 'validation'],
    },
    {
      id: 'js-cond-12',
      title: 'Conditional assignment patterns',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function `mergeConfig(defaults, overrides)` that creates a new config object. For each key in defaults, use the override value if it is not null/undefined, otherwise keep the default.',
      skeleton: `function mergeConfig(defaults, overrides) {
  // Merge using nullish coalescing
}
`,
      solution: `function mergeConfig(defaults, overrides) {
  const result = {};
  for (const key of Object.keys(defaults)) {
    result[key] = overrides[key] ?? defaults[key];
  }
  return result;
}`,
      hints: [
        'Iterate over the keys of the defaults object.',
        'For each key, use ?? to pick override or default.',
        'This preserves falsy values like 0 or "" from overrides.',
      ],
      concepts: ['nullish coalescing', 'object iteration', 'config merging'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'js-cond-13',
      title: 'Fix: missing break in switch',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'This switch falls through unintentionally. Fix it.',
      skeleton: `function getColor(fruit) {
  let color;
  switch (fruit) {
    case 'apple':
      color = 'red';
    case 'banana':
      color = 'yellow';
    case 'grape':
      color = 'purple';
    default:
      color = 'unknown';
  }
  return color;
}
// getColor('apple') should return 'red', not 'unknown'`,
      solution: `function getColor(fruit) {
  let color;
  switch (fruit) {
    case 'apple':
      color = 'red';
      break;
    case 'banana':
      color = 'yellow';
      break;
    case 'grape':
      color = 'purple';
      break;
    default:
      color = 'unknown';
  }
  return color;
}`,
      hints: [
        'Without break, execution falls through to the next case.',
        'Add break after each case assignment.',
        'The default case does not need break since it is last.',
      ],
      concepts: ['switch', 'break', 'fall-through'],
    },
    {
      id: 'js-cond-14',
      title: 'Fix: || vs ?? for zero',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code incorrectly defaults the value 0 to 10 because || treats 0 as falsy. Fix it.',
      skeleton: `function getVolume(level) {
  return level || 10;
}
console.log(getVolume(0));   // should be 0, not 10
console.log(getVolume(null)); // should be 10`,
      solution: `function getVolume(level) {
  return level ?? 10;
}
console.log(getVolume(0));   // 0
console.log(getVolume(null)); // 10`,
      hints: [
        '|| returns the right side for any falsy value, including 0.',
        '?? only returns the right side for null or undefined.',
        'Replace || with ??.',
      ],
      concepts: ['??', '||', 'falsy', 'nullish coalescing'],
    },
    {
      id: 'js-cond-15',
      title: 'Fix: equality in switch',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This switch does not match because the case values are strings but the input is a number. Fix it.',
      skeleton: `function describe(code) {
  switch (code) {
    case '200': return 'OK';
    case '404': return 'Not Found';
    case '500': return 'Server Error';
    default: return 'Unknown';
  }
}
console.log(describe(200)); // should be "OK"`,
      solution: `function describe(code) {
  switch (code) {
    case 200: return 'OK';
    case 404: return 'Not Found';
    case 500: return 'Server Error';
    default: return 'Unknown';
  }
}
console.log(describe(200)); // "OK"`,
      hints: [
        'switch uses strict equality (===).',
        '200 !== "200" because the types differ.',
        'Change the case values to numbers.',
      ],
      concepts: ['switch', 'strict equality', 'type mismatch'],
    },
    // ---- predict-output (3) ----
    {
      id: 'js-cond-16',
      title: 'Predict: short-circuit evaluation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `console.log(0 || 'hello');
console.log(0 ?? 'hello');
console.log('' || 'default');
console.log('' ?? 'default');`,
      solution: `hello
0
default
`,
      hints: [
        '|| returns the first truthy value or the last value.',
        '?? returns the first non-nullish value.',
        '0 and "" are falsy but not nullish.',
      ],
      concepts: ['||', '??', 'short-circuit', 'falsy vs nullish'],
    },
    {
      id: 'js-cond-17',
      title: 'Predict: optional chaining',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `const obj = { a: { b: null } };
console.log(obj?.a?.b?.c);
console.log(obj?.x?.y);`,
      solution: `undefined
undefined`,
      hints: [
        'obj.a.b is null, so ?.c short-circuits to undefined.',
        'obj.x is undefined, so ?.y short-circuits to undefined.',
        'Both lines output undefined.',
      ],
      concepts: ['optional chaining', 'null', 'undefined', 'short-circuit'],
    },
    {
      id: 'js-cond-18',
      title: 'Predict: ternary chain',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `const x = 5;
const result = x > 10 ? 'big' : x > 3 ? 'medium' : 'small';
console.log(result);`,
      solution: `medium`,
      hints: [
        'x is 5, so x > 10 is false.',
        'Then x > 3 is evaluated, which is true.',
        'The result is "medium".',
      ],
      concepts: ['ternary operator', 'nested ternary', 'chaining'],
    },
    // ---- refactor (2) ----
    {
      id: 'js-cond-19',
      title: 'Refactor: nested ifs to guard clauses',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Refactor this deeply nested code to use guard clauses.',
      skeleton: `function process(user) {
  if (user) {
    if (user.isActive) {
      if (user.hasPermission) {
        return 'access granted';
      } else {
        return 'no permission';
      }
    } else {
      return 'inactive';
    }
  } else {
    return 'no user';
  }
}`,
      solution: `function process(user) {
  if (!user) return 'no user';
  if (!user.isActive) return 'inactive';
  if (!user.hasPermission) return 'no permission';
  return 'access granted';
}`,
      hints: [
        'Check negative conditions first and return early.',
        'Each guard clause eliminates one level of nesting.',
        'The happy path is the last return.',
      ],
      concepts: ['guard clauses', 'early return', 'refactoring'],
    },
    {
      id: 'js-cond-20',
      title: 'Refactor: if/else to object lookup',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this if/else chain to an object lookup.',
      skeleton: `function getStatusText(code) {
  if (code === 200) return 'OK';
  if (code === 201) return 'Created';
  if (code === 400) return 'Bad Request';
  if (code === 404) return 'Not Found';
  if (code === 500) return 'Server Error';
  return 'Unknown';
}`,
      solution: `function getStatusText(code) {
  const statusMap = {
    200: 'OK',
    201: 'Created',
    400: 'Bad Request',
    404: 'Not Found',
    500: 'Server Error',
  };
  return statusMap[code] ?? 'Unknown';
}`,
      hints: [
        'An object can map codes to text.',
        'Look up the code in the object.',
        'Use ?? to provide the default for missing keys.',
      ],
      concepts: ['object lookup', 'refactoring', 'nullish coalescing'],
    },
  ],
};
