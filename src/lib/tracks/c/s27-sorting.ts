import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-sort',
  title: '27. Sorting Algorithms',
  explanation: `## Sorting Algorithms

Sorting arranges elements in a defined order. Understanding sorting is fundamental to algorithm design.

\`\`\`c
void bubble_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
}
\`\`\`

### Key Concepts
- **Bubble sort**: O(n^2), simple swapping adjacent elements
- **Selection sort**: O(n^2), find minimum and place it
- **Insertion sort**: O(n^2), build sorted portion incrementally
- **Merge sort**: O(n log n), divide-and-conquer, stable
- **Quicksort**: O(n log n) average, in-place, partition-based
- **qsort()**: C standard library generic sort
`,
  exercises: [
    {
      id: 'c-sort-1',
      title: 'Bubble sort swap',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete the bubble sort swap logic.',
      skeleton: `#include <stdio.h>

void bubble_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - __BLANK__ - 1; j++)
            if (arr[j] > arr[__BLANK__]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[__BLANK__] = tmp;
            }
}

int main(void) {
    int a[] = {5, 3, 8, 1, 2};
    bubble_sort(a, 5);
    for (int i = 0; i < 5; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

void bubble_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
}

int main(void) {
    int a[] = {5, 3, 8, 1, 2};
    bubble_sort(a, 5);
    for (int i = 0; i < 5; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'The inner loop shrinks by i each pass because the last i elements are sorted.',
        'Compare arr[j] with arr[j + 1].',
        'After swap, store tmp in arr[j + 1].',
      ],
      concepts: ['bubble sort', 'swap', 'nested loops'],
    },
    {
      id: 'c-sort-2',
      title: 'Selection sort',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a selection sort that sorts an array in ascending order.',
      skeleton: `#include <stdio.h>

// Write selection_sort(int arr[], int n)
// Find minimum in unsorted portion, swap with front

int main(void) {
    int a[] = {64, 25, 12, 22, 11};
    selection_sort(a, 5);
    for (int i = 0; i < 5; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

void selection_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++)
            if (arr[j] < arr[min_idx])
                min_idx = j;
        int tmp = arr[i];
        arr[i] = arr[min_idx];
        arr[min_idx] = tmp;
    }
}

int main(void) {
    int a[] = {64, 25, 12, 22, 11};
    selection_sort(a, 5);
    for (int i = 0; i < 5; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'Track the index of the minimum element in each pass.',
        'Inner loop starts from i + 1.',
        'Swap arr[i] with arr[min_idx] after finding the minimum.',
      ],
      concepts: ['selection sort', 'minimum finding', 'swap'],
    },
    {
      id: 'c-sort-3',
      title: 'Insertion sort fill',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete the insertion sort algorithm.',
      skeleton: `#include <stdio.h>

void insertion_sort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = __BLANK__;
        int j = __BLANK__;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[__BLANK__];
            j--;
        }
        arr[j + 1] = key;
    }
}

int main(void) {
    int a[] = {12, 11, 13, 5, 6};
    insertion_sort(a, 5);
    for (int i = 0; i < 5; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

void insertion_sort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

int main(void) {
    int a[] = {12, 11, 13, 5, 6};
    insertion_sort(a, 5);
    for (int i = 0; i < 5; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'key is the element being inserted: arr[i].',
        'j starts at i - 1 and moves left.',
        'Shift elements right: arr[j + 1] = arr[j].',
      ],
      concepts: ['insertion sort', 'shifting', 'sorted subarray'],
    },
    {
      id: 'c-sort-4',
      title: 'Merge sort merge function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write the merge function that combines two sorted halves.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Write void merge(int arr[], int left, int mid, int right)
// Merge arr[left..mid] and arr[mid+1..right] into sorted order
// Use temporary arrays allocated with malloc

void merge_sort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        merge_sort(arr, left, mid);
        merge_sort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

int main(void) {
    int a[] = {38, 27, 43, 3, 9, 82, 10};
    merge_sort(a, 0, 6);
    for (int i = 0; i < 7; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    int *L = malloc(n1 * sizeof(int));
    int *R = malloc(n2 * sizeof(int));
    memcpy(L, arr + left, n1 * sizeof(int));
    memcpy(R, arr + mid + 1, n2 * sizeof(int));
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2)
        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
    free(L);
    free(R);
}

void merge_sort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        merge_sort(arr, left, mid);
        merge_sort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

int main(void) {
    int a[] = {38, 27, 43, 3, 9, 82, 10};
    merge_sort(a, 0, 6);
    for (int i = 0; i < 7; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'Create temp arrays L and R with sizes mid-left+1 and right-mid.',
        'Copy elements, then merge back using three index variables.',
        'Don\'t forget to free the temp arrays.',
      ],
      concepts: ['merge sort', 'divide and conquer', 'temporary arrays'],
    },
    {
      id: 'c-sort-5',
      title: 'Quicksort partition',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete the Lomuto partition scheme for quicksort.',
      skeleton: `#include <stdio.h>

void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

int partition(int arr[], int low, int high) {
    int pivot = arr[__BLANK__];
    int i = low - 1;
    for (int j = low; j < __BLANK__; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[__BLANK__]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return i + 1;
}

void quicksort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quicksort(arr, low, pi - 1);
        quicksort(arr, pi + 1, high);
    }
}

int main(void) {
    int a[] = {10, 7, 8, 9, 1, 5};
    quicksort(a, 0, 5);
    for (int i = 0; i < 6; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return i + 1;
}

void quicksort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quicksort(arr, low, pi - 1);
        quicksort(arr, pi + 1, high);
    }
}

