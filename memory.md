# 个人主页项目记忆与需求约束

## 1. 站点关系定位与业务边界
- **个人主页（本项目）**：`guanlan365.top`（根域名）—— 用户个人门户、精神图腾、旗舰代表作陈列与全网连接中心。
  - GitHub 仓库：[`https://github.com/guanlangzg/guanlan-homepage`](https://github.com/guanlangzg/guanlan-homepage)
  - 默认分支：`main`
- **观澜博客（已有项目）**：`https://blog.guanlan365.top/` —— 独立的知识沉淀与长文出版系统。
- **强约束**：个人主页坚决不复刻博客列表，不设通俗文章流，聚焦高信噪比、东方美学与旗舰造物。

## 2. 视觉语言与设计系统落地经验
- **文化与精神内核**：观澜 guanlan（《孟子·尽心上》“观水有术，必观其澜；日月有明，容光必照焉”）。
- **设计流派**：东方意境与流体水墨流（Neo-Eastern Zen & Fluid Wave）。
- **色调体系**：
  - 底色：冷潭墨渊深黑（`#06080c` ~ `#090d15`），拒绝死黑 `#000`。
  - 水泽微澜：黛蓝冷光（`#162f48`）、天青微澜（`#38bdf8`），高光波纹法线高光。
  - 点睛印记：中式篆刻朱砂红（`#991b1b` / `#ef4444`），落款「觀瀾印」。
- **形态**：纵向双层递进流动长卷（上卷立轴图腾，下卷造物/博客/四海联络）。

## 3. 技术栈与工程实践
- **核心架构**：Vue 3 (Composition API) + TypeScript (strict mode) + Vite 6 + UnoCSS。
- **自研 WebGL 物理水墨着色器**：
  - 基于 Navier-Stokes 离散方程（Advection, Divergence, Pressure Poisson, Gradient Subtract, Curl Vorticity）。
  - 支持多源正弦自然水墨呼吸流（Ambient Flow），开屏三段式墨滴晕开，光标滑动水墨涟漪扰动，纵向滚动下沉涌动。
  - 核心构建产物 gzip 仅约 37KB，60fps 满帧，无庞大 3D 引擎负担。
- **SVG 与 UnoCSS 属性陷阱与印章排版经验**：
  - **UnoCSS 劫持陷阱**：`presetAttributify()` 默认会将 SVG 的 `font-size="45"` 识别为 UnoCSS 类规则 `[font-size~="45"] { font-size: 11.25rem; }`（180px），导致印章文字失控撑破 SVG 甚至刺破圆角外溢；必须在 `presetAttributify` 中配置 `ignoreAttributes: ['font-size', 'letter-spacing', 'stroke-width', ...]`，并在 SVG `<text>` 采用内联 `style`。
  - **印章排版与美学**：顶部导航栏小印章（34px）采用单字「瀾」，四周保持 12px+ 安全留白；页脚文印大印章（64px）采用二字并列（左「觀」右「瀾」）搭配金石细界格，消除上下文字碰撞重叠问题，契合现代阅读直觉与东方篆刻气韵。
- **可复用命令**：
  - 本地构建：`pnpm run build`
  - 端到端验证：`python "C:\Users\24228\.claude\skills\webapp-testing\scripts\with_server.py" --server "pnpm exec vite preview --port 3000" --port 3000 -- python scripts/test/verify_portal.py`
