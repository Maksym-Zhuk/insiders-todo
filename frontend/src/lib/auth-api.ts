import { apiFetch } from "@/lib/api"

export type User = { id: string; name: string; email: string }

export function loginRequest(input: { email: string; password: string }) {
  return apiFetch<{ user: User }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  })
}

export function registerRequest(input: {
  username: string
  email: string
  password: string
}) {
  return apiFetch<{ user: User }>("/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  })
}

export function logoutRequest() {
  return apiFetch("/auth/logout", { method: "POST" })
}
