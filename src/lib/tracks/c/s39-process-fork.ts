import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-fork',
  title: '39. Process Creation',
  explanation: `## Process Creation

Unix processes are created with \`fork()\`, which clones the calling process. The child can then replace itself with a new program using \`exec()\`.

\`\`\`c
#include <unistd.h>
#include <sys/wait.h>
#include <stdio.h>

int main(void) {
    pid_t pid = fork();
    if (pid < 0) {
        perror("fork");
        return 1;
    } else if (pid == 0) {
        // child process
        printf("Child PID: %d\\n", getpid());
        execlp("ls", "ls", "-l", NULL);
        perror("exec");  // only reached if exec fails
        _exit(1);
    } else {
        // parent process
        int status;
        waitpid(pid, &status, 0);
        if (WIFEXITED(status))
            printf("Child exited with %d\\n", WEXITSTATUS(status));
    }
    return 0;
}
\`\`\`

### Key Concepts
- **fork()**: creates a child process; returns 0 to child, child PID to parent
- **exec family**: replaces the current process image (execl, execv, execvp, etc.)
- **wait/waitpid**: parent waits for child termination
- **WIFEXITED/WEXITSTATUS**: macros to inspect exit status
- **_exit()**: exit immediately without flushing stdio buffers (use in child after fork)
- **Zombie**: terminated child not yet waited on by parent
- **Orphan**: child whose parent has terminated (adopted by init)
`,
  exercises: [
    {
      id: 'c-fork-1',
      title: 'Basic fork call',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Call fork() and store the result in pid.',
      skeleton: `#include <stdio.h>
#include <unistd.h>

int main(void) {
    pid_t pid = __BLANK__;
    if (pid == 0) {
        printf("Child\\n");
    } else if (pid > 0) {
        printf("Parent\\n");
    } else {
        perror("fork");
    }
    return 0;
}`,
      solution: `#include <stdio.h>
#include <unistd.h>

int main(void) {
    pid_t pid = fork();
    if (pid == 0) {
        printf("Child\\n");
    } else if (pid > 0) {
        printf("Parent\\n");
    } else {
        perror("fork");
    }
    return 0;
}`,
      hints: [
        'fork() creates a new process by duplicating the caller.',
        'Returns 0 to the child, the child PID to the parent, -1 on error.',
        'Both parent and child continue from the point after fork().',
      ],
      concepts: ['fork', 'process-creation', 'pid_t'],
    },
    {
      id: 'c-fork-2',
      title: 'Wait for child',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use waitpid to wait for the child process to finish.',
      skeleton: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    pid_t pid = fork();
    if (pid == 0) {
        printf("Child working...\\n");
        _exit(0);
    }
    int status;
    __BLANK__(pid, &status, 0);
    printf("Child done\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    pid_t pid = fork();
    if (pid == 0) {
        printf("Child working...\\n");
        _exit(0);
    }
    int status;
    waitpid(pid, &status, 0);
    printf("Child done\\n");
    return 0;
}`,
      hints: [
        'waitpid(pid, &status, 0) waits for a specific child.',
        'The status variable holds the exit information.',
        'Flags of 0 means block until the child exits.',
      ],
      concepts: ['waitpid', 'process-synchronization', 'exit-status'],
    },
    {
      id: 'c-fork-3',
      title: 'Check exit status',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use the correct macros to check if the child exited normally and get its exit code.',
      skeleton: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    pid_t pid = fork();
    if (pid == 0) {
        _exit(42);
    }
    int status;
    waitpid(pid, &status, 0);
    if (__BLANK__(status)) {
        printf("Exit code: %d\\n", __BLANK__(status));
    }
    return 0;
}`,
      solution: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    pid_t pid = fork();
    if (pid == 0) {
        _exit(42);
    }
    int status;
    waitpid(pid, &status, 0);
    if (WIFEXITED(status)) {
        printf("Exit code: %d\\n", WEXITSTATUS(status));
    }
    return 0;
}`,
      hints: [
        'WIFEXITED(status) returns true if the child terminated normally.',
        'WEXITSTATUS(status) extracts the exit code (0-255).',
        'Always check WIFEXITED before using WEXITSTATUS.',
      ],
      concepts: ['WIFEXITED', 'WEXITSTATUS', 'exit-status'],
    },
    {
      id: 'c-fork-4',
      title: 'Execute a program',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use execlp to replace the child process with the "echo" command.',
      skeleton: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    pid_t pid = fork();
    if (pid == 0) {
        __BLANK__("echo", "echo", "Hello from exec!", NULL);
        perror("execlp");
        _exit(1);
    }
    wait(NULL);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    pid_t pid = fork();
    if (pid == 0) {
        execlp("echo", "echo", "Hello from exec!", NULL);
        perror("execlp");
        _exit(1);
    }
    wait(NULL);
    return 0;
}`,
      hints: [
        'execlp searches PATH for the program (the p suffix).',
        'First arg is the program name, second is argv[0], then remaining args, then NULL.',
        'If execlp succeeds, it never returns.',
      ],
      concepts: ['execlp', 'exec-family', 'process-replacement'],
    },
    {
      id: 'c-fork-5',
      title: 'Get process IDs',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Use getpid() and getppid() to print the child and parent process IDs.',
      skeleton: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    pid_t pid = fork();
    if (pid == 0) {
        printf("Child: PID=%d, Parent PID=%d\\n", __BLANK__(), __BLANK__());
        _exit(0);
    }
    waitpid(pid, NULL, 0);
    printf("Parent: PID=%d\\n", getpid());
    return 0;
}`,
      solution: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    pid_t pid = fork();
    if (pid == 0) {
        printf("Child: PID=%d, Parent PID=%d\\n", getpid(), getppid());
        _exit(0);
    }
    waitpid(pid, NULL, 0);
    printf("Parent: PID=%d\\n", getpid());
    return 0;
}`,
      hints: [
        'getpid() returns the PID of the calling process.',
        'getppid() returns the PID of the parent process.',
        'In the child, getppid() returns the parent PID.',
      ],
      concepts: ['getpid', 'getppid', 'process-ids'],
    },
    {
      id: 'c-fork-6',
      title: 'Pipe between parent and child',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Create a pipe before fork. The child writes a message and the parent reads it.',
      skeleton: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
#include <string.h>

int main(void) {
    int pipefd[2];
    __BLANK__(pipefd);

    pid_t pid = fork();
    if (pid == 0) {
        close(pipefd[0]); // close read end
        const char *msg = "Hello from child";
        write(pipefd[1], msg, strlen(msg));
        close(pipefd[1]);
        _exit(0);
    }

    close(pipefd[1]); // close write end
    char buf[128] = {0};
    read(pipefd[0], buf, sizeof(buf) - 1);
    close(pipefd[0]);
    waitpid(pid, NULL, 0);
    printf("Parent got: %s\\n", buf);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
#include <string.h>

int main(void) {
    int pipefd[2];
    pipe(pipefd);

    pid_t pid = fork();
    if (pid == 0) {
        close(pipefd[0]); // close read end
        const char *msg = "Hello from child";
        write(pipefd[1], msg, strlen(msg));
        close(pipefd[1]);
        _exit(0);
    }

    close(pipefd[1]); // close write end
    char buf[128] = {0};
    read(pipefd[0], buf, sizeof(buf) - 1);
    close(pipefd[0]);
    waitpid(pid, NULL, 0);
    printf("Parent got: %s\\n", buf);
    return 0;
}`,
      hints: [
        'pipe(pipefd) creates a unidirectional pipe: pipefd[0] for read, pipefd[1] for write.',
        'Each process must close the end it does not use.',
        'Create the pipe before fork so both processes inherit both ends.',
      ],
      concepts: ['pipe', 'fork', 'inter-process-communication'],
    },
    {
      id: 'c-fork-7',
      title: 'Write a simple process spawner',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Write a function run_command(const char *cmd) that forks, execs the command using /bin/sh -c, waits for it, and returns the exit status.',
      skeleton: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

// Write run_command here

int main(void) {
    int status = run_command("echo hello");
    printf("Exit status: %d\\n", status);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int run_command(const char *cmd) {
    pid_t pid = fork();
    if (pid < 0) return -1;
    if (pid == 0) {
        execl("/bin/sh", "sh", "-c", cmd, NULL);
        _exit(127);
    }
    int status;
    waitpid(pid, &status, 0);
    if (WIFEXITED(status)) return WEXITSTATUS(status);
    return -1;
}

int main(void) {
    int status = run_command("echo hello");
    printf("Exit status: %d\\n", status);
    return 0;
}`,
      hints: [
        'Fork, then in the child exec "/bin/sh" with "-c" and the command.',
        'In the parent, waitpid and return the exit status.',
        '_exit(127) in the child if exec fails (convention for command not found).',
      ],
      concepts: ['fork', 'execl', 'waitpid', 'system-replacement'],
    },
    {
      id: 'c-fork-8',
      title: 'Write a fork-based parallel worker',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write spawn_workers(int n) that forks n child processes. Each child prints its worker number (0 to n-1) and exits with that number. The parent waits for all children and prints their exit codes.',
      skeleton: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

// Write spawn_workers here

int main(void) {
    spawn_workers(3);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

void spawn_workers(int n) {
    for (int i = 0; i < n; i++) {
        pid_t pid = fork();
        if (pid < 0) {
            perror("fork");
            return;
        }
        if (pid == 0) {
            printf("Worker %d (PID %d)\\n", i, getpid());
            _exit(i);
        }
    }
    for (int i = 0; i < n; i++) {
        int status;
        pid_t pid = wait(&status);
        if (WIFEXITED(status)) {
            printf("PID %d exited with %d\\n", pid, WEXITSTATUS(status));
        }
    }
}

int main(void) {
    spawn_workers(3);
    return 0;
}`,
      hints: [
        'Fork in a loop, but the child must _exit to avoid forking more children.',
        'After spawning all children, wait for each one in a second loop.',
        'wait(NULL) or waitpid(-1, ...) collects any child.',
      ],
      concepts: ['fork', 'parallel-processes', 'wait', 'process-management'],
    },
    {
      id: 'c-fork-9',
      title: 'Write a pipe-based calculator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write pipe_add(int a, int b) that forks a child. The parent sends a and b through a pipe, the child reads them, computes the sum, writes it back through a second pipe, and the parent reads and returns the result.',
      skeleton: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

// Write pipe_add here

int main(void) {
    printf("3 + 4 = %d\\n", pipe_add(3, 4));
    printf("10 + 20 = %d\\n", pipe_add(10, 20));
    return 0;
}`,
      solution: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int pipe_add(int a, int b) {
    int to_child[2], to_parent[2];
    pipe(to_child);
    pipe(to_parent);

    pid_t pid = fork();
    if (pid == 0) {
        close(to_child[1]);
        close(to_parent[0]);
        int vals[2];
        read(to_child[0], vals, sizeof(vals));
        close(to_child[0]);
        int result = vals[0] + vals[1];
        write(to_parent[1], &result, sizeof(result));
        close(to_parent[1]);
        _exit(0);
    }

    close(to_child[0]);
    close(to_parent[1]);
    int vals[2] = {a, b};
    write(to_child[1], vals, sizeof(vals));
    close(to_child[1]);
    int result;
    read(to_parent[0], &result, sizeof(result));
    close(to_parent[0]);
    waitpid(pid, NULL, 0);
    return result;
}

int main(void) {
    printf("3 + 4 = %d\\n", pipe_add(3, 4));
    printf("10 + 20 = %d\\n", pipe_add(10, 20));
    return 0;
}`,
      hints: [
        'Create two pipes: one for parent-to-child, one for child-to-parent.',
        'Each side closes the pipe ends it does not use.',
        'Read and write binary data (ints) directly through the pipe.',
      ],
      concepts: ['pipe', 'fork', 'bidirectional-ipc', 'process-communication'],
    },
    {
      id: 'c-fork-10',
      title: 'Write execvp with argument array',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write run_program(const char *prog, char *const argv[]) that forks, uses execvp to run the program, and returns the exit status.',
      skeleton: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

// Write run_program here

int main(void) {
    char *args[] = {"echo", "Hello", "World", NULL};
    int status = run_program("echo", args);
    printf("Exit: %d\\n", status);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int run_program(const char *prog, char *const argv[]) {
    pid_t pid = fork();
    if (pid < 0) return -1;
    if (pid == 0) {
        execvp(prog, argv);
        _exit(127);
    }
    int status;
    waitpid(pid, &status, 0);
    return WIFEXITED(status) ? WEXITSTATUS(status) : -1;
}

int main(void) {
    char *args[] = {"echo", "Hello", "World", NULL};
    int status = run_program("echo", args);
    printf("Exit: %d\\n", status);
    return 0;
}`,
      hints: [
        'execvp takes the program name and a NULL-terminated array of strings.',
        'The v in execvp means vector (array), p means search PATH.',
        'Fork first, exec in the child, wait in the parent.',
      ],
      concepts: ['execvp', 'fork', 'process-replacement', 'argv'],
    },
    {
      id: 'c-fork-11',
      title: 'Write a dup2 redirect',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write run_with_output(const char *cmd, char *buf, size_t size) that forks, redirects stdout to a pipe using dup2, execs the command, and reads the output into buf.',
      skeleton: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
#include <string.h>

// Write run_with_output here

int main(void) {
    char output[256];
    run_with_output("echo captured", output, sizeof(output));
    printf("Got: %s", output);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
#include <string.h>

int run_with_output(const char *cmd, char *buf, size_t size) {
    int pipefd[2];
    pipe(pipefd);

    pid_t pid = fork();
    if (pid == 0) {
        close(pipefd[0]);
        dup2(pipefd[1], STDOUT_FILENO);
        close(pipefd[1]);
        execl("/bin/sh", "sh", "-c", cmd, NULL);
        _exit(127);
    }

    close(pipefd[1]);
    ssize_t total = 0;
    ssize_t n;
    while (total < (ssize_t)size - 1 &&
           (n = read(pipefd[0], buf + total, size - 1 - total)) > 0) {
        total += n;
    }
    buf[total] = '\\0';
    close(pipefd[0]);
    int status;
    waitpid(pid, &status, 0);
    return WIFEXITED(status) ? WEXITSTATUS(status) : -1;
}

int main(void) {
    char output[256];
    run_with_output("echo captured", output, sizeof(output));
    printf("Got: %s", output);
    return 0;
}`,
      hints: [
        'dup2(pipefd[1], STDOUT_FILENO) redirects stdout to the pipe write end.',
        'Close the original pipe fd after dup2 to avoid leaking it.',
        'Read in a loop until EOF (read returns 0) or buffer is full.',
      ],
      concepts: ['dup2', 'pipe', 'fork', 'output-capture'],
    },
    {
      id: 'c-fork-12',
      title: 'Write a process chain (pipeline)',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write pipeline(const char *cmd1, const char *cmd2) that pipes the stdout of cmd1 into the stdin of cmd2 (like "cmd1 | cmd2" in the shell).',
      skeleton: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

// Write pipeline here

int main(void) {
    pipeline("echo hello world", "wc -w");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

void pipeline(const char *cmd1, const char *cmd2) {
    int pipefd[2];
    pipe(pipefd);

    pid_t p1 = fork();
    if (p1 == 0) {
        close(pipefd[0]);
        dup2(pipefd[1], STDOUT_FILENO);
        close(pipefd[1]);
        execl("/bin/sh", "sh", "-c", cmd1, NULL);
        _exit(127);
    }

    pid_t p2 = fork();
    if (p2 == 0) {
        close(pipefd[1]);
        dup2(pipefd[0], STDIN_FILENO);
        close(pipefd[0]);
        execl("/bin/sh", "sh", "-c", cmd2, NULL);
        _exit(127);
    }

    close(pipefd[0]);
    close(pipefd[1]);
    waitpid(p1, NULL, 0);
    waitpid(p2, NULL, 0);
}

int main(void) {
    pipeline("echo hello world", "wc -w");
    return 0;
}`,
      hints: [
        'Create one pipe shared between two child processes.',
        'First child: redirect stdout to pipe write end.',
        'Second child: redirect stdin from pipe read end.',
      ],
      concepts: ['pipe', 'dup2', 'fork', 'pipeline', 'shell-emulation'],
    },
    {
      id: 'c-fork-13',
      title: 'Bug: child does not exit after work',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the code where the child continues executing parent code after its work.',
      skeleton: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    for (int i = 0; i < 3; i++) {
        pid_t pid = fork();
        if (pid == 0) {
            printf("Child %d\\n", i);
            // BUG: child falls through and forks more children
        }
    }
    // wait for children
    for (int i = 0; i < 3; i++) wait(NULL);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    for (int i = 0; i < 3; i++) {
        pid_t pid = fork();
        if (pid == 0) {
            printf("Child %d\\n", i);
            _exit(0);
        }
    }
    // wait for children
    for (int i = 0; i < 3; i++) wait(NULL);
    return 0;
}`,
      hints: [
        'Without _exit(), the child continues the loop and forks its own children.',
        'This creates a fork bomb -- exponentially many processes.',
        'Always _exit() in the child when done, or exec a new program.',
      ],
      concepts: ['fork', '_exit', 'fork-bomb', 'process-lifecycle'],
    },
    {
      id: 'c-fork-14',
      title: 'Bug: zombie process',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the code that creates zombie processes because the parent never waits for children.',
      skeleton: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    pid_t pid = fork();
    if (pid == 0) {
        printf("Child done\\n");
        _exit(0);
    }
    // BUG: parent does not wait -- child becomes zombie
    printf("Parent doing other work...\\n");
    sleep(5);
    printf("Parent exiting\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    pid_t pid = fork();
    if (pid == 0) {
        printf("Child done\\n");
        _exit(0);
    }
    printf("Parent doing other work...\\n");
    sleep(5);
    waitpid(pid, NULL, 0);
    printf("Parent exiting\\n");
    return 0;
}`,
      hints: [
        'A zombie is a terminated child that has not been waited on.',
        'Add waitpid before the parent exits to reap the child.',
        'Alternatively, use a SIGCHLD handler to reap children asynchronously.',
      ],
      concepts: ['zombie-process', 'waitpid', 'process-lifecycle'],
    },
    {
      id: 'c-fork-15',
      title: 'Bug: pipe fd leak',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the code where parent does not close unused pipe ends, causing the child read to hang.',
      skeleton: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
#include <string.h>

int main(void) {
    int pipefd[2];
    pipe(pipefd);

    pid_t pid = fork();
    if (pid == 0) {
        close(pipefd[1]);
        char buf[128] = {0};
        read(pipefd[0], buf, sizeof(buf) - 1);
        printf("Child got: %s\\n", buf);
        close(pipefd[0]);
        _exit(0);
    }

    // BUG: parent does not close read end
    // BUG: parent does not close write end after writing
    const char *msg = "hello";
    write(pipefd[1], msg, strlen(msg));
    // child may hang because write end is still open
    waitpid(pid, NULL, 0);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
#include <string.h>

int main(void) {
    int pipefd[2];
    pipe(pipefd);

    pid_t pid = fork();
    if (pid == 0) {
        close(pipefd[1]);
        char buf[128] = {0};
        read(pipefd[0], buf, sizeof(buf) - 1);
        printf("Child got: %s\\n", buf);
        close(pipefd[0]);
        _exit(0);
    }

    close(pipefd[0]);
    const char *msg = "hello";
    write(pipefd[1], msg, strlen(msg));
    close(pipefd[1]);
    waitpid(pid, NULL, 0);
    return 0;
}`,
      hints: [
        'Close pipefd[0] in the parent since it only writes.',
        'Close pipefd[1] after writing so the child sees EOF on read.',
        'Unclosed write ends prevent the reader from detecting EOF.',
      ],
      concepts: ['pipe', 'file-descriptors', 'resource-leak'],
    },
    {
      id: 'c-fork-16',
      title: 'Predict: fork return values',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict what values pid holds in parent and child after fork.',
      skeleton: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    pid_t pid = fork();
    if (pid == 0) {
        printf("C:%d\\n", pid);
        _exit(0);
    }
    waitpid(pid, NULL, 0);
    printf("P:%s\\n", pid > 0 ? "positive" : "zero-or-neg");
    return 0;
}`,
      solution: `C:0
P:positive`,
      hints: [
        'fork returns 0 to the child process.',
        'fork returns the child PID (positive) to the parent.',
        'The child prints 0, the parent prints "positive".',
      ],
      concepts: ['fork', 'return-values', 'process-ids'],
    },
    {
      id: 'c-fork-17',
      title: 'Predict: shared variable after fork',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the output. Consider that fork creates separate address spaces.',
      skeleton: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    int x = 10;
    pid_t pid = fork();
    if (pid == 0) {
        x += 5;
        printf("C:%d\\n", x);
        _exit(0);
    }
    waitpid(pid, NULL, 0);
    printf("P:%d\\n", x);
    return 0;
}`,
      solution: `C:15
P:10`,
      hints: [
        'fork creates a copy of the address space -- child gets its own x.',
        'The child modifies its copy to 15, parent x stays 10.',
        'Processes do not share memory after fork (without shared memory).',
      ],
      concepts: ['fork', 'address-space', 'copy-on-write'],
    },
    {
      id: 'c-fork-18',
      title: 'Predict: exit status extraction',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the exit code printed by the parent.',
      skeleton: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    pid_t pid = fork();
    if (pid == 0) {
        _exit(7);
    }
    int status;
    waitpid(pid, &status, 0);
    if (WIFEXITED(status)) {
        printf("%d\\n", WEXITSTATUS(status));
    }
    return 0;
}`,
      solution: `7`,
      hints: [
        'The child exits with code 7 via _exit(7).',
        'WEXITSTATUS extracts the low 8 bits of the exit code.',
        'The parent prints 7.',
      ],
      concepts: ['WEXITSTATUS', '_exit', 'exit-codes'],
    },
    {
      id: 'c-fork-19',
      title: 'Refactor: replace system() with fork/exec',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Refactor the code to replace the unsafe system() call with a proper fork/exec/wait pattern.',
      skeleton: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    printf("Running ls:\\n");
    system("ls -la");
    printf("Done.\\n");
    return 0;
}`,
      solution: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    printf("Running ls:\\n");
    pid_t pid = fork();
    if (pid < 0) {
        perror("fork");
        return 1;
    }
    if (pid == 0) {
        execlp("ls", "ls", "-la", NULL);
        perror("execlp");
        _exit(127);
    }
    int status;
    waitpid(pid, &status, 0);
    printf("Done.\\n");
    return 0;
}`,
      hints: [
        'system() runs a shell and is vulnerable to shell injection.',
        'fork/exec avoids the shell and gives more control.',
        'Use execlp to search PATH, or execvp for argument arrays.',
      ],
      concepts: ['fork', 'exec', 'security', 'system-replacement'],
    },
    {
      id: 'c-fork-20',
      title: 'Refactor: add error handling to fork/exec',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor this bare fork/exec code to add comprehensive error handling: check fork failure, exec failure (report to parent via pipe), and signal termination.',
      skeleton: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int run(const char *prog) {
    pid_t pid = fork();
    if (pid == 0) {
        execlp(prog, prog, NULL);
        _exit(1);
    }
    int status;
    wait(&status);
    return WEXITSTATUS(status);
}

int main(void) {
    int code = run("ls");
    printf("Exit: %d\\n", code);
    return 0;
}`,
      solution: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
#include <errno.h>
#include <string.h>
#include <fcntl.h>

int run(const char *prog) {
    int errpipe[2];
    if (pipe(errpipe) < 0) return -1;
    fcntl(errpipe[1], F_SETFD, FD_CLOEXEC);

    pid_t pid = fork();
    if (pid < 0) {
        int err = errno;
        close(errpipe[0]);
        close(errpipe[1]);
        fprintf(stderr, "fork: %s\\n", strerror(err));
        return -1;
    }
    if (pid == 0) {
        close(errpipe[0]);
        execlp(prog, prog, NULL);
        int err = errno;
        write(errpipe[1], &err, sizeof(err));
        _exit(127);
    }

    close(errpipe[1]);
    int child_errno = 0;
    ssize_t n = read(errpipe[0], &child_errno, sizeof(child_errno));
    close(errpipe[0]);

    if (n > 0) {
        fprintf(stderr, "exec %s: %s\\n", prog, strerror(child_errno));
    }

    int status;
    waitpid(pid, &status, 0);
    if (WIFEXITED(status)) return WEXITSTATUS(status);
    if (WIFSIGNALED(status)) {
        fprintf(stderr, "%s killed by signal %d\\n", prog, WTERMSIG(status));
        return -WTERMSIG(status);
    }
    return -1;
}

int main(void) {
    int code = run("ls");
    printf("Exit: %d\\n", code);
    return 0;
}`,
      hints: [
        'Use a CLOEXEC pipe to detect exec failure in the child.',
        'If exec succeeds, the pipe is closed automatically and read returns 0.',
        'If exec fails, the child writes errno through the pipe.',
      ],
      concepts: ['fork', 'exec', 'error-handling', 'CLOEXEC', 'pipe'],
    },
  ],
};
