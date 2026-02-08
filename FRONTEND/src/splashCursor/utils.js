export class Material {
  constructor(
    gl,
    vertexShader,
    fragmentShaderSource,
    compileShader,
    createProgram,
    getUniforms,
    hashCode,
  ) {
    this.gl = gl;
    this.vertexShader = vertexShader;
    this.fragmentShaderSource = fragmentShaderSource;
    this.compileShader = compileShader;
    this.createProgram = createProgram;
    this.getUniforms = getUniforms;
    this.hashCode = hashCode;
    this.programs = [];
    this.activeProgram = null;
    this.uniforms = [];
  }
  setKeywords(keywords) {
    let hash = 0;
    for (let i = 0; i < keywords.length; i++)
      hash += this.hashCode(keywords[i]);
    let program = this.programs[hash];
    if (program == null) {
      let fragmentShader = this.compileShader(
        this.gl.FRAGMENT_SHADER,
        this.fragmentShaderSource,
        keywords,
      );
      program = this.createProgram(this.vertexShader, fragmentShader);
      this.programs[hash] = program;
    }
    if (program === this.activeProgram) return;
    this.uniforms = this.getUniforms(program);
    this.activeProgram = program;
  }
  bind() {
    this.gl.useProgram(this.activeProgram);
  }
}

export class Program {
  constructor(gl, vertexShader, fragmentShader, createProgram, getUniforms) {
    this.gl = gl;
    this.uniforms = {};
    this.program = createProgram(vertexShader, fragmentShader);
    this.uniforms = getUniforms(this.program);
  }
  bind() {
    this.gl.useProgram(this.program);
  }
}

export function pointerPrototype() {
  this.id = -1;
  this.texcoordX = 0;
  this.texcoordY = 0;
  this.prevTexcoordX = 0;
  this.prevTexcoordY = 0;
  this.deltaX = 0;
  this.deltaY = 0;
  this.down = false;
  this.moved = false;
  this.color = [0, 0, 0];
}

export function HSVtoRGB(h, s, v) {
  let r, g, b, i, f, p, q, t;
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
    default:
      break;
  }
  return { r, g, b };
}

export function wrap(value, min, max) {
  const range = max - min;
  if (range === 0) return min;
  return ((value - min) % range) + min;
}

export function getResolution(gl, resolution) {
  let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
  if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
  const min = Math.round(resolution);
  const max = Math.round(resolution * aspectRatio);
  if (gl.drawingBufferWidth > gl.drawingBufferHeight)
    return { width: max, height: min };
  else return { width: min, height: max };
}

export function scaleByPixelRatio(input) {
  const pixelRatio = window.devicePixelRatio || 1;
  return Math.floor(input * pixelRatio);
}

export function hashCode(s) {
  if (s.length === 0) return 0;
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}
