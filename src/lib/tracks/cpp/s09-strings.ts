import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-str',
  title: '09. Strings',
  explanation: `## Strings in C++

C++ offers two main string types: the C-style null-terminated character array and the safer \`std::string\` class.

### std::string
\`\`\`cpp
#include <string>
std::string greeting = "Hello";
std::string name("World");
std::string empty;  // empty string ""
\`\`\`

### Common Operations
\`\`\`cpp
std::string s = "Hello";
s.length();       // 5 (same as s.size())
s.empty();        // false
s += " World";    // concatenation: "Hello World"
s[0];             // 'H'
s.at(1);          // 'e' (bounds-checked)
\`\`\`

### Useful Methods
\`\`\`cpp
s.substr(0, 5);            // "Hello" -- substring from pos 0, length 5
s.find("World");           // 6 -- index of first occurrence
s.find("xyz");             // std::string::npos -- not found
s.compare("Hello World");  // 0 if equal
s.append("!");             // "Hello World!"
s.insert(5, ",");          // "Hello, World!"
s.erase(5, 1);             // "Hello World!"
s.replace(0, 5, "Hi");    // "Hi World!"
\`\`\`

### C-Strings
Null-terminated character arrays:
\`\`\`cpp
const char* cstr = "Hello";
char arr[] = "Hello";  // array of 6 chars (includes '\\0')
\`\`\`

### Conversions
\`\`\`cpp
std::string s = "Hello";
const char* c = s.c_str();     // string -> C-string
std::string s2(c);              // C-string -> string
std::string num = std::to_string(42);  // int -> string
int n = std::stoi("42");              // string -> int
double d = std::stod("3.14");         // string -> double
\`\`\`

### std::string_view (C++17)
A lightweight, non-owning view into a string:
\`\`\`cpp
#include <string_view>
void print(std::string_view sv) {
    std::cout << sv << std::endl;
}
// Accepts std::string, C-strings, and string literals without copying
\`\`\`
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-str-1',
      title: 'String concatenation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the operator to concatenate two strings.',
      skeleton: `#include <iostream>
#include <string>

int main() {
    std::string first = "Hello";
    std::string second = " World";
    std::string result = first __BLANK__ second;
    std::cout << result << std::endl;
    return 0;
}`,
      solution: `#include <iostream>
#include <string>

int main() {
    std::string first = "Hello";
    std::string second = " World";
    std::string result = first + second;
    std::cout << result << std::endl;
    return 0;
}`,
      hints: [
        'std::string supports an operator that joins two strings.',
        'It is the same symbol used for arithmetic addition.',
        'The operator is `+`.',
      ],
      concepts: ['string concatenation', 'operator+'],
    },
    {
      id: 'cpp-str-2',
      title: 'String length',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the method that returns the number of characters in a string.',
      skeleton: `#include <iostream>
#include <string>

int main() {
    std::string msg = "Hello";
    std::cout << msg.__BLANK__() << std::endl;  // 5
    return 0;
}`,
      solution: `#include <iostream>
#include <string>

int main() {
    std::string msg = "Hello";
    std::cout << msg.length() << std::endl;  // 5
    return 0;
}`,
      hints: [
        'This method returns how many characters the string contains.',
        'It is equivalent to .size().',
        'The method is `length`.',
      ],
      concepts: ['string length', 'size'],
    },
    {
      id: 'cpp-str-3',
      title: 'Substring extraction',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the method to extract a substring starting at position 6 with length 5.',
      skeleton: `#include <iostream>
#include <string>

int main() {
    std::string s = "Hello World";
    std::string word = s.__BLANK__(6, 5);
    std::cout << word << std::endl;  // "World"
    return 0;
}`,
      solution: `#include <iostream>
#include <string>

int main() {
    std::string s = "Hello World";
    std::string word = s.substr(6, 5);
    std::cout << word << std::endl;  // "World"
    return 0;
}`,
      hints: [
        'This method takes a starting position and a length.',
        'It returns a new string with the extracted characters.',
        'The method is `substr`.',
      ],
      concepts: ['substr', 'substring'],
    },
    {
      id: 'cpp-str-4',
      title: 'String find',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the method that searches for a substring and returns its position.',
      skeleton: `#include <iostream>
