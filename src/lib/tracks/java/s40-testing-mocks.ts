import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'java-mocks',
  title: '40. Testing with Mocks',
  explanation: `## Testing with Mocks in Java

**Mockito** is the most popular mocking framework for Java. It allows you to create mock objects, stub method behavior, and verify interactions -- enabling isolated unit testing without real dependencies.

### Creating Mocks

\`\`\`java
import static org.mockito.Mockito.*;

// Inline creation
UserRepository repo = mock(UserRepository.class);

// With annotations
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @Mock UserRepository repo;
    @InjectMocks UserService service;
}
\`\`\`

### Stubbing with when/thenReturn

\`\`\`java
when(repo.findById(1L)).thenReturn(Optional.of(new User("Alice")));
when(repo.findById(99L)).thenReturn(Optional.empty());
when(repo.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));
\`\`\`

### Verification

\`\`\`java
verify(repo).save(any(User.class));           // called exactly once
verify(repo, times(2)).findById(anyLong());    // called exactly twice
verify(repo, never()).deleteById(anyLong());   // never called
verifyNoMoreInteractions(repo);                // nothing else called
\`\`\`

### Argument Captors

\`\`\`java
ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
verify(repo).save(captor.capture());
User saved = captor.getValue();
assertEquals("Alice", saved.getName());
\`\`\`

### Spies

A spy wraps a real object, delegating calls by default but allowing selective stubbing:

\`\`\`java
List<String> list = spy(new ArrayList<>());
list.add("one");
assertEquals(1, list.size()); // real behavior
doReturn(100).when(list).size(); // stubbed
assertEquals(100, list.size());
\`\`\`

### BDD Style

\`\`\`java
import static org.mockito.BDDMockito.*;

given(repo.findById(1L)).willReturn(Optional.of(user));
// ... act ...
then(repo).should().save(any(User.class));
\`\`\``,
  exercises: [
    {
      id: 'java-mocks-1',
      title: 'Create a Mock Object',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Create a mock of the UserRepository interface.',
      skeleton: `import static org.mockito.Mockito.*;

class UserServiceTest {
    void setUp() {
        UserRepository repo = __BLANK__(UserRepository.class);
    }
}`,
      solution: `import static org.mockito.Mockito.*;

class UserServiceTest {
    void setUp() {
        UserRepository repo = mock(UserRepository.class);
    }
}`,
      hints: [
        'Mockito provides a static method to create mocks.',
        'The method takes a Class parameter.',
        'Use mock(UserRepository.class).',
      ],
      concepts: ['mock-creation', 'mockito-basics'],
    },
    {
      id: 'java-mocks-2',
      title: 'Stub a Method with when/thenReturn',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Stub the repository to return a specific user when findById is called.',
      skeleton: `import static org.mockito.Mockito.*;
import java.util.Optional;

class UserServiceTest {
    @Test
    void testFindUser() {
        UserRepository repo = mock(UserRepository.class);
        User alice = new User("Alice");
        __BLANK__(repo.findById(1L)).thenReturn(Optional.of(alice));

        Optional<User> result = repo.findById(1L);
        assertEquals("Alice", result.get().getName());
    }
}`,
      solution: `import static org.mockito.Mockito.*;
import java.util.Optional;

class UserServiceTest {
    @Test
    void testFindUser() {
        UserRepository repo = mock(UserRepository.class);
        User alice = new User("Alice");
        when(repo.findById(1L)).thenReturn(Optional.of(alice));

        Optional<User> result = repo.findById(1L);
        assertEquals("Alice", result.get().getName());
    }
}`,
      hints: [
        'Mockito uses a fluent API starting with a keyword for conditional behavior.',
        'The keyword sets up: "when this method is called, then return this".',
        'Use when(repo.findById(1L)).thenReturn(...).',
      ],
      concepts: ['when-thenReturn', 'stubbing'],
    },
    {
      id: 'java-mocks-3',
      title: 'Verify a Method Was Called',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Verify that the save method was called exactly once on the repository.',
      skeleton: `import static org.mockito.Mockito.*;

class UserServiceTest {
    @Test
    void testSaveUser() {
        UserRepository repo = mock(UserRepository.class);
        UserService service = new UserService(repo);

        service.createUser("Alice");

        __BLANK__(repo).save(any(User.class));
    }
}`,
      solution: `import static org.mockito.Mockito.*;

class UserServiceTest {
    @Test
    void testSaveUser() {
        UserRepository repo = mock(UserRepository.class);
        UserService service = new UserService(repo);

        service.createUser("Alice");

        verify(repo).save(any(User.class));
    }
}`,
      hints: [
        'Mockito provides a method to check interactions with a mock.',
        'The method confirms the mock was called as expected.',
        'Use verify(repo).save(any(User.class)).',
      ],
      concepts: ['verify', 'interaction-testing'],
    },
    {
      id: 'java-mocks-4',
      title: '@Mock Annotation',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Use the @Mock annotation to declare a mock field.',
      skeleton: `import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.Mock;
import org.mockito.InjectMocks;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {
    __BLANK__
    OrderRepository orderRepo;

    @InjectMocks
    OrderService service;
}`,
      solution: `import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.Mock;
import org.mockito.InjectMocks;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {
    @Mock
    OrderRepository orderRepo;

    @InjectMocks
    OrderService service;
}`,
      hints: [
        'Mockito provides an annotation to declare mocks on fields.',
        'It replaces the need for mock(Class.class) inline calls.',
        'Use @Mock above the field declaration.',
      ],
      concepts: ['mock-annotations', 'mockitoExtension'],
    },
    {
      id: 'java-mocks-5',
      title: 'Verify Call Count',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Verify that the notify method was called exactly 3 times.',
      skeleton: `import static org.mockito.Mockito.*;

@Test
void testBatchNotify() {
    NotificationService notifier = mock(NotificationService.class);
    BatchProcessor processor = new BatchProcessor(notifier);

    processor.processAll(List.of("a", "b", "c"));

    verify(notifier, __BLANK__(3)).notify(anyString());
}`,
      solution: `import static org.mockito.Mockito.*;

@Test
void testBatchNotify() {
    NotificationService notifier = mock(NotificationService.class);
    BatchProcessor processor = new BatchProcessor(notifier);

    processor.processAll(List.of("a", "b", "c"));

    verify(notifier, times(3)).notify(anyString());
}`,
      hints: [
        'verify accepts a second argument to specify the expected invocation count.',
        'Mockito has a static method that takes an integer count.',
        'Use times(3) as the verification mode.',
      ],
      concepts: ['verify-times', 'call-counting'],
    },
    {
      id: 'java-mocks-6',
      title: 'thenThrow for Exception Stubbing',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Stub a method to throw a RuntimeException when called.',
      skeleton: `import static org.mockito.Mockito.*;

@Test
void testDatabaseError() {
    UserRepository repo = mock(UserRepository.class);
    when(repo.findById(anyLong())).__BLANK__(new RuntimeException("DB down"));

    assertThrows(RuntimeException.class, () -> repo.findById(1L));
}`,
      solution: `import static org.mockito.Mockito.*;

@Test
void testDatabaseError() {
    UserRepository repo = mock(UserRepository.class);
    when(repo.findById(anyLong())).thenThrow(new RuntimeException("DB down"));

    assertThrows(RuntimeException.class, () -> repo.findById(1L));
}`,
      hints: [
        'Instead of thenReturn, you can chain a method that throws.',
        'The method name follows the same pattern: then + action.',
        'Use thenThrow(new RuntimeException(...)).',
      ],
      concepts: ['thenThrow', 'exception-stubbing'],
    },
    {
      id: 'java-mocks-7',
      title: 'Write a Complete Mock Test',
      type: 'write-function',
      difficulty: 'beginner',
      language: 'java',
      goal: 'Write a test that mocks a PaymentGateway, stubs charge() to return true, and verifies charge was called.',
      skeleton: `import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class PaymentServiceTest {
    // Write: testSuccessfulPayment()
    // 1. Mock PaymentGateway
    // 2. Stub gateway.charge(100.0) to return true
    // 3. Create PaymentService with the mock
    // 4. Call service.processPayment(100.0)
    // 5. Assert result is true
    // 6. Verify gateway.charge(100.0) was called
}`,
      solution: `import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class PaymentServiceTest {
    @Test
    void testSuccessfulPayment() {
        PaymentGateway gateway = mock(PaymentGateway.class);
        when(gateway.charge(100.0)).thenReturn(true);

        PaymentService service = new PaymentService(gateway);
        boolean result = service.processPayment(100.0);

        assertTrue(result);
        verify(gateway).charge(100.0);
    }
}`,
      hints: [
        'Create the mock, stub its behavior, then act and assert.',
        'when(gateway.charge(100.0)).thenReturn(true) sets up the stub.',
        'verify(gateway).charge(100.0) confirms the interaction.',
      ],
      concepts: ['mock-creation', 'when-thenReturn', 'verify'],
    },
    {
      id: 'java-mocks-8',
      title: 'Write an ArgumentCaptor Test',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a test that captures the User argument passed to repo.save() and asserts its name is "Bob".',
      skeleton: `import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.mockito.ArgumentCaptor;
import org.junit.jupiter.api.Test;

class UserServiceTest {
    // Write: testCapturesSavedUser()
    // 1. Mock UserRepository
    // 2. Create UserService with the mock
    // 3. Call service.createUser("Bob")
    // 4. Use ArgumentCaptor to capture the User passed to repo.save()
    // 5. Assert the captured user's name is "Bob"
}`,
      solution: `import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.mockito.ArgumentCaptor;
import org.junit.jupiter.api.Test;

class UserServiceTest {
    @Test
    void testCapturesSavedUser() {
        UserRepository repo = mock(UserRepository.class);
        UserService service = new UserService(repo);

        service.createUser("Bob");

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(repo).save(captor.capture());
        User savedUser = captor.getValue();
        assertEquals("Bob", savedUser.getName());
    }
}`,
      hints: [
        'Create an ArgumentCaptor with ArgumentCaptor.forClass(User.class).',
        'Pass captor.capture() into the verify call.',
        'Use captor.getValue() to retrieve the captured argument.',
      ],
      concepts: ['argument-captor', 'verify'],
    },
    {
      id: 'java-mocks-9',
      title: 'Write a Spy Test',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a test that creates a spy on a real ArrayList, adds elements, then stubs size() to return 100.',
      skeleton: `import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import java.util.ArrayList;
import java.util.List;

class SpyTest {
    // Write: testSpyList()
    // 1. Create a spy of a real ArrayList<String>
    // 2. Add "hello" and "world" to the spy
    // 3. Assert size() returns 2 (real behavior)
    // 4. Stub size() to return 100 using doReturn
    // 5. Assert size() now returns 100
}`,
      solution: `import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import java.util.ArrayList;
import java.util.List;

class SpyTest {
    @Test
    void testSpyList() {
        List<String> list = spy(new ArrayList<>());

        list.add("hello");
        list.add("world");
        assertEquals(2, list.size());

        doReturn(100).when(list).size();
        assertEquals(100, list.size());
    }
}`,
      hints: [
        'spy() wraps a real object -- real methods work unless stubbed.',
        'Use doReturn().when() syntax for spies to avoid calling the real method.',
        'After stubbing, size() returns the stubbed value.',
      ],
      concepts: ['spy', 'doReturn', 'partial-mocking'],
    },
    {
      id: 'java-mocks-10',
      title: 'Write a BDD-Style Mock Test',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Write a test using BDD Mockito style (given/when/then) to test a weather service.',
      skeleton: `import static org.mockito.BDDMockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class WeatherServiceTest {
    // Write: testGetTemperature()
    // Given: WeatherApi mock returns 72.5 for getTemp("NYC")
    // When: WeatherService.getCurrentTemp("NYC") is called
    // Then: result is 72.5 and api.getTemp("NYC") was called
    // Use given(...).willReturn(...) and then(...).should()
}`,
      solution: `import static org.mockito.BDDMockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class WeatherServiceTest {
    @Test
    void testGetTemperature() {
        WeatherApi api = mock(WeatherApi.class);
        given(api.getTemp("NYC")).willReturn(72.5);

        WeatherService service = new WeatherService(api);
        double temp = service.getCurrentTemp("NYC");

        assertEquals(72.5, temp);
        then(api).should().getTemp("NYC");
    }
}`,
      hints: [
        'BDD Mockito uses given() instead of when() for stubbing.',
        'willReturn() replaces thenReturn().',
        'then(mock).should() replaces verify(mock).',
      ],
      concepts: ['bdd-mockito', 'given-willReturn', 'then-should'],
    },
    {
      id: 'java-mocks-11',
      title: 'Write thenAnswer for Dynamic Responses',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a test where the mock dynamically returns the argument it received, uppercased.',
      skeleton: `import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class FormatterTest {
    // Write: testDynamicFormat()
    // Mock a TextFormatter interface with format(String) method
    // Use thenAnswer to return the input string uppercased
    // Assert format("hello") returns "HELLO"
}`,
      solution: `import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class FormatterTest {
    @Test
    void testDynamicFormat() {
        TextFormatter formatter = mock(TextFormatter.class);
        when(formatter.format(anyString())).thenAnswer(invocation -> {
            String arg = invocation.getArgument(0);
            return arg.toUpperCase();
        });

        assertEquals("HELLO", formatter.format("hello"));
        assertEquals("WORLD", formatter.format("world"));
    }
}`,
      hints: [
        'thenAnswer takes an Answer functional interface with an InvocationOnMock parameter.',
        'invocation.getArgument(0) retrieves the first argument.',
        'Return the transformed value from the lambda.',
      ],
      concepts: ['thenAnswer', 'dynamic-stubbing'],
    },
    {
      id: 'java-mocks-12',
      title: 'Write InOrder Verification',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Write a test that verifies methods were called in a specific order: validate, then save, then notify.',
      skeleton: `import static org.mockito.Mockito.*;
import org.junit.jupiter.api.Test;

class OrderProcessorTest {
    // Write: testProcessingOrder()
    // Mock: Validator, Repository, Notifier
    // Create OrderProcessor with all three mocks
    // Call processor.process(order)
    // Verify in order: validator.validate(), repo.save(), notifier.notify()
}`,
      solution: `import static org.mockito.Mockito.*;
import org.junit.jupiter.api.Test;

class OrderProcessorTest {
    @Test
    void testProcessingOrder() {
        Validator validator = mock(Validator.class);
        Repository repo = mock(Repository.class);
        Notifier notifier = mock(Notifier.class);
        Order order = new Order();

        OrderProcessor processor = new OrderProcessor(validator, repo, notifier);
        processor.process(order);

        InOrder inOrder = inOrder(validator, repo, notifier);
        inOrder.verify(validator).validate(order);
        inOrder.verify(repo).save(order);
        inOrder.verify(notifier).notify(order);
    }
}`,
      hints: [
        'Mockito.inOrder() creates an InOrder verifier for multiple mocks.',
        'Call inOrder.verify() in the expected execution order.',
        'If the order is wrong, the test fails.',
      ],
      concepts: ['inOrder', 'verification-order'],
    },
    {
      id: 'java-mocks-13',
      title: 'Fix Missing Stubbing',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'java',
      goal: 'The test expects a value from the mock but forgot to stub it. By default, mocks return null for objects. Fix it.',
      skeleton: `import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class UserServiceTest {
    @Test
    void testGetUserName() {
        UserRepository repo = mock(UserRepository.class);
        // Missing: stub for repo.findById(1L)

        UserService service = new UserService(repo);
        String name = service.getUserName(1L);  // NullPointerException!
        assertEquals("Alice", name);
    }
}`,
      solution: `import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class UserServiceTest {
    @Test
    void testGetUserName() {
        UserRepository repo = mock(UserRepository.class);
        when(repo.findById(1L)).thenReturn(new User("Alice"));

        UserService service = new UserService(repo);
        String name = service.getUserName(1L);
        assertEquals("Alice", name);
    }
}`,
      hints: [
        'Mocks return null by default for object return types.',
        'You need to tell the mock what to return for findById(1L).',
        'Add: when(repo.findById(1L)).thenReturn(new User("Alice"));',
      ],
      concepts: ['when-thenReturn', 'default-mock-behavior'],
    },
    {
      id: 'java-mocks-14',
      title: 'Fix when() on Spy',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Using when().thenReturn() on a spy calls the real method during stubbing. Fix it using doReturn syntax.',
      skeleton: `import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import java.util.List;
import java.util.ArrayList;

class SpyBugTest {
    @Test
    void testSpyGet() {
        List<String> list = spy(new ArrayList<>());
        // Bug: when(list.get(0)) calls the REAL get(0) which throws IndexOutOfBoundsException
        when(list.get(0)).thenReturn("mocked");
        assertEquals("mocked", list.get(0));
    }
}`,
      solution: `import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import java.util.List;
import java.util.ArrayList;

class SpyBugTest {
    @Test
    void testSpyGet() {
        List<String> list = spy(new ArrayList<>());
        doReturn("mocked").when(list).get(0);
        assertEquals("mocked", list.get(0));
    }
}`,
      hints: [
        'For spies, when().thenReturn() actually invokes the real method first.',
        'Use the doReturn().when() pattern to avoid calling the real method.',
        'Replace with: doReturn("mocked").when(list).get(0);',
      ],
      concepts: ['spy', 'doReturn', 'stubbing-gotchas'],
    },
    {
      id: 'java-mocks-15',
      title: 'Fix Unnecessary Stubbing',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Mockito strict mode throws UnnecessaryStubbingException for stubs that are never used. Remove the unused stub.',
      skeleton: `import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class StrictTest {
    @Test
    void testSave() {
        UserRepository repo = mock(UserRepository.class);
        when(repo.findById(1L)).thenReturn(new User("Alice")); // never used
        when(repo.count()).thenReturn(10L); // never used

        repo.save(new User("Bob"));

        verify(repo).save(any(User.class));
    }
}`,
      solution: `import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class StrictTest {
    @Test
    void testSave() {
        UserRepository repo = mock(UserRepository.class);

        repo.save(new User("Bob"));

        verify(repo).save(any(User.class));
    }
}`,
      hints: [
        'Strict mode in Mockito 3+ detects stubs that are set up but never invoked.',
        'Remove any when().thenReturn() calls that the test never actually uses.',
        'Delete the two unused stubbing lines.',
      ],
      concepts: ['strict-stubbing', 'unnecessary-stubbing'],
    },
    {
      id: 'java-mocks-16',
      title: 'Predict Mock Default Return',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'java',
      goal: 'What does a mock return by default for different return types?',
      skeleton: `import static org.mockito.Mockito.*;

interface Service {
    String getName();
    int getCount();
    boolean isActive();
    List<String> getItems();
}

Service s = mock(Service.class);
System.out.println(s.getName());
System.out.println(s.getCount());
System.out.println(s.isActive());
System.out.println(s.getItems());
// What are the four lines of output?`,
      solution: `null
0
false
[]`,
      hints: [
        'Mocks return "nice" defaults: null for objects, 0 for numbers, false for booleans.',
        'Collections return empty collections by default.',
        'So: null, 0, false, and an empty list (printed as []).',
      ],
      concepts: ['default-return-values', 'mock-behavior'],
    },
    {
      id: 'java-mocks-17',
      title: 'Predict Verify Failure',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'What happens when verify expects 2 calls but only 1 occurred?',
      skeleton: `import static org.mockito.Mockito.*;

UserRepository repo = mock(UserRepository.class);
repo.save(new User("Alice"));

verify(repo, times(2)).save(any(User.class));
// Does the test pass or fail? If fail, what kind of error?`,
      solution: `fail: TooFewActualInvocations`,
      hints: [
        'verify checks the actual number of invocations against the expected count.',
        'save() was called once but verify expects twice.',
        'Mockito throws a verification error indicating too few invocations.',
      ],
      concepts: ['verify-times', 'verification-failure'],
    },
    {
      id: 'java-mocks-18',
      title: 'Predict Spy Behavior',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Predict the output of a spy with partial stubbing.',
      skeleton: `import static org.mockito.Mockito.*;
import java.util.ArrayList;
import java.util.List;

List<String> list = spy(new ArrayList<>());
list.add("a");
list.add("b");
doReturn("X").when(list).get(0);

System.out.println(list.size());
System.out.println(list.get(0));
System.out.println(list.get(1));
// What are the three lines of output?`,
      solution: `2
X
b`,
      hints: [
        'A spy delegates to the real object unless a method is stubbed.',
        'size() is not stubbed, so it returns the real size (2).',
        'get(0) is stubbed to return "X", but get(1) returns the real element "b".',
      ],
      concepts: ['spy', 'partial-mocking'],
    },
    {
      id: 'java-mocks-19',
      title: 'Refactor to Use @Mock Annotations',
      type: 'refactor',
      difficulty: 'intermediate',
      language: 'java',
      goal: 'Refactor inline mock() calls to use @Mock and @InjectMocks annotations.',
      skeleton: `import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class EmailServiceTest {
    @Test
    void testSendWelcome() {
        EmailGateway gateway = mock(EmailGateway.class);
        TemplateEngine engine = mock(TemplateEngine.class);
        EmailService service = new EmailService(gateway, engine);

        when(engine.render("welcome")).thenReturn("<h1>Welcome</h1>");
        service.sendWelcome("alice@test.com");
        verify(gateway).send("alice@test.com", "<h1>Welcome</h1>");
    }
}`,
      solution: `import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class EmailServiceTest {
    @Mock
    EmailGateway gateway;

    @Mock
    TemplateEngine engine;

    @InjectMocks
    EmailService service;

    @Test
    void testSendWelcome() {
        when(engine.render("welcome")).thenReturn("<h1>Welcome</h1>");
        service.sendWelcome("alice@test.com");
        verify(gateway).send("alice@test.com", "<h1>Welcome</h1>");
    }
}`,
      hints: [
        'Replace mock() calls with @Mock fields.',
        'Use @InjectMocks to let Mockito construct the service with mocks.',
        'Add @ExtendWith(MockitoExtension.class) to the test class.',
      ],
      concepts: ['mock-annotations', 'injectMocks', 'mockitoExtension'],
    },
    {
      id: 'java-mocks-20',
      title: 'Refactor Verify to BDD Style',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'java',
      goal: 'Refactor a traditional Mockito test to use BDD style with given/willReturn and then/should.',
      skeleton: `import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class ProductServiceTest {
    @Test
    void testGetProduct() {
        ProductRepository repo = mock(ProductRepository.class);
        Product laptop = new Product("Laptop", 999.99);
        when(repo.findByName("Laptop")).thenReturn(laptop);

        ProductService service = new ProductService(repo);
        Product result = service.getProduct("Laptop");

        assertEquals("Laptop", result.getName());
        assertEquals(999.99, result.getPrice());
        verify(repo).findByName("Laptop");
        verify(repo, never()).save(any());
    }
}`,
      solution: `import static org.mockito.BDDMockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class ProductServiceTest {
    @Test
    void testGetProduct() {
        ProductRepository repo = mock(ProductRepository.class);
        Product laptop = new Product("Laptop", 999.99);
        given(repo.findByName("Laptop")).willReturn(laptop);

        ProductService service = new ProductService(repo);
        Product result = service.getProduct("Laptop");

        assertEquals("Laptop", result.getName());
        assertEquals(999.99, result.getPrice());
        then(repo).should().findByName("Laptop");
        then(repo).should(never()).save(any());
    }
}`,
      hints: [
        'Replace when() with given() and thenReturn with willReturn.',
        'Replace verify(mock).method() with then(mock).should().method().',
        'Import from org.mockito.BDDMockito instead of Mockito.',
      ],
      concepts: ['bdd-mockito', 'given-willReturn', 'then-should'],
    },
  ],
};
