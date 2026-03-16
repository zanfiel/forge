import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-ref',
  title: '06. References',
  explanation: `## References in C++

A reference is an alias for an existing variable. Once initialized, it always refers to the same object.

### Lvalue References
\`\`\`cpp
int x = 10;
int& ref = x;  // ref is an alias for x
ref = 20;      // x is now 20
\`\`\`

### Key Rules
- A reference **must** be initialized when declared
- A reference **cannot** be reseated (made to refer to a different object)
- A reference **cannot** be null

### const References
A const reference cannot modify the referred-to object:
\`\`\`cpp
int x = 10;
const int& cref = x;  // can read x through cref, but cannot modify
// cref = 20;  // ERROR
\`\`\`

Const references can also bind to temporaries (rvalues):
\`\`\`cpp
const int& ref = 42;  // OK -- extends the lifetime of the temporary
\`\`\`

### Reference Parameters (pass by reference)
\`\`\`cpp
void increment(int& value) {
    value += 1;  // modifies the caller's variable
}

int x = 5;
increment(x);  // x is now 6
\`\`\`

### Reference vs Copy
- Pass by value: function gets a copy, original is unchanged
- Pass by reference: function operates on the original
- Pass by const reference: function reads the original without copying, cannot modify

\`\`\`cpp
void readOnly(const std::string& s);  // no copy, no modification
void modify(std::string& s);          // no copy, can modify
void copyIt(std::string s);           // makes a copy
\`\`\`

### Dangling References
Never return a reference to a local variable:
\`\`\`cpp
int& bad() {
    int local = 42;
    return local;  // DANGLING -- local is destroyed when function returns
}
\`\`\`
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-ref-1',
      title: 'Declare a reference',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the syntax to declare a reference to the variable x.',
      skeleton: `#include <iostream>

int main() {
    int x = 42;
    int__BLANK__ ref = x;
    std::cout << ref << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int x = 42;
    int& ref = x;
    std::cout << ref << std::endl;
    return 0;
}`,
      hints: [
        'A reference is declared by adding a symbol after the type.',
        'It creates an alias, not a copy.',
        'The symbol is `&`.',
      ],
      concepts: ['lvalue reference', 'alias'],
    },
    {
      id: 'cpp-ref-2',
      title: 'Const reference',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the qualifiers to make a read-only reference to x.',
      skeleton: `#include <iostream>

int main() {
    int x = 100;
    __BLANK__ int& cref = x;
    std::cout << cref << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int x = 100;
    const int& cref = x;
    std::cout << cref << std::endl;
    return 0;
}`,
      hints: [
        'You want a reference that cannot modify the original.',
        'Add the keyword that prevents modification.',
        'The keyword is `const`.',
      ],
      concepts: ['const reference', 'read-only'],
    },
    {
      id: 'cpp-ref-3',
      title: 'Reference parameter',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the parameter declaration so the function modifies the caller\'s variable.',
      skeleton: `#include <iostream>

void doubleIt(__BLANK__ value) {
    value *= 2;
}

int main() {
    int x = 5;
    doubleIt(x);
    std::cout << x << std::endl;  // 10
    return 0;
}`,
      solution: `#include <iostream>

void doubleIt(int& value) {
    value *= 2;
}

int main() {
    int x = 5;
    doubleIt(x);
    std::cout << x << std::endl;  // 10
    return 0;
}`,
      hints: [
        'To modify the caller\'s variable, pass by reference.',
        'Add & after the type in the parameter.',
        'The parameter is `int& value`.',
      ],
      concepts: ['pass by reference', 'reference parameter'],
    },
    {
      id: 'cpp-ref-4',
      title: 'Const reference parameter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the parameter type to pass a string efficiently without allowing modification.',
      skeleton: `#include <iostream>
#include <string>

void print(__BLANK__ message) {
    std::cout << message << std::endl;
}

int main() {
    std::string msg = "Hello, World!";
    print(msg);
    return 0;
}`,
      solution: `#include <iostream>
#include <string>

void print(const std::string& message) {
    std::cout << message << std::endl;
}

int main() {
    std::string msg = "Hello, World!";
    print(msg);
    return 0;
}`,
      hints: [
        'You want to avoid copying the string but also prevent modification.',
        'Use const with a reference.',
        'The type is `const std::string&`.',
      ],
      concepts: ['const reference', 'efficient parameter passing'],
    },
    {
      id: 'cpp-ref-5',
      title: 'Reference to const binding to rvalue',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the declaration that allows a reference to bind to a temporary value (rvalue).',
      skeleton: `#include <iostream>

