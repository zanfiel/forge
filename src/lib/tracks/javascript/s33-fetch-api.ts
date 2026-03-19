import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-fetch',
  title: '33. Fetch API',
  explanation: `## Fetch API

The Fetch API is the modern way to make HTTP requests in JavaScript, replacing XMLHttpRequest.

\`\`\`javascript
// Basic GET
const response = await fetch('https://api.example.com/data');
const data = await response.json();

// POST with JSON body
await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice' }),
});

// Error handling -- fetch does NOT reject on HTTP errors!
const res = await fetch('/api/data');
if (!res.ok) {
  throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
}

// AbortController for timeout/cancellation
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);
await fetch('/api/slow', { signal: controller.signal });
\`\`\`

Key points: fetch only rejects on network failure (not HTTP errors), the body can only be consumed once, and you should always check response.ok.`,
  exercises: [
    {
      id: 'js-fetch-1',
      title: 'Basic GET request',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to make a GET request and parse JSON.',
      skeleton: `const response = await __BLANK__('https://api.example.com/users');
const users = await response.__BLANK__();
console.log(users);`,
      solution: `const response = await fetch('https://api.example.com/users');
const users = await response.json();
console.log(users);`,
      hints: [
        'fetch() makes HTTP requests and returns a Promise.',
        'response.json() parses the body as JSON.',
        'Both fetch() and .json() return Promises, so await both.',
      ],
      concepts: ['fetch', 'response.json', 'async/await'],
    },
    {
      id: 'js-fetch-2',
      title: 'Response status check',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to check if a fetch response is successful.',
      skeleton: `const response = await fetch('/api/data');
if (!response.__BLANK__) {
  throw new Error(\`HTTP error: \${response.__BLANK__}\`);
}
const data = await response.json();`,
      solution: `const response = await fetch('/api/data');
if (!response.ok) {
  throw new Error(\`HTTP error: \${response.status}\`);
}
const data = await response.json();`,
      hints: [
        'response.ok is true for status 200-299.',
        'response.status is the numeric HTTP status code.',
        'fetch does NOT throw on 404 or 500 -- you must check manually.',
      ],
      concepts: ['response.ok', 'response.status', 'error handling'],
    },
    {
      id: 'js-fetch-3',
      title: 'POST request with JSON',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to send a POST request with a JSON body.',
      skeleton: `const response = await fetch('/api/users', {
  __BLANK__: 'POST',
  __BLANK__: { 'Content-Type': 'application/json' },
  __BLANK__: JSON.stringify({ name: 'Alice', age: 30 }),
});`,
      solution: `const response = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice', age: 30 }),
});`,
      hints: [
        'method specifies the HTTP method.',
        'headers is an object with header name-value pairs.',
        'body must be a string (JSON.stringify for objects).',
      ],
      concepts: ['POST request', 'headers', 'JSON.stringify'],
    },
    {
      id: 'js-fetch-4',
      title: 'Headers object',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to work with the Headers object.',
      skeleton: `const headers = new __BLANK__();
headers.__BLANK__('Content-Type', 'application/json');
headers.__BLANK__('Authorization', 'Bearer token123');
console.log(headers.__BLANK__('Content-Type')); // 'application/json'
console.log(headers.__BLANK__('X-Custom'));      // false`,
      solution: `const headers = new Headers();
headers.set('Content-Type', 'application/json');
headers.set('Authorization', 'Bearer token123');
console.log(headers.get('Content-Type')); // 'application/json'
console.log(headers.has('X-Custom'));      // false`,
      hints: [
        'new Headers() creates a Headers object.',
        '.set() adds or updates a header.',
        '.get() retrieves and .has() checks existence.',
      ],
      concepts: ['Headers', 'set', 'get', 'has'],
    },
    {
      id: 'js-fetch-5',
      title: 'FormData submission',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to submit form data with fetch.',
      skeleton: `const form = document.querySelector('form');
const data = new __BLANK__(form);
data.__BLANK__('extra', 'value');

await fetch('/api/upload', {
  method: 'POST',
  __BLANK__: data,
  // Note: do NOT set Content-Type header -- browser sets it with boundary
});`,
      solution: `const form = document.querySelector('form');
const data = new FormData(form);
data.append('extra', 'value');

await fetch('/api/upload', {
  method: 'POST',
  body: data,
});`,
      hints: [
        'new FormData(form) collects all form fields.',
        '.append() adds additional fields.',
        'Do NOT set Content-Type -- the browser adds the multipart boundary.',
      ],
      concepts: ['FormData', 'file upload', 'multipart'],
    },
    {
      id: 'js-fetch-6',
      title: 'Predict fetch error behavior',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict whether fetch rejects on a 404 response.',
      skeleton: `try {
  const response = await fetch('/api/nonexistent');
  console.log('resolved');
  console.log(response.ok);
  console.log(response.status);
} catch (err) {
  console.log('rejected');
  console.log(err.message);
}
// Assume the server returns a 404 status`,
      solution: `// Output:
// 'resolved'
// false
// 404
// fetch resolves (does NOT reject) on HTTP errors like 404.
// It only rejects on network failures (DNS, offline, etc.).
// You must check response.ok or response.status manually.`,
      hints: [
        'fetch only rejects on network errors, not HTTP errors.',
        'A 404 response still resolves the Promise.',
        'response.ok will be false for status 404.',
      ],
      concepts: ['fetch error handling', 'network vs HTTP errors'],
    },
    {
      id: 'js-fetch-7',
      title: 'AbortController with fetch',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a fetchWithTimeout function that aborts the request after a specified timeout.',
      skeleton: `// fetchWithTimeout(url, options, timeoutMs) -- fetches with a timeout
// Throws an error if the request takes longer than timeoutMs
`,
      solution: `async function fetchWithTimeout(url, options = {}, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}`,
      hints: [
        'Create an AbortController and pass its signal to fetch.',
        'Use setTimeout to abort after the timeout period.',
        'Clear the timeout if the request completes in time.',
      ],
      concepts: ['AbortController', 'timeout', 'signal'],
    },
    {
      id: 'js-fetch-8',
      title: 'Fetch retry logic',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a fetchWithRetry function that retries failed requests up to a max number of times.',
      skeleton: `// fetchWithRetry(url, options, maxRetries) -- retries on failure
// Waits 1 second between retries (exponential backoff)
`,
      solution: `async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
      if (attempt === maxRetries) return response;
    } catch (err) {
      if (attempt === maxRetries) throw err;
    }
    await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)));
  }
}`,
      hints: [
        'Loop from 0 to maxRetries.',
        'If fetch throws or response is not ok, retry.',
        'Wait with exponential backoff: 1s, 2s, 4s, etc.',
      ],
      concepts: ['retry logic', 'exponential backoff', 'error recovery'],
    },
    {
      id: 'js-fetch-9',
      title: 'Fetch wrapper with interceptors',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a createFetchClient that adds auth headers and handles JSON automatically.',
      skeleton: `// createFetchClient(baseUrl, token) returns { get, post, put, del }
// Each method auto-adds Authorization header and parses JSON response
`,
      solution: `function createFetchClient(baseUrl, token) {
  async function request(path, options = {}) {
    const response = await fetch(baseUrl + path, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${token}\`,
        ...options.headers,
      },
    });
    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
    }
    return response.json();
  }

  return {
    get: (path) => request(path),
    post: (path, data) => request(path, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    put: (path, data) => request(path, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    del: (path) => request(path, { method: 'DELETE' }),
  };
}`,
      hints: [
        'Create a base request function that adds headers.',
        'Each method calls request with the appropriate HTTP method.',
        'Automatically check response.ok and parse JSON.',
      ],
      concepts: ['fetch wrapper', 'API client', 'interceptor pattern'],
    },
    {
      id: 'js-fetch-10',
      title: 'Parallel requests',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that makes multiple fetch requests in parallel and returns all results.',
      skeleton: `// fetchAll(urls) -- fetches all URLs in parallel, returns array of JSON data
// If any request fails, still returns results for successful ones (with null for failures)
`,
      solution: `async function fetchAll(urls) {
  const promises = urls.map(async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) return null;
      return await response.json();
    } catch {
      return null;
    }
  });

  return Promise.all(promises);
}`,
      hints: [
        'Map each URL to a fetch promise.',
        'Use Promise.all to wait for all in parallel.',
        'Wrap each fetch in try/catch to handle individual failures.',
      ],
      concepts: ['Promise.all', 'parallel requests', 'error isolation'],
    },
    {
      id: 'js-fetch-11',
      title: 'Predict response body consumption',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict what happens when you read a response body twice.',
      skeleton: `const response = await fetch('/api/data');
const json1 = await response.json();
console.log(typeof json1);

try {
  const json2 = await response.json();
  console.log(typeof json2);
} catch (err) {
  console.log(err.constructor.name);
}`,
      solution: `// Output:
// 'object'
// 'TypeError'
// The response body can only be consumed once.
// The second .json() call throws a TypeError because
// the body stream has already been read and is locked.`,
      hints: [
        'Response body is a ReadableStream that can only be read once.',
        'Calling .json() a second time throws TypeError.',
        'To read twice, clone the response first: response.clone().',
      ],
      concepts: ['body consumption', 'ReadableStream', 'response.clone'],
    },
    {
      id: 'js-fetch-12',
      title: 'Predict fetch with AbortController',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the error type when aborting a fetch request.',
      skeleton: `const controller = new AbortController();
controller.abort(); // Abort immediately before fetch

try {
  await fetch('/api/data', { signal: controller.signal });
  console.log('success');
} catch (err) {
  console.log(err.name);
  console.log(err instanceof DOMException);
}`,
      solution: `// Output:
// 'AbortError'
// true
// Aborting before or during fetch throws an AbortError.
// It is a DOMException with name 'AbortError'.`,
      hints: [
        'Aborting a fetch throws an AbortError.',
        'AbortError is a DOMException.',
        'The signal is already aborted, so fetch rejects immediately.',
      ],
      concepts: ['AbortError', 'DOMException', 'cancellation'],
    },
    {
      id: 'js-fetch-13',
      title: 'Fix the double-read bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code tries to log the response and also parse it, but fails. Fix it.',
      skeleton: `async function fetchAndLog(url) {
  const response = await fetch(url);
  const text = await response.text();
  console.log('Raw response:', text);
  const data = await response.json(); // TypeError: body already read
  return data;
}`,
      solution: `async function fetchAndLog(url) {
  const response = await fetch(url);
  const text = await response.text();
  console.log('Raw response:', text);
  const data = JSON.parse(text);
  return data;
}`,
      hints: [
        'The body can only be consumed once.',
        'Read as text first, then parse with JSON.parse().',
        'Or use response.clone() before the first read.',
      ],
      concepts: ['body consumption', 'JSON.parse', 'response.clone'],
    },
    {
      id: 'js-fetch-14',
      title: 'Fix the CORS preflight issue',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This fetch fails because custom headers trigger a CORS preflight. Fix the client-side code.',
      skeleton: `async function fetchData(url) {
  const response = await fetch(url, {
    headers: {
      'X-Custom-Header': 'value',
      'Content-Type': 'application/json',
    },
    // Bug: no CORS mode specified, and server may not handle preflight
  });
  return response.json();
}`,
      solution: `async function fetchData(url) {
  const response = await fetch(url, {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    // Removed non-standard header that triggers preflight.
    // If the custom header is truly needed, the server must
    // respond to OPTIONS with Access-Control-Allow-Headers.
  });
  return response.json();
}`,
      hints: [
        'Custom headers like X-Custom-Header trigger a CORS preflight.',
        'Either remove non-essential custom headers or ensure the server handles OPTIONS.',
        'Set mode: "cors" explicitly and use only safe headers.',
      ],
      concepts: ['CORS', 'preflight', 'safe headers'],
    },
    {
      id: 'js-fetch-15',
      title: 'Fix the missing error throw',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'This fetch wrapper silently returns undefined on HTTP errors. Fix it to properly throw.',
      skeleton: `async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(\`Error: \${response.status}\`);
      // Bug: logs error but does not throw or return
    }
    return await response.json();
  } catch (err) {
    console.error('Network error:', err);
  }
}`,
      solution: `async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(\`HTTP \${response.status}: \${body}\`);
  }
  return response.json();
}`,
      hints: [
        'After checking !response.ok, throw an Error.',
        'Include the status and response body in the error message.',
        'Let the caller handle errors instead of silently swallowing them.',
      ],
      concepts: ['error throwing', 'fetch error handling'],
    },
    {
      id: 'js-fetch-16',
      title: 'URLSearchParams',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function that builds a URL with query parameters using URLSearchParams.',
      skeleton: `// buildUrl(base, params) -- params is an object
// Example: buildUrl('/api/search', { q: 'hello', page: 2 })
// => '/api/search?q=hello&page=2'
`,
      solution: `function buildUrl(base, params) {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value));
    }
  }
  const query = searchParams.toString();
  return query ? \`\${base}?\${query}\` : base;
}`,
      hints: [
        'new URLSearchParams() creates a query string builder.',
        'Use .set(key, value) to add parameters.',
        '.toString() produces the encoded query string.',
      ],
      concepts: ['URLSearchParams', 'query strings', 'URL building'],
    },
    {
      id: 'js-fetch-17',
      title: 'Streaming response',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function that reads a streaming response body chunk by chunk.',
      skeleton: `// streamFetch(url, onChunk) -- reads the response body as a stream
// onChunk(text) is called for each decoded text chunk
`,
      solution: `async function streamFetch(url, onChunk) {
  const response = await fetch(url);
  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const text = decoder.decode(value, { stream: true });
    onChunk(text);
  }
}`,
      hints: [
        'response.body is a ReadableStream.',
        'Use .getReader() to get a reader, then .read() in a loop.',
        'Use TextDecoder to convert Uint8Array chunks to strings.',
      ],
      concepts: ['ReadableStream', 'streaming', 'TextDecoder'],
    },
    {
      id: 'js-fetch-18',
      title: 'Request object',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function that creates a reusable Request object and clones it for retry.',
      skeleton: `// createRetryableRequest(url, options) returns { execute, retry }
// execute() sends the request
// retry() clones and resends the original request
`,
      solution: `function createRetryableRequest(url, options = {}) {
  const originalRequest = new Request(url, options);

  async function execute(request) {
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}\`);
    }
    return response.json();
  }

  return {
    execute: () => execute(originalRequest.clone()),
    retry: () => execute(originalRequest.clone()),
  };
}`,
      hints: [
        'new Request(url, options) creates a Request object.',
        'request.clone() creates a copy (body can only be read once).',
        'Always clone before sending to allow retries.',
      ],
      concepts: ['Request object', 'clone', 'retry'],
    },
    {
      id: 'js-fetch-19',
      title: 'Refactor XHR to fetch',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this XMLHttpRequest code to use the modern Fetch API.',
      skeleton: `function getData(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      callback(null, JSON.parse(xhr.responseText));
    } else {
      callback(new Error('HTTP ' + xhr.status));
    }
  };
  xhr.onerror = function() {
    callback(new Error('Network error'));
  };
  xhr.send();
}`,
      solution: `async function getData(url) {
  const response = await fetch(url, {
    headers: { 'Accept': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}\`);
  }

  return response.json();
}`,
      hints: [
        'Replace XMLHttpRequest with fetch().',
        'Replace callbacks with async/await.',
        'Use response.ok instead of checking status ranges manually.',
      ],
      concepts: ['fetch migration', 'XHR replacement', 'async/await'],
    },
    {
      id: 'js-fetch-20',
      title: 'Refactor fetch chain to async/await',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this Promise chain fetch code to use async/await.',
      skeleton: `function getUser(id) {
  return fetch(\`/api/users/\${id}\`)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      return response.json();
    })
    .then(function(user) {
      return fetch(\`/api/users/\${id}/posts\`)
        .then(function(response) {
          return response.json();
        })
        .then(function(posts) {
          user.posts = posts;
          return user;
        });
    })
    .catch(function(err) {
      console.error('Error:', err);
      throw err;
    });
}`,
      solution: `async function getUser(id) {
  const userResponse = await fetch(\`/api/users/\${id}\`);
  if (!userResponse.ok) {
    throw new Error('Failed to fetch user');
  }
  const user = await userResponse.json();

  const postsResponse = await fetch(\`/api/users/\${id}/posts\`);
  const posts = await postsResponse.json();
  user.posts = posts;

  return user;
}`,
      hints: [
        'Replace .then() chains with await.',
        'Flatten nested Promises into sequential awaits.',
        'Error handling uses try/catch (or let the error propagate).',
      ],
      concepts: ['async/await', 'Promise chain refactoring'],
    },
  ],
};
