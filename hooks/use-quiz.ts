"use client"

import useSWR from "swr"
import { useEffect, useMemo, useState } from "react"
import { fetcher } from "@/lib/swr-fetcher"
import type { Answer, Question, QuizState } from "@/lib/quiz-types"
import { loadState, saveState, clearState } from "@/lib/quiz-storage"

type ApiRes = { results: Question[] }

const DEFAULT_URL = "/api/questions?amount=3&category=27&difficulty=easy&type=boolean"
const DEFAULT_TIME_LIMIT = 60 // detik

export function useQuiz() {
  const resumed = useMemo(() => loadState(), [])
  const shouldFetch = !resumed || resumed.finished || timeLeftFrom(resumed) <= 0
  const { data, error, isLoading } = useSWR<ApiRes>(shouldFetch ? DEFAULT_URL : null, fetcher)

  const [state, setState] = useState<QuizState>(() => {
    if (resumed && !resumed.finished && timeLeftFrom(resumed) > 0) {
      return resumed
    }
    return {
      questions: [],
      currentIndex: 0,
      answers: [],
      startedAt: Date.now(),
      timeLimit: DEFAULT_TIME_LIMIT,
      finished: false,
    }
  })

  // Inisialisasi setelah fetch
  useEffect(() => {
    if (data?.results && shouldFetch) {
      const next: QuizState = {
        questions: data.results,
        currentIndex: 0,
        answers: [],
        startedAt: Date.now(),
        timeLimit: DEFAULT_TIME_LIMIT,
        finished: false,
      }
      setState(next)
      saveState(next)
    }
  }, [data, shouldFetch])

  // Timer
  const [remaining, setRemaining] = useState<number>(() => timeLeftFrom(state))
  useEffect(() => {
    setRemaining(timeLeftFrom(state))
  }, [state])

  useEffect(() => {
    if (state.finished) return
    const id = setInterval(() => {
      const left = timeLeftFrom(state)
      setRemaining(left)
      if (left <= 0) {
        clearInterval(id)
        finishQuiz()
      }
    }, 1000)
    return () => clearInterval(id)
  }, [state])

  function answerCurrent(selected: "True" | "False") {
    if (state.finished) return
    const q = state.questions[state.currentIndex]
    if (!q) return
    const ans: Answer = {
      questionId: q.id,
      selected,
      isCorrect: String(selected) === String(q.correctAnswer),
    }
    const nextAnswers = [...state.answers, ans]
    const isLast = state.currentIndex >= state.questions.length - 1
    const nextState: QuizState = {
      ...state,
      answers: nextAnswers,
      currentIndex: Math.min(state.currentIndex + 1, state.questions.length - 1),
      finished: isLast ? true : false,
    }
    setState(nextState)
    saveState(nextState)
    if (isLast) {
      // selesai langsung
      finishQuiz(nextState)
    }
  }

  function finishQuiz(s?: QuizState) {
    const next: QuizState = { ...(s ?? state), finished: true }
    setState(next)
    saveState(next)
  }

  function resetQuiz() {
    clearState()
    // trigger fetch baru
    window.location.reload()
  }

  const summary = useMemo(() => {
    const total = state.questions.length
    const answered = state.answers.length
    const correct = state.answers.filter((a) => a.isCorrect).length
    const wrong = answered - correct
    return { total, answered, correct, wrong }
  }, [state.answers, state.questions.length])

  return {
    isLoading: isLoading && state.questions.length === 0,
    error,
    state,
    remaining,
    summary,
    answerCurrent,
    finishQuiz,
    resetQuiz,
  }
}

function timeLeftFrom(s: QuizState) {
  const elapsed = Math.floor((Date.now() - s.startedAt) / 1000)
  return Math.max(0, (s.timeLimit ?? DEFAULT_TIME_LIMIT) - elapsed)
}
