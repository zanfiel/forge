import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-love',
  title: '45. LOVE2D Basics',
  explanation: `## LOVE2D Basics in Lua

LOVE2D is a popular Lua game framework. While we cannot run LOVE2D here, understanding its API patterns is essential for Lua game development:

\`\`\`lua
-- Main callbacks
function love.load()
  -- Called once at startup
  player = { x = 400, y = 300, speed = 200 }
end

function love.update(dt)
  -- Called every frame with delta time
  if love.keyboard.isDown("right") then
    player.x = player.x + player.speed * dt
  end
end

function love.draw()
  -- Called every frame for rendering
  love.graphics.setColor(1, 0, 0)
  love.graphics.rectangle("fill", player.x, player.y, 32, 32)
  love.graphics.setColor(1, 1, 1)
  love.graphics.print("Hello LOVE2D!", 10, 10)
end

-- Input callbacks
function love.keypressed(key)
  if key == "escape" then love.event.quit() end
end

function love.mousepressed(x, y, button)
  -- handle mouse click
end

-- Common patterns
love.graphics.newImage("sprite.png")
love.audio.newSource("music.ogg", "stream")
love.graphics.newFont(14)
\`\`\`

LOVE2D uses a callback-based architecture where you define functions that the framework calls.`,
  exercises: [
    {
      id: 'lua-love-1',
      title: 'Define Load Callback',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Define the love.load callback to initialize game state.',
      skeleton: `-- Simulate LOVE2D callback structure
local love = { graphics = {}, keyboard = {} }
local player

function love.___(  )
  player = { x = 400, y = 300, speed = 200 }
end

love.load()
print(player.x)  -- 400`,
      solution: `local love = { graphics = {}, keyboard = {} }
local player

function love.load()
  player = { x = 400, y = 300, speed = 200 }
end

love.load()
print(player.x)  -- 400`,
      hints: [
        'love.load is called once when the game starts.',
        'Use it to initialize player, load assets, etc.',
        'It takes no arguments.',
      ],
      concepts: ['love2d', 'callbacks', 'initialization'],
    },
    {
      id: 'lua-love-2',
      title: 'Define Update Callback',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Write the love.update callback with delta time.',
      skeleton: `local love = { keyboard = { isDown = function(k) return k == "right" end } }
local player = { x = 0, speed = 200 }

function love.update(___)
  if love.keyboard.isDown("right") then
    player.x = player.x + player.speed * ___
  end
end

love.update(0.5)
print(player.x)  -- 100`,
      solution: `local love = { keyboard = { isDown = function(k) return k == "right" end } }
local player = { x = 0, speed = 200 }

function love.update(dt)
  if love.keyboard.isDown("right") then
    player.x = player.x + player.speed * dt
  end
end

love.update(0.5)
print(player.x)  -- 100`,
      hints: [
        'love.update receives dt (delta time) as its argument.',
        'Multiply speed by dt for frame-independent movement.',
        '200 * 0.5 = 100 units moved.',
      ],
      concepts: ['love2d', 'update', 'delta-time'],
    },
    {
      id: 'lua-love-3',
      title: 'Predict Player Position',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict player position after multiple updates.',
      skeleton: `local player = { x = 100, speed = 50 }
local function update(dt)
  player.x = player.x + player.speed * dt
end
update(0.1)
update(0.1)
update(0.1)
print(player.x)`,
      solution: `115.0`,
      hints: [
        'Each update adds 50 * 0.1 = 5.',
        'Three updates: 100 + 5 + 5 + 5 = 115.',
        'Movement is cumulative across frames.',
      ],
      concepts: ['love2d', 'movement'],
    },
    {
      id: 'lua-love-4',
      title: 'Write Game State Manager',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a state manager compatible with LOVE2D callbacks.',
      skeleton: `-- Write createStateManager() that manages game states.
-- Each state is a table with optional: load, update, draw, keypressed.
-- :register(name, state) :switch(name) :update(dt) :draw() :keypressed(key)

-- YOUR CODE HERE`,
      solution: `function createStateManager()
  local states = {}
  local current = nil
  local sm = {}
  local mt = {
    __index = {
      register = function(self, name, state)
        states[name] = state
      end,
      switch = function(self, name)
        current = states[name]
        if current and current.load then current.load() end
      end,
      update = function(self, dt)
        if current and current.update then current.update(dt) end
      end,
      draw = function(self)
        if current and current.draw then current.draw() end
      end,
      keypressed = function(self, key)
        if current and current.keypressed then current.keypressed(key) end
      end,
    },
  }
  return setmetatable(sm, mt)
end`,
      hints: [
        'Store states by name, track the current one.',
        'Delegate LOVE2D callbacks to the current state.',
        'Check if the callback exists before calling.',
      ],
      concepts: ['love2d', 'state-management'],
    },
    {
      id: 'lua-love-5',
      title: 'Write Sprite Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a sprite class with position, size, and movement.',
      skeleton: `-- Write createSprite(x, y, w, h) returning:
-- :move(dx, dy) - adjust position
-- :moveTo(x, y) - set position
-- :getBounds() - return x, y, w, h
-- :contains(px, py) - point-in-rect check

-- YOUR CODE HERE`,
      solution: `function createSprite(x, y, w, h)
  local sprite = {}
  local mt = {
    __index = {
      move = function(self, dx, dy)
        x = x + dx
        y = y + dy
      end,
      moveTo = function(self, nx, ny)
        x = nx
        y = ny
      end,
      getBounds = function(self)
        return x, y, w, h
      end,
      contains = function(self, px, py)
        return px >= x and px <= x + w and py >= y and py <= y + h
      end,
    },
  }
  return setmetatable(sprite, mt)
end`,
      hints: [
        'Store position in closure variables for encapsulation.',
        'contains checks if a point is inside the rectangle.',
        'getBounds returns all four values.',
      ],
      concepts: ['love2d', 'sprites', 'geometry'],
    },
    {
      id: 'lua-love-6',
      title: 'Write Input Mapper',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write an input mapper for LOVE2D-style keyboard handling.',
      skeleton: `-- Write createInputMapper() with:
-- :mapKey(key, action) - bind keyboard key to action name
-- :handleKeyPressed(key) - return action name or nil
-- :getActions() - return table of all bound actions

-- YOUR CODE HERE`,
      solution: `function createInputMapper()
  local keyMap = {}
  local mapper = {}
  local mt = {
    __index = {
      mapKey = function(self, key, action)
        keyMap[key] = action
      end,
      handleKeyPressed = function(self, key)
        return keyMap[key]
      end,
      getActions = function(self)
        local actions = {}
        for _, action in pairs(keyMap) do
          actions[action] = true
        end
        local result = {}
        for action in pairs(actions) do
          result[#result + 1] = action
        end
        return result
      end,
    },
  }
  return setmetatable(mapper, mt)
end`,
      hints: [
        'Store key-to-action mappings.',
        'handleKeyPressed looks up the action for a key.',
        'getActions collects unique action names.',
      ],
      concepts: ['love2d', 'input', 'mapping'],
    },
    {
      id: 'lua-love-7',
      title: 'Fix Draw Order',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the rendering that draws background over foreground.',
      skeleton: `local drawLog = {}

function drawBackground()
  drawLog[#drawLog + 1] = "bg"
end

function drawPlayer()
  drawLog[#drawLog + 1] = "player"
end

function drawUI()
  drawLog[#drawLog + 1] = "ui"
end

-- BUG: wrong draw order
function draw()
  drawPlayer()
  drawUI()
  drawBackground()  -- covers everything!
end

draw()
print(table.concat(drawLog, ","))  -- should be bg,player,ui`,
      solution: `local drawLog = {}

function drawBackground()
  drawLog[#drawLog + 1] = "bg"
end

function drawPlayer()
  drawLog[#drawLog + 1] = "player"
end

function drawUI()
  drawLog[#drawLog + 1] = "ui"
end

-- FIXED: correct draw order (back to front)
function draw()
  drawBackground()
  drawPlayer()
  drawUI()
end

draw()
print(table.concat(drawLog, ","))  -- bg,player,ui`,
      hints: [
        'Draw order: background first, then sprites, then UI.',
        'Later draws cover earlier draws (painters algorithm).',
        'UI should always be drawn last.',
      ],
      concepts: ['love2d', 'draw-order', 'debugging'],
    },
    {
      id: 'lua-love-8',
      title: 'Write Animation Frame Counter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a frame-based animation controller.',
      skeleton: `-- Write createAnimation(frameCount, frameDuration) returning:
-- :update(dt) - advance animation timer
-- :getFrame() - return current frame number (1-based)
-- :isComplete() - true if played through once (non-looping)
-- :reset() - restart from frame 1

-- YOUR CODE HERE`,
      solution: `function createAnimation(frameCount, frameDuration)
  local elapsed = 0
  local totalDuration = frameCount * frameDuration
  local anim = {}
  local mt = {
    __index = {
      update = function(self, dt)
        elapsed = elapsed + dt
      end,
      getFrame = function(self)
        local frame = math.floor(elapsed / frameDuration) + 1
        if frame > frameCount then frame = frameCount end
        return frame
      end,
      isComplete = function(self)
        return elapsed >= totalDuration
      end,
      reset = function(self)
        elapsed = 0
      end,
    },
  }
  return setmetatable(anim, mt)
end`,
      hints: [
        'Track elapsed time and divide by frame duration.',
        'Current frame = floor(elapsed / frameDuration) + 1.',
        'Clamp to frameCount for non-looping.',
      ],
      concepts: ['love2d', 'animation', 'timing'],
    },
    {
      id: 'lua-love-9',
      title: 'Predict Animation Frame',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict which animation frame is showing.',
      skeleton: `local elapsed = 0
local frameDuration = 0.1
local frameCount = 4

elapsed = 0.25
local frame = math.floor(elapsed / frameDuration) + 1
if frame > frameCount then frame = frameCount end
print(frame)`,
      solution: `3`,
      hints: [
        '0.25 / 0.1 = 2.5, floor = 2.',
        '2 + 1 = 3.',
        'Frame 3 of 4.',
      ],
      concepts: ['love2d', 'animation', 'frames'],
    },
    {
      id: 'lua-love-10',
      title: 'Write Camera System',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a simple 2D camera for LOVE2D-style rendering.',
      skeleton: `-- Write createCamera(x, y) returning:
-- :moveTo(x, y) - set camera position
-- :follow(target, dt, speed) - smoothly follow target {x, y}
-- :worldToScreen(wx, wy) - convert world coords to screen
-- :screenToWorld(sx, sy) - convert screen coords to world

-- YOUR CODE HERE`,
      solution: `function createCamera(cx, cy)
  local cam = {}
  local mt = {
    __index = {
      moveTo = function(self, x, y)
        cx = x
        cy = y
      end,
      follow = function(self, target, dt, speed)
        cx = cx + (target.x - cx) * speed * dt
        cy = cy + (target.y - cy) * speed * dt
      end,
      worldToScreen = function(self, wx, wy)
        return wx - cx, wy - cy
      end,
      screenToWorld = function(self, sx, sy)
        return sx + cx, sy + cy
      end,
      getPosition = function(self)
        return cx, cy
      end,
    },
  }
  return setmetatable(cam, mt)
end`,
      hints: [
        'follow uses lerp for smooth camera movement.',
        'worldToScreen subtracts camera position.',
        'screenToWorld adds camera position.',
      ],
      concepts: ['love2d', 'camera', '2d-graphics'],
    },
    {
      id: 'lua-love-11',
      title: 'Write AABB Collision',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write axis-aligned bounding box collision detection.',
      skeleton: `-- Write checkCollision(a, b) where a and b are
-- {x, y, w, h} rectangles. Return true if they overlap.

-- YOUR CODE HERE`,
      solution: `function checkCollision(a, b)
  return a.x < b.x + b.w
    and a.x + a.w > b.x
    and a.y < b.y + b.h
    and a.y + a.h > b.y
end`,
      hints: [
        'Two rectangles overlap if they overlap on both axes.',
        'X overlap: a.x < b.x + b.w AND a.x + a.w > b.x.',
        'Y overlap: a.y < b.y + b.h AND a.y + a.h > b.y.',
      ],
      concepts: ['love2d', 'collision', 'aabb'],
    },
    {
      id: 'lua-love-12',
      title: 'Fix Keyboard Input Check',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the input check that moves in the wrong direction.',
      skeleton: `local love = {
  keyboard = { isDown = function(k) return k == "left" end }
}
local player = {x = 100, speed = 200}

function update(dt)
  if love.keyboard.isDown("left") then
    player.x = player.x + player.speed * dt  -- BUG: should move left
  end
  if love.keyboard.isDown("right") then
    player.x = player.x + player.speed * dt
  end
end

update(0.1)
print(player.x > 100)  -- should be false (moved left), but is true`,
      solution: `local love = {
  keyboard = { isDown = function(k) return k == "left" end }
}
local player = {x = 100, speed = 200}

function update(dt)
  if love.keyboard.isDown("left") then
    player.x = player.x - player.speed * dt  -- FIXED: subtract for left
  end
  if love.keyboard.isDown("right") then
    player.x = player.x + player.speed * dt
  end
end

update(0.1)
print(player.x > 100)  -- false (moved left)`,
      hints: [
        'Moving left means decreasing x.',
        'Use subtraction (- speed * dt) for left movement.',
        'Use addition (+ speed * dt) for right movement.',
      ],
      concepts: ['love2d', 'input', 'debugging'],
    },
    {
      id: 'lua-love-13',
      title: 'Write Color Helper',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Convert hex color to LOVE2D 0-1 float format.',
      skeleton: `function hexToLove(hex)
  hex = hex:gsub("#", "")
  local r = tonumber(hex:sub(1, 2), 16) / ___
  local g = tonumber(hex:sub(3, 4), 16) / ___
  local b = tonumber(hex:sub(5, 6), 16) / ___
  return r, g, b
end
local r, g, b = hexToLove("#FF8000")
print(r)  -- 1.0
print(g > 0 and g < 1)  -- true`,
      solution: `function hexToLove(hex)
  hex = hex:gsub("#", "")
  local r = tonumber(hex:sub(1, 2), 16) / 255
  local g = tonumber(hex:sub(3, 4), 16) / 255
  local b = tonumber(hex:sub(5, 6), 16) / 255
  return r, g, b
end
local r, g, b = hexToLove("#FF8000")
print(r)  -- 1.0
print(g > 0 and g < 1)  -- true`,
      hints: [
        'LOVE2D uses 0-1 color values, not 0-255.',
        'Divide each byte value by 255.',
        '0xFF / 255 = 1.0.',
      ],
      concepts: ['love2d', 'colors', 'conversion'],
    },
    {
      id: 'lua-love-14',
      title: 'Write Entity Manager',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write an entity manager for a LOVE2D game.',
      skeleton: `-- Write createEntityManager() with:
-- :add(entity) - add entity (table with optional update, draw methods)
-- :remove(entity) - mark for removal
-- :update(dt) - update all entities, remove marked ones
-- :draw() - draw all entities
-- :count() - return entity count

-- YOUR CODE HERE`,
      solution: `function createEntityManager()
  local entities = {}
  local toRemove = {}
  local em = {}
  local mt = {
    __index = {
      add = function(self, entity)
        entities[#entities + 1] = entity
      end,
      remove = function(self, entity)
        toRemove[entity] = true
      end,
      update = function(self, dt)
        for i = #entities, 1, -1 do
          if toRemove[entities[i]] then
            table.remove(entities, i)
          end
        end
        toRemove = {}
        for _, e in ipairs(entities) do
          if e.update then e:update(dt) end
        end
      end,
      draw = function(self)
        for _, e in ipairs(entities) do
          if e.draw then e:draw() end
        end
      end,
      count = function(self)
        return #entities
      end,
    },
  }
  return setmetatable(em, mt)
end`,
      hints: [
        'Defer removal to avoid modifying during iteration.',
        'Remove marked entities at the start of update.',
        'Check for update/draw methods before calling.',
      ],
      concepts: ['love2d', 'entity-management'],
    },
    {
      id: 'lua-love-15',
      title: 'Predict Collision Result',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict whether two rectangles collide.',
      skeleton: `local a = {x=0, y=0, w=10, h=10}
local b = {x=5, y=5, w=10, h=10}
local c = {x=20, y=20, w=5, h=5}
local function collides(r1, r2)
  return r1.x < r2.x+r2.w and r1.x+r1.w > r2.x and
         r1.y < r2.y+r2.h and r1.y+r1.h > r2.y
end
print(collides(a, b))
print(collides(a, c))`,
      solution: `true
false`,
      hints: [
        'a (0,0,10,10) and b (5,5,10,10) overlap in the corner.',
        'a (0,0,10,10) and c (20,20,5,5) are far apart.',
        'AABB checks both x and y axis overlap.',
      ],
      concepts: ['love2d', 'collision'],
    },
    {
      id: 'lua-love-16',
      title: 'Write Audio Manager Stub',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write an audio manager that tracks sounds by name.',
      skeleton: `-- Write createAudioManager() with:
-- :register(name, data) - register a sound (data is any value for simulation)
-- :play(name) - add to playing list, return true/false
-- :stop(name) - remove from playing list
-- :isPlaying(name) - check if playing
-- :getPlayingCount() - return number of playing sounds

-- YOUR CODE HERE`,
      solution: `function createAudioManager()
  local sounds = {}
  local playing = {}
  local am = {}
  local mt = {
    __index = {
      register = function(self, name, data)
        sounds[name] = data
      end,
      play = function(self, name)
        if not sounds[name] then return false end
        playing[name] = true
        return true
      end,
      stop = function(self, name)
        playing[name] = nil
      end,
      isPlaying = function(self, name)
        return playing[name] == true
      end,
      getPlayingCount = function(self)
        local count = 0
        for _ in pairs(playing) do count = count + 1 end
        return count
      end,
    },
  }
  return setmetatable(am, mt)
end`,
      hints: [
        'Track registered sounds and currently playing sounds separately.',
        'play() checks if the sound is registered.',
        'Use a set (table with true values) for playing state.',
      ],
      concepts: ['love2d', 'audio', 'management'],
    },
    {
      id: 'lua-love-17',
      title: 'Refactor Inline LOVE Callbacks',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor monolithic LOVE2D callbacks into a module.',
      skeleton: `-- Monolithic main.lua style
local love = {}
local px, py, speed = 0, 0, 200
local enemies = {}

function love.load()
  enemies = {{x=100,y=100},{x=200,y=200}}
end

function love.update(dt)
  px = px + speed * dt
  for _, e in ipairs(enemies) do
    e.x = e.x - 50 * dt
  end
end

love.load()
love.update(0.1)
print(px)`,
      solution: `local love = {}

local Player = {x = 0, y = 0, speed = 200}
function Player:update(dt)
  self.x = self.x + self.speed * dt
end

local EnemyManager = {enemies = {}}
function EnemyManager:load()
  self.enemies = {{x=100,y=100},{x=200,y=200}}
end
function EnemyManager:update(dt)
  for _, e in ipairs(self.enemies) do
    e.x = e.x - 50 * dt
  end
end

function love.load()
  EnemyManager:load()
end

function love.update(dt)
  Player:update(dt)
  EnemyManager:update(dt)
end

love.load()
love.update(0.1)
print(Player.x)`,
      hints: [
        'Extract player logic into a Player module.',
        'Extract enemy logic into an EnemyManager.',
        'LOVE callbacks delegate to each module.',
      ],
      concepts: ['love2d', 'refactoring', 'modules'],
    },
    {
      id: 'lua-love-18',
      title: 'Refactor Hard-coded Keys',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor hard-coded key checks into configurable bindings.',
      skeleton: `local love = { keyboard = { isDown = function(k) return false end }}
local player = {x = 0, y = 0, speed = 200}

function love.update(dt)
  if love.keyboard.isDown("w") then player.y = player.y - player.speed * dt end
  if love.keyboard.isDown("s") then player.y = player.y + player.speed * dt end
  if love.keyboard.isDown("a") then player.x = player.x - player.speed * dt end
  if love.keyboard.isDown("d") then player.x = player.x + player.speed * dt end
end`,
      solution: `local love = { keyboard = { isDown = function(k) return false end }}
local player = {x = 0, y = 0, speed = 200}

local bindings = {
  up = "w", down = "s", left = "a", right = "d",
}
local moveMap = {
  up    = {dx = 0,  dy = -1},
  down  = {dx = 0,  dy = 1},
  left  = {dx = -1, dy = 0},
  right = {dx = 1,  dy = 0},
}

function love.update(dt)
  for action, key in pairs(bindings) do
    if love.keyboard.isDown(key) then
      local m = moveMap[action]
      player.x = player.x + m.dx * player.speed * dt
      player.y = player.y + m.dy * player.speed * dt
    end
  end
end`,
      hints: [
        'Map action names to key strings in a bindings table.',
        'Map actions to direction vectors.',
        'Loop over bindings instead of writing one check per key.',
      ],
      concepts: ['love2d', 'input-binding', 'refactoring'],
    },
    {
      id: 'lua-love-19',
      title: 'Write Screen Shake',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a screen shake effect for LOVE2D.',
      skeleton: `-- Write createScreenShake() with:
-- :trigger(intensity, duration) - start a shake
-- :update(dt) - decrease shake over time
-- :getOffset() - return dx, dy (random offset based on current intensity)
-- Intensity decreases linearly to 0 over duration.

-- YOUR CODE HERE`,
      solution: `function createScreenShake()
  local intensity = 0
  local duration = 0
  local elapsed = 0
  local shake = {}
  local mt = {
    __index = {
      trigger = function(self, int, dur)
        intensity = int
        duration = dur
        elapsed = 0
      end,
      update = function(self, dt)
        if duration <= 0 then return end
        elapsed = elapsed + dt
        if elapsed >= duration then
          intensity = 0
          duration = 0
        end
      end,
      getOffset = function(self)
        if intensity <= 0 then return 0, 0 end
        local t = 1 - (elapsed / duration)
        local current = intensity * t
        local dx = (math.random() * 2 - 1) * current
        local dy = (math.random() * 2 - 1) * current
        return dx, dy
      end,
    },
  }
  return setmetatable(shake, mt)
end`,
      hints: [
        'Track intensity that decays over duration.',
        'getOffset returns random values scaled by current intensity.',
        'math.random() * 2 - 1 gives a range of -1 to 1.',
      ],
      concepts: ['love2d', 'effects', 'animation'],
    },
    {
      id: 'lua-love-20',
      title: 'Write Tilemap Renderer',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a simple tilemap data structure with coordinate lookup.',
      skeleton: `-- Write createTilemap(width, height, tileSize) with:
-- :setTile(col, row, tileId) - set tile at grid position
-- :getTile(col, row) - get tile ID at grid position
-- :worldToTile(wx, wy) - convert world coords to tile col, row
-- :tileToWorld(col, row) - convert tile to world coords (top-left)

-- YOUR CODE HERE`,
      solution: `function createTilemap(width, height, tileSize)
  local tiles = {}
  local tm = {}
  local function key(col, row)
    return row * width + col
  end
  local mt = {
    __index = {
      setTile = function(self, col, row, tileId)
        tiles[key(col, row)] = tileId
      end,
      getTile = function(self, col, row)
        return tiles[key(col, row)]
      end,
      worldToTile = function(self, wx, wy)
        local col = math.floor(wx / tileSize)
        local row = math.floor(wy / tileSize)
        return col, row
      end,
      tileToWorld = function(self, col, row)
        return col * tileSize, row * tileSize
      end,
    },
  }
  return setmetatable(tm, mt)
end`,
      hints: [
        'Use a flat table with computed keys for tile storage.',
        'worldToTile divides by tileSize and floors.',
        'tileToWorld multiplies by tileSize.',
      ],
      concepts: ['love2d', 'tilemap', '2d-graphics'],
    },
  ],
};
