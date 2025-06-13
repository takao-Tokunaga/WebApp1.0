'use client';
import { useRouter } from 'next/navigation';
import { Button, Stack } from '@mui/material';

const navItems = [
  { label: 'プロフィール', path: '/profile' },
  { label: 'タイムライン', path: '/timeline' },
  { label: '記録', path: '/pos' },
  { label: '検索', path: '/search' },
  { label: 'レポート', path: '/report' },
];

export default function NavigationButtons() {
  const router = useRouter();
  return (
    <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
      {navItems.map((item) => (
        <Button
          key={item.path}
          variant="outlined"
          onClick={() => router.push(item.path)}
        >
          {item.label}
        </Button>
      ))}
    </Stack>
  );
}
