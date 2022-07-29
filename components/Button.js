import buttonStyles from "../src/styles/Button.module.css"
import Link from "next/link"


export default function ButtonClick({ path, label }) {

    return (

        <Link href={path} passHref>
            <button className={buttonStyles.primary} onClick={''}>{label}</button>
        </Link>
    )
}