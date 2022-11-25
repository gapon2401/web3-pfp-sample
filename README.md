# TheSample project

TheSample - is the sample project for web3 enthusiasts, community builders and developers.

It might be difficult to organize the sale of NFT collection, especially, if you need universal whitelist, where you can add or remove people at any time. It's very important to unite like-minded people and have the ability to know more about them, before you give them access to your club.

This project contains:
- [smartcontract](https://github.com/gapon2401/web3-pfp-smartcontract) (ERC-721) with digital signature whitelist,
- website with dashboard for admins to manage users,
- dashboard for users to mint tokens and get special access to "Private page",
- integrated mailer service,
- settings page for communicating with smartcontract (start/stop the sale),
- ability to create admins of the project.

It can be cloned and used for selling pfp-avatars or NFT collections.

### [DEMO](https://web3-pfp-sample.vercel.app/)

## Stack and services
- [MongoDB](https://www.mongodb.com/atlas) for holding users' information,
- [React](https://reactjs.org/) + [Next.js](https://nextjs.org/) for website navigation,
- [Solidity](https://docs.soliditylang.org/) + [Hardhat](https://hardhat.org/) for smartcontract,
- [Python](https://www.python.org/) for creating provenance hash
- [Mailgun](https://www.mailgun.com/) for mailer

## How to start?

1. Clone the repo, run `yarn install`
2. If you have a collection and want to calculate provenance hash, follow the section below [How to calculate it?](#how-to-calculate-it)
3. Go to [smartcontract repo](https://github.com/gapon2401/web3-pfp-smartcontract) and follow the instructions. Make sure, that `base URI` was set correctly in order to get information about minted tokens.
4. Specify `.env` variables.
5. Run `yarn dev` for local development

Do not upload `.env` file with sensitive data to your repo, add it to `.gitignore`.

## What is the provenance hash and how to calculate it?

### What is the provenance?
Each image from the collection is hashed using SHA-256 algorithm. Then hashes of the images are concatenated and this string is also hashed using SHA-256 algorithm.

This is the final record is a provenance hash.

### What does it mean?
It means, that all the images and metadata were loaded before the mint and were not manipulated.

Each token ID is assigned to an image from the initial sequence randomly.

If you try to replace or reorder at least 2 images, the hash will be different.

### How to calculate it?

You can make it with local files or with external.

Here are the Python scripts for:

- [local files](https://github.com/gapon2401/web3-pfp-sample/blob/master/scripts/provenance.py)
- [external files by URL](https://github.com/gapon2401/web3-pfp-sample/blob/master/scripts/external_provenance.py)

### Useful links

- [Create, deploy and mint smart contract (ERC-721) with NodeJS + Hardhat + Walletconnect + Web3modal](https://dev.to/igaponov/create-deploy-and-mint-smart-contract-erc-721-with-nodejs-hardhat-walletconnect-web3modal-59o8)
- [How to Implement a Whitelist in Smart Contracts (ERC-721 NFT, ERC-1155, and others)](https://www.freecodecamp.org/news/how-to-implement-whitelist-in-smartcontracts-erc-721-nft-erc-1155-and-others/)