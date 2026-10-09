export interface FlagshipWork {
  id: string;
  title: string;
  subtitle: string;
  category: "架构工程" | "算法与智能" | "极客工具" | "数字艺术";
  description: string;
  highlights: string[];
  techStack: string[];
  link?: string;
  github?: string;
  status: "稳定运行" | "持续迭代" | "探索中";
}

export interface SocialLink {
  name: string;
  label: string;
  icon: string;
  url: string;
}

export const PORTAL_DATA = {
  meta: {
    brand: "觀瀾",
    brandEn: "GUANLAN",
    rootDomain: "guanlan365.top",
    blogUrl: "https://blog.guanlan365.top/",
    year: "2026",
    motto: "观水有术，必观其澜；日月有明，容光必照焉。",
    mottoSource: "《孟子·尽心上》",
    role: "独立造物者 · 软件工匠 · 极客禅修",
    epitaph: "以代码为笔，以逻辑为墨。于平潭微澜与时代狂澜之间，构筑自洽沉静的数字世界。",
  },
  flagshipWorks: [
    {
      id: "battle-ai-core",
      title: "智能竞技裁决与推演核心",
      subtitle: "Deterministic Decision Engine",
      category: "算法与智能",
      description: "融合有限状态机与大语言模型混合推演的决策辅助系统，实现毫秒级战局博弈评估与全链路对战复盘。",
      highlights: ["确定性规则引擎", "LLM 语义战局实时复盘", "无锁高并发时序推演"],
      techStack: ["TypeScript", "Python", "OpenAI API", "WebAssembly"],
      status: "持续迭代",
    },
    {
      id: "multi-cloud-disaster-recovery",
      title: "观澜高可用多级容灾架构",
      subtitle: "Multi-Source Mirroring Pipeline",
      category: "架构工程",
      description: "服务于观澜知识宇宙的多端容灾体系，构建静态同步、边缘托管与自动化冷热备份闭环。",
      highlights: ["边缘边缘加速", "多源自动化镜像", "断网降级与零丢失保障"],
      techStack: ["Cloudflare Pages", "GitHub Actions", "Docker", "S3 Storage"],
      status: "稳定运行",
    },
    {
      id: "neo-eastern-fluid-canvas",
      title: "东方意境水墨流体渲染引擎",
      subtitle: "GPU Navier-Stokes Ink Shader",
      category: "数字艺术",
      description: "基于 WebGL 偏微分不可压缩流体数值模拟的冷墨视觉引擎，实现光标交互涟漪与墨韵干湿浓淡算法。",
      highlights: ["GPU 60fps 满帧运算", "自研冷潭高光谱色着色器", "零庞大外部引擎依赖"],
      techStack: ["WebGL 2.0", "GLSL", "Vite", "Vue 3"],
      status: "稳定运行",
    },
    {
      id: "artisan-developer-kit",
      title: "极客工匠高能效工具集",
      subtitle: "Craftsman Productivity Arsenal",
      category: "极客工具",
      description: "专为极致开发心流打造的本地优先轻量脚手架、Prompt 工程助手与代码审计工具矩阵。",
      highlights: ["毫秒级响应", "本地离线优先", "极简 CLI 终端交互"],
      techStack: ["Go", "Node.js", "Shell", "TypeScript"],
      status: "持续迭代",
    },
  ] as FlagshipWork[],

  blogPortal: {
    title: "觀瀾文思 · 独立长文宇宙",
    subtitle: "blog.guanlan365.top",
    tagline: "立文字以明道，蓄深潭而行舟",
    description: "观澜的知识沉淀池与深度思想试验场。拒绝碎片化快餐噪音，专注系统架构、底层原理拆解、深度技术复盘与生命哲学思辨。",
    url: "https://blog.guanlan365.top/",
    metrics: [
      { label: "体系化专题", value: "架构 · 算法 · 思考" },
      { label: "阅读体验", value: "纯粹专注无杂质" },
      { label: "数据主权", value: "独立开源自主掌握" },
    ],
  },

  socials: [
    {
      name: "Blog",
      label: "观澜博客",
      icon: "blog",
      url: "https://blog.guanlan365.top/",
    },
    {
      name: "GitHub",
      label: "GitHub",
      icon: "github",
      url: "https://github.com",
    },
    {
      name: "Email",
      label: "联系我",
      icon: "mail",
      url: "mailto:contact@guanlan365.top",
    },
  ] as SocialLink[],
};
