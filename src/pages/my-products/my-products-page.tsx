import { Plus } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/shared/ui/button'
import { MyProductsTable } from '@/widgets/my-products-table'

export function MyProductsPage() {
  return (
    <main className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-1 text-3xl font-bold text-balance">Мои продукты</h1>
            <p className="text-sm text-muted-foreground">Продукты добавленные через форму</p>
          </div>
          <Button asChild className="gap-2">
            <Link to="/create">
              <Plus className="h-4 w-4" />
              Добавить продукт
            </Link>
          </Button>
        </div>

        <MyProductsTable />
      </div>
    </main>
  )
}
