import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-modules',
  title: '38. Modules',
  explanation: `## Modules in Java

The **Java Platform Module System (JPMS)**, introduced in Java 9, provides a way to organize code into self-describing, reusable modules with explicit dependencies and strong encapsulation.

### module-info.java

Every module has a \`module-info.java\` descriptor at its root:

\`\`\`java
module com.myapp.core {
    requires java.sql;
    exports com.myapp.core.api;
    opens com.myapp.core.model to com.fasterxml.jackson.databind;
    provides com.myapp.core.spi.Plugin with com.myapp.core.impl.DefaultPlugin;
    uses com.myapp.core.spi.Plugin;
}
\`\`\`

### Key Directives

- **requires** - declares a dependency on another module
- **requires transitive** - any module that reads this module also reads the transitive dependency
- **exports** - makes a package available to other modules
- **exports ... to** - qualified export to specific modules only
- **opens** - allows deep reflection on a package at runtime
- **provides ... with** - declares a service implementation
- **uses** - declares consumption of a service

### Service Loading

JPMS integrates with \`ServiceLoader\` for decoupled plugin architectures:

\`\`\`java
ServiceLoader<Plugin> plugins = ServiceLoader.load(Plugin.class);
for (Plugin p : plugins) {
    p.execute();
}
\`\`\`

### Module Layers

Module layers allow dynamic module configurations at runtime, enabling plugin systems and hot-reloading architectures. The boot layer contains all modules resolved at startup.`,
  exercises: [
    {
      id: 'java-modules-1',
      title: 'Basic Module Declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Declare a simple module named com.app.utils.',
      skeleton: `__BLANK__ com.app.utils {
}`,
      solution: `module com.app.utils {
}`,
      hints: [
        'A module descriptor starts with a keyword that identifies it as a module.',
        'The keyword is the same word used to describe the concept: "module".',
        'Use: module com.app.utils { }',
      ],
      concepts: ['module-info', 'jpms-basics'],
    },
    {
      id: 'java-modules-2',
      title: 'Requiring a Module',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Declare a dependency on the java.sql module.',
      skeleton: `module com.app.data {
    __BLANK__ java.sql;
}`,
      solution: `module com.app.data {
    requires java.sql;
}`,
      hints: [
        'You need a directive that declares this module depends on another.',
        'The directive keyword means "needs" or "depends on".',
        'Use: requires java.sql;',
      ],
      concepts: ['requires-directive', 'module-dependencies'],
    },
    {
      id: 'java-modules-3',
      title: 'Exporting a Package',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Export the com.app.api package so other modules can access it.',
      skeleton: `module com.app.core {
    __BLANK__ com.app.api;
}`,
      solution: `module com.app.core {
    exports com.app.api;
}`,
      hints: [
        'You need to make a package visible to other modules.',
        'The directive makes a package publicly accessible.',
        'Use: exports com.app.api;',
      ],
      concepts: ['exports-directive', 'encapsulation'],
    },
    {
      id: 'java-modules-4',
      title: 'Transitive Dependency',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Require java.logging transitively so downstream modules also get access.',
      skeleton: `module com.app.framework {
    requires __BLANK__ java.logging;
    exports com.app.framework.api;
}`,
      solution: `module com.app.framework {
    requires transitive java.logging;
    exports com.app.framework.api;
}`,
      hints: [
        'A modifier after "requires" propagates the dependency to consumers.',
        'The modifier means the dependency passes through to reading modules.',
        'Use: requires transitive java.logging;',
      ],
      concepts: ['requires-transitive', 'implied-readability'],
    },
    {
      id: 'java-modules-5',
      title: 'Qualified Export',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Export com.app.internal only to the com.app.tests module.',
      skeleton: `module com.app.core {
    exports com.app.api;
    exports com.app.internal __BLANK__ com.app.tests;
}`,
      solution: `module com.app.core {
    exports com.app.api;
    exports com.app.internal to com.app.tests;
}`,
      hints: [
        'Qualified exports restrict visibility to specific modules.',
        'A small keyword connects the package name to the target module.',
        'Use: exports com.app.internal to com.app.tests;',
      ],
      concepts: ['qualified-exports', 'encapsulation'],
    },
    {
      id: 'java-modules-6',
      title: 'Opens for Reflection',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Open com.app.model for deep reflection by all modules.',
      skeleton: `module com.app.core {
    exports com.app.api;
    __BLANK__ com.app.model;
}`,
      solution: `module com.app.core {
    exports com.app.api;
    opens com.app.model;
}`,
      hints: [
        'There is a directive that allows runtime reflective access.',
        'It is different from exports because it permits deep reflection.',
        'Use: opens com.app.model;',
      ],
      concepts: ['opens-directive', 'reflection'],
    },
    {
      id: 'java-modules-7',
      title: 'Write a Complete Module Descriptor',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a module-info.java for com.shop.inventory that requires java.sql and exports com.shop.inventory.api.',
      skeleton: `// Write the complete module-info.java`,
      solution: `module com.shop.inventory {
    requires java.sql;
    exports com.shop.inventory.api;
}`,
      hints: [
        'Start with the module keyword and the module name.',
        'Add a requires directive for java.sql.',
        'Add an exports directive for the api package.',
      ],
      concepts: ['module-info', 'requires-directive', 'exports-directive'],
    },
    {
      id: 'java-modules-8',
      title: 'Write a Service Provider Module',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a module-info.java for com.plugins.json that requires com.app.spi and provides com.app.spi.Parser with com.plugins.json.JsonParser.',
      skeleton: `// Write the complete module-info.java for a service provider module`,
      solution: `module com.plugins.json {
    requires com.app.spi;
    provides com.app.spi.Parser with com.plugins.json.JsonParser;
}`,
      hints: [
        'The module needs to declare its dependency on the SPI module.',
        'Use the provides...with directive to register the implementation.',
        'provides com.app.spi.Parser with com.plugins.json.JsonParser;',
      ],
      concepts: ['provides-with', 'service-provider', 'spi'],
    },
    {
      id: 'java-modules-9',
      title: 'Write a Service Consumer Module',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a module-info.java for com.app.engine that requires com.app.spi, uses com.app.spi.Parser, and exports com.app.engine.api.',
      skeleton: `// Write the module-info.java for a service consumer module`,
      solution: `module com.app.engine {
    requires com.app.spi;
    uses com.app.spi.Parser;
    exports com.app.engine.api;
}`,
      hints: [
        'The module depends on the SPI module for the interface definition.',
        'The "uses" directive declares which service this module consumes.',
        'Combine requires, uses, and exports directives.',
      ],
      concepts: ['uses-directive', 'service-loader', 'module-dependencies'],
    },
    {
      id: 'java-modules-10',
      title: 'ServiceLoader Usage',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a method that uses ServiceLoader to load all implementations of a Plugin interface and calls execute() on each.',
      skeleton: `import java.util.ServiceLoader;

public class PluginManager {
    // Write: public void runAll()
    // Load all Plugin implementations via ServiceLoader
    // Call execute() on each one
}`,
      solution: `import java.util.ServiceLoader;

public class PluginManager {
    public void runAll() {
        ServiceLoader<Plugin> loader = ServiceLoader.load(Plugin.class);
        for (Plugin plugin : loader) {
            plugin.execute();
        }
    }
}`,
      hints: [
        'ServiceLoader.load(Plugin.class) returns a ServiceLoader iterable.',
        'You can iterate over the ServiceLoader with a for-each loop.',
        'Call plugin.execute() inside the loop.',
      ],
      concepts: ['service-loader', 'plugin-architecture'],
    },
    {
      id: 'java-modules-11',
      title: 'Lazy ServiceLoader with Stream',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a method that uses ServiceLoader.stream() to find the first available Plugin whose name is "json".',
      skeleton: `import java.util.ServiceLoader;
import java.util.Optional;

public class PluginFinder {
    // Write: public Optional<Plugin> findJsonPlugin()
    // Use ServiceLoader.stream() and filter by plugin.getName().equals("json")
}`,
      solution: `import java.util.ServiceLoader;
import java.util.Optional;

public class PluginFinder {
    public Optional<Plugin> findJsonPlugin() {
        return ServiceLoader.load(Plugin.class)
            .stream()
            .map(ServiceLoader.Provider::get)
            .filter(p -> p.getName().equals("json"))
            .findFirst();
    }
}`,
      hints: [
        'ServiceLoader.load(Plugin.class).stream() gives a Stream of Provider objects.',
        'Map each Provider to its instance with Provider::get, then filter.',
        'Use findFirst() to return an Optional<Plugin>.',
      ],
      concepts: ['service-loader-stream', 'optional', 'streams'],
    },
    {
      id: 'java-modules-12',
      title: 'Write Module with Multiple Directives',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a module-info.java for com.app.web that: requires transitive com.app.core, requires java.net.http, exports com.app.web.api, opens com.app.web.dto to com.fasterxml.jackson.databind, and uses com.app.core.spi.Renderer.',
      skeleton: `// Write the complete module-info.java with all five directives`,
      solution: `module com.app.web {
    requires transitive com.app.core;
    requires java.net.http;
    exports com.app.web.api;
    opens com.app.web.dto to com.fasterxml.jackson.databind;
    uses com.app.core.spi.Renderer;
}`,
      hints: [
        'Start with the module declaration and list each directive.',
        'requires transitive propagates com.app.core to consumers.',
        'opens...to restricts reflective access to a specific module.',
      ],
      concepts: ['requires-transitive', 'qualified-opens', 'uses-directive'],
    },
    {
      id: 'java-modules-13',
      title: 'Fix Missing Requires',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'The module uses java.sql.Connection but does not require the java.sql module. Fix the module descriptor.',
      skeleton: `module com.app.data {
    exports com.app.data.api;
}

// In com.app.data.impl.DatabaseManager:
// import java.sql.Connection;  // compile error: package java.sql is not visible`,
      solution: `module com.app.data {
    requires java.sql;
    exports com.app.data.api;
}`,
      hints: [
        'The module uses types from java.sql but has not declared that dependency.',
        'Add the missing requires directive.',
        'Add: requires java.sql; inside the module block.',
      ],
      concepts: ['requires-directive', 'module-resolution'],
    },
    {
      id: 'java-modules-14',
      title: 'Fix Inaccessible Package',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Module com.app.ui cannot access com.app.core.utils.StringHelper. Fix the core module to export that package.',
      skeleton: `// com.app.core module-info.java
module com.app.core {
    exports com.app.core.api;
    // com.app.core.utils is NOT exported
}

// com.app.ui module-info.java
module com.app.ui {
    requires com.app.core;
    // Error: package com.app.core.utils is not accessible
}`,
      solution: `// com.app.core module-info.java
module com.app.core {
    exports com.app.core.api;
    exports com.app.core.utils;
}

// com.app.ui module-info.java
module com.app.ui {
    requires com.app.core;
}`,
      hints: [
        'The utils package is not exported from com.app.core.',
        'Add an exports directive for the missing package.',
        'Add: exports com.app.core.utils; to the core module.',
      ],
      concepts: ['exports-directive', 'strong-encapsulation'],
    },
    {
      id: 'java-modules-15',
      title: 'Fix Reflection Access Error',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Jackson cannot deserialize com.app.core.model.User because the package is not open for reflection. Fix it.',
      skeleton: `module com.app.core {
    exports com.app.core.api;
    exports com.app.core.model;
    // Jackson fails: Unable to make field private String com.app.core.model.User.name accessible
}`,
      solution: `module com.app.core {
    exports com.app.core.api;
    exports com.app.core.model;
    opens com.app.core.model;
}`,
      hints: [
        'Exporting a package allows compile-time access but not deep reflection.',
        'Jackson needs reflective access to private fields.',
        'Add: opens com.app.core.model; to allow reflection.',
      ],
      concepts: ['opens-directive', 'reflection', 'serialization'],
    },
    {
      id: 'java-modules-16',
      title: 'Predict Module Resolution Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'What happens when you compile this module-info.java if module com.utils does not exist?',
      skeleton: `module com.app.main {
    requires com.utils;
    exports com.app.main.api;
}
// Compile with: javac module-info.java
// What error do you get?`,
      solution: `module not found: com.utils`,
      hints: [
        'The module declares a dependency on com.utils.',
        'If the required module is not on the module path, compilation fails.',
        'The compiler reports that the required module is not found.',
      ],
      concepts: ['module-resolution', 'compilation-errors'],
    },
    {
      id: 'java-modules-17',
      title: 'Predict Requires Transitive Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Can module C access classes from module A given the following setup?',
      skeleton: `// Module A
module a {
    exports a.api;
}

// Module B
module b {
    requires transitive a;
    exports b.api;
}

// Module C
module c {
    requires b;
    // Can code in module c use classes from a.api?
}
// Answer: yes or no`,
      solution: `yes`,
      hints: [
        'Module B declares "requires transitive a".',
        'Transitive means any module that reads B also reads A.',
        'Module C requires B, so it implicitly reads A as well.',
      ],
      concepts: ['requires-transitive', 'implied-readability'],
    },
    {
      id: 'java-modules-18',
      title: 'Predict Qualified Export Access',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Can module com.app.web access com.app.core.internal given this setup?',
      skeleton: `module com.app.core {
    exports com.app.core.api;
    exports com.app.core.internal to com.app.tests;
}

module com.app.web {
    requires com.app.core;
    // Can com.app.web use types from com.app.core.internal?
}
// Answer: yes or no`,
      solution: `no`,
      hints: [
        'The internal package is exported with a qualified "to" clause.',
        'Only the specified module can access qualified exports.',
        'com.app.web is not listed in the "to" clause.',
      ],
      concepts: ['qualified-exports', 'encapsulation'],
    },
    {
      id: 'java-modules-19',
      title: 'Refactor to Modular Architecture',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor a monolithic application into three modules: api, impl, and app, with proper dependency declarations.',
      skeleton: `// Currently everything is in one unnamed module:
// package com.shop.api;      -> public interfaces
// package com.shop.impl;     -> implementations (uses java.sql)
// package com.shop.app;     -> main class (uses both api and impl)
// package com.shop.internal; -> internal utilities (should not be exposed)

// Write three module-info.java files:
// 1. com.shop.api module
// 2. com.shop.impl module
// 3. com.shop.app module`,
      solution: `// com.shop.api/module-info.java
module com.shop.api {
    exports com.shop.api;
}

// com.shop.impl/module-info.java
module com.shop.impl {
    requires com.shop.api;
    requires java.sql;
    exports com.shop.impl;
}

// com.shop.app/module-info.java
module com.shop.app {
    requires com.shop.api;
    requires com.shop.impl;
}`,
      hints: [
        'The api module only exports its package, no dependencies needed.',
        'The impl module depends on api and java.sql, exports its own package.',
        'The app module depends on both api and impl.',
      ],
      concepts: ['modular-architecture', 'separation-of-concerns'],
    },
    {
      id: 'java-modules-20',
      title: 'Refactor to Service-Based Module Design',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor tightly coupled modules to use the ServiceLoader pattern, decoupling the consumer from the provider.',
      skeleton: `// BEFORE: com.app.engine directly depends on com.app.json
module com.app.json {
    exports com.app.json;
}

module com.app.engine {
    requires com.app.json;
}

// Class in engine directly instantiates:
// JsonParser parser = new JsonParser();

// Refactor so engine depends on an SPI module and json is a provider.
// 1. Create com.app.spi module with a Parser interface
// 2. Modify com.app.json to provide the service
// 3. Modify com.app.engine to use the service`,
      solution: `// com.app.spi/module-info.java
module com.app.spi {
    exports com.app.spi;
}

// com.app.spi/com/app/spi/Parser.java
// public interface Parser { Object parse(String input); }

// com.app.json/module-info.java
module com.app.json {
    requires com.app.spi;
    provides com.app.spi.Parser with com.app.json.JsonParser;
}

// com.app.engine/module-info.java
module com.app.engine {
    requires com.app.spi;
    uses com.app.spi.Parser;
}

// Engine now loads via ServiceLoader:
// ServiceLoader<Parser> parsers = ServiceLoader.load(Parser.class);`,
      hints: [
        'Create an SPI module that only contains the interface.',
        'The json module provides the implementation via provides...with.',
        'The engine module uses the service and loads it via ServiceLoader.',
      ],
      concepts: ['service-loader', 'decoupling', 'spi-pattern'],
    },
  ],
};
