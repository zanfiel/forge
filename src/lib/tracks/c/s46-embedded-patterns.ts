import type { LessonSection } from '../../../stores/app.svelte.ts';

export const section: LessonSection = {
  id: 'c-embed',
  title: '46. Embedded C Patterns',
  explanation: `## Embedded C Patterns

Embedded C programming targets microcontrollers and resource-constrained systems, requiring direct hardware manipulation, interrupt handling, and state machines.

\`\`\`c
#include <stdint.h>

// Memory-mapped I/O: access hardware registers at fixed addresses
#define GPIO_BASE  0x40020000
#define GPIO_MODER (*(volatile uint32_t *)(GPIO_BASE + 0x00))
#define GPIO_ODR   (*(volatile uint32_t *)(GPIO_BASE + 0x14))

// Set pin 5 as output and toggle it
GPIO_MODER |= (1 << 10);  // MODER5 = 01 (output)
GPIO_ODR ^= (1 << 5);     // Toggle pin 5

// Interrupt Service Routine (ISR)
void __attribute__((interrupt)) TIM2_IRQHandler(void) {
    // Clear interrupt flag
    TIM2->SR &= ~TIM_SR_UIF;
    // Handle timer event
    tick_count++;
}

// State machine pattern
typedef enum { STATE_IDLE, STATE_RUN, STATE_ERROR } State;
State current_state = STATE_IDLE;

void state_machine(Event evt) {
    switch (current_state) {
    case STATE_IDLE:
        if (evt == EVT_START) current_state = STATE_RUN;
        break;
    case STATE_RUN:
        if (evt == EVT_FAULT) current_state = STATE_ERROR;
        break;
    case STATE_ERROR:
        if (evt == EVT_RESET) current_state = STATE_IDLE;
        break;
    }
}
\`\`\`

### Key Concepts
- **volatile**: prevents compiler from caching hardware register reads
- **Memory-mapped I/O**: hardware registers accessed via pointer dereferences
- **ISR (Interrupt Service Routine)**: function called by hardware interrupts
- **State machine**: common pattern for embedded control logic
- **Bitwise register manipulation**: set, clear, toggle bits in control registers
- **Bare-metal**: programming without an OS
- **Startup code**: initializes stack, data sections, then calls main
`,
  exercises: [
    {
      id: 'c-embed-1',
      title: 'Define a hardware register',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Define a macro to access a memory-mapped hardware register.',
      skeleton: `#include <stdint.h>

// Define a macro for a 32-bit read-write register at address 0x40021000
#define RCC_CR (*(__BLANK__ uint32_t *)(__BLANK__))

void enable_hse(void) {
    RCC_CR |= (1 << 16);  // Set HSEON bit
}`,
      solution: `#include <stdint.h>

#define RCC_CR (*(volatile uint32_t *)(0x40021000))

void enable_hse(void) {
    RCC_CR |= (1 << 16);
}`,
      hints: [
        'Hardware registers must be declared volatile to prevent optimization.',
        'Cast the address to a pointer, then dereference it.',
        'volatile ensures every access actually reads/writes the hardware.'
      ],
      concepts: ['volatile', 'memory-mapped I/O', 'hardware registers', 'pointer cast']
    },
    {
      id: 'c-embed-2',
      title: 'Set and clear register bits',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Set and clear specific bits in a hardware register.',
      skeleton: `#include <stdint.h>

#define REG (*(volatile uint32_t *)0x40020000)

void configure(void) {
    // Set bit 3
    REG __BLANK__ (1 << 3);

    // Clear bit 7
    REG __BLANK__ ~(1 << 7);

    // Toggle bit 5
    REG __BLANK__ (1 << 5);
}`,
      solution: `#include <stdint.h>

#define REG (*(volatile uint32_t *)0x40020000)

void configure(void) {
    REG |= (1 << 3);
    REG &= ~(1 << 7);
    REG ^= (1 << 5);
}`,
      hints: [
        '|= sets bits (OR with mask).',
        '&= ~mask clears bits (AND with inverted mask).',
        '^= toggles bits (XOR with mask).'
      ],
      concepts: ['bit set', 'bit clear', 'bit toggle', 'register manipulation']
    },
    {
      id: 'c-embed-3',
      title: 'Read a register bit field',
      type: 'fill-blank',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Extract a multi-bit field from a hardware register.',
      skeleton: `#include <stdint.h>

#define STATUS_REG (*(volatile uint32_t *)0x40020008)

// Extract bits 4:7 (4-bit field starting at bit 4)
uint8_t get_mode(void) {
    return (STATUS_REG __BLANK__ __BLANK__) & __BLANK__;
}`,
      solution: `#include <stdint.h>

#define STATUS_REG (*(volatile uint32_t *)0x40020008)

uint8_t get_mode(void) {
    return (STATUS_REG >> 4) & 0x0F;
}`,
      hints: [
        'Right-shift to move the field to bit position 0.',
        'Mask with the appropriate number of 1-bits to isolate the field.',
        '0x0F = 0b00001111 masks 4 bits.'
      ],
      concepts: ['bit field extraction', 'shift', 'mask', 'register read']
    },
    {
      id: 'c-embed-4',
      title: 'Write a bit field',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a value into a specific bit field of a register without affecting other bits.',
      skeleton: `#include <stdint.h>

#define CTRL_REG (*(volatile uint32_t *)0x40020004)

// Write 'val' (2-bit value) into bits 8:9 of CTRL_REG
void set_prescaler(uint8_t val) {
    CTRL_REG = (CTRL_REG & __BLANK__) | (__BLANK__ << __BLANK__);
}`,
      solution: `#include <stdint.h>

#define CTRL_REG (*(volatile uint32_t *)0x40020004)

void set_prescaler(uint8_t val) {
    CTRL_REG = (CTRL_REG & ~(0x3 << 8)) | ((val & 0x3) << 8);
}`,
      hints: [
        'First clear the target bits: & ~(mask << position).',
        'Then set the new value: | (value << position).',
        '0x3 << 8 creates a mask for 2 bits at position 8.'
      ],
      concepts: ['bit field write', 'read-modify-write', 'mask and shift']
    },
    {
      id: 'c-embed-5',
      title: 'Define GPIO struct overlay',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Define a struct that overlays memory-mapped GPIO registers.',
      skeleton: `#include <stdint.h>

typedef struct {
    __BLANK__ uint32_t MODER;
    __BLANK__ uint32_t OTYPER;
    __BLANK__ uint32_t OSPEEDR;
    __BLANK__ uint32_t PUPDR;
    __BLANK__ uint32_t IDR;
    __BLANK__ uint32_t ODR;
} GPIO_TypeDef;

#define GPIOA ((GPIO_TypeDef *)0x40020000)

void set_pin_output(int pin) {
    GPIOA->MODER |= (1 << (pin * 2));
}`,
      solution: `#include <stdint.h>

typedef struct {
    volatile uint32_t MODER;
    volatile uint32_t OTYPER;
    volatile uint32_t OSPEEDR;
    volatile uint32_t PUPDR;
    volatile uint32_t IDR;
    volatile uint32_t ODR;
} GPIO_TypeDef;

#define GPIOA ((GPIO_TypeDef *)0x40020000)

void set_pin_output(int pin) {
    GPIOA->MODER |= (1 << (pin * 2));
}`,
      hints: [
        'Each register field must be volatile for hardware access.',
        'The struct layout must match the hardware register layout.',
        'The struct pointer is cast from the base address of the peripheral.'
      ],
      concepts: ['register struct', 'volatile', 'peripheral overlay', 'GPIO']
    },
    {
      id: 'c-embed-6',
      title: 'Interrupt enable/disable',
      type: 'fill-blank',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Implement critical section macros to disable and restore interrupts.',
      skeleton: `#include <stdint.h>

static inline uint32_t disable_interrupts(void) {
    uint32_t primask;
    __asm__ __volatile__ ("mrs %0, primask" : "=r" (primask));
    __asm__ __volatile__ ("__BLANK__" ::: "memory");
    return primask;
}

static inline void restore_interrupts(uint32_t primask) {
    __asm__ __volatile__ ("__BLANK__ %0, primask" :: "r" (primask) : "memory");
}

void critical_section(void) {
    uint32_t saved = disable_interrupts();
    // ... modify shared data ...
    restore_interrupts(saved);
}`,
      solution: `#include <stdint.h>

static inline uint32_t disable_interrupts(void) {
    uint32_t primask;
    __asm__ __volatile__ ("mrs %0, primask" : "=r" (primask));
    __asm__ __volatile__ ("cpsid i" ::: "memory");
    return primask;
}

static inline void restore_interrupts(uint32_t primask) {
    __asm__ __volatile__ ("msr primask, %0" :: "r" (primask) : "memory");
}

void critical_section(void) {
    uint32_t saved = disable_interrupts();
    // ... modify shared data ...
    restore_interrupts(saved);
}`,
      hints: [
        'cpsid i disables interrupts on ARM Cortex-M.',
        'msr writes to a special register (primask).',
        'Save and restore PRIMASK to support nested critical sections.'
      ],
      concepts: ['critical section', 'cpsid', 'msr', 'interrupt control']
    },
    {
      id: 'c-embed-7',
      title: 'Implement a state machine',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a state machine for a traffic light controller.',
      skeleton: `#include <stdint.h>
#include <stdio.h>

typedef enum { LIGHT_RED, LIGHT_GREEN, LIGHT_YELLOW } LightState;
typedef enum { EVT_TIMER, EVT_EMERGENCY, EVT_CLEAR } Event;

typedef struct {
    LightState state;
    int timer;
} TrafficLight;

// Process an event. Update the traffic light state.
// RED --TIMER--> GREEN --TIMER--> YELLOW --TIMER--> RED
// Any state --EMERGENCY--> RED
// RED --CLEAR--> GREEN (resume normal)
void traffic_update(TrafficLight *tl, Event evt) {
    // TODO: implement
}`,
      solution: `#include <stdint.h>
#include <stdio.h>

typedef enum { LIGHT_RED, LIGHT_GREEN, LIGHT_YELLOW } LightState;
typedef enum { EVT_TIMER, EVT_EMERGENCY, EVT_CLEAR } Event;

typedef struct {
    LightState state;
    int timer;
} TrafficLight;

void traffic_update(TrafficLight *tl, Event evt) {
    if (evt == EVT_EMERGENCY) {
        tl->state = LIGHT_RED;
        tl->timer = 0;
        return;
    }

    switch (tl->state) {
    case LIGHT_RED:
        if (evt == EVT_TIMER) {
            tl->state = LIGHT_GREEN;
            tl->timer = 0;
        } else if (evt == EVT_CLEAR) {
            tl->state = LIGHT_GREEN;
            tl->timer = 0;
        }
        break;
    case LIGHT_GREEN:
        if (evt == EVT_TIMER) {
            tl->state = LIGHT_YELLOW;
            tl->timer = 0;
        }
        break;
    case LIGHT_YELLOW:
        if (evt == EVT_TIMER) {
            tl->state = LIGHT_RED;
            tl->timer = 0;
        }
        break;
    }
}`,
      hints: [
        'Handle EVT_EMERGENCY first since it applies to any state.',
        'Use a switch on current state, then check the event.',
        'Reset the timer on each state transition.'
      ],
      concepts: ['state machine', 'traffic light', 'event-driven', 'embedded control']
    },
    {
      id: 'c-embed-8',
      title: 'Implement a ring buffer for UART',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a UART ring buffer suitable for interrupt-driven serial communication.',
      skeleton: `#include <stdint.h>
#include <stdbool.h>

#define UART_BUF_SIZE 64

typedef struct {
    uint8_t buf[UART_BUF_SIZE];
    volatile uint8_t head;
    volatile uint8_t tail;
} UartBuffer;

// Initialize the buffer
void uart_buf_init(UartBuffer *rb) {
    // TODO
}

// Push a byte (called from ISR). Return true on success.
bool uart_buf_push(UartBuffer *rb, uint8_t byte) {
    // TODO
}

// Pop a byte (called from main). Return true on success.
bool uart_buf_pop(UartBuffer *rb, uint8_t *byte) {
    // TODO
}

// Check if empty
bool uart_buf_empty(UartBuffer *rb) {
    // TODO
}`,
      solution: `#include <stdint.h>
#include <stdbool.h>

#define UART_BUF_SIZE 64

typedef struct {
    uint8_t buf[UART_BUF_SIZE];
    volatile uint8_t head;
    volatile uint8_t tail;
} UartBuffer;

void uart_buf_init(UartBuffer *rb) {
    rb->head = 0;
    rb->tail = 0;
}

bool uart_buf_push(UartBuffer *rb, uint8_t byte) {
    uint8_t next = (rb->head + 1) % UART_BUF_SIZE;
    if (next == rb->tail) return false;  // full
    rb->buf[rb->head] = byte;
    rb->head = next;
    return true;
}

bool uart_buf_pop(UartBuffer *rb, uint8_t *byte) {
    if (rb->head == rb->tail) return false;  // empty
    *byte = rb->buf[rb->tail];
    rb->tail = (rb->tail + 1) % UART_BUF_SIZE;
    return true;
}

bool uart_buf_empty(UartBuffer *rb) {
    return rb->head == rb->tail;
}`,
      hints: [
        'head and tail must be volatile since ISR and main access them.',
        'Full condition: next_head == tail (wastes one slot).',
        'Empty condition: head == tail.'
      ],
      concepts: ['ring buffer', 'UART', 'ISR-safe', 'volatile', 'circular buffer']
    },
    {
      id: 'c-embed-9',
      title: 'Debounce a button press',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a software debounce function for a button connected to a GPIO pin.',
      skeleton: `#include <stdint.h>
#include <stdbool.h>

typedef struct {
    uint8_t history;
    bool state;
} Debounce;

// Initialize debounce state
void debounce_init(Debounce *db) {
    // TODO
}

// Call this every 1ms with the raw pin reading (0 or 1).
// Return true if stable state changed.
bool debounce_update(Debounce *db, bool raw) {
    // TODO: shift in new sample, detect stable high/low
}`,
      solution: `#include <stdint.h>
#include <stdbool.h>

typedef struct {
    uint8_t history;
    bool state;
} Debounce;

void debounce_init(Debounce *db) {
    db->history = 0x00;
    db->state = false;
}

bool debounce_update(Debounce *db, bool raw) {
    db->history = (db->history << 1) | (raw ? 1 : 0);
    bool old_state = db->state;

    if (db->history == 0xFF) {
        db->state = true;
    } else if (db->history == 0x00) {
        db->state = false;
    }

    return db->state != old_state;
}`,
      hints: [
        'Shift the raw reading into a history byte each sample period.',
        'All 1s (0xFF) means the button is stably pressed.',
        'All 0s (0x00) means the button is stably released.'
      ],
      concepts: ['debounce', 'button handling', 'shift register', 'GPIO input']
    },
    {
      id: 'c-embed-10',
      title: 'Implement a software timer',
      type: 'write-function',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Write a software timer module that calls callbacks at configurable intervals.',
      skeleton: `#include <stdint.h>
#include <stdbool.h>

#define MAX_TIMERS 8

typedef void (*TimerCallback)(void);

typedef struct {
    TimerCallback callback;
    uint32_t period;
    uint32_t remaining;
    bool active;
    bool repeat;
} SoftTimer;

static SoftTimer timers[MAX_TIMERS];

// Register a timer. Return timer id or -1 if full.
int timer_create(uint32_t period_ms, bool repeat, TimerCallback cb) {
    // TODO
}

// Call this every 1ms from SysTick ISR.
void timer_tick(void) {
    // TODO: decrement active timers, fire callbacks
}`,
      solution: `#include <stdint.h>
#include <stdbool.h>

#define MAX_TIMERS 8

typedef void (*TimerCallback)(void);

typedef struct {
    TimerCallback callback;
    uint32_t period;
    uint32_t remaining;
    bool active;
    bool repeat;
} SoftTimer;

static SoftTimer timers[MAX_TIMERS];

int timer_create(uint32_t period_ms, bool repeat, TimerCallback cb) {
    for (int i = 0; i < MAX_TIMERS; i++) {
        if (!timers[i].active) {
            timers[i].callback = cb;
            timers[i].period = period_ms;
            timers[i].remaining = period_ms;
            timers[i].active = true;
            timers[i].repeat = repeat;
            return i;
        }
    }
    return -1;
}

void timer_tick(void) {
    for (int i = 0; i < MAX_TIMERS; i++) {
        if (!timers[i].active) continue;
        if (--timers[i].remaining == 0) {
            timers[i].callback();
            if (timers[i].repeat) {
                timers[i].remaining = timers[i].period;
            } else {
                timers[i].active = false;
            }
        }
    }
}`,
      hints: [
        'Find the first inactive slot for timer_create.',
        'In timer_tick, decrement remaining and fire callback at zero.',
        'For repeating timers, reload remaining; for one-shot, deactivate.'
      ],
      concepts: ['software timer', 'SysTick', 'callback', 'periodic timer']
    },
    {
      id: 'c-embed-11',
      title: 'Table-driven state machine',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Implement a table-driven state machine using function pointers.',
      skeleton: `#include <stdint.h>
#include <stdio.h>

typedef enum { ST_OFF, ST_IDLE, ST_ACTIVE, ST_COUNT } State;
typedef enum { EV_POWER, EV_START, EV_STOP, EV_COUNT } EventType;

typedef State (*TransitionFunc)(void);

// Implement the transition functions and build the state table.
// OFF --POWER--> IDLE, IDLE --START--> ACTIVE, ACTIVE --STOP--> IDLE
// Any --POWER when on--> OFF
State run_state_machine(State initial, EventType *events, int n) {
    // TODO: implement with a 2D function pointer table
}`,
      solution: `#include <stdint.h>
#include <stdio.h>

typedef enum { ST_OFF, ST_IDLE, ST_ACTIVE, ST_COUNT } State;
typedef enum { EV_POWER, EV_START, EV_STOP, EV_COUNT } EventType;

static State on_power_off(void) { return ST_IDLE; }
static State on_power_idle(void) { return ST_OFF; }
static State on_power_active(void) { return ST_OFF; }
static State on_start_idle(void) { return ST_ACTIVE; }
static State on_stop_active(void) { return ST_IDLE; }
static State on_nop(void) { return ST_COUNT; }

typedef State (*TransitionFunc)(void);

static TransitionFunc table[ST_COUNT][EV_COUNT] = {
    [ST_OFF]    = { on_power_off,    on_nop,        on_nop },
    [ST_IDLE]   = { on_power_idle,   on_start_idle, on_nop },
    [ST_ACTIVE] = { on_power_active, on_nop,        on_stop_active },
};

State run_state_machine(State initial, EventType *events, int n) {
    State current = initial;
    for (int i = 0; i < n; i++) {
        TransitionFunc fn = table[current][events[i]];
        State next = fn();
        if (next != ST_COUNT) {
            current = next;
        }
    }
    return current;
}`,
      hints: [
        'Create a 2D array indexed by [state][event] of function pointers.',
        'Each function returns the next state.',
        'Use a sentinel value (ST_COUNT) to indicate no transition.'
      ],
      concepts: ['table-driven', 'state machine', 'function pointers', 'transition table']
    },
    {
      id: 'c-embed-12',
      title: 'CRC-8 calculation',
      type: 'write-function',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Implement a CRC-8 calculation commonly used in embedded communication protocols.',
      skeleton: `#include <stdint.h>

// Compute CRC-8 using polynomial 0x07 (x^8 + x^2 + x + 1).
// Process each byte bit-by-bit. Return the CRC value.
uint8_t crc8(const uint8_t *data, size_t len) {
    // TODO: implement
}`,
      solution: `#include <stdint.h>

uint8_t crc8(const uint8_t *data, size_t len) {
    uint8_t crc = 0x00;
    for (size_t i = 0; i < len; i++) {
        crc ^= data[i];
        for (int bit = 0; bit < 8; bit++) {
            if (crc & 0x80) {
                crc = (crc << 1) ^ 0x07;
            } else {
                crc <<= 1;
            }
        }
    }
    return crc;
}`,
      hints: [
        'XOR each byte into the CRC register.',
        'For each bit, shift left; if the MSB was 1, XOR with the polynomial.',
        'The polynomial 0x07 represents x^8 + x^2 + x + 1.'
      ],
      concepts: ['CRC-8', 'polynomial', 'error detection', 'embedded protocol']
    },
    {
      id: 'c-embed-13',
      title: 'Fix volatile missing on shared variable',
      type: 'fix-bug',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Fix a variable shared between an ISR and main that lacks the volatile qualifier.',
      skeleton: `#include <stdint.h>
#include <stdio.h>

// BUG: Compiler optimizes the while loop into an infinite loop
// because it doesn't know the ISR modifies tick_count
uint32_t tick_count = 0;  // Bug: should be volatile

void SysTick_Handler(void) {
    tick_count++;
}

void delay_ms(uint32_t ms) {
    uint32_t start = tick_count;
    while ((tick_count - start) < ms);  // May loop forever
}`,
      solution: `#include <stdint.h>
#include <stdio.h>

volatile uint32_t tick_count = 0;

void SysTick_Handler(void) {
    tick_count++;
}

void delay_ms(uint32_t ms) {
    uint32_t start = tick_count;
    while ((tick_count - start) < ms);
}`,
      hints: [
        'Without volatile, the compiler may cache tick_count in a register.',
        'The while loop would then check a stale value forever.',
        'volatile forces the compiler to re-read from memory each time.'
      ],
      concepts: ['volatile', 'ISR', 'shared variable', 'compiler optimization']
    },
    {
      id: 'c-embed-14',
      title: 'Fix non-atomic register access',
      type: 'fix-bug',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Fix a register read-modify-write that can be corrupted by an interrupt.',
      skeleton: `#include <stdint.h>

#define GPIOA_ODR (*(volatile uint32_t *)0x40020014)

// BUG: If an interrupt fires between read and write of ODR,
// the interrupt's changes to ODR will be lost.
void toggle_led(void) {
    GPIOA_ODR ^= (1 << 5);  // Not safe if ISR also modifies ODR
}

void some_isr(void) {
    GPIOA_ODR |= (1 << 3);  // ISR sets bit 3
}`,
      solution: `#include <stdint.h>

#define GPIOA_ODR  (*(volatile uint32_t *)0x40020014)
#define GPIOA_BSRR (*(volatile uint32_t *)0x40020018)

static inline uint32_t disable_irq(void) {
    uint32_t pm;
    __asm__ __volatile__ ("mrs %0, primask" : "=r" (pm));
    __asm__ __volatile__ ("cpsid i" ::: "memory");
    return pm;
}

static inline void restore_irq(uint32_t pm) {
    __asm__ __volatile__ ("msr primask, %0" :: "r" (pm) : "memory");
}

void toggle_led(void) {
    uint32_t saved = disable_irq();
    GPIOA_ODR ^= (1 << 5);
    restore_irq(saved);
}

void some_isr(void) {
    GPIOA_BSRR = (1 << 3);  // Atomic bit set via BSRR
}`,
      hints: [
        'Read-modify-write on ODR is not atomic -- an ISR can interrupt between steps.',
        'Protect the RMW with a critical section (disable/restore interrupts).',
        'Alternatively, use the BSRR register for atomic set/clear operations.'
      ],
      concepts: ['atomicity', 'critical section', 'BSRR', 'read-modify-write']
    },
    {
      id: 'c-embed-15',
      title: 'Fix stack overflow in ISR',
      type: 'fix-bug',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Fix an ISR that calls printf (stack-heavy and non-reentrant), causing stack overflow.',
      skeleton: `#include <stdint.h>
#include <stdio.h>

volatile uint32_t error_count = 0;

// BUG: printf uses too much stack and is not reentrant
void USART1_IRQHandler(void) {
    uint8_t data = *(volatile uint8_t *)0x40011004;
    if (data == 0xFF) {
        error_count++;
        printf("Error #%lu at byte 0x%02X\\n",
               (unsigned long)error_count, data);  // BAD
    }
}`,
      solution: `#include <stdint.h>

volatile uint32_t error_count = 0;
volatile uint8_t last_error_byte = 0;
volatile uint8_t error_flag = 0;

void USART1_IRQHandler(void) {
    uint8_t data = *(volatile uint8_t *)0x40011004;
    if (data == 0xFF) {
        error_count++;
        last_error_byte = data;
        error_flag = 1;
    }
}

// Call this from main loop
void process_errors(void) {
    if (error_flag) {
        error_flag = 0;
        // Safe to printf here -- not in ISR context
        printf("Error #%lu at byte 0x%02X\\n",
               (unsigned long)error_count, last_error_byte);
    }
}`,
      hints: [
        'ISRs should be short and avoid calling non-reentrant functions like printf.',
        'Set a flag in the ISR and handle the logging in the main loop.',
        'printf uses a large stack frame and may call malloc internally.'
      ],
      concepts: ['ISR best practices', 'reentrant', 'deferred processing', 'stack overflow']
    },
    {
      id: 'c-embed-16',
      title: 'Predict bit manipulation result',
      type: 'predict-output',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Predict the result of common embedded bit manipulation operations.',
      skeleton: `#include <stdint.h>
#include <stdio.h>

int main(void) {
    uint8_t reg = 0xA5;  // 10100101

    reg |= (1 << 1);     // Set bit 1
    printf("After set: 0x%02X\\n", reg);

    reg &= ~(1 << 5);    // Clear bit 5
    printf("After clear: 0x%02X\\n", reg);

    reg ^= (1 << 7);     // Toggle bit 7
    printf("After toggle: 0x%02X\\n", reg);
    return 0;
}`,
      solution: `#include <stdint.h>
#include <stdio.h>

int main(void) {
    uint8_t reg = 0xA5;  // 10100101

    reg |= (1 << 1);
    printf("After set: 0x%02X\\n", reg);

    reg &= ~(1 << 5);
    printf("After clear: 0x%02X\\n", reg);

    reg ^= (1 << 7);
    printf("After toggle: 0x%02X\\n", reg);
    return 0;
}

// Output:
// After set: 0xA7
// After clear: 0x87
// After toggle: 0x07`,
      hints: [
        '0xA5 = 10100101. Setting bit 1: 10100111 = 0xA7.',
        'Clearing bit 5 of 0xA7: 10000111 = 0x87.',
        'Toggling bit 7 of 0x87: 00000111 = 0x07.'
      ],
      concepts: ['bit set', 'bit clear', 'bit toggle', 'hex arithmetic']
    },
    {
      id: 'c-embed-17',
      title: 'Predict struct padding',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the size of a packed vs unpacked struct for register overlays.',
      skeleton: `#include <stdint.h>
#include <stdio.h>

struct Unpacked {
    uint8_t a;
    uint32_t b;
    uint8_t c;
};

struct __attribute__((packed)) Packed {
    uint8_t a;
    uint32_t b;
    uint8_t c;
};

int main(void) {
    printf("Unpacked: %zu\\n", sizeof(struct Unpacked));
    printf("Packed: %zu\\n", sizeof(struct Packed));
    return 0;
}`,
      solution: `#include <stdint.h>
#include <stdio.h>

struct Unpacked {
    uint8_t a;
    uint32_t b;
    uint8_t c;
};

struct __attribute__((packed)) Packed {
    uint8_t a;
    uint32_t b;
    uint8_t c;
};

int main(void) {
    printf("Unpacked: %zu\\n", sizeof(struct Unpacked));
    printf("Packed: %zu\\n", sizeof(struct Packed));
    return 0;
}

// Output:
// Unpacked: 12
// Packed: 6`,
      hints: [
        'The compiler aligns uint32_t to 4-byte boundaries by default.',
        'Unpacked: 1 byte + 3 padding + 4 bytes + 1 byte + 3 padding = 12.',
        'Packed removes all padding: 1 + 4 + 1 = 6 bytes.'
      ],
      concepts: ['struct packing', '__attribute__((packed))', 'alignment', 'padding']
    },
    {
      id: 'c-embed-18',
      title: 'Predict endianness effect',
      type: 'predict-output',
      difficulty: 'intermediate',
      language: 'c',
      goal: 'Predict the byte-level layout of a 32-bit value on a little-endian system.',
      skeleton: `#include <stdint.h>
#include <stdio.h>

int main(void) {
    uint32_t val = 0xDEADBEEF;
    uint8_t *bytes = (uint8_t *)&val;

    // Assuming little-endian (x86, ARM default)
    printf("%02X %02X %02X %02X\\n",
           bytes[0], bytes[1], bytes[2], bytes[3]);
    return 0;
}`,
      solution: `#include <stdint.h>
#include <stdio.h>

int main(void) {
    uint32_t val = 0xDEADBEEF;
    uint8_t *bytes = (uint8_t *)&val;

    printf("%02X %02X %02X %02X\\n",
           bytes[0], bytes[1], bytes[2], bytes[3]);
    return 0;
}

// Output:
// EF BE AD DE`,
      hints: [
        'Little-endian stores the least significant byte first.',
        '0xDEADBEEF: least significant byte is 0xEF.',
        'Byte order: EF, BE, AD, DE (from lowest to highest address).'
      ],
      concepts: ['endianness', 'little-endian', 'byte order', 'type punning']
    },
    {
      id: 'c-embed-19',
      title: 'Refactor magic numbers to defines',
      type: 'refactor',
      difficulty: 'beginner',
      language: 'c',
      goal: 'Refactor hardcoded register addresses and bit positions to named constants.',
      skeleton: `#include <stdint.h>

// Refactor all magic numbers to #defines with descriptive names.
void init_uart(void) {
    *(volatile uint32_t *)0x40021018 |= (1 << 14);
    *(volatile uint32_t *)0x40020000 &= ~(3 << 18);
    *(volatile uint32_t *)0x40020000 |= (2 << 18);
    *(volatile uint32_t *)0x40011008 = 0x0683;
    *(volatile uint32_t *)0x4001100C = (1 << 3) | (1 << 2) | (1 << 13);
}`,
      solution: `#include <stdint.h>

#define RCC_APB2ENR    (*(volatile uint32_t *)0x40021018)
#define GPIOA_MODER    (*(volatile uint32_t *)0x40020000)
#define USART1_BRR     (*(volatile uint32_t *)0x40011008)
#define USART1_CR1     (*(volatile uint32_t *)0x4001100C)

#define RCC_USART1EN   (1 << 14)
#define MODER9_MASK    (3 << 18)
#define MODER9_AF      (2 << 18)
#define BRR_9600       0x0683
#define CR1_TE         (1 << 3)
#define CR1_RE         (1 << 2)
#define CR1_UE         (1 << 13)

void init_uart(void) {
    RCC_APB2ENR |= RCC_USART1EN;
    GPIOA_MODER &= ~MODER9_MASK;
    GPIOA_MODER |= MODER9_AF;
    USART1_BRR = BRR_9600;
    USART1_CR1 = CR1_TE | CR1_RE | CR1_UE;
}`,
      hints: [
        'Give each register address a meaningful name.',
        'Name bit positions after their function (TE = Transmit Enable).',
        'Named constants make the code self-documenting.'
      ],
      concepts: ['named constants', 'readability', 'register defines', 'embedded style']
    },
    {
      id: 'c-embed-20',
      title: 'Refactor polling to interrupt-driven',
      type: 'refactor',
      difficulty: 'advanced',
      language: 'c',
      goal: 'Refactor a polling-based UART receiver to use interrupts with a ring buffer.',
      skeleton: `#include <stdint.h>

#define USART1_SR  (*(volatile uint32_t *)0x40011000)
#define USART1_DR  (*(volatile uint32_t *)0x40011004)
#define SR_RXNE    (1 << 5)

// Refactor: polling approach wastes CPU cycles
void uart_receive_polling(char *buf, int len) {
    for (int i = 0; i < len; i++) {
        while (!(USART1_SR & SR_RXNE));  // Busy wait
        buf[i] = (char)USART1_DR;
    }
}`,
      solution: `#include <stdint.h>
#include <stdbool.h>

#define USART1_SR  (*(volatile uint32_t *)0x40011000)
#define USART1_DR  (*(volatile uint32_t *)0x40011004)
#define USART1_CR1 (*(volatile uint32_t *)0x4001100C)
#define SR_RXNE    (1 << 5)
#define CR1_RXNEIE (1 << 5)

#define RX_BUF_SIZE 128

static volatile uint8_t rx_buf[RX_BUF_SIZE];
static volatile uint8_t rx_head = 0;
static volatile uint8_t rx_tail = 0;

void uart_init_interrupt(void) {
    USART1_CR1 |= CR1_RXNEIE;
    // Also enable USART1 IRQ in NVIC (hardware-specific)
}

void USART1_IRQHandler(void) {
    if (USART1_SR & SR_RXNE) {
        uint8_t data = (uint8_t)USART1_DR;
        uint8_t next = (rx_head + 1) % RX_BUF_SIZE;
        if (next != rx_tail) {
            rx_buf[rx_head] = data;
            rx_head = next;
        }
    }
}

int uart_receive(char *buf, int len) {
    int count = 0;
    while (count < len && rx_head != rx_tail) {
        buf[count++] = rx_buf[rx_tail];
        rx_tail = (rx_tail + 1) % RX_BUF_SIZE;
    }
    return count;
}`,
      hints: [
        'Enable the RXNE interrupt in the USART control register.',
        'In the ISR, read the data register and push into a ring buffer.',
        'The main code reads from the ring buffer instead of busy-waiting.'
      ],
      concepts: ['interrupt-driven', 'polling vs interrupt', 'ring buffer', 'UART ISR']
    }
  ]
};
