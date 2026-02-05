import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { SIDEBAR_MENU_CONFIG } from '../config/sidebarMenu';
import { useState } from 'react';

export function Sidebar() {
  const router = useRouter();
  const { role, switchRole, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const isActive = (href?: string) => (href ? router.pathname === href : false);

  const baseClass = 'flex items-center gap-2 px-2 py-4 text-2xl';

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-[#C2C2C2] z-40 flex items-center px-4">
        <button onClick={() => setOpen(true)}>
          <Image src="/images/menu.svg" alt="Menu" width={24} height={24} />
        </button>
        <div className="ml-4 font-bold">{role === 'ADMIN' ? 'Admin' : 'User'}</div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setOpen(false)} />
      )}

      <aside
        className={`
        fixed top-0 left-0 h-screen w-[240px]
        bg-white border-r border-gray-200
        flex flex-col py-6 z-50
        transform transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}
      >
        <div className="px-8 py-6 text-[40px] font-bold">{role === 'ADMIN' ? 'Admin' : 'User'}</div>
        <nav className="flex flex-col flex-1 px-2">
          <div className="space-y-1">
            {SIDEBAR_MENU_CONFIG.filter((item) => item.roles.includes(role)).map((item) => {
              const active = isActive(item.href);

              const activeClass = active ? 'bg-[#EAF5F9]' : 'hover:bg-gray-100';

              if (item.href) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`${baseClass} rounded-sm text-gray-700 ${activeClass}`}
                  >
                    <Image src={item.icon} alt={item.label} width={24} height={24} />
                    {item.label}
                  </Link>
                );
              }

              return null;
            })}
            <button
              onClick={() => switchRole(role === 'ADMIN' ? 'USER' : 'ADMIN')}
              className={`${baseClass} text-gray-700 rounded-sm hover:bg-gray-100 w-full`}
            >
              <Image src="/images/refresh-ccw.svg" alt="Swtich Role" width={24} height={24} />
              Switch to {role === 'ADMIN' ? 'user' : 'Admin'}
            </button>
          </div>
          <button
            onClick={logout}
            className={`${baseClass} flex-end text-gray-600 hover:bg-gray-100 mt-auto`}
          >
            <Image src="/images/log-out.svg" alt="Log out" width={24} height={24} />
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
}
