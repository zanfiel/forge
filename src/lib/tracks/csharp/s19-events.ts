import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-events',
  title: '19. Events',
  explanation: `## Events

Events enable a class to notify subscribers when something happens. They are built on delegates but add encapsulation: only the declaring class can raise the event.

\`\`\`csharp
class Button
{
    // Declare event using EventHandler pattern
    public event EventHandler<ClickEventArgs>? Clicked;

    public void SimulateClick()
    {
        Clicked?.Invoke(this, new ClickEventArgs(DateTime.Now));
    }
}

class ClickEventArgs : EventArgs
{
    public DateTime Time { get; }
    public ClickEventArgs(DateTime time) => Time = time;
}

// Subscribe
var btn = new Button();
btn.Clicked += (sender, e) => Console.WriteLine($"Clicked at {e.Time}");
btn.SimulateClick();
\`\`\`

**Best practices**: Use EventHandler<T> convention, derive args from EventArgs, always check for null before raising, and unsubscribe to prevent memory leaks.`,
  exercises: [
    {
      id: 'cs-evt-1',
      title: 'Declare an Event',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare an event using EventHandler.',
      skeleton: `class Timer
{
    public __BLANK__ EventHandler? Tick;
}`,
      solution: `class Timer
{
    public event EventHandler? Tick;
}`,
      hints: ['Events are declared with the event keyword.', 'EventHandler is the standard delegate type for events.', 'The answer is: event'],
      concepts: ['event declaration', 'EventHandler'],
    },
    {
      id: 'cs-evt-2',
      title: 'Subscribe to an Event',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Subscribe a handler to an event.',
      skeleton: `var timer = new Timer();
timer.Tick __BLANK__ (sender, e) => Console.WriteLine("Tick!");`,
      solution: `var timer = new Timer();
timer.Tick += (sender, e) => Console.WriteLine("Tick!");`,
      hints: ['Use += to subscribe to an event.', 'The handler matches the EventHandler signature.', 'The answer is: +='],
      concepts: ['event subscription', '+= operator'],
    },
    {
      id: 'cs-evt-3',
      title: 'Raise an Event',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Safely raise an event.',
      skeleton: `class Alarm
{
    public event EventHandler? Triggered;

    public void Ring()
    {
        Triggered__BLANK__(this, EventArgs.Empty);
    }
}`,
      solution: `class Alarm
{
    public event EventHandler? Triggered;

    public void Ring()
    {
        Triggered?.Invoke(this, EventArgs.Empty);
    }
}`,
      hints: ['Use null-conditional ?. to check for subscribers.', 'Invoke calls all subscribed handlers.', 'The answer is: ?.Invoke'],
      concepts: ['raising events', 'null-conditional', 'Invoke'],
    },
    {
      id: 'cs-evt-4',
      title: 'Custom EventArgs',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Create a custom EventArgs class.',
      skeleton: `class ProgressEventArgs : __BLANK__
{
    public int Percent { get; }
    public ProgressEventArgs(int percent) => Percent = percent;
}`,
      solution: `class ProgressEventArgs : EventArgs
{
    public int Percent { get; }
    public ProgressEventArgs(int percent) => Percent = percent;
}`,
      hints: ['Custom event args derive from EventArgs.', 'EventArgs is the base class for event data.', 'The answer is: EventArgs'],
      concepts: ['custom EventArgs', 'event data'],
    },
    {
      id: 'cs-evt-5',
      title: 'Generic EventHandler',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Declare an event using generic EventHandler<T>.',
      skeleton: `class Downloader
{
    public event __BLANK__? ProgressChanged;

    protected void OnProgressChanged(int percent)
    {
        ProgressChanged?.Invoke(this, new ProgressEventArgs(percent));
    }
}`,
      solution: `class Downloader
{
    public event EventHandler<ProgressEventArgs>? ProgressChanged;

    protected void OnProgressChanged(int percent)
    {
        ProgressChanged?.Invoke(this, new ProgressEventArgs(percent));
    }
}`,
      hints: ['EventHandler<T> is the generic form for typed event args.', 'T must derive from EventArgs.', 'The answer is: EventHandler<ProgressEventArgs>'],
      concepts: ['EventHandler<T>', 'generic events'],
    },
    {
      id: 'cs-evt-6',
      title: 'Unsubscribe from Event',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Unsubscribe a handler from an event.',
      skeleton: `void Handler(object? sender, EventArgs e) => Console.WriteLine("fired");

button.Clicked += Handler;
// Later, remove the subscription:
button.Clicked __BLANK__ Handler;`,
      solution: `void Handler(object? sender, EventArgs e) => Console.WriteLine("fired");

button.Clicked += Handler;
// Later, remove the subscription:
button.Clicked -= Handler;`,
      hints: ['Use -= to unsubscribe from an event.', 'You need a reference to the same method used to subscribe.', 'The answer is: -='],
      concepts: ['unsubscribe', '-= operator', 'memory leaks'],
    },
    {
      id: 'cs-evt-7',
      title: 'Publisher-Subscriber Pattern',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a simple message broker with publish/subscribe using events.',
      skeleton: `// Write class MessageBroker with:
// - event Action<string>? MessageReceived
// - void Publish(string message)
// - Publish should raise the event`,
      solution: `class MessageBroker
{
    public event Action<string>? MessageReceived;

    public void Publish(string message)
    {
        MessageReceived?.Invoke(message);
    }
}`,
      hints: ['Action<string> is simpler than EventHandler for basic scenarios.', 'Invoke the event with the message.', 'Use ?. to safely handle no subscribers.'],
      concepts: ['pub-sub pattern', 'Action event', 'message broker'],
    },
    {
      id: 'cs-evt-8',
      title: 'PropertyChanged Event',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Implement INotifyPropertyChanged on a class.',
      skeleton: `// Write class Person : INotifyPropertyChanged with:
// - string Name property that raises PropertyChanged when set
// - event PropertyChangedEventHandler? PropertyChanged`,
      solution: `class Person : INotifyPropertyChanged
{
    private string _name = "";

    public event PropertyChangedEventHandler? PropertyChanged;

    public string Name
    {
        get => _name;
        set
        {
            if (_name != value)
            {
                _name = value;
                PropertyChanged?.Invoke(this,
                    new PropertyChangedEventArgs(nameof(Name)));
            }
        }
    }
}`,
      hints: ['INotifyPropertyChanged requires PropertyChanged event.', 'Only raise the event if the value actually changes.', 'Use nameof(Name) for the property name string.'],
      concepts: ['INotifyPropertyChanged', 'data binding', 'change notification'],
    },
    {
      id: 'cs-evt-9',
      title: 'Event Accessor',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a class with custom event accessors (add/remove).',
      skeleton: `// Write class EventAggregator with:
// - Custom add/remove accessors for event Action? Notify
// - Thread-safe subscription using lock
// - void Raise() to invoke the event`,
      solution: `class EventAggregator
{
    private readonly object _lock = new();
    private Action? _notify;

    public event Action? Notify
    {
        add { lock (_lock) { _notify += value; } }
        remove { lock (_lock) { _notify -= value; } }
    }

    public void Raise()
    {
        Action? handler;
        lock (_lock) { handler = _notify; }
        handler?.Invoke();
    }
}`,
      hints: ['Custom accessors use add { } and remove { } blocks.', 'Use a private backing delegate field.', 'Lock for thread safety in both accessors.'],
      concepts: ['event accessors', 'add/remove', 'thread safety'],
    },
    {
      id: 'cs-evt-10',
      title: 'Observable Timer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write a class that raises a Tick event every N milliseconds.',
      skeleton: `// Write class ObservableTimer with:
// - event EventHandler? Tick
// - Constructor taking int intervalMs
// - void Start() using System.Timers.Timer
// - void Stop()`,
      solution: `class ObservableTimer
{
    private readonly System.Timers.Timer _timer;
    public event EventHandler? Tick;

    public ObservableTimer(int intervalMs)
    {
        _timer = new System.Timers.Timer(intervalMs);
        _timer.Elapsed += (s, e) => Tick?.Invoke(this, EventArgs.Empty);
    }

    public void Start() => _timer.Start();
    public void Stop() => _timer.Stop();
}`,
      hints: ['System.Timers.Timer has an Elapsed event.', 'Forward the Elapsed event to your own Tick event.', 'Start and Stop control the internal timer.'],
      concepts: ['System.Timers.Timer', 'event forwarding', 'wrapper'],
    },
    {
      id: 'cs-evt-11',
      title: 'Weak Event Pattern',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Write a simple weak event handler that does not prevent garbage collection.',
      skeleton: `// Write class WeakEvent with:
// - void Subscribe(Action handler)
// - void Raise()
// - Uses WeakReference to avoid preventing GC of subscribers`,
      solution: `class WeakEvent
{
    private readonly List<WeakReference<Action>> _handlers = new();

    public void Subscribe(Action handler)
    {
        _handlers.Add(new WeakReference<Action>(handler));
    }

    public void Raise()
    {
        for (int i = _handlers.Count - 1; i >= 0; i--)
        {
            if (_handlers[i].TryGetTarget(out var handler))
                handler();
            else
                _handlers.RemoveAt(i);
        }
    }
}`,
      hints: ['WeakReference<T> does not prevent garbage collection.', 'TryGetTarget returns false if the target was collected.', 'Clean up dead references during Raise.'],
      concepts: ['weak reference', 'memory leaks', 'garbage collection'],
    },
    {
      id: 'cs-evt-12',
      title: 'Cancellable Event',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Write an event that subscribers can cancel.',
      skeleton: `// Write class CancelEventArgs : EventArgs with bool Cancel property
// Write class FileDeleter with event EventHandler<CancelEventArgs>? Deleting
// In Delete(string path), raise Deleting; if cancelled, skip deletion`,
      solution: `class CancelEventArgs : EventArgs
{
    public bool Cancel { get; set; }
}

class FileDeleter
{
    public event EventHandler<CancelEventArgs>? Deleting;

    public bool Delete(string path)
    {
        var args = new CancelEventArgs();
        Deleting?.Invoke(this, args);
        if (args.Cancel)
            return false;
        // File.Delete(path);
        return true;
    }
}`,
      hints: ['The event args have a Cancel property subscribers can set.', 'Check Cancel after raising the event.', 'This mirrors the CancelEventArgs pattern in WinForms.'],
      concepts: ['cancellable event', 'CancelEventArgs pattern'],
    },
    {
      id: 'cs-evt-13',
      title: 'Bug: Event Raised Outside Class',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the error where an event is invoked from outside its declaring class.',
      skeleton: `class Button
{
    public event EventHandler? Clicked;
}

var btn = new Button();
btn.Clicked?.Invoke(btn, EventArgs.Empty);  // Error: cannot invoke outside class`,
      solution: `class Button
{
    public event EventHandler? Clicked;

    public void SimulateClick()
    {
        Clicked?.Invoke(this, EventArgs.Empty);
    }
}

var btn = new Button();
btn.SimulateClick();  // invoke through a public method`,
      hints: ['Events can only be raised from inside the declaring class.', 'Add a public method that raises the event internally.', 'This encapsulation is a key difference between events and delegates.'],
      concepts: ['event encapsulation', 'raising events'],
    },
    {
      id: 'cs-evt-14',
      title: 'Bug: Memory Leak from Unsubscribed Event',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the memory leak caused by not unsubscribing from an event.',
      skeleton: `class Logger
{
    public void AttachTo(EventSource source)
    {
        source.DataReceived += (s, e) => Console.WriteLine(e);
        // Bug: anonymous lambda can never be unsubscribed
    }
}`,
      solution: `class Logger
{
    private EventHandler<string>? _handler;

    public void AttachTo(EventSource source)
    {
        _handler = (s, e) => Console.WriteLine(e);
        source.DataReceived += _handler;
    }

    public void DetachFrom(EventSource source)
    {
        if (_handler != null)
        {
            source.DataReceived -= _handler;
            _handler = null;
        }
    }
}`,
      hints: ['Anonymous lambdas cannot be unsubscribed because each creates a new instance.', 'Store the handler in a field so you can -= it later.', 'Provide a DetachFrom method for cleanup.'],
      concepts: ['event memory leak', 'unsubscribe', 'handler reference'],
    },
    {
      id: 'cs-evt-15',
      title: 'Bug: Race Condition Raising Event',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix the race condition when raising an event in a multithreaded context.',
      skeleton: `class Sensor
{
    public event EventHandler? DataReady;

    public void OnDataReady()
    {
        // Bug: subscriber could unsubscribe between null check and invoke
        if (DataReady != null)
            DataReady(this, EventArgs.Empty);
    }
}`,
      solution: `class Sensor
{
    public event EventHandler? DataReady;

    public void OnDataReady()
    {
        // Fix: copy to local variable first
        var handler = DataReady;
        handler?.Invoke(this, EventArgs.Empty);
    }
}`,
      hints: ['Between the null check and invocation, another thread could unsubscribe.', 'Copy the delegate to a local variable first.', 'Or use the simpler DataReady?.Invoke pattern which does this implicitly.'],
      concepts: ['race condition', 'thread safety', 'delegate copy pattern'],
    },
    {
      id: 'cs-evt-16',
      title: 'Predict Event Subscription Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the output when multiple handlers are subscribed.',
      skeleton: `var broker = new MessageBroker();
broker.MessageReceived += msg => Console.Write($"A:{msg} ");
broker.MessageReceived += msg => Console.Write($"B:{msg} ");
broker.Publish("hi");`,
      solution: `A:hi B:hi `,
      hints: ['Events invoke all subscribers in order of subscription.', 'First handler prints A:hi, second prints B:hi.', 'Both handlers fire for each Publish call.'],
      concepts: ['multicast events', 'subscription order'],
    },
    {
      id: 'cs-evt-17',
      title: 'Predict Unsubscribe Output',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the output after unsubscribing a handler.',
      skeleton: `Action handler = () => Console.Write("X");
Action? evt = null;
evt += handler;
evt += () => Console.Write("Y");
evt -= handler;
evt?.Invoke();`,
      solution: `Y`,
      hints: ['-= removes the specific handler instance.', 'Only the named handler can be removed.', 'After removal, only the Y handler remains.'],
      concepts: ['event unsubscribe', '-= operator', 'handler identity'],
    },
    {
      id: 'cs-evt-18',
      title: 'Predict Cancellable Event',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the outcome of a cancellable event.',
      skeleton: `var deleter = new FileDeleter();
deleter.Deleting += (s, e) => { e.Cancel = true; };
bool deleted = deleter.Delete("test.txt");
Console.WriteLine(deleted);`,
      solution: `False`,
      hints: ['The subscriber sets Cancel = true.', 'The Delete method checks Cancel and returns false.', 'The file is not deleted because the event was cancelled.'],
      concepts: ['cancellable event', 'event-driven control flow'],
    },
    {
      id: 'cs-evt-19',
      title: 'Refactor Callback to Event',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Replace a callback parameter with an event.',
      skeleton: `class Processor
{
    public void Run(Action<int> onProgress)
    {
        for (int i = 0; i <= 100; i += 10)
        {
            onProgress(i);
        }
    }
}`,
      solution: `class Processor
{
    public event Action<int>? ProgressChanged;

    public void Run()
    {
        for (int i = 0; i <= 100; i += 10)
        {
            ProgressChanged?.Invoke(i);
        }
    }
}`,
      hints: ['Events allow multiple subscribers without changing the API.', 'Replace the callback parameter with a public event.', 'Use ?.Invoke to safely raise the event.'],
      concepts: ['callback to event', 'decoupling', 'multiple subscribers'],
    },
    {
      id: 'cs-evt-20',
      title: 'Refactor to Standard Event Pattern',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Refactor a non-standard event to use the standard .NET event pattern.',
      skeleton: `class Sensor
{
    public Action<double>? OnReading;

    public void Read(double value)
    {
        OnReading?.Invoke(value);
    }
}`,
      solution: `class SensorReadingEventArgs : EventArgs
{
    public double Value { get; }
    public SensorReadingEventArgs(double value) => Value = value;
}

class Sensor
{
    public event EventHandler<SensorReadingEventArgs>? Reading;

    protected virtual void OnReading(double value)
    {
        Reading?.Invoke(this, new SensorReadingEventArgs(value));
    }

    public void Read(double value) => OnReading(value);
}`,
      hints: ['Standard pattern: EventHandler<TEventArgs> with custom EventArgs.', 'Create a derived EventArgs class for the data.', 'Use a protected virtual OnXxx method to raise the event.'],
      concepts: ['standard event pattern', 'EventHandler<T>', 'protected OnXxx'],
    },
  ],
};
