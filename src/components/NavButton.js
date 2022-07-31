import { useRouter } from "next/router";
//In works-- if i ever need--  might not use -- might not even work
export default function NavButton(path) {
  const router = useRouter();
  return (
    <>
      <button onClick={() => router.push}>Back</button>
      <nav>
        <a href={path}>Home</a>
      </nav>
    </>
  );
}
