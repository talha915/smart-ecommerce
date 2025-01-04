import requests
from bs4 import BeautifulSoup
import pandas as pd

url = "https://www.flipkart.com/search?q=samsung%20s24"

r = requests.get(url)

# print(r)

soup = BeautifulSoup(r.text, "lxml")

product_titles = []
product_prices = []
product_links = []
product_locations = []
product_images = []
product_ratings = []

products = soup.find_all('div', class_='_75nlfW')

for product in products:

    product_title = product.find('div', class_='KzDlHZ')
    product_titles.append(product_title.text if product_title else "No title")

    product_rating = product.find('div', class_='_5OesEi')
    product_ratings.append(product_rating.text if product_rating else "No ratings")

    product_features = product.find('ul', class_='G4BRas')
    product_feature_list = product_features.find_all('li')
    product_features = [feature.text for feature in product_feature_list]

    product_price = product.find('div', class_='Nx9bqj _4b5DiR')
    product_prices.append(product_price.text.split('₹')[1].replace(',', '') if product_price else "No Product Price")


    product_image = product.find('img', class_='DByuf4')
    product_images.append(product_image['src'] if product_image else "No product image")

    product_link = product.find('a', class_='CGtC98')
    product_links.append("https://www.flipkart.com"+product_link['href'] if product_link else "No product Link")


# Create a DataFrame
df = pd.DataFrame({
    'product_title': product_titles,
    'product_price': product_prices,
    'product_link': product_links,
    'product_ratings': product_ratings,
    'product_image': product_images
})


df.to_csv("../datasets/flipkart_products.csv", index=False)