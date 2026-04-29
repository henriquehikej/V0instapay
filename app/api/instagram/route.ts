import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username")

  if (!username) {
    return NextResponse.json({ error: "Username obrigatório" }, { status: 400 })
  }

  try {
    const url = "https://i.instagram.com/api/v1/users/web_profile_info/"

    const response = await fetch(`${url}?username=${encodeURIComponent(username)}`, {
      headers: {
        "User-Agent": "Instagram 255.0.0.19.109 iPhone",
        "X-IG-App-ID": "936619743392459",
        "Accept-Language": "pt-BR,pt;q=0.9",
      },
      next: { revalidate: 0 },
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    const data = await response.json()
    const user = data?.data?.user

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      username: user.username,
      full_name: user.full_name,
      followers: user.edge_followed_by?.count ?? 0,
      profile_pic: user.profile_pic_url_hd || user.profile_pic_url,
    })
  } catch {
    return NextResponse.json({ error: "Erro ao buscar perfil" }, { status: 500 })
  }
}
