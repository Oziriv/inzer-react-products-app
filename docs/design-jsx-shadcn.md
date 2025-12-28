app/

create/page.tsx

```tsx
import { ProductForm } from "@/components/product-form"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AppHeader } from "@/components/app-header"

export default function CreateProductPage() {
  return (
    <>
      <AppHeader />
      <main className="min-h-[calc(100vh-4rem)] p-6">
        <div className="max-w-3xl space-y-6">
          <div>
            <Button variant="ghost" asChild>
              <Link href="/" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Назад к списку
              </Link>
            </Button>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-balance mb-1">Создать продукт</h1>
            <p className="text-muted-foreground">Заполните форму для добавления нового продукта</p>
          </div>

          <ProductForm mode="create" />
        </div>
      </main>
    </>
  )
}
```

edit/id/page.tsx

```tsx
import { ProductForm } from "@/components/product-form"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AppHeader } from "@/components/app-header"

export default function EditProductPage() {
  // Mock data - будет заменено на реальные данные
  const product = {
    id: 1,
    title: "iPhone 14 Pro",
    description: "Смартфон с передовыми технологиями и потрясающей камерой",
    price: 999,
    category: "Смартфоны",
    brand: "Apple",
    stock: 25,
    sku: "IPHONE14PRO-128-BLK",
  }

  return (
    <>
      <AppHeader />
      <main className="min-h-[calc(100vh-4rem)] p-6">
        <div className="max-w-3xl space-y-6">
          <div>
            <Button variant="ghost" asChild>
              <Link href="/" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Назад к списку
              </Link>
            </Button>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-balance mb-1">Редактировать продукт</h1>
            <p className="text-muted-foreground">Обновите информацию о продукте</p>
          </div>

          <ProductForm mode="edit" initialData={product} />
        </div>
      </main>
    </>
  )
}
```

my-products/page.tsx

```tsx
import { ProductList } from "@/components/product-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { AppHeader } from "@/components/app-header"

export default function MyProductsPage() {
  return (
    <>
      <AppHeader />
      <main className="min-h-[calc(100vh-4rem)] p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-balance mb-1">Мои продукты</h1>
              <p className="text-sm text-muted-foreground">Продукты добавленные через форму</p>
            </div>
            <Button asChild className="gap-2">
              <Link href="/create">
                <Plus className="h-4 w-4" />
                Добавить продукт
              </Link>
            </Button>
          </div>

          <ProductList type="custom" />
        </div>
      </main>
    </>
  )
}
```

product/id/page.tsx

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Star, Package, Tag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { AppHeader } from "@/components/app-header"

