"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getUser } from "@/lib/quiz-storage"

export default function Home() {
  const name = getUser()
  return (
    <main className="min-h-dvh flex items-center justify-center p-6">
      <div className="grid gap-4 text-center">
        <h1 className="text-2xl font-semibold text-balance">Challenge: Aplikasi Kuis</h1>
        <p className="text-muted-foreground">Masuk dulu, lalu kerjakan kuis 3 soal dari OpenTDB.</p>
        <div className="flex justify-center gap-3">
          {name ? (
            <Button asChild>
              <Link href="/quiz">Lanjut ke Kuis</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/login">Mulai</Link>
            </Button>
          )}
        </div>
      </div>
    </main>
  )
}
