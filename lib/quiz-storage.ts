import type { QuizState } from "./quiz-types"

export const USER_KEY = "quiz_user_v1"
export const STATE_KEY = "quiz_state_v1"

export function getUser(): string | null {
  if (typeof window === "undefined") return null
  return window.localStorage.getItem(USER_KEY)
}

export function setUser(name: string) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(USER_KEY, name)
}

export function clearUser() {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(USER_KEY)
}

export function loadState(): QuizState | null {
  if (typeof window === "undefined") return null
  const raw = window.localStorage.getItem(STATE_KEY)
  try {
    return raw ? (JSON.parse(raw) as QuizState) : null
  } catch {
    return null
  }
}

export function saveState(state: QuizState) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STATE_KEY, JSON.stringify(state))
}

export function clearState() {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(STATE_KEY)
}
