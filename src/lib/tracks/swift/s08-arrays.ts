import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-arr',
  title: '08. Arrays',
  explanation: `## Arrays in Swift

Arrays are ordered collections of values of the same type.

\`\`\`swift
var numbers: [Int] = [1, 2, 3]
let names = ["Alice", "Bob"]       // [String] inferred

numbers.append(4)                  // [1, 2, 3, 4]
numbers.insert(0, at: 0)           // [0, 1, 2, 3, 4]
numbers.remove(at: 0)              // [1, 2, 3, 4]
\`\`\`

### Higher-Order Methods
\`\`\`swift
let doubled = numbers.map { $0 * 2 }
let evens = numbers.filter { $0 % 2 == 0 }
let sum = numbers.reduce(0, +)
let sorted = numbers.sorted()
let compact = optionals.compactMap { $0 }
\`\`\``,
  exercises: [
    {
      id: 'swift-arr-1',
      title: 'Create an Array',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Declare an empty array of Strings.',
      skeleton: `var names: ___ = ___`,
      solution: `var names: [String] = []`,
      hints: [
        'Array type syntax is [ElementType].',
        'Empty array literal is [].',
        'Use [String] for the type.',
      ],
      concepts: ['Array', 'empty-array'],
    },
    {
      id: 'swift-arr-2',
      title: 'Append to Array',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Add an element to the end of the array.',
      skeleton: `var fruits = ["apple", "banana"]
fruits.___("cherry")`,
      solution: `var fruits = ["apple", "banana"]
fruits.append("cherry")`,
      hints: [
        'Use the append method to add to the end.',
        'append takes a single element.',
        'The array must be var to mutate.',
      ],
      concepts: ['append'],
    },
    {
      id: 'swift-arr-3',
      title: 'Array Count',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Get the number of elements in the array.',
      skeleton: `let items = [1, 2, 3, 4]
let size = items.___`,
      solution: `let items = [1, 2, 3, 4]
let size = items.count`,
      hints: [
        'Use the count property.',
        'count returns the number of elements.',
        'It is a property, not a method (no parentheses).',
      ],
      concepts: ['count'],
    },
    {
      id: 'swift-arr-4',
      title: 'Map Transformation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Use map to convert integers to strings.',
      skeleton: `let numbers = [1, 2, 3]
let strings = numbers.___ { ___(___) }`,
      solution: `let numbers = [1, 2, 3]
let strings = numbers.map { String($0) }`,
      hints: [
        'map transforms each element.',
        'String($0) converts Int to String.',
        '$0 is the current element.',
      ],
      concepts: ['map'],
    },
    {
      id: 'swift-arr-5',
      title: 'Reduce to Sum',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use reduce to calculate the sum of the array.',
      skeleton: `let numbers = [1, 2, 3, 4, 5]
let total = numbers.___(0, ___)`,
      solution: `let numbers = [1, 2, 3, 4, 5]
let total = numbers.reduce(0, +)`,
      hints: [
        'reduce combines all elements into one value.',
        'The first argument is the initial value.',
        'The + operator can be passed as a closure.',
      ],
      concepts: ['reduce'],
    },
    {
      id: 'swift-arr-6',
      title: 'CompactMap',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use compactMap to filter out nil values from optional conversion.',
      skeleton: `let strings = ["1", "two", "3"]
let numbers = strings.___ { Int($0) }`,
      solution: `let strings = ["1", "two", "3"]
let numbers = strings.compactMap { Int($0) }`,
      hints: [
        'compactMap applies a transform and removes nils.',
        'Int("two") returns nil.',
        'Only successfully converted values are kept.',
      ],
      concepts: ['compactMap'],
    },
    {
      id: 'swift-arr-7',
      title: 'Find Maximum',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Write a function that returns the maximum value in an Int array, or nil if empty.',
      skeleton: `func findMax(_ arr: [Int]) -> Int? {
    // Return the maximum value or nil
}`,
      solution: `func findMax(_ arr: [Int]) -> Int? {
    return arr.max()
}`,
      hints: [
        'Arrays have a built-in max() method.',
        'max() returns nil for empty arrays.',
        'The return type is Int? (optional).',
      ],
      concepts: ['max', 'Optional'],
    },
    {
      id: 'swift-arr-8',
      title: 'Remove Duplicates',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that removes duplicate integers while preserving order.',
      skeleton: `func removeDuplicates(_ arr: [Int]) -> [Int] {
    // Return array with duplicates removed, preserving order
}`,
      solution: `func removeDuplicates(_ arr: [Int]) -> [Int] {
    var seen = Set<Int>()
    return arr.filter { seen.insert($0).inserted }
}`,
      hints: [
        'Use a Set to track seen elements.',
        'filter keeps elements not yet in the set.',
        'insert returns a tuple with an inserted Bool.',
      ],
      concepts: ['filter', 'Set', 'deduplication'],
    },
    {
      id: 'swift-arr-9',
      title: 'Flatten Nested Arrays',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that flattens a 2D array into a 1D array.',
      skeleton: `func flatten(_ nested: [[Int]]) -> [Int] {
    // Flatten the nested array
}`,
      solution: `func flatten(_ nested: [[Int]]) -> [Int] {
    return nested.flatMap { $0 }
}`,
      hints: [
        'Use flatMap to flatten one level of nesting.',
        'flatMap concatenates the inner arrays.',
        'The closure returns each inner array.',
      ],
      concepts: ['flatMap'],
    },
    {
      id: 'swift-arr-10',
      title: 'Chunk Array',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a function that splits an array into chunks of a given size.',
      skeleton: `func chunk(_ arr: [Int], size: Int) -> [[Int]] {
    // Split arr into chunks of given size
}`,
      solution: `func chunk(_ arr: [Int], size: Int) -> [[Int]] {
    var result: [[Int]] = []
    var i = 0
    while i < arr.count {
        let end = min(i + size, arr.count)
        result.append(Array(arr[i..<end]))
        i += size
    }
    return result
}`,
      hints: [
        'Use stride or a while loop to step through the array.',
        'Slice with arr[i..<end].',
        'Handle the last chunk which may be smaller.',
      ],
      concepts: ['slicing', 'stride'],
    },
    {
      id: 'swift-arr-11',
      title: 'Zip Two Arrays',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that zips two arrays into an array of tuples.',
      skeleton: `func zipArrays(_ a: [Int], _ b: [String]) -> [(Int, String)] {
    // Zip the two arrays together
}`,
      solution: `func zipArrays(_ a: [Int], _ b: [String]) -> [(Int, String)] {
    return Array(zip(a, b))
}`,
      hints: [
        'Use the built-in zip function.',
        'zip pairs elements from two sequences.',
        'Convert the result to Array.',
      ],
      concepts: ['zip', 'tuples'],
    },
    {
      id: 'swift-arr-12',
      title: 'Partition Array',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a function that partitions an array into elements matching and not matching a predicate.',
      skeleton: `func partition(_ arr: [Int], _ predicate: (Int) -> Bool) -> (matching: [Int], rest: [Int]) {
    // Split into matching and non-matching
}`,
      solution: `func partition(_ arr: [Int], _ predicate: (Int) -> Bool) -> (matching: [Int], rest: [Int]) {
    var matching: [Int] = []
    var rest: [Int] = []
    for item in arr {
        if predicate(item) {
            matching.append(item)
        } else {
            rest.append(item)
        }
    }
    return (matching: matching, rest: rest)
}`,
      hints: [
        'Create two arrays for each group.',
        'Loop and test each element with the predicate.',
        'Return a named tuple.',
      ],
      concepts: ['partition', 'closures', 'tuples'],
    },
    {
      id: 'swift-arr-13',
      title: 'Fix Array Mutation on let',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the code so the array can be modified.',
      skeleton: `let items = [1, 2, 3]
items.append(4)
print(items)`,
      solution: `var items = [1, 2, 3]
items.append(4)
print(items)`,
      hints: [
        'let arrays are immutable.',
        'Change let to var to allow mutation.',
        'Only var arrays can be appended to.',
      ],
      concepts: ['let', 'var', 'mutability'],
    },
    {
      id: 'swift-arr-14',
      title: 'Fix Out of Bounds',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the code that accesses an index beyond the array bounds.',
      skeleton: `let arr = [10, 20, 30]
let val = arr[3]
print(val)`,
      solution: `let arr = [10, 20, 30]
let val = arr[2]
print(val)`,
      hints: [
        'Array indices start at 0.',
        'An array of 3 elements has indices 0, 1, 2.',
        'Index 3 is out of bounds.',
      ],
      concepts: ['array-indices', 'bounds'],
    },
    {
      id: 'swift-arr-15',
      title: 'Fix Type Mismatch in Array',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the array that has mixed types.',
      skeleton: `let items: [Int] = [1, 2, "three", 4]
print(items)`,
      solution: `let items: [Int] = [1, 2, 3, 4]
print(items)`,
      hints: [
        'All elements must match the array type.',
        '"three" is a String, not an Int.',
        'Replace it with the number 3.',
      ],
      concepts: ['type-safety', 'Array'],
    },
    {
      id: 'swift-arr-16',
      title: 'Predict Filter Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `let nums = [1, 2, 3, 4, 5]
let result = nums.filter { $0 > 3 }
print(result)`,
      solution: `[4, 5]`,
      hints: [
        'filter keeps elements where the closure returns true.',
        'Only 4 and 5 are greater than 3.',
        'The result is [4, 5].',
      ],
      concepts: ['filter'],
    },
    {
      id: 'swift-arr-17',
      title: 'Predict Reduce Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `let words = ["Hello", " ", "World"]
let result = words.reduce("", +)
print(result)`,
      solution: `Hello World`,
      hints: [
        'reduce starts with "" and concatenates each word.',
        '"" + "Hello" + " " + "World".',
        'The result is "Hello World".',
      ],
      concepts: ['reduce', 'string-concatenation'],
    },
    {
      id: 'swift-arr-18',
      title: 'Predict Sorted Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict what this code prints.',
      skeleton: `let nums = [3, 1, 4, 1, 5]
print(nums.sorted())`,
      solution: `[1, 1, 3, 4, 5]`,
      hints: [
        'sorted() returns elements in ascending order.',
        'Duplicate values are preserved.',
        'The original array is not modified.',
      ],
      concepts: ['sorted'],
    },
    {
      id: 'swift-arr-19',
      title: 'Refactor Loop to Map',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Refactor the for loop to use map.',
      skeleton: `let numbers = [1, 2, 3, 4]
var squares: [Int] = []
for n in numbers {
    squares.append(n * n)
}
print(squares)`,
      solution: `let numbers = [1, 2, 3, 4]
let squares = numbers.map { $0 * $0 }
print(squares)`,
      hints: [
        'map replaces the loop-and-append pattern.',
        'The closure transforms each element.',
        'The result can be let since map returns a new array.',
      ],
      concepts: ['map', 'refactoring'],
    },
    {
      id: 'swift-arr-20',
      title: 'Refactor Loop to Reduce',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor the loop to use reduce.',
      skeleton: `let numbers = [1, 2, 3, 4, 5]
var product = 1
for n in numbers {
    product *= n
}
print(product)`,
      solution: `let numbers = [1, 2, 3, 4, 5]
let product = numbers.reduce(1, *)
print(product)`,
      hints: [
        'reduce replaces the accumulator pattern.',
        'Start with initial value 1 for multiplication.',
        'Use the * operator as the closure.',
      ],
      concepts: ['reduce', 'refactoring'],
    },
  ],
};
