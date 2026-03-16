import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-hash',
  title: '26. Hash Tables',
  explanation: `## Hash Tables

A hash table maps keys to values using a hash function for O(1) average-case lookup.

\`\`\`c
#define TABLE_SIZE 64

unsigned int hash(const char *key) {
    unsigned int h = 0;
    while (*key) h = h * 31 + *key++;
    return h % TABLE_SIZE;
}
\`\`\`

### Key Concepts
- **Hash function**: maps keys to array indices
- **Collision handling**: chaining (linked lists) or open addressing (probing)
- **Load factor**: n/capacity; resize when too high
- **djb2, FNV, murmur**: popular hash function families
`,
  exercises: [
    {
      id: 'c-hash-1',
      title: 'Basic hash function',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Complete a simple hash function for strings.',
      skeleton: `#include <stdio.h>
#define TABLE_SIZE 16

unsigned int hash(const char *key) {
    unsigned int h = __BLANK__;
    while (*key) {
        h = h * 31 + __BLANK__;
        key++;
    }
    return h % __BLANK__;
}

int main(void) {
    printf("hash(\\"hello\\") = %u\\n", hash("hello"));
    printf("hash(\\"world\\") = %u\\n", hash("world"));
    return 0;
}`,
      solution: `#include <stdio.h>
#define TABLE_SIZE 16

unsigned int hash(const char *key) {
    unsigned int h = 0;
    while (*key) {
        h = h * 31 + *key;
        key++;
    }
    return h % TABLE_SIZE;
}

int main(void) {
    printf("hash(\\"hello\\") = %u\\n", hash("hello"));
    printf("hash(\\"world\\") = %u\\n", hash("world"));
    return 0;
}`,
      hints: [
        'Initialize h to 0.',
        'Accumulate each character: h = h * 31 + *key.',
        'Modulo TABLE_SIZE to get an index in range.',
      ],
      concepts: ['hash function', 'djb2 variant', 'modulo'],
    },
    {
      id: 'c-hash-2',
      title: 'Hash table with chaining',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Implement a hash table using separate chaining for collision resolution.',
      skeleton: `// Implement a string->int hash table with chaining:
// typedef struct Entry { char *key; int value; struct Entry *next; } Entry;
// typedef struct { Entry *buckets[SIZE]; } HashTable;
// void ht_set(HashTable *ht, const char *key, int value);
// int ht_get(HashTable *ht, const char *key, int *out);`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define SIZE 16

typedef struct Entry { char *key; int value; struct Entry *next; } Entry;
typedef struct { Entry *buckets[SIZE]; } HashTable;

unsigned int hash(const char *key) {
    unsigned int h = 0;
    while (*key) h = h * 31 + *key++;
    return h % SIZE;
}

void ht_init(HashTable *ht) {
    memset(ht->buckets, 0, sizeof(ht->buckets));
}

void ht_set(HashTable *ht, const char *key, int value) {
    unsigned int idx = hash(key);
    Entry *e = ht->buckets[idx];
    while (e) {
        if (strcmp(e->key, key) == 0) { e->value = value; return; }
        e = e->next;
    }
    Entry *n = (Entry *)malloc(sizeof(Entry));
    n->key = strdup(key);
    n->value = value;
    n->next = ht->buckets[idx];
    ht->buckets[idx] = n;
}

int ht_get(HashTable *ht, const char *key, int *out) {
    unsigned int idx = hash(key);
    Entry *e = ht->buckets[idx];
    while (e) {
        if (strcmp(e->key, key) == 0) { *out = e->value; return 1; }
        e = e->next;
    }
    return 0;
}

int main(void) {
    HashTable ht;
    ht_init(&ht);
    ht_set(&ht, "age", 25);
    ht_set(&ht, "score", 100);
    int val;
    if (ht_get(&ht, "age", &val)) printf("age = %d\\n", val);
    if (ht_get(&ht, "score", &val)) printf("score = %d\\n", val);
    return 0;
}`,
      hints: [
        'Hash the key to find the bucket index.',
        'Search the chain for an existing key to update.',
        'If not found, prepend a new entry to the chain.',
      ],
      concepts: ['separate chaining', 'hash table', 'collision resolution'],
    },
    {
      id: 'c-hash-3',
      title: 'Predict hash collisions',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict which keys collide in a small hash table.',
      skeleton: `#include <stdio.h>
#define SZ 4

unsigned int hash(const char *k) {
    unsigned int h = 0;
    while (*k) h = h * 31 + *k++;
    return h % SZ;
}

int main(void) {
    const char *keys[] = {"a", "b", "c", "d", "e"};
    for (int i = 0; i < 5; i++)
        printf("%s -> %u\\n", keys[i], hash(keys[i]));
    return 0;
}`,
      solution: `a -> 1
b -> 2
c -> 3
d -> 0
e -> 1`,
      hints: [
        'hash("a") = 97 % 4 = 1. hash("b") = 98 % 4 = 2.',
        'hash("c") = 99 % 4 = 3. hash("d") = 100 % 4 = 0.',
        'hash("e") = 101 % 4 = 1. Collision: "a" and "e" both map to 1.',
      ],
      concepts: ['hash collision', 'modulo distribution', 'small table'],
    },
    {
      id: 'c-hash-4',
      title: 'Hash table delete',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a delete function for a chained hash table.',
      skeleton: `// Write int ht_delete(HashTable *ht, const char *key)
// Remove the entry with the given key. Return 1 if deleted, 0 if not found.
// Free both the key string and the entry.`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define SIZE 16

typedef struct Entry { char *key; int value; struct Entry *next; } Entry;
typedef struct { Entry *buckets[SIZE]; } HashTable;

unsigned int hash(const char *key) {
    unsigned int h = 0;
    while (*key) h = h * 31 + *key++;
    return h % SIZE;
}

int ht_delete(HashTable *ht, const char *key) {
    unsigned int idx = hash(key);
    Entry **pp = &ht->buckets[idx];
    while (*pp) {
        if (strcmp((*pp)->key, key) == 0) {
            Entry *tmp = *pp;
            *pp = tmp->next;
            free(tmp->key);
            free(tmp);
            return 1;
        }
        pp = &(*pp)->next;
    }
    return 0;
}

int main(void) {
    printf("Delete function implemented\\n");
    return 0;
}`,
      hints: [
        'Use a pointer-to-pointer to simplify unlinking.',
        'Walk the chain, comparing keys with strcmp.',
        'Free both the duplicated key string and the entry.',
      ],
      concepts: ['hash table delete', 'pointer to pointer', 'memory cleanup'],
    },
    {
      id: 'c-hash-5',
      title: 'Fix strcmp vs pointer comparison',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix a hash table lookup that compares string pointers instead of contents.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define SIZE 16

typedef struct Entry { char *key; int value; struct Entry *next; } Entry;
typedef struct { Entry *buckets[SIZE]; } HashTable;

unsigned int hash(const char *k) { unsigned int h=0; while(*k) h=h*31+*k++; return h%SIZE; }

// Bug: compares pointers, not string contents
int ht_get(HashTable *ht, const char *key, int *out) {
    unsigned int idx = hash(key);
    Entry *e = ht->buckets[idx];
    while (e) {
        if (e->key == key) { *out = e->value; return 1; }
        e = e->next;
    }
    return 0;
}

int main(void) {
    printf("Bug: pointer comparison instead of strcmp\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define SIZE 16

typedef struct Entry { char *key; int value; struct Entry *next; } Entry;
typedef struct { Entry *buckets[SIZE]; } HashTable;

unsigned int hash(const char *k) { unsigned int h=0; while(*k) h=h*31+*k++; return h%SIZE; }

int ht_get(HashTable *ht, const char *key, int *out) {
    unsigned int idx = hash(key);
    Entry *e = ht->buckets[idx];
    while (e) {
        if (strcmp(e->key, key) == 0) { *out = e->value; return 1; }
        e = e->next;
    }
    return 0;
}

int main(void) {
    printf("Fixed: using strcmp for string comparison\\n");
    return 0;
}`,
      hints: [
        'In C, == compares pointer addresses, not string contents.',
        'Use strcmp() to compare string contents.',
        'strcmp returns 0 when strings are equal.',
      ],
      concepts: ['strcmp vs ==', 'string comparison', 'common C bug'],
    },
    {
      id: 'c-hash-6',
      title: 'Linear probing',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete an open-addressing hash table with linear probing.',
      skeleton: `#include <stdio.h>
#include <string.h>
#define SIZE 8
#define EMPTY -1

int table[SIZE];

void init(void) { for (int i = 0; i < SIZE; i++) table[i] = EMPTY; }

void insert(int key) {
    int idx = key % SIZE;
    while (table[idx] != __BLANK__) {
        idx = (idx + __BLANK__) % SIZE;
    }
    table[idx] = key;
}

int search(int key) {
    int idx = key % SIZE;
    int start = idx;
    while (table[idx] != EMPTY) {
        if (table[idx] == __BLANK__) return idx;
        idx = (idx + 1) % SIZE;
        if (idx == start) break;
    }
    return -1;
}`,
      solution: `#include <stdio.h>
#include <string.h>
#define SIZE 8
#define EMPTY -1

int table[SIZE];

void init(void) { for (int i = 0; i < SIZE; i++) table[i] = EMPTY; }

void insert(int key) {
    int idx = key % SIZE;
    while (table[idx] != EMPTY) {
        idx = (idx + 1) % SIZE;
    }
    table[idx] = key;
}

int search(int key) {
    int idx = key % SIZE;
    int start = idx;
    while (table[idx] != EMPTY) {
        if (table[idx] == key) return idx;
        idx = (idx + 1) % SIZE;
        if (idx == start) break;
    }
    return -1;
}`,
      hints: [
        'Linear probing: if slot is occupied, try the next one.',
        'Increment by 1 each time: (idx + 1) % SIZE.',
        'Search looks for the key at each probed position.',
      ],
      concepts: ['linear probing', 'open addressing', 'collision handling'],
    },
    {
      id: 'c-hash-7',
      title: 'Predict probe sequence',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict where keys land in a linear probing table.',
      skeleton: `#include <stdio.h>
#define SZ 8
#define EMPTY -1

int tbl[SZ];
void init(void) { for(int i=0;i<SZ;i++) tbl[i]=EMPTY; }
void ins(int k) { int i=k%SZ; while(tbl[i]!=EMPTY) i=(i+1)%SZ; tbl[i]=k; }

int main(void) {
    init();
    ins(1);  // 1%8=1
    ins(9);  // 9%8=1, collision
    ins(17); // 17%8=1, collision
    ins(5);  // 5%8=5
    for (int i = 0; i < SZ; i++) {
        if (tbl[i] != EMPTY) printf("[%d]=%d ", i, tbl[i]);
    }
    printf("\\n");
    return 0;
}`,
      solution: `[1]=1 [2]=9 [3]=17 [5]=5 `,
      hints: [
        '1 goes to index 1. 9 hashes to 1, probes to 2.',
        '17 hashes to 1, 2 taken, probes to 3.',
        '5 hashes to 5, no collision.',
      ],
      concepts: ['linear probing', 'clustering', 'probe sequence'],
    },
    {
      id: 'c-hash-8',
      title: 'FNV-1a hash',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Implement the FNV-1a hash function.',
      skeleton: `// Write uint32_t fnv1a(const char *data, size_t len)
// FNV-1a: hash = offset_basis; for each byte: hash ^= byte; hash *= prime;
// FNV offset basis: 2166136261, FNV prime: 16777619`,
      solution: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

uint32_t fnv1a(const char *data, size_t len) {
    uint32_t hash = 2166136261u;
    for (size_t i = 0; i < len; i++) {
        hash ^= (unsigned char)data[i];
        hash *= 16777619u;
    }
    return hash;
}

int main(void) {
    const char *s = "hello";
    printf("fnv1a(\\"hello\\") = 0x%08X\\n", fnv1a(s, strlen(s)));

    const char *s2 = "Hello";
    printf("fnv1a(\\"Hello\\") = 0x%08X\\n", fnv1a(s2, strlen(s2)));
    return 0;
}`,
      hints: [
        'Start with offset_basis = 2166136261.',
        'XOR each byte first, then multiply by the prime.',
        'FNV-1a has better avalanche properties than FNV-1.',
      ],
      concepts: ['FNV-1a', 'hash function', 'avalanche effect'],
    },
    {
      id: 'c-hash-9',
      title: 'Fix memory leak on overwrite',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix a hash table set function that leaks the old key on update.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define SIZE 16

typedef struct Entry { char *key; int value; struct Entry *next; } Entry;
typedef struct { Entry *buckets[SIZE]; } HashTable;

unsigned int hash(const char *k) { unsigned int h=0; while(*k) h=h*31+*k++; return h%SIZE; }

// Bug: when updating existing key, leaks old key memory
void ht_set(HashTable *ht, const char *key, int value) {
    unsigned int idx = hash(key);
    Entry *e = ht->buckets[idx];
    while (e) {
        if (strcmp(e->key, key) == 0) {
            e->value = value;
            e->key = strdup(key);  // Bug: old key not freed
            return;
        }
        e = e->next;
    }
    Entry *n = (Entry *)malloc(sizeof(Entry));
    n->key = strdup(key);
    n->value = value;
    n->next = ht->buckets[idx];
    ht->buckets[idx] = n;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define SIZE 16

typedef struct Entry { char *key; int value; struct Entry *next; } Entry;
typedef struct { Entry *buckets[SIZE]; } HashTable;

unsigned int hash(const char *k) { unsigned int h=0; while(*k) h=h*31+*k++; return h%SIZE; }

void ht_set(HashTable *ht, const char *key, int value) {
    unsigned int idx = hash(key);
    Entry *e = ht->buckets[idx];
    while (e) {
        if (strcmp(e->key, key) == 0) {
            e->value = value;
            return;
        }
        e = e->next;
    }
    Entry *n = (Entry *)malloc(sizeof(Entry));
    n->key = strdup(key);
    n->value = value;
    n->next = ht->buckets[idx];
    ht->buckets[idx] = n;
}`,
      hints: [
        'When updating an existing key, just change the value.',
        'No need to re-strdup the key since it already matches.',
        'The original code leaked the old key by replacing without free.',
      ],
      concepts: ['memory leak', 'strdup', 'update vs insert'],
    },
    {
      id: 'c-hash-10',
      title: 'Hash table iteration',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that iterates over all entries in a hash table.',
      skeleton: `// Write void ht_foreach(HashTable *ht, void (*fn)(const char *key, int value))
// Call fn for every key-value pair in the table.`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define SIZE 16

typedef struct Entry { char *key; int value; struct Entry *next; } Entry;
typedef struct { Entry *buckets[SIZE]; } HashTable;

void ht_foreach(HashTable *ht, void (*fn)(const char *key, int value)) {
    for (int i = 0; i < SIZE; i++) {
        Entry *e = ht->buckets[i];
        while (e) {
            fn(e->key, e->value);
            e = e->next;
        }
    }
}

void print_entry(const char *key, int value) {
    printf("  %s = %d\\n", key, value);
}

int main(void) {
    HashTable ht;
    memset(&ht, 0, sizeof(ht));
    // (assume ht_set is available)
    printf("Iteration function implemented\\n");
    return 0;
}`,
      hints: [
        'Loop over all buckets (0 to SIZE-1).',
        'For each bucket, walk the chain calling fn.',
        'Order of iteration is not sorted; it depends on hash values.',
      ],
      concepts: ['hash table iteration', 'callback pattern', 'unordered traversal'],
    },
    {
      id: 'c-hash-11',
      title: 'Fill-blank double hashing',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Complete a double hashing probing strategy.',
      skeleton: `#include <stdio.h>
#define SIZE 7

int table[SIZE];
void init(void) { for (int i = 0; i < SIZE; i++) table[i] = -1; }

int hash1(int k) { return k % SIZE; }
int hash2(int k) { return 1 + (k % (__BLANK__ - 1)); }

void insert(int k) {
    int idx = hash1(k);
    int step = __BLANK__(k);
    while (table[idx] != -1) {
        idx = (idx + __BLANK__) % SIZE;
    }
    table[idx] = k;
}`,
      solution: `#include <stdio.h>
#define SIZE 7

int table[SIZE];
void init(void) { for (int i = 0; i < SIZE; i++) table[i] = -1; }

int hash1(int k) { return k % SIZE; }
int hash2(int k) { return 1 + (k % (SIZE - 1)); }

void insert(int k) {
    int idx = hash1(k);
    int step = hash2(k);
    while (table[idx] != -1) {
        idx = (idx + step) % SIZE;
    }
    table[idx] = k;
}`,
      hints: [
        'hash2 returns 1 + k % (SIZE - 1) to avoid step of 0.',
        'The step is computed once and reused for each probe.',
        'Double hashing reduces clustering compared to linear probing.',
      ],
      concepts: ['double hashing', 'secondary hash', 'probe step'],
    },
    {
      id: 'c-hash-12',
      title: 'Predict hash table state',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the state of a small hash table after insertions.',
      skeleton: `#include <stdio.h>
#include <string.h>
#define SZ 4

typedef struct { char key[16]; int val; } Slot;

Slot tbl[SZ];
void init(void) { for(int i=0;i<SZ;i++) tbl[i].key[0]='\\0'; }

unsigned int h(const char *k) { unsigned int v=0; while(*k) v+=*k++; return v%SZ; }

void set(const char *k, int v) {
    unsigned int i = h(k);
    while (tbl[i].key[0] && strcmp(tbl[i].key, k) != 0) i = (i+1)%SZ;
    strcpy(tbl[i].key, k);
    tbl[i].val = v;
}

int main(void) {
    init();
    set("ab", 1);  // 'a'+'b'=195, 195%4=3
    set("ba", 2);  // 'b'+'a'=195, 195%4=3, collision
    set("cd", 3);  // 'c'+'d'=199, 199%4=3, collision
    for (int i = 0; i < SZ; i++)
        if (tbl[i].key[0]) printf("[%d]%s=%d ", i, tbl[i].key, tbl[i].val);
    printf("\\n");
    return 0;
}`,
      solution: `[0]=cd=3 [1]=ba=2 [3]=ab=1 `,
      hints: [
        'All three keys hash to index 3 (sum of ASCII values mod 4).',
        '"ab" goes to 3. "ba" probes to 0. "cd" probes to 1.',
        'Wait - "ab" at 3, "ba" probes from 3: 3 is taken, goes to 0. "cd" probes from 3: 3 taken, 0 taken, goes to 1.',
      ],
      concepts: ['collision resolution', 'linear probing', 'hash table state'],
    },
    {
      id: 'c-hash-13',
      title: 'Hash table resize',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a resize function that doubles the hash table and rehashes all entries.',
      skeleton: `// Write void ht_resize(HashTable *ht)
// Double the bucket count, rehash all entries into new buckets.`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Entry { char *key; int value; struct Entry *next; } Entry;

typedef struct {
    Entry **buckets;
    int size;
    int count;
} HashTable;

unsigned int hash_n(const char *k, int sz) {
    unsigned int h = 0;
    while (*k) h = h * 31 + *k++;
    return h % sz;
}

void ht_init(HashTable *ht, int size) {
    ht->size = size;
    ht->count = 0;
    ht->buckets = (Entry **)calloc(size, sizeof(Entry *));
}

void ht_resize(HashTable *ht) {
    int old_size = ht->size;
    Entry **old_buckets = ht->buckets;
    int new_size = old_size * 2;

    ht->buckets = (Entry **)calloc(new_size, sizeof(Entry *));
    ht->size = new_size;

    for (int i = 0; i < old_size; i++) {
        Entry *e = old_buckets[i];
        while (e) {
            Entry *next = e->next;
            unsigned int idx = hash_n(e->key, new_size);
            e->next = ht->buckets[idx];
            ht->buckets[idx] = e;
            e = next;
        }
    }
    free(old_buckets);
}

int main(void) {
    HashTable ht;
    ht_init(&ht, 4);
    printf("Size before: %d\\n", ht.size);
    ht_resize(&ht);
    printf("Size after: %d\\n", ht.size);
    free(ht.buckets);
    return 0;
}`,
      hints: [
        'Allocate a new bucket array with double the size.',
        'Rehash every entry from old buckets to new positions.',
        'Free the old bucket array after migration.',
      ],
      concepts: ['dynamic resize', 'rehash', 'load factor'],
    },
    {
      id: 'c-hash-14',
      title: 'Refactor array lookup to hash table',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor a linear search through an array of pairs into a hash table lookup.',
      skeleton: `#include <stdio.h>
#include <string.h>

typedef struct { const char *name; int code; } Country;

Country countries[] = {
    {"US", 1}, {"UK", 44}, {"JP", 81}, {"DE", 49}, {"FR", 33}
};
int num_countries = 5;

// O(n) linear search
int get_code(const char *name) {
    for (int i = 0; i < num_countries; i++) {
        if (strcmp(countries[i].name, name) == 0)
            return countries[i].code;
    }
    return -1;
}

int main(void) {
    printf("US: %d\\n", get_code("US"));
    printf("JP: %d\\n", get_code("JP"));
    printf("XX: %d\\n", get_code("XX"));
    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>
#define TABLE_SIZE 16

typedef struct Entry { const char *name; int code; struct Entry *next; } Entry;

Entry *table[TABLE_SIZE];

unsigned int hash(const char *k) {
    unsigned int h = 0;
    while (*k) h = h * 31 + *k++;
    return h % TABLE_SIZE;
}

void ht_insert(const char *name, int code) {
    unsigned int idx = hash(name);
    Entry *e = (Entry *)malloc(sizeof(Entry));
    e->name = name;
    e->code = code;
    e->next = table[idx];
    table[idx] = e;
}

int get_code(const char *name) {
    unsigned int idx = hash(name);
    Entry *e = table[idx];
    while (e) {
        if (strcmp(e->name, name) == 0) return e->code;
        e = e->next;
    }
    return -1;
}

void init_table(void) {
    memset(table, 0, sizeof(table));
    ht_insert("US", 1);
    ht_insert("UK", 44);
    ht_insert("JP", 81);
    ht_insert("DE", 49);
    ht_insert("FR", 33);
}

int main(void) {
    init_table();
    printf("US: %d\\n", get_code("US"));
    printf("JP: %d\\n", get_code("JP"));
    printf("XX: %d\\n", get_code("XX"));
    return 0;
}`,
      hints: [
        'Replace the array with a hash table for O(1) average lookup.',
        'Initialize the hash table with all known entries.',
        'Lookup hashes the key and searches only that bucket\'s chain.',
      ],
      concepts: ['O(n) to O(1)', 'hash table refactor', 'lookup optimization'],
    },
    {
      id: 'c-hash-15',
      title: 'Fill-blank Robin Hood hashing',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Complete a Robin Hood hashing insert that balances probe distances.',
      skeleton: `#include <stdio.h>
#define SIZE 8
#define EMPTY -1

typedef struct { int key; int dist; } Slot;
Slot tbl[SIZE];
void init(void) { for(int i=0;i<SIZE;i++) { tbl[i].key=EMPTY; tbl[i].dist=0; } }

void insert(int key) {
    int idx = key % SIZE;
    int dist = 0;
    while (tbl[idx].key != EMPTY) {
        if (tbl[idx].__BLANK__ < dist) {
            // Steal from the rich (swap)
            int tk = tbl[idx].key; tbl[idx].key = key; key = tk;
            int td = tbl[idx].dist; tbl[idx].dist = __BLANK__; dist = td;
        }
        idx = (idx + 1) % SIZE;
        __BLANK__++;
    }
    tbl[idx].key = key;
    tbl[idx].dist = dist;
}`,
      solution: `#include <stdio.h>
#define SIZE 8
#define EMPTY -1

typedef struct { int key; int dist; } Slot;
Slot tbl[SIZE];
void init(void) { for(int i=0;i<SIZE;i++) { tbl[i].key=EMPTY; tbl[i].dist=0; } }

void insert(int key) {
    int idx = key % SIZE;
    int dist = 0;
    while (tbl[idx].key != EMPTY) {
        if (tbl[idx].dist < dist) {
            int tk = tbl[idx].key; tbl[idx].key = key; key = tk;
            int td = tbl[idx].dist; tbl[idx].dist = dist; dist = td;
        }
        idx = (idx + 1) % SIZE;
        dist++;
    }
    tbl[idx].key = key;
    tbl[idx].dist = dist;
}`,
      hints: [
        'Robin Hood: if the current occupant is closer to home, swap.',
        'Compare probe distances: tbl[idx].dist < dist means occupant is "richer".',
        'After swap, continue inserting the displaced element.',
      ],
      concepts: ['Robin Hood hashing', 'probe distance', 'variance reduction'],
    },
    {
      id: 'c-hash-16',
      title: 'Write word frequency counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a hash table-based word frequency counter.',
      skeleton: `// Use a hash table to count occurrences of each word in a string.
// void count_words(const char *text)
// Print each unique word and its count.`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#define SIZE 64

typedef struct Entry { char *word; int count; struct Entry *next; } Entry;
Entry *table[SIZE];

unsigned int hash(const char *k) {
    unsigned int h = 0;
    while (*k) h = h * 31 + *k++;
    return h % SIZE;
}

void increment(const char *word) {
    unsigned int idx = hash(word);
    Entry *e = table[idx];
    while (e) {
        if (strcmp(e->word, word) == 0) { e->count++; return; }
        e = e->next;
    }
    Entry *n = (Entry *)malloc(sizeof(Entry));
    n->word = strdup(word);
    n->count = 1;
    n->next = table[idx];
    table[idx] = n;
}

void count_words(const char *text) {
    char buf[256];
    int bi = 0;
    memset(table, 0, sizeof(table));

    for (int i = 0; text[i]; i++) {
        if (isalpha(text[i])) {
            buf[bi++] = tolower(text[i]);
        } else if (bi > 0) {
            buf[bi] = '\\0';
            increment(buf);
            bi = 0;
        }
    }
    if (bi > 0) { buf[bi] = '\\0'; increment(buf); }

    for (int i = 0; i < SIZE; i++) {
        for (Entry *e = table[i]; e; e = e->next)
            printf("%s: %d\\n", e->word, e->count);
    }
}

int main(void) {
    count_words("the cat sat on the mat the cat");
    return 0;
}`,
      hints: [
        'Tokenize the string into words.',
        'For each word, increment its count in the hash table.',
        'If the word is new, insert with count 1.',
      ],
      concepts: ['word frequency', 'hash table application', 'text processing'],
    },
    {
      id: 'c-hash-17',
      title: 'Fix tombstone deletion',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Fix open-addressing deletion that breaks probe chains.',
      skeleton: `#include <stdio.h>
#define SIZE 8
#define EMPTY -1

int tbl[SIZE];
void init(void) { for(int i=0;i<SIZE;i++) tbl[i]=EMPTY; }
void ins(int k) { int i=k%SIZE; while(tbl[i]!=EMPTY) i=(i+1)%SIZE; tbl[i]=k; }

// Bug: setting to EMPTY breaks probe chains for other keys
void del(int k) {
    int i = k % SIZE;
    while (tbl[i] != EMPTY) {
        if (tbl[i] == k) { tbl[i] = EMPTY; return; }  // Bug!
        i = (i + 1) % SIZE;
    }
}

int search(int k) {
    int i = k%SIZE;
    while(tbl[i]!=EMPTY) {
        if(tbl[i]==k) return i;
        i=(i+1)%SIZE;
    }
    return -1;
}`,
      solution: `#include <stdio.h>
#define SIZE 8
#define EMPTY -1
#define DELETED -2

int tbl[SIZE];
void init(void) { for(int i=0;i<SIZE;i++) tbl[i]=EMPTY; }
void ins(int k) { int i=k%SIZE; while(tbl[i]!=EMPTY && tbl[i]!=DELETED) i=(i+1)%SIZE; tbl[i]=k; }

void del(int k) {
    int i = k % SIZE;
    while (tbl[i] != EMPTY) {
        if (tbl[i] == k) { tbl[i] = DELETED; return; }
        i = (i + 1) % SIZE;
    }
}

int search(int k) {
    int i = k%SIZE;
    while(tbl[i]!=EMPTY) {
        if(tbl[i]==k) return i;
        i=(i+1)%SIZE;
    }
    return -1;
}`,
      hints: [
        'Setting a slot to EMPTY breaks the probe chain for later keys.',
        'Use a DELETED sentinel (tombstone) instead of EMPTY.',
        'Search treats DELETED as occupied; insert can reuse DELETED slots.',
      ],
      concepts: ['tombstone', 'lazy deletion', 'probe chain integrity'],
    },
    {
      id: 'c-hash-18',
      title: 'Predict two-sum with hash table',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict output of a two-sum solution using a hash table.',
      skeleton: `#include <stdio.h>
#include <string.h>
#define SZ 32

int map[SZ];
int has[SZ];

void init(void) { memset(has, 0, sizeof(has)); }
void put(int k, int v) { int i=(k%SZ+SZ)%SZ; map[i]=v; has[i]=1; }
int get(int k, int *v) { int i=(k%SZ+SZ)%SZ; if(has[i]) { *v=map[i]; return 1; } return 0; }

int main(void) {
    int nums[] = {2, 7, 11, 15};
    int target = 9;
    init();
    for (int i = 0; i < 4; i++) {
        int comp = target - nums[i];
        int j;
        if (get(comp, &j)) {
            printf("[%d, %d]\\n", j, i);
            return 0;
        }
        put(nums[i], i);
    }
    printf("No solution\\n");
    return 0;
}`,
      solution: `[0, 1]`,
      hints: [
        'Looking for two numbers that sum to 9.',
        'i=0: comp=7, not in map. Store 2->0.',
        'i=1: comp=2, found at index 0. Output [0, 1].',
      ],
      concepts: ['two-sum', 'hash table lookup', 'complement search'],
    },
    {
      id: 'c-hash-19',
      title: 'Refactor to use uthash',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor a manual hash table to use the uthash header-only library pattern.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define SIZE 16

// Manual hash table
typedef struct Entry { char key[32]; int val; struct Entry *next; } Entry;
Entry *buckets[SIZE];

unsigned int hash(const char *k) { unsigned int h=0; while(*k) h=h*31+*k++; return h%SIZE; }

void set(const char *k, int v) {
    unsigned int i = hash(k);
    Entry *e = buckets[i];
    while (e) { if (!strcmp(e->key, k)) { e->val = v; return; } e = e->next; }
    Entry *n = malloc(sizeof(Entry));
    strcpy(n->key, k);
    n->val = v;
    n->next = buckets[i];
    buckets[i] = n;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* uthash-style macros (simplified) */
typedef struct Entry {
    char key[32];
    int val;
    struct Entry *hh_next;
    unsigned int hh_hash;
} Entry;

Entry *head = NULL;

unsigned int compute_hash(const char *k) {
    unsigned int h = 0;
    while (*k) h = h * 31 + *k++;
    return h;
}

Entry *find(const char *key) {
    unsigned int h = compute_hash(key);
    Entry *e = head;
    while (e) {
        if (e->hh_hash == h && strcmp(e->key, key) == 0) return e;
        e = e->hh_next;
    }
    return NULL;
}

void add(const char *key, int val) {
    Entry *e = find(key);
    if (e) { e->val = val; return; }
    e = (Entry *)malloc(sizeof(Entry));
    strcpy(e->key, key);
    e->val = val;
    e->hh_hash = compute_hash(key);
    e->hh_next = head;
    head = e;
}

int main(void) {
    add("US", 1);
    add("JP", 81);
    Entry *e = find("JP");
    if (e) printf("JP = %d\\n", e->val);
    return 0;
}`,
      hints: [
        'uthash-style: embed hash metadata in the struct itself.',
        'Store computed hash to speed up comparison.',
        'Real uthash uses macros like HASH_ADD_STR, HASH_FIND_STR.',
      ],
      concepts: ['uthash pattern', 'embedded hash metadata', 'library-style API'],
    },
    {
      id: 'c-hash-20',
      title: 'Write hash set (deduplicate array)',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a hash set to remove duplicates from an integer array.',
      skeleton: `// Write int deduplicate(int *arr, int n)
// Remove duplicate values in-place. Return new length.
// Use a simple hash set for O(n) average time.`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define SET_SIZE 256

typedef struct SetNode { int val; struct SetNode *next; } SetNode;

typedef struct {
    SetNode *buckets[SET_SIZE];
} HashSet;

void set_init(HashSet *s) { memset(s->buckets, 0, sizeof(s->buckets)); }

int set_contains(HashSet *s, int val) {
    unsigned int idx = ((unsigned int)val) % SET_SIZE;
    SetNode *n = s->buckets[idx];
    while (n) {
        if (n->val == val) return 1;
        n = n->next;
    }
    return 0;
}

void set_add(HashSet *s, int val) {
    unsigned int idx = ((unsigned int)val) % SET_SIZE;
    SetNode *n = (SetNode *)malloc(sizeof(SetNode));
    n->val = val;
    n->next = s->buckets[idx];
    s->buckets[idx] = n;
}

int deduplicate(int *arr, int n) {
    HashSet s;
    set_init(&s);
    int w = 0;
    for (int i = 0; i < n; i++) {
        if (!set_contains(&s, arr[i])) {
            set_add(&s, arr[i]);
            arr[w++] = arr[i];
        }
    }
    return w;
}

int main(void) {
    int arr[] = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    n = deduplicate(arr, n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
      hints: [
        'Use a hash set to track which values have been seen.',
        'Copy only unseen values to the output position.',
        'Return the new length after deduplication.',
      ],
      concepts: ['hash set', 'deduplication', 'O(n) unique'],
    },
  ],
};
