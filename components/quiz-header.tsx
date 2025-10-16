"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { t } from "@/lib/translations"
import { LanguageSwitcher } from "./language-switcher"

export function QuizHeader(props: {
  name: string
  current: number
  total: number
  answered: number
  remaining: number
  className?: string
  onExit?: () => void
  onLogout?: () => void
}) {
  const { name, current, total, answered, remaining, className, onExit, onLogout } = props
  const { language, mounted } = useLanguage()

  if (!mounted) return null

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0")
  const ss = String(remaining % 60).padStart(2, "0")
  const isLow = remaining <= 10

  return (
    <header className={cn("flex items-center justify-between gap-4", className)}>
      <div className="text-sm">
        <div className="font-medium">
          {t(language, "header.greeting")}, {name}
        </div>
        <div className="text-muted-foreground">{t(language, "header.questionOf", { current: current + 1, total })}</div>
      </div>
      <div className="text-right text-sm">
        <div className="font-medium">
          {t(language, "header.answered")}: {answered}/{total}
        </div>
        <div aria-live={isLow ? "assertive" : "polite"} className={cn(isLow && "text-destructive font-semibold")}>
          {t(language, "header.timeRemaining")}: {mm}:{ss}
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <LanguageSwitcher />
          {onExit && (
            <Button size="sm" variant="secondary" onClick={onExit} aria-label={t(language, "header.exitButton")}>
              {t(language, "header.exitButton")}
            </Button>
          )}
          {onLogout && (
            <Button size="sm" variant="destructive" onClick={onLogout} aria-label={t(language, "header.logoutButton")}>
              {t(language, "header.logoutButton")}
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