export default function ProductDetailPage() {
  // Mock data - будет заменено на реальные данные
  const product = {
    id: 1,
    title: "iPhone 14 Pro",
    description:
      "Смартфон с передовыми технологиями и потрясающей камерой. Оснащен чипом A16 Bionic, который обеспечивает невероятную производительность и энергоэффективность.",
    fullDescription:
      "iPhone 14 Pro представляет собой вершину инноваций Apple. Устройство оснащено революционной Dynamic Island, которая интегрирует уведомления и функции в интерактивный интерфейс. Профессиональная камерная система с 48 МП основным сенсором позволяет создавать потрясающие фотографии и видео в любых условиях освещения. Always-On дисплей Pro Motion с частотой обновления 120 Гц обеспечивает плавную работу и удобство использования.",
    price: 999,
    category: "Смартфоны",
    brand: "Apple",
    rating: 4.5,
    reviews: 128,
    stock: 25,
    sku: "IPHONE14PRO-128-BLK",
    images: ["/iphone-front.png", "/iphone-back.png", "/iphone-side.jpg"],
    specifications: [
      { label: "Процессор", value: "A16 Bionic" },
      { label: "Память", value: "128 GB" },
      { label: "Экран", value: '6.1" Super Retina XDR' },
      { label: "Камера", value: "48MP + 12MP + 12MP" },
      { label: "Батарея", value: "3200 mAh" },
      { label: "ОС", value: "iOS 16" },
    ],
  }

  return (
    <>
      <AppHeader />
      <main className="min-h-[calc(100vh-4rem)] p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Изображения */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.images.slice(1).map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer hover:opacity-75 transition-opacity"
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.title} ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Информация о продукте */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{product.category}</Badge>
                  <Badge variant="outline">{product.brand}</Badge>
                </div>
                <h1 className="text-4xl font-bold text-balance mb-4">{product.title}</h1>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"}`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews} отзывов)</span>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">${product.price}</span>
                    <span className="text-muted-foreground">USD</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y">
                    <div className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">В наличии</p>
                        <p className="font-medium">{product.stock} шт.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Артикул</p>
                        <p className="font-medium text-sm">{product.sku}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="lg" className="flex-1">
                      Добавить в корзину
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href={`/edit/${product.id}`}>
                        <Edit className="h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Подробное описание */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Описание</h2>
              <p className="text-muted-foreground leading-relaxed">{product.fullDescription}</p>
            </CardContent>
          </Card>

          {/* Характеристики */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Характеристики</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
                    <span className="font-medium">{spec.label}</span>
                    <span className="text-muted-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
```

layout.tsx

```tsx
import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AppSidebar } from "@/components/app-sidebar"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ProductHub - Управление продуктами",
  description: "Приложение для работы с продуктами",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`font-sans antialiased`}>
        <AppSidebar />
        <div className="pl-64">{children}</div>
        <Analytics />
      </body>
    </html>
  )
}
```

page.tsx

```tsx
import { ProductList } from "@/components/product-list"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp } from "lucide-react"
import Link from "next/link"
import { AppHeader } from "@/components/app-header"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function HomePage() {
  return (
    <>
      <AppHeader />
      <main className="min-h-[calc(100vh-4rem)] p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-balance mb-1">Управление продуктами</h1>
              <p className="text-muted-foreground">Просматривайте и управляйте вашими продуктами</p>
            </div>
            <Button asChild className="gap-2">
              <Link href="/create">
                <Plus className="h-5 w-5" />
                Добавить продукт
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 rounded-lg bg-card border">
            <div className="space-y-2">
              <label className="text-sm font-medium">Категория</label>
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Все категории" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  <SelectItem value="smartphones">Смартфоны</SelectItem>
                  <SelectItem value="laptops">Ноутбуки</SelectItem>
                  <SelectItem value="audio">Аудио</SelectItem>
                  <SelectItem value="tablets">Планшеты</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Цена от</label>
              <Input type="number" placeholder="0" className="bg-background" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Цена до</label>
              <Input type="number" placeholder="10000" className="bg-background" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Рейтинг</label>
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Любой" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Любой</SelectItem>
                  <SelectItem value="4">4+ звезд</SelectItem>
                  <SelectItem value="3">3+ звезд</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-card border">
            <div className="flex items-center gap-4 flex-1">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div>
                <h2 className="text-lg font-semibold">Продукты из API</h2>
                <p className="text-sm text-muted-foreground">Загружено 0 из 194 товаров</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Показать:</span>
              <div className="flex items-center gap-1.5">
                <Button variant="outline" size="sm" className="h-9 px-3 bg-transparent">
                  10
                </Button>
                <Button variant="outline" size="sm" className="h-9 px-3 bg-transparent">
                  25
                </Button>
                <Button variant="outline" size="sm" className="h-9 px-3 bg-transparent">
                  50
                </Button>
                <Button variant="default" size="sm" className="h-9 px-4 gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Все
                </Button>
              </div>
            </div>
          </div>

          <ProductList type="api" />
        </div>
      </main>
    </>
  )
}
```

components/app-header.tsx

```tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, LogOut, User, ArrowLeft } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

