import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-map',
  title: '19. STL Map',
  explanation: `## STL Map in C++

\`std::map\` is an ordered associative container that stores key-value pairs in sorted order by key. \`std::unordered_map\` uses a hash table for O(1) average access.

### std::map
\`\`\`cpp
#include <map>
std::map<std::string, int> ages;
ages["Alice"] = 30;
ages["Bob"] = 25;
// Keys are sorted: Alice < Bob
\`\`\`

### std::unordered_map
\`\`\`cpp
#include <unordered_map>
std::unordered_map<std::string, int> cache;
cache["key1"] = 100;
\`\`\`

### Insertion Methods
- \`operator[]\` -- inserts default value if key absent, returns reference
- \`insert({key, value})\` -- does not overwrite existing
- \`emplace(key, value)\` -- constructs in-place
- \`insert_or_assign(key, value)\` (C++17) -- inserts or overwrites

### Lookup
- \`operator[]\` -- inserts default if missing (non-const only)
- \`at(key)\` -- throws \`std::out_of_range\` if missing
- \`find(key)\` -- returns iterator (\`end()\` if not found)
- \`count(key)\` -- returns 0 or 1
- \`contains(key)\` (C++20)

### Structured Bindings (C++17)
\`\`\`cpp
for (const auto& [key, value] : myMap) {
    std::cout << key << ": " << value;
}
\`\`\`
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-map-1',
      title: 'Create a map',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the container type for an ordered key-value store.',
      skeleton: `#include <map>
#include <string>

std::__BLANK__<std::string, int> scores;
scores["Alice"] = 95;
scores["Bob"] = 87;`,
      solution: `#include <map>
#include <string>

std::map<std::string, int> scores;
scores["Alice"] = 95;
scores["Bob"] = 87;`,
      hints: [
        'This ordered associative container stores key-value pairs.',
        'Keys are kept in sorted order.',
        'The container is `map`.',
      ],
      concepts: ['map', 'associative-container'],
    },
    {
      id: 'cpp-map-2',
      title: 'Safe lookup with at()',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Use the bounds-checked lookup method.',
      skeleton: `std::map<std::string, int> m = {{"x", 10}, {"y", 20}};
try {
    int val = m.__BLANK__("z");  // throws if key not found
} catch (const std::out_of_range& e) {
    std::cout << "Key not found" << std::endl;
}`,
      solution: `std::map<std::string, int> m = {{"x", 10}, {"y", 20}};
try {
    int val = m.at("z");  // throws if key not found
} catch (const std::out_of_range& e) {
    std::cout << "Key not found" << std::endl;
}`,
      hints: [
        'Unlike operator[], this method does not insert a default value.',
        'It throws an exception for missing keys.',
        'The method is `at`.',
      ],
      concepts: ['at', 'exception', 'map'],
    },
    {
      id: 'cpp-map-3',
      title: 'Find an element',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Use find() to check if a key exists.',
      skeleton: `std::map<std::string, int> m = {{"a", 1}, {"b", 2}};
auto it = m.__BLANK__("b");
if (it != m.end()) {
    std::cout << it->second << std::endl;  // prints 2
}`,
      solution: `std::map<std::string, int> m = {{"a", 1}, {"b", 2}};
auto it = m.find("b");
if (it != m.end()) {
    std::cout << it->second << std::endl;  // prints 2
}`,
      hints: [
        'This method returns an iterator to the element or end() if not found.',
        'It does not modify the map.',
        'The method is `find`.',
      ],
      concepts: ['find', 'iterator', 'map'],
    },
    {
      id: 'cpp-map-4',
      title: 'Structured bindings iteration',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the structured binding syntax to iterate over a map.',
      skeleton: `std::map<std::string, int> grades = {{"Math", 90}, {"English", 85}};
for (const auto& __BLANK__ : grades) {
    std::cout << subject << ": " << score << std::endl;
}`,
      solution: `std::map<std::string, int> grades = {{"Math", 90}, {"English", 85}};
for (const auto& [subject, score] : grades) {
    std::cout << subject << ": " << score << std::endl;
}`,
      hints: [
        'C++17 allows decomposing pairs into named variables.',
        'The syntax uses square brackets.',
        'Write `[subject, score]`.',
      ],
      concepts: ['structured-bindings', 'range-for', 'map'],
    },
    {
      id: 'cpp-map-5',
      title: 'Emplace a new entry',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Use emplace to construct a key-value pair in-place.',
      skeleton: `std::map<int, std::string> m;
