'use client'

import SignIn from '../../components/SignIn'
import { GuestRoute } from '@/AuthRoute'

export default function SignInPage() {
  return <GuestRoute><SignIn /></GuestRoute>
}
