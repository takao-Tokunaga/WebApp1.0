'use client'

import { useEffect, useMemo, useState } from "react";
import PanelSchedule from "./PanelSchedule"; 
import { GET_SCHEDULES } from "@/queries/scheduleQueries";
import { useQuery } from "@apollo/client";
import { Schedule } from "@/types/schedule";
import { jwtDecode } from "jwt-decode";
import { Payload } from "@/types/payload";
import AddSchedule from "./AddSchedule";

function generateCalendar(year: number, month: number): { date: Date, isCurrentMonth: boolean }[] {

  const days = [];
  const startDayOfWeek = new Date(year, month, 1).getDay(); // 日曜:0~土曜:6
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate(); // 6月 →　30日
  const lastDateOfPrevMonth = new Date(year, month, 0).getDate();
  
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    days.push({ date: new Date(year, month - 1, lastDateOfPrevMonth - i), isCurrentMonth: false});
  }

  for (let i = 1; i <= lastDateOfMonth; i++){
    days.push({ date: new Date(year, month, i), isCurrentMonth: true});
  } 

  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false })
  }
  return days;  
}

function formatDateToYMD(date: Date): string {
  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2);
  const day = (`0${date.getDate()}`).slice(-2);
  return `${year}-${month}-${day}`;
}

export default function CalendarApp() {

const [currentYear, setCurrentYear]= useState(new Date().getFullYear());
const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
const calendarDays = generateCalendar(currentYear, currentMonth);

const goToPrevMonth = () => {
  if (currentMonth === 0) {
    setCurrentYear(currentYear - 1);
    setCurrentMonth(11);
  } else {
    setCurrentMonth(currentMonth - 1);
  }
};

const goToNextMonth = () => {
  if (currentMonth === 11) {
    setCurrentYear(currentYear + 1);
    setCurrentMonth(0);
  } else {
    setCurrentMonth(currentMonth + 1);
  }
};

const [selectedSchedule, setSelectedSchedule] = useState<{ id: number; title: string} | null>(null);
const [selectedDate, setSelectedDate] = useState<Date | null>(null);
const [userId, setUserId] = useState<number | null>(null);

// トークンから userId を取得
useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken = jwtDecode<Payload>(token);
      setUserId(decodedToken.sub);
    } catch (err) {
      console.error("トークンの解析に失敗しました", err);
    }
  }
}, []);

// userId が null の場合は useQuery をスキップ
const { loading, data, error } = useQuery<{ getSchedules: Schedule[] }>(
  GET_SCHEDULES,
  {
    variables: { userId: userId! },
    skip: userId === null, // ← これがポイント！
  }
);

//bakcendからデータを取得
const scheduleMap = useMemo(() => {
  const map = new Map<string, { id: number; title: string; dueDate: string; description: string}[]>();

  if(!data?.getSchedules) return map;

  for (const sched of data.getSchedules) {
    const key = sched.dueDate.slice(0, 10);
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key)!.push({ 
      id: sched.id, 
      title: sched.title,
      dueDate: sched.dueDate,
      description: sched.description,
    });
  }

  return map;
}, [data]);

return (
  
<div className="relative">
 <div className="flex justify-betwen items-center mb-4">
  <button onClick={goToPrevMonth}>←</button>
  <div>{currentYear}年 {currentMonth + 1}月</div>
  <button onClick={goToNextMonth}>→</button>
 </div>

 <div className="grid grid-cols-7 m-10">
    <div className="h-24 border border-black text-center text-red-500">日</div>  
    <div className="h-24 border text-center">月</div>
    <div className="h-24 border text-center">火</div>  
    <div className="h-24 border text-center">水</div>
    <div className="h-24 border text-center">木</div>  
    <div className="h-24 border text-center">金</div>
    <div className="h-24 w-50 border border-black text-center text-blue-500">土</div>  

    {calendarDays.map(({ date, isCurrentMonth }) => {
const key = formatDateToYMD(date); // ← 修正
const schedules = scheduleMap.get(key) || [];

  return (
    <div
      key={key}
      onClick={() => setSelectedDate(date)}
      className={`h-24 border text-center cursor-pointer ${isCurrentMonth ? '' : 'text-gray-400'}`}
    >
      <div>{date.getDate()}</div>
      <div className="w-full truncate text-sm space-y-1">
        {schedules.map((s) => (
          <div
            key={s.id}
            onClick={(e) => {
              e.stopPropagation(); // 日付セルクリック防止
              setSelectedSchedule(s); // ← ここが重要！
              setSelectedDate(null);
            }}
            className="bg-blue-100 hover:bg-blue-200 cursor-pointer rounded px-1"
          >
            {s.title}
          </div>
        ))}
      </div>
    </div>
  );
})}

     </div>
     {selectedSchedule && (
     <PanelSchedule
      schedule={selectedSchedule}
      userId={userId!}
      onClose={() => setSelectedSchedule(null)}
     />
   )}
   {selectedDate && !selectedSchedule && userId && (
     <AddSchedule
      date={selectedDate}
      userId={userId!}
      onClose={() => setSelectedDate(null)}
     />
   )}
  
  </div>
 );
}
