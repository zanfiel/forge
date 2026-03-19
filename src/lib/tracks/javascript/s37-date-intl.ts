import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-date',
  title: '37. Date & Intl',
  explanation: `## Date & Intl

JavaScript's Date object handles timestamps, while the Intl namespace provides internationalization utilities.

\`\`\`javascript
// Date creation
const now = new Date();
const specific = new Date(2024, 0, 15); // Jan 15, 2024 (month is 0-indexed!)
const fromISO = new Date('2024-01-15T10:30:00Z');
const timestamp = Date.now(); // milliseconds since epoch

// Getters / Setters
now.getFullYear();   // 2024
now.getMonth();      // 0-11 (0 = January)
now.getDate();       // 1-31
now.getHours();      // 0-23
now.toISOString();   // '2024-01-15T10:30:00.000Z'

// Intl -- locale-aware formatting
new Intl.DateTimeFormat('en-US').format(now);      // '1/15/2024'
new Intl.NumberFormat('de-DE').format(1234567.89);  // '1.234.567,89'
new Intl.RelativeTimeFormat('en').format(-1, 'day'); // '1 day ago'
new Intl.ListFormat('en').format(['a', 'b', 'c']); // 'a, b, and c'
\`\`\`

Date month is 0-indexed (a classic gotcha). Intl provides locale-aware formatting without external libraries.`,
  exercises: [
    {
      id: 'js-date-1',
      title: 'Date constructor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to create dates in different ways.',
      skeleton: `const now = new __BLANK__();
const epoch = Date.__BLANK__();
const specific = new Date(__BLANK__, 0, 15); // Jan 15, 2024
const fromStr = new Date('2024-01-15T__BLANK__:00:00Z');`,
      solution: `const now = new Date();
const epoch = Date.now();
const specific = new Date(2024, 0, 15); // Jan 15, 2024
const fromStr = new Date('2024-01-15T10:00:00Z');`,
      hints: [
        'new Date() creates a Date for the current moment.',
        'Date.now() returns the current timestamp in milliseconds.',
        'Months are 0-indexed: January = 0.',
      ],
      concepts: ['Date constructor', 'Date.now', 'month indexing'],
    },
    {
      id: 'js-date-2',
      title: 'Date getters',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to extract date components.',
      skeleton: `const d = new Date('2024-06-15T14:30:00');
console.log(d.__BLANK__()); // 2024
console.log(d.__BLANK__()); // 5 (June, 0-indexed)
console.log(d.__BLANK__()); // 15
console.log(d.__BLANK__()); // 14`,
      solution: `const d = new Date('2024-06-15T14:30:00');
console.log(d.getFullYear()); // 2024
console.log(d.getMonth());    // 5 (June, 0-indexed)
console.log(d.getDate());     // 15
console.log(d.getHours());    // 14`,
      hints: [
        'getFullYear() returns the 4-digit year.',
        'getMonth() returns 0-11 (0 = Jan, 5 = June).',
        'getDate() returns the day of the month (1-31).',
      ],
      concepts: ['getFullYear', 'getMonth', 'getDate', 'getHours'],
    },
    {
      id: 'js-date-3',
      title: 'toISOString and toLocaleDateString',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to format dates.',
      skeleton: `const d = new Date('2024-03-15T10:30:00Z');
console.log(d.__BLANK__()); // '2024-03-15T10:30:00.000Z'
console.log(d.__BLANK__('en-US')); // '3/15/2024'`,
      solution: `const d = new Date('2024-03-15T10:30:00Z');
console.log(d.toISOString()); // '2024-03-15T10:30:00.000Z'
console.log(d.toLocaleDateString('en-US')); // '3/15/2024'`,
      hints: [
        'toISOString() returns the standard ISO 8601 format.',
        'toLocaleDateString(locale) formats for the given locale.',
        'en-US format: month/day/year.',
      ],
      concepts: ['toISOString', 'toLocaleDateString'],
    },
    {
      id: 'js-date-4',
      title: 'Intl.DateTimeFormat',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to use Intl.DateTimeFormat for locale-aware formatting.',
      skeleton: `const d = new Date('2024-12-25');
const fmt = new Intl.__BLANK__('en-US', {
  year: 'numeric',
  month: '__BLANK__',
  day: 'numeric',
});
console.log(fmt.__BLANK__(d)); // 'December 25, 2024'`,
      solution: `const d = new Date('2024-12-25');
const fmt = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
console.log(fmt.format(d)); // 'December 25, 2024'`,
      hints: [
        'Intl.DateTimeFormat provides locale-aware date formatting.',
        'month: "long" gives the full month name.',
        '.format(date) produces the formatted string.',
      ],
      concepts: ['Intl.DateTimeFormat', 'locale formatting'],
    },
    {
      id: 'js-date-5',
      title: 'Intl.NumberFormat',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to format numbers and currency.',
      skeleton: `const num = 1234567.89;
const numFmt = new Intl.__BLANK__('en-US');
console.log(numFmt.format(num)); // '1,234,567.89'

const curFmt = new Intl.NumberFormat('en-US', {
  style: '__BLANK__',
  currency: 'USD',
});
console.log(curFmt.__BLANK__(num)); // '$1,234,567.89'`,
      solution: `const num = 1234567.89;
const numFmt = new Intl.NumberFormat('en-US');
console.log(numFmt.format(num)); // '1,234,567.89'

const curFmt = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
console.log(curFmt.format(num)); // '$1,234,567.89'`,
      hints: [
        'Intl.NumberFormat formats numbers for a locale.',
        'style: "currency" formats as money.',
        'Specify the currency code (USD, EUR, GBP, etc.).',
      ],
      concepts: ['Intl.NumberFormat', 'currency formatting'],
    },
    {
      id: 'js-date-6',
      title: 'Predict Date month gotcha',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict the output of this date creation (watch for the month gotcha).',
      skeleton: `const d = new Date(2024, 1, 29);
console.log(d.getMonth());
console.log(d.getDate());
console.log(d.toLocaleDateString('en-US'));`,
      solution: `// Output:
// 1
// 29
// '2/29/2024'
// Month 1 = February (0-indexed).
// 2024 is a leap year, so Feb 29 is valid.
// If it weren't a leap year, it would roll over to March.`,
      hints: [
        'Month 1 is February (months are 0-indexed).',
        '2024 is a leap year (divisible by 4, not 100, or 400).',
        'Feb 29 is valid in a leap year.',
      ],
      concepts: ['month indexing', 'leap year'],
    },
    {
      id: 'js-date-7',
      title: 'Predict Intl.RelativeTimeFormat',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output of RelativeTimeFormat.',
      skeleton: `const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
console.log(rtf.format(-1, 'day'));
console.log(rtf.format(0, 'day'));
console.log(rtf.format(1, 'day'));
console.log(rtf.format(-3, 'hour'));`,
      solution: `// Output:
// 'yesterday'
// 'today'
// 'tomorrow'
// '3 hours ago'
// With numeric: 'auto', special names are used for -1, 0, 1.
// Other values use the standard "X units ago/in X units" format.`,
      hints: [
        'numeric: "auto" uses words like yesterday, today, tomorrow.',
        'Negative values mean past, positive mean future.',
        'Values other than -1, 0, 1 get standard formatting.',
      ],
      concepts: ['Intl.RelativeTimeFormat', 'numeric auto'],
    },
    {
      id: 'js-date-8',
      title: 'Predict Intl.ListFormat',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output of ListFormat with different styles.',
      skeleton: `const conj = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
const disj = new Intl.ListFormat('en', { style: 'long', type: 'disjunction' });

console.log(conj.format(['red', 'blue', 'green']));
console.log(disj.format(['red', 'blue', 'green']));
console.log(conj.format(['red']));`,
      solution: `// Output:
// 'red, blue, and green'
// 'red, blue, or green'
// 'red'
// Conjunction uses "and", disjunction uses "or".
// A single item is returned as-is.`,
      hints: [
        'Conjunction joins with "and", disjunction with "or".',
        'The Oxford comma is included in en locale.',
        'Single-item lists return just the item.',
      ],
      concepts: ['Intl.ListFormat', 'conjunction', 'disjunction'],
    },
    {
      id: 'js-date-9',
      title: 'Date arithmetic',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write functions to add days to a date and calculate the difference between two dates.',
      skeleton: `// addDays(date, n) -- returns a new Date that is n days later
// diffDays(a, b) -- returns the number of days between two dates
`,
      solution: `function addDays(date, n) {
  const result = new Date(date);
  result.setDate(result.getDate() + n);
  return result;
}

function diffDays(a, b) {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((b - a) / msPerDay);
}`,
      hints: [
        'Clone the date before modifying: new Date(date).',
        'setDate(getDate() + n) handles month overflow automatically.',
        'Subtract dates to get milliseconds, divide by ms per day.',
      ],
      concepts: ['date arithmetic', 'setDate', 'timestamp difference'],
    },
    {
      id: 'js-date-10',
      title: 'Intl.Collator for sorting',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that sorts strings using Intl.Collator for locale-aware comparison.',
      skeleton: `// localeSort(strings, locale) -- returns a new sorted array
// Should handle accented characters correctly
`,
      solution: `function localeSort(strings, locale = 'en') {
  const collator = new Intl.Collator(locale, { sensitivity: 'base' });
  return [...strings].sort(collator.compare);
}`,
      hints: [
        'Intl.Collator provides locale-aware string comparison.',
        'collator.compare can be passed directly to Array.sort.',
        'sensitivity: "base" ignores accents and case.',
      ],
      concepts: ['Intl.Collator', 'locale-aware sorting'],
    },
    {
      id: 'js-date-11',
      title: 'Intl.PluralRules',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that uses Intl.PluralRules to select the correct plural form.',
      skeleton: `// pluralize(count, forms) -- forms is { one: '...', other: '...' }
// Example: pluralize(1, { one: '1 item', other: '{n} items' })
`,
      solution: `function pluralize(count, forms) {
  const rules = new Intl.PluralRules('en');
  const category = rules.select(count);
  const template = forms[category] || forms.other;
  return template.replace('{n}', count);
}`,
      hints: [
        'Intl.PluralRules.select(n) returns "one", "two", "few", "many", or "other".',
        'English has two categories: "one" and "other".',
        'Map the category to the correct form string.',
      ],
      concepts: ['Intl.PluralRules', 'pluralization'],
    },
    {
      id: 'js-date-12',
      title: 'Intl.Segmenter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that uses Intl.Segmenter to split text into words.',
      skeleton: `// segmentWords(text, locale) -- returns an array of word strings
`,
      solution: `function segmentWords(text, locale = 'en') {
  const segmenter = new Intl.Segmenter(locale, { granularity: 'word' });
  const segments = segmenter.segment(text);
  return [...segments]
    .filter(s => s.isWordLike)
    .map(s => s.segment);
}`,
      hints: [
        'new Intl.Segmenter(locale, { granularity: "word" }) segments by words.',
        'segmenter.segment(text) returns an iterable of segments.',
        'Filter by isWordLike to skip whitespace and punctuation.',
      ],
      concepts: ['Intl.Segmenter', 'word segmentation'],
    },
    {
      id: 'js-date-13',
      title: 'Fix the month indexing bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code creates the wrong date because of month indexing. Fix it.',
      skeleton: `function createDate(year, month, day) {
  return new Date(year, month, day);
}

// Expected: March 15, 2024
const d = createDate(2024, 3, 15);
console.log(d.toLocaleDateString('en-US')); // '4/15/2024' -- wrong! Should be 3/15`,
      solution: `function createDate(year, month, day) {
  return new Date(year, month - 1, day);
}

// Now correct: March 15, 2024
const d = createDate(2024, 3, 15);
console.log(d.toLocaleDateString('en-US')); // '3/15/2024'`,
      hints: [
        'Date constructor months are 0-indexed (0 = Jan, 11 = Dec).',
        'Subtract 1 from the human-readable month.',
        'Month 3 in Date constructor is April, not March.',
      ],
      concepts: ['month indexing bug', '0-indexed months'],
    },
    {
      id: 'js-date-14',
      title: 'Fix the timezone display bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code shows the wrong time because it ignores timezones. Fix it.',
      skeleton: `function displayTime(isoString) {
  const d = new Date(isoString);
  return \`\${d.getHours()}:\${d.getMinutes().toString().padStart(2, '0')}\`;
}

// Server sends UTC time: '2024-03-15T14:30:00Z'
// User in EST sees '9:30' but code shows local getHours() which varies`,
      solution: `function displayTime(isoString, timeZone = 'UTC') {
  const d = new Date(isoString);
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone,
  });
}

// Now: displayTime('2024-03-15T14:30:00Z', 'America/New_York') => '10:30'
// displayTime('2024-03-15T14:30:00Z') => '14:30' (UTC)`,
      hints: [
        'getHours() returns local time, which varies by system timezone.',
        'Use Intl.DateTimeFormat or toLocaleTimeString with a timeZone option.',
        'Always specify the timezone explicitly for consistent results.',
      ],
      concepts: ['timezone handling', 'Intl.DateTimeFormat', 'timeZone option'],
    },
    {
      id: 'js-date-15',
      title: 'Fix the Date.parse reliability issue',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'This code uses Date.parse with an ambiguous format. Fix it.',
      skeleton: `function parseDate(dateStr) {
  // Bug: Date.parse('03/15/2024') behavior varies across browsers
  const timestamp = Date.parse(dateStr);
  return new Date(timestamp);
}

// Sometimes returns March 15, sometimes invalid`,
      solution: `function parseDate(dateStr) {
  const [month, day, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
}

// Or for ISO strings (always reliable):
// new Date('2024-03-15') -- ISO 8601 is the only safe format for Date.parse`,
      hints: [
        'Date.parse with non-ISO formats is implementation-dependent.',
        'Only ISO 8601 format (YYYY-MM-DD) is reliably parsed.',
        'Parse the components manually for locale-specific formats.',
      ],
      concepts: ['Date.parse reliability', 'manual parsing'],
    },
    {
      id: 'js-date-16',
      title: 'Time ago formatter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a timeAgo function using Intl.RelativeTimeFormat.',
      skeleton: `// timeAgo(date) -- returns "2 hours ago", "yesterday", etc.
`,
      solution: `function timeAgo(date) {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const now = Date.now();
  const diffMs = date.getTime() - now;
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHr = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHr / 24);
  const diffWeek = Math.round(diffDay / 7);
  const diffMonth = Math.round(diffDay / 30);
  const diffYear = Math.round(diffDay / 365);

  if (Math.abs(diffSec) < 60) return rtf.format(diffSec, 'second');
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, 'minute');
  if (Math.abs(diffHr) < 24) return rtf.format(diffHr, 'hour');
  if (Math.abs(diffDay) < 7) return rtf.format(diffDay, 'day');
  if (Math.abs(diffWeek) < 4) return rtf.format(diffWeek, 'week');
  if (Math.abs(diffMonth) < 12) return rtf.format(diffMonth, 'month');
  return rtf.format(diffYear, 'year');
}`,
      hints: [
        'Calculate the difference in various units (seconds, minutes, hours, days).',
        'Pick the most appropriate unit based on the magnitude.',
        'Intl.RelativeTimeFormat handles the "ago"/"in" and localization.',
      ],
      concepts: ['Intl.RelativeTimeFormat', 'time ago', 'unit selection'],
    },
    {
      id: 'js-date-17',
      title: 'Multi-locale formatter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function that formats a date for multiple locales simultaneously.',
      skeleton: `// formatMultiLocale(date, locales) -- returns { locale: formattedString }
// Example: formatMultiLocale(date, ['en-US', 'de-DE', 'ja-JP'])
`,
      solution: `function formatMultiLocale(date, locales) {
  const result = {};
  for (const locale of locales) {
    const fmt = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
    result[locale] = fmt.format(date);
  }
  return result;
}`,
      hints: [
        'Create a DateTimeFormat for each locale.',
        'Format the same date with each formatter.',
        'Return an object mapping locale to formatted string.',
      ],
      concepts: ['multi-locale', 'Intl.DateTimeFormat'],
    },
    {
      id: 'js-date-18',
      title: 'Calendar system formatting',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function that formats a date in different calendar systems using Intl.',
      skeleton: `// formatCalendar(date, calendar) -- formats in the given calendar system
// Calendars: 'gregory', 'islamic', 'hebrew', 'chinese', 'japanese'
`,
      solution: `function formatCalendar(date, calendar) {
  const fmt = new Intl.DateTimeFormat('en', {
    calendar,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    era: 'long',
  });
  return fmt.format(date);
}`,
      hints: [
        'Pass the calendar option to Intl.DateTimeFormat.',
        'Supported calendars include islamic, hebrew, chinese, japanese.',
        'Include era: "long" to show the era name for non-Gregorian calendars.',
      ],
      concepts: ['calendar systems', 'Intl.DateTimeFormat options'],
    },
    {
      id: 'js-date-19',
      title: 'Refactor date formatting to Intl',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this manual date formatting to use Intl.DateTimeFormat.',
      skeleton: `function formatDate(date) {
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  var day = days[date.getDay()];
  var month = months[date.getMonth()];
  var d = date.getDate();
  var year = date.getFullYear();
  var hours = date.getHours().toString().padStart(2, '0');
  var mins = date.getMinutes().toString().padStart(2, '0');

  return day + ', ' + month + ' ' + d + ', ' + year + ' at ' + hours + ':' + mins;
}`,
      solution: `function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}`,
      hints: [
        'Intl.DateTimeFormat handles all locale-specific formatting.',
        'Options: weekday, month, day, year, hour, minute.',
        'No manual month/day name arrays needed.',
      ],
      concepts: ['Intl.DateTimeFormat', 'refactoring'],
    },
    {
      id: 'js-date-20',
      title: 'Refactor number formatting to Intl',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this manual number formatting to use Intl.NumberFormat.',
      skeleton: `function formatCurrency(amount) {
  var sign = amount < 0 ? '-' : '';
  var abs = Math.abs(amount).toFixed(2);
  var parts = abs.split('.');
  var whole = parts[0].replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');
  return sign + '$' + whole + '.' + parts[1];
}

function formatPercent(value) {
  return (value * 100).toFixed(1) + '%';
}

function formatCompact(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}`,
      solution: `function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

function formatPercent(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 1,
  }).format(value);
}

function formatCompact(num) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num);
}`,
      hints: [
        'style: "currency" handles the dollar sign and grouping.',
        'style: "percent" multiplies by 100 and adds %.',
        'notation: "compact" produces K, M, B suffixes.',
      ],
      concepts: ['Intl.NumberFormat', 'currency', 'percent', 'compact notation'],
    },
  ],
};
