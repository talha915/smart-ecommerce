import Header from '@/components/header';
import PopularProducts from '@/components/popularProducts';
import data from '../constants/data.json';

function searchedProduct() {

  return (
    <div>
      <div className="col-12">
        <Header />
      </div>
      <div className="container">
          <PopularProducts searchedProduct={data} />
      </div>
    </div> 
  );
}

export default searchedProduct;