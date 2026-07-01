"use client"

import { createContext, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import {
  loginRequest,
  logoutRequest,
  registerRequest,
  type User,
} from "@/lib/auth-api"

export type AuthContextValue = {
  user: User | null
  ready: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

const STORAGE_KEY = "todo.user"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [ready, setReady] = useState(false)
  const { setTheme } = useTheme()

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    const parsed = stored ? JSON.parse(stored) : null
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage on mount
    setUser(parsed)
    setReady(true)
  }, [])

  function persist(user: User | null) {
    setUser(user)
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  }

  async function login(email: string, password: string) {
    const { user } = await loginRequest({ email, password })
    persist(user)
  }

  async function register(name: string, email: string, password: string) {
    const { user } = await registerRequest({
      username: name,
      email,
      password,
    })
    persist(user)
  }

  async function logout() {
    await logoutRequest().catch(() => {})
    persist(null)
    setTheme("system")
  }

  return (
    <AuthContext.Provider value={{ user, ready, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
