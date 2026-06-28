//C:\Users\DOR CO\flashcards-app\features\analytics\posthog.ts
'use client'

import posthog from 'posthog-js'

let initialized = false

export function initPostHog() {
  if (typeof window === 'undefined') return
  if (initialized) return

  console.log("KEY =", process.env.NEXT_PUBLIC_POSTHOG_KEY)
console.log("HOST =", process.env.NEXT_PUBLIC_POSTHOG_HOST)

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: true,
    capture_pageleave: true,
  })

  console.log("✅ PostHog initialized")
console.log("قبل از capture")

posthog.capture("debug_test")

console.log("بعد از capture")
  initialized = true
}

export default posthog