<script setup lang="ts">
import { PORTAL_DATA } from "@/data/portal";

function scrollDown() {
  const works = document.getElementById("works");
  if (works) {
    works.scrollIntoView({ behavior: "smooth" });
  }
}
</script>

<template>
  <section
    id="hero"
    class="relative min-h-screen flex flex-col items-center justify-between pt-28 pb-12 px-6 overflow-hidden select-none"
  >
    <!-- Background atmospheric glow -->
    <div class="absolute inset-0 pointer-events-none flex items-center justify-center">
      <div class="w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-wave-deep/20 filter blur-[120px] opacity-60" />
    </div>

    <!-- Top Badge / Zen Identity -->
    <div class="relative z-10 flex flex-col items-center text-center space-y-2 mt-4">
      <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-ink-700/60 bg-ink-900/40 backdrop-blur-md">
        <span class="w-1.5 h-1.5 rounded-full bg-wave-cyan/80" />
        <span class="text-[11px] md:text-xs font-mono text-frost-muted tracking-widest uppercase">
          {{ PORTAL_DATA.meta.role }}
        </span>
      </div>
    </div>

    <!-- Center Scroll Totem: Large Calligraphic Brand & Philosophy -->
    <div class="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto my-auto py-8">
      <!-- Calligraphic Title "觀瀾" -->
      <div class="relative group cursor-default mb-6">
        <h1
          class="font-oriental text-7xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-black tracking-[0.22em] pl-[0.22em] text-frost-primary leading-none drop-shadow-[0_16px_48px_rgba(0,0,0,0.95)] transition-all duration-700 select-none"
        >
          {{ PORTAL_DATA.meta.brand }}
        </h1>
        <div class="text-xs md:text-sm font-mono tracking-[0.45em] text-wave-cyan/70 uppercase mt-5 flex items-center justify-center space-x-2">
          <span>{{ PORTAL_DATA.meta.brandEn }}</span>
          <span class="text-frost-dim/50">·</span>
          <span>{{ PORTAL_DATA.meta.rootDomain }}</span>
        </div>
      </div>

      <!-- Philosophical Motto: 孟子·尽心上 -->
      <div class="relative max-w-2xl mx-auto mt-6 px-4">
        <!-- Delicate oriental decorative quotes -->
        <div class="text-frost-dim/30 font-oriental text-4xl leading-none select-none -mb-3">
          “
        </div>
        <p class="font-oriental text-lg sm:text-xl md:text-2xl text-frost-primary/90 font-medium tracking-widest leading-relaxed">
          {{ PORTAL_DATA.meta.motto }}
        </p>
        <div class="mt-2 text-xs md:text-sm font-oriental text-frost-dim tracking-wider">
          —— {{ PORTAL_DATA.meta.mottoSource }}
        </div>
      </div>

      <!-- Poetic Epitaph -->
      <p class="max-w-xl mx-auto mt-6 text-xs sm:text-sm md:text-base text-frost-muted font-light leading-relaxed tracking-wide px-4">
        {{ PORTAL_DATA.meta.epitaph }}
      </p>
    </div>

    <!-- Bottom Scroll Indicator: Downward Wave Flow -->
    <div class="relative z-10 flex flex-col items-center text-center cursor-pointer group" @click="scrollDown">
      <span class="text-[11px] font-mono tracking-widest text-frost-dim uppercase group-hover:text-wave-cyan transition-colors">
        向下卷阅 · 探寻造物
      </span>
      <div class="w-5 h-9 rounded-full border border-ink-600/70 p-1 mt-3 flex justify-center group-hover:border-wave-cyan/60 transition-colors">
        <div class="w-1 h-2 rounded-full bg-wave-cyan animate-bounce" />
      </div>
    </div>
  </section>
</template>
