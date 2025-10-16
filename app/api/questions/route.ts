import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  // defaults dari prompt user
  const amount = searchParams.get("amount") ?? "3"
  const category = searchParams.get("category") ?? "27"
  const difficulty = searchParams.get("difficulty") ?? "easy"
  const type = searchParams.get("type") ?? "boolean"

  const apiUrl = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}&encode=url3986`

  const res = await fetch(apiUrl, { cache: "no-store" })
  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 })
  }
  const data = await res.json()

  const results = (data?.results ?? []).map((q: any, idx: number) => ({
    id: `${Date.now()}-${idx}`,
    category: decodeURIComponent(q.category),
    difficulty: decodeURIComponent(q.difficulty),
    type: decodeURIComponent(q.type),
    question: decodeURIComponent(q.question),
    correctAnswer: decodeURIComponent(q.correct_answer), // "True" | "False"
  }))

  return NextResponse.json({ results })
}
