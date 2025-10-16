"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Question, Answer } from "@/lib/quiz-types"
import { CheckCircle2, XCircle } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { t } from "@/lib/translations"

export default function QuizReview(props: {
  questions: Question[]
  answers: Answer[]
  onBack: () => void
}) {
  const { questions, answers, onBack } = props
  const { language, mounted } = useLanguage()

  if (!mounted) return null

  // Map answers by questionId untuk lookup cepat
  const answerMap = new Map(answers.map((a) => [a.questionId, a]))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t(language, "review.title")}</h2>
        <Button variant="outline" onClick={onBack}>
          {t(language, "review.backButton")}
        </Button>
      </div>

      <div className="space-y-3">
        {questions.map((q, idx) => {
          const answer = answerMap.get(q.id)
          const isCorrect = answer?.isCorrect ?? false

          return (
            <Card key={q.id} className={isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-base">
                      {t(language, "review.questionLabel", { number: idx + 1 })}
                    </CardTitle>
                    <CardDescription className="mt-2 text-sm text-foreground">{q.question}</CardDescription>
                  </div>
                  {isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <div className="text-xs font-semibold text-muted-foreground">{t(language, "review.yourAnswer")}:</div>
                  <div
                    className={`rounded px-2 py-1 text-sm font-medium ${isCorrect ? "bg-green-100 text-green-900" : "bg-red-100 text-red-900"}`}
                  >
                    {answer?.selected ?? t(language, "review.notAnswered")}
                  </div>
                </div>
                {!isCorrect && (
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground">
                      {t(language, "review.correctAnswer")}:
                    </div>
                    <div className="rounded bg-green-100 px-2 py-1 text-sm font-medium text-green-900">
                      {q.correctAnswer}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
