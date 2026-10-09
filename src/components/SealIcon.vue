<script setup lang="ts">
interface Props {
  size?: number;
  glow?: boolean;
  character?: string;
  isFullSeal?: boolean;
}

withDefaults(defineProps<Props>(), {
  size: 38,
  glow: true,
  character: "瀾",
  isFullSeal: false,
});
</script>

<template>
  <div
    class="relative inline-flex items-center justify-center select-none transition-transform duration-300 hover:scale-105 shrink-0"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <!-- Seal Red Base -->
    <svg
      viewBox="0 0 100 100"
      class="w-full h-full drop-shadow-md overflow-hidden"
      :class="glow ? 'filter drop-shadow-[0_0_12px_rgba(185,28,28,0.45)]' : ''"
    >
      <defs>
        <!-- Seal subtle stone surface gradient -->
        <linearGradient id="sealStoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#b91c1c" />
          <stop offset="60%" stop-color="#991b1b" />
          <stop offset="100%" stop-color="#7f1d1d" />
        </linearGradient>
      </defs>

      <!-- Imperfect stone carving outer border -->
      <rect
        x="7"
        y="7"
        width="86"
        height="86"
        rx="13"
        ry="13"
        fill="url(#sealStoneGrad)"
        stroke="#ef4444"
        stroke-width="2.5"
        stroke-opacity="0.65"
      />
      <!-- Inner subtle carved border line -->
      <rect
        x="13"
        y="13"
        width="74"
        height="74"
        rx="8"
        ry="8"
        fill="none"
        stroke="#fca5a5"
        stroke-width="1.6"
        stroke-opacity="0.75"
      />

      <!-- Full Seal Mode (Footer: 二字并列 左「觀」右「瀾」) -->
      <g v-if="isFullSeal" fill="#fef2f2">
        <!-- Central subtle dividing line (界栏) -->
        <line
          x1="50"
          y1="16"
          x2="50"
          y2="84"
          stroke="#fca5a5"
          stroke-width="1"
          stroke-opacity="0.35"
          stroke-dasharray="3,2"
        />
        <!-- 左列: 觀 -->
        <text
          x="33"
          y="52"
          text-anchor="middle"
          dominant-baseline="central"
          style="font-size: 32px; font-weight: 600; font-family: 'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', serif;"
        >觀</text>
        <!-- 右列: 瀾 -->
        <text
          x="67"
          y="52"
          text-anchor="middle"
          dominant-baseline="central"
          style="font-size: 32px; font-weight: 600; font-family: 'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', serif;"
        >瀾</text>
      </g>

      <!-- Single Character Mode (Navbar: 单字「瀾」) -->
      <g v-else fill="#fef2f2">
        <text
          x="50"
          y="52"
          text-anchor="middle"
          dominant-baseline="central"
          style="font-size: 42px; font-weight: 600; font-family: 'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', serif;"
        >{{ character }}</text>
      </g>

      <!-- Organic Stone Carving Imperfection Specs -->
      <circle cx="16" cy="18" r="1.4" fill="#fca5a5" opacity="0.55" />
      <circle cx="83" cy="81" r="1.1" fill="#fca5a5" opacity="0.45" />
      <circle cx="78" cy="22" r="1" fill="#7f1d1d" opacity="0.6" />
    </svg>
  </div>
</template>
