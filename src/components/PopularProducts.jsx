import { Card } from 'react-bootstrap';
import '../styles/popularproducts.module.css';

const PopularProducts = (props) => {

    let data;

    if(props?.popularProducts?.popularCategories) {
        data = props?.popularProducts?.popularCategories;
    }
    else {
        data = props?.searchedProduct?.popularCategories;   
    }

    const popularProducts = data.map((data, index) => {
        return (
            <div className="col-4 pt-5 pr-5" key={index}>
                <Card style={{ width: '18rem' }} className="pointer-icon fixed-size-card">
                    <Card.Img variant="top" src={data.image} className="card-img-top" />
                    <Card.Body>
                        <Card.Title className="text-center">{data.name}</Card.Title>
                    </Card.Body>
                    {props?.searchedProduct? 
                        <Card.Footer>
                            Hello
                        </Card.Footer>
                        : ''
                    }
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