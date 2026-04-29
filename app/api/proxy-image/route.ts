import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url")

  if (!url || !url.includes("cdninstagram.com")) {
    return new NextResponse("URL não permitida", { status: 400 })
  }

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    })

    if (!res.ok) {
      return new NextResponse("Imagem não encontrada", { status: 404 })
    }

    const buffer = await res.arrayBuffer()
    const contentType = res.headers.get("content-type") || "image/jpeg"

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch {
    return new NextResponse("Erro ao buscar imagem", { status: 500 })
  }
}
