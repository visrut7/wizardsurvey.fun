import { AppProvider } from '@/app/context/AppContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>
}
