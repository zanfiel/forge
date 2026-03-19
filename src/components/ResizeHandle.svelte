<!--
  ResizeHandle.svelte — Draggable divider between panels.
  Supports horizontal (left/right) and vertical (top/bottom) resize.
  Double-click resets to default size.
-->

<script lang="ts">
  interface Props {
    direction: 'horizontal' | 'vertical';
    min: number;
    max: number;
    defaultSize: number;
    value: number;
    onResize: (size: number) => void;
    /** Invert drag direction (for right/bottom panels where drag-left = grow) */
    reverse?: boolean;
  }

  let { direction, min, max, defaultSize, value, onResize, reverse = false }: Props = $props();

  let dragging = $state(false);

  function onPointerDown(e: PointerEvent) {
    e.preventDefault();
    dragging = true;
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);

    const startPos = direction === 'horizontal' ? e.clientX : e.clientY;
    const startSize = value;

    function onPointerMove(ev: PointerEvent) {
      let delta: number;
      if (direction === 'horizontal') {
        delta = reverse ? startPos - ev.clientX : ev.clientX - startPos;
      } else {
        delta = startPos - ev.clientY; // vertical: dragging up = bigger
      }
      const newSize = Math.round(Math.min(max, Math.max(min, startSize + delta)));
      onResize(newSize);
    }

    function onPointerUp() {
      dragging = false;
      target.removeEventListener('pointermove', onPointerMove);
      target.removeEventListener('pointerup', onPointerUp);
    }

    target.addEventListener('pointermove', onPointerMove);
    target.addEventListener('pointerup', onPointerUp);
  }

  function onDblClick() {
    onResize(defaultSize);
  }
</script>

<div
  class="resize-handle {direction}"
  class:dragging
  onpointerdown={onPointerDown}
  ondblclick={onDblClick}
  role="separator"
  aria-orientation={direction === 'horizontal' ? 'vertical' : 'horizontal'}
></div>

<style>
  .resize-handle {
    flex-shrink: 0;
    z-index: 10;
    transition: background 0.1s;
  }

  .resize-handle.horizontal {
    width: 4px;
    cursor: col-resize;
  }

  .resize-handle.vertical {
    height: 4px;
    cursor: row-resize;
  }

  .resize-handle:hover,
  .resize-handle.dragging {
    background: var(--accent);
  }
</style>
