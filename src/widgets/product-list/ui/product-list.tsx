import { AlertCircle, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react'
import { useSearchParams } from 'react-router'
import { ProductCard } from '@/entities/product'
import { useGetProductsQuery } from '@/shared/api/productsApi'
import { Button } from '@/shared/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'

export function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 8
  const sortBy = searchParams.get('sortBy') || ''
  const order = (searchParams.get('order') as 'asc' | 'desc') || 'asc'
  const q = searchParams.get('q') || '' // Поисковый запрос

  // Вычисляем skip для API
  const skip = (page - 1) * limit

  // Запрос к API (автоматически перезапустится при изменении q в URL)
  const { data, isLoading, error, isFetching } = useGetProductsQuery({
    limit,
    skip,
    q,
    sortBy: sortBy === 'none' ? undefined : sortBy,
    order,
  })

  // --- Хендлеры (только лимиты, сортировка, пагинация) ---
  const handleLimitChange = (newLimit: number) => {
    setSearchParams((prev) => {
      prev.set('limit', String(newLimit))
      prev.set('page', '1')
      return prev
    })
  }

  const handleSortChange = (value: string) => {
    setSearchParams((prev) => {
      if (value === 'none') {
        prev.delete('sortBy')
        prev.delete('order')
      }
      else {
        const [field, direction] = value.split('-')
        prev.set('sortBy', field)
        prev.set('order', direction)
      }
      return prev
    })
  }

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set('page', String(newPage))
      return prev
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // --- Рендер ---
  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 p-8 text-center text-destructive">
        <AlertCircle className="h-8 w-8" />
        <p>Ошибка при загрузке данных</p>
      </div>
    )
  }

  const totalProducts = data?.total || 0
  const totalPages = Math.ceil(totalProducts / limit)

  return (
    <div className="space-y-6">
      {/* Панель фильтров */}
      <div className="flex flex-col gap-4 rounded-lg border bg-card p-4">

        {/* Верхняя строка: Информация */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="hidden rounded-full bg-primary/10 p-2 sm:block">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">
                {q ? `Результаты поиска: "${q}"` : 'Все продукты'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isLoading ? 'Загрузка...' : `Найдено товаров: ${totalProducts}`}
              </p>
            </div>
          </div>
        </div>

        {/* Нижняя строка: Лимиты */}
        <div className="flex items-center justify-between gap-2 border-t pt-2">
          <Select onValueChange={handleSortChange} value={sortBy ? `${sortBy}-${order}` : 'none'}>
            <SelectTrigger>
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">По умолчанию</SelectItem>
              <SelectItem value="price-asc">Цена: По возрастанию</SelectItem>
              <SelectItem value="price-desc">Цена: По убыванию</SelectItem>
              <SelectItem value="title-asc">Название: А-Я</SelectItem>
              <SelectItem value="title-desc">Название: Я-А</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center justify-end gap-2">
            <span className="hidden text-sm text-muted-foreground sm:inline">Показывать по:</span>
            <div className="flex gap-1">
              {[8, 16, 30].map(l => (
                <Button
                  key={l}
                  variant={limit === l ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleLimitChange(l)}
                  className="h-8 px-3"
                >
                  {l}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Сетка товаров */}
      <div className={`grid grid-cols-1 gap-4 transition-opacity duration-200 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${isFetching ? 'opacity-60' : 'opacity-100'}`}>
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-[300px] animate-pulse rounded-xl bg-muted" />
            ))
          : data?.products.length === 0
            ? (
                <div className="col-span-full rounded-lg bg-muted/20 py-12 text-center text-muted-foreground">
                  Ничего не найдено
                </div>
              )
            : data?.products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4 pb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1 || isLoading}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="text-sm font-medium">
            Страница
            {' '}
            {page}
            {' '}
            из
            {' '}
            {totalPages}
          </span>

          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages || isLoading}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
