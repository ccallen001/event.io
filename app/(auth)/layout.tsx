export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-center w-full min-h-screen bg-primary-50 bg-dotted-pattern bg-fixed bg-center bg-cover">
      {children}
    </div>
  );
}
