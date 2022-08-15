import { UserProvider } from "@auth0/nextjs-auth0";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="fixed top-0 left-0 h-4 right-0 bg-primary-bg" />

      <div className={`fixed top-4 bottom-4 right-0 left-0 overflow-auto`}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </div>

      <div className="fixed bottom-0 left-0 h-4 right-0 bg-primary-bg" />
    </>
  );
}

export function lowerCaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}
