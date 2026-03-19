import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-strings',
  title: '3. Strings',
  explanation: `## Strings

Strings in JavaScript are **immutable** sequences of UTF-16 code units.

### Creation
Strings can be created with single quotes, double quotes, or backticks (template literals).

### Template Literals
Backtick strings support interpolation (\`\${expr}\`) and multi-line content. **Tagged templates** let you process template literal parts with a custom function.

### Key Methods
| Method | Description |
|--------|-------------|
| \`slice(start, end)\` | Extract a portion |
| \`substring(start, end)\` | Similar to slice, no negative indices |
| \`indexOf(str)\` / \`includes(str)\` | Search |
| \`startsWith\` / \`endsWith\` | Check prefix/suffix |
| \`trim\` / \`trimStart\` / \`trimEnd\` | Remove whitespace |
| \`padStart\` / \`padEnd\` | Pad to a length |
| \`repeat(n)\` | Repeat n times |
| \`replace\` / \`replaceAll\` | Replace substrings |
| \`split(sep)\` | Split into array |
| \`at(index)\` | Access by index (supports negative) |

### String Immutability
String methods always return **new** strings. The original is never modified.

### Unicode
\`String.fromCharCode()\`, \`codePointAt()\`, and \`normalize()\` handle Unicode. Use \`localeCompare()\` for locale-aware sorting.
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'js-str-1',
      title: 'Template literal interpolation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the template literal syntax to interpolate a variable.',
      skeleton: `const name = 'Zan';
