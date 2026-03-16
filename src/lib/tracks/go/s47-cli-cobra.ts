import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
	id: 'go-cobra',
	title: '47. CLI Applications with Cobra',
	explanation: `## CLI Applications with Cobra in Go

Cobra is the most popular framework for building CLI applications in Go, used by Kubernetes, Hugo, and GitHub CLI.

### Basic Cobra Setup

\`\`\`go
import "github.com/spf13/cobra"

var rootCmd = &cobra.Command{
    Use:   "myapp",
    Short: "A brief description of your application",
    Long:  "A longer description that spans multiple lines",
    Run: func(cmd *cobra.Command, args []string) {
        fmt.Println("Hello from myapp!")
    },
}

func main() {
    if err := rootCmd.Execute(); err != nil {
        os.Exit(1)
    }
}
\`\`\`

### Adding Subcommands

\`\`\`go
var serveCmd = &cobra.Command{
    Use:   "serve",
    Short: "Start the server",
    RunE: func(cmd *cobra.Command, args []string) error {
        port, _ := cmd.Flags().GetInt("port")
        return startServer(port)
    },
}

func init() {
    serveCmd.Flags().IntP("port", "p", 8080, "port to listen on")
    rootCmd.AddCommand(serveCmd)
}
\`\`\`

### Persistent Flags

\`\`\`go
// Available to this command AND all subcommands
rootCmd.PersistentFlags().BoolP("verbose", "v", false, "verbose output")

// Available only to this specific command
serveCmd.Flags().StringP("config", "c", "", "config file path")

// Mark a flag as required
serveCmd.MarkFlagRequired("config")
\`\`\`

### Cobra with Viper for Configuration

\`\`\`go
import "github.com/spf13/viper"

func initConfig() {
    viper.SetConfigName("config")
    viper.SetConfigType("yaml")
    viper.AddConfigPath(".")
    viper.AddConfigPath("$HOME/.myapp")
    viper.AutomaticEnv()

    if err := viper.ReadInConfig(); err == nil {
        fmt.Println("Using config:", viper.ConfigFileUsed())
    }
}

func init() {
    cobra.OnInitialize(initConfig)
    rootCmd.PersistentFlags().String("log-level", "info", "log level")
    viper.BindPFlag("log_level", rootCmd.PersistentFlags().Lookup("log-level"))
}
\`\`\`

### Argument Validation

\`\`\`go
var deleteCmd = &cobra.Command{
    Use:   "delete [name]",
    Short: "Delete a resource",
    Args:  cobra.ExactArgs(1),       // requires exactly 1 arg
    // Other validators: MinimumNArgs, MaximumNArgs, RangeArgs, NoArgs
    ValidArgsFunction: func(cmd *cobra.Command, args []string, toComplete string) ([]string, cobra.ShellCompDirective) {
        return getResourceNames(), cobra.ShellCompDirectiveNoFileComp
    },
    RunE: func(cmd *cobra.Command, args []string) error {
        return deleteResource(args[0])
    },
}
\`\`\`

### Pre/Post Run Hooks

\`\`\`go
var cmd = &cobra.Command{
    Use: "deploy",
    PersistentPreRun: func(cmd *cobra.Command, args []string) {
        // runs before Run and before children's Run
        initLogger()
    },
    PreRunE: func(cmd *cobra.Command, args []string) error {
        // validate prerequisites
        return checkPrerequisites()
    },
    RunE: func(cmd *cobra.Command, args []string) error {
        return deploy(args)
    },
    PostRun: func(cmd *cobra.Command, args []string) {
        // cleanup after Run
        cleanup()
    },
}
\`\`\`
`,
	exercises: [
		{
			id: 'go-cobra-1',
			title: 'Basic Root Command',
			type: 'fill-blank',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Create a basic Cobra root command.',
			skeleton: `package main

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.__BLANK__{
	Use:   "greet",
	Short: "A greeting CLI tool",
	__BLANK__: func(cmd *cobra.Command, args []string) {
		fmt.Println("Hello, World!")
	},
}

func main() {
	if err := rootCmd.__BLANK__(); err != nil {
		os.Exit(1)
	}
}`,
			solution: `package main

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "greet",
	Short: "A greeting CLI tool",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Hello, World!")
	},
}

func main() {
	if err := rootCmd.Execute(); err != nil {
		os.Exit(1)
	}
}`,
			hints: [
				'Cobra commands are created using the cobra.Command struct.',
				'The Run field is a function that executes when the command is called.',
				'Execute() starts the command execution.',
			],
			concepts: ['cobra', 'cli', 'root-command'],
		},
		{
			id: 'go-cobra-2',
			title: 'Adding a Subcommand',
			type: 'fill-blank',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Add a subcommand to a Cobra root command.',
			skeleton: `package main

import (
	"fmt"
	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "app",
	Short: "My CLI app",
}

var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "Print the version",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("v1.0.0")
	},
}

func init() {
	rootCmd.__BLANK__(versionCmd)
}`,
			solution: `package main

import (
	"fmt"
	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "app",
	Short: "My CLI app",
}

var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "Print the version",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("v1.0.0")
	},
}

func init() {
	rootCmd.AddCommand(versionCmd)
}`,
			hints: [
				'Subcommands are added to parent commands.',
				'The method to add a child command is AddCommand.',
				'init() runs before main and is a good place to wire up commands.',
			],
			concepts: ['cobra', 'subcommand', 'init'],
		},
		{
			id: 'go-cobra-3',
			title: 'String Flag',
			type: 'fill-blank',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Add a string flag to a Cobra command.',
			skeleton: `package main

import (
	"fmt"
	"github.com/spf13/cobra"
)

var name string

var greetCmd = &cobra.Command{
	Use:   "greet",
	Short: "Greet someone",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Printf("Hello, %s!\\n", name)
	},
}

func init() {
	greetCmd.Flags().__BLANK__(&name, "name", "n", "World", "name of the person to greet")
}`,
			solution: `package main

import (
	"fmt"
	"github.com/spf13/cobra"
)

var name string

var greetCmd = &cobra.Command{
	Use:   "greet",
	Short: "Greet someone",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Printf("Hello, %s!\\n", name)
	},
}

func init() {
	greetCmd.Flags().StringVarP(&name, "name", "n", "World", "name of the person to greet")
}`,
			hints: [
				'StringVarP binds a string flag with a shorthand letter.',
				'The P suffix means it takes a shorthand character.',
				'Var suffix means it binds to an existing variable.',
			],
			concepts: ['cobra', 'flags', 'string-flag'],
		},
		{
			id: 'go-cobra-4',
			title: 'Required Flag',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Mark a Cobra flag as required.',
			skeleton: `package main

import (
	"fmt"
	"github.com/spf13/cobra"
)

var deployCmd = &cobra.Command{
	Use:   "deploy",
	Short: "Deploy the application",
	RunE: func(cmd *cobra.Command, args []string) error {
		env, _ := cmd.Flags().GetString("env")
		fmt.Printf("Deploying to %s\\n", env)
		return nil
	},
}

func init() {
	deployCmd.Flags().StringP("env", "e", "", "deployment environment")
	deployCmd.__BLANK__("env")
}`,
			solution: `package main

import (
	"fmt"
	"github.com/spf13/cobra"
)

var deployCmd = &cobra.Command{
	Use:   "deploy",
	Short: "Deploy the application",
	RunE: func(cmd *cobra.Command, args []string) error {
		env, _ := cmd.Flags().GetString("env")
		fmt.Printf("Deploying to %s\\n", env)
		return nil
	},
}

func init() {
	deployCmd.Flags().StringP("env", "e", "", "deployment environment")
	deployCmd.MarkFlagRequired("env")
}`,
			hints: [
				'MarkFlagRequired ensures the user provides this flag.',
				'If a required flag is missing, Cobra returns an error automatically.',
				'The argument is the flag name as a string.',
			],
			concepts: ['cobra', 'required-flags', 'validation'],
		},
		{
			id: 'go-cobra-5',
			title: 'Persistent Flags',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Add a persistent flag available to all subcommands.',
			skeleton: `package main

import (
	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "app",
	Short: "My application",
}

var verbose bool

func init() {
	rootCmd.__BLANK__().BoolVarP(&verbose, "verbose", "v", false, "enable verbose output")
}`,
			solution: `package main

import (
	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "app",
	Short: "My application",
}

var verbose bool

func init() {
	rootCmd.PersistentFlags().BoolVarP(&verbose, "verbose", "v", false, "enable verbose output")
}`,
			hints: [
				'Persistent flags are inherited by all subcommands.',
				'PersistentFlags() returns the persistent flag set.',
				'This is different from Flags() which only applies to the current command.',
			],
			concepts: ['cobra', 'persistent-flags', 'bool-flag'],
		},
		{
			id: 'go-cobra-6',
			title: 'Argument Validation',
			type: 'fill-blank',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Validate command arguments with Cobra.',
			skeleton: `package main

import (
	"fmt"
	"github.com/spf13/cobra"
)

var deleteCmd = &cobra.Command{
	Use:   "delete [resource]",
	Short: "Delete a resource by name",
	Args:  cobra.__BLANK__(1),
	RunE: func(cmd *cobra.Command, args []string) error {
		fmt.Printf("Deleting %s\\n", args[0])
		return nil
	},
}`,
			solution: `package main

import (
	"fmt"
	"github.com/spf13/cobra"
)

var deleteCmd = &cobra.Command{
	Use:   "delete [resource]",
	Short: "Delete a resource by name",
	Args:  cobra.ExactArgs(1),
	RunE: func(cmd *cobra.Command, args []string) error {
		fmt.Printf("Deleting %s\\n", args[0])
		return nil
	},
}`,
			hints: [
				'ExactArgs(n) requires exactly n positional arguments.',
				'Other validators include MinimumNArgs, MaximumNArgs, and NoArgs.',
				'Args validation runs before RunE.',
			],
			concepts: ['cobra', 'argument-validation', 'exact-args'],
		},
		{
			id: 'go-cobra-7',
			title: 'Write a Cobra CLI with Multiple Subcommands',
			type: 'write-function',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Write a complete CLI app with root, "hello", and "goodbye" subcommands.',
			skeleton: `package main

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

// Create a CLI app called "greeter" with two subcommands:
// - "hello" that prints "Hello, <name>!" using a --name flag (default "World")
// - "goodbye" that prints "Goodbye, <name>!" using a --name flag (default "World")
`,
			solution: `package main

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "greeter",
	Short: "A friendly greeting CLI",
}

var helloCmd = &cobra.Command{
	Use:   "hello",
	Short: "Say hello",
	Run: func(cmd *cobra.Command, args []string) {
		name, _ := cmd.Flags().GetString("name")
		fmt.Printf("Hello, %s!\\n", name)
	},
}

var goodbyeCmd = &cobra.Command{
	Use:   "goodbye",
	Short: "Say goodbye",
	Run: func(cmd *cobra.Command, args []string) {
		name, _ := cmd.Flags().GetString("name")
		fmt.Printf("Goodbye, %s!\\n", name)
	},
}

func init() {
	helloCmd.Flags().StringP("name", "n", "World", "name to greet")
	goodbyeCmd.Flags().StringP("name", "n", "World", "name to say goodbye to")
	rootCmd.AddCommand(helloCmd)
	rootCmd.AddCommand(goodbyeCmd)
}

func main() {
	if err := rootCmd.Execute(); err != nil {
		os.Exit(1)
	}
}`,
			hints: [
				'Create a rootCmd, then helloCmd and goodbyeCmd as separate commands.',
				'Each subcommand needs its own --name flag.',
				'Use AddCommand to attach subcommands to the root.',
			],
			concepts: ['cobra', 'subcommands', 'flags', 'cli-structure'],
		},
		{
			id: 'go-cobra-8',
			title: 'Write RunE with Error Handling',
			type: 'write-function',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Write a Cobra command using RunE that validates input and returns errors.',
			skeleton: `package main

import (
	"fmt"
	"strconv"

	"github.com/spf13/cobra"
)

// Write a "multiply" command that:
// - Takes exactly 2 positional arguments (numbers as strings)
// - Parses both to float64
// - Returns an error if either cannot be parsed
// - Prints the product on success
`,
			solution: `package main

import (
	"fmt"
	"strconv"

	"github.com/spf13/cobra"
)

var multiplyCmd = &cobra.Command{
	Use:   "multiply [a] [b]",
	Short: "Multiply two numbers",
	Args:  cobra.ExactArgs(2),
	RunE: func(cmd *cobra.Command, args []string) error {
		a, err := strconv.ParseFloat(args[0], 64)
		if err != nil {
			return fmt.Errorf("invalid first argument %q: %w", args[0], err)
		}
		b, err := strconv.ParseFloat(args[1], 64)
		if err != nil {
			return fmt.Errorf("invalid second argument %q: %w", args[1], err)
		}
		fmt.Printf("%g * %g = %g\\n", a, b, a*b)
		return nil
	},
}`,
			hints: [
				'RunE returns an error instead of Run which returns nothing.',
				'Use strconv.ParseFloat to convert string args to numbers.',
				'cobra.ExactArgs(2) enforces exactly two arguments.',
			],
			concepts: ['cobra', 'runE', 'error-handling', 'argument-parsing'],
		},
		{
			id: 'go-cobra-9',
			title: 'Write a Config Loader with Viper',
			type: 'write-function',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Write a function that initializes Viper configuration with defaults and environment variable binding.',
			skeleton: `package main

import (
	"github.com/spf13/viper"
)

// Write initConfig that:
// - Sets config name to "config"
// - Sets config type to "yaml"
// - Adds "." and "$HOME/.myapp" as config paths
// - Sets defaults: "port" = 8080, "host" = "localhost", "debug" = false
// - Enables automatic environment variable binding
// - Reads config (ignoring file-not-found errors)
`,
			solution: `package main

import (
	"errors"

	"github.com/spf13/viper"
)

func initConfig() error {
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath(".")
	viper.AddConfigPath("$HOME/.myapp")

	viper.SetDefault("port", 8080)
	viper.SetDefault("host", "localhost")
	viper.SetDefault("debug", false)

	viper.AutomaticEnv()

	if err := viper.ReadInConfig(); err != nil {
		var notFound viper.ConfigFileNotFoundError
		if !errors.As(err, &notFound) {
			return err
		}
	}
	return nil
}`,
			hints: [
				'viper.SetConfigName sets the config file name without extension.',
				'viper.AutomaticEnv() enables reading from environment variables.',
				'Use errors.As to check for ConfigFileNotFoundError.',
			],
			concepts: ['viper', 'configuration', 'environment-variables', 'defaults'],
		},
		{
			id: 'go-cobra-10',
			title: 'Write PreRunE Validation',
			type: 'write-function',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Write a Cobra command with PreRunE that validates environment before execution.',
			skeleton: `package main

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

// Write a "deploy" command with:
// - PreRunE that checks the DEPLOY_TOKEN env var is set (return error if not)
// - PreRunE also checks --target flag is one of: "staging", "production"
// - RunE that prints "Deploying to <target> with token <first 4 chars>..."
`,
			solution: `package main

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var deployCmd = &cobra.Command{
	Use:   "deploy",
	Short: "Deploy the application",
	PreRunE: func(cmd *cobra.Command, args []string) error {
		token := os.Getenv("DEPLOY_TOKEN")
		if token == "" {
			return fmt.Errorf("DEPLOY_TOKEN environment variable is required")
		}
		target, _ := cmd.Flags().GetString("target")
		if target != "staging" && target != "production" {
			return fmt.Errorf("target must be 'staging' or 'production', got %q", target)
		}
		return nil
	},
	RunE: func(cmd *cobra.Command, args []string) error {
		token := os.Getenv("DEPLOY_TOKEN")
		target, _ := cmd.Flags().GetString("target")
		fmt.Printf("Deploying to %s with token %s...\\n", target, token[:4])
		return nil
	},
}

func init() {
	deployCmd.Flags().StringP("target", "t", "", "deployment target")
	deployCmd.MarkFlagRequired("target")
}`,
			hints: [
				'PreRunE runs before RunE and can short-circuit execution.',
				'Use os.Getenv to check environment variables.',
				'Return a descriptive error if validation fails.',
			],
			concepts: ['cobra', 'prerun', 'validation', 'environment-variables'],
		},
		{
			id: 'go-cobra-11',
			title: 'Write Nested Subcommands',
			type: 'write-function',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Write a CLI with nested subcommand structure: app config get/set.',
			skeleton: `package main

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

// Create a CLI structure:
//   app config get <key>    -> prints "Config <key> = <value>"
//   app config set <key> <value> -> prints "Set <key> = <value>"
// The config command itself should print help when called without subcommands.
`,
			solution: `package main

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var store = map[string]string{
	"theme": "dark",
	"lang":  "en",
}

var rootCmd = &cobra.Command{
	Use:   "app",
	Short: "Application CLI",
}

var configCmd = &cobra.Command{
	Use:   "config",
	Short: "Manage configuration",
	Run: func(cmd *cobra.Command, args []string) {
		cmd.Help()
	},
}

var configGetCmd = &cobra.Command{
	Use:   "get [key]",
	Short: "Get a config value",
	Args:  cobra.ExactArgs(1),
	RunE: func(cmd *cobra.Command, args []string) error {
		key := args[0]
		val, ok := store[key]
		if !ok {
			return fmt.Errorf("unknown config key: %s", key)
		}
		fmt.Printf("Config %s = %s\\n", key, val)
		return nil
	},
}

var configSetCmd = &cobra.Command{
	Use:   "set [key] [value]",
	Short: "Set a config value",
	Args:  cobra.ExactArgs(2),
	Run: func(cmd *cobra.Command, args []string) {
		store[args[0]] = args[1]
		fmt.Printf("Set %s = %s\\n", args[0], args[1])
	},
}

func init() {
	configCmd.AddCommand(configGetCmd)
	configCmd.AddCommand(configSetCmd)
	rootCmd.AddCommand(configCmd)
}

func main() {
	if err := rootCmd.Execute(); err != nil {
		os.Exit(1)
	}
}`,
			hints: [
				'Create a configCmd that has two children: configGetCmd and configSetCmd.',
				'Nest by calling configCmd.AddCommand(configGetCmd).',
				'The parent config command can just print help when called directly.',
			],
			concepts: ['cobra', 'nested-subcommands', 'cli-hierarchy'],
		},
		{
			id: 'go-cobra-12',
			title: 'Write Custom Argument Validator',
			type: 'write-function',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Write a custom Cobra argument validator function.',
			skeleton: `package main

import (
	"fmt"
	"strings"

	"github.com/spf13/cobra"
)

// Write a custom Args validator called validEnvironments that:
// - Requires exactly 1 argument
// - Validates the argument is one of: "dev", "staging", "prod"
// - Returns a descriptive error if invalid
// Then use it in a "switch-env" command.
`,
			solution: `package main

import (
	"fmt"
	"strings"

	"github.com/spf13/cobra"
)

var validEnvs = []string{"dev", "staging", "prod"}

func validEnvironments(cmd *cobra.Command, args []string) error {
	if len(args) != 1 {
		return fmt.Errorf("requires exactly 1 argument, got %d", len(args))
	}
	for _, env := range validEnvs {
		if args[0] == env {
			return nil
		}
	}
	return fmt.Errorf("invalid environment %q, must be one of: %s", args[0], strings.Join(validEnvs, ", "))
}

var switchEnvCmd = &cobra.Command{
	Use:   "switch-env [environment]",
	Short: "Switch to a different environment",
	Args:  validEnvironments,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Printf("Switched to %s environment\\n", args[0])
	},
}`,
			hints: [
				'Custom validators have signature func(cmd *cobra.Command, args []string) error.',
				'Check the length of args first, then validate the value.',
				'Return nil for valid input, an error for invalid.',
			],
			concepts: ['cobra', 'custom-validator', 'argument-validation'],
		},
		{
			id: 'go-cobra-13',
			title: 'Fix Cobra Command Registration',
			type: 'fix-bug',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Fix the broken command registration so subcommands work properly.',
			skeleton: `package main

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "todo",
	Short: "A todo list manager",
}

var addCmd = &cobra.Command{
	Use:   "add [task]",
	Short: "Add a new task",
	Args:  cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Printf("Added: %s\\n", args[0])
	},
}

var listCmd = &cobra.Command{
	Use:   "list",
	Short: "List all tasks",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("No tasks yet")
	},
}

func init() {
	addCmd.AddCommand(rootCmd)
	listCmd.AddCommand(rootCmd)
}

func main() {
	if err := rootCmd.Execute(); err != nil {
		os.Exit(1)
	}
}`,
			solution: `package main

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "todo",
	Short: "A todo list manager",
}

var addCmd = &cobra.Command{
	Use:   "add [task]",
	Short: "Add a new task",
	Args:  cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Printf("Added: %s\\n", args[0])
	},
}

var listCmd = &cobra.Command{
	Use:   "list",
	Short: "List all tasks",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("No tasks yet")
	},
}

func init() {
	rootCmd.AddCommand(addCmd)
	rootCmd.AddCommand(listCmd)
}

func main() {
	if err := rootCmd.Execute(); err != nil {
		os.Exit(1)
	}
}`,
			hints: [
				'AddCommand adds a child command to the receiver.',
				'Subcommands should be added TO the root, not the other way around.',
				'The pattern is parent.AddCommand(child).',
			],
			concepts: ['cobra', 'command-registration', 'debugging'],
		},
		{
			id: 'go-cobra-14',
			title: 'Fix Flag Binding Bug',
			type: 'fix-bug',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Fix the flag binding so the verbose flag works across all subcommands.',
			skeleton: `package main

import (
	"fmt"

	"github.com/spf13/cobra"
)

var verbose bool

var rootCmd = &cobra.Command{
	Use:   "app",
	Short: "My app",
}

var statusCmd = &cobra.Command{
	Use:   "status",
	Short: "Show status",
	Run: func(cmd *cobra.Command, args []string) {
		if verbose {
			fmt.Println("Verbose: checking all systems...")
		}
		fmt.Println("Status: OK")
	},
}

func init() {
	rootCmd.Flags().BoolVarP(&verbose, "verbose", "v", false, "verbose output")
	rootCmd.AddCommand(statusCmd)
}`,
			solution: `package main

import (
	"fmt"

	"github.com/spf13/cobra"
)

var verbose bool

var rootCmd = &cobra.Command{
	Use:   "app",
	Short: "My app",
}

var statusCmd = &cobra.Command{
	Use:   "status",
	Short: "Show status",
	Run: func(cmd *cobra.Command, args []string) {
		if verbose {
			fmt.Println("Verbose: checking all systems...")
		}
		fmt.Println("Status: OK")
	},
}

func init() {
	rootCmd.PersistentFlags().BoolVarP(&verbose, "verbose", "v", false, "verbose output")
	rootCmd.AddCommand(statusCmd)
}`,
			hints: [
				'Flags() only applies to the specific command, not its children.',
				'PersistentFlags() makes flags available to all subcommands.',
				'The verbose flag needs to be accessible from the status subcommand.',
			],
			concepts: ['cobra', 'persistent-flags', 'flag-scope', 'debugging'],
		},
		{
			id: 'go-cobra-15',
			title: 'Fix RunE Error Swallowing',
			type: 'fix-bug',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Fix the command that silently ignores errors from RunE.',
			skeleton: `package main

import (
	"fmt"
	"os"
	"strconv"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "calc",
	Short: "Calculator",
}

var squareCmd = &cobra.Command{
	Use:   "square [number]",
	Short: "Square a number",
	Args:  cobra.ExactArgs(1),
	RunE: func(cmd *cobra.Command, args []string) error {
		n, err := strconv.ParseFloat(args[0], 64)
		if err != nil {
			return fmt.Errorf("invalid number %q: %w", args[0], err)
		}
		fmt.Printf("%.2f\\n", n*n)
		return nil
	},
}

func init() {
	rootCmd.AddCommand(squareCmd)
}

func main() {
	rootCmd.SilenceErrors = true
	rootCmd.SilenceUsage = true
	rootCmd.Execute()
}`,
			solution: `package main

import (
	"fmt"
	"os"
	"strconv"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "calc",
	Short: "Calculator",
}

var squareCmd = &cobra.Command{
	Use:   "square [number]",
	Short: "Square a number",
	Args:  cobra.ExactArgs(1),
	RunE: func(cmd *cobra.Command, args []string) error {
		n, err := strconv.ParseFloat(args[0], 64)
		if err != nil {
			return fmt.Errorf("invalid number %q: %w", args[0], err)
		}
		fmt.Printf("%.2f\\n", n*n)
		return nil
	},
}

func init() {
	rootCmd.AddCommand(squareCmd)
}

func main() {
	rootCmd.SilenceUsage = true
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}`,
			hints: [
				'SilenceErrors = true suppresses error printing, so errors are lost if not handled.',
				'Execute() returns an error that must be checked.',
				'Remove SilenceErrors or handle the error from Execute().',
			],
			concepts: ['cobra', 'error-handling', 'silence-errors', 'debugging'],
		},
		{
			id: 'go-cobra-16',
			title: 'Predict Flag Default Output',
			type: 'predict-output',
			difficulty: 'beginner',
			language: 'go',
			goal: 'Predict what happens when a command runs without providing a flag.',
			skeleton: `package main

import (
	"fmt"
	"github.com/spf13/cobra"
)

func main() {
	var count int
	cmd := &cobra.Command{
		Use: "repeat",
		Run: func(cmd *cobra.Command, args []string) {
			for i := 0; i < count; i++ {
				fmt.Print("Go ")
			}
			fmt.Println()
		},
	}
	cmd.Flags().IntVarP(&count, "count", "c", 3, "repetitions")
	cmd.SetArgs([]string{})
	cmd.Execute()
}`,
			solution: `Go Go Go `,
			hints: [
				'No --count flag is passed, so the default value is used.',
				'The default for count is 3.',
				'The loop prints "Go " three times, then a newline.',
			],
			concepts: ['cobra', 'flag-defaults', 'output-prediction'],
		},
		{
			id: 'go-cobra-17',
			title: 'Predict Subcommand Behavior',
			type: 'predict-output',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Predict which Run function executes when calling a subcommand.',
			skeleton: `package main

import (
	"fmt"
	"github.com/spf13/cobra"
)

func main() {
	root := &cobra.Command{
		Use: "app",
		PersistentPreRun: func(cmd *cobra.Command, args []string) {
			fmt.Println("A")
		},
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Println("B")
		},
	}
	child := &cobra.Command{
		Use: "child",
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Println("C")
		},
	}
	root.AddCommand(child)
	root.SetArgs([]string{"child"})
	root.Execute()
}`,
			solution: `A
C`,
			hints: [
				'PersistentPreRun is inherited by all subcommands.',
				'When "child" subcommand runs, PersistentPreRun fires first.',
				'The root Run is NOT called when a subcommand is invoked.',
			],
			concepts: ['cobra', 'persistent-prerun', 'command-lifecycle'],
		},
		{
			id: 'go-cobra-18',
			title: 'Predict Args Validation Error',
			type: 'predict-output',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Predict how Cobra handles invalid argument count.',
			skeleton: `package main

import (
	"fmt"
	"github.com/spf13/cobra"
)

func main() {
	cmd := &cobra.Command{
		Use:  "greet",
		Args: cobra.RangeArgs(1, 3),
		RunE: func(cmd *cobra.Command, args []string) error {
			for _, name := range args {
				fmt.Printf("Hi %s!\\n", name)
			}
			return nil
		},
	}
	cmd.SilenceUsage = true
	cmd.SetArgs([]string{"Alice", "Bob"})
	if err := cmd.Execute(); err != nil {
		fmt.Println("Error:", err)
	}
}`,
			solution: `Hi Alice!
Hi Bob!`,
			hints: [
				'RangeArgs(1, 3) accepts 1, 2, or 3 arguments.',
				'Two arguments ("Alice", "Bob") is within the valid range.',
				'The RunE function executes normally and prints greetings.',
			],
			concepts: ['cobra', 'range-args', 'argument-validation'],
		},
		{
			id: 'go-cobra-19',
			title: 'Refactor Duplicate Flag Setup',
			type: 'refactor',
			difficulty: 'intermediate',
			language: 'go',
			goal: 'Refactor repetitive flag definitions into a shared setup function.',
			skeleton: `package main

import (
	"fmt"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{Use: "db"}

var migrateCmd = &cobra.Command{
	Use:   "migrate",
	Short: "Run migrations",
	RunE: func(cmd *cobra.Command, args []string) error {
		host, _ := cmd.Flags().GetString("host")
		port, _ := cmd.Flags().GetInt("port")
		user, _ := cmd.Flags().GetString("user")
		pass, _ := cmd.Flags().GetString("password")
		dbname, _ := cmd.Flags().GetString("dbname")
		fmt.Printf("Migrating %s@%s:%d/%s\\n", user, host, port, dbname)
		_ = pass
		return nil
	},
}

var seedCmd = &cobra.Command{
	Use:   "seed",
	Short: "Seed data",
	RunE: func(cmd *cobra.Command, args []string) error {
		host, _ := cmd.Flags().GetString("host")
		port, _ := cmd.Flags().GetInt("port")
		user, _ := cmd.Flags().GetString("user")
		pass, _ := cmd.Flags().GetString("password")
		dbname, _ := cmd.Flags().GetString("dbname")
		fmt.Printf("Seeding %s@%s:%d/%s\\n", user, host, port, dbname)
		_ = pass
		return nil
	},
}

var backupCmd = &cobra.Command{
	Use:   "backup",
	Short: "Backup database",
	RunE: func(cmd *cobra.Command, args []string) error {
		host, _ := cmd.Flags().GetString("host")
		port, _ := cmd.Flags().GetInt("port")
		user, _ := cmd.Flags().GetString("user")
		pass, _ := cmd.Flags().GetString("password")
		dbname, _ := cmd.Flags().GetString("dbname")
		fmt.Printf("Backing up %s@%s:%d/%s\\n", user, host, port, dbname)
		_ = pass
		return nil
	},
}

func init() {
	migrateCmd.Flags().String("host", "localhost", "database host")
	migrateCmd.Flags().Int("port", 5432, "database port")
	migrateCmd.Flags().String("user", "postgres", "database user")
	migrateCmd.Flags().String("password", "", "database password")
	migrateCmd.Flags().String("dbname", "app", "database name")

	seedCmd.Flags().String("host", "localhost", "database host")
	seedCmd.Flags().Int("port", 5432, "database port")
	seedCmd.Flags().String("user", "postgres", "database user")
	seedCmd.Flags().String("password", "", "database password")
	seedCmd.Flags().String("dbname", "app", "database name")

	backupCmd.Flags().String("host", "localhost", "database host")
	backupCmd.Flags().Int("port", 5432, "database port")
	backupCmd.Flags().String("user", "postgres", "database user")
	backupCmd.Flags().String("password", "", "database password")
	backupCmd.Flags().String("dbname", "app", "database name")

	rootCmd.AddCommand(migrateCmd, seedCmd, backupCmd)
}`,
			solution: `package main

import (
	"fmt"

	"github.com/spf13/cobra"
)

type dbConfig struct {
	Host     string
	Port     int
	User     string
	Password string
	DBName   string
}

func getDBConfig(cmd *cobra.Command) dbConfig {
	host, _ := cmd.Flags().GetString("host")
	port, _ := cmd.Flags().GetInt("port")
	user, _ := cmd.Flags().GetString("user")
	pass, _ := cmd.Flags().GetString("password")
	dbname, _ := cmd.Flags().GetString("dbname")
	return dbConfig{Host: host, Port: port, User: user, Password: pass, DBName: dbname}
}

func addDBFlags(cmd *cobra.Command) {
	cmd.Flags().String("host", "localhost", "database host")
	cmd.Flags().Int("port", 5432, "database port")
	cmd.Flags().String("user", "postgres", "database user")
	cmd.Flags().String("password", "", "database password")
	cmd.Flags().String("dbname", "app", "database name")
}

var rootCmd = &cobra.Command{Use: "db"}

var migrateCmd = &cobra.Command{
	Use:   "migrate",
	Short: "Run migrations",
	RunE: func(cmd *cobra.Command, args []string) error {
		cfg := getDBConfig(cmd)
		fmt.Printf("Migrating %s@%s:%d/%s\\n", cfg.User, cfg.Host, cfg.Port, cfg.DBName)
		return nil
	},
}

var seedCmd = &cobra.Command{
	Use:   "seed",
	Short: "Seed data",
	RunE: func(cmd *cobra.Command, args []string) error {
		cfg := getDBConfig(cmd)
		fmt.Printf("Seeding %s@%s:%d/%s\\n", cfg.User, cfg.Host, cfg.Port, cfg.DBName)
		return nil
	},
}

var backupCmd = &cobra.Command{
	Use:   "backup",
	Short: "Backup database",
	RunE: func(cmd *cobra.Command, args []string) error {
		cfg := getDBConfig(cmd)
		fmt.Printf("Backing up %s@%s:%d/%s\\n", cfg.User, cfg.Host, cfg.Port, cfg.DBName)
		return nil
	},
}

func init() {
	for _, cmd := range []*cobra.Command{migrateCmd, seedCmd, backupCmd} {
		addDBFlags(cmd)
	}
	rootCmd.AddCommand(migrateCmd, seedCmd, backupCmd)
}`,
			hints: [
				'Extract the repeated flag definitions into a helper function.',
				'Create a struct to hold database config and a function to extract it from flags.',
				'Loop over commands to apply the shared flags.',
			],
			concepts: ['cobra', 'refactoring', 'dry-principle', 'helper-functions'],
		},
		{
			id: 'go-cobra-20',
			title: 'Refactor to Command Groups',
			type: 'refactor',
			difficulty: 'advanced',
			language: 'go',
			goal: 'Refactor flat command structure into organized command groups with constructors.',
			skeleton: `package main

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{Use: "cloud"}

var createVMCmd = &cobra.Command{
	Use: "create-vm", Short: "Create a VM",
	Run: func(cmd *cobra.Command, args []string) {
		name, _ := cmd.Flags().GetString("name")
		size, _ := cmd.Flags().GetString("size")
		fmt.Printf("Creating VM %s (%s)\\n", name, size)
	},
}

var deleteVMCmd = &cobra.Command{
	Use: "delete-vm", Short: "Delete a VM",
	Run: func(cmd *cobra.Command, args []string) {
		name, _ := cmd.Flags().GetString("name")
		fmt.Printf("Deleting VM %s\\n", name)
	},
}

var listVMCmd = &cobra.Command{
	Use: "list-vms", Short: "List VMs",
	Run: func(cmd *cobra.Command, args []string) { fmt.Println("Listing VMs") },
}

var createDBCmd = &cobra.Command{
	Use: "create-db", Short: "Create a database",
	Run: func(cmd *cobra.Command, args []string) {
		name, _ := cmd.Flags().GetString("name")
		engine, _ := cmd.Flags().GetString("engine")
		fmt.Printf("Creating DB %s (%s)\\n", name, engine)
	},
}

var deleteDBCmd = &cobra.Command{
	Use: "delete-db", Short: "Delete a database",
	Run: func(cmd *cobra.Command, args []string) {
		name, _ := cmd.Flags().GetString("name")
		fmt.Printf("Deleting DB %s\\n", name)
	},
}

var listDBCmd = &cobra.Command{
	Use: "list-dbs", Short: "List databases",
	Run: func(cmd *cobra.Command, args []string) { fmt.Println("Listing databases") },
}

func init() {
	createVMCmd.Flags().String("name", "", "VM name")
	createVMCmd.Flags().String("size", "small", "VM size")
	deleteVMCmd.Flags().String("name", "", "VM name")
	createDBCmd.Flags().String("name", "", "DB name")
	createDBCmd.Flags().String("engine", "postgres", "DB engine")
	deleteDBCmd.Flags().String("name", "", "DB name")
	rootCmd.AddCommand(createVMCmd, deleteVMCmd, listVMCmd, createDBCmd, deleteDBCmd, listDBCmd)
}

func main() {
	if err := rootCmd.Execute(); err != nil {
		os.Exit(1)
	}
}`,
			solution: `package main

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

func newVMCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "vm",
		Short: "Manage virtual machines",
	}

	create := &cobra.Command{
		Use:   "create",
		Short: "Create a VM",
		Run: func(cmd *cobra.Command, args []string) {
			name, _ := cmd.Flags().GetString("name")
			size, _ := cmd.Flags().GetString("size")
			fmt.Printf("Creating VM %s (%s)\\n", name, size)
		},
	}
	create.Flags().String("name", "", "VM name")
	create.Flags().String("size", "small", "VM size")

	del := &cobra.Command{
		Use:   "delete",
		Short: "Delete a VM",
		Run: func(cmd *cobra.Command, args []string) {
			name, _ := cmd.Flags().GetString("name")
			fmt.Printf("Deleting VM %s\\n", name)
		},
	}
	del.Flags().String("name", "", "VM name")

	list := &cobra.Command{
		Use:   "list",
		Short: "List VMs",
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Println("Listing VMs")
		},
	}

	cmd.AddCommand(create, del, list)
	return cmd
}

func newDBCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "db",
		Short: "Manage databases",
	}

	create := &cobra.Command{
		Use:   "create",
		Short: "Create a database",
		Run: func(cmd *cobra.Command, args []string) {
			name, _ := cmd.Flags().GetString("name")
			engine, _ := cmd.Flags().GetString("engine")
			fmt.Printf("Creating DB %s (%s)\\n", name, engine)
		},
	}
	create.Flags().String("name", "", "DB name")
	create.Flags().String("engine", "postgres", "DB engine")

	del := &cobra.Command{
		Use:   "delete",
		Short: "Delete a database",
		Run: func(cmd *cobra.Command, args []string) {
			name, _ := cmd.Flags().GetString("name")
			fmt.Printf("Deleting DB %s\\n", name)
		},
	}
	del.Flags().String("name", "", "DB name")

	list := &cobra.Command{
		Use:   "list",
		Short: "List databases",
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Println("Listing databases")
		},
	}

	cmd.AddCommand(create, del, list)
	return cmd
}

var rootCmd = &cobra.Command{
	Use:   "cloud",
	Short: "Cloud resource manager",
}

func init() {
	rootCmd.AddCommand(newVMCmd())
	rootCmd.AddCommand(newDBCmd())
}

func main() {
	if err := rootCmd.Execute(); err != nil {
		os.Exit(1)
	}
}`,
			hints: [
				'Group related commands under parent commands (cloud vm create, cloud db list).',
				'Use constructor functions (newVMCmd, newDBCmd) to encapsulate command setup.',
				'This gives a structure like: cloud vm create/delete/list and cloud db create/delete/list.',
			],
			concepts: ['cobra', 'command-groups', 'refactoring', 'cli-organization'],
		},
	],
};
