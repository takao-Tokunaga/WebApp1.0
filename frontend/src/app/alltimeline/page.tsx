'use client'

import AllTimeline from '../../components/AllTimeline'
import { PrivateRoute } from '../../AuthRoute'

export default function AllTimelinePage() {
  return <PrivateRoute><AllTimeline /></PrivateRoute>
}