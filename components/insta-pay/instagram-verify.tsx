"use client"

import { useState } from "react"
import { Instagram, Search, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface InstagramProfile {
  username: string
  full_name: string
  followers: number
  profile_pic: string
}

interface InstagramVerifyProps {
  onVerified: (profile: InstagramProfile) => void
}

function formatBalance(): number {
  // Saldo fixo: R$ 3.834,72
  return 383472
}

function formatCurrency(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function InstagramVerify({ onVerified }: InstagramVerifyProps) {
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [profile, setProfile] = useState<InstagramProfile | null>(null)
  const [balance, setBalance] = useState<number>(0)
  const [step, setStep] = useState<"input" | "confirm">("input")

  const handleSearch = async () => {
    const clean = username.replace("@", "").trim()
    if (!clean) return

    setLoading(true)
    setError("")
    setProfile(null)

    try {
      const res = await fetch(`/api/instagram?username=${encodeURIComponent(clean)}`)
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Usuário não encontrado. Verifique o nome e tente novamente.")
        return
      }

      const calculatedBalance = formatBalance()
      setBalance(calculatedBalance)
      setProfile(data)
      setStep("confirm")
    } catch {
      setError("Erro de conexão. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm = () => {
    if (profile) {
      onVerified(profile)
    }
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-6">
      {/* Logo */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FE2C55] to-[#8B1F8A]">
          <Instagram className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">InstaPay</h1>
        <p className="text-center text-sm text-muted-foreground">
          Verifique sua conta do Instagram para acessar seu saldo disponível
        </p>
      </div>

      {step === "input" && (
        <div className="w-full max-w-sm space-y-4">
          <div className="space-y-2">
            <label htmlFor="instagram-user" className="text-sm font-medium text-foreground">
              Seu usuário do Instagram
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">@</span>
              <input
                id="instagram-user"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value.replace("@", ""))
                  setError("")
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="seuperfil"
                className="w-full rounded-xl border border-border bg-card py-3.5 pl-8 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-3">
              <AlertCircle className="h-4 w-4 flex-shrink-0 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <button
            onClick={handleSearch}
            disabled={!username.trim() || loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FE2C55] to-[#8B1F8A] py-4 text-sm font-semibold text-white transition-all active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            {loading ? "Verificando..." : "Verificar conta"}
          </button>
        </div>
      )}

      {step === "confirm" && profile && (
        <div className="w-full max-w-sm space-y-4">
          {/* Profile card */}
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <img
                src={`/api/proxy-image?url=${encodeURIComponent(profile.profile_pic)}`}
                alt={profile.username}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/30"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${profile.username}&background=FE2C55&color=fff&size=56`
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">@{profile.username}</p>
                {profile.full_name && (
                  <p className="text-sm text-muted-foreground truncate">{profile.full_name}</p>
                )}
                <p className="text-xs text-muted-foreground mt-0.5">
                  {profile.followers.toLocaleString("pt-BR")} seguidores
                </p>
              </div>
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-[#22c55e]" />
            </div>
          </div>

          {/* Saldo disponível */}
          <div className="rounded-2xl bg-gradient-to-r from-[#FE2C55] via-[#D4356A] to-[#8B1F8A] p-4 text-white">
            <p className="text-xs font-medium opacity-80">Saldo disponível</p>
            <p className="mt-1 text-3xl font-bold tracking-tight">
              R$ {formatCurrency(balance)}
            </p>
            <p className="mt-1 text-xs opacity-70">Aguardando confirmação para saque</p>
          </div>

          <button
            onClick={handleConfirm}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FE2C55] to-[#8B1F8A] py-4 text-sm font-semibold text-white transition-all active:scale-[0.97]"
          >
            Confirmar e acessar minha conta
          </button>

          <button
            onClick={() => { setStep("input"); setProfile(null); setError("") }}
            className="w-full text-center text-sm text-muted-foreground underline underline-offset-2"
          >
            Usar outro usuário
          </button>
        </div>
      )}
    </div>
  )
}
