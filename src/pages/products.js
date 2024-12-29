import Header from '@/components/Header';
import PopularProducts from '@/components/PopularProducts';

export default function Products() {

  return (
    <div>
      <div className="col-12">
        <Header />
      </div>
      <div className="container">
          <PopularProducts />
      </div>
    </div> 
  );
}
