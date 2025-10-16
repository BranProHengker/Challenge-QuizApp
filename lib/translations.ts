export type Language = "en" | "id"

export const translations = {
  en: {
    // Login
    login: {
      title: "Sign In",
      description: "Enter your name to start the quiz",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      submitButton: "Start",
    },
    // Header
    header: {
      greeting: "Hello",
      questionOf: "Question {current} of {total}",
      answered: "Answered",
      timeRemaining: "Time Left",
      exitButton: "Exit",
      logoutButton: "Logout",
    },
    // Question
    question: {
      true: "True",
      false: "False",
    },
    // Result
    result: {
      title: "Quiz Results",
      greeting: "Great job, {name}!",
      totalQuestions: "Total Questions",
      answered: "Answered",
      correct: "Correct",
      wrong: "Wrong",
      reviewButton: "View Review",
      retryButton: "Try Again",
      logoutButton: "Logout",
    },
    // Review
    review: {
      title: "Question Review",
      backButton: "Back",
      questionLabel: "Question {number}",
      yourAnswer: "Your Answer",
      correctAnswer: "Correct Answer",
      notAnswered: "Not answered",
    },
  },
  id: {
    // Login
    login: {
      title: "Masuk",
      description: "Masukkan nama untuk memulai kuis",
      nameLabel: "Nama",
      namePlaceholder: "Nama kamu",
      submitButton: "Mulai",
    },
    // Header
    header: {
      greeting: "Halo",
      questionOf: "Soal {current} dari {total}",
      answered: "Terjawab",
      timeRemaining: "Sisa Waktu",
      exitButton: "Keluar",
      logoutButton: "Logout",
    },
    // Question
    question: {
      true: "Benar",
      false: "Salah",
    },
    // Result
    result: {
      title: "Hasil Kuis",
      greeting: "Bagus kerjaanmu, {name}!",
      totalQuestions: "Total Soal",
      answered: "Terjawab",
      correct: "Benar",
      wrong: "Salah",
      reviewButton: "Lihat Review Soal",
      retryButton: "Coba Lagi",
      logoutButton: "Logout",
    },
    // Review
    review: {
      title: "Review Soal",
      backButton: "Kembali",
      questionLabel: "Soal {number}",
      yourAnswer: "Jawaban Kamu",
      correctAnswer: "Jawaban Benar",
      notAnswered: "Tidak dijawab",
    },
  },
}

export function t(lang: Language, path: string, replacements?: Record<string, string | number>): string {
  const keys = path.split(".")
  let value: any = translations[lang]

  for (const key of keys) {
    value = value?.[key]
  }

  if (typeof value !== "string") return path

  if (replacements) {
    return Object.entries(replacements).reduce((str, [key, val]) => {
      return str.replace(`{${key}}`, String(val))
    }, value)
  }

  return value
}
