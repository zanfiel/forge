import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-arrays',
  title: '6. Arrays',
  explanation: `## Arrays

Arrays in Java are fixed-size, ordered collections of elements of the same type.

### Declaration & Initialization
\`\`\`java
int[] nums = new int[5];           // default zeros
int[] nums2 = {1, 2, 3, 4, 5};    // literal
int[] nums3 = new int[]{1, 2, 3}; // anonymous array
\`\`\`

### Multi-dimensional Arrays
\`\`\`java
int[][] matrix = new int[3][4];
int[][] jagged = {{1,2}, {3,4,5}};
\`\`\`

### Arrays Utility Class
- \`Arrays.sort(arr)\` - sort in place
- \`Arrays.copyOf(arr, newLength)\` - copy with new size
- \`Arrays.fill(arr, value)\` - fill with value
- \`Arrays.equals(a, b)\` - compare content
- \`Arrays.asList(arr)\` - convert to List (object arrays only)
- \`Arrays.toString(arr)\` - readable string

### Varargs
Methods can accept variable-length arguments as an array:
\`\`\`java
public static int sum(int... nums) { }
\`\`\`

### Array Covariance
\`String[]\` is a subtype of \`Object[]\`, but this can cause runtime \`ArrayStoreException\`.
`,
  exercises: [
    {
      id: 'java-arr-1',
      title: 'Array initialization',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Initialize an array with values 1, 2, 3.',
      skeleton: `int[] nums = __BLANK__{1, 2, 3};`,
      solution: `int[] nums = new int[]{1, 2, 3};`,
      hints: [
        'Anonymous array creation requires new type[].',
        'The size is inferred from the initializer.',
        'Use `new int[]`.',
      ],
      concepts: ['array initialization', 'anonymous array'],
    },
    {
      id: 'java-arr-2',
      title: 'Array length',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Access the length of an array.',
      skeleton: `int[] arr = {10, 20, 30};
int size = arr.__BLANK__;`,
      solution: `int[] arr = {10, 20, 30};
int size = arr.length;`,
      hints: [
        'Array length is a field, not a method.',
        'It does not use parentheses.',
        'Use `.length`.',
      ],
      concepts: ['array length', 'field access'],
    },
    {
      id: 'java-arr-3',
      title: 'Sort an array',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Sort the array in ascending order.',
      skeleton: `int[] nums = {5, 3, 1, 4, 2};
__BLANK__.sort(nums);`,
      solution: `int[] nums = {5, 3, 1, 4, 2};
Arrays.sort(nums);`,
      hints: [
        'Java has a utility class for array operations.',
        'It is in java.util package.',
        'Use `Arrays`.',
      ],
      concepts: ['Arrays.sort', 'sorting', 'java.util.Arrays'],
    },
    {
      id: 'java-arr-4',
      title: '2D array access',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Access the element at row 1, column 2 of a 2D array.',
      skeleton: `int[][] matrix = {{1,2,3},{4,5,6}};
int val = matrix__BLANK__;`,
      solution: `int[][] matrix = {{1,2,3},{4,5,6}};
int val = matrix[1][2];`,
      hints: [
        '2D arrays use two sets of brackets.',
        'Row 1 is the second row (0-indexed).',
        'Column 2 is the third column. Use `[1][2]`.',
      ],
      concepts: ['2D array', 'indexing', 'multidimensional'],
    },
    {
      id: 'java-arr-5',
      title: 'Arrays.copyOf',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Create a copy of the array with length 5 (padding with zeros).',
      skeleton: `int[] original = {1, 2, 3};
int[] copy = Arrays.__BLANK__(original, 5);`,
      solution: `int[] original = {1, 2, 3};
int[] copy = Arrays.copyOf(original, 5);`,
      hints: [
        'Arrays has a method that copies and optionally pads/truncates.',
        'The second parameter is the new length.',
        'Use `copyOf`.',
      ],
      concepts: ['Arrays.copyOf', 'array copy', 'padding'],
    },
    {
      id: 'java-arr-6',
      title: 'Varargs parameter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Declare a method parameter that accepts variable-length int arguments.',
      skeleton: `public static int sum(int__BLANK__ nums) {
    int total = 0;
    for (int n : nums) total += n;
    return total;
}`,
      solution: `public static int sum(int... nums) {
    int total = 0;
    for (int n : nums) total += n;
    return total;
}`,
      hints: [
        'Varargs uses three dots after the type.',
        'The parameter is treated as an array inside the method.',
        'Use `...` (ellipsis).',
      ],
      concepts: ['varargs', 'variable arguments', 'array parameter'],
    },
    {
      id: 'java-arr-7',
      title: 'Find maximum',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a method findMax(int[] arr) that returns the maximum value.',
      skeleton: '',
      solution: `public static int findMax(int[] arr) {
    int max = arr[0];
    for (int i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}`,
      hints: [
        'Initialize max with the first element.',
        'Loop through remaining elements comparing each.',
        'Update max when a larger element is found.',
      ],
      concepts: ['array traversal', 'maximum', 'comparison'],
    },
    {
      id: 'java-arr-8',
      title: 'Rotate array left',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method rotateLeft(int[] arr, int k) that rotates the array left by k positions.',
      skeleton: '',
      solution: `public static void rotateLeft(int[] arr, int k) {
    int n = arr.length;
    k = k % n;
    int[] temp = Arrays.copyOfRange(arr, 0, k);
    System.arraycopy(arr, k, arr, 0, n - k);
    System.arraycopy(temp, 0, arr, n - k, k);
}`,
      hints: [
        'Save the first k elements.',
        'Shift the remaining elements left.',
        'Place the saved elements at the end.',
      ],
      concepts: ['array rotation', 'System.arraycopy', 'modulo'],
    },
    {
      id: 'java-arr-9',
      title: 'Merge sorted arrays',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method mergeSorted(int[] a, int[] b) that merges two sorted arrays into one sorted array.',
      skeleton: '',
      solution: `public static int[] mergeSorted(int[] a, int[] b) {
    int[] result = new int[a.length + b.length];
    int i = 0, j = 0, k = 0;
    while (i < a.length && j < b.length) {
        if (a[i] <= b[j]) result[k++] = a[i++];
        else result[k++] = b[j++];
    }
    while (i < a.length) result[k++] = a[i++];
    while (j < b.length) result[k++] = b[j++];
    return result;
}`,
      hints: [
        'Use two pointers, one for each array.',
        'Compare current elements and pick the smaller one.',
        'Copy remaining elements when one array is exhausted.',
      ],
      concepts: ['merge', 'sorted arrays', 'two pointers'],
    },
    {
      id: 'java-arr-10',
      title: 'Flatten 2D array',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method flatten(int[][] matrix) that returns a 1D array of all elements.',
      skeleton: '',
      solution: `public static int[] flatten(int[][] matrix) {
    int total = 0;
    for (int[] row : matrix) total += row.length;
    int[] result = new int[total];
    int idx = 0;
    for (int[] row : matrix) {
        for (int val : row) {
            result[idx++] = val;
        }
    }
    return result;
}`,
      hints: [
        'First calculate the total number of elements.',
        'Create a result array of that size.',
        'Copy all elements using nested loops.',
      ],
      concepts: ['2D array', 'flattening', 'nested loops'],
    },
    {
      id: 'java-arr-11',
      title: 'Remove duplicates from sorted',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method removeDuplicates(int[] sorted) that returns a new array with duplicates removed.',
      skeleton: '',
      solution: `public static int[] removeDuplicates(int[] sorted) {
    if (sorted.length == 0) return new int[0];
    int count = 1;
    for (int i = 1; i < sorted.length; i++) {
        if (sorted[i] != sorted[i - 1]) count++;
    }
    int[] result = new int[count];
    result[0] = sorted[0];
    int idx = 1;
    for (int i = 1; i < sorted.length; i++) {
        if (sorted[i] != sorted[i - 1]) {
            result[idx++] = sorted[i];
        }
    }
    return result;
}`,
      hints: [
        'In a sorted array, duplicates are adjacent.',
        'Count unique elements first, then fill the result array.',
        'Compare each element with its predecessor.',
      ],
      concepts: ['sorted array', 'duplicate removal', 'two-pass algorithm'],
    },
    {
      id: 'java-arr-12',
      title: 'Matrix transpose',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method transpose(int[][] matrix) that returns the transposed matrix.',
      skeleton: '',
      solution: `public static int[][] transpose(int[][] matrix) {
    int rows = matrix.length;
    int cols = matrix[0].length;
    int[][] result = new int[cols][rows];
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            result[j][i] = matrix[i][j];
        }
    }
    return result;
}`,
      hints: [
        'Transposing swaps rows and columns.',
        'Element at [i][j] moves to [j][i].',
        'The result has dimensions cols x rows.',
      ],
      concepts: ['matrix transpose', '2D array', 'nested loops'],
    },
    {
      id: 'java-arr-13',
      title: 'ArrayStoreException',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the ArrayStoreException caused by array covariance.',
      skeleton: `public static void addElement(Object[] arr) {
    arr[0] = 42; // throws ArrayStoreException if arr is String[]
}

// Called with: addElement(new String[]{"hello"});`,
      solution: `public static void addElement(Object[] arr) {
    if (arr.getClass().getComponentType() == Object.class || 
        arr.getClass().getComponentType() == Integer.class) {
        arr[0] = 42;
    }
}`,
      hints: [
        'Array covariance means String[] can be assigned to Object[].',
        'But storing an Integer in a String[] throws ArrayStoreException.',
        'Check the actual component type before storing.',
      ],
      concepts: ['array covariance', 'ArrayStoreException', 'type safety'],
    },
    {
      id: 'java-arr-14',
      title: 'Wrong array comparison',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the array comparison that uses == instead of Arrays.equals.',
      skeleton: `public static boolean areEqual(int[] a, int[] b) {
    return a == b;
}`,
      solution: `public static boolean areEqual(int[] a, int[] b) {
    return java.util.Arrays.equals(a, b);
}`,
      hints: [
        '== compares array references, not contents.',
        'Two different arrays with same content would return false.',
        'Use Arrays.equals() for content comparison.',
      ],
      concepts: ['Arrays.equals', 'reference comparison', 'content equality'],
    },
    {
      id: 'java-arr-15',
      title: 'Index out of bounds',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the array access that goes out of bounds.',
      skeleton: `public static int lastElement(int[] arr) {
    return arr[arr.length];
}`,
      solution: `public static int lastElement(int[] arr) {
    return arr[arr.length - 1];
}`,
      hints: [
        'Array indices go from 0 to length-1.',
        'arr[arr.length] is one past the end.',
        'Use arr.length - 1 for the last element.',
      ],
      concepts: ['array bounds', 'off-by-one', 'ArrayIndexOutOfBoundsException'],
    },
    {
      id: 'java-arr-16',
      title: 'Predict Arrays.toString',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the output of printing an array.',
      skeleton: `int[] arr = {1, 2, 3};
System.out.println(java.util.Arrays.toString(arr));`,
      solution: `[1, 2, 3]`,
      hints: [
        'Arrays.toString formats the array with brackets and commas.',
        'Each element is separated by ", ".',
        'The result is wrapped in square brackets.',
      ],
      concepts: ['Arrays.toString', 'array printing'],
    },
    {
      id: 'java-arr-17',
      title: 'Predict array default values',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the default values in a new array.',
      skeleton: `int[] nums = new int[3];
System.out.println(nums[0] + " " + nums[1] + " " + nums[2]);`,
      solution: `0 0 0`,
      hints: [
        'Arrays in Java are initialized with default values.',
        'For int, the default is 0.',
        'All three elements are 0.',
      ],
      concepts: ['default values', 'array initialization', 'int default'],
    },
    {
      id: 'java-arr-18',
      title: 'Predict array pass by reference',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output after passing an array to a method.',
      skeleton: `static void modify(int[] arr) { arr[0] = 99; }

int[] data = {1, 2, 3};
modify(data);
System.out.println(data[0]);`,
      solution: `99`,
      hints: [
        'Arrays are objects; the reference is passed by value.',
        'The method can modify the array contents through the reference.',
        'data[0] is changed to 99.',
      ],
      concepts: ['pass by value', 'reference semantics', 'array mutation'],
    },
    {
      id: 'java-arr-19',
      title: 'Refactor to Arrays.fill',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Refactor the manual loop to use Arrays.fill.',
      skeleton: `public static int[] createFilledArray(int size, int value) {
    int[] arr = new int[size];
    for (int i = 0; i < size; i++) {
        arr[i] = value;
    }
    return arr;
}`,
      solution: `public static int[] createFilledArray(int size, int value) {
    int[] arr = new int[size];
    java.util.Arrays.fill(arr, value);
    return arr;
}`,
      hints: [
        'Arrays.fill replaces a manual fill loop.',
        'It fills the entire array with the given value.',
        'One line replaces the entire for loop.',
      ],
      concepts: ['Arrays.fill', 'refactoring', 'utility methods'],
    },
    {
      id: 'java-arr-20',
      title: 'Refactor to enhanced for',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Refactor the indexed loop to use Arrays.stream and reduce.',
      skeleton: `public static int product(int[] arr) {
    int result = 1;
    for (int i = 0; i < arr.length; i++) {
        result *= arr[i];
    }
    return result;
}`,
      solution: `public static int product(int[] arr) {
    return java.util.Arrays.stream(arr).reduce(1, (a, b) -> a * b);
}`,
      hints: [
        'Arrays.stream creates an IntStream from the array.',
        'reduce combines all elements with an operation.',
        'Use 1 as identity and multiplication as the operation.',
      ],
      concepts: ['Arrays.stream', 'reduce', 'functional style'],
    },
  ],
};
