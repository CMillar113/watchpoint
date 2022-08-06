import Link from "next/link";
import navStyles from "../../styles/Nav.module.css";

export default function Navbar({ backPath, nextPath, title }) {
  if (backPath !== undefined) {
    return (
      //backpath defined - no next button
      <>
        <nav className={`bg-primary-bg text-primary-text ${navStyles.nav}`}>
          <ul
            className={`flex justify-between w-full sm:w-4/5 md:w-3/5 lg:w-1/2 ${navStyles.ul}`}
          >
            <li>
              {" "}
              <Link href={`${backPath}`} passHref>
                Back
              </Link>{" "}
            </li>
            <div className="`flex justify-between w-full text-center sm:w-2/5 md:w-3/5 lg:w-1/2  ">
              {" "}
              <h2>{title}</h2>
            </div>
            <li>
              <div className="w-20"></div>
              {/* TODO - Needs adjusted currently quick fix */}
            </li>
          </ul>
        </nav>
      </>
    );
  } else if (nextPath !== undefined && backPath !== undefined) {
    //back button and next button both defined and both shown
    return (
      <nav className={`bg-primary-bg text-primary-text ${navStyles.nav}`}>
        <ul
          className={`flex justify-between w-full  sm:w-4/5 md:w-3/5 lg:w-1/2 ${navStyles.ul}`}
        >
          <li>
            <Link href={`${backPath}`}>Back</Link>{" "}
          </li>
          <div className="`flex justify-between w-full text-center sm:w-4/5 md:w-3/5 lg:w-1/2 ">
            {" "}
            <h2>{title}</h2>
          </div>
          <li>
            <Link href={nextPath} passHref>
              Next
            </Link>{" "}
          </li>
        </ul>
      </nav>
    );
  } else {
    //No buttons shown or defined
    return (
      <nav
        className={` w-full bg-primary-bg text-primary-text text-center   ${navStyles.nav}`}
      >
        <div className="`flex justify-between w-full text-center sm:w-4/5 md:w-3/5 lg:w-1/2 ">
          {" "}
          <h2>{title}</h2>
        </div>
      </nav>
    );
  }
}
