import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
  createContext,
  useEffect,
  useMemo,
} from 'react'
import { usePathname, useRouter } from 'next/navigation'

interface AuthContextProps {
  isLogin: boolean
  setIsLogin: Dispatch<SetStateAction<boolean>>
}

const defaultAuthContextProps: AuthContextProps = {
  isLogin: false,
  setIsLogin: () => {},
}

const AuthContext = createContext(defaultAuthContextProps)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLogin, setIsLogin] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const value = useMemo(() => ({ isLogin, setIsLogin }), [isLogin])

  useEffect(() => {
    if (!isLogin) {
      router.push('login')
      return
    }

    if (pathname === '/login') router.push('/')
  }, [isLogin, router, pathname])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuthContext = () => useContext(AuthContext)

export { useAuthContext }
