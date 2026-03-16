import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-serialization',
  title: '48. Serialization',
  explanation: `## Serialization in Java

**Serialization** is the process of converting an object's state into a byte stream, and **deserialization** is the reverse. This enables persistence, network transfer, and caching.

### Java Serializable

\`\`\`java
public class User implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;
    private transient String password; // not serialized
}
\`\`\`

### Writing and Reading Objects

\`\`\`java
// Serialize
try (ObjectOutputStream oos = new ObjectOutputStream(
        new FileOutputStream("user.ser"))) {
    oos.writeObject(user);
}

// Deserialize
try (ObjectInputStream ois = new ObjectInputStream(
        new FileInputStream("user.ser"))) {
    User user = (User) ois.readObject();
}
\`\`\`

### transient Keyword

Fields marked \`transient\` are excluded from serialization. They get default values (null, 0, false) upon deserialization.

### serialVersionUID

A unique identifier for each class version. If you don't declare it, Java computes one automatically -- but any class change can break deserialization:

\`\`\`java
private static final long serialVersionUID = 1L;
\`\`\`

### Custom Serialization

Override \`writeObject\` and \`readObject\` for custom behavior:

\`\`\`java
private void writeObject(ObjectOutputStream oos) throws IOException {
    oos.defaultWriteObject();
    oos.writeObject(encrypt(password));
}

private void readObject(ObjectInputStream ois)
        throws IOException, ClassNotFoundException {
    ois.defaultReadObject();
    this.password = decrypt((String) ois.readObject());
}
\`\`\`

### Externalizable

For complete control, implement \`Externalizable\`:

\`\`\`java
public class Config implements Externalizable {
    private String key;
    private String value;

    public Config() {} // required no-arg constructor

    @Override
    public void writeExternal(ObjectOutput out) throws IOException {
        out.writeUTF(key);
        out.writeUTF(value);
    }

    @Override
    public void readExternal(ObjectInput in) throws IOException {
        this.key = in.readUTF();
        this.value = in.readUTF();
    }
}
\`\`\`

### JSON Serialization with Jackson

Modern apps typically prefer JSON. Jackson is the most popular library:

\`\`\`java
ObjectMapper mapper = new ObjectMapper();
String json = mapper.writeValueAsString(user);     // serialize
User user = mapper.readValue(json, User.class);     // deserialize
\`\`\``,
  exercises: [
    {
      id: 'java-serialization-1',
      title: 'Make a Class Serializable',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Complete the class so it can be serialized using Java object serialization.',
      skeleton: `public class Employee __BLANK__ Serializable {
    private static final long __BLANK__ = 1L;
    private String name;
    private double salary;
}`,
      solution: `public class Employee implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private double salary;
}`,
      hints: [
        'Classes implement the Serializable interface using the "implements" keyword.',
        'The version identifier field is called serialVersionUID.',
        'It must be "private static final long serialVersionUID = 1L;".',
      ],
      concepts: ['serializable', 'serial-version-uid', 'interface'],
    },
    {
      id: 'java-serialization-2',
      title: 'Serialize an Object to a File',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write an object to a file using ObjectOutputStream.',
      skeleton: `Employee emp = new Employee("Alice", 75000);
try (__BLANK__ oos = new ObjectOutputStream(
        new __BLANK__("employee.ser"))) {
    oos.__BLANK__(emp);
}`,
      solution: `Employee emp = new Employee("Alice", 75000);
try (ObjectOutputStream oos = new ObjectOutputStream(
        new FileOutputStream("employee.ser"))) {
    oos.writeObject(emp);
}`,
      hints: [
        'ObjectOutputStream wraps a FileOutputStream.',
        'Use FileOutputStream to create the output file.',
        'writeObject() serializes the object to the stream.',
      ],
      concepts: ['object-output-stream', 'file-output-stream', 'write-object'],
    },
    {
      id: 'java-serialization-3',
      title: 'Deserialize an Object from a File',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Read a serialized object back from a file.',
      skeleton: `try (ObjectInputStream ois = new __BLANK__(
        new FileInputStream("employee.ser"))) {
    Employee emp = (__BLANK__) ois.__BLANK__();
    System.out.println(emp.getName());
}`,
      solution: `try (ObjectInputStream ois = new ObjectInputStream(
        new FileInputStream("employee.ser"))) {
    Employee emp = (Employee) ois.readObject();
    System.out.println(emp.getName());
}`,
      hints: [
        'ObjectInputStream reads serialized objects.',
        'Cast the result of readObject() to the expected type.',
        'readObject() returns Object, so cast to Employee.',
      ],
      concepts: ['object-input-stream', 'read-object', 'type-cast'],
    },
    {
      id: 'java-serialization-4',
      title: 'Transient Field',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Mark the password field so it is excluded from serialization.',
      skeleton: `public class Account implements Serializable {
    private static final long serialVersionUID = 1L;
    private String username;
    private __BLANK__ String password;
    private int loginCount;
}`,
      solution: `public class Account implements Serializable {
    private static final long serialVersionUID = 1L;
    private String username;
    private transient String password;
    private int loginCount;
}`,
      hints: [
        'The keyword that excludes a field from serialization is "transient".',
        'Place it before the field type.',
        'Transient fields get default values (null for objects) after deserialization.',
      ],
      concepts: ['transient', 'serialization-exclusion', 'security'],
    },
    {
      id: 'java-serialization-5',
      title: 'Predict Transient Field Value',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the value of the transient field after deserialization.',
      skeleton: `public class User implements Serializable {
    private static final long serialVersionUID = 1L;
    String name = "Alice";
    transient int sessionCount = 42;
}

// Serialize
User u = new User();
ObjectOutputStream oos = new ObjectOutputStream(
    new FileOutputStream("u.ser"));
oos.writeObject(u);
oos.close();

// Deserialize
ObjectInputStream ois = new ObjectInputStream(
    new FileInputStream("u.ser"));
User u2 = (User) ois.readObject();
ois.close();

System.out.println(u2.name);
System.out.println(u2.sessionCount);`,
      solution: `Alice
0`,
      hints: [
        'name is not transient, so it is serialized normally.',
        'sessionCount is transient, so it is NOT serialized.',
        'After deserialization, transient int fields default to 0.',
      ],
      concepts: ['transient', 'default-values', 'deserialization'],
    },
    {
      id: 'java-serialization-6',
      title: 'Write a Serialization Helper',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write two static helper methods: serialize(Object obj, String filename) and deserialize(String filename) that handle serialization to/from files.',
      skeleton: `public class SerHelper {
    // Write serialize(Object obj, String filename) throws IOException

    // Write deserialize(String filename) throws IOException, ClassNotFoundException
}`,
      solution: `public class SerHelper {
    public static void serialize(Object obj, String filename) throws IOException {
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream(filename))) {
            oos.writeObject(obj);
        }
    }

    public static Object deserialize(String filename)
            throws IOException, ClassNotFoundException {
        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream(filename))) {
            return ois.readObject();
        }
    }
}`,
      hints: [
        'serialize wraps ObjectOutputStream around FileOutputStream.',
        'deserialize wraps ObjectInputStream around FileInputStream.',
        'Use try-with-resources for proper cleanup.',
      ],
      concepts: ['helper-methods', 'serialization', 'try-with-resources'],
    },
    {
      id: 'java-serialization-7',
      title: 'Fix the Missing serialVersionUID',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'This class was serialized, then a field was added, and now deserialization fails with InvalidClassException. Fix it by adding a stable serialVersionUID.',
      skeleton: `// Original version (already serialized data exists):
// public class Product implements Serializable {
//     private String name;
//     private double price;
// }

// New version (deserialization fails):
public class Product implements Serializable {
    private String name;
    private double price;
    private String category; // newly added field
}`,
      solution: `public class Product implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private double price;
    private String category; // newly added field -- defaults to null on old data
}`,
      hints: [
        'Without serialVersionUID, Java auto-generates one based on class structure.',
        'Adding a field changes the auto-generated UID, breaking compatibility.',
        'Declare a fixed serialVersionUID to maintain backward compatibility.',
      ],
      concepts: ['serial-version-uid', 'backward-compatibility', 'invalid-class-exception'],
    },
    {
      id: 'java-serialization-8',
      title: 'Custom writeObject and readObject',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Implement custom serialization that encrypts the password field before writing.',
      skeleton: `public class SecureUser implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private transient String password;

    private void __BLANK__(ObjectOutputStream oos) throws IOException {
        oos.__BLANK__();
        oos.writeObject(Base64.getEncoder().encodeToString(password.getBytes()));
    }

    private void __BLANK__(ObjectInputStream ois)
            throws IOException, ClassNotFoundException {
        ois.__BLANK__();
        String encoded = (String) ois.readObject();
        this.password = new String(Base64.getDecoder().decode(encoded));
    }
}`,
      solution: `public class SecureUser implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private transient String password;

    private void writeObject(ObjectOutputStream oos) throws IOException {
        oos.defaultWriteObject();
        oos.writeObject(Base64.getEncoder().encodeToString(password.getBytes()));
    }

    private void readObject(ObjectInputStream ois)
            throws IOException, ClassNotFoundException {
        ois.defaultReadObject();
        String encoded = (String) ois.readObject();
        this.password = new String(Base64.getDecoder().decode(encoded));
    }
}`,
      hints: [
        'The methods are writeObject and readObject with specific signatures.',
        'Call defaultWriteObject()/defaultReadObject() first to handle normal fields.',
        'Then manually write/read the transient field with custom encoding.',
      ],
      concepts: ['custom-serialization', 'write-object', 'read-object'],
    },
    {
      id: 'java-serialization-9',
      title: 'Externalizable Implementation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Implement the Externalizable interface for a Config class with String key, String value, and int version fields.',
      skeleton: `public class Config implements Externalizable {
    private String key;
    private String value;
    private int version;

    public Config() {} // required!

    public Config(String key, String value, int version) {
        this.key = key;
        this.value = value;
        this.version = version;
    }

    // Implement writeExternal and readExternal
}`,
      solution: `public class Config implements Externalizable {
    private String key;
    private String value;
    private int version;

    public Config() {}

    public Config(String key, String value, int version) {
        this.key = key;
        this.value = value;
        this.version = version;
    }

    @Override
    public void writeExternal(ObjectOutput out) throws IOException {
        out.writeUTF(key);
        out.writeUTF(value);
        out.writeInt(version);
    }

    @Override
    public void readExternal(ObjectInput in) throws IOException {
        this.key = in.readUTF();
        this.value = in.readUTF();
        this.version = in.readInt();
    }
}`,
      hints: [
        'Externalizable requires writeExternal(ObjectOutput) and readExternal(ObjectInput).',
        'Use out.writeUTF() for strings and out.writeInt() for ints.',
        'Read in the SAME order you wrote: key, value, version.',
      ],
      concepts: ['externalizable', 'object-output', 'object-input'],
    },
    {
      id: 'java-serialization-10',
      title: 'Jackson ObjectMapper Basics',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Serialize a Java object to JSON and deserialize it back using Jackson ObjectMapper.',
      skeleton: `ObjectMapper mapper = new __BLANK__();

// Serialize to JSON string
User user = new User("Alice", 30);
String json = mapper.__BLANK__(user);

// Deserialize from JSON string
User restored = mapper.__BLANK__(json, __BLANK__);`,
      solution: `ObjectMapper mapper = new ObjectMapper();

// Serialize to JSON string
User user = new User("Alice", 30);
String json = mapper.writeValueAsString(user);

// Deserialize from JSON string
User restored = mapper.readValue(json, User.class);`,
      hints: [
        'Jackson ObjectMapper is created with new ObjectMapper().',
        'writeValueAsString() converts an object to a JSON string.',
        'readValue(json, Class) parses JSON back into an object.',
      ],
      concepts: ['jackson', 'object-mapper', 'json-serialization'],
    },
    {
      id: 'java-serialization-11',
      title: 'Jackson Annotations',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a class with Jackson annotations: rename "name" to "full_name" in JSON, ignore "internalId", and set a default for missing "role" as "user".',
      skeleton: `// Write the annotated class for Jackson serialization
public class Member {
    // name -> "full_name" in JSON
    // internalId -> ignored in JSON
    // role -> defaults to "user" if missing in JSON
}`,
      solution: `import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Member {
    @JsonProperty("full_name")
    private String name;

    @JsonIgnore
    private long internalId;

    private String role = "user";

    public Member() {}

    public Member(String name, long internalId, String role) {
        this.name = name;
        this.internalId = internalId;
        this.role = role;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public long getInternalId() { return internalId; }
    public void setInternalId(long internalId) { this.internalId = internalId; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}`,
      hints: [
        '@JsonProperty("full_name") renames the field in JSON output.',
        '@JsonIgnore excludes the field from serialization entirely.',
        'Set a default value in the field declaration; Jackson will keep it if the JSON field is missing.',
      ],
      concepts: ['jackson-annotations', 'json-property', 'json-ignore'],
    },
    {
      id: 'java-serialization-12',
      title: 'Fix the Deserialization Crash',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'This Externalizable class crashes on deserialization. Fix it.',
      skeleton: `public class Settings implements Externalizable {
    private final String theme;
    private final int fontSize;

    public Settings(String theme, int fontSize) {
        this.theme = theme;
        this.fontSize = fontSize;
    }

    @Override
    public void writeExternal(ObjectOutput out) throws IOException {
        out.writeUTF(theme);
        out.writeInt(fontSize);
    }

    @Override
    public void readExternal(ObjectInput in) throws IOException {
        this.theme = in.readUTF();
        this.fontSize = in.readInt();
    }
}`,
      solution: `public class Settings implements Externalizable {
    private String theme;
    private int fontSize;

    public Settings() {} // required no-arg constructor

    public Settings(String theme, int fontSize) {
        this.theme = theme;
        this.fontSize = fontSize;
    }

    @Override
    public void writeExternal(ObjectOutput out) throws IOException {
        out.writeUTF(theme);
        out.writeInt(fontSize);
    }

    @Override
    public void readExternal(ObjectInput in) throws IOException {
        this.theme = in.readUTF();
        this.fontSize = in.readInt();
    }
}`,
      hints: [
        'Externalizable requires a public no-arg constructor for deserialization.',
        'Fields cannot be final if they are assigned in readExternal.',
        'Add a no-arg constructor and remove final from the fields.',
      ],
      concepts: ['externalizable', 'no-arg-constructor', 'final-fields'],
    },
    {
      id: 'java-serialization-13',
      title: 'Predict Serialization with Inheritance',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output when a subclass is serialized but the parent is NOT Serializable.',
      skeleton: `public class Animal {
    String species;
    public Animal() { this.species = "Unknown"; }
}

public class Dog extends Animal implements Serializable {
    private static final long serialVersionUID = 1L;
    String name;
}

Dog d = new Dog();
d.species = "Canine";
d.name = "Rex";

// Serialize d, then deserialize to Dog d2
System.out.println(d2.name);
System.out.println(d2.species);`,
      solution: `Rex
Unknown`,
      hints: [
        'Dog is Serializable but Animal is not.',
        'During deserialization, the non-serializable parent constructor is called.',
        'Animal() sets species to "Unknown", so d2.species is "Unknown" not "Canine".',
      ],
      concepts: ['inheritance-serialization', 'non-serializable-parent', 'constructor-call'],
    },
    {
      id: 'java-serialization-14',
      title: 'Serialize to Byte Array',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write methods to serialize an object to a byte array and deserialize from a byte array (useful for network transfer or caching).',
      skeleton: `public class ByteSerializer {
    // Write: byte[] toBytes(Serializable obj) throws IOException

    // Write: <T> T fromBytes(byte[] data) throws IOException, ClassNotFoundException
}`,
      solution: `public class ByteSerializer {
    public static byte[] toBytes(Serializable obj) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (ObjectOutputStream oos = new ObjectOutputStream(baos)) {
            oos.writeObject(obj);
        }
        return baos.toByteArray();
    }

    @SuppressWarnings("unchecked")
    public static <T> T fromBytes(byte[] data)
            throws IOException, ClassNotFoundException {
        try (ObjectInputStream ois = new ObjectInputStream(
                new ByteArrayInputStream(data))) {
            return (T) ois.readObject();
        }
    }
}`,
      hints: [
        'Use ByteArrayOutputStream instead of FileOutputStream for in-memory serialization.',
        'Wrap it in ObjectOutputStream as usual, then call toByteArray().',
        'For deserialization, use ByteArrayInputStream wrapping the byte array.',
      ],
      concepts: ['byte-array-serialization', 'in-memory', 'generics'],
    },
    {
      id: 'java-serialization-15',
      title: 'Jackson Generic Type Deserialization',
      type: 'fill-blank',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Deserialize a JSON array into a List<User> using Jackson TypeReference.',
      skeleton: `ObjectMapper mapper = new ObjectMapper();
String json = "[{\\"name\\":\\"Alice\\"},{\\"name\\":\\"Bob\\"}]";

List<User> users = mapper.readValue(json, new __BLANK__<__BLANK__>() {});`,
      solution: `ObjectMapper mapper = new ObjectMapper();
String json = "[{\\"name\\":\\"Alice\\"},{\\"name\\":\\"Bob\\"}]";

List<User> users = mapper.readValue(json, new TypeReference<List<User>>() {});`,
      hints: [
        'Jackson cannot infer generic types at runtime due to type erasure.',
        'TypeReference captures the full generic type at compile time.',
        'Use new TypeReference<List<User>>() {} as an anonymous class.',
      ],
      concepts: ['type-reference', 'generic-deserialization', 'type-erasure'],
    },
    {
      id: 'java-serialization-16',
      title: 'Serialization Proxy Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Implement the Serialization Proxy pattern for a Period class (start/end dates). The proxy validates data on deserialization.',
      skeleton: `public final class Period implements Serializable {
    private static final long serialVersionUID = 1L;
    private final LocalDate start;
    private final LocalDate end;

    public Period(LocalDate start, LocalDate end) {
        if (start.isAfter(end)) throw new IllegalArgumentException("start > end");
        this.start = start;
        this.end = end;
    }

    // Implement the serialization proxy pattern
    // - private static class SerializationProxy implements Serializable
    // - writeReplace() returns the proxy
    // - readObject() on Period throws InvalidObjectException
    // - readResolve() on proxy returns new Period
}`,
      solution: `public final class Period implements Serializable {
    private static final long serialVersionUID = 1L;
    private final LocalDate start;
    private final LocalDate end;

    public Period(LocalDate start, LocalDate end) {
        if (start.isAfter(end)) throw new IllegalArgumentException("start > end");
        this.start = start;
        this.end = end;
    }

    private Object writeReplace() {
        return new SerializationProxy(this);
    }

    private void readObject(ObjectInputStream stream) throws InvalidObjectException {
        throw new InvalidObjectException("Proxy required");
    }

    private static class SerializationProxy implements Serializable {
        private static final long serialVersionUID = 1L;
        private final LocalDate start;
        private final LocalDate end;

        SerializationProxy(Period period) {
            this.start = period.start;
            this.end = period.end;
        }

        private Object readResolve() {
            return new Period(start, end);
        }
    }
}`,
      hints: [
        'writeReplace() returns a proxy object instead of the real Period.',
        'The proxy stores the data; readResolve() reconstructs Period via the public constructor.',
        'Period.readObject() throws to prevent direct deserialization attacks.',
      ],
      concepts: ['serialization-proxy', 'write-replace', 'read-resolve'],
    },
    {
      id: 'java-serialization-17',
      title: 'Fix the Singleton Serialization Bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Deserializing this singleton creates a second instance. Fix it so deserialization returns the same singleton.',
      skeleton: `public class Registry implements Serializable {
    private static final long serialVersionUID = 1L;
    private static final Registry INSTANCE = new Registry();

    private Registry() {}

    public static Registry getInstance() {
        return INSTANCE;
    }

    private final Map<String, String> entries = new HashMap<>();

    public void register(String key, String val) { entries.put(key, val); }
}

// After serialize/deserialize:
// Registry.getInstance() != deserializedRegistry  <-- BUG!`,
      solution: `public class Registry implements Serializable {
    private static final long serialVersionUID = 1L;
    private static final Registry INSTANCE = new Registry();

    private Registry() {}

    public static Registry getInstance() {
        return INSTANCE;
    }

    private final Map<String, String> entries = new HashMap<>();

    public void register(String key, String val) { entries.put(key, val); }

    private Object readResolve() {
        return INSTANCE;
    }
}`,
      hints: [
        'Deserialization creates a new object, bypassing the private constructor.',
        'The readResolve() method is called after deserialization.',
        'Return the singleton INSTANCE from readResolve() to preserve identity.',
      ],
      concepts: ['singleton-serialization', 'read-resolve', 'object-identity'],
    },
    {
      id: 'java-serialization-18',
      title: 'Predict Custom Serialization Output',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Predict the output after custom serialization and deserialization.',
      skeleton: `public class Counter implements Serializable {
    private static final long serialVersionUID = 1L;
    private int count = 0;
    private transient int tempCount = 0;

    private void writeObject(ObjectOutputStream oos) throws IOException {
        count += tempCount;
        oos.defaultWriteObject();
    }

    private void readObject(ObjectInputStream ois)
            throws IOException, ClassNotFoundException {
        ois.defaultReadObject();
        tempCount = 0;
    }
}

Counter c = new Counter();
c.count = 5;
c.tempCount = 3;
// serialize then deserialize to Counter c2
System.out.println(c2.count);
System.out.println(c2.tempCount);`,
      solution: `8
0`,
      hints: [
        'writeObject adds tempCount into count before serializing: 5 + 3 = 8.',
        'defaultWriteObject() writes count=8 (tempCount is transient, not written).',
        'readObject sets tempCount = 0 explicitly, and count is restored as 8.',
      ],
      concepts: ['custom-serialization', 'transient', 'write-object'],
    },
    {
      id: 'java-serialization-19',
      title: 'Refactor to Jackson from Java Serialization',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor this class from Java Serializable to JSON serialization using Jackson. Remove Serializable, transient, serialVersionUID, and replace with Jackson annotations.',
      skeleton: `public class UserProfile implements Serializable {
    private static final long serialVersionUID = 2L;
    private String username;
    private String displayName;
    private transient String sessionToken;
    private List<String> roles;

    private void writeObject(ObjectOutputStream oos) throws IOException {
        oos.defaultWriteObject();
    }

    private void readObject(ObjectInputStream ois)
            throws IOException, ClassNotFoundException {
        ois.defaultReadObject();
        this.sessionToken = null;
    }
}`,
      solution: `import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class UserProfile {
    @JsonProperty("username")
    private String username;

    @JsonProperty("display_name")
    private String displayName;

    @JsonIgnore
    private String sessionToken;

    private List<String> roles;

    public UserProfile() {}

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }
    public String getSessionToken() { return sessionToken; }
    public void setSessionToken(String sessionToken) { this.sessionToken = sessionToken; }
    public List<String> getRoles() { return roles; }
    public void setRoles(List<String> roles) { this.roles = roles; }
}`,
      hints: [
        'Remove "implements Serializable", serialVersionUID, writeObject, readObject.',
        'Replace transient with @JsonIgnore for excluded fields.',
        'Add a no-arg constructor and getters/setters for Jackson.',
      ],
      concepts: ['refactoring', 'jackson', 'json-annotations'],
    },
    {
      id: 'java-serialization-20',
      title: 'Versioned Custom Serialization',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor this class to support versioned serialization: write a version number in writeObject, and in readObject, handle both version 1 (name only) and version 2 (name + email) formats.',
      skeleton: `public class Contact implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private String email; // added in version 2

    // Currently no custom serialization. Old data only has name.
    // New data should have both name and email.
    // Refactor to handle both formats.
}`,
      solution: `public class Contact implements Serializable {
    private static final long serialVersionUID = 1L;
    private static final int CURRENT_VERSION = 2;

    private String name;
    private String email;

    public Contact() {}

    public Contact(String name, String email) {
        this.name = name;
        this.email = email;
    }

    private void writeObject(ObjectOutputStream oos) throws IOException {
        oos.writeInt(CURRENT_VERSION);
        oos.writeUTF(name);
        oos.writeUTF(email != null ? email : "");
    }

    private void readObject(ObjectInputStream ois)
            throws IOException, ClassNotFoundException {
        int version = ois.readInt();
        this.name = ois.readUTF();
        if (version >= 2) {
            this.email = ois.readUTF();
        } else {
            this.email = null;
        }
    }

    public String getName() { return name; }
    public String getEmail() { return email; }
}`,
      hints: [
        'Write a version integer as the first field in writeObject.',
        'In readObject, read the version first, then conditionally read fields.',
        'Version 1 data has only name; version 2 has name + email.',
      ],
      concepts: ['versioned-serialization', 'backward-compatibility', 'schema-evolution'],
    },
  ],
};
