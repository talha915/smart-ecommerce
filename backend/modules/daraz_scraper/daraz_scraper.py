from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import time
import random
from bs4 import BeautifulSoup
import pandas as pd


class DarazScraper:
    def __init__(self, driver_path):
        """Initialize the scraper with Selenium WebDriver."""
        options = Options()
        # options.add_argument("--headless")  # Uncomment for headless mode
        options.add_argument("--disable-gpu")
        options.add_argument("--no-sandbox")
        options.add_argument("--ignore-certificate-errors")
        options.add_argument("--allow-running-insecure-content")
        options.add_argument(
            "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
        )
        self.driver = webdriver.Chrome(service=Service(driver_path), options=options)

    def fetch_page(self, url, scroll_times=3):
        """Load the webpage and scroll to the bottom to load dynamic content."""
        self.driver.get(url)
        self.driver.implicitly_wait(5)

        for _ in range(scroll_times):
            self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(random.uniform(2, 4))  # Wait for dynamic content to load

        return self.driver.page_source

    def parse_page(self, html_content):
        """Parse the HTML content using BeautifulSoup and extract product data."""
        soup = BeautifulSoup(html_content, "html.parser")
        products = soup.find_all('div', class_='Bm3ON')

        # Lists to store extracted data
        product_data = []

        for product in products:
            title = product.find('a', {'title': True})
            price = product.find('span', class_='ooOxS')
            link = product.find('a', href=True)
            location = product.find('span', class_='oa6ri')
            image = product.find('img', {'src': True})

            product_data.append({
                "product_title": title['title'] if title else "No title",
                "product_price": price.get_text(strip=True) if price else "No price",
                "product_link": "https:" + link['href'] if link else "No link",
                # "product_location": location.get_text(strip=True) if location else "No location",
                "product_image": image['src'] if image else "No image",
            })

        return product_data

    def save_to_csv(self, data, filename):
        """Save the scraped data to a CSV file."""
        df = pd.DataFrame(data)
        df.to_csv(filename, index=False)
        print(f"Data saved to {filename}")

    def scrape(self, url, output_file, scroll_times=3):
        """Perform the entire scraping process."""
        try:
            html_content = self.fetch_page(url, scroll_times)
            data = self.parse_page(html_content)
            self.save_to_csv(data, output_file)
        finally:
            self.driver.quit()


# Usage Example
if __name__ == "__main__":
    driver_path = "E:/D/chromedriver-win32/chromedriver-win32/chromedriver.exe"
    scraper = DarazScraper(driver_path)
    query = "samsung+s24"
    url = f"https://www.daraz.pk/catalog/?q={query}"
    output_file = "../datasets/daraz_products.csv"

    scraper.scrape(url, output_file)
