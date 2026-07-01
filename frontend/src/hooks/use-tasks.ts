"use client"

import { useQuery } from "@tanstack/react-query"
import { listTasks, tasksKey } from "@/lib/tasks"

export function useTasks() {
  return useQuery({ queryKey: tasksKey, queryFn: listTasks })
}
