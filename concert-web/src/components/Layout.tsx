export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <main className="flex-1 min-h-screen bg-[#FBFBFB]">
        {children}
      </main>
    </div>
  );
}
