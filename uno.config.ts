import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify({
      ignoreAttributes: [
        "font-size",
        "letter-spacing",
        "stroke-width",
        "stroke-opacity",
        "fill-opacity",
        "viewBox",
        "rx",
        "ry",
        "cx",
        "cy",
        "r",
        "d",
      ],
    }),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    colors: {
      ink: {
        950: "#06080c", // 冷潭极黑底
        900: "#090d15", // 深墨底层
        850: "#0e1420", // 墨韵中层
        800: "#131a29", // 磨砂卡片背景
        700: "#1c263c", // 悬停与边框
        600: "#2a3753", // 微弱高亮线条
      },
      frost: {
        primary: "#e2e8f0", // 冷白文字
        muted: "#94a3b8",   // 幽霜次级文字
        dim: "#64748b",     // 浅黛色辅助信息
      },
      wave: {
        cyan: "#38bdf8",    // 幽蓝冷波辉光
        azure: "#0284c7",   // 黛蓝水泽
        deep: "#0c4a6e",    // 潭底深蓝
      },
      cinnabar: {
        dark: "#7f1d1d",    // 暗朱砂
        seal: "#b91c1c",    // 观澜印章标准朱红
        bright: "#dc2626",  // 激活印光
      },
    },
    fontFamily: {
      oriental: "'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', 'STSong', 'SimSun', serif",
      tech: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace",
    },
    boxShadow: {
      "ink-card": "0 8px 32px 0 rgba(0, 0, 0, 0.45)",
      "seal-glow": "0 0 20px -3px rgba(185, 28, 28, 0.35)",
      "wave-glow": "0 0 25px -4px rgba(56, 189, 248, 0.18)",
    },
  },
  shortcuts: {
    "glass-ink": "bg-ink-850/60 backdrop-blur-md border border-ink-700/50",
    "glass-ink-hover": "hover:bg-ink-800/80 hover:border-wave-cyan/30 transition-all duration-300",
  },
});
