import { useEffect, useState } from 'react';
import { fetchFlipkartData } from '../utils/apiFetch';
import { Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import '../styles/popularproducts.module.css';

const CardRender = (props) => {

    const [apiData, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const flipkartData = await fetchFlipkartData('samsung');
                setData(flipkartData);
                console.log("Flipkart fetched", flipkartData);
            } catch (err) {
                setError(err);
            }
        };

        getData();
    }, []);

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

    }

    const popularProducts = data.map((data, index) => {
        return (
            <div className="col-4 pt-5 pr-5" key={index}>
                <Card style={{ width: '18rem' }} className="pointer-icon fixed-size-card" onClick={ router.pathname == '/products' ? ()=>handleNavigation(data.name) : ''}>
                    <Card.Img variant="top" src={data.image} className="card-img-top" />
                    <Card.Body>
                        <Card.Title className="text-center">{data.name}</Card.Title>
                    </Card.Body>
                </Card>
            </div>
        )
    });

    return (
        <div className="row p-5">
            {popularProducts}
        </div>
    )
}

export default CardRender;