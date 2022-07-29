import headerStyles from '../src/styles/Header.module.css';

export default function Header() {
    return (


        <>

            <div>
                <h1 className={headerStyles.title}>
                    <span>Watch</span>Point
                </h1>
                <p className={headerStyles.description}>
                </p>
            </div>


        </>
    );
}