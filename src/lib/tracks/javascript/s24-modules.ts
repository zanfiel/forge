import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-modules',
  title: '24. Modules',
  explanation: `## Modules

ES Modules (ESM) provide a standard way to organize JavaScript into reusable, encapsulated files.

### Exporting
\`\`\`js
// Named exports
export const PI = 3.14159;
export function add(a, b) { return a + b; }

// Default export
export default class Calculator { ... }
\`\`\`

### Importing
\`\`\`js
import Calculator from './calc.js';           // default
import { PI, add } from './math.js';          // named
import { add as sum } from './math.js';       // rename
import * as math from './math.js';            // namespace
\`\`\`

### Dynamic Import
\`\`\`js
const module = await import('./heavy.js');
module.default; // default export
module.namedExport; // named export
\`\`\`

### Module Features
- Strict mode by default
- Own scope (no global pollution)
- Evaluated once (singleton)
- Static structure (enables tree-shaking)
- Top-level \`await\` supported

### Re-exporting
\`\`\`js
export { foo } from './a.js';
export { default as Foo } from './b.js';
export * from './c.js';
\`\`\`
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'js-mod-1b',
      title: 'Named export',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Export a function by name.',
      skeleton: `__BLANK__ function greet(name) {
  return 'Hello, ' + name;
}`,
      solution: `export function greet(name) {
  return 'Hello, ' + name;
}`,
      hints: [
        'You need a keyword that makes this function available to importers.',
        'It goes before the function keyword.',
        'The keyword is `export`.',
      ],
      concepts: ['export', 'named export'],
    },
    {
      id: 'js-mod-2b',
      title: 'Named import',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Import a named export.',
      skeleton: `__BLANK__ { greet } from './utils.js';

console.log(greet('World'));`,
      solution: `import { greet } from './utils.js';

console.log(greet('World'));`,
      hints: [
        'You need a keyword that brings in exports from another module.',
        'Named imports use curly braces.',
        'The keyword is `import`.',
      ],
      concepts: ['import', 'named import'],
    },
    {
      id: 'js-mod-3b',
      title: 'Default export',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Export a class as the default export.',
      skeleton: `export __BLANK__ class App {
  constructor() {
    this.name = 'MyApp';
  }
}`,
      solution: `export default class App {
  constructor() {
    this.name = 'MyApp';
  }
}`,
      hints: [
        'Each module can have one primary export.',
        'Importers can give it any name.',
        'The keyword is `default`.',
      ],
      concepts: ['export default', 'class'],
    },
    {
      id: 'js-mod-4i',
      title: 'Import with alias',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Rename an import to avoid naming conflicts.',
      skeleton: `import { createServer __BLANK__ createHttpServer } from 'http';
import { createServer __BLANK__ createHttpsServer } from 'https';`,
      solution: `import { createServer as createHttpServer } from 'http';
import { createServer as createHttpsServer } from 'https';`,
      hints: [
        'You need a keyword to rename an import.',
        'It goes between the original name and the new name.',
        'The keyword is `as`.',
      ],
      concepts: ['import', 'as', 'alias'],
    },
    {
      id: 'js-mod-5i',
      title: 'Namespace import',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Import all named exports as a namespace object.',
      skeleton: `import __BLANK__ as math from './math.js';

console.log(math.PI);
console.log(math.add(1, 2));`,
      solution: `import * as math from './math.js';

console.log(math.PI);
console.log(math.add(1, 2));`,
      hints: [
        'You want all exports as properties of a single object.',
        'Use a wildcard character to import everything.',
        'The syntax is `* as name`.',
      ],
      concepts: ['namespace import', 'import *'],
    },
    {
      id: 'js-mod-6a',
      title: 'Dynamic import',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Load a module dynamically at runtime.',
      skeleton: `async function loadChart() {
  const { Chart } = await __BLANK__('./chart.js');
  return new Chart();
}`,
      solution: `async function loadChart() {
  const { Chart } = await import('./chart.js');
  return new Chart();
}`,
      hints: [
        'Dynamic imports use a function-like syntax.',
        'They return a promise that resolves to the module.',
        'Use `import("./chart.js")`.',
      ],
      concepts: ['dynamic import', 'import()', 'code splitting'],
    },

    // ---- write-function (6) ----
    {
      id: 'js-mod-7b',
      title: 'Module structure',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a module with named and default exports.',
      skeleton: `// Write a module with:
