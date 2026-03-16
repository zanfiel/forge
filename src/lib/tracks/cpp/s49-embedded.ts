import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-embedded',
  title: '49. Embedded C++',
  explanation: `## Embedded C++

Embedded systems often require C++ without exceptions, RTTI, or dynamic allocation. Key techniques:

### No-Exceptions (-fno-exceptions)
Replace throw/try/catch with error codes or std::expected (C++23):
\`\`\`cpp
enum class Error { None, InvalidArg, Timeout };

Error init_sensor(int pin) {
    if (pin < 0) return Error::InvalidArg;
    // ...
    return Error::None;
}
\`\`\`

### No-RTTI (-fno-rtti)
Avoid dynamic_cast and typeid. Use CRTP or manual type tags instead.

### Placement new
Construct objects in pre-allocated memory:
\`\`\`cpp
#include <new>
alignas(Sensor) char buf[sizeof(Sensor)];
Sensor* s = new (buf) Sensor(42);
s->~Sensor();  // must call destructor manually
\`\`\`

### volatile
Prevents compiler from optimizing away reads/writes to hardware registers:
\`\`\`cpp
volatile uint32_t* const GPIO_REG = reinterpret_cast<volatile uint32_t*>(0x40020000);
*GPIO_REG = 0x01;  // write is never optimized away
\`\`\`

### Bitfields
Compact bit-level layout for hardware registers:
\`\`\`cpp
struct StatusReg {
    uint8_t ready : 1;
    uint8_t error : 1;
    uint8_t mode  : 3;
    uint8_t       : 3;  // padding
};
\`\`\`

### Memory-Mapped I/O
Access hardware through fixed addresses:
\`\`\`cpp
struct GPIO {
    volatile uint32_t MODER;
    volatile uint32_t ODR;
};
auto* gpio = reinterpret_cast<GPIO*>(0x40020000);
\`\`\`

### Static Allocation
Use fixed-size arrays and stack allocation -- no heap (no new/malloc):
\`\`\`cpp
constexpr int MAX_ITEMS = 64;
int buffer[MAX_ITEMS];
\`\`\`
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-embedded-1',
      title: 'Volatile register access',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the qualifier that prevents the compiler from optimizing away this hardware register read.',
      skeleton: `__BLANK__ uint32_t* const TIMER_REG =
    reinterpret_cast<__BLANK__ uint32_t*>(0x40000000);

uint32_t read_timer() {
    return *TIMER_REG;  // must actually read hardware
}`,
      solution: `volatile uint32_t* const TIMER_REG =
    reinterpret_cast<volatile uint32_t*>(0x40000000);

uint32_t read_timer() {
    return *TIMER_REG;  // must actually read hardware
}`,
      hints: [
        'Without this qualifier, the compiler may cache or eliminate the read.',
        'It tells the compiler the value may change at any time.',
        'The qualifier is `volatile`.',
      ],
      concepts: ['volatile', 'memory-mapped-io'],
    },
    {
      id: 'cpp-embedded-2',
      title: 'Placement new',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the syntax to construct an object in a pre-allocated buffer.',
      skeleton: `#include <new>

struct Sensor { int pin; Sensor(int p) : pin(p) {} };

alignas(Sensor) char buf[sizeof(Sensor)];
Sensor* s = __BLANK__ Sensor(42);`,
      solution: `#include <new>

struct Sensor { int pin; Sensor(int p) : pin(p) {} };

alignas(Sensor) char buf[sizeof(Sensor)];
Sensor* s = new (buf) Sensor(42);`,
      hints: [
        'This form of new constructs an object at a specified memory location.',
        'It does not allocate memory -- the buffer is already provided.',
        'The syntax is `new (buf)` followed by the constructor.',
      ],
      concepts: ['placement-new', 'manual-construction'],
    },
    {
      id: 'cpp-embedded-3',
      title: 'Bitfield declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the bit width for a single-bit flag in a bitfield struct.',
      skeleton: `#include <cstdint>

struct Flags {
    uint8_t enabled : __BLANK__;
    uint8_t error   : __BLANK__;
    uint8_t mode    : 3;
    uint8_t         : 3;  // padding
};`,
      solution: `#include <cstdint>

