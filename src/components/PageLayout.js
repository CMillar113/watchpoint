export default function PageLayout({ children }) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full sm:w-4/5 md:w-3/5 lg:w-1/2">{children}</div>
    </div>
  );
}
