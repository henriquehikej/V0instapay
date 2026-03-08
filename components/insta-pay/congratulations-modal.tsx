"use client"

import { X, PartyPopper, CheckCircle2, Star, Gift, TrendingUp } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface CongratulationsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CongratulationsModal({ isOpen, onClose }: CongratulationsModalProps) {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowContent(true), 100)
    } else {
      setShowContent(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-sm overflow-hidden rounded-3xl bg-card shadow-2xl transition-all duration-300 ${
          showContent ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Confetti Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-2xl" />
          <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-accent/20 to-transparent blur-2xl" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-muted/80 text-muted-foreground transition-all active:scale-95"
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative p-6 pt-8">
          {/* Header with Icon */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#E8375A] shadow-lg">
                <PartyPopper className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 shadow-md">
                <CheckCircle2 className="h-4 w-4 text-white" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-foreground">
              Parabens! Voce foi Contemplado!
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sua conta foi selecionada para o Programa de Monetizacao Exclusivo
            </p>
          </div>

          {/* Benefits */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 rounded-xl bg-emerald-500/10 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Conta Verificada</p>
                <p className="text-xs text-muted-foreground">Elegivel para saques ilimitados</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-primary/10 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Nivel Premium</p>
                <p className="text-xs text-muted-foreground">Acesso a premios exclusivos</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-accent/10 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Bonus Ativo</p>
                <p className="text-xs text-muted-foreground">+15% em todos os ganhos</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={onClose}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FE2C55] to-[#E8375A] py-3.5 text-sm font-semibold text-white shadow-lg transition-all active:scale-[0.97]"
          >
            <Gift className="h-4 w-4" />
            Aproveitar Beneficios
          </button>

          <p className="mt-4 text-center text-[10px] text-muted-foreground">
            Programa valido por tempo limitado. Resgate seus premios agora!
          </p>
        </div>
      </div>
    </div>
  )
}