export function AppHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()

  const isProductDetailPage = pathname?.startsWith("/product/")

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-full items-center justify-between px-6 gap-4">
        {isProductDetailPage ? (
          <Button variant="ghost" asChild>
            <Link href="/" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Назад к списку
            </Link>
          </Button>
        ) : (
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Поиск продуктов..."
                className="pl-9 bg-muted/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted/50">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Иван Иванов</span>
          </div>
          <Button variant="ghost" size="sm" className="gap-2">
            <LogOut className="h-4 w-4" />
            Выход
          </Button>
        </div>
      </div>
    </header>
  )
}
```

components/app-sidebar

```tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package2, Database, Plus, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border/60 bg-card flex flex-col">
      {/* Logo Section */}
      <div className="flex h-16 items-center gap-2 border-b border-border/60 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <Package2 className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="font-semibold text-lg">ProductHub</span>
      </div>

      <nav className="flex-1 flex flex-col gap-1 p-4">
        <div className="mb-2">
          <p className="text-xs font-medium text-muted-foreground mb-2 px-3">СПИСКИ ПРОДУКТОВ</p>
          <div className="flex flex-col gap-1">
            <Button
              variant={pathname === "/" ? "secondary" : "ghost"}
              className={cn("justify-start gap-3 text-sm h-10", pathname === "/" && "bg-secondary")}
              asChild
            >
              <Link href="/">
                <Database className="h-4 w-4" />
                Продукты из API
              </Link>
            </Button>
            <Button
              variant={pathname === "/my-products" ? "secondary" : "ghost"}
              className={cn("justify-start gap-3 text-sm h-10", pathname === "/my-products" && "bg-secondary")}
              asChild
            >
              <Link href="/my-products">
                <Package2 className="h-4 w-4" />
                Мои продукты
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border/60">
          <p className="text-xs font-medium text-muted-foreground mb-2 px-3">ДЕЙСТВИЯ</p>
          <Button variant="ghost" className="justify-start gap-3 text-sm h-10 w-full" asChild>
            <Link href="/create">
              <Plus className="h-4 w-4" />
              Создать продукт
            </Link>
          </Button>
        </div>
      </nav>

      <div className="p-4 border-t border-border/60">
        <div className="flex items-center justify-between gap-3 px-3 py-2">
          <label htmlFor="theme-switch" className="text-sm font-medium cursor-pointer">
            Сменить тему
          </label>
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-muted-foreground" />
            <Switch id="theme-switch" />
            <Moon className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </aside>
  )
}
```

components/product-form

```tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, X } from "lucide-react"
import Link from "next/link"

interface ProductFormProps {
  mode: "create" | "edit"
  initialData?: {
    title: string
    description: string
    price: number
    category: string
    brand: string
    stock: number
    sku: string
  }
}

