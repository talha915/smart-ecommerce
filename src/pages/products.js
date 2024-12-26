import Image from 'next/image';
import styles from '../styles/products.module.css';

export default function Products() {
  const products = [
    { id: 1, name: 'iPhone 14', category: 'Phones', price: '$999', image: 'https://m.media-amazon.com/images/I/61BGE6iu4AL.jpg' },
    { id: 2, name: 'MacBook Pro', category: 'Laptops', price: '$1999', image: '/macbookpro.jpg' },
    { id: 3, name: 'iPhone 13', category: 'Phones', price: '$799', image: '/iphone13.jpg' },
    { id: 4, name: 'Dell XPS 13', category: 'Laptops', price: '$1299', image: '/dellxps13.jpg' },
    // More products can go here...
  ];

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="products-page">
      <h1 className="page-title">Our Products</h1>

      {/* Category-wise Products */}
      {Object.keys(groupedProducts).map((category) => (
        <section key={category} className="category-section">
          <h2 className="category-title">{category}</h2>
          <div className="product-grid">
            {groupedProducts[category].map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="image"
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">{product.price}</p>
                  <button className="add-to-cart-btn">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
