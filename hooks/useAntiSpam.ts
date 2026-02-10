'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

const COOLDOWN_SECONDS = 30

export function useAntiSpam(formKey: string) {
  const honeypotRef = useRef<HTMLInputElement>(null)
  const [cooldownLeft, setCooldownLeft] = useState(0)

  // Check remaining cooldown on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(`antispam-cooldown-${formKey}`)
    if (stored) {
      const elapsed = Math.floor((Date.now() - parseInt(stored)) / 1000)
      const remaining = COOLDOWN_SECONDS - elapsed
      if (remaining > 0) {
        setCooldownLeft(remaining)
      } else {
        sessionStorage.removeItem(`antispam-cooldown-${formKey}`)
      }
    }
  }, [formKey])

  // Countdown timer
  useEffect(() => {
    if (cooldownLeft <= 0) return
    const timer = setInterval(() => {
      setCooldownLeft(prev => {
        if (prev <= 1) {
          sessionStorage.removeItem(`antispam-cooldown-${formKey}`)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [cooldownLeft, formKey])

  const validateSubmit = useCallback((): boolean => {
    // Honeypot check: if hidden field is filled, it's a bot
    if (honeypotRef.current && honeypotRef.current.value) {
      return false
    }
    // Cooldown check
    if (cooldownLeft > 0) {
      return false
    }
    return true
  }, [cooldownLeft])

  const startCooldown = useCallback(() => {
    sessionStorage.setItem(`antispam-cooldown-${formKey}`, Date.now().toString())
    setCooldownLeft(COOLDOWN_SECONDS)
  }, [formKey])

  const isDisabled = cooldownLeft > 0

  return { honeypotRef, validateSubmit, startCooldown, cooldownLeft, isDisabled }
}
