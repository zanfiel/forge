import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-mmap',
  title: '44. Memory-Mapped I/O',
  explanation: `## Memory-Mapped I/O

Memory-mapped I/O allows you to access file contents as if they were in memory, and to share memory between processes.

\`\`\`c
#include <sys/mman.h>
#include <fcntl.h>
#include <unistd.h>
#include <string.h>

// Map a file into memory for reading
int fd = open("data.txt", O_RDONLY);
struct stat sb;
fstat(fd, &sb);
char *data = mmap(NULL, sb.st_size, PROT_READ, MAP_PRIVATE, fd, 0);
// Use data[0..sb.st_size-1] directly
munmap(data, sb.st_size);
close(fd);

// Anonymous shared mapping for IPC between parent/child
void *shared = mmap(NULL, 4096, PROT_READ | PROT_WRITE,
                    MAP_SHARED | MAP_ANONYMOUS, -1, 0);
if (fork() == 0) {
    strcpy(shared, "hello from child");
    _exit(0);
}
wait(NULL);
printf("%s\\n", (char *)shared);  // "hello from child"
munmap(shared, 4096);
\`\`\`

### Key Concepts
- **mmap()**: maps files or anonymous memory into the process address space
- **munmap()**: unmaps a previously mapped region
- **PROT_READ / PROT_WRITE / PROT_EXEC**: protection flags for the mapping
- **MAP_SHARED**: changes are visible to other processes and written to the file
- **MAP_PRIVATE**: copy-on-write -- changes are private to the process
- **MAP_ANONYMOUS**: mapping not backed by any file (useful for IPC)
- **msync()**: flushes changes to a shared file mapping back to disk
- **MAP_FAILED**: returned by mmap on error (not NULL)
`,
  exercises: [
    {
      id: 'c-mmap-1',
      title: 'Map a file read-only',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Map a file into memory with read-only access.',
      skeleton: `#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>

int main(void) {
    int fd = open("data.txt", O_RDONLY);
    struct stat sb;
    fstat(fd, &sb);

    char *data = __BLANK__(NULL, sb.st_size, __BLANK__,
                           MAP_PRIVATE, fd, 0);
    if (data == MAP_FAILED) {
        perror("mmap");
        return 1;
    }
    printf("First byte: %c\\n", data[0]);
    munmap(data, sb.st_size);
    close(fd);
    return 0;
}`,
      solution: `#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>

int main(void) {
    int fd = open("data.txt", O_RDONLY);
    struct stat sb;
    fstat(fd, &sb);

    char *data = mmap(NULL, sb.st_size, PROT_READ,
                      MAP_PRIVATE, fd, 0);
    if (data == MAP_FAILED) {
        perror("mmap");
        return 1;
    }
    printf("First byte: %c\\n", data[0]);
    munmap(data, sb.st_size);
    close(fd);
    return 0;
}`,
      hints: [
        'mmap() maps a file or memory region into the process address space.',
        'PROT_READ allows reading the mapped memory.',
        'MAP_PRIVATE creates a copy-on-write mapping.'
      ],
      concepts: ['mmap', 'PROT_READ', 'MAP_PRIVATE', 'file mapping']
    },
    {
      id: 'c-mmap-2',
      title: 'Set mmap protection flags',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Map a file with both read and write protection flags.',
      skeleton: `#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>

int main(void) {
    int fd = open("data.bin", O_RDWR);
    struct stat sb;
    fstat(fd, &sb);

    char *data = mmap(NULL, sb.st_size,
                      __BLANK__ | __BLANK__,
                      MAP_SHARED, fd, 0);
    if (data == MAP_FAILED) return 1;
    data[0] = 'X';  // Modify the file through the mapping
    munmap(data, sb.st_size);
    close(fd);
    return 0;
}`,
      solution: `#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>

int main(void) {
    int fd = open("data.bin", O_RDWR);
    struct stat sb;
    fstat(fd, &sb);

    char *data = mmap(NULL, sb.st_size,
                      PROT_READ | PROT_WRITE,
                      MAP_SHARED, fd, 0);
    if (data == MAP_FAILED) return 1;
    data[0] = 'X';
    munmap(data, sb.st_size);
    close(fd);
    return 0;
}`,
      hints: [
        'PROT_READ allows reading, PROT_WRITE allows writing.',
        'Protection flags are combined with bitwise OR.',
        'The file must be opened with matching permissions (O_RDWR for write).'
      ],
      concepts: ['PROT_READ', 'PROT_WRITE', 'protection flags', 'MAP_SHARED']
    },
    {
      id: 'c-mmap-3',
      title: 'Unmap memory with munmap',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Properly unmap a memory-mapped region.',
      skeleton: `#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>

int main(void) {
    int fd = open("data.txt", O_RDONLY);
    struct stat sb;
    fstat(fd, &sb);

    char *data = mmap(NULL, sb.st_size, PROT_READ, MAP_PRIVATE, fd, 0);
    if (data == MAP_FAILED) return 1;

    printf("Size: %ld\\n", (long)sb.st_size);

    if (__BLANK__(data, __BLANK__) < 0) {
        perror("munmap");
    }
    close(fd);
    return 0;
}`,
      solution: `#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>

int main(void) {
    int fd = open("data.txt", O_RDONLY);
    struct stat sb;
    fstat(fd, &sb);

    char *data = mmap(NULL, sb.st_size, PROT_READ, MAP_PRIVATE, fd, 0);
    if (data == MAP_FAILED) return 1;

    printf("Size: %ld\\n", (long)sb.st_size);

    if (munmap(data, sb.st_size) < 0) {
        perror("munmap");
    }
    close(fd);
    return 0;
}`,
      hints: [
        'munmap() releases a memory mapping.',
        'The first argument is the pointer returned by mmap.',
        'The second argument must match the length used in the original mmap call.'
      ],
      concepts: ['munmap', 'memory release', 'cleanup']
    },
    {
      id: 'c-mmap-4',
      title: 'Create anonymous shared mapping',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Create an anonymous shared memory mapping for inter-process communication.',
      skeleton: `#include <sys/mman.h>
#include <sys/wait.h>
#include <unistd.h>
#include <string.h>
#include <stdio.h>

int main(void) {
    int *shared = mmap(NULL, sizeof(int),
                       PROT_READ | PROT_WRITE,
                       __BLANK__ | __BLANK__,
                       -1, 0);
    *shared = 0;

    if (fork() == 0) {
        *shared = 42;
        _exit(0);
    }
    wait(NULL);
    printf("Value: %d\\n", *shared);
    munmap(shared, sizeof(int));
    return 0;
}`,
      solution: `#include <sys/mman.h>
#include <sys/wait.h>
#include <unistd.h>
#include <string.h>
#include <stdio.h>

int main(void) {
    int *shared = mmap(NULL, sizeof(int),
                       PROT_READ | PROT_WRITE,
                       MAP_SHARED | MAP_ANONYMOUS,
                       -1, 0);
    *shared = 0;

    if (fork() == 0) {
        *shared = 42;
        _exit(0);
    }
    wait(NULL);
    printf("Value: %d\\n", *shared);
    munmap(shared, sizeof(int));
    return 0;
}`,
      hints: [
        'MAP_SHARED makes the mapping visible to child processes after fork.',
        'MAP_ANONYMOUS means no file backs the mapping.',
        'With MAP_ANONYMOUS, pass -1 as the file descriptor.'
      ],
      concepts: ['MAP_SHARED', 'MAP_ANONYMOUS', 'IPC', 'shared memory']
    },
    {
      id: 'c-mmap-5',
      title: 'Sync mapped memory with msync',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Flush changes to a shared file mapping back to disk using msync.',
      skeleton: `#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>

int main(void) {
    int fd = open("data.bin", O_RDWR);
    struct stat sb;
    fstat(fd, &sb);

    char *data = mmap(NULL, sb.st_size, PROT_READ | PROT_WRITE,
                      MAP_SHARED, fd, 0);
    data[0] = 'Z';

    // Flush changes to disk synchronously
    __BLANK__(data, sb.st_size, __BLANK__);

    munmap(data, sb.st_size);
    close(fd);
    return 0;
}`,
      solution: `#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>

int main(void) {
    int fd = open("data.bin", O_RDWR);
    struct stat sb;
    fstat(fd, &sb);

    char *data = mmap(NULL, sb.st_size, PROT_READ | PROT_WRITE,
                      MAP_SHARED, fd, 0);
    data[0] = 'Z';

    msync(data, sb.st_size, MS_SYNC);

    munmap(data, sb.st_size);
    close(fd);
    return 0;
}`,
      hints: [
        'msync() flushes changes from the mapping to the underlying file.',
        'MS_SYNC waits until the write is complete (synchronous).',
        'MS_ASYNC schedules the write but returns immediately.'
      ],
      concepts: ['msync', 'MS_SYNC', 'disk flush', 'persistence']
    },
    {
      id: 'c-mmap-6',
      title: 'Map file for read-write access',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Open and map a file for both reading and writing with a shared mapping.',
      skeleton: `#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>

int main(void) {
    int fd = open("config.dat", __BLANK__);
    struct stat sb;
    fstat(fd, &sb);

    char *map = mmap(NULL, sb.st_size, PROT_READ | PROT_WRITE,
                     __BLANK__, fd, 0);
    if (map == MAP_FAILED) return 1;

    map[0] = '#';
    printf("Modified first byte\\n");
    munmap(map, sb.st_size);
    close(fd);
    return 0;
}`,
      solution: `#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>

int main(void) {
    int fd = open("config.dat", O_RDWR);
    struct stat sb;
    fstat(fd, &sb);

    char *map = mmap(NULL, sb.st_size, PROT_READ | PROT_WRITE,
                     MAP_SHARED, fd, 0);
    if (map == MAP_FAILED) return 1;

    map[0] = '#';
    printf("Modified first byte\\n");
    munmap(map, sb.st_size);
    close(fd);
    return 0;
}`,
      hints: [
        'O_RDWR opens the file for both reading and writing.',
        'MAP_SHARED writes changes back to the file.',
        'File permissions must match the protection flags.'
      ],
      concepts: ['O_RDWR', 'MAP_SHARED', 'file modification', 'mmap']
    },
    {
      id: 'c-mmap-7',
      title: 'Read entire file via mmap',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that reads an entire file into a newly allocated buffer using mmap.',
      skeleton: `#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>

// Read the entire file into a malloc'd buffer using mmap.
// Store the file size in *out_size. Return the buffer, or NULL on error.
// Caller must free the returned buffer.
char *read_file_mmap(const char *path, size_t *out_size) {
    // TODO: implement
}`,
      solution: `#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>

char *read_file_mmap(const char *path, size_t *out_size) {
    int fd = open(path, O_RDONLY);
    if (fd < 0) return NULL;

    struct stat sb;
    if (fstat(fd, &sb) < 0) { close(fd); return NULL; }

    size_t size = sb.st_size;
    if (size == 0) { close(fd); *out_size = 0; return calloc(1, 1); }

    char *mapped = mmap(NULL, size, PROT_READ, MAP_PRIVATE, fd, 0);
    close(fd);
    if (mapped == MAP_FAILED) return NULL;

    char *buf = malloc(size + 1);
    if (!buf) { munmap(mapped, size); return NULL; }

    memcpy(buf, mapped, size);
    buf[size] = '\\0';
    munmap(mapped, size);

    *out_size = size;
    return buf;
}`,
      hints: [
        'Map the file, copy contents to a malloc buffer, then unmap.',
        'Use fstat to get the file size before mapping.',
        'Handle the edge case of a zero-length file.'
      ],
      concepts: ['mmap read', 'file size', 'fstat', 'memcpy']
    },
    {
      id: 'c-mmap-8',
      title: 'Copy file using mmap',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that copies one file to another using memory-mapped I/O.',
      skeleton: `#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <string.h>

// Copy src file to dst using mmap. Return 0 on success, -1 on error.
int copy_file_mmap(const char *src, const char *dst) {
    // TODO: implement
}`,
      solution: `#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <string.h>

int copy_file_mmap(const char *src, const char *dst) {
    int sfd = open(src, O_RDONLY);
    if (sfd < 0) return -1;

    struct stat sb;
    if (fstat(sfd, &sb) < 0) { close(sfd); return -1; }
    size_t size = sb.st_size;

    int dfd = open(dst, O_RDWR | O_CREAT | O_TRUNC, sb.st_mode);
    if (dfd < 0) { close(sfd); return -1; }

    if (ftruncate(dfd, size) < 0) {
        close(sfd); close(dfd); return -1;
    }

    if (size == 0) { close(sfd); close(dfd); return 0; }

    char *src_map = mmap(NULL, size, PROT_READ, MAP_PRIVATE, sfd, 0);
    if (src_map == MAP_FAILED) { close(sfd); close(dfd); return -1; }

    char *dst_map = mmap(NULL, size, PROT_READ | PROT_WRITE,
                         MAP_SHARED, dfd, 0);
    if (dst_map == MAP_FAILED) {
        munmap(src_map, size); close(sfd); close(dfd); return -1;
    }

    memcpy(dst_map, src_map, size);

    munmap(dst_map, size);
    munmap(src_map, size);
    close(sfd);
    close(dfd);
    return 0;
}`,
      hints: [
        'Map source as read-only and destination as read-write shared.',
        'Use ftruncate to set the destination file size before mapping.',
        'Use memcpy to copy between the two mapped regions.'
      ],
      concepts: ['mmap copy', 'ftruncate', 'MAP_SHARED', 'file duplication']
    },
    {
      id: 'c-mmap-9',
      title: 'Shared memory IPC with fork',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a function where parent and child processes communicate via anonymous shared memory.',
      skeleton: `#include <sys/mman.h>
#include <sys/wait.h>
#include <unistd.h>
#include <stdio.h>

typedef struct {
    int ready;
    int data[10];
    int count;
} SharedData;

// Parent creates shared memory, forks a child that fills data[0..9]
// with squares (0,1,4,9,...,81) and sets count=10 and ready=1.
// Parent waits and returns the sum of all data values.
int shared_memory_ipc(void) {
    // TODO: implement
}`,
      solution: `#include <sys/mman.h>
#include <sys/wait.h>
#include <unistd.h>
#include <stdio.h>

typedef struct {
    int ready;
    int data[10];
    int count;
} SharedData;

int shared_memory_ipc(void) {
    SharedData *shm = mmap(NULL, sizeof(SharedData),
                           PROT_READ | PROT_WRITE,
                           MAP_SHARED | MAP_ANONYMOUS, -1, 0);
    if (shm == MAP_FAILED) return -1;

    shm->ready = 0;
    shm->count = 0;

    pid_t pid = fork();
    if (pid == 0) {
        for (int i = 0; i < 10; i++) {
            shm->data[i] = i * i;
        }
        shm->count = 10;
        shm->ready = 1;
        _exit(0);
    }

    wait(NULL);

    int sum = 0;
    if (shm->ready) {
        for (int i = 0; i < shm->count; i++) {
            sum += shm->data[i];
        }
    }

    munmap(shm, sizeof(SharedData));
    return sum;
}`,
      hints: [
        'Use MAP_SHARED | MAP_ANONYMOUS to create shared memory for fork.',
        'The child writes data and sets a ready flag.',
        'The parent waits for the child, then reads the shared data.'
      ],
      concepts: ['shared memory', 'fork', 'IPC', 'MAP_ANONYMOUS']
    },
    {
      id: 'c-mmap-10',
      title: 'Memory-mapped ring buffer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write functions to implement a simple ring buffer using anonymous mmap.',
      skeleton: `#include <sys/mman.h>
#include <string.h>

typedef struct {
    char *buf;
    size_t size;
    size_t head;
    size_t tail;
} RingBuffer;

// Initialize ring buffer with given size using anonymous mmap.
// Return 0 on success, -1 on error.
int ring_init(RingBuffer *rb, size_t size) {
    // TODO: implement
}

// Write data to ring buffer. Return bytes written.
size_t ring_write(RingBuffer *rb, const char *data, size_t len) {
    // TODO: implement
}

// Read data from ring buffer. Return bytes read.
size_t ring_read(RingBuffer *rb, char *out, size_t len) {
    // TODO: implement
}

// Free the ring buffer.
void ring_free(RingBuffer *rb) {
    // TODO: implement
}`,
      solution: `#include <sys/mman.h>
#include <string.h>

typedef struct {
    char *buf;
    size_t size;
    size_t head;
    size_t tail;
} RingBuffer;

int ring_init(RingBuffer *rb, size_t size) {
    rb->buf = mmap(NULL, size, PROT_READ | PROT_WRITE,
                   MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
    if (rb->buf == MAP_FAILED) return -1;
    rb->size = size;
    rb->head = 0;
    rb->tail = 0;
    return 0;
}

size_t ring_write(RingBuffer *rb, const char *data, size_t len) {
    size_t avail = rb->size - (rb->head - rb->tail);
    if (len > avail) len = avail;

    for (size_t i = 0; i < len; i++) {
        rb->buf[rb->head % rb->size] = data[i];
        rb->head++;
    }
    return len;
}

size_t ring_read(RingBuffer *rb, char *out, size_t len) {
    size_t stored = rb->head - rb->tail;
    if (len > stored) len = stored;

    for (size_t i = 0; i < len; i++) {
        out[i] = rb->buf[rb->tail % rb->size];
        rb->tail++;
    }
    return len;
}

void ring_free(RingBuffer *rb) {
    if (rb->buf && rb->buf != MAP_FAILED) {
        munmap(rb->buf, rb->size);
    }
    rb->buf = NULL;
}`,
      hints: [
        'Use modular arithmetic (index % size) to wrap around the buffer.',
        'Track available space as size - (head - tail).',
        'MAP_PRIVATE | MAP_ANONYMOUS creates a private zero-filled mapping.'
      ],
      concepts: ['ring buffer', 'mmap', 'circular buffer', 'modular arithmetic']
    },
    {
      id: 'c-mmap-11',
      title: 'Search pattern in mmapped file',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a function that memory-maps a file and searches for a byte pattern within it.',
      skeleton: `#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <string.h>

// Search for pattern (pat_len bytes) in the file at path.
// Return the offset of the first match, or -1 if not found.
long mmap_search(const char *path, const char *pattern, size_t pat_len) {
    // TODO: implement
}`,
      solution: `#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <string.h>

long mmap_search(const char *path, const char *pattern, size_t pat_len) {
    int fd = open(path, O_RDONLY);
    if (fd < 0) return -1;

    struct stat sb;
    if (fstat(fd, &sb) < 0 || sb.st_size == 0) {
        close(fd);
        return -1;
    }

    size_t size = sb.st_size;
    char *data = mmap(NULL, size, PROT_READ, MAP_PRIVATE, fd, 0);
    close(fd);
    if (data == MAP_FAILED) return -1;

    long result = -1;
    if (pat_len <= size) {
        for (size_t i = 0; i <= size - pat_len; i++) {
            if (memcmp(data + i, pattern, pat_len) == 0) {
                result = (long)i;
                break;
            }
        }
    }

    munmap(data, size);
    return result;
}`,
      hints: [
        'Map the file read-only, then scan through with memcmp.',
        'Be careful with the loop bound: stop at size - pat_len.',
        'Close the file descriptor after mmap -- the mapping persists.'
      ],
      concepts: ['mmap search', 'memcmp', 'pattern matching', 'file scanning']
    },
    {
      id: 'c-mmap-12',
      title: 'Resize a mapped file',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Write a function that extends a mapped file to a new size using ftruncate and re-mapping.',
      skeleton: `#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <string.h>

// Extend the file at fd from old_size to new_size bytes.
// Unmap old mapping, resize file, remap, and zero-fill new space.
// Return new mapping pointer or NULL on error.
char *resize_mapping(int fd, char *old_map, size_t old_size,
                     size_t new_size) {
    // TODO: implement
}`,
      solution: `#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <string.h>

char *resize_mapping(int fd, char *old_map, size_t old_size,
                     size_t new_size) {
    if (new_size <= old_size) return old_map;

    munmap(old_map, old_size);

    if (ftruncate(fd, new_size) < 0) return NULL;

    char *new_map = mmap(NULL, new_size, PROT_READ | PROT_WRITE,
                         MAP_SHARED, fd, 0);
    if (new_map == MAP_FAILED) return NULL;

    memset(new_map + old_size, 0, new_size - old_size);
    return new_map;
}`,
      hints: [
        'munmap the old mapping before resizing the file.',
        'Use ftruncate to extend the file to the new size.',
        'mmap again with the new size and zero-fill the extension.'
      ],
      concepts: ['ftruncate', 'resize', 'remapping', 'zero-fill']
    },
    {
      id: 'c-mmap-13',
      title: 'Fix missing MAP_FAILED check',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix the code that does not check for mmap failure correctly.',
      skeleton: `#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>

// BUG: Crashes when mmap fails because it checks for NULL
int main(void) {
    int fd = open("missing.txt", O_RDONLY);
    struct stat sb;
    fstat(fd, &sb);

    char *data = mmap(NULL, sb.st_size, PROT_READ, MAP_PRIVATE, fd, 0);
    if (data == NULL) {  // Bug: wrong error check
        perror("mmap");
        close(fd);
        return 1;
    }
    printf("Mapped %ld bytes\\n", (long)sb.st_size);
    munmap(data, sb.st_size);
    close(fd);
    return 0;
}`,
      solution: `#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>

int main(void) {
    int fd = open("missing.txt", O_RDONLY);
    if (fd < 0) {
        perror("open");
        return 1;
    }

    struct stat sb;
    fstat(fd, &sb);

    char *data = mmap(NULL, sb.st_size, PROT_READ, MAP_PRIVATE, fd, 0);
    if (data == MAP_FAILED) {
        perror("mmap");
        close(fd);
        return 1;
    }
    printf("Mapped %ld bytes\\n", (long)sb.st_size);
    munmap(data, sb.st_size);
    close(fd);
    return 0;
}`,
      hints: [
        'mmap returns MAP_FAILED on error, NOT NULL.',
        'MAP_FAILED is typically (void *)-1.',
        'Also check the return value of open() before using fd.'
      ],
      concepts: ['MAP_FAILED', 'error checking', 'mmap errors']
    },
    {
      id: 'c-mmap-14',
      title: 'Fix munmap with wrong length',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the munmap call that uses the wrong length, causing a memory leak.',
      skeleton: `#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>

// BUG: munmap uses sizeof pointer instead of mapped length
int main(void) {
    int fd = open("large.bin", O_RDONLY);
    struct stat sb;
    fstat(fd, &sb);

    char *data = mmap(NULL, sb.st_size, PROT_READ, MAP_PRIVATE, fd, 0);
    if (data == MAP_FAILED) { close(fd); return 1; }

    printf("File size: %ld\\n", (long)sb.st_size);

    munmap(data, sizeof(data));  // Bug: sizeof(data) is pointer size
    close(fd);
    return 0;
}`,
      solution: `#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>

int main(void) {
    int fd = open("large.bin", O_RDONLY);
    struct stat sb;
    fstat(fd, &sb);

    char *data = mmap(NULL, sb.st_size, PROT_READ, MAP_PRIVATE, fd, 0);
    if (data == MAP_FAILED) { close(fd); return 1; }

    printf("File size: %ld\\n", (long)sb.st_size);

    munmap(data, sb.st_size);
    close(fd);
    return 0;
}`,
      hints: [
        'sizeof(data) returns the size of the pointer (4 or 8 bytes), not the mapped region.',
        'The munmap length must match the length passed to mmap.',
        'Use the same variable (sb.st_size) for both mmap and munmap.'
      ],
      concepts: ['munmap', 'sizeof pointer', 'length mismatch', 'memory leak']
    },
    {
      id: 'c-mmap-15',
      title: 'Fix MAP_PRIVATE for shared IPC',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix the IPC code that uses MAP_PRIVATE instead of MAP_SHARED, preventing parent from seeing child changes.',
      skeleton: `#include <sys/mman.h>
#include <sys/wait.h>
#include <unistd.h>
#include <stdio.h>

// BUG: Parent always sees 0 instead of child's value
int main(void) {
    int *val = mmap(NULL, sizeof(int), PROT_READ | PROT_WRITE,
                    MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
    *val = 0;

    if (fork() == 0) {
        *val = 99;
        _exit(0);
    }
    wait(NULL);
    printf("Value: %d\\n", *val);  // Prints 0 instead of 99
    munmap(val, sizeof(int));
    return 0;
}`,
      solution: `#include <sys/mman.h>
#include <sys/wait.h>
#include <unistd.h>
#include <stdio.h>

int main(void) {
    int *val = mmap(NULL, sizeof(int), PROT_READ | PROT_WRITE,
                    MAP_SHARED | MAP_ANONYMOUS, -1, 0);
    *val = 0;

    if (fork() == 0) {
        *val = 99;
        _exit(0);
    }
    wait(NULL);
    printf("Value: %d\\n", *val);  // Now prints 99
    munmap(val, sizeof(int));
    return 0;
}`,
      hints: [
        'MAP_PRIVATE creates a copy-on-write mapping.',
        'With MAP_PRIVATE, child writes go to a private copy.',
        'Use MAP_SHARED so both processes see the same physical memory.'
      ],
      concepts: ['MAP_PRIVATE', 'MAP_SHARED', 'copy-on-write', 'fork IPC']
    },
    {
      id: 'c-mmap-16',
      title: 'Predict zero-length file mmap',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict what happens when you try to mmap a zero-length file.',
      skeleton: `#include <sys/mman.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>

int main(void) {
    int fd = open("/dev/null", O_RDONLY);

    char *data = mmap(NULL, 0, PROT_READ, MAP_PRIVATE, fd, 0);
    if (data == MAP_FAILED) {
        printf("mmap failed\\n");
    } else {
        printf("mmap succeeded\\n");
        munmap(data, 0);
    }
    close(fd);
    return 0;
}`,
      solution: `#include <sys/mman.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>

int main(void) {
    int fd = open("/dev/null", O_RDONLY);

    char *data = mmap(NULL, 0, PROT_READ, MAP_PRIVATE, fd, 0);
    if (data == MAP_FAILED) {
        printf("mmap failed\\n");
    } else {
        printf("mmap succeeded\\n");
        munmap(data, 0);
    }
    close(fd);
    return 0;
}

// Output:
// mmap failed`,
      hints: [
        'mmap with length 0 is not allowed by POSIX.',
        'The length argument must be greater than 0.',
        'mmap returns MAP_FAILED and sets errno to EINVAL for length 0.'
      ],
      concepts: ['mmap', 'zero length', 'EINVAL', 'error conditions']
    },
    {
      id: 'c-mmap-17',
      title: 'Predict MAP_PRIVATE copy-on-write',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the behavior of MAP_PRIVATE when a child process modifies the mapped data.',
      skeleton: `#include <sys/mman.h>
#include <sys/wait.h>
#include <unistd.h>
#include <stdio.h>
#include <string.h>

int main(void) {
    char *shared = mmap(NULL, 4096, PROT_READ | PROT_WRITE,
                        MAP_SHARED | MAP_ANONYMOUS, -1, 0);
    char *priv = mmap(NULL, 4096, PROT_READ | PROT_WRITE,
                      MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);

    strcpy(shared, "hello");
    strcpy(priv, "hello");

    if (fork() == 0) {
        strcpy(shared, "world");
        strcpy(priv, "world");
        _exit(0);
    }
    wait(NULL);
    printf("shared: %s\\n", shared);
    printf("private: %s\\n", priv);
    munmap(shared, 4096);
    munmap(priv, 4096);
    return 0;
}`,
      solution: `#include <sys/mman.h>
#include <sys/wait.h>
#include <unistd.h>
#include <stdio.h>
#include <string.h>

int main(void) {
    char *shared = mmap(NULL, 4096, PROT_READ | PROT_WRITE,
                        MAP_SHARED | MAP_ANONYMOUS, -1, 0);
    char *priv = mmap(NULL, 4096, PROT_READ | PROT_WRITE,
                      MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);

    strcpy(shared, "hello");
    strcpy(priv, "hello");

    if (fork() == 0) {
        strcpy(shared, "world");
        strcpy(priv, "world");
        _exit(0);
    }
    wait(NULL);
    printf("shared: %s\\n", shared);
    printf("private: %s\\n", priv);
    munmap(shared, 4096);
    munmap(priv, 4096);
    return 0;
}

// Output:
// shared: world
// private: hello`,
      hints: [
        'MAP_SHARED changes are visible across processes.',
        'MAP_PRIVATE uses copy-on-write -- child gets its own copy on modification.',
        'The parent never sees the child private write.'
      ],
      concepts: ['copy-on-write', 'MAP_PRIVATE', 'MAP_SHARED', 'fork visibility']
    },
    {
      id: 'c-mmap-18',
      title: 'Predict msync visibility',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Predict whether a second process can read changes flushed with msync.',
      skeleton: `#include <sys/mman.h>
#include <sys/stat.h>
#include <sys/wait.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>

// Assume "test.dat" contains "AAAA" (4 bytes)
int main(void) {
    int fd1 = open("test.dat", O_RDWR);
    char *m1 = mmap(NULL, 4, PROT_READ | PROT_WRITE,
                    MAP_SHARED, fd1, 0);

    m1[0] = 'Z';
    msync(m1, 4, MS_SYNC);

    if (fork() == 0) {
        int fd2 = open("test.dat", O_RDONLY);
        char *m2 = mmap(NULL, 4, PROT_READ, MAP_SHARED, fd2, 0);
        printf("Child sees: %c%c%c%c\\n", m2[0], m2[1], m2[2], m2[3]);
        munmap(m2, 4);
        close(fd2);
        _exit(0);
    }
    wait(NULL);
    munmap(m1, 4);
    close(fd1);
    return 0;
}`,
      solution: `#include <sys/mman.h>
#include <sys/stat.h>
#include <sys/wait.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>

int main(void) {
    int fd1 = open("test.dat", O_RDWR);
    char *m1 = mmap(NULL, 4, PROT_READ | PROT_WRITE,
                    MAP_SHARED, fd1, 0);

    m1[0] = 'Z';
    msync(m1, 4, MS_SYNC);

    if (fork() == 0) {
        int fd2 = open("test.dat", O_RDONLY);
        char *m2 = mmap(NULL, 4, PROT_READ, MAP_SHARED, fd2, 0);
        printf("Child sees: %c%c%c%c\\n", m2[0], m2[1], m2[2], m2[3]);
        munmap(m2, 4);
        close(fd2);
        _exit(0);
    }
    wait(NULL);
    munmap(m1, 4);
    close(fd1);
    return 0;
}

// Output:
// Child sees: ZAAA`,
      hints: [
        'msync with MS_SYNC ensures changes are written to disk.',
        'A new mmap of the same file will see the flushed changes.',
        'MAP_SHARED mappings of the same file share the same kernel pages.'
      ],
      concepts: ['msync', 'MS_SYNC', 'cross-process visibility', 'file-backed mapping']
    },
    {
      id: 'c-mmap-19',
      title: 'Refactor read/write to mmap',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor traditional read/write file I/O to use memory-mapped I/O.',
      skeleton: `#include <fcntl.h>
#include <unistd.h>
#include <string.h>
#include <stdio.h>

// Refactor this to use mmap instead of read/write.
int count_char(const char *path, char target) {
    int fd = open(path, O_RDONLY);
    if (fd < 0) return -1;

    int count = 0;
    char buf[4096];
    ssize_t n;
    while ((n = read(fd, buf, sizeof(buf))) > 0) {
        for (ssize_t i = 0; i < n; i++) {
            if (buf[i] == target) count++;
        }
    }
    close(fd);
    return count;
}`,
      solution: `#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <string.h>
#include <stdio.h>

int count_char(const char *path, char target) {
    int fd = open(path, O_RDONLY);
    if (fd < 0) return -1;

    struct stat sb;
    if (fstat(fd, &sb) < 0) { close(fd); return -1; }
    if (sb.st_size == 0) { close(fd); return 0; }

    char *data = mmap(NULL, sb.st_size, PROT_READ, MAP_PRIVATE, fd, 0);
    close(fd);
    if (data == MAP_FAILED) return -1;

    int count = 0;
    for (size_t i = 0; i < (size_t)sb.st_size; i++) {
        if (data[i] == target) count++;
    }

    munmap(data, sb.st_size);
    return count;
}`,
      hints: [
        'Replace the read loop with a single mmap and direct memory access.',
        'Use fstat to get the file size for the mapping length.',
        'mmap eliminates the need for a temporary buffer.'
      ],
      concepts: ['mmap refactor', 'read replacement', 'direct memory access']
    },
    {
      id: 'c-mmap-20',
      title: 'Refactor pipe IPC to shared memory',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor inter-process communication from pipes to shared memory via mmap.',
      skeleton: `#include <unistd.h>
#include <sys/wait.h>
#include <string.h>
#include <stdio.h>

// Refactor this pipe-based IPC to use mmap shared memory instead.
int pipe_ipc(void) {
    int pfd[2];
    pipe(pfd);

    if (fork() == 0) {
        close(pfd[0]);
        int results[5] = {10, 20, 30, 40, 50};
        write(pfd[1], results, sizeof(results));
        close(pfd[1]);
        _exit(0);
    }

    close(pfd[1]);
    int results[5];
    read(pfd[0], results, sizeof(results));
    close(pfd[0]);
    wait(NULL);

    int sum = 0;
    for (int i = 0; i < 5; i++) sum += results[i];
    return sum;
}`,
      solution: `#include <sys/mman.h>
#include <sys/wait.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>

typedef struct {
    int ready;
    int results[5];
} SharedIPC;

int shared_ipc(void) {
    SharedIPC *shm = mmap(NULL, sizeof(SharedIPC),
                          PROT_READ | PROT_WRITE,
                          MAP_SHARED | MAP_ANONYMOUS, -1, 0);
    if (shm == MAP_FAILED) return -1;
    shm->ready = 0;

    if (fork() == 0) {
        int data[5] = {10, 20, 30, 40, 50};
        memcpy(shm->results, data, sizeof(data));
        shm->ready = 1;
        _exit(0);
    }

    wait(NULL);

    int sum = 0;
    if (shm->ready) {
        for (int i = 0; i < 5; i++) sum += shm->results[i];
    }

    munmap(shm, sizeof(SharedIPC));
    return sum;
}`,
      hints: [
        'Replace the pipe with MAP_SHARED | MAP_ANONYMOUS mmap.',
        'Use a struct to organize the shared data with a ready flag.',
        'No need for read/write syscalls -- data is directly accessible.'
      ],
      concepts: ['pipe to mmap', 'shared memory', 'IPC refactor', 'zero-copy']
    }
  ]
};
