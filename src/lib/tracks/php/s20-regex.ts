import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-regex',
  title: '20. Regular Expressions',
  explanation: `## Regular Expressions in PHP

PHP provides powerful PCRE (Perl-Compatible Regular Expressions) functions for pattern matching, replacing, and splitting strings.

### preg_match
\`\`\`php
<?php
\$result = preg_match('/^\\d{3}-\\d{4}\$/', '555-1234');
echo \$result; // 1 (match found)

// Capture groups
preg_match('/^(\\w+)@(\\w+\\.\\w+)\$/', 'user@example.com', \$matches);
echo \$matches[1]; // "user"
echo \$matches[2]; // "example.com"
\`\`\`

### preg_match_all
\`\`\`php
<?php
preg_match_all('/\\d+/', 'I have 3 cats and 5 dogs', \$matches);
print_r(\$matches[0]); // ["3", "5"]
\`\`\`

### preg_replace
\`\`\`php
<?php
\$result = preg_replace('/\\s+/', ' ', 'too   many   spaces');
echo \$result; // "too many spaces"
\`\`\`

### preg_split
\`\`\`php
<?php
\$parts = preg_split('/[,;]\\s*/', 'a, b; c, d');
print_r(\$parts); // ["a", "b", "c", "d"]
\`\`\`

### Named Groups
\`\`\`php
<?php
preg_match('/(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})/', '2024-03-15', \$m);
echo \$m['year'];  // "2024"
echo \$m['month']; // "03"
\`\`\`

### Lookahead and Lookbehind
\`\`\`php
<?php
// Positive lookahead: match digits followed by "px"
preg_match_all('/\\d+(?=px)/', '12px 5em 20px', \$m);
// \$m[0] = ["12", "20"]

// Positive lookbehind: match digits preceded by "\\$"
preg_match_all('/(?<=\\\\\\$)\\d+/', 'Price: \\$50 and \\$30', \$m);
// \$m[0] = ["50", "30"]
\`\`\``,
  exercises: [
    {
      id: 'php-regex-1',
      title: 'Basic preg_match',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to check if a string contains only digits.',
      skeleton: `<?php
\$isDigits = ___(___('/^\\d+\$/', '12345'));
echo \$isDigits ? 'yes' : 'no';`,
      solution: `<?php
\$isDigits = preg_match('/^\\d+\$/', '12345');
echo \$isDigits ? 'yes' : 'no';`,
      hints: [
        'Use preg_match() to test a pattern against a string.',
        '\\d+ matches one or more digits.',
        'Anchors ^ and $ ensure the entire string matches.',
      ],
      concepts: ['preg_match', 'digit-pattern', 'anchors'],
    },
    {
      id: 'php-regex-2',
      title: 'Capture Groups',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to extract the domain from an email address.',
      skeleton: `<?php
preg_match('/^\\w+@(\\w+\\.\\w+)\$/', 'user@example.com', ___);
echo \$matches[1];`,
      solution: `<?php
preg_match('/^\\w+@(\\w+\\.\\w+)\$/', 'user@example.com', \$matches);
echo \$matches[1];`,
      hints: [
        'preg_match stores captures in the third argument.',
        'Pass a variable like $matches as the third parameter.',
        '$matches[1] contains the first capture group.',
      ],
      concepts: ['capture-group', 'preg_match', 'matches-array'],
    },
    {
      id: 'php-regex-3',
      title: 'preg_replace Whitespace',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blanks to collapse multiple spaces into one.',
      skeleton: `<?php
\$result = ___('/\\s+/', ' ', 'too   many   spaces');
echo \$result;`,
      solution: `<?php
\$result = preg_replace('/\\s+/', ' ', 'too   many   spaces');
echo \$result;`,
      hints: [
        'Use preg_replace() for pattern-based replacement.',
        '\\s+ matches one or more whitespace characters.',
        'Replace the match with a single space.',
      ],
      concepts: ['preg_replace', 'whitespace', 'collapse'],
    },
    {
      id: 'php-regex-4',
      title: 'preg_split on Delimiters',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to split a string on commas or semicolons.',
      skeleton: `<?php
\$parts = ___('/[,;]\\s*/', 'a, b; c, d');
echo count(\$parts);`,
      solution: `<?php
\$parts = preg_split('/[,;]\\s*/', 'a, b; c, d');
echo count(\$parts);`,
      hints: [
        'Use preg_split() to split with a regex pattern.',
        '[,;] is a character class matching comma or semicolon.',
        '\\s* matches optional trailing whitespace.',
      ],
      concepts: ['preg_split', 'character-class', 'delimiter'],
    },
    {
      id: 'php-regex-5',
      title: 'Named Capture Group',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to use a named capture group for the year.',
      skeleton: `<?php
preg_match('/___\\d{4})-(\\d{2})-(\\d{2})/', '2024-03-15', \$m);
echo \$m['year'];`,
      solution: `<?php
preg_match('/(?P<year>\\d{4})-(\\d{2})-(\\d{2})/', '2024-03-15', \$m);
echo \$m['year'];`,
      hints: [
        'Named groups use (?P<name>...) syntax.',
        'The result is accessible by name in the matches array.',
        '(?P<year>\\d{4}) names the group "year".',
      ],
      concepts: ['named-group', 'P-syntax', 'labeled-capture'],
    },
    {
      id: 'php-regex-6',
      title: 'Positive Lookahead',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Fill in the blank to match numbers only if followed by "px".',
      skeleton: `<?php
preg_match_all('/\\d+___/', '12px 5em 20px', \$m);
echo implode(',', \$m[0]);`,
      solution: `<?php
preg_match_all('/\\d+(?=px)/', '12px 5em 20px', \$m);
echo implode(',', \$m[0]);`,
      hints: [
        'Lookahead is written as (?=...).',
        'It asserts what follows without consuming it.',
        '(?=px) matches if "px" follows the digits.',
      ],
      concepts: ['lookahead', 'zero-width-assertion', 'preg_match_all'],
    },
    {
      id: 'php-regex-7',
      title: 'Write Email Validator',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Write a function isEmail(string $str): bool that returns true if the string looks like a basic email (word@word.word).',
      skeleton: `<?php
// Write the isEmail function`,
      solution: `<?php
function isEmail(string \$str): bool {
    return (bool) preg_match('/^\\w+@\\w+\\.\\w+\$/', \$str);
}`,
      hints: [
        'Use preg_match with anchors ^ and $.',
        '\\w+ matches word characters (letters, digits, underscore).',
        'Cast the result to bool or use === 1.',
      ],
      concepts: ['validation', 'preg_match', 'email-pattern'],
    },
    {
      id: 'php-regex-8',
      title: 'Write Slug Generator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function slugify(string $text): string that converts a title to a URL slug. Lowercase, replace non-alphanumeric with hyphens, trim hyphens, collapse multiple hyphens.',
      skeleton: `<?php
// Write the slugify function`,
      solution: `<?php
function slugify(string \$text): string {
    \$text = strtolower(\$text);
    \$text = preg_replace('/[^a-z0-9]+/', '-', \$text);
    return trim(\$text, '-');
}`,
      hints: [
        'First convert to lowercase with strtolower().',
        'Replace non-alphanumeric sequences with a single hyphen.',
        'Trim leading/trailing hyphens with trim($text, "-").',
      ],
      concepts: ['preg_replace', 'slugify', 'character-class'],
    },
    {
      id: 'php-regex-9',
      title: 'Write Word Counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function countWords(string $text): int that uses preg_split to count words separated by whitespace.',
      skeleton: `<?php
// Write the countWords function`,
      solution: `<?php
function countWords(string \$text): int {
    \$text = trim(\$text);
    if (\$text === '') {
        return 0;
    }
    \$words = preg_split('/\\s+/', \$text);
    return count(\$words);
}`,
      hints: [
        'Trim the input first to remove leading/trailing whitespace.',
        'Handle the empty string edge case.',
        'Use preg_split with \\s+ to split on whitespace.',
      ],
      concepts: ['preg_split', 'word-counting', 'edge-cases'],
    },
    {
      id: 'php-regex-10',
      title: 'Write HTML Tag Stripper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function stripTags(string $html): string that removes all HTML tags using preg_replace.',
      skeleton: `<?php
// Write the stripTags function`,
      solution: `<?php
function stripTags(string \$html): string {
    return preg_replace('/<[^>]*>/', '', \$html);
}`,
      hints: [
        'Match < followed by any non-> characters, then >.',
        'Replace all matches with an empty string.',
        'The pattern is /<[^>]*>/.',
      ],
      concepts: ['preg_replace', 'html-strip', 'negated-class'],
    },
    {
      id: 'php-regex-11',
      title: 'Write Date Extractor',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function extractDates(string $text): array that finds all dates in YYYY-MM-DD format within a text string.',
      skeleton: `<?php
// Write the extractDates function`,
      solution: `<?php
function extractDates(string \$text): array {
    preg_match_all('/\\d{4}-\\d{2}-\\d{2}/', \$text, \$matches);
    return \$matches[0];
}`,
      hints: [
        'Use preg_match_all to find all occurrences.',
        '\\d{4}-\\d{2}-\\d{2} matches YYYY-MM-DD format.',
        '$matches[0] contains all full matches.',
      ],
      concepts: ['preg_match_all', 'date-pattern', 'quantifiers'],
    },
    {
      id: 'php-regex-12',
      title: 'Write Password Strength Checker',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function isStrongPassword(string $pw): bool that returns true if the password has 8+ chars, at least one uppercase, one lowercase, one digit, and one special character.',
      skeleton: `<?php
// Write the isStrongPassword function`,
      solution: `<?php
function isStrongPassword(string \$pw): bool {
    if (strlen(\$pw) < 8) return false;
    if (!preg_match('/[A-Z]/', \$pw)) return false;
    if (!preg_match('/[a-z]/', \$pw)) return false;
    if (!preg_match('/\\d/', \$pw)) return false;
    if (!preg_match('/[^a-zA-Z\\d]/', \$pw)) return false;
    return true;
}`,
      hints: [
        'Check length first, then each character class.',
        'Use separate preg_match calls for each requirement.',
        '[^a-zA-Z\\d] matches special characters.',
      ],
      concepts: ['validation', 'multiple-checks', 'character-classes'],
    },
    {
      id: 'php-regex-13',
      title: 'Fix Unescaped Dot',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the regex that should match a literal dot but matches any character.',
      skeleton: `<?php
\$pattern = '/\\d+.\\d+/';
echo preg_match(\$pattern, '3x5') ? 'match' : 'no match';
// Should output "no match" but outputs "match"`,
      solution: `<?php
\$pattern = '/\\d+\\.\\d+/';
echo preg_match(\$pattern, '3x5') ? 'match' : 'no match';`,
      hints: [
        'An unescaped dot matches any character.',
        'Escape the dot with a backslash to match a literal period.',
        'Change . to \\. in the pattern.',
      ],
      concepts: ['escape-dot', 'literal-match', 'metacharacter'],
    },
    {
      id: 'php-regex-14',
      title: 'Fix Greedy Match',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the regex that greedily matches too much HTML content.',
      skeleton: `<?php
\$html = '<b>bold</b> and <i>italic</i>';
preg_match('/<.*>/', \$html, \$m);
echo \$m[0];
// Should output "<b>" but outputs "<b>bold</b> and <i>italic</i>"`,
      solution: `<?php
\$html = '<b>bold</b> and <i>italic</i>';
preg_match('/<.*?>/', \$html, \$m);
echo \$m[0];`,
      hints: [
        'The * quantifier is greedy by default.',
        'Add ? after * to make it lazy (non-greedy).',
        '.*? matches as few characters as possible.',
      ],
      concepts: ['greedy-vs-lazy', 'quantifiers', 'non-greedy'],
    },
    {
      id: 'php-regex-15',
      title: 'Fix Missing Delimiter',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the regex that is missing its delimiters.',
      skeleton: `<?php
\$result = preg_match('^\\d+\$', '123');
echo \$result ? 'digits' : 'not digits';`,
      solution: `<?php
\$result = preg_match('/^\\d+\$/', '123');
echo \$result ? 'digits' : 'not digits';`,
      hints: [
        'PCRE patterns in PHP must be wrapped in delimiters.',
        'The most common delimiter is forward slash /.',
        'Add / at the beginning and end of the pattern.',
      ],
      concepts: ['delimiters', 'PCRE', 'syntax-error'],
    },
    {
      id: 'php-regex-16',
      title: 'Predict preg_match_all Count',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict how many matches are found.',
      skeleton: `<?php
\$count = preg_match_all('/\\d+/', 'I have 3 cats, 12 dogs, and 1 fish');
echo \$count;`,
      solution: `3`,
      hints: [
        '\\d+ matches sequences of one or more digits.',
        'The string contains 3, 12, and 1.',
        'preg_match_all returns the total number of matches.',
      ],
      concepts: ['preg_match_all', 'counting-matches', 'digit-pattern'],
    },
    {
      id: 'php-regex-17',
      title: 'Predict preg_replace Result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the output after regex replacement.',
      skeleton: `<?php
\$result = preg_replace('/[aeiou]/', '*', 'Hello World');
echo \$result;`,
      solution: `H*ll* W*rld`,
      hints: [
        '[aeiou] matches lowercase vowels.',
        'Each vowel is replaced with *.',
        'H, l, l, W, r, l, d are consonants and stay unchanged.',
      ],
      concepts: ['preg_replace', 'character-class', 'vowel-replacement'],
    },
    {
      id: 'php-regex-18',
      title: 'Predict preg_split Result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the number of parts after splitting.',
      skeleton: `<?php
\$parts = preg_split('/\\s*,\\s*/', 'one , two ,three, four');
echo count(\$parts) . ' ' . \$parts[2];`,
      solution: `4 three`,
      hints: [
        '\\s*,\\s* matches a comma with optional surrounding spaces.',
        'The string has 4 comma-separated values.',
        '$parts[2] is the third element (zero-indexed).',
      ],
      concepts: ['preg_split', 'count', 'comma-separated'],
    },
    {
      id: 'php-regex-19',
      title: 'Refactor str_replace to Regex',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the multiple str_replace calls into a single preg_replace that removes all punctuation.',
      skeleton: `<?php
\$text = 'Hello, World! How are you?';
\$text = str_replace(',', '', \$text);
\$text = str_replace('!', '', \$text);
\$text = str_replace('?', '', \$text);
echo \$text;`,
      solution: `<?php
\$text = 'Hello, World! How are you?';
\$text = preg_replace('/[,!?]/', '', \$text);
echo \$text;`,
      hints: [
        'Use a character class to match all punctuation at once.',
        'preg_replace with [,!?] matches any of those characters.',
        'A single regex call replaces three str_replace calls.',
      ],
      concepts: ['refactor', 'preg_replace', 'character-class'],
    },
    {
      id: 'php-regex-20',
      title: 'Refactor Manual Parsing to Regex',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the manual string parsing into a single preg_match with named groups.',
      skeleton: `<?php
\$url = 'https://example.com:8080/path';
\$protocol = substr(\$url, 0, strpos(\$url, '://'));
\$rest = substr(\$url, strpos(\$url, '://') + 3);
\$host = substr(\$rest, 0, strpos(\$rest, ':'));
\$portPath = substr(\$rest, strpos(\$rest, ':') + 1);
\$port = substr(\$portPath, 0, strpos(\$portPath, '/'));
echo "\$protocol \$host \$port";`,
      solution: `<?php
\$url = 'https://example.com:8080/path';
preg_match('/(?P<protocol>\\w+):\\/\\/(?P<host>[\\w.]+):(?P<port>\\d+)/', \$url, \$m);
echo \$m['protocol'] . ' ' . \$m['host'] . ' ' . \$m['port'];`,
      hints: [
        'Use named groups (?P<name>...) for each part.',
        'Match protocol, ://, host, :, and port in one pattern.',
        'Named groups make the code much more readable.',
      ],
      concepts: ['named-groups', 'url-parsing', 'readability'],
    },
  ],
};
