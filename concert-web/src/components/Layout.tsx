import { Sidebar } from './Sidebar';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="mt-12 md:mt-0 md:ml-[240px] flex-1 min-h-screen bg-[#FBFBFB]">
        {children}
      </main>
    </div>
  );
}
