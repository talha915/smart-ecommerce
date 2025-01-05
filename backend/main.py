from fastapi import FastAPI, Query
from modules.daraz_scraper.daraz_scraper import DarazScraper


app = FastAPI()

@app.get("/scrape")
def scrape_daraz(
    query: str = Query(..., description="Search query for Daraz products"),
    driver_path: str = "E:/D/chromedriver-win32/chromedriver-win32/chromedriver.exe"
):
    """
    API endpoint to scrape Daraz with the given query.
    """
    scraper = DarazScraper(driver_path)
    url = f"https://www.daraz.pk/catalog/?q={query}"
    scraper.scrape(url)

    # Return data as JSON
    return {
        "response": "Data has been written",
        "status_code": 200
    }