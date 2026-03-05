"use client"

import { Gift, Trophy, Star, Zap } from "lucide-react"

interface Prize {
  icon: React.ReactNode
  title: string
  description: string
  value: string
  claimed: boolean
}

const prizes: Prize[] = [
  {
    icon: <Trophy className="h-5 w-5" />,
    title: "Bonus de Boas-vindas",
    description: "Complete o cadastro e ganhe",
    value: "R$ 50,00",
    claimed: true,
  },
  {
    icon: <Star className="h-5 w-5" />,
    title: "Meta Semanal",
    description: "Assista 50 videos em 7 dias",
    value: "R$ 127,50",
    claimed: true,
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Indicacao Premium",
    description: "Convide 3 amigos ativos",
    value: "R$ 200,00",
    claimed: true,
  },
  {
    icon: <Gift className="h-5 w-5" />,
    title: "Nivel Diamante",
    description: "Alcance 1000 horas na plataforma",
    value: "R$ 500,00",
    claimed: false,
  },
]

export function PrizesSection() {
  return (
    <section className="mx-5 mt-6">
      <h3 className="text-base font-semibold text-foreground">
        Premios Disponiveis
      </h3>
      <div className="mt-3 space-y-3">
        {prizes.map((prize, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-2xl bg-card p-4 shadow-sm"
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                prize.claimed
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {prize.icon}
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
                {prize.value}
              </span>
              {prize.claimed ? (
                <span className="text-[10px] font-medium text-emerald-500">
                  Resgatado
                </span>
              ) : (
                <button className="rounded-lg bg-gradient-to-r from-[#FE2C55] to-[#E8375A] px-3 py-1 text-[10px] font-semibold text-white transition-all active:scale-95">
                  Resgatar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
