'use client'

import { useRouter } from 'next/navigation'
import { useQuery } from '@apollo/client'
import { GET_ALL_POSTS } from '../queries/allpostQueries'
import { jwtDecode } from 'jwt-decode'
import { Payload } from '@/types/payload'
import Loading from './Loading'
import { GET_Timeline } from '@/queries/getTimelinePostsQueries'

export default function AllTimeline() {
  const { data, loading, error } = useQuery(GET_ALL_POSTS);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const userId = token ? jwtDecode<Payload>(token).sub : null;

  const router = useRouter();
  
  
  if (!token || !userId) return <div>Auth Error</div>
  if (loading) return <Loading />
  if (error) return <div>読み込みエラー</div>

  console.log("data.getAllPosts", data?.getAllPosts);

  return (
    <div className="relative min-h-screen p-4">
      {/* 📋 投稿一覧 */}
      <h1 className="text-2xl font-bold mb-4">タイムライン</h1>
      <div className="cursor-pointer transition p-2">
        <div className="flex justify-center">
          <div className="space-y-5 w-200">
            {data?.getAllPosts?.map((post: any) => (
              <div key={post.id} className="border rounded p-4 shadow">
                <p className="text-gray-600">{post.user.profile.displayName}</p>
                <p className="text-blue-400">{post.type}</p>
                <p className="text-blue-400">{post.description}</p>
                <p className="text-sm text-gray-400">{new Date(post.createdAt).toLocaleString('ja-JP', {
                  timeZone: 'Asia/Tokyo',
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}</p>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  )
}
