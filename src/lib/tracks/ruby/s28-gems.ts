import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'rb-gems',
  title: '28. Gems',
  explanation: `## Gems & Bundler in Ruby

Gems are Ruby's package system. Bundler manages gem dependencies for projects.

### Gemfile

\`\`\`ruby
# Gemfile
source "https://rubygems.org"

gem "rails", "~> 7.0"
gem "pg", ">= 1.0"
gem "puma"

group :development, :test do
  gem "rspec"
  gem "rubocop"
end
\`\`\`

### Version Constraints

\`\`\`ruby
gem "foo", "1.0"       # exactly 1.0
gem "foo", ">= 1.0"   # 1.0 or higher
gem "foo", "~> 1.2"    # >= 1.2, < 2.0 (pessimistic)
gem "foo", "~> 1.2.3"  # >= 1.2.3, < 1.3.0
\`\`\`

### Bundler Commands

\`\`\`bash
bundle init          # create Gemfile
bundle install       # install gems
bundle update        # update gems
bundle exec rake     # run with bundled gems
bundle add rspec     # add gem to Gemfile
\`\`\`

### Creating a Gem

\`\`\`bash
bundle gem my_gem    # scaffold a new gem
\`\`\`

### Gemspec

\`\`\`ruby
# my_gem.gemspec
Gem::Specification.new do |spec|
  spec.name          = "my_gem"
  spec.version       = "0.1.0"
  spec.authors       = ["Your Name"]
  spec.summary       = "A short summary"
  spec.files         = Dir["lib/**/*.rb"]
  spec.require_paths = ["lib"]

  spec.add_dependency "nokogiri", "~> 1.14"
  spec.add_development_dependency "rspec", "~> 3.0"
end
\`\`\`

### Publishing

\`\`\`bash
gem build my_gem.gemspec
gem push my_gem-0.1.0.gem
\`\`\``,
  exercises: [
    {
      id: 'rb-gems-1',
      title: 'Pessimistic Version Constraint',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Use the pessimistic version operator.',
      skeleton: `# Gemfile
source "https://rubygems.org"

# Allow any 2.x version (>= 2.0, < 3.0)
gem "nokogiri", "___ 2.0"`,
      solution: `# Gemfile
source "https://rubygems.org"

# Allow any 2.x version (>= 2.0, < 3.0)
gem "nokogiri", "~> 2.0"`,
      hints: ['The pessimistic operator is ~>', '~> 2.0 means >= 2.0 and < 3.0', 'It locks the major version'],
      concepts: ['pessimistic_version'],
    },
    {
      id: 'rb-gems-2',
      title: 'Gemfile Group',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Add gems to a development group.',
      skeleton: `source "https://rubygems.org"

gem "sinatra"

___ :development do
  gem "pry"
  gem "rubocop"
end`,
      solution: `source "https://rubygems.org"

gem "sinatra"

group :development do
  gem "pry"
  gem "rubocop"
end`,
      hints: ['Groups organize gems by environment', 'group :name do...end defines a group', 'Development gems are not loaded in production'],
      concepts: ['gem_groups'],
    },
    {
      id: 'rb-gems-3',
      title: 'Gemspec Name and Version',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fill in the gemspec metadata.',
      skeleton: `Gem::Specification.new do |spec|
  spec.___ = "awesome_gem"
  spec.___ = "1.0.0"
  spec.authors = ["Ruby Dev"]
  spec.summary = "An awesome gem"
end`,
      solution: `Gem::Specification.new do |spec|
  spec.name = "awesome_gem"
  spec.version = "1.0.0"
  spec.authors = ["Ruby Dev"]
  spec.summary = "An awesome gem"
end`,
      hints: ['The gem needs a name and version', 'spec.name sets the gem name', 'spec.version sets the version string'],
      concepts: ['gemspec'],
    },
    {
      id: 'rb-gems-4',
      title: 'Add Dependency',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Add a runtime dependency to the gemspec.',
      skeleton: `Gem::Specification.new do |spec|
  spec.name = "my_parser"
  spec.version = "0.2.0"

  spec.___ "json", "~> 2.0"
  spec.add_development_dependency "rspec"
end`,
      solution: `Gem::Specification.new do |spec|
  spec.name = "my_parser"
  spec.version = "0.2.0"

  spec.add_dependency "json", "~> 2.0"
  spec.add_development_dependency "rspec"
end`,
      hints: ['Runtime dependencies use add_dependency', 'Dev-only dependencies use add_development_dependency', 'add_dependency is for gems needed at runtime'],
      concepts: ['add_dependency'],
    },
    {
      id: 'rb-gems-5',
      title: 'Require Paths',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Set the require paths for a gem.',
      skeleton: `Gem::Specification.new do |spec|
  spec.name = "my_gem"
  spec.version = "0.1.0"
  spec.files = Dir["lib/**/*.rb"]
  spec.___ = ["lib"]
end`,
      solution: `Gem::Specification.new do |spec|
  spec.name = "my_gem"
  spec.version = "0.1.0"
  spec.files = Dir["lib/**/*.rb"]
  spec.require_paths = ["lib"]
end`,
      hints: ['require_paths tells Ruby where to find files when requiring the gem', 'Convention is to use ["lib"]', 'This is what makes require "my_gem" work'],
      concepts: ['require_paths'],
    },
    {
      id: 'rb-gems-6',
      title: 'Gemfile Source',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Set the gem source.',
      skeleton: `___ "https://rubygems.org"

gem "rails", "~> 7.0"`,
      solution: `source "https://rubygems.org"

gem "rails", "~> 7.0"`,
      hints: ['Every Gemfile needs a source', 'source specifies where to fetch gems', 'RubyGems.org is the standard source'],
      concepts: ['gem_source'],
    },
    {
      id: 'rb-gems-7',
      title: 'Write a Gem Module',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write the main module for a gem with a VERSION constant and a configure method.',
      skeleton: `# lib/my_utils.rb
# Write a MyUtils module with:
# - VERSION constant set to "1.0.0"
# - Configuration class with attr_accessor :api_key, :timeout (default 30)
# - self.configure method that yields a configuration instance
# - self.configuration reader
`,
      solution: `# lib/my_utils.rb
module MyUtils
  VERSION = "1.0.0"

  class Configuration
    attr_accessor :api_key, :timeout

    def initialize
      @timeout = 30
    end
  end

  def self.configuration
    @configuration ||= Configuration.new
  end

  def self.configure
    yield(configuration)
  end
end`,
      hints: ['Use a nested Configuration class', 'self.configure yields the config object', 'Memoize configuration with ||='],
      concepts: ['gem_structure', 'configuration_pattern'],
    },
    {
      id: 'rb-gems-8',
      title: 'Write a Gem Loader',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a gem entry point that requires all necessary files.',
      skeleton: `# lib/text_tools.rb
# Write the entry point for a "text_tools" gem that:
# - Requires "text_tools/version"
# - Requires "text_tools/formatter"
# - Requires "text_tools/analyzer"
# - Defines a TextTools module with a self.format(text) that calls Formatter.new.format(text)
`,
      solution: `# lib/text_tools.rb
require_relative "text_tools/version"
require_relative "text_tools/formatter"
require_relative "text_tools/analyzer"

module TextTools
  def self.format(text)
    Formatter.new.format(text)
  end
end`,
      hints: ['Use require_relative for files within the gem', 'The entry point loads all sub-files', 'Provide a convenience method on the module'],
      concepts: ['gem_entry_point', 'require_relative'],
    },
    {
      id: 'rb-gems-9',
      title: 'Write Gemspec with Multiple Dependencies',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a complete gemspec for a web scraping gem.',
      skeleton: `# scraper.gemspec
# Write a gemspec for "scraper" gem version "0.3.0"
# - Author: "Dev Team", email: "dev@example.com"
# - Summary: "A web scraping toolkit"
# - License: "MIT"
# - Requires Ruby >= 3.0
# - Runtime deps: nokogiri ~> 1.14, httparty ~> 0.21
# - Dev deps: rspec ~> 3.0, webmock ~> 3.18
# - Files from lib/ directory
`,
      solution: `# scraper.gemspec
Gem::Specification.new do |spec|
  spec.name          = "scraper"
  spec.version       = "0.3.0"
  spec.authors       = ["Dev Team"]
  spec.email         = ["dev@example.com"]
  spec.summary       = "A web scraping toolkit"
  spec.license       = "MIT"
  spec.required_ruby_version = ">= 3.0"

  spec.files         = Dir["lib/**/*.rb"]
  spec.require_paths = ["lib"]

  spec.add_dependency "nokogiri", "~> 1.14"
  spec.add_dependency "httparty", "~> 0.21"

  spec.add_development_dependency "rspec", "~> 3.0"
  spec.add_development_dependency "webmock", "~> 3.18"
end`,
      hints: ['Use Gem::Specification.new with a block', 'required_ruby_version sets minimum Ruby version', 'Separate runtime and development dependencies'],
      concepts: ['complete_gemspec'],
    },
    {
      id: 'rb-gems-10',
      title: 'Write Version Module',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Write a version module following gem conventions.',
      skeleton: `# lib/my_gem/version.rb
# Write a version module for "my_gem" with:
# - MAJOR = 2, MINOR = 1, PATCH = 3
# - VERSION string composed from the parts ("2.1.3")
`,
      solution: `# lib/my_gem/version.rb
module MyGem
  MAJOR = 2
  MINOR = 1
  PATCH = 3
  VERSION = [MAJOR, MINOR, PATCH].join(".").freeze
end`,
      hints: ['Define constants for each version part', 'Join them with dots for the VERSION string', 'Freeze the VERSION string for safety'],
      concepts: ['semantic_versioning', 'version_module'],
    },
    {
      id: 'rb-gems-11',
      title: 'Write Gemfile with Git Source',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Write a Gemfile that uses multiple sources including git.',
      skeleton: `# Write a Gemfile with:
# - Standard rubygems source
# - rails ~> 7.0
# - pg gem
# - A gem "my_private_gem" from git: "https://github.com/org/my_private_gem.git", branch: "main"
# - rspec in test group
# - pry in development group
`,
      solution: `source "https://rubygems.org"

gem "rails", "~> 7.0"
gem "pg"
gem "my_private_gem", git: "https://github.com/org/my_private_gem.git", branch: "main"

group :test do
  gem "rspec"
end

group :development do
  gem "pry"
end`,
      hints: ['Use git: option to specify a git repository', 'branch: specifies which branch to use', 'Groups can be defined separately'],
      concepts: ['git_source', 'gemfile_options'],
    },
    {
      id: 'rb-gems-12',
      title: 'Write a Plugin System',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Write a gem-like plugin registration system.',
      skeleton: `# Write a PluginManager module that:
# - Has a register(name, &block) class method to register plugins
# - Has a plugins method returning all registered plugins
# - Has a run(name) method that executes a registered plugin
# - Stores plugins in a hash
`,
      solution: `module PluginManager
  @plugins = {}

  def self.register(name, &block)
    @plugins[name] = block
  end

  def self.plugins
    @plugins.keys
  end

  def self.run(name)
    raise "Unknown plugin: \#{name}" unless @plugins.key?(name)
    @plugins[name].call
  end

  def self.clear
    @plugins.clear
  end
end`,
      hints: ['Store plugins as name => block pairs in a hash', 'Use &block to capture the block passed to register', 'call executes a stored proc/block'],
      concepts: ['plugin_pattern', 'block_storage'],
    },
    {
      id: 'rb-gems-13',
      title: 'Fix Version Constraint Bug',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'ruby',
      goal: 'Fix the version constraint that is too restrictive.',
      skeleton: `# Gemfile - we want any 3.x version of rspec
source "https://rubygems.org"

gem "rspec", "3.0"`,
      solution: `# Gemfile - we want any 3.x version of rspec
source "https://rubygems.org"

gem "rspec", "~> 3.0"`,
      hints: ['An exact version "3.0" only allows that specific version', 'The pessimistic operator ~> allows minor/patch upgrades', '~> 3.0 means >= 3.0 and < 4.0'],
      concepts: ['version_constraints'],
    },
    {
      id: 'rb-gems-14',
      title: 'Fix Missing require_relative',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the gem loading error.',
      skeleton: `# lib/my_gem.rb
require "my_gem/version"
require "my_gem/core"

module MyGem
end

# Error: cannot load such file -- my_gem/version
# The files exist at lib/my_gem/version.rb and lib/my_gem/core.rb`,
      solution: `# lib/my_gem.rb
require_relative "my_gem/version"
require_relative "my_gem/core"

module MyGem
end`,
      hints: ['require uses the load path, require_relative uses the current file location', 'Within a gem, use require_relative for internal files', 'require_relative resolves relative to the current file'],
      concepts: ['require_vs_require_relative'],
    },
    {
      id: 'rb-gems-15',
      title: 'Fix Gemspec Files Pattern',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Fix the gemspec so it includes all necessary files.',
      skeleton: `Gem::Specification.new do |spec|
  spec.name = "my_gem"
  spec.version = "1.0.0"
  # Bug: only includes .rb files, missing templates and data
  spec.files = Dir["lib/**/*.rb"]
  spec.require_paths = ["lib"]
  # Gem also has lib/my_gem/templates/*.erb and lib/my_gem/data/*.yml
end`,
      solution: `Gem::Specification.new do |spec|
  spec.name = "my_gem"
  spec.version = "1.0.0"
  spec.files = Dir["lib/**/*.{rb,erb,yml}"]
  spec.require_paths = ["lib"]
end`,
      hints: ['Dir glob only matches .rb files', 'Use {rb,erb,yml} to match multiple extensions', 'All files the gem needs must be listed in spec.files'],
      concepts: ['gemspec_files', 'dir_glob'],
    },
    {
      id: 'rb-gems-16',
      title: 'Predict Version Resolution',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict which versions satisfy the constraint.',
      skeleton: `# Given: gem "foo", "~> 1.2.3"
# Which versions are allowed?
# A: 1.2.3
# B: 1.2.5
# C: 1.3.0
# D: 2.0.0
# E: 1.2.2`,
      solution: `# A: 1.2.3 -> YES (matches exactly)
# B: 1.2.5 -> YES (>= 1.2.3, < 1.3.0)
# C: 1.3.0 -> NO  (>= 1.3.0 is outside range)
# D: 2.0.0 -> NO  (way above range)
# E: 1.2.2 -> NO  (below 1.2.3)`,
      hints: ['~> 1.2.3 means >= 1.2.3 and < 1.3.0', 'The last digit is the one that can increase', 'Versions below the minimum are excluded'],
      concepts: ['pessimistic_version_resolution'],
    },
    {
      id: 'rb-gems-17',
      title: 'Predict Bundle Groups',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict which gems are loaded in production.',
      skeleton: `# Gemfile:
source "https://rubygems.org"
gem "sinatra"
gem "pg"
group :development do
  gem "pry"
end
group :test do
  gem "rspec"
end
group :development, :test do
  gem "dotenv"
end
# If we run: bundle install --without development test
# Which gems are installed?`,
      solution: `# sinatra -> YES (default group)
# pg      -> YES (default group)
# pry     -> NO  (development only)
# rspec   -> NO  (test only)
# dotenv  -> NO  (development and test)`,
      hints: ['--without excludes specified groups', 'Gems outside any group are in the default group', 'dotenv is in both development and test groups'],
      concepts: ['bundle_groups'],
    },
    {
      id: 'rb-gems-18',
      title: 'Predict Require Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Predict the output of requiring gem files.',
      skeleton: `# lib/my_gem/version.rb contains: puts "version loaded"
# lib/my_gem/core.rb contains: puts "core loaded"
# lib/my_gem.rb contains:
puts "gem loading"
require_relative "my_gem/version"
require_relative "my_gem/core"
puts "gem ready"

# What is the output when require_relative "my_gem" is called?`,
      solution: `gem loading
version loaded
core loaded
gem ready`,
      hints: ['require_relative loads files synchronously', 'Each require runs the file at that point', 'The sequence follows the code order in my_gem.rb'],
      concepts: ['require_order'],
    },
    {
      id: 'rb-gems-19',
      title: 'Refactor Inline Version',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'ruby',
      goal: 'Refactor to extract the version into a separate module file.',
      skeleton: `# lib/my_gem.rb
module MyGem
  VERSION = "2.5.1"

  def self.version
    VERSION
  end

  def self.greet
    "Hello from MyGem v\#{VERSION}"
  end
end`,
      solution: `# lib/my_gem/version.rb
module MyGem
  VERSION = "2.5.1".freeze
end

# lib/my_gem.rb
require_relative "my_gem/version"

module MyGem
  def self.version
    VERSION
  end

  def self.greet
    "Hello from MyGem v\#{VERSION}"
  end
end`,
      hints: ['Extract VERSION into its own file at lib/my_gem/version.rb', 'The gemspec can then require just the version file', 'Use require_relative to load the version file'],
      concepts: ['version_extraction', 'gem_conventions'],
    },
    {
      id: 'rb-gems-20',
      title: 'Refactor to Autoloader',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'ruby',
      goal: 'Refactor explicit requires to an autoload-based approach.',
      skeleton: `# lib/my_gem.rb
require_relative "my_gem/version"
require_relative "my_gem/parser"
require_relative "my_gem/formatter"
require_relative "my_gem/validator"
require_relative "my_gem/exporter"
require_relative "my_gem/importer"

module MyGem
end`,
      solution: `# lib/my_gem.rb
module MyGem
  autoload :VERSION,   "my_gem/version"
  autoload :Parser,    "my_gem/parser"
  autoload :Formatter, "my_gem/formatter"
  autoload :Validator, "my_gem/validator"
  autoload :Exporter,  "my_gem/exporter"
  autoload :Importer,  "my_gem/importer"
end`,
      hints: ['autoload lazily loads files when the constant is first accessed', 'Syntax: autoload :ConstantName, "path"', 'This improves startup time by loading only what is needed'],
      concepts: ['autoload', 'lazy_loading'],
    },
  ],
};
