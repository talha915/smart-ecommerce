import Header from '@/components/header';
import CardRender from '@/components/cardRender';
import { useEffect, useState } from 'react';
import { fetchProductsData } from '../utils/apiFetch';
import { useRouter } from 'next/router';

function SearchedProduct() {
  const [apiData, setData] = useState(null);
  const [category, setCategory] = useState(null); // State to manage category
  const [error, setError] = useState(null);
  const router = useRouter();

  // Update category whenever the router changes
  useEffect(() => {
    const currentCategory = router.query.category || router.asPath.split('=')[1];
    if (currentCategory !== category) {
      setCategory(currentCategory);
      console.log("Updated Category:", currentCategory);
    }
  }, [router.query.category, router.asPath]);

  // Fetch data when category updates
  useEffect(() => {
    if (!category) {
      console.log("Category not set, skipping API call.");
      return;
    }

    const getData = async () => {
      try {
        console.log(`Fetching data for category: ${category}`);
        const fetchData = await fetchProductsData(category);
        setData(fetchData);
        console.log("Data fetched:", fetchData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      }
    };

    getData();
  }, [category]); // Dependency on state variable `category`

  return (
    <div>
      <div className="col-12">
        <Header />
      </div>
      <div className="container">
        {error && <p className="text-danger">Error: {error.message}</p>}
        {apiData ? (
          <CardRender searchedProduct={apiData} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default SearchedProduct;
