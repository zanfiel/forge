<!--
  NotificationToast.svelte -- Toast notification system
-->

<script lang="ts">
  import { store } from '../stores/app.svelte.ts';
</script>

{#if store.notifications.length > 0}
  <div class="toast-container">
    {#each store.notifications as notif (notif.id)}
      <div class="toast toast-{notif.type}">
        <span class="toast-icon">
          {#if notif.type === 'success'}&#10003;
          {:else if notif.type === 'error'}&#10007;
          {:else if notif.type === 'warning'}&#9888;
          {:else}&#8505;
          {/if}
        </span>
        <span class="toast-message">{notif.message}</span>
        <button class="toast-close" onclick={() => store.dismissNotification(notif.id)}>x</button>
      </div>
    {/each}
  </div>
{/if}

<style>
  .toast-container {
    position: fixed;
    bottom: 36px;
    right: 16px;
    z-index: 9990;
    display: flex;
    flex-direction: column-reverse;
    gap: 8px;
    pointer-events: none;
  }

  .toast {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    background: var(--bg-raised);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text-primary);
    font-size: 12px;
    font-family: var(--font-sans);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    pointer-events: all;
    animation: slideIn 0.2s ease-out;
    max-width: 400px;
  }

  @keyframes slideIn {
    from { transform: translateX(20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  .toast-icon {
    flex-shrink: 0;
    font-size: 14px;
    width: 20px;
    text-align: center;
  }

  .toast-info .toast-icon { color: var(--blue); }
  .toast-success .toast-icon { color: var(--green); }
  .toast-warning .toast-icon { color: var(--yellow); }
  .toast-error .toast-icon { color: var(--red); }

  .toast-info { border-left: 3px solid var(--blue); }
  .toast-success { border-left: 3px solid var(--green); }
  .toast-warning { border-left: 3px solid var(--yellow); }
  .toast-error { border-left: 3px solid var(--red); }

  .toast-message {
    flex: 1;
    line-height: 1.4;
  }

  .toast-close {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    color: var(--text-muted);
    font-size: 12px;
  }
  .toast-close:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
  }
</style>
