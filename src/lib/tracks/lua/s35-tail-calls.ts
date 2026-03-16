import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'lua-tailcall',
  title: '35. Tail Calls',
  explanation: `## Tail Calls in Lua

A **tail call** occurs when a function's last action is to call another function and return its result. Lua implements **proper tail calls** -- they don't consume stack space:

\`\`\`lua
-- This IS a tail call (last action is the call + return)
function foo(n)
  if n <= 0 then return 0 end
  return foo(n - 1)  -- tail call: no stack growth
end

-- This is NOT a tail call (addition after the call)
function bar(n)
  if n <= 0 then return 0 end
  return 1 + bar(n - 1)  -- NOT tail call: must add 1 after
end

-- This is NOT a tail call (result not directly returned)
function baz(n)
  local result = baz(n - 1)  -- NOT tail call
  return result
end

-- Tail call with multiple returns
function process(x)
  return transform(x)  -- tail call: returns whatever transform returns
end

-- Tail calls work across functions
function state1(data)
  return state2(data + 1)  -- tail call to different function
end

function state2(data)
  return state3(data * 2)  -- tail call chain
end
\`\`\`

Key benefits:
- No stack overflow for deep recursion
- Perfect for state machines and continuation-passing style
- Lua guarantees proper tail call elimination`,
  exercises: [
    {
      id: 'lua-tailcall-1',
      title: 'Identify Tail Call',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Complete the function so the recursive call is a proper tail call.',
      skeleton: `function countdown(n)
  if n <= 0 then
    return "done"
  end
  print(n)
  ___ countdown(n - 1)
end
countdown(5)`,
      solution: `function countdown(n)
  if n <= 0 then
    return "done"
  end
  print(n)
  return countdown(n - 1)
end
countdown(5)`,
      hints: [
        'A tail call must be the last action: return fn(...).',
        'The return keyword is required for it to be a tail call.',
        'Without return, the result would be discarded.',
      ],
      concepts: ['tail-calls', 'recursion'],
    },
    {
      id: 'lua-tailcall-2',
      title: 'Predict Tail vs Non-Tail',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Predict which function will work for large n.',
      skeleton: `-- Which function can handle n = 1000000 without stack overflow?
function tailRec(n, acc)
  if n <= 0 then return acc end
  return tailRec(n - 1, acc + 1)
end

print(tailRec(1000000, 0))`,
      solution: `1000000`,
      hints: [
        'tailRec uses a proper tail call (return fn(...)).',
        'Lua eliminates tail calls, so no stack growth.',
        'It can handle arbitrarily large n.',
      ],
      concepts: ['tail-calls', 'stack'],
    },
    {
      id: 'lua-tailcall-3',
      title: 'Non-Tail Call Addition',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'lua',
      goal: 'Understand why adding after a call breaks tail call optimization.',
      skeleton: `function sumTo(n)
  if n <= 0 then return 0 end
  return n + sumTo(n - 1)  -- is this a tail call?
end
print(sumTo(5))`,
      solution: `15`,
      hints: [
        'n + sumTo(n-1) is NOT a tail call.',
        'Lua must keep the current frame to add n after the call returns.',
        'The result is correct (15) but it uses O(n) stack space.',
      ],
      concepts: ['tail-calls', 'non-tail-call'],
    },
    {
      id: 'lua-tailcall-4',
      title: 'Convert to Tail Recursive',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Convert a non-tail-recursive factorial to tail-recursive.',
      skeleton: `-- The original is NOT tail-recursive:
-- function factorial(n)
--   if n <= 1 then return 1 end
--   return n * factorial(n - 1)
-- end

-- Write factorial(n, acc) as a tail-recursive version.
-- acc defaults to 1.

-- YOUR CODE HERE`,
      solution: `function factorial(n, acc)
  acc = acc or 1
  if n <= 1 then return acc end
  return factorial(n - 1, n * acc)
end`,
      hints: [
        'Use an accumulator parameter to carry the running product.',
        'Default acc to 1 if not provided.',
        'Multiply n into acc and recurse with n-1.',
      ],
      concepts: ['tail-calls', 'accumulator', 'factorial'],
    },
    {
      id: 'lua-tailcall-5',
      title: 'Tail Call GCD',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Implement the GCD algorithm using tail calls.',
      skeleton: `function gcd(a, b)
  if b == 0 then
    return a
  end
  return ___(b, a % b)
end
print(gcd(48, 18))  -- 6`,
      solution: `function gcd(a, b)
  if b == 0 then
    return a
  end
  return gcd(b, a % b)
end
print(gcd(48, 18))  -- 6`,
      hints: [
        'GCD is naturally tail-recursive.',
        'When b is 0, a is the GCD.',
        'Otherwise recurse with gcd(b, a % b).',
      ],
      concepts: ['tail-calls', 'gcd', 'algorithms'],
    },
    {
      id: 'lua-tailcall-6',
      title: 'Convert Sum to Tail Recursive',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Convert a non-tail-recursive sum to tail-recursive form.',
      skeleton: `-- Convert this:
-- function sum(t, i)
--   i = i or 1
--   if i > #t then return 0 end
--   return t[i] + sum(t, i + 1)  -- NOT tail recursive
-- end

-- Write sumTail(t, i, acc) as a tail-recursive version.

-- YOUR CODE HERE`,
      solution: `function sumTail(t, i, acc)
  i = i or 1
  acc = acc or 0
  if i > #t then return acc end
  return sumTail(t, i + 1, acc + t[i])
end`,
      hints: [
        'Add an accumulator parameter acc.',
        'Instead of adding after the call, add to acc before recursing.',
        'The base case returns acc instead of 0.',
      ],
      concepts: ['tail-calls', 'accumulator', 'conversion'],
    },
    {
      id: 'lua-tailcall-7',
      title: 'Fix Non-Tail Call',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix the function that claims to use tail calls but does not.',
      skeleton: `function findIndex(t, value, i)
  i = i or 1
  if i > #t then return nil end
  if t[i] == value then return i end
  local result = findIndex(t, value, i + 1)  -- BUG: not a tail call
  return result
end
print(findIndex({5, 3, 8, 1}, 8))  -- should print 3`,
      solution: `function findIndex(t, value, i)
  i = i or 1
  if i > #t then return nil end
  if t[i] == value then return i end
  return findIndex(t, value, i + 1)  -- FIXED: proper tail call
end
print(findIndex({5, 3, 8, 1}, 8))  -- should print 3`,
      hints: [
        'Storing in a local variable and then returning breaks tail call.',
        'return findIndex(...) is a tail call.',
        'local result = findIndex(...); return result is NOT.',
      ],
      concepts: ['tail-calls', 'debugging'],
    },
    {
      id: 'lua-tailcall-8',
      title: 'State Machine with Tail Calls',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Implement a simple state machine using tail calls between state functions.',
      skeleton: `-- Write a state machine that processes a string character by character.
-- stateNormal(s, i, result) - if letter, add to result, stay in normal
--   if digit, switch to stateDigit
--   if end of string, return result
-- stateDigit(s, i, result) - skip digits, when non-digit, go back to stateNormal

-- YOUR CODE HERE`,
      solution: `function stateNormal(s, i, result)
  i = i or 1
  result = result or {}
  if i > #s then return table.concat(result) end
  local c = s:sub(i, i)
  if c:match("%d") then
    return stateDigit(s, i + 1, result)
  end
  result[#result + 1] = c
  return stateNormal(s, i + 1, result)
end

function stateDigit(s, i, result)
  if i > #s then return table.concat(result) end
  local c = s:sub(i, i)
  if not c:match("%d") then
    return stateNormal(s, i, result)
  end
  return stateDigit(s, i + 1, result)
end`,
      hints: [
        'Each state is a function that tail-calls the next state.',
        'Tail calls between states use zero stack space.',
        'This pattern is perfect for parsers and protocol handlers.',
      ],
      concepts: ['tail-calls', 'state-machine'],
    },
    {
      id: 'lua-tailcall-9',
      title: 'Predict Stack Depth',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Predict whether a function causes stack growth.',
      skeleton: `function bounce(n)
  if n <= 0 then return "done" end
  return bounce(n - 1)  -- tail call
end

-- Does this use O(1) or O(n) stack space?
print(bounce(100))
print("no overflow")`,
      solution: `done
no overflow`,
      hints: [
        'This is a proper tail call (return bounce(...)).',
        'Lua eliminates tail calls, so it uses O(1) stack.',
        'It can handle any value of n without overflow.',
      ],
      concepts: ['tail-calls', 'stack-space'],
    },
    {
      id: 'lua-tailcall-10',
      title: 'Write Tail-Recursive Power',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a tail-recursive exponentiation function.',
      skeleton: `-- Write power(base, exp, acc) that computes base^exp
-- using tail recursion with an accumulator.
-- acc defaults to 1.

-- YOUR CODE HERE`,
      solution: `function power(base, exp, acc)
  acc = acc or 1
  if exp <= 0 then return acc end
  return power(base, exp - 1, acc * base)
end`,
      hints: [
        'Multiply acc by base on each recursive call.',
        'Decrement exp by 1 each time.',
        'When exp reaches 0, return the accumulator.',
      ],
      concepts: ['tail-calls', 'accumulator', 'exponentiation'],
    },
    {
      id: 'lua-tailcall-11',
      title: 'Fix Wrapper Breaking Tail Call',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Fix a wrapper function that accidentally breaks a tail call.',
      skeleton: `function process(x)
  if x <= 0 then return x end
  return process(x - 1)  -- tail call
end

function wrapper(x)
  return (process(x))  -- BUG: parentheses break tail call
end
print(wrapper(5))  -- works but not a tail call`,
      solution: `function process(x)
  if x <= 0 then return x end
  return process(x - 1)  -- tail call
end

function wrapper(x)
  return process(x)  -- FIXED: removed parentheses
end
print(wrapper(5))  -- proper tail call`,
      hints: [
        'Wrapping a call in parentheses forces a single return value.',
        'return (fn()) is NOT a tail call because of the adjustment.',
        'return fn() is a proper tail call.',
      ],
      concepts: ['tail-calls', 'parentheses', 'debugging'],
    },
    {
      id: 'lua-tailcall-12',
      title: 'Write Tail-Recursive Fibonacci',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a tail-recursive Fibonacci function.',
      skeleton: `-- Write fib(n, a, b) that computes the nth Fibonacci number.
-- a and b are the running pair (default to 0 and 1).
-- fib(0) = 0, fib(1) = 1, fib(2) = 1, fib(3) = 2, etc.

-- YOUR CODE HERE`,
      solution: `function fib(n, a, b)
  a = a or 0
  b = b or 1
  if n == 0 then return a end
  return fib(n - 1, b, a + b)
end`,
      hints: [
        'Track two consecutive Fibonacci numbers as parameters.',
        'On each call, shift: a becomes b, b becomes a+b.',
        'When n reaches 0, a holds the answer.',
      ],
      concepts: ['tail-calls', 'fibonacci', 'accumulator'],
    },
    {
      id: 'lua-tailcall-13',
      title: 'Tail-Recursive Reverse',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Write a tail-recursive list reverse function.',
      skeleton: `-- Write reverse(t, i, result) that reverses a table
-- using tail recursion.
-- i defaults to #t, result defaults to {}.

-- YOUR CODE HERE`,
      solution: `function reverse(t, i, result)
  i = i or #t
  result = result or {}
  if i < 1 then return result end
  result[#result + 1] = t[i]
  return reverse(t, i - 1, result)
end`,
      hints: [
        'Start from the end of the table and work backwards.',
        'Append each element to the result table.',
        'Pass the growing result as an accumulator.',
      ],
      concepts: ['tail-calls', 'accumulator', 'algorithms'],
    },
    {
      id: 'lua-tailcall-14',
      title: 'Refactor Recursion to Tail Recursion',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Refactor a string reverse function to use tail calls.',
      skeleton: `function strReverse(s)
  if #s <= 1 then return s end
  return strReverse(s:sub(2)) .. s:sub(1, 1)
end
print(strReverse("hello"))`,
      solution: `function strReverse(s, acc)
  acc = acc or ""
  if #s == 0 then return acc end
  return strReverse(s:sub(2), s:sub(1, 1) .. acc)
end
print(strReverse("hello"))`,
      hints: [
        'The original concatenates after the recursive call.',
        'Use an accumulator string to build the result.',
        'Prepend each character to the accumulator.',
      ],
      concepts: ['tail-calls', 'refactoring', 'accumulator'],
    },
    {
      id: 'lua-tailcall-15',
      title: 'Refactor Loop to Tail Call',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Convert a while loop into tail-recursive style.',
      skeleton: `function collatz(n)
  local steps = 0
  while n ~= 1 do
    if n % 2 == 0 then
      n = n / 2
    else
      n = 3 * n + 1
    end
    steps = steps + 1
  end
  return steps
end
print(collatz(27))`,
      solution: `function collatz(n, steps)
  steps = steps or 0
  if n == 1 then return steps end
  if n % 2 == 0 then
    return collatz(n / 2, steps + 1)
  else
    return collatz(3 * n + 1, steps + 1)
  end
end
print(collatz(27))`,
      hints: [
        'Replace the while loop with recursive tail calls.',
        'The loop condition becomes the base case.',
        'Pass the step counter as an accumulator.',
      ],
      concepts: ['tail-calls', 'refactoring', 'loops-to-recursion'],
    },
    {
      id: 'lua-tailcall-16',
      title: 'Mutual Tail Calls',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write mutually recursive functions using tail calls.',
      skeleton: `-- Write isEven(n) and isOdd(n) that use mutual tail recursion.
-- isEven(0) = true, isOdd(0) = false
-- isEven(n) = isOdd(n-1), isOdd(n) = isEven(n-1)
-- These should work for large n due to tail calls.

-- YOUR CODE HERE`,
      solution: `function isEven(n)
  if n == 0 then return true end
  return isOdd(n - 1)
end

function isOdd(n)
  if n == 0 then return false end
  return isEven(n - 1)
end`,
      hints: [
        'isEven and isOdd call each other with n-1.',
        'Both are proper tail calls (return fn(...)).',
        'Lua tail call elimination handles mutual recursion too.',
      ],
      concepts: ['tail-calls', 'mutual-recursion'],
    },
    {
      id: 'lua-tailcall-17',
      title: 'Tail Call Binary Search',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'lua',
      goal: 'Implement binary search using tail calls.',
      skeleton: `-- Write bsearch(t, target, lo, hi) that performs
-- binary search on sorted table t.
-- Returns the index if found, nil if not.
-- lo defaults to 1, hi defaults to #t.

-- YOUR CODE HERE`,
      solution: `function bsearch(t, target, lo, hi)
  lo = lo or 1
  hi = hi or #t
  if lo > hi then return nil end
  local mid = math.floor((lo + hi) / 2)
  if t[mid] == target then return mid end
  if t[mid] < target then
    return bsearch(t, target, mid + 1, hi)
  else
    return bsearch(t, target, lo, mid - 1)
  end
end`,
      hints: [
        'Binary search naturally fits tail recursion.',
        'Each recursive call narrows the search range.',
        'Both recursive calls are in tail position.',
      ],
      concepts: ['tail-calls', 'binary-search', 'algorithms'],
    },
    {
      id: 'lua-tailcall-18',
      title: 'Predict Tail Call Traceback',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Understand that tail calls are invisible in tracebacks.',
      skeleton: `function a(n)
  if n == 0 then
    local info = debug.getinfo(2, "n")
    print(info and info.name or "none")
    return "done"
  end
  return b(n)  -- tail call - a disappears from stack
end

function b(n)
  return a(n - 1)  -- tail call - b disappears from stack
end

a(3)`,
      solution: `none`,
      hints: [
        'Tail calls remove the caller from the call stack.',
        'After several tail calls, intermediate frames are gone.',
        'debug.getinfo at level 2 may find nothing or the top-level.',
      ],
      concepts: ['tail-calls', 'debug', 'traceback'],
    },
    {
      id: 'lua-tailcall-19',
      title: 'Write Continuation-Passing Style',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a CPS-style function using tail calls.',
      skeleton: `-- Write factorial_cps(n, k) where k is a continuation function.
-- k defaults to function(x) return x end (identity).
-- Instead of returning a value, pass the result to k.
-- This must use tail calls throughout.

-- YOUR CODE HERE`,
      solution: `function factorial_cps(n, k)
  k = k or function(x) return x end
  if n <= 1 then
    return k(1)
  end
  return factorial_cps(n - 1, function(result)
    return k(n * result)
  end)
end`,
      hints: [
        'In CPS, instead of returning, call the continuation k.',
        'The recursive call passes a new continuation that multiplies.',
        'All calls are in tail position.',
      ],
      concepts: ['tail-calls', 'continuation-passing', 'advanced'],
    },
    {
      id: 'lua-tailcall-20',
      title: 'Write Trampoline',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'lua',
      goal: 'Write a trampoline for languages without tail call elimination (educational).',
      skeleton: `-- Write trampoline(fn) that repeatedly calls fn until
-- it returns a non-function value.
-- This simulates tail call optimization in other languages.
-- In Lua this is educational since Lua already has proper tail calls.

-- YOUR CODE HERE`,
      solution: `function trampoline(fn)
  local result = fn
  while type(result) == "function" do
    result = result()
  end
  return result
end`,
      hints: [
        'Keep calling the result while it is a function.',
        'When the result is not a function, return it.',
        'Each "recursive" call returns a thunk (zero-arg function).',
      ],
      concepts: ['tail-calls', 'trampoline', 'patterns'],
    },
  ],
};
