import Header from '@/components/Header';
import PopularProducts from '@/components/PopularProducts';
import data from '../constants/data.json';

export default function SearchedProduct() {

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
