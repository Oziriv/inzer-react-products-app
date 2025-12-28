import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router'
import { selectIsAuth } from '@/entities/auth/model/authSlice'

export function ProtectedRoute() {
  const isAuth = useSelector(selectIsAuth)
  const location = useLocation()

  const alertShownRef = useRef(false)

  useEffect(() => {
    if (!isAuth && !alertShownRef.current) {
      alertShownRef.current = true

      alert('Для доступа к этому разделу необходимо авторизоваться!')
    }

    return () => {
    }
  }, [isAuth])

  if (!isAuth) {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return <Outlet />
}
