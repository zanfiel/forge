import type { Track } from '../../stores/app.svelte.ts';

export const track: Track = {
  id: 'cpp',
  name: 'C++',
  language: 'cpp',
  monacoLang: 'cpp',
  icon: '⚡',
  description: 'High-performance systems programming. Game engines, operating systems, and real-time applications.',
  sections: [
    // ─── Section 1: Variables & Types ─────────────
    {
      id: 'cpp-variables',
      title: '1. Variables & Types',
      explanation: `## Variables & Types

C++ is statically typed, but modern C++ gives you powerful type inference with \`auto\`. Variables must be declared before use:

\`\`\`cpp
int count = 0;
double pi = 3.14159265358979;
char grade = 'A';
std::string name = "rocky";     // #include <string>
bool online = true;
\`\`\`

**\`auto\` lets the compiler figure out the type:**
\`\`\`cpp
auto x = 42;            // int
auto y = 3.14;          // double
auto msg = "hello"s;    // std::string (with s suffix)
\`\`\`

**\`const\` means the value cannot change after initialization:**
\`\`\`cpp
const int MAX_CONNECTIONS = 100;
const std::string HOST = "0.0.0.0";
constexpr int BUFFER_SIZE = 1024;   // compile-time constant
\`\`\`

**Numeric types by size:**
| Type | Bytes | Range |
|------|-------|-------|
| \`int\` | 4 | about +/- 2 billion |
| \`long long\` | 8 | very large |
| \`float\` | 4 | ~7 decimal digits |
| \`double\` | 8 | ~15 decimal digits |
| \`size_t\` | 8 | unsigned, for sizes/indices |

**Output with \`std::cout\`:**
\`\`\`cpp
#include <iostream>
std::cout << "Count: " << count << "\\n";
std::cout << std::fixed << std::setprecision(2) << pi << "\\n";
\`\`\``,
      exercises: [
        {
          id: 'cpp-var-1',
          title: 'Declare and Print Variables',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'cpp',
          goal: 'Declare variables of different types and print them using std::cout.',
          skeleton: `#include <iostream>
#include <string>

int main() {
    // Declare an integer for CPU cores
    __BLANK__ cores = 8;

    // Declare a double for CPU temperature
    __BLANK__ temp = 72.5;

    // Declare a string for the hostname
    std::__BLANK__ hostname = "rocky";

    // Declare a bool for server status
    __BLANK__ online = true;

    // Declare a const for max connections
    __BLANK__ int max_conn = 100;

    std::cout << "Host: " << hostname << "\\n";
    std::cout << "Cores: " << cores << "\\n";
    std::cout << "Temp: " << temp << " F\\n";
    std::cout << "Online: " << std::__BLANK__ << online << "\\n";
    std::cout << "Max: " << max_conn << "\\n";

    return 0;
}`,
          solution: `#include <iostream>
#include <string>

int main() {
    int cores = 8;
    double temp = 72.5;
    std::string hostname = "rocky";
    bool online = true;
    const int max_conn = 100;

    std::cout << "Host: " << hostname << "\\n";
    std::cout << "Cores: " << cores << "\\n";
    std::cout << "Temp: " << temp << " F\\n";
    std::cout << std::boolalpha << online << "\\n";
    std::cout << "Max: " << max_conn << "\\n";

    return 0;
}`,
          hints: [
            'Whole numbers use `int`, decimals use `double`, text uses `std::string`, true/false uses `bool`.',
            '`const` before the type prevents modification. `std::boolalpha` prints "true"/"false" instead of 1/0.',
            'Fill in: `int`, `double`, `string`, `bool`, `const`, `boolalpha`.',
          ],
          concepts: ['int', 'double', 'std::string', 'bool', 'const', 'std::cout', 'std::boolalpha'],
        },
        {
          id: 'cpp-var-2',
          title: 'Auto and Type Inference',
          type: 'predict-output',
          difficulty: 'beginner',
          language: 'cpp',
          goal: 'Read the code and predict the output. Think about how auto deduces types and how const prevents modification.',
          skeleton: `#include <iostream>
#include <string>

int main() {
    auto x = 10;
    auto y = 3.0;
    auto name = std::string("pangolin");

    const auto max_retries = 5;
    // max_retries = 10;  // would not compile

    auto result = x / 3;
    auto precise = x / y;

    std::cout << result << "\\n";
    std::cout << precise << "\\n";
    std::cout << name.length() << "\\n";
    std::cout << max_retries << "\\n";

    return 0;
}

// What does this program print?
// Line 1: ???
// Line 2: ???
// Line 3: ???
// Line 4: ???`,
          solution: `#include <iostream>
#include <string>

int main() {
    auto x = 10;
    auto y = 3.0;
    auto name = std::string("pangolin");

    const auto max_retries = 5;

    auto result = x / 3;
    auto precise = x / y;

    std::cout << result << "\\n";
    std::cout << precise << "\\n";
    std::cout << name.length() << "\\n";
    std::cout << max_retries << "\\n";

    return 0;
}

// Line 1: 3
// Line 2: 3.33333
// Line 3: 8
// Line 4: 5`,
          hints: [
            '`auto x = 10` deduces `int`. `auto y = 3.0` deduces `double`. Integer division truncates.',
            '`10 / 3` is integer division = 3. `10 / 3.0` promotes to double = 3.33333.',
            'Line 1: 3, Line 2: 3.33333, Line 3: 8 (length of "pangolin"), Line 4: 5.',
          ],
          concepts: ['auto', 'type inference', 'integer division', 'double promotion', 'string::length', 'const auto'],
        },
        {
          id: 'cpp-var-3',
          title: 'String Operations',
          type: 'write-function',
          difficulty: 'beginner',
          language: 'cpp',
          goal: 'Write a function `build_connection_string` that takes a host (std::string), port (int), and database name (std::string), and returns a connection string in the format "host:port/dbname". Use std::to_string to convert the port.',
          skeleton: `#include <iostream>
#include <string>

// Write build_connection_string here


int main() {
    std::string conn = build_connection_string("localhost", 5432, "forge_db");
    std::cout << conn << "\\n";  // localhost:5432/forge_db

    std::string conn2 = build_connection_string("192.168.8.133", 4200, "engram");
    std::cout << conn2 << "\\n";  // 192.168.8.133:4200/engram

    return 0;
}`,
          solution: `#include <iostream>
#include <string>

std::string build_connection_string(const std::string& host, int port, const std::string& db) {
    return host + ":" + std::to_string(port) + "/" + db;
}

int main() {
    std::string conn = build_connection_string("localhost", 5432, "forge_db");
    std::cout << conn << "\\n";

    std::string conn2 = build_connection_string("192.168.8.133", 4200, "engram");
    std::cout << conn2 << "\\n";

    return 0;
}`,
          hints: [
            'The function returns `std::string`. Use `const std::string&` for string parameters to avoid copies.',
            '`std::to_string(port)` converts an integer to a string. Concatenate with `+`.',
            'Return `host + ":" + std::to_string(port) + "/" + db` to build the full connection string.',
          ],
          concepts: ['std::string', 'std::to_string', 'string concatenation', 'const reference', 'function return'],
        },
      ],
    },

    // ─── Section 2: Functions & References ────────
    {
      id: 'cpp-functions',
      title: '2. Functions & References',
      explanation: `## Functions & References

C++ functions declare return type and parameter types. Unlike C, C++ has **references** (\`&\`) which are cleaner than pointers for most cases:

\`\`\`cpp
// Pass by value (copies the argument)
void print_value(int x) {
    std::cout << x << "\\n";
}

// Pass by reference (modifies the original)
void increment(int& x) {
    x++;
}

// Pass by const reference (reads without copying)
void print_name(const std::string& name) {
    std::cout << name << "\\n";
}
\`\`\`

**When to use each:**
- **Value** (\`int x\`): small types, when you need a copy
- **Const reference** (\`const T& x\`): large types you only read (strings, vectors, etc.)
- **Reference** (\`T& x\`): when you need to modify the caller's variable

**Function overloading** lets you define multiple functions with the same name but different parameters:
\`\`\`cpp
double area(double radius) {
    return 3.14159 * radius * radius;
}

double area(double width, double height) {
    return width * height;
}

area(5.0);       // calls the circle version
area(4.0, 6.0);  // calls the rectangle version
\`\`\`

**Default arguments:**
\`\`\`cpp
void connect(const std::string& host, int port = 8080) {
    std::cout << host << ":" << port << "\\n";
}

connect("localhost");        // uses port 8080
connect("localhost", 4200);  // uses port 4200
\`\`\``,
      exercises: [
        {
          id: 'cpp-fn-1',
          title: 'Pass by Value vs Reference',
          type: 'fill-blank',
          difficulty: 'beginner',
          language: 'cpp',
          goal: 'Complete the functions using the correct parameter passing style: value, reference, or const reference.',
          skeleton: `#include <iostream>
#include <string>

// Read-only: use const reference for the string
void log_message(const std::string__BLANK__ msg) {
    std::cout << "[LOG] " << msg << "\\n";
}

// Needs to modify: use reference
void to_uppercase(std::string__BLANK__ str) {
    for (char__BLANK__ c : str) {
        c = std::toupper(c);
    }
}

// Small type, read-only: pass by value
int square(__BLANK__ x) {
    return x * x;
}

// Needs to modify two values: use references
void min_max(int a, int b, int__BLANK__ out_min, int__BLANK__ out_max) {
    out_min = (a < b) ? a : b;
    out_max = (a > b) ? a : b;
}

int main() {
    std::string msg = "server starting";
    log_message(msg);

    to_uppercase(msg);
    std::cout << msg << "\\n";  // SERVER STARTING

    std::cout << square(7) << "\\n";  // 49

    int lo, hi;
    min_max(42, 17, lo, hi);
    std::cout << lo << " " << hi << "\\n";  // 17 42

    return 0;
}`,
          solution: `#include <iostream>
#include <string>

void log_message(const std::string& msg) {
    std::cout << "[LOG] " << msg << "\\n";
}

void to_uppercase(std::string& str) {
    for (char& c : str) {
        c = std::toupper(c);
    }
}

int square(int x) {
    return x * x;
}

void min_max(int a, int b, int& out_min, int& out_max) {
    out_min = (a < b) ? a : b;
    out_max = (a > b) ? a : b;
}

int main() {
    std::string msg = "server starting";
    log_message(msg);

    to_uppercase(msg);
    std::cout << msg << "\\n";

    std::cout << square(7) << "\\n";

    int lo, hi;
    min_max(42, 17, lo, hi);
    std::cout << lo << " " << hi << "\\n";

    return 0;
}`,
          hints: [
            '`&` after the type means reference. `const` before means read-only. Use `&` when the function modifies the argument.',
            'Range-based for with `char& c` lets you modify each character in place. Without `&` you get a copy.',
            'Fill in: `&`, `&`, `&`, `int`, `&`, `&`.',
          ],
          concepts: ['pass by value', 'pass by reference', 'const reference', 'range-based for', 'std::toupper'],
        },
        {
          id: 'cpp-fn-2',
          title: 'Function Overloading',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'cpp',
          goal: 'Write three overloaded `format_size` functions: (1) takes a long long byte count and returns a human-readable string like "1.50 KB" or "2.30 MB" or stays in bytes if < 1024, (2) takes a double and a unit string and returns like "3.14 GB", (3) takes an int and returns bytes like "512 B".',
          skeleton: `#include <iostream>
#include <string>
#include <sstream>
#include <iomanip>

// Write three overloaded format_size functions here


int main() {
    std::cout << format_size(512) << "\\n";               // 512 B
    std::cout << format_size(1536LL) << "\\n";             // 1.50 KB
    std::cout << format_size(2516582LL) << "\\n";          // 2.40 MB
    std::cout << format_size(3.14, "GB") << "\\n";         // 3.14 GB

    return 0;
}`,
          solution: `#include <iostream>
#include <string>
#include <sstream>
#include <iomanip>

std::string format_size(int bytes) {
    return std::to_string(bytes) + " B";
}

std::string format_size(long long bytes) {
    std::ostringstream oss;
    oss << std::fixed << std::setprecision(2);
    if (bytes >= 1024LL * 1024) {
        oss << (static_cast<double>(bytes) / (1024.0 * 1024.0)) << " MB";
    } else if (bytes >= 1024) {
        oss << (static_cast<double>(bytes) / 1024.0) << " KB";
    } else {
        oss << bytes << " B";
    }
    return oss.str();
}

std::string format_size(double value, const std::string& unit) {
    std::ostringstream oss;
    oss << std::fixed << std::setprecision(2) << value << " " << unit;
    return oss.str();
}

int main() {
    std::cout << format_size(512) << "\\n";
    std::cout << format_size(1536LL) << "\\n";
    std::cout << format_size(2516582LL) << "\\n";
    std::cout << format_size(3.14, "GB") << "\\n";

    return 0;
}`,
          hints: [
            'Each overload has the same name but different parameter types. The compiler picks the right one based on the arguments.',
            'Use `std::ostringstream` with `std::fixed` and `std::setprecision(2)` to format decimal output.',
            'For the long long version: divide by 1024*1024 for MB, by 1024 for KB. Use `static_cast<double>()` to avoid integer division.',
          ],
          concepts: ['function overloading', 'std::ostringstream', 'std::setprecision', 'static_cast', 'long long'],
        },
        {
          id: 'cpp-fn-3',
          title: 'Fix the Reference Bug',
          type: 'fix-bug',
          difficulty: 'intermediate',
          language: 'cpp',
          goal: 'This code has 3 bugs related to pass-by-value vs pass-by-reference. The normalize function should modify the original vector, the swap function should actually swap, and the config should not be copied unnecessarily. Fix all three.',
          skeleton: `#include <iostream>
#include <string>
#include <vector>

// BUG 1: This should modify the original string, not a copy
void normalize(std::string name) {
    for (char& c : name) {
        c = std::tolower(c);
    }
}

// BUG 2: This swap doesn't work because it swaps copies
void swap_strings(std::string a, std::string b) {
    std::string temp = a;
    a = b;
    b = temp;
}

// BUG 3: This copies a potentially large struct every call
struct Config {
    std::string host;
    int port;
    std::vector<std::string> allowed_origins;
};

void print_config(Config cfg) {
    std::cout << cfg.host << ":" << cfg.port << "\\n";
    for (auto origin : cfg.allowed_origins) {
        std::cout << "  " << origin << "\\n";
    }
}

int main() {
    std::string a = "ROCKY";
    normalize(a);
    std::cout << a << "\\n";  // should print: rocky

    std::string x = "hello";
    std::string y = "world";
    swap_strings(x, y);
    std::cout << x << " " << y << "\\n";  // should print: world hello

    Config cfg{"localhost", 8080, {"http://localhost:3000", "http://forge.zanverse.lol"}};
    print_config(cfg);

    return 0;
}`,
          solution: `#include <iostream>
#include <string>
#include <vector>

void normalize(std::string& name) {
    for (char& c : name) {
        c = std::tolower(c);
    }
}

void swap_strings(std::string& a, std::string& b) {
    std::string temp = a;
    a = b;
    b = temp;
}

struct Config {
    std::string host;
    int port;
    std::vector<std::string> allowed_origins;
};

void print_config(const Config& cfg) {
    std::cout << cfg.host << ":" << cfg.port << "\\n";
    for (const auto& origin : cfg.allowed_origins) {
        std::cout << "  " << origin << "\\n";
    }
}

int main() {
    std::string a = "ROCKY";
    normalize(a);
    std::cout << a << "\\n";

    std::string x = "hello";
    std::string y = "world";
    swap_strings(x, y);
    std::cout << x << " " << y << "\\n";

    Config cfg{"localhost", 8080, {"http://localhost:3000", "http://forge.zanverse.lol"}};
    print_config(cfg);

    return 0;
}`,
          hints: [
            'Bug 1: `normalize` takes by value so it modifies a copy. Add `&` to make it a reference parameter.',
            'Bug 2: `swap_strings` also takes by value. Both parameters need `&` to modify the originals.',
            'Bug 3: `print_config` copies the entire Config struct. Use `const Config&` since it only reads. Also use `const auto&` in the for loop.',
          ],
          concepts: ['pass by reference', 'const reference', 'unnecessary copies', 'range-based for reference', 'reference parameters'],
        },
      ],
    },

    // ─── Section 3: Classes & Objects ─────────────
    {
      id: 'cpp-classes',
      title: '3. Classes & Objects',
      explanation: `## Classes & Objects

C++ classes combine data and behavior. They support encapsulation through access modifiers:

\`\`\`cpp
class Server {
private:                     // only accessible inside the class
    std::string name_;
    int port_;
    bool running_;

public:                      // accessible from anywhere
    // Constructor
    Server(const std::string& name, int port)
        : name_(name), port_(port), running_(false) {}

    // Methods
    void start() { running_ = true; }
    void stop() { running_ = false; }

    // Const method (promises not to modify the object)
    std::string address() const {
        return name_ + ":" + std::to_string(port_);
    }

    bool is_running() const { return running_; }
};
\`\`\`

**Key concepts:**
- **Constructor**: called when an object is created. Use **initializer list** (\`: member(value)\`) for efficiency
- **\`private\`**: internal state, hidden from outside code
- **\`public\`**: the interface other code uses
- **\`const\` methods**: guarantee they don't modify the object's state
- **Trailing underscore** (\`name_\`): common convention for private member variables

**Creating objects:**
\`\`\`cpp
Server srv("rocky", 4200);    // stack allocation
srv.start();
std::cout << srv.address();   // rocky:4200
\`\`\``,
      exercises: [
        {
          id: 'cpp-class-1',
          title: 'Define a Class',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'cpp',
          goal: 'Complete the Timer class with a constructor, start/stop methods, and an elapsed method.',
          skeleton: `#include <iostream>
#include <string>
#include <chrono>

class Timer {
__BLANK__:
    std::string label_;
    std::chrono::steady_clock::time_point start_;
    bool running_;

__BLANK__:
    // Constructor with initializer list
    Timer(const std::string& label)
        __BLANK__ label_(label), start_(), running_(false) {}

    void start() {
        start_ = std::chrono::steady_clock::now();
        running_ = __BLANK__;
    }

    void stop() {
        running_ = false;
    }

    // Const method: returns elapsed milliseconds
    double elapsed_ms() __BLANK__ {
        auto end = std::chrono::steady_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::microseconds>(end - start_);
        return duration.count() / 1000.0;
    }

    // Const method: returns the label
    __BLANK__ std::string& label() const {
        return label_;
    }
};

int main() {
    Timer t("database_query");
    t.start();

    // Simulate some work
    volatile int sum = 0;
    for (int i = 0; i < 1000000; i++) sum += i;

    std::cout << t.label() << ": " << t.elapsed_ms() << " ms\\n";

    return 0;
}`,
          solution: `#include <iostream>
#include <string>
#include <chrono>

class Timer {
private:
    std::string label_;
    std::chrono::steady_clock::time_point start_;
    bool running_;

public:
    Timer(const std::string& label)
        : label_(label), start_(), running_(false) {}

    void start() {
        start_ = std::chrono::steady_clock::now();
        running_ = true;
    }

    void stop() {
        running_ = false;
    }

    double elapsed_ms() const {
        auto end = std::chrono::steady_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::microseconds>(end - start_);
        return duration.count() / 1000.0;
    }

    const std::string& label() const {
        return label_;
    }
};

int main() {
    Timer t("database_query");
    t.start();

    volatile int sum = 0;
    for (int i = 0; i < 1000000; i++) sum += i;

    std::cout << t.label() << ": " << t.elapsed_ms() << " ms\\n";

    return 0;
}`,
          hints: [
            '`private` hides internal data. `public` exposes the interface. Initializer list starts with `:`.',
            '`const` after a method signature means it does not modify the object. `true` sets a bool.',
            'Fill in: `private`, `public`, `:`, `true`, `const`, `const`.',
          ],
          concepts: ['class', 'private', 'public', 'constructor', 'initializer list', 'const method', 'std::chrono'],
        },
        {
          id: 'cpp-class-2',
          title: 'Build a Logger Class',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'cpp',
          goal: 'Write a Logger class with: private members for the logger name and a vector of log entries (strings). A constructor taking the name. Public methods: info(msg), warn(msg), error(msg) that push formatted strings like "[INFO] name: msg" into the entries vector. A const dump() method that prints all entries. A const count() method returning the number of entries.',
          skeleton: `#include <iostream>
#include <string>
#include <vector>

// Write the Logger class here


int main() {
    Logger log("app");

    log.info("server started on port 8080");
    log.warn("disk usage above 80%");
    log.error("connection to database lost");
    log.info("retrying connection...");

    std::cout << "Total entries: " << log.count() << "\\n";  // 4
    log.dump();
    // [INFO] app: server started on port 8080
    // [WARN] app: disk usage above 80%
    // [ERROR] app: connection to database lost
    // [INFO] app: retrying connection...

    return 0;
}`,
          solution: `#include <iostream>
#include <string>
#include <vector>

class Logger {
private:
    std::string name_;
    std::vector<std::string> entries_;

public:
    Logger(const std::string& name) : name_(name) {}

    void info(const std::string& msg) {
        entries_.push_back("[INFO] " + name_ + ": " + msg);
    }

    void warn(const std::string& msg) {
        entries_.push_back("[WARN] " + name_ + ": " + msg);
    }

    void error(const std::string& msg) {
        entries_.push_back("[ERROR] " + name_ + ": " + msg);
    }

    size_t count() const {
        return entries_.size();
    }

    void dump() const {
        for (const auto& entry : entries_) {
            std::cout << entry << "\\n";
        }
    }
};

int main() {
    Logger log("app");

    log.info("server started on port 8080");
    log.warn("disk usage above 80%");
    log.error("connection to database lost");
    log.info("retrying connection...");

    std::cout << "Total entries: " << log.count() << "\\n";
    log.dump();

    return 0;
}`,
          hints: [
            'Private members: `std::string name_` and `std::vector<std::string> entries_`. Constructor initializes name via initializer list.',
            'Each log method uses `entries_.push_back("[LEVEL] " + name_ + ": " + msg)` to store formatted entries.',
            '`count()` returns `entries_.size()`. `dump()` loops with `const auto&` and prints each entry. Both are `const` methods.',
          ],
          concepts: ['class design', 'encapsulation', 'std::vector', 'push_back', 'const methods', 'initializer list'],
        },
        {
          id: 'cpp-class-3',
          title: 'Refactor to Use Encapsulation',
          type: 'refactor',
          difficulty: 'intermediate',
          language: 'cpp',
          goal: 'This code uses a struct with all public data and free functions. Refactor it into a proper class with private data, a constructor, and methods. Add validation: port must be 1-65535, and health must be 0-100.',
          skeleton: `#include <iostream>
#include <string>

struct Endpoint {
    std::string host;
    int port;
    int health;  // 0-100
};

void print_endpoint(const Endpoint& ep) {
    std::cout << ep.host << ":" << ep.port
              << " (health: " << ep.health << "%)\\n";
}

bool is_healthy(const Endpoint& ep) {
    return ep.health > 50;
}

void set_health(Endpoint& ep, int h) {
    ep.health = h;  // no validation!
}

int main() {
    Endpoint ep;
    ep.host = "192.168.8.133";
    ep.port = 4200;
    ep.health = 95;

    print_endpoint(ep);
    set_health(ep, 30);
    std::cout << "Healthy: " << std::boolalpha << is_healthy(ep) << "\\n";

    return 0;
}`,
          solution: `#include <iostream>
#include <string>
#include <algorithm>

class Endpoint {
private:
    std::string host_;
    int port_;
    int health_;

public:
    Endpoint(const std::string& host, int port, int health)
        : host_(host),
          port_(std::clamp(port, 1, 65535)),
          health_(std::clamp(health, 0, 100)) {}

    void set_health(int h) {
        health_ = std::clamp(h, 0, 100);
    }

    bool is_healthy() const {
        return health_ > 50;
    }

    void print() const {
        std::cout << host_ << ":" << port_
                  << " (health: " << health_ << "%)\\n";
    }

    const std::string& host() const { return host_; }
    int port() const { return port_; }
    int health() const { return health_; }
};

int main() {
    Endpoint ep("192.168.8.133", 4200, 95);

    ep.print();
    ep.set_health(30);
    std::cout << "Healthy: " << std::boolalpha << ep.is_healthy() << "\\n";

    return 0;
}`,
          hints: [
            'Move `host`, `port`, `health` to `private` with trailing underscores. Create a constructor with all three parameters.',
            'Use `std::clamp(value, min, max)` from `<algorithm>` for validation in the constructor and `set_health`.',
            'Convert free functions to methods: `print_endpoint` becomes `print() const`, `is_healthy` becomes `is_healthy() const`.',
          ],
          concepts: ['encapsulation', 'validation', 'std::clamp', 'struct to class', 'getter methods', 'constructor'],
        },
      ],
    },

    // ─── Section 4: STL Containers ───────────────
    {
      id: 'cpp-stl',
      title: '4. STL Containers',
      explanation: `## STL Containers

The Standard Template Library (STL) provides powerful, generic containers:

**\`std::vector<T>\`** - dynamic array (the workhorse):
\`\`\`cpp
#include <vector>

std::vector<int> nums = {10, 20, 30};
nums.push_back(40);            // add to end
nums.size();                   // 4
nums[0];                       // 10 (no bounds check)
nums.at(0);                    // 10 (bounds checked, throws on error)

// Range-based for
for (const auto& n : nums) {
    std::cout << n << " ";
}
\`\`\`

**\`std::map<K, V>\`** - sorted key-value store (like a tree):
\`\`\`cpp
#include <map>

std::map<std::string, int> ports;
ports["rocky"] = 4200;
ports["pangolin"] = 443;

// Check if key exists
if (ports.count("rocky")) {
    std::cout << ports["rocky"];
}

// Iterate (sorted by key)
for (const auto& [name, port] : ports) {
    std::cout << name << ":" << port << "\\n";
}
\`\`\`

**\`<algorithm>\`** provides powerful operations:
\`\`\`cpp
#include <algorithm>

std::sort(nums.begin(), nums.end());
auto it = std::find(nums.begin(), nums.end(), 20);
int total = std::accumulate(nums.begin(), nums.end(), 0);  // <numeric>
bool has_neg = std::any_of(nums.begin(), nums.end(),
                           [](int n) { return n < 0; });
\`\`\`

**Lambdas** are inline functions:
\`\`\`cpp
auto square = [](int x) { return x * x; };
square(5);  // 25
\`\`\``,
      exercises: [
        {
          id: 'cpp-stl-1',
          title: 'Vector Operations',
          type: 'fill-blank',
          difficulty: 'intermediate',
          language: 'cpp',
          goal: 'Complete the code that processes a vector of server response times using STL algorithms.',
          skeleton: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

int main() {
    std::vector<int> response_times = {120, 45, 230, 67, 89, 310, 52, 178};

    // Sort the times
    std::__BLANK__(response_times.begin(), response_times.end());

    // Calculate the sum
    int total = std::__BLANK__(response_times.begin(), response_times.end(), 0);

    // Find the median (middle element for even-sized vectors: lower middle)
    int median = response_times[response_times.__BLANK__() / 2];

    // Count how many are above 100ms
    int slow_count = std::__BLANK__(response_times.begin(), response_times.end(),
        [](int t) { return t __BLANK__ 100; });

    // Find the fastest (first after sort)
    int fastest = response_times.__BLANK__();

    // Find the slowest (last after sort)
    int slowest = response_times.__BLANK__();

    std::cout << "Total: " << total << " ms\\n";
    std::cout << "Average: " << total / (int)response_times.size() << " ms\\n";
    std::cout << "Median: " << median << " ms\\n";
    std::cout << "Slow (>100ms): " << slow_count << "\\n";
    std::cout << "Fastest: " << fastest << " ms\\n";
    std::cout << "Slowest: " << slowest << " ms\\n";

    return 0;
}`,
          solution: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

int main() {
    std::vector<int> response_times = {120, 45, 230, 67, 89, 310, 52, 178};

    std::sort(response_times.begin(), response_times.end());

    int total = std::accumulate(response_times.begin(), response_times.end(), 0);

    int median = response_times[response_times.size() / 2];

    int slow_count = std::count_if(response_times.begin(), response_times.end(),
        [](int t) { return t > 100; });

    int fastest = response_times.front();

    int slowest = response_times.back();

    std::cout << "Total: " << total << " ms\\n";
    std::cout << "Average: " << total / (int)response_times.size() << " ms\\n";
    std::cout << "Median: " << median << " ms\\n";
    std::cout << "Slow (>100ms): " << slow_count << "\\n";
    std::cout << "Fastest: " << fastest << " ms\\n";
    std::cout << "Slowest: " << slowest << " ms\\n";

    return 0;
}`,
          hints: [
            '`std::sort` sorts in place. `std::accumulate` sums all elements (initial value 0).',
            '`std::count_if` counts elements matching a lambda predicate. Use `>` to check if above 100.',
            'Fill in: `sort`, `accumulate`, `size`, `count_if`, `>`, `front`, `back`.',
          ],
          concepts: ['std::vector', 'std::sort', 'std::accumulate', 'std::count_if', 'lambda', 'front', 'back'],
        },
        {
          id: 'cpp-stl-2',
          title: 'Map-Based Registry',
          type: 'write-function',
          difficulty: 'intermediate',
          language: 'cpp',
          goal: 'Write a ServiceRegistry class that uses std::map to store service names mapped to their port numbers. Implement: register_service(name, port), lookup(name) returning an int (-1 if not found), remove(name), and list_all() that prints all services sorted by name.',
          skeleton: `#include <iostream>
#include <string>
#include <map>

// Write the ServiceRegistry class here


int main() {
    ServiceRegistry registry;

    registry.register_service("engram", 4200);
    registry.register_service("nginx", 443);
    registry.register_service("mission-control", 4300);
    registry.register_service("ssh", 22);

    std::cout << "engram port: " << registry.lookup("engram") << "\\n";    // 4200
    std::cout << "unknown: " << registry.lookup("unknown") << "\\n";       // -1

    registry.remove("ssh");

    std::cout << "\\nActive services:\\n";
    registry.list_all();
    // engram: 4200
    // mission-control: 4300
    // nginx: 443

    return 0;
}`,
          solution: `#include <iostream>
#include <string>
#include <map>

class ServiceRegistry {
private:
    std::map<std::string, int> services_;

public:
    void register_service(const std::string& name, int port) {
        services_[name] = port;
    }

    int lookup(const std::string& name) const {
        auto it = services_.find(name);
        if (it != services_.end()) {
            return it->second;
        }
        return -1;
    }

    void remove(const std::string& name) {
        services_.erase(name);
    }

    void list_all() const {
        for (const auto& [name, port] : services_) {
            std::cout << name << ": " << port << "\\n";
        }
    }
};

int main() {
    ServiceRegistry registry;

    registry.register_service("engram", 4200);
    registry.register_service("nginx", 443);
    registry.register_service("mission-control", 4300);
    registry.register_service("ssh", 22);

    std::cout << "engram port: " << registry.lookup("engram") << "\\n";
    std::cout << "unknown: " << registry.lookup("unknown") << "\\n";

    registry.remove("ssh");

    std::cout << "\\nActive services:\\n";
    registry.list_all();

    return 0;
}`,
          hints: [
            'Use `std::map<std::string, int>` as the private member. `services_[name] = port` inserts or updates.',
            'For `lookup`, use `services_.find(name)` which returns an iterator. Compare with `services_.end()` to check if found.',
            '`services_.erase(name)` removes by key. `std::map` iterates in sorted key order automatically.',
          ],
          concepts: ['std::map', 'find', 'erase', 'structured bindings', 'iterator', 'const methods'],
        },
        {
          id: 'cpp-stl-3',
          title: 'Transform and Filter with Algorithms',
          type: 'write-function',
          difficulty: 'advanced',
          language: 'cpp',
          goal: 'Write a function `process_logs` that takes a vector of log strings and returns a struct containing: error_count (int), warnings (vector of just the warning messages without the "WARN: " prefix), and a sorted unique list of all log levels found. Use STL algorithms and lambdas.',
          skeleton: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <set>

struct LogSummary {
    int error_count;
    std::vector<std::string> warnings;
    std::vector<std::string> levels;
};

// Write process_logs here


int main() {
    std::vector<std::string> logs = {
        "INFO: server started",
        "WARN: disk usage at 85%",
        "ERROR: connection refused",
        "INFO: client connected",
        "ERROR: timeout",
        "WARN: memory usage high",
        "ERROR: disk full",
        "INFO: request processed",
    };

    LogSummary summary = process_logs(logs);

    std::cout << "Errors: " << summary.error_count << "\\n";  // 3
    std::cout << "Warnings:\\n";
    for (const auto& w : summary.warnings) {
        std::cout << "  " << w << "\\n";
    }
    // disk usage at 85%
    // memory usage high
    std::cout << "Levels: ";
    for (const auto& l : summary.levels) {
        std::cout << l << " ";
    }
    // ERROR INFO WARN
    std::cout << "\\n";

    return 0;
}`,
          solution: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <set>

struct LogSummary {
    int error_count;
    std::vector<std::string> warnings;
    std::vector<std::string> levels;
};

LogSummary process_logs(const std::vector<std::string>& logs) {
    LogSummary summary;

    summary.error_count = std::count_if(logs.begin(), logs.end(),
        [](const std::string& line) {
            return line.substr(0, 5) == "ERROR";
        });

    for (const auto& line : logs) {
        if (line.substr(0, 4) == "WARN") {
            summary.warnings.push_back(line.substr(6));
        }
    }

    std::set<std::string> unique_levels;
    for (const auto& line : logs) {
        auto colon = line.find(':');
        if (colon != std::string::npos) {
            unique_levels.insert(line.substr(0, colon));
        }
    }
    summary.levels.assign(unique_levels.begin(), unique_levels.end());

    return summary;
}

int main() {
    std::vector<std::string> logs = {
        "INFO: server started",
        "WARN: disk usage at 85%",
        "ERROR: connection refused",
        "INFO: client connected",
        "ERROR: timeout",
        "WARN: memory usage high",
        "ERROR: disk full",
        "INFO: request processed",
    };

    LogSummary summary = process_logs(logs);

    std::cout << "Errors: " << summary.error_count << "\\n";
    std::cout << "Warnings:\\n";
    for (const auto& w : summary.warnings) {
        std::cout << "  " << w << "\\n";
    }
    std::cout << "Levels: ";
    for (const auto& l : summary.levels) {
        std::cout << l << " ";
    }
    std::cout << "\\n";

    return 0;
}`,
          hints: [
            'Use `std::count_if` with a lambda checking `line.substr(0, 5) == "ERROR"` for the error count.',
            'For warnings, check `line.substr(0, 4) == "WARN"` and extract the message with `line.substr(6)` (skip "WARN: ").',
            'Use `std::set<std::string>` to collect unique levels (it auto-sorts). Copy into the vector with `assign(set.begin(), set.end())`.',
          ],
          concepts: ['std::count_if', 'std::set', 'substr', 'find', 'lambda', 'struct return', 'STL algorithms'],
        },
      ],
    },

    // ─── Section 5: Smart Pointers & Memory ──────
    {
      id: 'cpp-memory',
      title: '5. Smart Pointers & Memory',
      explanation: `## Smart Pointers & Memory

Raw pointers (\`new\`/\`delete\`) are error-prone. Modern C++ uses **smart pointers** that automatically manage memory:

**\`std::unique_ptr<T>\`** - exclusive ownership (one owner, automatically deleted):
\`\`\`cpp
#include <memory>

auto srv = std::make_unique<Server>("rocky", 4200);
srv->start();                   // use -> like a raw pointer
std::cout << srv->address();

// Ownership can be MOVED, not copied
auto srv2 = std::move(srv);     // srv is now nullptr
// srv->start();                // CRASH! srv is null
\`\`\`

**\`std::shared_ptr<T>\`** - shared ownership (reference counted):
\`\`\`cpp
auto config = std::make_shared<Config>();
auto copy = config;             // both point to same object
// reference count = 2
// deleted when LAST shared_ptr goes out of scope
\`\`\`

**RAII (Resource Acquisition Is Initialization):** tie resource lifetimes to object lifetimes. When the object is destroyed, the resource is released:
\`\`\`cpp
{
    auto db = std::make_unique<Database>("localhost");
    db->query("SELECT ...");
}   // db is automatically destroyed and connection closed here
\`\`\`

**When to use which:**
| Pointer | Use When |
|---------|----------|
| \`unique_ptr\` | Single owner, most common case |
| \`shared_ptr\` | Multiple owners need the same resource |
| Raw pointer/reference | Non-owning access, borrowed view |

**Rule of thumb:** use \`unique_ptr\` by default. Only reach for \`shared_ptr\` when you actually need shared ownership.`,
      exercises: [
        {
          id: 'cpp-mem-1',
          title: 'Unique Pointers and Ownership',
          type: 'fill-blank',
          difficulty: 'advanced',
          language: 'cpp',
          goal: 'Complete the code using unique_ptr for exclusive ownership of database connections.',
          skeleton: `#include <iostream>
#include <string>
#include <memory>
#include <vector>

class Connection {
private:
    std::string host_;
    bool connected_;

public:
    Connection(const std::string& host)
        : host_(host), connected_(true) {
        std::cout << "Connected to " << host_ << "\\n";
    }

    ~Connection() {
        std::cout << "Disconnected from " << host_ << "\\n";
    }

    void query(const std::string& sql) const {
        std::cout << "[" << host_ << "] " << sql << "\\n";
    }

    const std::string& host() const { return host_; }
};

// Factory function that returns a unique_ptr
std::unique_ptr<Connection> create_connection(const std::string& host) {
    return std::__BLANK__<Connection>(host);
}

// Transfer ownership into this function
void run_migration(std::__BLANK__<Connection> conn) {
    conn->query("CREATE TABLE users (id INT, name TEXT)");
    conn->query("INSERT INTO users VALUES (1, 'zan')");
    // conn is automatically destroyed when this function returns
}

int main() {
    // Create a unique_ptr
    auto primary = create_connection("192.168.8.133");
    primary->query("SELECT * FROM servers");

    // Move ownership to the migration function
    run_migration(std::__BLANK__(primary));

    // primary is now null
    if (!primary) {
        std::cout << "primary was moved\\n";
    }

    // Store unique_ptrs in a vector
    std::vector<std::__BLANK__<Connection>> pool;
    pool.__BLANK__(create_connection("node-1"));
    pool.push_back(create_connection("node-2"));
    pool.push_back(create_connection("node-3"));

    for (const auto& conn : pool) {
        conn->query("PING");
    }

    std::cout << "Clearing pool...\\n";
    pool.__BLANK__();  // all connections automatically disconnected

    return 0;
}`,
          solution: `#include <iostream>
#include <string>
#include <memory>
#include <vector>

class Connection {
private:
    std::string host_;
    bool connected_;

public:
    Connection(const std::string& host)
        : host_(host), connected_(true) {
        std::cout << "Connected to " << host_ << "\\n";
    }

    ~Connection() {
        std::cout << "Disconnected from " << host_ << "\\n";
    }

    void query(const std::string& sql) const {
        std::cout << "[" << host_ << "] " << sql << "\\n";
    }

    const std::string& host() const { return host_; }
};

std::unique_ptr<Connection> create_connection(const std::string& host) {
    return std::make_unique<Connection>(host);
}

void run_migration(std::unique_ptr<Connection> conn) {
    conn->query("CREATE TABLE users (id INT, name TEXT)");
    conn->query("INSERT INTO users VALUES (1, 'zan')");
}

int main() {
    auto primary = create_connection("192.168.8.133");
    primary->query("SELECT * FROM servers");

    run_migration(std::move(primary));

    if (!primary) {
        std::cout << "primary was moved\\n";
    }

    std::vector<std::unique_ptr<Connection>> pool;
    pool.push_back(create_connection("node-1"));
    pool.push_back(create_connection("node-2"));
    pool.push_back(create_connection("node-3"));

    for (const auto& conn : pool) {
        conn->query("PING");
    }

    std::cout << "Clearing pool...\\n";
    pool.clear();

    return 0;
}`,
          hints: [
            '`std::make_unique<T>(args)` creates a unique_ptr. `std::unique_ptr<T>` is the type.',
            '`std::move()` transfers ownership. After moving, the source pointer is null.',
            'Fill in: `make_unique`, `unique_ptr`, `move`, `unique_ptr`, `push_back`, `clear`.',
          ],
          concepts: ['std::unique_ptr', 'std::make_unique', 'std::move', 'ownership transfer', 'RAII', 'destructor'],
        },
        {
          id: 'cpp-mem-2',
          title: 'Shared Pointers and Reference Counting',
          type: 'write-function',
          difficulty: 'advanced',
          language: 'cpp',
          goal: 'Write a simple event system. Create an EventBus class that stores listeners as shared_ptr<Listener>. A Listener struct has a name and a callback. The EventBus has subscribe(listener) and emit(message) methods. emit calls every listener\'s callback. Demonstrate that listeners stay alive as long as anyone holds a shared_ptr to them.',
          skeleton: `#include <iostream>
#include <string>
#include <memory>
#include <vector>
#include <functional>

struct Listener {
    std::string name;
    std::function<void(const std::string&)> callback;

    Listener(const std::string& n, std::function<void(const std::string&)> cb)
        : name(n), callback(cb) {}

    ~Listener() {
        std::cout << "Listener '" << name << "' destroyed\\n";
    }
};

// Write the EventBus class here


int main() {
    EventBus bus;

    {
        auto logger = std::make_shared<Listener>("logger",
            [](const std::string& msg) {
                std::cout << "[LOG] " << msg << "\\n";
            });

        auto monitor = std::make_shared<Listener>("monitor",
            [](const std::string& msg) {
                std::cout << "[MON] " << msg << "\\n";
            });

        bus.subscribe(logger);
        bus.subscribe(monitor);

        std::cout << "logger refs: " << logger.use_count() << "\\n";  // 2

        bus.emit("server started");
        // [LOG] server started
        // [MON] server started
    }
    // logger and monitor local shared_ptrs destroyed here,
    // but EventBus still holds references

    std::cout << "\\nAfter scope, bus still has listeners:\\n";
    bus.emit("health check");
    // [LOG] health check
    // [MON] health check

    std::cout << "\\nListener count: " << bus.count() << "\\n";  // 2

    return 0;
}`,
          solution: `#include <iostream>
#include <string>
#include <memory>
#include <vector>
#include <functional>

struct Listener {
    std::string name;
    std::function<void(const std::string&)> callback;

    Listener(const std::string& n, std::function<void(const std::string&)> cb)
        : name(n), callback(cb) {}

    ~Listener() {
        std::cout << "Listener '" << name << "' destroyed\\n";
    }
};

class EventBus {
private:
    std::vector<std::shared_ptr<Listener>> listeners_;

public:
    void subscribe(std::shared_ptr<Listener> listener) {
        listeners_.push_back(listener);
    }

    void emit(const std::string& message) const {
        for (const auto& listener : listeners_) {
            listener->callback(message);
        }
    }

    size_t count() const {
        return listeners_.size();
    }
};

int main() {
    EventBus bus;

    {
        auto logger = std::make_shared<Listener>("logger",
            [](const std::string& msg) {
                std::cout << "[LOG] " << msg << "\\n";
            });

        auto monitor = std::make_shared<Listener>("monitor",
            [](const std::string& msg) {
                std::cout << "[MON] " << msg << "\\n";
            });

        bus.subscribe(logger);
        bus.subscribe(monitor);

        std::cout << "logger refs: " << logger.use_count() << "\\n";

        bus.emit("server started");
    }

    std::cout << "\\nAfter scope, bus still has listeners:\\n";
    bus.emit("health check");

    std::cout << "\\nListener count: " << bus.count() << "\\n";

    return 0;
}`,
          hints: [
            'EventBus stores `std::vector<std::shared_ptr<Listener>>`. `subscribe` takes a `std::shared_ptr<Listener>` and pushes it.',
            '`emit` iterates listeners and calls `listener->callback(message)`. Mark it `const` since it does not modify the bus.',
            'shared_ptr reference counting keeps Listeners alive as long as the EventBus holds references, even after local variables go out of scope.',
          ],
          concepts: ['std::shared_ptr', 'std::make_shared', 'use_count', 'reference counting', 'RAII', 'std::function', 'event system'],
        },
      ],
    },
  ],
};
