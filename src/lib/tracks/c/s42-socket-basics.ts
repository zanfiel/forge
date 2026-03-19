import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-sock',
  title: '42. Socket Programming Basics',
  explanation: `## Socket Programming Basics

Sockets are the fundamental building blocks for network communication in C. They provide a standard interface for sending and receiving data over TCP and UDP.

\`\`\`c
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>

// Create a TCP socket
int sockfd = socket(AF_INET, SOCK_STREAM, 0);

// Set up server address
struct sockaddr_in addr;
memset(&addr, 0, sizeof(addr));
addr.sin_family = AF_INET;
addr.sin_port = htons(8080);
addr.sin_addr.s_addr = INADDR_ANY;

// Bind, listen, accept (server)
bind(sockfd, (struct sockaddr *)&addr, sizeof(addr));
listen(sockfd, 5);
int client = accept(sockfd, NULL, NULL);

// Connect (client)
int cfd = socket(AF_INET, SOCK_STREAM, 0);
connect(cfd, (struct sockaddr *)&addr, sizeof(addr));

// UDP socket
int ufd = socket(AF_INET, SOCK_DGRAM, 0);
sendto(ufd, "hello", 5, 0, (struct sockaddr *)&addr, sizeof(addr));
\`\`\`

### Key Concepts
- **socket()**: creates an endpoint for communication
- **AF_INET / AF_INET6**: IPv4 and IPv6 address families
- **SOCK_STREAM**: TCP (reliable, connection-oriented)
- **SOCK_DGRAM**: UDP (unreliable, connectionless)
- **bind()**: assigns an address to a socket
- **listen()**: marks a socket as passive (server)
- **accept()**: accepts an incoming connection
- **connect()**: initiates a connection to a remote socket
- **htons() / ntohs()**: convert between host and network byte order
- **getaddrinfo()**: modern address resolution replacing gethostbyname
`,
  exercises: [
    {
      id: 'c-sock-1',
      title: 'Create a TCP socket',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Create a TCP socket using the socket() system call.',
      skeleton: `#include <sys/socket.h>
#include <stdio.h>

int main(void) {
    int sockfd = socket(__BLANK__, __BLANK__, 0);
    if (sockfd < 0) {
        perror("socket");
        return 1;
    }
    printf("Socket created: %d\\n", sockfd);
    close(sockfd);
    return 0;
}`,
      solution: `#include <sys/socket.h>
#include <stdio.h>

int main(void) {
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (sockfd < 0) {
        perror("socket");
        return 1;
    }
    printf("Socket created: %d\\n", sockfd);
    close(sockfd);
    return 0;
}`,
      hints: [
        'AF_INET is the address family for IPv4.',
        'SOCK_STREAM is the socket type for TCP.',
        'The third argument (protocol) is typically 0 for default.'
      ],
      concepts: ['socket', 'AF_INET', 'SOCK_STREAM', 'TCP']
    },
    {
      id: 'c-sock-2',
      title: 'Set up sockaddr_in',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fill in the sockaddr_in structure fields for a server listening on port 8080.',
      skeleton: `#include <netinet/in.h>
#include <string.h>

int main(void) {
    struct sockaddr_in addr;
    memset(&addr, 0, sizeof(addr));
    addr.sin_family = __BLANK__;
    addr.sin_port = __BLANK__;
    addr.sin_addr.s_addr = __BLANK__;
    return 0;
}`,
      solution: `#include <netinet/in.h>
#include <string.h>

int main(void) {
    struct sockaddr_in addr;
    memset(&addr, 0, sizeof(addr));
    addr.sin_family = AF_INET;
    addr.sin_port = htons(8080);
    addr.sin_addr.s_addr = INADDR_ANY;
    return 0;
}`,
      hints: [
        'sin_family should match the address family used in socket().',
        'htons() converts a port number to network byte order.',
        'INADDR_ANY means the server will accept connections on any interface.'
      ],
      concepts: ['sockaddr_in', 'htons', 'INADDR_ANY', 'byte order']
    },
    {
      id: 'c-sock-3',
      title: 'Bind a socket',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Bind a socket to an address using the bind() system call.',
      skeleton: `#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <stdio.h>

int main(void) {
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in addr;
    memset(&addr, 0, sizeof(addr));
    addr.sin_family = AF_INET;
    addr.sin_port = htons(9000);
    addr.sin_addr.s_addr = INADDR_ANY;

    if (__BLANK__(sockfd, (struct sockaddr *)&addr, __BLANK__) < 0) {
        perror("bind");
        return 1;
    }
    printf("Bound successfully\\n");
    close(sockfd);
    return 0;
}`,
      solution: `#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <stdio.h>

int main(void) {
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in addr;
    memset(&addr, 0, sizeof(addr));
    addr.sin_family = AF_INET;
    addr.sin_port = htons(9000);
    addr.sin_addr.s_addr = INADDR_ANY;

    if (bind(sockfd, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
        perror("bind");
        return 1;
    }
    printf("Bound successfully\\n");
    close(sockfd);
    return 0;
}`,
      hints: [
        'bind() assigns a local address to a socket.',
        'The second argument must be cast to (struct sockaddr *).',
        'The third argument is the size of the address structure.'
      ],
      concepts: ['bind', 'sockaddr', 'socket address']
    },
    {
      id: 'c-sock-4',
      title: 'Listen on a socket',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Mark a socket as passive and set the backlog queue size.',
      skeleton: `#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <stdio.h>

int main(void) {
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in addr;
    memset(&addr, 0, sizeof(addr));
    addr.sin_family = AF_INET;
    addr.sin_port = htons(9000);
    addr.sin_addr.s_addr = INADDR_ANY;
    bind(sockfd, (struct sockaddr *)&addr, sizeof(addr));

    if (__BLANK__(sockfd, __BLANK__) < 0) {
        perror("listen");
        return 1;
    }
    printf("Listening on port 9000\\n");
    close(sockfd);
    return 0;
}`,
      solution: `#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <stdio.h>

int main(void) {
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in addr;
    memset(&addr, 0, sizeof(addr));
    addr.sin_family = AF_INET;
    addr.sin_port = htons(9000);
    addr.sin_addr.s_addr = INADDR_ANY;
    bind(sockfd, (struct sockaddr *)&addr, sizeof(addr));

    if (listen(sockfd, 5) < 0) {
        perror("listen");
        return 1;
    }
    printf("Listening on port 9000\\n");
    close(sockfd);
    return 0;
}`,
      hints: [
        'listen() marks the socket as a passive socket for accepting connections.',
        'The backlog parameter specifies the maximum length of the pending connections queue.',
        'A backlog of 5 is a common default value.'
      ],
      concepts: ['listen', 'backlog', 'passive socket']
    },
    {
      id: 'c-sock-5',
      title: 'Accept a connection',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Accept an incoming connection and retrieve the client address.',
      skeleton: `#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>

int main(void) {
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in addr, client_addr;
    socklen_t client_len = sizeof(client_addr);

    memset(&addr, 0, sizeof(addr));
    addr.sin_family = AF_INET;
    addr.sin_port = htons(9000);
    addr.sin_addr.s_addr = INADDR_ANY;
    bind(sockfd, (struct sockaddr *)&addr, sizeof(addr));
    listen(sockfd, 5);

    int client_fd = __BLANK__(sockfd, (struct sockaddr *)__BLANK__, __BLANK__);
    if (client_fd < 0) {
        perror("accept");
        return 1;
    }
    printf("Client connected\\n");
    close(client_fd);
    close(sockfd);
    return 0;
}`,
      solution: `#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>

int main(void) {
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in addr, client_addr;
    socklen_t client_len = sizeof(client_addr);

    memset(&addr, 0, sizeof(addr));
    addr.sin_family = AF_INET;
    addr.sin_port = htons(9000);
    addr.sin_addr.s_addr = INADDR_ANY;
    bind(sockfd, (struct sockaddr *)&addr, sizeof(addr));
    listen(sockfd, 5);

    int client_fd = accept(sockfd, (struct sockaddr *)&client_addr, &client_len);
    if (client_fd < 0) {
        perror("accept");
        return 1;
    }
    printf("Client connected\\n");
    close(client_fd);
    close(sockfd);
    return 0;
}`,
      hints: [
        'accept() extracts the first connection from the pending queue.',
        'The second argument receives the address of the connecting client.',
        'The third argument is a pointer to socklen_t (note the &).'
      ],
      concepts: ['accept', 'socklen_t', 'client address']
    },
    {
      id: 'c-sock-6',
      title: 'Connect to a server',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Connect a client socket to a remote server.',
      skeleton: `#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>

int main(void) {
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in server;
    memset(&server, 0, sizeof(server));
    server.sin_family = AF_INET;
    server.sin_port = htons(8080);
    inet_pton(AF_INET, "127.0.0.1", &server.sin_addr);

    if (__BLANK__(sockfd, (struct sockaddr *)&server, __BLANK__) < 0) {
        perror("connect");
        return 1;
    }
    printf("Connected to server\\n");
    close(sockfd);
    return 0;
}`,
      solution: `#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>

int main(void) {
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in server;
    memset(&server, 0, sizeof(server));
    server.sin_family = AF_INET;
    server.sin_port = htons(8080);
    inet_pton(AF_INET, "127.0.0.1", &server.sin_addr);

    if (connect(sockfd, (struct sockaddr *)&server, sizeof(server)) < 0) {
        perror("connect");
        return 1;
    }
    printf("Connected to server\\n");
    close(sockfd);
    return 0;
}`,
      hints: [
        'connect() initiates a connection on a socket.',
        'The address structure must be cast to (struct sockaddr *).',
        'The third argument is the size of the server address structure.'
      ],
      concepts: ['connect', 'inet_pton', 'client connection']
    },
    {
      id: 'c-sock-7',
      title: 'TCP echo server function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that handles a single TCP client by echoing back everything it receives until the client disconnects.',
      skeleton: `#include <sys/socket.h>
#include <unistd.h>
#include <stdio.h>

// Write a function that reads data from client_fd and sends it back
// until the client disconnects (recv returns 0 or error).
// Return 0 on clean disconnect, -1 on error.
int echo_client(int client_fd) {
    // TODO: implement
}`,
      solution: `#include <sys/socket.h>
#include <unistd.h>
#include <stdio.h>

int echo_client(int client_fd) {
    char buf[1024];
    ssize_t n;
    while ((n = recv(client_fd, buf, sizeof(buf), 0)) > 0) {
        ssize_t sent = 0;
        while (sent < n) {
            ssize_t s = send(client_fd, buf + sent, n - sent, 0);
            if (s < 0) return -1;
            sent += s;
        }
    }
    return (n == 0) ? 0 : -1;
}`,
      hints: [
        'Use recv() in a loop to read data from the client.',
        'send() may not send all bytes at once -- loop until all bytes are sent.',
        'recv() returns 0 when the client has closed the connection.'
      ],
      concepts: ['recv', 'send', 'echo server', 'partial send']
    },
    {
      id: 'c-sock-8',
      title: 'TCP client send message',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that connects to a server, sends a message, receives the response, and returns it.',
      skeleton: `#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <string.h>
#include <unistd.h>

// Connect to the given IP and port, send msg, receive response into
// resp buffer (max resp_size bytes). Return bytes received or -1 on error.
ssize_t send_and_receive(const char *ip, int port,
                         const char *msg, size_t msg_len,
                         char *resp, size_t resp_size) {
    // TODO: implement
}`,
      solution: `#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <string.h>
#include <unistd.h>

ssize_t send_and_receive(const char *ip, int port,
                         const char *msg, size_t msg_len,
                         char *resp, size_t resp_size) {
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (sockfd < 0) return -1;

    struct sockaddr_in addr;
    memset(&addr, 0, sizeof(addr));
    addr.sin_family = AF_INET;
    addr.sin_port = htons(port);
    if (inet_pton(AF_INET, ip, &addr.sin_addr) <= 0) {
        close(sockfd);
        return -1;
    }

    if (connect(sockfd, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
        close(sockfd);
        return -1;
    }

    ssize_t sent = 0;
    while ((size_t)sent < msg_len) {
        ssize_t s = send(sockfd, msg + sent, msg_len - sent, 0);
        if (s < 0) { close(sockfd); return -1; }
        sent += s;
    }

    ssize_t n = recv(sockfd, resp, resp_size - 1, 0);
    close(sockfd);
    if (n >= 0) resp[n] = '\\0';
    return n;
}`,
      hints: [
        'Create socket, set up sockaddr_in, connect, then send.',
        'Always check return values of socket(), connect(), send().',
        'Remember to close the socket before returning on error.'
      ],
      concepts: ['TCP client', 'connect', 'send', 'recv', 'error handling']
    },
    {
      id: 'c-sock-9',
      title: 'UDP sender function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that sends a UDP datagram to a given address and port.',
      skeleton: `#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <string.h>
#include <unistd.h>

// Send a UDP datagram containing data (data_len bytes) to ip:port.
// Return bytes sent or -1 on error.
ssize_t udp_send(const char *ip, int port,
                 const char *data, size_t data_len) {
    // TODO: implement
}`,
      solution: `#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <string.h>
#include <unistd.h>

ssize_t udp_send(const char *ip, int port,
                 const char *data, size_t data_len) {
    int sockfd = socket(AF_INET, SOCK_DGRAM, 0);
    if (sockfd < 0) return -1;

    struct sockaddr_in dest;
    memset(&dest, 0, sizeof(dest));
    dest.sin_family = AF_INET;
    dest.sin_port = htons(port);
    if (inet_pton(AF_INET, ip, &dest.sin_addr) <= 0) {
        close(sockfd);
        return -1;
    }

    ssize_t sent = sendto(sockfd, data, data_len, 0,
                          (struct sockaddr *)&dest, sizeof(dest));
    close(sockfd);
    return sent;
}`,
      hints: [
        'Use SOCK_DGRAM for UDP sockets.',
        'sendto() is used for connectionless UDP communication.',
        'No connect/bind is needed for a simple UDP sender.'
      ],
      concepts: ['UDP', 'SOCK_DGRAM', 'sendto', 'datagram']
    },
    {
      id: 'c-sock-10',
      title: 'UDP receiver function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that binds to a UDP port and receives a single datagram.',
      skeleton: `#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <unistd.h>

// Bind to the given port and receive one UDP datagram into buf.
// Store sender address in sender_addr. Return bytes received or -1.
ssize_t udp_receive(int port, char *buf, size_t buf_size,
                    struct sockaddr_in *sender_addr) {
    // TODO: implement
}`,
      solution: `#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <unistd.h>

ssize_t udp_receive(int port, char *buf, size_t buf_size,
                    struct sockaddr_in *sender_addr) {
    int sockfd = socket(AF_INET, SOCK_DGRAM, 0);
    if (sockfd < 0) return -1;

    struct sockaddr_in addr;
    memset(&addr, 0, sizeof(addr));
    addr.sin_family = AF_INET;
    addr.sin_port = htons(port);
    addr.sin_addr.s_addr = INADDR_ANY;

    if (bind(sockfd, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
        close(sockfd);
        return -1;
    }

    socklen_t sender_len = sizeof(*sender_addr);
    ssize_t n = recvfrom(sockfd, buf, buf_size, 0,
                         (struct sockaddr *)sender_addr, &sender_len);
    close(sockfd);
    return n;
}`,
      hints: [
        'UDP receivers must bind() to a port to receive datagrams.',
        'recvfrom() receives data and stores the sender address.',
        'The sender length must be initialized before calling recvfrom().'
      ],
      concepts: ['UDP', 'recvfrom', 'bind', 'datagram receiver']
    },
    {
      id: 'c-sock-11',
      title: 'Connect using getaddrinfo',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a function that uses getaddrinfo to resolve a hostname and connect a TCP socket.',
      skeleton: `#include <sys/socket.h>
#include <netdb.h>
#include <string.h>
#include <unistd.h>
#include <stdio.h>

// Resolve hostname:port using getaddrinfo and return a connected
// TCP socket, or -1 on failure.
int connect_to_host(const char *hostname, const char *port) {
    // TODO: implement
}`,
      solution: `#include <sys/socket.h>
#include <netdb.h>
#include <string.h>
#include <unistd.h>
#include <stdio.h>

int connect_to_host(const char *hostname, const char *port) {
    struct addrinfo hints, *res, *rp;
    memset(&hints, 0, sizeof(hints));
    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = SOCK_STREAM;

    int status = getaddrinfo(hostname, port, &hints, &res);
    if (status != 0) return -1;

    int sockfd = -1;
    for (rp = res; rp != NULL; rp = rp->ai_next) {
        sockfd = socket(rp->ai_family, rp->ai_socktype, rp->ai_protocol);
        if (sockfd < 0) continue;
        if (connect(sockfd, rp->ai_addr, rp->ai_addrlen) == 0) break;
        close(sockfd);
        sockfd = -1;
    }

    freeaddrinfo(res);
    return sockfd;
}`,
      hints: [
        'getaddrinfo() returns a linked list of results -- try each one.',
        'AF_UNSPEC allows both IPv4 and IPv6.',
        'Always call freeaddrinfo() when done with the result list.'
      ],
      concepts: ['getaddrinfo', 'name resolution', 'AF_UNSPEC', 'freeaddrinfo']
    },
    {
      id: 'c-sock-12',
      title: 'Set socket options',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that creates a TCP server socket with SO_REUSEADDR and a receive timeout.',
      skeleton: `#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <unistd.h>

// Create a TCP socket with SO_REUSEADDR enabled and a receive
// timeout of timeout_sec seconds. Return the socket fd or -1.
int create_server_socket(int port, int timeout_sec) {
    // TODO: implement
}`,
      solution: `#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <unistd.h>

int create_server_socket(int port, int timeout_sec) {
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (sockfd < 0) return -1;

    int optval = 1;
    if (setsockopt(sockfd, SOL_SOCKET, SO_REUSEADDR,
                   &optval, sizeof(optval)) < 0) {
        close(sockfd);
        return -1;
    }

    struct timeval tv;
    tv.tv_sec = timeout_sec;
    tv.tv_usec = 0;
    if (setsockopt(sockfd, SOL_SOCKET, SO_RCVTIMEO,
                   &tv, sizeof(tv)) < 0) {
        close(sockfd);
        return -1;
    }

    struct sockaddr_in addr;
    memset(&addr, 0, sizeof(addr));
    addr.sin_family = AF_INET;
    addr.sin_port = htons(port);
    addr.sin_addr.s_addr = INADDR_ANY;

    if (bind(sockfd, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
        close(sockfd);
        return -1;
    }

    if (listen(sockfd, 10) < 0) {
        close(sockfd);
        return -1;
    }

    return sockfd;
}`,
      hints: [
        'setsockopt() with SOL_SOCKET level sets socket-level options.',
        'SO_REUSEADDR allows reusing a recently freed port.',
        'SO_RCVTIMEO takes a struct timeval for the timeout value.'
      ],
      concepts: ['setsockopt', 'SO_REUSEADDR', 'SO_RCVTIMEO', 'socket options']
    },
    {
      id: 'c-sock-13',
      title: 'Fix missing SO_REUSEADDR',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the server that fails to restart because the port is still in TIME_WAIT state.',
      skeleton: `#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>

// BUG: Server fails with "Address already in use" after restart
int main(void) {
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);

    struct sockaddr_in addr;
    memset(&addr, 0, sizeof(addr));
    addr.sin_family = AF_INET;
    addr.sin_port = htons(8080);
    addr.sin_addr.s_addr = INADDR_ANY;

    if (bind(sockfd, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
        perror("bind");
        return 1;
    }
    listen(sockfd, 5);
    printf("Server listening on 8080\\n");
    close(sockfd);
    return 0;
}`,
      solution: `#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>

int main(void) {
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);

    int optval = 1;
    setsockopt(sockfd, SOL_SOCKET, SO_REUSEADDR, &optval, sizeof(optval));

    struct sockaddr_in addr;
    memset(&addr, 0, sizeof(addr));
    addr.sin_family = AF_INET;
    addr.sin_port = htons(8080);
    addr.sin_addr.s_addr = INADDR_ANY;

    if (bind(sockfd, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
        perror("bind");
        return 1;
    }
    listen(sockfd, 5);
    printf("Server listening on 8080\\n");
    close(sockfd);
    return 0;
}`,
      hints: [
        'When a server restarts quickly, the port may still be in TIME_WAIT.',
        'SO_REUSEADDR allows binding to an address that is in TIME_WAIT.',
        'Set the option with setsockopt() before calling bind().'
      ],
      concepts: ['SO_REUSEADDR', 'TIME_WAIT', 'setsockopt', 'address reuse']
    },
    {
      id: 'c-sock-14',
      title: 'Fix incorrect byte order',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the server that binds to the wrong port due to byte order issues.',
      skeleton: `#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>

// BUG: Server binds to wrong port (should be 8080)
int main(void) {
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in addr;
    memset(&addr, 0, sizeof(addr));
    addr.sin_family = AF_INET;
    addr.sin_port = 8080;  // Bug is here
    addr.sin_addr.s_addr = INADDR_ANY;

    bind(sockfd, (struct sockaddr *)&addr, sizeof(addr));
    listen(sockfd, 5);
    printf("Listening...\\n");
    close(sockfd);
    return 0;
}`,
      solution: `#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>

int main(void) {
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in addr;
    memset(&addr, 0, sizeof(addr));
    addr.sin_family = AF_INET;
    addr.sin_port = htons(8080);
    addr.sin_addr.s_addr = INADDR_ANY;

    bind(sockfd, (struct sockaddr *)&addr, sizeof(addr));
    listen(sockfd, 5);
    printf("Listening...\\n");
    close(sockfd);
    return 0;
}`,
      hints: [
        'Network protocols use big-endian byte order.',
        'x86 systems use little-endian byte order.',
        'htons() converts a 16-bit value from host to network byte order.'
      ],
      concepts: ['byte order', 'htons', 'endianness', 'network byte order']
    },
    {
      id: 'c-sock-15',
      title: 'Fix unchecked connect return',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the client that does not properly check for connection errors.',
      skeleton: `#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>

// BUG: Client sends data even if connection failed
int main(void) {
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in server;
    memset(&server, 0, sizeof(server));
    server.sin_family = AF_INET;
    server.sin_port = htons(8080);
    inet_pton(AF_INET, "192.168.1.100", &server.sin_addr);

    connect(sockfd, (struct sockaddr *)&server, sizeof(server));

    const char *msg = "Hello server";
    send(sockfd, msg, strlen(msg), 0);
    printf("Message sent\\n");
    close(sockfd);
    return 0;
}`,
      solution: `#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>

int main(void) {
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (sockfd < 0) {
        perror("socket");
        return 1;
    }

    struct sockaddr_in server;
    memset(&server, 0, sizeof(server));
    server.sin_family = AF_INET;
    server.sin_port = htons(8080);
    inet_pton(AF_INET, "192.168.1.100", &server.sin_addr);

    if (connect(sockfd, (struct sockaddr *)&server, sizeof(server)) < 0) {
        perror("connect");
        close(sockfd);
        return 1;
    }

    const char *msg = "Hello server";
    send(sockfd, msg, strlen(msg), 0);
    printf("Message sent\\n");
    close(sockfd);
    return 0;
}`,
      hints: [
        'connect() returns -1 on failure and sets errno.',
        'Sending on a socket that failed to connect causes undefined behavior or SIGPIPE.',
        'Always check the return value of connect() before sending data.'
      ],
      concepts: ['error handling', 'connect', 'return value checking']
    },
    {
      id: 'c-sock-16',
      title: 'Predict socket type check',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict what the program prints when checking the socket type.',
      skeleton: `#include <sys/socket.h>
#include <stdio.h>
#include <unistd.h>

int main(void) {
    int tcp = socket(AF_INET, SOCK_STREAM, 0);
    int udp = socket(AF_INET, SOCK_DGRAM, 0);

    int type;
    socklen_t len = sizeof(type);
    getsockopt(tcp, SOL_SOCKET, SO_TYPE, &type, &len);
    printf("TCP type: %d\\n", type == SOCK_STREAM);

    getsockopt(udp, SOL_SOCKET, SO_TYPE, &type, &len);
    printf("UDP type: %d\\n", type == SOCK_DGRAM);

    close(tcp);
    close(udp);
    return 0;
}`,
      solution: `#include <sys/socket.h>
#include <stdio.h>
#include <unistd.h>

int main(void) {
    int tcp = socket(AF_INET, SOCK_STREAM, 0);
    int udp = socket(AF_INET, SOCK_DGRAM, 0);

    int type;
    socklen_t len = sizeof(type);
    getsockopt(tcp, SOL_SOCKET, SO_TYPE, &type, &len);
    printf("TCP type: %d\\n", type == SOCK_STREAM);

    getsockopt(udp, SOL_SOCKET, SO_TYPE, &type, &len);
    printf("UDP type: %d\\n", type == SOCK_DGRAM);

    close(tcp);
    close(udp);
    return 0;
}

// Output:
// TCP type: 1
// UDP type: 1`,
      hints: [
        'getsockopt with SO_TYPE retrieves the socket type.',
        'The comparison == returns 1 (true) or 0 (false).',
        'SOCK_STREAM matches TCP, SOCK_DGRAM matches UDP.'
      ],
      concepts: ['getsockopt', 'SO_TYPE', 'socket type query']
    },
    {
      id: 'c-sock-17',
      title: 'Predict send on closed socket',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Predict what happens when sending data on a socket whose remote end has closed.',
      skeleton: `#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <stdio.h>
#include <signal.h>
#include <errno.h>
#include <unistd.h>

int main(void) {
    signal(SIGPIPE, SIG_IGN);

    int sv[2];
    socketpair(AF_UNIX, SOCK_STREAM, 0, sv);

    close(sv[1]);  // Close the receiving end

    ssize_t n = send(sv[0], "hello", 5, 0);
    if (n < 0) {
        printf("Error: %s\\n",
               (errno == EPIPE) ? "EPIPE" : "other");
    } else {
        printf("Sent: %zd\\n", n);
    }
    close(sv[0]);
    return 0;
}`,
      solution: `#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <stdio.h>
#include <signal.h>
#include <errno.h>
#include <unistd.h>

int main(void) {
    signal(SIGPIPE, SIG_IGN);

    int sv[2];
    socketpair(AF_UNIX, SOCK_STREAM, 0, sv);

    close(sv[1]);

    ssize_t n = send(sv[0], "hello", 5, 0);
    if (n < 0) {
        printf("Error: %s\\n",
               (errno == EPIPE) ? "EPIPE" : "other");
    } else {
        printf("Sent: %zd\\n", n);
    }
    close(sv[0]);
    return 0;
}

// Output:
// Error: EPIPE`,
      hints: [
        'Writing to a socket whose read end is closed generates SIGPIPE.',
        'With SIGPIPE ignored, send() returns -1 and sets errno to EPIPE.',
        'socketpair() creates two connected sockets -- closing one breaks the pipe.'
      ],
      concepts: ['SIGPIPE', 'EPIPE', 'broken pipe', 'socketpair']
    },
    {
      id: 'c-sock-18',
      title: 'Predict server accept loop',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Predict the behavior of a server accept loop that handles two sequential clients.',
      skeleton: `#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>

// Assume two clients connect sequentially, each sending "Hi"
// What does the server print?
void server(int sockfd) {
    for (int i = 0; i < 2; i++) {
        int client = accept(sockfd, NULL, NULL);
        char buf[64];
        ssize_t n = recv(client, buf, sizeof(buf) - 1, 0);
        if (n > 0) {
            buf[n] = '\\0';
            printf("Client %d: %s\\n", i + 1, buf);
        }
        close(client);
    }
}`,
      solution: `#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>

void server(int sockfd) {
    for (int i = 0; i < 2; i++) {
        int client = accept(sockfd, NULL, NULL);
        char buf[64];
        ssize_t n = recv(client, buf, sizeof(buf) - 1, 0);
        if (n > 0) {
            buf[n] = '\\0';
            printf("Client %d: %s\\n", i + 1, buf);
        }
        close(client);
    }
}

// Output:
// Client 1: Hi
// Client 2: Hi`,
      hints: [
        'accept() blocks until a client connects.',
        'The server handles one client at a time (sequential).',
        'Each client gets its own file descriptor from accept().'
      ],
      concepts: ['accept loop', 'sequential server', 'blocking I/O']
    },
    {
      id: 'c-sock-19',
      title: 'Refactor to use getaddrinfo',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor a hardcoded server to use getaddrinfo for address resolution, supporting both IPv4 and IPv6.',
      skeleton: `#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>

// Refactor this server to use getaddrinfo instead of
// manually constructing sockaddr_in. Support both IPv4 and IPv6.
int start_server(int port) {
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (sockfd < 0) return -1;

    int opt = 1;
    setsockopt(sockfd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

    struct sockaddr_in addr;
    memset(&addr, 0, sizeof(addr));
    addr.sin_family = AF_INET;
    addr.sin_port = htons(port);
    addr.sin_addr.s_addr = INADDR_ANY;

    if (bind(sockfd, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
        close(sockfd);
        return -1;
    }
    listen(sockfd, 10);
    return sockfd;
}`,
      solution: `#include <sys/socket.h>
#include <netdb.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>

int start_server(int port) {
    char port_str[16];
    snprintf(port_str, sizeof(port_str), "%d", port);

    struct addrinfo hints, *res;
    memset(&hints, 0, sizeof(hints));
    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = SOCK_STREAM;
    hints.ai_flags = AI_PASSIVE;

    if (getaddrinfo(NULL, port_str, &hints, &res) != 0) return -1;

    int sockfd = socket(res->ai_family, res->ai_socktype, res->ai_protocol);
    if (sockfd < 0) {
        freeaddrinfo(res);
        return -1;
    }

    int opt = 1;
    setsockopt(sockfd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

    if (bind(sockfd, res->ai_addr, res->ai_addrlen) < 0) {
        close(sockfd);
        freeaddrinfo(res);
        return -1;
    }

    freeaddrinfo(res);
    listen(sockfd, 10);
    return sockfd;
}`,
      hints: [
        'AI_PASSIVE with NULL hostname means bind to all interfaces.',
        'getaddrinfo needs the port as a string, not an integer.',
        'AF_UNSPEC allows the system to choose IPv4 or IPv6.'
      ],
      concepts: ['getaddrinfo', 'AI_PASSIVE', 'AF_UNSPEC', 'protocol-independent']
    },
    {
      id: 'c-sock-20',
      title: 'Refactor to handle multiple clients',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor a single-client server to handle multiple sequential clients in a loop with proper cleanup.',
      skeleton: `#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>

// This server only handles one client and exits.
// Refactor it to handle up to max_clients sequential clients,
// echoing their messages. Return total bytes echoed.
long run_server(int sockfd, int max_clients) {
    int client = accept(sockfd, NULL, NULL);
    char buf[1024];
    ssize_t n = recv(client, buf, sizeof(buf), 0);
    if (n > 0) send(client, buf, n, 0);
    close(client);
    return n > 0 ? n : 0;
}`,
      solution: `#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>

long run_server(int sockfd, int max_clients) {
    long total = 0;
    for (int i = 0; i < max_clients; i++) {
        int client = accept(sockfd, NULL, NULL);
        if (client < 0) continue;

        char buf[1024];
        ssize_t n;
        while ((n = recv(client, buf, sizeof(buf), 0)) > 0) {
            ssize_t sent = 0;
            while (sent < n) {
                ssize_t s = send(client, buf + sent, n - sent, 0);
                if (s <= 0) break;
                sent += s;
            }
            total += sent;
        }
        close(client);
    }
    return total;
}`,
      hints: [
        'Wrap the accept/recv/send logic in a for loop up to max_clients.',
        'Echo all data from each client, not just the first recv.',
        'Handle partial sends by looping until all bytes are sent.'
      ],
      concepts: ['multi-client server', 'sequential handling', 'echo server', 'accept loop']
    }
  ]
};