export function ProductForm({ mode, initialData }: ProductFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{mode === "create" ? "Информация о новом продукте" : "Изменить данные продукта"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Название продукта *</Label>
              <Input id="title" placeholder="Например: iPhone 14 Pro" defaultValue={initialData?.title} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku">Артикул *</Label>
              <Input id="sku" placeholder="PROD-12345" defaultValue={initialData?.sku} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание *</Label>
            <Textarea
              id="description"
              placeholder="Подробное описание продукта..."
              rows={4}
              defaultValue={initialData?.description}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price">Цена ($) *</Label>
              <Input id="price" type="number" placeholder="0.00" step="0.01" defaultValue={initialData?.price} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Количество *</Label>
              <Input id="stock" type="number" placeholder="0" defaultValue={initialData?.stock} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Категория *</Label>
              <Input id="category" placeholder="Электроника" defaultValue={initialData?.category} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="brand">Бренд</Label>
              <Input id="brand" placeholder="Apple" defaultValue={initialData?.brand} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">URL изображения</Label>
              <Input id="image" type="url" placeholder="https://example.com/image.jpg" />
            </div>
          </div>

          <div className="pt-4 border-t flex gap-4">
            <Button type="submit" size="lg" className="gap-2">
              <Save className="h-5 w-5" />
              {mode === "create" ? "Создать продукт" : "Сохранить изменения"}
            </Button>
            <Button type="button" variant="outline" size="lg" asChild>
              <Link href="/" className="gap-2">
                <X className="h-5 w-5" />
                Отмена
              </Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
```

components/product-list

```tsx
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Trash2, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProductListProps {
  type: "api" | "custom"
}

export function ProductList({ type }: ProductListProps) {
  // Mock data - будет заменено на реальные данные
  const mockProducts = [
    {
      id: 1,
      title: "iPhone 14 Pro",
      description: "Смартфон с передовыми технологиями и потрясающей камерой",
      price: 999,
      category: "Смартфоны",
      rating: 4.5,
      stock: 25,
      image: "/modern-smartphone.png",
    },
    {
      id: 2,
      title: "MacBook Pro 16",
      description: "Мощный ноутбук для профессионалов",
      price: 2499,
      category: "Ноутбуки",
      rating: 4.8,
      stock: 15,
      image: "/modern-laptop-workspace.png",
    },
    {
      id: 3,
      title: "AirPods Pro",
      description: "Беспроводные наушники с шумоподавлением",
      price: 249,
      category: "Аудио",
      rating: 4.6,
      stock: 50,
      image: "/diverse-people-listening-headphones.png",
    },
    {
      id: 4,
      title: "iPad Air",
      description: "Универсальный планшет для работы и развлечений",
      price: 599,
      category: "Планшеты",
      rating: 4.7,
      stock: 30,
      image: "/modern-tablet-display.png",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5">
      {mockProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-shadow flex flex-col h-full">
          <CardHeader className="p-0">
            <div className="relative aspect-video overflow-hidden bg-muted">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              {product.stock < 20 && (
                <Badge className="absolute top-2 right-2 text-xs" variant="destructive">
                  Мало
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-2.5 flex-1 flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <Badge variant="secondary" className="text-xs">
                {product.category}
              </Badge>
              <div className="flex items-center gap-1 text-xs">
                <Star className="h-3 w-3 fill-primary text-primary" />
                <span className="font-medium">{product.rating}</span>
              </div>
            </div>

            <h3 className="font-semibold text-base mb-1 line-clamp-1">{product.title}</h3>

            <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">{product.description}</p>

            <div className="mt-auto">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xl font-bold">${product.price}</span>
              </div>
              <span className="text-xs text-muted-foreground">В наличии: {product.stock}</span>
            </div>
          </CardContent>

          <CardFooter className="p-2.5 pt-0 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 bg-transparent h-8 text-xs" asChild>
              <Link href={`/product/${product.id}`}>
                <Eye className="h-3 w-3 mr-1" />
                Просмотр
              </Link>
            </Button>
            {type === "custom" && (
              <>
                <Button variant="outline" size="sm" className="h-8 bg-transparent" asChild>
                  <Link href={`/edit/${product.id}`}>
                    <Edit className="h-3 w-3" />
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="h-8 bg-transparent">
                  <Trash2 className="h-3 w-3 text-destructive" />
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
```

globals.css

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(0.14 0 0);
  --foreground: oklch(0.98 0 0);
  --card: oklch(0.18 0 0);
  --card-foreground: oklch(0.98 0 0);
  --popover: oklch(0.18 0 0);
  --popover-foreground: oklch(0.98 0 0);
  --primary: oklch(0.88 0.15 86);
  --primary-foreground: oklch(0.14 0 0);
  --secondary: oklch(0.24 0 0);
  --secondary-foreground: oklch(0.98 0 0);
  --muted: oklch(0.24 0 0);
  --muted-foreground: oklch(0.62 0 0);
  --accent: oklch(0.88 0.15 86);
  --accent-foreground: oklch(0.14 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.98 0 0);
  --border: oklch(0.28 0 0);
  --input: oklch(0.24 0 0);
  --ring: oklch(0.88 0.15 86);
  --chart-1: oklch(0.88 0.15 86);
  --chart-2: oklch(0.7 0.2 220);
  --chart-3: oklch(0.75 0.18 160);
  --chart-4: oklch(0.8 0.15 310);
  --chart-5: oklch(0.65 0.2 40);
  --radius: 0.5rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.14 0 0);
  --foreground: oklch(0.98 0 0);
  --card: oklch(0.18 0 0);
  --card-foreground: oklch(0.98 0 0);
  --popover: oklch(0.18 0 0);
  --popover-foreground: oklch(0.98 0 0);
  --primary: oklch(0.88 0.15 86);
  --primary-foreground: oklch(0.14 0 0);
  --secondary: oklch(0.24 0 0);
  --secondary-foreground: oklch(0.98 0 0);
  --muted: oklch(0.24 0 0);
  --muted-foreground: oklch(0.62 0 0);
  --accent: oklch(0.88 0.15 86);
  --accent-foreground: oklch(0.14 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.98 0 0);
  --border: oklch(0.28 0 0);
  --input: oklch(0.24 0 0);
  --ring: oklch(0.88 0.15 86);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
  /* optional: --font-sans, --font-serif, --font-mono if they are applied in the layout.tsx */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```