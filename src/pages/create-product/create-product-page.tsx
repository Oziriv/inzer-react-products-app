import { CreateProductForm } from '@/features/product'

export function CreateProductPage() {
  return (
    <main className="p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="mb-1 text-3xl font-bold text-balance">Создать продукт</h1>
          <p className="text-muted-foreground">Заполните форму для добавления нового продукта</p>
        </div>

        <CreateProductForm />
      </div>
    </main>
  )
}
