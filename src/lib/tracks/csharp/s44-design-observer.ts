import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'cs-design-observer',
  title: '44. Observer Pattern',
  explanation: `## Observer Pattern

The Observer pattern defines a one-to-many dependency so that when one object changes state, all its dependents are notified automatically. C# provides both built-in and framework-level support.

\`\`\`csharp
// .NET built-in interfaces
public interface IObservable<out T>
{
    IDisposable Subscribe(IObserver<T> observer);
}

public interface IObserver<in T>
{
    void OnNext(T value);
    void OnError(Exception error);
    void OnCompleted();
}
\`\`\`

### C# Events (Classic Approach)

The simplest observer mechanism in C# uses events:

\`\`\`csharp
public class StockTicker
{
    public event EventHandler<decimal>? PriceChanged;

    public void UpdatePrice(decimal newPrice)
    {
        PriceChanged?.Invoke(this, newPrice);
    }
}
\`\`\`

### IObservable<T> / IObserver<T>

The \`System\` namespace includes observer interfaces for push-based notification:

\`\`\`csharp
public class TemperatureSensor : IObservable<double>
{
    private readonly List<IObserver<double>> _observers = new();

    public IDisposable Subscribe(IObserver<double> observer)
    {
        _observers.Add(observer);
        return new Unsubscriber(_observers, observer);
    }

    public void ReportTemperature(double temp)
    {
        foreach (var obs in _observers)
            obs.OnNext(temp);
    }
}
\`\`\`

### Reactive Extensions (Rx.NET)

Rx provides powerful operators for composing observable sequences:

\`\`\`csharp
var subject = new Subject<int>();
subject
    .Where(x => x > 5)
    .Select(x => x * 2)
    .Subscribe(x => Console.WriteLine(x));
\`\`\`

Rx turns events into composable, queryable streams using LINQ-style operators.`,
  exercises: [
    {
      id: 'cs-observer-1',
      title: 'Event Declaration',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Declare an event using EventHandler<T>.',
      skeleton: `public class Button
{
    public __BLANK__ EventHandler<string>? Clicked;

    public void Click(string label) => Clicked?.Invoke(this, label);
}`,
      solution: `public class Button
{
    public event EventHandler<string>? Clicked;

    public void Click(string label) => Clicked?.Invoke(this, label);
}`,
      hints: ['This keyword declares a delegate-based notification mechanism.', 'It restricts external code to += and -= only.', 'The answer is: event'],
      concepts: ['event keyword', 'EventHandler<T>', 'observer pattern'],
    },
    {
      id: 'cs-observer-2',
      title: 'Subscribe to IObservable',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Subscribe an observer to an observable source.',
      skeleton: `IObservable<double> sensor = GetSensor();
IObserver<double> display = new TemperatureDisplay();
IDisposable subscription = sensor.__BLANK__(display);`,
      solution: `IObservable<double> sensor = GetSensor();
IObserver<double> display = new TemperatureDisplay();
IDisposable subscription = sensor.Subscribe(display);`,
      hints: ['IObservable<T> has one method for registering observers.', 'It returns an IDisposable for cleanup.', 'The answer is: Subscribe'],
      concepts: ['IObservable<T>', 'Subscribe', 'IDisposable'],
    },
    {
      id: 'cs-observer-3',
      title: 'OnNext Notification',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Send a value to all observers.',
      skeleton: `public class PriceFeed : IObservable<decimal>
{
    private readonly List<IObserver<decimal>> _observers = new();

    public void PublishPrice(decimal price)
    {
        foreach (var obs in _observers)
            obs.__BLANK__(price);
    }

    public IDisposable Subscribe(IObserver<decimal> observer)
    {
        _observers.Add(observer);
        return new Unsubscriber(_observers, observer);
    }
}`,
      solution: `public class PriceFeed : IObservable<decimal>
{
    private readonly List<IObserver<decimal>> _observers = new();

    public void PublishPrice(decimal price)
    {
        foreach (var obs in _observers)
            obs.OnNext(price);
    }

    public IDisposable Subscribe(IObserver<decimal> observer)
    {
        _observers.Add(observer);
        return new Unsubscriber(_observers, observer);
    }
}`,
      hints: ['IObserver<T> has three methods: OnNext, OnError, OnCompleted.', 'This one delivers the next value.', 'The answer is: OnNext'],
      concepts: ['IObserver<T>', 'OnNext', 'push notification'],
    },
    {
      id: 'cs-observer-4',
      title: 'OnCompleted Signal',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Signal observers that no more data will arrive.',
      skeleton: `public void Shutdown()
{
    foreach (var obs in _observers)
        obs.__BLANK__();
    _observers.Clear();
}`,
      solution: `public void Shutdown()
{
    foreach (var obs in _observers)
        obs.OnCompleted();
    _observers.Clear();
}`,
      hints: ['This IObserver method signals end of the sequence.', 'After this, no more OnNext calls should occur.', 'The answer is: OnCompleted'],
      concepts: ['OnCompleted', 'sequence termination', 'observer lifecycle'],
    },
    {
      id: 'cs-observer-5',
      title: 'Rx Where Filter',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Filter an observable sequence using Rx.',
      skeleton: `var source = new Subject<int>();
source
    .__BLANK__(x => x % 2 == 0)
    .Subscribe(x => Console.WriteLine(x));`,
      solution: `var source = new Subject<int>();
source
    .Where(x => x % 2 == 0)
    .Subscribe(x => Console.WriteLine(x));`,
      hints: ['This LINQ-style operator filters elements by predicate.', 'It works the same on IObservable<T> as on IEnumerable<T>.', 'The answer is: Where'],
      concepts: ['Rx.NET', 'Where', 'observable filtering'],
    },
    {
      id: 'cs-observer-6',
      title: 'Subject OnNext',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Push a value through an Rx Subject.',
      skeleton: `var subject = new Subject<string>();
subject.Subscribe(msg => Console.WriteLine(msg));
subject.__BLANK__("Hello Rx!");`,
      solution: `var subject = new Subject<string>();
subject.Subscribe(msg => Console.WriteLine(msg));
subject.OnNext("Hello Rx!");`,
      hints: ['Subject<T> is both IObservable and IObserver.', 'Push values by calling the IObserver method.', 'The answer is: OnNext'],
      concepts: ['Subject<T>', 'OnNext', 'Rx basics'],
    },
    {
      id: 'cs-observer-7',
      title: 'Event-Based Observer',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Implement a WeatherStation class that notifies subscribers when temperature changes via a C# event.',
      skeleton: `// Create class WeatherStation
// - event EventHandler<double>? TemperatureChanged
// - private double _temperature
// - public void SetTemperature(double temp) that fires the event`,
      solution: `public class WeatherStation
{
    public event EventHandler<double>? TemperatureChanged;

    private double _temperature;

    public void SetTemperature(double temp)
    {
        _temperature = temp;
        TemperatureChanged?.Invoke(this, temp);
    }

    public double Temperature => _temperature;
}`,
      hints: ['Declare the event with EventHandler<double>.', 'Use the ?. operator to safely invoke (handles null).', 'Store the temperature and then raise the event.'],
      concepts: ['event', 'EventHandler<T>', 'null-conditional invocation'],
    },
    {
      id: 'cs-observer-8',
      title: 'IObservable Implementation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Implement a MessageBus class that implements IObservable<string> with proper subscribe/unsubscribe support.',
      skeleton: `// Create class MessageBus : IObservable<string>
// - Subscribe returns IDisposable that removes the observer
// - void Publish(string message) sends to all observers
// Create a private Unsubscriber class implementing IDisposable`,
      solution: `public class MessageBus : IObservable<string>
{
    private readonly List<IObserver<string>> _observers = new();

    public IDisposable Subscribe(IObserver<string> observer)
    {
        if (!_observers.Contains(observer))
            _observers.Add(observer);
        return new Unsubscriber(_observers, observer);
    }

    public void Publish(string message)
    {
        foreach (var observer in _observers.ToList())
            observer.OnNext(message);
    }

    private class Unsubscriber : IDisposable
    {
        private readonly List<IObserver<string>> _observers;
        private readonly IObserver<string> _observer;

        public Unsubscriber(List<IObserver<string>> observers, IObserver<string> observer)
        {
            _observers = observers;
            _observer = observer;
        }

        public void Dispose() => _observers.Remove(_observer);
    }
}`,
      hints: ['Subscribe adds the observer and returns an IDisposable.', 'Use ToList() when iterating to avoid modification during enumeration.', 'The Unsubscriber removes the observer from the list on Dispose.'],
      concepts: ['IObservable<T>', 'IDisposable', 'unsubscribe pattern'],
    },
    {
      id: 'cs-observer-9',
      title: 'IObserver Implementation',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Implement an IObserver<double> that tracks min, max, and average of received values.',
      skeleton: `// Create class StatisticsObserver : IObserver<double>
// - OnNext: track count, sum, min, max
// - OnCompleted: print "Done. Avg={avg:F2} Min={min} Max={max}"
// - OnError: print "Error: {message}"
// - Properties: Min, Max, Average`,
      solution: `public class StatisticsObserver : IObserver<double>
{
    private double _sum;
    private int _count;

    public double Min { get; private set; } = double.MaxValue;
    public double Max { get; private set; } = double.MinValue;
    public double Average => _count > 0 ? _sum / _count : 0;

    public void OnNext(double value)
    {
        _count++;
        _sum += value;
        if (value < Min) Min = value;
        if (value > Max) Max = value;
    }

    public void OnCompleted()
    {
        Console.WriteLine($"Done. Avg={Average:F2} Min={Min} Max={Max}");
    }

    public void OnError(Exception error)
    {
        Console.WriteLine($"Error: {error.Message}");
    }
}`,
      hints: ['Initialize Min to double.MaxValue and Max to double.MinValue.', 'Track running sum and count for average.', 'OnCompleted prints the final statistics.'],
      concepts: ['IObserver<T>', 'OnNext', 'OnCompleted', 'running statistics'],
    },
    {
      id: 'cs-observer-10',
      title: 'Observable with Error Handling',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Implement an observable that sends OnError when a negative value is published.',
      skeleton: `// Create class SensorFeed : IObservable<double>
// - Subscribe with Unsubscriber pattern
// - void Report(double value):
//   if value < 0, call OnError with ArgumentException on all observers
//   otherwise call OnNext`,
      solution: `public class SensorFeed : IObservable<double>
{
    private readonly List<IObserver<double>> _observers = new();

    public IDisposable Subscribe(IObserver<double> observer)
    {
        _observers.Add(observer);
        return new Unsubscriber(_observers, observer);
    }

    public void Report(double value)
    {
        foreach (var obs in _observers.ToList())
        {
            if (value < 0)
                obs.OnError(new ArgumentException("Negative reading"));
            else
                obs.OnNext(value);
        }
    }

    private class Unsubscriber : IDisposable
    {
        private readonly List<IObserver<double>> _observers;
        private readonly IObserver<double> _observer;

        public Unsubscriber(List<IObserver<double>> observers, IObserver<double> observer)
        {
            _observers = observers;
            _observer = observer;
        }

        public void Dispose() => _observers.Remove(_observer);
    }
}`,
      hints: ['Check if the value is negative before notifying.', 'Call OnError with an ArgumentException for invalid data.', 'Always iterate a copy of the list with ToList().'],
      concepts: ['OnError', 'error propagation', 'IObservable<T>'],
    },
    {
      id: 'cs-observer-11',
      title: 'Rx Subject Pipeline',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Create an Rx pipeline that filters, transforms, and subscribes to a Subject<int>.',
      skeleton: `// Create a Subject<int>
// Build a pipeline: filter values > 10, multiply by 2, subscribe and collect into a List<int>
// Push values: 5, 15, 3, 20, 8
// Return the collected list`,
      solution: `public static List<int> RunPipeline()
{
    var results = new List<int>();
    var subject = new Subject<int>();

    subject
        .Where(x => x > 10)
        .Select(x => x * 2)
        .Subscribe(x => results.Add(x));

    subject.OnNext(5);
    subject.OnNext(15);
    subject.OnNext(3);
    subject.OnNext(20);
    subject.OnNext(8);

    subject.OnCompleted();
    return results; // [30, 40]
}`,
      hints: ['Subject<int> acts as both source and observer.', 'Where filters, Select transforms.', 'Only 15 and 20 pass the > 10 filter, becoming 30 and 40.'],
      concepts: ['Subject<T>', 'Where', 'Select', 'Rx pipeline'],
    },
    {
      id: 'cs-observer-12',
      title: 'Custom EventArgs',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Create a custom EventArgs class and use it with an event.',
      skeleton: `// Create OrderEventArgs : EventArgs with OrderId (int) and Total (decimal)
// Create OrderProcessor with event EventHandler<OrderEventArgs>? OrderPlaced
// Add method PlaceOrder(int id, decimal total) that raises the event`,
      solution: `public class OrderEventArgs : EventArgs
{
    public int OrderId { get; }
    public decimal Total { get; }

    public OrderEventArgs(int orderId, decimal total)
    {
        OrderId = orderId;
        Total = total;
    }
}

public class OrderProcessor
{
    public event EventHandler<OrderEventArgs>? OrderPlaced;

    public void PlaceOrder(int id, decimal total)
    {
        OrderPlaced?.Invoke(this, new OrderEventArgs(id, total));
    }
}`,
      hints: ['Extend EventArgs with your custom properties.', 'Use EventHandler<TEventArgs> for the event type.', 'Create the EventArgs instance when invoking.'],
      concepts: ['custom EventArgs', 'EventHandler<T>', 'event pattern'],
    },
    {
      id: 'cs-observer-13',
      title: 'Forgotten Unsubscribe',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Fix the observer that leaks because Dispose does not remove it.',
      skeleton: `private class Unsubscriber : IDisposable
{
    private readonly List<IObserver<int>> _observers;
    private readonly IObserver<int> _observer;

    public Unsubscriber(List<IObserver<int>> observers, IObserver<int> observer)
    {
        _observers = observers;
        _observer = observer;
    }

    // Bug: Dispose does nothing
    public void Dispose() { }
}`,
      solution: `private class Unsubscriber : IDisposable
{
    private readonly List<IObserver<int>> _observers;
    private readonly IObserver<int> _observer;

    public Unsubscriber(List<IObserver<int>> observers, IObserver<int> observer)
    {
        _observers = observers;
        _observer = observer;
    }

    public void Dispose() => _observers.Remove(_observer);
}`,
      hints: ['Dispose must remove the observer from the list.', 'Without removal, the observer keeps receiving notifications.', 'Call _observers.Remove(_observer) in Dispose.'],
      concepts: ['IDisposable', 'memory leak', 'unsubscribe'],
    },
    {
      id: 'cs-observer-14',
      title: 'Event Invoked Without Null Check',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Fix the event invocation that crashes when there are no subscribers.',
      skeleton: `public class Timer
{
    public event EventHandler? Tick;

    public void OnTick()
    {
        // Bug: NullReferenceException when no subscribers
        Tick.Invoke(this, EventArgs.Empty);
    }
}`,
      solution: `public class Timer
{
    public event EventHandler? Tick;

    public void OnTick()
    {
        Tick?.Invoke(this, EventArgs.Empty);
    }
}`,
      hints: ['Events are null when no one has subscribed.', 'Use the null-conditional operator before Invoke.', 'Change Tick.Invoke to Tick?.Invoke.'],
      concepts: ['null-conditional', 'event invocation', 'NullReferenceException'],
    },
    {
      id: 'cs-observer-15',
      title: 'Concurrent Modification',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Fix the observer notification that crashes when an observer unsubscribes during notification.',
      skeleton: `public void Notify(int value)
{
    // Bug: InvalidOperationException if observer unsubscribes during loop
    foreach (var obs in _observers)
        obs.OnNext(value);
}`,
      solution: `public void Notify(int value)
{
    foreach (var obs in _observers.ToList())
        obs.OnNext(value);
}`,
      hints: ['Iterating a collection that gets modified throws an exception.', 'Create a snapshot of the list before iterating.', 'Use .ToList() to copy the observer list.'],
      concepts: ['collection modification', 'ToList snapshot', 'thread safety'],
    },
    {
      id: 'cs-observer-16',
      title: 'Predict Event Output',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'csharp',
      goal: 'Predict the output when multiple handlers subscribe to an event.',
      skeleton: `public class Alarm
{
    public event Action<string>? Ring;
    public void Trigger(string msg) => Ring?.Invoke(msg);
}

var alarm = new Alarm();
alarm.Ring += msg => Console.Write($"A:{msg} ");
alarm.Ring += msg => Console.Write($"B:{msg} ");
alarm.Trigger("Fire");`,
      solution: `A:Fire B:Fire `,
      hints: ['Both handlers are called in subscription order.', 'Events support multicast (multiple subscribers).', 'Each handler receives the same argument.'],
      concepts: ['multicast event', 'subscription order', 'Action<T>'],
    },
    {
      id: 'cs-observer-17',
      title: 'Predict Unsubscribe',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Predict the output after removing an event handler.',
      skeleton: `var alarm = new Alarm();
Action<string> handlerA = msg => Console.Write($"A:{msg} ");
Action<string> handlerB = msg => Console.Write($"B:{msg} ");

alarm.Ring += handlerA;
alarm.Ring += handlerB;
alarm.Trigger("1");
alarm.Ring -= handlerA;
alarm.Trigger("2");`,
      solution: `A:1 B:1 B:2 `,
      hints: ['First trigger fires both handlers.', 'After removing handlerA, only handlerB remains.', 'Second trigger only fires handlerB.'],
      concepts: ['event unsubscribe', '-= operator', 'handler removal'],
    },
    {
      id: 'cs-observer-18',
      title: 'Predict Rx Pipeline',
      type: 'predict-output',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Predict the output of an Rx pipeline with Where and Select.',
      skeleton: `var subject = new Subject<int>();
subject
    .Where(x => x > 3)
    .Select(x => x * 10)
    .Subscribe(x => Console.Write($"{x} "));

subject.OnNext(1);
subject.OnNext(5);
subject.OnNext(2);
subject.OnNext(4);
subject.OnCompleted();`,
      solution: `50 40 `,
      hints: ['Only values > 3 pass the Where filter: 5 and 4.', 'Select multiplies by 10: 50 and 40.', 'Values 1 and 2 are filtered out.'],
      concepts: ['Rx pipeline', 'Where', 'Select', 'Subject<T>'],
    },
    {
      id: 'cs-observer-19',
      title: 'Refactor Event to IObservable',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'csharp',
      goal: 'Refactor a class using C# events to implement IObservable<T> instead.',
      skeleton: `public class ClickTracker
{
    public event EventHandler<Point>? Clicked;

    public void RegisterClick(int x, int y)
    {
        Clicked?.Invoke(this, new Point(x, y));
    }
}

// Usage:
// tracker.Clicked += (s, p) => Console.WriteLine(p);`,
      solution: `public class ClickTracker : IObservable<Point>
{
    private readonly List<IObserver<Point>> _observers = new();

    public IDisposable Subscribe(IObserver<Point> observer)
    {
        _observers.Add(observer);
        return new Unsubscriber(_observers, observer);
    }

    public void RegisterClick(int x, int y)
    {
        var point = new Point(x, y);
        foreach (var obs in _observers.ToList())
            obs.OnNext(point);
    }

    private class Unsubscriber : IDisposable
    {
        private readonly List<IObserver<Point>> _observers;
        private readonly IObserver<Point> _observer;

        public Unsubscriber(List<IObserver<Point>> observers, IObserver<Point> observer)
        {
            _observers = observers;
            _observer = observer;
        }

        public void Dispose() => _observers.Remove(_observer);
    }
}`,
      hints: ['Replace the event with IObservable<Point> implementation.', 'Subscribe adds observers; return an Unsubscriber for cleanup.', 'RegisterClick calls OnNext on all observers.'],
      concepts: ['IObservable<T>', 'refactoring from events', 'Unsubscriber pattern'],
    },
    {
      id: 'cs-observer-20',
      title: 'Refactor to Rx Observable',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'csharp',
      goal: 'Refactor manual observer management to use Rx Subject<T> with operators.',
      skeleton: `public class LogMonitor
{
    private readonly List<Action<string>> _handlers = new();

    public void OnLog(Action<string> handler) => _handlers.Add(handler);

    public void Log(string message)
    {
        foreach (var handler in _handlers)
        {
            if (message.Contains("ERROR"))
                handler(message);
        }
    }
}`,
      solution: `public class LogMonitor
{
    private readonly Subject<string> _logSubject = new();

    public IObservable<string> Errors =>
        _logSubject.Where(msg => msg.Contains("ERROR"));

    public void Log(string message) => _logSubject.OnNext(message);
}

// Usage:
// monitor.Errors.Subscribe(msg => Console.WriteLine(msg));`,
      hints: ['Replace the handler list with a Subject<string>.', 'Expose a filtered IObservable<string> property using Where.', 'Log just pushes the message through the subject; filtering happens in the pipeline.'],
      concepts: ['Subject<T>', 'Rx refactoring', 'Where operator', 'separation of concerns'],
    },
  ],
};
