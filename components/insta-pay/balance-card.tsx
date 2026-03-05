"use client"

import { ArrowDownToLine, TrendingUp } from "lucide-react"
import { useEffect, useState, useRef } from "react"

function useCountUp(target: number, duration: number, shouldStart: boolean, startDelay: number = 300) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!shouldStart) return

    const timeout = setTimeout(() => {
      const startTime = performance.now()

      const animate = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.floor(eased * target))

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate)
        } else {
          setValue(target)
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }, startDelay)

    return () => {
      clearTimeout(timeout)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration, shouldStart, startDelay])

  return value
}

function formatBRL(cents: number): string {
  const reais = Math.floor(cents / 100)
  const centavos = cents % 100
  return `R$ ${reais.toLocaleString("pt-BR")},${centavos.toString().padStart(2, "0")}`
}

export function BalanceCard({
  onWithdraw,
  startAnimations,
}: {
  onWithdraw: () => void
  startAnimations: boolean
}) {
  const animatedBalance = useCountUp(383472, 2500, startAnimations, 400)
  const animatedWeekly = useCountUp(12750, 1800, startAnimations, 1200)

  return (
    <div className="mx-5 overflow-hidden rounded-2xl bg-gradient-to-br from-[#FE2C55] via-[#E8375A] to-[#C93A6B] p-5 shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-white/80">Saldo disponivel</p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight text-white tabular-nums">
            {formatBRL(animatedBalance)}
          </h2>
          <div className="mt-2 flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-white/90" />
            <span className="text-xs font-medium text-white/90 tabular-nums">
              +{formatBRL(animatedWeekly)} esta semana
            </span>
          </div>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
          <span className="text-xl font-bold text-white">R$</span>
        </div>
      </div>

      <button
        onClick={onWithdraw}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-sm font-semibold text-[#FE2C55] shadow-sm transition-all active:scale-[0.97] active:opacity-90"
      >
        <ArrowDownToLine className="h-4 w-4" />
        Sacar Agora
      </button>
    </div>
  )
}
