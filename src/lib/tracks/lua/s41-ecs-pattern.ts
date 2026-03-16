import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-ecs',
  title: '41. ECS Pattern',
  explanation: `## Entity-Component-System in Lua

ECS is a composition-over-inheritance pattern widely used in game development:

\`\`\`lua
-- Entities are just IDs
local nextId = 0
function createEntity()
  nextId = nextId + 1
  return nextId
end

-- Components are data stored per entity
local positions = {}    -- positions[entityId] = {x, y}
local velocities = {}   -- velocities[entityId] = {vx, vy}
local healths = {}      -- healths[entityId] = {hp, maxHp}

-- Add components
function addPosition(entity, x, y)
  positions[entity] = {x = x, y = y}
end

function addVelocity(entity, vx, vy)
  velocities[entity] = {vx = vx, vy = vy}
end

-- Systems operate on entities with specific components
function movementSystem(dt)
  for entity, pos in pairs(positions) do
    local vel = velocities[entity]
    if vel then
      pos.x = pos.x + vel.vx * dt
      pos.y = pos.y + vel.vy * dt
    end
  end
end

-- Query entities with specific components
function entitiesWith(...)
  local stores = {...}
  local result = {}
  for entity in pairs(stores[1]) do
    local hasAll = true
    for i = 2, #stores do
      if not stores[i][entity] then hasAll = false; break end
    end
    if hasAll then result[#result + 1] = entity end
  end
  return result
end
\`\`\``,
  exercises: [
    {
      id: 'lua-ecs-1',
      title: 'Create Entity ID',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Create a simple entity ID generator.',
      skeleton: `local nextId = 0
function createEntity()
  nextId = nextId ___ 1
  return nextId
end
local e1 = createEntity()
local e2 = createEntity()
print(e1, e2)  -- 1, 2`,
      solution: `local nextId = 0
function createEntity()
  nextId = nextId + 1
  return nextId
end
local e1 = createEntity()
local e2 = createEntity()
print(e1, e2)  -- 1, 2`,
      hints: [
        'Increment the ID counter each time.',
        'Each entity gets a unique numeric ID.',
        'The counter persists between calls via closure.',
      ],
      concepts: ['ecs', 'entities'],
    },
    {
      id: 'lua-ecs-2',
      title: 'Add Component Data',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Store component data for an entity.',
      skeleton: `local positions = {}
function addPosition(entity, x, y)
  positions[___] = { x = x, y = y }
end
local e = 1
addPosition(e, 10, 20)
print(positions[e].x, positions[e].y)  -- 10, 20`,
      solution: `local positions = {}
function addPosition(entity, x, y)
  positions[entity] = { x = x, y = y }
end
local e = 1
addPosition(e, 10, 20)
print(positions[e].x, positions[e].y)  -- 10, 20`,
      hints: [
        'Use the entity ID as the key in the component table.',
        'Store component data as a table with named fields.',
        'Each component type has its own storage table.',
      ],
      concepts: ['ecs', 'components'],
    },
    {
      id: 'lua-ecs-3',
      title: 'Write Movement System',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a system that updates positions based on velocities.',
      skeleton: `local positions = {}
local velocities = {}

-- Write movementSystem(dt) that updates all entities
-- with both position and velocity components.
-- pos.x += vel.vx * dt, pos.y += vel.vy * dt

-- YOUR CODE HERE`,
      solution: `function movementSystem(dt)
  for entity, pos in pairs(positions) do
    local vel = velocities[entity]
    if vel then
      pos.x = pos.x + vel.vx * dt
      pos.y = pos.y + vel.vy * dt
    end
  end
end`,
      hints: [
        'Iterate positions and check for matching velocity.',
        'Only update entities that have both components.',
        'Multiply velocity by dt for frame-independent movement.',
      ],
      concepts: ['ecs', 'systems', 'movement'],
    },
    {
      id: 'lua-ecs-4',
      title: 'Predict Component Query',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict which entities have specific components.',
      skeleton: `local pos = { [1]={x=0,y=0}, [2]={x=5,y=5}, [3]={x=1,y=1} }
local vel = { [1]={vx=1,vy=0}, [3]={vx=0,vy=1} }
local hp  = { [2]={hp=100}, [3]={hp=50} }

local count = 0
for e in pairs(pos) do
  if vel[e] then count = count + 1 end
end
print(count)`,
      solution: `2`,
      hints: [
        'Entities 1, 2, 3 have positions.',
        'Entities 1 and 3 have velocities.',
        'Two entities (1 and 3) have both pos and vel.',
      ],
      concepts: ['ecs', 'queries'],
    },
    {
      id: 'lua-ecs-5',
      title: 'Write ECS World',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write an ECS world that manages entities and components.',
      skeleton: `-- Write createWorld() returning:
-- :createEntity() - return new entity ID
-- :addComponent(entity, name, data) - store component data
-- :getComponent(entity, name) - retrieve component data
-- :removeEntity(entity) - remove entity and all its components

-- YOUR CODE HERE`,
      solution: `function createWorld()
  local nextId = 0
  local components = {}
  local world = {}
  local mt = {
    __index = {
      createEntity = function(self)
        nextId = nextId + 1
        return nextId
      end,
      addComponent = function(self, entity, name, data)
        if not components[name] then components[name] = {} end
        components[name][entity] = data
      end,
      getComponent = function(self, entity, name)
        if not components[name] then return nil end
        return components[name][entity]
      end,
      removeEntity = function(self, entity)
        for name, store in pairs(components) do
          store[entity] = nil
        end
      end,
    },
  }
  return setmetatable(world, mt)
end`,
      hints: [
        'Components are stored as components[name][entity] = data.',
        'createEntity increments a counter.',
        'removeEntity clears the entity from all component stores.',
      ],
      concepts: ['ecs', 'world', 'management'],
    },
    {
      id: 'lua-ecs-6',
      title: 'Write Query Function',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a function that queries entities having all specified components.',
      skeleton: `-- Write query(world, ...) where ... are component names.
-- Returns a table of entity IDs that have ALL specified components.
-- world has :getComponent(entity, name).
-- Also pass component stores as tables.

-- Simpler: write entitiesWith(...) where args are component store tables.
-- Return entities present in ALL stores.

-- YOUR CODE HERE`,
      solution: `function entitiesWith(...)
  local stores = { ... }
  if #stores == 0 then return {} end
  local result = {}
  for entity in pairs(stores[1]) do
    local hasAll = true
    for i = 2, #stores do
      if not stores[i][entity] then
        hasAll = false
        break
      end
    end
    if hasAll then
      result[#result + 1] = entity
    end
  end
  return result
end`,
      hints: [
        'Iterate entities in the first store.',
        'For each entity, check if it exists in all other stores.',
        'Only include entities that pass all checks.',
      ],
      concepts: ['ecs', 'queries', 'composition'],
    },
    {
      id: 'lua-ecs-7',
      title: 'Fix Entity Removal',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix entity removal that leaves orphaned components.',
      skeleton: `local positions = {}
local velocities = {}
local healths = {}

function removeEntity(entity)
  positions[entity] = nil
  velocities[entity] = nil
  -- BUG: forgot to remove from healths
end

positions[1] = {x=0, y=0}
velocities[1] = {vx=1, vy=0}
healths[1] = {hp=100}
removeEntity(1)
print(healths[1] ~= nil)  -- should be false but is true`,
      solution: `local positions = {}
local velocities = {}
local healths = {}

-- FIXED: Use a registry of all component stores
local allStores = {positions, velocities, healths}

function removeEntity(entity)
  for _, store in ipairs(allStores) do
    store[entity] = nil
  end
end

positions[1] = {x=0, y=0}
velocities[1] = {vx=1, vy=0}
healths[1] = {hp=100}
removeEntity(1)
print(healths[1] ~= nil)  -- false`,
      hints: [
        'Maintain a list of all component stores.',
        'removeEntity should clear from every store.',
        'This avoids forgetting to clean up specific components.',
      ],
      concepts: ['ecs', 'cleanup', 'debugging'],
    },
    {
      id: 'lua-ecs-8',
      title: 'Write Health System',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a system that processes health and marks dead entities.',
      skeleton: `-- Given: healths[entity] = {hp=N, maxHp=M}
-- Write healthSystem(healths, dead) that:
-- Clamps hp to [0, maxHp] for all entities.
-- If hp <= 0, adds entity to the dead table.
-- dead is a sequence table.

-- YOUR CODE HERE`,
      solution: `function healthSystem(healths, dead)
  for entity, health in pairs(healths) do
    if health.hp > health.maxHp then
      health.hp = health.maxHp
    end
    if health.hp <= 0 then
      health.hp = 0
      dead[#dead + 1] = entity
    end
  end
end`,
      hints: [
        'Iterate all entities with health components.',
        'Clamp hp to not exceed maxHp.',
        'Append dead entities to the dead table.',
      ],
      concepts: ['ecs', 'systems', 'health'],
    },
    {
      id: 'lua-ecs-9',
      title: 'Write Collision Check System',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a simple AABB collision system.',
      skeleton: `-- Given: positions[e] = {x,y}, sizes[e] = {w,h}
-- Write collisionSystem(positions, sizes) that returns
-- a list of {a, b} pairs of colliding entities (AABB overlap).

-- YOUR CODE HERE`,
      solution: `function collisionSystem(positions, sizes)
  local collisions = {}
  local entities = {}
  for e in pairs(positions) do
    if sizes[e] then entities[#entities + 1] = e end
  end
  for i = 1, #entities do
    for j = i + 1, #entities do
      local a, b = entities[i], entities[j]
      local pa, sa = positions[a], sizes[a]
      local pb, sb = positions[b], sizes[b]
      if pa.x < pb.x + sb.w and pa.x + sa.w > pb.x and
         pa.y < pb.y + sb.h and pa.y + sa.h > pb.y then
        collisions[#collisions + 1] = { a, b }
      end
    end
  end
  return collisions
end`,
      hints: [
        'Collect entities that have both position and size.',
        'Check all pairs for AABB overlap.',
        'Two rectangles overlap if they overlap on both axes.',
      ],
      concepts: ['ecs', 'collision', 'systems'],
    },
    {
      id: 'lua-ecs-10',
      title: 'Fill in Component Check',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Check if an entity has a specific component.',
      skeleton: `local sprites = { [1] = {image="hero.png"}, [3] = {image="enemy.png"} }

function hasSprite(entity)
  return sprites[entity] ~= ___
end
print(hasSprite(1))   -- true
print(hasSprite(2))   -- false`,
      solution: `local sprites = { [1] = {image="hero.png"}, [3] = {image="enemy.png"} }

function hasSprite(entity)
  return sprites[entity] ~= nil
end
print(hasSprite(1))   -- true
print(hasSprite(2))   -- false`,
      hints: [
        'A component exists if the store entry is not nil.',
        'sprites[2] is nil because entity 2 has no sprite.',
        'Compare against nil to check existence.',
      ],
      concepts: ['ecs', 'components', 'queries'],
    },
    {
      id: 'lua-ecs-11',
      title: 'Write System Scheduler',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a system that runs ECS systems in order.',
      skeleton: `-- Write createScheduler() returning:
-- :addSystem(name, fn) - register a system function
-- :run(dt) - run all systems in registration order, passing dt
-- :getSystems() - return array of system names

-- YOUR CODE HERE`,
      solution: `function createScheduler()
  local systems = {}
  local sched = {}
  local mt = {
    __index = {
      addSystem = function(self, name, fn)
        systems[#systems + 1] = { name = name, fn = fn }
      end,
      run = function(self, dt)
        for _, sys in ipairs(systems) do
          sys.fn(dt)
        end
      end,
      getSystems = function(self)
        local names = {}
        for i, sys in ipairs(systems) do
          names[i] = sys.name
        end
        return names
      end,
    },
  }
  return setmetatable(sched, mt)
end`,
      hints: [
        'Store systems as {name, fn} entries in order.',
        'run() iterates and calls each system function.',
        'Order of execution matches registration order.',
      ],
      concepts: ['ecs', 'scheduler', 'systems'],
    },
    {
      id: 'lua-ecs-12',
      title: 'Fix System Missing Component Check',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix a system that crashes when an entity is missing a component.',
      skeleton: `local positions = { [1]={x=0,y=0}, [2]={x=5,y=5} }
local velocities = { [1]={vx=1,vy=2} }  -- entity 2 has no velocity

function moveSystem(dt)
  for entity, pos in pairs(positions) do
    pos.x = pos.x + velocities[entity].vx * dt  -- BUG: entity 2 crashes
    pos.y = pos.y + velocities[entity].vy * dt
  end
end
moveSystem(1.0)`,
      solution: `local positions = { [1]={x=0,y=0}, [2]={x=5,y=5} }
local velocities = { [1]={vx=1,vy=2} }

function moveSystem(dt)
  for entity, pos in pairs(positions) do
    local vel = velocities[entity]
    if vel then  -- FIXED: check for component
      pos.x = pos.x + vel.vx * dt
      pos.y = pos.y + vel.vy * dt
    end
  end
end
moveSystem(1.0)`,
      hints: [
        'Not all entities with positions have velocities.',
        'Check if the velocity component exists before using it.',
        'This is a fundamental ECS pattern: systems filter by components.',
      ],
      concepts: ['ecs', 'nil-safety', 'debugging'],
    },
    {
      id: 'lua-ecs-13',
      title: 'Write Component Pool',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a reusable component pool for the ECS.',
      skeleton: `-- Write createComponentPool() returning:
-- :set(entity, data) - assign component data to entity
-- :get(entity) - get component data (nil if missing)
-- :remove(entity) - remove component from entity
-- :each() - return an iterator of (entity, data) pairs
-- :has(entity) - return true/false

-- YOUR CODE HERE`,
      solution: `function createComponentPool()
  local store = {}
  local pool = {}
  local mt = {
    __index = {
      set = function(self, entity, data)
        store[entity] = data
      end,
      get = function(self, entity)
        return store[entity]
      end,
      remove = function(self, entity)
        store[entity] = nil
      end,
      each = function(self)
        return pairs(store)
      end,
      has = function(self, entity)
        return store[entity] ~= nil
      end,
    },
  }
  return setmetatable(pool, mt)
end`,
      hints: [
        'Use a local table as the backing store.',
        'each() returns the pairs iterator over the store.',
        'has() checks for non-nil existence.',
      ],
      concepts: ['ecs', 'components', 'pool'],
    },
    {
      id: 'lua-ecs-14',
      title: 'Write Tag Component',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a tag component (boolean presence, no data).',
      skeleton: `-- Write createTagPool() returning:
-- :add(entity) - mark entity with this tag
-- :remove(entity) - remove tag
-- :has(entity) - check for tag
-- :getAll() - return table of all tagged entity IDs

-- YOUR CODE HERE`,
      solution: `function createTagPool()
  local tagged = {}
  local pool = {}
  local mt = {
    __index = {
      add = function(self, entity)
        tagged[entity] = true
      end,
      remove = function(self, entity)
        tagged[entity] = nil
      end,
      has = function(self, entity)
        return tagged[entity] == true
      end,
      getAll = function(self)
        local result = {}
        for entity in pairs(tagged) do
          result[#result + 1] = entity
        end
        return result
      end,
    },
  }
  return setmetatable(pool, mt)
end`,
      hints: [
        'Tags store true as the value, no extra data needed.',
        'has() checks if the entity is in the tagged table.',
        'getAll() collects all entity IDs into a list.',
      ],
      concepts: ['ecs', 'tags', 'components'],
    },
    {
      id: 'lua-ecs-15',
      title: 'Predict Entity Count After Removal',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict entity count after creation and removal.',
      skeleton: `local entities = {}
local nextId = 0
function create()
  nextId = nextId + 1
  entities[nextId] = true
  return nextId
end
function remove(e)
  entities[e] = nil
end
function count()
  local n = 0
  for _ in pairs(entities) do n = n + 1 end
  return n
end

create() create() create()
remove(2)
create()
print(count())`,
      solution: `3`,
      hints: [
        'Created: 1, 2, 3 (count = 3).',
        'Removed: 2 (count = 2).',
        'Created: 4 (count = 3).',
      ],
      concepts: ['ecs', 'entities', 'management'],
    },
    {
      id: 'lua-ecs-16',
      title: 'Write Archetype Query',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a query that returns entities matching an archetype (set of component types).',
      skeleton: `-- Write queryArchetype(world, componentNames) where:
-- world has component pools accessible by name
-- componentNames is a list of required component names
-- Return entities that have ALL listed components,
-- along with their component data as a table.
-- Result: { {entity=id, comp1=data, comp2=data}, ... }

-- YOUR CODE HERE`,
      solution: `function queryArchetype(pools, componentNames)
  if #componentNames == 0 then return {} end
  local result = {}
  local primary = pools[componentNames[1]]
  for entity, _ in primary:each() do
    local hasAll = true
    local entry = { entity = entity }
    for _, name in ipairs(componentNames) do
      local data = pools[name]:get(entity)
      if not data then
        hasAll = false
        break
      end
      entry[name] = data
    end
    if hasAll then
      result[#result + 1] = entry
    end
  end
  return result
end`,
      hints: [
        'Pick the first component pool as the primary to iterate.',
        'For each entity, check all required components exist.',
        'Build a result entry with entity ID and all component data.',
      ],
      concepts: ['ecs', 'archetype', 'queries'],
    },
    {
      id: 'lua-ecs-17',
      title: 'Refactor OOP to ECS',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Refactor an OOP game entity to ECS style.',
      skeleton: `local Player = {}
Player.__index = Player
function Player:new(x, y, hp)
  return setmetatable({x=x, y=y, hp=hp, vx=0, vy=0}, Player)
end
function Player:move(dt)
  self.x = self.x + self.vx * dt
  self.y = self.y + self.vy * dt
end
function Player:damage(amount)
  self.hp = self.hp - amount
end

local p = Player:new(0, 0, 100)
p.vx = 5
p:move(1.0)
p:damage(20)
print(p.x, p.hp)`,
      solution: `local positions = {}
local velocities = {}
local healths = {}
local nextId = 0

function createEntity()
  nextId = nextId + 1
  return nextId
end

function moveSystem(dt)
  for e, pos in pairs(positions) do
    local vel = velocities[e]
    if vel then
      pos.x = pos.x + vel.vx * dt
      pos.y = pos.y + vel.vy * dt
    end
  end
end

function damageEntity(entity, amount)
  if healths[entity] then
    healths[entity].hp = healths[entity].hp - amount
  end
end

local p = createEntity()
positions[p] = {x = 0, y = 0}
velocities[p] = {vx = 5, vy = 0}
healths[p] = {hp = 100}

moveSystem(1.0)
damageEntity(p, 20)
print(positions[p].x, healths[p].hp)`,
      hints: [
        'Separate data into component tables keyed by entity ID.',
        'Move logic into system functions.',
        'Entities are just IDs, not objects.',
      ],
      concepts: ['ecs', 'refactoring', 'composition'],
    },
    {
      id: 'lua-ecs-18',
      title: 'Refactor Multiple Arrays to Component Pools',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor parallel arrays into proper component pools.',
      skeleton: `-- Parallel arrays (fragile, indices must stay in sync)
local names = {"hero", "enemy", "npc"}
local xs = {0, 10, 5}
local ys = {0, 20, 15}
local hps = {100, 50, 30}

-- Process
for i = 1, #names do
  print(names[i], xs[i], ys[i], hps[i])
end`,
      solution: `local positions = {}
local healths = {}
local names = {}

local function addEntity(id, name, x, y, hp)
  names[id] = name
  positions[id] = { x = x, y = y }
  healths[id] = { hp = hp }
end

addEntity(1, "hero", 0, 0, 100)
addEntity(2, "enemy", 10, 20, 50)
addEntity(3, "npc", 5, 15, 30)

for id, pos in pairs(positions) do
  print(names[id], pos.x, pos.y, healths[id].hp)
end`,
      hints: [
        'Replace parallel arrays with component tables keyed by entity ID.',
        'Each component type gets its own table.',
        'Entity ID links all components together.',
      ],
      concepts: ['ecs', 'refactoring', 'data-oriented'],
    },
    {
      id: 'lua-ecs-19',
      title: 'Write Entity Spawner',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a template-based entity spawner.',
      skeleton: `-- Write createSpawner(world, template) where template is:
-- { position = {x, y}, velocity = {vx, vy}, health = {hp} } (any subset)
-- world has :createEntity() and :addComponent(entity, name, data)
-- The spawner has :spawn() that creates a new entity with deep-copied template data.
-- Return the spawner with :spawn() method.

-- YOUR CODE HERE`,
      solution: `function createSpawner(world, template)
  local function deepCopy(t)
    if type(t) ~= "table" then return t end
    local copy = {}
    for k, v in pairs(t) do copy[k] = deepCopy(v) end
    return copy
  end
  return {
    spawn = function()
      local entity = world:createEntity()
      for name, data in pairs(template) do
        world:addComponent(entity, name, deepCopy(data))
      end
      return entity
    end,
  }
end`,
      hints: [
        'Deep copy the template data so each entity has independent data.',
        'Iterate template keys to add each component.',
        'Return the new entity ID.',
      ],
      concepts: ['ecs', 'spawner', 'templates'],
    },
    {
      id: 'lua-ecs-20',
      title: 'Write Full ECS Mini-Framework',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a complete mini ECS framework combining entities, components, and systems.',
      skeleton: `-- Write createECS() returning:
-- :entity() - create entity, returns builder with :with(name, data) and :build()
-- :query(...names) - returns iterator of {entity, comp1, comp2, ...}
-- :system(name, fn) - register system
-- :update(dt) - run all systems

-- YOUR CODE HERE`,
      solution: `function createECS()
  local nextId = 0
  local pools = {}
  local systems = {}
  local ecs = {}

  local function getPool(name)
    if not pools[name] then pools[name] = {} end
    return pools[name]
  end

  local mt = {
    __index = {
      entity = function(self)
        nextId = nextId + 1
        local id = nextId
        local builder = {}
        function builder:with(name, data)
          getPool(name)[id] = data
          return self
        end
        function builder:build()
          return id
        end
        return builder
      end,
      query = function(self, ...)
        local names = { ... }
        local result = {}
        if #names == 0 then return result end
        local primary = getPool(names[1])
        for entity in pairs(primary) do
          local entry = { entity = entity }
          local ok = true
          for _, name in ipairs(names) do
            local pool = pools[name]
            if not pool or not pool[entity] then ok = false; break end
            entry[name] = pool[entity]
          end
          if ok then result[#result + 1] = entry end
        end
        return result
      end,
      system = function(self, name, fn)
        systems[#systems + 1] = { name = name, fn = fn }
      end,
      update = function(self, dt)
        for _, sys in ipairs(systems) do
          sys.fn(self, dt)
        end
      end,
    },
  }
  return setmetatable(ecs, mt)
end`,
      hints: [
        'entity() returns a builder with method chaining via :with().',
        'query() intersects multiple component pools.',
        'update() runs all systems passing the ECS and dt.',
      ],
      concepts: ['ecs', 'framework', 'design'],
    },
  ],
};
