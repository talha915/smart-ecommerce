import SearchBar from "./searchBar";
import { useRouter } from 'next/router';

const Header=()=> {

    const router = useRouter();

    return (
        <header className="container-fluid bg-secondary p-3">
            <div className="row align-items-center">
                <div className="col-3">
                    <p className="font-italic text-white pointer-icon m-0" onClick={()=> {router.push('/')}}>Smart Ecommerce</p>
                </div>
                <div className="col-9">
                    <SearchBar />
                </div>
            </div>
        </header>
    )
}

export default Header;