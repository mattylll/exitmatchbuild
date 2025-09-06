'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
  redirectTo?: string
}

export function ProtectedRoute({ 
  children, 
  allowedRoles = [], 
  redirectTo = '/auth/login' 
}: ProtectedRouteProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // TODO: Replace with actual auth check when NextAuth is implemented
        // For now, check localStorage for demo purposes
        const user = localStorage.getItem('user')
        const role = localStorage.getItem('userRole')
        
        if (user) {
          setIsAuthenticated(true)
          setUserRole(role)
          
          // Check role permissions if specified
          if (allowedRoles.length > 0 && (!role || !allowedRoles.includes(role))) {
            router.push('/unauthorized')
            return
          }
        } else {
          // Redirect to login with return URL
          router.push(`${redirectTo}?returnUrl=${encodeURIComponent(pathname)}`)
          return
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push(redirectTo)
        return
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router, pathname, allowedRoles, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-navy-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect via useEffect
  }

  return <>{children}</>
}

// Helper function to check if user has required role
export function useAuth() {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    role: null,
    isLoading: true
  })

  useEffect(() => {
    const checkAuth = () => {
      try {
        // TODO: Replace with actual auth check when NextAuth is implemented
        const user = localStorage.getItem('user')
        const role = localStorage.getItem('userRole')
        
        setAuth({
          isAuthenticated: !!user,
          user: user ? JSON.parse(user) : null,
          role,
          isLoading: false
        })
      } catch (error) {
        setAuth({
          isAuthenticated: false,
          user: null,
          role: null,
          isLoading: false
        })
      }
    }

    checkAuth()
    
    // Listen for auth changes
    const handleStorageChange = () => checkAuth()
    window.addEventListener('storage', handleStorageChange)
    
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return auth
}