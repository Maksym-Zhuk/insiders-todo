"use client"

import { PencilIcon, Trash2Icon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { TaskFormDialog } from "@/components/task-form-dialog"
import { STATUS, type Task } from "@/lib/tasks"
import { useDeleteTask } from "@/hooks/use-delete-task"

const STATUS_VARIANT = {
  TODO: "outline",
  IN_PROGRESS: "secondary",
  DONE: "default",
} as const

export function TaskCard({ task }: { task: Task }) {
  const deleteTask = useDeleteTask()
  const label = STATUS.find((s) => s.value === task.status)?.label

  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-medium">{task.title}</h3>
            <Badge variant={STATUS_VARIANT[task.status]}>{label}</Badge>
          </div>
          {task.description && (
            <p className="text-sm text-muted-foreground">
              {task.description}
            </p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <TaskFormDialog
            task={task}
            trigger={
              <Button variant="ghost" size="icon-sm">
                <PencilIcon />
                <span className="sr-only">Edit</span>
              </Button>
            }
          />
          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="hover:scale-110 hover:text-destructive"
                >
                  <Trash2Icon />
                  <span className="sr-only">Delete</span>
                </Button>
              }
            />
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete task?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete &ldquo;{task.title}&rdquo;.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={() => deleteTask.mutate(task.id)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  )
}
