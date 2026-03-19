import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-algo',
  title: '48. Algorithm Design Patterns',
  explanation: `## Algorithm Design Patterns

Algorithm design is the art of choosing the right strategy for a problem. The major paradigms are brute force, divide and conquer, dynamic programming, and greedy algorithms.

\`\`\`c
// Binary search - divide and conquer, O(log n)
int binary_search(int *arr, int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

// Merge sort - divide and conquer, O(n log n)
void merge(int *a, int l, int m, int r, int *tmp) {
    int i = l, j = m + 1, k = l;
    while (i <= m && j <= r)
        tmp[k++] = (a[i] <= a[j]) ? a[i++] : a[j++];
    while (i <= m) tmp[k++] = a[i++];
    while (j <= r) tmp[k++] = a[j++];
    for (int x = l; x <= r; x++) a[x] = tmp[x];
}

// Dynamic programming - memoization pattern
int fib_memo(int n, int *cache) {
    if (n <= 1) return n;
    if (cache[n] != -1) return cache[n];
    return cache[n] = fib_memo(n - 1, cache)
                    + fib_memo(n - 2, cache);
}

// Greedy - activity selection
int activity_select(int *start, int *finish, int n) {
    int count = 1, last = 0;
    for (int i = 1; i < n; i++) {
        if (start[i] >= finish[last]) {
            count++;
            last = i;
        }
    }
    return count;
}
\`\`\`

### Key Concepts
- **Brute Force**: try all possibilities; simple but often O(n!) or O(2^n)
- **Divide and Conquer**: split problem, solve halves, combine results (merge sort, binary search)
- **Dynamic Programming**: overlapping subproblems + optimal substructure; memoize or tabulate
- **Greedy**: make locally optimal choices; works when greedy choice property holds
- **Complexity Analysis**: Big-O notation measures worst-case growth rate
- **Stability**: a stable sort preserves relative order of equal elements
`,
  exercises: [
    {
      id: 'c-algo-1',
      title: 'Bubble sort swap logic',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete the bubble sort inner loop with the swap condition and swap logic.',
      skeleton: `void bubble_sort(int *arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] __BLANK__ arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[__BLANK__];
                arr[j + 1] = __BLANK__;
            }
        }
    }
}`,
      solution: `void bubble_sort(int *arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
}`,
      hints: [
        'Bubble sort swaps adjacent elements if they are out of order.',
        'For ascending order, swap when left element is greater than right.',
        'The temporary variable holds the original value during the swap.'
      ],
      concepts: ['bubble sort', 'swap', 'comparison', 'adjacent elements']
    },
    {
      id: 'c-algo-2',
      title: 'Binary search midpoint',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete the binary search with correct midpoint calculation and boundary updates.',
      skeleton: `int binary_search(int *arr, int n, int target) {
    int lo = 0, hi = __BLANK__;
    while (lo <= hi) {
        int mid = lo + (__BLANK__) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) lo = __BLANK__;
        else hi = mid - 1;
    }
    return -1;
}`,
      solution: `int binary_search(int *arr, int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}`,
      hints: [
        'hi starts at n - 1 (last valid index).',
        'Midpoint: lo + (hi - lo) / 2 avoids integer overflow.',
        'When target is larger, move lo to mid + 1.'
      ],
      concepts: ['binary search', 'midpoint', 'overflow prevention', 'boundary update']
    },
    {
      id: 'c-algo-3',
      title: 'Merge sort merge step',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete the merge step that combines two sorted halves.',
      skeleton: `void merge(int *a, int l, int m, int r, int *tmp) {
    int i = l, j = __BLANK__, k = l;

    while (i <= m && j <= r) {
        if (a[i] <= a[j])
            tmp[k++] = a[__BLANK__];
        else
            tmp[k++] = a[__BLANK__];
    }
    while (i <= m) tmp[k++] = a[i++];
    while (j <= r) tmp[k++] = a[j++];

    for (int x = l; x <= r; x++) a[x] = tmp[x];
}`,
      solution: `void merge(int *a, int l, int m, int r, int *tmp) {
    int i = l, j = m + 1, k = l;

    while (i <= m && j <= r) {
        if (a[i] <= a[j])
            tmp[k++] = a[i++];
        else
            tmp[k++] = a[j++];
    }
    while (i <= m) tmp[k++] = a[i++];
    while (j <= r) tmp[k++] = a[j++];

    for (int x = l; x <= r; x++) a[x] = tmp[x];
}`,
      hints: [
        'The right half starts at index m + 1.',
        'Pick the smaller element and advance that pointer.',
        'After the main loop, copy remaining elements from both halves.'
      ],
      concepts: ['merge sort', 'merge step', 'two-pointer', 'stable sort']
    },
    {
      id: 'c-algo-4',
      title: 'Quicksort partition',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete the Lomuto partition scheme for quicksort.',
      skeleton: `void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

int partition(int *arr, int lo, int hi) {
    int pivot = arr[__BLANK__];
    int i = lo - 1;

    for (int j = lo; j < hi; j++) {
        if (arr[j] __BLANK__ pivot) {
            i++;
            swap(&arr[i], &arr[__BLANK__]);
        }
    }
    swap(&arr[i + 1], &arr[hi]);
    return __BLANK__;
}`,
      solution: `void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

int partition(int *arr, int lo, int hi) {
    int pivot = arr[hi];
    int i = lo - 1;

    for (int j = lo; j < hi; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[hi]);
    return i + 1;
}`,
      hints: [
        'Lomuto partition uses the last element as pivot.',
        'Elements less than or equal to pivot go to the left partition.',
        'The pivot is placed at position i + 1 after the loop.'
      ],
      concepts: ['quicksort', 'Lomuto partition', 'pivot', 'in-place partitioning']
    },
    {
      id: 'c-algo-5',
      title: 'Insertion sort inner loop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete the insertion sort by filling in the inner loop that shifts elements.',
      skeleton: `void insertion_sort(int *arr, int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = __BLANK__;

        while (j >= 0 && arr[j] __BLANK__ key) {
            arr[j + 1] = arr[__BLANK__];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
      solution: `void insertion_sort(int *arr, int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
      hints: [
        'j starts at i - 1, scanning backward through the sorted portion.',
        'Shift elements right while they are greater than the key.',
        'After the loop, place the key at j + 1.'
      ],
      concepts: ['insertion sort', 'shifting', 'sorted subarray', 'key insertion']
    },
    {
      id: 'c-algo-6',
      title: 'Selection sort minimum finding',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete selection sort by finding the minimum element in the unsorted portion.',
      skeleton: `void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

void selection_sort(int *arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = __BLANK__;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] __BLANK__ arr[min_idx]) {
                min_idx = __BLANK__;
            }
        }
        swap(&arr[i], &arr[min_idx]);
    }
}`,
      solution: `void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

void selection_sort(int *arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        swap(&arr[i], &arr[min_idx]);
    }
}`,
      hints: [
        'Initialize min_idx to i, the start of the unsorted portion.',
        'Compare each element to the current minimum.',
        'Update min_idx to j whenever a smaller element is found.'
      ],
      concepts: ['selection sort', 'minimum finding', 'in-place sort', 'swap']
    },
    {
      id: 'c-algo-7',
      title: 'Implement merge sort',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a complete merge sort implementation that sorts an array in ascending order.',
      skeleton: `#include <stdlib.h>

// Merge two sorted halves a[l..m] and a[m+1..r] using tmp buffer
void merge(int *a, int l, int m, int r, int *tmp) {
    // provided - assume implemented correctly
    int i = l, j = m + 1, k = l;
    while (i <= m && j <= r)
        tmp[k++] = (a[i] <= a[j]) ? a[i++] : a[j++];
    while (i <= m) tmp[k++] = a[i++];
    while (j <= r) tmp[k++] = a[j++];
    for (int x = l; x <= r; x++) a[x] = tmp[x];
}

// Implement recursive merge sort
void merge_sort_helper(int *a, int l, int r, int *tmp) {
    // TODO: base case and recursive splitting
}

void merge_sort(int *arr, int n) {
    // TODO: allocate tmp, call helper, free tmp
}`,
      solution: `#include <stdlib.h>

void merge(int *a, int l, int m, int r, int *tmp) {
    int i = l, j = m + 1, k = l;
    while (i <= m && j <= r)
        tmp[k++] = (a[i] <= a[j]) ? a[i++] : a[j++];
    while (i <= m) tmp[k++] = a[i++];
    while (j <= r) tmp[k++] = a[j++];
    for (int x = l; x <= r; x++) a[x] = tmp[x];
}

void merge_sort_helper(int *a, int l, int r, int *tmp) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    merge_sort_helper(a, l, m, tmp);
    merge_sort_helper(a, m + 1, r, tmp);
    merge(a, l, m, r, tmp);
}

void merge_sort(int *arr, int n) {
    if (n <= 1) return;
    int *tmp = malloc(sizeof(int) * n);
    merge_sort_helper(arr, 0, n - 1, tmp);
    free(tmp);
}`,
      hints: [
        'Base case: if l >= r, the subarray has 0 or 1 elements.',
        'Split at midpoint m = l + (r - l) / 2, recurse on both halves.',
        'Allocate a temporary buffer once and pass it through all recursive calls.'
      ],
      concepts: ['merge sort', 'divide and conquer', 'recursion', 'O(n log n)']
    },
    {
      id: 'c-algo-8',
      title: 'Implement iterative binary search',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write an iterative binary search that returns the index of the target or -1 if not found.',
      skeleton: `// arr is sorted in ascending order. Return index of target or -1.
int binary_search(int *arr, int n, int target) {
    // TODO: implement iterative binary search
}`,
      solution: `int binary_search(int *arr, int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target)
            lo = mid + 1;
        else
            hi = mid - 1;
    }
    return -1;
}`,
      hints: [
        'Use lo and hi pointers. Loop while lo <= hi.',
        'Compute mid as lo + (hi - lo) / 2 to avoid overflow.',
        'Narrow the search range by moving lo or hi past mid.'
      ],
      concepts: ['binary search', 'iterative', 'O(log n)', 'sorted array']
    },
    {
      id: 'c-algo-9',
      title: 'Longest common subsequence (DP)',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a dynamic programming function to find the length of the longest common subsequence of two strings.',
      skeleton: `#include <string.h>

// Return the length of the longest common subsequence of s1 and s2.
// Use bottom-up DP with a 2D table.
int lcs(const char *s1, const char *s2) {
    // TODO: implement using tabulation
}`,
      solution: `#include <string.h>

int lcs(const char *s1, const char *s2) {
    int m = (int)strlen(s1);
    int n = (int)strlen(s2);
    int dp[m + 1][n + 1];

    for (int i = 0; i <= m; i++) dp[i][0] = 0;
    for (int j = 0; j <= n; j++) dp[0][j] = 0;

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i - 1] == s2[j - 1])
                dp[i][j] = dp[i - 1][j - 1] + 1;
            else
                dp[i][j] = dp[i - 1][j] > dp[i][j - 1]
                          ? dp[i - 1][j] : dp[i][j - 1];
        }
    }
    return dp[m][n];
}`,
      hints: [
        'Create a (m+1) x (n+1) table. Base cases: dp[0][j] = dp[i][0] = 0.',
        'If characters match, dp[i][j] = dp[i-1][j-1] + 1.',
        'Otherwise, dp[i][j] = max(dp[i-1][j], dp[i][j-1]).'
      ],
      concepts: ['LCS', 'dynamic programming', 'tabulation', 'string comparison']
    },
    {
      id: 'c-algo-10',
      title: '0/1 Knapsack (DP)',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a dynamic programming solution for the 0/1 knapsack problem.',
      skeleton: `// weights[i] and values[i] describe item i. capacity is max weight.
// Return the maximum total value achievable.
int knapsack(int *weights, int *values, int n, int capacity) {
    // TODO: implement using bottom-up DP
}`,
      solution: `int knapsack(int *weights, int *values, int n, int capacity) {
    int dp[n + 1][capacity + 1];

    for (int i = 0; i <= n; i++) dp[i][0] = 0;
    for (int w = 0; w <= capacity; w++) dp[0][w] = 0;

    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                int include = values[i - 1] + dp[i - 1][w - weights[i - 1]];
                int exclude = dp[i - 1][w];
                dp[i][w] = include > exclude ? include : exclude;
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][capacity];
}`,
      hints: [
        'dp[i][w] = max value using first i items with capacity w.',
        'If item i fits, choose max of including or excluding it.',
        'Items are 0-indexed but table rows are 1-indexed, so use weights[i-1].'
      ],
      concepts: ['0/1 knapsack', 'dynamic programming', 'optimization', 'tabulation']
    },
    {
      id: 'c-algo-11',
      title: 'Dijkstra shortest path',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write Dijkstra\'s algorithm for single-source shortest paths in a weighted graph (adjacency matrix).',
      skeleton: `#include <stdbool.h>
#include <limits.h>

#define INF INT_MAX

// adj[i][j] = weight of edge i->j, or INF if no edge.
// Compute shortest distances from src to all vertices.
// Store results in dist[].
void dijkstra(int adj[][100], int V, int src, int *dist) {
    // TODO: implement Dijkstra's algorithm
}`,
      solution: `#include <stdbool.h>
#include <limits.h>

#define INF INT_MAX

void dijkstra(int adj[][100], int V, int src, int *dist) {
    bool visited[100] = {false};

    for (int i = 0; i < V; i++) dist[i] = INF;
    dist[src] = 0;

    for (int count = 0; count < V; count++) {
        int u = -1;
        for (int v = 0; v < V; v++) {
            if (!visited[v] && (u == -1 || dist[v] < dist[u]))
                u = v;
        }
        if (dist[u] == INF) break;
        visited[u] = true;

        for (int v = 0; v < V; v++) {
            if (!visited[v] && adj[u][v] != INF
                && dist[u] + adj[u][v] < dist[v]) {
                dist[v] = dist[u] + adj[u][v];
            }
        }
    }
}`,
      hints: [
        'Initialize all distances to INF except dist[src] = 0.',
        'Repeatedly pick the unvisited vertex with smallest distance.',
        'Relax all edges from the picked vertex to its neighbors.'
      ],
      concepts: ['Dijkstra', 'shortest path', 'greedy', 'relaxation']
    },
    {
      id: 'c-algo-12',
      title: 'Activity selection (greedy)',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a greedy activity selection function. Activities are sorted by finish time. Return the maximum number of non-overlapping activities.',
      skeleton: `// start[i] and finish[i] define activity i.
// Activities are already sorted by finish time.
// Return the maximum number of non-overlapping activities.
int activity_selection(int *start, int *finish, int n) {
    // TODO: implement greedy selection
}`,
      solution: `int activity_selection(int *start, int *finish, int n) {
    if (n == 0) return 0;
    int count = 1;
    int last = 0;

    for (int i = 1; i < n; i++) {
        if (start[i] >= finish[last]) {
            count++;
            last = i;
        }
    }
    return count;
}`,
      hints: [
        'Always select the first activity (earliest finish time).',
        'For each subsequent activity, select it if its start >= last selected finish.',
        'Track the index of the last selected activity.'
      ],
      concepts: ['activity selection', 'greedy algorithm', 'scheduling', 'non-overlapping']
    },
    {
      id: 'c-algo-13',
      title: 'Fix off-by-one in binary search',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the binary search that has an off-by-one error causing infinite loops or missed elements.',
      skeleton: `// BUG: This binary search sometimes loops forever or misses elements
int binary_search(int *arr, int n, int target) {
    int lo = 0, hi = n;  // Bug 1: hi should be n-1
    while (lo < hi) {     // Bug 2: should be lo <= hi
        int mid = (lo + hi) / 2;  // Bug 3: potential overflow
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) lo = mid;  // Bug 4: should be mid+1
        else hi = mid;  // Bug 5: should be mid-1
    }
    return -1;
}`,
      solution: `int binary_search(int *arr, int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}`,
      hints: [
        'hi should be n - 1 (last valid index), and the loop condition is lo <= hi.',
        'Use lo + (hi - lo) / 2 instead of (lo + hi) / 2 to prevent overflow.',
        'lo must advance to mid + 1 and hi to mid - 1 to avoid infinite loops.'
      ],
      concepts: ['binary search', 'off-by-one', 'infinite loop', 'boundary errors']
    },
    {
      id: 'c-algo-14',
      title: 'Fix merge sort base case',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the merge sort that has an incorrect base case causing stack overflow.',
      skeleton: `#include <stdlib.h>

void merge(int *a, int l, int m, int r, int *tmp);

// BUG: base case is wrong, causes infinite recursion
void merge_sort_r(int *a, int l, int r, int *tmp) {
    if (l == r) return;  // Bug: misses the case where l > r
    int m = (l + r) / 2;
    merge_sort_r(a, l, m, tmp);
    merge_sort_r(a, m, r, tmp);  // Bug: should be m+1
    merge(a, l, m, r, tmp);
}

void merge_sort(int *arr, int n) {
    int *tmp = malloc(sizeof(int) * n);
    merge_sort_r(arr, 0, n, tmp);  // Bug: should be n-1
    free(tmp);
}`,
      solution: `#include <stdlib.h>

void merge(int *a, int l, int m, int r, int *tmp);

void merge_sort_r(int *a, int l, int r, int *tmp) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    merge_sort_r(a, l, m, tmp);
    merge_sort_r(a, m + 1, r, tmp);
    merge(a, l, m, r, tmp);
}

void merge_sort(int *arr, int n) {
    if (n <= 1) return;
    int *tmp = malloc(sizeof(int) * n);
    merge_sort_r(arr, 0, n - 1, tmp);
    free(tmp);
}`,
      hints: [
        'Base case should be l >= r, not l == r.',
        'The right recursive call should start at m + 1, not m.',
        'Initial call should use n - 1 as the right boundary.'
      ],
      concepts: ['merge sort', 'base case', 'infinite recursion', 'stack overflow']
    },
    {
      id: 'c-algo-15',
      title: 'Fix knapsack table indexing',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Fix the 0/1 knapsack that uses wrong indexing into the weights and values arrays.',
      skeleton: `// BUG: indexing errors cause wrong results or out-of-bounds access
int knapsack(int *weights, int *values, int n, int cap) {
    int dp[n + 1][cap + 1];
    for (int i = 0; i <= n; i++) dp[i][0] = 0;
    for (int w = 0; w <= cap; w++) dp[0][w] = 0;

    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= cap; w++) {
            if (weights[i] <= w) {  // Bug: should be weights[i-1]
                int inc = values[i] + dp[i - 1][w - weights[i]];  // Bug: values[i-1], weights[i-1]
                dp[i][w] = inc > dp[i - 1][w] ? inc : dp[i - 1][w];
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][cap];
}`,
      solution: `int knapsack(int *weights, int *values, int n, int cap) {
    int dp[n + 1][cap + 1];
    for (int i = 0; i <= n; i++) dp[i][0] = 0;
    for (int w = 0; w <= cap; w++) dp[0][w] = 0;

    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= cap; w++) {
            if (weights[i - 1] <= w) {
                int inc = values[i - 1] + dp[i - 1][w - weights[i - 1]];
                dp[i][w] = inc > dp[i - 1][w] ? inc : dp[i - 1][w];
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][cap];
}`,
      hints: [
        'The DP table is 1-indexed (row i = first i items), but arrays are 0-indexed.',
        'When row index is i, the corresponding item index is i - 1.',
        'Use weights[i-1] and values[i-1] throughout the inner loop.'
      ],
      concepts: ['knapsack', 'off-by-one', 'DP indexing', 'array bounds']
    },
    {
      id: 'c-algo-16',
      title: 'Trace bubble sort passes',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the array state after each pass of bubble sort.',
      skeleton: `#include <stdio.h>

int main(void) {
    int a[] = {5, 3, 8, 1, 2};
    int n = 5;

    for (int i = 0; i < 2; i++) {  // only 2 passes
        for (int j = 0; j < n - 1 - i; j++) {
            if (a[j] > a[j + 1]) {
                int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
            }
        }
    }

    for (int i = 0; i < n; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int a[] = {5, 3, 8, 1, 2};
    int n = 5;

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (a[j] > a[j + 1]) {
                int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
            }
        }
    }

    for (int i = 0; i < n; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}

// Output:
// 1 3 2 5 8`,
      hints: [
        'Pass 0: [5,3,8,1,2] -> 3,5 -> 5,8 -> 1,8 -> 2,8 => [3,5,1,2,8]',
        'Pass 1: [3,5,1,2,8] -> 3,5 -> 1,5 -> 2,5 => [3,1,2,5,8]',
        'Wait, recheck: pass 1 range is j < n-1-1 = 3, so compare indices 0,1,2.'
      ],
      concepts: ['bubble sort', 'tracing', 'pass behavior', 'partial sort']
    },
    {
      id: 'c-algo-17',
      title: 'Trace binary search steps',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict how many iterations binary search takes and what it returns.',
      skeleton: `#include <stdio.h>

int main(void) {
    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int n = 10, target = 23;
    int lo = 0, hi = n - 1, steps = 0;

    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        steps++;
        if (arr[mid] == target) {
            printf("Found at %d in %d steps\\n", mid, steps);
            return 0;
        }
        if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    printf("Not found in %d steps\\n", steps);
    return 0;
}`,
      solution: `#include <stdio.h>

int main(void) {
    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int n = 10, target = 23;
    int lo = 0, hi = n - 1, steps = 0;

    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        steps++;
        if (arr[mid] == target) {
            printf("Found at %d in %d steps\\n", mid, steps);
            return 0;
        }
        if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    printf("Not found in %d steps\\n", steps);
    return 0;
}

// Output:
// Found at 5 in 2 steps`,
      hints: [
        'Step 1: lo=0, hi=9, mid=4. arr[4]=16 < 23, so lo=5.',
        'Step 2: lo=5, hi=9, mid=7. arr[7]=56 > 23, so hi=6.',
        'Step 3: lo=5, hi=6, mid=5. arr[5]=23 == target. Found at index 5 in 3 steps.'
      ],
      concepts: ['binary search', 'trace', 'logarithmic steps', 'search narrowing']
    },
    {
      id: 'c-algo-18',
      title: 'Predict DP table values',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the result of computing the longest common subsequence length.',
      skeleton: `#include <stdio.h>
#include <string.h>

int main(void) {
    const char *a = "ABCB";
    const char *b = "BDCAB";
    int m = (int)strlen(a), n = (int)strlen(b);
    int dp[5][6];  // dp[m+1][n+1]

    for (int i = 0; i <= m; i++) dp[i][0] = 0;
    for (int j = 0; j <= n; j++) dp[0][j] = 0;

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (a[i-1] == b[j-1])
                dp[i][j] = dp[i-1][j-1] + 1;
            else
                dp[i][j] = dp[i-1][j] > dp[i][j-1]
                          ? dp[i-1][j] : dp[i][j-1];
        }
    }
    printf("LCS length: %d\\n", dp[m][n]);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

int main(void) {
    const char *a = "ABCB";
    const char *b = "BDCAB";
    int m = (int)strlen(a), n = (int)strlen(b);
    int dp[5][6];

    for (int i = 0; i <= m; i++) dp[i][0] = 0;
    for (int j = 0; j <= n; j++) dp[0][j] = 0;

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (a[i-1] == b[j-1])
                dp[i][j] = dp[i-1][j-1] + 1;
            else
                dp[i][j] = dp[i-1][j] > dp[i][j-1]
                          ? dp[i-1][j] : dp[i][j-1];
        }
    }
    printf("LCS length: %d\\n", dp[m][n]);
    return 0;
}

// Output:
// LCS length: 3`,
      hints: [
        'LCS of "ABCB" and "BDCAB" includes subsequences like "BCB".',
        'Fill the table row by row. Match gives diagonal + 1.',
        'The final answer is at dp[4][5] = 3.'
      ],
      concepts: ['LCS', 'DP table', 'tabulation', 'string subsequence']
    },
    {
      id: 'c-algo-19',
      title: 'Refactor recursive Fibonacci to DP',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor the exponential recursive Fibonacci into an O(n) bottom-up DP solution.',
      skeleton: `// Refactor: this naive recursive solution is O(2^n).
// Convert to O(n) bottom-up dynamic programming.
int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}`,
      solution: `int fib(int n) {
    if (n <= 1) return n;

    int prev2 = 0, prev1 = 1;
    for (int i = 2; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
      hints: [
        'Only the two most recent values are needed at each step.',
        'Use two variables instead of an entire array for O(1) space.',
        'Iterate from 2 to n, computing each value from the previous two.'
      ],
      concepts: ['Fibonacci', 'dynamic programming', 'bottom-up', 'space optimization']
    },
    {
      id: 'c-algo-20',
      title: 'Refactor linear search to binary search',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor a linear search on an unsorted array to sort first, then use binary search for O(n log n + log n) repeated lookups.',
      skeleton: `#include <stdlib.h>
#include <stdbool.h>

// Refactor: this O(n) search is called many times on the same array.
// Sort once, then use binary search for each query.
bool linear_search(int *arr, int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return true;
    }
    return false;
}

// Called repeatedly with different targets on the same array
void process_queries(int *arr, int n, int *queries, int q,
                     bool *results) {
    for (int i = 0; i < q; i++) {
        results[i] = linear_search(arr, n, queries[i]);
    }
}`,
      solution: `#include <stdlib.h>
#include <stdbool.h>

static int cmp_int(const void *a, const void *b) {
    return (*(int *)a - *(int *)b);
}

static bool binary_search(int *arr, int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return true;
        if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return false;
}

void process_queries(int *arr, int n, int *queries, int q,
                     bool *results) {
    qsort(arr, n, sizeof(int), cmp_int);
    for (int i = 0; i < q; i++) {
        results[i] = binary_search(arr, n, queries[i]);
    }
}`,
      hints: [
        'Sort the array once with qsort before processing queries.',
        'Replace linear_search with binary_search for O(log n) per query.',
        'Total cost: O(n log n) sort + O(q log n) queries vs O(q * n) before.'
      ],
      concepts: ['linear to binary search', 'sorting', 'qsort', 'query optimization']
    }
  ]
};
