import type { RootState } from '@/shared/store/store'
import { ArrowLeft } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router'
import { selectCustomProductById } from '@/entities/product/model/customProductsSlice'
import { EditProductForm } from '@/features/product'
import { Button } from '@/shared/ui/button'

export function EditProductPage() {
  const { id } = useParams<{ id: string }>()
  const productId = Number(id)

  const customProduct = useSelector((state: RootState) =>
    selectCustomProductById(state, productId),
  )

  if (!customProduct) {
    return (
      <main className="p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="rounded-lg border bg-muted/20 p-8 text-center">
            <h2 className="mb-2 text-xl font-bold">Продукт не найден или недоступен для редактирования</h2>
            <p className="mb-4 text-muted-foreground">
              Редактирование только для созданных вами продуктов.
              Продукты из внешнего API редактировать нельзя.
            </p>
            <Button asChild>
              <Link to="/my-products">К моим продуктам</Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <Button variant="ghost" asChild className="pl-0">
            <Link to="/my-products" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Назад к списку
            </Link>
          </Button>
        </div>

        <div>
          <h1 className="mb-1 text-3xl font-bold text-balance">Редактирование продукта</h1>
          <p className="text-muted-foreground">Измените информацию и сохраните</p>
        </div>

        <EditProductForm product={customProduct} />
      </div>
    </main>
  )
}
