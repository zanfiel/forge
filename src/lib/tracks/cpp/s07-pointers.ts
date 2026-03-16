import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-ptr',
  title: '07. Pointers',
  explanation: `## Pointers in C++

A pointer is a variable that stores the memory address of another variable.

### Pointer Declaration and Initialization
\`\`\`cpp
int x = 42;
int* ptr = &x;   // ptr holds the address of x
\`\`\`

### Dereferencing
Use \`*\` to access the value at the address a pointer holds:
\`\`\`cpp
std::cout << *ptr;  // prints 42
*ptr = 100;         // x is now 100
\`\`\`

### nullptr
A pointer that does not point to anything should be set to \`nullptr\`:
\`\`\`cpp
int* p = nullptr;
if (p != nullptr) {
    // safe to dereference
}
\`\`\`

### Pointer Arithmetic
Pointers can be incremented/decremented to navigate through contiguous memory:
\`\`\`cpp
int arr[] = {10, 20, 30};
int* p = arr;       // points to arr[0]
p++;                // now points to arr[1]
std::cout << *p;    // 20
\`\`\`

### void Pointers
A \`void*\` can hold the address of any type but cannot be dereferenced directly:
\`\`\`cpp
void* vp = &x;
int* ip = static_cast<int*>(vp);  // must cast before dereferencing
\`\`\`

### const Pointers
\`\`\`cpp
const int* p1 = &x;   // pointer to const int (cannot modify *p1)
int* const p2 = &x;   // const pointer to int (cannot change p2 itself)
const int* const p3 = &x;  // both const
\`\`\`
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-ptr-1',
      title: 'Declare a pointer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the syntax to declare a pointer to int.',
      skeleton: `#include <iostream>

int main() {
    int x = 10;
    int__BLANK__ ptr = &x;
    std::cout << *ptr << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int x = 10;
    int* ptr = &x;
    std::cout << *ptr << std::endl;
    return 0;
}`,
      hints: [
        'A pointer is declared with a symbol after the type.',
        'The symbol indicates "pointer to".',
        'The symbol is `*`.',
      ],
      concepts: ['pointer declaration', 'address-of'],
    },
    {
      id: 'cpp-ptr-2',
      title: 'Address-of operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the operator that gets the address of a variable.',
      skeleton: `#include <iostream>

int main() {
    int value = 42;
    int* ptr = __BLANK__value;
    std::cout << *ptr << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int value = 42;
    int* ptr = &value;
    std::cout << *ptr << std::endl;
    return 0;
}`,
      hints: [
        'This operator returns the memory address of a variable.',
        'It is used on the right side of pointer initialization.',
        'The operator is `&`.',
      ],
      concepts: ['address-of operator'],
    },
    {
      id: 'cpp-ptr-3',
      title: 'Null pointer literal',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the modern C++ null pointer literal.',
      skeleton: `#include <iostream>

int main() {
    int* ptr = __BLANK__;
    if (ptr == __BLANK__) {
        std::cout << "null" << std::endl;
    }
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int* ptr = nullptr;
    if (ptr == nullptr) {
        std::cout << "null" << std::endl;
    }
    return 0;
}`,
      hints: [
        'Modern C++ has a type-safe null pointer literal.',
        'It replaces the older NULL and 0.',
        'The literal is `nullptr`.',
      ],
      concepts: ['nullptr', 'null pointer'],
    },
    {
      id: 'cpp-ptr-4',
      title: 'Dereference operator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the operator that accesses the value a pointer points to.',
      skeleton: `#include <iostream>

int main() {
    int x = 99;
    int* ptr = &x;
    std::cout << __BLANK__ptr << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int x = 99;
    int* ptr = &x;
    std::cout << *ptr << std::endl;
    return 0;
}`,
      hints: [
        'This operator follows the pointer to the value it points at.',
        'It is the inverse of the address-of operator.',
        'The operator is `*`.',
      ],
      concepts: ['dereference', 'indirection'],
    },
    {
      id: 'cpp-ptr-5',
      title: 'Pointer to const',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the declaration for a pointer that cannot modify the value it points to.',
      skeleton: `#include <iostream>

