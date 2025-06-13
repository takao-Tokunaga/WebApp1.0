'use client'

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import ProfileEdit from '@/components/ProfileEdit';
import { PrivateRoute } from '../../../../AuthRoute';
import { Payload } from '@/types/payload';

export default function ProfileEditPage() {
  const [userId, setUserId] = useState<number | null>(null);

  // ❶ クライアント側でだけ localStorage を読む
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const { sub } = jwtDecode<Payload>(token);
      setUserId(sub);
    }
  }, []);

  // ❷ ロード中
  if (userId === null) return <div>Loading...</div>;

  // ❸ 取得失敗時
  if (userId === undefined) return <div>Auth Error</div>;

  // ❹ 取得成功 → 子へ props で渡す
  return (
    <PrivateRoute>
      <ProfileEdit userId={userId} />
    </PrivateRoute>
  );
}
