import { ArrowLeft, LogIn, LogOut, Search, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import { login, logout, selectIsAuth, selectUser } from '@/entities/auth/model/authSlice'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

export function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const isAuth = useSelector(selectIsAuth)
  const user = useSelector(selectUser)

  const isHomePage = location.pathname === '/'

  const initialQ = searchParams.get('q') || ''
  const [searchValue, setSearchValue] = useState(initialQ)

  const debouncedSearch = useDebounce(searchValue, 300)
  useEffect(() => {
    if (!isHomePage)
      return

    const currentQ = searchParams.get('q') || ''

    if (debouncedSearch !== currentQ) {
      setSearchParams((prev) => {
        if (debouncedSearch) {
          prev.set('q', debouncedSearch)
        }
        else {
          prev.delete('q')
        }
        prev.set('page', '1')
        return prev
      })
    }
  }, [debouncedSearch, isHomePage, searchParams, setSearchParams])

  useEffect(() => {
    if (!isHomePage)
      return

    const urlQ = searchParams.get('q') || ''
    if (urlQ !== debouncedSearch) {
      setSearchValue(urlQ)
    }
  }, [searchParams])

  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b border-border/60 bg-background/95 backdrop-blur">
      <div className="flex h-full items-center justify-between gap-4 px-6">

        <div className="flex max-w-md flex-1 items-center gap-4">
          {isHomePage
            ? (
                <div className="relative flex-1">
                  <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Поиск продуктов..."
                    className="bg-muted/50 pl-9"
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                  />
                </div>
              )
            : (
                <Button variant="ghost" onClick={async () => navigate(-1)} className="gap-2 pl-0">
                  <ArrowLeft className="h-4 w-4" />
                  Назад
                </Button>
              )}
        </div>

        <div className="flex items-center gap-3">
          {isAuth
            ? (
                <>
                  <div className="flex items-center gap-2 rounded-md border border-border/50 bg-muted/50 px-3 py-1.5">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="hidden text-sm font-medium sm:inline">{user?.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch(logout())}
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Выход</span>
                  </Button>
                </>
              )
            : (
                <Button size="sm" onClick={() => dispatch(login())}>
                  <LogIn className="mr-2 h-4 w-4" />
                  {' '}
                  Войти
                </Button>
              )}
        </div>
      </div>
    </header>
  )
}
