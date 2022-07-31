import navStyles from "../../styles/Nav.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className={`bg-primary-bg text-primary-text ${navStyles.nav}`}>
      <ul
        className={`flex justify-between w-full  sm:w-4/5 md:w-3/5 lg:w-1/2 ${navStyles.ul}`}
      >
        <li>
          <Link href={"/"}>Back</Link>{" "}
        </li>
        <li>
          <Link href={""}>Next</Link>{" "}
        </li>
      </ul>
    </nav>
  );
}
