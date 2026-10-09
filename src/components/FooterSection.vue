<script setup lang="ts">
import SealIcon from "./SealIcon.vue";
import { PORTAL_DATA } from "@/data/portal";
</script>

<template>
  <footer id="footer" class="relative z-10 pt-24 pb-16 px-6 max-w-7xl mx-auto border-t border-ink-800/80">
    <div class="flex flex-col items-center text-center space-y-12">
      <!-- Section Header -->
      <div>
        <div class="flex items-center justify-center space-x-2 text-wave-cyan text-xs font-mono tracking-widest uppercase mb-2">
          <span>03</span>
          <span>/</span>
          <span>四海相连</span>
        </div>
        <h2 class="font-oriental text-2xl sm:text-3xl font-bold tracking-wider text-frost-primary">
          结庐在人境 · 通达连四海
        </h2>
      </div>

      <!-- Social / Contact Links -->
      <div class="flex flex-wrap items-center justify-center gap-4">
        <a
          v-for="item in PORTAL_DATA.socials"
          :key="item.name"
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-ink-900/60 border border-ink-700/60 hover:border-wave-cyan/60 hover:bg-ink-850/80 text-frost-muted hover:text-wave-cyan transition-all duration-300 text-xs font-mono tracking-wider no-underline"
        >
          <span>{{ item.label }}</span>
          <svg class="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      <!-- Monumental Brand Seal -->
      <div class="pt-8 flex flex-col items-center space-y-4">
        <SealIcon :size="64" :glow="true" :is-full-seal="true" />
        <div class="font-oriental text-xs text-frost-dim tracking-[0.3em] uppercase">
          觀瀾文印 · 数字永固
        </div>
      </div>

      <!-- Final Copyright & Zen Statement -->
      <div class="pt-6 border-t border-ink-900/90 w-full max-w-2xl flex flex-col items-center space-y-2 text-[11px] font-mono text-frost-dim/70">
        <div>
          © {{ PORTAL_DATA.meta.year }} {{ PORTAL_DATA.meta.brand }} ({{ PORTAL_DATA.meta.brandEn }}). ALL RIGHTS RESERVED.
        </div>
        <div>
          ROOT PORTAL: <a :href="`https://${PORTAL_DATA.meta.rootDomain}`" class="text-wave-cyan/70 hover:text-wave-cyan no-underline">{{ PORTAL_DATA.meta.rootDomain }}</a>
          ·
          BLOG: <a :href="PORTAL_DATA.meta.blogUrl" class="text-wave-cyan/70 hover:text-wave-cyan no-underline">blog.guanlan365.top</a>
        </div>
      </div>
    </div>
  </footer>
</template>
