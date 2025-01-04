import Header from "@/components/header";
import ProductOffer from "@/components/productOffer";

function productOffers() {
    return (
        <div>
            <div className="col-12">
                <Header />
            </div>
            <div className="container">
                <ProductOffer/>
            </div>
        </div>
    )
}

export default productOffers;