import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-enums',
  title: '15. Enums',
  explanation: `## Enums

Enums represent a fixed set of constants.

### Basic Enum
\`\`\`java
enum Season { SPRING, SUMMER, AUTUMN, WINTER }
\`\`\`

### Enum with Fields & Methods
\`\`\`java
enum Planet {
    EARTH(5.97e24, 6.37e6);
    private final double mass, radius;
    Planet(double mass, double radius) { this.mass = mass; this.radius = radius; }
    double gravity() { return 6.67e-11 * mass / (radius * radius); }
}
\`\`\`

### Abstract Methods in Enums
Each constant can implement its own behavior:
\`\`\`java
enum Operation {
    ADD { double apply(double a, double b) { return a + b; } },
    SUB { double apply(double a, double b) { return a - b; } };
    abstract double apply(double a, double b);
}
\`\`\`

### Useful Methods
- \`values()\`, \`valueOf(String)\`, \`name()\`, \`ordinal()\`

### EnumSet & EnumMap
Specialized collections for enum types, more efficient than HashSet/HashMap.

### Enum Singleton
Thread-safe singleton using an enum with a single constant.
`,
  exercises: [
    {
      id: 'java-enum-1',
      title: 'Basic enum declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Declare a simple enum for directions.',
      skeleton: `__BLANK__ Direction {
    NORTH, SOUTH, EAST, WEST
}`,
      solution: `enum Direction {
    NORTH, SOUTH, EAST, WEST
}`,
      hints: ['Java has a special type for fixed constant sets.', 'It is not a class or interface.', 'Use `enum`.'],
      concepts: ['enum', 'constant set', 'declaration'],
    },
    {
      id: 'java-enum-2',
      title: 'Enum values method',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Get all enum constants as an array.',
      skeleton: `Direction[] dirs = Direction.__BLANK__();`,
      solution: `Direction[] dirs = Direction.values();`,
      hints: ['Enums have a built-in method to get all constants.', 'It returns an array.', 'Use `values`.'],
      concepts: ['values()', 'enum iteration', 'enum array'],
    },
    {
      id: 'java-enum-3',
      title: 'Enum valueOf',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Convert a string to an enum constant.',
      skeleton: `Direction d = Direction.__BLANK__("NORTH");`,
      solution: `Direction d = Direction.valueOf("NORTH");`,
      hints: ['Enums can be created from their string name.', 'The string must match exactly.', 'Use `valueOf`.'],
      concepts: ['valueOf', 'string to enum', 'parsing'],
    },
    {
      id: 'java-enum-4',
      title: 'Enum with constructor',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Complete the enum constructor.',
      skeleton: `enum Color {
    RED("#FF0000"), GREEN("#00FF00"), BLUE("#0000FF");
    
    private final String hex;
    
    __BLANK__(String hex) {
        this.hex = hex;
    }
}`,
      solution: `enum Color {
    RED("#FF0000"), GREEN("#00FF00"), BLUE("#0000FF");
    
    private final String hex;
    
    Color(String hex) {
        this.hex = hex;
    }
}`,
      hints: ['Enum constructors have the same name as the enum.', 'They are implicitly private.', 'Use `Color`.'],
      concepts: ['enum constructor', 'fields', 'initialization'],
    },
    {
      id: 'java-enum-5',
      title: 'EnumSet creation',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Create an EnumSet containing specific enum constants.',
      skeleton: `java.util.EnumSet<Direction> horizontal = java.util.EnumSet.__BLANK__(Direction.EAST, Direction.WEST);`,
      solution: `java.util.EnumSet<Direction> horizontal = java.util.EnumSet.of(Direction.EAST, Direction.WEST);`,
      hints: ['EnumSet has a factory method for creating sets.', 'Pass the desired constants.', 'Use `of`.'],
      concepts: ['EnumSet', 'factory method', 'enum collection'],
    },
    {
      id: 'java-enum-6',
      title: 'Enum in switch',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Use an enum in a switch expression.',
      skeleton: `String desc = switch (season) {
    __BLANK__ SPRING -> "Flowers bloom";
    case SUMMER -> "Sun shines";
    case AUTUMN -> "Leaves fall";
    case WINTER -> "Snow falls";
};`,
      solution: `String desc = switch (season) {
    case SPRING -> "Flowers bloom";
    case SUMMER -> "Sun shines";
    case AUTUMN -> "Leaves fall";
    case WINTER -> "Snow falls";
};`,
      hints: ['Each branch in a switch needs this keyword.', 'Enum constants do not need qualification inside switch.', 'Use `case`.'],
      concepts: ['enum switch', 'switch expression', 'pattern matching'],
    },
    {
      id: 'java-enum-7',
      title: 'HTTP Status enum',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write an HttpStatus enum with code and message fields for OK(200), NOT_FOUND(404), ERROR(500).',
      skeleton: '',
      solution: `enum HttpStatus {
    OK(200, "OK"),
    NOT_FOUND(404, "Not Found"),
    ERROR(500, "Internal Server Error");

    private final int code;
    private final String message;

    HttpStatus(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() { return code; }
    public String getMessage() { return message; }
    
    public static HttpStatus fromCode(int code) {
        for (HttpStatus s : values()) {
            if (s.code == code) return s;
        }
        throw new IllegalArgumentException("Unknown code: " + code);
    }
}`,
      hints: ['Each constant passes arguments to the constructor.', 'Add a static lookup method.', 'Iterate values() to find by code.'],
      concepts: ['enum with fields', 'constructor', 'static lookup'],
    },
    {
      id: 'java-enum-8',
      title: 'Operation enum with abstract method',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a MathOp enum with ADD, SUB, MUL, DIV where each implements apply(double, double).',
      skeleton: '',
      solution: `enum MathOp {
    ADD { @Override public double apply(double a, double b) { return a + b; } },
    SUB { @Override public double apply(double a, double b) { return a - b; } },
    MUL { @Override public double apply(double a, double b) { return a * b; } },
    DIV { @Override public double apply(double a, double b) { return a / b; } };

    public abstract double apply(double a, double b);
}`,
      hints: ['Each enum constant can have its own method body.', 'Declare an abstract method in the enum.', 'Each constant implements it in an anonymous class body.'],
      concepts: ['abstract enum method', 'constant-specific behavior'],
    },
    {
      id: 'java-enum-9',
      title: 'Enum singleton',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a thread-safe singleton using an enum.',
      skeleton: '',
      solution: `enum AppConfig {
    INSTANCE;

    private String databaseUrl = "jdbc:default";

    public String getDatabaseUrl() { return databaseUrl; }
    public void setDatabaseUrl(String url) { this.databaseUrl = url; }
}`,
      hints: ['An enum with a single constant is a thread-safe singleton.', 'Java guarantees enum constants are created once.', 'Add fields and methods as needed.'],
      concepts: ['enum singleton', 'thread safety', 'design pattern'],
    },
    {
      id: 'java-enum-10',
      title: 'Enum implementing interface',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a Priority enum implementing Comparable with LOW, MEDIUM, HIGH and a custom compareTo.',
      skeleton: '',
      solution: `enum Priority implements Comparable<Priority> {
    LOW(1), MEDIUM(2), HIGH(3);

    private final int level;

    Priority(int level) { this.level = level; }

    public int getLevel() { return level; }
}`,
      hints: ['Enums already implement Comparable using ordinal.', 'The declaration order defines natural ordering.', 'Add a level field for explicit prioritization.'],
      concepts: ['enum interface', 'Comparable', 'natural ordering'],
    },
    {
      id: 'java-enum-11',
      title: 'EnumMap configuration',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that creates an EnumMap mapping each Season to its temperature range string.',
      skeleton: '',
      solution: `enum Season { SPRING, SUMMER, AUTUMN, WINTER }

static java.util.EnumMap<Season, String> getTemperatures() {
    var map = new java.util.EnumMap<Season, String>(Season.class);
    map.put(Season.SPRING, "10-20C");
    map.put(Season.SUMMER, "25-35C");
    map.put(Season.AUTUMN, "5-15C");
    map.put(Season.WINTER, "-5-5C");
    return map;
}`,
      hints: ['EnumMap requires the enum Class as constructor argument.', 'It is more efficient than HashMap for enum keys.', 'Use put() to add entries.'],
      concepts: ['EnumMap', 'enum-based map', 'efficiency'],
    },
    {
      id: 'java-enum-12',
      title: 'State machine enum',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a TrafficLight enum with RED, YELLOW, GREEN where each has a next() method returning the next state.',
      skeleton: '',
      solution: `enum TrafficLight {
    RED {
        @Override public TrafficLight next() { return GREEN; }
        @Override public int duration() { return 30; }
    },
    YELLOW {
        @Override public TrafficLight next() { return RED; }
        @Override public int duration() { return 5; }
    },
    GREEN {
        @Override public TrafficLight next() { return YELLOW; }
        @Override public int duration() { return 25; }
    };

    public abstract TrafficLight next();
    public abstract int duration();
}`,
      hints: ['Each constant defines its own transition.', 'next() returns the following state.', 'duration() returns how long the light stays.'],
      concepts: ['state machine', 'enum methods', 'constant-specific behavior'],
    },
    {
      id: 'java-enum-13',
      title: 'Enum ordinal misuse',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the code that relies on enum ordinal for logic.',
      skeleton: `enum Size { SMALL, MEDIUM, LARGE }

double getPrice(Size size) {
    return 10.0 + size.ordinal() * 5.0;
}`,
      solution: `enum Size {
    SMALL(10.0), MEDIUM(15.0), LARGE(20.0);
    
    private final double price;
    Size(double price) { this.price = price; }
    public double getPrice() { return price; }
}

double getPrice(Size size) {
    return size.getPrice();
}`,
      hints: ['ordinal() is fragile; reordering constants breaks the logic.', 'Store the price directly in each constant.', 'Use an explicit field instead of ordinal math.'],
      concepts: ['ordinal misuse', 'enum fields', 'robust design'],
    },
    {
      id: 'java-enum-14',
      title: 'Enum valueOf with bad input',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Fix the code that crashes on invalid enum string.',
      skeleton: `enum Color { RED, GREEN, BLUE }

Color parse(String input) {
    return Color.valueOf(input.toUpperCase());
}`,
      solution: `enum Color { RED, GREEN, BLUE }

Color parse(String input) {
    try {
        return Color.valueOf(input.toUpperCase());
    } catch (IllegalArgumentException e) {
        return null;
    }
}`,
      hints: ['valueOf throws IllegalArgumentException for unknown names.', 'Wrap in try-catch or validate first.', 'Return null or a default for invalid input.'],
      concepts: ['valueOf exception', 'error handling', 'defensive parsing'],
    },
    {
      id: 'java-enum-15',
      title: 'Mutable enum field',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Fix the enum with a mutable field that could cause thread-safety issues.',
      skeleton: `enum Level {
    LOW, MEDIUM, HIGH;
    
    private int threshold;
    
    void setThreshold(int t) { this.threshold = t; }
    int getThreshold() { return threshold; }
}`,
      solution: `enum Level {
    LOW(10), MEDIUM(50), HIGH(100);
    
    private final int threshold;
    
    Level(int threshold) { this.threshold = threshold; }
    int getThreshold() { return threshold; }
}`,
      hints: ['Enum constants are shared singletons; mutable state is dangerous.', 'Make the field final.', 'Set the value via constructor.'],
      concepts: ['enum immutability', 'thread safety', 'final fields'],
    },
    {
      id: 'java-enum-16',
      title: 'Predict enum equality',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict enum comparison behavior.',
      skeleton: `enum Coin { PENNY, NICKEL, DIME, QUARTER }
Coin a = Coin.DIME;
Coin b = Coin.DIME;
System.out.println(a == b);
System.out.println(a.equals(b));`,
      solution: `true
true`,
      hints: ['Enum constants are singletons.', 'Both == and equals work correctly.', 'There is exactly one DIME instance.'],
      concepts: ['enum singleton', '== vs equals', 'reference equality'],
    },
    {
      id: 'java-enum-17',
      title: 'Predict enum ordinal',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict the ordinal values of enum constants.',
      skeleton: `enum Day { MON, TUE, WED, THU, FRI }
System.out.println(Day.MON.ordinal() + " " + Day.WED.ordinal());`,
      solution: `0 2`,
      hints: ['Ordinals start at 0.', 'MON is first (0), WED is third (2).', 'They follow declaration order.'],
      concepts: ['ordinal', 'zero-indexed', 'enum ordering'],
    },
    {
      id: 'java-enum-18',
      title: 'Predict enum name',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Predict what name() and toString() return.',
      skeleton: `enum Status { ACTIVE, INACTIVE }
System.out.println(Status.ACTIVE.name());
System.out.println(Status.ACTIVE.toString());`,
      solution: `ACTIVE
ACTIVE`,
      hints: ['name() returns the exact constant name.', 'toString() defaults to name() unless overridden.', 'Both return "ACTIVE".'],
      concepts: ['name()', 'toString()', 'enum string'],
    },
    {
      id: 'java-enum-19',
      title: 'Refactor constants to enum',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Refactor string constants to a proper enum.',
      skeleton: `class LogLevel {
    public static final String DEBUG = "DEBUG";
    public static final String INFO = "INFO";
    public static final String WARN = "WARN";
    public static final String ERROR = "ERROR";
}`,
      solution: `enum LogLevel {
    DEBUG, INFO, WARN, ERROR
}`,
      hints: ['String constants lack type safety.', 'Enums provide compile-time checking.', 'Replace the class with an enum.'],
      concepts: ['enum vs constants', 'type safety', 'refactoring'],
    },
    {
      id: 'java-enum-20',
      title: 'Refactor if-chain to enum method',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor the if-chain to use an enum with a method.',
      skeleton: `String getSymbol(String currency) {
    if (currency.equals("USD")) return "$";
    if (currency.equals("EUR")) return "E";
    if (currency.equals("GBP")) return "L";
    return "?";
}`,
      solution: `enum Currency {
    USD("$"), EUR("E"), GBP("L");
    
    private final String symbol;
    Currency(String symbol) { this.symbol = symbol; }
    public String getSymbol() { return symbol; }
}`,
      hints: ['Store the symbol in each enum constant.', 'The enum replaces both the constants and the lookup logic.', 'Access via Currency.USD.getSymbol().'],
      concepts: ['enum with data', 'eliminate if-chain', 'refactoring'],
    },
  ],
};
