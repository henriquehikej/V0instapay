"use client"

import { ArrowDownToLine, TrendingUp } from "lucide-react"
import { useState } from "react"

export function BalanceCard({ onWithdraw }: { onWithdraw: () => void }) {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <div className="mx-5 overflow-hidden rounded-2xl bg-gradient-to-br from-[#FE2C55] via-[#E8375A] to-[#C93A6B] p-5 shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-white/80">Saldo disponivel</p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight text-white">
            R$ 3.834,72
          </h2>
          <div className="mt-2 flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-white/90" />
            <span className="text-xs font-medium text-white/90">
              +R$ 127,50 esta semana
            </span>
          </div>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
          <span className="text-xl font-bold text-white">R$</span>
        </div>
      </div>

      <button
        onClick={onWithdraw}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-sm font-semibold text-[#FE2C55] shadow-sm transition-all ${
          isPressed ? "scale-[0.97] opacity-90" : "active:scale-[0.97]"
        }`}
      >
        <ArrowDownToLine className="h-4 w-4" />
        Sacar Agora
      </button>
    </div>
  )
}
