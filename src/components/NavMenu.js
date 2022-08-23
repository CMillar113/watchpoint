import Router from "next/router";
import navStyles from "../../styles/NavMenu.module.css";
import Link from "next/link";

// Nav menu - for homepage must give the routes to plan editing, workouts and food log
export default function NavMenu({
  pathLeft,
  pathRight,
  labelLeft,
  labelRight,
}) {
  return (
    <>
      <nav
        className={` w-full mt-2 h-auto text-h2-mobile  text-white ${navStyles.nav} text-center `}
      >
        <ul>
          <li className="mr-6 border-2 border-primary-bg bg-black px-6 w-30 text-center">
            <Link href={pathLeft}>{labelLeft}</Link>{" "}
          </li>
          <li className=" ml-6 border-2 border-primary-bg bg-black px-6 w-30 text-center">
            <Link href={pathRight}>{labelRight}</Link>{" "}
          </li>
        </ul>
      </nav>
    </>
  );
}
