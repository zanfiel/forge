import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'py-json',
  title: '36. JSON & Serialization',
  explanation: `## JSON & Serialization

Python's \\\`json\\\` module handles encoding and decoding JSON data. Other modules handle binary serialization.

### Core Functions
- **\\\`json.dumps(obj)\\\`** -- serialize object to JSON string
- **\\\`json.loads(s)\\\`** -- deserialize JSON string to object
- **\\\`json.dump(obj, fp)\\\`** -- serialize to a file
- **\\\`json.load(fp)\\\`** -- deserialize from a file

### Customization
- **\\\`default\\\`** parameter -- function to serialize non-standard types
- **\\\`object_hook\\\`** -- function to transform decoded dicts
- **\\\`cls\\\`** -- custom JSONEncoder/JSONDecoder subclass
- **\\\`indent\\\`** -- pretty-print with indentation
- **\\\`sort_keys\\\`** -- sort dictionary keys
- **\\\`ensure_ascii\\\`** -- escape non-ASCII characters

### Serializing Custom Types
Use a custom \\\`default\\\` function or subclass \\\`JSONEncoder\\\` to handle datetime, dataclass, enum, etc.

### Pickle
Binary serialization that supports arbitrary Python objects. Fast but NOT safe for untrusted data.

### Other Formats
- **\\\`shelve\\\`** -- persistent dict-like object using pickle
- **\\\`marshal\\\`** -- internal Python object serialization
- **JSON Lines** -- one JSON object per line format
`,
  exercises: [
    {
      id: 'py-jsn-1',
      title: 'json.dumps basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Serialize a Python dictionary to a JSON string.',
      skeleton: `import json

data = {"name": "Alice", "age": 30}
result = json.__BLANK__(data)
print(result)
print(type(result))`,
      solution: `import json

data = {"name": "Alice", "age": 30}
result = json.dumps(data)
print(result)
print(type(result))`,
      hints: [
        'json.dumps() converts Python objects to JSON strings.',
        'The s in dumps stands for "string".',
        'The answer is: dumps',
      ],
      concepts: ['json.dumps', 'serialization'],
    },
    {
      id: 'py-jsn-2',
      title: 'json.loads basics',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Deserialize a JSON string back to Python objects.',
      skeleton: `import json

text = '{"name": "Bob", "scores": [90, 85, 95]}'
data = json.__BLANK__(text)
print(data["name"])
print(sum(data["scores"]))`,
      solution: `import json

text = '{"name": "Bob", "scores": [90, 85, 95]}'
data = json.loads(text)
print(data["name"])
print(sum(data["scores"]))`,
      hints: [
        'json.loads() converts JSON strings to Python objects.',
        'The s in loads stands for "string".',
        'The answer is: loads',
      ],
      concepts: ['json.loads', 'deserialization'],
    },
    {
      id: 'py-jsn-3',
      title: 'Pretty-print JSON',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Serialize with indentation for readable output.',
      skeleton: `import json

data = {"users": [{"name": "Alice"}, {"name": "Bob"}]}
result = json.dumps(data, __BLANK__=2)
print(result)`,
      solution: `import json

data = {"users": [{"name": "Alice"}, {"name": "Bob"}]}
result = json.dumps(data, indent=2)
print(result)`,
      hints: [
        'The indent parameter controls pretty-printing.',
        'indent=2 uses 2 spaces per indentation level.',
        'The answer is: indent',
      ],
      concepts: ['indent', 'pretty-printing'],
    },
    {
      id: 'py-jsn-4',
      title: 'Sort keys',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'python',
      goal: 'Serialize with sorted dictionary keys.',
      skeleton: `import json

data = {"zebra": 1, "apple": 2, "mango": 3}
result = json.dumps(data, __BLANK__=True)
print(result)`,
      solution: `import json

data = {"zebra": 1, "apple": 2, "mango": 3}
result = json.dumps(data, sort_keys=True)
print(result)`,
      hints: [
        'sort_keys=True sorts dictionary keys alphabetically.',
        'Useful for consistent, reproducible output.',
        'The answer is: sort_keys',
      ],
      concepts: ['sort_keys', 'deterministic output'],
    },
    {
      id: 'py-jsn-5',
      title: 'Custom default function',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use the default parameter to handle non-serializable types.',
      skeleton: `import json
from datetime import datetime

data = {"event": "deploy", "time": datetime(2025, 3, 15)}

def converter(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError(f"Not serializable: {type(obj)}")

result = json.dumps(data, __BLANK__=converter)
print(result)`,
      solution: `import json
from datetime import datetime

data = {"event": "deploy", "time": datetime(2025, 3, 15)}

def converter(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError(f"Not serializable: {type(obj)}")

result = json.dumps(data, default=converter)
print(result)`,
      hints: [
        'The default parameter is called for non-serializable objects.',
        'Return a JSON-serializable value from the function.',
        'The answer is: default',
      ],
      concepts: ['default function', 'custom serialization'],
    },
    {
      id: 'py-jsn-6',
      title: 'object_hook for deserialization',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Use object_hook to transform JSON objects during deserialization.',
      skeleton: `import json
from types import SimpleNamespace

text = '{"name": "Alice", "age": 30}'
obj = json.loads(text, __BLANK__=lambda d: SimpleNamespace(**d))
print(obj.name)
print(obj.age)`,
      solution: `import json
from types import SimpleNamespace

text = '{"name": "Alice", "age": 30}'
obj = json.loads(text, object_hook=lambda d: SimpleNamespace(**d))
print(obj.name)
print(obj.age)`,
      hints: [
        'object_hook is called with each decoded dict.',
        'It transforms dicts into custom objects.',
        'The answer is: object_hook',
      ],
      concepts: ['object_hook', 'custom deserialization'],
    },
    {
      id: 'py-jsn-7',
      title: 'Predict JSON type mapping',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'python',
      goal: 'What Python types does JSON decode to?',
      skeleton: `import json

data = json.loads('{"a": 1, "b": 2.5, "c": true, "d": null, "e": [1,2]}')
print(type(data["a"]).__name__)
print(type(data["c"]).__name__)
print(type(data["d"]).__name__)`,
      solution: `int
bool
NoneType`,
      hints: [
        'JSON integers become Python ints.',
        'JSON true/false become Python True/False (bool).',
        'JSON null becomes Python None.',
      ],
      concepts: ['JSON type mapping', 'type conversion'],
    },
    {
      id: 'py-jsn-8',
      title: 'Predict tuple to array',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What happens when you round-trip a tuple through JSON?',
      skeleton: `import json

original = (1, 2, 3)
encoded = json.dumps(original)
decoded = json.loads(encoded)
print(type(decoded).__name__)
print(decoded)`,
      solution: `list
[1, 2, 3]`,
      hints: [
        'JSON has arrays but no tuple type.',
        'Python tuples are serialized as JSON arrays.',
        'Deserialization always produces lists, not tuples.',
      ],
      concepts: ['tuple to list', 'JSON limitations'],
    },
    {
      id: 'py-jsn-9',
      title: 'Predict non-string keys',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'What happens to integer keys when serialized to JSON?',
      skeleton: `import json

data = {1: "one", 2: "two"}
encoded = json.dumps(data)
decoded = json.loads(encoded)
print(list(decoded.keys()))`,
      solution: `['1', '2']`,
      hints: [
        'JSON only supports string keys.',
        'Integer keys are converted to strings during serialization.',
        'The decoded dict has string keys "1" and "2".',
      ],
      concepts: ['string-only keys', 'key conversion'],
    },
    {
      id: 'py-jsn-10',
      title: 'Fix circular reference',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code that fails due to circular reference in JSON serialization.',
      skeleton: `import json

# Bug: circular reference causes ValueError
data = {"name": "config"}
data["self"] = data  # circular!

try:
    print(json.dumps(data))
except ValueError as e:
    print(f"Error: {e}")`,
      solution: `import json

# Fixed: remove circular reference
data = {"name": "config"}
# Instead of self-reference, use an identifier
data["self_ref"] = "config"

print(json.dumps(data))`,
      hints: [
        'JSON cannot represent circular references.',
        'Remove the self-reference or use an identifier instead.',
        'Alternatively, use a custom encoder that detects cycles.',
      ],
      concepts: ['circular reference', 'ValueError'],
    },
    {
      id: 'py-jsn-11',
      title: 'Fix non-serializable type',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code that fails because set is not JSON serializable.',
      skeleton: `import json

# Bug: sets are not JSON serializable
data = {"tags": {"python", "coding", "tutorial"}}
result = json.dumps(data)
print(result)`,
      solution: `import json

# Fixed: convert set to list for serialization
data = {"tags": {"python", "coding", "tutorial"}}
result = json.dumps(data, default=lambda o: sorted(list(o)) if isinstance(o, set) else o)
print(result)`,
      hints: [
        'JSON has no set type; sets must be converted to lists.',
        'Use the default parameter to handle set conversion.',
        'Or convert the set to a list before serialization.',
      ],
      concepts: ['set serialization', 'default function'],
    },
    {
      id: 'py-jsn-12',
      title: 'Fix JSON file encoding',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Fix the code that writes JSON with escaped Unicode instead of actual characters.',
      skeleton: `import json

data = {"city": "Tokyo"}
# Bug: ensure_ascii=True (default) escapes non-ASCII
result = json.dumps(data)
print(result)  # Contains \\u escapes instead of actual characters`,
      solution: `import json

data = {"city": "Tokyo"}
# Fixed: ensure_ascii=False preserves non-ASCII characters
result = json.dumps(data, ensure_ascii=False)
print(result)`,
      hints: [
        'By default, json.dumps escapes non-ASCII characters.',
        'Set ensure_ascii=False to preserve Unicode characters.',
        'Add ensure_ascii=False to the dumps call.',
      ],
      concepts: ['ensure_ascii', 'Unicode', 'encoding'],
    },
    {
      id: 'py-jsn-13',
      title: 'Write a custom JSON encoder',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a custom JSONEncoder that handles datetime and set types.',
      skeleton: `import json
from datetime import datetime

class CustomEncoder(json.JSONEncoder):
    # Handle datetime and set types
    pass

data = {
    "event": "meeting",
    "time": datetime(2025, 3, 15, 10, 30),
    "attendees": {"Alice", "Bob"},
}
print(json.dumps(data, cls=CustomEncoder, indent=2))`,
      solution: `import json
from datetime import datetime

class CustomEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        if isinstance(obj, set):
            return sorted(list(obj))
        return super().default(obj)

data = {
    "event": "meeting",
    "time": datetime(2025, 3, 15, 10, 30),
    "attendees": {"Alice", "Bob"},
}
print(json.dumps(data, cls=CustomEncoder, indent=2))`,
      hints: [
        'Subclass json.JSONEncoder and override the default method.',
        'Check isinstance for each custom type.',
        'Call super().default(obj) for unhandled types.',
      ],
      concepts: ['JSONEncoder', 'custom serialization', 'cls parameter'],
    },
    {
      id: 'py-jsn-14',
      title: 'Write a dataclass serializer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write functions to serialize and deserialize dataclasses as JSON.',
      skeleton: `import json
from dataclasses import dataclass, asdict

@dataclass
class User:
    name: str
    age: int
    email: str

def to_json(user):
    pass

def from_json(json_str):
    pass

u = User("Alice", 30, "alice@example.com")
j = to_json(u)
print(j)
u2 = from_json(j)
print(u2)`,
      solution: `import json
from dataclasses import dataclass, asdict

@dataclass
class User:
    name: str
    age: int
    email: str

def to_json(user):
    return json.dumps(asdict(user))

def from_json(json_str):
    data = json.loads(json_str)
    return User(**data)

u = User("Alice", 30, "alice@example.com")
j = to_json(u)
print(j)
u2 = from_json(j)
print(u2)`,
      hints: [
        'Use dataclasses.asdict() to convert to a dict, then json.dumps.',
        'For deserialization, json.loads to dict, then User(**data).',
        'This works for simple dataclasses with JSON-compatible types.',
      ],
      concepts: ['dataclass serialization', 'asdict', 'JSON'],
    },
    {
      id: 'py-jsn-15',
      title: 'Write a JSON Lines reader',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Write a function that reads JSON Lines format (one JSON object per line).',
      skeleton: `import json

def read_jsonl(text):
    # Parse JSON Lines format: one JSON object per line
    pass

data = """{"name": "Alice", "score": 95}
{"name": "Bob", "score": 87}
{"name": "Charlie", "score": 92}"""

records = read_jsonl(data)
for r in records:
    print(r["name"], r["score"])`,
      solution: `import json

def read_jsonl(text):
    return [json.loads(line) for line in text.strip().splitlines() if line.strip()]

data = """{"name": "Alice", "score": 95}
{"name": "Bob", "score": 87}
{"name": "Charlie", "score": 92}"""

records = read_jsonl(data)
for r in records:
    print(r["name"], r["score"])`,
      hints: [
        'JSON Lines has one JSON object per line.',
        'Split the text by lines and parse each individually.',
        'Use json.loads on each non-empty line.',
      ],
      concepts: ['JSON Lines', 'line-by-line parsing'],
    },
    {
      id: 'py-jsn-16',
      title: 'Write a JSON file handler',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write functions that read and write JSON files using json.dump/load.',
      skeleton: `import json
from pathlib import Path
import tempfile

def save_json(filepath, data, pretty=True):
    pass

def load_json(filepath):
    pass

path = Path(tempfile.mktemp(suffix=".json"))
save_json(path, {"key": "value", "nums": [1, 2, 3]})
result = load_json(path)
print(result)
path.unlink()`,
      solution: `import json
from pathlib import Path
import tempfile

def save_json(filepath, data, pretty=True):
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2 if pretty else None, ensure_ascii=False)

def load_json(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)

path = Path(tempfile.mktemp(suffix=".json"))
save_json(path, {"key": "value", "nums": [1, 2, 3]})
result = load_json(path)
print(result)
path.unlink()`,
      hints: [
        'json.dump writes directly to a file object.',
        'json.load reads directly from a file object.',
        'Always specify encoding="utf-8" for portability.',
      ],
      concepts: ['json.dump', 'json.load', 'file I/O'],
    },
    {
      id: 'py-jsn-17',
      title: 'Write an enum JSON handler',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a JSON encoder/decoder pair that handles enum types.',
      skeleton: `import json
from enum import Enum

class Status(Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"

def encode_with_enums(obj):
    pass

def decode_with_enums(data):
    pass

record = {"user": "Alice", "status": Status.ACTIVE}
encoded = json.dumps(record, default=encode_with_enums)
print(encoded)`,
      solution: `import json
from enum import Enum

class Status(Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"

def encode_with_enums(obj):
    if isinstance(obj, Enum):
        return {"__enum__": type(obj).__name__, "value": obj.value}
    raise TypeError(f"Not serializable: {type(obj)}")

def decode_with_enums(data):
    if "__enum__" in data:
        enum_class = {"Status": Status}[data["__enum__"]]
        return enum_class(data["value"])
    return data

record = {"user": "Alice", "status": Status.ACTIVE}
encoded = json.dumps(record, default=encode_with_enums)
print(encoded)
decoded = json.loads(encoded, object_hook=decode_with_enums)
print(decoded)`,
      hints: [
        'Encode enums as dicts with a type marker like __enum__.',
        'Decode by checking for the marker in object_hook.',
        'Map enum names to their classes for reconstruction.',
      ],
      concepts: ['enum serialization', 'type markers', 'round-trip'],
    },
    {
      id: 'py-jsn-18',
      title: 'Write a pickle comparison',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Write a function that demonstrates pickle vs JSON for a complex object.',
      skeleton: `import json
import pickle

class Config:
    def __init__(self, name, settings):
        self.name = name
        self.settings = settings

def compare_serialization(obj):
    # Try JSON (will fail) and pickle (will succeed)
    # Return dict with results
    pass

c = Config("app", {"debug": True, "port": 8080})
results = compare_serialization(c)
print(results)`,
      solution: `import json
import pickle

class Config:
    def __init__(self, name, settings):
        self.name = name
        self.settings = settings

def compare_serialization(obj):
    results = {}
    try:
        json_bytes = json.dumps(obj)
        results["json"] = "success"
    except TypeError:
        results["json"] = "failed (not serializable)"

    pkl_bytes = pickle.dumps(obj)
    restored = pickle.loads(pkl_bytes)
    results["pickle"] = f"success ({len(pkl_bytes)} bytes)"
    results["restored_name"] = restored.name
    return results

c = Config("app", {"debug": True, "port": 8080})
results = compare_serialization(c)
print(results)`,
      hints: [
        'JSON cannot serialize custom classes without a default function.',
        'pickle handles arbitrary Python objects natively.',
        'pickle.dumps returns bytes, pickle.loads restores the object.',
      ],
      concepts: ['pickle', 'JSON limitations', 'binary serialization'],
    },
    {
      id: 'py-jsn-19',
      title: 'Refactor manual dict building to json',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'python',
      goal: 'Refactor the manual string building to use json.dumps.',
      skeleton: `def build_response(status, message, data):
    # Bug-prone manual JSON string building
    json_str = '{"status": "' + status + '", '
    json_str += '"message": "' + message + '", '
    json_str += '"data": ' + str(data) + '}'
    return json_str

print(build_response("ok", "Success", [1, 2, 3]))`,
      solution: `import json

def build_response(status, message, data):
    return json.dumps({
        "status": status,
        "message": message,
        "data": data,
    })

print(build_response("ok", "Success", [1, 2, 3]))`,
      hints: [
        'Never build JSON strings manually -- use json.dumps.',
        'Manual building fails with special characters, quotes, etc.',
        'Build a dict and serialize it properly with json.dumps.',
      ],
      concepts: ['json.dumps', 'safe serialization'],
    },
    {
      id: 'py-jsn-20',
      title: 'Refactor nested json.loads to object_hook',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'python',
      goal: 'Refactor the post-processing of decoded JSON to use object_hook.',
      skeleton: `import json
from datetime import datetime

text = '{"event": "deploy", "time": "2025-03-15T10:30:00"}'

data = json.loads(text)
# Manual post-processing
if "time" in data:
    data["time"] = datetime.fromisoformat(data["time"])

print(data["time"].year)`,
      solution: `import json
from datetime import datetime

text = '{"event": "deploy", "time": "2025-03-15T10:30:00"}'

def decode_dates(obj):
    for key, value in obj.items():
        if isinstance(value, str):
            try:
                obj[key] = datetime.fromisoformat(value)
            except ValueError:
                pass
    return obj

data = json.loads(text, object_hook=decode_dates)
print(data["time"].year)`,
      hints: [
        'object_hook processes each decoded dict automatically.',
        'Try parsing strings as dates in the hook.',
        'Catch ValueError for strings that are not valid dates.',
      ],
      concepts: ['object_hook', 'automatic decoding', 'datetime'],
    },
  ],
};
