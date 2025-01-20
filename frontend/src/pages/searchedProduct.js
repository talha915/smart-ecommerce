import Header from '@/components/header';
import CardRender from '@/components/cardRender';
import { useEffect, useState } from 'react';
import { fetchFlipkartData, fetchDarazData } from '../utils/apiFetch';
import { useRouter } from 'next/router';

function SearchedProduct() {
  const [flipkartApiData, setFlipkartData] = useState(null);
  const [darazApiData, setDarazData] = useState(null);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null);
  const router = useRouter();

  // Update category when the route changes
  useEffect(() => {
    const categoryFromUrl = router.asPath.split('=')[1];
    setCategory(categoryFromUrl || null);
  }, [router.asPath]);

  // Fetch Flipkart data when the category changes
  useEffect(() => {
    if (!category) return;

    const fetchFlipkart = async () => {
      try {
        const flipkartData = await fetchFlipkartData(category);
        setFlipkartData(flipkartData);
        console.log("Flipkart fetched", flipkartData);
      } catch (err) {
        console.error("Error fetching Flipkart data:", err);
        setError(err);
      }
    };

    fetchFlipkart();
  }, [category]);

  // Fetch Daraz data when the category changes
  useEffect(() => {
    if (!category) return;

    const fetchDaraz = async () => {
      try {
        const darazData = await fetchDarazData(category);
        setDarazData(darazData);
        console.log("Daraz data fetched", darazData);
      } catch (err) {
        console.error("Error fetching Daraz data:", err);
        setError(err);
      }
    };

    fetchDaraz();
  }, [category]);

  return (
    <div>
      <div className="col-12">
        <Header />
      </div>
      <div className="container">
        {flipkartApiData ? (
          <CardRender searchedProduct={flipkartApiData} />
        ) : (
          <p>Loading Flipkart data...</p>
        )}
        {darazApiData ? (
          <CardRender searchedProduct={darazApiData} />
        ) : (
          <p>Loading Daraz data...</p>
        )}
        {error && <p>Error: {error.message}</p>}
      </div>
    </div>
  );
}

export default SearchedProduct;
