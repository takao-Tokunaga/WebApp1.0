'use client'

import MyTimeline from '../../../components/MyTimeline'
import { PrivateRoute } from '../../../AuthRoute'

export default function TimelinePage() {
  return <PrivateRoute><MyTimeline /></PrivateRoute>
}