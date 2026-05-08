import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Facebook/Meta bot IP ranges (CIDR notation - principais ranges)
const BLOCKED_IP_RANGES = [
  // IPv4
  "31.13.24.0/21",
  "31.13.64.0/18",
  "45.64.40.0/22",
  "57.141.0.0/16",
  "57.144.0.0/14",
  "66.220.144.0/20",
  "69.63.176.0/20",
  "69.171.224.0/19",
  "74.119.76.0/22",
  "102.132.96.0/20",
  "103.4.96.0/22",
  "129.134.0.0/16",
  "147.75.208.0/20",
  "157.240.0.0/16",
  "163.70.128.0/17",
  "163.77.128.0/17",
  "173.252.64.0/18",
  "179.60.192.0/22",
  "185.60.216.0/22",
  "185.89.216.0/22",
  "189.247.71.0/24",
  "204.15.20.0/22",
]

function ipToNumber(ip: string): number {
  const parts = ip.split(".").map(Number)
  return (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]
}

function isIpInRange(ip: string, cidr: string): boolean {
  try {
    // Skip IPv6
    if (ip.includes(":")) return false
    if (cidr.includes(":")) return false

    const [range, bits] = cidr.split("/")
    const mask = ~(2 ** (32 - parseInt(bits)) - 1)
    const ipNum = ipToNumber(ip)
    const rangeNum = ipToNumber(range)

    return (ipNum & mask) === (rangeNum & mask)
  } catch {
    return false
  }
}

function isBlockedIp(ip: string): boolean {
  if (!ip || ip === "::1" || ip === "127.0.0.1") return false
  
  for (const range of BLOCKED_IP_RANGES) {
    if (isIpInRange(ip, range)) {
      return true
    }
  }
  return false
}

export function middleware(request: NextRequest) {
  // Get client IP
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
             request.headers.get("x-real-ip") ||
             ""

  // Block Facebook/Meta bots
  if (isBlockedIp(ip)) {
    return NextResponse.redirect("https://www.youtube.com/")
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except static files and api routes
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
}
