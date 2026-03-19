import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'js-events',
  title: '31. DOM Events',
  explanation: `## DOM Events

Events are the mechanism for responding to user interactions and system notifications in the browser.

\`\`\`javascript
// Adding listeners
button.addEventListener('click', (e) => {
  console.log('Clicked!', e.target);
});

// Event flow: capture -> target -> bubble
div.addEventListener('click', handler, { capture: true });

// Prevent default behavior
link.addEventListener('click', (e) => {
  e.preventDefault(); // stop navigation
});

// Stop propagation
child.addEventListener('click', (e) => {
  e.stopPropagation(); // stop bubbling
});

// Event delegation
list.addEventListener('click', (e) => {
  if (e.target.matches('li')) {
    console.log('Clicked:', e.target.textContent);
  }
});

// Custom events
const event = new CustomEvent('notify', { detail: { message: 'hello' } });
element.dispatchEvent(event);
\`\`\`

Event delegation, the AbortController signal option, and CustomEvent are the modern patterns to know.`,
  exercises: [
    {
      id: 'js-events-1',
      title: 'addEventListener basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to add a click event listener to a button.',
      skeleton: `const btn = document.querySelector('#submit');
btn.__BLANK__('__BLANK__', (event) => {
  console.log('Button clicked!');
  console.log(event.__BLANK__); // the element that was clicked
});`,
      solution: `const btn = document.querySelector('#submit');
btn.addEventListener('click', (event) => {
  console.log('Button clicked!');
  console.log(event.target); // the element that was clicked
});`,
      hints: [
        'addEventListener attaches an event handler.',
        'The first argument is the event type as a string.',
        'event.target is the element that triggered the event.',
      ],
      concepts: ['addEventListener', 'click event', 'event.target'],
    },
    {
      id: 'js-events-2',
      title: 'preventDefault',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to prevent a form from submitting and a link from navigating.',
      skeleton: `const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.__BLANK__();
  console.log('Form submission prevented');
});

const link = document.querySelector('a');
link.addEventListener('click', (e) => {
  e.__BLANK__();
  console.log('Navigation prevented');
});`,
      solution: `const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Form submission prevented');
});

const link = document.querySelector('a');
link.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Navigation prevented');
});`,
      hints: [
        'preventDefault() stops the default browser action.',
        'For forms, it prevents page reload/navigation.',
        'For links, it prevents following the href.',
      ],
      concepts: ['preventDefault', 'form submit', 'link click'],
    },
    {
      id: 'js-events-3',
      title: 'stopPropagation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to stop event propagation from a child element.',
      skeleton: `const parent = document.querySelector('.parent');
const child = document.querySelector('.child');

parent.addEventListener('click', () => {
  console.log('Parent clicked');
});

child.addEventListener('click', (e) => {
  e.__BLANK__();
  console.log('Child clicked, parent will NOT see this');
});`,
      solution: `const parent = document.querySelector('.parent');
const child = document.querySelector('.child');

parent.addEventListener('click', () => {
  console.log('Parent clicked');
});

child.addEventListener('click', (e) => {
  e.stopPropagation();
  console.log('Child clicked, parent will NOT see this');
});`,
      hints: [
        'stopPropagation() prevents the event from bubbling up.',
        'The parent handler will not fire if propagation is stopped.',
        'Use this when you need to contain an event to a specific element.',
      ],
      concepts: ['stopPropagation', 'event bubbling'],
    },
    {
      id: 'js-events-4',
      title: 'event.target vs event.currentTarget',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to distinguish target from currentTarget.',
      skeleton: `const list = document.querySelector('ul');
list.addEventListener('click', (e) => {
  console.log(e.__BLANK__);       // the <li> that was actually clicked
  console.log(e.__BLANK__);       // the <ul> where the handler is attached
});`,
      solution: `const list = document.querySelector('ul');
list.addEventListener('click', (e) => {
  console.log(e.target);        // the <li> that was actually clicked
  console.log(e.currentTarget); // the <ul> where the handler is attached
});`,
      hints: [
        'target is the element that originated the event.',
        'currentTarget is the element the handler is attached to.',
        'They differ when the event bubbles up from a child.',
      ],
      concepts: ['event.target', 'event.currentTarget'],
    },
    {
      id: 'js-events-5',
      title: 'Event delegation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to implement event delegation on a list.',
      skeleton: `const ul = document.querySelector('#todo-list');
ul.addEventListener('click', (e) => {
  if (e.__BLANK__.__BLANK__('li')) {
    console.log('Clicked item:', e.target.textContent);
  }
});`,
      solution: `const ul = document.querySelector('#todo-list');
ul.addEventListener('click', (e) => {
  if (e.target.matches('li')) {
    console.log('Clicked item:', e.target.textContent);
  }
});`,
      hints: [
        'Event delegation attaches one handler to a parent.',
        'Use e.target.matches(selector) to check which child was clicked.',
        'matches() returns true if the element matches the CSS selector.',
      ],
      concepts: ['event delegation', 'matches'],
    },
    {
      id: 'js-events-6',
      title: 'once option',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'javascript',
      goal: 'Fill in the blanks to add an event listener that fires only once.',
      skeleton: `const btn = document.querySelector('#init');
btn.addEventListener('click', () => {
  console.log('Initializing... (this runs only once)');
}, { __BLANK__: true });`,
      solution: `const btn = document.querySelector('#init');
btn.addEventListener('click', () => {
  console.log('Initializing... (this runs only once)');
}, { once: true });`,
      hints: [
        'The third argument can be an options object.',
        'The once option auto-removes the listener after first call.',
        '{ once: true } replaces the need for manual removeEventListener.',
      ],
      concepts: ['once option', 'auto-removal'],
    },
    {
      id: 'js-events-7',
      title: 'Predict event bubbling order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the order of console.log outputs during event bubbling.',
      skeleton: `// HTML: <div id="outer"><div id="inner"><button id="btn">Click</button></div></div>
const outer = document.getElementById('outer');
const inner = document.getElementById('inner');
const btn = document.getElementById('btn');

outer.addEventListener('click', () => console.log('outer'));
inner.addEventListener('click', () => console.log('inner'));
btn.addEventListener('click', () => console.log('btn'));

// User clicks the button`,
      solution: `// Output:
// 'btn'
// 'inner'
// 'outer'
// Events bubble up from the target (btn) through ancestors.
// The target phase fires first, then bubbling goes up the tree.`,
      hints: [
        'Events bubble from the target upward.',
        'The handler on the clicked element fires first.',
        'Then parent, then grandparent, etc.',
      ],
      concepts: ['event bubbling', 'event flow'],
    },
    {
      id: 'js-events-8',
      title: 'Predict capture vs bubble order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Predict the output when mixing capture and bubble phase listeners.',
      skeleton: `// HTML: <div id="parent"><button id="child">Click</button></div>
const parent = document.getElementById('parent');
const child = document.getElementById('child');

parent.addEventListener('click', () => console.log('parent-bubble'));
parent.addEventListener('click', () => console.log('parent-capture'), true);
child.addEventListener('click', () => console.log('child-bubble'));
child.addEventListener('click', () => console.log('child-capture'), true);

// User clicks the child button`,
      solution: `// Output:
// 'parent-capture'
// 'child-bubble'
// 'child-capture'
// 'parent-bubble'
// Event flow: capture phase (top-down) -> target phase -> bubble phase (bottom-up).
// Capture: parent-capture fires first.
// Target: child handlers fire in registration order (bubble then capture).
// Bubble: parent-bubble fires last.`,
      hints: [
        'Event flow: capture (top-down), target, bubble (bottom-up).',
        'The third argument true means capture phase.',
        'At the target element, handlers fire in registration order.',
      ],
      concepts: ['capture phase', 'bubble phase', 'event flow'],
    },
    {
      id: 'js-events-9',
      title: 'CustomEvent with detail',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that creates and dispatches a custom event with detail data, and a function that listens for it.',
      skeleton: `// emitNotification(element, message) -- dispatches 'notification' event with detail.message
// onNotification(element, callback) -- listens for 'notification' event, passes detail to callback
`,
      solution: `function emitNotification(element, message) {
  const event = new CustomEvent('notification', {
    detail: { message },
    bubbles: true,
  });
  element.dispatchEvent(event);
}

function onNotification(element, callback) {
  element.addEventListener('notification', (e) => {
    callback(e.detail);
  });
}`,
      hints: [
        'new CustomEvent(type, { detail: data }) creates a custom event.',
        'Set bubbles: true if you want the event to bubble.',
        'element.dispatchEvent(event) fires the event.',
      ],
      concepts: ['CustomEvent', 'dispatchEvent', 'detail'],
    },
    {
      id: 'js-events-10',
      title: 'Signal option (AbortController)',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that adds event listeners with AbortController signal for easy cleanup.',
      skeleton: `// setupListeners(element) -- adds click, mouseover, keydown listeners
// Returns an abort function that removes all listeners at once
`,
      solution: `function setupListeners(element) {
  const controller = new AbortController();
  const { signal } = controller;

  element.addEventListener('click', (e) => {
    console.log('click', e.target);
  }, { signal });

  element.addEventListener('mouseover', (e) => {
    console.log('hover', e.target);
  }, { signal });

  element.addEventListener('keydown', (e) => {
    console.log('key', e.key);
  }, { signal });

  return () => controller.abort();
}`,
      hints: [
        'Create an AbortController and pass its signal to each listener.',
        'Pass { signal } as the options object to addEventListener.',
        'Calling controller.abort() removes all listeners at once.',
      ],
      concepts: ['AbortController', 'signal option', 'cleanup'],
    },
    {
      id: 'js-events-11',
      title: 'Keyboard event handler',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write a function that listens for keyboard shortcuts: Ctrl+S, Escape, and Enter.',
      skeleton: `// setupKeyboard(handler) -- handler is { onSave(), onCancel(), onSubmit() }
// Ctrl+S -> handler.onSave() (also prevent default)
// Escape -> handler.onCancel()
// Enter -> handler.onSubmit()
`,
      solution: `function setupKeyboard(handler) {
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      handler.onSave();
    } else if (e.key === 'Escape') {
      handler.onCancel();
    } else if (e.key === 'Enter') {
      handler.onSubmit();
    }
  });
}`,
      hints: [
        'Check e.ctrlKey for the Control modifier.',
        'Use e.key for the actual key pressed.',
        'e.preventDefault() stops the browser save dialog on Ctrl+S.',
      ],
      concepts: ['keydown event', 'keyboard shortcuts', 'e.key'],
    },
    {
      id: 'js-events-12',
      title: 'Event delegation with closest',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'Write event delegation that works even when the click target is a nested child (use closest).',
      skeleton: `// delegateClick(container, selector, callback)
// Handles clicks where the actual target might be inside the selector match
// e.g., clicking a <span> inside a <button class="action">
`,
      solution: `function delegateClick(container, selector, callback) {
  container.addEventListener('click', (e) => {
    const match = e.target.closest(selector);
    if (match && container.contains(match)) {
      callback(match, e);
    }
  });
}`,
      hints: [
        'e.target.closest(selector) traverses up to find the nearest matching ancestor.',
        'Check container.contains(match) to ensure the match is within our container.',
        'This handles deeply nested click targets correctly.',
      ],
      concepts: ['closest', 'event delegation', 'nested elements'],
    },
    {
      id: 'js-events-13',
      title: 'Fix the removeEventListener bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This code tries to remove an event listener but it does not work. Fix it.',
      skeleton: `const btn = document.querySelector('#toggle');

btn.addEventListener('click', () => {
  console.log('Clicked!');
});

// Later, trying to remove:
btn.removeEventListener('click', () => {
  console.log('Clicked!');
});
// Bug: the listener is not removed`,
      solution: `const btn = document.querySelector('#toggle');

function handleClick() {
  console.log('Clicked!');
}

btn.addEventListener('click', handleClick);

// Later, removing with the same reference:
btn.removeEventListener('click', handleClick);`,
      hints: [
        'removeEventListener requires the exact same function reference.',
        'Two identical arrow functions are different objects.',
        'Store the handler in a variable and pass the same reference.',
      ],
      concepts: ['removeEventListener', 'function reference'],
    },
    {
      id: 'js-events-14',
      title: 'Fix the event delegation bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'javascript',
      goal: 'This event delegation fails when clicking text inside a button. Fix it.',
      skeleton: `// HTML: <ul><li><button><span>Delete</span></button></li></ul>
const list = document.querySelector('ul');
list.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    // Bug: clicking the <span> means e.target is <span>, not <button>
    console.log('Delete button clicked');
  }
});`,
      solution: `const list = document.querySelector('ul');
list.addEventListener('click', (e) => {
  const button = e.target.closest('button');
  if (button && list.contains(button)) {
    console.log('Delete button clicked');
  }
});`,
      hints: [
        'e.target might be a child element inside the button.',
        'Use e.target.closest("button") to find the nearest button ancestor.',
        'Also check list.contains(button) to stay within scope.',
      ],
      concepts: ['closest', 'event delegation', 'nested targets'],
    },
    {
      id: 'js-events-15',
      title: 'Fix the passive scroll listener',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'This scroll prevention does not work because the listener is passive. Fix it.',
      skeleton: `document.addEventListener('wheel', (e) => {
  if (isModalOpen()) {
    e.preventDefault(); // Does nothing -- listener is passive by default in Chrome
  }
}, { passive: true });

function isModalOpen() {
  return document.querySelector('.modal.open') !== null;
}`,
      solution: `document.addEventListener('wheel', (e) => {
  if (isModalOpen()) {
    e.preventDefault();
  }
}, { passive: false });

function isModalOpen() {
  return document.querySelector('.modal.open') !== null;
}`,
      hints: [
        'Passive listeners cannot call preventDefault().',
        'Set { passive: false } to allow preventDefault.',
        'Chrome makes wheel/touch listeners passive by default for performance.',
      ],
      concepts: ['passive option', 'preventDefault', 'scroll events'],
    },
    {
      id: 'js-events-16',
      title: 'Predict CustomEvent propagation',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Predict whether a custom event bubbles or not.',
      skeleton: `// HTML: <div id="parent"><div id="child"></div></div>
const parent = document.getElementById('parent');
const child = document.getElementById('child');

parent.addEventListener('hello', () => console.log('parent heard'));
child.addEventListener('hello', () => console.log('child heard'));

child.dispatchEvent(new CustomEvent('hello'));
child.dispatchEvent(new CustomEvent('hello', { bubbles: true }));`,
      solution: `// Output:
// 'child heard'
// 'child heard'
// 'parent heard'
// First dispatch: CustomEvent does NOT bubble by default.
// Only the child listener fires.
// Second dispatch: bubbles: true enables bubbling.
// Both child and parent listeners fire.`,
      hints: [
        'CustomEvent does not bubble by default.',
        'You must explicitly set { bubbles: true } for bubbling.',
        'Without bubbling, only the target element receives the event.',
      ],
      concepts: ['CustomEvent bubbling', 'bubbles option'],
    },
    {
      id: 'js-events-17',
      title: 'Form event handling',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a form handler that collects all form data on submit using FormData.',
      skeleton: `// setupForm(formElement, onSubmit)
// Prevent default submit, collect all fields, call onSubmit with data object
`,
      solution: `function setupForm(formElement, onSubmit) {
  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  });
}`,
      hints: [
        'new FormData(form) collects all named fields.',
        'formData.entries() returns [name, value] pairs.',
        'Object.fromEntries converts entries to a plain object.',
      ],
      concepts: ['FormData', 'submit event', 'Object.fromEntries'],
    },
    {
      id: 'js-events-18',
      title: 'Focus/blur event tracking',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Write a function that tracks form field focus/blur to show validation messages.',
      skeleton: `// setupValidation(form, validators)
// validators = { fieldName: (value) => errorMessage | null }
// On blur: validate the field and show/hide error
// On focus: clear the error
`,
      solution: `function setupValidation(form, validators) {
  form.addEventListener('focusin', (e) => {
    const field = e.target;
    if (field.name) {
      const errorEl = form.querySelector(\`[data-error-for="\${field.name}"]\`);
      if (errorEl) errorEl.textContent = '';
    }
  });

  form.addEventListener('focusout', (e) => {
    const field = e.target;
    const validate = validators[field.name];
    if (validate) {
      const error = validate(field.value);
      const errorEl = form.querySelector(\`[data-error-for="\${field.name}"]\`);
      if (errorEl) errorEl.textContent = error || '';
    }
  });
}`,
      hints: [
        'Use focusin/focusout instead of focus/blur for delegation (they bubble).',
        'On focusout, run the validator and display the error.',
        'On focusin, clear the error message.',
      ],
      concepts: ['focusin', 'focusout', 'form validation', 'event delegation'],
    },
    {
      id: 'js-events-19',
      title: 'Refactor inline handlers to addEventListener',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor these inline event handlers to use addEventListener.',
      skeleton: `// HTML has:
// <button onclick="handleClick()">Click</button>
// <input onchange="handleChange(this.value)">
// <form onsubmit="handleSubmit(); return false;">

function handleClick() {
  console.log('clicked');
}

function handleChange(value) {
  console.log('changed:', value);
}

function handleSubmit() {
  console.log('submitted');
}`,
      solution: `const btn = document.querySelector('button');
const input = document.querySelector('input');
const form = document.querySelector('form');

btn.addEventListener('click', () => {
  console.log('clicked');
});

input.addEventListener('change', (e) => {
  console.log('changed:', e.target.value);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('submitted');
});`,
      hints: [
        'Replace onclick= with addEventListener("click", ...).',
        'Use e.target.value instead of passing "this.value".',
        'Replace return false with e.preventDefault().',
      ],
      concepts: ['addEventListener', 'refactoring', 'separation of concerns'],
    },
    {
      id: 'js-events-20',
      title: 'Refactor multiple listeners to delegation',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'javascript',
      goal: 'Refactor individual button listeners to a single delegated handler.',
      skeleton: `const btns = document.querySelectorAll('.action-btn');
btns.forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    if (action === 'delete') deleteItem(btn);
    else if (action === 'edit') editItem(btn);
    else if (action === 'save') saveItem(btn);
  });
});

function deleteItem(btn) { console.log('delete', btn.dataset.id); }
function editItem(btn) { console.log('edit', btn.dataset.id); }
function saveItem(btn) { console.log('save', btn.dataset.id); }`,
      solution: `const container = document.querySelector('.actions-container');

const actions = {
  delete: (btn) => console.log('delete', btn.dataset.id),
  edit: (btn) => console.log('edit', btn.dataset.id),
  save: (btn) => console.log('save', btn.dataset.id),
};

container.addEventListener('click', (e) => {
  const btn = e.target.closest('.action-btn');
  if (!btn || !container.contains(btn)) return;
  const handler = actions[btn.dataset.action];
  if (handler) handler(btn);
});`,
      hints: [
        'Use one listener on the container instead of one per button.',
        'Use closest() to find the button even if a child was clicked.',
        'Map action names to handler functions in an object.',
      ],
      concepts: ['event delegation', 'closest', 'action mapping'],
    },
  ],
};
