import { Card } from 'react-bootstrap';
import data from '../constants/data.json';
import '../styles/popularproducts.module.css';

const PopularProducts = () => {

    const popularProducts = data.popularCategories.map((data, index) => {
        return (
            <div className="col-4 pt-5 pr-5">
                <Card key={index} style={{ width: '18rem' }} className="pointer-icon fixed-size-card">
                    <Card.Img variant="top" src={data.image} />
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

export default PopularProducts;