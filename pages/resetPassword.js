import Meta from "../src/components/Meta";
import Navbar from "../src/components/NavBar";
import PageLayout from "../src/components/PageLayout";

export default function resetPassword() {
  return (
    <>
      <Meta title="Password Reset" />
      <Navbar />
      <PageLayout>Reset Password</PageLayout>
    </>
  );
}
