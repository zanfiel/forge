import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-iter',
  title: '22. Iterators',
  explanation: `## Iterators in C++\n\nIterators are objects that provide a uniform way to traverse and access elements in containers. They act as a generalized pointer abstraction and are the glue between containers and algorithms in the STL.\n\n### Iterator Categories\n\n\`\`\`cpp\n// Input Iterator:        read-only, single-pass, forward only\n// Output Iterator:       write-only, single-pass, forward only\n// Forward Iterator:      read/write, multi-pass, forward only\n// Bidirectional Iterator: read/write, multi-pass, forward and backward\n// Random Access Iterator: read/write, multi-pass, arbitrary jumps\n// (C++20) Contiguous Iterator: like random access, guaranteed contiguous memory\n\`\`\`\n\n### Using Iterators\n\n\`\`\`cpp\n#include <vector>\n#include <list>\n#include <iterator>\n\nstd::vector<int> v = {1, 2, 3, 4, 5};\n\n// begin/end\nauto it = v.begin();   // points to first element\nauto end = v.end();    // points past the last element\n\n// Traversal\nfor (auto it = v.begin(); it != v.end(); ++it) {\n    std::cout << *it << \" \";\n}\n\n// Reverse iterators\nfor (auto rit = v.rbegin(); rit != v.rend(); ++rit) {\n    std::cout << *rit << \" \"; // 5 4 3 2 1\n}\n\n// Iterator arithmetic (random access only)\nauto mid = v.begin() + v.size() / 2;\nstd::ptrdiff_t dist = std::distance(v.begin(), mid);\nstd::advance(it, 3); // moves iterator forward by 3\n\`\`\`\n\n### Iterator Adapters\n\n\`\`\`cpp\n#include <iterator>\n\n// back_inserter: creates output iterator that calls push_back\nstd::vector<int> out;\nstd::copy(v.begin(), v.end(), std::back_inserter(out));\n\n// front_inserter: calls push_front (for deque, list)\n// inserter: inserts at a given position\nstd::set<int> s;\nstd::copy(v.begin(), v.end(), std::inserter(s, s.begin()));\n\`\`\`\n\nIterators provide the abstraction layer that allows STL algorithms to work with any container type.`,
  exercises: [
    {
      id: 'cpp-iter-1',
      title: 'Get Begin Iterator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to get an iterator pointing to the first element.',
      skeleton: `#include <vector>
#include <iostream>

int main() {
    std::vector<int> v = {10, 20, 30};
    auto it = v.___();
    std::cout << *it << std::endl; // prints 10
    return 0;
}`,
      solution: `#include <vector>
#include <iostream>

int main() {
    std::vector<int> v = {10, 20, 30};
    auto it = v.begin();
    std::cout << *it << std::endl; // prints 10
    return 0;
}`,
      hints: [
        'The member function returns an iterator to the first element.',
        'It is the counterpart of end().',
        'v.begin() returns the starting iterator.',
      ],
      concepts: ['begin', 'iterator', 'dereference'],
    },
    {
      id: 'cpp-iter-2',
      title: 'Advance an Iterator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to move the iterator forward by 3 positions.',
      skeleton: `#include <vector>
#include <iterator>
#include <iostream>

int main() {
    std::vector<int> v = {10, 20, 30, 40, 50};
    auto it = v.begin();
    ___(it, 3);
    std::cout << *it << std::endl; // prints 40
    return 0;
}`,
      solution: `#include <vector>
#include <iterator>
#include <iostream>

int main() {
    std::vector<int> v = {10, 20, 30, 40, 50};
    auto it = v.begin();
    std::advance(it, 3);
    std::cout << *it << std::endl; // prints 40
    return 0;
}`,
      hints: [
        'This function moves an iterator by a given number of steps.',
        'It works with all iterator categories.',
        'std::advance(it, n) modifies the iterator in-place.',
      ],
      concepts: ['std::advance', 'iterator-movement', 'in-place'],
    },
    {
      id: 'cpp-iter-3',
      title: 'Compute Distance',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to compute the number of elements between two iterators.',
      skeleton: `#include <vector>
#include <iterator>
#include <iostream>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    auto first = v.begin();
    auto last = v.end();
    auto dist = ___(first, last);
    std::cout << dist << std::endl; // prints 5
    return 0;
}`,
      solution: `#include <vector>
#include <iterator>
#include <iostream>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    auto first = v.begin();
    auto last = v.end();
    auto dist = std::distance(first, last);
    std::cout << dist << std::endl; // prints 5
    return 0;
}`,
      hints: [
        'This function returns the number of increments to get from first to last.',
        'It is the counterpart of std::advance.',
        'std::distance(first, last) returns the distance.',
      ],
      concepts: ['std::distance', 'iterator-arithmetic', 'range-size'],
    },
    {
      id: 'cpp-iter-4',
      title: 'Use Reverse Iterator',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blanks to iterate through the vector in reverse order.',
      skeleton: `#include <vector>
#include <iostream>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    for (auto rit = v.___(); rit != v.___(); ++rit) {
        std::cout << *rit << " ";
    }
    // Output: 5 4 3 2 1
    return 0;
}`,
      solution: `#include <vector>
#include <iostream>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    for (auto rit = v.rbegin(); rit != v.rend(); ++rit) {
        std::cout << *rit << " ";
    }
    // Output: 5 4 3 2 1
    return 0;
}`,
      hints: [
        'Reverse iterators start from the last element and move backwards.',
        'rbegin() returns a reverse iterator to the last element.',
        'rend() returns a reverse iterator before the first element.',
      ],
      concepts: ['rbegin', 'rend', 'reverse-iterator'],
    },
    {
      id: 'cpp-iter-5',
      title: 'Use back_inserter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to use back_inserter as the output iterator for std::copy.',
      skeleton: `#include <vector>
#include <algorithm>
#include <iterator>

int main() {
    std::vector<int> src = {1, 2, 3};
    std::vector<int> dst;
    std::copy(src.begin(), src.end(), ___(dst));
    // dst == {1, 2, 3}
    return 0;
}`,
      solution: `#include <vector>
#include <algorithm>
#include <iterator>

int main() {
    std::vector<int> src = {1, 2, 3};
    std::vector<int> dst;
    std::copy(src.begin(), src.end(), std::back_inserter(dst));
    // dst == {1, 2, 3}
    return 0;
}`,
      hints: [
        'This adapter creates an output iterator that calls push_back.',
        'It allows algorithms to append to a container.',
        'std::back_inserter(container) wraps the container.',
      ],
      concepts: ['std::back_inserter', 'output-iterator', 'iterator-adapter'],
    },
    {
      id: 'cpp-iter-6',
      title: 'Use std::next',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to get an iterator pointing to the second element without modifying the original.',
      skeleton: `#include <vector>
#include <iterator>
#include <iostream>

int main() {
    std::vector<int> v = {10, 20, 30, 40};
    auto it = v.begin();
    auto second = ___(it);
    std::cout << *it << " " << *second << std::endl;
    // Output: 10 20
    return 0;
}`,
      solution: `#include <vector>
#include <iterator>
#include <iostream>

int main() {
    std::vector<int> v = {10, 20, 30, 40};
    auto it = v.begin();
    auto second = std::next(it);
    std::cout << *it << " " << *second << std::endl;
    // Output: 10 20
    return 0;
}`,
      hints: [
        'Unlike std::advance, this returns a new iterator without modifying the original.',
        'It moves forward by 1 position by default.',
        'std::next(it) returns a copy advanced by one.',
      ],
      concepts: ['std::next', 'non-destructive', 'iterator-copy'],
    },
    {
      id: 'cpp-iter-7',
      title: 'Write an Iterator-Based Sum',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a function template that sums elements between two iterators.',
      skeleton: `// Write sum_range: takes two iterators (begin, end) and returns
// the sum of all elements in the range.
// Use a template so it works with any iterator type.
`,
      solution: `template <typename Iter>
auto sum_range(Iter begin, Iter end) {
    typename std::iterator_traits<Iter>::value_type sum{};
    for (auto it = begin; it != end; ++it) {
        sum += *it;
    }
    return sum;
}`,
      hints: [
        'Use a template parameter for the iterator type.',
        'Initialize sum to zero using value initialization.',
        'Use std::iterator_traits<Iter>::value_type to get the element type.',
      ],
      concepts: ['function-template', 'iterator_traits', 'generic-programming'],
    },
    {
      id: 'cpp-iter-8',
      title: 'Write a Find-Nth Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that returns an iterator to the nth occurrence of a value in a container range.',
      skeleton: `#include <iterator>

// Write find_nth: takes begin, end iterators, a value, and n (1-based).
// Returns iterator to the nth occurrence of value, or end if not found.
`,
      solution: `#include <iterator>

template <typename Iter, typename T>
Iter find_nth(Iter begin, Iter end, const T& value, int n) {
    int count = 0;
    for (auto it = begin; it != end; ++it) {
        if (*it == value) {
            ++count;
            if (count == n) return it;
        }
    }
    return end;
}`,
      hints: [
        'Iterate through the range, counting matches.',
        'Return the iterator when the count reaches n.',
        'Return end if fewer than n occurrences exist.',
      ],
      concepts: ['template-function', 'iterator-traversal', 'counting'],
    },
    {
      id: 'cpp-iter-9',
      title: 'Write a Sliding Window Maximum',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function that returns the maximum element in each sliding window of size k using iterators.',
      skeleton: `#include <vector>
#include <algorithm>
#include <iterator>

// Write sliding_max: takes a vector<int> and window size k,
// returns vector<int> of the max in each window of size k.
// Example: {1,3,2,5,4}, k=3 -> {3,5,5}
`,
      solution: `#include <vector>
#include <algorithm>
#include <iterator>

std::vector<int> sliding_max(const std::vector<int>& v, int k) {
    std::vector<int> result;
    if (static_cast<int>(v.size()) < k || k <= 0) return result;
    for (auto it = v.begin(); it + k <= v.end(); ++it) {
        result.push_back(*std::max_element(it, it + k));
    }
    return result;
}`,
      hints: [
        'Slide a window of size k across the vector using iterators.',
        'Use std::max_element to find the max in each window.',
        'The number of windows is v.size() - k + 1.',
      ],
      concepts: ['sliding-window', 'std::max_element', 'iterator-arithmetic'],
    },
    {
      id: 'cpp-iter-10',
      title: 'Write a Custom Iterator Class',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a simple forward iterator class called CountIterator that generates integers from a starting value.',
      skeleton: `#include <iterator>

// Write CountIterator: a forward iterator that yields integers
// starting from a given value. Support *, ++, ==, !=.
// Example: CountIterator(0) yields 0, 1, 2, 3, ...
`,
      solution: `#include <iterator>

class CountIterator {
public:
    using iterator_category = std::forward_iterator_tag;
    using value_type = int;
    using difference_type = std::ptrdiff_t;
    using pointer = const int*;
    using reference = const int&;

    explicit CountIterator(int val = 0) : value_(val) {}

    reference operator*() const { return value_; }
    pointer operator->() const { return &value_; }

    CountIterator& operator++() { ++value_; return *this; }
    CountIterator operator++(int) { auto tmp = *this; ++value_; return tmp; }

    bool operator==(const CountIterator& other) const { return value_ == other.value_; }
    bool operator!=(const CountIterator& other) const { return value_ != other.value_; }

private:
    int value_;
};`,
      hints: [
        'Define the five iterator type aliases: iterator_category, value_type, difference_type, pointer, reference.',
        'Implement operator*, operator++, operator==, and operator!=.',
        'Use std::forward_iterator_tag as the category.',
      ],
      concepts: ['custom-iterator', 'iterator-traits', 'forward-iterator'],
    },
    {
      id: 'cpp-iter-11',
      title: 'Write a Zip Iterator Function',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function that zips two vectors into a vector of pairs using iterators.',
      skeleton: `#include <vector>
#include <utility>

// Write zip: takes two vectors, returns vector of pairs
// pairing elements at matching positions. Stop at the shorter vector.
`,
      solution: `#include <vector>
#include <utility>

template <typename T, typename U>
std::vector<std::pair<T, U>> zip(const std::vector<T>& a, const std::vector<U>& b) {
    std::vector<std::pair<T, U>> result;
    auto it_a = a.begin();
    auto it_b = b.begin();
    while (it_a != a.end() && it_b != b.end()) {
        result.emplace_back(*it_a, *it_b);
        ++it_a;
        ++it_b;
    }
    return result;
}`,
      hints: [
        'Iterate both containers simultaneously with two iterators.',
        'Stop when either iterator reaches end().',
        'Use emplace_back to construct pairs in-place.',
      ],
      concepts: ['parallel-iteration', 'std::pair', 'template-function'],
    },
    {
      id: 'cpp-iter-12',
      title: 'Write a Range Adaptor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that returns a subrange from index start to end (exclusive) as a vector using iterators.',
      skeleton: `#include <vector>
#include <iterator>

// Write subrange: takes a vector<int>, start index, end index (exclusive)
// returns a new vector with elements in that range
`,
      solution: `#include <vector>
#include <iterator>

std::vector<int> subrange(const std::vector<int>& v, int start, int end) {
    auto first = std::next(v.begin(), start);
    auto last = std::next(v.begin(), end);
    return std::vector<int>(first, last);
}`,
      hints: [
        'Use std::next to get iterators at the start and end positions.',
        'Construct a new vector from the two iterators.',
        'std::next(v.begin(), n) returns an iterator n positions from the beginning.',
      ],
      concepts: ['std::next', 'range-construction', 'subrange'],
    },
    {
      id: 'cpp-iter-13',
      title: 'Fix Invalid Iterator After Erase',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the bug where the iterator is invalidated after erasing an element.',
      skeleton: `#include <vector>
#include <iostream>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    for (auto it = v.begin(); it != v.end(); ++it) {
        if (*it % 2 == 0) {
            v.erase(it);
        }
    }
    for (int x : v) std::cout << x << " ";
    return 0;
}`,
      solution: `#include <vector>
#include <iostream>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    for (auto it = v.begin(); it != v.end(); ) {
        if (*it % 2 == 0) {
            it = v.erase(it);
        } else {
            ++it;
        }
    }
    for (int x : v) std::cout << x << " ";
    return 0;
}`,
      hints: [
        'erase() invalidates the iterator at the erased position.',
        'erase() returns a valid iterator to the next element.',
        'Assign the return of erase() to the iterator and do not increment in that case.',
      ],
      concepts: ['iterator-invalidation', 'erase', 'correct-loop'],
    },
    {
      id: 'cpp-iter-14',
      title: 'Fix Off-By-One with Reverse Iterator',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the bug where base() on a reverse iterator gives the wrong element.',
      skeleton: `#include <vector>
#include <algorithm>
#include <iostream>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    auto rit = std::find(v.rbegin(), v.rend(), 3);
    // Bug: trying to erase using reverse iterator base directly
    // but base() points one past the element rit points to
    v.erase(rit.base());
    for (int x : v) std::cout << x << " ";
    // Expected: 1 2 4 5
    return 0;
}`,
      solution: `#include <vector>
#include <algorithm>
#include <iostream>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    auto rit = std::find(v.rbegin(), v.rend(), 3);
    // base() points one past the reverse iterator's element
    v.erase(std::prev(rit.base()));
    for (int x : v) std::cout << x << " ";
    // Output: 1 2 4 5
    return 0;
}`,
      hints: [
        'A reverse iterator\'s base() points one element after what the reverse iterator points to.',
        'To get the correct forward iterator, use std::prev(rit.base()).',
        'This is a well-known reverse-iterator pitfall.',
      ],
      concepts: ['reverse-iterator', 'base', 'std::prev'],
    },
    {
      id: 'cpp-iter-15',
      title: 'Fix the Dangling Iterator',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the bug where push_back invalidates the stored iterator.',
      skeleton: `#include <vector>
#include <iostream>

int main() {
    std::vector<int> v = {1, 2, 3};
    auto it = v.begin(); // save iterator
    v.push_back(4);      // may reallocate!
    v.push_back(5);
    std::cout << *it << std::endl; // undefined behavior!
    return 0;
}`,
      solution: `#include <vector>
#include <iostream>

int main() {
    std::vector<int> v = {1, 2, 3};
    v.push_back(4);
    v.push_back(5);
    auto it = v.begin(); // get iterator AFTER modifications
    std::cout << *it << std::endl; // safe: prints 1
    return 0;
}`,
      hints: [
        'push_back may cause reallocation, invalidating all iterators.',
        'Never store iterators across operations that might reallocate.',
        'Get the iterator after all modifications are done.',
      ],
      concepts: ['iterator-invalidation', 'reallocation', 'push_back'],
    },
    {
      id: 'cpp-iter-16',
      title: 'Predict Iterator Arithmetic',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Predict the output of this iterator arithmetic code.',
      skeleton: `#include <vector>
#include <iostream>

int main() {
    std::vector<int> v = {10, 20, 30, 40, 50};
    auto it = v.begin() + 2;
    std::cout << *it << " ";
    it -= 1;
    std::cout << *it << " ";
    std::cout << *(it + 3) << std::endl;
    return 0;
}`,
      solution: `30 20 50`,
      hints: [
        'v.begin() + 2 points to the element at index 2 which is 30.',
        'Subtracting 1 moves to index 1 which is 20.',
        'it + 3 from index 1 goes to index 4 which is 50.',
      ],
      concepts: ['random-access-iterator', 'iterator-arithmetic', 'dereference'],
    },
    {
      id: 'cpp-iter-17',
      title: 'Predict Reverse Iterator Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the output when using reverse iterators.',
      skeleton: `#include <vector>
#include <iostream>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    auto rit = v.rbegin();
    std::cout << *rit << " ";
    ++rit;
    ++rit;
    std::cout << *rit << " ";
    std::cout << *(rit.base()) << std::endl;
    return 0;
}`,
      solution: `5 3 4`,
      hints: [
        'rbegin() points to the last element: 5.',
        'Incrementing a reverse iterator twice moves backward: to 3 (index 2).',
        'base() returns one past the reverse position, so it points to 4.',
      ],
      concepts: ['reverse-iterator', 'rbegin', 'base'],
    },
    {
      id: 'cpp-iter-18',
      title: 'Predict std::distance Result',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Predict the distance output.',
      skeleton: `#include <vector>
#include <iterator>
#include <iostream>
#include <algorithm>

int main() {
    std::vector<int> v = {10, 20, 30, 40, 50, 60};
    auto it = std::find(v.begin(), v.end(), 40);
    std::cout << std::distance(v.begin(), it) << std::endl;
    return 0;
}`,
      solution: `3`,
      hints: [
        'std::find returns an iterator to the element 40.',
        '40 is at index 3 in the vector.',
        'std::distance from begin to that position is 3.',
      ],
      concepts: ['std::distance', 'std::find', 'index-from-iterator'],
    },
    {
      id: 'cpp-iter-19',
      title: 'Refactor Index Loop to Iterator Loop',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Refactor the index-based loop to use iterators.',
      skeleton: `#include <vector>
#include <iostream>

int main() {
    std::vector<int> v = {10, 20, 30, 40, 50};
    for (size_t i = 0; i < v.size(); ++i) {
        std::cout << v[i] << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
      solution: `#include <vector>
#include <iostream>

int main() {
    std::vector<int> v = {10, 20, 30, 40, 50};
    for (auto it = v.begin(); it != v.end(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
      hints: [
        'Replace the index variable with an iterator.',
        'Use v.begin() and v.end() for the loop bounds.',
        'Dereference the iterator with *it instead of v[i].',
      ],
      concepts: ['iterator-loop', 'begin-end', 'refactoring'],
    },
    {
      id: 'cpp-iter-20',
      title: 'Refactor to Use std::next/prev',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor the code to use std::next and std::prev instead of manual pointer arithmetic and raw offsets.',
      skeleton: `#include <list>
#include <iostream>

int main() {
    std::list<int> lst = {10, 20, 30, 40, 50};
    auto it = lst.begin();
    ++it; ++it; // move to 30
    auto before = it;
    --before; // move back to 20
    auto after = it;
    ++after; // move forward to 40
    std::cout << *before << " " << *it << " " << *after << std::endl;
    return 0;
}`,
      solution: `#include <list>
#include <iterator>
#include <iostream>

int main() {
    std::list<int> lst = {10, 20, 30, 40, 50};
    auto it = std::next(lst.begin(), 2); // points to 30
    auto before = std::prev(it);          // points to 20
    auto after = std::next(it);           // points to 40
    std::cout << *before << " " << *it << " " << *after << std::endl;
    return 0;
}`,
      hints: [
        'std::next(it, n) returns a new iterator advanced by n positions.',
        'std::prev(it) returns a new iterator one position back.',
        'These are cleaner than manual increment/decrement chains.',
      ],
      concepts: ['std::next', 'std::prev', 'clean-code'],
    },
  ],
};