int main() {
    __BLANK__ ref = 42;
    std::cout << ref << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    const int& ref = 42;
    std::cout << ref << std::endl;
    return 0;
}`,
      hints: [
        'A plain lvalue reference cannot bind to a temporary.',
        'Adding const allows the reference to bind to rvalues.',
        'const int& ref = 42;',
      ],
      concepts: ['const reference', 'rvalue binding', 'lifetime extension'],
    },
    {
      id: 'cpp-ref-6',
      title: 'Reference return type',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fill in the return type so the function returns a reference to the larger element.',
      skeleton: `#include <iostream>

__BLANK__ larger(int& a, int& b) {
    return (a > b) ? a : b;
}

int main() {
    int x = 10, y = 20;
    larger(x, y) = 99;
    std::cout << x << " " << y << std::endl;  // 10 99
    return 0;
}`,
      solution: `#include <iostream>

int& larger(int& a, int& b) {
    return (a > b) ? a : b;
}

int main() {
    int x = 10, y = 20;
    larger(x, y) = 99;
    std::cout << x << " " << y << std::endl;  // 10 99
    return 0;
}`,
      hints: [
        'The function must return a reference so the caller can assign to it.',
        'The return type should be a reference to int.',
        'The return type is `int&`.',
      ],
      concepts: ['reference return', 'lvalue return'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-ref-7',
      title: 'Swap using references',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a function swapValues that takes two int references and swaps their values. Demonstrate by swapping 10 and 20 in main.',
      skeleton: `#include <iostream>

// Write swapValues function here

int main() {
    int a = 10, b = 20;
    swapValues(a, b);
    std::cout << a << " " << b << std::endl;  // 20 10
    return 0;
}`,
      solution: `#include <iostream>

void swapValues(int& x, int& y) {
    int temp = x;
    x = y;
    y = temp;
}

int main() {
    int a = 10, b = 20;
    swapValues(a, b);
    std::cout << a << " " << b << std::endl;  // 20 10
    return 0;
}`,
      hints: [
        'Parameters must be references to modify the caller\'s variables.',
        'Use a temporary variable to hold one value during the swap.',
        'void swapValues(int& x, int& y) { int temp = x; x = y; y = temp; }',
      ],
      concepts: ['pass by reference', 'swap'],
    },
    {
      id: 'cpp-ref-8',
      title: 'Increment and return',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function incrementAndReturn that takes an int reference, increments it by 1, and returns the new value. Call it from main and print both the returned value and the original variable.',
      skeleton: `#include <iostream>

// Write incrementAndReturn here

int main() {
    int x = 10;
    int result = incrementAndReturn(x);
    std::cout << result << " " << x << std::endl;  // 11 11
    return 0;
}`,
      solution: `#include <iostream>

int incrementAndReturn(int& value) {
    ++value;
    return value;
}

int main() {
    int x = 10;
    int result = incrementAndReturn(x);
    std::cout << result << " " << x << std::endl;  // 11 11
    return 0;
}`,
      hints: [
        'Take the parameter by reference to modify the original.',
        'Increment, then return the new value.',
        'int incrementAndReturn(int& value) { ++value; return value; }',
      ],
      concepts: ['reference parameter', 'return value'],
    },
    {
      id: 'cpp-ref-9',
      title: 'Multiple return values via references',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function divmod that takes two ints (numerator, denominator) and two int references (quotient, remainder). It computes the quotient and remainder of integer division and stores them in the reference parameters.',
      skeleton: `#include <iostream>

// Write divmod here

int main() {
    int q, r;
    divmod(17, 5, q, r);
    std::cout << q << " " << r << std::endl;  // 3 2
    return 0;
}`,
      solution: `#include <iostream>

void divmod(int num, int den, int& quotient, int& remainder) {
    quotient = num / den;
    remainder = num % den;
}

int main() {
    int q, r;
    divmod(17, 5, q, r);
    std::cout << q << " " << r << std::endl;  // 3 2
    return 0;
}`,
      hints: [
        'Use reference parameters as "output" parameters.',
        'Compute quotient with / and remainder with %.',
        'void divmod(int num, int den, int& quotient, int& remainder)',
      ],
      concepts: ['output parameters', 'multiple return values'],
    },
    {
      id: 'cpp-ref-10',
      title: 'Find min and max via references',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function findMinMax that takes a C-style array and its size, plus two int references for min and max. It finds the minimum and maximum values in the array.',
      skeleton: `#include <iostream>

// Write findMinMax here

int main() {
    int arr[] = {5, 2, 8, 1, 9, 3};
    int minVal, maxVal;
    findMinMax(arr, 6, minVal, maxVal);
    std::cout << minVal << " " << maxVal << std::endl;  // 1 9
    return 0;
}`,
      solution: `#include <iostream>

void findMinMax(int arr[], int size, int& minVal, int& maxVal) {
    minVal = arr[0];
    maxVal = arr[0];
    for (int i = 1; i < size; ++i) {
        if (arr[i] < minVal) minVal = arr[i];
        if (arr[i] > maxVal) maxVal = arr[i];
    }
}

