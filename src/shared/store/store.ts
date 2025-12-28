import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '@/entities/auth/model/authSlice'
import { customProductsReducer } from '@/entities/product/model/customProductsSlice'
import { productsApi } from '@/shared/api/productsApi'

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    customProducts: customProductsReducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(productsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
