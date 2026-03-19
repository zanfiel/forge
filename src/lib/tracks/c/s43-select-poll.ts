import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-poll',
  title: '43. I/O Multiplexing: select & poll',
  explanation: `## I/O Multiplexing: select & poll

I/O multiplexing allows a single thread to monitor multiple file descriptors simultaneously, enabling efficient event-driven server designs without threads.

\`\`\`c
#include <sys/select.h>
#include <poll.h>

// select() -- monitor fd_sets for readability, writability, exceptions
fd_set readfds;
FD_ZERO(&readfds);
FD_SET(sockfd, &readfds);
struct timeval tv = { .tv_sec = 5, .tv_usec = 0 };
int ready = select(sockfd + 1, &readfds, NULL, NULL, &tv);
if (FD_ISSET(sockfd, &readfds)) { /* data available */ }

// poll() -- modern alternative using struct pollfd array
struct pollfd fds[2];
fds[0].fd = sockfd;
fds[0].events = POLLIN;
fds[1].fd = STDIN_FILENO;
fds[1].events = POLLIN;
int ret = poll(fds, 2, 5000);  // 5 second timeout
if (fds[0].revents & POLLIN) { /* socket ready */ }

// Non-blocking I/O with fcntl
int flags = fcntl(sockfd, F_GETFL, 0);
fcntl(sockfd, F_SETFL, flags | O_NONBLOCK);
\`\`\`

### Key Concepts
- **select()**: monitors up to FD_SETSIZE file descriptors for I/O readiness
- **fd_set**: bitmap of file descriptors; manipulated via FD_ZERO, FD_SET, FD_CLR, FD_ISSET
- **poll()**: uses an array of pollfd structs, no FD_SETSIZE limit
- **POLLIN / POLLOUT / POLLERR**: event flags for poll
- **revents**: actual events that occurred (set by poll)
- **O_NONBLOCK**: makes I/O operations return immediately instead of blocking
- **Timeout**: both select and poll support timeouts (NULL = block forever, 0 = return immediately)
`,
  exercises: [
    {
      id: 'c-poll-1',
      title: 'Initialize fd_set',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Initialize an fd_set and add a socket to it.',
      skeleton: `#include <sys/select.h>
#include <stdio.h>

int main(void) {
    int sockfd = 3;  // assume valid fd
    fd_set readfds;
    __BLANK__(&readfds);
    __BLANK__(sockfd, &readfds);
    printf("fd %d is set: %d\\n", sockfd,
           FD_ISSET(sockfd, &readfds));
    return 0;
}`,
      solution: `#include <sys/select.h>
#include <stdio.h>

int main(void) {
    int sockfd = 3;
    fd_set readfds;
    FD_ZERO(&readfds);
    FD_SET(sockfd, &readfds);
    printf("fd %d is set: %d\\n", sockfd,
           FD_ISSET(sockfd, &readfds));
    return 0;
}`,
      hints: [
        'FD_ZERO clears all bits in the fd_set.',
        'FD_SET adds a file descriptor to the set.',
        'Always call FD_ZERO before adding descriptors.'
      ],
      concepts: ['fd_set', 'FD_ZERO', 'FD_SET']
    },
    {
      id: 'c-poll-2',
      title: 'Check fd readiness with FD_ISSET',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Check if a file descriptor is ready for reading after select returns.',
      skeleton: `#include <sys/select.h>
#include <stdio.h>

void check_ready(int sockfd, fd_set *readfds) {
    if (__BLANK__(sockfd, readfds)) {
        printf("Socket %d is ready for reading\\n", sockfd);
    } else {
        printf("Socket %d is not ready\\n", sockfd);
    }
}`,
      solution: `#include <sys/select.h>
#include <stdio.h>

void check_ready(int sockfd, fd_set *readfds) {
    if (FD_ISSET(sockfd, readfds)) {
        printf("Socket %d is ready for reading\\n", sockfd);
    } else {
        printf("Socket %d is not ready\\n", sockfd);
    }
}`,
      hints: [
        'FD_ISSET tests whether a file descriptor is part of the set.',
        'After select() returns, only fds that are ready remain in the set.',
        'FD_ISSET returns non-zero if the fd is set.'
      ],
      concepts: ['FD_ISSET', 'select', 'readiness check']
    },
    {
      id: 'c-poll-3',
      title: 'Set up select with timeout',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Call select() with a 3-second timeout to wait for data on a socket.',
      skeleton: `#include <sys/select.h>
#include <stdio.h>

int wait_for_data(int sockfd) {
    fd_set readfds;
    FD_ZERO(&readfds);
    FD_SET(sockfd, &readfds);

    struct timeval tv;
    tv.tv_sec = __BLANK__;
    tv.tv_usec = __BLANK__;

    int ret = __BLANK__(sockfd + 1, &readfds, NULL, NULL, &tv);
    return ret;
}`,
      solution: `#include <sys/select.h>
#include <stdio.h>

int wait_for_data(int sockfd) {
    fd_set readfds;
    FD_ZERO(&readfds);
    FD_SET(sockfd, &readfds);

    struct timeval tv;
    tv.tv_sec = 3;
    tv.tv_usec = 0;

    int ret = select(sockfd + 1, &readfds, NULL, NULL, &tv);
    return ret;
}`,
      hints: [
        'tv_sec is the seconds component of the timeout.',
        'tv_usec is the microseconds component (0 for whole seconds).',
        'The first argument to select() is nfds: the highest fd + 1.'
      ],
      concepts: ['select', 'timeval', 'timeout', 'nfds']
    },
    {
      id: 'c-poll-4',
      title: 'Initialize struct pollfd',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Set up a pollfd structure to monitor a socket for incoming data.',
      skeleton: `#include <poll.h>

int main(void) {
    int sockfd = 3;
    struct pollfd pfd;
    pfd.__BLANK__ = sockfd;
    pfd.__BLANK__ = POLLIN;
    pfd.__BLANK__ = 0;

    int ret = poll(&pfd, 1, 5000);
    return 0;
}`,
      solution: `#include <poll.h>

int main(void) {
    int sockfd = 3;
    struct pollfd pfd;
    pfd.fd = sockfd;
    pfd.events = POLLIN;
    pfd.revents = 0;

    int ret = poll(&pfd, 1, 5000);
    return 0;
}`,
      hints: [
        'The fd field holds the file descriptor to monitor.',
        'The events field specifies which events to watch for.',
        'The revents field is filled in by poll() with actual events.'
      ],
      concepts: ['pollfd', 'POLLIN', 'poll', 'events']
    },
    {
      id: 'c-poll-5',
      title: 'Set non-blocking mode',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Set a socket to non-blocking mode using fcntl.',
      skeleton: `#include <fcntl.h>
#include <stdio.h>

int set_nonblocking(int fd) {
    int flags = __BLANK__(fd, F_GETFL, 0);
    if (flags < 0) return -1;
    return __BLANK__(fd, F_SETFL, flags | __BLANK__);
}`,
      solution: `#include <fcntl.h>
#include <stdio.h>

int set_nonblocking(int fd) {
    int flags = fcntl(fd, F_GETFL, 0);
    if (flags < 0) return -1;
    return fcntl(fd, F_SETFL, flags | O_NONBLOCK);
}`,
      hints: [
        'fcntl with F_GETFL retrieves the current file status flags.',
        'fcntl with F_SETFL sets new file status flags.',
        'O_NONBLOCK is the flag that enables non-blocking I/O.'
      ],
      concepts: ['fcntl', 'O_NONBLOCK', 'non-blocking I/O']
    },
    {
      id: 'c-poll-6',
      title: 'Configure poll timeout',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Call poll() with different timeout behaviors: block forever, return immediately, and timed wait.',
      skeleton: `#include <poll.h>
#include <stdio.h>

void demo_timeouts(struct pollfd *fds, int nfds) {
    // Block forever until an event occurs
    poll(fds, nfds, __BLANK__);

    // Return immediately (non-blocking check)
    poll(fds, nfds, __BLANK__);

    // Wait up to 2 seconds
    poll(fds, nfds, __BLANK__);
}`,
      solution: `#include <poll.h>
#include <stdio.h>

void demo_timeouts(struct pollfd *fds, int nfds) {
    // Block forever until an event occurs
    poll(fds, nfds, -1);

    // Return immediately (non-blocking check)
    poll(fds, nfds, 0);

    // Wait up to 2 seconds
    poll(fds, nfds, 2000);
}`,
      hints: [
        'A timeout of -1 means block indefinitely.',
        'A timeout of 0 means return immediately.',
        'Positive values are milliseconds for poll() (not seconds).'
      ],
      concepts: ['poll', 'timeout', 'blocking', 'non-blocking']
    },
    {
      id: 'c-poll-7',
      title: 'Select-based echo server',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a select-based server that handles multiple clients, echoing data back to each.',
      skeleton: `#include <sys/select.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <string.h>
#include <stdio.h>

// Run a select-based echo server on listen_fd.
// Handle up to max_events total recv events across all clients,
// then return the total bytes echoed.
long select_echo(int listen_fd, int max_events) {
    // TODO: implement
}`,
      solution: `#include <sys/select.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <string.h>
#include <stdio.h>

long select_echo(int listen_fd, int max_events) {
    fd_set master, readfds;
    FD_ZERO(&master);
    FD_SET(listen_fd, &master);
    int fdmax = listen_fd;
    long total = 0;
    int events = 0;

    while (events < max_events) {
        readfds = master;
        if (select(fdmax + 1, &readfds, NULL, NULL, NULL) < 0) break;

        for (int fd = 0; fd <= fdmax; fd++) {
            if (!FD_ISSET(fd, &readfds)) continue;

            if (fd == listen_fd) {
                int client = accept(listen_fd, NULL, NULL);
                if (client >= 0) {
                    FD_SET(client, &master);
                    if (client > fdmax) fdmax = client;
                }
            } else {
                char buf[1024];
                ssize_t n = recv(fd, buf, sizeof(buf), 0);
                events++;
                if (n <= 0) {
                    close(fd);
                    FD_CLR(fd, &master);
                } else {
                    send(fd, buf, n, 0);
                    total += n;
                }
            }
        }
    }
    return total;
}`,
      hints: [
        'Maintain a master fd_set and copy it before each select() call.',
        'Track the highest fd number for the nfds parameter.',
        'Distinguish between the listen socket (accept) and client sockets (recv/send).'
      ],
      concepts: ['select', 'fd_set', 'multiplexed server', 'echo server']
    },
    {
      id: 'c-poll-8',
      title: 'Poll-based chat server',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a poll-based server that broadcasts messages from any client to all other connected clients.',
      skeleton: `#include <poll.h>
#include <sys/socket.h>
#include <unistd.h>
#include <string.h>
#include <stdio.h>

#define MAX_CLIENTS 64

// Run a poll-based broadcast server. When any client sends data,
// forward it to all other connected clients. Stop after max_msgs
// messages. Return total messages broadcast.
int broadcast_server(int listen_fd, int max_msgs) {
    // TODO: implement
}`,
      solution: `#include <poll.h>
#include <sys/socket.h>
#include <unistd.h>
#include <string.h>
#include <stdio.h>

#define MAX_CLIENTS 64

int broadcast_server(int listen_fd, int max_msgs) {
    struct pollfd fds[MAX_CLIENTS + 1];
    int nfds = 1;
    int msgs = 0;

    fds[0].fd = listen_fd;
    fds[0].events = POLLIN;

    while (msgs < max_msgs) {
        int ret = poll(fds, nfds, 1000);
        if (ret <= 0) continue;

        for (int i = 0; i < nfds; i++) {
            if (!(fds[i].revents & POLLIN)) continue;

            if (fds[i].fd == listen_fd) {
                int client = accept(listen_fd, NULL, NULL);
                if (client >= 0 && nfds < MAX_CLIENTS + 1) {
                    fds[nfds].fd = client;
                    fds[nfds].events = POLLIN;
                    fds[nfds].revents = 0;
                    nfds++;
                }
            } else {
                char buf[1024];
                ssize_t n = recv(fds[i].fd, buf, sizeof(buf), 0);
                if (n <= 0) {
                    close(fds[i].fd);
                    fds[i] = fds[nfds - 1];
                    nfds--;
                    i--;
                } else {
                    for (int j = 1; j < nfds; j++) {
                        if (j != i) {
                            send(fds[j].fd, buf, n, 0);
                        }
                    }
                    msgs++;
                }
            }
        }
    }
    return msgs;
}`,
      hints: [
        'Use a pollfd array with the listen socket at index 0.',
        'When a client disconnects, swap it with the last entry and decrement nfds.',
        'Broadcast means send to all connected clients except the sender.'
      ],
      concepts: ['poll', 'broadcast', 'chat server', 'client management']
    },
    {
      id: 'c-poll-9',
      title: 'Wait for input with timeout',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that waits for data on a socket with a configurable timeout, returning the status.',
      skeleton: `#include <sys/select.h>
#include <stdio.h>

// Wait for data on fd with a timeout of timeout_ms milliseconds.
// Return: 1 if data ready, 0 if timeout, -1 on error.
int wait_for_input(int fd, int timeout_ms) {
    // TODO: implement
}`,
      solution: `#include <sys/select.h>
#include <stdio.h>

int wait_for_input(int fd, int timeout_ms) {
    fd_set readfds;
    FD_ZERO(&readfds);
    FD_SET(fd, &readfds);

    struct timeval tv;
    tv.tv_sec = timeout_ms / 1000;
    tv.tv_usec = (timeout_ms % 1000) * 1000;

    int ret = select(fd + 1, &readfds, NULL, NULL, &tv);
    if (ret < 0) return -1;
    if (ret == 0) return 0;
    return 1;
}`,
      hints: [
        'Convert milliseconds to seconds and microseconds for struct timeval.',
        'select() returns 0 on timeout, -1 on error, or the number of ready fds.',
        'Remember: 1 second = 1000 milliseconds = 1,000,000 microseconds.'
      ],
      concepts: ['select', 'timeout', 'timeval', 'millisecond conversion']
    },
    {
      id: 'c-poll-10',
      title: 'Non-blocking connect with select',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a function that performs a non-blocking connect with a timeout using select.',
      skeleton: `#include <sys/socket.h>
#include <sys/select.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <fcntl.h>
#include <errno.h>
#include <string.h>
#include <unistd.h>

// Connect to ip:port with a timeout of timeout_sec seconds.
// Return the connected socket fd, or -1 on failure/timeout.
int connect_with_timeout(const char *ip, int port, int timeout_sec) {
    // TODO: implement
}`,
      solution: `#include <sys/socket.h>
#include <sys/select.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <fcntl.h>
#include <errno.h>
#include <string.h>
#include <unistd.h>

int connect_with_timeout(const char *ip, int port, int timeout_sec) {
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (sockfd < 0) return -1;

    int flags = fcntl(sockfd, F_GETFL, 0);
    fcntl(sockfd, F_SETFL, flags | O_NONBLOCK);

    struct sockaddr_in addr;
    memset(&addr, 0, sizeof(addr));
    addr.sin_family = AF_INET;
    addr.sin_port = htons(port);
    inet_pton(AF_INET, ip, &addr.sin_addr);

    int ret = connect(sockfd, (struct sockaddr *)&addr, sizeof(addr));
    if (ret == 0) {
        fcntl(sockfd, F_SETFL, flags);
        return sockfd;
    }
    if (errno != EINPROGRESS) {
        close(sockfd);
        return -1;
    }

    fd_set writefds;
    FD_ZERO(&writefds);
    FD_SET(sockfd, &writefds);
    struct timeval tv = { .tv_sec = timeout_sec, .tv_usec = 0 };

    ret = select(sockfd + 1, NULL, &writefds, NULL, &tv);
    if (ret <= 0) {
        close(sockfd);
        return -1;
    }

    int err;
    socklen_t len = sizeof(err);
    getsockopt(sockfd, SOL_SOCKET, SO_ERROR, &err, &len);
    if (err != 0) {
        close(sockfd);
        return -1;
    }

    fcntl(sockfd, F_SETFL, flags);
    return sockfd;
}`,
      hints: [
        'Set the socket to non-blocking before connect().',
        'A non-blocking connect returns -1 with errno EINPROGRESS.',
        'After select says writable, check SO_ERROR to verify the connection succeeded.'
      ],
      concepts: ['non-blocking connect', 'EINPROGRESS', 'SO_ERROR', 'select writability']
    },
    {
      id: 'c-poll-11',
      title: 'Multiplexed stdin and socket reader',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that reads from both stdin and a socket, printing whichever is ready first.',
      skeleton: `#include <poll.h>
#include <sys/socket.h>
#include <unistd.h>
#include <stdio.h>

// Monitor both stdin (fd 0) and sockfd simultaneously.
// Read and print data from whichever is ready first.
// Repeat for count iterations. Return 0 on success.
int dual_reader(int sockfd, int count) {
    // TODO: implement
}`,
      solution: `#include <poll.h>
#include <sys/socket.h>
#include <unistd.h>
#include <stdio.h>

int dual_reader(int sockfd, int count) {
    struct pollfd fds[2];
    fds[0].fd = STDIN_FILENO;
    fds[0].events = POLLIN;
    fds[1].fd = sockfd;
    fds[1].events = POLLIN;

    for (int i = 0; i < count; i++) {
        int ret = poll(fds, 2, -1);
        if (ret < 0) return -1;

        char buf[1024];
        if (fds[0].revents & POLLIN) {
            ssize_t n = read(STDIN_FILENO, buf, sizeof(buf) - 1);
            if (n > 0) {
                buf[n] = '\\0';
                printf("stdin: %s", buf);
            }
        }
        if (fds[1].revents & POLLIN) {
            ssize_t n = recv(sockfd, buf, sizeof(buf) - 1, 0);
            if (n > 0) {
                buf[n] = '\\0';
                printf("socket: %s", buf);
            } else {
                printf("socket closed\\n");
                return 0;
            }
        }
    }
    return 0;
}`,
      hints: [
        'STDIN_FILENO is 0 -- it can be polled like any other fd.',
        'Check revents for each pollfd to see which source has data.',
        'Use read() for stdin and recv() for sockets.'
      ],
      concepts: ['poll', 'STDIN_FILENO', 'multiplexed input', 'dual source']
    },
    {
      id: 'c-poll-12',
      title: 'Poll-based fd monitor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that monitors an array of file descriptors and reports which ones become readable.',
      skeleton: `#include <poll.h>
#include <stdio.h>

// Monitor the given fds for readability. Wait up to timeout_ms.
// Store indices of ready fds in ready_indices array.
// Return the count of ready fds, or -1 on error.
int monitor_fds(int *fds, int nfds, int timeout_ms,
                int *ready_indices) {
    // TODO: implement
}`,
      solution: `#include <poll.h>
#include <stdio.h>

int monitor_fds(int *fds, int nfds, int timeout_ms,
                int *ready_indices) {
    struct pollfd pfds[nfds];
    for (int i = 0; i < nfds; i++) {
        pfds[i].fd = fds[i];
        pfds[i].events = POLLIN;
        pfds[i].revents = 0;
    }

    int ret = poll(pfds, nfds, timeout_ms);
    if (ret < 0) return -1;

    int count = 0;
    for (int i = 0; i < nfds; i++) {
        if (pfds[i].revents & (POLLIN | POLLHUP | POLLERR)) {
            ready_indices[count++] = i;
        }
    }
    return count;
}`,
      hints: [
        'Create a pollfd array mirroring the input fd array.',
        'After poll returns, scan revents to find which fds are ready.',
        'POLLHUP and POLLERR should also be treated as ready (to handle disconnects).'
      ],
      concepts: ['poll', 'POLLIN', 'POLLHUP', 'fd monitoring']
    },
    {
      id: 'c-poll-13',
      title: 'Fix select fd_set not reinitialized',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the server that stops responding after the first iteration because fd_set is not reinitialized.',
      skeleton: `#include <sys/select.h>
#include <sys/socket.h>
#include <unistd.h>
#include <stdio.h>

// BUG: Server works for first client but then stops responding
void serve(int listen_fd) {
    fd_set readfds;
    FD_ZERO(&readfds);
    FD_SET(listen_fd, &readfds);

    while (1) {
        // BUG: select modifies readfds but we never reset it
        int ret = select(listen_fd + 1, &readfds, NULL, NULL, NULL);
        if (ret > 0 && FD_ISSET(listen_fd, &readfds)) {
            int client = accept(listen_fd, NULL, NULL);
            char buf[256];
            recv(client, buf, sizeof(buf), 0);
            close(client);
        }
    }
}`,
      solution: `#include <sys/select.h>
#include <sys/socket.h>
#include <unistd.h>
#include <stdio.h>

void serve(int listen_fd) {
    while (1) {
        fd_set readfds;
        FD_ZERO(&readfds);
        FD_SET(listen_fd, &readfds);

        int ret = select(listen_fd + 1, &readfds, NULL, NULL, NULL);
        if (ret > 0 && FD_ISSET(listen_fd, &readfds)) {
            int client = accept(listen_fd, NULL, NULL);
            char buf[256];
            recv(client, buf, sizeof(buf), 0);
            close(client);
        }
    }
}`,
      hints: [
        'select() modifies the fd_set to indicate which fds are ready.',
        'After select returns, only ready fds remain set -- all others are cleared.',
        'You must reinitialize the fd_set before each select() call.'
      ],
      concepts: ['select', 'fd_set mutation', 'reinitialization']
    },
    {
      id: 'c-poll-14',
      title: 'Fix wrong poll event flags',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the poll call that uses incorrect event flags, causing it to miss incoming data.',
      skeleton: `#include <poll.h>
#include <sys/socket.h>
#include <unistd.h>
#include <stdio.h>

// BUG: poll never detects incoming data
int wait_for_data(int sockfd) {
    struct pollfd pfd;
    pfd.fd = sockfd;
    pfd.events = POLLOUT;  // Bug: wrong event flag
    pfd.revents = 0;

    int ret = poll(&pfd, 1, 5000);
    if (ret > 0 && (pfd.revents & POLLOUT)) {
        printf("Data available\\n");
        return 1;
    }
    return 0;
}`,
      solution: `#include <poll.h>
#include <sys/socket.h>
#include <unistd.h>
#include <stdio.h>

int wait_for_data(int sockfd) {
    struct pollfd pfd;
    pfd.fd = sockfd;
    pfd.events = POLLIN;
    pfd.revents = 0;

    int ret = poll(&pfd, 1, 5000);
    if (ret > 0 && (pfd.revents & POLLIN)) {
        printf("Data available\\n");
        return 1;
    }
    return 0;
}`,
      hints: [
        'POLLOUT means the fd is ready for writing, not reading.',
        'POLLIN means there is data available to read.',
        'Make sure events and revents checks use the same flag.'
      ],
      concepts: ['POLLIN', 'POLLOUT', 'poll events', 'event flags']
    },
    {
      id: 'c-poll-15',
      title: 'Fix non-blocking connect error check',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Fix the non-blocking connect that does not properly verify the connection succeeded.',
      skeleton: `#include <sys/socket.h>
#include <sys/select.h>
#include <fcntl.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <errno.h>
#include <string.h>
#include <unistd.h>
#include <stdio.h>

// BUG: Reports success even when connection is refused
int nb_connect(const char *ip, int port) {
    int fd = socket(AF_INET, SOCK_STREAM, 0);
    int flags = fcntl(fd, F_GETFL, 0);
    fcntl(fd, F_SETFL, flags | O_NONBLOCK);

    struct sockaddr_in addr;
    memset(&addr, 0, sizeof(addr));
    addr.sin_family = AF_INET;
    addr.sin_port = htons(port);
    inet_pton(AF_INET, ip, &addr.sin_addr);

    connect(fd, (struct sockaddr *)&addr, sizeof(addr));

    fd_set wfds;
    FD_ZERO(&wfds);
    FD_SET(fd, &wfds);
    struct timeval tv = { 5, 0 };
    if (select(fd + 1, NULL, &wfds, NULL, &tv) > 0) {
        // BUG: assumes writable means connected
        printf("Connected!\\n");
        return fd;
    }
    close(fd);
    return -1;
}`,
      solution: `#include <sys/socket.h>
#include <sys/select.h>
#include <fcntl.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <errno.h>
#include <string.h>
#include <unistd.h>
#include <stdio.h>

int nb_connect(const char *ip, int port) {
    int fd = socket(AF_INET, SOCK_STREAM, 0);
    int flags = fcntl(fd, F_GETFL, 0);
    fcntl(fd, F_SETFL, flags | O_NONBLOCK);

    struct sockaddr_in addr;
    memset(&addr, 0, sizeof(addr));
    addr.sin_family = AF_INET;
    addr.sin_port = htons(port);
    inet_pton(AF_INET, ip, &addr.sin_addr);

    int ret = connect(fd, (struct sockaddr *)&addr, sizeof(addr));
    if (ret == 0) {
        fcntl(fd, F_SETFL, flags);
        return fd;
    }
    if (errno != EINPROGRESS) {
        close(fd);
        return -1;
    }

    fd_set wfds;
    FD_ZERO(&wfds);
    FD_SET(fd, &wfds);
    struct timeval tv = { 5, 0 };
    if (select(fd + 1, NULL, &wfds, NULL, &tv) > 0) {
        int err;
        socklen_t len = sizeof(err);
        getsockopt(fd, SOL_SOCKET, SO_ERROR, &err, &len);
        if (err == 0) {
            fcntl(fd, F_SETFL, flags);
            printf("Connected!\\n");
            return fd;
        }
    }
    close(fd);
    return -1;
}`,
      hints: [
        'A socket becoming writable after non-blocking connect does not mean it connected.',
        'Use getsockopt with SO_ERROR to check for connection errors.',
        'SO_ERROR returns 0 on success, or an error code on failure.'
      ],
      concepts: ['non-blocking connect', 'SO_ERROR', 'getsockopt', 'connection verification']
    },
    {
      id: 'c-poll-16',
      title: 'Predict select return value',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the return value of select with a zero timeout on a pipe with data.',
      skeleton: `#include <sys/select.h>
#include <unistd.h>
#include <stdio.h>

int main(void) {
    int pfd[2];
    pipe(pfd);

    write(pfd[1], "abc", 3);

    fd_set rfds;
    FD_ZERO(&rfds);
    FD_SET(pfd[0], &rfds);
    struct timeval tv = { 0, 0 };

    int ret = select(pfd[0] + 1, &rfds, NULL, NULL, &tv);
    printf("select returned: %d\\n", ret);
    printf("readable: %d\\n", FD_ISSET(pfd[0], &rfds) ? 1 : 0);

    close(pfd[0]);
    close(pfd[1]);
    return 0;
}`,
      solution: `#include <sys/select.h>
#include <unistd.h>
#include <stdio.h>

int main(void) {
    int pfd[2];
    pipe(pfd);

    write(pfd[1], "abc", 3);

    fd_set rfds;
    FD_ZERO(&rfds);
    FD_SET(pfd[0], &rfds);
    struct timeval tv = { 0, 0 };

    int ret = select(pfd[0] + 1, &rfds, NULL, NULL, &tv);
    printf("select returned: %d\\n", ret);
    printf("readable: %d\\n", FD_ISSET(pfd[0], &rfds) ? 1 : 0);

    close(pfd[0]);
    close(pfd[1]);
    return 0;
}

// Output:
// select returned: 1
// readable: 1`,
      hints: [
        'Data was written to the pipe before calling select.',
        'With timeout {0, 0}, select returns immediately.',
        'select returns the number of ready file descriptors.'
      ],
      concepts: ['select', 'pipe', 'immediate return', 'readability']
    },
    {
      id: 'c-poll-17',
      title: 'Predict poll revents',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Predict the revents values after polling a closed pipe.',
      skeleton: `#include <poll.h>
#include <unistd.h>
#include <stdio.h>

int main(void) {
    int pfd[2];
    pipe(pfd);

    close(pfd[1]);  // Close write end

    struct pollfd pfds;
    pfds.fd = pfd[0];
    pfds.events = POLLIN;
    pfds.revents = 0;

    int ret = poll(&pfds, 1, 0);
    printf("poll returned: %d\\n", ret);
    printf("POLLIN: %d\\n", (pfds.revents & POLLIN) ? 1 : 0);
    printf("POLLHUP: %d\\n", (pfds.revents & POLLHUP) ? 1 : 0);

    close(pfd[0]);
    return 0;
}`,
      solution: `#include <poll.h>
#include <unistd.h>
#include <stdio.h>

int main(void) {
    int pfd[2];
    pipe(pfd);

    close(pfd[1]);

    struct pollfd pfds;
    pfds.fd = pfd[0];
    pfds.events = POLLIN;
    pfds.revents = 0;

    int ret = poll(&pfds, 1, 0);
    printf("poll returned: %d\\n", ret);
    printf("POLLIN: %d\\n", (pfds.revents & POLLIN) ? 1 : 0);
    printf("POLLHUP: %d\\n", (pfds.revents & POLLHUP) ? 1 : 0);

    close(pfd[0]);
    return 0;
}

// Output:
// poll returned: 1
// POLLIN: 1
// POLLHUP: 1`,
      hints: [
        'When the write end of a pipe is closed, reading returns EOF.',
        'POLLHUP indicates the other end has closed (hangup).',
        'POLLIN is also set because read() would return immediately (with 0 = EOF).'
      ],
      concepts: ['POLLHUP', 'pipe EOF', 'revents', 'hangup detection']
    },
    {
      id: 'c-poll-18',
      title: 'Predict timeout behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the return value of poll when no events occur before the timeout.',
      skeleton: `#include <poll.h>
#include <unistd.h>
#include <stdio.h>

int main(void) {
    int pfd[2];
    pipe(pfd);

    // Nobody writes to the pipe
    struct pollfd pfds;
    pfds.fd = pfd[0];
    pfds.events = POLLIN;

    int ret = poll(&pfds, 1, 0);  // Immediate return
    printf("ret: %d\\n", ret);
    printf("revents: %d\\n", pfds.revents);

    close(pfd[0]);
    close(pfd[1]);
    return 0;
}`,
      solution: `#include <poll.h>
#include <unistd.h>
#include <stdio.h>

int main(void) {
    int pfd[2];
    pipe(pfd);

    struct pollfd pfds;
    pfds.fd = pfd[0];
    pfds.events = POLLIN;

    int ret = poll(&pfds, 1, 0);
    printf("ret: %d\\n", ret);
    printf("revents: %d\\n", pfds.revents);

    close(pfd[0]);
    close(pfd[1]);
    return 0;
}

// Output:
// ret: 0
// revents: 0`,
      hints: [
        'With timeout 0, poll checks and returns immediately.',
        'No data was written to the pipe, so the read end is not ready.',
        'poll returns 0 when no file descriptors are ready (timeout expired).'
      ],
      concepts: ['poll', 'timeout', 'no events', 'immediate return']
    },
    {
      id: 'c-poll-19',
      title: 'Refactor select to poll',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor a select-based server to use poll instead.',
      skeleton: `#include <sys/select.h>
#include <sys/socket.h>
#include <unistd.h>
#include <stdio.h>

// Refactor this select-based server to use poll() instead.
void serve_select(int listen_fd) {
    fd_set master, readfds;
    FD_ZERO(&master);
    FD_SET(listen_fd, &master);
    int fdmax = listen_fd;

    for (int iter = 0; iter < 100; iter++) {
        readfds = master;
        select(fdmax + 1, &readfds, NULL, NULL, NULL);

        for (int fd = 0; fd <= fdmax; fd++) {
            if (!FD_ISSET(fd, &readfds)) continue;
            if (fd == listen_fd) {
                int client = accept(listen_fd, NULL, NULL);
                FD_SET(client, &master);
                if (client > fdmax) fdmax = client;
            } else {
                char buf[1024];
                ssize_t n = recv(fd, buf, sizeof(buf), 0);
                if (n <= 0) {
                    close(fd);
                    FD_CLR(fd, &master);
                } else {
                    send(fd, buf, n, 0);
                }
            }
        }
    }
}`,
      solution: `#include <poll.h>
#include <sys/socket.h>
#include <unistd.h>
#include <stdio.h>

#define MAX_FDS 256

void serve_poll(int listen_fd) {
    struct pollfd fds[MAX_FDS];
    int nfds = 1;

    fds[0].fd = listen_fd;
    fds[0].events = POLLIN;

    for (int iter = 0; iter < 100; iter++) {
        int ret = poll(fds, nfds, -1);
        if (ret <= 0) continue;

        for (int i = 0; i < nfds; i++) {
            if (!(fds[i].revents & POLLIN)) continue;

            if (fds[i].fd == listen_fd) {
                int client = accept(listen_fd, NULL, NULL);
                if (client >= 0 && nfds < MAX_FDS) {
                    fds[nfds].fd = client;
                    fds[nfds].events = POLLIN;
                    fds[nfds].revents = 0;
                    nfds++;
                }
            } else {
                char buf[1024];
                ssize_t n = recv(fds[i].fd, buf, sizeof(buf), 0);
                if (n <= 0) {
                    close(fds[i].fd);
                    fds[i] = fds[nfds - 1];
                    nfds--;
                    i--;
                } else {
                    send(fds[i].fd, buf, n, 0);
                }
            }
        }
    }
}`,
      hints: [
        'Replace fd_set with a struct pollfd array.',
        'poll() does not need nfds+1 -- it takes the array length directly.',
        'Remove disconnected clients by swapping with the last entry.'
      ],
      concepts: ['select to poll', 'refactoring', 'pollfd array', 'client removal']
    },
    {
      id: 'c-poll-20',
      title: 'Refactor blocking to non-blocking server',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor a blocking sequential server to use non-blocking I/O with poll for concurrent client handling.',
      skeleton: `#include <sys/socket.h>
#include <unistd.h>
#include <stdio.h>

// This server blocks on each client. Refactor to use non-blocking
// I/O with poll() so it can handle multiple clients concurrently.
void blocking_server(int listen_fd, int max_clients) {
    for (int i = 0; i < max_clients; i++) {
        int client = accept(listen_fd, NULL, NULL);
        char buf[1024];
        ssize_t n;
        while ((n = recv(client, buf, sizeof(buf), 0)) > 0) {
            send(client, buf, n, 0);
        }
        close(client);
    }
}`,
      solution: `#include <sys/socket.h>
#include <poll.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <stdio.h>

#define MAX_FDS 128

static void set_nonblock(int fd) {
    int flags = fcntl(fd, F_GETFL, 0);
    fcntl(fd, F_SETFL, flags | O_NONBLOCK);
}

void nonblocking_server(int listen_fd, int max_clients) {
    set_nonblock(listen_fd);
    struct pollfd fds[MAX_FDS];
    int nfds = 1;
    int served = 0;

    fds[0].fd = listen_fd;
    fds[0].events = POLLIN;

    while (served < max_clients || nfds > 1) {
        int ret = poll(fds, nfds, 1000);
        if (ret <= 0) continue;

        for (int i = 0; i < nfds; i++) {
            if (!(fds[i].revents)) continue;

            if (fds[i].fd == listen_fd) {
                if (served >= max_clients) continue;
                int client = accept(listen_fd, NULL, NULL);
                if (client >= 0 && nfds < MAX_FDS) {
                    set_nonblock(client);
                    fds[nfds].fd = client;
                    fds[nfds].events = POLLIN;
                    fds[nfds].revents = 0;
                    nfds++;
                    served++;
                }
            } else {
                char buf[1024];
                ssize_t n = recv(fds[i].fd, buf, sizeof(buf), 0);
                if (n > 0) {
                    send(fds[i].fd, buf, n, 0);
                } else if (n == 0 || (n < 0 && errno != EAGAIN)) {
                    close(fds[i].fd);
                    fds[i] = fds[nfds - 1];
                    nfds--;
                    i--;
                }
            }
        }
    }
}`,
      hints: [
        'Set both the listen socket and client sockets to non-blocking.',
        'Use poll() to detect which sockets have activity.',
        'Handle EAGAIN/EWOULDBLOCK for non-blocking recv that has no data.'
      ],
      concepts: ['non-blocking I/O', 'poll', 'concurrent server', 'EAGAIN']
    }
  ]
};
