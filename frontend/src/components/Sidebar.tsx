// src/components/Sidebar.tsx
'use client'

import Link from "next/link"

export default function Sidebar() {
 
  const menuItems = [
    { name: 'プロフィール', path: '/profile' },
    { name: 'タイムライン', path: '/timeline' },
    { name: 'レポート', path: '/main/report' },
  ]

  return (
   <aside className="w-60 h-full shadow-md">
    <nav>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className="block px-3 py-2 rounded hover:bg-blue-200 text-black font-medium transition"
              >
                {item.name}
              </Link>
          </li>
        ))}
      </ul>
    </nav>
   </aside>
  )
}
