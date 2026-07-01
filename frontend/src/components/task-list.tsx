"use client"

import { useState } from "react"
import { ListTodoIcon } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { TaskCard } from "@/components/task-card"
import { STATUS, type TaskStatus } from "@/lib/tasks"
import { useTasks } from "@/hooks/use-tasks"

const FILTERS = [{ value: "ALL", label: "All" }, ...STATUS] as const
type Filter = TaskStatus | "ALL"

const FILTER_COLOR: Record<Filter, string> = {
  ALL: "",
  TODO: "data-pressed:bg-slate-500/20 data-pressed:text-slate-400",
  IN_PROGRESS: "data-pressed:bg-amber-500/20 data-pressed:text-amber-400",
  DONE: "data-pressed:bg-green-500/20 data-pressed:text-green-400",
}

export function TaskList() {
  const [filter, setFilter] = useState<Filter>("ALL")
  const { data: tasks, isPending } = useTasks()

  const filtered = tasks?.filter((t) => filter === "ALL" || t.status === filter)

  return (
    <div className="flex flex-col gap-4">
      <ToggleGroup
        variant="outline"
        value={[filter]}
        onValueChange={(value: string[]) => {
          if (value[0]) setFilter(value[0] as Filter)
        }}
      >
        {FILTERS.map((f) => (
          <ToggleGroupItem
            key={f.value}
            value={f.value}
            className={FILTER_COLOR[f.value]}
          >
            {f.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {isPending ? (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : filtered && filtered.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filtered.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ListTodoIcon />
            </EmptyMedia>
            <EmptyTitle>No tasks</EmptyTitle>
            <EmptyDescription>
              {filter === "ALL"
                ? "Create your first task to get started."
                : "No tasks with this status."}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </div>
  )
}
