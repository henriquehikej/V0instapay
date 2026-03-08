"use client"

import { Gift, Trophy, Star, Zap, CheckCircle2 } from "lucide-react"
import { useState, useEffect } from "react"

interface Prize {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  value: number
  displayValue: string
}

const prizes: Prize[] = [
  {
    id: "welcome",
    icon: <Trophy className="h-5 w-5" />,
    title: "Bonus de Boas-vindas",
    description: "Complete o cadastro e ganhe",
    value: 5000,
    displayValue: "R$ 50,00",
  },
  {
    id: "weekly",
    icon: <Star className="h-5 w-5" />,
    title: "Meta Semanal",
    description: "Assista 50 videos em 7 dias",
    value: 12750,
    displayValue: "R$ 127,50",
  },
  {
    id: "referral",
    icon: <Zap className="h-5 w-5" />,
    title: "Indicacao Premium",
    description: "Convide 3 amigos ativos",
    value: 20000,
    displayValue: "R$ 200,00",
  },
  {
    id: "diamond",
    icon: <Gift className="h-5 w-5" />,
    title: "Nivel Diamante",
    description: "Alcance 1000 horas na plataforma",
    value: 50000,
    displayValue: "R$ 500,00",
  },
]

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null
  return null
}

function setCookie(name: string, value: string, days: number = 365) {
  if (typeof document === "undefined") return
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${value}; expires=${expires}; path=/`
}

interface PrizesSectionProps {
  onBalanceUpdate?: (newBalance: number) => void
}

export function PrizesSection({ onBalanceUpdate }: PrizesSectionProps) {
  const [claimedPrizes, setClaimedPrizes] = useState<string[]>([])
  const [isAnimating, setIsAnimating] = useState<string | null>(null)

  useEffect(() => {
    // Load claimed prizes from cookies
    const savedClaimed = getCookie("claimedPrizes")
    if (savedClaimed) {
      setClaimedPrizes(JSON.parse(savedClaimed))
    } else {
      // First 3 prizes are already claimed by default
      const defaultClaimed = ["welcome", "weekly", "referral"]
      setClaimedPrizes(defaultClaimed)
      setCookie("claimedPrizes", JSON.stringify(defaultClaimed))
    }
  }, [])

  const handleClaim = (prize: Prize) => {
    if (claimedPrizes.includes(prize.id) || isAnimating) return

    setIsAnimating(prize.id)

    // Get current balance from cookies
    const currentBalance = parseInt(getCookie("userBalance") || "383472", 10)
    const newBalance = currentBalance + prize.value

    // Update balance in cookies
    setCookie("userBalance", newBalance.toString())

    // Update claimed prizes
    const newClaimed = [...claimedPrizes, prize.id]
    setClaimedPrizes(newClaimed)
    setCookie("claimedPrizes", JSON.stringify(newClaimed))

    // Notify parent of balance update
    if (onBalanceUpdate) {
      onBalanceUpdate(newBalance)
    }

    setTimeout(() => {
      setIsAnimating(null)
    }, 600)
  }

  return (
    <section className="mx-5 mt-6">
      <h3 className="text-base font-semibold text-foreground">
        Premios Disponiveis
      </h3>
      <div className="mt-3 space-y-3">
        {prizes.map((prize) => {
          const isClaimed = claimedPrizes.includes(prize.id)
          const isCurrentlyAnimating = isAnimating === prize.id

          return (
            <div
              key={prize.id}
              className={`flex items-center gap-4 rounded-2xl bg-card p-4 shadow-sm transition-all duration-300 ${
                isCurrentlyAnimating ? "scale-[1.02] shadow-md" : ""
              }`}
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 ${
                  isClaimed
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-primary/10 text-primary"
                }`}
              >
                {isClaimed ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  prize.icon
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">
                  {prize.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {prize.description}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-sm font-bold text-foreground">
                  {prize.displayValue}
                </span>
                {isClaimed ? (
                  <span className="text-[10px] font-medium text-emerald-500">
                    Resgatado
                  </span>
                ) : (
                  <button
                    onClick={() => handleClaim(prize)}
                    disabled={isCurrentlyAnimating}
                    className="rounded-lg bg-gradient-to-r from-[#FE2C55] to-[#E8375A] px-3 py-1 text-[10px] font-semibold text-white transition-all active:scale-95 disabled:opacity-70"
                  >
                    {isCurrentlyAnimating ? "..." : "Resgatar"}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