// - Named export: const VERSION = '1.0.0'
// - Named export: function validate(str) returns str.length > 0
// - Default export: class App with constructor setting this.version = VERSION
`,
      solution: `export const VERSION = '1.0.0';

export function validate(str) {
  return str.length > 0;
}

export default class App {
  constructor() {
    this.version = VERSION;
  }
}`,
      hints: [
        'Use export before each named export.',
        'Use export default for the class.',
        'Named exports and default export can coexist.',
      ],
      concepts: ['export', 'export default', 'module structure'],
    },
    {
      id: 'js-mod-8b',
      title: 'Re-export barrel file',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Create an index file that re-exports from sub-modules.',
      skeleton: `// Write an index.js that re-exports:
// - All named exports from './utils.js'
// - { User } from './models/user.js'
// - default export from './app.js' as named export 'App'
`,
      solution: `export * from './utils.js';
export { User } from './models/user.js';
export { default as App } from './app.js';`,
      hints: [
        'export * re-exports all named exports from a module.',
        'You can selectively re-export with { name }.',
        'Re-export a default as named with { default as Name }.',
      ],
      concepts: ['re-export', 'barrel file', 'export *'],
    },
    {
      id: 'js-mod-9i',
      title: 'Lazy module loader',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that lazily loads a module and caches it.',
      skeleton: `// Write function lazyImport(path) that returns an async function.
// First call: dynamically imports the module and caches it.
// Subsequent calls: return the cached module.
`,
      solution: `function lazyImport(path) {
  let cached = null;
  return async function () {
    if (!cached) {
      cached = await import(path);
    }
    return cached;
  };
}`,
      hints: [
        'Use a closure to store the cached module.',
        'Only call import() on the first invocation.',
        'Return the cached module on subsequent calls.',
      ],
      concepts: ['dynamic import', 'caching', 'closure', 'lazy loading'],
    },
    {
      id: 'js-mod-10i',
      title: 'Feature flag module',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Conditionally load different implementations based on a flag.',
      skeleton: `// Write async function loadRenderer(useWebGPU)
// - If useWebGPU is true, dynamically import './webgpu-renderer.js'
// - Otherwise, dynamically import './canvas-renderer.js'
// - Return the default export from whichever module loads
`,
      solution: `async function loadRenderer(useWebGPU) {
  const modulePath = useWebGPU
    ? './webgpu-renderer.js'
    : './canvas-renderer.js';
  const mod = await import(modulePath);
  return mod.default;
}`,
      hints: [
        'Choose the module path based on the flag.',
        'Use dynamic import() with the chosen path.',
        'Return mod.default to get the default export.',
      ],
      concepts: ['dynamic import', 'conditional loading', 'feature flag'],
    },
    {
      id: 'js-mod-11a',
      title: 'Module registry',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Build a simple module registry for dependency injection.',
      skeleton: `// Write class ModuleRegistry with:
// - register(name, factory): stores a factory function (called lazily)
// - get(name): calls the factory on first access, caches and returns the instance
// - has(name): returns true if registered
// Throw Error if getting unregistered module
`,
      solution: `class ModuleRegistry {
  constructor() {
    this.factories = new Map();
    this.instances = new Map();
  }

  register(name, factory) {
    this.factories.set(name, factory);
  }

  get(name) {
    if (this.instances.has(name)) {
      return this.instances.get(name);
    }
    if (!this.factories.has(name)) {
      throw new Error('Module not registered: ' + name);
    }
    const instance = this.factories.get(name)();
    this.instances.set(name, instance);
    return instance;
  }

  has(name) {
    return this.factories.has(name);
  }
}`,
      hints: [
        'Use two Maps: one for factories, one for cached instances.',
        'get() checks instances first, then invokes the factory.',
        'Throw if the module was never registered.',
      ],
      concepts: ['dependency injection', 'factory', 'lazy initialization', 'Map'],
    },
    {
      id: 'js-mod-12a',
      title: 'Import map resolver',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function that resolves import specifiers using an import map.',
      skeleton: `// Write function resolveImport(specifier, importMap) where:
