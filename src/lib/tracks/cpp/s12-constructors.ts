import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-ctor',
  title: '12. Constructors',
  explanation: `## Constructors in C++

Constructors are special member functions that initialise objects when they are created. They have the same name as the class and no return type.

### Default Constructor
\`\`\`cpp
class Foo {
public:
    Foo() { /* default init */ }
};
\`\`\`
If you provide no constructors at all, the compiler generates a default one.

### Parameterised Constructor
\`\`\`cpp
class Foo {
public:
    Foo(int x, int y) : x_(x), y_(y) {}
private:
    int x_, y_;
};
\`\`\`

### Member Initializer Lists
Always prefer initializer lists over assignment in the constructor body. They are required for const members, references, and base classes.

\`\`\`cpp
class Bar {
    const int id;
public:
    Bar(int i) : id(i) {}  // MUST use initializer list
};
\`\`\`

### Copy Constructor
\`\`\`cpp
class Foo {
public:
    Foo(const Foo& other);  // copy constructor
};
\`\`\`

### Delegating Constructors (C++11)
One constructor can call another:
\`\`\`cpp
class Widget {
public:
    Widget() : Widget(0) {}
    Widget(int val) : value(val) {}
private:
    int value;
};
\`\`\`

### Explicit Keyword
Prevents implicit conversions via single-argument constructors:
\`\`\`cpp
class Id {
public:
    explicit Id(int n) : num(n) {}
private:
    int num;
};
// Id x = 5;  // ERROR - implicit conversion blocked
Id x(5);      // OK
\`\`\`
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'cpp-ctor-1',
      title: 'Default constructor',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the default constructor name.',
      skeleton: `class Lamp {
public:
    bool on = false;
    __BLANK__() { on = false; }
};`,
      solution: `class Lamp {
public:
    bool on = false;
    Lamp() { on = false; }
};`,
      hints: [
        'A constructor has the same name as the class.',
        'It has no return type.',
        'The constructor name is `Lamp`.',
      ],
      concepts: ['default-constructor'],
    },
    {
      id: 'cpp-ctor-2',
      title: 'Member initializer list',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Complete the member initializer list syntax.',
      skeleton: `class Point {
    int x, y;
public:
    Point(int a, int b) __BLANK__ x(a), y(b) {}
};`,
      solution: `class Point {
    int x, y;
public:
    Point(int a, int b) : x(a), y(b) {}
};`,
      hints: [
        'The initializer list starts with a special character after the parameter list.',
        'It comes before the constructor body.',
        'The character is a colon `:`.',
      ],
      concepts: ['initializer-list'],
    },
    {
      id: 'cpp-ctor-3',
      title: 'Explicit keyword',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Add the keyword that prevents implicit conversion.',
      skeleton: `class UserId {
    int id;
public:
    __BLANK__ UserId(int n) : id(n) {}
    int get() const { return id; }
};`,
      solution: `class UserId {
    int id;
public:
    explicit UserId(int n) : id(n) {}
    int get() const { return id; }
};`,
      hints: [
        'This keyword prevents the compiler from using this constructor for implicit conversions.',
        'It is placed before the constructor declaration.',
        'The keyword is `explicit`.',
      ],
      concepts: ['explicit', 'implicit-conversion'],
    },
    {
      id: 'cpp-ctor-4',
      title: 'Copy constructor signature',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the correct parameter type for a copy constructor.',
      skeleton: `class Buffer {
    int* data;
    int size;
public:
    Buffer(int s) : size(s), data(new int[s]{}) {}
    Buffer(__BLANK__);  // copy constructor declaration
    ~Buffer() { delete[] data; }
};`,
      solution: `class Buffer {
    int* data;
    int size;
public:
    Buffer(int s) : size(s), data(new int[s]{}) {}
    Buffer(const Buffer& other);  // copy constructor declaration
    ~Buffer() { delete[] data; }
};`,
      hints: [
        'The copy constructor takes a reference to the same type.',
        'The reference should be const to avoid modifying the source.',
        'The parameter is `const Buffer& other`.',
      ],
      concepts: ['copy-constructor', 'const-reference'],
    },
    {
      id: 'cpp-ctor-5',
      title: 'Delegating constructor',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Make the default constructor delegate to the parameterised one.',
      skeleton: `class Config {
    int timeout;
    bool verbose;
public:
    Config(int t, bool v) : timeout(t), verbose(v) {}
    Config() : __BLANK__(30, false) {}
};`,
      solution: `class Config {
    int timeout;
    bool verbose;
public:
    Config(int t, bool v) : timeout(t), verbose(v) {}
    Config() : Config(30, false) {}
};`,
      hints: [
        'A delegating constructor calls another constructor of the same class.',
        'Use the class name in the initializer list.',
        'Write `Config(30, false)` to delegate.',
      ],
      concepts: ['delegating-constructor'],
    },
    {
      id: 'cpp-ctor-6',
      title: 'Initializer list for const member',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Initialise the const member using the initializer list.',
      skeleton: `class Serial {
    const int number;
public:
    Serial(int n) : __BLANK__(n) {}
    int get() const { return number; }
};`,
      solution: `class Serial {
    const int number;
public:
    Serial(int n) : number(n) {}
    int get() const { return number; }
};`,
      hints: [
        'Const members must be initialised in the initializer list.',
        'You cannot assign to a const member in the body.',
        'Initialise `number` with `number(n)`.',
      ],
      concepts: ['initializer-list', 'const-member'],
    },
    // ---- write-function (6) ----
    {
      id: 'cpp-ctor-7',
      title: 'Write a class with multiple constructors',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a Color class with default constructor (all 0) and a parameterised constructor taking r, g, b.',
      skeleton: `// Write class Color with:
