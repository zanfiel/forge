import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-json',
  title: '33. JSON Serialization',
  explanation: `## JSON Serialization

\`System.Text.Json\` is the built-in high-performance JSON library in modern .NET.

\`\`\`csharp
// Serialize
var person = new Person("Alice", 30);
string json = JsonSerializer.Serialize(person);

// Deserialize
Person? p = JsonSerializer.Deserialize<Person>(json);
\`\`\`

### Options

\`\`\`csharp
var options = new JsonSerializerOptions
{
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    WriteIndented = true,
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
};
string json = JsonSerializer.Serialize(obj, options);
\`\`\`

### Attributes

\`\`\`csharp
public class Config
{
    [JsonPropertyName("max_retries")]
    public int MaxRetries { get; set; }

    [JsonIgnore]
    public string Secret { get; set; }
}
\`\`\`

### Source Generators (AOT-friendly)

\`\`\`csharp
[JsonSerializable(typeof(Person))]
partial class AppJsonContext : JsonSerializerContext { }

string json = JsonSerializer.Serialize(person, AppJsonContext.Default.Person);
\`\`\`

\`System.Text.Json\` is allocation-efficient and supports streaming, UTF-8 readers/writers, and source-generated serialization.`,
  exercises: [
    {
      id: 'cs-json-1',
      title: 'Basic Serialize',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Serialize an object to a JSON string.',
      skeleton: `var person = new { Name = "Alice", Age = 30 };
string json = JsonSerializer.__BLANK__(person);`,
      solution: `var person = new { Name = "Alice", Age = 30 };
string json = JsonSerializer.Serialize(person);`,
      hints: ['JsonSerializer is the static entry point.', 'It converts objects to JSON strings.', 'The answer is: Serialize'],
      concepts: ['JsonSerializer.Serialize', 'JSON output'],
    },
    {
      id: 'cs-json-2',
      title: 'Basic Deserialize',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Deserialize a JSON string to a typed object.',
      skeleton: `string json = "{\\"Name\\":\\"Bob\\",\\"Age\\":25}";
Person? p = JsonSerializer.__BLANK__<Person>(json);`,
      solution: `string json = "{\\"Name\\":\\"Bob\\",\\"Age\\":25}";
Person? p = JsonSerializer.Deserialize<Person>(json);`,
      hints: ['The generic type parameter specifies the target type.', 'Returns null if deserialization fails.', 'The answer is: Deserialize'],
      concepts: ['JsonSerializer.Deserialize', 'generic deserialization'],
    },
    {
      id: 'cs-json-3',
      title: 'CamelCase Naming',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Configure camelCase property naming for JSON output.',
      skeleton: `var options = new JsonSerializerOptions
{
    PropertyNamingPolicy = JsonNamingPolicy.__BLANK__
};`,
      solution: `var options = new JsonSerializerOptions
{
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
};`,
      hints: ['This policy converts PascalCase to camelCase.', 'It is the most common policy for JSON APIs.', 'The answer is: CamelCase'],
      concepts: ['JsonNamingPolicy', 'CamelCase', 'property naming'],
    },
    {
      id: 'cs-json-4',
      title: 'JsonPropertyName Attribute',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Map a C# property to a custom JSON name.',
      skeleton: `public class Config
{
    [__BLANK__("max_retries")]
    public int MaxRetries { get; set; }
}`,
      solution: `public class Config
{
    [JsonPropertyName("max_retries")]
    public int MaxRetries { get; set; }
}`,
      hints: ['This attribute overrides the property name in JSON.', 'It is in the System.Text.Json.Serialization namespace.', 'The answer is: JsonPropertyName'],
      concepts: ['JsonPropertyName', 'custom JSON names'],
    },
    {
      id: 'cs-json-5',
      title: 'Write Indented',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Configure JSON output to be pretty-printed.',
      skeleton: `var options = new JsonSerializerOptions
{
    __BLANK__ = true
};`,
      solution: `var options = new JsonSerializerOptions
{
    WriteIndented = true
};`,
      hints: ['This option adds whitespace and newlines.', 'Useful for human-readable output.', 'The answer is: WriteIndented'],
      concepts: ['WriteIndented', 'pretty-print JSON'],
    },
    {
      id: 'cs-json-6',
      title: 'Ignore Null Values',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Skip null properties when serializing.',
      skeleton: `var options = new JsonSerializerOptions
{
    DefaultIgnoreCondition = JsonIgnoreCondition.__BLANK__
};`,
      solution: `var options = new JsonSerializerOptions
{
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
};`,
      hints: ['This condition skips properties that are null.', 'Other options include Never, Always, WhenWritingDefault.', 'The answer is: WhenWritingNull'],
      concepts: ['JsonIgnoreCondition', 'WhenWritingNull', 'null handling'],
    },
    {
      id: 'cs-json-7',
      title: 'Serialize to Stream',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Serialize an object directly to a stream.',
      skeleton: `async Task SerializeToStream<T>(T obj, Stream stream)
{
    // Serialize obj to the stream as JSON
}`,
      solution: `async Task SerializeToStream<T>(T obj, Stream stream)
{
    await JsonSerializer.SerializeAsync(stream, obj);
}`,
      hints: ['JsonSerializer has async overloads that accept streams.', 'SerializeAsync writes directly to the stream.', 'No need to create an intermediate string.'],
      concepts: ['SerializeAsync', 'stream serialization'],
    },
    {
      id: 'cs-json-8',
      title: 'Deserialize from Stream',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Deserialize JSON from a stream.',
      skeleton: `async Task<T?> DeserializeFromStream<T>(Stream stream)
{
    // Read and deserialize JSON from the stream
}`,
      solution: `async Task<T?> DeserializeFromStream<T>(Stream stream)
{
    return await JsonSerializer.DeserializeAsync<T>(stream);
}`,
      hints: ['DeserializeAsync reads JSON from a stream.', 'It returns the deserialized object.', 'The generic parameter specifies the target type.'],
      concepts: ['DeserializeAsync', 'stream deserialization'],
    },
    {
      id: 'cs-json-9',
      title: 'Custom JsonConverter',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a custom converter that serializes DateTime as Unix timestamp.',
      skeleton: `class UnixDateTimeConverter : JsonConverter<DateTime>
{
    public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        // Read a long and convert to DateTime
    }

    public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
    {
        // Write DateTime as Unix timestamp (seconds)
    }
}`,
      solution: `class UnixDateTimeConverter : JsonConverter<DateTime>
{
    public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        long unixTime = reader.GetInt64();
        return DateTimeOffset.FromUnixTimeSeconds(unixTime).DateTime;
    }

    public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
    {
        long unixTime = new DateTimeOffset(value).ToUnixTimeSeconds();
        writer.WriteNumberValue(unixTime);
    }
}`,
      hints: ['Override Read and Write methods.', 'Use DateTimeOffset.FromUnixTimeSeconds for parsing.', 'Use ToUnixTimeSeconds for writing.'],
      concepts: ['JsonConverter', 'Utf8JsonReader', 'Utf8JsonWriter', 'custom serialization'],
    },
    {
      id: 'cs-json-10',
      title: 'Parse with JsonDocument',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Extract a value from JSON without deserializing to a class.',
      skeleton: `string GetName(string json)
{
    // Parse JSON and extract the "name" property as a string
}`,
      solution: `string GetName(string json)
{
    using var doc = JsonDocument.Parse(json);
    return doc.RootElement.GetProperty("name").GetString()!;
}`,
      hints: ['JsonDocument provides read-only access to JSON.', 'Use RootElement.GetProperty to access properties.', 'GetString() returns the value as a string.'],
      concepts: ['JsonDocument', 'JsonElement', 'GetProperty'],
    },
    {
      id: 'cs-json-11',
      title: 'Serialize Dictionary',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Serialize a dictionary to JSON and back.',
      skeleton: `Dictionary<string, int> RoundTrip(Dictionary<string, int> input)
{
    // Serialize to JSON, then deserialize back
}`,
      solution: `Dictionary<string, int> RoundTrip(Dictionary<string, int> input)
{
    string json = JsonSerializer.Serialize(input);
    return JsonSerializer.Deserialize<Dictionary<string, int>>(json)!;
}`,
      hints: ['Dictionary<string, T> maps naturally to JSON objects.', 'Serialize and Deserialize handle dictionaries natively.', 'The keys become JSON property names.'],
      concepts: ['Dictionary serialization', 'JSON objects', 'round-trip'],
    },
    {
      id: 'cs-json-12',
      title: 'JsonNode Manipulation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Modify JSON dynamically using JsonNode.',
      skeleton: `string AddField(string json, string key, string value)
{
    // Parse as JsonNode, add a new field, return updated JSON
}`,
      solution: `string AddField(string json, string key, string value)
{
    var node = JsonNode.Parse(json)!.AsObject();
    node[key] = value;
    return node.ToJsonString();
}`,
      hints: ['JsonNode.Parse returns a mutable JSON tree.', 'AsObject() casts to JsonObject for property manipulation.', 'ToJsonString() serializes the node back to JSON.'],
      concepts: ['JsonNode', 'JsonObject', 'mutable JSON', 'ToJsonString'],
    },
    {
      id: 'cs-json-13',
      title: 'Case-Insensitive Deserialize Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix deserialization that fails due to casing mismatch.',
      skeleton: `// JSON uses camelCase, class uses PascalCase
string json = "{\\"firstName\\":\\"Alice\\",\\"lastName\\":\\"Smith\\"}";
// Bug: properties are null because casing doesn't match
var person = JsonSerializer.Deserialize<Person>(json);

public class Person
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
}`,
      solution: `string json = "{\\"firstName\\":\\"Alice\\",\\"lastName\\":\\"Smith\\"}";
var options = new JsonSerializerOptions
{
    PropertyNameCaseInsensitive = true
};
var person = JsonSerializer.Deserialize<Person>(json, options);

public class Person
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
}`,
      hints: ['By default, System.Text.Json is case-sensitive.', 'PropertyNameCaseInsensitive = true fixes casing mismatches.', 'Alternatively, use JsonPropertyName attributes.'],
      concepts: ['PropertyNameCaseInsensitive', 'casing mismatch', 'deserialization options'],
    },
    {
      id: 'cs-json-14',
      title: 'Missing Parameterless Constructor Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the class that fails to deserialize.',
      skeleton: `// Bug: JsonSerializer cannot create an instance
public class Point
{
    public int X { get; }
    public int Y { get; }
    public Point(int x, int y) { X = x; Y = y; }
}

var p = JsonSerializer.Deserialize<Point>("{\\"X\\":1,\\"Y\\":2}");`,
      solution: `public class Point
{
    public int X { get; }
    public int Y { get; }

    [JsonConstructor]
    public Point(int x, int y) { X = x; Y = y; }
}

var p = JsonSerializer.Deserialize<Point>("{\\"X\\":1,\\"Y\\":2}");`,
      hints: ['System.Text.Json needs to know which constructor to use.', 'Apply [JsonConstructor] to the parameterized constructor.', 'Parameter names must match property names (case-insensitive).'],
      concepts: ['JsonConstructor', 'parameterized deserialization'],
    },
    {
      id: 'cs-json-15',
      title: 'Circular Reference Bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix serialization that throws due to circular references.',
      skeleton: `// Bug: throws JsonException due to cycle
public class Node
{
    public string Name { get; set; }
    public Node? Parent { get; set; }
    public List<Node> Children { get; set; } = new();
}

var root = new Node { Name = "root" };
var child = new Node { Name = "child", Parent = root };
root.Children.Add(child);

string json = JsonSerializer.Serialize(root); // throws!`,
      solution: `public class Node
{
    public string Name { get; set; }
    public Node? Parent { get; set; }
    public List<Node> Children { get; set; } = new();
}

var root = new Node { Name = "root" };
var child = new Node { Name = "child", Parent = root };
root.Children.Add(child);

var options = new JsonSerializerOptions
{
    ReferenceHandler = ReferenceHandler.Preserve
};
string json = JsonSerializer.Serialize(root, options);`,
      hints: ['Circular references cause infinite recursion.', 'ReferenceHandler.Preserve tracks and handles cycles.', 'It adds $id and $ref metadata to the JSON.'],
      concepts: ['ReferenceHandler', 'circular references', 'Preserve'],
    },
    {
      id: 'cs-json-16',
      title: 'Predict Serialize Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the JSON output of serialization.',
      skeleton: `var obj = new { X = 1, Y = "hello" };
Console.WriteLine(JsonSerializer.Serialize(obj));`,
      solution: `{"X":1,"Y":"hello"}`,
      hints: ['Anonymous types serialize as JSON objects.', 'Property names match the C# names by default.', 'Strings are quoted, numbers are not.'],
      concepts: ['Serialize', 'anonymous type', 'JSON output format'],
    },
    {
      id: 'cs-json-17',
      title: 'Predict CamelCase Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the JSON output with camelCase policy.',
      skeleton: `var opts = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
var obj = new { FirstName = "Alice", LastName = "Smith" };
Console.WriteLine(JsonSerializer.Serialize(obj, opts));`,
      solution: `{"firstName":"Alice","lastName":"Smith"}`,
      hints: ['CamelCase converts PascalCase to camelCase.', 'FirstName becomes firstName.', 'LastName becomes lastName.'],
      concepts: ['CamelCase', 'PropertyNamingPolicy', 'naming transform'],
    },
    {
      id: 'cs-json-18',
      title: 'Predict JsonIgnore',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the output when a property is ignored.',
      skeleton: `public class User
{
    public string Name { get; set; } = "Bob";
    [JsonIgnore]
    public string Password { get; set; } = "secret";
}
Console.WriteLine(JsonSerializer.Serialize(new User()));`,
      solution: `{"Name":"Bob"}`,
      hints: ['JsonIgnore excludes the property from serialization.', 'Password will not appear in the JSON.', 'Only Name is included.'],
      concepts: ['JsonIgnore', 'property exclusion'],
    },
    {
      id: 'cs-json-19',
      title: 'Refactor Newtonsoft to System.Text.Json',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Refactor code from Newtonsoft.Json to System.Text.Json.',
      skeleton: `using Newtonsoft.Json;

string ToJson(object obj)
{
    return JsonConvert.SerializeObject(obj, Formatting.Indented,
        new JsonSerializerSettings
        {
            NullValueHandling = NullValueHandling.Ignore,
            ContractResolver = new CamelCasePropertyNamesContractResolver()
        });
}`,
      solution: `using System.Text.Json;

string ToJson(object obj)
{
    return JsonSerializer.Serialize(obj, new JsonSerializerOptions
    {
        WriteIndented = true,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    });
}`,
      hints: ['JsonConvert.SerializeObject becomes JsonSerializer.Serialize.', 'Formatting.Indented becomes WriteIndented = true.', 'CamelCasePropertyNamesContractResolver becomes JsonNamingPolicy.CamelCase.'],
      concepts: ['migration', 'Newtonsoft to STJ', 'JsonSerializerOptions'],
    },
    {
      id: 'cs-json-20',
      title: 'Refactor to Source Generator',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Refactor runtime serialization to use source-generated context.',
      skeleton: `public record WeatherForecast(DateTime Date, int TemperatureC, string Summary);

string Serialize(WeatherForecast forecast)
{
    return JsonSerializer.Serialize(forecast);
}

WeatherForecast? Deserialize(string json)
{
    return JsonSerializer.Deserialize<WeatherForecast>(json);
}`,
      solution: `public record WeatherForecast(DateTime Date, int TemperatureC, string Summary);

[JsonSerializable(typeof(WeatherForecast))]
partial class AppJsonContext : JsonSerializerContext { }

string Serialize(WeatherForecast forecast)
{
    return JsonSerializer.Serialize(forecast, AppJsonContext.Default.WeatherForecast);
}

WeatherForecast? Deserialize(string json)
{
    return JsonSerializer.Deserialize(json, AppJsonContext.Default.WeatherForecast);
}`,
      hints: ['Source generators eliminate runtime reflection.', 'Create a partial class extending JsonSerializerContext.', 'Use the Default singleton to access type info.'],
      concepts: ['JsonSerializerContext', 'source generators', 'AOT-friendly', 'JsonSerializable'],
    },
  ],
};
