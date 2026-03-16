import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-dict',
  title: '09. Dictionaries',
  explanation: `## Dictionaries in Swift

Dictionaries store key-value pairs with unique keys.

\`\`\`swift
var scores: [String: Int] = ["Alice": 95, "Bob": 87]
let empty: [String: Int] = [:]

scores["Charlie"] = 92           // Add or update
let val = scores["Alice"]        // Optional Int?
scores.updateValue(100, forKey: "Bob")
scores.removeValue(forKey: "Bob")
\`\`\`

### Iterating
\`\`\`swift
for (name, score) in scores {
    print("\\(name): \\(score)")
}

let names = Array(scores.keys)
let allScores = Array(scores.values)
\`\`\`

### Merging
\`\`\`swift
var d1 = ["a": 1, "b": 2]
let d2 = ["b": 3, "c": 4]
d1.merge(d2) { current, _ in current } // keeps existing
\`\`\``,
  exercises: [
    {
      id: 'swift-dict-1',
      title: 'Create a Dictionary',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Declare an empty dictionary with String keys and Int values.',
      skeleton: `var lookup: [___: ___] = [:]`,
      solution: `var lookup: [String: Int] = [:]`,
      hints: [
        'Dictionary type syntax is [Key: Value].',
        'Empty dictionary literal is [:].',
        'Use String for keys, Int for values.',
      ],
      concepts: ['Dictionary', 'empty-dictionary'],
    },
    {
      id: 'swift-dict-2',
      title: 'Access Dictionary Value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Access the value for key "name" with a default of "Unknown".',
      skeleton: `let info = ["name": "Alice", "city": "NYC"]
let name = info["name"] ___ "Unknown"`,
      solution: `let info = ["name": "Alice", "city": "NYC"]
let name = info["name"] ?? "Unknown"`,
      hints: [
        'Dictionary subscript returns an Optional.',
        'Use ?? to provide a default value.',
        'The nil-coalescing operator handles nil.',
      ],
      concepts: ['subscript', 'nil-coalescing'],
    },
    {
      id: 'swift-dict-3',
      title: 'Update Value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Update the value for key "score" to 100.',
      skeleton: `var data = ["score": 85]
data[___] = ___`,
      solution: `var data = ["score": 85]
data["score"] = 100`,
      hints: [
        'Use subscript assignment to update.',
        'data["key"] = newValue updates or inserts.',
        'The key is "score" and value is 100.',
      ],
      concepts: ['subscript', 'mutation'],
    },
    {
      id: 'swift-dict-4',
      title: 'Remove a Key',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Remove the key "temp" from the dictionary.',
      skeleton: `var config = ["temp": 72, "humidity": 50]
config.___(forKey: "temp")`,
      solution: `var config = ["temp": 72, "humidity": 50]
config.removeValue(forKey: "temp")`,
      hints: [
        'Use removeValue(forKey:) to remove a key.',
        'It returns the removed value or nil.',
        'You can also assign nil: config["temp"] = nil.',
      ],
      concepts: ['removeValue'],
    },
    {
      id: 'swift-dict-5',
      title: 'Iterate Over Dictionary',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Loop over key-value pairs in the dictionary.',
      skeleton: `let ages = ["Alice": 30, "Bob": 25]
for (___, ___) in ages {
    print("\\(key): \\(value)")
}`,
      solution: `let ages = ["Alice": 30, "Bob": 25]
for (key, value) in ages {
    print("\\(key): \\(value)")
}`,
      hints: [
        'Use tuple decomposition in the for-in loop.',
        'The first element is the key, second is the value.',
        'Name them key and value.',
      ],
      concepts: ['for-in', 'tuple-decomposition'],
    },
    {
      id: 'swift-dict-6',
      title: 'Merge Dictionaries',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Merge two dictionaries, keeping existing values on conflict.',
      skeleton: `var d1 = ["a": 1, "b": 2]
let d2 = ["b": 3, "c": 4]
d1.___(d2) { current, ___ in current }`,
      solution: `var d1 = ["a": 1, "b": 2]
let d2 = ["b": 3, "c": 4]
d1.merge(d2) { current, _ in current }`,
      hints: [
        'Use merge(_:uniquingKeysWith:).',
        'The closure decides which value to keep.',
        'Return current to keep the existing value.',
      ],
      concepts: ['merge'],
    },
    {
      id: 'swift-dict-7',
      title: 'Word Frequency Counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that counts word frequencies in an array of strings.',
      skeleton: `func wordFrequency(_ words: [String]) -> [String: Int] {
    // Count how many times each word appears
}`,
      solution: `func wordFrequency(_ words: [String]) -> [String: Int] {
    var counts: [String: Int] = [:]
    for word in words {
        counts[word, default: 0] += 1
    }
    return counts
}`,
      hints: [
        'Use a dictionary to count occurrences.',
        'The default subscript avoids nil checks.',
        'counts[word, default: 0] += 1 increments safely.',
      ],
      concepts: ['default-subscript', 'counting'],
    },
    {
      id: 'swift-dict-8',
      title: 'Invert a Dictionary',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that swaps keys and values (assuming unique values).',
      skeleton: `func invert(_ dict: [String: Int]) -> [Int: String] {
    // Swap keys and values
}`,
      solution: `func invert(_ dict: [String: Int]) -> [Int: String] {
    var result: [Int: String] = [:]
    for (key, value) in dict {
        result[value] = key
    }
    return result
}`,
      hints: [
        'Create a new dictionary with swapped types.',
        'Loop through and assign result[value] = key.',
        'This assumes all values are unique.',
      ],
      concepts: ['Dictionary', 'inversion'],
    },
    {
      id: 'swift-dict-9',
      title: 'Group By First Letter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that groups words by their first character.',
      skeleton: `func groupByFirst(_ words: [String]) -> [Character: [String]] {
    // Group words by first character
}`,
      solution: `func groupByFirst(_ words: [String]) -> [Character: [String]] {
    var groups: [Character: [String]] = [:]
    for word in words {
        guard let first = word.first else { continue }
        groups[first, default: []].append(word)
    }
    return groups
}`,
      hints: [
        'Use word.first to get the first character.',
        'Use default subscript with an empty array.',
        'Append each word to its group.',
      ],
      concepts: ['grouping', 'default-subscript'],
    },
    {
      id: 'swift-dict-10',
      title: 'Filter Dictionary',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that returns only entries where the value is greater than a threshold.',
      skeleton: `func filterAbove(_ dict: [String: Int], threshold: Int) -> [String: Int] {
    // Return entries with value > threshold
}`,
      solution: `func filterAbove(_ dict: [String: Int], threshold: Int) -> [String: Int] {
    return dict.filter { $0.value > threshold }
}`,
      hints: [
        'Dictionaries have a filter method.',
        'Each element has .key and .value properties.',
        'filter returns a new dictionary.',
      ],
      concepts: ['filter', 'Dictionary'],
    },
    {
      id: 'swift-dict-11',
      title: 'Map Dictionary Values',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that doubles all values in a [String: Int] dictionary.',
      skeleton: `func doubleValues(_ dict: [String: Int]) -> [String: Int] {
    // Double each value
}`,
      solution: `func doubleValues(_ dict: [String: Int]) -> [String: Int] {
    return dict.mapValues { $0 * 2 }
}`,
      hints: [
        'Use mapValues to transform values while keeping keys.',
        'mapValues applies a closure to each value.',
        'The closure receives the value and returns the new value.',
      ],
      concepts: ['mapValues'],
    },
    {
      id: 'swift-dict-12',
      title: 'Convert Arrays to Dictionary',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that zips an array of keys with an array of values into a dictionary.',
      skeleton: `func toDictionary(_ keys: [String], _ values: [Int]) -> [String: Int] {
    // Combine keys and values into a dictionary
}`,
      solution: `func toDictionary(_ keys: [String], _ values: [Int]) -> [String: Int] {
    return Dictionary(uniqueKeysWithValues: zip(keys, values))
}`,
      hints: [
        'Use zip to pair keys with values.',
        'Dictionary(uniqueKeysWithValues:) creates from a sequence of pairs.',
        'Ensure keys are unique to avoid a crash.',
      ],
      concepts: ['Dictionary-init', 'zip'],
    },
    {
      id: 'swift-dict-13',
      title: 'Fix Dictionary Key Type',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the dictionary access that uses the wrong key type.',
      skeleton: `let scores = ["Alice": 95, "Bob": 87]
let val = scores[0]
print(val)`,
      solution: `let scores = ["Alice": 95, "Bob": 87]
let val = scores["Alice"]
print(val)`,
      hints: [
        'Dictionary keys are String, not Int.',
        'Use a string key to access values.',
        'Dictionaries are not indexed by position.',
      ],
      concepts: ['subscript', 'key-type'],
    },
    {
      id: 'swift-dict-14',
      title: 'Fix Dictionary Mutation',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the code so the dictionary can be modified.',
      skeleton: `let config = ["theme": "dark"]
config["theme"] = "light"
print(config)`,
      solution: `var config = ["theme": "dark"]
config["theme"] = "light"
print(config)`,
      hints: [
        'let dictionaries are immutable.',
        'Change let to var for mutation.',
        'Only var dictionaries can be modified.',
      ],
      concepts: ['let', 'var', 'mutability'],
    },
    {
      id: 'swift-dict-15',
      title: 'Fix Optional Handling',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the force unwrap that could crash.',
      skeleton: `let data = ["name": "Alice"]
let age: String = data["age"]!
print(age)`,
      solution: `let data = ["name": "Alice"]
let age: String = data["age"] ?? "unknown"
print(age)`,
      hints: [
        'Force unwrapping nil crashes the program.',
        '"age" key does not exist in the dictionary.',
        'Use ?? to provide a safe default.',
      ],
      concepts: ['force-unwrap', 'nil-coalescing'],
    },
    {
      id: 'swift-dict-16',
      title: 'Predict Dictionary Count',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `var d = ["a": 1, "b": 2]
d["c"] = 3
d["a"] = nil
print(d.count)`,
      solution: `2`,
      hints: [
        'Start with 2 entries.',
        'Adding "c" makes 3.',
        'Setting "a" to nil removes it, back to 2.',
      ],
      concepts: ['count', 'nil-removal'],
    },
    {
      id: 'swift-dict-17',
      title: 'Predict Default Value',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `let d = ["x": 10]
let val = d["y", default: 42]
print(val)`,
      solution: `42`,
      hints: [
        '"y" does not exist in the dictionary.',
        'The default value 42 is returned.',
        'No optional is returned when using default.',
      ],
      concepts: ['default-subscript'],
    },
    {
      id: 'swift-dict-18',
      title: 'Predict UpdateValue Return',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `var d = ["a": 1]
let old = d.updateValue(2, forKey: "a")
print(old ?? 0)`,
      solution: `1`,
      hints: [
        'updateValue returns the old value if the key existed.',
        '"a" had value 1 before the update.',
        'The old value 1 is returned and unwrapped.',
      ],
      concepts: ['updateValue', 'Optional'],
    },
    {
      id: 'swift-dict-19',
      title: 'Refactor Loop to mapValues',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor the manual loop to use mapValues.',
      skeleton: `let prices = ["apple": 1.0, "banana": 0.5]
var discounted: [String: Double] = [:]
for (item, price) in prices {
    discounted[item] = price * 0.9
}
print(discounted)`,
      solution: `let prices = ["apple": 1.0, "banana": 0.5]
let discounted = prices.mapValues { $0 * 0.9 }
print(discounted)`,
      hints: [
        'mapValues transforms all values at once.',
        'No need for a manual loop.',
        'The closure receives each value.',
      ],
      concepts: ['mapValues', 'refactoring'],
    },
    {
      id: 'swift-dict-20',
      title: 'Refactor to Use Dictionary Grouping',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor the manual grouping loop to use Dictionary(grouping:by:).',
      skeleton: `let names = ["Alice", "Anna", "Bob", "Bella"]
var groups: [Character: [String]] = [:]
for name in names {
    let key = name.first!
    if groups[key] != nil {
        groups[key]!.append(name)
    } else {
        groups[key] = [name]
    }
}
print(groups)`,
      solution: `let names = ["Alice", "Anna", "Bob", "Bella"]
let groups = Dictionary(grouping: names) { $0.first! }
print(groups)`,
      hints: [
        'Dictionary(grouping:by:) groups elements by a key.',
        'The closure extracts the grouping key.',
        'This replaces the entire manual loop.',
      ],
      concepts: ['Dictionary-grouping', 'refactoring'],
    },
  ],
};
