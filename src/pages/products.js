import Header from '@/components/Header';

export default function Products() {
  const products = [
    { id: 1, name: 'iPhone 14', category: 'Phones', price: '$999', image: 'https://m.media-amazon.com/images/I/61BGE6iu4AL.jpg' },
    { id: 2, name: 'MacBook Pro', category: 'Laptops', price: '$1999', image: '/macbookpro.jpg' },
    { id: 3, name: 'iPhone 13', category: 'Phones', price: '$799', image: '/iphone13.jpg' },
    { id: 4, name: 'Dell XPS 13', category: 'Laptops', price: '$1299', image: '/dellxps13.jpg' },
    // More products can go here...
  ];

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 offset-3">
          <Header />
        </div>
      </div> 
    </div>
  );
}
