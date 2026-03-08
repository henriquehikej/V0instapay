"use client"

import { useState, useEffect, useRef } from "react"
import { CheckCircle2 } from "lucide-react"
import Image from "next/image"

const FEMALE_NAMES = [
  "Ana", "Maria", "Juliana", "Fernanda", "Camila", "Larissa", "Beatriz", "Gabriela",
  "Mariana", "Patricia", "Amanda", "Bruna", "Leticia", "Vanessa", "Renata", "Aline",
  "Cristina", "Daniela", "Sandra", "Tatiane", "Viviane", "Carolina", "Isabela", "Rafaela"
]

const MALE_NAMES = [
  "Lucas", "Pedro", "Joao", "Matheus", "Rafael", "Bruno", "Carlos", "Felipe",
  "Thiago", "Diego", "Eduardo", "Gustavo", "Leonardo", "Rodrigo", "Anderson",
  "Marcelo", "Ricardo", "Fabio", "Leandro", "Gabriel", "Vinicius", "Henrique"
]

const LAST_NAMES = [
  "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Pereira",
  "Lima", "Gomes", "Costa", "Ribeiro", "Martins", "Carvalho", "Almeida", "Lopes",
  "Soares", "Fernandes", "Vieira", "Barbosa", "Rocha", "Dias", "Nascimento", "Andrade"
]

const FEMALE_PHOTOS = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7da5c5ba5820fbb6b928d5324c05f898~tplv-tiktokx-cropcenter_1080_1080-FvPRYjUbGhGaZ1QjAH3JIfSMM32k4g.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/09350671bfdd42b0e20261be293b01fa~tplv-tiktokx-cropcenter_1080_1080-w7PI99BLMDBbasdieFmxruzcekGP4M.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0ea90d70f90887d618d736226c806bcd~tplv-tiktokx-cropcenter_1080_1080-uBrBDMwct9JZDbptIDQfuVFpH4nZgd.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f47df189c20dfbeb61564b5576301dd4~tplv-tiktokx-cropcenter_1080_1080-ya9WNrcHP85cOYelC67jlu6RhDb7bG.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/204f766612e27a3a9149ec9ea363b6cc~tplv-tiktokx-cropcenter_1080_1080-qEQUYAKD6KmbWcMLjjtkV8iPw4Gllb.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/27a49ae246b052b579e1dd7b2b9536f3~tplv-tiktokx-cropcenter_1080_1080-eMFuwlL3R8moC8mM6d8HTvXXqxNRvf.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7f4f0c2182d36c8b865733981512bffa~tplv-tiktokx-cropcenter_1080_1080-c4eXou1nwS2TR3KE79U4MjliB5yqpd.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7e56179e1f64e5a45a92fe75640108a5~tplv-tiktokx-cropcenter_1080_1080-o18iCXuJWVKRxv9sTG6E9pab1C5YyL.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/174154c617cdbdc7eb134a84d3318294~tplv-tiktokx-cropcenter_1080_1080%20%281%29-LaWgZpxOBMU4d8peDTrNWBEpUETRAA.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dcbbf286e05a08051a2a31690ba5205e~tplv-tiktokx-cropcenter_1080_1080-WNe9E8xi5OypOs5jM8Sn3p0rFNx05X.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/17299cd139ab8ca4c1fff5306331e92b~tplv-tiktokx-cropcenter_1080_1080-qvEFZcOvCVv1iGUmipDG8uYIIkVBVV.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4b1addbe73ace343b728aaa715df1375~tplv-tiktokx-cropcenter_1080_1080-IAGq2tJJqgCgPXAnqVKoK1U3WERaRm.jpeg",
]

const MALE_PHOTOS: string[] = []

interface Notification {
  id: number
  name: string
  amount: number
  photo: string
  visible: boolean
}

let usedFemalePhotoIndices: number[] = []
let usedMalePhotoIndices: number[] = []

function getUniquePhoto(photos: string[], usedIndices: number[]): { photo: string; index: number } {
  if (photos.length === 0) {
    return { photo: "", index: -1 }
  }
  
  if (usedIndices.length >= photos.length) {
    usedIndices.length = 0
  }
  
  let index: number
  do {
    index = Math.floor(Math.random() * photos.length)
  } while (usedIndices.includes(index))
  
  usedIndices.push(index)
  return { photo: photos[index], index }
}

function generateRandomPerson(): { name: string; photo: string } {
  const isFemale = MALE_PHOTOS.length === 0 || Math.random() > 0.5
  
  if (isFemale || MALE_PHOTOS.length === 0) {
    const firstName = FEMALE_NAMES[Math.floor(Math.random() * FEMALE_NAMES.length)]
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]
    const { photo } = getUniquePhoto(FEMALE_PHOTOS, usedFemalePhotoIndices)
    return {
      name: `${firstName} ${lastName.charAt(0)}.`,
      photo,
    }
  } else {
    const firstName = MALE_NAMES[Math.floor(Math.random() * MALE_NAMES.length)]
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]
    const { photo } = getUniquePhoto(MALE_PHOTOS, usedMalePhotoIndices)
    return {
      name: `${firstName} ${lastName.charAt(0)}.`,
      photo,
    }
  }
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isShowingRef = useRef(false)

  useEffect(() => {
    if (!startAnimations) return

    const showNotification = () => {
      if (isShowingRef.current) return
      
      isShowingRef.current = true
      
      const person = generateRandomPerson()
      const newNotification: Notification = {
        id: Date.now(),
        name: person.name,
        amount: generateRandomAmount(),
        photo: person.photo,
        visible: true,
      }

      setNotification(newNotification)

      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification((prev) =>
          prev && prev.id === newNotification.id ? { ...prev, visible: false } : prev
        )
      }, 3000)

      // Remove notification and schedule next one after animation completes
      setTimeout(() => {
        setNotification(null)
        isShowingRef.current = false
        
        // Schedule next notification with 4-5 second delay AFTER this one disappears
        const nextDelay = Math.random() * 1000 + 4000 // 4-5 seconds
        timeoutRef.current = setTimeout(showNotification, nextDelay)
      }, 3500)
    }

    // First notification after 2 seconds
    timeoutRef.current = setTimeout(showNotification, 2000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [startAnimations])

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
        <div className="flex items-center gap-2 rounded-xl bg-card/95 px-2.5 py-1.5 shadow-md backdrop-blur-sm border border-border">
          {notification.photo ? (
            <div className="relative h-8 w-8 overflow-hidden rounded-full flex-shrink-0">
              <Image
                src={notification.photo}
                alt={notification.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10 flex-shrink-0">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-medium text-foreground truncate">
              {notification.name} sacou {formatCurrency(notification.amount)}
            </p>
            <p className="text-[9px] text-muted-foreground">agora mesmo</p>
          </div>
        </div>
      </div>
    </div>
  )
}
