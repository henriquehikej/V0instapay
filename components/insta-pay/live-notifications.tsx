"use client"

import { useState, useEffect, useCallback } from "react"
import { CheckCircle2 } from "lucide-react"

const FIRST_NAMES = [
  "Ana", "Maria", "Juliana", "Fernanda", "Camila", "Larissa", "Beatriz", "Gabriela",
  "Lucas", "Pedro", "João", "Matheus", "Rafael", "Bruno", "Carlos", "Felipe",
  "Mariana", "Patricia", "Amanda", "Bruna", "Leticia", "Vanessa", "Thiago", "Diego",
  "Renata", "Aline", "Cristina", "Daniela", "Eduardo", "Gustavo", "Leonardo", "Rodrigo",
  "Sandra", "Tatiane", "Viviane", "Anderson", "Marcelo", "Ricardo", "Fabio", "Leandro"
]

const LAST_NAMES = [
  "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Pereira",
  "Lima", "Gomes", "Costa", "Ribeiro", "Martins", "Carvalho", "Almeida", "Lopes",
  "Soares", "Fernandes", "Vieira", "Barbosa", "Rocha", "Dias", "Nascimento", "Andrade",
  "Moreira", "Nunes", "Marques", "Machado", "Mendes", "Freitas", "Cardoso", "Ramos"
]

interface Notification {
  id: number
  name: string
  amount: number
  visible: boolean
}

function generateRandomName(): string {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]
  const lastInitial = lastName.charAt(0)
  return `${firstName} ${lastInitial}.`
}

function generateRandomAmount(): number {
  return Math.floor(Math.random() * (8273 - 787 + 1)) + 787
}

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}

export function LiveNotifications({ startAnimations }: { startAnimations: boolean }) {
  const [notification, setNotification] = useState<Notification | null>(null)

  const addNotification = useCallback(() => {
    const newNotification: Notification = {
      id: Date.now(),
      name: generateRandomName(),
      amount: generateRandomAmount(),
      visible: true,
    }

    setNotification(newNotification)

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification((prev) =>
        prev && prev.id === newNotification.id ? { ...prev, visible: false } : prev
      )
    }, 3000)

    // Remove notification after animation
    setTimeout(() => {
      setNotification((prev) =>
        prev && prev.id === newNotification.id ? null : prev
      )
    }, 3400)
  }, [])

  useEffect(() => {
    if (!startAnimations) return

    // First notification after 2 seconds
    const initialTimeout = setTimeout(() => {
      addNotification()
    }, 2000)

    // Then every 4-5 seconds
    const interval = setInterval(() => {
      addNotification()
    }, Math.random() * 1000 + 4000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [startAnimations, addNotification])

  if (!startAnimations || !notification) return null

  return (
    <div className="fixed bottom-20 left-3 z-50 pointer-events-none">
      <div
        className={`transform transition-all duration-400 ease-out ${
          notification.visible
            ? "translate-x-0 opacity-100"
            : "-translate-x-4 opacity-0"
        }`}
      >
        <div className="flex items-center gap-2 rounded-xl bg-card/95 px-3 py-2 shadow-md backdrop-blur-sm border border-border">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">
              {notification.name} sacou {formatCurrency(notification.amount)}
            </p>
            <p className="text-[10px] text-muted-foreground">agora mesmo</p>
          </div>
        </div>
      </div>
    </div>
  )
}
