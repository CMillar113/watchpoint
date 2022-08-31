import buttonStyles from "../../styles/Button.module.css";
import Link from "next/link";

const Button = ({ path, label, onClick }) => {
  if (path !== undefined) {
    return (
      <div className="w-full flex flex-col items-center">
        <Link href={path} passHref>
          <button
            className={` border-2 border-black mt-2 text-h2-mobile  bg-primary-bg ${buttonStyles.primary}`}
          >
            {label}
          </button>
        </Link>
      </div>
    );
  } else {
    return (
      <button className={buttonStyles.primary} onClick={onClick}>
        {label}
      </button>
    );
  }
};

export default Button;
