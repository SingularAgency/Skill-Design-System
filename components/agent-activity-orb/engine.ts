/*
 * Singular adaptation of the MIT-licensed thinking-orbs Canvas 2D engine.
 * Upstream: thinking-orbs@0.1.1, commit 382be79c472cd600277f01e14f98f8c0ee18dcb0.
 * See LICENSE.thinking-orbs and README.md in this directory.
 */

import type { AgentActivity, AgentOrbPalette, AgentOrbSize } from "./types"

interface Dot {
  x: number
  y: number
  z: number
  radius: number
  depth: number
  alpha?: number
  ghost?: boolean
}
interface Recipe {
  speed: number
  density: number
  radius: number
}

const RECIPES: Record<AgentActivity, Record<AgentOrbSize, Recipe>> = {
  working: {
    avatar: { speed: 1.885, density: 1, radius: 1 },
    inline: { speed: 3.9, density: 0.24, radius: 2.4 },
  },
  searching: {
    avatar: { speed: 2.015, density: 0.42, radius: 1.15 },
    inline: { speed: 2.665, density: 0.105, radius: 1.75 },
  },
  planning: {
    avatar: { speed: 1.82, density: 0.35, radius: 1.05 },
    inline: { speed: 1.95, density: 0.088, radius: 1.9 },
  },
  listening: {
    avatar: { speed: 4.388, density: 0.341, radius: 1 },
    inline: { speed: 3.998, density: 0.105, radius: 1.6 },
  },
  composing: {
    avatar: { speed: 2.34, density: 0.25, radius: 0.85 },
    inline: { speed: 3.12, density: 0.051, radius: 1.08 },
  },
  shaping: {
    avatar: { speed: 2.405, density: 0.54, radius: 0.4 },
    inline: { speed: 2.08, density: 0.53, radius: 1.02 },
  },
}

type Projection = (x: number, y: number, z: number) => [number, number, number]

function clamp(value: number, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value))
}

function hash(a: number, b: number) {
  const value = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453
  return value - Math.floor(value)
}

function radiusScale(size: number) {
  return (size / 300) ** 0.6
}

function projection(yaw: number, tilt: number, cx: number, cy: number, scale: number): Projection {
  const sinTilt = Math.sin(tilt)
  const cosTilt = Math.cos(tilt)
  const sinYaw = Math.sin(yaw)
  const cosYaw = Math.cos(yaw)
  return (x, y, z) => {
    const x1 = x * cosYaw + z * sinYaw
    const z1 = -x * sinYaw + z * cosYaw
    const y1 = y * cosTilt - z1 * sinTilt
    const z2 = y * sinTilt + z1 * cosTilt
    return [cx + x1 * scale, cy - y1 * scale, z2]
  }
}

function paletteColor(dot: Dot, palette: AgentOrbPalette) {
  if (dot.ghost) return palette.ghost
  if (dot.depth > 0.68) return palette.near
  if (dot.depth > 0.36) return palette.mid
  return palette.far
}

