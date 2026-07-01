import { apiFetch } from "@/lib/api"

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE"

export type Task = {
  id: string
  title: string
  description: string
  status: TaskStatus
  userId: string
  createdAt: string
  updatedAt: string
}

export const STATUS: { value: TaskStatus; label: string }[] = [
  { value: "TODO", label: "To do" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "DONE", label: "Done" },
]

export const tasksKey = ["tasks"] as const

export function listTasks() {
  return apiFetch<Task[]>("/tasks")
}

export function createTask(input: {
  title: string
  description: string
  status: TaskStatus
}) {
  return apiFetch<Task>("/tasks", {
    method: "POST",
    body: JSON.stringify(input),
  })
}

export function updateTask(
  id: string,
  input: Partial<{ title: string; description: string; status: TaskStatus }>
) {
  return apiFetch<Task>(`/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  })
}

export function deleteTask(id: string) {
  return apiFetch<Task>(`/tasks/${id}`, { method: "DELETE" })
}