#include <string>

int main() {
    std::string s = "The quick brown fox";
    std::size_t pos = s.__BLANK__("brown");
    std::cout << pos << std::endl;  // 10
    return 0;
}`,
      solution: `#include <iostream>
#include <string>

int main() {
    std::string s = "The quick brown fox";
    std::size_t pos = s.find("brown");
    std::cout << pos << std::endl;  // 10
    return 0;
}`,
      hints: [
        'This method searches for the first occurrence of a substring.',
        'It returns npos if not found.',
        'The method is `find`.',
      ],
      concepts: ['string find', 'search'],
    },
    {
      id: 'cpp-str-5',
      title: 'String to integer conversion',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the function that converts a string to an integer.',
      skeleton: `#include <iostream>
#include <string>

int main() {
    std::string numStr = "42";
    int num = std::__BLANK__(numStr);
    std::cout << num + 8 << std::endl;  // 50
    return 0;
}`,
      solution: `#include <iostream>
#include <string>

int main() {
    std::string numStr = "42";
    int num = std::stoi(numStr);
    std::cout << num + 8 << std::endl;  // 50
    return 0;
}`,
      hints: [
        'This function stands for "string to integer".',
        'It parses the string and returns an int.',
        'The function is `stoi`.',
      ],
      concepts: ['stoi', 'string conversion'],
    },
    {
      id: 'cpp-str-6',
      title: 'Convert number to string',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the function that converts a number to a std::string.',
      skeleton: `#include <iostream>
#include <string>

int main() {
    int value = 100;
    std::string s = std::__BLANK__(value);
    std::cout << "Value: " + s << std::endl;
    return 0;
}`,
      solution: `#include <iostream>
#include <string>

int main() {
    int value = 100;
    std::string s = std::to_string(value);
    std::cout << "Value: " + s << std::endl;
    return 0;
}`,
      hints: [
        'This function converts a numeric value to a string.',
        'It works with int, double, and other numeric types.',
        'The function is `to_string`.',
      ],
      concepts: ['to_string', 'number to string'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-str-7',
      title: 'Count character occurrences',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a function countChar that takes a const std::string reference and a char, and returns how many times that character appears in the string.',
      skeleton: `#include <iostream>
#include <string>

// Write countChar here

int main() {
    std::string text = "hello world";
    std::cout << countChar(text, 'l') << std::endl;  // 3
    return 0;
}`,
      solution: `#include <iostream>
#include <string>

int countChar(const std::string& s, char c) {
    int count = 0;
    for (char ch : s) {
        if (ch == c) ++count;
    }
    return count;
}

int main() {
    std::string text = "hello world";
    std::cout << countChar(text, 'l') << std::endl;  // 3
    return 0;
}`,
      hints: [
        'Loop through each character and compare with the target.',
        'Use a range-based for loop for simplicity.',
        'Pass the string by const reference for efficiency.',
      ],
      concepts: ['string iteration', 'character counting'],
    },
    {
      id: 'cpp-str-8',
      title: 'Reverse a string',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a function reverseStr that takes a std::string and returns a new string with the characters in reverse order.',
      skeleton: `#include <iostream>
#include <string>

// Write reverseStr here

int main() {
    std::cout << reverseStr("Hello") << std::endl;  // "olleH"
    return 0;
}`,
      solution: `#include <iostream>
#include <string>

std::string reverseStr(const std::string& s) {
    std::string result;
    for (int i = static_cast<int>(s.length()) - 1; i >= 0; --i) {
        result += s[i];
    }
    return result;
}

