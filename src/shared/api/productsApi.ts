import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface IProduct {
  id: number
  title: string
  description: string
  price: number
  thumbnail?: string
  category: string
  rating?: number
  stock?: number
  images?: string[]
  brand?: string
  discountPercentage?: number
  sku?: string
  reviews?: Array<{
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
  }>

  isPublished?: boolean
  createdAt?: string
}

interface ProductsResponse {
  products: IProduct[]
  total: number
  skip: number
  limit: number
}

export interface GetProductsParams {
  limit: number
  skip: number
  q?: string
  sortBy?: string
  order?: 'asc' | 'desc'
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  endpoints: builder => ({
    getProducts: builder.query<ProductsResponse, GetProductsParams>({
      query: ({ limit, skip, q, sortBy, order }) => {
        const params = new URLSearchParams({
          limit: limit.toString(),
          skip: skip.toString(),
        })

        if (sortBy) {
          params.append('sortBy', sortBy)
          params.append('order', order || 'asc')
        }

        if (q) {
          params.append('q', q)
          return `/products/search?${params.toString()}`
        }

        return `/products?${params.toString()}`
      },
    }),
    getProductById: builder.query<IProduct, number | string>({
      query: id => `/products/${id}`,
    }),

    addProduct: builder.mutation<IProduct, Partial<IProduct>>({
      query: body => ({
        url: '/products/add',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      }),
    }),
    updateProduct: builder.mutation<IProduct, { id: number, data: Partial<IProduct> }>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: data,
      }),
    }),
    deleteProduct: builder.mutation<{ id: number, isDeleted: boolean }, number>({
      query: id => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi
