import Header from '@/components/header';
import CardRender from '@/components/cardRender';

import data from '../constants/data.json';

export default function Products() {

  return (
    <div>
      <div className="col-12">
        <Header />
      </div>
      <div className="container">
          <CardRender popularProducts={data} />
      </div>
    </div> 
  );
}
