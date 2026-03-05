"use client"

import { Calendar, TrendingUp, Clock, Eye } from "lucide-react"

interface ActivityItem {
  icon: React.ReactNode
  title: string
  detail: string
  time: string
}

const activityData: ActivityItem[] = [
  {
    icon: <Eye className="h-4 w-4" />,
    title: "Video assistido",
    detail: "+R$ 2,50 ganhos",
    time: "Agora mesmo",
  },
  {
    icon: <TrendingUp className="h-4 w-4" />,
    title: "Bonus diario coletado",
    detail: "+R$ 15,00 ganhos",
    time: "Hoje, 08:30",
  },
  {
    icon: <Calendar className="h-4 w-4" />,
    title: "Check-in diario",
    detail: "14 dias consecutivos",
    time: "Hoje, 08:00",
  },
  {
    icon: <Clock className="h-4 w-4" />,
    title: "Meta de tempo atingida",
    detail: "1000 minutos concluidos",
    time: "Ontem, 23:45",
  },
]

export function ActivitySection() {
  return (
    <section className="mx-5 mt-6">
      <h3 className="text-base font-semibold text-foreground">
        Atividade Recente
      </h3>

      <div className="mt-4 rounded-2xl bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground">
            Ganhos esta semana
          </p>
          <span className="text-xs font-semibold text-emerald-500">
            +12,4%
          </span>
        </div>
        <p className="mt-1 text-2xl font-bold text-foreground">R$ 127,50</p>
        <div className="mt-3 flex gap-1">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div className="w-full overflow-hidden rounded-sm bg-secondary" style={{ height: "60px" }}>
                <div
                  className="w-full rounded-sm bg-gradient-to-t from-[#FE2C55] to-[#FF6B8A]"
                  style={{ height: `${h}%`, marginTop: `${100 - h}%` }}
                />
              </div>
              <span className="text-[9px] text-muted-foreground">
                {["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {activityData.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {item.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                {item.title}
              </p>
              <p className="text-xs text-muted-foreground">{item.detail}</p>
            </div>
            <span className="text-[10px] text-muted-foreground">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
