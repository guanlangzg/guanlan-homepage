<script setup lang="ts">
import { PORTAL_DATA } from "@/data/portal";
</script>

<template>
  <section id="works" class="relative z-10 py-28 px-6 max-w-7xl mx-auto">
    <!-- Section Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-ink-800/80 pb-8">
      <div>
        <div class="flex items-center space-x-2 text-wave-cyan text-xs font-mono tracking-widest uppercase mb-2">
          <span>01</span>
          <span>/</span>
          <span>造物微澜</span>
        </div>
        <h2 class="font-oriental text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider text-frost-primary">
          旗舰作品 · 匠心陈列
        </h2>
      </div>
      <p class="text-xs sm:text-sm text-frost-muted max-w-md font-light mt-4 md:mt-0 leading-relaxed">
        每一项造物皆非模板拼凑，而是在极客工匠精神与现实复杂性博弈中沉淀的独立工程实践。
      </p>
    </div>

    <!-- Works Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        v-for="work in PORTAL_DATA.flagshipWorks"
        :key="work.id"
        class="group relative rounded-2xl p-7 md:p-8 bg-ink-900/50 backdrop-blur-xl border border-ink-700/50 hover:border-wave-cyan/50 hover:bg-ink-850/70 transition-all duration-500 shadow-ink-card flex flex-col justify-between"
      >
        <!-- Subtle Ink Edge Glow -->
        <div class="absolute -inset-px rounded-2xl bg-gradient-to-b from-wave-cyan/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div class="relative z-10">
          <!-- Header Meta: Category & Status -->
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-mono px-2.5 py-1 rounded border border-ink-700/70 bg-ink-950/80 text-wave-cyan">
              {{ work.category }}
            </span>
            <div class="flex items-center space-x-1.5 text-xs font-mono text-frost-dim">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{{ work.status }}</span>
            </div>
          </div>

          <!-- Titles -->
          <h3 class="font-oriental text-xl sm:text-2xl font-bold text-frost-primary group-hover:text-wave-cyan transition-colors duration-300 mb-1">
            {{ work.title }}
          </h3>
          <div class="text-xs font-mono text-frost-dim uppercase tracking-wider mb-4">
            {{ work.subtitle }}
          </div>

          <!-- Description -->
          <p class="text-sm text-frost-muted leading-relaxed mb-6 font-light">
            {{ work.description }}
          </p>

          <!-- Highlights -->
          <ul class="space-y-2 mb-6">
            <li
              v-for="(hl, idx) in work.highlights"
              :key="idx"
              class="flex items-center space-x-2 text-xs text-frost-primary/80 font-light"
            >
              <span class="w-1 h-1 rounded-full bg-wave-cyan/70" />
              <span>{{ hl }}</span>
            </li>
          </ul>
        </div>

        <!-- Tech Stack Tags -->
        <div class="relative z-10 pt-4 border-t border-ink-800/80 flex flex-wrap gap-2">
          <span
            v-for="tech in work.techStack"
            :key="tech"
            class="text-[11px] font-mono px-2 py-0.5 rounded bg-ink-950 text-frost-muted border border-ink-700/50"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
