import Link from "next/link";
import navStyles from "../../styles/Nav.module.css";

export default function Navbar(backPath, nextPath) {
  if (backPath == undefined) {
    //backPath is defined
    return (
      <nav className={`bg-primary-bg text-primary-text ${navStyles.nav}`}>
        <ul
          className={`flex justify-between w-full  sm:w-4/5 md:w-3/5 lg:w-1/2 ${navStyles.ul}`}
        >
          <li>
            {" "}
            <Link href={backPath} passHref>
              Back
            </Link>{" "}
          </li>
          <li>
            <Link href={nextPath} passHref>
              Next
            </Link>{" "}
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      // backPath is undefined
      <nav className={`bg-primary-bg text-primary-text ${navStyles.nav}`}>
        <ul
          className={`flex justify-between w-full  sm:w-4/5 md:w-3/5 lg:w-1/2 ${navStyles.ul}`}
        >
          <li>
            <Link href={"/"}>Back</Link>{" "}
          </li>
          <li>
            <Link href={nextPath} passHref>
              Next
            </Link>{" "}
          </li>
        </ul>
      </nav>
    );
  }
}
