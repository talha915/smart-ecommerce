import { Card, CardFooter } from 'react-bootstrap';
import { useRouter } from 'next/router';
import '../styles/popularproducts.module.css';

const CardRender = (props) => {

    const router = useRouter();

    const handleNavigation = (category) => {
        router.push({
            pathname: '/searchedProduct',  
            query: { searchedtype: category },  
        });
    };

    let data;

    if(router.pathname == '/products') {
        data = props?.popularProducts?.popularCategories;
    } 
    else if(router.pathname == '/searchedProduct') {
        data = props?.searchedProduct?.data;
        console.log("Props:" , props);
    }

    const renderProducts = data.map((data, index) => {
        return (
            <div className="col-4 pt-5 pr-5" key={index}>
                <Card style={{ width: '18rem' }} className="pointer-icon fixed-size-card" onClick={ router.pathname == '/products' ? ()=>handleNavigation(data.name) : ''}>
                    <Card.Img variant="top" src={router.pathname == '/searchedProduct' ? data.product_image : data.image} className="card-img-top" />
                    <Card.Body>
                        <Card.Title className="text-center">{router.pathname == '/searchedProduct' ? data.product_title : data.name}</Card.Title>
                    </Card.Body>
                    <CardFooter>
                        <Card.Title className="text-center">{router.pathname == '/searchedProduct' ? "Rs. "+data.product_price : ''}</Card.Title>
                    </CardFooter>
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