'use client'

import Profile from '@/components/Profile'
import { PrivateRoute } from '../../../AuthRoute'

export default function ProfilePage() {
  return <PrivateRoute><Profile /></PrivateRoute>
}