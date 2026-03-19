import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-strman',
  title: '30. String Manipulation',
  explanation: `## String Manipulation

Advanced string operations go beyond basic string.h functions, involving parsing, tokenization, and pattern matching.

\`\`\`c
#include <string.h>

char *strtok(char *str, const char *delim);  // tokenizer
char *strstr(const char *haystack, const char *needle); // substring search
int sscanf(const char *str, const char *fmt, ...); // formatted parsing
\`\`\`

### Key Concepts
- **strtok**: splits string by delimiters (modifies original)
- **sscanf**: parse formatted data from a string
- **strstr**: find substring within a string
- **Manual parsing**: character-by-character processing
- **String building**: snprintf for safe formatted construction
`,
  exercises: [
    {
      id: 'c-strman-1',
      title: 'Split CSV line',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete a function that tokenizes a CSV line.',
      skeleton: `#include <stdio.h>
#include <string.h>

void parse_csv(char *line) {
    char *token = strtok(line, __BLANK__);
    while (token != __BLANK__) {
        printf("[%s] ", token);
        token = strtok(__BLANK__, ",");
    }
    printf("\\n");
}

int main(void) {
    char line[] = "Alice,30,Engineer";
    parse_csv(line);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

void parse_csv(char *line) {
    char *token = strtok(line, ",");
    while (token != NULL) {
        printf("[%s] ", token);
        token = strtok(NULL, ",");
    }
    printf("\\n");
}

int main(void) {
    char line[] = "Alice,30,Engineer";
    parse_csv(line);
    return 0;
}`,
      hints: [
        'strtok first call: pass the string and delimiter ",".',
        'Loop continues while token != NULL.',
        'Subsequent calls pass NULL as first argument.',
      ],
      concepts: ['strtok', 'CSV parsing', 'tokenization'],
    },
    {
      id: 'c-strman-2',
      title: 'Count word occurrences',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a function to count how many times a word appears in a string.',
      skeleton: `#include <stdio.h>
#include <string.h>

// Write int count_word(const char *text, const char *word)
// Count non-overlapping occurrences of word in text

int main(void) {
    printf("%d\\n", count_word("the cat sat on the mat the", "the"));
    printf("%d\\n", count_word("aaaa", "aa"));
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

int count_word(const char *text, const char *word) {
    int count = 0;
    size_t wlen = strlen(word);
    const char *p = text;
    while ((p = strstr(p, word)) != NULL) {
        count++;
        p += wlen;
    }
    return count;
}

int main(void) {
    printf("%d\\n", count_word("the cat sat on the mat the", "the"));
    printf("%d\\n", count_word("aaaa", "aa"));
    return 0;
}`,
      hints: [
        'Use strstr to find each occurrence.',
        'After finding one, advance pointer by word length.',
        'Loop until strstr returns NULL.',
      ],
      concepts: ['strstr', 'substring search', 'counting'],
    },
    {
      id: 'c-strman-3',
      title: 'Trim whitespace',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that trims leading and trailing whitespace from a string.',
      skeleton: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

// Write char *trim(char *s)
// Modify string in place and return pointer to trimmed start

int main(void) {
    char s[] = "  hello world  ";
    printf("[%s]\\n", trim(s));
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

char *trim(char *s) {
    while (isspace((unsigned char)*s)) s++;
    if (*s == '\\0') return s;
    char *end = s + strlen(s) - 1;
    while (end > s && isspace((unsigned char)*end)) end--;
    *(end + 1) = '\\0';
    return s;
}

int main(void) {
    char s[] = "  hello world  ";
    printf("[%s]\\n", trim(s));
    return 0;
}`,
      hints: [
        'Advance s past leading spaces using isspace.',
        'Find the end, walk backward past trailing spaces.',
        'Null-terminate after the last non-space character.',
      ],
      concepts: ['trim', 'isspace', 'in-place modification'],
    },
    {
      id: 'c-strman-4',
      title: 'Predict strtok behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the output of strtok with multiple delimiters.',
      skeleton: `#include <stdio.h>
#include <string.h>

int main(void) {
    char s[] = "one::two:::three";
    char *tok = strtok(s, ":");
    int count = 0;
    while (tok) {
        count++;
        printf("%s ", tok);
        tok = strtok(NULL, ":");
    }
    printf("\\ncount=%d\\n", count);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

int main(void) {
    char s[] = "one::two:::three";
    char *tok = strtok(s, ":");
    int count = 0;
    while (tok) {
        count++;
        printf("%s ", tok);
        tok = strtok(NULL, ":");
    }
    printf("\\ncount=%d\\n", count);
    return 0;
}
// Output:
// one two three
// count=3`,
      hints: [
        'strtok skips consecutive delimiters.',
        '"one::two:::three" splits into "one", "two", "three".',
        'Empty tokens between delimiters are NOT returned.',
      ],
      concepts: ['strtok', 'consecutive delimiters', 'tokenization'],
    },
    {
      id: 'c-strman-5',
      title: 'String replace',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that replaces all occurrences of a substring.',
      skeleton: `#include <stdio.h>
#include <string.h>
#include <stdlib.h>

// Write char *str_replace(const char *src, const char *old, const char *new_str)
// Return a new malloc'd string with all replacements
// Caller must free the result

int main(void) {
    char *result = str_replace("hello world hello", "hello", "hi");
    printf("%s\\n", result);
    free(result);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>
#include <stdlib.h>

char *str_replace(const char *src, const char *old, const char *new_str) {
    size_t old_len = strlen(old);
    size_t new_len = strlen(new_str);
    int count = 0;
    const char *p = src;
    while ((p = strstr(p, old)) != NULL) { count++; p += old_len; }

    size_t result_len = strlen(src) + count * ((long long)new_len - old_len);
    char *result = malloc(result_len + 1);
    char *dst = result;
    p = src;
    while (*p) {
        if (strncmp(p, old, old_len) == 0) {
            memcpy(dst, new_str, new_len);
            dst += new_len;
            p += old_len;
        } else {
            *dst++ = *p++;
        }
    }
    *dst = '\\0';
    return result;
}

int main(void) {
    char *result = str_replace("hello world hello", "hello", "hi");
    printf("%s\\n", result);
    free(result);
    return 0;
}`,
      hints: [
        'First count occurrences to calculate the result length.',
        'Allocate result with enough space, then copy with replacements.',
        'Use strncmp to detect old substring at current position.',
      ],
      concepts: ['string replace', 'dynamic allocation', 'strstr'],
    },
    {
      id: 'c-strman-6',
      title: 'Parse key=value',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete a function that parses "key=value" pairs from a string.',
      skeleton: `#include <stdio.h>
#include <string.h>

void parse_kvp(char *input) {
    char *pair = strtok(input, __BLANK__);
    while (pair) {
        char *eq = __BLANK__(pair, '=');
        if (eq) {
            *eq = '\\0';
            printf("key=[%s] value=[%s]\\n", pair, __BLANK__);
        }
        pair = strtok(NULL, ";");
    }
}

int main(void) {
    char s[] = "name=Alice;age=30;city=NYC";
    parse_kvp(s);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

void parse_kvp(char *input) {
    char *pair = strtok(input, ";");
    while (pair) {
        char *eq = strchr(pair, '=');
        if (eq) {
            *eq = '\\0';
            printf("key=[%s] value=[%s]\\n", pair, eq + 1);
        }
        pair = strtok(NULL, ";");
    }
}

int main(void) {
    char s[] = "name=Alice;age=30;city=NYC";
    parse_kvp(s);
    return 0;
}`,
      hints: [
        'Split on ";" first to get each key=value pair.',
        'Use strchr to find the "=" character in each pair.',
        'Value starts at eq + 1 (character after the equals sign).',
      ],
      concepts: ['parsing', 'strchr', 'key-value pairs'],
    },
    {
      id: 'c-strman-7',
      title: 'Fix buffer overflow in strcat',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the buffer overflow vulnerability in string concatenation.',
      skeleton: `#include <stdio.h>
#include <string.h>

int main(void) {
    char buffer[16] = "Hello";
    char *suffix = " World! How are you today?";
    strcat(buffer, suffix);  // BUG: buffer overflow
    printf("%s\\n", buffer);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

int main(void) {
    char buffer[16] = "Hello";
    char *suffix = " World! How are you today?";
    strncat(buffer, suffix, sizeof(buffer) - strlen(buffer) - 1);
    printf("%s\\n", buffer);
    return 0;
}`,
      hints: [
        'buffer is only 16 bytes but the result would be much longer.',
        'Use strncat with max = sizeof(buffer) - strlen(buffer) - 1.',
        'strncat always null-terminates within the limit.',
      ],
      concepts: ['buffer overflow', 'strncat', 'safe string ops'],
    },
    {
      id: 'c-strman-8',
      title: 'sscanf parsing',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete an sscanf call to parse a date string.',
      skeleton: `#include <stdio.h>

int main(void) {
    const char *date = "2026-03-15";
    int year, month, day;
    int n = sscanf(date, "%d__BLANK__%d__BLANK__%d", &year, &month, &day);
    if (n == __BLANK__)
        printf("Year: %d, Month: %d, Day: %d\\n", year, month, day);
    else
        printf("Parse failed\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    const char *date = "2026-03-15";
    int year, month, day;
    int n = sscanf(date, "%d-%d-%d", &year, &month, &day);
    if (n == 3)
        printf("Year: %d, Month: %d, Day: %d\\n", year, month, day);
    else
        printf("Parse failed\\n");
    return 0;
}`,
      hints: [
        'The format matches the date string: digits separated by hyphens.',
        'Use "-" between %d specifiers to match the dashes.',
        'sscanf returns the number of items parsed: expect 3.',
      ],
      concepts: ['sscanf', 'format string', 'date parsing'],
    },
    {
      id: 'c-strman-9',
      title: 'Join strings with delimiter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that joins an array of strings with a delimiter.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Write char *str_join(const char *parts[], int n, const char *delim)
// Return a new malloc'd string. Caller must free.

int main(void) {
    const char *parts[] = {"one", "two", "three"};
    char *result = str_join(parts, 3, ", ");
    printf("%s\\n", result);
    free(result);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *str_join(const char *parts[], int n, const char *delim) {
    if (n == 0) { char *e = malloc(1); *e = '\\0'; return e; }
    size_t dlen = strlen(delim);
    size_t total = 0;
    for (int i = 0; i < n; i++) total += strlen(parts[i]);
    total += dlen * (n - 1) + 1;
    char *result = malloc(total);
    result[0] = '\\0';
    for (int i = 0; i < n; i++) {
        if (i > 0) strcat(result, delim);
        strcat(result, parts[i]);
    }
    return result;
}

int main(void) {
    const char *parts[] = {"one", "two", "three"};
    char *result = str_join(parts, 3, ", ");
    printf("%s\\n", result);
    free(result);
    return 0;
}`,
      hints: [
        'Calculate total length: sum of part lengths + (n-1) * delimiter length + 1.',
        'Allocate, then concatenate with delimiters between parts.',
        'Handle the edge case n == 0.',
      ],
      concepts: ['string join', 'dynamic allocation', 'delimiter'],
    },
    {
      id: 'c-strman-10',
      title: 'Predict snprintf truncation',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict what happens when snprintf truncates.',
      skeleton: `#include <stdio.h>

int main(void) {
    char buf[10];
    int n = snprintf(buf, sizeof(buf), "Hello, %s!", "World");
    printf("buf=[%s] n=%d len=%d\\n", buf, n, (int)strlen(buf));
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

int main(void) {
    char buf[10];
    int n = snprintf(buf, sizeof(buf), "Hello, %s!", "World");
    printf("buf=[%s] n=%d len=%d\\n", buf, n, (int)strlen(buf));
    return 0;
}
// Output: buf=[Hello, Wo] n=13 len=9`,
      hints: [
        '"Hello, World!" is 13 characters. Buffer is 10.',
        'snprintf writes at most 9 chars + null terminator.',
        'Returns 13 (what would have been written). buf contains "Hello, Wo".',
      ],
      concepts: ['snprintf', 'truncation', 'return value'],
    },
    {
      id: 'c-strman-11',
      title: 'Reverse words in string',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function to reverse the order of words in a string.',
      skeleton: `#include <stdio.h>
#include <string.h>

// Write void reverse_words(char *s)
// "hello world foo" -> "foo world hello"
// Modify in place

int main(void) {
    char s[] = "the quick brown fox";
    reverse_words(s);
    printf("%s\\n", s);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

static void reverse_range(char *s, int lo, int hi) {
    while (lo < hi) {
        char tmp = s[lo]; s[lo] = s[hi]; s[hi] = tmp;
        lo++; hi--;
    }
}

void reverse_words(char *s) {
    int len = strlen(s);
    reverse_range(s, 0, len - 1);
    int start = 0;
    for (int i = 0; i <= len; i++) {
        if (i == len || s[i] == ' ') {
            reverse_range(s, start, i - 1);
            start = i + 1;
        }
    }
}

int main(void) {
    char s[] = "the quick brown fox";
    reverse_words(s);
    printf("%s\\n", s);
    return 0;
}`,
      hints: [
        'Step 1: Reverse the entire string.',
        'Step 2: Reverse each individual word.',
        'Use a helper to reverse a range of characters.',
      ],
      concepts: ['reverse words', 'two-pass reversal', 'in-place'],
    },
    {
      id: 'c-strman-12',
      title: 'Fix strtok modifies string',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the bug where strtok modifies a string literal.',
      skeleton: `#include <stdio.h>
#include <string.h>

int main(void) {
    const char *input = "a,b,c";  // BUG: string literal
    char *tok = strtok((char *)input, ",");  // Undefined behavior!
    while (tok) {
        printf("%s\\n", tok);
        tok = strtok(NULL, ",");
    }
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

int main(void) {
    const char *input = "a,b,c";
    char buf[32];
    strncpy(buf, input, sizeof(buf) - 1);
    buf[sizeof(buf) - 1] = '\\0';
    char *tok = strtok(buf, ",");
    while (tok) {
        printf("%s\\n", tok);
        tok = strtok(NULL, ",");
    }
    return 0;
}`,
      hints: [
        'strtok modifies the string by inserting null bytes.',
        'String literals are read-only; modifying them is undefined behavior.',
        'Copy the string to a mutable buffer first.',
      ],
      concepts: ['strtok', 'string literal', 'undefined behavior'],
    },
    {
      id: 'c-strman-13',
      title: 'atoi implementation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write your own atoi that handles sign and leading whitespace.',
      skeleton: `#include <stdio.h>
#include <ctype.h>

// Write int my_atoi(const char *s)
// Skip whitespace, handle optional +/-, convert digits

int main(void) {
    printf("%d\\n", my_atoi("  -123"));
    printf("%d\\n", my_atoi("  +456abc"));
    printf("%d\\n", my_atoi("789"));
    return 0;
}`,
      solution: `#include <stdio.h>
#include <ctype.h>

int my_atoi(const char *s) {
    while (isspace((unsigned char)*s)) s++;
    int sign = 1;
    if (*s == '-' || *s == '+') {
        if (*s == '-') sign = -1;
        s++;
    }
    int result = 0;
    while (isdigit((unsigned char)*s)) {
        result = result * 10 + (*s - '0');
        s++;
    }
    return sign * result;
}

int main(void) {
    printf("%d\\n", my_atoi("  -123"));
    printf("%d\\n", my_atoi("  +456abc"));
    printf("%d\\n", my_atoi("789"));
    return 0;
}`,
      hints: [
        'Skip whitespace with isspace, then check for +/-.',
        'Convert digits: result = result * 10 + (*s - \'0\').',
        'Stop at first non-digit character.',
      ],
      concepts: ['atoi', 'parsing', 'character conversion'],
    },
    {
      id: 'c-strman-14',
      title: 'Predict strncpy padding',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the behavior of strncpy with a short source string.',
      skeleton: `#include <stdio.h>
#include <string.h>

int main(void) {
    char buf[10];
    memset(buf, 'X', sizeof(buf));
    strncpy(buf, "Hi", sizeof(buf));
    int nulls = 0;
    for (int i = 0; i < 10; i++)
        if (buf[i] == '\\0') nulls++;
    printf("buf=[%s] nulls=%d\\n", buf, nulls);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

int main(void) {
    char buf[10];
    memset(buf, 'X', sizeof(buf));
    strncpy(buf, "Hi", sizeof(buf));
    int nulls = 0;
    for (int i = 0; i < 10; i++)
        if (buf[i] == '\\0') nulls++;
    printf("buf=[%s] nulls=%d\\n", buf, nulls);
    return 0;
}
// Output: buf=[Hi] nulls=8`,
      hints: [
        'strncpy copies "Hi" (2 chars) then pads with nulls up to n.',
        'Buffer is 10 bytes: \'H\', \'i\', then 8 null bytes.',
        'This is a common gotcha: strncpy always writes exactly n bytes.',
      ],
      concepts: ['strncpy', 'null padding', 'buffer behavior'],
    },
    {
      id: 'c-strman-15',
      title: 'Split on multiple delimiters',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that splits a string and returns token count.',
      skeleton: `#include <stdio.h>
#include <string.h>

// Write int split(char *str, const char *delims, char *tokens[], int max_tokens)
// Fill tokens array with pointers, return count

int main(void) {
    char str[] = "Hello, World! How are you?";
    char *tokens[10];
    int n = split(str, " ,!?", tokens, 10);
    for (int i = 0; i < n; i++) printf("[%s] ", tokens[i]);
    printf("\\ncount=%d\\n", n);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

int split(char *str, const char *delims, char *tokens[], int max_tokens) {
    int count = 0;
    char *tok = strtok(str, delims);
    while (tok && count < max_tokens) {
        tokens[count++] = tok;
        tok = strtok(NULL, delims);
    }
    return count;
}

int main(void) {
    char str[] = "Hello, World! How are you?";
    char *tokens[10];
    int n = split(str, " ,!?", tokens, 10);
    for (int i = 0; i < n; i++) printf("[%s] ", tokens[i]);
    printf("\\ncount=%d\\n", n);
    return 0;
}`,
      hints: [
        'Use strtok in a loop, storing each token pointer.',
        'Stop when strtok returns NULL or max_tokens reached.',
        'Return the count of tokens found.',
      ],
      concepts: ['strtok', 'multiple delimiters', 'token array'],
    },
    {
      id: 'c-strman-16',
      title: 'Fix unsafe sprintf',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the potential buffer overflow in sprintf.',
      skeleton: `#include <stdio.h>

void greet(const char *name) {
    char buf[32];
    sprintf(buf, "Hello, %s! Welcome to our platform.", name);  // BUG
    printf("%s\\n", buf);
}

int main(void) {
    greet("Alice");
    greet("A Very Long Name That Will Definitely Overflow");
    return 0;
}`,
      solution: `#include <stdio.h>

void greet(const char *name) {
    char buf[64];
    snprintf(buf, sizeof(buf), "Hello, %s! Welcome to our platform.", name);
    printf("%s\\n", buf);
}

int main(void) {
    greet("Alice");
    greet("A Very Long Name That Will Definitely Overflow");
    return 0;
}`,
      hints: [
        'sprintf does not check buffer bounds.',
        'Use snprintf(buf, sizeof(buf), ...) instead.',
        'Also increase buffer size to accommodate typical names.',
      ],
      concepts: ['snprintf', 'buffer overflow', 'safe formatting'],
    },
    {
      id: 'c-strman-17',
      title: 'Refactor to strsep',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor from strtok to strsep to handle empty tokens.',
      skeleton: `#include <stdio.h>
#include <string.h>

void parse(char *input) {
    char *tok = strtok(input, ",");
    while (tok) {
        printf("[%s]\\n", tok);
        tok = strtok(NULL, ",");
    }
}

int main(void) {
    char s[] = "one,,two,,,three";
    parse(s);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

void parse(char *input) {
    char *str = input;
    char *tok;
    while ((tok = strsep(&str, ",")) != NULL) {
        printf("[%s]\\n", tok);
    }
}

int main(void) {
    char s[] = "one,,two,,,three";
    parse(s);
    return 0;
}`,
      hints: [
        'strsep returns empty strings for consecutive delimiters.',
        'Pass address of string pointer: strsep(&str, ",").',
        'Loop until strsep returns NULL.',
      ],
      concepts: ['strsep', 'empty tokens', 'refactoring'],
    },
    {
      id: 'c-strman-18',
      title: 'URL query parser',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a function to parse URL query parameters.',
      skeleton: `#include <stdio.h>
#include <string.h>

typedef struct { char key[64]; char value[64]; } Param;

// Write int parse_query(char *query, Param params[], int max)
// Parse "key1=val1&key2=val2" into params array
// Return number of params parsed

int main(void) {
    char q[] = "name=Alice&age=30&city=NYC";
    Param params[10];
    int n = parse_query(q, params, 10);
    for (int i = 0; i < n; i++)
        printf("%s = %s\\n", params[i].key, params[i].value);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

typedef struct { char key[64]; char value[64]; } Param;

int parse_query(char *query, Param params[], int max) {
    int count = 0;
    char *pair = strtok(query, "&");
    while (pair && count < max) {
        char *eq = strchr(pair, '=');
        if (eq) {
            *eq = '\\0';
            strncpy(params[count].key, pair, 63);
            params[count].key[63] = '\\0';
            strncpy(params[count].value, eq + 1, 63);
            params[count].value[63] = '\\0';
            count++;
        }
        pair = strtok(NULL, "&");
    }
    return count;
}

int main(void) {
    char q[] = "name=Alice&age=30&city=NYC";
    Param params[10];
    int n = parse_query(q, params, 10);
    for (int i = 0; i < n; i++)
        printf("%s = %s\\n", params[i].key, params[i].value);
    return 0;
}`,
      hints: [
        'Split on "&" to get key=value pairs.',
        'Use strchr to find "=" in each pair.',
        'Copy key and value into the struct, null-terminate safely.',
      ],
      concepts: ['URL parsing', 'query parameters', 'struct population'],
    },
    {
      id: 'c-strman-19',
      title: 'Refactor string building',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor repeated strcat calls to use snprintf for safer string building.',
      skeleton: `#include <stdio.h>
#include <string.h>

void build_message(char *buf, size_t size, const char *name, int age) {
    strcpy(buf, "Name: ");
    strcat(buf, name);
    strcat(buf, ", Age: ");
    char num[16];
    sprintf(num, "%d", age);
    strcat(buf, num);
    strcat(buf, ".");
}

int main(void) {
    char buf[64];
    build_message(buf, sizeof(buf), "Alice", 30);
    printf("%s\\n", buf);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

void build_message(char *buf, size_t size, const char *name, int age) {
    snprintf(buf, size, "Name: %s, Age: %d.", name, age);
}

int main(void) {
    char buf[64];
    build_message(buf, sizeof(buf), "Alice", 30);
    printf("%s\\n", buf);
    return 0;
}`,
      hints: [
        'snprintf does everything in one call with bounds checking.',
        'Format: "Name: %s, Age: %d."',
        'No need for intermediate buffers or multiple concatenations.',
      ],
      concepts: ['snprintf', 'string building', 'refactoring'],
    },
    {
      id: 'c-strman-20',
      title: 'KMP string search',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Implement KMP (Knuth-Morris-Pratt) string search algorithm.',
      skeleton: `#include <stdio.h>
#include <string.h>
#include <stdlib.h>

// Write int kmp_search(const char *text, const char *pattern)
// Return index of first occurrence, or -1
// Build failure function, then search

int main(void) {
    printf("Index: %d\\n", kmp_search("ABABDABACDABABCABAB", "ABABCABAB"));
    printf("Index: %d\\n", kmp_search("hello world", "xyz"));
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int kmp_search(const char *text, const char *pattern) {
    int n = strlen(text), m = strlen(pattern);
    if (m == 0) return 0;
    int *lps = calloc(m, sizeof(int));
    int len = 0, i = 1;
    while (i < m) {
        if (pattern[i] == pattern[len]) {
            lps[i++] = ++len;
        } else if (len) {
            len = lps[len - 1];
        } else {
            lps[i++] = 0;
        }
    }
    i = 0;
    int j = 0;
    while (i < n) {
        if (text[i] == pattern[j]) {
            i++; j++;
            if (j == m) { free(lps); return i - j; }
        } else if (j) {
            j = lps[j - 1];
        } else {
            i++;
        }
    }
    free(lps);
    return -1;
}

int main(void) {
    printf("Index: %d\\n", kmp_search("ABABDABACDABABCABAB", "ABABCABAB"));
    printf("Index: %d\\n", kmp_search("hello world", "xyz"));
    return 0;
}`,
      hints: [
        'Build the LPS (longest proper prefix which is also suffix) array.',
        'Use LPS to skip characters when a mismatch occurs.',
        'O(n + m) time complexity.',
      ],
      concepts: ['KMP algorithm', 'failure function', 'string matching'],
    },
  ],
};
