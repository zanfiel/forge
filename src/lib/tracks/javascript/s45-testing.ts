import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-testing',
  title: '45. Testing',
  explanation: `## Testing

Testing ensures your code works correctly and keeps working as it evolves. JavaScript has a rich ecosystem of testing tools.

\`\`\`javascript
// Basic assertion
console.assert(1 + 1 === 2, 'Math is broken');

// Arrange / Act / Assert (AAA)
// 1. Arrange: set up test data and dependencies
// 2. Act: call the function under test
// 3. Assert: verify the result

// Modern test runners (Vitest / Jest)
import { describe, it, expect } from 'vitest';

describe('add', () => {
  it('adds two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('handles negative numbers', () => {
    expect(add(-1, -2)).toBe(-3);
  });
});

// Test doubles
// - Stub: predetermined return value
// - Mock: tracks calls and can assert on them
// - Spy: wraps real function, tracks calls

// vi.fn() creates a mock function
const mockFetch = vi.fn().mockResolvedValue({ json: () => ({}) });
\`\`\`

Good tests are fast, isolated, repeatable, and descriptive.`,
  exercises: [
    {
      id: 'js-testing-1',
      title: 'Assert Basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to write basic assertions using console.assert.',
      skeleton: `function add(a, b) { return a + b; }
function isEven(n) { return n % 2 === 0; }

// Assert that add(2, 3) equals 5
console.__BLANK__(add(2, 3) __BLANK__ 5, 'add(2, 3) should be 5');

// Assert that isEven(4) returns true
console.assert(__BLANK__, 'isEven(4) should be true');

// Assert that add returns a number
console.assert(__BLANK__ add(1, 1) === 'number', 'add should return a number');`,
      solution: `function add(a, b) { return a + b; }
function isEven(n) { return n % 2 === 0; }

// Assert that add(2, 3) equals 5
console.assert(add(2, 3) === 5, 'add(2, 3) should be 5');

// Assert that isEven(4) returns true
console.assert(isEven(4), 'isEven(4) should be true');

// Assert that add returns a number
console.assert(typeof add(1, 1) === 'number', 'add should return a number');`,
      hints: [
        'console.assert(condition, message) logs the message only if condition is false.',
        'Use === for strict equality comparisons.',
        'typeof returns a string like "number", "string", etc.',
      ],
      concepts: ['assertions', 'console.assert', 'strict equality', 'typeof'],
    },
    {
      id: 'js-testing-2',
      title: 'Arrange Act Assert',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to structure a test using the AAA pattern.',
      skeleton: `import { describe, it, expect } from 'vitest';

function calculateDiscount(price, percent) {
  return price - (price * percent / 100);
}

describe('calculateDiscount', () => {
  it('applies a 20% discount to $100', () => {
    // Arrange
    const price = __BLANK__;
    const percent = __BLANK__;

    // Act
    const result = __BLANK__(price, percent);

    // Assert
    __BLANK__(result).__BLANK__(80);
  });
});`,
      solution: `import { describe, it, expect } from 'vitest';

function calculateDiscount(price, percent) {
  return price - (price * percent / 100);
}

describe('calculateDiscount', () => {
  it('applies a 20% discount to $100', () => {
    // Arrange
    const price = 100;
    const percent = 20;

    // Act
    const result = calculateDiscount(price, percent);

    // Assert
    expect(result).toBe(80);
  });
});`,
      hints: [
        'Arrange: set up the inputs -- price = 100, percent = 20.',
        'Act: call the function under test with the arranged inputs.',
        'Assert: use expect(result).toBe(expected) to verify the output.',
      ],
      concepts: ['AAA pattern', 'describe', 'it', 'expect', 'toBe'],
    },
    {
      id: 'js-testing-3',
      title: 'Unit Test Suite',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write a complete test suite for a capitalize function that capitalizes the first letter of each word.',
      skeleton: `import { describe, it, expect } from 'vitest';

function capitalize(str) {
  return str.replace(/\\b\\w/g, (c) => c.toUpperCase());
}

describe('capitalize', () => {
  // Write tests for:
  // 1. Single word
  // 2. Multiple words
  // 3. Already capitalized input
  // 4. Empty string
  // 5. Mixed case input



});`,
      solution: `import { describe, it, expect } from 'vitest';

function capitalize(str) {
  return str.replace(/\\b\\w/g, (c) => c.toUpperCase());
}

describe('capitalize', () => {
  it('capitalizes a single word', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('capitalizes multiple words', () => {
    expect(capitalize('hello world')).toBe('Hello World');
  });

  it('handles already capitalized input', () => {
    expect(capitalize('Hello World')).toBe('Hello World');
  });

  it('returns empty string for empty input', () => {
    expect(capitalize('')).toBe('');
  });

  it('handles mixed case input', () => {
    expect(capitalize('hELLO wORLD')).toBe('HELLO WORLD');
  });
});`,
      hints: [
        'Each test case should cover one specific scenario with a descriptive name.',
        'Use expect(actual).toBe(expected) for string comparisons.',
        'Test edge cases like empty strings and already-correct input.',
      ],
      concepts: ['unit testing', 'test suite', 'edge cases', 'describe/it'],
    },
    {
      id: 'js-testing-4',
      title: 'Integration Test',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write an integration test for a UserService that depends on a database module. Test that createUser and getUser work together.',
      skeleton: `import { describe, it, expect, beforeEach } from 'vitest';

// Simple in-memory DB
class InMemoryDB {
  #data = new Map();
  save(key, value) { this.#data.set(key, value); }
  find(key) { return this.#data.get(key) ?? null; }
  clear() { this.#data.clear(); }
}

class UserService {
  constructor(db) { this.db = db; }
  createUser(name, email) {
    const user = { id: crypto.randomUUID(), name, email, createdAt: Date.now() };
    this.db.save(user.id, user);
    return user;
  }
  getUser(id) { return this.db.find(id); }
}

describe('UserService integration', () => {
  // Set up fresh DB and service before each test
  // Test: create a user, then retrieve it by ID
  // Test: getUser returns null for non-existent ID
  // Test: create multiple users, retrieve each



});`,
      solution: `import { describe, it, expect, beforeEach } from 'vitest';

class InMemoryDB {
  #data = new Map();
  save(key, value) { this.#data.set(key, value); }
  find(key) { return this.#data.get(key) ?? null; }
  clear() { this.#data.clear(); }
}

class UserService {
  constructor(db) { this.db = db; }
  createUser(name, email) {
    const user = { id: crypto.randomUUID(), name, email, createdAt: Date.now() };
    this.db.save(user.id, user);
    return user;
  }
  getUser(id) { return this.db.find(id); }
}

describe('UserService integration', () => {
  let db;
  let service;

  beforeEach(() => {
    db = new InMemoryDB();
    service = new UserService(db);
  });

  it('creates and retrieves a user', () => {
    const user = service.createUser('Alice', 'alice@test.com');
    const found = service.getUser(user.id);
    expect(found).not.toBeNull();
    expect(found.name).toBe('Alice');
    expect(found.email).toBe('alice@test.com');
  });

  it('returns null for non-existent user', () => {
    expect(service.getUser('fake-id')).toBeNull();
  });

  it('handles multiple users independently', () => {
    const alice = service.createUser('Alice', 'a@test.com');
    const bob = service.createUser('Bob', 'b@test.com');
    expect(service.getUser(alice.id).name).toBe('Alice');
    expect(service.getUser(bob.id).name).toBe('Bob');
  });
});`,
      hints: [
        'Use beforeEach to create a fresh DB and service for each test -- ensures isolation.',
        'Integration tests verify that multiple modules work together correctly.',
        'Test the happy path, error cases, and multi-item scenarios.',
      ],
      concepts: ['integration testing', 'beforeEach', 'test isolation', 'service testing'],
    },
    {
      id: 'js-testing-5',
      title: 'Test Doubles',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write tests using stubs and spies to isolate a function from its dependencies.',
      skeleton: `import { describe, it, expect, vi } from 'vitest';

async function fetchUserPosts(userId, apiClient) {
  const user = await apiClient.getUser(userId);
  if (!user) throw new Error('User not found');
  const posts = await apiClient.getPosts(user.id);
  return posts.map(p => ({ ...p, author: user.name }));
}

describe('fetchUserPosts', () => {
  // Create a mock apiClient with stubbed getUser and getPosts
  // Test: returns posts with author name attached
  // Test: throws when user is not found
  // Test: verify that getUser was called with the correct userId



});`,
      solution: `import { describe, it, expect, vi } from 'vitest';

async function fetchUserPosts(userId, apiClient) {
  const user = await apiClient.getUser(userId);
  if (!user) throw new Error('User not found');
  const posts = await apiClient.getPosts(user.id);
  return posts.map(p => ({ ...p, author: user.name }));
}

describe('fetchUserPosts', () => {
  it('returns posts with author name', async () => {
    const apiClient = {
      getUser: vi.fn().mockResolvedValue({ id: '1', name: 'Alice' }),
      getPosts: vi.fn().mockResolvedValue([
        { id: 'p1', title: 'Hello' },
        { id: 'p2', title: 'World' },
      ]),
    };

    const result = await fetchUserPosts('1', apiClient);
    expect(result).toHaveLength(2);
    expect(result[0].author).toBe('Alice');
    expect(result[1].author).toBe('Alice');
  });

  it('throws when user not found', async () => {
    const apiClient = {
      getUser: vi.fn().mockResolvedValue(null),
      getPosts: vi.fn(),
    };

    await expect(fetchUserPosts('99', apiClient)).rejects.toThrow('User not found');
  });

  it('calls getUser with correct userId', async () => {
    const apiClient = {
      getUser: vi.fn().mockResolvedValue({ id: '5', name: 'Bob' }),
      getPosts: vi.fn().mockResolvedValue([]),
    };

    await fetchUserPosts('5', apiClient);
    expect(apiClient.getUser).toHaveBeenCalledWith('5');
  });
});`,
      hints: [
        'Use vi.fn().mockResolvedValue(data) to create a stub that returns a resolved Promise.',
        'Test error cases with expect(promise).rejects.toThrow(message).',
        'Use .toHaveBeenCalledWith(arg) to verify a mock was called with specific arguments.',
      ],
      concepts: ['test doubles', 'stubs', 'mocks', 'vi.fn', 'async testing'],
    },
    {
      id: 'js-testing-6',
      title: 'Vitest Basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to complete a Vitest test file.',
      skeleton: `import { __BLANK__, __BLANK__, __BLANK__ } from 'vitest';

function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

__BLANK__('sum', () => {
  __BLANK__('sums an array of numbers', () => {
    __BLANK__(sum([1, 2, 3])).toBe(6);
  });

  it('returns 0 for empty array', () => {
    expect(sum([])).toBe(__BLANK__);
  });

  it('handles negative numbers', () => {
    expect(sum([-1, 1])).toBe(__BLANK__);
  });
});`,
      solution: `import { describe, it, expect } from 'vitest';

function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

describe('sum', () => {
  it('sums an array of numbers', () => {
    expect(sum([1, 2, 3])).toBe(6);
  });

  it('returns 0 for empty array', () => {
    expect(sum([])).toBe(0);
  });

  it('handles negative numbers', () => {
    expect(sum([-1, 1])).toBe(0);
  });
});`,
      hints: [
        'Import describe, it, and expect from vitest.',
        'describe groups related tests, it defines individual test cases.',
        'expect(actual).toBe(expected) checks strict equality.',
      ],
      concepts: ['vitest', 'describe', 'it', 'expect', 'toBe'],
    },
    {
      id: 'js-testing-7',
      title: 'beforeEach / afterEach',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a test suite with proper setup and teardown for a Stack class.',
      skeleton: `import { describe, it, expect, beforeEach, afterEach } from 'vitest';

class Stack {
  #items = [];
  push(item) { this.#items.push(item); }
  pop() { if (this.#items.length === 0) throw new Error('Empty'); return this.#items.pop(); }
  peek() { return this.#items.at(-1); }
  get size() { return this.#items.length; }
  clear() { this.#items.length = 0; }
}

describe('Stack', () => {
  // Declare stack variable
  // Use beforeEach to create a fresh stack with items [1, 2, 3]
  // Use afterEach to clear the stack
  // Write tests for: push, pop, peek, size, pop on empty



});`,
      solution: `import { describe, it, expect, beforeEach, afterEach } from 'vitest';

class Stack {
  #items = [];
  push(item) { this.#items.push(item); }
  pop() { if (this.#items.length === 0) throw new Error('Empty'); return this.#items.pop(); }
  peek() { return this.#items.at(-1); }
  get size() { return this.#items.length; }
  clear() { this.#items.length = 0; }
}

describe('Stack', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
    stack.push(1);
    stack.push(2);
    stack.push(3);
  });

  afterEach(() => {
    stack.clear();
  });

  it('pushes items onto the stack', () => {
    stack.push(4);
    expect(stack.size).toBe(4);
    expect(stack.peek()).toBe(4);
  });

  it('pops the top item', () => {
    expect(stack.pop()).toBe(3);
    expect(stack.size).toBe(2);
  });

  it('peeks at the top without removing', () => {
    expect(stack.peek()).toBe(3);
    expect(stack.size).toBe(3);
  });

  it('reports correct size', () => {
    expect(stack.size).toBe(3);
  });

  it('throws on pop from empty stack', () => {
    stack.clear();
    expect(() => stack.pop()).toThrow('Empty');
  });
});`,
      hints: [
        'Declare the stack variable outside beforeEach so all tests can access it.',
        'beforeEach creates a fresh stack before each test for isolation.',
        'Use expect(() => fn()).toThrow(message) to test thrown errors.',
      ],
      concepts: ['beforeEach', 'afterEach', 'setup', 'teardown', 'test isolation'],
    },
    {
      id: 'js-testing-8',
      title: 'Mocking Modules',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the blanks to mock a module dependency in Vitest.',
      skeleton: `import { describe, it, expect, vi } from 'vitest';

// Mock the entire fetch module
vi.__BLANK__('node-fetch', () => ({
  default: vi.fn(),
}));

import fetch from 'node-fetch';

async function getUser(id) {
  const res = await fetch('https://api.example.com/users/' + id);
  return res.json();
}

describe('getUser', () => {
  it('fetches user by id', async () => {
    const mockUser = { id: 1, name: 'Alice' };
    fetch.__BLANK__(Promise.resolve({
      json: () => Promise.resolve(mockUser),
    }));

    const user = await getUser(1);
    expect(user).toEqual(mockUser);
    expect(fetch).toHaveBeenCalledWith(__BLANK__);
  });
});`,
      solution: `import { describe, it, expect, vi } from 'vitest';

// Mock the entire fetch module
vi.mock('node-fetch', () => ({
  default: vi.fn(),
}));

import fetch from 'node-fetch';

async function getUser(id) {
  const res = await fetch('https://api.example.com/users/' + id);
  return res.json();
}

describe('getUser', () => {
  it('fetches user by id', async () => {
    const mockUser = { id: 1, name: 'Alice' };
    fetch.mockResolvedValue({
      json: () => Promise.resolve(mockUser),
    });

    const user = await getUser(1);
    expect(user).toEqual(mockUser);
    expect(fetch).toHaveBeenCalledWith('https://api.example.com/users/1');
  });
});`,
      hints: [
        'vi.mock() replaces a module with a mock implementation.',
        'mockResolvedValue sets up the mock to return a resolved Promise.',
        'Verify the URL passed to fetch matches what getUser constructs.',
      ],
      concepts: ['module mocking', 'vi.mock', 'mockResolvedValue', 'toHaveBeenCalledWith'],
    },
    {
      id: 'js-testing-9',
      title: 'Mocking Functions',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the assertion results for mock function calls.',
      skeleton: `import { vi, expect } from 'vitest';

const callback = vi.fn((x) => x * 2);

callback(5);
callback(10);
callback(5);

// Predict: true or false for each assertion
console.log(callback.mock.calls.length);         // ?
console.log(callback.mock.results[0].value);     // ?
console.log(callback.mock.calls[1][0]);           // ?

// Will these pass?
expect(callback).toHaveBeenCalledTimes(3);
expect(callback).toHaveBeenCalledWith(10);
expect(callback).toHaveReturnedWith(20);`,
      solution: `import { vi, expect } from 'vitest';

const callback = vi.fn((x) => x * 2);

callback(5);
callback(10);
callback(5);

// Answers:
console.log(callback.mock.calls.length);         // 3
console.log(callback.mock.results[0].value);     // 10  (5 * 2)
console.log(callback.mock.calls[1][0]);           // 10  (second call, first arg)

// All three pass:
expect(callback).toHaveBeenCalledTimes(3);  // PASS -- called 3 times
expect(callback).toHaveBeenCalledWith(10);  // PASS -- was called with 10 at least once
expect(callback).toHaveReturnedWith(20);    // PASS -- returned 20 at least once (10 * 2)`,
      hints: [
        'mock.calls is an array of argument arrays -- calls[1][0] is the first arg of the second call.',
        'mock.results stores { type, value } for each call.',
        'toHaveBeenCalledWith checks if ANY call matches, not just the last one.',
      ],
      concepts: ['vi.fn', 'mock calls', 'mock results', 'assertion matchers'],
    },
    {
      id: 'js-testing-10',
      title: 'Testing Async Code',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write tests for an async retry function that retries a failing operation up to N times.',
      skeleton: `import { describe, it, expect, vi } from 'vitest';

async function retry(fn, maxRetries = 3) {
  let lastError;
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

describe('retry', () => {
  // Test: succeeds on first try
  // Test: succeeds after 2 failures
  // Test: throws after all retries exhausted
  // Test: calls fn the correct number of times



});`,
      solution: `import { describe, it, expect, vi } from 'vitest';

async function retry(fn, maxRetries = 3) {
  let lastError;
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

describe('retry', () => {
  it('succeeds on first try', async () => {
    const fn = vi.fn().mockResolvedValue('ok');
    const result = await retry(fn);
    expect(result).toBe('ok');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('succeeds after 2 failures', async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error('fail1'))
      .mockRejectedValueOnce(new Error('fail2'))
      .mockResolvedValue('ok');
    const result = await retry(fn);
    expect(result).toBe('ok');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('throws after all retries exhausted', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('always fails'));
    await expect(retry(fn, 2)).rejects.toThrow('always fails');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('calls fn maxRetries + 1 times on total failure', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('nope'));
    await expect(retry(fn, 4)).rejects.toThrow();
    expect(fn).toHaveBeenCalledTimes(5);
  });
});`,
      hints: [
        'Use mockRejectedValueOnce to simulate failures followed by a success.',
        'The total calls on failure is maxRetries + 1 (initial try + retries).',
        'Use expect(promise).rejects.toThrow() for testing async rejections.',
      ],
      concepts: ['async testing', 'retry logic', 'mockRejectedValue', 'mockResolvedValue'],
    },
    {
      id: 'js-testing-11',
      title: 'Testing DOM',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write tests for a DOM manipulation function using jsdom (available in Vitest by default).',
      skeleton: `import { describe, it, expect, beforeEach } from 'vitest';

function createCounter(container) {
  container.innerHTML = \`
    <span class="count">0</span>
    <button class="inc">+</button>
    <button class="dec">-</button>
  \`;
  let count = 0;
  const display = container.querySelector('.count');
  container.querySelector('.inc').addEventListener('click', () => {
    display.textContent = String(++count);
  });
  container.querySelector('.dec').addEventListener('click', () => {
    display.textContent = String(--count);
  });
}

describe('createCounter', () => {
  // Set up a container element before each test
  // Test: initial display shows 0
  // Test: clicking + increments
  // Test: clicking - decrements
  // Test: multiple clicks accumulate



});`,
      solution: `import { describe, it, expect, beforeEach } from 'vitest';

function createCounter(container) {
  container.innerHTML = \`
    <span class="count">0</span>
    <button class="inc">+</button>
    <button class="dec">-</button>
  \`;
  let count = 0;
  const display = container.querySelector('.count');
  container.querySelector('.inc').addEventListener('click', () => {
    display.textContent = String(++count);
  });
  container.querySelector('.dec').addEventListener('click', () => {
    display.textContent = String(--count);
  });
}

describe('createCounter', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    createCounter(container);
  });

  it('shows initial count of 0', () => {
    expect(container.querySelector('.count').textContent).toBe('0');
  });

  it('increments on + click', () => {
    container.querySelector('.inc').click();
    expect(container.querySelector('.count').textContent).toBe('1');
  });

  it('decrements on - click', () => {
    container.querySelector('.dec').click();
    expect(container.querySelector('.count').textContent).toBe('-1');
  });

  it('accumulates multiple clicks', () => {
    const inc = container.querySelector('.inc');
    inc.click();
    inc.click();
    inc.click();
    container.querySelector('.dec').click();
    expect(container.querySelector('.count').textContent).toBe('2');
  });
});`,
      hints: [
        'Create a container with document.createElement("div") in beforeEach.',
        'Use .click() to simulate button clicks in tests.',
        'Check .textContent of the display element to verify the count.',
      ],
      concepts: ['DOM testing', 'jsdom', 'click simulation', 'textContent'],
    },
    {
      id: 'js-testing-12',
      title: 'Testing Events',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write tests that verify custom events are dispatched and handled correctly.',
      skeleton: `import { describe, it, expect, vi } from 'vitest';

class EventBus {
  #target = new EventTarget();

  emit(name, detail) {
    this.#target.dispatchEvent(new CustomEvent(name, { detail }));
  }

  on(name, handler) {
    this.#target.addEventListener(name, (e) => handler(e.detail));
    return this;
  }
}

describe('EventBus', () => {
  // Test: handler receives emitted data
  // Test: multiple handlers for same event
  // Test: different events are isolated



});`,
      solution: `import { describe, it, expect, vi } from 'vitest';

class EventBus {
  #target = new EventTarget();

  emit(name, detail) {
    this.#target.dispatchEvent(new CustomEvent(name, { detail }));
  }

  on(name, handler) {
    this.#target.addEventListener(name, (e) => handler(e.detail));
    return this;
  }
}

describe('EventBus', () => {
  it('handler receives emitted data', () => {
    const bus = new EventBus();
    const handler = vi.fn();
    bus.on('test', handler);
    bus.emit('test', { value: 42 });
    expect(handler).toHaveBeenCalledWith({ value: 42 });
  });

  it('supports multiple handlers for same event', () => {
    const bus = new EventBus();
    const h1 = vi.fn();
    const h2 = vi.fn();
    bus.on('data', h1).on('data', h2);
    bus.emit('data', 'hello');
    expect(h1).toHaveBeenCalledWith('hello');
    expect(h2).toHaveBeenCalledWith('hello');
  });

  it('isolates different events', () => {
    const bus = new EventBus();
    const handler = vi.fn();
    bus.on('a', handler);
    bus.emit('b', 'wrong');
    expect(handler).not.toHaveBeenCalled();
  });
});`,
      hints: [
        'Use vi.fn() to create spy handlers that track calls.',
        'emit dispatches the event; on registers the handler.',
        'Verify isolation by checking that a handler for event "a" is not called when "b" emits.',
      ],
      concepts: ['event testing', 'CustomEvent', 'EventTarget', 'spy assertions'],
    },
    {
      id: 'js-testing-13',
      title: 'Snapshot Testing',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the blanks to write snapshot tests.',
      skeleton: `import { describe, it, expect } from 'vitest';

function renderCard(user) {
  return {
    html: '<div class="card">' +
      '<h2>' + user.name + '</h2>' +
      '<p>' + user.bio + '</p>' +
      '</div>',
    classes: ['card', user.premium ? 'premium' : 'basic'],
  };
}

describe('renderCard', () => {
  it('matches snapshot for basic user', () => {
    const result = renderCard({ name: 'Alice', bio: 'Dev', premium: false });
    expect(result).__BLANK__();
  });

  it('matches inline snapshot for premium user', () => {
    const result = renderCard({ name: 'Bob', bio: 'Designer', premium: true });
    expect(result.classes).__BLANK__(__BLANK__);
  });
});`,
      solution: `import { describe, it, expect } from 'vitest';

function renderCard(user) {
  return {
    html: '<div class="card">' +
      '<h2>' + user.name + '</h2>' +
      '<p>' + user.bio + '</p>' +
      '</div>',
    classes: ['card', user.premium ? 'premium' : 'basic'],
  };
}

describe('renderCard', () => {
  it('matches snapshot for basic user', () => {
    const result = renderCard({ name: 'Alice', bio: 'Dev', premium: false });
    expect(result).toMatchSnapshot();
  });

  it('matches inline snapshot for premium user', () => {
    const result = renderCard({ name: 'Bob', bio: 'Designer', premium: true });
    expect(result.classes).toMatchInlineSnapshot(\`["card", "premium"]\`);
  });
});`,
      hints: [
        'toMatchSnapshot() compares against a saved .snap file.',
        'toMatchInlineSnapshot() stores the expected value directly in the test file.',
        'Snapshots are auto-generated on first run and compared on subsequent runs.',
      ],
      concepts: ['snapshot testing', 'toMatchSnapshot', 'toMatchInlineSnapshot'],
    },
    {
      id: 'js-testing-14',
      title: 'Test Coverage',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict which branches are NOT covered by the given tests.',
      skeleton: `function classify(score) {
  if (score < 0) return 'invalid';
  if (score < 50) return 'fail';
  if (score < 70) return 'pass';
  if (score < 90) return 'merit';
  if (score <= 100) return 'distinction';
  return 'invalid';
}

// Tests:
// classify(25)   -> 'fail'
// classify(60)   -> 'pass'
// classify(95)   -> 'distinction'

// Which branches are NOT covered?
// Which return statements are never executed?`,
      solution: `function classify(score) {
  if (score < 0) return 'invalid';       // NOT COVERED (no negative test)
  if (score < 50) return 'fail';         // covered (25)
  if (score < 70) return 'pass';         // covered (60)
  if (score < 90) return 'merit';        // NOT COVERED (no 70-89 test)
  if (score <= 100) return 'distinction'; // covered (95)
  return 'invalid';                       // NOT COVERED (no score > 100 test)
}

// Tests:
// classify(25)   -> 'fail'
// classify(60)   -> 'pass'
// classify(95)   -> 'distinction'

// Uncovered branches: score < 0, 70 <= score < 90, score > 100
// Uncovered returns: 'invalid' (both), 'merit'`,
      hints: [
        'Trace each test input through the if-chain to see which branches execute.',
        'No test uses a negative number, so the first branch is uncovered.',
        'No test uses a score between 70-89, so "merit" is never returned.',
      ],
      concepts: ['code coverage', 'branch coverage', 'untested paths'],
    },
    {
      id: 'js-testing-15',
      title: 'TDD: Red-Green-Refactor',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Follow TDD to implement a password validator: write failing tests first, then implement the function to make them pass.',
      skeleton: `import { describe, it, expect } from 'vitest';

// Step 1: Write failing tests for validatePassword
// Rules:
// - At least 8 characters
// - Contains at least one uppercase letter
// - Contains at least one digit
// - Contains at least one special character (!@#$%^&*)
// Returns: { valid: boolean, errors: string[] }

describe('validatePassword', () => {
  // Write 5+ test cases covering all rules and edge cases


});

// Step 2: Implement validatePassword to make all tests pass
function validatePassword(password) {

}`,
      solution: `import { describe, it, expect } from 'vitest';

describe('validatePassword', () => {
  it('accepts a valid password', () => {
    expect(validatePassword('Str0ng!pw')).toEqual({ valid: true, errors: [] });
  });

  it('rejects short passwords', () => {
    const result = validatePassword('Ab1!');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('At least 8 characters');
  });

  it('requires uppercase letter', () => {
    const result = validatePassword('lowercase1!');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('At least one uppercase letter');
  });

  it('requires a digit', () => {
    const result = validatePassword('NoDigits!here');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('At least one digit');
  });

  it('requires a special character', () => {
    const result = validatePassword('NoSpecial1here');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('At least one special character');
  });

  it('collects multiple errors', () => {
    const result = validatePassword('abc');
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThanOrEqual(3);
  });
});

function validatePassword(password) {
  const errors = [];
  if (password.length < 8) errors.push('At least 8 characters');
  if (!/[A-Z]/.test(password)) errors.push('At least one uppercase letter');
  if (!/[0-9]/.test(password)) errors.push('At least one digit');
  if (!/[!@#$%^&*]/.test(password)) errors.push('At least one special character');
  return { valid: errors.length === 0, errors };
}`,
      hints: [
        'TDD: write the tests first, then implement the function to pass them.',
        'Each validation rule should produce a specific error message.',
        'Return { valid: true, errors: [] } when all rules pass.',
      ],
      concepts: ['TDD', 'red-green-refactor', 'password validation', 'test-first'],
    },
    {
      id: 'js-testing-16',
      title: 'BDD Concept',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to write BDD-style test descriptions.',
      skeleton: `import { describe, it, expect } from 'vitest';

// BDD uses business language: Given/When/Then

__BLANK__('Shopping Cart', () => {
  describe('when adding an item', () => {
    __BLANK__('should increase the item count', () => {
      const cart = new Cart();
      cart.add({ name: 'Widget', price: 9.99 });
      __BLANK__(cart.itemCount).__BLANK__(1);
    });

    it('should update the total', () => {
      const cart = new Cart();
      cart.add({ name: 'Widget', price: 9.99 });
      expect(cart.total).toBe(__BLANK__);
    });
  });
});`,
      solution: `import { describe, it, expect } from 'vitest';

// BDD uses business language: Given/When/Then

describe('Shopping Cart', () => {
  describe('when adding an item', () => {
    it('should increase the item count', () => {
      const cart = new Cart();
      cart.add({ name: 'Widget', price: 9.99 });
      expect(cart.itemCount).toBe(1);
    });

    it('should update the total', () => {
      const cart = new Cart();
      cart.add({ name: 'Widget', price: 9.99 });
      expect(cart.total).toBe(9.99);
    });
  });
});`,
      hints: [
        'BDD nests describe blocks to create a readable specification.',
        'describe sets the context ("Shopping Cart", "when adding an item").',
        'it describes the expected behavior ("should increase the item count").',
      ],
      concepts: ['BDD', 'behavior-driven development', 'nested describe', 'specification'],
    },
    {
      id: 'js-testing-17',
      title: 'Testing Patterns',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fix the test suite that has common testing anti-patterns.',
      skeleton: `import { describe, it, expect, vi } from 'vitest';

// BUG: Multiple anti-patterns make these tests fragile and unreliable

let shared = [];  // Anti-pattern: shared mutable state

describe('array utils', () => {
  it('adds items and checks length', () => {
    shared.push('a');
    shared.push('b');
    expect(shared.length).toBe(2);
    // Also checks something unrelated
    expect(Math.random()).toBeLessThan(1);
  });

  it('checks first item', () => {
    // BUG: depends on previous test's state
    expect(shared[0]).toBe('a');
  });

  it('tests too many things', () => {
    const arr = [3, 1, 2];
    arr.sort((a, b) => a - b);
    expect(arr).toEqual([1, 2, 3]);
    expect(arr.length).toBe(3);
    expect(arr[0]).toBe(1);
    expect(arr[arr.length - 1]).toBe(3);
    expect(arr.includes(2)).toBe(true);
    expect(arr.indexOf(1)).toBe(0);
  });
});`,
      solution: `import { describe, it, expect, vi, beforeEach } from 'vitest';

// FIX: Each test is independent, focused, and uses fresh state

describe('array utils', () => {
  let items;

  beforeEach(() => {
    items = ['a', 'b'];
  });

  it('tracks item count after adding', () => {
    expect(items.length).toBe(2);
  });

  it('preserves insertion order', () => {
    expect(items[0]).toBe('a');
    expect(items[1]).toBe('b');
  });

  it('sorts numbers ascending', () => {
    const arr = [3, 1, 2];
    const sorted = [...arr].sort((a, b) => a - b);
    expect(sorted).toEqual([1, 2, 3]);
  });

  it('finds elements by value', () => {
    expect(items.includes('a')).toBe(true);
    expect(items.indexOf('b')).toBe(1);
  });
});`,
      hints: [
        'Never share mutable state between tests -- use beforeEach for fresh setup.',
        'Each test should verify one concept, not multiple unrelated things.',
        'Tests must not depend on execution order of other tests.',
      ],
      concepts: ['test anti-patterns', 'test isolation', 'single assertion', 'shared state'],
    },
    {
      id: 'js-testing-18',
      title: 'Testing Anti-Patterns',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Fix the test that has timing issues and implementation coupling.',
      skeleton: `import { describe, it, expect, vi } from 'vitest';

// BUG: Flaky test due to real timers and implementation coupling
class Debouncer {
  #timer = null;
  #fn;
  #delay;
  constructor(fn, delay) { this.#fn = fn; this.#delay = delay; }
  call(...args) {
    clearTimeout(this.#timer);
    this.#timer = setTimeout(() => this.#fn(...args), this.#delay);
  }
}

describe('Debouncer', () => {
  it('debounces calls', async () => {
    const fn = vi.fn();
    const d = new Debouncer(fn, 100);
    d.call('a');
    d.call('b');
    d.call('c');
    // BUG: real delay makes test slow and flaky
    await new Promise(r => setTimeout(r, 150));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('c');
  });
});`,
      solution: `import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

class Debouncer {
  #timer = null;
  #fn;
  #delay;
  constructor(fn, delay) { this.#fn = fn; this.#delay = delay; }
  call(...args) {
    clearTimeout(this.#timer);
    this.#timer = setTimeout(() => this.#fn(...args), this.#delay);
  }
}

describe('Debouncer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('only calls function after delay expires', () => {
    const fn = vi.fn();
    const d = new Debouncer(fn, 100);
    d.call('a');
    d.call('b');
    d.call('c');

    vi.advanceTimersByTime(99);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('c');
  });
});`,
      hints: [
        'Use vi.useFakeTimers() to control time instead of real setTimeout delays.',
        'vi.advanceTimersByTime(ms) lets you precisely control when timers fire.',
        'Always restore real timers in afterEach with vi.useRealTimers().',
      ],
      concepts: ['fake timers', 'flaky tests', 'vi.useFakeTimers', 'deterministic testing'],
    },
    {
      id: 'js-testing-19',
      title: 'Practical: Test a REST API Handler',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a comprehensive test suite for a REST API request handler, covering success, validation errors, not found, and server errors.',
      skeleton: `import { describe, it, expect, vi, beforeEach } from 'vitest';

async function handleRequest(req, db) {
  if (req.method === 'GET') {
    const item = await db.find(req.params.id);
    if (!item) return { status: 404, body: { error: 'Not found' } };
    return { status: 200, body: item };
  }
  if (req.method === 'POST') {
    if (!req.body?.name) return { status: 400, body: { error: 'Name required' } };
    const item = await db.create(req.body);
    return { status: 201, body: item };
  }
  return { status: 405, body: { error: 'Method not allowed' } };
}

describe('handleRequest', () => {
  // Create mock db with find and create methods
  // Test all 5 response scenarios



});`,
      solution: `import { describe, it, expect, vi, beforeEach } from 'vitest';

async function handleRequest(req, db) {
  if (req.method === 'GET') {
    const item = await db.find(req.params.id);
    if (!item) return { status: 404, body: { error: 'Not found' } };
    return { status: 200, body: item };
  }
  if (req.method === 'POST') {
    if (!req.body?.name) return { status: 400, body: { error: 'Name required' } };
    const item = await db.create(req.body);
    return { status: 201, body: item };
  }
  return { status: 405, body: { error: 'Method not allowed' } };
}

describe('handleRequest', () => {
  let db;

  beforeEach(() => {
    db = {
      find: vi.fn(),
      create: vi.fn(),
    };
  });

  it('GET returns item when found', async () => {
    const item = { id: '1', name: 'Widget' };
    db.find.mockResolvedValue(item);
    const res = await handleRequest({ method: 'GET', params: { id: '1' } }, db);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(item);
    expect(db.find).toHaveBeenCalledWith('1');
  });

  it('GET returns 404 when not found', async () => {
    db.find.mockResolvedValue(null);
    const res = await handleRequest({ method: 'GET', params: { id: '99' } }, db);
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Not found');
  });

  it('POST creates item with valid body', async () => {
    const created = { id: '2', name: 'Gadget' };
    db.create.mockResolvedValue(created);
    const res = await handleRequest({ method: 'POST', body: { name: 'Gadget' } }, db);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(created);
  });

  it('POST returns 400 when name missing', async () => {
    const res = await handleRequest({ method: 'POST', body: {} }, db);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Name required');
  });

  it('returns 405 for unsupported methods', async () => {
    const res = await handleRequest({ method: 'DELETE' }, db);
    expect(res.status).toBe(405);
    expect(res.body.error).toBe('Method not allowed');
  });
});`,
      hints: [
        'Create a mock db in beforeEach with vi.fn() for find and create.',
        'Test each HTTP method path and each possible response status.',
        'Use mockResolvedValue to control what the db returns for each test.',
      ],
      concepts: ['API testing', 'request handler', 'mock database', 'status codes'],
    },
    {
      id: 'js-testing-20',
      title: 'Practical: Custom Test Framework',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Build a minimal test framework with describe, it, expect, and a test runner that reports pass/fail counts.',
      skeleton: `function createTestFramework() {
  const suites = [];

  function describe(name, fn) {
    // Create a test suite, run fn to collect tests

  }

  function it(name, fn) {
    // Add a test to the current suite

  }

  function expect(actual) {
    // Return an object with toBe, toEqual, toThrow matchers

  }

  function run() {
    // Execute all suites and tests, return { passed, failed, results }

  }

  return { describe, it, expect, run };
}

// Usage:
// const { describe, it, expect, run } = createTestFramework();
// describe('math', () => {
//   it('adds', () => { expect(1 + 1).toBe(2); });
//   it('fails', () => { expect(1 + 1).toBe(3); });
// });
// const report = run();
// report.passed === 1; report.failed === 1;`,
      solution: `function createTestFramework() {
  const suites = [];
  let currentSuite = null;

  function describe(name, fn) {
    const suite = { name, tests: [] };
    suites.push(suite);
    const prev = currentSuite;
    currentSuite = suite;
    fn();
    currentSuite = prev;
  }

  function it(name, fn) {
    if (!currentSuite) throw new Error('it() must be inside describe()');
    currentSuite.tests.push({ name, fn });
  }

  function expect(actual) {
    return {
      toBe(expected) {
        if (actual !== expected) {
          throw new Error(\`Expected \${expected} but got \${actual}\`);
        }
      },
      toEqual(expected) {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
          throw new Error(\`Expected \${JSON.stringify(expected)} but got \${JSON.stringify(actual)}\`);
        }
      },
      toThrow(msg) {
        if (typeof actual !== 'function') throw new Error('Expected a function');
        try {
          actual();
          throw new Error('Expected function to throw');
        } catch (e) {
          if (msg && !e.message.includes(msg)) {
            throw new Error(\`Expected throw with "\${msg}" but got "\${e.message}"\`);
          }
        }
      },
    };
  }

  function run() {
    let passed = 0;
    let failed = 0;
    const results = [];

    for (const suite of suites) {
      for (const test of suite.tests) {
        try {
          test.fn();
          passed++;
          results.push({ suite: suite.name, test: test.name, status: 'pass' });
        } catch (e) {
          failed++;
          results.push({ suite: suite.name, test: test.name, status: 'fail', error: e.message });
        }
      }
    }

    return { passed, failed, results };
  }

  return { describe, it, expect, run };
}

// Usage:
// const { describe, it, expect, run } = createTestFramework();
// describe('math', () => {
//   it('adds', () => { expect(1 + 1).toBe(2); });
//   it('fails', () => { expect(1 + 1).toBe(3); });
// });
// const report = run();
// report.passed === 1; report.failed === 1;`,
      hints: [
        'describe() creates a suite and sets currentSuite so it() can add tests to it.',
        'expect() returns an object with matcher methods that throw on mismatch.',
        'run() iterates all suites and tests, catching errors to track pass/fail.',
      ],
      concepts: ['test framework', 'describe/it', 'expect matchers', 'test runner'],
    },
  ],
};
