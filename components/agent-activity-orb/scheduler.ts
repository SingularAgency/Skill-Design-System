type FrameSubscriber = (timeSeconds: number) => void

const subscribers = new Set<FrameSubscriber>()
let frameRequest = 0

function frame(time: number) {
  const timeSeconds = time / 1000
  subscribers.forEach((subscriber) => subscriber(timeSeconds))
  frameRequest = subscribers.size ? requestAnimationFrame(frame) : 0
}
function start() {
  if (!frameRequest && subscribers.size && document.visibilityState !== "hidden") {
    frameRequest = requestAnimationFrame(frame)
  }
}

function stop() {
  if (frameRequest) cancelAnimationFrame(frameRequest)
  frameRequest = 0
}

if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") stop()
    else start()
  })
}

export function subscribeAgentOrb(subscriber: FrameSubscriber) {
  subscribers.add(subscriber)
  start()
  return () => {
    subscribers.delete(subscriber)
    if (!subscribers.size) stop()
  }
}

export function getAgentOrbSubscriberCount() {
  return subscribers.size
}
