import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-rspec',
  title: '27. RSpec',
  explanation: `## RSpec in Ruby

RSpec is a behavior-driven development (BDD) testing framework for Ruby with expressive, readable syntax.

### Basic Structure

\`\`\`ruby
RSpec.describe Calculator do
  describe "#add" do
    it "returns the sum of two numbers" do
      calc = Calculator.new
      expect(calc.add(2, 3)).to eq(5)
    end
  end
end
\`\`\`

### Matchers

\`\`\`ruby
expect(value).to eq(expected)        # equality
expect(value).to be > 5              # comparisons
expect(value).to be_nil              # nil check
expect(value).to be_truthy           # truthy
expect(arr).to include(3)            # inclusion
expect(str).to match(/pattern/)      # regex
expect { code }.to raise_error(Err)  # exceptions
expect(obj).to respond_to(:method)   # duck typing
\`\`\`

### let and before

\`\`\`ruby
RSpec.describe User do
  let(:user) { User.new("Alice") }         # lazy, memoized
  let!(:eager) { create_something }         # evaluated immediately

  before(:each) { setup_database }
  after(:each) { cleanup }

  before(:all) { expensive_setup }          # once per group
end
\`\`\`

### Shared Examples

\`\`\`ruby
RSpec.shared_examples "a collection" do
  it "responds to size" do
    expect(subject).to respond_to(:size)
  end
end

RSpec.describe Array do
  it_behaves_like "a collection"
end
\`\`\`

### Mocking and Stubbing

\`\`\`ruby
# Doubles
dbl = double("logger", log: nil)

# Method stubs
allow(obj).to receive(:method).and_return(value)

# Message expectations
expect(obj).to receive(:method).with(args).once
\`\`\``,
  exercises: [
    {
      id: 'rb-rspec-1',
      title: 'Basic Expect Syntax',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Complete the RSpec expectation.',
      skeleton: `RSpec.describe "addition" do
  it "adds two numbers" do
    ___(2 + 3).to eq(5)
  end
end`,
      solution: `RSpec.describe "addition" do
  it "adds two numbers" do
    expect(2 + 3).to eq(5)
  end
end`,
      hints: ['RSpec uses expect() for assertions', 'expect(value).to matcher', 'The keyword is expect'],
      concepts: ['expect', 'eq'],
    },
    {
      id: 'rb-rspec-2',
      title: 'Using let',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use let to define a lazy helper.',
      skeleton: `RSpec.describe "string" do
  ___(greeting) { "Hello, World!" }

  it "has correct length" do
    expect(greeting.length).to eq(13)
  end
end`,
      solution: `RSpec.describe "string" do
  let(:greeting) { "Hello, World!" }

  it "has correct length" do
    expect(greeting.length).to eq(13)
  end
end`,
      hints: ['let defines a memoized helper method', 'Syntax: let(:name) { value }', 'let is lazy - only evaluated when called'],
      concepts: ['let'],
    },
    {
      id: 'rb-rspec-3',
      title: 'Negative Matcher',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use the negative expectation form.',
      skeleton: `RSpec.describe Array do
  it "is not empty after push" do
    arr = [1]
    expect(arr).___ be_empty
  end
end`,
      solution: `RSpec.describe Array do
  it "is not empty after push" do
    arr = [1]
    expect(arr).not_to be_empty
  end
end`,
      hints: ['The opposite of .to is .not_to', 'not_to negates the matcher', 'expect(val).not_to matcher'],
      concepts: ['not_to'],
    },
    {
      id: 'rb-rspec-4',
      title: 'Before Hook',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Set up test state using a before hook.',
      skeleton: `RSpec.describe "counter" do
  ___(:each) do
    @count = 0
  end

  it "starts at zero" do
    expect(@count).to eq(0)
  end
end`,
      solution: `RSpec.describe "counter" do
  before(:each) do
    @count = 0
  end

  it "starts at zero" do
    expect(@count).to eq(0)
  end
end`,
      hints: ['before(:each) runs before each example', 'You can also write just before do', ':each is the default scope'],
      concepts: ['before'],
    },
    {
      id: 'rb-rspec-5',
      title: 'Raise Error Matcher',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Test that code raises an error.',
      skeleton: `RSpec.describe "division" do
  it "raises on divide by zero" do
    expect { 1 / 0 }.___ ___(ZeroDivisionError)
  end
end`,
      solution: `RSpec.describe "division" do
  it "raises on divide by zero" do
    expect { 1 / 0 }.to raise_error(ZeroDivisionError)
  end
end`,
      hints: ['Use a block form: expect { ... }', 'The matcher is raise_error', 'Pass the exception class as argument'],
      concepts: ['raise_error'],
    },
    {
      id: 'rb-rspec-6',
      title: 'Include Matcher',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use include matcher to check collection membership.',
      skeleton: `RSpec.describe "fruits" do
  let(:fruits) { ["apple", "banana", "cherry"] }

  it "includes banana" do
    expect(fruits).to ___ "banana"
  end
end`,
      solution: `RSpec.describe "fruits" do
  let(:fruits) { ["apple", "banana", "cherry"] }

  it "includes banana" do
    expect(fruits).to include("banana")
  end
end`,
      hints: ['The include matcher checks for membership', 'Works with arrays, strings, and hashes', 'include("value")'],
      concepts: ['include_matcher'],
    },
    {
      id: 'rb-rspec-7',
      title: 'Write RSpec for a Class',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write RSpec tests for a BankAccount class.',
      skeleton: `class BankAccount
  attr_reader :balance

  def initialize(balance = 0)
    @balance = balance
  end

  def deposit(amount)
    raise ArgumentError, "negative" if amount < 0
    @balance += amount
  end

  def withdraw(amount)
    raise "Insufficient funds" if amount > @balance
    @balance -= amount
  end
end

# Write RSpec.describe BankAccount with:
# - describe "#deposit" with test for adding money and raising on negative
# - describe "#withdraw" with test for subtracting and raising on overdraft
`,
      solution: `class BankAccount
  attr_reader :balance

  def initialize(balance = 0)
    @balance = balance
  end

  def deposit(amount)
    raise ArgumentError, "negative" if amount < 0
    @balance += amount
  end

  def withdraw(amount)
    raise "Insufficient funds" if amount > @balance
    @balance -= amount
  end
end

RSpec.describe BankAccount do
  let(:account) { BankAccount.new(100) }

  describe "#deposit" do
    it "increases the balance" do
      account.deposit(50)
      expect(account.balance).to eq(150)
    end

    it "raises on negative amount" do
      expect { account.deposit(-10) }.to raise_error(ArgumentError)
    end
  end

  describe "#withdraw" do
    it "decreases the balance" do
      account.withdraw(30)
      expect(account.balance).to eq(70)
    end

    it "raises on insufficient funds" do
      expect { account.withdraw(200) }.to raise_error(RuntimeError, "Insufficient funds")
    end
  end
end`,
      hints: ['Use let to create a test account', 'Group related tests with describe "#method_name"', 'Use raise_error with class and message'],
      concepts: ['describe', 'let', 'raise_error'],
    },
    {
      id: 'rb-rspec-8',
      title: 'Write Shared Examples',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write shared examples for objects that behave like a container.',
      skeleton: `# Write shared_examples "a container" that tests:
# - responds to :size
# - responds to :empty?
# - responds to :include?
# Then use it_behaves_like in describe blocks for Array and Hash
`,
      solution: `RSpec.shared_examples "a container" do
  it "responds to size" do
    expect(subject).to respond_to(:size)
  end

  it "responds to empty?" do
    expect(subject).to respond_to(:empty?)
  end

  it "responds to include?" do
    expect(subject).to respond_to(:include?)
  end
end

RSpec.describe Array do
  subject { [1, 2, 3] }
  it_behaves_like "a container"
end

RSpec.describe Hash do
  subject { { a: 1 } }
  it_behaves_like "a container"
end`,
      hints: ['RSpec.shared_examples defines reusable test groups', 'subject defines the object under test', 'it_behaves_like includes the shared examples'],
      concepts: ['shared_examples', 'subject', 'it_behaves_like'],
    },
    {
      id: 'rb-rspec-9',
      title: 'Write Tests with Doubles',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write tests using RSpec doubles and message expectations.',
      skeleton: `class Notifier
  def initialize(mailer)
    @mailer = mailer
  end

  def notify(user, message)
    @mailer.send_email(user.email, message)
  end
end

# Write RSpec tests for Notifier
# Use doubles for mailer and user
# Verify that send_email is called with correct arguments
`,
      solution: `class Notifier
  def initialize(mailer)
    @mailer = mailer
  end

  def notify(user, message)
    @mailer.send_email(user.email, message)
  end
end

RSpec.describe Notifier do
  let(:mailer) { double("mailer") }
  let(:user) { double("user", email: "alice@example.com") }
  let(:notifier) { Notifier.new(mailer) }

  it "sends email to the user" do
    expect(mailer).to receive(:send_email).with("alice@example.com", "Hello!")
    notifier.notify(user, "Hello!")
  end
end`,
      hints: ['double("name", method: value) creates a test double', 'expect(obj).to receive(:method) sets a message expectation', 'Use .with() to verify arguments'],
      concepts: ['double', 'receive', 'message_expectations'],
    },
    {
      id: 'rb-rspec-10',
      title: 'Write Context Blocks',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write well-organized specs using context blocks.',
      skeleton: `class Discount
  def calculate(price, member:)
    if member
      price * 0.8
    else
      price
    end
  end
end

# Write RSpec tests with context blocks:
# context "when member" -> 20% discount
# context "when not member" -> full price
`,
      solution: `class Discount
  def calculate(price, member:)
    if member
      price * 0.8
    else
      price
    end
  end
end

RSpec.describe Discount do
  let(:discount) { Discount.new }

  describe "#calculate" do
    context "when member" do
      it "applies 20% discount" do
        expect(discount.calculate(100, member: true)).to eq(80.0)
      end
    end

    context "when not member" do
      it "returns full price" do
        expect(discount.calculate(100, member: false)).to eq(100)
      end
    end
  end
end`,
      hints: ['context groups examples under a specific condition', 'Convention: context descriptions start with "when" or "with"', 'Nest context inside describe for the method'],
      concepts: ['context', 'describe', 'organization'],
    },
    {
      id: 'rb-rspec-11',
      title: 'Write Allow Stubs',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Use allow to stub methods without expectations.',
      skeleton: `class WeatherService
  def initialize(api)
    @api = api
  end

  def forecast
    data = @api.fetch_weather
    if data[:temp] > 30
      "Hot"
    else
      "Mild"
    end
  end
end

# Write tests using allow to stub the api
# Test both "Hot" and "Mild" outcomes
`,
      solution: `class WeatherService
  def initialize(api)
    @api = api
  end

  def forecast
    data = @api.fetch_weather
    if data[:temp] > 30
      "Hot"
    else
      "Mild"
    end
  end
end

RSpec.describe WeatherService do
  let(:api) { double("api") }
  let(:service) { WeatherService.new(api) }

  context "when temperature is above 30" do
    before do
      allow(api).to receive(:fetch_weather).and_return({ temp: 35 })
    end

    it "returns Hot" do
      expect(service.forecast).to eq("Hot")
    end
  end

  context "when temperature is 30 or below" do
    before do
      allow(api).to receive(:fetch_weather).and_return({ temp: 20 })
    end

    it "returns Mild" do
      expect(service.forecast).to eq("Mild")
    end
  end
end`,
      hints: ['allow(obj).to receive(:method).and_return(value) stubs without expectations', 'Use before to set up stubs for a context', 'allow is for stubs, expect...to receive is for message expectations'],
      concepts: ['allow', 'and_return', 'stubbing'],
    },
    {
      id: 'rb-rspec-12',
      title: 'Write Subject Tests',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Use subject and named subject in RSpec.',
      skeleton: `# Write RSpec tests for Array using subject:
# - named subject(:numbers) { [5, 3, 1, 4, 2] }
# - it "has 5 elements"
# - it "can be sorted"
# - it { is_expected.to include(3) } (one-liner)
`,
      solution: `RSpec.describe Array do
  subject(:numbers) { [5, 3, 1, 4, 2] }

  it "has 5 elements" do
    expect(numbers.size).to eq(5)
  end

  it "can be sorted" do
    expect(numbers.sort).to eq([1, 2, 3, 4, 5])
  end

  it { is_expected.to include(3) }
end`,
      hints: ['subject(:name) { value } creates a named subject', 'is_expected is shorthand for expect(subject)', 'One-liner syntax: it { is_expected.to matcher }'],
      concepts: ['subject', 'is_expected', 'one_liner'],
    },
    {
      id: 'rb-rspec-13',
      title: 'Fix Wrong Matcher',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the incorrect matcher usage.',
      skeleton: `RSpec.describe "type check" do
  it "checks type" do
    expect("hello").to eq(String)
  end
end`,
      solution: `RSpec.describe "type check" do
  it "checks type" do
    expect("hello").to be_a(String)
  end
end`,
      hints: ['eq checks value equality, not type', 'be_a (or be_an) checks if object is an instance of a class', '"hello" is not equal to String class itself'],
      concepts: ['be_a', 'eq_vs_be_a'],
    },
    {
      id: 'rb-rspec-14',
      title: 'Fix Let vs Let! Bug',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the bug where let is not evaluated eagerly.',
      skeleton: `RSpec.describe "side effect" do
  let(:items) { [] }
  let(:setup) { items << "ready" }

  it "has setup complete" do
    expect(items).to include("ready")
  end
end`,
      solution: `RSpec.describe "side effect" do
  let(:items) { [] }
  let!(:setup) { items << "ready" }

  it "has setup complete" do
    expect(items).to include("ready")
  end
end`,
      hints: ['let is lazy and only evaluated when referenced', 'setup is never referenced in the test, so it never runs', 'let! forces eager evaluation before each example'],
      concepts: ['let_bang', 'lazy_evaluation'],
    },
    {
      id: 'rb-rspec-15',
      title: 'Fix Block vs Value Expect',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the expect form for testing raised errors.',
      skeleton: `RSpec.describe "error test" do
  it "raises on bad input" do
    expect(Integer("abc")).to raise_error(ArgumentError)
  end
end`,
      solution: `RSpec.describe "error test" do
  it "raises on bad input" do
    expect { Integer("abc") }.to raise_error(ArgumentError)
  end
end`,
      hints: ['raise_error requires a block form of expect', 'expect(value) evaluates immediately and raises before the matcher runs', 'Use expect { code } for testing side effects'],
      concepts: ['block_expect', 'raise_error'],
    },
    {
      id: 'rb-rspec-16',
      title: 'Predict Let Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict when let and let! are evaluated.',
      skeleton: `# What is printed?
RSpec.describe "let vs let!" do
  let(:lazy)  { puts "lazy"; 1 }
  let!(:eager) { puts "eager"; 2 }

  it "uses eager" do
    puts "test"
    puts eager
  end
end`,
      solution: `eager
test
2`,
      hints: ['let! is evaluated before the test runs', 'let is only evaluated when accessed', 'lazy is never referenced so it is never evaluated'],
      concepts: ['let_evaluation_order'],
    },
    {
      id: 'rb-rspec-17',
      title: 'Predict Matcher Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Predict which expectations pass or fail.',
      skeleton: `# Which pass (P) and which fail (F)?
expect(nil).to be_falsy         # A
expect(0).to be_falsy           # B
expect("").to be_truthy         # C
expect([]).to be_empty          # D`,
      solution: `# A: P (nil is falsy)
# B: F (0 is truthy in Ruby!)
# C: P ("" is truthy in Ruby)
# D: P ([] is empty)`,
      hints: ['In Ruby, only nil and false are falsy', '0 and "" are truthy in Ruby, unlike some other languages', 'be_empty checks .empty? method'],
      concepts: ['ruby_truthiness', 'matchers'],
    },
    {
      id: 'rb-rspec-18',
      title: 'Predict Double Behavior',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Predict the behavior of doubles and stubs.',
      skeleton: `# What happens when this runs?
RSpec.describe "double" do
  it "uses a strict double" do
    d = double("thing", name: "Bob")
    puts d.name
    puts d.age
  end
end`,
      solution: `Bob
# Then raises RSpec::Mocks::MockExpectationError
# (Double "thing" received unexpected message :age)`,
      hints: ['Strict doubles only respond to defined methods', 'd.name returns "Bob" as configured', 'd.age was not defined, so it raises an error'],
      concepts: ['strict_double', 'unexpected_message'],
    },
    {
      id: 'rb-rspec-19',
      title: 'Refactor to Use let',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Refactor tests to use let instead of instance variables in before.',
      skeleton: `RSpec.describe "calculator" do
  before(:each) do
    @calc = Calculator.new
    @a = 10
    @b = 5
  end

  it "adds" do
    expect(@calc.add(@a, @b)).to eq(15)
  end

  it "subtracts" do
    expect(@calc.subtract(@a, @b)).to eq(5)
  end

  it "multiplies" do
    expect(@calc.multiply(@a, @b)).to eq(50)
  end
end`,
      solution: `RSpec.describe "calculator" do
  let(:calc) { Calculator.new }
  let(:a) { 10 }
  let(:b) { 5 }

  it "adds" do
    expect(calc.add(a, b)).to eq(15)
  end

  it "subtracts" do
    expect(calc.subtract(a, b)).to eq(5)
  end

  it "multiplies" do
    expect(calc.multiply(a, b)).to eq(50)
  end
end`,
      hints: ['Replace @variables set in before with let declarations', 'let is lazy and memoized per example', 'Remove the before block entirely'],
      concepts: ['let', 'refactor_before_to_let'],
    },
    {
      id: 'rb-rspec-20',
      title: 'Refactor to Shared Examples',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Extract duplicated tests into shared examples.',
      skeleton: `RSpec.describe Array do
  it "responds to each" do
    expect([]).to respond_to(:each)
  end

  it "responds to map" do
    expect([]).to respond_to(:map)
  end

  it "responds to select" do
    expect([]).to respond_to(:select)
  end
end

RSpec.describe Hash do
  it "responds to each" do
    expect({}).to respond_to(:each)
  end

  it "responds to map" do
    expect({}).to respond_to(:map)
  end

  it "responds to select" do
    expect({}).to respond_to(:select)
  end
end`,
      solution: `RSpec.shared_examples "enumerable" do
  it "responds to each" do
    expect(subject).to respond_to(:each)
  end

  it "responds to map" do
    expect(subject).to respond_to(:map)
  end

  it "responds to select" do
    expect(subject).to respond_to(:select)
  end
end

RSpec.describe Array do
  subject { [] }
  it_behaves_like "enumerable"
end

RSpec.describe Hash do
  subject { {} }
  it_behaves_like "enumerable"
end`,
      hints: ['Extract the repeated tests into RSpec.shared_examples', 'Use subject to define the object under test in each describe', 'it_behaves_like includes the shared examples'],
      concepts: ['shared_examples', 'DRY_tests'],
    },
  ],
};