int main() {
    int arr[] = {5, 2, 8, 1, 9, 3};
    int minVal, maxVal;
    findMinMax(arr, 6, minVal, maxVal);
    std::cout << minVal << " " << maxVal << std::endl;  // 1 9
    return 0;
}`,
      hints: [
        'Initialize min and max to the first element.',
        'Loop through the rest and update min/max as needed.',
        'Use reference parameters to return both values.',
      ],
      concepts: ['output parameters', 'array traversal', 'min/max'],
    },
    {
      id: 'cpp-ref-11',
      title: 'Chained reference returns',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function clampRef that takes an int reference, a min, and a max. If the value is out of range, clamp it. Return a reference to the original variable so calls can be chained. Demonstrate: clampRef(x, 0, 100);',
      skeleton: `#include <iostream>

// Write clampRef here

int main() {
    int x = 150;
    clampRef(x, 0, 100);
    std::cout << x << std::endl;  // 100
    return 0;
}`,
      solution: `#include <iostream>

int& clampRef(int& value, int lo, int hi) {
    if (value < lo) value = lo;
    if (value > hi) value = hi;
    return value;
}

int main() {
    int x = 150;
    clampRef(x, 0, 100);
    std::cout << x << std::endl;  // 100
    return 0;
}`,
      hints: [
        'Take value by reference and return by reference.',
        'Check if value is below lo or above hi and adjust.',
        'int& clampRef(int& value, int lo, int hi)',
      ],
      concepts: ['reference return', 'clamping', 'chaining'],
    },
    {
      id: 'cpp-ref-12',
      title: 'Const-correct string processing',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write two functions: countVowels takes a const string reference and returns the count of vowels. toUpper takes a non-const string reference and converts it to uppercase in-place. Demonstrate both in main.',
      skeleton: `#include <iostream>
#include <string>
#include <cctype>

// Write countVowels and toUpper here

int main() {
    std::string text = "Hello World";
    std::cout << countVowels(text) << std::endl;  // 3
    toUpper(text);
    std::cout << text << std::endl;  // HELLO WORLD
    return 0;
}`,
      solution: `#include <iostream>
#include <string>
#include <cctype>

int countVowels(const std::string& s) {
    int count = 0;
    for (char c : s) {
        char lower = std::tolower(c);
        if (lower == 'a' || lower == 'e' || lower == 'i' || lower == 'o' || lower == 'u') {
            ++count;
        }
    }
    return count;
}

void toUpper(std::string& s) {
    for (char& c : s) {
        c = std::toupper(c);
    }
}

int main() {
    std::string text = "Hello World";
    std::cout << countVowels(text) << std::endl;  // 3
    toUpper(text);
    std::cout << text << std::endl;  // HELLO WORLD
    return 0;
}`,
      hints: [
        'countVowels does not modify the string, so use const reference.',
        'toUpper modifies the string in place, so use non-const reference.',
        'Use char& in the range-for loop of toUpper to modify characters.',
      ],
      concepts: ['const correctness', 'reference parameters', 'string processing'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-ref-13',
      title: 'Fix dangling reference',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'This function returns a reference to a local variable, creating a dangling reference. Fix it.',
      skeleton: `#include <iostream>

int& createValue() {
    int value = 42;
    return value;  // Bug: dangling reference
}