int main() {
    std::cout << reverseStr("Hello") << std::endl;  // "olleH"
    return 0;
}`,
      hints: [
        'Loop backwards from the last character to the first.',
        'Append each character to a new string.',
        'You could also use std::string(s.rbegin(), s.rend()).',
      ],
      concepts: ['string reversal', 'backward iteration'],
    },
    {
      id: 'cpp-str-9',
      title: 'Check if palindrome',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function isPalindrome that checks if a string reads the same forwards and backwards (case-sensitive). Return true or false.',
      skeleton: `#include <iostream>
#include <string>

// Write isPalindrome here

int main() {
    std::cout << std::boolalpha;
    std::cout << isPalindrome("racecar") << std::endl;  // true
    std::cout << isPalindrome("hello") << std::endl;    // false
    return 0;
}`,
      solution: `#include <iostream>
#include <string>

bool isPalindrome(const std::string& s) {
    int left = 0;
    int right = static_cast<int>(s.length()) - 1;
    while (left < right) {
        if (s[left] != s[right]) return false;
        ++left;
        --right;
    }
    return true;
}

int main() {
    std::cout << std::boolalpha;
    std::cout << isPalindrome("racecar") << std::endl;  // true
    std::cout << isPalindrome("hello") << std::endl;    // false
    return 0;
}`,
      hints: [
        'Compare characters from both ends moving inward.',
        'If any pair differs, it is not a palindrome.',
        'Use two indices: left starting at 0, right at length-1.',
      ],
      concepts: ['palindrome', 'two-pointer', 'string comparison'],
    },
    {
      id: 'cpp-str-10',
      title: 'Split string by delimiter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a program that splits a comma-separated string into individual words and prints each on a new line. Use std::string::find and std::string::substr.',
      skeleton: `#include <iostream>
#include <string>

int main() {
    std::string csv = "apple,banana,cherry,date";
    // Split by ',' and print each word
    return 0;
}`,
      solution: `#include <iostream>
#include <string>

int main() {
    std::string csv = "apple,banana,cherry,date";
    std::size_t start = 0;
    std::size_t end = csv.find(',');
    while (end != std::string::npos) {
        std::cout << csv.substr(start, end - start) << std::endl;
        start = end + 1;
        end = csv.find(',', start);
    }
    std::cout << csv.substr(start) << std::endl;
    return 0;
}`,
      hints: [
        'Use find to locate each comma, substr to extract the word before it.',
        'Update the start position after each comma.',
        'After the loop, print the remaining substring.',
      ],
      concepts: ['string splitting', 'find', 'substr'],
    },
    {
      id: 'cpp-str-11',
      title: 'C-string to std::string and back',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a program that: creates a C-string, converts it to std::string, appends " World", converts back to C-string, and prints using printf-style (std::cout with c_str()).',
      skeleton: `#include <iostream>
#include <string>

int main() {
    // Start with C-string "Hello"
    // Convert to std::string, append, convert back, print
    return 0;
}`,
      solution: `#include <iostream>
#include <string>

int main() {
    const char* cstr = "Hello";
    std::string str(cstr);
    str += " World";
    const char* result = str.c_str();
    std::cout << result << std::endl;
    return 0;
}`,
      hints: [
        'Construct std::string from a C-string using the constructor.',
        'Use += to append.',
        'Use .c_str() to get the C-string back.',
      ],
      concepts: ['C-string', 'c_str()', 'string conversion'],
    },
    {
      id: 'cpp-str-12',
      title: 'string_view function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function countWords that takes a std::string_view and returns the number of space-separated words. Test with both a std::string and a string literal.',
      skeleton: `#include <iostream>
#include <string>
#include <string_view>

// Write countWords here

int main() {
    std::string s = "The quick brown fox";
    std::cout << countWords(s) << std::endl;        // 4
    std::cout << countWords("Hello World") << std::endl;  // 2
    return 0;
}`,
      solution: `#include <iostream>
#include <string>
#include <string_view>

int countWords(std::string_view sv) {
    if (sv.empty()) return 0;
    int count = 0;
    bool inWord = false;
    for (char c : sv) {
        if (c != ' ') {
            if (!inWord) {
                ++count;
                inWord = true;
            }
        } else {
            inWord = false;
        }
    }
    return count;
}

