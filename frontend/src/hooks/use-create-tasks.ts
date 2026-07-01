"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  createTask,
  tasksKey,
} from "@/lib/tasks"

export function useCreateTask() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tasksKey })
      toast.success("Task created")
    },
    onError: (err: Error) => toast.error(err.message),
  })
}
