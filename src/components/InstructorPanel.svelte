<!--
  InstructorPanel.svelte — Full Coding Instructor
  
  Teaching flow:
  1. Pick a language track
  2. Read the lesson explanation
  3. Work through exercises (fill blanks → write functions → free write)
  4. Get progressive hints (3 levels)
  5. Submit → AI validates and gives feedback
  6. Ask questions anytime via chat sub-mode
-->

<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { store, uid, type ChatMessage } from '../stores/app.svelte.ts';
  import { tracks, getTrack } from '../lib/tracks';
  import type { Track, LessonSection, Exercise } from '../stores/app.svelte.ts';
  import * as api from '../lib/api';

  let scrollEl: HTMLDivElement;
  let questionText = $state('');
  let questionEl: HTMLTextAreaElement;

  // ─── Derived State ────────────────────────

  let activeTrack = $derived(
    store.instructor.activeTrackId ? getTrack(store.instructor.activeTrackId) : null
  );

  let currentSection = $derived(
    activeTrack?.sections[store.instructor.sectionIndex] ?? null
  );

  let currentExercise = $derived(
    currentSection?.exercises[store.instructor.exerciseIndex] ?? null
  );

  let sectionProgress = $derived(() => {
    if (!currentSection) return 0;
    const done = currentSection.exercises.filter(e => store.instructor.completed.has(e.id)).length;
    return Math.round((done / currentSection.exercises.length) * 100);
  });

  let trackProgress = $derived(() => {
    if (!activeTrack) return 0;
    const total = activeTrack.sections.reduce((sum, s) => sum + s.exercises.length, 0);
    const done = activeTrack.sections.reduce(
      (sum, s) => sum + s.exercises.filter(e => store.instructor.completed.has(e.id)).length, 0
    );
    return total > 0 ? Math.round((done / total) * 100) : 0;
  });

  // ─── Actions ──────────────────────────────

  function selectTrack(trackId: string) {
    store.instructor.activeTrackId = trackId;
    store.instructor.sectionIndex = 0;
    store.instructor.exerciseIndex = 0;
    store.instructor.hintsRevealed = 0;
    store.instructor.status = 'idle';
    store.instructor.feedback = '';
    store.instructor.attempts = 0;
    store.instructor.chatMode = false;
    store.instructor.chatMessages = [];
  }

  function backToTracks() {
    store.instructor.activeTrackId = null;
  }

  function startExercise(exercise: Exercise) {
    store.instructor.status = 'working';
    store.instructor.hintsRevealed = 0;
    store.instructor.feedback = '';
    store.instructor.attempts = 0;

    // Load the skeleton into a virtual tab in the editor
    const ext = exercise.language === 'typescript' ? '.ts' : exercise.language === 'python' ? '.py' : '.rs';
    const tabName = `exercise${ext}`;
    const tabPath = `__instructor__/${exercise.id}${ext}`;

    // Remove any existing exercise tab
    const existingIdx = store.openTabs.findIndex(t => t.path.startsWith('__instructor__/'));
    if (existingIdx !== -1) {
      store.openTabs.splice(existingIdx, 1);
    }

    // Add new exercise tab
    store.openTabs.push({
      path: tabPath,
      name: tabName,
      content: exercise.skeleton,
      modified: false,
      language: exercise.language === 'typescript' ? 'typescript' : exercise.language === 'python' ? 'python' : 'rust',
    });
    store.activeTabIndex = store.openTabs.length - 1;
  }

  function revealHint() {
    if (store.instructor.hintsRevealed < 3) {
      store.instructor.hintsRevealed++;
    }
  }

  async function submitSolution() {
    if (!currentExercise) return;
    store.instructor.status = 'submitted';
    store.instructor.attempts++;
    store.isAiThinking = true;

    // Get the student's code from the editor tab
    const exerciseTab = store.openTabs.find(t => t.path.startsWith('__instructor__/'));
    const studentCode = exerciseTab?.content || '';

    // Build validation prompt
    const prompt = `You are a coding instructor validating a student's exercise submission.

EXERCISE: ${currentExercise.title}
TYPE: ${currentExercise.type}
LANGUAGE: ${currentExercise.language}
GOAL: ${currentExercise.goal}

EXPECTED SOLUTION:
\`\`\`${currentExercise.language}
${currentExercise.solution}
\`\`\`

STUDENT'S CODE:
\`\`\`${currentExercise.language}
${studentCode}
\`\`\`

Evaluate the student's code. Respond in this exact JSON format:
{
  "passed": true/false,
  "feedback": "Your feedback here — be encouraging, specific, and educational. If wrong, explain WHY without giving the full answer. If close, point out exactly what needs to change. If correct, praise what they did well and mention any style improvements. Keep it 2-4 sentences.",
  "fixHint": "If failed: one specific hint about what to fix. If passed: null"
}

Be strict on correctness but kind in tone. The goal is learning, not gatekeeping. Accept reasonable variations (different variable names, slight formatting differences, alternative approaches that achieve the same result).`;

    try {
      const resp = await api.chat(prompt, `instructor-${store.sessionId}`);
      const text = resp.text || resp.error || 'No response from AI';

      // Try to parse JSON from the response
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const result = JSON.parse(jsonMatch[0]);
          if (result.passed) {
            store.instructor.status = 'passed';
            store.instructor.completed.add(currentExercise.id);
            store.instructor.completed = new Set(store.instructor.completed); // trigger reactivity
          } else {
            store.instructor.status = 'failed';
          }
          store.instructor.feedback = result.feedback + (result.fixHint ? `\n\n💡 ${result.fixHint}` : '');
        } else {
          store.instructor.feedback = text;
          store.instructor.status = 'failed';
        }
      } catch {
        store.instructor.feedback = text;
        store.instructor.status = 'failed';
      }
    } catch (err: any) {
      store.instructor.feedback = `⚠️ Couldn't reach AI: ${err.message}\n\nCompare your code with the hints and try again.`;
      store.instructor.status = 'failed';
    }

    store.isAiThinking = false;
    await tick();
    scrollEl?.scrollTo({ top: scrollEl.scrollHeight, behavior: 'smooth' });
  }

  function nextExercise() {
    if (!currentSection || !activeTrack) return;

    if (store.instructor.exerciseIndex < currentSection.exercises.length - 1) {
      store.instructor.exerciseIndex++;
    } else if (store.instructor.sectionIndex < activeTrack.sections.length - 1) {
      store.instructor.sectionIndex++;
      store.instructor.exerciseIndex = 0;
    }

    store.instructor.status = 'idle';
    store.instructor.hintsRevealed = 0;
    store.instructor.feedback = '';
    store.instructor.attempts = 0;
  }

  function showSolution() {
    if (!currentExercise) return;
    const exerciseTab = store.openTabs.find(t => t.path.startsWith('__instructor__/'));
    if (exerciseTab) {
      exerciseTab.content = currentExercise.solution;
      exerciseTab.modified = true;
    }
    store.instructor.status = 'passed';
    store.instructor.feedback = '📖 Solution revealed. Study it carefully — then try the next exercise without peeking!';
    // Don't mark as completed when solution is revealed
  }

  // ─── Ask a Question (chat sub-mode) ──────

  async function askQuestion() {
    const text = questionText.trim();
    if (!text || store.isAiThinking) return;

    store.instructor.chatMessages.push({
      id: uid(), role: 'user', content: text, timestamp: Date.now(),
    });
    questionText = '';
    store.isAiThinking = true;

    const context = currentExercise
      ? `The student is working on: "${currentExercise.title}" (${currentExercise.language}).
Goal: ${currentExercise.goal}
Concepts: ${currentExercise.concepts.join(', ')}`
      : activeTrack
      ? `The student is learning ${activeTrack.name}.`
      : 'The student is browsing language tracks.';

    const prompt = `You are a patient, encouraging coding instructor. ${context}

The student asks: "${text}"

Explain clearly using simple language. Use code examples. Don't give full solutions to exercises — guide them to figure it out. Keep responses concise (3-6 sentences). If they ask something unrelated, gently redirect to the current exercise.`;

    try {
      const resp = await api.chat(prompt, `instructor-chat-${store.sessionId}`);
      store.instructor.chatMessages.push({
        id: uid(), role: 'assistant',
        content: resp.text || resp.error || 'No response',
        timestamp: Date.now(),
      });
    } catch (err: any) {
      store.instructor.chatMessages.push({
        id: uid(), role: 'assistant',
        content: `⚠️ Couldn't reach AI: ${err.message}`,
        timestamp: Date.now(),
      });
    }

    store.isAiThinking = false;
    await tick();
    scrollEl?.scrollTo({ top: scrollEl.scrollHeight, behavior: 'smooth' });
  }

  function handleQuestionKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
    }
  }

  function typeLabel(type: string): string {
    const labels: Record<string, string> = {
      'fill-blank': '📝 Fill in the Blanks',
      'write-function': '✍️ Write a Function',
      'fix-bug': '🐛 Fix the Bug',
      'free-write': '🚀 Write from Scratch',
      'predict-output': '🔮 Predict the Output',
      'refactor': '♻️ Refactor',
    };
    return labels[type] || type;
  }

  function diffLabel(diff: string): string {
    return diff === 'beginner' ? '🟢 Beginner' : diff === 'intermediate' ? '🟡 Intermediate' : '🔴 Advanced';
  }

  function renderMd(text: string): string {
    return text
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="code-block"><code>$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/^## (.+)$/gm, '<h3>$1</h3>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
  }
