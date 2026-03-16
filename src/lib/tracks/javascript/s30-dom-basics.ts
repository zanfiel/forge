import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-dom',
  title: '30. DOM Basics',
  explanation: `## DOM Basics

The Document Object Model (DOM) is the browser's in-memory representation of an HTML document as a tree of nodes.

\`\`\`javascript
// Selecting elements
document.getElementById('app');
document.querySelector('.card');          // first match
document.querySelectorAll('.card');       // all matches (NodeList)

// Reading/writing content
el.textContent = 'Safe text';            // escapes HTML
el.innerHTML = '<b>Bold</b>';            // parses HTML (XSS risk!)

// Attributes and classes
el.getAttribute('data-id');
el.setAttribute('role', 'button');
el.classList.add('active');
el.classList.toggle('hidden');

// Creating and inserting
const div = document.createElement('div');
div.textContent = 'Hello';
document.body.appendChild(div);

// Dataset
el.dataset.userId = '42'; // <div data-user-id="42">
\`\`\`

Modern DOM work uses querySelector, classList, dataset, and textContent. Avoid innerHTML with user data.`,
  exercises: [
    {
      id: 'js-dom-1',
      title: 'getElementById',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to select an element by ID and read its text.',
      skeleton: `const heading = document.__BLANK__('main-title');
const text = heading.__BLANK__;
console.log(text);`,
      solution: `const heading = document.getElementById('main-title');
const text = heading.textContent;
console.log(text);`,
      hints: [
        'getElementById takes a string ID (without #).',
        'textContent reads the text inside an element.',
        'document.getElementById returns a single element or null.',
      ],
      concepts: ['getElementById', 'textContent'],
    },
    {
      id: 'js-dom-2',
      title: 'querySelector and querySelectorAll',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to select elements using CSS selectors.',
      skeleton: `const firstCard = document.__BLANK__('.card');
const allCards = document.__BLANK__('.card');
console.log(allCards.__BLANK__); // number of matching elements`,
      solution: `const firstCard = document.querySelector('.card');
const allCards = document.querySelectorAll('.card');
console.log(allCards.length); // number of matching elements`,
      hints: [
        'querySelector returns the first matching element.',
        'querySelectorAll returns a NodeList of all matches.',
        'NodeList has a .length property.',
      ],
      concepts: ['querySelector', 'querySelectorAll', 'NodeList'],
    },
    {
      id: 'js-dom-3',
      title: 'classList manipulation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to add, remove, and toggle CSS classes.',
      skeleton: `const el = document.querySelector('.box');
el.classList.__BLANK__('active');      // add class
el.classList.__BLANK__('hidden');      // remove class
el.classList.__BLANK__('highlighted'); // toggle class
console.log(el.classList.__BLANK__('active')); // true`,
      solution: `const el = document.querySelector('.box');
el.classList.add('active');      // add class
el.classList.remove('hidden');      // remove class
el.classList.toggle('highlighted'); // toggle class
console.log(el.classList.contains('active')); // true`,
      hints: [
        'classList.add(), .remove(), .toggle(), .contains().',
        '.add() adds the class, .remove() removes it.',
        '.toggle() adds if missing, removes if present.',
      ],
      concepts: ['classList', 'add', 'remove', 'toggle', 'contains'],
    },
    {
      id: 'js-dom-4',
      title: 'getAttribute / setAttribute',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to read and write HTML attributes.',
      skeleton: `const link = document.querySelector('a');
const href = link.__BLANK__('href');
link.__BLANK__('target', '_blank');
link.__BLANK__('rel', 'noopener');`,
      solution: `const link = document.querySelector('a');
const href = link.getAttribute('href');
link.setAttribute('target', '_blank');
link.setAttribute('rel', 'noopener');`,
      hints: [
        'getAttribute reads an attribute value.',
        'setAttribute sets or creates an attribute.',
        'Both take the attribute name as the first argument.',
      ],
      concepts: ['getAttribute', 'setAttribute'],
    },
    {
      id: 'js-dom-5',
      title: 'dataset properties',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to read and write data attributes via the dataset property.',
      skeleton: `// HTML: <div id="user" data-user-id="42" data-role="admin">
const el = document.getElementById('user');
console.log(el.__BLANK__.userId);  // '42'
console.log(el.__BLANK__.role);    // 'admin'
el.__BLANK__.status = 'active';    // adds data-status="active"`,
      solution: `// HTML: <div id="user" data-user-id="42" data-role="admin">
const el = document.getElementById('user');
console.log(el.dataset.userId);  // '42'
console.log(el.dataset.role);    // 'admin'
el.dataset.status = 'active';    // adds data-status="active"`,
      hints: [
        'dataset converts data-* attributes to camelCase.',
        'data-user-id becomes dataset.userId.',
        'Assign to dataset to set data attributes.',
      ],
      concepts: ['dataset', 'data attributes', 'camelCase conversion'],
    },
    {
      id: 'js-dom-6',
      title: 'createElement and appendChild',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to create an element and add it to the page.',
      skeleton: `const para = document.__BLANK__('p');
para.__BLANK__ = 'Hello, DOM!';
para.classList.add('message');
document.body.__BLANK__(para);`,
      solution: `const para = document.createElement('p');
para.textContent = 'Hello, DOM!';
para.classList.add('message');
document.body.appendChild(para);`,
      hints: [
        'createElement takes a tag name string.',
        'Set textContent for the element text.',
        'appendChild adds the element as the last child.',
      ],
      concepts: ['createElement', 'textContent', 'appendChild'],
    },
    {
      id: 'js-dom-7',
      title: 'Predict NodeList vs HTMLCollection',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the differences between NodeList and HTMLCollection.',
      skeleton: `// Assume: <div class="item">A</div> <div class="item">B</div>
const nodeList = document.querySelectorAll('.item');
const htmlColl = document.getElementsByClassName('item');

console.log(nodeList instanceof NodeList);
console.log(htmlColl instanceof HTMLCollection);
console.log(typeof nodeList.forEach);
console.log(typeof htmlColl.forEach);`,
      solution: `// Output:
// true
// true
// 'function'
// 'undefined'
// querySelectorAll returns a static NodeList which has .forEach().
// getElementsByClassName returns a live HTMLCollection which does NOT have .forEach().
// To iterate an HTMLCollection, use Array.from() or a for loop.`,
      hints: [
        'querySelectorAll returns a NodeList (static, has forEach).',
        'getElementsByClassName returns an HTMLCollection (live, no forEach).',
        'HTMLCollection is live -- it updates when the DOM changes.',
      ],
      concepts: ['NodeList', 'HTMLCollection', 'live vs static'],
    },
    {
      id: 'js-dom-8',
      title: 'Predict innerHTML vs textContent',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the difference between innerHTML and textContent.',
      skeleton: `// Assume: <div id="test"><b>Hello</b> World</div>
const el = document.getElementById('test');

console.log(el.textContent);
console.log(el.innerHTML);
console.log(el.innerText === el.textContent);`,
      solution: `// Output:
// 'Hello World'
// '<b>Hello</b> World'
// true (usually, though innerText respects CSS visibility and textContent does not)
// textContent returns all text without HTML tags.
// innerHTML returns the raw HTML string including tags.
// innerText is layout-aware; textContent is not.`,
      hints: [
        'textContent strips all HTML tags and returns plain text.',
        'innerHTML preserves the HTML markup.',
        'innerText respects CSS display/visibility; textContent does not.',
      ],
      concepts: ['textContent', 'innerHTML', 'innerText'],
    },
    {
      id: 'js-dom-9',
      title: 'Predict DOM traversal',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict DOM traversal results.',
      skeleton: `// Assume: <ul id="list"><li>A</li><li>B</li><li>C</li></ul>
const ul = document.getElementById('list');

console.log(ul.children.length);
console.log(ul.firstElementChild.textContent);
console.log(ul.lastElementChild.textContent);
console.log(ul.children[1].previousElementSibling.textContent);`,
      solution: `// Output:
// 3
// 'A'
// 'C'
// 'A'
// ul.children has 3 <li> elements.
// firstElementChild is the first <li> with text 'A'.
// lastElementChild is the last <li> with text 'C'.
// children[1] is 'B', its previousElementSibling is 'A'.`,
      hints: [
        'children is an HTMLCollection of element children only.',
        'firstElementChild/lastElementChild skip text nodes.',
        'previousElementSibling is the prior element sibling.',
      ],
      concepts: ['DOM traversal', 'children', 'siblings'],
    },
    {
      id: 'js-dom-10',
      title: 'Build a list from an array',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that creates a <ul> with <li> children from an array of strings.',
      skeleton: `// buildList(items) -- returns a <ul> element with <li> for each item
// Example: buildList(['A', 'B', 'C']) => <ul><li>A</li><li>B</li><li>C</li></ul>
`,
      solution: `function buildList(items) {
  const ul = document.createElement('ul');
  for (const item of items) {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  }
  return ul;
}`,
      hints: [
        'Create a <ul> element first.',
        'Loop over items, create a <li> for each, set textContent.',
        'Append each <li> to the <ul>.',
      ],
      concepts: ['createElement', 'appendChild', 'list building'],
    },
    {
      id: 'js-dom-11',
      title: 'Build a table from data',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that creates an HTML table from a 2D array.',
      skeleton: `// buildTable(data) -- first row is headers (<th>), rest are data (<td>)
// data = [['Name','Age'],['Alice',30],['Bob',25]]
`,
      solution: `function buildTable(data) {
  const table = document.createElement('table');

  data.forEach((row, rowIndex) => {
    const tr = document.createElement('tr');
    row.forEach(cell => {
      const el = document.createElement(rowIndex === 0 ? 'th' : 'td');
      el.textContent = cell;
      tr.appendChild(el);
    });
    table.appendChild(tr);
  });

  return table;
}`,
      hints: [
        'Use <th> for the first row (headers), <td> for the rest.',
        'Create a <tr> for each row, then cells inside.',
        'Append each <tr> to the <table>.',
      ],
      concepts: ['table creation', 'createElement', 'DOM building'],
    },
    {
      id: 'js-dom-12',
      title: 'DocumentFragment for bulk inserts',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that uses DocumentFragment to efficiently add 1000 items to a list.',
      skeleton: `// addItems(container, count) -- adds 'count' <li> elements
// Use DocumentFragment to minimize reflows
`,
      solution: `function addItems(container, count) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const li = document.createElement('li');
    li.textContent = \`Item \${i + 1}\`;
    fragment.appendChild(li);
  }
  container.appendChild(fragment);
}`,
      hints: [
        'document.createDocumentFragment() creates an off-DOM container.',
        'Append all items to the fragment first.',
        'Then append the fragment to the container in one operation.',
      ],
      concepts: ['DocumentFragment', 'performance', 'batch DOM insertion'],
    },
    {
      id: 'js-dom-13',
      title: 'Fix the innerHTML XSS bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code uses innerHTML with user input, creating an XSS vulnerability. Fix it.',
      skeleton: `function displayComment(container, username, comment) {
  container.innerHTML += \`
    <div class="comment">
      <strong>\${username}</strong>
      <p>\${comment}</p>
    </div>
  \`;
}

// username could be: <img src=x onerror="alert('XSS')">`,
      solution: `function displayComment(container, username, comment) {
  const div = document.createElement('div');
  div.className = 'comment';

  const strong = document.createElement('strong');
  strong.textContent = username;

  const p = document.createElement('p');
  p.textContent = comment;

  div.appendChild(strong);
  div.appendChild(p);
  container.appendChild(div);
}`,
      hints: [
        'Never use innerHTML with user-supplied data.',
        'Use createElement and textContent instead.',
        'textContent automatically escapes HTML entities.',
      ],
      concepts: ['XSS prevention', 'textContent safety', 'DOM creation'],
    },
    {
      id: 'js-dom-14',
      title: 'Fix the live collection bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code tries to remove all items but creates an infinite loop. Fix it.',
      skeleton: `function removeAllItems() {
  const items = document.getElementsByClassName('item');
  for (let i = 0; i < items.length; i++) {
    items[i].remove();
  }
  // Bug: items is a live collection, so removing elements shifts indices
}`,
      solution: `function removeAllItems() {
  const items = document.querySelectorAll('.item');
  for (const item of items) {
    item.remove();
  }
}`,
      hints: [
        'getElementsByClassName returns a live HTMLCollection.',
        'Removing elements changes the collection during iteration.',
        'Use querySelectorAll (static NodeList) instead.',
      ],
      concepts: ['live collection', 'static NodeList', 'safe iteration'],
    },
    {
      id: 'js-dom-15',
      title: 'Fix the cloneNode bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'This clone is missing child elements. Fix the cloneNode call.',
      skeleton: `const original = document.getElementById('template');
const clone = original.cloneNode();
// Bug: clone has no children -- it is an empty element
document.body.appendChild(clone);`,
      solution: `const original = document.getElementById('template');
const clone = original.cloneNode(true);
// Pass true for a deep clone that includes all descendants
document.body.appendChild(clone);`,
      hints: [
        'cloneNode() with no arguments does a shallow clone.',
        'A shallow clone copies the element but not its children.',
        'Pass true to cloneNode(true) for a deep clone.',
      ],
      concepts: ['cloneNode', 'deep vs shallow clone'],
    },
    {
      id: 'js-dom-16',
      title: 'DOM element insertion methods',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function demonstrating prepend, before, after, and replaceWith.',
      skeleton: `// insertDemo(container) -- given a <div> with a single <p>First</p>:
// 1. Prepend a <p>Zero</p> before the first child
// 2. Add a <p>Second</p> after the existing <p>First</p>
// 3. Replace the <p>First</p> with <p>Middle</p>
`,
      solution: `function insertDemo(container) {
  const first = container.querySelector('p');

  const zero = document.createElement('p');
  zero.textContent = 'Zero';
  container.prepend(zero);

  const second = document.createElement('p');
  second.textContent = 'Second';
  first.after(second);

  const middle = document.createElement('p');
  middle.textContent = 'Middle';
  first.replaceWith(middle);
}`,
      hints: [
        'container.prepend(el) inserts as the first child.',
        'el.after(newEl) inserts newEl right after el.',
        'el.replaceWith(newEl) replaces el in the DOM.',
      ],
      concepts: ['prepend', 'after', 'replaceWith', 'DOM insertion'],
    },
    {
      id: 'js-dom-17',
      title: 'Style property manipulation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function that applies multiple inline styles to an element from an object.',
      skeleton: `// applyStyles(el, styles) -- styles is an object like { color: 'red', fontSize: '16px' }
// Apply each key-value pair to el.style
`,
      solution: `function applyStyles(el, styles) {
  for (const [prop, value] of Object.entries(styles)) {
    el.style[prop] = value;
  }
}`,
      hints: [
        'el.style accepts camelCase property names.',
        'Loop over Object.entries(styles).',
        'el.style.fontSize = "16px" sets the font-size CSS property.',
      ],
      concepts: ['style property', 'inline styles', 'Object.entries'],
    },
    {
      id: 'js-dom-18',
      title: 'DOM tree walker',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function that recursively collects all text content from a DOM subtree, returning an array of strings.',
      skeleton: `// collectText(root) -- returns array of text content from all text nodes
// Traverses the entire subtree depth-first
`,
      solution: `function collectText(root) {
  const texts = [];

  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.trim();
      if (text) texts.push(text);
    }
    for (const child of node.childNodes) {
      walk(child);
    }
  }

  walk(root);
  return texts;
}`,
      hints: [
        'Text nodes have nodeType === Node.TEXT_NODE (3).',
        'Use childNodes (not children) to include text nodes.',
        'Recurse into each child node.',
      ],
      concepts: ['DOM traversal', 'text nodes', 'recursion'],
    },
    {
      id: 'js-dom-19',
      title: 'Refactor querySelector chains',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this verbose DOM selection code to use modern methods.',
      skeleton: `function setupForm() {
  var form = document.getElementsByTagName('form')[0];
  var inputs = form.getElementsByTagName('input');
  var submitBtn = null;
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].getAttribute('type') === 'submit') {
      submitBtn = inputs[i];
      break;
    }
  }
  var errorDiv = document.getElementById('error');
  if (errorDiv.getAttribute('class').indexOf('hidden') === -1) {
    errorDiv.setAttribute('class', errorDiv.getAttribute('class') + ' hidden');
  }
  return { form: form, submitBtn: submitBtn, errorDiv: errorDiv };
}`,
      solution: `function setupForm() {
  const form = document.querySelector('form');
  const submitBtn = form.querySelector('input[type="submit"]');
  const errorDiv = document.querySelector('#error');
  errorDiv.classList.add('hidden');
  return { form, submitBtn, errorDiv };
}`,
      hints: [
        'Use querySelector with attribute selectors: input[type="submit"].',
        'Use classList.add instead of manual string manipulation.',
        'Use const and shorthand property names.',
      ],
      concepts: ['querySelector', 'classList', 'modern DOM API'],
    },
    {
      id: 'js-dom-20',
      title: 'Refactor imperative DOM to declarative',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this imperative DOM building code to a reusable helper function.',
      skeleton: `function renderUserCard(user) {
  var card = document.createElement('div');
  card.setAttribute('class', 'card');
  var name = document.createElement('h2');
  name.appendChild(document.createTextNode(user.name));
  card.appendChild(name);
  var email = document.createElement('p');
  email.appendChild(document.createTextNode(user.email));
  card.appendChild(email);
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Contact'));
  btn.setAttribute('class', 'btn');
  card.appendChild(btn);
  return card;
}`,
      solution: `function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [key, val] of Object.entries(attrs)) {
    if (key === 'className') el.className = val;
    else el.setAttribute(key, val);
  }
  for (const child of children) {
    el.appendChild(
      typeof child === 'string' ? document.createTextNode(child) : child
    );
  }
  return el;
}

function renderUserCard(user) {
  return h('div', { className: 'card' },
    h('h2', {}, user.name),
    h('p', {}, user.email),
    h('button', { className: 'btn' }, 'Contact')
  );
}`,
      hints: [
        'Create a reusable h(tag, attrs, ...children) helper.',
        'Handle string children as text nodes.',
        'Use this helper to declaratively describe the DOM tree.',
      ],
      concepts: ['declarative DOM', 'hyperscript', 'refactoring'],
    },
  ],
};
