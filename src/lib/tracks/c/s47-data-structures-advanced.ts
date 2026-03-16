import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-dsadv',
  title: '47. Advanced Data Structures',
  explanation: `## Advanced Data Structures

Beyond basic linked lists and binary trees, advanced data structures enable efficient solutions for complex problems.

\`\`\`c
// AVL Tree Node -- self-balancing BST
typedef struct AVLNode {
    int key;
    struct AVLNode *left, *right;
    int height;
} AVLNode;

int height(AVLNode *n) { return n ? n->height : 0; }
int balance_factor(AVLNode *n) {
    return n ? height(n->left) - height(n->right) : 0;
}

// Graph representation -- adjacency list
typedef struct Edge {
    int dest;
    int weight;
    struct Edge *next;
} Edge;

typedef struct {
    Edge **adj;   // array of adjacency lists
    int vertices;
} Graph;

// Heap (priority queue) -- array-based
typedef struct {
    int *data;
    int size;
    int capacity;
} MinHeap;

void heapify_up(MinHeap *h, int i) {
    while (i > 0 && h->data[i] < h->data[(i - 1) / 2]) {
        int tmp = h->data[i];
        h->data[i] = h->data[(i - 1) / 2];
        h->data[(i - 1) / 2] = tmp;
        i = (i - 1) / 2;
    }
}
\`\`\`

### Key Concepts
- **AVL Tree**: self-balancing BST with O(log n) operations; balance factor in [-1, 1]
- **Rotations**: left and right rotations to restore balance after insertion/deletion
- **Heap / Priority Queue**: complete binary tree stored in array; parent at (i-1)/2
- **Graph**: vertices connected by edges; represented as adjacency list or matrix
- **Trie**: prefix tree for string lookup in O(k) time (k = key length)
- **B-Tree**: balanced tree for disk-based storage with high branching factor
`,
  exercises: [
    {
      id: 'c-dsadv-1',
      title: 'AVL tree node creation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Create a new AVL tree node with the given key.',
      skeleton: `#include <stdlib.h>

typedef struct AVLNode {
    int key;
    struct AVLNode *left, *right;
    int height;
} AVLNode;

AVLNode *new_node(int key) {
    AVLNode *n = __BLANK__(sizeof(AVLNode));
    n->key = key;
    n->left = __BLANK__;
    n->right = __BLANK__;
    n->height = 1;
    return n;
}`,
      solution: `#include <stdlib.h>

typedef struct AVLNode {
    int key;
    struct AVLNode *left, *right;
    int height;
} AVLNode;

AVLNode *new_node(int key) {
    AVLNode *n = malloc(sizeof(AVLNode));
    n->key = key;
    n->left = NULL;
    n->right = NULL;
    n->height = 1;
    return n;
}`,
      hints: [
        'Use malloc to allocate memory for the new node.',
        'Initialize child pointers to NULL for a leaf node.',
        'A new leaf node has height 1.'
      ],
      concepts: ['AVL tree', 'node creation', 'malloc', 'initialization']
    },
    {
      id: 'c-dsadv-2',
      title: 'AVL balance factor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Compute the height and balance factor of an AVL node.',
      skeleton: `typedef struct AVLNode {
    int key;
    struct AVLNode *left, *right;
    int height;
} AVLNode;

int avl_height(AVLNode *n) {
    return n ? n->__BLANK__ : 0;
}

int balance_factor(AVLNode *n) {
    if (!n) return 0;
    return __BLANK__(n->left) - __BLANK__(n->right);
}`,
      solution: `typedef struct AVLNode {
    int key;
    struct AVLNode *left, *right;
    int height;
} AVLNode;

int avl_height(AVLNode *n) {
    return n ? n->height : 0;
}

int balance_factor(AVLNode *n) {
    if (!n) return 0;
    return avl_height(n->left) - avl_height(n->right);
}`,
      hints: [
        'Height of NULL node is 0.',
        'Balance factor = left height - right height.',
        'A balanced node has factor in {-1, 0, 1}.'
      ],
      concepts: ['balance factor', 'AVL tree', 'height', 'tree balance']
    },
    {
      id: 'c-dsadv-3',
      title: 'Right rotation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Implement a right rotation for AVL tree rebalancing.',
      skeleton: `typedef struct AVLNode {
    int key;
    struct AVLNode *left, *right;
    int height;
} AVLNode;

int avl_height(AVLNode *n) { return n ? n->height : 0; }
int max(int a, int b) { return a > b ? a : b; }

AVLNode *rotate_right(AVLNode *y) {
    AVLNode *x = y->__BLANK__;
    AVLNode *t2 = x->__BLANK__;

    x->right = __BLANK__;
    y->left = __BLANK__;

    y->height = max(avl_height(y->left), avl_height(y->right)) + 1;
    x->height = max(avl_height(x->left), avl_height(x->right)) + 1;

    return x;
}`,
      solution: `typedef struct AVLNode {
    int key;
    struct AVLNode *left, *right;
    int height;
} AVLNode;

int avl_height(AVLNode *n) { return n ? n->height : 0; }
int max(int a, int b) { return a > b ? a : b; }

AVLNode *rotate_right(AVLNode *y) {
    AVLNode *x = y->left;
    AVLNode *t2 = x->right;

    x->right = y;
    y->left = t2;

    y->height = max(avl_height(y->left), avl_height(y->right)) + 1;
    x->height = max(avl_height(x->left), avl_height(x->right)) + 1;

    return x;
}`,
      hints: [
        'Right rotation: y\'s left child (x) becomes the new root.',
        'x\'s right subtree becomes y\'s left subtree.',
        'Update heights bottom-up: y first, then x.'
      ],
      concepts: ['right rotation', 'AVL tree', 'rebalancing', 'tree rotation']
    },
    {
      id: 'c-dsadv-4',
      title: 'Min-heap parent and child indices',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Calculate parent and child indices in an array-based heap.',
      skeleton: `int parent(int i)      { return __BLANK__; }
int left_child(int i)  { return __BLANK__; }
int right_child(int i) { return __BLANK__; }`,
      solution: `int parent(int i)      { return (i - 1) / 2; }
int left_child(int i)  { return 2 * i + 1; }
int right_child(int i) { return 2 * i + 2; }`,
      hints: [
        'For 0-based array: parent of i is (i-1)/2.',
        'Left child of i is 2*i + 1.',
        'Right child of i is 2*i + 2.'
      ],
      concepts: ['heap', 'array representation', 'parent', 'child index']
    },
    {
      id: 'c-dsadv-5',
      title: 'Trie node structure',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Define and initialize a trie node for lowercase English letters.',
      skeleton: `#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

#define ALPHABET_SIZE 26

typedef struct TrieNode {
    struct TrieNode *children[ALPHABET_SIZE];
    __BLANK__ is_end;
} TrieNode;

TrieNode *trie_new_node(void) {
    TrieNode *node = __BLANK__(sizeof(TrieNode));
    node->is_end = false;
    __BLANK__(node->children, 0, sizeof(node->children));
    return node;
}`,
      solution: `#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

#define ALPHABET_SIZE 26

typedef struct TrieNode {
    struct TrieNode *children[ALPHABET_SIZE];
    bool is_end;
} TrieNode;

TrieNode *trie_new_node(void) {
    TrieNode *node = malloc(sizeof(TrieNode));
    node->is_end = false;
    memset(node->children, 0, sizeof(node->children));
    return node;
}`,
      hints: [
        'is_end is a boolean indicating if this node marks the end of a word.',
        'malloc allocates memory for the new trie node.',
        'memset zeroes out the children array (all NULL pointers).'
      ],
      concepts: ['trie', 'prefix tree', 'node structure', 'alphabet indexing']
    },
    {
      id: 'c-dsadv-6',
      title: 'Graph adjacency list edge',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Add an edge to a graph adjacency list.',
      skeleton: `#include <stdlib.h>

typedef struct Edge {
    int dest;
    int weight;
    struct Edge *next;
} Edge;

typedef struct {
    Edge **adj;
    int vertices;
} Graph;

void add_edge(Graph *g, int src, int dest, int weight) {
    Edge *e = __BLANK__(sizeof(Edge));
    e->dest = dest;
    e->weight = weight;
    e->next = g->adj[__BLANK__];
    g->adj[__BLANK__] = e;
}`,
      solution: `#include <stdlib.h>

typedef struct Edge {
    int dest;
    int weight;
    struct Edge *next;
} Edge;

typedef struct {
    Edge **adj;
    int vertices;
} Graph;

void add_edge(Graph *g, int src, int dest, int weight) {
    Edge *e = malloc(sizeof(Edge));
    e->dest = dest;
    e->weight = weight;
    e->next = g->adj[src];
    g->adj[src] = e;
}`,
      hints: [
        'Allocate a new Edge with malloc.',
        'Insert at the head of the adjacency list for src.',
        'The new edge points to the previous head of the list.'
      ],
      concepts: ['adjacency list', 'graph edge', 'linked list insertion']
    },
    {
      id: 'c-dsadv-7',
      title: 'Implement AVL insert',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write the AVL tree insertion function with rotations for self-balancing.',
      skeleton: `#include <stdlib.h>

typedef struct AVLNode {
    int key;
    struct AVLNode *left, *right;
    int height;
} AVLNode;

int avl_height(AVLNode *n) { return n ? n->height : 0; }
int avl_max(int a, int b) { return a > b ? a : b; }
int avl_balance(AVLNode *n) {
    return n ? avl_height(n->left) - avl_height(n->right) : 0;
}

AVLNode *avl_new(int key) {
    AVLNode *n = malloc(sizeof(AVLNode));
    n->key = key; n->left = n->right = NULL; n->height = 1;
    return n;
}

AVLNode *rotate_right(AVLNode *y);  // assume implemented
AVLNode *rotate_left(AVLNode *x);   // assume implemented

// Insert key into AVL tree rooted at node. Return new root.
AVLNode *avl_insert(AVLNode *node, int key) {
    // TODO: BST insert then rebalance
}`,
      solution: `#include <stdlib.h>

typedef struct AVLNode {
    int key;
    struct AVLNode *left, *right;
    int height;
} AVLNode;

int avl_height(AVLNode *n) { return n ? n->height : 0; }
int avl_max(int a, int b) { return a > b ? a : b; }
int avl_balance(AVLNode *n) {
    return n ? avl_height(n->left) - avl_height(n->right) : 0;
}

AVLNode *avl_new(int key) {
    AVLNode *n = malloc(sizeof(AVLNode));
    n->key = key; n->left = n->right = NULL; n->height = 1;
    return n;
}

AVLNode *rotate_right(AVLNode *y);
AVLNode *rotate_left(AVLNode *x);

AVLNode *avl_insert(AVLNode *node, int key) {
    if (!node) return avl_new(key);

    if (key < node->key)
        node->left = avl_insert(node->left, key);
    else if (key > node->key)
        node->right = avl_insert(node->right, key);
    else
        return node;

    node->height = 1 + avl_max(avl_height(node->left),
                                avl_height(node->right));
    int bal = avl_balance(node);

    // Left Left
    if (bal > 1 && key < node->left->key)
        return rotate_right(node);
    // Right Right
    if (bal < -1 && key > node->right->key)
        return rotate_left(node);
    // Left Right
    if (bal > 1 && key > node->left->key) {
        node->left = rotate_left(node->left);
        return rotate_right(node);
    }
    // Right Left
    if (bal < -1 && key < node->right->key) {
        node->right = rotate_right(node->right);
        return rotate_left(node);
    }

    return node;
}`,
      hints: [
        'First do standard BST insertion recursively.',
        'Update the height, then compute the balance factor.',
        'Four cases: LL, RR, LR, RL -- each requires specific rotations.'
      ],
      concepts: ['AVL insert', 'rotations', 'self-balancing', 'recursive insertion']
    },
    {
      id: 'c-dsadv-8',
      title: 'Implement min-heap operations',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write insert and extract-min functions for an array-based min-heap.',
      skeleton: `#include <stdlib.h>

typedef struct {
    int *data;
    int size;
    int capacity;
} MinHeap;

MinHeap *heap_create(int capacity) {
    MinHeap *h = malloc(sizeof(MinHeap));
    h->data = malloc(sizeof(int) * capacity);
    h->size = 0;
    h->capacity = capacity;
    return h;
}

// Insert a value into the heap
void heap_insert(MinHeap *h, int val) {
    // TODO: add to end, heapify up
}

// Extract (remove and return) the minimum value
int heap_extract_min(MinHeap *h) {
    // TODO: return root, move last to root, heapify down
}`,
      solution: `#include <stdlib.h>

typedef struct {
    int *data;
    int size;
    int capacity;
} MinHeap;

MinHeap *heap_create(int capacity) {
    MinHeap *h = malloc(sizeof(MinHeap));
    h->data = malloc(sizeof(int) * capacity);
    h->size = 0;
    h->capacity = capacity;
    return h;
}

static void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

void heap_insert(MinHeap *h, int val) {
    if (h->size >= h->capacity) return;
    h->data[h->size] = val;
    int i = h->size++;
    while (i > 0 && h->data[i] < h->data[(i - 1) / 2]) {
        swap(&h->data[i], &h->data[(i - 1) / 2]);
        i = (i - 1) / 2;
    }
}

int heap_extract_min(MinHeap *h) {
    if (h->size == 0) return -1;
    int min = h->data[0];
    h->data[0] = h->data[--h->size];

    int i = 0;
    while (1) {
        int smallest = i;
        int l = 2 * i + 1, r = 2 * i + 2;
        if (l < h->size && h->data[l] < h->data[smallest]) smallest = l;
        if (r < h->size && h->data[r] < h->data[smallest]) smallest = r;
        if (smallest == i) break;
        swap(&h->data[i], &h->data[smallest]);
        i = smallest;
    }
    return min;
}`,
      hints: [
        'Insert: place at end, bubble up while smaller than parent.',
        'Extract-min: save root, move last to root, sift down.',
        'Sift down: swap with smallest child until heap property holds.'
      ],
      concepts: ['min-heap', 'heapify up', 'heapify down', 'priority queue']
    },
    {
      id: 'c-dsadv-9',
      title: 'Implement trie insert and search',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write insert and search functions for a trie storing lowercase words.',
      skeleton: `#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

#define ALPHA 26

typedef struct TrieNode {
    struct TrieNode *children[ALPHA];
    bool is_end;
} TrieNode;

TrieNode *trie_create(void) {
    TrieNode *n = calloc(1, sizeof(TrieNode));
    return n;
}

// Insert a lowercase word into the trie
void trie_insert(TrieNode *root, const char *word) {
    // TODO
}

// Search for a word. Return true if it exists.
bool trie_search(TrieNode *root, const char *word) {
    // TODO
}`,
      solution: `#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

#define ALPHA 26

typedef struct TrieNode {
    struct TrieNode *children[ALPHA];
    bool is_end;
} TrieNode;

TrieNode *trie_create(void) {
    TrieNode *n = calloc(1, sizeof(TrieNode));
    return n;
}

void trie_insert(TrieNode *root, const char *word) {
    TrieNode *cur = root;
    for (int i = 0; word[i]; i++) {
        int idx = word[i] - 'a';
        if (!cur->children[idx]) {
            cur->children[idx] = trie_create();
        }
        cur = cur->children[idx];
    }
    cur->is_end = true;
}

bool trie_search(TrieNode *root, const char *word) {
    TrieNode *cur = root;
    for (int i = 0; word[i]; i++) {
        int idx = word[i] - 'a';
        if (!cur->children[idx]) return false;
        cur = cur->children[idx];
    }
    return cur->is_end;
}`,
      hints: [
        'Map each character to an index: ch - \'a\' gives 0-25.',
        'For insert, create nodes as needed while traversing.',
        'For search, return false if any node is missing; check is_end at the end.'
      ],
      concepts: ['trie', 'insert', 'search', 'prefix tree']
    },
    {
      id: 'c-dsadv-10',
      title: 'Graph BFS traversal',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a breadth-first search function for a graph represented as an adjacency list.',
      skeleton: `#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

typedef struct Edge { int dest; struct Edge *next; } Edge;
typedef struct { Edge **adj; int V; } Graph;

// BFS from source vertex. Store visited vertices in order in 'result'.
// Return the count of visited vertices.
int bfs(Graph *g, int src, int *result) {
    // TODO: implement using a queue
}`,
      solution: `#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

typedef struct Edge { int dest; struct Edge *next; } Edge;
typedef struct { Edge **adj; int V; } Graph;

int bfs(Graph *g, int src, int *result) {
    bool *visited = calloc(g->V, sizeof(bool));
    int *queue = malloc(sizeof(int) * g->V);
    int front = 0, back = 0, count = 0;

    visited[src] = true;
    queue[back++] = src;

    while (front < back) {
        int v = queue[front++];
        result[count++] = v;

        for (Edge *e = g->adj[v]; e; e = e->next) {
            if (!visited[e->dest]) {
                visited[e->dest] = true;
                queue[back++] = e->dest;
            }
        }
    }

    free(visited);
    free(queue);
    return count;
}`,
      hints: [
        'Use an array as a queue with front and back pointers.',
        'Mark vertices as visited when enqueuing, not when dequeuing.',
        'Traverse the adjacency list of each dequeued vertex.'
      ],
      concepts: ['BFS', 'graph traversal', 'queue', 'adjacency list']
    },
    {
      id: 'c-dsadv-11',
      title: 'Graph DFS traversal',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a depth-first search function for a graph.',
      skeleton: `#include <stdlib.h>
#include <stdbool.h>

typedef struct Edge { int dest; struct Edge *next; } Edge;
typedef struct { Edge **adj; int V; } Graph;

// DFS from src. Store visited vertices in order in 'result'.
// Return count of visited vertices.
// Use an iterative approach with a stack.
int dfs(Graph *g, int src, int *result) {
    // TODO: implement
}`,
      solution: `#include <stdlib.h>
#include <stdbool.h>

typedef struct Edge { int dest; struct Edge *next; } Edge;
typedef struct { Edge **adj; int V; } Graph;

int dfs(Graph *g, int src, int *result) {
    bool *visited = calloc(g->V, sizeof(bool));
    int *stack = malloc(sizeof(int) * g->V);
    int top = 0, count = 0;

    stack[top++] = src;

    while (top > 0) {
        int v = stack[--top];
        if (visited[v]) continue;
        visited[v] = true;
        result[count++] = v;

        for (Edge *e = g->adj[v]; e; e = e->next) {
            if (!visited[e->dest]) {
                stack[top++] = e->dest;
            }
        }
    }

    free(visited);
    free(stack);
    return count;
}`,
      hints: [
        'Use a stack (array with top pointer) instead of recursion.',
        'Check visited after popping, not before pushing.',
        'Push all unvisited neighbors onto the stack.'
      ],
      concepts: ['DFS', 'graph traversal', 'stack', 'iterative DFS']
    },
    {
      id: 'c-dsadv-12',
      title: 'Implement union-find',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a union-find (disjoint set) data structure with path compression and union by rank.',
      skeleton: `#include <stdlib.h>

typedef struct {
    int *parent;
    int *rank;
    int size;
} UnionFind;

UnionFind *uf_create(int n) {
    // TODO
}

int uf_find(UnionFind *uf, int x) {
    // TODO: with path compression
}

void uf_union(UnionFind *uf, int x, int y) {
    // TODO: with union by rank
}

void uf_free(UnionFind *uf) {
    // TODO
}`,
      solution: `#include <stdlib.h>

typedef struct {
    int *parent;
    int *rank;
    int size;
} UnionFind;

UnionFind *uf_create(int n) {
    UnionFind *uf = malloc(sizeof(UnionFind));
    uf->parent = malloc(sizeof(int) * n);
    uf->rank = calloc(n, sizeof(int));
    uf->size = n;
    for (int i = 0; i < n; i++) uf->parent[i] = i;
    return uf;
}

int uf_find(UnionFind *uf, int x) {
    if (uf->parent[x] != x) {
        uf->parent[x] = uf_find(uf, uf->parent[x]);
    }
    return uf->parent[x];
}

void uf_union(UnionFind *uf, int x, int y) {
    int rx = uf_find(uf, x);
    int ry = uf_find(uf, y);
    if (rx == ry) return;
    if (uf->rank[rx] < uf->rank[ry]) {
        uf->parent[rx] = ry;
    } else if (uf->rank[rx] > uf->rank[ry]) {
        uf->parent[ry] = rx;
    } else {
        uf->parent[ry] = rx;
        uf->rank[rx]++;
    }
}

void uf_free(UnionFind *uf) {
    free(uf->parent);
    free(uf->rank);
    free(uf);
}`,
      hints: [
        'Path compression: make each node point directly to the root.',
        'Union by rank: attach the shorter tree under the taller one.',
        'Initially, each element is its own parent (parent[i] = i).'
      ],
      concepts: ['union-find', 'disjoint set', 'path compression', 'union by rank']
    },
    {
      id: 'c-dsadv-13',
      title: 'Fix AVL height update',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the AVL insertion that forgets to update the node height.',
      skeleton: `#include <stdlib.h>

typedef struct AVLNode {
    int key;
    struct AVLNode *left, *right;
    int height;
} AVLNode;

int avl_h(AVLNode *n) { return n ? n->height : 0; }
int avl_max(int a, int b) { return a > b ? a : b; }

// BUG: height is never updated, so balance factor is always wrong
AVLNode *insert(AVLNode *node, int key) {
    if (!node) {
        AVLNode *n = malloc(sizeof(AVLNode));
        n->key = key; n->left = n->right = NULL; n->height = 1;
        return n;
    }
    if (key < node->key)
        node->left = insert(node->left, key);
    else if (key > node->key)
        node->right = insert(node->right, key);

    // Missing: height update and rebalancing
    return node;
}`,
      solution: `#include <stdlib.h>

typedef struct AVLNode {
    int key;
    struct AVLNode *left, *right;
    int height;
} AVLNode;

int avl_h(AVLNode *n) { return n ? n->height : 0; }
int avl_max(int a, int b) { return a > b ? a : b; }

AVLNode *rotate_right(AVLNode *y);  // assume implemented
AVLNode *rotate_left(AVLNode *x);   // assume implemented

AVLNode *insert(AVLNode *node, int key) {
    if (!node) {
        AVLNode *n = malloc(sizeof(AVLNode));
        n->key = key; n->left = n->right = NULL; n->height = 1;
        return n;
    }
    if (key < node->key)
        node->left = insert(node->left, key);
    else if (key > node->key)
        node->right = insert(node->right, key);
    else
        return node;

    node->height = 1 + avl_max(avl_h(node->left), avl_h(node->right));

    int bal = avl_h(node->left) - avl_h(node->right);
    if (bal > 1 && key < node->left->key) return rotate_right(node);
    if (bal < -1 && key > node->right->key) return rotate_left(node);
    if (bal > 1 && key > node->left->key) {
        node->left = rotate_left(node->left);
        return rotate_right(node);
    }
    if (bal < -1 && key < node->right->key) {
        node->right = rotate_right(node->right);
        return rotate_left(node);
    }

    return node;
}`,
      hints: [
        'After recursive insertion, update the current node height.',
        'Height = 1 + max(left height, right height).',
        'Then check balance factor and apply rotations if needed.'
      ],
      concepts: ['AVL height update', 'rebalancing', 'rotation', 'bug fix']
    },
    {
      id: 'c-dsadv-14',
      title: 'Fix heap extract without sift down',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the heap extract-min that replaces root but forgets to restore the heap property.',
      skeleton: `typedef struct {
    int *data;
    int size;
} MinHeap;

// BUG: After moving last element to root, heap property is broken
int extract_min(MinHeap *h) {
    if (h->size == 0) return -1;
    int min = h->data[0];
    h->data[0] = h->data[--h->size];
    // Missing: sift down
    return min;
}`,
      solution: `typedef struct {
    int *data;
    int size;
} MinHeap;

static void swap_h(int *a, int *b) { int t = *a; *a = *b; *b = t; }

int extract_min(MinHeap *h) {
    if (h->size == 0) return -1;
    int min = h->data[0];
    h->data[0] = h->data[--h->size];

    int i = 0;
    while (1) {
        int smallest = i;
        int l = 2 * i + 1, r = 2 * i + 2;
        if (l < h->size && h->data[l] < h->data[smallest]) smallest = l;
        if (r < h->size && h->data[r] < h->data[smallest]) smallest = r;
        if (smallest == i) break;
        swap_h(&h->data[i], &h->data[smallest]);
        i = smallest;
    }
    return min;
}`,
      hints: [
        'After replacing root with last element, sift down to restore order.',
        'Compare with both children; swap with the smaller one.',
        'Stop when the node is smaller than both children or is a leaf.'
      ],
      concepts: ['heap', 'sift down', 'extract-min', 'heap property']
    },
    {
      id: 'c-dsadv-15',
      title: 'Fix graph memory leak',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the graph destructor that only frees the adjacency array but not the edge nodes.',
      skeleton: `#include <stdlib.h>

typedef struct Edge { int dest; struct Edge *next; } Edge;
typedef struct { Edge **adj; int V; } Graph;

// BUG: Only frees the adj array, leaking all Edge nodes
void graph_free(Graph *g) {
    free(g->adj);  // Bug: edge lists not freed
    free(g);
}`,
      solution: `#include <stdlib.h>

typedef struct Edge { int dest; struct Edge *next; } Edge;
typedef struct { Edge **adj; int V; } Graph;

void graph_free(Graph *g) {
    for (int i = 0; i < g->V; i++) {
        Edge *e = g->adj[i];
        while (e) {
            Edge *next = e->next;
            free(e);
            e = next;
        }
    }
    free(g->adj);
    free(g);
}`,
      hints: [
        'Each adjacency list is a linked list of Edge nodes.',
        'Iterate through each list, freeing every Edge.',
        'Save e->next before freeing e.'
      ],
      concepts: ['memory leak', 'graph cleanup', 'linked list free', 'resource management']
    },
    {
      id: 'c-dsadv-16',
      title: 'Predict heap insert order',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the array state after inserting values into a min-heap.',
      skeleton: `#include <stdio.h>

void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

int main(void) {
    int heap[10];
    int size = 0;

    // Insert 5, 3, 7, 1 into min-heap
    int vals[] = {5, 3, 7, 1};
    for (int v = 0; v < 4; v++) {
        heap[size] = vals[v];
        int i = size++;
        while (i > 0 && heap[i] < heap[(i-1)/2]) {
            swap(&heap[i], &heap[(i-1)/2]);
            i = (i-1)/2;
        }
    }

    for (int i = 0; i < size; i++)
        printf("%d ", heap[i]);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

int main(void) {
    int heap[10];
    int size = 0;

    int vals[] = {5, 3, 7, 1};
    for (int v = 0; v < 4; v++) {
        heap[size] = vals[v];
        int i = size++;
        while (i > 0 && heap[i] < heap[(i-1)/2]) {
            swap(&heap[i], &heap[(i-1)/2]);
            i = (i-1)/2;
        }
    }

    for (int i = 0; i < size; i++)
        printf("%d ", heap[i]);
    printf("\\n");
    return 0;
}

// Output:
// 1 3 7 5`,
      hints: [
        'After inserting 5: [5]. After inserting 3: 3 bubbles up -> [3, 5].',
        'After inserting 7: no bubble -> [3, 5, 7].',
        'After inserting 1: bubbles all the way up -> [1, 3, 7, 5].'
      ],
      concepts: ['heap insert', 'heapify up', 'min-heap array', 'bubble up']
    },
    {
      id: 'c-dsadv-17',
      title: 'Predict trie search result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the result of searching for words and prefixes in a trie.',
      skeleton: `#include <stdlib.h>
#include <stdbool.h>
#include <string.h>
#include <stdio.h>

#define A 26
typedef struct T { struct T *ch[A]; bool end; } T;
T *mk(void) { return calloc(1, sizeof(T)); }

void ins(T *r, const char *w) {
    for (; *w; w++) {
        int i = *w - 'a';
        if (!r->ch[i]) r->ch[i] = mk();
        r = r->ch[i];
    }
    r->end = true;
}

bool find(T *r, const char *w) {
    for (; *w; w++) {
        int i = *w - 'a';
        if (!r->ch[i]) return false;
        r = r->ch[i];
    }
    return r->end;
}

int main(void) {
    T *root = mk();
    ins(root, "cat");
    ins(root, "car");

    printf("%d\\n", find(root, "cat"));
    printf("%d\\n", find(root, "ca"));
    printf("%d\\n", find(root, "car"));
    printf("%d\\n", find(root, "dog"));
    return 0;
}`,
      solution: `#include <stdlib.h>
#include <stdbool.h>
#include <string.h>
#include <stdio.h>

#define A 26
typedef struct T { struct T *ch[A]; bool end; } T;
T *mk(void) { return calloc(1, sizeof(T)); }

void ins(T *r, const char *w) {
    for (; *w; w++) {
        int i = *w - 'a';
        if (!r->ch[i]) r->ch[i] = mk();
        r = r->ch[i];
    }
    r->end = true;
}

bool find(T *r, const char *w) {
    for (; *w; w++) {
        int i = *w - 'a';
        if (!r->ch[i]) return false;
        r = r->ch[i];
    }
    return r->end;
}

int main(void) {
    T *root = mk();
    ins(root, "cat");
    ins(root, "car");

    printf("%d\\n", find(root, "cat"));
    printf("%d\\n", find(root, "ca"));
    printf("%d\\n", find(root, "car"));
    printf("%d\\n", find(root, "dog"));
    return 0;
}

// Output:
// 1
// 0
// 1
// 0`,
      hints: [
        '"cat" was inserted, so find returns true (1).',
        '"ca" is a prefix but was not inserted as a word, so end is false (0).',
        '"dog" was never inserted, so the path does not exist (0).'
      ],
      concepts: ['trie search', 'prefix vs word', 'is_end flag']
    },
    {
      id: 'c-dsadv-18',
      title: 'Predict union-find result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict connected components after a series of union operations.',
      skeleton: `#include <stdio.h>

int parent[6], rnk[6];
void init(int n) { for (int i = 0; i < n; i++) { parent[i] = i; rnk[i] = 0; } }
int find(int x) { return parent[x] == x ? x : (parent[x] = find(parent[x])); }
void unite(int x, int y) {
    int a = find(x), b = find(y);
    if (a == b) return;
    if (rnk[a] < rnk[b]) parent[a] = b;
    else if (rnk[a] > rnk[b]) parent[b] = a;
    else { parent[b] = a; rnk[a]++; }
}

int main(void) {
    init(6);
    unite(0, 1); unite(2, 3); unite(1, 3);

    printf("%d\\n", find(0) == find(3));
    printf("%d\\n", find(4) == find(5));
    printf("%d\\n", find(0) == find(4));
    return 0;
}`,
      solution: `#include <stdio.h>

int parent[6], rnk[6];
void init(int n) { for (int i = 0; i < n; i++) { parent[i] = i; rnk[i] = 0; } }
int find(int x) { return parent[x] == x ? x : (parent[x] = find(parent[x])); }
void unite(int x, int y) {
    int a = find(x), b = find(y);
    if (a == b) return;
    if (rnk[a] < rnk[b]) parent[a] = b;
    else if (rnk[a] > rnk[b]) parent[b] = a;
    else { parent[b] = a; rnk[a]++; }
}

int main(void) {
    init(6);
    unite(0, 1); unite(2, 3); unite(1, 3);

    printf("%d\\n", find(0) == find(3));
    printf("%d\\n", find(4) == find(5));
    printf("%d\\n", find(0) == find(4));
    return 0;
}

// Output:
// 1
// 0
// 0`,
      hints: [
        'unite(0,1) connects 0-1. unite(2,3) connects 2-3.',
        'unite(1,3) connects the {0,1} set with {2,3} set.',
        '4 and 5 are never united with anyone.'
      ],
      concepts: ['union-find', 'connected components', 'path compression']
    },
    {
      id: 'c-dsadv-19',
      title: 'Refactor BST to AVL tree',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor a basic BST insert to include AVL self-balancing.',
      skeleton: `#include <stdlib.h>

typedef struct Node {
    int key;
    struct Node *left, *right;
} Node;

// Refactor: this is a plain BST insert, not balanced.
// Add height tracking and AVL rotations.
Node *bst_insert(Node *root, int key) {
    if (!root) {
        Node *n = malloc(sizeof(Node));
        n->key = key;
        n->left = n->right = NULL;
        return n;
    }
    if (key < root->key)
        root->left = bst_insert(root->left, key);
    else if (key > root->key)
        root->right = bst_insert(root->right, key);
    return root;
}`,
      solution: `#include <stdlib.h>

typedef struct Node {
    int key;
    struct Node *left, *right;
    int height;
} Node;

static int ht(Node *n) { return n ? n->height : 0; }
static int mx(int a, int b) { return a > b ? a : b; }

static Node *rot_r(Node *y) {
    Node *x = y->left, *t = x->right;
    x->right = y; y->left = t;
    y->height = mx(ht(y->left), ht(y->right)) + 1;
    x->height = mx(ht(x->left), ht(x->right)) + 1;
    return x;
}

static Node *rot_l(Node *x) {
    Node *y = x->right, *t = y->left;
    y->left = x; x->right = t;
    x->height = mx(ht(x->left), ht(x->right)) + 1;
    y->height = mx(ht(y->left), ht(y->right)) + 1;
    return y;
}

Node *avl_insert(Node *root, int key) {
    if (!root) {
        Node *n = malloc(sizeof(Node));
        n->key = key; n->left = n->right = NULL; n->height = 1;
        return n;
    }
    if (key < root->key)
        root->left = avl_insert(root->left, key);
    else if (key > root->key)
        root->right = avl_insert(root->right, key);
    else return root;

    root->height = 1 + mx(ht(root->left), ht(root->right));
    int bal = ht(root->left) - ht(root->right);

    if (bal > 1 && key < root->left->key) return rot_r(root);
    if (bal < -1 && key > root->right->key) return rot_l(root);
    if (bal > 1 && key > root->left->key) {
        root->left = rot_l(root->left);
        return rot_r(root);
    }
    if (bal < -1 && key < root->right->key) {
        root->right = rot_r(root->right);
        return rot_l(root);
    }
    return root;
}`,
      hints: [
        'Add a height field to the Node struct.',
        'After insertion, update height and compute balance factor.',
        'Apply rotations based on the four imbalance cases (LL, RR, LR, RL).'
      ],
      concepts: ['BST to AVL', 'self-balancing', 'rotations', 'height tracking']
    },
    {
      id: 'c-dsadv-20',
      title: 'Refactor array-based graph to adjacency list',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor a graph stored as an edge array to an adjacency list representation.',
      skeleton: `#include <stdlib.h>
#include <stdio.h>

// Refactor: edge array is O(E) per neighbor lookup.
// Convert to adjacency list for O(degree) neighbor lookup.
typedef struct {
    int src, dest, weight;
} EdgeArray;

void print_neighbors_slow(EdgeArray *edges, int num_edges,
                          int vertex) {
    for (int i = 0; i < num_edges; i++) {
        if (edges[i].src == vertex) {
            printf("-> %d (w=%d)\\n", edges[i].dest, edges[i].weight);
        }
    }
}`,
      solution: `#include <stdlib.h>
#include <stdio.h>

typedef struct AdjNode {
    int dest;
    int weight;
    struct AdjNode *next;
} AdjNode;

typedef struct {
    AdjNode **lists;
    int V;
} AdjGraph;

AdjGraph *graph_from_edges(int V, int edges[][3], int E) {
    AdjGraph *g = malloc(sizeof(AdjGraph));
    g->V = V;
    g->lists = calloc(V, sizeof(AdjNode *));

    for (int i = 0; i < E; i++) {
        int src = edges[i][0], dest = edges[i][1], w = edges[i][2];
        AdjNode *node = malloc(sizeof(AdjNode));
        node->dest = dest;
        node->weight = w;
        node->next = g->lists[src];
        g->lists[src] = node;
    }
    return g;
}

void print_neighbors(AdjGraph *g, int vertex) {
    for (AdjNode *n = g->lists[vertex]; n; n = n->next) {
        printf("-> %d (w=%d)\\n", n->dest, n->weight);
    }
}`,
      hints: [
        'Create an array of linked lists, one per vertex.',
        'Each edge becomes a node in the source vertex list.',
        'Neighbor lookup is now O(degree) instead of O(E).'
      ],
      concepts: ['adjacency list', 'graph representation', 'edge array', 'refactoring']
    }
  ]
};
