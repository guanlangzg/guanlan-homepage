<script setup lang="ts">
import FluidBackground from "@/components/FluidBackground.vue";
import Navbar from "@/components/Navbar.vue";
import HeroSection from "@/components/HeroSection.vue";
import WorksSection from "@/components/WorksSection.vue";
import BlogSection from "@/components/BlogSection.vue";
import FooterSection from "@/components/FooterSection.vue";
</script>

<template>
  <div class="relative min-h-screen bg-ink-950 text-frost-primary font-tech selection:bg-wave-deep selection:text-wave-cyan">
    <!-- GPU Fluid Wave Background (WebGL) -->
    <FluidBackground />

    <!-- Top Navigation -->
    <Navbar />

    <!-- Vertical Narrative Flow -->
    <main class="relative z-10 flex flex-col">
      <!-- Upper Scroll: Spirit & Totem -->
      <HeroSection />

      <!-- Lower Scroll: Creations & Works -->
      <WorksSection />

      <!-- Lower Scroll: Deep Blog Nexus -->
      <BlogSection />

      <!-- Lower Scroll: Connections & Seal -->
      <FooterSection />
    </main>
  </div>
</template>