int main() {
    int& ref = createValue();
    std::cout << ref << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int createValue() {
    int value = 42;
    return value;
}

int main() {
    int val = createValue();
    std::cout << val << std::endl;
    return 0;
}`,
      hints: [
        'Local variables are destroyed when the function returns.',
        'A reference to a destroyed variable is dangling (undefined behavior).',
        'Return by value instead: int createValue() and int val = createValue();',
      ],
      concepts: ['dangling reference', 'return by value', 'lifetime'],
    },
    {
      id: 'cpp-ref-14',
      title: 'Fix missing reference on parameter',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'This function is supposed to triple the value but does not affect the caller\'s variable. Fix it.',
      skeleton: `#include <iostream>

void triple(int value) {
    value *= 3;
}

int main() {
    int x = 10;
    triple(x);
    std::cout << x << std::endl;  // Expected: 30, Actual: 10
    return 0;
}`,
      solution: `#include <iostream>

void triple(int& value) {
    value *= 3;
}

int main() {
    int x = 10;
    triple(x);
    std::cout << x << std::endl;  // 30
    return 0;
}`,
      hints: [
        'The parameter is passed by value, so a copy is modified.',
        'The original variable in main is not affected.',
        'Change the parameter to int& value.',
      ],
      concepts: ['pass by value vs reference'],
    },
    {
      id: 'cpp-ref-15',
      title: 'Fix uninitialized reference',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'This code tries to declare a reference without initializing it. Fix the error.',
      skeleton: `#include <iostream>

int main() {
    int x = 10;
    int& ref;   // Bug: reference must be initialized
    ref = x;
    std::cout << ref << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int x = 10;
    int& ref = x;
    std::cout << ref << std::endl;
    return 0;
}`,
      hints: [
        'References must be initialized at the point of declaration.',
        'You cannot declare a reference and assign it later.',
        'Combine: int& ref = x;',
      ],
      concepts: ['reference initialization', 'must-initialize'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-ref-16',
      title: 'Predict reference modification',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

int main() {
    int a = 10;
    int& b = a;
    b = 25;
    std::cout << a << " " << b << std::endl;
    return 0;
}`,
      solution: `25 25`,
      hints: [
        'b is a reference (alias) for a.',
        'Modifying b also modifies a.',
        'Both a and b are 25.',
      ],
      concepts: ['reference alias', 'shared identity'],
    },
    {
      id: 'cpp-ref-17',
      title: 'Predict pass-by-reference behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

void addTen(int& x) {
    x += 10;
}

void addTwenty(int y) {
    y += 20;
}

int main() {
    int val = 5;
    addTen(val);
    addTwenty(val);
    std::cout << val << std::endl;
    return 0;
}`,
      solution: `15`,
      hints: [
        'addTen takes by reference: val becomes 5 + 10 = 15.',
        'addTwenty takes by value: the copy becomes 35 but val is unchanged.',
        'val is 15 after both calls.',
      ],
      concepts: ['pass by reference', 'pass by value'],
    },
    {
      id: 'cpp-ref-18',
      title: 'Predict const reference',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

void show(const int& x) {
    std::cout << x << std::endl;
}

int main() {
    int a = 42;
    show(a);
    show(100);
    return 0;
}`,
      solution: `42
100`,
      hints: [
        'Const references can bind to both lvalues and rvalues.',
        'show(a) prints 42, show(100) prints 100.',
        'Both calls work because the parameter is const int&.',
      ],
      concepts: ['const reference', 'rvalue binding'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-ref-19',
      title: 'Replace pass-by-value with const reference',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor the function parameters to use const references instead of pass-by-value for the strings, avoiding unnecessary copies.',
      skeleton: `#include <iostream>
#include <string>

void printFullName(std::string first, std::string last) {
    std::cout << first << " " << last << std::endl;
}

int main() {
    std::string f = "John";
    std::string l = "Doe";
    printFullName(f, l);
    return 0;
}`,
      solution: `#include <iostream>
#include <string>

void printFullName(const std::string& first, const std::string& last) {
    std::cout << first << " " << last << std::endl;
}

int main() {
    std::string f = "John";
    std::string l = "Doe";
    printFullName(f, l);
    return 0;
}`,
      hints: [
        'Passing strings by value creates copies, which is wasteful.',
        'Since the function only reads them, use const references.',
        'Change to const std::string& for both parameters.',
      ],
      concepts: ['const reference', 'avoiding copies', 'efficiency'],
    },
    {
      id: 'cpp-ref-20',
      title: 'Replace output parameters with struct return',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Replace the output reference parameters with a struct return value for clarity.',
      skeleton: `#include <iostream>

void getStats(int arr[], int size, int& min, int& max, double& avg) {
    min = arr[0];
    max = arr[0];
    int sum = arr[0];
    for (int i = 1; i < size; ++i) {
        if (arr[i] < min) min = arr[i];
        if (arr[i] > max) max = arr[i];
        sum += arr[i];
    }
    avg = static_cast<double>(sum) / size;
}

int main() {
    int data[] = {4, 7, 2, 9, 1};
    int mn, mx;
    double av;
    getStats(data, 5, mn, mx, av);
    std::cout << mn << " " << mx << " " << av << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

struct Stats {
    int min;
    int max;
    double avg;
};

Stats getStats(int arr[], int size) {
    Stats s;
    s.min = arr[0];
    s.max = arr[0];
    int sum = arr[0];
    for (int i = 1; i < size; ++i) {
        if (arr[i] < s.min) s.min = arr[i];
        if (arr[i] > s.max) s.max = arr[i];
        sum += arr[i];
    }
    s.avg = static_cast<double>(sum) / size;
    return s;
}

int main() {
    int data[] = {4, 7, 2, 9, 1};
    Stats st = getStats(data, 5);
    std::cout << st.min << " " << st.max << " " << st.avg << std::endl;
    return 0;
}`,
      hints: [
        'Create a struct to bundle the return values together.',
        'Return the struct by value instead of using output parameters.',
        'This is cleaner and avoids the need for pre-declared variables.',
      ],
      concepts: ['struct return', 'output parameters', 'refactoring'],
    },
  ],
};
