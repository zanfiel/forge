import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-list',
  title: '23. Linked Lists',
  explanation: `## Linked Lists

A linked list is a dynamic data structure where each element (node) contains data and a pointer to the next node.

\`\`\`c
typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node *head = NULL;

// Prepend a node
Node *new_node = malloc(sizeof(Node));
new_node->data = 42;
new_node->next = head;
head = new_node;
\`\`\`

### Key Concepts
- **Singly linked**: each node points to next
- **Doubly linked**: each node has next and prev pointers
- **Dynamic size**: grows and shrinks with malloc/free
- **O(1) insert/delete** at head, O(n) at arbitrary position
- Always free all nodes to avoid memory leaks
`,
  exercises: [
    {
      id: 'c-list-1',
      title: 'Define a list node',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Define a self-referential struct for a singly linked list node.',
      skeleton: `#include <stdio.h>

typedef struct __BLANK__ {
    int data;
    struct Node *__BLANK__;
} Node;

int main(void) {
    Node a = {10, NULL};
    Node b = {20, &a};
    printf("%d -> %d\\n", b.data, b.next->data);
    return 0;
}`,
      solution: `#include <stdio.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

int main(void) {
    Node a = {10, NULL};
    Node b = {20, &a};
    printf("%d -> %d\\n", b.data, b.next->data);
    return 0;
}`,
      hints: [
        'The struct tag is needed for the self-referential pointer.',
        'struct Node *next points to the next node in the list.',
        'typedef gives the struct the alias Node.',
      ],
      concepts: ['self-referential struct', 'linked list node', 'typedef'],
    },
    {
      id: 'c-list-2',
      title: 'Prepend to list',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Insert a new node at the head of a linked list.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

void prepend(Node **head, int val) {
    Node *n = (Node *)malloc(sizeof(__BLANK__));
    n->data = val;
    n->next = __BLANK__;
    *head = __BLANK__;
}

int main(void) {
    Node *list = NULL;
    prepend(&list, 30);
    prepend(&list, 20);
    prepend(&list, 10);
    for (Node *p = list; p; p = p->next)
        printf("%d ", p->data);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

void prepend(Node **head, int val) {
    Node *n = (Node *)malloc(sizeof(Node));
    n->data = val;
    n->next = *head;
    *head = n;
}

int main(void) {
    Node *list = NULL;
    prepend(&list, 30);
    prepend(&list, 20);
    prepend(&list, 10);
    for (Node *p = list; p; p = p->next)
        printf("%d ", p->data);
    printf("\\n");
    return 0;
}`,
      hints: [
        'malloc(sizeof(Node)) allocates space for one node.',
        'Point the new node\'s next to the current head.',
        'Update *head to point to the new node.',
      ],
      concepts: ['prepend', 'head insertion', 'pointer to pointer'],
    },
    {
      id: 'c-list-3',
      title: 'Predict list traversal',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the output of traversing a linked list.',
      skeleton: `#include <stdio.h>

typedef struct Node { int data; struct Node *next; } Node;

int main(void) {
    Node c = {30, NULL};
    Node b = {20, &c};
    Node a = {10, &b};
    Node *p = &a;
    while (p) {
        printf("%d ", p->data);
        p = p->next;
    }
    printf("\\n");
    return 0;
}`,
      solution: `10 20 30 `,
      hints: [
        'Start at a (data=10), follow next to b (20), then c (30).',
        'c.next is NULL so the loop ends after printing 30.',
        'Note the trailing space after each number.',
      ],
      concepts: ['list traversal', 'while loop', 'pointer chasing'],
    },
    {
      id: 'c-list-4',
      title: 'Append to list',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a function to append a node at the end of a linked list.',
      skeleton: `// Write void append(Node **head, int val) that adds a new node at the tail.`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

void append(Node **head, int val) {
    Node *n = (Node *)malloc(sizeof(Node));
    n->data = val;
    n->next = NULL;
    if (*head == NULL) {
        *head = n;
        return;
    }
    Node *p = *head;
    while (p->next) p = p->next;
    p->next = n;
}

int main(void) {
    Node *list = NULL;
    append(&list, 10);
    append(&list, 20);
    append(&list, 30);
    for (Node *p = list; p; p = p->next)
        printf("%d ", p->data);
    printf("\\n");
    return 0;
}`,
      hints: [
        'If the list is empty, set *head to the new node.',
        'Otherwise traverse to the last node (where next is NULL).',
        'Set the last node\'s next to the new node.',
      ],
      concepts: ['append', 'tail insertion', 'list traversal'],
    },
    {
      id: 'c-list-5',
      title: 'Fix memory leak in list',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix a list deletion function that leaks memory.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

void prepend(Node **head, int val) {
    Node *n = (Node *)malloc(sizeof(Node));
    n->data = val;
    n->next = *head;
    *head = n;
}

// Bug: sets head to NULL without freeing nodes
void clear(Node **head) {
    *head = NULL;
}

int main(void) {
    Node *list = NULL;
    for (int i = 0; i < 5; i++) prepend(&list, i);
    clear(&list);
    printf("List cleared\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

void prepend(Node **head, int val) {
    Node *n = (Node *)malloc(sizeof(Node));
    n->data = val;
    n->next = *head;
    *head = n;
}

void clear(Node **head) {
    Node *cur = *head;
    while (cur) {
        Node *tmp = cur;
        cur = cur->next;
        free(tmp);
    }
    *head = NULL;
}

int main(void) {
    Node *list = NULL;
    for (int i = 0; i < 5; i++) prepend(&list, i);
    clear(&list);
    printf("List cleared\\n");
    return 0;
}`,
      hints: [
        'Each node was allocated with malloc and must be freed.',
        'Save cur->next before freeing cur.',
        'Traverse and free each node, then set *head = NULL.',
      ],
      concepts: ['memory leak', 'free linked list', 'node cleanup'],
    },
    {
      id: 'c-list-6',
      title: 'Count list nodes',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a function that counts the number of nodes in a linked list.',
      skeleton: `// Write int list_length(const Node *head) that returns the number of nodes.`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

int list_length(const Node *head) {
    int count = 0;
    while (head) {
        count++;
        head = head->next;
    }
    return count;
}

int main(void) {
    Node c = {30, NULL};
    Node b = {20, &c};
    Node a = {10, &b};
    printf("Length: %d\\n", list_length(&a));
    printf("Empty: %d\\n", list_length(NULL));
    return 0;
}`,
      hints: [
        'Traverse the list, incrementing a counter at each node.',
        'Stop when head is NULL.',
        'An empty list (NULL) has length 0.',
      ],
      concepts: ['list length', 'traversal', 'counting'],
    },
    {
      id: 'c-list-7',
      title: 'Predict list after deletions',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the list contents after removing the head node.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

void prepend(Node **head, int val) {
    Node *n = (Node *)malloc(sizeof(Node));
    n->data = val;
    n->next = *head;
    *head = n;
}

void remove_head(Node **head) {
    if (!*head) return;
    Node *tmp = *head;
    *head = (*head)->next;
    free(tmp);
}

int main(void) {
    Node *list = NULL;
    prepend(&list, 3);
    prepend(&list, 2);
    prepend(&list, 1);

    remove_head(&list);
    remove_head(&list);

    Node *p = list;
    while (p) {
        printf("%d ", p->data);
        p = p->next;
    }
    printf("\\n");
    return 0;
}`,
      solution: `3 `,
      hints: [
        'After prepend: list = 1 -> 2 -> 3.',
        'First remove_head: list = 2 -> 3.',
        'Second remove_head: list = 3. Output: "3 ".',
      ],
      concepts: ['remove head', 'list mutation', 'predict output'],
    },
    {
      id: 'c-list-8',
      title: 'Search in linked list',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that searches for a value and returns the node.',
      skeleton: `// Write Node *list_find(Node *head, int val)
// that returns a pointer to the first node containing val, or NULL.`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

Node *list_find(Node *head, int val) {
    while (head) {
        if (head->data == val) return head;
        head = head->next;
    }
    return NULL;
}

int main(void) {
    Node c = {30, NULL};
    Node b = {20, &c};
    Node a = {10, &b};

    Node *found = list_find(&a, 20);
    printf("Found: %d\\n", found ? found->data : -1);

    found = list_find(&a, 99);
    printf("Found: %d\\n", found ? found->data : -1);
    return 0;
}`,
      hints: [
        'Traverse the list checking each node\'s data.',
        'Return the node pointer as soon as data matches.',
        'Return NULL if you reach the end without finding it.',
      ],
      concepts: ['linear search', 'linked list', 'find node'],
    },
    {
      id: 'c-list-9',
      title: 'Delete node by value',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that removes the first node with a given value.',
      skeleton: `// Write int list_remove(Node **head, int val)
// Remove the first node containing val. Return 1 if removed, 0 if not found.`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

int list_remove(Node **head, int val) {
    Node **pp = head;
    while (*pp) {
        if ((*pp)->data == val) {
            Node *tmp = *pp;
            *pp = (*pp)->next;
            free(tmp);
            return 1;
        }
        pp = &(*pp)->next;
    }
    return 0;
}

void prepend(Node **head, int val) {
    Node *n = (Node *)malloc(sizeof(Node));
    n->data = val;
    n->next = *head;
    *head = n;
}

int main(void) {
    Node *list = NULL;
    for (int i = 5; i >= 1; i--) prepend(&list, i);

    list_remove(&list, 3);
    list_remove(&list, 1);

    for (Node *p = list; p; p = p->next)
        printf("%d ", p->data);
    printf("\\n");
    return 0;
}`,
      hints: [
        'Use a pointer-to-pointer (Node **pp) to simplify head removal.',
        'Walk pp through the list; *pp is the current node pointer.',
        'When found, set *pp = (*pp)->next and free the old node.',
      ],
      concepts: ['delete node', 'pointer to pointer', 'list removal'],
    },
    {
      id: 'c-list-10',
      title: 'Fill-blank reverse a list',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Reverse a singly linked list in place.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

void reverse(Node **head) {
    Node *prev = __BLANK__;
    Node *cur = *head;
    while (cur) {
        Node *next = cur->__BLANK__;
        cur->next = __BLANK__;
        prev = cur;
        cur = next;
    }
    *head = __BLANK__;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

void reverse(Node **head) {
    Node *prev = NULL;
    Node *cur = *head;
    while (cur) {
        Node *next = cur->next;
        cur->next = prev;
        prev = cur;
        cur = next;
    }
    *head = prev;
}`,
      hints: [
        'prev starts as NULL (new tail).',
        'Save cur->next, then reverse the link: cur->next = prev.',
        'After the loop, prev points to the new head.',
      ],
      concepts: ['reverse linked list', 'in-place reversal', 'three pointers'],
    },
    {
      id: 'c-list-11',
      title: 'Fix use-after-free',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix code that accesses a node after freeing it.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

// Bug: accesses cur->next after freeing cur
void free_list(Node *head) {
    Node *cur = head;
    while (cur) {
        free(cur);
        cur = cur->next;  // Use after free!
    }
}

int main(void) {
    Node *a = (Node *)malloc(sizeof(Node));
    Node *b = (Node *)malloc(sizeof(Node));
    a->data = 1; a->next = b;
    b->data = 2; b->next = NULL;
    free_list(a);
    printf("Freed\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

void free_list(Node *head) {
    Node *cur = head;
    while (cur) {
        Node *tmp = cur->next;
        free(cur);
        cur = tmp;
    }
}

int main(void) {
    Node *a = (Node *)malloc(sizeof(Node));
    Node *b = (Node *)malloc(sizeof(Node));
    a->data = 1; a->next = b;
    b->data = 2; b->next = NULL;
    free_list(a);
    printf("Freed\\n");
    return 0;
}`,
      hints: [
        'Save cur->next BEFORE freeing cur.',
        'Accessing memory after free is undefined behavior.',
        'Use a temporary variable to hold the next pointer.',
      ],
      concepts: ['use-after-free', 'dangling pointer', 'safe deallocation'],
    },
    {
      id: 'c-list-12',
      title: 'Insert at position',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that inserts a node at a specific index.',
      skeleton: `// Write int list_insert_at(Node **head, int pos, int val)
// Insert val at index pos (0-based). Return 1 on success, 0 if pos is out of range.`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

int list_insert_at(Node **head, int pos, int val) {
    if (pos < 0) return 0;
    Node *n = (Node *)malloc(sizeof(Node));
    n->data = val;

    if (pos == 0) {
        n->next = *head;
        *head = n;
        return 1;
    }

    Node *p = *head;
    for (int i = 0; i < pos - 1 && p; i++) p = p->next;
    if (!p) { free(n); return 0; }

    n->next = p->next;
    p->next = n;
    return 1;
}

void print_list(Node *head) {
    for (Node *p = head; p; p = p->next) printf("%d ", p->data);
    printf("\\n");
}

int main(void) {
    Node *list = NULL;
    list_insert_at(&list, 0, 10);
    list_insert_at(&list, 1, 30);
    list_insert_at(&list, 1, 20);
    print_list(list);
    return 0;
}`,
      hints: [
        'Position 0 is a prepend operation.',
        'Walk to the node at pos-1, then insert after it.',
        'If pos is beyond the list length, return 0.',
      ],
      concepts: ['insert at index', 'positional insertion', 'bounds check'],
    },
    {
      id: 'c-list-13',
      title: 'Predict reversed list',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output after reversing a linked list.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

void prepend(Node **h, int v) {
    Node *n = (Node *)malloc(sizeof(Node));
    n->data = v; n->next = *h; *h = n;
}

void reverse(Node **h) {
    Node *p = NULL, *c = *h;
    while (c) { Node *n = c->next; c->next = p; p = c; c = n; }
    *h = p;
}

int main(void) {
    Node *list = NULL;
    prepend(&list, 5);
    prepend(&list, 4);
    prepend(&list, 3);
    prepend(&list, 2);
    prepend(&list, 1);
    // list: 1->2->3->4->5
    reverse(&list);
    for (Node *p = list; p; p = p->next)
        printf("%d ", p->data);
    printf("\\n");
    return 0;
}`,
      solution: `5 4 3 2 1 `,
      hints: [
        'After prepend: list is 1 -> 2 -> 3 -> 4 -> 5.',
        'After reverse: list is 5 -> 4 -> 3 -> 2 -> 1.',
        'Trailing space after each number.',
      ],
      concepts: ['reverse', 'linked list', 'predict output'],
    },
    {
      id: 'c-list-14',
      title: 'Merge two sorted lists',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a function that merges two sorted linked lists into one sorted list.',
      skeleton: `// Write Node *merge_sorted(Node *a, Node *b)
// Both lists are sorted in ascending order.
// Return a new merged sorted list (reuse existing nodes, don't malloc).`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

Node *merge_sorted(Node *a, Node *b) {
    Node dummy = {0, NULL};
    Node *tail = &dummy;

    while (a && b) {
        if (a->data <= b->data) {
            tail->next = a;
            a = a->next;
        } else {
            tail->next = b;
            b = b->next;
        }
        tail = tail->next;
    }
    tail->next = a ? a : b;
    return dummy.next;
}

void prepend(Node **h, int v) {
    Node *n = (Node *)malloc(sizeof(Node));
    n->data = v; n->next = *h; *h = n;
}

int main(void) {
    Node *a = NULL, *b = NULL;
    prepend(&a, 5); prepend(&a, 3); prepend(&a, 1);
    prepend(&b, 6); prepend(&b, 4); prepend(&b, 2);

    Node *merged = merge_sorted(a, b);
    for (Node *p = merged; p; p = p->next)
        printf("%d ", p->data);
    printf("\\n");
    return 0;
}`,
      hints: [
        'Use a dummy head node to simplify building the merged list.',
        'Compare the front of each list and link the smaller one.',
        'Attach the remaining list when one is exhausted.',
      ],
      concepts: ['merge sorted lists', 'dummy node', 'two pointer'],
    },
    {
      id: 'c-list-15',
      title: 'Fill-blank doubly linked node',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Define a doubly linked list node and traverse backwards.',
      skeleton: `#include <stdio.h>

typedef struct DNode {
    int data;
    struct DNode *__BLANK__;
    struct DNode *__BLANK__;
} DNode;

int main(void) {
    DNode a = {1, NULL, NULL};
    DNode b = {2, NULL, NULL};
    DNode c = {3, NULL, NULL};

    a.next = &b; b.prev = &a;
    b.next = &c; c.prev = &b;

    // Traverse backward from c
    DNode *p = &c;
    while (p) {
        printf("%d ", p->data);
        p = p->__BLANK__;
    }
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>

typedef struct DNode {
    int data;
    struct DNode *prev;
    struct DNode *next;
} DNode;

int main(void) {
    DNode a = {1, NULL, NULL};
    DNode b = {2, NULL, NULL};
    DNode c = {3, NULL, NULL};

    a.next = &b; b.prev = &a;
    b.next = &c; c.prev = &b;

    DNode *p = &c;
    while (p) {
        printf("%d ", p->data);
        p = p->prev;
    }
    printf("\\n");
    return 0;
}`,
      hints: [
        'A doubly linked node has both prev and next pointers.',
        'Traversing backward uses p = p->prev.',
        'Output: 3 2 1.',
      ],
      concepts: ['doubly linked list', 'prev pointer', 'backward traversal'],
    },
    {
      id: 'c-list-16',
      title: 'Detect cycle (Floyd)',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a function to detect a cycle in a linked list using Floyd\'s algorithm.',
      skeleton: `// Write int has_cycle(Node *head)
// Return 1 if the list has a cycle, 0 otherwise.
// Use Floyd's tortoise and hare algorithm.`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

int has_cycle(Node *head) {
    Node *slow = head;
    Node *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return 1;
    }
    return 0;
}

int main(void) {
    Node a = {1, NULL}, b = {2, NULL}, c = {3, NULL}, d = {4, NULL};
    a.next = &b; b.next = &c; c.next = &d;
    printf("No cycle: %d\\n", has_cycle(&a));

    d.next = &b;  // Create cycle: d -> b
    printf("Has cycle: %d\\n", has_cycle(&a));
    d.next = NULL;
    return 0;
}`,
      hints: [
        'Slow moves one step, fast moves two steps.',
        'If they meet, there is a cycle.',
        'If fast reaches NULL, there is no cycle.',
      ],
      concepts: ['cycle detection', 'Floyd algorithm', 'tortoise and hare'],
    },
    {
      id: 'c-list-17',
      title: 'Fix off-by-one in delete',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix an off-by-one error in positional deletion.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

void prepend(Node **h, int v) {
    Node *n = (Node *)malloc(sizeof(Node));
    n->data = v; n->next = *h; *h = n;
}

// Bug: deletes the wrong node (off by one)
void delete_at(Node **head, int pos) {
    if (!*head || pos < 0) return;
    if (pos == 0) {
        Node *tmp = *head;
        *head = (*head)->next;
        free(tmp);
        return;
    }
    Node *p = *head;
    for (int i = 0; i < pos; i++) {  // Bug: should be pos - 1
        if (!p->next) return;
        p = p->next;
    }
    Node *tmp = p->next;
    p->next = tmp ? tmp->next : NULL;
    free(tmp);
}

int main(void) {
    Node *list = NULL;
    for (int i = 4; i >= 0; i--) prepend(&list, i);
    // list: 0 1 2 3 4
    delete_at(&list, 2);  // Should delete node with data 2
    for (Node *p = list; p; p = p->next)
        printf("%d ", p->data);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

void prepend(Node **h, int v) {
    Node *n = (Node *)malloc(sizeof(Node));
    n->data = v; n->next = *h; *h = n;
}

void delete_at(Node **head, int pos) {
    if (!*head || pos < 0) return;
    if (pos == 0) {
        Node *tmp = *head;
        *head = (*head)->next;
        free(tmp);
        return;
    }
    Node *p = *head;
    for (int i = 0; i < pos - 1; i++) {
        if (!p->next) return;
        p = p->next;
    }
    Node *tmp = p->next;
    p->next = tmp ? tmp->next : NULL;
    free(tmp);
}

int main(void) {
    Node *list = NULL;
    for (int i = 4; i >= 0; i--) prepend(&list, i);
    delete_at(&list, 2);
    for (Node *p = list; p; p = p->next)
        printf("%d ", p->data);
    printf("\\n");
    return 0;
}`,
      hints: [
        'To delete node at pos, you need to stop at pos - 1.',
        'The loop should iterate pos - 1 times, not pos.',
        'p should be the node BEFORE the one to delete.',
      ],
      concepts: ['off-by-one', 'positional delete', 'linked list'],
    },
    {
      id: 'c-list-18',
      title: 'Predict list operations',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the list state after a series of operations.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

void prepend(Node **h, int v) {
    Node *n = (Node *)malloc(sizeof(Node));
    n->data = v; n->next = *h; *h = n;
}

void append(Node **h, int v) {
    Node *n = (Node *)malloc(sizeof(Node));
    n->data = v; n->next = NULL;
    if (!*h) { *h = n; return; }
    Node *p = *h;
    while (p->next) p = p->next;
    p->next = n;
}

int main(void) {
    Node *list = NULL;
    append(&list, 2);
    prepend(&list, 1);
    append(&list, 3);
    prepend(&list, 0);
    append(&list, 4);
    for (Node *p = list; p; p = p->next)
        printf("%d ", p->data);
    printf("\\n");
    return 0;
}`,
      solution: `0 1 2 3 4 `,
      hints: [
        'append(2): list = [2]. prepend(1): list = [1,2].',
        'append(3): [1,2,3]. prepend(0): [0,1,2,3].',
        'append(4): [0,1,2,3,4].',
      ],
      concepts: ['prepend/append mix', 'list construction', 'predict output'],
    },
    {
      id: 'c-list-19',
      title: 'Refactor sentinel node pattern',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor list operations to use a sentinel (dummy) head node.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

// Current: uses NULL for empty list, special-cases head in every op
void insert_sorted(Node **head, int val) {
    Node *n = (Node *)malloc(sizeof(Node));
    n->data = val;
    if (!*head || val < (*head)->data) {
        n->next = *head;
        *head = n;
        return;
    }
    Node *p = *head;
    while (p->next && p->next->data < val) p = p->next;
    n->next = p->next;
    p->next = n;
}

int main(void) {
    Node *list = NULL;
    insert_sorted(&list, 30);
    insert_sorted(&list, 10);
    insert_sorted(&list, 20);
    for (Node *p = list; p; p = p->next) printf("%d ", p->data);
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

typedef struct {
    Node sentinel;
} List;

void list_init(List *l) {
    l->sentinel.data = 0;
    l->sentinel.next = NULL;
}

void insert_sorted(List *l, int val) {
    Node *n = (Node *)malloc(sizeof(Node));
    n->data = val;
    Node *p = &l->sentinel;
    while (p->next && p->next->data < val) p = p->next;
    n->next = p->next;
    p->next = n;
}

int main(void) {
    List l;
    list_init(&l);
    insert_sorted(&l, 30);
    insert_sorted(&l, 10);
    insert_sorted(&l, 20);
    for (Node *p = l.sentinel.next; p; p = p->next) printf("%d ", p->data);
    printf("\\n");
    return 0;
}`,
      hints: [
        'A sentinel node eliminates special cases for empty list or head insertion.',
        'The sentinel is always present; real data starts at sentinel.next.',
        'No need for pointer-to-pointer or head==NULL checks.',
      ],
      concepts: ['sentinel node', 'dummy head', 'simplify insertion'],
    },
    {
      id: 'c-list-20',
      title: 'Refactor to intrusive list',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor a linked list to use the intrusive list pattern (Linux kernel style).',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

// Current: separate Node wrapping data
typedef struct Node {
    int data;
    char name[32];
    struct Node *next;
} Node;

void prepend(Node **h, int data, const char *name) {
    Node *n = (Node *)malloc(sizeof(Node));
    n->data = data;
    snprintf(n->name, 32, "%s", name);
    n->next = *h;
    *h = n;
}

int main(void) {
    Node *list = NULL;
    prepend(&list, 1, "Alice");
    prepend(&list, 2, "Bob");
    for (Node *p = list; p; p = p->next)
        printf("%d: %s\\n", p->data, p->name);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <stddef.h>

#define container_of(ptr, type, member) \\
    ((type *)((char *)(ptr) - offsetof(type, member)))

typedef struct ListNode {
    struct ListNode *next;
} ListNode;

typedef struct {
    int data;
    char name[32];
    ListNode link;
} Entry;

void list_prepend(ListNode **head, ListNode *node) {
    node->next = *head;
    *head = node;
}

int main(void) {
    ListNode *list = NULL;

    Entry a = { .data = 1, .name = "Alice" };
    Entry b = { .data = 2, .name = "Bob" };
    list_prepend(&list, &a.link);
    list_prepend(&list, &b.link);

    for (ListNode *p = list; p; p = p->next) {
        Entry *e = container_of(p, Entry, link);
        printf("%d: %s\\n", e->data, e->name);
    }
    return 0;
}`,
      hints: [
        'Intrusive lists embed the link node inside the data struct.',
        'container_of macro recovers the outer struct from the link pointer.',
        'offsetof gives the byte offset of a member within a struct.',
      ],
      concepts: ['intrusive list', 'container_of', 'Linux kernel pattern'],
    },
  ],
};
