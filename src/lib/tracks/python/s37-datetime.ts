import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-datetime',
  title: '37. Date & Time',
  explanation: `## Date & Time

Python's \\\`datetime\\\` module provides classes for manipulating dates and times.

### Core Classes
- **\\\`date\\\`** -- year, month, day
- **\\\`time\\\`** -- hour, minute, second, microsecond
- **\\\`datetime\\\`** -- combined date and time
- **\\\`timedelta\\\`** -- duration between two points in time
- **\\\`timezone\\\`** -- fixed UTC offset timezone

### Creating Dates
\\\`\\\`\\\`python
from datetime import datetime, date, timedelta
now = datetime.now()
today = date.today()
specific = datetime(2025, 3, 15, 10, 30)
\\\`\\\`\\\`

### Formatting & Parsing
- **\\\`strftime(format)\\\`** -- format datetime to string
- **\\\`strptime(string, format)\\\`** -- parse string to datetime
- **\\\`.isoformat()\\\`** -- ISO 8601 format

### Arithmetic
Dates support addition/subtraction with \\\`timedelta\\\` objects and comparison operators.

### Time Zones
- \\\`timezone.utc\\\` -- UTC timezone
- \\\`zoneinfo.ZoneInfo\\\` (Python 3.9+) -- IANA timezone database
- Always use aware datetimes (with timezone info) for production code.

### Calendar Module
The \\\`calendar\\\` module provides calendar-related functions.
`,
  exercises: [
    {
      id: 'py-dt-1',
      title: 'Create a datetime',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a specific datetime object.',
      skeleton: `from datetime import __BLANK__

dt = __BLANK__(2025, 3, 15, 10, 30, 0)
print(dt)`,
      solution: `from datetime import datetime

dt = datetime(2025, 3, 15, 10, 30, 0)
print(dt)`,
      hints: [
        'The datetime class creates date+time objects.',
        'Arguments: year, month, day, hour, minute, second.',
        'The answer is: datetime',
      ],
      concepts: ['datetime', 'constructor'],
    },
    {
      id: 'py-dt-2',
      title: 'Format with strftime',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Format a datetime as "YYYY-MM-DD HH:MM".',
      skeleton: `from datetime import datetime

dt = datetime(2025, 3, 15, 10, 30)
formatted = dt.__BLANK__("%Y-%m-%d %H:%M")
print(formatted)`,
      solution: `from datetime import datetime

dt = datetime(2025, 3, 15, 10, 30)
formatted = dt.strftime("%Y-%m-%d %H:%M")
print(formatted)`,
      hints: [
        'strftime formats a datetime into a string.',
        '%Y = 4-digit year, %m = month, %d = day, %H = hour, %M = minute.',
        'The answer is: strftime',
      ],
      concepts: ['strftime', 'format codes'],
    },
    {
      id: 'py-dt-3',
      title: 'Parse with strptime',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Parse a date string into a datetime object.',
      skeleton: `from datetime import datetime

text = "2025-03-15"
dt = datetime.__BLANK__(text, "%Y-%m-%d")
print(dt.year, dt.month, dt.day)`,
      solution: `from datetime import datetime

text = "2025-03-15"
dt = datetime.strptime(text, "%Y-%m-%d")
print(dt.year, dt.month, dt.day)`,
      hints: [
        'strptime parses a string into a datetime object.',
        'It takes the string and the format as arguments.',
        'The answer is: strptime',
      ],
      concepts: ['strptime', 'date parsing'],
    },
    {
      id: 'py-dt-4',
      title: 'timedelta basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Add 7 days to a date using timedelta.',
      skeleton: `from datetime import date, __BLANK__

today = date(2025, 3, 15)
next_week = today + __BLANK__(days=7)
print(next_week)`,
      solution: `from datetime import date, timedelta

today = date(2025, 3, 15)
next_week = today + timedelta(days=7)
print(next_week)`,
      hints: [
        'timedelta represents a duration.',
        'Add a timedelta to a date to get a future date.',
        'The answer is: timedelta',
      ],
      concepts: ['timedelta', 'date arithmetic'],
    },
    {
      id: 'py-dt-5',
      title: 'ISO format',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Convert a datetime to and from ISO 8601 format.',
      skeleton: `from datetime import datetime

dt = datetime(2025, 3, 15, 10, 30)
iso = dt.__BLANK__()
print(iso)
restored = datetime.fromisoformat(iso)
print(restored)`,
      solution: `from datetime import datetime

dt = datetime(2025, 3, 15, 10, 30)
iso = dt.isoformat()
print(iso)
restored = datetime.fromisoformat(iso)
print(restored)`,
      hints: [
        'isoformat() produces an ISO 8601 string.',
        'fromisoformat() parses it back.',
        'The answer is: isoformat',
      ],
      concepts: ['isoformat', 'ISO 8601', 'fromisoformat'],
    },
    {
      id: 'py-dt-6',
      title: 'Timezone-aware datetime',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Create a UTC-aware datetime.',
      skeleton: `from datetime import datetime, __BLANK__

dt = datetime.now(__BLANK__.utc)
print(dt.tzinfo)`,
      solution: `from datetime import datetime, timezone

dt = datetime.now(timezone.utc)
print(dt.tzinfo)`,
      hints: [
        'timezone.utc is the UTC timezone object.',
        'Pass it to datetime.now() for an aware datetime.',
        'The answer is: timezone',
      ],
      concepts: ['timezone', 'UTC', 'aware datetime'],
    },
    {
      id: 'py-dt-7',
      title: 'Predict timedelta subtraction',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'What does subtracting two dates produce?',
      skeleton: `from datetime import date

d1 = date(2025, 3, 15)
d2 = date(2025, 1, 1)
diff = d1 - d2
print(diff.days)`,
      solution: `73`,
      hints: [
        'Subtracting two dates produces a timedelta.',
        'From Jan 1 to Mar 15: 31 (Jan) + 28 (Feb) + 14 = 73 days.',
        'The output is 73.',
      ],
      concepts: ['date subtraction', 'timedelta.days'],
    },
    {
      id: 'py-dt-8',
      title: 'Predict strftime output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this strftime format produce?',
      skeleton: `from datetime import datetime

dt = datetime(2025, 3, 15, 14, 5, 9)
print(dt.strftime("%A, %B %d, %Y at %I:%M %p"))`,
      solution: `Saturday, March 15, 2025 at 02:05 PM`,
      hints: [
        '%A = full weekday name, %B = full month name.',
        '%I = 12-hour format, %p = AM/PM.',
        'March 15, 2025 is a Saturday.',
      ],
      concepts: ['strftime', 'format codes', '12-hour time'],
    },
    {
      id: 'py-dt-9',
      title: 'Predict timestamp conversion',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does timestamp round-tripping produce?',
      skeleton: `from datetime import datetime, timezone

dt = datetime(2025, 1, 1, 0, 0, 0, tzinfo=timezone.utc)
ts = dt.timestamp()
print(type(ts).__name__)
restored = datetime.fromtimestamp(ts, tz=timezone.utc)
print(restored.year)`,
      solution: `float
2025`,
      hints: [
        '.timestamp() returns a float (Unix timestamp).',
        'fromtimestamp() converts it back to a datetime.',
        'The year of the restored datetime is 2025.',
      ],
      concepts: ['timestamp', 'Unix time', 'fromtimestamp'],
    },
    {
      id: 'py-dt-10',
      title: 'Fix naive datetime comparison',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code that compares a naive and aware datetime.',
      skeleton: `from datetime import datetime, timezone

# Bug: cannot compare naive and aware datetimes
aware = datetime.now(timezone.utc)
naive = datetime(2025, 3, 15)

if naive < aware:
    print("In the past")`,
      solution: `from datetime import datetime, timezone

# Fixed: make both datetimes aware
aware = datetime.now(timezone.utc)
naive = datetime(2025, 3, 15, tzinfo=timezone.utc)

if naive < aware:
    print("In the past")`,
      hints: [
        'Cannot compare aware and naive datetimes -- raises TypeError.',
        'Make both datetimes timezone-aware.',
        'Add tzinfo=timezone.utc to the naive datetime.',
      ],
      concepts: ['naive vs aware', 'TypeError', 'timezone'],
    },
    {
      id: 'py-dt-11',
      title: 'Fix strptime format mismatch',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Fix the strptime call with a mismatched format string.',
      skeleton: `from datetime import datetime

# Bug: format doesn't match the string
text = "15/03/2025"
dt = datetime.strptime(text, "%Y-%m-%d")
print(dt)`,
      solution: `from datetime import datetime

# Fixed: format matches DD/MM/YYYY
text = "15/03/2025"
dt = datetime.strptime(text, "%d/%m/%Y")
print(dt)`,
      hints: [
        'The format string must match the actual string format.',
        'The text is DD/MM/YYYY with slashes, not YYYY-MM-DD with dashes.',
        'Use "%d/%m/%Y" to match "15/03/2025".',
      ],
      concepts: ['strptime', 'format mismatch', 'ValueError'],
    },
    {
      id: 'py-dt-12',
      title: 'Fix replace instead of timedelta',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code that incorrectly uses replace to add days.',
      skeleton: `from datetime import datetime

dt = datetime(2025, 3, 30, 10, 0)
# Bug: trying to "add 5 days" by replacing the day component
next_date = dt.replace(day=dt.day + 5)  # Fails if day > 31!
print(next_date)`,
      solution: `from datetime import datetime, timedelta

dt = datetime(2025, 3, 30, 10, 0)
# Fixed: use timedelta for date arithmetic
next_date = dt + timedelta(days=5)
print(next_date)`,
      hints: [
        'replace() sets components directly -- it does not handle overflow.',
        'day=35 is invalid and raises ValueError.',
        'Use timedelta(days=5) for correct date arithmetic across months.',
      ],
      concepts: ['timedelta vs replace', 'month overflow'],
    },
    {
      id: 'py-dt-13',
      title: 'Write a date range generator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a generator that yields dates between start and end.',
      skeleton: `from datetime import date, timedelta

def date_range(start, end):
    # Yield each date from start to end (inclusive)
    pass

for d in date_range(date(2025, 3, 10), date(2025, 3, 15)):
    print(d)`,
      solution: `from datetime import date, timedelta

def date_range(start, end):
    current = start
    while current <= end:
        yield current
        current += timedelta(days=1)

for d in date_range(date(2025, 3, 10), date(2025, 3, 15)):
    print(d)`,
      hints: [
        'Use a while loop with timedelta(days=1) to step through dates.',
        'Yield each date and increment by one day.',
        'Continue while current <= end.',
      ],
      concepts: ['generator', 'date range', 'timedelta'],
    },
    {
      id: 'py-dt-14',
      title: 'Write an age calculator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function that calculates age in years from a birth date.',
      skeleton: `from datetime import date

def calculate_age(birth_date, reference_date=None):
    # Return age in whole years
    pass

print(calculate_age(date(1990, 6, 15), date(2025, 3, 15)))  # 34`,
      solution: `from datetime import date

def calculate_age(birth_date, reference_date=None):
    if reference_date is None:
        reference_date = date.today()
    age = reference_date.year - birth_date.year
    if (reference_date.month, reference_date.day) < (birth_date.month, birth_date.day):
        age -= 1
    return age

print(calculate_age(date(1990, 6, 15), date(2025, 3, 15)))  # 34`,
      hints: [
        'Subtract birth year from current year.',
        'If the birthday has not occurred yet this year, subtract 1.',
        'Compare (month, day) tuples to check.',
      ],
      concepts: ['age calculation', 'date comparison'],
    },
    {
      id: 'py-dt-15',
      title: 'Write a timezone converter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function that converts a UTC datetime to a specified timezone.',
      skeleton: `from datetime import datetime, timezone, timedelta

def convert_timezone(dt_utc, offset_hours):
    # Convert UTC datetime to a timezone with the given offset
    pass

utc_time = datetime(2025, 3, 15, 12, 0, tzinfo=timezone.utc)
est_time = convert_timezone(utc_time, -5)
print(est_time)  # 2025-03-15 07:00:00-05:00`,
      solution: `from datetime import datetime, timezone, timedelta

def convert_timezone(dt_utc, offset_hours):
    target_tz = timezone(timedelta(hours=offset_hours))
    return dt_utc.astimezone(target_tz)

utc_time = datetime(2025, 3, 15, 12, 0, tzinfo=timezone.utc)
est_time = convert_timezone(utc_time, -5)
print(est_time)`,
      hints: [
        'Create a timezone from a timedelta of hours.',
        'Use .astimezone() to convert between timezones.',
        'timezone(timedelta(hours=offset)) creates the target timezone.',
      ],
      concepts: ['astimezone', 'timezone conversion', 'timedelta'],
    },
    {
      id: 'py-dt-16',
      title: 'Write a zoneinfo converter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function using zoneinfo for named timezone conversion.',
      skeleton: `from datetime import datetime, timezone
from zoneinfo import ZoneInfo

def localize(dt_utc, tz_name):
    # Convert UTC datetime to named timezone (e.g., "America/New_York")
    pass

utc = datetime(2025, 7, 15, 18, 0, tzinfo=timezone.utc)
ny = localize(utc, "America/New_York")
print(ny)
tokyo = localize(utc, "Asia/Tokyo")
print(tokyo)`,
      solution: `from datetime import datetime, timezone
from zoneinfo import ZoneInfo

def localize(dt_utc, tz_name):
    target = ZoneInfo(tz_name)
    return dt_utc.astimezone(target)

utc = datetime(2025, 7, 15, 18, 0, tzinfo=timezone.utc)
ny = localize(utc, "America/New_York")
print(ny)
tokyo = localize(utc, "Asia/Tokyo")
print(tokyo)`,
      hints: [
        'ZoneInfo creates timezone objects from IANA names.',
        'Use astimezone() with the ZoneInfo object.',
        'Python 3.9+ includes zoneinfo in the standard library.',
      ],
      concepts: ['zoneinfo', 'ZoneInfo', 'IANA timezones'],
    },
    {
      id: 'py-dt-17',
      title: 'Write a business days calculator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function that adds N business days (skipping weekends) to a date.',
      skeleton: `from datetime import date, timedelta

def add_business_days(start, n):
    # Add n business days (Mon-Fri) to start date
    pass

print(add_business_days(date(2025, 3, 14), 3))  # Fri + 3 = Wed Mar 19`,
      solution: `from datetime import date, timedelta

def add_business_days(start, n):
    current = start
    added = 0
    while added < n:
        current += timedelta(days=1)
        if current.weekday() < 5:  # Mon=0 ... Fri=4
            added += 1
    return current

print(add_business_days(date(2025, 3, 14), 3))  # Wed Mar 19`,
      hints: [
        'weekday() returns 0=Monday through 6=Sunday.',
        'Skip days where weekday() >= 5 (Saturday, Sunday).',
        'Increment the day and only count business days.',
      ],
      concepts: ['weekday()', 'business days', 'date arithmetic'],
    },
    {
      id: 'py-dt-18',
      title: 'Write a duration formatter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function that formats a timedelta as a human-readable string.',
      skeleton: `from datetime import timedelta

def format_duration(td):
    # Format as "Xd Xh Xm Xs"
    pass

print(format_duration(timedelta(days=2, hours=5, minutes=30, seconds=15)))
# "2d 5h 30m 15s"
print(format_duration(timedelta(hours=1, seconds=5)))
# "1h 0m 5s"`,
      solution: `from datetime import timedelta

def format_duration(td):
    total_seconds = int(td.total_seconds())
    days = total_seconds // 86400
    hours = (total_seconds % 86400) // 3600
    minutes = (total_seconds % 3600) // 60
    seconds = total_seconds % 60

    parts = []
    if days:
        parts.append(f"{days}d")
    parts.append(f"{hours}h")
    parts.append(f"{minutes}m")
    parts.append(f"{seconds}s")
    return " ".join(parts)

print(format_duration(timedelta(days=2, hours=5, minutes=30, seconds=15)))
print(format_duration(timedelta(hours=1, seconds=5)))`,
      hints: [
        'Use total_seconds() and integer division to extract components.',
        'Days: // 86400, hours: // 3600, minutes: // 60.',
        'Build a list of non-zero parts and join them.',
      ],
      concepts: ['total_seconds', 'duration formatting'],
    },
    {
      id: 'py-dt-19',
      title: 'Refactor string dates to datetime',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Refactor the code that manipulates dates as strings to use datetime objects.',
      skeleton: `# Manual date string manipulation
date_str = "2025-03-15"
parts = date_str.split("-")
year = int(parts[0])
month = int(parts[1])
day = int(parts[2])

# Add 30 days manually (wrong for month boundaries!)
day += 30
if day > 31:
    day -= 31
    month += 1

new_date = f"{year}-{month:02d}-{day:02d}"
print(new_date)`,
      solution: `from datetime import date, timedelta

dt = date(2025, 3, 15)
future = dt + timedelta(days=30)
new_date = future.isoformat()
print(new_date)`,
      hints: [
        'Manual date math with strings is error-prone.',
        'Use date objects and timedelta for correct arithmetic.',
        'datetime handles month/year boundaries automatically.',
      ],
      concepts: ['refactoring', 'datetime vs strings'],
    },
    {
      id: 'py-dt-20',
      title: 'Refactor time.time() to datetime',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor raw timestamp usage to proper datetime objects.',
      skeleton: `import time

start = time.time()
# ... some operation ...
end = time.time()

elapsed = end - start
started_at = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(start))
print(f"Started: {started_at}")
print(f"Elapsed: {elapsed:.2f}s")`,
      solution: `from datetime import datetime, timezone

start = datetime.now(timezone.utc)
# ... some operation ...
end = datetime.now(timezone.utc)

elapsed = (end - start).total_seconds()
print(f"Started: {start.strftime('%Y-%m-%d %H:%M:%S')}")
print(f"Elapsed: {elapsed:.2f}s")`,
      hints: [
        'datetime objects are more expressive than raw timestamps.',
        'Subtracting two datetimes gives a timedelta.',
        'Use .total_seconds() on the timedelta for elapsed time.',
      ],
      concepts: ['datetime vs time.time', 'total_seconds'],
    },
  ],
};
