import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-thread',
  title: '40. POSIX Threads',
  explanation: `## POSIX Threads

POSIX threads (pthreads) allow concurrent execution within a single process, sharing the same address space.

\`\`\`c
#include <pthread.h>
#include <stdio.h>

void *worker(void *arg) {
    int id = *(int *)arg;
    printf("Thread %d running\\n", id);
    return NULL;
}

int main(void) {
    pthread_t t;
    int id = 1;
    pthread_create(&t, NULL, worker, &id);
    pthread_join(t, NULL);  // wait for thread to finish
    return 0;
}
// Compile: gcc -pthread program.c
\`\`\`

### Key Concepts
- **pthread_create**: spawn a new thread with a start function
- **pthread_join**: wait for a thread to terminate and collect its return value
- **pthread_exit**: terminate the calling thread
- **Thread function signature**: \`void *func(void *arg)\`
- **pthread_detach**: mark thread for automatic cleanup on termination
- **Thread safety**: shared data must be protected from concurrent access
- **-pthread flag**: required for compilation and linking
`,
  exercises: [
    {
      id: 'c-thread-1',
      title: 'Create a thread',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fill in the pthread_create call to start a new thread.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

void *hello(void *arg) {
    printf("Hello from thread!\\n");
    return NULL;
}

int main(void) {
    pthread_t t;
    __BLANK__(&t, NULL, hello, NULL);
    pthread_join(t, NULL);
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>

void *hello(void *arg) {
    printf("Hello from thread!\\n");
    return NULL;
}

int main(void) {
    pthread_t t;
    pthread_create(&t, NULL, hello, NULL);
    pthread_join(t, NULL);
    return 0;
}`,
      hints: [
        'pthread_create takes: pointer to thread, attributes, function, argument.',
        'NULL for attributes means default thread settings.',
        'The function must return void * and take void * as argument.',
      ],
      concepts: ['pthread_create', 'thread-creation', 'pthreads'],
    },
    {
      id: 'c-thread-2',
      title: 'Join a thread',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Wait for the thread to complete using pthread_join.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

void *compute(void *arg) {
    printf("Computing...\\n");
    return NULL;
}

int main(void) {
    pthread_t t;
    pthread_create(&t, NULL, compute, NULL);
    __BLANK__(t, NULL);
    printf("Thread finished\\n");
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>

void *compute(void *arg) {
    printf("Computing...\\n");
    return NULL;
}

int main(void) {
    pthread_t t;
    pthread_create(&t, NULL, compute, NULL);
    pthread_join(t, NULL);
    printf("Thread finished\\n");
    return 0;
}`,
      hints: [
        'pthread_join blocks until the specified thread terminates.',
        'First argument is the thread ID, second is pointer to return value (NULL to ignore).',
        'Not joining a non-detached thread leaks resources.',
      ],
      concepts: ['pthread_join', 'thread-synchronization', 'pthreads'],
    },
    {
      id: 'c-thread-3',
      title: 'Pass argument to thread',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Cast the void pointer argument back to int pointer in the thread function.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

void *print_num(void *arg) {
    int num = *(__BLANK__)arg;
    printf("Number: %d\\n", num);
    return NULL;
}

int main(void) {
    int val = 42;
    pthread_t t;
    pthread_create(&t, NULL, print_num, &val);
    pthread_join(t, NULL);
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>

void *print_num(void *arg) {
    int num = *(int *)arg;
    printf("Number: %d\\n", num);
    return NULL;
}

int main(void) {
    int val = 42;
    pthread_t t;
    pthread_create(&t, NULL, print_num, &val);
    pthread_join(t, NULL);
    return 0;
}`,
      hints: [
        'Cast void * to the expected pointer type: (int *).',
        'Then dereference to get the actual value.',
        'The argument is passed as the 4th parameter to pthread_create.',
      ],
      concepts: ['void-pointers', 'type-casting', 'thread-arguments'],
    },
    {
      id: 'c-thread-4',
      title: 'Thread return value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Retrieve the return value from a thread using pthread_join.',
      skeleton: `#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

void *square(void *arg) {
    int val = *(int *)arg;
    int *result = malloc(sizeof(int));
    *result = val * val;
    return result;
}

int main(void) {
    int input = 7;
    pthread_t t;
    pthread_create(&t, NULL, square, &input);
    void *ret;
    pthread_join(t, __BLANK__);
    printf("Result: %d\\n", *(int *)ret);
    free(ret);
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

void *square(void *arg) {
    int val = *(int *)arg;
    int *result = malloc(sizeof(int));
    *result = val * val;
    return result;
}

int main(void) {
    int input = 7;
    pthread_t t;
    pthread_create(&t, NULL, square, &input);
    void *ret;
    pthread_join(t, &ret);
    printf("Result: %d\\n", *(int *)ret);
    free(ret);
    return 0;
}`,
      hints: [
        'Pass &ret to pthread_join to receive the thread return value.',
        'The thread returns a malloc\'d pointer -- caller must free it.',
        'pthread_join stores the return value in the void ** pointer.',
      ],
      concepts: ['pthread_join', 'return-value', 'dynamic-memory'],
    },
    {
      id: 'c-thread-5',
      title: 'Detach a thread',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Detach a thread so it automatically releases resources when it exits.',
      skeleton: `#include <pthread.h>
#include <stdio.h>
#include <unistd.h>

void *background(void *arg) {
    printf("Background work done\\n");
    return NULL;
}

int main(void) {
    pthread_t t;
    pthread_create(&t, NULL, background, NULL);
    __BLANK__(t);
    sleep(1); // give thread time to finish
    printf("Main exiting\\n");
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>
#include <unistd.h>

void *background(void *arg) {
    printf("Background work done\\n");
    return NULL;
}

int main(void) {
    pthread_t t;
    pthread_create(&t, NULL, background, NULL);
    pthread_detach(t);
    sleep(1); // give thread time to finish
    printf("Main exiting\\n");
    return 0;
}`,
      hints: [
        'pthread_detach marks the thread for automatic cleanup.',
        'A detached thread cannot be joined.',
        'Use detach for fire-and-forget background tasks.',
      ],
      concepts: ['pthread_detach', 'thread-lifecycle', 'resource-management'],
    },
    {
      id: 'c-thread-6',
      title: 'Thread self identification',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use pthread_self() to get the current thread ID inside the thread function.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

void *identify(void *arg) {
    pthread_t self = __BLANK__;
    printf("Thread ID: %lu\\n", (unsigned long)self);
    return NULL;
}

int main(void) {
    pthread_t t;
    pthread_create(&t, NULL, identify, NULL);
    pthread_join(t, NULL);
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>

void *identify(void *arg) {
    pthread_t self = pthread_self();
    printf("Thread ID: %lu\\n", (unsigned long)self);
    return NULL;
}

int main(void) {
    pthread_t t;
    pthread_create(&t, NULL, identify, NULL);
    pthread_join(t, NULL);
    return 0;
}`,
      hints: [
        'pthread_self() returns the thread ID of the calling thread.',
        'Useful for logging or comparing thread identities.',
        'The return type is pthread_t -- cast for printing.',
      ],
      concepts: ['pthread_self', 'thread-identity', 'pthreads'],
    },
    {
      id: 'c-thread-7',
      title: 'Write a multi-threaded sum',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write code that creates 2 threads, each summing half of an array. Join both and print the total sum.',
      skeleton: `#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *arr;
    int start;
    int end;
    long sum;
} SumTask;

// Write thread function and main logic here

int main(void) {
    int data[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int n = 10;
    // Create 2 threads, each sums half, print total
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *arr;
    int start;
    int end;
    long sum;
} SumTask;

void *sum_worker(void *arg) {
    SumTask *task = (SumTask *)arg;
    task->sum = 0;
    for (int i = task->start; i < task->end; i++) {
        task->sum += task->arr[i];
    }
    return NULL;
}

int main(void) {
    int data[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int n = 10;
    int mid = n / 2;

    SumTask t1 = {data, 0, mid, 0};
    SumTask t2 = {data, mid, n, 0};

    pthread_t th1, th2;
    pthread_create(&th1, NULL, sum_worker, &t1);
    pthread_create(&th2, NULL, sum_worker, &t2);
    pthread_join(th1, NULL);
    pthread_join(th2, NULL);

    printf("Total: %ld\\n", t1.sum + t2.sum);
    return 0;
}`,
      hints: [
        'Use a struct to pass the array pointer, start/end indices, and store the result.',
        'Each thread writes to its own struct -- no shared mutable state.',
        'After joining, sum the results from both structs.',
      ],
      concepts: ['pthread_create', 'parallel-computation', 'data-partitioning'],
    },
    {
      id: 'c-thread-8',
      title: 'Write a thread pool (simple)',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write code that creates N worker threads. Each thread receives a unique ID (0 to N-1), prints it, and exits. Join all threads.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

#define NUM_THREADS 4

// Write thread function and spawning logic

int main(void) {
    // Spawn NUM_THREADS threads, each prints its ID, join all
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>

#define NUM_THREADS 4

void *worker(void *arg) {
    int id = *(int *)arg;
    printf("Worker %d running\\n", id);
    return NULL;
}

int main(void) {
    pthread_t threads[NUM_THREADS];
    int ids[NUM_THREADS];

    for (int i = 0; i < NUM_THREADS; i++) {
        ids[i] = i;
        pthread_create(&threads[i], NULL, worker, &ids[i]);
    }
    for (int i = 0; i < NUM_THREADS; i++) {
        pthread_join(threads[i], NULL);
    }
    printf("All workers done\\n");
    return 0;
}`,
      hints: [
        'Store thread IDs in an array so each thread gets a unique pointer.',
        'Do NOT pass &i directly -- the loop variable changes before the thread reads it.',
        'Use a separate ids array so each thread has its own stable address.',
      ],
      concepts: ['thread-pool', 'argument-passing', 'race-condition-prevention'],
    },
    {
      id: 'c-thread-9',
      title: 'Write a thread with struct argument',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a thread function that receives a struct with a name and count, prints the name count times, then returns the total characters printed (as a malloc\'d int).',
      skeleton: `#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    const char *name;
    int count;
} PrintTask;

// Write thread function here

int main(void) {
    PrintTask task = {"Hello", 3};
    pthread_t t;
    pthread_create(&t, NULL, printer, &task);
    void *ret;
    pthread_join(t, &ret);
    printf("Total chars: %d\\n", *(int *)ret);
    free(ret);
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    const char *name;
    int count;
} PrintTask;

void *printer(void *arg) {
    PrintTask *task = (PrintTask *)arg;
    int total = 0;
    for (int i = 0; i < task->count; i++) {
        printf("%s\\n", task->name);
        total += (int)strlen(task->name);
    }
    int *result = malloc(sizeof(int));
    *result = total;
    return result;
}

int main(void) {
    PrintTask task = {"Hello", 3};
    pthread_t t;
    pthread_create(&t, NULL, printer, &task);
    void *ret;
    pthread_join(t, &ret);
    printf("Total chars: %d\\n", *(int *)ret);
    free(ret);
    return 0;
}`,
      hints: [
        'Cast arg to PrintTask * to access the struct fields.',
        'Allocate the return value on the heap since the stack is thread-local.',
        'The caller retrieves the result via pthread_join and must free it.',
      ],
      concepts: ['struct-arguments', 'pthread_join', 'return-value', 'dynamic-memory'],
    },
    {
      id: 'c-thread-10',
      title: 'Write pthread_exit usage',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a thread function that uses pthread_exit instead of return to terminate, passing back a status code.',
      skeleton: `#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

// Write thread function that uses pthread_exit

int main(void) {
    pthread_t t;
    pthread_create(&t, NULL, worker, NULL);
    void *retval;
    pthread_join(t, &retval);
    printf("Thread returned: %ld\\n", (long)retval);
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

void *worker(void *arg) {
    printf("Thread working...\\n");
    pthread_exit((void *)42);
}

int main(void) {
    pthread_t t;
    pthread_create(&t, NULL, worker, NULL);
    void *retval;
    pthread_join(t, &retval);
    printf("Thread returned: %ld\\n", (long)retval);
    return 0;
}`,
      hints: [
        'pthread_exit terminates the calling thread with a return value.',
        'The value is passed as void * and retrieved via pthread_join.',
        'Unlike return, pthread_exit can be called from nested functions.',
      ],
      concepts: ['pthread_exit', 'thread-termination', 'return-value'],
    },
    {
      id: 'c-thread-11',
      title: 'Write a thread-safe flag',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a simple producer-consumer: main thread sets a shared flag, worker thread waits for it. Use a volatile int and a busy-wait (mutex version comes in next section).',
      skeleton: `#include <pthread.h>
#include <stdio.h>
#include <unistd.h>

// Write shared state and thread function

int main(void) {
    // Start worker, sleep, set flag, join worker
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>
#include <unistd.h>

volatile int ready = 0;

void *waiter(void *arg) {
    printf("Worker waiting...\\n");
    while (!ready) {
        // busy wait
    }
    printf("Worker got signal!\\n");
    return NULL;
}

int main(void) {
    pthread_t t;
    pthread_create(&t, NULL, waiter, NULL);
    usleep(100000);  // 100ms
    ready = 1;
    pthread_join(t, NULL);
    printf("Done\\n");
    return 0;
}`,
      hints: [
        'volatile prevents the compiler from optimizing out the flag check.',
        'This is a simple but inefficient approach -- busy waiting wastes CPU.',
        'Proper synchronization uses mutexes and condition variables (next section).',
      ],
      concepts: ['volatile', 'busy-wait', 'thread-communication'],
    },
    {
      id: 'c-thread-12',
      title: 'Write parallel array initialization',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write code that uses N threads to initialize different segments of a large array. Each thread sets its segment to its thread index.',
      skeleton: `#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

#define ARRAY_SIZE 1000
#define NUM_THREADS 4

// Write thread function and parallel init logic

int main(void) {
    // Allocate array, spawn threads to init segments, verify
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

#define ARRAY_SIZE 1000
#define NUM_THREADS 4

typedef struct {
    int *arr;
    int start;
    int end;
    int value;
} InitTask;

void *init_segment(void *arg) {
    InitTask *task = (InitTask *)arg;
    for (int i = task->start; i < task->end; i++) {
        task->arr[i] = task->value;
    }
    return NULL;
}

int main(void) {
    int *arr = malloc(ARRAY_SIZE * sizeof(int));
    pthread_t threads[NUM_THREADS];
    InitTask tasks[NUM_THREADS];
    int chunk = ARRAY_SIZE / NUM_THREADS;

    for (int i = 0; i < NUM_THREADS; i++) {
        tasks[i].arr = arr;
        tasks[i].start = i * chunk;
        tasks[i].end = (i == NUM_THREADS - 1) ? ARRAY_SIZE : (i + 1) * chunk;
        tasks[i].value = i;
        pthread_create(&threads[i], NULL, init_segment, &tasks[i]);
    }

    for (int i = 0; i < NUM_THREADS; i++) {
        pthread_join(threads[i], NULL);
    }

    // Verify
    printf("arr[0]=%d arr[%d]=%d arr[%d]=%d\\n",
        arr[0], chunk, arr[chunk], ARRAY_SIZE-1, arr[ARRAY_SIZE-1]);
    free(arr);
    return 0;
}`,
      hints: [
        'Divide the array into NUM_THREADS segments.',
        'The last thread handles any remainder elements.',
        'Each thread operates on a disjoint segment so no synchronization is needed.',
      ],
      concepts: ['data-parallelism', 'thread-partitioning', 'parallel-init'],
    },
    {
      id: 'c-thread-13',
      title: 'Bug: passing stack variable to thread',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the bug where all threads receive the same value because the loop variable changes before threads read it.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

#define N 4

void *print_id(void *arg) {
    int id = *(int *)arg;  // BUG: arg points to shared loop variable
    printf("Thread %d\\n", id);
    return NULL;
}

int main(void) {
    pthread_t threads[N];
    for (int i = 0; i < N; i++) {
        pthread_create(&threads[i], NULL, print_id, &i);
    }
    for (int i = 0; i < N; i++) {
        pthread_join(threads[i], NULL);
    }
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>

#define N 4

void *print_id(void *arg) {
    int id = *(int *)arg;
    printf("Thread %d\\n", id);
    return NULL;
}

int main(void) {
    pthread_t threads[N];
    int ids[N];
    for (int i = 0; i < N; i++) {
        ids[i] = i;
        pthread_create(&threads[i], NULL, print_id, &ids[i]);
    }
    for (int i = 0; i < N; i++) {
        pthread_join(threads[i], NULL);
    }
    return 0;
}`,
      hints: [
        'All threads point to &i, which changes every iteration.',
        'Use a separate array so each thread has its own stable copy.',
        'This is the most common pthread beginner mistake.',
      ],
      concepts: ['race-condition', 'argument-passing', 'thread-safety'],
    },
    {
      id: 'c-thread-14',
      title: 'Bug: returning local variable from thread',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the thread that returns a pointer to a local variable, which is destroyed when the thread exits.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

void *compute(void *arg) {
    int result = 42;
    return &result;  // BUG: local variable
}

int main(void) {
    pthread_t t;
    pthread_create(&t, NULL, compute, NULL);
    void *ret;
    pthread_join(t, &ret);
    printf("Result: %d\\n", *(int *)ret);
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

void *compute(void *arg) {
    int *result = malloc(sizeof(int));
    *result = 42;
    return result;
}

int main(void) {
    pthread_t t;
    pthread_create(&t, NULL, compute, NULL);
    void *ret;
    pthread_join(t, &ret);
    printf("Result: %d\\n", *(int *)ret);
    free(ret);
    return 0;
}`,
      hints: [
        'Local variables are on the thread stack -- destroyed when thread exits.',
        'Allocate return values on the heap with malloc.',
        'The caller must free the returned pointer.',
      ],
      concepts: ['stack-vs-heap', 'dangling-pointer', 'thread-return-value'],
    },
    {
      id: 'c-thread-15',
      title: 'Bug: missing pthread_join causes early exit',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the program where main exits before the thread finishes, causing the thread output to be lost.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

void *slow_task(void *arg) {
    printf("Starting slow task...\\n");
    // simulate work
    for (volatile int i = 0; i < 100000000; i++) {}
    printf("Slow task complete!\\n");
    return NULL;
}

int main(void) {
    pthread_t t;
    pthread_create(&t, NULL, slow_task, NULL);
    // BUG: main returns immediately
    printf("Main done\\n");
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>

void *slow_task(void *arg) {
    printf("Starting slow task...\\n");
    // simulate work
    for (volatile int i = 0; i < 100000000; i++) {}
    printf("Slow task complete!\\n");
    return NULL;
}

int main(void) {
    pthread_t t;
    pthread_create(&t, NULL, slow_task, NULL);
    printf("Main waiting...\\n");
    pthread_join(t, NULL);
    printf("Main done\\n");
    return 0;
}`,
      hints: [
        'When main returns, all threads are terminated.',
        'pthread_join blocks until the thread finishes.',
        'Always join or detach threads before main exits.',
      ],
      concepts: ['pthread_join', 'process-termination', 'thread-lifecycle'],
    },
    {
      id: 'c-thread-16',
      title: 'Predict: thread execution order',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict what is guaranteed about the output.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

void *greet(void *arg) {
    printf("Hello ");
    return NULL;
}

int main(void) {
    pthread_t t;
    pthread_create(&t, NULL, greet, NULL);
    pthread_join(t, NULL);
    printf("World\\n");
    return 0;
}`,
      solution: `Hello World`,
      hints: [
        'pthread_join ensures the thread finishes before continuing.',
        'So "Hello " is guaranteed to print before "World".',
        'Without join, the order would be unpredictable.',
      ],
      concepts: ['pthread_join', 'execution-order', 'synchronization'],
    },
    {
      id: 'c-thread-17',
      title: 'Predict: thread return value',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output from retrieving a thread return value.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

void *compute(void *arg) {
    return (void *)99;
}

int main(void) {
    pthread_t t;
    pthread_create(&t, NULL, compute, NULL);
    void *ret;
    pthread_join(t, &ret);
    printf("%ld\\n", (long)ret);
    return 0;
}`,
      solution: `99`,
      hints: [
        'The thread returns (void *)99 -- an integer cast to pointer.',
        'pthread_join stores this in ret.',
        'Casting ret back to long gives 99.',
      ],
      concepts: ['pthread_join', 'return-value', 'void-pointer-cast'],
    },
    {
      id: 'c-thread-18',
      title: 'Predict: multiple threads output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the guaranteed output. Threads 0 and 1 run concurrently but are joined in order.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

void *worker(void *arg) {
    int id = *(int *)arg;
    return (void *)(long)(id * 10);
}

int main(void) {
    pthread_t t[2];
    int ids[] = {3, 7};
    pthread_create(&t[0], NULL, worker, &ids[0]);
    pthread_create(&t[1], NULL, worker, &ids[1]);

    void *r0, *r1;
    pthread_join(t[0], &r0);
    pthread_join(t[1], &r1);
    printf("%ld %ld\\n", (long)r0, (long)r1);
    return 0;
}`,
      solution: `30 70`,
      hints: [
        'Thread 0 computes 3 * 10 = 30, thread 1 computes 7 * 10 = 70.',
        'Each thread has its own ids entry, so no race condition.',
        'Join order matches creation order, so output is 30 70.',
      ],
      concepts: ['pthread_join', 'parallel-computation', 'return-values'],
    },
    {
      id: 'c-thread-19',
      title: 'Refactor: sequential to parallel',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor the sequential processing of two independent tasks into parallel execution using threads.',
      skeleton: `#include <stdio.h>
#include <unistd.h>

int task_a(void) {
    // simulate work
    usleep(100000);
    return 10;
}

int task_b(void) {
    usleep(100000);
    return 20;
}

int main(void) {
    int a = task_a();
    int b = task_b();
    printf("Total: %d\\n", a + b);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <unistd.h>
#include <pthread.h>

void *task_a(void *arg) {
    usleep(100000);
    return (void *)10;
}

void *task_b(void *arg) {
    usleep(100000);
    return (void *)20;
}

int main(void) {
    pthread_t ta, tb;
    pthread_create(&ta, NULL, task_a, NULL);
    pthread_create(&tb, NULL, task_b, NULL);

    void *ra, *rb;
    pthread_join(ta, &ra);
    pthread_join(tb, &rb);
    printf("Total: %ld\\n", (long)ra + (long)rb);
    return 0;
}`,
      hints: [
        'Change function signatures to void *func(void *) for pthread compatibility.',
        'Return values as void * casts and retrieve via pthread_join.',
        'Both tasks run simultaneously, halving total execution time.',
      ],
      concepts: ['parallelism', 'refactoring', 'pthread_create', 'performance'],
    },
    {
      id: 'c-thread-20',
      title: 'Refactor: global state to per-thread state',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor the code from using a global counter (unsafe with threads) to per-thread counters that are summed after joining.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

#define NUM_THREADS 4
#define ITERS 1000

int global_count = 0;  // UNSAFE: unsynchronized global

void *counter(void *arg) {
    for (int i = 0; i < ITERS; i++) {
        global_count++;  // race condition
    }
    return NULL;
}

int main(void) {
    pthread_t threads[NUM_THREADS];
    for (int i = 0; i < NUM_THREADS; i++) {
        pthread_create(&threads[i], NULL, counter, NULL);
    }
    for (int i = 0; i < NUM_THREADS; i++) {
        pthread_join(threads[i], NULL);
    }
    printf("Count: %d\\n", global_count);
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>

#define NUM_THREADS 4
#define ITERS 1000

void *counter(void *arg) {
    long local_count = 0;
    for (int i = 0; i < ITERS; i++) {
        local_count++;
    }
    return (void *)local_count;
}

int main(void) {
    pthread_t threads[NUM_THREADS];
    for (int i = 0; i < NUM_THREADS; i++) {
        pthread_create(&threads[i], NULL, counter, NULL);
    }

    long total = 0;
    for (int i = 0; i < NUM_THREADS; i++) {
        void *ret;
        pthread_join(threads[i], &ret);
        total += (long)ret;
    }
    printf("Count: %ld\\n", total);
    return 0;
}`,
      hints: [
        'Each thread maintains its own local counter -- no shared state.',
        'Return the local count via the thread return value.',
        'Sum all per-thread counts after joining -- safe and race-free.',
      ],
      concepts: ['thread-safety', 'per-thread-state', 'refactoring', 'race-condition'],
    },
  ],
};
