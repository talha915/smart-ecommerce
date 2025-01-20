import requests, os
from bs4 import BeautifulSoup
import pandas as pd

class FlipkartScraper:
    
    def __init__(self, url):
        self.url = url
        self.product_titles = []
        self.product_prices = []
        self.product_links = []
        self.product_images = []
        self.product_ratings = []
        self.product_features = []

    def scrape(self):
        r = requests.get(self.url)
        soup = BeautifulSoup(r.text, "lxml")

        products = soup.find_all('div', class_='_75nlfW')

        for product in products:
            self._extract_product_details(product)

        json_df = self.save_to_csv()
        return json_df

    def _extract_product_details(self, product):
        # Extract product title
        product_title = product.find('div', class_='KzDlHZ')

        if product_title:
            self.product_titles.append(product_title.text)
        else:
            product_title = product.find('a')
            # Extract the title attribute directly
            if product_title and 'title' in product_title.attrs:
                # If <a> tag and title attribute exist
                self.product_titles.append(product_title['title'])
            else:
                # If no <a> tag or no title attribute
                self.product_titles.append("No title")


        # Extract product rating
        product_rating = product.find('div', class_='_5OesEi')
        self.product_ratings.append(product_rating.text if product_rating else "No ratings")

        # Extract product price
        product_price = product.find('div', class_='Nx9bqj _4b5DiR')
        product_price = int(product_price.text.split('₹')[1].replace(',', ''))*3 if product_price else "No Product Price"
        self.product_prices.append(product_price)

        # Extract product image URL
        product_image = product.find('img', class_='DByuf4')
        self.product_images.append(product_image['src'] if product_image else "No product image")

        # Extract product link
        product_link = product.find('a', class_='CGtC98')
        self.product_links.append("https://www.flipkart.com" + product_link['href'] if product_link else "No product Link")

        # Extract Product Features
        product_features = product.find('ul', class_='G4BRas')
        feature_list = []
        if product_features:
            feature_items = product_features.find_all('li')
            feature_list = [item.text.strip() for item in feature_items] if feature_items else ["No features"]
        else:
            feature_list = ["No features"]
        self.product_features.append(feature_list)

    def save_to_csv(self):
        # Create DataFrame
        df = pd.DataFrame({
            'product_title': self.product_titles,
            'product_price': self.product_prices,
            'product_link': self.product_links,
            'product_image': self.product_images,
            'product_features': self.product_features
        })

        current_dir = os.path.dirname(os.path.abspath(__file__))
        modules_dir = os.path.join(current_dir, "../")
        datasets_dir = os.path.join(modules_dir, "datasets")
        os.makedirs(datasets_dir, exist_ok=True)
        output_file = os.path.join(datasets_dir, "flipkart_products.csv")
        # Save DataFrame to CSV
        df.to_csv(output_file, index=False)
        print("Data has been saved to flipkart_products.csv")
        json_data = df.to_dict(orient="records")
        return {
            "data": json_data
        }
        