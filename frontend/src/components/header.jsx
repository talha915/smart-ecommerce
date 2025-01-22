import SearchBar from "./searchBar";
import { useRouter } from 'next/router';
import styles from '../styles/index.module.css';

const Header = () => {

    const router = useRouter();

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("user");
            router.push('/')
        }
    };

    return (
        <header className="container-fluid bg-secondary p-3">
            <div className="row align-items-center">
                <div className="col-3">
                    <p className="font-italic text-white pointer-icon m-0" onClick={() => { router.push('/') }}>Smart Ecommerce</p>
                </div>
                <div className="col-8">
                    <SearchBar />
                </div>
                <div className="col-1">
                    <a onClick={handleLogout}  className={styles.signoutBtn}>
                        Sign Out
                    </a>
                </div>
            </div>
        </header>
    )
}

export default Header;