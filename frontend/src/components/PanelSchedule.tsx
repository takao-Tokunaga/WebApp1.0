'use client';

import React, { useState } from 'react';
import EditSchedule from './EditSchedule';
import DeleteSchedule from './DeleteSchedule';

type PanelScheduleProps = {
  schedule: { 
    id: number;
    title: string;
    description?: string;
    dueDate?: string;
  };
  userId: number;
  onClose: () => void;
};

export default function PanelSchedule({ schedule,userId, onClose }: PanelScheduleProps) {

  const [EditingSchedule, setEditingSchedule ]= useState<PanelScheduleProps["schedule"] | null>(null);
  const [DeletingSchedule, setDeletingSchedule ]= useState<PanelScheduleProps["schedule"] | null>(null);


  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-80">
        <h2 className="text-xl font-bold mb-2">{schedule.title}</h2>
        <h1 className="text-xl font-bold mb-2">{schedule.dueDate}</h1>
        <p className="text-gray-700 mb-4">説明: {schedule.description}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          閉じる
        </button>
        <button
          onClick={() => setEditingSchedule(schedule)}
          className="m-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          編集
        </button>
        <button
          onClick={() => setDeletingSchedule(schedule)}
          className="m-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          削除
        </button>
      </div>
      {EditingSchedule && userId && (
     <EditSchedule
      schedule={EditingSchedule}
      userId={userId!}
      onClose={() => {
        setEditingSchedule(null);
        onClose();
      }}
     />
    )}
    {DeletingSchedule && userId && (
     <DeleteSchedule
      schedule={DeletingSchedule}
      userId={userId!}
      onClose={() => {
        setDeletingSchedule(null);
        onClose();
      }}
     />
   )}
  </div>
 )
}