int main() {
    std::string s = "The quick brown fox";
    std::cout << countWords(s) << std::endl;        // 4
    std::cout << countWords("Hello World") << std::endl;  // 2
    return 0;
}`,
      hints: [
        'string_view accepts both std::string and C-strings without copying.',
        'Track whether you are inside a word or in whitespace.',
        'Count transitions from space to non-space.',
      ],
      concepts: ['string_view', 'word counting'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-str-13',
      title: 'Fix string comparison with ==',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'This code compares C-strings with ==, which compares pointers. Fix it to compare contents.',
      skeleton: `#include <iostream>
#include <cstring>

int main() {
    char a[] = "hello";
    char b[] = "hello";
    if (a == b) {  // Bug: compares pointers, not contents
        std::cout << "equal" << std::endl;
    } else {
        std::cout << "not equal" << std::endl;
    }
    return 0;
}`,
      solution: `#include <iostream>
#include <cstring>

int main() {
    char a[] = "hello";
    char b[] = "hello";
    if (std::strcmp(a, b) == 0) {
        std::cout << "equal" << std::endl;
    } else {
        std::cout << "not equal" << std::endl;
    }
    return 0;
}`,
      hints: [
        'Using == on C-style arrays compares addresses, not contents.',
        'Use a C library function to compare character by character.',
        'std::strcmp(a, b) == 0 means the strings are equal.',
      ],
      concepts: ['C-string comparison', 'strcmp', 'pointer comparison'],
    },
    {
      id: 'cpp-str-14',
      title: 'Fix npos check',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'This code does not properly check if find() failed. Fix the comparison.',
      skeleton: `#include <iostream>
#include <string>

int main() {
    std::string s = "Hello World";
    int pos = s.find("xyz");  // Bug: should use size_t, and check npos
    if (pos >= 0) {
        std::cout << "Found at " << pos << std::endl;
    } else {
        std::cout << "Not found" << std::endl;
    }
    return 0;
}`,
      solution: `#include <iostream>
#include <string>

int main() {
    std::string s = "Hello World";
    std::size_t pos = s.find("xyz");
    if (pos != std::string::npos) {
        std::cout << "Found at " << pos << std::endl;
    } else {
        std::cout << "Not found" << std::endl;
    }
    return 0;
}`,
      hints: [
        'find() returns std::string::npos (a large unsigned value) when not found.',
        'Storing it in int and checking >= 0 does not work correctly.',
        'Use std::size_t and compare with std::string::npos.',
      ],
      concepts: ['string::npos', 'find', 'size_t'],
    },
    {
      id: 'cpp-str-15',
      title: 'Fix dangling c_str() pointer',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'This code stores a c_str() pointer from a temporary string that is immediately destroyed. Fix it.',
      skeleton: `#include <iostream>
#include <string>

const char* makeGreeting(const std::string& name) {
    std::string result = "Hello, " + name + "!";
    return result.c_str();  // Bug: result is destroyed, pointer dangles
}

int main() {
    const char* msg = makeGreeting("Alice");
    std::cout << msg << std::endl;
    return 0;
}`,
      solution: `#include <iostream>
#include <string>

std::string makeGreeting(const std::string& name) {
    return "Hello, " + name + "!";
}

