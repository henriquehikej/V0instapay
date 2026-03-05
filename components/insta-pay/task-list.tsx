"use client"

import { CheckCircle2, CalendarCheck, Tv, Users, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

interface Task {
  icon: React.ReactNode
  title: string
  description: string
}

const tasks: Task[] = [
  {
    icon: <CalendarCheck className="h-5 w-5" />,
    title: "Check-in Diario",
    description: "14 dias consecutivos",
  },
  {
    icon: <Tv className="h-5 w-5" />,
    title: "Assistir anuncios direcionados",
    description: "Todos os anuncios concluidos",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Convidar amigos",
    description: "3 amigos convidados",
  },
]

export function TaskList({ startAnimations }: { startAnimations: boolean }) {
  const [completedIndexes, setCompletedIndexes] = useState<number[]>([])

  useEffect(() => {
    if (!startAnimations) return

    const timers = tasks.map((_, index) => {
      const delay = 2000 + index * 1200
      return setTimeout(() => {
        setCompletedIndexes((prev) => [...prev, index])
      }, delay)
    })

    return () => timers.forEach(clearTimeout)
  }, [startAnimations])

  return (
    <section className="mx-5 mt-6">
      <h3 className="text-base font-semibold text-foreground">Tarefas</h3>
      <div className="mt-3 space-y-3">
        {tasks.map((task, index) => {
          const isCompleted = completedIndexes.includes(index)

          return (
            <div
              key={index}
              className="flex items-center gap-4 rounded-2xl bg-card p-4 shadow-sm transition-all active:scale-[0.99]"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-colors duration-500 ${
                  isCompleted
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-primary/10 text-primary"
                }`}
              >
                {task.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">
                  {task.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {task.description}
                </p>
              </div>
              <div
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all duration-500 ${
                  isCompleted ? "bg-emerald-500/10" : "bg-amber-500/10"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 animate-in zoom-in duration-300" />
                ) : (
                  <Loader2 className="h-3.5 w-3.5 text-amber-500 animate-spin" />
                )}
                <span
                  className={`text-xs font-medium transition-colors duration-500 ${
                    isCompleted ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {isCompleted ? "Concluido" : "Pendente"}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
