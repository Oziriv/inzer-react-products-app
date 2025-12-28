import { Outlet } from 'react-router'
import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'

export function BaseLayout() {
  return (
    <div className="flex min-h-screen bg-background font-sans antialiased">
      <Sidebar />
      <div className="ml-64 flex min-h-screen flex-1 flex-col transition-all duration-300">
        <Header />
        <main className="flex-1 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
