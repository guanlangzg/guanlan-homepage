<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import SealIcon from "./SealIcon.vue";
import { PORTAL_DATA } from "@/data/portal";

const isScrolled = ref(false);
const mobileMenuOpen = ref(false);

function checkScroll() {
  isScrolled.value = window.scrollY > 40;
}

function scrollToSection(id: string) {
  mobileMenuOpen.value = false;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

onMounted(() => {
  window.addEventListener("scroll", checkScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkScroll);
});
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="[
      isScrolled
        ? 'bg-ink-950/95 backdrop-blur-2xl border-b border-ink-700/60 py-3 shadow-2xl'
        : 'bg-transparent py-5',
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
      <!-- Left: Seal & Brand -->
      <a
        href="#"
        class="group flex items-center space-x-3.5 no-underline text-inherit"
        @click.prevent="scrollToSection('hero')"
      >
        <SealIcon :size="34" :glow="true" />
        <div class="flex flex-col">
          <div class="flex items-baseline space-x-2">
            <span class="font-oriental text-lg md:text-xl font-bold tracking-widest text-frost-primary group-hover:text-wave-cyan transition-colors">
              {{ PORTAL_DATA.meta.brand }}
            </span>
            <span class="text-xs font-mono text-frost-dim tracking-wider uppercase">
              {{ PORTAL_DATA.meta.brandEn }}
            </span>
          </div>
          <span class="text-[10px] font-mono text-wave-cyan/70 tracking-widest -mt-0.5">
            {{ PORTAL_DATA.meta.rootDomain }}
          </span>
        </div>
      </a>

      <!-- Middle: Section Anchors (Desktop) -->
      <nav class="hidden md:flex items-center space-x-8 text-sm">
        <button
          class="text-frost-muted hover:text-wave-cyan transition-colors bg-transparent border-0 cursor-pointer p-0 font-oriental tracking-wider"
          @click="scrollToSection('hero')"
        >
          图腾
        </button>
        <button
          class="text-frost-muted hover:text-wave-cyan transition-colors bg-transparent border-0 cursor-pointer p-0 font-oriental tracking-wider"
          @click="scrollToSection('works')"
        >
          造物
        </button>
        <button
          class="text-frost-muted hover:text-wave-cyan transition-colors bg-transparent border-0 cursor-pointer p-0 font-oriental tracking-wider"
          @click="scrollToSection('blog')"
        >
          文思
        </button>
        <button
          class="text-frost-muted hover:text-wave-cyan transition-colors bg-transparent border-0 cursor-pointer p-0 font-oriental tracking-wider"
          @click="scrollToSection('footer')"
        >
          四海
        </button>
      </nav>

      <!-- Right: Direct Link to Blog & Mobile toggle -->
      <div class="flex items-center space-x-4">
        <!-- Direct Portal Button to Blog -->
        <a
          :href="PORTAL_DATA.meta.blogUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="relative inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide text-wave-cyan bg-wave-deep/30 border border-wave-cyan/40 hover:bg-wave-cyan/20 hover:border-wave-cyan transition-all duration-300 no-underline shadow-wave-glow"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-wave-cyan animate-pulse" />
          <span>观澜博客</span>
          <svg class="w-3.5 h-3.5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>

        <!-- Mobile Menu Toggle -->
        <button
          class="md:hidden p-2 text-frost-muted hover:text-frost-primary bg-transparent border-0 cursor-pointer"
          @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="!mobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown -->
    <div
      v-if="mobileMenuOpen"
      class="md:hidden border-b border-ink-700/60 bg-ink-950/95 backdrop-blur-2xl px-6 py-4 flex flex-col space-y-3"
    >
      <button
        class="text-left text-frost-muted hover:text-wave-cyan py-2 text-base font-oriental"
        @click="scrollToSection('hero')"
      >
        图腾 · 精神本源
      </button>
      <button
        class="text-left text-frost-muted hover:text-wave-cyan py-2 text-base font-oriental"
        @click="scrollToSection('works')"
      >
        造物 · 旗舰代表作
      </button>
      <button
        class="text-left text-frost-muted hover:text-wave-cyan py-2 text-base font-oriental"
        @click="scrollToSection('blog')"
      >
        文思 · 观澜长文博客
      </button>
      <button
        class="text-left text-frost-muted hover:text-wave-cyan py-2 text-base font-oriental"
        @click="scrollToSection('footer')"
      >
        四海 · 联络与落款
      </button>
    </div>
  </header>
</template>