int main() {
    int x = 50;
    __BLANK__ int* ptr = &x;
    // *ptr = 100;  // would be an error
    std::cout << *ptr << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int x = 50;
    const int* ptr = &x;
    // *ptr = 100;  // would be an error
    std::cout << *ptr << std::endl;
    return 0;
}`,
      hints: [
        'You want a pointer to a const value.',
        'The const goes before the type the pointer points to.',
        'const int* ptr',
      ],
      concepts: ['pointer to const', 'const correctness'],
    },
    {
      id: 'cpp-ptr-6',
      title: 'Const pointer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the declaration for a pointer that cannot be reassigned to point elsewhere.',
      skeleton: `#include <iostream>

int main() {
    int x = 50;
    int y = 100;
    int* __BLANK__ ptr = &x;
    // ptr = &y;  // would be an error
    *ptr = 75;
    std::cout << x << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int x = 50;
    int y = 100;
    int* const ptr = &x;
    // ptr = &y;  // would be an error
    *ptr = 75;
    std::cout << x << std::endl;
    return 0;
}`,
      hints: [
        'You want the pointer itself to be const (cannot point elsewhere).',
        'The const goes after the * to make the pointer itself immutable.',
        'int* const ptr',
      ],
      concepts: ['const pointer', 'immutable pointer'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-ptr-7',
      title: 'Swap using pointers',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a function that swaps two integers using pointer parameters (not references). Call it from main.',
      skeleton: `#include <iostream>

// Write swap function using pointers

int main() {
    int a = 5, b = 10;
    // Call your swap function
    std::cout << a << " " << b << std::endl;  // 10 5
    return 0;
}`,
      solution: `#include <iostream>

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int a = 5, b = 10;
    swap(&a, &b);
    std::cout << a << " " << b << std::endl;  // 10 5
    return 0;
}`,
      hints: [
        'Take int* parameters and dereference them to access values.',
        'Pass addresses using & at the call site.',
        'void swap(int* a, int* b) { int temp = *a; *a = *b; *b = temp; }',
      ],
      concepts: ['pointer parameters', 'swap', 'dereference'],
    },
    {
      id: 'cpp-ptr-8',
      title: 'Array sum via pointer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that takes a pointer to the first element and a size, and returns the sum of all elements using pointer arithmetic (no indexing with []).',
      skeleton: `#include <iostream>

// Write arraySum using pointer arithmetic

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    std::cout << arraySum(arr, 5) << std::endl;  // 15
    return 0;
}`,
      solution: `#include <iostream>

int arraySum(int* begin, int size) {
    int sum = 0;
    for (int* p = begin; p < begin + size; ++p) {
        sum += *p;
    }
    return sum;
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    std::cout << arraySum(arr, 5) << std::endl;  // 15
    return 0;
}`,
      hints: [
        'Use a pointer that starts at begin and increments to begin + size.',
        'Dereference the pointer at each step to get the value.',
        'for (int* p = begin; p < begin + size; ++p) sum += *p;',
      ],
      concepts: ['pointer arithmetic', 'array traversal'],
    },
    {
      id: 'cpp-ptr-9',
      title: 'Find element and return pointer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function findValue that takes an int array, its size, and a target value. Return a pointer to the first occurrence, or nullptr if not found.',
      skeleton: `#include <iostream>

// Write findValue here

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int* found = findValue(arr, 5, 30);
    if (found != nullptr) {
        std::cout << "Found: " << *found << std::endl;
    } else {
        std::cout << "Not found" << std::endl;
    }
    return 0;
}`,
      solution: `#include <iostream>

int* findValue(int* arr, int size, int target) {
    for (int i = 0; i < size; ++i) {
        if (arr[i] == target) {
            return &arr[i];
        }
    }
    return nullptr;
}

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int* found = findValue(arr, 5, 30);
    if (found != nullptr) {
        std::cout << "Found: " << *found << std::endl;
    } else {
        std::cout << "Not found" << std::endl;
    }
    return 0;
}`,
      hints: [
        'Loop through the array checking each element.',
        'Return the address of the matching element.',
        'Return nullptr if no match is found.',
      ],
      concepts: ['pointer return', 'nullptr', 'linear search'],
    },
    {
      id: 'cpp-ptr-10',
      title: 'Dynamic array allocation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a program that dynamically allocates an array of n integers using new, fills it with values 1 through n, prints them, and frees the memory with delete[].',
      skeleton: `#include <iostream>