struct Flags {
    uint8_t enabled : 1;
    uint8_t error   : 1;
    uint8_t mode    : 3;
    uint8_t         : 3;  // padding
};`,
      hints: [
        'A boolean flag needs only 1 bit.',
        'The number after the colon is the bit width.',
        'Fill in `1`.',
      ],
      concepts: ['bitfields', 'register-layout'],
    },
    {
      id: 'cpp-embedded-4',
      title: 'alignas for buffer',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the alignment specifier for the raw buffer to match the type being constructed.',
      skeleton: `struct Motor { double speed; int id; };

__BLANK__(Motor) char buf[sizeof(Motor)];`,
      solution: `struct Motor { double speed; int id; };

alignas(Motor) char buf[sizeof(Motor)];`,
      hints: [
        'Placement new requires the buffer to be properly aligned.',
        'This specifier sets the alignment of the buffer.',
        'The specifier is `alignas`.',
      ],
      concepts: ['alignas', 'alignment', 'placement-new'],
    },
    {
      id: 'cpp-embedded-5',
      title: 'Error code enum',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the scoped enum keyword for an error code type (no exceptions).',
      skeleton: `__BLANK__ class Error {
    None,
    Timeout,
    BadConfig
};`,
      solution: `enum class Error {
    None,
    Timeout,
    BadConfig
};`,
      hints: [
        'In no-exception environments, scoped enums are used for error codes.',
        'This C++11 keyword creates a scoped enumeration.',
        'The keyword is `enum`.',
      ],
      concepts: ['enum-class', 'error-codes'],
    },
    {
      id: 'cpp-embedded-6',
      title: 'Manual destructor call',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the syntax to manually call the destructor after placement new.',
      skeleton: `#include <new>

struct Resource {
    ~Resource() { /* cleanup */ }
};

alignas(Resource) char buf[sizeof(Resource)];
Resource* r = new (buf) Resource();
// done with r:
r->__BLANK__();`,
      solution: `#include <new>

struct Resource {
    ~Resource() { /* cleanup */ }
};

alignas(Resource) char buf[sizeof(Resource)];
Resource* r = new (buf) Resource();
// done with r:
r->~Resource();`,
      hints: [
        'Placement new does not pair with delete.',
        'You must manually invoke the destructor.',
        'Call the destructor explicitly: r->~Resource().',
      ],
      concepts: ['explicit-destructor', 'placement-new'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-embedded-7',
      title: 'GPIO register struct',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a GPIO struct with volatile members MODER and ODR (uint32_t). Write set_pin_high(GPIO*, int pin) that sets the bit at position pin in ODR.',
      skeleton: `#include <cstdint>