// - private int r, g, b
// - Default constructor: sets all to 0
// - Parameterised constructor: Color(int r, int g, int b)
// - std::string toString() const returning "rgb(r,g,b)"`,
      solution: `class Color {
    int r, g, b;
public:
    Color() : r(0), g(0), b(0) {}
    Color(int r, int g, int b) : r(r), g(g), b(b) {}
    std::string toString() const {
        return "rgb(" + std::to_string(r) + "," +
               std::to_string(g) + "," +
               std::to_string(b) + ")";
    }
};`,
      hints: [
        'Use initializer lists for both constructors.',
        'The default constructor sets r, g, b all to 0.',
        'Use std::to_string to convert ints in toString().',
      ],
      concepts: ['constructor-overloading', 'initializer-list'],
    },
    {
      id: 'cpp-ctor-8',
      title: 'Write a deep-copy constructor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a copy constructor for IntArray that performs a deep copy of the dynamically allocated array.',
      skeleton: `class IntArray {
    int* data;
    int size;
public:
    IntArray(int s) : size(s), data(new int[s]{}) {}
    ~IntArray() { delete[] data; }
    // Write the copy constructor
    int getSize() const { return size; }
    int& operator[](int i) { return data[i]; }
};`,
      solution: `class IntArray {
    int* data;
    int size;
public:
    IntArray(int s) : size(s), data(new int[s]{}) {}
    IntArray(const IntArray& other) : size(other.size), data(new int[other.size]) {
        for (int i = 0; i < size; ++i)
            data[i] = other.data[i];
    }
    ~IntArray() { delete[] data; }
    int getSize() const { return size; }
    int& operator[](int i) { return data[i]; }
};`,
      hints: [
        'Allocate a new array of the same size.',
        'Copy each element from other.data to the new array.',
        'Use an initializer list for size and data.',
      ],
      concepts: ['copy-constructor', 'deep-copy', 'dynamic-memory'],
    },
    {
      id: 'cpp-ctor-9',
      title: 'Write delegating constructors',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a Server class with a full constructor and two delegating constructors.',
      skeleton: `// Write class Server with:
// - private: std::string host, int port, bool secure
// - Server(string h, int p, bool s) - full constructor
// - Server(string h, int p) - delegates with secure=false
// - Server() - delegates with host="localhost", port=8080`,
      solution: `class Server {
    std::string host;
    int port;
    bool secure;
public:
    Server(std::string h, int p, bool s)
        : host(std::move(h)), port(p), secure(s) {}
    Server(std::string h, int p)
        : Server(std::move(h), p, false) {}
    Server()
        : Server("localhost", 8080, false) {}
};`,
      hints: [
        'The two-argument constructor delegates to the three-argument one.',
        'The default constructor delegates to the three-argument one with default values.',
        'Use the class name in the initializer list to delegate.',
      ],
      concepts: ['delegating-constructor', 'constructor-overloading'],
    },
    {
      id: 'cpp-ctor-10',
      title: 'Write a class with explicit constructor',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a Meter class with an explicit constructor to prevent implicit conversions from double.',
      skeleton: `// Write class Meter with:
// - private double value
// - explicit constructor taking double
// - double getValue() const
// The explicit keyword should prevent: Meter m = 5.0;`,
      solution: `class Meter {
    double value;
public:
    explicit Meter(double v) : value(v) {}
    double getValue() const { return value; }
};`,
      hints: [
        'Place the explicit keyword before the constructor.',
        'This means you must use direct initialization: Meter m(5.0);',
        'Meter m = 5.0 would be a compile error with explicit.',
      ],
      concepts: ['explicit', 'implicit-conversion'],
    },
    {
      id: 'cpp-ctor-11',
      title: 'Write a class with default member initializers',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a Settings class that uses in-class default member initializers and a constructor that overrides them.',
      skeleton: `// Write class Settings with:
// - private int volume = 50, brightness = 80, contrast = 60
// - Default constructor (use = default)
// - Parameterised constructor(int v, int b, int c)
// - getters for all three`,
      solution: `class Settings {
    int volume = 50;
    int brightness = 80;
    int contrast = 60;
public:
    Settings() = default;
    Settings(int v, int b, int c)
        : volume(v), brightness(b), contrast(c) {}
    int getVolume() const { return volume; }
    int getBrightness() const { return brightness; }
    int getContrast() const { return contrast; }
};`,
      hints: [
        'Use = default for the default constructor.',
        'In-class initializers provide defaults when no initializer list entry overrides them.',
        'The parameterised constructor overrides the defaults via its initializer list.',
      ],
      concepts: ['default-member-initializer', 'defaulted-constructor'],
    },
    {
      id: 'cpp-ctor-12',
      title: 'Write a class with destructor logging',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a Resource class that prints messages in its constructor and destructor.',
      skeleton: `#include <iostream>
#include <string>
// Write class Resource with:
// - private std::string name
// - Constructor taking string name, prints "Acquired: <name>"
// - Destructor prints "Released: <name>"`,
      solution: `#include <iostream>
#include <string>

class Resource {
    std::string name;
public:
    Resource(std::string n) : name(std::move(n)) {
        std::cout << "Acquired: " << name << std::endl;
    }
    ~Resource() {
        std::cout << "Released: " << name << std::endl;
    }
};`,
      hints: [
        'The destructor is ~Resource() with no parameters.',
        'Print using std::cout in both constructor and destructor.',
        'Move the string parameter into the member for efficiency.',
      ],
      concepts: ['constructor', 'destructor', 'RAII'],
    },
    // ---- fix-bug (3) ----
    {
      id: 'cpp-ctor-13',
      title: 'Fix: assignment to const member in body',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the constructor so the const member is properly initialised.',
      skeleton: `class Token {
    const int id;
public:
    Token(int n) {
        id = n;  // ERROR: cannot assign to const
    }
    int getId() const { return id; }
};`,
      solution: `class Token {
    const int id;
public:
    Token(int n) : id(n) {}
    int getId() const { return id; }
};`,
      hints: [
        'Const members cannot be assigned in the constructor body.',
        'They must be initialised before the body executes.',
        'Use a member initializer list: Token(int n) : id(n) {}',
      ],
      concepts: ['const-member', 'initializer-list'],
    },
    {
      id: 'cpp-ctor-14',
      title: 'Fix: missing default constructor',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fix the code so that creating a Sensor without arguments compiles.',
      skeleton: `class Sensor {
    int value;
public:
    Sensor(int v) : value(v) {}
    int get() const { return value; }
};

int main() {
    Sensor s;  // ERROR: no default constructor
    return 0;
}`,
      solution: `class Sensor {
    int value;
public:
    Sensor() : value(0) {}
    Sensor(int v) : value(v) {}
    int get() const { return value; }
};

int main() {
    Sensor s;
    return 0;
}`,
      hints: [
        'Providing any constructor suppresses the compiler-generated default.',
        'You need to add a default constructor explicitly.',
        'Add Sensor() : value(0) {} before the parameterised constructor.',
      ],
      concepts: ['default-constructor', 'constructor-overloading'],
    },
    {
      id: 'cpp-ctor-15',
      title: 'Fix: initializer list order',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fix the initialisation order bug. Members are initialised in declaration order, not initializer list order.',
      skeleton: `class Buffer {
    int capacity;
    int* data;
public:
    // Bug: data uses capacity but capacity may not be initialised yet
    Buffer(int cap) : data(new int[capacity]{}), capacity(cap) {}
    ~Buffer() { delete[] data; }
};`,
      solution: `class Buffer {
    int capacity;
    int* data;
public:
    Buffer(int cap) : capacity(cap), data(new int[cap]{}) {}
    ~Buffer() { delete[] data; }
};`,
      hints: [
        'Members are initialised in the order they are declared, not the order in the list.',
        'capacity is declared first, so it is initialised first regardless.',
        'Reorder the initializer list AND use the parameter cap instead of the member.',
      ],
      concepts: ['initializer-list', 'initialization-order'],
    },
    // ---- predict-output (3) ----
    {
      id: 'cpp-ctor-16',
      title: 'Predict: construction and destruction order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict the output of this program.',
      skeleton: `#include <iostream>

class Obj {
    char label;
public:
    Obj(char c) : label(c) { std::cout << label; }
    ~Obj() { std::cout << label; }
};

int main() {
    Obj a('A');
    Obj b('B');
    Obj c('C');
    return 0;
}`,
      solution: `ABCCBA`,
      hints: [
        'Objects are constructed in order of declaration.',
        'Objects are destroyed in reverse order of construction.',
        'Construction prints ABC, destruction prints CBA.',
      ],
      concepts: ['constructor', 'destructor', 'stack-unwinding'],
    },
    {
      id: 'cpp-ctor-17',
      title: 'Predict: delegating constructor output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict what this program prints.',
      skeleton: `#include <iostream>

class Logger {
public:
    Logger(int level, bool verbose) {
        std::cout << "full:" << level << ":" << verbose << " ";
    }
    Logger(int level) : Logger(level, false) {
        std::cout << "partial ";
    }
    Logger() : Logger(1) {
        std::cout << "default ";
    }
};

int main() {
    Logger l;
    return 0;
}`,
      solution: `full:1:0 partial default `,
      hints: [
        'Logger() delegates to Logger(1), which delegates to Logger(1, false).',
        'The delegated constructor body runs first.',
        'The chain is: full constructor body, then partial body, then default body.',
      ],
      concepts: ['delegating-constructor', 'execution-order'],
    },
    {
      id: 'cpp-ctor-18',
      title: 'Predict: explicit prevents conversion',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Predict whether this code compiles.',
      skeleton: `class Kg {
public:
    explicit Kg(double val) : value(val) {}
    double value;
};

void weigh(Kg k) {
    // uses k.value
}

int main() {
    weigh(70.0);  // Does this compile?
    return 0;
}`,
      solution: `compile error`,
      hints: [
        'The constructor is marked explicit.',
        'Passing 70.0 to a function expecting Kg requires implicit conversion.',
        'explicit blocks that implicit conversion, causing a compile error.',
      ],
      concepts: ['explicit', 'implicit-conversion'],
    },
    // ---- refactor (2) ----
    {
      id: 'cpp-ctor-19',
      title: 'Refactor: use initializer list',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Refactor the constructor to use a member initializer list instead of assignment in the body.',
      skeleton: `class Employee {
    std::string name;
    int id;
    double salary;
public:
    Employee(std::string n, int i, double s) {
        name = n;
        id = i;
        salary = s;
    }
};`,
      solution: `class Employee {
    std::string name;
    int id;
    double salary;
public:
    Employee(std::string n, int i, double s)
        : name(std::move(n)), id(i), salary(s) {}
};`,
      hints: [
        'Move assignments from the body into the initializer list.',
        'Use : after the parameter list, then member(value) for each.',
        'Use std::move for the string to avoid an unnecessary copy.',
      ],
      concepts: ['initializer-list', 'move-semantics'],
    },
    {
      id: 'cpp-ctor-20',
      title: 'Refactor: reduce constructor duplication with delegation',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor three constructors to use delegating constructors, eliminating duplicate initialization code.',
      skeleton: `class Connection {
    std::string host;
    int port;
    bool encrypted;
    int timeout;
public:
    Connection() {
        host = "localhost";
        port = 3306;
        encrypted = false;
        timeout = 30;
    }
    Connection(std::string h, int p) {
        host = h;
        port = p;
        encrypted = false;
        timeout = 30;
    }
    Connection(std::string h, int p, bool e, int t) {
        host = h;
        port = p;
        encrypted = e;
        timeout = t;
    }
};`,
      solution: `class Connection {
    std::string host;
    int port;
    bool encrypted;
    int timeout;
public:
    Connection(std::string h, int p, bool e, int t)
        : host(std::move(h)), port(p), encrypted(e), timeout(t) {}
    Connection(std::string h, int p)
        : Connection(std::move(h), p, false, 30) {}
    Connection()
        : Connection("localhost", 3306, false, 30) {}
};`,
      hints: [
        'Identify the most complete constructor as the primary one.',
        'Have simpler constructors delegate to the primary with default values.',
        'Use initializer lists instead of assignment in the body.',
      ],
      concepts: ['delegating-constructor', 'initializer-list', 'DRY'],
    },
  ],
};
