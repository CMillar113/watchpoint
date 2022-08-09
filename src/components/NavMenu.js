import Router from "next/router";
import navStyles from "../../styles/NavMenu.module.css";
import Link from "next/link";

// Nav menu - for homepage must give the routes to plan editing, workouts and food log
export default function NavMenu({
  pathLeft,
  pathCenter,
  pathRight,
  labelLeft,
  labelCenter,
  labelRight,
}) {
  return (
    <>
      <nav
        className={`mt-2 h-auto text-h2-mobile  text-white ${navStyles.nav} text-center`}
      >
        <ul>
          <li className="mr-2 border-2 border-primary-bg bg-black px-3 w-30 text-center">
            <Link href={pathLeft}>{labelLeft}</Link>{" "}
          </li>
          <li className="mr-2 border-2 border-primary-bg bg-black px-3 w-30 text-center">
            <Link href={pathCenter}>{labelCenter}</Link>{" "}
          </li>
          <li className="border-2 border-primary-bg bg-black px-3 w-30 text-center">
            <Link href={pathRight}>{labelRight}</Link>{" "}
          </li>
        </ul>
      </nav>
    </>
  );
}
