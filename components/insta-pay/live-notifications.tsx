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
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [nextId, setNextId] = useState(1)

  const addNotification = useCallback(() => {
    const newNotification: Notification = {
      id: nextId,
      name: generateRandomName(),
      amount: generateRandomAmount(),
      visible: true,
    }

    setNotifications((prev) => [newNotification, ...prev].slice(0, 3))
    setNextId((prev) => prev + 1)

    // Hide notification after 4 seconds
    setTimeout(() => {
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === newNotification.id ? { ...n, visible: false } : n
        )
      )
    }, 4000)

    // Remove notification after animation
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== newNotification.id))
    }, 4500)
  }, [nextId])

  useEffect(() => {
    if (!startAnimations) return

    // First notification after 2 seconds
    const initialTimeout = setTimeout(() => {
      addNotification()
    }, 2000)

    // Then every 5-8 seconds
    const interval = setInterval(() => {
      addNotification()
    }, Math.random() * 3000 + 5000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [startAnimations, addNotification])

  if (!startAnimations || notifications.length === 0) return null

  return (
    <div className="fixed top-20 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-4 pointer-events-none">
      <div className="flex flex-col gap-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`transform transition-all duration-500 ease-out ${
              notification.visible
                ? "translate-y-0 opacity-100"
                : "-translate-y-4 opacity-0"
            }`}
          >
            <div className="flex items-center gap-3 rounded-2xl bg-card/95 px-4 py-3 shadow-lg backdrop-blur-sm border border-border">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {notification.name} sacou {formatCurrency(notification.amount)}
                </p>
                <p className="text-xs text-muted-foreground">agora mesmo</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
