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
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 255.0.0.19.109 (iPhone14,2; iOS 16_6; en_US; en-US; scale=3.00; 1170x2532; 407706374)",
        "X-IG-App-ID": "936619743392459",
        "X-IG-WWW-Claim": "0",
        "X-Requested-With": "XMLHttpRequest",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        "Referer": "https://www.instagram.com/",
        "Origin": "https://www.instagram.com",
      },
      cache: "no-store",
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
