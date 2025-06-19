'use client'

import Timeline from '../../components/Timeline'
import { PrivateRoute } from '../../AuthRoute'

export default function AllTimelinePage() {
  return <PrivateRoute><Timeline /></PrivateRoute>
}