![image](https://www.bernardbeneito.com/wp-content/uploads/2018/03/italian-renaissance-wall-art-within-recent-renaissance-art-school-of-athens-philosophy-wall-raphael.jpg)

This repo is a submission to Web3 Jam Hackathon 2021!

# Firenze, a market for commissioned art using money steam payments

## Why We Built This 

Artists have historically been very limited in ways they can monetarily capitalize on their work. The places that have popped up which allow them to do so in the web2 world, have been entirely centralized with huge fees. Think about Etsy and Fiver. Both take a huge commission and an artist's reviews, identity, and transaction history are all stored in centralized databases which are not transferable between interfaces. If an artist is banned for producing a piece that is too provocative or even accidentally removed -  their entire history and revenue disappear instantly. 

Additionally, Artists should be able to get portions of their commission as they work. They shouldn’t have to wait till the piece is produced to receive money. 

For these reasons, we believe the combination of permissionless access, money streams, and persistent data allows for a new artistic renaissance to arise!

## BreakDown Of User Flow:

### Here's how it works for a user:
1. Commissioner visits the site and selects an artist they would like to get a piece from. They then choose between a few piece types, which vary in cost and time to create. After they start a new money stream by calling the **createSimpleStream function** within the **SimpleStreamFactory contract**.

2. Calling this function stores all the necessary data within an array of structs and deploys a new **SimpleStream contract** while also passing the money to pay the artist. This contract then begins making the funds accessible to withdrawal overtime for the specified artist.

### Here's how it works for an Artist:

1. After an artist has received a commission they will see a new stream appear under their profile page. Using the metadata stored within the **SimpleStreamFactory contract** they will draw a painting to the specification of the commissioner. Once they are done drawing, they will use the Mint NFT function on our site and then the Transfer Functionality to send it to the commissioner.

2. After this is complete, and the specified amount of time has passed, they can go to their profile page and withdraw the money from the **SimpleStream contract.**

 ## The Implementation: Contract Factories and more!

The contract consists of two distinct pieces. The first is a contract factory which we deployed on Polygon and is linked directly to the site. While this contract deploys all the money streams, it also has important functions for storing information for the site. This contract stores all the information about open money streams including a link to the IPFS CID which contains the description and sample of the picture passed to the artist for drawing. It also stores the address of where the individual money stream is stored, allowing the site to directly interact with those.

The second key piece in this contract duo is the individual stream contract. This stores the logic for ensuring that an Artist receives their money over a period originally specified by the commissioner. It also contains a withdrawal function which the artist must call to move the streamed funds from the contract to their address. During the design process, we had considered implementing SuperFluids money streaming primitives instead of our Contracts as this would remove the requirement of the artist calling a withdrawal function, however, it would then still require the commissioner to change their Matic/Eth to MaticX or EthX.

![Flowchart (1)](https://user-images.githubusercontent.com/914117/142778098-b7f0d2b3-0a0c-4fff-8652-4582cc4f640a.png)

## Integrations with IPFS and NFTPort

NFTS are uploaded using NFTPort and stored in IPFS.

NFTPort is also used to stream images from IPFS.

Info about an art peice that needs to be commisioned is also stored in IPFS so the Artist can view it from anywhere in a decentralized manner.

*Permissionless Access. Money Streams. Persistent Data. ===> ===> ARTISTIC RENAISSANCE!*

----------------------------------------------------------------------------------------

`contracts/` contains the simpleStreamFactory and SimpleStream contracts.

`test/` demonstrates their usage.

`yarn install && yarn start/' to run the site
