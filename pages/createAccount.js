import Meta from "../src/components/Meta";
import Navbar from "../src/components/NavBar";
import PageLayout from "../src/components/PageLayout";

export default function createAccount() {
  return (
    <>
      <Meta title="Create Account" />
      <Navbar />
      <PageLayout>Create your account</PageLayout>
    </>
  );
}
