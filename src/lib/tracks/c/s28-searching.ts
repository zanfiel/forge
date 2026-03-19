import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-search',
  title: '28. Searching Algorithms',
  explanation: `## Searching Algorithms

Searching finds a target element in a collection. The choice of algorithm depends on whether data is sorted.

\`\`\`c
int binary_search(int arr[], int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}
\`\`\`

### Key Concepts
- **Linear search**: O(n), works on unsorted data
- **Binary search**: O(log n), requires sorted data
- **Interpolation search**: O(log log n) for uniform distributions
- **Sentinel search**: optimization of linear search
`,
  exercises: [
    {
      id: 'c-search-1',
      title: 'Linear search',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete a linear search function.',
      skeleton: `#include <stdio.h>

int linear_search(int arr[], int n, int target) {
    for (int i = 0; i < __BLANK__; i++)
        if (arr[__BLANK__] == target)
            return __BLANK__;
    return -1;
}

int main(void) {
    int a[] = {10, 23, 45, 70, 11};
    int idx = linear_search(a, 5, 45);
    printf("Found at index: %d\\n", idx);
    return 0;
}`,
      solution: `#include <stdio.h>

int linear_search(int arr[], int n, int target) {
    for (int i = 0; i < n; i++)
        if (arr[i] == target)
            return i;
    return -1;
}

int main(void) {
    int a[] = {10, 23, 45, 70, 11};
    int idx = linear_search(a, 5, 45);
    printf("Found at index: %d\\n", idx);
    return 0;
}`,
      hints: [
        'Loop from 0 to n.',
        'Compare arr[i] with target.',
        'Return the index i when found.',
      ],
      concepts: ['linear search', 'sequential scan', 'O(n)'],
    },
    {
      id: 'c-search-2',
      title: 'Binary search',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete a binary search on a sorted array.',
      skeleton: `#include <stdio.h>

int binary_search(int arr[], int n, int target) {
    int lo = 0, hi = __BLANK__;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / __BLANK__;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = __BLANK__;
        else hi = mid - 1;
    }
    return -1;
}

int main(void) {
    int a[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    printf("Index: %d\\n", binary_search(a, 10, 23));
    return 0;
}`,
      solution: `#include <stdio.h>

int binary_search(int arr[], int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

int main(void) {
    int a[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    printf("Index: %d\\n", binary_search(a, 10, 23));
    return 0;
}`,
      hints: [
        'hi starts at n - 1 (last valid index).',
        'Divide by 2 to find midpoint.',
        'If arr[mid] < target, search right: lo = mid + 1.',
      ],
      concepts: ['binary search', 'divide and conquer', 'O(log n)'],
    },
    {
      id: 'c-search-3',
      title: 'Recursive binary search',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a recursive binary search function.',
      skeleton: `#include <stdio.h>

// Write int binary_search_rec(int arr[], int lo, int hi, int target)
// Return index or -1 if not found

int main(void) {
    int a[] = {1, 3, 5, 7, 9, 11, 13};
    printf("Index: %d\\n", binary_search_rec(a, 0, 6, 7));
    printf("Index: %d\\n", binary_search_rec(a, 0, 6, 4));
    return 0;
}`,
      solution: `#include <stdio.h>

int binary_search_rec(int arr[], int lo, int hi, int target) {
    if (lo > hi) return -1;
    int mid = lo + (hi - lo) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) return binary_search_rec(arr, mid + 1, hi, target);
    return binary_search_rec(arr, lo, mid - 1, target);
}

int main(void) {
    int a[] = {1, 3, 5, 7, 9, 11, 13};
    printf("Index: %d\\n", binary_search_rec(a, 0, 6, 7));
    printf("Index: %d\\n", binary_search_rec(a, 0, 6, 4));
    return 0;
}`,
      hints: [
        'Base case: lo > hi means not found, return -1.',
        'Compute mid, check if target is at mid.',
        'Recurse on left or right half depending on comparison.',
      ],
      concepts: ['binary search', 'recursion', 'base case'],
    },
    {
      id: 'c-search-4',
      title: 'Predict binary search steps',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the number of comparisons binary search makes.',
      skeleton: `#include <stdio.h>

int binary_search(int arr[], int n, int target, int *steps) {
    int lo = 0, hi = n - 1;
    *steps = 0;
    while (lo <= hi) {
        (*steps)++;
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

int main(void) {
    int a[] = {1, 3, 5, 7, 9, 11, 13, 15};
    int steps;
    int idx = binary_search(a, 8, 13, &steps);
    printf("index=%d steps=%d\\n", idx, steps);
    return 0;
}`,
      solution: `#include <stdio.h>

int binary_search(int arr[], int n, int target, int *steps) {
    int lo = 0, hi = n - 1;
    *steps = 0;
    while (lo <= hi) {
        (*steps)++;
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

int main(void) {
    int a[] = {1, 3, 5, 7, 9, 11, 13, 15};
    int steps;
    int idx = binary_search(a, 8, 13, &steps);
    printf("index=%d steps=%d\\n", idx, steps);
    return 0;
}
// Output: index=6 steps=3`,
      hints: [
        'Step 1: mid=3, arr[3]=7 < 13, lo=4.',
        'Step 2: mid=5, arr[5]=11 < 13, lo=6.',
        'Step 3: mid=6, arr[6]=13 == target. Found at index 6 in 3 steps.',
      ],
      concepts: ['binary search', 'step counting', 'logarithmic'],
    },
    {
      id: 'c-search-5',
      title: 'Find first occurrence',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a binary search that finds the first occurrence of a duplicate value.',
      skeleton: `#include <stdio.h>

// Write int find_first(int arr[], int n, int target)
// Return index of first occurrence, or -1

int main(void) {
    int a[] = {1, 2, 2, 2, 3, 4, 5};
    printf("First 2 at: %d\\n", find_first(a, 7, 2));
    printf("First 6 at: %d\\n", find_first(a, 7, 6));
    return 0;
}`,
      solution: `#include <stdio.h>

int find_first(int arr[], int n, int target) {
    int lo = 0, hi = n - 1, result = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) {
            result = mid;
            hi = mid - 1;
        } else if (arr[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return result;
}

int main(void) {
    int a[] = {1, 2, 2, 2, 3, 4, 5};
    printf("First 2 at: %d\\n", find_first(a, 7, 2));
    printf("First 6 at: %d\\n", find_first(a, 7, 6));
    return 0;
}`,
      hints: [
        'When you find target, record the index but keep searching left.',
        'Set result = mid, then hi = mid - 1 to check for earlier occurrences.',
        'Return result which holds the leftmost match, or -1.',
      ],
      concepts: ['binary search', 'first occurrence', 'lower bound'],
    },
    {
      id: 'c-search-6',
      title: 'Sentinel linear search',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete a sentinel linear search that avoids bounds checking in the loop.',
      skeleton: `#include <stdio.h>

int sentinel_search(int arr[], int n, int target) {
    int last = arr[n - 1];
    arr[n - 1] = __BLANK__;
    int i = 0;
    while (arr[i] != __BLANK__)
        i++;
    arr[n - 1] = __BLANK__;
    if (i < n - 1 || last == target)
        return (i < n - 1) ? i : n - 1;
    return -1;
}

int main(void) {
    int a[] = {10, 20, 30, 40, 50};
    printf("Index: %d\\n", sentinel_search(a, 5, 30));
    return 0;
}`,
      solution: `#include <stdio.h>

int sentinel_search(int arr[], int n, int target) {
    int last = arr[n - 1];
    arr[n - 1] = target;
    int i = 0;
    while (arr[i] != target)
        i++;
    arr[n - 1] = last;
    if (i < n - 1 || last == target)
        return (i < n - 1) ? i : n - 1;
    return -1;
}

int main(void) {
    int a[] = {10, 20, 30, 40, 50};
    printf("Index: %d\\n", sentinel_search(a, 5, 30));
    return 0;
}`,
      hints: [
        'Place target as sentinel at arr[n-1] to guarantee the loop terminates.',
        'Loop checks arr[i] != target without needing i < n.',
        'Restore the original last element after the search.',
      ],
      concepts: ['sentinel search', 'optimization', 'linear search'],
    },
    {
      id: 'c-search-7',
      title: 'Fix binary search overflow',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the integer overflow bug in midpoint calculation.',
      skeleton: `#include <stdio.h>

int binary_search(int arr[], int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;  // BUG: can overflow for large lo + hi
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

int main(void) {
    int a[] = {1, 2, 3, 4, 5};
    printf("Index: %d\\n", binary_search(a, 5, 3));
    return 0;
}`,
      solution: `#include <stdio.h>

int binary_search(int arr[], int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

int main(void) {
    int a[] = {1, 2, 3, 4, 5};
    printf("Index: %d\\n", binary_search(a, 5, 3));
    return 0;
}`,
      hints: [
        '(lo + hi) can overflow INT_MAX when both are large.',
        'Use lo + (hi - lo) / 2 instead.',
        'This computes the same midpoint without overflow risk.',
      ],
      concepts: ['integer overflow', 'binary search', 'safe midpoint'],
    },
    {
      id: 'c-search-8',
      title: 'Interpolation search',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write an interpolation search for uniformly distributed sorted data.',
      skeleton: `#include <stdio.h>

// Write int interpolation_search(int arr[], int n, int target)
// Estimate position: pos = lo + ((target - arr[lo]) * (hi - lo)) / (arr[hi] - arr[lo])

int main(void) {
    int a[] = {10, 20, 30, 40, 50, 60, 70, 80, 90, 100};
    printf("Index: %d\\n", interpolation_search(a, 10, 70));
    printf("Index: %d\\n", interpolation_search(a, 10, 35));
    return 0;
}`,
      solution: `#include <stdio.h>

int interpolation_search(int arr[], int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi && target >= arr[lo] && target <= arr[hi]) {
        if (arr[hi] == arr[lo]) {
            if (arr[lo] == target) return lo;
            break;
        }
        int pos = lo + ((long long)(target - arr[lo]) * (hi - lo))
                       / (arr[hi] - arr[lo]);
        if (arr[pos] == target) return pos;
        else if (arr[pos] < target) lo = pos + 1;
        else hi = pos - 1;
    }
    return -1;
}

int main(void) {
    int a[] = {10, 20, 30, 40, 50, 60, 70, 80, 90, 100};
    printf("Index: %d\\n", interpolation_search(a, 10, 70));
    printf("Index: %d\\n", interpolation_search(a, 10, 35));
    return 0;
}`,
      hints: [
        'Formula: lo + ((target - arr[lo]) * (hi - lo)) / (arr[hi] - arr[lo]).',
        'Cast to long long to avoid overflow in the multiplication.',
        'Guard against arr[hi] == arr[lo] to prevent division by zero.',
      ],
      concepts: ['interpolation search', 'uniform distribution', 'O(log log n)'],
    },
    {
      id: 'c-search-9',
      title: 'Predict linear search count',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict how many comparisons linear search makes for a missing element.',
      skeleton: `#include <stdio.h>

int main(void) {
    int a[] = {5, 8, 1, 3, 9};
    int target = 7, count = 0;
    for (int i = 0; i < 5; i++) {
        count++;
        if (a[i] == target) break;
    }
    printf("comparisons=%d found=%d\\n", count, (count <= 5 && a[count-1] == target));
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int a[] = {5, 8, 1, 3, 9};
    int target = 7, count = 0;
    for (int i = 0; i < 5; i++) {
        count++;
        if (a[i] == target) break;
    }
    printf("comparisons=%d found=%d\\n", count, (count <= 5 && a[count-1] == target));
    return 0;
}
// Output: comparisons=5 found=0`,
      hints: [
        '7 is not in the array, so the loop runs all 5 iterations.',
        'count increments each iteration: ends at 5.',
        'a[4] = 9 != 7, so found = 0.',
      ],
      concepts: ['linear search', 'worst case', 'comparisons'],
    },
    {
      id: 'c-search-10',
      title: 'Search in rotated array',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a search function for a sorted array that has been rotated.',
      skeleton: `#include <stdio.h>

// Write int search_rotated(int arr[], int n, int target)
// Array was sorted then rotated: e.g., [4,5,6,7,0,1,2]
// Use modified binary search, O(log n)

int main(void) {
    int a[] = {4, 5, 6, 7, 0, 1, 2};
    printf("Index: %d\\n", search_rotated(a, 7, 0));
    printf("Index: %d\\n", search_rotated(a, 7, 3));
    return 0;
}`,
      solution: `#include <stdio.h>

int search_rotated(int arr[], int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        if (arr[lo] <= arr[mid]) {
            if (target >= arr[lo] && target < arr[mid])
                hi = mid - 1;
            else
                lo = mid + 1;
        } else {
            if (target > arr[mid] && target <= arr[hi])
                lo = mid + 1;
            else
                hi = mid - 1;
        }
    }
    return -1;
}

int main(void) {
    int a[] = {4, 5, 6, 7, 0, 1, 2};
    printf("Index: %d\\n", search_rotated(a, 7, 0));
    printf("Index: %d\\n", search_rotated(a, 7, 3));
    return 0;
}`,
      hints: [
        'Determine which half is sorted by comparing arr[lo] with arr[mid].',
        'If left half is sorted, check if target falls in that range.',
        'Otherwise check the right half similarly.',
      ],
      concepts: ['rotated array', 'binary search', 'modified search'],
    },
    {
      id: 'c-search-11',
      title: 'Find peak element',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Find a peak element (greater than neighbors) using binary search.',
      skeleton: `#include <stdio.h>

// Write int find_peak(int arr[], int n)
// A peak is arr[i] > arr[i-1] and arr[i] > arr[i+1]
// Return any peak index. O(log n) using binary search.

int main(void) {
    int a[] = {1, 3, 20, 4, 1, 0};
    printf("Peak at: %d\\n", find_peak(a, 6));
    return 0;
}`,
      solution: `#include <stdio.h>

int find_peak(int arr[], int n) {
    int lo = 0, hi = n - 1;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] < arr[mid + 1])
            lo = mid + 1;
        else
            hi = mid;
    }
    return lo;
}

int main(void) {
    int a[] = {1, 3, 20, 4, 1, 0};
    printf("Peak at: %d\\n", find_peak(a, 6));
    return 0;
}`,
      hints: [
        'If arr[mid] < arr[mid+1], peak is to the right.',
        'Otherwise peak is at mid or to the left.',
        'Loop until lo == hi; that is the peak.',
      ],
      concepts: ['peak finding', 'binary search', 'mountain array'],
    },
    {
      id: 'c-search-12',
      title: 'Fix off-by-one in binary search',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the bug that causes binary search to miss elements.',
      skeleton: `#include <stdio.h>

int binary_search(int arr[], int n, int target) {
    int lo = 0, hi = n;  // BUG
    while (lo < hi) {    // BUG
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

int main(void) {
    int a[] = {2, 4, 6, 8, 10};
    printf("Index of 10: %d\\n", binary_search(a, 5, 10));
    printf("Index of 2: %d\\n", binary_search(a, 5, 2));
    return 0;
}`,
      solution: `#include <stdio.h>

int binary_search(int arr[], int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

int main(void) {
    int a[] = {2, 4, 6, 8, 10};
    printf("Index of 10: %d\\n", binary_search(a, 5, 10));
    printf("Index of 2: %d\\n", binary_search(a, 5, 2));
    return 0;
}`,
      hints: [
        'hi = n goes one past the array; use hi = n - 1.',
        'lo < hi misses the case where lo == hi (single element).',
        'Use lo <= hi with hi = n - 1 for inclusive binary search.',
      ],
      concepts: ['binary search', 'off-by-one', 'inclusive bounds'],
    },
    {
      id: 'c-search-13',
      title: 'Two-sum with binary search',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Find two elements in a sorted array that sum to a target.',
      skeleton: `#include <stdio.h>

// Write int two_sum(int arr[], int n, int target, int *i1, int *i2)
// Use two-pointer technique on sorted array
// Set *i1 and *i2 to the indices, return 1 if found, 0 otherwise

int main(void) {
    int a[] = {1, 2, 3, 5, 8, 13};
    int i1, i2;
    if (two_sum(a, 6, 10, &i1, &i2))
        printf("Indices: %d and %d\\n", i1, i2);
    else
        printf("Not found\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

int two_sum(int arr[], int n, int target, int *i1, int *i2) {
    int lo = 0, hi = n - 1;
    while (lo < hi) {
        int sum = arr[lo] + arr[hi];
        if (sum == target) {
            *i1 = lo;
            *i2 = hi;
            return 1;
        } else if (sum < target) {
            lo++;
        } else {
            hi--;
        }
    }
    return 0;
}

int main(void) {
    int a[] = {1, 2, 3, 5, 8, 13};
    int i1, i2;
    if (two_sum(a, 6, 10, &i1, &i2))
        printf("Indices: %d and %d\\n", i1, i2);
    else
        printf("Not found\\n");
    return 0;
}`,
      hints: [
        'Start with lo = 0 and hi = n - 1.',
        'If sum < target, increment lo; if sum > target, decrement hi.',
        'If sum == target, store indices and return 1.',
      ],
      concepts: ['two pointers', 'sorted array', 'two sum'],
    },
    {
      id: 'c-search-14',
      title: 'Predict search result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output of find_first on a sorted array with duplicates.',
      skeleton: `#include <stdio.h>

int find_first(int arr[], int n, int target) {
    int lo = 0, hi = n - 1, result = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) { result = mid; hi = mid - 1; }
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return result;
}

int find_last(int arr[], int n, int target) {
    int lo = 0, hi = n - 1, result = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) { result = mid; lo = mid + 1; }
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return result;
}

int main(void) {
    int a[] = {1, 2, 2, 2, 2, 3, 4};
    printf("first=%d last=%d count=%d\\n",
           find_first(a, 7, 2), find_last(a, 7, 2),
           find_last(a, 7, 2) - find_first(a, 7, 2) + 1);
    return 0;
}`,
      solution: `#include <stdio.h>

int find_first(int arr[], int n, int target) {
    int lo = 0, hi = n - 1, result = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) { result = mid; hi = mid - 1; }
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return result;
}

int find_last(int arr[], int n, int target) {
    int lo = 0, hi = n - 1, result = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) { result = mid; lo = mid + 1; }
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return result;
}

int main(void) {
    int a[] = {1, 2, 2, 2, 2, 3, 4};
    printf("first=%d last=%d count=%d\\n",
           find_first(a, 7, 2), find_last(a, 7, 2),
           find_last(a, 7, 2) - find_first(a, 7, 2) + 1);
    return 0;
}
// Output: first=1 last=4 count=4`,
      hints: [
        'Value 2 appears at indices 1, 2, 3, 4.',
        'find_first returns 1 (leftmost), find_last returns 4 (rightmost).',
        'Count = 4 - 1 + 1 = 4.',
      ],
      concepts: ['binary search', 'first/last occurrence', 'counting'],
    },
    {
      id: 'c-search-15',
      title: 'Search in 2D matrix',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Search a sorted 2D matrix where each row is sorted and first element of each row > last of previous.',
      skeleton: `#include <stdio.h>

// Write int search_matrix(int rows, int cols, int mat[rows][cols], int target)
// Treat the 2D matrix as a flat sorted array
// Return 1 if found, 0 otherwise

int main(void) {
    int mat[3][4] = {
        {1, 3, 5, 7},
        {10, 11, 16, 20},
        {23, 30, 34, 60}
    };
    printf("Found 16: %d\\n", search_matrix(3, 4, mat, 16));
    printf("Found 13: %d\\n", search_matrix(3, 4, mat, 13));
    return 0;
}`,
      solution: `#include <stdio.h>

int search_matrix(int rows, int cols, int mat[rows][cols], int target) {
    int lo = 0, hi = rows * cols - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        int val = mat[mid / cols][mid % cols];
        if (val == target) return 1;
        else if (val < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return 0;
}

int main(void) {
    int mat[3][4] = {
        {1, 3, 5, 7},
        {10, 11, 16, 20},
        {23, 30, 34, 60}
    };
    printf("Found 16: %d\\n", search_matrix(3, 4, mat, 16));
    printf("Found 13: %d\\n", search_matrix(3, 4, mat, 13));
    return 0;
}`,
      hints: [
        'Total elements = rows * cols. Binary search on 0..total-1.',
        'Convert flat index mid to 2D: row = mid / cols, col = mid % cols.',
        'Compare mat[row][col] with target as in standard binary search.',
      ],
      concepts: ['2D binary search', 'index mapping', 'matrix search'],
    },
    {
      id: 'c-search-16',
      title: 'Fix search returning wrong index',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the bug where find_last returns the wrong index.',
      skeleton: `#include <stdio.h>

int find_last(int arr[], int n, int target) {
    int lo = 0, hi = n - 1, result = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) {
            result = mid;
            hi = mid - 1;  // BUG: should search right, not left
        } else if (arr[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return result;
}

int main(void) {
    int a[] = {1, 3, 3, 3, 5};
    printf("Last 3 at: %d\\n", find_last(a, 5, 3));
    return 0;
}`,
      solution: `#include <stdio.h>

int find_last(int arr[], int n, int target) {
    int lo = 0, hi = n - 1, result = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) {
            result = mid;
            lo = mid + 1;
        } else if (arr[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return result;
}

int main(void) {
    int a[] = {1, 3, 3, 3, 5};
    printf("Last 3 at: %d\\n", find_last(a, 5, 3));
    return 0;
}`,
      hints: [
        'To find the last occurrence, when you find target, search RIGHT.',
        'Change hi = mid - 1 to lo = mid + 1 after recording result.',
        'This continues searching rightward for later occurrences.',
      ],
      concepts: ['binary search', 'last occurrence', 'upper bound'],
    },
    {
      id: 'c-search-17',
      title: 'Refactor search to use bsearch',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor manual binary search to use the standard bsearch() function.',
      skeleton: `#include <stdio.h>

int binary_search(int arr[], int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

int main(void) {
    int a[] = {2, 5, 8, 12, 16, 23, 38};
    int idx = binary_search(a, 7, 12);
    if (idx >= 0) printf("Found at %d\\n", idx);
    else printf("Not found\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int cmp_int(const void *a, const void *b) {
    return *(const int *)a - *(const int *)b;
}

int main(void) {
    int a[] = {2, 5, 8, 12, 16, 23, 38};
    int target = 12;
    int *result = bsearch(&target, a, 7, sizeof(int), cmp_int);
    if (result)
        printf("Found at %d\\n", (int)(result - a));
    else
        printf("Not found\\n");
    return 0;
}`,
      hints: [
        'bsearch() takes: key pointer, base, count, size, comparator.',
        'It returns a pointer to the found element, or NULL.',
        'Compute index via pointer arithmetic: result - a.',
      ],
      concepts: ['bsearch', 'standard library', 'refactoring'],
    },
    {
      id: 'c-search-18',
      title: 'Exponential search',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Implement exponential search for unbounded/large sorted arrays.',
      skeleton: `#include <stdio.h>

// Write int exponential_search(int arr[], int n, int target)
// Find range by doubling, then binary search within that range

int main(void) {
    int a[] = {2, 3, 4, 10, 40, 50, 60, 70, 80, 90, 100};
    printf("Index: %d\\n", exponential_search(a, 11, 70));
    printf("Index: %d\\n", exponential_search(a, 11, 5));
    return 0;
}`,
      solution: `#include <stdio.h>

static int bin_search(int arr[], int lo, int hi, int target) {
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

int exponential_search(int arr[], int n, int target) {
    if (n == 0) return -1;
    if (arr[0] == target) return 0;
    int bound = 1;
    while (bound < n && arr[bound] <= target)
        bound *= 2;
    int lo = bound / 2;
    int hi = (bound < n) ? bound : n - 1;
    return bin_search(arr, lo, hi, target);
}

int main(void) {
    int a[] = {2, 3, 4, 10, 40, 50, 60, 70, 80, 90, 100};
    printf("Index: %d\\n", exponential_search(a, 11, 70));
    printf("Index: %d\\n", exponential_search(a, 11, 5));
    return 0;
}`,
      hints: [
        'Start with bound = 1, double until arr[bound] > target or bound >= n.',
        'Binary search between bound/2 and min(bound, n-1).',
        'Handle edge case: arr[0] == target.',
      ],
      concepts: ['exponential search', 'range finding', 'binary search'],
    },
    {
      id: 'c-search-19',
      title: 'Refactor to generic search',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor binary search to work with any data type using void pointers.',
      skeleton: `#include <stdio.h>

int binary_search_int(int arr[], int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

int main(void) {
    int a[] = {1, 3, 5, 7, 9};
    printf("Index: %d\\n", binary_search_int(a, 5, 7));
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

int generic_binary_search(const void *base, int n, size_t size,
                          const void *key,
                          int (*cmp)(const void *, const void *)) {
    int lo = 0, hi = n - 1;
    const char *arr = (const char *)base;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        int result = cmp(key, arr + mid * size);
        if (result == 0) return mid;
        else if (result > 0) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

int cmp_int(const void *a, const void *b) {
    return *(const int *)a - *(const int *)b;
}

int main(void) {
    int a[] = {1, 3, 5, 7, 9};
    int key = 7;
    printf("Index: %d\\n", generic_binary_search(a, 5, sizeof(int), &key, cmp_int));
    return 0;
}`,
      hints: [
        'Use void* base and size_t size for generic array access.',
        'Cast base to char* for byte-level arithmetic: arr + mid * size.',
        'Accept a comparator function pointer for type-agnostic comparison.',
      ],
      concepts: ['generic programming', 'void pointer', 'function pointer'],
    },
    {
      id: 'c-search-20',
      title: 'Ternary search',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Complete a ternary search that finds the maximum of a unimodal function.',
      skeleton: `#include <stdio.h>

double f(double x) { return -(x - 3.0) * (x - 3.0) + 10.0; }

double ternary_search(double lo, double hi) {
    for (int i = 0; i < 100; i++) {
        double m1 = lo + (hi - lo) / __BLANK__;
        double m2 = hi - (hi - lo) / __BLANK__;
        if (f(m1) < f(m2))
            lo = __BLANK__;
        else
            hi = m2;
    }
    return (lo + hi) / 2.0;
}

int main(void) {
    double peak = ternary_search(0.0, 6.0);
    printf("Peak at x = %.4f, f(x) = %.4f\\n", peak, f(peak));
    return 0;
}`,
      solution: `#include <stdio.h>

double f(double x) { return -(x - 3.0) * (x - 3.0) + 10.0; }

double ternary_search(double lo, double hi) {
    for (int i = 0; i < 100; i++) {
        double m1 = lo + (hi - lo) / 3.0;
        double m2 = hi - (hi - lo) / 3.0;
        if (f(m1) < f(m2))
            lo = m1;
        else
            hi = m2;
    }
    return (lo + hi) / 2.0;
}

int main(void) {
    double peak = ternary_search(0.0, 6.0);
    printf("Peak at x = %.4f, f(x) = %.4f\\n", peak, f(peak));
    return 0;
}`,
      hints: [
        'Divide the interval into thirds: m1 = lo + (hi-lo)/3, m2 = hi - (hi-lo)/3.',
        'If f(m1) < f(m2), the peak is not in [lo, m1], so lo = m1.',
        'Otherwise the peak is not in [m2, hi], so hi = m2.',
      ],
      concepts: ['ternary search', 'unimodal function', 'optimization'],
    },
  ],
};
