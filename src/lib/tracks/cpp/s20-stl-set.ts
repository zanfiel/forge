import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-set',
  title: '20. STL Set',
  explanation: `## STL Set in C++

\`std::set\` stores unique elements in sorted order. \`std::unordered_set\` uses a hash table for O(1) average operations.

### std::set
\`\`\`cpp
#include <set>
std::set<int> s = {3, 1, 4, 1, 5};
// s contains {1, 3, 4, 5} - duplicates removed, sorted
\`\`\`

### std::unordered_set
\`\`\`cpp
#include <unordered_set>
std::unordered_set<std::string> tags = {"cpp", "stl"};
\`\`\`

### Core Operations
- \`insert(val)\` -- inserts if not present, returns pair<iterator, bool>
- \`find(val)\` -- returns iterator or \`end()\`
- \`count(val)\` -- returns 0 or 1
- \`erase(val)\` or \`erase(it)\` -- removes element
- \`contains(val)\` (C++20)

### std::multiset
Allows duplicate elements. \`count()\` can return > 1.
\`\`\`cpp
std::multiset<int> ms = {1, 1, 2, 3, 3, 3};
ms.count(3);  // returns 3
\`\`\`

### Custom Comparators
\`\`\`cpp
auto cmp = [](int a, int b) { return a > b; };
std::set<int, decltype(cmp)> descending(cmp);
\`\`\`

### Set Operations (with <algorithm>)
- \`std::set_union\`
- \`std::set_intersection\`
- \`std::set_difference\`
- \`std::set_symmetric_difference\`

These work on sorted ranges and output to an iterator.
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-set-1',
      title: 'Create a set',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the container type for a sorted unique collection.',
      skeleton: `#include <set>

