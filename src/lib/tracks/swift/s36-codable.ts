import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'swift-codable',
  title: '36. Codable',
  explanation: `## Codable in Swift

\`Codable\` is a type alias for \`Encodable & Decodable\`, enabling easy serialization and deserialization of types.

### Automatic Conformance

\`\`\`swift
struct User: Codable {
    let name: String
    let age: Int
    let email: String
}

let user = User(name: "Alice", age: 30, email: "alice@test.com")
let data = try JSONEncoder().encode(user)
let decoded = try JSONDecoder().decode(User.self, from: data)
\`\`\`

### Custom CodingKeys

\`\`\`swift
struct Product: Codable {
    let productName: String
    let price: Double

    enum CodingKeys: String, CodingKey {
        case productName = "product_name"
        case price
    }
}
\`\`\`

### Custom Encoding/Decoding

\`\`\`swift
struct Timestamp: Codable {
    let date: Date

    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        let timeInterval = try container.decode(Double.self)
        date = Date(timeIntervalSince1970: timeInterval)
    }

    func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()
        try container.encode(date.timeIntervalSince1970)
    }
}
\`\`\`

### Nested Containers

\`\`\`swift
struct Coordinate: Codable {
    let latitude: Double
    let longitude: Double

    enum CodingKeys: String, CodingKey {
        case location
    }
    enum LocationKeys: String, CodingKey {
        case latitude = "lat"
        case longitude = "lng"
    }
}
\`\`\`
`,
  exercises: [
    {
      id: 'swift-codable-1',
      title: 'Basic Codable Struct',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Make a struct conform to Codable.',
      skeleton: `struct Book: ___ {
    let title: String
    let author: String
    let pages: Int
}`,
      solution: `struct Book: Codable {
    let title: String
    let author: String
    let pages: Int
}`,
      hints: [
        'Codable enables both encoding and decoding.',
        'It is a combination of Encodable and Decodable.',
        'The answer is Codable.',
      ],
      concepts: ['codable', 'automatic-conformance'],
    },
    {
      id: 'swift-codable-2',
      title: 'Encode to JSON',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Encode a Codable struct to JSON data.',
      skeleton: `struct Item: Codable { let name: String; let count: Int }

let item = Item(name: "Widget", count: 5)
let data = try ___().encode(item)
let json = String(data: data, encoding: .utf8)!
print(json)`,
      solution: `struct Item: Codable { let name: String; let count: Int }

let item = Item(name: "Widget", count: 5)
let data = try JSONEncoder().encode(item)
let json = String(data: data, encoding: .utf8)!
print(json)`,
      hints: [
        'Use the JSON encoder to convert to Data.',
        'Create an instance and call encode.',
        'The answer is JSONEncoder.',
      ],
      concepts: ['JSONEncoder', 'encoding'],
    },
    {
      id: 'swift-codable-3',
      title: 'Decode from JSON',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Decode a Codable struct from JSON data.',
      skeleton: `struct Item: Codable { let name: String; let count: Int }

let json = #"{"name":"Widget","count":5}"#
let data = json.data(using: .utf8)!
let item = try ___().decode(___, from: data)
print(item.name)`,
      solution: `struct Item: Codable { let name: String; let count: Int }

let json = #"{"name":"Widget","count":5}"#
let data = json.data(using: .utf8)!
let item = try JSONDecoder().decode(Item.self, from: data)
print(item.name)`,
      hints: [
        'Use JSONDecoder to decode from Data.',
        'Pass the type as Type.self.',
        'JSONDecoder and Item.self.',
      ],
      concepts: ['JSONDecoder', 'decoding'],
    },
    {
      id: 'swift-codable-4',
      title: 'Custom CodingKeys',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Map Swift property names to JSON keys.',
      skeleton: `struct User: Codable {
    let firstName: String
    let lastName: String
    let emailAddress: String

    enum ___: String, CodingKey {
        case firstName = "first_name"
        case lastName = "last_name"
        case emailAddress = "email_address"
    }
}`,
      solution: `struct User: Codable {
    let firstName: String
    let lastName: String
    let emailAddress: String

    enum CodingKeys: String, CodingKey {
        case firstName = "first_name"
        case lastName = "last_name"
        case emailAddress = "email_address"
    }
}`,
      hints: [
        'The enum that maps property names to JSON keys.',
        'It must be named exactly CodingKeys.',
        'The answer is CodingKeys.',
      ],
      concepts: ['CodingKeys', 'key-mapping'],
    },
    {
      id: 'swift-codable-5',
      title: 'Date Decoding Strategy',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Configure a decoder to handle ISO 8601 dates.',
      skeleton: `struct Event: Codable {
    let name: String
    let date: Date
}

let json = #"{"name":"Launch","date":"2024-01-15T10:30:00Z"}"#
let decoder = JSONDecoder()
decoder.___ = .iso8601
let event = try decoder.decode(Event.self, from: json.data(using: .utf8)!)`,
      solution: `struct Event: Codable {
    let name: String
    let date: Date
}

let json = #"{"name":"Launch","date":"2024-01-15T10:30:00Z"}"#
let decoder = JSONDecoder()
decoder.dateDecodingStrategy = .iso8601
let event = try decoder.decode(Event.self, from: json.data(using: .utf8)!)`,
      hints: [
        'JSONDecoder has a property for date format.',
        'Set it to handle ISO 8601 formatted dates.',
        'The property is dateDecodingStrategy.',
      ],
      concepts: ['dateDecodingStrategy', 'iso8601'],
    },
    {
      id: 'swift-codable-6',
      title: 'Snake Case Key Strategy',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Use automatic snake_case to camelCase key conversion.',
      skeleton: `struct Profile: Codable {
    let firstName: String
    let lastName: String
    let profileImage: String
}

let json = #"{"first_name":"Alice","last_name":"Smith","profile_image":"pic.jpg"}"#
let decoder = JSONDecoder()
decoder.keyDecodingStrategy = ___
let profile = try decoder.decode(Profile.self, from: json.data(using: .utf8)!)`,
      solution: `struct Profile: Codable {
    let firstName: String
    let lastName: String
    let profileImage: String
}

let json = #"{"first_name":"Alice","last_name":"Smith","profile_image":"pic.jpg"}"#
let decoder = JSONDecoder()
decoder.keyDecodingStrategy = .convertFromSnakeCase
let profile = try decoder.decode(Profile.self, from: json.data(using: .utf8)!)`,
      hints: [
        'This strategy auto-converts snake_case JSON keys.',
        'No need for manual CodingKeys.',
        'The answer is .convertFromSnakeCase.',
      ],
      concepts: ['keyDecodingStrategy', 'snake-case'],
    },
    {
      id: 'swift-codable-7',
      title: 'Write a Custom Decoder',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write custom init(from:) for a type with a nested JSON structure.',
      skeleton: `// JSON: {"info": {"name": "Alice", "age": 30}, "score": 95}
// Write a struct Player: Decodable with:
// - name: String, age: Int, score: Int
// - Custom init(from decoder:) that reads from nested "info" key
`,
      solution: `struct Player: Decodable {
    let name: String
    let age: Int
    let score: Int

    enum CodingKeys: String, CodingKey {
        case info
        case score
    }

    enum InfoKeys: String, CodingKey {
        case name
        case age
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        score = try container.decode(Int.self, forKey: .score)
        let info = try container.nestedContainer(keyedBy: InfoKeys.self, forKey: .info)
        name = try info.decode(String.self, forKey: .name)
        age = try info.decode(Int.self, forKey: .age)
    }
}`,
      hints: [
        'Use nestedContainer to access the "info" sub-object.',
        'Define separate CodingKey enums for each level.',
        'Decode each property from the appropriate container.',
      ],
      concepts: ['custom-decoding', 'nested-containers'],
    },
    {
      id: 'swift-codable-8',
      title: 'Write a Custom Encoder',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write custom encode(to:) to flatten nested data.',
      skeleton: `struct Location: Encodable {
    let city: String
    let lat: Double
    let lng: Double
}

// Write encode(to:) that produces:
// {"city": "NYC", "coordinates": {"lat": 40.7, "lng": -74.0}}
`,
      solution: `struct Location: Encodable {
    let city: String
    let lat: Double
    let lng: Double

    enum CodingKeys: String, CodingKey {
        case city
        case coordinates
    }

    enum CoordinateKeys: String, CodingKey {
        case lat
        case lng
    }

    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(city, forKey: .city)
        var coords = container.nestedContainer(keyedBy: CoordinateKeys.self, forKey: .coordinates)
        try coords.encode(lat, forKey: .lat)
        try coords.encode(lng, forKey: .lng)
    }
}`,
      hints: [
        'Use nestedContainer to create the coordinates object.',
        'Encode city at the top level.',
        'Encode lat and lng in the nested container.',
      ],
      concepts: ['custom-encoding', 'nested-containers'],
    },
    {
      id: 'swift-codable-9',
      title: 'Write Codable Enum',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a Codable enum with associated values.',
      skeleton: `// Write an enum Payment: Codable with:
// - case creditCard(number: String, cvv: String)
// - case bankTransfer(iban: String)
// - case cash
// Make it Codable with a "type" discriminator
`,
      solution: `enum Payment: Codable {
    case creditCard(number: String, cvv: String)
    case bankTransfer(iban: String)
    case cash

    enum CodingKeys: String, CodingKey {
        case type
        case number, cvv, iban
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        let type = try container.decode(String.self, forKey: .type)
        switch type {
        case "creditCard":
            let number = try container.decode(String.self, forKey: .number)
            let cvv = try container.decode(String.self, forKey: .cvv)
            self = .creditCard(number: number, cvv: cvv)
        case "bankTransfer":
            let iban = try container.decode(String.self, forKey: .iban)
            self = .bankTransfer(iban: iban)
        case "cash":
            self = .cash
        default:
            throw DecodingError.dataCorruptedError(forKey: .type, in: container, debugDescription: "Unknown type")
        }
    }

    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        switch self {
        case .creditCard(let number, let cvv):
            try container.encode("creditCard", forKey: .type)
            try container.encode(number, forKey: .number)
            try container.encode(cvv, forKey: .cvv)
        case .bankTransfer(let iban):
            try container.encode("bankTransfer", forKey: .type)
            try container.encode(iban, forKey: .iban)
        case .cash:
            try container.encode("cash", forKey: .type)
        }
    }
}`,
      hints: [
        'Use a "type" key to determine which case.',
        'Switch on the type string during decoding.',
        'Encode the type and associated values for each case.',
      ],
      concepts: ['codable-enum', 'discriminated-union'],
    },
    {
      id: 'swift-codable-10',
      title: 'Write a Codable Wrapper for Optionals',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a struct that handles missing JSON keys gracefully.',
      skeleton: `// Write a struct UserProfile: Codable with:
// - let id: Int
// - let name: String
// - let bio: String? (optional, might be missing from JSON)
// - let age: Int (default to 0 if missing)
// Use init(from:) for custom default handling
`,
      solution: `struct UserProfile: Codable {
    let id: Int
    let name: String
    let bio: String?
    let age: Int

    enum CodingKeys: String, CodingKey {
        case id, name, bio, age
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(Int.self, forKey: .id)
        name = try container.decode(String.self, forKey: .name)
        bio = try container.decodeIfPresent(String.self, forKey: .bio)
        age = try container.decodeIfPresent(Int.self, forKey: .age) ?? 0
    }
}`,
      hints: [
        'Use decodeIfPresent for optional fields.',
        'Use ?? to provide a default for missing values.',
        'bio is naturally optional, age defaults to 0.',
      ],
      concepts: ['decodeIfPresent', 'default-values', 'optional-decoding'],
    },
    {
      id: 'swift-codable-11',
      title: 'Write a Generic Codable Response',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Write a generic API response wrapper that is Codable.',
      skeleton: `// Write a struct APIResponse<T: Codable>: Codable with:
// - let success: Bool
// - let data: T?
// - let error: String?
`,
      solution: `struct APIResponse<T: Codable>: Codable {
    let success: Bool
    let data: T?
    let error: String?
}`,
      hints: [
        'The generic parameter T must also be Codable.',
        'data is optional because errors have no data.',
        'error is optional because successes have no error.',
      ],
      concepts: ['generic-codable', 'api-response'],
    },
    {
      id: 'swift-codable-12',
      title: 'Write a Codable Array Decoder',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'swift',
      goal: 'Write a function that decodes an array, skipping invalid elements.',
      skeleton: `// Write a function decodeArray<T: Decodable> that takes Data
// and returns [T], skipping any elements that fail to decode
// (instead of failing the entire array)
`,
      solution: `func decodeArray<T: Decodable>(_ type: T.Type, from data: Data) throws -> [T] {
    struct Wrapper: Decodable {
        let value: T?
        init(from decoder: Decoder) throws {
            let container = try decoder.singleValueContainer()
            value = try? container.decode(T.self)
        }
    }
    let wrappers = try JSONDecoder().decode([Wrapper].self, from: data)
    return wrappers.compactMap { $0.value }
}`,
      hints: [
        'Wrap each element in a type that uses try? for decoding.',
        'Failed elements become nil.',
        'Use compactMap to filter out nils.',
      ],
      concepts: ['fault-tolerant-decoding', 'compactMap'],
    },
    {
      id: 'swift-codable-13',
      title: 'Fix Missing CodingKey',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Fix the CodingKeys enum that is missing a property.',
      skeleton: `struct Config: Codable {
    let host: String
    let port: Int
    let useTLS: Bool

    enum CodingKeys: String, CodingKey {
        case host
        case port
    }
}`,
      solution: `struct Config: Codable {
    let host: String
    let port: Int
    let useTLS: Bool

    enum CodingKeys: String, CodingKey {
        case host
        case port
        case useTLS = "use_tls"
    }
}`,
      hints: [
        'When you provide CodingKeys, ALL properties must be listed.',
        'useTLS is missing from the enum.',
        'Add it with a snake_case JSON key.',
      ],
      concepts: ['CodingKeys', 'exhaustive-keys'],
    },
    {
      id: 'swift-codable-14',
      title: 'Fix Type Mismatch Decoding',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix decoding that fails because JSON has a string number.',
      skeleton: `struct Product: Codable {
    let name: String
    let price: Double
}

// JSON has price as string: {"name":"Widget","price":"9.99"}
let json = #"{"name":"Widget","price":"9.99"}"#
let product = try JSONDecoder().decode(Product.self, from: json.data(using: .utf8)!)`,
      solution: `struct Product: Codable {
    let name: String
    let price: Double

    enum CodingKeys: String, CodingKey {
        case name, price
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        name = try container.decode(String.self, forKey: .name)
        let priceString = try container.decode(String.self, forKey: .price)
        price = Double(priceString) ?? 0.0
    }
}

let json = #"{"name":"Widget","price":"9.99"}"#
let product = try JSONDecoder().decode(Product.self, from: json.data(using: .utf8)!)`,
      hints: [
        'The JSON has price as a string "9.99", not a number.',
        'Decode as String first, then convert to Double.',
        'Write a custom init(from:) decoder.',
      ],
      concepts: ['type-mismatch', 'custom-decoding'],
    },
    {
      id: 'swift-codable-15',
      title: 'Fix Encoder Output Format',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Fix the encoder that produces unreadable compact JSON.',
      skeleton: `struct User: Codable {
    let name: String
    let age: Int
}

let user = User(name: "Alice", age: 30)
let encoder = JSONEncoder()
let data = try encoder.encode(user)
print(String(data: data, encoding: .utf8)!)
// Output: {"name":"Alice","age":30}
// Wanted: pretty-printed JSON`,
      solution: `struct User: Codable {
    let name: String
    let age: Int
}

let user = User(name: "Alice", age: 30)
let encoder = JSONEncoder()
encoder.outputFormatting = .prettyPrinted
let data = try encoder.encode(user)
print(String(data: data, encoding: .utf8)!)`,
      hints: [
        'JSONEncoder has an outputFormatting property.',
        'Set it to .prettyPrinted for readable output.',
        'Add encoder.outputFormatting = .prettyPrinted.',
      ],
      concepts: ['outputFormatting', 'prettyPrinted'],
    },
    {
      id: 'swift-codable-16',
      title: 'Predict Encoding Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'swift',
      goal: 'Predict the JSON output of encoding a struct.',
      skeleton: `struct Point: Codable {
    let x: Int
    let y: Int
}

let p = Point(x: 3, y: 7)
let data = try JSONEncoder().encode(p)
let json = String(data: data, encoding: .utf8)!
// What keys appear in the JSON?
// Print the keys sorted alphabetically, comma-separated`,
      solution: `x,y`,
      hints: [
        'Codable uses property names as JSON keys.',
        'Point has two properties: x and y.',
        'Sorted: x, y.',
      ],
      concepts: ['encoding', 'json-keys'],
    },
    {
      id: 'swift-codable-17',
      title: 'Predict CodingKeys Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the JSON keys when using CodingKeys.',
      skeleton: `struct Item: Codable {
    let itemName: String
    let itemPrice: Double

    enum CodingKeys: String, CodingKey {
        case itemName = "name"
        case itemPrice = "price"
    }
}

let item = Item(itemName: "Test", itemPrice: 9.99)
let data = try JSONEncoder().encode(item)
let json = String(data: data, encoding: .utf8)!
// What keys appear in the JSON?`,
      solution: `name,price`,
      hints: [
        'CodingKeys map Swift names to JSON keys.',
        'itemName maps to "name", itemPrice maps to "price".',
        'The JSON uses the raw values.',
      ],
      concepts: ['CodingKeys', 'key-mapping'],
    },
    {
      id: 'swift-codable-18',
      title: 'Predict Optional Decoding',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Predict the result of decoding JSON with missing optional fields.',
      skeleton: `struct Config: Codable {
    let host: String
    let port: Int?
}

let json = #"{"host":"localhost"}"#
let config = try JSONDecoder().decode(Config.self, from: json.data(using: .utf8)!)
print(config.host)
print(config.port ?? "none")`,
      solution: `localhost
none`,
      hints: [
        'port is optional and missing from JSON.',
        'Missing optional fields decode as nil.',
        'nil ?? "none" prints "none".',
      ],
      concepts: ['optional-decoding', 'missing-keys'],
    },
    {
      id: 'swift-codable-19',
      title: 'Refactor Manual JSON Parsing to Codable',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor manual JSONSerialization to use Codable.',
      skeleton: `func parseUser(from data: Data) -> (name: String, age: Int)? {
    guard let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
          let name = json["name"] as? String,
          let age = json["age"] as? Int else {
        return nil
    }
    return (name, age)
}`,
      solution: `struct User: Codable {
    let name: String
    let age: Int
}

func parseUser(from data: Data) -> User? {
    return try? JSONDecoder().decode(User.self, from: data)
}`,
      hints: [
        'Define a Codable struct matching the JSON shape.',
        'Use JSONDecoder instead of JSONSerialization.',
        'try? returns nil on failure.',
      ],
      concepts: ['codable-migration', 'type-safety'],
    },
    {
      id: 'swift-codable-20',
      title: 'Refactor Repeated Encoding to Generic',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'swift',
      goal: 'Refactor repeated encoding logic into a generic function.',
      skeleton: `func saveUser(_ user: User) throws {
    let encoder = JSONEncoder()
    encoder.outputFormatting = .prettyPrinted
    let data = try encoder.encode(user)
    try data.write(to: URL(fileURLWithPath: "/tmp/user.json"))
}

func saveProduct(_ product: Product) throws {
    let encoder = JSONEncoder()
    encoder.outputFormatting = .prettyPrinted
    let data = try encoder.encode(product)
    try data.write(to: URL(fileURLWithPath: "/tmp/product.json"))
}

func saveOrder(_ order: Order) throws {
    let encoder = JSONEncoder()
    encoder.outputFormatting = .prettyPrinted
    let data = try encoder.encode(order)
    try data.write(to: URL(fileURLWithPath: "/tmp/order.json"))
}`,
      solution: `func save<T: Encodable>(_ value: T, to path: String) throws {
    let encoder = JSONEncoder()
    encoder.outputFormatting = .prettyPrinted
    let data = try encoder.encode(value)
    try data.write(to: URL(fileURLWithPath: path))
}`,
      hints: [
        'All three functions follow the same pattern.',
        'Use a generic parameter T: Encodable.',
        'Accept the path as a parameter.',
      ],
      concepts: ['generics', 'DRY', 'refactoring'],
    },
  ],
};
