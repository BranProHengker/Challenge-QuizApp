"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex gap-2">
      <Button
        variant={language === "id" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("id")}
        aria-label="Switch to Indonesian"
      >
        ID
      </Button>
      <Button
        variant={language === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("en")}
        aria-label="Switch to English"
      >
        EN
      </Button>
    </div>
  )
}
