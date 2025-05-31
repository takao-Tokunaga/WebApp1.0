// app/page.tsx
import Main from '../components/Main'
import { PrivateRoute } from '../AuthRoute'

export default function HomePage() {
  return <PrivateRoute><Main /></PrivateRoute>
}
