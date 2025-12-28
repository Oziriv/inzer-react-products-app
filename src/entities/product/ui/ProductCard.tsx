import type { IProduct } from '@/shared/api/productsApi'
import { Eye } from 'lucide-react'
import { Link } from 'react-router'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card'

interface ProductCardProps {
  product: IProduct
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-start justify-between">
          <Badge variant="secondary" className="text-[10px]">{product.category}</Badge>
          <span className="text-lg font-bold">
            $
            {product.price}
          </span>
        </div>

        <h3 className="line-clamp-2 text-sm font-semibold" title={product.title}>
          {product.title}
        </h3>
      </CardContent>

      <CardFooter className="p-3 pt-0">
        <Button variant="outline" size="sm" className="w-full gap-2" asChild>
          <Link to={`/product/${product.id}`}>
            <Eye className="h-4 w-4" />
            Подробнее
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
