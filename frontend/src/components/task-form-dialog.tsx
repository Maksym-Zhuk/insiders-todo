"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { STATUS, type Task, type TaskStatus } from "@/lib/tasks"
import { useCreateTask } from "@/hooks/use-create-tasks"
import { useUpdateTask } from "@/hooks/use-update-tasks"

type TaskFormDialogProps = {
  task?: Task
  trigger: React.ReactNode
}

export function TaskFormDialog({ task, trigger }: TaskFormDialogProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(task?.title ?? "")
  const [description, setDescription] = useState(task?.description ?? "")
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? "TODO")

  const createTask = useCreateTask()
  const updateTask = useUpdateTask()
  const pending = createTask.isPending || updateTask.isPending

  function resetForm() {
    setTitle(task?.title ?? "")
    setDescription(task?.description ?? "")
    setStatus(task?.status ?? "TODO")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (task) {
      await updateTask.mutateAsync({ id: task.id, title, description, status })
    } else {
      await createTask.mutateAsync({ title, description, status })
    }
    setOpen(false)
    if (!task) resetForm()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (next) resetForm()
      }}
    >
      <DialogTrigger render={trigger as React.ReactElement} />
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-2">
            <DialogTitle>{task ? "Edit task" : "New task"}</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="status">Status</FieldLabel>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value as TaskStatus)}
                items={STATUS}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
          <DialogFooter className="border-t-0 bg-transparent">
            <Button type="submit" disabled={pending}>
              {pending && <Spinner />}
              {task ? "Save" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
