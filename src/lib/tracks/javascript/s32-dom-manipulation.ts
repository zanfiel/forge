import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-dom-manip',
  title: '32. DOM Manipulation',
  explanation: `## DOM Manipulation

Advanced DOM manipulation involves observers, animations, dimensions, and efficient batch updates.

\`\`\`javascript
// IntersectionObserver -- detect element visibility
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});
observer.observe(element);

// MutationObserver -- watch for DOM changes
const mutObs = new MutationObserver((mutations) => {
  mutations.forEach(m => console.log(m.type, m.target));
});
mutObs.observe(element, { childList: true, subtree: true });

// requestAnimationFrame -- smooth animations
function animate() {
  element.style.left = \`\${pos++}px\`;
  if (pos < 300) requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// getBoundingClientRect -- element dimensions/position
const rect = element.getBoundingClientRect();
console.log(rect.top, rect.left, rect.width, rect.height);
\`\`\`

Use observers for lazy loading, scroll effects, and reactivity. Use requestAnimationFrame for smooth visual updates.`,
  exercises: [
    {
      id: 'js-dom-manip-1',
      title: 'insertAdjacentHTML',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to insert HTML before, after, and inside an element.',
      skeleton: `const el = document.querySelector('.box');
el.__BLANK__('beforebegin', '<p>Before</p>');    // before el
el.__BLANK__('afterbegin', '<p>First child</p>'); // inside, first
el.__BLANK__('beforeend', '<p>Last child</p>');   // inside, last
el.__BLANK__('afterend', '<p>After</p>');          // after el`,
      solution: `const el = document.querySelector('.box');
el.insertAdjacentHTML('beforebegin', '<p>Before</p>');
el.insertAdjacentHTML('afterbegin', '<p>First child</p>');
el.insertAdjacentHTML('beforeend', '<p>Last child</p>');
el.insertAdjacentHTML('afterend', '<p>After</p>');`,
      hints: [
        'insertAdjacentHTML takes a position and an HTML string.',
        'Positions: beforebegin, afterbegin, beforeend, afterend.',
        'beforebegin/afterend are siblings; afterbegin/beforeend are children.',
      ],
      concepts: ['insertAdjacentHTML', 'position keywords'],
    },
    {
      id: 'js-dom-manip-2',
      title: 'template element',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to use a <template> element to create DOM nodes.',
      skeleton: `// HTML: <template id="card-tpl"><div class="card"><h3></h3><p></p></div></template>
const template = document.getElementById('card-tpl');
const clone = template.__BLANK__.cloneNode(true);
clone.querySelector('h3').__BLANK__ = 'Title';
clone.querySelector('p').__BLANK__ = 'Description';
document.body.__BLANK__(clone);`,
      solution: `const template = document.getElementById('card-tpl');
const clone = template.content.cloneNode(true);
clone.querySelector('h3').textContent = 'Title';
clone.querySelector('p').textContent = 'Description';
document.body.appendChild(clone);`,
      hints: [
        'template.content returns a DocumentFragment.',
        'cloneNode(true) deep-clones the fragment.',
        'Set textContent on the cloned elements before appending.',
      ],
      concepts: ['template element', 'content property', 'cloneNode'],
    },
    {
      id: 'js-dom-manip-3',
      title: 'replaceWith and before/after',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to use replaceWith, before, and after.',
      skeleton: `const old = document.querySelector('.old');
const replacement = document.createElement('div');
replacement.textContent = 'New content';

const marker = document.querySelector('.marker');
const above = document.createElement('p');
above.textContent = 'Above';
marker.__BLANK__(above);

const below = document.createElement('p');
below.textContent = 'Below';
marker.__BLANK__(below);

old.__BLANK__(replacement);`,
      solution: `const old = document.querySelector('.old');
const replacement = document.createElement('div');
replacement.textContent = 'New content';

const marker = document.querySelector('.marker');
const above = document.createElement('p');
above.textContent = 'Above';
marker.before(above);

const below = document.createElement('p');
below.textContent = 'Below';
marker.after(below);

old.replaceWith(replacement);`,
      hints: [
        'element.before(node) inserts before the element.',
        'element.after(node) inserts after the element.',
        'element.replaceWith(node) replaces the element.',
      ],
      concepts: ['before', 'after', 'replaceWith'],
    },
    {
      id: 'js-dom-manip-4',
      title: 'getBoundingClientRect',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to get an element\'s position and dimensions.',
      skeleton: `const el = document.querySelector('.target');
const rect = el.__BLANK__();
console.log(\`Top: \${rect.__BLANK__}\`);
console.log(\`Left: \${rect.__BLANK__}\`);
console.log(\`Width: \${rect.__BLANK__}\`);
console.log(\`Height: \${rect.__BLANK__}\`);`,
      solution: `const el = document.querySelector('.target');
const rect = el.getBoundingClientRect();
console.log(\`Top: \${rect.top}\`);
console.log(\`Left: \${rect.left}\`);
console.log(\`Width: \${rect.width}\`);
console.log(\`Height: \${rect.height}\`);`,
      hints: [
        'getBoundingClientRect returns a DOMRect object.',
        'Properties: top, left, right, bottom, width, height.',
        'Values are relative to the viewport.',
      ],
      concepts: ['getBoundingClientRect', 'DOMRect'],
    },
    {
      id: 'js-dom-manip-5',
      title: 'Element dimensions',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to read different dimension properties.',
      skeleton: `const el = document.querySelector('.box');
// Content + padding
console.log(el.__BLANK__);  // clientWidth
// Content + padding + border
console.log(el.__BLANK__);  // offsetWidth
// Content + padding + overflow
console.log(el.__BLANK__);  // scrollWidth`,
      solution: `const el = document.querySelector('.box');
// Content + padding
console.log(el.clientWidth);
// Content + padding + border
console.log(el.offsetWidth);
// Content + padding + overflow
console.log(el.scrollWidth);`,
      hints: [
        'clientWidth = content + padding (no border, no scrollbar).',
        'offsetWidth = content + padding + border.',
        'scrollWidth = total scrollable width including overflow.',
      ],
      concepts: ['clientWidth', 'offsetWidth', 'scrollWidth'],
    },
    {
      id: 'js-dom-manip-6',
      title: 'IntersectionObserver basics',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Fill in the blanks to set up an IntersectionObserver for lazy loading.',
      skeleton: `const observer = new __BLANK__((entries) => {
  entries.forEach(entry => {
    if (entry.__BLANK__) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.__BLANK__(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  observer.__BLANK__(img);
});`,
      solution: `const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  observer.observe(img);
});`,
      hints: [
        'IntersectionObserver watches elements for viewport intersection.',
        'entry.isIntersecting is true when the element is visible.',
        'observer.observe() starts watching, unobserve() stops.',
      ],
      concepts: ['IntersectionObserver', 'lazy loading', 'isIntersecting'],
    },
    {
      id: 'js-dom-manip-7',
      title: 'Predict MutationObserver behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict when MutationObserver callback fires.',
      skeleton: `const target = document.createElement('div');
const log = [];

const observer = new MutationObserver((mutations) => {
  mutations.forEach(m => log.push(m.type));
});

observer.observe(target, { childList: true, attributes: true });

target.setAttribute('class', 'active');
target.appendChild(document.createElement('span'));
target.setAttribute('id', 'main');

console.log(log.length);

// After microtask queue processes:
// What will log contain?`,
      solution: `// Output:
// 0
// log is empty at the synchronous console.log.
// MutationObserver callbacks are microtasks -- they fire after
// the current synchronous code completes.
// After processing: log will be ['attributes', 'childList', 'attributes']
// (3 mutations batched into one callback).`,
      hints: [
        'MutationObserver callbacks are asynchronous (microtasks).',
        'At the synchronous console.log, log is still empty.',
        'Mutations are batched and delivered after the current script.',
      ],
      concepts: ['MutationObserver timing', 'microtask'],
    },
    {
      id: 'js-dom-manip-8',
      title: 'Predict requestAnimationFrame timing',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the execution order with requestAnimationFrame.',
      skeleton: `console.log('1');

requestAnimationFrame(() => {
  console.log('2');
});

Promise.resolve().then(() => {
  console.log('3');
});

setTimeout(() => {
  console.log('4');
}, 0);

console.log('5');`,
      solution: `// Output:
// '1'
// '5'
// '3'
// '4' (or '2' -- rAF and setTimeout(0) order is browser-dependent)
// '2' (or '4')
// Synchronous: 1, 5
// Microtask: 3 (Promise.then)
// Macrotask: 4 (setTimeout) and 2 (rAF)
// rAF runs before the next repaint; setTimeout(0) is a macrotask.
// Their relative order depends on the browser.`,
      hints: [
        'Synchronous code runs first: 1, 5.',
        'Microtasks (Promise.then) run next: 3.',
        'rAF and setTimeout(0) are both macrotasks with variable ordering.',
      ],
      concepts: ['requestAnimationFrame', 'event loop', 'execution order'],
    },
    {
      id: 'js-dom-manip-9',
      title: 'MutationObserver setup',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that watches an element for added/removed children and calls a callback.',
      skeleton: `// watchChildren(element, callback)
// callback(added, removed) called whenever children change
// Returns a disconnect function
`,
      solution: `function watchChildren(element, callback) {
  const observer = new MutationObserver((mutations) => {
    const added = [];
    const removed = [];
    for (const mutation of mutations) {
      added.push(...mutation.addedNodes);
      removed.push(...mutation.removedNodes);
    }
    if (added.length || removed.length) {
      callback(added, removed);
    }
  });

  observer.observe(element, { childList: true });

  return () => observer.disconnect();
}`,
      hints: [
        'new MutationObserver(callback) creates the observer.',
        'observer.observe(el, { childList: true }) watches for child changes.',
        'mutation.addedNodes and mutation.removedNodes list the changes.',
      ],
      concepts: ['MutationObserver', 'childList', 'disconnect'],
    },
    {
      id: 'js-dom-manip-10',
      title: 'ResizeObserver',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that monitors element size changes using ResizeObserver.',
      skeleton: `// watchSize(element, callback)
// callback({ width, height }) called when the element resizes
// Returns a disconnect function
`,
      solution: `function watchSize(element, callback) {
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect;
      callback({ width, height });
    }
  });

  observer.observe(element);

  return () => observer.disconnect();
}`,
      hints: [
        'new ResizeObserver(callback) watches for size changes.',
        'entry.contentRect contains width and height.',
        'observer.disconnect() stops all observations.',
      ],
      concepts: ['ResizeObserver', 'contentRect', 'responsive design'],
    },
    {
      id: 'js-dom-manip-11',
      title: 'Smooth scroll to element',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that smoothly scrolls to an element.',
      skeleton: `// scrollToElement(selector) -- smoothly scrolls the page to the element
`,
      solution: `function scrollToElement(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}`,
      hints: [
        'scrollIntoView() scrolls to make an element visible.',
        '{ behavior: "smooth" } enables smooth scrolling.',
        '{ block: "start" } aligns the element to the top.',
      ],
      concepts: ['scrollIntoView', 'smooth scrolling'],
    },
    {
      id: 'js-dom-manip-12',
      title: 'requestAnimationFrame animation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that animates an element from left to right using requestAnimationFrame.',
      skeleton: `// animateRight(element, distance, duration)
// Smoothly moves element 'distance' pixels to the right over 'duration' ms
`,
      solution: `function animateRight(element, distance, duration) {
  const start = performance.now();

  function frame(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    element.style.transform = \`translateX(\${progress * distance}px)\`;

    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}`,
      hints: [
        'Use performance.now() for the start time.',
        'Calculate progress as elapsed / duration (capped at 1).',
        'Use transform: translateX for GPU-accelerated movement.',
      ],
      concepts: ['requestAnimationFrame', 'animation', 'performance.now'],
    },
    {
      id: 'js-dom-manip-13',
      title: 'Fix the reflow thrashing bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code causes layout thrashing by interleaving reads and writes. Fix it.',
      skeleton: `function resizeBoxes(boxes) {
  boxes.forEach(box => {
    const width = box.offsetWidth; // READ (forces layout)
    box.style.width = (width * 2) + 'px'; // WRITE (invalidates layout)
    // Next iteration: READ forces recalculation again!
  });
}`,
      solution: `function resizeBoxes(boxes) {
  // Batch all reads first
  const widths = boxes.map(box => box.offsetWidth);

  // Then batch all writes
  boxes.forEach((box, i) => {
    box.style.width = (widths[i] * 2) + 'px';
  });
}`,
      hints: [
        'Layout thrashing: interleaving DOM reads and writes forces recalculation.',
        'Batch all reads first, then all writes.',
        'Read all offsetWidths into an array, then set all styles.',
      ],
      concepts: ['layout thrashing', 'reflow', 'batching'],
    },
    {
      id: 'js-dom-manip-14',
      title: 'Fix the IntersectionObserver memory leak',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'This IntersectionObserver never stops observing removed elements. Fix it.',
      skeleton: `const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadContent(entry.target);
      // Bug: element is loaded but still being observed
    }
  });
});

function setupLazyLoading() {
  document.querySelectorAll('[data-lazy]').forEach(el => {
    observer.observe(el);
  });
}

function loadContent(el) {
  el.innerHTML = '<p>Loaded!</p>';
  el.removeAttribute('data-lazy');
}`,
      solution: `const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadContent(entry.target);
      observer.unobserve(entry.target);
    }
  });
});

function setupLazyLoading() {
  document.querySelectorAll('[data-lazy]').forEach(el => {
    observer.observe(el);
  });
}

function loadContent(el) {
  el.innerHTML = '<p>Loaded!</p>';
  el.removeAttribute('data-lazy');
}`,
      hints: [
        'After loading content, unobserve the element.',
        'observer.unobserve(entry.target) stops watching that element.',
        'This prevents the observer from tracking already-loaded elements.',
      ],
      concepts: ['IntersectionObserver', 'unobserve', 'memory leak'],
    },
    {
      id: 'js-dom-manip-15',
      title: 'Fix the animation cancellation bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'This animation cannot be stopped because the rAF ID is not tracked. Fix it.',
      skeleton: `function startAnimation(element) {
  let pos = 0;

  function frame() {
    pos++;
    element.style.left = pos + 'px';
    requestAnimationFrame(frame);
    // Bug: no way to cancel this animation
  }

  requestAnimationFrame(frame);
}`,
      solution: `function startAnimation(element) {
  let pos = 0;
  let animId = null;

  function frame() {
    pos++;
    element.style.left = pos + 'px';
    animId = requestAnimationFrame(frame);
  }

  animId = requestAnimationFrame(frame);

  return function stop() {
    if (animId !== null) {
      cancelAnimationFrame(animId);
      animId = null;
    }
  };
}`,
      hints: [
        'requestAnimationFrame returns an ID for cancellation.',
        'Store the ID and use cancelAnimationFrame(id) to stop.',
        'Return a stop function that cancels the current frame.',
      ],
      concepts: ['cancelAnimationFrame', 'animation control'],
    },
    {
      id: 'js-dom-manip-16',
      title: 'IntersectionObserver with threshold',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function that tracks scroll progress of an element using IntersectionObserver with multiple thresholds.',
      skeleton: `// trackProgress(element, onProgress)
// onProgress(ratio) called with 0.0 to 1.0 as element scrolls into view
`,
      solution: `function trackProgress(element, onProgress) {
  const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        onProgress(entry.intersectionRatio);
      }
    },
    { threshold: thresholds }
  );

  observer.observe(element);

  return () => observer.disconnect();
}`,
      hints: [
        'Create thresholds from 0 to 1 in small steps.',
        'The observer fires at each threshold crossing.',
        'entry.intersectionRatio gives the visible percentage.',
      ],
      concepts: ['IntersectionObserver threshold', 'scroll progress'],
    },
    {
      id: 'js-dom-manip-17',
      title: 'Virtual scroll concept',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a simple virtual scroll function that only renders visible items in a container.',
      skeleton: `// virtualScroll(container, items, itemHeight, renderItem)
// Only renders items visible in the container viewport
// renderItem(item, index) returns a DOM element
`,
      solution: `function virtualScroll(container, items, itemHeight, renderItem) {
  const totalHeight = items.length * itemHeight;
  const spacer = document.createElement('div');
  spacer.style.height = totalHeight + 'px';
  container.appendChild(spacer);

  function render() {
    const scrollTop = container.scrollTop;
    const viewHeight = container.clientHeight;
    const startIdx = Math.floor(scrollTop / itemHeight);
    const endIdx = Math.min(
      startIdx + Math.ceil(viewHeight / itemHeight) + 1,
      items.length
    );

    const fragment = document.createDocumentFragment();
    for (let i = startIdx; i < endIdx; i++) {
      const el = renderItem(items[i], i);
      el.style.position = 'absolute';
      el.style.top = (i * itemHeight) + 'px';
      el.style.height = itemHeight + 'px';
      fragment.appendChild(el);
    }

    const content = container.querySelector('.vs-content');
    if (content) content.remove();
    const wrap = document.createElement('div');
    wrap.className = 'vs-content';
    wrap.appendChild(fragment);
    container.appendChild(wrap);
  }

  container.style.position = 'relative';
  container.style.overflow = 'auto';
  container.addEventListener('scroll', render);
  render();
}`,
      hints: [
        'Calculate which items are visible based on scrollTop and container height.',
        'Only render items within the visible range.',
        'Use absolute positioning so items appear at the right scroll position.',
      ],
      concepts: ['virtual scrolling', 'performance', 'DOM efficiency'],
    },
    {
      id: 'js-dom-manip-18',
      title: 'Drag and drop basics',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a simple drag handler that moves an element with the mouse.',
      skeleton: `// makeDraggable(element) -- allows the element to be dragged with the mouse
`,
      solution: `function makeDraggable(element) {
  let offsetX = 0;
  let offsetY = 0;

  function onMouseDown(e) {
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(e) {
    element.style.position = 'absolute';
    element.style.left = (e.clientX - offsetX) + 'px';
    element.style.top = (e.clientY - offsetY) + 'px';
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  element.addEventListener('mousedown', onMouseDown);
}`,
      hints: [
        'On mousedown, record the offset between mouse and element position.',
        'On mousemove, update element position minus the offset.',
        'On mouseup, remove the move and up listeners.',
      ],
      concepts: ['drag and drop', 'mouse events', 'positioning'],
    },
    {
      id: 'js-dom-manip-19',
      title: 'Refactor DOM creation to template',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this manual DOM creation to use the <template> element.',
      skeleton: `function createCard(title, body) {
  const card = document.createElement('div');
  card.className = 'card';
  const h = document.createElement('h3');
  h.textContent = title;
  card.appendChild(h);
  const p = document.createElement('p');
  p.textContent = body;
  card.appendChild(p);
  const btn = document.createElement('button');
  btn.textContent = 'Read More';
  btn.className = 'btn';
  card.appendChild(btn);
  return card;
}`,
      solution: `// Assumes HTML: <template id="card-tpl">
//   <div class="card"><h3></h3><p></p><button class="btn">Read More</button></div>
// </template>

const cardTemplate = document.getElementById('card-tpl');

function createCard(title, body) {
  const clone = cardTemplate.content.cloneNode(true);
  clone.querySelector('h3').textContent = title;
  clone.querySelector('p').textContent = body;
  return clone;
}`,
      hints: [
        'Define the structure in a <template> element in HTML.',
        'Clone the template content with .content.cloneNode(true).',
        'Fill in dynamic data with querySelector and textContent.',
      ],
      concepts: ['template element', 'cloneNode', 'refactoring'],
    },
    {
      id: 'js-dom-manip-20',
      title: 'Refactor polling to MutationObserver',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor this polling approach to use MutationObserver.',
      skeleton: `// Polls every 500ms to check if a child was added
function waitForChild(parent, selector, callback) {
  const interval = setInterval(() => {
    const child = parent.querySelector(selector);
    if (child) {
      clearInterval(interval);
      callback(child);
    }
  }, 500);
}`,
      solution: `function waitForChild(parent, selector, callback) {
  const existing = parent.querySelector(selector);
  if (existing) {
    callback(existing);
    return;
  }

  const observer = new MutationObserver((mutations) => {
    const child = parent.querySelector(selector);
    if (child) {
      observer.disconnect();
      callback(child);
    }
  });

  observer.observe(parent, { childList: true, subtree: true });
}`,
      hints: [
        'Check if the element already exists first.',
        'Use MutationObserver with childList and subtree to watch for additions.',
        'Disconnect the observer once the element is found.',
      ],
      concepts: ['MutationObserver', 'refactoring', 'no polling'],
    },
  ],
};
