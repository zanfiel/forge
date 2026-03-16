import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-regex',
  title: '25. Regular Expressions',
  explanation: `## Regular Expressions

Regular expressions (regex) are patterns for matching text. JavaScript supports them natively via \`/pattern/flags\` literals and the \`RegExp\` constructor.

### Creation
\`\`\`js
const re1 = /hello/i;                // literal
const re2 = new RegExp('hello', 'i'); // constructor
\`\`\`

### Flags
- \`g\` -- global (find all matches)
- \`i\` -- case-insensitive
- \`m\` -- multiline (\`^\`/\`$\` match line boundaries)
- \`s\` -- dotAll (\`.\` matches newlines)
- \`u\` -- unicode
- \`d\` -- indices (match positions)
- \`v\` -- unicodeSets (ES2024, superset of \`u\`)

### Methods
- \`regex.test(str)\` -- returns boolean
- \`regex.exec(str)\` -- returns match array or null
- \`str.match(regex)\` -- returns matches
- \`str.matchAll(regex)\` -- returns iterator of all matches (requires \`g\`)
- \`str.replace(regex, replacement)\` -- replace matches
- \`str.search(regex)\` -- returns first match index

### Character Classes
- \`\\d\` digit, \`\\w\` word char, \`\\s\` whitespace
- \`\\D\`, \`\\W\`, \`\\S\` -- negated versions
- \`[abc]\` -- character set, \`[^abc]\` -- negated set
- \`.\` -- any character (except newline without \`s\` flag)

### Quantifiers
- \`*\` 0+, \`+\` 1+, \`?\` 0 or 1
- \`{n}\` exactly n, \`{n,m}\` n to m
- Add \`?\` for non-greedy: \`*?\`, \`+?\`

### Groups & Assertions
- \`(group)\` -- capturing group
- \`(?:group)\` -- non-capturing
- \`(?<name>group)\` -- named group
- \`(?=...)\` lookahead, \`(?!...)\` negative lookahead
- \`(?<=...)\` lookbehind, \`(?<!...)\` negative lookbehind
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'js-rx-1b',
      title: 'Test for a match',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Use the regex method that returns a boolean.',
      skeleton: `const re = /hello/i;
