import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-mutex',
  title: '41. Mutexes & Semaphores',
  explanation: `## Mutexes & Semaphores

Mutexes and semaphores are synchronization primitives that protect shared data from concurrent access.

\`\`\`c
#include <pthread.h>

pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
int shared_counter = 0;

void *increment(void *arg) {
    for (int i = 0; i < 100000; i++) {
        pthread_mutex_lock(&lock);
        shared_counter++;
        pthread_mutex_unlock(&lock);
    }
    return NULL;
}

// Condition variables for signaling between threads:
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;

void *consumer(void *arg) {
    pthread_mutex_lock(&lock);
    while (!data_ready)
        pthread_cond_wait(&cond, &lock);  // atomically unlock + wait
    // process data
    pthread_mutex_unlock(&lock);
    return NULL;
}
\`\`\`

### Key Concepts
- **Mutex**: mutual exclusion lock -- only one thread can hold it at a time
- **pthread_mutex_lock/unlock**: acquire and release the mutex
- **PTHREAD_MUTEX_INITIALIZER**: static initialization for mutexes
- **Condition variable**: allows threads to wait for a condition to become true
- **pthread_cond_wait**: atomically releases mutex and waits for signal
- **Semaphore**: counting synchronization primitive (sem_wait/sem_post)
- **Deadlock**: two threads each waiting for the other's lock
`,
  exercises: [
    {
      id: 'c-mutex-1',
      title: 'Initialize a mutex',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Statically initialize a mutex using the initializer macro.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

pthread_mutex_t lock = __BLANK__;
int counter = 0;

void *inc(void *arg) {
    pthread_mutex_lock(&lock);
    counter++;
    pthread_mutex_unlock(&lock);
    return NULL;
}

int main(void) {
    pthread_t t1, t2;
    pthread_create(&t1, NULL, inc, NULL);
    pthread_create(&t2, NULL, inc, NULL);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    printf("Counter: %d\\n", counter);
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>

pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
int counter = 0;

void *inc(void *arg) {
    pthread_mutex_lock(&lock);
    counter++;
    pthread_mutex_unlock(&lock);
    return NULL;
}

int main(void) {
    pthread_t t1, t2;
    pthread_create(&t1, NULL, inc, NULL);
    pthread_create(&t2, NULL, inc, NULL);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    printf("Counter: %d\\n", counter);
    return 0;
}`,
      hints: [
        'PTHREAD_MUTEX_INITIALIZER is a macro for static mutex initialization.',
        'Alternative: pthread_mutex_init(&lock, NULL) for dynamic init.',
        'Static initialization is simpler for global/file-scope mutexes.',
      ],
      concepts: ['PTHREAD_MUTEX_INITIALIZER', 'mutex', 'static-init'],
    },
    {
      id: 'c-mutex-2',
      title: 'Lock and unlock',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Add the correct lock and unlock calls to protect the critical section.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

pthread_mutex_t mtx = PTHREAD_MUTEX_INITIALIZER;
int balance = 1000;

void *withdraw(void *arg) {
    int amount = *(int *)arg;
    __BLANK__(&mtx);
    if (balance >= amount) {
        balance -= amount;
        printf("Withdrew %d, balance: %d\\n", amount, balance);
    }
    __BLANK__(&mtx);
    return NULL;
}

int main(void) {
    int a1 = 300, a2 = 500;
    pthread_t t1, t2;
    pthread_create(&t1, NULL, withdraw, &a1);
    pthread_create(&t2, NULL, withdraw, &a2);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    printf("Final balance: %d\\n", balance);
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>

pthread_mutex_t mtx = PTHREAD_MUTEX_INITIALIZER;
int balance = 1000;

void *withdraw(void *arg) {
    int amount = *(int *)arg;
    pthread_mutex_lock(&mtx);
    if (balance >= amount) {
        balance -= amount;
        printf("Withdrew %d, balance: %d\\n", amount, balance);
    }
    pthread_mutex_unlock(&mtx);
    return NULL;
}

int main(void) {
    int a1 = 300, a2 = 500;
    pthread_t t1, t2;
    pthread_create(&t1, NULL, withdraw, &a1);
    pthread_create(&t2, NULL, withdraw, &a2);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    printf("Final balance: %d\\n", balance);
    return 0;
}`,
      hints: [
        'pthread_mutex_lock acquires the mutex; blocks if already held.',
        'pthread_mutex_unlock releases the mutex for other threads.',
        'The check-and-modify must be atomic -- both inside the lock.',
      ],
      concepts: ['pthread_mutex_lock', 'pthread_mutex_unlock', 'critical-section'],
    },
    {
      id: 'c-mutex-3',
      title: 'Condition variable wait',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use pthread_cond_wait to block until data is ready.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;
int ready = 0;

void *consumer(void *arg) {
    pthread_mutex_lock(&lock);
    while (!ready) {
        __BLANK__(&cond, &lock);
    }
    printf("Data consumed!\\n");
    pthread_mutex_unlock(&lock);
    return NULL;
}

void *producer(void *arg) {
    pthread_mutex_lock(&lock);
    ready = 1;
    pthread_cond_signal(&cond);
    pthread_mutex_unlock(&lock);
    return NULL;
}

int main(void) {
    pthread_t c, p;
    pthread_create(&c, NULL, consumer, NULL);
    pthread_create(&p, NULL, producer, NULL);
    pthread_join(c, NULL);
    pthread_join(p, NULL);
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>

pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;
int ready = 0;

void *consumer(void *arg) {
    pthread_mutex_lock(&lock);
    while (!ready) {
        pthread_cond_wait(&cond, &lock);
    }
    printf("Data consumed!\\n");
    pthread_mutex_unlock(&lock);
    return NULL;
}

void *producer(void *arg) {
    pthread_mutex_lock(&lock);
    ready = 1;
    pthread_cond_signal(&cond);
    pthread_mutex_unlock(&lock);
    return NULL;
}

int main(void) {
    pthread_t c, p;
    pthread_create(&c, NULL, consumer, NULL);
    pthread_create(&p, NULL, producer, NULL);
    pthread_join(c, NULL);
    pthread_join(p, NULL);
    return 0;
}`,
      hints: [
        'pthread_cond_wait atomically releases the mutex and waits.',
        'When signaled, it re-acquires the mutex before returning.',
        'Always use while(!condition) -- spurious wakeups can occur.',
      ],
      concepts: ['pthread_cond_wait', 'condition-variable', 'spurious-wakeup'],
    },
    {
      id: 'c-mutex-4',
      title: 'Semaphore init and wait',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Initialize a semaphore with value 1 and use it for mutual exclusion.',
      skeleton: `#include <pthread.h>
#include <semaphore.h>
#include <stdio.h>

sem_t sem;
int shared = 0;

void *worker(void *arg) {
    for (int i = 0; i < 10000; i++) {
        __BLANK__(&sem);
        shared++;
        sem_post(&sem);
    }
    return NULL;
}

int main(void) {
    __BLANK__(&sem, 0, 1);
    pthread_t t1, t2;
    pthread_create(&t1, NULL, worker, NULL);
    pthread_create(&t2, NULL, worker, NULL);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    printf("Shared: %d\\n", shared);
    sem_destroy(&sem);
    return 0;
}`,
      solution: `#include <pthread.h>
#include <semaphore.h>
#include <stdio.h>

sem_t sem;
int shared = 0;

void *worker(void *arg) {
    for (int i = 0; i < 10000; i++) {
        sem_wait(&sem);
        shared++;
        sem_post(&sem);
    }
    return NULL;
}

int main(void) {
    sem_init(&sem, 0, 1);
    pthread_t t1, t2;
    pthread_create(&t1, NULL, worker, NULL);
    pthread_create(&t2, NULL, worker, NULL);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    printf("Shared: %d\\n", shared);
    sem_destroy(&sem);
    return 0;
}`,
      hints: [
        'sem_init(&sem, 0, 1) initializes a process-local semaphore with value 1.',
        'sem_wait decrements the semaphore (blocks if 0).',
        'sem_post increments the semaphore (wakes a waiter).',
      ],
      concepts: ['semaphore', 'sem_init', 'sem_wait', 'sem_post'],
    },
    {
      id: 'c-mutex-5',
      title: 'Dynamic mutex init and destroy',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use pthread_mutex_init and pthread_mutex_destroy for dynamic mutex lifecycle.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

int main(void) {
    pthread_mutex_t mtx;
    __BLANK__(&mtx, NULL);

    pthread_mutex_lock(&mtx);
    printf("Critical section\\n");
    pthread_mutex_unlock(&mtx);

    __BLANK__(&mtx);
    printf("Mutex destroyed\\n");
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>

int main(void) {
    pthread_mutex_t mtx;
    pthread_mutex_init(&mtx, NULL);

    pthread_mutex_lock(&mtx);
    printf("Critical section\\n");
    pthread_mutex_unlock(&mtx);

    pthread_mutex_destroy(&mtx);
    printf("Mutex destroyed\\n");
    return 0;
}`,
      hints: [
        'pthread_mutex_init initializes a mutex with optional attributes.',
        'pthread_mutex_destroy releases any resources held by the mutex.',
        'The mutex must be unlocked before destroying.',
      ],
      concepts: ['pthread_mutex_init', 'pthread_mutex_destroy', 'lifecycle'],
    },
    {
      id: 'c-mutex-6',
      title: 'Condition broadcast',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Use pthread_cond_broadcast to wake all waiting threads.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;
int go = 0;

void *racer(void *arg) {
    int id = *(int *)arg;
    pthread_mutex_lock(&lock);
    while (!go) pthread_cond_wait(&cond, &lock);
    pthread_mutex_unlock(&lock);
    printf("Racer %d started!\\n", id);
    return NULL;
}

int main(void) {
    pthread_t t[3];
    int ids[] = {1, 2, 3};
    for (int i = 0; i < 3; i++)
        pthread_create(&t[i], NULL, racer, &ids[i]);

    pthread_mutex_lock(&lock);
    go = 1;
    __BLANK__(&cond);
    pthread_mutex_unlock(&lock);

    for (int i = 0; i < 3; i++) pthread_join(t[i], NULL);
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>

pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;
int go = 0;

void *racer(void *arg) {
    int id = *(int *)arg;
    pthread_mutex_lock(&lock);
    while (!go) pthread_cond_wait(&cond, &lock);
    pthread_mutex_unlock(&lock);
    printf("Racer %d started!\\n", id);
    return NULL;
}

int main(void) {
    pthread_t t[3];
    int ids[] = {1, 2, 3};
    for (int i = 0; i < 3; i++)
        pthread_create(&t[i], NULL, racer, &ids[i]);

    pthread_mutex_lock(&lock);
    go = 1;
    pthread_cond_broadcast(&cond);
    pthread_mutex_unlock(&lock);

    for (int i = 0; i < 3; i++) pthread_join(t[i], NULL);
    return 0;
}`,
      hints: [
        'pthread_cond_signal wakes ONE waiting thread.',
        'pthread_cond_broadcast wakes ALL waiting threads.',
        'Use broadcast when multiple threads need to proceed.',
      ],
      concepts: ['pthread_cond_broadcast', 'condition-variable', 'thread-coordination'],
    },
    {
      id: 'c-mutex-7',
      title: 'Write a thread-safe counter',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a thread-safe counter module with functions: counter_init(), counter_inc(), counter_get(), counter_destroy(). Use a mutex to protect the counter.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

// Write thread-safe counter module here

void *worker(void *arg) {
    for (int i = 0; i < 100000; i++) counter_inc();
    return NULL;
}

int main(void) {
    counter_init();
    pthread_t t1, t2;
    pthread_create(&t1, NULL, worker, NULL);
    pthread_create(&t2, NULL, worker, NULL);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    printf("Count: %d\\n", counter_get()); // must be 200000
    counter_destroy();
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>

static pthread_mutex_t cnt_lock;
static int cnt_value = 0;

void counter_init(void) {
    pthread_mutex_init(&cnt_lock, NULL);
    cnt_value = 0;
}

void counter_inc(void) {
    pthread_mutex_lock(&cnt_lock);
    cnt_value++;
    pthread_mutex_unlock(&cnt_lock);
}

int counter_get(void) {
    pthread_mutex_lock(&cnt_lock);
    int val = cnt_value;
    pthread_mutex_unlock(&cnt_lock);
    return val;
}

void counter_destroy(void) {
    pthread_mutex_destroy(&cnt_lock);
}

void *worker(void *arg) {
    for (int i = 0; i < 100000; i++) counter_inc();
    return NULL;
}

int main(void) {
    counter_init();
    pthread_t t1, t2;
    pthread_create(&t1, NULL, worker, NULL);
    pthread_create(&t2, NULL, worker, NULL);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    printf("Count: %d\\n", counter_get()); // must be 200000
    counter_destroy();
    return 0;
}`,
      hints: [
        'Protect every access to the shared counter with mutex lock/unlock.',
        'Even reads need the lock to ensure visibility of the latest value.',
        'Pair init and destroy for proper resource management.',
      ],
      concepts: ['mutex', 'thread-safety', 'encapsulation'],
    },
    {
      id: 'c-mutex-8',
      title: 'Write a producer-consumer queue',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a bounded queue with enqueue and dequeue using a mutex and two condition variables (not_full, not_empty). Queue capacity is 5.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

#define CAPACITY 5

// Write bounded queue with mutex + condvars here

void *producer(void *arg) {
    for (int i = 0; i < 10; i++) {
        enqueue(i);
        printf("Produced: %d\\n", i);
    }
    return NULL;
}

void *consumer(void *arg) {
    for (int i = 0; i < 10; i++) {
        int val = dequeue();
        printf("Consumed: %d\\n", val);
    }
    return NULL;
}

int main(void) {
    queue_init();
    pthread_t p, c;
    pthread_create(&p, NULL, producer, NULL);
    pthread_create(&c, NULL, consumer, NULL);
    pthread_join(p, NULL);
    pthread_join(c, NULL);
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>

#define CAPACITY 5

static int buffer[CAPACITY];
static int count = 0, head = 0, tail = 0;
static pthread_mutex_t qlock;
static pthread_cond_t not_full, not_empty;

void queue_init(void) {
    pthread_mutex_init(&qlock, NULL);
    pthread_cond_init(&not_full, NULL);
    pthread_cond_init(&not_empty, NULL);
    count = head = tail = 0;
}

void enqueue(int val) {
    pthread_mutex_lock(&qlock);
    while (count == CAPACITY)
        pthread_cond_wait(&not_full, &qlock);
    buffer[tail] = val;
    tail = (tail + 1) % CAPACITY;
    count++;
    pthread_cond_signal(&not_empty);
    pthread_mutex_unlock(&qlock);
}

int dequeue(void) {
    pthread_mutex_lock(&qlock);
    while (count == 0)
        pthread_cond_wait(&not_empty, &qlock);
    int val = buffer[head];
    head = (head + 1) % CAPACITY;
    count--;
    pthread_cond_signal(&not_full);
    pthread_mutex_unlock(&qlock);
    return val;
}

void *producer(void *arg) {
    for (int i = 0; i < 10; i++) {
        enqueue(i);
        printf("Produced: %d\\n", i);
    }
    return NULL;
}

void *consumer(void *arg) {
    for (int i = 0; i < 10; i++) {
        int val = dequeue();
        printf("Consumed: %d\\n", val);
    }
    return NULL;
}

int main(void) {
    queue_init();
    pthread_t p, c;
    pthread_create(&p, NULL, producer, NULL);
    pthread_create(&c, NULL, consumer, NULL);
    pthread_join(p, NULL);
    pthread_join(c, NULL);
    return 0;
}`,
      hints: [
        'Use a circular buffer with head/tail pointers and a count.',
        'Producer waits on not_full, signals not_empty after adding.',
        'Consumer waits on not_empty, signals not_full after removing.',
      ],
      concepts: ['producer-consumer', 'condition-variable', 'bounded-buffer'],
    },
    {
      id: 'c-mutex-9',
      title: 'Write a readers-writers lock',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a simple readers-writers lock: multiple readers can hold the lock simultaneously, but writers need exclusive access. Implement rwlock_read_lock, rwlock_read_unlock, rwlock_write_lock, rwlock_write_unlock.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

// Write readers-writers lock implementation here

int shared_data = 0;

void *reader(void *arg) {
    int id = *(int *)arg;
    rwlock_read_lock();
    printf("Reader %d sees: %d\\n", id, shared_data);
    rwlock_read_unlock();
    return NULL;
}

void *writer(void *arg) {
    rwlock_write_lock();
    shared_data++;
    printf("Writer updated to: %d\\n", shared_data);
    rwlock_write_unlock();
    return NULL;
}

int main(void) {
    rwlock_init();
    int ids[] = {1, 2, 3};
    pthread_t r1, r2, r3, w;
    pthread_create(&w, NULL, writer, NULL);
    pthread_create(&r1, NULL, reader, &ids[0]);
    pthread_create(&r2, NULL, reader, &ids[1]);
    pthread_create(&r3, NULL, reader, &ids[2]);
    pthread_join(w, NULL);
    pthread_join(r1, NULL);
    pthread_join(r2, NULL);
    pthread_join(r3, NULL);
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>

static pthread_mutex_t rw_mtx;
static pthread_cond_t rw_cond;
static int readers = 0;
static int writer_active = 0;

void rwlock_init(void) {
    pthread_mutex_init(&rw_mtx, NULL);
    pthread_cond_init(&rw_cond, NULL);
    readers = 0;
    writer_active = 0;
}

void rwlock_read_lock(void) {
    pthread_mutex_lock(&rw_mtx);
    while (writer_active)
        pthread_cond_wait(&rw_cond, &rw_mtx);
    readers++;
    pthread_mutex_unlock(&rw_mtx);
}

void rwlock_read_unlock(void) {
    pthread_mutex_lock(&rw_mtx);
    readers--;
    if (readers == 0)
        pthread_cond_broadcast(&rw_cond);
    pthread_mutex_unlock(&rw_mtx);
}

void rwlock_write_lock(void) {
    pthread_mutex_lock(&rw_mtx);
    while (writer_active || readers > 0)
        pthread_cond_wait(&rw_cond, &rw_mtx);
    writer_active = 1;
    pthread_mutex_unlock(&rw_mtx);
}

void rwlock_write_unlock(void) {
    pthread_mutex_lock(&rw_mtx);
    writer_active = 0;
    pthread_cond_broadcast(&rw_cond);
    pthread_mutex_unlock(&rw_mtx);
}

int shared_data = 0;

void *reader(void *arg) {
    int id = *(int *)arg;
    rwlock_read_lock();
    printf("Reader %d sees: %d\\n", id, shared_data);
    rwlock_read_unlock();
    return NULL;
}

void *writer(void *arg) {
    rwlock_write_lock();
    shared_data++;
    printf("Writer updated to: %d\\n", shared_data);
    rwlock_write_unlock();
    return NULL;
}

int main(void) {
    rwlock_init();
    int ids[] = {1, 2, 3};
    pthread_t r1, r2, r3, w;
    pthread_create(&w, NULL, writer, NULL);
    pthread_create(&r1, NULL, reader, &ids[0]);
    pthread_create(&r2, NULL, reader, &ids[1]);
    pthread_create(&r3, NULL, reader, &ids[2]);
    pthread_join(w, NULL);
    pthread_join(r1, NULL);
    pthread_join(r2, NULL);
    pthread_join(r3, NULL);
    return 0;
}`,
      hints: [
        'Track active readers count and a writer_active flag.',
        'Readers wait if a writer is active; writers wait if anyone is active.',
        'Use broadcast to wake all waiters when releasing.',
      ],
      concepts: ['readers-writers', 'condition-variable', 'concurrent-access'],
    },
    {
      id: 'c-mutex-10',
      title: 'Write a semaphore-based rate limiter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write code using a semaphore initialized to 3, allowing at most 3 threads to enter a critical section simultaneously.',
      skeleton: `#include <pthread.h>
#include <semaphore.h>
#include <stdio.h>
#include <unistd.h>

#define NUM_THREADS 6

// Write rate-limited worker using semaphore

int main(void) {
    // Init semaphore to 3, spawn 6 threads, join all
    return 0;
}`,
      solution: `#include <pthread.h>
#include <semaphore.h>
#include <stdio.h>
#include <unistd.h>

#define NUM_THREADS 6

static sem_t slots;

void *worker(void *arg) {
    int id = *(int *)arg;
    sem_wait(&slots);
    printf("Thread %d entered (max 3 concurrent)\\n", id);
    usleep(100000);  // simulate work
    printf("Thread %d leaving\\n", id);
    sem_post(&slots);
    return NULL;
}

int main(void) {
    sem_init(&slots, 0, 3);
    pthread_t threads[NUM_THREADS];
    int ids[NUM_THREADS];
    for (int i = 0; i < NUM_THREADS; i++) {
        ids[i] = i;
        pthread_create(&threads[i], NULL, worker, &ids[i]);
    }
    for (int i = 0; i < NUM_THREADS; i++) {
        pthread_join(threads[i], NULL);
    }
    sem_destroy(&slots);
    return 0;
}`,
      hints: [
        'Initialize the semaphore to the max concurrent count (3).',
        'sem_wait decrements -- blocks when count reaches 0.',
        'sem_post increments -- wakes one blocked thread.',
      ],
      concepts: ['semaphore', 'rate-limiting', 'concurrency-control'],
    },
    {
      id: 'c-mutex-11',
      title: 'Write a thread barrier',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a simple barrier using a mutex and condition variable. All N threads must arrive at the barrier before any can proceed. Implement barrier_init(int n), barrier_wait().',
      skeleton: `#include <pthread.h>
#include <stdio.h>

#define NUM_THREADS 4

// Write barrier implementation here

void *worker(void *arg) {
    int id = *(int *)arg;
    printf("Thread %d phase 1\\n", id);
    barrier_wait();
    printf("Thread %d phase 2\\n", id);
    return NULL;
}

int main(void) {
    barrier_init(NUM_THREADS);
    pthread_t threads[NUM_THREADS];
    int ids[NUM_THREADS];
    for (int i = 0; i < NUM_THREADS; i++) {
        ids[i] = i;
        pthread_create(&threads[i], NULL, worker, &ids[i]);
    }
    for (int i = 0; i < NUM_THREADS; i++)
        pthread_join(threads[i], NULL);
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>

#define NUM_THREADS 4

static pthread_mutex_t bar_mtx;
static pthread_cond_t bar_cond;
static int bar_count = 0;
static int bar_total = 0;

void barrier_init(int n) {
    pthread_mutex_init(&bar_mtx, NULL);
    pthread_cond_init(&bar_cond, NULL);
    bar_count = 0;
    bar_total = n;
}

void barrier_wait(void) {
    pthread_mutex_lock(&bar_mtx);
    bar_count++;
    if (bar_count == bar_total) {
        bar_count = 0;
        pthread_cond_broadcast(&bar_cond);
    } else {
        while (bar_count != 0 && bar_count < bar_total)
            pthread_cond_wait(&bar_cond, &bar_mtx);
    }
    pthread_mutex_unlock(&bar_mtx);
}

void *worker(void *arg) {
    int id = *(int *)arg;
    printf("Thread %d phase 1\\n", id);
    barrier_wait();
    printf("Thread %d phase 2\\n", id);
    return NULL;
}

int main(void) {
    barrier_init(NUM_THREADS);
    pthread_t threads[NUM_THREADS];
    int ids[NUM_THREADS];
    for (int i = 0; i < NUM_THREADS; i++) {
        ids[i] = i;
        pthread_create(&threads[i], NULL, worker, &ids[i]);
    }
    for (int i = 0; i < NUM_THREADS; i++)
        pthread_join(threads[i], NULL);
    return 0;
}`,
      hints: [
        'Count arrivals -- the last thread broadcasts to wake all.',
        'Reset count to 0 when all threads have arrived.',
        'Use broadcast, not signal, to wake ALL waiting threads.',
      ],
      concepts: ['barrier', 'condition-variable', 'thread-synchronization'],
    },
    {
      id: 'c-mutex-12',
      title: 'Write a thread-safe linked list push',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a thread-safe singly linked list with list_push(int val) and list_print(). Use a mutex to protect all operations.',
      skeleton: `#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

// Write thread-safe list with mutex here

void *pusher(void *arg) {
    int base = *(int *)arg;
    for (int i = 0; i < 5; i++) list_push(base + i);
    return NULL;
}

int main(void) {
    list_init();
    int a = 0, b = 100;
    pthread_t t1, t2;
    pthread_create(&t1, NULL, pusher, &a);
    pthread_create(&t2, NULL, pusher, &b);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    list_print();
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

static Node *head = NULL;
static pthread_mutex_t list_mtx;

void list_init(void) {
    head = NULL;
    pthread_mutex_init(&list_mtx, NULL);
}

void list_push(int val) {
    Node *n = malloc(sizeof(Node));
    n->value = val;
    pthread_mutex_lock(&list_mtx);
    n->next = head;
    head = n;
    pthread_mutex_unlock(&list_mtx);
}

void list_print(void) {
    pthread_mutex_lock(&list_mtx);
    Node *cur = head;
    while (cur) {
        printf("%d ", cur->value);
        cur = cur->next;
    }
    printf("\\n");
    pthread_mutex_unlock(&list_mtx);
}

void *pusher(void *arg) {
    int base = *(int *)arg;
    for (int i = 0; i < 5; i++) list_push(base + i);
    return NULL;
}

int main(void) {
    list_init();
    int a = 0, b = 100;
    pthread_t t1, t2;
    pthread_create(&t1, NULL, pusher, &a);
    pthread_create(&t2, NULL, pusher, &b);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    list_print();
    return 0;
}`,
      hints: [
        'Lock the mutex before modifying head, unlock after.',
        'Allocate the node outside the lock to minimize critical section time.',
        'Only the pointer update (head assignment) needs to be locked.',
      ],
      concepts: ['mutex', 'linked-list', 'thread-safety'],
    },
    {
      id: 'c-mutex-13',
      title: 'Bug: missing unlock on error path',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the code that forgets to unlock the mutex when returning early on error.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
int data[10] = {0};

int safe_set(int index, int value) {
    pthread_mutex_lock(&lock);
    if (index < 0 || index >= 10) {
        return -1;  // BUG: mutex still locked!
    }
    data[index] = value;
    pthread_mutex_unlock(&lock);
    return 0;
}

int main(void) {
    safe_set(5, 42);
    safe_set(-1, 0);   // triggers bug
    safe_set(3, 10);    // deadlock here
    printf("data[5]=%d data[3]=%d\\n", data[5], data[3]);
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>

pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
int data[10] = {0};

int safe_set(int index, int value) {
    pthread_mutex_lock(&lock);
    if (index < 0 || index >= 10) {
        pthread_mutex_unlock(&lock);
        return -1;
    }
    data[index] = value;
    pthread_mutex_unlock(&lock);
    return 0;
}

int main(void) {
    safe_set(5, 42);
    safe_set(-1, 0);
    safe_set(3, 10);
    printf("data[5]=%d data[3]=%d\\n", data[5], data[3]);
    return 0;
}`,
      hints: [
        'Every code path that returns must unlock the mutex first.',
        'Early returns are a common source of missed unlocks.',
        'Consider using goto cleanup pattern for complex functions.',
      ],
      concepts: ['mutex', 'error-handling', 'deadlock-prevention'],
    },
    {
      id: 'c-mutex-14',
      title: 'Bug: lock ordering deadlock',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the deadlock caused by two threads locking two mutexes in opposite order.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

pthread_mutex_t lockA = PTHREAD_MUTEX_INITIALIZER;
pthread_mutex_t lockB = PTHREAD_MUTEX_INITIALIZER;

void *thread1(void *arg) {
    pthread_mutex_lock(&lockA);
    pthread_mutex_lock(&lockB);  // waits for thread2 to release B
    printf("Thread 1\\n");
    pthread_mutex_unlock(&lockB);
    pthread_mutex_unlock(&lockA);
    return NULL;
}

void *thread2(void *arg) {
    pthread_mutex_lock(&lockB);  // BUG: opposite order
    pthread_mutex_lock(&lockA);  // waits for thread1 to release A
    printf("Thread 2\\n");
    pthread_mutex_unlock(&lockA);
    pthread_mutex_unlock(&lockB);
    return NULL;
}

int main(void) {
    pthread_t t1, t2;
    pthread_create(&t1, NULL, thread1, NULL);
    pthread_create(&t2, NULL, thread2, NULL);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>

pthread_mutex_t lockA = PTHREAD_MUTEX_INITIALIZER;
pthread_mutex_t lockB = PTHREAD_MUTEX_INITIALIZER;

void *thread1(void *arg) {
    pthread_mutex_lock(&lockA);
    pthread_mutex_lock(&lockB);
    printf("Thread 1\\n");
    pthread_mutex_unlock(&lockB);
    pthread_mutex_unlock(&lockA);
    return NULL;
}

void *thread2(void *arg) {
    pthread_mutex_lock(&lockA);
    pthread_mutex_lock(&lockB);
    printf("Thread 2\\n");
    pthread_mutex_unlock(&lockB);
    pthread_mutex_unlock(&lockA);
    return NULL;
}

int main(void) {
    pthread_t t1, t2;
    pthread_create(&t1, NULL, thread1, NULL);
    pthread_create(&t2, NULL, thread2, NULL);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    return 0;
}`,
      hints: [
        'Deadlock occurs when threads lock mutexes in different orders.',
        'Fix: always acquire locks in the same global order (A before B).',
        'This is called the lock ordering discipline.',
      ],
      concepts: ['deadlock', 'lock-ordering', 'mutex'],
    },
    {
      id: 'c-mutex-15',
      title: 'Bug: condition variable without loop',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the code that uses if instead of while for the condition variable check, which is vulnerable to spurious wakeups.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;
int ready = 0;

void *consumer(void *arg) {
    pthread_mutex_lock(&lock);
    if (!ready) {  // BUG: should be while
        pthread_cond_wait(&cond, &lock);
    }
    printf("Consuming (ready=%d)\\n", ready);
    pthread_mutex_unlock(&lock);
    return NULL;
}

void *producer(void *arg) {
    pthread_mutex_lock(&lock);
    ready = 1;
    pthread_cond_signal(&cond);
    pthread_mutex_unlock(&lock);
    return NULL;
}

int main(void) {
    pthread_t c, p;
    pthread_create(&c, NULL, consumer, NULL);
    pthread_create(&p, NULL, producer, NULL);
    pthread_join(c, NULL);
    pthread_join(p, NULL);
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>

pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;
int ready = 0;

void *consumer(void *arg) {
    pthread_mutex_lock(&lock);
    while (!ready) {
        pthread_cond_wait(&cond, &lock);
    }
    printf("Consuming (ready=%d)\\n", ready);
    pthread_mutex_unlock(&lock);
    return NULL;
}

void *producer(void *arg) {
    pthread_mutex_lock(&lock);
    ready = 1;
    pthread_cond_signal(&cond);
    pthread_mutex_unlock(&lock);
    return NULL;
}

int main(void) {
    pthread_t c, p;
    pthread_create(&c, NULL, consumer, NULL);
    pthread_create(&p, NULL, producer, NULL);
    pthread_join(c, NULL);
    pthread_join(p, NULL);
    return 0;
}`,
      hints: [
        'pthread_cond_wait can wake up spuriously without a signal.',
        'Always re-check the condition in a while loop after waking.',
        'Using if instead of while can cause the thread to proceed when the condition is still false.',
      ],
      concepts: ['condition-variable', 'spurious-wakeup', 'while-loop'],
    },
    {
      id: 'c-mutex-16',
      title: 'Predict: mutex-protected counter',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the output of this mutex-protected counter.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

pthread_mutex_t m = PTHREAD_MUTEX_INITIALIZER;
int c = 0;

void *inc(void *arg) {
    for (int i = 0; i < 3; i++) {
        pthread_mutex_lock(&m);
        c++;
        pthread_mutex_unlock(&m);
    }
    return NULL;
}

int main(void) {
    pthread_t t1, t2;
    pthread_create(&t1, NULL, inc, NULL);
    pthread_create(&t2, NULL, inc, NULL);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    printf("%d\\n", c);
    return 0;
}`,
      solution: `6`,
      hints: [
        'The mutex ensures no increments are lost to race conditions.',
        'Each thread increments 3 times, so 2 * 3 = 6.',
        'Without the mutex, the result could be less than 6 due to races.',
      ],
      concepts: ['mutex', 'thread-safety', 'race-condition-prevention'],
    },
    {
      id: 'c-mutex-17',
      title: 'Predict: semaphore ordering',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the guaranteed output order using semaphores for synchronization.',
      skeleton: `#include <pthread.h>
#include <semaphore.h>
#include <stdio.h>

sem_t s;

void *second(void *arg) {
    sem_wait(&s);
    printf("B\\n");
    return NULL;
}

int main(void) {
    sem_init(&s, 0, 0);
    pthread_t t;
    pthread_create(&t, NULL, second, NULL);
    printf("A\\n");
    sem_post(&s);
    pthread_join(t, NULL);
    printf("C\\n");
    return 0;
}`,
      solution: `A
B
C`,
      hints: [
        'Semaphore starts at 0, so second() blocks on sem_wait.',
        'Main prints A, then sem_post unblocks second() which prints B.',
        'After join, main prints C. Order is guaranteed: A, B, C.',
      ],
      concepts: ['semaphore', 'ordering', 'synchronization'],
    },
    {
      id: 'c-mutex-18',
      title: 'Predict: condition variable signal',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict what the consumer prints.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

pthread_mutex_t m = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t cv = PTHREAD_COND_INITIALIZER;
int val = 0;

void *producer(void *arg) {
    pthread_mutex_lock(&m);
    val = 42;
    pthread_cond_signal(&cv);
    pthread_mutex_unlock(&m);
    return NULL;
}

void *consumer(void *arg) {
    pthread_mutex_lock(&m);
    while (val == 0)
        pthread_cond_wait(&cv, &m);
    printf("%d\\n", val);
    pthread_mutex_unlock(&m);
    return NULL;
}

int main(void) {
    pthread_t p, c;
    pthread_create(&c, NULL, consumer, NULL);
    pthread_create(&p, NULL, producer, NULL);
    pthread_join(p, NULL);
    pthread_join(c, NULL);
    return 0;
}`,
      solution: `42`,
      hints: [
        'Consumer waits until val != 0.',
        'Producer sets val to 42 and signals.',
        'Consumer wakes, sees val=42, prints 42.',
      ],
      concepts: ['condition-variable', 'producer-consumer', 'synchronization'],
    },
    {
      id: 'c-mutex-19',
      title: 'Refactor: add mutex to unsafe code',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor this race-condition-prone code to use a mutex for thread safety.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

int total = 0;

void *adder(void *arg) {
    int n = *(int *)arg;
    for (int i = 0; i < n; i++) {
        total++;  // RACE CONDITION
    }
    return NULL;
}

int main(void) {
    int count = 100000;
    pthread_t t1, t2;
    pthread_create(&t1, NULL, adder, &count);
    pthread_create(&t2, NULL, adder, &count);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    printf("Total: %d (expected %d)\\n", total, count * 2);
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>

int total = 0;
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

void *adder(void *arg) {
    int n = *(int *)arg;
    for (int i = 0; i < n; i++) {
        pthread_mutex_lock(&lock);
        total++;
        pthread_mutex_unlock(&lock);
    }
    return NULL;
}

int main(void) {
    int count = 100000;
    pthread_t t1, t2;
    pthread_create(&t1, NULL, adder, &count);
    pthread_create(&t2, NULL, adder, &count);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    printf("Total: %d (expected %d)\\n", total, count * 2);
    return 0;
}`,
      hints: [
        'Wrap the total++ operation with mutex lock/unlock.',
        'Without the mutex, both threads may read-modify-write simultaneously.',
        'The result without a mutex is unpredictable and usually less than expected.',
      ],
      concepts: ['mutex', 'race-condition', 'refactoring'],
    },
    {
      id: 'c-mutex-20',
      title: 'Refactor: busy-wait to condition variable',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor the CPU-wasting busy-wait loop into an efficient condition variable-based wait.',
      skeleton: `#include <pthread.h>
#include <stdio.h>

volatile int data_ready = 0;
int data = 0;

void *producer(void *arg) {
    data = 42;
    data_ready = 1;
    return NULL;
}

void *consumer(void *arg) {
    while (!data_ready) {
        // BUSY WAIT - wastes CPU
    }
    printf("Got: %d\\n", data);
    return NULL;
}

int main(void) {
    pthread_t p, c;
    pthread_create(&c, NULL, consumer, NULL);
    pthread_create(&p, NULL, producer, NULL);
    pthread_join(p, NULL);
    pthread_join(c, NULL);
    return 0;
}`,
      solution: `#include <pthread.h>
#include <stdio.h>

pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;
int data_ready = 0;
int data = 0;

void *producer(void *arg) {
    pthread_mutex_lock(&lock);
    data = 42;
    data_ready = 1;
    pthread_cond_signal(&cond);
    pthread_mutex_unlock(&lock);
    return NULL;
}

void *consumer(void *arg) {
    pthread_mutex_lock(&lock);
    while (!data_ready) {
        pthread_cond_wait(&cond, &lock);
    }
    printf("Got: %d\\n", data);
    pthread_mutex_unlock(&lock);
    return NULL;
}

int main(void) {
    pthread_t p, c;
    pthread_create(&c, NULL, consumer, NULL);
    pthread_create(&p, NULL, producer, NULL);
    pthread_join(p, NULL);
    pthread_join(c, NULL);
    return 0;
}`,
      hints: [
        'Replace volatile + busy-wait with mutex + condition variable.',
        'Consumer calls pthread_cond_wait which sleeps instead of spinning.',
        'Producer signals the condition variable after setting data.',
      ],
      concepts: ['condition-variable', 'busy-wait-elimination', 'refactoring'],
    },
  ],
};
