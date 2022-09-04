import buttonStyles from "../../styles/Button.module.css";
import Link from "next/link";

const Button = ({ path, label, onClick, className, disabled }) => {
  if (path !== undefined) {
    return (
      <div className="w-full flex flex-col items-center">
        <Link href={path} passHref>
          <button
            disabled={disabled}
            className={` border-2 border-black mt-2 text-h2-mobile  bg-primary-bg ${buttonStyles.primary} ${className}`}
          >
            {label}
          </button>
        </Link>
      </div>
    );
  } else {
    return (
      <button
        disabled={disabled}
        className={`border-2 border-black mt-2 text-h2-mobile  bg-primary-bg ${buttonStyles.primary} ${className}`}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
};

export default Button;