// - importMap is { imports: { 'lodash': '/vendor/lodash.js', '@app/': '/src/' } }
// - Exact match: 'lodash' -> '/vendor/lodash.js'
// - Prefix match: '@app/utils' -> '/src/utils'
// - No match: return specifier unchanged
`,
      solution: `function resolveImport(specifier, importMap) {
  const { imports } = importMap;

  if (imports[specifier]) {
    return imports[specifier];
  }

  for (const [prefix, replacement] of Object.entries(imports)) {
    if (prefix.endsWith('/') && specifier.startsWith(prefix)) {
      return replacement + specifier.slice(prefix.length);
    }
  }

  return specifier;
}`,
      hints: [
        'Check for exact matches first.',
        'Then check prefix matches (keys ending with "/").',
        'Replace the prefix portion with the mapped value.',
      ],
      concepts: ['import map', 'URL resolution', 'string manipulation'],
    },

    // ---- fix-bug (3) ----
    {
      id: 'js-mod-13b',
      title: 'Wrong import syntax',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fix the import that confuses default and named imports.',
      skeleton: `// math.js exports: export function add(a, b) { return a + b; }
// There is NO default export.

import add from './math.js';

console.log(add(1, 2));`,
      solution: `import { add } from './math.js';

console.log(add(1, 2));`,
      hints: [
        'Without curly braces, import expects a default export.',
        'add is a named export, not a default export.',
        'Use curly braces: import { add }.',
      ],
      concepts: ['named import', 'default import', 'SyntaxError'],
    },
    {
      id: 'js-mod-14i',
      title: 'Circular dependency',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fix a circular dependency that causes undefined imports.',
      skeleton: `// a.js
import { b } from './b.js';
export const a = 'A_' + b;

// b.js
import { a } from './a.js';
export const b = 'B_' + a;

