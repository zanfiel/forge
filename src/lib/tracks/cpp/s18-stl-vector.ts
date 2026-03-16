import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-vector',
  title: '18. STL Vector',
  explanation: `## STL Vector in C++

\`std::vector\` is the most commonly used container in C++. It is a dynamic array that grows automatically.

### Creation
\`\`\`cpp
#include <vector>
std::vector<int> v1;              // empty
std::vector<int> v2(5, 0);       // 5 zeros
std::vector<int> v3 = {1, 2, 3}; // initializer list
\`\`\`

### Adding Elements
- \`push_back(val)\` -- copy or move an element to the end
- \`emplace_back(args...)\` -- construct in-place at the end (avoids copy/move)

### Iterators
\`\`\`cpp
for (auto it = v.begin(); it != v.end(); ++it)
    std::cout << *it;

for (const auto& elem : v)  // range-based for
    std::cout << elem;
\`\`\`

### Size vs Capacity
- \`size()\` -- number of elements currently stored
- \`capacity()\` -- number of elements that can be stored before reallocation
- \`reserve(n)\` -- pre-allocate space for n elements
- \`shrink_to_fit()\` -- request to reduce capacity to match size

### Erasing Elements
- \`erase(it)\` -- remove element at iterator
- \`erase(first, last)\` -- remove range
- **Erase-remove idiom**: \`v.erase(std::remove(v.begin(), v.end(), val), v.end());\`

### Element Access
- \`operator[]\` -- no bounds checking
- \`at(i)\` -- throws \`std::out_of_range\` if out of bounds
- \`front()\`, \`back()\` -- first and last element
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-vector-1',
      title: 'Create a vector with initializer list',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the type to create a vector of integers.',
      skeleton: `#include <vector>

std::__BLANK__<int> nums = {1, 2, 3, 4, 5};`,
      solution: `#include <vector>

std::vector<int> nums = {1, 2, 3, 4, 5};`,
      hints: [
        'This is the most commonly used dynamic array container.',
        'It is in the <vector> header.',
        'The type is `vector`.',
      ],
      concepts: ['vector', 'initializer-list'],
    },
    {
      id: 'cpp-vector-2',
      title: 'Add element to back',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the method that adds an element to the end of the vector.',
      skeleton: `std::vector<int> v;
