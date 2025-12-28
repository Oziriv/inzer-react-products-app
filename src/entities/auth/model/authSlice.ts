import type { RootState } from '@/shared/store/store'
import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean
  user: { name: string, email: string } | null
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('authToken'),
  user: localStorage.getItem('authUser')
    ? JSON.parse(localStorage.getItem('authUser') || 'null')
    : null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      const fakeUser = { name: 'Инзер Чурбаев', email: 'inzer.ch@test.com' }
      state.isAuthenticated = true
      state.user = fakeUser

      localStorage.setItem('authToken', 'fake-jwt-token-123')
      localStorage.setItem('authUser', JSON.stringify(fakeUser))
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null

      localStorage.removeItem('authToken')
      localStorage.removeItem('authUser')
    },
  },
})

export const { login, logout } = authSlice.actions
export const authReducer = authSlice.reducer

export const selectIsAuth = (state: RootState) => state.auth.isAuthenticated
export const selectUser = (state: RootState) => state.auth.user
