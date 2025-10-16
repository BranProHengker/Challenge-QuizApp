"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import QuizReview from "./quiz-review"
import { useLanguage } from "@/hooks/use-language"
import { t } from "@/lib/translations"
import type { Question, Answer } from "@/lib/quiz-types"

export default function QuizResult(props: {
  name: string
  correct: number
  wrong: number
  answered: number
  total: number
  questions: Question[]
  answers: Answer[]
  onRetry: () => void
  onLogout?: () => void
}) {
  const { name, correct, wrong, answered, total, questions, answers, onRetry, onLogout } = props
  const [showReview, setShowReview] = useState(false)
  const { language, mounted } = useLanguage()

  if (!mounted) return null

  if (showReview) {
    return <QuizReview questions={questions} answers={answers} onBack={() => setShowReview(false)} />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-balance">{t(language, "result.title")}</CardTitle>
        <CardDescription>{t(language, "result.greeting", { name })}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="grid grid-cols-2 gap-2">
          <Stat label={t(language, "result.totalQuestions")} value={total} />
          <Stat label={t(language, "result.answered")} value={answered} />
          <Stat label={t(language, "result.correct")} value={correct} />
          <Stat label={t(language, "result.wrong")} value={wrong} />
        </div>
        <div className="grid gap-2">
          <Button onClick={() => setShowReview(true)} variant="secondary" className="w-full">
            {t(language, "result.reviewButton")}
          </Button>
          <Button onClick={onRetry} className="w-full">
            {t(language, "result.retryButton")}
          </Button>
          {onLogout && (
            <Button variant="outline" onClick={onLogout} className="w-full bg-transparent">
              {t(language, "result.logoutButton")}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  )
}
