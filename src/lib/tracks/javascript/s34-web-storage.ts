import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-storage',
  title: '34. Web Storage',
  explanation: `## Web Storage

Browsers provide multiple storage mechanisms: localStorage, sessionStorage, cookies, IndexedDB, and the Cache API.

\`\`\`javascript
// localStorage -- persists across sessions
localStorage.setItem('theme', 'dark');
localStorage.getItem('theme');        // 'dark'
localStorage.removeItem('theme');
localStorage.clear();

// sessionStorage -- cleared when tab closes
sessionStorage.setItem('temp', 'data');

// Storing objects (must serialize)
localStorage.setItem('user', JSON.stringify({ name: 'Alice' }));
const user = JSON.parse(localStorage.getItem('user'));

// Storage event -- fires in OTHER tabs
window.addEventListener('storage', (e) => {
  console.log(e.key, e.oldValue, e.newValue);
});

// IndexedDB -- async, structured, large storage
const request = indexedDB.open('myDB', 1);
\`\`\`

localStorage has a ~5MB limit and is synchronous. IndexedDB is async and supports larger datasets with indexes. The Cache API stores HTTP request/response pairs for offline support.`,
  exercises: [
    {
      id: 'js-storage-1',
      title: 'localStorage basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to store and retrieve a value from localStorage.',
      skeleton: `localStorage.__BLANK__('username', 'Alice');
const name = localStorage.__BLANK__('username');
console.log(name); // 'Alice'
localStorage.__BLANK__('username');
console.log(localStorage.__BLANK__('username')); // null`,
      solution: `localStorage.setItem('username', 'Alice');
const name = localStorage.getItem('username');
console.log(name); // 'Alice'
localStorage.removeItem('username');
console.log(localStorage.getItem('username')); // null`,
      hints: [
        'setItem(key, value) stores a string value.',
        'getItem(key) retrieves it, or null if not found.',
        'removeItem(key) deletes the entry.',
      ],
      concepts: ['localStorage', 'setItem', 'getItem', 'removeItem'],
    },
    {
      id: 'js-storage-2',
      title: 'JSON serialization for storage',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to store and retrieve an object in localStorage.',
      skeleton: `const user = { name: 'Alice', age: 30, admin: true };
localStorage.setItem('user', __BLANK__.stringify(user));

const stored = localStorage.getItem('user');
const parsed = __BLANK__.parse(stored);
console.log(parsed.name); // 'Alice'`,
      solution: `const user = { name: 'Alice', age: 30, admin: true };
localStorage.setItem('user', JSON.stringify(user));

const stored = localStorage.getItem('user');
const parsed = JSON.parse(stored);
console.log(parsed.name); // 'Alice'`,
      hints: [
        'localStorage only stores strings.',
        'Use JSON.stringify to convert objects to strings.',
        'Use JSON.parse to convert back.',
      ],
      concepts: ['JSON.stringify', 'JSON.parse', 'serialization'],
    },
    {
      id: 'js-storage-3',
      title: 'sessionStorage',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to use sessionStorage (tab-scoped storage).',
      skeleton: `__BLANK__.setItem('tempToken', 'abc123');
const token = __BLANK__.getItem('tempToken');
console.log(token); // 'abc123'
// This data is cleared when the browser tab is closed`,
      solution: `sessionStorage.setItem('tempToken', 'abc123');
const token = sessionStorage.getItem('tempToken');
console.log(token); // 'abc123'
// This data is cleared when the browser tab is closed`,
      hints: [
        'sessionStorage has the same API as localStorage.',
        'Data persists only for the current session (tab).',
        'Closing the tab clears all sessionStorage data.',
      ],
      concepts: ['sessionStorage', 'session scope'],
    },
    {
      id: 'js-storage-4',
      title: 'Storage length and key',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to iterate through all localStorage entries.',
      skeleton: `localStorage.setItem('a', '1');
localStorage.setItem('b', '2');
localStorage.setItem('c', '3');

for (let i = 0; i < localStorage.__BLANK__; i++) {
  const k = localStorage.__BLANK__(i);
  console.log(k, localStorage.getItem(k));
}`,
      solution: `localStorage.setItem('a', '1');
localStorage.setItem('b', '2');
localStorage.setItem('c', '3');

for (let i = 0; i < localStorage.length; i++) {
  const k = localStorage.key(i);
  console.log(k, localStorage.getItem(k));
}`,
      hints: [
        'localStorage.length gives the number of stored keys.',
        'localStorage.key(index) returns the key at that index.',
        'The order of keys is not guaranteed.',
      ],
      concepts: ['localStorage.length', 'localStorage.key'],
    },
    {
      id: 'js-storage-5',
      title: 'Cookie basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to set and read a cookie.',
      skeleton: `// Set a cookie with path and max-age
document.__BLANK__ = 'theme=dark; path=/; max-age=86400';

// Read all cookies
const cookies = document.__BLANK__;
console.log(cookies); // "theme=dark; other=value; ..."`,
      solution: `// Set a cookie with path and max-age
document.cookie = 'theme=dark; path=/; max-age=86400';

// Read all cookies
const cookies = document.cookie;
console.log(cookies); // "theme=dark; other=value; ..."`,
      hints: [
        'document.cookie = "..." sets (or adds) a cookie.',
        'Reading document.cookie returns all cookies as a single string.',
        'max-age is in seconds; 86400 = 24 hours.',
      ],
      concepts: ['document.cookie', 'cookie options'],
    },
    {
      id: 'js-storage-6',
      title: 'Predict storage event',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict when the storage event fires.',
      skeleton: `// Tab A:
window.addEventListener('storage', (e) => {
  console.log('storage changed:', e.key, e.newValue);
});

localStorage.setItem('test', 'hello');
// Does the storage event fire in Tab A?

// Tab B then runs:
// localStorage.setItem('test', 'world');
// Does the storage event fire in Tab A?`,
      solution: `// The storage event does NOT fire in the tab that made the change.
// Tab A setting 'test' will NOT trigger Tab A's storage listener.
// When Tab B sets 'test', Tab A's storage listener WILL fire:
// 'storage changed: test world'
// The storage event is for cross-tab communication.`,
      hints: [
        'The storage event fires in OTHER windows/tabs, not the one that changed storage.',
        'It is a cross-tab communication mechanism.',
        'The event includes key, oldValue, newValue, and url.',
      ],
      concepts: ['storage event', 'cross-tab communication'],
    },
    {
      id: 'js-storage-7',
      title: 'Type-safe storage wrapper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a storage wrapper that handles JSON serialization and provides a fallback for missing keys.',
      skeleton: `// createStorage(prefix) returns { get(key, fallback), set(key, value), remove(key) }
// All keys are prefixed to avoid collisions
// Values are JSON serialized/deserialized automatically
`,
      solution: `function createStorage(prefix) {
  function prefixedKey(key) {
    return \`\${prefix}:\${key}\`;
  }

  return {
    get(key, fallback = null) {
      try {
        const item = localStorage.getItem(prefixedKey(key));
        return item !== null ? JSON.parse(item) : fallback;
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      localStorage.setItem(prefixedKey(key), JSON.stringify(value));
    },
    remove(key) {
      localStorage.removeItem(prefixedKey(key));
    },
  };
}`,
      hints: [
        'Prefix all keys with a namespace to avoid collisions.',
        'Wrap JSON.parse in try/catch in case stored data is corrupt.',
        'Return the fallback if the key is missing or parsing fails.',
      ],
      concepts: ['storage wrapper', 'namespacing', 'error handling'],
    },
    {
      id: 'js-storage-8',
      title: 'Storage with expiration',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a storage wrapper that supports TTL (time-to-live) for entries.',
      skeleton: `// expirableStorage.set(key, value, ttlMs) -- stores with expiration
// expirableStorage.get(key) -- returns value if not expired, null otherwise
`,
      solution: `const expirableStorage = {
  set(key, value, ttlMs) {
    const entry = {
      value,
      expiry: Date.now() + ttlMs,
    };
    localStorage.setItem(key, JSON.stringify(entry));
  },

  get(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      const entry = JSON.parse(raw);
      if (Date.now() > entry.expiry) {
        localStorage.removeItem(key);
        return null;
      }
      return entry.value;
    } catch {
      return null;
    }
  },
};`,
      hints: [
        'Store the value alongside an expiry timestamp.',
        'On get, check if Date.now() exceeds the expiry.',
        'Remove expired entries when accessed.',
      ],
      concepts: ['TTL', 'expiration', 'localStorage'],
    },
    {
      id: 'js-storage-9',
      title: 'Cookie parser',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that parses document.cookie into an object.',
      skeleton: `// parseCookies() -- returns an object of { name: value } from document.cookie
// Example: "theme=dark; lang=en" => { theme: 'dark', lang: 'en' }
`,
      solution: `function parseCookies() {
  const cookies = document.cookie;
  if (!cookies) return {};

  return cookies.split(';').reduce((acc, pair) => {
    const [key, ...rest] = pair.trim().split('=');
    acc[key] = decodeURIComponent(rest.join('='));
    return acc;
  }, {});
}`,
      hints: [
        'Split document.cookie by semicolon.',
        'Trim each pair and split by first "=" only.',
        'decodeURIComponent handles encoded values.',
      ],
      concepts: ['cookie parsing', 'decodeURIComponent'],
    },
    {
      id: 'js-storage-10',
      title: 'IndexedDB basics',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that opens an IndexedDB database and creates an object store.',
      skeleton: `// openDB(name, version, storeName) -- returns a Promise<IDBDatabase>
// Creates the object store with autoIncrement during upgrade
`,
      solution: `function openDB(name, version, storeName) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name, version);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}`,
      hints: [
        'indexedDB.open returns an IDBOpenDBRequest.',
        'onupgradeneeded fires when version changes -- create stores here.',
        'Wrap in a Promise for modern async usage.',
      ],
      concepts: ['IndexedDB', 'onupgradeneeded', 'object store'],
    },
    {
      id: 'js-storage-11',
      title: 'Predict localStorage limits',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict what happens when you exceed localStorage limits.',
      skeleton: `try {
  const big = 'x'.repeat(10 * 1024 * 1024); // 10MB string
  localStorage.setItem('big', big);
  console.log('stored');
} catch (e) {
  console.log(e.name);
  console.log(e instanceof DOMException);
}`,
      solution: `// Output:
// 'QuotaExceededError'
// true
// localStorage has a ~5MB limit (varies by browser).
// Exceeding it throws a DOMException with name 'QuotaExceededError'.`,
      hints: [
        'localStorage has a ~5MB limit per origin.',
        'Exceeding the limit throws QuotaExceededError.',
        'It is a DOMException that you can catch.',
      ],
      concepts: ['storage quota', 'QuotaExceededError'],
    },
    {
      id: 'js-storage-12',
      title: 'Predict cookie behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict cookie behavior with duplicate names.',
      skeleton: `document.cookie = 'name=Alice; path=/';
document.cookie = 'name=Bob; path=/';
document.cookie = 'age=30; path=/';

// How many cookies? What is the value of 'name'?
const all = document.cookie;
console.log(all.split(';').length);`,
      solution: `// Output:
// 2
// Setting a cookie with the same name and path overwrites the previous one.
// 'name' is now 'Bob' (not duplicated).
// document.cookie contains "name=Bob; age=30" (2 cookies).`,
      hints: [
        'Setting a cookie with the same name and path replaces it.',
        'Cookies are unique per name + path + domain.',
        'The result is 2 cookies: name=Bob and age=30.',
      ],
      concepts: ['cookie uniqueness', 'cookie overwrite'],
    },
    {
      id: 'js-storage-13',
      title: 'Fix the JSON parse crash',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code crashes when localStorage contains invalid JSON. Fix it.',
      skeleton: `function loadSettings() {
  const raw = localStorage.getItem('settings');
  const settings = JSON.parse(raw);
  return settings || { theme: 'light', fontSize: 14 };
}

// Crashes if 'settings' contains invalid JSON or is null`,
      solution: `function loadSettings() {
  const defaults = { theme: 'light', fontSize: 14 };
  const raw = localStorage.getItem('settings');
  if (!raw) return defaults;
  try {
    return JSON.parse(raw) || defaults;
  } catch {
    return defaults;
  }
}`,
      hints: [
        'JSON.parse(null) throws a SyntaxError.',
        'Invalid JSON also throws SyntaxError.',
        'Check for null first, then wrap JSON.parse in try/catch.',
      ],
      concepts: ['JSON.parse safety', 'error handling'],
    },
    {
      id: 'js-storage-14',
      title: 'Fix the cookie deletion bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code tries to delete a cookie but it does not work. Fix it.',
      skeleton: `function deleteCookie(name) {
  document.cookie = name + '=';
  // Bug: cookie is not deleted, just set to empty string
}`,
      solution: `function deleteCookie(name) {
  document.cookie = \`\${name}=; path=/; max-age=0\`;
}`,
      hints: [
        'To delete a cookie, set max-age=0 or expires in the past.',
        'You must match the same path used when setting the cookie.',
        'max-age=0 tells the browser to remove the cookie immediately.',
      ],
      concepts: ['cookie deletion', 'max-age'],
    },
    {
      id: 'js-storage-15',
      title: 'Fix the IndexedDB transaction bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'This IndexedDB code uses the wrong transaction mode for writes. Fix it.',
      skeleton: `async function addItem(db, storeName, item) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const request = store.add(item);
    // Bug: 'readonly' transaction cannot write
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}`,
      solution: `async function addItem(db, storeName, item) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const request = store.add(item);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}`,
      hints: [
        'store.add() requires a readwrite transaction.',
        'Change "readonly" to "readwrite".',
        'Read operations work with "readonly"; writes need "readwrite".',
      ],
      concepts: ['IndexedDB transactions', 'readwrite mode'],
    },
    {
      id: 'js-storage-16',
      title: 'IndexedDB CRUD operations',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write helper functions for IndexedDB CRUD: put, get, getAll, delete.',
      skeleton: `// idbPut(db, store, item) -- add or update item
// idbGet(db, store, key) -- get item by key
// idbGetAll(db, store) -- get all items
// idbDelete(db, store, key) -- delete item by key
// All return Promises
`,
      solution: `function idbRequest(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function idbPut(db, storeName, item) {
  const tx = db.transaction(storeName, 'readwrite');
  return idbRequest(tx.objectStore(storeName).put(item));
}

function idbGet(db, storeName, key) {
  const tx = db.transaction(storeName, 'readonly');
  return idbRequest(tx.objectStore(storeName).get(key));
}

function idbGetAll(db, storeName) {
  const tx = db.transaction(storeName, 'readonly');
  return idbRequest(tx.objectStore(storeName).getAll());
}

function idbDelete(db, storeName, key) {
  const tx = db.transaction(storeName, 'readwrite');
  return idbRequest(tx.objectStore(storeName).delete(key));
}`,
      hints: [
        'Create a helper that wraps IDBRequest in a Promise.',
        'Use readwrite for put/delete, readonly for get.',
        'put adds or updates; get retrieves by key; getAll gets everything.',
      ],
      concepts: ['IndexedDB CRUD', 'Promise wrapper'],
    },
    {
      id: 'js-storage-17',
      title: 'Cache API basics',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write functions to cache and retrieve HTTP responses using the Cache API.',
      skeleton: `// cacheResponse(cacheName, url) -- fetches and caches the response
// getCached(cacheName, url) -- returns cached response or null
`,
      solution: `async function cacheResponse(cacheName, url) {
  const cache = await caches.open(cacheName);
  const response = await fetch(url);
  await cache.put(url, response.clone());
  return response;
}

async function getCached(cacheName, url) {
  const cache = await caches.open(cacheName);
  const response = await cache.match(url);
  return response || null;
}`,
      hints: [
        'caches.open(name) opens or creates a cache.',
        'cache.put(request, response) stores a response.',
        'Clone the response before caching (body can only be read once).',
      ],
      concepts: ['Cache API', 'caches.open', 'cache.put', 'cache.match'],
    },
    {
      id: 'js-storage-18',
      title: 'Storage quota check',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function that checks the available storage quota using the StorageManager API.',
      skeleton: `// checkStorageQuota() -- returns { usage, quota, percentUsed }
// Uses navigator.storage.estimate()
`,
      solution: `async function checkStorageQuota() {
  if (!navigator.storage || !navigator.storage.estimate) {
    return { usage: 0, quota: 0, percentUsed: 0 };
  }
  const { usage, quota } = await navigator.storage.estimate();
  return {
    usage,
    quota,
    percentUsed: quota > 0 ? Math.round((usage / quota) * 100) : 0,
  };
}`,
      hints: [
        'navigator.storage.estimate() returns { usage, quota } in bytes.',
        'Check for API availability first.',
        'Calculate percentage as (usage / quota) * 100.',
      ],
      concepts: ['StorageManager', 'storage.estimate', 'quota'],
    },
    {
      id: 'js-storage-19',
      title: 'Refactor cookie helpers',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor these verbose cookie functions to be more robust and modern.',
      skeleton: `function setCookie(name, value, days) {
  var d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  var expires = 'expires=' + d.toUTCString();
  document.cookie = name + '=' + value + ';' + expires + ';path=/';
}

function getCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length);
  }
  return null;
}`,
      solution: `function setCookie(name, value, { days = 7, path = '/', secure = true, sameSite = 'Lax' } = {}) {
  const maxAge = days * 86400;
  const parts = [
    \`\${encodeURIComponent(name)}=\${encodeURIComponent(value)}\`,
    \`max-age=\${maxAge}\`,
    \`path=\${path}\`,
    \`SameSite=\${sameSite}\`,
  ];
  if (secure) parts.push('Secure');
  document.cookie = parts.join('; ');
}

function getCookie(name) {
  const match = document.cookie.match(
    new RegExp(\`(?:^|; )\${encodeURIComponent(name)}=([^;]*)\`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}`,
      hints: [
        'Use max-age instead of expires for simpler math.',
        'Add Secure and SameSite for security.',
        'Use encodeURIComponent/decodeURIComponent for special characters.',
      ],
      concepts: ['secure cookies', 'SameSite', 'refactoring'],
    },
    {
      id: 'js-storage-20',
      title: 'Refactor raw IndexedDB to async wrapper',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this callback-heavy IndexedDB code to a Promise-based API.',
      skeleton: `function saveUser(user) {
  var request = indexedDB.open('myapp', 1);
  request.onupgradeneeded = function(event) {
    var db = event.target.result;
    db.createObjectStore('users', { keyPath: 'id' });
  };
  request.onsuccess = function(event) {
    var db = event.target.result;
    var tx = db.transaction('users', 'readwrite');
    var store = tx.objectStore('users');
    store.put(user);
    tx.oncomplete = function() {
      console.log('saved');
      db.close();
    };
    tx.onerror = function() {
      console.log('error');
      db.close();
    };
  };
}`,
      solution: `function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('myapp', 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveUser(user) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('users', 'readwrite');
    tx.objectStore('users').put(user);
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}`,
      hints: [
        'Separate database opening from operations.',
        'Wrap each IDB operation in a Promise.',
        'Use async/await for the consuming code.',
      ],
      concepts: ['IndexedDB', 'Promise wrapper', 'refactoring'],
    },
  ],
};
