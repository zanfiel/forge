import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'ts-state',
  title: '48. Design Pattern: State Machine',
  explanation: `## Design Pattern: State Machine

State machines model systems that can be in exactly one of a finite number of states at any time. TypeScript's type system can enforce valid transitions at compile time.

### Basic Approach: Discriminated Unions
\\\`\\\`\\\`typescript
type State =
  | { status: 'idle' }
  | { status: 'loading'; startedAt: number }
  | { status: 'success'; data: string }
  | { status: 'error'; error: Error };
\\\`\\\`\\\`

### Transition Types
Define which events are valid in each state:
\\\`\\\`\\\`typescript
type Transition<From, To> = { from: From; to: To };
\\\`\\\`\\\`

### Key Concepts
- **States**: Finite set of possible conditions.
- **Events/Actions**: Inputs that trigger transitions.
- **Transitions**: Rules for moving between states.
- **Guards**: Conditions that must be true for a transition.
- **Entry/Exit Actions**: Side effects when entering or leaving a state.
- **Context**: Additional data carried alongside the state.

### TypeScript Advantages
TypeScript excels at state machines because:
- Discriminated unions ensure exhaustive handling.
- Conditional types can model valid transitions.
- The compiler catches invalid state access at compile time.
`,
  exercises: [
    {
      id: 'ts-state-1',
      title: 'Basic state with unions',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the discriminated union for a traffic light state machine.',
      skeleton: `type TrafficLight =
  | { color: 'red' }
  | { color: __BLANK__ }
  | { color: 'green' };

function next(light: TrafficLight): TrafficLight {
  switch (light.color) {
    case 'red': return { color: 'green' };
    case 'green': return { color: 'yellow' };
    case 'yellow': return { color: 'red' };
  }
}`,
      solution: `type TrafficLight =
  | { color: 'red' }
  | { color: 'yellow' }
  | { color: 'green' };

function next(light: TrafficLight): TrafficLight {
  switch (light.color) {
    case 'red': return { color: 'green' };
    case 'green': return { color: 'yellow' };
    case 'yellow': return { color: 'red' };
  }
}`,
      hints: [
        'A traffic light has three colors: red, yellow, green.',
        'The missing state is the one between red and green.',
        'The answer is: \'yellow\'',
      ],
      concepts: ['basic state machine with unions', 'discriminated unions'],
    },
    {
      id: 'ts-state-2',
      title: 'State with context data',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the state type so each state carries relevant context data.',
      skeleton: `type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading'; __BLANK__ }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

const loading: FetchState<string> = { status: 'loading', startedAt: Date.now() };`,
      solution: `type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading'; startedAt: number }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

const loading: FetchState<string> = { status: 'loading', startedAt: Date.now() };`,
      hints: [
        'The loading state needs a timestamp for when loading started.',
        'Date.now() returns a number.',
        'The answer is: startedAt: number',
      ],
      concepts: ['state machine with context', 'discriminated unions'],
    },
    {
      id: 'ts-state-3',
      title: 'Predict: exhaustive state check',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Does this code compile? Write "Compiles" or "Error".',
      skeleton: `type State = { kind: 'a' } | { kind: 'b' } | { kind: 'c' };

function handle(s: State): string {
  switch (s.kind) {
    case 'a': return 'A';
    case 'b': return 'B';
    // Missing case 'c'
  }
}`,
      solution: `Error`,
      hints: [
        'The function claims to return string but not all paths return a value.',
        'The case for "c" is missing, so the function falls through without returning.',
        'TypeScript catches this as a missing return type.',
      ],
      concepts: ['exhaustive handling', 'discriminated unions', 'type narrowing'],
    },
    {
      id: 'ts-state-4',
      title: 'State transition types',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the event types that can trigger state transitions.',
      skeleton: `type State = 'idle' | 'running' | 'paused' | 'stopped';

type Event =
  | { type: 'START' }
  | { type: __BLANK__ }
  | { type: 'RESUME' }
  | { type: 'STOP' };

function transition(state: State, event: Event): State {
  if (state === 'idle' && event.type === 'START') return 'running';
  if (state === 'running' && event.type === 'PAUSE') return 'paused';
  if (state === 'paused' && event.type === 'RESUME') return 'running';
  if (event.type === 'STOP') return 'stopped';
  return state;
}`,
      solution: `type State = 'idle' | 'running' | 'paused' | 'stopped';

type Event =
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'STOP' };

function transition(state: State, event: Event): State {
  if (state === 'idle' && event.type === 'START') return 'running';
  if (state === 'running' && event.type === 'PAUSE') return 'paused';
  if (state === 'paused' && event.type === 'RESUME') return 'running';
  if (event.type === 'STOP') return 'stopped';
  return state;
}`,
      hints: [
        'The missing event transitions from running to paused.',
        'Look at the transition function for the event name.',
        'The answer is: \'PAUSE\'',
      ],
      concepts: ['state transition types', 'event-driven state machine'],
    },
    {
      id: 'ts-state-5',
      title: 'Type-safe state access',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Complete the type narrowing to safely access the data property.',
      skeleton: `type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: string[] }
  | { status: 'error'; error: string };

function getItems(state: RequestState): string[] {
  if (state.__BLANK__) {
    return state.data;
  }
  return [];
}`,
      solution: `type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: string[] }
  | { status: 'error'; error: string };

function getItems(state: RequestState): string[] {
  if (state.status === 'success') {
    return state.data;
  }
  return [];
}`,
      hints: [
        'You need to narrow the state to the "success" variant.',
        'Check the discriminant property: status.',
        'The answer is: status === \'success\'',
      ],
      concepts: ['type-safe transitions', 'type narrowing', 'discriminated unions'],
    },
    {
      id: 'ts-state-6',
      title: 'Write: finite state machine',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'typescript',
      goal: 'Write a simple finite state machine for a door: states are "locked", "closed", "open". Events are "UNLOCK", "LOCK", "OPEN", "CLOSE". Return the new state or the current state if the transition is invalid.',
      skeleton: `// Write the door state machine
`,
      solution: `type DoorState = 'locked' | 'closed' | 'open';
type DoorEvent = 'UNLOCK' | 'LOCK' | 'OPEN' | 'CLOSE';

function doorMachine(state: DoorState, event: DoorEvent): DoorState {
  switch (state) {
    case 'locked':
      if (event === 'UNLOCK') return 'closed';
      return state;
    case 'closed':
      if (event === 'LOCK') return 'locked';
      if (event === 'OPEN') return 'open';
      return state;
    case 'open':
      if (event === 'CLOSE') return 'closed';
      return state;
  }
}

const s1 = doorMachine('locked', 'UNLOCK'); // 'closed'
const s2 = doorMachine('closed', 'OPEN');   // 'open'
const s3 = doorMachine('open', 'LOCK');     // 'open' (invalid)`,
      hints: [
        'Use a switch on the current state.',
        'Within each case, check which events are valid.',
        'Return the current state for invalid transitions.',
      ],
      concepts: ['finite state machine implementation', 'state transitions'],
    },
    {
      id: 'ts-state-7',
      title: 'State machine with classes',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a class-based state machine for a Promise lifecycle: pending -> fulfilled/rejected. Include context data.',
      skeleton: `// Write a class-based Promise state machine
`,
      solution: `type PromiseState<T> =
  | { status: 'pending' }
  | { status: 'fulfilled'; value: T }
  | { status: 'rejected'; reason: Error };

class PromiseMachine<T> {
  private state: PromiseState<T> = { status: 'pending' };

  getState(): PromiseState<T> {
    return this.state;
  }

  resolve(value: T): void {
    if (this.state.status !== 'pending') return;
    this.state = { status: 'fulfilled', value };
  }

  reject(reason: Error): void {
    if (this.state.status !== 'pending') return;
    this.state = { status: 'rejected', reason };
  }

  isPending(): boolean {
    return this.state.status === 'pending';
  }
}

const pm = new PromiseMachine<string>();
pm.resolve('done');
pm.reject(new Error('fail')); // Ignored: already fulfilled`,
      hints: [
        'Use a discriminated union for the state type.',
        'Guard transitions: only allow resolve/reject from pending.',
        'Once settled, the state should not change.',
      ],
      concepts: ['state machine with classes', 'guard conditions', 'immutable transitions'],
    },
    {
      id: 'ts-state-8',
      title: 'Guard conditions',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a state machine for a bank account with a guard: withdrawals only succeed if balance >= amount.',
      skeleton: `// Write the bank account state machine
`,
      solution: `type AccountState = {
  status: 'active' | 'frozen' | 'closed';
  balance: number;
};

type AccountEvent =
  | { type: 'DEPOSIT'; amount: number }
  | { type: 'WITHDRAW'; amount: number }
  | { type: 'FREEZE' }
  | { type: 'UNFREEZE' }
  | { type: 'CLOSE' };

function accountMachine(state: AccountState, event: AccountEvent): AccountState {
  switch (event.type) {
    case 'DEPOSIT':
      if (state.status !== 'active') return state;
      return { ...state, balance: state.balance + event.amount };
    case 'WITHDRAW':
      if (state.status !== 'active') return state;
      if (state.balance < event.amount) return state; // Guard!
      return { ...state, balance: state.balance - event.amount };
    case 'FREEZE':
      if (state.status !== 'active') return state;
      return { ...state, status: 'frozen' };
    case 'UNFREEZE':
      if (state.status !== 'frozen') return state;
      return { ...state, status: 'active' };
    case 'CLOSE':
      if (state.balance !== 0) return state; // Guard: must be zero
      return { status: 'closed', balance: 0 };
  }
}`,
      hints: [
        'Guards are conditions checked before allowing a transition.',
        'For WITHDRAW, check state.balance >= event.amount.',
        'Return the unchanged state when guards fail.',
      ],
      concepts: ['guard conditions', 'state machine with context', 'event-driven state machine'],
    },
    {
      id: 'ts-state-9',
      title: 'Fix: invalid state transitions',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Fix this state machine that allows invalid transitions. A completed task should not be startable again.',
      skeleton: `type TaskState = 'todo' | 'in-progress' | 'done';
type TaskEvent = 'START' | 'COMPLETE' | 'RESET';

function taskMachine(state: TaskState, event: TaskEvent): TaskState {
  switch (event) {
    case 'START': return 'in-progress'; // Bug: works from any state!
    case 'COMPLETE': return 'done';     // Bug: works from any state!
    case 'RESET': return 'todo';
    default: return state;
  }
}`,
      solution: `type TaskState = 'todo' | 'in-progress' | 'done';
type TaskEvent = 'START' | 'COMPLETE' | 'RESET';

function taskMachine(state: TaskState, event: TaskEvent): TaskState {
  switch (state) {
    case 'todo':
      if (event === 'START') return 'in-progress';
      return state;
    case 'in-progress':
      if (event === 'COMPLETE') return 'done';
      return state;
    case 'done':
      if (event === 'RESET') return 'todo';
      return state;
    default:
      return state;
  }
}`,
      hints: [
        'Switch on the STATE first, not the event.',
        'Only allow valid events for each state.',
        'todo -> START -> in-progress -> COMPLETE -> done -> RESET -> todo.',
      ],
      concepts: ['type-safe transitions', 'state validation', 'fix-bug'],
    },
    {
      id: 'ts-state-10',
      title: 'State entry/exit actions',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a state machine that executes entry and exit actions when transitioning. Define an action map for each state.',
      skeleton: `// Write a state machine with entry/exit actions
`,
      solution: `type AppState = 'splash' | 'login' | 'dashboard' | 'settings';

interface StateActions {
  onEnter?: () => void;
  onExit?: () => void;
}

const stateActions: Record<AppState, StateActions> = {
  splash: {
    onEnter: () => console.log('Showing splash screen'),
    onExit: () => console.log('Hiding splash screen'),
  },
  login: {
    onEnter: () => console.log('Loading login form'),
    onExit: () => console.log('Clearing login form'),
  },
  dashboard: {
    onEnter: () => console.log('Fetching dashboard data'),
    onExit: () => console.log('Cleaning up dashboard'),
  },
  settings: {
    onEnter: () => console.log('Loading settings'),
    onExit: () => console.log('Saving settings'),
  },
};

function transition(from: AppState, to: AppState): AppState {
  stateActions[from].onExit?.();
  stateActions[to].onEnter?.();
  return to;
}

let current: AppState = 'splash';
current = transition(current, 'login');
current = transition(current, 'dashboard');`,
      hints: [
        'Define actions as an object mapping each state to onEnter/onExit callbacks.',
        'Call onExit for the old state and onEnter for the new state during transition.',
        'Use optional chaining (?.) since not all states need both actions.',
      ],
      concepts: ['state entry/exit actions', 'lifecycle hooks', 'action maps'],
    },
    {
      id: 'ts-state-11',
      title: 'Type-safe transition map',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a typed transition map that defines valid transitions as a config object, then write a function that only allows valid transitions.',
      skeleton: `// Write a config-based state machine
`,
      solution: `type TransitionMap = {
  idle: 'running';
  running: 'paused' | 'stopped';
  paused: 'running' | 'stopped';
  stopped: 'idle';
};

type AppState = keyof TransitionMap;

function transition<S extends AppState>(
  current: S,
  next: TransitionMap[S]
): TransitionMap[S] {
  return next;
}

const s1 = transition('idle', 'running');     // OK
const s2 = transition('running', 'paused');   // OK
const s3 = transition('running', 'stopped');  // OK
// transition('idle', 'paused');              // Error!
// transition('stopped', 'paused');           // Error!`,
      hints: [
        'Map each state to its valid next states using a type.',
        'The transition function is generic over the current state S.',
        'The "next" parameter type is TransitionMap[S].',
      ],
      concepts: ['state machine from config', 'type-safe transitions', 'mapped types'],
    },
    {
      id: 'ts-state-12',
      title: 'Predict: state machine output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'What is the final value of state?',
      skeleton: `type S = 'off' | 'on';

function toggle(s: S): S {
  return s === 'off' ? 'on' : 'off';
}

let state: S = 'off';
state = toggle(state);
state = toggle(state);
state = toggle(state);
console.log(state);`,
      solution: `on`,
      hints: [
        'toggle flips between "off" and "on".',
        'off -> on -> off -> on.',
        'Three toggles from "off" ends at "on".',
      ],
      concepts: ['state transitions', 'toggle pattern'],
    },
    {
      id: 'ts-state-13',
      title: 'State machine for forms',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'typescript',
      goal: 'Write a form state machine with states: pristine, dirty, validating, valid, invalid, submitting, submitted, error. Model the transitions.',
      skeleton: `// Write the form state machine
`,
      solution: `type FormState =
  | { status: 'pristine' }
  | { status: 'dirty'; changes: number }
  | { status: 'validating' }
  | { status: 'valid' }
  | { status: 'invalid'; errors: string[] }
  | { status: 'submitting' }
  | { status: 'submitted' }
  | { status: 'error'; message: string };

type FormEvent =
  | { type: 'CHANGE' }
  | { type: 'VALIDATE' }
  | { type: 'VALIDATION_SUCCESS' }
  | { type: 'VALIDATION_FAIL'; errors: string[] }
  | { type: 'SUBMIT' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_FAIL'; message: string }
  | { type: 'RESET' };

function formMachine(state: FormState, event: FormEvent): FormState {
  switch (event.type) {
    case 'CHANGE':
      if (state.status === 'submitted') return state;
      return { status: 'dirty', changes: (state.status === 'dirty' ? state.changes : 0) + 1 };
    case 'VALIDATE':
      if (state.status !== 'dirty') return state;
      return { status: 'validating' };
    case 'VALIDATION_SUCCESS':
      if (state.status !== 'validating') return state;
      return { status: 'valid' };
    case 'VALIDATION_FAIL':
      if (state.status !== 'validating') return state;
      return { status: 'invalid', errors: event.errors };
    case 'SUBMIT':
      if (state.status !== 'valid') return state;
      return { status: 'submitting' };
    case 'SUBMIT_SUCCESS':
      if (state.status !== 'submitting') return state;
      return { status: 'submitted' };
    case 'SUBMIT_FAIL':
      if (state.status !== 'submitting') return state;
      return { status: 'error', message: event.message };
    case 'RESET':
      return { status: 'pristine' };
  }
}`,
      hints: [
        'Define states as a discriminated union with relevant context per state.',
        'Guard each event to only work from valid source states.',
        'CHANGE can happen in most states, SUBMIT only from "valid".',
      ],
      concepts: ['state machine for forms', 'complex state machines', 'event handling'],
    },
    {
      id: 'ts-state-14',
      title: 'State machine for async operations',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a generic async operation state machine that handles idle -> loading -> success/error -> retry flow.',
      skeleton: `// Write the async state machine
`,
      solution: `type AsyncState<T, E = Error> =
  | { status: 'idle' }
  | { status: 'loading'; attempt: number }
  | { status: 'success'; data: T; timestamp: number }
  | { status: 'error'; error: E; attempt: number }
  | { status: 'retrying'; attempt: number };

type AsyncEvent<T, E = Error> =
  | { type: 'FETCH' }
  | { type: 'SUCCESS'; data: T }
  | { type: 'FAILURE'; error: E }
  | { type: 'RETRY' }
  | { type: 'RESET' };

function asyncMachine<T, E = Error>(
  state: AsyncState<T, E>,
  event: AsyncEvent<T, E>
): AsyncState<T, E> {
  switch (event.type) {
    case 'FETCH':
      if (state.status !== 'idle') return state;
      return { status: 'loading', attempt: 1 };
    case 'SUCCESS':
      if (state.status !== 'loading' && state.status !== 'retrying') return state;
      return { status: 'success', data: event.data, timestamp: Date.now() };
    case 'FAILURE':
      if (state.status !== 'loading' && state.status !== 'retrying') return state;
      return { status: 'error', error: event.error, attempt: state.attempt };
    case 'RETRY':
      if (state.status !== 'error') return state;
      return { status: 'retrying', attempt: state.attempt + 1 };
    case 'RESET':
      return { status: 'idle' };
  }
}`,
      hints: [
        'Generic over T (data) and E (error type).',
        'Track the attempt count for retry logic.',
        'SUCCESS is valid from both loading and retrying states.',
      ],
      concepts: ['state machine for async operations', 'generic state machine', 'retry patterns'],
    },
    {
      id: 'ts-state-15',
      title: 'State machine builder',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a createMachine function that takes a config object defining states and transitions, and returns a machine with a send method.',
      skeleton: `// Write the state machine builder
`,
      solution: `interface MachineConfig<S extends string, E extends string> {
  initial: S;
  transitions: Record<S, Partial<Record<E, S>>>;
}

interface Machine<S extends string, E extends string> {
  current: S;
  send(event: E): S;
  matches(state: S): boolean;
}

function createMachine<S extends string, E extends string>(
  config: MachineConfig<S, E>
): Machine<S, E> {
  let current = config.initial;

  return {
    get current() { return current; },
    send(event: E): S {
      const transitions = config.transitions[current];
      const next = transitions[event];
      if (next !== undefined) {
        current = next;
      }
      return current;
    },
    matches(state: S): boolean {
      return current === state;
    },
  };
}

const light = createMachine({
  initial: 'red' as const,
  transitions: {
    red: { NEXT: 'green' as const },
    green: { NEXT: 'yellow' as const },
    yellow: { NEXT: 'red' as const },
  },
});

light.send('NEXT'); // green
light.send('NEXT'); // yellow`,
      hints: [
        'The config maps each state to valid event->nextState pairs.',
        'The machine tracks current state and updates on send().',
        'Use generics for state and event string literals.',
      ],
      concepts: ['state machine builder', 'state machine from config', 'factory pattern'],
    },
    {
      id: 'ts-state-16',
      title: 'Fix: non-exhaustive state handling',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Fix this render function that does not handle all states, potentially causing a runtime error.',
      skeleton: `type UIState =
  | { view: 'splash' }
  | { view: 'auth'; mode: 'login' | 'register' }
  | { view: 'main'; tab: string }
  | { view: 'error'; message: string };

function render(state: UIState): string {
  switch (state.view) {
    case 'splash': return '<Splash />';
    case 'auth': return '<Auth />';
    case 'main': return '<Main />';
    // Missing 'error' case
  }
}`,
      solution: `type UIState =
  | { view: 'splash' }
  | { view: 'auth'; mode: 'login' | 'register' }
  | { view: 'main'; tab: string }
  | { view: 'error'; message: string };

function render(state: UIState): string {
  switch (state.view) {
    case 'splash': return '<Splash />';
    case 'auth': return '<Auth />';
    case 'main': return '<Main />';
    case 'error': return \\\`<Error message="\${state.message}" />\\\`;
    default: {
      const _exhaustive: never = state;
      return _exhaustive;
    }
  }
}`,
      hints: [
        'Add the missing case for "error".',
        'Use a default case with never to ensure exhaustiveness.',
        'The never check catches any future states added to the union.',
      ],
      concepts: ['exhaustive handling', 'never type', 'state machine for UI'],
    },
    {
      id: 'ts-state-17',
      title: 'Hierarchical states',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a hierarchical state type where "active" has sub-states "editing" and "reviewing". Model parent-child state relationships.',
      skeleton: `// Write hierarchical states
`,
      solution: `type InactiveState = { status: 'inactive' };

type EditingState = {
  status: 'active';
  subState: 'editing';
  document: string;
  cursor: number;
};

type ReviewingState = {
  status: 'active';
  subState: 'reviewing';
  document: string;
  comments: string[];
};

type ActiveState = EditingState | ReviewingState;
type DocState = InactiveState | ActiveState;

function handleState(state: DocState): string {
  if (state.status === 'inactive') {
    return 'No document open';
  }
  // state is narrowed to ActiveState
  switch (state.subState) {
    case 'editing':
      return \\\`Editing at position \${state.cursor}\\\`;
    case 'reviewing':
      return \\\`Reviewing with \${state.comments.length} comments\\\`;
  }
}`,
      hints: [
        'Parent states use a common discriminant (status).',
        'Sub-states add a second discriminant (subState).',
        'TypeScript narrows through both levels of discrimination.',
      ],
      concepts: ['hierarchical states', 'nested discriminated unions', 'two-level narrowing'],
    },
    {
      id: 'ts-state-18',
      title: 'State machine testing',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Write a test helper that runs a sequence of events through a state machine and asserts the expected state after each event.',
      skeleton: `// Write the state machine test runner
`,
      solution: `type Transition<S, E> = (state: S, event: E) => S;

interface TestStep<S, E> {
  event: E;
  expectedState: S;
}

function testMachine<S, E>(
  machine: Transition<S, E>,
  initialState: S,
  steps: TestStep<S, E>[]
): { passed: boolean; failedAt?: number; actual?: S; expected?: S } {
  let current = initialState;

  for (let i = 0; i < steps.length; i++) {
    current = machine(current, steps[i].event);
    const expected = steps[i].expectedState;

    if (JSON.stringify(current) !== JSON.stringify(expected)) {
      return { passed: false, failedAt: i, actual: current, expected };
    }
  }

  return { passed: true };
}

// Usage
type S = 'off' | 'on';
type E = 'TOGGLE';

function toggle(state: S, event: E): S {
  return state === 'off' ? 'on' : 'off';
}

const result = testMachine(toggle, 'off', [
  { event: 'TOGGLE', expectedState: 'on' },
  { event: 'TOGGLE', expectedState: 'off' },
  { event: 'TOGGLE', expectedState: 'on' },
]);`,
      hints: [
        'The test runner iterates through steps, applying each event.',
        'Compare actual vs expected state after each transition.',
        'Return failure details if any step does not match.',
      ],
      concepts: ['state machine testing', 'test harness', 'generic testing'],
    },
    {
      id: 'ts-state-19',
      title: 'Refactor: boolean flags to state machine',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this component with boolean flags into a proper state machine. The booleans create impossible states (e.g., loading AND error).',
      skeleton: `interface ModalState {
  isOpen: boolean;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  data: any | null;
  isSubmitting: boolean;
  isSuccess: boolean;
}

const state: ModalState = {
  isOpen: true,
  isLoading: false,
  isError: true,
  errorMessage: "Oops",
  data: null,
  isSubmitting: true, // Impossible: error AND submitting!
  isSuccess: false,
};`,
      solution: `type ModalState =
  | { status: 'closed' }
  | { status: 'open'; view: 'idle' }
  | { status: 'open'; view: 'loading' }
  | { status: 'open'; view: 'loaded'; data: unknown }
  | { status: 'open'; view: 'error'; message: string }
  | { status: 'open'; view: 'submitting'; data: unknown }
  | { status: 'open'; view: 'success' };

type ModalEvent =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'LOAD' }
  | { type: 'LOAD_SUCCESS'; data: unknown }
  | { type: 'LOAD_FAIL'; message: string }
  | { type: 'SUBMIT' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_FAIL'; message: string };

function modalMachine(state: ModalState, event: ModalEvent): ModalState {
  switch (event.type) {
    case 'OPEN':
      if (state.status !== 'closed') return state;
      return { status: 'open', view: 'idle' };
    case 'CLOSE':
      return { status: 'closed' };
    case 'LOAD':
      if (state.status !== 'open' || state.view !== 'idle') return state;
      return { status: 'open', view: 'loading' };
    case 'LOAD_SUCCESS':
      if (state.status !== 'open' || state.view !== 'loading') return state;
      return { status: 'open', view: 'loaded', data: event.data };
    case 'LOAD_FAIL':
      if (state.status !== 'open' || state.view !== 'loading') return state;
      return { status: 'open', view: 'error', message: event.message };
    case 'SUBMIT':
      if (state.status !== 'open' || state.view !== 'loaded') return state;
      return { status: 'open', view: 'submitting', data: state.data };
    case 'SUBMIT_SUCCESS':
      if (state.status !== 'open' || state.view !== 'submitting') return state;
      return { status: 'open', view: 'success' };
    case 'SUBMIT_FAIL':
      if (state.status !== 'open' || state.view !== 'submitting') return state;
      return { status: 'open', view: 'error', message: event.message };
  }
}`,
      hints: [
        'Replace boolean flags with a discriminated union of states.',
        'Each state variant carries only the data relevant to that state.',
        'Impossible combinations like "loading AND error" are structurally prevented.',
      ],
      concepts: ['practical state machine patterns', 'impossible states', 'refactoring'],
    },
    {
      id: 'ts-state-20',
      title: 'Refactor: switch chain to config-driven machine',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'typescript',
      goal: 'Refactor this large switch-based state machine into a data-driven config object pattern.',
      skeleton: `type State = 'idle' | 'fetching' | 'polling' | 'error' | 'done';
type Event = 'FETCH' | 'POLL' | 'SUCCESS' | 'FAIL' | 'RETRY' | 'STOP';

function machine(state: State, event: Event): State {
  switch (state) {
    case 'idle':
      if (event === 'FETCH') return 'fetching';
      if (event === 'POLL') return 'polling';
      return state;
    case 'fetching':
      if (event === 'SUCCESS') return 'done';
      if (event === 'FAIL') return 'error';
      return state;
    case 'polling':
      if (event === 'SUCCESS') return 'polling';
      if (event === 'FAIL') return 'error';
      if (event === 'STOP') return 'done';
      return state;
    case 'error':
      if (event === 'RETRY') return 'fetching';
      return state;
    case 'done':
      if (event === 'FETCH') return 'fetching';
      if (event === 'POLL') return 'polling';
      return state;
    default:
      return state;
  }
}`,
      solution: `type State = 'idle' | 'fetching' | 'polling' | 'error' | 'done';
type Event = 'FETCH' | 'POLL' | 'SUCCESS' | 'FAIL' | 'RETRY' | 'STOP';

const machineConfig: Record<State, Partial<Record<Event, State>>> = {
  idle:     { FETCH: 'fetching', POLL: 'polling' },
  fetching: { SUCCESS: 'done', FAIL: 'error' },
  polling:  { SUCCESS: 'polling', FAIL: 'error', STOP: 'done' },
  error:    { RETRY: 'fetching' },
  done:     { FETCH: 'fetching', POLL: 'polling' },
};

function machine(state: State, event: Event): State {
  return machineConfig[state][event] ?? state;
}

// Easy to visualize, modify, and test
const s1 = machine('idle', 'FETCH');     // 'fetching'
const s2 = machine('fetching', 'FAIL');  // 'error'
const s3 = machine('error', 'RETRY');    // 'fetching'`,
      hints: [
        'Replace the switch with a Record<State, Partial<Record<Event, State>>>.',
        'Each state maps valid events to their target states.',
        'Use nullish coalescing (??) to return current state for unmapped events.',
      ],
      concepts: ['state machine from config', 'data-driven design', 'refactoring'],
    },
  ],
};
