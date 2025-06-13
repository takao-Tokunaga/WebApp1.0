'use client'

import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROFILE } from '../queries/profileQueries';
import { CREATE_PROFILE, UPDATE_PROFILE } from '../mutations/profileMutations';
import { Profile } from '../types/profile';
import { useRouter } from 'next/navigation';


export default function ProfileEdit({ userId }: { userId: number }) {
  const [displayName, setName] = useState('');
  const [bio, setBio] = useState('');
  const [goal, setGoal] = useState('');

  const { data } = useQuery<{ getProfile: Profile }>(GET_PROFILE, {
    variables: { userId },
  });

  useEffect(() => {
    if (data?.getProfile) {
      setName(data.getProfile.displayName ?? '');
      setBio(data.getProfile.bio ?? '');
      setGoal(data.getProfile.goal ?? '');
    }
  }, [data]);

  const [createProfile] = useMutation(CREATE_PROFILE);
  const [updateProfile] = useMutation(UPDATE_PROFILE);

  const router = useRouter();

  const handleSave = async () => {
  const profile = data?.getProfile;

  const createProfileInput = { displayName, bio, goal, userId };

  try {
    if (profile?.id) {
      // 既存プロフィールがある → 更新処理
      const updateProfileInput = {
        id: profile.id,
        displayName,
        bio,
        goal,
      };

      await updateProfile({
        variables: { updateProfileInput },
        refetchQueries: [{ query: GET_PROFILE, variables: { userId } }],
      });
    } else {
      // プロフィールがまだない → 作成処理
      await createProfile({
        variables: { createProfileInput },
        refetchQueries: [{ query: GET_PROFILE, variables: { userId } }],
      });
    }

    router.push('/profile');
  } catch (error: any) {
    alert('保存に失敗しました');
    console.error(error);
  }
};


  return (
  <div className="max-w-md mx-auto p-6">
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <div className='divide-y divide-blue-400'>
        <div>
          <h2 className="text-2xl font-bold mb-3 text-center" style={{ color: 'black' }}>
            プロフィール編集
          </h2>
          <div className="flex justify-center">
            <img className="w-24 h-24 rounded-full border mb-8" src="/default-avatar.png"/>
          </div>
        </div>
        
        
        <div className="mb-4">
          <label className="block mb-1 font-semibold" style={{ color: 'black' }}>名前</label>
          <input
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-blue-400"
            placeholder="名前"
            value={displayName}
            style={{ color: 'black', backgroundColor: '#f9f9f9' }}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold" style={{ color: 'black' }}>ひとことコメント</label>
        <textarea
          className="border border-gray-300 rounded px-3 py-2 w-full resize-none focus:outline-blue-400"
          placeholder="ひとことコメント"
          value={bio}
          style={{ color: 'black', backgroundColor: '#f9f9f9' }}
          rows={3}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>

        <div className="mb-6">
        <label className="block mb-1 font-semibold" style={{ color: 'black' }}>目標</label>
        <textarea
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-blue-400"
          placeholder="目標"
          value={goal}
          style={{ color: 'black', backgroundColor: '#f9f9f9' }}
          onChange={(e) => setGoal(e.target.value)}
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition  font-semibold"
          style={{ minWidth: '10px'}}
        >
          保存
        </button>
      </div>
    </div>
  </div>
  );
}
