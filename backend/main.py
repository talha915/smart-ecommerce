from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from modules.daraz_scraper.daraz_scraper import DarazScraper
from modules.flipkart.flipkart_scraper import FlipkartScraper
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with ["http://localhost:3000"] in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/scrape-daraz")
def scrape_daraz(
    query: str = Query(..., description="Search query for Daraz products"),
    driver_path: str = "E:/D/chromedriver-win32/chromedriver-win32/chromedriver.exe"
):
    """
    API endpoint to scrape Daraz with the given query.
    """
    scraper = DarazScraper(driver_path)
    url = f"https://www.daraz.pk/catalog/?q={query}"
    response = scraper.scrape(url)
    # Return data as JSON
    return {
        "data": response.get('data'),
        "response_code": 200
    }


@app.get("/scrape-flipkart")
def scrape_flipkart(query: str = Query(..., description="Search query for Flipkart products")):
    """
    API endpoint to scrape Flipkart with the given query.
    """
    url = f"https://www.flipkart.com/search?q={query}"
    scraper = FlipkartScraper(url)
    response = scraper.scrape()
    # Return data as JSON
    return {
        "data": response.get('data'),
        "response_code": 200
    }
    

@app.get("/scrape-products")
def scrape_products(
    query: str = Query(..., description="Search query for products"),
    driver_path: str = "E:/D/chromedriver-win32/chromedriver-win32/chromedriver.exe"
):
    """
    API endpoint to scrape both Daraz and Flipkart, combine and sort results.
    """
    # Scrape Daraz
    daraz_scraper = DarazScraper(driver_path)
    daraz_url = f"https://www.daraz.pk/catalog/?q={query}"
    daraz_response = daraz_scraper.scrape(daraz_url)
    daraz_data = daraz_response.get('data', [])

    # Scrape Flipkart
    flipkart_url = f"https://www.flipkart.com/search?q={query}"
    flipkart_scraper = FlipkartScraper(flipkart_url)
    flipkart_response = flipkart_scraper.scrape()
    flipkart_data = flipkart_response.get('data', [])

    # Combine data using pandas
    daraz_df = pd.DataFrame(daraz_data)
    flipkart_df = pd.DataFrame(flipkart_data)

    # Add a source column to identify origin
    daraz_df['source'] = 'daraz'
    flipkart_df['source'] = 'flipkart'

    # Combine both datasets
    combined_df = pd.concat([daraz_df, flipkart_df], ignore_index=True)

    # Ensure price is numeric for sorting
    combined_df['product_price'] = pd.to_numeric(combined_df['product_price'], errors='coerce')

    # # # Drop rows with invalid prices
    combined_df = combined_df.dropna(subset=['product_price'])
    print(combined_df.columns)
    print(combined_df.head(5))
    # # Sort by price in ascending order
    combined_df = combined_df.sort_values(by='product_price', ascending=True)

    # Convert back to JSON
    result = combined_df.to_dict(orient='records')

    print(result)

    return {
        "data": result,
        "response_code": 200
    }    