v.__BLANK__(42);
v.__BLANK__(99);
// v is now {42, 99}`,
      solution: `std::vector<int> v;
v.push_back(42);
v.push_back(99);
// v is now {42, 99}`,
      hints: [
        'This method adds an element at the end of the container.',
        'It copies or moves the value into the vector.',
        'The method is `push_back`.',
      ],
      concepts: ['push-back', 'vector'],
    },
    {
      id: 'cpp-vector-3',
      title: 'Emplace back',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Use the in-place construction method to add a pair.',
      skeleton: `std::vector<std::pair<int, std::string>> items;
items.__BLANK__(1, "apple");
items.__BLANK__(2, "banana");`,
      solution: `std::vector<std::pair<int, std::string>> items;
items.emplace_back(1, "apple");
items.emplace_back(2, "banana");`,
      hints: [
        'This method constructs the element directly in the vector.',
        'It forwards arguments to the element constructor.',
        'The method is `emplace_back`.',
      ],
      concepts: ['emplace-back', 'in-place-construction'],
    },
    {
      id: 'cpp-vector-4',
      title: 'Reserve capacity',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Pre-allocate memory to avoid reallocations.',
      skeleton: `std::vector<int> v;
v.__BLANK__(1000);  // allocate space for 1000 elements
// v.size() is still 0, v.capacity() >= 1000`,
      solution: `std::vector<int> v;
v.reserve(1000);  // allocate space for 1000 elements
// v.size() is still 0, v.capacity() >= 1000`,
      hints: [
        'This method allocates memory without changing the size.',
        'It prevents repeated reallocations when you know the final size.',
        'The method is `reserve`.',
      ],
      concepts: ['reserve', 'capacity'],
    },
    {
      id: 'cpp-vector-5',
      title: 'Bounds-checked access',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Use the bounds-checked access method.',
      skeleton: `std::vector<int> v = {10, 20, 30};
try {
    int val = v.__BLANK__(5);  // throws std::out_of_range
} catch (const std::out_of_range& e) {
    std::cout << "Out of range!" << std::endl;
}`,
      solution: `std::vector<int> v = {10, 20, 30};
try {
    int val = v.at(5);  // throws std::out_of_range
} catch (const std::out_of_range& e) {
    std::cout << "Out of range!" << std::endl;
}`,
      hints: [
        'Unlike operator[], this method checks bounds.',
        'It throws an exception for invalid indices.',
        'The method is `at`.',
      ],
      concepts: ['bounds-checking', 'at', 'exception'],
    },
    {
      id: 'cpp-vector-6',
      title: 'Shrink to fit',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Request the vector to release unused memory.',
      skeleton: `std::vector<int> v(1000);
v.clear();
// v.capacity() is still >= 1000
v.__BLANK__();
// v.capacity() may now equal 0`,
      solution: `std::vector<int> v(1000);
v.clear();
// v.capacity() is still >= 1000
v.shrink_to_fit();
// v.capacity() may now equal 0`,
      hints: [
        'After clear(), capacity remains unchanged.',
        'This method requests (non-binding) reduction of capacity to size.',
        'The method is `shrink_to_fit`.',
      ],
      concepts: ['shrink-to-fit', 'capacity', 'memory'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-vector-7',
      title: 'Write a function to find the max element',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a function that returns the maximum element in a vector of ints.',
      skeleton: `#include <vector>
#include <stdexcept>
// Write: int findMax(const std::vector<int>& v)
// Throws if empty. Returns the largest element.`,
      solution: `#include <vector>
#include <stdexcept>

int findMax(const std::vector<int>& v) {
    if (v.empty()) throw std::runtime_error("empty vector");
    int max = v[0];
    for (std::size_t i = 1; i < v.size(); ++i) {
        if (v[i] > max) max = v[i];
    }
    return max;
}`,
      hints: [
        'Check for empty vector first.',
        'Initialize max with the first element.',
        'Loop through the rest comparing each to max.',
      ],
      concepts: ['vector', 'algorithm', 'linear-search'],
    },
    {
      id: 'cpp-vector-8',
      title: 'Write a function to remove duplicates',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that removes duplicate elements from a sorted vector in-place.',
      skeleton: `#include <vector>
#include <algorithm>
// Write: void removeDuplicates(std::vector<int>& v)
// Assumes v is sorted. Removes duplicates in-place.`,
      solution: `#include <vector>
#include <algorithm>

void removeDuplicates(std::vector<int>& v) {
    auto last = std::unique(v.begin(), v.end());
    v.erase(last, v.end());
}`,
      hints: [
        'std::unique moves duplicates to the end and returns an iterator to the new logical end.',
        'Erase from that iterator to v.end().',
        'This is the erase-unique idiom.',
      ],
      concepts: ['erase-remove', 'std-unique', 'vector'],
    },
    {
      id: 'cpp-vector-9',
      title: 'Write a function using iterators',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that doubles every element in a vector using iterators.',
      skeleton: `#include <vector>
// Write: void doubleAll(std::vector<int>& v)
// Uses iterators (not index) to double each element.`,
      solution: `#include <vector>

void doubleAll(std::vector<int>& v) {
    for (auto it = v.begin(); it != v.end(); ++it) {
        *it *= 2;
    }
}`,
      hints: [
        'Get an iterator with v.begin().',
        'Dereference with *it to access the element.',
        'Multiply each element by 2.',
      ],
      concepts: ['iterator', 'vector', 'mutation'],
    },
    {
      id: 'cpp-vector-10',
      title: 'Write a function to erase by value',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that removes all occurrences of a value from a vector.',
      skeleton: `#include <vector>
#include <algorithm>
// Write: void eraseAll(std::vector<int>& v, int val)
// Removes all occurrences of val from v.`,
      solution: `#include <vector>
#include <algorithm>

void eraseAll(std::vector<int>& v, int val) {
    v.erase(std::remove(v.begin(), v.end(), val), v.end());
}`,
      hints: [
        'std::remove shifts non-matching elements forward.',
        'It returns an iterator to the new logical end.',
        'Erase from that point to the actual end.',
      ],
      concepts: ['erase-remove-idiom', 'std-remove', 'vector'],
    },
    {
      id: 'cpp-vector-11',
      title: 'Write a function to flatten a 2D vector',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function that flattens a vector of vectors into a single vector.',
      skeleton: `#include <vector>
// Write: std::vector<int> flatten(const std::vector<std::vector<int>>& matrix)
// Returns a single vector with all elements in order.`,
      solution: `#include <vector>

std::vector<int> flatten(const std::vector<std::vector<int>>& matrix) {
    std::vector<int> result;
    for (const auto& row : matrix) {
        result.insert(result.end(), row.begin(), row.end());
    }
    return result;
}`,
      hints: [
        'Iterate over each inner vector.',
        'Use insert with iterators to append each row.',
        'Alternatively, use push_back in a nested loop.',
      ],
      concepts: ['vector', 'nested-container', 'insert'],
    },
    {
      id: 'cpp-vector-12',
      title: 'Write a function with reserve optimization',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function that generates N Fibonacci numbers, using reserve() to avoid reallocations.',
      skeleton: `#include <vector>
// Write: std::vector<long long> fibonacci(int n)
// Returns first n Fibonacci numbers. Use reserve() for efficiency.`,
      solution: `#include <vector>

std::vector<long long> fibonacci(int n) {
    std::vector<long long> fib;
    fib.reserve(n);
    for (int i = 0; i < n; ++i) {
        if (i < 2) {
            fib.push_back(i);
        } else {
            fib.push_back(fib[i - 1] + fib[i - 2]);
        }
    }
    return fib;
}`,
      hints: [
        'Call reserve(n) before the loop to pre-allocate.',
        'The first two Fibonacci numbers are 0 and 1.',
        'Each subsequent number is the sum of the previous two.',
      ],
      concepts: ['reserve', 'fibonacci', 'vector'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-vector-13',
      title: 'Fix: iterator invalidation',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the iterator invalidation bug when erasing during iteration.',
      skeleton: `#include <vector>

void removeEvens(std::vector<int>& v) {
    for (auto it = v.begin(); it != v.end(); ++it) {
        if (*it % 2 == 0) {
            v.erase(it);  // Bug: invalidates it
        }
    }
}`,
      solution: `#include <vector>

void removeEvens(std::vector<int>& v) {
    for (auto it = v.begin(); it != v.end(); ) {
        if (*it % 2 == 0) {
            it = v.erase(it);
        } else {
            ++it;
        }
    }
}`,
      hints: [
        'erase() invalidates the iterator and all iterators after it.',
        'erase() returns a valid iterator to the next element.',
        'Only increment the iterator when you do not erase.',
      ],
      concepts: ['iterator-invalidation', 'erase', 'vector'],
    },
    {
      id: 'cpp-vector-14',
      title: 'Fix: off-by-one in index loop',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the off-by-one error in the loop.',
      skeleton: `#include <vector>
#include <iostream>

void printAll(const std::vector<int>& v) {
    for (int i = 0; i <= v.size(); ++i) {  // Bug: <= causes out-of-bounds
        std::cout << v[i] << " ";
    }
}`,
      solution: `#include <vector>
#include <iostream>

void printAll(const std::vector<int>& v) {
    for (std::size_t i = 0; i < v.size(); ++i) {
        std::cout << v[i] << " ";
    }
}`,
      hints: [
        'Vector indices go from 0 to size()-1.',
        'Using <= accesses one element past the end.',
        'Change <= to < and use std::size_t for the index.',
      ],
      concepts: ['bounds-checking', 'off-by-one', 'vector'],
    },
    {
      id: 'cpp-vector-15',
      title: 'Fix: push_back during iteration',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fix the code that modifies a vector while iterating with range-for.',
      skeleton: `#include <vector>

void duplicateAll(std::vector<int>& v) {
    // Bug: push_back during range-for invalidates iterators
    for (int x : v) {
        v.push_back(x);
    }
}`,
      solution: `#include <vector>

void duplicateAll(std::vector<int>& v) {
    std::vector<int> copy = v;
    for (int x : copy) {
        v.push_back(x);
    }
}`,
      hints: [
        'push_back can trigger reallocation, invalidating all iterators.',
        'Range-for uses iterators internally.',
        'Make a copy of the vector first and iterate over that.',
      ],
      concepts: ['iterator-invalidation', 'push-back', 'range-for'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-vector-16',
      title: 'Predict: size vs capacity after push_back',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the relationship between size and capacity.',
      skeleton: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> v;
    v.reserve(10);
    v.push_back(1);
    v.push_back(2);
    v.push_back(3);
    std::cout << v.size() << " " << (v.capacity() >= 10) << std::endl;
    return 0;
}`,
      solution: `3 1`,
      hints: [
        'reserve(10) allocates space but does not change size.',
        'Three push_backs bring size to 3.',
        'Capacity remains >= 10.',
      ],
      concepts: ['size', 'capacity', 'reserve'],
    },
    {
      id: 'cpp-vector-17',
      title: 'Predict: vector of vectors',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the output of nested vector access.',
      skeleton: `#include <iostream>
#include <vector>

int main() {
    std::vector<std::vector<int>> grid = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    std::cout << grid[1][2] << " " << grid[2][0] << std::endl;
    return 0;
}`,
      solution: `6 7`,
      hints: [
        'grid[1] is the second row: {4, 5, 6}.',
        'grid[1][2] is 6, grid[2][0] is 7.',
        'Output: 6 7.',
      ],
      concepts: ['nested-vector', 'indexing'],
    },
    {
      id: 'cpp-vector-18',
      title: 'Predict: erase-remove result',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Predict the output after erase-remove.',
      skeleton: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> v = {1, 2, 3, 2, 4, 2, 5};
    v.erase(std::remove(v.begin(), v.end(), 2), v.end());
    for (int x : v) std::cout << x;
    std::cout << std::endl;
    return 0;
}`,
      solution: `1345`,
      hints: [
        'std::remove shifts non-2 elements to the front.',
        'erase removes the leftover elements at the end.',
        'Remaining elements are 1, 3, 4, 5.',
      ],
      concepts: ['erase-remove-idiom', 'std-remove'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-vector-19',
      title: 'Refactor: raw array to vector',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Replace the raw C-style array with std::vector.',
      skeleton: `#include <iostream>

void printScores() {
    int scores[5] = {90, 85, 78, 92, 88};
    int count = 5;
    for (int i = 0; i < count; ++i) {
        std::cout << scores[i] << " ";
    }
    std::cout << std::endl;
}`,
      solution: `#include <iostream>
#include <vector>

void printScores() {
    std::vector<int> scores = {90, 85, 78, 92, 88};
    for (int s : scores) {
        std::cout << s << " ";
    }
    std::cout << std::endl;
}`,
      hints: [
        'Replace the C-style array with std::vector<int>.',
        'Use a range-based for loop instead of index-based.',
        'No need for a separate count variable; use scores.size().',
      ],
      concepts: ['vector', 'range-for', 'modernization'],
    },
    {
      id: 'cpp-vector-20',
      title: 'Refactor: manual loop to algorithm',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Replace the manual loop with STL algorithms.',
      skeleton: `#include <vector>
#include <iostream>

int sumPositive(const std::vector<int>& v) {
    int sum = 0;
    for (std::size_t i = 0; i < v.size(); ++i) {
        if (v[i] > 0) {
            sum += v[i];
        }
    }
    return sum;
}`,
      solution: `#include <vector>
#include <numeric>
#include <algorithm>
#include <iostream>

int sumPositive(const std::vector<int>& v) {
    return std::accumulate(v.begin(), v.end(), 0,
        [](int acc, int x) { return x > 0 ? acc + x : acc; });
}`,
      hints: [
        'std::accumulate with a custom binary operation replaces the loop.',
        'The lambda checks if the element is positive before adding.',
        'Include <numeric> for std::accumulate.',
      ],
      concepts: ['std-accumulate', 'lambda', 'algorithm'],
    },
  ],
};
