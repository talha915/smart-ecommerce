from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import time
import random
from bs4 import BeautifulSoup
import pandas as pd

# Configure Selenium options
options = Options()
# options.add_argument("--headless")  # Uncomment for headless mode
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
options.add_argument("--ignore-certificate-errors")
options.add_argument("--allow-running-insecure-content")
options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36")

# Set the path to your ChromeDriver
service = Service("E:/D/chromedriver-win32/chromedriver-win32/chromedriver.exe")
driver = webdriver.Chrome(service=service, options=options)

# Open the Daraz page
driver.get("https://www.daraz.pk/catalog/?q=samsung s24")

# Wait for the page to load
driver.implicitly_wait(5)

for _ in range(3):  
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(random.uniform(2, 4))

# Get the page source after loading
html_content = driver.page_source

# Parse the page source using BeautifulSoup
soup = BeautifulSoup(html_content, "html.parser")

# Extracting product information
products = soup.find_all('div', class_='Bm3ON')

# Lists to store extracted data
product_titles = []
product_prices = []
product_links = []
product_locations = []
product_images = []

for product in products:
    # Title
    title = product.find('a', {'title': True})
    product_titles.append(title['title'] if title else "No title")

    # Price
    price = product.find('span', class_='ooOxS')
    product_prices.append(price.get_text(strip=True) if price else "No price")

    # Product Link
    link = product.find('a', href=True)
    product_links.append("https:" + link['href'] if link else "No link")

    # Location 
    location = product.find('span', class_='oa6ri')
    product_locations.append(location.get_text(strip=True) if location else "No location")

    # Image URL
    image = product.find('img', {'src': True})
    product_images.append(image['src'] if image else "No image")

# Create a DataFrame
df = pd.DataFrame({
    'product_title': product_titles,
    'price': product_prices,
    'product_link': product_links,
    'location': product_locations,
    'product_image': product_images
})


df.to_csv("../datasets/daraz_products.csv", index=False)

driver.quit()
