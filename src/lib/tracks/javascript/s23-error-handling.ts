import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-error-handling',
  title: '23. Error Handling',
  explanation: `## Error Handling

### try / catch / finally
\`\`\`js
try {
  riskyOperation();
} catch (err) {
  console.error(err.message);
} finally {
  cleanup(); // always runs
}
\`\`\`

### Error Types
- \`Error\` -- generic base class
- \`TypeError\` -- wrong type operation
- \`ReferenceError\` -- accessing undeclared variable
- \`RangeError\` -- value outside allowed range
- \`SyntaxError\` -- invalid syntax (usually at parse time)
- \`URIError\` -- malformed URI functions
- \`AggregateError\` -- wraps multiple errors

### Error Properties
- \`message\` -- human-readable description
- \`name\` -- error type name
- \`stack\` -- call stack trace (non-standard but universal)
- \`cause\` -- chained error via \`new Error('msg', { cause: originalErr })\`

### Custom Errors
\`\`\`js
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}
\`\`\`

### Throwing
Any value can be thrown, but always prefer Error objects for stack traces.

### Error Boundaries
In async code: use try/catch with await, or .catch() on promises.
`,
  exercises: [
    // ---- fill-blank (6) ----
    {
      id: 'js-err-1b',
      title: 'Basic try/catch',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Add the keywords for error handling.',
      skeleton: `__BLANK__ {
  JSON.parse('invalid json');
} __BLANK__ (err) {
  console.log(err.name); // 'SyntaxError'
}`,
      solution: `try {
  JSON.parse('invalid json');
} catch (err) {
  console.log(err.name); // 'SyntaxError'
}`,
      hints: [
        'The first block attempts risky code.',
        'The second block handles the error.',
        'The keywords are `try` and `catch`.',
      ],
      concepts: ['try', 'catch', 'SyntaxError'],
    },
    {
      id: 'js-err-2b',
      title: 'Throw an error',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Throw a new Error with a message.',
      skeleton: `function divide(a, b) {
  if (b === 0) {
    __BLANK__ new Error('Division by zero');
  }
  return a / b;
}`,
      solution: `function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}`,
      hints: [
        'You need a keyword that raises an exception.',
        'It stops normal execution and transfers to the nearest catch.',
        'The keyword is `throw`.',
      ],
      concepts: ['throw', 'Error'],
    },
    {
      id: 'js-err-3b',
      title: 'Finally block',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Add a cleanup block that always runs.',
      skeleton: `let connection;
try {
  connection = openDb();
  connection.query('SELECT 1');
} catch (err) {
  console.error(err);
} __BLANK__ {
  if (connection) connection.close();
}`,
      solution: `let connection;
try {
  connection = openDb();
  connection.query('SELECT 1');
} catch (err) {
  console.error(err);
} finally {
  if (connection) connection.close();
}`,
      hints: [
        'This block runs whether try succeeds or catch handles an error.',
        'It is perfect for cleanup like closing connections.',
        'The keyword is `finally`.',
      ],
      concepts: ['finally', 'cleanup', 'resource management'],
    },
    {
      id: 'js-err-4i',
      title: 'Check error type',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Check if the caught error is a specific type.',
      skeleton: `try {
  someOperation();
} catch (err) {
  if (err __BLANK__ TypeError) {
    console.log('Type error occurred');
  } else {
    throw err; // re-throw unknown errors
  }
}`,
      solution: `try {
  someOperation();
} catch (err) {
  if (err instanceof TypeError) {
    console.log('Type error occurred');
  } else {
    throw err; // re-throw unknown errors
  }
}`,
      hints: [
        'You need to check if the error is a specific class.',
        'This operator checks the prototype chain.',
        'Use `instanceof`.',
      ],
      concepts: ['instanceof', 'TypeError', 'error handling'],
    },
    {
      id: 'js-err-5i',
      title: 'Error cause',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Chain errors using the cause option.',
      skeleton: `async function loadConfig() {
  try {
    const res = await fetch('/config');
    return await res.json();
  } catch (err) {
    throw new Error('Config load failed', { __BLANK__: err });
  }
}`,
      solution: `async function loadConfig() {
  try {
    const res = await fetch('/config');
    return await res.json();
  } catch (err) {
    throw new Error('Config load failed', { cause: err });
  }
}`,
      hints: [
        'ES2022 added the ability to chain errors.',
        'The second argument to Error is an options object.',
        'The key is `cause`.',
      ],
      concepts: ['Error', 'cause', 'error chaining'],
    },
    {
      id: 'js-err-6a',
      title: 'Optional catch binding',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Use optional catch binding when the error object is not needed.',
      skeleton: `let parsed;
try {
  parsed = JSON.parse(input);
} __BLANK__ {
  parsed = defaultValue;
}`,
      solution: `let parsed;
try {
  parsed = JSON.parse(input);
} catch {
  parsed = defaultValue;
}`,
      hints: [
        'Since ES2019, the error parameter is optional.',
        'You can omit the parentheses and parameter.',
        'Just use `catch` without `(err)`.',
      ],
      concepts: ['optional catch binding', 'ES2019'],
    },

    // ---- write-function (6) ----
    {
      id: 'js-err-7b',
      title: 'Custom error class',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Create a custom error class for HTTP errors.',
      skeleton: `// Write class HttpError extends Error with:
// - constructor(status, message): sets this.status and this.name = 'HttpError'
// - Call super(message)
`,
      solution: `class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}`,
      hints: [
        'Extend the built-in Error class.',
        'Call super(message) in the constructor.',
        'Set this.name to identify the error type.',
      ],
      concepts: ['custom error', 'extends', 'Error'],
    },
    {
      id: 'js-err-8b',
      title: 'Safe JSON parse',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a function that safely parses JSON, returning a default on error.',
      skeleton: `// Write function safeJsonParse(str, fallback) that:
// - Tries to parse str as JSON
// - Returns the parsed value on success
// - Returns fallback on any error
`,
      solution: `function safeJsonParse(str, fallback) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}`,
      hints: [
        'Wrap JSON.parse in a try/catch.',
        'On success, return the parsed result.',
        'On error, return the fallback value.',
      ],
      concepts: ['try/catch', 'JSON.parse', 'safe operation'],
    },
    {
      id: 'js-err-9i',
      title: 'Error with context info',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Create a validation error class with field information.',
      skeleton: `// Write class ValidationError extends Error with:
// - constructor(errors): errors is array of { field, message }
// - this.name = 'ValidationError'
// - this.errors = errors
// - message should be a summary like "Validation failed: field1, field2"
`,
      solution: `class ValidationError extends Error {
  constructor(errors) {
    const fields = errors.map((e) => e.field).join(', ');
    super('Validation failed: ' + fields);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}`,
      hints: [
        'Extract field names from the errors array for the message.',
        'Pass the summary message to super().',
        'Store the full errors array for detailed access.',
      ],
      concepts: ['custom error', 'validation', 'extends'],
    },
    {
      id: 'js-err-10i',
      title: 'Re-throw with context',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a wrapper that adds context to errors.',
      skeleton: `// Write function withContext(fn, context) that:
// - Calls fn()
// - If fn throws, wraps the error: new Error(context, { cause: originalError })
// - If fn succeeds, returns the result
`,
      solution: `function withContext(fn, context) {
  try {
    return fn();
  } catch (err) {
    throw new Error(context, { cause: err });
  }
}`,
      hints: [
        'Call fn() inside a try block.',
        'In catch, create a new Error with the context message.',
        'Use the cause option to chain the original error.',
      ],
      concepts: ['error wrapping', 'cause', 'context'],
    },
    {
      id: 'js-err-11a',
      title: 'Error handler registry',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Build an error handler that dispatches based on error type.',
      skeleton: `// Write class ErrorHandler with:
// - register(ErrorClass, handlerFn): register a handler for an error type
// - handle(error): find the most specific registered handler and call it
//   Walk up the prototype chain: check error's class, then parent, etc.
//   If no handler found, throw the error.
`,
      solution: `class ErrorHandler {
  constructor() {
    this.handlers = new Map();
  }

  register(ErrorClass, handlerFn) {
    this.handlers.set(ErrorClass, handlerFn);
  }

  handle(error) {
    let proto = error.constructor;
    while (proto) {
      if (this.handlers.has(proto)) {
        return this.handlers.get(proto)(error);
      }
      proto = Object.getPrototypeOf(proto);
    }
    throw error;
  }
}`,
      hints: [
        'Store handlers in a Map keyed by error class.',
        'Walk up the constructor chain using Object.getPrototypeOf.',
        'If no matching handler is found, re-throw.',
      ],
      concepts: ['error handling', 'Map', 'prototype chain', 'dispatch'],
    },
    {
      id: 'js-err-12a',
      title: 'Async error boundary',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a higher-order function that catches and transforms async errors.',
      skeleton: `// Write function asyncBoundary(fn, errorTransform) that returns an async function.
// When called, it runs fn(...args).
// If fn throws/rejects, call errorTransform(error) and return its result.
// errorTransform may also be async.
`,
      solution: `function asyncBoundary(fn, errorTransform) {
  return async function (...args) {
    try {
      return await fn(...args);
    } catch (err) {
      return await errorTransform(err);
    }
  };
}`,
      hints: [
        'Return an async wrapper function.',
        'Use try/catch around await fn(...args).',
        'In catch, await errorTransform since it may be async.',
      ],
      concepts: ['higher-order function', 'async', 'error boundary'],
    },

    // ---- fix-bug (3) ----
    {
      id: 'js-err-13b',
      title: 'Catching wrong error',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fix the catch that swallows all errors instead of specific ones.',
      skeleton: `function processData(data) {
  try {
    const result = transform(data);
    const saved = save(result);
    return saved;
  } catch (err) {
    console.log('Transform failed');
    return null;
  }
}
// Bug: if save() throws, it is incorrectly logged as "Transform failed"`,
      solution: `function processData(data) {
  let result;
  try {
    result = transform(data);
  } catch (err) {
    console.log('Transform failed');
    return null;
  }
  return save(result);
}`,
      hints: [
        'The try block wraps too many operations.',
        'Only the transform should be caught with that message.',
        'Narrow the try/catch to only cover transform().',
      ],
      concepts: ['try/catch scope', 'specific error handling'],
    },
    {
      id: 'js-err-14i',
      title: 'Thrown string instead of Error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fix code that throws a string instead of an Error object.',
      skeleton: `function validate(value) {
  if (typeof value !== 'string') {
    throw 'Expected string, got ' + typeof value;
  }
  if (value.length === 0) {
    throw 'String cannot be empty';
  }
  return value.trim();
}

try {
  validate(123);
} catch (err) {
  console.log(err.message); // undefined -- no .message on strings!
  console.log(err.stack);   // undefined -- no stack trace!
}`,
      solution: `function validate(value) {
  if (typeof value !== 'string') {
    throw new TypeError('Expected string, got ' + typeof value);
  }
  if (value.length === 0) {
    throw new Error('String cannot be empty');
  }
  return value.trim();
}

try {
  validate(123);
} catch (err) {
  console.log(err.message);
  console.log(err.stack);
}`,
      hints: [
        'Throwing strings gives you no stack trace or error properties.',
        'Always throw Error objects (or subclasses).',
        'Use new TypeError for type mismatches, new Error for general errors.',
      ],
      concepts: ['Error', 'TypeError', 'stack trace', 'best practice'],
    },
    {
      id: 'js-err-15a',
      title: 'Lost error in promise',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Fix the async function that loses the original error information.',
      skeleton: `async function fetchAndProcess(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return process(data);
  } catch (err) {
    // Bug: original error is lost, replaced with generic message
    throw new Error('fetchAndProcess failed');
  }
}`,
      solution: `async function fetchAndProcess(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return process(data);
  } catch (err) {
    throw new Error('fetchAndProcess failed', { cause: err });
  }
}`,
      hints: [
        'The original error has useful information (message, stack, type).',
        'Creating a new Error without linking loses all that context.',
        'Use the cause option to chain the original error.',
      ],
      concepts: ['error chaining', 'cause', 'context preservation'],
    },

    // ---- predict-output (3) ----
    {
      id: 'js-err-16b',
      title: 'Finally always runs',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict when the finally block executes.',
      skeleton: `function test() {
  try {
    console.log('try');
    throw new Error('oops');
  } catch (e) {
    console.log('catch');
  } finally {
    console.log('finally');
  }
  console.log('after');
}

test();`,
      solution: `function test() {
  try {
    console.log('try');
    throw new Error('oops');
  } catch (e) {
    console.log('catch');
  } finally {
    console.log('finally');
  }
  console.log('after');
}

test();`,
      expectedOutput: `try
catch
finally
after`,
      hints: [
        'try runs until the throw.',
        'catch handles the error.',
        'finally always runs after try/catch.',
      ],
      concepts: ['try/catch/finally', 'execution order'],
    },
    {
      id: 'js-err-17i',
      title: 'Finally overrides return',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict what happens when finally has a return statement.',
      skeleton: `function surprise() {
  try {
    return 'try';
  } finally {
    return 'finally';
  }
}

console.log(surprise());`,
      solution: `function surprise() {
  try {
    return 'try';
  } finally {
    return 'finally';
  }
}

console.log(surprise());`,
      expectedOutput: `finally`,
      hints: [
        'finally runs even when try has a return.',
        'A return in finally overrides the return in try.',
        'This is a known JavaScript gotcha.',
      ],
      concepts: ['finally', 'return', 'gotcha'],
    },
    {
      id: 'js-err-18a',
      title: 'Error name property',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Predict the names of different error types.',
      skeleton: `const errors = [
  new Error('a'),
  new TypeError('b'),
  new RangeError('c'),
];

console.log(errors.map(e => e.name).join(','));
console.log(errors.every(e => e instanceof Error));`,
      solution: `const errors = [
  new Error('a'),
  new TypeError('b'),
  new RangeError('c'),
];

console.log(errors.map(e => e.name).join(','));
console.log(errors.every(e => e instanceof Error));`,
      expectedOutput: `Error,TypeError,RangeError
true`,
      hints: [
        'Each error type has its own name property.',
        'TypeError and RangeError are subclasses of Error.',
        'All are instances of Error.',
      ],
      concepts: ['Error.name', 'instanceof', 'error hierarchy'],
    },

    // ---- refactor (2) ----
    {
      id: 'js-err-19i',
      title: 'Error codes to error classes',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Replace error code checking with custom error classes.',
      skeleton: `function handleError(err) {
  if (err.code === 'NOT_FOUND') {
    console.log('Resource not found: ' + err.message);
  } else if (err.code === 'UNAUTHORIZED') {
    console.log('Access denied: ' + err.message);
  } else if (err.code === 'VALIDATION') {
    console.log('Invalid input: ' + err.message);
  } else {
    console.log('Unknown error: ' + err.message);
  }
}

// Usage
handleError({ code: 'NOT_FOUND', message: '/users/99' });`,
      solution: `class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

function handleError(err) {
  if (err instanceof NotFoundError) {
    console.log('Resource not found: ' + err.message);
  } else if (err instanceof UnauthorizedError) {
    console.log('Access denied: ' + err.message);
  } else if (err instanceof ValidationError) {
    console.log('Invalid input: ' + err.message);
  } else {
    console.log('Unknown error: ' + err.message);
  }
}`,
      hints: [
        'Create dedicated error classes for each error type.',
        'Use instanceof instead of checking error codes.',
        'Custom classes provide proper stack traces and inheritance.',
      ],
      concepts: ['custom error', 'instanceof', 'refactor'],
    },
    {
      id: 'js-err-20a',
      title: 'Nested try/catch to Result pattern',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Replace nested try/catch with a Result-style error handling pattern.',
      skeleton: `function processOrder(orderId) {
  let order;
  try {
    order = getOrder(orderId);
  } catch (e) {
    return { success: false, error: 'Order not found' };
  }

  let validated;
  try {
    validated = validate(order);
  } catch (e) {
    return { success: false, error: 'Validation failed: ' + e.message };
  }

  let receipt;
  try {
    receipt = charge(validated);
  } catch (e) {
    return { success: false, error: 'Payment failed: ' + e.message };
  }

  return { success: true, data: receipt };
}`,
      solution: `function tryCatch(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (err) {
    return { ok: false, error: err };
  }
}

function processOrder(orderId) {
  const orderResult = tryCatch(() => getOrder(orderId));
  if (!orderResult.ok) return { success: false, error: 'Order not found' };

  const validResult = tryCatch(() => validate(orderResult.value));
  if (!validResult.ok) return { success: false, error: 'Validation failed: ' + validResult.error.message };

  const chargeResult = tryCatch(() => charge(validResult.value));
  if (!chargeResult.ok) return { success: false, error: 'Payment failed: ' + chargeResult.error.message };

  return { success: true, data: chargeResult.value };
}`,
      hints: [
        'Extract the try/catch pattern into a reusable helper.',
        'The helper returns a result object: { ok, value } or { ok, error }.',
        'Each step checks the result before proceeding.',
      ],
      concepts: ['Result pattern', 'error handling', 'refactor', 'functional'],
    },
  ],
};
