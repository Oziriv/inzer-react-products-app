import { CheckCircle2, Edit, Trash2, XCircle } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import { removeCustomProduct, selectCustomProducts } from '@/entities/product/model/customProductsSlice'
import { useDeleteProductMutation } from '@/shared/api/productsApi'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Switch } from '@/shared/ui/switch'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'

export function MyProductsTable() {
  const products = useSelector(selectCustomProducts)
  const [showPublishedOnly, setShowPublishedOnly] = useState(false)

  const dispatch = useDispatch()
  const [deleteProductApi] = useDeleteProductMutation()

  const filteredProducts = showPublishedOnly
    ? products.filter(p => p.isPublished)
    : products

  const handleDelete = async (id: number) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот продукт?'))
      return

    try {
      await deleteProductApi(id).unwrap()
      dispatch(removeCustomProduct(id))
    }
    catch (e) {
      console.error('Delete failed', e)
      dispatch(removeCustomProduct(id))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-lg border bg-card p-4">
        <div className="flex items-center gap-2">
          <Switch
            id="filter-published"
            checked={showPublishedOnly}
            onCheckedChange={setShowPublishedOnly}
          />
          <Label htmlFor="filter-published" className="cursor-pointer">
            Только опубликованные
          </Label>
        </div>
        <div className="text-sm text-muted-foreground">
          Найдено:
          {' '}
          {filteredProducts.length}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Статус</TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Цена</TableHead>
              <TableHead className="hidden md:table-cell">Дата создания</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0
              ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Продукты не найдены. Создайте свой первый продукт!
                    </TableCell>
                  </TableRow>
                )
              : (
                  filteredProducts.map(product => (
                    <TableRow key={product.id}>
                      <TableCell>
                        {product.isPublished
                          ? (
                              <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                {' '}
                                Pub
                              </Badge>
                            )
                          : (
                              <Badge variant="secondary">
                                <XCircle className="mr-1 h-3 w-3" />
                                {' '}
                                Draft
                              </Badge>
                            )}
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{product.title}</span>
                          <span className="max-w-[150px] truncate text-xs text-muted-foreground md:hidden">
                            {product.description}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        $
                        {product.price}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/edit/${product.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={async () => handleDelete(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
