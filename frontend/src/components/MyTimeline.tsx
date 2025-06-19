'use client'

import { useRouter } from 'next/navigation'
import { useQuery } from '@apollo/client'
import { GET_POST } from '../queries/postQueries'
import { jwtDecode } from 'jwt-decode'
import { Payload } from '@/types/payload'
import EditPost from './EditPost'
import Loading from './Loading'

export default function Timeline() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const userId = token ? jwtDecode<Payload>(token).sub : null;
  const router = useRouter();
  
  const { data, loading, error } = useQuery<any>(GET_POST, {
    variables: { userId },
  })
  
  if (!token || !userId) return <div>Auth Error</div>
  if (loading) return <Loading />
  if (error) return <div>読み込みエラー</div>

  return (
    <div className="relative min-h-screen p-4">
      {/* 📋 投稿一覧 */}
      <h1 className="text-2xl font-bold mb-4">タイムライン</h1>
      <div className="cursor-pointer transition p-2">
        <div className="flex justify-center">
          <div className="space-y-5 w-200">
            {data?.getPost?.map((post: any) => (
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
                <EditPost post={post} userId={userId}/>
              </div>
            ))}
          </div>
        </div>
        
      </div>

      {/* 🔵 右下の投稿ボタン */}
      <button
        onClick={() => router.push('/timeline/post')}
        className="fixed bottom-6 right-6 bg-blue-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-600 z-50"
      >
        <div className="cursor-pointer transition p-2">
          投稿する
        </div>
      </button>
    </div>
  )
}
