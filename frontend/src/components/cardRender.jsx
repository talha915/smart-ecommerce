import { Card, CardFooter } from 'react-bootstrap';
import { useRouter } from 'next/router';
import '../styles/popularproducts.module.css';

const CardRender = (props) => {

    const router = useRouter();

    const handleNavigation = (category) => {
        if (router.pathname == '/products') {
            router.push({
                pathname: '/searchedProduct',
                query: { searchedtype: category },
            });
        }
    };

    const handleSearchedNavigation = (data) => {
        console.log("Data: ", data);
        window.open(data.product_link, "_blank", "width=800,height=600,scrollbars=yes,resizable=yes");
    }

    let data;

    if (router.pathname == '/products') {
        data = props?.popularProducts?.popularCategories;
    }
    else if (router.pathname == '/searchedProduct') {
        data = props?.searchedProduct?.data;
        console.log("Props:", props);
    }

    const renderProducts = data.map((data, index) => {
        return (
            <div className="col-4 pt-5 pr-5" key={index}>
                <Card
                    style={{
                        width: '18rem',
                        height: router.pathname.includes('/searchedProduct') ? '550px' : '',
                    }}
                    className="pointer-icon fixed-size-card"
                    onClick={() => {
                        if (router.pathname === '/products') {
                            handleNavigation(data.name);
                        } 
                        else if (router.pathname.includes('/searchedProduct')) {
                            handleSearchedNavigation(data);
                        }
                    }}
                >

                    <Card.Img
                        style={{
                            height: router.pathname.includes('/searchedProduct') ? '425px' : '250px', // Dynamic height
                            objectFit: 'contain', // Ensures the full image fits within the card
                            width: '100%' // Full card width
                        }}
                        variant="top"
                        src={router.pathname === '/searchedProduct' ? data.product_image : data.image}
                        className="card-img-top"
                    />


                    <Card.Body>
                        <p className="text-center card-text">
                            {router.pathname === '/searchedProduct'
                                ? `${data.product_title.slice(0, 55)}...`: data.name}
                        </p>
                    </Card.Body>
                    {router.pathname.includes('/searchedProduct') ?
                        <CardFooter>
                            <Card.Title className="text-center">{router.pathname == '/searchedProduct' ? "Rs. " + data.product_price : ''}</Card.Title>
                        </CardFooter>
                        : ''}
                </Card>
            </div>
        )
    });

    return (
        <div className="row p-5">
            {renderProducts}
        </div>
    )
}

export default CardRender;