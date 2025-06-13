'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_SCHEDULE } from '../mutations/scheduleMutations';
import { useRouter } from 'next/navigation';
import { Schedule } from '@/types/schedule';
import { GET_SCHEDULES } from '@/queries/scheduleQueries';

type EditScheduleProps = {
  schedule: {
    id: number;
    title: string;
    description?: string;
    dueDate?: string;
  };
  userId: number;
  onClose: () => void;
};

export default function EditSchedule({ schedule, userId, onClose }: EditScheduleProps) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(''); 
  const [description, setDescription] = useState('');
  const [isInvalidSchedule, setIsInvalidSchedule] = useState(false);
  const [isInvalidDueDate, setIsInvalidDueDate] = useState(false);
  const [updateSchedule] = useMutation<{updateSchedule: Schedule}>(UPDATE_SCHEDULE)
  const router = useRouter();

  useEffect(() => {
    setTitle(schedule.title);
    setDueDate(schedule.dueDate ?? '');
    setDescription(schedule.description ?? '');
  }, [schedule]);
  
  const handleEditSchedule = async () => {
    let canEdit = true;

    if (title.length === 0) {
        canEdit = false;
        setIsInvalidSchedule(true);
    } else {
        setIsInvalidSchedule(false);
    }

    if (!Date.parse(dueDate)) {
        canEdit = false;
        setIsInvalidDueDate(true);
    } else {
        setIsInvalidDueDate(false);
    }

    if (canEdit) {
        const updateScheduleInput = { id: schedule.id, title, dueDate, description, userId: userId};
        try {
            await updateSchedule({
                variables: { updateScheduleInput },
                refetchQueries: [{query: GET_SCHEDULES, variables: { userId }}],
            });
            onClose(); //モーダルを閉じる
        } catch(err: any) {
            if (err.message === 'Unauthorized') {
                localStorage.removeItem('token');
                alert('トークンの有効画面が切れました。サインイン画面に遷移します。')
                router.push('/signiin');
                return;
            }
            console.error("GraphQL error", err); 
            alert('予定の登録に失敗しました');
        }
    }
  }
 

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-bold mb-4">予定を編集</h2>

        <label className="block mb-2 font-medium">タイトル</label>
        <input 
           type="text"
           value={title}
           onChange={(e) => setTitle(e.target.value)}
           className={ `w-full border p-2 rounded mb-2 ${isInvalidSchedule ? 'border-red-500' : 'border-gray-300'}` }
           placeholder="タイトルを入力"
        />
        {isInvalidSchedule && <p className="text-red-500 text-sm mb-2">タイトルを入力してください</p>}

        <label className="block mb-2 font-medium">日付</label>
        <input 
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={ `w-full border p-2 rounded mb-2 ${isInvalidDueDate ? 'border-red-500' : 'border-gray-300'}` }
        />
        {isInvalidDueDate && <p className="text-red-500 text-sm mb-2">正しい日付を入力してください</p>}

        <label className="block mb-2 font-medium">説明</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded mb-4"
          rows={4}
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                キャンセル
              </button>
              <button
                onClick={handleEditSchedule}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                登録
              </button>
            </div>
          </div>
        </div>
  );
}
