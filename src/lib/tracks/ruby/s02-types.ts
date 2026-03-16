import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-types',
  title: '02. Types',
  explanation: `## Types in Ruby

Ruby is dynamically typed -- everything is an object. There are no primitive types.

\`\`\`ruby
# Numeric types
42.class        # => Integer
3.14.class      # => Float
(2/3r).class    # => Rational
(1+2i).class    # => Complex

# String and Symbol
"hello".class   # => String
:hello.class    # => Symbol

# Boolean and Nil
true.class      # => TrueClass
false.class     # => FalseClass
nil.class       # => NilClass
\`\`\`

### Type Checking

\`\`\`ruby
42.is_a?(Integer)    # => true
42.is_a?(Numeric)    # => true (Integer inherits from Numeric)
42.is_a?(String)     # => false

42.class             # => Integer
42.instance_of?(Integer)  # => true (exact class only)

# Conversion methods
"42".to_i    # => 42
"3.14".to_f  # => 3.14
42.to_s      # => "42"
42.to_f      # => 42.0
nil.to_i     # => 0
nil.to_s     # => ""
nil.to_a     # => []
\`\`\`

### Truthiness

In Ruby, only \`false\` and \`nil\` are falsy. Everything else is truthy, including \`0\` and \`""\`.`,
  exercises: [
    {
      id: 'rb-types-1',
      title: 'Check the Class of an Integer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the method that returns the class of an object.',
      skeleton: `result = 42.___
# result should be Integer`,
      solution: `result = 42.class
# result should be Integer`,
      hints: [
        'Every object in Ruby responds to a method that returns its class.',
        'The method name is .class.',
        'Write 42.class.',
      ],
      concepts: ['class-method', 'integer'],
    },
    {
      id: 'rb-types-2',
      title: 'Type Check with is_a?',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use the correct method to check if the value is a String.',
      skeleton: `"hello".___(___)\n# should return true`,
      solution: `"hello".is_a?(String)\n# should return true`,
      hints: [
        'The method checks if an object is an instance of a given class.',
        'It is called is_a? and takes a class as an argument.',
        'Write "hello".is_a?(String).',
      ],
      concepts: ['is_a?', 'type-checking'],
    },
    {
      id: 'rb-types-3',
      title: 'Convert String to Integer',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Convert the string "100" to an integer.',
      skeleton: `num = "100".___`,
      solution: `num = "100".to_i`,
      hints: [
        'Ruby conversion methods start with to_.',
        'The suffix for Integer is _i.',
        'Write "100".to_i.',
      ],
      concepts: ['type-conversion', 'to_i'],
    },
    {
      id: 'rb-types-4',
      title: 'Convert Integer to Float',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Convert the integer 7 to a Float.',
      skeleton: `result = 7.___`,
      solution: `result = 7.to_f`,
      hints: [
        'Conversion methods follow the pattern .to_X.',
        'Float conversion uses .to_f.',
        'Write 7.to_f.',
      ],
      concepts: ['type-conversion', 'to_f'],
    },
    {
      id: 'rb-types-5',
      title: 'Convert Value to String',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Convert the integer 42 to a String.',
      skeleton: `text = 42.___`,
      solution: `text = 42.to_s`,
      hints: [
        'The String conversion method is .to_s.',
        'Every Ruby object responds to .to_s.',
        'Write 42.to_s.',
      ],
      concepts: ['type-conversion', 'to_s'],
    },
    {
      id: 'rb-types-6',
      title: 'Check Exact Class with instance_of?',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Use instance_of? to check if 3.14 is exactly a Float (not just a Numeric).',
      skeleton: `result = 3.14.___(___)`,
      solution: `result = 3.14.instance_of?(Float)`,
      hints: [
        'instance_of? checks the exact class, not parent classes.',
        'Unlike is_a?, it does not return true for superclasses.',
        'Write 3.14.instance_of?(Float).',
      ],
      concepts: ['instance_of?', 'exact-type-check'],
    },
    {
      id: 'rb-types-7',
      title: 'Write a Type Descriptor',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Write a method called type_of that takes a value and returns its class name as a string. For example, type_of(42) returns "Integer".',
      skeleton: `def type_of(value)\n  # Return the class name as a string\nend`,
      solution: `def type_of(value)\n  value.class.to_s\nend`,
      hints: [
        'Use .class to get the class, then .to_s to convert to string.',
        'You can also use .class.name for the same result.',
        'value.class returns the class object, .to_s gives the name.',
      ],
      concepts: ['class-method', 'to_s', 'methods'],
    },
    {
      id: 'rb-types-8',
      title: 'Write a Safe Converter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called safe_to_i that converts a value to an integer. If the value is nil, return 0. If it is a String, use .to_i. If it is already an Integer, return it as-is. For anything else, return nil.',
      skeleton: `def safe_to_i(value)\n  # Convert safely to integer\nend`,
      solution: `def safe_to_i(value)\n  if value.nil?\n    0\n  elsif value.is_a?(String)\n    value.to_i\n  elsif value.is_a?(Integer)\n    value\n  else\n    nil\n  end\nend`,
      hints: [
        'Use .nil? to check for nil, .is_a? for type checks.',
        'Handle each case with if/elsif/else.',
        'String#to_i converts "123" to 123 and "abc" to 0.',
      ],
      concepts: ['type-checking', 'nil', 'conditional-logic'],
    },
    {
      id: 'rb-types-9',
      title: 'Write a Truthiness Checker',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called truthy? that returns true if the value is truthy in Ruby, and false otherwise. Remember: only false and nil are falsy in Ruby.',
      skeleton: `def truthy?(value)\n  # Return true if the value is truthy, false otherwise\nend`,
      solution: `def truthy?(value)\n  !!value\nend`,
      hints: [
        'In Ruby, only false and nil are falsy.',
        'Double negation !! converts any value to its boolean equivalent.',
        'You could also use value ? true : false.',
      ],
      concepts: ['truthiness', 'boolean-conversion'],
    },
    {
      id: 'rb-types-10',
      title: 'Write a Numeric Type Classifier',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called classify_number that takes a value and returns :integer if it is an Integer, :float if it is a Float, :numeric if it is any other Numeric, or :not_a_number otherwise.',
      skeleton: `def classify_number(value)\n  # Return :integer, :float, :numeric, or :not_a_number\nend`,
      solution: `def classify_number(value)\n  if value.is_a?(Integer)\n    :integer\n  elsif value.is_a?(Float)\n    :float\n  elsif value.is_a?(Numeric)\n    :numeric\n  else\n    :not_a_number\n  end\nend`,
      hints: [
        'Check the most specific types first (Integer, Float) before Numeric.',
        'Integer and Float are subclasses of Numeric.',
        'Use is_a? for each check, returning the appropriate symbol.',
      ],
      concepts: ['type-checking', 'symbols', 'class-hierarchy'],
    },
    {
      id: 'rb-types-11',
      title: 'Write a Multi-Type Converter',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a method called convert that takes a value and a target type symbol (:string, :integer, or :float) and converts the value accordingly. Return nil for unknown target types.',
      skeleton: `def convert(value, target)\n  # Convert value to the target type\nend`,
      solution: `def convert(value, target)\n  case target\n  when :string\n    value.to_s\n  when :integer\n    value.to_i\n  when :float\n    value.to_f\n  else\n    nil\n  end\nend`,
      hints: [
        'Use a case/when statement to handle each target type.',
        'Call .to_s, .to_i, or .to_f based on the target symbol.',
        'Return nil as the default case.',
      ],
      concepts: ['type-conversion', 'case-when', 'symbols'],
    },
    {
      id: 'rb-types-12',
      title: 'Fix the Type Comparison Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the bug: the code tries to compare a string with an integer. Make both the same type before comparing.',
      skeleton: `user_input = "42"\nthreshold = 50\n\nif user_input > threshold\n  puts "Over threshold"\nelse\n  puts "Under threshold"\nend`,
      solution: `user_input = "42"\nthreshold = 50\n\nif user_input.to_i > threshold\n  puts "Over threshold"\nelse\n  puts "Under threshold"\nend`,
      hints: [
        'You cannot compare a String directly with an Integer.',
        'Convert the string to an integer using .to_i.',
        'Add .to_i to user_input before the comparison.',
      ],
      concepts: ['type-conversion', 'comparison', 'string-to-integer'],
    },
    {
      id: 'rb-types-13',
      title: 'Fix the Nil Method Call Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the NoMethodError that occurs when calling .upcase on a nil value.',
      skeleton: `def greet(name)\n  puts "Hello, " + name.upcase\nend\n\ngreet(nil)`,
      solution: `def greet(name)\n  puts "Hello, " + name.to_s.upcase\nend\n\ngreet(nil)`,
      hints: [
        'nil does not have an .upcase method.',
        'Convert nil to a string first with .to_s (nil.to_s returns "").',
        'Chain .to_s before .upcase to handle nil safely.',
      ],
      concepts: ['nil-safety', 'method-chaining', 'to_s'],
    },
    {
      id: 'rb-types-14',
      title: 'Fix the Symbol vs String Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the bug: the comparison fails because one side is a Symbol and the other is a String.',
      skeleton: `status = :active\n\nif status == "active"\n  puts "User is active"\nelse\n  puts "User is not active"\nend`,
      solution: `status = :active\n\nif status == :active\n  puts "User is active"\nelse\n  puts "User is not active"\nend`,
      hints: [
        ':active (Symbol) and "active" (String) are not equal.',
        'Compare symbol to symbol or convert one to match the other.',
        'Change "active" to :active in the comparison.',
      ],
      concepts: ['symbols', 'strings', 'equality'],
    },
    {
      id: 'rb-types-15',
      title: 'Predict nil Conversion Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Predict the output of converting nil to various types.',
      skeleton: `puts nil.to_i\nputs nil.to_f\nputs nil.to_s.inspect\nputs nil.to_a.inspect`,
      solution: `0\n0.0\n""\n[]`,
      hints: [
        'nil.to_i returns 0.',
        'nil.to_f returns 0.0, nil.to_s returns an empty string.',
        'nil.to_a returns an empty array.',
      ],
      concepts: ['nil-conversion', 'to_i', 'to_f', 'to_s', 'to_a'],
    },
    {
      id: 'rb-types-16',
      title: 'Predict Truthiness Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output. Remember Ruby truthiness rules.',
      skeleton: `puts !!0\nputs !!""\nputs !!nil\nputs !!false\nputs !![]`,
      solution: `true\ntrue\nfalse\nfalse\ntrue`,
      hints: [
        'In Ruby, ONLY nil and false are falsy.',
        '0, "", and [] are all truthy in Ruby (unlike some other languages).',
        '!! double-negates to produce a boolean.',
      ],
      concepts: ['truthiness', 'boolean-conversion'],
    },
    {
      id: 'rb-types-17',
      title: 'Predict is_a? vs instance_of?',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output. Understand the difference between is_a? and instance_of?.',
      skeleton: `puts 42.is_a?(Integer)\nputs 42.is_a?(Numeric)\nputs 42.instance_of?(Integer)\nputs 42.instance_of?(Numeric)`,
      solution: `true\ntrue\ntrue\nfalse`,
      hints: [
        'is_a? returns true for the class and all its ancestors.',
        'instance_of? returns true only for the exact class.',
        'Integer inherits from Numeric, so is_a?(Numeric) is true but instance_of?(Numeric) is false.',
      ],
      concepts: ['is_a?', 'instance_of?', 'class-hierarchy'],
    },
    {
      id: 'rb-types-18',
      title: 'Refactor Type Checks to case/when',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the if/elsif chain into a case/when statement using class matching.',
      skeleton: `def describe(value)\n  if value.is_a?(String)\n    "a string"\n  elsif value.is_a?(Integer)\n    "an integer"\n  elsif value.is_a?(Float)\n    "a float"\n  elsif value.is_a?(Array)\n    "an array"\n  else\n    "something else"\n  end\nend`,
      solution: `def describe(value)\n  case value\n  when String\n    "a string"\n  when Integer\n    "an integer"\n  when Float\n    "a float"\n  when Array\n    "an array"\n  else\n    "something else"\n  end\nend`,
      hints: [
        'case/when uses === under the hood, which classes define for type checking.',
        'String === "hello" returns true, so case/when works with classes.',
        'Replace each is_a? check with a when clause using the class name.',
      ],
      concepts: ['case-when', 'triple-equals', 'refactoring'],
    },
    {
      id: 'rb-types-19',
      title: 'Refactor Explicit Nil Checks',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor the explicit nil comparison to use the idiomatic .nil? method.',
      skeleton: `def process(value)\n  if value == nil\n    "no value"\n  else\n    "got: \#{value}"\n  end\nend`,
      solution: `def process(value)\n  if value.nil?\n    "no value"\n  else\n    "got: \#{value}"\n  end\nend`,
      hints: [
        'Ruby provides the .nil? method for nil checks.',
        'value.nil? is more idiomatic than value == nil.',
        'Replace == nil with .nil?.',
      ],
      concepts: ['nil?', 'idiomatic-ruby', 'refactoring'],
    },
    {
      id: 'rb-types-20',
      title: 'Write a Deep Type Inspector',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a method called type_info that takes a value and returns a hash with :class (class name as string), :ancestors (array of ancestor class names), and :frozen (boolean).',
      skeleton: `def type_info(value)\n  # Return hash with :class, :ancestors, :frozen\nend`,
      solution: `def type_info(value)\n  {\n    class: value.class.to_s,\n    ancestors: value.class.ancestors.map(&:to_s),\n    frozen: value.frozen?\n  }\nend`,
      hints: [
        'Use value.class.to_s for the class name.',
        'Use value.class.ancestors.map(&:to_s) for ancestor names.',
        'Use value.frozen? to check if the object is frozen.',
      ],
      concepts: ['class-method', 'ancestors', 'frozen?', 'introspection'],
    },
  ],
};
