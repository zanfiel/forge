import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-concurrency-locks',
  title: '32. Concurrency: Locks',
  explanation: `## Concurrency: Locks

The java.util.concurrent.locks package provides advanced locking mechanisms.

### ReentrantLock
\`\`\`java
ReentrantLock lock = new ReentrantLock();
lock.lock();
try { /* critical section */ }
finally { lock.unlock(); }
\`\`\`

### Advantages over synchronized
- tryLock() with timeout
- Interruptible lock acquisition
- Fairness policy
- Multiple Conditions

### ReadWriteLock
\`\`\`java
ReadWriteLock rwLock = new ReentrantReadWriteLock();
rwLock.readLock().lock();    // multiple readers allowed
rwLock.writeLock().lock();   // exclusive access
\`\`\`

### Condition
\`\`\`java
Condition notEmpty = lock.newCondition();
notEmpty.await();    // like wait()
notEmpty.signal();   // like notify()
\`\`\`

### StampedLock (Java 8)
Optimistic read locking for read-heavy workloads.

### Best Practices
- Always unlock in finally block
- Prefer tryLock to avoid deadlocks
- Use ReadWriteLock for read-heavy access patterns
`,
  exercises: [
    {
      id: 'java-lock-1',
      title: 'Lock and unlock',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Properly lock and unlock a ReentrantLock.',
      skeleton: `ReentrantLock lock = new ReentrantLock();
lock.__BLANK__();
try {
    doWork();
} finally {
    lock.unlock();
}`,
      solution: `ReentrantLock lock = new ReentrantLock();
lock.lock();
try {
    doWork();
} finally {
    lock.unlock();
}`,
      hints: ['Acquire the lock before the try block.', 'Ensure unlock in finally.', 'Use `lock`.'],
      concepts: ['ReentrantLock', 'lock', 'try-finally'],
    },
    {
      id: 'java-lock-2',
      title: 'Try lock with timeout',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Attempt to acquire a lock with a timeout.',
      skeleton: `if (lock.__BLANK__(1, TimeUnit.SECONDS)) {
    try { doWork(); }
    finally { lock.unlock(); }
}`,
      solution: `if (lock.tryLock(1, TimeUnit.SECONDS)) {
    try { doWork(); }
    finally { lock.unlock(); }
}`,
      hints: ['This method attempts to acquire without blocking forever.', 'Returns boolean indicating success.', 'Use `tryLock`.'],
      concepts: ['tryLock', 'timeout', 'non-blocking'],
    },
    {
      id: 'java-lock-3',
      title: 'Read lock acquisition',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Acquire a read lock from a ReadWriteLock.',
      skeleton: `ReadWriteLock rwLock = new ReentrantReadWriteLock();
rwLock.__BLANK__().lock();
try { return data; }
finally { rwLock.readLock().unlock(); }`,
      solution: `ReadWriteLock rwLock = new ReentrantReadWriteLock();
rwLock.readLock().lock();
try { return data; }
finally { rwLock.readLock().unlock(); }`,
      hints: ['ReadWriteLock has separate read and write locks.', 'Multiple threads can hold the read lock.', 'Use `readLock`.'],
      concepts: ['ReadWriteLock', 'read lock', 'shared access'],
    },
    {
      id: 'java-lock-4',
      title: 'Condition await',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Wait on a Condition variable.',
      skeleton: `Condition notEmpty = lock.newCondition();
lock.lock();
try {
    while (queue.isEmpty()) {
        notEmpty.__BLANK__();
    }
} finally { lock.unlock(); }`,
      solution: `Condition notEmpty = lock.newCondition();
lock.lock();
try {
    while (queue.isEmpty()) {
        notEmpty.await();
    }
} finally { lock.unlock(); }`,
      hints: ['Condition provides wait/notify-like semantics.', 'The thread releases the lock and waits.', 'Use `await`.'],
      concepts: ['Condition.await', 'wait', 'lock condition'],
    },
    {
      id: 'java-lock-5',
      title: 'Condition signal',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Signal a waiting thread via Condition.',
      skeleton: `lock.lock();
try {
    queue.add(item);
    notEmpty.__BLANK__();
} finally { lock.unlock(); }`,
      solution: `lock.lock();
try {
    queue.add(item);
    notEmpty.signal();
} finally { lock.unlock(); }`,
      hints: ['Wake up one waiting thread.', 'Similar to notify().', 'Use `signal`.'],
      concepts: ['Condition.signal', 'notify', 'wake up'],
    },
    {
      id: 'java-lock-6',
      title: 'Fair lock',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Create a fair ReentrantLock that grants access in order.',
      skeleton: `ReentrantLock lock = new ReentrantLock(__BLANK__);`,
      solution: `ReentrantLock lock = new ReentrantLock(true);`,
      hints: ['Fair locks grant access in request order.', 'Pass a boolean to the constructor.', 'Use `true`.'],
      concepts: ['fair lock', 'FIFO ordering', 'ReentrantLock'],
    },
    {
      id: 'java-lock-7',
      title: 'Thread-safe cache with ReadWriteLock',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a thread-safe cache using ReadWriteLock with get and put methods.',
      skeleton: '',
      solution: `class Cache<K, V> {
    private final Map<K, V> map = new HashMap<>();
    private final ReadWriteLock rwLock = new ReentrantReadWriteLock();

    public V get(K key) {
        rwLock.readLock().lock();
        try {
            return map.get(key);
        } finally {
            rwLock.readLock().unlock();
        }
    }

    public void put(K key, V value) {
        rwLock.writeLock().lock();
        try {
            map.put(key, value);
        } finally {
            rwLock.writeLock().unlock();
        }
    }
}`,
      hints: ['Use read lock for get (allows concurrent reads).', 'Use write lock for put (exclusive access).', 'Always unlock in finally.'],
      concepts: ['ReadWriteLock', 'cache', 'concurrent reads'],
    },
    {
      id: 'java-lock-8',
      title: 'Bounded buffer with Conditions',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a bounded buffer using ReentrantLock with two Conditions: notFull and notEmpty.',
      skeleton: '',
      solution: `class BoundedBuffer<T> {
    private final Object[] items;
    private int count, putIdx, takeIdx;
    private final ReentrantLock lock = new ReentrantLock();
    private final Condition notFull = lock.newCondition();
    private final Condition notEmpty = lock.newCondition();

    public BoundedBuffer(int capacity) { items = new Object[capacity]; }

    public void put(T item) throws InterruptedException {
        lock.lock();
        try {
            while (count == items.length) notFull.await();
            items[putIdx] = item;
            putIdx = (putIdx + 1) % items.length;
            count++;
            notEmpty.signal();
        } finally { lock.unlock(); }
    }

    @SuppressWarnings("unchecked")
    public T take() throws InterruptedException {
        lock.lock();
        try {
            while (count == 0) notEmpty.await();
            T item = (T) items[takeIdx];
            takeIdx = (takeIdx + 1) % items.length;
            count--;
            notFull.signal();
            return item;
        } finally { lock.unlock(); }
    }
}`,
      hints: ['Use two Conditions for different wait reasons.', 'Await notFull when buffer is full, notEmpty when empty.', 'Signal the opposite condition after state change.'],
      concepts: ['Condition', 'bounded buffer', 'producer-consumer'],
    },
    {
      id: 'java-lock-9',
      title: 'TryLock deadlock prevention',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method that acquires two locks without deadlock using tryLock.',
      skeleton: '',
      solution: `static boolean acquireBothLocks(ReentrantLock lock1, ReentrantLock lock2) throws InterruptedException {
    while (true) {
        boolean gotFirst = lock1.tryLock(100, TimeUnit.MILLISECONDS);
        boolean gotSecond = false;
        try {
            if (gotFirst) {
                gotSecond = lock2.tryLock(100, TimeUnit.MILLISECONDS);
            }
        } finally {
            if (gotFirst && !gotSecond) {
                lock1.unlock();
            }
        }
        if (gotFirst && gotSecond) return true;
        Thread.sleep(10); // back off before retry
    }
}`,
      hints: ['Use tryLock with timeout to avoid permanent blocking.', 'If second lock fails, release the first.', 'Retry with a small backoff.'],
      concepts: ['tryLock', 'deadlock prevention', 'backoff'],
    },
    {
      id: 'java-lock-10',
      title: 'CountDownLatch synchronization',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write code that starts 3 worker threads and waits for all to complete using CountDownLatch.',
      skeleton: '',
      solution: `static void runWithLatch() throws InterruptedException {
    CountDownLatch latch = new CountDownLatch(3);
    for (int i = 0; i < 3; i++) {
        int id = i;
        new Thread(() -> {
            try {
                System.out.println("Worker " + id + " done");
            } finally {
                latch.countDown();
            }
        }).start();
    }
    latch.await();
    System.out.println("All workers complete");
}`,
      hints: ['Initialize CountDownLatch with the number of workers.', 'Each worker calls countDown() when finished.', 'Main thread calls await() to wait for all.'],
      concepts: ['CountDownLatch', 'synchronization barrier', 'countDown'],
    },
    {
      id: 'java-lock-11',
      title: 'Semaphore rate limiting',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that uses a Semaphore to limit concurrent access to 3 threads.',
      skeleton: '',
      solution: `class RateLimiter {
    private final Semaphore semaphore = new Semaphore(3);

    public void access(Runnable task) throws InterruptedException {
        semaphore.acquire();
        try {
            task.run();
        } finally {
            semaphore.release();
        }
    }
}`,
      hints: ['Semaphore(3) allows 3 concurrent permits.', 'acquire() blocks until a permit is available.', 'Always release() in finally.'],
      concepts: ['Semaphore', 'rate limiting', 'permits'],
    },
    {
      id: 'java-lock-12',
      title: 'CyclicBarrier coordination',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write code that uses CyclicBarrier to synchronize 4 threads at a common point.',
      skeleton: '',
      solution: `static void barrierExample() throws Exception {
    CyclicBarrier barrier = new CyclicBarrier(4, () -> System.out.println("All arrived!"));
    for (int i = 0; i < 4; i++) {
        int id = i;
        new Thread(() -> {
            try {
                System.out.println("Thread " + id + " working...");
                Thread.sleep(id * 100);
                barrier.await();
                System.out.println("Thread " + id + " continues");
            } catch (Exception e) { e.printStackTrace(); }
        }).start();
    }
}`,
      hints: ['CyclicBarrier waits for all parties to call await().', 'The optional action runs when all arrive.', 'Each thread calls barrier.await().'],
      concepts: ['CyclicBarrier', 'synchronization point', 'barrier action'],
    },
    {
      id: 'java-lock-13',
      title: 'Unlock without lock',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the code that might call unlock without holding the lock.',
      skeleton: `ReentrantLock lock = new ReentrantLock();
try {
    lock.lock();
    doWork();
    lock.unlock(); // If doWork throws, unlock is skipped
} catch (Exception e) {
    lock.unlock(); // May throw IllegalMonitorStateException
}`,
      solution: `ReentrantLock lock = new ReentrantLock();
lock.lock();
try {
    doWork();
} finally {
    lock.unlock();
}`,
      hints: ['Always use try-finally for lock/unlock.', 'Lock before try, unlock in finally.', 'This guarantees unlock even on exception.'],
      concepts: ['try-finally', 'lock pattern', 'exception safety'],
    },
    {
      id: 'java-lock-14',
      title: 'Lock inside try block',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the anti-pattern of calling lock() inside the try block.',
      skeleton: `try {
    lock.lock(); // If lock() fails, finally will call unlock on a lock we don't hold
    doWork();
} finally {
    lock.unlock();
}`,
      solution: `lock.lock();
try {
    doWork();
} finally {
    lock.unlock();
}`,
      hints: ['If lock() is inside try and fails, finally runs unlock.', 'Unlock on a non-held lock throws IllegalMonitorStateException.', 'Move lock() before try.'],
      concepts: ['lock placement', 'anti-pattern', 'IllegalMonitorStateException'],
    },
    {
      id: 'java-lock-15',
      title: 'Condition without while loop',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Fix the Condition.await that uses if instead of while, causing spurious wakeup issues.',
      skeleton: `lock.lock();
try {
    if (queue.isEmpty()) {
        notEmpty.await(); // may wake spuriously
    }
    process(queue.poll());
} finally { lock.unlock(); }`,
      solution: `lock.lock();
try {
    while (queue.isEmpty()) {
        notEmpty.await();
    }
    process(queue.poll());
} finally { lock.unlock(); }`,
      hints: ['Spurious wakeups can occur without actual signals.', 'Always re-check the condition after waking.', 'Use while instead of if.'],
      concepts: ['spurious wakeup', 'while loop', 'Condition'],
    },
    {
      id: 'java-lock-16',
      title: 'Predict ReentrantLock holdCount',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the hold count of a reentrant lock.',
      skeleton: `ReentrantLock lock = new ReentrantLock();
lock.lock();
lock.lock(); // reentrant
System.out.println(lock.getHoldCount());
lock.unlock();
System.out.println(lock.getHoldCount());`,
      solution: `2
1`,
      hints: ['ReentrantLock allows the same thread to lock multiple times.', 'Each lock increments the hold count.', 'Each unlock decrements it.'],
      concepts: ['reentrant', 'hold count', 'nested locking'],
    },
    {
      id: 'java-lock-17',
      title: 'Predict tryLock result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the tryLock behavior on an already-held lock.',
      skeleton: `ReentrantLock lock = new ReentrantLock();
lock.lock();
System.out.println(lock.tryLock()); // same thread, reentrant
lock.unlock();
lock.unlock();
System.out.println(lock.isLocked());`,
      solution: `true
false`,
      hints: ['ReentrantLock allows the same thread to acquire it again.', 'tryLock succeeds because the lock is reentrant.', 'After two unlocks, the lock is free.'],
      concepts: ['reentrant tryLock', 'isLocked', 'same thread'],
    },
    {
      id: 'java-lock-18',
      title: 'Predict CountDownLatch',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the behavior of a CountDownLatch.',
      skeleton: `CountDownLatch latch = new CountDownLatch(2);
latch.countDown();
System.out.println(latch.getCount());
latch.countDown();
System.out.println(latch.getCount());
latch.countDown(); // extra countDown
System.out.println(latch.getCount());`,
      solution: `1
0
0`,
      hints: ['countDown decrements from 2 to 0.', 'Extra countDown on 0 has no effect.', 'Count never goes below 0.'],
      concepts: ['CountDownLatch', 'countDown', 'minimum zero'],
    },
    {
      id: 'java-lock-19',
      title: 'Refactor synchronized to ReentrantLock',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor this synchronized block to use ReentrantLock.',
      skeleton: `private final Object monitor = new Object();

void doWork() {
    synchronized (monitor) {
        process();
    }
}`,
      solution: `private final ReentrantLock lock = new ReentrantLock();

void doWork() {
    lock.lock();
    try {
        process();
    } finally {
        lock.unlock();
    }
}`,
      hints: ['Replace the lock object with ReentrantLock.', 'Call lock() before try, unlock() in finally.', 'The try-finally pattern is required.'],
      concepts: ['ReentrantLock', 'synchronized replacement', 'refactoring'],
    },
    {
      id: 'java-lock-20',
      title: 'Refactor wait/notify to Condition',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor this wait/notify pattern to use Lock and Condition.',
      skeleton: `synchronized void put(Object item) throws InterruptedException {
    while (isFull()) wait();
    addItem(item);
    notifyAll();
}

synchronized Object take() throws InterruptedException {
    while (isEmpty()) wait();
    Object item = removeItem();
    notifyAll();
    return item;
}`,
      solution: `private final ReentrantLock lock = new ReentrantLock();
private final Condition notFull = lock.newCondition();
private final Condition notEmpty = lock.newCondition();

void put(Object item) throws InterruptedException {
    lock.lock();
    try {
        while (isFull()) notFull.await();
        addItem(item);
        notEmpty.signal();
    } finally { lock.unlock(); }
}

Object take() throws InterruptedException {
    lock.lock();
    try {
        while (isEmpty()) notEmpty.await();
        Object item = removeItem();
        notFull.signal();
        return item;
    } finally { lock.unlock(); }
}`,
      hints: ['Create separate Conditions for each wait reason.', 'signal() is more targeted than notifyAll().', 'Each Condition signals only the relevant waiters.'],
      concepts: ['Condition', 'wait/notify migration', 'targeted signaling'],
    },
  ],
};
