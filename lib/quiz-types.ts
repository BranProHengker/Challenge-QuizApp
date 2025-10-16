export type Question = {
  id: string
  question: string
  correctAnswer: "True" | "False" | string
}

export type Answer = {
  questionId: string
  selected: "True" | "False"
  isCorrect: boolean
}

export type QuizState = {
  questions: Question[]
  currentIndex: number
  answers: Answer[]
  startedAt: number // epoch ms
  timeLimit: number // seconds
  finished: boolean
}