m.__BLANK__(1, "one");
m.__BLANK__(2, "two");`,
      solution: `std::map<int, std::string> m;
m.emplace(1, "one");
m.emplace(2, "two");`,
      hints: [
        'This method constructs the pair directly in the map.',
        'It avoids creating a temporary pair.',
        'The method is `emplace`.',
      ],
      concepts: ['emplace', 'in-place-construction', 'map'],
    },
    {
      id: 'cpp-map-6',
      title: 'Unordered map declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the hash-based map type.',
      skeleton: `#include <unordered_map>

std::__BLANK__<std::string, double> cache;
cache["pi"] = 3.14159;`,
      solution: `#include <unordered_map>

std::unordered_map<std::string, double> cache;
cache["pi"] = 3.14159;`,
      hints: [
        'This map uses a hash table instead of a tree.',
        'It provides O(1) average lookup.',
        'The type is `unordered_map`.',
      ],
      concepts: ['unordered-map', 'hash-table'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-map-7',
      title: 'Write a word counter',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a function that counts occurrences of each word in a vector.',
      skeleton: `#include <map>
#include <vector>
#include <string>
// Write: std::map<std::string, int> countWords(const std::vector<std::string>& words)
// Returns a map of word -> count`,
      solution: `#include <map>
#include <vector>
#include <string>

std::map<std::string, int> countWords(const std::vector<std::string>& words) {
    std::map<std::string, int> counts;
    for (const auto& word : words) {
        ++counts[word];
    }
    return counts;
}`,
      hints: [
        'operator[] inserts a default value (0 for int) if the key is absent.',
        'Simply increment counts[word] for each word.',
        'The map automatically keeps keys sorted.',
      ],
      concepts: ['map', 'operator-bracket', 'counting'],
    },
    {
      id: 'cpp-map-8',
      title: 'Write a function to invert a map',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that swaps keys and values. Assume values are unique.',
      skeleton: `#include <map>
#include <string>
// Write: std::map<int, std::string> invertMap(const std::map<std::string, int>& m)
// Swaps keys and values.`,
      solution: `#include <map>
#include <string>

std::map<int, std::string> invertMap(const std::map<std::string, int>& m) {
    std::map<int, std::string> result;
    for (const auto& [key, value] : m) {
        result[value] = key;
    }
    return result;
}`,
      hints: [
        'Iterate with structured bindings.',
        'Insert into the result map with the value as key and key as value.',
        'Assumes all values are unique (no collisions).',
      ],
      concepts: ['structured-bindings', 'map', 'inversion'],
    },
    {
      id: 'cpp-map-9',
      title: 'Write a function to merge two maps',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that merges two maps. If both have the same key, sum the values.',
      skeleton: `#include <map>
#include <string>
// Write: std::map<std::string, int> mergeMaps(
//     const std::map<std::string, int>& a,
//     const std::map<std::string, int>& b)
// Values for shared keys are summed.`,
      solution: `#include <map>
#include <string>

std::map<std::string, int> mergeMaps(
    const std::map<std::string, int>& a,
    const std::map<std::string, int>& b) {
    std::map<std::string, int> result = a;
    for (const auto& [key, value] : b) {
        result[key] += value;
    }
    return result;
}`,
      hints: [
        'Start with a copy of map a.',
        'Iterate over b and add each value to the result.',
        'operator[] default-initializes to 0 if the key is new.',
      ],
      concepts: ['map', 'merge', 'operator-bracket'],
    },
    {
      id: 'cpp-map-10',
      title: 'Write a function using find and erase',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a function that removes all entries where the value is below a threshold.',
      skeleton: `#include <map>
#include <string>
// Write: void removeBelow(std::map<std::string, int>& m, int threshold)
// Removes all entries where value < threshold.`,
      solution: `#include <map>
#include <string>

void removeBelow(std::map<std::string, int>& m, int threshold) {
    for (auto it = m.begin(); it != m.end(); ) {
        if (it->second < threshold) {
            it = m.erase(it);
        } else {
            ++it;
        }
    }
}`,
      hints: [
        'Use iterator-based loop to safely erase during iteration.',
        'erase() returns an iterator to the next element.',
        'Only increment the iterator if you did not erase.',
      ],
      concepts: ['erase', 'iterator', 'map'],
    },
    {
      id: 'cpp-map-11',
      title: 'Write a function to group by first letter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function that groups words by their first character.',
      skeleton: `#include <map>
#include <vector>
#include <string>
// Write: std::map<char, std::vector<std::string>> groupByFirst(
//     const std::vector<std::string>& words)`,
      solution: `#include <map>
#include <vector>
#include <string>

std::map<char, std::vector<std::string>> groupByFirst(
    const std::vector<std::string>& words) {
    std::map<char, std::vector<std::string>> groups;
    for (const auto& word : words) {
        if (!word.empty()) {
            groups[word[0]].push_back(word);
        }
    }
    return groups;
}`,
      hints: [
        'Use the first character as the map key.',
        'operator[] auto-creates an empty vector for new keys.',
        'Push each word into the vector for its first character.',
      ],
      concepts: ['map', 'vector', 'grouping'],
    },
    {
      id: 'cpp-map-12',
      title: 'Write a two-sum solver using unordered_map',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function that finds two indices whose values sum to a target.',
      skeleton: `#include <unordered_map>
#include <vector>
// Write: std::pair<int, int> twoSum(const std::vector<int>& nums, int target)
// Returns indices of two elements that sum to target, or {-1, -1} if none.`,
      solution: `#include <unordered_map>
#include <vector>

std::pair<int, int> twoSum(const std::vector<int>& nums, int target) {
    std::unordered_map<int, int> seen;
    for (int i = 0; i < static_cast<int>(nums.size()); ++i) {
        int complement = target - nums[i];
        auto it = seen.find(complement);
        if (it != seen.end()) {
            return {it->second, i};
        }
        seen[nums[i]] = i;
    }
    return {-1, -1};
}`,
      hints: [
        'Store each number and its index in the map as you iterate.',
        'For each number, check if (target - number) is already in the map.',
        'unordered_map gives O(1) lookups for this check.',
      ],
      concepts: ['unordered-map', 'hash-table', 'two-sum'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-map-13',
      title: 'Fix: operator[] on const map',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the code that tries to use operator[] on a const map.',
      skeleton: `#include <map>
#include <string>
#include <iostream>

void printScore(const std::map<std::string, int>& m) {
    // Bug: operator[] is not available on const map
    std::cout << m["Alice"] << std::endl;
}`,
      solution: `#include <map>
#include <string>
#include <iostream>

void printScore(const std::map<std::string, int>& m) {
    std::cout << m.at("Alice") << std::endl;
}`,
      hints: [
        'operator[] may insert a default value, so it cannot be used on a const map.',
        'Use a method that only reads without modifying.',
        'Replace m["Alice"] with m.at("Alice").',
      ],
      concepts: ['const-correctness', 'at', 'map'],
    },
    {
      id: 'cpp-map-14',
      title: 'Fix: insert does not overwrite',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the code so the value is actually updated.',
      skeleton: `#include <map>
#include <string>

std::map<std::string, int> m = {{"score", 50}};
m.insert({"score", 100});
// Bug: insert does not overwrite existing keys
// m["score"] is still 50`,
      solution: `#include <map>
#include <string>

std::map<std::string, int> m = {{"score", 50}};
m["score"] = 100;
// m["score"] is now 100`,
      hints: [
        'insert() only inserts if the key does not already exist.',
        'To overwrite, use operator[] or insert_or_assign.',
        'Change to m["score"] = 100.',
      ],
      concepts: ['insert', 'operator-bracket', 'map'],
    },
    {
      id: 'cpp-map-15',
      title: 'Fix: comparing iterator to nullptr',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the incorrect iterator comparison.',
      skeleton: `#include <map>
#include <string>

std::map<std::string, int> m = {{"x", 1}};
auto it = m.find("y");
if (it != nullptr) {  // Bug: iterators are not pointers
    std::cout << it->second;
}`,
      solution: `#include <map>
#include <string>

std::map<std::string, int> m = {{"x", 1}};
auto it = m.find("y");
if (it != m.end()) {
    std::cout << it->second;
}`,
      hints: [
        'Map iterators are not pointers.',
        'The sentinel value for "not found" is the end() iterator.',
        'Compare with m.end(), not nullptr.',
      ],
      concepts: ['iterator', 'end', 'find'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-map-16',
      title: 'Predict: operator[] default insertion',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the output when accessing a missing key with operator[].',
      skeleton: `#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, int> m;
    int val = m["missing"];
    std::cout << val << " " << m.size() << std::endl;
    return 0;
}`,
      solution: `0 1`,
      hints: [
        'operator[] inserts a default-constructed value for missing keys.',
        'For int, the default value is 0.',
        'The map now has one entry, so size is 1.',
      ],
      concepts: ['operator-bracket', 'default-insertion', 'map'],
    },
    {
      id: 'cpp-map-17',
      title: 'Predict: map iteration order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the order of keys when iterating a std::map.',
      skeleton: `#include <iostream>
#include <map>

int main() {
    std::map<int, char> m;
    m[3] = 'c';
    m[1] = 'a';
    m[2] = 'b';
    for (const auto& [k, v] : m) {
        std::cout << k << v << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
      solution: `1a 2b 3c `,
      hints: [
        'std::map keeps keys in sorted order.',
        'Regardless of insertion order, iteration is by ascending key.',
        'Output: 1a 2b 3c.',
      ],
      concepts: ['sorted-order', 'map', 'iteration'],
    },
    {
      id: 'cpp-map-18',
      title: 'Predict: insert vs operator[] overwrite',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Predict the final value for the key.',
      skeleton: `#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, int> m;
    m["key"] = 10;
    m.insert({"key", 20});
    m["key"] = 30;
    std::cout << m["key"] << std::endl;
    return 0;
}`,
      solution: `30`,
      hints: [
        'First assignment sets "key" to 10.',
        'insert does not overwrite, so "key" stays 10.',
        'Second assignment sets "key" to 30.',
      ],
      concepts: ['insert', 'operator-bracket', 'overwrite'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-map-19',
      title: 'Refactor: parallel arrays to map',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Replace parallel arrays with a std::map.',
      skeleton: `#include <string>
#include <iostream>

void printPhonebook() {
    std::string names[] = {"Alice", "Bob", "Carol"};
    std::string phones[] = {"555-1234", "555-5678", "555-9012"};
    int count = 3;

    for (int i = 0; i < count; ++i) {
        std::cout << names[i] << ": " << phones[i] << std::endl;
    }
}`,
      solution: `#include <map>
#include <string>
#include <iostream>

void printPhonebook() {
    std::map<std::string, std::string> phonebook = {
        {"Alice", "555-1234"},
        {"Bob", "555-5678"},
        {"Carol", "555-9012"}
    };

    for (const auto& [name, phone] : phonebook) {
        std::cout << name << ": " << phone << std::endl;
    }
}`,
      hints: [
        'A map naturally associates names with phone numbers.',
        'Use an initializer list to populate the map.',
        'Iterate with structured bindings.',
      ],
      concepts: ['map', 'structured-bindings', 'refactoring'],
    },
    {
      id: 'cpp-map-20',
      title: 'Refactor: map to unordered_map for performance',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Replace std::map with std::unordered_map where ordering is not needed, and use modern C++17 features.',
      skeleton: `#include <map>
#include <string>
#include <iostream>

int main() {
    std::map<std::string, int> freq;
    std::string words[] = {"the", "cat", "sat", "on", "the", "mat", "the"};
    for (int i = 0; i < 7; ++i) {
        std::map<std::string, int>::iterator it = freq.find(words[i]);
        if (it != freq.end()) {
            it->second++;
        } else {
            freq.insert(std::pair<std::string, int>(words[i], 1));
        }
    }
    for (std::map<std::string, int>::const_iterator it = freq.begin();
         it != freq.end(); ++it) {
        std::cout << it->first << ": " << it->second << std::endl;
    }
    return 0;
}`,
      solution: `#include <unordered_map>
#include <string>
#include <iostream>

int main() {
    std::unordered_map<std::string, int> freq;
    std::string words[] = {"the", "cat", "sat", "on", "the", "mat", "the"};
    for (const auto& word : words) {
        ++freq[word];
    }
    for (const auto& [word, count] : freq) {
        std::cout << word << ": " << count << std::endl;
    }
    return 0;
}`,
      hints: [
        'unordered_map provides O(1) average lookup vs O(log n) for map.',
        'operator[] with ++ is cleaner than find/insert.',
        'Use auto, range-for, and structured bindings for modern style.',
      ],
      concepts: ['unordered-map', 'modernization', 'operator-bracket'],
    },
  ],
};
