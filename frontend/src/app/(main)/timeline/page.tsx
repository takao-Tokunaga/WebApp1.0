'use client'

import Timeline from '../../../components/Timeline'
import { PrivateRoute } from '../../../AuthRoute'

export default function TimelinePage() {
  return <PrivateRoute><Timeline /></PrivateRoute>
}