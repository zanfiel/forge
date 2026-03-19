import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-strategy',
  title: '48. Strategy Pattern',
  explanation: `## Strategy Pattern

The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. The algorithm can vary independently from the clients that use it.

### Class-Based Strategy
\`\`\`python
from abc import ABC, abstractmethod

class SortStrategy(ABC):
    @abstractmethod
    def sort(self, data: list) -> list:
        pass

class BubbleSort(SortStrategy):
    def sort(self, data: list) -> list:
        arr = list(data)
        for i in range(len(arr)):
            for j in range(len(arr) - 1 - i):
                if arr[j] > arr[j + 1]:
                    arr[j], arr[j + 1] = arr[j + 1], arr[j]
        return arr

class QuickSort(SortStrategy):
    def sort(self, data: list) -> list:
        if len(data) <= 1:
            return data
        pivot = data[len(data) // 2]
        left = [x for x in data if x < pivot]
        mid = [x for x in data if x == pivot]
        right = [x for x in data if x > pivot]
        return self.sort(left) + mid + self.sort(right)
\`\`\`

### Context Class
\`\`\`python
class Sorter:
    def __init__(self, strategy: SortStrategy):
        self._strategy = strategy

    def set_strategy(self, strategy: SortStrategy):
        self._strategy = strategy

    def sort(self, data: list) -> list:
        return self._strategy.sort(data)
\`\`\`

### Function-Based Strategy
Python's first-class functions make strategies simple -- just pass a callable.
\`\`\`python
def sort_ascending(data):
    return sorted(data)

def sort_descending(data):
    return sorted(data, reverse=True)

def process(data, strategy):
    return strategy(data)

result = process([3, 1, 2], sort_ascending)  # [1, 2, 3]
\`\`\`

### Lambda Strategies
\`\`\`python
strategies = {
    "upper": lambda s: s.upper(),
    "lower": lambda s: s.lower(),
    "title": lambda s: s.title(),
}

def transform(text, name):
    return strategies[name](text)
\`\`\`

### When to Use
- You need different variants of an algorithm
- You want to avoid conditional statements for selecting behavior
- You want to swap algorithms at runtime
- Different clients need different behaviors from the same interface
`,
  exercises: [
    {
      id: 'py-strategy-1',
      title: 'Basic strategy interface',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Define an abstract strategy with an abstract method.',
      skeleton: `from abc import ABC, __BLANK__

class Compressor(__BLANK__):
    @abstractmethod
    def __BLANK__(self, data: bytes) -> bytes:
        pass`,
      solution: `from abc import ABC, abstractmethod

class Compressor(ABC):
    @abstractmethod
    def compress(self, data: bytes) -> bytes:
        pass`,
      hints: [
        'Import abstractmethod from the abc module.',
        'The class should inherit from ABC to be abstract.',
        'The method name should describe what a compressor does -- compress.',
      ],
      concepts: ['ABC', 'abstractmethod', 'strategy interface'],
    },
    {
      id: 'py-strategy-2',
      title: 'Concrete strategies',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Implement two concrete strategies.',
      skeleton: `class UpperStrategy:
    def execute(self, text):
        return text.__BLANK__()

class LowerStrategy:
    def execute(self, text):
        return text.__BLANK__()

s = UpperStrategy()
print(s.execute("hello"))  # HELLO`,
      solution: `class UpperStrategy:
    def execute(self, text):
        return text.upper()

class LowerStrategy:
    def execute(self, text):
        return text.lower()

s = UpperStrategy()
print(s.execute("hello"))  # HELLO`,
      hints: [
        'UpperStrategy should convert text to uppercase.',
        'Use the .upper() string method.',
        'LowerStrategy uses .lower() similarly.',
      ],
      concepts: ['concrete strategy', 'string methods', 'polymorphism'],
    },
    {
      id: 'py-strategy-3',
      title: 'Context class',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Create a context that delegates to a strategy.',
      skeleton: `class TextFormatter:
    def __init__(self, strategy):
        self.__BLANK__ = strategy

    def format(self, text):
        return self._strategy.__BLANK__(text)

class ShoutStrategy:
    def execute(self, text):
        return text.upper() + "!"

fmt = TextFormatter(__BLANK__())
print(fmt.format("hello"))  # HELLO!`,
      solution: `class TextFormatter:
    def __init__(self, strategy):
        self._strategy = strategy

    def format(self, text):
        return self._strategy.execute(text)

class ShoutStrategy:
    def execute(self, text):
        return text.upper() + "!"

fmt = TextFormatter(ShoutStrategy())
print(fmt.format("hello"))  # HELLO!`,
      hints: [
        'Store the strategy in a private attribute _strategy.',
        'Delegate by calling the strategy execute method.',
        'Pass an instance of ShoutStrategy to the constructor.',
      ],
      concepts: ['context class', 'delegation', 'strategy pattern'],
    },
    {
      id: 'py-strategy-4',
      title: 'Swapping strategies',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Swap the strategy at runtime.',
      skeleton: `class Sorter:
    def __init__(self, strategy):
        self._strategy = strategy

    def set_strategy(self, __BLANK__):
        self.__BLANK__ = strategy

    def sort(self, data):
        return self._strategy(data)

sorter = Sorter(sorted)
print(sorter.sort([3, 1, 2]))

sorter.__BLANK__(lambda x: sorted(x, reverse=True))
print(sorter.sort([3, 1, 2]))`,
      solution: `class Sorter:
    def __init__(self, strategy):
        self._strategy = strategy

    def set_strategy(self, strategy):
        self._strategy = strategy

    def sort(self, data):
        return self._strategy(data)

sorter = Sorter(sorted)
print(sorter.sort([3, 1, 2]))

sorter.set_strategy(lambda x: sorted(x, reverse=True))
print(sorter.sort([3, 1, 2]))`,
      hints: [
        'set_strategy takes a strategy parameter.',
        'Assign the new strategy to self._strategy.',
        'Call set_strategy to swap algorithms at runtime.',
      ],
      concepts: ['runtime swap', 'strategy pattern', 'callable'],
    },
    {
      id: 'py-strategy-5',
      title: 'Function as strategy',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Use plain functions as strategies.',
      skeleton: `def add_tax(price):
    return price * __BLANK__

def add_discount(price):
    return price * 0.9

def calculate(price, __BLANK__):
    return strategy(price)

print(calculate(100, __BLANK__))    # 110.0
print(calculate(100, add_discount))  # 90.0`,
      solution: `def add_tax(price):
    return price * 1.1

def add_discount(price):
    return price * 0.9

def calculate(price, strategy):
    return strategy(price)

print(calculate(100, add_tax))       # 110.0
print(calculate(100, add_discount))  # 90.0`,
      hints: [
        'Tax of 10% means multiplying by 1.1.',
        'The second parameter is named strategy -- a callable.',
        'Pass the function name (add_tax) without parentheses.',
      ],
      concepts: ['function strategy', 'first-class functions', 'callable'],
    },
    {
      id: 'py-strategy-6',
      title: 'Lambda strategies in a dict',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Store lambda strategies in a dictionary.',
      skeleton: `strategies = {
    "double": __BLANK__ x: x * 2,
    "square": lambda x: x __BLANK__ 2,
    "negate": lambda x: __BLANK__,
}

def apply(value, name):
    return strategies[__BLANK__](value)

print(apply(5, "double"))  # 10
print(apply(5, "square"))  # 25
print(apply(5, "negate"))  # -5`,
      solution: `strategies = {
    "double": lambda x: x * 2,
    "square": lambda x: x ** 2,
    "negate": lambda x: -x,
}

def apply(value, name):
    return strategies[name](value)

print(apply(5, "double"))  # 10
print(apply(5, "square"))  # 25
print(apply(5, "negate"))  # -5`,
      hints: [
        'Use the lambda keyword to define inline functions.',
        'Squaring uses the ** (power) operator.',
        'Negation is simply -x.',
      ],
      concepts: ['lambda', 'dict dispatch', 'strategy map'],
    },
    {
      id: 'py-strategy-7',
      title: 'Predict strategy output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Predict the output when strategies are swapped.',
      skeleton: `class Greeter:
    def __init__(self, strategy):
        self._strategy = strategy

    def greet(self, name):
        return self._strategy(name)

formal = lambda name: f"Good day, {name}."
casual = lambda name: f"Hey {name}!"

g = Greeter(formal)
print(g.greet("Alice"))
g._strategy = casual
print(g.greet("Bob"))`,
      solution: `Good day, Alice.
Hey Bob!`,
      hints: [
        'First call uses the formal strategy.',
        'formal("Alice") produces "Good day, Alice."',
        'After swapping, casual("Bob") produces "Hey Bob!"',
      ],
      concepts: ['strategy swap', 'lambda', 'predict output'],
    },
    {
      id: 'py-strategy-8',
      title: 'Write strategy selector',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function that selects and applies a strategy by name.',
      skeleton: `# Write a function 'transform' that:
# 1. Takes a string 'text' and a string 'mode'
# 2. Modes: "upper" -> uppercase, "lower" -> lowercase,
#    "title" -> title case, "reverse" -> reversed string
# 3. Raises ValueError for unknown modes
# 4. Returns the transformed text

def transform(text, mode):
    pass`,
      solution: `def transform(text, mode):
    strategies = {
        "upper": str.upper,
        "lower": str.lower,
        "title": str.title,
        "reverse": lambda s: s[::-1],
    }
    if mode not in strategies:
        raise ValueError(f"Unknown mode: {mode}")
    return strategies[mode](text)`,
      hints: [
        'Create a dict mapping mode names to callables.',
        'str.upper, str.lower, str.title are unbound methods that take a string.',
        'Check if mode is in the dict before calling; raise ValueError if not.',
      ],
      concepts: ['strategy selection', 'dict dispatch', 'ValueError'],
    },
    {
      id: 'py-strategy-9',
      title: 'Strategy with state',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Create a stateful strategy that tracks how many times it has been called.',
      skeleton: `# Write a class 'CountingStrategy' that:
# 1. Wraps another strategy (callable) passed to __init__
# 2. Has an execute(value) method that calls the wrapped strategy
# 3. Tracks how many times execute has been called in self.count
# 4. Returns the result from the wrapped strategy

class CountingStrategy:
    pass`,
      solution: `class CountingStrategy:
    def __init__(self, strategy):
        self._strategy = strategy
        self.count = 0

    def execute(self, value):
        self.count += 1
        return self._strategy(value)`,
      hints: [
        'Store the wrapped strategy and initialize count to 0.',
        'In execute, increment count before calling the strategy.',
        'Return the result of self._strategy(value).',
      ],
      concepts: ['stateful strategy', 'decorator pattern', 'call counting'],
    },
    {
      id: 'py-strategy-10',
      title: 'Compose strategies',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function that composes multiple strategies into one.',
      skeleton: `# Write a function 'compose_strategies' that:
# 1. Takes *strategies (variable number of callables)
# 2. Returns a new callable that applies each strategy in order
# 3. The output of each strategy feeds into the next
# Example: compose_strategies(str.strip, str.upper)("  hello  ") -> "HELLO"

def compose_strategies(*strategies):
    pass`,
      solution: `def compose_strategies(*strategies):
    def composed(value):
        result = value
        for strategy in strategies:
            result = strategy(result)
        return result
    return composed`,
      hints: [
        'Return a closure that chains the strategies.',
        'Start with the input value and apply each strategy sequentially.',
        'The result of one strategy becomes the input to the next.',
      ],
      concepts: ['function composition', 'closure', 'pipeline'],
    },
    {
      id: 'py-strategy-11',
      title: 'Parametric strategy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Create a strategy factory that produces configured strategies.',
      skeleton: `# Write a function 'make_multiplier' that:
# 1. Takes a 'factor' parameter
# 2. Returns a strategy (callable) that multiplies its input by factor
# Also write 'make_adder' that returns a strategy adding a fixed amount
# Example: make_multiplier(3)(10) -> 30
# Example: make_adder(5)(10) -> 15

def make_multiplier(factor):
    pass

def make_adder(amount):
    pass`,
      solution: `def make_multiplier(factor):
    def strategy(value):
        return value * factor
    return strategy

def make_adder(amount):
    def strategy(value):
        return value + amount
    return strategy`,
      hints: [
        'Each function returns a closure that captures its parameter.',
        'make_multiplier returns a function that does value * factor.',
        'make_adder returns a function that does value + amount.',
      ],
      concepts: ['closure', 'factory function', 'parametric strategy'],
    },
    {
      id: 'py-strategy-12',
      title: 'Predict composed strategy',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Predict the result of composed strategies.',
      skeleton: `def pipeline(value, *funcs):
    for f in funcs:
        value = f(value)
    return value

double = lambda x: x * 2
add_one = lambda x: x + 1
square = lambda x: x ** 2

print(pipeline(3, double, add_one, square))
print(pipeline(3, square, add_one, double))`,
      solution: `49
20`,
      hints: [
        'First pipeline: 3 -> double -> 6 -> add_one -> 7 -> square -> 49.',
        'Second pipeline: 3 -> square -> 9 -> add_one -> 10 -> double -> 20.',
        'Order matters -- each function feeds into the next.',
      ],
      concepts: ['pipeline', 'function composition', 'order of operations'],
    },
    {
      id: 'py-strategy-13',
      title: 'Validation strategy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Implement a validator that uses pluggable validation strategies.',
      skeleton: `# Write a class 'Validator' that:
# 1. __init__ takes no args, initializes empty list of rules
# 2. add_rule(rule) adds a callable rule (takes value, returns bool)
# 3. validate(value) returns True only if ALL rules pass
# 4. errors(value) returns list of rule.__name__ for rules that fail

class Validator:
    pass`,
      solution: `class Validator:
    def __init__(self):
        self._rules = []

    def add_rule(self, rule):
        self._rules.append(rule)

    def validate(self, value):
        return all(rule(value) for rule in self._rules)

    def errors(self, value):
        return [rule.__name__ for rule in self._rules if not rule(value)]`,
      hints: [
        'Store rules in a list; add_rule appends to it.',
        'validate uses all() to check every rule returns True.',
        'errors uses a list comprehension filtering rules that return False.',
      ],
      concepts: ['validation', 'strategy list', 'all()', 'list comprehension'],
    },
    {
      id: 'py-strategy-14',
      title: 'Fix broken strategy dispatch',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the strategy dispatcher that calls the wrong method.',
      skeleton: `class Processor:
    def __init__(self):
        self._strategies = {}

    def register(self, name, strategy):
        self._strategies[name] = strategy

    def process(self, name, data):
        strategy = self._strategies[name]
        return strategy.process(data)  # Bug: calls process, not execute

class UpperStrategy:
    def execute(self, data):
        return data.upper()

class LowerStrategy:
    def execute(self, data):
        return data.lower()

p = Processor()
p.register("upper", UpperStrategy())
p.register("lower", LowerStrategy())
print(p.process("upper", "hello"))`,
      solution: `class Processor:
    def __init__(self):
        self._strategies = {}

    def register(self, name, strategy):
        self._strategies[name] = strategy

    def process(self, name, data):
        strategy = self._strategies[name]
        return strategy.execute(data)

class UpperStrategy:
    def execute(self, data):
        return data.upper()

class LowerStrategy:
    def execute(self, data):
        return data.lower()

p = Processor()
p.register("upper", UpperStrategy())
p.register("lower", LowerStrategy())
print(p.process("upper", "hello"))`,
      hints: [
        'The strategies have an execute method, not process.',
        'The Processor.process method calls strategy.process -- wrong method name.',
        'Change strategy.process(data) to strategy.execute(data).',
      ],
      concepts: ['method name mismatch', 'debugging', 'strategy dispatch'],
    },
    {
      id: 'py-strategy-15',
      title: 'Fix strategy not being called',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code where the strategy class is passed instead of an instance.',
      skeleton: `class Formatter:
    def __init__(self, strategy):
        self._strategy = strategy

    def format(self, text):
        return self._strategy.run(text)

class MarkdownStrategy:
    def run(self, text):
        return f"**{text}**"

# Bug: passing class, not instance
fmt = Formatter(MarkdownStrategy)
print(fmt.format("hello"))`,
      solution: `class Formatter:
    def __init__(self, strategy):
        self._strategy = strategy

    def format(self, text):
        return self._strategy.run(text)

class MarkdownStrategy:
    def run(self, text):
        return f"**{text}**"

# Fix: pass an instance
fmt = Formatter(MarkdownStrategy())
print(fmt.format("hello"))`,
      hints: [
        'MarkdownStrategy is a class; MarkdownStrategy() is an instance.',
        'The Formatter expects an object with a .run() method.',
        'Add parentheses to create an instance: MarkdownStrategy().',
      ],
      concepts: ['class vs instance', 'instantiation', 'debugging'],
    },
    {
      id: 'py-strategy-16',
      title: 'Pricing strategy',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Implement a pricing system with interchangeable discount strategies.',
      skeleton: `# Write a class 'PricingEngine' that:
# 1. __init__ takes a base_price (float)
# 2. set_discount(strategy) sets the discount strategy (callable)
# 3. get_price() returns base_price if no strategy, or strategy(base_price)
# 
# Also write these discount functions:
# - no_discount(price) -> returns price unchanged
# - percent_off(pct) -> returns a strategy that subtracts pct% from price
# - flat_off(amount) -> returns a strategy that subtracts amount from price

class PricingEngine:
    pass

def no_discount(price):
    pass

def percent_off(pct):
    pass

def flat_off(amount):
    pass`,
      solution: `class PricingEngine:
    def __init__(self, base_price):
        self._base_price = base_price
        self._discount = None

    def set_discount(self, strategy):
        self._discount = strategy

    def get_price(self):
        if self._discount is None:
            return self._base_price
        return self._discount(self._base_price)

def no_discount(price):
    return price

def percent_off(pct):
    def strategy(price):
        return price * (1 - pct / 100)
    return strategy

def flat_off(amount):
    def strategy(price):
        return price - amount
    return strategy`,
      hints: [
        'PricingEngine stores base_price and an optional discount strategy.',
        'percent_off returns a closure: price * (1 - pct / 100).',
        'flat_off returns a closure: price - amount.',
      ],
      concepts: ['pricing strategy', 'closure', 'factory function'],
    },
    {
      id: 'py-strategy-17',
      title: 'Predict strategy with closures',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Predict output when parametric strategies are used.',
      skeleton: `def make_filter(threshold):
    def strategy(values):
        return [v for v in values if v > threshold]
    return strategy

above_5 = make_filter(5)
above_10 = make_filter(10)

data = [2, 7, 11, 3, 15, 8]
print(above_5(data))
print(above_10(data))`,
      solution: `[7, 11, 15, 8]
[11, 15]`,
      hints: [
        'above_5 filters values > 5 from the list.',
        '[2, 7, 11, 3, 15, 8] -> values > 5 are [7, 11, 15, 8].',
        'above_10 filters values > 10 -> [11, 15].',
      ],
      concepts: ['closure', 'parametric strategy', 'list comprehension'],
    },
    {
      id: 'py-strategy-18',
      title: 'Generic typed strategy',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a generic strategy context using typing.',
      skeleton: `# Write a generic class 'Pipeline' that:
# 1. Uses typing: TypeVar T for input, TypeVar R for output
# 2. __init__ takes a list of callables (stages)
# 3. execute(data) chains all stages: output of one feeds into next
# 4. add_stage(stage) appends a new stage
# 5. Type hint execute to return Any (stages may change types)

from typing import TypeVar, Any, Callable

T = TypeVar("T")
R = TypeVar("R")

class Pipeline:
    pass`,
      solution: `from typing import TypeVar, Any, Callable

T = TypeVar("T")
R = TypeVar("R")

class Pipeline:
    def __init__(self, stages: list[Callable] | None = None):
        self._stages: list[Callable] = stages or []

    def add_stage(self, stage: Callable) -> None:
        self._stages.append(stage)

    def execute(self, data: Any) -> Any:
        result = data
        for stage in self._stages:
            result = stage(result)
        return result`,
      hints: [
        'Store stages as a list of callables.',
        'execute iterates through stages, chaining results.',
        'add_stage appends to the internal list.',
      ],
      concepts: ['typing', 'generic', 'pipeline pattern'],
    },
    {
      id: 'py-strategy-19',
      title: 'Refactor conditionals to strategy',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor a function with conditional logic into a strategy pattern.',
      skeleton: `def process_text(text, mode):
    if mode == "clean":
        text = text.strip()
        text = " ".join(text.split())
        return text
    elif mode == "html":
        text = text.replace("&", "&amp;")
        text = text.replace("<", "&lt;")
        text = text.replace(">", "&gt;")
        return text
    elif mode == "slug":
        text = text.lower().strip()
        text = text.replace(" ", "-")
        import re
        text = re.sub(r"[^a-z0-9-]", "", text)
        return text
    elif mode == "initials":
        return "".join(w[0].upper() for w in text.split() if w)
    else:
        raise ValueError(f"Unknown mode: {mode}")`,
      solution: `import re

def _clean(text):
    text = text.strip()
    return " ".join(text.split())

def _html_escape(text):
    text = text.replace("&", "&amp;")
    text = text.replace("<", "&lt;")
    text = text.replace(">", "&gt;")
    return text

def _slugify(text):
    text = text.lower().strip()
    text = text.replace(" ", "-")
    return re.sub(r"[^a-z0-9-]", "", text)

def _initials(text):
    return "".join(w[0].upper() for w in text.split() if w)

_strategies = {
    "clean": _clean,
    "html": _html_escape,
    "slug": _slugify,
    "initials": _initials,
}

def process_text(text, mode):
    if mode not in _strategies:
        raise ValueError(f"Unknown mode: {mode}")
    return _strategies[mode](text)`,
      hints: [
        'Extract each mode branch into its own function.',
        'Map mode names to functions in a dictionary.',
        'process_text becomes a simple lookup and call.',
      ],
      concepts: ['refactoring', 'strategy pattern', 'dict dispatch'],
    },
    {
      id: 'py-strategy-20',
      title: 'Refactor to strategy with registry',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor hardcoded strategies into a decorator-based registry.',
      skeleton: `class DataExporter:
    def export(self, data, fmt):
        if fmt == "csv":
            header = ",".join(data[0].keys())
            rows = [",".join(str(v) for v in row.values()) for row in data]
            return header + "\\n" + "\\n".join(rows)
        elif fmt == "json":
            import json
            return json.dumps(data, indent=2)
        elif fmt == "yaml":
            lines = []
            for item in data:
                lines.append("- " + ", ".join(f"{k}: {v}" for k, v in item.items()))
            return "\\n".join(lines)
        else:
            raise ValueError(f"Unknown format: {fmt}")

# Hard to extend -- adding a new format requires modifying export()`,
      solution: `import json

_exporters = {}

def exporter(fmt):
    def decorator(func):
        _exporters[fmt] = func
        return func
    return decorator

@exporter("csv")
def export_csv(data):
    header = ",".join(data[0].keys())
    rows = [",".join(str(v) for v in row.values()) for row in data]
    return header + "\\n" + "\\n".join(rows)

@exporter("json")
def export_json(data):
    return json.dumps(data, indent=2)

@exporter("yaml")
def export_yaml(data):
    lines = []
    for item in data:
        lines.append("- " + ", ".join(f"{k}: {v}" for k, v in item.items()))
    return "\\n".join(lines)

class DataExporter:
    def export(self, data, fmt):
        if fmt not in _exporters:
            raise ValueError(f"Unknown format: {fmt}")
        return _exporters[fmt](data)`,
      hints: [
        'Create a decorator @exporter(fmt) that registers functions in a dict.',
        'Extract each format branch into a decorated function.',
        'DataExporter.export just looks up and calls the registered function.',
      ],
      concepts: ['decorator registry', 'open-closed principle', 'refactoring'],
    },
  ],
};
