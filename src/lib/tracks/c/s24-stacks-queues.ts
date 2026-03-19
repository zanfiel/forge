import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-stack',
  title: '24. Stacks & Queues',
  explanation: `## Stacks & Queues

Stacks and queues are fundamental abstract data types with restricted access patterns.

\`\`\`c
// Stack: LIFO (Last In, First Out)
push(5); push(3); push(7);
pop(); // 7 (last pushed)

// Queue: FIFO (First In, First Out)
enqueue(5); enqueue(3); enqueue(7);
dequeue(); // 5 (first enqueued)
\`\`\`

### Key Concepts
- **Stack**: push/pop at the top; used for function calls, undo, expression evaluation
- **Queue**: enqueue at rear, dequeue from front; used for BFS, scheduling, buffers
- **Circular queue**: wraps around using modulo to reuse array space
- **Deque**: double-ended queue allowing insert/remove at both ends
`,
  exercises: [
    {
      id: 'c-stack-1',
      title: 'Define stack struct',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Define a stack structure with an array and top index.',
      skeleton: `#include <stdio.h>
#define MAX 100

typedef struct {
    int data[__BLANK__];
    int __BLANK__;
} Stack;

void stack_init(Stack *s) {
    s->top = __BLANK__;
}

int main(void) {
    Stack s;
    stack_init(&s);
    printf("top = %d\\n", s.top);
    return 0;
}`,
      solution: `#include <stdio.h>
#define MAX 100

typedef struct {
    int data[MAX];
    int top;
} Stack;

void stack_init(Stack *s) {
    s->top = -1;
}

int main(void) {
    Stack s;
    stack_init(&s);
    printf("top = %d\\n", s.top);
    return 0;
}`,
      hints: [
        'The array size is MAX (the defined constant).',
        'top tracks the index of the topmost element.',
        'top = -1 means the stack is empty.',
      ],
      concepts: ['stack struct', 'array-based stack', 'top index'],
    },
    {
      id: 'c-stack-2',
      title: 'Push and pop',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Implement push and pop for an array-based stack.',
      skeleton: `#include <stdio.h>
#define MAX 100

typedef struct { int data[MAX]; int top; } Stack;

void push(Stack *s, int val) {
    if (s->top < MAX - 1)
        s->data[__BLANK__] = val;
}

int pop(Stack *s) {
    if (s->top >= 0)
        return s->data[__BLANK__];
    return -1;
}

int main(void) {
    Stack s = { .top = -1 };
    push(&s, 10);
    push(&s, 20);
    push(&s, 30);
    printf("%d\\n", pop(&s));
    printf("%d\\n", pop(&s));
    return 0;
}`,
      solution: `#include <stdio.h>
#define MAX 100

typedef struct { int data[MAX]; int top; } Stack;

void push(Stack *s, int val) {
    if (s->top < MAX - 1)
        s->data[++s->top] = val;
}

int pop(Stack *s) {
    if (s->top >= 0)
        return s->data[s->top--];
    return -1;
}

int main(void) {
    Stack s = { .top = -1 };
    push(&s, 10);
    push(&s, 20);
    push(&s, 30);
    printf("%d\\n", pop(&s));
    printf("%d\\n", pop(&s));
    return 0;
}`,
      hints: [
        'Push: increment top first, then store: data[++top].',
        'Pop: return data[top], then decrement: data[top--].',
        'Check bounds before push (overflow) and pop (underflow).',
      ],
      concepts: ['push', 'pop', 'pre-increment', 'post-decrement'],
    },
    {
      id: 'c-stack-3',
      title: 'Predict stack operations',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the output of a sequence of push and pop operations.',
      skeleton: `#include <stdio.h>
#define MAX 10

typedef struct { int data[MAX]; int top; } Stack;
void push(Stack *s, int v) { s->data[++s->top] = v; }
int pop(Stack *s) { return s->data[s->top--]; }
int peek(Stack *s) { return s->data[s->top]; }

int main(void) {
    Stack s = { .top = -1 };
    push(&s, 1);
    push(&s, 2);
    push(&s, 3);
    printf("%d\\n", pop(&s));
    printf("%d\\n", peek(&s));
    push(&s, 4);
    printf("%d\\n", pop(&s));
    printf("%d\\n", pop(&s));
    return 0;
}`,
      solution: `3
2
4
2`,
      hints: [
        'Push 1,2,3. Pop returns 3 (LIFO).',
        'Peek returns 2 (top, not removed). Push 4.',
        'Pop returns 4, then pop returns 2.',
      ],
      concepts: ['LIFO', 'peek', 'stack trace'],
    },
    {
      id: 'c-stack-4',
      title: 'Bracket matching',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that checks if brackets are balanced using a stack.',
      skeleton: `// Write int is_balanced(const char *expr)
// Return 1 if all brackets (), [], {} are properly balanced, 0 otherwise.`,
      solution: `#include <stdio.h>
#include <string.h>

int is_balanced(const char *expr) {
    char stack[256];
    int top = -1;

    for (int i = 0; expr[i]; i++) {
        char c = expr[i];
        if (c == '(' || c == '[' || c == '{') {
            stack[++top] = c;
        } else if (c == ')' || c == ']' || c == '}') {
            if (top < 0) return 0;
            char open = stack[top--];
            if ((c == ')' && open != '(') ||
                (c == ']' && open != '[') ||
                (c == '}' && open != '{')) return 0;
        }
    }
    return top == -1;
}

int main(void) {
    printf("%d\\n", is_balanced("({[]})"));
    printf("%d\\n", is_balanced("([)]"));
    printf("%d\\n", is_balanced("{"));
    printf("%d\\n", is_balanced("a + (b * [c - d])"));
    return 0;
}`,
      hints: [
        'Push opening brackets onto the stack.',
        'For closing brackets, pop and check it matches.',
        'At the end, the stack must be empty for balanced input.',
      ],
      concepts: ['bracket matching', 'stack application', 'balanced parentheses'],
    },
    {
      id: 'c-stack-5',
      title: 'Queue with array',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Implement a basic queue with front and rear indices.',
      skeleton: `#include <stdio.h>
#define MAX 100

typedef struct {
    int data[MAX];
    int front;
    int rear;
    int count;
} Queue;

void queue_init(Queue *q) {
    q->front = 0;
    q->rear = __BLANK__;
    q->count = 0;
}

void enqueue(Queue *q, int val) {
    if (q->count < MAX) {
        q->rear = (q->rear + 1) % __BLANK__;
        q->data[q->rear] = val;
        q->__BLANK__++;
    }
}

int dequeue(Queue *q) {
    if (q->count > 0) {
        int val = q->data[q->__BLANK__];
        q->front = (q->front + 1) % MAX;
        q->count--;
        return val;
    }
    return -1;
}`,
      solution: `#include <stdio.h>
#define MAX 100

typedef struct {
    int data[MAX];
    int front;
    int rear;
    int count;
} Queue;

void queue_init(Queue *q) {
    q->front = 0;
    q->rear = -1;
    q->count = 0;
}

void enqueue(Queue *q, int val) {
    if (q->count < MAX) {
        q->rear = (q->rear + 1) % MAX;
        q->data[q->rear] = val;
        q->count++;
    }
}

int dequeue(Queue *q) {
    if (q->count > 0) {
        int val = q->data[q->front];
        q->front = (q->front + 1) % MAX;
        q->count--;
        return val;
    }
    return -1;
}`,
      hints: [
        'rear starts at -1 so the first enqueue puts data at index 0.',
        'Use modulo MAX for circular wraparound.',
        'Dequeue reads from front, enqueue writes at rear.',
      ],
      concepts: ['circular queue', 'enqueue', 'dequeue', 'modulo wrap'],
    },
    {
      id: 'c-stack-6',
      title: 'Predict queue operations',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the output of enqueue and dequeue operations.',
      skeleton: `#include <stdio.h>
#define MAX 10

typedef struct { int data[MAX]; int front, rear, count; } Queue;
void init(Queue *q) { q->front = 0; q->rear = -1; q->count = 0; }
void enq(Queue *q, int v) { q->rear = (q->rear+1)%MAX; q->data[q->rear] = v; q->count++; }
int deq(Queue *q) { int v = q->data[q->front]; q->front = (q->front+1)%MAX; q->count--; return v; }

int main(void) {
    Queue q;
    init(&q);
    enq(&q, 10);
    enq(&q, 20);
    enq(&q, 30);
    printf("%d\\n", deq(&q));
    printf("%d\\n", deq(&q));
    enq(&q, 40);
    printf("%d\\n", deq(&q));
    printf("%d\\n", deq(&q));
    return 0;
}`,
      solution: `10
20
30
40`,
      hints: [
        'FIFO: first enqueued is first dequeued.',
        'Dequeue returns 10, 20 first.',
        'After enqueueing 40, dequeue gives 30 then 40.',
      ],
      concepts: ['FIFO', 'queue operations', 'predict output'],
    },
    {
      id: 'c-stack-7',
      title: 'Stack with linked list',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Implement a stack using a linked list instead of an array.',
      skeleton: `// Implement:
// typedef struct SNode { int data; struct SNode *next; } SNode;
// void push(SNode **top, int val);
// int pop(SNode **top);
// int peek(SNode *top);`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct SNode { int data; struct SNode *next; } SNode;

void push(SNode **top, int val) {
    SNode *n = (SNode *)malloc(sizeof(SNode));
    n->data = val;
    n->next = *top;
    *top = n;
}

int pop(SNode **top) {
    if (!*top) return -1;
    SNode *tmp = *top;
    int val = tmp->data;
    *top = tmp->next;
    free(tmp);
    return val;
}

int peek(SNode *top) {
    return top ? top->data : -1;
}

int main(void) {
    SNode *stack = NULL;
    push(&stack, 10);
    push(&stack, 20);
    push(&stack, 30);
    printf("Peek: %d\\n", peek(stack));
    printf("Pop: %d\\n", pop(&stack));
    printf("Pop: %d\\n", pop(&stack));
    printf("Pop: %d\\n", pop(&stack));
    return 0;
}`,
      hints: [
        'Push = prepend to the linked list.',
        'Pop = remove and return the head node.',
        'No fixed capacity; grows dynamically.',
      ],
      concepts: ['linked list stack', 'dynamic stack', 'no overflow'],
    },
    {
      id: 'c-stack-8',
      title: 'Fix queue underflow',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix a queue that does not check for underflow before dequeue.',
      skeleton: `#include <stdio.h>
#define MAX 5

typedef struct { int data[MAX]; int front, rear, count; } Queue;

void init(Queue *q) { q->front = 0; q->rear = -1; q->count = 0; }

void enqueue(Queue *q, int val) {
    q->rear = (q->rear + 1) % MAX;
    q->data[q->rear] = val;
    q->count++;
}

// Bug: no underflow check, no overflow check
int dequeue(Queue *q) {
    int val = q->data[q->front];
    q->front = (q->front + 1) % MAX;
    q->count--;
    return val;
}

int main(void) {
    Queue q;
    init(&q);
    enqueue(&q, 1);
    printf("%d\\n", dequeue(&q));
    printf("%d\\n", dequeue(&q));  // Bug: underflow
    return 0;
}`,
      solution: `#include <stdio.h>
#define MAX 5

typedef struct { int data[MAX]; int front, rear, count; } Queue;

void init(Queue *q) { q->front = 0; q->rear = -1; q->count = 0; }

int enqueue(Queue *q, int val) {
    if (q->count >= MAX) return 0;
    q->rear = (q->rear + 1) % MAX;
    q->data[q->rear] = val;
    q->count++;
    return 1;
}

int dequeue(Queue *q, int *out) {
    if (q->count <= 0) return 0;
    *out = q->data[q->front];
    q->front = (q->front + 1) % MAX;
    q->count--;
    return 1;
}

int main(void) {
    Queue q;
    init(&q);
    enqueue(&q, 1);
    int val;
    if (dequeue(&q, &val)) printf("%d\\n", val);
    if (dequeue(&q, &val)) printf("%d\\n", val);
    else printf("Queue empty\\n");
    return 0;
}`,
      hints: [
        'Check count before dequeue to prevent underflow.',
        'Return success/failure status from enqueue and dequeue.',
        'Use an output parameter for the dequeued value.',
      ],
      concepts: ['underflow check', 'overflow check', 'defensive programming'],
    },
    {
      id: 'c-stack-9',
      title: 'Postfix expression evaluator',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Evaluate a postfix (RPN) expression using a stack.',
      skeleton: `// Write int eval_postfix(const char *expr)
// Tokens are separated by spaces. Operands are single digits.
// Operators: + - * /
// Example: "3 4 + 2 *" = (3+4)*2 = 14`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>

int eval_postfix(const char *expr) {
    int stack[256];
    int top = -1;

    for (int i = 0; expr[i]; i++) {
        if (expr[i] == ' ') continue;
        if (isdigit(expr[i])) {
            stack[++top] = expr[i] - '0';
        } else {
            int b = stack[top--];
            int a = stack[top--];
            switch (expr[i]) {
                case '+': stack[++top] = a + b; break;
                case '-': stack[++top] = a - b; break;
                case '*': stack[++top] = a * b; break;
                case '/': stack[++top] = a / b; break;
            }
        }
    }
    return stack[0];
}

int main(void) {
    printf("%d\\n", eval_postfix("3 4 + 2 *"));
    printf("%d\\n", eval_postfix("5 1 2 + 4 * + 3 -"));
    return 0;
}`,
      hints: [
        'Push operands. When an operator is found, pop two operands.',
        'Apply the operator: a op b, push the result.',
        'The final value is the only element left on the stack.',
      ],
      concepts: ['postfix evaluation', 'RPN', 'stack application'],
    },
    {
      id: 'c-stack-10',
      title: 'Fill-blank circular queue full check',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete the full/empty checks for a circular queue.',
      skeleton: `#include <stdio.h>
#define SIZE 4

typedef struct { int data[SIZE]; int front, rear, count; } CQueue;

int is_full(CQueue *q)  { return q->__BLANK__ == SIZE; }
int is_empty(CQueue *q) { return q->__BLANK__ == 0; }

int enqueue(CQueue *q, int v) {
    if (__BLANK__(q)) return 0;
    q->rear = (q->rear + 1) % SIZE;
    q->data[q->rear] = v;
    q->count++;
    return 1;
}

int main(void) {
    CQueue q = { .front = 0, .rear = -1, .count = 0 };
    for (int i = 1; i <= 5; i++) {
        int ok = enqueue(&q, i * 10);
        printf("enqueue(%d): %s\\n", i * 10, ok ? "ok" : "full");
    }
    return 0;
}`,
      solution: `#include <stdio.h>
#define SIZE 4

typedef struct { int data[SIZE]; int front, rear, count; } CQueue;

int is_full(CQueue *q)  { return q->count == SIZE; }
int is_empty(CQueue *q) { return q->count == 0; }

int enqueue(CQueue *q, int v) {
    if (is_full(q)) return 0;
    q->rear = (q->rear + 1) % SIZE;
    q->data[q->rear] = v;
    q->count++;
    return 1;
}

int main(void) {
    CQueue q = { .front = 0, .rear = -1, .count = 0 };
    for (int i = 1; i <= 5; i++) {
        int ok = enqueue(&q, i * 10);
        printf("enqueue(%d): %s\\n", i * 10, ok ? "ok" : "full");
    }
    return 0;
}`,
      hints: [
        'count tracks the number of elements in the queue.',
        'Full when count == SIZE, empty when count == 0.',
        'Call is_full before enqueue to prevent overflow.',
      ],
      concepts: ['circular queue', 'full check', 'count-based tracking'],
    },
    {
      id: 'c-stack-11',
      title: 'Predict circular queue wrap',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output when a circular queue wraps around.',
      skeleton: `#include <stdio.h>
#define SZ 3

typedef struct { int d[SZ]; int f, r, n; } Q;
void init(Q *q) { q->f=0; q->r=-1; q->n=0; }
void enq(Q *q, int v) { q->r=(q->r+1)%SZ; q->d[q->r]=v; q->n++; }
int deq(Q *q) { int v=q->d[q->f]; q->f=(q->f+1)%SZ; q->n--; return v; }

int main(void) {
    Q q; init(&q);
    enq(&q, 1); enq(&q, 2); enq(&q, 3);
    printf("%d\\n", deq(&q));
    printf("%d\\n", deq(&q));
    enq(&q, 4); enq(&q, 5);
    printf("%d\\n", deq(&q));
    printf("%d\\n", deq(&q));
    printf("%d\\n", deq(&q));
    return 0;
}`,
      solution: `1
2
3
4
5`,
      hints: [
        'Enqueue 1,2,3. Dequeue: 1, 2. Queue has [3].',
        'Enqueue 4,5 (wraps around). Queue: [3,4,5].',
        'Dequeue: 3, 4, 5.',
      ],
      concepts: ['circular wrap', 'FIFO order', 'modulo arithmetic'],
    },
    {
      id: 'c-stack-12',
      title: 'Queue with linked list',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Implement a queue using a linked list with front and rear pointers.',
      skeleton: `// Implement:
// typedef struct QNode { int data; struct QNode *next; } QNode;
// typedef struct { QNode *front; QNode *rear; } LQueue;
// void lq_init(LQueue *q);
// void lq_enqueue(LQueue *q, int val);
// int lq_dequeue(LQueue *q);`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct QNode { int data; struct QNode *next; } QNode;
typedef struct { QNode *front; QNode *rear; } LQueue;

void lq_init(LQueue *q) { q->front = q->rear = NULL; }

void lq_enqueue(LQueue *q, int val) {
    QNode *n = (QNode *)malloc(sizeof(QNode));
    n->data = val;
    n->next = NULL;
    if (q->rear) {
        q->rear->next = n;
    } else {
        q->front = n;
    }
    q->rear = n;
}

int lq_dequeue(LQueue *q) {
    if (!q->front) return -1;
    QNode *tmp = q->front;
    int val = tmp->data;
    q->front = tmp->next;
    if (!q->front) q->rear = NULL;
    free(tmp);
    return val;
}

int main(void) {
    LQueue q;
    lq_init(&q);
    lq_enqueue(&q, 10);
    lq_enqueue(&q, 20);
    lq_enqueue(&q, 30);
    printf("%d\\n", lq_dequeue(&q));
    printf("%d\\n", lq_dequeue(&q));
    printf("%d\\n", lq_dequeue(&q));
    return 0;
}`,
      hints: [
        'Enqueue at rear, dequeue from front.',
        'If the queue was empty, set both front and rear to the new node.',
        'After dequeue, if front becomes NULL, set rear to NULL too.',
      ],
      concepts: ['linked list queue', 'front/rear pointers', 'dynamic queue'],
    },
    {
      id: 'c-stack-13',
      title: 'Fix stack overflow',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix a stack that overflows without warning.',
      skeleton: `#include <stdio.h>
#define CAPACITY 3

typedef struct { int data[CAPACITY]; int top; } Stack;

// Bug: no overflow check
void push(Stack *s, int val) {
    s->data[++s->top] = val;
}

int pop(Stack *s) {
    return s->data[s->top--];
}

int main(void) {
    Stack s = { .top = -1 };
    push(&s, 1);
    push(&s, 2);
    push(&s, 3);
    push(&s, 4);  // Bug: overflow!
    printf("top = %d\\n", s.top);
    return 0;
}`,
      solution: `#include <stdio.h>
#define CAPACITY 3

typedef struct { int data[CAPACITY]; int top; } Stack;

int push(Stack *s, int val) {
    if (s->top >= CAPACITY - 1) {
        fprintf(stderr, "Stack overflow\\n");
        return 0;
    }
    s->data[++s->top] = val;
    return 1;
}

int pop(Stack *s, int *out) {
    if (s->top < 0) {
        fprintf(stderr, "Stack underflow\\n");
        return 0;
    }
    *out = s->data[s->top--];
    return 1;
}

int main(void) {
    Stack s = { .top = -1 };
    push(&s, 1);
    push(&s, 2);
    push(&s, 3);
    if (!push(&s, 4)) printf("Could not push 4\\n");
    printf("top = %d\\n", s.top);
    return 0;
}`,
      hints: [
        'Check top < CAPACITY - 1 before pushing.',
        'Check top >= 0 before popping.',
        'Return a status flag to indicate success or failure.',
      ],
      concepts: ['stack overflow', 'bounds check', 'error handling'],
    },
    {
      id: 'c-stack-14',
      title: 'Min-stack',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Implement a stack that supports O(1) get_min operation.',
      skeleton: `// Implement a MinStack where get_min returns the minimum element in O(1).
// Use two stacks: one for data, one for tracking minimums.`,
      solution: `#include <stdio.h>
#define MAX 100

typedef struct {
    int data[MAX];
    int mins[MAX];
    int top;
} MinStack;

void ms_init(MinStack *s) { s->top = -1; }

void ms_push(MinStack *s, int val) {
    if (s->top >= MAX - 1) return;
    s->top++;
    s->data[s->top] = val;
    if (s->top == 0 || val <= s->mins[s->top - 1]) {
        s->mins[s->top] = val;
    } else {
        s->mins[s->top] = s->mins[s->top - 1];
    }
}

int ms_pop(MinStack *s) {
    if (s->top < 0) return -1;
    return s->data[s->top--];
}

int ms_get_min(MinStack *s) {
    if (s->top < 0) return -1;
    return s->mins[s->top];
}

int main(void) {
    MinStack s;
    ms_init(&s);
    ms_push(&s, 5);
    ms_push(&s, 3);
    ms_push(&s, 7);
    ms_push(&s, 2);
    printf("Min: %d\\n", ms_get_min(&s));
    ms_pop(&s);
    printf("Min: %d\\n", ms_get_min(&s));
    ms_pop(&s);
    printf("Min: %d\\n", ms_get_min(&s));
    return 0;
}`,
      hints: [
        'Maintain a parallel array that tracks the minimum at each level.',
        'When pushing, the new min is min(val, previous_min).',
        'When popping, the minimum is automatically restored.',
      ],
      concepts: ['min stack', 'auxiliary stack', 'O(1) minimum'],
    },
    {
      id: 'c-stack-15',
      title: 'Fill-blank deque operations',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete a deque (double-ended queue) with push/pop at both ends.',
      skeleton: `#include <stdio.h>
#define SIZE 8

typedef struct { int data[SIZE]; int front, rear, count; } Deque;

void deque_init(Deque *d) { d->front = 0; d->rear = SIZE - 1; d->count = 0; }

void push_back(Deque *d, int val) {
    d->rear = (d->rear + 1) % SIZE;
    d->data[d->rear] = val;
    d->count++;
}

void push_front(Deque *d, int val) {
    d->front = (d->front - 1 + __BLANK__) % SIZE;
    d->data[d->__BLANK__] = val;
    d->count++;
}

int pop_front(Deque *d) {
    int val = d->data[d->front];
    d->front = (d->front + __BLANK__) % SIZE;
    d->count--;
    return val;
}

int pop_back(Deque *d) {
    int val = d->data[d->rear];
    d->rear = (d->rear - 1 + SIZE) % SIZE;
    d->count--;
    return val;
}`,
      solution: `#include <stdio.h>
#define SIZE 8

typedef struct { int data[SIZE]; int front, rear, count; } Deque;

void deque_init(Deque *d) { d->front = 0; d->rear = SIZE - 1; d->count = 0; }

void push_back(Deque *d, int val) {
    d->rear = (d->rear + 1) % SIZE;
    d->data[d->rear] = val;
    d->count++;
}

void push_front(Deque *d, int val) {
    d->front = (d->front - 1 + SIZE) % SIZE;
    d->data[d->front] = val;
    d->count++;
}

int pop_front(Deque *d) {
    int val = d->data[d->front];
    d->front = (d->front + 1) % SIZE;
    d->count--;
    return val;
}

int pop_back(Deque *d) {
    int val = d->data[d->rear];
    d->rear = (d->rear - 1 + SIZE) % SIZE;
    d->count--;
    return val;
}`,
      hints: [
        'Add SIZE before modulo to handle negative wraparound.',
        'push_front decrements front, push_back increments rear.',
        'pop_front increments front, pop_back decrements rear.',
      ],
      concepts: ['deque', 'double-ended queue', 'circular array'],
    },
    {
      id: 'c-stack-16',
      title: 'Predict stack-based reversal',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output when a stack is used to reverse a string.',
      skeleton: `#include <stdio.h>
#include <string.h>

int main(void) {
    char str[] = "ABCDE";
    int n = strlen(str);
    char stack[256];
    int top = -1;

    for (int i = 0; i < n; i++)
        stack[++top] = str[i];

    for (int i = 0; i < n; i++)
        str[i] = stack[top--];

    printf("%s\\n", str);
    return 0;
}`,
      solution: `EDCBA`,
      hints: [
        'Push A, B, C, D, E onto the stack.',
        'Pop in reverse order: E, D, C, B, A.',
        'The string is reversed in place.',
      ],
      concepts: ['stack reversal', 'string reverse', 'LIFO property'],
    },
    {
      id: 'c-stack-17',
      title: 'Priority queue (min-heap insert)',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Implement insert for a min-heap based priority queue.',
      skeleton: `// Implement:
// typedef struct { int data[MAX]; int size; } PQueue;
// void pq_init(PQueue *pq);
// void pq_insert(PQueue *pq, int val);  // maintain min-heap property
// int pq_extract_min(PQueue *pq);`,
      solution: `#include <stdio.h>
#define MAX 100

typedef struct { int data[MAX]; int size; } PQueue;

void pq_init(PQueue *pq) { pq->size = 0; }

static void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

void pq_insert(PQueue *pq, int val) {
    int i = pq->size++;
    pq->data[i] = val;
    while (i > 0) {
        int parent = (i - 1) / 2;
        if (pq->data[i] < pq->data[parent]) {
            swap(&pq->data[i], &pq->data[parent]);
            i = parent;
        } else break;
    }
}

int pq_extract_min(PQueue *pq) {
    int min = pq->data[0];
    pq->data[0] = pq->data[--pq->size];
    int i = 0;
    while (1) {
        int l = 2*i+1, r = 2*i+2, smallest = i;
        if (l < pq->size && pq->data[l] < pq->data[smallest]) smallest = l;
        if (r < pq->size && pq->data[r] < pq->data[smallest]) smallest = r;
        if (smallest == i) break;
        swap(&pq->data[i], &pq->data[smallest]);
        i = smallest;
    }
    return min;
}

int main(void) {
    PQueue pq;
    pq_init(&pq);
    pq_insert(&pq, 30);
    pq_insert(&pq, 10);
    pq_insert(&pq, 20);
    pq_insert(&pq, 5);
    printf("%d\\n", pq_extract_min(&pq));
    printf("%d\\n", pq_extract_min(&pq));
    printf("%d\\n", pq_extract_min(&pq));
    return 0;
}`,
      hints: [
        'Insert at the end and bubble up (sift up) while smaller than parent.',
        'Parent of index i is (i-1)/2. Children are 2*i+1 and 2*i+2.',
        'Extract min: replace root with last, sift down.',
      ],
      concepts: ['min-heap', 'priority queue', 'sift up', 'sift down'],
    },
    {
      id: 'c-stack-18',
      title: 'Refactor stack to use dynamic array',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor a fixed-size stack to grow dynamically with realloc.',
      skeleton: `#include <stdio.h>
#define MAX 4

typedef struct {
    int data[MAX];
    int top;
} Stack;

void push(Stack *s, int val) {
    if (s->top >= MAX - 1) {
        printf("Overflow!\\n");
        return;
    }
    s->data[++s->top] = val;
}

int pop(Stack *s) {
    if (s->top < 0) return -1;
    return s->data[s->top--];
}

int main(void) {
    Stack s = { .top = -1 };
    for (int i = 0; i < 10; i++) push(&s, i);
    while (s.top >= 0) printf("%d ", pop(&s));
    printf("\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *data;
    int top;
    int capacity;
} Stack;

void stack_init(Stack *s, int cap) {
    s->data = (int *)malloc(cap * sizeof(int));
    s->top = -1;
    s->capacity = cap;
}

void push(Stack *s, int val) {
    if (s->top >= s->capacity - 1) {
        s->capacity *= 2;
        s->data = (int *)realloc(s->data, s->capacity * sizeof(int));
    }
    s->data[++s->top] = val;
}

int pop(Stack *s) {
    if (s->top < 0) return -1;
    return s->data[s->top--];
}

void stack_free(Stack *s) {
    free(s->data);
    s->data = NULL;
}

int main(void) {
    Stack s;
    stack_init(&s, 4);
    for (int i = 0; i < 10; i++) push(&s, i);
    while (s.top >= 0) printf("%d ", pop(&s));
    printf("\\n");
    stack_free(&s);
    return 0;
}`,
      hints: [
        'Replace fixed array with int* and a capacity field.',
        'When full, double capacity with realloc.',
        'Remember to free the dynamic array when done.',
      ],
      concepts: ['dynamic array', 'realloc', 'amortized growth'],
    },
    {
      id: 'c-stack-19',
      title: 'Refactor two queues to implement stack',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Implement a stack using two queues.',
      skeleton: `#include <stdio.h>
#define MAX 100

// Simple queue helpers
typedef struct { int d[MAX]; int f, r, n; } Q;
void q_init(Q *q) { q->f=0; q->r=-1; q->n=0; }
void q_enq(Q *q, int v) { q->d[++q->r % MAX]=v; q->n++; }
int q_deq(Q *q) { q->n--; return q->d[q->f++ % MAX]; }
int q_empty(Q *q) { return q->n==0; }

// Implement stack using two queues
// push: O(n), pop: O(1)`,
      solution: `#include <stdio.h>
#define MAX 100

typedef struct { int d[MAX]; int f, r, n; } Q;
void q_init(Q *q) { q->f=0; q->r=-1; q->n=0; }
void q_enq(Q *q, int v) { q->r=(q->r+1)%MAX; q->d[q->r]=v; q->n++; }
int q_deq(Q *q) { int v=q->d[q->f]; q->f=(q->f+1)%MAX; q->n--; return v; }
int q_empty(Q *q) { return q->n==0; }
int q_size(Q *q) { return q->n; }

typedef struct { Q q1, q2; } QStack;

void qs_init(QStack *s) { q_init(&s->q1); q_init(&s->q2); }

void qs_push(QStack *s, int val) {
    q_enq(&s->q2, val);
    while (!q_empty(&s->q1)) {
        q_enq(&s->q2, q_deq(&s->q1));
    }
    Q tmp = s->q1;
    s->q1 = s->q2;
    s->q2 = tmp;
}

int qs_pop(QStack *s) {
    return q_deq(&s->q1);
}

int main(void) {
    QStack s;
    qs_init(&s);
    qs_push(&s, 1);
    qs_push(&s, 2);
    qs_push(&s, 3);
    printf("%d\\n", qs_pop(&s));
    printf("%d\\n", qs_pop(&s));
    printf("%d\\n", qs_pop(&s));
    return 0;
}`,
      hints: [
        'Push: enqueue new element to q2, then move all of q1 to q2, swap q1/q2.',
        'Pop: just dequeue from q1.',
        'This makes push O(n) but pop O(1).',
      ],
      concepts: ['stack from queues', 'data structure simulation', 'LIFO from FIFO'],
    },
    {
      id: 'c-stack-20',
      title: 'Predict two-stack queue',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Predict output of a queue implemented with two stacks.',
      skeleton: `#include <stdio.h>
#define MAX 100

typedef struct { int d[MAX]; int t; } S;
void s_init(S *s) { s->t = -1; }
void s_push(S *s, int v) { s->d[++s->t] = v; }
int s_pop(S *s) { return s->d[s->t--]; }
int s_empty(S *s) { return s->t < 0; }

typedef struct { S in, out; } SQueue;
void sq_init(SQueue *q) { s_init(&q->in); s_init(&q->out); }

void sq_enq(SQueue *q, int v) { s_push(&q->in, v); }

int sq_deq(SQueue *q) {
    if (s_empty(&q->out)) {
        while (!s_empty(&q->in))
            s_push(&q->out, s_pop(&q->in));
    }
    return s_pop(&q->out);
}

int main(void) {
    SQueue q;
    sq_init(&q);
    sq_enq(&q, 1);
    sq_enq(&q, 2);
    sq_enq(&q, 3);
    printf("%d\\n", sq_deq(&q));
    sq_enq(&q, 4);
    printf("%d\\n", sq_deq(&q));
    printf("%d\\n", sq_deq(&q));
    printf("%d\\n", sq_deq(&q));
    return 0;
}`,
      solution: `1
2
3
4`,
      hints: [
        'First deq: out is empty, transfer in(1,2,3) to out(3,2,1). Pop 1.',
        'Enqueue 4 to in. Deq: out has (3,2), pop 2.',
        'Deq: pop 3. Deq: out empty, transfer in(4) to out(4), pop 4.',
      ],
      concepts: ['queue from stacks', 'amortized transfer', 'FIFO from LIFO'],
    },
  ],
};
