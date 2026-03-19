import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-set',
  title: '10. Sets',
  explanation: `## Sets in Swift

Sets store unique values of the same type with no defined ordering.

\`\`\`swift
var colors: Set<String> = ["red", "green", "blue"]
let numbers: Set = [1, 2, 3, 4]    // Type inferred

colors.insert("yellow")
colors.remove("red")
colors.contains("green")  // true
\`\`\`

### Set Operations
\`\`\`swift
let a: Set = [1, 2, 3, 4]
let b: Set = [3, 4, 5, 6]

a.intersection(b)          // {3, 4}
a.union(b)                 // {1, 2, 3, 4, 5, 6}
a.symmetricDifference(b)   // {1, 2, 5, 6}
a.subtracting(b)           // {1, 2}
a.isSubset(of: b)          // false
\`\`\``,
  exercises: [
    {
      id: 'swift-set-1',
      title: 'Create a Set',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Declare a Set of Strings.',
      skeleton: `var tags: ___<String> = ["swift", "ios", "apple"]`,
      solution: `var tags: Set<String> = ["swift", "ios", "apple"]`,
      hints: [
        'Set requires an explicit type annotation.',
        'Without it, the literal creates an Array.',
        'Use Set<String> for the type.',
      ],
      concepts: ['Set', 'type-annotation'],
    },
    {
      id: 'swift-set-2',
      title: 'Insert into Set',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Add an element to the set.',
      skeleton: `var fruits: Set = ["apple", "banana"]
fruits.___("cherry")`,
      solution: `var fruits: Set = ["apple", "banana"]
fruits.insert("cherry")`,
      hints: [
        'Use insert() to add elements.',
        'Duplicates are automatically ignored.',
        'insert returns a tuple with an inserted Bool.',
      ],
      concepts: ['insert'],
    },
    {
      id: 'swift-set-3',
      title: 'Set Contains',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Check if the set contains a specific value.',
      skeleton: `let primes: Set = [2, 3, 5, 7, 11]
let hasFive = primes.___(5)`,
      solution: `let primes: Set = [2, 3, 5, 7, 11]
let hasFive = primes.contains(5)`,
      hints: [
        'Use contains() to check membership.',
        'Set lookup is O(1) on average.',
        'Returns a Bool.',
      ],
      concepts: ['contains'],
    },
    {
      id: 'swift-set-4',
      title: 'Set Intersection',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Find the common elements between two sets.',
      skeleton: `let a: Set = [1, 2, 3, 4]
let b: Set = [3, 4, 5, 6]
let common = a.___(b)`,
      solution: `let a: Set = [1, 2, 3, 4]
let b: Set = [3, 4, 5, 6]
let common = a.intersection(b)`,
      hints: [
        'intersection returns elements in both sets.',
        'The result contains only shared values.',
        '{3, 4} are the common elements.',
      ],
      concepts: ['intersection'],
    },
    {
      id: 'swift-set-5',
      title: 'Set Union',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Combine two sets into one.',
      skeleton: `let a: Set = [1, 2]
let b: Set = [2, 3]
let all = a.___(b)`,
      solution: `let a: Set = [1, 2]
let b: Set = [2, 3]
let all = a.union(b)`,
      hints: [
        'union combines all elements from both sets.',
        'Duplicates are automatically removed.',
        'The result is {1, 2, 3}.',
      ],
      concepts: ['union'],
    },
    {
      id: 'swift-set-6',
      title: 'Symmetric Difference',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Find elements in either set but not both.',
      skeleton: `let a: Set = [1, 2, 3]
let b: Set = [2, 3, 4]
let diff = a.___(b)`,
      solution: `let a: Set = [1, 2, 3]
let b: Set = [2, 3, 4]
let diff = a.symmetricDifference(b)`,
      hints: [
        'symmetricDifference gives elements in one but not both.',
        'It is the XOR of two sets.',
        'The result is {1, 4}.',
      ],
      concepts: ['symmetricDifference'],
    },
    {
      id: 'swift-set-7',
      title: 'Remove Duplicates from Array',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Write a function that returns unique elements from an array (order not preserved).',
      skeleton: `func unique(_ arr: [Int]) -> [Int] {
    // Return unique elements
}`,
      solution: `func unique(_ arr: [Int]) -> [Int] {
    return Array(Set(arr))
}`,
      hints: [
        'Convert the array to a Set to remove duplicates.',
        'Convert back to Array for the return type.',
        'Note: Set does not preserve order.',
      ],
      concepts: ['Set', 'deduplication'],
    },
    {
      id: 'swift-set-8',
      title: 'Check Subset',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that checks if all required skills are present in a candidate\'s skills.',
      skeleton: `func hasAllSkills(required: Set<String>, candidate: Set<String>) -> Bool {
    // Check if required is a subset of candidate
}`,
      solution: `func hasAllSkills(required: Set<String>, candidate: Set<String>) -> Bool {
    return required.isSubset(of: candidate)
}`,
      hints: [
        'Use isSubset(of:) to check containment.',
        'A is a subset of B if all elements of A are in B.',
        'Returns true if the candidate has every required skill.',
      ],
      concepts: ['isSubset'],
    },
    {
      id: 'swift-set-9',
      title: 'Find Missing Elements',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that returns elements in the first set but not the second.',
      skeleton: `func missing(from source: Set<Int>, in target: Set<Int>) -> Set<Int> {
    // Return elements in source but not in target
}`,
      solution: `func missing(from source: Set<Int>, in target: Set<Int>) -> Set<Int> {
    return source.subtracting(target)
}`,
      hints: [
        'Use subtracting() to remove elements found in another set.',
        'source.subtracting(target) keeps only what target lacks.',
        'This is the set difference operation.',
      ],
      concepts: ['subtracting'],
    },
    {
      id: 'swift-set-10',
      title: 'Common Tags Finder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that finds tags common to all given sets of tags.',
      skeleton: `func commonTags(_ tagSets: [Set<String>]) -> Set<String> {
    // Return tags present in ALL sets
}`,
      solution: `func commonTags(_ tagSets: [Set<String>]) -> Set<String> {
    guard var result = tagSets.first else { return [] }
    for tags in tagSets.dropFirst() {
        result = result.intersection(tags)
    }
    return result
}`,
      hints: [
        'Start with the first set.',
        'Intersect with each subsequent set.',
        'The running intersection keeps only common elements.',
      ],
      concepts: ['intersection', 'reduce'],
    },
    {
      id: 'swift-set-11',
      title: 'Set from String Characters',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Write a function that returns the unique characters in a string as a Set.',
      skeleton: `func uniqueChars(_ s: String) -> Set<Character> {
    // Return unique characters
}`,
      solution: `func uniqueChars(_ s: String) -> Set<Character> {
    return Set(s)
}`,
      hints: [
        'A String is a sequence of Characters.',
        'Set can be initialized from any sequence.',
        'Set(s) creates a set of the characters.',
      ],
      concepts: ['Set-init', 'Character'],
    },
    {
      id: 'swift-set-12',
      title: 'Disjoint Check',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that checks if two arrays share no common elements.',
      skeleton: `func areDisjoint(_ a: [Int], _ b: [Int]) -> Bool {
    // Return true if no common elements
}`,
      solution: `func areDisjoint(_ a: [Int], _ b: [Int]) -> Bool {
    return Set(a).isDisjoint(with: Set(b))
}`,
      hints: [
        'Convert arrays to sets.',
        'Use isDisjoint(with:) to check for no overlap.',
        'Returns true if the sets have no common elements.',
      ],
      concepts: ['isDisjoint', 'Set'],
    },
    {
      id: 'swift-set-13',
      title: 'Fix Set Type Annotation',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the code so it creates a Set, not an Array.',
      skeleton: `let colors = ["red", "green", "blue"]
// colors is an Array, should be a Set`,
      solution: `let colors: Set = ["red", "green", "blue"]`,
      hints: [
        'Array literals default to Array type.',
        'Add `: Set` annotation to create a Set.',
        'Set<String> can also be used.',
      ],
      concepts: ['Set', 'type-annotation'],
    },
    {
      id: 'swift-set-14',
      title: 'Fix Set Mutation',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the code so the set can be modified.',
      skeleton: `let numbers: Set = [1, 2, 3]
numbers.insert(4)
print(numbers)`,
      solution: `var numbers: Set = [1, 2, 3]
numbers.insert(4)
print(numbers)`,
      hints: [
        'let sets are immutable.',
        'Change let to var to allow mutation.',
        'insert is a mutating operation.',
      ],
      concepts: ['let', 'var', 'mutability'],
    },
    {
      id: 'swift-set-15',
      title: 'Fix Non-Hashable Set',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the array subscript being used on a set.',
      skeleton: `let items: Set = [10, 20, 30]
let first = items[0]
print(first)`,
      solution: `let items: Set = [10, 20, 30]
let first = items.first!
print(first)`,
      hints: [
        'Sets do not support integer subscripting.',
        'Use .first to get an arbitrary element.',
        'Sets have no defined order.',
      ],
      concepts: ['Set', 'subscript'],
    },
    {
      id: 'swift-set-16',
      title: 'Predict Set Count',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `var s: Set = [1, 2, 2, 3, 3, 3]
print(s.count)`,
      solution: `3`,
      hints: [
        'Sets remove duplicates automatically.',
        'Only unique values 1, 2, 3 remain.',
        'The count is 3.',
      ],
      concepts: ['Set', 'uniqueness'],
    },
    {
      id: 'swift-set-17',
      title: 'Predict Insert Result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `var s: Set = [1, 2, 3]
let (inserted, _) = s.insert(2)
print(inserted)`,
      solution: `false`,
      hints: [
        'insert returns (inserted: Bool, memberAfterInsert).',
        '2 is already in the set.',
        'inserted is false because no new element was added.',
      ],
      concepts: ['insert', 'return-tuple'],
    },
    {
      id: 'swift-set-18',
      title: 'Predict Intersection',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `let a: Set = [1, 2, 3]
let b: Set = [4, 5, 6]
print(a.intersection(b).isEmpty)`,
      solution: `true`,
      hints: [
        'The two sets have no common elements.',
        'Their intersection is empty.',
        'isEmpty returns true for an empty set.',
      ],
      concepts: ['intersection', 'isEmpty'],
    },
    {
      id: 'swift-set-19',
      title: 'Refactor Contains Loop to Set',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor the O(n) array lookup to O(1) set lookup.',
      skeleton: `let banned = ["spam", "scam", "fake"]
let word = "scam"
var found = false
for b in banned {
    if b == word {
        found = true
        break
    }
}
print(found)`,
      solution: `let banned: Set = ["spam", "scam", "fake"]
let word = "scam"
let found = banned.contains(word)
print(found)`,
      hints: [
        'Convert the array to a Set for O(1) lookup.',
        'Use contains() instead of a loop.',
        'Sets are optimized for membership testing.',
      ],
      concepts: ['Set', 'contains', 'performance'],
    },
    {
      id: 'swift-set-20',
      title: 'Refactor Manual Intersection',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor the manual intersection loop to use the built-in method.',
      skeleton: `let a: Set = [1, 2, 3, 4, 5]
let b: Set = [3, 4, 5, 6, 7]
var common: Set<Int> = []
for item in a {
    if b.contains(item) {
        common.insert(item)
    }
}
print(common)`,
      solution: `let a: Set = [1, 2, 3, 4, 5]
let b: Set = [3, 4, 5, 6, 7]
let common = a.intersection(b)
print(common)`,
      hints: [
        'Use the built-in intersection method.',
        'It replaces the entire loop.',
        'The result is the same set of common elements.',
      ],
      concepts: ['intersection', 'refactoring'],
    },
  ],
};
