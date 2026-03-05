"use client"

import { CheckCircle2, CalendarCheck, Tv, Users } from "lucide-react"

interface Task {
  icon: React.ReactNode
  title: string
  description: string
  completed: boolean
}

const tasks: Task[] = [
  {
    icon: <CalendarCheck className="h-5 w-5" />,
    title: "Check-in Diario",
    description: "14 dias consecutivos",
    completed: true,
  },
  {
    icon: <Tv className="h-5 w-5" />,
    title: "Assistir anuncios direcionados",
    description: "Todos os anuncios concluidos",
    completed: true,
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Convidar amigos",
    description: "3 amigos convidados",
    completed: true,
  },
]

export function TaskList() {
  return (
    <section className="mx-5 mt-6">
      <h3 className="text-base font-semibold text-foreground">Tarefas</h3>
      <div className="mt-3 space-y-3">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-2xl bg-card p-4 shadow-sm transition-all active:scale-[0.99]"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
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
            <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-xs font-medium text-muted-foreground">
                Concluido
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
