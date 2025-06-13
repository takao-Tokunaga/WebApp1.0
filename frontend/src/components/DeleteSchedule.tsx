'use client';

import { useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_SCHEDULE } from '../mutations/scheduleMutations';
import { useRouter } from 'next/navigation';
import { GET_SCHEDULES } from '@/queries/scheduleQueries';
import { Schedule } from '@/types/schedule';

type DeleteScheduleProps = {
  schedule: {
    id: number;
    title: string;
    description?: string;
    dueDate?: string;
  };
  userId: number;
  onClose: () => void;
};

export default function DeleteSchedule({ schedule, userId, onClose }: DeleteScheduleProps) {
  const [deleteSchedule] = useMutation<{ deleteSchedule: Schedule }>(DELETE_SCHEDULE);
  const router = useRouter();

  const hasCalled = useRef(false);

  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;

    const handleDelete = async () => {
      try {
        await deleteSchedule({
          variables: {
             id: schedule.id,
          },
          refetchQueries: [{ query: GET_SCHEDULES, variables: { userId } }],
        });
        onClose(); // 削除後にモーダルを閉じる
      } catch (err: any) {
        if (err.message === 'Unauthorized') {
          localStorage.removeItem('token');
          alert('トークンの有効期限が切れました。サインイン画面に遷移します。');
          router.push('/signin');
          return;
        }
      }
    };
    handleDelete();
  }, [deleteSchedule, schedule.id, userId, onClose, router]);

  return null;
}
