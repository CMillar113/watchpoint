import Link from "next/link";
import navStyles from "../../styles/Nav.module.css";

export default function Navbar({ backPath, nextPath, title }) {
  if (nextPath == undefined) {
    return (
      //now works this is -- undefined NEXT
      <nav className={`bg-primary-bg text-primary-text ${navStyles.nav}`}>
        <ul
          className={`flex justify-between w-full  sm:w-4/5 md:w-3/5 lg:w-1/2 ${navStyles.ul}`}
        >
          <li>
            {" "}
            <Link href="/" passHref>
              Back
            </Link>{" "}
          </li>
          <li>
            <h2 className="text-primary-text text-center text-h2-mobile md:text-h2-medium lg:text-h2-large">
              {title}
            </h2>
          </li>
          <li>
            <div className="w-20"></div>
            {/* TODO - Needs adjusted currently quick fix */}
          </li>
        </ul>
      </nav>
    );
  } else {
    //If next is defined
    return (
      <nav className={`bg-primary-bg text-primary-text ${navStyles.nav}`}>
        <ul
          className={`flex justify-between w-full  sm:w-4/5 md:w-3/5 lg:w-1/2 ${navStyles.ul}`}
        >
          <li>
            <Link href={"/"}>Back</Link>{" "}
          </li>
          <li>
            <h2 className="text-primary-text text-center">{title}</h2>
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
