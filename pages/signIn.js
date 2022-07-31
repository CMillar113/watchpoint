import Meta from "../src/components/Meta";
import Navbar from "../src/components/NavBar";
import PageLayout from "../src/components/PageLayout";

export default function signIn() {
  return (
    <>
      <Meta title="Sign In" />
      <Navbar />
      <PageLayout>Sign in to your account</PageLayout>
    </>
  );
}