</script>

<div class="instructor" bind:this={scrollEl}>

  <!-- ═══════ TRACK SELECTION ═══════ -->
  {#if !activeTrack}
    <div class="track-select">
      <div class="panel-header">
        <span class="panel-icon">🎓</span>
        <h2>Learn to Code</h2>
      </div>
      <p class="panel-subtitle">Pick a language. Work through exercises. Write real code.</p>

      <div class="track-grid">
        {#each tracks as track}
          <button class="track-card" onclick={() => selectTrack(track.id)}>
            <span class="track-icon">{track.icon}</span>
            <div class="track-info">
              <span class="track-name">{track.name}</span>
              <span class="track-desc">{track.description}</span>
              <span class="track-meta">
                {track.sections.length} sections · {track.sections.reduce((s, sec) => s + sec.exercises.length, 0)} exercises
              </span>
            </div>
          </button>
        {/each}
      </div>
    </div>

  <!-- ═══════ ACTIVE TRACK ═══════ -->
  {:else}
    <!-- Track header -->
    <div class="track-header">
      <button class="back-btn" onclick={backToTracks}>← Tracks</button>
      <span class="track-badge">{activeTrack.icon} {activeTrack.name}</span>
      <div class="progress-bar">
        <div class="progress-fill" style="width: {trackProgress()}%"></div>
      </div>
      <span class="progress-text">{trackProgress()}%</span>
    </div>

    <!-- Section nav -->
    <div class="section-nav">
      {#each activeTrack.sections as section, i}
        <button
          class="section-tab"
          class:active={i === store.instructor.sectionIndex}
          class:complete={section.exercises.every(e => store.instructor.completed.has(e.id))}
          onclick={() => { store.instructor.sectionIndex = i; store.instructor.exerciseIndex = 0; store.instructor.status = 'idle'; }}
        >
          {section.title}
        </button>
      {/each}
    </div>

    {#if currentSection}
      <div class="section-content">

        <!-- ─── Lesson Explanation ─── -->
        {#if store.instructor.status === 'idle'}
          <div class="explanation">
            {@html renderMd(currentSection.explanation)}
          </div>

          <!-- Exercise list -->
          <div class="exercise-list">
            <h4>Exercises</h4>
            {#each currentSection.exercises as exercise, i}
              <button
                class="exercise-card"
                class:completed={store.instructor.completed.has(exercise.id)}
                class:current={i === store.instructor.exerciseIndex}
                onclick={() => { store.instructor.exerciseIndex = i; startExercise(exercise); }}
              >
                <span class="ex-status">
                  {store.instructor.completed.has(exercise.id) ? '✅' : i === store.instructor.exerciseIndex ? '▶' : '○'}
                </span>
                <div class="ex-info">
                  <span class="ex-title">{exercise.title}</span>
                  <span class="ex-meta">{typeLabel(exercise.type)} · {diffLabel(exercise.difficulty)}</span>
                </div>
              </button>
            {/each}
          </div>

        <!-- ─── Active Exercise ─── -->
        {:else if currentExercise}
          <div class="exercise-active">
            <!-- Exercise header -->
            <div class="ex-header">
              <div class="ex-header-top">
                <span class="ex-type-badge">{typeLabel(currentExercise.type)}</span>
                <span class="ex-diff-badge">{diffLabel(currentExercise.difficulty)}</span>
              </div>
              <h3>{currentExercise.title}</h3>
              <p class="ex-goal">{currentExercise.goal}</p>
              <div class="ex-concepts">
                {#each currentExercise.concepts as concept}
                  <span class="concept-tag">{concept}</span>
                {/each}
              </div>
            </div>

            <!-- Hints -->
            <div class="hints-section">
              <div class="hints-header">
                <span>💡 Hints ({store.instructor.hintsRevealed}/3)</span>
                {#if store.instructor.hintsRevealed < 3}
                  <button class="hint-btn" onclick={revealHint}>
                    Show hint {store.instructor.hintsRevealed + 1}
                  </button>
                {/if}
              </div>
              {#each currentExercise.hints.slice(0, store.instructor.hintsRevealed) as hint, i}
                <div class="hint" class:hint-1={i===0} class:hint-2={i===1} class:hint-3={i===2}>
                  <span class="hint-level">{i === 0 ? '🤔 Nudge' : i === 1 ? '🎯 Approach' : '🔑 Nearly There'}</span>
                  <p>{hint}</p>
                </div>
              {/each}
            </div>

            <!-- Action buttons -->
            <div class="exercise-actions">
              {#if store.instructor.status === 'working' || store.instructor.status === 'failed'}
                <button class="btn-primary" onclick={submitSolution} disabled={store.isAiThinking}>
                  {store.isAiThinking ? '⏳ Checking...' : store.instructor.attempts > 0 ? '🔄 Retry' : '✅ Submit'}
                </button>
                {#if store.instructor.attempts >= 3}
                  <button class="btn-ghost" onclick={showSolution}>👀 Show Solution</button>
                {/if}
              {/if}

              {#if store.instructor.status === 'passed'}
                <button class="btn-primary" onclick={nextExercise}>Next Exercise →</button>
              {/if}

              <button class="btn-ghost" onclick={() => { store.instructor.status = 'idle'; }}>
                ← Back to Lesson
              </button>
            </div>

            <!-- Feedback -->
            {#if store.instructor.feedback}
              <div class="feedback" class:pass={store.instructor.status === 'passed'} class:fail={store.instructor.status === 'failed'}>
                <div class="feedback-icon">{store.instructor.status === 'passed' ? '🎉' : '💪'}</div>
                <p>{store.instructor.feedback}</p>
              </div>
            {/if}
          </div>
        {/if}
      </div>
    {/if}

    <!-- ─── Ask a Question (always visible) ─── -->
    <div class="question-area">
      {#if store.instructor.chatMessages.length > 0}
        <div class="q-messages">
          {#each store.instructor.chatMessages as msg (msg.id)}
            <div class="q-msg {msg.role}">
              <span class="q-avatar">{msg.role === 'user' ? '👤' : '🎓'}</span>
              <div class="q-body">{@html renderMd(msg.content)}</div>
            </div>
          {/each}
        </div>
      {/if}
      <div class="q-input">
        <textarea
          bind:this={questionEl}
          bind:value={questionText}
          onkeydown={handleQuestionKeydown}
          placeholder="Ask a question about the lesson..."
          rows="1"
        ></textarea>
        <button class="send-btn" onclick={askQuestion} disabled={!questionText.trim() || store.isAiThinking}>
          {store.isAiThinking ? '⏳' : '?'}
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  .instructor {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  /* ─── Track Selection ──────────────── */
  .track-select { padding: 20px 16px; }

  .panel-header {
    display: flex; align-items: center; gap: 10px; margin-bottom: 4px;
  }
  .panel-icon { font-size: 24px; }
  .panel-header h2 { font-size: 18px; font-weight: 700; }
  .panel-subtitle { color: var(--text-muted); font-size: 13px; margin-bottom: 20px; }

  .track-grid { display: flex; flex-direction: column; gap: 8px; }

  .track-card {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 14px 16px; background: var(--bg-raised);
    border: 1px solid var(--border); border-radius: var(--radius);
    text-align: left; transition: all 0.2s;
  }
  .track-card:hover {
    border-color: var(--accent); background: var(--bg-hover);
    transform: translateY(-1px);
  }
  .track-icon { font-size: 28px; flex-shrink: 0; margin-top: 2px; }
  .track-info { display: flex; flex-direction: column; gap: 2px; }
  .track-name { font-weight: 600; font-size: 14px; }
  .track-desc { font-size: 12px; color: var(--text-secondary); line-height: 1.4; }
  .track-meta { font-size: 11px; color: var(--text-muted); margin-top: 4px; }

  /* ─── Track Header ─────────────────── */
  .track-header {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 12px; border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }
  .back-btn {
    font-size: 12px; color: var(--text-muted); padding: 4px 8px;
    border-radius: var(--radius-sm); transition: all 0.15s;
  }
  .back-btn:hover { background: var(--bg-hover); color: var(--text-primary); }
  .track-badge {
    font-size: 12px; font-weight: 600; padding: 2px 8px;
    background: var(--accent-dim); border-radius: 999px; color: var(--accent);
  }
  .progress-bar {
    flex: 1; height: 4px; background: var(--bg-raised);
    border-radius: 2px; overflow: hidden;
  }
  .progress-fill {
    height: 100%; background: var(--accent);
    border-radius: 2px; transition: width 0.3s;
  }
  .progress-text { font-size: 11px; color: var(--text-muted); min-width: 28px; text-align: right; }

  /* ─── Section Nav ──────────────────── */
  .section-nav {
    display: flex; overflow-x: auto; gap: 2px;
    padding: 6px 8px; border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }
  .section-tab {
    font-size: 11px; padding: 4px 10px; border-radius: 999px;
    color: var(--text-secondary); white-space: nowrap; transition: all 0.15s;
  }
  .section-tab:hover { background: var(--bg-hover); }
  .section-tab.active { background: var(--accent); color: white; }
  .section-tab.complete { color: var(--green); }

  /* ─── Section Content ──────────────── */
  .section-content { flex: 1; padding: 16px; overflow-y: auto; }

  .explanation {
    font-size: 13px; line-height: 1.7; color: var(--text-primary);
    margin-bottom: 20px;
  }
  .explanation :global(h3) { font-size: 16px; color: var(--accent); margin: 16px 0 8px; }
  .explanation :global(.code-block) {
    background: var(--bg-raised); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 12px; margin: 8px 0;
    font-family: var(--font-mono); font-size: 12px; line-height: 1.5; overflow-x: auto;
  }
  .explanation :global(.inline-code) {
    background: var(--bg-raised); padding: 1px 5px; border-radius: 3px;
    font-family: var(--font-mono); font-size: 12px; color: var(--cyan);
  }
  .explanation :global(li) { margin-left: 16px; margin-bottom: 4px; }

  /* ─── Exercise List ────────────────── */
  .exercise-list h4 {
    font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;
    color: var(--text-muted); margin-bottom: 8px;
  }
  .exercise-card {
    display: flex; align-items: center; gap: 10px; width: 100%;
    padding: 10px 12px; background: var(--bg-raised);
    border: 1px solid var(--border); border-radius: var(--radius-sm);
    text-align: left; transition: all 0.15s; margin-bottom: 4px;
  }
  .exercise-card:hover { border-color: var(--accent); background: var(--bg-hover); }
  .exercise-card.completed { border-color: var(--green); }
  .exercise-card.current { border-color: var(--accent); }
  .ex-status { font-size: 16px; flex-shrink: 0; width: 20px; text-align: center; }
  .ex-info { display: flex; flex-direction: column; gap: 2px; }
  .ex-title { font-size: 13px; font-weight: 500; }
  .ex-meta { font-size: 11px; color: var(--text-muted); }

  /* ─── Active Exercise ──────────────── */
  .exercise-active { animation: fadeIn 0.2s ease-out; }

  .ex-header { margin-bottom: 16px; }
  .ex-header-top { display: flex; gap: 6px; margin-bottom: 8px; }
  .ex-type-badge, .ex-diff-badge {
    font-size: 11px; padding: 2px 8px; border-radius: 999px;
    background: var(--bg-raised); color: var(--text-secondary);
  }
  .ex-header h3 { font-size: 16px; font-weight: 600; margin-bottom: 6px; }
  .ex-goal { font-size: 13px; color: var(--text-secondary); line-height: 1.5; }
  .ex-concepts { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 8px; }
  .concept-tag {
    font-size: 10px; padding: 2px 6px; border-radius: 3px;
    background: var(--accent-dim); color: var(--accent); font-family: var(--font-mono);
  }

  /* ─── Hints ────────────────────────── */
  .hints-section { margin-bottom: 16px; }
  .hints-header {
    display: flex; align-items: center; justify-content: space-between;
    font-size: 12px; color: var(--text-secondary); margin-bottom: 8px;
  }
  .hint-btn {
    font-size: 11px; padding: 3px 10px; border-radius: 999px;
    background: var(--bg-raised); border: 1px solid var(--border);
    color: var(--yellow); transition: all 0.15s;
  }
  .hint-btn:hover { background: var(--bg-hover); border-color: var(--yellow); }

  .hint {
    padding: 10px 12px; border-radius: var(--radius-sm); margin-bottom: 6px;
    font-size: 12px; line-height: 1.5; animation: fadeIn 0.3s ease-out;
  }
  .hint-1 { background: rgba(251, 191, 36, 0.08); border-left: 3px solid var(--yellow); }
  .hint-2 { background: rgba(96, 165, 250, 0.08); border-left: 3px solid var(--blue); }
  .hint-3 { background: rgba(74, 222, 128, 0.08); border-left: 3px solid var(--green); }
  .hint-level { font-weight: 600; font-size: 11px; display: block; margin-bottom: 2px; }
  .hint p { color: var(--text-primary); margin: 0; }

  /* ─── Actions ──────────────────────── */
  .exercise-actions { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }

  .btn-primary {
    padding: 8px 16px; border-radius: var(--radius); font-size: 13px;
    font-weight: 600; background: var(--accent); color: white; transition: all 0.15s;
  }
  .btn-primary:hover:not(:disabled) { background: var(--accent-hover); transform: translateY(-1px); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

  .btn-ghost {
    padding: 8px 16px; border-radius: var(--radius); font-size: 13px;
    color: var(--text-secondary); transition: all 0.15s;
  }
  .btn-ghost:hover { background: var(--bg-hover); color: var(--text-primary); }

  /* ─── Feedback ─────────────────────── */
  .feedback {
    display: flex; gap: 10px; padding: 12px; border-radius: var(--radius);
    font-size: 13px; line-height: 1.5; animation: fadeIn 0.3s ease-out;
  }
  .feedback.pass { background: rgba(74, 222, 128, 0.08); border: 1px solid rgba(74, 222, 128, 0.2); }
  .feedback.fail { background: rgba(251, 191, 36, 0.08); border: 1px solid rgba(251, 191, 36, 0.2); }
  .feedback-icon { font-size: 20px; flex-shrink: 0; }
  .feedback p { margin: 0; color: var(--text-primary); white-space: pre-wrap; }

  /* ─── Question Area ────────────────── */
  .question-area {
    border-top: 1px solid var(--border); padding: 8px 12px;
    flex-shrink: 0; margin-top: auto;
  }
  .q-messages {
    max-height: 200px; overflow-y: auto;
    display: flex; flex-direction: column; gap: 8px;
    margin-bottom: 8px; padding-top: 4px;
  }
  .q-msg { display: flex; gap: 8px; font-size: 12px; animation: fadeIn 0.2s; }
  .q-avatar { font-size: 14px; flex-shrink: 0; }
  .q-body { color: var(--text-primary); line-height: 1.5; }
  .q-body :global(.code-block) {
    background: var(--bg-raised); padding: 6px 8px; border-radius: 4px;
    font-family: var(--font-mono); font-size: 11px; margin: 4px 0;
  }
  .q-body :global(.inline-code) {
    background: var(--bg-raised); padding: 0 4px; border-radius: 2px;
    font-family: var(--font-mono); font-size: 11px; color: var(--cyan);
  }

  .q-input { display: flex; gap: 6px; align-items: flex-end; }
  .q-input textarea {
    flex: 1; resize: none; border: 1px solid var(--border);
    background: var(--bg-raised); color: var(--text-primary);
    font-family: var(--font-sans); font-size: 12px;
    padding: 8px 10px; border-radius: var(--radius);
    outline: none; line-height: 1.4; max-height: 80px;
    transition: border-color 0.15s;
  }
  .q-input textarea:focus { border-color: var(--accent); }
  .q-input textarea::placeholder { color: var(--text-muted); }

  .send-btn {
    width: 32px; height: 32px; border-radius: var(--radius);
    background: var(--accent); color: white; font-size: 14px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s; flex-shrink: 0;
  }
  .send-btn:hover:not(:disabled) { background: var(--accent-hover); }
  .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
</style>
