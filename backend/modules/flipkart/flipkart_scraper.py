import requests
from bs4 import BeautifulSoup

url = "https://www.flipkart.com/search?q=samsung%20s24"

r = requests.get(url)

print(r)

soup = BeautifulSoup(r.text, "lxml")

products = soup.find_all('div', class_='_75nlfW')

one_product = products[0]

title = one_product.find('div', class_='KzDlHZ')

rating = one_product.find('div', class_='_5OesEi')

features = one_product.find('ul', class_='G4BRas')

feature_list = features.find_all('li')

print(title.text)

print(rating.text)

print(features.text)

print(feature_list[0].text)