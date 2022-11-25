# Calculating of the provenance hash
# Script is expecting, that your image names have format 0.png, 1.png, 2.png...

import hashlib
import os

# Specify absolute path to local dir with assets
path_to_local_dir = ''
files = os.listdir(path_to_local_dir)

# Sort files by name
files = sorted(files, key=lambda x: int(x.split('.')[0]))

hashes = ''

for index, file in enumerate(files):
    with open(os.path.join(path_to_local_dir, file), "rb") as f:
        sha256_hash = hashlib.sha256()
        # Read and update hash string value in blocks of 4K
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
        file_hash = sha256_hash.hexdigest()
        hashes = hashes + file_hash

if len(hashes) == 64 * len(files):
    print('Provenance', hashlib.sha256(hashes.encode('utf-8')).hexdigest())
else:
    print('!!! Cannot create provenance !!!')
