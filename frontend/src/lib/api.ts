const API_URL = process.env.NEXT_PUBLIC_API_URL

export class AuthError extends Error {}

async function request(path: string, opts: RequestInit = {}) {
  return fetch(`${API_URL}${path}`, {
    ...opts,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...opts.headers },
  })
}

export async function apiFetch<T>(
  path: string,
  opts: RequestInit = {}
): Promise<T> {
  let res = await request(path, opts)

  if (res.status === 401) {
    const refreshed = await request("/auth/refresh", { method: "POST" })
    if (!refreshed.ok) throw new AuthError("Not authenticated")
    res = await request(path, opts)
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.message ?? `Request failed: ${res.status}`)
  }

  if (res.status === 204) return undefined as T
  return res.json()
}