function paint(ctx: CanvasRenderingContext2D, dots: Dot[], palette: AgentOrbPalette) {
  dots.sort((a, b) => a.z - b.z)
  for (const dot of dots) {
    const alpha = dot.alpha ?? 1
    if (alpha < 0.02) continue
    ctx.globalAlpha = clamp(alpha)
    ctx.fillStyle = paletteColor(dot, palette)
    ctx.beginPath()
    ctx.arc(dot.x, dot.y, Math.max(0.3, dot.radius), 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1
}

function latticeCounts(baseRings: number, baseDensity: number, density: number) {
  const multiplier = Math.sqrt(density)
  return {
    rings: Math.max(3, Math.round(baseRings * multiplier)),
    dots: Math.max(4, Math.round(baseDensity * multiplier)),
  }
}

function drawWorking(
  ctx: CanvasRenderingContext2D,
  size: number,
  time: number,
  recipe: Recipe,
  palette: AgentOrbPalette,
) {
  const center = size / 2
  const radius = center * 0.82
  const project = projection(time * 0.12, 0.3, center, center, 1)
  const scale = radiusScale(size) * recipe.radius
  const orbitCount = Math.max(3, Math.round(12 * recipe.density))
  const ghostCount = Math.max(8, Math.round(40 * recipe.density))
  const dots: Dot[] = []

  for (let orbit = 0; orbit < orbitCount; orbit++) {
    const h1 = hash(orbit, 1.7)
    const h2 = hash(orbit, 5.2)
    const h3 = hash(orbit, 8.9)
    const orbitRadius = radius * (0.45 + 0.52 * h1)
    const theta = h1 * 2 * Math.PI
    const phi = Math.acos(2 * h2 - 1)
    const nx = Math.sin(phi) * Math.cos(theta)
    const ny = Math.cos(phi)
    const nz = Math.sin(phi) * Math.sin(theta)
    let ux = -ny
    let uy = nx
    const uz = 0
    const length = Math.max(0.000001, Math.hypot(ux, uy))
    ux /= length
    uy /= length
    const vx = ny * uz - nz * uy
    const vy = nz * ux - nx * uz
    const vz = nx * uy - ny * ux
    const speed = (0.25 + 0.55 * h3) * (h3 > 0.5 ? 1 : -1)

    for (let index = 0; index < ghostCount; index++) {
      const angle = (index / ghostCount) * 2 * Math.PI
      const [x, y, z] = project(
        (ux * Math.cos(angle) + vx * Math.sin(angle)) * orbitRadius,
        (uy * Math.cos(angle) + vy * Math.sin(angle)) * orbitRadius,
        (uz * Math.cos(angle) + vz * Math.sin(angle)) * orbitRadius,
      )
      const depth = clamp((z / orbitRadius + 1) / 2)
      dots.push({ x, y, z, depth, radius: 0.9 * scale, alpha: 0.16 + depth * 0.28, ghost: true })
    }

    for (let particle = 0; particle < 3; particle++) {
      const angle = time * speed + (particle / 3) * 2 * Math.PI + h2 * 6
      const [x, y, z] = project(
        (ux * Math.cos(angle) + vx * Math.sin(angle)) * orbitRadius,
        (uy * Math.cos(angle) + vy * Math.sin(angle)) * orbitRadius,
        (uz * Math.cos(angle) + vz * Math.sin(angle)) * orbitRadius,
      )
      const depth = clamp((z / orbitRadius + 1) / 2)
      dots.push({ x, y, z, depth, radius: (1.2 + 1.6 * depth) * scale })
    }
  }
  paint(ctx, dots, palette)
}

function drawSearching(
  ctx: CanvasRenderingContext2D,
  size: number,
  time: number,
  recipe: Recipe,
  palette: AgentOrbPalette,
) {
  const center = size / 2
  const radius = center * 0.82
  const spin = 0.5
  const project = projection(time * spin, 0.4 + 0.06 * Math.sin(time * 0.35), center, center, radius)
  const scan = time * 5.3
  const scale = radiusScale(size) * recipe.radius
  const counts = latticeCounts(17, 44, recipe.density)
  const dots: Dot[] = []

  for (let ring = 0; ring <= counts.rings; ring++) {
    const latitude = -Math.PI / 2 + (ring / counts.rings) * Math.PI
    const cosLatitude = Math.cos(latitude)
    const longitudeCount = Math.max(1, Math.round(Math.abs(cosLatitude) * counts.dots))
    for (let longitudeIndex = 0; longitudeIndex < longitudeCount; longitudeIndex++) {
      const longitude = (longitudeIndex / longitudeCount) * 2 * Math.PI
      const [x, y, z] = project(cosLatitude * Math.cos(longitude), Math.sin(latitude), cosLatitude * Math.sin(longitude))
      const depth = clamp((z + 1) / 2)
      const distance = Math.atan2(Math.sin(longitude + time * spin - scan), Math.cos(longitude + time * spin - scan))
      const boost = Math.exp(-(distance * distance) / 0.18) * Math.max(0, z)
      dots.push({
        x,
        y,
        z,
        depth,
        radius: (0.6 + 1.7 * depth + boost) * scale,
        alpha: 0.42 + Math.min(1, boost) * 0.58,
      })
    }
  }
  paint(ctx, dots, palette)
}

function rotateBand(
  point: [number, number, number],
  axis: number,
  threshold: number,
  angle: number,
): [number, number, number] {
  let [x, y, z] = point
  const coordinate = axis === 0 ? x : axis === 1 ? y : z
  if (coordinate < threshold || coordinate >= threshold + 0.5) return point
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  if (axis === 0) [y, z] = [y * cos - z * sin, y * sin + z * cos]
  else if (axis === 1) [x, z] = [x * cos + z * sin, -x * sin + z * cos]
  else [x, y] = [x * cos - y * sin, x * sin + y * cos]
  return [x, y, z]
}

function drawPlanning(
  ctx: CanvasRenderingContext2D,
  size: number,
  time: number,
  recipe: Recipe,
  palette: AgentOrbPalette,
) {
  const center = size / 2
  const radius = center * 0.82
  const project = projection(time * 0.55, 0.35 + 0.1 * Math.sin(time * 0.9), center, center, radius)
  const scale = radiusScale(size) * recipe.radius
  const counts = latticeCounts(15, 40, recipe.density)
  const cycle = time % 7.2
  const move = Math.min(1, (cycle % 1.2) / 0.82)
  const eased = 1 - (1 - move) ** 3
  const moveIndex = Math.floor(cycle / 1.2)
  const direction = moveIndex % 2 ? -1 : 1
  const axis = moveIndex % 3
  const threshold = -1 + (moveIndex % 4) * 0.5
  const dots: Dot[] = []

  for (let ring = 0; ring <= counts.rings; ring++) {
    const latitude = -Math.PI / 2 + (ring / counts.rings) * Math.PI
    const cosLatitude = Math.cos(latitude)
    const longitudeCount = Math.max(1, Math.round(Math.abs(cosLatitude) * counts.dots))
    for (let longitudeIndex = 0; longitudeIndex < longitudeCount; longitudeIndex++) {
      const longitude = (longitudeIndex / longitudeCount) * 2 * Math.PI
      const original: [number, number, number] = [cosLatitude * Math.cos(longitude), Math.sin(latitude), cosLatitude * Math.sin(longitude)]
      const rotated = rotateBand(original, axis, threshold, direction * eased * Math.PI * 0.5)
      const active = rotated !== original
      const [x, y, z] = project(...rotated)
      const depth = clamp((z + 1) / 2)
      dots.push({ x, y, z, depth, radius: (0.6 + 1.7 * depth + (active ? 0.32 : 0)) * scale, alpha: active ? 1 : 0.76 })
    }
  }
  paint(ctx, dots, palette)
}

function drawListening(
  ctx: CanvasRenderingContext2D,
  size: number,
  time: number,
  recipe: Recipe,
  palette: AgentOrbPalette,
) {
  const center = size / 2
  const sphereRadius = center * 0.874
  const project = projection(time * 0.18, 0.38, center, center, 1)
  const scale = radiusScale(size) * recipe.radius
  const counts = latticeCounts(15, 40, recipe.density)
  const dots: Dot[] = []

  for (let ring = 0; ring <= counts.rings; ring++) {
    const latitude = -Math.PI / 2 + (ring / counts.rings) * Math.PI
    const cosLatitude = Math.cos(latitude)
    const wave = 0.62 * Math.sin(time * 2.1 - ring * 0.52) + 0.38 * Math.sin(time * 1.27 + ring * 0.83)
    const ringRadius = sphereRadius * (0.88 + 0.105 * wave)
    const longitudeCount = Math.max(1, Math.round(Math.abs(cosLatitude) * counts.dots))
    for (let index = 0; index < longitudeCount; index++) {
      const longitude = (index / longitudeCount) * 2 * Math.PI
      const [x, y, z] = project(
        cosLatitude * Math.cos(longitude) * ringRadius,
        Math.sin(latitude) * ringRadius,
        cosLatitude * Math.sin(longitude) * ringRadius,
      )
      const depth = clamp((z / sphereRadius + 1) / 2)
      const crest = Math.max(0, wave)
      dots.push({ x, y, z, depth, radius: (0.6 + 1.7 * depth) * (1 + 0.4 * crest) * scale })
    }
  }
  paint(ctx, dots, palette)
}

function fibonacciDirection(index: number, count: number): [number, number, number] {
  const golden = Math.PI * (3 - Math.sqrt(5))
  const y = 1 - (2 * (index + 0.5)) / count
  const radius = Math.sqrt(1 - y * y)
  const angle = index * golden
  return [radius * Math.cos(angle), y, radius * Math.sin(angle)]
}

function drawComposing(
  ctx: CanvasRenderingContext2D,
  size: number,
  time: number,
  recipe: Recipe,
  palette: AgentOrbPalette,
) {
  const center = size / 2
  const radius = center * 0.78
  const project = projection(0, 0.3, center, center, 1)
  const scale = radiusScale(size) * recipe.radius
  const dots: Dot[] = []
  const ghostCount = Math.max(12, Math.round(150 * recipe.density))

  for (let index = 0; index < ghostCount; index++) {
    const direction = fibonacciDirection(index, ghostCount)
    const [x, y, z] = project(direction[0] * radius, direction[1] * radius, direction[2] * radius)
    const depth = clamp((z / radius + 1) / 2)
    dots.push({ x, y, z, depth, radius: 0.8 * scale, alpha: 0.06 + 0.18 * depth, ghost: true })
  }

  const lanes = Math.max(3, Math.round(20 * Math.sqrt(recipe.density)))
  const segments = Math.max(12, Math.round(88 * Math.sqrt(recipe.density)))
  const tilt = 0.55
  const ux = 1
  const uz = 0
  const vx = -uz * Math.sin(tilt)
  const vy = Math.cos(tilt)
  const vz = ux * Math.sin(tilt)
  const nx = -uz * vy
  const ny = uz * vx - ux * vz
  const nz = ux * vy

  for (let lane = 0; lane < lanes; lane++) {
    const offsetBase = (lane - (lanes - 1) / 2) * 0.022
    const edge = Math.abs(lane - (lanes - 1) / 2) / Math.max(1, (lanes - 1) / 2)
    for (let segment = 0; segment < segments; segment++) {
      const angle = (segment / segments) * 2 * Math.PI
      const wobble = 0.16 * Math.sin(angle * 3 - time * 1.7 + lane * 0.22) + 0.07 * Math.sin(angle * 5 + time * 1.1)
      const offset = offsetBase + wobble
      const x0 = ux * Math.cos(angle) + vx * Math.sin(angle) + nx * offset
      const y0 = vy * Math.sin(angle) + ny * offset
      const z0 = uz * Math.cos(angle) + vz * Math.sin(angle) + nz * offset
      const length = Math.hypot(x0, y0, z0)
      const [x, y, z] = project((x0 / length) * radius, (y0 / length) * radius, (z0 / length) * radius)
      const depth = clamp((z / radius + 1) / 2)
      dots.push({ x, y, z, depth, radius: (1.1 + 1.7 * depth) * (1 - 0.25 * edge) * scale, alpha: 0.42 + 0.58 * depth })
    }
  }
  paint(ctx, dots, palette)
}

type Path = (fraction: number) => [number, number]

function polygonPath(vertices: ReadonlyArray<readonly [number, number]>): Path {
  const lengths = vertices.map((point, index) => {
    const next = vertices[(index + 1) % vertices.length]
    return Math.hypot(next[0] - point[0], next[1] - point[1])
  })
  const total = lengths.reduce((sum, length) => sum + length, 0)
  return (fraction) => {
    let target = fraction * total
    let index = 0
    while (target > lengths[index] && index < vertices.length - 1) {
      target -= lengths[index]
      index++
    }
    const point = vertices[index]
    const next = vertices[(index + 1) % vertices.length]
    const local = lengths[index] ? Math.min(1, target / lengths[index]) : 0
    return [point[0] + (next[0] - point[0]) * local, point[1] + (next[1] - point[1]) * local]
  }
}

const CIRCLE: Path = (fraction) => {
  const angle = -Math.PI / 2 + fraction * 2 * Math.PI
  return [Math.cos(angle) * 0.24, Math.sin(angle) * 0.24]
}
const TRIANGLE = polygonPath([[0, -0.26], [0.24, 0.16], [-0.24, 0.16]])
const SQUARE = polygonPath([[0, -0.2], [0.2, -0.2], [0.2, 0.2], [-0.2, 0.2], [-0.2, -0.2]])
const SHAPES = [CIRCLE, TRIANGLE, SQUARE]

function drawShaping(
  ctx: CanvasRenderingContext2D,
  size: number,
  time: number,
  recipe: Recipe,
  palette: AgentOrbPalette,
) {
  const hold = 1.4
  const morph = 0.9
  const segmentDuration = hold + morph
  const cycle = time % (segmentDuration * SHAPES.length)
  const shapeIndex = Math.floor(cycle / segmentDuration)
  const local = cycle - shapeIndex * segmentDuration
  const raw = local > hold ? (local - hold) / morph : 0
  const blend = raw * raw * (3 - 2 * raw)
  const from = SHAPES[shapeIndex]
  const to = SHAPES[(shapeIndex + 1) % SHAPES.length]
  const count = Math.max(8, Math.round(34 * recipe.density))
  const pulse = 1 + 0.02 * Math.sin(local * 3.1)
  const dots: Dot[] = []

  for (let index = 0; index < count; index++) {
    const fraction = index / count
    const start = from(fraction)
    const end = to(fraction)
    const x = (start[0] + (end[0] - start[0]) * blend) * pulse
    const y = (start[1] + (end[1] - start[1]) * blend) * pulse
    dots.push({
      x: size / 2 + x * size * 1.45,
      y: size / 2 + y * size * 1.45,
      z: 0,
      depth: 0.86,
      radius: Math.max(0.35, 0.028 * size * recipe.radius),
    })
  }
  paint(ctx, dots, palette)
}

const DRAWERS: Record<AgentActivity, typeof drawWorking> = {
  working: drawWorking,
  searching: drawSearching,
  planning: drawPlanning,
  listening: drawListening,
  composing: drawComposing,
  shaping: drawShaping,
}

export function drawAgentActivityOrb(
  ctx: CanvasRenderingContext2D,
  activity: AgentActivity,
  orbSize: AgentOrbSize,
  pixelSize: number,
  timeSeconds: number,
  speed: number,
  palette: AgentOrbPalette,
) {
  const recipe = RECIPES[activity]
  const tuned = recipe[orbSize]
  ctx.clearRect(0, 0, pixelSize, pixelSize)
  DRAWERS[activity](ctx, pixelSize, timeSeconds * tuned.speed * speed, tuned, palette)
}

export function resolveAgentOrbRecipe(activity: AgentActivity, size: AgentOrbSize) {
  return RECIPES[activity][size]
}