std::__BLANK__<int> numbers = {5, 3, 1, 4, 1, 5};
// numbers contains {1, 3, 4, 5}`,
      solution: `#include <set>

std::set<int> numbers = {5, 3, 1, 4, 1, 5};
// numbers contains {1, 3, 4, 5}`,
      hints: [
        'This container stores unique elements in sorted order.',
        'Duplicate values are automatically ignored.',
        'The container is `set`.',
      ],
      concepts: ['set', 'unique-elements'],
    },
    {
      id: 'cpp-set-2',
      title: 'Insert into a set',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the method to add an element to the set.',
      skeleton: `std::set<std::string> colors;
colors.__BLANK__("red");
colors.__BLANK__("blue");
colors.__BLANK__("red");  // ignored, already exists`,
      solution: `std::set<std::string> colors;
colors.insert("red");
colors.insert("blue");
colors.insert("red");  // ignored, already exists`,
      hints: [
        'This method adds an element if it is not already present.',
        'It returns a pair with an iterator and a bool indicating success.',
        'The method is `insert`.',
      ],
      concepts: ['insert', 'set'],
    },
    {
      id: 'cpp-set-3',
      title: 'Check membership with count',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Check if an element exists in the set.',
      skeleton: `std::set<int> primes = {2, 3, 5, 7, 11};
if (primes.__BLANK__(7)) {
    std::cout << "7 is prime" << std::endl;
}`,
      solution: `std::set<int> primes = {2, 3, 5, 7, 11};
if (primes.count(7)) {
    std::cout << "7 is prime" << std::endl;
}`,
      hints: [
        'For a set, this method returns 0 or 1.',
        'It checks if the value exists in the set.',
        'The method is `count`.',
      ],
      concepts: ['count', 'membership-test', 'set'],
    },
    {
      id: 'cpp-set-4',
      title: 'Multiset declaration',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the container type that allows duplicate elements.',
      skeleton: `#include <set>

std::__BLANK__<int> bag = {1, 1, 2, 3, 3, 3};
// bag.count(3) == 3`,
      solution: `#include <set>

std::multiset<int> bag = {1, 1, 2, 3, 3, 3};
// bag.count(3) == 3`,
      hints: [
        'Unlike set, this container allows duplicates.',
        'Elements are still kept in sorted order.',
        'The container is `multiset`.',
      ],
      concepts: ['multiset', 'duplicates'],
    },
    {
      id: 'cpp-set-5',
      title: 'Find in a set',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Use find() to locate an element and erase it.',
      skeleton: `std::set<int> s = {10, 20, 30, 40};
auto it = s.__BLANK__(30);
if (it != s.end()) {
    s.erase(it);
}`,
      solution: `std::set<int> s = {10, 20, 30, 40};
auto it = s.find(30);
if (it != s.end()) {
    s.erase(it);
}`,
      hints: [
        'This method returns an iterator to the element or end().',
        'It has O(log n) complexity for std::set.',
        'The method is `find`.',
      ],
      concepts: ['find', 'erase', 'set'],
    },
    {
      id: 'cpp-set-6',
      title: 'Unordered set declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the hash-based set type.',
      skeleton: `#include <unordered_set>

std::__BLANK__<std::string> seen;
seen.insert("apple");
seen.insert("banana");`,
      solution: `#include <unordered_set>

std::unordered_set<std::string> seen;
seen.insert("apple");
seen.insert("banana");`,
      hints: [
        'This set uses hashing instead of a tree.',
        'It provides O(1) average insertions and lookups.',
        'The type is `unordered_set`.',
      ],
      concepts: ['unordered-set', 'hash-table'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-set-7',
      title: 'Write a function to remove duplicates',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a function that returns a vector with duplicates removed, preserving sorted order.',
      skeleton: `#include <set>
#include <vector>
// Write: std::vector<int> unique(const std::vector<int>& v)
// Returns sorted unique elements.`,
      solution: `#include <set>
#include <vector>

std::vector<int> unique(const std::vector<int>& v) {
    std::set<int> s(v.begin(), v.end());
    return std::vector<int>(s.begin(), s.end());
}`,
      hints: [
        'Construct a set from the vector to remove duplicates.',
        'Convert the set back to a vector.',
        'The set keeps elements sorted automatically.',
      ],
      concepts: ['set', 'vector', 'deduplication'],
    },
    {
      id: 'cpp-set-8',
      title: 'Write a set intersection function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that returns the intersection of two sets.',
      skeleton: `#include <set>
#include <algorithm>
#include <iterator>
// Write: std::set<int> intersect(const std::set<int>& a, const std::set<int>& b)
// Returns elements common to both sets.`,
      solution: `#include <set>
#include <algorithm>
#include <iterator>

std::set<int> intersect(const std::set<int>& a, const std::set<int>& b) {
    std::set<int> result;
    std::set_intersection(a.begin(), a.end(), b.begin(), b.end(),
                          std::inserter(result, result.begin()));
    return result;
}`,
      hints: [
        'Use std::set_intersection from <algorithm>.',
        'Both input ranges must be sorted (sets are always sorted).',
        'Use std::inserter to insert results into the output set.',
      ],
      concepts: ['set-intersection', 'std-algorithm', 'inserter'],
    },
    {
      id: 'cpp-set-9',
      title: 'Write a set union function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that returns the union of two sets.',
      skeleton: `#include <set>
#include <algorithm>
#include <iterator>
// Write: std::set<int> setUnion(const std::set<int>& a, const std::set<int>& b)`,
      solution: `#include <set>
#include <algorithm>
#include <iterator>

std::set<int> setUnion(const std::set<int>& a, const std::set<int>& b) {
    std::set<int> result;
    std::set_union(a.begin(), a.end(), b.begin(), b.end(),
                   std::inserter(result, result.begin()));
    return result;
}`,
      hints: [
        'Use std::set_union from <algorithm>.',
        'It merges two sorted ranges, removing duplicates.',
        'Output to a set via std::inserter.',
      ],
      concepts: ['set-union', 'std-algorithm', 'inserter'],
    },
    {
      id: 'cpp-set-10',
      title: 'Write a function with custom comparator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function that returns a set of strings sorted by length (shortest first).',
      skeleton: `#include <set>
#include <string>
#include <vector>
// Write: a set with custom comparator that sorts strings by length
// Function: auto sortByLength(const std::vector<std::string>& words)
// If equal length, use lexicographic order as tiebreaker.`,
      solution: `#include <set>
#include <string>
#include <vector>

struct LengthCompare {
    bool operator()(const std::string& a, const std::string& b) const {
        if (a.size() != b.size()) return a.size() < b.size();
        return a < b;
    }
};

std::set<std::string, LengthCompare> sortByLength(
    const std::vector<std::string>& words) {
    return std::set<std::string, LengthCompare>(words.begin(), words.end());
}`,
      hints: [
        'Define a struct with operator() as the comparator.',
        'Compare by size first, then lexicographically.',
        'Pass the comparator type as the second template argument to set.',
      ],
      concepts: ['custom-comparator', 'set', 'functor'],
    },
    {
      id: 'cpp-set-11',
      title: 'Write a function to check subset',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that checks if set a is a subset of set b.',
      skeleton: `#include <set>
#include <algorithm>
// Write: bool isSubset(const std::set<int>& a, const std::set<int>& b)
// Returns true if every element of a is also in b.`,
      solution: `#include <set>
#include <algorithm>

bool isSubset(const std::set<int>& a, const std::set<int>& b) {
    return std::includes(b.begin(), b.end(), a.begin(), a.end());
}`,
      hints: [
        'std::includes checks if one sorted range contains another.',
        'Both sets are already sorted.',
        'includes(b, a) checks if b includes all elements of a.',
      ],
      concepts: ['std-includes', 'subset', 'set'],
    },
    {
      id: 'cpp-set-12',
      title: 'Write a function using unordered_set for fast lookup',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function that finds the first duplicate in a vector using an unordered_set.',
      skeleton: `#include <unordered_set>
#include <vector>
#include <optional>
// Write: std::optional<int> firstDuplicate(const std::vector<int>& v)
// Returns the first element that appears more than once, or std::nullopt.`,
      solution: `#include <unordered_set>
#include <vector>
#include <optional>

std::optional<int> firstDuplicate(const std::vector<int>& v) {
    std::unordered_set<int> seen;
    for (int x : v) {
        if (seen.count(x)) return x;
        seen.insert(x);
    }
    return std::nullopt;
}`,
      hints: [
        'Track seen elements in an unordered_set.',
        'Before inserting each element, check if it is already in the set.',
        'Return the element immediately when a duplicate is found.',
      ],
      concepts: ['unordered-set', 'duplicate-detection', 'optional'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-set-13',
      title: 'Fix: modifying set element',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the code that tries to modify a set element in-place.',
      skeleton: `#include <set>
#include <iostream>

int main() {
    std::set<int> s = {10, 20, 30};
    auto it = s.find(20);
    // Bug: set elements are const - cannot modify
    // *it = 25;

    // Fix: erase and re-insert
    std::cout << s.count(25) << std::endl;
    return 0;
}`,
      solution: `#include <set>
#include <iostream>

int main() {
    std::set<int> s = {10, 20, 30};
    auto it = s.find(20);
    if (it != s.end()) {
        s.erase(it);
        s.insert(25);
    }
    std::cout << s.count(25) << std::endl;
    return 0;
}`,
      hints: [
        'Set elements are immutable to preserve the sorted invariant.',
        'You cannot modify an element through an iterator.',
        'Erase the old value and insert the new one.',
      ],
      concepts: ['set', 'immutable-elements', 'erase-insert'],
    },
    {
      id: 'cpp-set-14',
      title: 'Fix: wrong comparator breaks set invariant',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fix the comparator that violates strict weak ordering.',
      skeleton: `#include <set>

struct BadCompare {
    bool operator()(int a, int b) const {
        return a <= b;  // Bug: not strict weak ordering (a <= a is true)
    }
};

int main() {
    std::set<int, BadCompare> s;
    s.insert(1);
    s.insert(2);
    s.insert(1);  // undefined behaviour
    return 0;
}`,
      solution: `#include <set>

struct GoodCompare {
    bool operator()(int a, int b) const {
        return a < b;  // strict weak ordering
    }
};

int main() {
    std::set<int, GoodCompare> s;
    s.insert(1);
    s.insert(2);
    s.insert(1);  // correctly detected as duplicate
    return 0;
}`,
      hints: [
        'Comparators must satisfy strict weak ordering.',
        'comp(a, a) must return false (irreflexivity).',
        'Change <= to < for a valid comparator.',
      ],
      concepts: ['strict-weak-ordering', 'comparator', 'set'],
    },
    {
      id: 'cpp-set-15',
      title: 'Fix: using set_intersection on unsorted vector',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the code so set_intersection works correctly.',
      skeleton: `#include <vector>
#include <algorithm>
#include <iterator>
#include <iostream>

int main() {
    std::vector<int> a = {3, 1, 4, 1, 5};
    std::vector<int> b = {5, 9, 2, 6, 5, 3};
    std::vector<int> result;
    // Bug: set_intersection requires sorted ranges
    std::set_intersection(a.begin(), a.end(), b.begin(), b.end(),
                          std::back_inserter(result));
    for (int x : result) std::cout << x << " ";
    return 0;
}`,
      solution: `#include <vector>
#include <algorithm>
#include <iterator>
#include <iostream>

int main() {
    std::vector<int> a = {3, 1, 4, 1, 5};
    std::vector<int> b = {5, 9, 2, 6, 5, 3};
    std::sort(a.begin(), a.end());
    std::sort(b.begin(), b.end());
    std::vector<int> result;
    std::set_intersection(a.begin(), a.end(), b.begin(), b.end(),
                          std::back_inserter(result));
    for (int x : result) std::cout << x << " ";
    return 0;
}`,
      hints: [
        'set_intersection requires both input ranges to be sorted.',
        'The vectors are unsorted, leading to undefined results.',
        'Sort both vectors before calling set_intersection.',
      ],
      concepts: ['set-intersection', 'sorted-range', 'precondition'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-set-16',
      title: 'Predict: set ignores duplicates',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Predict the size and contents of the set.',
      skeleton: `#include <iostream>
#include <set>

int main() {
    std::set<int> s;
    s.insert(5);
    s.insert(3);
    s.insert(5);
    s.insert(1);
    s.insert(3);
    std::cout << s.size() << std::endl;
    return 0;
}`,
      solution: `3`,
      hints: [
        'Duplicate inserts are silently ignored.',
        'Unique values are: 5, 3, 1.',
        'Size is 3.',
      ],
      concepts: ['set', 'unique-elements', 'size'],
    },
    {
      id: 'cpp-set-17',
      title: 'Predict: multiset count',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the count of an element in a multiset.',
      skeleton: `#include <iostream>
#include <set>

int main() {
    std::multiset<int> ms = {4, 2, 4, 1, 4, 3, 2};
    std::cout << ms.count(4) << " " << ms.size() << std::endl;
    return 0;
}`,
      solution: `3 7`,
      hints: [
        'multiset allows duplicates, so all elements are kept.',
        '4 appears three times.',
        'Total size is 7 (all elements).',
      ],
      concepts: ['multiset', 'count', 'duplicates'],
    },
    {
      id: 'cpp-set-18',
      title: 'Predict: set iteration order',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Predict the order of elements when iterating.',
      skeleton: `#include <iostream>
#include <set>

int main() {
    std::set<int> s = {50, 10, 30, 20, 40};
    for (int x : s) {
        std::cout << x << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
      solution: `10 20 30 40 50 `,
      hints: [
        'std::set stores elements in sorted order.',
        'Regardless of insertion order, iteration is ascending.',
        'Output: 10 20 30 40 50.',
      ],
      concepts: ['set', 'sorted-order', 'iteration'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-set-19',
      title: 'Refactor: vector with manual uniqueness to set',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Replace the vector with manual duplicate checking with a std::set.',
      skeleton: `#include <vector>
#include <algorithm>
#include <string>

class TagManager {
    std::vector<std::string> tags;
public:
    void addTag(const std::string& tag) {
        if (std::find(tags.begin(), tags.end(), tag) == tags.end()) {
            tags.push_back(tag);
        }
    }
    bool hasTag(const std::string& tag) const {
        return std::find(tags.begin(), tags.end(), tag) != tags.end();
    }
    int count() const { return tags.size(); }
};`,
      solution: `#include <set>
#include <string>

class TagManager {
    std::set<std::string> tags;
public:
    void addTag(const std::string& tag) {
        tags.insert(tag);
    }
    bool hasTag(const std::string& tag) const {
        return tags.count(tag) > 0;
    }
    int count() const { return static_cast<int>(tags.size()); }
};`,
      hints: [
        'std::set automatically handles uniqueness.',
        'insert() does nothing if the element already exists.',
        'count() or find() replaces the linear search.',
      ],
      concepts: ['set', 'uniqueness', 'refactoring'],
    },
    {
      id: 'cpp-set-20',
      title: 'Refactor: manual set operations to STL algorithms',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Replace the manual loop-based set difference with std::set_difference.',
      skeleton: `#include <set>
#include <vector>

std::vector<int> difference(const std::set<int>& a, const std::set<int>& b) {
    std::vector<int> result;
    for (int elem : a) {
        bool found = false;
        for (int other : b) {
            if (elem == other) {
                found = true;
                break;
            }
        }
        if (!found) {
            result.push_back(elem);
        }
    }
    return result;
}`,
      solution: `#include <set>
#include <vector>
#include <algorithm>
#include <iterator>

std::vector<int> difference(const std::set<int>& a, const std::set<int>& b) {
    std::vector<int> result;
    std::set_difference(a.begin(), a.end(), b.begin(), b.end(),
                        std::back_inserter(result));
    return result;
}`,
      hints: [
        'std::set_difference computes elements in a but not in b.',
        'Both sets are already sorted, satisfying the precondition.',
        'Use std::back_inserter to append results to the vector.',
      ],
      concepts: ['set-difference', 'std-algorithm', 'refactoring'],
    },
  ],
};
