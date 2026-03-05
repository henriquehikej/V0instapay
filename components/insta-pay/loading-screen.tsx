"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ShieldCheck } from "lucide-react"

interface LoadingScreenProps {
  onFinish: () => void
}

export function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState("Verificando sua conta...")

  useEffect(() => {
    const steps = [
      { at: 20, text: "Conectando ao servidor..." },
      { at: 45, text: "Validando dados..." },
      { at: 70, text: "Carregando recompensas..." },
      { at: 90, text: "Quase pronto..." },
      { at: 100, text: "Tudo certo!" },
    ]

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2
        const step = steps.find((s) => s.at <= next && s.at > prev)
        if (step) setStatusText(step.text)
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(onFinish, 400)
          return 100
        }
        return next
      })
    }, 50)

    return () => clearInterval(interval)
  }, [onFinish])

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-foreground">
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-20 w-20 overflow-hidden rounded-2xl">
          <Image
            src="/images/instapay-logo.png"
            alt="MONETIZA INSTA"
            fill
            className="object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-background">
          MONETIZA INSTA
        </h1>

        <div className="flex items-center gap-2 text-background/70">
          <ShieldCheck className="h-4 w-4" />
          <span className="text-sm font-medium">{statusText}</span>
        </div>

        <div className="mt-2 h-1.5 w-56 overflow-hidden rounded-full bg-background/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-xs font-medium text-background/40">
          {progress}%
        </span>
      </div>
    </div>
  )
}
