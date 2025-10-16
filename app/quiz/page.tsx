"use client"

import { useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getUser, clearUser, clearState } from "@/lib/quiz-storage"
import { useQuiz } from "@/hooks/use-quiz"
import { QuizHeader } from "@/components/quiz-header"
import QuizQuestion from "@/components/quiz-question"
import QuizResult from "@/components/quiz-result"

export default function QuizPage() {
  const router = useRouter()
  const name = useMemo(() => getUser(), [])
  const { isLoading, error, state, remaining, summary, answerCurrent, resetQuiz, finishQuiz } = useQuiz()

  useEffect(() => {
    if (!name) router.replace("/login")
  }, [name, router])

  if (!name) return null

  function handleExit() {
    finishQuiz()
  }

  function handleLogout() {
    clearUser()
    clearState()
    router.replace("/login")
  }

  return (
    <main className="min-h-dvh max-w-2xl mx-auto p-6 grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-pretty">Kuis OpenTDB</CardTitle>
        </CardHeader>
        <CardContent>
          <QuizHeader
            name={name}
            current={state.currentIndex}
            total={state.questions.length || 3}
            answered={summary.answered}
            remaining={remaining}
            className="mb-4"
            onExit={handleExit}
            onLogout={handleLogout}
          />

          {error && <p className="text-destructive">Gagal memuat soal.</p>}

          {isLoading && state.questions.length === 0 ? (
            <p>Memuat soal...</p>
          ) : state.finished || remaining <= 0 ? (
            <QuizResult
              name={name}
              correct={summary.correct}
              wrong={summary.wrong}
              answered={summary.answered}
              total={summary.total}
              questions={state.questions}
              answers={state.answers}
              onRetry={resetQuiz}
              onLogout={handleLogout}
            />
          ) : (
            <QuizQuestion
              question={state.questions[state.currentIndex]?.question ?? "—"}
              onAnswer={(v) => answerCurrent(v)}
            />
          )}

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" onClick={() => resetQuiz()}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
