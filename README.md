# 观澜 | 个人主页 (Guanlan Homepage)

> 「观水有术，必观其澜；日月有明，容光必照焉。」 ——《孟子·尽心上》

本项目是观澜（`guanlan365.top`）的个人主页与数字门户，定位于精神图腾、旗舰代表作陈列与全网连接中心。

---

## 🎨 视觉与设计理念

- **东方意境与流体水墨流 (Neo-Eastern Zen & Fluid Wave)**：融合东方留白与现代流体交互。
- **冷潭墨渊深黑基调**：以 `#06080c` ~ `#090d15` 为底，拒绝死黑，营造静谧深邃的水墨空间感。
- **天青与黛蓝微澜**：交互触发泛光波纹与水墨扩散。
- **朱砂金石印章**：定制 SVG 篆刻文印（「觀」、「瀾」），兼顾现代排版与古雅气韵。

---

## ⚡ 核心架构与技术栈

- **框架与语言**：Vue 3 (Composition API) + TypeScript (Strict Mode)
- **构建工具**：Vite 6 + UnoCSS
- **自研 WebGL 水墨物理引擎**：
  - 基于 Navier-Stokes 离散方程（Advection, Divergence, Pressure Poisson, Curl Vorticity）
  - 支持多源正弦呼吸流（Ambient Flow）、开屏墨滴晕开、光标水墨扰动与滚动涌动
  - 高性能轻量化，无庞大 3D 引擎负担，满帧 60fps 运行
- **工具链**：pnpm, VueUse

---

## 📂 项目结构

```text
├── src/
│   ├── components/         # 页面组件 (Hero, Works, Blog, Footer, Navbar, Seal)
│   ├── data/               # 门户配置与旗舰代表作数据
│   ├── gl/                 # WebGL 物理流体水墨着色器与渲染引擎
│   ├── App.vue             # 根组件
│   └── main.ts             # 应用入口
├── uno.config.ts           # UnoCSS 样式与主题配置
├── vite.config.ts          # Vite 构建配置
├── tsconfig.json           # TypeScript 严谨类型配置
└── memory.md               # 项目演进记忆与关键工程约束
```

---

## 🚀 本地开发与构建

### 1. 安装依赖

```bash
pnpm install
```

### 2. 本地调试

```bash
pnpm run dev
```

### 3. 生产打包

```bash
pnpm run build
```

### 4. 预览构建产物

```bash
pnpm run preview
```

---

## 🌐 站点生态

- **个人主页（本项目）**：[guanlan365.top](https://guanlan365.top)
- **观澜志博客（知识沉淀）**：[blog.guanlan365.top](https://blog.guanlan365.top/)
