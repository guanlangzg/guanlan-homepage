import {
  createProgram,
  createFBO,
  createDoubleFBO,
  getSupportedExtensions,
  type WebGLExtensions,
} from "./gl-utils";
import {
  baseVertexShader,
  splatShader,
  advectionShader,
  divergenceShader,
  curlShader,
  vorticityShader,
  pressureShader,
  gradientSubtractShader,
  displayShader,
} from "./shaders";
import type { FluidConfig, DoubleFBO, FBO } from "./types";

export class FluidEngine {
  private canvas: HTMLCanvasElement;
  private gl: WebGLRenderingContext;
  private ext: WebGLExtensions;

  private config: FluidConfig = {
    simResolution: 128,
    dyeResolution: 256,
    densityDissipation: 0.988,
    velocityDissipation: 0.982,
    pressureIterations: 18,
    splatRadius: 0.0035,
    splatForce: 5500,
    ambientMotion: true,
  };

  private quadBuffer!: WebGLBuffer;

  // Shader Programs
  private splatProg!: ReturnType<typeof createProgram>;
  private advectionProg!: ReturnType<typeof createProgram>;
  private divergenceProg!: ReturnType<typeof createProgram>;
  private curlProg!: ReturnType<typeof createProgram>;
  private vorticityProg!: ReturnType<typeof createProgram>;
  private pressureProg!: ReturnType<typeof createProgram>;
  private gradSubtractProg!: ReturnType<typeof createProgram>;
  private displayProg!: ReturnType<typeof createProgram>;

  // Framebuffer Objects
  private density!: DoubleFBO;
  private velocity!: DoubleFBO;
  private divergence!: FBO;
  private curl!: FBO;
  private pressure!: DoubleFBO;

  private animationFrameId: number | null = null;
  private isRunning = false;
  private lastTime = 0;
  private scrollProgress = 0;

  constructor(canvas: HTMLCanvasElement, customConfig?: Partial<FluidConfig>) {
    this.canvas = canvas;
    const gl = canvas.getContext("webgl", {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
      powerPreference: "high-performance",
    });

    if (!gl) {
      throw new Error("WebGL 1.0 is not supported on this browser/device.");
    }
    this.gl = gl;
    this.ext = getSupportedExtensions(gl);

    if (customConfig) {
      this.config = { ...this.config, ...customConfig };
    }

    this.initQuad();
    this.initPrograms();
    this.initFramebuffers();
  }

