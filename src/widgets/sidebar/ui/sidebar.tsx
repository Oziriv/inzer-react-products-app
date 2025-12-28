import { Database, Moon, Package2, Plus, Sun } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { Switch } from '@/shared/ui/switch'

export function Sidebar() {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <aside className="fixed top-0 left-0 z-40 flex h-screen w-64 flex-col border-r border-border/60 bg-card">
      {/* Логотип */}
      <div className="flex h-16 items-center gap-2 border-b border-border/60 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Package2 className="h-5 w-5" />
        </div>
        <span className="text-lg font-semibold">Продукт Хаб</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4">
        <div className="mb-2">
          <p className="mb-2 px-3 text-xs font-medium text-muted-foreground">СПИСКИ ПРОДУКТОВ</p>
          <div className="flex flex-col gap-1">
            <Button
              variant={pathname === '/' ? 'secondary' : 'ghost'}
              className={cn('h-10 justify-start gap-3 text-sm', pathname === '/' && 'bg-secondary')}
              asChild
            >
              <Link to="/">
                <Database className="h-4 w-4" />
                Продукты из API
              </Link>
            </Button>
            <Button
              variant={pathname === '/my-products' ? 'secondary' : 'ghost'}
              className={cn('h-10 justify-start gap-3 text-sm', pathname === '/my-products' && 'bg-secondary')}
              asChild
            >
              <Link to="/my-products">
                <Package2 className="h-4 w-4" />
                Мои продукты
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-4 border-t border-border/60 pt-4">
          <p className="mb-2 px-3 text-xs font-medium text-muted-foreground">ДЕЙСТВИЯ</p>
          <Button variant="ghost" className="h-10 w-full justify-start gap-3 text-sm" asChild>
            <Link to="/create">
              <Plus className="h-4 w-4" />
              Создать продукт
            </Link>
          </Button>
        </div>
      </nav>

      <div className="border-t border-border/60 p-4">
        <div className="flex items-center justify-between gap-3 px-3 py-2">
          <label htmlFor="theme-switch" className="cursor-pointer text-sm font-medium">
            Сменить тему
          </label>
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-muted-foreground" />
            <Switch id="theme-switch" />
            <Moon className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </aside>
  )
}
