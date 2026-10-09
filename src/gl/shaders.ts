// Base Vertex Shader: renders a full-screen quad
export const baseVertexShader = `
  precision highp float;
  attribute vec2 aPosition;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform vec2 uTexelSize;

  void main () {
    vUv = aPosition * 0.5 + 0.5;
    vL = vUv - vec2(uTexelSize.x, 0.0);
    vR = vUv + vec2(uTexelSize.x, 0.0);
    vT = vUv + vec2(0.0, uTexelSize.y);
    vB = vUv - vec2(0.0, uTexelSize.y);
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

// Splat: injects ink dye and velocity impulse
export const splatShader = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTarget;
  uniform float uAspectRatio;
  uniform vec3 uColor;
  uniform vec2 uPoint;
  uniform float uRadius;

  void main () {
    vec2 p = vUv - uPoint;
    p.x *= uAspectRatio;
    vec3 splat = exp(-dot(p, p) / uRadius) * uColor;
    vec3 base = texture2D(uTarget, vUv).xyz;
    gl_FragColor = vec4(base + splat, 1.0);
  }
`;

// Advection: moves fluid properties along the velocity field
export const advectionShader = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 uTexelSize;
  uniform float uDt;
  uniform float uDissipation;

  void main () {
    vec2 coord = vUv - uDt * texture2D(uVelocity, vUv).xy * uTexelSize;
    gl_FragColor = uDissipation * texture2D(uSource, coord);
  }
`;

// Divergence: calculates the divergence of the velocity field
export const divergenceShader = `
  precision highp float;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;

  void main () {
    float L = texture2D(uVelocity, vL).x;
    float R = texture2D(uVelocity, vR).x;
    float T = texture2D(uVelocity, vT).y;
    float B = texture2D(uVelocity, vB).y;

    vec2 C = texture2D(uVelocity, vUv).xy;
    if (vL.x < 0.0) { L = -C.x; }
    if (vR.x > 1.0) { R = -C.x; }
    if (vT.y > 1.0) { T = -C.y; }
    if (vB.y < 0.0) { B = -C.y; }

    float div = 0.5 * (R - L + T - B);
    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
  }
`;

// Curl / Vorticity: measures micro-swirls for ink turbulence
export const curlShader = `
  precision highp float;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;

  void main () {
    float L = texture2D(uVelocity, vL).y;
    float R = texture2D(uVelocity, vR).y;
    float T = texture2D(uVelocity, vT).x;
    float B = texture2D(uVelocity, vB).x;
    float vorticity = R - L - T + B;
    gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
  }
`;

// Vorticity confinement: adds natural swirl forces back
export const vorticityShader = `
  precision highp float;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  uniform sampler2D uCurl;
  uniform float uCurlValue;
  uniform float uDt;

  void main () {
    float L = texture2D(uCurl, vL).x;
    float R = texture2D(uCurl, vR).x;
    float T = texture2D(uCurl, vT).x;
    float B = texture2D(uCurl, vB).x;
    float C = texture2D(uCurl, vUv).x;

    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
    force /= length(force) + 0.0001;
    force *= uCurlValue * C;
    force.y *= -1.0;

    vec2 vel = texture2D(uVelocity, vUv).xy;
    gl_FragColor = vec4(vel + force * uDt, 0.0, 1.0);
  }
`;

// Pressure Jacobi iteration
export const pressureShader = `
  precision highp float;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;

  void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    float C = texture2D(uPressure, vUv).x;
    float divergence = texture2D(uDivergence, vUv).x;
    float pressure = (L + R + B + T - divergence) * 0.25;
    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
  }
`;

// Gradient Subtract: enforces incompressibility
export const gradientSubtractShader = `
  precision highp float;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;

  void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity.xy -= vec2(R - L, T - B);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

// Display Shader: Cold Ink Zen rendering
// Maps fluid dye into deep pool dark ink with subtle azure-cyan sheen and surface ripple normal
export const displayShader = `
  precision highp float;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uDye;
  uniform vec2 uTexelSize;
  uniform float uScrollFade;

  void main () {
    vec4 dye = texture2D(uDye, vUv);

    // Compute density gradient for pseudo water surface normal & light refraction
    float L = texture2D(uDye, vL).r;
    float R = texture2D(uDye, vR).r;
    float T = texture2D(uDye, vT).r;
    float B = texture2D(uDye, vB).r;
    vec3 normal = normalize(vec3((R - L) * 2.5, (T - B) * 2.5, 1.0));

    // Specular light from subtle cold overhead light source
    vec3 lightDir = normalize(vec3(0.25, 0.7, 0.65));
    float specular = pow(max(dot(normal, lightDir), 0.0), 20.0) * 0.35;

    // Palette:
    // Base Deep Void: #06080c (0.024, 0.031, 0.047)
    // Deep Ink Water: #0d1624 (0.051, 0.086, 0.141)
    // Azure Cold Flow: #162f48 (0.086, 0.184, 0.282)
    // Cyan Wave Crest: #38bdf8 (0.220, 0.741, 0.972)
    vec3 baseColor = vec3(0.024, 0.031, 0.047);
    vec3 deepWater = vec3(0.051, 0.086, 0.141);
    vec3 azureFlow = vec3(0.098, 0.208, 0.318);
    vec3 cyanCrest = vec3(0.220, 0.741, 0.972);

    float intensity = clamp(length(dye.rgb), 0.0, 1.8);

    // Ink dispersion curve: smooth non-linear zen diffusion (concentrated ink core + vapor edge)
    float t1 = smoothstep(0.015, 0.35, intensity);
    float t2 = smoothstep(0.25, 0.85, intensity);
    float t3 = smoothstep(0.70, 1.35, intensity);

    vec3 inkColor = mix(baseColor, deepWater, t1);
    inkColor = mix(inkColor, azureFlow, t2 * 0.9);
    inkColor = mix(inkColor, cyanCrest, t3 * 0.55);

    // Add specular surface reflection on wave ripples
    inkColor += specular * cyanCrest * 0.85;

    // Scroll modulation: deeper pages keep subtle contrast
    float finalAlpha = mix(1.0, 0.80, uScrollFade);

    gl_FragColor = vec4(inkColor, finalAlpha);
  }
`;
