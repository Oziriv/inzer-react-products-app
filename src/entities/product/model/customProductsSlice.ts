import type { PayloadAction } from '@reduxjs/toolkit'
import type { IProduct } from '@/shared/api/productsApi'
import type { RootState } from '@/shared/store/store'
import { createSlice } from '@reduxjs/toolkit'

interface CustomProductsState {
  products: IProduct[]
}

function loadFromStorage(): IProduct[] {
  try {
    const saved = localStorage.getItem('customProducts')
    return saved ? JSON.parse(saved) : []
  }
  catch {
    return []
  }
}

const initialState: CustomProductsState = {
  products: loadFromStorage(),
}

export const customProductsSlice = createSlice({
  name: 'customProducts',
  initialState,
  reducers: {
    addCustomProduct: (state, action: PayloadAction<IProduct>) => {
      state.products.unshift(action.payload)
      localStorage.setItem('customProducts', JSON.stringify(state.products))
    },
    editCustomProduct: (state, action: PayloadAction<IProduct>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id)
      if (index !== -1) {
        state.products[index] = action.payload
        localStorage.setItem('customProducts', JSON.stringify(state.products))
      }
    },
    removeCustomProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(p => p.id !== action.payload)
      localStorage.setItem('customProducts', JSON.stringify(state.products))
    },
  },
})

export const { addCustomProduct, editCustomProduct, removeCustomProduct } = customProductsSlice.actions

export const customProductsReducer = customProductsSlice.reducer

export const selectCustomProducts = (state: RootState) => state.customProducts.products
export function selectCustomProductById(state: RootState, id: number) {
  return state.customProducts.products.find(p => p.id === id)
}
