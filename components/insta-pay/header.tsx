"use client"

import { Bell, Wallet } from "lucide-react"
import Image from "next/image"

interface HeaderProps {
  onBellClick?: () => void
}

export function Header({ onBellClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 py-4">
      <div className="flex items-center gap-2.5">
        <div className="relative h-9 w-9 overflow-hidden rounded-xl">
          <Image
            src="/images/instapay-logo.png"
            alt="META INSTA logo"
            fill
            className="object-contain"
          />
        </div>
        <span className="text-lg font-bold tracking-tight text-foreground">
          META INSTA
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onBellClick}
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-card text-muted-foreground shadow-sm transition-all active:scale-95"
          aria-label="Notificacoes"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary animate-pulse" />
        </button>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-muted-foreground shadow-sm transition-all active:scale-95"
          aria-label="Carteira"
        >
          <Wallet className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
