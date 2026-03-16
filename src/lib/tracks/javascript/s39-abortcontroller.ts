import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-abort',
  title: '39. AbortController',
  explanation: `## AbortController

AbortController provides a standard mechanism for cancelling asynchronous operations.

\`\`\`javascript
// Basic usage
const controller = new AbortController();
const { signal } = controller;

fetch('/api/data', { signal })
  .catch(err => {
    if (err.name === 'AbortError') console.log('Request cancelled');
  });

controller.abort(); // cancel the fetch

// Timeout
const signal = AbortSignal.timeout(5000); // auto-abort after 5s
await fetch('/api/slow', { signal });

// Compose signals
const sig = AbortSignal.any([
  AbortSignal.timeout(5000),
  manualController.signal,
]);

// Event listeners with signal
el.addEventListener('click', handler, { signal });
controller.abort(); // removes the listener
\`\`\`

AbortController works with fetch, addEventListener, streams, and any API that accepts a signal. It is the standard cancellation mechanism in JavaScript.`,
  exercises: [
    {
      id: 'js-abort-1',
      title: 'AbortController basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to create an AbortController and use its signal.',
      skeleton: `const controller = new __BLANK__();
const { __BLANK__ } = controller;

console.log(signal.__BLANK__); // false
controller.__BLANK__();
console.log(signal.aborted);   // true`,
      solution: `const controller = new AbortController();
const { signal } = controller;

console.log(signal.aborted); // false
controller.abort();
console.log(signal.aborted);   // true`,
      hints: [
        'new AbortController() creates the controller.',
        'Destructure { signal } from the controller.',
        'signal.aborted is false until controller.abort() is called.',
      ],
      concepts: ['AbortController', 'signal', 'aborted'],
    },
    {
      id: 'js-abort-2',
      title: 'Fetch with signal',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to cancel a fetch request.',
      skeleton: `const controller = new AbortController();

try {
  const response = await fetch('/api/data', {
    __BLANK__: controller.signal,
  });
  const data = await response.json();
} catch (err) {
  if (err.name === '__BLANK__') {
    console.log('Request was cancelled');
  }
}

// Cancel after 3 seconds:
setTimeout(() => controller.__BLANK__(), 3000);`,
      solution: `const controller = new AbortController();

try {
  const response = await fetch('/api/data', {
    signal: controller.signal,
  });
  const data = await response.json();
} catch (err) {
  if (err.name === 'AbortError') {
    console.log('Request was cancelled');
  }
}

// Cancel after 3 seconds:
setTimeout(() => controller.abort(), 3000);`,
      hints: [
        'Pass the signal in the fetch options.',
        'Aborted fetches throw an AbortError.',
        'Check err.name to distinguish abort from other errors.',
      ],
      concepts: ['fetch cancellation', 'AbortError'],
    },
    {
      id: 'js-abort-3',
      title: 'AbortSignal.timeout',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to use AbortSignal.timeout for an auto-cancelling fetch.',
      skeleton: `const response = await fetch('/api/data', {
  signal: AbortSignal.__BLANK__(5000),
});
// Automatically aborts after __BLANK__ milliseconds`,
      solution: `const response = await fetch('/api/data', {
  signal: AbortSignal.timeout(5000),
});
// Automatically aborts after 5000 milliseconds`,
      hints: [
        'AbortSignal.timeout(ms) creates a pre-configured signal.',
        'It automatically triggers after the specified milliseconds.',
        'No need to create an AbortController manually.',
      ],
      concepts: ['AbortSignal.timeout', 'auto-cancel'],
    },
    {
      id: 'js-abort-4',
      title: 'addEventListener with signal',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to auto-remove event listeners with abort signal.',
      skeleton: `const controller = new AbortController();

document.addEventListener('click', (e) => {
  console.log('clicked:', e.target);
}, { __BLANK__: controller.signal });

document.addEventListener('keydown', (e) => {
  console.log('key:', e.key);
}, { __BLANK__: controller.signal });

// Remove both listeners at once:
controller.__BLANK__();`,
      solution: `const controller = new AbortController();

document.addEventListener('click', (e) => {
  console.log('clicked:', e.target);
}, { signal: controller.signal });

document.addEventListener('keydown', (e) => {
  console.log('key:', e.key);
}, { signal: controller.signal });

// Remove both listeners at once:
controller.abort();`,
      hints: [
        'Pass { signal } in the addEventListener options.',
        'When the signal aborts, all listeners using it are removed.',
        'This replaces manual removeEventListener calls.',
      ],
      concepts: ['signal with addEventListener', 'bulk listener removal'],
    },
    {
      id: 'js-abort-5',
      title: 'Abort reason',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to pass a reason when aborting.',
      skeleton: `const controller = new AbortController();
controller.abort('User cancelled');

console.log(controller.signal.__BLANK__); // true
console.log(controller.signal.__BLANK__); // 'User cancelled'`,
      solution: `const controller = new AbortController();
controller.abort('User cancelled');

console.log(controller.signal.aborted); // true
console.log(controller.signal.reason);  // 'User cancelled'`,
      hints: [
        'controller.abort(reason) sets the signal reason.',
        'signal.reason stores the abort reason.',
        'The reason can be any value (string, Error, etc.).',
      ],
      concepts: ['abort reason', 'signal.reason'],
    },
    {
      id: 'js-abort-6',
      title: 'Predict abort error type',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict the error properties when aborting a fetch.',
      skeleton: `const controller = new AbortController();
controller.abort();

try {
  await fetch('/api/data', { signal: controller.signal });
} catch (err) {
  console.log(err.name);
  console.log(err instanceof DOMException);
  console.log(err.message.includes('abort'));
}`,
      solution: `// Output:
// 'AbortError'
// true
// true
// Aborting before fetch even starts causes immediate rejection.
// The error is a DOMException with name 'AbortError'.`,
      hints: [
        'An already-aborted signal causes immediate rejection.',
        'The error is a DOMException, not a regular Error.',
        'err.name is always "AbortError" for abort cancellations.',
      ],
      concepts: ['AbortError', 'DOMException'],
    },
    {
      id: 'js-abort-7',
      title: 'AbortSignal.any',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that creates a fetch with both a manual cancel and a timeout using AbortSignal.any.',
      skeleton: `// fetchWithCancel(url, timeoutMs) -- returns { promise, cancel }
// promise: the fetch promise
// cancel(): function to manually cancel
// Also auto-cancels after timeoutMs
`,
      solution: `function fetchWithCancel(url, timeoutMs = 10000) {
  const controller = new AbortController();
  const signal = AbortSignal.any([
    controller.signal,
    AbortSignal.timeout(timeoutMs),
  ]);

  const promise = fetch(url, { signal }).then(res => {
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return res.json();
  });

  return {
    promise,
    cancel: (reason) => controller.abort(reason || 'Manually cancelled'),
  };
}`,
      hints: [
        'AbortSignal.any([...signals]) aborts when ANY signal fires.',
        'Combine manual controller signal with AbortSignal.timeout.',
        'Return both the promise and a cancel function.',
      ],
      concepts: ['AbortSignal.any', 'composite signals'],
    },
    {
      id: 'js-abort-8',
      title: 'Cancellable promise',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that wraps any promise to make it cancellable via AbortSignal.',
      skeleton: `// cancellable(promise, signal) -- returns a new promise that rejects if signal aborts
`,
      solution: `function cancellable(promise, signal) {
  if (signal.aborted) {
    return Promise.reject(new DOMException('Aborted', 'AbortError'));
  }

  return new Promise((resolve, reject) => {
    const onAbort = () => {
      reject(new DOMException('Aborted', 'AbortError'));
    };
    signal.addEventListener('abort', onAbort, { once: true });

    promise.then(
      (value) => {
        signal.removeEventListener('abort', onAbort);
        resolve(value);
      },
      (error) => {
        signal.removeEventListener('abort', onAbort);
        reject(error);
      }
    );
  });
}`,
      hints: [
        'Check if signal is already aborted first.',
        'Listen for the abort event and reject the promise.',
        'Clean up the listener when the original promise settles.',
      ],
      concepts: ['cancellable promise', 'abort signal', 'cleanup'],
    },
    {
      id: 'js-abort-9',
      title: 'Cancellable async generator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write an async generator that produces values at intervals and stops when aborted.',
      skeleton: `// ticker(intervalMs, signal) -- yields incrementing numbers every intervalMs
// Stops when signal is aborted
`,
      solution: `async function* ticker(intervalMs, signal) {
  let count = 0;
  while (!signal.aborted) {
    yield count++;
    await new Promise((resolve, reject) => {
      const timer = setTimeout(resolve, intervalMs);
      signal.addEventListener('abort', () => {
        clearTimeout(timer);
        resolve();
      }, { once: true });
    });
  }
}`,
      hints: [
        'Check signal.aborted in the while condition.',
        'Await a delay that can be interrupted by the abort signal.',
        'Clear the timeout when abort fires.',
      ],
      concepts: ['async generator', 'AbortSignal', 'cancellation'],
    },
    {
      id: 'js-abort-10',
      title: 'Abort in fetch retry',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a fetch retry function that respects an AbortSignal.',
      skeleton: `// fetchRetry(url, { maxRetries, signal }) -- retries on failure, stops on abort
`,
      solution: `async function fetchRetry(url, { maxRetries = 3, signal } = {}) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    if (signal?.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }
    try {
      const response = await fetch(url, { signal });
      if (response.ok) return response;
      if (attempt === maxRetries) return response;
    } catch (err) {
      if (err.name === 'AbortError') throw err;
      if (attempt === maxRetries) throw err;
    }
    await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)));
  }
}`,
      hints: [
        'Check signal.aborted before each attempt.',
        'Re-throw AbortError immediately (do not retry on abort).',
        'Pass the signal to each fetch call.',
      ],
      concepts: ['fetch retry', 'abort-aware', 'error propagation'],
    },
    {
      id: 'js-abort-11',
      title: 'Predict AbortSignal.timeout error',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the error type from AbortSignal.timeout.',
      skeleton: `try {
  await fetch('/api/slow', {
    signal: AbortSignal.timeout(1), // 1ms timeout
  });
} catch (err) {
  console.log(err.name);
  console.log(err instanceof DOMException);
}`,
      solution: `// Output:
// 'TimeoutError'
// true
// AbortSignal.timeout produces a TimeoutError, not an AbortError!
// This lets you distinguish timeouts from manual cancellations.`,
      hints: [
        'AbortSignal.timeout throws TimeoutError, not AbortError.',
        'This is different from manual controller.abort().',
        'You can catch them differently: check err.name.',
      ],
      concepts: ['TimeoutError', 'AbortSignal.timeout'],
    },
    {
      id: 'js-abort-12',
      title: 'Predict signal reuse',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict what happens when you reuse an aborted signal.',
      skeleton: `const controller = new AbortController();
controller.abort();

// Try to use the same signal for a new fetch:
try {
  await fetch('/api/data', { signal: controller.signal });
  console.log('success');
} catch (err) {
  console.log(err.name);
}

// Create a new fetch without the signal:
try {
  const r = await fetch('/api/data');
  console.log('new fetch ok:', r.ok);
} catch (err) {
  console.log('network error');
}`,
      solution: `// Output:
// 'AbortError'
// 'new fetch ok: true' (assuming network is fine)
// An already-aborted signal causes immediate rejection.
// A new fetch without the signal works fine.
// AbortController cannot be "reset" -- create a new one.`,
      hints: [
        'An aborted signal stays aborted forever.',
        'New fetches with the same aborted signal fail immediately.',
        'Create a new AbortController for new operations.',
      ],
      concepts: ['signal reuse', 'aborted state permanence'],
    },
    {
      id: 'js-abort-13',
      title: 'Fix the abort handler leak',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code leaks abort event listeners because they are never removed. Fix it.',
      skeleton: `async function poll(url, signal) {
  while (!signal.aborted) {
    const data = await fetch(url, { signal }).then(r => r.json());
    console.log(data);
    await new Promise(resolve => {
      setTimeout(resolve, 5000);
      signal.addEventListener('abort', resolve);
      // Bug: 'abort' listener is never removed after timeout
    });
  }
}`,
      solution: `async function poll(url, signal) {
  while (!signal.aborted) {
    try {
      const data = await fetch(url, { signal }).then(r => r.json());
      console.log(data);
    } catch (err) {
      if (err.name === 'AbortError') break;
      throw err;
    }
    await new Promise(resolve => {
      const timer = setTimeout(() => {
        signal.removeEventListener('abort', onAbort);
        resolve();
      }, 5000);
      function onAbort() {
        clearTimeout(timer);
        resolve();
      }
      signal.addEventListener('abort', onAbort, { once: true });
    });
  }
}`,
      hints: [
        'Use { once: true } so the listener auto-removes.',
        'Also clean up the timeout when abort fires.',
        'Remove the abort listener when the timeout fires normally.',
      ],
      concepts: ['event listener cleanup', 'abort handler'],
    },
    {
      id: 'js-abort-14',
      title: 'Fix the missing abort check',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'This multi-step operation does not check for abort between steps. Fix it.',
      skeleton: `async function pipeline(steps, data, signal) {
  let result = data;
  for (const step of steps) {
    result = await step(result);
    // Bug: if signal was aborted between steps, we keep going
  }
  return result;
}`,
      solution: `async function pipeline(steps, data, signal) {
  let result = data;
  for (const step of steps) {
    if (signal?.aborted) {
      throw new DOMException(signal.reason || 'Aborted', 'AbortError');
    }
    result = await step(result);
  }
  if (signal?.aborted) {
    throw new DOMException(signal.reason || 'Aborted', 'AbortError');
  }
  return result;
}`,
      hints: [
        'Check signal.aborted before each step.',
        'Throw an AbortError when cancelled.',
        'Include the signal.reason in the error for debugging.',
      ],
      concepts: ['abort checkpoints', 'pipeline cancellation'],
    },
    {
      id: 'js-abort-15',
      title: 'Fix the AbortSignal.any polyfill',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'This AbortSignal.any polyfill leaks listeners. Fix it.',
      skeleton: `function signalAny(signals) {
  const controller = new AbortController();

  for (const signal of signals) {
    if (signal.aborted) {
      controller.abort(signal.reason);
      return controller.signal;
    }
    signal.addEventListener('abort', () => {
      controller.abort(signal.reason);
    });
    // Bug: listeners are never removed after one fires
  }

  return controller.signal;
}`,
      solution: `function signalAny(signals) {
  const controller = new AbortController();

  function onAbort() {
    const aborted = signals.find(s => s.aborted);
    controller.abort(aborted?.reason);
    cleanup();
  }

  function cleanup() {
    for (const signal of signals) {
      signal.removeEventListener('abort', onAbort);
    }
  }

  for (const signal of signals) {
    if (signal.aborted) {
      controller.abort(signal.reason);
      return controller.signal;
    }
    signal.addEventListener('abort', onAbort, { once: true });
  }

  return controller.signal;
}`,
      hints: [
        'When one signal fires, remove listeners from all signals.',
        'Use a shared handler function so it can be removed.',
        'Use { once: true } as extra safety.',
      ],
      concepts: ['AbortSignal.any polyfill', 'cleanup'],
    },
    {
      id: 'js-abort-16',
      title: 'Abort-aware debounce',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a debounce function that aborts the pending call when a new one comes in.',
      skeleton: `// abortableDebounce(fn, ms) -- returns debounced function
// Each call aborts the previous pending invocation
// fn receives an AbortSignal as its last argument
`,
      solution: `function abortableDebounce(fn, ms) {
  let timer = null;
  let controller = null;

  return function (...args) {
    if (controller) {
      controller.abort();
    }
    if (timer) {
      clearTimeout(timer);
    }

    controller = new AbortController();
    const signal = controller.signal;

    timer = setTimeout(() => {
      fn(...args, signal);
      controller = null;
      timer = null;
    }, ms);
  };
}`,
      hints: [
        'Abort the previous controller on each new call.',
        'Clear the previous timeout.',
        'Pass the new signal to the function.',
      ],
      concepts: ['debounce', 'AbortController', 'cancellation'],
    },
    {
      id: 'js-abort-17',
      title: 'Cancellable resource loader',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a resource loader that cancels previous loads when a new one starts (race condition prevention).',
      skeleton: `// createResourceLoader(fetchFn) returns load(params)
// Each call to load cancels the previous one
// Only the most recent load resolves
`,
      solution: `function createResourceLoader(fetchFn) {
  let currentController = null;

  return async function load(params) {
    if (currentController) {
      currentController.abort();
    }
    currentController = new AbortController();
    const { signal } = currentController;

    try {
      const result = await fetchFn(params, signal);
      return result;
    } catch (err) {
      if (err.name === 'AbortError') {
        return undefined;
      }
      throw err;
    }
  };
}`,
      hints: [
        'Abort the previous controller before starting a new load.',
        'Pass the new signal to the fetch function.',
        'Silently ignore AbortErrors (they mean a newer load replaced this one).',
      ],
      concepts: ['race condition prevention', 'latest-only pattern'],
    },
    {
      id: 'js-abort-18',
      title: 'Abort for cleanup pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a component setup function that uses AbortController for cleanup of all subscriptions.',
      skeleton: `// setupComponent(element) -- sets up event listeners, intervals, and fetches
// Returns a cleanup function that cancels everything
`,
      solution: `function setupComponent(element) {
  const controller = new AbortController();
  const { signal } = controller;

  element.addEventListener('click', () => {
    console.log('clicked');
  }, { signal });

  element.addEventListener('mouseover', () => {
    console.log('hover');
  }, { signal });

  const intervalId = setInterval(() => {
    if (signal.aborted) return;
    console.log('tick');
  }, 1000);

  signal.addEventListener('abort', () => {
    clearInterval(intervalId);
  }, { once: true });

  fetch('/api/init', { signal })
    .then(r => r.json())
    .then(data => {
      if (!signal.aborted) {
        element.textContent = data.message;
      }
    })
    .catch(() => {});

  return () => controller.abort();
}`,
      hints: [
        'Use one AbortController for all subscriptions in the component.',
        'Event listeners: pass { signal }.',
        'Intervals: listen for abort to clear; check aborted before executing.',
      ],
      concepts: ['component cleanup', 'unified cancellation'],
    },
    {
      id: 'js-abort-19',
      title: 'Refactor manual cancellation to AbortController',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this manual cancellation flag to use AbortController.',
      skeleton: `function createPoller(url, intervalMs) {
  let cancelled = false;
  let timeoutId = null;

  async function poll() {
    if (cancelled) return;
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
    if (!cancelled) {
      timeoutId = setTimeout(poll, intervalMs);
    }
  }

  poll();

  return function stop() {
    cancelled = true;
    if (timeoutId) clearTimeout(timeoutId);
  };
}`,
      solution: `function createPoller(url, intervalMs) {
  const controller = new AbortController();
  const { signal } = controller;

  async function poll() {
    if (signal.aborted) return;
    try {
      const res = await fetch(url, { signal });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error(err);
    }
    if (!signal.aborted) {
      setTimeout(poll, intervalMs);
    }
  }

  poll();

  return function stop() {
    controller.abort();
  };
}`,
      hints: [
        'Replace the boolean flag with AbortController.',
        'Pass signal to fetch for automatic cancellation.',
        'Check signal.aborted instead of the manual flag.',
      ],
      concepts: ['AbortController migration', 'refactoring'],
    },
    {
      id: 'js-abort-20',
      title: 'Refactor multiple cleanups to single abort',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor these scattered cleanup calls to a single AbortController.',
      skeleton: `function setupWidget() {
  const clickHandler = () => console.log('click');
  const scrollHandler = () => console.log('scroll');
  const resizeHandler = () => console.log('resize');

  document.addEventListener('click', clickHandler);
  window.addEventListener('scroll', scrollHandler);
  window.addEventListener('resize', resizeHandler);

  const interval = setInterval(() => console.log('tick'), 1000);

  return function cleanup() {
    document.removeEventListener('click', clickHandler);
    window.removeEventListener('scroll', scrollHandler);
    window.removeEventListener('resize', resizeHandler);
    clearInterval(interval);
  };
}`,
      solution: `function setupWidget() {
  const controller = new AbortController();
  const { signal } = controller;

  document.addEventListener('click', () => console.log('click'), { signal });
  window.addEventListener('scroll', () => console.log('scroll'), { signal });
  window.addEventListener('resize', () => console.log('resize'), { signal });

  const interval = setInterval(() => {
    if (signal.aborted) return;
    console.log('tick');
  }, 1000);
  signal.addEventListener('abort', () => clearInterval(interval), { once: true });

  return function cleanup() {
    controller.abort();
  };
}`,
      hints: [
        'Pass { signal } to all addEventListener calls.',
        'For intervals, listen for the abort event to clearInterval.',
        'One controller.abort() cleans up everything.',
      ],
      concepts: ['unified cleanup', 'AbortController refactoring'],
    },
  ],
};
