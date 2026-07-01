import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TaskFormDialog } from "@/components/task-form-dialog"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth";


export function Header() {
    const router = useRouter()
    const { user, logout } = useAuth()


  return (
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Todo</h1>
          <p className="text-sm text-muted-foreground">{user?.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <TaskFormDialog
            trigger={
              <Button size="sm">
                <PlusIcon />
                New task
              </Button>
            }
          />
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              await logout()
              router.replace("/login")
            }}
          >
            Log out
          </Button>
        </div>
      </header>
  )
}
