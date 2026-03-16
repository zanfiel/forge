import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-str',
  title: '9. Strings',
  explanation: `## Strings in C

C has no built-in string type. Strings are null-terminated arrays of \`char\`.

\`\`\`c
char greeting[] = "Hello";  // {'H','e','l','l','o','\\0'}
char *ptr = "World";        // pointer to string literal (read-only)
\`\`\`

### Key Functions (string.h)
- \`strlen(s)\`: length (not counting null terminator)
- \`strcpy(dest, src)\`: copy string
- \`strncpy(dest, src, n)\`: copy at most n characters
- \`strcat(dest, src)\`: concatenate
- \`strcmp(a, b)\`: compare (returns 0 if equal)
- \`strchr(s, c)\`: find character

### Format Specifiers
- \`%s\`: print string
- \`%c\`: print single character
- \`%.5s\`: print at most 5 characters
`,
  exercises: [
    {
      id: 'c-str-1',
      title: 'String declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Declare a string as a character array with proper null termination.',
      skeleton: `#include <stdio.h>

int main(void) {
    char name[] = __BLANK__;
    printf("Name: %s\\n", name);
    printf("Length: %zu\\n", __BLANK__(name) - 1);  // -1 for null terminator
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    char name[] = "Alice";
    printf("Name: %s\\n", name);
    printf("Length: %zu\\n", sizeof(name) - 1);  // -1 for null terminator
    return 0;
}`,
      hints: [
        'String literals are enclosed in double quotes: "Alice".',
        'sizeof(name) includes the null terminator.',
        'sizeof("Alice") is 6 (5 characters + 1 null byte).',
      ],
      concepts: ['string literal', 'null terminator', 'sizeof string'],
    },
    {
      id: 'c-str-2',
      title: 'Strlen usage',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use strlen to get the length of a string.',
      skeleton: `#include <stdio.h>
#include <__BLANK__>

int main(void) {
    char msg[] = "Hello, World!";
    size_t len = __BLANK__(msg);
    printf("Length: %zu\\n", len);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

int main(void) {
    char msg[] = "Hello, World!";
    size_t len = strlen(msg);
    printf("Length: %zu\\n", len);
    return 0;
}`,
      hints: [
        'strlen is declared in string.h.',
        'strlen counts characters up to but not including the null terminator.',
        'strlen("Hello, World!") returns 13.',
      ],
      concepts: ['strlen', 'string.h', 'string length'],
    },
    {
      id: 'c-str-3',
      title: 'Strcpy and strcat',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a program that copies and concatenates strings.',
      skeleton: `// Write a program that:
// 1. Declares a buffer of 50 chars
// 2. Copies "Hello" into it with strcpy
// 3. Concatenates ", World!" with strcat
// 4. Prints the result`,
      solution: `#include <stdio.h>
#include <string.h>

int main(void) {
    char buffer[50];
    strcpy(buffer, "Hello");
    strcat(buffer, ", World!");
    printf("%s\\n", buffer);
    return 0;
}`,
      hints: [
        'strcpy(dest, src) copies src into dest.',
        'strcat(dest, src) appends src to the end of dest.',
        'Make sure buffer is large enough for the combined string.',
      ],
      concepts: ['strcpy', 'strcat', 'string buffer'],
    },
    {
      id: 'c-str-4',
      title: 'Strcmp comparison',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use strcmp to compare two strings.',
      skeleton: `#include <stdio.h>
#include <string.h>

int main(void) {
    char a[] = "apple";
    char b[] = "banana";

    int result = __BLANK__(a, b);
    if (result __BLANK__ 0) {
        printf("Equal\\n");
    } else if (result < 0) {
        printf("%s comes before %s\\n", a, b);
    } else {
        printf("%s comes after %s\\n", a, b);
    }
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

int main(void) {
    char a[] = "apple";
    char b[] = "banana";

    int result = strcmp(a, b);
    if (result == 0) {
        printf("Equal\\n");
    } else if (result < 0) {
        printf("%s comes before %s\\n", a, b);
    } else {
        printf("%s comes after %s\\n", a, b);
    }
    return 0;
}`,
      hints: [
        'strcmp returns 0 if strings are equal.',
        'Negative if the first string comes before the second.',
        'You cannot compare strings with == in C; use strcmp.',
      ],
      concepts: ['strcmp', 'string comparison', 'lexicographic order'],
    },
    {
      id: 'c-str-5',
      title: 'Predict null terminator',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict what happens when the null terminator is overwritten.',
      skeleton: `#include <stdio.h>
#include <string.h>

int main(void) {
    char str[6] = "Hello";
    printf("Before: %s (len=%zu)\\n", str, strlen(str));

    str[2] = '\\0';
    printf("After: %s (len=%zu)\\n", str, strlen(str));
    return 0;
}`,
      solution: `Before: Hello (len=5)
After: He (len=2)`,
      hints: [
        'Placing \\0 at index 2 truncates the string there.',
        'printf and strlen stop at the first \\0.',
        'The characters l, o are still in memory but invisible to string functions.',
      ],
      concepts: ['null terminator', 'string truncation', 'strlen behavior'],
    },
    {
      id: 'c-str-6',
      title: 'Custom strlen',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Implement your own strlen function.',
      skeleton: `// Write size_t my_strlen(const char *s) that returns the string length
// without using the standard strlen.`,
      solution: `#include <stdio.h>
#include <stddef.h>

size_t my_strlen(const char *s) {
    size_t len = 0;
    while (s[len] != '\\0') {
        len++;
    }
    return len;
}

int main(void) {
    printf("%zu\\n", my_strlen("Hello"));
    printf("%zu\\n", my_strlen(""));
    printf("%zu\\n", my_strlen("A longer string"));
    return 0;
}`,
      hints: [
        'Count characters until you find \\0.',
        'Use a counter variable starting at 0.',
        'Return the count when \\0 is reached.',
      ],
      concepts: ['custom strlen', 'null terminator', 'character iteration'],
    },
    {
      id: 'c-str-7',
      title: 'Strncpy safety',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use strncpy safely to prevent buffer overflow.',
      skeleton: `#include <stdio.h>
#include <string.h>

int main(void) {
    char dest[10];
    const char *src = "This is a very long string";

    __BLANK__(dest, src, sizeof(dest) - 1);
    dest[sizeof(dest) - __BLANK__] = '\\0';

    printf("Truncated: %s\\n", dest);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

int main(void) {
    char dest[10];
    const char *src = "This is a very long string";

    strncpy(dest, src, sizeof(dest) - 1);
    dest[sizeof(dest) - 1] = '\\0';

    printf("Truncated: %s\\n", dest);
    return 0;
}`,
      hints: [
        'strncpy copies at most n characters.',
        'strncpy does NOT guarantee null termination if src is longer than n.',
        'Always manually null-terminate: dest[sizeof(dest) - 1] = \\0.',
      ],
      concepts: ['strncpy', 'buffer overflow prevention', 'null termination'],
    },
    {
      id: 'c-str-8',
      title: 'Fix string comparison bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the code that compares strings with == instead of strcmp.',
      skeleton: `#include <stdio.h>

int main(void) {
    char input[] = "yes";
    char expected[] = "yes";

    if (input == expected) {
        printf("Match!\\n");
    } else {
        printf("No match!\\n");
    }
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

int main(void) {
    char input[] = "yes";
    char expected[] = "yes";

    if (strcmp(input, expected) == 0) {
        printf("Match!\\n");
    } else {
        printf("No match!\\n");
    }
    return 0;
}`,
      hints: [
        '== compares pointer addresses, not string contents.',
        'Two different char arrays always have different addresses.',
        'Use strcmp(a, b) == 0 to check if two strings are equal.',
      ],
      concepts: ['string comparison bug', '== vs strcmp', 'pointer comparison'],
    },
    {
      id: 'c-str-9',
      title: 'Predict string literal vs array',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the difference between a char array and a char pointer to a literal.',
      skeleton: `#include <stdio.h>

int main(void) {
    char arr[] = "Hello";
    char *ptr = "Hello";

    arr[0] = 'J';
    printf("%s\\n", arr);
    printf("%s\\n", ptr);
    printf("sizeof arr: %zu\\n", sizeof(arr));
    printf("sizeof ptr: %zu\\n", sizeof(ptr));
    return 0;
}`,
      solution: `Jello
Hello
sizeof arr: 6
sizeof ptr: 8`,
      hints: [
        'arr is a mutable copy; modifying arr[0] changes it to "Jello".',
        'ptr points to a read-only string literal; "Hello" is unchanged.',
        'sizeof(arr) is 6 (string + null). sizeof(ptr) is 8 (pointer size).',
      ],
      concepts: ['char array vs pointer', 'string literal', 'mutability'],
    },
    {
      id: 'c-str-10',
      title: 'Printf format strings',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a program demonstrating various string format specifiers.',
      skeleton: `// Write a program that prints "Hello, World!" using:
// 1. %s - full string
// 2. %.5s - first 5 chars only
// 3. %20s - right-aligned in 20 chars
// 4. %-20s - left-aligned in 20 chars`,
      solution: `#include <stdio.h>

int main(void) {
    const char *s = "Hello, World!";
    printf("[%s]\\n", s);
    printf("[%.5s]\\n", s);
    printf("[%20s]\\n", s);
    printf("[%-20s]\\n", s);
    return 0;
}`,
      hints: [
        '%.5s truncates the string to 5 characters.',
        '%20s right-aligns in a 20-character field.',
        '%-20s left-aligns in a 20-character field.',
      ],
      concepts: ['printf format', 'string truncation', 'field width', 'alignment'],
    },
    {
      id: 'c-str-11',
      title: 'Character classification',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use ctype.h functions to classify characters.',
      skeleton: `#include <stdio.h>
#include <__BLANK__>

int main(void) {
    char c = 'A';
    printf("isalpha: %d\\n", __BLANK__(c));
    printf("isdigit: %d\\n", __BLANK__(c));
    printf("isupper: %d\\n", __BLANK__(c));
    printf("tolower: %c\\n", __BLANK__(c));
    return 0;
}`,
      solution: `#include <stdio.h>
#include <ctype.h>

int main(void) {
    char c = 'A';
    printf("isalpha: %d\\n", isalpha(c));
    printf("isdigit: %d\\n", isdigit(c));
    printf("isupper: %d\\n", isupper(c));
    printf("tolower: %c\\n", tolower(c));
    return 0;
}`,
      hints: [
        'ctype.h provides character classification functions.',
        'isalpha, isdigit, isupper check character properties.',
        'tolower converts uppercase to lowercase.',
      ],
      concepts: ['ctype.h', 'character classification', 'tolower'],
    },
    {
      id: 'c-str-12',
      title: 'Count words',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that counts words in a string (space-separated).',
      skeleton: `// Write int count_words(const char *s) that counts space-separated words.
// "Hello World" -> 2, "  spaced  out  " -> 2, "" -> 0`,
      solution: `#include <stdio.h>
#include <ctype.h>

int count_words(const char *s) {
    int count = 0;
    int in_word = 0;
    while (*s) {
        if (isspace((unsigned char)*s)) {
            in_word = 0;
        } else if (!in_word) {
            in_word = 1;
            count++;
        }
        s++;
    }
    return count;
}

int main(void) {
    printf("%d\\n", count_words("Hello World"));
    printf("%d\\n", count_words("  spaced  out  "));
    printf("%d\\n", count_words(""));
    return 0;
}`,
      hints: [
        'Track whether you are currently inside a word.',
        'Count a new word when transitioning from space to non-space.',
        'Use isspace to detect whitespace characters.',
      ],
      concepts: ['word counting', 'state machine', 'character iteration'],
    },
    {
      id: 'c-str-13',
      title: 'Fix buffer overflow',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the buffer overflow in the string concatenation.',
      skeleton: `#include <stdio.h>
#include <string.h>

int main(void) {
    char buffer[10] = "Hello";
    strcat(buffer, ", World! How are you?");  // Bug: overflow!
    printf("%s\\n", buffer);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

int main(void) {
    char buffer[30] = "Hello";
    strncat(buffer, ", World! How are you?", sizeof(buffer) - strlen(buffer) - 1);
    printf("%s\\n", buffer);
    return 0;
}`,
      hints: [
        'buffer is only 10 chars but the result needs 26+ chars.',
        'Either increase buffer size or use strncat to limit the copy.',
        'strncat(dest, src, n) appends at most n chars and null-terminates.',
      ],
      concepts: ['buffer overflow', 'strncat', 'safe string operations'],
    },
    {
      id: 'c-str-14',
      title: 'Predict string operations',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the result of string operations.',
      skeleton: `#include <stdio.h>
#include <string.h>

int main(void) {
    char s[] = "abcdef";
    printf("%zu\\n", strlen(s));
    printf("%c\\n", s[strlen(s)]);
    printf("%d\\n", strcmp("abc", "abd"));
    printf("%s\\n", strchr(s, 'd'));
    return 0;
}`,
      solution: `6

-1
def`,
      hints: [
        'strlen("abcdef") = 6. s[6] is the null terminator (prints nothing visible).',
        'strcmp("abc","abd"): c < d, so result is negative (typically -1).',
        'strchr(s, \'d\') returns a pointer to the \'d\' in s, so printing it gives "def".',
      ],
      concepts: ['strlen', 'null terminator access', 'strcmp', 'strchr'],
    },
    {
      id: 'c-str-15',
      title: 'Custom reverse string',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that reverses a string in-place.',
      skeleton: `// Write void reverse_str(char *s) that reverses the string in-place.
// "Hello" -> "olleH"`,
      solution: `#include <stdio.h>
#include <string.h>

void reverse_str(char *s) {
    int len = strlen(s);
    for (int i = 0, j = len - 1; i < j; i++, j--) {
        char temp = s[i];
        s[i] = s[j];
        s[j] = temp;
    }
}

int main(void) {
    char s1[] = "Hello";
    reverse_str(s1);
    printf("%s\\n", s1);

    char s2[] = "racecar";
    reverse_str(s2);
    printf("%s\\n", s2);
    return 0;
}`,
      hints: [
        'Swap characters from both ends moving inward.',
        'Use strlen to find the length, then swap s[i] and s[j].',
        'Stop when i >= j.',
      ],
      concepts: ['string reversal', 'in-place modification', 'two-pointer'],
    },
    {
      id: 'c-str-16',
      title: 'Tokenize with strtok',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use strtok to split a string by delimiters.',
      skeleton: `#include <stdio.h>
#include <string.h>

int main(void) {
    char str[] = "one,two,three,four";
    char *token = __BLANK__(str, ",");

    while (token != __BLANK__) {
        printf("%s\\n", token);
        token = __BLANK__(NULL, ",");
    }
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

int main(void) {
    char str[] = "one,two,three,four";
    char *token = strtok(str, ",");

    while (token != NULL) {
        printf("%s\\n", token);
        token = strtok(NULL, ",");
    }
    return 0;
}`,
      hints: [
        'First call: strtok(str, ",") with the string.',
        'Subsequent calls: strtok(NULL, ",") to get the next token.',
        'Returns NULL when no more tokens are found.',
      ],
      concepts: ['strtok', 'string tokenization', 'delimiter splitting'],
    },
    {
      id: 'c-str-17',
      title: 'Sprintf formatting',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use sprintf to build a formatted string into a buffer.',
      skeleton: `// Write a function that takes a name and age, and builds
// a greeting string in a buffer using sprintf.
// void make_greeting(char *buf, size_t bufsize, const char *name, int age)
// Result: "Hello, Alice! You are 25 years old."`,
      solution: `#include <stdio.h>

void make_greeting(char *buf, size_t bufsize, const char *name, int age) {
    snprintf(buf, bufsize, "Hello, %s! You are %d years old.", name, age);
}

int main(void) {
    char greeting[100];
    make_greeting(greeting, sizeof(greeting), "Alice", 25);
    printf("%s\\n", greeting);
    return 0;
}`,
      hints: [
        'snprintf is safer than sprintf because it limits output size.',
        'snprintf(buf, size, format, ...) writes at most size-1 chars.',
        'It automatically null-terminates the result.',
      ],
      concepts: ['sprintf', 'snprintf', 'string formatting', 'buffer safety'],
    },
    {
      id: 'c-str-18',
      title: 'Fix strtok modification',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Fix the code that passes a string literal to strtok (which modifies the string).',
      skeleton: `#include <stdio.h>
#include <string.h>

int main(void) {
    char *str = "one,two,three";  // Bug: string literal is read-only!
    char *token = strtok(str, ",");

    while (token != NULL) {
        printf("%s\\n", token);
        token = strtok(NULL, ",");
    }
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

int main(void) {
    char str[] = "one,two,three";
    char *token = strtok(str, ",");

    while (token != NULL) {
        printf("%s\\n", token);
        token = strtok(NULL, ",");
    }
    return 0;
}`,
      hints: [
        'strtok modifies the string by replacing delimiters with \\0.',
        'String literals are read-only; modifying them is undefined behavior.',
        'Use char str[] = "..." to create a mutable copy.',
      ],
      concepts: ['string literal mutability', 'strtok modification', 'undefined behavior'],
    },
    {
      id: 'c-str-19',
      title: 'Refactor to snprintf',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor multiple strcat calls into a single snprintf call.',
      skeleton: `#include <stdio.h>
#include <string.h>

int main(void) {
    char result[100];
    int day = 15;
    int month = 3;
    int year = 2026;

    strcpy(result, "Date: ");
    char temp[20];
    sprintf(temp, "%02d", day);
    strcat(result, temp);
    strcat(result, "/");
    sprintf(temp, "%02d", month);
    strcat(result, temp);
    strcat(result, "/");
    sprintf(temp, "%d", year);
    strcat(result, temp);

    printf("%s\\n", result);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    char result[100];
    int day = 15;
    int month = 3;
    int year = 2026;

    snprintf(result, sizeof(result), "Date: %02d/%02d/%d", day, month, year);
    printf("%s\\n", result);
    return 0;
}`,
      hints: [
        'Multiple strcat/sprintf calls can be replaced by one snprintf.',
        'snprintf handles all the formatting in a single call.',
        'This is safer, cleaner, and more efficient.',
      ],
      concepts: ['snprintf', 'string building', 'refactoring'],
    },
    {
      id: 'c-str-20',
      title: 'Refactor to safer string functions',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor unsafe string operations to their bounded counterparts.',
      skeleton: `#include <stdio.h>
#include <string.h>

void greet(const char *name) {
    char buffer[20];
    strcpy(buffer, "Hello, ");
    strcat(buffer, name);
    strcat(buffer, "!");
    printf("%s\\n", buffer);
}

int main(void) {
    greet("Alice");
    greet("Bartholomew Reginald McFancypants III");  // overflow!
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

void greet(const char *name) {
    char buffer[20];
    snprintf(buffer, sizeof(buffer), "Hello, %s!", name);
    printf("%s\\n", buffer);
}

int main(void) {
    greet("Alice");
    greet("Bartholomew Reginald McFancypants III");
    return 0;
}`,
      hints: [
        'strcpy + strcat chains are prone to buffer overflow.',
        'snprintf automatically truncates and null-terminates.',
        'One snprintf call replaces multiple unsafe operations.',
      ],
      concepts: ['buffer overflow prevention', 'snprintf safety', 'bounded operations'],
    },
  ],
};
