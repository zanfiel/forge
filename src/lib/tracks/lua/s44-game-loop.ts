import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-gameloop',
  title: '44. Game Loop',
  explanation: `## Game Loop in Lua

The game loop is the heartbeat of any game, handling timing, updates, and rendering:

\`\`\`lua
-- Basic game loop structure
local running = true
local lastTime = os.clock()

while running do
  local currentTime = os.clock()
  local dt = currentTime - lastTime
  lastTime = currentTime

  handleInput()
  update(dt)
  draw()
end

-- Fixed timestep (more deterministic)
local FIXED_DT = 1/60  -- 60 updates per second
local accumulator = 0

while running do
  local currentTime = os.clock()
  local frameTime = currentTime - lastTime
  lastTime = currentTime
  accumulator = accumulator + frameTime

  while accumulator >= FIXED_DT do
    update(FIXED_DT)
    accumulator = accumulator - FIXED_DT
  end

  local alpha = accumulator / FIXED_DT  -- interpolation factor
  draw(alpha)
end

-- Delta time usage
function update(dt)
  player.x = player.x + player.speed * dt  -- frame-rate independent
end
\`\`\`

Key concepts: delta time for frame-independent movement, fixed timestep for deterministic physics, and separation of update/draw phases.`,
  exercises: [
    {
      id: 'lua-gameloop-1',
      title: 'Calculate Delta Time',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Calculate delta time between frames.',
      skeleton: `local lastTime = os.clock()
-- simulate a tiny delay
local sum = 0; for i=1,100000 do sum = sum + i end
local currentTime = os.clock()
local dt = currentTime ___ lastTime
print(dt >= 0)  -- true
print(type(dt))  -- "number"`,
      solution: `local lastTime = os.clock()
local sum = 0; for i=1,100000 do sum = sum + i end
local currentTime = os.clock()
local dt = currentTime - lastTime
print(dt >= 0)  -- true
print(type(dt))  -- "number"`,
      hints: [
        'Delta time is the difference between current and last frame time.',
        'Subtract lastTime from currentTime.',
        'dt should always be non-negative.',
      ],
      concepts: ['game-loop', 'delta-time'],
    },
    {
      id: 'lua-gameloop-2',
      title: 'Frame-Independent Movement',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Move an object using delta time for frame-rate independence.',
      skeleton: `local player = { x = 0, speed = 100 }  -- 100 units per second
local dt = 0.016  -- ~60 FPS
player.x = player.x + player.speed ___ dt
print(player.x)  -- 1.6`,
      solution: `local player = { x = 0, speed = 100 }  -- 100 units per second
local dt = 0.016  -- ~60 FPS
player.x = player.x + player.speed * dt
print(player.x)  -- 1.6`,
      hints: [
        'Multiply speed by dt for frame-independent movement.',
        'At 60 FPS, dt is about 0.016 seconds.',
        '100 * 0.016 = 1.6 units moved this frame.',
      ],
      concepts: ['game-loop', 'delta-time', 'movement'],
    },
    {
      id: 'lua-gameloop-3',
      title: 'Predict Position After Updates',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict an objects position after multiple fixed-dt updates.',
      skeleton: `local x = 0
local speed = 10
local dt = 0.5
for i = 1, 4 do
  x = x + speed * dt
end
print(x)`,
      solution: `20.0`,
      hints: [
        'Each update adds speed * dt = 10 * 0.5 = 5.',
        '4 updates: 5 + 5 + 5 + 5 = 20.',
        'Total distance = speed * total_time = 10 * 2 = 20.',
      ],
      concepts: ['game-loop', 'fixed-timestep'],
    },
    {
      id: 'lua-gameloop-4',
      title: 'Write Game Loop Object',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a game loop controller with start, update, and stop.',
      skeleton: `-- Write createGameLoop(updateFn, maxFrames) that:
-- Runs updateFn(dt) for maxFrames iterations (for testing).
-- Tracks total time elapsed.
-- Returns { totalTime, frameCount }.

-- YOUR CODE HERE`,
      solution: `function createGameLoop(updateFn, maxFrames)
  local totalTime = 0
  local frameCount = 0
  local lastTime = os.clock()
  for i = 1, maxFrames do
    local now = os.clock()
    local dt = now - lastTime
    lastTime = now
    updateFn(dt)
    totalTime = totalTime + dt
    frameCount = frameCount + 1
  end
  return { totalTime = totalTime, frameCount = frameCount }
end`,
      hints: [
        'Track lastTime and compute dt each iteration.',
        'Call updateFn with dt each frame.',
        'Accumulate totalTime and count frames.',
      ],
      concepts: ['game-loop', 'structure'],
    },
    {
      id: 'lua-gameloop-5',
      title: 'Write Fixed Timestep',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Implement a fixed timestep accumulator.',
      skeleton: `-- Write createFixedUpdate(fixedDt, updateFn) returning:
-- :step(dt) - add dt to accumulator, call updateFn(fixedDt)
--   as many times as needed to drain accumulator.
-- :getAccumulator() - return remaining time in accumulator.
-- :getAlpha() - return accumulator / fixedDt (interpolation factor).

-- YOUR CODE HERE`,
      solution: `function createFixedUpdate(fixedDt, updateFn)
  local accumulator = 0
  local obj = {}
  local mt = {
    __index = {
      step = function(self, dt)
        accumulator = accumulator + dt
        while accumulator >= fixedDt do
          updateFn(fixedDt)
          accumulator = accumulator - fixedDt
        end
      end,
      getAccumulator = function(self)
        return accumulator
      end,
      getAlpha = function(self)
        return accumulator / fixedDt
      end,
    },
  }
  return setmetatable(obj, mt)
end`,
      hints: [
        'Add dt to the accumulator each step.',
        'Loop while accumulator >= fixedDt.',
        'Alpha is the fractional leftover for interpolation.',
      ],
      concepts: ['game-loop', 'fixed-timestep', 'accumulator'],
    },
    {
      id: 'lua-gameloop-6',
      title: 'Write Input Handler',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write an input handler that maps keys to actions.',
      skeleton: `-- Write createInputHandler() returning:
-- :bind(key, action) - map a key string to an action string
-- :press(key) - record key as pressed, return the action or nil
-- :release(key) - record key as released
-- :isPressed(key) - return true/false

-- YOUR CODE HERE`,
      solution: `function createInputHandler()
  local bindings = {}
  local pressed = {}
  local handler = {}
  local mt = {
    __index = {
      bind = function(self, key, action)
        bindings[key] = action
      end,
      press = function(self, key)
        pressed[key] = true
        return bindings[key]
      end,
      release = function(self, key)
        pressed[key] = nil
      end,
      isPressed = function(self, key)
        return pressed[key] == true
      end,
    },
  }
  return setmetatable(handler, mt)
end`,
      hints: [
        'bindings maps keys to action names.',
        'pressed tracks which keys are currently held.',
        'press() returns the bound action for the key.',
      ],
      concepts: ['game-loop', 'input', 'bindings'],
    },
    {
      id: 'lua-gameloop-7',
      title: 'Fix Delta Time Spike',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the game loop that causes huge dt spikes.',
      skeleton: `local lastTime = os.clock()

function update(dt)
  -- BUG: no dt clamping means pausing the game causes huge jumps
  local player = {x = 0, speed = 100}
  player.x = player.x + player.speed * dt
  return player.x
end

-- Simulate a long pause
local now = lastTime + 5.0  -- 5 seconds elapsed
local dt = now - lastTime
print(update(dt))  -- 500! Player teleports`,
      solution: `local lastTime = os.clock()
local MAX_DT = 1/30  -- FIXED: cap at ~30 FPS equivalent

function update(dt)
  dt = math.min(dt, MAX_DT)  -- clamp delta time
  local player = {x = 0, speed = 100}
  player.x = player.x + player.speed * dt
  return player.x
end

local now = lastTime + 5.0
local dt = now - lastTime
print(update(dt))  -- clamped, no teleportation`,
      hints: [
        'Cap dt to a maximum value to prevent physics explosions.',
        'A common cap is 1/30 (33ms) or 1/10 (100ms).',
        'This prevents huge jumps when the game pauses or lags.',
      ],
      concepts: ['game-loop', 'delta-time', 'debugging'],
    },
    {
      id: 'lua-gameloop-8',
      title: 'Write FPS Counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write an FPS counter that averages over multiple frames.',
      skeleton: `-- Write createFPSCounter(sampleSize) returning:
-- :update(dt) - record this frame's dt
-- :getFPS() - return average FPS over the last sampleSize frames
-- Use a circular buffer.

-- YOUR CODE HERE`,
      solution: `function createFPSCounter(sampleSize)
  local samples = {}
  local index = 0
  local count = 0
  local counter = {}
  local mt = {
    __index = {
      update = function(self, dt)
        index = (index % sampleSize) + 1
        samples[index] = dt
        if count < sampleSize then count = count + 1 end
      end,
      getFPS = function(self)
        if count == 0 then return 0 end
        local total = 0
        for i = 1, count do total = total + samples[i] end
        local avgDt = total / count
        if avgDt == 0 then return 0 end
        return 1 / avgDt
      end,
    },
  }
  return setmetatable(counter, mt)
end`,
      hints: [
        'Use a circular buffer of dt values.',
        'Average all samples to get average frame time.',
        'FPS = 1 / average_dt.',
      ],
      concepts: ['game-loop', 'fps', 'circular-buffer'],
    },
    {
      id: 'lua-gameloop-9',
      title: 'Predict Fixed Timestep Count',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict how many fixed updates occur for a given frame time.',
      skeleton: `local fixedDt = 1/60  -- ~0.01667
local accumulator = 0
local frameDt = 0.05  -- 50ms frame (lag spike)
accumulator = accumulator + frameDt
local count = 0
while accumulator >= fixedDt do
  count = count + 1
  accumulator = accumulator - fixedDt
end
print(count)`,
      solution: `3`,
      hints: [
        'fixedDt = 1/60 = ~0.01667.',
        '0.05 / 0.01667 = ~3.0.',
        'Three fixed updates fit within 50ms.',
      ],
      concepts: ['game-loop', 'fixed-timestep'],
    },
    {
      id: 'lua-gameloop-10',
      title: 'Write Timer System',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a timer system for scheduled callbacks in a game loop.',
      skeleton: `-- Write createTimerSystem() returning:
-- :after(seconds, callback) - call callback after delay
-- :every(seconds, callback) - call callback repeatedly
-- :update(dt) - advance all timers, fire callbacks

-- YOUR CODE HERE`,
      solution: `function createTimerSystem()
  local timers = {}
  local sys = {}
  local mt = {
    __index = {
      after = function(self, seconds, callback)
        timers[#timers + 1] = {
          remaining = seconds,
          callback = callback,
          repeating = false,
          interval = seconds,
        }
      end,
      every = function(self, seconds, callback)
        timers[#timers + 1] = {
          remaining = seconds,
          callback = callback,
          repeating = true,
          interval = seconds,
        }
      end,
      update = function(self, dt)
        for i = #timers, 1, -1 do
          local t = timers[i]
          t.remaining = t.remaining - dt
          if t.remaining <= 0 then
            t.callback()
            if t.repeating then
              t.remaining = t.remaining + t.interval
            else
              table.remove(timers, i)
            end
          end
        end
      end,
    },
  }
  return setmetatable(sys, mt)
end`,
      hints: [
        'Each timer has remaining time, callback, and repeat flag.',
        'update() decrements remaining by dt.',
        'Fire callback when remaining <= 0, reset or remove.',
      ],
      concepts: ['game-loop', 'timers', 'scheduling'],
    },
    {
      id: 'lua-gameloop-11',
      title: 'Write Scene Manager',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a scene manager for organizing game states.',
      skeleton: `-- Write createSceneManager() returning:
-- :register(name, scene) - register a scene {enter, exit, update, draw}
-- :switch(name) - call current exit(), set new scene, call enter()
-- :update(dt) - call current scene's update(dt)
-- :draw() - call current scene's draw()

-- YOUR CODE HERE`,
      solution: `function createSceneManager()
  local scenes = {}
  local current = nil
  local currentName = nil
  local sm = {}
  local mt = {
    __index = {
      register = function(self, name, scene)
        scenes[name] = scene
      end,
      switch = function(self, name)
        if current and current.exit then current.exit() end
        current = scenes[name]
        currentName = name
        if current and current.enter then current.enter() end
      end,
      update = function(self, dt)
        if current and current.update then current.update(dt) end
      end,
      draw = function(self)
        if current and current.draw then current.draw() end
      end,
      getCurrent = function(self)
        return currentName
      end,
    },
  }
  return setmetatable(sm, mt)
end`,
      hints: [
        'Store scenes by name in a table.',
        'switch() handles exit/enter lifecycle.',
        'update/draw delegate to the current scene.',
      ],
      concepts: ['game-loop', 'scenes', 'state-management'],
    },
    {
      id: 'lua-gameloop-12',
      title: 'Fix Update Order',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the game loop that draws before updating.',
      skeleton: `function gameLoop(state, steps)
  for i = 1, steps do
    state.drawCalls = state.drawCalls + 1
    draw(state)  -- BUG: drawing before update
    state.updates = state.updates + 1
    update(state, 1/60)
  end
end

function update(state, dt) state.x = state.x + dt end
function draw(state) end

local state = {x = 0, updates = 0, drawCalls = 0}
gameLoop(state, 3)
print(state.updates)`,
      solution: `function gameLoop(state, steps)
  for i = 1, steps do
    state.updates = state.updates + 1
    update(state, 1/60)  -- FIXED: update first
    state.drawCalls = state.drawCalls + 1
    draw(state)  -- then draw
  end
end

function update(state, dt) state.x = state.x + dt end
function draw(state) end

local state = {x = 0, updates = 0, drawCalls = 0}
gameLoop(state, 3)
print(state.updates)`,
      hints: [
        'Always update game state before drawing.',
        'Drawing old state causes visual lag.',
        'The correct order: input -> update -> draw.',
      ],
      concepts: ['game-loop', 'ordering', 'debugging'],
    },
    {
      id: 'lua-gameloop-13',
      title: 'Write Interpolation Helper',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a position interpolation system for smooth rendering.',
      skeleton: `-- Write createInterpolator() with:
-- :saveState(entity, x, y) - save current position as "previous"
-- :update(entity, x, y) - set current position
-- :getInterpolated(entity, alpha) - return lerped position
-- alpha is 0..1 (0 = previous, 1 = current)

-- YOUR CODE HERE`,
      solution: `function createInterpolator()
  local previous = {}
  local current = {}
  local interp = {}
  local mt = {
    __index = {
      saveState = function(self, entity, x, y)
        previous[entity] = { x = x, y = y }
      end,
      update = function(self, entity, x, y)
        if current[entity] then
          previous[entity] = { x = current[entity].x, y = current[entity].y }
        end
        current[entity] = { x = x, y = y }
      end,
      getInterpolated = function(self, entity, alpha)
        local prev = previous[entity] or current[entity]
        local curr = current[entity]
        if not curr then return 0, 0 end
        local x = prev.x + (curr.x - prev.x) * alpha
        local y = prev.y + (curr.y - prev.y) * alpha
        return x, y
      end,
    },
  }
  return setmetatable(interp, mt)
end`,
      hints: [
        'Store both previous and current positions.',
        'Interpolate using lerp: prev + (curr - prev) * alpha.',
        'This smooths rendering between fixed updates.',
      ],
      concepts: ['game-loop', 'interpolation', 'rendering'],
    },
    {
      id: 'lua-gameloop-14',
      title: 'Write Game Clock',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Track total elapsed game time.',
      skeleton: `local gameClock = {
  elapsed = 0,
  scale = 1.0,  -- time scale (1.0 = normal, 0.5 = slow-mo)
}

function gameClock:update(dt)
  self.elapsed = self.elapsed + dt * self.___
end

gameClock:update(0.016)
gameClock.scale = 0.5
gameClock:update(0.016)
print(gameClock.elapsed > 0)  -- true`,
      solution: `local gameClock = {
  elapsed = 0,
  scale = 1.0,
}

function gameClock:update(dt)
  self.elapsed = self.elapsed + dt * self.scale
end

gameClock:update(0.016)
gameClock.scale = 0.5
gameClock:update(0.016)
print(gameClock.elapsed > 0)  -- true`,
      hints: [
        'Multiply dt by the time scale.',
        'scale = 1.0 means normal speed.',
        'scale = 0.5 means half speed (slow motion).',
      ],
      concepts: ['game-loop', 'time-scale'],
    },
    {
      id: 'lua-gameloop-15',
      title: 'Predict Slow Motion',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict position with time scaling.',
      skeleton: `local x = 0
local speed = 100
local scale = 0.5  -- slow motion

for i = 1, 10 do
  local dt = 0.1
  x = x + speed * dt * scale
end
print(x)`,
      solution: `50.0`,
      hints: [
        'Each frame: 100 * 0.1 * 0.5 = 5.',
        '10 frames: 5 * 10 = 50.',
        'Slow motion halves the effective speed.',
      ],
      concepts: ['game-loop', 'time-scale'],
    },
    {
      id: 'lua-gameloop-16',
      title: 'Write Tween System',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a simple tweening system for animations.',
      skeleton: `-- Write createTween(target, key, endVal, duration) that:
-- Animates target[key] from its current value to endVal over duration seconds.
-- :update(dt) - advance the tween, return true when complete
-- :getValue() - return current interpolated value
-- Use linear interpolation.

-- YOUR CODE HERE`,
      solution: `function createTween(target, key, endVal, duration)
  local startVal = target[key]
  local elapsed = 0
  local tween = {}
  local mt = {
    __index = {
      update = function(self, dt)
        elapsed = elapsed + dt
        if elapsed >= duration then
          elapsed = duration
          target[key] = endVal
          return true
        end
        local t = elapsed / duration
        target[key] = startVal + (endVal - startVal) * t
        return false
      end,
      getValue = function(self)
        return target[key]
      end,
    },
  }
  return setmetatable(tween, mt)
end`,
      hints: [
        'Track elapsed time and compute t = elapsed / duration.',
        'Lerp: startVal + (endVal - startVal) * t.',
        'Return true from update when the tween completes.',
      ],
      concepts: ['game-loop', 'tweening', 'animation'],
    },
    {
      id: 'lua-gameloop-17',
      title: 'Refactor Spaghetti Loop',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor a monolithic game loop into clean phases.',
      skeleton: `local x, y, vx, vy = 0, 0, 1, 2
local hp = 100
local enemies = {{x=10,y=10}}

for frame = 1, 100 do
  -- everything mixed together
  x = x + vx * 0.016
  y = y + vy * 0.016
  for _, e in ipairs(enemies) do
    if math.abs(e.x - x) < 1 then hp = hp - 1 end
  end
  -- "drawing" mixed in
  local display = string.format("(%d,%d) hp:%d", x, y, hp)
end
print(hp)`,
      solution: `local player = {x = 0, y = 0, vx = 1, vy = 2, hp = 100}
local enemies = {{x = 10, y = 10}}

local function updateMovement(dt)
  player.x = player.x + player.vx * dt
  player.y = player.y + player.vy * dt
end

local function updateCollisions()
  for _, e in ipairs(enemies) do
    if math.abs(e.x - player.x) < 1 then
      player.hp = player.hp - 1
    end
  end
end

local function draw()
  return string.format("(%d,%d) hp:%d", player.x, player.y, player.hp)
end

for frame = 1, 100 do
  local dt = 0.016
  updateMovement(dt)
  updateCollisions()
  draw()
end
print(player.hp)`,
      hints: [
        'Separate movement, collision, and drawing into functions.',
        'Group related state into tables (player).',
        'The main loop calls each phase in order.',
      ],
      concepts: ['game-loop', 'refactoring', 'separation-of-concerns'],
    },
    {
      id: 'lua-gameloop-18',
      title: 'Refactor Magic Numbers',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Extract magic numbers in a game loop into named constants.',
      skeleton: `local x = 0
for i = 1, 1000 do
  x = x + 200 * 0.016666
  if x > 800 then x = 0 end
end
print(math.floor(x))`,
      solution: `local SPEED = 200
local FIXED_DT = 1/60
local SCREEN_WIDTH = 800
local MAX_FRAMES = 1000

local x = 0
for i = 1, MAX_FRAMES do
  x = x + SPEED * FIXED_DT
  if x > SCREEN_WIDTH then x = 0 end
end
print(math.floor(x))`,
      hints: [
        '200 is the speed, extract as SPEED.',
        '0.016666 is 1/60, extract as FIXED_DT.',
        '800 is screen width, 1000 is max frames.',
      ],
      concepts: ['game-loop', 'refactoring', 'constants'],
    },
    {
      id: 'lua-gameloop-19',
      title: 'Write Particle System',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a simple particle system with spawning and updating.',
      skeleton: `-- Write createParticleSystem(maxParticles) with:
-- :emit(x, y, vx, vy, life) - add a particle
-- :update(dt) - update positions, decrease life, remove dead
-- :getParticles() - return array of alive particles
-- :count() - return alive count

-- YOUR CODE HERE`,
      solution: `function createParticleSystem(maxParticles)
  local particles = {}
  local ps = {}
  local mt = {
    __index = {
      emit = function(self, x, y, vx, vy, life)
        if #particles >= maxParticles then return end
        particles[#particles + 1] = {
          x = x, y = y, vx = vx, vy = vy, life = life,
        }
      end,
      update = function(self, dt)
        for i = #particles, 1, -1 do
          local p = particles[i]
          p.x = p.x + p.vx * dt
          p.y = p.y + p.vy * dt
          p.life = p.life - dt
          if p.life <= 0 then
            table.remove(particles, i)
          end
        end
      end,
      getParticles = function(self)
        return particles
      end,
      count = function(self)
        return #particles
      end,
    },
  }
  return setmetatable(ps, mt)
end`,
      hints: [
        'Each particle has position, velocity, and lifetime.',
        'update() moves particles and decreases life.',
        'Remove dead particles by iterating backwards.',
      ],
      concepts: ['game-loop', 'particles', 'simulation'],
    },
    {
      id: 'lua-gameloop-20',
      title: 'Write Complete Mini Game Loop',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a complete mini game loop framework.',
      skeleton: `-- Write createGame(config) returning:
-- :init() - called once at start
-- :run(frames) - run the game loop for N frames
-- :getState() - return current game state
-- Config: { fixedDt, init, update, draw }
-- Use fixed timestep with accumulator.

-- YOUR CODE HERE`,
      solution: `function createGame(config)
  local state = {}
  local accumulator = 0
  local frameCount = 0
  local game = {}
  local mt = {
    __index = {
      init = function(self)
        if config.init then
          state = config.init() or state
        end
      end,
      run = function(self, frames)
        local lastTime = os.clock()
        for i = 1, frames do
          local now = os.clock()
          local dt = now - lastTime
          lastTime = now
          dt = math.min(dt, config.fixedDt * 10)
          accumulator = accumulator + dt
          while accumulator >= config.fixedDt do
            if config.update then
              config.update(state, config.fixedDt)
            end
            accumulator = accumulator - config.fixedDt
          end
          if config.draw then
            config.draw(state, accumulator / config.fixedDt)
          end
          frameCount = frameCount + 1
        end
      end,
      getState = function(self)
        return state
      end,
    },
  }
  return setmetatable(game, mt)
end`,
      hints: [
        'Use a fixed timestep with an accumulator.',
        'Cap dt to prevent spiral of death.',
        'Draw receives alpha for interpolation.',
      ],
      concepts: ['game-loop', 'framework', 'fixed-timestep'],
    },
  ],
};
