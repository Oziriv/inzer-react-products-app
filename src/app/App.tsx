import { Route, Routes } from 'react-router'
import { ProtectedRoute } from '@/features/auth'
import { CreateProductPage } from '@/pages/create-product/create-product-page'
import { EditProductPage } from '@/pages/edit-product/edit-product-page'
import { HomePage } from '@/pages/home/home-page'
import { MyProductsPage } from '@/pages/my-products/my-products-page'
import { ProductDetailsPage } from '@/pages/product-details/product-details-page'
import { BaseLayout } from '@/widgets/layout/base-layout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<HomePage />} />
        <Route path="product/:id" element={<ProductDetailsPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="create" element={<CreateProductPage />} />
          <Route path="my-products" element={<MyProductsPage />} />
          <Route path="edit/:id" element={<EditProductPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
