import Header from '@/components/header';
import CardRender from '@/components/cardRender';
import { useEffect, useState } from 'react';
import { fetchFlipkartData, fetchDarazData } from '../utils/apiFetch';

import { useRouter } from 'next/router';

function searchedProduct() {

  const [flipkartApiData, setFlipkartData] = useState(null);
  const [darazApiData, setDarazData] = useState(null);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null);
  const router = useRouter();

  useEffect(() => {

    setCategory(router.asPath.split('=')[1])
    console.log("Router: ", category);

    const getData = async () => {
      try {
        const flipkartData = await fetchDarazData(category);
        setFlipkartData(flipkartData);
        console.log("Flipkart fetched", flipkartData);
      } 
      catch (err) {
        setError(err);
      }
    };

    getData();



    const getDarazData = async () => {
      try {
        const darazData = await fetchFlipkartData(category);
        setDarazData(darazData);
        console.log("Daraz data fetched", darazData);
      } 
      catch (err) {
        setError(err);
      }
    };

    getDarazData();
  }, [category]);

  return (
    <div>
      <div className="col-12">
        <Header />
      </div>
      <div className="container">
        {flipkartApiData ? 
          <CardRender searchedProduct={flipkartApiData} /> 
          : 'Loading....'
        }
        {darazApiData ? 
          <CardRender searchedProduct={darazApiData} /> 
          : 'Loading....'
        }
        {/* <CardRender searchedProduct={data} /> */}
      </div>
    </div>
  );
}

export default searchedProduct;