import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-signal',
  title: '38. Signal Handling',
  explanation: `## Signal Handling

Signals are software interrupts delivered to a process. They handle asynchronous events like Ctrl+C, timers, or illegal memory access.

\`\`\`c
#include <signal.h>
#include <stdio.h>

volatile sig_atomic_t got_signal = 0;

void handler(int sig) {
    got_signal = 1;  // only use sig_atomic_t + async-signal-safe ops
}

int main(void) {
    struct sigaction sa = { .sa_handler = handler };
    sigemptyset(&sa.sa_mask);
    sigaction(SIGINT, &sa, NULL);

    while (!got_signal) {
        // work...
    }
    printf("Caught signal, exiting.\\n");
    return 0;
}
\`\`\`

### Key Concepts
- **signal()**: simple signal registration (use sigaction for portability)
- **sigaction()**: POSIX-preferred way to install signal handlers
- **sig_atomic_t**: type safe to access in signal handlers (with volatile)
- **SIGINT**: interrupt from keyboard (Ctrl+C)
- **SIGTERM**: termination request
- **SIGALRM**: timer alarm via alarm()
- **raise()**: send a signal to the current process
- **Async-signal safety**: only certain functions are safe to call inside handlers
`,
  exercises: [
    {
      id: 'c-signal-1',
      title: 'Install a signal handler',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use signal() to install a handler for SIGINT.',
      skeleton: `#include <stdio.h>
#include <signal.h>

volatile sig_atomic_t quit = 0;

void handler(int sig) {
    quit = 1;
}

int main(void) {
    __BLANK__(SIGINT, handler);
    printf("Press Ctrl+C to exit...\\n");
    while (!quit) { }
    printf("Goodbye!\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <signal.h>

volatile sig_atomic_t quit = 0;

void handler(int sig) {
    quit = 1;
}

int main(void) {
    signal(SIGINT, handler);
    printf("Press Ctrl+C to exit...\\n");
    while (!quit) { }
    printf("Goodbye!\\n");
    return 0;
}`,
      hints: [
        'signal(signum, handler) registers a function for a given signal.',
        'SIGINT is the signal sent by Ctrl+C.',
        'The handler receives the signal number as its argument.',
      ],
      concepts: ['signal', 'SIGINT', 'signal-handler'],
    },
    {
      id: 'c-signal-2',
      title: 'Volatile sig_atomic_t',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Declare the flag variable with the correct type for safe use in a signal handler.',
      skeleton: `#include <stdio.h>
#include <signal.h>

__BLANK__ flag = 0;

void handler(int sig) {
    flag = 1;
}

int main(void) {
    signal(SIGTERM, handler);
    while (!flag) { }
    printf("Terminated.\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <signal.h>

volatile sig_atomic_t flag = 0;

void handler(int sig) {
    flag = 1;
}

int main(void) {
    signal(SIGTERM, handler);
    while (!flag) { }
    printf("Terminated.\\n");
    return 0;
}`,
      hints: [
        'sig_atomic_t is the only type guaranteed safe to access in signal handlers.',
        'volatile prevents the compiler from caching the value.',
        'Combine both: volatile sig_atomic_t.',
      ],
      concepts: ['sig_atomic_t', 'volatile', 'signal-safety'],
    },
    {
      id: 'c-signal-3',
      title: 'Raise a signal',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use raise() to send SIGINT to the current process.',
      skeleton: `#include <stdio.h>
#include <signal.h>

void handler(int sig) {
    printf("Caught signal %d\\n", sig);
}

int main(void) {
    signal(SIGINT, handler);
    printf("Before raise\\n");
    __BLANK__(SIGINT);
    printf("After raise\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <signal.h>

void handler(int sig) {
    printf("Caught signal %d\\n", sig);
}

int main(void) {
    signal(SIGINT, handler);
    printf("Before raise\\n");
    raise(SIGINT);
    printf("After raise\\n");
    return 0;
}`,
      hints: [
        'raise(sig) sends a signal to the calling process.',
        'It is equivalent to kill(getpid(), sig).',
        'The handler runs synchronously when raise is called.',
      ],
      concepts: ['raise', 'signal', 'self-signaling'],
    },
    {
      id: 'c-signal-4',
      title: 'Set an alarm',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use alarm() to schedule a SIGALRM after 2 seconds.',
      skeleton: `#include <stdio.h>
#include <signal.h>
#include <unistd.h>

volatile sig_atomic_t alarmed = 0;

void alarm_handler(int sig) {
    alarmed = 1;
}

int main(void) {
    signal(SIGALRM, alarm_handler);
    __BLANK__(2);
    printf("Waiting for alarm...\\n");
    while (!alarmed) {
        pause();
    }
    printf("Alarm fired!\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <signal.h>
#include <unistd.h>

volatile sig_atomic_t alarmed = 0;

void alarm_handler(int sig) {
    alarmed = 1;
}

int main(void) {
    signal(SIGALRM, alarm_handler);
    alarm(2);
    printf("Waiting for alarm...\\n");
    while (!alarmed) {
        pause();
    }
    printf("Alarm fired!\\n");
    return 0;
}`,
      hints: [
        'alarm(seconds) schedules a SIGALRM signal after the given seconds.',
        'pause() suspends the process until a signal is delivered.',
        'alarm(0) cancels any pending alarm.',
      ],
      concepts: ['alarm', 'SIGALRM', 'pause'],
    },
    {
      id: 'c-signal-5',
      title: 'sigaction setup',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Complete the sigaction structure setup to install a handler for SIGINT.',
      skeleton: `#include <stdio.h>
#include <signal.h>
#include <string.h>

volatile sig_atomic_t done = 0;

void handler(int sig) {
    done = 1;
}

int main(void) {
    struct sigaction sa;
    memset(&sa, 0, sizeof(sa));
    sa.__BLANK__ = handler;
    sigemptyset(&sa.sa_mask);
    sa.sa_flags = 0;
    sigaction(SIGINT, &sa, NULL);

    while (!done) { }
    printf("Done.\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <signal.h>
#include <string.h>

volatile sig_atomic_t done = 0;

void handler(int sig) {
    done = 1;
}

int main(void) {
    struct sigaction sa;
    memset(&sa, 0, sizeof(sa));
    sa.sa_handler = handler;
    sigemptyset(&sa.sa_mask);
    sa.sa_flags = 0;
    sigaction(SIGINT, &sa, NULL);

    while (!done) { }
    printf("Done.\\n");
    return 0;
}`,
      hints: [
        'The sa_handler field holds the signal handler function pointer.',
        'sigemptyset clears the signal mask so no signals are blocked during handling.',
        'sigaction is preferred over signal() for portability.',
      ],
      concepts: ['sigaction', 'sa_handler', 'signal-mask'],
    },
    {
      id: 'c-signal-6',
      title: 'Block a signal with sigprocmask',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Block SIGINT during a critical section using sigprocmask.',
      skeleton: `#include <stdio.h>
#include <signal.h>

int main(void) {
    sigset_t block_set, old_set;
    sigemptyset(&block_set);
    sigaddset(&block_set, SIGINT);

    // Block SIGINT
    __BLANK__(SIG_BLOCK, &block_set, &old_set);

    printf("SIGINT blocked -- critical section\\n");
    // ... critical work ...

    // Restore old mask
    sigprocmask(SIG_SETMASK, &old_set, NULL);
    printf("SIGINT unblocked\\n");

    return 0;
}`,
      solution: `#include <stdio.h>
#include <signal.h>

int main(void) {
    sigset_t block_set, old_set;
    sigemptyset(&block_set);
    sigaddset(&block_set, SIGINT);

    // Block SIGINT
    sigprocmask(SIG_BLOCK, &block_set, &old_set);

    printf("SIGINT blocked -- critical section\\n");
    // ... critical work ...

    // Restore old mask
    sigprocmask(SIG_SETMASK, &old_set, NULL);
    printf("SIGINT unblocked\\n");

    return 0;
}`,
      hints: [
        'sigprocmask changes the signal mask of the calling thread.',
        'SIG_BLOCK adds signals to the current mask.',
        'SIG_SETMASK replaces the mask entirely (used to restore).',
      ],
      concepts: ['sigprocmask', 'signal-mask', 'critical-section'],
    },
    {
      id: 'c-signal-7',
      title: 'Write a graceful shutdown handler',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a setup_signal_handlers() function that installs the same handler for both SIGINT and SIGTERM. The handler sets a global volatile sig_atomic_t running to 0.',
      skeleton: `#include <stdio.h>
#include <signal.h>

volatile sig_atomic_t running = 1;

// Write handler and setup_signal_handlers here

int main(void) {
    setup_signal_handlers();
    printf("Running... send SIGINT or SIGTERM to stop.\\n");
    while (running) { }
    printf("Shutting down gracefully.\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <signal.h>

volatile sig_atomic_t running = 1;

void shutdown_handler(int sig) {
    running = 0;
}

void setup_signal_handlers(void) {
    struct sigaction sa;
    sa.sa_handler = shutdown_handler;
    sigemptyset(&sa.sa_mask);
    sa.sa_flags = 0;
    sigaction(SIGINT, &sa, NULL);
    sigaction(SIGTERM, &sa, NULL);
}

int main(void) {
    setup_signal_handlers();
    printf("Running... send SIGINT or SIGTERM to stop.\\n");
    while (running) { }
    printf("Shutting down gracefully.\\n");
    return 0;
}`,
      hints: [
        'Create a handler that sets running to 0.',
        'Use sigaction to install it for both SIGINT and SIGTERM.',
        'volatile sig_atomic_t ensures safe access from the handler.',
      ],
      concepts: ['sigaction', 'graceful-shutdown', 'SIGINT', 'SIGTERM'],
    },
    {
      id: 'c-signal-8',
      title: 'Write a timeout mechanism',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function set_timeout(int seconds) that uses alarm() and SIGALRM to set a timeout. If the timeout fires, it sets a global timed_out flag.',
      skeleton: `#include <stdio.h>
#include <signal.h>
#include <unistd.h>

volatile sig_atomic_t timed_out = 0;

// Write set_timeout here (handler + setup)

int main(void) {
    set_timeout(1);
    printf("Doing work...\\n");
    while (!timed_out) {
        // simulate work
    }
    printf("Timed out!\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <signal.h>
#include <unistd.h>

volatile sig_atomic_t timed_out = 0;

static void timeout_handler(int sig) {
    timed_out = 1;
}

void set_timeout(int seconds) {
    struct sigaction sa;
    sa.sa_handler = timeout_handler;
    sigemptyset(&sa.sa_mask);
    sa.sa_flags = 0;
    sigaction(SIGALRM, &sa, NULL);
    alarm(seconds);
}

int main(void) {
    set_timeout(1);
    printf("Doing work...\\n");
    while (!timed_out) {
        // simulate work
    }
    printf("Timed out!\\n");
    return 0;
}`,
      hints: [
        'Install a SIGALRM handler that sets the timed_out flag.',
        'Call alarm(seconds) to schedule the signal delivery.',
        'Make the handler static since it is an internal detail.',
      ],
      concepts: ['alarm', 'SIGALRM', 'timeout', 'sigaction'],
    },
    {
      id: 'c-signal-9',
      title: 'Write a signal-safe counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a SIGUSR1 handler that increments a counter each time the signal is received. Write count_signals() to return the current count.',
      skeleton: `#include <stdio.h>
#include <signal.h>
#include <unistd.h>

// Write handler, setup, and count_signals here

int main(void) {
    setup_counter();
    raise(SIGUSR1);
    raise(SIGUSR1);
    raise(SIGUSR1);
    printf("Received %d signals\\n", count_signals()); // 3
    return 0;
}`,
      solution: `#include <stdio.h>
#include <signal.h>
#include <unistd.h>

static volatile sig_atomic_t signal_count = 0;

static void counter_handler(int sig) {
    signal_count++;
}

void setup_counter(void) {
    struct sigaction sa;
    sa.sa_handler = counter_handler;
    sigemptyset(&sa.sa_mask);
    sa.sa_flags = 0;
    sigaction(SIGUSR1, &sa, NULL);
}

int count_signals(void) {
    return signal_count;
}

int main(void) {
    setup_counter();
    raise(SIGUSR1);
    raise(SIGUSR1);
    raise(SIGUSR1);
    printf("Received %d signals\\n", count_signals()); // 3
    return 0;
}`,
      hints: [
        'Use volatile sig_atomic_t for the counter -- it is safe in handlers.',
        'sig_atomic_t supports atomic increment on most platforms.',
        'SIGUSR1 is a user-defined signal available for application use.',
      ],
      concepts: ['SIGUSR1', 'sig_atomic_t', 'signal-counting'],
    },
    {
      id: 'c-signal-10',
      title: 'Write sigaction with SA_RESTART',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write install_handler(int signum, void (*func)(int)) that uses sigaction with SA_RESTART flag so interrupted system calls are automatically restarted.',
      skeleton: `#include <stdio.h>
#include <signal.h>

// Write install_handler here

void my_handler(int sig) {
    // handler code
}

int main(void) {
    install_handler(SIGINT, my_handler);
    printf("Handler installed with SA_RESTART\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <signal.h>

int install_handler(int signum, void (*func)(int)) {
    struct sigaction sa;
    sa.sa_handler = func;
    sigemptyset(&sa.sa_mask);
    sa.sa_flags = SA_RESTART;
    return sigaction(signum, &sa, NULL);
}

void my_handler(int sig) {
    // handler code
}

int main(void) {
    install_handler(SIGINT, my_handler);
    printf("Handler installed with SA_RESTART\\n");
    return 0;
}`,
      hints: [
        'SA_RESTART tells the kernel to restart interrupted system calls.',
        'Without SA_RESTART, read/write/accept etc. return -1 with errno EINTR.',
        'Return the result of sigaction to propagate errors.',
      ],
      concepts: ['sigaction', 'SA_RESTART', 'EINTR', 'system-calls'],
    },
    {
      id: 'c-signal-11',
      title: 'Write a signal set builder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function block_signals(int count, ...) that takes a variadic list of signal numbers and blocks them all using sigprocmask. Return the old signal set via an output parameter.',
      skeleton: `#include <stdio.h>
#include <signal.h>
#include <stdarg.h>

// Write block_signals here

int main(void) {
    sigset_t old;
    block_signals(&old, 2, SIGINT, SIGTERM);
    printf("SIGINT and SIGTERM blocked\\n");
    // restore
    sigprocmask(SIG_SETMASK, &old, NULL);
    printf("Restored\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <signal.h>
#include <stdarg.h>

void block_signals(sigset_t *old_set, int count, ...) {
    sigset_t set;
    sigemptyset(&set);
    va_list args;
    va_start(args, count);
    for (int i = 0; i < count; i++) {
        sigaddset(&set, va_arg(args, int));
    }
    va_end(args);
    sigprocmask(SIG_BLOCK, &set, old_set);
}

int main(void) {
    sigset_t old;
    block_signals(&old, 2, SIGINT, SIGTERM);
    printf("SIGINT and SIGTERM blocked\\n");
    // restore
    sigprocmask(SIG_SETMASK, &old, NULL);
    printf("Restored\\n");
    return 0;
}`,
      hints: [
        'Build a signal set with sigemptyset + sigaddset for each signal.',
        'Use variadic arguments to accept any number of signals.',
        'Pass the old set to the caller so they can restore it later.',
      ],
      concepts: ['sigprocmask', 'variadic-functions', 'signal-sets'],
    },
    {
      id: 'c-signal-12',
      title: 'Write a child reaper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a SIGCHLD handler that reaps zombie children using waitpid in a loop. Install it with sigaction and SA_NOCLDSTOP.',
      skeleton: `#include <stdio.h>
#include <signal.h>
#include <sys/wait.h>
#include <unistd.h>

// Write SIGCHLD handler and setup here

int main(void) {
    setup_child_reaper();
    pid_t pid = fork();
    if (pid == 0) {
        _exit(0); // child exits immediately
    }
    sleep(1); // give time for SIGCHLD
    printf("Parent continues, no zombies.\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <signal.h>
#include <sys/wait.h>
#include <unistd.h>

static void sigchld_handler(int sig) {
    int saved_errno = errno;
    while (waitpid(-1, NULL, WNOHANG) > 0) {
        // reap all dead children
    }
    errno = saved_errno;
}

void setup_child_reaper(void) {
    struct sigaction sa;
    sa.sa_handler = sigchld_handler;
    sigemptyset(&sa.sa_mask);
    sa.sa_flags = SA_RESTART | SA_NOCLDSTOP;
    sigaction(SIGCHLD, &sa, NULL);
}

int main(void) {
    setup_child_reaper();
    pid_t pid = fork();
    if (pid == 0) {
        _exit(0); // child exits immediately
    }
    sleep(1); // give time for SIGCHLD
    printf("Parent continues, no zombies.\\n");
    return 0;
}`,
      hints: [
        'Use waitpid(-1, NULL, WNOHANG) in a loop to reap all dead children.',
        'Save and restore errno in the handler -- waitpid may change it.',
        'SA_NOCLDSTOP prevents SIGCHLD when children stop (only on exit).',
      ],
      concepts: ['SIGCHLD', 'waitpid', 'zombie-processes', 'SA_NOCLDSTOP'],
    },
    {
      id: 'c-signal-13',
      title: 'Bug: calling printf in signal handler',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the signal handler that unsafely calls printf (not async-signal-safe). Use write() instead.',
      skeleton: `#include <stdio.h>
#include <signal.h>
#include <unistd.h>
#include <string.h>

void handler(int sig) {
    printf("Caught signal %d\\n", sig);  // BUG: printf is not async-signal-safe
}

int main(void) {
    signal(SIGINT, handler);
    pause();
    return 0;
}`,
      solution: `#include <stdio.h>
#include <signal.h>
#include <unistd.h>
#include <string.h>

void handler(int sig) {
    const char msg[] = "Caught signal\\n";
    write(STDERR_FILENO, msg, sizeof(msg) - 1);
}

int main(void) {
    signal(SIGINT, handler);
    pause();
    return 0;
}`,
      hints: [
        'printf uses internal buffers and locks -- not safe in signal handlers.',
        'write() is async-signal-safe and can be used instead.',
        'Use STDERR_FILENO (2) for error output from handlers.',
      ],
      concepts: ['async-signal-safety', 'write', 'signal-handler'],
    },
    {
      id: 'c-signal-14',
      title: 'Bug: non-volatile flag in handler',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the signal handler that uses a plain int flag, which may be optimized away by the compiler.',
      skeleton: `#include <stdio.h>
#include <signal.h>

int stop = 0;  // BUG: wrong type for signal handler use

void handler(int sig) {
    stop = 1;
}

int main(void) {
    signal(SIGINT, handler);
    while (!stop) {
        // work
    }
    printf("Stopped.\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <signal.h>

volatile sig_atomic_t stop = 0;

void handler(int sig) {
    stop = 1;
}

int main(void) {
    signal(SIGINT, handler);
    while (!stop) {
        // work
    }
    printf("Stopped.\\n");
    return 0;
}`,
      hints: [
        'Signal handler variables must be volatile sig_atomic_t.',
        'volatile prevents the compiler from caching the value in a register.',
        'sig_atomic_t ensures atomic load/store from signal context.',
      ],
      concepts: ['volatile', 'sig_atomic_t', 'signal-safety'],
    },
    {
      id: 'c-signal-15',
      title: 'Bug: ignoring EINTR after signal',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Fix the read loop that fails when interrupted by a signal. It should retry on EINTR.',
      skeleton: `#include <stdio.h>
#include <signal.h>
#include <unistd.h>
#include <errno.h>

volatile sig_atomic_t got_alarm = 0;

void alarm_handler(int sig) { got_alarm = 1; }

int main(void) {
    signal(SIGALRM, alarm_handler);
    alarm(1);

    char buf[256];
    ssize_t n = read(STDIN_FILENO, buf, sizeof(buf));
    // BUG: does not handle EINTR
    if (n < 0) {
        perror("read failed");
        return 1;
    }
    if (n > 0) {
        buf[n] = '\\0';
        printf("Read: %s\\n", buf);
    }
    return 0;
}`,
      solution: `#include <stdio.h>
#include <signal.h>
#include <unistd.h>
#include <errno.h>

volatile sig_atomic_t got_alarm = 0;

void alarm_handler(int sig) { got_alarm = 1; }

int main(void) {
    signal(SIGALRM, alarm_handler);
    alarm(1);

    char buf[256];
    ssize_t n;
    do {
        n = read(STDIN_FILENO, buf, sizeof(buf));
    } while (n < 0 && errno == EINTR && !got_alarm);

    if (n < 0) {
        perror("read failed");
        return 1;
    }
    if (n > 0) {
        buf[n] = '\\0';
        printf("Read: %s\\n", buf);
    }
    return 0;
}`,
      hints: [
        'When a signal interrupts read(), it returns -1 with errno == EINTR.',
        'Wrap the read in a loop that retries on EINTR.',
        'Also check the alarm flag to break out if the timeout fired.',
      ],
      concepts: ['EINTR', 'read', 'signal-interruption', 'retry-loop'],
    },
    {
      id: 'c-signal-16',
      title: 'Predict: signal handler output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the output when raise() triggers a handler synchronously.',
      skeleton: `#include <stdio.h>
#include <signal.h>

void handler(int sig) {
    printf("H ");
}

int main(void) {
    signal(SIGUSR1, handler);
    printf("A ");
    raise(SIGUSR1);
    printf("B ");
    raise(SIGUSR1);
    printf("C\\n");
    return 0;
}`,
      solution: `A H B H C`,
      hints: [
        'raise() delivers the signal synchronously before returning.',
        'The handler runs immediately when raise is called.',
        'Output order: A, then handler H, then B, then handler H, then C.',
      ],
      concepts: ['raise', 'synchronous-delivery', 'signal-handler'],
    },
    {
      id: 'c-signal-17',
      title: 'Predict: SIG_IGN behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output when SIGINT is set to SIG_IGN (ignore).',
      skeleton: `#include <stdio.h>
#include <signal.h>

int main(void) {
    signal(SIGINT, SIG_IGN);
    printf("A ");
    raise(SIGINT);
    printf("B ");
    raise(SIGINT);
    printf("C\\n");
    return 0;
}`,
      solution: `A B C`,
      hints: [
        'SIG_IGN causes the signal to be completely ignored.',
        'raise(SIGINT) does nothing when the signal is ignored.',
        'All three prints execute normally.',
      ],
      concepts: ['SIG_IGN', 'signal-ignoring', 'raise'],
    },
    {
      id: 'c-signal-18',
      title: 'Predict: signal handler with counter',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the final output after multiple signals.',
      skeleton: `#include <stdio.h>
#include <signal.h>

volatile sig_atomic_t count = 0;

void handler(int sig) {
    count++;
}

int main(void) {
    signal(SIGUSR1, handler);
    raise(SIGUSR1);
    raise(SIGUSR1);
    raise(SIGUSR1);
    raise(SIGUSR1);
    raise(SIGUSR1);
    printf("%d\\n", count);
    return 0;
}`,
      solution: `5`,
      hints: [
        'Each raise(SIGUSR1) delivers the signal synchronously.',
        'The handler increments count each time.',
        'Five raises means count = 5.',
      ],
      concepts: ['signal-counting', 'raise', 'sig_atomic_t'],
    },
    {
      id: 'c-signal-19',
      title: 'Refactor: signal() to sigaction()',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor the code from using the simpler signal() function to the more portable and reliable sigaction() function.',
      skeleton: `#include <stdio.h>
#include <signal.h>

volatile sig_atomic_t quit = 0;

void handler(int sig) {
    quit = 1;
}

int main(void) {
    signal(SIGINT, handler);
    signal(SIGTERM, handler);

    while (!quit) {
        // main loop
    }
    printf("Exiting.\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <signal.h>
#include <string.h>

volatile sig_atomic_t quit = 0;

void handler(int sig) {
    quit = 1;
}

int main(void) {
    struct sigaction sa;
    memset(&sa, 0, sizeof(sa));
    sa.sa_handler = handler;
    sigemptyset(&sa.sa_mask);
    sa.sa_flags = 0;

    sigaction(SIGINT, &sa, NULL);
    sigaction(SIGTERM, &sa, NULL);

    while (!quit) {
        // main loop
    }
    printf("Exiting.\\n");
    return 0;
}`,
      hints: [
        'sigaction provides more control and consistent behavior across platforms.',
        'signal() behavior varies between systems (some reset to SIG_DFL after delivery).',
        'Initialize the struct with memset or designated initializers.',
      ],
      concepts: ['sigaction', 'signal-portability', 'refactoring'],
    },
    {
      id: 'c-signal-20',
      title: 'Refactor: add signal-safe cleanup',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor the cleanup code so that the signal handler only sets a flag, and all cleanup (closing files, freeing memory) happens in main after the loop exits. Currently the handler unsafely calls fclose and free.',
      skeleton: `#include <stdio.h>
#include <signal.h>
#include <stdlib.h>

FILE *logfile = NULL;
char *buffer = NULL;

void handler(int sig) {
    // BUG: these are not async-signal-safe
    if (logfile) fclose(logfile);
    if (buffer) free(buffer);
    exit(1);
}

int main(void) {
    signal(SIGINT, handler);
    logfile = fopen("/tmp/app.log", "w");
    buffer = malloc(4096);

    while (1) {
        fprintf(logfile, "working...\\n");
    }

    fclose(logfile);
    free(buffer);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <signal.h>
#include <stdlib.h>
#include <string.h>

static volatile sig_atomic_t running = 1;

static void handler(int sig) {
    running = 0;
}

int main(void) {
    struct sigaction sa;
    memset(&sa, 0, sizeof(sa));
    sa.sa_handler = handler;
    sigemptyset(&sa.sa_mask);
    sa.sa_flags = 0;
    sigaction(SIGINT, &sa, NULL);

    FILE *logfile = fopen("/tmp/app.log", "w");
    char *buffer = malloc(4096);

    while (running) {
        fprintf(logfile, "working...\\n");
    }

    if (logfile) fclose(logfile);
    if (buffer) free(buffer);
    printf("Cleaned up safely.\\n");
    return 0;
}`,
      hints: [
        'Signal handlers should only set flags -- no fclose, free, or exit.',
        'Move all cleanup to after the main loop when the flag is checked.',
        'fclose and free are not async-signal-safe and can cause deadlocks.',
      ],
      concepts: ['async-signal-safety', 'cleanup', 'refactoring', 'signal-handler'],
    },
  ],
};