int main() {
    int n = 5;
    // Allocate array, fill, print, deallocate
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int n = 5;
    int* arr = new int[n];
    for (int i = 0; i < n; ++i) {
        arr[i] = i + 1;
    }
    for (int i = 0; i < n; ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;
    delete[] arr;
    return 0;
}`,
      hints: [
        'Use new int[n] to allocate an array on the heap.',
        'Always pair new[] with delete[] to avoid memory leaks.',
        'int* arr = new int[n]; ... delete[] arr;',
      ],
      concepts: ['new', 'delete[]', 'dynamic allocation', 'heap'],
    },
    {
      id: 'cpp-ptr-11',
      title: 'Void pointer casting',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function printAny that takes a void pointer and a char representing the type (\'i\' for int, \'d\' for double, \'c\' for char). Cast the pointer to the correct type and print the value.',
      skeleton: `#include <iostream>

// Write printAny here

int main() {
    int i = 42;
    double d = 3.14;
    char c = 'X';
    printAny(&i, 'i');
    printAny(&d, 'd');
    printAny(&c, 'c');
    return 0;
}`,
      solution: `#include <iostream>

void printAny(void* ptr, char type) {
    switch (type) {
        case 'i':
            std::cout << *static_cast<int*>(ptr) << std::endl;
            break;
        case 'd':
            std::cout << *static_cast<double*>(ptr) << std::endl;
            break;
        case 'c':
            std::cout << *static_cast<char*>(ptr) << std::endl;
            break;
    }
}

int main() {
    int i = 42;
    double d = 3.14;
    char c = 'X';
    printAny(&i, 'i');
    printAny(&d, 'd');
    printAny(&c, 'c');
    return 0;
}`,
      hints: [
        'A void* must be cast to a typed pointer before dereferencing.',
        'Use static_cast<int*>(ptr) to cast to int pointer.',
        'Switch on the type character to select the correct cast.',
      ],
      concepts: ['void pointer', 'static_cast', 'type erasure'],
    },
    {
      id: 'cpp-ptr-12',
      title: 'Reverse array in-place using pointers',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function reverseArray that takes a pointer to the first element and the size, and reverses the array in-place using two pointers (front and back).',
      skeleton: `#include <iostream>

// Write reverseArray here

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    reverseArray(arr, 5);
    for (int i = 0; i < 5; ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;  // 5 4 3 2 1
    return 0;
}`,
      solution: `#include <iostream>

void reverseArray(int* arr, int size) {
    int* front = arr;
    int* back = arr + size - 1;
    while (front < back) {
        int temp = *front;
        *front = *back;
        *back = temp;
        ++front;
        --back;
    }
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    reverseArray(arr, 5);
    for (int i = 0; i < 5; ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;  // 5 4 3 2 1
    return 0;
}`,
      hints: [
        'Use two pointers: one starting at the front, one at the back.',
        'Swap the values they point to and move them inward.',
        'while (front < back) { swap *front and *back; ++front; --back; }',
      ],
      concepts: ['pointer arithmetic', 'in-place reversal', 'two-pointer technique'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-ptr-13',
      title: 'Fix null pointer dereference',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'This code dereferences a null pointer, causing undefined behavior. Add a null check.',
      skeleton: `#include <iostream>

int main() {
    int* ptr = nullptr;
    std::cout << *ptr << std::endl;  // Bug: dereferencing nullptr
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int* ptr = nullptr;
    if (ptr != nullptr) {
        std::cout << *ptr << std::endl;
    } else {
        std::cout << "null pointer" << std::endl;
    }
    return 0;
}`,
      hints: [
        'Dereferencing nullptr is undefined behavior.',
        'Always check if a pointer is null before dereferencing.',
        'Add if (ptr != nullptr) before *ptr.',
      ],
      concepts: ['null pointer dereference', 'null check'],
    },
    {
      id: 'cpp-ptr-14',
      title: 'Fix memory leak',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'This code allocates memory with new but never frees it. Fix the memory leak.',
      skeleton: `#include <iostream>

int main() {
    int* data = new int[100];
    for (int i = 0; i < 100; ++i) {
        data[i] = i * 2;
    }
    std::cout << data[50] << std::endl;
    // Bug: memory is never freed
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int* data = new int[100];
    for (int i = 0; i < 100; ++i) {
        data[i] = i * 2;
    }
    std::cout << data[50] << std::endl;
    delete[] data;
    return 0;
}`,
      hints: [
        'Every new must be paired with a delete.',
        'Arrays allocated with new[] must use delete[] (not delete).',
        'Add delete[] data; before return.',
      ],
      concepts: ['memory leak', 'delete[]', 'resource management'],
    },
    {
      id: 'cpp-ptr-15',
      title: 'Fix using delete instead of delete[]',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'This code uses delete instead of delete[] for an array allocation. Fix it.',
      skeleton: `#include <iostream>

int main() {
    int* arr = new int[10];
    for (int i = 0; i < 10; ++i) {
        arr[i] = i;
    }
    delete arr;  // Bug: should use delete[] for arrays
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int* arr = new int[10];
    for (int i = 0; i < 10; ++i) {
        arr[i] = i;
    }
    delete[] arr;
    return 0;
}`,
      hints: [
        'Arrays allocated with new[] must be freed with delete[].',
        'Using plain delete on an array is undefined behavior.',
        'Change delete arr; to delete[] arr;',
      ],
      concepts: ['delete vs delete[]', 'undefined behavior'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-ptr-16',
      title: 'Predict pointer arithmetic',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int* p = arr;
    p += 2;
    std::cout << *p << std::endl;
    return 0;
}`,
      solution: `30`,
      hints: [
        'p starts pointing to arr[0] which is 10.',
        'p += 2 moves the pointer forward by 2 elements.',
        '*p is now arr[2] which is 30.',
      ],
      concepts: ['pointer arithmetic', 'array indexing'],
    },
    {
      id: 'cpp-ptr-17',
      title: 'Predict pointer difference',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int* p1 = &arr[1];
    int* p2 = &arr[4];
    std::cout << (p2 - p1) << std::endl;
    return 0;
}`,
      solution: `3`,
      hints: [
        'Pointer subtraction gives the number of elements between them.',
        'p1 points to index 1, p2 points to index 4.',
        '4 - 1 = 3 elements apart.',
      ],
      concepts: ['pointer difference', 'pointer subtraction'],
    },
    {
      id: 'cpp-ptr-18',
      title: 'Predict dereference and increment',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

int main() {
    int arr[] = {10, 20, 30};
    int* p = arr;
    std::cout << *p++ << " ";
    std::cout << *p << " ";
    std::cout << *++p << std::endl;
    return 0;
}`,
      solution: `10 20 30`,
      hints: [
        '*p++ dereferences p first (gets 10), then increments p to point to arr[1].',
        '*p then gets arr[1] which is 20.',
        '*++p increments p first to arr[2], then dereferences to get 30.',
      ],
      concepts: ['post-increment', 'pre-increment', 'dereference order'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-ptr-19',
      title: 'Replace raw pointer with nullptr init',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Refactor the code to use nullptr instead of NULL and 0 for null pointers.',
      skeleton: `#include <iostream>

int main() {
    int* p1 = NULL;
    int* p2 = 0;
    double* p3 = NULL;

    if (p1 == NULL) std::cout << "p1 null" << std::endl;
    if (p2 == 0) std::cout << "p2 null" << std::endl;
    if (p3 == NULL) std::cout << "p3 null" << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int* p1 = nullptr;
    int* p2 = nullptr;
    double* p3 = nullptr;

    if (p1 == nullptr) std::cout << "p1 null" << std::endl;
    if (p2 == nullptr) std::cout << "p2 null" << std::endl;
    if (p3 == nullptr) std::cout << "p3 null" << std::endl;
    return 0;
}`,
      hints: [
        'nullptr is the modern C++ way to represent a null pointer.',
        'It is type-safe unlike NULL (which is typically 0).',
        'Replace all NULL and 0 with nullptr.',
      ],
      concepts: ['nullptr', 'modern C++', 'NULL replacement'],
    },
    {
      id: 'cpp-ptr-20',
      title: 'Replace index-based access with pointer iteration',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor the loop to use pointer iteration (begin/end pointers) instead of index-based array access.',
      skeleton: `#include <iostream>

int main() {
    int arr[] = {5, 10, 15, 20, 25};
    int size = 5;
    int sum = 0;
    for (int i = 0; i < size; ++i) {
        sum += arr[i];
    }
    std::cout << sum << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int arr[] = {5, 10, 15, 20, 25};
    int* begin = arr;
    int* end = arr + 5;
    int sum = 0;
    for (int* p = begin; p != end; ++p) {
        sum += *p;
    }
    std::cout << sum << std::endl;
    return 0;
}`,
      hints: [
        'Create a begin pointer (arr) and an end pointer (arr + size).',
        'Iterate with a pointer from begin to end.',
        'for (int* p = begin; p != end; ++p) sum += *p;',
      ],
      concepts: ['pointer iteration', 'begin/end idiom', 'refactoring'],
    },
  ],
};
