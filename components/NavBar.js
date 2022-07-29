import navStyles from '../src/styles/Nav.module.css';
import Link from 'next/link';


export default function Navbar() {
    return (

        <nav className={navStyles.nav}>
            <ul>
                <li><Link href={'/'}>Back</Link> </li>
                <li><Link href={'/about'}>Next</Link> </li>
            </ul>
        </nav>


    )
}