// TODO: GPIO struct with volatile MODER and ODR
// TODO: set_pin_high function`,
      solution: `#include <cstdint>

struct GPIO {
    volatile uint32_t MODER;
    volatile uint32_t ODR;
};

void set_pin_high(GPIO* gpio, int pin) {
    gpio->ODR |= (1u << pin);
}`,
      hints: [
        'Members must be volatile to prevent optimization of hardware writes.',
        'To set bit N, use bitwise OR with (1u << N).',
        'gpio->ODR |= (1u << pin) sets the pin high.',
      ],
      concepts: ['memory-mapped-io', 'volatile', 'bitwise-or'],
    },
    {
      id: 'cpp-embedded-8',
      title: 'Static ring buffer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a fixed-size RingBuffer<T, N> (no heap allocation) with push() and pop() methods. Use a static array internally.',
      skeleton: `#include <cstddef>

template <typename T, std::size_t N>
class RingBuffer {
    T data_[N];
    std::size_t head_ = 0, tail_ = 0, count_ = 0;
public:
    bool push(const T& val) {
        // TODO: return false if full
    }
    bool pop(T& out) {
        // TODO: return false if empty
    }
    std::size_t size() const { return count_; }
};`,
      solution: `#include <cstddef>

template <typename T, std::size_t N>
class RingBuffer {
    T data_[N];
    std::size_t head_ = 0, tail_ = 0, count_ = 0;
public:
    bool push(const T& val) {
        if (count_ == N) return false;
        data_[tail_] = val;
        tail_ = (tail_ + 1) % N;
        ++count_;
        return true;
    }
    bool pop(T& out) {
        if (count_ == 0) return false;
        out = data_[head_];
        head_ = (head_ + 1) % N;
        --count_;
        return true;
    }
    std::size_t size() const { return count_; }
};`,
      hints: [
        'Use modular arithmetic to wrap head and tail around N.',
        'push: store at tail_, advance tail_ = (tail_ + 1) % N.',
        'pop: read from head_, advance head_ = (head_ + 1) % N.',
      ],
      concepts: ['ring-buffer', 'static-allocation', 'embedded'],
    },
    {
      id: 'cpp-embedded-9',
      title: 'Error code result type',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a Result<T> type (no exceptions) that holds either a value or an error code. Provide value() and error() accessors.',
      skeleton: `enum class Err { None, NotFound, Overflow };

template <typename T>
class Result {
    // TODO: store value and error
public:
    // TODO: static factory methods ok(T) and fail(Err)
    // TODO: is_ok(), value(), error()
};`,
      solution: `enum class Err { None, NotFound, Overflow };

template <typename T>
class Result {
    T val_{};
    Err err_ = Err::None;
    Result(T v, Err e) : val_(v), err_(e) {}
public:
    static Result ok(T val) { return Result(val, Err::None); }
    static Result fail(Err e) { return Result(T{}, e); }
    bool is_ok() const { return err_ == Err::None; }
    const T& value() const { return val_; }
    Err error() const { return err_; }
};`,
      hints: [
        'Store both a value and an error; use a flag to indicate which is valid.',
        'Static factory methods are clearer than constructor overloading.',
        'is_ok() checks if err_ == Err::None.',
      ],
      concepts: ['result-type', 'error-handling', 'no-exceptions'],
    },
    {
      id: 'cpp-embedded-10',
      title: 'Placement new array',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a function that constructs N objects of type T in a pre-allocated buffer using placement new, and a function that destructs them in reverse order.',
      skeleton: `#include <new>
#include <cstddef>

template <typename T>
void construct_array(void* buf, std::size_t n) {
    // TODO: placement-new each element
}

template <typename T>
void destroy_array(T* arr, std::size_t n) {
    // TODO: call destructor on each element in reverse
}`,
      solution: `#include <new>
#include <cstddef>

template <typename T>
void construct_array(void* buf, std::size_t n) {
    char* p = static_cast<char*>(buf);
    for (std::size_t i = 0; i < n; ++i) {
        new (p + i * sizeof(T)) T();
    }
}

template <typename T>
void destroy_array(T* arr, std::size_t n) {
    for (std::size_t i = n; i > 0; --i) {
        arr[i - 1].~T();
    }
}`,
      hints: [
        'Placement-new each element at offset i * sizeof(T) from the buffer start.',
        'Destroy in reverse order to match C++ array destruction semantics.',
        'Call the destructor explicitly: arr[i].~T().',
      ],
      concepts: ['placement-new', 'explicit-destructor', 'array-construction'],
    },
    {
      id: 'cpp-embedded-11',
      title: 'Bit manipulation utilities',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write set_bit(val, n), clear_bit(val, n), and test_bit(val, n) functions for uint32_t register manipulation.',
      skeleton: `#include <cstdint>

// TODO: set_bit, clear_bit, test_bit`,
      solution: `#include <cstdint>

inline uint32_t set_bit(uint32_t val, int n) {
    return val | (1u << n);
}

inline uint32_t clear_bit(uint32_t val, int n) {
    return val & ~(1u << n);
}

inline bool test_bit(uint32_t val, int n) {
    return (val >> n) & 1u;
}`,
      hints: [
        'set_bit: OR with (1u << n).',
        'clear_bit: AND with the complement of (1u << n).',
        'test_bit: shift right by n and AND with 1.',
      ],
      concepts: ['bit-manipulation', 'register-operations'],
    },
    {
      id: 'cpp-embedded-12',
      title: 'Static string buffer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a FixedString<N> class that stores a string in a fixed-size char array with no heap allocation. Support append(const char*) and c_str().',
      skeleton: `#include <cstring>
#include <cstddef>

template <std::size_t N>
class FixedString {
    char buf_[N] = {};
    std::size_t len_ = 0;
public:
    // TODO: append(const char*), c_str(), size()
};`,
      solution: `#include <cstring>
#include <cstddef>

template <std::size_t N>
class FixedString {
    char buf_[N] = {};
    std::size_t len_ = 0;
public:
    bool append(const char* s) {
        std::size_t slen = std::strlen(s);
        if (len_ + slen >= N) return false;
        std::memcpy(buf_ + len_, s, slen);
        len_ += slen;
        buf_[len_] = '\\0';
        return true;
    }
    const char* c_str() const { return buf_; }
    std::size_t size() const { return len_; }
};`,
      hints: [
        'Use a fixed char array and track the current length.',
        'Check that appending does not overflow (len_ + slen < N).',
        'Always null-terminate the buffer.',
      ],
      concepts: ['fixed-string', 'static-allocation', 'no-heap'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-embedded-13',
      title: 'Fix missing volatile on register',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the register read that gets optimized away because the pointer is not volatile.',
      skeleton: `#include <cstdint>

uint32_t* const STATUS_REG =
    reinterpret_cast<uint32_t*>(0x40000004);
// BUG: without volatile, compiler may optimize out reads

void wait_ready() {
    while ((*STATUS_REG & 0x01) == 0) {
        // spin -- compiler may hoist the read out of the loop
    }
}`,
      solution: `#include <cstdint>

volatile uint32_t* const STATUS_REG =
    reinterpret_cast<volatile uint32_t*>(0x40000004);

void wait_ready() {
    while ((*STATUS_REG & 0x01) == 0) {
        // each iteration re-reads the register
    }
}`,
      hints: [
        'Without volatile, the compiler sees that STATUS_REG never changes in the loop.',
        'It optimizes the read to happen once, creating an infinite loop.',
        'Add volatile to both the pointer type and the cast.',
      ],
      concepts: ['volatile', 'optimization', 'hardware-register'],
    },
    {
      id: 'cpp-embedded-14',
      title: 'Fix placement new without destructor',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the memory leak from placement new without explicit destructor call.',
      skeleton: `#include <new>
#include <string>

alignas(std::string) char buf[sizeof(std::string)];

void create_and_use() {
    auto* s = new (buf) std::string("hello");
    // use s...
    // BUG: no destructor call -- std::string leaks its internal buffer
}`,
      solution: `#include <new>
#include <string>

alignas(std::string) char buf[sizeof(std::string)];

void create_and_use() {
    auto* s = new (buf) std::string("hello");
    // use s...
    s->~basic_string();  // explicitly destroy
}`,
      hints: [
        'Placement new does not pair with delete -- you must destruct manually.',
        'std::string owns heap memory internally that must be freed.',
        'Call s->~basic_string() or equivalently s->~string() (depending on implementation).',
      ],
      concepts: ['placement-new', 'explicit-destructor', 'resource-leak'],
    },
    {
      id: 'cpp-embedded-15',
      title: 'Fix unaligned placement new',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the placement new that uses an unaligned buffer, causing undefined behavior.',
      skeleton: `#include <new>
#include <cstdint>

struct alignas(8) Sensor {
    double reading;
    uint32_t id;
};

char buf[sizeof(Sensor)];  // BUG: no alignment guarantee
Sensor* s = new (buf) Sensor{3.14, 1};`,
      solution: `#include <new>
#include <cstdint>

struct alignas(8) Sensor {
    double reading;
    uint32_t id;
};

alignas(Sensor) char buf[sizeof(Sensor)];
Sensor* s = new (buf) Sensor{3.14, 1};`,
      hints: [
        'char arrays default to 1-byte alignment.',
        'Sensor requires 8-byte alignment (due to double and alignas(8)).',
        'Use alignas(Sensor) on the buffer declaration.',
      ],
      concepts: ['alignment', 'placement-new', 'undefined-behavior'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-embedded-16',
      title: 'Predict bitfield values',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <cstdint>
#include <iostream>

struct Reg {
    uint8_t a : 3;
    uint8_t b : 5;
};

int main() {
    Reg r;
    r.a = 7;   // max for 3 bits
    r.b = 31;  // max for 5 bits
    std::cout << (int)r.a << " " << (int)r.b << std::endl;
}`,
      solution: `7 31`,
      hints: [
        '3 bits can hold 0-7, so r.a = 7 is the max.',
        '5 bits can hold 0-31, so r.b = 31 is the max.',
        'Output: 7 31.',
      ],
      concepts: ['bitfields', 'bit-width'],
    },
    {
      id: 'cpp-embedded-17',
      title: 'Predict sizeof bitfield struct',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print? (Assume typical alignment.)',
      skeleton: `#include <cstdint>
#include <iostream>

struct Packed {
    uint8_t x : 1;
    uint8_t y : 1;
    uint8_t z : 6;
};

int main() {
    std::cout << sizeof(Packed) << std::endl;
}`,
      solution: `1`,
      hints: [
        'Total bits: 1 + 1 + 6 = 8 bits = 1 byte.',
        'All bitfields fit in a single uint8_t.',
        'sizeof(Packed) is 1.',
      ],
      concepts: ['bitfields', 'sizeof'],
    },
    {
      id: 'cpp-embedded-18',
      title: 'Predict placement new address',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <new>
#include <iostream>

alignas(int) char buf[sizeof(int)];

int main() {
    int* p = new (buf) int(42);
    std::cout << std::boolalpha
              << (reinterpret_cast<char*>(p) == buf) << " "
              << *p << std::endl;
}`,
      solution: `true 42`,
      hints: [
        'Placement new constructs the object at the address of buf.',
        'p points to the start of buf.',
        '*p is 42.',
      ],
      concepts: ['placement-new', 'address-identity'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-embedded-19',
      title: 'Refactor exceptions to error codes',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Replace exception-based error handling with error codes for a no-exceptions environment.',
      skeleton: `#include <stdexcept>

int parse_temp(const char* input) {
    int val = 0;
    // simplified parsing
    if (input == nullptr) throw std::invalid_argument("null input");
    for (const char* p = input; *p; ++p) {
        if (*p < '0' || *p > '9') throw std::runtime_error("bad char");
        val = val * 10 + (*p - '0');
    }
    if (val > 150) throw std::out_of_range("too hot");
    return val;
}`,
      solution: `#include <cstdint>

enum class ParseErr { None, NullInput, BadChar, OutOfRange };

struct ParseResult {
    int value;
    ParseErr error;
};

ParseResult parse_temp(const char* input) {
    if (!input) return {0, ParseErr::NullInput};
    int val = 0;
    for (const char* p = input; *p; ++p) {
        if (*p < '0' || *p > '9') return {0, ParseErr::BadChar};
        val = val * 10 + (*p - '0');
    }
    if (val > 150) return {val, ParseErr::OutOfRange};
    return {val, ParseErr::None};
}`,
      hints: [
        'Define an error enum and a result struct with value + error.',
        'Return the struct instead of throwing exceptions.',
        'Callers check result.error before using result.value.',
      ],
      concepts: ['error-codes', 'no-exceptions', 'result-type'],
    },
    {
      id: 'cpp-embedded-20',
      title: 'Refactor dynamic allocation to static',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Replace the heap-allocated buffer with a static array for embedded use.',
      skeleton: `#include <vector>
#include <cstdint>

class SensorLog {
    std::vector<uint16_t> readings_;
public:
    void add(uint16_t val) {
        if (readings_.size() < 256)
            readings_.push_back(val);
    }
    uint16_t get(int idx) const { return readings_[idx]; }
    int count() const { return readings_.size(); }
};`,
      solution: `#include <cstdint>
#include <cstddef>

class SensorLog {
    static constexpr std::size_t MAX = 256;
    uint16_t readings_[MAX] = {};
    std::size_t count_ = 0;
public:
    void add(uint16_t val) {
        if (count_ < MAX)
            readings_[count_++] = val;
    }
    uint16_t get(int idx) const { return readings_[idx]; }
    std::size_t count() const { return count_; }
};`,
      hints: [
        'Replace std::vector with a fixed-size array and a count.',
        'Use constexpr for the maximum size.',
        'No heap allocation -- suitable for embedded.',
      ],
      concepts: ['static-allocation', 'no-heap', 'embedded'],
    },
  ],
};
