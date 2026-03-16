import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-ranges',
  title: '32. Ranges',
  explanation: `## Ranges in C++\n\nC++20 introduces the **Ranges** library, providing composable, lazy algorithms that operate on sequences. Instead of passing iterator pairs, you pass entire ranges.\n\n### Views and Adaptors\n\nViews are lightweight, non-owning wrappers that transform ranges lazily:\n\n\`\`\`cpp\n#include <ranges>\n#include <vector>\n\nstd::vector<int> v{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};\nauto evens = v | std::views::filter([](int n){ return n % 2 == 0; });\n// evens lazily yields: 2, 4, 6, 8, 10\n\`\`\`\n\n### Pipe Operator\n\nThe pipe \`|\` operator chains adaptors together:\n\n\`\`\`cpp\nauto result = v\n    | std::views::filter([](int n){ return n > 3; })\n    | std::views::transform([](int n){ return n * n; })\n    | std::views::take(3);\n// Lazily: 16, 25, 36\n\`\`\`\n\n### Range Factories\n\n\`\`\`cpp\nauto nums = std::views::iota(1, 10);      // 1..9\nauto inf  = std::views::iota(0);           // 0, 1, 2, ... (infinite)\nauto five = std::views::iota(1) | std::views::take(5); // 1..5\n\`\`\`\n\n### Key Adaptors\n\n- \`filter\` - select elements matching a predicate\n- \`transform\` - apply a function to each element\n- \`take\` / \`take_while\` - limit the range\n- \`drop\` / \`drop_while\` - skip leading elements\n- \`reverse\` - reverse the range\n- \`keys\` / \`values\` - project from tuple-like ranges`,
  exercises: [
    {
      id: 'cpp-ranges-1',
      title: 'Basic Filter View',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to filter the vector for even numbers.',
      skeleton: `#include <ranges>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v{1, 2, 3, 4, 5, 6};
    auto evens = v | std::views::___(
        [](int n){ return n % 2 == 0; }
    );
    for (int x : evens) std::cout << x << " ";
    // Output: 2 4 6
}`,
      solution: `#include <ranges>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v{1, 2, 3, 4, 5, 6};
    auto evens = v | std::views::filter(
        [](int n){ return n % 2 == 0; }
    );
    for (int x : evens) std::cout << x << " ";
    // Output: 2 4 6
}`,
      hints: [
        'The adaptor that selects elements matching a predicate is "filter".',
        'std::views::filter takes a predicate function.',
        'Fill in "filter".',
      ],
      concepts: ['ranges', 'views-filter'],
    },
    {
      id: 'cpp-ranges-2',
      title: 'Transform View',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to transform each element by squaring it.',
      skeleton: `#include <ranges>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v{1, 2, 3, 4};
    auto squares = v | std::views::___(
        [](int n){ return n * n; }
    );
    for (int x : squares) std::cout << x << " ";
    // Output: 1 4 9 16
}`,
      solution: `#include <ranges>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v{1, 2, 3, 4};
    auto squares = v | std::views::transform(
        [](int n){ return n * n; }
    );
    for (int x : squares) std::cout << x << " ";
    // Output: 1 4 9 16
}`,
      hints: [
        'The adaptor that applies a function to each element is "transform".',
        'std::views::transform maps each element.',
        'Fill in "transform".',
      ],
      concepts: ['ranges', 'views-transform'],
    },
    {
      id: 'cpp-ranges-3',
      title: 'Pipe Chaining with Take',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to take the first 3 elements after filtering.',
      skeleton: `#include <ranges>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    auto result = v
        | std::views::filter([](int n){ return n % 2 == 0; })
        | std::views::___(3);
    for (int x : result) std::cout << x << " ";
    // Output: 2 4 6
}`,
      solution: `#include <ranges>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    auto result = v
        | std::views::filter([](int n){ return n % 2 == 0; })
        | std::views::take(3);
    for (int x : result) std::cout << x << " ";
    // Output: 2 4 6
}`,
      hints: [
        'The adaptor that limits the number of elements is "take".',
        'std::views::take(n) yields at most n elements.',
        'Fill in "take".',
      ],
      concepts: ['ranges', 'views-take', 'pipe-operator'],
    },
    {
      id: 'cpp-ranges-4',
      title: 'Iota Range Factory',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to create a range of integers from 1 to 5 (inclusive) using iota and take.',
      skeleton: `#include <ranges>
#include <iostream>

int main() {
    auto nums = std::views::___(1) | std::views::take(5);
    for (int x : nums) std::cout << x << " ";
    // Output: 1 2 3 4 5
}`,
      solution: `#include <ranges>
#include <iostream>

int main() {
    auto nums = std::views::iota(1) | std::views::take(5);
    for (int x : nums) std::cout << x << " ";
    // Output: 1 2 3 4 5
}`,
      hints: [
        'iota generates a sequence starting from a given value.',
        'std::views::iota(1) generates 1, 2, 3, ... infinitely.',
        'Fill in "iota".',
      ],
      concepts: ['ranges', 'iota', 'range-factories'],
    },
    {
      id: 'cpp-ranges-5',
      title: 'Drop Elements',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to skip the first 3 elements of the vector.',
      skeleton: `#include <ranges>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v{10, 20, 30, 40, 50};
    auto tail = v | std::views::___(3);
    for (int x : tail) std::cout << x << " ";
    // Output: 40 50
}`,
      solution: `#include <ranges>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v{10, 20, 30, 40, 50};
    auto tail = v | std::views::drop(3);
    for (int x : tail) std::cout << x << " ";
    // Output: 40 50
}`,
      hints: [
        'The adaptor that skips leading elements is "drop".',
        'std::views::drop(n) skips the first n elements.',
        'Fill in "drop".',
      ],
      concepts: ['ranges', 'views-drop'],
    },
    {
      id: 'cpp-ranges-6',
      title: 'Reverse View',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to reverse the vector view.',
      skeleton: `#include <ranges>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v{1, 2, 3, 4, 5};
    auto rev = v | std::views::___;
    for (int x : rev) std::cout << x << " ";
    // Output: 5 4 3 2 1
}`,
      solution: `#include <ranges>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v{1, 2, 3, 4, 5};
    auto rev = v | std::views::reverse;
    for (int x : rev) std::cout << x << " ";
    // Output: 5 4 3 2 1
}`,
      hints: [
        'The adaptor that reverses element order is "reverse".',
        'std::views::reverse does not take arguments.',
        'Fill in "reverse".',
      ],
      concepts: ['ranges', 'views-reverse'],
    },
    {
      id: 'cpp-ranges-7',
      title: 'Write a Range Pipeline',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function get_top_scores that takes a vector<int>, filters scores > 50, sorts them in descending order, and returns the top 3 as a vector.',
      skeleton: `#include <ranges>
#include <vector>
#include <algorithm>
#include <iostream>

// Write get_top_scores here

int main() {
    std::vector<int> scores{30, 85, 70, 95, 40, 60, 100, 55};
    auto top = get_top_scores(scores);
    for (int s : top) std::cout << s << " ";
    // Output: 100 95 85
}`,
      solution: `#include <ranges>
#include <vector>
#include <algorithm>
#include <iostream>

std::vector<int> get_top_scores(std::vector<int> scores) {
    std::ranges::sort(scores, std::greater{});
    std::vector<int> result;
    for (int s : scores | std::views::filter([](int n){ return n > 50; })
                        | std::views::take(3)) {
        result.push_back(s);
    }
    return result;
}

int main() {
    std::vector<int> scores{30, 85, 70, 95, 40, 60, 100, 55};
    auto top = get_top_scores(scores);
    for (int s : top) std::cout << s << " ";
    // Output: 100 95 85
}`,
      hints: [
        'Sort the scores in descending order first with std::ranges::sort.',
        'Then filter for scores > 50 and take(3).',
        'Collect results into a vector using a loop or ranges::to (C++23).',
      ],
      concepts: ['ranges', 'ranges-sort', 'pipe-operator', 'views-filter', 'views-take'],
    },
    {
      id: 'cpp-ranges-8',
      title: 'Write a String Splitter with Views',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function count_words that uses std::views::split to count the number of space-separated words in a string_view.',
      skeleton: `#include <ranges>
#include <string_view>
#include <iostream>

// Write count_words here

int main() {
    std::cout << count_words("hello world foo bar") << std::endl; // 4
    std::cout << count_words("single") << std::endl;              // 1
}`,
      solution: `#include <ranges>
#include <string_view>
#include <iostream>

int count_words(std::string_view sv) {
    int count = 0;
    for (auto word : sv | std::views::split(' ')) {
        ++count;
    }
    return count;
}

int main() {
    std::cout << count_words("hello world foo bar") << std::endl; // 4
    std::cout << count_words("single") << std::endl;              // 1
}`,
      hints: [
        'std::views::split splits a range by a delimiter.',
        'Split by the space character: std::views::split(\' \').',
        'Iterate over the split subranges and count them.',
      ],
      concepts: ['ranges', 'views-split', 'string-view'],
    },
    {
      id: 'cpp-ranges-9',
      title: 'Write an Enumerate-like Pipeline',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function print_indexed that prints each element with its index using iota and transform.',
      skeleton: `#include <ranges>
#include <vector>
#include <string>
#include <iostream>

// Write print_indexed that prints:
// 0: apple
// 1: banana
// 2: cherry

void print_indexed(const std::vector<std::string>& items);

int main() {
    std::vector<std::string> fruits{"apple", "banana", "cherry"};
    print_indexed(fruits);
}`,
      solution: `#include <ranges>
#include <vector>
#include <string>
#include <iostream>

void print_indexed(const std::vector<std::string>& items) {
    for (size_t i = 0; auto& item : items) {
        std::cout << i << ": " << item << std::endl;
        ++i;
    }
}

int main() {
    std::vector<std::string> fruits{"apple", "banana", "cherry"};
    print_indexed(fruits);
}`,
      hints: [
        'C++20 allows init-statements in range-for: for (int i = 0; auto& x : range).',
        'Alternatively, use std::views::iota with zip (C++23) or manual indexing.',
        'Increment i in each iteration of the loop.',
      ],
      concepts: ['ranges', 'init-statement-for', 'range-for'],
    },
    {
      id: 'cpp-ranges-10',
      title: 'Write a Fibonacci Generator with Views',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function that returns the first n Fibonacci numbers using a custom view or generate pattern.',
      skeleton: `#include <ranges>
#include <vector>
#include <iostream>

// Write first_n_fibs(int n) -> std::vector<int>

int main() {
    auto fibs = first_n_fibs(8);
    for (int f : fibs) std::cout << f << " ";
    // Output: 1 1 2 3 5 8 13 21
}`,
      solution: `#include <ranges>
#include <vector>
#include <iostream>

std::vector<int> first_n_fibs(int n) {
    std::vector<int> result;
    int a = 1, b = 1;
    for (int i = 0; i < n; ++i) {
        result.push_back(a);
        int next = a + b;
        a = b;
        b = next;
    }
    return result;
}

int main() {
    auto fibs = first_n_fibs(8);
    for (int f : fibs) std::cout << f << " ";
    // Output: 1 1 2 3 5 8 13 21
}`,
      hints: [
        'Generate Fibonacci numbers iteratively: a, b = b, a+b.',
        'Collect the first n values into a vector.',
        'Start with a=1, b=1.',
      ],
      concepts: ['ranges', 'sequence-generation'],
    },
    {
      id: 'cpp-ranges-11',
      title: 'Write a Keys/Values Projection',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that takes a map and returns a vector of its keys using std::views::keys.',
      skeleton: `#include <ranges>
#include <map>
#include <vector>
#include <string>
#include <iostream>

// Write get_keys here

int main() {
    std::map<std::string, int> m{{"alice", 90}, {"bob", 80}, {"charlie", 70}};
    auto keys = get_keys(m);
    for (auto& k : keys) std::cout << k << " ";
    // Output: alice bob charlie
}`,
      solution: `#include <ranges>
#include <map>
#include <vector>
#include <string>
#include <iostream>

std::vector<std::string> get_keys(const std::map<std::string, int>& m) {
    std::vector<std::string> result;
    for (auto& k : m | std::views::keys) {
        result.push_back(k);
    }
    return result;
}

int main() {
    std::map<std::string, int> m{{"alice", 90}, {"bob", 80}, {"charlie", 70}};
    auto keys = get_keys(m);
    for (auto& k : keys) std::cout << k << " ";
    // Output: alice bob charlie
}`,
      hints: [
        'std::views::keys projects the first element from pair-like ranges.',
        'Pipe the map through std::views::keys.',
        'Collect the projected keys into a vector.',
      ],
      concepts: ['ranges', 'views-keys', 'map'],
    },
    {
      id: 'cpp-ranges-12',
      title: 'Write a take_while Pipeline',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function sum_until_negative that sums elements from a vector until a negative number is encountered, using std::views::take_while.',
      skeleton: `#include <ranges>
#include <vector>
#include <numeric>
#include <iostream>

// Write sum_until_negative here

int main() {
    std::vector<int> v{3, 7, 2, 5, -1, 8, 4};
    std::cout << sum_until_negative(v) << std::endl; // 17
}`,
      solution: `#include <ranges>
#include <vector>
#include <numeric>
#include <iostream>

int sum_until_negative(const std::vector<int>& v) {
    int sum = 0;
    for (int x : v | std::views::take_while([](int n){ return n >= 0; })) {
        sum += x;
    }
    return sum;
}

int main() {
    std::vector<int> v{3, 7, 2, 5, -1, 8, 4};
    std::cout << sum_until_negative(v) << std::endl; // 17
}`,
      hints: [
        'std::views::take_while takes elements while the predicate is true.',
        'The predicate should check n >= 0.',
        'Accumulate the sum in a loop over the take_while view.',
      ],
      concepts: ['ranges', 'views-take-while', 'accumulation'],
    },
    {
      id: 'cpp-ranges-13',
      title: 'Fix the Dangling View',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the code that creates a dangling view from a temporary.',
      skeleton: `#include <ranges>
#include <vector>
#include <iostream>

auto get_evens() {
    std::vector<int> v{1, 2, 3, 4, 5, 6};
    return v | std::views::filter([](int n){ return n % 2 == 0; });
}

int main() {
    for (int x : get_evens()) {
        std::cout << x << " ";
    }
}`,
      solution: `#include <ranges>
#include <vector>
#include <iostream>

std::vector<int> get_evens() {
    std::vector<int> v{1, 2, 3, 4, 5, 6};
    std::vector<int> result;
    for (int x : v | std::views::filter([](int n){ return n % 2 == 0; })) {
        result.push_back(x);
    }
    return result;
}

int main() {
    for (int x : get_evens()) {
        std::cout << x << " ";
    }
}`,
      hints: [
        'Views do not own their data - they are non-owning.',
        'The local vector v is destroyed when get_evens returns.',
        'Materialize the view into a vector before returning.',
      ],
      concepts: ['ranges', 'dangling-reference', 'view-ownership'],
    },
    {
      id: 'cpp-ranges-14',
      title: 'Fix the Pipe Order',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the pipeline so it correctly gets the first 3 even numbers squared.',
      skeleton: `#include <ranges>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    // Should output: 4 16 36 (first 3 even numbers, squared)
    auto result = v
        | std::views::take(3)
        | std::views::filter([](int n){ return n % 2 == 0; })
        | std::views::transform([](int n){ return n * n; });
    for (int x : result) std::cout << x << " ";
}`,
      solution: `#include <ranges>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    // Should output: 4 16 36 (first 3 even numbers, squared)
    auto result = v
        | std::views::filter([](int n){ return n % 2 == 0; })
        | std::views::take(3)
        | std::views::transform([](int n){ return n * n; });
    for (int x : result) std::cout << x << " ";
}`,
      hints: [
        'The order of pipe operations matters.',
        'Filter first to get even numbers, then take 3, then transform.',
        'take(3) before filter only takes the first 3 total elements.',
      ],
      concepts: ['ranges', 'pipe-operator', 'operation-order'],
    },
    {
      id: 'cpp-ranges-15',
      title: 'Fix Missing Include',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the code so it compiles and runs correctly.',
      skeleton: `#include <vector>
#include <iostream>

int main() {
    std::vector<int> v{1, 2, 3, 4, 5};
    for (int x : v | std::views::reverse) {
        std::cout << x << " ";
    }
}`,
      solution: `#include <ranges>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v{1, 2, 3, 4, 5};
    for (int x : v | std::views::reverse) {
        std::cout << x << " ";
    }
}`,
      hints: [
        'std::views is defined in the <ranges> header.',
        'Without #include <ranges>, the views namespace is not available.',
        'Add #include <ranges> to fix the compilation.',
      ],
      concepts: ['ranges', 'includes'],
    },
    {
      id: 'cpp-ranges-16',
      title: 'Predict Filter + Transform Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Predict what this program prints.',
      skeleton: `#include <ranges>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v{1, 2, 3, 4, 5};
    for (int x : v | std::views::filter([](int n){ return n > 2; })
                    | std::views::transform([](int n){ return n * 10; })) {
        std::cout << x << " ";
    }
}`,
      solution: `30 40 50 `,
      hints: [
        'Filter keeps elements > 2: {3, 4, 5}.',
        'Transform multiplies each by 10: {30, 40, 50}.',
        'Output is each value followed by a space.',
      ],
      concepts: ['ranges', 'views-filter', 'views-transform'],
    },
    {
      id: 'cpp-ranges-17',
      title: 'Predict Iota + Take Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Predict what this program prints.',
      skeleton: `#include <ranges>
#include <iostream>

int main() {
    for (int x : std::views::iota(5) | std::views::take(4)) {
        std::cout << x << " ";
    }
}`,
      solution: `5 6 7 8 `,
      hints: [
        'std::views::iota(5) generates 5, 6, 7, 8, 9, ...',
        'take(4) limits to the first 4 elements.',
        'Output: 5 6 7 8.',
      ],
      concepts: ['ranges', 'iota', 'views-take'],
    },
    {
      id: 'cpp-ranges-18',
      title: 'Predict Drop + Reverse Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict what this program prints.',
      skeleton: `#include <ranges>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v{10, 20, 30, 40, 50};
    for (int x : v | std::views::drop(2) | std::views::reverse) {
        std::cout << x << " ";
    }
}`,
      solution: `50 40 30 `,
      hints: [
        'drop(2) skips {10, 20}, leaving {30, 40, 50}.',
        'reverse reverses that to {50, 40, 30}.',
        'Output: 50 40 30.',
      ],
      concepts: ['ranges', 'views-drop', 'views-reverse'],
    },
    {
      id: 'cpp-ranges-19',
      title: 'Refactor Iterator Pair to Ranges',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor the iterator-based algorithm calls to use range-based equivalents.',
      skeleton: `#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v{5, 3, 8, 1, 9, 2};
    std::sort(v.begin(), v.end());
    auto it = std::find(v.begin(), v.end(), 8);
    if (it != v.end()) {
        std::cout << "Found: " << *it << std::endl;
    }
    std::reverse(v.begin(), v.end());
    for (auto it2 = v.begin(); it2 != v.end(); ++it2) {
        std::cout << *it2 << " ";
    }
}`,
      solution: `#include <algorithm>
#include <ranges>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v{5, 3, 8, 1, 9, 2};
    std::ranges::sort(v);
    auto it = std::ranges::find(v, 8);
    if (it != v.end()) {
        std::cout << "Found: " << *it << std::endl;
    }
    std::ranges::reverse(v);
    for (int x : v) {
        std::cout << x << " ";
    }
}`,
      hints: [
        'std::ranges::sort(v) replaces std::sort(v.begin(), v.end()).',
        'std::ranges::find(v, 8) replaces std::find(v.begin(), v.end(), 8).',
        'Use range-for instead of iterator-based for loops.',
      ],
      concepts: ['ranges', 'ranges-algorithms', 'refactoring'],
    },
    {
      id: 'cpp-ranges-20',
      title: 'Refactor Loop to Pipeline',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor the manual loop into a range pipeline using filter, transform, and take.',
      skeleton: `#include <vector>
#include <iostream>

int main() {
    std::vector<int> v{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int count = 0;
    for (int x : v) {
        if (x % 3 == 0) {
            std::cout << x * x << " ";
            count++;
            if (count == 2) break;
        }
    }
    // Output: 9 36
}`,
      solution: `#include <ranges>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> v{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    for (int x : v | std::views::filter([](int n){ return n % 3 == 0; })
                    | std::views::transform([](int n){ return n * n; })
                    | std::views::take(2)) {
        std::cout << x << " ";
    }
    // Output: 9 36
}`,
      hints: [
        'Filter for multiples of 3, transform by squaring, take 2.',
        'Chain with the pipe operator: filter | transform | take.',
        'The range pipeline replaces the manual loop with break.',
      ],
      concepts: ['ranges', 'pipe-operator', 'refactoring'],
    },
  ],
};
