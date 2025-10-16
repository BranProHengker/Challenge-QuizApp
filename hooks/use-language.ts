"use client"

import { useState, useEffect, useCallback } from "react"
import type { Language } from "@/lib/translations"

const LANGUAGE_KEY = "quiz_language"

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>("id")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(LANGUAGE_KEY) as Language | null
    if (saved && (saved === "en" || saved === "id")) {
      setLanguageState(saved)
    }
    setMounted(true)
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem(LANGUAGE_KEY, lang)
  }, [])

  return { language, setLanguage, mounted }
}
