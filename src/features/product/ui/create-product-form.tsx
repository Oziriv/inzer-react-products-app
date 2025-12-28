import { Loader2, Save } from 'lucide-react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { addCustomProduct } from '@/entities/product/model/customProductsSlice'
import { useAddProductMutation } from '@/shared/api/productsApi'

import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Switch } from '@/shared/ui/switch'
import { Textarea } from '@/shared/ui/textarea'

export function CreateProductForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [addProduct, { isLoading }] = useAddProductMutation()

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    isPublished: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.title.trim())
      newErrors.title = 'Название обязательно'
    if (!formData.price || Number(formData.price) <= 0)
      newErrors.price = 'Цена должна быть больше 0'
    if (!formData.description.trim())
      newErrors.description = 'Описание обязательно'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate())
      return

    try {
      const apiPayload = {
        title: formData.title,
        price: Number(formData.price),
        description: formData.description,
        category: 'custom',
        thumbnail: 'https://placehold.co/600x400/png',
      }

      await addProduct(apiPayload).unwrap()

      // 2. Формируем объект для сохранения в локальный Redux Store
      // Генерируем ID сами, т.к. dummyjson всегда возвращает один и тот же ID для новых товаров
      const newProduct = {
        ...apiPayload,
        id: Date.now(),
        isPublished: formData.isPublished,
        createdAt: new Date().toISOString(),
      }

      dispatch(addCustomProduct(newProduct))

      navigate('/my-products')
    }
    catch (err) {
      console.error('Ошибка при создании:', err)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Информация о новом продукте</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Название продукта *</Label>
            <Input
              id="title"
              placeholder="Например: Супер Смартфон"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className={errors.title ? 'border-destructive' : ''}
            />
            {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Цена ($) *</Label>
            <Input
              id="price"
              type="number"
              placeholder="0.00"
              step="0.01"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
              className={errors.price ? 'border-destructive' : ''}
            />
            {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание *</Label>
            <Textarea
              id="description"
              placeholder="Подробное описание продукта..."
              rows={4}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className={errors.description ? 'border-destructive' : ''}
            />
            {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
          </div>

          <div className="flex items-center space-x-2 rounded-lg border p-4">
            <Switch
              id="published"
              checked={formData.isPublished}
              onCheckedChange={checked => setFormData({ ...formData, isPublished: checked })}
            />
            <Label htmlFor="published">Опубликовать сразу</Label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" size="lg" className="gap-2" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
              Создать продукт
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
