'use client'

import { useQuery } from '@apollo/client';
import { jwtDecode } from 'jwt-decode';
import { GET_PROFILE } from '../queries/profileQueries';
import { Payload } from '@/types/payload';
import Loading from './Loading';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const router = useRouter();

  /*―― 1) userId を取得 ――*/
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const userId = token ? jwtDecode<Payload>(token).sub : undefined;

  /*―― 2) プロフィール取得 ――*/
  const { loading, error, data } = useQuery(GET_PROFILE, {
    skip: userId == null,              // userId が取れなければクエリを飛ばさない
    variables: { userId },
  });

  if (!token) return <div>Auth Error</div>;
  if (loading) return <Loading />;
  if (error)   return <div>読み込みエラー</div>;
  if (!data.getProfile) {
  return (
    <div className="max-w-md mx-auto p-4">
      <p>プロフィールがまだ作成されていません。</p>
      <button
        onClick={() => router.push('/profile/edit')}
        className="mt-2 text-blue-500 underline"
      >
        プロフィールを作成する
      </button>
    </div>
  );
}
  const { displayName, bio, goal, imageUrl } = data.getProfile;

   return (
    <div className="max-w-md ml-50 p-5">
      {/* 編集ボタン */}
      <div className="flex justify-end mb-2">
        <button
          onClick={() => router.push('/profile/edit')}
          className="top-4 text-md text-black rounded-full hover:bg-gray-200"
        >
          <span className="cursor-pointer transition p-2">
          プロフィールを編集
          </span>
        </button>
      </div>

      <div className="flex-col items-start mb-4">
        <img 
            className="w-24 h-24 rounded-full border mb-2 object-cover"
            src={imageUrl || data?.getProfile?.imageUrl || '/default-avatar.png'}
            alt="Profile"
        />
        <h2 className="text-xm text-left font-bold mt-2 text-black">{displayName || null }</h2>
        <p className="text-sm text-gray-400 mt-1">{bio || null}</p>

        <div className="flex gap-4 mt-2">
          <span className="text-sm text-gray-500">フォロー 0</span>
          <span className="text-sm text-gray-500">フォロワー 0</span>
        </div>
      </div>

      <div className="bg-white p-5 border rounded-lg mb-4">
        <p className="text-gray-800 font-medium">目標</p>
        <p className="text-sm mt-1 text-black">{goal || null}</p>
      </div>
    </div>
  );
}
