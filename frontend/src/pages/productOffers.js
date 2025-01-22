import Header from "@/components/header";
import ProductOffer from "@/components/productOffer";
import PrivateRoute from '@/components/privateRoute';

function productOffers() {
    return (
        <PrivateRoute>
            <div>
                <div className="col-12">
                    <Header />
                </div>
                <div className="container">
                    <ProductOffer />
                </div>
            </div>
        </PrivateRoute>
    )
}

export default productOffers;