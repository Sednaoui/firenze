import React, { useContext, useState } from "react";
import { Web3Context } from "../helpers/Web3Context";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// TODO: get artist address from previous page of list of artists
const tempArtistAddress = "";

// your NFT_PORT_AUTH token here..
const NFT_PORT_AUTH = "";

function artistProfile() {
  const web3 = useContext(Web3Context);

  console.log(`🗄 web3 context:`, web3);

  // options to get the artist's NFTs
  // TODO: change hardcoded chain from "polygon" to network received from web3
  const options = {
    method: "GET",
    url: `https://api.nftport.xyz/v0/accounts/${tempArtistAddress}`,
    params: { chain: "polygon", include: "metadata" },
    headers: {
      "Content-Type": "application/json",
      Authorization: NFT_PORT_AUTH,
    },
  };
  const [cards, setCards] = useState([]);

  axios
    .request(options)
    .then(function (response) {
      const nfts = response.data.nfts;

      const nftCards = nfts.map(nft => {
        if (nft.cached_file_url) {
          return (
            <Col key={nft.token_id}>
              <Card key={nft.token_id} style={{ width: "18rem" }}>
                <Card.Title>{nft.name}</Card.Title>
                <Card.Img variant="top" src={nft.cached_file_url} />
                <Card.Body>
                  <Card.Text>{nft.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        }
      });
      setCards(nftCards);
    })
    .then(res => console.log(res))
    .catch(function (error) {
      console.error(error);
    });

  return (
    <div className="flex flex-1 flex-col h-screen w-full items-center">
      <div className="text-center" style={{ margin: 64 }}>
        <p>Marc {tempArtistAddress}</p>
      </div>
      <Row>{cards}</Row>
      <div className="text-center"></div>
    </div>
  );
}

export default artistProfile;
