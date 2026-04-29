"use client"

import { useState } from "react"
import {
  X,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Info,
} from "lucide-react"
import { WithdrawalConfirmation } from "./withdrawal-confirmation"

interface WithdrawalModalProps {
  isOpen: boolean
  onClose: () => void
  balance: number
}

const pixKeyTypes = ["CPF", "E-mail", "Telefone", "Chave aleatoria"]

function formatCurrency(cents: number): string {
  const reais = cents / 100
  return reais.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function WithdrawalModal({ isOpen, onClose, balance }: WithdrawalModalProps) {
  const [fullName, setFullName] = useState("")
  const [pixKey, setPixKey] = useState("")
  const [selectedType, setSelectedType] = useState("CPF")
  const [showTypeDropdown, setShowTypeDropdown] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  if (!isOpen) return null

  const handleSubmit = () => {
    setShowConfirmation(true)
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 backdrop-blur-sm">
      <div
        className="w-full max-w-md animate-in slide-in-from-bottom-10 duration-300 rounded-t-3xl bg-card px-5 pb-8 pt-4"
        role="dialog"
        aria-modal="true"
        aria-label="Saque via PIX"
      >
        {/* Handle bar */}
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Saque via PIX</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-all active:scale-95"
            aria-label="Fechar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Balance */}
        <div className="mt-5 rounded-2xl bg-secondary p-4">
          <p className="text-xs font-medium text-muted-foreground">
            Saldo disponivel
          </p>
          <p className="mt-1 text-2xl font-bold text-foreground">
            R$ {formatCurrency(balance)}
          </p>
        </div>

        {/* Verification */}
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">
              Verificacao de Identidade
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Taxa de verificacao reembolsavel de R$ 9,34 necessaria para validacao.
              {/* EDITAR AQUI: altere o valor acima para mudar a taxa exibida neste aviso */}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Info className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
        </div>

        {/* PIX Key Type */}
        <div className="mt-4">
          <label className="text-xs font-medium text-muted-foreground">
            Tipo de chave PIX
          </label>
          <div className="relative mt-1.5">
            <button
              onClick={() => setShowTypeDropdown(!showTypeDropdown)}
              className="flex w-full items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-all active:scale-[0.99]"
            >
              {selectedType}
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform ${showTypeDropdown ? "rotate-180" : ""
                  }`}
              />
            </button>
            {showTypeDropdown && (
              <div className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                {pixKeyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedType(type)
                      setShowTypeDropdown(false)
                    }}
                    className={`flex w-full px-4 py-2.5 text-left text-sm transition-colors ${selectedType === type
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-foreground hover:bg-secondary"
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Full Name */}
        <div className="mt-4">
          <label className="text-xs font-medium text-muted-foreground">
            Nome completo
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Seu nome completo"
            className="mt-1.5 w-full rounded-xl border border-border bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* PIX Key */}
        <div className="mt-4">
          <label className="text-xs font-medium text-muted-foreground">
            Chave PIX
          </label>
          <input
            type="text"
            value={pixKey}
            onChange={(e) => setPixKey(e.target.value)}
            placeholder={
              selectedType === "CPF"
                ? "000.000.000-00"
                : selectedType === "E-mail"
                  ? "seu@email.com"
                  : selectedType === "Telefone"
                    ? "(00) 00000-0000"
                    : "Chave aleatoria"
            }
            className="mt-1.5 w-full rounded-xl border border-border bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!fullName.trim() || !pixKey.trim()}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FE2C55] to-[#E8375A] py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          Solicitar Saque
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Withdrawal Confirmation Screen */}
      <WithdrawalConfirmation
        isOpen={showConfirmation}
        onClose={handleCloseConfirmation}
        balance={balance}
        userName={fullName}
        pixKeyType={selectedType}
        pixKey={pixKey}
      />
    </div>
  )
}
