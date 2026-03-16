import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-rake',
  title: '29. Rake',
  explanation: `## Rake in Ruby

Rake is Ruby's build tool, similar to Make. It defines tasks with dependencies using a Ruby DSL.

### Basic Tasks

\`\`\`ruby
# Rakefile
desc "Say hello"
task :hello do
  puts "Hello from Rake!"
end

desc "Greet someone"
task :greet, [:name] do |t, args|
  puts "Hello, \#{args[:name]}!"
end
\`\`\`

### Task Dependencies

\`\`\`ruby
task :build => [:clean, :compile] do
  puts "Build complete"
end

task :clean do
  puts "Cleaning..."
end

task :compile do
  puts "Compiling..."
end
\`\`\`

### Namespaces

\`\`\`ruby
namespace :db do
  desc "Create database"
  task :create do
    puts "Creating DB..."
  end

  desc "Migrate database"
  task :migrate => :create do
    puts "Migrating..."
  end
end
# Run: rake db:migrate
\`\`\`

### File Tasks

\`\`\`ruby
file "output.txt" => ["input.txt"] do
  cp "input.txt", "output.txt"
end

# Directory task
directory "tmp/cache"
\`\`\`

### Default Task

\`\`\`ruby
task default: :build
\`\`\``,
  exercises: [
    {
      id: 'rb-rake-1',
      title: 'Basic Task Definition',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Define a basic Rake task.',
      skeleton: `___ "Clean build artifacts"
___ :clean do
  puts "Cleaning..."
end`,
      solution: `desc "Clean build artifacts"
task :clean do
  puts "Cleaning..."
end`,
      hints: ['desc provides a description for the task', 'task :name do...end defines a task', 'desc must come before the task it describes'],
      concepts: ['task', 'desc'],
    },
    {
      id: 'rb-rake-2',
      title: 'Task Dependencies',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Define a task with dependencies.',
      skeleton: `task :compile do
  puts "Compiling..."
end

task :test do
  puts "Testing..."
end

task :build ___ [:compile, :test] do
  puts "Build complete!"
end`,
      solution: `task :compile do
  puts "Compiling..."
end

task :test do
  puts "Testing..."
end

task :build => [:compile, :test] do
  puts "Build complete!"
end`,
      hints: ['Use => to specify dependencies', 'Dependencies are listed in an array', 'task :name => [:dep1, :dep2]'],
      concepts: ['task_dependencies'],
    },
    {
      id: 'rb-rake-3',
      title: 'Namespace',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Define tasks within a namespace.',
      skeleton: `___ :db do
  desc "Seed the database"
  task :seed do
    puts "Seeding..."
  end
end
# Run with: rake db:seed`,
      solution: `namespace :db do
  desc "Seed the database"
  task :seed do
    puts "Seeding..."
  end
end
# Run with: rake db:seed`,
      hints: ['namespace groups related tasks', 'namespace :name do...end', 'Tasks are invoked as namespace:task'],
      concepts: ['namespace'],
    },
    {
      id: 'rb-rake-4',
      title: 'Task Arguments',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Define a task that accepts arguments.',
      skeleton: `desc "Deploy to environment"
task :deploy, [___] do |t, args|
  puts "Deploying to \#{args[:env]}"
end
# Run with: rake deploy[production]`,
      solution: `desc "Deploy to environment"
task :deploy, [:env] do |t, args|
  puts "Deploying to \#{args[:env]}"
end
# Run with: rake deploy[production]`,
      hints: ['Task arguments are defined as symbols in an array', 'The block receives |task, args|', 'Access args with args[:name]'],
      concepts: ['task_arguments'],
    },
    {
      id: 'rb-rake-5',
      title: 'Default Task',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Set the default task.',
      skeleton: `task :test do
  puts "Running tests..."
end

task ___ :test`,
      solution: `task :test do
  puts "Running tests..."
end

task default: :test`,
      hints: ['The default task runs when you type just "rake"', 'task default: :other_task', 'default is a special task name'],
      concepts: ['default_task'],
    },
    {
      id: 'rb-rake-6',
      title: 'File Task',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Create a file task with a prerequisite.',
      skeleton: `___ "report.html" => ["data.json"] do
  puts "Generating report..."
  # generate HTML from JSON
end`,
      solution: `file "report.html" => ["data.json"] do
  puts "Generating report..."
  # generate HTML from JSON
end`,
      hints: ['file tasks run only when the output is older than inputs', 'file "output" => ["input"] do...end', 'Unlike task, file is timestamp-based'],
      concepts: ['file_task'],
    },
    {
      id: 'rb-rake-7',
      title: 'Write a Build Pipeline',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Rakefile with clean, compile, test, and build tasks with proper dependencies.',
      skeleton: `# Write a Rakefile with:
# - :clean task that puts "Cleaning..."
# - :compile task (depends on :clean) that puts "Compiling..."
# - :test task (depends on :compile) that puts "Testing..."
# - :build task (depends on :test) that puts "Build complete!"
# - default task is :build
`,
      solution: `desc "Remove build artifacts"
task :clean do
  puts "Cleaning..."
end

desc "Compile source"
task compile: :clean do
  puts "Compiling..."
end

desc "Run tests"
task test: :compile do
  puts "Testing..."
end

desc "Full build"
task build: :test do
  puts "Build complete!"
end

task default: :build`,
      hints: ['Chain dependencies: test depends on compile depends on clean', 'Each task only needs its direct dependency', 'Rake resolves the full dependency chain automatically'],
      concepts: ['task_chain', 'build_pipeline'],
    },
    {
      id: 'rb-rake-8',
      title: 'Write Namespaced Tasks',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write namespaced database tasks.',
      skeleton: `# Write a Rakefile with:
# namespace :db containing:
#   - :create (puts "Creating database...")
#   - :migrate (depends on :create, puts "Running migrations...")
#   - :seed (depends on :migrate, puts "Seeding data...")
#   - :reset (depends on :create, :migrate, :seed, puts "Database reset!")
`,
      solution: `namespace :db do
  desc "Create database"
  task :create do
    puts "Creating database..."
  end

  desc "Run migrations"
  task migrate: :create do
    puts "Running migrations..."
  end

  desc "Seed data"
  task seed: :migrate do
    puts "Seeding data..."
  end

  desc "Reset database"
  task reset: [:create, :migrate, :seed] do
    puts "Database reset!"
  end
end`,
      hints: ['All tasks go inside namespace :db', 'Dependencies within the same namespace use plain symbols', 'reset depends on all three other tasks'],
      concepts: ['namespace', 'task_dependencies'],
    },
    {
      id: 'rb-rake-9',
      title: 'Write Task with Arguments and Defaults',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a deploy task that takes environment and branch arguments with defaults.',
      skeleton: `# Write a :deploy task that:
# - Accepts :env and :branch arguments
# - Defaults env to "staging" and branch to "main"
# - Prints "Deploying <branch> to <env>..."
`,
      solution: `desc "Deploy application"
task :deploy, [:env, :branch] do |t, args|
  args.with_defaults(env: "staging", branch: "main")
  puts "Deploying \#{args[:branch]} to \#{args[:env]}..."
end`,
      hints: ['Define arguments as [:env, :branch]', 'args.with_defaults sets default values', 'Access with args[:env] and args[:branch]'],
      concepts: ['task_arguments', 'with_defaults'],
    },
    {
      id: 'rb-rake-10',
      title: 'Write Rule Task',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a rule that compiles .md files to .html files.',
      skeleton: `# Write a Rake rule that:
# - Matches any .html file
# - Depends on the corresponding .md file
# - Prints "Converting <source> to <target>"
# Also write an :all task that builds ["index.html", "about.html"]
`,
      solution: `rule ".html" => ".md" do |t|
  puts "Converting \#{t.source} to \#{t.name}"
end

desc "Build all HTML files"
task all: ["index.html", "about.html"]`,
      hints: ['rule ".ext" => ".src_ext" creates pattern-based tasks', 't.name is the target, t.source is the source', 'Rules automatically find the source file'],
      concepts: ['rule', 'pattern_task'],
    },
    {
      id: 'rb-rake-11',
      title: 'Write Task Invoking Other Tasks',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a task that programmatically invokes other tasks.',
      skeleton: `# Write tasks where:
# - :notify task puts "Sending notification..."
# - :deploy_all task invokes :deploy for each of ["web", "api", "worker"]
#   printing "Deploying <service>..." for each
# Use Rake::Task[name].invoke or .execute
`,
      solution: `desc "Send notification"
task :notify do
  puts "Sending notification..."
end

desc "Deploy a service"
task :deploy, [:service] do |t, args|
  puts "Deploying \#{args[:service]}..."
end

desc "Deploy all services"
task :deploy_all do
  ["web", "api", "worker"].each do |service|
    Rake::Task[:deploy].invoke(service)
    Rake::Task[:deploy].reenable
  end
  Rake::Task[:notify].invoke
end`,
      hints: ['Rake::Task[:name].invoke runs a task programmatically', 'Tasks only run once unless reenabled', 'Call .reenable to allow invoking again'],
      concepts: ['task_invoke', 'reenable'],
    },
    {
      id: 'rb-rake-12',
      title: 'Write a TestTask',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Rakefile using Rake::TestTask to run tests.',
      skeleton: `# Write a Rakefile that:
# - Requires 'rake/testtask'
# - Creates a Rake::TestTask named :test
# - Sets test files to "test/**/*_test.rb"
# - Sets the default task to :test
`,
      solution: `require "rake/testtask"

Rake::TestTask.new(:test) do |t|
  t.libs << "test"
  t.test_files = FileList["test/**/*_test.rb"]
end

task default: :test`,
      hints: ['Rake::TestTask.new(:name) creates a test-running task', 't.libs adds directories to the load path', 'FileList creates a lazy file list from a glob'],
      concepts: ['test_task', 'file_list'],
    },
    {
      id: 'rb-rake-13',
      title: 'Fix Missing Dependency',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the task that runs before its dependency completes.',
      skeleton: `task :setup do
  puts "Setting up..."
  @config = { db: "mydb" }
end

# Bug: :migrate runs before :setup, @config is nil
task :migrate do
  puts "Migrating \#{@config[:db]}..."
end`,
      solution: `task :setup do
  puts "Setting up..."
  @config = { db: "mydb" }
end

task migrate: :setup do
  puts "Migrating \#{@config[:db]}..."
end`,
      hints: ['The migrate task needs to depend on setup', 'Add => :setup or use hash syntax', 'Without the dependency, @config is nil'],
      concepts: ['task_dependencies', 'execution_order'],
    },
    {
      id: 'rb-rake-14',
      title: 'Fix Namespace Reference',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the cross-namespace task reference.',
      skeleton: `namespace :assets do
  task :compile do
    puts "Compiling assets..."
  end
end

namespace :deploy do
  # Bug: can't find :compile
  task release: :compile do
    puts "Releasing..."
  end
end`,
      solution: `namespace :assets do
  task :compile do
    puts "Compiling assets..."
  end
end

namespace :deploy do
  task release: "assets:compile" do
    puts "Releasing..."
  end
end`,
      hints: ['Cross-namespace references need the full path', 'Use "namespace:task" as a string', 'Within the same namespace, bare symbols work'],
      concepts: ['cross_namespace_reference'],
    },
    {
      id: 'rb-rake-15',
      title: 'Fix Re-invocation Bug',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Fix the task that only runs once when invoked multiple times.',
      skeleton: `task :ping do
  puts "Pong!"
end

task :health_check do
  3.times do
    Rake::Task[:ping].invoke
  end
end
# Output: only prints "Pong!" once`,
      solution: `task :ping do
  puts "Pong!"
end

task :health_check do
  3.times do
    Rake::Task[:ping].invoke
    Rake::Task[:ping].reenable
  end
end`,
      hints: ['Rake tasks only execute once by default', 'Call .reenable on the task between invocations', 'reenable resets the already-invoked flag'],
      concepts: ['reenable', 'task_invocation'],
    },
    {
      id: 'rb-rake-16',
      title: 'Predict Dependency Order',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Predict the order tasks execute.',
      skeleton: `task :a do puts "A" end
task :b do puts "B" end
task :c => [:a, :b] do puts "C" end
task :d => [:b, :c] do puts "D" end
# What is the output of: rake d`,
      solution: `B
A
C
D`,
      hints: ['Dependencies execute left to right, depth first', 'Each task only runs once', 'B is a dependency of both C and D, but runs only once'],
      concepts: ['dependency_resolution'],
    },
    {
      id: 'rb-rake-17',
      title: 'Predict Namespace Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict which tasks run.',
      skeleton: `namespace :app do
  task :init do puts "init" end
  task :start => :init do puts "start" end
end

task :run => "app:start" do
  puts "running"
end
# What is the output of: rake run`,
      solution: `init
start
running`,
      hints: ['run depends on app:start', 'app:start depends on app:init', 'Dependencies resolve through namespaces'],
      concepts: ['namespace_resolution'],
    },
    {
      id: 'rb-rake-18',
      title: 'Predict Task Argument',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output of a task with arguments.',
      skeleton: `task :greet, [:name, :title] do |t, args|
  args.with_defaults(name: "World", title: "Mr")
  puts "\#{args[:title]}. \#{args[:name]}"
end
# What is the output of: rake greet[Alice]`,
      solution: `Mr. Alice`,
      hints: ['Only :name is provided, :title uses the default', 'with_defaults fills in missing arguments', 'Alice is the first argument, title defaults to "Mr"'],
      concepts: ['argument_defaults'],
    },
    {
      id: 'rb-rake-19',
      title: 'Refactor Duplicate Tasks',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor repetitive tasks using iteration.',
      skeleton: `namespace :assets do
  task :compile_css do
    puts "Compiling CSS..."
  end

  task :compile_js do
    puts "Compiling JS..."
  end

  task :compile_images do
    puts "Compiling images..."
  end

  task :compile_fonts do
    puts "Compiling fonts..."
  end
end`,
      solution: `namespace :assets do
  %w[css js images fonts].each do |type|
    desc "Compile \#{type}"
    task :"compile_\#{type}" do
      puts "Compiling \#{type}..."
    end
  end
end`,
      hints: ['Use iteration to generate similar tasks', '%w[] creates an array of strings', 'task names can be built with string interpolation and to_sym'],
      concepts: ['dynamic_tasks', 'DRY_rakefile'],
    },
    {
      id: 'rb-rake-20',
      title: 'Refactor Inline to TaskLib',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Refactor tasks into a reusable TaskLib class.',
      skeleton: `# Rakefile - repetitive pattern for multiple apps
namespace :web do
  task :build do puts "Building web..." end
  task :test do puts "Testing web..." end
  task :deploy => [:build, :test] do puts "Deploying web..." end
end

namespace :api do
  task :build do puts "Building api..." end
  task :test do puts "Testing api..." end
  task :deploy => [:build, :test] do puts "Deploying api..." end
end`,
      solution: `class AppTasks
  include Rake::DSL

  def initialize(name)
    namespace name do
      desc "Build \#{name}"
      task :build do
        puts "Building \#{name}..."
      end

      desc "Test \#{name}"
      task :test do
        puts "Testing \#{name}..."
      end

      desc "Deploy \#{name}"
      task deploy: [:build, :test] do
        puts "Deploying \#{name}..."
      end
    end
  end
end

AppTasks.new(:web)
AppTasks.new(:api)`,
      hints: ['Include Rake::DSL to use task/namespace in a class', 'The constructor creates the namespace and tasks', 'Instantiate once per app to generate all tasks'],
      concepts: ['task_lib', 'rake_dsl', 'reusable_tasks'],
    },
  ],
};
