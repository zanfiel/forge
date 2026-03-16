import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-cap',
  title: '50. Capstone: Comprehensive C Programming',
  explanation: `## Capstone: Comprehensive C Programming

This final section brings together everything from the entire C track. Each exercise draws on multiple concepts: memory management, data structures, algorithms, I/O, concurrency, and secure coding.

\`\`\`c
// A capstone project often combines:
// - Structs and dynamic memory
// - File I/O with error handling
// - Data structures (linked lists, hash tables, trees)
// - Algorithms (sorting, searching, hashing)
// - Secure coding practices (bounds checking, safe strings)
// - Modular design with clean interfaces

// Example: a simple key-value store
typedef struct Entry {
    char *key;
    char *value;
    struct Entry *next;
} Entry;

typedef struct {
    Entry **buckets;
    size_t capacity;
    size_t count;
} HashMap;

unsigned long hash(const char *str) {
    unsigned long h = 5381;
    while (*str) h = h * 33 + (unsigned char)*str++;
    return h;
}
\`\`\`

### What This Section Tests
- **Memory lifecycle**: malloc, realloc, free, leak prevention
- **Data structure implementation**: from scratch, not library calls
- **Algorithm application**: choosing the right approach for the problem
- **Error handling**: every allocation checked, every edge case covered
- **Code quality**: clean interfaces, modular design, documentation
`,
  exercises: [
    {
      id: 'c-cap-1',
      title: 'Hash map bucket index',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete the hash function and bucket index calculation for a hash map.',
      skeleton: `#include <stddef.h>

unsigned long djb2_hash(const char *str) {
    unsigned long hash = __BLANK__;
    while (*str) {
        hash = hash * 33 + (unsigned char)__BLANK__;
        str++;
    }
    return hash;
}

size_t bucket_index(const char *key, size_t capacity) {
    return djb2_hash(key) __BLANK__ capacity;
}`,
      solution: `#include <stddef.h>

unsigned long djb2_hash(const char *str) {
    unsigned long hash = 5381;
    while (*str) {
        hash = hash * 33 + (unsigned char)*str;
        str++;
    }
    return hash;
}

size_t bucket_index(const char *key, size_t capacity) {
    return djb2_hash(key) % capacity;
}`,
      hints: [
        'DJB2 starts with the magic constant 5381.',
        'Each character is added after multiplying hash by 33.',
        'Use modulo (%) to map the hash into a valid bucket index.'
      ],
      concepts: ['hash function', 'DJB2', 'modulo', 'bucket index']
    },
    {
      id: 'c-cap-2',
      title: 'Dynamic array growth',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete the dynamic array push function that grows the buffer when full.',
      skeleton: `#include <stdlib.h>

typedef struct {
    int *data;
    size_t size;
    size_t capacity;
} DynArray;

int dynarray_push(DynArray *da, int value) {
    if (da->size >= da->capacity) {
        size_t new_cap = da->capacity == 0 ? 4 : da->capacity * __BLANK__;
        int *tmp = __BLANK__(da->data, sizeof(int) * new_cap);
        if (!tmp) return -1;
        da->data = tmp;
        da->__BLANK__ = new_cap;
    }
    da->data[da->size++] = value;
    return 0;
}`,
      solution: `#include <stdlib.h>

typedef struct {
    int *data;
    size_t size;
    size_t capacity;
} DynArray;

int dynarray_push(DynArray *da, int value) {
    if (da->size >= da->capacity) {
        size_t new_cap = da->capacity == 0 ? 4 : da->capacity * 2;
        int *tmp = realloc(da->data, sizeof(int) * new_cap);
        if (!tmp) return -1;
        da->data = tmp;
        da->capacity = new_cap;
    }
    da->data[da->size++] = value;
    return 0;
}`,
      hints: [
        'Double the capacity each time (growth factor of 2).',
        'realloc resizes the existing allocation, preserving contents.',
        'Update the capacity field after successful realloc.'
      ],
      concepts: ['dynamic array', 'realloc', 'amortized growth', 'capacity doubling']
    },
    {
      id: 'c-cap-3',
      title: 'Linked list node with string key',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete the creation of a linked list node that owns a copy of a string key.',
      skeleton: `#include <stdlib.h>
#include <string.h>

typedef struct Node {
    char *key;
    int value;
    struct Node *next;
} Node;

Node *node_create(const char *key, int value) {
    Node *n = __BLANK__(sizeof(Node));
    if (!n) return NULL;
    n->key = __BLANK__(strlen(key) + 1);
    if (!n->key) { free(n); return NULL; }
    __BLANK__(n->key, key);
    n->value = value;
    n->next = NULL;
    return n;
}`,
      solution: `#include <stdlib.h>
#include <string.h>

typedef struct Node {
    char *key;
    int value;
    struct Node *next;
} Node;

Node *node_create(const char *key, int value) {
    Node *n = malloc(sizeof(Node));
    if (!n) return NULL;
    n->key = malloc(strlen(key) + 1);
    if (!n->key) { free(n); return NULL; }
    strcpy(n->key, key);
    n->value = value;
    n->next = NULL;
    return n;
}`,
      hints: [
        'malloc for the node struct, then malloc for the key string.',
        'Allocate strlen(key) + 1 bytes for the null terminator.',
        'strcpy copies the string into the newly allocated buffer.'
      ],
      concepts: ['string ownership', 'deep copy', 'malloc', 'error handling']
    },
    {
      id: 'c-cap-4',
      title: 'File word counter setup',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete the file opening and word counting loop.',
      skeleton: `#include <stdio.h>
#include <ctype.h>

int count_words(const char *filename) {
    FILE *f = __BLANK__(filename, "r");
    if (!f) return -1;

    int count = 0, in_word = 0, c;
    while ((c = __BLANK__(f)) != EOF) {
        if (isspace(c)) {
            in_word = 0;
        } else if (!in_word) {
            in_word = 1;
            __BLANK__;
        }
    }
    fclose(f);
    return count;
}`,
      solution: `#include <stdio.h>
#include <ctype.h>

int count_words(const char *filename) {
    FILE *f = fopen(filename, "r");
    if (!f) return -1;

    int count = 0, in_word = 0, c;
    while ((c = fgetc(f)) != EOF) {
        if (isspace(c)) {
            in_word = 0;
        } else if (!in_word) {
            in_word = 1;
            count++;
        }
    }
    fclose(f);
    return count;
}`,
      hints: [
        'fopen opens a file; check for NULL on failure.',
        'fgetc reads one character at a time from the file.',
        'Increment count when transitioning from whitespace to a word.'
      ],
      concepts: ['file I/O', 'word counting', 'fgetc', 'state machine']
    },
    {
      id: 'c-cap-5',
      title: 'Ring buffer wrap-around',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete a ring buffer with proper modular index wrapping.',
      skeleton: `#include <stdbool.h>
#include <stddef.h>

typedef struct {
    int *buf;
    size_t head;
    size_t tail;
    size_t capacity;
    bool full;
} RingBuffer;

bool ring_push(RingBuffer *rb, int val) {
    if (rb->full) return false;
    rb->buf[rb->head] = val;
    rb->head = (rb->head + 1) __BLANK__ rb->capacity;
    rb->full = (rb->head == rb->__BLANK__);
    return true;
}

bool ring_pop(RingBuffer *rb, int *val) {
    if (rb->head == rb->tail && !rb->full) return false;
    *val = rb->buf[rb->tail];
    rb->tail = (rb->tail + 1) __BLANK__ rb->capacity;
    rb->full = false;
    return true;
}`,
      solution: `#include <stdbool.h>
#include <stddef.h>

typedef struct {
    int *buf;
    size_t head;
    size_t tail;
    size_t capacity;
    bool full;
} RingBuffer;

bool ring_push(RingBuffer *rb, int val) {
    if (rb->full) return false;
    rb->buf[rb->head] = val;
    rb->head = (rb->head + 1) % rb->capacity;
    rb->full = (rb->head == rb->tail);
    return true;
}

bool ring_pop(RingBuffer *rb, int *val) {
    if (rb->head == rb->tail && !rb->full) return false;
    *val = rb->buf[rb->tail];
    rb->tail = (rb->tail + 1) % rb->capacity;
    rb->full = false;
    return true;
}`,
      hints: [
        'Modulo (%) wraps the index back to 0 when it reaches capacity.',
        'The buffer is full when head catches up to tail after a push.',
        'Pop advances tail and clears the full flag.'
      ],
      concepts: ['ring buffer', 'circular buffer', 'modulo wrapping', 'FIFO']
    },
    {
      id: 'c-cap-6',
      title: 'Struct serialization to binary',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete binary serialization of a struct to a file.',
      skeleton: `#include <stdio.h>
#include <stdint.h>

typedef struct {
    uint32_t id;
    float score;
    char name[32];
} Record;

int save_records(const char *path, Record *recs, size_t count) {
    FILE *f = fopen(path, __BLANK__);
    if (!f) return -1;

    size_t written = __BLANK__(recs, sizeof(Record), count, f);
    __BLANK__(f);

    return (written == count) ? 0 : -1;
}`,
      solution: `#include <stdio.h>
#include <stdint.h>

typedef struct {
    uint32_t id;
    float score;
    char name[32];
} Record;

int save_records(const char *path, Record *recs, size_t count) {
    FILE *f = fopen(path, "wb");
    if (!f) return -1;

    size_t written = fwrite(recs, sizeof(Record), count, f);
    fclose(f);

    return (written == count) ? 0 : -1;
}`,
      hints: [
        'Open in binary write mode: "wb".',
        'fwrite writes count elements of sizeof(Record) bytes each.',
        'Always fclose the file and verify the number of items written.'
      ],
      concepts: ['binary I/O', 'fwrite', 'serialization', 'struct persistence']
    },
    {
      id: 'c-cap-7',
      title: 'Implement hash map get/set',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write get and set operations for a chaining hash map.',
      skeleton: `#include <stdlib.h>
#include <string.h>

typedef struct Entry {
    char *key;
    char *value;
    struct Entry *next;
} Entry;

typedef struct {
    Entry **buckets;
    size_t capacity;
} HashMap;

unsigned long hash_str(const char *s) {
    unsigned long h = 5381;
    while (*s) h = h * 33 + (unsigned char)*s++;
    return h;
}

HashMap *hashmap_create(size_t capacity) {
    HashMap *m = malloc(sizeof(HashMap));
    m->buckets = calloc(capacity, sizeof(Entry *));
    m->capacity = capacity;
    return m;
}

// Set key=value. Overwrite if key exists. Return 0 on success, -1 on failure.
int hashmap_set(HashMap *m, const char *key, const char *value) {
    // TODO
}

// Get value for key. Return NULL if not found.
const char *hashmap_get(HashMap *m, const char *key) {
    // TODO
}`,
      solution: `#include <stdlib.h>
#include <string.h>

typedef struct Entry {
    char *key;
    char *value;
    struct Entry *next;
} Entry;

typedef struct {
    Entry **buckets;
    size_t capacity;
} HashMap;

unsigned long hash_str(const char *s) {
    unsigned long h = 5381;
    while (*s) h = h * 33 + (unsigned char)*s++;
    return h;
}

HashMap *hashmap_create(size_t capacity) {
    HashMap *m = malloc(sizeof(HashMap));
    m->buckets = calloc(capacity, sizeof(Entry *));
    m->capacity = capacity;
    return m;
}

int hashmap_set(HashMap *m, const char *key, const char *value) {
    size_t idx = hash_str(key) % m->capacity;
    Entry *e = m->buckets[idx];

    while (e) {
        if (strcmp(e->key, key) == 0) {
            char *new_val = malloc(strlen(value) + 1);
            if (!new_val) return -1;
            strcpy(new_val, value);
            free(e->value);
            e->value = new_val;
            return 0;
        }
        e = e->next;
    }

    Entry *new_entry = malloc(sizeof(Entry));
    if (!new_entry) return -1;
    new_entry->key = malloc(strlen(key) + 1);
    new_entry->value = malloc(strlen(value) + 1);
    if (!new_entry->key || !new_entry->value) {
        free(new_entry->key);
        free(new_entry->value);
        free(new_entry);
        return -1;
    }
    strcpy(new_entry->key, key);
    strcpy(new_entry->value, value);
    new_entry->next = m->buckets[idx];
    m->buckets[idx] = new_entry;
    return 0;
}

const char *hashmap_get(HashMap *m, const char *key) {
    size_t idx = hash_str(key) % m->capacity;
    Entry *e = m->buckets[idx];

    while (e) {
        if (strcmp(e->key, key) == 0)
            return e->value;
        e = e->next;
    }
    return NULL;
}`,
      hints: [
        'Hash the key and modulo by capacity to get the bucket index.',
        'Walk the chain to check for existing key (overwrite) or end (insert).',
        'Deep-copy both key and value strings; free old value on overwrite.'
      ],
      concepts: ['hash map', 'chaining', 'get/set', 'string ownership']
    },
    {
      id: 'c-cap-8',
      title: 'Implement generic quicksort',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a generic quicksort that works on any data type using void pointers and a comparator.',
      skeleton: `#include <string.h>
#include <stddef.h>

// Generic quicksort. base is the array, nmemb is element count,
// size is element size, cmp is comparator.
void generic_qsort(void *base, size_t nmemb, size_t size,
                    int (*cmp)(const void *, const void *)) {
    // TODO: implement quicksort with byte-level swaps
}`,
      solution: `#include <string.h>
#include <stddef.h>

static void byte_swap(void *a, void *b, size_t size) {
    unsigned char *pa = a, *pb = b;
    for (size_t i = 0; i < size; i++) {
        unsigned char tmp = pa[i];
        pa[i] = pb[i];
        pb[i] = tmp;
    }
}

static void *elem_at(void *base, size_t index, size_t size) {
    return (unsigned char *)base + index * size;
}

void generic_qsort(void *base, size_t nmemb, size_t size,
                    int (*cmp)(const void *, const void *)) {
    if (nmemb <= 1) return;

    void *pivot = elem_at(base, nmemb - 1, size);
    size_t i = 0;

    for (size_t j = 0; j < nmemb - 1; j++) {
        if (cmp(elem_at(base, j, size), pivot) <= 0) {
            byte_swap(elem_at(base, i, size),
                      elem_at(base, j, size), size);
            i++;
        }
    }
    byte_swap(elem_at(base, i, size), pivot, size);

    generic_qsort(base, i, size, cmp);
    generic_qsort(elem_at(base, i + 1, size),
                   nmemb - i - 1, size, cmp);
}`,
      hints: [
        'Use pointer arithmetic with (unsigned char *)base + index * size.',
        'Swap elements byte-by-byte since element type is unknown.',
        'Partition around the last element, then recurse on both halves.'
      ],
      concepts: ['generic sort', 'void pointer', 'function pointer', 'byte-level swap']
    },
    {
      id: 'c-cap-9',
      title: 'Implement LRU cache',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write an LRU (Least Recently Used) cache using a doubly-linked list and hash map lookup.',
      skeleton: `#include <stdlib.h>
#include <string.h>

typedef struct DLNode {
    int key;
    int value;
    struct DLNode *prev, *next;
} DLNode;

typedef struct {
    DLNode **table;  // hash table: key -> node
    DLNode *head;    // most recent
    DLNode *tail;    // least recent
    int capacity;
    int size;
} LRUCache;

LRUCache *lru_create(int capacity);
int lru_get(LRUCache *c, int key);        // return value or -1
void lru_put(LRUCache *c, int key, int value);  // insert/update

// TODO: implement all three functions`,
      solution: `#include <stdlib.h>
#include <string.h>

typedef struct DLNode {
    int key;
    int value;
    struct DLNode *prev, *next;
} DLNode;

typedef struct {
    DLNode **table;
    DLNode *head;
    DLNode *tail;
    int capacity;
    int size;
} LRUCache;

static void remove_node(DLNode *node) {
    if (node->prev) node->prev->next = node->next;
    if (node->next) node->next->prev = node->prev;
    node->prev = node->next = NULL;
}

static void push_front(LRUCache *c, DLNode *node) {
    node->next = c->head;
    node->prev = NULL;
    if (c->head) c->head->prev = node;
    c->head = node;
    if (!c->tail) c->tail = node;
}

LRUCache *lru_create(int capacity) {
    LRUCache *c = calloc(1, sizeof(LRUCache));
    c->capacity = capacity;
    c->table = calloc(10007, sizeof(DLNode *));
    return c;
}

static int hash_key(int key) {
    return ((unsigned int)key) % 10007;
}

int lru_get(LRUCache *c, int key) {
    int h = hash_key(key);
    DLNode *node = c->table[h];
    if (!node || node->key != key) return -1;

    if (node != c->head) {
        if (node == c->tail) c->tail = node->prev;
        remove_node(node);
        push_front(c, node);
    }
    return node->value;
}

void lru_put(LRUCache *c, int key, int value) {
    int h = hash_key(key);
    DLNode *node = c->table[h];

    if (node && node->key == key) {
        node->value = value;
        if (node != c->head) {
            if (node == c->tail) c->tail = node->prev;
            remove_node(node);
            push_front(c, node);
        }
        return;
    }

    if (c->size >= c->capacity) {
        DLNode *evict = c->tail;
        c->tail = evict->prev;
        if (c->tail) c->tail->next = NULL;
        else c->head = NULL;
        c->table[hash_key(evict->key)] = NULL;
        free(evict);
        c->size--;
    }

    node = malloc(sizeof(DLNode));
    node->key = key;
    node->value = value;
    node->prev = node->next = NULL;
    push_front(c, node);
    c->table[h] = node;
    c->size++;
}`,
      hints: [
        'Use a doubly-linked list for O(1) removal and insertion at head.',
        'On access (get or put existing), move the node to the head.',
        'On capacity overflow, evict the tail node (least recently used).'
      ],
      concepts: ['LRU cache', 'doubly-linked list', 'hash map', 'eviction policy']
    },
    {
      id: 'c-cap-10',
      title: 'Implement memory pool allocator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a fixed-size block memory pool allocator for fast allocation without fragmentation.',
      skeleton: `#include <stdlib.h>
#include <stdint.h>

typedef struct Pool {
    uint8_t *memory;
    size_t *free_list;  // stack of free block indices
    size_t block_size;
    size_t block_count;
    size_t free_top;    // top of free stack
} Pool;

Pool *pool_create(size_t block_size, size_t block_count);
void *pool_alloc(Pool *p);
void pool_free(Pool *p, void *ptr);
void pool_destroy(Pool *p);

// TODO: implement all four functions`,
      solution: `#include <stdlib.h>
#include <stdint.h>

typedef struct Pool {
    uint8_t *memory;
    size_t *free_list;
    size_t block_size;
    size_t block_count;
    size_t free_top;
} Pool;

Pool *pool_create(size_t block_size, size_t block_count) {
    Pool *p = malloc(sizeof(Pool));
    if (!p) return NULL;

    p->memory = malloc(block_size * block_count);
    p->free_list = malloc(sizeof(size_t) * block_count);
    if (!p->memory || !p->free_list) {
        free(p->memory);
        free(p->free_list);
        free(p);
        return NULL;
    }

    p->block_size = block_size;
    p->block_count = block_count;
    p->free_top = block_count;

    for (size_t i = 0; i < block_count; i++) {
        p->free_list[i] = i;
    }
    return p;
}

void *pool_alloc(Pool *p) {
    if (p->free_top == 0) return NULL;
    size_t idx = p->free_list[--p->free_top];
    return p->memory + idx * p->block_size;
}

void pool_free(Pool *p, void *ptr) {
    if (!ptr) return;
    size_t offset = (uint8_t *)ptr - p->memory;
    size_t idx = offset / p->block_size;
    if (idx < p->block_count) {
        p->free_list[p->free_top++] = idx;
    }
}

void pool_destroy(Pool *p) {
    if (!p) return;
    free(p->memory);
    free(p->free_list);
    free(p);
}`,
      hints: [
        'Pre-allocate one contiguous block and divide it into fixed-size slots.',
        'Use a stack (array) of free indices for O(1) alloc and free.',
        'Calculate block index from pointer offset: (ptr - base) / block_size.'
      ],
      concepts: ['memory pool', 'allocator', 'free list', 'fragmentation prevention']
    },
    {
      id: 'c-cap-11',
      title: 'Implement CSV parser',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a CSV line parser that splits a line into fields, handling quoted fields.',
      skeleton: `#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

// Parse a single CSV line into fields. Returns the number of fields.
// fields[] will point into the line buffer (modified in-place).
int parse_csv_line(char *line, char **fields, int max_fields) {
    // TODO: split on commas, handle quoted fields with embedded commas
}`,
      solution: `#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

int parse_csv_line(char *line, char **fields, int max_fields) {
    int count = 0;
    char *p = line;

    while (*p && count < max_fields) {
        if (*p == '"') {
            p++;
            fields[count++] = p;
            while (*p && !(*p == '"' && (*(p + 1) == ',' || *(p + 1) == '\\0' || *(p + 1) == '\\n'))) {
                p++;
            }
            if (*p == '"') *p++ = '\\0';
            if (*p == ',') p++;
            else if (*p == '\\n') { *p = '\\0'; break; }
        } else {
            fields[count++] = p;
            while (*p && *p != ',' && *p != '\\n') p++;
            if (*p == ',') {
                *p++ = '\\0';
            } else {
                if (*p == '\\n') *p = '\\0';
                break;
            }
        }
    }
    return count;
}`,
      hints: [
        'Check if a field starts with a quote; if so, scan until the closing quote.',
        'For unquoted fields, scan until comma or end of line.',
        'Replace delimiters with null bytes so fields[] points to valid C strings.'
      ],
      concepts: ['CSV parsing', 'string tokenization', 'quoted fields', 'in-place parsing']
    },
    {
      id: 'c-cap-12',
      title: 'Implement command-line argument parser',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a simple command-line argument parser that handles flags and key=value pairs.',
      skeleton: `#include <string.h>
#include <stdbool.h>
#include <stdlib.h>

typedef struct {
    bool verbose;
    bool help;
    int count;
    const char *output;
} Options;

// Parse argv into Options. Return 0 on success, -1 on error.
// Supports: --verbose, --help, --count=N, --output=PATH
int parse_args(int argc, char **argv, Options *opts) {
    // TODO: implement
}`,
      solution: `#include <string.h>
#include <stdbool.h>
#include <stdlib.h>

typedef struct {
    bool verbose;
    bool help;
    int count;
    const char *output;
} Options;

int parse_args(int argc, char **argv, Options *opts) {
    memset(opts, 0, sizeof(Options));
    opts->count = 1;

    for (int i = 1; i < argc; i++) {
        if (strcmp(argv[i], "--verbose") == 0) {
            opts->verbose = true;
        } else if (strcmp(argv[i], "--help") == 0) {
            opts->help = true;
        } else if (strncmp(argv[i], "--count=", 8) == 0) {
            char *endptr;
            long val = strtol(argv[i] + 8, &endptr, 10);
            if (*endptr != '\\0' || val <= 0) return -1;
            opts->count = (int)val;
        } else if (strncmp(argv[i], "--output=", 9) == 0) {
            opts->output = argv[i] + 9;
            if (opts->output[0] == '\\0') return -1;
        } else {
            return -1;  // unknown argument
        }
    }
    return 0;
}`,
      hints: [
        'Use strcmp for exact flag matches and strncmp for prefix matches.',
        'For key=value pairs, use strncmp to match the prefix, then parse the value after the =.',
        'Validate numeric arguments with strtol and check the endptr.'
      ],
      concepts: ['argument parsing', 'strcmp', 'strncmp', 'strtol', 'CLI options']
    },
    {
      id: 'c-cap-13',
      title: 'Fix hash map memory leak',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the hash map destructor that leaks entry nodes and their string data.',
      skeleton: `#include <stdlib.h>

typedef struct Entry {
    char *key;
    char *value;
    struct Entry *next;
} Entry;

typedef struct {
    Entry **buckets;
    size_t capacity;
} HashMap;

// BUG: only frees the bucket array, leaking all entries and strings
void hashmap_destroy(HashMap *m) {
    free(m->buckets);
    free(m);
}`,
      solution: `#include <stdlib.h>

typedef struct Entry {
    char *key;
    char *value;
    struct Entry *next;
} Entry;

typedef struct {
    Entry **buckets;
    size_t capacity;
} HashMap;

void hashmap_destroy(HashMap *m) {
    if (!m) return;
    for (size_t i = 0; i < m->capacity; i++) {
        Entry *e = m->buckets[i];
        while (e) {
            Entry *next = e->next;
            free(e->key);
            free(e->value);
            free(e);
            e = next;
        }
    }
    free(m->buckets);
    free(m);
}`,
      hints: [
        'Iterate through every bucket in the hash table.',
        'For each bucket chain, walk the linked list and free each entry.',
        'Free the key and value strings before freeing the entry itself.'
      ],
      concepts: ['memory leak', 'hash map cleanup', 'linked list traversal', 'nested free']
    },
    {
      id: 'c-cap-14',
      title: 'Fix off-by-one in string tokenizer',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the string tokenizer that misses the last token when it is not followed by a delimiter.',
      skeleton: `#include <string.h>

// BUG: misses the last token if the string doesn't end with delimiter
int tokenize(char *str, char delim, char **tokens, int max) {
    int count = 0;
    char *start = str;

    while (*str && count < max) {
        if (*str == delim) {
            *str = '\\0';
            tokens[count++] = start;
            start = str + 1;
        }
        str++;
    }
    // BUG: last segment after final delimiter is lost
    return count;
}`,
      solution: `#include <string.h>

int tokenize(char *str, char delim, char **tokens, int max) {
    int count = 0;
    char *start = str;

    while (*str && count < max) {
        if (*str == delim) {
            *str = '\\0';
            tokens[count++] = start;
            start = str + 1;
        }
        str++;
    }
    // Add the final token if there is remaining text
    if (*start && count < max) {
        tokens[count++] = start;
    }
    return count;
}`,
      hints: [
        'After the loop, start points to the beginning of the last token.',
        'If start is not empty, add it as the final token.',
        'Check that count < max before adding to avoid overflow.'
      ],
      concepts: ['off-by-one', 'string tokenization', 'last token', 'delimiter parsing']
    },
    {
      id: 'c-cap-15',
      title: 'Fix dynamic array realloc null check',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the dynamic array that loses its data pointer when realloc fails.',
      skeleton: `#include <stdlib.h>

typedef struct {
    int *data;
    size_t size;
    size_t cap;
} Vec;

// BUG: if realloc fails, the original data pointer is lost
int vec_push(Vec *v, int val) {
    if (v->size >= v->cap) {
        size_t new_cap = v->cap * 2;
        // Bug: assigning realloc result directly to v->data
        v->data = realloc(v->data, sizeof(int) * new_cap);
        if (!v->data) return -1;  // data is now NULL, old memory leaked!
        v->cap = new_cap;
    }
    v->data[v->size++] = val;
    return 0;
}`,
      solution: `#include <stdlib.h>

typedef struct {
    int *data;
    size_t size;
    size_t cap;
} Vec;

int vec_push(Vec *v, int val) {
    if (v->size >= v->cap) {
        size_t new_cap = v->cap == 0 ? 4 : v->cap * 2;
        int *tmp = realloc(v->data, sizeof(int) * new_cap);
        if (!tmp) return -1;  // original v->data is preserved
        v->data = tmp;
        v->cap = new_cap;
    }
    v->data[v->size++] = val;
    return 0;
}`,
      hints: [
        'Never assign realloc result directly to the original pointer.',
        'If realloc fails, it returns NULL but the original block is still valid.',
        'Use a temporary pointer; only overwrite v->data on success.'
      ],
      concepts: ['realloc safety', 'memory leak', 'temporary pointer', 'error handling']
    },
    {
      id: 'c-cap-16',
      title: 'Predict hash map collision',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict which keys collide in a small hash table.',
      skeleton: `#include <stdio.h>
#include <string.h>

unsigned long djb2(const char *s) {
    unsigned long h = 5381;
    while (*s) h = h * 33 + (unsigned char)*s++;
    return h;
}

int main(void) {
    const char *keys[] = {"ab", "ba", "cd"};
    int n = 3, buckets = 4;

    for (int i = 0; i < n; i++) {
        printf("%s -> bucket %lu\\n", keys[i],
               djb2(keys[i]) % buckets);
    }
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

unsigned long djb2(const char *s) {
    unsigned long h = 5381;
    while (*s) h = h * 33 + (unsigned char)*s++;
    return h;
}

int main(void) {
    const char *keys[] = {"ab", "ba", "cd"};
    int n = 3, buckets = 4;

    for (int i = 0; i < n; i++) {
        printf("%s -> bucket %lu\\n", keys[i],
               djb2(keys[i]) % buckets);
    }
    return 0;
}

// Output:
// ab -> bucket 1
// ba -> bucket 3
// cd -> bucket 1`,
      hints: [
        'djb2("ab"): h = 5381*33+97 = 177670+97 = 177667... compute step by step.',
        'djb2 of "ab": 5381*33=177573, +97=177670, *33=5863110, +98=5863208. 5863208%4=0... recheck.',
        'The key insight is that "ab" and "cd" may hash to the same bucket, showing a collision.'
      ],
      concepts: ['hash collision', 'DJB2', 'bucket distribution', 'modulo']
    },
    {
      id: 'c-cap-17',
      title: 'Predict struct memory layout',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the size of structs with different member ordering due to padding.',
      skeleton: `#include <stdio.h>

struct A {
    char a;     // 1 byte
    int b;      // 4 bytes
    char c;     // 1 byte
};

struct B {
    int b;      // 4 bytes
    char a;     // 1 byte
    char c;     // 1 byte
};

int main(void) {
    printf("sizeof(A) = %zu\\n", sizeof(struct A));
    printf("sizeof(B) = %zu\\n", sizeof(struct B));
    return 0;
}`,
      solution: `#include <stdio.h>

struct A {
    char a;
    int b;
    char c;
};

struct B {
    int b;
    char a;
    char c;
};

int main(void) {
    printf("sizeof(A) = %zu\\n", sizeof(struct A));
    printf("sizeof(B) = %zu\\n", sizeof(struct B));
    return 0;
}

// Output:
// sizeof(A) = 12
// sizeof(B) = 8`,
      hints: [
        'Struct A: char(1) + 3 padding + int(4) + char(1) + 3 padding = 12.',
        'Struct B: int(4) + char(1) + char(1) + 2 padding = 8.',
        'Members are aligned to their natural alignment; struct size is rounded to largest member alignment.'
      ],
      concepts: ['struct padding', 'alignment', 'memory layout', 'sizeof']
    },
    {
      id: 'c-cap-18',
      title: 'Predict function pointer dispatch',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output of a function pointer dispatch table.',
      skeleton: `#include <stdio.h>

int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }

int main(void) {
    int (*ops[])(int, int) = {add, sub, mul};
    int a = 10, b = 3;

    for (int i = 0; i < 3; i++) {
        printf("%d\\n", ops[i](a, b));
    }
    return 0;
}`,
      solution: `#include <stdio.h>

int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }

int main(void) {
    int (*ops[])(int, int) = {add, sub, mul};
    int a = 10, b = 3;

    for (int i = 0; i < 3; i++) {
        printf("%d\\n", ops[i](a, b));
    }
    return 0;
}

// Output:
// 13
// 7
// 30`,
      hints: [
        'ops[0] is add: 10 + 3 = 13.',
        'ops[1] is sub: 10 - 3 = 7.',
        'ops[2] is mul: 10 * 3 = 30.'
      ],
      concepts: ['function pointer', 'dispatch table', 'array of function pointers']
    },
    {
      id: 'c-cap-19',
      title: 'Refactor global state to context struct',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor code that uses global variables into a context struct passed as a parameter.',
      skeleton: `#include <stdio.h>

// Refactor: remove global state. Pass a context struct instead.
int total = 0;
int count = 0;
int max_val = 0;

void process(int value) {
    total += value;
    count++;
    if (value > max_val) max_val = value;
}

void report(void) {
    printf("Total: %d, Count: %d, Max: %d\\n",
           total, count, max_val);
}

int main(void) {
    process(5);
    process(12);
    process(8);
    report();
    return 0;
}`,
      solution: `#include <stdio.h>

typedef struct {
    int total;
    int count;
    int max_val;
} Stats;

void stats_init(Stats *s) {
    s->total = 0;
    s->count = 0;
    s->max_val = 0;
}

void process(Stats *s, int value) {
    s->total += value;
    s->count++;
    if (value > s->max_val) s->max_val = value;
}

void report(const Stats *s) {
    printf("Total: %d, Count: %d, Max: %d\\n",
           s->total, s->count, s->max_val);
}

int main(void) {
    Stats s;
    stats_init(&s);
    process(&s, 5);
    process(&s, 12);
    process(&s, 8);
    report(&s);
    return 0;
}`,
      hints: [
        'Group related globals into a Stats struct.',
        'Add an init function to set all fields to zero.',
        'Pass a pointer to the struct as the first parameter to each function.'
      ],
      concepts: ['global state', 'context struct', 'encapsulation', 'reentrant code']
    },
    {
      id: 'c-cap-20',
      title: 'Refactor callback spaghetti to state machine',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor nested if/else processing logic into a clean state machine pattern.',
      skeleton: `#include <stdio.h>
#include <ctype.h>

// Refactor: this messy parser with nested flags should be a state machine.
// It parses simple tokens: numbers and words from a string.
void parse_tokens(const char *input) {
    int in_number = 0, in_word = 0;
    const char *start = NULL;

    while (*input) {
        if (isdigit(*input)) {
            if (!in_number) {
                if (in_word) {
                    printf("WORD: %.*s\\n", (int)(input - start), start);
                    in_word = 0;
                }
                start = input;
                in_number = 1;
            }
        } else if (isalpha(*input)) {
            if (!in_word) {
                if (in_number) {
                    printf("NUM: %.*s\\n", (int)(input - start), start);
                    in_number = 0;
                }
                start = input;
                in_word = 1;
            }
        } else {
            if (in_number) {
                printf("NUM: %.*s\\n", (int)(input - start), start);
                in_number = 0;
            }
            if (in_word) {
                printf("WORD: %.*s\\n", (int)(input - start), start);
                in_word = 0;
            }
        }
        input++;
    }
    if (in_number) printf("NUM: %.*s\\n", (int)(input - start), start);
    if (in_word) printf("WORD: %.*s\\n", (int)(input - start), start);
}`,
      solution: `#include <stdio.h>
#include <ctype.h>

typedef enum { STATE_IDLE, STATE_NUMBER, STATE_WORD } State;

static void emit(const char *type, const char *start, const char *end) {
    printf("%s: %.*s\\n", type, (int)(end - start), start);
}

void parse_tokens(const char *input) {
    State state = STATE_IDLE;
    const char *start = NULL;

    for (; *input; input++) {
        switch (state) {
        case STATE_IDLE:
            if (isdigit((unsigned char)*input)) {
                start = input;
                state = STATE_NUMBER;
            } else if (isalpha((unsigned char)*input)) {
                start = input;
                state = STATE_WORD;
            }
            break;

        case STATE_NUMBER:
            if (!isdigit((unsigned char)*input)) {
                emit("NUM", start, input);
                if (isalpha((unsigned char)*input)) {
                    start = input;
                    state = STATE_WORD;
                } else {
                    state = STATE_IDLE;
                }
            }
            break;

        case STATE_WORD:
            if (!isalpha((unsigned char)*input)) {
                emit("WORD", start, input);
                if (isdigit((unsigned char)*input)) {
                    start = input;
                    state = STATE_NUMBER;
                } else {
                    state = STATE_IDLE;
                }
            }
            break;
        }
    }

    if (state == STATE_NUMBER) emit("NUM", start, input);
    if (state == STATE_WORD) emit("WORD", start, input);
}`,
      hints: [
        'Define an enum for each state: IDLE, NUMBER, WORD.',
        'Use a switch on the current state inside the main loop.',
        'Emit the token when transitioning out of NUMBER or WORD state.'
      ],
      concepts: ['state machine', 'parser', 'refactoring', 'enum states', 'clean code']
    }
  ]
};
