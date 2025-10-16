"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { setUser } from "@/lib/quiz-storage"
import { useLanguage } from "@/hooks/use-language"
import { t } from "@/lib/translations"
import { LanguageSwitcher } from "./language-switcher"

export default function LoginForm() {
  const [name, setName] = useState("")
  const router = useRouter()
  const { language, mounted } = useLanguage()

  if (!mounted) return null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setUser(name.trim())
    router.push("/quiz")
  }

  return (
    <main className="min-h-dvh flex items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-pretty">{t(language, "login.title")}</CardTitle>
            <CardDescription>{t(language, "login.description")}</CardDescription>
          </div>
          <LanguageSwitcher />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm">{t(language, "login.nameLabel")}</span>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t(language, "login.namePlaceholder")}
                aria-label={t(language, "login.nameLabel")}
              />
            </label>
            <Button type="submit" className="w-full">
              {t(language, "login.submitButton")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
