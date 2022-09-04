import { useEffect } from "react";
import { UserProvider, useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="fixed top-0 left-0 h-4 right-0 bg-primary-bg" />

      <div className={`fixed top-4 bottom-4 right-0 left-0 overflow-auto`}>
        <UserProvider>
          <AuthWrapper>
            <Component {...pageProps} />
          </AuthWrapper>
        </UserProvider>
      </div>

      <div className="fixed bottom-0 left-0 h-4 right-0 bg-primary-bg" />
    </>
  );
}

export function lowerCaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

function AuthWrapper(props) {
  const { user, isLoading } = useUser();
  const { isReady, push, pathname } = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!isReady) return;

    if (!user && pathname !== "/") {
      push("/");
    }
  }, [user, isLoading, isReady]);

  if (isLoading) return null;

  return <>{props.children}</>;
}
