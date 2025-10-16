"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/hooks/use-language"
import { t } from "@/lib/translations"

export default function QuizQuestion(props: {
  question: string
  onAnswer: (v: "True" | "False") => void
}) {
  const { question, onAnswer } = props
  const { language, mounted } = useLanguage()

  if (!mounted) return null

  return (
    <Card>
      <CardContent className="p-6 grid gap-6">
        <p className="text-lg text-pretty">{question}</p>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="default" onClick={() => onAnswer("True")}>
            {t(language, "question.true")}
          </Button>
          <Button variant="secondary" onClick={() => onAnswer("False")}>
            {t(language, "question.false")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
