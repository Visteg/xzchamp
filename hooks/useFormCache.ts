'use client'

import { useState, useEffect, useCallback } from 'react'

export function useFormCache<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const cached = sessionStorage.getItem(key)
      if (cached) {
        const parsed = JSON.parse(cached)
        // Merge with initial value to handle new fields added after caching
        if (typeof initialValue === 'object' && initialValue !== null && !Array.isArray(initialValue)) {
          return { ...initialValue, ...parsed }
        }
        return parsed
      }
    } catch {
      // Ignore parse errors
    }
    return initialValue
  })

  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(state))
    } catch {
      // Ignore storage errors
    }
  }, [key, state])

  const clearCache = useCallback(() => {
    try {
      sessionStorage.removeItem(key)
    } catch {
      // Ignore storage errors
    }
  }, [key])

  return [state, setState, clearCache]
}
