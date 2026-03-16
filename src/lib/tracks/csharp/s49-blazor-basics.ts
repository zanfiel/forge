import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-blazor',
  title: '49. Blazor Basics',
  explanation: `## Blazor Basics

Blazor is a framework for building interactive web UIs with C# instead of JavaScript. Components are written in Razor syntax (.razor files) combining HTML markup with C# logic.

\`\`\`csharp
// Counter.razor
<h1>Count: @count</h1>
<button @onclick="Increment">Click me</button>

@code {
    private int count = 0;
    private void Increment() => count++;
}
\`\`\`

### Component Parameters

\`\`\`csharp
// Greeting.razor
<h2>Hello, @Name!</h2>

@code {
    [Parameter]
    public string Name { get; set; } = "World";
}

// Usage: <Greeting Name="Alice" />
\`\`\`

### Event Handling

\`\`\`csharp
<input @bind="searchText" @bind:event="oninput" />
<button @onclick="Search">Search</button>

@code {
    private string searchText = "";
    private void Search() { /* ... */ }
}
\`\`\`

### Lifecycle Methods

- \`OnInitialized / OnInitializedAsync\` - component is ready
- \`OnParametersSet / OnParametersSetAsync\` - parameters changed
- \`OnAfterRender / OnAfterRenderAsync\` - DOM has been updated
- \`Dispose\` - cleanup (implement IDisposable)

### Data Binding

\`\`\`csharp
<input @bind="name" />                    // binds on change
<input @bind="name" @bind:event="oninput" /> // binds on input
<input @bind:get="name" @bind:set="SetName" /> // custom binding
\`\`\`

### Cascading Parameters

\`\`\`csharp
// Parent
<CascadingValue Value="@theme">
    <ChildComponent />
</CascadingValue>

// Child
@code {
    [CascadingParameter]
    public Theme? CurrentTheme { get; set; }
}
\`\`\``,
  exercises: [
    {
      id: 'cs-blazor-1',
      title: '@code Block',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a @code block in a Blazor component.',
      skeleton: `<h1>@message</h1>

__BLANK__ {
    private string message = "Hello Blazor!";
}`,
      solution: `<h1>@message</h1>

@code {
    private string message = "Hello Blazor!";
}`,
      hints: ['This Razor directive defines the C# code section.', 'It contains fields, properties, and methods for the component.', 'The answer is: @code'],
      concepts: ['@code', 'Razor syntax', 'component logic'],
    },
    {
      id: 'cs-blazor-2',
      title: 'Parameter Attribute',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Mark a property as a component parameter.',
      skeleton: `@code {
    [__BLANK__]
    public string Title { get; set; } = "";
}`,
      solution: `@code {
    [Parameter]
    public string Title { get; set; } = "";
}`,
      hints: ['This attribute makes a property settable from parent components.', 'It enables <MyComponent Title="Hello" />.', 'The answer is: Parameter'],
      concepts: ['[Parameter]', 'component parameters', 'data flow'],
    },
    {
      id: 'cs-blazor-3',
      title: 'Event Callback',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Define an EventCallback parameter for parent-child communication.',
      skeleton: `@code {
    [Parameter]
    public __BLANK__<string> OnSubmit { get; set; }

    private async Task Submit() =>
        await OnSubmit.InvokeAsync("submitted");
}`,
      solution: `@code {
    [Parameter]
    public EventCallback<string> OnSubmit { get; set; }

    private async Task Submit() =>
        await OnSubmit.InvokeAsync("submitted");
}`,
      hints: ['This type is used for component events in Blazor.', 'It is generic and carries a payload type.', 'The answer is: EventCallback'],
      concepts: ['EventCallback<T>', 'parent-child events', 'InvokeAsync'],
    },
    {
      id: 'cs-blazor-4',
      title: 'onclick Handler',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Bind a click event to a method in Blazor.',
      skeleton: `<button __BLANK__="HandleClick">Click Me</button>

@code {
    private void HandleClick() => Console.WriteLine("Clicked!");
}`,
      solution: `<button @onclick="HandleClick">Click Me</button>

@code {
    private void HandleClick() => Console.WriteLine("Clicked!");
}`,
      hints: ['Blazor uses @ prefix for event directives.', 'The directive name matches the DOM event name.', 'The answer is: @onclick'],
      concepts: ['@onclick', 'event handling', 'Razor directive'],
    },
    {
      id: 'cs-blazor-5',
      title: 'Two-Way Binding',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Bind an input element to a property with two-way binding.',
      skeleton: `<input __BLANK__="username" />
<p>Hello, @username!</p>

@code {
    private string username = "";
}`,
      solution: `<input @bind="username" />
<p>Hello, @username!</p>

@code {
    private string username = "";
}`,
      hints: ['This directive creates two-way data binding.', 'Changes to the input update the field and vice versa.', 'The answer is: @bind'],
      concepts: ['@bind', 'two-way binding', 'input binding'],
    },
    {
      id: 'cs-blazor-6',
      title: 'CascadingParameter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Receive a cascading value from a parent component.',
      skeleton: `@code {
    [__BLANK__]
    public AppTheme? Theme { get; set; }
}`,
      solution: `@code {
    [CascadingParameter]
    public AppTheme? Theme { get; set; }
}`,
      hints: ['This attribute receives values from CascadingValue components.', 'Values flow down the component tree without explicit passing.', 'The answer is: CascadingParameter'],
      concepts: ['[CascadingParameter]', 'CascadingValue', 'implicit data flow'],
    },
    {
      id: 'cs-blazor-7',
      title: 'Counter Component',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Write a complete Blazor Counter component with increment and decrement buttons.',
      skeleton: `// Counter.razor
// Display current count
// Two buttons: Increment (+1) and Decrement (-1)
// Count should not go below 0`,
      solution: `<h3>Count: @count</h3>
<button @onclick="Increment">Increment</button>
<button @onclick="Decrement">Decrement</button>

@code {
    private int count = 0;

    private void Increment() => count++;

    private void Decrement()
    {
        if (count > 0) count--;
    }
}`,
      hints: ['Use @onclick to bind button events.', 'Display the count with @count in the markup.', 'Guard against negative values in Decrement.'],
      concepts: ['component state', '@onclick', 'conditional logic'],
    },
    {
      id: 'cs-blazor-8',
      title: 'Todo List Component',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a Blazor todo list component with add and remove functionality.',
      skeleton: `// TodoList.razor
// Input field bound to newItem string
// Add button that adds to list
// Display items with remove buttons
// Use List<string> for storage`,
      solution: `<input @bind="newItem" placeholder="New todo..." />
<button @onclick="AddItem" disabled="@string.IsNullOrWhiteSpace(newItem)">Add</button>

<ul>
    @foreach (var item in items)
    {
        <li>
            @item
            <button @onclick="() => RemoveItem(item)">Remove</button>
        </li>
    }
</ul>

@code {
    private string newItem = "";
    private List<string> items = new();

    private void AddItem()
    {
        if (!string.IsNullOrWhiteSpace(newItem))
        {
            items.Add(newItem.Trim());
            newItem = "";
        }
    }

    private void RemoveItem(string item) => items.Remove(item);
}`,
      hints: ['Use @bind for the input and @onclick for buttons.', 'Use a lambda in @onclick to pass the item to RemoveItem.', 'Clear the input after adding.'],
      concepts: ['list rendering', '@foreach', 'event with arguments'],
    },
    {
      id: 'cs-blazor-9',
      title: 'Component with Lifecycle',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a component that fetches data in OnInitializedAsync and shows a loading state.',
      skeleton: `// WeatherDisplay.razor
// Show "Loading..." while data is being fetched
// Call IWeatherService.GetForecastAsync() in OnInitializedAsync
// Display forecast data when loaded
// Handle errors with try/catch`,
      solution: `@inject IWeatherService WeatherService

@if (isLoading)
{
    <p>Loading...</p>
}
else if (error is not null)
{
    <p class="error">Error: @error</p>
}
else
{
    <h3>Weather Forecast</h3>
    <ul>
        @foreach (var forecast in forecasts)
        {
            <li>@forecast.Date.ToShortDateString(): @forecast.Temperature C</li>
        }
    </ul>
}

@code {
    private List<Forecast> forecasts = new();
    private bool isLoading = true;
    private string? error;

    protected override async Task OnInitializedAsync()
    {
        try
        {
            forecasts = await WeatherService.GetForecastAsync();
        }
        catch (Exception ex)
        {
            error = ex.Message;
        }
        finally
        {
            isLoading = false;
        }
    }
}`,
      hints: ['Override OnInitializedAsync for async initialization.', 'Use a boolean flag for loading state.', 'Wrap the async call in try/catch for error handling.'],
      concepts: ['OnInitializedAsync', 'loading state', 'error handling', '@inject'],
    },
    {
      id: 'cs-blazor-10',
      title: 'Form with Validation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a Blazor form with data annotation validation.',
      skeleton: `// Create a model class with validation attributes
// Build an EditForm with input components
// Show validation messages
// Handle valid form submission`,
      solution: `@using System.ComponentModel.DataAnnotations

<EditForm Model="@model" OnValidSubmit="HandleSubmit">
    <DataAnnotationsValidator />
    <ValidationSummary />

    <div>
        <label>Name:</label>
        <InputText @bind-Value="model.Name" />
        <ValidationMessage For="() => model.Name" />
    </div>

    <div>
        <label>Email:</label>
        <InputText @bind-Value="model.Email" />
        <ValidationMessage For="() => model.Email" />
    </div>

    <div>
        <label>Age:</label>
        <InputNumber @bind-Value="model.Age" />
        <ValidationMessage For="() => model.Age" />
    </div>

    <button type="submit">Submit</button>
</EditForm>

@if (submitted)
{
    <p>Form submitted for @model.Name!</p>
}

@code {
    private UserModel model = new();
    private bool submitted;

    private void HandleSubmit()
    {
        submitted = true;
    }

    public class UserModel
    {
        [Required(ErrorMessage = "Name is required")]
        [StringLength(50)]
        public string Name { get; set; } = "";

        [Required]
        [EmailAddress(ErrorMessage = "Invalid email")]
        public string Email { get; set; } = "";

        [Range(1, 120, ErrorMessage = "Age must be between 1 and 120")]
        public int Age { get; set; }
    }
}`,
      hints: ['Use EditForm with DataAnnotationsValidator.', 'InputText and InputNumber are built-in form components.', 'OnValidSubmit fires only when validation passes.'],
      concepts: ['EditForm', 'DataAnnotationsValidator', 'InputText', 'ValidationMessage'],
    },
    {
      id: 'cs-blazor-11',
      title: 'Parent-Child Communication',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write parent and child components that communicate via Parameter and EventCallback.',
      skeleton: `// RatingSelector.razor (child)
// - Parameter: int Value (current rating)
// - EventCallback<int> ValueChanged
// - Render 5 star buttons
// - Clicking a star invokes ValueChanged with that rating

// Parent usage: <RatingSelector @bind-Value="rating" />`,
      solution: `@* RatingSelector.razor *@
@for (int i = 1; i <= 5; i++)
{
    var star = i;
    <button @onclick="() => SetRating(star)"
            style="color: @(star <= Value ? "gold" : "gray"); cursor: pointer; border: none; background: none; font-size: 1.5rem;">
        *
    </button>
}

@code {
    [Parameter]
    public int Value { get; set; }

    [Parameter]
    public EventCallback<int> ValueChanged { get; set; }

    private async Task SetRating(int rating)
    {
        await ValueChanged.InvokeAsync(rating);
    }
}

@* Parent usage:
<RatingSelector @bind-Value="rating" />
<p>Rating: @rating</p>

@code {
    private int rating = 3;
}
*@`,
      hints: ['Name the callback {PropertyName}Changed for @bind support.', 'Use a local variable to capture the loop variable.', 'InvokeAsync notifies the parent of the new value.'],
      concepts: ['@bind custom component', 'EventCallback', 'two-way binding'],
    },
    {
      id: 'cs-blazor-12',
      title: 'RenderFragment',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Create a Card component that uses RenderFragment for templated content.',
      skeleton: `// Card.razor
// - Parameter: string Title
// - Parameter: RenderFragment ChildContent
// - Parameter: RenderFragment? Footer (optional)
// Render a card with header, body, and optional footer`,
      solution: `<div class="card">
    <div class="card-header">
        <h3>@Title</h3>
    </div>
    <div class="card-body">
        @ChildContent
    </div>
    @if (Footer is not null)
    {
        <div class="card-footer">
            @Footer
        </div>
    }
</div>

@code {
    [Parameter]
    public string Title { get; set; } = "";

    [Parameter]
    public RenderFragment ChildContent { get; set; } = default!;

    [Parameter]
    public RenderFragment? Footer { get; set; }
}

@* Usage:
<Card Title="My Card">
    <p>Card body content</p>
    <Footer>
        <button>Action</button>
    </Footer>
</Card>
*@`,
      hints: ['ChildContent is the default RenderFragment for content between tags.', 'Named RenderFragments become child elements with matching names.', 'Check for null before rendering optional fragments.'],
      concepts: ['RenderFragment', 'ChildContent', 'templated components'],
    },
    {
      id: 'cs-blazor-13',
      title: 'Missing @code Block',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the component that defines C# code outside a @code block.',
      skeleton: `<h1>@title</h1>
<button @onclick="Toggle">Toggle</button>

@{
    // Bug: code is in a render expression, not a @code block
    string title = "Hello";
    bool visible = true;
    void Toggle() { visible = !visible; }
}`,
      solution: `<h1>@title</h1>
<button @onclick="Toggle">Toggle</button>

@code {
    private string title = "Hello";
    private bool visible = true;
    private void Toggle() { visible = !visible; }
}`,
      hints: ['Component members must be in a @code block, not @{}.', '@{} is for inline render logic, not member declarations.', 'Replace @{ with @code {.'],
      concepts: ['@code vs @{}', 'component members', 'Razor syntax'],
    },
    {
      id: 'cs-blazor-14',
      title: 'Loop Variable Capture',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the Blazor loop that captures the wrong variable in event handlers.',
      skeleton: `<ul>
@for (int i = 0; i < items.Count; i++)
{
    <li>
        @items[i]
        @* Bug: all buttons will use the final value of i *@
        <button @onclick="() => Remove(i)">X</button>
    </li>
}
</ul>

@code {
    private List<string> items = new() { "A", "B", "C" };
    private void Remove(int index) => items.RemoveAt(index);
}`,
      solution: `<ul>
@for (int i = 0; i < items.Count; i++)
{
    var index = i;
    <li>
        @items[index]
        <button @onclick="() => Remove(index)">X</button>
    </li>
}
</ul>

@code {
    private List<string> items = new() { "A", "B", "C" };
    private void Remove(int index) => items.RemoveAt(index);
}`,
      hints: ['Lambda closures capture the variable, not the value.', 'Create a local variable inside the loop to capture the current value.', 'var index = i; fixes the closure issue.'],
      concepts: ['closure capture', 'loop variable', 'lambda in loops'],
    },
    {
      id: 'cs-blazor-15',
      title: 'Async Lifecycle Missing Await',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the async lifecycle method that does not properly await.',
      skeleton: `@code {
    private List<Product> products = new();

    // Bug: not awaiting the async call
    protected override Task OnInitializedAsync()
    {
        products = Http.GetFromJsonAsync<List<Product>>("/api/products");
        return Task.CompletedTask;
    }
}`,
      solution: `@code {
    private List<Product> products = new();

    protected override async Task OnInitializedAsync()
    {
        products = await Http.GetFromJsonAsync<List<Product>>("/api/products") ?? new();
    }
}`,
      hints: ['GetFromJsonAsync returns a Task that must be awaited.', 'Add async and await to the lifecycle method.', 'Handle possible null return with ?? new().'],
      concepts: ['async lifecycle', 'await', 'OnInitializedAsync'],
    },
    {
      id: 'cs-blazor-16',
      title: 'Predict Render Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict what a simple Blazor component renders.',
      skeleton: `<h1>@GetGreeting()</h1>
<p>Items: @items.Count</p>

@code {
    private List<string> items = new() { "A", "B", "C" };
    private string GetGreeting() => $"Hello ({items.Count})";
}

// What HTML is rendered?`,
      solution: `<h1>Hello (3)</h1><p>Items: 3</p>`,
      hints: ['GetGreeting() returns "Hello (3)" since items has 3 elements.', '@items.Count evaluates to 3.', 'Blazor renders the C# expressions inline.'],
      concepts: ['Razor rendering', 'expression evaluation', 'method calls'],
    },
    {
      id: 'cs-blazor-17',
      title: 'Predict Lifecycle Order',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the order of Blazor lifecycle method calls.',
      skeleton: `@code {
    protected override void OnInitialized()
    {
        Console.Write("Init ");
    }

    protected override void OnParametersSet()
    {
        Console.Write("Params ");
    }

    protected override void OnAfterRender(bool firstRender)
    {
        if (firstRender)
            Console.Write("FirstRender ");
        else
            Console.Write("ReRender ");
    }
}

// On first render, what is the order?`,
      solution: `Init Params FirstRender `,
      hints: ['OnInitialized runs first when the component is created.', 'OnParametersSet runs after parameters are assigned.', 'OnAfterRender runs after the DOM is updated (firstRender=true on first call).'],
      concepts: ['lifecycle order', 'OnInitialized', 'OnParametersSet', 'OnAfterRender'],
    },
    {
      id: 'cs-blazor-18',
      title: 'Predict Conditional Render',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict which elements render based on conditional logic.',
      skeleton: `@if (isAdmin)
{
    <p>Admin Panel</p>
}
else if (isLoggedIn)
{
    <p>Welcome</p>
}
else
{
    <p>Please Login</p>
}

@code {
    private bool isAdmin = false;
    private bool isLoggedIn = true;
}

// What HTML is rendered?`,
      solution: `<p>Welcome</p>`,
      hints: ['isAdmin is false, so the first block is skipped.', 'isLoggedIn is true, so the else if block renders.', 'Only one branch of if/else if/else renders.'],
      concepts: ['conditional rendering', '@if', 'Razor branching'],
    },
    {
      id: 'cs-blazor-19',
      title: 'Refactor Code-Behind',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor a Blazor component to use a code-behind partial class.',
      skeleton: `@* SearchPage.razor - everything in one file *@
@page "/search"
@inject ISearchService SearchService

<input @bind="query" />
<button @onclick="Search">Search</button>

@if (results.Any())
{
    <ul>
        @foreach (var r in results)
        {
            <li>@r.Title</li>
        }
    </ul>
}

@code {
    private string query = "";
    private List<SearchResult> results = new();

    private async Task Search()
    {
        if (!string.IsNullOrWhiteSpace(query))
            results = await SearchService.SearchAsync(query);
    }
}`,
      solution: `@* SearchPage.razor - markup only *@
@page "/search"

<input @bind="query" />
<button @onclick="Search">Search</button>

@if (results.Any())
{
    <ul>
        @foreach (var r in results)
        {
            <li>@r.Title</li>
        }
    </ul>
}

// SearchPage.razor.cs - code-behind
public partial class SearchPage
{
    [Inject]
    private ISearchService SearchService { get; set; } = default!;

    private string query = "";
    private List<SearchResult> results = new();

    private async Task Search()
    {
        if (!string.IsNullOrWhiteSpace(query))
            results = await SearchService.SearchAsync(query);
    }
}`,
      hints: ['Use a partial class in a .razor.cs file.', 'Replace @inject with [Inject] attribute.', 'The .razor file keeps only markup, no @code block.'],
      concepts: ['code-behind', 'partial class', '[Inject]', 'separation of concerns'],
    },
    {
      id: 'cs-blazor-20',
      title: 'Refactor to Reusable Component',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Extract a repeated UI pattern into a reusable Blazor component.',
      skeleton: `@* Repeated pattern across multiple pages *@
<div class="alert alert-info">
    <strong>Info:</strong> This is an informational message.
    <button @onclick="() => showInfo = false">Dismiss</button>
</div>

<div class="alert alert-warning">
    <strong>Warning:</strong> Please review your settings.
    <button @onclick="() => showWarning = false">Dismiss</button>
</div>

<div class="alert alert-error">
    <strong>Error:</strong> Something went wrong.
    <button @onclick="() => showError = false">Dismiss</button>
</div>

@code {
    private bool showInfo = true;
    private bool showWarning = true;
    private bool showError = true;
}`,
      solution: `@* Alert.razor - reusable component *@
@if (Visible)
{
    <div class="alert alert-@Level">
        <strong>@Level.ToUpperInvariant():</strong> @ChildContent
        <button @onclick="Dismiss">Dismiss</button>
    </div>
}

@code {
    [Parameter]
    public string Level { get; set; } = "info";

    [Parameter]
    public RenderFragment ChildContent { get; set; } = default!;

    [Parameter]
    public bool Visible { get; set; } = true;

    [Parameter]
    public EventCallback<bool> VisibleChanged { get; set; }

    private async Task Dismiss()
    {
        Visible = false;
        await VisibleChanged.InvokeAsync(false);
    }
}

@* Usage:
<Alert Level="info" @bind-Visible="showInfo">
    This is an informational message.
</Alert>
<Alert Level="warning" @bind-Visible="showWarning">
    Please review your settings.
</Alert>
<Alert Level="error" @bind-Visible="showError">
    Something went wrong.
</Alert>
*@`,
      hints: ['Extract the repeated pattern into a component with parameters.', 'Use RenderFragment for the message content.', 'Support @bind-Visible with Visible and VisibleChanged.'],
      concepts: ['reusable components', 'RenderFragment', '@bind support', 'component extraction'],
    },
  ],
};