int main(void) {
    int a[] = {10, 7, 8, 9, 1, 5};
    quicksort(a, 0, 5);
    for (int i = 0; i < 6; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'Lomuto picks the last element as pivot: arr[high].',
        'Loop j from low to high (exclusive).',
        'Swap arr[i] with arr[j] when element < pivot.',
      ],
      concepts: ['quicksort', 'Lomuto partition', 'pivot'],
    },
    {
      id: 'c-sort-6',
      title: 'Predict bubble sort passes',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the output after one pass of bubble sort.',
      skeleton: `#include <stdio.h>

int main(void) {
    int a[] = {4, 3, 1, 2};
    int n = 4;
    // One pass of bubble sort
    for (int j = 0; j < n - 1; j++)
        if (a[j] > a[j + 1]) {
            int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
        }
    for (int i = 0; i < n; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int a[] = {4, 3, 1, 2};
    int n = 4;
    // One pass of bubble sort
    for (int j = 0; j < n - 1; j++)
        if (a[j] > a[j + 1]) {
            int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
        }
    for (int i = 0; i < n; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}
// Output: 3 1 2 4`,
      hints: [
        'Trace: [4,3,1,2] -> swap(4,3) -> [3,4,1,2].',
        'Then swap(4,1) -> [3,1,4,2].',
        'Then swap(4,2) -> [3,1,2,4]. The largest bubbles to the end.',
      ],
      concepts: ['bubble sort', 'single pass', 'trace execution'],
    },
    {
      id: 'c-sort-7',
      title: 'qsort comparator',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete a qsort comparator for descending order.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

int cmp_desc(const void *a, const void *b) {
    int ia = *(const int *)__BLANK__;
    int ib = *(const int *)__BLANK__;
    return __BLANK__;
}

int main(void) {
    int arr[] = {3, 1, 4, 1, 5, 9};
    qsort(arr, 6, sizeof(int), cmp_desc);
    for (int i = 0; i < 6; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int cmp_desc(const void *a, const void *b) {
    int ia = *(const int *)a;
    int ib = *(const int *)b;
    return ib - ia;
}

int main(void) {
    int arr[] = {3, 1, 4, 1, 5, 9};
    qsort(arr, 6, sizeof(int), cmp_desc);
    for (int i = 0; i < 6; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'Cast void pointers: *(const int *)a.',
        'For descending order, return ib - ia.',
        'qsort expects negative if a should come first.',
      ],
      concepts: ['qsort', 'comparator', 'void pointer cast'],
    },
    {
      id: 'c-sort-8',
      title: 'Fix off-by-one in sort',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the bug in this selection sort implementation.',
      skeleton: `#include <stdio.h>

void selection_sort(int arr[], int n) {
    for (int i = 0; i < n; i++) {  // BUG
        int min_idx = i;
        for (int j = i; j < n; j++)  // BUG
            if (arr[j] < arr[min_idx])
                min_idx = j;
        int tmp = arr[i];
        arr[i] = arr[min_idx];
        arr[min_idx] = tmp;
    }
}

int main(void) {
    int a[] = {29, 10, 14, 37, 13};
    selection_sort(a, 5);
    for (int i = 0; i < 5; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

void selection_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++)
            if (arr[j] < arr[min_idx])
                min_idx = j;
        int tmp = arr[i];
        arr[i] = arr[min_idx];
        arr[min_idx] = tmp;
    }
}

int main(void) {
    int a[] = {29, 10, 14, 37, 13};
    selection_sort(a, 5);
    for (int i = 0; i < 5; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'Outer loop should go to n - 1 (last element is already in place).',
        'Inner loop should start at i + 1 to avoid comparing element with itself.',
        'Both are off-by-one errors that cause unnecessary work but the first can cause an unnecessary self-swap.',
      ],
      concepts: ['selection sort', 'off-by-one', 'loop bounds'],
    },
    {
      id: 'c-sort-9',
      title: 'Merge sort full implementation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a complete merge sort for an integer array.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Write merge_sort(int arr[], int n) using a helper
// that recursively splits and merges

int main(void) {
    int a[] = {5, 2, 8, 1, 9, 3};
    merge_sort(a, 6);
    for (int i = 0; i < 6; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    int *L = malloc(n1 * sizeof(int));
    int *R = malloc(n2 * sizeof(int));
    memcpy(L, arr + l, n1 * sizeof(int));
    memcpy(R, arr + m + 1, n2 * sizeof(int));
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2)
        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
    free(L);
    free(R);
}

static void ms_helper(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        ms_helper(arr, l, m);
        ms_helper(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

void merge_sort(int arr[], int n) {
    if (n > 1) ms_helper(arr, 0, n - 1);
}

int main(void) {
    int a[] = {5, 2, 8, 1, 9, 3};
    merge_sort(a, 6);
    for (int i = 0; i < 6; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'Split into merge_sort(arr, n) and a recursive helper(arr, left, right).',
        'Base case: left >= right means single element.',
        'merge() combines two sorted halves using temp arrays.',
      ],
      concepts: ['merge sort', 'recursion', 'divide and conquer'],
    },
    {
      id: 'c-sort-10',
      title: 'Predict quicksort partition',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the array state after one Lomuto partition.',
      skeleton: `#include <stdio.h>

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
        }
    }
    int t = arr[i+1]; arr[i+1] = arr[high]; arr[high] = t;
    return i + 1;
}

int main(void) {
    int a[] = {8, 3, 5, 1, 4};
    int pi = partition(a, 0, 4);
    printf("pivot index: %d\\n", pi);
    for (int i = 0; i < 5; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
        }
    }
    int t = arr[i+1]; arr[i+1] = arr[high]; arr[high] = t;
    return i + 1;
}

