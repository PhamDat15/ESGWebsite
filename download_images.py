import os
import urllib.request

os.makedirs('public/images', exist_ok=True)

urls = {
    'watermelon.jpg': 'https://upload.wikimedia.org/wikipedia/commons/4/47/Taiwan_2009_Tainan_City_Organic_Farm_Watermelon_FRD_7962.jpg',
    'mango.jpg': 'https://upload.wikimedia.org/wikipedia/commons/7/74/Mangos_-_single_and_halved.jpg',
    'rice.jpg': 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Reis_-_Sorte_C_voll.jpg',
    'coffee.jpg': 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Roasted_coffee_beans.jpg'
}

for name, url in urls.items():
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        data = urllib.request.urlopen(req).read()
        with open('public/images/' + name, 'wb') as f:
            f.write(data)
        print('Downloaded', name)
    except Exception as e:
        print('Failed', name, e)
