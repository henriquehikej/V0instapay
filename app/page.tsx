"use client"

import { useState } from "react"
import { Header } from "@/components/insta-pay/header"
import { BalanceCard } from "@/components/insta-pay/balance-card"
import { ProgressSection } from "@/components/insta-pay/progress-section"
import { TaskList } from "@/components/insta-pay/task-list"
import { WithdrawalModal } from "@/components/insta-pay/withdrawal-modal"
import { Home, BarChart3, Gift, User } from "lucide-react"

const navItems = [
  { icon: Home, label: "Inicio", active: true },
  { icon: BarChart3, label: "Atividade", active: false },
  { icon: Gift, label: "Premios", active: false },
  { icon: User, label: "Perfil", active: false },
]

export default function InstaPayPage() {
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false)

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-background">
      <Header />

      <main className="flex-1 overflow-y-auto pb-24">
        <BalanceCard onWithdraw={() => setIsWithdrawalOpen(true)} />
        <ProgressSection />
        <TaskList />
        <div className="h-6" />
      </main>

      {/* Bottom Navigation */}
      <nav
        className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-border bg-card/95 backdrop-blur-md"
        aria-label="Navegacao principal"
      >
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 transition-all active:scale-95 ${
                item.active
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
              aria-label={item.label}
              aria-current={item.active ? "page" : undefined}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <WithdrawalModal
        isOpen={isWithdrawalOpen}
        onClose={() => setIsWithdrawalOpen(false)}
      />
    </div>
  )
}
