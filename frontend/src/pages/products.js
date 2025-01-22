import Header from '@/components/header';
import CardRender from '@/components/cardRender';
import PrivateRoute from '@/components/privateRoute';

import data from '../constants/data.json';

export default function Products() {

  return (
    <PrivateRoute>
      <div>
        <div className="col-12">
          <Header />
        </div>
        <div className="container">
          <CardRender popularProducts={data} />
        </div>
      </div>
    </PrivateRoute>
  );
}
