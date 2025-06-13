// app/page.tsx
import Main from '../components/Main'
import { PrivateRoute } from '../AuthRoute'
import Schedule from '@/components/Schedule'

export default function HomePage() {
  return <PrivateRoute><Schedule /></PrivateRoute>
}
