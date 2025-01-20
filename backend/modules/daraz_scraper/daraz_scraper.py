from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import time
import random
from bs4 import BeautifulSoup
import pandas as pd
import os, json

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

    # def parse_page(self, html_content):
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
            # image = product.find('img', {'src': True})
            product_image = product.find('div', class_='picture-wrapper').find('img')

            if "img.drz.lazcdn.com" in product_image['src']:
                product_price = price.get_text(strip=True) if price else "No price"
                product_price = float(product_price.replace("Rs.", "").replace(",", "").strip())
                if product_price != product_price:  # Check if NaN
                    product_price = 0
                product_data.append({
                    "product_title": title['title'] if title else "No title",
                    "product_price": product_price,
                    "product_link": "https:" + link['href'] if link else "No link",
                    # "product_location": location.get_text(strip=True) if location else "No location",
                    "product_image": product_image['src'] if "img.drz.lazcdn.com" in product_image['src'] else "No image",
                })

        return product_data

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
            # image = product.find('img', {'src': True})
            product_image = product.find('div', class_='picture-wrapper').find('img')

            if "img.drz.lazcdn.com" in product_image['src']:
                product_price = price.get_text(strip=True) if price else None
                
                # Attempt to convert the price to a float, if possible
                try:
                    product_price = float(product_price.replace("Rs.", "").replace(",", "").strip())
                    if product_price != product_price:  # Check if NaN
                        product_price = None  # Replace NaN with 0
                except ValueError:
                    product_price = None  # Default to 0 if conversion fails

                product_data.append({
                    "product_title": title['title'] if title else "No title",
                    "product_price": product_price,
                    "product_link": "https:" + link['href'] if link else "No link",
                    # "product_location": location.get_text(strip=True) if location else "No location",
                    "product_image": product_image['src'] if "img.drz.lazcdn.com" in product_image['src'] else "No image",
                    "product_features": None
                })

        return product_data

    def save_to_csv(self, data, filename):
        """Save the scraped data to a CSV file."""
        df = pd.DataFrame(data)
        df.to_csv(filename, index=False)
        print(f"Data saved to {filename}")
        return df

    def scrape(self, url, scroll_times=3):
        """Perform the entire scraping process."""
        try:
            html_content = self.fetch_page(url, scroll_times)
            data = self.parse_page(html_content)
            current_dir = os.path.dirname(os.path.abspath(__file__))
            modules_dir = os.path.join(current_dir, "../")
            datasets_dir = os.path.join(modules_dir, "datasets")
            os.makedirs(datasets_dir, exist_ok=True)
            output_file = os.path.join(datasets_dir, "daraz_products.csv")
            data = self.save_to_csv(data, output_file)
            json_data = data.to_dict(orient="records")
            return {
                "data": json_data
            }
        finally:
            self.driver.quit()