// main.js
import { a } from './a.js';
console.log(a); // 'A_B_undefined' -- Bug!`,
      solution: `// a.js
export function getA() {
  const { getB } = require('./b.js');
  return 'A_' + getB();
}
export const a = 'A';

// b.js
export function getB() {
  return 'B';
}
export const b = 'B';

// main.js -- or break the cycle with lazy access
// a.js
export const a = 'A';

// b.js
export const b = 'B';

// combine.js
import { a } from './a.js';
import { b } from './b.js';
export const combined = a + '_' + b;`,
      hints: [
        'Circular dependencies cause one module to see undefined exports.',
        'The module that loads second gets incomplete bindings.',
        'Break the cycle: remove the circular dependency or use lazy access.',
      ],
      concepts: ['circular dependency', 'module evaluation order'],
    },
    {
      id: 'js-mod-15a',
      title: 'Side effect import forgotten',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Fix the polyfill that is tree-shaken away.',
      skeleton: `// polyfill.js
if (!Array.prototype.at) {
  Array.prototype.at = function (index) {
    return this[index < 0 ? this.length + index : index];
  };
}

// app.js
import { something } from './utils.js';
// Bug: polyfill.js is never imported, so .at() might not exist

console.log([1, 2, 3].at(-1));`,
      solution: `// polyfill.js
if (!Array.prototype.at) {
  Array.prototype.at = function (index) {
    return this[index < 0 ? this.length + index : index];
  };
}

// app.js
import './polyfill.js';
import { something } from './utils.js';

console.log([1, 2, 3].at(-1));`,
      hints: [
        'Polyfills work through side effects, not exports.',
        'You need to import the module for its side effects.',
        'Use a bare import: import "./polyfill.js".',
      ],
      concepts: ['side effect import', 'polyfill', 'tree-shaking'],
    },

    // ---- predict-output (3) ----
    {
      id: 'js-mod-16b',
      title: 'Module evaluation',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict when module-level code runs.',
      skeleton: `// counter.js
console.log('module loaded');
let count = 0;
export function increment() { return ++count; }

// main.js
import { increment } from './counter.js';
console.log(increment());
console.log(increment());`,
      solution: `// counter.js
console.log('module loaded');
let count = 0;
export function increment() { return ++count; }

// main.js
import { increment } from './counter.js';
console.log(increment());
console.log(increment());`,
      expectedOutput: `module loaded
1
2`,
      hints: [
        'Module-level code runs once when first imported.',
        'The count variable persists between calls (singleton).',
        'increment() mutates the module-level count.',
      ],
      concepts: ['module evaluation', 'singleton', 'module scope'],
    },
    {
      id: 'js-mod-17i',
      title: 'Live bindings',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the behaviour of live bindings in ES modules.',
      skeleton: `// lib.js
export let value = 1;
export function update() { value = 2; }

// main.js
import { value, update } from './lib.js';
console.log(value);
update();
console.log(value);`,
      solution: `// lib.js
export let value = 1;
export function update() { value = 2; }

// main.js
import { value, update } from './lib.js';
console.log(value);
update();
console.log(value);`,
      expectedOutput: `1
2`,
      hints: [
        'ES module imports are live bindings, not copies.',
        'When the source module updates the variable, importers see the change.',
        'This is different from CommonJS require which copies.',
      ],
      concepts: ['live binding', 'import', 'module'],
    },
    {
      id: 'js-mod-18a',
      title: 'Import is hoisted',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Predict the order of execution with import hoisting.',
      skeleton: `// a.js
console.log('a');
export const a = 1;

// b.js
console.log('b');
export const b = 2;

// main.js
console.log('main start');
import { a } from './a.js';
import { b } from './b.js';
console.log('main end');`,
      solution: `// a.js
console.log('a');
export const a = 1;

// b.js
console.log('b');
export const b = 2;

// main.js
console.log('main start');
import { a } from './a.js';
import { b } from './b.js';
console.log('main end');`,
      expectedOutput: `a
b
main start
main end`,
      hints: [
        'import declarations are hoisted to the top of the module.',
        'Imported modules execute before the importing module body.',
        'Dependencies load first, in order.',
      ],
      concepts: ['import hoisting', 'module evaluation order'],
    },

    // ---- refactor (2) ----
    {
      id: 'js-mod-19i',
      title: 'IIFE to module',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Convert an IIFE-based module pattern to ES modules.',
      skeleton: `// Old pattern: IIFE module
var MathUtils = (function () {
  var PI = 3.14159;

  function circleArea(r) {
    return PI * r * r;
  }

  function circleCircumference(r) {
    return 2 * PI * r;
  }

  return {
    PI: PI,
    circleArea: circleArea,
    circleCircumference: circleCircumference,
  };
})();`,
      solution: `export const PI = 3.14159;

export function circleArea(r) {
  return PI * r * r;
}

export function circleCircumference(r) {
  return 2 * PI * r;
}`,
      hints: [
        'Modules already have their own scope; no IIFE needed.',
        'Convert the returned properties to named exports.',
        'Remove the IIFE wrapper entirely.',
      ],
      concepts: ['IIFE', 'module', 'export', 'refactor'],
    },
    {
      id: 'js-mod-20a',
      title: 'CommonJS to ESM',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Convert CommonJS require/module.exports to ES module syntax.',
      skeleton: `const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');

const DEFAULT_ENCODING = 'utf8';

function readConfig(filePath) {
  const fullPath = path.resolve(filePath);
  return JSON.parse(fs.readFileSync(fullPath, DEFAULT_ENCODING));
}

class ConfigWatcher extends EventEmitter {
  constructor(filePath) {
    super();
    this.filePath = filePath;
  }

  watch() {
    fs.watchFile(this.filePath, () => {
      this.emit('change', readConfig(this.filePath));
    });
  }
}

module.exports = { readConfig, ConfigWatcher, DEFAULT_ENCODING };`,
      solution: `import fs from 'fs';
import path from 'path';
import { EventEmitter } from 'events';

export const DEFAULT_ENCODING = 'utf8';

export function readConfig(filePath) {
  const fullPath = path.resolve(filePath);
  return JSON.parse(fs.readFileSync(fullPath, DEFAULT_ENCODING));
}

export class ConfigWatcher extends EventEmitter {
  constructor(filePath) {
    super();
    this.filePath = filePath;
  }

  watch() {
    fs.watchFile(this.filePath, () => {
      this.emit('change', readConfig(this.filePath));
    });
  }
}`,
      hints: [
        'Replace require() with import statements.',
        'Replace module.exports with individual export keywords.',
        'Destructured requires become named imports.',
      ],
      concepts: ['CommonJS', 'ESM', 'require', 'import', 'export'],
    },
  ],
};
