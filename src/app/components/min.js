import {
  Clock as e,
  PerspectiveCamera as t,
  Scene as i,
  WebGLRenderer as s,
  SRGBColorSpace as n,
  MathUtils as o,
  Vector2 as r,
  Vector3 as a,
  MeshPhysicalMaterial as c,
  ShaderChunk as h,
  Color as l,
  Object3D as m,
  InstancedMesh as d,
  PMREMGenerator as p,
  SphereGeometry as g,
  AmbientLight as f,
  PointLight as u,
  ACESFilmicToneMapping as v,
  Raycaster as y,
  Plane as w,
} from "https://cdn.jsdelivr.net/npm/three@0.170.0/+esm";
import { RoomEnvironment as z } from "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/environments/RoomEnvironment.js/+esm";
class x {
  #e;
  canvas;
  camera;
  cameraMinAspect;
  cameraMaxAspect;
  cameraFov;
  maxPixelRatio;
  minPixelRatio;
  scene;
  renderer;
  #t;
  size = {
    width: 0,
    height: 0,
    wWidth: 0,
    wHeight: 0,
    ratio: 0,
    pixelRatio: 0,
  };
  render = this.#i;
  onBeforeRender = () => {};
  onAfterRender = () => {};
  onAfterResize = () => {};
  #s = !1;
  #n = !1;
  isDisposed = !1;
  #o;
  #r;
  #a;
  #c = new e();
  #h = { elapsed: 0, delta: 0 };
  #l;
  constructor(e) {
    (this.#e = { ...e }),
      this.#m(),
      this.#d(),
      this.#p(),
      this.resize(),
      this.#g();
  }
  #m() {
    (this.camera = new t()), (this.cameraFov = this.camera.fov);
  }
  #d() {
    this.scene = new i();
  }
  #p() {
    this.#e.canvas
      ? (this.canvas = this.#e.canvas)
      : this.#e.id
      ? (this.canvas = document.getElementById(this.#e.id))
      : console.error("Three: Missing canvas or id parameter"),
      (this.canvas.style.display = "block");
    const e = {
      canvas: this.canvas,
      powerPreference: "high-performance",
      ...(this.#e.rendererOptions ?? {}),
    };
    (this.renderer = new s(e)), (this.renderer.outputColorSpace = n);
  }
  #g() {
    this.#e.size instanceof Object ||
      (window.addEventListener("resize", this.#f.bind(this)),
      "parent" === this.#e.size &&
        ((this.#r = new ResizeObserver(this.#f.bind(this))),
        this.#r.observe(this.canvas.parentNode))),
      (this.#o = new IntersectionObserver(this.#u.bind(this), {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      })),
      this.#o.observe(this.canvas),
      document.addEventListener("visibilitychange", this.#v.bind(this));
  }
  #y() {
    window.removeEventListener("resize", this.#f.bind(this)),
      this.#r?.disconnect(),
      this.#o?.disconnect(),
      document.removeEventListener("visibilitychange", this.#v.bind(this));
  }
  #u(e) {
    (this.#s = e[0].isIntersecting), this.#s ? this.#w() : this.#z();
  }
  #v(e) {
    this.#s && (document.hidden ? this.#z() : this.#w());
  }
  #f() {
    this.#a && clearTimeout(this.#a),
      (this.#a = setTimeout(this.resize.bind(this), 100));
  }
  resize() {
    let e, t;
    this.#e.size instanceof Object
      ? ((e = this.#e.size.width), (t = this.#e.size.height))
      : "parent" === this.#e.size && this.canvas.parentNode
      ? ((e = this.canvas.parentNode.offsetWidth),
        (t = this.canvas.parentNode.offsetHeight))
      : ((e = window.innerWidth), (t = window.innerHeight)),
      (this.size.width = e),
      (this.size.height = t),
      (this.size.ratio = e / t),
      this.#x(),
      this.#b(),
      this.onAfterResize(this.size);
  }
  #x() {
    (this.camera.aspect = this.size.width / this.size.height),
      this.camera.isPerspectiveCamera &&
        this.cameraFov &&
        (this.cameraMinAspect && this.camera.aspect < this.cameraMinAspect
          ? this.#A(this.cameraMinAspect)
          : this.cameraMaxAspect && this.camera.aspect > this.cameraMaxAspect
          ? this.#A(this.cameraMaxAspect)
          : (this.camera.fov = this.cameraFov)),
      this.camera.updateProjectionMatrix(),
      this.updateWorldSize();
  }
  #A(e) {
    const t =
      Math.tan(o.degToRad(this.cameraFov / 2)) / (this.camera.aspect / e);
    this.camera.fov = 2 * o.radToDeg(Math.atan(t));
  }
  updateWorldSize() {
    if (this.camera.isPerspectiveCamera) {
      const e = (this.camera.fov * Math.PI) / 180;
      (this.size.wHeight = 2 * Math.tan(e / 2) * this.camera.position.length()),
        (this.size.wWidth = this.size.wHeight * this.camera.aspect);
    } else
      this.camera.isOrthographicCamera &&
        ((this.size.wHeight = this.camera.top - this.camera.bottom),
        (this.size.wWidth = this.camera.right - this.camera.left));
  }
  #b() {
    this.renderer.setSize(this.size.width, this.size.height),
      this.#t?.setSize(this.size.width, this.size.height);
    let e = window.devicePixelRatio;
    this.maxPixelRatio && e > this.maxPixelRatio
      ? (e = this.maxPixelRatio)
      : this.minPixelRatio &&
        e < this.minPixelRatio &&
        (e = this.minPixelRatio),
      this.renderer.setPixelRatio(e),
      (this.size.pixelRatio = e);
  }
  get postprocessing() {
    return this.#t;
  }
  set postprocessing(e) {
    (this.#t = e), (this.render = e.render.bind(e));
  }
  #w() {
    if (this.#n) return;
    console.log("Start rendering");
    const e = () => {
      (this.#l = requestAnimationFrame(e)),
        (this.#h.delta = this.#c.getDelta()),
        (this.#h.elapsed += this.#h.delta),
        this.onBeforeRender(this.#h),
        this.render(),
        this.onAfterRender(this.#h);
    };
    (this.#n = !0), this.#c.start(), e();
  }
  #z() {
    this.#n &&
      (console.log("Stop rendering"),
      cancelAnimationFrame(this.#l),
      (this.#n = !1),
      this.#c.stop());
  }
  #i() {
    this.renderer.render(this.scene, this.camera);
  }
  clear() {
    this.scene.traverse((e) => {
      e.isMesh &&
        "object" == typeof e.material &&
        (Object.keys(e.material).forEach((t) => {
          const i = e.material[t];
          null !== i &&
            "object" == typeof i &&
            "function" == typeof i.dispose &&
            i.dispose();
        }),
        e.material.dispose(),
        e.geometry.dispose());
    }),
      this.scene.clear();
  }
  dispose() {
    console.log("dispose"),
      this.#y(),
      this.#z(),
      this.clear(),
      this.#t?.dispose(),
      this.renderer.dispose(),
      (this.isDisposed = !0);
  }
}
const b = new Map(),
  A = new r();
let R = !1;
function S(e) {
  const t = {
    position: new r(),
    nPosition: new r(),
    hover: !1,
    onEnter() {},
    onMove() {},
    onClick() {},
    onLeave() {},
    ...e,
  };
  return (
    (function (e, t) {
      b.has(e) ||
        (b.set(e, t),
        R ||
          (document.body.addEventListener("pointermove", M),
          document.body.addEventListener("pointerleave", L),
          document.body.addEventListener("click", C),
          (R = !0)));
    })(e.domElement, t),
    (t.dispose = () => {
      var t;
      (t = e.domElement),
        b.delete(t),
        0 === b.size &&
          (document.body.removeEventListener("pointermove", M),
          document.body.removeEventListener("pointerleave", L),
          (R = !1));
    }),
    t
  );
}
function M(e) {
  (A.x = e.clientX), (A.y = e.clientY);
  for (const [e, t] of b) {
    const i = e.getBoundingClientRect();
    D(i)
      ? (P(t, i), t.hover || ((t.hover = !0), t.onEnter(t)), t.onMove(t))
      : t.hover && ((t.hover = !1), t.onLeave(t));
  }
}
function C(e) {
  (A.x = e.clientX), (A.y = e.clientY);
  for (const [e, t] of b) {
    const i = e.getBoundingClientRect();
    P(t, i), D(i) && t.onClick(t);
  }
}
function L() {
  for (const e of b.values()) e.hover && ((e.hover = !1), e.onLeave(e));
}
function P(e, t) {
  const { position: i, nPosition: s } = e;
  (i.x = A.x - t.left),
    (i.y = A.y - t.top),
    (s.x = (i.x / t.width) * 2 - 1),
    (s.y = (-i.y / t.height) * 2 + 1);
}
function D(e) {
  const { x: t, y: i } = A,
    { left: s, top: n, width: o, height: r } = e;
  return t >= s && t <= s + o && i >= n && i <= n + r;
}
const { randFloat: k, randFloatSpread: E } = o,
  F = new a(),
  I = new a(),
  O = new a(),
  V = new a(),
  B = new a(),
  N = new a(),
  _ = new a(),
  j = new a(),
  H = new a(),
  T = new a();
class W {
  constructor(e) {
    (this.config = e),
      (this.positionData = new Float32Array(3 * e.count).fill(0)),
      (this.velocityData = new Float32Array(3 * e.count).fill(0)),
      (this.sizeData = new Float32Array(e.count).fill(1)),
      (this.center = new a()),
      this.#R(),
      this.setSizes();
  }
  #R() {
    const { config: e, positionData: t } = this;
    this.center.toArray(t, 0);
    for (let i = 1; i < e.count; i++) {
      const s = 3 * i;
      (t[s] = E(2 * e.maxX)),
        (t[s + 1] = E(2 * e.maxY)),
        (t[s + 2] = E(2 * e.maxZ));
    }
  }
  setSizes() {
    const { config: e, sizeData: t } = this;
    t[0] = e.size0;
    for (let i = 1; i < e.count; i++) t[i] = k(e.minSize, e.maxSize);
  }
  update(e) {
    const {
      config: t,
      center: i,
      positionData: s,
      sizeData: n,
      velocityData: o,
    } = this;
    let r = 0;
    t.controlSphere0 &&
      ((r = 1),
      F.fromArray(s, 0),
      F.lerp(i, 0.1).toArray(s, 0),
      V.set(0, 0, 0).toArray(o, 0));
    for (let i = r; i < t.count; i++) {
      const r = 3 * i;
      I.fromArray(s, r),
        B.fromArray(o, r),
        (B.y -= e.delta * t.gravity * n[i]),
        B.multiplyScalar(t.friction),
        B.clampLength(0, t.maxVelocity),
        I.add(B),
        I.toArray(s, r),
        B.toArray(o, r);
    }
    for (let e = r; e < t.count; e++) {
      const i = 3 * e;
      I.fromArray(s, i), B.fromArray(o, i);
      const r = n[e];
      for (let a = e + 1; a < t.count; a++) {
        const e = 3 * a;
        O.fromArray(s, e), N.fromArray(o, e);
        const t = n[a];
        _.copy(O).sub(I);
        const c = _.length(),
          h = r + t;
        if (c < h) {
          const t = h - c;
          j
            .copy(_)
            .normalize()
            .multiplyScalar(0.5 * t),
            H.copy(j).multiplyScalar(Math.max(B.length(), 1)),
            T.copy(j).multiplyScalar(Math.max(N.length(), 1)),
            I.sub(j),
            B.sub(H),
            I.toArray(s, i),
            B.toArray(o, i),
            O.add(j),
            N.add(T),
            O.toArray(s, e),
            N.toArray(o, e);
        }
      }
      if (t.controlSphere0) {
        _.copy(F).sub(I);
        const e = _.length(),
          t = r + n[0];
        if (e < t) {
          const i = t - e;
          j.copy(_).normalize().multiplyScalar(i),
            H.copy(j).multiplyScalar(Math.max(B.length(), 2)),
            I.sub(j),
            B.sub(H);
        }
      }
      Math.abs(I.x) + r > t.maxX &&
        ((I.x = Math.sign(I.x) * (t.maxX - r)), (B.x = -B.x * t.wallBounce)),
        0 === t.gravity
          ? Math.abs(I.y) + r > t.maxY &&
            ((I.y = Math.sign(I.y) * (t.maxY - r)), (B.y = -B.y * t.wallBounce))
          : I.y - r < -t.maxY &&
            ((I.y = -t.maxY + r), (B.y = -B.y * t.wallBounce));
      const a = Math.max(t.maxZ, t.maxSize);
      Math.abs(I.z) + r > a &&
        ((I.z = Math.sign(I.z) * (t.maxZ - r)), (B.z = -B.z * t.wallBounce)),
        I.toArray(s, i),
        B.toArray(o, i);
    }
  }
}
class Y extends c {
  constructor(e) {
    super(e);
    (this.uniforms = {
      thicknessDistortion: { value: 0.1 },
      thicknessAmbient: { value: 0 },
      thicknessAttenuation: { value: 0.1 },
      thicknessPower: { value: 2 },
      thicknessScale: { value: 10 },
    }),
      (this.defines.USE_UV = ""),
      (this.onBeforeCompile = (e) => {
        Object.assign(e.uniforms, this.uniforms),
          (e.fragmentShader =
            "\n        uniform float thicknessPower;\n        uniform float thicknessScale;\n        uniform float thicknessDistortion;\n        uniform float thicknessAmbient;\n        uniform float thicknessAttenuation;\n      " +
            e.fragmentShader),
          (e.fragmentShader = e.fragmentShader.replace(
            "void main() {",
            "\n        void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {\n          vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));\n          float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;\n          #ifdef USE_COLOR\n            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor;\n          #else\n            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;\n          #endif\n          reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;\n        }\n\n        void main() {\n      "
          ));
        const t = h.lights_fragment_begin.replaceAll(
          "RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );",
          "\n          RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);\n        "
        );
        (e.fragmentShader = e.fragmentShader.replace(
          "#include <lights_fragment_begin>",
          t
        )),
          this.onBeforeCompile2 && this.onBeforeCompile2(e);
      });
  }
}
const X = {
    count: 200,
    colors: [255, 0, 16777215],
    ambientColor: 16777215,
    ambientIntensity: 1,
    lightIntensity: 200,
    materialParams: {
      metalness: 0.5,
      roughness: 0.5,
      clearcoat: 1,
      clearcoatRoughness: 0.15,
    },
    minSize: 0.5,
    maxSize: 1,
    size0: 1,
    gravity: 0.5,
    friction: 0.9975,
    wallBounce: 0.95,
    maxVelocity: 0.15,
    maxX: 5,
    maxY: 5,
    maxZ: 2,
    controlSphere0: !1,
  },
  U = new m();
class Z extends d {
  constructor(e, t = {}) {
    const i = { ...X, ...t },
      s = new z(),
      n = new p(e, 0.04).fromScene(s).texture,
      o = new g(),
      r = new Y({ envMap: n, ...i.materialParams });
    (r.envMapRotation.x = -Math.PI / 2),
      super(o, r, i.count),
      (this.config = i),
      (this.physics = new W(i)),
      this.#S(),
      this.setColors(i.colors);
  }
  #S() {
    (this.ambientLight = new f(
      this.config.ambientColor,
      this.config.ambientIntensity
    )),
      this.add(this.ambientLight),
      (this.light = new u(this.config.colors[0], this.config.lightIntensity)),
      this.add(this.light);
  }
  setColors(e) {
    if (Array.isArray(e) && e.length > 1) {
      const t = (function (e) {
        let t, i;
        return (
          s(e),
          {
            setColors: s,
            getColorAt: function (e, s = new l()) {
              const n = Math.max(0, Math.min(1, e)) * (t.length - 1),
                o = Math.floor(n),
                r = i[o];
              if (o >= t.length - 1) return r.clone();
              const a = n - o,
                c = i[o + 1];
              return (
                (s.r = r.r + a * (c.r - r.r)),
                (s.g = r.g + a * (c.g - r.g)),
                (s.b = r.b + a * (c.b - r.b)),
                s
              );
            },
          }
        );
        function s(e) {
          (t = e),
            (i = []),
            t.forEach((e) => {
              const t = new l(e);
              i.push(t);
            });
        }
      })(e);
      for (let e = 0; e < this.count; e++)
        this.setColorAt(e, t.getColorAt(e / this.count)),
          0 === e && this.light.color.copy(t.getColorAt(e / this.count));
      this.instanceColor.needsUpdate = !0;
    }
  }
  update(e) {
    this.physics.update(e);
    for (let e = 0; e < this.count; e++)
      U.position.fromArray(this.physics.positionData, 3 * e),
        U.scale.setScalar(this.physics.sizeData[e]),
        U.updateMatrix(),
        this.setMatrixAt(e, U.matrix),
        0 === e && this.light.position.copy(U.position);
    this.instanceMatrix.needsUpdate = !0;
  }
}
function q(e, t = {}) {
  const i = new x({
    canvas: e,
    size: "parent",
    rendererOptions: { antialias: !0, alpha: !0 },
  });
  let s;
  (i.renderer.toneMapping = v),
    i.camera.position.set(0, 0, 20),
    i.camera.lookAt(0, 0, 0),
    (i.cameraMaxAspect = 1.5),
    i.resize(),
    l(t);
  const n = new y(),
    o = new w(new a(0, 0, 1), 0),
    r = new a();
  let c = !1;
  const h = S({
    domElement: e,
    onMove() {
      n.setFromCamera(h.nPosition, i.camera),
        i.camera.getWorldDirection(o.normal),
        n.ray.intersectPlane(o, r),
        s.physics.center.copy(r),
        (s.config.controlSphere0 = !0);
    },
    onLeave() {
      s.config.controlSphere0 = !1;
    },
  });
  function l(e) {
    s && (i.clear(), i.scene.remove(s)),
      (s = new Z(i.renderer, e)),
      i.scene.add(s);
  }
  return (
    (i.onBeforeRender = (e) => {
      c || s.update(e);
    }),
    (i.onAfterResize = (e) => {
      (s.config.maxX = e.wWidth / 2), (s.config.maxY = e.wHeight / 2);
    }),
    {
      three: i,
      get spheres() {
        return s;
      },
      setCount(e) {
        l({ ...s.config, count: e });
      },
      togglePause() {
        c = !c;
      },
      dispose() {
        h.dispose(), i.dispose();
      },
    }
  );
}
export { q as default };
