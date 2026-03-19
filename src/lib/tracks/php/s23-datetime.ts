import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'php-datetime',
  title: '23. DateTime',
  explanation: `## DateTime in PHP

PHP provides a rich set of classes for working with dates and times: DateTime, DateTimeImmutable, DateInterval, and DatePeriod.

### DateTime
\`\`\`php
<?php
\$now = new DateTime();
echo \$now->format('Y-m-d H:i:s');

\$date = new DateTime('2024-03-15');
echo \$date->format('l, F j, Y'); // "Friday, March 15, 2024"
\`\`\`

### DateTimeImmutable
\`\`\`php
<?php
\$date = new DateTimeImmutable('2024-01-01');
\$next = \$date->modify('+1 month');
echo \$date->format('Y-m-d');  // "2024-01-01" (unchanged)
echo \$next->format('Y-m-d');  // "2024-02-01"
\`\`\`

### DateInterval
\`\`\`php
<?php
\$interval = new DateInterval('P1Y2M3D');
// 1 year, 2 months, 3 days

\$date = new DateTime('2024-01-01');
\$date->add(\$interval);
echo \$date->format('Y-m-d'); // "2025-03-04"
\`\`\`

### DatePeriod
\`\`\`php
<?php
\$start = new DateTime('2024-01-01');
\$interval = new DateInterval('P1M');
\$end = new DateTime('2024-06-01');

\$period = new DatePeriod(\$start, \$interval, \$end);
foreach (\$period as \$date) {
    echo \$date->format('Y-m-d') . '\\n';
}
\`\`\`

### Timezone Handling
\`\`\`php
<?php
\$utc = new DateTime('now', new DateTimeZone('UTC'));
\$tokyo = new DateTime('now', new DateTimeZone('Asia/Tokyo'));
echo \$utc->format('H:i') . ' UTC\\n';
echo \$tokyo->format('H:i') . ' Tokyo\\n';
\`\`\`

### Difference Between Dates
\`\`\`php
<?php
\$a = new DateTime('2024-01-01');
\$b = new DateTime('2024-03-15');
\$diff = \$a->diff(\$b);
echo \$diff->days; // 74
\`\`\``,
  exercises: [
    {
      id: 'php-datetime-1',
      title: 'Create a DateTime',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to create a DateTime for a specific date.',
      skeleton: `<?php
\$date = new ___('2024-06-15');
echo \$date->format('Y-m-d');`,
      solution: `<?php
\$date = new DateTime('2024-06-15');
echo \$date->format('Y-m-d');`,
      hints: [
        'Use new DateTime() to create a date object.',
        'Pass the date string to the constructor.',
        'DateTime accepts many string formats.',
      ],
      concepts: ['DateTime', 'constructor', 'date-string'],
    },
    {
      id: 'php-datetime-2',
      title: 'Format a Date',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank with the format string for "Year-Month-Day" (e.g., 2024-03-15).',
      skeleton: `<?php
\$date = new DateTime('2024-03-15');
echo \$date->format(___);`,
      solution: `<?php
\$date = new DateTime('2024-03-15');
echo \$date->format('Y-m-d');`,
      hints: [
        'Y = 4-digit year, m = 2-digit month, d = 2-digit day.',
        'Use hyphens as separators.',
        'The format string is "Y-m-d".',
      ],
      concepts: ['format', 'date-format', 'Y-m-d'],
    },
    {
      id: 'php-datetime-3',
      title: 'Create a DateInterval',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to create an interval of 30 days.',
      skeleton: `<?php
\$interval = new DateInterval(___);
echo \$interval->days;`,
      solution: `<?php
\$interval = new DateInterval('P30D');
echo \$interval->days;`,
      hints: [
        'DateInterval uses ISO 8601 duration format.',
        'P starts the period, D means days.',
        '"P30D" means a period of 30 days.',
      ],
      concepts: ['DateInterval', 'ISO-8601', 'duration'],
    },
    {
      id: 'php-datetime-4',
      title: 'Add Interval to Date',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fill in the blank to add 1 month to a date.',
      skeleton: `<?php
\$date = new DateTime('2024-01-15');
\$date->___(new DateInterval('P1M'));
echo \$date->format('Y-m-d');`,
      solution: `<?php
\$date = new DateTime('2024-01-15');
\$date->add(new DateInterval('P1M'));
echo \$date->format('Y-m-d');`,
      hints: [
        'Use the add() method to add an interval.',
        'P1M means a period of 1 month.',
        'add() modifies the DateTime object in place.',
      ],
      concepts: ['add', 'DateInterval', 'mutation'],
    },
    {
      id: 'php-datetime-5',
      title: 'Create DateTimeZone',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to create a DateTime in the UTC timezone.',
      skeleton: `<?php
\$date = new DateTime('now', new ___(___));
echo \$date->format('e');`,
      solution: `<?php
\$date = new DateTime('now', new DateTimeZone('UTC'));
echo \$date->format('e');`,
      hints: [
        'Use new DateTimeZone() for timezone objects.',
        'Pass it as second argument to DateTime constructor.',
        '"UTC" is the timezone identifier.',
      ],
      concepts: ['DateTimeZone', 'UTC', 'timezone'],
    },
    {
      id: 'php-datetime-6',
      title: 'DateTimeImmutable Modify',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fill in the blank to create an immutable date and add 1 week.',
      skeleton: `<?php
\$date = new DateTimeImmutable('2024-01-01');
\$next = \$date->___('+1 week');
echo \$next->format('Y-m-d');`,
      solution: `<?php
\$date = new DateTimeImmutable('2024-01-01');
\$next = \$date->modify('+1 week');
echo \$next->format('Y-m-d');`,
      hints: [
        'modify() returns a new DateTimeImmutable object.',
        'The original $date remains unchanged.',
        'Use relative formats like "+1 week".',
      ],
      concepts: ['DateTimeImmutable', 'modify', 'immutability'],
    },
    {
      id: 'php-datetime-7',
      title: 'Write Date Difference Calculator',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Write a function daysBetween(string $date1, string $date2): int that returns the number of days between two dates.',
      skeleton: `<?php
// Write the daysBetween function`,
      solution: `<?php
function daysBetween(string \$date1, string \$date2): int {
    \$a = new DateTime(\$date1);
    \$b = new DateTime(\$date2);
    return (int) \$a->diff(\$b)->days;
}`,
      hints: [
        'Create DateTime objects from the strings.',
        'Use diff() to get a DateInterval.',
        'Access the days property for total days.',
      ],
      concepts: ['diff', 'days', 'date-calculation'],
    },
    {
      id: 'php-datetime-8',
      title: 'Write Age Calculator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function calculateAge(string $birthdate): int that returns the age in years from a birthdate string.',
      skeleton: `<?php
// Write the calculateAge function`,
      solution: `<?php
function calculateAge(string \$birthdate): int {
    \$birth = new DateTime(\$birthdate);
    \$now = new DateTime();
    return (int) \$birth->diff(\$now)->y;
}`,
      hints: [
        'Create DateTime for birth and now.',
        'Use diff() and access the y property for years.',
        'Cast to int for a clean return value.',
      ],
      concepts: ['age-calculation', 'diff', 'years'],
    },
    {
      id: 'php-datetime-9',
      title: 'Write Date Range Generator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function dateRange(string $start, string $end, string $interval): array that returns an array of date strings (Y-m-d) from start to end at the given interval.',
      skeleton: `<?php
// Write the dateRange function`,
      solution: `<?php
function dateRange(string \$start, string \$end, string \$interval): array {
    \$period = new DatePeriod(
        new DateTime(\$start),
        new DateInterval(\$interval),
        new DateTime(\$end)
    );
    \$dates = [];
    foreach (\$period as \$date) {
        \$dates[] = \$date->format('Y-m-d');
    }
    return \$dates;
}`,
      hints: [
        'Use DatePeriod with start, interval, and end.',
        'DateInterval string like "P1D" for daily.',
        'Iterate the period and format each date.',
      ],
      concepts: ['DatePeriod', 'DateInterval', 'iteration'],
    },
    {
      id: 'php-datetime-10',
      title: 'Write Timezone Converter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function convertTimezone(string $datetime, string $fromTz, string $toTz): string that converts a datetime string from one timezone to another, returning Y-m-d H:i:s.',
      skeleton: `<?php
// Write the convertTimezone function`,
      solution: `<?php
function convertTimezone(string \$datetime, string \$fromTz, string \$toTz): string {
    \$date = new DateTime(\$datetime, new DateTimeZone(\$fromTz));
    \$date->setTimezone(new DateTimeZone(\$toTz));
    return \$date->format('Y-m-d H:i:s');
}`,
      hints: [
        'Create DateTime with the source timezone.',
        'Use setTimezone() to convert.',
        'Format and return the converted time.',
      ],
      concepts: ['timezone-conversion', 'setTimezone', 'DateTimeZone'],
    },
    {
      id: 'php-datetime-11',
      title: 'Write a Weekday Checker',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Write a function isWeekday(string $date): bool that returns true if the given date falls on a weekday (Mon-Fri).',
      skeleton: `<?php
// Write the isWeekday function`,
      solution: `<?php
function isWeekday(string \$date): bool {
    \$day = (new DateTime(\$date))->format('N');
    return (int) \$day <= 5;
}`,
      hints: [
        'Format "N" returns 1 (Monday) through 7 (Sunday).',
        'Weekdays are 1-5, weekends are 6-7.',
        'Compare the numeric day of week.',
      ],
      concepts: ['format-N', 'weekday', 'boolean-logic'],
    },
    {
      id: 'php-datetime-12',
      title: 'Write a Recurring Date Generator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Write a function nextOccurrences(string $start, string $interval, int $count): array that returns $count future date strings starting from $start at the given interval.',
      skeleton: `<?php
// Write the nextOccurrences function`,
      solution: `<?php
function nextOccurrences(string \$start, string \$interval, int \$count): array {
    \$date = new DateTimeImmutable(\$start);
    \$int = new DateInterval(\$interval);
    \$dates = [];
    for (\$i = 0; \$i < \$count; \$i++) {
        \$dates[] = \$date->format('Y-m-d');
        \$date = \$date->add(\$int);
    }
    return \$dates;
}`,
      hints: [
        'Use DateTimeImmutable so add() returns a new instance.',
        'Loop $count times, adding the interval each iteration.',
        'Collect each formatted date in the result array.',
      ],
      concepts: ['DateTimeImmutable', 'recurrence', 'loop'],
    },
    {
      id: 'php-datetime-13',
      title: 'Fix Mutable DateTime Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the bug where modifying a DateTime also changes the original date.',
      skeleton: `<?php
\$start = new DateTime('2024-01-01');
\$end = \$start;
\$end->modify('+1 month');
echo \$start->format('Y-m-d');
// Outputs "2024-02-01" but should output "2024-01-01"`,
      solution: `<?php
\$start = new DateTimeImmutable('2024-01-01');
\$end = \$start->modify('+1 month');
echo \$start->format('Y-m-d');`,
      hints: [
        'DateTime is mutable; assigning creates a reference to the same object.',
        'Use DateTimeImmutable instead.',
        'modify() on DateTimeImmutable returns a new object.',
      ],
      concepts: ['mutability', 'DateTimeImmutable', 'reference-bug'],
    },
    {
      id: 'php-datetime-14',
      title: 'Fix Wrong Interval Format',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Fix the invalid DateInterval format string.',
      skeleton: `<?php
\$interval = new DateInterval('2M');
\$date = new DateTime('2024-01-01');
\$date->add(\$interval);
echo \$date->format('Y-m-d');`,
      solution: `<?php
\$interval = new DateInterval('P2M');
\$date = new DateTime('2024-01-01');
\$date->add(\$interval);
echo \$date->format('Y-m-d');`,
      hints: [
        'DateInterval strings must start with "P" for period.',
        '"2M" is missing the "P" prefix.',
        'Correct format is "P2M" for 2 months.',
      ],
      concepts: ['DateInterval', 'format', 'P-prefix'],
    },
    {
      id: 'php-datetime-15',
      title: 'Fix Timezone Mismatch',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Fix the code that compares dates from different timezones without normalizing.',
      skeleton: `<?php
\$a = new DateTime('2024-01-01 00:00', new DateTimeZone('America/New_York'));
\$b = new DateTime('2024-01-01 00:00', new DateTimeZone('Asia/Tokyo'));
echo \$a == \$b ? 'same' : 'different';
// Outputs "same" but these are different moments in time`,
      solution: `<?php
\$a = new DateTime('2024-01-01 00:00', new DateTimeZone('America/New_York'));
\$b = new DateTime('2024-01-01 00:00', new DateTimeZone('Asia/Tokyo'));
\$a->setTimezone(new DateTimeZone('UTC'));
\$b->setTimezone(new DateTimeZone('UTC'));
echo \$a == \$b ? 'same' : 'different';`,
      hints: [
        'The == comparison checks the internal timestamp.',
        'Actually, DateTime == already compares timestamps correctly.',
        'Convert both to UTC before comparing to make intent explicit.',
      ],
      concepts: ['timezone-comparison', 'UTC', 'normalization'],
    },
    {
      id: 'php-datetime-16',
      title: 'Predict Date Arithmetic',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'php',
      goal: 'Predict the date after adding an interval.',
      skeleton: `<?php
\$date = new DateTime('2024-01-31');
\$date->modify('+1 month');
echo \$date->format('Y-m-d');`,
      solution: `2024-03-02`,
      hints: [
        'Adding 1 month to Jan 31 goes to Feb 31.',
        'Feb 31 does not exist, so PHP overflows.',
        'It becomes March 2 (or March 1 in a leap year).',
      ],
      concepts: ['date-overflow', 'month-addition', 'edge-case'],
    },
    {
      id: 'php-datetime-17',
      title: 'Predict Immutable vs Mutable',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the output showing the difference between DateTime and DateTimeImmutable.',
      skeleton: `<?php
\$a = new DateTime('2024-01-01');
\$a->modify('+1 day');

\$b = new DateTimeImmutable('2024-01-01');
\$c = \$b->modify('+1 day');

echo \$a->format('d') . ' ' . \$b->format('d') . ' ' . \$c->format('d');`,
      solution: `02 01 02`,
      hints: [
        'DateTime modify() changes the object in place.',
        'DateTimeImmutable modify() returns a new object.',
        '$b remains unchanged at day 01.',
      ],
      concepts: ['mutable-vs-immutable', 'modify', 'side-effects'],
    },
    {
      id: 'php-datetime-18',
      title: 'Predict diff Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Predict the output of a date difference calculation.',
      skeleton: `<?php
\$a = new DateTime('2024-01-01');
\$b = new DateTime('2024-04-01');
\$diff = \$a->diff(\$b);
echo \$diff->m . ' ' . \$diff->days;`,
      solution: `3 91`,
      hints: [
        'diff() returns a DateInterval with relative and total values.',
        'm gives months (3), days gives total days.',
        'Jan to Apr is 3 months = 91 days (leap year 2024).',
      ],
      concepts: ['diff', 'months-vs-days', 'DateInterval'],
    },
    {
      id: 'php-datetime-19',
      title: 'Refactor strtotime to DateTime',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'php',
      goal: 'Refactor the procedural date code using strtotime to use DateTime objects.',
      skeleton: `<?php
\$timestamp = strtotime('2024-01-15');
\$nextMonth = strtotime('+1 month', \$timestamp);
echo date('Y-m-d', \$nextMonth);`,
      solution: `<?php
\$date = new DateTime('2024-01-15');
\$date->modify('+1 month');
echo \$date->format('Y-m-d');`,
      hints: [
        'Replace strtotime with new DateTime().',
        'Replace the second strtotime with modify().',
        'Replace date() with format().',
      ],
      concepts: ['DateTime', 'refactor', 'OOP'],
    },
    {
      id: 'php-datetime-20',
      title: 'Refactor to DateTimeImmutable',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'php',
      goal: 'Refactor the mutable DateTime code to use DateTimeImmutable to prevent accidental mutations.',
      skeleton: `<?php
function getRange(DateTime \$start, DateTime \$end): array {
    \$dates = [];
    while (\$start <= \$end) {
        \$dates[] = \$start->format('Y-m-d');
        \$start->modify('+1 day');
    }
    return \$dates;
}

\$s = new DateTime('2024-01-01');
\$e = new DateTime('2024-01-03');
\$range = getRange(\$s, \$e);
// Bug: \$s is now 2024-01-04 after the call`,
      solution: `<?php
function getRange(DateTimeImmutable \$start, DateTimeImmutable \$end): array {
    \$dates = [];
    \$current = \$start;
    while (\$current <= \$end) {
        \$dates[] = \$current->format('Y-m-d');
        \$current = \$current->modify('+1 day');
    }
    return \$dates;
}

\$s = new DateTimeImmutable('2024-01-01');
\$e = new DateTimeImmutable('2024-01-03');
\$range = getRange(\$s, \$e);`,
      hints: [
        'Use DateTimeImmutable for all date objects.',
        'modify() returns a new object, assign it to $current.',
        'The original $start and $end remain unchanged.',
      ],
      concepts: ['DateTimeImmutable', 'immutability', 'no-side-effects'],
    },
  ],
};
