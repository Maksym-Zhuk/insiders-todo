"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  tasksKey,
  updateTask,
  type Task,
  type TaskStatus,
} from "@/lib/tasks"

export function useUpdateTask() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      id,
      ...input
    }: { id: string } & Partial<
      Pick<Task, "title" | "description" | "status">
    > & { status?: TaskStatus }) => updateTask(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tasksKey })
      toast.success("Task updated")
    },
    onError: (err: Error) => toast.error(err.message),
  })
}
