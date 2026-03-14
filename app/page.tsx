"use client"

import { useState, useCallback, useEffect } from "react"
import { Header } from "@/components/insta-pay/header"
import { BalanceCard } from "@/components/insta-pay/balance-card"
import { ProgressSection } from "@/components/insta-pay/progress-section"
import { TaskList } from "@/components/insta-pay/task-list"
import { WithdrawalModal } from "@/components/insta-pay/withdrawal-modal"
import { LoadingScreen } from "@/components/insta-pay/loading-screen"
import { ActivitySection } from "@/components/insta-pay/activity-section"
import { PrizesSection } from "@/components/insta-pay/prizes-section"
import { LiveNotifications } from "@/components/insta-pay/live-notifications"
import { CongratulationsModal } from "@/components/insta-pay/congratulations-modal"
import { Home, BarChart3, Gift } from "lucide-react"

type TabKey = "inicio" | "atividade" | "premios"

const navItems: { icon: typeof Home; label: string; key: TabKey }[] = [
  { icon: Home, label: "Inicio", key: "inicio" },
  { icon: BarChart3, label: "Atividade", key: "atividade" },
  { icon: Gift, label: "Premios", key: "premios" },
]

export default function MonetizaInstaPage() {
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false)
  const [isCongratulationsOpen, setIsCongratulationsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [startAnimations, setStartAnimations] = useState(false)
  const [activeTab, setActiveTab] = useState<TabKey>("inicio")
  const [currentBalance, setCurrentBalance] = useState<number>(383472)

  // Load balance from cookies on mount
  useEffect(() => {
    const getCookie = (name: string): string | null => {
      if (typeof document === "undefined") return null
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) return parts.pop()?.split(";").shift() || null
      return null
    }
    
    const savedBalance = getCookie("userBalance")
    if (savedBalance) {
      setCurrentBalance(parseInt(savedBalance, 10))
    }
  }, [])

  const handleLoadingFinish = useCallback(() => {
    setIsLoading(false)
    setTimeout(() => {
      setStartAnimations(true)
    }, 500)
  }, [])

  const handleBalanceUpdate = useCallback((newBalance: number) => {
    setCurrentBalance(newBalance)
  }, [])

  return (
    <>
      {isLoading && <LoadingScreen onFinish={handleLoadingFinish} />}

      <LiveNotifications startAnimations={startAnimations} />

      <div
        className={`mx-auto flex min-h-dvh max-w-md flex-col bg-background transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Header onBellClick={() => setIsCongratulationsOpen(true)} />

        <main className="flex-1 overflow-y-auto pb-24">
          {activeTab === "inicio" && (
            <>
              <BalanceCard
                onWithdraw={() => setIsWithdrawalOpen(true)}
                startAnimations={startAnimations}
                balance={currentBalance}
              />
              <ProgressSection startAnimations={startAnimations} />
              <TaskList startAnimations={startAnimations} />
              <div className="h-6" />
            </>
          )}

          {activeTab === "atividade" && (
            <>
              <BalanceCard
                onWithdraw={() => setIsWithdrawalOpen(true)}
                startAnimations={startAnimations}
                balance={currentBalance}
              />
              <ActivitySection />
              <div className="h-6" />
            </>
          )}

          {activeTab === "premios" && (
            <>
              <BalanceCard
                onWithdraw={() => setIsWithdrawalOpen(true)}
                startAnimations={startAnimations}
                balance={currentBalance}
              />
              <PrizesSection onBalanceUpdate={handleBalanceUpdate} />
              <div className="h-6" />
            </>
          )}
        </main>

        {/* Bottom Navigation */}
        <nav
          className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-border bg-card/95 backdrop-blur-md"
          aria-label="Navegacao principal"
        >
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.key
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`flex flex-col items-center gap-0.5 px-6 py-1.5 transition-all active:scale-95 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                  {isActive && (
                    <span className="mt-0.5 h-1 w-1 rounded-full bg-primary" />
                  )}
                </button>
              )
            })}
          </div>
        </nav>

        <WithdrawalModal
          isOpen={isWithdrawalOpen}
          onClose={() => setIsWithdrawalOpen(false)}
          balance={currentBalance}
        />

        <CongratulationsModal
          isOpen={isCongratulationsOpen}
          onClose={() => setIsCongratulationsOpen(false)}
        />
      </div>
    </>
  )
}
