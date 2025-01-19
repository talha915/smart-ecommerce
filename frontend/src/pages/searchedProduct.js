import Header from '@/components/header';
import CardRender from '@/components/cardRender';
import data from '../constants/data.json';

import { useRouter } from 'next/router';

function searchedProduct() {

  const router = useRouter();

  return (
    <div>
      <div className="col-12">
        <Header />
      </div>
      <div className="container">
          <CardRender searchedProduct={data} />
      </div>
    </div> 
  );
}

export default searchedProduct;