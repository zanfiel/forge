import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-modules',
  title: '24. Modules & Packages',
  explanation: `## Modules & Packages

### Modules
A module is any \\\`.py\\\` file. Import it with \\\`import module_name\\\`.

\\\`\\\`\\\`python
import math
from os.path import join
from collections import defaultdict, Counter
import json as j
\\\`\\\`\\\`

### Import Forms
- \\\`import X\\\` -- full module, access via \\\`X.name\\\`
- \\\`from X import Y\\\` -- import specific names
- \\\`from X import *\\\` -- import all public names (avoid in production)
- \\\`import X as alias\\\` -- rename on import

### Packages
A package is a directory with an \\\`__init__.py\\\` file:
\\\`\\\`\\\`
mypackage/
    __init__.py
    module_a.py
    sub/
        __init__.py
        module_b.py
\\\`\\\`\\\`

### \\\`__init__.py\\\`
Runs when the package is imported. Use it to expose a public API.

### \\\`sys.path\\\`
Python searches for modules in directories listed in \\\`sys.path\\\`.

### \\\`__name__\\\` and \\\`__main__\\\`
- \\\`__name__ == "__main__"\\\` when the file is run directly.
- \\\`__name__ == "module_name"\\\` when imported.

### Relative Imports
\\\`from . import sibling\\\` or \\\`from ..parent import something\\\`.
`,
  exercises: [
    {
      id: 'py-modules-1',
      title: 'Import a Module',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Import the math module and use pi.',
      skeleton: `__BLANK__ math

print(math.pi)  # 3.141592653589793`,
      solution: `import math

print(math.pi)  # 3.141592653589793`,
      hints: [
        'Use the import keyword to bring in a module.',
        'Access members with module.name.',
        'The answer is: import',
      ],
      concepts: ['import'],
    },
    {
      id: 'py-modules-2',
      title: 'from ... import ...',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Import only the sqrt function from math.',
      skeleton: `__BLANK__ math import sqrt

print(sqrt(16))  # 4.0`,
      solution: `from math import sqrt

print(sqrt(16))  # 4.0`,
      hints: [
        'Use "from module import name" to import specific items.',
        'This lets you use sqrt directly without math prefix.',
        'The answer is: from',
      ],
      concepts: ['from import'],
    },
    {
      id: 'py-modules-3',
      title: 'Import with Alias',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Import json with the alias j.',
      skeleton: `import json __BLANK__ j

data = j.dumps({"key": "value"})
print(data)`,
      solution: `import json as j

data = j.dumps({"key": "value"})
print(data)`,
      hints: [
        'Use "as" to create an alias for a module.',
        'Access members via the alias: j.dumps().',
        'The answer is: as',
      ],
      concepts: ['import as', 'alias'],
    },
    {
      id: 'py-modules-4',
      title: '__name__ Guard',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Add the standard main guard.',
      skeleton: `def main():
    print("Running!")

if __name__ == __BLANK__:
    main()`,
      solution: `def main():
    print("Running!")

if __name__ == "__main__":
    main()`,
      hints: [
        '__name__ is "__main__" when the file is executed directly.',
        'This guard prevents code from running on import.',
        'The answer is: "__main__"',
      ],
      concepts: ['__name__', '__main__'],
    },
    {
      id: 'py-modules-5',
      title: 'Multiple Imports',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Import multiple names from collections.',
      skeleton: `from collections import defaultdict__BLANK__ Counter

d = defaultdict(int)
c = Counter("hello")
print(c.most_common(1))`,
      solution: `from collections import defaultdict, Counter

d = defaultdict(int)
c = Counter("hello")
print(c.most_common(1))`,
      hints: [
        'Separate multiple imports with a comma.',
        'Both names become available in the current scope.',
        'The answer is: ,',
      ],
      concepts: ['multiple imports'],
    },
    {
      id: 'py-modules-6',
      title: 'Check Module Search Path',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Print the module search path.',
      skeleton: `import sys

print(__BLANK__.path)`,
      solution: `import sys

print(sys.path)`,
      hints: [
        'sys.path is a list of directories Python searches for modules.',
        'Access it as an attribute of the sys module.',
        'The answer is: sys',
      ],
      concepts: ['sys.path', 'module search'],
    },
    {
      id: 'py-modules-7',
      title: 'Write a Simple Module',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Write a module-level function greet(name) and a constant VERSION. Include a __main__ guard that calls greet("World").',
      skeleton: `# mymodule.py
VERSION = "1.0"

def greet(name):
    pass

# main guard
`,
      solution: `# mymodule.py
VERSION = "1.0"

def greet(name):
    return f"Hello, {name}! (v{VERSION})"

if __name__ == "__main__":
    print(greet("World"))`,
      hints: [
        'Define VERSION as a module-level constant.',
        'greet() returns a formatted string.',
        'The main guard checks __name__ == "__main__".',
      ],
      concepts: ['module', 'constant', '__main__'],
    },
    {
      id: 'py-modules-8',
      title: 'Write __init__.py Exports',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write an __init__.py that imports and exposes key names from submodules using __all__.',
      skeleton: `# mypackage/__init__.py
# Expose: connect from .db, Config from .config, version from .meta

__all__ = []`,
      solution: `# mypackage/__init__.py
from .db import connect
from .config import Config
from .meta import version

__all__ = ["connect", "Config", "version"]`,
      hints: [
        'Use relative imports with from . to import from submodules.',
        '__all__ controls what "from package import *" exports.',
        'List all public names in __all__.',
      ],
      concepts: ['__init__.py', '__all__', 'relative imports'],
    },
    {
      id: 'py-modules-9',
      title: 'Write a Plugin Loader',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function load_module(name) that dynamically imports a module by name using importlib.',
      skeleton: `import importlib

def load_module(name):
    # Dynamically import and return the module
    pass`,
      solution: `import importlib

def load_module(name):
    return importlib.import_module(name)`,
      hints: [
        'importlib.import_module(name) imports a module by string name.',
        'It returns the module object.',
        'Equivalent to "import name" but dynamic.',
      ],
      concepts: ['importlib', 'dynamic import'],
    },
    {
      id: 'py-modules-10',
      title: 'Predict: Import Side Effects',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `# Simulating module import behavior
# When a module is imported, its top-level code runs once

import_count = 0

def simulate_import():
    global import_count
    import_count += 1
    print(f"Import #{import_count}")

simulate_import()
simulate_import()
print(f"Total: {import_count}")`,
      solution: `Import #1
Import #2
Total: 2`,
      hints: [
        'Each call to simulate_import increments and prints.',
        'Real Python modules only run top-level code once (cached in sys.modules).',
        'But this simulation calls the function twice.',
      ],
      concepts: ['import side effects', 'sys.modules'],
    },
    {
      id: 'py-modules-11',
      title: 'Predict: Circular Import',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What problem does this code illustrate?',
      skeleton: `# module_a.py:
# from module_b import func_b
# def func_a(): return func_b()

# module_b.py:
# from module_a import func_a
# def func_b(): return func_a()

# What happens?
print("ImportError or AttributeError due to circular import")`,
      solution: `ImportError or AttributeError due to circular import`,
      hints: [
        'module_a imports from module_b, which imports from module_a.',
        'The second module is not fully loaded yet.',
        'This causes ImportError or AttributeError.',
      ],
      concepts: ['circular import', 'import order'],
    },
    {
      id: 'py-modules-12',
      title: 'Write Lazy Import Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a lazy_import(module_name) function that returns a proxy that only imports the module when an attribute is first accessed.',
      skeleton: `class LazyModule:
    # Delays import until first attribute access
    pass

def lazy_import(module_name):
    return LazyModule(module_name)`,
      solution: `class LazyModule:
    def __init__(self, module_name):
        self._module_name = module_name
        self._module = None

    def _load(self):
        if self._module is None:
            import importlib
            self._module = importlib.import_module(self._module_name)

    def __getattr__(self, name):
        if name.startswith("_"):
            raise AttributeError(name)
        self._load()
        return getattr(self._module, name)

def lazy_import(module_name):
    return LazyModule(module_name)`,
      hints: [
        'Store the module name and delay importing.',
        '__getattr__ triggers the actual import on first access.',
        'Cache the loaded module to avoid re-importing.',
      ],
      concepts: ['lazy import', '__getattr__', 'proxy pattern'],
    },
    {
      id: 'py-modules-13',
      title: 'Fix: Relative Import Error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the import error in the package structure.',
      skeleton: `# File: mypackage/utils.py
def helper():
    return "help"

# File: mypackage/main.py
# This fails when run as: python -m mypackage.main
from utils import helper  # ImportError!

print(helper())`,
      solution: `# File: mypackage/utils.py
def helper():
    return "help"

# File: mypackage/main.py
from .utils import helper  # relative import

print(helper())`,
      hints: [
        'Inside a package, use relative imports.',
        'from .utils means "from the current package".',
        'Absolute imports fail when the package is not in sys.path.',
      ],
      concepts: ['relative import', 'package structure'],
    },
    {
      id: 'py-modules-14',
      title: 'Fix: Shadowed Module Name',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the import error caused by a local file shadowing a standard library module.',
      skeleton: `# File: random.py (in current directory!)
# This shadows the built-in random module

import random  # Imports local random.py, not stdlib!
print(random.randint(1, 10))  # AttributeError`,
      solution: `# Rename local file from random.py to my_random.py
# Then the stdlib import works:

import random
print(random.randint(1, 10))`,
      hints: [
        'A local file named random.py shadows the standard library module.',
        'Rename the local file to something else.',
        'Python checks the current directory before the standard library.',
      ],
      concepts: ['module shadowing', 'naming conflict'],
    },
    {
      id: 'py-modules-15',
      title: 'Write a Registry with Entry Points',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a plugin registry that discovers and loads plugins by module name from a list.',
      skeleton: `import importlib

class PluginRegistry:
    # register(module_name), load_all(), get(name)
    pass`,
      solution: `import importlib

class PluginRegistry:
    def __init__(self):
        self._modules = {}
        self._pending = []

    def register(self, module_name):
        self._pending.append(module_name)

    def load_all(self):
        for name in self._pending:
            module = importlib.import_module(name)
            plugin_name = getattr(module, "PLUGIN_NAME", name)
            self._modules[plugin_name] = module
        self._pending.clear()

    def get(self, name):
        return self._modules.get(name)

    def list_plugins(self):
        return list(self._modules.keys())`,
      hints: [
        'Store module names as pending, load with importlib.',
        'Use getattr to read PLUGIN_NAME from each module.',
        'get() retrieves a loaded module by name.',
      ],
      concepts: ['plugin registry', 'importlib', 'dynamic loading'],
    },
    {
      id: 'py-modules-16',
      title: 'Predict: __all__ Behavior',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'python',
      goal: 'What does this code print?',
      skeleton: `# Simulating __all__ behavior
__all__ = ["public_func"]

def public_func():
    return "public"

def _private_func():
    return "private"

def other_func():
    return "other"

# "from module import *" would only import names in __all__
exported = [name for name in __all__]
print(exported)
print("other_func" in __all__)`,
      solution: `['public_func']
False`,
      hints: [
        '__all__ explicitly lists what "from module import *" exports.',
        'Only "public_func" is in the list.',
        '"other_func" is not in __all__ even though it exists.',
      ],
      concepts: ['__all__', 'public API'],
    },
    {
      id: 'py-modules-17',
      title: 'Fix: Import in Wrong Scope',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Fix the slow startup by moving the heavy import inside the function.',
      skeleton: `import time

# Simulating heavy module import
def _simulate_heavy_import():
    time.sleep(0.001)  # Simulates slow import
    return {"heavy": True}

heavy_module = _simulate_heavy_import()  # Runs at import time!

def rarely_used_function():
    return heavy_module["heavy"]

# The module takes 1ms to import even if rarely_used_function is never called`,
      solution: `import time

def _simulate_heavy_import():
    time.sleep(0.001)
    return {"heavy": True}

_heavy_module = None

def rarely_used_function():
    global _heavy_module
    if _heavy_module is None:
        _heavy_module = _simulate_heavy_import()
    return _heavy_module["heavy"]

# Now the heavy import only happens when the function is first called`,
      hints: [
        'Lazy-load the heavy module on first use.',
        'Use a module-level cache variable initialized to None.',
        'Only call the heavy import when the function is actually used.',
      ],
      concepts: ['lazy loading', 'startup performance'],
    },
    {
      id: 'py-modules-18',
      title: 'Write Module Reloader',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a reload_module(name) function that forces a re-import of a module, even if cached in sys.modules.',
      skeleton: `import importlib
import sys

def reload_module(name):
    # Force re-import of the module
    pass`,
      solution: `import importlib
import sys

def reload_module(name):
    if name in sys.modules:
        return importlib.reload(sys.modules[name])
    return importlib.import_module(name)`,
      hints: [
        'importlib.reload() re-executes a module.',
        'Check sys.modules first to see if it is loaded.',
        'If not loaded, use import_module instead.',
      ],
      concepts: ['importlib.reload', 'sys.modules'],
    },
    {
      id: 'py-modules-19',
      title: 'Refactor: Star Import to Explicit',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the star import to explicit imports.',
      skeleton: `from os.path import *

# Using: join, exists, dirname, basename
full = join("/home", "user", "file.txt")
print(exists(full))
print(dirname(full))
print(basename(full))`,
      solution: `from os.path import join, exists, dirname, basename

full = join("/home", "user", "file.txt")
print(exists(full))
print(dirname(full))
print(basename(full))`,
      hints: [
        'Star imports make it unclear what names are available.',
        'Import only the specific names you use.',
        'This makes dependencies explicit and avoids naming conflicts.',
      ],
      concepts: ['explicit imports', 'refactoring', 'code clarity'],
    },
    {
      id: 'py-modules-20',
      title: 'Refactor: Break Circular Import',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the circular dependency by moving the import inside the function.',
      skeleton: `# models.py
from validators import validate_name  # circular!

class User:
    def __init__(self, name):
        validate_name(name)
        self.name = name

# validators.py
from models import User  # circular!

def validate_name(name):
    if not isinstance(name, str):
        raise TypeError("Name must be string")`,
      solution: `# models.py
class User:
    def __init__(self, name):
        from validators import validate_name  # import inside function
        validate_name(name)
        self.name = name

# validators.py
def validate_name(name):
    if not isinstance(name, str):
        raise TypeError("Name must be string")`,
      hints: [
        'Move the import inside the function that needs it.',
        'This defers the import until the function is called.',
        'By then, both modules are fully loaded.',
      ],
      concepts: ['circular import', 'deferred import', 'refactoring'],
    },
  ],
};
