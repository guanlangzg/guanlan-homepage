<script setup lang="ts">
import { PORTAL_DATA } from "@/data/portal";
</script>

<template>
  <section id="blog" class="relative z-10 py-24 px-6 max-w-7xl mx-auto">
    <!-- Section Header -->
    <div class="mb-12">
      <div class="flex items-center space-x-2 text-wave-cyan text-xs font-mono tracking-widest uppercase mb-2">
        <span>02</span>
        <span>/</span>
        <span>文思深潭</span>
      </div>
      <h2 class="font-oriental text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider text-frost-primary">
        观澜博客 · 沉浸宇宙
      </h2>
    </div>

    <!-- Monumental Feature Card directing to Blog -->
    <div class="relative overflow-hidden rounded-3xl p-8 sm:p-12 md:p-16 bg-gradient-to-br from-ink-900/80 via-ink-850/60 to-ink-950/90 backdrop-blur-2xl border border-wave-cyan/20 shadow-ink-card group">
      <!-- Background Ambient Wave Graphic -->
      <div class="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-wave-deep/20 filter blur-[100px] pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <!-- Left Column: Philosophy & Invitation -->
        <div class="lg:col-span-8 space-y-6">
          <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-wave-cyan/30 bg-wave-deep/20 text-wave-cyan text-xs font-mono">
            <span class="w-1.5 h-1.5 rounded-full bg-wave-cyan animate-ping" />
            <span>{{ PORTAL_DATA.blogPortal.subtitle }}</span>
          </div>

          <h3 class="font-oriental text-2xl sm:text-3xl md:text-4xl font-bold text-frost-primary leading-tight">
            “{{ PORTAL_DATA.blogPortal.tagline }}”
          </h3>

          <p class="text-sm sm:text-base text-frost-muted max-w-2xl font-light leading-relaxed">
            {{ PORTAL_DATA.blogPortal.description }}
          </p>

          <!-- Metrics / Values -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-ink-700/40">
            <div
              v-for="(metric, i) in PORTAL_DATA.blogPortal.metrics"
              :key="i"
              class="flex flex-col space-y-1"
            >
              <span class="text-xs font-mono text-frost-dim uppercase tracking-wider">
                {{ metric.label }}
              </span>
              <span class="text-sm font-oriental font-medium text-frost-primary">
                {{ metric.value }}
              </span>
            </div>
          </div>
        </div>

        <!-- Right Column: Massive High-End Action Portal -->
        <div class="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
          <a
            :href="PORTAL_DATA.blogPortal.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group/btn relative inline-flex flex-col items-center justify-center p-8 rounded-2xl bg-ink-950/70 border border-wave-cyan/40 hover:border-wave-cyan hover:bg-wave-deep/30 transition-all duration-500 shadow-wave-glow text-center no-underline text-inherit w-full sm:w-auto min-w-[220px]"
          >
            <!-- Water Flow Pulse Icon -->
            <div class="w-14 h-14 rounded-full bg-wave-deep/40 border border-wave-cyan/50 flex items-center justify-center mb-4 group-hover/btn:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-wave-cyan transform group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>

            <span class="font-oriental text-lg font-bold text-frost-primary group-hover/btn:text-wave-cyan transition-colors">
              进入观澜博客
            </span>
            <span class="text-[11px] font-mono text-frost-dim mt-1 tracking-wider">
              blog.guanlan365.top ↗
            </span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