const greeting = \`Hello, __BLANK__!\`;
console.log(greeting); // "Hello, Zan!"`,
      solution: `const name = 'Zan';
const greeting = \`Hello, \${name}!\`;
console.log(greeting); // "Hello, Zan!"`,
      hints: [
        'Template literals use backticks and ${} for interpolation.',
        'Put the variable name inside ${}.',
        'Use `${name}`.',
      ],
      concepts: ['template literals', 'string interpolation'],
    },
    {
      id: 'js-str-2',
      title: 'String method: includes',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the method that checks if a string contains a substring.',
      skeleton: `const text = 'JavaScript is awesome';
console.log(text.__BLANK__('awesome')); // true`,
      solution: `const text = 'JavaScript is awesome';
console.log(text.includes('awesome')); // true`,
      hints: [
        'You need a method that returns a boolean.',
        'It checks if the string contains the given substring.',
        'The method is `includes`.',
      ],
      concepts: ['String.includes', 'string search'],
    },
    {
      id: 'js-str-3',
      title: 'padStart for formatting',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Pad a number string to 4 digits with leading zeros.',
      skeleton: `const id = '42';
const padded = id.__BLANK__(4, '0');
console.log(padded); // "0042"`,
      solution: `const id = '42';
const padded = id.padStart(4, '0');
console.log(padded); // "0042"`,
      hints: [
        'You need to add characters to the start of the string.',
        'The method takes a target length and a pad character.',
        'Use `padStart`.',
      ],
      concepts: ['String.padStart', 'string formatting'],
    },
    {
      id: 'js-str-4',
      title: 'String at() method',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Use the at() method to get the last character of a string.',
      skeleton: `const word = 'hello';
const last = word.at(__BLANK__);
console.log(last); // "o"`,
      solution: `const word = 'hello';
const last = word.at(-1);
console.log(last); // "o"`,
      hints: [
        'at() supports negative indices.',
        'Negative indices count from the end.',
        'Use `-1` to get the last character.',
      ],
      concepts: ['String.at', 'negative index'],
    },
    {
      id: 'js-str-5',
      title: 'replaceAll',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Replace all occurrences of a substring.',
      skeleton: `const csv = 'a,b,c,d';
const spaced = csv.__BLANK__(',', ' ');
console.log(spaced); // "a b c d"`,
      solution: `const csv = 'a,b,c,d';
const spaced = csv.replaceAll(',', ' ');
console.log(spaced); // "a b c d"`,
      hints: [
        'replace() only replaces the first occurrence by default.',
        'You need a method that replaces all occurrences.',
        'Use `replaceAll`.',
      ],
      concepts: ['String.replaceAll', 'string replacement'],
    },
    {
      id: 'js-str-6',
      title: 'Raw string',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Use String.raw to keep backslashes literal.',
      skeleton: `const path = __BLANK__\`C:\\Users\\Zan\\file.txt\`;
console.log(path); // "C:\\Users\\Zan\\file.txt"`,
      solution: `const path = String.raw\`C:\\Users\\Zan\\file.txt\`;
console.log(path); // "C:\\Users\\Zan\\file.txt"`,
      hints: [
        'Normal template literals process escape sequences.',
        'There is a built-in tagged template that preserves raw strings.',
        'Use `String.raw`.',
      ],
      concepts: ['String.raw', 'tagged templates', 'escape sequences'],
    },
    // ---- write-function (6) ----
    {
      id: 'js-str-7',
      title: 'Capitalize first letter',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function `capitalize(str)` that capitalises the first letter of a string.',
      skeleton: `function capitalize(str) {
  // Return string with first letter uppercase
}
`,
      solution: `function capitalize(str) {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}`,
      hints: [
        'Get the first character and convert to uppercase.',
        'Concatenate with the rest of the string.',
        'Use `str[0].toUpperCase() + str.slice(1)`.',
      ],
      concepts: ['String.toUpperCase', 'String.slice', 'string manipulation'],
    },
    {
      id: 'js-str-8',
      title: 'Count occurrences',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function `countChar(str, char)` that counts how many times a character appears in a string.',
      skeleton: `function countChar(str, char) {
  // Return the count
}
`,
      solution: `function countChar(str, char) {
  return str.split(char).length - 1;
}`,
      hints: [
        'You can split the string by the character.',
        'The number of resulting parts minus 1 is the count.',
        '`str.split(char).length - 1`.',
      ],
      concepts: ['String.split', 'counting', 'string search'],
    },
    {
      id: 'js-str-9',
      title: 'Truncate with ellipsis',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `truncate(str, maxLen)` that truncates a string to maxLen characters and appends "..." if it was truncated.',
      skeleton: `function truncate(str, maxLen) {
  // Truncate and add "..." if needed
}
`,
      solution: `function truncate(str, maxLen) {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen) + '...';
}`,
      hints: [
        'Check if the string length exceeds maxLen.',
        'If it does, slice to maxLen and append "...".',
        'If it does not, return the original string.',
      ],
      concepts: ['String.slice', 'String.length', 'conditional logic'],
    },
    {
      id: 'js-str-10',
      title: 'Slug generator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function `slugify(str)` that converts a title to a URL slug: lowercase, spaces replaced with hyphens, non-alphanumeric characters removed.',
      skeleton: `function slugify(str) {
  // Convert to slug
}
`,
      solution: `function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\\s-]/g, '')
    .replace(/\\s+/g, '-');
}`,
      hints: [
        'Lowercase first, then remove unwanted characters.',
        'Use regex to strip non-alphanumeric characters.',
        'Replace spaces with hyphens.',
      ],
      concepts: ['String.toLowerCase', 'String.replace', 'regex', 'slug'],
    },
    {
      id: 'js-str-11',
      title: 'Tagged template - highlight',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a tagged template function `highlight` that wraps interpolated values in <mark> tags.',
      skeleton: `function highlight(strings, ...values) {
  // Return a string with values wrapped in <mark>...</mark>
}
// Usage: highlight\`Hello \${name}, you have \${count} messages\`
`,
      solution: `function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (i < values.length ? '<mark>' + values[i] + '</mark>' : '');
  }, '');
}`,
      hints: [
        'A tagged template receives an array of string parts and the interpolated values.',
        'Interleave the strings and wrapped values.',
        'Use reduce to build the result string.',
      ],
      concepts: ['tagged templates', 'template literals', 'string building'],
    },
    {
      id: 'js-str-12',
      title: 'Caesar cipher',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function `caesarShift(str, shift)` that shifts each lowercase letter by `shift` positions, wrapping around. Non-letter characters remain unchanged.',
      skeleton: `function caesarShift(str, shift) {
  // Shift each lowercase letter
}
`,
      solution: `function caesarShift(str, shift) {
  return [...str].map(ch => {
    if (ch >= 'a' && ch <= 'z') {
      return String.fromCharCode(((ch.charCodeAt(0) - 97 + shift) % 26 + 26) % 26 + 97);
    }
    return ch;
  }).join('');
}`,
      hints: [
        'Use charCodeAt to get the character code, shift it, then fromCharCode to convert back.',
        'Only shift lowercase letters (a-z). Use modulo 26 for wrapping.',
        'Handle negative shift with ((code + shift) % 26 + 26) % 26.',
      ],
      concepts: ['String.charCodeAt', 'String.fromCharCode', 'modular arithmetic', 'cipher'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'js-str-13',
      title: 'Fix: string mutation attempt',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'This code tries to mutate a string directly. Fix it to correctly change the first character.',
      skeleton: `let word = 'hello';
word[0] = 'H';
console.log(word); // should be "Hello"`,
      solution: `let word = 'hello';
word = 'H' + word.slice(1);
console.log(word); // "Hello"`,
      hints: [
        'Strings are immutable in JavaScript.',
        'You cannot change characters via index assignment.',
        'Create a new string by concatenating the uppercase letter with the rest.',
      ],
      concepts: ['string immutability', 'String.slice'],
    },
    {
      id: 'js-str-14',
      title: 'Fix: split and rejoin',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code tries to reverse a string but uses the wrong method. Fix it.',
      skeleton: `function reverseStr(str) {
  return str.split().reverse().join();
}
console.log(reverseStr('hello')); // should be "olleh"`,
      solution: `function reverseStr(str) {
  return str.split('').reverse().join('');
}
console.log(reverseStr('hello')); // "olleh"`,
      hints: [
        'split() without arguments splits into an array of one element.',
        'join() without arguments joins with commas.',
        'Use empty string as the separator for both split and join.',
      ],
      concepts: ['String.split', 'Array.reverse', 'Array.join'],
    },
    {
      id: 'js-str-15',
      title: 'Fix: trim whitespace',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code trims but does not handle internal multiple spaces. Fix it to collapse multiple spaces into one.',
      skeleton: `function cleanSpaces(str) {
  return str.trim();
}
console.log(cleanSpaces('  hello   world  ')); // should be "hello world"`,
      solution: `function cleanSpaces(str) {
  return str.trim().replace(/\\s+/g, ' ');
}
console.log(cleanSpaces('  hello   world  ')); // "hello world"`,
      hints: [
        'trim() only removes leading/trailing whitespace.',
        'You need to also collapse internal spaces.',
        'Use a regex to replace multiple whitespace with a single space.',
      ],
      concepts: ['String.trim', 'String.replace', 'regex', 'whitespace'],
    },
    // ---- predict-output (3) ----
    {
      id: 'js-str-16',
      title: 'Predict: string comparison',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `console.log('apple' < 'banana');
console.log('a' < 'A');`,
      solution: `true
false`,
      hints: [
        'Strings are compared by Unicode code points.',
        'Lowercase letters have higher code points than uppercase.',
        '"apple" < "banana" is true. "a" (97) > "A" (65) so "a" < "A" is false.',
      ],
      concepts: ['string comparison', 'Unicode', 'lexicographic order'],
    },
    {
      id: 'js-str-17',
      title: 'Predict: repeat and slice',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `const s = 'abc'.repeat(3);
console.log(s.slice(-3));`,
      solution: `abc`,
      hints: [
        '"abc".repeat(3) produces "abcabcabc".',
        'slice(-3) gets the last 3 characters.',
        'The last 3 characters are "abc".',
      ],
      concepts: ['String.repeat', 'String.slice', 'negative index'],
    },
    {
      id: 'js-str-18',
      title: 'Predict: split and length',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output.',
      skeleton: `console.log('a,b,,c'.split(',').length);`,
      solution: `4`,
      hints: [
        'split creates an array element for each part between separators.',
        'Two consecutive commas create an empty string element.',
        'The result is ["a", "b", "", "c"] which has length 4.',
      ],
      concepts: ['String.split', 'empty strings', 'Array.length'],
    },
    // ---- refactor (2) ----
    {
      id: 'js-str-19',
      title: 'Refactor: concatenation to template literal',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Refactor string concatenation to use a template literal.',
      skeleton: `const name = 'Zan';
const age = 30;
const msg = 'My name is ' + name + ' and I am ' + age + ' years old.';
console.log(msg);`,
      solution: `const name = 'Zan';
const age = 30;
const msg = \`My name is \${name} and I am \${age} years old.\`;
console.log(msg);`,
      hints: [
        'Template literals use backticks and ${} for interpolation.',
        'Replace the concatenation with a single template literal.',
        'Use `\\`My name is \\${name} and I am \\${age} years old.\\``.',
      ],
      concepts: ['template literals', 'string interpolation', 'refactoring'],
    },
    {
      id: 'js-str-20',
      title: 'Refactor: indexOf to modern methods',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Refactor indexOf checks to use modern string methods.',
      skeleton: `function analyzeUrl(url) {
  const isHttps = url.indexOf('https://') === 0;
  const hasQuery = url.indexOf('?') !== -1;
  const isGithub = url.indexOf('github.com') !== -1;
  return { isHttps, hasQuery, isGithub };
}`,
      solution: `function analyzeUrl(url) {
  const isHttps = url.startsWith('https://');
  const hasQuery = url.includes('?');
  const isGithub = url.includes('github.com');
  return { isHttps, hasQuery, isGithub };
}`,
      hints: [
        'indexOf === 0 can be replaced with startsWith.',
        'indexOf !== -1 can be replaced with includes.',
        'Use startsWith and includes for clarity.',
      ],
      concepts: ['String.startsWith', 'String.includes', 'String.indexOf', 'refactoring'],
    },
  ],
};
