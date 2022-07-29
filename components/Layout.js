import layoutStyles from '../src/styles/Layout.module.css'
import Navbar from './NavBar'


export default function Layout({ children }) {
    return (
        <>

            <div className={layoutStyles.topBar} />
            <div className={layoutStyles.container}>
                {children}
            </div>
            <div className={layoutStyles.baseBar} />


        </>
    )
}