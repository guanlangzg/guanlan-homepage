export interface FluidConfig {
  simResolution: number;      // 模拟网格分辨率 (如 128 或 256)
  dyeResolution: number;      // 染料细节分辨率 (如 256 或 512)
  densityDissipation: number; // 墨迹消散衰减系数 (0.96 - 0.99)
  velocityDissipation: number;// 速度衰减系数 (0.97 - 0.995)
  pressureIterations: number; // 压强迭代次数 (15 - 20)
  splatRadius: number;        // 鼠标触控墨溅半径
  splatForce: number;         // 力量大小
  ambientMotion: boolean;     // 是否保持极微弱的东方自然微澜涌动
}

export interface FBO {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  attach(id: number): number;
}

export interface DoubleFBO {
  width: number;
  height: number;
  read: FBO;
  write: FBO;
  swap(): void;
}

export interface PointerInput {
  x: number;
  y: number;
  dx: number;
  dy: number;
  down: boolean;
  moved: boolean;
}
