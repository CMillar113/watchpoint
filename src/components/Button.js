import buttonStyles from "../../styles/Button.module.css";
import Link from "next/link";

const Button = ({ path, label, onClick }) => {
  if (path !== undefined) {
    return (
      <Link href={path} passHref>
        <button className={buttonStyles.primary}>{label}</button>
      </Link>
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
