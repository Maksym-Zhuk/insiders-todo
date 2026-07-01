"use client"

import { TaskList } from "@/components/task-list"
import { useAuth } from "@/hooks/use-auth"
import { Header } from "@/components/header"

export default function Home() {
  const { user, ready } = useAuth()

  if (!ready || !user) return null

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 p-6">
      <Header />
      <TaskList />
    </div>
  )
}
