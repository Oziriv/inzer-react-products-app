import { ProductList } from "@/widgets/product-list";

export function HomePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Продукты API</h1>
      </div>
      <ProductList />
    </div>
  );
}