# Calculating of the provenance hash of external files
# Script is expecting, that your image names have format 0.png, 1.png, 2.png...

import requests
import hashlib

hashes = ''

# Specify max number of the images
max_supply = 100
# Specify the URL to image folder. Example, https://mydomain.com/collection/assets/
url_to_image_folder = ''
# Specify image extension
image_ext = 'jpg'

for i in range(max_supply):
    if i % 10 == 0:
        print('Processed', i)
    url = url_to_image_folder + str(i) + '.' + image_ext
    response = requests.get(url)
    img = response.content
    hashes = hashes + hashlib.sha256(img).hexdigest()

print('Provenance', hashlib.sha256(hashes.encode('utf-8')).hexdigest())
if len(hashes) != 64 * max_supply:
    print('!!! Provenance may be wrong !!!')
