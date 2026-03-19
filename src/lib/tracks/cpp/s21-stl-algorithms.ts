import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-algo',
  title: '21. STL Algorithms',
  explanation: `## STL Algorithms in C++\n\nThe Standard Template Library (STL) provides a rich collection of algorithms that operate on ranges of elements through iterators. These algorithms are defined in the \`<algorithm>\` and \`<numeric>\` headers.\n\n### Common Algorithms\n\n\`\`\`cpp\n#include <algorithm>\n#include <numeric>\n#include <vector>\n\nstd::vector<int> v = {5, 3, 1, 4, 2};\n\n// Sorting\nstd::sort(v.begin(), v.end());           // {1, 2, 3, 4, 5}\nstd::sort(v.begin(), v.end(), std::greater<>()); // descending\n\n// Searching\nauto it = std::find(v.begin(), v.end(), 3);\nbool exists = std::binary_search(v.begin(), v.end(), 3);\n\n// Transforming\nstd::vector<int> out(v.size());\nstd::transform(v.begin(), v.end(), out.begin(),\n    [](int x) { return x * 2; });\n\n// Accumulating\nint sum = std::accumulate(v.begin(), v.end(), 0);\n\n// Filtering with copy_if\nstd::vector<int> evens;\nstd::copy_if(v.begin(), v.end(), std::back_inserter(evens),\n    [](int x) { return x % 2 == 0; });\n\n// Removing elements (erase-remove idiom)\nv.erase(std::remove_if(v.begin(), v.end(),\n    [](int x) { return x < 3; }), v.end());\n\`\`\`\n\n### C++20 Ranges\n\n\`\`\`cpp\n#include <ranges>\n\nnamespace rv = std::views;\nauto result = v | rv::filter([](int x) { return x > 2; })\n                | rv::transform([](int x) { return x * 10; });\n\nstd::ranges::sort(v);\nauto it2 = std::ranges::find(v, 42);\n\`\`\`\n\nSTL algorithms promote writing expressive, bug-free code by abstracting common patterns into reusable, well-tested functions.`,
  exercises: [
    {
      id: 'cpp-algo-1',
      title: 'Sort a Vector',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to sort the vector in ascending order.',
      skeleton: `#include <algorithm>
#include <vector>

int main() {
    std::vector<int> v = {5, 3, 1, 4, 2};
    ___(v.begin(), v.end());
    // v is now {1, 2, 3, 4, 5}
    return 0;
}`,
      solution: `#include <algorithm>
#include <vector>

int main() {
    std::vector<int> v = {5, 3, 1, 4, 2};
    std::sort(v.begin(), v.end());
    // v is now {1, 2, 3, 4, 5}
    return 0;
}`,
      hints: [
        'The sorting function is in the <algorithm> header.',
        'Use std::sort with begin and end iterators.',
        'std::sort(v.begin(), v.end()) sorts ascending by default.',
      ],
      concepts: ['std::sort', 'algorithm-header', 'iterators'],
    },
    {
      id: 'cpp-algo-2',
      title: 'Find an Element',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to find the value 42 in the vector.',
      skeleton: `#include <algorithm>
#include <vector>

int main() {
    std::vector<int> v = {10, 20, 42, 50};
    auto it = ___(v.begin(), v.end(), 42);
    if (it != v.end()) {
        // found!
    }
    return 0;
}`,
      solution: `#include <algorithm>
#include <vector>

int main() {
    std::vector<int> v = {10, 20, 42, 50};
    auto it = std::find(v.begin(), v.end(), 42);
    if (it != v.end()) {
        // found!
    }
    return 0;
}`,
      hints: [
        'The function performs a linear search over the range.',
        'It returns an iterator to the found element or end().',
        'std::find(begin, end, value) is the correct call.',
      ],
      concepts: ['std::find', 'linear-search', 'iterators'],
    },
    {
      id: 'cpp-algo-3',
      title: 'Accumulate a Sum',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to compute the sum of all elements.',
      skeleton: `#include <numeric>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    int sum = ___(v.begin(), v.end(), 0);
    // sum == 15
    return 0;
}`,
      solution: `#include <numeric>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    int sum = std::accumulate(v.begin(), v.end(), 0);
    // sum == 15
    return 0;
}`,
      hints: [
        'This function is in the <numeric> header, not <algorithm>.',
        'The third argument is the initial value of the accumulation.',
        'std::accumulate(begin, end, init) returns the sum.',
      ],
      concepts: ['std::accumulate', 'numeric-header', 'fold'],
    },
    {
      id: 'cpp-algo-4',
      title: 'Transform Elements',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to double every element and store in the output vector.',
      skeleton: `#include <algorithm>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3, 4};
    std::vector<int> out(v.size());
    std::transform(v.begin(), v.end(), out.begin(),
        ___(int x) { return x * 2; });
    // out == {2, 4, 6, 8}
    return 0;
}`,
      solution: `#include <algorithm>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3, 4};
    std::vector<int> out(v.size());
    std::transform(v.begin(), v.end(), out.begin(),
        [](int x) { return x * 2; });
    // out == {2, 4, 6, 8}
    return 0;
}`,
      hints: [
        'The last argument to std::transform is a unary operation.',
        'You can use a lambda expression here.',
        '[](int x) { return x * 2; } is the lambda syntax.',
      ],
      concepts: ['std::transform', 'lambda', 'unary-operation'],
    },
    {
      id: 'cpp-algo-5',
      title: 'Copy Even Numbers',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to copy only even numbers into the result vector.',
      skeleton: `#include <algorithm>
#include <vector>
#include <iterator>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5, 6};
    std::vector<int> evens;
    ___(v.begin(), v.end(), std::back_inserter(evens),
        [](int x) { return x % 2 == 0; });
    // evens == {2, 4, 6}
    return 0;
}`,
      solution: `#include <algorithm>
#include <vector>
#include <iterator>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5, 6};
    std::vector<int> evens;
    std::copy_if(v.begin(), v.end(), std::back_inserter(evens),
        [](int x) { return x % 2 == 0; });
    // evens == {2, 4, 6}
    return 0;
}`,
      hints: [
        'This algorithm copies elements that satisfy a predicate.',
        'std::back_inserter creates an output iterator that pushes back.',
        'std::copy_if is the conditional copy algorithm.',
      ],
      concepts: ['std::copy_if', 'back_inserter', 'predicate'],
    },
    {
      id: 'cpp-algo-6',
      title: 'Sort Descending with Comparator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to sort the vector in descending order.',
      skeleton: `#include <algorithm>
#include <vector>
#include <functional>

int main() {
    std::vector<int> v = {3, 1, 4, 1, 5};
    std::sort(v.begin(), v.end(), ___);
    // v is now {5, 4, 3, 1, 1}
    return 0;
}`,
      solution: `#include <algorithm>
#include <vector>
#include <functional>

int main() {
    std::vector<int> v = {3, 1, 4, 1, 5};
    std::sort(v.begin(), v.end(), std::greater<int>());
    // v is now {5, 4, 3, 1, 1}
    return 0;
}`,
      hints: [
        'You need a comparator that reverses the default ordering.',
        'The <functional> header provides standard comparators.',
        'std::greater<int>() or std::greater<>() sorts descending.',
      ],
      concepts: ['std::sort', 'comparator', 'std::greater'],
    },
    {
      id: 'cpp-algo-7',
      title: 'Write a Count Function',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a function that counts how many elements in a vector are greater than a given threshold using std::count_if.',
      skeleton: `#include <algorithm>
#include <vector>

// Write count_above: takes a vector<int> and an int threshold,
// returns the count of elements > threshold
`,
      solution: `#include <algorithm>
#include <vector>

int count_above(const std::vector<int>& v, int threshold) {
    return std::count_if(v.begin(), v.end(),
        [threshold](int x) { return x > threshold; });
}`,
      hints: [
        'std::count_if takes a range and a predicate.',
        'Capture the threshold in the lambda by value.',
        'Return the result of std::count_if directly.',
      ],
      concepts: ['std::count_if', 'lambda-capture', 'predicate'],
    },
    {
      id: 'cpp-algo-8',
      title: 'Write a Remove-Erase Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that removes all negative numbers from a vector using the erase-remove idiom.',
      skeleton: `#include <algorithm>
#include <vector>

// Write remove_negatives: modifies a vector<int> in-place,
// removing all elements < 0
`,
      solution: `#include <algorithm>
#include <vector>

void remove_negatives(std::vector<int>& v) {
    v.erase(
        std::remove_if(v.begin(), v.end(),
            [](int x) { return x < 0; }),
        v.end()
    );
}`,
      hints: [
        'std::remove_if moves unwanted elements to the end and returns an iterator.',
        'You must call erase() to actually shrink the vector.',
        'The pattern is v.erase(std::remove_if(...), v.end()).',
      ],
      concepts: ['erase-remove-idiom', 'std::remove_if', 'in-place-modification'],
    },
    {
      id: 'cpp-algo-9',
      title: 'Write a Custom Sort',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that sorts a vector of strings by their length (shortest first), breaking ties alphabetically.',
      skeleton: `#include <algorithm>
#include <vector>
#include <string>

// Write sort_by_length: sorts vector<string> by length,
// then alphabetically for same-length strings
`,
      solution: `#include <algorithm>
#include <vector>
#include <string>

void sort_by_length(std::vector<std::string>& v) {
    std::sort(v.begin(), v.end(),
        [](const std::string& a, const std::string& b) {
            if (a.size() != b.size()) return a.size() < b.size();
            return a < b;
        });
}`,
      hints: [
        'Provide a custom comparator lambda to std::sort.',
        'Compare sizes first, then compare strings lexicographically.',
        'The comparator should return true if a should come before b.',
      ],
      concepts: ['std::sort', 'custom-comparator', 'lambda'],
    },
    {
      id: 'cpp-algo-10',
      title: 'Write a Transform-Accumulate Pipeline',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that computes the sum of squares of all elements in a vector using std::transform and std::accumulate (or std::inner_product).',
      skeleton: `#include <algorithm>
#include <numeric>
#include <vector>

// Write sum_of_squares: returns sum of x*x for each x in vector
`,
      solution: `#include <algorithm>
#include <numeric>
#include <vector>

int sum_of_squares(const std::vector<int>& v) {
    std::vector<int> squares(v.size());
    std::transform(v.begin(), v.end(), squares.begin(),
        [](int x) { return x * x; });
    return std::accumulate(squares.begin(), squares.end(), 0);
}`,
      hints: [
        'First transform each element to its square.',
        'Then accumulate the squared values.',
        'Alternatively, use std::accumulate with a custom binary op.',
      ],
      concepts: ['std::transform', 'std::accumulate', 'pipeline'],
    },
    {
      id: 'cpp-algo-11',
      title: 'Write a Partition Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that partitions a vector so all even numbers come before odd numbers, and returns the partition point iterator.',
      skeleton: `#include <algorithm>
#include <vector>

// Write partition_evens: partitions vector so evens come first,
// returns iterator to first odd element
`,
      solution: `#include <algorithm>
#include <vector>

std::vector<int>::iterator partition_evens(std::vector<int>& v) {
    return std::partition(v.begin(), v.end(),
        [](int x) { return x % 2 == 0; });
}`,
      hints: [
        'std::partition rearranges elements based on a predicate.',
        'Elements satisfying the predicate come first.',
        'It returns an iterator to the first element that does not satisfy the predicate.',
      ],
      concepts: ['std::partition', 'predicate', 'iterator-return'],
    },
    {
      id: 'cpp-algo-12',
      title: 'Write a Set Intersection',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that returns the intersection of two sorted vectors.',
      skeleton: `#include <algorithm>
#include <vector>

// Write intersect: takes two sorted vectors, returns their intersection
`,
      solution: `#include <algorithm>
#include <vector>

std::vector<int> intersect(const std::vector<int>& a, const std::vector<int>& b) {
    std::vector<int> result;
    std::set_intersection(a.begin(), a.end(), b.begin(), b.end(),
        std::back_inserter(result));
    return result;
}`,
      hints: [
        'Both input vectors must be sorted for set operations.',
        'std::set_intersection writes common elements to an output iterator.',
        'Use std::back_inserter to append to the result vector.',
      ],
      concepts: ['std::set_intersection', 'sorted-ranges', 'back_inserter'],
    },
    {
      id: 'cpp-algo-13',
      title: 'Fix the Erase-Remove Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the bug in this code that tries to remove all zeros from the vector.',
      skeleton: `#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v = {0, 1, 0, 2, 0, 3};
    std::remove(v.begin(), v.end(), 0);
    // Bug: vector still has 6 elements!
    for (int x : v) std::cout << x << " ";
    return 0;
}`,
      solution: `#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v = {0, 1, 0, 2, 0, 3};
    v.erase(std::remove(v.begin(), v.end(), 0), v.end());
    // Fixed: vector now has 3 elements
    for (int x : v) std::cout << x << " ";
    return 0;
}`,
      hints: [
        'std::remove does not actually erase elements from the container.',
        'It moves unwanted elements to the end and returns an iterator.',
        'You must call erase() on the range from the returned iterator to end().',
      ],
      concepts: ['erase-remove-idiom', 'std::remove', 'iterator'],
    },
    {
      id: 'cpp-algo-14',
      title: 'Fix the Binary Search Precondition',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the bug: binary_search requires a sorted range but the vector is unsorted.',
      skeleton: `#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v = {5, 2, 8, 1, 9, 3};
    bool found = std::binary_search(v.begin(), v.end(), 8);
    std::cout << (found ? "Found" : "Not found") << std::endl;
    return 0;
}`,
      solution: `#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v = {5, 2, 8, 1, 9, 3};
    std::sort(v.begin(), v.end());
    bool found = std::binary_search(v.begin(), v.end(), 8);
    std::cout << (found ? "Found" : "Not found") << std::endl;
    return 0;
}`,
      hints: [
        'std::binary_search has a precondition: the range must be sorted.',
        'Sort the vector before calling binary_search.',
        'Add std::sort(v.begin(), v.end()) before the search.',
      ],
      concepts: ['std::binary_search', 'precondition', 'std::sort'],
    },
    {
      id: 'cpp-algo-15',
      title: 'Fix the Transform Output Size',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the bug where the output vector has zero size, causing undefined behavior in std::transform.',
      skeleton: `#include <algorithm>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3, 4};
    std::vector<int> out;
    std::transform(v.begin(), v.end(), out.begin(),
        [](int x) { return x * 3; });
    return 0;
}`,
      solution: `#include <algorithm>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3, 4};
    std::vector<int> out(v.size());
    std::transform(v.begin(), v.end(), out.begin(),
        [](int x) { return x * 3; });
    return 0;
}`,
      hints: [
        'The output vector must have enough space for the results.',
        'Either pre-size the output vector or use std::back_inserter.',
        'Change std::vector<int> out; to std::vector<int> out(v.size());',
      ],
      concepts: ['std::transform', 'output-iterator', 'container-size'],
    },
    {
      id: 'cpp-algo-16',
      title: 'Predict sort with Custom Comparator',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the output of this program that sorts by absolute value.',
      skeleton: `#include <algorithm>
#include <vector>
#include <iostream>
#include <cmath>

int main() {
    std::vector<int> v = {-3, 1, -5, 2, 4};
    std::sort(v.begin(), v.end(),
        [](int a, int b) { return std::abs(a) < std::abs(b); });
    for (int x : v) std::cout << x << " ";
    std::cout << std::endl;
    return 0;
}`,
      solution: `1 2 -3 4 -5`,
      hints: [
        'The comparator sorts by absolute value: |a| < |b|.',
        'Absolute values: 3, 1, 5, 2, 4 become sorted as 1, 2, 3, 4, 5.',
        'The original signs are preserved: 1 2 -3 4 -5.',
      ],
      concepts: ['std::sort', 'custom-comparator', 'std::abs'],
    },
    {
      id: 'cpp-algo-17',
      title: 'Predict accumulate with Multiplier',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the output when accumulate is used with a custom binary operation.',
      skeleton: `#include <numeric>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v = {1, 2, 3, 4};
    int product = std::accumulate(v.begin(), v.end(), 1,
        [](int a, int b) { return a * b; });
    std::cout << product << std::endl;
    return 0;
}`,
      solution: `24`,
      hints: [
        'The initial value is 1 and the operation is multiplication.',
        'Computation: 1 * 1 = 1, 1 * 2 = 2, 2 * 3 = 6, 6 * 4 = 24.',
        'std::accumulate with a custom op acts as a fold/reduce.',
      ],
      concepts: ['std::accumulate', 'binary-operation', 'fold'],
    },
    {
      id: 'cpp-algo-18',
      title: 'Predict count_if Result',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Predict how many elements satisfy the predicate.',
      skeleton: `#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v = {10, 25, 30, 45, 50, 65, 70};
    auto n = std::count_if(v.begin(), v.end(),
        [](int x) { return x % 10 == 0; });
    std::cout << n << std::endl;
    return 0;
}`,
      solution: `4`,
      hints: [
        'The predicate checks if the element is divisible by 10.',
        'Check each element: 10 yes, 25 no, 30 yes, 45 no, 50 yes, 65 no, 70 yes.',
        'Four elements are divisible by 10.',
      ],
      concepts: ['std::count_if', 'predicate', 'divisibility'],
    },
    {
      id: 'cpp-algo-19',
      title: 'Refactor Loop to STL Algorithm',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor the manual loop to use std::any_of.',
      skeleton: `#include <vector>

bool has_negative(const std::vector<int>& v) {
    for (size_t i = 0; i < v.size(); ++i) {
        if (v[i] < 0) {
            return true;
        }
    }
    return false;
}`,
      solution: `#include <algorithm>
#include <vector>

bool has_negative(const std::vector<int>& v) {
    return std::any_of(v.begin(), v.end(),
        [](int x) { return x < 0; });
}`,
      hints: [
        'std::any_of returns true if any element satisfies the predicate.',
        'Replace the entire loop with a single algorithm call.',
        'Remember to include <algorithm>.',
      ],
      concepts: ['std::any_of', 'refactoring', 'algorithm-replacement'],
    },
    {
      id: 'cpp-algo-20',
      title: 'Refactor to Ranges Pipeline',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor the imperative code to use C++20 ranges with views::filter and views::transform.',
      skeleton: `#include <algorithm>
#include <vector>

std::vector<int> get_doubled_positives(const std::vector<int>& v) {
    std::vector<int> result;
    for (int x : v) {
        if (x > 0) {
            result.push_back(x * 2);
        }
    }
    return result;
}`,
      solution: `#include <algorithm>
#include <ranges>
#include <vector>

std::vector<int> get_doubled_positives(const std::vector<int>& v) {
    auto view = v | std::views::filter([](int x) { return x > 0; })
                  | std::views::transform([](int x) { return x * 2; });
    return std::vector<int>(view.begin(), view.end());
}`,
      hints: [
        'C++20 ranges allow chaining operations with the pipe operator.',
        'Use std::views::filter for the condition and std::views::transform for doubling.',
        'Construct the result vector from the view range.',
      ],
      concepts: ['ranges', 'views::filter', 'views::transform', 'pipeline'],
    },
  ],
};
