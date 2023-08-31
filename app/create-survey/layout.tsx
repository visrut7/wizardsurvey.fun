import { AppProvider } from '../context/AppContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>
}