console.log(re.__BLANK__('Hello World')); // true`,
      solution: `const re = /hello/i;
console.log(re.test('Hello World')); // true`,
      hints: [
        'This RegExp method checks if a string matches.',
        'It returns true or false.',
        'The method is `test`.',
      ],
      concepts: ['test', 'RegExp'],
    },
    {
      id: 'js-rx-2b',
      title: 'Match digits',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the character class that matches any digit.',
      skeleton: `const re = /__BLANK__+/g;
console.log('abc123def456'.match(re)); // ['123', '456']`,
      solution: `const re = /\\d+/g;
console.log('abc123def456'.match(re)); // ['123', '456']`,
      hints: [
        'There is a shorthand for matching digit characters.',
        'It matches 0-9.',
        'The shorthand is `\\d`.',
      ],
      concepts: ['\\d', 'character class', 'match'],
    },
    {
      id: 'js-rx-3b',
      title: 'Global flag',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Add the flag that finds all matches, not just the first.',
      skeleton: `const re = /cat/__BLANK__;
const str = 'cat sat on a cat mat with a cat';
console.log(str.match(re).length); // 3`,
      solution: `const re = /cat/g;
const str = 'cat sat on a cat mat with a cat';
console.log(str.match(re).length); // 3`,
      hints: [
        'Without this flag, match() returns only the first result.',
        'The flag makes the regex search for all occurrences.',
        'The flag is `g`.',
      ],
      concepts: ['global flag', 'match'],
    },
    {
      id: 'js-rx-4i',
      title: 'Named capturing group',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Create a named capturing group for the year.',
      skeleton: `const re = /(?<__BLANK__>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;
const match = re.exec('2024-03-15');
console.log(match.groups.year); // '2024'`,
      solution: `const re = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;
const match = re.exec('2024-03-15');
console.log(match.groups.year); // '2024'`,
      hints: [
        'Named groups use the syntax (?<name>pattern).',
        'The name goes between the angle brackets.',
        'The name should be `year`.',
      ],
      concepts: ['named group', 'exec', 'groups'],
    },
    {
      id: 'js-rx-5i',
      title: 'Non-greedy quantifier',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Make the quantifier non-greedy to match the shortest string.',
      skeleton: `const re = /<.+__BLANK__>/g;
const html = '<b>bold</b> and <i>italic</i>';
console.log(html.match(re)); // ['<b>', '</b>', '<i>', '</i>']`,
      solution: `const re = /<.+?>/g;
const html = '<b>bold</b> and <i>italic</i>';
console.log(html.match(re)); // ['<b>', '</b>', '<i>', '</i>']`,
      hints: [
        'By default, + is greedy and matches as much as possible.',
        'You need to make it match as little as possible.',
        'Add `?` after the quantifier.',
      ],
      concepts: ['non-greedy', 'lazy quantifier', 'match'],
    },
    {
      id: 'js-rx-6a',
      title: 'Positive lookahead',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Match a word only if followed by a specific pattern.',
      skeleton: `// Match 'cat' only if followed by 's'
const re = /cat(?__BLANK__s)/g;
const str = 'cats and cat and catfish';
console.log(str.match(re)); // ['cat'] (only from 'cats')`,
      solution: `// Match 'cat' only if followed by 's'
const re = /cat(?=s)/g;
const str = 'cats and cat and catfish';
console.log(str.match(re)); // ['cat'] (only from 'cats')`,
      hints: [
        'A lookahead asserts what follows without consuming it.',
        'Positive lookahead checks that the pattern IS present.',
        'The syntax starts with `=`.',
      ],
      concepts: ['lookahead', 'assertion', 'zero-width'],
    },

    // ---- write-function (6) ----
    {
      id: 'js-rx-7b',
      title: 'Email validator',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a basic email validation function using regex.',
      skeleton: `// Write function isEmail(str) that returns true if str looks like an email.
// Simple check: one or more word chars, @, one or more word chars, dot, 2-4 letters.
// Don't worry about covering all edge cases.
`,
      solution: `function isEmail(str) {
  return /^\\w+@\\w+\\.[a-zA-Z]{2,4}$/.test(str);
}`,
      hints: [
        'Use ^ and $ to match the entire string.',
        'The pattern is: word chars, @, word chars, dot, letters.',
        '\\w matches word characters, {2,4} for the TLD length.',
      ],
      concepts: ['test', 'regex', 'validation'],
    },
    {
      id: 'js-rx-8b',
      title: 'Extract numbers',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Extract all numbers from a string.',
      skeleton: `// Write function extractNumbers(str) that returns an array of numbers.
// Example: extractNumbers('I have 2 cats and 3 dogs') => [2, 3]
`,
      solution: `function extractNumbers(str) {
  const matches = str.match(/\\d+/g);
  return matches ? matches.map(Number) : [];
}`,
      hints: [
        'Use match with the global flag to find all occurrences.',
        '\\d+ matches one or more digits.',
        'Convert the string matches to numbers with map(Number).',
      ],
      concepts: ['match', '\\d', 'global flag', 'map'],
    },
    {
      id: 'js-rx-9i',
      title: 'Template variable replacer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Replace template variables like {{name}} with values from an object.',
      skeleton: `// Write function template(str, vars) that replaces {{key}} with vars[key].
// Example: template('Hello {{name}}!', { name: 'World' }) => 'Hello World!'
`,
      solution: `function template(str, vars) {
  return str.replace(/\\{\\{(\\w+)\\}\\}/g, (match, key) => {
    return key in vars ? vars[key] : match;
  });
}`,
      hints: [
        'Use replace with a regex that matches {{word}}.',
        'The callback receives the full match and the captured group.',
        'Look up the key in the vars object.',
      ],
      concepts: ['replace', 'capturing group', 'template'],
    },
    {
      id: 'js-rx-10i',
      title: 'Password strength checker',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Check if a password meets complexity requirements using regex.',
      skeleton: `// Write function isStrongPassword(str) returning true if:
// - At least 8 characters
// - Contains at least one uppercase letter
// - Contains at least one lowercase letter
// - Contains at least one digit
// - Contains at least one special character (!@#$%^&*)
`,
      solution: `function isStrongPassword(str) {
  if (str.length < 8) return false;
  if (!/[A-Z]/.test(str)) return false;
  if (!/[a-z]/.test(str)) return false;
  if (!/\\d/.test(str)) return false;
  if (!/[!@#$%^&*]/.test(str)) return false;
  return true;
}`,
      hints: [
        'Check each requirement separately with test().',
        'Use character classes like [A-Z] and [a-z].',
        'Return false as soon as any check fails.',
      ],
      concepts: ['test', 'character class', 'validation'],
    },
    {
      id: 'js-rx-11a',
      title: 'Markdown link parser',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Parse all markdown links from text using matchAll.',
      skeleton: `// Write function parseLinks(markdown) that returns array of { text, url }.
// Markdown links: [text](url)
// Example: parseLinks('Visit [Google](https://google.com) and [GitHub](https://github.com)')
// => [{ text: 'Google', url: 'https://google.com' }, { text: 'GitHub', url: 'https://github.com' }]
`,
      solution: `function parseLinks(markdown) {
  const re = /\\[([^\\]]+)\\]\\(([^)]+)\\)/g;
  const results = [];
  for (const match of markdown.matchAll(re)) {
    results.push({ text: match[1], url: match[2] });
  }
  return results;
}`,
      hints: [
        'Match [text](url) with capturing groups for text and url.',
        'Use matchAll with the global flag for all matches.',
        'match[1] is the first group, match[2] is the second.',
      ],
      concepts: ['matchAll', 'capturing group', 'regex', 'parsing'],
    },
    {
      id: 'js-rx-12a',
      title: 'Regex-based tokenizer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Build a simple tokenizer using regex.',
      skeleton: `// Write function tokenize(expression) that splits a math expression into tokens.
// Token types: 'number', 'operator', 'paren'
// Example: tokenize('(12 + 34) * 5')
// => [
//   { type: 'paren', value: '(' },
//   { type: 'number', value: '12' },
//   { type: 'operator', value: '+' },
//   { type: 'number', value: '34' },
//   { type: 'paren', value: ')' },
//   { type: 'operator', value: '*' },
//   { type: 'number', value: '5' },
// ]
`,
      solution: `function tokenize(expression) {
  const re = /\\d+|[+\\-*/]|[()]/g;
  const tokens = [];
  for (const match of expression.matchAll(re)) {
    const value = match[0];
    let type;
    if (/^\\d+$/.test(value)) {
      type = 'number';
    } else if (/^[+\\-*/]$/.test(value)) {
      type = 'operator';
    } else {
      type = 'paren';
    }
    tokens.push({ type, value });
  }
  return tokens;
}`,
      hints: [
        'Use matchAll with a regex that matches numbers, operators, or parens.',
        'Use alternation (|) to match different token types.',
        'Classify each match by testing it against sub-patterns.',
      ],
      concepts: ['matchAll', 'alternation', 'tokenizer', 'regex'],
    },

    // ---- fix-bug (3) ----
    {
      id: 'js-rx-13b',
      title: 'Missing global flag',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fix the replace that only replaces the first occurrence.',
      skeleton: `function censorWord(text, word) {
  const re = new RegExp(word, 'i');
  return text.replace(re, '***');
}

console.log(censorWord('Bad bad BAD', 'bad'));
// 'Cbad bad BAD' -- only first replaced!`,
      solution: `function censorWord(text, word) {
  const re = new RegExp(word, 'gi');
  return text.replace(re, '***');
}

console.log(censorWord('Bad bad BAD', 'bad'));
// '*** *** ***'`,
      hints: [
        'Without the global flag, replace only affects the first match.',
        'Add "g" to the flags to replace all occurrences.',
        'The flags should be "gi" for global and case-insensitive.',
      ],
      concepts: ['global flag', 'replace', 'RegExp constructor'],
    },
    {
      id: 'js-rx-14i',
      title: 'Stateful regex lastIndex',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fix the regex that fails on the second test call.',
      skeleton: `const re = /\\d+/g;

function hasNumber(str) {
  return re.test(str);
}

console.log(hasNumber('abc123')); // true
console.log(hasNumber('abc123')); // false -- Bug!
console.log(hasNumber('abc123')); // true  -- alternates!`,
      solution: `function hasNumber(str) {
  return /\\d+/.test(str);
}

console.log(hasNumber('abc123')); // true
console.log(hasNumber('abc123')); // true
console.log(hasNumber('abc123')); // true`,
      hints: [
        'Regex with the global flag maintains a lastIndex state.',
        'test() advances lastIndex on each call.',
        'Either remove the g flag or create a new regex each time.',
      ],
      concepts: ['lastIndex', 'global flag', 'stateful regex'],
    },
    {
      id: 'js-rx-15a',
      title: 'Unescaped special characters',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Fix the regex that fails when the search term contains special characters.',
      skeleton: `function findExact(text, searchTerm) {
  const re = new RegExp(searchTerm, 'g');
  return text.match(re) || [];
}

// Bug: breaks when searchTerm has regex special chars
console.log(findExact('price is $5.00', '$5.00'));
// Matches wrong things because $ and . are special`,
      solution: `function escapeRegex(str) {
  return str.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&');
}

function findExact(text, searchTerm) {
  const re = new RegExp(escapeRegex(searchTerm), 'g');
  return text.match(re) || [];
}

console.log(findExact('price is $5.00', '$5.00'));`,
      hints: [
        'Characters like $, ., *, + have special meaning in regex.',
        'User input must be escaped before using in a RegExp.',
        'Write an escape function that prefixes special chars with backslash.',
      ],
      concepts: ['RegExp', 'escape', 'special characters', 'security'],
    },

    // ---- predict-output (3) ----
    {
      id: 'js-rx-16b',
      title: 'match with and without g',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict the difference between match with and without the global flag.',
      skeleton: `const str = 'cat bat hat';
const a = str.match(/[cbh]at/);
const b = str.match(/[cbh]at/g);

console.log(a[0]);
console.log(a.index);
console.log(b.length);`,
      solution: `const str = 'cat bat hat';
const a = str.match(/[cbh]at/);
const b = str.match(/[cbh]at/g);

console.log(a[0]);
console.log(a.index);
console.log(b.length);`,
      expectedOutput: `cat
0
3`,
      hints: [
        'Without g, match returns the first match with index info.',
        'With g, match returns an array of all matches.',
        'a[0] is "cat", a.index is 0, b has 3 matches.',
      ],
      concepts: ['match', 'global flag', 'index'],
    },
    {
      id: 'js-rx-17i',
      title: 'Capturing groups in replace',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the result of replace with backreferences.',
      skeleton: `const date = '2024-03-15';
const result = date.replace(/(\\d{4})-(\\d{2})-(\\d{2})/, '$3/$2/$1');
console.log(result);`,
      solution: `const date = '2024-03-15';
const result = date.replace(/(\\d{4})-(\\d{2})-(\\d{2})/, '$3/$2/$1');
console.log(result);`,
      expectedOutput: `15/03/2024`,
      hints: [
        '$1, $2, $3 refer to captured groups.',
        '$1 is the year, $2 is the month, $3 is the day.',
        'The replacement reorders to day/month/year.',
      ],
      concepts: ['replace', 'backreference', 'capturing group'],
    },
    {
      id: 'js-rx-18a',
      title: 'Greedy vs lazy',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Predict the difference between greedy and lazy matching.',
      skeleton: `const str = '<div>hello</div><div>world</div>';
const greedy = str.match(/<div>.*<\\/div>/);
const lazy = str.match(/<div>.*?<\\/div>/);

console.log(greedy[0].length);
console.log(lazy[0].length);`,
      solution: `const str = '<div>hello</div><div>world</div>';
const greedy = str.match(/<div>.*<\\/div>/);
const lazy = str.match(/<div>.*?<\\/div>/);

console.log(greedy[0].length);
console.log(lazy[0].length);`,
      expectedOutput: `37
16`,
      hints: [
        'Greedy .* matches as much as possible.',
        'Lazy .*? matches as little as possible.',
        'Greedy matches the entire string, lazy matches just the first div.',
      ],
      concepts: ['greedy', 'lazy', 'quantifier'],
    },

    // ---- refactor (2) ----
    {
      id: 'js-rx-19i',
      title: 'Multiple indexOf to regex',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Replace multiple indexOf checks with a single regex.',
      skeleton: `function containsVowel(str) {
  const lower = str.toLowerCase();
  return lower.indexOf('a') !== -1 ||
    lower.indexOf('e') !== -1 ||
    lower.indexOf('i') !== -1 ||
    lower.indexOf('o') !== -1 ||
    lower.indexOf('u') !== -1;
}`,
      solution: `function containsVowel(str) {
  return /[aeiou]/i.test(str);
}`,
      hints: [
        'A character class [aeiou] matches any vowel.',
        'The i flag makes it case-insensitive.',
        'A single test() replaces all the indexOf checks.',
      ],
      concepts: ['character class', 'test', 'refactor'],
    },
    {
      id: 'js-rx-20a',
      title: 'Manual parsing to regex groups',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Replace manual string splitting with a single regex using named groups.',
      skeleton: `function parseUrl(url) {
  let protocol = '';
  let host = '';
  let path = '';

  const protoEnd = url.indexOf('://');
  if (protoEnd !== -1) {
    protocol = url.substring(0, protoEnd);
    url = url.substring(protoEnd + 3);
  }

  const pathStart = url.indexOf('/');
  if (pathStart !== -1) {
    host = url.substring(0, pathStart);
    path = url.substring(pathStart);
  } else {
    host = url;
    path = '/';
  }

  return { protocol, host, path };
}`,
      solution: `function parseUrl(url) {
  const re = /^(?<protocol>[a-z]+):\\/\\/(?<host>[^/]+)(?<path>\\/.*)?$/;
  const match = url.match(re);
  if (!match) return { protocol: '', host: '', path: '/' };
  return {
    protocol: match.groups.protocol,
    host: match.groups.host,
    path: match.groups.path || '/',
  };
}`,
      hints: [
        'Use named groups to capture protocol, host, and path.',
        'Protocol: letters before ://, host: chars until /, path: rest.',
        'Named groups provide clear, self-documenting access.',
      ],
      concepts: ['named group', 'regex', 'URL parsing', 'refactor'],
    },
  ],
};