int main(void) {
    int a[] = {8, 3, 5, 1, 4};
    int pi = partition(a, 0, 4);
    printf("pivot index: %d\\n", pi);
    for (int i = 0; i < 5; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}
// Output:
// pivot index: 2
// 3 1 4 5 8`,
      hints: [
        'Pivot is arr[4] = 4. Elements < 4: 3, 1.',
        'After loop: i = 1, arr = [3, 1, 5, 8, 4]. Swap arr[2] with arr[4].',
        'Result: [3, 1, 4, 5, 8], pivot index = 2.',
      ],
      concepts: ['Lomuto partition', 'quicksort trace', 'pivot placement'],
    },
    {
      id: 'c-sort-11',
      title: 'Sort strings with qsort',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a comparator to sort an array of strings alphabetically using qsort.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Write int cmp_strings(const void *a, const void *b)
// a and b point to (const char *) elements

int main(void) {
    const char *words[] = {"banana", "apple", "cherry", "date"};
    qsort(words, 4, sizeof(const char *), cmp_strings);
    for (int i = 0; i < 4; i++) printf("%s\\n", words[i]);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int cmp_strings(const void *a, const void *b) {
    const char *sa = *(const char **)a;
    const char *sb = *(const char **)b;
    return strcmp(sa, sb);
}

int main(void) {
    const char *words[] = {"banana", "apple", "cherry", "date"};
    qsort(words, 4, sizeof(const char *), cmp_strings);
    for (int i = 0; i < 4; i++) printf("%s\\n", words[i]);
    return 0;
}`,
      hints: [
        'qsort passes pointers to array elements; each element is a char*, so you get char**.',
        'Cast: *(const char **)a to get the actual string pointer.',
        'Use strcmp to compare the two strings.',
      ],
      concepts: ['qsort', 'string comparison', 'double pointer cast'],
    },
    {
      id: 'c-sort-12',
      title: 'Fix broken quicksort',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the infinite recursion bug in this quicksort.',
      skeleton: `#include <stdio.h>

void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++)
        if (arr[j] < pivot) swap(&arr[++i], &arr[j]);
    swap(&arr[i + 1], &arr[high]);
    return i + 1;
}