int main() {
    std::string msg = makeGreeting("Alice");
    std::cout << msg << std::endl;
    return 0;
}`,
      hints: [
        'c_str() returns a pointer to internal storage of the string object.',
        'When the string is destroyed, the pointer dangles.',
        'Return std::string by value instead of const char*.',
      ],
      concepts: ['dangling pointer', 'c_str()', 'return by value'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-str-16',
      title: 'Predict string concatenation',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>
#include <string>

int main() {
    std::string a = "Hello";
    std::string b = a;
    b += "!";
    std::cout << a << " " << b << std::endl;
    return 0;
}`,
      solution: `Hello Hello!`,
      hints: [
        'b is a copy of a, not a reference.',
        'Modifying b does not affect a.',
        'a is "Hello", b is "Hello!".',
      ],
      concepts: ['string copy', 'value semantics'],
    },
    {
      id: 'cpp-str-17',
      title: 'Predict substr behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>
#include <string>

int main() {
    std::string s = "programming";
    std::cout << s.substr(3, 4) << std::endl;
    std::cout << s[0] << s[s.length() - 1] << std::endl;
    return 0;
}`,
      solution: `gram
pg`,
      hints: [
        'substr(3, 4) starts at index 3 and takes 4 characters.',
        '"programming" from index 3 for 4 chars: "gram".',
        's[0] is \'p\', s[10] is \'g\'. Output: pg.',
      ],
      concepts: ['substr', 'string indexing'],
    },
    {
      id: 'cpp-str-18',
      title: 'Predict find result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>
#include <string>

int main() {
    std::string s = "abcabc";
    std::cout << s.find("bc") << std::endl;
    std::cout << s.find("bc", 2) << std::endl;
    return 0;
}`,
      solution: `1
4`,
      hints: [
        'find returns the index of the first occurrence.',
        '"bc" first appears at index 1.',
        'find("bc", 2) starts searching from index 2, finding "bc" at index 4.',
      ],
      concepts: ['find', 'search from position'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-str-19',
      title: 'Replace C-strings with std::string',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor the code to use std::string instead of C-style character arrays and string functions.',
      skeleton: `#include <iostream>
#include <cstring>

int main() {
    char greeting[50];
    char name[] = "World";
    std::strcpy(greeting, "Hello, ");
    std::strcat(greeting, name);
    std::strcat(greeting, "!");
    std::cout << greeting << std::endl;
    std::cout << "Length: " << std::strlen(greeting) << std::endl;
    return 0;
}`,
      solution: `#include <iostream>
#include <string>

int main() {
    std::string name = "World";
    std::string greeting = "Hello, " + name + "!";
    std::cout << greeting << std::endl;
    std::cout << "Length: " << greeting.length() << std::endl;
    return 0;
}`,
      hints: [
        'Replace char arrays with std::string.',
        'Use + for concatenation instead of strcat/strcpy.',
        'Use .length() instead of strlen.',
      ],
      concepts: ['std::string', 'modern C++', 'safe strings'],
    },
    {
      id: 'cpp-str-20',
      title: 'Replace const string& with string_view',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor the function parameters from const std::string& to std::string_view since the functions only read from the string.',
      skeleton: `#include <iostream>
#include <string>

bool startsWith(const std::string& s, const std::string& prefix) {
    if (prefix.length() > s.length()) return false;
    return s.substr(0, prefix.length()) == prefix;
}

bool endsWith(const std::string& s, const std::string& suffix) {
    if (suffix.length() > s.length()) return false;
    return s.substr(s.length() - suffix.length()) == suffix;
}

int main() {
    std::string text = "Hello World";
    std::cout << std::boolalpha;
    std::cout << startsWith(text, "Hello") << std::endl;   // true
    std::cout << endsWith(text, "World") << std::endl;     // true
    return 0;
}`,
      solution: `#include <iostream>
#include <string>
#include <string_view>

bool startsWith(std::string_view s, std::string_view prefix) {
    if (prefix.length() > s.length()) return false;
    return s.substr(0, prefix.length()) == prefix;
}

bool endsWith(std::string_view s, std::string_view suffix) {
    if (suffix.length() > s.length()) return false;
    return s.substr(s.length() - suffix.length()) == suffix;
}

int main() {
    std::string text = "Hello World";
    std::cout << std::boolalpha;
    std::cout << startsWith(text, "Hello") << std::endl;   // true
    std::cout << endsWith(text, "World") << std::endl;     // true
    return 0;
}`,
      hints: [
        'string_view is more flexible than const string& -- it accepts string literals without allocation.',
        'Replace const std::string& with std::string_view.',
        'Include <string_view> and update both function signatures.',
      ],
      concepts: ['string_view', 'zero-copy', 'refactoring'],
    },
  ],
};
