<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { FluidEngine } from "@/gl/fluid-engine";

const canvasRef = ref<HTMLCanvasElement | null>(null);
let engine: FluidEngine | null = null;

let lastX = 0;
let lastY = 0;
let isPointerDown = false;

function onPointerDown(e: PointerEvent) {
  isPointerDown = true;
  lastX = e.clientX;
  lastY = e.clientY;

  if (engine) {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    // Splash like a cold droplet entering still water
    engine.splat(x, y, (Math.random() - 0.5) * 500, (Math.random() - 0.5) * 500, [0.15, 0.38, 0.58]);
  }
}

function onPointerMove(e: PointerEvent) {
  const currentX = e.clientX;
  const currentY = e.clientY;

  if (engine) {
    const dx = (currentX - lastX) * 20.0;
    const dy = (currentY - lastY) * 20.0;
    const x = currentX / window.innerWidth;
    const y = currentY / window.innerHeight;

    if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
      engine.splat(x, y, dx, dy, [0.08, 0.22, 0.36]);
    }
  }

  lastX = currentX;
  lastY = currentY;
}

function onPointerUp() {
  isPointerDown = false;
}

function onScroll() {
  if (!engine) return;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const maxScroll = (document.documentElement.scrollHeight - window.innerHeight) || 1;
  const progress = Math.min(1, Math.max(0, scrollTop / maxScroll));

  engine.setScrollProgress(progress);
  engine.triggerScrollWave(15);
}

function onResize() {
  if (engine) {
    engine.resize();
  }
}

function onVisibilityChange() {
  if (!engine) return;
  if (document.hidden) {
    engine.pause();
  } else {
    engine.start();
  }
}

onMounted(() => {
  if (!canvasRef.value) return;

  try {
    engine = new FluidEngine(canvasRef.value);
    engine.resize();
    engine.start();

    // Initial serene multi-stage ink infusion (Deep Zen Awakening)
    setTimeout(() => {
      if (engine) engine.splat(0.5, 0.38, 0, 180, [0.18, 0.42, 0.65]);
    }, 200);
    setTimeout(() => {
      if (engine) engine.splat(0.32, 0.6, 60, -40, [0.12, 0.30, 0.48]);
    }, 550);
    setTimeout(() => {
      if (engine) engine.splat(0.68, 0.45, -60, 50, [0.14, 0.35, 0.52]);
    }, 900);

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
  } catch (err) {
    console.warn("FluidEngine failed to initialize:", err);
  }
});

onUnmounted(() => {
  window.removeEventListener("pointerdown", onPointerDown);
  window.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("pointerup", onPointerUp);
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onResize);
  document.removeEventListener("visibilitychange", onVisibilityChange);

  if (engine) {
    engine.destroy();
    engine = null;
  }
});

defineExpose({
  triggerRipple: (x: number, y: number) => {
    if (engine) {
      engine.splat(x, y, 0, 200, [0.2, 0.45, 0.65]);
    }
  },
});
</script>

<template>
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-ink-950">
    <canvas
      ref="canvasRef"
      class="w-full h-full block touch-none"
    />
    <!-- Subtle film grain & water depth texture overlay -->
    <div
      class="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"
    />
    <!-- Vignette edge falloff -->
    <div
      class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(6,8,12,0.85)_100%)]"
    />
  </div>
</template>
