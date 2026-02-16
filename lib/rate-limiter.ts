const MAX_REQUESTS = 5
const WINDOW_MS = 10 * 60 * 1000 // 10 minutes

const requestLog = new Map<string, number[]>()

let cleanupStarted = false

function startCleanup() {
  if (cleanupStarted) return
  cleanupStarted = true
  const interval = setInterval(() => {
    const cutoff = Date.now() - WINDOW_MS
    for (const [ip, timestamps] of requestLog.entries()) {
      const valid = timestamps.filter(t => t > cutoff)
      if (valid.length === 0) {
        requestLog.delete(ip)
      } else {
        requestLog.set(ip, valid)
      }
    }
  }, WINDOW_MS)
  if (interval && typeof interval === 'object' && 'unref' in interval) {
    (interval as NodeJS.Timeout).unref()
  }
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  retryAfterSeconds?: number
}

export function checkRateLimit(ip: string): RateLimitResult {
  startCleanup()

  const now = Date.now()
  const cutoff = now - WINDOW_MS
  const timestamps = requestLog.get(ip) || []
  const recent = timestamps.filter(t => t > cutoff)

  if (recent.length >= MAX_REQUESTS) {
    const retryAfterMs = recent[0] + WINDOW_MS - now
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil(retryAfterMs / 1000),
    }
  }

  recent.push(now)
  requestLog.set(ip, recent)

  return {
    allowed: true,
    remaining: MAX_REQUESTS - recent.length,
  }
}
