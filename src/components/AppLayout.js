export default function AppLayout({ children }) {
  return (
    <>
      <div className="fixed top-0 left-0 h-4 right-0 bg-primary-bg" />

      <div className={`fixed top-4 bottom-4 right-0 left-0 overflow-auto`}>
        {children}
      </div>

      <div className="fixed bottom-0 left-0 h-4 right-0 bg-primary-bg" />
    </>
  );
}
