import { AlertTriangle, Package, ShoppingCart, Star, Tag } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { useGetProductByIdQuery } from '@/shared/api/productsApi'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'

export function ProductDetails() {
  const { id } = useParams<{ id: string }>()
  const { data: product, isLoading, error } = useGetProductByIdQuery(id || '')

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  if (isLoading) {
    return <ProductDetailsSkeleton />
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-destructive">
        <AlertTriangle className="h-10 w-10" />
        <h2 className="text-xl font-semibold">Продукт не найден или произошла ошибка</h2>
        <Button variant="outline" asChild>
          <Link to="/">Вернуться назад</Link>
        </Button>
      </div>
    )
  }

  const currentImage = product.images?.[selectedImageIndex] || product.thumbnail

  return (
    <div className="animate-in space-y-8 duration-500 fade-in">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl border bg-muted">
            <img
              src={currentImage}
              alt={product.title}
              className="h-full w-full object-contain p-4"
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-muted transition-all ${
                    selectedImageIndex === index
                      ? 'ring-2 ring-primary ring-offset-2'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="preview" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="text-sm">{product.category}</Badge>
              {product.brand && <Badge variant="outline" className="text-sm">{product.brand}</Badge>}
            </div>

            <h1 className="mb-4 text-3xl leading-tight font-bold text-foreground sm:text-4xl">
              {product.title}
            </h1>

            <div className="mb-6 flex items-center gap-4">
              <div className="flex items-center gap-1 rounded-md bg-yellow-100/50 px-2 py-1 dark:bg-yellow-900/20">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-bold text-yellow-700 dark:text-yellow-400">
                  {product.rating}
                </span>
              </div>

              <span className="cursor-pointer text-muted-foreground hover:underline">
                {product.reviews?.length || 0}
                {' '}
                отзывов
              </span>
            </div>

            <p className="text-lg leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          </div>

          <Card className="border-2 border-muted/40 shadow-sm">
            <CardContent className="space-y-6 p-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold">
                  $
                  {product.price}
                </span>
                {product.discountPercentage && (
                  <Badge variant="destructive" className="h-6 text-sm">
                    -
                    {product.discountPercentage}
                    %
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 border-y border-border/50 py-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Наличие</p>
                    <p className="font-semibold">
                      {product.stock}
                      {' '}
                      шт.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Tag className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">SKU</p>
                    <p className="max-w-[100px] truncate font-semibold">{product.sku || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="h-12 w-full gap-2 text-base">
                <ShoppingCart className="h-5 w-5" />
                Добавить в корзину
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-12 border-t pt-8">
          <h2 className="mb-6 text-2xl font-bold">Отзывы покупателей</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {product.reviews.map((review, idx) => (
              <Card key={idx} className="bg-muted/30">
                <CardContent className="space-y-2 p-4">
                  <div className="flex items-start justify-between">
                    <div className="font-semibold">{review.reviewerName}</div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "
                    {review.comment}
                    "
                  </p>
                  <p className="pt-2 text-right text-xs text-muted-foreground">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ProductDetailsSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-10 w-32" />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <Skeleton className="aspect-square rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    </div>
  )
}
