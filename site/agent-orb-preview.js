(() => {
  const instances = new Set();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let animationFrame = 0;

  const clamp = (value, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value));
  const hash = (a, b) => {
    const value = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
    return value - Math.floor(value);
  };

  function palette(canvas) {
    const styles = getComputedStyle(canvas);
    const fallback = styles.color || "currentColor";
    const read = (token) => styles.getPropertyValue(token).trim() || fallback;
    return { near: read("--orb-near"), mid: read("--orb-mid"), far: read("--orb-far"), ghost: read("--orb-ghost") };
  }

  function project(yaw, tilt, center, scale) {
    const st = Math.sin(tilt), ct = Math.cos(tilt), sy = Math.sin(yaw), cy = Math.cos(yaw);
    return (x, y, z) => {
      const x1 = x * cy + z * sy;
      const z1 = -x * sy + z * cy;
      return [center + x1 * scale, center - (y * ct - z1 * st) * scale, y * st + z1 * ct];
    };
  }

  function paint(ctx, dots, colors) {
    dots.sort((a, b) => a.z - b.z);
    dots.forEach((dot) => {
      ctx.globalAlpha = clamp(dot.alpha ?? 1);
      ctx.fillStyle = dot.ghost ? colors.ghost : dot.depth > 0.68 ? colors.near : dot.depth > 0.36 ? colors.mid : colors.far;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, Math.max(0.3, dot.radius), 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  function globeDots(size, time, activity) {
    const center = size / 2, radius = center * 0.82, dots = [];
    const inline = size <= 20, rings = inline ? 6 : 12, density = inline ? 12 : 28;
    const wave = activity === "listening";
    const planning = activity === "planning";
    const projector = project(time * (wave ? 0.16 : 0.45), 0.38, center, wave ? 1 : radius);
    const scan = time * 4.8;
    for (let ring = 0; ring <= rings; ring++) {
      const latitude = -Math.PI / 2 + (ring / rings) * Math.PI;
      const cosLatitude = Math.cos(latitude);
      const longitudeCount = Math.max(1, Math.round(Math.abs(cosLatitude) * density));
      const pulse = wave ? 0.9 + 0.09 * Math.sin(time * 2.1 - ring * 0.65) : 1;
      for (let index = 0; index < longitudeCount; index++) {
        const longitude = (index / longitudeCount) * 2 * Math.PI;
        let x0 = cosLatitude * Math.cos(longitude), y0 = Math.sin(latitude), z0 = cosLatitude * Math.sin(longitude);
        if (planning && ring % 3 === Math.floor(time * 1.4) % 3) {
          const angle = Math.sin(time * 2.2) * 0.65, cos = Math.cos(angle), sin = Math.sin(angle);
          [x0, z0] = [x0 * cos + z0 * sin, -x0 * sin + z0 * cos];
        }
        const [x, y, z] = projector(x0 * (wave ? radius * pulse : 1), y0 * (wave ? radius * pulse : 1), z0 * (wave ? radius * pulse : 1));
        const depth = clamp((z / (wave ? radius : 1) + 1) / 2);
        const distance = Math.atan2(Math.sin(longitude - scan), Math.cos(longitude - scan));
        const boost = activity === "searching" ? Math.exp(-(distance * distance) / 0.18) * Math.max(0, z) : 0;
        dots.push({ x, y, z, depth, radius: (inline ? 0.5 : 0.75) + depth * (inline ? 0.65 : 1.05) + boost, alpha: activity === "searching" ? 0.45 + Math.min(1, boost) * 0.55 : 0.82 });
      }
    }
    return dots;
  }

  function workingDots(size, time) {
    const center = size / 2, radius = center * 0.82, dots = [], inline = size <= 20;
    const projector = project(time * 0.1, 0.3, center, 1);
    const orbitCount = inline ? 4 : 8, ghostCount = inline ? 9 : 24;
    for (let orbit = 0; orbit < orbitCount; orbit++) {
      const h1 = hash(orbit, 1.7), h2 = hash(orbit, 5.2), h3 = hash(orbit, 8.9);
      const orbitRadius = radius * (0.48 + 0.48 * h1), tilt = (h2 - 0.5) * 1.2;
      for (let index = 0; index < ghostCount; index++) {
        const angle = (index / ghostCount) * Math.PI * 2;
        const [x, y, z] = projector(Math.cos(angle) * orbitRadius, Math.sin(angle) * orbitRadius * Math.cos(tilt), Math.sin(angle) * orbitRadius * Math.sin(tilt));
        dots.push({ x, y, z, depth: clamp((z / orbitRadius + 1) / 2), radius: inline ? 0.35 : 0.55, alpha: 0.24, ghost: true });
      }
      const angle = time * (0.3 + h3 * 0.55) + h2 * 6;
      const [x, y, z] = projector(Math.cos(angle) * orbitRadius, Math.sin(angle) * orbitRadius * Math.cos(tilt), Math.sin(angle) * orbitRadius * Math.sin(tilt));
      const depth = clamp((z / orbitRadius + 1) / 2);
      dots.push({ x, y, z, depth, radius: (inline ? 0.8 : 1.25) + depth * (inline ? 0.8 : 1.4) });
    }
    return dots;
  }

  const circle = (fraction) => { const angle = -Math.PI / 2 + fraction * Math.PI * 2; return [Math.cos(angle) * 0.24, Math.sin(angle) * 0.24]; };
  const polygon = (vertices, fraction) => {
    const lengths = vertices.map((point, index) => Math.hypot(vertices[(index + 1) % vertices.length][0] - point[0], vertices[(index + 1) % vertices.length][1] - point[1]));
    const total = lengths.reduce((sum, length) => sum + length, 0);
    let target = fraction * total, index = 0;
    while (target > lengths[index] && index < vertices.length - 1) { target -= lengths[index]; index++; }
    const point = vertices[index], next = vertices[(index + 1) % vertices.length], local = target / lengths[index];
    return [point[0] + (next[0] - point[0]) * local, point[1] + (next[1] - point[1]) * local];
  };
  const shapePaths = [circle, (f) => polygon([[0,-0.26],[0.24,0.16],[-0.24,0.16]], f), (f) => polygon([[0,-0.2],[0.2,-0.2],[0.2,0.2],[-0.2,0.2],[-0.2,-0.2]], f)];

  function shapingDots(size, time) {
    const segment = 2.3, cycle = time % (segment * 3), index = Math.floor(cycle / segment), local = cycle - index * segment;
    const raw = local > 1.4 ? (local - 1.4) / 0.9 : 0, blend = raw * raw * (3 - 2 * raw);
    const count = size <= 20 ? 10 : 26, dots = [];
    for (let dot = 0; dot < count; dot++) {
      const fraction = dot / count, a = shapePaths[index](fraction), b = shapePaths[(index + 1) % 3](fraction);
      dots.push({ x: size / 2 + (a[0] + (b[0] - a[0]) * blend) * size * 1.45, y: size / 2 + (a[1] + (b[1] - a[1]) * blend) * size * 1.45, z: 0, depth: 0.86, radius: size <= 20 ? 0.8 : 1.55 });
    }
    return dots;
  }

  function composingDots(size, time) {
    const center = size / 2, radius = center * 0.72, dots = [], inline = size <= 20;
    const lanes = inline ? 3 : 9, segments = inline ? 12 : 38;
    for (let lane = 0; lane < lanes; lane++) {
      const laneOffset = (lane - (lanes - 1) / 2) * (inline ? 0.8 : 1.1);
      for (let segment = 0; segment < segments; segment++) {
        const angle = (segment / segments) * Math.PI * 2;
        const wobble = Math.sin(angle * 3 - time * 1.7 + lane * 0.22) * radius * 0.13;
        const depth = clamp((Math.sin(angle) + 1) / 2);
        dots.push({ x: center + Math.cos(angle) * radius, y: center + Math.sin(angle) * radius * 0.52 + laneOffset + wobble, z: Math.sin(angle), depth, radius: (inline ? 0.45 : 0.72) + depth * (inline ? 0.5 : 0.8), alpha: 0.38 + depth * 0.62 });
      }
    }
    return dots;
  }

  function draw(instance, time) {
    const { canvas, ctx, activity, size } = instance;
    const colors = palette(canvas);
    ctx.clearRect(0, 0, size, size);
    const dots = activity === "working" ? workingDots(size, time) : activity === "shaping" ? shapingDots(size, time) : activity === "composing" ? composingDots(size, time) : globeDots(size, time, activity);
    paint(ctx, dots, colors);
  }

  function tick(time) {
    instances.forEach((instance) => {
      if (!instance.canvas.isConnected) {
        instance.observer?.disconnect();
        instances.delete(instance);
        return;
      }
      if (instance.visible) draw(instance, reducedMotion.matches ? 0.6 : time / 1000);
    });
    animationFrame = instances.size && document.visibilityState !== "hidden" ? requestAnimationFrame(tick) : 0;
  }

  function start() {
    if (!animationFrame && instances.size && document.visibilityState !== "hidden") animationFrame = requestAnimationFrame(tick);
  }

  function mount(canvas) {
    if (canvas.dataset.orbMounted === "true") return;
    canvas.dataset.orbMounted = "true";
    const size = Number(canvas.dataset.orbSize || 64), dpr = Math.min(2, window.devicePixelRatio || 1), ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = Math.round(size * dpr); canvas.height = Math.round(size * dpr); canvas.style.width = `${size}px`; canvas.style.height = `${size}px`; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const instance = { canvas, ctx, size, activity: canvas.dataset.orbActivity || "working", visible: true, observer: null };
    instances.add(instance); draw(instance, 0.6);
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(([entry]) => { instance.visible = entry.isIntersecting; });
      instance.observer = observer;
      observer.observe(canvas);
    }
    start();
  }

  function hydrate(root = document) {
    root.querySelectorAll("canvas[data-orb-activity]").forEach(mount);
  }

  document.addEventListener("visibilitychange", start);
  reducedMotion.addEventListener("change", () => { instances.forEach((instance) => draw(instance, 0.6)); start(); });
  window.SingularAgentOrbPreview = { hydrate };
})();