void quicksort(int arr[], int low, int high) {
    if (low <= high) {  // BUG: should be < not <=
        int pi = partition(arr, low, high);
        quicksort(arr, low, pi);      // BUG: should be pi - 1
        quicksort(arr, pi + 1, high);
    }
}

int main(void) {
    int a[] = {4, 2, 6, 1, 3};
    quicksort(a, 0, 4);
    for (int i = 0; i < 5; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++)
        if (arr[j] < pivot) swap(&arr[++i], &arr[j]);
    swap(&arr[i + 1], &arr[high]);
    return i + 1;
}

void quicksort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quicksort(arr, low, pi - 1);
        quicksort(arr, pi + 1, high);
    }
}

int main(void) {
    int a[] = {4, 2, 6, 1, 3};
    quicksort(a, 0, 4);
    for (int i = 0; i < 5; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'low <= high allows recursion when low == high (single element), causing infinite loop.',
        'The left recursive call includes the pivot (pi), re-sorting it forever.',
        'Fix: low < high and quicksort(arr, low, pi - 1).',
      ],
      concepts: ['quicksort', 'infinite recursion', 'base case'],
    },
    {
      id: 'c-sort-13',
      title: 'Counting sort',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Implement counting sort for non-negative integers with a known max value.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Write void counting_sort(int arr[], int n, int max_val)
// Use a count array of size max_val + 1

int main(void) {
    int a[] = {4, 2, 2, 8, 3, 3, 1};
    counting_sort(a, 7, 8);
    for (int i = 0; i < 7; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void counting_sort(int arr[], int n, int max_val) {
    int *count = calloc(max_val + 1, sizeof(int));
    for (int i = 0; i < n; i++) count[arr[i]]++;
    int idx = 0;
    for (int v = 0; v <= max_val; v++)
        while (count[v]-- > 0) arr[idx++] = v;
    free(count);
}

int main(void) {
    int a[] = {4, 2, 2, 8, 3, 3, 1};
    counting_sort(a, 7, 8);
    for (int i = 0; i < 7; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'Allocate count array of size max_val + 1 using calloc (zeroed).',
        'Count occurrences, then write values back to arr in order.',
        'Free the count array when done.',
      ],
      concepts: ['counting sort', 'non-comparison sort', 'calloc'],
    },
    {
      id: 'c-sort-14',
      title: 'Sort structs by field',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Sort an array of structs by age using qsort.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    char name[32];
    int age;
} Person;

// Write int cmp_by_age(const void *a, const void *b)

int main(void) {
    Person people[] = {{"Alice", 30}, {"Bob", 25}, {"Carol", 35}};
    qsort(people, 3, sizeof(Person), cmp_by_age);
    for (int i = 0; i < 3; i++)
        printf("%s: %d\\n", people[i].name, people[i].age);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    char name[32];
    int age;
} Person;

int cmp_by_age(const void *a, const void *b) {
    const Person *pa = (const Person *)a;
    const Person *pb = (const Person *)b;
    return pa->age - pb->age;
}

int main(void) {
    Person people[] = {{"Alice", 30}, {"Bob", 25}, {"Carol", 35}};
    qsort(people, 3, sizeof(Person), cmp_by_age);
    for (int i = 0; i < 3; i++)
        printf("%s: %d\\n", people[i].name, people[i].age);
    return 0;
}`,
      hints: [
        'Cast void pointers to const Person *.',
        'Access the age field with the arrow operator.',
        'Return pa->age - pb->age for ascending order.',
      ],
      concepts: ['qsort', 'struct sorting', 'comparator'],
    },
    {
      id: 'c-sort-15',
      title: 'Predict stable vs unstable sort',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Predict whether relative order of equal elements is preserved.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

typedef struct { int key; char label; } Item;

int cmp(const void *a, const void *b) {
    return ((const Item *)a)->key - ((const Item *)b)->key;
}

int main(void) {
    Item items[] = {{3,'A'}, {1,'B'}, {3,'C'}, {2,'D'}};
    // qsort is NOT guaranteed stable
    qsort(items, 4, sizeof(Item), cmp);
    for (int i = 0; i < 4; i++)
        printf("{%d,%c} ", items[i].key, items[i].label);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct { int key; char label; } Item;

int cmp(const void *a, const void *b) {
    return ((const Item *)a)->key - ((const Item *)b)->key;
}

int main(void) {
    Item items[] = {{3,'A'}, {1,'B'}, {3,'C'}, {2,'D'}};
    // qsort is NOT guaranteed stable
    qsort(items, 4, sizeof(Item), cmp);
    for (int i = 0; i < 4; i++)
        printf("{%d,%c} ", items[i].key, items[i].label);
    printf("\\n");
    return 0;
}
// Output: {1,B} {2,D} {3,A} {3,C} or {1,B} {2,D} {3,C} {3,A}
// (order of equal keys 3,A and 3,C is implementation-defined)`,
      hints: [
        'Sorted by key: 1, 2, 3, 3.',
        'qsort is not required to be stable by the C standard.',
        'The relative order of {3,A} and {3,C} is implementation-defined.',
      ],
      concepts: ['sort stability', 'qsort', 'implementation-defined'],
    },
    {
      id: 'c-sort-16',
      title: 'Optimized bubble sort',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Refactor bubble sort to stop early if no swaps occur in a pass.',
      skeleton: `#include <stdio.h>

void bubble_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
}

int main(void) {
    int a[] = {1, 2, 3, 5, 4};
    bubble_sort(a, 5);
    for (int i = 0; i < 5; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

void bubble_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++)
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                swapped = 1;
            }
        if (!swapped) break;
    }
}

int main(void) {
    int a[] = {1, 2, 3, 5, 4};
    bubble_sort(a, 5);
    for (int i = 0; i < 5; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'Add a swapped flag, set to 0 at the start of each pass.',
        'Set swapped = 1 whenever a swap occurs.',
        'If no swaps in a pass, the array is sorted; break early.',
      ],
      concepts: ['bubble sort', 'early termination', 'optimization'],
    },
    {
      id: 'c-sort-17',
      title: 'Fix merge sort memory leak',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Fix the memory leak in this merge sort.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    int *L = malloc(n1 * sizeof(int));
    int *R = malloc(n2 * sizeof(int));
    memcpy(L, arr + l, n1 * sizeof(int));
    memcpy(R, arr + m + 1, n2 * sizeof(int));
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2)
        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
    // BUG: missing free(L) and free(R)
}

void ms(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        ms(arr, l, m);
        ms(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

int main(void) {
    int a[] = {9, 4, 7, 2, 5};
    ms(a, 0, 4);
    for (int i = 0; i < 5; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    int *L = malloc(n1 * sizeof(int));
    int *R = malloc(n2 * sizeof(int));
    memcpy(L, arr + l, n1 * sizeof(int));
    memcpy(R, arr + m + 1, n2 * sizeof(int));
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2)
        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
    free(L);
    free(R);
}

void ms(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        ms(arr, l, m);
        ms(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

int main(void) {
    int a[] = {9, 4, 7, 2, 5};
    ms(a, 0, 4);
    for (int i = 0; i < 5; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'Every malloc must have a matching free.',
        'L and R are allocated each merge call but never freed.',
        'Add free(L); free(R); at the end of merge().',
      ],
      concepts: ['memory leak', 'malloc/free pairing', 'merge sort'],
    },
    {
      id: 'c-sort-18',
      title: 'Refactor to generic swap',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor the sort to use a generic swap function with memcpy.',
      skeleton: `#include <stdio.h>
#include <string.h>

void bubble_sort_int(int arr[], int n) {
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
}

int main(void) {
    int a[] = {5, 3, 8, 1};
    bubble_sort_int(a, 4);
    for (int i = 0; i < 4; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void generic_swap(void *a, void *b, size_t size) {
    void *tmp = malloc(size);
    memcpy(tmp, a, size);
    memcpy(a, b, size);
    memcpy(b, tmp, size);
    free(tmp);
}

void bubble_sort(void *base, int n, size_t size,
                 int (*cmp)(const void *, const void *)) {
    char *arr = (char *)base;
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (cmp(arr + j * size, arr + (j + 1) * size) > 0)
                generic_swap(arr + j * size, arr + (j + 1) * size, size);
}

int cmp_int(const void *a, const void *b) {
    return *(const int *)a - *(const int *)b;
}

int main(void) {
    int a[] = {5, 3, 8, 1};
    bubble_sort(a, 4, sizeof(int), cmp_int);
    for (int i = 0; i < 4; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'Use void* and size_t to make swap generic with memcpy.',
        'Cast base to char* for byte-level pointer arithmetic.',
        'Accept a comparator function pointer like qsort does.',
      ],
      concepts: ['generic programming', 'void pointer', 'function pointer'],
    },
    {
      id: 'c-sort-19',
      title: 'Heapsort sift-down',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Complete the sift-down operation for heapsort.',
      skeleton: `#include <stdio.h>

void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

void sift_down(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + __BLANK__;
    int right = 2 * i + __BLANK__;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != __BLANK__) {
        swap(&arr[i], &arr[largest]);
        sift_down(arr, n, largest);
    }
}

void heapsort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--) sift_down(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        swap(&arr[0], &arr[i]);
        sift_down(arr, i, 0);
    }
}

int main(void) {
    int a[] = {12, 11, 13, 5, 6, 7};
    heapsort(a, 6);
    for (int i = 0; i < 6; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

void sift_down(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        swap(&arr[i], &arr[largest]);
        sift_down(arr, n, largest);
    }
}

void heapsort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--) sift_down(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        swap(&arr[0], &arr[i]);
        sift_down(arr, i, 0);
    }
}

int main(void) {
    int a[] = {12, 11, 13, 5, 6, 7};
    heapsort(a, 6);
    for (int i = 0; i < 6; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'Left child index: 2*i + 1. Right child: 2*i + 2.',
        'Check if largest changed: largest != i means a swap is needed.',
        'After swapping, recursively sift down the affected subtree.',
      ],
      concepts: ['heapsort', 'sift down', 'binary heap'],
    },
    {
      id: 'c-sort-20',
      title: 'Sort stability wrapper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a wrapper that makes qsort stable by breaking ties with original index.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

typedef struct { int value; int orig_idx; } Indexed;

// Write int stable_cmp(const void *a, const void *b)
// Compare by value, break ties by orig_idx

// Write void stable_sort(int arr[], int n)
// Wrap arr in Indexed[], qsort, copy back

int main(void) {
    int a[] = {3, 1, 3, 2};
    stable_sort(a, 4);
    for (int i = 0; i < 4; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct { int value; int orig_idx; } Indexed;

int stable_cmp(const void *a, const void *b) {
    const Indexed *ia = (const Indexed *)a;
    const Indexed *ib = (const Indexed *)b;
    if (ia->value != ib->value) return ia->value - ib->value;
    return ia->orig_idx - ib->orig_idx;
}

void stable_sort(int arr[], int n) {
    Indexed *tmp = malloc(n * sizeof(Indexed));
    for (int i = 0; i < n; i++) {
        tmp[i].value = arr[i];
        tmp[i].orig_idx = i;
    }
    qsort(tmp, n, sizeof(Indexed), stable_cmp);
    for (int i = 0; i < n; i++) arr[i] = tmp[i].value;
    free(tmp);
}

int main(void) {
    int a[] = {3, 1, 3, 2};
    stable_sort(a, 4);
    for (int i = 0; i < 4; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'Wrap each element with its original index.',
        'In comparator, compare values first; if equal, compare orig_idx.',
        'Copy sorted values back and free the temp array.',
      ],
      concepts: ['stable sort', 'qsort wrapper', 'index preservation'],
    },
  ],
};
