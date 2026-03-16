import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-arr',
  title: '08. Arrays',
  explanation: `## Arrays in C++

Arrays store a fixed-size sequence of elements of the same type in contiguous memory.

### C-Style Arrays
\`\`\`cpp
int arr[5] = {1, 2, 3, 4, 5};
int zeroed[10] = {};       // all elements initialized to 0
int partial[5] = {1, 2};   // remaining elements are 0
int deduced[] = {10, 20, 30}; // size deduced as 3
\`\`\`

### Accessing Elements
\`\`\`cpp
arr[0] = 100;             // set first element
std::cout << arr[2];      // read third element
\`\`\`

### std::array (C++11)
A safer, fixed-size container from \\<array\\>:
\`\`\`cpp
#include <array>
std::array<int, 5> arr = {1, 2, 3, 4, 5};
arr.at(2);     // bounds-checked access (throws on out-of-range)
arr.size();    // 5
arr.front();   // first element
arr.back();    // last element
\`\`\`

### Multidimensional Arrays
\`\`\`cpp
int matrix[3][4] = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};
std::cout << matrix[1][2]; // 7
\`\`\`

### Array Decay to Pointer
When passed to a function, a C-style array decays to a pointer to its first element:
\`\`\`cpp
void process(int* arr, int size);  // arr is a pointer, not an array
\`\`\`

### Computing Array Size
\`\`\`cpp
int arr[] = {1, 2, 3, 4, 5};
int size = sizeof(arr) / sizeof(arr[0]);  // 5

// C++17: std::size()
#include <iterator>
auto sz = std::size(arr);  // 5
\`\`\`
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-arr-1',
      title: 'Declare a C-style array',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the size to declare an array of 5 integers.',
      skeleton: `#include <iostream>

int main() {
    int arr[__BLANK__] = {10, 20, 30, 40, 50};
    std::cout << arr[0] << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    std::cout << arr[0] << std::endl;
    return 0;
}`,
      hints: [
        'Count the number of elements in the initializer list.',
        'There are 5 values: 10, 20, 30, 40, 50.',
        'The size is `5`.',
      ],
      concepts: ['C-style array', 'array declaration'],
    },
    {
      id: 'cpp-arr-2',
      title: 'Zero-initialize an array',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the initializer that sets all 10 elements to zero.',
      skeleton: `#include <iostream>

int main() {
    int arr[10] = __BLANK__;
    std::cout << arr[5] << std::endl;  // 0
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int arr[10] = {};
    std::cout << arr[5] << std::endl;  // 0
    return 0;
}`,
      hints: [
        'An empty initializer list zero-initializes all elements.',
        'The syntax is just empty braces.',
        'Write `{}`.',
      ],
      concepts: ['zero initialization', 'value initialization'],
    },
    {
      id: 'cpp-arr-3',
      title: 'std::array declaration',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the type to declare a std::array of 4 doubles.',
      skeleton: `#include <iostream>
#include <array>

int main() {
    __BLANK__ values = {1.1, 2.2, 3.3, 4.4};
    std::cout << values.size() << std::endl;  // 4
    return 0;
}`,
      solution: `#include <iostream>
#include <array>

int main() {
    std::array<double, 4> values = {1.1, 2.2, 3.3, 4.4};
    std::cout << values.size() << std::endl;  // 4
    return 0;
}`,
      hints: [
        'std::array takes the element type and size as template parameters.',
        'The syntax is std::array<Type, Size>.',
        'std::array<double, 4>',
      ],
      concepts: ['std::array', 'template parameters'],
    },
    {
      id: 'cpp-arr-4',
      title: 'Bounds-checked access',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the member function that provides bounds-checked access to a std::array.',
      skeleton: `#include <iostream>
#include <array>

int main() {
    std::array<int, 3> arr = {10, 20, 30};
    std::cout << arr.__BLANK__(1) << std::endl;  // 20
    return 0;
}`,
      solution: `#include <iostream>
#include <array>

int main() {
    std::array<int, 3> arr = {10, 20, 30};
    std::cout << arr.at(1) << std::endl;  // 20
    return 0;
}`,
      hints: [
        'Unlike [], this method throws an exception on out-of-bounds access.',
        'It takes an index and returns a reference to the element.',
        'The method is `at`.',
      ],
      concepts: ['bounds checking', 'at()', 'std::array'],
    },
    {
      id: 'cpp-arr-5',
      title: 'Array size calculation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the expression to compute the number of elements in a C-style array.',
      skeleton: `#include <iostream>

