"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  deleteTask,
  tasksKey,
} from "@/lib/tasks"

export function useDeleteTask() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tasksKey })
      toast.success("Task deleted")
    },
    onError: (err: Error) => toast.error(err.message),
  })
}