  private initQuad() {
    const gl = this.gl;
    const buffer = gl.createBuffer();
    if (!buffer) throw new Error("Failed to create WebGL quad buffer");
    this.quadBuffer = buffer;

    gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
      gl.STATIC_DRAW
    );
  }

  private initPrograms() {
    const gl = this.gl;
    this.splatProg = createProgram(gl, baseVertexShader, splatShader);
    this.advectionProg = createProgram(gl, baseVertexShader, advectionShader);
    this.divergenceProg = createProgram(gl, baseVertexShader, divergenceShader);
    this.curlProg = createProgram(gl, baseVertexShader, curlShader);
    this.vorticityProg = createProgram(gl, baseVertexShader, vorticityShader);
    this.pressureProg = createProgram(gl, baseVertexShader, pressureShader);
    this.gradSubtractProg = createProgram(gl, baseVertexShader, gradientSubtractShader);
    this.displayProg = createProgram(gl, baseVertexShader, displayShader);
  }

  private initFramebuffers() {
    const gl = this.gl;
    const ext = this.ext;
    const filter = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    const simW = this.config.simResolution;
    const simH = Math.round((simW * this.canvas.height) / (this.canvas.width || 1));
    const dyeW = this.config.dyeResolution;
    const dyeH = Math.round((dyeW * this.canvas.height) / (this.canvas.width || 1));

    this.density = createDoubleFBO(
      gl,
      dyeW,
      dyeH,
      ext.formatRGBA.internalFormat,
      ext.formatRGBA.format,
      ext.halfFloatType,
      filter
    );

    this.velocity = createDoubleFBO(
      gl,
      simW,
      simH,
      ext.formatRG.internalFormat,
      ext.formatRG.format,
      ext.halfFloatType,
      filter
    );

    this.divergence = createFBO(
      gl,
      simW,
      simH,
      ext.formatR.internalFormat,
      ext.formatR.format,
      ext.halfFloatType,
      gl.NEAREST
    );

    this.curl = createFBO(
      gl,
      simW,
      simH,
      ext.formatR.internalFormat,
      ext.formatR.format,
      ext.halfFloatType,
      gl.NEAREST
    );

    this.pressure = createDoubleFBO(
      gl,
      simW,
      simH,
      ext.formatR.internalFormat,
      ext.formatR.format,
      ext.halfFloatType,
      gl.NEAREST
    );
  }

  private blit(destinationFBO: FBO | null) {
    const gl = this.gl;
    if (destinationFBO === null) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    } else {
      gl.bindFramebuffer(gl.FRAMEBUFFER, destinationFBO.fbo);
      gl.viewport(0, 0, destinationFBO.width, destinationFBO.height);
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
  }

  public splat(
    x: number,
    y: number,
    dx: number,
    dy: number,
    color: [number, number, number] = [0.15, 0.35, 0.55]
  ) {
    const gl = this.gl;
    const aspect = this.canvas.width / (this.canvas.height || 1);

    // 1. Splat Velocity
    gl.useProgram(this.splatProg.program);
    gl.uniform1i(this.splatProg.uniforms.uTarget, this.velocity.read.attach(0));
    gl.uniform1f(this.splatProg.uniforms.uAspectRatio, aspect);
    gl.uniform2f(this.splatProg.uniforms.uPoint, x, 1.0 - y);
    gl.uniform3f(this.splatProg.uniforms.uColor, dx, -dy, 0.0);
    gl.uniform1f(this.splatProg.uniforms.uRadius, this.config.splatRadius);
    this.blit(this.velocity.write);
    this.velocity.swap();

    // 2. Splat Dye (Ink)
    gl.uniform1i(this.splatProg.uniforms.uTarget, this.density.read.attach(0));
    gl.uniform3f(this.splatProg.uniforms.uColor, color[0], color[1], color[2]);
    this.blit(this.density.write);
    this.density.swap();
  }

  public triggerScrollWave(deltaY: number) {
    // Generate gentle downward ink surge on scroll
    const x = 0.5 + (Math.sin(Date.now() * 0.002) * 0.2);
    const y = 0.2;
    const force = Math.min(Math.abs(deltaY) * 8.0, 1500.0);
    const dy = deltaY > 0 ? force : -force;
    this.splat(x, y, 0, dy, [0.08, 0.20, 0.32]);
  }

  public setScrollProgress(progress: number) {
    this.scrollProgress = Math.max(0, Math.min(1, progress));
  }

  public resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.floor(window.innerWidth * dpr);
    const height = Math.floor(window.innerHeight * dpr);

    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.initFramebuffers();
    }
  }

  private step(dt: number) {
    const gl = this.gl;

    // Ambient Zen Flow (tri-source natural breathing of deep cold ink water)
    if (this.config.ambientMotion) {
      const t = Date.now() * 0.0005;
      // Source 1: Upper left flowing downward right
      const a1x = 0.35 + Math.cos(t * 0.8) * 0.2;
      const a1y = 0.35 + Math.sin(t * 0.6) * 0.2;
      const a1dx = Math.sin(t * 1.2) * 45.0;
      const a1dy = Math.cos(t * 1.1) * 45.0;
      this.splat(a1x, a1y, a1dx, a1dy, [0.05, 0.12, 0.20]);

      // Source 2: Center pool slow counter-rotation
      const a2x = 0.65 + Math.sin(t * 0.7) * 0.2;
      const a2y = 0.65 + Math.cos(t * 0.9) * 0.2;
      const a2dx = -Math.cos(t * 1.3) * 40.0;
      const a2dy = Math.sin(t * 1.4) * 40.0;
      this.splat(a2x, a2y, a2dx, a2dy, [0.04, 0.10, 0.18]);
    }

    // 1. Curl / Vorticity
    gl.useProgram(this.curlProg.program);
    gl.uniform2f(
      this.curlProg.uniforms.uTexelSize,
      1.0 / this.velocity.read.width,
      1.0 / this.velocity.read.height
    );
    gl.uniform1i(this.curlProg.uniforms.uVelocity, this.velocity.read.attach(0));
    this.blit(this.curl);

    gl.useProgram(this.vorticityProg.program);
    gl.uniform2f(
      this.vorticityProg.uniforms.uTexelSize,
      1.0 / this.velocity.read.width,
      1.0 / this.velocity.read.height
    );
    gl.uniform1i(this.vorticityProg.uniforms.uVelocity, this.velocity.read.attach(0));
    gl.uniform1i(this.vorticityProg.uniforms.uCurl, this.curl.attach(1));
    gl.uniform1f(this.vorticityProg.uniforms.uCurlValue, 28.0);
    gl.uniform1f(this.vorticityProg.uniforms.uDt, dt);
    this.blit(this.velocity.write);
    this.velocity.swap();

    // 2. Divergence
    gl.useProgram(this.divergenceProg.program);
    gl.uniform2f(
      this.divergenceProg.uniforms.uTexelSize,
      1.0 / this.velocity.read.width,
      1.0 / this.velocity.read.height
    );
    gl.uniform1i(this.divergenceProg.uniforms.uVelocity, this.velocity.read.attach(0));
    this.blit(this.divergence);

    // 3. Pressure Solve (Jacobi)
    gl.useProgram(this.pressureProg.program);
    gl.uniform2f(
      this.pressureProg.uniforms.uTexelSize,
      1.0 / this.velocity.read.width,
      1.0 / this.velocity.read.height
    );
    gl.uniform1i(this.pressureProg.uniforms.uDivergence, this.divergence.attach(0));

    for (let i = 0; i < this.config.pressureIterations; i++) {
      gl.uniform1i(this.pressureProg.uniforms.uPressure, this.pressure.read.attach(1));
      this.blit(this.pressure.write);
      this.pressure.swap();
    }

    // 4. Gradient Subtract
    gl.useProgram(this.gradSubtractProg.program);
    gl.uniform2f(
      this.gradSubtractProg.uniforms.uTexelSize,
      1.0 / this.velocity.read.width,
      1.0 / this.velocity.read.height
    );
    gl.uniform1i(this.gradSubtractProg.uniforms.uPressure, this.pressure.read.attach(0));
    gl.uniform1i(this.gradSubtractProg.uniforms.uVelocity, this.velocity.read.attach(1));
    this.blit(this.velocity.write);
    this.velocity.swap();

    // 5. Advection Velocity
    gl.useProgram(this.advectionProg.program);
    gl.uniform2f(
      this.advectionProg.uniforms.uTexelSize,
      1.0 / this.velocity.read.width,
      1.0 / this.velocity.read.height
    );
    gl.uniform1i(this.advectionProg.uniforms.uVelocity, this.velocity.read.attach(0));
    gl.uniform1i(this.advectionProg.uniforms.uSource, this.velocity.read.attach(0));
    gl.uniform1f(this.advectionProg.uniforms.uDt, dt);
    gl.uniform1f(this.advectionProg.uniforms.uDissipation, this.config.velocityDissipation);
    this.blit(this.velocity.write);
    this.velocity.swap();

    // 6. Advection Dye (Ink)
    gl.uniform2f(
      this.advectionProg.uniforms.uTexelSize,
      1.0 / this.velocity.read.width,
      1.0 / this.velocity.read.height
    );
    gl.uniform1i(this.advectionProg.uniforms.uVelocity, this.velocity.read.attach(0));
    gl.uniform1i(this.advectionProg.uniforms.uSource, this.density.read.attach(1));
    gl.uniform1f(this.advectionProg.uniforms.uDissipation, this.config.densityDissipation);
    this.blit(this.density.write);
    this.density.swap();

    // 7. Display Render to Canvas
    gl.useProgram(this.displayProg.program);
    gl.uniform2f(
      this.displayProg.uniforms.uTexelSize,
      1.0 / this.density.read.width,
      1.0 / this.density.read.height
    );
    gl.uniform1i(this.displayProg.uniforms.uDye, this.density.read.attach(0));
    gl.uniform1f(this.displayProg.uniforms.uScrollFade, this.scrollProgress);
    this.blit(null);
  }

  private loop = (currentTime: number) => {
    if (!this.isRunning) return;

    if (this.lastTime === 0) {
      this.lastTime = currentTime;
    }
    const dt = Math.min((currentTime - this.lastTime) * 0.001, 0.032);
    this.lastTime = currentTime;

    this.step(dt);
    this.animationFrameId = requestAnimationFrame(this.loop);
  };

  public start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = 0;
    this.animationFrameId = requestAnimationFrame(this.loop);
  }

  public pause() {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  public destroy() {
    this.pause();
    // Clean up WebGL resources
    const gl = this.gl;
    if (this.quadBuffer) gl.deleteBuffer(this.quadBuffer);
  }
}
