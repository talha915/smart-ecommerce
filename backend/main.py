from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from modules.daraz_scraper.daraz_scraper import DarazScraper
from modules.flipkart.flipkart_scraper import FlipkartScraper

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
    df = scraper.scrape(url)

    # Return data as JSON
    return {
        "response": "Data has been written",
        "status_code": 200
    }


@app.get("/scrape-flipkart")
def scrape_flipkart(query: str = Query(..., description="Search query for Flipkart products")):
    """
    API endpoint to scrape Flipkart with the given query.
    """
    url = f"https://www.flipkart.com/search?q={query}"
    scraper = FlipkartScraper(url)
    scraper.scrape()
    