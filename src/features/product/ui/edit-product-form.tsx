import type { IProduct } from '@/shared/api/productsApi'
import { Loader2, Save, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { editCustomProduct, removeCustomProduct } from '@/entities/product/model/customProductsSlice'
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
} from '@/shared/api/productsApi'

import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Switch } from '@/shared/ui/switch'
import { Textarea } from '@/shared/ui/textarea'

interface EditProductFormProps {
  product: IProduct
}

export function EditProductForm({ product }: EditProductFormProps) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // API хуки
  const [updateProductApi, { isLoading: isUpdating }] = useUpdateProductMutation()
  const [deleteProductApi, { isLoading: isDeleting }] = useDeleteProductMutation()

  const [formData, setFormData] = useState({
    title: product.title,
    price: product.price,
    description: product.description,
    isPublished: product.isPublished ?? false,
  })

  useEffect(() => {
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      isPublished: product.isPublished ?? false,
    })
  }, [product])

  const handleDelete = async () => {
    const confirmed = window.confirm('Вы уверены, что хотите удалить этот продукт?')
    if (!confirmed)
      return

    try {
      await deleteProductApi(product.id).unwrap()

      dispatch(removeCustomProduct(product.id))

      navigate('/my-products')
    }
    catch (error) {
      console.error('Failed to delete', error)
      alert('Ошибка при удалении')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await updateProductApi({
        id: product.id,
        data: {
          title: formData.title,
          price: Number(formData.price),
          description: formData.description,
        },
      }).unwrap()

      const updatedProduct: IProduct = {
        ...product,
        title: formData.title,
        price: Number(formData.price),
        description: formData.description,
        isPublished: formData.isPublished,
      }

      dispatch(editCustomProduct(updatedProduct))

      navigate('/my-products')
    }
    catch (err) {
      console.error('Ошибка при обновлении:', err)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>
          Редактирование продукта #
          {product.id}
        </CardTitle>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
          Удалить
        </Button>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Название продукта</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Цена ($)</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="flex items-center space-x-2 rounded-lg border p-4">
            <Switch
              id="published"
              checked={formData.isPublished}
              onCheckedChange={checked => setFormData({ ...formData, isPublished: checked })}
            />
            <Label htmlFor="published">Опубликовано</Label>
          </div>

          <div className="flex gap-4 border-t pt-4">
            <Button type="submit" size="lg" className="gap-2" disabled={isUpdating}>
              {isUpdating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
              Сохранить изменения
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={async () => navigate(-1)}>
              Отмена
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
