"use client"

import { Play, Clock, Heart } from "lucide-react"

interface ProgressItem {
  icon: React.ReactNode
  label: string
  current: number
  total: number
}

const progressData: ProgressItem[] = [
  {
    icon: <Play className="h-4 w-4 text-primary" />,
    label: "Videos assistidos",
    current: 50,
    total: 50,
  },
  {
    icon: <Clock className="h-4 w-4 text-primary" />,
    label: "Tempo na plataforma",
    current: 1000,
    total: 1000,
  },
  {
    icon: <Heart className="h-4 w-4 text-primary" />,
    label: "Videos curtidos",
    current: 100,
    total: 100,
  },
]

export function ProgressSection() {
  return (
    <section className="mx-5 mt-6">
      <h3 className="text-base font-semibold text-foreground">
        Criterios de Atividade
      </h3>
      <div className="mt-3 space-y-3">
        {progressData.map((item, index) => {
          const percentage = Math.round((item.current / item.total) * 100)
          return (
            <div
              key={index}
              className="rounded-2xl bg-card p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {item.label}
                  </span>
                </div>
                <span className="text-xs font-semibold text-primary">
                  {item.current}/{item.total}
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#FE2C55] to-[#FF6B8A] transition-all duration-700 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
