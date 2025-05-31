'use client' // これが重要！クライアントサイド専用になる

import { ReactNode, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

type Props = {
  children: ReactNode
}

export const PrivateRoute = ({ children }: Props) => {
  const { checked, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (checked && !isAuthenticated) {
      router.replace('/signin')
    }
  }, [checked, isAuthenticated, router])

  if (!checked) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return null // リダイレクト中なので何も表示しない
  }

  return <>{children}</>
}

export const GuestRoute = ({ children }: Props) => {
  const { checked, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (checked && isAuthenticated) {
      router.replace('/')
    }
  }, [checked, isAuthenticated, router])

  if (!checked) {
    return <div>Loading...</div>
  }

  if (isAuthenticated) {
    return null
  }

  return <>{children}</>
}
