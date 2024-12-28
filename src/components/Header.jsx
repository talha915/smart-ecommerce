import SearchBar from "./SearchBar";
import { useRouter } from 'next/router';

const Header=()=> {

    const router = useRouter();

    return (
        <header className="container-fluid bg-dark p-3">
            Header
            <div className="row align-items-center">
                <div className="col-3">
                    <p className="text-white pointer-icon" onClick={()=> {router.push('/')}}>SmartEcommerce</p>
                </div>
                <SearchBar />
            </div>
        </header>
    )
}

export default Header;