int main() {
    int arr[] = {2, 4, 6, 8, 10, 12};
    int size = __BLANK__;
    std::cout << size << std::endl;  // 6
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int arr[] = {2, 4, 6, 8, 10, 12};
    int size = sizeof(arr) / sizeof(arr[0]);
    std::cout << size << std::endl;  // 6
    return 0;
}`,
      hints: [
        'sizeof(arr) gives total bytes, sizeof(arr[0]) gives one element size.',
        'Dividing total by element size gives the count.',
        'sizeof(arr) / sizeof(arr[0])',
      ],
      concepts: ['sizeof', 'array size', 'element count'],
    },
    {
      id: 'cpp-arr-6',
      title: 'Multidimensional access',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the indices to access the value 7 in the 2D array.',
      skeleton: `#include <iostream>

int main() {
    int grid[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    std::cout << grid[__BLANK__][__BLANK__] << std::endl;  // 7
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int grid[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    std::cout << grid[2][0] << std::endl;  // 7
    return 0;
}`,
      hints: [
        '7 is in the third row (index 2), first column (index 0).',
        'Remember that array indices are zero-based.',
        'grid[2][0]',
      ],
      concepts: ['2D array', 'multidimensional indexing'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-arr-7',
      title: 'Find the maximum element',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a function findMax that takes a C-style int array and its size, and returns the maximum element. Test with {3, 7, 1, 9, 4}.',
      skeleton: `#include <iostream>

// Write findMax here

int main() {
    int arr[] = {3, 7, 1, 9, 4};
    std::cout << findMax(arr, 5) << std::endl;  // 9
    return 0;
}`,
      solution: `#include <iostream>

int findMax(int arr[], int size) {
    int max = arr[0];
    for (int i = 1; i < size; ++i) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

int main() {
    int arr[] = {3, 7, 1, 9, 4};
    std::cout << findMax(arr, 5) << std::endl;  // 9
    return 0;
}`,
      hints: [
        'Initialize max to the first element.',
        'Loop through the rest and update max when a larger value is found.',
        'if (arr[i] > max) max = arr[i];',
      ],
      concepts: ['array traversal', 'find maximum'],
    },
    {
      id: 'cpp-arr-8',
      title: 'Reverse an array',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that reverses a C-style array in place. Print the array before and after.',
      skeleton: `#include <iostream>

// Write reverse function here

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    // Print original, reverse, print reversed
    return 0;
}`,
      solution: `#include <iostream>

void reverseArray(int arr[], int size) {
    for (int i = 0; i < size / 2; ++i) {
        int temp = arr[i];
        arr[i] = arr[size - 1 - i];
        arr[size - 1 - i] = temp;
    }
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    for (int i = 0; i < 5; ++i) std::cout << arr[i] << " ";
    std::cout << std::endl;
    reverseArray(arr, 5);
    for (int i = 0; i < 5; ++i) std::cout << arr[i] << " ";
    std::cout << std::endl;
    return 0;
}`,
      hints: [
        'Swap elements from both ends moving toward the center.',
        'Only iterate to size / 2.',
        'Swap arr[i] with arr[size - 1 - i].',
      ],
      concepts: ['array reversal', 'in-place swap'],
    },
    {
      id: 'cpp-arr-9',
      title: 'std::array operations',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Create a std::array<int, 5> with values {50, 10, 30, 20, 40}. Print its size, front, and back elements. Then use std::sort to sort it and print all elements.',
      skeleton: `#include <iostream>
#include <array>
#include <algorithm>

int main() {
    // Create std::array, print size/front/back, sort, print all
    return 0;
}`,
      solution: `#include <iostream>
#include <array>
#include <algorithm>

int main() {
    std::array<int, 5> arr = {50, 10, 30, 20, 40};
    std::cout << "Size: " << arr.size() << std::endl;
    std::cout << "Front: " << arr.front() << std::endl;
    std::cout << "Back: " << arr.back() << std::endl;
    std::sort(arr.begin(), arr.end());
    for (int x : arr) {
        std::cout << x << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
      hints: [
        'std::array has .size(), .front(), .back(), .begin(), .end() methods.',
        'std::sort works with iterators from begin() to end().',
        'Use range-based for to print the sorted array.',
      ],
      concepts: ['std::array', 'sort', 'iterators'],
    },
    {
      id: 'cpp-arr-10',
      title: 'Matrix transpose',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a program that transposes a 3x3 integer matrix (swaps rows and columns) in-place and prints the result.',
      skeleton: `#include <iostream>

int main() {
    int matrix[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    // Transpose in-place and print
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int matrix[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    for (int i = 0; i < 3; ++i) {
        for (int j = i + 1; j < 3; ++j) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
    for (int i = 0; i < 3; ++i) {
        for (int j = 0; j < 3; ++j) {
            std::cout << matrix[i][j] << " ";
        }
        std::cout << std::endl;
    }
    return 0;
}`,
      hints: [
        'Transpose swaps matrix[i][j] with matrix[j][i].',
        'Only swap above the diagonal (j > i) to avoid swapping twice.',
        'Inner loop starts at j = i + 1.',
      ],
      concepts: ['2D array', 'matrix transpose', 'nested loops'],
    },
    {
      id: 'cpp-arr-11',
      title: 'Bubble sort',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function bubbleSort that sorts an int array in ascending order using the bubble sort algorithm. Test with {64, 34, 25, 12, 22, 11, 90}.',
      skeleton: `#include <iostream>

// Write bubbleSort here

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int size = 7;
    bubbleSort(arr, size);
    for (int i = 0; i < size; ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

void bubbleSort(int arr[], int size) {
    for (int i = 0; i < size - 1; ++i) {
        for (int j = 0; j < size - i - 1; ++j) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int size = 7;
    bubbleSort(arr, size);
    for (int i = 0; i < size; ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
      hints: [
        'Compare adjacent elements and swap if out of order.',
        'Repeat passes until no more swaps are needed.',
        'Outer loop: size-1 passes. Inner loop: shrinks each pass.',
      ],
      concepts: ['bubble sort', 'sorting algorithm', 'nested loops'],
    },
    {
      id: 'cpp-arr-12',
      title: 'Count occurrences',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function countOccurrences that takes a C-style int array, its size, and a target value, and returns how many times the target appears.',
      skeleton: `#include <iostream>

// Write countOccurrences here

int main() {
    int arr[] = {1, 3, 5, 3, 7, 3, 9};
    std::cout << countOccurrences(arr, 7, 3) << std::endl;  // 3
    return 0;
}`,
      solution: `#include <iostream>

int countOccurrences(int arr[], int size, int target) {
    int count = 0;
    for (int i = 0; i < size; ++i) {
        if (arr[i] == target) {
            ++count;
        }
    }
    return count;
}

int main() {
    int arr[] = {1, 3, 5, 3, 7, 3, 9};
    std::cout << countOccurrences(arr, 7, 3) << std::endl;  // 3
    return 0;
}`,
      hints: [
        'Loop through the array and count matches.',
        'Initialize a counter to 0 and increment when arr[i] == target.',
        'Return the counter.',
      ],
      concepts: ['counting', 'array search', 'linear scan'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-arr-13',
      title: 'Fix out-of-bounds access',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'This code accesses one past the end of the array. Fix the loop condition.',
      skeleton: `#include <iostream>

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    for (int i = 0; i <= 5; ++i) {  // Bug: goes out of bounds
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    for (int i = 0; i < 5; ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
      hints: [
        'An array of 5 elements has valid indices 0 through 4.',
        'The condition i <= 5 allows i to be 5, which is out of bounds.',
        'Change <= to <.',
      ],
      concepts: ['off-by-one', 'array bounds'],
    },
    {
      id: 'cpp-arr-14',
      title: 'Fix array size after decay',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'sizeof does not work as expected after the array decays to a pointer. Fix the function to use the size parameter.',
      skeleton: `#include <iostream>

void printArray(int arr[]) {
    int size = sizeof(arr) / sizeof(arr[0]);  // Bug: arr is a pointer here
    for (int i = 0; i < size; ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;
}

int main() {
    int data[] = {1, 2, 3, 4, 5};
    printArray(data);
    return 0;
}`,
      solution: `#include <iostream>

void printArray(int arr[], int size) {
    for (int i = 0; i < size; ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;
}

int main() {
    int data[] = {1, 2, 3, 4, 5};
    printArray(data, 5);
    return 0;
}`,
      hints: [
        'When an array is passed to a function, it decays to a pointer.',
        'sizeof on a pointer gives the pointer size, not the array size.',
        'Pass the size as a separate parameter.',
      ],
      concepts: ['array decay', 'sizeof', 'pointer decay'],
    },
    {
      id: 'cpp-arr-15',
      title: 'Fix uninitialized array read',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'This code reads from an uninitialized array. Fix it by initializing all elements.',
      skeleton: `#include <iostream>

int main() {
    int counts[10];  // Bug: uninitialized -- contains garbage
    counts[3] += 1;
    std::cout << counts[3] << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int counts[10] = {};  // zero-initialized
    counts[3] += 1;
    std::cout << counts[3] << std::endl;  // 1
    return 0;
}`,
      hints: [
        'Uninitialized local arrays contain indeterminate values.',
        'Reading uninitialized memory is undefined behavior.',
        'Add = {} to zero-initialize the array.',
      ],
      concepts: ['zero initialization', 'undefined behavior', 'uninitialized memory'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-arr-16',
      title: 'Predict partial initialization',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

int main() {
    int arr[5] = {1, 2};
    std::cout << arr[0] << " " << arr[1] << " " << arr[2] << " " << arr[3] << " " << arr[4] << std::endl;
    return 0;
}`,
      solution: `1 2 0 0 0`,
      hints: [
        'When an initializer list has fewer values than the array size...',
        'The remaining elements are zero-initialized.',
        'arr is {1, 2, 0, 0, 0}.',
      ],
      concepts: ['partial initialization', 'zero fill'],
    },
    {
      id: 'cpp-arr-17',
      title: 'Predict std::array at() vs []',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print? (Assume no exception handling)',
      skeleton: `#include <iostream>
#include <array>

int main() {
    std::array<int, 3> arr = {10, 20, 30};
    std::cout << arr[1] << std::endl;
    std::cout << arr.at(2) << std::endl;
    return 0;
}`,
      solution: `20
30`,
      hints: [
        'arr[1] accesses index 1 which is 20.',
        'arr.at(2) accesses index 2 which is 30.',
        'Both work the same for valid indices.',
      ],
      concepts: ['std::array', 'at()', 'operator[]'],
    },
    {
      id: 'cpp-arr-18',
      title: 'Predict array name as pointer',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

int main() {
    int arr[] = {100, 200, 300};
    int* p = arr;
    std::cout << *(p + 2) << std::endl;
    std::cout << p[1] << std::endl;
    return 0;
}`,
      solution: `300
200`,
      hints: [
        'p points to arr[0]. *(p + 2) is arr[2] which is 300.',
        'p[1] is equivalent to *(p + 1) which is arr[1] = 200.',
        'Output: 300 then 200.',
      ],
      concepts: ['array decay', 'pointer arithmetic', 'subscript'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-arr-19',
      title: 'Replace C-style array with std::array',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor the C-style array to use std::array and replace the manual size calculation with .size().',
      skeleton: `#include <iostream>

int main() {
    int scores[] = {85, 92, 78, 96, 88};
    int size = sizeof(scores) / sizeof(scores[0]);
    int sum = 0;
    for (int i = 0; i < size; ++i) {
        sum += scores[i];
    }
    std::cout << "Average: " << sum / size << std::endl;
    return 0;
}`,
      solution: `#include <iostream>
#include <array>

int main() {
    std::array<int, 5> scores = {85, 92, 78, 96, 88};
    int sum = 0;
    for (std::size_t i = 0; i < scores.size(); ++i) {
        sum += scores[i];
    }
    std::cout << "Average: " << sum / static_cast<int>(scores.size()) << std::endl;
    return 0;
}`,
      hints: [
        'Replace int[] with std::array<int, N>.',
        'Use .size() instead of the sizeof trick.',
        'Include <array> and use std::array<int, 5>.',
      ],
      concepts: ['std::array', 'modern C++', 'refactoring'],
    },
    {
      id: 'cpp-arr-20',
      title: 'Replace manual loop with range-for',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor both the printing and summing loops to use range-based for loops with std::array.',
      skeleton: `#include <iostream>
#include <array>

int main() {
    std::array<int, 6> data = {4, 8, 15, 16, 23, 42};

    std::cout << "Elements: ";
    for (std::size_t i = 0; i < data.size(); ++i) {
        std::cout << data[i] << " ";
    }
    std::cout << std::endl;

    int sum = 0;
    for (std::size_t i = 0; i < data.size(); ++i) {
        sum += data[i];
    }
    std::cout << "Sum: " << sum << std::endl;
    return 0;
}`,
      solution: `#include <iostream>
#include <array>

int main() {
    std::array<int, 6> data = {4, 8, 15, 16, 23, 42};

    std::cout << "Elements: ";
    for (int x : data) {
        std::cout << x << " ";
    }
    std::cout << std::endl;

    int sum = 0;
    for (int x : data) {
        sum += x;
    }
    std::cout << "Sum: " << sum << std::endl;
    return 0;
}`,
      hints: [
        'Range-based for works directly with std::array.',
        'for (int x : data) iterates over each element.',
        'No need for an index variable at all.',
      ],
      concepts: ['range-based for', 'std::array', 'refactoring'],
    },
  ],
};
