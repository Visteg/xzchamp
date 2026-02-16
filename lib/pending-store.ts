import fs from 'fs'
import path from 'path'
import { PendingApplication } from './types'

const DATA_DIR = path.join(process.cwd(), 'data')
const PENDING_FILE = path.join(DATA_DIR, 'pending.json')
const EXPIRY_HOURS = 24

function ensureFile(): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  if (!fs.existsSync(PENDING_FILE)) fs.writeFileSync(PENDING_FILE, '[]', 'utf-8')
}

function readAll(): PendingApplication[] {
  ensureFile()
  const raw = fs.readFileSync(PENDING_FILE, 'utf-8')
  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function writeAll(apps: PendingApplication[]): void {
  ensureFile()
  fs.writeFileSync(PENDING_FILE, JSON.stringify(apps, null, 2), 'utf-8')
}

export function addPending(app: PendingApplication): void {
  const apps = readAll()
  apps.push(app)
  writeAll(apps)
}

export function findPending(id: string): PendingApplication | undefined {
  return readAll().find(a => a.id === id)
}

export function updatePending(id: string, updates: Partial<PendingApplication>): void {
  const apps = readAll()
  const idx = apps.findIndex(a => a.id === id)
  if (idx !== -1) {
    apps[idx] = { ...apps[idx], ...updates }
    writeAll(apps)
  }
}

export function removePending(id: string): void {
  const apps = readAll().filter(a => a.id !== id)
  writeAll(apps)
}

export function cleanupExpired(): number {
  const apps = readAll()
  const cutoff = Date.now() - EXPIRY_HOURS * 60 * 60 * 1000
  const valid = apps.filter(a => new Date(a.createdAt).getTime() > cutoff)
  const removed = apps.length - valid.length
  if (removed > 0) writeAll(valid)
  return removed
}
