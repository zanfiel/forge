import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-fsm',
  title: '40. State Machine',
  explanation: `## State Machine in Lua

Table-driven state machines are a natural fit for Lua:

\`\`\`lua
-- Table-driven FSM
local fsm = {
  current = "idle",
  transitions = {
    idle  = { start = "running", reset = "idle" },
    running = { pause = "paused", stop = "idle" },
    paused  = { resume = "running", stop = "idle" },
  },
}

function fsm:send(event)
  local next = self.transitions[self.current]
  if next and next[event] then
    self.current = next[event]
    return true
  end
  return false
end

-- State handlers
local handlers = {
  idle    = { enter = function() print("Entered idle") end },
  running = { enter = function() print("Started running") end },
  paused  = { enter = function() print("Paused") end },
}

-- Transition with handlers
function fsm:transition(event)
  local transitions = self.transitions[self.current]
  if not transitions or not transitions[event] then return false end
  local old = self.current
  local new = transitions[event]
  if handlers[old] and handlers[old].exit then handlers[old].exit() end
  self.current = new
  if handlers[new] and handlers[new].enter then handlers[new].enter() end
  return true
end
\`\`\`

State machines keep complex logic organized and maintainable.`,
  exercises: [
    {
      id: 'lua-fsm-1',
      title: 'Define State Transitions',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Define a transition table for a simple traffic light.',
      skeleton: `local light = {
  current = "red",
  transitions = {
    red    = { next = "___" },
    green  = { next = "yellow" },
    yellow = { next = "red" },
  },
}
print(light.transitions[light.current].next)  -- "green"`,
      solution: `local light = {
  current = "red",
  transitions = {
    red    = { next = "green" },
    green  = { next = "yellow" },
    yellow = { next = "red" },
  },
}
print(light.transitions[light.current].next)  -- "green"`,
      hints: [
        'Traffic lights cycle: red -> green -> yellow -> red.',
        'Each state has one transition named "next".',
        'The transition from red leads to green.',
      ],
      concepts: ['state-machine', 'transitions'],
    },
    {
      id: 'lua-fsm-2',
      title: 'Send Event to FSM',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Implement the send function for a state machine.',
      skeleton: `local fsm = {
  current = "locked",
  transitions = {
    locked   = { coin = "unlocked" },
    unlocked = { push = "locked" },
  },
}

function fsm:send(event)
  local trans = self.transitions[self.___]
  if trans and trans[event] then
    self.current = trans[event]
    return true
  end
  return false
end

fsm:send("coin")
print(fsm.current)  -- "unlocked"`,
      solution: `local fsm = {
  current = "locked",
  transitions = {
    locked   = { coin = "unlocked" },
    unlocked = { push = "locked" },
  },
}

function fsm:send(event)
  local trans = self.transitions[self.current]
  if trans and trans[event] then
    self.current = trans[event]
    return true
  end
  return false
end

fsm:send("coin")
print(fsm.current)  -- "unlocked"`,
      hints: [
        'Look up transitions for the current state.',
        'self.current holds the current state name.',
        'Check if the event exists in the current state transitions.',
      ],
      concepts: ['state-machine', 'events', 'transitions'],
    },
    {
      id: 'lua-fsm-3',
      title: 'Predict FSM State',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the state after a series of transitions.',
      skeleton: `local fsm = {
  current = "idle",
  transitions = {
    idle = {start="running"}, running = {pause="paused", stop="idle"},
    paused = {resume="running", stop="idle"},
  },
}
function fsm:send(e) local t=self.transitions[self.current]; if t and t[e] then self.current=t[e] end end

fsm:send("start")
fsm:send("pause")
fsm:send("resume")
fsm:send("stop")
print(fsm.current)`,
      solution: `idle`,
      hints: [
        'start: idle -> running.',
        'pause: running -> paused. resume: paused -> running.',
        'stop: running -> idle.',
      ],
      concepts: ['state-machine', 'transitions'],
    },
    {
      id: 'lua-fsm-4',
      title: 'Write FSM Factory',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a factory function that creates state machines.',
      skeleton: `-- Write createFSM(initial, transitions) that returns an object with:
-- :getState() - returns current state
-- :send(event) - attempt transition, return true/false
-- :canSend(event) - check if event is valid from current state

-- YOUR CODE HERE`,
      solution: `function createFSM(initial, transitions)
  local current = initial
  local fsm = {}
  local mt = {
    __index = {
      getState = function(self)
        return current
      end,
      send = function(self, event)
        local trans = transitions[current]
        if trans and trans[event] then
          current = trans[event]
          return true
        end
        return false
      end,
      canSend = function(self, event)
        local trans = transitions[current]
        return trans ~= nil and trans[event] ~= nil
      end,
    },
  }
  return setmetatable(fsm, mt)
end`,
      hints: [
        'Store current state in a closure variable.',
        'Look up transitions from the transitions table.',
        'canSend checks without actually transitioning.',
      ],
      concepts: ['state-machine', 'factory', 'oop'],
    },
    {
      id: 'lua-fsm-5',
      title: 'Add Enter/Exit Handlers',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Extend a state machine with enter and exit handlers.',
      skeleton: `-- Write createHandledFSM(initial, transitions, handlers) where
-- handlers[state] = { enter = fn, exit = fn } (both optional).
-- On transition, call old state's exit, then new state's enter.
-- Return object with :send(event) and :getState().

-- YOUR CODE HERE`,
      solution: `function createHandledFSM(initial, transitions, handlers)
  local current = initial
  handlers = handlers or {}
  if handlers[current] and handlers[current].enter then
    handlers[current].enter()
  end
  local fsm = {}
  local mt = {
    __index = {
      getState = function(self) return current end,
      send = function(self, event)
        local trans = transitions[current]
        if not trans or not trans[event] then return false end
        local old = current
        local new = trans[event]
        if handlers[old] and handlers[old].exit then
          handlers[old].exit()
        end
        current = new
        if handlers[new] and handlers[new].enter then
          handlers[new].enter()
        end
        return true
      end,
    },
  }
  return setmetatable(fsm, mt)
end`,
      hints: [
        'Call exit on the old state before changing current.',
        'Call enter on the new state after changing current.',
        'Check if handlers exist before calling them.',
      ],
      concepts: ['state-machine', 'handlers', 'lifecycle'],
    },
    {
      id: 'lua-fsm-6',
      title: 'Fix Invalid Transition Crash',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the FSM that crashes on invalid events.',
      skeleton: `local fsm = {
  current = "idle",
  transitions = {
    idle = { start = "active" },
    active = { stop = "idle" },
  },
}

function fsm:send(event)
  self.current = self.transitions[self.current][event]  -- BUG: crashes on invalid
  return true
end

fsm:send("invalid")  -- ERROR: attempt to index nil
print(fsm.current)`,
      solution: `local fsm = {
  current = "idle",
  transitions = {
    idle = { start = "active" },
    active = { stop = "idle" },
  },
}

function fsm:send(event)
  local trans = self.transitions[self.current]
  if not trans or not trans[event] then return false end  -- FIXED: guard
  self.current = trans[event]
  return true
end

fsm:send("invalid")
print(fsm.current)  -- "idle" (unchanged)`,
      hints: [
        'Always check if the transition exists before using it.',
        'Guard against nil with an if check.',
        'Return false for invalid transitions.',
      ],
      concepts: ['state-machine', 'error-handling', 'debugging'],
    },
    {
      id: 'lua-fsm-7',
      title: 'Write Guard Conditions',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Add guard conditions to state transitions.',
      skeleton: `-- Write createGuardedFSM(initial, transitions) where transitions
-- can be: { event = "nextState" } or { event = { to = "nextState", guard = fn } }
-- The guard function receives the FSM data; transition only occurs if guard returns true.
-- The FSM has a .data table for shared state.

-- YOUR CODE HERE`,
      solution: `function createGuardedFSM(initial, transitions, data)
  local current = initial
  data = data or {}
  local fsm = {}
  local mt = {
    __index = {
      getState = function(self) return current end,
      getData = function(self) return data end,
      send = function(self, event)
        local trans = transitions[current]
        if not trans or not trans[event] then return false end
        local rule = trans[event]
        if type(rule) == "string" then
          current = rule
          return true
        end
        if rule.guard and not rule.guard(data) then
          return false
        end
        current = rule.to
        return true
      end,
    },
  }
  return setmetatable(fsm, mt)
end`,
      hints: [
        'Transitions can be strings (simple) or tables (with guard).',
        'Check the type to determine the format.',
        'Call guard(data) and only transition if it returns true.',
      ],
      concepts: ['state-machine', 'guards', 'conditional-transitions'],
    },
    {
      id: 'lua-fsm-8',
      title: 'Predict Guard Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict FSM behavior with guard conditions.',
      skeleton: `local coins = 0
local trans = {
  locked = { coin = "unlocked" },
  unlocked = { push = "locked" },
}
local current = "locked"

function send(event)
  local t = trans[current]
  if t and t[event] then current = t[event]; return true end
  return false
end

send("push")    -- invalid from locked
send("coin")    -- locked -> unlocked
send("coin")    -- invalid from unlocked
send("push")    -- unlocked -> locked
print(current)`,
      solution: `locked`,
      hints: [
        'push from locked: invalid, stays locked.',
        'coin from locked: transitions to unlocked.',
        'coin from unlocked: invalid. push from unlocked: back to locked.',
      ],
      concepts: ['state-machine', 'transitions'],
    },
    {
      id: 'lua-fsm-9',
      title: 'Write History State Machine',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a state machine that tracks transition history.',
      skeleton: `-- Write createHistoryFSM(initial, transitions) with:
-- :send(event) - transition and record in history
-- :getState() - current state
-- :getHistory() - return array of {from, event, to} tables
-- :undo() - revert to previous state (if history exists)

-- YOUR CODE HERE`,
      solution: `function createHistoryFSM(initial, transitions)
  local current = initial
  local history = {}
  local fsm = {}
  local mt = {
    __index = {
      getState = function(self) return current end,
      send = function(self, event)
        local trans = transitions[current]
        if not trans or not trans[event] then return false end
        local from = current
        current = trans[event]
        history[#history + 1] = { from = from, event = event, to = current }
        return true
      end,
      getHistory = function(self)
        return history
      end,
      undo = function(self)
        if #history == 0 then return false end
        local entry = table.remove(history)
        current = entry.from
        return true
      end,
    },
  }
  return setmetatable(fsm, mt)
end`,
      hints: [
        'Record each transition as {from, event, to} in history.',
        'undo pops the last entry and restores the from state.',
        'Return false from undo if history is empty.',
      ],
      concepts: ['state-machine', 'history', 'undo'],
    },
    {
      id: 'lua-fsm-10',
      title: 'Fill in Transition Check',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Check if a transition is valid before executing it.',
      skeleton: `local fsm = {
  current = "off",
  transitions = { off = {toggle="on"}, on = {toggle="off"} },
}
local trans = fsm.transitions[fsm.current]
if trans ___ trans["toggle"] then
  fsm.current = trans["toggle"]
end
print(fsm.current)  -- "on"`,
      solution: `local fsm = {
  current = "off",
  transitions = { off = {toggle="on"}, on = {toggle="off"} },
}
local trans = fsm.transitions[fsm.current]
if trans and trans["toggle"] then
  fsm.current = trans["toggle"]
end
print(fsm.current)  -- "on"`,
      hints: [
        'Use "and" to check both that trans exists and the event exists.',
        'This prevents nil indexing errors.',
        'Short-circuit evaluation stops at the first false.',
      ],
      concepts: ['state-machine', 'guard-check'],
    },
    {
      id: 'lua-fsm-11',
      title: 'Write Hierarchical FSM',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a simple hierarchical state machine with sub-states.',
      skeleton: `-- Write createHFSM(config) where config is:
-- { states = { stateName = { initial = "sub", substates = {...}, transitions = {...} } } }
-- Simple version: just track parent.sub as the current state.
-- :getState() returns "parent.sub"
-- :send(event) checks sub-state transitions first, then parent.

-- YOUR CODE HERE`,
      solution: `function createHFSM(config)
  local parent = config.initial
  local sub = config.states[parent].initial
  local fsm = {}
  local mt = {
    __index = {
      getState = function(self)
        return parent .. "." .. sub
      end,
      send = function(self, event)
        local st = config.states[parent]
        if st.substates and st.substates[sub] and st.substates[sub][event] then
          sub = st.substates[sub][event]
          return true
        end
        if st.transitions and st.transitions[event] then
          parent = st.transitions[event]
          sub = config.states[parent].initial
          return true
        end
        return false
      end,
    },
  }
  return setmetatable(fsm, mt)
end`,
      hints: [
        'Track both parent and sub-state.',
        'Check sub-state transitions first.',
        'When transitioning parent, reset to the new parent initial sub-state.',
      ],
      concepts: ['state-machine', 'hierarchical', 'advanced'],
    },
    {
      id: 'lua-fsm-12',
      title: 'Fix State Handler Nil Access',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the handler lookup that crashes on states without handlers.',
      skeleton: `local handlers = {
  idle = { enter = function() print("idle") end },
  -- running has no handlers defined
}

local current = "idle"
function transition(newState)
  handlers[current].exit()  -- BUG: exit may not exist
  current = newState
  handlers[current].enter()  -- BUG: handlers[current] may not exist
end

transition("running")`,
      solution: `local handlers = {
  idle = { enter = function() print("idle") end },
}

local current = "idle"
function transition(newState)
  local oldH = handlers[current]
  if oldH and oldH.exit then oldH.exit() end  -- FIXED: guard
  current = newState
  local newH = handlers[current]
  if newH and newH.enter then newH.enter() end  -- FIXED: guard
end

transition("running")`,
      hints: [
        'Not every state needs handlers defined.',
        'Check if the handler table exists before accessing methods.',
        'Check if the specific handler (enter/exit) exists too.',
      ],
      concepts: ['state-machine', 'nil-safety', 'debugging'],
    },
    {
      id: 'lua-fsm-13',
      title: 'Write Parallel States',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a system that runs multiple state machines in parallel.',
      skeleton: `-- Write createParallelFSM(machines) where machines is a table
-- of {name = fsmConfig} entries. Each config has initial and transitions.
-- :send(event) sends event to ALL machines.
-- :getStates() returns {name = currentState} for all machines.

-- YOUR CODE HERE`,
      solution: `function createParallelFSM(machines)
  local states = {}
  local transitions = {}
  for name, config in pairs(machines) do
    states[name] = config.initial
    transitions[name] = config.transitions
  end
  local pfsm = {}
  local mt = {
    __index = {
      send = function(self, event)
        local any = false
        for name, current in pairs(states) do
          local trans = transitions[name][current]
          if trans and trans[event] then
            states[name] = trans[event]
            any = true
          end
        end
        return any
      end,
      getStates = function(self)
        local result = {}
        for k, v in pairs(states) do result[k] = v end
        return result
      end,
    },
  }
  return setmetatable(pfsm, mt)
end`,
      hints: [
        'Initialize each machine state from its config.',
        'send() iterates all machines and applies the event.',
        'Each machine transitions independently.',
      ],
      concepts: ['state-machine', 'parallel', 'composition'],
    },
    {
      id: 'lua-fsm-14',
      title: 'Write Transition Actions',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Add action callbacks to transitions.',
      skeleton: `-- Write createActionFSM(initial, transitions) where transitions
-- can be: { event = { to = "state", action = fn } } or { event = "state" }
-- When transitioning, call the action(from, to, event) if defined.
-- Return :send(event) and :getState().

-- YOUR CODE HERE`,
      solution: `function createActionFSM(initial, transitions)
  local current = initial
  local fsm = {}
  local mt = {
    __index = {
      getState = function(self) return current end,
      send = function(self, event)
        local trans = transitions[current]
        if not trans or not trans[event] then return false end
        local rule = trans[event]
        local from = current
        if type(rule) == "string" then
          current = rule
        else
          if rule.action then
            rule.action(from, rule.to, event)
          end
          current = rule.to
        end
        return true
      end,
    },
  }
  return setmetatable(fsm, mt)
end`,
      hints: [
        'Check if the rule is a string or table.',
        'For table rules, call action before setting current.',
        'Pass context (from, to, event) to the action.',
      ],
      concepts: ['state-machine', 'actions', 'transitions'],
    },
    {
      id: 'lua-fsm-15',
      title: 'Predict Toggle FSM',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict the state after multiple toggles.',
      skeleton: `local state = "off"
local trans = { off = {toggle="on"}, on = {toggle="off"} }
function toggle()
  state = trans[state]["toggle"]
end
toggle()
toggle()
toggle()
print(state)`,
      solution: `on`,
      hints: [
        'Toggle 1: off -> on.',
        'Toggle 2: on -> off.',
        'Toggle 3: off -> on.',
      ],
      concepts: ['state-machine', 'toggle'],
    },
    {
      id: 'lua-fsm-16',
      title: 'Write State Machine Validator',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that validates a state machine definition.',
      skeleton: `-- Write validateFSM(initial, transitions) that returns true/nil+error.
-- Check: initial state exists in transitions,
-- all target states exist as keys in transitions.

-- YOUR CODE HERE`,
      solution: `function validateFSM(initial, transitions)
  if not transitions[initial] then
    return nil, "initial state '" .. initial .. "' not in transitions"
  end
  for state, events in pairs(transitions) do
    for event, target in pairs(events) do
      if not transitions[target] then
        return nil, "target '" .. target .. "' from " .. state .. "." .. event .. " not found"
      end
    end
  end
  return true
end`,
      hints: [
        'Check that the initial state has a transition entry.',
        'For each transition target, verify it exists as a state.',
        'Return nil and an error message for any issue.',
      ],
      concepts: ['state-machine', 'validation'],
    },
    {
      id: 'lua-fsm-17',
      title: 'Refactor If-Chain to FSM',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor nested if-else state logic into a table-driven FSM.',
      skeleton: `local state = "idle"

function handleEvent(event)
  if state == "idle" then
    if event == "start" then state = "running"
    elseif event == "quit" then state = "done" end
  elseif state == "running" then
    if event == "pause" then state = "paused"
    elseif event == "stop" then state = "idle" end
  elseif state == "paused" then
    if event == "resume" then state = "running"
    elseif event == "stop" then state = "idle" end
  end
end

handleEvent("start")
handleEvent("pause")
handleEvent("resume")
print(state)`,
      solution: `local transitions = {
  idle    = { start = "running", quit = "done" },
  running = { pause = "paused", stop = "idle" },
  paused  = { resume = "running", stop = "idle" },
  done    = {},
}
local state = "idle"

function handleEvent(event)
  local trans = transitions[state]
  if trans and trans[event] then
    state = trans[event]
  end
end

handleEvent("start")
handleEvent("pause")
handleEvent("resume")
print(state)`,
      hints: [
        'Replace each if/elseif with an entry in the transitions table.',
        'The transition lookup replaces all the conditional logic.',
        'Adding new states only requires adding table entries.',
      ],
      concepts: ['state-machine', 'refactoring', 'table-driven'],
    },
    {
      id: 'lua-fsm-18',
      title: 'Refactor Boolean Flags to FSM',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Refactor multiple boolean flags into a proper state machine.',
      skeleton: `local isRunning = false
local isPaused = false
local isDone = false

function start()
  if not isRunning and not isDone then
    isRunning = true
    isPaused = false
  end
end

function pause()
  if isRunning and not isPaused then
    isPaused = true
  end
end

function stop()
  isRunning = false
  isPaused = false
  isDone = true
end

start()
pause()
print(isRunning, isPaused, isDone)`,
      solution: `local transitions = {
  idle    = { start = "running" },
  running = { pause = "paused", stop = "done" },
  paused  = { resume = "running", stop = "done" },
  done    = {},
}
local state = "idle"

function send(event)
  local trans = transitions[state]
  if trans and trans[event] then state = trans[event] end
end

send("start")
send("pause")
print(state == "paused")
print(state)`,
      hints: [
        'Boolean flags create an explosion of invalid state combinations.',
        'A single state variable with defined transitions is cleaner.',
        'The FSM enforces only valid state transitions.',
      ],
      concepts: ['state-machine', 'refactoring', 'boolean-flags'],
    },
    {
      id: 'lua-fsm-19',
      title: 'Write Timer State Machine',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a timer state machine with tick-based countdown.',
      skeleton: `-- Write createTimer(duration) with states: idle, running, finished.
-- :start() - begin countdown (idle -> running)
-- :tick() - decrement counter; at 0, switch to finished
-- :reset() - go back to idle with original duration
-- :getState() and :getRemaining()

-- YOUR CODE HERE`,
      solution: `function createTimer(duration)
  local state = "idle"
  local remaining = duration
  local timer = {}
  local mt = {
    __index = {
      getState = function(self) return state end,
      getRemaining = function(self) return remaining end,
      start = function(self)
        if state == "idle" then state = "running" end
      end,
      tick = function(self)
        if state ~= "running" then return end
        remaining = remaining - 1
        if remaining <= 0 then
          remaining = 0
          state = "finished"
        end
      end,
      reset = function(self)
        state = "idle"
        remaining = duration
      end,
    },
  }
  return setmetatable(timer, mt)
end`,
      hints: [
        'Track state and remaining as closure variables.',
        'start only works from idle state.',
        'tick only decrements in running state.',
      ],
      concepts: ['state-machine', 'timer', 'closures'],
    },
    {
      id: 'lua-fsm-20',
      title: 'Write FSM Serializer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write functions to serialize and deserialize FSM state.',
      skeleton: `-- Write serializeFSM(fsm) that returns a string representing
-- the current state (just the state name).
-- Write deserializeFSM(str, transitions) that creates a new FSM
-- starting from the serialized state.
-- Both use the createFSM pattern with :getState() and :send().

-- YOUR CODE HERE`,
      solution: `function createFSM(initial, transitions)
  local current = initial
  return {
    getState = function() return current end,
    send = function(self, event)
      local trans = transitions[current]
      if trans and trans[event] then
        current = trans[event]
        return true
      end
      return false
    end,
  }
end

function serializeFSM(fsm)
  return fsm:getState()
end

function deserializeFSM(str, transitions)
  return createFSM(str, transitions)
end`,
      hints: [
        'The simplest serialization is just the state name string.',
        'Deserialization creates a new FSM with that state as initial.',
        'The transitions table is provided externally.',
      ],
      concepts: ['state-machine', 'serialization'],
    },
  ],
};
