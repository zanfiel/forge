import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-templates',
  title: '29. Template Literals',
  explanation: `## Template Literals

Template literals use backticks and enable expression interpolation, multiline strings, and powerful tagged templates.

\`\`\`javascript
// Interpolation
const name = 'World';
console.log(\\\`Hello \\\${name}!\\\`); // "Hello World!"

// Multiline
const html = \\\`
  <div>
    <p>Paragraph</p>
  </div>
\\\`;

// Tagged templates
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] !== undefined ? \\\`<b>\\\${values[i]}</b>\\\` : '');
  }, '');
}

highlight\\\`Hello \\\${name}, you have \\\${3} messages\\\`;
// "Hello <b>World</b>, you have <b>3</b> messages"

// String.raw -- no escape processing
String.raw\\\`\\n is not a newline here\\\`; // "\\\\n is not a newline here"
\`\`\`

Tagged templates are the foundation for libraries like styled-components, GraphQL queries, and safe SQL/HTML builders.`,
  exercises: [
    {
      id: 'js-templates-1',
      title: 'Basic interpolation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to interpolate variables in a template literal.',
      skeleton: `const language = 'JavaScript';
const year = 2024;
const message = __BLANK__\`\${language} in \${year} is great!__BLANK__;
console.log(message);`,
      solution: `const language = 'JavaScript';
const year = 2024;
const message = \`\${language} in \${year} is great!\`;
console.log(message);`,
      hints: [
        'Template literals use backticks (`).',
        '${expression} embeds values inside backticks.',
        'const message = `${language} in ${year} is great!`',
      ],
      concepts: ['template literals', 'interpolation'],
    },
    {
      id: 'js-templates-2',
      title: 'Multiline strings',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to create a multiline string with template literals.',
      skeleton: `const poem = __BLANK__Roses are red,
Violets are blue,
JavaScript is awesome,
And so are you.__BLANK__;
console.log(poem);`,
      solution: `const poem = \`Roses are red,
Violets are blue,
JavaScript is awesome,
And so are you.\`;
console.log(poem);`,
      hints: [
        'Template literals preserve newlines naturally.',
        'No need for \\n -- just write the newlines inside backticks.',
        'Wrap the text in backticks (`).',
      ],
      concepts: ['multiline strings', 'template literals'],
    },
    {
      id: 'js-templates-3',
      title: 'Expression interpolation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to use expressions inside template literals.',
      skeleton: `const price = 29.99;
const tax = 0.08;
const total = __BLANK__Total: $\${__BLANK__}__BLANK__;
console.log(total); // "Total: $32.39"`,
      solution: `const price = 29.99;
const tax = 0.08;
const total = \`Total: $\${(price * (1 + tax)).toFixed(2)}\`;
console.log(total); // "Total: $32.39"`,
      hints: [
        'Any JavaScript expression can go inside ${}.',
        'Use (price * (1 + tax)).toFixed(2) for the calculation.',
        'The entire expression goes inside ${...}.',
      ],
      concepts: ['expression interpolation', 'computed values'],
    },
    {
      id: 'js-templates-4',
      title: 'Nested templates',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to use nested template literals.',
      skeleton: `const items = ['apple', 'banana', 'cherry'];
const list = __BLANK__Items: \${items.map(i => __BLANK__- \${i}__BLANK__).join('\\n')}__BLANK__;
console.log(list);`,
      solution: `const items = ['apple', 'banana', 'cherry'];
const list = \`Items: \${items.map(i => \`- \${i}\`).join('\\n')}\`;
console.log(list);`,
      hints: [
        'Template literals can be nested inside ${}.',
        'The inner template uses its own backticks.',
        'Each nesting level gets its own pair of backticks.',
      ],
      concepts: ['nested template literals', 'array mapping'],
    },
    {
      id: 'js-templates-5',
      title: 'String.raw',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to use String.raw to preserve escape sequences.',
      skeleton: `const path = String.__BLANK__\`C:\\Users\\Documents\\file.txt\`;
console.log(path); // "C:\\Users\\Documents\\file.txt"
console.log(path.includes('\\\\'));  // __BLANK__`,
      solution: `const path = String.raw\`C:\\Users\\Documents\\file.txt\`;
console.log(path); // "C:\\Users\\Documents\\file.txt"
console.log(path.includes('\\\\'));  // true`,
      hints: [
        'String.raw is a built-in tag that prevents escape processing.',
        'Backslashes are kept as literal characters.',
        'The raw string contains actual backslash characters.',
      ],
      concepts: ['String.raw', 'raw strings', 'escape sequences'],
    },
    {
      id: 'js-templates-6',
      title: 'Predict tagged template output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict the output of a tagged template function.',
      skeleton: `function tag(strings, ...values) {
  console.log(strings.length);
  console.log(values.length);
  console.log(strings[0]);
  console.log(strings[1]);
  console.log(values[0]);
}

tag\`Hello \${'World'} and goodbye\`;`,
      solution: `// Output:
// 2
// 1
// 'Hello '
// ' and goodbye'
// 'World'
// strings always has one more element than values.
// strings[0] is before the first interpolation,
// strings[1] is after it. values[0] is the interpolated expression.`,
      hints: [
        'strings.length is always values.length + 1.',
        'The first string is everything before the first ${}.',
        'The second string is everything after the first ${}.',
      ],
      concepts: ['tagged template anatomy', 'strings and values arrays'],
    },
    {
      id: 'js-templates-7',
      title: 'Predict String.raw output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the difference between regular and raw template strings.',
      skeleton: `const regular = \`Line1\\nLine2\\tTabbed\`;
const raw = String.raw\`Line1\\nLine2\\tTabbed\`;

console.log(regular.length);
console.log(raw.length);
console.log(regular.includes('\\n'));
console.log(raw.includes('\\\\n'));`,
      solution: `// Output:
// 18
// 22
// true
// true
// Regular: \\n becomes actual newline (1 char), \\t becomes tab (1 char).
// Raw: \\n stays as two characters (backslash + n), \\t stays as two characters.
// So raw is 4 characters longer (2 extra per escape sequence).`,
      hints: [
        'In regular templates, \\n is one character (newline).',
        'In raw templates, \\n is two characters (backslash + n).',
        'Count characters carefully including escape sequences.',
      ],
      concepts: ['String.raw', 'escape sequences', 'string length'],
    },
    {
      id: 'js-templates-8',
      title: 'Write a highlight tag',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a tagged template function that wraps interpolated values in ** markers.',
      skeleton: `// highlight\`Hello \${name}, you have \${count} messages\`
// => "Hello **Alice**, you have **5** messages"
`,
      solution: `function highlight(strings, ...values) {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      result += \`**\${values[i]}**\`;
    }
  }
  return result;
}`,
      hints: [
        'Iterate over strings and interleave with wrapped values.',
        'strings.length is always values.length + 1.',
        'Wrap each value with ** before and after.',
      ],
      concepts: ['tagged templates', 'string building'],
    },
    {
      id: 'js-templates-9',
      title: 'Write an html escape tag',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a tagged template function that HTML-escapes all interpolated values to prevent XSS.',
      skeleton: `// html\`<p>Hello \${userInput}</p>\`
// Should escape <, >, &, ", ' in interpolated values
`,
      solution: `function html(strings, ...values) {
  const escape = (str) =>
    String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      result += escape(values[i]);
    }
  }
  return result;
}`,
      hints: [
        'Only escape the interpolated values, not the template strings.',
        'Replace &, <, >, ", and \' with HTML entities.',
        'Convert values to strings with String(val) before escaping.',
      ],
      concepts: ['tagged templates', 'HTML escaping', 'XSS prevention'],
    },
    {
      id: 'js-templates-10',
      title: 'Write a dedent tag',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a tagged template that removes common leading whitespace from all lines.',
      skeleton: `// dedent should strip common indentation:
// dedent\`
//     Hello
//     World
// \`  => "Hello\\nWorld"
`,
      solution: `function dedent(strings, ...values) {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      result += values[i];
    }
  }

  const lines = result.split('\\n');
  const nonEmpty = lines.filter(line => line.trim().length > 0);
  const minIndent = nonEmpty.reduce((min, line) => {
    const match = line.match(/^(\\s*)/);
    const indent = match ? match[1].length : 0;
    return Math.min(min, indent);
  }, Infinity);

  return lines
    .map(line => line.slice(minIndent))
    .join('\\n')
    .trim();
}`,
      hints: [
        'First combine all strings and values into one string.',
        'Find the minimum indentation across non-empty lines.',
        'Slice that many characters from the start of each line.',
      ],
      concepts: ['tagged templates', 'dedent', 'text processing'],
    },
    {
      id: 'js-templates-11',
      title: 'Write an i18n tag',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a tagged template that looks up translations from a dictionary, using the template string as a key.',
      skeleton: `// createI18n(translations) returns a tag function
// const t = createI18n({ 'Hello {0}!': 'Hola {0}!' });
// t\`Hello \${'World'}!\` => "Hola World!"
`,
      solution: `function createI18n(translations) {
  return function (strings, ...values) {
    const key = strings.reduce((acc, str, i) => {
      return acc + str + (i < values.length ? \`{\${i}}\` : '');
    }, '');

    let translated = translations[key] || key;
    for (let i = 0; i < values.length; i++) {
      translated = translated.replace(\`{\${i}}\`, values[i]);
    }
    return translated;
  };
}`,
      hints: [
        'Build a key by joining strings with {0}, {1}, etc. placeholders.',
        'Look up the key in translations.',
        'Replace {0}, {1}, etc. with actual values in the translated string.',
      ],
      concepts: ['tagged templates', 'internationalization', 'translation'],
    },
    {
      id: 'js-templates-12',
      title: 'Fix the tag function bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This tagged template function skips the last string segment. Fix it.',
      skeleton: `function upper(strings, ...values) {
  let result = '';
  for (let i = 0; i < values.length; i++) {
    result += strings[i];
    result += String(values[i]).toUpperCase();
  }
  return result;
}

console.log(upper\`hello \${'world'} and \${'universe'} today\`);
// Expected: "hello WORLD and UNIVERSE today"
// Actual:   "hello WORLD and UNIVERSE"`,
      solution: `function upper(strings, ...values) {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      result += String(values[i]).toUpperCase();
    }
  }
  return result;
}

console.log(upper\`hello \${'world'} and \${'universe'} today\`);
// "hello WORLD and UNIVERSE today"`,
      hints: [
        'strings.length is values.length + 1.',
        'The loop must iterate over all strings, not just values.length.',
        'Loop over strings.length and conditionally add values.',
      ],
      concepts: ['tagged template bug', 'off-by-one'],
    },
    {
      id: 'js-templates-13',
      title: 'Fix the raw property access',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This tag function tries to access raw strings but does it incorrectly. Fix it.',
      skeleton: `function showRaw(strings, ...values) {
  // Bug: accessing .raw on each string instead of the strings array
  return strings.map((s, i) => s.raw + (values[i] || '')).join('');
}

console.log(showRaw\`Hello\\nWorld\`);`,
      solution: `function showRaw(strings, ...values) {
  return strings.raw.map((s, i) => s + (values[i] || '')).join('');
}

console.log(showRaw\`Hello\\nWorld\`);`,
      hints: [
        'The raw property is on the strings array, not individual strings.',
        'Access strings.raw to get the array of raw (unescaped) strings.',
        'strings.raw[i] gives the raw version of strings[i].',
      ],
      concepts: ['strings.raw', 'tagged template raw access'],
    },
    {
      id: 'js-templates-14',
      title: 'Fix the CSS tag function',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'This CSS tag function does not handle numeric values correctly (missing units). Fix it.',
      skeleton: `function css(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] !== undefined ? values[i] : '');
  }, '');
}

const size = 16;
const color = 'red';
console.log(css\`font-size: \${size}; color: \${color};\`);
// Outputs: "font-size: 16; color: red;"
// Expected: "font-size: 16px; color: red;"`,
      solution: `function css(strings, ...values) {
  return strings.reduce((result, str, i) => {
    let val = values[i];
    if (val === undefined) return result + str;
    if (typeof val === 'number') {
      val = \`\${val}px\`;
    }
    return result + str + val;
  }, '');
}

const size = 16;
const color = 'red';
console.log(css\`font-size: \${size}; color: \${color};\`);
// "font-size: 16px; color: red;"`,
      hints: [
        'Check if the interpolated value is a number.',
        'If it is a number, append "px" automatically.',
        'Leave non-numeric values unchanged.',
      ],
      concepts: ['tagged templates', 'CSS-in-JS', 'type coercion'],
    },
    {
      id: 'js-templates-15',
      title: 'Predict nested template output',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Predict the output of nested template literals with conditions.',
      skeleton: `const user = { name: 'Alice', role: 'admin', active: true };

const badge = \`\${user.name} [\${
  user.role === 'admin' ? \`ADMIN\${user.active ? ' (active)' : ''}\` : 'user'
}]\`;

console.log(badge);`,
      solution: `// Output:
// 'Alice [ADMIN (active)]'
// user.role is 'admin', so the ternary picks the first branch.
// user.active is true, so the nested ternary appends ' (active)'.
// Result: "Alice [ADMIN (active)]"`,
      hints: [
        'Evaluate the outer ternary first: role === "admin" is true.',
        'Then evaluate the inner ternary: active is true.',
        'Concatenate: "ADMIN" + " (active)" = "ADMIN (active)".',
      ],
      concepts: ['nested templates', 'ternary in templates'],
    },
    {
      id: 'js-templates-16',
      title: 'Write a SQL safe tag',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a sql tagged template that replaces interpolated values with $1, $2, etc. and returns { text, values } for parameterized queries.',
      skeleton: `// sql\`SELECT * FROM users WHERE name = \${'Alice'} AND age > \${25}\`
// => { text: 'SELECT * FROM users WHERE name = $1 AND age > $2', values: ['Alice', 25] }
`,
      solution: `function sql(strings, ...values) {
  let text = '';
  for (let i = 0; i < strings.length; i++) {
    text += strings[i];
    if (i < values.length) {
      text += \`$\${i + 1}\`;
    }
  }
  return { text, values };
}`,
      hints: [
        'Replace each interpolated value with $1, $2, etc.',
        'Collect all values into an array.',
        'Return an object with the parameterized text and values array.',
      ],
      concepts: ['tagged templates', 'SQL parameterization', 'injection prevention'],
    },
    {
      id: 'js-templates-17',
      title: 'Write a custom DSL tag',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a tagged template that creates a simple expression evaluator DSL, replacing $var placeholders with values from a context object.',
      skeleton: `// createEval(context) returns a tag function
// const eval = createEval({ x: 10, y: 20 });
// eval\`result is \${ctx => ctx.x + ctx.y}\` => "result is 30"
// Interpolated functions receive the context and their return value is embedded
`,
      solution: `function createEval(context) {
  return function (strings, ...values) {
    let result = '';
    for (let i = 0; i < strings.length; i++) {
      result += strings[i];
      if (i < values.length) {
        const val = values[i];
        result += typeof val === 'function' ? val(context) : val;
      }
    }
    return result;
  };
}`,
      hints: [
        'Check if each interpolated value is a function.',
        'If it is a function, call it with the context object.',
        'Otherwise, embed the value directly.',
      ],
      concepts: ['tagged templates', 'DSL', 'higher-order functions'],
    },
    {
      id: 'js-templates-18',
      title: 'Write a memoized tag',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a tagged template that caches results based on the template strings array (which is the same object for the same call site).',
      skeleton: `// memoTag\`...\` -- caches the result per unique call site (strings identity)
// Returns the cached string if called again with the same template
`,
      solution: `const memoTag = (() => {
  const cache = new WeakMap();

  return function (strings, ...values) {
    if (!cache.has(strings)) {
      cache.set(strings, new Map());
    }
    const siteCache = cache.get(strings);
    const key = JSON.stringify(values);

    if (siteCache.has(key)) {
      return siteCache.get(key);
    }

    let result = '';
    for (let i = 0; i < strings.length; i++) {
      result += strings[i];
      if (i < values.length) {
        result += values[i];
      }
    }

    siteCache.set(key, result);
    return result;
  };
})();`,
      hints: [
        'The strings array is the same frozen object for each call site.',
        'Use a WeakMap keyed by strings for call-site identification.',
        'Cache by serialized values within each call site.',
      ],
      concepts: ['template caching', 'WeakMap', 'memoization'],
    },
    {
      id: 'js-templates-19',
      title: 'Refactor string concatenation to templates',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this messy string concatenation to use template literals.',
      skeleton: `function buildEmail(user, product, price) {
  var greeting = 'Dear ' + user.name + ',\\n\\n';
  var body = 'Thank you for purchasing ' + product + '.\\n';
  var total = 'Your total is $' + price.toFixed(2) + '.\\n';
  var footer = '\\nBest regards,\\n' + 'The ' + user.company + ' Team';
  return greeting + body + total + footer;
}`,
      solution: `function buildEmail(user, product, price) {
  return \`Dear \${user.name},

Thank you for purchasing \${product}.
Your total is $\${price.toFixed(2)}.

Best regards,
The \${user.company} Team\`;
}`,
      hints: [
        'Replace concatenation with a single template literal.',
        'Use actual newlines instead of \\n.',
        'Embed expressions with ${} instead of + ... +.',
      ],
      concepts: ['template literals', 'refactoring', 'string concatenation'],
    },
    {
      id: 'js-templates-20',
      title: 'Refactor to tagged template',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this manual log formatting function to use a tagged template.',
      skeleton: `function formatLog(level, message, timestamp, context) {
  return '[' + timestamp.toISOString() + '] ' +
    level.toUpperCase() + ': ' +
    message +
    (context ? ' | context=' + JSON.stringify(context) : '');
}

// Usage:
formatLog('info', 'User logged in', new Date(), { userId: 42 });`,
      solution: `function log(strings, ...values) {
  return strings.reduce((result, str, i) => {
    let val = values[i];
    if (val === undefined) return result + str;
    if (val instanceof Date) val = val.toISOString();
    else if (typeof val === 'object' && val !== null) val = JSON.stringify(val);
    else if (typeof val === 'string' && strings[i - 1]?.includes('] ')) val = val.toUpperCase();
    return result + str + val;
  }, '');
}

// Usage:
const ts = new Date();
const ctx = { userId: 42 };
log\`[\${ts}] \${'info'}: User logged in | context=\${ctx}\`;`,
      hints: [
        'Create a tag function that handles different types intelligently.',
        'Dates get formatted with toISOString().',
        'Objects get JSON.stringify()\'d automatically.',
      ],
      concepts: ['tagged templates', 'refactoring', 'smart formatting'],
    },
  ],
};
