import Header from '@/components/header';
import PopularProducts from '@/components/popularProducts';

import data from '../constants/data.json';

export default function Products() {

  return (
    <div>
      <div className="col-12">
        <Header />
      </div>
      <div className="container">
          <PopularProducts popularProducts={data} />
      </div>
    </div> 
  );
}
