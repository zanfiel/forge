import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cpp-lambda',
  title: '28. Lambda Expressions',
  explanation: `## Lambda Expressions in C++\n\nLambdas are anonymous function objects defined inline. They are one of the most powerful features of modern C++.\n\n### Basic Syntax\n\`\`\`cpp\nauto greet = []() { return "Hello"; };\nauto add = [](int a, int b) { return a + b; };\n\`\`\`\n\n### Capture Clauses\n\`\`\`cpp\nint x = 10;\nauto by_val = [x]() { return x; };       // capture by value\nauto by_ref = [&x]() { x++; };            // capture by reference\nauto all_val = [=]() { return x; };        // capture all by value\nauto all_ref = [&]() { x++; };             // capture all by reference\n\`\`\`\n\n### Mutable Lambdas\n\`\`\`cpp\nint count = 0;\nauto counter = [count]() mutable { return ++count; };\n// The captured copy of count is modified, not the original\n\`\`\`\n\n### Generic Lambdas (C++14)\n\`\`\`cpp\nauto add = [](auto a, auto b) { return a + b; };\nadd(1, 2);       // int\nadd(1.5, 2.5);   // double\n\`\`\`\n\n### Capture Initializers (C++14)\n\`\`\`cpp\nauto ptr = std::make_unique<int>(42);\nauto lambda = [p = std::move(ptr)]() { return *p; };\n\`\`\`\n\n### Constexpr Lambdas (C++17)\n\`\`\`cpp\nconstexpr auto square = [](int n) { return n * n; };\nstatic_assert(square(5) == 25);\n\`\`\`\n\n### Template Lambdas (C++20)\n\`\`\`cpp\nauto add = []<typename T>(T a, T b) { return a + b; };\n\`\`\`\n\n### std::function\n\`\`\`cpp\n#include <functional>\nstd::function<int(int, int)> op = [](int a, int b) { return a + b; };\n\`\`\``,
  exercises: [
    {
      id: 'cpp-lambda-1',
      title: 'Basic Lambda Syntax',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to create a lambda that returns the sum of two integers.',
      skeleton: `auto add = ___(int a, int b) { return a + b; };
int result = add(3, 4); // 7`,
      solution: `auto add = [](int a, int b) { return a + b; };
int result = add(3, 4); // 7`,
      hints: [
        'Lambdas begin with a capture clause in square brackets.',
        'An empty capture clause is written as [].',
        'The parameters follow in parentheses just like a function.',
      ],
      concepts: ['lambda', 'capture clause', 'auto'],
    },
    {
      id: 'cpp-lambda-2',
      title: 'Capture by Value',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the capture clause to capture variable x by value.',
      skeleton: `int x = 10;
auto fn = ___() { return x * 2; };
int result = fn(); // 20`,
      solution: `int x = 10;
auto fn = [x]() { return x * 2; };
int result = fn(); // 20`,
      hints: [
        'To capture a specific variable by value, put its name inside the brackets.',
        '[x] captures x by value.',
        'You could also use [=] to capture everything by value.',
      ],
      concepts: ['capture by value', 'lambda capture'],
    },
    {
      id: 'cpp-lambda-3',
      title: 'Capture by Reference',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the capture clause to capture counter by reference so the lambda can modify it.',
      skeleton: `int counter = 0;
auto increment = ___() { counter++; };
increment();
increment();
// counter is now 2`,
      solution: `int counter = 0;
auto increment = [&counter]() { counter++; };
increment();
increment();
// counter is now 2`,
      hints: [
        'Use & before the variable name to capture by reference.',
        '[&counter] captures counter by reference.',
        'You could also use [&] to capture everything by reference.',
      ],
      concepts: ['capture by reference', 'lambda mutation'],
    },
    {
      id: 'cpp-lambda-4',
      title: 'Lambda as Comparator',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Write a lambda that sorts a vector of integers in descending order using std::sort.',
      skeleton: `#include <vector>
#include <algorithm>

void sortDescending(std::vector<int>& v) {
    // Use std::sort with a lambda comparator
}`,
      solution: `#include <vector>
#include <algorithm>

void sortDescending(std::vector<int>& v) {
    std::sort(v.begin(), v.end(), [](int a, int b) { return a > b; });
}`,
      hints: [
        'std::sort takes a third argument: a comparator.',
        'The comparator returns true if the first argument should come before the second.',
        'For descending order, return a > b.',
      ],
      concepts: ['lambda comparator', 'std::sort', 'descending order'],
    },
    {
      id: 'cpp-lambda-5',
      title: 'Mutable Lambda',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'Fill in the blank to allow the lambda to modify its captured copy of count.',
      skeleton: `int count = 0;
auto counter = [count]() ___ { return ++count; };
counter(); // returns 1
counter(); // returns 2`,
      solution: `int count = 0;
auto counter = [count]() mutable { return ++count; };
counter(); // returns 1
counter(); // returns 2`,
      hints: [
        'By default, value-captured variables are const inside the lambda.',
        'The mutable keyword allows modification of value-captured copies.',
        'The original variable is not affected.',
      ],
      concepts: ['mutable lambda', 'capture by value', 'const'],
    },
    {
      id: 'cpp-lambda-6',
      title: 'Predict Mutable Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

int main() {
    int x = 5;
    auto fn = [x]() mutable {
        x += 10;
        return x;
    };
    std::cout << fn() << " " << x << std::endl;
    return 0;
}`,
      solution: `15 5`,
      hints: [
        'The lambda captures x by value, so it gets its own copy.',
        'mutable allows modifying the copy, not the original.',
        'The original x remains unchanged at 5.',
      ],
      concepts: ['mutable lambda', 'capture by value', 'copy semantics'],
    },
    {
      id: 'cpp-lambda-7',
      title: 'Lambda with Explicit Return Type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the blank to specify an explicit return type of double for the lambda.',
      skeleton: `auto divide = [](int a, int b) ___ {
    return static_cast<double>(a) / b;
};
double result = divide(7, 2); // 3.5`,
      solution: `auto divide = [](int a, int b) -> double {
    return static_cast<double>(a) / b;
};
double result = divide(7, 2); // 3.5`,
      hints: [
        'Trailing return types use the -> syntax.',
        'Place -> double after the parameter list.',
        'This is the same trailing return type syntax used in regular functions.',
      ],
      concepts: ['trailing return type', 'lambda', 'type deduction'],
    },
    {
      id: 'cpp-lambda-8',
      title: 'Generic Lambda',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Write a generic lambda (C++14) that returns the maximum of two values using the > operator.',
      skeleton: `// Write a generic lambda stored in variable 'maxOf'
// that works with any comparable type`,
      solution: `auto maxOf = [](auto a, auto b) {
    return (a > b) ? a : b;
};`,
      hints: [
        'Generic lambdas use auto for parameter types.',
        'auto parameters make the lambda a template under the hood.',
        'Use the ternary operator or an if-else to return the larger value.',
      ],
      concepts: ['generic lambda', 'auto parameters', 'C++14'],
    },
    {
      id: 'cpp-lambda-9',
      title: 'Fix the Dangling Reference',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the bug where the lambda captures a dangling reference.',
      skeleton: `#include <functional>
#include <string>

std::function<std::string()> makeGreeter(const std::string& name) {
    return [&name]() {
        return "Hello, " + name;
    };
}
// Usage: auto greet = makeGreeter("World");
// greet() -> undefined behavior!`,
      solution: `#include <functional>
#include <string>

std::function<std::string()> makeGreeter(const std::string& name) {
    return [name]() {
        return "Hello, " + name;
    };
}
// Usage: auto greet = makeGreeter("World");
// greet() -> "Hello, World"`,
      hints: [
        'The parameter name is a reference that becomes invalid after the function returns.',
        'Capturing by reference (&name) holds a dangling reference.',
        'Capture by value instead to make a safe copy.',
      ],
      concepts: ['dangling reference', 'lambda lifetime', 'capture by value'],
    },
    {
      id: 'cpp-lambda-10',
      title: 'std::function Storage',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fill in the std::function type signature to store a lambda that takes two ints and returns a bool.',
      skeleton: `#include <functional>

___<___> isGreater = [](int a, int b) {
    return a > b;
};`,
      solution: `#include <functional>

std::function<bool(int, int)> isGreater = [](int a, int b) {
    return a > b;
};`,
      hints: [
        'std::function is templated on the function signature.',
        'The signature format is ReturnType(ParamTypes...).',
        'This lambda returns bool and takes two int parameters.',
      ],
      concepts: ['std::function', 'type erasure', 'function signature'],
    },
    {
      id: 'cpp-lambda-11',
      title: 'Immediately Invoked Lambda',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Use an immediately invoked lambda expression (IIFE) to initialize a const variable with complex logic.',
      skeleton: `#include <string>

// Use an immediately invoked lambda to initialize 'grade'
// If score >= 90 return "A", >= 80 return "B", >= 70 return "C", else "F"
int score = 85;
const std::string grade = /* your IIFE here */;`,
      solution: `#include <string>

int score = 85;
const std::string grade = [&]() -> std::string {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    return "F";
}();`,
      hints: [
        'An IIFE is a lambda that is called immediately with () at the end.',
        'Capture score by reference or by value.',
        'Add () after the closing brace of the lambda body to invoke it.',
      ],
      concepts: ['IIFE', 'const initialization', 'lambda'],
    },
    {
      id: 'cpp-lambda-12',
      title: 'Capture Initializer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Use a C++14 capture initializer to move a unique_ptr into a lambda.',
      skeleton: `#include <memory>
#include <functional>

std::function<int()> makeReader() {
    auto ptr = std::make_unique<int>(42);
    // Return a lambda that captures ptr by moving it
    // and returns the dereferenced value
}`,
      solution: `#include <memory>
#include <functional>

std::function<int()> makeReader() {
    auto ptr = std::make_unique<int>(42);
    return [p = std::move(ptr)]() { return *p; };
}`,
      hints: [
        'C++14 allows init-captures: [varName = expression].',
        'Use std::move to transfer ownership of the unique_ptr.',
        'The syntax is [p = std::move(ptr)] to move ptr into a new capture named p.',
      ],
      concepts: ['init-capture', 'std::move', 'unique_ptr', 'C++14'],
    },
    {
      id: 'cpp-lambda-13',
      title: 'Predict Capture Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

int main() {
    int a = 1, b = 2;
    auto fn = [a, &b]() {
        // a is captured by value, b by reference
        return a + b;
    };
    a = 100;
    b = 200;
    std::cout << fn() << std::endl;
    return 0;
}`,
      solution: `201`,
      hints: [
        'a is captured by value at the point the lambda is created (a=1).',
        'b is captured by reference, so it reflects the current value (b=200).',
        '1 + 200 = 201.',
      ],
      concepts: ['capture by value', 'capture by reference', 'lambda evaluation'],
    },
    {
      id: 'cpp-lambda-14',
      title: 'Fix the Missing Mutable',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'cpp',
      goal: 'Fix the compilation error in this lambda that tries to modify a value-captured variable.',
      skeleton: `#include <iostream>

int main() {
    int total = 0;
    auto accumulate = [total](int val) {
        total += val;
        return total;
    };
    std::cout << accumulate(5) << std::endl;
    std::cout << accumulate(3) << std::endl;
    return 0;
}`,
      solution: `#include <iostream>

int main() {
    int total = 0;
    auto accumulate = [total](int val) mutable {
        total += val;
        return total;
    };
    std::cout << accumulate(5) << std::endl;
    std::cout << accumulate(3) << std::endl;
    return 0;
}`,
      hints: [
        'Value-captured variables are const by default inside a lambda.',
        'You cannot modify total without the mutable keyword.',
        'Add mutable after the parameter list.',
      ],
      concepts: ['mutable', 'const capture', 'compilation error'],
    },
    {
      id: 'cpp-lambda-15',
      title: 'Constexpr Lambda',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Write a constexpr lambda (C++17) that computes the factorial of n, and verify it with static_assert.',
      skeleton: `// Write a constexpr lambda 'factorial' that computes n!
// Then use static_assert to verify factorial(5) == 120`,
      solution: `constexpr auto factorial = [](int n) {
    int result = 1;
    for (int i = 2; i <= n; ++i) {
        result *= i;
    }
    return result;
};
static_assert(factorial(5) == 120);`,
      hints: [
        'In C++17, lambdas are implicitly constexpr if they meet the requirements.',
        'You can also explicitly mark them constexpr.',
        'Use static_assert to verify the result at compile time.',
      ],
      concepts: ['constexpr lambda', 'compile-time evaluation', 'static_assert', 'C++17'],
    },
    {
      id: 'cpp-lambda-16',
      title: 'Template Lambda (C++20)',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fill in the blank to create a C++20 template lambda that constrains both parameters to the same type.',
      skeleton: `auto add = []___(___ a, ___ b) {
    return a + b;
};
// add(1, 2) works
// add(1, 2.0) would NOT compile`,
      solution: `auto add = []<typename T>(T a, T b) {
    return a + b;
};
// add(1, 2) works
// add(1, 2.0) would NOT compile`,
      hints: [
        'C++20 allows template parameter lists on lambdas.',
        'Place <typename T> between [] and ().',
        'Both parameters use the same type T, enforcing matching types.',
      ],
      concepts: ['template lambda', 'C++20', 'type constraints'],
    },
    {
      id: 'cpp-lambda-17',
      title: 'Predict Nested Capture',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'What does this program print?',
      skeleton: `#include <iostream>

int main() {
    int x = 0;
    auto outer = [&x]() {
        x += 10;
        auto inner = [x]() { return x + 5; };
        x += 10;
        return inner();
    };
    std::cout << outer() << " " << x << std::endl;
    return 0;
}`,
      solution: `15 20`,
      hints: [
        'outer captures x by reference. It increments x to 10.',
        'inner captures x by value at the point inner is created (x=10).',
        'Then outer increments x to 20. inner returns 10+5=15.',
      ],
      concepts: ['nested lambda', 'capture timing', 'value vs reference'],
    },
    {
      id: 'cpp-lambda-18',
      title: 'Refactor to Lambda',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor this functor struct into an equivalent lambda expression.',
      skeleton: `#include <algorithm>
#include <vector>

struct IsEven {
    bool operator()(int n) const {
        return n % 2 == 0;
    }
};

int countEvens(const std::vector<int>& v) {
    return std::count_if(v.begin(), v.end(), IsEven{});
}`,
      solution: `#include <algorithm>
#include <vector>

int countEvens(const std::vector<int>& v) {
    return std::count_if(v.begin(), v.end(), [](int n) { return n % 2 == 0; });
}`,
      hints: [
        'The functor IsEven has no state, so the lambda needs no captures.',
        'Replace the functor with an inline lambda in the std::count_if call.',
        'The lambda takes an int and returns a bool.',
      ],
      concepts: ['refactor', 'functor to lambda', 'std::count_if'],
    },
    {
      id: 'cpp-lambda-19',
      title: 'Fix Recursive Lambda',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Fix this recursive lambda that fails to compile because auto cannot be used for self-reference.',
      skeleton: `#include <functional>
#include <iostream>

int main() {
    auto fib = [](int n) -> int {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    };
    std::cout << fib(10) << std::endl;
    return 0;
}`,
      solution: `#include <functional>
#include <iostream>

int main() {
    std::function<int(int)> fib = [&fib](int n) -> int {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    };
    std::cout << fib(10) << std::endl;
    return 0;
}`,
      hints: [
        'A lambda cannot reference itself through an auto variable because the type is not yet known.',
        'Use std::function<int(int)> instead of auto to give the variable a known type.',
        'Capture fib by reference so the lambda can call itself.',
      ],
      concepts: ['recursive lambda', 'std::function', 'self-reference'],
    },
    {
      id: 'cpp-lambda-20',
      title: 'Refactor Callback Chain',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'cpp',
      goal: 'Refactor these named helper functions into inline lambdas for the pipeline.',
      skeleton: `#include <vector>
#include <algorithm>
#include <numeric>

bool isPositive(int n) { return n > 0; }
int doubleIt(int n) { return n * 2; }

int sumPositiveDoubled(const std::vector<int>& v) {
    std::vector<int> positives;
    std::copy_if(v.begin(), v.end(), std::back_inserter(positives), isPositive);
    std::vector<int> doubled(positives.size());
    std::transform(positives.begin(), positives.end(), doubled.begin(), doubleIt);
    return std::accumulate(doubled.begin(), doubled.end(), 0);
}`,
      solution: `#include <vector>
#include <algorithm>
#include <numeric>

int sumPositiveDoubled(const std::vector<int>& v) {
    std::vector<int> positives;
    std::copy_if(v.begin(), v.end(), std::back_inserter(positives),
        [](int n) { return n > 0; });
    std::vector<int> doubled(positives.size());
    std::transform(positives.begin(), positives.end(), doubled.begin(),
        [](int n) { return n * 2; });
    return std::accumulate(doubled.begin(), doubled.end(), 0);
}`,
      hints: [
        'Replace each named function with an inline lambda in the algorithm call.',
        'isPositive becomes [](int n) { return n > 0; }.',
        'doubleIt becomes [](int n) { return n * 2; }.',
      ],
      concepts: ['refactor', 'inline lambda', 'STL algorithms'],
    },
  ]
};
